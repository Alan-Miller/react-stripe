import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import stripe from './config';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  onToken = (token) => {
    console.log('token', token); // can check token for info, including user email
    token.card = void 0; // remove credit card info from token so it never hits server
    axios.post('http://localhost:3003/api/payment', { token, amount: 1000 } )
    // when the token is sent to use from Stripe, we make a post request to make the payment
    .then(response => { console.log('POST response', response); });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React-Stripe</h2>
        </div>
        <StripeCheckout className="sc"
          token={this.onToken} // get token back
          stripeKey={ stripe.publishable_key }  // public key 
          amount={1000} // required, should be same as in axios get request
        />
      </div>
    );
  }
}

export default App;
