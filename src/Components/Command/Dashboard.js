import { createRef, useEffect, useState } from "react";

const error = '#E01079'
const help = '#1481a1'

const helpText = `
--help  :   Mở bảng trợ giúp.
cls     :   Xóa màn hình.
db [name] : Truy cập database [name]
`

const Dashboard = () =>
{
    const [command, setCommand] = useState('')
    const [commands, setCommands] = useState([])
    const [showCommand, setShowCommand] = useState(true)
    let ref = createRef()

    const onSubmit = (event) =>
    {
        event.preventDefault()

        const cmd = command
        addCommand(`> ${ cmd }`)
        setCommand('')
        setShowCommand(false)
        run(cmd)
    }

    const run = (cmd) =>
    {
        switch (cmd)
        {
            case '--help': addCommand(helpText, help); setShowCommand(true); break;
            case 'cls': setCommands([]); setShowCommand(true); break;
            default: runMultiple(cmd); break;
        }
    }

    const runMultiple = (cmd) =>
    {
        const cmds = cmd.split(' ')

        switch (cmds[0])
        {
            case 'db': addCommand('Truy cập database'); break;
            default: addCommand(`Không thể tìm thấy lệnh "${ cmd }".`, error); break;
        }

        setShowCommand(true)
    }

    const onChange = (event) =>
    {
        setCommand(event.target.value.toString().toLowerCase())
    }

    const renderHelp = () => commands.length === 0 ? '--help' : 'Nhập lệnh'

    useEffect(() =>
    {
        const list = document.getElementById('---command-dashboard')
        list.scrollTop = list.scrollHeight
    }, [commands])

    const onFocus = () =>
    {
        ref['focus']()
    }

    const addCommand = (message, color = '#5512B3') =>
    {
        setCommands(cm => [...cm, <p style={ { color } }>{ message.split('\n').map((v, i) =>
            <span key={ i }>{ v }<br/></span>) }</p>])
    }

    return  <div className='command-dashboard' id='---command-dashboard' onClick={ onFocus }>
        { commands }
        { showCommand ?
        <form onSubmit={ onSubmit }>
            <p>{ '>' }</p>
            <input ref={ (input) => { ref = input } } value={ command } onChange={ onChange } placeholder={ renderHelp() }/>
        </form>
        : null }

    </div>
}

export default Dashboard
