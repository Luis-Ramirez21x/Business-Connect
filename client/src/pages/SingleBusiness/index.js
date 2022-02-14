import React, { useState } from "react";
import { Container, Card, CardImg, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Review from "../../components/Review";

import "./index.css"
import { SINGLE_BUSINESS } from "../../utils/queries";

const SingleBusiness = () => {
  const { id } = useParams()
  const {loading, data} = useQuery(SINGLE_BUSINESS, { variables: {_id: id} })
  const [showReview, toggleShowReview] = useState(false)

  function toggleReview(val) {
    toggleShowReview(val)
  };
 console.log(data);
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
          </Card>

          <Container className="review-section">
            {showReview 
            ? 
            (<Review businessID={data.business._id} toggleReview={toggleReview}></Review>) 
            :
            (<Button className='leave-review-btn' onClick={() => toggleReview(true)}>Click Here To Leave A Review</Button>)}
          </Container>

          <Container>
            <h2 className="review-heading">User Reviews</h2>
            {/* {REVIEWS WILL GO HERE} */}
            <ul className="list-container">
            <li className="review-list">review 1</li>
            <li className="review-list">review 2</li>
            <li className="review-list">review 3</li>
            <li className="review-list">review 4</li>
            <li className="review-list">review 5</li>
            <li className="review-list">review 6</li>
            </ul>
          </Container>
        </>
      )}
    </>
  )
};

export default SingleBusiness