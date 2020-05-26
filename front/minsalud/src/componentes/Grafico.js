import React, { Component } from 'react'
import Chart from "chart.js";

export default class LineGraph extends Component {
    chartRef = React.createRef();
    
    componentDidMount() {
        const context = this.chartRef.current.getContext("2d");
        
        new Chart(context, {
            type: "line",
            data: {
                //Traer la data
                labels: ["Ene", "Feb", "Mar", "May"],
                datasets: [
                    {
                        label: "Enfermos",
                        data: [100,150,160,170,200],
                    },
                    {
                        label: "Curados",
                        data: [50,69,74,170,200],
                    },
                    {
                        label: "Muertos",
                        data: [100,500,740,800],
                    },
                ]
            },
            options: {
                //Agregar opciones de estilos y ejes
            }
        });
    }
    render() {
        return (
            <div >
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}