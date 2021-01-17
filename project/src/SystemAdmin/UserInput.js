import React from 'react'
import {firestore} from '../firebase';

export const UserInput = ({users}) => {
    const [FirstName, setFirstName] = React.useState(users.FirstName)

    const onUpdate = () => {
        const db = firestore
        db.collection('Users').doc(users.id).set({...users, FirstName})
    }

    const onDelete = () => {
        const db = firestore
        db.collection('Users').doc(users.id).delete()
        //window.location.reload();
        alert("Account has been deleted successfully!")
    }

    return (<>
    {/*}
        <input 
            value = {FirstName}
            onChange = {e => {
                setFirstName(e.target.value)
            }}
        />
        {/*}
        
        {/* <button onClick={onUpdate}>Update</button> */}
        <button onClick={onDelete} class = "btn btn-danger">Delete</button>
    </>
    )
}