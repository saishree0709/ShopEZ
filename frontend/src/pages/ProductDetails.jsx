import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function ProductDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] =
    useState(null);

  const [selectedSize, setSelectedSize] =
    useState("M");

  const [quantity, setQuantity] =
    useState(1);

  useEffect(() => {
    const products =
      JSON.parse(
        localStorage.getItem("products")
      ) || [];

    const foundProduct =
      products.find(
        (p) =>
          String(p.id || p._id) ===
          String(id)
      );

    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id]);

  const addToCart = () => {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    const cartKey = `cart_${user.email}`;

    const existingCart =
      JSON.parse(
        localStorage.getItem(cartKey)
      ) || [];

    existingCart.push({
      ...product,
      quantity,
      selectedSize,
    });

    localStorage.setItem(
      cartKey,
      JSON.stringify(existingCart)
    );

    alert("Product added to cart");
  };

  const buyNow = () => {
    addToCart();
    navigate("/cart");
  };

  if (!product) {
    return (
      <div>
        <Navbar />
        <h1
          style={{
            padding: "50px",
            textAlign: "center",
          }}
        >
          Product Not Found
        </h1>
      </div>
    );
  }

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
          padding: "40px",
          display: "flex",
          gap: "40px",
          flexWrap: "wrap",
        }}
      >
        {/* IMAGE SECTION */}

        <div
          style={{
            flex: 1,
            minWidth: "450px",
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "15px",
            boxShadow:
              "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "100%",
              height: "500px",
              objectFit: "contain",
            }}
          />

          <div
            style={{
              display: "flex",
              gap: "15px",
              marginTop: "20px",
            }}
          >
            <button
              onClick={addToCart}
              style={{
                flex: 1,
                padding: "15px",
                backgroundColor:
                  "#f59e0b",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Add To Cart
            </button>

            <button
              onClick={buyNow}
              style={{
                flex: 1,
                padding: "15px",
                backgroundColor:
                  "#4f46e5",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Buy Now
            </button>
          </div>
        </div>

        {/* DETAILS SECTION */}

        <div
          style={{
            flex: 1,
            minWidth: "450px",
            backgroundColor: "white",
            padding: "35px",
            borderRadius: "15px",
            boxShadow:
              "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h1
            style={{
              fontSize: "42px",
              fontWeight: "bold",
            }}
          >
            {product.name}
          </h1>

          <div
            style={{
              marginTop: "15px",
              color: "#f59e0b",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            ⭐⭐⭐⭐☆ 4.3 Rating
          </div>

          <p
            style={{
              marginTop: "8px",
              color: "#6b7280",
            }}
          >
            1,200+ Ratings & Reviews
          </p>

          <h2
            style={{
              marginTop: "20px",
              fontSize: "40px",
              color: "#111827",
            }}
          >
            ₹ {product.price}
          </h2>

          <p
            style={{
              color: "#16a34a",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            20% OFF • Limited Time Offer
          </p>

          <p
            style={{
              marginTop: "20px",
              color: "#6b7280",
              lineHeight: "1.8",
            }}
          >
            {product.description ||
              "Premium quality product with excellent durability and performance."}
          </p>

          {/* DELIVERY */}

          <div
            style={{
              marginTop: "25px",
              padding: "15px",
              backgroundColor: "#f3f4f6",
              borderRadius: "10px",
            }}
          >
            🚚 Free Delivery

            <p
              style={{
                marginTop: "8px",
                color: "#6b7280",
              }}
            >
              Delivery within 3-5 business days
            </p>
          </div>

          {/* SIZE */}

          <h3
            style={{
              marginTop: "30px",
            }}
          >
            Select Size
          </h3>

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "15px",
            }}
          >
            {[
              "S",
              "M",
              "L",
              "XL",
            ].map((size) => (
              <button
                key={size}
                onClick={() =>
                  setSelectedSize(size)
                }
                style={{
                  padding: "10px 18px",
                  borderRadius: "8px",
                  border:
                    "1px solid #d1d5db",
                  cursor: "pointer",
                  backgroundColor:
                    selectedSize === size
                      ? "#4f46e5"
                      : "white",
                  color:
                    selectedSize === size
                      ? "white"
                      : "black",
                }}
              >
                {size}
              </button>
            ))}
          </div>

          {/* QUANTITY */}

          <h3
            style={{
              marginTop: "30px",
            }}
          >
            Quantity
          </h3>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              marginTop: "15px",
            }}
          >
            <button
              onClick={() =>
                quantity > 1 &&
                setQuantity(
                  quantity - 1
                )
              }
              style={{
                padding:
                  "8px 15px",
              }}
            >
              -
            </button>

            <span
              style={{
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              {quantity}
            </span>

            <button
              onClick={() =>
                setQuantity(
                  quantity + 1
                )
              }
              style={{
                padding:
                  "8px 15px",
              }}
            >
              +
            </button>
          </div>

          {/* HIGHLIGHTS */}

          <div
            style={{
              marginTop: "35px",
            }}
          >
            <h3>
              Product Highlights
            </h3>

            <ul
              style={{
                marginTop: "15px",
                lineHeight: "2",
              }}
            >
              <li>
                Premium Quality
              </li>

              <li>
                Easy Return Policy
              </li>

              <li>
                Cash On Delivery Available
              </li>

              <li>
                Secure Payment
              </li>

              <li>
                Fast Delivery
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;