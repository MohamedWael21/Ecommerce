import app from "./app";
import connectToDb from "./config/database";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
connectToDb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Server is Listening on http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

// unhandled rejection promise
process.on("unhandledRejection", (err: Error) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to Unhandled promise Rejection");
  process.exit(1);
});

// unhandled exception
process.on("uncaughtException", (err: Error) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to UnCaught Exception");
  process.exit(1);
});
