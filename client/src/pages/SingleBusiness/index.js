import React, { useState } from "react";
import { Container, Card, CardImg, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import ReviewForm from "../../components/ReviewForm";


import { SINGLE_BUSINESS, GET_REVIEWS } from "../../utils/queries";


const SingleBusiness = () => {
  const { id } = useParams()
  const {loading: businessLoading, data: businessData} = useQuery(SINGLE_BUSINESS, { variables: {_id: id} })
  const {data: reviewData} = useQuery(GET_REVIEWS, { variables: {_id: id} })
  const [showReview, toggleShowReview] = useState(false)

  function toggleReview(val) {
    toggleShowReview(val)
  };
  return (
    <>
      {businessLoading? (
        <h2>Loading...</h2>
      ) : (
        <>
          <Card key={businessData.business._id}>
            <CardImg width="100%" src={businessData.business.image} alt="Business Image" />
            <Card.Body>
              <Card.Text>{businessData.business.name}</Card.Text>
              <Card.Text>{businessData.business.description}</Card.Text>
              <Card.Text>{businessData.business._id}</Card.Text>
              <Card.Text>Rating:</Card.Text>
              <Card.Text>Owner:</Card.Text>
            </Card.Body>
          </Card>

          <Container>
            {showReview 
            ? 
            (<ReviewForm businessID={businessData.business._id} toggleReview={toggleReview}></ReviewForm>) 
            :
            (<Button onClick={() => toggleReview(true)}>Leave Review</Button>)}
          </Container>

          <Container>
            <h2>Reviews</h2>
            {/* {REVIEWS WILL GO HERE} */}
            <li>review 1</li>
            <li>review 2</li>
            <li>review 3</li>
          </Container>
        </>
      )}
    </>
  )
};

export default SingleBusiness