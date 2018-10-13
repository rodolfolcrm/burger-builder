import React, {Component} from 'react';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';

import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

import classes from './Auth.css';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: false
    };

    checkValidity(value, rules) {
        let isValid = false;

        if (rules.required) {
            isValid = value.trim() !== '';
        }

        if (isValid && rules.minLength) {
            isValid = value.length >= rules.minLength;
        }

        if (isValid && rules.maxLength) {
            isValid = value.length <= rules.maxLength;
        }

        return isValid;
    }

    inputChangeHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };

        this.setState({controls: updatedControls});
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    };

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup}
        })
    };

    render() {
        const formElementsArray = [];

        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let formElements = formElementsArray.map(formElement => (
            <Input
                label={formElement.id}
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangeHandler(event, formElement.id)}/>

        ));

        if(this.props.loading){
            formElements = <Spinner/>;
        }

        let errorMessage = null;
        if(this.props.error){
            errorMessage = (
              <p>{this.props.error.message}</p>
            );
        }

        return (
            <div className={classes.Auth}>
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {formElements}
                    <Button btnType="Success">{this.state.isSignup ? 'SIGNUP' : 'SIGNIN'}</Button>
                </form>
                <Button btnType="Danger"
                    clicked={this.switchAuthModeHandler}>
                    SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}
                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);