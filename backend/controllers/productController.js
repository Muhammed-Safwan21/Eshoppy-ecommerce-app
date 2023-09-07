import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

//@desc fetch all products
//@route GET/api/products
//@access Public

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword ? {name:{$regex : req.query.keyword , $options:'i'}} 
  : {} ; 

  const count = await Product.countDocuments({...keyword});

  const products = await Product.find({...keyword})
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

//@desc fetch a product
//@route GET/api/products/:id
//@access Public

const getProductsById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  }
  res.status(404);
  throw new Error("Product Not Found");
});

//@desc create a product
//@route POST/api/products
//@access Private/Admin

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "sample brand",
    category: "sample ctegory",
    countInStock: 0,
    numReviews: 0,
    description: "sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//@desc update a product
//@route PUT/api/products/:id
//@access Privte/Admin

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, brand, category, image, countInStock } =
    req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.brand = brand;
    product.category = category;
    product.image = image;
    product.countInStock = countInStock;

    const updateProduct = await product.save();
    res.json(updateProduct);
  } else {
    res.status(404);
    throw new Error("Resource is not found");
  }
});

//@desc delete a product
//@route DELETE/api/products/:id
//@access Privte/Admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Product Deleted" });
  } else {
    res.status(404);
    throw new Error("Resource is not found");
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//@desc get top 3 products
//@route GET/api/products/top
//@access Public

const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({rating:-1}).limit(3);
  res.status(200).json(products);
});

export {
  getProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts
};
