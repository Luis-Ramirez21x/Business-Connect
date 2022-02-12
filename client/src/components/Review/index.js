import React, { useState } from "react";
import { Container, Card, CardImg, Button } from "react-bootstrap";

const Review = ({review}) => {

  return(
    <>
      <Card>
        <Card.Body>
          <Card.Title>{review.title}</Card.Title>
          <Card.Text>{review.description}</Card.Text>
        </Card.Body>  
      </Card>
    </>  
  )
};

export default Review;