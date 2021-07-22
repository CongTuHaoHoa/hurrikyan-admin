import * as UI from '@material-ui/core'
import * as Icon from '@material-ui/icons'
import * as actionTitle from '../../Redux/actions/title'
import * as actionLoader from '../../Redux/actions/loader'

import { useState } from "react"
import {connect} from "react-redux";

const SignIn = (props) =>
{
    const [data, setData] = useState({ username : '', password : '' })
    const [showPass, setShowPass] = useState(false)

    const onChange = (event) =>
    {
        setData({ ...data, [event.target.name] : event.target.value })
    }

    const onSubmit = (event) =>
    {
        event.preventDefault()
        props.setLoader(true)

        setTimeout(() => props.setLoader(false), 3000)
        console.log(data)
    }

    return  <form onSubmit={ onSubmit } className='signin-form'>
        <UI.FormControl className='signin-control'>
            <UI.TextField helperText='* Tên đăng nhập không hợp lệ' error={ false } type='text' value={ data.username } onChange={ onChange } name='username' label='Tên đăng nhập' InputProps={{ startAdornment: <Icon.Person className='tf-icon' color='primary'/>,}}/>
            <UI.TextField  helperText='* Mật khẩu không hợp lệ' error={ false } type={ showPass ? 'text' : 'password'} value={ data.password } onChange={ onChange } name='password' label='Mật khẩu' InputProps={{ startAdornment: <Icon.VpnKey className='tf-icon' color='primary'/>, endAdornment: <UI.IconButton onClick={ () => setShowPass(!showPass)}>{ showPass ? <Icon.Visibility /> : <Icon.VisibilityOff />}</UI.IconButton> }}/>
            <UI.Button type='submit' variant='contained' color='secondary'>Đăng nhập</UI.Button>
        </UI.FormControl>
    </form>
}

const mapDispatchToProps = (dispatch) =>
{
    return {
        setTitle : (value) => { dispatch(actionTitle.setTitle(value)) },
        setLoader : (value) => { dispatch(actionLoader.setLoaded(value)) }
    }
}

export default connect(null, mapDispatchToProps)(SignIn)
