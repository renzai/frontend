import Chart from "chart.js";
import {useEffect, useState} from "react";

function CommittersChart({repository}) {
    const [chart, setChart] = useState(undefined)

    useEffect(() => {
            if (!repository) return;

            fetch(`http://localhost:8080/api/committers?repo=${repository}`)
                .then(response => response.json())
                .then(response => {
                    if (chart) {
                        chart.data.datasets = [{data: Object.values(response)}]
                        chart.data.labels = Object.keys(response)
                        chart.update()
                    } else {
                        const committersChart = new Chart(document.getElementById("committersChart"), {
                            type: 'horizontalBar',
                            data: {
                                datasets: [{
                                    data: Object.values(response)
                                }],
                                labels: Object.keys(response)
                            },
                            options: {
                                title: {
                                    display: true,
                                    text: "Last 100 Commit Contributors"
                                },
                                legend: {
                                    display: false
                                },
                                plugins: {
                                    colorschemes: {
                                        scheme: 'brewer.SetThree12'
                                    }
                                }
                            }
                        })
                        setChart(committersChart)
                    }
                })
        }
        , [repository])

    return (
        <div>
            {repository && <canvas id="committersChart" width="600" height="400"/>}
        </div>
    )
}

export {CommittersChart as default}
