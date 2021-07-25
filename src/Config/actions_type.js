import * as Icon from '@material-ui/icons'

const getDatabaseData = (type) =>
{
    let icon, name

    switch (type)
    {
        case 'portfolio': icon = <Icon.Work/>; name = 'Công việc'; break;
        case 'education': icon = <Icon.School/>; name = 'Học vấn'; break;
        default: break;
    }

    return  {
        add: { icon, name: `Thêm [${ name }]`, color: '#34d025' },
        edit: { icon, name: `Sửa [${ name }]`, color: '#e39218' },
        remove: { icon, name: `Xóa [${ name }]`, color: '#932222' }
    }
}

const output =
{
    account:
    {
        signin :
        {
            icon: <Icon.AccountCircle/>,
            name: 'Đăng nhập',
            color: '#1eafa4'
        },
        signout :
        {
            icon: <Icon.AccountCircle/>,
            name: 'Đăng xuất',
            color: '#de368d'
        },
    },
    database:
    {
        portfolio : getDatabaseData('portfolio'),
        education : getDatabaseData('education')
    },
    settings:
    {
        botchat :
        {
            icon: <Icon.Settings/>,
            name: 'Bot Chat',
            color: '#065EA1'
        }
    }
}

export default output
