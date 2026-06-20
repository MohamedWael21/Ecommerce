import axios from "axios";
import mongoose from "mongoose";
import dotenv from "dotenv";
import ProductModel from "../models/prodcuts";
import UserModel from "../models/users";
import OrderModel from "../models/orders";

// Path to config file
dotenv.config({ path: "config/config.env" });

const seedDatabase = async () => {
  try {
    // Connect to DB
    await mongoose.connect(process.env.DB_URL!);
    console.log("Connected to database for seeding...");

    // 1. Clear existing data
    await ProductModel.deleteMany();
    await UserModel.deleteMany();
    await OrderModel.deleteMany();
    console.log("Deleted existing data...");

    // 2. Seed Users
    const users = [
      {
        name: "Admin User",
        email: "admin@gmail.com",
        password: "password123",
        role: "admin",
      },
      {
        name: "Test User",
        email: "user@gmail.com",
        password: "password123",
        role: "user",
      },
    ];

    const createdUsers = await UserModel.create(users);
    console.log("Users seeded...");

    // 3. Seed Products from DummyJSON
    const { data } = await axios.get("https://dummyjson.com/products?limit=50");
    const dummyProducts = data.products;

    const products = dummyProducts.map((p: any) => ({
      name: p.title,
      description: p.description,
      price: p.price,
      rating: p.rating,
      images: p.images.map((img: string) => ({
        public_id: `products/${Math.random().toString(36).substring(7)}`,
        url: img,
      })),
      category: p.category,
      stock: p.stock,
      numOfReviews: p.reviews?.length || 0,
      reviews: (p.reviews || []).map((rev: any) => ({
        user: createdUsers[1]._id,
        name: rev.reviewerName || "Anonymous",
        rating: rev.rating || 5,
        comment: rev.comment || "Great product!",
      })),
    }));

    const createdProducts = await ProductModel.create(products);
    console.log("Products seeded...");

    // 4. Seed some Orders
    const orders = [
      {
        shippingInfo: {
          address: "123 Main St",
          city: "Cairo",
          state: "Cairo",
          country: "Egypt",
          pinCode: 11511,
          phoneNo: 1234567890,
        },
        orderItems: [
          {
            name: createdProducts[0].name,
            price: createdProducts[0].price,
            quantity: 1,
            image: createdProducts[0].images[0].url,
            product: createdProducts[0]._id,
          },
        ],
        user: createdUsers[1]._id,
        paymentInfo: {
          id: "pi_123456789",
          status: "succeeded",
        },
        paidAt: new Date(),
        itemsPrice: createdProducts[0].price,
        taxPrice: 0,
        shippingPrice: 0,
        totalPrice: createdProducts[0].price,
        orderStatus: "Processing",
      },
    ];

    await OrderModel.create(orders);
    console.log("Orders seeded...");

    console.log("Database seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
};

seedDatabase();
