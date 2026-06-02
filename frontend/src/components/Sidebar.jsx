function Sidebar() {
  return (
    <div
      style={{
        width: "250px",
        backgroundColor: "white",
        padding: "20px",
        minHeight: "100vh",
        borderRight: "1px solid #ddd",
      }}
    >
      <h2>Filters</h2>

      <div style={{ marginTop: "30px" }}>
        <h3>Categories</h3>

        <div style={{ marginTop: "15px" }}>
          <p>📱 Mobiles</p>

          <p>💻 Electronics</p>

          <p>👕 Fashion</p>

          <p>🏏 Sports</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;