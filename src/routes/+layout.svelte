<script lang="ts">
    import "@/styles/global.css";
    import Icon from "@/img/favicon.svg?url";

    let { children } = $props();
</script>

<svelte:head>
    <title>ArtToGIF for Twitter!</title>
    <meta
        name="description"
        content="ArtToGIF tool allows you to quickly convert your art, image etc. to GIF preventing others from easily modifying it using Twitter's new Edit Image button"
    />
    <link rel="icon" href={Icon} />
</svelte:head>

{@render children()}
