import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {useMutation} from '@apollo/client';
import { MY_BUSINESS } from '../../utils/queries'
import { CREATE_BUSINESS } from '../../utils/mutations';
import BusinessForm from '../../components/BusinessForm';
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