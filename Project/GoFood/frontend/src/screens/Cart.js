import React, { useContext } from "react";
import { cartContext } from "../components/ContextReducer";

export default function Cart() {
  const { cart, dispatch } = useContext(cartContext);

  if (cart.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3">The cart is empty</div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    // console.log(data,localStorage.getItem("userEmail"),new Date())
    let response = await fetch("/api/order/new", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: cart,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });
    console.log("JSON RESPONSE:::::", response.status);
    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };

  let totalPrice = cart.reduce((total, food) => total + food.price, 0);
  return (
    <div>
      <div className="container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md">
        <table className="table table-hover ">
          <thead className=" text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((food, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{food.name}</td>
                  <td>{food.quantity}</td>
                  <td>{food.size}</td>
                  <td>{food.price}</td>
                  <td>
                    <button
                      type="button"
                      className="btn p-1 bg-success text-white"
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                    >
                      remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2">Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <button className="btn bg-success mt-5 " onClick={handleCheckOut}>
            {" "}
            Check Out{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
