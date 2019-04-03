import React, { Component } from 'react'
import { DatePicker, Select, TimePicker, Input, Radio, Checkbox, Pagination, Table, Divider, Button } from 'antd'
import locale from 'antd/lib/date-picker/locale/ru_RU';
import { Container, Row, Col } from "react-bootstrap";

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
            sender: '',
            barcode: '',
            reciver: null,
            searchAddressType: null,
            postIndex: null,
            country: null,
            city: null,
            street: null,
            home: null,
            flat: null,
            date: null
        }
    }

    onRadioChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            radioValue: e.target.value,
        });
    }

    onPaginationChange(pageNumber) {
        console.log('Page: ', pageNumber);
    }

    handleChange = value => {
        if (value <= 1) {
            this.setState({
                minValue: 0,
                maxValue: 10
            });
        } else {
            this.setState({
                minValue: this.state.maxValue,
                maxValue: value * 10
            });
        }
    };

    handleSearch(){
        console.log(this.state.date)
    }

    render() {

        let data = [
        ];

        return (
            // <div style={{ display: 'flex', flexDirection: 'column' }}>
            //     Дата:
            //     <DatePicker locale={locale} />
            // </div>
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
                                Дата:
                            <DatePicker locale={locale} style={{ width: 200 }} onChange={(date) => this.setState({date: date})}/>
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
                                Виды грузов/товаров:
                            <Select defaultValue={this.state.typeOfGoods[0].code} style={{ width: 200 }}>

                                    {this.state.typeOfGoods.map((goods, index) => {
                                        return (
                                            <Option value={goods.code}>{goods.value}</Option>
                                        )
                                    })}
                                </Select>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div style={{ display: 'flex', flexDirection: 'column', }}>
                                Отправитель:
                            <Input style={{ width: 200 }} />
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div style={{ display: 'flex', flexDirection: 'column', }}>
                                Получатель:
                            <Input style={{ width: 200 }} />
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
                            <Input style={{ width: 200 }} />
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
                            <Input style={{ width: 200 }} />
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div style={{ display: 'flex', flexDirection: 'column', }}>
                                Страна:
                                {/* <Select defaultValue='KZ' style={{ width: 200 }}>
                                    <Option value="KZ">Казахстан</Option>
                                    <Option value="RU">Россия</Option>
                                </Select> */}
                                <Input style={{ width: 200 }} />
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div style={{ display: 'flex', flexDirection: 'column', }}>
                                Город:
                                {/* <Select defaultValue='01' style={{ width: 200 }}>
                                    <Option value="01">Нур-Султан</Option>
                                    <Option value="02">Алматы</Option>
                                </Select> */}
                                <Input style={{ width: 200 }} />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={4}>
                            <div style={{ display: 'flex', flexDirection: 'column', }}>
                                Улица:
                            <Input style={{ width: 200 }} />
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div style={{ display: 'flex', flexDirection: 'column', }}>
                                Дом:
                            <Input style={{ width: 200 }} />
                            </div>
                        </Col>
                        <Col lg={4}>
                            <Button type="primary" style={{ width: 200, marginTop: 23 }} onClick={() => this.handleSearch()}>Поиск</Button>
                        </Col>
                    </Row>
                </div>
                <Table style={{ marginTop: 20 }}>
                    <Column
                        title="ШПИ"
                        dataIndex="name"
                        key="name"
                    />
                    <Column
                        title="Виды грузов"
                        dataIndex="iin"
                        key="iin"
                    />
                    <Column
                        title="Адрес"
                        dataIndex="factAddress"
                        key="factAddress"
                    />
                    <Column
                        title="Дата"
                        dataIndex="phone"
                        key="phone"
                    />
                    <Column
                        title="Отправитель"
                        dataIndex="rpo"
                        key="rpo"
                    />
                    <Column
                        title="Опись Вложения"
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

            </Container>
        )
    }
}

export default Search