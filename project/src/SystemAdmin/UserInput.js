import React from 'react'
import {firestore} from '../firebase';

export const UserInput = ({users}) => {
    const [FirstName, setFirstName] = React.useState(users.FirstName)
    const [LastName, setLastName] = React.useState(users.LastName)

    const onUpdateFirstName = () => {
        const db = firestore
        db.collection('Users').doc(users.id).set({...users, FirstName})
    }

    const onUpdateLastName = () => {
        const db = firestore
        db.collection('Users').doc(users.id).set({...users, LastName})
    }



    const onDelete = () => {
        const db = firestore
        db.collection('Users').doc(users.id).delete()
        //window.location.reload();
        alert("Account has been deleted successfully!")
    }

    return (<>
    
        {/* <input  */}
            {/* value = {FirstName} */}
            {/* onChange = {e => { */}
                {/* setFirstName(e.target.value) */}
            {/* }} */}
        {/* /> */}
        
        
        {/* {<button onClick={onUpdateFirstName}>Update</button>} */}
        <div>
        {/* <a onClick={() => {window.location.href="/SysAdm/viewIndvAcc"}} className="btn btn-success">Edit</a> */}
        <button onClick={onDelete} class = "btn btn-danger">Delete</button>
        </div>
    </>
    )
}