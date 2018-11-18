
import { combineReducers } from 'redux'
import valueSetsReducer from './valueSetsReducer'

// state
//  valueSets: { // Immutable.Map
//    [valueSetId]: {
//      valueSet: {code, display},
//      isLoading: bool,
//      error: String
//    }

export default combineReducers({
    valueSets: valueSetsReducer,
  })
