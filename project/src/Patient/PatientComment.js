import React, {useState} from 'react'
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import './comment.css'
import { useAuth } from '../util/Auth';
import { firestore} from '../firebase';
import StarRatings from 'react-star-ratings';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

function PatientComment(props) {
    const [comments, setComments] = useState([])
    const [currentComments, setCurrentComments] = useState("")
    const {currentUser} = useAuth()
    const [users, setUsers] = useState([])
    const [rating, setRating] = useState(1)

    const submitCommentAlert = () => {
        confirmAlert({
          title: 'Congratulations!',
          message: 'Your comment has been posted successfully.',
          buttons: [
            {
              label: 'OK',
            },
          ]
        });
      };

      //fetches data on render
    React.useEffect(()=>{
        const fetchData = async () =>{
           firestore.collection("Users").limit(1)
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
           
     // function adds user's comments to the database
    async function submitComment (e) {
        e.preventDefault()
        const obj = {
            email: props.email,
            patient: user.FirstName + " " + user.LastName,
            patientEmail: currentUser.email,
            comment: currentComments,
            rating: rating, 
            date: moment(new Date()).format('MMMM Do YYYY')
        }
        
        array.push(obj)

        
        await firestore.collection("comments").add(
            {
                Email: props.email,
                patient: user.FirstName + " " + user.LastName,
                patientEmail: currentUser.email,
                comment: currentComments,
                rating: rating,
                date: moment(new Date()).format('MMMM Do YYYY')
            }
        ).then(() => {
            submitCommentAlert()
        })
        await firestore.collection("comments")
        .where("Email", "==", String(props.email))
        .get()
        .then(function(data){
           console.log(data)
              setComments(data.docs.map(doc => ({ ...doc.data(), id: doc.id})));
        }); 
    }

    // function deletes user comments from database
    async function DeleteComment (comment) {
        array = array.filter(i => i.id !== comment.id);
       await firestore.collection("comments").doc(comment.id).delete().then(()=>{
            alert("Comment has been deleted successfully!")
            window.location.reload();

        }).catch(err => alert(err))
    }
  

  let Total = 0

  for (var i = 0; i < comments.length; i++) {
      Total += parseFloat(comments[i].rating)
  }

  const avg = Total / comments.length

   
    return (
        <div className="d-flex align-items-center justify-content-center">
            {users.map(user => 
            <div className = "comment-box">
                
                <h5>REVIEWS</h5>
                
                <h1 className = "font" style = {{
                    fontSize: "70px"
                }}>{avg?avg.toFixed(1):0}</h1>

            <div className = "star" style = {{
                marginTop: "-1%"
            }}> 
                <StarRatings
                rating= {avg?avg:0}
                starDimension="25px"
                starSpacing="2px"
                starRatedColor="orange"         
            />
            </div>
            
            <div className = "row">
            <img src = "https://cdn2.iconfinder.com/data/icons/font-awesome/1792/user-512.png" style = {{
                width: "40px",
                colorAdjust: "#0069d9",
                marginLeft: "1%"
                
            }}/>
            <h5 className = "mt-2 ml-1">{comments.length} total</h5>
            </div>
            
                <Form className = "comment-form" onSubmit = {submitComment}>
                    <div className = "comment-form-fields">
                    
                    <Form.Group id = "Name">
                        <Form.Control 
                        defaultValue = {user.FirstName + " " + user.LastName} 
                        disabled = {true} 
                        required/>
                     </Form.Group>
                    
                     <Form.Group id = "Email">
                        <Form.Control 
                        defaultValue = {currentUser.email} 
                        disabled = {true} 
                        required/>
                     </Form.Group>

                     <Form.Group id = "Write a review here">
                        <Form.Control 
                        as = "textarea"
                        placeholder = "Write a review here"
                        rows = {3}
                        onChange={(e) => setCurrentComments(e.target.value)}
                        disabled = {false} 
                        required/>
                     </Form.Group>

                     <Form.Group id = "Leave a rating here">
                        <Form.Control 
                        placeholder = "Leave a rating here"
                        type = "number"
                        min = "1" 
                        max = "5"
                        pattern = "[1-5]"
                        onChange={(e) => setRating(e.target.value)}
                        disabled = {false} 
                        required/>
                     </Form.Group>
                     
                     <Button className="w-100" type="submit">Post Review</Button>
                     </div>
                </Form>

                <h3>Reviews</h3>
                    {comments.length === 0 && (<h4 className = "comment-count"> No reviews yet </h4>)}
                    {comments.length !== 0 && (<h4 className = "comment-count"> {comments.length} reviews </h4> 
                    )}
            
                      {comments.map(comment => 
                      
                    
                    <div className = "comment">
                        <p className = "mt-1">{comment.patient} </p>
                        
                        <div className = "row" style = {{
                            marginLeft: "-0.05%",
                            marginTop: "-0.5%"
                        }}> 
                        <StarRatings 
                         
                         
                         
                        
                        rating= {parseFloat(comment.rating)}
                        starDimension="20px"
                        starSpacing="2px"
                        starRatedColor="orange"  
                        />
                        <p className = "ml-3 mt-1">{comment.date}</p>
                        </div>

                                                   
                        <p className = "comment-body mt-4">{comment.comment}</p>


                        <div className = "comment-footer ml-1" >
                            <button className = "btn btn-danger mt-4" onClick = {(e)=>{DeleteComment(comment)}} disabled = {currentUser.email !== comment.patientEmail}>Delete</button>
                        </div>
                    </div>)}                            
            </div> 
            )}
        </div>
    )
}

export default PatientComment
