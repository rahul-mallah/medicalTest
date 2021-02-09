import {Container, Row, Col} from 'react-bootstrap';
import {firestore} from '../firebase';
import SearchBar from './searchBar';
import DropDown from './dropDownBar';
import React, {Component} from 'react';
import DoctorCard from './doctorCard';
import IdleTimerContainer from '../util/IdleTimerContainer';

class SearchDoctor extends Component{
    constructor(props){
        super(props);
        this.state={
            doctor: [],
            isLoaded: false,
            searchValue : "",
            DropDown: "All"
        }
    }

    componentDidMount(){
        this.getMyDoctor()
    }

    getMyDoctor = () => {
        firestore.collection("Medical Doctors")
        .get()
        .then(docs =>{
            if(!docs.empty){
                let doctors = []
                docs.forEach(function(doc) {
                    const doctor = {
                        id: doc.id,
                        ...doc.data()
                    }
                    doctors.push(doctor)
                })
                this.setState({
                    doctor : doctors
                }, ()=> {
                    this.setState({
                        isLoaded: true
                    })
                })
            }
        })
    }

    render(){
        let filteredDoctors = this.state.doctor.filter(doc => {
            if(this.state.DropDown === "All")
                return doc.Name.toLowerCase().includes(this.state.searchValue.toLowerCase())
            else if(this.state.DropDown === "Cardiology")
                return doc.Department.includes(this.state.DropDown)
            else if(this.state.DropDown === "Dermatology")
                return doc.Department.includes(this.state.DropDown)
            else if(this.state.DropDown === "Endocrinology")
                return doc.Department.includes(this.state.DropDown)
            else if(this.state.DropDown === "Anesthesiology")
                 return doc.Department.includes(this.state.DropDown)
            else if(this.state.DropDown === "Immunology")
                return doc.Department.includes(this.state.DropDown)
            else if(this.state.DropDown === "Gastroenterology")
                return doc.Department.includes(this.state.DropDown)
            else if(this.state.DropDown === "Haematology")
                return doc.Department.includes(this.state.DropDown)
            else if(this.state.DropDown === "Infectious Diseases")
                return doc.Department.includes(this.state.DropDown)
            else if(this.state.DropDown === "Neurology")
                return doc.Department.includes(this.state.DropDown)
            else if(this.state.DropDown === "Oncology")
                return doc.Department.includes(this.state.DropDown)
            else if(this.state.DropDown === "Orthopaedic")
                return doc.Department.includes(this.state.DropDown)
            else if(this.state.DropDown === "Psychiatry")
                return doc.Department.includes(this.state.DropDown)
            else if(this.state.DropDown === "Rheumatology")
                return doc.Department.includes(this.state.DropDown) 
            else if(this.state.DropDown === "Urology")
                return doc.Department.includes(this.state.DropDown)   
            else if(this.state.DropDown === "General Practitioner (Non-specialist)")
                return doc.Department.includes(this.state.DropDown)                
            return doc.Name.toLowerCase().includes(this.state.searchValue.toLowerCase())
        })

        return (
            <div>
                <IdleTimerContainer></IdleTimerContainer>

                {/* search bar */}
                    <div
                style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
                }}
                >
                <SearchBar handleChange={(e) => this.setState({searchValue: e.target.value})} placeholder = "Enter Doctor Name..."/>
                </div>

                {/* drop down */}
                <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                }}>
                <DropDown handleChange={(e) => this.setState({DropDown: e.target.value})} placeholder="Select an option" />
                </div>
                            <Container>
                                    <Row>
                                {
                                    this.state.isLoaded?
                                    filteredDoctors.map((doc, index) => {
                                            return (
                                                <Col md= "3" className="container-fluid mt-4 mx-3">
                                                <DoctorCard
                                                    key={index}
                                                    data={doc}
                                                />
                                                </Col>
                                            )
                                        })
                                        : ''
                                }
                                </Row>
                                </Container>
            </div>
        )
    }
}

export default SearchDoctor