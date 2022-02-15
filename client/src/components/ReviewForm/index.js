import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Container, Col ,Card, CardImg, Button, Form } from "react-bootstrap";
import { POST_REVIEW } from "../../utils/mutations";
import Auth from "../../utils/auth";
import "./index.css";

const ReviewForm = ({ businessID, toggleReview }) => {
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
    console.log(reviewFormData.title);

    if (!token) {
      alert('You must be logged in to leave a review!')
      return false;
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
              className="review-title-section"
              name='title'
              value={reviewFormData.title}
              onChange={handleInputChange}
              type='text'
              size='md'
              placeholder='Review Title'
              required 
          /> 
          <textarea
              className= 'form-review-section'
              name='description'
              rows={14}
              cols={10}
              wrap="soft"
              value={reviewFormData.description}
              onChange={handleInputChange}
              type='textarea'
              size='md'
              placeholder='Review Description'
              required 
          />  
        </Form.Group>  
        <Button
          className='review-post-btn'
          disabled={!(reviewFormData.title && reviewFormData.description)}
          type='submit'
          variant='success'>
          Post
        </Button>
      </Form>
    </>  
  )
};

export default ReviewForm;