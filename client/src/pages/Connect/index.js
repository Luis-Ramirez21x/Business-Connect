import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Row, Form, Button } from 'react-bootstrap';
import { MY_FOLLOWS } from '../../utils/queries';
import { useQuery } from '@apollo/client';

const Connect = () => {
  const [friendInput, setFriendInput] = useState('');
  const [toggle, flipToggle] = useState(true);
  const {loading, data} = useQuery(MY_FOLLOWS);

 

  //const myFollows = data.user?.following || {};

 

  function setToggle(val) {
    flipToggle(val)
  };
 
  
  return (
    <>
      <Container>
        <Form>
          <Form.Row>
            <Col xs={12} md={4}>
              <Form.Control
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
        <Row> 
          <Col md={6}>
            <Button onClick={() => setToggle(true)}>Followers</Button>
          </Col>
          <Col md={6}>
            <Button onClick={() => setToggle(false)}>Following</Button>
          </Col>   
        </Row>
        <Row>
        {toggle ? (
            <div>
              <li>follower 1 </li>
              <li>follower 2 </li>
              <li>follower 3 </li>
            </div>) 
            : <>
                {loading? (<div>Loading</div>)
                :data.user.following.map((businessName) =>{
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