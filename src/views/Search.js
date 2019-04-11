import React, { Component } from 'react'
import { DatePicker, Select, Input, Radio, Table, Button } from 'antd'
import locale from 'antd/lib/date-picker/locale/ru_RU';
import { Container, Row, Col } from "react-bootstrap";


let url = '/kyran/api/search'
let username = 'test'
let password = 'marat123'

const { Column } = Table
const Option = Select
const RadioGroup = Radio.Group

class Search extends Component {

    constructor(props) {
        super(props)
        this.state = {
            radioValue: 1,
            // minValue: 0,
            // maxValue: 10,
            typeOfGoods: [
                { 'code': 'all', 'value': 'Все' },
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
                { 'code': 'EMSbag', 'value': 'EMS - пакет' },
            ],
            sender: null,
            barcode: null,
            reciver: null,
            postIndex: null,
            country: null,
            mailType: null,
            city: null,
            street: null,
            home: null,
            flat: null,
            dateFrom: null,
            dateTo: null,
            listOfSearch: [],
            loading: false,
        }
    }

    onRadioChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            radioValue: e.target.value,
        });
    }


    async handleSearch() {
        await this.setState({ loading: true })
        fetch(url, {
            method: 'post',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(username + ":" + password).toString('base64'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sender: this.state.sender === "" ? null : this.state.sender,
                reciver: this.state.reciver === "" ? null : this.state.reciver,
                barcode: this.state.barcode === "" ? null : this.state.barcode,
                searchAddressType: this.state.radioValue,
                addressEntity: {
                    postIndex: this.state.postIndex,
                    country: this.state.country,
                    city: this.state.city,
                    street: this.state.street,
                    home: this.state.home,
                    flat: this.state.flat
                },
                pageSize: 40,
                first: 0
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ listOfSearch: responseJson, loading: false })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {

        return (
            // <div style={{ display: 'flex', flexDirection: 'column' }}>
            //     Дата:
            //     <DatePicker locale={locale} />
            // </div>
            // <div style={{ display: 'flex', flex: 1, overflowY: 'scroll' }}>
            <Container style={{ marginTop: 70 }}>
                <h4 style={{ textAlign: 'center' }}>Поиск почтовых отправлений, грузов, пользовательские услуги почти</h4>
                <div style={{ marginTop: 10, backgroundColor: '#efefef', padding: 10 }}>
                    <Row>
                        {/* <Col sm={4}>
                        <div style={{display: 'flex', flexDirection: 'column',}}>
                            Вид услуг:
                            <Select defaultValue='Something' style={{width: 200}}>
                                <Option value="Lucy">Lucy</Option>
                                <Option value="Jack">Jack</Option>
                            </Select>
                        </div>
                    </Col> */}
                        <Col lg={4}>
                            <div style={{ display: 'flex', flexDirection: 'column', }}>
                                Дата с:
                                <DatePicker locale={locale} style={{ width: 200 }} onChange={(date, dateString) => this.setState({ dateFrom: dateString })} />
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div style={{ display: 'flex', flexDirection: 'column', }}>
                                Дата по:
                            <DatePicker locale={locale} style={{ width: 200 }} onChange={(date) => this.setState({ dateTo: date })} />
                            </div>
                        </Col>
                        <Col sm={4}>
                            <div style={{ display: 'flex', flexDirection: 'column', }}>
                                Почтовый маршрут:
                                <Select defaultValue='' style={{ width: 200 }}>
                                </Select>
                            </div>
                        </Col>
                        {/* <Col lg={4}>
                        <div style={{display: 'flex', flexDirection: 'column',}}>
                            Время:
                            <TimePicker format={format} locale={locale} />
                        </div>
                    </Col> */}
                    </Row>
                </div>

                <div style={{ marginTop: 10, backgroundColor: '#efefef', padding: 10 }}>
                    <Row>
                        <Col sm={4}>
                            <div style={{ display: 'flex', flexDirection: 'column', }}>
                                Виды РПО:
                            <Select defaultValue={this.state.typeOfGoods[0].code} style={{ width: 200 }} onChange={(value) => this.setState({ mailType: value })}>

                                    {this.state.typeOfGoods.map((goods, index) => {
                                        return (
                                            <Option value={goods.code} key={index}>{goods.value}</Option>
                                        )
                                    })}
                                </Select>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div style={{ display: 'flex', flexDirection: 'column', }}>
                                Отправитель:
                            <Input style={{ width: 200 }} onChange={(text) => this.setState({ sender: text.target.value })} />
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div style={{ display: 'flex', flexDirection: 'column', }}>
                                Получатель:
                            <Input style={{ width: 200 }} onChange={(text) => this.setState({ reciver: text.target.value })} />
                            </div>
                        </Col>
                    </Row>
                </div>
                <div style={{ marginTop: 10, backgroundColor: '#efefef', padding: 10 }}>
                    <Row>
                        <Col lg={4}>
                            <div style={{ display: 'flex', flexDirection: 'column', }}>
                                Категория:
                                <Select defaultValue='usual' style={{ width: 200 }}>
                                    <Option value="usual">Обыкновенная</Option>
                                    <Option value="custom">Заказное</Option>
                                    <Option value="valuable">С об. ценностью</Option>
                                    <Option value="payment">С об. ценностью и нал. платежом</Option>
                                </Select>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div style={{ display: 'flex', flexDirection: 'column', }}>
                                ШПИ:
                            <Input style={{ width: 200 }} onChange={(text) => this.setState({ barcode: text.target.value })} />
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div style={{ display: 'flex', flexDirection: 'column', }}>
                                Опись вложения:
                            <Input style={{ width: 200 }} />
                            </div>
                        </Col>
                    </Row>
                </div>
                <div style={{ marginTop: 10, backgroundColor: '#efefef', padding: 10 }}>
                    <Row>
                        <Col lg={6}>
                            <RadioGroup value={this.state.radioValue} onChange={this.onRadioChange}>
                                <Radio value={1}>Получатель</Radio>
                                <Radio value={2}>Отправитель</Radio>
                            </RadioGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={4}>
                            <div style={{ display: 'flex', flexDirection: 'column', }}>
                                Почтовый индекс:
                            <Input style={{ width: 200 }} onChange={(text) => this.setState({ postIndex: text.target.value })} />
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div style={{ display: 'flex', flexDirection: 'column', }}>
                                Страна:
                                {/* <Select defaultValue='KZ' style={{ width: 200 }}>
                                    <Option value="KZ">Казахстан</Option>
                                    <Option value="RU">Россия</Option>
                                </Select> */}
                                <Input style={{ width: 200 }} onChange={(text) => this.setState({ country: text.target.value })} />
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div style={{ display: 'flex', flexDirection: 'column', }}>
                                Город:
                                {/* <Select defaultValue='01' style={{ width: 200 }}>
                                    <Option value="01">Нур-Султан</Option>
                                    <Option value="02">Алматы</Option>
                                </Select> */}
                                <Input style={{ width: 200 }} onChange={(text) => this.setState({ city: text.target.value })} />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={4}>
                            <div style={{ display: 'flex', flexDirection: 'column', }}>
                                Улица:
                            <Input style={{ width: 200 }} onChange={(text) => this.setState({ street: text.target.value })} />
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div style={{ display: 'flex', flexDirection: 'column', }}>
                                Дом:
                            <Input style={{ width: 200 }} onChange={(text) => this.setState({ home: text.target.value })} />
                            </div>
                        </Col>
                        <Col lg={4}>
                            <Button type="primary" style={{ width: 200, marginTop: 23 }} loading={this.state.loading} onClick={() => this.handleSearch()}>Поиск</Button>
                        </Col>
                    </Row>
                </div>
                <Table style={{ marginTop: 20 }} dataSource={this.state.listOfSearch}>
                    <Column
                        title="ШПИ"
                        dataIndex="mailId"
                        key="mailId"
                    />
                    <Column
                        title="Виды грузов"
                        dataIndex="mailType"
                        key="mailType"
                    />
                    <Column
                        title="Адрес"
                        dataIndex="toStreet"
                        key="toStreet"
                    />
                    <Column
                        title="Телефон"
                        dataIndex="toTelephone"
                        key="toTelephone"
                    />
                    <Column
                        title="Отправитель"
                        dataIndex="fromFullName"
                        key="fromFullName"
                    />
                    <Column
                        title="Получатель"
                        dataIndex="toFullName"
                        key="toFullName"
                    />
                </Table>

            </Container>
            // </div>
        )
    }
}

export default Search