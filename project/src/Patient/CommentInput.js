import React from 'react'
import {firestore} from '../firebase';
import {useHistory, Link} from 'react-router-dom';
import { useAuth } from '../util/Auth';

export const CommentInput = (props) => {

    const history = useHistory()
    const {currentUser} = useAuth()


    const onDelete = () => { 
        const db = firestore
        db.collection('comments').doc(props.comments.id).delete()
       
        alert("Account has been deleted successfully!")
        // history.push('/Patient/searchDoctor')
    }

    // {"/Patient/doctorProfile/" + props.id}

    return (<>
        {/* {<button onClick={onUpdateFirstName}>Update</button>} */}
        <div>
        
        <button onClick={onDelete} disabled = {currentUser.email !== props.comments.patientEmail} class = "btn btn-danger">Delete</button>
       
        {/* <a onClick={() => {window.location.href="/SysAdm/viewIndvAcc"}} className="btn btn-success">Edit</a> */}
        </div>
    </>
    )
}