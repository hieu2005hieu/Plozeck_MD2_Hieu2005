import axios from "axios";

export default {
    updateStocks: async (products) => {
        // lay products tren database
        const response = await axios.get("http://localhost:8000/products");
        let allProducts = response.data;
        // map products ma nguoi dung gui ve
        const updatedProducts = products.map((product) => {
            // Tim san pham trong gio hang trung voi san pham trong Products tren database
            const productFromAPI = allProducts.find(
                (item) => item.id === product.id
            );
            if (productFromAPI && product.quantity) {
                // Khi tim thay
                return {
                    ...productFromAPI,
                    //Tru so luong stock
                    stock: productFromAPI.stock - product.quantity,
                };
            }
            return productFromAPI || product;
        });
        // update lai so luong stock trong database
        for (const product of updatedProducts) {
            if (product) {
                await axios.put(`http://localhost:8000/products/${product.id}`, {
                    ...product,
                    stocks: product.stocks,
                });
            }
        }
        return updatedProducts;
    },
}