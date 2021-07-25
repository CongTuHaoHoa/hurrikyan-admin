const convertDateTime = (date) =>
{
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()

    const days = date.getDay()
    const months = date.getMonth() + 1
    const years = date.getFullYear() + 1
    return `Ngày ${ days > 10 ? days : `0${ days }` }/${ months > 10 ? months : `0${ months }` }/${ years } (${ hours > 10 ? hours : `0${ hours }` }:${ minutes > 10 ? minutes : `0${ minutes }` }:${ seconds > 10 ? seconds : `0${ seconds }` })`
}

export default convertDateTime
