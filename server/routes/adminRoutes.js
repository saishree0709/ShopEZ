const express = require("express");

const {
  deleteProduct
} = require("../controllers/adminController");

const router = express.Router();

router.delete("/product/:id", deleteProduct);

module.exports = router;