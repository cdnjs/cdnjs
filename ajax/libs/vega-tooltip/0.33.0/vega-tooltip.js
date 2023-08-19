(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vega-util')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vega-util'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.vegaTooltip = {}, global.vega));
})(this, (function (exports, vegaUtil) { 'use strict';

  var name = "vega-tooltip";
  var version$1 = "0.33.0";
  var description = "A tooltip plugin for Vega-Lite and Vega visualizations.";
  var keywords = ["vega-lite", "vega", "tooltip"];
  var repository = {
    type: "git",
    url: "https://github.com/vega/vega-tooltip.git"
  };
  var author = {
    name: "UW Interactive Data Lab",
    url: "https://idl.cs.washington.edu"
  };
  var collaborators = ["Dominik Moritz", "Sira Horradarn", "Zening Qu", "Kanit Wongsuphasawat", "Yuri Astrakhan", "Jeffrey Heer"];
  var license = "BSD-3-Clause";
  var bugs = {
    url: "https://github.com/vega/vega-tooltip/issues"
  };
  var homepage = "https://github.com/vega/vega-tooltip#readme";
  var main = "build/vega-tooltip.js";
  var module = "build/vega-tooltip.module.js";
  var unpkg = "build/vega-tooltip.min.js";
  var jsdelivr = "build/vega-tooltip.min.js";
  var types = "build/vega-tooltip.module.d.ts";
  var files = ["src", "build", "types"];
  var scripts = {
    prebuild: "yarn clean && yarn build:style",
    build: "rollup -c",
    "build:style": "./build-style.sh",
    clean: "rimraf build && rimraf src/style.ts",
    "copy:data": "rsync -r node_modules/vega-datasets/data/* examples/data",
    "copy:build": "rsync -r build/* examples/build",
    "deploy:gh": "yarn build && yarn copy:build && gh-pages -d examples && yarn clean",
    prepublishOnly: "yarn clean && yarn build",
    preversion: "yarn lint && yarn test",
    serve: "browser-sync start -s -f build examples --serveStatic examples",
    start: "yarn build && concurrently --kill-others -n Server,Rollup 'yarn serve' 'rollup -c -w'",
    pretest: "yarn build:style",
    test: "jest",
    "test:inspect": "node --inspect-brk ./node_modules/.bin/jest --runInBand",
    prepare: "yarn copy:data",
    prettierbase: "prettier '*.{css,scss,html}'",
    format: "eslint . --fix && yarn prettierbase --write",
    lint: "eslint . && yarn prettierbase --check",
    release: "release-it"
  };
  var devDependencies = {
    "@babel/core": "^7.22.10",
    "@babel/plugin-proposal-async-generator-functions": "^7.20.7",
    "@babel/plugin-proposal-json-strings": "^7.18.6",
    "@babel/plugin-proposal-object-rest-spread": "^7.20.7",
    "@babel/plugin-proposal-optional-catch-binding": "^7.18.6",
    "@babel/plugin-transform-runtime": "^7.22.10",
    "@babel/preset-env": "^7.22.10",
    "@babel/preset-typescript": "^7.22.5",
    "@release-it/conventional-changelog": "^7.0.0",
    "@rollup/plugin-json": "^6.0.0",
    "@rollup/plugin-node-resolve": "^15.1.0",
    "@rollup/plugin-terser": "^0.4.3",
    "@types/jest": "^29.5.3",
    "@typescript-eslint/eslint-plugin": "^6.3.0",
    "@typescript-eslint/parser": "^6.3.0",
    "browser-sync": "^2.29.3",
    concurrently: "^8.2.0",
    eslint: "^8.46.0",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-jest": "^27.2.3",
    "eslint-plugin-prettier": "^5.0.0",
    "gh-pages": "^5.0.0",
    jest: "^29.6.2",
    "jest-environment-jsdom": "^29.6.2",
    path: "^0.12.7",
    prettier: "^3.0.1",
    "release-it": "^16.1.3",
    rollup: "^3.27.2",
    "rollup-plugin-bundle-size": "^1.0.3",
    "rollup-plugin-ts": "^3.4.3",
    sass: "^1.64.2",
    typescript: "~5.1.6",
    "vega-datasets": "^2.7.0",
    "vega-typings": "^0.24.2"
  };
  var dependencies = {
    "vega-util": "^1.17.2"
  };
  var pkg = {
    name: name,
    version: version$1,
    description: description,
    keywords: keywords,
    repository: repository,
    author: author,
    collaborators: collaborators,
    license: license,
    bugs: bugs,
    homepage: homepage,
    main: main,
    module: module,
    unpkg: unpkg,
    jsdelivr: jsdelivr,
    types: types,
    files: files,
    scripts: scripts,
    devDependencies: devDependencies,
    dependencies: dependencies
  };

  /**
   * Format the value to be shown in the tooltip.
   *
   * @param value The value to show in the tooltip.
   * @param valueToHtml Function to convert a single cell value to an HTML string
   */
  function formatValue(value, valueToHtml, maxDepth) {
    if (vegaUtil.isArray(value)) {
      return `[${value.map(v => valueToHtml(vegaUtil.isString(v) ? v : stringify(v, maxDepth))).join(', ')}]`;
    }
    if (vegaUtil.isObject(value)) {
      let content = '';
      const {
        title,
        image,
        ...rest
      } = value;
      if (title) {
        content += `<h2>${valueToHtml(title)}</h2>`;
      }
      if (image) {
        content += `<img src="${valueToHtml(image)}">`;
      }
      const keys = Object.keys(rest);
      if (keys.length > 0) {
        content += '<table>';
        for (const key of keys) {
          let val = rest[key];

          // ignore undefined properties
          if (val === undefined) {
            continue;
          }
          if (vegaUtil.isObject(val)) {
            val = stringify(val, maxDepth);
          }
          content += `<tr><td class="key">${valueToHtml(key)}</td><td class="value">${valueToHtml(val)}</td></tr>`;
        }
        content += `</table>`;
      }
      return content || '{}'; // show empty object if there are no properties
    }

    return valueToHtml(value);
  }
  function replacer(maxDepth) {
    const stack = [];
    return function (key, value) {
      if (typeof value !== 'object' || value === null) {
        return value;
      }
      const pos = stack.indexOf(this) + 1;
      stack.length = pos;
      if (stack.length > maxDepth) {
        return '[Object]';
      }
      if (stack.indexOf(value) >= 0) {
        return '[Circular]';
      }
      stack.push(value);
      return value;
    };
  }

  /**
   * Stringify any JS object to valid JSON
   */
  function stringify(obj, maxDepth) {
    return JSON.stringify(obj, replacer(maxDepth));
  }

  // generated with build-style.sh
  var defaultStyle = `#vg-tooltip-element {
  visibility: hidden;
  padding: 8px;
  position: fixed;
  z-index: 1000;
  font-family: sans-serif;
  font-size: 11px;
  border-radius: 3px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  /* The default theme is the light theme. */
  background-color: rgba(255, 255, 255, 0.95);
  border: 1px solid #d9d9d9;
  color: black;
}
#vg-tooltip-element.visible {
  visibility: visible;
}
#vg-tooltip-element h2 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 13px;
}
#vg-tooltip-element table {
  border-spacing: 0;
}
#vg-tooltip-element table tr {
  border: none;
}
#vg-tooltip-element table tr td {
  overflow: hidden;
  text-overflow: ellipsis;
  padding-top: 2px;
  padding-bottom: 2px;
}
#vg-tooltip-element table tr td.key {
  color: #808080;
  max-width: 150px;
  text-align: right;
  padding-right: 4px;
}
#vg-tooltip-element table tr td.value {
  display: block;
  max-width: 300px;
  max-height: 7em;
  text-align: left;
}
#vg-tooltip-element.dark-theme {
  background-color: rgba(32, 32, 32, 0.9);
  border: 1px solid #f5f5f5;
  color: white;
}
#vg-tooltip-element.dark-theme td.key {
  color: #bfbfbf;
}
`;

  const EL_ID = 'vg-tooltip-element';
  const DEFAULT_OPTIONS = {
    /**
     * X offset.
     */
    offsetX: 10,
    /**
     * Y offset.
     */
    offsetY: 10,
    /**
     * ID of the tooltip element.
     */
    id: EL_ID,
    /**
     * ID of the tooltip CSS style.
     */
    styleId: 'vega-tooltip-style',
    /**
     * The name of the theme. You can use the CSS class called [THEME]-theme to style the tooltips.
     *
     * There are two predefined themes: "light" (default) and "dark".
     */
    theme: 'light',
    /**
     * Do not use the default styles provided by Vega Tooltip. If you enable this option, you need to use your own styles. It is not necessary to disable the default style when using a custom theme.
     */
    disableDefaultStyle: false,
    /**
     * HTML sanitizer function that removes dangerous HTML to prevent XSS.
     *
     * This should be a function from string to string. You may replace it with a formatter such as a markdown formatter.
     */
    sanitize: escapeHTML,
    /**
     * The maximum recursion depth when printing objects in the tooltip.
     */
    maxDepth: 2,
    /**
     * A function to customize the rendered HTML of the tooltip.
     * @param value A value string, or object of value strings keyed by field
     * @param sanitize The `sanitize` function from `options.sanitize`
     * @returns {string} The returned string will become the `innerHTML` of the tooltip element
     */
    formatTooltip: formatValue
  };
  /**
   * Escape special HTML characters.
   *
   * @param value A value to convert to string and HTML-escape.
   */
  function escapeHTML(value) {
    return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  }
  function createDefaultStyle(id) {
    // Just in case this id comes from a user, ensure these is no security issues
    if (!/^[A-Za-z]+[-:.\w]*$/.test(id)) {
      throw new Error('Invalid HTML ID');
    }
    return defaultStyle.toString().replace(EL_ID, id);
  }

  /**
   * Position the tooltip
   *
   * @param event The mouse event.
   * @param tooltipBox
   * @param offsetX Horizontal offset.
   * @param offsetY Vertical offset.
   */
  function calculatePosition(event, tooltipBox, offsetX, offsetY) {
    let x = event.clientX + offsetX;
    if (x + tooltipBox.width > window.innerWidth) {
      x = +event.clientX - offsetX - tooltipBox.width;
    }
    let y = event.clientY + offsetY;
    if (y + tooltipBox.height > window.innerHeight) {
      y = +event.clientY - offsetY - tooltipBox.height;
    }
    return {
      x,
      y
    };
  }

  /**
   * The tooltip handler class.
   */
  class Handler {
    /**
     * The handler function. We bind this to this function in the constructor.
     */

    /**
     * Complete tooltip options.
     */

    /**
     * The tooltip html element.
     */

    /**
     * Create the tooltip handler and initialize the element and style.
     *
     * @param options Tooltip Options
     */
    constructor(options) {
      this.options = {
        ...DEFAULT_OPTIONS,
        ...options
      };
      const elementId = this.options.id;
      this.el = null;

      // bind this to call
      this.call = this.tooltipHandler.bind(this);

      // prepend a default stylesheet for tooltips to the head
      if (!this.options.disableDefaultStyle && !document.getElementById(this.options.styleId)) {
        const style = document.createElement('style');
        style.setAttribute('id', this.options.styleId);
        style.innerHTML = createDefaultStyle(elementId);
        const head = document.head;
        if (head.childNodes.length > 0) {
          head.insertBefore(style, head.childNodes[0]);
        } else {
          head.appendChild(style);
        }
      }
    }

    /**
     * The tooltip handler function.
     */
    tooltipHandler(handler, event, item, value) {
      // console.log(handler, event, item, value);

      // append a div element that we use as a tooltip unless it already exists
      this.el = document.getElementById(this.options.id);
      if (!this.el) {
        this.el = document.createElement('div');
        this.el.setAttribute('id', this.options.id);
        this.el.classList.add('vg-tooltip');
        const tooltipContainer = document.fullscreenElement ?? document.body;
        tooltipContainer.appendChild(this.el);
      }

      // hide tooltip for null, undefined, or empty string values
      if (value == null || value === '') {
        this.el.classList.remove('visible', `${this.options.theme}-theme`);
        return;
      }

      // set the tooltip content
      this.el.innerHTML = this.options.formatTooltip(value, this.options.sanitize, this.options.maxDepth);

      // make the tooltip visible
      this.el.classList.add('visible', `${this.options.theme}-theme`);
      const {
        x,
        y
      } = calculatePosition(event, this.el.getBoundingClientRect(), this.options.offsetX, this.options.offsetY);
      this.el.style.top = `${y}px`;
      this.el.style.left = `${x}px`;
    }
  }

  const version = pkg.version;

  /**
   * Create a tooltip handler and register it with the provided view.
   *
   * @param view The Vega view.
   * @param opt Tooltip options.
   */
  function index (view, opt) {
    const handler = new Handler(opt);
    view.tooltip(handler.call).run();
    return handler;
  }

  exports.DEFAULT_OPTIONS = DEFAULT_OPTIONS;
  exports.Handler = Handler;
  exports.calculatePosition = calculatePosition;
  exports.createDefaultStyle = createDefaultStyle;
  exports.default = index;
  exports.escapeHTML = escapeHTML;
  exports.formatValue = formatValue;
  exports.replacer = replacer;
  exports.stringify = stringify;
  exports.version = version;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=vega-tooltip.js.map
