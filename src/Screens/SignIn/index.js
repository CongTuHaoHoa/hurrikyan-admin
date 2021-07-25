import * as UI from '@material-ui/core'
import * as Icon from '@material-ui/icons'
import * as actionTitle from '../../Redux/actions/title'
import * as actionLoader from '../../Redux/actions/loader'

import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { useHistory } from 'react-router-dom'

const SignIn = (props) =>
{
    const history = useHistory()

    const [data, setData] = useState({ username : '', password : '' })
    const [showPass, setShowPass] = useState(false)
    const [errors, setErrors] = useState({ username : '', password : '' })

    const onChange = (event) =>
    {
        setErrors({ ...errors, [event.target.name] : '' })
        setData({ ...data, [event.target.name] : event.target.value })
    }

    const onSubmit = (event) =>
    {
        event.preventDefault()
        props.setLoader(true)

        setTimeout(() =>
        {
            const err = { username : '', password : '' }
            if (data.username === '') err.username = '* Hãy nhập tên đăng nhập'
            if (data.password === '') err.password = '* Hãy nhập mật khẩu'

            if (data.username === '' || data.password === '') setErrors(err)
            else
            {
                if (data.username === 'hurrikyan' && data.password === '05022004')
                {
                    setErrors({ username : '', password : '' })
                    history.push('/')
                }
                else setErrors({ username : '', password : '* Sai mật khẩu hoặc tài khoản' })
            }

            props.setLoader(false)
        }, 1500)
    }

    useEffect(() =>
    {
        props.setTitle({ title : 'Sign In', path : '/signin' })
        // eslint-disable-next-line
    }, [])

    return  <form onSubmit={ onSubmit } className='signin-form'>
        <UI.FormControl className='signin-control'>
            <UI.TextField helperText={ errors.username } error={ errors.username.length } type='text' value={ data.username } onChange={ onChange } name='username' label='Tên đăng nhập' InputProps={{ startAdornment: <Icon.Person className='tf-icon' color='primary'/>,}}/>
            <UI.TextField  helperText={ errors.password } error={ errors.password.length } type={ showPass ? 'text' : 'password'} value={ data.password } onChange={ onChange } name='password' label='Mật khẩu' InputProps={{ startAdornment: <Icon.VpnKey className='tf-icon' color='primary'/>, endAdornment: <UI.IconButton onClick={ () => setShowPass(!showPass)}>{ showPass ? <Icon.Visibility color='primary' /> : <Icon.VisibilityOff />}</UI.IconButton> }}/>
            <UI.Button type='submit' variant='contained' color='primary'>Đăng nhập</UI.Button>
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
