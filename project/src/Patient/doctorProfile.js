import React, { Component } from 'react'
import {withRouter} from "react-router-dom";
import parse from "html-react-parser";
import {Accordion, Card, Button, Row, Col, Image, Container} from "react-bootstrap"

class DoctorProfile extends Component {
    constructor(props){
        super(props)
        this.state={
            doctor: {},
            isLoaded : false
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
                    <div className="card w-100">
                        <div className="row no-gutters">
                        <div className="col-auto">
                            <img src={this.state.doctor.Image} width={300} heigth={250} className="img-fluid" alt=""/>
                        </div>
            <div className="col text-center w-75 ">
                <div className="card-block px-2">
                    <h4 className="card-title text-center text-muted">{this.state.doctor.Name}</h4>
                    <p className="card-title text-center text-muted">Specialist : {this.state.doctor.Specialist}</p>
                    <p className="card-text text-center text-muted">Department : {this.state.doctor.Department}</p>
                    <p className="card-text text-center text-muted">{this.state.doctor.Qualification}</p>
                    <a href="#" className="btn btn-primary ">Book Appointment</a>
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
                         <h4><b>Profile</b></h4>
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
                        <h4><b>Education</b></h4>
                        </Accordion.Toggle>
                        </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>{this.state.doctor.Education}</Card.Body>
                     </Accordion.Collapse>
                    </Card>
                    </Accordion>
                    
                    <Accordion defaultActiveKey="0" className="my-5 d-flex justify-content-center">
                    <Card className="w-75">
                    <Card.Img variant="top" src="https://www.flaticon.com/svg/static/icons/svg/610/610333.svg" height="100px" />
                        <Card.Header style={{backgroundColor:"#E5E5E5"}} className="text-center"> 
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        <h4><b>Awards</b></h4>
                        </Accordion.Toggle>
                        </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>{this.state.doctor.Awards}</Card.Body>
                     </Accordion.Collapse>
                    </Card>
                    </Accordion>

                    <Accordion defaultActiveKey="0" className="my-5 d-flex justify-content-center">
                    <Card className= "w-75">
                    <Card.Img variant="top" src="https://www.flaticon.com/svg/static/icons/svg/1087/1087185.svg" height="100px" />
                        <Card.Header style={{backgroundColor:"#E5E5E5"}} className="text-center">
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                         <h4><b>Publications</b></h4>
                        </Accordion.Toggle>
                        </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>{this.state.doctor.Publication}</Card.Body>
                     </Accordion.Collapse>
                    </Card>
                    </Accordion>
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
