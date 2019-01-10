import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

/** show the display of a value set code */
//@inject('ValueSetStore')
//@observer
const ValueSetDisplay = inject('ValueSetStore')(observer(class ValueSetDisplay extends React.Component {

    static propTypes = {
        valueSet: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,
    }

    render () {

        const { ValueSetStore, valueSet, code } = this.props

        if (ValueSetStore.isLoading(valueSet)) {
            return <div>Loading...</div>
        }

        if (ValueSetStore.error) {
            return <div>Error: {JSON.stringify(ValueSetStore.error)}</div>
        }

        return (
            <div>Display for <b>{code}</b> is:
                <b>{ValueSetStore.display({valueSet, code}) || '-'}</b>
            </div>
        )
    }
}))


export default ValueSetDisplay
