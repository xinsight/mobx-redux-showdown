import React from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { valueSetsState, dispatcherState } from './atoms'
// import { useEffect } from 'react'
// import { useRecoilCallback, useRecoilState } from 'recoil'
import { createDispatcher } from './dispatcher'

// recoil seems to like mixing the data model with the view, gross!
// TODO: can we extract recoil into pure js? (or does it need to be in a component?)
// (probably needs to be in a component)
// we can define atoms outside of a component
// - can store a "dispatcher" inside an atom

export function Dispatcher() {
    // set up our dispatcher (model)
    const setDispatcher = useSetRecoilState(dispatcherState);
    const dispatcherRef = React.useRef(createDispatcher());
    React.useEffect(() => {
        setDispatcher(dispatcherRef.current);
    });

    return null
}

// but we cannot read the value..
export function ValueSetModel() {

    const valueSetId = "511308" // HACK

    var error

    const setValueSets = useSetRecoilState(valueSetsState)

    const url = 'http://hapi.fhir.org/baseDstu3/ValueSet/' + valueSetId

        // this.loading.set(valueSetId, true)
    // error = undefined

    fetch(url)
        .then(response => {
            if (!response.ok) {
            return Promise.reject(response.status)
            }
            return response.json()
        })
        .then(json => {
            let items = json.compose.include[0].concept // FHIR fun
            let values = {} // {code: display}
            items.forEach(item => values[item.code] = item.display)
            // this.valueSets.set(valueSetId, values)
            setValueSets(values)

        })
        .catch((err) => {
            console.error('🛑: ' + err)
            error = err
        })
        .finally(() => {
            // this.loading.set(valueSetId, false)
        })

    return null
}

export default function ValueSetDisplay(props) {

    const dispatcher = useRecoilValue(dispatcherState);
    console.log(dispatcher)
    if (dispatcher !== undefined) {
        dispatcher.logMessage("in valueSetDisplay", props)

        // TODO: start downloading if needed

    }

    const valueSets = useRecoilValue(valueSetsState);

    var code = props.code

    var display = valueSets[code]

    return (
            <div>Display for <b>{code}</b> is:
                <b>{display || '-'}</b>
            </div>
        )
}