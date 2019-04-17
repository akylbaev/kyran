import React, { Component } from 'react'
import { Radio, Input, Select, DatePicker, Button, Table, Form, Divider } from 'antd'

const password = 'marat123'
const username = 'test'

const psw = '123456'

class EditUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: null,
            lastName: null,
            firstName: null,
            middleName: null,
            role: null
        }
    }

    async componentWillMount() {
        let data = this.props.location.state.user
        await this.setState({ username: data.login, lastName: data.lastName, firstName: data.firstName, middleName: data.middleName, role: data.role })
        console.log(this.state)
    }

    editUser = () => {
        fetch('/kyran/api/admin/employee/edit', {
            method: 'post',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(username + ":" + password).toString('base64'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.props.location.state.user.id,
                login: this.state.username,
                lastName: this.state.lastName,
                firstName: this.state.firstName,
                middleName: this.state.middleName,
                role: this.state.role
            }),
        }).then((response) => {
            response.status === 200 ? alert("Вы успешно обновили данные пользователя") : alert("Что то пошло не так!")
        })
            .catch((error) => {
                console.error(error);
            });
    }

    resetPassword = () => {
        fetch('/kyran/api/admin/employee/' + this.props.location.state.user.id + '/changePass', {
            method: 'post',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(username + ":" + password).toString('base64'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password: psw,
            }),
        }).then((response) => {
            response.status === 200 ? alert("Вы успешно сбросили пароль") : alert("Что то пошло не так!")
        })
            .catch((error) => {
                console.error(error);
            });

    }

    render() {
        return (
            <div style={{ display: 'flex', flex: 1, alignItems: 'center', paddingTop: 70, flexDirection: 'column' }}>

                <div style={{ display: 'flex', width: 500, backgroundColor: '#f2f2f2', alignItems: 'center', flexDirection: 'column', padding: 20 }}>
                    <p style={{ padding: 0, margin: 10, fontSize: 20, fontWeight: '500' }}>Редактировать пользователя</p>
                    <div style={{ display: 'flex', flexDirection: 'column', }}>
                        <p style={{ padding: 0, margin: 0, fontSize: 16, fontWeight: '500' }}>Логин:</p>
                        <Input placeholder="Логин" style={{ width: 250 }} value={this.state.username} onChange={(text) => this.setState({ username: text.target.value })} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', }}>
                        <p style={{ padding: 0, margin: 0, fontSize: 16, fontWeight: '500' }}>Фамилия:</p>
                        <Input placeholder="Логин" style={{ width: 250 }} value={this.state.lastName} onChange={(text) => this.setState({ lastName: text.target.value })} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', }}>
                        <p style={{ padding: 0, margin: 0, fontSize: 16, fontWeight: '500' }}>Имя:</p>
                        <Input placeholder="Логин" style={{ width: 250 }} value={this.state.firstName} onChange={(text) => this.setState({ firstName: text.target.value })} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', }}>
                        <p style={{ padding: 0, margin: 0, fontSize: 16, fontWeight: '500' }}>Очество:</p>
                        <Input placeholder="Логин" style={{ width: 250 }} value={this.state.middleName} onChange={(text) => this.setState({ middleName: text.target.value })} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', }}>
                        <p style={{ padding: 0, margin: 0, fontSize: 16, fontWeight: '500' }}>Роль:</p>
                        <Select defaultValue={this.state.role} style={{ width: 250 }} onChange={(value) => this.setState({ role: value })}>
                            <Select.Option value="ADMIN">Админ</Select.Option>
                            <Select.Option value="VERTUHAY">Надзиратель</Select.Option>
                            <Select.Option value="USER">Пользователь</Select.Option>
                        </Select>
                    </div>
                    <Button type="primary" style={{ width: 250, marginTop: 10, marginBottom: 10 }} onClick={this.editUser}>Сохранить</Button>
                    <Button type="primary" style={{ width: 250, marginTop: 10, marginBottom: 10 }} onClick={this.resetPassword}>Сбросить пароль</Button>
                </div>
            </div>
        )
    }
}

export default EditUser;