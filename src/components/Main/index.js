import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Chat from '../Chat'
import Login from '../Login'
import Logout from '../Logout'
import User1 from '../User1'




const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Login}/>
      <Route exact path='/user1' component={User1}/>
      <Route exact path='/chat' component={Chat}/>
      <Route exact path='/logout' component={Logout}/>
    </Switch>
  </main>
)

export default Main
