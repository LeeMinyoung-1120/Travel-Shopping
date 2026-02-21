const express = require("express");
const fs = require("fs").promises;
const path = require("path");

const router = express.Router();

// product.json 경로
const productFilePath = path.join(__dirname, "../data/product.json");

// 전체 상품 조회
router.get("/", async (req, res) => {
  try {
    const data = await fs.readFile(productFilePath, "utf8");
    const products = JSON.parse(data || "[]");

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "상품 데이터를 불러오는데 실패했습니다.",
    });
  }
});

// 단일 상품 조회
router.get("/:id", async (req, res) => {
  try {
    const data = await fs.readFile(productFilePath, "utf8");
    const products = JSON.parse(data || "[]");

    const product = products.find(
      (item) => item.id === parseInt(req.params.id)
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "상품을 찾을 수 없습니다.",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "상품 데이터를 불러오는데 실패했습니다.",
    });
  }
});

module.exports = router;
