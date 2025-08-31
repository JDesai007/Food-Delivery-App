import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchFoodDetails } from "../../service/foodService";
import { StoreContext } from "../../context/StoreContext";

const FoodDetails = () => {
  const { id } = useParams();
  const { increaseQty, token } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  useEffect(() => {
    const loadFoodDetails = async () => {
      try {
        const foodData = await fetchFoodDetails(id);
        setData(foodData);
      } catch {
        alert("Error displaying the food details."); // fallback error alert
      }
    };
    loadFoodDetails();
  }, [id]);

  const handleAddToCart = () => {
    if (!token) {
      setShowLoginAlert(true);
      return;
    }
    increaseQty(data.id);
    navigate("/cart");
  };

  const handleLoginRedirect = () => {
    setShowLoginAlert(false);
    navigate("/login");
  };

  return (
    <>
      {/* Styled Alert at Top */}
      {showLoginAlert && (
        <div
          className="alert alert-warning alert-dismissible fade show d-flex justify-content-between align-items-center position-fixed top-0 start-50 translate-middle-x shadow"
          role="alert"
          style={{
            zIndex: 1055,
            maxWidth: "500px",
            width: "90%",
            marginTop: "20px",
            borderLeft: "6px solid #f0ad4e",
            backgroundColor: "#fff8e1",
            color: "#856404",
          }}
        >
          <div>
            <strong>Login Required:</strong> Please login to add items to your cart.
          </div>
          <div className="d-flex gap-2 ms-4">
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => setShowLoginAlert(false)}
            >
              Cancel
            </button>
            <button className="btn btn-sm btn-warning" onClick={handleLoginRedirect}>
              Login
            </button>
          </div>
        </div>
      )}

      {/* Food Details Content */}
      <section className="py-5">
        <div className="container px-4 px-lg-5 ">
          <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-md-6">
              <img
                className="card-img-top mb-5 mb-md-0"
                src={data.imageUrl}
                alt={data.name}
              />
            </div>
            <div className="col-md-6">
              <div className="fs-5 mb-1">
                Category:{" "}
                <span className="badge text-bg-warning">{data.category}</span>
              </div>
              <h1 className="display-5 fw-bolder">{data.name}</h1>
              <div className="fs-5 mb-2">
                <span>&#8377;{data.price}.00</span>
              </div>
              <p className="lead">{data.description}</p>
              <div className="d-flex">
                <button
                  className="btn btn-outline-dark flex-shrink-0"
                  type="button"
                  onClick={handleAddToCart}
                >
                  <i className="bi-cart-fill me-1"></i>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FoodDetails;
