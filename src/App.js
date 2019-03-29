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

  componentDidMount(){
    localStorage.setItem('UID', 'rus')
    console.log(localStorage.getItem('user'))
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/login" component={Login} />
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <Sidebar />
              <PrivateRoute path="/" component={Search} exact/>
              <PrivateRoute path="/search" component={Search} />
              <PrivateRoute path="/tasks" component={Tasks} />
            </div>
            <Route path="" component={()=>"404 Not Found"} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
