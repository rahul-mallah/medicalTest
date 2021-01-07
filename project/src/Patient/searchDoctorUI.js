import React, {useState} from 'react'
import {Form, Button, Card, Container, Alert, Row, Col} from 'react-bootstrap'
import NavBar from '../components/navbarUI';
import Searchable from 'react-searchable-dropdown';
import {firestore} from '../firebase';
import SearchBar from './searchBar';


function SearchDoctor() {

   const [doctorData, setDoctorData] = useState([]);
   const [openMenu, setOpenMenu] = useState(false);
   const [searchValue, setSearchValue] = useState("");

   React.useEffect(()=>{
      const fetchData = async () =>{
         firestore.collection("Medical Doctors")
         .get()
         .then(function(data){
            console.log(data)
            setDoctorData(data.docs.map(doc => ({ ...doc.data(), id: doc.id})));
         }); 
      };
      fetchData();
   }, [])

   const new_options = []
   doctorData.forEach(element => {
    new_options.push({
        value : element.Name,
        label : element.Name,
      })
   })

   const filteredDoctors = doctorData.filter(doctor =>{
      return doctor.Name.toLowerCase().includes(searchValue.toLowerCase())
   })

    return (
       <div>
         <h1>
            
         </h1>
         <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}
    >
       <SearchBar placeholder = "Enter Doctor Name..." handleChange={(e) => setSearchValue(e.target.value)}/>

    </div>
      <Container>
          <Row>
             {filteredDoctors.length > 0 ?
      (filteredDoctors.map(doctor =>
            <Col md= "3" className="container-fluid mt-4 mx-3">
            <Card className="" style={{ width: '18rem' }}>
         <Card.Img variant="top" src={doctor.Image} height="220px" />
         <Card.Body>
            <Card.Title>{doctor.Name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
               <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
               </Card.Text>
            <Button variant="primary">Go somewhere</Button>
         </Card.Body>
      </Card>
      </Col>
      )):(<div style={{
         position: 'absolute', left: '50%', top: '50%',
         transform: 'translate(-50%, -50%)'
     }}><h1>No results found</h1></div>)}
      </Row>
      </Container>
      </div>
    )
}
export default SearchDoctor
