import * as UI from '@material-ui/core'
import * as Icon from '@material-ui/icons'
import * as actionTitle from '../../Redux/actions/title'
import * as actionLoader from '../../Redux/actions/loader'

import { connect } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import DashBoard from "./Dashboard";
import Portfolio from "./Portfolio";
import Message from "./Message";
import Request from "./Request";
import Settings from "./Settings";
import Education from "./Education";
import {createRef, useEffect} from "react";
import API from "../../Config/api"

const Home = (props) =>
{
    const history = useHistory()
    let ref = createRef()

    const changePath = (path) =>
    {
        history.push(path)
    }

    const onFocus = () =>
    {
        ref['focus']()
    }

    const is = path => props.title.path === path

    const signOut = () =>
    {
        props.setLoader(true)
        API.DELETE('hurrikyan/signin').then(() =>
        {
            props.setSignIn(false)
        })
    }

    useEffect(() =>
    {
        props.setLoader(false)
        // eslint-disable-next-line
    }, [])

    return  <>
        <UI.AppBar position="fixed" className='appbar'>
            <UI.Toolbar style={ { justifyContent: "space-between" } }>
                <UI.Typography variant="h6">{ props.title.title }</UI.Typography>
                <div className='appbar-search' onClick={ onFocus }>
                    <Icon.Search color='primary'/>
                    <input placeholder='Tìm kiếm...' ref={ (input) => { ref = input } }/>
                </div>
            </UI.Toolbar>
        </UI.AppBar>
        <UI.Drawer variant="permanent" className='drawer'>
            <UI.List>
                <UI.ListItem button onClick={ () => changePath('/') } selected={ is('/') }>
                    <UI.ListItemIcon><Icon.Dashboard color='primary'/></UI.ListItemIcon>
                    <UI.ListItemText primary='Bảng điều khiển'/>
                </UI.ListItem>
                <UI.ListItem button onClick={ () => changePath('/education') } selected={ is('/education') }>
                    <UI.ListItemIcon><Icon.School color='primary'/></UI.ListItemIcon>
                    <UI.ListItemText primary='Học vấn'/>
                </UI.ListItem>
                <UI.ListItem button onClick={ () => changePath('/portfolio') } selected={ is('/portfolio') }>
                    <UI.ListItemIcon><Icon.Work color='primary'/></UI.ListItemIcon>
                    <UI.ListItemText primary='Công việc'/>
                </UI.ListItem>
                <UI.ListItem button onClick={ () => changePath('/message') } selected={ is('/message') }>
                    <UI.ListItemIcon>
                        <UI.Badge badgeContent={4} color="error">
                            <Icon.Inbox color='primary'/>
                        </UI.Badge>
                    </UI.ListItemIcon>
                    <UI.ListItemText primary='Tin nhắn'/>
                </UI.ListItem>
                <UI.ListItem button onClick={ () => changePath('/request') } selected={ is('/request') }>
                    <UI.ListItemIcon>
                        <UI.Badge badgeContent={4} color="error">
                            <Icon.Description color='primary'/>
                        </UI.Badge>
                    </UI.ListItemIcon>
                    <UI.ListItemText primary='Yêu cầu'/>
                </UI.ListItem>
                <UI.ListItem button onClick={ () => changePath('/settings') } selected={ is('/settings') }>
                    <UI.ListItemIcon>
                        <Icon.Settings color='primary'/>
                    </UI.ListItemIcon>
                    <UI.ListItemText primary='Cài đặt'/>
                </UI.ListItem>
            </UI.List>
            <UI.List>
                <UI.ListItem button onClick={ signOut }>
                    <UI.ListItemIcon><Icon.PowerSettingsNew color='error'/></UI.ListItemIcon>
                    <UI.ListItemText primary='Đăng xuất'/>
                </UI.ListItem>
            </UI.List>
        </UI.Drawer>

        <div className='contents'>
            <Switch>
                <Route exact path='/'>
                    <DashBoard/>
                </Route>
                <Route exact path='/portfolio'>
                    <Portfolio/>
                </Route>
                <Route exact path='/education'>
                    <Education/>
                </Route>
                <Route exact path='/message'>
                    <Message/>
                </Route>
                <Route exact path='/request'>
                    <Request/>
                </Route>
                <Route exact path='/settings'>
                    <Settings/>
                </Route>
            </Switch>
        </div>
    </>
}
const mapStateToProps = (state) =>
{
    return { title : state.title }
}

const mapDispatchToProps = (dispatch) =>
{
    return {
        setTitle : (value) => { dispatch(actionTitle.setTitle(value)) },
        setLoader : (value) => { dispatch(actionLoader.setLoaded(value)) },
        setSignIn : (value) => { dispatch(actionLoader.setSignIn(value)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
