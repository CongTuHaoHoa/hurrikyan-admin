import * as UI from '@mui/material'
import { useEffect, useState } from "react";

const Dashboard = (props) =>
{
    const { img, title, access, share, percentage } = props.children

    const isBindW = () =>
    {
        const view = document.getElementById('---portfolio-mostview-img-view')
        const img = document.getElementById('---portfolio-mostview-img')

        const wv = view.offsetWidth
        const hv = view.offsetHeight

        const wi = img.naturalWidth
        const hi = img.naturalHeight

        return wv / hv < wi / hi
    }

    const [w, setW] = useState(false)

    useEffect(() =>
    {
        const set = () =>
        {
            setW(isBindW())
        }
        window.addEventListener('resize', set)
        return () => window.removeEventListener('resize', set)
    })

    return  <div className='portfolio-mostview'>
        <div className='portfolio-mostview-img' id='---portfolio-mostview-img-view'>
            <img className={`portfolio-mostview-img-${ w ? 'w' : 'h' }`} src={ img } onLoad={ () => setW(isBindW()) } alt='Most view' id='---portfolio-mostview-img'/>
        </div>
        <h2>{ title }</h2>
        <div className='portfolio-mostview-details'>
            <p><b>Tổng lượt truy cập :</b> { access }</p>
            <p color='primary'><b>Lượt chia sẻ :</b> { share }</p>
            <p color='primary'><b>Tần suất :</b> { percentage }%</p>
        </div>
        <UI.Button variant='contained' color='primary'>Chi tiết</UI.Button>
    </div>
}

export default Dashboard
