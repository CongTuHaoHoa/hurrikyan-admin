import convertDateTime from '../../Config/convertDateTime'

const Dashboard = (props) =>
{
    const { date, ip } = props
    const { name, icon, color } = props.children

    return  <div className='actions-dashboard' style={ { color, background: `${ color }20` } }>
        { icon }
        <div>
            <p>{ convertDateTime(date) }</p>
            <h3>{ name }</h3>
        </div>
        <h4>Địa chỉ IP : { ip }</h4>
    </div>
}

export default Dashboard
