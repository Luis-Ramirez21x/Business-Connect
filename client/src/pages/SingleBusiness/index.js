import React, { useState, useEffect } from "react";
import { Container, Card, CardImg, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import ReviewForm from "../../components/ReviewForm";
import Review from "../../components/Review"
import { FaStar } from "react-icons/fa";

import "./index.css"
import { SINGLE_BUSINESS, MY_BUSINESS, MY_FOLLOWING } from "../../utils/queries";
import { FOLLOW_BUSINESS, UNFOLLOW_BUSINESS } from "../../utils/mutations";

const SingleBusiness = () => {
  const { id } = useParams()

  const {loading, data} = useQuery(SINGLE_BUSINESS, { variables: {_id: id} })
  const {data: userData} = useQuery(MY_BUSINESS)
  const {data: followData} = useQuery(MY_FOLLOWING)

  const [showReview, toggleShowReview] = useState(false)
  const [following, setFollowing] = useState([])

  const [follow] = useMutation(FOLLOW_BUSINESS)
  const [unfollow] = useMutation(UNFOLLOW_BUSINESS)

  useEffect(() => {
    console.log(followData?.user?.following)
    if (followData?.user?.following.includes(userData?.user?.myBusiness[0]._id)) {
      setFollowing(true)
    } else {
      setFollowing(false)
    }
  }, [followData])

  //star rating state
  const [currentValue, setCurrentValue] = useState(3);
  const stars = Array(5).fill(0)

  //logic for calculating average
  let sumRatings = 0;
  let averageRating = 0;
  if(data){
 
    let reviewsArr = data.business.reviews;
    for (let i=0; i< reviewsArr.length; i++){
        sumRatings += reviewsArr[i].rating;
    }
    averageRating = sumRatings/reviewsArr.length;
  }

  function toggleReview(val) {
    toggleShowReview(val)
  };

  function refreshPage() {
    window.location.reload(false);
  }

  const followBusiness = async (id)  => {
    console.log(following);
    if (following) {
      await unfollow({variables: { businessId: id } })
      refreshPage()
    } else {
      await follow({variables: { businessId: id } })
      refreshPage()
    }
  }

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
              <Card.Text>{stars.map((_, index) => {
              return (
                <FaStar key={index} 
                  size={24} color={(averageRating) > index ? "#FFBA5A" : "#a9a9a9"} 
                  style={{marginRight: 10,}}/>
                )
              })}</Card.Text>

            </Card.Body>
            {userData?.user.myBusiness[0]._id == id? <Button as={Link} to={`/update/${id}`} >Edit</Button> : null}
            {following? 
              <Button onClick={() => followBusiness(userData?.user.myBusiness[0]._id)}>Unfollow</Button> 
                : 
              <Button onClick={() => followBusiness(userData?.user.myBusiness[0]._id)}>Follow</Button>}
              
          </Card>

          
          {showReview 
          ? (
          <Container className="review-section">
          <ReviewForm businessID={data.business._id} toggleReview={toggleReview}></ReviewForm>
          </Container>)
          :
          (<Button className='leave-review-btn' onClick={() => toggleReview(true)}>Click Here To Leave A Review</Button>)}
          

          <Container>
            <h2 className="review-heading">User Reviews</h2>
            <ul className="list-container">
              {data.business.reviews.map((review) => {
                return (
                  <Review review={review}></Review>
                )
              })}
            </ul>
          </Container>
        </>
      )}
    </>
  )
};

export default SingleBusiness