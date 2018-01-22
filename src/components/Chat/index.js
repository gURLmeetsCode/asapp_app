import React, {Component} from 'react';
import { Button, Grid, Row, Col, FormGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom'
require('./style.scss')



export default class Chat extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      usr1_message: '',
      usr2_message: '',
      messages: []
    }

  }



  user1handleClick = () => {
    alert("Are you sure you want to exit?")
    localStorage.removeItem('firstUsername')
  }

  user2handleClick = () => {
    alert("Are you sure you want to exit?")
    localStorage.removeItem('secondUsername')
  }

  // Form Send
  handleSubmit = e => {
    e.preventDefault()
    this.getTimeNow()
    this.setState({usr1_message:'', usr2_message:''})
  }

  // user 1 messages queue
  addUsr1Messages = () => {
    socket.emit('chat message', `${this.state.usr1_message}`)
    this.setState({messages: this.state.messages.concat(this.state.usr1_message)})
  }

  hideDisplay = () =>{
    setTimeout(function () {document.getElementById('signed_on_banner').style.display='none'}, 1000)
  }

  // user 2 messages queue
  addUsr2Messages = () => {
    this.hideDisplay()
    socket.emit('chat message', `${this.state.usr2_message}`)
    this.setState({messages: this.state.messages.concat(this.state.usr2_message)})
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
      usr1_message,
      usr2_message,
      messages
    } = this.state

    const firstUsername = localStorage.getItem('firstUsername')
    const secondUsername = localStorage.getItem('secondUsername')

    console.log(this.state)

    return(
      <div className="container">
      <h4 className="title">Online Users</h4>
      <div id="close"><Link to='/'>X</Link></div>
      <div className="userlog">
        <div className="circle">
          <img className="img-circle" src="/assets/camille_fournier.jpg" alt="camille fournier"/>
        </div>
        <div className="circle">
          <img className="img-circle" src="/assets/LinusTorvalds.jpg" alt="Linus Torvalds"/>
        </div>
      </div>
        <Grid>
        	 <Row className="show-grid">
        		<Col md={6} mdPush={6}>
            <div className="chatlog">
             <p id="signed_on_banner">{secondUsername} has signed on</p>
             {this.state.messages.map((message, index) => {
                return <div className="bubble you" key={index}>{secondUsername}:  {message} {this.getTimeNow()}</div>;
                })
            }
            </div>
            <form id="user2" onSubmit={this.handleSubmit}>
                <FormGroup>
                  <FormControl
                    type="text"
                    placeholder="Type your message here"
                    value={this.state.usr2_message}
                    onChange={e => this.setState({usr2_message: e.target.value}) }
                    />
                </FormGroup>
                <Button bsStyle="primary" type="submit" onClick={this.addUsr2Messages}>Send</Button>
                <Button bsStyle="link" type="submit" onClick={this.user2handleClick}><Link to='/user1'>Logout</Link></Button>
              </form>
        		</Col>
            <Col md={6} mdPull={6}>
            <div className="chatlog">
            {this.state.messages.map((message, index) => {
               return <div className="bubble me" key={index}>{firstUsername}:  {message} {this.getTimeNow()}</div>;
               })
            }
            </div>
            <form id="user1" onSubmit={this.handleSubmit}>
                <FormGroup>
                  <FormControl
                  type="text"
                  placeholder="Type your message here"
                  value={this.state.usr1_message}
                  onChange={e => this.setState({usr1_message: e.target.value})}
                  />
                </FormGroup>
                <Button bsStyle="primary" type="submit" onClick={this.addUsr1Messages}>Send</Button>
                <Button bsStyle="link" type="submit" onClick={this.user1handleClick}><Link to='/logout'>Logout</Link></Button>
              </form>
        		</Col>
        		</Row>
      	</Grid>
      </div>
    )
  }
}
