
import { writable } from 'svelte/store';

// {valueSetId: {code: display} }
export let valueSets = writable({})

export let isLoading = writable(false)

export let error = writable(null)

// HACK: we can't use the $isLoading shortcut here, and you can only read
// a store as a result from a subscribe callback, so we create a variable that just
// monitors the isLoading value
let _isLoading
isLoading.subscribe(value => {
    _isLoading = value
})

export function load(valueSetId) {

    if (_isLoading) {
        return
    }
	const url = 'http://hapi.fhir.org/baseDstu3/ValueSet/' + valueSetId

	isLoading.set(true)

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
                valueSets.update(n => n[valueSetId] = values)
            })
            .catch((err) => {
                console.error('🛑: ' + err)
                error.set(err)
            })
            .finally(() => {
				isLoading.set(false)
            })

}
