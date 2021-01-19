import React,{useState}  from 'react'
import {Link} from 'react-router-dom';
//import {menuItems} from '../components/Sidebar/SASideBarData';
import { useAuth } from '../util/Auth';
import { auth, firestore } from '../firebase';
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import {UserInput} from './UserInput'
import SearchBar from './searchBar';


function ViewAllAccountUI() 
{
   const [users, setUsers] = useState([])
   const [search, setSearch] = useState("")
   const [loading, setLoading] = useState(false)
   

   React.useEffect(() => {
   
      const fetchData = async () => {
         const db = firestore
         const data = await db.collection('Users').get()
         setUsers(data.docs.map(doc => ({...doc.data(), id: doc.id})))
      }
      fetchData()
   }, [])

//   const filteredUsers = users.filter(doc => {
      // return doc.FirstName.toLowerCase().includes(searchValue.toLowerCase())
//   })

      const filteredUsers = users.filter(doc => {
        return doc.FirstName.toLowerCase().includes(search.toLowerCase())
      } )

   return(
      <>
      <div class = "jumbotron jumbotron-fluid">
         <div class = "container">
            <h1 class = "display-4 text-center">User Accounts</h1>
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
                    {/* <input type = "text" placeholder = "Search" onChange = {e => setSearch(e.target.value)}></input> */}

                    {/* {filteredUsers.map((user, idx) => { */}
                       {/* <UserInput key = {idx}{...user} /> */}
                    {/* } */}
                    {/* )} */}
                </div>

         

   
      <div className = "row">
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
                           <Link to = {{
                              pathname: '/SysAdm/viewIndvAcc',
                              state: {user: users}
                           }}><Button type = "submit">Edit</Button></Link>
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