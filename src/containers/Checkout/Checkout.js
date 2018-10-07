import React, {Component} from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

class Checkout extends Component {

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
                    ingredients={this.props.ings}
                    checkoutConfirmed={this.checkoutConfirmedHandler}
                    checkoutCancelled={this.checkoutCancelledHandler}/>
                <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData}/>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return {
        ings: state.ingredients
    }
};

export default connect(mapStateToProps)(Checkout);