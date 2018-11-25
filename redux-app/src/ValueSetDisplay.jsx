import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {createSelector} from"redux-starter-kit";

import { fetchValueSet } from "./features/valueSets";

const selectValueSetById = createSelector(
    ["valueSets", (state, props) => props.valueSet],
    (valueSets, valueSetId) => valueSets[valueSetId]
);

/** show the display of a value set code */
class ValueSetDisplay extends React.Component {

    static propTypes = {
        valueSet: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,
    }

    componentDidMount() {
        this.props.fetchValueSet(this.props.valueSet)
    }

    render () {

        if (this.props.isLoading) {
            return <div>Loading...</div>
        }

        if (this.props.error) {
            return <div>Error: {this.props.error}</div>
        }

        return (
            <div>Display for <b>{this.props.code}</b> is:
                <b>{this.props.valueSetDisplay || '-'}</b>
            </div>
        )
    }
}

const mapState = (state, props) => {
    const valueSetEntry = selectValueSetById(state, props) || {};
    const {isLoading, error, valueSet = {}} = valueSetEntry;
    const valueSetDisplay = valueSet[props.code];
    return {isLoading, error, valueSetDisplay}
}


export default connect(mapState, {fetchValueSet})(ValueSetDisplay)
