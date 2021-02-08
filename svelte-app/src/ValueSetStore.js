
import { writable, get, derived } from 'svelte/store';

// {valueSetId: {code: display} }
export let valueSets = writable({})

export let isLoading = writable(false)

export let error = writable(null)

export let cacheDate = writable(null)

// if all the individual store variables are too much of a hassle to import, you
// could also create a derived object with all the values you want to track
export let responseObject = derived([valueSets, isLoading, error, cacheDate], ([valueSets, isLoading, error, cacheDate]) => {
    return { isLoading, error, valueSets, cacheDate }
})

export function load(valueSetId) {

    if (get(isLoading)) {
        return
    }
    const url = 'http://hapi.fhir.org/baseDstu3/ValueSet/' + valueSetId

    error.set(null)
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
                cacheDate.set(new Date())
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
