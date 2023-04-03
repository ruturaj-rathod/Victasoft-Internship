import axios from "axios";
import React, { useEffect, useState } from "react";

const AddFoodItem = ({ history }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [foodCategory, setFoodCategory] = useState([]);
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);
  useEffect(() => {
    axios
      .get("/api/food/")
      .then((res) => {
        setFoodCategory([...res.data.food_items[1]]);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const addHandler = () => {
    setOptions([...options, { key: key, value: value }]);
    setKey("");
    setValue("");
  };

  const removeHandler = (index) => {
    let temp = options;
    temp.splice(index, 1);
    setOptions([...temp]);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    //seting price option
    let priceOptions = {};
    options.map((item) => {
      priceOptions = {
        ...priceOptions,
        [item.key]: item.value,
      };
      return ""
    });

    //final data to send to api
    const foodData = {
        "name": name,
        "description": description,
        "CategoryName": category,
        "img": image,
        "options": [priceOptions]
    }

    axios.post("/api/food/new", foodData, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
    }).then((res) => {
        window.location.replace('http://localhost:3000/admin/food-items');
    })
  };
  return (
    <div>
      <div className="container">
        <form onSubmit={submitHandler}>
          <div className="form-group m-4">
            <label>Food Item Name: </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group m-4">
            <label>Description :</label>
            <textarea
              type="text"
              className="form-control"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group m-4">
            <label>Category Name:</label>
            <select
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option>Select the Food Category</option>
              {foodCategory.map((category) => (
                <option key={category._id} value={category.CategoryName}>
                  {category.CategoryName}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group m-4">
            <label>Price and Options :</label>
            {options.map((option, index) => (
              <div className="d-flex mt-3" key={index}>
                <div className="form-group w-100 me-3">
                  <label>Key: </label>
                  <input
                    type="text"
                    className="form-control"
                    name={option.key}
                    value={option.key}
                    readOnly
                  />
                </div>
                <div className="form-group w-100">
                  <label>Value: </label>
                  <input
                    type="number"
                    className="form-control"
                    name={option.value}
                    value={option.value}
                    readOnly
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-warning m-auto"
                  onClick={() => removeHandler(index)}
                >
                  remove
                </button>
              </div>
            ))}
            <div className="d-flex mt-2">
              <div className="form-group w-100 me-3">
                <label>Key: </label>
                <input
                  type="text"
                  className="form-control"
                  name="key"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                />
              </div>
              <div className="form-group w-100">
                <label>Value: </label>
                <input
                  type="number"
                  className="form-control"
                  name="value"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="btn btn-success m-auto"
                onClick={addHandler}
              >
                Add
              </button>
            </div>
          </div>
          <div className="form-group m-4">
            <label>Image (Enter image link here):</label>
            <input
              type="text"
              className="form-control"
              name="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-center my-2">
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFoodItem;
