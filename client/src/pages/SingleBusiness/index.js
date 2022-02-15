import React, { useState, useEffect } from "react";
import { Container, Card, CardImg, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import ReviewForm from "../../components/ReviewForm";
import Review from "../../components/Review"

import "./index.css"
import { SINGLE_BUSINESS, MY_BUSINESS } from "../../utils/queries";

const SingleBusiness = () => {
  const { id } = useParams()
  const {loading, data} = useQuery(SINGLE_BUSINESS, { variables: {_id: id} })
  const {data: userData} = useQuery(MY_BUSINESS)
  const [showReview, toggleShowReview] = useState(false)

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
              <Card.Text>{data.business._id}</Card.Text>
              <Card.Text>Rating:</Card.Text>
              <Card.Text>Owner:</Card.Text>
            </Card.Body>
            {userData?.user.myBusiness[0]._id == id? <Button as={Link} to={`/update/${id}`} >Edit</Button> : null}
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