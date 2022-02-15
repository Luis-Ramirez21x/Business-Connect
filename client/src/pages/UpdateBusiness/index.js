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

function UpdateBusines() {
    const {loading: businessLoading, data: businessData} = useQuery(MY_BUSINESS)

    const [businessFormData, setBusinessFormData] = useState(
        { name: '', address: '', description: '', 
        price: '', image: '' }
    )

      if (businessFormData) {
        setBusinessFormData({
            name: businessData.user.name,
            address: businessData.user.address,
            description: businessData.user.description,
            price: businessData.user.price,
            image: businessData.user.price
        })
      }

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
      <BusinessForm businessFormData={businessFormData} businessData={businessData} handleSubmit={handleSubmit}></BusinessForm>
    )
};

export default UpdateBusines;