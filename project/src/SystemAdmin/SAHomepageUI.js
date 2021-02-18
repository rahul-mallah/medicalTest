import React, {useState} from 'react';
import NavBar from '../components/navbarUI';
import { Link } from "react-router-dom"
import {useAuth} from '../util/Auth';
import { firestore, auth } from '../firebase';
import IdleTimerContainer from '../util/IdleTimerContainer'

function SAHomePageUI() {

    const { currentUser } = useAuth();

    const [Users, setUsers] = useState([]); 

    React.useEffect(()=>{
        const fetchData = async () =>{
           firestore.collection("Users").limit(1)
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
                        {Users.map(user => <h1> Hello {user.Name},</h1>)}
                        Welcome To MyAppointment System
                    </h1>
                    <div className="container col-sm-10">
                        <div className="row">
                            <div className="col-sm">
                                <div className="card" >
                                    <img className="photo" src="https://images.unsplash.com/photo-1460672985063-6764ac8b9c74?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8bWVkaWNhbCUyMGFwcG9pbnRtZW50fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60" 
                                    className="card-img-top" alt="..." height="240px"/>
                                    <div className="card-body">
                                        <h5 className="card-title">Manage Account</h5>
                                        <p className="card-text">You can view, delete, disable, enable, and edit account details</p>
                                        <a onClick={() => {window.location.href="/SysAdm/viewAllAccount"}} className="btn btn-primary">Manage Account</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm">
                                <div className="card" >
                                    <img className="photo" src="https://images.unsplash.com/photo-1520223297779-95bbd1ea79b7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzN8fHByb2ZpbGV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60" 
                                    className="card-img-top" alt="..." height="240px"/>
                                    <div className="card-body">
                                        <h5 className="card-title">My Profile</h5>
                                        <p className="card-text">You can see all your profile details here. You may choose to edit your address and telephone number.</p>
                                        <a onClick={() => {window.location.href="/SysAdm/myProfile"}} className="btn btn-primary">View / Edit Profile</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm">
                                <div className="card" >
                                    <img className="photo" src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8ZWR1Y2F0aW9ufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60" 
                                        className="card-img-top" alt="..." height="240px"/>
                                        <div className="card-body">
                                            <h5 className="card-title">Educational</h5>
                                            <p className="card-text">Get your hands on the latest health educational materials and health promotions!</p>
                                            <a onClick={() => {window.location.href="/SysAdm/ViewHealthArticle"}} className="btn btn-primary">View Post</a>
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

export default SAHomePageUI
