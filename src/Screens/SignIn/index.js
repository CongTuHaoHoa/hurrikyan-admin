import * as UI from '@material-ui/core'
import * as Icon from '@material-ui/icons'
import * as actionTitle from '../../Redux/actions/title'
import * as actionLoader from '../../Redux/actions/loader'

import { useEffect, useState } from "react"
import { connect } from "react-redux"
import API from "../../Config/api"

const SignIn = (props) =>
{
    const [data, setData] = useState({ username : '', password : '', code: '' })
    const [showPass, setShowPass] = useState(false)
    const [errors, setErrors] = useState({ username : '', password : '', code: '' })
    const [key, setKey] = useState('')

    const onChange = (event) =>
    {
        setErrors({ ...errors, [event.target.name] : '' })
        const value = event.target.name === 'code' && event.target.value.toString().length > 6 ? event.target.value.toString().substring(0, 6) : event.target.value
        setData({ ...data, [event.target.name] : value })
    }
    const onSignIn = (event) =>
    {
        event.preventDefault()
        props.setLoader(true)

        const { username, password } = data
        API.POST('hurrikyan/signin', { username, password }).then(r =>
        {
            if (r.errors)
            {
                let error = { username : '', password : '', code: '' }
                r.errors.forEach(err =>
                {
                    switch (err.code)
                    {
                        case 3001: error = { ...error, username: '* Hãy nhập tài khoản' }; break;
                        case 3002: error = { ...error, password: '* Hãy nhập mật khẩu' }; break;
                        case 3003: error = { ...error, username: '* Sai tài khoản hoặc mật khẩu', password: '* Sai tài khoản hoặc mật khẩu' }; break;
                        default: error = { ...error, username : ' ', password: '* Lỗi không xác định, thử lại sau' }; break;
                    }
                })

                setErrors(error)
            }
            else setKey(r.key)

            props.setLoader(false)
        })
    }
    const onValidate = (event) =>
    {
        event.preventDefault()
        props.setLoader(true)

        const { code } = data

        API.POST('hurrikyan/validate', { key, code }).then(r =>
        {
            if (r.errors)
            {
                let error = { username : '', password : '', code: '' }

                r.errors.forEach(err =>
                {
                    switch (err.code)
                    {
                        case 3004: error = { ...errors, code: '* Hãy nhập mã xác thực' }; break;
                        case 3006: error = { ...errors, code: '* Sai mã xác thực' }; break;
                        default: error = { ...errors, code: '* Lỗi không xác định' }; break;
                    }
                })

                setErrors(error)

                props.setLoader(false)
            }
            else props.setSignIn(true)
        })
    }
    const refreshCode = () =>
    {
        props.setLoader(true)

        API.PATCH(`hurrikyan/validate`, { key }).then(r =>
        {
            if (r.errors) setErrors({ ...errors, code: '* Không thể làm mới mã đăng nhập' })
            else setKey(r.key)
            props.setLoader(false)
        })
    }
    const back = () =>
    {
        API.PUT(`hurrikyan/validate`, { key }).then(() =>
        {
            setKey('')
        })
    }

    useEffect(() =>
    {
        props.setTitle({ title : 'Sign In', path : '/signin' })
        props.setLoader(false)
        // eslint-disable-next-line
    }, [])

    return  <div className='signin-form'>
        <div className='signin-form-switch'>
            <form onSubmit={ onSignIn } className={ key.length ? 'signin-form-switch-on' : '' }>
                <UI.FormControl className='signin-control'>
                    <UI.TextField helperText={ errors.username } error={ errors.username.length !== 0 } type='text' value={ data.username } onChange={ onChange } name='username' label='Tên đăng nhập' InputProps={{ startAdornment: <Icon.Person className='tf-icon' color='primary'/>,}}/>
                    <UI.TextField  helperText={ errors.password } error={ errors.password.length !== 0 } type={ showPass ? 'text' : 'password'} value={ data.password } onChange={ onChange } name='password' label='Mật khẩu' InputProps={{ startAdornment: <Icon.VpnKey className='tf-icon' color='primary'/>, endAdornment: <UI.IconButton onClick={ () => setShowPass(!showPass)}>{ showPass ? <Icon.Visibility color='primary' /> : <Icon.VisibilityOff />}</UI.IconButton> }}/>
                    <UI.Button disabled={ props.loader } type='submit' variant='contained' color='primary'>
                        Đăng nhập
                        <UI.CircularProgress size={ props.loader ? 20 : 0 } color='inherit' style={ { marginLeft : props.loader ? 10 : 0 } }/>
                    </UI.Button>
                </UI.FormControl>
            </form>
            <form onSubmit={ onValidate }>
                <UI.FormControl className='signin-control'>
                    <div>
                        <UI.IconButton disabled={ props.loader } onClick={ back } type='button' variant='contained' color='primary'><Icon.ArrowBack/></UI.IconButton>
                    </div>
                    <UI.TextField helperText={ errors.code } error={ errors.code.length !== 0 } type='number' value={ data.code } onChange={ onChange } name='code' label='Mã xác thực' InputProps={{ startAdornment: <Icon.Lock className='tf-icon' color='primary'/>,}}/>
                    <UI.Button disabled={ props.loader } type='submit' variant='contained' color='primary'>
                        Xác thực
                        <UI.CircularProgress size={ props.loader ? 20 : 0 } color='inherit' style={ { marginLeft : props.loader ? 10 : 0 } }/>
                    </UI.Button>
                    <UI.Button disabled={ props.loader } type='button' color='primary' onClick={ refreshCode }>
                        Gửi lại mã
                        <UI.CircularProgress size={ props.loader ? 20 : 0 } color='primary' style={ { marginLeft : props.loader ? 10 : 0 } }/>
                    </UI.Button>
                </UI.FormControl>
            </form>
        </div>
    </div>
}

const mapStateToProps = (state) =>
{
    return { loader : state.loader.loader }
}

const mapDispatchToProps = (dispatch) =>
{
    return {
        setTitle : (value) => { dispatch(actionTitle.setTitle(value)) },
        setLoader : (value) => { dispatch(actionLoader.setLoaded(value)) },
        setSignIn : (value) => { dispatch(actionLoader.setSignIn(value)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
