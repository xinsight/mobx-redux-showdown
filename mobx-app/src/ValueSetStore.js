
import { decorate, observable } from 'mobx'

class ValueSetStore {

    // @observable
    valueSets = new Map() // {valueSetId: {code: display} }

    // @observable
    loading = new Map() // {valueSetId: boolean}

    isLoading = (valueSetId) => {
        return this.loading.get(valueSetId)
    }

    /** get a value set {code: display} */
    valueSet = (valueSetId) => {
        return this.valueSets.get(valueSetId)
    }

    // @observable
    error = undefined // TODO: {valueSetId: error}

    // @action
    load = (valueSetId) => {

        // skip load if already loaded...
        let valueSet = this.valueSet(valueSetId)
        if (valueSet) {
            console.log('already loaded...')
            return
        }

        if (this.isLoading(valueSetId)) {
            console.log('already loading...')
            return
        }

        const url = 'http://hapi.fhir.org/baseDstu3/ValueSet/' + valueSetId

        this.loading.set(valueSetId, true)
        this.error = undefined

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
                this.valueSets.set(valueSetId, values)
            })
            .catch((error) => {
                console.error('🛑: ' + error)
                this.error = error
            })
            .finally(() => {
                this.loading.set(valueSetId, false)
            })
    }

    /** return a display value for a given value set and code */
    display = ({valueSet, code}) => {

        this.load(valueSet)

        const valueSetObject = this.valueSet(valueSet)
        if (valueSetObject === undefined) {
            return 'Unknown value set: ' + valueSet
        }
        return valueSetObject[code]
    }

}

decorate(ValueSetStore, {
    valueSets: observable,
    loading: observable,
    error: observable,
})

export default ValueSetStore
