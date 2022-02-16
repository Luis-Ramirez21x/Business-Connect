import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Container, Col, Form, Button, DropdownButton, Alert, } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { ALL_TAGS } from '../../utils/queries'
import "./index.css"

function BusinessForm({ businessFormData, setBusinessFormData, businessMutation, tagInput, setTagInput }) {
  const {loading: tagLoading, data: tagData} = useQuery(ALL_TAGS);

  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBusinessFormData({ ...businessFormData, [name]: value });
  };

  function refreshPage() {
    window.location.reload(false);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // check if form has everything
    if (tagInput != 'Tag Your Business Here') {

      const form = event.currentTarget;
      if (form.checkValidity() === false && tagInput != 'Tag Your Business Here') {
        event.preventDefault();
        event.stopPropagation();
      }
  
      const newBusiness = {
        ...businessFormData,
        tagName: tagInput
      }

      try {
        await businessMutation({
          variables: { ...newBusiness }
        })
      } catch (err) {
        console.error(err);
        setShowAlert(true);
      }

      setBusinessFormData({
        name: '',
        address: '',
        description: '',
        price: '',
        image: '',
        businessEmail: '',
        phoneNumber: ''
      });
      setTagInput('Tag Your Business Here');

      refreshPage();
    } else {
      setShowAlert(true)
    }
  };

  return (
    <>
    <h2 className='business-info-header'>Enter Your Business's Info Here</h2>
      <Container className='bi-background'>
        <div className='business-info-main'>
          <Form className='form-input-container' noValidate validated={validated} onSubmit={handleSubmit}>
            <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
              Something went wrong with your login credentials!
            </Alert>
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
                    placeholder='$Rate(specify per hour/ per job)'
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
              <Col xs={12} md={12}>
                <Form.Control
                    className='form-control-section'
                    name='businessEmail'
                    value={businessFormData.businessEmail}
                    onChange={handleInputChange}
                    type='text'
                    size='md'
                    placeholder='Business Email'
                />
              </Col>
            </Form.Row>
            <Form.Row>
              <Col xs={12} md={12}>
                <Form.Control
                    className='form-control-section'
                    name='phoneNumber'
                    value={businessFormData.phoneNumber}
                    onChange={handleInputChange}
                    type='text'
                    size='md'
                    placeholder='Business phone number'
                />
              </Col>
            </Form.Row>
            <Form.Row>
              <Col xs={12} md={12}>
                <DropdownButton size='lg' className='text-center' id="dropdown-basic-button" title={tagInput} value={tagInput} onSelect={(eventKey, event) => setTagInput(eventKey)}>
                  {tagLoading ? (<DropdownItem>loading...</DropdownItem>) : 
                    tagData.tags.map((tag)=> {
                      return (
                        <DropdownItem key={tag.name} eventKey={tag.name} value>{tag.name}</DropdownItem>
                      )
                    })}
                </DropdownButton>
              </Col>
            </Form.Row>
            <Form.Row>
              <Button className='bi-submit-btn' type='submit' variant='success' size='md'>Submit</Button>
            </Form.Row>
          </Form>
        </div>
      </Container>
    </>
  )
};

export default BusinessForm;