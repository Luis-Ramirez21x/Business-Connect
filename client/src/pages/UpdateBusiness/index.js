import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import {useMutation} from '@apollo/client';
import { Jumbotron, Container, Col, Form, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { ALL_TAGS, MY_BUSINESS, TAGGED } from '../../utils/queries'
import { UPDATE_BUSINESS } from '../../utils/mutations';
import BusinessForm from '../../components/BusinessForm';
import Auth from '../../utils/auth';
import "./index.css"


function UpdateBusines() {
    const { id } = useParams()
    const {data:taggedData} = useQuery(TAGGED, {variables: { _id: id } })
    const {loading: businessLoading, data: businessData} = useQuery(MY_BUSINESS)
    

    const [businessFormData, setBusinessFormData] = useState(
        { name: '', address: '', description: '', 
        price: '', image: '', _id:'',businessEmail: '', phoneNumber: ''  }
    )

    const [businessMutation, { error }] = useMutation(UPDATE_BUSINESS);
    const [tagInput, setTagInput] = useState('Tag Your Business Here');

    console.log(businessData)

    useEffect(() => {
        setBusinessFormData({
            name: businessData?.user.myBusiness[0].name,
            address: businessData?.user.myBusiness[0].address,
            description: businessData?.user.myBusiness[0].description,
            price: businessData?.user.myBusiness[0].price,
            image: businessData?.user.myBusiness[0].image,
            _id: id,
            businessEmail: businessData?.user.myBusiness[0].businessEmail,
            phoneNumber: businessData?.user.myBusiness[0].phoneNumber
        })
        setTagInput(taggedData?.tagged.name)
    }, [businessData,taggedData])
        
    return (
        <BusinessForm 
          businessFormData={businessFormData}
          setBusinessFormData={setBusinessFormData}
          businessMutation={businessMutation}
          tagInput={tagInput} 
          setTagInput={setTagInput} 
        ></BusinessForm>
    )
};

export default UpdateBusines;