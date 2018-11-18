import Immutable from 'immutable'
import {
    SET_VALUESET,
    SET_VALUESET_IS_LOADING,
    SET_VALUESET_ERROR,
 } from '../actions/actions'

let initialState = Immutable.Map({})

const valueSets = (state = initialState, action) => {
    switch (action.type) {
        case SET_VALUESET_IS_LOADING:
            return state.setIn([action.valueSetId, 'isLoading'], action.isLoading)
        case SET_VALUESET_ERROR:
            return state.setIn([action.valueSetId, 'error'], action.error)
        case SET_VALUESET:
            return state.setIn([action.valueSetId, 'valueSet'], action.valueSet)
        default:
            return state
    }

}

export default valueSets
