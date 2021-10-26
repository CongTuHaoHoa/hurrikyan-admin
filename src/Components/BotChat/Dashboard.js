import * as UI from '@mui/material'
import * as Icon from '@mui/icons-material'
import { useEffect, useState } from "react"
import API from "../../Config/api"
import * as actionLoader from "../../Redux/actions/loader"
import { connect } from "react-redux"

const Dashboard = (props) =>
{
    const [appState, setAppState] = useState([])
    const [status, setStatus] = useState('stop')

    const onChange = (event) =>
    {
        if (event.target.files && event.target.files[0])
        {
            const reader = new FileReader()
            reader.readAsText(event.target.files[0], "UTF-8");
            reader.onload = (e) => readCookies(e.target.result)
        }
    }

    const readCookies = (data) =>
    {
        const { cookies } = JSON.parse(data)

        setAppState(cookies.map(c =>
        {
            const { domain, path, value } = c
            const key = c.name
            return { domain, path, value, key }
        }))
    }

    useEffect(() =>
    {
        if (appState.length)
        {
            props.setLoaded(true)
            API.PATCH('botchat', { appState }).then(() => props.setLoaded(false))
        }
        // eslint-disable-next-line
    }, [appState])

    const onBotchatStatus = data => setStatus(data)

    useEffect(() =>
    {
        props.setLoaded(true)

        API.GET('botchat').then(r =>
        {
            if (!r.errors) setStatus(r.status)
            props.setLoaded(false)
        })
        props.socket.on('botchat-status', onBotchatStatus)
        // eslint-disable-next-line
    }, [])

    const start = () =>
    {
        props.setLoaded(true)

        API.POST('botchat').then(() =>
        {
            props.setLoaded(false)
        })
    }

    return  <div className='botchat-dashboard'>
        <div>
            <span className={ `botchat-dashboard-${ status }` }/>
            { status !== 'start' ?
                <UI.Button disabled={ props.loader || status === 'pending' } onClick={ start } component="span" variant='contained' color='primary'>
                    Khởi chạy
                    {
                        props.loader || status === 'pending' ? <UI.CircularProgress size={ 20 } color='inherit' style={ { marginLeft : 10 } }/>
                            : <Icon.PlayArrow style={ { marginLeft : 10 } }/>
                    }
                </UI.Button>
                : null }
            <label htmlFor={ props.loader || status === 'pending' ? '' : '---icon-button-file' }>
                <UI.Button disabled={ props.loader || status === 'pending' } component="span" variant='contained' color='primary'>
                    Nạp cookies
                    {
                        props.loader || status === 'pending' ? <UI.CircularProgress size={ 20 } color='inherit' style={ { marginLeft : 10 } }/>
                            : <Icon.SystemUpdateAlt style={ { marginLeft : 10 } }/>
                    }
                </UI.Button>
            </label>
            <input accept='application/JSON' onChange={ onChange } id="---icon-button-file" type="file" />
        </div>
    </div>
}

const mapStateToProps = (state) =>
{
    return { socket: state.socket, loader: state.loader.loader }
}

const mapDispatchToProps = (dispatch) =>
{
    return { setLoaded : (value) => { dispatch(actionLoader.setLoaded(value)) } }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

