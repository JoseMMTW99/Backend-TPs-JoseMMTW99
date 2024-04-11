const express = require('express');
const fs = require('fs').promises;

const router = express.Router();
const carritoFile = './carrito.json';

// Ruta para crear un nuevo carrito
router.post('/', async (req, res) => {
    try {
        const carritos = await getCarritos();
        const newCart = {
            id: generateId(),
            products: []
        };
        carritos.push(newCart);
        await saveCarritos(carritos);
        res.status(201).json(newCart);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear el carrito');
    }
});

// Ruta para listar los productos de un carrito por su ID
router.get('/:cid', async (req, res) => {
    try {
        const carritoId = parseInt(req.params.cid);
        const carritos = await getCarritos();
        const carrito = carritos.find(carrito => carrito.id === carritoId);
        if (carrito) {
            res.json(carrito.products);
        } else {
            res.status(404).send('Carrito no encontrado');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el carrito');
    }
});

// Ruta para agregar un producto al carrito por su ID de carrito y producto
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const carritoId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);
        const quantity = parseInt(req.body.quantity) || 1;

        const carritos = await getCarritos();
        const carritoIndex = carritos.findIndex(carrito => carrito.id === carritoId);
        if (carritoIndex === -1) {
            return res.status(404).send('Carrito no encontrado');
        }

        const carrito = carritos[carritoIndex];
        const productIndex = carrito.products.findIndex(product => product.id === productId);
        if (productIndex === -1) {
            carrito.products.push({ id: productId, quantity });
        } else {
            carrito.products[productIndex].quantity += quantity;
        }

        await saveCarritos(carritos);
        res.status(201).send('Producto agregado al carrito correctamente');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al agregar el producto al carrito');
    }
});

// Función para generar un ID único para el carrito
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

// Función para obtener todos los carritos
async function getCarritos() {
    const data = await fs.readFile(carritoFile);
    return JSON.parse(data);
}

// Función para guardar los carritos
async function saveCarritos(carritos) {
    await fs.writeFile(carritoFile, JSON.stringify(carritos, null, 2));
}

module.exports = router;