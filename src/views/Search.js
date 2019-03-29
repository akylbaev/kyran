import React, {Component} from 'react'
import {DatePicker} from 'antd'
import locale from 'antd/lib/date-picker/locale/ru_RU';

class Search extends Component {
    render(){
        return(
            <div style={{display: 'flex', flexDirection: 'column'}}>
                Дата:
                <DatePicker locale={locale}/>
            </div>
        )
    }
}

export default Search