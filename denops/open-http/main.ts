import type { Denops } from "https://deno.land/x/denops_std@v4.0.0/mod.ts";
import { define } from "https://deno.land/x/denops_std@v4.0.0/autocmd/mod.ts";

export const main = async (denops: Denops): Promise<void> => {
  await define(
    denops,
    "BufReadCmd",
    "https://*,http://*",
    `call denops#request("${denops.name}", "open_http_file", [])`
  );

  denops.dispatcher = {
    open_http_file: async (): Promise<void> => {
      let url = (await denops.call("bufname", "%")) as string;
      const regexp = new RegExp(
        `github.com/(?<userName>.+)/(?<repoName>.+)/blob/(?<branch>.+)/(?<filePath>.+)`
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
  };

  return await Promise.resolve();
};
