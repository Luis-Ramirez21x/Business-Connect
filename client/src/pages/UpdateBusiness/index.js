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
// import "./index.css"

function UpdateBusines() {
    const {loading: businessLoading, data: businessData} = useQuery(MY_BUSINESS)

    const [businessFormData, setBusinessFormData] = useState(
        { name: '', address: '', description: '', 
        price: '', image: '' }
    )

    const [createBusiness, { error }] = useMutation(CREATE_BUSINESS)
    const [tagInput, setTagInput] = useState('Tag Your Business Here')

    useEffect(() => {
        setBusinessFormData({
            name: businessData.user.name,
            address: businessData.user.address,
            description: businessData.user.description,
            price: businessData.user.price,
            image: businessData.user.price
        })
    }, [businessData])
        

    return (
        <BusinessForm 
          businessFormData={businessFormData}
          setBusinessFormData={setBusinessFormData}
          createBusiness={createBusiness}
          tagInput={tagInput} 
          setTagInput={setTagInput} 
        ></BusinessForm>
      )
};

export default UpdateBusines;