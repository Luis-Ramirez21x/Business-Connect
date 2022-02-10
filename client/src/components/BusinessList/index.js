import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from 'react-router-dom';

const BusinessList = (props) => {
  return (
    <>
      <h2>Search Results</h2>  
      {props.map((business) => {
        <Card key={busines.id}>
          <CardImg top width="100%" src={business.image} alt="Business Image" />
          <CardBody>
            <CardLink as={Link} to="singleBusiness" params={{id:business.id}}>{business.name}</CardLink>
            <CardText>{business.description}</CardText>
          </CardBody>
        </Card> 
      })}
    </>
  );
};

export default BusinessList