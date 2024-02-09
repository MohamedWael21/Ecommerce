import { NextFunction, Request, Response } from "express";
import Product from "../models/prodcuts";
import MyError from "../utils/MyError";
import catchAsyncError from "../middleware/catchAsyncError";
import ApiFeatures from "../utils/ApiFeatures";
import { Review } from "../types/products";

export const createProduct = catchAsyncError(
  async (req: Request, res: Response) => {
    req.body.user = req.user?.id;
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product,
    });
  }
);

export const getAllProducts = catchAsyncError(
  async (req: Request, res: Response) => {
    const resultPerPage = 5;
    const productCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);

    const products = await apiFeature.query;
    res.status(200).json({
      success: true,
      products,
      productCount,
    });
  }
);

export const updateProduct = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const isFound = await Product.findById(id);
    if (!isFound) {
      return next(new MyError("Product not Found", 404));
    }

    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      product,
    });
  }
);

export const deleteProduct = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const isFound = await Product.findById(id);
    if (!isFound) {
      return next(new MyError("Product not Found", 404));
    }
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      succes: true,
      message: "Product Deleted Successfully",
    });
  }
);

export const getProduct = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return next(new MyError("Product not Found", 404));
    }

    res.status(200).json({
      success: true,
      product,
    });
  }
);

// create review or update the review
export const createProductReview = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;
    const { rating, comment } = req.body;
    const review: Omit<Review, "_id"> = {
      name: req.user.name,
      user: req.user.id,
      rating: Number(rating),
      comment,
    };
    const product = await Product.findById(productId);
    if (!product) {
      return next(new MyError("Product not found", 404));
    }

    const isReviewed = product.reviews.find(
      (review) => review.user == req.user.id
    );

    if (isReviewed) {
      product.reviews.forEach((review) => {
        if (review.user == req.user.id) {
          review.rating = rating;
          review.comment = comment;
        }
      });
    } else {
      // new review
      product.reviews.push(review as Review);
      product.numOfReviews = product.reviews.length;
    }

    product.rating = product.reviews.reduce(
      (acc, review) => (acc += review.rating),
      0
    );
    product.rating /= product.reviews.length;

    await product.save();

    res.status(200).json({
      success: true,
    });
  }
);

// get all review of products
export const getProductReview = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new MyError("Product not Found", 404));
    }

    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  }
);

// delete review for product
export const deleteReview = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
      return next(new MyError("Product not Found", 404));
    }

    product.reviews = product.reviews.filter(
      (review) => review._id.toString() != req.query.id
    );

    product.rating = product.reviews.reduce(
      (acc, review) => (acc += review.rating),
      0
    );
    product.rating /= product.reviews.length;

    product.numOfReviews = product.reviews.length;

    await product.save();

    res.status(200).json({
      success: true,
    });
  }
);
