import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import "antd/dist/antd.css";
import "./index.css";

import { PrivateRoute } from './components/PrivateRoute'
import Login from './views/Login'
import Search from './views/Search'
import Tasks from './views/Tasks'
import Sidebar from './components/Sidebar'


class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <div style={{display: 'flex', position: 'absolute', width: 450, height: 120, borderRadius: 10, backgroundColor: '#a8a8a8', bottom: 30, right: 30, alignItems: 'center', justifyContent: 'center', margin: 0, flexDirection: 'column', zIndex: 999}}>
            <h2 style={{textAlign: 'center', color: '#fff'}}>ДЛЯ ДЕМОНСТРАЦИИ</h2>
            <h2 style={{textAlign: 'center', color: '#ff0000'}}>КОНФИДЕНЦИАЛЬНО</h2>
          </div>
          <Switch>
            <Route path="/login" component={Login} />
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <div style={{display: 'flex', position: 'absolute', width: window.innerWidth, height: 60, backgroundColor: '#1890FF', alignItems: 'center', justifyContent: 'center'}}>
                <h3 style={{color: '#fff'}}>Система проведения оперативно-розыскных и контрразведывательных мероприятий оператора почты</h3>
              </div>
              <Sidebar />
              <PrivateRoute path="/" component={Search} exact/>
              <PrivateRoute path="/search" component={Search} />
              <PrivateRoute path="/tasks" component={Tasks} />
              <PrivateRoute path="*" component={()=>"404 Not Found"} />
            </div>
            {/* <Route path="*" component={()=>"404 Not Found"} /> */}
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
