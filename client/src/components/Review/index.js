import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Container, Col ,Card, CardImg, Button, Form } from "react-bootstrap";
import { POST_REVIEW } from "../../utils/mutations";
import Auth from "../../utils/auth";

const Review = ({ businessID, toggleReview }) => {
  const [reviewFormData, setReviewFormData] = useState({ title: '', description: '' });
  const [validated] = useState(false);
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  const [postReview, { error }] = useMutation(POST_REVIEW)

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReviewFormData({ ...reviewFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(reviewFormData)

    if (!token) {
        return false;
        alert('You must be logged in to leave a review!')
    }

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await postReview({
        variables: { businessId: businessID, 
                     title: reviewFormData.title,
                     description: reviewFormData.description 
                    }
      })
      console.log(data)
      toggleReview(false)
     
    } catch (err) {
      console.error(err);
    }

    setReviewFormData({
      title: '',
      description: '',
    });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Form.Group>
        <Form.Label>Your Review</Form.Label>  
          <Form.Control
              name='title'
              value={reviewFormData.title}
              onChange={handleInputChange}
              type='text'
              size='md'
              placeholder='Review Title'
              required 
          /> 
          <Form.Control
              name='description'
              value={reviewFormData.description}
              onChange={handleInputChange}
              type='text'
              size='md'
              placeholder='Review Description'
              required 
          /> 
        </Form.Group>  
        <Button
          disabled={!(reviewFormData.title && reviewFormData.description)}
          type='submit'
          variant='success'>
          Post
        </Button>
      </Form>
    </>  
  )
};

export default Review;