import React, {useState, useEffect} from 'react';
import { Line, Scatter } from 'react-chartjs-2';

const options = {
  scales: {
    xAxes: [
      {
        type: 'timeseries',
      },
    ],
  },
};


const TimeSeries = ({chartData}) => {

    const [dataSet, setDataSet] = useState(null);

    useEffect(()=>{
        const colors = {
            "A": {r: 255, g:89, b:9},
            "B": {r: 25, g:202, b:58},
            "C": {r: 138, g:201, b:38},
            "D": {r: 25, g:130, b:196},
        }
        setDataSet({datasets :
            Object.keys(chartData).map( d => {
            const color = colors[d];
            return {
                label: chartData[d].label,
                data: chartData[d].data,
                fill: true,
                backgroundColor: `rgb(${color.r},${color.g},${color.b},0.5)`,
                borderColor: `rgb(${color.r},${color.g},${color.b})`,
            }
        })})
    }, [chartData]);

    return (
    <>
        <Scatter data={dataSet} options={options}/>
    </>
    )
};

export default TimeSeries;