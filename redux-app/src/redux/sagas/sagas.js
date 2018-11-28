
import { fork, all } from 'redux-saga/effects'

import { watchFetchValueSet } from '../features/valueSets'

export default function* rootSaga() {
    yield all([
        fork(watchFetchValueSet)
    ])
}
