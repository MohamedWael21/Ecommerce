import express, { Express } from "express";
import productsRoutes from "./src/routes/products";
import usersRoutes from "./src/routes/users";
import ordersRoutes from "./src/routes/orders";
import paymentRoutes from "./src/routes/payment";
import handleError from "./src/middleware/handleError";
import cookieParser from "cookie-parser";
import { UserDocument } from "./src/types/users";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import cors from "cors";
import dotenv from "dotenv";

const app: Express = express();

// read config file
dotenv.config({ path: "./config/config.env" });

app.use(cors({ credentials: true, origin: ["http://localhost:5173"] }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/api/v1", productsRoutes);
app.use("/api/v1", usersRoutes);
app.use("/api/v1", ordersRoutes);
app.use("/api/v1", paymentRoutes);

// handleErrors
app.use(handleError);

// add property user to the request object
declare global {
  namespace Express {
    export interface Request {
      user: UserDocument;
    }
  }
}

export default app;
