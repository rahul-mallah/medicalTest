import React from 'react'
import {firestore} from '../firebase';
import {useHistory, Link} from 'react-router-dom';

export const CommentInput = (props) => {

    const history = useHistory()


    const onDelete = () => { 
        for(var i = 0; i < props.array.length; i++)
        {
            if(props.array[i].id === props.comments)
            {
                props.array.splice(i, 1);
            }
        }
        const db = firestore
        db.collection('comments').doc(props.comments).delete()
        //window.location.reload();
        alert("Account has been deleted successfully!");
    }

    // {"/Patient/doctorProfile/" + props.id}

    return (<>
        {/* {<button onClick={onUpdateFirstName}>Update</button>} */}
        <div>
      
        <button onClick={onDelete} class = "btn btn-danger">Delete</button>
       
        {/* <a onClick={() => {window.location.href="/SysAdm/viewIndvAcc"}} className="btn btn-success">Edit</a> */}
        </div>
    </>
    )
}