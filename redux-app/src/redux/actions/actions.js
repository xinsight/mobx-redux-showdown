
export const LOAD_VALUESET = 'LOAD_VALUESET'
export const SET_VALUESET = 'SET_VALUESET'
export const SET_VALUESET_IS_LOADING = 'SET_VALUESET_IS_LOADING'
export const SET_VALUESET_ERROR = 'SET_VALUESET_ERROR'

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
