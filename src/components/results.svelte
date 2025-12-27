<script lang="ts">
    type Props = { results: Record<string, string> };
    let { results }: Props = $props();
</script>

{#if Object.keys(results).length > 0}
    <div class="results">
        <h2>Results:</h2>
        <div class="results-items">
            <table>
                <tbody>
                    {#each Object.entries(results) as [string, string][] as [fileName, blobUrl] (fileName)}
                        <tr>
                            <td>{fileName}</td>
                            <td>
                                <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
                                <a href={blobUrl} download={`${fileName}.gif`}
                                    >Download...</a
                                >
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
{/if}

<style>
    .results {
        display: flex;
        flex-direction: column;
    }
    .results-items {
        max-height: 20vh;
        overflow-y: auto;
    }
    table {
        border-spacing: 10px;
    }
    td {
        border: 2px dotted;
        padding: 10px;
        min-width: 100px;
        max-width: 300px;
        word-break: break-all;
    }
</style>
