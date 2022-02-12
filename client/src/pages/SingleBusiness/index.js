import React, { useState } from "react";
import { Container, Card, CardImg, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import ReviewForm from "../../components/ReviewForm";
import Review from "../../components/Review"


import { SINGLE_BUSINESS } from "../../utils/queries";


const SingleBusiness = () => {
  const { id } = useParams()
  const {loading, data} = useQuery(SINGLE_BUSINESS, { variables: {_id: id} })
  const [showReview, toggleShowReview] = useState(false)

  function toggleReview(val) {
    toggleShowReview(val)
  };

  console.log(data)
  return (
    <>
      {loading? (
        <h2>Loading...</h2>
      ) : (
        <>
          <Card key={data.business._id}>
            <CardImg width="100%" src={data.business.image} alt="Business Image" />
            <Card.Body>
              <Card.Text>{data.business.name}</Card.Text>
              <Card.Text>{data.business.description}</Card.Text>
              <Card.Text>{data.business._id}</Card.Text>
              <Card.Text>Rating:</Card.Text>
              <Card.Text>Owner:</Card.Text>
            </Card.Body>
          </Card>

          <Container>
            {showReview 
            ? 
            (<ReviewForm businessID={data.business._id} toggleReview={toggleReview}></ReviewForm>) 
            :
            (<Button onClick={() => toggleReview(true)}>Leave Review</Button>)}
          </Container>

          <Container>
            {data.business.reviews.map((review) => {
              return (
                <Review review={review}></Review>
              )
            })}
          </Container>
        </>
      )}
    </>
  )
};

export default SingleBusiness