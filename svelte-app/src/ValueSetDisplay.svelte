<script>
// given a valueSet and code, show the display value
import { isLoading, valueSets, load, error } from './ValueSetStore.js'

// @param
export let valueSet

// @param
export let code

// ?: move test to store?
if ($valueSets[code] === undefined) {
    load(valueSet)
}
</script>

<div>Display for <b>{code}</b> is:
    {#if $isLoading}
        <b>...</b>
    {:else if $error}
        <span class="error">{$error}</span>
    {:else}
        <b>{$valueSets[code] || "–"}</b>
    {/if}
</div>

<style>
    span.error { color: #c00; font-weight: bold; }
</style>