import {createSlice, createSelector} from "redux-starter-kit";

export const selectValueSetById = createSelector(
    ["valueSets", (state, props) => props.valueSet],
    (valueSets, valueSetId) => valueSets[valueSetId]
);

const valueSet = createSlice({
    slice : "valueSets",
    initialState : {},
    reducers : {
        setValueSetLoading(state, action) {
            const {isLoading, valueSetId} = action.payload;
            state[valueSetId] = state[valueSetId] || {};
            state[valueSetId].isLoading = isLoading;
        },

        setValueSetError(state, action) {
            const {error, valueSetId} = action.payload;
            state[valueSetId] = state[valueSetId] || {};
            state[valueSetId].error = error;
        },

        loadValueSet(state, action) {
            const {valueSetId, valueSet} = action.payload;
            state[valueSetId].valueSet = valueSet
        }
    }
});

export const {actions : valueSetActions, reducer : valueSetReducer} = valueSet;

const {setValueSetLoading, setValueSetError, loadValueSet} = valueSetActions;


export function fetchValueSet(valueSetId) {
    return async (dispatch, getState) => {
        const valueSetEntry = selectValueSetById(getState(), {valueSet : valueSetId}) || {};

        // Bail out if we're loading or already loaded
        if(valueSetEntry.isLoading || valueSetEntry.valueSet) {
            return;
        }

        dispatch(setValueSetLoading({valueSetId, isLoading: true}));

        const url = 'http://hapi.fhir.org/baseDstu3/ValueSet/' + valueSetId

        try {
            const response = await fetch(url);

            const json = await response.json()

            let items = json.compose.include[0].concept // FHIR fun
            let valueSet = {} // {code: display}
            items.forEach(item => valueSet[item.code] = item.display)

            dispatch(loadValueSet({valueSetId, valueSet}))
        } catch(error) {
            console.error(error)
            dispatch(setValueSetError(valueSetId, error.message))
        }

        dispatch(setValueSetLoading({valueSetId, isLoading: false}))
    }
}

