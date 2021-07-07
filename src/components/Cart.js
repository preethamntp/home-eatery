import React, { Component } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import Modal from "react-modal";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: "",
      showCheckout: false,
      showOrder: null
    };
  }

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createOrder = e => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems
    };
    // this.props.createOrder(order);

    this.setState({ showOrder: order });
  };

  openModal = e => {
    e.preventDefault();

    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems
    };
    this.setState({ showOrder: order });
  };

  closeModal = () => {
    this.setState({ showOrder: null });
  };

  generateUID = () => {
    // I generate the UID from two parts here
    // to ensure the random number provide enough bits.
    var firstPart = (Math.random() * 46656) | 0;
    var secondPart = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3);
    secondPart = ("000" + secondPart.toString(36)).slice(-3);
    return firstPart + secondPart;
  };

  render() {
    const { cartItems } = this.props;
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header">Cart is empty</div>
        ) : (
          <div className="cart cart-header">
            You have {cartItems.length} in the cart
          </div>
        )}
        <div className="cart">
          <Fade left cascade>
            <ul className="cart-items">
              {cartItems.map(item => (
                <li key={item._id}>
                  <div>
                    <img src={item.image} alt={item.title}></img>
                  </div>
                  <div>
                    <div> {item.title} </div>
                    <div className="right">
                      {formatCurrency(item.price)} x {item.count}{" "}
                      <button
                        className="button"
                        onClick={() => this.props.removeFromCart(item)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Fade>
        </div>
        {cartItems.length !== 0 && (
          <div>
            <div className="cart">
              <div className="total">
                <div>
                  Total:{" "}
                  {formatCurrency(
                    cartItems.reduce((a, c) => a + c.price * c.count, 0)
                  )}
                </div>
                <button
                  onClick={() => this.setState({ showCheckout: true })}
                  className="button primary"
                >
                  Proceed
                </button>
              </div>
            </div>
            {this.state.showCheckout && (
              <div className="cart">
                <Fade right cascade>
                  <form onSubmit={this.createOrder}>
                    <ul className="form-container">
                      <li>
                        <label>Email</label>
                        <input
                          name="email"
                          type="email"
                          required
                          onChange={this.handleInput}
                        />
                      </li>
                      <li>
                        <label>Name</label>
                        <input
                          name="name"
                          type="text"
                          required
                          onChange={this.handleInput}
                        />
                      </li>
                      <li>
                        <label>Address</label>
                        <input
                          name="address"
                          type="text"
                          required
                          onChange={this.handleInput}
                        />
                      </li>
                      <li>
                        <button
                          className="button primary"
                          type="submit"
                          onClick={() => this.handleCheckout}
                        >
                          Checkout
                        </button>
                      </li>
                    </ul>
                  </form>
                </Fade>
              </div>
            )}
          </div>
        )}

        {this.state.showOrder && (
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button className="close-modal" onClick={this.closeModal}>
                X
              </button>
              <div className="order-details">
                <h3 className="success-message">
                  Your order has been placed.{" "}
                </h3>
                <h2>Order {this.generateUID()}</h2>
                <ul>
                  <li>
                    <div>Name:</div>
                    <div>{this.state.name}</div>
                  </li>
                  <li>
                    <div>Email:</div>
                    <div>{this.state.email}</div>
                  </li>
                  <li>
                    <div>Address:</div>
                    <div>{this.state.address}</div>
                  </li>
                  <li>
                    <div>Date:</div>
                    <div>{JSON.stringify(new Date())}</div>
                  </li>
                  <li>
                    <div>Total:</div>
                    <div>
                      {" "}
                      {formatCurrency(
                        cartItems.reduce((a, c) => a + c.price * c.count, 0)
                      )}{" "}
                    </div>
                  </li>
                  <li>
                    <div>Cart Items:</div>
                    <div>
                      {cartItems.map(item => (
                        <div key={item._id}> {item.title} </div>
                      ))}
                    </div>
                  </li>
                </ul>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}
