import {createReducer} from "redux-starter-kit";

import {
    SET_VALUESET,
    SET_VALUESET_IS_LOADING,
    SET_VALUESET_ERROR,
 } from '../actions/actions'

const valueSetReducer = createReducer({}, {
    [SET_VALUESET_IS_LOADING] : (state, action) => {
        const {isLoading, valueSetId} = action;
        state[valueSetId] = state[valueSetId] || {};
        state[valueSetId].isLoading = isLoading;
    },
    [SET_VALUESET_ERROR] : (state, action) => {
        const {error, valueSetId} = action;
        state[valueSetId] = state[valueSetId] || {};
        state[valueSetId].error = error;
    },
    [SET_VALUESET] : (state, action) => { state[action.valueSetId].valueSet = action.valueSet },
})


export default valueSetReducer
