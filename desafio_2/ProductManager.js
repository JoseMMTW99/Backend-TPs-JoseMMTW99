const fs = require('fs').promises;

class ProductManager {
    constructor(archivoJson){
        this.path = archivoJson;
        this.products = [];
        this.ultimo_id = 0;
        this.loadProducts();
    }

    async loadProducts() {
        try {
            const data = await fs.readFile(this.path);
            this.products = JSON.parse(data);
            const lastProduct = this.products[this.products.length - 1];
            this.ultimo_id = lastProduct ? lastProduct.id : 0;
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log("No hay productos disponibles.");
            } else {
                console.error("Error al cargar productos:", error);
            }
        }
    }

    async addProducts(title, description, price, thumbnail, code, stock) {
    
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error("Todos los campos son obligatorios");
        }
    
        if (this.products.some(product => product.code === code)) {
            console.log("El campo 'code' ya existe");
            return;
        }
    
        const new_product = {
            id: ++this.ultimo_id, // Aquí incrementamos this.ultimo_id y asignamos el nuevo valor como ID del producto
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        }
    
        this.products.push(new_product);
    
        await this.saveProducts(); // Esperar a que se guarde el producto antes de continuar
        console.log("Productos actualizados");
    }

    async saveProducts() {
        try {
            await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
        } catch (error) {
            console.error("Error al guardar productos:", error);
        }
    }    

    getProducts(){
        console.log(this.products);
    }

    getProductById(id){
        const product = this.products.find(product => product.id === id);
    
        if (product) {
            console.log(product);
        } else {
            console.log("No existe un producto con ID correspondiente");
        }
    }

    async updateProduct(id, updatedFields){
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
        await this.saveProducts();
    }

    async deleteProduct(id){
        const index = this.products.findIndex(product => product.id === id);
        
        if (index === -1) {
            console.log("Not found");
            return;
        }

        this.products.splice(index, 1);
        await this.saveProducts();
    }
}

const products = new ProductManager('./products.json');

products.getProducts();

products.addProducts("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "A1", 25);
products.addProducts("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "B2", 50);

products.getProducts();
products.getProductById(1);
products.getProductById(5);

products.addProducts("no se agrega porque tiene el mismo code", "Este es un producto prueba", 200, "Sin imagen", "A1", 25);

products.updateProduct(1, {title: "Producto actualizado", price: 300});

products.getProductById(1);

products.deleteProduct(2);
products.getProducts();

products.addProducts("producto prueba 3", "Este es un producto prueba", 200, "Sin imagen", "C3", 50);
products.addProducts("producto prueba 4", "Este es un producto prueba", 200, "Sin imagen", "D4", 100);
products.addProducts("no se agrega porque tiene el mismo code", "Este es un producto prueba", 200, "Sin imagen", "C3", 50);
products.addProducts("no se agrega porque tiene el mismo code", "Este es un producto prueba", 200, "Sin imagen", "D4", 100);
products.addProducts("producto prueba 4", "Este es un producto prueba", 200, "Sin imagen", "E5", 125);

products.getProducts();