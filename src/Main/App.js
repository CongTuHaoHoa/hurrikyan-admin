import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import SignIn from "../Screens/SignIn";
import Home from "../Screens/Home";

const App = (props) =>
{
  return  <>
    <div className={ `loader ${ props.loader ? 'loader-show' : '' }` }/>
    <Switch>
      <Route exact path='/'>
        <Home/>
      </Route>
      <Route exact path='/signin'>
        <SignIn/>
      </Route>
    </Switch>
  </>
}
const mapStateToProps = (state) =>
{
    return { loader : state.loader }
}


export default connect(mapStateToProps, null)(App)
