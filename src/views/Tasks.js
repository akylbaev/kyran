import React, { Component } from 'react'
import { Container, Row, Col } from "react-bootstrap"
import { Radio, Input, Select, DatePicker, Button, Pagination, Table } from 'antd'
import locale from 'antd/lib/date-picker/locale/ru_RU';

const { Column } = Table
const Option = Select
const RadioGroup = Radio.Group


class Tasks extends Component {

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
            name: '',
            iin: '',
            urAddress: '',
            factAddress: '',
            phone: '',
            rpo: '',
            dateFrom: '',
            dateTo: '',
            country: '',
            city: '',
            bin: '',
            createdTasks: [],
            refresh: 0
        }
    }


    onRadioChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            radioValue: e.target.value,
        });
    }

    createTable() {
        this.state.createdTasks.push(
            {
                'name': this.state.name,
                'iin': this.state.iin,
                'urAddress': this.state.urAddress,
                'factAddress': this.state.factAddress,
                'phone': this.state.phone,
                'rpo': this.state.rpo,
                'dateFrom': this.state.dateFrom,
                'dateTo': this.state.dateTo,
                'country': this.state.country,
                'city': this.state.city,
                'bin': this.state.bin,
            }
        )
        this.setState({ refresh: this.state.refresh + 1 })

    }

    render() {
        return (
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
                            <Input style={{ width: 200 }} onChange={(text) => this.setState({ iin: text.target.value })} />
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
                                                    <Option value={goods.code} onChange={(value) => this.setState({ rpo: value.target.value })}>{goods.value}</Option>
                                                )
                                            })}
                                        </Select>
                                    </div>
                                </Col>

                                <Col lg={3}>
                                    <div style={{ display: 'flex', flexDirection: 'column', }}>
                                        Дата с:
                            <DatePicker locale={locale} style={{ width: 200 }} onChange={(date) => this.setState({ dateFrom: date })} />
                                    </div>
                                </Col>
                                <Col lg={3}>
                                    <div style={{ display: 'flex', flexDirection: 'column', }}>
                                        Дата по:
                            <DatePicker locale={locale} style={{ width: 200 }} onChange={(date) => this.setState({ dateTo: date })} />
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
                                    <Button type="primary" style={{ width: 200, marginTop: 23 }} onClick={() => this.createTable()}>Создать</Button>
                                </Col>
                            </Row>

                            <Table dataSource={this.state.createdTasks} style={{marginTop: 20}}>
                                <Column
                                    title="ФИО"
                                    dataIndex="name"
                                    key="name"
                                />
                                <Column
                                    title="ИИН"
                                    dataIndex="iin"
                                    key="iin"
                                />
                                <Column
                                    title="Адрес"
                                    dataIndex="factAddress"
                                    key="factAddress"
                                />
                                <Column
                                    title="Контакты"
                                    dataIndex="phone"
                                    key="phone"
                                />
                                <Column
                                    title="Вид РПО"
                                    dataIndex="rpo"
                                    key="rpo"
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
                            <Input style={{ width: 200 }} onChange={(text) => this.setState({ bin: text.target.value })} />
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
                                                    <Option value={goods.code} onChange={(value) => this.setState({ rpo: value.target.value })}>{goods.value}</Option>
                                                )
                                            })}
                                        </Select>
                                    </div>
                                </Col>
                                <Col lg={3}>
                                    <div style={{ display: 'flex', flexDirection: 'column', }}>
                                        Дата с:
                            <DatePicker locale={locale} style={{ width: 200 }} onChange={(date) => this.setState({ dateFrom: date })} />
                                    </div>
                                </Col>
                                <Col lg={3}>
                                    <div style={{ display: 'flex', flexDirection: 'column', }}>
                                        Дата по:
                            <DatePicker locale={locale} style={{ width: 200 }} onChange={(date) => this.setState({ dateTo: date })} />
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
                                    <Button type="primary" style={{ width: 200, marginTop: 23 }} onClick={() => this.createTable()}>Создать</Button>
                                </Col>
                            </Row>

                            <Table dataSource={this.state.createdTasks} style={{marginTop: 20}}>
                                <Column
                                    title="Наименование"
                                    dataIndex="name"
                                    key="name"
                                />
                                <Column
                                    title="Бин"
                                    dataIndex="bin"
                                    key="bin"
                                />
                                <Column
                                    title="Юр. адрес"
                                    dataIndex="urAddress"
                                    key="urAddress"
                                />
                                <Column
                                    title="Факт. адрес"
                                    dataIndex="factAddress"
                                    key="factAddress"
                                />
                                <Column
                                    title="Контакты"
                                    dataIndex="phone"
                                    key="phone"
                                />
                                
                                <Column
                                    title="Вид РПО"
                                    dataIndex="phone"
                                    key="phone"
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
                            </Table>

                        </div>
                    }
                </div>
                {/* <div style={{ marginTop: 10, backgroundColor: '#efefef', padding: 10 }}>
                    {this.state.refresh &&
                        this.state.createdTasks.slice(this.state.minValue, this.state.maxValue).map(val => (
                            <div style={{display: 'flex', flexDirection: 'row',}}>
                                <p style={{marginLeft: 10, marginRight: 10}}>{val.name}</p>
                                <p style={{marginLeft: 10, marginRight: 10}}>{val.iin}</p>
                                <p style={{marginLeft: 10, marginRight: 10}}>{val.urAddress}</p>
                                <p style={{marginLeft: 10, marginRight: 10}}>{val.factAddress}</p>
                                <p style={{marginLeft: 10, marginRight: 10}}>{val.phone}</p>
                                <p style={{marginLeft: 10, marginRight: 10}}>{val.rpo}</p>
                                <p style={{marginLeft: 10, marginRight: 10}}>{val.dateFrom}</p>
                                <p style={{marginLeft: 10, marginRight: 10}}>{val.dateTo}</p>
                                <p style={{marginLeft: 10, marginRight: 10}}>{val.country}</p>
                                <p style={{marginLeft: 10, marginRight: 10}}>{val.city}</p>
                                <p style={{marginLeft: 10, marginRight: 10}}>{val.bin}</p>
                            </div>
                        ))}
                    <Pagination showQuickJumper defaultCurrent={1} total={this.state.createdTasks.length} onChange={this.handleChange}/>
                </div> */}

            </Container>
        )
    }
}

export default Tasks