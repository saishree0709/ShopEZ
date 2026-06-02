const Product = require("../models/product.js");

const deleteProduct = async (req, res) => {
  try {

    const product = await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Product deleted",
      product
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  deleteProduct
};