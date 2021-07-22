import { combineReducers } from 'redux'
// import socket from './reducer-socket-io'
import title from './title'
import loader from './loader'

const reducer = combineReducers({ title, loader })

export default reducer
