import React, { useState } from "react";
import { Card, CardImg } from "react-bootstrap";
import { Link } from 'react-router-dom';

const BusinessList = ({business}) => {
  return (
    <>
      {/* <Card key={business.id}>
        <CardImg width="100%" src={business.image} alt="Business Image" />
        <Card.Body>
          <Card.Link as={Link} to="singleBusiness" params={{id:business.id}}>{business.name}</Card.Link>
          <Card.Text>{business.description}</Card.Text>
        </Card.Body>
      </Card> */}
      <li>{business.name}</li>
    </>
  )
};

export {BusinessList};