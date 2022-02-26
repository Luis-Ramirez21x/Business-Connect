import React, { useState } from "react";
import { useParams } from "react-router-dom"; 
import Profile from "../../components/Profile";
import { useMutation, useQuery } from "@apollo/client";
import { SINGLE_USER } from "../../utils/queries";

function UserProfile() {
  const { id } = useParams()
  const {loading, data} = useQuery(SINGLE_USER, {variables: { _id: id} });

  return (
    <>
      {loading? 
        <li>loading...</li>
      : 
        <>
          <Profile data={data.singleUser} loading={loading}/>
          {/* <Connect /> */}
        </>
      }
    </>
  );
};

export default UserProfile;