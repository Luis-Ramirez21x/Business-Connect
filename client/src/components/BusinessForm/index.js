import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {useMutation} from '@apollo/client';
import { Jumbotron, Container, Col, Form, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { ALL_TAGS, MY_BUSINESS } from '../../utils/queries'
import { CREATE_BUSINESS } from '../../utils/mutations';
import Auth from '../../utils/auth';
import "./index.css"

function BusinessForm({ businessFormData, 
    setBusinessFormData, tagInput, setTagInput }) {
  const {loading: tagLoading, data: tagData} = useQuery(ALL_TAGS);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBusinessFormData({ ...businessFormData, [name]: value });
  };

  const [createBusiness, { error }] = useMutation(CREATE_BUSINESS)

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

    console.log(newBusiness)
    
    try {
      //changing price to an Int to meet model validation
      newBusiness.price = parseInt(newBusiness.price);
      console.log(typeof newBusiness.price)
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
      <Container className='bi-background'>
        <div className='business-info-main'>
          <Form className='form-input-container' onSubmit={handleSubmit}>
            <Form.Row>
              <Col xs={12} md={12}>
                <Form.Control
                    className='form-control-section'
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
                    className='form-control-section'
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
                    className='form-control-section'
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
                    className='form-control-section'
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
                    className='form-control-section'
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
            {tagLoading ? (<DropdownItem>loading...</DropdownItem>) : 
              tagData.tags.map((tag)=> {
                return (
                  <DropdownItem eventKey={tag.name} value>{tag.name}</DropdownItem>
                )
              })}
          </DropdownButton>
        </div>
        </div>
      </Container>
    </>
  )
};

export default BusinessForm;