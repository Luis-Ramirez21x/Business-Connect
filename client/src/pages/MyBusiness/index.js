import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {useMutation} from '@apollo/client';
import { Jumbotron, Container, Col, Form, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { ALL_TAGS, MY_BUSINESS } from '../../utils/queries'
import { CREATE_BUSINESS } from '../../utils/mutations';
import BusinessForm from '../../components/BusinessForm';
import Auth from '../../utils/auth';
import "./index.css"

function MyBusiness() {
  const {data: businessData} = useQuery(MY_BUSINESS)

  const [tagInput, setTagInput] = useState('Tag Your Business Here')
  const [businessFormData, setBusinessFormData] = useState(
    { name: '', address: '', description: '', 
    price: '', image: '',  businessEmail: '', phoneNumber: '' }
  )
  
  const [businessMutation, { error }] = useMutation(CREATE_BUSINESS)

  return (
    <>
      {businessData?.user?.myBusiness.length? (<Redirect to={`/businesses/${businessData?.user?.myBusiness[0]._id}`} />) : 
      (
        <BusinessForm 
      businessFormData={businessFormData}
      setBusinessFormData={setBusinessFormData}
      businessMutation={businessMutation}
      tagInput={tagInput} 
      setTagInput={setTagInput} 
      ></BusinessForm>
      )}
    </>
  )
};

export default MyBusiness;