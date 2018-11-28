
import { combineReducers } from 'redux'

import valueSetsReducer from './features/valueSets'

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
