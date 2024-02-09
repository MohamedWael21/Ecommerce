import mongoose from "mongoose";

export interface Image {
  public_id: string;
  url: string;
}

interface Review {
  name: string;
  rating: number;
  comment: string;
  user: mongoose.Schema.Types.ObjectId;
  _id: mongoose.Schema.Types.ObjectId;
}

export interface Product {
  name: string;
  description: string;
  price: number;
  rating: number;
  images: Image[];
  category: string;
  stock: number;
  reviews: Review[];
  // user: mongoose.Schema.Types.ObjectId;
  numOfReviews: number;
}
