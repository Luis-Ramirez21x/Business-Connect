import React, { useState } from "react";
import { Card, CardImg } from "react-bootstrap";
import { Link } from 'react-router-dom';


const BusinessList = ({business}) => {
  return (
    <>
      <Card key={business._id}>
        <CardImg width="100%" src={business.image} alt="Business Image" />
        <Card.Body>
          <Card.Link as={Link} to={`/businesses/${business._id}`}>{business.name}</Card.Link>
        </Card.Body>
      </Card>
      
    </>
  )
};

export {BusinessList};