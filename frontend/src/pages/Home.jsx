import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {

  const navigate = useNavigate();

  return (
    <div>
      <Navbar />

      <div
        style={{
          padding: "20px",
        }}
      >
        <img
          src={
  localStorage.getItem("bannerImage") ||
  "https://img.freepik.com/free-vector/super-sale-banner-template-design_1017-31299.jpg"
}
          alt="banner"
          style={{
            width: "100%",
            height: "350px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />

        <h2
          style={{
            marginTop: "20px",
          }}
        >
          Categories
        </h2>

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "150px",
              textAlign: "center",
            }}
          >
            Mobiles
          </div>

          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "150px",
              textAlign: "center",
            }}
          >
            Electronics
          </div>

          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "150px",
              textAlign: "center",
            }}
          >
            Fashion
          </div>

          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "150px",
              textAlign: "center",
            }}
          >
            Sports
          </div>
        </div>

        <button
          onClick={() => navigate("/products")}
          style={{
            marginTop: "30px",
            padding: "12px 20px",
            backgroundColor: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
}

export default Home;