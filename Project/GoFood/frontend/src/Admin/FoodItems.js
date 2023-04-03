import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FoodCard from "./FoodCard";

export default function FoodItems() {
  const [foodItems, setFoodItems] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);

  //For category
  const [open, setOpen] = useState(false);
  const [newCategeory, setNewCategory] = useState("");

  useEffect(() => {
    axios
      .get("/api/food/")
      .then((res) => {
        setFoodItems([...res.data.food_items[0]]);
        setFoodCategory([...res.data.food_items[1]]);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const handleAddCategory = () => {
    setOpen(true);
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    axios.post("/api/food/category/new", {"CategoryName": newCategeory}, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      if(res.data.success) {
        alert("New category Added");
      }
    })
    setOpen(false);
  }

  return (
    <div>
      <div className="h3 text-center mb-5">Food Items</div>
      <div className="container">
        <Link className="btn btn-success mx-2" to="/admin/food-item/new">
          Add Food Item
        </Link>
        <button className="btn btn-success" onClick={handleAddCategory}>
          Add Category
        </button>
      </div>
      <div className="m-3 container">
        {foodCategory !== []
          ? foodCategory.map((data) => {
              return (
                <div key={data._id} className="row mb-3">
                  <div className="fs-3 m-3">{data.CategoryName}</div>
                  <hr />
                  {foodItems !== [] ? (
                    foodItems
                      .filter((item) => item.CategoryName === data.CategoryName)
                      .map((filterItem) => {
                        return (
                          <div
                            className="col-12 col-md-6 col-lg-3 m-3"
                            key={filterItem._id}
                          >
                            <FoodCard
                              foodItem={filterItem}
                              options={filterItem.options[0]}
                            />
                          </div>
                        );
                      })
                  ) : (
                    <div>No such data found</div>
                  )}
                </div>
              );
            })
          : "Loading......"}
      </div>

      {/* Add category form */}
      <div className={open ? "d-flex fixed-top" : "d-none"} style={{top: "10rem"}}>
        <form className="w-50 m-auto bg-warning p-5" onSubmit={handleCategorySubmit}>
          <div className="form-group">
            <label className="m-3">Add new category</label>
            <input
              type="text"
              className="form-control m-3"
              placeholder="Add category"
              value={newCategeory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-success mx-2">Add</button>
            <button type="button" onClick={(e) => setOpen(false)} className="btn btn-danger mx-2">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
