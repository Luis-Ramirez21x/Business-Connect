import React from "react";
import { Container, Card, CardImg } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import "./index.css"
import { SINGLE_BUSINESS } from "../../utils/queries";

const SingleBusiness = () => {
  const { id } = useParams()
  const {loading, data} = useQuery(SINGLE_BUSINESS, { variables: {_id: id} })
  
  return (
    <>
      {loading? (
        <h2>Loading...</h2>
      ) : (
        <>
          <Card className="business-card-main" key={data.singleBusiness._id}>
            <CardImg className="card-img" width="100%" src={data.singleBusiness.image} alt="Business Image" />
            <Card.Body>
              <Card.Text>{data.singleBusiness.name}</Card.Text>
              <Card.Text>{data.singleBusiness.description}</Card.Text>
              <Card.Text>{data.singleBusiness._id}</Card.Text>
              <Card.Text>Rating:</Card.Text>
              <Card.Text>Owner:</Card.Text>
            </Card.Body>
          </Card>

          <Container className="review-section">
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