import axios from "axios";
import React from "react";

export default function FoodCard(props) {
  let options = props.options;
  let priceOptions = Object.keys(options);

  const onDeleteHandler = (id) => {
    axios
      .delete(`http://localhost:8080/api/food/${id}`, { withCredentials: true })
      .then((res) => {
        console.log(res.data.success);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="card mt-3" style={{ width: "18rem" }}>
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
        <div className="w-100">
          <select className="mt-1 h-100 bg-success">
            {priceOptions.map((data) => {
              return (
                <option key={data} value={data}>
                  {`${data} : ${options[data]}`}
                </option>
              );
            })}
          </select>
        </div>
        <hr />
        <div className="container">
          {/* <div
            className="btn mx-2 bg-success"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Edit
          </div> */}
          <div
            className="btn mx-2 bg-danger"
            onClick={() => onDeleteHandler(props.foodItem._id)}
          >
            Delete
          </div>
        </div>
      </div>

      {/* Edit popup       */}
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Item
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">

            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
