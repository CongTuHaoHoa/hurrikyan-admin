// import * as UI from '@material-ui/core'
import * as Icon from '@mui/icons-material'
import * as actionTitle from '../../Redux/actions/title'
import * as actionLoader from '../../Redux/actions/loader'

// import { useState } from "react"
import {connect} from "react-redux";
import {useEffect} from "react";

const Request = (props) =>
{
    useEffect(() =>
    {
        props.setTitle({ title : 'Yêu cầu', path : '/request', icon: <Icon.Description/> })
        // eslint-disable-next-line
    }, [])

    return  <>
        Request
    </>
}

const mapDispatchToProps = (dispatch) =>
{
    return {
        setTitle : (value) => { dispatch(actionTitle.setTitle(value)) },
        setLoader : (value) => { dispatch(actionLoader.setLoaded(value)) }
    }
}

export default connect(null, mapDispatchToProps)(Request)
