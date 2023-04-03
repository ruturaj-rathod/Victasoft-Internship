import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      body: JSON.stringify(loginData)
    });

    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert(json.message);
    } else {
      localStorage.setItem('auth_token', json.auth_token);
      localStorage.setItem('userEmail', json.email);
      console.log(localStorage.getItem('auth_token'));
      navigate('/');
    }
  };

  const onChangeHandler = (e) => {
    setLoginData({
      ...loginData, [e.target.name]: e.target.value
    });
  }

  return (
    <>
      <div className="container">
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
