import React, { useState } from "react";
import { Container, Col, Form, Button } from 'react-bootstrap';
import { BusinessList } from '../../components/BusinessList'

const Home = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchContent, setSearchContent] 
  = useState([
    {
      id:1,
      name: "dummy business",
      image: "dummy image",
      description: "dummy description"
    }
  ])

  const handleSearch = async () => {

  };

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
        {/* WILL RENDER WITH QUERY AND MAP LATER */}
        <Button>Category</Button>
        <Button>Category</Button>
        <Button>Category</Button>
      </Container>

      <Container>
        {searchContent.length ? (
          searchContent.map((business) => {
            return (
              <BusinessList key={business.id} business={business}></BusinessList>
            )
          })
        ) : (
          <h3>Start by Searching for A Category</h3>
        )}
      </Container>
    </>
  );
};

export default Home;
