const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  static addProduct(id, productPrice, prodSize) {
    // Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(
        prod => prod.id === id
      );

      let reverseArray = [...cart.products];
      reverseArray.reverse();
      let existingProductIndexLast = reverseArray.findIndex(
        prod => prod.id === id
      );
      existingProductIndexLast = reverseArray.length-existingProductIndexLast-1;

      let existingProduct = cart.products[existingProductIndex];
      let existingProductLast=0;

      if(existingProductIndexLast !== existingProductIndex){
      existingProductLast = cart.products[existingProductIndexLast];
      }
      console.log(existingProductLast);
      
      let updatedProduct;
      // Add new product/ increase quantity
      if(existingProductLast){

        if(existingProduct.size == prodSize){
          updatedProduct = { ...existingProduct };
          updatedProduct.qty = updatedProduct.qty + 1;
          cart.products = [...cart.products];
          cart.products[existingProductIndex] = updatedProduct;
          }
        if(existingProductLast.size == prodSize){
            updatedProduct = { ...existingProductLast };
            updatedProduct.qty = updatedProduct.qty + 1;
            cart.products = [...cart.products];
            cart.products[existingProductIndexLast] = updatedProduct;

            }
      }

      else if (existingProduct) {
        if(existingProduct.size == prodSize){
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
        } else {
          updatedProduct = { id: id, qty: 1, size: prodSize };
          cart.products = [...cart.products, updatedProduct];
        }
      } else {
        updatedProduct = { id: id, qty: 1, size: prodSize };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err);
      });
    });
  }
};
