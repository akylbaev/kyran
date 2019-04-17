import React, { Component } from 'react'
import { Radio, Input, Select, DatePicker, Button, Table, Form, Divider } from 'antd'

// const { Column } = Table
// const Option = Select

const password = 'marat123'
const username = 'test'

const psw = '123456'


class AddUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: null,
            firstName: null,
            lastName: null,
            middleName: null,
            role: "USER",
        }
    }

    createUser = () => {
        fetch('/kyran/api/admin/employee/create', {
            method: 'post',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(username + ":" + password).toString('base64'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                login: this.state.username,
                password: psw,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                middleName: this.state.middleName,
                role: this.state.role
            }),
        }).then((response) => {
            response.status === 200 ? alert("Пользователь успешно создан") : alert("Что то пошло не так!")
        })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <div style={{ display: 'flex', flex: 1, alignItems: 'center', paddingTop: 70, flexDirection: 'column' }}>
                
                <div style={{ display: 'flex', width: 500, backgroundColor: '#f2f2f2', alignItems: 'center', flexDirection: 'column', padding: 20}}>
                    <p style={{ padding: 0, margin: 0, fontSize: 20, fontWeight: '500' }}>Создать пользователя</p>
                    <div style={{ display: 'flex', flexDirection: 'column', }}>
                        <p style={{ padding: 0, margin: 0, fontSize: 16, fontWeight: '500' }}>Логин:</p>
                        <Input placeholder="Логин" style={{ width: 250 }} onChange={(text) => this.setState({ username: text.target.value.toLocaleLowerCase() })} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', }}>
                        <p style={{ padding: 0, margin: 0, fontSize: 16, fontWeight: '500' }}>Фамилия:</p>
                        <Input placeholder="Логин" style={{ width: 250 }} onChange={(text) => this.setState({ lastName: text.target.value })} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', }}>
                        <p style={{ padding: 0, margin: 0, fontSize: 16, fontWeight: '500' }}>Имя:</p>
                        <Input placeholder="Логин" style={{ width: 250 }} onChange={(text) => this.setState({ firstName: text.target.value })} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', }}>
                        <p style={{ padding: 0, margin: 0, fontSize: 16, fontWeight: '500' }}>Очество:</p>
                        <Input placeholder="Логин" style={{ width: 250 }} onChange={(text) => this.setState({ middleName: text.target.value })} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', }}>
                        <p style={{ padding: 0, margin: 0, fontSize: 16, fontWeight: '500' }}>Роль:</p>
                        <Select defaultValue={"USER"} style={{ width: 250 }} onChange={(value)=>this.setState({role: value})}>
                                <Select.Option value="ADMIN">Админ</Select.Option>
                                <Select.Option value="VERTUHAY">Надзорщик</Select.Option>
                                <Select.Option value="USER">Пользователь</Select.Option>
                        </Select>
                    </div>
                    <Button type="primary" style={{width: 250, marginTop: 10, marginBottom: 10}} onClick={this.createUser}>Создать</Button>
                </div>
            </div>
        )
    }
}

export default AddUser;