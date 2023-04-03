import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
      e.preventDefault();
    const response = await fetch("/api/user/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData)
    });

    const json = await response.json();
    console.log(json);
    if(!json.success) {
        console.log(json.errors);
    } else {
        navigate("/login")
    }
  };

  const onChangeHandler = (e) => {
      setSignupData({
          ...signupData, [e.target.name]: e.target.value
      });
  }

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={signupData.name}
              onChange={onChangeHandler}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={signupData.email}
              onChange={onChangeHandler}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
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
              value={signupData.password}
              onChange={onChangeHandler}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="location"
              value={signupData.location}
              onChange={onChangeHandler}
            />
          </div>
          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-secondary">
            Login
          </Link>
        </form>
      </div>
    </>
  );
}
