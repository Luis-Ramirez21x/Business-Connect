import React, { useState, useEffect } from "react";
import { Container, Card, CardImg, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import Auth from "../../utils/auth";
import { MY_PROFILE } from "../../utils/queries";

import "./index.css"

const MyProfile = () =>{
    const {loading, data} = useQuery(MY_PROFILE);
    console.log(data);

    return(
    <>
        {loading?(
            <h2>loading...</h2>
        ):(
        <Card>
            <CardImg className="card-img" width="100%" src={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="Profile Picture"/>
            <Card.Text>{data.user.username}</Card.Text>
            <Card.Text>{data.user.email}</Card.Text>
            <Card.Text>{data.user._id}</Card.Text>
        </Card>
        )
        }
    </>
)
};

export default MyProfile;