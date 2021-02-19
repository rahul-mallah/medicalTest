import React,{useState}  from 'react'
import { firestore } from '../firebase';
import {UserInput} from './UserInput'
import {StaffInput} from './StaffInput'
import SearchBar from './searchBar';
import DropDown from './dropDownBar';
import { useHistory } from "react-router-dom";
import IdleTimerContainer from '../util/IdleTimerContainer'


function ViewAllAccountUI() 
{
   //react hooks
   const [users, setUsers] = useState([])
   const [search, setSearch] = useState("")
   const [loading, setLoading] = useState(false)
   const [DropDownn, setDropDownn] = useState("All");
   const [radio, setRadio] = useState("All");
   let history = useHistory();

   //fetches data on render
   React.useEffect(() => {
      const fetchData = async () => {
         const db = firestore
         const data = await db.collection('Users').get()
         setUsers(data.docs.map(doc => ({...doc.data(), id: doc.id})))
      }
      fetchData()
   }, [])

   //filter function filters search data based on text in search field 
   //and based on dropdown value selected
   let filteredUser = users.filter(user => {
      if (DropDownn === "All" && DropDownn === "Select A User by...")
         return user
      else if (DropDownn === "Patient")
         return ((user.Role === DropDownn) && (user.Email.toLowerCase().includes(search.toLowerCase())))
      else if (DropDownn === "Medical Doctor")
       return ((user.Role === DropDownn) && (user.Email.toLowerCase().includes(search.toLowerCase())))
      else if (DropDownn === "Medical Admin")
         return ((user.Role === DropDownn) && (user.Email.toLowerCase().includes(search.toLowerCase())))
      else if (DropDownn === "System Admin")
         return ((user.Role === DropDownn) && (user.Email.toLowerCase().includes(search.toLowerCase())))
      return user.Email.toLowerCase().includes(search.toLowerCase())
  })
  

   return(
      <>
      <div class = "jumbotron jumbotron-fluid">
      <IdleTimerContainer></IdleTimerContainer>
         <div class = "container">
            <h1 class = "display-4 text-center">Accounts</h1>
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
            <SearchBar handleChange={(e) => setSearch(e.target.value)} placeholder = "Enter a user by Email..."/>
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
                  
                     {filteredUser.map(users => (
                        <tr>
                           {users.Name ? (<td>{users.Name}</td>):(<td>{users.FirstName} {users.LastName}</td>)} 
                            
                           {users.NRIC ? (<td>{users.NRIC}</td>):(<td>-</td>)}
                           {users.Address ? (<td>{users.Address}</td>):(<td>-</td>)}
                           {users.DOB ? (<td>{users.DOB}</td>):(<td>-</td>)}
                           <td>{users.Email}</td>
                           {users.Telephone ? (<td>{users.Telephone}</td>):(<td>-</td>)}
                           <td>{users.Role}</td>
                        <StaffInput medicalStaff = {users}/>

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