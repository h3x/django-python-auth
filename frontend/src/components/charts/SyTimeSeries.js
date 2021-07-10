import React, {useRef,useState, useEffect, Fragment} from "react";
import { Line } from "react-chartjs-2"
import Chartjs from "chart.js";


const SyTimeSeries = ({data, height, width}) => {
    const chartRef = useRef(null)
    const [chartInstance, setChartInstance] = useState(null);

      useEffect(() => {
        if (chartRef && chartRef.current) {
          const newChartInstance = timeSeries;
          setChartInstance(newChartInstance);
        }
      }, [chartRef]);

    const timeSeries = new Chartjs(chartRef.current, {
      type: 'line',
      options: {
        scales: {
            x: {
                type: 'timeseries',
            }
        }
      },
      data: {
        labels: Object.keys(data),
        datasets: [Object.keys(data).map(k => {
            return {
              label: k.label,
              data: k.data,
              fill: 'none',
              backgroundColor: "#554433",
              pointRadius: 2,
              borderColor: "#000",
              borderWidth: 1,
              lineTension: 2
        }})]
      }
    }
 );

    return(
        <div>
            <canvas ref={chartRef} />
        </div>
    )
}

export default SyTimeSeries

