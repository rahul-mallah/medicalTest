import React, {useState} from 'react'
import NavBar from '../components/navbarUI';
import Searchable from 'react-searchable-dropdown';
import {firestore} from '../firebase';

function SearchDoctor() {
   const [doctorData, setDoctorData] = useState([]);
   const [openMenu, setOpenMenu] = useState(false);

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

   const hideMenu = () => {
      setOpenMenu(false);
  };

  const handleInputChange = (query, { action }) => {
   if (action === "input-change") {
       setOpenMenu(true);
   }
};

    return (
       <div>
         <h1>
            Search for Doctor Page
         </h1>
         <Searchable
            value="" //if value is not item of options array, it would be ignored on mount
            placeholder="Search" // by default "Search"
            notFoundText="No result found" // by default "No result found"
            options={new_options}
            onInputChange={handleInputChange}
            onChange={hideMenu}
            onBlur={hideMenu}
            onSelect={option => {
            console.log(option); // as example - {value: '', label: 'All'}
         }}
         listMaxHeight={200} //by default 140
      />
      </div>
    )
}
export default SearchDoctor
