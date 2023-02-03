import type { Denops } from "https://deno.land/x/denops_std@v4.0.0/mod.ts";
import { unnullish } from "https://deno.land/x/unnullish@v0.2.0/mod.ts";
import { execute } from "https://deno.land/x/denops_std@v4.0.0/helper/mod.ts";
import { define } from "https://deno.land/x/denops_std@v4.0.0/autocmd/mod.ts";
import { Server } from "https://deno.land/std@0.154.0/http/server.ts";

const PORT = unnullish(
  Deno.env.get("DENOPS_OPEN_HTTP_PORT"),
  (v) => parseInt(v, 10),
) ?? 11112;

export const main = async (denops: Denops): Promise<void> => {
  const handler = async (request: Request): Promise<Response> => {
    const { pathname } = new URL(request.url);
    const path = `https://github.com${pathname}`;

    await denops.cmd(`edit ${path}`);
    return new Response("OK", {
      status: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  };

  await execute(
    denops,
    `
    command! -nargs=? OpenHttpGitHubServerStart call denops#request("${denops.name}", "start", [<f-args>])
    command! OpenHttpGitHubServerStop call denops#request("${denops.name}", "stop", [])
    `,
  );

  await define(
    denops,
    "BufReadCmd",
    "https://*,http://*",
    `call denops#request("${denops.name}", "open_http_file", [])`,
  );

  let server: Server | undefined;

  denops.dispatcher = {
    open_http_file: async (): Promise<void> => {
      let url = (await denops.call("bufname", "%")) as string;
      const regexp = new RegExp(
        `github.com/(?<userName>.+)/(?<repoName>.+)/blob/(?<branch>.+)/(?<filePath>.+)`,
      );
      const result = regexp.exec(url);

      if (result != null) {
        url = url.replace(`/blob/`, `/raw/`);
      }
      const res = await fetch(url);
      const text = await res.text();
      denops.call("append", 0, text.split("\n"));
      denops.cmd("filetype detect");
    },
    // deno-lint-ignore require-await
    start: async (p: unknown): Promise<void> => {
      if (server) {
        return;
      }

      const port = unnullish(p, (v) => parseInt(v as string, 10)) ?? PORT;

      server = new Server({ handler, port });
      server.listenAndServe();
      console.log(`Server started on port ${port}`);
    },
    // deno-lint-ignore require-await
    stop: async (): Promise<void> => {
      if (server) {
        server.close();
        server = undefined;
        console.log("Server stopped");
      }
    },
  };

  return await Promise.resolve();
};
