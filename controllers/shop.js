const Product = require('../models/product');
const Cart = require('../models/cart');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(products => {

      res.json( { products , success : true } );
      // res.render('shop/product-list' , {
      // prods: products,
      // pageTitle: 'All Products',
      // path:'/products'
  })
  .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findAll({where: {id: prodId} } )
  .then((product) =>{
    res.render('shop/product-detail', {
      product: product[0] ,
      pageTitle: product.title,
      path: '/products'
    });
  })
  .catch(err => console.log(err))
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
  .then(products => {
    res.render('shop/index' , {
      prods: products,
      pageTitle: 'shop',
      path:'/'
  });
  })
  .catch(err => console.log(err));
}

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => {
      return cart
        .getProducts()
        .then(products => {
          res.status(200).json( {success: true , products: products } )
          // res.render('shop/cart', {
          // path: '/cart',
          // pageTitle: 'Your Cart',
          // products: products
          })
        .catch(err => { res.status(500).json({ success: false, message: err})});
    })
    .catch(err => { res.status(500).json({ success: false, message: err})});
};

exports.postCart = (req, res, next) => {
  // const prodId = req.body.productId;
  // let fetchedCart;
  // let newQuantity = 1;
  
  // req.user
  //   .getCart()
  //   .then(cart => {
  //     fetchedCart = cart;
  //     return cart.getProducts({ where: { id: prodId } });
  //   })
  //   .then(products => {
  //     let product;
  //     if (products.length > 0) {
  //       product = products[0];
  //     }
  //     if (product) {
  //       const oldQuantity = product.cartItem.quantity;
  //       newQuantity = oldQuantity + 1;
        
  //       return product;
  //     }
  //     return Product.findByPk(prodId);
  //   })
  //   .then(product => {
  //     return fetchedCart.addProduct(product, {
  //       through: { quantity: newQuantity }
  //     });
  //   })
  //   .then(() => {
  //     res.status(200).json({success: true , message: 'successfully added to cart db'});
  //   })
  //   .catch(err => res.status(500).json({success: false , message: 'Error Occurred'}));

  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    .then(() => {
      res.status(200).send({message: "Success"})
    })
    .catch(err => {
      res.status(500);
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then(cart => {
       return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.postOrder = async (req, res, next) => {
  try{
    const cart = await req.user.getCart();
    const products = await cart.getProducts();
    const order = await req.user.createOrder();
    await order.addProducts(products.map(product => {
      product.orderItem = {
        quantity: product.cartItem.quantity
      }
      return product;
    }))

    await cart.setProducts(null);
    res.status(200).json({message: "Order placed!" , orderId: order.id})
  } catch(err) {
    res.status(500).json({err: err})
  }}

exports.getOrders =async (req, res, next) => {
  try{
    const data = [];
    const orderArray = await req.user.getOrders();
    await Promise.all(orderArray.map( async (eachOrder) => {
      const eachOrderDetail = {};
      eachOrderDetail.orderId = eachOrder.id;
      const ord = await Order.findByPk(eachOrder.id);
      const orderedProducts = await ord.getProducts();
      const orderedProductsFiltered = [];
      orderedProducts.map( item => {
        orderedProductsFiltered.push(item.dataValues);
      })
      eachOrderDetail.products = orderedProductsFiltered;
      data.push(eachOrderDetail);
      

    }))
    res.status(201).json( {data} )
  } catch(err) {
    res.status(500).json({err: err})
  }
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};