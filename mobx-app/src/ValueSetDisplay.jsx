import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

//import './ValueSetDisplay.css'

/** show the display of a value set code */
//@inject('ValueSetStore')
//@observer
const ValueSetDisplay = inject('ValueSetStore')(observer(class ValueSetDisplay extends React.Component {

    static propTypes = {
        valueSet: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,
    }

    componentDidMount() {
        this.props.ValueSetStore.load(this.props.valueSet)
    }

    render () {

        const ValueSetStore = this.props.ValueSetStore

        if (ValueSetStore.isLoading(this.props.valueSet)) {
            return <div>Loading...</div>
        }

        if (ValueSetStore.error) {
            return <div>Error: {JSON.stringify(ValueSetStore.error)}</div>
        }

        return (
            <div>Display for <b>{this.props.code}</b> is:
                <b>{ValueSetStore.display({valueSet: this.props.valueSet, code: this.props.code}) || '-'}</b>
            </div>
        )
    }
}))


export default ValueSetDisplay
