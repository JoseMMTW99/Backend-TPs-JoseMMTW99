

class ProductManager {
    static ultimo_id = 0;

    constructor(){
        this.products = [];
    }

    addProducts(title, description, price, thumbnail, code, stock){
        ProductManager.ultimo_id = ProductManager.ultimo_id + 1;

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error("Todos los campos son obligatorios");
        }
    
        for (const product of this.products) {
            if (product.code === code) {
                throw new Error("El campo 'code' ya existe");
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
}

const products = new ProductManager();

products.getProducts();

products.addProducts("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 20);
products.addProducts("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abcde12345", 25);

products.getProducts();
products.getProductById(1);
products.getProductById(5);

products.addProducts("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);