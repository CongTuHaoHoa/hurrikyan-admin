import * as Chartjs from 'react-chartjs-2';
import { useEffect, useState } from "react";

const primary = '#5512B3'
const primary60 = '#5512B360'

const getData = (props, background) =>
{
    if (props.children)
    {
        const childs = props.children.length > 1 ? props.children : [props.children]

        const newDataSet = []
        const newLabels = []

        if (props.labels)
        {
            props.labels.forEach(item =>
            {
                newDataSet.push(
                    {
                        label: item,
                        data: [],
                        backgroundColor: [],
                        borderColor: [],
                        borderWidth: background ? 1 : 3,
                        pointRadius: 1,
                        pointHover: 5,
                    })
            })

            childs.forEach(item =>
            {
                if (item.type.name)
                {
                    newLabels.push(item.props.children)
                    item.props.data.forEach((value, index) =>
                    {
                        if (newDataSet[index])
                        {
                            newDataSet[index].data.push(value)
                            newDataSet[index].backgroundColor.push(primary60)
                            newDataSet[index].borderColor.push(primary)
                        }
                    })
                }
            })
        }
        else
        {
            const childs = props.children.length > 1 ? props.children : [props.children]
            newDataSet.push(
                {
                    data: [],
                    backgroundColor: [],
                    borderColor: [],
                    borderWidth: background ? 1 : 3,
                    pointRadius: 1,
                    pointHover: 5,
                })
            childs.forEach((item) =>
            {
                if (item.type.name)
                {
                    newLabels.push(item.props.children)
                    newDataSet[0].data.push(item.props.data[0])
                    newDataSet[0].backgroundColor.push(primary60)
                    newDataSet[0].borderColor.push(primary)
                }
            })
        }

        return { datasets: newDataSet, labels: newLabels }
    }
    else return  {
        labels: [''],
        datasets:
            [{
                label: '',
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1
            }]
    }
}

export const Data = (props) =>
{
    return  <span>{ props.children }</span>
}

export const Bar = (props) =>
{
    const [data, setData] = useState({
        labels: [''],
        datasets:
            [{
                label: '',
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1
            }]
    })
    const [options] = useState({
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true } },
        plugins: { legend: { display: false }}
    })

    useEffect(() =>
    {
        setData(getData(props, true))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.children, props.className])

    return <div className={ props.className ? props.className : '' }>
        <Chartjs.Bar data={ data } options={ options }/>
    </div>
}
export const Line = (props) =>
{
    const [data, setData] = useState({})
    const [options] = useState({
        responsive: true,
        maintainAspectRatio: false,
        fill: true,
        scales:
        {
            y: { beginAtZero: true },
        },
        elements: { line: { tension: 0.3 } },
        plugins: { legend: { display: false }}
    })

    useEffect(() =>
    {
        setData(getData(props, false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.children, props.className])

    return <div className={ props.className ? props.className : '' }>
        <Chartjs.Line data={ data } options={ options }/>
    </div>
}
export const Pie = (props) =>
{
    const [data, setData] = useState({})
    const [options, setOptions] = useState({
        responsive: true,
        maintainAspectRatio: false,
        scales:
            {
                yAxes:
                    [{
                        gridLines: { display: false, drawBorder: false },
                        ticks: { display: false }
                    }],
                xAxes:
                    [{
                        gridLines: { display: false, drawBorder: false },
                        ticks: { display: false }
                    }]
            },
        legend : { position: 'right', labels: { fontColor: primary }}
    })

    useEffect(() =>
    {
        setData(getData(props, true))
        setOptions({
            ...options,
            legend : { ...options.legend, labels: { fontColor: primary }}
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.children, props.className])

    return <div className={ props.className ? (props.className + '-pie') : '' }>
        <Chartjs.Pie data={ data } options={ options }/>
    </div>
}
