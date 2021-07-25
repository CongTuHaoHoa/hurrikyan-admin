import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import SignIn from "../Screens/SignIn";
import Home from "../Screens/Home";
import API from "../Config/api"
import {useEffect, useState} from "react";
import * as actionLoader from "../Redux/actions/loader";

const App = (props) =>
{
  const [loaded, setLoaded] = useState(false)

  useEffect(() =>
  {
    API.GET('hurrikyan').then(r =>
    {
      props.setSignIn(!r.errors)
      setLoaded(true)
    })

    // eslint-disable-next-line
  }, [])

  return  <>
    <div className={ `loader ${ props.loader ? 'loader-show' : '' }` }/>
    { loaded ?
        <Switch>
          <Route exact path='/signin'>
            { props.signIn ? <Redirect to="/" /> : <SignIn/> }
          </Route>
          <Route path='/'>
            { !props.signIn ? <Redirect to="/signin" /> : <Home/> }
          </Route>
        </Switch>
    : null }
  </>
}

const mapStateToProps = (state) =>
{
    return { loader : state.loader.loader, signIn : state.loader.signIn }
}

const mapDispatchToProps = (dispatch) =>
{
  return { setSignIn : (value) => { dispatch(actionLoader.setSignIn(value)) } }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
