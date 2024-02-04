import app from "./app";
import dotenv from "dotenv";

// read config file
dotenv.config({ path: "./config/config.env" });

app.listen(process.env.PORT, () => {
  console.log(`Server is Listening on http://localhos:${process.env.PORT}`);
});
