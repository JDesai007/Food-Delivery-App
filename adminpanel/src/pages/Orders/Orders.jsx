import React, { useEffect, useMemo, useState } from "react";
import { fetchAllOrders, updateOrderStatus } from "../../services/orderService";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);

  const PAGE_SIZE = 4;

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetchAllOrders();
      setOrders(Array.isArray(response) ? response : []);
    } catch {
      toast.error("Unable to display the orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, currentStatus) => {
    let nextStatus =
      currentStatus === "Food Preparing"
        ? "Out for delivery"
        : currentStatus === "Out for delivery"
        ? "Delivered"
        : "Delivered";

    try {
      const success = await updateOrderStatus(orderId, nextStatus);
      if (success) {
        toast.success(`Order status updated to ${nextStatus}`);
        await fetchOrders();
      } else {
        toast.error("Failed to update order status.");
      }
    } catch {
      toast.error("Failed to update order status.");
    }
  };

  const getStep = (status) =>
    status === "Food Preparing" ? 1 : status === "Out for delivery" ? 2 : 3;

  useEffect(() => {
    fetchOrders();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return orders.filter((o) => {
      const matchesStatus =
        statusFilter === "All" ? true : o.orderStatus === statusFilter;
      const matchesSearch =
        q === "" || String(o.id ?? "").toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [orders, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="container py-4">
      <h2 className="text-center fw-bold mb-4">📦 Order Management</h2>

      {/* Filters */}
      <div className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-center">
            <div className="col-md-5">
              <div className="input-group shadow-sm rounded-pill">
                <span className="input-group-text bg-white border-0">🔍</span>
                <input
                  type="text"
                  className="form-control border-0 rounded-end-pill"
                  placeholder="Search by Order ID..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                />
              </div>
            </div>

            <div className="col-md-5">
              <div className="d-flex gap-2 flex-wrap justify-content-center">
                {["All", "Food Preparing", "Out for delivery", "Delivered"].map(
                  (s) => (
                    <button
                      key={s}
                      className={`btn btn-sm fw-semibold px-3 rounded-pill ${
                        statusFilter === s
                          ? "btn-primary"
                          : "btn-outline-secondary"
                      }`}
                      onClick={() => {
                        setStatusFilter(s);
                        setPage(1);
                      }}
                    >
                      {s}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="col-md-2 d-grid">
              <button
                className="btn btn-outline-dark rounded-pill"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("All");
                  setPage(1);
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Orders */}
      {loading ? (
        <div className="text-center py-5">⏳ Loading orders…</div>
      ) : filtered.length === 0 ? (
        <p className="text-center text-muted">No orders found.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {visible.map((order) => {
            const step = getStep(order.orderStatus);
            const progressPercent = (step / 3) * 100;

            return (
              <div key={order.id} className="col">
                <div className="card shadow-sm border-0 rounded-4 h-100 order-card">
                  <div className="card-body d-flex flex-column p-4">
                    {/* Header */}
                    <div className="d-flex justify-content-between border-bottom pb-2 mb-3">
                      <h6 className="fw-bold text-dark mb-0">
                        #{order.id ?? "N/A"}
                      </h6>
                      <span
                        className={`badge rounded-pill px-3 py-2 ${
                          step === 1
                            ? "bg-warning text-dark"
                            : step === 2
                            ? "bg-info text-dark"
                            : "bg-success"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </div>

                    {/* Items */}
                    <div className="mb-3 flex-grow-1">
                      <h6 className="fw-semibold mb-2">🛒 Items</h6>
                      <div className="d-flex flex-wrap gap-2">
                        {(order.orderedItems || []).map((item, i) => (
                          <span
                            key={`${order.id}-${i}`}
                            className="badge bg-light text-dark border px-3 py-2 rounded-pill shadow-sm"
                          >
                            {item?.name} ×{item?.quantity}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Amount */}
                    <p className="fw-bold text-success fs-6 mb-3">
                      ₹{Number(order.amount || 0).toFixed(2)}
                    </p>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="d-flex justify-content-between small text-muted mb-1">
                        <span>Preparing</span>
                        <span>On the Way</span>
                        <span>Delivered</span>
                      </div>
                      <div className="progress" style={{ height: "8px" }}>
                        <div
                          className="progress-bar bg-primary"
                          style={{ width: `${progressPercent}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Button */}
                    <div className="mt-auto">
                      <button
                        className={`btn w-100 fw-semibold rounded-pill ${
                          step === 3 ? "btn-success disabled" : "btn-primary"
                        }`}
                        onClick={() =>
                          handleStatusUpdate(order.id, order.orderStatus)
                        }
                      >
                        {step === 3 ? "✅ Delivered" : "Next Step →"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {filtered.length > 0 && (
        <div className="d-flex justify-content-center mt-4 gap-2">
          <button
            className="btn btn-outline-secondary rounded-pill px-3"
            disabled={currentPage === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              className={`btn rounded-pill px-3 ${
                currentPage === p ? "btn-primary" : "btn-light"
              }`}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}
          <button
            className="btn btn-outline-secondary rounded-pill px-3"
            disabled={currentPage === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Orders;
