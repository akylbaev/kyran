import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
// import axios from 'axios'



class Login extends Component {

    state = {
        redirect: true,
        password: '',
        username: ''
    }

    saveUser() {
        localStorage.setItem('UID', 'userid')
    }

    // handleLogin = () => {
    //     console.log(this.state)
    //     if (this.state.username.toLowerCase()=="login"){
    //         if(this.state.password=="Kyran123"){
    //             this.setRedirect()
    //         } else {
    //             alert("Неправильный пароль")
    //         }
    //     } else {
    //         alert("Неправильный логин")
    //     }
    // }

    handleLogin = () => {

        console.log(this.state)

        fetch('/kyran/api/user/login', {
            method: 'post',
            headers: {
                // Accept: 'application/json',
                'Content-Type': 'application/json',
                // Authorization: 'Basic bWFyYXQ6bWFyYXQxMjM=2'
            },
            body: JSON.stringify({
                login: this.state.username,
                psw: this.state.password
            }),
        }).then((response) => {
            response.status === 200 ? this.setRedirect() : alert("Неправильный логин или пароль")
        })
            .catch((error) => {
                console.error(error);
            });

        // axios.post('/api/user/login', {
        //     login: this.state.username,
        //     psw: this.state.password
        // }).then(res => {
        //         console.log(res);
        //     }).catch((error) => {
        //         console.log(error)
        //     })
    }



    setRedirect = () => {
        this.setState({
            redirect: true
        })

    }

    renderRedirect = () => {
        if (this.state.redirect) {
            this.saveUser()
            return <Redirect to='/' />
        }
    }

    render() {
        return (
            <div style={{ display: 'flex', width: window.innerWidth, height: window.innerHeight, justifyContent: 'center' }}>
                <div style={{ width: 300, marginTop: 100 }}>
                    <h2 style={{ alignText: 'center', textAlign: 'center', marginBottom: 50 }}>Авторизация</h2>
                    <div className="imput-group mb-3">
                        <input type="text" className="form-control" placeholder="Логин" onChange={(text) => this.setState({ username: text.target.value })}/>
                    </div>
                    <div className="imput-group mb-3">
                        <input type="password" className="form-control" placeholder="Пароль" onChange={(text) => this.setState({ password: text.target.value })} />
                    </div>
                    {this.renderRedirect()}
                    <button type="button" className="btn btn-primary" style={{ width: 300 }} onClick={this.handleLogin}>Вход</button>
                </div>
            </div>
        )
    }
}

export default Login