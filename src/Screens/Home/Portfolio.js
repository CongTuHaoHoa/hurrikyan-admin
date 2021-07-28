// import * as UI from '@material-ui/core'
import * as Icon from '@material-ui/icons'
import * as actionTitle from '../../Redux/actions/title'
import * as actionLoader from '../../Redux/actions/loader'

// import { useState } from "react"
import {connect} from "react-redux";
import {useEffect} from "react";

const Portfolio = (props) =>
{
    useEffect(() =>
    {
        props.setTitle({ title : 'Công việc', path : '/portfolio', icon: <Icon.Work/> })
        // eslint-disable-next-line
    }, [])

    return  <>
        Portfolio
    </>
}

const mapDispatchToProps = (dispatch) =>
{
    return {
        setTitle : (value) => { dispatch(actionTitle.setTitle(value)) },
        setLoader : (value) => { dispatch(actionLoader.setLoaded(value)) }
    }
}

export default connect(null, mapDispatchToProps)(Portfolio)
