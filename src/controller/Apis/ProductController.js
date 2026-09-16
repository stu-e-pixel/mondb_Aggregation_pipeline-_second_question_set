const statuscode = require("../../utils/statuscode");
const Product = require("../../model/product");
class ProductController {
  async createProduct(req, res) {
    try {
      const { productname, category, price } = req.body;
      const product = new Product({
        productname: productname,
        category: category,
        price: price,
      });

      const productdata = await product.save();
      if (!productdata) {
        return res.status(statuscode.NOT_FOUND).json({
          status: false,
          message: "product is not created",
        });
      } else {
        return res.status(statuscode.OK).json({
          status: true,
          message: "Product created succesfully",
          product: productdata,
        });
      }
    } catch (error) {
      return res.status(statuscode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }

  async getAllProduct(req, res) {
    try {
      const productdata = await Product.find();
      if (!productdata) {
        return res.status(statuscode.NOT_FOUND).json({
          status: false,
          message: "product is not created",
        });
      } else {
        return res.status(statuscode.OK).json({
          status: true,
          message: "Product created succesfully",
          product: productdata,
        });
      }
    } catch (error) {
      return res.status(statuscode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }
  async ProductStats(req, res) {
    try {
      const data = await Product.aggregate([
        //question 29
        {
          $lookup: {
            from: "ordeitems",
            localField: "_id",
            foreignField: "productId",
            as: "orderItems",
          },
        },
        {
          $match: {
            orderItems: {
              $size: 0,
            },
          },
        },
        {
          $project: {
            _id: 1,
            productname: 1,
            category: 1,
            price: 1,
          },
        },
      ]);

      if (!data) {
        return res.status(statuscode.NOT_FOUND).json({
          status: false,
          message: "Product not fetched successfully",
        });
      } else {
        return res.status(statuscode.OK).json({
          status: false,
          message: "Product statistics fetched successfully",
          data: data,
        });
      }
    } catch (error) {
      return res.status(statuscode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }
}

module.exports = new ProductController();
