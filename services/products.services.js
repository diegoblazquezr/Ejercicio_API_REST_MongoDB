const Product = require('../models/products.model');
const Provider = require('../models/providers.model');

// CREATE
async function createProduct(title, price, description, image, company_name) {

    const provider = await Provider.find({ company_name });
    const provider_id = provider[0]._id.toString();
    const provider_isActive = provider[0].isActive;

    if (provider) {
        const product = new Product({
            title,
            price,
            description,
            image,
            provider: provider_id,
            isActive: provider_isActive
        });
        const result = await product.save();
        console.log(result);
        return result;
    } else {
        console.log('No existe esa compañía.');
        return error;
    }
}

// createProduct('Tortilla', 5, 'Tortilla sabrosa', 'tortilla.jpg', 'Dia');

// db.products.insertOne({
//     "title": "Tortilla - Marquina",
//     "price": 1.80,
//   "description":"La mejor tortilla de la zona en el Teatro Marquina",
//         "image":"tortilla.jpg",
//     "company_name": "Teatro Marquina"
// })

// READ
const getProducts = async () => {
    try {
        const product = await Product
            .find({ isActive: true })
            .populate('provider', 'company_name CIF address url_web -_id')
            .select()
        console.log(product);
        return product;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}
// getProducts();

// PUT
const updateProduct = async (filter, update) => {
    try {
        const product = await Product.findOneAndUpdate(filter, update, { new: true });
        console.log(product);
        return product;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}
// http://localhost:3000/api/providers?company_name=Teatro Marquina
// updateProduct(
//     { isActive: true }
// );

// DELETE
const deleteProduct = async (filter) => {
    try {
        const product = await Provider.deleteOne({ 'title': filter });
        console.log("Deleted products and proudcts correctly");
        return product;
    } catch (error) {
        console.log(error);
        return error;
    }
}
// deleteProduct("Tortilla");

module.exports = {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct
}