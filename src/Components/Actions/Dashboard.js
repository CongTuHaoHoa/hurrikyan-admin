import convertDateTime from '../../Config/convertDateTime'
import actions from '../../Config/actions_type'

const Dashboard = (props) =>
{
    const { time, ip, type } = props.children
    const { name, icon, color } = actions(type)

    return  <div className='actions-dashboard' style={ { color, background: `${ color }20` } }>
        { icon }
        <div>
            <p>{ convertDateTime(new Date(time)) }</p>
            <h3>{ name }</h3>
        </div>
        <h4>Địa chỉ IP : { ip }</h4>
    </div>
}

export default Dashboard
