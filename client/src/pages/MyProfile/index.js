import React, { useState, useEffect } from "react";
import { Container, Card, CardImg, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import Auth from "../../utils/auth";
import { MY_PROFILE } from "../../utils/queries";
import Profile from "../../components/Profile";
import Connect from "../Connect";

import "./index.css"

const MyProfile = () =>{
  const {loading, data} = useQuery(MY_PROFILE);

  return (
    <>
      {loading? 
        <li>loading...</li>
      : 
        <>
          <Profile data={data.user} loading={loading}/>
          <Connect />
        </>
      }
    </>
  );
};

export default MyProfile;