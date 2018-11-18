
import {
    setValueSet,
    setValueSetIsLoading,
    setValueSetError,
    LOAD_VALUESET
} from '../../redux/actions/actions'

import { put, take, fork } from 'redux-saga/effects'


function* fetchValueSet(action) {

    yield put(setValueSetIsLoading(action.valueSetId, true))

    const url = 'http://hapi.fhir.org/baseDstu3/ValueSet/' + action.valueSetId

    try {
        const response = yield fetch(url)

        const json = yield response.json()

        let items = json.compose.include[0].concept // FHIR fun
        let valueSet = {} // {code: display}
        items.forEach(item => valueSet[item.code] = item.display)

        yield put(setValueSet(action.valueSetId, valueSet))
    } catch(error) {
        yield put(setValueSetError(action.valueSetId, error))
    }

    yield put(setValueSetIsLoading(action.valueSetId, false))

}


export default function* watchFetchValueSet() {
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
