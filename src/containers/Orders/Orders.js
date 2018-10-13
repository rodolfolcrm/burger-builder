import React, {Component} from 'react';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

class Orders extends Component {
    componentDidMount() {
        this.props.onInitOrders();
    }

    render() {
        let orders = null;

        if (this.props.loading) {
            orders = <Spinner/>;
        } else {
            orders = this.props.orders.map((order) => {
                return <Order key={order.id}
                              ingredients={order.ingredients}
                              price={+order.price}/>;
            });
        }

        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitOrders: () => dispatch(actions.fetchOrders())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));