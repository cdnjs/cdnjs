// src/index.ts
import { defineConfig, twind, cssom, observe } from "@twind/core";
import autoprefix from "@twind/preset-autoprefix";
import tailwind from "@twind/preset-tailwind";
export * from "@twind/core";
var config = defineConfig({
  presets: [
    autoprefix(),
    tailwind()
  ]
});
var tw = observe(twind(config, cssom()));
export {
  tw
};
//# sourceMappingURL=twind.esnext.js.map
