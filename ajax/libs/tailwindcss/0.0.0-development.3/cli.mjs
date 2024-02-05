import {
  compile,
  optimizeCss,
  preflight_default
} from "./chunk-MKVLCFBM.mjs";

// src/cli/index.ts
import { scanDir } from "@tailwindcss/oxide";
var root = process.cwd();
var result = scanDir({ base: root });
console.log(optimizeCss(preflight_default + compile(result.candidates)));
