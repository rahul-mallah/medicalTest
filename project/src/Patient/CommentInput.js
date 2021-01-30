import React from 'react'
import {firestore} from '../firebase';
import {useHistory, Link} from 'react-router-dom';
import { useAuth } from '../util/Auth';

export const CommentInput = (props) => {

    const history = useHistory()
    const {currentUser} = useAuth()


    const onDelete = () => { 
        for(var i = 0; i < props.array.length; i++)
        {
            if(props.array[i].id === props.comments)
            {
                props.array.splice(i, 1);
            }
        }
        const db = firestore
        db.collection('comments').doc(props.comments.id).delete()
       
        alert("Account has been deleted successfully!")
    }

    return (<>
        <div>
        
        <button onClick={onDelete} disabled = {currentUser.email !== props.comments.patientEmail} class = "btn btn-danger">Delete</button>
        </div>
    </>
    )
}