
import {
    setValueSet,
    setValueSetIsLoading,
    setValueSetError,
    LOAD_VALUESET
} from '../../redux/actions/actions'

import { put, takeLatest } from 'redux-saga/effects'



function* fetchValueSet(action) {

    // ???: takeLatest means that when this function is called 3x concurrently,
    // ???: it will start a function, then cancel that function and start a new one, then cancel
    // ???: that function and start a new one.
    console.log('XXX')
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

    console.log('YYY')
    yield put(setValueSetIsLoading(action.valueSetId, false))

}


export default function* watchFetchValueSet() {
    // !!!: having to deal with the edge case here feels strange, and none of the options are what i want:
    // !!!: - take the first request and let it finish, hookup all the subsequent requests to also get notified
    // !!!: - this is also a hint that the famed redux devtool is kinda noisy
    yield takeLatest(LOAD_VALUESET, fetchValueSet)
}
