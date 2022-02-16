import React, { useState } from "react";
import { Container, Card, CardImg, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import ReviewForm from "../../components/ReviewForm";
import Review from "../../components/Review"
import { FaStar } from "react-icons/fa";

import "./index.css"
import { SINGLE_BUSINESS } from "../../utils/queries";

const SingleBusiness = () => {
  //form state
  const { id } = useParams()
  const {loading, data} = useQuery(SINGLE_BUSINESS, { variables: {_id: id} })
  const [showReview, toggleShowReview] = useState(false)
  //star rating state
  const [currentValue, setCurrentValue] = useState(3);
  const stars = Array(5).fill(0)

  //logic for calculating average
  let sumRatings = 0;
  let averageRating = 0;
  if(data){
    console.log(data);
    let reviewsArr = data.business.reviews;
    for (let i=0; i< reviewsArr.length; i++){
        sumRatings += reviewsArr[i].rating;
    }
    averageRating = sumRatings/reviewsArr.length;
  }

  
  function toggleReview(val) {
    toggleShowReview(val)
  };

  
  return (
    <>
      {loading? (
        <h2>Loading...</h2>
      ) : (
        <>
          <Card className="business-card-main" key={data.business._id}>
            <CardImg className="card-img" width="100%" src={data.business.image} alt="Business Image" />
            <Card.Body className="card-body-main">
              <Card.Text>{data.business.name}</Card.Text>
              <Card.Text>{data.business.description}</Card.Text>
              <Card.Text>{stars.map((_, index) => {
              return (
                <FaStar key={index} 
                  size={24} color={(averageRating) > index ? "#FFBA5A" : "#a9a9a9"} 
                  style={{marginRight: 10,}}/>
                )
              })}</Card.Text>

            </Card.Body>
          </Card>

          
          {showReview 
          ? (
          <Container className="review-section">
          <ReviewForm businessID={data.business._id} toggleReview={toggleReview}></ReviewForm>
          </Container>)
          :
          (<Button className='leave-review-btn' onClick={() => toggleReview(true)}>Click Here To Leave A Review</Button>)}
          

          <Container>
            <h2 className="review-heading">User Reviews</h2>
            <ul className="list-container">
              {data.business.reviews.map((review) => {
                return (
                  <Review review={review}></Review>
                )
              })}
            </ul>
          </Container>
        </>
      )}
    </>
  )
};

export default SingleBusiness