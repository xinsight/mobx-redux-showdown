import {configureStore} from 'redux-starter-kit'

import {valueSetReducer} from './features/valueSets'

export const store = configureStore({
    reducer : {valueSets : valueSetReducer},
});

