import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

function NewProduct() {
  const navigate = useNavigate();

  // ADMIN PROTECTION

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [navigate]);

  // STATES

  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");

  const [price, setPrice] = useState("");

  const [category, setCategory] =
    useState("Mobiles");

  const [image, setImage] = useState("");

  const [gender, setGender] =
    useState("Unisex");

  const [errors, setErrors] = useState({});

  // VALIDATION

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name =
        "Product name is required";
    }

    if (!price || price <= 0) {
      newErrors.price =
        "Valid price is required";
    }

    if (!image.trim()) {
      newErrors.image =
        "Image URL is required";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  // ADD PRODUCT

  const addProduct = () => {
    if (!validateForm()) {
      return;
    }

    const existingProducts =
      JSON.parse(
        localStorage.getItem("products")
      ) || [];

    const newProduct = {
      id: Date.now(),
      name,
      description,
      price: parseInt(price),
      category,
      image,
      gender,
    };

    const updatedProducts = [
      ...existingProducts,
      newProduct,
    ];

    localStorage.setItem(
      "products",
      JSON.stringify(updatedProducts)
    );

    alert("Product Added Successfully");

    navigate("/admin/products");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#374151",
      }}
    >
      <AdminNavbar activePage="newproduct" />

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
            marginBottom: "40px",
          }}
        >
          Add New Product
        </h1>

        <div
          style={{
            display: "flex",
            gap: "40px",
            maxWidth: "1200px",
          }}
        >
          {/* FORM */}

          <div
            style={{
              flex: 1,
              backgroundColor: "#111111",
              padding: "35px",
              borderRadius: "12px",
              boxShadow:
                "0px 4px 12px rgba(0,0,0,0.3)",
            }}
          >
            <h2
              style={{
                color: "#f59e0b",
                fontSize: "24px",
                marginBottom: "25px",
              }}
            >
              Product Details
            </h2>

            {/* NAME */}

            <div
              style={{
                marginBottom: "25px",
              }}
            >
              <label
                style={{
                  color: "white",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                Product Name *
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);

                  if (errors.name) {
                    setErrors({
                      ...errors,
                      name: "",
                    });
                  }
                }}
                style={{
                  ...inputStyle,

                  border: errors.name
                    ? "2px solid red"
                    : "1px solid #374151",
                }}
                placeholder="iPhone 15"
              />

              {errors.name && (
                <p
                  style={{
                    color: "red",
                    marginTop: "5px",
                  }}
                >
                  {errors.name}
                </p>
              )}
            </div>

            {/* PRICE */}

            <div
              style={{
                marginBottom: "25px",
              }}
            >
              <label
                style={{
                  color: "white",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                Price *
              </label>

              <input
                type="number"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);

                  if (errors.price) {
                    setErrors({
                      ...errors,
                      price: "",
                    });
                  }
                }}
                style={{
                  ...inputStyle,

                  border: errors.price
                    ? "2px solid red"
                    : "1px solid #374151",
                }}
                placeholder="79999"
              />

              {errors.price && (
                <p
                  style={{
                    color: "red",
                    marginTop: "5px",
                  }}
                >
                  {errors.price}
                </p>
              )}
            </div>

            {/* CATEGORY */}

            <div
              style={{
                marginBottom: "25px",
              }}
            >
              <label
                style={{
                  color: "white",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                style={inputStyle}
              >
                <option>Mobiles</option>
                <option>Laptops</option>
                <option>Electronics</option>
                <option>Fashion</option>
                <option>Sports</option>
                <option>Accessories</option>
              </select>
            </div>

            {/* GENDER */}

            <div
              style={{
                marginBottom: "25px",
              }}
            >
              <label
                style={{
                  color: "white",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                Gender
              </label>

              <select
                value={gender}
                onChange={(e) =>
                  setGender(e.target.value)
                }
                style={inputStyle}
              >
                <option>Unisex</option>
                <option>Men</option>
                <option>Women</option>
              </select>
            </div>

            {/* IMAGE */}

            <div
              style={{
                marginBottom: "25px",
              }}
            >
              <label
                style={{
                  color: "white",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                Image URL *
              </label>

              <input
                type="text"
                value={image}
                onChange={(e) => {
                  setImage(e.target.value);

                  if (errors.image) {
                    setErrors({
                      ...errors,
                      image: "",
                    });
                  }
                }}
                style={{
                  ...inputStyle,

                  border: errors.image
                    ? "2px solid red"
                    : "1px solid #374151",
                }}
                placeholder="https://image-url.com"
              />

              {errors.image && (
                <p
                  style={{
                    color: "red",
                    marginTop: "5px",
                  }}
                >
                  {errors.image}
                </p>
              )}
            </div>

            {/* DESCRIPTION */}

            <div
              style={{
                marginBottom: "25px",
              }}
            >
              <label
                style={{
                  color: "white",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                Description
              </label>

              <textarea
                rows="4"
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                style={{
                  ...inputStyle,
                  resize: "none",
                }}
                placeholder="Product description..."
              />
            </div>

            {/* BUTTONS */}

            <div
              style={{
                display: "flex",
                gap: "15px",
              }}
            >
              <button
                onClick={addProduct}
                style={addBtn}
              >
                Add Product
              </button>

              <button
                onClick={() =>
                  navigate("/admin/products")
                }
                style={cancelBtn}
              >
                Cancel
              </button>
            </div>
          </div>

          {/* PREVIEW */}

          {image && (
            <div
              style={{
                flex: 1,
              }}
            >
              <h2
                style={{
                  color: "#f59e0b",
                  marginBottom: "20px",
                }}
              >
                Preview
              </h2>

              <div
                style={{
                  backgroundColor: "#111111",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow:
                    "0px 4px 12px rgba(0,0,0,0.3)",
                }}
              >
                <img
                  src={image}
                  alt="preview"
                  style={{
                    width: "100%",
                    height: "320px",
                    objectFit: "cover",
                  }}
                />

                <div
                  style={{
                    padding: "20px",
                  }}
                >
                  <h2
                    style={{
                      color: "white",
                      marginBottom: "10px",
                    }}
                  >
                    {name || "Product Name"}
                  </h2>

                  <p
                    style={{
                      color: "#f59e0b",
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}
                  >
                    ₹ {price || "0"}
                  </p>

                  <p
                    style={{
                      color: "lightgray",
                      marginTop: "10px",
                    }}
                  >
                    {category}
                  </p>

                  <p
                    style={{
                      color: "lightgray",
                      marginTop: "10px",
                    }}
                  >
                    {gender}
                  </p>

                  <p
                    style={{
                      color: "lightgray",
                      marginTop: "15px",
                      lineHeight: "1.6",
                    }}
                  >
                    {description ||
                      "No description"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// STYLES

const inputStyle = {
  width: "100%",
  padding: "14px",
  backgroundColor: "#1f2937",
  border: "1px solid #374151",
  borderRadius: "6px",
  color: "white",
  fontSize: "15px",
  outline: "none",
};

const addBtn = {
  flex: 1,
  padding: "14px",
  backgroundColor: "#10b981",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
};

const cancelBtn = {
  flex: 1,
  padding: "14px",
  backgroundColor: "#6b7280",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
};

export default NewProduct;