import React, {Component} from 'react';
import { Button, Grid, Row, Col, Form,  FormGroup, FormControl } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom'
require('./style.scss')



export default class User1 extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      secondUsername: '',
      message: '',
      messages: []
    }

  }

  // method to capture and store user 2 name
  componentWillUpdate(nextProps, nextState){
    localStorage.setItem('secondUsername', JSON.stringify(nextState.secondUsername))
  }

  // method to handle user 1 logoff
  handleClick = () => {
    alert("Are you sure you want to exit?")
    socket.emit('user left', `${firstUsername}`)
    localStorage.removeItem('firstUsername')
  }

  // method to handle user 2 login
  handleSignin = e => {
    const user = `${this.input.value}`
      if (user !== "Rob") {
        alert("Sorry that username is not available")
        return
      } else {
        e.preventDefault()
      }
      socket.emit('user joined', `${this.state.secondUsername}`)
      this.props.history.push('/chat');
  }

  // Form Send
  handleSubmit = e => {
    e.preventDefault()
    this.setState({message:''})
  }

  // method to handle signed on banner
  hideDisplay = () =>{
    setTimeout(function () {document.getElementById('signed_on_banner').style.display='none'}, 1000)
  }

  // user 1 messages queue
  addToMessages = () => {
    this.hideDisplay()
    socket.emit('chat message', `${this.state.message}`)
    this.getTimeNow()
    this.setState({messages: this.state.messages.concat(this.state.message)})
  }

  // handle to get time now
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
      secondUsername,
      message,
      messages
    } = this.state

    const firstUsername = localStorage.getItem('firstUsername')

    console.log(this.state)


    return(
      <div className="container">
      <h4 className="title">Online Users</h4>
      <div id="close"><Link to='/'>X</Link></div>
      <div className="userlog">
        <div className="circle">
          <img className="img-circle" src="/assets/camille_fournier.jpg" alt="camille fournier"/>
        </div>
      </div>
        <Grid>
        	 <Row className="show-grid">
        		<Col md={6} mdPush={6}>
            <div className="form_container">
              <Form horizontal onSubmit={this.handleSignin} className="form-login">
                <p className="form_header">Want to join the chat? Sign In below</p>
                  <FormGroup>
                    <Col sm={10}>
                      <p className="form_subheader">Please provide a username</p>
                      <FormControl
                      className="secondUser-form-login"
                      type="text"
                      placeholder="username"
                      inputRef={ref => { this.input = ref; }}
                      onChange={e => this.setState({secondUsername: e.target.value})}
                      />
                    </Col>
                  </FormGroup>
                  <Button bsStyle="default" type="submit">Sign In</Button>
                </Form>
              </div>
        		</Col>
            <Col md={6} mdPull={6}>
            <div className="chatlog">
             <p id="signed_on_banner">{firstUsername} has signed on</p>

             {this.state.messages.map((message, index) => {
               return <div className="bubble" key={index}>{firstUsername}: {message}  {this.getTimeNow()}</div>;
              })
             }

          </div>
            <form id="user1" onSubmit={this.handleSubmit}>
                <FormGroup className="form-login">
                  <FormControl
                  type="text"
                  placeholder="Type your message here"
                  value={this.state.message}
                  onChange={e => this.setState({message: e.target.value})}
                  />
                </FormGroup>
                <Button bsStyle="primary" type="submit" onClick={this.addToMessages}>Send</Button>
                <Button bsStyle="link" type="submit" onClick={this.handleClick}><Link to='/'>Logout</Link></Button>
              </form>
        		</Col>
        	</Row>
      	</Grid>
      </div>
    )
  }
}
