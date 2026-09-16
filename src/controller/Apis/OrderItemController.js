const statuscode = require("../../utils/statuscode");
const OrderItem = require("../../model/orderItem");

class OrderItemController {
  async createOrderItem(req, res) {
    try {
      const { orderId, productId, quantity, price } = req.body;
      const newOrderItem = new OrderItem({
        orderId,
        productId,
        quantity,
        price,
      });

      const OrderItemData = await newOrderItem.save();

      if (!OrderItemData) {
        return res.status(statuscode.NOT_FOUND).json({
          status: false,
          message: "Product is not created",
        });
      } else {
        return res.status(statuscode.OK).json({
          status: true,
          message: "Product created succefully",
          data: OrderItemData,
        });
      }
    } catch (error) {
      return res.status(statuscode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }

  async getAllOrderItem(req, res) {
    try {
      const data = await OrderItem.find();
      if (!data) {
        return res.status(statuscode.NOT_FOUND).json({
          status: false,
          message: "Product is not created",
        });
      } else {
        return res.status(statuscode.OK).json({
          status: true,
          message: "Product created succefully",
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

  async getItemsByOrderId(req, res) {
    try {
      const { orderId } = req.params;

      const orderItems = await OrderItem.find({
        orderId,
      });

      res.status(statuscode.OK).json({
        status: true,
        data: orderItems,
      });
    } catch (error) {
      res.status(statuscode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }

  async getOrderItemById(req, res) {
    try {
      const { id } = req.params;

      const orderItem = await OrderItem.findById(id);

      if (!orderItem) {
        return res.status(statuscode.NOT_FOUND).json({
          status: false,
          message: "Order item not found",
        });
      }

      res.status(statuscode.OK).json({
        status: true,
        data: orderItem,
      });
    } catch (error) {
      res.status(statuscode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }
  async updateOrderItem(req, res) {
    try {
      const { id } = req.params;

      const orderItem = await OrderItem.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!orderItem) {
        return res.status(statuscode.NOT_FOUND).json({
          status: false,
          message: "Order item not found",
        });
      }

      res.status(statuscode.OK).json({
        status: true,
        message: "Order item updated successfully",
        data: orderItem,
      });
    } catch (error) {
      res.status(statuscode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }

  async orderItemStats(req, res) {
    try {
      const data = await OrderItem.aggregate([
        //question 18
        // {
        //   $lookup: {
        //     from: "products",
        //     localField: "productId",
        //     foreignField: "_id",
        //     as: "product",
        //   },
        // },
        // {
        //   $unwind: "$product",
        // },
        // {
        //   $group: {
        //     _id: "$product.category",
        //     totalProductsSold: {
        //       $sum: "$quantity",
        //     },
        //   },
        // },

        //question 20
        // {
        //   $group:{
        //     _id:"$productId",
        //     totalQuantitySold:{
        //       $sum:"$quantity"
        //     }
        //   }
        // }
        //question 23
        // {
        //   $group: {
        //     _id: "$productId",
        //     totalQuantitySold: {
        //       $sum: "$quantity",
        //     },
        //   },
        // },
        // {
        //   $lookup: {
        //     from: "products",
        //     localField: "_id",
        //     foreignField: "_id",
        //     as: "product",
        //   },
        // },
        // {
        //   $unwind: "$product",
        // },
        // {
        //   $project: {
        //     _id: 0,
        //     productId: "$_id",
        //     productName: "$product.name",
        //     totalQuantitySold: 1,
        //   },
        // },
        // {
        //   $sort: {
        //     totalQuantitySold: -1,
        //   },
        // },

        //question 24

        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $unwind: "$product",
        },
        {
          $group: {
            _id: "$product.category",
            averageOrderValue: {
              $avg: {
                $multiply: ["$quantity", "$price"],
              },
            },
          },
        },
      ]);

      if (!data) {
        return res.status(statuscode.NOT_FOUND).json({
          status: false,
          message: "OrderItem not fetched successfully",
        });
      } else {
        return res.status(statuscode.OK).json({
          status: false,
          message: "OrderItem statistics fetched successfully",
          data: data,
        });
      }
    } catch (error) {
      res.status(statuscode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }
}
module.exports = new OrderItemController();
