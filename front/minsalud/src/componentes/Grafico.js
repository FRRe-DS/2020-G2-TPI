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
                        borderColor: "#4F9CCF",
                        fill: false
                    },
                    {
                        label: "Curados",
                        data: [50,69,74,170,200],
                        borderColor: "#99D6FE",
                        fill: false
                    },
                    {
                        label: "Muertos",
                        data: [100,500,740,800],
                        borderColor: "#1B4F72",
                        fill: false
                    },
                ]
            },
            options: {
                //Agregar opciones de estilos y ejes
                tooltips:{
                    backgroundColor: '#1B4F72'
                },
                
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