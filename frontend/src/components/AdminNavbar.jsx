import { useNavigate } from "react-router-dom";

function AdminNavbar({ activePage }) {
  const navigate = useNavigate();

  const navBtn = {
    backgroundColor: "#374151",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "0.3s",
  };

  const navBtnActive = {
    backgroundColor: "#f59e0b",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div
      style={{
        backgroundColor: "#020617",
        color: "white",
        padding: "20px 50px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0px 4px 15px rgba(0,0,0,0.5)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <h1
        style={{
          fontSize: "32px",
          margin: 0,
          cursor: "pointer",
        }}
        onClick={() => navigate("/admin")}
      >
        ShopEZ Admin
      </h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => navigate("/admin")}
          style={activePage === "home" ? navBtnActive : navBtn}
          onMouseOver={(e) => {
            if (activePage !== "home") {
              e.target.style.backgroundColor = "#4b5563";
            }
          }}
          onMouseOut={(e) => {
            if (activePage !== "home") {
              e.target.style.backgroundColor = "#374151";
            }
          }}
        >
          Home
        </button>

        <button
          onClick={() => navigate("/users")}
          style={activePage === "users" ? navBtnActive : navBtn}
          onMouseOver={(e) => {
            if (activePage !== "users") {
              e.target.style.backgroundColor = "#4b5563";
            }
          }}
          onMouseOut={(e) => {
            if (activePage !== "users") {
              e.target.style.backgroundColor = "#374151";
            }
          }}
        >
          Users
        </button>

        <button
          onClick={() => navigate("/allorders")}
          style={activePage === "orders" ? navBtnActive : navBtn}
          onMouseOver={(e) => {
            if (activePage !== "orders") {
              e.target.style.backgroundColor = "#4b5563";
            }
          }}
          onMouseOut={(e) => {
            if (activePage !== "orders") {
              e.target.style.backgroundColor = "#374151";
            }
          }}
        >
          Orders
        </button>

        <button
          onClick={() => navigate("/admin/products")}
          style={activePage === "products" ? navBtnActive : navBtn}
          onMouseOver={(e) => {
            if (activePage !== "products") {
              e.target.style.backgroundColor = "#4b5563";
            }
          }}
          onMouseOut={(e) => {
            if (activePage !== "products") {
              e.target.style.backgroundColor = "#374151";
            }
          }}
        >
          Products
        </button>

        <button
          onClick={() => navigate("/newproduct")}
          style={activePage === "newproduct" ? navBtnActive : navBtn}
          onMouseOver={(e) => {
            if (activePage !== "newproduct") {
              e.target.style.backgroundColor = "#4b5563";
            }
          }}
          onMouseOut={(e) => {
            if (activePage !== "newproduct") {
              e.target.style.backgroundColor = "#374151";
            }
          }}
        >
          New Product
        </button>

        <button
          onClick={logout}
          style={{
            ...navBtn,
            backgroundColor: "#7f1d1d",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#991b1b";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#7f1d1d";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdminNavbar;
