import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Row, Form, Button } from 'react-bootstrap';
import { MY_FOLLOWS } from '../../utils/queries';
import { useQuery } from '@apollo/client';

import "./index.css"

const Connect = () => {
  const [friendInput, setFriendInput] = useState('');
  const [toggle, flipToggle] = useState(true);
  const {loading, data} = useQuery(MY_FOLLOWS);

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
        {toggle ? (
            <div>
              <li>follower 1 </li>
              <li>follower 2 </li>
              <li>follower 3 </li>
            </div>) 
            : <>
                {loading? (<div>Loading</div>)
                :data.user.following.name.map((businessName) =>{
                  return(
                  <li>{businessName}</li>
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