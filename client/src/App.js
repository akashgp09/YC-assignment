import "./App.css";
import Editor from "./components/editor";
import DisplayContact from "./components/displayContact";
import { GoogleLoginButton } from "react-social-login-buttons";
import { useState, useEffect } from "react";
function App() {
  const [contacts, setContacts] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    authenticate();
  }, []);
  const renderMyData = async (userId) => {
    try {
      const allContacts = await fetch(
        process.env.NODE_ENV === "production"
          ? `${process.env.REACT_APP_WEBSITE_URL}/contact/contacts`
          : "http://localhost:5000/contact/contacts",
        {
          method: "POST",
          headers: {
            Accept: "application/json",

            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            owner: userId,
          }),
        }
      );

      let contactsJsonResponse = await allContacts.json();
      setContacts(contactsJsonResponse);
    } catch (err) {
      console.log(err);
    }
  };
  const authenticate = async () => {
    try {
      const res = await fetch(
        process.env.NODE_ENV === "production"
          ? `${process.env.REACT_APP_WEBSITE_URL}/auth/login/success`
          : "http://localhost:5000/auth/login/success",
        {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        }
      );
      const jsonResponse = await res.json();
      setAuthenticated(true);
      setUser(jsonResponse.user);
      renderMyData(jsonResponse.user.googleId);
    } catch (error) {
      setAuthenticated(false);
      console.log("Failed to Authenticate");
    }
  };
  const handleLogoutClick = () => {
    // Logout using Google passport api
    // Set authenticated state to false in the HomePage component
    window.open(
      process.env.NODE_ENV === "production"
        ? `/auth/logout`
        : "http://localhost:5000/auth/logout",
      "_self"
    );
    setAuthenticated(false);
  };

  const handleSignInClick = () => {
    // Authenticate using via passport api in the backend
    // Open Google login page
    window.open(
      process.env.NODE_ENV === "production"
        ? `/auth/google`
        : "http://localhost:5000/auth/google",
      "_self"
    );
  };

  return (
    <>
      {authenticated ? (
        <>
          <div className="d-flex justify-content-center mt-3">
            <h3> {user.username} Contact List</h3>
            <button
              className="ml-5 btn btn-primary"
              onClick={handleLogoutClick}
            >
              Logout
            </button>
          </div>

          <Editor renderMyData={renderMyData} owner={user.googleId} />

          <DisplayContact
            contacts={contacts}
            renderMyData={renderMyData}
            owner={user.googleId}
          />
        </>
      ) : (
        <>
          <GoogleLoginButton
            onClick={handleSignInClick}
            className="w-25"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </>
      )}
    </>
  );
}

export default App;
