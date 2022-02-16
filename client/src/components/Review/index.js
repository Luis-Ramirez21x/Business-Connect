import React, { useState } from "react";
import { Container, Card, CardImg, Button } from "react-bootstrap";
import { FaStar } from "react-icons/fa";

const Review = ({review}) => {
  const stars = Array(5).fill(0);
  return(
    <>
      <Card className="review-list">
        <Card.Body>
          <Card.Title>{review.title}</Card.Title>
          <Card.Text>{stars.map((_, index) => {
              return (
                <FaStar key={index} 
                  size={24} color={(review.rating) > index ? "#FFBA5A" : "#a9a9a9"} 
                  style={{marginRight: 10,}}/>
                )
              })}</Card.Text>
          <Card.Text>{review.description}</Card.Text>
        </Card.Body>  
      </Card>
    </>  
  )
};

export default Review;