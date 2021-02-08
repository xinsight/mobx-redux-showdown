<script>

import { responseObject, load as loadValueSet} from './ValueSetStore.js'
import ValueSetDisplay from './ValueSetDisplay.svelte'

let loadMore = false

</script>

<div class="main">

    <ValueSetDisplay code="34206005" valueSet="511308" />
    <ValueSetDisplay code="6064005" valueSet="511308" />
    <ValueSetDisplay code="non-existent-code" valueSet="511308" />

    {#if $responseObject.isLoading}
    Loading...
    {:else}
    Cache date: {$responseObject.cacheDate}
    {/if}

    <button on:click={() => loadMore = true}>Load more</button>
    <button on:click={() => loadValueSet("511308")}>Reload</button>

    {#if loadMore}
    <ValueSetDisplay code="12130007" valueSet="511308" />
    {/if}
</div>

<style>
    .main {
        text-align: center;
        padding: 1em;
        max-width: 320px;
        margin: 0 auto;
    }
</style>
