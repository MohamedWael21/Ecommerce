import { processPayment, sendStripeApiKey } from "../controllers/payments";
import { isAuthUser } from "./../middleware/auth";
import express from "express";

const router = express.Router();

router.post("/payment/process", isAuthUser, processPayment);
router.get("/stripeapikey", isAuthUser, sendStripeApiKey);

export default router;
