import React, { Component } from 'react'
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'
require('./style.scss')




export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstUsername: ''
    }
  }



  componentWillUpdate(nextProps, nextState){
    localStorage.setItem('firstUsername', JSON.stringify(nextState.firstUsername))
  }



  handleSubmit = e => {
    const user = `${this.input.value}`
      if (user !== "Laura") {
        alert("Sorry that username is not available")
        return
      } else {
        e.preventDefault()
      }
    this.props.history.push('/user1');
  }



  render() {
    const{ firstUsername } = this.state
    console.log(this.state)
    return (
    <div className="container">
      <form onSubmit={this.handleSubmit}>
      <h3 className="title">Got a nickname?</h3>
        <FormGroup className="form-login" controlId="formBasicText">
          <FormControl
            type="text"
            value={this.state.firstUsername}
            placeholder="username"
            inputRef={ref => { this.input = ref; }}
            onChange={e => this.setState({firstUsername: e.target.value})}
          />
        </FormGroup>
        <Button type="submit">Sign In</Button>
      </form>
     </div>

    )
  }
}
