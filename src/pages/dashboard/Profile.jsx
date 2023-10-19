import React from "react";
import auth from "../../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";

function Profile() {
  document.title = "Profile || Laws of Bangladesh";
  const [user, loading] = useAuthState(auth);
  return <div>{user?.email}</div>;
}

export default Profile;
