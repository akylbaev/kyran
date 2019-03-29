import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import {Menu, Button} from 'antd'

class Sidebar extends Component {
    render() {
        return (
            // <div style={{ width: 300, height: window.innerHeight, backgroundColor: '#555' }}>
            //     <div style={{ width: 300, height: 50, alignItems: 'center', backgroundColor: '#000', display: 'flex', justifyContent: 'center' }}>
            //         <p style={{ fontSize: 24, color: '#fff', margin: 0 }}>Kyran</p>
            //     </div>
            //     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            //         <NavLink to='/search' style={{textDecoration: 'none', fontSize: '18', color: '#fff'}}>Поиск</NavLink>
            //         <NavLink to='/tasks' style={{textDecoration: 'none', fontSize: '18', color: '#fff'}}>Задачи</NavLink>
            //     </div>
            // </div>
            <Menu style={{width: 300, height: window.innerHeight}}>
                <Menu.Item><NavLink to='/search'>Поиск</NavLink></Menu.Item>
                <Menu.Item><NavLink to='/tasks'>Задачи</NavLink></Menu.Item>
                <Menu.Item><NavLink to='/tasks'>Выход</NavLink></Menu.Item>
                {/* <Button type="primary">Выход</Button> */}
            </Menu>
        )
    }
}

export default Sidebar