import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

function Users() {
  const navigate = useNavigate();

  // Protection: Check if user is admin
  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("user")
    );
    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [navigate]);

  const users = [
    {
      name: "Sai",
      email: "sai@gmail.com",
      role: "user",
    },

    {
      name: "Varun",
      email: "varun@gmail.com",
      role: "user",
    },

    {
      name: "Admin",
      email: "admin@shopez.com",
      role: "admin",
    },
  ];

  const getUserCartCount = (email) => {
    const cart =
      JSON.parse(
        localStorage.getItem(
          `cart_${email}`
        )
      ) || [];
    return cart.length;
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#374151",
      }}
    >
      <AdminNavbar activePage="users" />

      {/* BODY */}

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
          All Users
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "25px",
          }}
        >
          {users.map((user) => (
            <div
              key={user.email}
              style={{
                backgroundColor:
                  "#111111",
                borderRadius: "12px",
                padding: "25px",
                boxShadow:
                  "0px 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              <div
                style={{
                  marginBottom: "20px",
                }}
              >
                <h3
                  style={{
                    color: "white",
                    fontSize: "22px",
                    marginBottom: "8px",
                  }}
                >
                  {user.name}
                </h3>

                <p
                  style={{
                    color:
                      "lightgray",
                    fontSize: "14px",
                    marginBottom: "12px",
                  }}
                >
                  {user.email}
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span
                    style={{
                      display:
                        "inline-block",
                      backgroundColor:
                        user.role ===
                        "admin"
                          ? "#ef4444"
                          : "#3b82f6",
                      color: "white",
                      padding:
                        "6px 12px",
                      borderRadius:
                        "20px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    {user.role}
                  </span>
                </div>
              </div>

              <div
                style={{
                  borderTop:
                    "1px solid #374151",
                  paddingTop: "15px",
                  display: "grid",
                  gridTemplateColumns:
                    "1fr 1fr",
                  gap: "15px",
                }}
              >
                <div>
                  <p
                    style={{
                      color:
                        "lightgray",
                      fontSize: "12px",
                      marginBottom:
                        "5px",
                    }}
                  >
                    CART ITEMS
                  </p>

                  <p
                    style={{
                      color:
                        "#f59e0b",
                      fontSize: "28px",
                      fontWeight: "bold",
                    }}
                  >
                    {getUserCartCount(
                      user.email
                    )}
                  </p>
                </div>

                <div>
                  <p
                    style={{
                      color:
                        "lightgray",
                      fontSize: "12px",
                      marginBottom:
                        "5px",
                    }}
                  >
                    STATUS
                  </p>

                  <p
                    style={{
                      color:
                        "#10b981",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    Active
                  </p>
                </div>
              </div>

              <button
                style={{
                  width: "100%",
                  marginTop: "15px",
                  padding: "10px",
                  backgroundColor:
                    "#374151",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Users;