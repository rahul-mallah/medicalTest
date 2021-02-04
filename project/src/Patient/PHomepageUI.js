import React,{useState} from 'react'
import {firestore } from '../firebase';
import { useAuth } from "../util/Auth"
import IdleTimerContainer from '../util/IdleTimerContainer'


function PHomepageUI() {
    const { currentUser } = useAuth();

    const [Users, setUsers] = useState([]); 

    React.useEffect(()=>{
        const fetchData = async () =>{
           firestore.collection("Users")
           .where("Email", "==", String(currentUser.email))
           .get()
           .then(function(data){
                console.log(data)
                setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id})));
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
                        {Users.map(user => <h1> Hello {user.FirstName } {user.LastName},</h1>)}
                        Welcome To MyAppointment System
                    </h1>
                    <div className="container col-sm-10">
                        <div className="row">
                            <div className="col-sm"><div className="card" >
                                <img src="https://images.unsplash.com/photo-1460672985063-6764ac8b9c74?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8bWVkaWNhbCUyMGFwcG9pbnRtZW50fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60" 
                                className="card-img-top" alt="..." height="240px"/>
                                <div className="card-body">
                                    <h5 className="card-title">Medical Profile</h5>
                                    <p className="card-text">View your past medical visits, medical reports, bill receipts, medical prescriptions, Medical certificates and more!</p>
                                    <a onClick={() => {window.location.href="/Patient/MedicalProfile"}} className="btn btn-primary">View Medical Profiles</a>
                                </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="card" >
                            <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjN8fG1lZGljYWx8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60" 
                            className="card-img-top" alt="..." height="240px"/>
                            <div className="card-body">
                                <h5 className="card-title">Appointment</h5>
                                <p className="card-text">View all our appointment records here! You can Book a new appointment, Reschedule or Cancel any existing appointments here.</p>
                                <a onClick={() => {window.location.href="/Patient/Appointment"}} className="btn btn-primary">View / Amend Appointments</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="card" >
                            <img src="https://images.unsplash.com/photo-1520223297779-95bbd1ea79b7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzN8fHByb2ZpbGV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60" 
                            className="card-img-top" alt="..." height="240px"/>
                            <div className="card-body">
                                <h5 className="card-title">My Profile</h5>
                                <p className="card-text">You can see all your profile details here. You may choose to edit your address and telephone number.</p>
                                <a onClick={() => {window.location.href="/Patient/myProfile"}} className="btn btn-primary">View / Edit profile</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container my-5 col-sm-6">
                        <div className="row">
                            <div className="col-sm"><div className="card" >
                                <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8ZWR1Y2F0aW9ufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60" 
                                className="card-img-top" alt="..." height="200px"/>
                                <div className="card-body">
                                    <h5 className="card-title">Educational</h5>
                                    <p className="card-text">Get your hands on the latest health educational materials and health promotions!</p>
                                    <a onClick={() => {window.location.href="/Patient/ViewHealthArticle"}} className="btn btn-primary">View Post</a>
                                </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="card" >
                            <img src="https://images.unsplash.com/photo-1606852837335-046eed58c3cd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" 
                            className="card-img-top" alt="..." height="200px"/>
                            <div className="card-body">
                                <h5 className="card-title">Doctor Profile</h5>
                                <p className="card-text">Search from a list of our healthcare doctors to learn more about them to help plan for your next appointments!</p>
                                <a onClick={() => {window.location.href="/Patient/searchDoctor"}} className="btn btn-primary">Search Doctors</a>
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

export default PHomepageUI
