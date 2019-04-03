import React, { Component } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import {Menu, Button} from 'antd'

class Sidebar extends Component {

    state = {
        redirect: false,
    } 

    deleteUser(){
        localStorage.removeItem('UID')
        console.log('userDeleted')
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            this.deleteUser()
            return <Redirect to='/login' />
        }
    }

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
            <Menu style={{width: 300, height: window.innerHeight, paddingTop: 70, backgroundColor: '#343C49'}} theme="dark">
                
                <Menu.Item><NavLink to='/search'>Поиск</NavLink></Menu.Item>
                <Menu.Item><NavLink to='/tasks'>Задачи</NavLink></Menu.Item>
                {/* <Menu.Item><NavLink to='/tasks' onClick={this.setRedirect}>Выход</NavLink></Menu.Item> */}
                {this.renderRedirect()}
                <Menu.Item><Button type="primary" onClick={this.setRedirect}>Выход</Button></Menu.Item>
                
            </Menu>
        )
    }
}

export default Sidebar
// aa