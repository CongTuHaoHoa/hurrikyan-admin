import * as UI from '@material-ui/core'
import * as Icon from '@material-ui/icons'
import * as actionTitle from '../../Redux/actions/title'
import * as actionLoader from '../../Redux/actions/loader'
import * as Chart from '../../Components/Charts'

import MostView from '../../Components/Portfolio/Dashboard'
import BotChat from '../../Components/BotChat/Dashboard'
import Command from '../../Components/Command/Dashboard'
import Actions from '../../Components/Actions/Dashboard'

import { connect } from "react-redux";
import API from "../../Config/api";
import { useEffect, useState } from "react";

const DashBoard = (props) =>
{
    const [action, setAction] = useState([])

    const [visit, setVisit] = useState({ percentage: { "home": 0, "about": 0, "exp": 0, "pfl": 0, "ad": 0, "be": 0 }, timeline : [{ name : 'Hôm qua', time : 0 }, { name : 'Hôm nay', time : 0 }] })

    useEffect(() =>
    {
        props.socket.on('visit', socketOnVisit)
        props.setTitle({ title : 'Bảng điều khiển', path : '/', icon: <Icon.Dashboard/> })

        API.GET('log').then(r =>
        {
            if (!r.errors) setAction(r.sort((a, b) => (new Date(b.time)).getTime() - (new Date(a.time)).getTime()).slice(0, 5))
            socketOnVisit()
        })

        // eslint-disable-next-line
    }, [])

    const socketOnVisit = () =>
    {
        API.GET('visit/').then(r => { if (!r.errors) { setVisit(r) } })
    }

    const renderTimeline = () => visit.timeline.map((v, i) => <Chart.Data data={ [v.time] } key={ i }>{ v.name }</Chart.Data>)

    const renderActions = () => action.map((v, i) => <Actions key={ i }>{ v }</Actions>)

    return  <div className='dashboard'>
        <div className='dashboard-viewer'>
            <UI.Typography variant='h6' color='primary'>Hoạt động gần đây</UI.Typography>
            { renderActions() }
        </div>
        <div>
            <UI.Typography variant='h6' color='primary'>Quan tâm nhiều nhất</UI.Typography>
            <MostView>
                {
                    {
                        img: 'https://firebasestorage.googleapis.com/v0/b/hurrikyan-portfolio.appspot.com/o/portfolio%2Fhurrikyan-portfolio.png?alt=media&token=3246cfe6-0063-40b1-8508-bd021ceee2dc',
                        title: 'Hurrikyan | Công Tử Hào Hoa',
                        access: 150,
                        share: 10,
                        percentage: 10
                    }
                }
            </MostView>
        </div>
        <div>
            <UI.Typography variant='h6' color='primary'>Tần suất truy cập</UI.Typography>
            <Chart.Bar className='dashboard-viewer-container'>
                <Chart.Data data={ [visit.percentage.home] }>Trang chủ</Chart.Data>
                <Chart.Data data={ [visit.percentage.about] }>Giới thiệu</Chart.Data>
                <Chart.Data data={ [visit.percentage.exp] }>Kinh nghiệm</Chart.Data>
                <Chart.Data data={ [visit.percentage.pfl] }>Công việc</Chart.Data>
                <Chart.Data data={ [visit.percentage.ad] }>Admin</Chart.Data>
                <Chart.Data data={ [visit.percentage.be] }>Back end</Chart.Data>
            </Chart.Bar>
        </div>
        <div className='dashboard-viewer'>
            <UI.Typography variant='h6' color='primary'>Lượt truy cập</UI.Typography>
            <Chart.Line className='dashboard-viewer-container'>
                { renderTimeline() }
            </Chart.Line>
        </div>
        <div className='dashboard-viewer-2'>
            <UI.Typography variant='h6' color='primary'>Lệnh điều khiển</UI.Typography>
            <Command/>
        </div>
        <div>
            <UI.Typography variant='h6' color='primary'>Bot chat</UI.Typography>
            <BotChat/>
        </div>
    </div>
}

const mapStateToProps = (state) =>
{
    return { socket: state.socket }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setTitle: (value) => { dispatch(actionTitle.setTitle(value)) },
        setLoader: (value) => { dispatch(actionLoader.setLoaded(value)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard)
