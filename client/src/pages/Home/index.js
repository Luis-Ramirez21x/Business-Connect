import React, { useState } from "react";
import { Container, Col, Form, Button } from 'react-bootstrap';

const Home = () => {
  const [searchInput, setSearchInput] = useState('');

  return (
    <>
      <Container>
        <h2>Start Searching For Businesses</h2>
        <Form>
          <Form.Row>
            <Col xs={12} md={8}>
              <Form.Control
                  name='searchBar'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search by category here'
              />
            </Col>
            <Col xs={12} md={4}>
              <Button type='submit' variant='success' size='lg'>Search</Button>
            </Col>
          </Form.Row>
        </Form>
      </Container>
      <Container>
        <Button>Category</Button>
        <Button>Category</Button>
        <Button>Category</Button>
      </Container>
    </>
  );
};

export default Home;
