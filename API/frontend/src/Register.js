import React from "react";
import swal from "sweetalert";
import { Button, TextField, Link, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from "@material-ui/core";
const axios = require("axios");

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      country: "",
      city: "",
      password: "",
      openErrorModal: false
    };
  }

  validate = (email, password) => {
    if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) ||
      (password !== "" &&
        !/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/i.test(password)
      )
    ) {
    } else {
      return true;
    }
    this.handleErrorOpen();
    return false;
  };

  handleErrorOpen = () => {
    this.setState({
      openErrorModal: true,
    });
  };

  handleErrorClose = () => {
    this.setState({ openErrorModal: false });
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  register = () => {
    if(!this.validate(this.state.email, this.state.password)) {
      return;
    }
    axios
      .post("/api/auth/register", {
        username: this.state.username,
        email: this.state.email,
        country: this.state.country,
        city: this.state.city,
        password: this.state.password,
      })
      .then((res) => {
        swal({
          text: res.data.title,
          icon: "success",
          type: "success",
        });
        this.props.history.push("/");
      })
      .catch((err) => {
        swal({
          text: err.response.data.errorMessage,
          icon: "error",
          type: "error",
        });
      });
  };

  render() {
    return (
      <>
        <div style={{ marginTop: "200px" }}>
          <div>
            <h2>Register</h2>
          </div>
          <div>
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="username"
              value={this.state.username}
              onChange={this.onChange}
              placeholder="User Name"
              required
            />
            <br />
            <br />
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              placeholder="Email address"
              required
            />
            <br />
            <br />
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="country"
              value={this.state.country}
              onChange={this.onChange}
              placeholder="Country Name"
              required
            />
            <br />
            <br />
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="city"
              value={this.state.city}
              onChange={this.onChange}
              placeholder="city Name"
              required
            />
            <br />
            <br />
            <TextField
              id="standard-basic"
              type="password"
              autoComplete="off"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
              placeholder="Password"
              required
            />
            {/* <br /><br />
          <TextField
            id="standard-basic"
            type="password"
            autoComplete="off"
            name="confirm_password"
            value={this.state.confirm_password}
            onChange={this.onChange}
            placeholder="Confirm Password"
            required
          /> */}
            <br />
            <br />
            <Button
              className="button_style"
              variant="contained"
              color="primary"
              size="small"
              disabled={
                this.state.username === "" && this.state.password === ""
              }
              onClick={this.register}
            >
              Register
            </Button>{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link href="/">Login</Link>
          </div>
        </div>
        <Dialog
          open={this.state.openErrorModal}
          onClose={this.handleErrorClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Check All Field</DialogTitle>
          <DialogContent>
            <Typography sx={{ mt: 4, mb: 2 }} variant="body1" component="div">
              Check Email is valid or not{" "}
              <Typography color="primary" variant="caption" component="span">
                (eg: abc@gmail.com)
              </Typography>
            </Typography>
            <Typography sx={{ mt: 4, mb: 2 }} variant="body1" component="div">
              Password have atleast 6 character, one digit and one special
              character{" "}
              <Typography color="primary" variant="caption" component="span">
                (eg: abc@12)
              </Typography>
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleErrorClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}
