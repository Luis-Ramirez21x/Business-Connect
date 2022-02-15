import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import {useMutation} from '@apollo/client';
import { Jumbotron, Container, Col, Form, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { ALL_TAGS, MY_BUSINESS, TAGGED } from '../../utils/queries'
import { CREATE_BUSINESS } from '../../utils/mutations';
import BusinessForm from '../../components/BusinessForm';
import Auth from '../../utils/auth';
import "./index.css"

function UpdateBusines() {
    const { id } = useParams()
    const {loading: businessLoading, data: businessData} = useQuery(MY_BUSINESS)
    const {data:taggedData} = useQuery(TAGGED, {variables: { _id: id } })

    const [businessFormData, setBusinessFormData] = useState(
        { name: '', address: '', description: '', 
        price: '', image: '' }
    )

    const [createBusiness, { error }] = useMutation(CREATE_BUSINESS)
    const [tagInput, setTagInput] = useState('Tag Your Business Here')

    console.log(businessData)

    useEffect(() => {
        setBusinessFormData({
            name: businessData?.user.myBusiness[0].name,
            address: businessData?.user.myBusiness[0].address,
            description: businessData?.user.myBusiness[0].description,
            price: businessData?.user.myBusiness[0].price,
            image: businessData?.user.myBusiness[0].image
        })
        setTagInput(taggedData?.tagged.name)
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