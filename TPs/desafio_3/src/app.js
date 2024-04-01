const express = require('express')
const productManager = require('./ProductManager');

const app = express();
const puerto = 8080;

//CODIGO PARA RECIBIR LOS PRODUCTOS

app.get('/', (req, res)=>{
    res.send("Servidor Express");
});

app.get('/products', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 0;
        const products = await productManager.getProducts(limit);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los productos');
    }
});


//CODIGO PARA RECIBIR LOS PRODUCTOS POR ID

app.get('/products/:pid', async (req, res) => {
    try {
        const productId = req.params.pid;
        const product = await productManager.getProductById(productId);
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


app.listen(puerto, () => {
    console.log(`Servidor Express activo en puerto ${puerto}`);
});