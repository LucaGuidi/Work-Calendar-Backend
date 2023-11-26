const express = require("express");
const Product = require("../models/product");
const mongoose = require("mongoose");
const router = express.Router();

// Get Products list
router.get("/", (req, res, next) => {
  Product.find()
    .exec()
    .then((docs) => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch((error) => {
      console.log(error);
      res.status(200).json({ error: error });
    });
});

// Add new Product
router.post("/", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        createdProduct: result,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    });
});

// Get Product by ID
router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  Product.findById(id)
    .exec()
    .then((doc) => {
      console.log(doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(200).json({
          message: "No valid entry found for provided ID",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    });
});

// Patch Product from ID - NOT WORKING
router.patch("/:id", (req, res, next) => {
  const id = req.body.id;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] + ops.value;
  }
  Product.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    });
});

// Delete Product by ID
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  Product.deleteOne({ _id: id })
    .exec()
    .then((result) => res.status(200).json(result))
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

module.exports = router;
