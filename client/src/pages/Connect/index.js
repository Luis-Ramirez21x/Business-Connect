import React, { useState } from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import { MY_FOLLOWS } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import "./index.css"

const Connect = () => {
  const {loading, data} = useQuery(MY_FOLLOWS);
  console.log(data)

  const [toggle, flipToggle] = useState(true);
  const [followerStyle, setFollowerStyle] = useState('btn-primary')
  const [followingStyle, setFollowingStyle] = useState('btn-secondary')

  function setToggle(val) {
    flipToggle(val)

    if (val === false) {
      setFollowerStyle("btn-secondary") 
      setFollowingStyle("btn-primary") 
    } else {
      setFollowerStyle("btn-primary") 
      setFollowingStyle("btn-secondary") 
    }
  };
 
  return (
    <>
      <Container className='connect-main'>
        <h1 className='connects-header'>Your Connections</h1>
        <Row className='followers-section-main'> 
          <Col className='connect-btns-main'>
            <Button className={followerStyle} onClick={() => setToggle(true)}>Followers</Button>
          </Col>
          <Col className='connect-btns-main'>
            <Button className={followingStyle} onClick={() => setToggle(false)}>Following</Button>
          </Col>   
        </Row>

        <Row className='connect-list'>
          {toggle 
            ? <>
              {loading
                ? 
                (<div>Loading...</div>)
                :
                (
                  <ul className='list'>
                    {data?.user.myBusiness[0]?.followers.map((user) =>{
                      return(
                        <Link key={user._id} to={`/user/${user._id}`}>
                        <li key={user._id}>{user.username}</li>
                        </Link>
                      )
                    })}
                  </ul>
                )  
              }
              </> 

            : <>
              {loading
                ? 
                (<div>Loading...</div>)
                :
                (
                  <ul className='list'>
                    {data.user.following.map((business) =>{
                      return(
                        <Link key={business._id} to={`/businesses/${business._id}`}>
                        <li key={business._id}>{business.name}</li>
                        </Link>
                      )
                    })}
                  </ul>
                )  
              }
          </>} 
        </Row>
      </Container>
    </>  
  );
};

export default Connect;