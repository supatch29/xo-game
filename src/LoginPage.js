import React from "react";
import { useNavigate } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import "./App.css";
import Button from "@mui/material/Button";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

function LoginPage() {
  // fetchUsers();
  const navigate = useNavigate();

  const handleClickGoPage = () => {
    navigate("/gamexo");
  };
  const handleSuccess = (response) => {
    console.log("เข้าสู่ระบบสำเร็จ:", response);
    handleClickGoPage()
  };

  const handleFailure = (error) => {
    console.log("เข้าสู่ระบบล้มเหลว:", error);
  };

  return (
    <div className="card-login">
      <div className="w3-card-4 card">
        <img
          src={`${process.env.PUBLIC_URL}/user-groups.png`}
          alt="User Avatar"
          style={{ width: "25%" }}
        />
        <p>
          Login Game{" "}
          <img
            src={`${process.env.PUBLIC_URL}/kiss-hug.png`}
            alt="User Avatar"
            style={{ width: "10%" }}
          />
        </p>
        {/* <div className="padding-card">
          <p className="w3-left-align">
            <b>UserName</b>
          </p>
          <div className="input-container">
            <i className="fa fa-user icon"></i>
            <input
              className="w3-input w3-border"
              placeholder="UserName"
              name="first"
              type="text"
            />
          </div>
          <p className="w3-left-align">
            <b>Password</b>
          </p>
          <div className="input-container">
            <i className="fa fa-key icon"></i>
            <input
              className="w3-input w3-border"
              placeholder="Password"
              name="first"
              type="password"
            />
          </div> */}

          <div >
            {/* <Button
              variant="contained"
              onClick={handleClickGoPage}
              color="success"
            >
              Login <CiLogin />
            </Button> */}

            <GoogleOAuthProvider clientId="3220886578-igblbs92u9tukusb9fh1njq3idq66aa0.apps.googleusercontent.com">
              <div>
                <GoogleLogin
                  onSuccess={handleSuccess}
                  onError={handleFailure}
                />
              </div>
            </GoogleOAuthProvider>
          </div>
        {/* </div> */}
      </div>
    </div>
  );
}

export default LoginPage;
