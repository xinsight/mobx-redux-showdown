import {createSelector} from "redux-starter-kit";


export const selectValueSetById = createSelector(
    ["valueSets", (state, props) => props.valueSet],
    (valueSets, valueSetId) => valueSets[valueSetId]
);
