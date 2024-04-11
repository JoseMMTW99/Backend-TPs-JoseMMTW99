const express = require('express');
const ProductManager = require('../ProductManager');

const router = express.Router();
const productsManager = new ProductManager('./productos.json');

router.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 0;
        const products = await productsManager.getProducts(limit);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los productos');
    }
});

router.get('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = await productsManager.getProductById(productId);
        if (product) {
            res.json(product);
        } else {
            res.status(404).send('Producto no encontrado');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el producto por ID');
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, description, code, price, stock, category, thumbnails } = req.body;
        await productsManager.addProducts(title, description, price, thumbnails, code, stock, category);
        res.status(201).send('Producto agregado correctamente');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al agregar el producto');
    }
});

router.put('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const updatedFields = req.body;
        await productsManager.updateProduct(productId, updatedFields);
        res.send('Producto actualizado correctamente');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el producto');
    }
});

router.delete('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        await productsManager.deleteProduct(productId);
        res.send('Producto eliminado correctamente');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar el producto');
    }
});

module.exports = router;