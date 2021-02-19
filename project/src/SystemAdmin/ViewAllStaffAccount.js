import React,{useState}  from 'react'
import { firestore } from '../firebase';
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import {StaffInput} from './StaffInput'
import SearchBar from './searchBar';
import { useHistory } from "react-router-dom";
import IdleTimerContainer from '../util/IdleTimerContainer'


function ViewAllStaffAccount() 
{
   //react hooks
   const [users, setUsers] = useState([])
   const [medicalDocUsers, setMedicalDocUsers] = useState([])
   const [medicalStaff, setMedicalStaff] = useState([])
   const [search, setSearch] = useState("")
   const [loading, setLoading] = useState(false)
   const [filteredUsers, setFilteredUsers] = useState([]);
   let history = useHistory();
   
   // fetches data on render
   React.useEffect(() => {
      const fetchData = async () => {
         const db = firestore
         const data = await db.collection('Medical Staff').get()
         setMedicalStaff(data.docs.map(doc => ({...doc.data(), id: doc.id})))

         const dataa = await firestore.collection('Users').get()
         setUsers(data.docs.map(doc => ({...doc.data(), id: doc.id})))
      }
      fetchData()
   }, [])

   const filteredArray =   medicalStaff.filter((user) =>
   user.Email.toLowerCase().includes(search.toLowerCase())
 )

   return(
      <>
      <div class = "jumbotron jumbotron-fluid">
      <IdleTimerContainer></IdleTimerContainer>
         <div class = "container">
            <h1 class = "display-4 text-center">Staff Accounts</h1>
         </div>
      </div>
         {/* search bar */}
         <div
            style={{
                   display: "flex",
                   justifyContent: "center",
                   alignItems: "center"
               }}
         >
            <SearchBar handleChange={(e) => setSearch(e.target.value)} placeholder = "Search for a user by Email..."/>
         </div>
                                                                                                                                   
      <div
         style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "20px",
                fontWeight: "bold"
            }}
      >
         <input  type = "radio" value = "Test" onClick = {() => {window.location.href="/SysAdm/viewAllStaffAccount"}}/>Staff
         <input  type = "radio" value = "Test" onClick = {() => {window.location.href="/SysAdm/viewAllAccount"}}/>All Users
      </div>       
       
      <div className = "row">
         <div className = "col-md-12">
            <table className = "table table-borderless table-stripped">
               <thead className = "thead-light" >
                  <tr>
                     <th>Name</th>                                                 
                     <th>Email Address</th>  
                     <th>Role</th>
                     <th>Actions</th>
                  </tr>
               </thead>
               <tbody>
                  
                     {filteredArray.map(medicalStaff => (
                        <tr>
                           <td>{medicalStaff.FirstName} {medicalStaff.LastName}</td>                                                                                                 
                           <td>{medicalStaff.Email}</td>
                           <td>{medicalStaff.Role}</td>
                        <StaffInput medicalStaff = {medicalStaff} />
                           </tr>
                     ))}                                                                              
               </tbody>
            </table>
         </div>
      </div>
       </>
      
   )

}

export default ViewAllStaffAccount