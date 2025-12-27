<script lang="ts">
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any  */
    type Props = { children: () => any } & (
        | ({ mode: "tweet" } & {
              text?: string;
              url?: string;
              hashtags?: string[];
              via?: string;
              related?: string[];
              inReplyTo?: string;
          })
        | ({ mode: "like" } & { tweetId?: string })
    );

    const p: Props = $props();
    const params = (() => {
        let options: Record<string, string | undefined>;
        switch (p.mode) {
            case "like":
                options = { tweet_id: p.tweetId };
                break;
            case "tweet":
                options = {
                    text: p.text,
                    url: p.url,
                    hashtags: p.hashtags?.join(","),
                    via: p.via,
                    related: p.related?.join(","),
                    in_reply_to: p.inReplyTo,
                };
                break;
            default:
                throw new Error("invalid intent mode");
        }

        Object.keys(options).forEach(
            (key) => typeof options[key] === "undefined" && delete options[key],
        );
        return options as Record<string, string>;
    })();
</script>

<a
    target="_blank"
    href={`https://twitter.com/intent/${p.mode}?${new URLSearchParams(params)}`}
    >{@render p.children()}</a
>
