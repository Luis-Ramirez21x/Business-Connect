import React, { useState } from "react";
import { Container, Col, Form, Button } from 'react-bootstrap';
import "./index.css"

const Home = () => {
  const [searchInput, setSearchInput] = useState('');

  return (
    <>
      <div class="parallax"></div>

      <Container className="search-container-main">
        <Form className='form-main'>
        <h2>Start Searching For Businesses</h2>
          <Form.Row className='search-main'>
            <Col xs={12} md={8}>
              <Form.Control
                  className='input-main'
                  name='searchBar'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search by category here'
              />
            </Col>
            <Col xs={12} md={1}>
              <Button type='submit' variant='primary' size='lg'>Search</Button>
            </Col>
          </Form.Row>
        </Form>
      </Container>
      <Container className="category-tag-main">
        {/* WILL RENDER WITH QUERY AND MAP LATER */}
        <div className="category-tag-main">
        <Button className="cat-btn" variant="primary">Category</Button>
        <Button className="cat-btn" variant="primary">Category</Button>
        <Button className="cat-btn" variant="primary">Category</Button>
        <Button className="cat-btn" variant="primary">Category</Button>
        <Button className="cat-btn" variant="primary">Category</Button>
        </div>
      </Container>

      <div className="banner-container">
        <div className="info-text">
          <h1>Banner Title/ placeholder</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Donec mauris erat, dignissim nec bibendum vitae, tincidunt a enim. 
              Aliquam iaculis justo dolor, sit amet ullamcorper dolor suscipit eu. 
              Quisque mollis, augue ac tempor congue, tellus elit interdum lorem, interdum congue metus leo id nulla. 
              Nulla placerat imperdiet molestie. Donec tempor nisl non ullamcorper suscipit. Ut rutrum venenatis enim et dictum. 
              Duis sed accumsan sapien. 
              Duis quis aliquet felis, eu aliquet est. Vestibulum varius vehicula congue. 
              Proin tristique mattis lorem at rhoncus.</p>
        </div>
      </div>

      <div class="container-fluid footer-content">
      
       <h1>Footer Content</h1>
      </div>

      {/* <Container className="container-fluid">
        <div className="footer-content">
        <h1>Footer Content</h1>
        </div>
      </Container> */}


    </>
  );
};

export default Home;
