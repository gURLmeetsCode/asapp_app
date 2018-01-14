import React, {Component} from 'react';
import { Button, Grid, Row, Col, FormGroup, FormControl } from 'react-bootstrap';
require('./style')



export default class Home extends React.Component{


// Method for handling submit/sent messages
  handleSubmit = e => {
    e.preventDefault()
  }

  render(){
    return(
      <div>
        <Grid>
        	 <Row className="show-grid">
        		<Col md={6} mdPush={6}>
            <div className="chatlog"></div>
            <form>
                <FormGroup>
                  <FormControl type="text" placeholder="Type your message here" />
                </FormGroup>
                <Button bsStyle="primary" type="submit">Send</Button>
              </form>
        		</Col>
            <Col md={6} mdPull={6}>
            <div className="chatlog"></div>
            <form>
                <FormGroup>
                  <FormControl type="text" placeholder="Type your message here" />
                </FormGroup>
                <Button bsStyle="primary" type="submit">Send</Button>
              </form>
        		</Col>
        		</Row>
      	</Grid>
      </div>
    )
  }
}
