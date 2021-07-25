import * as UI from '@material-ui/core'
import * as actionTitle from '../../Redux/actions/title'
import * as actionLoader from '../../Redux/actions/loader'
import * as Chart from '../../Components/Charts'
import * as BotChatConstance from '../../Config/constance'
import actions from '../../Config/actions_type'

import MostView from '../../Components/Portfolio/Dashboard'
import BotChat from '../../Components/BotChat/Dashboard'
import Command from '../../Components/Command/Dashboard'
import Actions from '../../Components/Actions/Dashboard'

import { connect } from "react-redux";
import { useEffect } from "react";

const DashBoard = (props) =>
{
    useEffect(() =>
    {
        props.setTitle({ title : 'Bảng điều khiển', path : '/' })
        // eslint-disable-next-line
    }, [])

    return  <div className='dashboard'>
        <div className='dashboard-viewer'>
            <UI.Typography variant='h6' color='primary'>Hoạt động gần đây</UI.Typography>
            <Actions date={ new Date(Date.now()) } ip='192.168.0.101'>{ actions.account.signin }</Actions>
            <Actions date={ new Date(Date.now()) } ip='192.168.0.101'>{ actions.database.portfolio.edit }</Actions>
            <Actions date={ new Date(Date.now()) } ip='192.168.0.101'>{ actions.database.education.add }</Actions>
            <Actions date={ new Date(Date.now()) } ip='192.168.0.101'>{ actions.settings.botchat }</Actions>
            <Actions date={ new Date(Date.now()) } ip='192.168.0.101'>{ actions.account.signout }</Actions>
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
                <Chart.Data data={ [50] }>Trang chủ</Chart.Data>
                <Chart.Data data={ [15] }>Giới thiệu</Chart.Data>
                <Chart.Data data={ [20] }>Kinh nghiệm</Chart.Data>
                <Chart.Data data={ [45] }>Công việc</Chart.Data>
                <Chart.Data data={ [90] }>Back end</Chart.Data>
            </Chart.Bar>
        </div>
        <div className='dashboard-viewer'>
            <UI.Typography variant='h6' color='primary'>Lượt truy cập</UI.Typography>
            <Chart.Line className='dashboard-viewer-container'>
                <Chart.Data data={ [50] }>17/07</Chart.Data>
                <Chart.Data data={ [65] }>18/07</Chart.Data>
                <Chart.Data data={ [40] }>19/07</Chart.Data>
                <Chart.Data data={ [45] }>20/07</Chart.Data>
                <Chart.Data data={ [15] }>21/07</Chart.Data>
                <Chart.Data data={ [20] }>Hôm qua</Chart.Data>
                <Chart.Data data={ [95] }>Hôm nay</Chart.Data>
            </Chart.Line>
        </div>
        <div className='dashboard-viewer-2'>
            <UI.Typography variant='h6' color='primary'>Lệnh điều khiển</UI.Typography>
            <Command/>
        </div>
        <div>
            <UI.Typography variant='h6' color='primary'>Hoạt động Bot chat</UI.Typography>
            <BotChat type={ BotChatConstance.BOTCHAT_SEND } date={ new Date(Date.now()) }>Ahihi Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet commodi deleniti dicta distinctio dolores, doloribus enim et ipsum provident quasi?</BotChat>
            <BotChat type={ BotChatConstance.BOTCHAT_GROUP } date={ new Date(Date.now()) }>[asd4asdahjgsefj]</BotChat>
            <BotChat type={ BotChatConstance.BOTCHAT_POWER } date={ new Date(Date.now()) }>Khởi động lại</BotChat>
            <BotChat type={ BotChatConstance.BOTCHAT_RECEIVED } date={ new Date(Date.now()) }>Ahihi Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto debitis delectus dolores explicabo facere fugiat fugit in ipsam iure nulla odit officia provident quaerat qui sed soluta, sunt tempora ullam veniam voluptatibus. Aut facere facilis ipsa molestias perspiciatis placeat unde. At dolores eaque impedit in itaque iure odit soluta voluptates!</BotChat>
            <BotChat type={ BotChatConstance.BOTCHAT_SEND } date={ new Date(Date.now()) }>Ahihi Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet commodi deleniti dicta distinctio dolores, doloribus enim et ipsum provident quasi?</BotChat>
        </div>
    </div>
}

const mapDispatchToProps = (dispatch) =>
{
    return {
        setTitle : (value) => { dispatch(actionTitle.setTitle(value)) },
        setLoader : (value) => { dispatch(actionLoader.setLoaded(value)) }
    }
}

export default connect(null, mapDispatchToProps)(DashBoard)
