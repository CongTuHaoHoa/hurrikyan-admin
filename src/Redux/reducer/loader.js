const constants = require('../reducer/types')
const initState = { loader : false, signIn : false }

const reducers = (state = initState, action) =>
{
    switch (action.type)
    {
        case constants.loader: state = { ...state, loader : action.value }; break
        case constants.signIn: state = { ...state, signIn : action.value }; break
        default: break
    }

    return state
}

export default reducers
