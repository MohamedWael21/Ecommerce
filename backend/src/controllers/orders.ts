import Product from "../models/prodcuts";
import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../middleware/catchAsyncError";
import Order from "../models/orders";
import MyError from "../utils/MyError";
import mongoose from "mongoose";

export const createOrder = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: new Date(),
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      order,
    });
  }
);

// get single order
export const getOrder = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return next(new MyError("Order Not Found", 404));
    }

    res.status(201).json({
      success: true,
      order,
    });
  }
);

// get loged in user orders
export const myOrders = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const orders = await Order.find({ user: req.user.id });

    res.status(201).json({
      success: true,
      orders,
    });
  }
);

// get all orders --admin
export const getAllOrdes = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const orders = await Order.find();
    let totalAmount = 0;

    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });
    res.status(201).json({
      success: true,
      orders,
      totalAmount,
    });
  }
);

// update order status --admin
export const updateOrder = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return next(new MyError("Order Not Found", 404));
    }
    if (order.orderStatus === "Delivered") {
      return next(new MyError("You have already delivered this order", 400));
    }
    order.orderItems.forEach(async (order) => {
      await updateStock(order.product, order.quantity);
    });
    order.orderStatus = req.body.status;
    if (order.orderStatus == "Delivered") {
      order.deliveredAt = new Date();
    }
    await order.save();
    res.status(201).json({
      success: true,
      order,
    });
  }
);

async function updateStock(
  productId: mongoose.Schema.Types.ObjectId,
  quantity: number
) {
  const product = await Product.findById(productId);
  if (product) {
    product.stock -= quantity;
    await product.save();
  }
}

// delete order --admin
export const deleteOrder = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    let order = await Order.findById(req.params.id);
    if (!order) {
      return next(new MyError("Order Not Found", 404));
    }
    order = await Order.findByIdAndDelete(req.params.id);
    res.status(201).json({
      success: true,
    });
  }
);
