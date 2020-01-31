<script>

    import { isLoading } from './ValueSetStore.js'
    import ValueSetDisplay from './ValueSetDisplay.svelte'

</script>

<div className="App">

    <ValueSetDisplay code="34206005" valueSet="511308" />
    <ValueSetDisplay code="6064005" valueSet="511308" />
    <ValueSetDisplay code="non-existent-code" valueSet="511308" />

</div>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>
