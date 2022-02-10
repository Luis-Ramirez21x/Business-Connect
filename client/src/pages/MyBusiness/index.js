import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Jumbotron, Container, Col, Form, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { ALL_TAGS} from '../../utils/queries'

function MyBusiness() {
  const [nameInput, setNameInput] = useState('');
  const [addressInput, setAddressInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const [imageInput, setImageInput] = useState('');

  const {loading, data} = useQuery(ALL_TAGS)

  const handleSubmit = async (event) => {
    const newBusiness = {
      name: nameInput,
      address: addressInput,
      description: descriptionInput,
      price: priceInput,
      image: imageInput
    }
  };

  return (
    <>
    <h2>Enter Your Business's Info Here</h2>
      <Container className='d-flex'>
        <Form>
          <Form.Row>
            <Col xs={12} md={12}>
              <Form.Control
                  name='businessName'
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  type='text'
                  size='md'
                  placeholder='Business name'
              />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col xs={12} md={12}>
              <Form.Control
                  name='businessAddress'
                  value={addressInput}
                  onChange={(e) => setAddressInput(e.target.value)}
                  type='text'
                  size='md'
                  placeholder='Business address'
              />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col xs={12} md={12}>
              <Form.Control
                  name='businessDescription'
                  value={descriptionInput}
                  onChange={(e) => setDescriptionInput(e.target.value)}
                  type='text'
                  size='md'
                  placeholder='Business description'
              />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col xs={12} md={12}>
              <Form.Control
                  name='businessPrice'
                  value={priceInput}
                  onChange={(e) => setPriceInput(e.target.value)}
                  type='text'
                  size='md'
                  placeholder='Business Price (per hour/ per job)'
              />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col xs={12} md={12}>
              <Form.Control
                  name='businessImage'
                  value={imageInput}
                  onChange={(e) => setImageInput(e.target.value)}
                  type='text'
                  size='md'
                  placeholder='Business image url'
              />
            </Col>
          </Form.Row>
          <Form.Row>
            <Button type='submit' variant='success' size='md'>Submit</Button>
          </Form.Row>
        </Form>
        <div>
          <DropdownButton size='lg' id="dropdown-basic-button" title="Tag Your Business">
            {loading ? (<DropdownItem>loading...</DropdownItem>) : 
              data.tags.map((tag)=> {
                return (
                  <DropdownItem key={tag.name}>{tag.name}</DropdownItem>
                )
              })}
             
          </DropdownButton>
        </div>
      </Container>
    </>
  )
};

export default MyBusiness;