import * as types from '../reducer/types'

export const setTitle = (value) =>
{
    return  { type : types.title, value }
}
