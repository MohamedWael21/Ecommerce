import Product from "../models/prodcuts";
import MyError from "../utils/MyError";
import catchAsyncError from "../middleware/catchAsyncError";
import ApiFeatures from "../utils/ApiFeatures";
import { Review } from "../types/products";
import { v2 as cloudinary } from "cloudinary";
import { NextFunction, Request, Response } from "express";

export const createProduct = catchAsyncError(
  async (req: Request, res: Response) => {
    let images: string[] = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    const imagesLink: { url: string; public_id: string }[] = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i], {
        folder: "products",
      });
      imagesLink.push({ url: result.secure_url, public_id: result.public_id });
    }

    req.body.images = imagesLink;
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
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter();

    let filterdProductsCount = (await apiFeature.query.clone()).length;
    apiFeature.pagination(resultPerPage);
    const products = await apiFeature.query;
    res.status(200).json({
      success: true,
      products,
      productsCount,
      resultPerPage,
      filterdProductsCount,
    });
  }
);

// get all products for admin
export const getAdminProducts = catchAsyncError(
  async (req: Request, res: Response) => {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      products,
    });
  }
);

export const updateProduct = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    let product = await Product.findById(id);
    if (!product) {
      return next(new MyError("Product not Found", 404));
    }

    let images: string[] = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    // when request include update in image
    if (images) {
      for (let i = 0; i < product.images.length; i++) {
        await cloudinary.uploader.destroy(product.images[i].public_id);
      }
      const imagesLink: { url: string; public_id: string }[] = [];

      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.uploader.upload(images[i], {
          folder: "products",
        });
        imagesLink.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }

      req.body.images = imagesLink;
    }

    product = await Product.findByIdAndUpdate(id, req.body, {
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
    const product = await Product.findById(id);
    if (!product) {
      return next(new MyError("Product not Found", 404));
    }

    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.uploader.destroy(product.images[i].public_id);
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
