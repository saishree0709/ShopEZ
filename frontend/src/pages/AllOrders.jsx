import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

function AllOrders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    loadOrders();
  }, []);

  const loadOrders = () => {
    const saiOrders =
      JSON.parse(
        localStorage.getItem(
          "orders_sai@gmail.com"
        )
      ) || [];

    const varunOrders =
      JSON.parse(
        localStorage.getItem(
          "orders_varun@gmail.com"
        )
      ) || [];

    const allOrders = [
      ...saiOrders.map((order) => ({
        ...order,
        customerEmail:
          "sai@gmail.com",
      })),

      ...varunOrders.map((order) => ({
        ...order,
        customerEmail:
          "varun@gmail.com",
      })),
    ];

    setOrders(allOrders);
  };

  const updateStatus = (
    orderId,
    newStatus
  ) => {
    const updatedOrders =
      orders.map((order) =>
        order.orderId === orderId
          ? {
              ...order,
              status: newStatus,
            }
          : order
      );

    setOrders(updatedOrders);

    const saiOrders =
      updatedOrders.filter(
        (order) =>
          order.customerEmail ===
          "sai@gmail.com"
      );

    const varunOrders =
      updatedOrders.filter(
        (order) =>
          order.customerEmail ===
          "varun@gmail.com"
      );

    localStorage.setItem(
      "orders_sai@gmail.com",
      JSON.stringify(saiOrders)
    );

    localStorage.setItem(
      "orders_varun@gmail.com",
      JSON.stringify(varunOrders)
    );
  };

  const cancelOrder = (orderId) => {
    if (
      !window.confirm(
        "Cancel this order?"
      )
    )
      return;

    const updatedOrders =
      orders.filter(
        (order) =>
          order.orderId !== orderId
      );

    setOrders(updatedOrders);

    const saiOrders =
      updatedOrders.filter(
        (order) =>
          order.customerEmail ===
          "sai@gmail.com"
      );

    const varunOrders =
      updatedOrders.filter(
        (order) =>
          order.customerEmail ===
          "varun@gmail.com"
      );

    localStorage.setItem(
      "orders_sai@gmail.com",
      JSON.stringify(saiOrders)
    );

    localStorage.setItem(
      "orders_varun@gmail.com",
      JSON.stringify(varunOrders)
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#374151",
      }}
    >
      <AdminNavbar activePage="orders" />

      <div
        style={{
          padding: "40px 60px",
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: "45px",
            marginBottom: "30px",
          }}
        >
          All Orders
        </h1>

        {orders.length === 0 ? (
          <div
            style={{
              backgroundColor:
                "#111111",
              color: "white",
              padding: "40px",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            No Orders Found
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.orderId}
              style={{
                backgroundColor:
                  "#111111",
                color: "white",
                padding: "25px",
                borderRadius: "15px",
                marginBottom: "25px",
              }}
            >
              <h2>
                Order #
                {order.orderId}
              </h2>

              <p>
                Customer:
                {" "}
                {
                  order.customer
                    ?.name
                }
              </p>

              <p>
                Email:
                {" "}
                {
                  order.customerEmail
                }
              </p>

              <p>
                Mobile:
                {" "}
                {
                  order.customer
                    ?.mobile
                }
              </p>

              <p>
                Address:
                {" "}
                {
                  order.customer
                    ?.address
                }
              </p>

              <p>
                Pincode:
                {" "}
                {
                  order.customer
                    ?.pincode
                }
              </p>

              <p>
                Payment:
                {" "}
                {
                  order.customer
                    ?.paymentMethod
                }
              </p>

              <p>
                Total:
                ₹ {order.total}
              </p>

              <p>
                Date:
                {" "}
                {order.date}
              </p>

              <div
                style={{
                  marginTop: "20px",
                }}
              >
                <label>
                  Status:
                </label>

                <select
                  value={
                    order.status ||
                    "Ordered"
                  }
                  onChange={(e) =>
                    updateStatus(
                      order.orderId,
                      e.target.value
                    )
                  }
                  style={{
                    marginLeft:
                      "10px",
                    padding: "10px",
                    borderRadius:
                      "5px",
                  }}
                >
                  <option>
                    Ordered
                  </option>
                  <option>
                    Packed
                  </option>
                  <option>
                    Shipped
                  </option>
                  <option>
                    Delivered
                  </option>
                </select>
              </div>

              <h3
                style={{
                  marginTop: "25px",
                }}
              >
                Products
              </h3>

              {order.products?.map(
                (
                  product,
                  index
                ) => (
                  <div
                    key={index}
                    style={{
                      display:
                        "flex",
                      gap: "20px",
                      backgroundColor:
                        "#1f2937",
                      padding:
                        "15px",
                      borderRadius:
                        "10px",
                      marginTop:
                        "15px",
                    }}
                  >
                    <img
                      src={
                        product.image
                      }
                      alt={
                        product.name
                      }
                      style={{
                        width:
                          "120px",
                        height:
                          "120px",
                        objectFit:
                          "contain",
                        backgroundColor:
                          "white",
                        borderRadius:
                          "10px",
                      }}
                    />

                    <div>
                      <h3>
                        {
                          product.name
                        }
                      </h3>

                      <p>
                        ₹
                        {
                          product.price
                        }
                      </p>

                      <p>
                        Qty:
                        {" "}
                        {product.quantity ||
                          1}
                      </p>

                      <p>
                        Size:
                        {" "}
                        {product.selectedSize ||
                          "M"}
                      </p>
                    </div>
                  </div>
                )
              )}

              <button
                onClick={() =>
                  cancelOrder(
                    order.orderId
                  )
                }
                style={{
                  marginTop: "20px",
                  padding:
                    "12px 20px",
                  backgroundColor:
                    "#ef4444",
                  color: "white",
                  border: "none",
                  borderRadius:
                    "6px",
                  cursor:
                    "pointer",
                }}
              >
                Cancel Order
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AllOrders;