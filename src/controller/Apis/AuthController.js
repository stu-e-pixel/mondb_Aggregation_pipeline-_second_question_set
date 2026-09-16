const statuscode = require("../../utils/statuscode");
const User = require("../../model/user");

class AuthController {
  async createUser(req, res) {
    try {
      const { name, email, city } = req.body;
      const existuser = await User.findOne({ email });
      if (existuser) {
        return res.status(statuscode.NOT_FOUND).json({
          status: false,
          message: "User Already Exist",
        });
      }

      const newUser = new User({
        name: name,
        email: email,
        city: city,
      });

      const data = await newUser.save();

      if (!data) {
        return res.status(statuscode.NOT_FOUND).json({
          status: false,
          message: "user is not created",
        });
      } else {
        return res.status(statuscode.OK).json({
          status: true,
          message: "user is created succesfully",
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

  async getAllUser(req, res) {
    try {
      const user = await User.find();
      if (!user) {
        return res.status(statuscode.NOT_FOUND).json({
          status: false,
          message: "user is not found",
        });
      } else {
        return res.status(statuscode.OK).json({
          status: true,
          message: "All users",
          data: user,
        });
      }
    } catch (error) {
      return res.status(statuscode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }
  async getUserState(req, res) {
    try {
      const data = await User.aggregate([
        //question 1
        {
          $lookup: {
            from: "orders",
            localField: "_id",
            foreignField: "userId",
            as: "orders",
          },
        },
        //question 3
        // {
        //     $lookup:{
        //         from:"orders",
        //         localField:"_id",
        //         foreignField:"userId",
        //         as:"orders"
        //     }
        // },
        // {
        //     $match:{
        //         "orders.0":{$exists:true}
        //     }
        // },
        //question 4
        // {
        //     $lookup:{
        //         from:"orders",
        //         localField:"_id",
        //         foreignField:"userId",
        //         as:"orders"
        //     }
        // },
        // {
        //     $match:{
        //         "orders":{$size:0}
        //     }
        // },
        //question:10
        // {
        //   $lookup: {
        //     from: "orders",
        //     let: {
        //       userId: "$_id",
        //     },
        //     pipeline: [
        //       {
        //         $match: {
        //           $expr: {
        //             $eq: ["$userId", "$$userId"],
        //           },
        //         },
        //       },
        //       {
        //         $sort: {
        //           createdAt: -1,
        //         },
        //       },
        //       {
        //         $limit: 1,
        //       },
        //     ],
        //     as: "latestOrder",
        //   },
        // },

        //question 19
        // {
        //     $group:{
        //         _id:"$email",
        //         count:{
        //             $sum:1
        //         },
        //         users:{
        //             $push:"$$ROOT"
        //         }
        //     }
        // },
        // {
        //     $match:{
        //         count:{
        //             $gt:1
        //         }
        //     }
        // }

        //question 21
        // {
        //   $lookup: {
        //     from: "orders",
        //     localField: "_id",
        //     foreignField: "userId",
        //     as: "orders",
        //   },
        // },
        // {
        //   $unwind: "$orders",
        // },

        // {
        //   $group: {
        //     _id: "$_id",
        //     name: { $first: "$name" },
        //     email: { $first: "$email" },
        //     totalSpend: {
        //       $sum: "$orders.totalAmount",
        //     },
        //   },
        // },

        //question 22

        //  {
        //   $lookup: {
        //     from: "orders",
        //     localField: "_id",
        //     foreignField: "userId",
        //     as: "orders",
        //   },
        // },
        // {
        //   $unwind: "$orders",
        // },

        // {
        //   $group: {
        //     _id: "$_id",
        //     name: { $first: "$name" },
        //     email: { $first: "$email" },
        //     totalSpend: {
        //       $sum: "$orders.totalAmount",
        //     },
        //   },
        // },

        // {
        //     $match:{
        //         totalSpend:{
        //             $gt:50000
        //         }
        //     }
        // }

        //question 30

        // {
        //   $facet: {
        //     totalUsers: [
        //       {
        //         $count: "count",
        //       },
        //     ],
        //     totalOrders: [
        //       {
        //         $lookup: {
        //           from: "orders",
        //           localField: "_id",
        //           foreignField: "userId",
        //           as: "orders",
        //         },
        //       },
        //       {
        //         $unwind: "$orders",
        //       },
        //       {
        //         $count: "count",
        //       },
        //     ],
        //     totalRevenue: [
        //       {
        //         $lookup: {
        //           from: "orders",
        //           localField: "_id",
        //           foreignField: "userId",
        //           as: "orders",
        //         },
        //       },
        //       {
        //         $unwind: "$orders",
        //       },

        //       {
        //         $group: {
        //           _id: null,
        //           totalRevenue: {
        //             $sum: "$orders.totalAmount",
        //           },
        //         },
        //       },
        //     ],
        //     totUser: [
        //       {
        //         $lookup: {
        //           from: "orders",
        //           localField: "_id",
        //           foreignField: "userId",
        //           as: "orders",
        //         },
        //       },
        //       {
        //         $unwind: "$orders",
        //       },
        //       {
        //         $group: {
        //           _id: "$_id",
        //           name: { $first: "$name" },
        //           email: { $first: "$email" },
        //           totalSpending: {
        //             $sum: "$orders.totalAmount",
        //           },
        //         },
        //       },

        //       {
        //         $sort: {
        //           totalSpending: -1,
        //         },
        //       },
        //       {
        //         $limit: 1,
        //       },
        //     ],
        //   },
        // },
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

module.exports = new AuthController();
