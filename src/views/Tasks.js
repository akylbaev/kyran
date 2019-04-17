import React, { Component } from 'react'
import { Container, Row, Col } from "react-bootstrap"
import { Radio, Input, Select, DatePicker, Button, Table } from 'antd'
import locale from 'antd/lib/date-picker/locale/ru_RU';

const { Column } = Table
const Option = Select.Option
const RadioGroup = Radio.Group

let username = 'test'
let password = 'marat123'


class Tasks extends Component {

    componentDidMount() {
        this.getTasks()
    }

    constructor(props) {
        super(props);
        this.state = {
            radioValue: 1,
            minValue: 0,
            maxValue: 10,
            typeOfGoods: [
                { 'code': 'P205', 'value': 'Почтовая карточка СНГ/ДЗ' },
                { 'code': 'P201', 'value': 'Письмо СНГ/ДЗ' },
                { 'code': 'P202', 'value': 'Бандероль СНГ/ДЗ' },
                { 'code': 'P207', 'value': '"Мешок М" СНГ/ДЗ' },
                { 'code': 'P203', 'value': 'Посылка СНГ/ДЗ' },
                { 'code': 'P206', 'value': 'Мелкий пакет СНГ/ДЗ' },
                { 'code': 'P105', 'value': 'Почтовая карточка РК' },
                { 'code': 'P101', 'value': 'Письмо РК' },
                { 'code': 'P102', 'value': 'Бандероль РК' },
                { 'code': 'P103', 'value': 'Посылка РК' },
                { 'code': 'P106', 'value': 'Мелкий пакет РК' },
                { 'code': 'P109', 'value': 'Посылка на почтамат' },
                { 'code': 'P145', 'value': 'Посылка E-commerce' },
                { 'code': 'EMSparcell', 'value': 'EMS - посылка' },
                { 'code': 'EMSbag', 'value': 'EMS - пакет' },],
            name: null,
            iinbin: null,
            urAddress: null,
            factAddress: null,
            phone: null,
            rpo: null,
            dateFrom: null,
            dateTo: null,
            country: null,
            city: null,
            adresat: null,
            createdTasks: [],
            refresh: 0,
            listOfTasks: [],
            loading: false
        }
    }


    onRadioChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            radioValue: e.target.value,
        });
    }

    async createTask() {
        // this.state.createdTasks.push(
        //     {
        //         'name': this.state.name,
        //         'iinbin': this.state.iinbin,
        //         'urAddress': this.state.urAddress,
        //         'factAddress': this.state.factAddress,
        //         'phone': this.state.phone,
        //         'rpo': this.state.rpo,
        //         'dateFrom': this.state.dateFrom,
        //         'dateTo': this.state.dateTo,
        //         'country': this.state.country,
        //         'city': this.state.city,
        //     }
        // )
        // this.setState({ refresh: this.state.refresh + 1 })
        await this.setState({ loading: true })
        await fetch('/kyran/api/task/create', {
            method: 'post',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(username + ":" + password).toString('base64'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": this.state.name,
                "iinbin": this.state.iinbin,
                "address": this.state.factAddress,
                "telephone": this.state.phone,
                "type": null,
                "category": null,
                "dateFrom": this.state.dateFrom,
                "dateTo": this.state.dateTo,
                "city": this.state.city,
                "country": this.state.country,
                "isNotify": true,
            }),
        }).then((response) => {
            response.status === 200 ? alert('Задача успешно создана') : alert('Убедитесь в правильности вводимых данных')
            this.setState({ loading: false })
        })
            .catch((error) => {
                console.error(error);
            });
        this.getTasks()
    }

    getTasks() {
        fetch('/kyran/api/task/list', {
            method: 'get',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(username + ":" + password).toString('base64'),
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ listOfTasks: responseJson })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    removeTask(id) {
        fetch('/kyran/api/task/remove?id=' + id, {
            method: 'delete',
        })
        this.getTasks()
    }

    render() {
        return (
            <div style={{ display: 'flex', flex: 1, overflowY: 'scroll' }}>
                <Container style={{ marginTop: 70 }}>
                    <h4 style={{ textAlign: 'center' }}>Задание на контроль почтового отправления, грузов по различным критериям</h4>
                    <div style={{ marginTop: 10, backgroundColor: '#efefef', padding: 10 }}>
                        <Row>
                            <Col lg={6}>
                                <RadioGroup value={this.state.radioValue} onChange={this.onRadioChange}>
                                    <Radio value={1}>Физические лица</Radio>
                                    <Radio value={2}>Юридические лица</Radio>
                                </RadioGroup>
                            </Col>
                        </Row>
                        {this.state.radioValue === 1 ?
                            <div>
                                <Row>
                                    <Col lg={3}>
                                        <div style={{ display: 'flex', flexDirection: 'column', }}>
                                            ФИО:
                            <Input style={{ width: 200 }} onChange={(text) => this.setState({ name: text.target.value })} />
                                        </div>
                                    </Col>
                                    <Col lg={3}>
                                        <div style={{ display: 'flex', flexDirection: 'column', }}>
                                            ИИН:
                            <Input style={{ width: 200 }} onChange={(text) => this.setState({ iinbin: text.target.value })} />
                                        </div>
                                    </Col>
                                    <Col lg={3}>
                                        <div style={{ display: 'flex', flexDirection: 'column', }}>
                                            Адрес проживания:
                            <Input style={{ width: 200 }} onChange={(text) => this.setState({ factAddress: text.target.value })} />
                                        </div>
                                    </Col>
                                    <Col lg={3}>
                                        <div style={{ display: 'flex', flexDirection: 'column', }}>
                                            Контактный телефон:
                            <Input style={{ width: 200 }} onChange={(text) => this.setState({ phone: text.target.value })} />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={3}>
                                        <div style={{ display: 'flex', flexDirection: 'column', }}>
                                            Вид РПО:
                                        <Select defaultValue={this.state.typeOfGoods[0].code} style={{ width: 200 }}>

                                                {this.state.typeOfGoods.map((goods, index) => {
                                                    return (
                                                        <Option value={goods.code} onChange={(value) => console.log(value)} key={index}>{goods.value}</Option>
                                                    )
                                                })}
                                            </Select>
                                        </div>
                                    </Col>

                                    <Col lg={3}>
                                        <div style={{ display: 'flex', flexDirection: 'column', }}>
                                            Дата с:
                            <DatePicker locale={locale} style={{ width: 200 }} onChange={(dateString) => this.setState({ dateFrom: dateString })} />
                                        </div>
                                    </Col>
                                    <Col lg={3}>
                                        <div style={{ display: 'flex', flexDirection: 'column', }}>
                                            Дата по:
                            <DatePicker locale={locale} style={{ width: 200 }} onChange={(dateString) => this.setState({ dateTo: dateString })} />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={3}>
                                        <div style={{ display: 'flex', flexDirection: 'column', }}>
                                            Страна:
                                {/* <Select defaultValue='KZ' style={{ width: 200 }}>
                                    <Option value="KZ">Казахстан</Option>
                                    <Option value="RU">Россия</Option>
                                </Select> */}
                                            <Input style={{ width: 200 }} onChange={(text) => this.setState({ country: text.target.value })} />
                                        </div>
                                    </Col>
                                    <Col lg={3}>
                                        <div style={{ display: 'flex', flexDirection: 'column', }}>
                                            Город:
                                {/* <Select defaultValue='01' style={{ width: 200 }}>
                                    <Option value="01">Нур-Султан</Option>
                                    <Option value="02">Алматы</Option>
                                </Select> */}
                                            <Input style={{ width: 200 }} onChange={(text) => this.setState({ city: text.target.value })} />
                                        </div>
                                    </Col>
                                    <Col lg={3}>
                                        <Button type="primary" style={{ width: 200, marginTop: 23 }} loading={this.state.loading} onClick={() => this.createTask()}>Создать</Button>
                                    </Col>
                                </Row>

                                <Table dataSource={this.state.listOfTasks} style={{ marginTop: 20 }}>
                                    <Column
                                        title="ФИО"
                                        dataIndex="name"
                                        key="name"
                                    />
                                    <Column
                                        title="ИИН"
                                        dataIndex="iinbin"
                                        key="iinbin"
                                    />
                                    <Column
                                        title="Адрес"
                                        dataIndex="address"
                                        key="address"
                                    />
                                    <Column
                                        title="Контакты"
                                        dataIndex="telephone"
                                        key="telephone"
                                    />
                                    <Column
                                        title="Вид РПО"
                                        dataIndex="type"
                                        key="type"
                                    />
                                    <Column
                                        title="Дата"
                                        dataIndex="dateFrom"
                                        key="dateFrom"
                                    />
                                    <Column
                                        title="Город"
                                        dataIndex="city"
                                        key="city"
                                    />
                                    <Column
                                        title="Страна"
                                        dataIndex="country"
                                        key="country"
                                    />
                                    <Column
                                        title="Удалить"
                                        key="remove"
                                        render={(task) => (
                                            <Button type='danger' onClick={()=>this.removeTask(task.id)}>Х</Button>
                                        )}
                                    />
                                </Table>

                            </div>

                            :
                            <div>
                                <Row>
                                    <Col lg={3}>
                                        <div style={{ display: 'flex', flexDirection: 'column', }}>
                                            Наименование:
                            <Input style={{ width: 200 }} onChange={(text) => this.setState({ name: text.target.value })} />
                                        </div>
                                    </Col>
                                    <Col lg={3}>
                                        <div style={{ display: 'flex', flexDirection: 'column', }}>
                                            Адресат:
                            <Input style={{ width: 200 }} onChange={(text) => this.setState({ adresat: text.target.value })} />
                                        </div>
                                    </Col>
                                    <Col lg={3}>
                                        <div style={{ display: 'flex', flexDirection: 'column', }}>
                                            Юредический адрес:
                            <Input style={{ width: 200 }} onChange={(text) => this.setState({ urAddress: text.target.value })} />
                                        </div>
                                    </Col>
                                    <Col lg={3}>
                                        <div style={{ display: 'flex', flexDirection: 'column', }}>
                                            Фактический адрес:
                            <Input style={{ width: 200 }} onChange={(text) => this.setState({ factAddress: text.target.value })} />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={3}>
                                        <div style={{ display: 'flex', flexDirection: 'column', }}>
                                            БИН:
                            <Input style={{ width: 200 }} onChange={(text) => this.setState({ iinbin: text.target.value })} />
                                        </div>
                                    </Col>
                                    <Col lg={3}>
                                        <div style={{ display: 'flex', flexDirection: 'column', }}>
                                            Контактный телефон:
                            <Input style={{ width: 200 }} onChange={(text) => this.setState({ phone: text.target.value })} />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={3}>
                                        <div style={{ display: 'flex', flexDirection: 'column', }}>
                                            Вид РПО:
                                        <Select defaultValue={this.state.typeOfGoods[0].code} style={{ width: 200 }}>

                                                {this.state.typeOfGoods.map((goods, index) => {
                                                    return (
                                                        <Option value={goods.code} onChange={(value) => this.setState({ rpo: value.target.value })} key={index}>{goods.value}</Option>
                                                    )
                                                })}
                                            </Select>
                                        </div>
                                    </Col>
                                    <Col lg={3}>
                                        <div style={{ display: 'flex', flexDirection: 'column', }}>
                                            Дата с:
                            <DatePicker locale={locale} style={{ width: 200 }} onChange={(dateString) => this.setState({ dateFrom: dateString })} />
                                        </div>
                                    </Col>
                                    <Col lg={3}>
                                        <div style={{ display: 'flex', flexDirection: 'column', }}>
                                            Дата по:
                            <DatePicker locale={locale} style={{ width: 200 }} onChange={(dateString) => this.setState({ dateTo: dateString })} />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={3}>
                                        <div style={{ display: 'flex', flexDirection: 'column', }}>
                                            Страна:
                                {/* <Select defaultValue='KZ' style={{ width: 200 }}>
                                    <Option value="KZ">Казахстан</Option>
                                    <Option value="RU">Россия</Option>
                                </Select> */}
                                            <Input style={{ width: 200 }} onChange={(text) => this.setState({ country: text.target.value })} />
                                        </div>
                                    </Col>
                                    <Col lg={3}>
                                        <div style={{ display: 'flex', flexDirection: 'column', }}>
                                            Город:
                                {/* <Select defaultValue='01' style={{ width: 200 }}>
                                    <Option value="01">Нур-Султан</Option>
                                    <Option value="02">Алматы</Option>
                                </Select> */}
                                            <Input style={{ width: 200 }} onChange={(text) => this.setState({ city: text.target.value })} />
                                        </div>
                                    </Col>
                                    <Col lg={3}>
                                        <Button type="primary" style={{ width: 200, marginTop: 23 }} loading={this.state.loading} onClick={() => this.getTasks()}>Создать</Button>
                                    </Col>
                                </Row>

                                <Table dataSource={this.state.listOfTasks} style={{ marginTop: 20 }}>
                                    <Column
                                        title="Наименование"
                                        dataIndex="name"
                                        key="name"
                                    />
                                    <Column
                                        title="Бин"
                                        dataIndex="iinbin"
                                        key="iinbin"
                                    />
                                    <Column
                                        title="Юр. адрес"
                                        dataIndex="address"
                                        key="address"
                                    />
                                    <Column
                                        title="Факт. адрес"
                                        dataIndex="address"
                                        key="address"
                                    />
                                    <Column
                                        title="Контакты"
                                        dataIndex="telephphone"
                                        key="telephphone"
                                    />

                                    <Column
                                        title="Вид РПО"
                                        dataIndex="type"
                                        key="type"
                                    />
                                    <Column
                                        title="Дата"
                                        dataIndex="dateFrom"
                                        key="dateFrom"
                                    />
                                    <Column
                                        title="Дата"
                                        dataIndex="dateTo"
                                        key="dateTo"
                                    />
                                    <Column
                                        title="Город"
                                        dataIndex="city"
                                        key="city"
                                    />
                                    <Column
                                        title="Страна"
                                        dataIndex="country"
                                        key="country"
                                    />
                                    <Column
                                        title="Удалить"
                                        key="remove"
                                        render={(task) => (
                                            <Button type='danger' onClick={()=>this.removeTask(task.id)}>Х</Button>
                                        )}
                                    />
                                </Table>

                            </div>
                        }
                    </div>

                </Container>
            </div>
        )
    }
}

export default Tasks