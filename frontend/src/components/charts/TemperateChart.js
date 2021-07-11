import React, {useEffect, useState} from 'react';
import { Scatter,Line } from 'react-chartjs-2';
import moment from "moment";

const options = {
    showLine: true,
    scales: {
        xAxes: [{
            type: 'line',

        }],
    },
}

const covertTime = (epoch) =>  moment.unix(epoch).format('D/MM h:mm A')

const TemperatureChart = ({chartData}) => {
    const [dataSet, setDataSet] = useState(null);

    useEffect(()=>{
        setDataSet({datasets :
            Object.keys(chartData).map( d => {
            return {
                label: 'Temperture',
                data: chartData[d].map(x => ({x:covertTime(x.x * 1000), y:x.y})),
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            }
        })})
    }, [chartData]);

    return (
        <>
            <Line data={dataSet} options={options}/>
        </>
    )
};

export default TemperatureChart;