import express, { Express } from "express";
import productsRoutes from "./src/routes/products";
import usersRoutes from "./src/routes/users";
import ordersRoutes from "./src/routes/orders";
import handleError from "./src/middleware/handleError";
import cookieParser from "cookie-parser";
import { UserDocument } from "./src/types/users";
import morgan from "morgan";

const app: Express = express();

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1", productsRoutes);
app.use("/api/v1", usersRoutes);
app.use("/api/v1", ordersRoutes);

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
