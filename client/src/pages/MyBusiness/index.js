import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import {useMutation} from '@apollo/client';
import { Jumbotron, Container, Col, Form, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { ALL_TAGS } from '../../utils/queries'
import { CREATE_BUSINESS } from '../../utils/mutations';
import Auth from '../../utils/auth';

function MyBusiness() {
  //can be refactored to be userFormData
  const [nameInput, setNameInput] = useState('');
  const [addressInput, setAddressInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const [imageInput, setImageInput] = useState('');
  const [tagInput, setTagInput] = useState('Tag Your Business');

  const {loading, data} = useQuery(ALL_TAGS);
  const [createBusiness, { error }] = useMutation(CREATE_BUSINESS);

  const handleSubmit = async (event) => {
    event.preventDefault();
    

    // check if form has everything
    const form = event.currentTarget;
     if (form.checkValidity() === false) {
       event.preventDefault();
       event.stopPropagation();
     }

    const newBusiness = {
      name: nameInput,
      address: addressInput,
      description: descriptionInput,
      price: priceInput,
      image: imageInput
    }
    
    try {
      //changing price to an Int to meet model validation
      newBusiness.price = parseInt(newBusiness.price);
      console.log(tagInput);
      const { data } = await createBusiness({
        variables: { ...newBusiness }
      })
      
      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
      //this code can be used to show an alert on the form
      //setShowAlert(true);
    }

    //clearing the form
    setNameInput('');
    setAddressInput('');
    setDescriptionInput('');
    setPriceInput('');
    setImageInput('');

  };

  

  return (
    <>
    <h2>Enter Your Business's Info Here</h2>
      <Container className='d-flex'>
        <Form onSubmit={handleSubmit}>
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
          <DropdownButton size='lg' id="dropdown-basic-button" title={tagInput} value={tagInput} onSelect={(eventKey, event) => setTagInput(eventKey)}>
            {loading ? (<DropdownItem>loading...</DropdownItem>) : 
              data.tags.map((tag)=> {
                return (
                  <DropdownItem eventKey={tag.name} value>{tag.name}</DropdownItem>
                )
              })}
          </DropdownButton>
        </div>
      </Container>
    </>
  )
};

export default MyBusiness;