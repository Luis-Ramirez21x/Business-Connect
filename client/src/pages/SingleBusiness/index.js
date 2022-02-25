import React, { useState, useEffect } from "react";
import { Container, Card, CardImg, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import Review from "../../components/Review"
import { FaStar } from "react-icons/fa";
import Auth from "../../utils/auth";

import "./index.css"
import { SINGLE_BUSINESS, MY_BUSINESS, MY_FOLLOWING } from "../../utils/queries";
import { FOLLOW_BUSINESS, UNFOLLOW_BUSINESS } from "../../utils/mutations";
import ReviewModal from "../../components/ReviewModal";

const SingleBusiness = () => {
  const { id } = useParams()
  const token = Auth.loggedIn()

  const {loading, data} = useQuery(SINGLE_BUSINESS, { variables: {_id: id} })
  const {data: userData} = useQuery(MY_BUSINESS)
  const {data: followData} = useQuery(MY_FOLLOWING)

  const [following, setFollowing] = useState(false)
  const [show, setShow] = useState(false);

  //star rating state
  const [currentValue, setCurrentValue] = useState(3);
  const stars = Array(5).fill(0)

  const [follow] = useMutation(FOLLOW_BUSINESS)
  const [unfollow] = useMutation(UNFOLLOW_BUSINESS)

  useEffect(() => {
    if (followData?.user?.following.some(item => item._id === id)) {
      setFollowing(true)
    } else {
      // else set "following" to false
      setFollowing(false)
    }
  }, [followData])

  function toggleReview() {
    if (token) {
      setShow(true)
    } else {
      alert("You must be logged in to leave a review!") 
    }
  };

  //logic for calculating rating average
  let sumRatings = 0;
  let averageRating = 0;

  if(data){
    let reviewsArr = data.business.reviews;
    for (let i=0; i< reviewsArr.length; i++){
        sumRatings += reviewsArr[i].rating;
    }
    averageRating = sumRatings/reviewsArr.length;
    console.log(data.business.image);
    averageRating = Math.floor(averageRating);
  }

  function refreshPage() {
    window.location.reload(false);
  }

  const followBusiness = async (id)  => {
    if (following) {
      if (token) {
        await unfollow({variables: { businessId: id } })
        refreshPage()
      } else {
        alert("You must be logged in to follow a business!")
      }
    } else {
      if (token) {
        await follow({variables: { businessId: id } })
        refreshPage()
      } else {
        alert("You must be logged in to follow a business!")
      }
    }
  }

  return (
    <>
      {loading? (
        <h2>Loading...</h2>
      ) : (
        <>
          <Card className="business-card-main" key={data.business._id}>
            <div className="card-body-header">
              <CardImg className="card-img" width="100%" src={data.business.image} alt="Business Image" />
              <Card.Text className="business-description">{data.business.description}</Card.Text>
            </div>
            <div className="card-info-main">
              <Card.Text>{data.business.name}</Card.Text>
              <Card.Text>{stars.map((_, index) => {
                return (
                  <FaStar key={index} 
                    size={24} color={(averageRating) > index ? "#FFBA5A" : "#a9a9a9"} 
                    style={{marginRight: 10,}}/>
                  )
                })}
              </Card.Text>
              <Card.Text>{data.business.businessEmail}</Card.Text>
              <Card.Text>{data.business.phoneNumber}</Card.Text>
            </div>
          </Card>
          
          <div className="unfol-fol-btn">
            {userData?.user?.myBusiness[0]?._id === id? <Button className="sb-edit-btn" as={Link} to={`/update/${id}`} >Edit</Button> : null}
            {userData?.user?.myBusiness[0]?._id === id? null :
             following? 
              <Button className="follow-unfollow-btn" onClick={() => followBusiness(id)}>Unfollow</Button> 
                : 
              <Button className="follow-unfollow-btn" onClick={() => followBusiness(id)}>Follow</Button>}
          </div>

          <ReviewModal show={show} setShow={setShow} refreshPage={refreshPage} businessID={data.business._id}/>
         
          <Button className='leave-review-btn' onClick={() => toggleReview()}>Click Here To Leave A Review</Button>
          
          <Container>
            <h2 className="review-heading">User Reviews</h2>
            <ul className="list-container">
              {data.business.reviews.map((review) => {
                return (
                  <Review key={review.title} review={review}></Review>
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