import stripe from "stripe";
import catchAsyncError from "../middleware/catchAsyncError";
import { NextFunction, Request, Response } from "express";

export const processPayment = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const api = new stripe(process.env.STRIPE_SECRET_KEY!);

    const myPayment = await api.paymentIntents.create({
      amount: req.body.amount,
      currency: "USD",
      metadata: {
        company: "Ecommerce",
      },
    });

    res
      .status(200)
      .json({ success: true, client_secret: myPayment.client_secret });
  }
);

export const sendStripeApiKey = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
  }
);
