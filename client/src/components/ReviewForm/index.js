import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Form } from "react-bootstrap";
import { POST_REVIEW } from "../../utils/mutations";
import Auth from "../../utils/auth";
import "./index.css";
import { FaStar } from "react-icons/fa";


const ReviewForm = ({ businessID, toggleReview }) => {
  const [reviewFormData, setReviewFormData] = useState({ title: '', description: '' });
  const [validated] = useState(false);
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  //star rating state*****
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0)
  
  const [postReview] = useMutation(POST_REVIEW)

  //logic/functions
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReviewFormData({ ...reviewFormData, [name]: value });
  };

  function refreshPage() {
    window.location.reload(false);
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!token) {
      alert('You must be logged in to leave a review!')
      return false;
    }

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await postReview({
        variables: { businessId: businessID, 
                     title: reviewFormData.title,
                     description: reviewFormData.description,
                     rating: currentValue 
                    }
      })
      toggleReview(false)
    } catch (err) {
      console.error(err);
    }

    setReviewFormData({
      title: '',
      description: '',
    });

    refreshPage();
  };

  //star rating functions
  const handleClick = value => {
    setCurrentValue(value)
  }

  const handleMouseOver = newHoverValue => {
    setHoverValue(newHoverValue)
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined)
  }
  //star colors
  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"  
};

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Form.Group className="review-form-group">
        <Form.Label className="review-form-label">Your Review</Form.Label>  
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
        <div style={styles.stars}>
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={24}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
              style={{
                marginRight: 10,
                cursor: "pointer"
              }}
            />
            )
          })}
        </div>
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
//star styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  textarea: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    padding: 10,
    margin: "20px 0",
    minHeight: 100,
    width: 300
  },
  button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 300,
    padding: 10,
  }

};

export default ReviewForm;