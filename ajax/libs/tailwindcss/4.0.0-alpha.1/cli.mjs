#!/usr/bin/env node
import { __require, optimizeCss, compile, version } from './chunk-GNCUPSHB.mjs';
import parse from 'mri';
import watcher from '@parcel/watcher';
import { scanDir, clearCache, scanFiles, IO, Parsing } from '@tailwindcss/oxide';
import { existsSync } from 'node:fs';
import fs from 'node:fs/promises';
import path3 from 'node:path';
import postcss from 'postcss';
import atImport from 'postcss-import';
import pc from 'picocolors';
import { createRequire } from 'node:module';

function args(options2, argv = process.argv.slice(2)) {
  let parsed = parse(argv);
  let result = {
    _: parsed._
  };
  for (let [
    flag,
    { type, alias, default: defaultValue = type === "boolean" ? false : null }
  ] of Object.entries(options2)) {
    result[flag] = defaultValue;
    if (alias) {
      let key = alias.slice(1);
      if (parsed[key] !== void 0) {
        result[flag] = convert(parsed[key], type);
      }
    }
    {
      let key = flag.slice(2);
      if (parsed[key] !== void 0) {
        result[flag] = convert(parsed[key], type);
      }
    }
  }
  return result;
}
function convert(value, type) {
  switch (type) {
    case "string":
      return convertString(value);
    case "boolean":
      return convertBoolean(value);
    case "number":
      return convertNumber(value);
    case "boolean | string":
      return convertBoolean(value) ?? convertString(value);
    case "number | string":
      return convertNumber(value) ?? convertString(value);
    case "boolean | number":
      return convertBoolean(value) ?? convertNumber(value);
    case "boolean | number | string":
      return convertBoolean(value) ?? convertNumber(value) ?? convertString(value);
    default:
      throw new Error(`Unhandled type: ${type}`);
  }
}
function convertBoolean(value) {
  if (value === true || value === false) {
    return value;
  }
  if (value === "true") {
    return true;
  }
  if (value === "false") {
    return false;
  }
}
function convertNumber(value) {
  if (typeof value === "number") {
    return value;
  }
  {
    let valueAsNumber = Number(value);
    if (!Number.isNaN(valueAsNumber)) {
      return valueAsNumber;
    }
  }
}
function convertString(value) {
  return `${value}`;
}

// src/cli/utils/format-ns.ts
function formatNanoseconds(input) {
  let ns = typeof input === "number" ? BigInt(input) : input;
  if (ns < 1000n)
    return `${ns}ns`;
  ns /= 1000n;
  if (ns < 1000n)
    return `${ns}\xB5s`;
  ns /= 1000n;
  if (ns < 1000n)
    return `${ns}ms`;
  ns /= 1000n;
  if (ns < 60n)
    return `${ns}s`;
  ns /= 60n;
  if (ns < 60n)
    return `${ns}m`;
  ns /= 60n;
  if (ns < 24n)
    return `${ns}h`;
  ns /= 24n;
  return `${ns}d`;
}

// src/cli/utils/renderer.ts
var UI = {
  indent: 2
};
function header() {
  return `${pc.italic(pc.bold(pc.blue("\u2248")))} tailwindcss ${pc.blue(`v${version}`)}`;
}
function highlight(file) {
  return `${pc.dim(pc.blue("`"))}${pc.blue(file)}${pc.dim(pc.blue("`"))}`;
}
function relative(to, from = process.cwd(), { preferAbsoluteIfShorter = true } = {}) {
  let result = path3.relative(from, to);
  if (!result.startsWith("..")) {
    result = `.${path3.sep}${result}`;
  }
  if (preferAbsoluteIfShorter && result.length > to.length) {
    return to;
  }
  return result;
}
function wordWrap(text, width) {
  let words = text.split(" ");
  let lines = [];
  let line = "";
  let lineLength = 0;
  for (let word of words) {
    let wordLength = clearAnsiEscapes(word).length;
    if (lineLength + wordLength + 1 > width) {
      lines.push(line);
      line = "";
      lineLength = 0;
    }
    line += (lineLength ? " " : "") + word;
    lineLength += wordLength + (lineLength ? 1 : 0);
  }
  if (lineLength) {
    lines.push(line);
  }
  return lines;
}
var ESCAPE = /((?:\x9B|\x1B\[)[0-?]*[ -\/]*[@-~])/g;
function clearAnsiEscapes(input) {
  return input.replace(ESCAPE, "");
}
function formatDuration(ns) {
  let formatted = formatNanoseconds(ns);
  if (ns <= 50 * 1e6)
    return pc.green(formatted);
  if (ns <= 300 * 1e6)
    return pc.blue(formatted);
  if (ns <= 1e3 * 1e6)
    return pc.yellow(formatted);
  return pc.red(formatted);
}
function indent(value, offset = 0) {
  return `${" ".repeat(offset + UI.indent)}${value}`;
}
function eprintln(value = "") {
  process.stderr.write(`${value}
`);
}
function println(value = "") {
  process.stdout.write(`${value}
`);
}
var resolve = typeof __require?.resolve !== "undefined" ? __require.resolve : createRequire(import.meta.url).resolve;
function drainStdin() {
  return new Promise((resolve2, reject) => {
    let result = "";
    process.stdin.on("data", (chunk) => {
      result += chunk;
    });
    process.stdin.on("end", () => resolve2(result));
    process.stdin.on("error", (err) => reject(err));
  });
}
async function outputFile(file, contents) {
  try {
    let currentContents = await fs.readFile(file, "utf8");
    if (currentContents === contents)
      return;
  } catch {
  }
  await fs.mkdir(path3.dirname(file), { recursive: true });
  await fs.writeFile(file, contents, "utf8");
}

// src/cli/commands/build/index.ts
var css = String.raw;
function options() {
  return {
    "--input": {
      type: "string",
      description: "Input file",
      alias: "-i"
    },
    "--output": {
      type: "string",
      description: "Output file",
      alias: "-o"
    },
    "--watch": {
      type: "boolean | string",
      description: "Watch for changes and rebuild as needed",
      alias: "-w"
    },
    "--minify": {
      type: "boolean",
      description: "Minify the output",
      alias: "-m"
    },
    "--cwd": {
      type: "string",
      description: "The current working directory",
      default: "."
    }
  };
}
async function handle(args2) {
  let base = path3.resolve(args2["--cwd"]);
  if (args2["--output"]) {
    args2["--output"] = path3.resolve(base, args2["--output"]);
  }
  if (args2["--input"] && args2["--input"] !== "-") {
    args2["--input"] = path3.resolve(base, args2["--input"]);
    if (!existsSync(args2["--input"])) {
      eprintln(header());
      eprintln();
      eprintln(`Specified input file ${highlight(relative(args2["--input"]))} does not exist.`);
      process.exit(1);
    }
  }
  let start = process.hrtime.bigint();
  let { candidates } = scanDir({ base });
  let [input, cssImportPaths] = await handleImports(
    args2["--input"] ? args2["--input"] === "-" ? await drainStdin() : await fs.readFile(args2["--input"], "utf-8") : css`
          @import '${resolve("tailwindcss/index.css")}';
        `,
    args2["--input"] ?? base
  );
  let result = optimizeCss(compile(input, candidates), {
    file: args2["--input"] ?? "input.css",
    minify: args2["--minify"]
  });
  if (args2["--output"]) {
    await outputFile(args2["--output"], result);
  } else {
    println(result);
  }
  let end = process.hrtime.bigint();
  eprintln(header());
  eprintln();
  eprintln(`Done in ${formatDuration(end - start)}`);
  if (args2["--watch"]) {
    await watcher.subscribe(base, async (err, events) => {
      if (err) {
        console.error(err);
        return;
      }
      try {
        if (events.length === 1 && events[0].path === args2["--output"])
          return;
        let changedFiles = [];
        let rebuildStrategy = "incremental";
        for (let event of events) {
          if (event.type === "create" || event.type === "update") {
            changedFiles.push({
              file: event.path,
              extension: path3.extname(event.path).slice(1)
            });
          }
          if (cssImportPaths.includes(event.path)) {
            rebuildStrategy = "full";
            break;
          }
        }
        let start2 = process.hrtime.bigint();
        if (rebuildStrategy === "full") {
          clearCache();
          candidates = scanDir({ base }).candidates;
        } else if (rebuildStrategy === "incremental") {
          let uniqueCandidates = new Set(candidates);
          for (let candidate of scanFiles(changedFiles, IO.Sequential | Parsing.Sequential)) {
            uniqueCandidates.add(candidate);
          }
          candidates = Array.from(uniqueCandidates);
        }
        if (rebuildStrategy === "full") {
          ;
          [input, cssImportPaths] = await handleImports(
            args2["--input"] ? await fs.readFile(args2["--input"], "utf-8") : css`
                  @import '${resolve("tailwindcss/index.css")}';
                `,
            args2["--input"] ?? base
          );
        }
        let result2 = optimizeCss(compile(input, candidates), {
          file: args2["--input"] ?? "input.css",
          minify: args2["--minify"]
        });
        if (args2["--output"]) {
          await outputFile(args2["--output"], result2);
        } else {
          println(result2);
        }
        let end2 = process.hrtime.bigint();
        eprintln(`Done in ${formatDuration(end2 - start2)}`);
      } catch (err2) {
        if (err2 instanceof Error) {
          eprintln(err2.toString());
        }
      }
    });
    if (args2["--watch"] !== "always") {
      process.stdin.on("end", () => {
        process.exit(0);
      });
    }
    process.stdin.resume();
  }
}
function handleImports(input, file) {
  if (!input.includes("@import"))
    return [input, []];
  return postcss().use(atImport()).process(input, { from: file }).then((result) => [
    result.css,
    // Use `result.messages` to get the imported files. This also includes the
    // current file itself.
    result.messages.filter((msg) => msg.type === "postcss-import").map((msg) => msg.file)
  ]);
}
function help({
  invalid,
  usage,
  options: options2
}) {
  let width = process.stdout.columns;
  println(header());
  if (invalid) {
    println();
    println(`${pc.dim("Invalid command:")} ${invalid}`);
  }
  if (usage && usage.length > 0) {
    println();
    println(pc.dim("Usage:"));
    for (let [idx, example] of usage.entries()) {
      let command2 = example.slice(0, example.indexOf("["));
      let options3 = example.slice(example.indexOf("["));
      options3 = options3.replace(/\[.*?\]/g, (option) => pc.dim(option));
      let space = 1;
      let lines = wordWrap(options3, width - UI.indent - command2.length - space);
      if (lines.length > 1 && idx !== 0) {
        println();
      }
      println(indent(`${command2}${lines.shift()}`));
      for (let line of lines) {
        println(indent(line, command2.length));
      }
    }
  }
  if (options2) {
    let maxAliasLength = 0;
    for (let { alias } of Object.values(options2)) {
      if (alias) {
        maxAliasLength = Math.max(maxAliasLength, alias.length);
      }
    }
    let optionStrings = [];
    let maxOptionLength = 0;
    for (let [flag, { alias }] of Object.entries(options2)) {
      let option = [
        alias ? `${alias.padStart(maxAliasLength)}` : alias,
        alias ? flag : " ".repeat(
          maxAliasLength + 2
          /* `, `.length */
        ) + flag
      ].filter(Boolean).join(", ");
      optionStrings.push(option);
      maxOptionLength = Math.max(maxOptionLength, option.length);
    }
    println();
    println(pc.dim("Options:"));
    let minimumGap = 8;
    for (let { description, default: defaultValue = null } of Object.values(options2)) {
      let option = optionStrings.shift();
      let dotCount = minimumGap + (maxOptionLength - option.length);
      let spaces = 2;
      let availableWidth = width - option.length - dotCount - spaces - UI.indent;
      let lines = wordWrap(
        defaultValue !== null ? `${description} ${pc.dim(`[default:\u202F${highlight(`${defaultValue}`)}]`)}` : description,
        availableWidth
      );
      println(
        indent(`${pc.blue(option)} ${pc.dim(pc.gray("\xB7")).repeat(dotCount)} ${lines.shift()}`)
      );
      for (let line of lines) {
        println(indent(`${" ".repeat(option.length + dotCount + spaces)}${line}`));
      }
    }
  }
}

// src/cli/index.ts
var sharedOptions = {
  "--help": { type: "boolean", description: "Display usage information", alias: "-h" }
};
var shared = args(sharedOptions);
var command = shared._[0];
if (command) {
  help({
    invalid: command,
    usage: ["tailwindcss [options]"],
    options: { ...options(), ...sharedOptions }
  });
  process.exit(1);
}
if (process.stdout.isTTY && !process.argv.slice(2).includes("-o") || shared["--help"]) {
  help({
    usage: ["tailwindcss [--input input.css] [--output output.css] [--watch] [options\u2026]"],
    options: { ...options(), ...sharedOptions }
  });
  process.exit(0);
}
handle(args(options()));
