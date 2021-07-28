import { combineReducers } from 'redux'
import socket from './socket'
import title from './title'
import loader from './loader'

const reducer = combineReducers({ title, loader, socket })

export default reducer
