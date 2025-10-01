import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Profile</h1>
      {user ? (
        <p>Welcome, {user.name}</p>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
}

export default Profile;
