import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import {useMutation} from '@apollo/client';
import { Jumbotron, Container, Col, Form, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { ALL_TAGS } from '../../utils/queries'
import { CREATE_BUSINESS } from '../../utils/mutations';
import Auth from '../../utils/auth';
import "./index.css"

function MyBusiness() {
  //can be refactored to be userFormData
  const [businessFormData, setBusinessFormData] = useState(
    { name: '', address: '', description: '', 
    price: '', image: '' }
  )
  const [tagInput, setTagInput] = useState('Tag Your Business Here')

  const {loading, data} = useQuery(ALL_TAGS);
  const [createBusiness, { error }] = useMutation(CREATE_BUSINESS);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBusinessFormData({ ...businessFormData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    

    // check if form has everything
    const form = event.currentTarget;
     if (form.checkValidity() === false) {
       event.preventDefault();
       event.stopPropagation();
     }

    const newBusiness = {
      ...businessFormData,
      tagInput: tagInput
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
    setBusinessFormData({
      name: '',
      address: '',
      description: '',
      price: '',
      image: ''
    });
    setTagInput('Tag Your Business Here')
  };

  return (
    <>
    <h2 className='business-info-header'>Enter Your Business's Info Here</h2>
      <Container className='d-flex business-info-main'>
        <Form className='form-input-main' onSubmit={handleSubmit}>
          <Form.Row>
            <Col className='form-control-section' xs={12} md={12}>
              <Form.Control
                  name='name'
                  value={businessFormData.name}
                  onChange={handleInputChange}
                  type='text'
                  size='md'
                  placeholder='Business name'
              />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col xs={12} md={12}>
              <Form.Control
                  name='address'
                  value={businessFormData.address}
                  onChange={handleInputChange}
                  type='text'
                  size='md'
                  placeholder='Business address'
              />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col xs={12} md={12}>
              <Form.Control
                  name='description'
                  value={businessFormData.description}
                  onChange={handleInputChange}
                  type='text'
                  size='md'
                  placeholder='Business description'
              />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col xs={12} md={12}>
              <Form.Control
                  name='price'
                  value={businessFormData.price}
                  onChange={handleInputChange}
                  type='text'
                  size='md'
                  placeholder='Business Price (per hour/ per job)'
              />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col xs={12} md={12}>
              <Form.Control
                  name='image'
                  value={businessFormData.image}
                  onChange={handleInputChange}
                  type='text'
                  size='md'
                  placeholder='Business image url'
              />
            </Col>
          </Form.Row>
          <Form.Row>
            <Button className='bi-submit-btn' type='submit' variant='success' size='md'>Submit</Button>
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