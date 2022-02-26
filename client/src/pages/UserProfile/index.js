import React from "react";
import Profile from "../../components/Profile";
import { useMutation, useQuery } from "@apollo/client";
import { SINGLE_USER } from "../../utils/queries";

function UserProfile() {
  const {loading, data} = useQuery(SINGLE_USER);
  console.log(data)

  return (
    <Profile data={data} loading={loading}/>
  );
};

export default UserProfile;