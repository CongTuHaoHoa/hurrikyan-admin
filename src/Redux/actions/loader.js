import * as types from '../reducer/types'

export const setLoaded = (value) =>
{
    return  { type : types.loader, value }
}

export const setSignIn = (value) =>
{
    return  { type : types.signIn, value }
}
