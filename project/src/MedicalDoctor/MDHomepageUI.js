import React,{useState} from 'react'
import IdleTimerContainer from '../util/IdleTimerContainer';
import {firestore } from '../firebase';
import { useAuth } from "../util/Auth"

function MDHomepageUI() {

    // react hooks
    const { currentUser } = useAuth();
    const [Doctors, setDoctors] = useState([]); 

    // fetches data on render
    React.useEffect(()=>{
        const fetchData = async () =>{
           firestore.collection("Medical Doctors").limit(1)
           .where("Email", "==", String(currentUser.email))
           .get()
           .then(function(data){
                console.log(data)
                setDoctors(data.docs.map(doc => ({ ...doc.data(), id: doc.id})));
            })
        };
        fetchData();
     }, [])

    return (
        <div>
            <div>
                <IdleTimerContainer></IdleTimerContainer>
                <React.Fragment>
                    <h1 className='text-center text-danger text text-capitalize my-5'
                    style={{fontSize: '2em'}}>
                        {Doctors.map(doc => <h1> Hello {doc.Name},</h1>)}
                        Welcome To MyAppointment System
                    </h1>
                    <div className="container col-sm-7">
                        <div className="row">
                            <div className="col-sm"><div className="card" >
                                <img src="https://images.unsplash.com/photo-1460672985063-6764ac8b9c74?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8bWVkaWNhbCUyMGFwcG9pbnRtZW50fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60" 
                                className="card-img-top" alt="..." height="200px"/>
                                <div className="card-body">
                                    <h5 className="card-title">Patient Profile</h5>
                                    <p className="card-text">You can view the patient profile and their past medical records here</p>
                                    <a onClick={() => {window.location.href="/MedDoc/PatientProfile"}} className="btn btn-primary">View Patient Profiles</a>
                                </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="card" >
                            <img src="https://images.unsplash.com/photo-1606852837335-046eed58c3cd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" 
                            className="card-img-top" alt="..." height="200px"/>
                            <div className="card-body">
                                <h5 className="card-title">Schedule</h5>
                                <p className="card-text">You can view and edit the schedule here</p>
                                <a onClick={() => {window.location.href="/MedDoc/Schedule"}} className="btn btn-primary">View / Edit Schedule</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container my-5 col-sm-7">
                        <div className="row">
                            <div className="col-sm">
                                <div className="card" >
                                <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8ZWR1Y2F0aW9ufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60" 
                                className="card-img-top" alt="..." height="200px"/>
                                <div className="card-body">
                                    <h5 className="card-title">Educational</h5>
                                    <p className="card-text">Get your hands on the latest health educational materials and health promotions!</p>
                                    <br/>
                                    <a onClick={() => {window.location.href="/MedDoc/ViewHealthArticle"}} className="btn btn-primary">View Post</a>
                                </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="card" >
                            <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjN8fG1lZGljYWx8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60" 
                            className="card-img-top" alt="..." height="200px"/>
                            <div className="card-body">
                                <h5 className="card-title">My Profile</h5>
                                <p className="card-text">You can see all your profile details here. You may choose to edit your address and telephone number.</p>
                                <br/>
                                <a onClick={() => {window.location.href="/MedDoc/myProfile"}} className="btn btn-primary">View / Edit profile</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                </React.Fragment>
            </div>
        </div>
    )
}

export default MDHomepageUI
