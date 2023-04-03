import React, { useContext, useEffect, useRef, useState } from "react";
import { cartContext } from "./ContextReducer";

export default function Card(props) {
  let {cart, dispatch} = useContext(cartContext);
//   let data = useCart();
  let options = props.options;
  let priceOptions = Object.keys(options);

  let priceRef = useRef();

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");

  const addToCartHandler = async () => {

    let food = [];
    for(const item of cart) {
        if(item.id === props.foodItem._id) {
            food = item;

            break;
        }
    }
    if (food !== []) {
        if (food.size === size) {
          await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, quantity })
          return
        }
    }
    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      quantity,
      size: size,
      img: props.foodItem.img
    });
    console.log(cart);
};

useEffect(() => {
    setSize(priceRef.current.value)
}, []);
const finalPrice = quantity * parseInt(options[size]);
console.log()
  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: "18rem"}}
        >
          <img
            src={props.foodItem.img}
            style={{ filter: "brightness(30%)", objectFit: "cover" }}
            height="200px"
            width="100%"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            <div className="container w-100">
              <select className="m-2 h-100 bg-success" onChange={(e) => setQuantity(e.target.value)}>
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              <select
                className="m-2 h-100 bg-success"
                onChange={(e) => setSize(e.target.value)}
                ref={priceRef}
              >
                {priceOptions.map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>
              <div className="d-inline fs-5">Rs. {finalPrice}/-</div>
            </div>
            <hr />
            <button
              className="btn btn-success justify-center ms-2"
              onClick={addToCartHandler}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
