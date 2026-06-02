import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      const cart =
        JSON.parse(
          localStorage.getItem(`cart_${user.email}`)
        ) || [];

      setCartCount(cart.length);
    }
  }, [user]);

  const logout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div
      style={{
        backgroundColor: "#4f46e5",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
      }}
    >
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "white",
        }}
      >
        <h1>ShopEZ</h1>
      </Link>

      <input
        type="text"
        placeholder="Search..."
        style={{
          width: "45%",
          padding: "12px",
          borderRadius: "5px",
          border: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <Link to="/cart">
          <button
            style={{
              padding: "10px 15px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Cart ({cartCount})
          </button>
        </Link>

        {user ? (
          <>
            <p
  onClick={() => navigate("/profile")}
  style={{
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
  {user.name}
</p>

            <button
              onClick={logout}
              style={{
                padding: "10px 15px",
                border: "none",
                borderRadius: "5px",
                backgroundColor: "red",
                color: "white",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">
            <button
              style={{
                padding: "10px 15px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;