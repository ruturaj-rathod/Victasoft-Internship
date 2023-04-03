import React from "react";
import { Link } from "react-router-dom";

export default function AdminNavbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-success">
        <div className="container-fluid">
          <a className="navbar-brand fs-3 text-white" href="/admin">
            Admin GoFood
          </a>
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
          <div className="collapse d-flex justify-content-center  navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link text-white active" aria-current="page" to="/admin/users">
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/admin/food-items">
                  Food Items
                </Link>
              </li>
            </ul>
          </div>
          <div className="mx-auto px-3 w-auto">Login</div>
        </div>
      </nav>
    </div>
  );
}
