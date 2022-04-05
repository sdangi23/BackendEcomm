const db = require('../util/database');

module.exports = class Product {
  constructor(id, title, imageUrl, description, price, size) {
    this.id = id,
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.size = size;
  }

  save() {
    return db.execute('INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
    [this.title , this.price, this.imageUrl, this.description]
    );
  }

  static deleteById(id) {
    return db.execute('DELETE FROM products WHERE products.id = ?' , [id]);
  }

  static fetchAll(cb) {
    return db.execute('SELECT * FROM products');
  }

  static findById(id, cb) {
    return db.execute('SELECT * FROM products WHERE products.id = ?' ,[id]);
  }
};
