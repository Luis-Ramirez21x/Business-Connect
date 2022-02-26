import React from "react";
import { Card, CardImg } from "react-bootstrap";

function Profile({ loading, data}) {
  
  return(
    <>
      {loading?(
        <h2>loading...</h2>
      ):(
        <Card>
          <CardImg className="card-img" width="100%" src={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="Profile Picture"/>
          <Card.Text>{data.username}</Card.Text>
          <Card.Text>{data.email}</Card.Text>
          <Card.Text>{data._id}</Card.Text>
        </Card>
      )
      }
    </>
  )
};

export default Profile;