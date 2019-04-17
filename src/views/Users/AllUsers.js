import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Input, Select, DatePicker, Button, Table, Form, Divider } from 'antd'

const { Column } = Table
const Option = Select



class AllUsers extends Component {

    constructor(props){
        super(props)
        this.state = {
            users: [],
            login: null,
            role: 'all',
            status: null
        }
    }

    componentDidMount(){
        this.getUsers()
    }

    getUsers(){
        var username = this.state.login ? 'login=' + this.state.login : ''
        var dostup = this.state.role !== 'all' ? '&role=' + this.state.role : ''
        var status = this.state.status ? '&activated=' + this.state.status : '' 
        fetch('/kyran/api/admin/employee/list?' + username + dostup + status, {
            method: 'get'
        }).then((response) => response.json())
            .then((responseJson) => {

                var data = responseJson
                data.map((object) => {
                    if(object.role === "USER"){
                        object.valueRole = 'Пользователь'
                    } else if (object.role === "VERTUHAY"){
                        object.valueRole = 'Надзорщик'
                    } else if (object.role === "ADMIN"){
                        object.valueRole = 'Администратор'
                    }
                })
                this.setState({users: data})

                // responseJson.map(function(value, key){
                    
                //     let user={"login": value.login, "fio": value.lastName + " " + value.firstName + " " + value.middleName, "role": value.role}
                //     this.state.users.push(user)
                // })
                
            })
            .catch((error) => {
                console.error(error);
            });
    }

    async removeUser(id) {
        await fetch('/kyran/api/admin/employee/remove/' + id, {
            method: 'delete',
        })
        this.getUsers()
    }

    

    render() {
        return (
            <div style={{ display: 'flex', flex: 1 }}>
                {/* <Container style={{ marginTop: 70, }}>
                    <div style={{ backgroundColor: '#efefef', padding: 10 }}>
                        <Table dataSource={data}>
                            <Column
                                title="№"
                                dataIndex="key"
                                key="id"
                            />
                            <Column
                                title="Логин"
                                dataIndex="name"
                                key="login"
                            />
                            <Column
                                title="Роль"
                                dataIndex="role"
                                key="role"
                            />
                            <Column
                                title="Действие"
                                key="action"
                                render={(text, record) => (
                                    <span>
                                        <a href="javascript:;">Редактировать</a>
                                        <Divider type="vertical" />
                                        <a href="javascript:;">Delete</a>
                                    </span>
                                )}
                            />
                        </Table>
                    </div>
                </Container> */}
                <div style={{ display: 'flex', flex: 1, backgroundColor: '#f2f2f2', paddingTop: 70, justifyContent: 'center' }}>
                    <Form>
                        <Form.Item style={{ marginBottom: 0 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', }}>
                                <p style={{ padding: 0, margin: 0, fontSize: 16, fontWeight: '500' }}>Логин:</p>
                                <Input placeholder="Логин" style={{ width: 250 }} onChange={(text) => this.setState({ login: text.target.value.toLocaleLowerCase() })} />
                            </div>
                        </Form.Item>
                        <Form.Item style={{ marginBottom: 0 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', }}>
                                <p style={{ padding: 0, margin: 0, fontSize: 16, fontWeight: '500' }}>Права доступа:</p>
                                <Select defaultValue='all' style={{ width: 250 }} onChange={(value)=>this.setState({role: value})}>
                                    <Option value="all">Все</Option>
                                    <Option value="VERHUHAY">Надзорщик</Option>
                                    <Option value="USER">Пользователь</Option>
                                </Select>
                            </div>
                        </Form.Item>
                        <Form.Item style={{ marginBottom: 0 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', }}>
                                <p style={{ padding: 0, margin: 0, fontSize: 16, fontWeight: '500' }}>Срок действия:</p>
                                <Input placeholder="Срок действия" style={{ width: 250 }} onChange={(text) => this.setState({ reciver: text.target.value })} />
                            </div>
                        </Form.Item>
                        <Form.Item style={{ marginBottom: 10 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', }}>
                                <p style={{ padding: 0, margin: 0, fontSize: 16, fontWeight: '500' }}>Статус доступа:</p>
                                <Select defaultValue='true' style={{ width: 250 }} onChange={(value)=>this.setState({status: value})}>
                                    <Option value="true">Активный</Option>
                                    <Option value="false">Неактивный</Option>
                                </Select>
                            </div>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: 250 }} onClick={() => this.getUsers()}>Поиск</Button>
                        </Form.Item>
                    </Form>
                </div>
                <div style={{ display: 'flex', flex: 4, padding: 10, paddingTop: 70, alignItems: 'center', flexDirection: 'column'}}>
                    <Button type="primary" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 40, right: 40, width: 80, height: 80, borderRadius: 40 }}><Link to='/users/add'><p style={{fontSize: 40, fontWeight: '600', color: '#fff'}}>+</p></Link></Button>
                    <Table dataSource={this.state.users} style={{ width: 1000 }} bordered={true}>
                        <Column
                            title="Логин"
                            dataIndex="login"
                            key="login"
                        />
                        <Column
                            title="Фамилия"
                            dataIndex="lastName"
                            key="lastName"
                        />
                        <Column
                            title="Имя"
                            dataIndex="firstName"
                            key="lofirstNamegin"
                        />
                        <Column
                            title="Очество"
                            dataIndex="middleName"
                            key="middleName"
                        />
                        <Column
                            title="Роль"
                            dataIndex="valueRole"
                            key="valueRole"
                        />
                        <Column
                            title="Действие"
                            key="action"
                            render={(user) => (
                                <span>
                                    <Button type='primary'><Link to={{ pathname: `/users/${user.id}`, state: {user: user}}}>Редактировать</Link></Button>
                                    <Divider type="vertical" />
                                    <Button type='danger' onClick={()=>this.removeUser(user.id)}>Удалить</Button>
                                </span>
                            )}
                        />
                    </Table>
                </div>
            </div>
        )
    }
}

export default AllUsers;