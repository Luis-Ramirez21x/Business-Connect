import React from "react";
import { Card, CardImg } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";


import { SINGLE_BUSINESS } from "../../utils/queries";

const SingleBusiness = () => {
  const { id } = useParams()
  const {loading, data} = useQuery(SINGLE_BUSINESS, { variables: {_id: id} })
  
  return (
    <>
      {loading? (
        <h2>Loading...</h2>
      ) : (
        <>
          <Card key={data.singleBusiness._id}>
            <CardImg width="100%" src={data.singleBusiness.image} alt="Business Image" />
            <Card.Body>
              <Card.Text>{data.singleBusiness.name}</Card.Text>
              <Card.Text>{data.singleBusiness.description}</Card.Text>
              <Card.Text>{data.singleBusiness._id}</Card.Text>
            </Card.Body>
          </Card>
        </>
      )}
    </>
  )
};

export default SingleBusiness