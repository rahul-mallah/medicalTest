import React, {useState} from 'react'
import './comment.css'
import { useAuth } from '../util/Auth';
import { firestore} from '../firebase';
import StarRatings from 'react-star-ratings';
import moment from 'moment';

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
  

  let Total = 0

  for (var i = 0; i < comments.length; i++) {
      Total += parseFloat(comments[i].rating)
  }

  const avg = Total / comments.length

   
    return (
        <div className="d-flex align-items-center justify-content-center">
            <div className = "comment-box">
                <h2>REVIEWS</h2>

                <h3>{avg.toFixed(1)}</h3>



                
                
                <StarRatings
                rating= {avg?avg:0}
                starDimension="20px"
                starSpacing="2px"
                starRatedColor="orange"         
            />

            

                <h5>{comments.length} total</h5>
                

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
                <h3>Comments</h3>
                    {comments.length === 0 && (<h4 className = "comment-count"> No comments yet </h4>)}
                    {comments.length !== 0 && (<h4 className = "comment-count"> {comments.length} comment </h4> 
                    )}
            


                      {comments.map(comment => 
                      
                    
                    <div className = "comment">
                        <p className = "mt-1">{comment.patient} </p>
                        
                        <div className = "row" style = {{
                            marginLeft: "0.01%"
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
        </div>
    )
}

export default PatientComment
