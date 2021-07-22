import * as types from '../reducer/types'

export const setLoaded = (value) =>
{
    return  { type : types.loader, value }
}
