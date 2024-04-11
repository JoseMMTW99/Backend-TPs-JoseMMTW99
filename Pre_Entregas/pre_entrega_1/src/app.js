const express = require('express');
const productsRouter = require('./routes/products.router');
const cartsRouter = require('./routes/carts.router');

const app = express();
const puerto = 8080;

app.use(express.json());

// Configuración de las rutas para productos
app.use('/api/products', productsRouter);

// Configuración de las rutas para carritos
app.use('/api/carts', cartsRouter);

app.listen(puerto, () => {
    console.log(`Servidor Express activo en puerto ${puerto}`);
});