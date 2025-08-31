import React, { useEffect, useState, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import "./MyOrders.css";
import { fetchUserOrders } from "../../service/orderService";

const MyOrders = () => {
  const { token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await fetchUserOrders(token);
    setData(response);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  // ✅ Normalized step mapping
  const getOrderStep = (status) => {
    if (!status) return 0;
    const normalized = status.toLowerCase().trim();

    if (normalized.includes("prepar")) return 1;   // Preparing / Food Preparing
    if (normalized.includes("out")) return 2;      // Out for Delivery
    if (normalized.includes("deliver")) return 3;  // Delivered
    return 0;
  };

  return (
    <div className="container py-5 my-orders">
      <h2 className="mb-4 fw-bold text-center">My Orders</h2>

      <div className="row g-4">
        {data.length === 0 && (
          <div className="text-center">
            <img src={assets.delivery} alt="" width={80} />
            <p className="mt-2 text-muted">No orders found</p>
          </div>
        )}

        {data.map((order, index) => {
          const step = getOrderStep(order.orderStatus);

          return (
            <div className="col-md-6 col-lg-4" key={index}>
              <div className="card shadow-sm border-0 h-100 rounded-4">
                <div className="card-body">
                  {/* Header */}
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <img
                      src={assets.delivery}
                      alt="Delivery"
                      height={40}
                      width={40}
                      className="me-2"
                    />
                    <span className="fw-bold text-capitalize">
                      Order #{index + 1}
                    </span>
                  </div>

                  {/* Ordered items */}
                  <div className="mb-3">
                    <h6 className="fw-semibold mb-2">Items</h6>
                    <ul className="list-unstyled small text-muted">
                      {order.orderedItems.map((item, idx) => (
                        <li key={idx}>
                          {item.name} × {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price */}
                  <div className="d-flex justify-content-between mb-3">
                    <span className="fw-bold text-dark">
                      ₹{order.amount.toFixed(2)}
                    </span>
                    <span className="text-muted">
                      {order.orderedItems.length} items
                    </span>
                  </div>

                  {/* Order progress tracker */}
                  <div className="order-tracker d-flex justify-content-between text-center">
                    <div className={`step ${step >= 1 ? "active" : ""}`}>
                      <i className="bi bi-check-circle-fill"></i>
                      <p>Preparing</p>
                    </div>
                    <div className={`step ${step >= 2 ? "active" : ""}`}>
                      <i className="bi bi-check-circle-fill"></i>
                      <p>Out for Delivery</p>
                    </div>
                    <div className={`step ${step >= 3 ? "active" : ""}`}>
                      <i className="bi bi-check-circle-fill"></i>
                      <p>Delivered</p>
                    </div>
                  </div>

                  {/* Refresh button */}
                  <div className="text-end mt-3">
                    <button
                      className="btn btn-sm btn-outline-primary rounded-pill"
                      onClick={fetchOrders}
                    >
                      <i className="bi bi-arrow-clockwise"></i> Refresh
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
