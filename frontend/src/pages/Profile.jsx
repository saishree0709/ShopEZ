import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [orders, setOrders] =
    useState([]);

  useEffect(() => {
    if (user) {
      const savedOrders =
        JSON.parse(
          localStorage.getItem(
            `orders_${user.email}`
          )
        ) || [];

      setOrders(savedOrders);
    }
  }, []);

  const cancelOrder = (orderId) => {
    if (
      window.confirm(
        "Cancel this order?"
      )
    ) {
      const updatedOrders =
        orders.filter(
          (order) =>
            order.orderId !== orderId
        );

      setOrders(updatedOrders);

      localStorage.setItem(
        `orders_${user.email}`,
        JSON.stringify(
          updatedOrders
        )
      );

      alert(
        "Order cancelled successfully"
      );
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div
      style={{
        backgroundColor: "#f1f5f9",
        minHeight: "100vh",
      }}
    >
      <Navbar />

      <div
        style={{
          padding: "30px",
          display: "flex",
          gap: "30px",
          alignItems: "flex-start",
        }}
      >
        {/* PROFILE CARD */}

        <div
          style={{
            width: "300px",
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "12px",
            boxShadow:
              "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h1
            style={{
              marginBottom: "20px",
            }}
          >
            Profile
          </h1>

          <p>
            <b>Name:</b>{" "}
            {user?.name}
          </p>

          <p
            style={{
              marginTop: "10px",
            }}
          >
            <b>Email:</b>{" "}
            {user?.email}
          </p>

          <p
            style={{
              marginTop: "10px",
            }}
          >
            <b>Total Orders:</b>{" "}
            {orders.length}
          </p>

          <button
            onClick={logout}
            style={{
              marginTop: "20px",
              width: "100%",
              padding: "12px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>

        {/* ORDERS */}

        <div
          style={{
            flex: 1,
          }}
        >
          <h1
            style={{
              marginBottom: "25px",
            }}
          >
            My Orders
          </h1>

          {orders.length === 0 ? (
            <div
              style={{
                backgroundColor:
                  "white",
                padding: "30px",
                borderRadius:
                  "12px",
              }}
            >
              <h2>
                No Orders Yet
              </h2>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.orderId}
                style={{
                  backgroundColor:
                    "white",
                  padding: "25px",
                  borderRadius:
                    "12px",
                  marginBottom:
                    "25px",
                  boxShadow:
                    "0 2px 10px rgba(0,0,0,0.1)",
                }}
              >
                <h2>
                  Order #
                  {order.orderId}
                </h2>

                <p>
                  <b>Status:</b>{" "}
                  {order.status}
                </p>

                <p>
                  <b>Payment:</b>{" "}
                  {
                    order.customer
                      ?.paymentMethod
                  }
                </p>

                <p>
                  <b>Total:</b> ₹
                  {order.total}
                </p>

                <p>
                  <b>Address:</b>{" "}
                  {
                    order.customer
                      ?.address
                  }
                </p>

                <p>
                  <b>Date:</b>{" "}
                  {order.date}
                </p>

                <hr
                  style={{
                    margin:
                      "15px 0",
                  }}
                />

                {order.products?.map(
                  (product, index) => (
                    <div
                      key={index}
                      style={{
                        display:
                          "flex",
                        gap: "15px",
                        marginBottom:
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
                            "90px",
                          height:
                            "90px",
                          objectFit:
                            "contain",
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
                          Qty:{" "}
                          {product.quantity ||
                            1}
                        </p>

                        <p>
                          Size:{" "}
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
                    marginTop:
                      "10px",
                    padding:
                      "10px 15px",
                    backgroundColor:
                      "red",
                    color:
                      "white",
                    border:
                      "none",
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
    </div>
  );
}

export default Profile;