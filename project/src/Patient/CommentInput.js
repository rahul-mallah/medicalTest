import React from 'react'
import {firestore} from '../firebase';

export const CommentInput = ({comments}) => {


    const onDelete = () => {
        const db = firestore
        db.collection('comments').doc(comments.id).delete()
        //window.location.reload();
        alert("Account has been deleted successfully!")
    }

    return (<>
        {/* {<button onClick={onUpdateFirstName}>Update</button>} */}
        <div>
        <button onClick={onDelete} class = "btn btn-danger">Delete</button>
        {/* <a onClick={() => {window.location.href="/SysAdm/viewIndvAcc"}} className="btn btn-success">Edit</a> */}
        </div>
    </>
    )
}