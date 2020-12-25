import React from 'react';
import NavBar from '../components/navbarUI';
function HomepageUI() {
    return (
        <div>
            <NavBar/>
            <div>
                <React.Fragment>
                    <h1 className='text-center text-danger text text-capitalize my-5'
                    style={{fontSize: '2em'}}>
                        Welcome To MyAppointment System
                    </h1>
                    <div className="container col-sm-10">
                        <div className="row">
                            <div className="col-sm"><div className="card" >
                                <img src="https://images.unsplash.com/photo-1460672985063-6764ac8b9c74?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8bWVkaWNhbCUyMGFwcG9pbnRtZW50fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60" 
                                className="card-img-top" alt="..." height="240px"/>
                                <div className="card-body">
                                    <h5 className="card-title">Medical Profile</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <a href="" className="btn btn-primary">Click Here</a>
                                </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="card" >
                            <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjN8fG1lZGljYWx8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60" 
                            className="card-img-top" alt="..." height="240px"/>
                            <div className="card-body">
                                <h5 className="card-title">Appointment</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="" className="btn btn-primary">Click Here</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="card" >
                            <img src="https://images.unsplash.com/photo-1520223297779-95bbd1ea79b7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzN8fHByb2ZpbGV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60" 
                            className="card-img-top" alt="..." height="240px"/>
                            <div className="card-body">
                                <h5 className="card-title">My Profile</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="" className="btn btn-primary">Click Here</a>
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
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <a href="" className="btn btn-primary">Click Here</a>
                                </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="card" >
                            <img src="https://images.unsplash.com/photo-1606852837335-046eed58c3cd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" 
                            className="card-img-top" alt="..." height="200px"/>
                            <div className="card-body">
                                <h5 className="card-title">Doctor Profile</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="" className="btn btn-primary">Click Here</a>
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

export default HomepageUI
