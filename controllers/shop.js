const Product = require('../models/product');
const Cart = require('../models/cart');
const items_per_page = 1;


exports.getProducts = (req, res, next) => {

  const page = +req.query.page || 1;
  let totalItems;

  Product.count() //it is not working but 
  .then(numproducts=>{

    totalitems=numproducts;
    return Product.findAll({offset:(page-1)*items_per_page,
      limit:items_per_page})
  })
  .then(products => {
     
  const hasnextpage=items_per_page*page<totalitems;
  const haspreviouspage=page>1;
  const nextpage=page+1;
  const previouspage=page-1;
  const lastpage=Math.ceil(totalitems/items_per_page)
  const obj={
    totalitems:totalitems,
    currentpage:page,
    hasnextpage:hasnextpage,
    haspreviouspage:haspreviouspage,
    nextpage:nextpage,
    previouspage:previouspage,
    lastpage:lastpage
  
  }
      res.json({products ,success:true,obj})
      // res.render('shop/product-list', {
      //   prods: products,
      //   pageTitle: 'All Products',
      //   path: '/products'
      // });
    })
    .catch(err => {
      console.log(err);
    });
  // Product.findAll()
  //   .countDocuments()
  //   .then(numProducts => {
  //     totalItems = numProducts;
  //     return Product.find()
  //       .skip((page - 1) * ITEMS_PER_PAGE)
  //       .limit(ITEMS_PER_PAGE);
  //   })
  //   .then(products => {
  //     res.json( {
  //       prods: products,
  //       currentPage: page,
  //       hasNextPage: ITEMS_PER_PAGE * page < totalItems,
  //       hasPreviousPage: page > 1,
  //       nextPage: page + 1,
  //       previousPage: page - 1,
  //       lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
  //     });
  //   })
  //   .catch(err => { console.log(err) });

  // Product.findAll()
  // .then(products => {

  //     res.json( { products , success : true } );
  //     // res.render('shop/product-list' , {
  //     // prods: products,
  //     // pageTitle: 'All Products',
  //     // path:'/products'
  // })
  // .catch(err => console.log(err));
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
  const prodId = req.body.productId;
  console.log("hi Again" , prodId);
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
        console.log("JASCJHA HAKJD KAJSDH AJSDH " , product);
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
      res.status(200).json({success: true , message: 'successfully added to cart db'});
    })
    .catch(err => res.status(500).json({success: false , message: 'Error Occurred'}));
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
      console.log("HUlalkdkjasdas dkjhasdhaskjdaskdhasjkdhahskd hasg dkha d");
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
