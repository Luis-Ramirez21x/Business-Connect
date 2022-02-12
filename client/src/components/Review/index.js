import React, { useState } from "react";
import { Container, Col ,Card, CardImg, Button, Form } from "react-bootstrap";

const Review = ({toggleReview}) => {
  const [reviewFormData, setReviewFormData] = useState({ title: '', description: '' });
  const [validated] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReviewFormData({ ...reviewFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
    //   const { data } = await loginUser({
    //     variables: { ...userFormData }
    //   })
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