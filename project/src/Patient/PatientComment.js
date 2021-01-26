import React, {useState} from 'react'
import {withRouter, Link, useLocation} from "react-router-dom";
import ReactDOM from 'react-dom'
import './comment.css'
import { useAuth } from '../util/Auth';
import { auth, firestore} from '../firebase';
import {CommentInput} from './CommentInput'


function PatientComment(props) {
    const [comments, setComments] = useState([])
    const [currentComments, setCurrentComments] = useState("")
    const {currentUser} = useAuth()
    const [users, setUsers] = useState([])

    React.useEffect(()=>{
        const fetchData = async () =>{
           firestore.collection("Users")
           .where("Email", "==", String(currentUser.email))
           .get()
           .then(function(data){
              console.log(data)
                 setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id})));
           }); 
           await firestore.collection("comments")
           .where("Email", "==", String(props.email))
           .get()
           .then(function(data){
              console.log(data)
                 setComments(data.docs.map(doc => ({ ...doc.data(), id: doc.id})));
           }); 
        };
        fetchData();
     }, [])
     const user = {...users[0]}
     const array = []
     

    async function submitComment (e) {
        e.preventDefault()
        const obj = {
            email: props.email,
            patient: user.FirstName + " " + user.LastName,
            patientEmail: currentUser.email,
            comment: currentComments
        }
        
        array.push(obj)
       

        await firestore.collection("comments").add(
            {
                Email: props.email,
                patient: user.FirstName + " " + user.LastName,
                patientEmail: currentUser.email,
                comment: currentComments
            }
        ).then(() => {
            alert("Posted successfully")
        })
        await firestore.collection("comments")
        .where("Email", "==", String(props.email))
        .get()
        .then(function(data){
           console.log(data)
              setComments(data.docs.map(doc => ({ ...doc.data(), id: doc.id})));
        }); 
        

    }

    function deleteComment (comment) {
        firestore.collection("comments").doc(comment.id).delete().then(()=>{
            alert("Comment has been deleted successfully!")
        }).catch(err => alert(err))
    }


    
    return (
        
        <div>
            <div className = "comment-box">
                <h2>Join the Discussion</h2>
                <form className = "comment-form">
                    <div className = "comment-form-fields">
                        <input placeholder = "Name" value = {user.FirstName + " " + user.LastName} disabled = {true } required>
                        </input>
                        <input placeholder = "Email" value = {currentUser.email} disabled = {true } required>
                        </input>
                        <textarea placeholder="Comment" rows = "4" onChange={(e) => setCurrentComments(e.target.value)} required>
                        </textarea>
                        <div className = "comment-form-actions">
                            <button type = "submit" onClick = {submitComment}>
                                Post Comment
                            </button>
                        </div>
                    </div>
                </form>
                <button id = "comment-reveal" type = "submit">
                     Show Comments
                </button>
                <h3>Comments</h3>
                    {comments.length === 0 && (<h4 className = "comment-count"> No comments yet </h4>)}
                    {comments.length !== 0 && (<h4 className = "comment-count"> {comments.length} comment </h4> 
                    )}
                   
                      {comments.map(comment => 
                    <div className = "comment">
                        <p className = "comment-header">{user.FirstName + " " + user.LastName}</p>
                        <p className = "comment-body">{comment.comment}</p>
                        <div className = "comment-footer" >
                            {/* <button className = "comment-footer-delete" onClick = {deleteComment}>Delete Comment</button> */}

                            <CommentInput comments = {comment.id} id = {props.id} array = {array}/>
                            
                        </div>
                    </div>)}
                    
    
    
    
    
    
    

    
    
            </div> 
        </div>
    )
}

export default PatientComment
