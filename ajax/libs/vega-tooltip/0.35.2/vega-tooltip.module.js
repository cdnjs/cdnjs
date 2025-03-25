import { isArray, isString, isObject } from 'vega-util';

var name = "vega-tooltip";
var version$1 = "0.35.2";
var description = "A tooltip plugin for Vega-Lite and Vega visualizations.";
var keywords = [
	"vega-lite",
	"vega",
	"tooltip"
];
var repository = {
	type: "git",
	url: "https://github.com/vega/vega-tooltip.git"
};
var author = {
	name: "UW Interactive Data Lab",
	url: "https://idl.cs.washington.edu"
};
var collaborators = [
	"Dominik Moritz",
	"Sira Horradarn",
	"Zening Qu",
	"Kanit Wongsuphasawat",
	"Yuri Astrakhan",
	"Jeffrey Heer"
];
var license = "BSD-3-Clause";
var bugs = {
	url: "https://github.com/vega/vega-tooltip/issues"
};
var homepage = "https://github.com/vega/vega-tooltip#readme";
var main = "build/vega-tooltip.js";
var module = "build/vega-tooltip.module.js";
var unpkg = "build/vega-tooltip.min.js";
var jsdelivr = "build/vega-tooltip.min.js";
var types = "build/src/index.d.ts";
var files = [
	"src",
	"build",
	"types"
];
var scripts = {
	prebuild: "npm run clean && npm run build:style",
	build: "rollup -c",
	"build:style": "./build-style.sh",
	clean: "rimraf build && rimraf src/style.ts",
	"copy:data": "cp -R node_modules/vega-datasets/data examples",
	"copy:build": "cp -R build examples",
	"deploy:gh": "npm run build && npm run copy:build && gh-pages -d examples && npm run clean",
	prepublishOnly: "npm run clean && npm run build",
	preversion: "npm run lint && npm run test",
	serve: "browser-sync start -s -f build examples --serveStatic examples",
	start: "npm run build && concurrently --kill-others -n Server,Rollup 'npm run serve' 'rollup -c -w'",
	pretest: "npm run build:style",
	test: "jest",
	"test:inspect": "node --inspect-brk ./node_modules/.bin/jest --runInBand",
	prepare: "npm run copy:data",
	prettierbase: "prettier '*.{css,scss,html}'",
	format: "eslint . --fix && npm run prettierbase -- --write",
	lint: "eslint . && npm run prettierbase -- --check",
	release: "release-it"
};
var devDependencies = {
	"@babel/core": "^7.26.0",
	"@babel/plugin-proposal-async-generator-functions": "^7.20.7",
	"@babel/plugin-proposal-json-strings": "^7.18.6",
	"@babel/plugin-proposal-object-rest-spread": "^7.20.7",
	"@babel/plugin-proposal-optional-catch-binding": "^7.18.6",
	"@babel/plugin-syntax-dynamic-import": "^7.8.3",
	"@babel/plugin-transform-runtime": "^7.25.9",
	"@babel/preset-env": "^7.26.0",
	"@babel/preset-typescript": "^7.26.0",
	"@release-it/conventional-changelog": "^9.0.2",
	"@rollup/plugin-json": "^6.1.0",
	"@rollup/plugin-node-resolve": "^15.3.0",
	"@rollup/plugin-terser": "^0.4.4",
	"@rollup/plugin-typescript": "^12.1.1",
	"@types/jest": "^29.5.14",
	"@typescript-eslint/eslint-plugin": "^8.13.0",
	"@typescript-eslint/parser": "^8.13.0",
	"browser-sync": "^3.0.3",
	concurrently: "^9.1.0",
	eslint: "^8.46.0",
	"eslint-config-prettier": "^9.1.0",
	"eslint-plugin-jest": "^28.8.3",
	"eslint-plugin-prettier": "^5.2.1",
	"gh-pages": "^6.2.0",
	jest: "^29.7.0",
	"jest-environment-jsdom": "^29.7.0",
	path: "^0.12.7",
	prettier: "^3.3.3",
	"release-it": "^17.10.0",
	rollup: "^4.24.4",
	"rollup-plugin-bundle-size": "^1.0.3",
	sass: "^1.80.6",
	typescript: "~5.6.3",
	"vega-datasets": "^2.9.0",
	"vega-typings": "^1.3.1"
};
var dependencies = {
	"vega-util": "^1.17.2"
};
var optionalDependencies = {
	"@rollup/rollup-linux-x64-gnu": "^4.24.4"
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
	dependencies: dependencies,
	optionalDependencies: optionalDependencies
};

/**
 * Format the value to be shown in the tooltip.
 *
 * @param value The value to show in the tooltip.
 * @param valueToHtml Function to convert a single cell value to an HTML string
 */
function formatValue(value, valueToHtml, maxDepth, baseURL) {
    if (isArray(value)) {
        return `[${value.map((v) => valueToHtml(isString(v) ? v : stringify(v, maxDepth))).join(', ')}]`;
    }
    if (isObject(value)) {
        let content = '';
        const { title, image, ...rest } = value;
        if (title) {
            content += `<h2>${valueToHtml(title)}</h2>`;
        }
        if (image) {
            content += `<img src="${new URL(valueToHtml(image), baseURL || location.href).href}">`;
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
                if (isObject(val)) {
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
    offsetX: 10,
    offsetY: 10,
    id: EL_ID,
    styleId: 'vega-tooltip-style',
    theme: 'light',
    disableDefaultStyle: false,
    sanitize: escapeHTML,
    maxDepth: 2,
    formatTooltip: formatValue,
    baseURL: '',
    anchor: 'cursor',
    position: ['top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'],
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
 * @param options Tooltip handler options.
 */
function calculatePositionRelativeToCursor(event, tooltipBox, { offsetX, offsetY }) {
    // the possible positions for the tooltip
    const positions = getPositions({ x1: event.clientX, x2: event.clientX, y1: event.clientY, y2: event.clientY }, tooltipBox, offsetX, offsetY);
    // order of positions to try
    const postionArr = ['bottom-right', 'bottom-left', 'top-right', 'top-left'];
    // test positions till a valid one is found
    for (const p of postionArr) {
        if (tooltipIsInViewport(positions[p], tooltipBox)) {
            return positions[p];
        }
    }
    // default to top-left if a valid position is not found
    // this is legacy behavior
    return positions['top-left'];
}
/**
 * Calculates the position of the tooltip relative to the mark.
 * @param handler The handler instance.
 * @param event The mouse event.
 * @param item The item that the tooltip is being shown for.
 * @param tooltipBox Client rect of the tooltip element.
 * @param options Tooltip handler options.
 * @returns
 */
function calculatePositionRelativeToMark(handler, event, item, tooltipBox, options) {
    const { position, offsetX, offsetY } = options;
    const containerBox = handler._el.getBoundingClientRect();
    const origin = handler._origin;
    // bounds of the mark relative to the viewport
    const markBounds = getMarkBounds(containerBox, origin, item);
    // the possible positions for the tooltip
    const positions = getPositions(markBounds, tooltipBox, offsetX, offsetY);
    // positions to test
    const positionArr = Array.isArray(position) ? position : [position];
    // test positions till a valid one is found
    for (const p of positionArr) {
        // verify that the tooltip is in the view and the mouse is not where the tooltip would be
        if (tooltipIsInViewport(positions[p], tooltipBox) && !mouseIsOnTooltip(event, positions[p], tooltipBox)) {
            return positions[p];
        }
    }
    // default to cursor position if a valid position is not found
    return calculatePositionRelativeToCursor(event, tooltipBox, options);
}
// Calculates the bounds of the mark relative to the viewport.
function getMarkBounds(containerBox, origin, item) {
    // if this is a voronoi mark, we want to use the bounds of the point that voronoi cell represents
    const markBounds = item.isVoronoi ? item.datum.bounds : item.bounds;
    let left = containerBox.left + origin[0] + markBounds.x1;
    let top = containerBox.top + origin[1] + markBounds.y1;
    // traverse mark groups, summing their offsets to get the total offset
    // item bounds are relative to their group so if there are multiple nested groups we need to add them all
    let parentItem = item;
    while (parentItem.mark.group) {
        parentItem = parentItem.mark.group;
        left += parentItem.x ?? 0;
        top += parentItem.y ?? 0;
    }
    const markWidth = markBounds.x2 - markBounds.x1;
    const markHeight = markBounds.y2 - markBounds.y1;
    return {
        x1: left,
        x2: left + markWidth,
        y1: top,
        y2: top + markHeight,
    };
}
// Calculates the tooltip xy for each possible position.
function getPositions(markBounds, tooltipBox, offsetX, offsetY) {
    const xc = (markBounds.x1 + markBounds.x2) / 2;
    const yc = (markBounds.y1 + markBounds.y2) / 2;
    // x positions
    const left = markBounds.x1 - tooltipBox.width - offsetX;
    const center = xc - tooltipBox.width / 2;
    const right = markBounds.x2 + offsetX;
    // y positions
    const top = markBounds.y1 - tooltipBox.height - offsetY;
    const middle = yc - tooltipBox.height / 2;
    const bottom = markBounds.y2 + offsetY;
    const positions = {
        top: { x: center, y: top },
        bottom: { x: center, y: bottom },
        left: { x: left, y: middle },
        right: { x: right, y: middle },
        'top-left': { x: left, y: top },
        'top-right': { x: right, y: top },
        'bottom-left': { x: left, y: bottom },
        'bottom-right': { x: right, y: bottom },
    };
    return positions;
}
// Checks if the tooltip would be in the viewport at the given position
function tooltipIsInViewport(position, tooltipBox) {
    return (position.x >= 0 &&
        position.y >= 0 &&
        position.x + tooltipBox.width <= window.innerWidth &&
        position.y + tooltipBox.height <= window.innerHeight);
}
// Checks if the mouse is within the tooltip area
function mouseIsOnTooltip(event, position, tooltipBox) {
    return (event.clientX >= position.x &&
        event.clientX <= position.x + tooltipBox.width &&
        event.clientY >= position.y &&
        event.clientY <= position.y + tooltipBox.height);
}

/**
 * The tooltip handler class.
 */
class Handler {
    /**
     * Create the tooltip handler and initialize the element and style.
     *
     * @param options Tooltip Options
     */
    constructor(options) {
        this.options = { ...DEFAULT_OPTIONS, ...options };
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
            }
            else {
                head.appendChild(style);
            }
        }
    }
    /**
     * The tooltip handler function.
     */
    tooltipHandler(handler, event, item, value) {
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
        this.el.innerHTML = this.options.formatTooltip(value, this.options.sanitize, this.options.maxDepth, this.options.baseURL);
        // make the tooltip visible
        this.el.classList.add('visible', `${this.options.theme}-theme`);
        const { x, y } = this.options.anchor === 'mark'
            ? calculatePositionRelativeToMark(handler, event, item, this.el.getBoundingClientRect(), this.options)
            : calculatePositionRelativeToCursor(event, this.el.getBoundingClientRect(), this.options);
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

export { DEFAULT_OPTIONS, Handler, calculatePositionRelativeToCursor, calculatePositionRelativeToMark, createDefaultStyle, index as default, escapeHTML, formatValue, getMarkBounds, getPositions, mouseIsOnTooltip, replacer, stringify, tooltipIsInViewport, version };
//# sourceMappingURL=vega-tooltip.module.js.map
