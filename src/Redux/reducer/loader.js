const constants = require('../reducer/types')
const initState = false

const reducers = (state = initState, action) =>
{
    switch (action.type)
    {
        case constants.loader:
            state = action.value
            break
        default: break
    }

    return state
}

export default reducers
