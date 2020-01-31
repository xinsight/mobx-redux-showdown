
import { writable, get } from 'svelte/store';

// {valueSetId: {code: display} }
export let valueSets = writable({})

export let isLoading = writable(false)

export let error = writable(null)

export function load(valueSetId) {

    if (get(isLoading)) {
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
