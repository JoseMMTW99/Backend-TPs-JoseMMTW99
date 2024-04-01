
const fs = require('fs');

class ProductManager {
    static ultimo_id = 0;

    constructor(archivoJson){
        this.path = archivoJson;
        this.products = [];
    }

    async addProducts(title, description, price, thumbnail, code, stock) {
        ProductManager.ultimo_id = ProductManager.ultimo_id + 1;

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error("Todos los campos son obligatorios");
        }
    
        for (const product of this.products) {
            if (product.code === code) {
                // throw new Error("El campo 'code' ya existe");
                console.log("El campo 'code' ya existe");
            }
        }

        const new_product = {
            id: ProductManager.ultimo_id,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        }

        this.products.push(new_product);

        await fs.promises.writeFile(this.path, JSON.stringify(this.products));
        console.log("Productos actualizados");
    }

    getProducts(){
        console.log(this.products);
    }

    getProductById(id){
        const product = this.products.find(product => product.id === id);
    
        if (product) {
            console.log(product);
        } else {
            console.log("Not found");
        }
    }

    updateProduct(id, updatedFields){
        const index = this.products.findIndex(product => product.id === id);
        
        if (index === -1) {
            console.log("Not found");
            return;
        }

        const updatedProduct = {
            ...this.products[index],
            ...updatedFields,
            id: id
        }

        this.products[index] = updatedProduct;
    }

    deleteProduct(id){
        const index = this.products.findIndex(product => product.id === id);
        
        if (index === -1) {
            console.log("Not found");
            return;
        }

        this.products.splice(index, 1);
    }
}

const products = new ProductManager('./products.json');

products.getProducts();

products.addProducts("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
products.addProducts("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abcde12345", 25);

products.getProducts();
products.getProductById(1);
products.getProductById(5);

products.addProducts("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);

products.updateProduct(1, {title: "Producto actualizado", price: 300});

products.getProductById(1);

products.deleteProduct(2);
products.getProducts();

products.getProducts();