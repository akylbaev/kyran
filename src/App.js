import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import "antd/dist/antd.css";
import "./index.css";

import { PrivateRoute } from './components/PrivateRoute'
import Login from './views/Login'
import Search from './views/Search'
import Tasks from './views/Tasks'
import Sidebar from './components/Sidebar'
import AllUsers from './views/Users/AllUsers'
import AddUser from './views/Users/AddUser'
import EditUser from './views/Users/EditUser'

const Users = () => (
  <Switch>
    <Route exact path='/users' component={AllUsers} />
    <Route path='/users/add' component={AddUser} />
    <Route path='/users/:id' component={EditUser} />
  </Switch>
)


class App extends Component {

  constructor(props){
    super(props)
    this.state={
      role: null
    }
  }

  componentDidMount(){
    this.setState({role: localStorage.getItem('role')})
  }

  render() {
    console.log(localStorage.getItem('role'))
    return (
      <BrowserRouter>
        <div>
          <div style={{display: 'flex', position: 'absolute', width: 250, height: 70, borderRadius: 10, backgroundColor: '#a8a8a8', bottom: 30, left: 25, alignItems: 'center', justifyContent: 'center', margin: 0, flexDirection: 'column', zIndex: 999}}>
            <p style={{textAlign: 'center', color: '#fff', fontSize: 20, margin: 0}}>ДЛЯ ДЕМОНСТРАЦИИ</p>
            <p style={{textAlign: 'center', color: '#ff0000', fontSize: 20, margin: 0}}>КОНФИДЕНЦИАЛЬНО</p>
          </div>
          <Switch>
            <Route path="/login" component={Login} />
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <div style={{display: 'flex', position: 'absolute', width: window.innerWidth, height: 60, backgroundColor: '#e8e8e8', alignItems: 'center', justifyContent: 'center'}}>
                <h4 style={{color: '#6b6b6b'}}>Система проведения оперативно-розыскных и контрразведывательных мероприятий оператора почты</h4>
              </div>
              <Sidebar />
              <PrivateRoute path="/" component={Search} exact/>
              <PrivateRoute path="/search" component={Search} />
              <PrivateRoute path="/tasks" component={Tasks} />
              {/* {this.state.role==="ADMIN" ? <PrivateRoute path="/users" component={Users} /> : null} */}
              <PrivateRoute path="/users" component={Users} />

            </div>
            {/* <Route path="*" component={()=>"404 Not Found"} /> */}
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
