

class ProductManager {
    static ultimo_id = 0;

    constructor(){
        this.products = [];
    }

    getPruducts(){
        console.log(this.products);
    }

    addProducts(title, description, price, thumbnail, code, stock){
        ProductManager.ultimo_id = ProductManager.ultimo_id + 1;

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

    getProductById(){
        let id_buscado = "";

        if(id_buscado==ProductManager.id){

        }else{
            console.log("Not found");
        }
    }
}

const products = new ProductManager();

products.getPruducts();
products.addProducts("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
products.getPruducts();
products.addProducts("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);