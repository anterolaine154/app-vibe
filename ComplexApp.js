/* 
Filename: ComplexApp.js
Content: A complex JavaScript application that simulates an online shopping platform with multiple features such as user authentication, product catalog, cart management, and order placement.
*/

// User class representing a registered user
class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.cart = [];
  }

  addToCart(product) {
    this.cart.push(product);
    console.log(`${product.name} added to the cart.`);
  }

  removeFromCart(product) {
    const index = this.cart.findIndex((item) => item.name === product.name);
    if (index !== -1) {
      this.cart.splice(index, 1);
      console.log(`${product.name} removed from the cart.`);
    } else {
      console.log(`${product.name} is not in the cart.`);
    }
  }

  placeOrder() {
    const orderTotal = this.cart.reduce((acc, item) => acc + item.price, 0);
    console.log(`Order placed successfully! Total: $${orderTotal.toFixed(2)}`);
    this.cart = [];
  }
}

// Product class representing an item
class Product {
  constructor(name, price, description) {
    this.name = name;
    this.price = price;
    this.description = description;
  }
}

// Catalog class representing the product catalog
class Catalog {
  constructor() {
    this.products = [];
  }

  addProduct(product) {
    this.products.push(product);
    console.log(`${product.name} added to the catalog.`);
  }

  removeProduct(product) {
    const index = this.products.findIndex((item) => item.name === product.name);
    if (index !== -1) {
      this.products.splice(index, 1);
      console.log(`${product.name} removed from the catalog.`);
    } else {
      console.log(`${product.name} is not in the catalog.`);
    }
  }

  displayCatalog() {
    console.log("Product Catalog:");
    this.products.forEach((product) => {
      console.log(`${product.name} - $${product.price.toFixed(2)}`);
      console.log(`Description: ${product.description}`);
    });
  }
}

// Instantiate the catalog
const catalog = new Catalog();

// Initialize products in the catalog
catalog.addProduct(new Product("Smartphone", 999.99, "High-end smartphone with advanced features."));
catalog.addProduct(new Product("Laptop", 1499.99, "Powerful laptop for heavy workload."));
catalog.addProduct(new Product("Headphones", 299.99, "Wireless headphones with noise cancellation."));

// Instantiate users
const user1 = new User("user1", "user1@example.com", "password1");
const user2 = new User("user2", "user2@example.com", "password2");

// Simulate user interactions
user1.addToCart(catalog.products[0]); // Add the first product to user1's cart
user1.addToCart(catalog.products[1]); // Add the second product to user1's cart
user1.removeFromCart(catalog.products[0]); // Remove the first product from user1's cart
user1.placeOrder(); // Place an order for user1's cart

user2.addToCart(catalog.products[2]); // Add the third product to user2's cart
user2.placeOrder(); // Place an order for user2's cart

catalog.removeProduct(catalog.products[1]); // Remove the second product from the catalog
catalog.displayCatalog(); // Display the updated catalog

// Output:
// Smartphone added to the catalog.
// Laptop added to the catalog.
// Headphones added to the catalog.
// Smartphone added to the cart.
// Laptop added to the cart.
// Smartphone removed from the cart.
// Order placed successfully! Total: $1499.99
// Headphones added to the cart.
// Order placed successfully! Total: $299.99
// Laptop removed from the catalog.
// Product Catalog:
// Smartphone - $999.99
// Description: High-end smartphone with advanced features.
// Headphones - $299.99
// Description: Wireless headphones with noise cancellation.