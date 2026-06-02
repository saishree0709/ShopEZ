import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import api from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);

  const [search, setSearch] =
    useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [sortOption, setSortOption] =
    useState("");

  const [selectedClothing, setSelectedClothing] =
    useState("All");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // LOCAL PRODUCTS

      const localProducts =
        JSON.parse(
          localStorage.getItem("products")
        );

      if (
        localProducts &&
        localProducts.length > 0
      ) {
        setProducts(localProducts);
        return;
      }

      // API PRODUCTS

      const res = await api.get(
        "/products"
      );

      const updatedProducts =
        res.data.map(
          (product, index) => ({
            ...product,

            category:
              index % 5 === 0
                ? "Electronics"
                : index % 5 === 1
                ? "Mobiles"
                : index % 5 === 2
                ? "Fashion"
                : index % 5 === 3
                ? "Sports"
                : "Accessories",

            clothing:
              index % 3 === 0
                ? "Men"
                : index % 3 === 1
                ? "Women"
                : "Kids",

            image:
              index % 5 === 0
                ? "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600"
                : index % 5 === 1
                ? "https://m.media-amazon.com/images/I/61bK6PMOC3L.jpg"
                : index % 5 === 2
                ? "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
                : index % 5 === 3
                ? "https://images.unsplash.com/photo-1624880357913-a8539238245b?w=600"
                : "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
          })
        );

      localStorage.setItem(
        "products",
        JSON.stringify(updatedProducts)
      );

      setProducts(updatedProducts);
    } catch (error) {
      console.log(error);
    }
  };

  // FILTERS

  let filteredProducts =
    products.filter((product) => {
      const productName =
        product.name || "";

      const productCategory =
        product.category || "";

      const productClothing =
        product.clothing || "";

      const matchesSearch =
        productName
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =
        selectedCategory === "All" ||
        productCategory ===
          selectedCategory;

      const matchesClothing =
        selectedClothing === "All" ||
        productClothing ===
          selectedClothing;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesClothing
      );
    });

  // SORTING

  if (sortOption === "lowToHigh") {
    filteredProducts.sort(
      (a, b) => a.price - b.price
    );
  }

  if (sortOption === "highToLow") {
    filteredProducts.sort(
      (a, b) => b.price - a.price
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
          padding: "30px",
        }}
      >
        {/* TOP */}

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <h1
            style={{
              fontSize: "70px",
              fontWeight: "bold",
            }}
          >
            All Products
          </h1>

          {/* SEARCH */}

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            style={{
              padding: "18px",
              width: "420px",
              borderRadius: "15px",
              border:
                "1px solid lightgray",
              fontSize: "20px",
              outline: "none",
              backgroundColor:
                "white",
            }}
          />
        </div>

        {/* MAIN SECTION */}

        <div
          style={{
            display: "flex",
            gap: "30px",
            marginTop: "35px",
          }}
        >
          {/* SIDEBAR */}

          <div
            style={{
              width: "270px",
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "18px",
              height: "fit-content",
              boxShadow:
                "0px 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <h2
              style={{
                marginBottom: "25px",
                fontSize: "35px",
              }}
            >
              Filters
            </h2>

            {/* SORT */}

            <div
              style={{
                marginBottom: "35px",
              }}
            >
              <h3
                style={{
                  marginBottom: "15px",
                }}
              >
                Sort By
              </h3>

              <div
                style={{
                  display: "grid",
                  gap: "12px",
                }}
              >
                <button
                  onClick={() =>
                    setSortOption(
                      "lowToHigh"
                    )
                  }
                  style={filterBtn}
                >
                  Price Low → High
                </button>

                <button
                  onClick={() =>
                    setSortOption(
                      "highToLow"
                    )
                  }
                  style={filterBtn}
                >
                  Price High → Low
                </button>
              </div>
            </div>

            {/* CATEGORY */}

            <div
              style={{
                marginBottom: "35px",
              }}
            >
              <h3
                style={{
                  marginBottom: "15px",
                }}
              >
                Categories
              </h3>

              <div
                style={{
                  display: "grid",
                  gap: "12px",
                }}
              >
                {[
                  "All",
                  "Mobiles",
                  "Electronics",
                  "Fashion",
                  "Sports",
                  "Accessories",
                ].map((category) => (
                  <button
                    key={category}
                    onClick={() =>
                      setSelectedCategory(
                        category
                      )
                    }
                    style={{
                      ...filterBtn,

                      backgroundColor:
                        selectedCategory ===
                        category
                          ? "#4f46e5"
                          : "white",

                      color:
                        selectedCategory ===
                        category
                          ? "white"
                          : "black",
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* CLOTHING */}

            <div>
              <h3
                style={{
                  marginBottom: "15px",
                }}
              >
                Clothing
              </h3>

              <div
                style={{
                  display: "grid",
                  gap: "12px",
                }}
              >
                {[
                  "All",
                  "Men",
                  "Women",
                  "Kids",
                ].map((type) => (
                  <button
                    key={type}
                    onClick={() =>
                      setSelectedClothing(
                        type
                      )
                    }
                    style={{
                      ...filterBtn,

                      backgroundColor:
                        selectedClothing ===
                        type
                          ? "#4f46e5"
                          : "white",

                      color:
                        selectedClothing ===
                        type
                          ? "white"
                          : "black",
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* PRODUCTS */}

          <div
            style={{
              flex: 1,
            }}
          >
            {/* GRID */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(320px,1fr))",
                gap: "30px",
              }}
            >
              {filteredProducts.length >
              0 ? (
                filteredProducts.map(
                  (product) => (
                    <ProductCard
                      key={
                        product._id ||
                        product.id
                      }
                      product={product}
                    />
                  )
                )
              ) : (
                <h2
                  style={{
                    color: "gray",
                  }}
                >
                  No Products Found
                </h2>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const filterBtn = {
  padding: "12px",
  border:
    "1px solid lightgray",
  borderRadius: "10px",
  cursor: "pointer",
  backgroundColor: "white",
  fontSize: "15px",
  textAlign: "left",
};

export default Products;