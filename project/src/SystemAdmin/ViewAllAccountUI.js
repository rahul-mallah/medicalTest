import React,{useState}  from 'react'
import { firestore } from '../firebase';
import { Container } from "react-bootstrap"
import {UserInput} from './UserInput'
import SearchBar from './searchBar';
import DropDown from './dropDownBar';
import { useHistory } from "react-router-dom";
import IdleTimerContainer from '../util/IdleTimerContainer'


function ViewAllAccountUI() 
{
   const [users, setUsers] = useState([])
   const [search, setSearch] = useState("")
   const [loading, setLoading] = useState(false)
   const [filteredUsers, setFilteredUsers] = useState([]);
   const [DropDownn, setDropDownn] = useState("All");
   let history = useHistory();

   
   

   React.useEffect(() => {
   
      const fetchData = async () => {
         const db = firestore
         const data = await db.collection('Users').get()
         setUsers(data.docs.map(doc => ({...doc.data(), id: doc.id})))
      }
      fetchData()
   }, [])

   const filteredArray =   users.filter((user) =>
   user.Email.toLowerCase().includes(search.toLowerCase())
 )

   // const filteredArray = users.filter(user => {
   //    if (DropDown === "All")
   //       return user.FirstName.toLowerCase().includes(search.toLowerCase())
   //    return user.Email.toLowerCase().includes(search.toLowerCase())
   // })
  


   return(
      <>
      
      <div class = "jumbotron jumbotron-fluid">
      <IdleTimerContainer></IdleTimerContainer>
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
            <SearchBar handleChange={(e) => setSearch(e.target.value)} placeholder = "Enter a user name..."/>
         </div>

         {/* drop down */}
         <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                }}>
                <DropDown handleChange={(e) => setDropDownn(e.target.value)} placeholder="Select an option" /> 
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
                     <th>NRIC</th>
                     <th>Address</th>
                     <th>Date Of Birth</th>
                     <th>Email Address</th>
                     <th>Telephone</th>
                     <th>Role</th>
                     <th>Actions</th>
                  </tr>
               </thead>
               <tbody>
                  
                     {filteredArray.map(users => (
                        <tr>
                           {users.Name ? (<td>{users.Name}</td>):(<td>{users.FirstName} {users.LastName}</td>)} 
                            
                           {users.NRIC ? (<td>{users.NRIC}</td>):(<td>-</td>)}
                           {users.Address ? (<td>{users.Address}</td>):(<td>-</td>)}
                           {users.DOB ? (<td>{users.DOB}</td>):(<td>-</td>)}
                           <td>{users.Email}</td>
                           {users.Telephone ? (<td>{users.Telephone}</td>):(<td>-</td>)}
                           <td>{users.Role}</td>
                           {/* <Link to = {{ */}
                              {/* pathname: '/SysAdm/viewIndvAcc', */}
                              {/* state: {user: users} */}
                           {/* }}><Button type = "submit">Edit</Button></Link> */}
                           {/* <button onClick={onDelete} class = "btn btn-danger">Delete</button> */}

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