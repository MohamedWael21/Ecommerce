import { Query } from "mongoose";
import { ParsedQs } from "qs";
import { Product } from "../types/products";
class ApiFeatures {
  query: Query<Product[], Product>;
  queryStr: ParsedQs;
  constructor(query: Query<Product[], Product>, queryStr: ParsedQs) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => {
      delete queryCopy[key];
    });

    // filter for pricing and rating
    let queryFiltered = JSON.stringify(queryCopy).replace(
      /(gt|gte|lt|lte)/g,
      (key) => `$${key}`
    );

    this.query = this.query.find(JSON.parse(queryFiltered));
    return this;
  }

  pagination(resutlPerPage: number) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resutlPerPage * (currentPage - 1);

    this.query = this.query.skip(skip).limit(resutlPerPage);
    return this;
  }
}

export default ApiFeatures;
