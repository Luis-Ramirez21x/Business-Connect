import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Row, Form, Button } from 'react-bootstrap';

import "./index.css"

const Connect = () => {
  const [friendInput, setFriendInput] = useState('');
  const [toggle, flipToggle] = useState(true);

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
            : (
              <div>
                <li>following 1 </li>
                <li>following 2 </li>
                <li>following 3 </li>
              </div>
            )} 
        </Row>
      </Container>
    </>  
  );
};

export default Connect;