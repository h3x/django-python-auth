import pandas
import synapseclient
from mysite.settings import SYNAPSE_TOKEN
from mysite.settings import WEATHER_API_KEY
import requests
import time


class Synapse:
    def __init__(self, dataset_id):
        self.dataset_id = dataset_id
        self.syn = synapseclient.Synapse()
        self.syn.login(authToken=SYNAPSE_TOKEN)
        self.matrix = self.syn.get(self.dataset_id)

    def update_matrix(self):
        self.matrix = self.syn.get(self.dataset_id)

    def get_data(self):
        exported_table = pandas.read_csv(self.matrix.path, sep='\t')
        shaped_data = self._shape_data(exported_table)
        return shaped_data

    def _shape_data(self, table):
        data_dict = table.to_dict()
        res_dict = {}
        for i in data_dict.keys():
            res_dict[i] = {'label': i, 'data':[{'x':j[0], 'y':j[1]} for j in data_dict.get(i).items()]}
        return res_dict


class WeatherAPI():
    def __init__(self,location):
        self.location = location

    def get_data(self):
        current_epoch = time.time()
        five_days_ago = current_epoch - ( 24 * 60 * 60 ) * 5 -200
        api_endpoint = "https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=%s&lon=%s&dt=%s&appid=%s" % (
            self.location[0],
            self.location[1],
            five_days_ago,
            WEATHER_API_KEY
        )
        res = requests.get(api_endpoint)
        return res


def weather_data():
    armidale = (30.50828,151.67123)
    weather = WeatherAPI(location=armidale)
    data = weather.get_data()
    return data


def get_data():
    syn = Synapse('syn1899498')
    data = syn.get_data()
    return data