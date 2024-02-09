import app from "./app";
import dotenv from "dotenv";
import connectToDb from "./config/database";
// read config file
dotenv.config({ path: "./config/config.env" });

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
