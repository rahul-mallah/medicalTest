import React, { Component } from 'react'
import {withRouter, Link} from "react-router-dom";
import {Accordion, Card, Button} from "react-bootstrap"
import PatientComment from './PatientComment';
import IdleTimerContainer from '../util/IdleTimerContainer';

class DoctorProfile extends Component {
    constructor(props){
        super(props)
        this.state={
            doctor: {},
            isLoaded : false,
            showComments: false,
            comments: []
        }
        console.log(props)
    }

    componentDidMount(){
        if(typeof this.props.location.state !== 'undefined'){
            if(this.props.location.state.hasOwnProperty('doctor')){
                this.setState({
                    doctor: this.props.location.state.doctor
                }, () => {
                    this.setState({
                        isLoaded: true //Check if our article is loaded
                    })
                })
            }
        }

    }

    render() {
        if(this.state.isLoaded){
            return (      
              <div>
                  <IdleTimerContainer></IdleTimerContainer>
                    <div className="card w-150">
                        <div className="row no-gutters">
                        <div className="col-auto">
                            <img src={this.state.doctor.Image} width={300} heigth={250} className="img-fluid" alt=""/>
                        </div>
            <div className="col text-center w-75 ">
                <div className="card-block px-2">
                    <h1 className="card-title text-center text-muted">{this.state.doctor.Name}</h1>
                    <p className="card-title text-center text-muted">{this.state.doctor.Specialist}</p>
                    <p className="card-text text-center text-muted">Department : {this.state.doctor.Department}</p>
                    <Link to={{
                   pathname: '/Patient/bookAppointment', 
                   state:{doctor: this.state.doctor}
            }}><a href="" className="btn btn-primary ">Book Appointment</a></Link>
                    {/* <a href="/Patient/appointmentForm" className="btn btn-primary ">Book Appointment</a> */}
                </div>
            </div>
        </div>
        <div style={{backgroundColor:"#E5E5E5"}} className="card-footer w-100 text-muted">
            Your Health is our priority
        </div>
  </div>
                    <div>
                        <hr style={{
                                color: "#eee",
                                height: "1px"
                            }}/>
                    </div>
                    <Accordion defaultActiveKey="0" className="my-5 d-flex justify-content-center">
                    <Card className= "w-75">
                    <Card.Img variant="top" src="https://www.flaticon.com/svg/static/icons/svg/3135/3135715.svg" height="100px" />
                        <Card.Header style={{backgroundColor:"#E5E5E5"}} className="text-center">
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                         <h4><b>BIOGRAPHY</b></h4>
                        </Accordion.Toggle>
                        </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body style={{backgroundColor:"#fff"}}>{this.state.doctor.Information}</Card.Body>
                     </Accordion.Collapse>
                    </Card>
                    </Accordion>

                    <Accordion defaultActiveKey="0" className="my-5 d-flex justify-content-center">
                    <Card className= "w-75">
                    <Card.Img variant="top" src="https://www.flaticon.com/svg/static/icons/svg/2987/2987903.svg" height="100px" />
                        <Card.Header style={{backgroundColor:"#E5E5E5"}} className="text-center">
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        <h4><b>QUALIFICATION</b></h4>
                        </Accordion.Toggle>
                        </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>{this.state.doctor.Education}</Card.Body>
                     </Accordion.Collapse>
                    </Card>
                    </Accordion>

            
                    <PatientComment email={this.state.doctor.Email} id = {this.state.doctor.id} /> 
                           
                                      
          </div>                                      
            )
        }
        else{
            return (
                <div>
                    loading...
                </div>
            )
        }
    }
  }                  

export default withRouter(DoctorProfile)
