import * as Icon from '@material-ui/icons'
import * as Constance from '../../Config/constance'
import convertDateTime from '../../Config/convertDateTime'

const Dashboard = (props) =>
{
    const { type, date } = props
    const info = props.children

    const renderIcon = () =>
    {
        switch (type)
        {
            case Constance.BOTCHAT_RECEIVED : return <Icon.CallReceived/>
            case Constance.BOTCHAT_GROUP : return <Icon.Group/>
            case Constance.BOTCHAT_SEND : return <Icon.CallMade/>
            case Constance.BOTCHAT_POWER : return <Icon.Power/>
            default: return null
        }
    }
    const getColor = () =>
    {
        switch (type)
        {
            case Constance.BOTCHAT_RECEIVED : return 'received'
            case Constance.BOTCHAT_GROUP : return 'group'
            case Constance.BOTCHAT_SEND : return 'send'
            case Constance.BOTCHAT_POWER : return 'power'
            default: return null
        }
    }

    return  <div className={`botchat-dashboard botchat-dashboard-${ getColor() }`}>
        { renderIcon() }
        <div>
            <p>{ convertDateTime(date) }</p>
            <h3>{ info }</h3>
        </div>
    </div>
}

export default Dashboard
