import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Row, Form, Button } from 'react-bootstrap';
import { MY_FOLLOWS } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

import "./index.css"

const Connect = () => {
  const {loading, data} = useQuery(MY_FOLLOWS);
  const [friendInput, setFriendInput] = useState('');
  const [toggle, flipToggle] = useState(true);
  
  

 console.log(data);


  

 

  function setToggle(val) {
    flipToggle(val)
  };
 
  
  return (
    <>
      <Container className='connect-main'>
        <h1 className='connects-header'>Your Connections</h1>
        <Form className='follow-search'>
          <Form.Row>
            <Col xs={12} md={4}>
              <Form.Control
                  className='search-friend'
                  name='searchFriend'
                  value={friendInput}
                  onChange={(e) => setFriendInput(e.target.value)}
                  type='text'
                  size='md'
                  placeholder='Search for a friend'
              />
            </Col>
          </Form.Row>
        </Form>
        <Row className='followers-section-main'> 
          <Col className='connect-btns-main'>
            <Button className='list-btn' onClick={() => setToggle(true)}>Followers</Button>
          </Col>
          <Col className='connect-btns-main'>
            <Button className='list-btn' onClick={() => setToggle(false)}>Following</Button>
          </Col>   
        </Row>

        <Row className='connect-list'>
        {toggle ? <>
            {loading? (<div>Loading...</div>)
              :data.user.myBusiness[0].followers.map((user) =>{
                return(
                <li key={user.username}>{user.username}</li>
                )
              })  
            }
            </> 

            : <>
                {loading? (<div>Loading...</div>)
                :data.user.following.map((business) =>{
                  return(
                  <Link to={`/businesses/${business._id}`}>
                  <li key={business._id}>{business.name}</li>
                  </Link>
                  )
                })  
              }
              </>} 
        </Row>
      </Container>
    </>  
  );
};

export default Connect;