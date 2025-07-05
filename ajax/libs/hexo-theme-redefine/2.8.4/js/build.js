const { minify } = require("terser");
const fs = require("fs/promises");
const path = require("path");
const glob = require("glob-promise");

const THEME_ROOT = path.join(__dirname, "../..");
const SOURCE_DIR = path.join(THEME_ROOT, "source/js");
const BUILD_DIR = path.join(THEME_ROOT, "source/js/build");
const IGNORE_PATTERNS = [
  path.join(SOURCE_DIR, "libs/**"),
  path.join(BUILD_DIR, "**"),
  path.join(SOURCE_DIR, "build.js"),
];

const minifyOptions = {
  compress: {
    dead_code: true,
    drop_console: false,
    drop_debugger: true,
    keep_classnames: true,
    keep_fnames: true,
  },
  mangle: {
    keep_classnames: true,
    keep_fnames: true,
  },
  format: {
    comments: false,
  },
  module: true,
  sourceMap: {
    filename: "source-map",
    url: "source-map.map",
  },
};

async function ensureDirectoryExists(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (err) {
    if (err.code !== "EEXIST") {
      throw new Error(`Failed to create directory ${dir}: ${err.message}`);
    }
  }
}

async function copyFile(source, destination) {
  try {
    const destinationDir = path.dirname(destination);
    await ensureDirectoryExists(destinationDir);
    await fs.copyFile(source, destination);
    console.log(`✓ Copied ${source} -> ${destination}`);
  } catch (err) {
    console.error(`× Error copying ${source}:`, err);
    throw err;
  }
}

async function processFile(file) {
  try {
    const code = await fs.readFile(file, "utf8");
    const relativePath = path.relative(SOURCE_DIR, file);
    const buildPath = path.join(BUILD_DIR, relativePath);
    const buildDirPath = path.dirname(buildPath);

    // Update source map options for this specific file
    const fileSpecificOptions = {
      ...minifyOptions,
      sourceMap: {
        ...minifyOptions.sourceMap,
        filename: path.basename(file),
        url: `${path.basename(file)}.map`,
      },
    };

    const minified = await minify(code, fileSpecificOptions);

    await ensureDirectoryExists(buildDirPath);

    // Write minified code
    await fs.writeFile(buildPath, minified.code);

    // Write source map if it exists
    if (minified.map) {
      await fs.writeFile(`${buildPath}.map`, minified.map);
    }

    console.log(`✓ Minified ${file} -> ${buildPath}`);
  } catch (err) {
    console.error(`× Error processing ${file}:`, err);
    throw err; // Re-throw to handle in the main function
  }
}

async function minifyJS() {
  try {
    await ensureDirectoryExists(BUILD_DIR);

    // Get lib files to copy
    const libFiles = await glob(`${SOURCE_DIR}/libs/**/*.js`);
    
    // Get JS files to minify (excluding libs and other ignored patterns)
    const files = await glob(`${SOURCE_DIR}/**/*.js`, {
      ignore: IGNORE_PATTERNS,
    });

    if (files.length === 0 && libFiles.length === 0) {
      console.log("No JavaScript files found to process");
      return;
    }

    console.log(`Found ${files.length} files to minify and ${libFiles.length} lib files to copy...`);

    // Copy lib files
    for (const file of libFiles) {
      const relativePath = path.relative(SOURCE_DIR, file);
      const buildPath = path.join(BUILD_DIR, relativePath);
      await copyFile(file, buildPath);
    }

    // Process remaining files in parallel with a concurrency limit
    const concurrencyLimit = 4; // Adjust based on your needs
    const chunks = [];

    for (let i = 0; i < files.length; i += concurrencyLimit) {
      chunks.push(files.slice(i, i + concurrencyLimit));
    }

    for (const chunk of chunks) {
      await Promise.all(chunk.map(processFile));
    }

    console.log("\n✓ All files processed successfully!");
  } catch (err) {
    console.error("× Build failed:", err);
    process.exit(1);
  }
}

// Run the build process
minifyJS().catch((err) => {
  console.error("× Unhandled error:", err);
  process.exit(1);
});
