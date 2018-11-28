
import Immutable from 'immutable'
import { put, take, fork, call } from 'redux-saga/effects'

// actions

export const LOAD_VALUESET = 'LOAD_VALUESET'
export const SET_VALUESET = 'SET_VALUESET'
export const SET_VALUESET_IS_LOADING = 'SET_VALUESET_IS_LOADING'
export const SET_VALUESET_ERROR = 'SET_VALUESET_ERROR'

// reducer

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

// action creators

export const loadValueSetAction = (valueSetId) => {
    return { type: LOAD_VALUESET, valueSetId }
}

export const setValueSet = (valueSetId, valueSet) => {
    return { type: SET_VALUESET, valueSetId, valueSet }
}

export const setValueSetIsLoading = (valueSetId, isLoading) => {
    return { type: SET_VALUESET_IS_LOADING, valueSetId, isLoading }
}

export const setValueSetError = (valueSetId, error) => {
    return { type: SET_VALUESET_ERROR, valueSetId, error }
}

// sagas

function* fetchValueSet(action) {

    yield put(setValueSetIsLoading(action.valueSetId, true))

    const url = 'http://hapi.fhir.org/baseDstu3/ValueSet/' + action.valueSetId

    try {
        const response = yield call(fetch, url)

        if (!response.ok) {
            throw new Error(response.status)
        }

        const json = yield response.json()

        let items = json.compose.include[0].concept // FHIR fun
        let valueSet = {} // {code: display}
        items.forEach(item => valueSet[item.code] = item.display)

        yield put(setValueSet(action.valueSetId, valueSet))
    } catch(error) {
        yield put(setValueSetError(action.valueSetId, error.message))
    }

    yield put(setValueSetIsLoading(action.valueSetId, false))

}


export function* watchFetchValueSet() {
    // !!!: to prevent duplicate network requests, we need to cache actions
    const tasks = {} // { valueSetId: task }

    while (true) {
        const action = yield take(LOAD_VALUESET)
        const previousTask = tasks[action.valueSetId]
        if (previousTask === undefined || previousTask.isRunning() === false) {
            tasks[action.valueSetId] = yield fork(fetchValueSet, action)
        }
    }
}
