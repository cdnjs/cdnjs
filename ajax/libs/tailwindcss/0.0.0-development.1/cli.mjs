import {
  compile,
  optimizeCss,
  preflight_default
} from "./chunk-GRUWWN35.mjs";

// src/cli/index.ts
import { resolveProjectCandidates } from "@tailwindcss/oxide";
var root = process.cwd();
var [, candidates] = resolveProjectCandidates({ base: root });
console.log(optimizeCss(preflight_default + compile(candidates)));
