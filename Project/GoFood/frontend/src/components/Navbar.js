import React, { useContext, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { cartContext } from "./ContextReducer";

export default function Navbar() {
  const navigate = useNavigate();
  
  let {cart} = useContext(cartContext);

  const [cartView, setCartView] = useState(false);

  const onLogoutHandler = () => {
    localStorage.removeItem("auth_token");
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1" to="/">
            GoFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link
                  
                  className="nav-link fs-5"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("auth_token") ? (
                <li className="nav-item">
                  <Link className="nav-link fs-5" aria-current="page" to="/myorders">
                    My orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
            {!localStorage.getItem("auth_token") ? (
              <div className="d-flex">
                <Link className="btn bg-white text-success mx-1" to="/login">
                  Login
                </Link>
                <Link className="btn bg-white text-success mx-1" to="/signup">
                  Signup
                </Link>
              </div>
            ) : (
              <div className="d-flex">
                <div
                  className="btn bg-white text-success mx-2"
                  onClick={() => setCartView(true)}
                >
                  My Cart &nbsp;
                  <Badge pill bg="danger">
                    {cart.length === 0 ? "" : cart.length}
                  </Badge>
                </div>
                {cartView ? (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart />
                  </Modal>
                ) : null}
                <div
                  className="btn bg-white text-success mx-2"
                  onClick={onLogoutHandler}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
