import React, { useState } from "react";
import { Container, Col ,Card, CardImg, Button, Form } from "react-bootstrap";

const Review = ({toggleReview}) => {
  return (
    <>
      <li>Your Review</li>
      <Form>
        <Form.Row>
          <Col>
            <Form.Control
              name="" 
            />  
          </Col>
        </Form.Row>
      </Form>
      <Button onClick={() => toggleReview(false)}>close</Button>
    </>  
  )
  
};

export default Review;