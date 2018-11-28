import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { loadValueSetAction } from './redux/features/valueSets'
import * as valueSetSelectors from './redux/selectors/valueSetSelectors'

/** show the display of a value set code */
class ValueSetDisplay extends React.Component {

    static propTypes = {
        valueSet: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,
    }

    componentDidMount() {
        this.props.load(this.props.valueSet)
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

const mapStateToProps = (state, props) => ({
    isLoading: valueSetSelectors.isLoading(state, props),
    error: valueSetSelectors.error(state, props),
    valueSetDisplay: valueSetSelectors.display(state, props),
})

const mapDispatchToProps = dispatch => ({
    load: (valueSet) => dispatch(loadValueSetAction(valueSet))
})

export default connect(mapStateToProps, mapDispatchToProps)(ValueSetDisplay)
