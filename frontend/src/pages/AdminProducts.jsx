import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

function AdminProducts() {
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

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] =
    useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");
  const [selectedSort, setSelectedSort] =
    useState("Popularity");
  const [selectedGender, setSelectedGender] =
    useState("All");
  const [editingProduct, setEditingProduct] =
    useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    let storedProducts =
      JSON.parse(
        localStorage.getItem("products")
      ) || [];

    // DEFAULT PRODUCTS (18 items)
    if (storedProducts.length === 0) {
      storedProducts = [
        {
          id: 1,
          name: "iPhone 15 Pro",
          price: 79999,
          category: "Mobiles",
          image:
            "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop",
          gender: "Unisex",
          description:
            "Latest flagship smartphone",
        },
        {
          id: 2,
          name: "Samsung Galaxy S24",
          price: 74999,
          category: "Mobiles",
          image:
            "https://images.unsplash.com/photo-1511707267537-b85faf00021e?q=80&w=800&auto=format&fit=crop",
          gender: "Unisex",
          description: "Premium Android phone",
        },
        {
          id: 3,
          name: "OnePlus 12",
          price: 49999,
          category: "Mobiles",
          image:
            "https://images.unsplash.com/photo-1556656793-08538906a9f8?q=80&w=800&auto=format&fit=crop",
          gender: "Unisex",
          description: "Fast and powerful",
        },
        {
          id: 4,
          name: "Gaming Laptop",
          price: 95000,
          category: "Laptops",
          image:
            "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop",
          gender: "Unisex",
          description:
            "RTX 4090 Gaming Beast",
        },
        {
          id: 5,
          name: "MacBook Pro 16",
          price: 189999,
          category: "Laptops",
          image:
            "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop",
          gender: "Unisex",
          description: "Professional workstation",
        },
        {
          id: 6,
          name: "Wireless Headphones",
          price: 4999,
          category: "Electronics",
          image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
          gender: "Unisex",
          description: "Noise cancelling ANC",
        },
        {
          id: 7,
          name: "Smart Watch",
          price: 6999,
          category: "Electronics",
          image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
          gender: "Unisex",
          description: "Fitness tracking watch",
        },
        {
          id: 8,
          name: "Running Shoes",
          price: 2999,
          category: "Fashion",
          image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
          gender: "Unisex",
          description: "Comfortable athletic shoes",
        },
        {
          id: 9,
          name: "Casual T-Shirt",
          price: 499,
          category: "Fashion",
          image:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
          gender: "Men",
          description: "100% cotton comfort fit",
        },
        {
          id: 10,
          name: "Women's Jeans",
          price: 1299,
          category: "Fashion",
          image:
            "https://images.unsplash.com/photo-1542272604-787c62d465d1?q=80&w=800&auto=format&fit=crop",
          gender: "Women",
          description: "Trendy blue denim jeans",
        },
        {
          id: 11,
          name: "Cricket Bat",
          price: 1999,
          category: "Sports",
          image:
            "https://images.unsplash.com/photo-1624880357913-a8539238245b?q=80&w=800&auto=format&fit=crop",
          gender: "Unisex",
          description: "Professional grade bat",
        },
        {
          id: 12,
          name: "Basketball",
          price: 899,
          category: "Sports",
          image:
            "https://images.unsplash.com/photo-1546519638-68711109d298?q=80&w=800&auto=format&fit=crop",
          gender: "Unisex",
          description: "Official size basketball",
        },
        {
          id: 13,
          name: "Yoga Mat",
          price: 599,
          category: "Sports",
          image:
            "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=800&auto=format&fit=crop",
          gender: "Unisex",
          description: "Non-slip yoga mat",
        },
        {
          id: 14,
          name: "Protein Powder",
          price: 1299,
          category: "Grocery",
          image:
            "https://images.unsplash.com/photo-1589952604879-c3a3a7abc97f?q=80&w=800&auto=format&fit=crop",
          gender: "Unisex",
          description: "100% whey protein",
        },
        {
          id: 15,
          name: "Coffee Beans",
          price: 349,
          category: "Grocery",
          image:
            "https://images.unsplash.com/photo-1559056169-641ef0ac8b9d?q=80&w=800&auto=format&fit=crop",
          gender: "Unisex",
          description: "Premium arabica beans",
        },
        {
          id: 16,
          name: "Silver Watch",
          price: 3999,
          category: "Watches",
          image:
            "https://images.unsplash.com/photo-1523170335684-f1b5ae6c52d4?q=80&w=800&auto=format&fit=crop",
          gender: "Men",
          description: "Elegant analog watch",
        },
        {
          id: 17,
          name: "Women's Watch",
          price: 4499,
          category: "Watches",
          image:
            "https://images.unsplash.com/photo-1579077773463-4c38149e9ba8?q=80&w=800&auto=format&fit=crop",
          gender: "Women",
          description: "Luxury fashion watch",
        },
        {
          id: 18,
          name: "Phone Case",
          price: 299,
          category: "Accessories",
          image:
            "https://images.unsplash.com/photo-1592286927505-1def25e52e8d?q=80&w=800&auto=format&fit=crop",
          gender: "Unisex",
          description: "Protective phone case",
        },
      ];

      localStorage.setItem(
        "products",
        JSON.stringify(storedProducts)
      );
    }

    setProducts(storedProducts);
    applyFilters(storedProducts);
  }, []);

  const applyFilters = (productList) => {
    let filtered = productList;

    // Filter search
    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    // Filter category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (p) => p.category === selectedCategory
      );
    }

    // Filter gender
    if (selectedGender !== "All") {
      filtered = filtered.filter(
        (p) => p.gender === selectedGender
      );
    }

    // Sort
    if (selectedSort === "Price low to high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (
      selectedSort === "Price high to low"
    ) {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  };

  const handleFilterChange = () => {
    applyFilters(products);
  };

  const startEdit = (product) => {
    setEditingProduct(product.id);
    setEditForm({ ...product });
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setEditForm({});
  };

  const saveEdit = () => {
    const updatedProducts = products.map(
      (p) =>
        p.id === editForm.id ? editForm : p
    );
    setProducts(updatedProducts);
    localStorage.setItem(
      "products",
      JSON.stringify(updatedProducts)
    );
    applyFilters(updatedProducts);
    setEditingProduct(null);
    alert("Product updated successfully");
  };

  const deleteProduct = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this product?"
      )
    ) {
      const updatedProducts = products.filter(
        (p) => p.id !== id
      );
      setProducts(updatedProducts);
      localStorage.setItem(
        "products",
        JSON.stringify(updatedProducts)
      );
      applyFilters(updatedProducts);
      alert("Product deleted successfully");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#374151",
      }}
    >
      <AdminNavbar activePage="products" />

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
          Products
        </h1>

        <div
          style={{
            display: "flex",
            gap: "30px",
          }}
        >
          {/* LEFT SIDEBAR FILTERS */}

          <div
            style={{
              width: "220px",
              backgroundColor: "#111111",
              padding: "25px",
              borderRadius: "12px",
              height: "fit-content",
              boxShadow:
                "0px 4px 12px rgba(0,0,0,0.3)",
            }}
          >
            <h2
              style={{
                color: "#f59e0b",
                fontSize: "18px",
                marginBottom: "20px",
                borderBottom:
                  "2px solid #f59e0b",
                paddingBottom: "10px",
              }}
            >
              FILTERS
            </h2>

            {/* SORT */}

            <div style={{ marginBottom: "25px" }}>
              <h3
                style={{
                  color: "white",
                  fontSize: "14px",
                  marginBottom: "12px",
                }}
              >
                SORT BY
              </h3>

              <select
                value={selectedSort}
                onChange={(e) => {
                  setSelectedSort(e.target.value);
                  handleFilterChange();
                }}
                style={filterSelectStyle}
              >
                <option>Popularity</option>
                <option>
                  Price low to high
                </option>
                <option>
                  Price high to low
                </option>
                <option>Discount</option>
              </select>
            </div>

            {/* CATEGORIES */}

            <div style={{ marginBottom: "25px" }}>
              <h3
                style={{
                  color: "white",
                  fontSize: "14px",
                  marginBottom: "12px",
                }}
              >
                CATEGORIES
              </h3>

              {[
                "All",
                "Mobiles",
                "Laptops",
                "Electronics",
                "Fashion",
                "Sports",
                "Grocery",
                "Watches",
                "Accessories",
              ].map((cat) => (
                <label
                  key={cat}
                  style={{
                    display: "block",
                    color: "lightgray",
                    marginBottom: "10px",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="radio"
                    name="category"
                    checked={
                      selectedCategory === cat
                    }
                    onChange={() => {
                      setSelectedCategory(cat);
                      handleFilterChange();
                    }}
                    style={{
                      marginRight: "8px",
                    }}
                  />
                  {cat}
                </label>
              ))}
            </div>

            {/* GENDER */}

            <div>
              <h3
                style={{
                  color: "white",
                  fontSize: "14px",
                  marginBottom: "12px",
                }}
              >
                GENDER
              </h3>

              {[
                "All",
                "Men",
                "Women",
                "Unisex",
              ].map((gen) => (
                <label
                  key={gen}
                  style={{
                    display: "block",
                    color: "lightgray",
                    marginBottom: "10px",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="radio"
                    name="gender"
                    checked={
                      selectedGender === gen
                    }
                    onChange={() => {
                      setSelectedGender(gen);
                      handleFilterChange();
                    }}
                    style={{
                      marginRight: "8px",
                    }}
                  />
                  {gen}
                </label>
              ))}
            </div>
          </div>

          {/* PRODUCTS GRID */}

          <div style={{ flex: 1 }}>
            {/* SEARCH */}

            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                handleFilterChange();
              }}
              style={{
                width: "100%",
                padding: "15px",
                marginBottom: "30px",
                backgroundColor: "#111111",
                border:
                  "1px solid #374151",
                borderRadius: "8px",
                color: "white",
                fontSize: "16px",
                outline: "none",
              }}
            />

            {/* PRODUCTS COUNT */}

            <p
              style={{
                color: "lightgray",
                marginBottom: "20px",
              }}
            >
              Showing {filteredProducts.length} of{" "}
              {products.length} products
            </p>

            {/* PRODUCTS */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(250px, 1fr))",
                gap: "25px",
              }}
            >
            {filteredProducts.map(
              (product) => (
                <div
                  key={product.id}
                  style={{
                    backgroundColor:
                      "#111111",
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow:
                      "0px 4px 12px rgba(0,0,0,0.3)",
                    transition: "0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-8px)";
                    e.currentTarget.style.boxShadow =
                      "0px 8px 20px rgba(245, 158, 11, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0px 4px 12px rgba(0,0,0,0.3)";
                  }}
                >
                  {editingProduct ===
                  product.id ? (
                    // EDIT FORM
                    <div
                      style={{
                        padding: "20px",
                      }}
                    >
                      <input
                        type="text"
                        value={
                          editForm.name
                        }
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            name: e.target
                              .value,
                          })
                        }
                        style={{
                          width: "100%",
                          padding:
                            "8px",
                          marginBottom:
                            "10px",
                          backgroundColor:
                            "#1f2937",
                          color: "white",
                          border:
                            "1px solid #374151",
                          borderRadius:
                            "5px",
                        }}
                      />

                      <input
                        type="number"
                        value={
                          editForm.price
                        }
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            price: parseInt(
                              e.target.value
                            ),
                          })
                        }
                        style={{
                          width: "100%",
                          padding:
                            "8px",
                          marginBottom:
                            "10px",
                          backgroundColor:
                            "#1f2937",
                          color: "white",
                          border:
                            "1px solid #374151",
                          borderRadius:
                            "5px",
                        }}
                      />

                      <select
                        value={
                          editForm.category
                        }
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            category:
                              e.target.value,
                          })
                        }
                        style={{
                          width: "100%",
                          padding:
                            "8px",
                          marginBottom:
                            "10px",
                          backgroundColor:
                            "#1f2937",
                          color: "white",
                          border:
                            "1px solid #374151",
                          borderRadius:
                            "5px",
                        }}
                      >
                        <option>
                          Mobiles
                        </option>
                        <option>
                          Laptops
                        </option>
                        <option>
                          Electronics
                        </option>
                        <option>
                          Fashion
                        </option>
                        <option>
                          Sports
                        </option>
                        <option>
                          Grocery
                        </option>
                        <option>
                          Watches
                        </option>
                        <option>
                          Accessories
                        </option>
                      </select>

                      <input
                        type="text"
                        value={
                          editForm.image
                        }
                        placeholder="Image URL"
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            image: e.target
                              .value,
                          })
                        }
                        style={{
                          width: "100%",
                          padding:
                            "8px",
                          marginBottom:
                            "10px",
                          backgroundColor:
                            "#1f2937",
                          color: "white",
                          border:
                            "1px solid #374151",
                          borderRadius:
                            "5px",
                          fontSize: "12px",
                        }}
                      />

                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                        }}
                      >
                        <button
                          onClick={saveEdit}
                          style={{
                            flex: 1,
                            padding:
                              "8px",
                            backgroundColor:
                              "#10b981",
                            color: "white",
                            border:
                              "none",
                            borderRadius:
                              "5px",
                            cursor:
                              "pointer",
                          }}
                        >
                          Save
                        </button>

                        <button
                          onClick={
                            cancelEdit
                          }
                          style={{
                            flex: 1,
                            padding:
                              "8px",
                            backgroundColor:
                              "#6b7280",
                            color: "white",
                            border:
                              "none",
                            borderRadius:
                              "5px",
                            cursor:
                              "pointer",
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // PRODUCT VIEW
                    <>
                      <img
                        src={
                          product.image
                        }
                        alt={
                          product.name
                        }
                        style={{
                          width: "100%",
                          height:
                            "200px",
                          objectFit:
                            "cover",
                        }}
                      />

                      <div
                        style={{
                          padding:
                            "20px",
                        }}
                      >
                        <h3
                          style={{
                            color:
                              "white",
                            fontSize:
                              "16px",
                            marginBottom:
                              "8px",
                          }}
                        >
                          {
                            product.name
                          }
                        </h3>

                        <p
                          style={{
                            color:
                              "#f59e0b",
                            fontSize:
                              "18px",
                            fontWeight:
                              "bold",
                            marginBottom:
                              "8px",
                          }}
                        >
                          ₹{" "}
                          {
                            product.price
                          }
                        </p>

                        <p
                          style={{
                            color:
                              "lightgray",
                            fontSize:
                              "14px",
                            marginBottom:
                              "15px",
                          }}
                        >
                          {
                            product.category
                          }
                        </p>

                        <div
                          style={{
                            display:
                              "flex",
                            gap: "10px",
                          }}
                        >
                          <button
                            onClick={() =>
                              startEdit(
                                product
                              )
                            }
                            style={{
                              flex: 1,
                              padding:
                                "10px",
                              backgroundColor:
                                "#3b82f6",
                              color:
                                "white",
                              border:
                                "none",
                              borderRadius:
                                "5px",
                              cursor:
                                "pointer",
                              fontSize:
                                "14px",
                            }}
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              deleteProduct(
                                product.id
                              )
                            }
                            style={{
                              flex: 1,
                              padding:
                                "10px",
                              backgroundColor:
                                "#ef4444",
                              color:
                                "white",
                              border:
                                "none",
                              borderRadius:
                                "5px",
                              cursor:
                                "pointer",
                              fontSize:
                                "14px",
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const filterSelectStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#1f2937",
  color: "white",
  border: "1px solid #374151",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "14px",
};

export default AdminProducts;