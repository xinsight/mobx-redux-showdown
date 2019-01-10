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
        const { load, valueSet } = this.props
        load(valueSet)
    }

    render () {

        const { isLoading, error, code, valueSetDisplay } = this.props

        if (isLoading) {
            return <div>Loading...</div>
        }

        if (error) {
            return <div>Error: {error}</div>
        }

        return (
            <div>Display for <b>{code}</b> is:
                <b>{valueSetDisplay || '-'}</b>
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
