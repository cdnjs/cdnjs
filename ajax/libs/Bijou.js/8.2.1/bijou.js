/**
 * @file bijou.js
 * @author Explosion-Scratch, Bijou.js contributors
 * @since v0.0.0
 * @copyright © Explosion-Scratch, All rights reserved.
 */

/* --------------------------------------------------------------------------|
  ____ ___    _  ___  _   _   _     
 | __ )_ _|  | |/ _ \| | | | (_)___ 
 |  _ \| |_  | | | | | | | | | / __|
 | |_) | | |_| | |_| | |_| | | \__ \
 |____/___\___/ \___/ \___(_)/ |___/
                           |__/     
------------------------------------------------------------------------------|
Bijou.js is copyrighted by Explosion-Scratch of GitHub and released under the GPL-3.0 License.
This software comes with ABSOLUTELY NO WARRANTY and is provided "As is" (with the best intentions of Explosion-Scratch and contributors! =D )

-----------------------------------------------------------------------------|
   ____ ___  _   _ _____ ____  ___ ____  _   _ _____ ___  ____  ____
  / ___/ _ \| \ | |_   _|  _ \|_ _| __ )| | | |_   _/ _ \|  _ \/ ___|
 | |  | | | |  \| | | | | |_) || ||  _ \| | | | | || | | | |_) \___ \
 | |__| |_| | |\  | | | |  _ < | || |_) | |_| | | || |_| |  _ < ___) |
  \____\___/|_| \_| |_| |_| \_\___|____/ \___/  |_| \___/|_| \_\____/
-----------------------------------------------------------------------------|
NOTE: Please see https://github.com/bijou-js/bijou.js#contributors- for up to date contributors with what they did.

Contributors to Bijou.js:
╔═══════════════════╦════════════════════════════╗
║ GITHUB USERNAME   ║ CONTRIBUTIONS              ║
╠═══════════════════╬════════════════════════════╣
║ Explosion-Scratch ║ Founder and creator of     ║
║                   ║ Bijou.js, over 1500        ║
║                   ║ commits to the source      ║
║                   ║ repository.                ║
╠═══════════════════╬════════════════════════════╣
║ GrahamSH-LLK      ║ Great guy, contributed     ║
║                   ║ a ton towards the          ║
║                   ║ development of this        ║
║                   ║ project. He fixed glitches ║
║                   ║ suggested new features,    ║
║                   ║ and helped publish this    ║
║                   ║ to NPM and fix the GitHub  ║
║                   ║ actions on the project.    ║
╠═══════════════════╬════════════════════════════╣
║ Touchcreator      ║ Pointed out several bugs   ║
║                   ║ in Bijou.js and suggested  ║
║                   ║ several new features.      ║
╠═══════════════════╬════════════════════════════╣
║ TheColaber        ║ Collaborated?? (lol)       ║
║                   ║ Fixed tons of bugs         ║
╠═══════════════════╬════════════════════════════╣
║ Hans5958          ║ Helped fix glitches in the ║
║                   ║ website and suggested      ║
║                   ║ fixes for GitHub actions   ║
║                   ║ glitches.                  ║
╠═══════════════════╬════════════════════════════╣
║ retronbv          ║ Suggested a lot of         ║
║                   ║ features and bug fixes.    ║
║═══════════════════║════════════════════════════║
║ thecoder876       ║ Made some improvements.    ║
╚═══════════════════╩════════════════════════════╝


(c) 2021 Explosion-Scratch, all rights reserved.

 */

let isNode = false;
if (
	typeof window === "undefined" ||
	typeof document === "undefined"
) {
	isNode = true;
} else {
	isNode = false;
}

if (isNode) {
	console.warn();
}
/**
 * @description Tests if the user is using Node.js or not and throws an error in specific functions (that require the DOM) if they are.
 */
let node = () => {
	if (isNode) {
		throw new Error(
			"You are using Node.js, this function does not work in Node.js! Sorry!",
		);
	}
};
/*
  ____   ___  _   _ ____   ____ _____
 / ___| / _ \| | | |  _ \ / ___| ____|
 \___ \| | | | | | | |_) | |   |  _|
  ___) | |_| | |_| |  _ <| |___| |___
 |____/ \___/ \___/|_| \_\\____|_____|
*/
/**
 * The array namespace of Bijou.js
 * @namespace array
 */
let array_namespace = {};
/**
 * The color namespace of Bijou.js
 * @namespace color
 */
let color_namespace = {};
/**
 * The date namespace of Bijou.js, containing functions to format dates, do math with them and more!
 * @namespace date
 */
let date_namespace = {};
/**
 * The element namespace of Bijou.js, containing functions to create elements from query selectors, enable custom right click options, test if an element is on screen, replace the text of an element without altering it's styling, and much more!
 * @namespace element
 */
let element_namespace = {};
/**
 * The event namespace of Bijou.js, containing functions to listen and dispatch events, such as scroll stop, outside click, and multiple event listeners.
 * @namespace event
 */
let event_namespace = {};
/**
 * The function namespace of Bijou.js, containing functions to work with functions themselves, such as debouncing, throttling, memoizing, currying, timing and much more!
 * @namespace function
 */
let function_namespace = {};
/**
 * The math namespace of Bijou.js, containing functions to validate credit card numbers, animate with JavaScript, generate unique id's and much more!
 * @namespace math
 */
let math_namespace = {};
/**
 * The object namespace of Bijou.js, for stuff like flattening nested objects, cloning, merging, and even listening to changes to objects!
 * @namespace object
 */
let object_namespace = {};
/**
 * The string namespace of Bijou.js, containing functions to map strings, remove accents from strings, speak text, syntax highlight JS, HTML and CSS and much more!
 * @namespace string
 */
let string_namespace = {};
/**
 * The utility namespace of Bijou.js, containing utilities to do many things, such as playing audio, fetching JSON, preloading images and much more.
 * @namespace utility
 */
let utility_namespace = {};

const req = (type, desc, condition = true) => {
	if (!condition) return;
	let err = "Missing parameter";
	if (type) {
		err += " of type " + type;
	}
	if (desc) {
		err = `Parameter ${desc} ${type ? `(${type})` : ""} required.`;
	}
	throw new Error(err);
};
//#region bijou
//#region Array
/**
 * Counts the items in an array, returning a separate count for each object.
 * @returns {Object}
 * @memberOf array
 * @function
 * @example
 * _$.count(['a', 'b', 'c', 'd', 'e', 'f'])//{'a': 1, 'b': 1, 'c': 1, 'd': 1, 'e': 1, 'f': 1}
 *
 * //But if you have multiple items:
 * _$.count(['a', 'a', b', 'b', 'c', 'd', 'e']);//{'a': 2, 'b': 2, 'c': 1, 'd': 1, 'e': 1}
 * @param {Array} arr The array to count items in.
 */
export let count = (arr = req("array", "array")) =>
	arr.reduce((counts, item) => {
		counts[item] = (counts[item] || 0) + 1;
		return counts;
	}, {});

/**
 * Returns the difference between two arrays or strings.
 * @memberOf array
 * @function
 * @returns {Array|String} The difference between two arrays or strings.
 * @example
 * console.log(_$.arrayDiff(['a', 'b'], ['a', 'b', 'c', 'd'])); // ["c", "d"]
 * @param {Array|String} a1 The first array or string
 * @param {Array|String} a2 The 2nd array or string.
 */
export let arrayDiff = (
	a1 = req("array", "array 1"),
	a2 = req("array", "array 2"),
) => {
	var a = [],
		diff = [];
	for (var i = 0; i < a1.length; i++) {
		a[a1[i]] = true;
	}
	for (var i = 0; i < a2.length; i++) {
		if (a[a2[i]]) {
			delete a[a2[i]];
		} else {
			a[a2[i]] = true;
		}
	}
	for (var k in a) {
		diff.push(k);
	}
	return diff;
};

/**
 * Gets the difference between two strings.
 * @memberOf array
 * @function
 * @param {String} text1 The 1st text to compare
 * @param {String} text2 The 2nd text to compare with the 1st one.
 * @example
 * console.log(_$.diff("hello earthlings", "hello world"); // [[6,8],[9,16]]
 * @returns {Array.<Array.<number>>} An array of arrays, each array in the main array contains 2 numbers, the start and then end of the difference.
 */
export let diff = function (
	text1 = req("string", "Text 1"),
	text2 = req("string", "Text 2"),
) {
	//Takes in two strings
	//Returns an array of the span of the differences
	//So if given:
	// text1: "that is number 124"
	// text2: "this is number 123"
	//It will return:
	// [[2,4],[17,18]]
	//If the strings are of different lengths, it will check up to the end of text1
	//If you want it to do case-insensitive difference, just convert the texts to lowercase before passing them in
	var diffRange = [];
	var currentRange = undefined;
	for (var i = 0; i < text1.length; i++) {
		if (text1[i] != text2[i]) {
			//Found a diff!
			if (currentRange == undefined) {
				//Start a new range
				currentRange = [i];
			}
		}
		if (currentRange != undefined && text1[i] == text2[i]) {
			//End of range!
			currentRange.push(i);
			diffRange.push(currentRange);
			currentRange = undefined;
		}
	}
	//Push any last range if there's still one at the end
	if (currentRange != undefined) {
		currentRange.push(i);
		diffRange.push(currentRange);
	}
	return diffRange;
};

/**
 * Removes an item from the array specified.
 * @memberOf array
 * @function
 * @param {Array} array The array to remove the item from.
 * @param {*} item The item to remove.
 * @example
 * console.log(_$.remove([5, 4, 3, 2, 1], 4)); // [5, 3, 2, 1]
 */
export let remove = (
	array = req("array", "array"),
	item = req(undefined, "item"),
) => {
	if (typeof array === "string") {
		return array.replace(item, "");
	}
	if (typeof array === "object") {
		array[`${item}`] = undefined;
		array = _$.clone(array, (itm) => itm !== undefined);
		return array;
	}
	if (array.indexOf(item) > -1) {
		array.splice(array.indexOf(item), 1);
	}
	return array;
};
/**
 * Splices an ArrayBuffer.
 * @function
 * @memberOf array
 * @param {ArrayBuffer|Buffer} arr The ArrayBuffer to splice.
 * @param {Number} start The start index.
 * @param {Number} end The end index.
 * @param {Boolean} [endian=false] Whether to use big endian or not.
 * @returns {Number} The hex representation of part of the ArrayBuffer.
 */
export let spliceArrayBuffer = (
	arr = req("ArrayBuffer"),
	start = req("number"),
	end = req("number"),
	endian = false,
) => {
	var direction = endian ? -1 : 1;
	if (endian) [start, end] = [end, start];
	start = Math.floor(start);
	end = Math.floor(end) + direction;
	for (var i = start, value = 0; i != end; i += direction)
		value = 256 * value + arr[i];
	return value;
};

/**
 * Flattens an array `level` times.
 * @memberOf array
 * @function
 * @returns {Array} The flattened array.
 * @example
 * console.log(_$.flatten(['a', 'b', ['c', 'd']])); // ['a', 'b', 'c', 'd'];
 * @param {Array} array The array to flatten.
 * @param {Number} [level=1] The number of iterations to flatten it.
 */
export let flatten = (array = req("array", "array"), level = 1) => {
	var output = array;
	_$.each(level, () => {
		output = [].concat.apply([], array);
	});
	return output;
};

/**
 * Flattens an array recursively.
 * @function
 * @memberOf array
 * @param {Array} arr The array to flatten.
 * @returns {Array} The flattened array.
 * @example
 * console.log(_$.nFlatten([5,[[9,4],0],[7,6]])); // [5,9,4,0,6,7]
 */
export let nFlatten = (arr = req("array", "array")) => {
	return arr.reduce(function (flat, toFlatten) {
		return flat.concat(
			Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten,
		);
	}, []);
};

/**
 * Returns whether the specified array or string contains the item given.
 * @memberOf array
 * @function
 * @param {Array} array The array to test with.
 * @param {String} item The item to see if the array contains.
 * @example
 * console.log(_$.contains([1,2,3,4,5], 3)); // true
 * @returns {Boolean} True or false depending on if the array contains that item.
 */
export let contains = (array = req("array"), item = req("string")) =>
	array.includes(item);

/**
 * Shuffles an array
 * @function
 * @memberOf array
 * @param {Array} array The array to shuffle.
 * @example
 * let array = [1,2,3,4,5];
 * console.log(_$.shuffleArray(array)); // e.g. [2,4,1,5,3]
 * @returns {Array} The shuffled array.
 */
export let shuffleArray = (array = req("array")) =>
	array.sort(() => Math.random() - 0.5);

/**
 * Splice but also for strings
 * @memberOf array
 * @function
 * @param {String|Array} array The array or string to operate on
 * @param {Number} index The index to splice
 * @param {*} item The item
 * @param {Number} [remove=0] How many to remove.
 * @returns {String|Array} the spliced array or string
 * @example
 * console.log(_$.splice("hello earthlings", 5, " puny")); // "hello puny earthlings"
 */
export let splice = (
	array = req("array", "array"),
	index = req("number", "index"),
	remove = 0,
	item,
) => {
	let args = Array.from(arguments);
	args.shift();
	return typeof array === "string"
		? array
				.split("")
				.splice(...args)
				.join("")
		: array.splice(...args);
};
/**
 * Joins two arrays together and removes duplicate items.
 * @function
 * @memberOf array
 * @param {Array} x The first array to join.
 * @param {Array} y The second array to join.
 * @example
 * console.log(_$.unionArrays([1,2,3,4], [4,5,6])); // [1,2,3,4,5,6]
 * @returns {Array} The joined array from the two other arrays.
 */
export let unionArrays = (
	x = req("array", "array1"),
	y = req("array", "array2"),
) => {
	var obj = {};
	for (var i = x.length - 1; i >= 0; --i) obj[x[i]] = x[i];
	for (var i = y.length - 1; i >= 0; --i) obj[y[i]] = y[i];
	var res = [];
	for (var k in obj) {
		if (obj.hasOwnProperty(k)) res.push(obj[k]);
	}
	return res;
};
/**
 * averageBy
 * @function
 * @memberOf array
 * @param {Array.<number>} arr The array to average
 * @param {Function} fn The function to apply to each item of the array.
 * @example
 * Logs the average of the first 4 square numbers:
 * console.log(_$.averageBy([1,2,3,4], (v) => v ** 2)); // 7.5
 * @returns {Number} The average of the array.
 */
export let averageBy = (
	arr = req("array", "array"),
	fn = req("function", "callback"),
) =>
	arr
		.map(typeof fn === "function" ? fn : (val) => val[fn])
		.reduce((acc, val) => acc + val, 0) / arr.length;

/**
 * Removes duplicates from an array
 * @function
 * @memberOf array
 * @param {Array} array The array to remove duplicates from.
 * @example
 * console.log(_$.uniqueArray([1,1,2,3,4,4,4,5,6)); // [1,2,3,4,5,6]
 * @returns {Array} The array with no duplicates.
 */
export let uniqueArray = (array = req("array", "array")) => [
	...new Set(array),
];
/**
 * For each item in an array, run a callback with it.
 * @function
 * @memberOf array
 * @param {Array|String|Number} array The array, string or number to run the callback with.
 * @param {Function} callback The callback function to run on the array items.
 * @example
 * _$.each(new Array(6), (array_item, i) => console.log(i));
 * // 0
 * // 1
 * // 2
 * // 3
 * // 4
 * // 5
 * @returns {any[]} The array passed at the beginning.
 */
export let each = (
	array = req("Array|Number|String", "array"),
	callback = req("function", "callback"),
) => {
	array =
		typeof array === "number"
			? _$.range(1, array)
			: typeof array === "string"
			? array.split("")
			: array;
	for (let i = 0; i < array.length; i++) {
		callback(array[i], i, array);
	}
	return array;
};
//#endregion Array
//#region Color
/**
 * Converts a rgb(a) color to hex.
 * @memberOf color
 * @function
 * @example
 * console.log(_$.rgbToHex("rgb(255,255,255)")); // "#ffffff"
 * @param {String} rgb The string of RGB colors.
 * @returns {String} The hex color.
 */
export let rgbToHex = (rgb = req("string", "RGB color")) => {
	let sep = rgb.indexOf(",") > -1 ? "," : " ";
	rgb = rgb.substr(4).split(")")[0].split(sep);

	let r = (+rgb[0]).toString(16),
		g = (+rgb[1]).toString(16),
		b = (+rgb[2]).toString(16);

	if (r.length === 1) r = "0" + r;
	if (g.length === 1) g = "0" + g;
	if (b.length === 1) b = "0" + b;

	return "#" + r + g + b;
};
/**
 * Converts a hex code to a RGB color.
 * @function
 * @memberOf color
 * @param {String} hex The hex code to convert.
 * @example
 * console.log(_$.rgbToHex("#ffffff")); // "rgb(255,255,255)"
 * @returns {String} The RGB color converted from the hex code.
 */
export let hexToRGB = (hex = req("string", "hex color")) => {
	if (
		((hex.length - 1 === 6 ||
			hex.length - 1 === 8 ||
			hex.length - 1 === 4 ||
			hex.length - 1 === 3) &&
			hex.startsWith("#")) ||
		((hex.length === 6 ||
			hex.length === 8 ||
			hex.length === 4 ||
			hex.length === 3) &&
			!hex.startsWith("#"))
	) {
	} else {
		throw new Error("Invalid hex");
	}
	let alpha = false,
		h = hex.slice(hex.startsWith("#") ? 1 : 0);
	if (h.length === 3) h = [...h].map((x) => x + x).join("");
	else if (h.length === 8) alpha = true;
	h = parseInt(h, 16);
	return (
		"rgb" +
		(alpha ? "a" : "") +
		"(" +
		(h >>> (alpha ? 24 : 16)) +
		", " +
		((h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)) +
		", " +
		((h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)) +
		(alpha ? `, ${h & 0x000000ff}` : "") +
		")"
	);
};
/**
 * Blends two colors through additive blending by a percentage.
 * @function
 * @memberOf color
 * @param {String} color1 The hex code of the first color to be blended
 * @param {String} color2 The hex code of the second color to be blended.
 * @param {Number} [percent=50] A number between 0 and 100 of the percentage to blend the two colors, 0 being completely the first color and 100 being completely the second color.
 * @example
 * console.log(_$.blendColors("#ffffff", "#000000", 80)); // #333333
 * @returns {String} The blended color (A hex code).
 */
export let blendColors = (
	color1 = req("string", "color 1"),
	color2 = req("string", "color 2"),
	percent = 50,
) => {
	const generateHex = (r, g, b) => {
		let R = r.toString(16);
		let G = g.toString(16);
		let B = b.toString(16);

		while (R.length < 2) {
			R = `0${R}`;
		}
		while (G.length < 2) {
			G = `0${G}`;
		}
		while (B.length < 2) {
			B = `0${B}`;
		}

		return `#${R}${G}${B}`;
	};

	const mix = (start, end, percent) =>
		start + (percent / 100) * (end - start);

	const red1 = parseInt(`${color1[1]}${color1[2]}`, 16);
	const green1 = parseInt(`${color1[3]}${color1[4]}`, 16);
	const blue1 = parseInt(`${color1[5]}${color1[6]}`, 16);

	const red2 = parseInt(`${color2[1]}${color2[2]}`, 16);
	const green2 = parseInt(`${color2[3]}${color2[4]}`, 16);
	const blue2 = parseInt(`${color2[5]}${color2[6]}`, 16);

	const red = Math.round(mix(red1, red2, percent));
	const green = Math.round(mix(green1, green2, percent));
	const blue = Math.round(mix(blue1, blue2, percent));

	return generateHex(red, green, blue);
};
/**
 * Generates a random hex color.
 * @function
 * @memberOf color
 * @example
 * console.log(_$.randomColor()); // e.g. #5bf462
 * @returns {String} A random Hex color
 */
export let randomColor = () =>
	`#${Math.floor(Math.random() * 16777215).toString(16)}`;
/**
 * Lighten or darken a color by a certain amount
 * @function
 * @memberOf color
 * @param {String} col The color to lighten/darken
 * @param {Number} amt The amount to lighten the color (out of 255).
 * @example
 * _$.lightenColor("#000000", 50); // #323232
 * @returns {String} The color lightened.
 */
export let lightenColor = (
	col = req("string", "hex color"),
	amt = req("number", "amount"),
) => {
	var usePound = false;

	if (col[0] == "#") {
		col = col.slice(1);
		usePound = true;
	}

	var num = parseInt(col, 16);

	var r = (num >> 16) + amt;

	if (r > 255) r = 255;
	else if (r < 0) r = 0;

	var b = ((num >> 8) & 0x00ff) + amt;

	if (b > 255) b = 255;
	else if (b < 0) b = 0;

	var g = (num & 0x0000ff) + amt;

	if (g > 255) g = 255;
	else if (g < 0) g = 0;

	return (
		(usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16)
	);
};
/**
  * Tests if a color is light or dark and returns an object representation.
  * @function
  * @memberOf color
  * @param {string} color The hex color to test.
  * @example
  * if (_$.lightOrDark("#333333").lightOrDark === 'dark'){
    document.querySelector("DIV").style.color = "white";
  } else {
      document.querySelector("DIV").style.color = "black";
  }
  * @returns {Object} An object that represents if the color is light or dark and how much. The object key "hsp" represents a value out of 255 of how light the color is and the object's key "lightOrDark" is a string (Either "light" or "dark") of whether the color is light or dark.
  */
export let lightOrDark = (
	color = req("string", "hex or RGB color"),
) => {
	var r, g, b, hsp;
	if (color.match(/^rgb/)) {
		color = color.match(
			/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/,
		);

		r = color[1];
		g = color[2];
		b = color[3];
	} else {
		color = +(
			"0x" + color.slice(1).replace(color.length < 5 && /./g, "$&$&")
		);

		r = color >> 16;
		g = (color >> 8) & 255;
		b = color & 255;
	}

	hsp = Math.sqrt(
		0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b),
	);
	if (hsp > 127.5) {
		return { lightOrDark: "light", hsp: hsp };
	} else {
		return { lightOrDark: "dark", hsp: hsp };
	}
};
//#endregion Color
//#region Date
/**
 * Returns the name of the weekday from the Date object specified.
 * @function
 * @memberOf date
 * @param {Date} [date=new Date()] The date object to use.
 * @param {String} [locale=en-US] The locale to use.
 * @example
 * console.log(_$.dayName)); // e.g. "Friday"
 * @returns {String} The day name from the date.
 */
export let dayName = (date = new Date(), locale = "en-US") =>
	date.toLocaleDateString(locale, {
		weekday: "long",
	});

/**
 * Formats a number of milliseconds
 * @function
 * @memberOf date
 * @param {Number|String} ms The number of milliseconds to format to a string.
 * @example
 * console.log(_$.formatMilliseconds(1324765128475)); // "1 century, 7 years, 2 days, 22 hours, 18 minutes, 48 seconds, 475 milliseconds"
 * @returns {String} The string of formatted milliseconds.
 */
export let formatMilliseconds = (
	ms = req("number", "milliseconds"),
) => {
	ms = typeof ms === "string" ? +ms : ms;
	if (ms < 0) ms = -ms;
	const time = {
		century: Math.floor(ms / 1144800000000),
		year: Math.floor(ms / 22896000000) % 50,
		day: Math.floor(ms / 86400000) % 365,
		hour: Math.floor(ms / 3600000) % 24,
		minute: Math.floor(ms / 60000) % 60,
		second: Math.floor(ms / 1000) % 60,
		millisecond: Math.floor(ms) % 1000,
	};
	return Object.entries(time)
		.filter((val) => val[1] !== 0)
		.map(([key, val]) => `${val} ${key}${val !== 1 ? "s" : ""}`)
		.join(", ");
};
/**
 * Adds a certain number of minutes to a date object.
 * @memberof date
 * @function
 * @example
 * _$.addMinutesToDate(new Date(), 4);//Create a date 4 minutes from now.
 * @param {Date|string} date The date to add minutes to.
 * @param {Number} n How many minutes to add to the date.
 * @returns {Date} The date with minutes added.
 */
export let addMinutesToDate = (
	date = req("date", "date or date string"),
	n = req("number", "minutes"),
) => {
	const d = new Date(date);
	d.setTime(d.getTime() + n * 60000);
	return d.toISOString().split(".")[0].replace("T", " ");
};
/**
 * Validates a date from a string.
 * @memberOf date
 * @function
 * @example
 *  _$.isDateValid('December 17, 1995 03:24:00'); // true
    _$.isDateValid('1995-12-17T03:24:00'); // true
    _$.isDateValid('1995-12-17 T03:24:00'); // false
    _$.isDateValid('Duck'); // false
    _$.isDateValid(1995, 11, 17); // true
    _$.isDateValid(1995, 11, 17, 'Duck'); // false
    _$.isDateValid({}); // false
 * @param  {...any} val The arguments of the date to validate.
 * @returns {Boolean} Returns if the date is valid or not.
 */
export let isDateValid = (...val) => {
	req("any", "date arguments", ![...val].length);
	return !Number.isNaN(new Date(...val).valueOf());
};
/**
 * Adds a specified number of days to a date.
 * @memberOf date
 * @function
 * @param {Date} date The date to add days to
 * @param {Number} n How many days to add to the date.
 * @returns {Date} The date with the specified number of days added.
 */
export let addDaysToDate = (
	date = req("date", "date or date string"),
	n = req("number", "days"),
) => {
	const d = new Date(date);
	d.setDate(d.getDate() + n);
	return d.toISOString().split("T")[0];
};
//#endregion Date
//#region Element
/**
 * Applies a material design ripple effect to the element specified. Works best with buttons and similar elements.
 * This comes from my GitHub repo here: https://github.com/explosion-scratch/ripple
 * @memberOf element
 * @function
 * @example
 * _$.each(document.querySelectorAll("button"), _$.ripple)
 * //Accepts attributes too!
 * // data-time: The time in milliseconds that it takes the ripple to fade away
 * // data-color: A CSS color that the ripple should have as it's color
 * // data-opacity: The starting opacity of the ripple effect.
 * // data-event: The event to listen for to apply the ripple.
 * @param {HTMLElement} el The element to apply the ripple effect to.
 * @param {Object} obj The object with (optional) time, color, opacity and event parameters for controlling the ripple effect. If these are not present the effect relies on data-* attributes, and then defaults and look good in general.
 * @param {Number} [obj.time=1000] The time in milliseconds the ripple should take.
 * @param {String} [obj.color="currentColor"] The color of the ripple effect.
 * @param {Number} [obj.opacity=.3] The opacity of the ripple effect.
 * @param {String} [obj.event="mousedown"] The event to listen for to trigger the ripple effect.
 * @returns {HTMLElement} The HTML element that the ripple effect was applied to. (The same one passed in the first param).
 */
export let ripple = (
	el = req("element", "element"),
	{ time, color, opacity, event },
) => {
	node();
	time = time || (+el.getAttribute("data-time") || 1000) * 3;
	color = color || el.getAttribute("data-color") || "currentColor";
	opacity = opacity || el.getAttribute("data-opacity") || ".3";
	event = event || el.getAttribute("data-event") || "mousedown";
	el.style.overflow = "hidden";
	el.style.position = "relative";
	el.addEventListener(event, (e) => {
		var ripple_div = document.createElement("DIV");
		ripple_div.style.position = "absolute";
		ripple_div.style.background = `${color}`;
		ripple_div.style.borderRadius = "50%";
		var bx = el.getBoundingClientRect();
		var largestdemensions;
		if (bx.width > bx.height) {
			largestdemensions = bx.width * 3;
		} else {
			largestdemensions = bx.height * 3;
		}
		ripple_div.style.pointerEvents = "none";
		ripple_div.style.height = `${largestdemensions}px`;
		ripple_div.style.width = `${largestdemensions}px`;
		ripple_div.style.transform = `translate(-50%, -50%) scale(0)`;
		ripple_div.style.top = `${e.pageY - (bx.top + window.scrollY)}px`;
		ripple_div.style.left = `${
			e.pageX - (bx.left + window.scrollX)
		}px`;
		ripple_div.style.transition = `opacity ${time}ms ease, transform ${time}ms ease`;
		ripple_div.removeAttribute("data-ripple");
		ripple_div.style.opacity = opacity;
		el.appendChild(ripple_div);
		setTimeout(() => {
			ripple_div.style.transform = `translate(-50%, -50%) scale(1)`;
			ripple_div.style.opacity = "0";
			setTimeout(() => {
				ripple_div.remove();
			}, time);
		}, 1);
	});
};
/**
 * Waits for an element satisfying selector to exist, then resolves promise with the element.
 * @param {HTMLElement} [parent=document.documentElement] The parent element to watch.
 * @param {String} selector The querySelector to watch for.
 * @returns {Promise} A promise resolved when the element exists.
 * @memberOf element
 * @function
 * @example
 * _$.elementReady("#text").then((e) => e.remove());//Wait for an element with an ID of "text" then removes it.
 */
export function elementReady(
	selector = req("string", "query selector"),
	parent = document.documentElement,
) {
	node();
	return new Promise((resolve, reject) => {
		const el = parent.querySelector(selector);
		if (el) {
			resolve(el);
		}
		new MutationObserver((mutationRecords, observer) => {
			// Query for elements matching the specified selector
			Array.from(parent.querySelectorAll(selector)).forEach(
				(element) => {
					resolve(element);
					//Once we have resolved we don't need the observer anymore.
					observer.disconnect();
				},
			);
		}).observe(parent, {
			childList: true,
			subtree: true,
		});
	});
}
/**
 * Tests if an element is a child element of another element.
 * @returns {Boolean} If the element is a child or not
 * @memberOf element
 * @function
 * @example
 * _$.elementContains(document.querySelector("#container"), document.querySelector("#img"));//If the element with an id of "img" is inside the #container element this will return true, otherwise it will return false
 * @example
 * //Note that the easiest way to do this would be to use _$.onOutsideClick(), but this is another way that demonstrates the use of this function.
 * //Listen for a click outside of an element (in this case the div#popup element) then remove the popup element.
 * document.querySelector("div#popup").addEventListener("click", (e) => {
 *  let contains = _$.elementContains(document.querySelector("div#popup"), e.target);
 *  if (!contains){
 *    document.querySelector("div#popup".remove()
 *  }
 * })
 * @param {HTMLElement} parent The parent element to test.
 * @param {HTMLElement} child The child element to test.
 */
export let elementContains = (
	parent = req("HTMLElement", "parent"),
	child = req("HTMLElement", "child"),
) => {
	node();
	return parent !== child && parent.contains(child);
};
/**
 * Gets the parent elements of the element given.
 * @returns {Array.<HTMLElement>} An array of the parent elements from deepest to outermost.
 * @memberOf element
 * @function
 * @example
 * //Where the html is like so:
 * ```
 * <html>
 *  <head>
 *  </head>
 *  <body>
 *    <div id="img">
 *     <img src="https://example.com/example.png">
 *    </div>
 *  </body>
 * </html>
 * ```
 * _$.parents(document.querySelector("img"));//[div#img, body, html]
 * @param {HTMLElement} el The element
 */
export let parents = (el = req("element")) => {
	node();
	return [
		...(function* (e) {
			while ((e = e.parentNode)) {
				yield e;
			}
		})(el),
	];
};
/**
 * Gets all the images that are children of the specified element.
 * @returns {Array} The array of image urls.
 * @memberOf element
 * @function
 * @example
 * //Get all the images on the page and convert their url's to data urls then log that list to console.
 * _$.getImages().forEach(image_url => {
 *  image_data_list.push(_$.imageToData(image_url))
 * })
 * console.log(image_data_list);
 * @param {HTMLElement} [el=document.documentElement] The element to get images from (e.g. document.body)
 * @param {Boolean} [includeDuplicates=false] Whether to include duplicate images, defaults to false.
 */
export let getImages = (
	el = document.documentElement,
	includeDuplicates = false,
) => {
	node();
	const images = [...el.getElementsByTagName("img")].map((img) =>
		img.getAttribute("src"),
	);
	return includeDuplicates ? images : [...new Set(images)];
};
/**
 * Renders an HTML element from an object in the container specified.
 * @memberOf element
 * @function
 * @example
 * //Renders a button in the document body.
 * _$.renderElement({
  type: 'button',
  props: {
    type: 'button',
    className: 'btn',
    onClick: () => alert('Clicked'),
    children: [{ props: { nodeValue: 'Click me' } }]
  }
}, document.body)
 * @param {Object} param The type of object (the HTML tagName)
 * @param {HTMLElement} container The html element to render it in.
 * @returns {HTMLElement} The HTML element rendered.
 */
export let renderElement = (
	{ type, props = {} } = req("object", "options"),
	container = req("HTMLElement", "container"),
) => {
	node();
	const isTextElement = !type;
	const element = isTextElement
		? document.createTextNode("")
		: document.createElement(type);

	const isListener = (p) => p.startsWith("on");
	const isAttribute = (p) => !isListener(p) && p !== "children";

	Object.keys(props).forEach((p) => {
		if (isAttribute(p)) element[p] = props[p];
		if (!isTextElement && isListener(p))
			element.addEventListener(p.toLowerCase().slice(2), props[p]);
	});

	if (!isTextElement && props.children && props.children.length)
		props.children.forEach((childElement) =>
			renderElement(childElement, element),
		);

	container.appendChild(element);
	return element;
};
/**
 * Create a DOM element from a querySelector with option to include content
 * @memberOf element
 * @function
 * @param {String} querySelector (optional) default to div
 * @param {...String|Number|DOMElement} [content] (optional)
 * @returns DOMElement
 *
 * @example
 * - _$.create(); // <div>
 * - _$.create('span#my-id.my-class.second-class'); // <span id="my-id" class="my-class second-class">
 * - _$.create('#my-id.my-class.second-class', 'text to insert', 12345); // <div id="my-id" class="my-class second-class">
 */
export function create(querySelector = "div", ...content) {
	node();
	let nodeType = querySelector.match(/^[a-z0-9]+/i);
	let id = querySelector.match(/#([a-z]+[a-z0-9-]*)/gi);
	let classes = querySelector.match(/\.([a-z]+[a-z0-9-]*)/gi);
	let attributes = querySelector.match(
		/\[([a-z][a-z-]+)(=['|"]?([^\]]*)['|"]?)?\]/gi,
	);
	let _node = nodeType ? nodeType[0] : "div";

	if (id && id.length > 1) {
		throw new Error("only 1 ID is allowed");
	}

	const elt = document.createElement(_node);

	if (id) {
		elt.id = id[0].replace("#", "");
	}

	if (classes) {
		const attrClasses = classes.join(" ").replace(/\./g, "");
		elt.setAttribute("class", attrClasses);
	}

	if (attributes) {
		attributes.forEach((item) => {
			item = item.slice(0, -1).slice(1);
			let [label, value] = item.split("=");
			if (value) {
				value = value.replace(/^['"](.*)['"]$/, "$1");
			}
			elt.setAttribute(label, value || "");
		});
	}

	content.forEach((item) => {
		if (typeof item === "string" || typeof item === "number") {
			elt.appendChild(document.createTextNode(item));
		} else if (item.nodeType === document.ELEMENT_NODE) {
			elt.appendChild(item);
		}
	});

	return elt;
}
/**
 * Re-enables the use of &lt;menu&gt; and &lt;menuitem&gt; tags for corner clicking.
 * @memberOf element
 * @function
 * @example
 * //HTML:
 * ```
 * <h1 contextmenu="menu">Corner click me</h1>
 * <menu>
 *  <menuitem label="An item!">
 *  <menuitem label="Another item!">
 * </menu>
 * ```
 * //JS
 * _$.context();
 * // Now the user can corner click the items that have parents with a "contextmenu" attribute! Try it out here: https://bcs88.csb.app/
 * @returns {Array.<HTMLElement>} An array of all the HTML elements passed.
 */
export let context = () => {
	node();
	var menu = document.createElement("UL");
	menu.id = "contextMenu";
	document.body.appendChild(menu);
	let styles = document.createElement("STYLE");
	styles.innerHTML = `#contextMenu {
       pointer-events: none;
       padding: 0;
       opacity: 0;
       transition: opacity .3s ease;
       position: fixed;
       padding-top: 3px;
       padding-bottom: 3px;
       max-height: 200px;
       overflow-y: scroll;
       overflow-x: hidden;
       list-style: none;
       z-index: 10000;
       background: white;
       color: #333;
       font-family: sans-serif;
       border-radius: 5px;
       box-shadow: 2px 2px 5px #0004;
       width: fit-content;
       min-width: 50px;
       max-width: 150px;
     }
     #contextMenu li {
       transition: background-color .3s ease;
       display: block;
       min-width: 150px;
       margin: 0;
       padding: 10px;
     }
     #contextMenu li:hover {
       background-color: #ddd;
       cursor: pointer;
     }
     `;
	document.body.appendChild(styles);
	var elements = document.querySelectorAll("[contextmenu]");
	for (let i = 0; i < elements.length; i++) {
		window.addEventListener("contextmenu", (e) => {
			menu.style.pointerEvents = "auto";
			let items;
			try {
				items = document.querySelectorAll(
					`#${e.target
						.closest("[contextmenu]")
						.getAttribute("contextmenu")} menuitem`,
				);
				e.preventDefault();
			} catch (e) {
				return true;
			}
			menu.innerHTML = "";
			for (let j = 0; j < items.length; j++) {
				const contextMenu = items[j];
				const liTag = document.createElement("li");
				liTag.setAttribute(
					"onclick",
					contextMenu.getAttribute("onclick"),
				);
				liTag.addEventListener("click", () => {
					menu.style.opacity = 0;
					menu.style.pointerEvents = "none";
				});
				liTag.textContent = contextMenu.getAttribute("label");
				menu.innerHTML += liTag.outerHTML;
			}
			console.log(menu.innerHTML);
			menu.style.top = `${e.clientY}px`;
			menu.style.left = `${e.clientX}px`;
			menu.style.opacity = 1;
		});
	}
	var contextTimer = 0;
	setInterval(() => {
		contextTimer += 100;
		if (contextTimer > 3000) {
			menu.style.opacity = 0;
			menu.style.pointerEvents = "none";
			contextTimer = 0;
			return;
		}
	}, 100);
	_$.addEventListeners(menu, ["mousemove", "click", "scroll"], () => {
		contextTimer = 0;
	});
	_$.onOutsideClick(menu, () => {
		menu.style.opacity = 0;
		menu.style.pointerEvents = "none";
	});
	return elements;
};

/**
 * Tests whether the specified element is fully in view.
 * @function
 * @memberOf element
 * @param {Element} el The DOM element to test.
 * @example
 * // Alerts "In view!" if the first <div> in the document is in view.
 * if (_$.inView(document.querySelector("div"))) alert("In view!");
 * @returns {Boolean} Whether the element is completely in view.
 */
export let inView = (el = req("HTMLElement", "element")) => {
	node();
	var top = el.offsetTop;
	var left = el.offsetLeft;
	var width = el.offsetWidth;
	var height = el.offsetHeight;

	while (el.offsetParent) {
		el = el.offsetParent;
		top += el.offsetTop;
		left += el.offsetLeft;
	}

	return (
		top >= window.pageYOffset &&
		left >= window.pageXOffset &&
		top + height <= window.pageYOffset + window.innerHeight &&
		left + width <= window.pageXOffset + window.innerWidth
	);
};
/**
 * Tests if the given DOM element is partially (or fully) in view.
 * @function
 * @memberOf element
 * @param {Element} el The element to test.
 * @example
 * // Alerts "In view!" if the first <div> in the document is partially or fully view.
 * if (_$.inPartialView(document.querySelector("div"))) alert("In view!");
 * @returns {Boolean} Whether the DOM element is partially in view.
 */
export let inPartialView = (el = req("HTMLElement", "element")) => {
	node();
	var top = el.offsetTop;
	var left = el.offsetLeft;
	var width = el.offsetWidth;
	var height = el.offsetHeight;

	while (el.offsetParent) {
		el = el.offsetParent;
		top += el.offsetTop;
		left += el.offsetLeft;
	}

	return (
		top < window.pageYOffset + window.innerHeight &&
		left < window.pageXOffset + window.innerWidth &&
		top + height > window.pageYOffset &&
		left + width > window.pageXOffset
	);
};

/**
 * Replaces the text in an element by running it through a callback.
 * @function
 * @memberOf element
 * @param {Element} el The element to replace the text of.
 * @param {Function} callback The callback to run (Gets passed the element's text).
 * @example
 * _$.replaceText(document.querySelector("div"), (text) => text.toUpperCase());
 * // Converts the text of the first <div> element to upperCase.
 * @returns {HTMLElement} The HTML element passed.
 */
export let replaceText = (
	el = req("HTMLElement", "element"),
	callback = req("function", "callback"),
) => {
	node();
	_$.each(_$.textNodes(el), (node) => {
		node.textContent = callback(node.textContent);
	});
	return el;
};
/**
 * Gets a list of all the text nodes in an element
 * @memberOf element
 * @function
 * @param {Element} el The element to get the text nodes of.
 * @returns {Array} The text nodes.
 * @example
 * _$.textNodes(document.querySelector("h1"))[0].textContent = "hello world"; // replaces the text with "hello world" without deleting other elements
 */
export let textNodes = (el = req("HTMLElement", "element")) => {
	node();
	return [...el.childNodes].filter((node) => {
		return (
			node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== ""
		);
	});
};
/**
 * Generates a querySelector for an element passed in.
 * @function
 * @memberOf element
 * @param {Element} elem The element to generate the querySelector for.
 * @example
 * const textarea = document.getElementById('textarea');
 * console.log(_$.querySelector(textarea)); //Logs "#textarea" to the console.
 * @returns {String} The generated querySelector.
 */
export let querySelector = (elem = req("HTMLElement", "element")) => {
	node();
	var element = elem;
	var str = "";

	function loop(element) {
		if (
			element.getAttribute("id") &&
			document.querySelectorAll(`#${element.getAttribute("id")}`)
				.length === 1
		) {
			str = str.replace(/^/, " #" + element.getAttribute("id"));
			str = str.replace(/\s/, "");
			str = str.replace(/\s/g, " > ");
			return str;
		}
		if (document.body === element) {
			str = str.replace(/^/, " body");
			str = str.replace(/\s/, "");
			str = str.replace(/\s/g, " > ");
			return str;
		}
		if (element.getAttribute("class")) {
			var elemClasses = ".";
			elemClasses += element.getAttribute("class");
			elemClasses = elemClasses.replace(/\s/g, ".");
			elemClasses = elemClasses.replace(/^/g, " ");
			var classNth = "";
			var childrens = element.parentNode.children;

			if (childrens.length < 2) {
				return;
			}

			var similarClasses = [];

			for (var i = 0; i < childrens.length; i++) {
				if (
					element.getAttribute("class") ==
					childrens[i].getAttribute("class")
				) {
					similarClasses.push(childrens[i]);
				}
			}

			if (similarClasses.length > 1) {
				for (var j = 0; j < similarClasses.length; j++) {
					if (element === similarClasses[j]) {
						j++;
						classNth = ":nth-of-type(" + j + ")";
						break;
					}
				}
			}

			str = str.replace(/^/, elemClasses + classNth);
		} else {
			var name = element.nodeName;
			name = name.toLowerCase();
			var nodeNth = "";

			childrens = element.parentNode.children;

			if (childrens.length > 2) {
				var similarNodes = [];

				for (var i = 0; i < childrens.length; i++) {
					if (element.nodeName == childrens[i].nodeName) {
						similarNodes.push(childrens[i]);
					}
				}

				if (similarNodes.length > 1) {
					for (var j = 0; j < similarNodes.length; j++) {
						if (element === similarNodes[j]) {
							j++;
							nodeNth = ":nth-of-type(" + j + ")";
							break;
						}
					}
				}
			}

			str = str.replace(/^/, " " + name + nodeNth);
		}

		if (element.parentNode) {
			loop(element.parentNode);
		} else {
			str = str.replace(/\s/g, " > ");
			str = str.replace(/\s/, "");
			return str;
		}
	}

	loop(element);

	return str;
};
/**
 * Removes comments from the element specified.
 * @function
 * @memberOf element
 * @param {Element} el The element to remove comments from.
 * @example
 * _$.removeComments(document.documentElement);//Removes the comments from the document element.
 * @returns {HTMLElement} The HTML element with the comments removed.
 */
export let removeComments = (
	el = req("HTMLElement", "HTMLElement"),
) => {
	node();
	const isString = typeof el === "string";
	el = isString ? _$.parseHTML(el) : el.cloneNode(true);
	for (const child of [...el.querySelectorAll("*"), el]) {
		for (const grandchild of child.childNodes) {
			if (grandchild instanceof Comment)
				child.removeChild(grandchild);
		}
	}
	return isString ? el.outerHTML : el;
};
/**
 * Parses the string of HTML specified and returns an HTML element of it.
 * @function
 * @memberOf element
 * @param {String} string The HTML string to parse.
 * @param {String} [mimeType="text/html"] The mimeType of the string.
 * @example
 * let html = _$.parseHTML("<div id='hello'><textarea></textarea></div>");
 * html.querySelector("textarea");//Returns the textarea!
 * @returns {HTMLDocument} The HTML document element of the HTML string specified.
 */
export let parseHTML = (
	string = req("string", "html string"),
	mimeType = "text/html",
) => {
	node();
	const domparser = new DOMParser();
	return domparser.parseFromString(string, mimeType);
};
/**
 * Allows an element to be dragged and dropped.
 * @function
 * @memberOf element
 * @param {Element} dragHandle The element that when dragged should move the dragTarget.
 * @param {Element} dragTarget The element that should be moved when the dragHandle is dragged.
 * @example
 * _$.drag('div span', 'div'); // Allows the first <div> on the page to be dragged by the <span> element inside it.
 * @returns {Element} The element.
 */
export let drag = (
	dragHandle = req("String|Element", "drag handle"),
	dragTarget = req("String|Element", "drag target"),
) => {
	node();
	let dragObj = null;
	let xOffset = 0;
	let yOffset = 0;
	dragHandle =
		typeof dragHandle === "string"
			? document.querySelector(dragHandle)
			: dragHandle;

	dragTarget =
		typeof dragTarget === "string"
			? document.querySelector(dragTarget)
			: dragTarget;

	dragHandle.addEventListener("mousedown", startDrag, true);
	dragHandle.addEventListener("touchstart", startDrag, true);

	function startDrag(e) {
		e.preventDefault();
		e.stopPropagation();
		dragObj = dragTarget;
		dragObj.style.position = "absolute";
		let rect = dragObj.getBoundingClientRect();

		if (e.type == "mousedown") {
			xOffset = e.clientX - rect.left;
			yOffset = e.clientY - rect.top;
			window.addEventListener("mousemove", dragObject, true);
		} else if (e.type == "touchstart") {
			xOffset = e.targetTouches[0].clientX - rect.left;
			yOffset = e.targetTouches[0].clientY - rect.top;
			window.addEventListener("touchmove", dragObject, true);
		}
	}

	function dragObject(e) {
		e.preventDefault();
		e.stopPropagation();

		if (dragObj == null) {
			return;
		} else if (e.type == "mousemove") {
			dragObj.style.left = e.clientX - xOffset + "px";
			dragObj.style.top = e.clientY - yOffset + "px";
		} else if (e.type == "touchmove") {
			dragObj.style.left =
				e.targetTouches[0].clientX - xOffset + "px";
			dragObj.style.top = e.targetTouches[0].clientY - yOffset + "px";
		}
	}

	document.onmouseup = function (e) {
		if (dragObj) {
			dragObj = null;
			window.removeEventListener("mousemove", dragObject, true);
			window.removeEventListener("touchmove", dragObject, true);
		}
	};
};

/**
 * Adds multiple event listeners with one callback to the element specified.
 * @memberOf element
 * @function
 * @param {Element} element The element to add the event listeners to.
 * @param {Array.<String>} events The array of events to listen for.
 * @param {Function} handler The function to run when the events happen.
 * @param {Boolean|Object} [useCapture=false] Whether to use capture, or an options object.
 * @param {Array} [args=false] The arguments to use in the handler function.
 * @example
 * // Reset a timer every user interaction.
 * let timer = 0;
 * setInterval(() => timer++, 1);
 * _$.addEventListeners(
 *  document,
 *  ["mousemove", "click", "scroll", "keypress"],
 *  () => timer = 0,
 * );
 * @returns {Element} The HTML element passed.
 */
export let addEventListeners = (
	element = req("HTMLElement", "element"),
	events = req("array", "events"),
	handler = () => {},
	useCapture = false,
	args = [],
) => {
	node();
	if (!(events instanceof Array)) {
		throw (
			"addMultipleListeners: " +
			"please supply an array of eventstrings " +
			'(like ["click","mouseover"])'
		);
	}
	//create a wrapper to be able to use additional arguments
	var handlerFn = function (e) {
		handler.apply(this, args && args instanceof Array ? args : []);
	};
	for (var i = 0; i < events.length; i += 1) {
		element.addEventListener(events[i], handlerFn, useCapture);
	}
	return element;
};
/**
 * @memberOf element
 * @function
 * @returns {HTMLTableElement} The table element.
 * Sorts a table using JavaScript. This appends click listeners to every TH in the table.
 * @param {HTMLTableElement} element The table to sort
 * @param {Function} [cellVal] The callback function to run with the element to get the value of the cell. This is passed the cell (<td>) element, and the row (<tr>) element, and the index of the cell.
 * @example
 * _$.sortTable(document.querySelector("table"));//Done.
 * @example
 * _$.sortTable(document.querySelector("table"), (i) => i.getAttribute("data-sort"));//Sorts the table by each cell's 'data-sort' attribute.
 */

export let sortTable = (
	element = req("HTMLTableElement", "table element"),
	cellVal = undefined,
) => {
	node();
	var getCellValue = function (tr, idx) {
		return cellVal
			? cellVal(tr.children[idx], tr, idx)
			: tr.children[idx].innerText || tr.children[idx].textContent;
	};

	var comparer = function (idx, asc) {
		return function (a, b) {
			return (function (v1, v2) {
				return v1 !== "" && v2 !== "" && !isNaN(v1) && !isNaN(v2)
					? v1 - v2
					: v1.toString().localeCompare(v2);
			})(
				getCellValue(asc ? a : b, idx),
				getCellValue(asc ? b : a, idx),
			);
		};
	};

	Array.prototype.slice
		.call(element.querySelectorAll("th"))
		.forEach(function (th) {
			th.addEventListener("click", function () {
				var table = th.parentNode;
				while (table.tagName.toUpperCase() != "TABLE")
					table = table.parentNode;
				Array.prototype.slice
					.call(table.querySelectorAll("tr:nth-child(n+2)"))
					.sort(
						comparer(
							Array.prototype.slice
								.call(th.parentNode.children)
								.indexOf(th),
							(this.asc = !this.asc),
						),
					)
					.forEach(function (tr) {
						table.appendChild(tr);
					});
			});
		});

	return element;
};
/**
 * Sorts a table by a <th> element.
 * @memberOf element
 * @function
 * @returns {HTMLTableElement} The table element.
 * @example
 * //Note that this example pretty much recreates the _$ sortTable function, which is much more cross browser and good than this recreation. If sorting a whole table please use that.
 * _$.each(document.querySelectorAll("#table th"), (th) => {
 *  th.addEventListener("click", () => {
 *    //Add event listeners to each of them.
 *    _$.sortTableBy(th, th.asc = !th.asc);//Toggle the "asc" attribute on the th.
 *  });
 * })
 * @param {HTMLTableElement} th The table header (<th> element) to sort with.
 * @param {Boolean} ascending Whether to sort the table ascending or descending.
 */
export let sortTableBy = (
	th = req("HTMLTableElement", "<th> element"),
	ascending = true,
) => {
	node();
	var getCellValue = function (tr, idx) {
		return tr.children[idx].innerText || tr.children[idx].textContent;
	};

	var comparer = function (idx, asc) {
		return function (a, b) {
			return (function (v1, v2) {
				return v1 !== "" && v2 !== "" && !isNaN(v1) && !isNaN(v2)
					? v1 - v2
					: v1.toString().localeCompare(v2);
			})(
				getCellValue(asc ? a : b, idx),
				getCellValue(asc ? b : a, idx),
			);
		};
	};

	var table = th.parentNode;
	while (table.tagName.toUpperCase() != "TABLE")
		table = table.parentNode;
	Array.prototype.slice
		.call(table.querySelectorAll("tr:nth-child(n+2)"))
		.sort(
			comparer(
				Array.prototype.slice
					.call(th.parentNode.children)
					.indexOf(th),
				ascending,
			),
		)
		.forEach(function (tr) {
			table.appendChild(tr);
		});
	return table;
};
/**
 * Adds the specified styles to the element specified.
 * @function
 * @memberOf element
 * @param {Element} el The element to add the styles to.
 * @param {Object} styles An object that represents the styles to be added. (camelCased)
 * @example
 * _$.addStyles(document.documentElement, {backgroundColor: "#101010", color: "white"})
 * @returns {Object} the style object of the element.
 */
export let addStyles = (
	el = req("HTMLElement", "element"),
	styles = req("Object", "styles"),
) => {
	node();
	return Object.assign(el.style, styles);
};

/**
 * Creates an HTML element from the specified string.
 * @function
 * @memberOf element
 * @param {String} str The string of the HTML element to create.
 * @example
 * //Returns a div with an id of "id_here" and innerText of "Testing!"
 * _$.createElement("<div id='id_here'>Testing!</div>");
 * @returns {Element} The created element.
 */
export let createElement = (
	str = req("String", "HTML element string"),
) => {
	node();
	const el = document.createElement("div");
	el.innerHTML = str;
	return el.firstElementChild;
};
/**
 * Gets a property from the computed style of an element.
 * @function
 * @memberOf element
 * @param {Element} el The element whose styles to get.
 * @param {String} prop The css-property value to get of the styles.
 * @example
 * console.log(_$.compStyle(document.documentElement, "background-color")); // logs the background colour of the document
 * @returns {String} The computed style property for the element specified.
 */
export let compStyle = (
	el = req("HTMLElement", "element"),
	prop = req("String", "CSS property string"),
) => {
	node();
	var computedStyles = window.getComputedStyle(el);
	return computedStyles.getPropertyValue(prop);
};

/**
 * Get the siblings of a DOM element
 * @function
 * @memberOf element
 * @param {Element} n The element to get siblings of
 * @example
 * _$.each(_$.elementSiblings(document.querySelectorAll("li")), (el) => el.style.backgroundColor = 'white');
 * // Make every sibling of the first list item's background color white.
 * @returns {Element[]} The array of sibling elements.
 */
export let elementSiblings = (n = req("HTMLElement", "element")) => {
	node();
	return [...n.parentElement.children].filter((c) => c != n);
};
/**
 * Disables right click on the element specified.
 * @function
 * @memberOf element
 * @param {HTMLElement} el The element to disable right click on.
 * @example
 * _$.disableRightClick(document.documentElement)
 * @returns {HTMLElement} The HTML element that now has right click disabled.
 */
export let disableRightClick = (
	el = req("HTMLElement", "element"),
) => {
	node();
	el.addEventListener("contextmenu", (e) => e.preventDefault());
	return el;
};
/**
 * Converts all of the styles for an element to inline CSS. This is nice for production sites because it means that they will look the same on all browsers. (Because it uses computed style.)
 * @function
 * @memberOf element
 * @param {Element} el The element to convert.
 * @example
 * _$.inlineCSS(document.querySelector("h1")); // Converts the styles for the <h1> element to inline using the style="___" attribute
 * @returns {Object} The computed styles of the element.
 */
export let inlineCSS = (el = req("HTMLElement", "element")) => {
	node();
	var cs = getComputedStyle(el, null);
	var i;
	for (i = 0; i < cs.length; i++) {
		var s = cs[i] + "";
		el.style[s] = cs[s];
	}
	return cs;
};
/**
 * Returns an array of objects representing the attributes of a passed element.
 * @param {Element} el The HMTL element to get attributes from.
 * @function
 * @memberOf element
 * @example
 * // Say the <html> tag of the document was "<html style='background-color: #101010;'>", then the function below would log "style," to the console.
 * console.log(Object.keys(_$.attributes(document.documentElement).join(", "));
 * @return {Array.<object>} The array of objects representing the attributes
 */
export let attributes = (el = req("HTMLElement", "element")) => {
	node();
	var output = [];
	for (
		var att, i = 0, atts = el.attributes, n = atts.length;
		i < n;
		i++
	) {
		att = atts[i];
		output.push({
			name: att.nodeName,
			value: att.nodeValue,
		});
	}
	return output;
};
/**
 * Observes the mutations of the html element specified.
 * @memberOf element
 * @function
 * @param {Element} element The element to observe
 * @param {Function} callback The callback function to run when a mutation happens.
 * @param {Object} options The options to use.
 * @example
 * _$.observeMutations(document, console.log); // Logs all the mutations that happen to the console.
 * @returns {MutationObserver} The mutation observer.
 */
export let observeMutations = (
	element = req("HTMLElement", "element"),
	callback = req("function", "callback"),
	options = {},
) => {
	node();
	const observer = new MutationObserver((mutations) =>
		mutations.forEach((m) => callback(m)),
	);
	observer.observe(
		element,
		Object.assign(
			{
				childList: true,
				attributes: true,
				attributeOldValue: true,
				characterData: true,
				characterDataOldValue: true,
				subtree: true,
			},
			options,
		),
	);
	return observer;
};
/**
 * Tilts a specified element to point towards the specified position. Note that 0,0 is the center of the screen in coordinates.
 * @memberOf element
 * @function
 * @param {Element} el The element to tilt.
 * @param {Number} x The x value of the mouse
 * @param {Number} y The y value of the mouse
 * @param {Number} [perspective=500] The perspective
 * @param {Number} [amount=30] The amount to tilt.
 * @returns {String} The css transform string.
 * @example
 * // Tilt the first image in the document whenever the mouse moves.
 * let el = document.querySelector("img");
 * el.onmousemove = (e) => {
 *  let x = e.layerX;
 *  let y = e.layerY
 *  _$.tilt(el, x, y);
 * }
 */
export let tilt = (
	el = req("HTMLElement", "element"),
	x = req("number", "x"),
	y = req("number", "y"),
	perspective = 500,
	amount = 30,
) => {
	node();
	//Old code
	/*  const xVal = x
      const yVal = y
      const yRotation = amount * ((xVal - width / 2) / width)
      const xRotation = amount * -1 * ((yVal - height / 2) / height)
      const string = `perspective(${perspective}px) scale(1.1) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`
      el.style.transform = string */

	//One liner
	let transform = `perspective(${perspective}px) scale(1.1) rotateX(${
		amount * -1 * ((y - el.clientHeight / 2) / el.clientHeight)
	}deg) rotateY(${
		amount * ((x - el.clientWidth / 2) / el.clientWidth)
	}deg)`;
	el.style.transform = transform;
	return transform;
};
/**
 * Enters fullscreen on an element.
 * @memberOf element
 * @function
 * @param {Element} element The element to enter full screen with.
 * @returns {Promise} A promise resolved when fullscreen is entered.
 * @example
 * _$.fullScreen(document.documentElement); // Make the window fullscreen
 */
export let fullScreen = (element = req("HTMLElement", "element")) => {
	node();
	return (
		element.requestFullScreen ||
		element.mozRequestFullScreen ||
		element.webkitRequestFullScreen() ||
		new Error("Fullscreen failed")
	);
};
/**
 * Replaces the selected text in a contentEditable div with the HTML given.
 * @memberOf element
 * @function
 * @returns {Range} A range representing the users selection.
 * @example
 * // Add a simple contenteditable div to the page.
 * document.appendChild(_$.createElement("<div contenteditable id='text'></div>"));
 * _$.replaceSelection("<b>BOLD TEXT</b> <small>Bijou is awesome</small><h1>You need to use it</h1>");
 * //Replaces the selection! =)
 * @param {String} replacementText The replacement HTML to replace with.
 */
export let replaceSelection = (
	replacementText = req("string", "replacement text"),
) => {
	node();
	var sel, range;
	if (window.getSelection) {
		sel = window.getSelection();
		if (sel.rangeCount) {
			range = sel.getRangeAt(0);
			range.deleteContents();
			let n = document.createElement("span");
			n.insertAdjacentHTML("beforeend", replacementText);
			range.insertNode(n);
		}
	} else if (document.selection && document.selection.createRange) {
		console.warn(
			"You are using IE < 9, you are evil. Falling back to text not HTML.",
		);
		range = document.selection.createRange();
		range.text = replacementText.replace(/<[^>]*>/g, "");
	}
	return window.getSelection();
};
//#endregion Element
//#region Event
/**
 * Waits until a condition is met then resolves a promise.
 * @returns {Promise} A promise resolved when the condition returned by the function is true.
 * @memberOf event
 * @example
 * //Waits until the current second of the current minute is 10.
 * _$.waitUntil(() => new Date().getSeconds === 10).then(() => console.log("Done"))
 * @example
 * //This DOES NOT work
 * _$.waitUntil(() => Date.now() === Date.now() + 100);
 * //Because it is evaluated many times, and the current date, is never ahead of itself. Therefore in this case the function will run infinitely.
 * //To fix this problem and cancel the function after a certain amount of time,
 * //you can pass another argument to the function
 * _$.waitUntil(() => false, 10000);//Waits 10 seconds, because the function always returns false.
 * @param {Function} condition The function which returns true when the condition is met
 * @param {Number} [wait=Infinity] The wait time in milliseconds to cancel the function and reject the promise.
 */
export let waitUntil = async (
	condition = req("function", "condition"),
	wait = Infinity,
) => {
	return new Promise(async (resolve, reject) => {
		let startTime = Date.now();
		while (!condition()) {
			if (Date.now() - startTime >= wait) {
				reject(condition());
				return;
			}
			await new Promise((res) => requestAnimationFrame(res));
		}
		resolve(condition());
		return condition();
	});
};
/**
 * Returns the callback when a a click is registered outside the selected element
 * @function
 * @memberOf event
 * @param {Element} element The element to use as the outsideclick element.
 * @param {Function} callback The function to run when a click is registered outside the specified element.
 * @example
 * _$.onOutsideClick(document.querySelector("div"), () => {alert("You clicked outside the DIV!")});
 * @returns {Promise} A promise that is resolved when the user clicks outside the specified element.
 */
export let onOutsideClick = (
	element = req("HTMLElement", "element"),
	callback = req("function", "callback"),
) => {
	node();
	return new Promise((resolve, reject) => {
		document.addEventListener("click", (e) => {
			if (!element.contains(e.target)) {
				callback();
				resolve();
			}
		});
	});
};
/**
 * Returns the callback when the user stops scrolling.
 * @function
 * @memberOf event
 * @param {HTMLElement} [element=window] The HTML element to listen on for scroll stop.
 * @param {Function} callback The callback to call when the user stops scrolling.
 * @param {Number} [time=150]
 * @example
 * _$.onScrollStop(() => {alert("You stopped scrolling!")})
 * @returns {Promise} Returns a promise that is resolved when the user stops scrolling.
 */
export let onScrollStop = (
	element = window,
	callback = req("function", "callback"),
	time = 150,
) => {
	let isScrolling;
	node();
	return new Promise((resolve, reject) => {
		element.addEventListener(
			"scroll",
			(e) => {
				clearTimeout(isScrolling);
				isScrolling = setTimeout(() => {
					callback(e);
					resolve(e);
				}, time);
			},
			false,
		);
	});
};
/**
 * A lot like socket.io, this allows emit, on and off handlers. (Note that this is local, only your computer sends and recieves your data. Still useful though)
 * @memberOf event
 * @function
 * @returns {Object} The object with the emit, on and off functions in it.
 * @example
 * let thing = _$.hub();
 * // Log any new data to the console
 * thing.on("data", (data) => console.log(data));
 * setTimeout(() => {
 *   thing.emit("data", "Yay! Some data!!"); // Logs "Yay! Some data!!" to the console after 2 seconds.
 * }, 2000)
 */
export let hub = () => ({
	hub: Object.create(null),
	emit(event, data) {
		(this.hub[event] || []).forEach((handler) => handler(data));
	},
	on(event, handler) {
		if (!this.hub[event]) this.hub[event] = [];
		this.hub[event].push(handler);
	},
	off(event, handler) {
		const i = (this.hub[event] || []).findIndex((h) => h === handler);
		if (i > -1) this.hub[event].splice(i, 1);
		if (this.hub[event].length === 0) delete this.hub[event];
	},
});
/**
 * Dispatches an event of the type specified with custom arguments.
 * @memberOf event
 * @function
 * @example
 * //Dispatch a custom mouse move event to the window.
 * _$.dispatch("mousemove", {clientX: 100, clientY: 150, target: document.documentElement}, window);
 * @param {String} type The type of event to dispatch (E.g. "mousemove")
 * @param {Object} args The argument representing the event, e.g. {clientX: 100, clientY: 150}
 * @param {EventTarget} [target=window] What to dispatch the event to.
 * @returns {Event} The event object.
 */
export let dispatch = (
	args = req("object", "event properties"),
	type = req("string", "type"),
	target = window,
) => {
	let e = new Event(type);
	for (let o in args) {
		e[o] = args[o];
	}
	target.dispatchEvent(e);
	return e;
};
//#endregion Event
//#region Function
/**
 * Runs a list of functions with a list of arguments.
 * @returns {Array.<array>} The list of outputs.
 * @memberOf function
 * @example
 * //It returns an array of outputs, each item in the base array is the output of one function, and each item in that array is the output for each argument.
 * _$.juxt(
    x => x + 1,
    x => x - 1,
    x => x * 10
  )(1, 2, 3); // [[2, 3, 4], [0, 1, 2], [10, 20, 30]]
 * @param  {...function} fns The functions to call.
 */
export let juxt = (...fns) => (...args) =>
	[...fns].map((fn) => [...args].map(fn));
/**
 * Returns a promise after a specified number of milliseconds.
 * @returns {Promise}
 * @memberOf function
 * @example
 * (async () => {
 *    while (true){
 *     document.body.innerHTML = (await _$.getJSON("https://time.jsontest.com")).time
 *     await _$.sleep(60000);//Wait one minute then loop.
 *    }
 * })
 * @param {Number} ms The milliseconds to sleep.
 */
export let sleep = (ms = req("number", "milliseconds")) =>
	new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Limits the arguments that a given function takes to only the 1st n arguments.
 * @example
 * //Now console can only log one item. How utterly useless but explanatory at the same time!
 * console.log = _$.limitArgs(console.log, 1);
 * @memberOf function
 * @returns {Function} The new function that only takes the 1st n arguments.
 * @param {Function} fn The function to call.
 * @param {Number} n The number of arguments to accept.
 */
export let limitArgs = (
	fn = req("function", "function"),
	n = req("number", "arguments"),
) => (...args) => fn(...args.slice(0, n));
/**
 * Returns the index of the fastest function in an array of functions.
 * @memberOf function
 * @returns {Number} The index of the fastest function in the array.
 * @example
 * _$.fastestFunction([_$.uuid, () => _$.syntaxHighlight("<h1>Hello world</h1>", "html")]);//0, the first function.
 * @param {Array} fns The array of functions to execute.
 * @param {Number} [iterations=1000] How many times to execute the functions. (More is more reliable but takes longer.)
 */
export let fastestFunction = (fns, iterations = 1000) => {
	const times = fns.map((fn) => {
		const before = performance.now();
		for (let i = 0; i < iterations; i++) fn();
		return performance.now() - before;
	});
	return times.indexOf(Math.min(...times));
};

/**
 * Uses an array of arguments to make a function based on the one inputted.
 * @memberOf function
 * @function
 * @returns {Function}
 * @example
 * var say = _$.spread(function(who, what) {
    return who + ' says ' + what;
  });
  say(["Fred", "hi"]);//"Fred says hi"
 * @param {Function} fn The function to use
 */
export let spread = (fn = req("function")) => {
	return (args) => {
		fn.apply(globalThis, args);
	};
};
/**
 * Memoizes a function, basically caching the result of past operations so that if the exact same thing is called again it will return the same value instantly.
 * @function
 * @memberOf function
 * @param {Function} fn The function to memoize.
 * @example
 * let uuid = _$.memoize(() => _$.uuid()); // uuid will always return the same uuid. (Note that _$.uuid is already very fast - it can generate up to 10 million values in 20 seconds.)
 * @returns {Function} The memoized function.
 */
export let memoize = (fn = req("function")) => {
	let cache = {};
	return function () {
		let args = JSON.stringify(Array.from(arguments));
		let arg_array = Array.from(arguments);
		if (cache[args]) {
			return cache[args];
		} else {
			cache[args] = fn(...arg_array);
			return cache[args];
		}
	};
};
/**
 * Composes two functions together. Read more here: https://www.codementor.io/@michelre/use-function-composition-in-javascript-gkmxos5mj
 * @function
 * @memberOf function
 * @param {...Function} The functions to be composed.
 * @returns {Function} The composed function.
 * @example
 * const add2 = (x) => x + 2;
 * const multiply2 = (x) => x * 2;
 * console.log(_$.composeFunction(add2, multiply2)(3)) // 8 - i.e  3 * 2 + 2
 */
export let composeFunction = (...functions) => (args) => {
	req("functions", "function list", ![...functions].length);
	return functions.reduceRight((arg, fn) => fn(arg), args);
};
/**
 * Returns the curried version of a function. Read more here: https://medium.com/@abitoprakash/implementing-a-curry-function-in-javascript-6a249dbcb1bb
 * @function
 * @memberOf function
 * @param {Function} fn The function to curry.
 * @param {Number} [arity=fn.length] The arity (number of params) of the function to curry.
 * {...*} [args] Optional arguments to pass to the function being curried.
 * @returns {Function} The curried version of the function.
 * @example
 * let fn = (x, y, z, w) => x * y * z * w;
 * console.log(_$.curryFunction(fn, 4, 5)(4)(3)(2)); // 120 i.e. 5 * 4 * 3 * 2
 */
export let curryFunction = (
	fn = req("function"),
	arity = fn.length,
	...args
) =>
	arity <= args.length
		? fn(...args)
		: _$.curryFunction.bind(null, fn, arity, ...args);
/**
 * Returns if the given function is async or not.
 * @memberOf function
 * @function
 * @param {Function} val The function to test.
 * @returns {Boolean} True if the function is async and false if not.
 * @example
 * const asyncFn = async (x) => x ** 3; // It's a silly function, but a good example
 * console.log(_$.isAsync(asyncFn)); // true
 */
export let isAsync = (val = req("function")) =>
	Object.prototype.toString.call(val) === "[object AsyncFunction]";

/**
 * Times the function passed.
 * @function
 * @memberOf function
 * @param {Function} fn The function to run and time.
 * @param {String} [name=_$ function timer]
 * @example
 * // Times how long it took the user to enter their name.
 * _$.timeFunction(() => prompt("What's your name?"));
 * @returns {Object} An object with "time" and "function" properties, time being time in milliseconds, and function being the original function passed.
 */
export let timeFunction = (
	fn = req("function"),
	name = "_$ function timer",
) => {
	let startTime = performance.now();
	console.time(name);
	fn();
	console.timeEnd(name);
	return { function: fn, time: performance.now() - startTime };
};
/**
 * Only runs the input function at MAX with the delay specified.
 * @function
 * @memberOf function
 * @param {Function} func The function to run.
 * @param {Object.<Boolean>} options The options.
 * @param {Number} wait The number of milliseconds to wait.
 * @example
 * const alert_function = _$.throttle(() => {alert("hello")}, 5000)
 * setInterval(alert_function, 1)
 * @returns {Function} The throttled function
 */
export let throttle = (
	func = req("function"),
	wait = req("number", "wait"),
	options = {},
) => {
	var context, args, result;
	var timeout = null;
	var previous = 0;
	if (!options) options = {};
	var later = function () {
		previous = options.leading === false ? 0 : Date.now();
		timeout = null;
		result = func.apply(context, args);
		if (!timeout) context = args = null;
	};
	return function () {
		var now = Date.now();
		if (!previous && options.leading === false) previous = now;
		var remaining = wait - (now - previous);
		context = this;
		args = arguments;
		if (remaining <= 0 || remaining > wait) {
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
			previous = now;
			result = func.apply(context, args);
			if (!timeout) context = args = null;
		} else if (!timeout && options.trailing !== false) {
			timeout = setTimeout(later, remaining);
		}
		return result;
	};
};
/**
 * Debounces a function so that it only runs after it has not been called for a certain amount of time.
 * @memberOf function
 * @function
 * @returns {Function} The debounced function.
 * @example
 * window.addEventListener("keyup", _$.debounce(expensiveFunction, 100));//Run the function expensiveFunction at most every 100ms.
 * @param {Function} func The function to throttle.
 * @param {Number} wait The milliseconds to wait between executions.
 * @param {Boolean} [immediate=false] Whether or not to run immediately, or after a group of executions.
 */
export let debounce = (
	func = req("function"),
	wait = req("number", "wait"),
	immediate = false,
) => {
	// 'private' variable for instance
	// The returned function will be able to reference this due to closure.
	// Each call to the returned function will share this common timer.
	var timeout;

	// Calling debounce returns a new anonymous function
	return function () {
		// reference the context and args for the setTimeout function
		var context = this,
			args = arguments;

		// Should the function be called now? If immediate is true
		//   and not already in a timeout then the answer is: Yes
		var callNow = immediate && !timeout;

		// This is the basic debounce behaviour where you can call this
		//   function several times, but it will only execute once
		//   [before or after imposing a delay].
		//   Each time the returned function is called, the timer starts over.
		clearTimeout(timeout);

		// Set the new timeout
		timeout = setTimeout(function () {
			// Inside the timeout function, clear the timeout variable
			// which will let the next execution run when in 'immediate' mode
			timeout = null;

			// Check if the function already ran with the immediate flag
			if (!immediate) {
				// Call the original function with apply
				// apply lets you define the 'this' object as well as the arguments
				//    (both captured before setTimeout)
				func.apply(context, args);
			}
		}, wait);

		// Immediate mode and no wait timer? Execute the function..
		if (callNow) func.apply(context, args);
	};
};
/**
 * Runs a function asynchronously in a web worker.
 * @function
 * @memberOf function
 * @param {Function} fn The function to run
 * @example
 * _$.runAsync(() =>  "hello world").then(console.log); // "hello world"
 * @returns {Promise} A promise that resolves into the return value of the function.
 */
export let runAsync = (fn = req("function")) => {
	const worker = new Worker(
		URL.createObjectURL(new Blob([`postMessage((${fn})());`]), {
			type: "application/javascript; charset=utf-8",
		}),
	);
	return new Promise((res, rej) => {
		worker.onmessage = ({ data }) => {
			res(data), worker.terminate();
		};
		worker.onerror = (err) => {
			rej(err), worker.terminate();
		};
	});
};
//#endregion Function
//#region Object
/**
 * Flattens an object recursively into one. 
 * @memberOf object
 * @function
 * @example 
 * _$.flattenObj({
      hello: "world",
      another: {
          nested: "Value",
          anotherNestedValue: {
              "something": "A value"
          },
          "more Values!!": "lol"
      }
  }); //  { hello: "world", nested: "Value", something: "A value", more Values!!: "lol" }
* @param {Object} o The object to flatten
* @returns {Object} The flattened object.
 */
export let flattenObj = (o = req("object", "object")) => {
	return o !== Object(o) || Array.isArray(o)
		? {}
		: Object.assign(
				{},
				...(function leaves(o) {
					return [].concat.apply(
						[],
						Object.entries(o).map(([k, v]) => {
							return !v ||
								typeof v !== "object" ||
								!Object.keys(v).some((key) =>
									v.hasOwnProperty(key),
								) ||
								Array.isArray(v)
								? { [k]: v }
								: leaves(v);
						}),
					);
				})(o),
		  );
};
/**
 * Deep clones an object (or anything else, like an array or string)
 * @function
 * @memberOf object
 * @param {Object|Array|String} src The object to clone.
 * @returns {Object} The output cloned object.
 * @example
 * let obj = { hello: { puny: "earthlings" }};
 * let cloned = _$.clone(obj); // cloned can be operated on without changing obj
 */
export let clone = (
	src = req("object", "Object to clone"),
	/* These params are internal */
	_visited,
	_copiesVisited,
) => {
	var object_create = Object.create;
	if (typeof object_create !== "function") {
		object_create = function (o) {
			function F() {}
			F.prototype = o;
			return new F();
		};
	}
	if (src === null || typeof src !== "object") {
		return src;
	}
	if (typeof src.clone == "function") {
		return src.clone(true);
	}
	if (src instanceof Date) {
		return new Date(src.getTime());
	}
	if (src instanceof RegExp) {
		return new RegExp(src);
	}
	if (src.nodeType && typeof src.cloneNode == "function") {
		return src.cloneNode(true);
	}
	if (_visited === undefined) {
		_visited = [];
		_copiesVisited = [];
	}
	var i,
		len = _visited.length;
	for (i = 0; i < len; i++) {
		if (src === _visited[i]) {
			return _copiesVisited[i];
		}
	}
	if (Object.prototype.toString.call(src) == "[object Array]") {
		var ret = src.slice();
		_visited.push(src);
		_copiesVisited.push(ret);

		var i = ret.length;
		while (i--) {
			ret[i] = clone(ret[i], _visited, _copiesVisited);
		}
		return ret;
	}
	var proto = Object.getPrototypeOf
		? Object.getPrototypeOf(src)
		: src.__proto__;
	if (!proto) {
		proto = src.constructor.prototype;
	}
	var dest = object_create(proto);
	_visited.push(src);
	_copiesVisited.push(dest);

	for (var key in src) {
		dest[key] = clone(src[key], _visited, _copiesVisited);
	}
	return dest;
};
/**
 * @memberOf object
 * @function
 * @param {Object} obj The object to listen to.
 * @param {Function} [getCallback=()=>null] The callback function to run when a value is set, with the arguments, key (the key changed) and value (the new value of the key).
 * @param {Function} [setCallback=()=>null] The callback function to run when a value is gotten, with the arguments, key (the key got) and value (the value of the key).
 * @example
 * let obj = {something: "This is part of the object", anotherThing: "This is another!"};
 * obj = _$.listen(obj, (k, v) => console.log(`set ${k} to ${v}`), () => console.log("Gotten"));
 * obj.something; // Logs "Gotten" to the console!
 * obj.anotherThing = "Hello world!"; // Logs "Set abotherThing to Hello world!" to the console!
 * @returns {Proxy} A proxy object that behaves like any other object but listens to changes.
 */
export let listen = (
	obj = req("object"),
	setCallback = () => null,
	getCallback = () => null,
) => {
	return new Proxy(obj, {
		set: function (target, key, value) {
			setCallback(key, value);
			target[key] = value;
			return target[key];
		},
		get: function (target, key, value) {
			getCallback(key, value);
			return obj[key];
		},
	});
};
/**
 * Merges two objects into one. Note that object 2 properties will overwrite those of object 2.
 * @memberOf object
 * @function
 * @param {Object} obj1 The 1st object to merge
 * @param {Object} obj2 The 2nd object to merge.
 * @returns {Object} The merged object.
 * @example
 * console.log(_$.merge({hello: "Hello!!"}, {world: " World", world: " Earthlings"})); // {hello: "Hello!!", world: " Earthlings"}
 */
export let merge = function MergeRecursive(
	obj1 = req("object", "object 1"),
	obj2 = req("object", "object 2"),
) {
	for (var p in obj2) {
		if (p in Object.prototype) continue;
		try {
			// Property in destination object set; update its value.
			if (obj2[p].constructor == Object) {
				obj1[p] = MergeRecursive(obj1[p], obj2[p]);
			} else {
				obj1[p] = obj2[p];
			}
		} catch (e) {
			// Property in destination object not set; create it and set its value.
			obj1[p] = obj2[p];
		}
	}
	return obj1;
};
/**
 * Maps the keys of an object.
 * @function
 * @memberOf object
 * @param {Object} obj The object to map.
 * @param {Function} fn The function to run (passed the current key of the object) which returns the new value from that key.
 * @example
 * _$.mapObjectKeys({something: "A value", anotherThing: "Another value!"}, (key) => key.toUpperCase());
 * //Returns {SOMETHING: "A value", ANOTHERTHING: "Another value!"}
 * @returns {Object} The new Object.
 */
export let mapObjectKeys = (
	obj = req("object"),
	fn = req("function", "callback"),
) =>
	Array.isArray(obj)
		? obj.map((val) => _$.mapObjectKeys(val, fn))
		: typeof obj === "object"
		? Object.keys(obj).reduce((acc, current) => {
				const key = fn(current);
				const val = obj[current];
				acc[key] =
					val !== null && typeof val === "object"
						? _$.mapObjectKeys(val, fn)
						: val;
				return acc;
		  }, {})
		: obj;
/**
 * Maps an object's values.
 * @memberOf object
 * @function
 * @param {Object} obj The object to map the values of.
 * @param {Function} fn The callback function to use.
 * @returns {Object} The mapped object.
 * @example
 * console.log(_$.mapObjectValues({ hello: "World", bijou: "is GREAT" }, val => val.toLowerCase())); // { hello: "world", bijou: "is great" }
 */
export let mapObjectValues = (
	obj = req("object", "object"),
	fn = req("function", "callback"),
) => {
	Object.keys(obj).map(function (key, index) {
		obj[key] = fn(obj[key], index);
	});
	return obj;
};
/**
 * Converts a form to an Object.
 * @function
 * @memberOf object
 * @param {HTMLFormElement} form The form element.
 * @returns {Object} The object of form data (The keys are the "name" attributes of the form inputs and the values are the value attributes of the form data.)
 * @example
 * html:
 * ```
 * <form id="form">
 *   <input name"input" />
 *   <input name="input2" />
 * </form>
 * ```
 * js:
 * const form = document.getElementById("form");
 * console.log(_$.formToObject(form)); // e.g. { input: "hello", input2: "world" }
 */
export let formToObject = (
	form = req("HTMLFormElement", "the form"),
) => {
	node();
	return Array.from(new FormData(form)).reduce(
		(acc, [key, value]) => ({
			...acc,
			[key]: value,
		}),
	);
};
/**
 * Sorts an object alphabetically by its keys.
 * @function
 * @memberOf object
 * @param {Object} obj The object to sort.
 * @example
 * let object = _$.sortObj({testing: "A value", anotherThing: "Another value!"});
 * // The object is now {anotherThing: "Another value!", testing: "A value"}
 * @returns {Object} The sorted object.
 */
export let sortObj = (obj = req("object", "object")) => {
	return Object.keys(obj)
		.sort()
		.reduce(function (result, key) {
			result[key] = obj[key];
			return result;
		}, {});
};
//#endregion Object
//#region Math

/**
 * Gets the greatest common divisor of a list of numbers.
 * @returns {Number} The greatest common divisor
 * @memberOf math
 * @function
 * @example
 * _$.gcd(12, 4, 8);//Returns 4
 * @param {...Number} arr The numbers to compare
 */
export let gcd = (...ary) => {
	if (ary[0] instanceof Array) {
		return getGCD(ary[0]);
	} else {
		return getGCD([...ary]);
	}
	function getGCD(arr) {
		let min = Math.min(...arr);
		let max = Math.max(...arr);
		if (min == max) {
			return min;
		} else {
			for (let i in arr) {
				if (arr[i] > min) {
					arr[i] = arr[i] - min;
				}
			}
			return getGCD(arr);
		}
	}
};
/**
 * Rounds a number.
 * @example
 * console.log(_$.round(14, 10));//Logs 10 to the console, as 14 rounded to the nearest 10 is 10.
 * @example
 * console.log(_$.round(Math.PI));//Logs 3 to the console.
 * @param {Number} number The number to round.
 * @param {Number} amount An optional multiple to round it to.
 * @returns {Number} The rounded number
 */
export let round = (number = req("number"), amount = 1) =>
	Math.round(number / amount) * amount;
/**
 * Tests if two things are equal, like "thing === thing2" but it also works for dates and objects.
 * @memberOf math
 * @function
 * @example
 * console.assert(new Date() === new Date());//Not equal
 * console.assert(_$.equals(new Date(), new Date()));//Equal!
 * @example
 * console.assert({thing: "Thing!"} === {thing: "Thing!"});//Not equal;
 * console.assert(_$.equals({thing: "Thing!"}, {thing: "Thing!"}))
 * @param {*} a The first thing to test
 * @param {*} b The second thing to test
 */
export let equals = (a = req("any", "a"), b = req("any", "b")) => {
	if (a === b) return true;
	if (_$.typeOf(a) === "RegExp" && _$.typeOf(b) === "RegExp")
		return String(a) === String(b);
	if (a instanceof Date && b instanceof Date)
		return a.getTime() === b.getTime();
	if (!a || !b || (typeof a !== "object" && typeof b !== "object"))
		return a === b;
	if (a.prototype !== b.prototype) return false;
	let keys = Object.keys(a);
	if (keys.length !== Object.keys(b).length) return false;
	return keys.every((k) => equals(a[k], b[k]));
};
/**
 * Tests if a given number is prime.
 * @returns {boolean} Whether the number is prime
 * @memberOf math
 * @function
 * @example
 * _$.isPrime(11);//True
 * _$.isPrime(10);//False
 * @param {Number} num The number to test.
 */
export let isPrime = (num = req("number", "number")) => {
	const boundary = Math.floor(Math.sqrt(num));
	for (let i = 2; i <= boundary; i++) if (num % i === 0) return false;
	return num >= 2;
};
/**
 * Gets the factorial of a number given.
 * @memberOf math
 * @function
 * @param {Number} n The number to get the factorial of.
 * @returns {Number}
 * @example
 * _$.factorial(3);//6
 */
export let factorial = (n = req("number")) =>
	n < 0
		? (() => {
				throw new TypeError("Negative numbers are not allowed!");
		  })()
		: n <= 1
		? 1
		: n * factorial(n - 1);
/**
 * Performs the Luhn Check on a number, which is used to validate credit card numbers, IMEI numbers, National Provider Identifier numbers in the United States, Canadian Social Insurance Numbers, Israeli ID Numbers, South African ID Numbers, Greek Social Security Numbers (ΑΜΚΑ), and survey codes appearing on McDonald's, Taco Bell, and Tractor Supply Co. receipts.
 * @example
 *  - _$.luhnCheck('4485275742308327'); // true
    - _$.luhnCheck(6011329933655299); //  false
    - _$.luhnCheck(123456789); // false
 * @param {Number|String} num The number or string to check on.
 * @memberOf math
 * @function
 */
export let luhnCheck = (num = req("String|Number")) => {
	let arr = (num + "")
		.split("")
		.reverse()
		.map((x) => parseInt(x));
	let lastDigit = arr.splice(0, 1)[0];
	let sum = arr.reduce(
		(acc, val, i) =>
			i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9,
		0,
	);
	sum += lastDigit;
	return sum % 10 === 0;
};
/**
 * Animates a number from one value to another.
 * @function
 * @memberOf math
 * @param {Number} start The initial value of the number in the animation
 * @param {Number} end The final value of the number in the animation
 * @param {Number} duration The duration of the animation in milliseconds
 * @param {Function} callback The callback function to run with the number and the percentage (Between 0 and 1) of the animation.
 * @param {Number} [interval=20] The amount of time to wait between frames in milliseconds.
 * @param {Function} num The function to run to manipulate the timing of the animation, for example setting this to (current_number) => current_number **2 would make a simple ease in function. (The value recieved by this is also between 0 and 1, feel free to use some stuff from _$.ease.FUNCTION_HERE(current_number) to incorporate easy easing!)
 * @example
 * Animates from 50 to 100 over the course of 3 seconds, updating every half second, and writing the current value to the document body.
 * _$.animate(50,100, 3000, (e) => document.body.innerHTML = (Math.round(e)), 500, (num) => _$.ease.easeInOutQuart(num));
 * @returns {Number} A unique number representing the setInterval loop used in the animation.
 */
// prettier-ignore
export let animate = (start = req("Number", "start"), end = req("Number", "end"), duration=req("number", "duration"), callback = req("function", "callback"), interval = 20, num = (num) => num) => {
    var value = start;
    var start_time = Date.now();
    let update = setInterval(() => {
        value = num((Date.now() - start_time) / duration) * (end - start) + start;
        callback(value, num((Date.now() - start_time) / duration));
    }, interval);
    setTimeout(() => {
        clearInterval(update);
        callback(end, 1);
        return;
    }, duration);
	return update
}
/**
 * Returns an array of the whole numbers (inclusive) between the numbers specified.
 * @memberOf math
 * @function
 * @param {Number} start The start value of the array.
 * @param {Number} end The end value of the array.
 * @example
 * console.log(_$.range(-2, 1)); // [-2, -1, 0, 1]
 * @returns {Array.<Number>} An array of whole numbers (inclusive) between the numbers specified.
 */
export let range = (start = req("number", "start"), end = 0) => {
	if (start > end) {
		[start, end] = [end, start];
	}
	return Array(end - start + 1)
		.fill()
		.map((_, idx) => start + idx);
};
/**
 * Generates a unique ID from a seed
 * @function
 * @memberOf math
 * @param {Number|String} [seed=Math.random()] The seed to use.
 * @example
 * console.log(_$.uuid()); // e.g. "863d0193-863d-0193-863d-0193863d0193"
 * @returns {String} The UUID
 */
export let uuid = (seed = Math.random()) => {
	//Magic. Do not touch.
	if (typeof seed === "string") {
		// Convert string to a number between 0 and 1
		seed = _temp.hashString(seed) / 10000000000000000;
	}
	function _p8(s) {
		var p = (seed.toString(16) + "000000000").substr(2, 8);
		return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
	}
	return _p8() + _p8(true) + _p8(true) + _p8();
};
/**
 * Gives an array of prime numbers up to a certain one.
 * @function
 * @memberOf math
 * @param {Number} num - The number to give primes to.
 * @example
 * console.log(_$.primesTo(10)); // [2, 3, 5, 7]
 * @returns {Array.<Number>} Returns an array of prime numbers up to the given number.
 */
export let primesTo = (num = req("number", "number")) => {
	let arr = Array.from({
			length: num - 1,
		}).map((x, i) => i + 2),
		sqroot = Math.floor(Math.sqrt(num)),
		numsTillSqroot = Array.from({
			length: sqroot - 1,
		}).map((x, i) => i + 2);
	numsTillSqroot.forEach(
		(x) => (arr = arr.filter((y) => y % x !== 0 || y === x)),
	);
	return arr;
};
/**
 * Generates a random number between a minimum and maximum number
 * @function
 * @memberOf math
 * @param {Number} min The lowest number that the random value generated can be.
 * @param {Number} max The highest number that the random value generated can be.
 * @param {Boolean} [round=true] Weather to round the generated number
 * @param {Number} [seed=Math.random()] The seed for the generated number (Between 0 and 1).
 * @returns {Number} The random number generated.
 * @example
 * console.log(_$.random(0, 100)); // e.g. 47
 */
export let random = (
	max = req("number", "max"),
	min = req("number", "min"),
	round = true,
	seed = Math.random(),
) => {
	if (min > max) {
		[min, max] = [max, min];
	}
	var out = seed * (max - min + 1) + min;
	if (round) {
		out = Math.round(out);
	}
	return out;
};
/**
 * Get a random number from a seed.
 * @function
 * @memberOf math
 * @param {number} seed The seed to use to generate random numbers.
 * @example
 * console.log(_$.seedRandom(13)); // 0.5663226493634284
 * @returns {Number} The random number from the seed.
 */
export let seedRandom = (seed = req("number", "seed")) => {
	var t = (seed += 0x6d2b79f5);
	t = Math.imul(t ^ (t >>> 15), t | 1);
	t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
	return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/**
 * Formats a number by adding commas to it.
 * @function
 * @memberOf math
 * @param {Number} n The number to format.
 * @example
 * console.log(_$.formatNumber(100000000)); // "100,000,000"
 * @returns {String} The formatted string representation of the number.
 */
export let formatNumber = (n = req("number", "number")) =>
	n.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
/**
 * Easing functions
 * @Object
 * @memberOf math
 * @example
 * console.log(_$.ease.easeInOutQuad(.3)); // 0.18 - the eased point of about 1/3 along the animation.
 * @returns {Function} The easing function.
 */
export let ease = {
	// no easing, no acceleration
	/**
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	linear: (t = req("number", "percentage")) => t,
	/**
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeInSine: (t = req("number", "percentage")) =>
		1 - Math.cos((t * Math.PI) / 2),
	/**
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeOutSine: (t = req("number", "percentage")) =>
		Math.sin((t * Math.PI) / 2),
	/**
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeInOutSine: (t = req("number", "percentage")) =>
		-(Math.cos(Math.PI * t) - 1) / 2,
	// accelerating from zero velocity
	/**
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeInQuad: (t = req("number", "percentage")) => t * t,
	// decelerating to zero velocity
	/**
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeOutQuad: (t = req("number", "percentage")) => t * (2 - t),
	// acceleration until halfway, then deceleration
	/**
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeInOutQuad: (t = req("number", "percentage")) =>
		t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
	// accelerating from zero velocity
	/**
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeInCubic: (t = req("number", "percentage")) => t * t * t,
	// decelerating to zero velocity
	/**
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeOutCubic: (t = req("number", "percentage")) => --t * t * t + 1,
	// acceleration until halfway, then deceleration
	/**
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeInOutCubic: (t = req("number", "percentage")) =>
		t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
	// accelerating from zero velocity
	/**
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeInQuart: (t = req("number", "percentage")) => t * t * t * t,
	// decelerating to zero velocity
	/**
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeOutQuart: (t = req("number", "percentage")) =>
		1 - --t * t * t * t,
	// acceleration until halfway, then deceleration
	/**
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeInOutQuart: (t = req("number", "percentage")) =>
		t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
	// accelerating from zero velocity
	/**
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeInQuint: (t = req("number", "percentage")) => t * t * t * t * t,
	// decelerating to zero velocity
	/**
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeOutQuint: (t = req("number", "percentage")) =>
		1 + --t * t * t * t * t,
	// acceleration until halfway, then deceleration
	/**
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeInOutQuint: (t = req("number", "percentage")) =>
		t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,
	/**
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeInExpo: (t = req("number", "percentage")) =>
		t === 0 ? 0 : Math.pow(2, 10 * t - 10),
	/**
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeOutExpo: (t = req("number", "percentage")) =>
		t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
	/**
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeInOutExpo: (t = req("number", "percentage")) =>
		t === 0
			? 0
			: t === 1
			? 1
			: t < 0.5
			? Math.pow(2, 20 * t - 10) / 2
			: (2 - Math.pow(2, -20 * t + 10)) / 2,
	/**
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeInCirc: (t = req("number", "percentage")) =>
		1 - Math.sqrt(1 - t * t),
	/**
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeOutCirc: (t = req("number", "percentage")) =>
		Math.sqrt(1 - (t - 1) * (t - 1)),
	/**
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeInOutCirc: (t = req("number", "percentage")) =>
		t < 0.5
			? 1 - Math.sqrt(1 - 4 * t * t) / 2
			: (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2,
	/**
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeInBack: (t = req("number", "percentage")) =>
		2.70158 * t * t * t - 1.70158 * t * t,
	/**
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeOutBack: (t = req("number", "percentage")) =>
		1 + 2.70158 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2),
	/**
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeInOutBack: (t) => {
		const c = 2.5949095;

		return t < 0.5
			? (4 * t * t * ((c + 1) * 2 * t - c)) / 2
			: (Math.pow(2 * t - 2, 2) * ((c + 1) * (t * 2 - 2) + c) + 2) /
					2;
	},
	/**
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeInElastic: (t = req("number", "percentage")) =>
		t === 0
			? 0
			: t === 1
			? 1
			: -Math.pow(2, 10 * t - 10) *
			  Math.sin(((t * 10 - 10.75) * (2 * Math.PI)) / 3),
	/**
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeOutElastic: (t = req("number", "percentage")) =>
		t === 0
			? 0
			: t === 1
			? 1
			: Math.pow(2, -10 * t) *
					Math.sin(((t * 10 - 0.75) * (2 * Math.PI)) / 3) +
			  1,
	/**
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeInOutElastic: (t = req("number", "percentage")) =>
		t === 0
			? 0
			: t === 1
			? 1
			: t < 0.5
			? -(
					Math.pow(2, 20 * t - 10) *
					Math.sin(((20 * t - 11.125) * (2 * Math.PI)) / 4.5)
			  ) / 2
			: (Math.pow(2, -20 * t + 10) *
					Math.sin(((20 * t - 11.125) * (2 * Math.PI)) / 4.5)) /
					2 +
			  1,
	/**
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeInBounce: (t = req("number", "percentage")) =>
		1 - ease.easeOutBounce(1 - t),
	/**
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeOutBounce: (t = req("number", "percentage")) => {
		const n = 7.5625;
		const d = 2.75;

		if (t < 1 / d) {
			return n * t * t;
		} else if (t < 2 / d) {
			return n * (t -= 1.5 / d) * t + 0.75;
		} else if (t < 2.5 / d) {
			return n * (t -= 2.25 / d) * t + 0.9375;
		} else {
			return n * (t -= 2.625 / d) * t + 0.984375;
		}
	},
	/**
	 * @param {Number} t A number between 0 and 1 representing a linearly progressing percentage through the animation.
	 * @returns {Number} A number between 0 and 1 that is the eased version of the 't' parameter.
	 */
	easeInOutBounce: (t = req("number", "percentage")) =>
		t < 0.5
			? (1 - ease.easeOutBounce(1 - 2 * t)) / 2
			: (1 + ease.easeOutBounce(2 * t - 1)) / 2,
};

//#endregion Math
//#region String
/**
 * Compares two strings using the Jaro-Winkler Distance algorithm.
 * @memberOf string
 * @function
 * @example
 * _$.jaroDistance('test', 'tes');//0.9416666666666667
 * @returns {Number} A number representing how similar the two strings are, where 1 is exactly the same and 0 is totally different
 * @param {String} a The first string
 * @param {String} b The second string
 */
export let jaroDistance = function (a, b) {
	let adjustments = {
		A: "E",
		A: "I",
		A: "O",
		A: "U",
		B: "V",
		E: "I",
		E: "O",
		E: "U",
		I: "O",
		I: "U",
		O: "U",
		I: "Y",
		E: "Y",
		C: "G",
		E: "F",
		W: "U",
		W: "V",
		X: "K",
		S: "Z",
		X: "S",
		Q: "C",
		U: "V",
		M: "N",
		L: "I",
		Q: "O",
		P: "R",
		I: "J",
		2: "Z",
		5: "S",
		8: "B",
		1: "I",
		1: "L",
		0: "O",
		0: "Q",
		C: "K",
		G: "J",
		E: " ",
		Y: " ",
		S: " ",
	};
	if (!a || !b) {
		return 0.0;
	}
	a = a.trim().toUpperCase();
	b = b.trim().toUpperCase();
	var a_len = a.length;
	var b_len = b.length;
	var a_flag = [];
	var b_flag = [];
	var search_range = Math.floor(Math.max(a_len, b_len) / 2) - 1;
	var minv = Math.min(a_len, b_len);
	var Num_com = 0;
	var yl1 = b_len - 1;
	for (var i = 0; i < a_len; i++) {
		var lowlim = i >= search_range ? i - search_range : 0;
		var hilim = i + search_range <= yl1 ? i + search_range : yl1;
		for (var j = lowlim; j <= hilim; j++) {
			if (b_flag[j] !== 1 && a[j] === b[i]) {
				a_flag[j] = 1;
				b_flag[i] = 1;
				Num_com++;
				break;
			}
		}
	}
	if (Num_com === 0) {
		return 0.0;
	}
	var k = 0;
	var N_trans = 0;
	for (var i = 0; i < a_len; i++) {
		if (a_flag[i] === 1) {
			var j;
			for (j = k; j < b_len; j++) {
				if (b_flag[j] === 1) {
					k = j + 1;
					break;
				}
			}
			if (a[i] !== b[j]) {
				N_trans++;
			}
		}
	}
	N_trans = Math.floor(N_trans / 2);
	var N_simi = 0;
	var adjwt = adjustments;
	if (minv > Num_com) {
		for (var i = 0; i < a_len; i++) {
			if (!a_flag[i]) {
				for (var j = 0; j < b_len; j++) {
					if (!b_flag[j]) {
						if (adjwt[a[i]] === b[j]) {
							N_simi += 3;
							b_flag[j] = 2;
							break;
						}
					}
				}
			}
		}
	}
	var Num_sim = N_simi / 10.0 + Num_com;
	var weight =
		Num_sim / a_len + Num_sim / b_len + (Num_com - N_trans) / Num_com;
	weight = weight / 3;
	if (weight > 0.7) {
		var j = minv >= 4 ? 4 : minv;
		var i;
		for (i = 0; i < j && a[i] === b[i]; i++) {}
		if (i) {
			weight += i * 0.1 * (1.0 - weight);
		}
		if (minv > 4 && Num_com > i + 1 && 2 * Num_com >= minv + i) {
			weight +=
				(1 - weight) *
				((Num_com - i - 1) / (a_len * b_len - i * 2 + 2));
		}
	}
	return weight;
};
/**
 * Prefixes the given CSS property for the current browser.
 * @memberOf string
 * @function
 * @example
 * document.body.style[_$.prefix("appearance")] = "hidden";//Sets the document body's appearance property to "hidden".
 * @param {String} prop The property to prefix.
 * @returns {String} The prefixed value (camelCased, instead of css-case, so mozAppearance instead of -moz-appearance).
 */
export let prefixCSS = (prop = req("string", "property")) => {
	node();
	const capitalizedProp =
		prop.charAt(0).toUpperCase() + prop.slice(1);
	const prefixes = ["", "webkit", "moz", "ms", "o"];
	const i = prefixes.findIndex(
		(prefix) =>
			typeof document.body.style[
				prefix ? prefix + capitalizedProp : prop
			] !== "undefined",
	);
	return i !== -1
		? i === 0
			? prop
			: prefixes[i] + capitalizedProp
		: null;
};

/**
 * Parses a cookie string into object and value pairs.
 * @memberOf string
 * @function
 * @example
 * _$.parseCookie("foo=bar; something=hello%20world");//Returns {foo: "bar", something: "hello world"};
 * @param {String} str The string to parse.
 */
export let parseCookie = (str = req("string", "cookie string")) =>
	str
		.split(";")
		.map((v) => v.split("="))
		.reduce((acc, v) => {
			acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(
				v[1].trim(),
			);
			return acc;
		}, {});
/**
 * Hashes a string using the crypto api. 
 * @memberOf string
 * @function
 * @example
 * _$.hash(
    JSON.stringify({ a: 'a', b: [1, 2, 3, 4], foo: { c: 'bar' } })
  ).then(console.log);
  // '04aa106279f5977f59f9067fa9712afc4aedc6f5862a8defc34552d8c7206393'
 * @param {String} val The string to hash
 * @returns {Promise} A promise that resolves into the hashed string.
 */
export let hash = (val = req("string", "input string")) => {
	node();
	return crypto.subtle
		.digest("SHA-256", new TextEncoder("utf-8").encode(val))
		.then((h) => {
			let hexes = [],
				view = new DataView(h);
			for (let i = 0; i < view.byteLength; i += 4)
				hexes.push(
					("00000000" + view.getUint32(i).toString(16)).slice(-8),
				);
			return hexes.join("");
		});
};
/**
 * Lets you use a for loop in template literals.
 * @function
 * @memberOf string
 * @param {Array} arr The array to loop.
 * @param {Function} callback The callback to return strings
 * @example
 * console.log(`Things: ${_$.forTemplateLiteral(["apple", "orange"], (item, i) => {return `an ${item}`})}`)
 * // "Things: an apple an orange
 * @returns {String} String that has been for looped
 */
export let forTemplateLiteral = (
	arr = req("array", "array"),
	callback = req("function", "callback"),
) => {
	return arr.map(callback).join``;
};
/**
 * Maps a string like an array.
 * @memberOf string
 * @function
 * @example
 * _$.mapString("Hello world", (e) => e.toUpperCase());//Returns "HELLO WORLD"
 * @param {String} str The string to map
 * @param {Function} fn The callback function to run to map the string.
 */
export let mapString = (
	str = req("string", "string"),
	fn = req("function", "callback"),
) => Array.prototype.map.call(str, fn).join("");
/**
 * Removes the accents from a string.
 * @memberOf string
 * @function
 * @returns {String} The string without accents.
 * @example
 * console.log(_$.decurr("déjà vu")); // "deja vu"
 * @param {String} str The string to use.
 */
export let deburr = (str = req("string", "string")) =>
	str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

/**
 * Removes tags from the HTML string specified.
 * @function
 * @memberOf string
 * @param {String} html The string of HTML to remove tags from.
 * @example
 * console.log(_$.removeTags("<div>Hello</div>")); // "Hello"
 * @returns {String} THe string of HTML without the tags.
 */
export let removeTags = (html = req("string", "html string")) =>
	html.replace(/<[^>]*>/g, "");

/**
 * Speaks the text given.
 * @memberOf string
 * @function
 * @param {String} text The text to split
 * @param {String} [lang=en-US] The language to speak with.
 * @param {Number} [volume=1] The volume
 * @param {String|Number} [voice=1] The voice to use.
 * @param {Number} [pitch=1] The pitch
 * @param {Number} [volume=1] The volume
 * @param {Number} [rate=1] The speed.
 * @example
 * _$.speak("Bijou is awesome!"); // speaks "Bijou is awesome!"
 * @returns {SpeechSynthesisUtterance} The SpeechSynthesisUtterance
 */
export let speak = (
	text = req("string", "text"),
	lang = "en",
	volume = 1,
	voice = 1,
	pitch = 1,
	rate = 1,
) => {
	var msg = new SpeechSynthesisUtterance();
	var voices = window.speechSynthesis.getVoices();
	let def = voices.filter((c) => c.default);
	msg.voice = voice
		? typeof voice === "number"
			? voices[voice]
			: voice
		: def;
	msg.volume = volume; // From 0 to 1
	msg.rate = rate; // From 0.1 to 10
	msg.pitch = pitch; // From 0 to 2
	msg.text = text;
	msg.lang = lang;
	window.speechSynthesis.speak(msg);
	return msg;
};
/**
 * Returns the last space in the string given replaced with "&nbsp;"
 * @function
 * @memberOf string
 * @param {String} text The string to replace
 * @example
 * document.querySelector("h1").innerHTML = _$.widows(document.querySelector("h1").innerHTML);
 * //Replaces the last space in the <h1>'s innerText with "&nbsp;"
 * @returns {String} The replaced string.
 */
export let widows = (text = req("string", "text")) => {
	var wordArray = text.split(" ");
	var finalTitle = "";
	for (var i = 0; i <= wordArray.length - 1; i++) {
		finalTitle += wordArray[i];
		if (i == wordArray.length - 2) {
			finalTitle += "&nbsp;";
		} else {
			finalTitle += " ";
		}
	}
	return finalTitle;
};

/**
 * Undoes camelCase.
 * @function
 * @memberOf string
 * @param {String} str The string to unCamelCase.
 * @example
 * console.log(_$.unCamelCase("helloWorld")); // "Hello World"
 * @returns {String} The string of unCamelCased code.
 */
export let unCamelCase = function (str = req("string", "string")) {
	return str
		.replace(/([a-z])([A-Z])/g, "$1 $2")
		.replace(/\b([A-Z]+)([A-Z])([a-z])/, "$1 $2$3")
		.replace(/^./, function (s) {
			return s.toUpperCase();
		});
};

/**
 * camelCases a string.
 * @function
 * @memberOf string
 * @param {String} str The string of non-camelCased text.
 * @example
 * console.log(_$.camelCase("Hello world")); // "helloWorld"
 * @returns {String} The camelCased string.
 */
export let camelCase = (str = req("string", "string")) => {
	return str
		.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
			return index === 0 ? word.toLowerCase() : word.toUpperCase();
		})
		.replace(/\s+/g, "");
};
/**
 * Scrambles the order of characters in a string. Thanks to @\Touchcreator for the suggestion for this.
 * @function
 * @memberOf string
 * @param {String} str The string to be scrambled
 * @example
 * console.log(_$.scrambleString("Hello world")); // e.g. "owllH rdloe"
 * @returns {String} The scrambled text.
 */
export let scrambleString = (str = req("string")) => {
	var a = str.split(""),
		n = a.length;

	for (var i = n - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var tmp = a[i];
		a[i] = a[j];
		a[j] = tmp;
	}
	return a.join("");
};
/**
 * Hashes a string to a unique integer (This cannot be decrypted easily).
 * @function
 * @memberOf string
 * @param {String} str The String to hash.
 * @param {Number} [seed=0] The seed of the hash.
 * @example
 * console.log(_$.hashString("Hello world")); // 3494146707865688
 * @returns {Number} The hashed string.
 */
export let hashString = (str = req("string"), seed = 0) => {
	let h1 = 0xdeadbeef ^ seed,
		h2 = 0x41c6ce57 ^ seed;
	for (let i = 0, ch; i < str.length; i++) {
		ch = str.charCodeAt(i);
		h1 = Math.imul(h1 ^ ch, 2654435761);
		h2 = Math.imul(h2 ^ ch, 1597334677);
	}
	h1 =
		Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
		Math.imul(h2 ^ (h2 >>> 13), 3266489909);
	h2 =
		Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
		Math.imul(h1 ^ (h1 >>> 13), 3266489909);
	return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

/**
 * Gets the edit distance between two strings.
 * @function
 * @memberOf string
 * @param {String} a The first string
 * @param {String} b The seconds string
 * @example
 * console.log(_$.editDistance("hello", "Hello")); // 1
 * @returns {Number} The edit distance between two strings
 */
export let editDistance = (
	a = req("string", "string 1"),
	b = req("string", "string 2"),
) => {
	if (a.length == 0) return b.length;
	if (b.length == 0) return a.length;

	var matrix = [];

	// increment along the first column of each row
	var i;
	for (i = 0; i <= b.length; i++) {
		matrix[i] = [i];
	}

	// increment each column in the first row
	var j;
	for (j = 0; j <= a.length; j++) {
		matrix[0][j] = j;
	}

	// Fill in the rest of the matrix
	for (i = 1; i <= b.length; i++) {
		for (j = 1; j <= a.length; j++) {
			if (b.charAt(i - 1) == a.charAt(j - 1)) {
				matrix[i][j] = matrix[i - 1][j - 1];
			} else {
				matrix[i][j] = Math.min(
					matrix[i - 1][j - 1] + 1, // substitution
					Math.min(
						matrix[i][j - 1] + 1, // insertion
						matrix[i - 1][j] + 1,
					),
				); // deletion
			}
		}
	}

	return matrix[b.length][a.length];
};
/**
 * Returns the size of a string in bytes.
 * @function
 * @memberOf string
 * @param {String} str
 * @example
 * console.log(_$.byteSize("Hello world")); 11
 * @returns {Number} The byte size of the string.
 */
export let byteSize = (str = req("string", "string")) =>
	new Blob([str]).size;

/**
 * Finds and replace multiple values with multiple other values.
 * @function
 * @memberOf string
 * @param {String} text The text to operate the replace on.
 * @param {Object} replace The object with find and replace values.
 * @example
 * _$.replaceMultiple("I have a cat, a dog, and a goat.", {dog: "cat", goat: "dog", cat: "goat"});//Returns "I have a goat, a cat and a dog"
 * @returns {String} The replaced string
 */
export let replaceMultiple = (
	text = req("string", "text"),
	replace = req("object", "replace key pairs"),
) => {
	var re = new RegExp(Object.keys(replace).join("|"), "gi");
	text = text.replace(re, function (matched) {
		return mapObj[matched];
	});
	return text;
};
/**
 * Returns the queries from a given url (Or just the current url)
 * @function
 * @memberOf string
 * @param {String} query The url query to get.
 * @param {String} [url=window.location.href] The url to find the query in. (By default this is the current url)
 * @example
 * // If the website adress of the current page was "https://example.com/?q=hello&hello=world"
 * console.log(_$.urlQuery("hello")); // "world"
 * // Or on a custom url:
 * console.log(_$.urlQuery("q", "https://google.com/search?q=something")); // "something"
 * @returns {String} The url query
 */
export let urlQuery = (
	query = req("string", "query"),
	url = window.location.href,
) => {
	query = query.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp(`[?&]${query}(=([^&#]*)|&|#|$)`),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return "";
	return decodeURIComponent(results[2].replace(/\+/g, " "));
};

/**
 * Sanitizes an HTML string. It is quite possible that this is not production ready so use with caution. (I did my best though >=( )
 * @function
 * @memberOf string
 * @param {String} html The input string to sanitize.
 * @param {Array} [tags=undefined] The array of tags to allow, there is a default list though.
 * @param {Array} [attributes=undefined] The array of attributes to allow. By default only allows "href" and "src" attributes.
 * @example
 * console.log(_$.sanitizeHTML("<script>alert('hello')></script><b>A normal tag</b>")); // "<b>A normal tag</b>"
 * @returns {String} The sanitized HTML string.
 */
export let sanitize = (
	html = req("string", "input html"),
	tags = undefined,
	attributes = undefined,
) => {
	node();
	var attributes = attributes || [
		{ attribute: "src", tags: "*", regex: /^(?:https|http|\/\/):/ },
		{ attribute: "href", tags: "*", regex: /^(?:https|http|\/\/):/ },
		{ attribute: "width", tags: "*", regex: /^[0-9]+$/ },
		{ attribute: "height", tags: "*", regex: /^[0-9]+$/ },
		{ attribute: "id", tags: "*", regex: /^[a-zA-Z]+$/ },
		{ attribute: "class", tags: "*", regex: /^[a-zA-Z ]+$/ },
		{
			attribute: "value",
			tags: ["INPUT", "TEXTAREA"],
			regex: /^.+$/,
		},
		{
			attribute: "checked",
			tags: ["INPUT"],
			regex: /^(?:true|false)+$/,
		},
		{
			attribute: "placeholder",
			tags: ["INPUT", "TEXTAREA"],
			regex: /^.+$/,
		},
		{
			attribute: "alt",
			tags: ["IMG", "AREA", "INPUT"],
			//"^" and "$" match beggining and end
			regex: /^[0-9a-zA-Z]+$/,
		},
		{
			attribute: "autofocus",
			tags: ["INPUT"],
			regex: /^(?:true|false)+$/,
		},
		{
			attribute: "for",
			tags: ["LABEL", "OUTPUT"],
			regex: /^[a-zA-Z0-9]+$/,
		},
	];
	var tags = tags || [
		"I",
		"P",
		"B",
		"BODY",
		"HTML",
		"DEL",
		"INS",
		"STRONG",
		"SMALL",
		"A",
		"IMG",
		"CITE",
		"FIGCAPTION",
		"ASIDE",
		"ARTICLE",
		"SUMMARY",
		"DETAILS",
		"NAV",
		"TD",
		"TH",
		"TABLE",
		"THEAD",
		"TBODY",
		"NAV",
		"SPAN",
		"BR",
		"CODE",
		"PRE",
		"BLOCKQUOTE",
		"EM",
		"HR",
		"H1",
		"H2",
		"H3",
		"H4",
		"H5",
		"H6",
		"DIV",
		"MAIN",
		"HEADER",
		"FOOTER",
		"SELECT",
		"COL",
		"AREA",
		"ADDRESS",
		"ABBR",
		"BDI",
		"BDO",
	];

	attributes = attributes.map((el) => {
		if (typeof el === "string") {
			return { attribute: el, tags: "*", regex: /^.+$/ };
		}
		let output = el;
		if (!el.hasOwnProperty("tags")) {
			output.tags = "*";
		}
		if (!el.hasOwnProperty("regex")) {
			output.regex = /^.+$/;
		}
		return output;
	});
	var el = new DOMParser().parseFromString(html, "text/html");
	var elements = el.querySelectorAll("*");
	for (let i = 0; i < elements.length; i++) {
		const current = elements[i];
		let attr_list = get_attributes(current);
		for (let j = 0; j < attr_list.length; j++) {
			const attribute = attr_list[j];
			if (!attribute_matches(current, attribute)) {
				current.removeAttribute(attr_list[j]);
			}
		}
		if (!tags.includes(current.tagName)) {
			current.remove();
		}
	}
	return el.documentElement.innerHTML;
	function attribute_matches(element, attribute) {
		let output = attributes.filter((attr) => {
			let returnval =
				attr.attribute === attribute &&
				(attr.tags === "*" || attr.tags.includes(element.tagName)) &&
				attr.regex.test(element.getAttribute(attribute));
			return returnval;
		});

		return output.length > 0;
	}
	function get_attributes(element) {
		for (
			var i = 0, atts = element.attributes, n = atts.length, arr = [];
			i < n;
			i++
		) {
			arr.push(atts[i].nodeName);
		}
		return arr;
	}
};
/**
 * Converts markdown to HTML.
 * @param {String} src The markdown to convert to HTML.
 * @memberOf string
 * @function
 * @example
 * console.log(_$.markdownToHTML("_Italic text_, **bold text**")); // "<em>Italic text</em>, <b>bold text</b>"
 * @returns {String} The string of HTML converted from the markdown input.
 */
export let markdownToHTML = (src = req("string", "input")) => {
	var rx_lt = /</g;
	var rx_gt = />/g;
	var rx_space = /\t|\r|\uf8ff/g;
	var rx_escape = /\\([\\\|`*_{}\[\]()#+\-~])/g;
	var rx_hr = /^([*\-=_] *){3,}$/gm;
	var rx_blockquote = /\n *&gt; *([^]*?)(?=(\n|$){2})/g;
	var rx_list = /\n( *)(?:[*\-+]|((\d+)|([a-z])|[A-Z])[.)]) +([^]*?)(?=(\n|$){2})/g;
	var rx_listjoin = /<\/(ol|ul)>\n\n<\1>/g;
	var rx_highlight = /(^|[^A-Za-z\d\\])(([*_])|(~)|(\^)|(--)|(\+\+)|`)(\2?)([^<]*?)\2\8(?!\2)(?=\W|_|$)/g;
	var rx_code = /\n((```|~~~).*\n?([^]*?)\n?\2|(( {4}.*?\n)+))/g;
	var rx_link = /((!?)\[(.*?)\]\((.*?)( ".*")?\)|\\([\\`*_{}\[\]()#+\-.!~]))/g;
	var rx_table = /\n(( *\|.*?\| *\n)+)/g;
	var rx_thead = /^.*\n( *\|( *\:?-+\:?-+\:? *\|)* *\n|)/;
	var rx_row = /.*\n/g;
	var rx_cell = /\||(.*?[^\\])\|/g;
	var rx_heading = /(?=^|>|\n)([>\s]*?)(#{1,6}) (.*?)( #*)? *(?=\n|$)/g;
	var rx_para = /(?=^|>|\n)\s*\n+([^<]+?)\n+\s*(?=\n|<|$)/g;
	var rx_stash = /-\d+\uf8ff/g;

	function replace(rex, fn) {
		src = src.replace(rex, fn);
	}

	function element(tag, content) {
		return "<" + tag + ">" + content + "</" + tag + ">";
	}

	function blockquote(src) {
		return src.replace(rx_blockquote, function (all, content) {
			return element(
				"blockquote",
				blockquote(highlight(content.replace(/^ *&gt; */gm, ""))),
			);
		});
	}

	function list(src) {
		return src.replace(
			rx_list,
			function (all, ind, ol, num, low, content) {
				var entry = element(
					"li",
					highlight(
						content
							.split(
								RegExp(
									"\n ?" +
										ind +
										"(?:(?:\\d+|[a-zA-Z])[.)]|[*\\-+]) +",
									"g",
								),
							)
							.map(list)
							.join("</li><li>"),
					),
				);

				return (
					"\n" +
					(ol
						? '<ol start="' +
						  (num
								? ol + '">'
								: parseInt(ol, 36) -
								  9 +
								  '" style="list-style-type:' +
								  (low ? "low" : "upp") +
								  'er-alpha">') +
						  entry +
						  "</ol>"
						: element("ul", entry))
				);
			},
		);
	}

	function highlight(src) {
		return src.replace(
			rx_highlight,
			function (all, _, p1, emp, sub, sup, small, big, p2, content) {
				return (
					_ +
					element(
						emp
							? p2
								? "strong"
								: "em"
							: sub
							? p2
								? "s"
								: "sub"
							: sup
							? "sup"
							: small
							? "small"
							: big
							? "big"
							: "code",
						highlight(content),
					)
				);
			},
		);
	}

	function unesc(str) {
		return str.replace(rx_escape, "$1");
	}

	var stash = [];
	var si = 0;

	src = "\n" + src + "\n";

	replace(rx_lt, "&lt;");
	replace(rx_gt, "&gt;");
	replace(rx_space, "  ");

	// blockquote
	src = blockquote(src);

	// horizontal rule
	replace(rx_hr, "<hr/>");

	// list
	src = list(src);
	replace(rx_listjoin, "");

	// code
	replace(rx_code, function (all, p1, p2, p3, p4) {
		stash[--si] = element(
			"pre",
			element("code", p3 || p4.replace(/^ {4}/gm, "")),
		);
		return si + "\uf8ff";
	});

	// link or image
	replace(rx_link, function (all, p1, p2, p3, p4, p5, p6) {
		stash[--si] = p6
			? p6
			: p2
			? p4
				? '<img src="' +
				  _$.escapeHTML(p4) +
				  '" alt="' +
				  _$.escapeHTML(p3) +
				  '"/>'
				: p1
			: /^https?:\/\//g.test(p4)
			? '<a href="' +
			  _$.escapeHTML(p4) +
			  '">' +
			  unesc(highlight(p3)) +
			  "</a>"
			: p1;
		return si + "\uf8ff";
	});

	// table
	replace(rx_table, function (all, table) {
		var sep = table.match(rx_thead)[1];
		return (
			"\n" +
			element(
				"table",
				table.replace(rx_row, function (row, ri) {
					return row == sep
						? ""
						: element(
								"tr",
								row.replace(rx_cell, function (all, cell, ci) {
									return ci
										? element(
												sep && !ri ? "th" : "td",
												unesc(highlight(cell || "")),
										  )
										: "";
								}),
						  );
				}),
			)
		);
	});

	// heading
	replace(rx_heading, function (all, _, p1, p2) {
		return _ + element("h" + p1.length, unesc(highlight(p2)));
	});

	// paragraph
	replace(rx_para, function (all, content) {
		return element("p", unesc(highlight(content)));
	});

	// stash
	replace(rx_stash, function (all) {
		return stash[parseInt(all)];
	});

	return src.trim();
};

/**
 * Counts the syllables in the word given.
 * @memberOf string
 * @function
 * @param {String} word The word to count syllables of
 * @example
 * console.log(_$.syllables("Hello")); // 2
 * @returns {Number} The number of syllables in the specified word.
 */
export let syllables = (word = req("string", "word")) => {
	word = word.toLowerCase();
	var t_some = 0;
	if (word.length > 3) {
		if (word.substring(0, 4) == "some") {
			word = word.replace("some", "");
			t_some++;
		}
	}
	word = word.replace(/(?:[^laeiouy]|ed|[^laeiouy]e)$/, "");
	word = word.replace(/^y/, "");
	var syl = word.match(/[aeiouy]{1,2}/g);
	console.log(syl);
	if (syl) {
		return syl.length + t_some;
	}
};
/**
 * Converts a string to title case
 * @memberOf string
 * @function
 * @param {String} str The string to convert to title case.
 * @example
 * _$.titleCase("hello world");//Returns "Hello World"
 * @returns {String} The string in title case.
 */
export let titleCase = (str = req("string", "string")) =>
	str
		.toLowerCase()
		.split(" ")
		.map((word, index) =>
			[
				"at",
				"by",
				"for",
				"in",
				"of",
				"off",
				"on",
				"out",
				"to",
				"up",
				"as",
				"if",
				"but",
				"per",
				"via",
				"for",
				"and",
				"nor",
				"but",
				"or",
				"yet",
				"so",
				"the",
				"a",
				"an",
			].includes(word) && index != 0
				? word
				: String.fromCodePoint(word.codePointAt(0)).toUpperCase() +
				  word.slice(word.codePointAt(0) > 0xffff ? 2 : 1),
		)
		.join(" ");
/**
 * Capitalizes the first letter of the string
 * @memberOf string
 * @function
 * @param {String} str The string to capitalize.
 * @example
 * console.log(_$.capitalize("hello world")); // "Hello world"
 * @returns {String} The capitalized string.
 */
export let capitalize = (str = req("string", "string")) =>
	String.fromCodePoint(str.codePointAt(0)).toUpperCase() +
	str.slice(str.codePointAt(0) > 0xffff ? 2 : 1);
/**
 * Replaces between two indexes of a string.
 * @memberOf string
 * @function
 * @example
 * console.log(_$.replaceBetween("Hello world", 6, 11, "earthlings")); // "Hello earthlings"
 * @param {String} string The string to operate on.
 * @param {Number} start The start index
 * @param {Number} end The end index
 * @param {String} what What to replace with.
 * @returns {String} The replaced string
 */
export let replaceBetween = (
	string = req("string", "string"),
	start = req("number", "start"),
	end = req("number", "end"),
	what = req("string", "replace with"),
) => string.substring(0, start) + what + string.substring(end);
/**
 * Escapes a string of HTML
 * @function
 * @memberOf string
 * @param {String} str The string of HTML to escape.
 * @example
 * console.log(_$.escapeHTML("<div>")); // "&lt;div&gt;"
 * @returns {String} The escaped HTML.
 */
export let escapeHTML = (str = req("string")) =>
	str.replace(
		/[&<>'"]/g,
		(tag) =>
			({
				"&": "&amp;",
				"<": "&lt;",
				">": "&gt;",
				"'": "&#39;",
				'"': "&quot;",
			}[tag] || tag),
	);
/**
 * Unescapes a string of HTML
 * @function
 * @memberOf string
 * @param {String} str The string of HTML to unescape.
 * @example
 * console.log(_$.unescapeHTML("&lt;div&gt;")); // "<div>"
 * @returns {String} The unescaped HTML.
 */
export let unescapeHTML = (str = req("string")) =>
	str.replace(
		/&amp;|&lt;|&gt;|&#39;|&quot;/g,
		(tag) =>
			({
				"&amp;": "&",
				"&lt;": "<",
				"&gt;": ">",
				"&#39;": "'",
				"&quot;": '"',
			}[tag] || tag),
	);
/**
 * Returns the previous page that the user visited.
 * @function
 * @memberOf string
 * @example
 * console.log(_$.previousPage()); // e.g. "https://bijou.js.org"
 * @returns {String} The url of the previous page the user visited.
 */
export let previousPage = () => {
	node();
	return document.referrer || window.location.href;
};
//#endregion String
//#region Utility
export let preload = {
	init: () => {
		//Set window.load and window.show so that the child iframe element can access those functions.
		window.load = load;
		window.show = show;
		//Convert all links to preload on hover.
		[...document.querySelectorAll("a")].forEach((a) => {
			a.addEventListener("click", (e) => {
				e.preventDefault();
				show(a.href);
			});
			a.addEventListener("mouseenter", (e) => {
				//you could alter this function so that it would preload if the mouse is close, or if the user has hovered for 200ms or more, but just onmouseenter is enough for this example.
				load(a.href);
			});
		});
	},
	load: function load(page) {
		//Return a promise fulfilled once the iframe loads, so that we can await load("page") in show("url") if the page isn't loaded already.
		return new Promise((res) => {
			//If page is external don't load it, history.pushState only works with internal URLs.
			if (!isLocal(page)) return;
			//Don't load it twice.
			if (document.getElementById(id(page))) return;
			//Create an iframe
			var iframe = document.createElement("iframe");
			iframe.src = page;
			//Add it to the document
			document.documentElement.appendChild(iframe);
			//Set a unique ID.
			iframe.id = id(page);
			//And add the preload class so it's easy to remove all iframes.
			iframe.classList.add("preload");
			iframe.onload = res; //Return promise once loaded
			//Make it fill the window, but with display: none
			_$.addStyles(iframe, {
				background: "transparent",
				width: "100vw",
				height: "100vh",
				padding: "0",
				margin: "0",
				display: "none",
				border: "none",
			});
		});
		function id(page) {
			//This function gets a unique id from a page that works with CSS id standards.
			//E.g. "#/page" is not a valid ID.
			return `preload_${hash(page).toString(16)}`;
		}
		function isLocal(page) {
			//Tests if a page is local
			try {
				//If the page doesn't start with "http" or "https" then it's definitely local.
				if (
					!(page.startsWith("http://") || page.startsWith("https://"))
				)
					return true;
				//If it does start with "http" or "https" we need to see if the hostname (domain) is the same as the one of the current page, so we compare the window.location.hostname with that parsed from the input URL.
				return new URL(page).hostname === window.location.hostname;
			} catch (e) {
				//Invalid url maybe?
				// mailto:someone@somewhere.com will cause an error above.
				return false;
			}
		}
		function hash(str, seed = 0) {
			// I could've done without the hash function, but hash functions are cool. So why not.
			let h1 = 0xdeadbeef ^ seed,
				h2 = 0x41c6ce57 ^ seed;
			for (let i = 0, ch; i < str.length; i++) {
				ch = str.charCodeAt(i);
				h1 = Math.imul(h1 ^ ch, 2654435761);
				h2 = Math.imul(h2 ^ ch, 1597334677);
			}
			h1 =
				Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
				Math.imul(h2 ^ (h2 >>> 13), 3266489909);
			h2 =
				Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
				Math.imul(h1 ^ (h1 >>> 13), 3266489909);
			return 4294967296 * (2097151 & h2) + (h1 >>> 0);
		}
	},
	show: async function show(page) {
		if (!isLocal(page)) {
			//Actually navigate to the page if it's not local, e.g. show('https://google.com') would just go to google.com
			window.location.href = page;
			//Stop the rest of the function.
			return;
		}
		//If the page isn't already loaded then load it.
		if (!document.getElementById(id(page))) {
			await _$.preload.load(page);
		}
		//Update URL
		//This step is the reason why this won't work with external URLs.
		history.pushState({}, page, page);
		//If there's current information on the page remove it.
		//This translates into "if (document.body) document.body.remove()" but it's nicer.
		document.body && document.body.remove();
		let ifr = document.getElementById(id(page));
		//Show the iframe.
		ifr.style.display = "block";
		//Get the content document of the iframe
		let doc = ifr.contentDocument;
		//For each element in the iframe make it prevent default on click, and preload on hover.
		Array.from(doc.querySelectorAll("a")).forEach((a) => {
			a.addEventListener("click", (e) => {
				//Prevent default navigation.
				e.preventDefault();
				//Call the parent window (main window's) show function and remove the current iframe
				_$.preload.show.call(window.parent, a.href);
				ifr.remove();
			});
			a.addEventListener("mouseenter", (e) => {
				//Preload the page.
				_$.preload.load.call(window.parent, a.href);
			});
		});
		function id(page) {
			//This function gets a unique id from a page that works with CSS id standards.
			//E.g. "#/page" is not a valid ID.
			return `preload_${hash(page).toString(16)}`;
		}
		function isLocal(page) {
			//Tests if a page is local
			try {
				//If the page doesn't start with "http" or "https" then it's definitely local.
				if (
					!(page.startsWith("http://") || page.startsWith("https://"))
				)
					return true;
				//If it does start with "http" or "https" we need to see if the hostname (domain) is the same as the one of the current page, so we compare the window.location.hostname with that parsed from the input URL.
				return new URL(page).hostname === window.location.hostname;
			} catch (e) {
				//Invalid url maybe?
				// mailto:someone@somewhere.com will cause an error above.
				return false;
			}
		}
		function hash(str, seed = 0) {
			// I could've done without the hash function, but hash functions are cool. So why not.
			let h1 = 0xdeadbeef ^ seed,
				h2 = 0x41c6ce57 ^ seed;
			for (let i = 0, ch; i < str.length; i++) {
				ch = str.charCodeAt(i);
				h1 = Math.imul(h1 ^ ch, 2654435761);
				h2 = Math.imul(h2 ^ ch, 1597334677);
			}
			h1 =
				Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
				Math.imul(h2 ^ (h2 >>> 13), 3266489909);
			h2 =
				Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
				Math.imul(h1 ^ (h1 >>> 13), 3266489909);
			return 4294967296 * (2097151 & h2) + (h1 >>> 0);
		}
	},
};
/**
 * Creates a template literal tag. Read more here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates
 * @example
 * let t = tag(_$.escapeHTML);
 * //Notice the "t" at the beginning of the template literal. (t`Some text`).
 * console.log(t`This will not be escaped <i>Italics!</i> ${"But this will, <i>Not italic</i>"}`)
 * @param {Function} k The function to run on new (interpolated) text in the template literal.
 * @param {Function} o The function to run on the normal text in the template literal.
 * @returns {Function} A template literal tagging function, which returns a string.
 */
export let tag = (k = (j) => j, o = (j) => j) => {
	return (old, ...int) => {
		let n = [];
		int.push("");
		for (let i = 0; i < old.length; i++) {
			n.push(o(old[i]), k(int[i]));
		}
		return n.join("");
	};
};
/**
 * Resizes an image from a URL and returns a promise with it's data URL.
 * @memberOf utility
 * @function
 * @param {String} url The URL of the image to resize.
 * @param {Number} [width=Natural width of the image] The target width of the new image
 * @param {Number} [height=Natural width of the image] The target height of the new image
 * @returns {Promise.<string>} A data URL of the resized image.
 */
export let resize = async (
	url = req("string", "html"),
	width,
	height,
) => {
	node();
	url = url.replace(/^(?:http|https)\:\/\//, "");
	let img = new Image();
	img.src = await _$.imageToData(
		"https://cors.explosionscratc.repl.co/" + url,
	);
	await new Promise((res) => (img.onload = res));
	let canvas = document.createElement("canvas");
	let ctx = canvas.getContext("2d");
	canvas.width = width < 1 || !width ? img.width : width;
	canvas.height = height < 1 || !width ? img.height : height;
	ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
	let data = canvas.toDataURL(0, 0, canvas.width, canvas.height);
	return data;
};
/**
 * Converts a string of HTML to an image (!!)
 * @memberOf utility
 * @function
 * @param {String} html The HTML string to transform into an image
 * @param {Object.<string>} [opts={x: 0, y: 0, width: 300, height: 400}] The object with options.
 * @param {Number} [opts.x=0] The x position of the text
 * @param {Number} [opts.y=0] The y position of the text
 * @param {Number} [opts.width=300] The width of the output image.
 * @param {Number} [opts.height=400]  The height of the output image.
 * @returns {Promise.<string>} A promise that resolves into the data URL string of the image.
 */
export let htmlToImage = (
	html = req("string", "html string"),
	{ x = 0, y = 0, width = 300, height = 400 } = {},
) => {
	node();
	let canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	var ctx = canvas.getContext("2d");
	return new Promise((res) => {
		var xml = toXML(html);
		xml = xml.replace(/\#/g, "%23");
		var data = `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><foreignObject width="100%" height="100%">${xml}</foreignObject></svg>`;

		var img = new Image();
		img.onload = function () {
			ctx.drawImage(img, x, y, width, height);
			res(canvas.toDataURL());
		};
		img.src = data;
	});
	function toXML(html) {
		var doc = document.implementation.createHTMLDocument("");
		doc.write(html);
		doc.documentElement.setAttribute(
			"xmlns",
			doc.documentElement.namespaceURI,
		);
		html = new XMLSerializer().serializeToString(doc.body);
		return html;
	}
};

/**
 * Converts a function that returns a promise into a callback based function
 * @param {Function} fn The function to 'callbackify'.
 * @memberOf utility
 * @function
 * @returns {Function} The callback based function.
 * @example
 * let getUUID = _$.callbackify((limit) =>
 *    fetch(
 *        `https://apis.explosionscratc.repl.co/uuid?limit=1${escape(parseInt(limit))}`
 *    ).then(res => res.json()));
 *
 * getUUID(console.log, 500);//Get 500 uuid's from my API and log them to the console.
 */
let callbackify = (fn = req("function", "function")) => (
	callback,
	...args
) =>
	fn(...args)
		.then(callback)
		.catch(errCallback);
/**
 * Promisifies a function by converting a callback based function to return a promise.
 * (assuming argIndex = -1)
 * @param {Function} fn The function to run.
 * @param {Number} [argIndex=0] The index of the argument that is the callback returned by the function.
 * @returns {Function} The function promisified (now returns a promise).
 * @memberOf utility
 * @function
 * @example
 * let time = _$.promisify(setTimeout);
 * (async () => {
 * 	await time(2000);
 * 	console.log("It's been 2 seconds.")
 * })();
 */
let promisify = (fn = req("function"), argIndex = 0) => {
	return (...args) =>
		new Promise((resolve, reject) => {
			try {
				args.splice(argIndex, 0, resolve);
				fn(...args);
			} catch (e) {
				reject(e);
			}
		});
};
/**
 * Times out a promise after a specified number of milliseconds.
 * @memberOf utility
 * @function
 * @returns {Promise} The promise that was inputted, but will time out after a specified time.
 * @example
 * //Attempts to fetch the date from jsontest.com, if the request is still pending after 2000 milliseconds cancel it and throw an error.
 * let fetch_stuff = fetch("http://date.jsontest.com/");
 * _$.race(fetch_stuff, 2000).then((res) => res.json()).then(console.log).catch(console.error)
 * @example
 * //Load my popup library, then prompt using it and after 4 seconds close and remove the popup.
 * (async () => {
 *  //Load the script, but check for duplicates! ;)
 * 	await _$.loadScript("https://cdn.jsdelivr.net/gh/explosion-scratch/popup/popup.js", {}, true);
 * 	_$.race(prompt("Enter something in the next 4 seconds!"), 4000).then(console.log).catch(() => {
 * 		document.querySelector("#popup").remove();
 * 		document.querySelector("#popup-bg").remove();
 * 		console.log("User could not type fast enough -__-")
 * 	})
 * });
 * @param {Function} fn The function to run that should return a promise, or the promise itself.
 * @param {Number} timeout The timeout to cancel after.
 * @param {Function} calcelCb The callback to run when cancelled, defaults to throwing an error.
 */
export let race = (
	fn = req("function"),
	timeout = req("number", "timeout"),
	cancelCb = undefined,
) => {
	return Promise.race([
		typeof fn === "function" ? fn() : fn,
		new Promise((_, reject) =>
			setTimeout(
				() =>
					cancelCb
						? cancelCb
						: reject(
								new Error(
									"Promise timed out (Bijou.js _$.race function)",
								),
						  ),
				timeout,
			),
		),
	]);
};
/**
 * Gets the type of something. This is more specific than the 'typeof' operator.
 * @memberof utility
 * @function
 * @example
 * _$.typeof("This is a string");//"String"
 * typeof "This is a string";//Also string
 * @example
 * _$.typeof(/^[regex]$/i);//"RegExp".
 * typeof /^[regex]$/i;//"object"
 * @example
 * _$.typeof(new Date());//"Date"
 * typeof new Date();//Object -__-
 * @param {*} e The thing to get the type of.
 * @param {Boolean} lowerCase Whether to return the string lowercased or not.
 */
export let typeOf = (e = req("any", "any"), lowerCase = true) =>
	lowerCase
		? Object.prototype.toString
				.call(e)
				.split(" ")[1]
				.replace(/]$/, "")
				.toLowerCase()
		: Object.prototype.toString
				.call(e)
				.split(" ")[1]
				.replace(/]$/, "");
/**
 * Injects CSS into the document head.
 * @memberOf utility
 * @function
 * @example
 * //Makes the body's background a dark charcoal color.
 * _$.injectCSS("body {background: #101010; color: white;}");
 * @example
 * //Set the text color to an appropriate color depending on the background color of the document body:
 * if (_$.lightOrDark(_$.compStyle(document.body, "background-color")).lightOrDark === "light"){
 *    _$.injectCSS(`
 *      body {
 *        color: ${_$.lightenColor(_$.rgbToHex(_$.compStyle(document.body, "background-color")), -100)};
 *      }
 *    `)
 * } else {
 *    _$.injectCSS(`
 *      body {
 *        color: ${_$.lightenColor(_$.rgbToHex(_$.compStyle(document.body, "background-color")), 100)};
 *      }
 *    `)
 * }
 * @returns {HTMLElement} The CSS <style> element.
 * @param {String} css The CSS to inject.
 */
export let injectCSS = (css = req("string", "css")) => {
	node();
	let el = document.createElement("style");
	el.setAttribute("type", "text/css");
	el.innerText = css;
	document.head.appendChild(el);
	return el;
};
/**
 * Returns either "mobile" or "desktop" depending on which type of device the user is using.
 * @function
 * @memberOf utility
 * @param
 * @returns {String} Either "mobile" or "desktop" depending on which type of device the user is using.
 * @example
 * console.log(_$.mobileOrDesktop()); // e.g. "desktop"
 */
export let mobileOrDesktop = () => {
	node();
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent,
	)
		? "mobile"
		: "desktop";
};
/**
 * Plays a section of an audio file.
 * @param {HTMLMediaElement} audioObj The audio object to play. (Needs to be created from "new Audio()")
 * @param {Number} start The time to start playing.
 * @param {Number} stop The time to stop playing.
 * @memberOf utility
 * @function
 * @example
 * _$.playSection(new Audio("file.mp3"), 5, 20.5); // Plays file.mp3, starting with second 5 and ending at 20.5 seconds into the file.
 * @returns {Audio} The audio object first passed.
 */
export let playSection = (
	audioObj = req("HTMLMediaElement", "audio"),
	start = req("number", "start"),
	stop = req("number", "stop"),
) => {
	let audioObjNew = audioObj.cloneNode(true); //this is to prevent "play() request was interrupted" error.
	audioObjNew.currentTime = start;
	audioObjNew.play();
	audioObjNew.int = setInterval(function () {
		if (audioObjNew.currentTime > stop) {
			audioObjNew.pause();
			clearInterval(audioObjNew.int);
		}
	}, 10);
	return audioObjNew;
};
/**
 * Formats a string of HTML using indents. Note that this does not format CSS or JS in the HTML.
 * @memberOf utility
 * @function
 * @param {String} html The string of HTML to format.
 * @example
 * console.log(_$.formatHTML("<h1>moo</h1><div id="hi">hello <span>world</span></div>"));
 * Logs the following to the console:
 * ```
   <h1>moo</h1>
   <div id='hi'>hello <span>world</span>
   </div>
   ```
 * @returns {String} The formatted string of HTML.
 */
export let formatHTML = (html = req("string", "html")) => {
	var tab = "\t";
	var result = "";
	var indent = "";

	html.split(/>\s*</).forEach(function (element) {
		if (element.match(/^\/\w/)) {
			indent = indent.substring(tab.length);
		}

		result += indent + "<" + element + ">\r\n";

		if (
			element.match(/^<?\w[^>]*[^\/]$/) &&
			!element.startsWith("input")
		) {
			indent += tab;
		}
	});

	return result.substring(1, result.length - 3);
};
/**
 * Gets JSON from a URL and performs a callback with it.
 * @function
 * @memberOf utility
 * @param {String} url The url of the JSON to be fetched.
 * @param {Function} callback The function to be run with the JSON code.
 * @example
 * _$.getJSON("http://date.jsontest.com/", (json) => {alert("The current time is " + json.time)})
 * @returns {Promise} A promise resolved when the JSON is fetched and parsed.
 */
export let getJSON = (
	url = req("string", "url"),
	callback = () => {},
) => {
	node();
	return new Promise((resolve, reject) => {
		fetch(url)
			.then((res) => res.json())
			.then((json) => {
				callback(json);
				resolve(json);
			})
			.catch((error) => {
				reject(error);
				throw new Error(error.stack);
			});
	});
};
/**
 * Gets HTML from a URL and performs a callback with it.
 * @function
 * @memberOf utility
 * @param {String} url The url of the HTML to be fetched.
 * @param {Function} callback The function to be run with the HTML code.
 * @example
 * // Logs the HTML of wikipedia.org to the console.
 * _$.getHTML("https://wikipedia.org", (html) => console.log(html));
 * @returns {Promise} A promise resolved when the HTML is fetched and parsed.
 */
export let getHTML = (
	url = req("string", "url"),
	callback = () => {},
) => {
	node();
	return new Promise((resolve, reject) => {
		fetch(url)
			.then((res) => res.text())
			.then((html) => {
				callback(_$.parseHTML(html));
				resolve(_$.parseHTML(html));
			})
			.catch((error) => {
				reject(error.stack);
				throw new Error(error.stack);
			});
	});
};

/**
 * Preloads all of the image urls given in the arguments
 * @function
 * @memberOf utility
 * @param {...String} urls The urls of the images to be preloaded.
 * @example
 * _$.preloadImage("https://unsplash.com/some_huge_image.png"); // Preloads the unsplash image "some_huge_image.png" :P
 * @returns {Array.<Image>} An array of all the Image elements created to preload.
 */
export let preloadImage = (...urls) => {
	req("string", "url arguments", ![...urls].length);
	let images = [];
	for (var i = 0; i < urls.length; i++) {
		images[i] = new Image();
		images[i].src = urls[i];
	}
	return images;
};

/**
 * Saves a blob as a file!
 * @function
 * @memberOf utility
 * @param {Blob} blob The blob to save as a file.
 * @param {String} [fileName=output.txt] The name of the output file (Must include the extension.)
 * @example
 * _$.saveBlob(new Blob(["Yay! I'm in a text file!"]), "Cool file.txt");
 * @returns {Blob} The blob saved.
 */
export let saveBlob = (
	blob = req("blob", "blob"),
	fileName = "output.txt",
) => {
	node();
	var a = document.createElement("a");
	document.body.appendChild(a);
	a.style = "display: none";

	var url = window.URL.createObjectURL(blob);
	a.href = url;
	a.download = fileName;
	a.click();
	window.URL.revokeObjectURL(url);
	return blob;
};

/**
 * Works exactly like setInterval but instead uses requestAnimationFrame.
 * @memberOf utility
 * @function
 * @param {Function} fn The function to run repeatedly every delay seconds.
 * @param {Number} delay The delay time in milliseconds to run the function.
 * @returns {Object}
 */
export let requestInterval = function (
	fn = req("function", "function"),
	delay = req("number", "delay"),
) {
	node();
	var requestAnimFrame = (function () {
			return (
				window.requestAnimationFrame ||
				function (callback) {
					window.setTimeout(callback, 1000 / 60);
				}
			);
		})(),
		start = new Date().getTime(),
		handle = {};
	function loop() {
		handle.value = requestAnimFrame(loop);
		var current = new Date().getTime(),
			delta = current - start;
		if (delta >= delay) {
			fn.call();
			start = new Date().getTime();
		}
	}
	handle.value = requestAnimFrame(loop);
	return handle;
};

/**
 * Loads a script from a url (Can be to a local file or to a url) then runs a callback once it's loaded.
 * @memberOf utility
 * @function
 * @param {String} url The url to load the script from.
 * @param {Function} callback The callback to run when the script is loaded.
 * @example
 * _$.("script.js", ()=>alert("Script loaded!"));//Loads the script from the "script.js" file
 * @returns {Promise} A promise resolved once the script is loaded.
 */
export let loadScript = (
	url = req("string", "url"),
	callback = () => {},
	options = {},
	dupeCheck = false,
) => {
	node();
	if (dupeCheck) {
		if (document.querySelector(`script[src="${url}"]`)) {
			return;
		}
	}
	return new Promise((resolve, reject) => {
		var script = document.createElement("script");
		script.type = "text/javascript";
		let keys = Object.keys(options);
		_$.each(keys, (key) => {
			script.setAttribute(key, options[key]);
		});
		if (script.readyState) {
			script.onreadystatechange = function () {
				if (
					script.readyState === "loaded" ||
					script.readyState === "complete"
				) {
					script.onreadystatechange = null;
					callback();
					resolve();
				}
			};
		} else {
			script.onload = function () {
				callback();
				resolve();
			};
		}

		script.src = url;
		document.getElementsByTagName("head")[0].appendChild(script);
	});
};

/**
 * Fetches an image and runs the callback with the data url of the image.
 * @memberOf utility
 * @function
 * @param {String} url The url of the image to load.
 * @param {Function} callback The callback function.
 * @example
 * //Replaces every image's url with its respective data url.
 * _$.each(document.querySelectorAll('img'), (img) => {
 *   _$.imageToData(img.src, (data) => {
 *    img.src = data;
 *  })
 * })
 * @returns {Promise} A promise fulfulled when the image is loaded.
 */
export let imageToData = async (
	url = req("string", "url"),
	callback = () => {},
) => {
	node();
	return new Promise(async (res, reject) => {
		let blob = await fetch(url).then((r) => r.blob());
		let dataUrl = await new Promise((resolve) => {
			let reader = new FileReader();
			reader.onload = () => resolve(reader.result);
			reader.readAsDataURL(blob);
		});
		callback(dataUrl);
		res(dataUrl);
	});
};
/**
 * A set of functions to set and modify cookies.
 * @memberOf utility
 * @Object
 * @example
 * _$.cookies.setItem("a_cookie", "Hello world!", 1); // Set a_cookie to "Hello world" and have it expire in a day.
 * @returns {Function} The function that the user wanted
 */
export let cookies = {
	/**
	 * Sets a cookie to a value
	 * @function
	 * @memberOf utility
	 * @param {String} name The name of the cookie to set
	 * @param {String} value The value of the cookie
	 * @param {Number} [days=1000] The days that the cookie should last.
	 * @returns {String} The value of the cookie
	 */
	setItem: (
		name = req("string", "name"),
		value = req("string", "value"),
		days = 1000,
	) => {
		node();
		var expires = "";
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
			expires = "; expires=" + date.toUTCString();
		}
		document.cookie =
			name + "=" + (value || "") + expires + "; path=/";
	},
	/**
	 * Gets a cookie from its name.
	 * @function
	 * @memberOf utility
	 * @param {String} name The name of the cookie.
	 * @returns {String} The value of the cookie
	 */
	getItem: (name = req("string", "name")) => {
		node();

		var nameEQ = name + "=";
		var ca = document.cookie.split(";");
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == " ") c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) === 0)
				return c.substring(nameEQ.length, c.length);
		}
		return null;
	},
	/**
	 * Deletes a cookie
	 * @memberOf utility
	 * @param {String} name The name of the cookie to delete.
	 * @returns {String} The new document.cookie
	 */
	removeItem: (name = req("string", "name")) => {
		node();

		document.cookie =
			name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
		return document.cookie;
	},
};
/**
 * A collection of regular expressions to validate and get common things from a page
 * @memberOf utility
 * @Object
 * @example
 * if (_$.regex.email.test("email@gmail.com") alert("That is a valid email!")
 * @returns {Regexp} A regex
 */
export let regex = {
	/**
	 * Valid formats:
	 * (123) 456-7890
	 * (123)456-7890
	 * 123-456-7890
	 * 123.456.7890
	 * 1234567890
	 * +31636363634
	 * 075-63546725
	 */
	phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
	/** Validates names, examples:
	 * John Smith
	 * John D'Largy
	 * John Doe-Smith
	 * John Doe Smith
	 * Hector Sausage-Hausen
	 * Mathias d'Arras
	 * Martin Luther King
	 * Ai Wong
	 * Chao Chang
	 * Alzbeta Bara
	 */
	name: /^(?:[a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?(?:[a-zA-Z]{1,})?)/,
	/**
      Validates email adresses
      */
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	/** Validates a link
	 */
	link: /(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?/,
	/**
	 * Tests for a strong password.
	 * Should have:
	 * 1 lowercase letter
	 * 1 uppercase letter
	 * 1 number
	 * 1 special character
	 * At least 8 characters long
	 */
	strongPassword: /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/,
	/**
	 * Tests for a moderate password.
	 * Should have:
	 * 1 lowercase letter
	 * 1 uppercase letter
	 * 1 number
	 * At least 8 characters long */
	moderatePassword: /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/,
	/** Ip adresses */
	/* Match IPv4 address */
	ipv4: /^ (([0 - 9] | [1 - 9][0 - 9] | 1[0 - 9]{ 2}| 2[0 - 4][0 - 9] | 25[0 - 5]) \.) { 3 } ([0 - 9] | [1 - 9][0 - 9] | 1[0 - 9]{ 2 }| 2[0 - 4][0 - 9] | 25[0 - 5]) $ /,
	/* Match IPv6 address */
	ipv6: /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/,
	/**Both ipv4 and ipv6 */
	ip: / ((^\s*((([0 - 9] | [1 - 9][0 - 9] | 1[0 - 9]{ 2} | 2[0 - 4][0 - 9] | 25[0 - 5]) \.) { 3}([0 - 9] | [1 - 9][0 - 9] | 1[0 - 9]{ 2 }| 2[0 - 4][0 - 9] | 25[0 - 5])) \s * $)| (^\s * ((([0 - 9A - Fa - f]{ 1, 4 }:) { 7 } ([0 - 9A - Fa - f]{ 1, 4 }|:))| (([0 - 9A - Fa - f]{ 1, 4 }:) { 6 } (: [0 - 9A - Fa - f]{ 1, 4 }| ((25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d) (\.(25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d)) { 3 })|:))| (([0 - 9A - Fa - f]{ 1, 4 }:) { 5 } (((: [0 - 9A - Fa - f]{ 1, 4 }) { 1, 2 })|: ((25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d) (\.(25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d)) { 3 })|:))| (([0 - 9A - Fa - f]{ 1, 4 }:) { 4 } (((: [0 - 9A - Fa - f]{ 1, 4 }) { 1, 3 })| ((: [0 - 9A - Fa - f]{ 1, 4 })?: ((25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d) (\.(25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d)) { 3 }))|:))| (([0 - 9A - Fa - f]{ 1, 4 }:) { 3 } (((: [0 - 9A - Fa - f]{ 1, 4 }) { 1, 4 })| ((: [0 - 9A - Fa - f]{ 1, 4 }) { 0, 2 }: ((25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d) (\.(25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d)) { 3 }))|:))| (([0 - 9A - Fa - f]{ 1, 4 }:) { 2 } (((: [0 - 9A - Fa - f]{ 1, 4 }) { 1, 5 })| ((: [0 - 9A - Fa - f]{ 1, 4 }) { 0, 3 }: ((25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d) (\.(25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d)) { 3 }))|:))| (([0 - 9A - Fa - f]{ 1, 4 }:) { 1 } (((: [0 - 9A - Fa - f]{ 1, 4 }) { 1, 6 })| ((: [0 - 9A - Fa - f]{ 1, 4 }) { 0, 4 }: ((25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d) (\.(25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d)) { 3 }))|:))| (: (((: [0 - 9A - Fa - f]{ 1, 4 }) { 1, 7 })| ((: [0 - 9A - Fa - f]{ 1, 4 }) { 0, 5 }: ((25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d) (\.(25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d)) { 3 }))|:))) (%.+) ?\s * $)) /,
	/**Social security number */
	socialSecurity: /^((?!219-09-9999|078-05-1120)(?!666|000|9\d{2})\d{3}-(?!00)\d{2}-(?!0{4})\d{4})|((?!219 09 9999|078 05 1120)(?!666|000|9\d{2})\d{3} (?!00)\d{2} (?!0{4})\d{4})|((?!219099999|078051120)(?!666|000|9\d{2})\d{3}(?!00)\d{2}(?!0{4})\d{4})$/,
	/**Hex color */
	hex: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,
	/** Zip code */
	zipCode: /(^\d{5}(-\d{4})?$)|(^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$)/,
	/**Phone */
	simplePhone: /^\+?[\d\s]{3,}$/,
	/**Credit cards */
	visaCredit: /^4[0–9]{12}(?:[0–9]{3})?$/,
	expressCredit: /^3[47][0–9]{13}$/,
	mastercardCredit: /^(?:5[1–5][0–9]{2}|222[1–9]|22[3–9][0–9]|2[3–6][0–9]{2}|27[01][0–9]|2720)[0–9]{12}$/,
	discoverCredit: /^6(?:011|5[0–9]{2})[0–9]{12}$/,
};
/**
   * Converts JSON to a CSV string
   * @function
   * @memberOf utility
   * @param {Array} arr The array of objects to convert to CSV.
   * @param {Array} columns The columns to use.
   * @param {String} [delimiter=","] The delimiter between cells, by default this is a comma.
   * @example
   * _$.jsonToCsv(
    [{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }],
    ['a', 'b']
  );
  * //
   a,b
  "1","2"
  "3","4"
  "6",""
  "","7"
   * @returns {String} The string of comma separated values (CSV) created from the JSON.
   */
export let jsonToCsv = (
	arr = req("array", "array"),
	columns = req("number", "columns"),
	delimiter = ",",
) =>
	[
		columns.join(delimiter),
		...arr.map((obj) =>
			columns.reduce(
				(acc, key) =>
					`${acc}${!acc.length ? "" : delimiter}"${
						!obj[key] ? "" : obj[key]
					}"`,
				"",
			),
		),
	].join("\n");
/**
 * Converts an array to CSV (Comma separated values) data.
 * @function
 * @memberOf utility
 * @param {Array} arr The array to convert.
 * @param {String} [delimiter=,] The separator (By default this is a comma.)
 * @example
 * console.log(_$.arrayToCSV([1,2,3,4])); // "1,2,3,4"
 * @returns {String} The comma separated array.
 */
export let arrayToCSV = (
	arr = req("array", "array"),
	delimiter = ",",
) =>
	arr
		.map((v) =>
			v
				.map((x) => (isNaN(x) ? `"${x.replace(/"/g, '""')}"` : x))
				.join(delimiter),
		)
		.join("\n");

/**
 * Displays a desktop notification with the specified text.
 * @function
 * @memberOf utility
 * @param {String} title The title of the notification.
 * @param {String} body The body of the notification.
 * @param {String} icon The url to the image for the icon of the notification.
 * @example
 * _$.notify("Hello", "Hi there! This is a notification!"); Notifies the user with the title "Hello" and the body text "Hi there! This is a notification!"
 * @returns {Promise} A promise that fulfills once the notification is sent, and is rejected when there is an error
 */
export let notify = async (
	title = req("string", "text"),
	body = req("string", "body"),
	icon = undefined,
) => {
	node();
	if (!window.Notification) {
		throw new Error("browser does not support notifications.");
	} else {
		if (Notification.permission === "granted") {
			var notify = new Notification(title, {
				body: body,
				icon: icon,
			});
			return;
		} else {
			// request permission from user
			Notification.requestPermission()
				.then(function (p) {
					if (p === "granted") {
						// show notification here
						var notify = new Notification(title, {
							body: body,
							icon: icon,
						});
						return;
					} else {
						throw new Error("User blocked notifications");
					}
				})
				.catch(function (err) {
					throw err;
				});
		}
	}
};
/**
 * Copies the string inputted to the clipboard.
 * @function
 * @memberOf utility
 * @param {String} str The string to copy.
 * @example
 * _$.copy("Hello world");
 * @returns {String} The string copied.
 */
export let copy = (str = req("string", "string")) => {
	node();
	const el = document.createElement("textarea");
	el.value = str;
	el.setAttribute("readonly", "");
	el.style.position = "absolute";
	el.style.left = "-9999px";
	document.body.appendChild(el);
	const selected =
		document.getSelection().rangeCount > 0
			? document.getSelection().getRangeAt(0)
			: false;
	el.select();
	document.execCommand("copy");
	document.body.removeChild(el);
	if (selected) {
		document.getSelection().removeAllRanges();
		document.getSelection().addRange(selected);
	}
	return str;
};
/**
 * Returns the browser that the user is using.
 * @function
 * @memberOf utility
 * @example
 * _$.browser(); // For me this (correctly) returns "Chrome"
 * @returns {String} A string of the browser name that the user is using.
 */
export let browser = () => {
	node();
	var isOpera =
		(!!window.opr && !!opr.addons) ||
		!!window.opera ||
		navigator.userAgent.indexOf(" OPR/") >= 0;
	var isFirefox = typeof InstallTrigger !== "undefined";
	var isSafari =
		/constructor/i.test(window.HTMLElement) ||
		(function (p) {
			return p.toString() === "[object SafariRemoteNotification]";
		})(
			!window["safari"] ||
				(typeof safari !== "undefined" &&
					window["safari"].pushNotification),
		);
	var isIE = /*@cc_on!@*/ false || !!document.documentMode;
	var isEdge = !isIE && !!window.StyleMedia;
	var isChrome =
		!!window.chrome &&
		(!!window.chrome.webstore || !!window.chrome.runtime);
	var isEdgeChromium =
		isChrome && navigator.userAgent.indexOf("Edg") != -1;
	var isBlink = (isChrome || isOpera) && !!window.CSS;
	if (isOpera) {
		return "Opera";
	}
	if (isFirefox) {
		return "Firefox";
	}
	if (isSafari) {
		return "Safari";
	}
	if (isEdge) {
		return "Edge";
	}
	if (isIE) {
		return "Internet Explorer";
	}
	if (isChrome) {
		return "Chrome";
	}
	if (isEdgeChromium) {
		return "Edge Chromium";
	}
	if (isBlink) {
		return "Blink";
	}
};
/**
 * Converts a form to URL queries using the name attribute.
 * @function
 * @memberOf utility
 * @param {HTMLFormElement} form The form element.
 * @returns {String} The string of url queries (Excluding the hostname and path) of the form data.
 */
export let serializeForm = (
	form = req("HTMLFormElement", "form"),
) => {
	node();
	return Array.from(new FormData(form), (field) =>
		field.map(encodeURIComponent).join("="),
	).join("&");
};
/**
 * An implementation of the soundex algorithm in JavaScript, used to test if two words sound the same.
 * @returns {String} The soundex of the given string
 * @param {String} s The word to get the soundex of.
 * @example
 * _$.soundex("ekxplohsin");//"E214"
 * _$.soundex("explosion");//"E214"
 * @memberOf utility
 * @function
 */
export let soundex = (s = req("string", "word")) => {
	var a = s.toLowerCase().split(""),
		f = a.shift(),
		r = "",
		codes = {
			a: "",
			e: "",
			i: "",
			o: "",
			u: "",
			b: 1,
			f: 1,
			p: 1,
			v: 1,
			c: 2,
			g: 2,
			j: 2,
			k: 2,
			q: 2,
			s: 2,
			x: 2,
			z: 2,
			d: 3,
			t: 3,
			l: 4,
			m: 5,
			n: 5,
			r: 6,
		};

	r =
		f +
		a
			.map(function (v, i, a) {
				return codes[v];
			})
			.filter(function (v, i, a) {
				return i === 0 ? v !== codes[f] : v !== a[i - 1];
			})
			.join("");

	return (r + "000").slice(0, 4).toUpperCase();
};
//#endregion Utility
//#endregion bijou

/**
 *Converts most of the functions of Bijou.js to prototype functions.
 * Note that you have to call this function to add the prototypes.
 * @param {Object} options The options to use, supports overwrite (boolean of whether to overwrite existing prototypes), and try, (boolean for whether to wrap in a try..catch)
 */
export let prototype = (
	options = { overwrite: true, tryCatch: false },
) => {
	function proto(fn, thing, name) {
		let title =
			name || fn ? fn.name : "noNameHehe124672463467432376453";
		let overwrite =
			options.overwrite !== undefined && options.overwrite !== false
				? true
				: false;
		if (!thing.prototype.hasOwnProperty(title) || overwrite) {
			Object.defineProperty(thing.prototype, title, {
				value: function (...args) {
					if (
						(options.try ||
							options.tryCatch ||
							options.catch ||
							options.catchErrors) === true
					) {
						try {
							let t = this;
							return fn(t, ...args);
						} catch (e) {
							return e;
						}
					} else {
						let t = this;
						return fn(t, ...args);
					}
				},
			});
		}
	}
	proto(_$.addDaysToDate, Date, "addDays");
	proto(_$.addEventListeners, Element);
	proto(_$.addMinutesToDate, Date, "addMinutes");
	proto(_$.addStyles, Element);
	proto(_$.animate, Number);
	proto(_$.arrayDiff, Array, "diff");
	proto(_$.arrayToCSV, Array, "toCSV");
	proto(_$.attributes, Element);
	proto(_$.averageBy, Array);
	proto(_$.blendColors, String);
	proto(_$.byteSize, String);
	proto(_$.camelCase, String);
	proto(_$.capitalize, String);
	proto(_$.clone, Object);
	proto(_$.compStyle, Element);
	proto(_$.composeFunction, Function, "compose");
	proto(_$.contains, Array);
	proto(_$.copy, String);
	proto(_$.count, Array);
	proto(_$.create, String);
	proto(_$.createElement, String);
	proto(_$.curryFunction, Function, "curry");
	proto(_$.dayName, Date);
	proto(_$.debounce, Function);
	proto(_$.deburr, String);
	proto(_$.disableRightClick, Element);
	proto(_$.dispatch, Object);
	proto(_$.drag, Element);
	proto(_$.each, Array);
	proto(_$.editDistance, String);
	proto(_$.elementContains, Element, "contains");
	proto(_$.equals, Date);
	proto(_$.equals, Object);
	proto(_$.escapeHTML, String);
	proto(_$.factorial, Number);
	proto(_$.fastestFunction, Array);
	proto(_$.flatten, Array);
	proto(_$.flattenObj, Object, "flatten");
	proto(_$.forTemplateLiteral, Array);
	proto(_$.formToObject, Element, "toObject");
	proto(_$.formatHTML, String);
	proto(_$.formatNumber, Number);
	proto(_$.fullScreen, Element);
	proto(_$.gcd, Array);
	proto(_$.hash, String);
	proto(_$.hashString, String);
	proto(_$.imageToData, String);
	proto(_$.inPartialView, Element);
	proto(_$.inView, Element);
	proto(_$.inlineCSS, Element);
	proto(_$.isAsync, Function);
	proto(_$.isDateValid, Date, "valid");
	proto(_$.isPrime, Number);
	proto(_$.jaroDistance, String);
	proto(_$.juxt, Function);
	proto(_$.lightOrDark, String);
	proto(_$.lightenColor, String);
	proto(_$.limitArgs, Function);
	proto(_$.listen, Object);
	proto(_$.luhnCheck, Number);
	proto(_$.mapObjectKeys, Object, "mapKeys");
	proto(_$.mapObjectValues, Object, "map");
	proto(_$.mapString, String, "map");
	proto(_$.markDownToHTML, String);
	proto(_$.memoize, Function);
	proto(_$.merge, Object);
	proto(_$.nFlatten, Array);
	proto(_$.observeMutations, Element, "observe");
	proto(_$.onOutsideClick, Element);
	proto(_$.onScrollStop, Element);
	proto(_$.parents, Element);
	proto(_$.parseHTML, String);
	proto(_$.playSection, Element);
	proto(_$.prefixCSS, String);
	proto(_$.preloadImage, String);
	proto(_$.primesTo, Number);
	proto(_$.querySelector, Element, "genQuerySelector");
	proto(_$.random, Number);
	proto(_$.range, Number);
	proto(_$.remove, Array);
	proto(_$.removeComments, String);
	proto(_$.removeTags, String);
	proto(_$.renderElement, Object);
	proto(_$.replaceBetween, String);
	proto(_$.replaceMultiple, Object);
	proto(_$.replaceText, Element);
	proto(_$.rgbToHex, String);
	proto(_$.runAsync, Function);
	proto(_$.sanitize, String);
	proto(_$.saveBlob, Blob);
	proto(_$.scrambleString, String, "scramble");
	proto(_$.seedRandom, String);
	proto(_$.serializeForm, Element, "serialize");
	proto(_$.shuffleArray, Array, "shuffle");
	proto(_$.sortObj, Object, "sort");
	proto(_$.sortTable, Element, "sort");
	proto(_$.sortTableBy, Element);
	proto(_$.speak, String);
	proto(_$.splice, String);
	proto(_$.spread, Function);
	proto(_$.syllables, String);
	proto(_$.textNodes, Element);
	proto(_$.throttle, Function);
	proto(_$.tilt, Element);
	proto(_$.timeFunction, Function);
	proto(_$.titleCase, String);
	proto(_$.unCamelCase, String);
	proto(_$.unescapeHTML, String);
	proto(_$.unionArrays, Array, "union");
	proto(_$.uniqueArray, Array, "unique");
	proto(_$.urlQuery, String);
	proto(_$.widows, String);
};
/**
 * Bijou.js source documentation. In the `Bijou` namespace you will find the documentation for all of the functions in Bijou.js, if you have any questions, suggestions or bug reports pleast make an issue (here)[https://github.com/bijou-js/bijou.js/issues/new/choose]. Best of luck! Thanks for using Bijou.js! --Explosion--
 * @type {Object}
 * @author Explosion-Scratch, GrahamSH-LLK, Bijou.js contributors
 */

let _temp = {
	addDaysToDate,
	addEventListeners,
	addMinutesToDate,
	addStyles,
	animate,
	arrayDiff,
	arrayToCSV,
	attributes,
	averageBy,
	blendColors,
	browser,
	byteSize,
	camelCase,
	capitalize,
	clone,
	compStyle,
	composeFunction,
	contains,
	context,
	cookies,
	copy,
	count,
	create,
	createElement,
	curryFunction,
	dayName,
	debounce,
	deburr,
	diff,
	disableRightClick,
	dispatch,
	drag,
	each,
	ease,
	editDistance,
	elementContains,
	elementReady,
	elementSiblings,
	equals,
	escapeHTML,
	factorial,
	fastestFunction,
	flatten,
	flattenObj,
	forTemplateLiteral,
	formToObject,
	formatHTML,
	formatMilliseconds,
	formatNumber,
	fullScreen,
	gcd,
	getHTML,
	getImages,
	getJSON,
	hash,
	hashString,
	hexToRGB,
	htmlToImage,
	hub,
	imageToData,
	inPartialView,
	inView,
	injectCSS,
	inlineCSS,
	isAsync,
	isDateValid,
	isPrime,
	jaroDistance,
	jsonToCsv,
	juxt,
	lightOrDark,
	lightenColor,
	limitArgs,
	listen,
	loadScript,
	luhnCheck,
	mapObjectKeys,
	mapObjectValues,
	mapString,
	markdownToHTML,
	memoize,
	merge,
	mobileOrDesktop,
	nFlatten,
	notify,
	observeMutations,
	onOutsideClick,
	onScrollStop,
	parents,
	parseCookie,
	parseHTML,
	playSection,
	prefixCSS,
	preloadImage,
	previousPage,
	primesTo,
	prototype,
	querySelector,
	race,
	random,
	randomColor,
	range,
	regex,
	remove,
	removeComments,
	removeTags,
	renderElement,
	replaceBetween,
	replaceMultiple,
	replaceSelection,
	replaceText,
	requestInterval,
	resize,
	rgbToHex,
	ripple,
	runAsync,
	sanitize,
	saveBlob,
	scrambleString,
	seedRandom,
	serializeForm,
	shuffleArray,
	sleep,
	sortObj,
	sortTable,
	sortTableBy,
	soundex,
	speak,
	splice,
	spliceArrayBuffer,
	spread,
	syllables,
	tag,
	textNodes,
	throttle,
	tilt,
	timeFunction,
	titleCase,
	typeOf,
	unCamelCase,
	unescapeHTML,
	unionArrays,
	uniqueArray,
	urlQuery,
	uuid,
	waitUntil,
	widows,
};
_temp = sortObj(_temp);
// Imports and exports
export default _temp;
//Export so that when people do <script src="bijou" type="module"></script>
if (!isNode) {
	window._$ = _temp;
}
//So that we can use bijou in the source code.
export const _$ = _temp;
if (isNode) {
	try {
		module.exports = _temp;
	} catch (err) {
		console.error(err);
	}
}
