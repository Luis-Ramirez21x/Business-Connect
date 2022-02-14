import React, { useEffect, useState } from "react";
import { Container, Col, Form, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import "./index.css"

import { ALL_TAGS, BUSINESSES_BY_TAG } from '../../utils/queries'
import { BusinessList } from '../../components/BusinessList'

import { useQuery, useLazyQuery } from "@apollo/client";
import image from '../../images/site_img02.png';
import "./index.css"

const Home = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchContent, setSearchContent] = useState([])
  const [tagInput, setTagInput] = useState('Select A Category');

  const {loading:tag_loading, data:tag_data} = useQuery(ALL_TAGS);
  const [loadBusinesses, { error }] = useLazyQuery(
    BUSINESSES_BY_TAG,
    { variables: { name: tagInput } }
  );

  const callLoadBusiness = async () => {
    try {
      const { data:business_data } = await loadBusinesses()
      if (business_data) {
        setSearchContent(business_data.tag.businesses)
      }
    }
    catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div className="parallax"></div>

      <div className="top-banner-container">
        <div className="top-info-text">
          <h1 id="top-banner-text">Find the services you need in an instant.</h1>
            <p>Get all the help you need with a simple search. We can connect you with a wide range of services with upfront pricing and instant booking for daycare, cleaning and more.</p>
        </div>
      </div>

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
              <Button className='search-btn-main' type='submit' variant='primary' size='lg'>Search</Button>
            </Col>
          </Form.Row>
        </Form>
      </Container>

      <Container className="cat-search">
      <h2 className="cat-header">You May Also Choose A Category Here </h2>
        <DropdownButton className="drop-down-btn" size='lg' id="dropdown-basic-button" title={tagInput} value={tagInput} onSelect={(eventKey, event) => setTagInput(eventKey)}>
          {tag_loading ? (<DropdownItem>loading...</DropdownItem>) : 
            tag_data.tags.map((tag)=> {
              return (
                <DropdownItem eventKey={tag.name} key={tag.name} value>{tag.name}</DropdownItem>
              )
            })}
        </DropdownButton>
        <Button className='cat-search-btn' onClick={callLoadBusiness}>Search</Button>
      </Container>

      <Container>
        {searchContent.length ? (
          searchContent.map((business) => {
            return (
              <BusinessList key={business.name} business={business}></BusinessList>
            )
          })
        ) : (
          <h3>Start by Searching for A Category</h3>
        )}
      </Container>

      <Container className="bot-banner-container">
        <img className="bot-banner-img" src={image}></img>
        <div className="bot-info-text">
          <h1>Get Connected Today!</h1>
            <p>Users from all over the US use The Business Connect Network to match with the highest rated services in their area. Signup now to get connected with amazing businesses today.</p>
        </div>
      </Container>

      <div className="container-fluid footer-content">
      
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
