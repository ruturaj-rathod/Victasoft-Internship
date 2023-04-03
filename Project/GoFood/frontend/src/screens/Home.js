import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodCategory, setFoodCategory] = useState([]);
  const [foodItems, setFoodItems] = useState([]);

  const loadData = async () => {
    let response = await fetch("/api/food/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();
    setFoodItems(response.food_items[0]);
    setFoodCategory(response.food_items[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carousel"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/900x500/?burger"
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness()30%", objectFit: "cover" }}
                height="500px"
                width="900px"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x500/?burger"
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness()30%", objectFit: "cover" }}
                height="500px"
                width="900px"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x500/?burger"
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness()30%", objectFit: "cover" }}
                height="500px"
                width="900px"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
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
                      .filter(
                        (item) =>
                          item.CategoryName === data.CategoryName &&
                          item?.name.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((filterItem) => {
                        return (
                          <div
                            className="col-12 col-md-6 col-lg-3 m-3"
                            key={filterItem._id}
                          >
                            <Card
                              foodItem={filterItem}
                              options = {filterItem.options[0]}
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
      <div>
        <Footer />
      </div>
    </div>
  );
}
