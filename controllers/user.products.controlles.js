// importing all module-------->
const { ProductModel } = require("../models/product.model");



// user can get all products----->
const getProducts = async (req, res) => {
    try {

        const { sort, category } = req.query;
        const filter = category ? { category } : {};
        const sortOption = sort === "asc" ? { price: 1 } : sort === "desc" ? { price: -1 } : {};
        const allProducts = await ProductModel.find(filter).sort(sortOption);

        res.status(200).send({ products: allProducts });
    } catch (error) {
        console.log('/user/products/: ', error.message);
        res.status(501).send({ msg: "Internal Server error", error: error.message });
    }
}

// user can get all categories------>
const getCategories = async (req, res) => {
    try {
        const categories = await ProductModel.aggregate([
            { $group: { _id: null, categories: { $addToSet: "$category" } } },
            { $project: { _id: 0, categories: 1 } },
        ]);
        if (categories.length === 0) {
            return res.status(404).json({ message: "No Categories Found" });
        }

        res.status(200).send(categories[0]);
    } catch (error) {
        console.log('/user/products/categories: ', error.message);
        res.status(501).send({ msg: "Internal Server error", error: error.message });
    }
}


// user can get perticular product by its ID-------->
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.find({ _id: id });

        if (!product) {
            return res.status(404).send({ message: `Product with ID ${id} not found.` });
        }
        res.status(200).send(product);
    } catch (error) {
        console.log('/user/products/getProductById: ', error.message);
        res.status(501).send({ msg: "Internal Server error", error: error.message });
    }
}


// module export------->
module.exports = {
    getProducts, getCategories, getProductById
}