<script lang="ts">
    import UploadIcon from "@lucide/svelte/icons/upload";

    let inputEl: HTMLInputElement;
    let isDragging = $state(false);
    const { onSelected }: { onSelected: (files: File[]) => void } = $props();
</script>

<div>
    <input
        hidden
        type="file"
        accept="image/*"
        multiple
        bind:this={inputEl}
        onchange={(ev) => {
            if (!ev.currentTarget.files) return;

            const files = [...ev.currentTarget.files].filter((f) =>
                f.type.startsWith("image/"),
            );
            if (files.length > 0) onSelected(files);
        }}
    />
    <button
        onclick={() => inputEl.click()}
        ondragover={(ev) => {
            if (!ev.dataTransfer) return;

            const files = [...ev.dataTransfer.items].filter(
                (i) => i.kind === "file",
            );
            if (files.length === 0) return;
            ev.preventDefault();

            ev.dataTransfer.dropEffect = files.some((f) =>
                f.type.startsWith("image/"),
            )
                ? "copy"
                : "none";
        }}
        ondragenter={() => (isDragging = true)}
        ondragleave={() => (isDragging = false)}
        ondrop={(ev) => {
            ev.preventDefault();
            isDragging = false;

            const files = [...ev.dataTransfer!.items]
                .map((i) => i.getAsFile()!)
                .filter((f) => f.type.startsWith("image/"));
            onSelected(files);
        }}
        class:dragging={isDragging}
    >
        <UploadIcon />
        Click to select or drag file here...
    </button>
</div>

<style>
    button {
        user-select: none;
        border: var(--text) dotted 2px;
        background-color: oklch(20.5% 0 0);
        color: var(--text);

        transition: scale 0.2s ease-out;
        &.dragging {
            border: oklch(20.5% 0 0) dotted 2px;
            background-color: var(--text);
            color: oklch(20.5% 0 0);
            scale: 0.95;
        }

        padding: 50px;
        height: 180px;
        width: 320px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        place-items: center;
        justify-content: center;

        cursor: pointer;

        :global(& > *) {
            pointer-events: none;
        }
    }
</style>
