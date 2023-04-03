import React, { Component } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  LinearProgress,
  DialogTitle,
  DialogContent,
  TableBody,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Typography,
} from "@material-ui/core";
// import { Pagination } from '@material-ui/lab';
import swal from "sweetalert";
import Cookies from "js-cookie";
const axios = require("axios");

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      token: "",
      openProductEditModal: false,
      openErrorModal: false,
      id: "",
      name: "",
      email: "",
      country: "",
      city: "",
      password: "",
      user: [],
      loading: false,
    };
  }

  componentDidMount = () => {
    let id = Cookies.get("id");
    if (!id) {
      this.props.history.push("/");
    } else {
      this.setState({ id: id }, () => {
        this.getProduct();
      });
    }
  };

  getProduct = () => {
    this.setState({ loading: true });

    console.log("Cookie " + Cookies.get("access_token"));

    const uri = `/api/users/${this.state.id}`;
    axios
      .get(uri)
      .then((res) => {
        this.setState({ loading: false, user: res.data });
      })
      .catch((err) => {
        swal({
          text: err.res?.data.errorMessage,
          icon: "error",
          type: "error",
        });
        this.setState({ loading: false, user: [] }, () => {});
      });
  };

  deleteUser = (id) => {
    axios
      .delete(`/api/users/${id}`)
      .then((res) => {
        swal({
          text: res.data.title,
          icon: "success",
          type: "success",
        });

        this.logOut();
      })
      .catch((err) => {
        swal({
          text: err.res?.data.errorMessage,
          icon: "error",
          type: "error",
        });
      });
  };

  logOut = () => {
    axios.post(`/api/auth/logout`).then((res) => {
      Cookies.remove('id');
      swal({
        text: res.data.title,
        icon: "success",
        type: "success",
      });

      this.setState({ page: 1 }, () => {
        this.pageChange(null, 1);
      });
    })
    .catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error",
      });
    });
    this.props.history.push("/");
  };

  onChange = (e) => {
    if (e.target.files && e.target.files[0] && e.target.files[0].name) {
      this.setState({ fileName: e.target.files[0].name }, () => {});
    }
    this.setState({ [e.target.name]: e.target.value }, () => {});
    if (e.target.name === "search") {
      this.setState({ page: 1 }, () => {
        this.getProduct();
      });
    }
  };

  validate = (email, password) => {
    if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) ||
      (password !== "" &&
        !/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/.test(
          password
        ))
    ) {
    } else {
      return true;
    }
    this.handleErrorOpen();
    return false;
  };

  updateUser = () => {
    let editUser = {
      username: this.state.name,
      email: this.state.email,
      country: this.state.country,
      city: this.state.city,
    };
    if (!this.validate(editUser.email, this.state.password)) {
      return;
    }
    this.state.password !== ""
      ? (editUser.password = this.state.password)
      : console.log(this.state.password);
    console.log(this.state.password);

    axios
      .put(`/api/users/${this.state.id}`, editUser)
      .then((res) => {
        swal({
          text: res.data.title,
          icon: "success",
          type: "success",
        });

        this.handleProductEditClose();
        this.setState(
          { name: "", email: "", country: "", city: "", password: "" },
          () => {
            this.getProduct();
          }
        );
      })
      .catch((err) => {
        swal({
          text: err.response.data.errorMessage,
          icon: "error",
          type: "error",
        });
        this.handleProductEditClose();
      });
  };

  handleProductEditOpen = (data) => {
    this.setState({
      openProductEditModal: true,
      id: data._id,
      name: data.username,
      email: data.email,
      country: data.country,
      city: data.city,
      isAdmin: data.isAdmin,
    });
  };

  handleProductEditClose = () => {
    this.setState({ openProductEditModal: false });
  };

  handleErrorOpen = () => {
    this.setState({
      openErrorModal: true,
    });
  };

  handleErrorClose = () => {
    this.setState({ openErrorModal: false });
  };

  render() {
    return (
      <div>
        {this.state.loading && <LinearProgress size={40} />}
        <div>
          <h2>Profile</h2>
          <Button
            className="button_style"
            variant="contained"
            size="small"
            onClick={this.logOut}
          >
            Log Out
          </Button>
        </div>

        {/* Edit User */}
        <Dialog
          open={this.state.openProductEditModal}
          onClose={this.handleProductClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Edit User</DialogTitle>
          <DialogContent>
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              placeholder="User Name"
              required
            />
            <br />
            <TextField
              id="standard-basic"
              type="email"
              autoComplete="off"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              placeholder="Email"
              required
            />
            <br />
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="country"
              value={this.state.country}
              onChange={this.onChange}
              placeholder="Country"
              required
            />
            <br />
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="city"
              value={this.state.city}
              onChange={this.onChange}
              placeholder="City"
              required
            />
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
            <br />
            <br />
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleProductEditClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={(e) => this.updateUser()}
              color="primary"
              autoFocus
            >
              Edit User
            </Button>
          </DialogActions>
        </Dialog>

        {/* validation popup box */}
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
        <br />

        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">email</TableCell>
                <TableCell align="center">country</TableCell>
                <TableCell align="center">city</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center" component="th" scope="row">
                  {this.state.user.username}
                </TableCell>
                <TableCell align="center">{this.state.user.email}</TableCell>
                <TableCell align="center">{this.state.user.country}</TableCell>
                <TableCell align="center">{this.state.user.city}</TableCell>
                <TableCell align="center">
                  <Button
                    className="button_style"
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={(e) => this.handleProductEditOpen(this.state.user)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="button_style"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    onClick={(e) => this.deleteUser(this.state.user._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <br />
        </TableContainer>
      </div>
    );
  }
}
