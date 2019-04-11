import React, { Component } from 'react'
import { Radio, Input, Select, DatePicker, Button, Table, Form, Divider } from 'antd'
import locale from 'antd/lib/date-picker/locale/ru_RU';
import { Container } from 'react-bootstrap';

const { Column } = Table
const Option = Select

let data = [{
    key: '1',
    name: 'Нурканат',
    role: 'Админ'
}, {
    key: '2',
    name: 'Марат',
    role: 'Модератор'
}, {
    key: '3',
    name: 'Джейсон',
    role: 'Пользователь'
}]

class Users extends Component {
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
                        <Form.Item>
                            <div style={{ display: 'flex', flexDirection: 'column', }}>
                                <p style={{ padding: 0, margin: 0, fontSize: 16, fontWeight: '500' }}>Логин:</p>
                                <Input placeholder="Логин" style={{ width: 250 }} onChange={(text) => this.setState({ reciver: text.target.value })} />
                            </div>
                        </Form.Item>
                        <Form.Item>
                            <div style={{ display: 'flex', flexDirection: 'column', }}>
                                <p style={{ padding: 0, margin: 0, fontSize: 16, fontWeight: '500' }}>Права доступа:</p>
                                <Select defaultValue='admin' style={{ width: 250 }}>
                                    <Option value="admin">Админ</Option>
                                    <Option value="moderator">Модератор</Option>
                                </Select>
                            </div>
                        </Form.Item>
                        <Form.Item>
                            <div style={{ display: 'flex', flexDirection: 'column', }}>
                                <p style={{ padding: 0, margin: 0, fontSize: 16, fontWeight: '500' }}>Срок действия:</p>
                                <Input placeholder="Логин" style={{ width: 250 }} onChange={(text) => this.setState({ reciver: text.target.value })} />
                            </div>
                        </Form.Item>
                        <Form.Item>
                            <div style={{ display: 'flex', flexDirection: 'column', }}>
                                <p style={{ padding: 0, margin: 0, fontSize: 16, fontWeight: '500' }}>Статус доступа:</p>
                                <Input placeholder="Логин" style={{ width: 250 }} onChange={(text) => this.setState({ reciver: text.target.value })} />
                            </div>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{width: 250}}>Поиск</Button>
                        </Form.Item>
                    </Form>
                </div>
                <div style={{ display: 'flex', flex: 4, padding: 10, paddingTop: 70, justifyContent: 'center'}}>
                    <Table dataSource={data} style={{width: 1000}} bordered={true}>
                        <Column
                            title="№"
                            dataIndex="key"
                            key="id"
                            width={20}
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
                                    <a href="javascript:;">Удалить</a>
                                </span>
                            )}
                        />
                    </Table>
                </div>
            </div>
        )
    }
}

export default Users