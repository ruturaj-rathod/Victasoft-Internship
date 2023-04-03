import axios from "axios";
import React, { useEffect, useState } from "react";

const UserOrders = ({ match }) => {
  const [orderData, setOrderData] = useState({});

  useEffect(() => {
    const path = window.location.pathname.split("/");
    const email = path[path.length - 1];
    axios
      .get(`/api/order/${email}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.orders) {
          setOrderData(res.data.orders);
        }
      });
  }, []);
  return (
    <div>
      <div className="text-center fs-4 mb-4 p-2 bg-success text-white">
        Users order details
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Food Name</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Options</th>
          </tr>
        </thead>
        <tbody>
          {orderData.order_details?.map((orders) =>
            orders?.map((item, index) => {
              if (item.Order_date) {
                return "";
              }
              return (
                <tr key={index}>
                  <th>{orders[0].Order_date}</th>
                  <th>{item.name}</th>
                  <th>{item.price}</th>
                  <th>{item.quantity}</th>
                  <th>{item.size}</th>
                </tr>
              );
            })
          )}
          {/* {users?.map((user, index) => {
                        return (
                            
                        );
                    })} */}
        </tbody>
      </table>
    </div>
  );
};

export default UserOrders;
