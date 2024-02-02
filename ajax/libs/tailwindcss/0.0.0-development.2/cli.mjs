import {
  compile,
  optimizeCss,
  preflight_default
} from "./chunk-GRUWWN35.mjs";

// src/cli/index.ts
import { scanDir } from "@tailwindcss/oxide";
var root = process.cwd();
var project = scanDir({ base: root });
console.log(optimizeCss(preflight_default + compile(project.candidates)));
