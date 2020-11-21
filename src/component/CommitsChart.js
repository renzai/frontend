import Chart from "chart.js";
import {useEffect, useState} from "react";

const CommitsChart = ({repository}) => {
    const [chart, setChart] = useState(undefined)

    useEffect(() => {
        if (!repository) return

        fetch(`http://localhost:8080/api/commitDistribution?repo=${repository}`)
            .then(response => response.json())
            .then(response => {
                const data = Object.entries(response).map(([key, value]) => ({t: new Date(key), y: value}))
                    .sort((first, second) => first.t.getTime() - second.t.getTime())
                if (chart) {
                    chart.data.datasets = [{data}]
                    chart.update()
                } else {
                    let commitsChart = new Chart(document.getElementById("commitsChart"), {
                        type: 'line',
                        data: {
                            datasets: [{data}],
                        },
                        options: {
                            title: {
                                display: true,
                                text: "Last 100 Commit Distribution"
                            },
                            legend: {
                                display: false
                            },
                            plugins: {
                                colorschemes: {
                                    scheme: 'brewer.SetThree12'
                                }
                            },
                            scales: {
                                xAxes: [{
                                    type: 'time',
                                    time: {unit: 'day'},
                                    distribution: 'series'
                                }]
                            }
                        }
                    })
                    setChart(commitsChart)
                }
            })
    }, [repository])

    return (
        <div>
            {repository && <canvas id="commitsChart" width="600" height="400"/>}
        </div>
    )
}

export {CommitsChart as default}
