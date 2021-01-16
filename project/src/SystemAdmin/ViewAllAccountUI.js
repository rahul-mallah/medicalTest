import React,{useState}  from 'react'
import {Link} from 'react-router-dom';
//import {menuItems} from '../components/Sidebar/SASideBarData';
import { useAuth } from '../util/Auth';
import { auth, firestore } from '../firebase';
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import {UserInput} from './UserInput'


function ViewAllAccountUI() 
{
   const [users, setUsers] = useState([])

   React.useEffect(() => {
      const fetchData = async () => {
         const db = firestore
         const data = await db.collection('Users').get()
         setUsers(data.docs.map(doc => ({...doc.data(), id: doc.id})))
      }
      fetchData()
   }, [])

   return(
      <>
      <div class = "jumbotron jumbotron-fluid">
         <div class = "container">
            <h1 class = "display-4 text-center">User Accounts</h1>
         </div>
      </div>
      <div clasasName = "row">
         <div className = "col-md-12">
            <table className = "table table-borderless table-stripped">
               <thead className = "thead-light" >
                  <tr>
                     <th>First Name</th>
                     <th>Last Name</th>
                     <th>NRIC</th>
                     <th>Address</th>
                     <th>Date Of Birth</th>
                     <th>Email Address</th>
                     <th>Telephone</th>
                     <th>Account Type</th>
                     <th>Actions</th>
                  </tr>
               </thead>
               <tbody>
                  
                     {users.map(users => (
                        <tr>
                           <td>{users.FirstName}</td>
                           <td>{users.LastName}</td>
                           <td>{users.NRIC}</td>
                           <td>{users.Address}</td>
                           <td>{users.DOB}</td>
                           <td>{users.Email}</td>
                           <td>{users.Telephone}</td>
                           <td>Patients(Hard code for now)</td>
                           <UserInput users = {users}/>
                           </tr>
                     ))}                                                                              
               </tbody>
            </table>
         </div>
      </div>



      
      {/* <ul> */}
         {/* {users.map(users => ( */}
            {/* // <li key = {users.FirstName}> */}
               {/* <UserInput users = {users}/> */}
            {/* </li> */}
         {/* // ))} */}
      {/* </ul> */}
       </>
      
   )

}





   


export default ViewAllAccountUI