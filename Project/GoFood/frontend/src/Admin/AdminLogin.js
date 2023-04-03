import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function AdminLogin() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios.post('/api/user/login', loginData, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    })
    .then((response) => {
        localStorage.setItem('auth_token', response.auth_token);
        localStorage.setItem('userEmail', response.email);
        console.log(localStorage.getItem('auth_token'));
        navigate('/admin');
    }).catch((error) => {
        console.log(`Error: ${error.message}`);
    })
    // const response = await fetch("http://localhost:8080/api/user/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   withCredentials: true,
    //   body: JSON.stringify(loginData)
    // });

    // const json = await response.json();
    // console.log(json);
    // if (!json.success) {
    //   alert(json.message);
    // } else {
    //   localStorage.setItem('auth_token', json.auth_token);
    //   localStorage.setItem('userEmail', json.email);
    //   console.log(localStorage.getItem('auth_token'));
    //   navigate('/');
    // }
  };

  const onChangeHandler = (e) => {
    setLoginData({
      ...loginData, [e.target.name]: e.target.value
    });
  }

  

  return (
    <>
      <div className="container">
          <div className="w-50 mx-auto h4">Admin Panel Login</div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              name="email"
              value={loginData.email}
              onChange={onChangeHandler}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={loginData.password}
              onChange={onChangeHandler}
            />
          </div>
          <button type="submit" className="m-3 btn btn-success">
            Login
          </button>
          <Link to="/Signup" className="m-3 btn btn-secondary">
            Signup
          </Link>
        </form>
      </div>
    </>
  );
}
