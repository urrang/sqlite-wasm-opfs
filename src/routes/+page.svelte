<script lang="ts">
    import { onMount } from 'svelte';
    import { localDB, EXAMPLE_QUERY } from '$lib/local-db';
    import Table from '$lib/Table.svelte';
    import DbInfo from '$lib/DBInfo.svelte';

    const activeDB = localDB.databaseInfo;

    let queryString = EXAMPLE_QUERY;
    let data: any[];

    onMount(() => localDB.init());

    async function runQuery() {
        const before = performance.now();
        data = await localDB.query(queryString);
        const after = performance.now();

        console.log(`Executed query in ${Math.round(after - before)}ms`);
    }

    function onInputKeydown(event: KeyboardEvent) {
        if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
            event.preventDefault();
            runQuery();
        }
    }
</script>

<h1>SQLite WASM OPFS Demo</h1>

<button class="secondary mr-2" on:click={() => localDB.download()}>Download DB</button>

{#if $activeDB}
    <button class="secondary danger" on:click={() => localDB.delete()}>Delete local DB</button>

    <DbInfo info={$activeDB} />

    <form on:submit|preventDefault={runQuery}>
        <label>
            <span>Query</span>
            <textarea bind:value={queryString} on:keydown={onInputKeydown}></textarea>
        </label>

        <button>Run query</button>
    </form>

    <Table {data} />
{/if}
