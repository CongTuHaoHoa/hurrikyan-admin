const constants = require('../reducer/types')
const initState = { title : 'Hurrikyan | Công Tử Hào Hoa', path : '/' }

const reducers = (state = initState, action) =>
{
    switch (action.type)
    {
        case constants.title:
            state = action.value
            document.title = `Hurrikyan | ${ state.title }`
            window.scrollTo(0, 0)
            break
        default: break
    }

    return state
}

export default reducers
