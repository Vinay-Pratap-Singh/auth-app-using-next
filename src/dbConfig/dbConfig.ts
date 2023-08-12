import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_DB_URL!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Database connected successfully");
    });
    connection.on("error", (error) => {
      console.log("Database connection error\n", error);
      process.exit();
    });
  } catch (error) {
    console.log("Database connection failed \n", error);
  }
};
