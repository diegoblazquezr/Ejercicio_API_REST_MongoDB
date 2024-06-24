const Provider = require('../models/providers.model');
const Product = require('../models/products.model');

// CREATE
const createProvider = async (company_name, CIF, address, url_web, isActive) => {
    try {
        const provider = new Provider({
            company_name,
            CIF,
            address,
            url_web,
            isActive
        });
        const result = await provider.save();
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// createProvider('Alcampo', 'B40233882', 'Calle de Prim 10', 'https://www.alcampo.com', true);
// .then(data => console.log(data))
// .catch(error => console.log(error))

// db.providers.insertOne({
    // "company_name": "Teatro Marquina",
    // "CIF": "B40236882",
    // "address": "Calle de Prim 11",
    // "url_web":"https://www.tortillasmarquina.com",
    //  "isActive": true
// })

// READ
const getProviders = async () => {
    try {
        const provider = await Provider.find({ isActive: true });
        console.log(provider);
        return provider;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}
// getProviders();

// PUT
const updateProvider = async (filter, update) => {
    try {
        const provider = await Provider.findOneAndUpdate(filter, update, { new: true });
        console.log(provider);
        const product = await Product.updateMany({ provider: provider._id }, { isActive: provider.isActive });
        console.log(product);
        return provider;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

// updateProvider({company_name: 'Teatro Marquina'}, {isActive: true});
// http://localhost:3000/api/providers?company_name=Teatro Marquina
// updateProvider(
//   {isActive: false}
// );

// DELETE
const deleteProvider = async (filter) => {
    try {
        const provider = await Provider.findOne({ 'company_name': filter });
        if (!provider) {
            throw new Error('Provider not found');
        }
        const products = await Product.deleteMany({ provider: provider._id });
        await Provider.deleteOne({ 'company_name': filter });
        console.log("Deleted providers and proudcts correctly");
        return provider, products;
    } catch (error) {
        console.log(error);
        return error;
    }
}
// deleteProvider("Teatro Marquina");

module.exports = {
    createProvider,
    getProviders,
    updateProvider,
    deleteProvider
}