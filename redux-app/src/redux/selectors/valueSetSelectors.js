

const valueSets = (state, _) => state.valueSets
const valueSetId = (_, props) => props.valueSet
const code = (_, props) => props.code

const valueSetRoot = (state, props) => { // convention: "Root" is the parent object
    let valueSets_ = valueSets(state, props) // convention: underscore indicates variable holding result of function with same name
    let valueSetId_ = valueSetId(state, props)
    if (valueSets_) {
        return valueSets_.get(valueSetId_)
    }
}

export const valueSet = (state, props) => {
    let valueSetRoot_ = valueSetRoot(state, props)
    if (valueSetRoot_) {
        return valueSetRoot_.get('valueSet')
    }
}

export const display = (state, props) => {
    let valueSet_ = valueSet(state, props)
    let code_ = code(state, props)
    if (valueSet_) {
        return valueSet_[code_]
    }
}

export const isLoading = (state, props) => {
    let valueSetRoot_ = valueSetRoot(state, props)
    if (valueSetRoot_) {
        return valueSetRoot_.isLoading
    }
}

export const error = (state, props) => {
    let valueSetRoot_ = valueSetRoot(state, props)
    if (valueSetRoot_) {
        return valueSetRoot_.error
    }
}
