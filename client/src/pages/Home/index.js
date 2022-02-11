import React, { useEffect, useState } from "react";
import { Container, Col, Form, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

import { ALL_TAGS, BUSINESSES_BY_TAG } from '../../utils/queries'
import { BusinessList } from '../../components/BusinessList'

import { useQuery, useLazyQuery } from "@apollo/client";

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
    catch {
      console.log(Error)
    }
  }

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
      <h2>Or Choose A Category Here</h2>
        <DropdownButton size='lg' id="dropdown-basic-button" title={tagInput} value={tagInput} onSelect={(eventKey, event) => setTagInput(eventKey)}>
          {tag_loading ? (<DropdownItem>loading...</DropdownItem>) : 
            tag_data.tags.map((tag)=> {
              return (
                <DropdownItem eventKey={tag.name} key={tag.name} value>{tag.name}</DropdownItem>
              )
            })}
        </DropdownButton>
        <Button onClick={callLoadBusiness}>Search</Button>
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
    </>
  );
};

export default Home;
