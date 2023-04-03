import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/api/user/all", {
        withCredentials: true,
      })
      .then((res) => {
        //  console.log(res.data.users);
        setUsers([...res.data.users]);
        //  console.log("Users " + users[0].name);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  const onDeleteHandler = (id) => {
    axios
      .delete(`/api/user/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          setUsers((current) => current.filter((user) => user._id !== id));
        }
        console.log(res.data.success);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onUpdateHandler = (id, userRole) => {
    if (!window.confirm("Confirm to change role")) {
      return;
    }
    let role = userRole || "user";
    if (role === "user") {
      role = "admin";
    } else {
      role = "user";
    }
    axios
      .put(
        `/api/user/${id}`,
        { role: role },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        window.location.reload(false);
        console.log(res.data.success);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="text-center fs-4 mb-4 p-2 bg-success text-white">
        Users details
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">email</th>
            <th scope="col">Address</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <th>{user.name}</th>
                <th>{user.email}</th>
                <th>{user.location}</th>
                <th>{user?.role || "Null"}</th>
                <th>
                  <div
                    className="btn bg-success mx-2"
                    onClick={() => onUpdateHandler(user._id, user.role)}
                  >
                    Change Role
                  </div>
                  <div
                    className="btn bg-danger mx-2"
                    onClick={() => onDeleteHandler(user._id)}
                  >
                    Delete
                  </div>
                  <Link className="btn btn-success mx-2" to={`/admin/user/orders/${user.email}`} >
                    Check Orders
                  </Link>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
