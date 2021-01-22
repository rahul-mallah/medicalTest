import React, { Component } from 'react'
import {withRouter, Link} from "react-router-dom";
import parse from "html-react-parser";
import {Accordion, Card, Button, Row, Col, Image, Container} from "react-bootstrap"
import { firestore } from '../firebase';
import  classes from './doctorProfile.module.css';


class DoctorProfile extends Component {
    constructor(props){
        super(props)
        this.state={
            doctor: {},
            isLoaded : false,
  
  
  
  
  
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
                <>
                <div>
                    <div className="card w-100">
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
                    
                    <div id = 'container'>
                        <h1></h1>
                    </div> 
                
                    <div className = {classes.form}>
                        <h5>Add Comment</h5>
                        Name: <input type = "text" id = "name" /> <br/> <br/>
                        Date: <input type = "date" id = "date"/> <br/> <br/>
                        Body: <textarea row = "5" col = "30" id = "bodyText"></textarea> <br/> <br/>
                        <input type = "button" id = "addComment" value = "Add Comment" />
                    </div>

                    <div>

                    <form onSubmit={this.submit}>
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                        <input type="submit" />
                    </form>
                    <h2>{this.state.show}</h2>
 
 
 
 


                    </div>

                   
                   
                   
                   
                   
                    
                    
                    
                    
                    
                    
                    
                </div>
                </>
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
