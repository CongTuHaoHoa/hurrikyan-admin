import axios from 'axios'
import url from './url'

const tokenPath = 'hurrikyan'
const tokenName = 'token'
const withCredentials = true

const GET = (url) =>
{
    return call(url, 'GET', null)
}

const POST = (url, body = null) =>
{
    return call(url, 'POST', body)
}

const PUT = (url, body = null) =>
{
    return call(url, 'PUT', body)
}

const PATCH = (url, body = null) =>
{
    return call(url, 'PATCH', body)
}

const DELETE = (url) =>
{
    return call(url, 'DELETE', null)
}

const call = async  (endpoint, method, body) =>
{
    const data = new FormData()

    if (body) Object.keys(body).forEach(key =>
    {
        if (Array.isArray(body[key]) || typeof body[key] === 'object') data.append(key, JSON.stringify(body[key]))
        else data.append(key, body[key])
    })

    switch (method)
    {
        case 'GET' : return await axios.get(`${ url }/${ endpoint }`, { withCredentials }).then(r => r.data).catch(err => err)
        case 'POST' : return await axios.post(`${ url }/${ endpoint }`, data, { withCredentials }).then(r => r.data).catch(err => err)
        case 'PUT' :
        {
            return await axios.get(`${ url }/${ tokenPath }`, { withCredentials }).then(async result =>
            {
                data.append('token', result.data[tokenName])
                return await axios.put(`${ url }/${ endpoint }`, data).then(r => r.data).catch(err => err)
            }).catch(err => err)
        }
        case 'PATCH' :
        {
            return await axios.get(`${ url }/${ tokenPath }`, { withCredentials }).then(async result =>
            {
                data.append('token', result.data[tokenName])
                return await axios.patch(`${ url }/${ endpoint }`, data).then(r => r.data).catch(err => err)
            }).catch(err => err)
        }
        case 'DELETE' :
        {
            return await axios.get(`${ url }/${ tokenPath }`, { withCredentials }).then(async result =>
            {
                data.append('token', result.data[tokenName])
                return await axios.delete(`${ url }/${ endpoint }`, { data }).then(r => r.data).catch(err => err)
            }).catch(err => err)
        }

        default: return null
    }
}

const API = { GET, POST, PUT, PATCH, DELETE }

export default API
