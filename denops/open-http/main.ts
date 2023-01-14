import type { Denops } from "https://deno.land/x/denops_std@v4.0.0/mod.ts";
import { define } from "https://deno.land/x/denops_std@v4.0.0/autocmd/mod.ts";

export const main = async (denops: Denops): Promise<void> => {
  await define(
    denops,
    "BufEnter",
    "https://*,http://*",
    `call denops#request("${denops.name}", "open_http_file", [])`
  );

  denops.dispatcher = {
    open_http_file: async (): Promise<void> => {
      const url = await denops.call("bufname", "%");
      const res = await fetch(url as string);
      const text = await res.text();
      denops.call("append", 0, text.split("\n"));
    },
  };

  return await Promise.resolve();
};
