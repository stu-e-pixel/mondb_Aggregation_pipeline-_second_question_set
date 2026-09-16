const statuscode = require("../../utils/statuscode");
const Order = require("../../model/order");
class OrderController {
  async createorder(req, res) {
    try {
      const { userId, totalAmount } = req.body;

      const newOrder = new Order({
        userId,
        totalAmount,
        status: "pending",
      });

      const OrderData = await newOrder.save();
      if (!OrderData) {
        return res.status(statuscode.NOT_FOUND).json({
          status: false,
          message: "Product is not Ordered",
        });
      } else {
        return res.status(statuscode.OK).json({
          status: true,
          message: "Product ordered succefully",
          data: OrderData,
        });
      }
    } catch (error) {
      return res.status(statuscode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }

  async getAllOrder(req, res) {
    try {
      const OrderData = await Order.find()
        .populate("userId", "name email city")
        .sort({ createdAt: -1 });

      if (!OrderData) {
        return res.status(statuscode.NOT_FOUND).json({
          status: false,
          message: "Product is not Ordered",
        });
      } else {
        return res.status(statuscode.OK).json({
          status: true,
          message: "Product ordered succefully",
          data: OrderData,
        });
      }
    } catch (error) {
      return res.status(statuscode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }
  async getOrderById(req, res) {
    try {
      const { id } = req.params;
      const OrderData = await Order.findById({ id });

      if (!OrderData) {
        return res.status(statuscode.NOT_FOUND).json({
          status: false,
          message: "Product is not Ordered",
        });
      } else {
        return res.status(statuscode.OK).json({
          status: true,
          message: "Product ordered succefully",
          data: OrderData,
        });
      }
    } catch (error) {
      return res.status(statuscode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }

  async updateOrder(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const OrderData = await Order.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true },
      );

      if (!OrderData) {
        return res.status(statuscode.NOT_FOUND).json({
          status: false,
          message: "Product is not Ordered",
        });
      } else {
        return res.status(statuscode.OK).json({
          status: true,
          message: "Product ordered succefully",
          data: OrderData,
        });
      }
    } catch (error) {
      return res.status(statuscode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }

  async getOrderStats(req, res) {
    try {
      const data = await Order.aggregate([
        //question 2
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $project: {
            totalAmount: 1,
            status: 1,
            user: {
              name: 1,
              email: 1,
            },
          },
        },

        //question 5
        // {
        //   $lookup: {
        //     from: "orderitems",
        //     localField: "_id",
        //     foreignField: "orderId",
        //     as: "orderItems",
        //   },
        // },

        //question 6
        // {
        //   $lookup: {
        //     from: "orderitems",
        //     localField: "_id",
        //     foreignField: "orderId",
        //     as: "orderItems",
        //   },
        // },
        // {
        //   $unwind: "$orderItems",
        // },
        // {
        //   $lookup: {
        //     from: "products",
        //     localField: "orderItems.productId",
        //     foreignField: "_id",
        //     as: "product",
        //   },
        // },
        // {
        //   $unwind: "$product",
        // },

        //question 7

        // {
        //   $lookup: {
        //     from: "users",
        //     localField: "userId",
        //     foreignField: "_id",
        //     as: "users",
        //   },
        // },
        // {
        //   $unwind:"$users"
        // },

        // {
        //   $lookup:{
        //     from:"orderitems",
        //     localField:"_id",
        //     foreignField:"orderId",
        //     as:"orderItems"
        //   }
        // },
        // {
        //   $unwind:"$orderItems"
        // },
        // {
        //   $lookup:{
        //     from:"products",
        //     localField:"orderItems.productId",
        //     foreignField:"_id",
        //     as:"product"
        //   }
        // },
        // {
        //   $unwind:"$product"
        // },
        //  {
        //   $project:{
        //     totalAmount:1,
        //     status:1,
        //     users:{
        //       name:1,
        //       email:1
        //     },
        //     product:{
        //       productname:1,
        //       price:1,
        //       quantity:"$orderItems.quantity"
        //     }
        //   }
        // },

        //question : 8
        // {
        //   $lookup: {
        //     from: "payments",
        //     localField: "_id",
        //     foreignField: "orderId",
        //     as: "payment",
        //   },
        // },
        // {
        //   $unwind: "$payment",
        // },
        // {
        //   $project: {
        //     totalAmount: 1,
        //     status: 1,
        //     paymentStatus: "$payment.status",
        //   },
        // },

        // question:9

        //  {
        //   $lookup: {
        //     from: "payments",
        //     localField: "_id",
        //     foreignField: "orderId",
        //     as: "payment",
        //   },
        // },
        // {
        //   $unwind: "$payment",
        // },
        // {
        //   $match:{
        //     "payment.status":{$ne:"paid"}
        //   }
        // }

        //question 11

        // {
        //   $group:{
        //     _id:null,
        //     totalRevenue:{
        //       $sum:"$totalAmount"
        //     }

        //   }
        // }

        //question 12
        // {
        //   $group:{
        //     _id:"$userId",
        //     totalOrders:{
        //       $sum:1
        //     }
        //   }
        // }

        //question 13
        // {
        //   $group:{
        //     _id:"$userId",
        //     avarageOrderValue:{
        //       $avg:"$totalAmount"
        //     }
        //   }
        // }

        //question 14

        // {
        //   $group:{
        //     _id:null,
        //     maximumOrderValue:{
        //       $max:"$totalAmount"
        //     }
        //   }
        // }

        //question 15
        // {
        //   $group:{
        //     _id:"$status",
        //     totalOrders:{
        //       $sum:1
        //     }
        //   }
        // }

        //question 16
        // {
        //   $group:{
        //     _id:{
        //       year:{
        //         $year:"$createdAt"
        //       },
        //       month:{
        //         $month:"$createdAt"
        //       }
        //     },
        //     monthlyRevenue:{
        //       $sum:"$totalAmount"
        //     }
        //   }
        // },
        // {
        //   $sort:{
        //     "_id.year":1,
        //     "_id.month":1
        //   }
        // }

        //question 17

        // {
        //   $group:{
        //     _id:"$userId",
        //     totalSpending:{
        //       $sum:"$totalAmount"
        //     }
        //   }
        // },
        // {
        //   $sort:{
        //     totalSpending:-1
        //   }
        // },
        // {
        //   $limit:5
        // }

        //question 25
        // {
        //   $group: {
        //     _id: "$userId",
        //     totalRevenue: {
        //       $sum: "$totalAmount",
        //     },
        //   },
        // },
        // {
        //   $lookup: {
        //     from: "users",
        //     localField: "_id",
        //     foreignField: "_id",
        //     as: "user",
        //   },
        // },
        // {
        //   $unwind: "$user",
        // },
        // {
        //   $project: {
        //     _id: 0,
        //     userId: "$_id",
        //     name: "$user.name",
        //     email: "$user.email",
        //     totalRevenue: 1,
        //   },
        // },

        //question 26
        // {
        //   $group:{
        //     _id:"$userId",
        //     totalOrders:{
        //       $sum:1
        //     }
        //   },

        // },
        // {
        //   $match:{
        //     totalOrders:{
        //       $gt:1
        //     }
        //   },
        // },
        // {
        //   $lookup:{
        //     from:"users",
        //     localField:"_id",
        //     foreignField:"_id",
        //     as:"user"
        //   }
        // },
        // {
        //   $unwind:"$user"
        // },
        // {
        //   $project:{
        //     _id:0,
        //     name:"$user.name",
        //     email:"$user.email",
        //     totalOrders:1
        //   }
        // }

        //question 27
        // {
        //   $match: {
        //     createdAt: {
        //       $exists: true,
        //       $ne: null,
        //     },
        //   },
        // },
        // {
        //   $group: {
        //     _id: {
        //       year: { $year: { $toDate: "$createdAt" } },
        //       month: { $month: { $toDate: "$createdAt" } },
        //       day: { $dayOfMonth: { $toDate: "$createdAt" } },
        //     },
        //     totalRevenue: {
        //       $sum: "$totalAmount",
        //     },
        //   },
        // },
        // {
        //   $sort: {
        //     "_id.year": 1,
        //     "_id.month": 1,
        //     "_id.day": 1,
        //   },
        // },

        //question 28
        // {
        //   $lookup:{
        //     from:"payments",
        //     localField:"_id",
        //     foreignField:"orderId",
        //     as:"payments"
        //   }
        // },
        // {
        //   $unwind:"$payments"
        // },
        // {
        //   $group:{
        //   _id:"$_id",
        //   totalPaidAmmount:{
        //     $sum:"$payments.amount"
        //   }
        //   }
        // }
      ]);

      if (!data) {
        return res.status(statuscode.NOT_FOUND).json({
          status: false,
          message: "User not fetched successfully",
        });
      } else {
        return res.status(statuscode.OK).json({
          status: false,
          message: "User statistics fetched successfully",
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
module.exports = new OrderController();
