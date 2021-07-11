import React, {useEffect, useState} from 'react';
import { Scatter } from 'react-chartjs-2';

const options = {
    showLine: true,
    scales: {
        xAxes: [{
    type: 'time',
 }],
    },
}

const TemperatureChart = ({chartData}) => {
    const [dataSet, setDataSet] = useState(null);

    useEffect(()=>{
        setDataSet({datasets :
            Object.keys(chartData).map( d => {
            return {
                label: 'Temperture',
                data: chartData[d].map(x => ({x:new Date(x.x * 1000), y:x.y})),
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            }
        })})
    }, [chartData]);

    return (
        <>
            <Scatter data={dataSet} options={options}/>
        </>
    )
};

export default TemperatureChart;