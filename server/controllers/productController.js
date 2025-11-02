import cloudinary from "../config/cloudinary.js";
import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const { name, image, newPrice, oldPrice, description, countInStock } =
      req.body;
    let imageUrl = "";
    if (image) {
      const result = await cloudinary.uploader.upload(image, {
        folder: "e-commerce_pics",
      });
      imageUrl = result.secure_url;
    }
    const product = await Product.create({
      name,
      image: imageUrl,
      newPrice,
      oldPrice,
      description,
      countInStock,
      user: req.user._id,
    });
    res.status(201).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "server error", error: error.message });
  }
};

export const getAllProducts =async (req,res) => {
    try {
        const products =await Product.find({})
        if(!products){
            return res.status(404).json({message:"Products not found!"})
        }
        res.status(200).json(products)
    } catch (error) {
       console.log(error.message);
    res.status(500).json({ message: "server error", error: error.message }); 
    }
}

export const getProduct =async (req,res) => {
    try {
        const product =await Product.findById(req.params.id)
        if(!product){
            return res.status(404).json({message:"Product not found!"})
        }
        res.status(200).json(product)
    } catch (error) {
       console.log(error.message);
    res.status(500).json({ message: "server error", error: error.message }); 
    }
}

export const deleteProduct =async (req,res) => {
    try {
        const product =await Product.findById(req.params.id)
        if(!product){
            return res.status(404).json({message:"Product not found!"})
        }
        await product.deleteOne()
        return res.status(200).json({message:"product deleted!"})
    } catch (error) {
         console.log(error.message);
    res.status(500).json({ message: "server error", error: error.message }); 
    }
}

export const updateProduct =async (req,res) => {
  const { name, image, newPrice, oldPrice, description, countInStock } =
      req.body;
    try {
        const product =await Product.findById(req.params.id)
        if(!product){
            return res.status(404).json({message:"Product not found!"})
        }
      product.name =name || product.name;
      product.description =description || product.description;
      product.countInStock =countInStock || product.countInStock;
      product.newPrice =newPrice || product.newPrice;
      product.oldPrice =oldPrice || product.oldPrice;
      
      if(image && product.image !== image){
        await cloudinary.uploader.destroy(image, {folder:"e-commerce_pics"});
        const result =await cloudinary.uploader.upload(image, {folder:"e-commerce_pics"});
        product.image = result.secure_url;
      }
      const updatedProduct = await product.save()
        res.status(200).json(updatedProduct)
    } catch (error) {
       console.log(error.message);
    res.status(500).json({ message: "server error", error: error.message }); 
    }
}

