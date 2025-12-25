<script lang="ts">
    import Loader from "@lucide/svelte/icons/loader-circle";
    const { status }: { status: string } = $props();
</script>

<div>
    <Loader />
    <span>{status}</span>
</div>

<style>
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    div {
        display: flex;
        flex-direction: column;
        place-items: center;
        gap: 10px;
    }

    :global(.lucide-loader-circle) {
        animation: spin 1s linear infinite;
    }
</style>
