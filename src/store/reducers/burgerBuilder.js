import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const updateIngredientAmount = (state, action, amountIngredient) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + amountIngredient};
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    };
    return updateObject(state, updatedState);
};

const setIngredients = (state, action) => {
    return updateObject(
        state,
        //Code used just to order the ingredients simple way should be: ingredients: action.ingredients
        {
            ingredients: {
                salad: action.ingredients.salad,
                bacon: action.ingredients.bacon,
                cheese: action.ingredients.cheese,
                meat: action.ingredients.meat
            },
            totalPrice: 4,
            error: false,
            building: false
        });
};

const fetchIngredientsFailed = (state) => {
    return updateObject(state, {error: true});
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return updateIngredientAmount(state, action, 1);
        case actionTypes.REMOVE_INGREDIENT:
            return updateIngredientAmount(state, action, -1);
        case actionTypes.SET_INGREDIENTS:
            return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return fetchIngredientsFailed(state);
        default:
            return state;
    }
};

export default reducer;