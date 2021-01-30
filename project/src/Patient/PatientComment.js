import React, {useState} from 'react'
import {withRouter, Link, useLocation} from "react-router-dom";
import {Button} from "react-bootstrap";
import ReactDOM from 'react-dom'
import './comment.css'
import { useAuth } from '../util/Auth';
import { auth, firestore} from '../firebase';
import {CommentInput} from './CommentInput'
import {Card} from 'react-bootstrap'
import StarRatings from 'react-star-ratings';
import ReactStars from "react-rating-stars-component";


function PatientComment(props) {
    const [comments, setComments] = useState([])
    const [currentComments, setCurrentComments] = useState("")
    const {currentUser} = useAuth()
    const [users, setUsers] = useState([])
    const [rating, setRating] = useState(1)

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
     let array = []
     

    async function submitComment (e) {
        e.preventDefault()
        const obj = {
            email: props.email,
            patient: user.FirstName + " " + user.LastName,
            patientEmail: currentUser.email,
            comment: currentComments,
            rating: rating
        }
        await firestore.collection("comments").add(
            {
                Email: props.email,
                patient: user.FirstName + " " + user.LastName,
                patientEmail: currentUser.email,
                comment: currentComments,
                rating: rating
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

    async function DeleteComment (comment) {
        array = array.filter(i => i.id !== comment.id);
       await firestore.collection("comments").doc(comment.id).delete().then(()=>{
            alert("Comment has been deleted successfully!")
            window.location.reload();

        }).catch(err => alert(err))
    }
  
    // function getRating(comment) {
        // let r = parse(comment.rating, 10)
        // return r
    // }

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
                        <input placeholder = "rating" type = "number" min = "1" max = "5" onChange={(e) => setRating(e.target.value)} required></input>
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
                    {comments.length !== 0 && (<h4 className = "comment-count"> {array.length} comment </h4> 
                    )}
                   
                      {comments.map(comment => 
                    <div className = "comment">
                        <p className = "comment-header">{comment.patient} </p>
                        <p className = "comment-body">{comment.comment}</p>
                        
                        <StarRatings
                        rating= {parseFloat(comment.rating)}
                        starDimension="20px"
                        starSpacing="5px"
                        starRatedColor="orange"
                    />            
                        <div className = "comment-footer" >
                            <button disabled = {currentUser.email !== comment.patientEmail} className = "btn btn-danger mt-4" onClick = {(e)=>{DeleteComment(comment)}}>Delete</button>
                        </div>
                    </div>)}
            </div> 
        </div>
    )
}

export default PatientComment
