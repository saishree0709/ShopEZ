import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const addToCart = () => {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) {
      alert("Please login first");
      return;
    }

    const cartKey = `cart_${user.email}`;

    const existingCart =
      JSON.parse(
        localStorage.getItem(cartKey)
      ) || [];

    existingCart.push({
      ...product,
      quantity: 1,
      selectedSize: "M",
    });

    localStorage.setItem(
      cartKey,
      JSON.stringify(existingCart)
    );

    alert("Product added to cart");

    window.location.reload();
  };

  const openProduct = () => {
    navigate(
      `/product/${
        product.id || product._id
      }`
    );
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "15px",
        boxShadow:
          "0 4px 12px rgba(0,0,0,0.1)",
        transition: "0.3s",
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        onClick={openProduct}
        style={{
          width: "100%",
          height: "250px",
          objectFit: "contain",
          cursor: "pointer",
        }}
      />

      <h2
        onClick={openProduct}
        style={{
          cursor: "pointer",
          marginTop: "15px",
        }}
      >
        {product.name}
      </h2>

      <p
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#111827",
        }}
      >
        ₹ {product.price}
      </p>

      <button
        onClick={addToCart}
        style={{
          marginTop: "10px",
          width: "100%",
          padding: "12px",
          backgroundColor: "#4f46e5",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        Add To Cart
      </button>
    </div>
  );
}

export default ProductCard;