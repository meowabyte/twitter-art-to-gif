import { minify } from "html-minifier-terser";
import { building } from "$app/environment";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const resp = await resolve(event);

  // minify html on build
  if (building && resp.headers.get("content-type")?.includes("text/html")) {
    const minified = await minify(await resp.text(), {
      collapseWhitespace: true,
      removeComments: true,
      minifyJS: true,
      minifyCSS: true,
    });

    return new Response(minified, {
      headers: resp.headers,
    });
  }

  return resp;
};
