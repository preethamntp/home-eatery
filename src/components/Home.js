// Feature 1
import React from "react";
import data from "../data.json";
import Products from "./Products.js";
import Filter from "./Filter.js";
import Cart from "./Cart.js";
import Navbar from "./Navbar/index.js";
// import SignIn from "./Login"
class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      cartItems: JSON.parse(localStorage.getItem("cartItems"))
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
      size: "",
      sort: ""
    };
  }

  removeFromCart = product => {
    const cartItems = this.state.cartItems.slice();
    this.setState({ cartItems: cartItems.filter(x => x._id !== product._id) });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems.filter(x => x._id !== product._id))
    );
  };

  addToCart = product => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach(item => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({ cartItems });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  sortProducts = event => {
    // Implement sort
    const sort = event.target.value;
    this.setState(state => ({
      sort: sort,
      products: this.state.products
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a._id > b.pri_idce
            ? 1
            : -1
        )
    }));
  };

  filterProducts = event => {
    console.log(event.target.value);
    if (event.target.value === "") {
      this.setState({ size: event.target.value, products: data.products });
    } else {
      this.setState({
        size: event.target.value,
        products: data.products.filter(
          product => product.availableDishes.indexOf(event.target.value) >= 0
        )
      });
    }
  };

  render() {
    return (
      <div className="grid-container">
        <Navbar />

        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              />
              <Products
                products={this.state.products}
                addToCart={this.addToCart}
              />
            </div>
            <div className="sidebar">
              <Cart
                cartItems={this.state.cartItems}
                removeFromCart={this.removeFromCart}
                createOrder={this.createOrder}
              />
            </div>
          </div>
        </main>
        <footer>All rights is reserved. </footer>
      </div>
    );
  }
}

export default Home;
