import React, {Component} from 'react';
import { Button, Grid, Row, Col, Form,  FormGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import io from "socket.io-client";
require('./style.scss')



export default class Logout extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      firstUsername: '',
      message: '',
      messages: []
    }

  }
  componentWillUpdate(nextProps, nextState){
    localStorage.setItem('firstUsername', JSON.stringify(nextState.firstUsername))
  }


  handleClick = () => {
    alert("Are you sure you want to exit?")
    localStorage.removeItem('secondUsername')
  }

  handleSignin = e => {
    const user = `${this.input.value}`
      if (user !== "Laura") {
        alert("Sorry that username is not available")
        return
      } else {
        e.preventDefault()
      }
      this.props.history.push('/chat');
  }

  // Form Send
  handleSubmit = e => {
    e.preventDefault()
    socket.emit('chat message', `${this.state.message}`)
    this.getTimeNow()
    this.setState({message:''})
  }

  // user 2 messages queue
  addToMessages = () => {
    this.setState({messages: this.state.messages.concat(this.state.message)})
  }

  getTimeNow = () => {
    let currentTime = new Date();
    let diem = "AM"
    let h = currentTime.getHours();
    let m = currentTime.getMinutes();
      if (h == 0) {
        h = 12;
      } else if (h > 12) {
        h = h - 12;
        diem = "PM"
      }
      if (h < 10 ) {
        h = "0" + h
      }
      if (m < 10) {
        m = "0" + m
      }
    return(`${h}:${m}${diem}`)
  }



  render(){
    const {
      firstUsername,
      message,
      messages
    } = this.state

    console.log(this.state)
    const secondUsername = localStorage.getItem('secondUsername')


    return(
      <div className="container">
      <h4 className="title">Online Users</h4>
      <div id="close"><Link to='/'>X</Link></div>
      <div className="userlog">
        <div className="circle">
          <img className="img-circle" src="/assets/LinusTorvalds.jpg" alt="Linus Torvalds"/>
        </div>
      </div>
        <Grid>
        	 <Row className="show-grid">
        		<Col md={6} mdPush={6}>
            <div className="chatlog">
             {this.state.messages.map((message, index) => {
                 return <div className="bubble you" key={index}>{secondUsername}:  {message} {this.getTimeNow()}</div>;
                 })
             }
            </div>
            <form className="user2_form" onSubmit={this.handleSubmit}>
                <FormGroup>
                  <FormControl
                    type="text"
                    placeholder="Type your message here"
                    value={this.state.message}
                    onChange={e => this.setState({message: e.target.value}) }
                    />
                </FormGroup>
                <Button className="" bsStyle="primary" type="submit" onClick={this.addToMessages}>Send</Button>
                <Button className="" bsStyle="link" type="submit" onClick={this.handleClick}><Link to='/'>Logout</Link></Button>
              </form>
        		</Col>
            <Col md={6} mdPull={6}>
            <div className="form_container">
              <Form horizontal onSubmit={this.handleSignin} className="logout-form">
                <p className="form_header">Want to join the chat? Sign In below</p>
                  <FormGroup>
                    <Col sm={10}>
                      <p className="form_subheader">Please provide a username</p>
                      <FormControl
                      className="firstUser-form-login"
                      type="text"
                      placeholder="username"
                      inputRef={ref => { this.input = ref; }}
                      onChange={e => this.setState({firstUsername: e.target.value})}
                      />
                    </Col>
                  </FormGroup>
                  <Button className="submit-form" bsStyle="default" type="submit"><Link to='/chat'>Sign In</Link></Button>
                </Form>
              </div>
        		</Col>
        		</Row>
      	</Grid>
      </div>
    )
  }
}
