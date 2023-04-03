import React from 'react';
// import Cookies from 'js-cookie';
import swal from 'sweetalert';
import Cookies from 'js-cookie';
import { Button, TextField, Link } from '@material-ui/core';
const axios = require('axios');
// const bcrypt = require('bcryptjs');
// var salt = bcrypt.genSaltSync(10);

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }


  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  login = () => {
    // const pwd = bcrypt.hashSync(this.state.password, salt);

    axios.post('/api/auth/login', {
      username: this.state.username,
      password: this.state.password,
    }, {withCredentials: true}).then((res) => {
      // console.log(res.data);
      Cookies.set('id', res.data.details._id);
      swal({
        text: res.data.title,
        icon: "success",
        type: "success",
      });
      if(res.data.isAdmin) {
        this.props.history.push('/dashboard');
      } else {
        this.props.history.push('/profile');
      }
    }).catch((err) => {
      if (err.response && err.response.data && err.response.data.errorMessage) {
        swal({
          text: "Somthing Went wrong",
          icon: "error",
          type: "error"
        });
      }
    });
  }

  render() {
    return (
      <div style={{ marginTop: '200px' }}>
        <div>
          <h2>Login</h2>
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
          <br /><br />
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
          <br /><br />
          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
            disabled={this.state.username === '' && this.state.password === ''}
            onClick={this.login}
          >
            Login
          </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link href="/register">
            Register
          </Link>
        </div>
      </div>
    );
  }
}
