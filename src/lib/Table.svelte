<script lang="ts">
    export let data: any[];

    $: columns = data && data[0] && Object.keys(data[0]);

    function getCellValue(row: any, column: string) {
        const value = row[column];
        if (value === 'NULL') return '';
        return value;
    }
</script>

{#if data && columns?.length}
    <table>
        <thead>
            <tr>
                {#each columns as column}
                    <th>{column}</th>
                {/each}
            </tr>
        </thead>

        <tbody>
            {#each data as row}
                <tr>
                    {#each columns as column}
                        <td>{getCellValue(row, column)}</td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
{/if}

<style>
    table {
        width: 100%;
        margin-top: 2rem;
        border-spacing: 0;
    }

    th {
        font-weight: 600;
    }

    th,
    td {
        text-align: left;
        font-size: 14px;
        max-width: 300px;
        /* border: 1px solid #ccc; */
        padding: 1rem 1.25rem;
    }

    tbody tr:nth-of-type(odd) td {
        background: #f5f5f5;
    }
</style>
