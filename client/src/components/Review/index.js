import React, { useState } from "react";
import { Container, Card, CardImg, Button } from "react-bootstrap";

const Review = ({toggleReview}) => {
  return (
    <>
      <li>review componenet</li>
      <Button onClick={() => toggleReview(false)}>close</Button>
    </>  
  )
  
};

export default Review;