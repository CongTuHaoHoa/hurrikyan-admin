import url from '../../Config/url'
import { io } from 'socket.io-client'
const socket = io(url, { transports: ["websocket"] })
const initState = socket

const reducers = (state = initState) =>
{
    return state
}

export default reducers
