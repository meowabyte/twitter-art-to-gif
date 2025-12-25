<script lang="ts">
    import "@/styles/main.css";
    import { onMount } from "svelte";
    import TwitterLogo from "@/img/twitter_logo.svg?component";
    import Upload from "@/components/upload.svelte";
    import Loader from "@/components/loader.svelte";
    import Results from "@/components/results.svelte";
    import ConverterManager from "@/libs/converter";
    import ConversionWorker from "@/libs/converter/worker?worker";

    let loadingStatus: string | null = $state("Loading...");
    let processedFiles: Record<string, string> = $state({});

    let toProcess: string[] = [];
    const updateProcessingStatus = () => {
        if (toProcess.length === 0) return (loadingStatus = null);
        loadingStatus = `Converting ${toProcess.slice(0, 2).join(", ")}${toProcess.length > 2 ? ` (...and ${toProcess.length - 2} more)` : ""}`;
    };

    let convert: ConverterManager;
    onMount(async () => {
        convert = new ConverterManager(new ConversionWorker());

        convert.on("status", ({ message, ready }) => {
            loadingStatus = ready ? null : (message ?? "Loading...");
        });

        convert.on("error", (msg) => {
            alert(
                `There was error when trying to do: ${msg.context}\nPlease contact dev!`,
            );
            console.error(msg);
        });

        convert.on("convertResult", (msg) => {
            toProcess = toProcess.filter((n) => n !== msg.name);
            updateProcessingStatus();

            if (!msg.success) {
                alert(
                    `Could not convert "${msg.name}". Check console and contact dev!`,
                );
                console.error(msg);
                return;
            }

            processedFiles[msg.name] = msg.data;
        });
    });

    const processFiles = async (files: File[]) => {
        Object.values(processedFiles).forEach((url) =>
            URL.revokeObjectURL(url),
        );
        processedFiles = {};

        for (const file of files) {
            const baseName = file.name.replace(/\.[^.]*$/, "");

            toProcess.push(baseName);
            updateProcessingStatus();

            convert.emit("convert", {
                name: baseName,
                data: await file.arrayBuffer(),
            });
        }
    };
</script>

<main>
    <header>
        <TwitterLogo width="80" />
        <h1>ArtToGIF for Twitter</h1>
        <span
            >Quickly convert your image or art to GIF to prevent AI tools being
            attached!</span
        >
    </header>
    <Results results={processedFiles} />
    {#if loadingStatus}<Loader status={loadingStatus} />
    {:else}<Upload onSelected={processFiles} />
    {/if}
    <footer>
        <span>created by <a href="https://meowa.site">meowabyte</a></span>
    </footer>
</main>
