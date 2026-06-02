import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

function AdminDashboard() {
  const navigate = useNavigate();

  const [bannerUrl, setBannerUrl] =
    useState(
      localStorage.getItem(
        "bannerImage"
      ) || ""
    );

  // Protection

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [navigate]);

  // ORDERS

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

  const totalOrders =
    saiOrders.length + varunOrders.length;

  // PRODUCTS

  const products =
    JSON.parse(
      localStorage.getItem("products")
    ) || [];

  const totalProducts =
    products.length;

  // USERS

  const totalUsers = 2;

  const updateBanner = () => {
    if (!bannerUrl.trim()) {
      alert(
        "Please enter banner URL"
      );
      return;
    }

    localStorage.setItem(
      "bannerImage",
      bannerUrl
    );

    alert(
      "Banner updated successfully"
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#374151",
      }}
    >
      <AdminNavbar activePage="home" />

      <div
        style={{
          padding: "40px 60px",
        }}
      >
        {/* TITLE */}

        <div
          style={{
            marginBottom: "40px",
          }}
        >
          <h1
            style={{
              color: "white",
              fontSize: "55px",
              marginBottom: "10px",
            }}
          >
            Admin Dashboard
          </h1>

          <p
            style={{
              color: "lightgray",
              fontSize: "20px",
            }}
          >
            Manage products, users
            and customer orders
          </p>
        </div>

        {/* CARDS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "30px",
          }}
        >
          <div style={cardStyle}>
            <h2 style={cardHeading}>
              Total Users
            </h2>

            <p style={cardCount}>
              {totalUsers}
            </p>

            <button
              onClick={() =>
                navigate("/users")
              }
              style={actionBtn}
            >
              View All
            </button>
          </div>

          <div style={cardStyle}>
            <h2 style={cardHeading}>
              All Products
            </h2>

            <p style={cardCount}>
              {totalProducts}
            </p>

            <button
              onClick={() =>
                navigate(
                  "/admin/products"
                )
              }
              style={actionBtn}
            >
              View All
            </button>
          </div>

          <div style={cardStyle}>
            <h2 style={cardHeading}>
              All Orders
            </h2>

            <p style={cardCount}>
              {totalOrders}
            </p>

            <button
              onClick={() =>
                navigate(
                  "/allorders"
                )
              }
              style={actionBtn}
            >
              View All
            </button>
          </div>

          <div style={cardStyle}>
            <h2 style={cardHeading}>
              Add Product
            </h2>

            <p
              style={{
                color:
                  "lightgray",
                marginBottom:
                  "25px",
              }}
            >
              Create new product
            </p>

            <button
              onClick={() =>
                navigate(
                  "/newproduct"
                )
              }
              style={actionBtn}
            >
              Add Now
            </button>
          </div>
        </div>

        {/* BANNER SECTION */}

        <div
          style={{
            marginTop: "40px",
            backgroundColor:
              "#111111",
            padding: "30px",
            borderRadius: "18px",
          }}
        >
          <h2
            style={{
              color: "white",
              marginBottom: "20px",
            }}
          >
            Update Home Banner
          </h2>

          <input
            type="text"
            value={bannerUrl}
            onChange={(e) =>
              setBannerUrl(
                e.target.value
              )
            }
            placeholder="Paste banner image URL..."
            style={{
              width: "100%",
              padding: "15px",
              borderRadius: "10px",
              border: "none",
              marginBottom: "20px",
              fontSize: "16px",
            }}
          />

          <button
            onClick={updateBanner}
            style={actionBtn}
          >
            Update Banner
          </button>

          {bannerUrl && (
            <div
              style={{
                marginTop: "25px",
              }}
            >
              <img
                src={bannerUrl}
                alt="banner"
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "cover",
                  borderRadius:
                    "10px",
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  backgroundColor: "#111111",
  borderRadius: "18px",
  padding: "35px",
  textAlign: "center",
  boxShadow:
    "0px 4px 12px rgba(0,0,0,0.3)",
};

const cardHeading = {
  color: "white",
  fontSize: "32px",
  marginBottom: "20px",
};

const cardCount = {
  color: "#f59e0b",
  fontSize: "40px",
  marginBottom: "25px",
  fontWeight: "bold",
};

const actionBtn = {
  backgroundColor: "transparent",
  color: "#f59e0b",
  border: "2px solid #f59e0b",
  padding: "12px 25px",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "16px",
};

export default AdminDashboard;