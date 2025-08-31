import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ name, description, id, imageUrl, price }) => {
  const { increaseQty, decreaseQty, quantities, token } = useContext(StoreContext);
  const navigate = useNavigate();
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  const handleAddToCart = () => {
    if (!token) {
      setShowLoginAlert(true);
      return;
    }
    increaseQty(id);
  };

  const handleDecreaseQty = () => {
    if (!token) return;
    decreaseQty(id);
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
            <button className="btn btn-sm btn-outline-secondary" onClick={() => setShowLoginAlert(false)}>
              Cancel
            </button>
            <button className="btn btn-sm btn-warning" onClick={handleLoginRedirect}>
              Login
            </button>
          </div>
        </div>
      )}

      {/* Food Card */}
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
        <div className="card" style={{ maxWidth: "320px" }}>
          <Link to={`/food/${id}`}>
            <img
              src={imageUrl}
              className="card-img-top"
              alt="Product"
              height={300}
              width={60}
            />
          </Link>
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{description}</p>
            <div className="d-flex justify-content-between align-items-center">
              <span className="h5 mb-0">&#8377;{price}</span>
              <div>
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star-half text-warning"></i>
                <small className="text-muted">(4.5)</small>
              </div>
            </div>
          </div>

          <div className="card-footer d-flex justify-content-between bg-light">
            <Link className="btn btn-primary btn-sm" to={`/food/${id}`}>
              View Food
            </Link>

            {quantities[id] > 0 ? (
              <div className="d-flex align-items-center gap-2">
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={handleDecreaseQty}
                >
                  <i className="bi bi-dash-circle"></i>
                </button>
                <span className="fw-bold">{quantities[id]}</span>
                <button
                  className="btn btn-outline-success btn-sm"
                  onClick={handleAddToCart}
                >
                  <i className="bi bi-plus-circle"></i>
                </button>
              </div>
            ) : (
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={handleAddToCart}
              >
                <i className="bi bi-plus-circle"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodItem;
