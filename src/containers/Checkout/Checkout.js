import React, {Component} from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

import {Route} from 'react-router-dom';

class Checkout extends Component {

    state = {
        ingredients: null,
        price: 0
    };

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        let ingredients = {};
        let price = null;
        for (let param of query.entries()) {
            if(param[0] === 'price'){
                price = param[1];
            }else{
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ingredients: ingredients, price: price});
    }

    checkoutConfirmedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutConfirmed={this.checkoutConfirmedHandler}
                    checkoutCancelled={this.checkoutCancelledHandler}/>
                <Route
                    path={this.props.match.path + '/contact-data'}
                    render={(props) => (<ContactData ingredients={this.state.ingredients} price = {this.state.price} {...props}/>)}/>
            </div>
        );
    }
}

export default Checkout;