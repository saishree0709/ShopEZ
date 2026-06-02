import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

function Cart() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [cartItems, setCartItems] =
    useState([]);

  const [showCheckout, setShowCheckout] =
    useState(false);

  const [checkoutData, setCheckoutData] =
    useState({
      name: user?.name || "",
      email: user?.email || "",
      mobile: "",
      address: "",
      pincode: "",
      paymentMethod: "COD",
    });

  useEffect(() => {
    if (user) {
      const cart =
        JSON.parse(
          localStorage.getItem(
            `cart_${user.email}`
          )
        ) || [];

      setCartItems(cart);
    }
  }, []);

  const removeFromCart = (id) => {
    const updatedCart =
      cartItems.filter(
        (item) => item.id !== id
      );

    setCartItems(updatedCart);

    localStorage.setItem(
      `cart_${user.email}`,
      JSON.stringify(updatedCart)
    );
  };

  const updateQuantity = (
    id,
    action
  ) => {
    const updatedCart =
      cartItems.map((item) => {
        if (item.id === id) {
          let qty =
            item.quantity || 1;

          if (action === "inc")
            qty++;

          if (
            action === "dec" &&
            qty > 1
          )
            qty--;

          return {
            ...item,
            quantity: qty,
          };
        }

        return item;
      });

    setCartItems(updatedCart);

    localStorage.setItem(
      `cart_${user.email}`,
      JSON.stringify(updatedCart)
    );
  };

  const totalPrice =
    cartItems.reduce(
      (total, item) =>
        total +
        item.price *
          (item.quantity || 1),
      0
    );

  const placeOrder = () => {
    if (
      !checkoutData.mobile ||
      !checkoutData.address ||
      !checkoutData.pincode
    ) {
      alert(
        "Please fill all checkout details"
      );
      return;
    }

    const orderKey = `orders_${user.email}`;

    const existingOrders =
      JSON.parse(
        localStorage.getItem(orderKey)
      ) || [];

    const newOrder = {
      orderId: Date.now(),
      customer: checkoutData,
      products: cartItems,
      total: totalPrice,
      status: "Ordered",
      date:
        new Date().toLocaleString(),
    };

    existingOrders.push(newOrder);

    localStorage.setItem(
      orderKey,
      JSON.stringify(existingOrders)
    );

    localStorage.removeItem(
      `cart_${user.email}`
    );

    setCartItems([]);

    alert(
      "Order placed successfully!"
    );

    setShowCheckout(false);
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
        {/* CART */}

        <div
          style={{
            flex: 3,
          }}
        >
          <h1
            style={{
              marginBottom: "25px",
            }}
          >
            Shopping Cart
          </h1>

          {cartItems.length === 0 ? (
            <h2>
              No Products In Cart
            </h2>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor:
                    "white",
                  padding: "20px",
                  borderRadius:
                    "10px",
                  marginBottom:
                    "20px",
                  display: "flex",
                  gap: "20px",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit:
                      "contain",
                  }}
                />

                <div>
                  <h2>
                    {item.name}
                  </h2>

                  <h3>
                    ₹ {item.price}
                  </h3>

                  <p>
                    Size:{" "}
                    {item.selectedSize ||
                      "M"}
                  </p>

                  {/* QUANTITY */}

                  <div
                    style={{
                      display:
                        "flex",
                      gap: "10px",
                      alignItems:
                        "center",
                      marginTop:
                        "10px",
                    }}
                  >
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          "dec"
                        )
                      }
                    >
                      -
                    </button>

                    <span>
                      {item.quantity ||
                        1}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          "inc"
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() =>
                      removeFromCart(
                        item.id
                      )
                    }
                    style={{
                      marginTop:
                        "15px",
                      padding:
                        "10px 15px",
                      backgroundColor:
                        "red",
                      color:
                        "white",
                      border:
                        "none",
                      borderRadius:
                        "5px",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* PRICE BOX */}

        <div
          style={{
            flex: 1,
            backgroundColor:
              "white",
            padding: "25px",
            borderRadius: "10px",
          }}
        >
          <h2>
            Price Details
          </h2>

          <h3
            style={{
              marginTop: "20px",
            }}
          >
            Total: ₹ {totalPrice}
          </h3>

          <button
            disabled={
              cartItems.length === 0
            }
            onClick={() =>
              setShowCheckout(true)
            }
            style={{
              marginTop: "20px",
              width: "100%",
              padding: "15px",
              backgroundColor:
                "#4f46e5",
              color: "white",
              border: "none",
              borderRadius:
                "5px",
              cursor: "pointer",
            }}
          >
            Place Order
          </button>
        </div>
      </div>

      {/* CHECKOUT MODAL */}

      {showCheckout && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent:
              "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor:
                "white",
              padding: "30px",
              borderRadius:
                "10px",
              width: "500px",
            }}
          >
            <h2>
              Checkout Details
            </h2>

            <input
              placeholder="Name"
              value={
                checkoutData.name
              }
              onChange={(e) =>
                setCheckoutData({
                  ...checkoutData,
                  name: e.target.value,
                })
              }
              style={inputStyle}
            />

            <input
              placeholder="Mobile"
              value={
                checkoutData.mobile
              }
              onChange={(e) =>
                setCheckoutData({
                  ...checkoutData,
                  mobile:
                    e.target.value,
                })
              }
              style={inputStyle}
            />

            <input
              placeholder="Address"
              value={
                checkoutData.address
              }
              onChange={(e) =>
                setCheckoutData({
                  ...checkoutData,
                  address:
                    e.target.value,
                })
              }
              style={inputStyle}
            />

            <input
              placeholder="Pincode"
              value={
                checkoutData.pincode
              }
              onChange={(e) =>
                setCheckoutData({
                  ...checkoutData,
                  pincode:
                    e.target.value,
                })
              }
              style={inputStyle}
            />

            <select
              value={
                checkoutData.paymentMethod
              }
              onChange={(e) =>
                setCheckoutData({
                  ...checkoutData,
                  paymentMethod:
                    e.target.value,
                })
              }
              style={inputStyle}
            >
              <option value="COD">
                Cash On Delivery
              </option>
              <option value="UPI">
                UPI
              </option>
              <option value="Card">
                Card
              </option>
            </select>

            <div
              style={{
                display: "flex",
                gap: "15px",
                marginTop: "20px",
              }}
            >
              <button
                onClick={() =>
                  setShowCheckout(
                    false
                  )
                }
                style={{
                  flex: 1,
                  padding: "12px",
                }}
              >
                Cancel
              </button>

              <button
                onClick={placeOrder}
                style={{
                  flex: 1,
                  padding: "12px",
                  backgroundColor:
                    "#4f46e5",
                  color: "white",
                  border: "none",
                }}
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "12px",
  border:
    "1px solid lightgray",
  borderRadius: "5px",
};

export default Cart;