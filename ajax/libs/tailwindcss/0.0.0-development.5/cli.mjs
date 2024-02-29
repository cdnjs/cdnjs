import { __require, optimizeCss, compile } from './chunk-7FZ7GSOX.mjs';
import { scanDir } from '@tailwindcss/oxide';
import fs from 'fs';
import path from 'path';

var css = String.raw;
var root = process.cwd();
var result = scanDir({ base: root });
var pkgRoot = path.dirname(__require.resolve("tailwindcss/package.json"));
var preflight = fs.readFileSync(path.resolve(pkgRoot, "preflight.css"), "utf-8");
var defaultTheme = fs.readFileSync(path.resolve(pkgRoot, "theme.css"), "utf-8");
console.log(
  optimizeCss(
    compile(
      css`
        @layer theme, base, components, utilities;
        @layer theme {
          ${defaultTheme}
        }
        @layer base {
          ${preflight}
        }
        @layer utilities {
          @tailwind utilities;
        }
      `,
      result.candidates
    )
  )
);
