import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import { pluginAliases, pluginFsAllow } from "./astro.config.plugins.mjs";
import {
  dogsbaySite,
  dogsbayBase,
  dogsbayInlineStylesheets,
  dogsbayOutDir,
} from "./astro.config.dogsbay.mjs";

export default defineConfig({
  ...(dogsbaySite ? { site: dogsbaySite } : {}),
  ...(dogsbayBase ? { base: dogsbayBase } : {}),
  ...(dogsbayOutDir ? { outDir: dogsbayOutDir } : {}),
  output: "static",
  build: {
    inlineStylesheets: dogsbayInlineStylesheets,
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: { ...pluginAliases },
    },
    server: {
      fs: {
        // Allow Vite to serve plugin client modules / styles
        // shipped from outside the project root (workspace deps,
        // monorepo siblings). Empty when no plugins use absolute
        // paths.
        allow: ["..", ...pluginFsAllow],
      },
    },
  },
});
