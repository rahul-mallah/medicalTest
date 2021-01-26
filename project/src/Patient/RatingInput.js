import React from 'react'
import StarRatings from 'react-star-ratings';

function RatingInput(props) {
    var num = parseFloat(props.comments.rating)
    return (
        <div>
            <StarRatings
            rating= {num}
            starDimension="40px"
            starSpacing="15px"
        />            
        </div>
    )
}

export default RatingInput
