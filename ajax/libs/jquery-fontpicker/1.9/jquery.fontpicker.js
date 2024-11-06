/**
 * jQuery.fontpicker - A font picker for Google Web Fonts and local fonts.
 *
 * Made by Arjan Haverkamp, https://www.webgear.nl
 * Copyright 2020-2024 Arjan Haverkamp
 * MIT Licensed
 * @version 1.9 - 2024-09-11
 * @url https://github.com/av01d/fontpicker-jquery-plugin
 */

(function($){

	var pluginName = 'fontpicker';
	var fontsLoaded = {};

	var googleFontLangs = {
		'arabic': 'Arabic',
		'bengali': 'Bengali',
		'chinese-hongkong': 'Chinese (Hong Kong)',
		'chinese-simplified': 'Chinese (Simplified',
		'chinese-traditional': 'Chinese (Traditional)',
		'cyrillic': 'Cyrillic',
		'cyrillic-ext': 'Cyrillic Extended',
		'devanagari': 'Devanagari',
		'greek': 'Greek',
		'greek-ext': 'Greek Extended',
		'gujarati': 'Gujarati',
		'gurmukhi': 'Gurmukhi',
		'hebrew': 'Hebrew',
		'japanese': 'Japanese',
		'kannada': 'Kannada',
		'khmer': 'Khmer',
		'korean': 'Korean',
		'latin': 'Latin',
		'latin-ext': 'Latin Extended',
		'malayalam': 'Malayalam',
		'myanmar': 'Myanmar',
		'oriya': 'Oriya',
		'sinhala': 'Sinhala',
		'tamil': 'Tamil',
		'telugu': 'Telugu',
		'thai': 'Thai',
		'tibetan': 'Tibetan',
		'vietnamese': 'Vietnamese'
	};

	var googleFontCats = ['serif', 'sans-serif', 'display', 'handwriting', 'monospace'];

	// Object.keys(..).length for all browsers, including IE <= 11:
	function objLength(obj) {
		var nr = 0;
		for (var i in obj) {
			if (obj.hasOwnProperty(i)) { nr++; }
		}
		return nr;
	}

	$.fn.fontpicker = function(options) {

		var __scrollIntoViewIfNeeded = function(elem) {
			var container = elem.parentElement;
			var rectElem = elem.getBoundingClientRect(), rectContainer = container.getBoundingClientRect();
			if (rectElem.bottom > rectContainer.bottom) { elem.scrollIntoView(false); }
			if (rectElem.top < rectContainer.top) { elem.scrollIntoView(); }
		};

		/**
		 * Utility function for getting/setting cookies.
		 * This function stores multiple values in one single cookie: max efficiency!
		 * Also: this function gets/sets cookies that PHP can also get/set (static Cookie class).
		 * Cookies are valid for 365 days.
		 *
		 * @param {string} key Name of the value to store.
		 * @param {string} value Value to store. Omit to get a cookie, provide to set a cookie.
		 * @return {string} The value for a cookie (when value is omitted, of course).
		 */
		var __cookie = function(key, value) {
			var cookieName = 'jqfs', cookieDays = 365, result, date = new Date(), jar = {}, expires = '', x, pts, pt;
			result = (result = new RegExp('(?:^|; )'+cookieName+'=([^;]*)').exec(document.cookie)) ? decodeURIComponent(result[1]) : null;

			if (null !== result) {
				pts = result.split('||');
				for (x in pts) {
					try {
						pt = pts[x].split('|',2);
						jar[pt[0]] = pt[1];
					} catch (e) {}
				}
			}

			// Get cookie:
			if (1 === arguments.length) {
				return jar[key];
			}

			// Set cookie
			if (null === value || false === value) {
				delete jar[key];
			}
			else {
				jar[key] = value;
			}

			pts = [];
			for (x in jar) {
				pts.push(x+'|'+jar[x]);
			}

			if (cookieDays > 0) {
				date.setTime(date.getTime()+(cookieDays*24*60*60*1000));
				expires = '; expires='+date.toGMTString();
			}
			document.cookie = cookieName + '=' + encodeURIComponent(pts.join('||')) + '; path=/; SameSite=Lax' + expires;
		};

		var __googleFonts = {
			// This list was last updated on August 21, 2024
			"ABeeZee": {
				"category": "sans-serif",
				"variants": "400,400i",
				"subsets": "latin,latin-ext"
			},
			"ADLaM Display": {
				"category": "display",
				"variants": "400",
				"subsets": "adlam,latin,latin-ext"
			},
			"AR One Sans": {
				"category": "sans-serif",
				"variants": "400,500,600,700",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Abel": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Abhaya Libre": {
				"category": "serif",
				"variants": "400,500,600,700,800",
				"subsets": "latin,latin-ext,sinhala"
			},
			"Aboreto": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Abril Fatface": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Abyssinica SIL": {
				"category": "serif",
				"variants": "400",
				"subsets": "ethiopic,latin,latin-ext"
			},
			"Aclonica": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Acme": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Actor": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Adamina": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Advent Pro": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "cyrillic,cyrillic-ext,greek,latin,latin-ext"
			},
			"Afacad": {
				"category": "sans-serif",
				"variants": "400,500,600,700,400i,500i,600i,700i",
				"subsets": "cyrillic-ext,latin,latin-ext,math,symbols,vietnamese"
			},
			"Agbalumo": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Agdasima": {
				"category": "sans-serif",
				"variants": "400,700",
				"subsets": "latin,latin-ext"
			},
			"Aguafina Script": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Akatab": {
				"category": "sans-serif",
				"variants": "400,500,600,700,800,900",
				"subsets": "latin,latin-ext,tifinagh"
			},
			"Akaya Kanadaka": {
				"category": "display",
				"variants": "400",
				"subsets": "kannada,latin,latin-ext"
			},
			"Akaya Telivigala": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext,telugu"
			},
			"Akronim": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Akshar": {
				"category": "sans-serif",
				"variants": "300,400,500,600,700",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Aladin": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Alata": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Alatsi": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Albert Sans": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "latin,latin-ext"
			},
			"Aldrich": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Alef": {
				"category": "sans-serif",
				"variants": "400,700",
				"subsets": "hebrew,latin"
			},
			"Alegreya": {
				"category": "serif",
				"variants": "400,500,600,700,800,900,400i,500i,600i,700i,800i,900i",
				"subsets": "cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese"
			},
			"Alegreya SC": {
				"category": "serif",
				"variants": "400,400i,500,500i,700,700i,800,800i,900,900i",
				"subsets": "cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese"
			},
			"Alegreya Sans": {
				"category": "sans-serif",
				"variants": "100,100i,300,300i,400,400i,500,500i,700,700i,800,800i,900,900i",
				"subsets": "cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese"
			},
			"Alegreya Sans SC": {
				"category": "sans-serif",
				"variants": "100,100i,300,300i,400,400i,500,500i,700,700i,800,800i,900,900i",
				"subsets": "cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese"
			},
			"Aleo": {
				"category": "serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Alex Brush": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Alexandria": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "arabic,latin,latin-ext,vietnamese"
			},
			"Alfa Slab One": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Alice": {
				"category": "serif",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext"
			},
			"Alike": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,latin-ext,math,symbols"
			},
			"Alike Angular": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,latin-ext,math,symbols"
			},
			"Alkalami": {
				"category": "serif",
				"variants": "400",
				"subsets": "arabic,latin,latin-ext"
			},
			"Alkatra": {
				"category": "display",
				"variants": "400,500,600,700",
				"subsets": "bengali,devanagari,latin,latin-ext,oriya"
			},
			"Allan": {
				"category": "display",
				"variants": "400,700",
				"subsets": "latin,latin-ext"
			},
			"Allerta": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Allerta Stencil": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Allison": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Allura": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Almarai": {
				"category": "sans-serif",
				"variants": "300,400,700,800",
				"subsets": "arabic,latin"
			},
			"Almendra": {
				"category": "serif",
				"variants": "400,400i,700,700i",
				"subsets": "latin,latin-ext"
			},
			"Almendra Display": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Almendra SC": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Alumni Sans": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Alumni Sans Collegiate One": {
				"category": "sans-serif",
				"variants": "400,400i",
				"subsets": "cyrillic,latin,latin-ext,vietnamese"
			},
			"Alumni Sans Inline One": {
				"category": "display",
				"variants": "400,400i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Alumni Sans Pinstripe": {
				"category": "sans-serif",
				"variants": "400,400i",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Amarante": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Amaranth": {
				"category": "sans-serif",
				"variants": "400,400i,700,700i",
				"subsets": "latin"
			},
			"Amatic SC": {
				"category": "handwriting",
				"variants": "400,700",
				"subsets": "cyrillic,hebrew,latin,latin-ext,vietnamese"
			},
			"Amethysta": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Amiko": {
				"category": "sans-serif",
				"variants": "400,600,700",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Amiri": {
				"category": "serif",
				"variants": "400,400i,700,700i",
				"subsets": "arabic,latin,latin-ext"
			},
			"Amiri Quran": {
				"category": "serif",
				"variants": "400",
				"subsets": "arabic,latin"
			},
			"Amita": {
				"category": "handwriting",
				"variants": "400,700",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Anaheim": {
				"category": "sans-serif",
				"variants": "400,500,600,700,800",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Andada Pro": {
				"category": "serif",
				"variants": "400,500,600,700,800,400i,500i,600i,700i,800i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Andika": {
				"category": "sans-serif",
				"variants": "400,400i,700,700i",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Anek Bangla": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800",
				"subsets": "bengali,latin,latin-ext"
			},
			"Anek Devanagari": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Anek Gujarati": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800",
				"subsets": "gujarati,latin,latin-ext"
			},
			"Anek Gurmukhi": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800",
				"subsets": "gurmukhi,latin,latin-ext"
			},
			"Anek Kannada": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800",
				"subsets": "kannada,latin,latin-ext"
			},
			"Anek Latin": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Anek Malayalam": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800",
				"subsets": "latin,latin-ext,malayalam"
			},
			"Anek Odia": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800",
				"subsets": "latin,latin-ext,oriya"
			},
			"Anek Tamil": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800",
				"subsets": "latin,latin-ext,tamil"
			},
			"Anek Telugu": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800",
				"subsets": "latin,latin-ext,telugu"
			},
			"Angkor": {
				"category": "display",
				"variants": "400",
				"subsets": "khmer,latin"
			},
			"Annapurna SIL": {
				"category": "serif",
				"variants": "400,700",
				"subsets": "devanagari,latin,latin-ext,math,symbols"
			},
			"Annie Use Your Telescope": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Anonymous Pro": {
				"category": "monospace",
				"variants": "400,400i,700,700i",
				"subsets": "cyrillic,greek,latin,latin-ext"
			},
			"Anta": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,math,symbols"
			},
			"Antic": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Antic Didone": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Antic Slab": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Anton": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Anton SC": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Antonio": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700",
				"subsets": "latin,latin-ext"
			},
			"Anuphan": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700",
				"subsets": "latin,latin-ext,thai,vietnamese"
			},
			"Anybody": {
				"category": "display",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Aoboshi One": {
				"category": "serif",
				"variants": "400",
				"subsets": "japanese,latin,latin-ext"
			},
			"Arapey": {
				"category": "serif",
				"variants": "400,400i",
				"subsets": "latin"
			},
			"Arbutus": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Arbutus Slab": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Architects Daughter": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Archivo": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Archivo Black": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Archivo Narrow": {
				"category": "sans-serif",
				"variants": "400,500,600,700,400i,500i,600i,700i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Are You Serious": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Aref Ruqaa": {
				"category": "serif",
				"variants": "400,700",
				"subsets": "arabic,latin,latin-ext"
			},
			"Aref Ruqaa Ink": {
				"category": "serif",
				"variants": "400,700",
				"subsets": "arabic,latin,latin-ext"
			},
			"Arima": {
				"category": "display",
				"variants": "100,200,300,400,500,600,700",
				"subsets": "greek,greek-ext,latin,latin-ext,malayalam,tamil,vietnamese"
			},
			"Arimo": {
				"category": "sans-serif",
				"variants": "400,500,600,700,400i,500i,600i,700i",
				"subsets": "cyrillic,cyrillic-ext,greek,greek-ext,hebrew,latin,latin-ext,vietnamese"
			},
			"Arizonia": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Armata": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Arsenal": {
				"category": "sans-serif",
				"variants": "400,400i,700,700i",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Arsenal SC": {
				"category": "sans-serif",
				"variants": "400,400i,700,700i",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Artifika": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Arvo": {
				"category": "serif",
				"variants": "400,400i,700,700i",
				"subsets": "latin"
			},
			"Arya": {
				"category": "sans-serif",
				"variants": "400,700",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Asap": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Asap Condensed": {
				"category": "sans-serif",
				"variants": "200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Asar": {
				"category": "serif",
				"variants": "400",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Asset": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic-ext,latin,latin-ext,math,symbols"
			},
			"Assistant": {
				"category": "sans-serif",
				"variants": "200,300,400,500,600,700,800",
				"subsets": "hebrew,latin,latin-ext"
			},
			"Astloch": {
				"category": "display",
				"variants": "400,700",
				"subsets": "latin"
			},
			"Asul": {
				"category": "sans-serif",
				"variants": "400,700",
				"subsets": "latin"
			},
			"Athiti": {
				"category": "sans-serif",
				"variants": "200,300,400,500,600,700",
				"subsets": "latin,latin-ext,thai,vietnamese"
			},
			"Atkinson Hyperlegible": {
				"category": "sans-serif",
				"variants": "400,400i,700,700i",
				"subsets": "latin,latin-ext"
			},
			"Atma": {
				"category": "display",
				"variants": "300,400,500,600,700",
				"subsets": "bengali,latin,latin-ext"
			},
			"Atomic Age": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Aubrey": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Audiowide": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Autour One": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Average": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Average Sans": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Averia Gruesa Libre": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Averia Libre": {
				"category": "display",
				"variants": "300,300i,400,400i,700,700i",
				"subsets": "latin"
			},
			"Averia Sans Libre": {
				"category": "display",
				"variants": "300,300i,400,400i,700,700i",
				"subsets": "latin"
			},
			"Averia Serif Libre": {
				"category": "display",
				"variants": "300,300i,400,400i,700,700i",
				"subsets": "latin"
			},
			"Azeret Mono": {
				"category": "monospace",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "latin,latin-ext"
			},
			"B612": {
				"category": "sans-serif",
				"variants": "400,400i,700,700i",
				"subsets": "latin"
			},
			"B612 Mono": {
				"category": "monospace",
				"variants": "400,400i,700,700i",
				"subsets": "latin"
			},
			"BIZ UDGothic": {
				"category": "sans-serif",
				"variants": "400,700",
				"subsets": "cyrillic,greek-ext,japanese,latin,latin-ext"
			},
			"BIZ UDMincho": {
				"category": "serif",
				"variants": "400,700",
				"subsets": "cyrillic,greek-ext,japanese,latin,latin-ext"
			},
			"BIZ UDPGothic": {
				"category": "sans-serif",
				"variants": "400,700",
				"subsets": "cyrillic,greek-ext,japanese,latin,latin-ext"
			},
			"BIZ UDPMincho": {
				"category": "serif",
				"variants": "400,700",
				"subsets": "cyrillic,greek-ext,japanese,latin,latin-ext"
			},
			"Babylonica": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Bacasime Antique": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Bad Script": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "cyrillic,latin"
			},
			"Bagel Fat One": {
				"category": "display",
				"variants": "400",
				"subsets": "korean,latin,latin-ext"
			},
			"Bahiana": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Bahianita": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Bai Jamjuree": {
				"category": "sans-serif",
				"variants": "200,200i,300,300i,400,400i,500,500i,600,600i,700,700i",
				"subsets": "latin,latin-ext,thai,vietnamese"
			},
			"Bakbak One": {
				"category": "display",
				"variants": "400",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Ballet": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Baloo 2": {
				"category": "display",
				"variants": "400,500,600,700,800",
				"subsets": "devanagari,latin,latin-ext,vietnamese"
			},
			"Baloo Bhai 2": {
				"category": "display",
				"variants": "400,500,600,700,800",
				"subsets": "gujarati,latin,latin-ext,vietnamese"
			},
			"Baloo Bhaijaan 2": {
				"category": "display",
				"variants": "400,500,600,700,800",
				"subsets": "arabic,latin,latin-ext,vietnamese"
			},
			"Baloo Bhaina 2": {
				"category": "display",
				"variants": "400,500,600,700,800",
				"subsets": "latin,latin-ext,oriya,vietnamese"
			},
			"Baloo Chettan 2": {
				"category": "display",
				"variants": "400,500,600,700,800",
				"subsets": "latin,latin-ext,malayalam,vietnamese"
			},
			"Baloo Da 2": {
				"category": "display",
				"variants": "400,500,600,700,800",
				"subsets": "bengali,latin,latin-ext,vietnamese"
			},
			"Baloo Paaji 2": {
				"category": "display",
				"variants": "400,500,600,700,800",
				"subsets": "gurmukhi,latin,latin-ext,vietnamese"
			},
			"Baloo Tamma 2": {
				"category": "display",
				"variants": "400,500,600,700,800",
				"subsets": "kannada,latin,latin-ext,vietnamese"
			},
			"Baloo Tammudu 2": {
				"category": "display",
				"variants": "400,500,600,700,800",
				"subsets": "latin,latin-ext,telugu,vietnamese"
			},
			"Baloo Thambi 2": {
				"category": "display",
				"variants": "400,500,600,700,800",
				"subsets": "latin,latin-ext,tamil,vietnamese"
			},
			"Balsamiq Sans": {
				"category": "display",
				"variants": "400,400i,700,700i",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext"
			},
			"Balthazar": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Bangers": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Barlow": {
				"category": "sans-serif",
				"variants": "100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Barlow Condensed": {
				"category": "sans-serif",
				"variants": "100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Barlow Semi Condensed": {
				"category": "sans-serif",
				"variants": "100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Barriecito": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Barrio": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Basic": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Baskervville": {
				"category": "serif",
				"variants": "400,400i",
				"subsets": "latin,latin-ext"
			},
			"Baskervville SC": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Battambang": {
				"category": "display",
				"variants": "100,300,400,700,900",
				"subsets": "khmer,latin"
			},
			"Baumans": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Bayon": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "khmer,latin"
			},
			"Be Vietnam Pro": {
				"category": "sans-serif",
				"variants": "100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Beau Rivage": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Bebas Neue": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Beiruti": {
				"category": "sans-serif",
				"variants": "200,300,400,500,600,700,800,900",
				"subsets": "arabic,latin,latin-ext,vietnamese"
			},
			"Belanosima": {
				"category": "sans-serif",
				"variants": "400,600,700",
				"subsets": "latin,latin-ext"
			},
			"Belgrano": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Bellefair": {
				"category": "serif",
				"variants": "400",
				"subsets": "hebrew,latin,latin-ext"
			},
			"Belleza": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Bellota": {
				"category": "display",
				"variants": "300,300i,400,400i,700,700i",
				"subsets": "cyrillic,latin,latin-ext,vietnamese"
			},
			"Bellota Text": {
				"category": "display",
				"variants": "300,300i,400,400i,700,700i",
				"subsets": "cyrillic,latin,latin-ext,vietnamese"
			},
			"BenchNine": {
				"category": "sans-serif",
				"variants": "300,400,700",
				"subsets": "latin,latin-ext"
			},
			"Benne": {
				"category": "serif",
				"variants": "400",
				"subsets": "kannada,latin,latin-ext"
			},
			"Bentham": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Berkshire Swash": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Besley": {
				"category": "serif",
				"variants": "400,500,600,700,800,900,400i,500i,600i,700i,800i,900i",
				"subsets": "latin,latin-ext"
			},
			"Beth Ellen": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Bevan": {
				"category": "serif",
				"variants": "400,400i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"BhuTuka Expanded One": {
				"category": "serif",
				"variants": "400",
				"subsets": "gurmukhi,latin,latin-ext"
			},
			"Big Shoulders Display": {
				"category": "display",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Big Shoulders Inline Display": {
				"category": "display",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Big Shoulders Inline Text": {
				"category": "display",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Big Shoulders Stencil Display": {
				"category": "display",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Big Shoulders Stencil Text": {
				"category": "display",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Big Shoulders Text": {
				"category": "display",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Bigelow Rules": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Bigshot One": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Bilbo": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Bilbo Swash Caps": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"BioRhyme": {
				"category": "serif",
				"variants": "200,300,400,500,600,700,800",
				"subsets": "latin,latin-ext"
			},
			"BioRhyme Expanded": {
				"category": "serif",
				"variants": "200,300,400,700,800",
				"subsets": "latin,latin-ext"
			},
			"Birthstone": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Birthstone Bounce": {
				"category": "handwriting",
				"variants": "400,500",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Biryani": {
				"category": "sans-serif",
				"variants": "200,300,400,600,700,800,900",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Bitter": {
				"category": "serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Black And White Picture": {
				"category": "display",
				"variants": "400",
				"subsets": "korean,latin"
			},
			"Black Han Sans": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "korean,latin"
			},
			"Black Ops One": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Blaka": {
				"category": "display",
				"variants": "400",
				"subsets": "arabic,latin,latin-ext"
			},
			"Blaka Hollow": {
				"category": "display",
				"variants": "400",
				"subsets": "arabic,latin,latin-ext"
			},
			"Blaka Ink": {
				"category": "display",
				"variants": "400",
				"subsets": "arabic,latin,latin-ext"
			},
			"Blinker": {
				"category": "sans-serif",
				"variants": "100,200,300,400,600,700,800,900",
				"subsets": "latin,latin-ext"
			},
			"Bodoni Moda": {
				"category": "serif",
				"variants": "400,500,600,700,800,900,400i,500i,600i,700i,800i,900i",
				"subsets": "latin,latin-ext,math,symbols"
			},
			"Bodoni Moda SC": {
				"category": "serif",
				"variants": "400,500,600,700,800,900,400i,500i,600i,700i,800i,900i",
				"subsets": "latin,latin-ext,math,symbols"
			},
			"Bokor": {
				"category": "display",
				"variants": "400",
				"subsets": "khmer,latin"
			},
			"Bona Nova": {
				"category": "serif",
				"variants": "400,400i,700",
				"subsets": "cyrillic,cyrillic-ext,greek,hebrew,latin,latin-ext,vietnamese"
			},
			"Bona Nova SC": {
				"category": "serif",
				"variants": "400,400i,700",
				"subsets": "cyrillic,cyrillic-ext,greek,hebrew,latin,latin-ext,vietnamese"
			},
			"Bonbon": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Bonheur Royale": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Boogaloo": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Borel": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,math,symbols,vietnamese"
			},
			"Bowlby One": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Bowlby One SC": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Braah One": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "gurmukhi,latin,latin-ext,vietnamese"
			},
			"Brawler": {
				"category": "serif",
				"variants": "400,700",
				"subsets": "latin"
			},
			"Bree Serif": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Bricolage Grotesque": {
				"category": "sans-serif",
				"variants": "200,300,400,500,600,700,800",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Bruno Ace": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Bruno Ace SC": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Brygada 1918": {
				"category": "serif",
				"variants": "400,500,600,700,400i,500i,600i,700i",
				"subsets": "cyrillic,cyrillic-ext,greek,latin,latin-ext,vietnamese"
			},
			"Bubblegum Sans": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Bubbler One": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Buda": {
				"category": "display",
				"variants": "300",
				"subsets": "latin"
			},
			"Buenard": {
				"category": "serif",
				"variants": "400,700",
				"subsets": "latin,latin-ext"
			},
			"Bungee": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Bungee Hairline": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Bungee Inline": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Bungee Outline": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Bungee Shade": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Bungee Spice": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Bungee Tint": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Butcherman": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Butterfly Kids": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Cabin": {
				"category": "sans-serif",
				"variants": "400,500,600,700,400i,500i,600i,700i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Cabin Condensed": {
				"category": "sans-serif",
				"variants": "400,500,600,700",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Cabin Sketch": {
				"category": "display",
				"variants": "400,700",
				"subsets": "latin"
			},
			"Cactus Classical Serif": {
				"category": "serif",
				"variants": "400",
				"subsets": "chinese-hongkong,cyrillic,latin,latin-ext,vietnamese"
			},
			"Caesar Dressing": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Cagliostro": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Cairo": {
				"category": "sans-serif",
				"variants": "200,300,400,500,600,700,800,900",
				"subsets": "arabic,latin,latin-ext"
			},
			"Cairo Play": {
				"category": "sans-serif",
				"variants": "200,300,400,500,600,700,800,900",
				"subsets": "arabic,latin,latin-ext"
			},
			"Caladea": {
				"category": "serif",
				"variants": "400,400i,700,700i",
				"subsets": "latin,latin-ext"
			},
			"Calistoga": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Calligraffitti": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Cambay": {
				"category": "sans-serif",
				"variants": "400,400i,700,700i",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Cambo": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Candal": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Cantarell": {
				"category": "sans-serif",
				"variants": "400,400i,700,700i",
				"subsets": "latin,latin-ext"
			},
			"Cantata One": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Cantora One": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Caprasimo": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Capriola": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Caramel": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Carattere": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Cardo": {
				"category": "serif",
				"variants": "400,400i,700",
				"subsets": "greek,greek-ext,latin,latin-ext"
			},
			"Carlito": {
				"category": "sans-serif",
				"variants": "400,400i,700,700i",
				"subsets": "cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese"
			},
			"Carme": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Carrois Gothic": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Carrois Gothic SC": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Carter One": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Castoro": {
				"category": "serif",
				"variants": "400,400i",
				"subsets": "latin,latin-ext"
			},
			"Castoro Titling": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Catamaran": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,tamil"
			},
			"Caudex": {
				"category": "serif",
				"variants": "400,400i,700,700i",
				"subsets": "greek,greek-ext,latin,latin-ext"
			},
			"Caveat": {
				"category": "handwriting",
				"variants": "400,500,600,700",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext"
			},
			"Caveat Brush": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Cedarville Cursive": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Ceviche One": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Chakra Petch": {
				"category": "sans-serif",
				"variants": "300,300i,400,400i,500,500i,600,600i,700,700i",
				"subsets": "latin,latin-ext,thai,vietnamese"
			},
			"Changa": {
				"category": "sans-serif",
				"variants": "200,300,400,500,600,700,800",
				"subsets": "arabic,latin,latin-ext"
			},
			"Changa One": {
				"category": "display",
				"variants": "400,400i",
				"subsets": "latin"
			},
			"Chango": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Charis SIL": {
				"category": "serif",
				"variants": "400,400i,700,700i",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Charm": {
				"category": "handwriting",
				"variants": "400,700",
				"subsets": "latin,latin-ext,thai,vietnamese"
			},
			"Charmonman": {
				"category": "handwriting",
				"variants": "400,700",
				"subsets": "latin,latin-ext,thai,vietnamese"
			},
			"Chathura": {
				"category": "sans-serif",
				"variants": "100,300,400,700,800",
				"subsets": "latin,telugu"
			},
			"Chau Philomene One": {
				"category": "sans-serif",
				"variants": "400,400i",
				"subsets": "latin,latin-ext"
			},
			"Chela One": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Chelsea Market": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Chenla": {
				"category": "display",
				"variants": "400",
				"subsets": "khmer"
			},
			"Cherish": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Cherry Bomb One": {
				"category": "display",
				"variants": "400",
				"subsets": "japanese,latin,latin-ext,vietnamese"
			},
			"Cherry Cream Soda": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Cherry Swash": {
				"category": "display",
				"variants": "400,700",
				"subsets": "latin,latin-ext"
			},
			"Chewy": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Chicle": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Chilanka": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,malayalam"
			},
			"Chivo": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Chivo Mono": {
				"category": "monospace",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Chocolate Classical Sans": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "chinese-hongkong,cyrillic,latin,latin-ext,vietnamese"
			},
			"Chokokutai": {
				"category": "display",
				"variants": "400",
				"subsets": "japanese,latin,latin-ext,vietnamese"
			},
			"Chonburi": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext,thai,vietnamese"
			},
			"Cinzel": {
				"category": "serif",
				"variants": "400,500,600,700,800,900",
				"subsets": "latin,latin-ext"
			},
			"Cinzel Decorative": {
				"category": "display",
				"variants": "400,700,900",
				"subsets": "latin"
			},
			"Clicker Script": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Climate Crisis": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Coda": {
				"category": "display",
				"variants": "400,800",
				"subsets": "latin,latin-ext"
			},
			"Codystar": {
				"category": "display",
				"variants": "300,400",
				"subsets": "latin,latin-ext"
			},
			"Coiny": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext,tamil,vietnamese"
			},
			"Combo": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Comfortaa": {
				"category": "display",
				"variants": "300,400,500,600,700",
				"subsets": "cyrillic,cyrillic-ext,greek,latin,latin-ext,vietnamese"
			},
			"Comforter": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "cyrillic,latin,latin-ext,vietnamese"
			},
			"Comforter Brush": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "cyrillic,latin,latin-ext,vietnamese"
			},
			"Comic Neue": {
				"category": "handwriting",
				"variants": "300,300i,400,400i,700,700i",
				"subsets": "latin"
			},
			"Coming Soon": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Comme": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext"
			},
			"Commissioner": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "cyrillic,cyrillic-ext,greek,latin,latin-ext,vietnamese"
			},
			"Concert One": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Condiment": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Content": {
				"category": "display",
				"variants": "400,700",
				"subsets": "khmer"
			},
			"Contrail One": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Convergence": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Cookie": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Copse": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Corben": {
				"category": "display",
				"variants": "400,700",
				"subsets": "latin,latin-ext"
			},
			"Corinthia": {
				"category": "handwriting",
				"variants": "400,700",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Cormorant": {
				"category": "serif",
				"variants": "300,400,500,600,700,300i,400i,500i,600i,700i",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Cormorant Garamond": {
				"category": "serif",
				"variants": "300,300i,400,400i,500,500i,600,600i,700,700i",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Cormorant Infant": {
				"category": "serif",
				"variants": "300,300i,400,400i,500,500i,600,600i,700,700i",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Cormorant SC": {
				"category": "serif",
				"variants": "300,400,500,600,700",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Cormorant Unicase": {
				"category": "serif",
				"variants": "300,400,500,600,700",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Cormorant Upright": {
				"category": "serif",
				"variants": "300,400,500,600,700",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Courgette": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Courier Prime": {
				"category": "monospace",
				"variants": "400,400i,700,700i",
				"subsets": "latin,latin-ext"
			},
			"Cousine": {
				"category": "monospace",
				"variants": "400,400i,700,700i",
				"subsets": "cyrillic,cyrillic-ext,greek,greek-ext,hebrew,latin,latin-ext,vietnamese"
			},
			"Coustard": {
				"category": "serif",
				"variants": "400,900",
				"subsets": "latin"
			},
			"Covered By Your Grace": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Crafty Girls": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Creepster": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Crete Round": {
				"category": "serif",
				"variants": "400,400i",
				"subsets": "latin,latin-ext"
			},
			"Crimson Pro": {
				"category": "serif",
				"variants": "200,300,400,500,600,700,800,900,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Crimson Text": {
				"category": "serif",
				"variants": "400,400i,600,600i,700,700i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Croissant One": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Crushed": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Cuprum": {
				"category": "sans-serif",
				"variants": "400,500,600,700,400i,500i,600i,700i",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Cute Font": {
				"category": "display",
				"variants": "400",
				"subsets": "korean,latin"
			},
			"Cutive": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Cutive Mono": {
				"category": "monospace",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"DM Mono": {
				"category": "monospace",
				"variants": "300,300i,400,400i,500,500i",
				"subsets": "latin,latin-ext"
			},
			"DM Sans": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "latin,latin-ext"
			},
			"DM Serif Display": {
				"category": "serif",
				"variants": "400,400i",
				"subsets": "latin,latin-ext"
			},
			"DM Serif Text": {
				"category": "serif",
				"variants": "400,400i",
				"subsets": "latin,latin-ext"
			},
			"Dai Banna SIL": {
				"category": "serif",
				"variants": "300,300i,400,400i,500,500i,600,600i,700,700i",
				"subsets": "latin,latin-ext,new-tai-lue"
			},
			"Damion": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Dancing Script": {
				"category": "handwriting",
				"variants": "400,500,600,700",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Danfo": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Dangrek": {
				"category": "display",
				"variants": "400",
				"subsets": "khmer,latin"
			},
			"Darker Grotesque": {
				"category": "sans-serif",
				"variants": "300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Darumadrop One": {
				"category": "display",
				"variants": "400",
				"subsets": "japanese,latin,latin-ext"
			},
			"David Libre": {
				"category": "serif",
				"variants": "400,500,700",
				"subsets": "hebrew,latin,latin-ext,math,symbols,vietnamese"
			},
			"Dawning of a New Day": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Days One": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Dekko": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Dela Gothic One": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,greek,japanese,latin,latin-ext,vietnamese"
			},
			"Delicious Handrawn": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Delius": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Delius Swash Caps": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Delius Unicase": {
				"category": "handwriting",
				"variants": "400,700",
				"subsets": "latin"
			},
			"Della Respira": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Denk One": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Devonshire": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Dhurjati": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,telugu"
			},
			"Didact Gothic": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext"
			},
			"Diphylleia": {
				"category": "serif",
				"variants": "400",
				"subsets": "korean,latin,latin-ext"
			},
			"Diplomata": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Diplomata SC": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Do Hyeon": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "korean,latin"
			},
			"Dokdo": {
				"category": "display",
				"variants": "400",
				"subsets": "korean,latin"
			},
			"Domine": {
				"category": "serif",
				"variants": "400,500,600,700",
				"subsets": "latin,latin-ext"
			},
			"Donegal One": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Dongle": {
				"category": "sans-serif",
				"variants": "300,400,700",
				"subsets": "korean,latin,latin-ext,vietnamese"
			},
			"Doppio One": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Dorsa": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Dosis": {
				"category": "sans-serif",
				"variants": "200,300,400,500,600,700,800",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"DotGothic16": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "cyrillic,japanese,latin,latin-ext"
			},
			"Dr Sugiyama": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Duru Sans": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"DynaPuff": {
				"category": "display",
				"variants": "400,500,600,700",
				"subsets": "cyrillic-ext,latin,latin-ext"
			},
			"Dynalight": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"EB Garamond": {
				"category": "serif",
				"variants": "400,500,600,700,800,400i,500i,600i,700i,800i",
				"subsets": "cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese"
			},
			"Eagle Lake": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"East Sea Dokdo": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "korean,latin"
			},
			"Eater": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Economica": {
				"category": "sans-serif",
				"variants": "400,400i,700,700i",
				"subsets": "latin,latin-ext"
			},
			"Eczar": {
				"category": "serif",
				"variants": "400,500,600,700,800",
				"subsets": "devanagari,greek,greek-ext,latin,latin-ext"
			},
			"Edu AU VIC WA NT Hand": {
				"category": "handwriting",
				"variants": "400,500,600,700",
				"subsets": "latin,latin-ext"
			},
			"Edu NSW ACT Foundation": {
				"category": "handwriting",
				"variants": "400,500,600,700",
				"subsets": "latin"
			},
			"Edu QLD Beginner": {
				"category": "handwriting",
				"variants": "400,500,600,700",
				"subsets": "latin"
			},
			"Edu SA Beginner": {
				"category": "handwriting",
				"variants": "400,500,600,700",
				"subsets": "latin"
			},
			"Edu TAS Beginner": {
				"category": "handwriting",
				"variants": "400,500,600,700",
				"subsets": "latin"
			},
			"Edu VIC WA NT Beginner": {
				"category": "handwriting",
				"variants": "400,500,600,700",
				"subsets": "latin"
			},
			"El Messiri": {
				"category": "sans-serif",
				"variants": "400,500,600,700",
				"subsets": "arabic,cyrillic,latin,latin-ext"
			},
			"Electrolize": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Elsie": {
				"category": "display",
				"variants": "400,900",
				"subsets": "latin,latin-ext"
			},
			"Elsie Swash Caps": {
				"category": "display",
				"variants": "400,900",
				"subsets": "latin,latin-ext"
			},
			"Emblema One": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Emilys Candy": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Encode Sans": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Encode Sans Condensed": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Encode Sans Expanded": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Encode Sans SC": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Encode Sans Semi Condensed": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Encode Sans Semi Expanded": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Engagement": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Englebert": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Enriqueta": {
				"category": "serif",
				"variants": "400,500,600,700",
				"subsets": "latin,latin-ext"
			},
			"Ephesis": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Epilogue": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Erica One": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Esteban": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Estonia": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Euphoria Script": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Ewert": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Exo": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Exo 2": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Expletus Sans": {
				"category": "display",
				"variants": "400,500,600,700,400i,500i,600i,700i",
				"subsets": "latin,latin-ext"
			},
			"Explora": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "cherokee,latin,latin-ext,vietnamese"
			},
			"Fahkwang": {
				"category": "sans-serif",
				"variants": "200,200i,300,300i,400,400i,500,500i,600,600i,700,700i",
				"subsets": "latin,latin-ext,thai,vietnamese"
			},
			"Familjen Grotesk": {
				"category": "sans-serif",
				"variants": "400,500,600,700,400i,500i,600i,700i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Fanwood Text": {
				"category": "serif",
				"variants": "400,400i",
				"subsets": "latin"
			},
			"Farro": {
				"category": "sans-serif",
				"variants": "300,400,500,700",
				"subsets": "latin,latin-ext"
			},
			"Farsan": {
				"category": "display",
				"variants": "400",
				"subsets": "gujarati,latin,latin-ext,vietnamese"
			},
			"Fascinate": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Fascinate Inline": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Faster One": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Fasthand": {
				"category": "display",
				"variants": "400",
				"subsets": "khmer,latin"
			},
			"Fauna One": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Faustina": {
				"category": "serif",
				"variants": "300,400,500,600,700,800,300i,400i,500i,600i,700i,800i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Federant": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Federo": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Felipa": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Fenix": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Festive": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Figtree": {
				"category": "sans-serif",
				"variants": "300,400,500,600,700,800,900,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "latin,latin-ext"
			},
			"Finger Paint": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Finlandica": {
				"category": "sans-serif",
				"variants": "400,500,600,700,400i,500i,600i,700i",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext"
			},
			"Fira Code": {
				"category": "monospace",
				"variants": "300,400,500,600,700",
				"subsets": "cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext"
			},
			"Fira Mono": {
				"category": "monospace",
				"variants": "400,500,700",
				"subsets": "cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext"
			},
			"Fira Sans": {
				"category": "sans-serif",
				"variants": "100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i",
				"subsets": "cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese"
			},
			"Fira Sans Condensed": {
				"category": "sans-serif",
				"variants": "100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i",
				"subsets": "cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese"
			},
			"Fira Sans Extra Condensed": {
				"category": "sans-serif",
				"variants": "100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i",
				"subsets": "cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese"
			},
			"Fjalla One": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Fjord One": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Flamenco": {
				"category": "display",
				"variants": "300,400",
				"subsets": "latin"
			},
			"Flavors": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Fleur De Leah": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Flow Block": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Flow Circular": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Flow Rounded": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Foldit": {
				"category": "display",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Fondamento": {
				"category": "handwriting",
				"variants": "400,400i",
				"subsets": "latin,latin-ext"
			},
			"Fontdiner Swanky": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Forum": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext"
			},
			"Fragment Mono": {
				"category": "monospace",
				"variants": "400,400i",
				"subsets": "cyrillic-ext,latin,latin-ext"
			},
			"Francois One": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Frank Ruhl Libre": {
				"category": "serif",
				"variants": "300,400,500,600,700,800,900",
				"subsets": "hebrew,latin,latin-ext"
			},
			"Fraunces": {
				"category": "serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Freckle Face": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Fredericka the Great": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Fredoka": {
				"category": "sans-serif",
				"variants": "300,400,500,600,700",
				"subsets": "hebrew,latin,latin-ext"
			},
			"Freehand": {
				"category": "display",
				"variants": "400",
				"subsets": "khmer,latin"
			},
			"Freeman": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Fresca": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Frijole": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Fruktur": {
				"category": "display",
				"variants": "400,400i",
				"subsets": "cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Fugaz One": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Fuggles": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Fustat": {
				"category": "sans-serif",
				"variants": "200,300,400,500,600,700,800",
				"subsets": "arabic,latin,latin-ext"
			},
			"Fuzzy Bubbles": {
				"category": "handwriting",
				"variants": "400,700",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"GFS Didot": {
				"category": "serif",
				"variants": "400",
				"subsets": "greek"
			},
			"GFS Neohellenic": {
				"category": "sans-serif",
				"variants": "400,400i,700,700i",
				"subsets": "greek"
			},
			"Ga Maamli": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Gabarito": {
				"category": "display",
				"variants": "400,500,600,700,800,900",
				"subsets": "latin,latin-ext"
			},
			"Gabriela": {
				"category": "serif",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext"
			},
			"Gaegu": {
				"category": "handwriting",
				"variants": "300,400,700",
				"subsets": "korean,latin"
			},
			"Gafata": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Gajraj One": {
				"category": "display",
				"variants": "400",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Galada": {
				"category": "display",
				"variants": "400",
				"subsets": "bengali,latin"
			},
			"Galdeano": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Galindo": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Gamja Flower": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "korean,latin"
			},
			"Gantari": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "latin,latin-ext"
			},
			"Gasoek One": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "korean,latin,latin-ext"
			},
			"Gayathri": {
				"category": "sans-serif",
				"variants": "100,400,700",
				"subsets": "latin,malayalam"
			},
			"Gelasio": {
				"category": "serif",
				"variants": "400,500,600,700,400i,500i,600i,700i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Gemunu Libre": {
				"category": "sans-serif",
				"variants": "200,300,400,500,600,700,800",
				"subsets": "latin,latin-ext,sinhala"
			},
			"Genos": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "cherokee,latin,latin-ext,vietnamese"
			},
			"Gentium Book Plus": {
				"category": "serif",
				"variants": "400,400i,700,700i",
				"subsets": "cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese"
			},
			"Gentium Plus": {
				"category": "serif",
				"variants": "400,400i,700,700i",
				"subsets": "cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese"
			},
			"Geo": {
				"category": "sans-serif",
				"variants": "400,400i",
				"subsets": "latin"
			},
			"Geologica": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "cyrillic,cyrillic-ext,greek,latin,latin-ext,vietnamese"
			},
			"Georama": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Geostar": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Geostar Fill": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Germania One": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Gideon Roman": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Gidugu": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,telugu"
			},
			"Gilda Display": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Girassol": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Give You Glory": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Glass Antiqua": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Glegoo": {
				"category": "serif",
				"variants": "400,700",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Gloock": {
				"category": "serif",
				"variants": "400",
				"subsets": "cyrillic-ext,latin,latin-ext"
			},
			"Gloria Hallelujah": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Glory": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,100i,200i,300i,400i,500i,600i,700i,800i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Gluten": {
				"category": "display",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Goblin One": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Gochi Hand": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Goldman": {
				"category": "display",
				"variants": "400,700",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Golos Text": {
				"category": "sans-serif",
				"variants": "400,500,600,700,800,900",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext"
			},
			"Gorditas": {
				"category": "display",
				"variants": "400,700",
				"subsets": "latin"
			},
			"Gothic A1": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "korean,latin"
			},
			"Gotu": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "devanagari,latin,latin-ext,vietnamese"
			},
			"Goudy Bookletter 1911": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Gowun Batang": {
				"category": "serif",
				"variants": "400,700",
				"subsets": "korean,latin,latin-ext,vietnamese"
			},
			"Gowun Dodum": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "korean,latin,latin-ext,vietnamese"
			},
			"Graduate": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Grand Hotel": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Grandiflora One": {
				"category": "serif",
				"variants": "400",
				"subsets": "korean,latin,latin-ext"
			},
			"Grandstander": {
				"category": "display",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Grape Nuts": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Gravitas One": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Great Vibes": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,greek-ext,latin,latin-ext,vietnamese"
			},
			"Grechen Fuemen": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Grenze": {
				"category": "serif",
				"variants": "100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Grenze Gotisch": {
				"category": "display",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Grey Qo": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Griffy": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Gruppo": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Gudea": {
				"category": "sans-serif",
				"variants": "400,400i,700",
				"subsets": "latin,latin-ext"
			},
			"Gugi": {
				"category": "display",
				"variants": "400",
				"subsets": "korean,latin"
			},
			"Gulzar": {
				"category": "serif",
				"variants": "400",
				"subsets": "arabic,latin,latin-ext"
			},
			"Gupter": {
				"category": "serif",
				"variants": "400,500,700",
				"subsets": "latin"
			},
			"Gurajada": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,telugu"
			},
			"Gwendolyn": {
				"category": "handwriting",
				"variants": "400,700",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Habibi": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Hachi Maru Pop": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "cyrillic,japanese,latin,latin-ext"
			},
			"Hahmlet": {
				"category": "serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "korean,latin,latin-ext,vietnamese"
			},
			"Halant": {
				"category": "serif",
				"variants": "300,400,500,600,700",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Hammersmith One": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Hanalei": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Hanalei Fill": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Handjet": {
				"category": "display",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "arabic,armenian,cyrillic,cyrillic-ext,greek,hebrew,latin,latin-ext,vietnamese"
			},
			"Handlee": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Hanken Grotesk": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Hanuman": {
				"category": "serif",
				"variants": "100,300,400,700,900",
				"subsets": "khmer,latin"
			},
			"Happy Monkey": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Harmattan": {
				"category": "sans-serif",
				"variants": "400,500,600,700",
				"subsets": "arabic,latin,latin-ext"
			},
			"Headland One": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Hedvig Letters Sans": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,math,symbols"
			},
			"Hedvig Letters Serif": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,latin-ext,math,symbols"
			},
			"Heebo": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "hebrew,latin,latin-ext,math,symbols"
			},
			"Henny Penny": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Hepta Slab": {
				"category": "serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Herr Von Muellerhoff": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Hi Melody": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "korean,latin"
			},
			"Hina Mincho": {
				"category": "serif",
				"variants": "400",
				"subsets": "cyrillic,japanese,latin,latin-ext,vietnamese"
			},
			"Hind": {
				"category": "sans-serif",
				"variants": "300,400,500,600,700",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Hind Guntur": {
				"category": "sans-serif",
				"variants": "300,400,500,600,700",
				"subsets": "latin,latin-ext,telugu"
			},
			"Hind Madurai": {
				"category": "sans-serif",
				"variants": "300,400,500,600,700",
				"subsets": "latin,latin-ext,tamil"
			},
			"Hind Siliguri": {
				"category": "sans-serif",
				"variants": "300,400,500,600,700",
				"subsets": "bengali,latin,latin-ext"
			},
			"Hind Vadodara": {
				"category": "sans-serif",
				"variants": "300,400,500,600,700",
				"subsets": "gujarati,latin,latin-ext"
			},
			"Holtwood One SC": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Homemade Apple": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Homenaje": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Honk": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext,math,symbols,vietnamese"
			},
			"Hubballi": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "kannada,latin,latin-ext"
			},
			"Hurricane": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"IBM Plex Mono": {
				"category": "monospace",
				"variants": "100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"IBM Plex Sans": {
				"category": "sans-serif",
				"variants": "100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i",
				"subsets": "cyrillic,cyrillic-ext,greek,latin,latin-ext,vietnamese"
			},
			"IBM Plex Sans Arabic": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700",
				"subsets": "arabic,cyrillic-ext,latin,latin-ext"
			},
			"IBM Plex Sans Condensed": {
				"category": "sans-serif",
				"variants": "100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i",
				"subsets": "cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"IBM Plex Sans Devanagari": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700",
				"subsets": "cyrillic-ext,devanagari,latin,latin-ext"
			},
			"IBM Plex Sans Hebrew": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700",
				"subsets": "cyrillic-ext,hebrew,latin,latin-ext"
			},
			"IBM Plex Sans JP": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700",
				"subsets": "cyrillic,japanese,latin,latin-ext"
			},
			"IBM Plex Sans KR": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700",
				"subsets": "korean,latin,latin-ext"
			},
			"IBM Plex Sans Thai": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700",
				"subsets": "cyrillic-ext,latin,latin-ext,thai"
			},
			"IBM Plex Sans Thai Looped": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700",
				"subsets": "cyrillic-ext,latin,latin-ext,thai"
			},
			"IBM Plex Serif": {
				"category": "serif",
				"variants": "100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"IM Fell DW Pica": {
				"category": "serif",
				"variants": "400,400i",
				"subsets": "latin"
			},
			"IM Fell DW Pica SC": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin"
			},
			"IM Fell Double Pica": {
				"category": "serif",
				"variants": "400,400i",
				"subsets": "latin"
			},
			"IM Fell Double Pica SC": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin"
			},
			"IM Fell English": {
				"category": "serif",
				"variants": "400,400i",
				"subsets": "latin"
			},
			"IM Fell English SC": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin"
			},
			"IM Fell French Canon": {
				"category": "serif",
				"variants": "400,400i",
				"subsets": "latin"
			},
			"IM Fell French Canon SC": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin"
			},
			"IM Fell Great Primer": {
				"category": "serif",
				"variants": "400,400i",
				"subsets": "latin"
			},
			"IM Fell Great Primer SC": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Ibarra Real Nova": {
				"category": "serif",
				"variants": "400,500,600,700,400i,500i,600i,700i",
				"subsets": "latin,latin-ext"
			},
			"Iceberg": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Iceland": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Imbue": {
				"category": "serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Imperial Script": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Imprima": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Inclusive Sans": {
				"category": "sans-serif",
				"variants": "400,400i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Inconsolata": {
				"category": "monospace",
				"variants": "200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Inder": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Indie Flower": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Ingrid Darling": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Inika": {
				"category": "serif",
				"variants": "400,700",
				"subsets": "latin,latin-ext"
			},
			"Inknut Antiqua": {
				"category": "serif",
				"variants": "300,400,500,600,700,800,900",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Inria Sans": {
				"category": "sans-serif",
				"variants": "300,300i,400,400i,700,700i",
				"subsets": "latin,latin-ext"
			},
			"Inria Serif": {
				"category": "serif",
				"variants": "300,300i,400,400i,700,700i",
				"subsets": "latin,latin-ext"
			},
			"Inspiration": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Instrument Sans": {
				"category": "sans-serif",
				"variants": "400,500,600,700,400i,500i,600i,700i",
				"subsets": "latin,latin-ext"
			},
			"Instrument Serif": {
				"category": "serif",
				"variants": "400,400i",
				"subsets": "latin,latin-ext"
			},
			"Inter": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese"
			},
			"Inter Tight": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese"
			},
			"Irish Grover": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Island Moments": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Istok Web": {
				"category": "sans-serif",
				"variants": "400,400i,700,700i",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext"
			},
			"Italiana": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Italianno": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Itim": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,thai,vietnamese"
			},
			"Jacquard 12": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext,math,symbols"
			},
			"Jacquard 12 Charted": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext,math,symbols"
			},
			"Jacquard 24": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Jacquard 24 Charted": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Jacquarda Bastarda 9": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext,math,symbols"
			},
			"Jacquarda Bastarda 9 Charted": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext,math,symbols"
			},
			"Jacques Francois": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Jacques Francois Shadow": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Jaini": {
				"category": "display",
				"variants": "400",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Jaini Purva": {
				"category": "display",
				"variants": "400",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Jaldi": {
				"category": "sans-serif",
				"variants": "400,700",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Jaro": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Jersey 10": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Jersey 10 Charted": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Jersey 15": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Jersey 15 Charted": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Jersey 20": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Jersey 20 Charted": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Jersey 25": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Jersey 25 Charted": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"JetBrains Mono": {
				"category": "monospace",
				"variants": "100,200,300,400,500,600,700,800,100i,200i,300i,400i,500i,600i,700i,800i",
				"subsets": "cyrillic,cyrillic-ext,greek,latin,latin-ext,vietnamese"
			},
			"Jim Nightshade": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Joan": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Jockey One": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Jolly Lodger": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Jomhuria": {
				"category": "display",
				"variants": "400",
				"subsets": "arabic,latin,latin-ext"
			},
			"Jomolhari": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,tibetan"
			},
			"Josefin Sans": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,100i,200i,300i,400i,500i,600i,700i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Josefin Slab": {
				"category": "serif",
				"variants": "100,200,300,400,500,600,700,100i,200i,300i,400i,500i,600i,700i",
				"subsets": "latin"
			},
			"Jost": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "cyrillic,latin,latin-ext"
			},
			"Joti One": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Jua": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "korean,latin"
			},
			"Judson": {
				"category": "serif",
				"variants": "400,400i,700",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Julee": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Julius Sans One": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Junge": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Jura": {
				"category": "sans-serif",
				"variants": "300,400,500,600,700",
				"subsets": "cyrillic,cyrillic-ext,greek,greek-ext,kayah-li,latin,latin-ext,vietnamese"
			},
			"Just Another Hand": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Just Me Again Down Here": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"K2D": {
				"category": "sans-serif",
				"variants": "100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i",
				"subsets": "latin,latin-ext,thai,vietnamese"
			},
			"Kablammo": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Kadwa": {
				"category": "serif",
				"variants": "400,700",
				"subsets": "devanagari,latin"
			},
			"Kaisei Decol": {
				"category": "serif",
				"variants": "400,500,700",
				"subsets": "cyrillic,japanese,latin,latin-ext"
			},
			"Kaisei HarunoUmi": {
				"category": "serif",
				"variants": "400,500,700",
				"subsets": "cyrillic,japanese,latin,latin-ext"
			},
			"Kaisei Opti": {
				"category": "serif",
				"variants": "400,500,700",
				"subsets": "cyrillic,japanese,latin,latin-ext"
			},
			"Kaisei Tokumin": {
				"category": "serif",
				"variants": "400,500,700,800",
				"subsets": "cyrillic,japanese,latin,latin-ext"
			},
			"Kalam": {
				"category": "handwriting",
				"variants": "300,400,700",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Kalnia": {
				"category": "serif",
				"variants": "100,200,300,400,500,600,700",
				"subsets": "latin,latin-ext,math"
			},
			"Kalnia Glaze": {
				"category": "display",
				"variants": "100,200,300,400,500,600,700",
				"subsets": "latin,latin-ext"
			},
			"Kameron": {
				"category": "serif",
				"variants": "400,500,600,700",
				"subsets": "latin,latin-ext"
			},
			"Kanit": {
				"category": "sans-serif",
				"variants": "100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i",
				"subsets": "latin,latin-ext,thai,vietnamese"
			},
			"Kantumruy Pro": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,100i,200i,300i,400i,500i,600i,700i",
				"subsets": "khmer,latin,latin-ext"
			},
			"Karantina": {
				"category": "display",
				"variants": "300,400,700",
				"subsets": "hebrew,latin,latin-ext"
			},
			"Karla": {
				"category": "sans-serif",
				"variants": "200,300,400,500,600,700,800,200i,300i,400i,500i,600i,700i,800i",
				"subsets": "latin,latin-ext"
			},
			"Karma": {
				"category": "serif",
				"variants": "300,400,500,600,700",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Katibeh": {
				"category": "display",
				"variants": "400",
				"subsets": "arabic,latin,latin-ext"
			},
			"Kaushan Script": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Kavivanar": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,tamil"
			},
			"Kavoon": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Kay Pho Du": {
				"category": "serif",
				"variants": "400,500,600,700",
				"subsets": "kayah-li,latin,latin-ext"
			},
			"Kdam Thmor Pro": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "khmer,latin,latin-ext"
			},
			"Keania One": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Kelly Slab": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,latin,latin-ext"
			},
			"Kenia": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Khand": {
				"category": "sans-serif",
				"variants": "300,400,500,600,700",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Khmer": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "khmer"
			},
			"Khula": {
				"category": "sans-serif",
				"variants": "300,400,600,700,800",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Kings": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Kirang Haerang": {
				"category": "display",
				"variants": "400",
				"subsets": "korean,latin"
			},
			"Kite One": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Kiwi Maru": {
				"category": "serif",
				"variants": "300,400,500",
				"subsets": "cyrillic,japanese,latin,latin-ext"
			},
			"Klee One": {
				"category": "handwriting",
				"variants": "400,600",
				"subsets": "cyrillic,greek-ext,japanese,latin,latin-ext"
			},
			"Knewave": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"KoHo": {
				"category": "sans-serif",
				"variants": "200,200i,300,300i,400,400i,500,500i,600,600i,700,700i",
				"subsets": "latin,latin-ext,thai,vietnamese"
			},
			"Kodchasan": {
				"category": "sans-serif",
				"variants": "200,200i,300,300i,400,400i,500,500i,600,600i,700,700i",
				"subsets": "latin,latin-ext,thai,vietnamese"
			},
			"Kode Mono": {
				"category": "monospace",
				"variants": "400,500,600,700",
				"subsets": "latin,latin-ext"
			},
			"Koh Santepheap": {
				"category": "serif",
				"variants": "100,300,400,700,900",
				"subsets": "khmer,latin"
			},
			"Kolker Brush": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Konkhmer Sleokchher": {
				"category": "display",
				"variants": "400",
				"subsets": "khmer,latin,latin-ext"
			},
			"Kosugi": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "cyrillic,japanese,latin,latin-ext"
			},
			"Kosugi Maru": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "cyrillic,japanese,latin,latin-ext"
			},
			"Kotta One": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Koulen": {
				"category": "display",
				"variants": "400",
				"subsets": "khmer,latin"
			},
			"Kranky": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Kreon": {
				"category": "serif",
				"variants": "300,400,500,600,700",
				"subsets": "latin,latin-ext"
			},
			"Kristi": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Krona One": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Krub": {
				"category": "sans-serif",
				"variants": "200,200i,300,300i,400,400i,500,500i,600,600i,700,700i",
				"subsets": "latin,latin-ext,thai,vietnamese"
			},
			"Kufam": {
				"category": "sans-serif",
				"variants": "400,500,600,700,800,900,400i,500i,600i,700i,800i,900i",
				"subsets": "arabic,latin,latin-ext,vietnamese"
			},
			"Kulim Park": {
				"category": "sans-serif",
				"variants": "200,200i,300,300i,400,400i,600,600i,700,700i",
				"subsets": "latin,latin-ext"
			},
			"Kumar One": {
				"category": "display",
				"variants": "400",
				"subsets": "gujarati,latin,latin-ext"
			},
			"Kumar One Outline": {
				"category": "display",
				"variants": "400",
				"subsets": "gujarati,latin,latin-ext"
			},
			"Kumbh Sans": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,math,symbols"
			},
			"Kurale": {
				"category": "serif",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,devanagari,latin,latin-ext"
			},
			"LXGW WenKai Mono TC": {
				"category": "monospace",
				"variants": "300,400,700",
				"subsets": "chinese-hongkong,cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,lisu,vietnamese"
			},
			"LXGW WenKai TC": {
				"category": "handwriting",
				"variants": "300,400,700",
				"subsets": "chinese-hongkong,cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,lisu,vietnamese"
			},
			"La Belle Aurore": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Labrada": {
				"category": "serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Lacquer": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Laila": {
				"category": "sans-serif",
				"variants": "300,400,500,600,700",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Lakki Reddy": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,telugu"
			},
			"Lalezar": {
				"category": "display",
				"variants": "400",
				"subsets": "arabic,latin,latin-ext,vietnamese"
			},
			"Lancelot": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Langar": {
				"category": "display",
				"variants": "400",
				"subsets": "gurmukhi,latin,latin-ext"
			},
			"Lateef": {
				"category": "serif",
				"variants": "200,300,400,500,600,700,800",
				"subsets": "arabic,latin,latin-ext"
			},
			"Lato": {
				"category": "sans-serif",
				"variants": "100,100i,300,300i,400,400i,700,700i,900,900i",
				"subsets": "latin,latin-ext"
			},
			"Lavishly Yours": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"League Gothic": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"League Script": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"League Spartan": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Leckerli One": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Ledger": {
				"category": "serif",
				"variants": "400",
				"subsets": "cyrillic,latin,latin-ext"
			},
			"Lekton": {
				"category": "monospace",
				"variants": "400,400i,700",
				"subsets": "latin,latin-ext"
			},
			"Lemon": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Lemonada": {
				"category": "display",
				"variants": "300,400,500,600,700",
				"subsets": "arabic,latin,latin-ext,vietnamese"
			},
			"Lexend": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Lexend Deca": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Lexend Exa": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Lexend Giga": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Lexend Mega": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Lexend Peta": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Lexend Tera": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Lexend Zetta": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Libre Barcode 128": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Libre Barcode 128 Text": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Libre Barcode 39": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Libre Barcode 39 Extended": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Libre Barcode 39 Extended Text": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Libre Barcode 39 Text": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Libre Barcode EAN13 Text": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Libre Baskerville": {
				"category": "serif",
				"variants": "400,400i,700",
				"subsets": "latin,latin-ext"
			},
			"Libre Bodoni": {
				"category": "serif",
				"variants": "400,500,600,700,400i,500i,600i,700i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Libre Caslon Display": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Libre Caslon Text": {
				"category": "serif",
				"variants": "400,400i,700",
				"subsets": "latin,latin-ext"
			},
			"Libre Franklin": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Licorice": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Life Savers": {
				"category": "display",
				"variants": "400,700,800",
				"subsets": "latin,latin-ext"
			},
			"Lilita One": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Lily Script One": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Limelight": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Linden Hill": {
				"category": "serif",
				"variants": "400,400i",
				"subsets": "latin"
			},
			"Linefont": {
				"category": "display",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin"
			},
			"Lisu Bosa": {
				"category": "serif",
				"variants": "200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i",
				"subsets": "latin,latin-ext,lisu"
			},
			"Literata": {
				"category": "serif",
				"variants": "200,300,400,500,600,700,800,900,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese"
			},
			"Liu Jian Mao Cao": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "chinese-simplified,latin"
			},
			"Livvic": {
				"category": "sans-serif",
				"variants": "100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,900,900i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Lobster": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Lobster Two": {
				"category": "display",
				"variants": "400,400i,700,700i",
				"subsets": "latin"
			},
			"Londrina Outline": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Londrina Shadow": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Londrina Sketch": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Londrina Solid": {
				"category": "display",
				"variants": "100,300,400,900",
				"subsets": "latin"
			},
			"Long Cang": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "chinese-simplified,latin"
			},
			"Lora": {
				"category": "serif",
				"variants": "400,500,600,700,400i,500i,600i,700i",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,math,symbols,vietnamese"
			},
			"Love Light": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Love Ya Like A Sister": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Loved by the King": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Lovers Quarrel": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Luckiest Guy": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Lugrasimo": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Lumanosimo": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Lunasima": {
				"category": "sans-serif",
				"variants": "400,700",
				"subsets": "cyrillic,cyrillic-ext,greek,greek-ext,hebrew,latin,latin-ext,vietnamese"
			},
			"Lusitana": {
				"category": "serif",
				"variants": "400,700",
				"subsets": "latin"
			},
			"Lustria": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Luxurious Roman": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Luxurious Script": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"M PLUS 1": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "japanese,latin,latin-ext,vietnamese"
			},
			"M PLUS 1 Code": {
				"category": "monospace",
				"variants": "100,200,300,400,500,600,700",
				"subsets": "japanese,latin,latin-ext,vietnamese"
			},
			"M PLUS 1p": {
				"category": "sans-serif",
				"variants": "100,300,400,500,700,800,900",
				"subsets": "cyrillic,cyrillic-ext,greek,greek-ext,hebrew,japanese,latin,latin-ext,vietnamese"
			},
			"M PLUS 2": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "japanese,latin,latin-ext,vietnamese"
			},
			"M PLUS Code Latin": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"M PLUS Rounded 1c": {
				"category": "sans-serif",
				"variants": "100,300,400,500,700,800,900",
				"subsets": "cyrillic,cyrillic-ext,greek,greek-ext,hebrew,japanese,latin,latin-ext,vietnamese"
			},
			"Ma Shan Zheng": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "chinese-simplified,latin"
			},
			"Macondo": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Macondo Swash Caps": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Mada": {
				"category": "sans-serif",
				"variants": "200,300,400,500,600,700,800,900",
				"subsets": "arabic,latin,latin-ext"
			},
			"Madimi One": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,math,symbols"
			},
			"Magra": {
				"category": "sans-serif",
				"variants": "400,700",
				"subsets": "latin,latin-ext"
			},
			"Maiden Orange": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Maitree": {
				"category": "serif",
				"variants": "200,300,400,500,600,700",
				"subsets": "latin,latin-ext,thai,vietnamese"
			},
			"Major Mono Display": {
				"category": "monospace",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Mako": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Mali": {
				"category": "handwriting",
				"variants": "200,200i,300,300i,400,400i,500,500i,600,600i,700,700i",
				"subsets": "latin,latin-ext,thai,vietnamese"
			},
			"Mallanna": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,telugu"
			},
			"Maname": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,latin-ext,sinhala,vietnamese"
			},
			"Mandali": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,telugu"
			},
			"Manjari": {
				"category": "sans-serif",
				"variants": "100,400,700",
				"subsets": "latin,latin-ext,malayalam"
			},
			"Manrope": {
				"category": "sans-serif",
				"variants": "200,300,400,500,600,700,800",
				"subsets": "cyrillic,cyrillic-ext,greek,latin,latin-ext,vietnamese"
			},
			"Mansalva": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "greek,latin,latin-ext,vietnamese"
			},
			"Manuale": {
				"category": "serif",
				"variants": "300,400,500,600,700,800,300i,400i,500i,600i,700i,800i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Marcellus": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Marcellus SC": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Marck Script": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "cyrillic,latin,latin-ext"
			},
			"Margarine": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Marhey": {
				"category": "display",
				"variants": "300,400,500,600,700",
				"subsets": "arabic,latin,latin-ext"
			},
			"Markazi Text": {
				"category": "serif",
				"variants": "400,500,600,700",
				"subsets": "arabic,latin,latin-ext,vietnamese"
			},
			"Marko One": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Marmelad": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Martel": {
				"category": "serif",
				"variants": "200,300,400,600,700,800,900",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Martel Sans": {
				"category": "sans-serif",
				"variants": "200,300,400,600,700,800,900",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Martian Mono": {
				"category": "monospace",
				"variants": "100,200,300,400,500,600,700,800",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext"
			},
			"Marvel": {
				"category": "sans-serif",
				"variants": "400,400i,700,700i",
				"subsets": "latin"
			},
			"Mate": {
				"category": "serif",
				"variants": "400,400i",
				"subsets": "latin,latin-ext"
			},
			"Mate SC": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Matemasie": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Material Icons": {
				"category": "monospace",
				"variants": "400",
				"subsets": "latin"
			},
			"Material Icons Outlined": {
				"category": "monospace",
				"variants": "400",
				"subsets": "latin"
			},
			"Material Icons Round": {
				"category": "monospace",
				"variants": "400",
				"subsets": "latin"
			},
			"Material Icons Sharp": {
				"category": "monospace",
				"variants": "400",
				"subsets": "latin"
			},
			"Material Icons Two Tone": {
				"category": "monospace",
				"variants": "400",
				"subsets": "latin"
			},
			"Material Symbols Outlined": {
				"category": "monospace",
				"variants": "100,200,300,400,500,600,700",
				"subsets": "latin"
			},
			"Material Symbols Rounded": {
				"category": "monospace",
				"variants": "100,200,300,400,500,600,700",
				"subsets": "latin"
			},
			"Material Symbols Sharp": {
				"category": "monospace",
				"variants": "100,200,300,400,500,600,700",
				"subsets": "latin"
			},
			"Maven Pro": {
				"category": "sans-serif",
				"variants": "400,500,600,700,800,900",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"McLaren": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Mea Culpa": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Meddon": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"MedievalSharp": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Medula One": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Meera Inimai": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,tamil"
			},
			"Megrim": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Meie Script": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Meow Script": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Merienda": {
				"category": "handwriting",
				"variants": "300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Merriweather": {
				"category": "serif",
				"variants": "300,300i,400,400i,700,700i,900,900i",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Merriweather Sans": {
				"category": "sans-serif",
				"variants": "300,400,500,600,700,800,300i,400i,500i,600i,700i,800i",
				"subsets": "cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Metal": {
				"category": "display",
				"variants": "400",
				"subsets": "khmer,latin"
			},
			"Metal Mania": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Metamorphous": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Metrophobic": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Michroma": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Micro 5": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext,math,symbols"
			},
			"Micro 5 Charted": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext,math,symbols"
			},
			"Milonga": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Miltonian": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Miltonian Tattoo": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Mina": {
				"category": "sans-serif",
				"variants": "400,700",
				"subsets": "bengali,latin,latin-ext"
			},
			"Mingzat": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,lepcha"
			},
			"Miniver": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Miriam Libre": {
				"category": "sans-serif",
				"variants": "400,700",
				"subsets": "hebrew,latin,latin-ext"
			},
			"Mirza": {
				"category": "serif",
				"variants": "400,500,600,700",
				"subsets": "arabic,latin,latin-ext"
			},
			"Miss Fajardose": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Mitr": {
				"category": "sans-serif",
				"variants": "200,300,400,500,600,700",
				"subsets": "latin,latin-ext,thai,vietnamese"
			},
			"Mochiy Pop One": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "japanese,latin"
			},
			"Mochiy Pop P One": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "japanese,latin"
			},
			"Modak": {
				"category": "display",
				"variants": "400",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Modern Antiqua": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Moderustic": {
				"category": "sans-serif",
				"variants": "300,400,500,600,700,800",
				"subsets": "cyrillic,cyrillic-ext,greek,latin,latin-ext"
			},
			"Mogra": {
				"category": "display",
				"variants": "400",
				"subsets": "gujarati,latin,latin-ext"
			},
			"Mohave": {
				"category": "sans-serif",
				"variants": "300,400,500,600,700,300i,400i,500i,600i,700i",
				"subsets": "latin,latin-ext"
			},
			"Moirai One": {
				"category": "display",
				"variants": "400",
				"subsets": "korean,latin,latin-ext"
			},
			"Molengo": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Molle": {
				"category": "handwriting",
				"variants": "400i",
				"subsets": "latin,latin-ext"
			},
			"Monda": {
				"category": "sans-serif",
				"variants": "400,500,600,700",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Monofett": {
				"category": "monospace",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Monomaniac One": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "japanese,latin,latin-ext"
			},
			"Monoton": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Monsieur La Doulaise": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Montaga": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Montagu Slab": {
				"category": "serif",
				"variants": "100,200,300,400,500,600,700",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"MonteCarlo": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Montez": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Montserrat": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Montserrat Alternates": {
				"category": "sans-serif",
				"variants": "100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Montserrat Subrayada": {
				"category": "sans-serif",
				"variants": "400,700",
				"subsets": "latin"
			},
			"Moo Lah Lah": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Mooli": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Moon Dance": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Moul": {
				"category": "display",
				"variants": "400",
				"subsets": "khmer,latin"
			},
			"Moulpali": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "khmer,latin"
			},
			"Mountains of Christmas": {
				"category": "display",
				"variants": "400,700",
				"subsets": "latin"
			},
			"Mouse Memoirs": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Mr Bedfort": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Mr Dafoe": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Mr De Haviland": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Mrs Saint Delafield": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Mrs Sheppards": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Ms Madi": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Mukta": {
				"category": "sans-serif",
				"variants": "200,300,400,500,600,700,800",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Mukta Mahee": {
				"category": "sans-serif",
				"variants": "200,300,400,500,600,700,800",
				"subsets": "gurmukhi,latin,latin-ext"
			},
			"Mukta Malar": {
				"category": "sans-serif",
				"variants": "200,300,400,500,600,700,800",
				"subsets": "latin,latin-ext,tamil"
			},
			"Mukta Vaani": {
				"category": "sans-serif",
				"variants": "200,300,400,500,600,700,800",
				"subsets": "gujarati,latin,latin-ext"
			},
			"Mulish": {
				"category": "sans-serif",
				"variants": "200,300,400,500,600,700,800,900,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Murecho": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "cyrillic,cyrillic-ext,greek,japanese,latin,latin-ext"
			},
			"MuseoModerno": {
				"category": "display",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"My Soul": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Mynerve": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "greek,latin,latin-ext,vietnamese"
			},
			"Mystery Quest": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"NTR": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,telugu"
			},
			"Nabla": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic-ext,latin,latin-ext,math,vietnamese"
			},
			"Namdhinggo": {
				"category": "serif",
				"variants": "400,500,600,700,800",
				"subsets": "latin,latin-ext,limbu"
			},
			"Nanum Brush Script": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "korean,latin"
			},
			"Nanum Gothic": {
				"category": "sans-serif",
				"variants": "400,700,800",
				"subsets": "korean,latin"
			},
			"Nanum Gothic Coding": {
				"category": "handwriting",
				"variants": "400,700",
				"subsets": "korean,latin"
			},
			"Nanum Myeongjo": {
				"category": "serif",
				"variants": "400,700,800",
				"subsets": "korean,latin"
			},
			"Nanum Pen Script": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "korean,latin"
			},
			"Narnoor": {
				"category": "serif",
				"variants": "400,500,600,700,800",
				"subsets": "gunjala-gondi,latin,latin-ext,math,symbols"
			},
			"Neonderthaw": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Nerko One": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Neucha": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "cyrillic,latin"
			},
			"Neuton": {
				"category": "serif",
				"variants": "200,300,400,400i,700,800",
				"subsets": "latin,latin-ext"
			},
			"New Amsterdam": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"New Rocker": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"New Tegomin": {
				"category": "serif",
				"variants": "400",
				"subsets": "japanese,latin,latin-ext"
			},
			"News Cycle": {
				"category": "sans-serif",
				"variants": "400,700",
				"subsets": "latin,latin-ext"
			},
			"Newsreader": {
				"category": "serif",
				"variants": "200,300,400,500,600,700,800,200i,300i,400i,500i,600i,700i,800i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Niconne": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Niramit": {
				"category": "sans-serif",
				"variants": "200,200i,300,300i,400,400i,500,500i,600,600i,700,700i",
				"subsets": "latin,latin-ext,thai,vietnamese"
			},
			"Nixie One": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Nobile": {
				"category": "sans-serif",
				"variants": "400,400i,500,500i,700,700i",
				"subsets": "latin,latin-ext"
			},
			"Nokora": {
				"category": "sans-serif",
				"variants": "100,300,400,700,900",
				"subsets": "khmer,latin"
			},
			"Norican": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Nosifer": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Notable": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Nothing You Could Do": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Noticia Text": {
				"category": "serif",
				"variants": "400,400i,700,700i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Noto Color Emoji": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "emoji"
			},
			"Noto Emoji": {
				"category": "sans-serif",
				"variants": "300,400,500,600,700",
				"subsets": "emoji"
			},
			"Noto Kufi Arabic": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "arabic,latin,latin-ext,math,symbols"
			},
			"Noto Music": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,music"
			},
			"Noto Naskh Arabic": {
				"category": "serif",
				"variants": "400,500,600,700",
				"subsets": "arabic,latin,latin-ext,math,symbols"
			},
			"Noto Nastaliq Urdu": {
				"category": "serif",
				"variants": "400,500,600,700",
				"subsets": "arabic,latin,latin-ext"
			},
			"Noto Rashi Hebrew": {
				"category": "serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "greek-ext,hebrew,latin,latin-ext"
			},
			"Noto Sans": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "cyrillic,cyrillic-ext,devanagari,greek,greek-ext,latin,latin-ext,vietnamese"
			},
			"Noto Sans Adlam": {
				"category": "sans-serif",
				"variants": "400,500,600,700",
				"subsets": "adlam,latin,latin-ext"
			},
			"Noto Sans Adlam Unjoined": {
				"category": "sans-serif",
				"variants": "400,500,600,700",
				"subsets": "adlam,latin,latin-ext"
			},
			"Noto Sans Anatolian Hieroglyphs": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "anatolian-hieroglyphs,latin,latin-ext"
			},
			"Noto Sans Arabic": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "arabic"
			},
			"Noto Sans Armenian": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "armenian,latin,latin-ext"
			},
			"Noto Sans Avestan": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "avestan,latin,latin-ext"
			},
			"Noto Sans Balinese": {
				"category": "sans-serif",
				"variants": "400,500,600,700",
				"subsets": "balinese,latin,latin-ext"
			},
			"Noto Sans Bamum": {
				"category": "sans-serif",
				"variants": "400,500,600,700",
				"subsets": "bamum,latin,latin-ext"
			},
			"Noto Sans Bassa Vah": {
				"category": "sans-serif",
				"variants": "400,500,600,700",
				"subsets": "bassa-vah,latin,latin-ext"
			},
			"Noto Sans Batak": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "batak,latin,latin-ext"
			},
			"Noto Sans Bengali": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "bengali,latin,latin-ext"
			},
			"Noto Sans Bhaiksuki": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "bhaiksuki,latin,latin-ext"
			},
			"Noto Sans Brahmi": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "brahmi,latin,latin-ext,math,symbols"
			},
			"Noto Sans Buginese": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "buginese,latin,latin-ext"
			},
			"Noto Sans Buhid": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "buhid,latin,latin-ext"
			},
			"Noto Sans Canadian Aboriginal": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "canadian-aboriginal,latin,latin-ext,math,symbols"
			},
			"Noto Sans Carian": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "carian,latin,latin-ext"
			},
			"Noto Sans Caucasian Albanian": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "caucasian-albanian,latin,latin-ext"
			},
			"Noto Sans Chakma": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "chakma,latin,latin-ext"
			},
			"Noto Sans Cham": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "cham,latin,latin-ext"
			},
			"Noto Sans Cherokee": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "cherokee,latin,latin-ext"
			},
			"Noto Sans Chorasmian": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "chorasmian,latin,latin-ext,math,symbols"
			},
			"Noto Sans Coptic": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "coptic,latin,latin-ext"
			},
			"Noto Sans Cuneiform": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "cuneiform,latin,latin-ext"
			},
			"Noto Sans Cypriot": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "cypriot,latin,latin-ext"
			},
			"Noto Sans Cypro Minoan": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "cypro-minoan,latin,latin-ext"
			},
			"Noto Sans Deseret": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "deseret,latin,latin-ext"
			},
			"Noto Sans Devanagari": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Noto Sans Display": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese"
			},
			"Noto Sans Duployan": {
				"category": "sans-serif",
				"variants": "400,700",
				"subsets": "duployan,latin,latin-ext"
			},
			"Noto Sans Egyptian Hieroglyphs": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "egyptian-hieroglyphs,latin,latin-ext"
			},
			"Noto Sans Elbasan": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "elbasan,latin,latin-ext"
			},
			"Noto Sans Elymaic": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "elymaic,latin,latin-ext"
			},
			"Noto Sans Ethiopic": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "ethiopic,latin,latin-ext"
			},
			"Noto Sans Georgian": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "cyrillic-ext,georgian,greek-ext,latin,latin-ext,math,symbols"
			},
			"Noto Sans Glagolitic": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "cyrillic-ext,glagolitic,latin,latin-ext,math,symbols"
			},
			"Noto Sans Gothic": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "gothic,latin,latin-ext"
			},
			"Noto Sans Grantha": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "grantha,latin,latin-ext"
			},
			"Noto Sans Gujarati": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "gujarati,latin,latin-ext,math,symbols"
			},
			"Noto Sans Gunjala Gondi": {
				"category": "sans-serif",
				"variants": "400,500,600,700",
				"subsets": "gunjala-gondi,latin,latin-ext"
			},
			"Noto Sans Gurmukhi": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "gurmukhi,latin,latin-ext"
			},
			"Noto Sans HK": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "chinese-hongkong,cyrillic,latin,latin-ext,vietnamese"
			},
			"Noto Sans Hanifi Rohingya": {
				"category": "sans-serif",
				"variants": "400,500,600,700",
				"subsets": "hanifi-rohingya,latin,latin-ext"
			},
			"Noto Sans Hanunoo": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "hanunoo,latin,latin-ext"
			},
			"Noto Sans Hatran": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "hatran,latin,latin-ext"
			},
			"Noto Sans Hebrew": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "cyrillic-ext,greek-ext,hebrew,latin,latin-ext"
			},
			"Noto Sans Imperial Aramaic": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "imperial-aramaic,latin,latin-ext"
			},
			"Noto Sans Indic Siyaq Numbers": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "indic-siyaq-numbers,latin,latin-ext"
			},
			"Noto Sans Inscriptional Pahlavi": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "inscriptional-pahlavi,latin,latin-ext"
			},
			"Noto Sans Inscriptional Parthian": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "inscriptional-parthian,latin,latin-ext"
			},
			"Noto Sans JP": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "cyrillic,japanese,latin,latin-ext,vietnamese"
			},
			"Noto Sans Javanese": {
				"category": "sans-serif",
				"variants": "400,500,600,700",
				"subsets": "javanese,latin,latin-ext"
			},
			"Noto Sans KR": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "cyrillic,korean,latin,latin-ext,vietnamese"
			},
			"Noto Sans Kaithi": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "kaithi,latin,latin-ext"
			},
			"Noto Sans Kannada": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "kannada,latin,latin-ext"
			},
			"Noto Sans Kawi": {
				"category": "sans-serif",
				"variants": "400,500,600,700",
				"subsets": "kawi,latin,latin-ext"
			},
			"Noto Sans Kayah Li": {
				"category": "sans-serif",
				"variants": "400,500,600,700",
				"subsets": "kayah-li,latin,latin-ext"
			},
			"Noto Sans Kharoshthi": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "kharoshthi,latin,latin-ext"
			},
			"Noto Sans Khmer": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "khmer,latin,latin-ext"
			},
			"Noto Sans Khojki": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "khojki,latin,latin-ext"
			},
			"Noto Sans Khudawadi": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "khudawadi,latin,latin-ext"
			},
			"Noto Sans Lao": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "lao,latin,latin-ext"
			},
			"Noto Sans Lao Looped": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "lao,latin,latin-ext"
			},
			"Noto Sans Lepcha": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,lepcha"
			},
			"Noto Sans Limbu": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,limbu"
			},
			"Noto Sans Linear A": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,linear-a"
			},
			"Noto Sans Linear B": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,linear-b"
			},
			"Noto Sans Lisu": {
				"category": "sans-serif",
				"variants": "400,500,600,700",
				"subsets": "latin,latin-ext,lisu"
			},
			"Noto Sans Lycian": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "lycian"
			},
			"Noto Sans Lydian": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,lydian"
			},
			"Noto Sans Mahajani": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,mahajani"
			},
			"Noto Sans Malayalam": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,malayalam"
			},
			"Noto Sans Mandaic": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,mandaic"
			},
			"Noto Sans Manichaean": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,manichaean"
			},
			"Noto Sans Marchen": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,marchen"
			},
			"Noto Sans Masaram Gondi": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,masaram-gondi"
			},
			"Noto Sans Math": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "math"
			},
			"Noto Sans Mayan Numerals": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,mayan-numerals"
			},
			"Noto Sans Medefaidrin": {
				"category": "sans-serif",
				"variants": "400,500,600,700",
				"subsets": "latin,latin-ext,medefaidrin"
			},
			"Noto Sans Meetei Mayek": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,meetei-mayek"
			},
			"Noto Sans Mende Kikakui": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,mende-kikakui"
			},
			"Noto Sans Meroitic": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,meroitic,meroitic-cursive,meroitic-hieroglyphs"
			},
			"Noto Sans Miao": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,miao"
			},
			"Noto Sans Modi": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,modi"
			},
			"Noto Sans Mongolian": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,math,mongolian,symbols"
			},
			"Noto Sans Mono": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese"
			},
			"Noto Sans Mro": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,mro"
			},
			"Noto Sans Multani": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,multani"
			},
			"Noto Sans Myanmar": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "myanmar"
			},
			"Noto Sans NKo": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,nko"
			},
			"Noto Sans NKo Unjoined": {
				"category": "sans-serif",
				"variants": "400,500,600,700",
				"subsets": "latin,latin-ext,nko"
			},
			"Noto Sans Nabataean": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,nabataean"
			},
			"Noto Sans Nag Mundari": {
				"category": "sans-serif",
				"variants": "400,500,600,700",
				"subsets": "latin,latin-ext,nag-mundari"
			},
			"Noto Sans Nandinagari": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,nandinagari"
			},
			"Noto Sans New Tai Lue": {
				"category": "sans-serif",
				"variants": "400,500,600,700",
				"subsets": "latin,latin-ext,new-tai-lue"
			},
			"Noto Sans Newa": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,newa"
			},
			"Noto Sans Nushu": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,nushu"
			},
			"Noto Sans Ogham": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,ogham"
			},
			"Noto Sans Ol Chiki": {
				"category": "sans-serif",
				"variants": "400,500,600,700",
				"subsets": "latin,latin-ext,ol-chiki"
			},
			"Noto Sans Old Hungarian": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,old-hungarian"
			},
			"Noto Sans Old Italic": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,old-italic"
			},
			"Noto Sans Old North Arabian": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,old-north-arabian"
			},
			"Noto Sans Old Permic": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "cyrillic-ext,latin,latin-ext,old-permic"
			},
			"Noto Sans Old Persian": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,old-persian"
			},
			"Noto Sans Old Sogdian": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,old-sogdian"
			},
			"Noto Sans Old South Arabian": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,old-south-arabian"
			},
			"Noto Sans Old Turkic": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,old-turkic"
			},
			"Noto Sans Oriya": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,oriya"
			},
			"Noto Sans Osage": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,osage"
			},
			"Noto Sans Osmanya": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,osmanya"
			},
			"Noto Sans Pahawh Hmong": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,pahawh-hmong"
			},
			"Noto Sans Palmyrene": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,palmyrene"
			},
			"Noto Sans Pau Cin Hau": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,pau-cin-hau"
			},
			"Noto Sans Phags Pa": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "phags-pa"
			},
			"Noto Sans Phoenician": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,phoenician"
			},
			"Noto Sans Psalter Pahlavi": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,psalter-pahlavi"
			},
			"Noto Sans Rejang": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,rejang"
			},
			"Noto Sans Runic": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,runic"
			},
			"Noto Sans SC": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "chinese-simplified,cyrillic,latin,latin-ext,vietnamese"
			},
			"Noto Sans Samaritan": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,samaritan"
			},
			"Noto Sans Saurashtra": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,saurashtra"
			},
			"Noto Sans Sharada": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,sharada"
			},
			"Noto Sans Shavian": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,shavian"
			},
			"Noto Sans Siddham": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,siddham"
			},
			"Noto Sans SignWriting": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,signwriting"
			},
			"Noto Sans Sinhala": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,sinhala"
			},
			"Noto Sans Sogdian": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,sogdian"
			},
			"Noto Sans Sora Sompeng": {
				"category": "sans-serif",
				"variants": "400,500,600,700",
				"subsets": "latin,latin-ext,sora-sompeng"
			},
			"Noto Sans Soyombo": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,soyombo"
			},
			"Noto Sans Sundanese": {
				"category": "sans-serif",
				"variants": "400,500,600,700",
				"subsets": "latin,latin-ext,sundanese"
			},
			"Noto Sans Syloti Nagri": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,syloti-nagri"
			},
			"Noto Sans Symbols": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,symbols"
			},
			"Noto Sans Symbols 2": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "braille,latin,latin-ext,math,mayan-numerals,symbols"
			},
			"Noto Sans Syriac": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,syriac"
			},
			"Noto Sans Syriac Eastern": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,syriac"
			},
			"Noto Sans TC": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "chinese-traditional,cyrillic,latin,latin-ext,vietnamese"
			},
			"Noto Sans Tagalog": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,tagalog"
			},
			"Noto Sans Tagbanwa": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,tagbanwa"
			},
			"Noto Sans Tai Le": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,tai-le"
			},
			"Noto Sans Tai Tham": {
				"category": "sans-serif",
				"variants": "400,500,600,700",
				"subsets": "latin,latin-ext,tai-tham"
			},
			"Noto Sans Tai Viet": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,tai-viet"
			},
			"Noto Sans Takri": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,takri"
			},
			"Noto Sans Tamil": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,tamil"
			},
			"Noto Sans Tamil Supplement": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,tamil-supplement"
			},
			"Noto Sans Tangsa": {
				"category": "sans-serif",
				"variants": "400,500,600,700",
				"subsets": "latin,latin-ext,tangsa"
			},
			"Noto Sans Telugu": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,telugu"
			},
			"Noto Sans Thaana": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,thaana"
			},
			"Noto Sans Thai": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,thai"
			},
			"Noto Sans Thai Looped": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,thai"
			},
			"Noto Sans Tifinagh": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,tifinagh"
			},
			"Noto Sans Tirhuta": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,tirhuta"
			},
			"Noto Sans Ugaritic": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,ugaritic"
			},
			"Noto Sans Vai": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,vai"
			},
			"Noto Sans Vithkuqi": {
				"category": "sans-serif",
				"variants": "400,500,600,700",
				"subsets": "latin,latin-ext,vithkuqi"
			},
			"Noto Sans Wancho": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,wancho"
			},
			"Noto Sans Warang Citi": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,warang-citi"
			},
			"Noto Sans Yi": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,yi"
			},
			"Noto Sans Zanabazar Square": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,zanabazar-square"
			},
			"Noto Serif": {
				"category": "serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese"
			},
			"Noto Serif Ahom": {
				"category": "serif",
				"variants": "400",
				"subsets": "ahom,latin,latin-ext"
			},
			"Noto Serif Armenian": {
				"category": "serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "armenian,latin,latin-ext"
			},
			"Noto Serif Balinese": {
				"category": "serif",
				"variants": "400",
				"subsets": "balinese,latin,latin-ext"
			},
			"Noto Serif Bengali": {
				"category": "serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "bengali,latin,latin-ext"
			},
			"Noto Serif Devanagari": {
				"category": "serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Noto Serif Display": {
				"category": "serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese"
			},
			"Noto Serif Dogra": {
				"category": "serif",
				"variants": "400",
				"subsets": "dogra,latin,latin-ext"
			},
			"Noto Serif Ethiopic": {
				"category": "serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "ethiopic,latin,latin-ext"
			},
			"Noto Serif Georgian": {
				"category": "serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "georgian,latin,latin-ext"
			},
			"Noto Serif Grantha": {
				"category": "serif",
				"variants": "400",
				"subsets": "grantha,latin,latin-ext"
			},
			"Noto Serif Gujarati": {
				"category": "serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "gujarati,latin,latin-ext,math,symbols"
			},
			"Noto Serif Gurmukhi": {
				"category": "serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "gurmukhi,latin,latin-ext"
			},
			"Noto Serif HK": {
				"category": "serif",
				"variants": "200,300,400,500,600,700,800,900",
				"subsets": "chinese-hongkong,cyrillic,latin,latin-ext,vietnamese"
			},
			"Noto Serif Hebrew": {
				"category": "serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "hebrew,latin,latin-ext"
			},
			"Noto Serif JP": {
				"category": "serif",
				"variants": "200,300,400,500,600,700,800,900",
				"subsets": "cyrillic,japanese,latin,latin-ext,vietnamese"
			},
			"Noto Serif KR": {
				"category": "serif",
				"variants": "200,300,400,500,600,700,800,900",
				"subsets": "cyrillic,korean,latin,latin-ext,vietnamese"
			},
			"Noto Serif Kannada": {
				"category": "serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "kannada,latin,latin-ext"
			},
			"Noto Serif Khitan Small Script": {
				"category": "serif",
				"variants": "400",
				"subsets": "khitan-small-script,latin,latin-ext"
			},
			"Noto Serif Khmer": {
				"category": "serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "khmer,latin,latin-ext"
			},
			"Noto Serif Khojki": {
				"category": "serif",
				"variants": "400,500,600,700",
				"subsets": "khojki,latin,latin-ext"
			},
			"Noto Serif Lao": {
				"category": "serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "lao,latin,latin-ext"
			},
			"Noto Serif Makasar": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,latin-ext,makasar"
			},
			"Noto Serif Malayalam": {
				"category": "serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,malayalam"
			},
			"Noto Serif Myanmar": {
				"category": "serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "myanmar"
			},
			"Noto Serif NP Hmong": {
				"category": "serif",
				"variants": "400,500,600,700",
				"subsets": "latin,nyiakeng-puachue-hmong"
			},
			"Noto Serif Old Uyghur": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,latin-ext,old-uyghur"
			},
			"Noto Serif Oriya": {
				"category": "serif",
				"variants": "400,500,600,700",
				"subsets": "latin,latin-ext,oriya"
			},
			"Noto Serif Ottoman Siyaq": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,latin-ext,ottoman-siyaq-numbers"
			},
			"Noto Serif SC": {
				"category": "serif",
				"variants": "200,300,400,500,600,700,800,900",
				"subsets": "chinese-simplified,cyrillic,latin,latin-ext,vietnamese"
			},
			"Noto Serif Sinhala": {
				"category": "serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,sinhala"
			},
			"Noto Serif TC": {
				"category": "serif",
				"variants": "200,300,400,500,600,700,800,900",
				"subsets": "chinese-traditional,cyrillic,latin,latin-ext,vietnamese"
			},
			"Noto Serif Tamil": {
				"category": "serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "latin,latin-ext,tamil"
			},
			"Noto Serif Tangut": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,latin-ext,tangut"
			},
			"Noto Serif Telugu": {
				"category": "serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,telugu"
			},
			"Noto Serif Thai": {
				"category": "serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,thai"
			},
			"Noto Serif Tibetan": {
				"category": "serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,tibetan"
			},
			"Noto Serif Toto": {
				"category": "serif",
				"variants": "400,500,600,700",
				"subsets": "latin,latin-ext,toto"
			},
			"Noto Serif Vithkuqi": {
				"category": "serif",
				"variants": "400,500,600,700",
				"subsets": "latin,latin-ext,vithkuqi"
			},
			"Noto Serif Yezidi": {
				"category": "serif",
				"variants": "400,500,600,700",
				"subsets": "latin,latin-ext,yezidi"
			},
			"Noto Traditional Nushu": {
				"category": "sans-serif",
				"variants": "300,400,500,600,700",
				"subsets": "latin,latin-ext,nushu"
			},
			"Noto Znamenny Musical Notation": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,math,symbols,znamenny"
			},
			"Nova Cut": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Nova Flat": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Nova Mono": {
				"category": "monospace",
				"variants": "400",
				"subsets": "greek,latin"
			},
			"Nova Oval": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Nova Round": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Nova Script": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Nova Slim": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Nova Square": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Numans": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Nunito": {
				"category": "sans-serif",
				"variants": "200,300,400,500,600,700,800,900,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Nunito Sans": {
				"category": "sans-serif",
				"variants": "200,300,400,500,600,700,800,900,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Nuosu SIL": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,yi"
			},
			"Odibee Sans": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Odor Mean Chey": {
				"category": "serif",
				"variants": "400",
				"subsets": "khmer,latin"
			},
			"Offside": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Oi": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,greek,latin,latin-ext,tamil,vietnamese"
			},
			"Ojuju": {
				"category": "sans-serif",
				"variants": "200,300,400,500,600,700,800",
				"subsets": "latin,latin-ext,math,symbols,vietnamese"
			},
			"Old Standard TT": {
				"category": "serif",
				"variants": "400,400i,700",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Oldenburg": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Ole": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Oleo Script": {
				"category": "display",
				"variants": "400,700",
				"subsets": "latin,latin-ext"
			},
			"Oleo Script Swash Caps": {
				"category": "display",
				"variants": "400,700",
				"subsets": "latin,latin-ext"
			},
			"Onest": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext"
			},
			"Oooh Baby": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Open Sans": {
				"category": "sans-serif",
				"variants": "300,400,500,600,700,800,300i,400i,500i,600i,700i,800i",
				"subsets": "cyrillic,cyrillic-ext,greek,greek-ext,hebrew,latin,latin-ext,math,symbols,vietnamese"
			},
			"Oranienbaum": {
				"category": "serif",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext"
			},
			"Orbit": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "korean,latin,latin-ext"
			},
			"Orbitron": {
				"category": "sans-serif",
				"variants": "400,500,600,700,800,900",
				"subsets": "latin"
			},
			"Oregano": {
				"category": "display",
				"variants": "400,400i",
				"subsets": "latin,latin-ext"
			},
			"Orelega One": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext"
			},
			"Orienta": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Original Surfer": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Oswald": {
				"category": "sans-serif",
				"variants": "200,300,400,500,600,700",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Outfit": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext"
			},
			"Over the Rainbow": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Overlock": {
				"category": "display",
				"variants": "400,400i,700,700i,900,900i",
				"subsets": "latin,latin-ext"
			},
			"Overlock SC": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Overpass": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Overpass Mono": {
				"category": "monospace",
				"variants": "300,400,500,600,700",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Ovo": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Oxanium": {
				"category": "display",
				"variants": "200,300,400,500,600,700,800",
				"subsets": "latin,latin-ext"
			},
			"Oxygen": {
				"category": "sans-serif",
				"variants": "300,400,700",
				"subsets": "latin,latin-ext"
			},
			"Oxygen Mono": {
				"category": "monospace",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"PT Mono": {
				"category": "monospace",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext"
			},
			"PT Sans": {
				"category": "sans-serif",
				"variants": "400,400i,700,700i",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext"
			},
			"PT Sans Caption": {
				"category": "sans-serif",
				"variants": "400,700",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext"
			},
			"PT Sans Narrow": {
				"category": "sans-serif",
				"variants": "400,700",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext"
			},
			"PT Serif": {
				"category": "serif",
				"variants": "400,400i,700,700i",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext"
			},
			"PT Serif Caption": {
				"category": "serif",
				"variants": "400,400i",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext"
			},
			"Pacifico": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Padauk": {
				"category": "sans-serif",
				"variants": "400,700",
				"subsets": "latin,latin-ext,myanmar"
			},
			"Padyakke Expanded One": {
				"category": "serif",
				"variants": "400",
				"subsets": "kannada,latin,latin-ext"
			},
			"Palanquin": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Palanquin Dark": {
				"category": "sans-serif",
				"variants": "400,500,600,700",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Palette Mosaic": {
				"category": "display",
				"variants": "400",
				"subsets": "japanese,latin"
			},
			"Pangolin": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Paprika": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Parisienne": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Passero One": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Passion One": {
				"category": "display",
				"variants": "400,700,900",
				"subsets": "latin,latin-ext"
			},
			"Passions Conflict": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Pathway Extreme": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Pathway Gothic One": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Patrick Hand": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Patrick Hand SC": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Pattaya": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "cyrillic,latin,latin-ext,thai,vietnamese"
			},
			"Patua One": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Pavanam": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,tamil"
			},
			"Paytone One": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Peddana": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,telugu"
			},
			"Peralta": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Permanent Marker": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Petemoss": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Petit Formal Script": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Petrona": {
				"category": "serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Philosopher": {
				"category": "sans-serif",
				"variants": "400,400i,700,700i",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Phudu": {
				"category": "display",
				"variants": "300,400,500,600,700,800,900",
				"subsets": "cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Piazzolla": {
				"category": "serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese"
			},
			"Piedra": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Pinyon Script": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Pirata One": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Pixelify Sans": {
				"category": "display",
				"variants": "400,500,600,700",
				"subsets": "cyrillic,latin,latin-ext"
			},
			"Plaster": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Platypi": {
				"category": "serif",
				"variants": "300,400,500,600,700,800,300i,400i,500i,600i,700i,800i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Play": {
				"category": "sans-serif",
				"variants": "400,700",
				"subsets": "cyrillic,cyrillic-ext,greek,latin,latin-ext,vietnamese"
			},
			"Playball": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Playfair": {
				"category": "serif",
				"variants": "300,400,500,600,700,800,900,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Playfair Display": {
				"category": "serif",
				"variants": "400,500,600,700,800,900,400i,500i,600i,700i,800i,900i",
				"subsets": "cyrillic,latin,latin-ext,vietnamese"
			},
			"Playfair Display SC": {
				"category": "serif",
				"variants": "400,400i,700,700i,900,900i",
				"subsets": "cyrillic,latin,latin-ext,vietnamese"
			},
			"Playpen Sans": {
				"category": "handwriting",
				"variants": "100,200,300,400,500,600,700,800",
				"subsets": "emoji,latin,latin-ext,math,vietnamese"
			},
			"Playwrite AR": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite AT": {
				"category": "handwriting",
				"variants": "100,200,300,400,100i,200i,300i,400i",
				"subsets": "latin"
			},
			"Playwrite AU NSW": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite AU QLD": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite AU SA": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite AU TAS": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite AU VIC": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite BE VLG": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite BE WAL": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite BR": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite CA": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite CL": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite CO": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite CU": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite CZ": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite DE Grund": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite DE LA": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite DE SAS": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite DE VA": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite DK Loopet": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite DK Uloopet": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite ES": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite ES Deco": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite FR Moderne": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite FR Trad": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite GB J": {
				"category": "handwriting",
				"variants": "100,200,300,400,100i,200i,300i,400i",
				"subsets": "latin"
			},
			"Playwrite GB S": {
				"category": "handwriting",
				"variants": "100,200,300,400,100i,200i,300i,400i",
				"subsets": "latin"
			},
			"Playwrite HR": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite HR Lijeva": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite HU": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite ID": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite IE": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite IN": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite IS": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite IT Moderna": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite IT Trad": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite MX": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite NG Modern": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite NL": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite NO": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite NZ": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite PE": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite PL": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite PT": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite RO": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite SK": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite TZ": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite US Modern": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite US Trad": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite VN": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Playwrite ZA": {
				"category": "handwriting",
				"variants": "100,200,300,400",
				"subsets": "latin"
			},
			"Plus Jakarta Sans": {
				"category": "sans-serif",
				"variants": "200,300,400,500,600,700,800,200i,300i,400i,500i,600i,700i,800i",
				"subsets": "cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Podkova": {
				"category": "serif",
				"variants": "400,500,600,700,800",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Poetsen One": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Poiret One": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,latin,latin-ext"
			},
			"Poller One": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Poltawski Nowy": {
				"category": "serif",
				"variants": "400,500,600,700,400i,500i,600i,700i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Poly": {
				"category": "serif",
				"variants": "400,400i",
				"subsets": "latin"
			},
			"Pompiere": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Pontano Sans": {
				"category": "sans-serif",
				"variants": "300,400,500,600,700",
				"subsets": "latin,latin-ext"
			},
			"Poor Story": {
				"category": "display",
				"variants": "400",
				"subsets": "korean,latin"
			},
			"Poppins": {
				"category": "sans-serif",
				"variants": "100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i",
				"subsets": "latin,latin-ext"
			},
			"Port Lligat Sans": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Port Lligat Slab": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Potta One": {
				"category": "display",
				"variants": "400",
				"subsets": "japanese,latin,latin-ext,vietnamese"
			},
			"Pragati Narrow": {
				"category": "sans-serif",
				"variants": "400,700",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Praise": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Prata": {
				"category": "serif",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,latin,vietnamese"
			},
			"Preahvihear": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "khmer,latin"
			},
			"Press Start 2P": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,greek,latin,latin-ext"
			},
			"Pridi": {
				"category": "serif",
				"variants": "200,300,400,500,600,700",
				"subsets": "latin,latin-ext,thai,vietnamese"
			},
			"Princess Sofia": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Prociono": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Prompt": {
				"category": "sans-serif",
				"variants": "100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i",
				"subsets": "latin,latin-ext,thai,vietnamese"
			},
			"Prosto One": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,latin,latin-ext"
			},
			"Protest Guerrilla": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext,math,symbols,vietnamese"
			},
			"Protest Revolution": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext,math,symbols,vietnamese"
			},
			"Protest Riot": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext,math,symbols,vietnamese"
			},
			"Protest Strike": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext,math,symbols,vietnamese"
			},
			"Proza Libre": {
				"category": "sans-serif",
				"variants": "400,400i,500,500i,600,600i,700,700i,800,800i",
				"subsets": "latin,latin-ext"
			},
			"Public Sans": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Puppies Play": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Puritan": {
				"category": "sans-serif",
				"variants": "400,400i,700,700i",
				"subsets": "latin"
			},
			"Purple Purse": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Qahiri": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "arabic,latin"
			},
			"Quando": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Quantico": {
				"category": "sans-serif",
				"variants": "400,400i,700,700i",
				"subsets": "latin"
			},
			"Quattrocento": {
				"category": "serif",
				"variants": "400,700",
				"subsets": "latin,latin-ext"
			},
			"Quattrocento Sans": {
				"category": "sans-serif",
				"variants": "400,400i,700,700i",
				"subsets": "latin,latin-ext"
			},
			"Questrial": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Quicksand": {
				"category": "sans-serif",
				"variants": "300,400,500,600,700",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Quintessential": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Qwigley": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Qwitcher Grypen": {
				"category": "handwriting",
				"variants": "400,700",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"REM": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Racing Sans One": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Radio Canada": {
				"category": "sans-serif",
				"variants": "300,400,500,600,700,300i,400i,500i,600i,700i",
				"subsets": "canadian-aboriginal,latin,latin-ext,vietnamese"
			},
			"Radio Canada Big": {
				"category": "sans-serif",
				"variants": "400,500,600,700,400i,500i,600i,700i",
				"subsets": "latin,latin-ext"
			},
			"Radley": {
				"category": "serif",
				"variants": "400,400i",
				"subsets": "latin,latin-ext"
			},
			"Rajdhani": {
				"category": "sans-serif",
				"variants": "300,400,500,600,700",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Rakkas": {
				"category": "display",
				"variants": "400",
				"subsets": "arabic,latin,latin-ext"
			},
			"Raleway": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Raleway Dots": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Ramabhadra": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,telugu"
			},
			"Ramaraja": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,telugu"
			},
			"Rambla": {
				"category": "sans-serif",
				"variants": "400,400i,700,700i",
				"subsets": "latin,latin-ext"
			},
			"Rammetto One": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Rampart One": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,japanese,latin,latin-ext"
			},
			"Ranchers": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Rancho": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Ranga": {
				"category": "display",
				"variants": "400,700",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Rasa": {
				"category": "serif",
				"variants": "300,400,500,600,700,300i,400i,500i,600i,700i",
				"subsets": "gujarati,latin,latin-ext,vietnamese"
			},
			"Rationale": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Ravi Prakash": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,telugu"
			},
			"Readex Pro": {
				"category": "sans-serif",
				"variants": "200,300,400,500,600,700",
				"subsets": "arabic,latin,latin-ext,vietnamese"
			},
			"Recursive": {
				"category": "sans-serif",
				"variants": "300,400,500,600,700,800,900",
				"subsets": "cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Red Hat Display": {
				"category": "sans-serif",
				"variants": "300,400,500,600,700,800,900,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "latin,latin-ext"
			},
			"Red Hat Mono": {
				"category": "monospace",
				"variants": "300,400,500,600,700,300i,400i,500i,600i,700i",
				"subsets": "latin,latin-ext"
			},
			"Red Hat Text": {
				"category": "sans-serif",
				"variants": "300,400,500,600,700,300i,400i,500i,600i,700i",
				"subsets": "latin,latin-ext"
			},
			"Red Rose": {
				"category": "display",
				"variants": "300,400,500,600,700",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Redacted": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Redacted Script": {
				"category": "display",
				"variants": "300,400,700",
				"subsets": "latin,latin-ext"
			},
			"Reddit Mono": {
				"category": "monospace",
				"variants": "200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Reddit Sans": {
				"category": "sans-serif",
				"variants": "200,300,400,500,600,700,800,900,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Reddit Sans Condensed": {
				"category": "sans-serif",
				"variants": "200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Redressed": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Reem Kufi": {
				"category": "sans-serif",
				"variants": "400,500,600,700",
				"subsets": "arabic,latin,latin-ext,vietnamese"
			},
			"Reem Kufi Fun": {
				"category": "sans-serif",
				"variants": "400,500,600,700",
				"subsets": "arabic,latin,latin-ext,vietnamese"
			},
			"Reem Kufi Ink": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "arabic,latin,latin-ext,vietnamese"
			},
			"Reenie Beanie": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Reggae One": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,japanese,latin,latin-ext"
			},
			"Rethink Sans": {
				"category": "sans-serif",
				"variants": "400,500,600,700,800,400i,500i,600i,700i,800i",
				"subsets": "latin,latin-ext"
			},
			"Revalia": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Rhodium Libre": {
				"category": "serif",
				"variants": "400",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Ribeye": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Ribeye Marrow": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Righteous": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Risque": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Road Rage": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Roboto": {
				"category": "sans-serif",
				"variants": "100,100i,300,300i,400,400i,500,500i,700,700i,900,900i",
				"subsets": "cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese"
			},
			"Roboto Condensed": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese"
			},
			"Roboto Flex": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,greek,latin,latin-ext,vietnamese"
			},
			"Roboto Mono": {
				"category": "monospace",
				"variants": "100,200,300,400,500,600,700,100i,200i,300i,400i,500i,600i,700i",
				"subsets": "cyrillic,cyrillic-ext,greek,latin,latin-ext,vietnamese"
			},
			"Roboto Serif": {
				"category": "serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Roboto Slab": {
				"category": "serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese"
			},
			"Rochester": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Rock 3D": {
				"category": "display",
				"variants": "400",
				"subsets": "japanese,latin"
			},
			"Rock Salt": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"RocknRoll One": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "japanese,latin,latin-ext"
			},
			"Rokkitt": {
				"category": "serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Romanesco": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Ropa Sans": {
				"category": "sans-serif",
				"variants": "400,400i",
				"subsets": "latin,latin-ext"
			},
			"Rosario": {
				"category": "sans-serif",
				"variants": "300,400,500,600,700,300i,400i,500i,600i,700i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Rosarivo": {
				"category": "serif",
				"variants": "400,400i",
				"subsets": "latin,latin-ext"
			},
			"Rouge Script": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Rowdies": {
				"category": "display",
				"variants": "300,400,700",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Rozha One": {
				"category": "serif",
				"variants": "400",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Rubik": {
				"category": "sans-serif",
				"variants": "300,400,500,600,700,800,900,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "arabic,cyrillic,cyrillic-ext,hebrew,latin,latin-ext"
			},
			"Rubik 80s Fade": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,hebrew,latin,latin-ext"
			},
			"Rubik Beastly": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,hebrew,latin,latin-ext"
			},
			"Rubik Broken Fax": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,hebrew,latin,latin-ext,math,symbols"
			},
			"Rubik Bubbles": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,hebrew,latin,latin-ext"
			},
			"Rubik Burned": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,hebrew,latin,latin-ext"
			},
			"Rubik Dirt": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,hebrew,latin,latin-ext"
			},
			"Rubik Distressed": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,hebrew,latin,latin-ext"
			},
			"Rubik Doodle Shadow": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,hebrew,latin,latin-ext,math,symbols"
			},
			"Rubik Doodle Triangles": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,hebrew,latin,latin-ext,math,symbols"
			},
			"Rubik Gemstones": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,hebrew,latin,latin-ext"
			},
			"Rubik Glitch": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,hebrew,latin,latin-ext"
			},
			"Rubik Glitch Pop": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,hebrew,latin,latin-ext,math,symbols"
			},
			"Rubik Iso": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,hebrew,latin,latin-ext"
			},
			"Rubik Lines": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,hebrew,latin,latin-ext,math,symbols"
			},
			"Rubik Maps": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,hebrew,latin,latin-ext,math,symbols"
			},
			"Rubik Marker Hatch": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,hebrew,latin,latin-ext"
			},
			"Rubik Maze": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,hebrew,latin,latin-ext"
			},
			"Rubik Microbe": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,hebrew,latin,latin-ext"
			},
			"Rubik Mono One": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "cyrillic,latin,latin-ext"
			},
			"Rubik Moonrocks": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,hebrew,latin,latin-ext"
			},
			"Rubik Pixels": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,hebrew,latin,latin-ext"
			},
			"Rubik Puddles": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,hebrew,latin,latin-ext"
			},
			"Rubik Scribble": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,hebrew,latin,latin-ext,math,symbols"
			},
			"Rubik Spray Paint": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,hebrew,latin,latin-ext"
			},
			"Rubik Storm": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,hebrew,latin,latin-ext"
			},
			"Rubik Vinyl": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,hebrew,latin,latin-ext"
			},
			"Rubik Wet Paint": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,hebrew,latin,latin-ext"
			},
			"Ruda": {
				"category": "sans-serif",
				"variants": "400,500,600,700,800,900",
				"subsets": "cyrillic,latin,latin-ext,vietnamese"
			},
			"Rufina": {
				"category": "serif",
				"variants": "400,700",
				"subsets": "latin,latin-ext"
			},
			"Ruge Boogie": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Ruluko": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Rum Raisin": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Ruslan Display": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,latin,latin-ext,math,symbols"
			},
			"Russo One": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "cyrillic,latin,latin-ext"
			},
			"Ruthie": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Ruwudu": {
				"category": "serif",
				"variants": "400,500,600,700",
				"subsets": "arabic,latin,latin-ext"
			},
			"Rye": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"STIX Two Text": {
				"category": "serif",
				"variants": "400,500,600,700,400i,500i,600i,700i",
				"subsets": "cyrillic,cyrillic-ext,greek,latin,latin-ext,vietnamese"
			},
			"Sacramento": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Sahitya": {
				"category": "serif",
				"variants": "400,700",
				"subsets": "devanagari,latin"
			},
			"Sail": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Saira": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Saira Condensed": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Saira Extra Condensed": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Saira Semi Condensed": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Saira Stencil One": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Salsa": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Sanchez": {
				"category": "serif",
				"variants": "400,400i",
				"subsets": "latin,latin-ext"
			},
			"Sancreek": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Sankofa Display": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Sansita": {
				"category": "sans-serif",
				"variants": "400,400i,700,700i,800,800i,900,900i",
				"subsets": "latin,latin-ext"
			},
			"Sansita Swashed": {
				"category": "display",
				"variants": "300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Sarabun": {
				"category": "sans-serif",
				"variants": "100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i",
				"subsets": "latin,latin-ext,thai,vietnamese"
			},
			"Sarala": {
				"category": "sans-serif",
				"variants": "400,700",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Sarina": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Sarpanch": {
				"category": "sans-serif",
				"variants": "400,500,600,700,800,900",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Sassy Frass": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Satisfy": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Sawarabi Gothic": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "cyrillic,japanese,latin,latin-ext,vietnamese"
			},
			"Sawarabi Mincho": {
				"category": "serif",
				"variants": "400",
				"subsets": "japanese,latin,latin-ext"
			},
			"Scada": {
				"category": "sans-serif",
				"variants": "400,400i,700,700i",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext"
			},
			"Scheherazade New": {
				"category": "serif",
				"variants": "400,500,600,700",
				"subsets": "arabic,latin,latin-ext"
			},
			"Schibsted Grotesk": {
				"category": "sans-serif",
				"variants": "400,500,600,700,800,900,400i,500i,600i,700i,800i,900i",
				"subsets": "latin,latin-ext"
			},
			"Schoolbell": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Scope One": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Seaweed Script": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Secular One": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "hebrew,latin,latin-ext"
			},
			"Sedan": {
				"category": "serif",
				"variants": "400,400i",
				"subsets": "latin,latin-ext"
			},
			"Sedan SC": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Sedgwick Ave": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Sedgwick Ave Display": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Sen": {
				"category": "sans-serif",
				"variants": "400,500,600,700,800",
				"subsets": "latin,latin-ext"
			},
			"Send Flowers": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Sevillana": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Seymour One": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "cyrillic,latin,latin-ext"
			},
			"Shadows Into Light": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Shadows Into Light Two": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Shalimar": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Shantell Sans": {
				"category": "display",
				"variants": "300,400,500,600,700,800,300i,400i,500i,600i,700i,800i",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Shanti": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Share": {
				"category": "sans-serif",
				"variants": "400,400i,700,700i",
				"subsets": "latin,latin-ext"
			},
			"Share Tech": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Share Tech Mono": {
				"category": "monospace",
				"variants": "400",
				"subsets": "latin"
			},
			"Shippori Antique": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "japanese,latin,latin-ext"
			},
			"Shippori Antique B1": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "japanese,latin,latin-ext"
			},
			"Shippori Mincho": {
				"category": "serif",
				"variants": "400,500,600,700,800",
				"subsets": "japanese,latin,latin-ext"
			},
			"Shippori Mincho B1": {
				"category": "serif",
				"variants": "400,500,600,700,800",
				"subsets": "japanese,latin,latin-ext"
			},
			"Shizuru": {
				"category": "display",
				"variants": "400",
				"subsets": "japanese,latin"
			},
			"Shojumaru": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Short Stack": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Shrikhand": {
				"category": "display",
				"variants": "400",
				"subsets": "gujarati,latin,latin-ext"
			},
			"Siemreap": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "khmer"
			},
			"Sigmar": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Sigmar One": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Signika": {
				"category": "sans-serif",
				"variants": "300,400,500,600,700",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Signika Negative": {
				"category": "sans-serif",
				"variants": "300,400,500,600,700",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Silkscreen": {
				"category": "display",
				"variants": "400,700",
				"subsets": "latin,latin-ext"
			},
			"Simonetta": {
				"category": "display",
				"variants": "400,400i,900,900i",
				"subsets": "latin,latin-ext"
			},
			"Single Day": {
				"category": "display",
				"variants": "400",
				"subsets": "korean"
			},
			"Sintony": {
				"category": "sans-serif",
				"variants": "400,700",
				"subsets": "latin,latin-ext"
			},
			"Sirin Stencil": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Six Caps": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Sixtyfour": {
				"category": "monospace",
				"variants": "400",
				"subsets": "latin,latin-ext,math,symbols"
			},
			"Skranji": {
				"category": "display",
				"variants": "400,700",
				"subsets": "latin,latin-ext"
			},
			"Slabo 13px": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Slabo 27px": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Slackey": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Slackside One": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "japanese,latin,latin-ext"
			},
			"Smokum": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Smooch": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Smooch Sans": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Smythe": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Sniglet": {
				"category": "display",
				"variants": "400,800",
				"subsets": "latin,latin-ext"
			},
			"Snippet": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Snowburst One": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Sofadi One": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Sofia": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Sofia Sans": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "cyrillic,cyrillic-ext,greek,latin,latin-ext"
			},
			"Sofia Sans Condensed": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "cyrillic,cyrillic-ext,greek,latin,latin-ext"
			},
			"Sofia Sans Extra Condensed": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "cyrillic,cyrillic-ext,greek,latin,latin-ext"
			},
			"Sofia Sans Semi Condensed": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "cyrillic,cyrillic-ext,greek,latin,latin-ext"
			},
			"Solitreo": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "hebrew,latin,latin-ext"
			},
			"Solway": {
				"category": "serif",
				"variants": "300,400,500,700,800",
				"subsets": "latin"
			},
			"Sometype Mono": {
				"category": "monospace",
				"variants": "400,500,600,700,400i,500i,600i,700i",
				"subsets": "latin,latin-ext"
			},
			"Song Myung": {
				"category": "serif",
				"variants": "400",
				"subsets": "korean,latin"
			},
			"Sono": {
				"category": "sans-serif",
				"variants": "200,300,400,500,600,700,800",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Sonsie One": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Sora": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800",
				"subsets": "latin,latin-ext"
			},
			"Sorts Mill Goudy": {
				"category": "serif",
				"variants": "400,400i",
				"subsets": "latin,latin-ext"
			},
			"Source Code Pro": {
				"category": "monospace",
				"variants": "200,300,400,500,600,700,800,900,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese"
			},
			"Source Sans 3": {
				"category": "sans-serif",
				"variants": "200,300,400,500,600,700,800,900,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese"
			},
			"Source Serif 4": {
				"category": "serif",
				"variants": "200,300,400,500,600,700,800,900,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "cyrillic,cyrillic-ext,greek,latin,latin-ext,vietnamese"
			},
			"Space Grotesk": {
				"category": "sans-serif",
				"variants": "300,400,500,600,700",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Space Mono": {
				"category": "monospace",
				"variants": "400,400i,700,700i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Special Elite": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Spectral": {
				"category": "serif",
				"variants": "200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i",
				"subsets": "cyrillic,latin,latin-ext,vietnamese"
			},
			"Spectral SC": {
				"category": "serif",
				"variants": "200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i",
				"subsets": "cyrillic,latin,latin-ext,vietnamese"
			},
			"Spicy Rice": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Spinnaker": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Spirax": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Splash": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Spline Sans": {
				"category": "sans-serif",
				"variants": "300,400,500,600,700",
				"subsets": "latin,latin-ext"
			},
			"Spline Sans Mono": {
				"category": "monospace",
				"variants": "300,400,500,600,700,300i,400i,500i,600i,700i",
				"subsets": "latin,latin-ext"
			},
			"Squada One": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Square Peg": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Sree Krushnadevaraya": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,telugu"
			},
			"Sriracha": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,thai,vietnamese"
			},
			"Srisakdi": {
				"category": "display",
				"variants": "400,700",
				"subsets": "latin,latin-ext,thai,vietnamese"
			},
			"Staatliches": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Stalemate": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Stalinist One": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,latin,latin-ext"
			},
			"Stardos Stencil": {
				"category": "display",
				"variants": "400,700",
				"subsets": "latin"
			},
			"Stick": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "cyrillic,japanese,latin,latin-ext"
			},
			"Stick No Bills": {
				"category": "sans-serif",
				"variants": "200,300,400,500,600,700,800",
				"subsets": "latin,latin-ext,sinhala"
			},
			"Stint Ultra Condensed": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Stint Ultra Expanded": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Stoke": {
				"category": "serif",
				"variants": "300,400",
				"subsets": "latin,latin-ext"
			},
			"Strait": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Style Script": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Stylish": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "korean,latin"
			},
			"Sue Ellen Francisco": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Suez One": {
				"category": "serif",
				"variants": "400",
				"subsets": "hebrew,latin,latin-ext"
			},
			"Sulphur Point": {
				"category": "sans-serif",
				"variants": "300,400,700",
				"subsets": "latin,latin-ext"
			},
			"Sumana": {
				"category": "serif",
				"variants": "400,700",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Sunflower": {
				"category": "sans-serif",
				"variants": "300,500,700",
				"subsets": "korean,latin"
			},
			"Sunshiney": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Supermercado One": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Sura": {
				"category": "serif",
				"variants": "400,700",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Suranna": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,telugu"
			},
			"Suravaram": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,telugu"
			},
			"Suwannaphum": {
				"category": "serif",
				"variants": "100,300,400,700,900",
				"subsets": "khmer,latin"
			},
			"Swanky and Moo Moo": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Syncopate": {
				"category": "sans-serif",
				"variants": "400,700",
				"subsets": "latin"
			},
			"Syne": {
				"category": "sans-serif",
				"variants": "400,500,600,700,800",
				"subsets": "greek,latin,latin-ext"
			},
			"Syne Mono": {
				"category": "monospace",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Syne Tactile": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Tac One": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,math,symbols,vietnamese"
			},
			"Tai Heritage Pro": {
				"category": "serif",
				"variants": "400,700",
				"subsets": "latin,latin-ext,tai-viet,vietnamese"
			},
			"Tajawal": {
				"category": "sans-serif",
				"variants": "200,300,400,500,700,800,900",
				"subsets": "arabic,latin"
			},
			"Tangerine": {
				"category": "handwriting",
				"variants": "400,700",
				"subsets": "latin"
			},
			"Tapestry": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Taprom": {
				"category": "display",
				"variants": "400",
				"subsets": "khmer,latin"
			},
			"Tauri": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Taviraj": {
				"category": "serif",
				"variants": "100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i",
				"subsets": "latin,latin-ext,thai,vietnamese"
			},
			"Teachers": {
				"category": "sans-serif",
				"variants": "400,500,600,700,800,400i,500i,600i,700i,800i",
				"subsets": "greek-ext,latin,latin-ext"
			},
			"Teko": {
				"category": "sans-serif",
				"variants": "300,400,500,600,700",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Tektur": {
				"category": "display",
				"variants": "400,500,600,700,800,900",
				"subsets": "cyrillic,cyrillic-ext,greek,latin,latin-ext,vietnamese"
			},
			"Telex": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Tenali Ramakrishna": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,telugu"
			},
			"Tenor Sans": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "cyrillic,latin,latin-ext"
			},
			"Text Me One": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Texturina": {
				"category": "serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Thasadith": {
				"category": "sans-serif",
				"variants": "400,400i,700,700i",
				"subsets": "latin,latin-ext,thai,vietnamese"
			},
			"The Girl Next Door": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"The Nautigal": {
				"category": "handwriting",
				"variants": "400,700",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Tienne": {
				"category": "serif",
				"variants": "400,700,900",
				"subsets": "latin"
			},
			"Tillana": {
				"category": "display",
				"variants": "400,500,600,700,800",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Tilt Neon": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Tilt Prism": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Tilt Warp": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Timmana": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,telugu"
			},
			"Tinos": {
				"category": "serif",
				"variants": "400,400i,700,700i",
				"subsets": "cyrillic,cyrillic-ext,greek,greek-ext,hebrew,latin,latin-ext,vietnamese"
			},
			"Tiny5": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,greek,latin,latin-ext"
			},
			"Tiro Bangla": {
				"category": "serif",
				"variants": "400,400i",
				"subsets": "bengali,latin,latin-ext"
			},
			"Tiro Devanagari Hindi": {
				"category": "serif",
				"variants": "400,400i",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Tiro Devanagari Marathi": {
				"category": "serif",
				"variants": "400,400i",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Tiro Devanagari Sanskrit": {
				"category": "serif",
				"variants": "400,400i",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Tiro Gurmukhi": {
				"category": "serif",
				"variants": "400,400i",
				"subsets": "gurmukhi,latin,latin-ext"
			},
			"Tiro Kannada": {
				"category": "serif",
				"variants": "400,400i",
				"subsets": "kannada,latin,latin-ext"
			},
			"Tiro Tamil": {
				"category": "serif",
				"variants": "400,400i",
				"subsets": "latin,latin-ext,tamil"
			},
			"Tiro Telugu": {
				"category": "serif",
				"variants": "400,400i",
				"subsets": "latin,latin-ext,telugu"
			},
			"Titan One": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Titillium Web": {
				"category": "sans-serif",
				"variants": "200,200i,300,300i,400,400i,600,600i,700,700i,900",
				"subsets": "latin,latin-ext"
			},
			"Tomorrow": {
				"category": "sans-serif",
				"variants": "100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i",
				"subsets": "latin,latin-ext"
			},
			"Tourney": {
				"category": "display",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Trade Winds": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Train One": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,japanese,latin,latin-ext"
			},
			"Trirong": {
				"category": "serif",
				"variants": "100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i",
				"subsets": "latin,latin-ext,thai,vietnamese"
			},
			"Trispace": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Trocchi": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Trochut": {
				"category": "display",
				"variants": "400,400i,700",
				"subsets": "latin"
			},
			"Truculenta": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Trykker": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Tsukimi Rounded": {
				"category": "sans-serif",
				"variants": "300,400,500,600,700",
				"subsets": "japanese,latin,latin-ext"
			},
			"Tulpen One": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Turret Road": {
				"category": "display",
				"variants": "200,300,400,500,700,800",
				"subsets": "latin,latin-ext"
			},
			"Twinkle Star": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Ubuntu": {
				"category": "sans-serif",
				"variants": "300,300i,400,400i,500,500i,700,700i",
				"subsets": "cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext"
			},
			"Ubuntu Condensed": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext"
			},
			"Ubuntu Mono": {
				"category": "monospace",
				"variants": "400,400i,700,700i",
				"subsets": "cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext"
			},
			"Ubuntu Sans": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,100i,200i,300i,400i,500i,600i,700i,800i",
				"subsets": "cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext"
			},
			"Ubuntu Sans Mono": {
				"category": "monospace",
				"variants": "400,500,600,700,400i,500i,600i,700i",
				"subsets": "cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext"
			},
			"Uchen": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,tibetan"
			},
			"Ultra": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Unbounded": {
				"category": "sans-serif",
				"variants": "200,300,400,500,600,700,800,900",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Uncial Antiqua": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Underdog": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,latin,latin-ext"
			},
			"Unica One": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"UnifrakturCook": {
				"category": "display",
				"variants": "700",
				"subsets": "latin"
			},
			"UnifrakturMaguntia": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Unkempt": {
				"category": "display",
				"variants": "400,700",
				"subsets": "latin"
			},
			"Unlock": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Unna": {
				"category": "serif",
				"variants": "400,400i,700,700i",
				"subsets": "latin,latin-ext"
			},
			"Updock": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Urbanist": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "latin,latin-ext"
			},
			"VT323": {
				"category": "monospace",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Vampiro One": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Varela": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Varela Round": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "hebrew,latin,latin-ext,vietnamese"
			},
			"Varta": {
				"category": "sans-serif",
				"variants": "300,400,500,600,700",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Vast Shadow": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Vazirmatn": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "arabic,latin,latin-ext"
			},
			"Vesper Libre": {
				"category": "serif",
				"variants": "400,500,700,900",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Viaoda Libre": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Vibes": {
				"category": "display",
				"variants": "400",
				"subsets": "arabic,latin"
			},
			"Vibur": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Victor Mono": {
				"category": "monospace",
				"variants": "100,200,300,400,500,600,700,100i,200i,300i,400i,500i,600i,700i",
				"subsets": "cyrillic,cyrillic-ext,greek,latin,latin-ext,vietnamese"
			},
			"Vidaloka": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Viga": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Vina Sans": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Voces": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Volkhov": {
				"category": "serif",
				"variants": "400,400i,700,700i",
				"subsets": "latin"
			},
			"Vollkorn": {
				"category": "serif",
				"variants": "400,500,600,700,800,900,400i,500i,600i,700i,800i,900i",
				"subsets": "cyrillic,cyrillic-ext,greek,latin,latin-ext,vietnamese"
			},
			"Vollkorn SC": {
				"category": "serif",
				"variants": "400,600,700,900",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Voltaire": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Vujahday Script": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Waiting for the Sunrise": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Wallpoet": {
				"category": "display",
				"variants": "400",
				"subsets": "latin"
			},
			"Walter Turncoat": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Warnes": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Water Brush": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Waterfall": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Wavefont": {
				"category": "display",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "latin"
			},
			"Wellfleet": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Wendy One": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Whisper": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"WindSong": {
				"category": "handwriting",
				"variants": "400,500",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Wire One": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "latin"
			},
			"Wittgenstein": {
				"category": "serif",
				"variants": "400,500,600,700,800,900,400i,500i,600i,700i,800i,900i",
				"subsets": "latin,latin-ext"
			},
			"Wix Madefor Display": {
				"category": "sans-serif",
				"variants": "400,500,600,700,800",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Wix Madefor Text": {
				"category": "sans-serif",
				"variants": "400,400i,500,500i,600,600i,700,700i,800,800i",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Work Sans": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Workbench": {
				"category": "monospace",
				"variants": "400",
				"subsets": "latin,math,symbols"
			},
			"Xanh Mono": {
				"category": "monospace",
				"variants": "400,400i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Yaldevi": {
				"category": "sans-serif",
				"variants": "200,300,400,500,600,700",
				"subsets": "latin,latin-ext,sinhala"
			},
			"Yanone Kaffeesatz": {
				"category": "sans-serif",
				"variants": "200,300,400,500,600,700",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,math,symbols,vietnamese"
			},
			"Yantramanav": {
				"category": "sans-serif",
				"variants": "100,300,400,500,700,900",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Yarndings 12": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,math,symbols"
			},
			"Yarndings 12 Charted": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,math,symbols"
			},
			"Yarndings 20": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,math,symbols"
			},
			"Yarndings 20 Charted": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,math,symbols"
			},
			"Yatra One": {
				"category": "display",
				"variants": "400",
				"subsets": "devanagari,latin,latin-ext"
			},
			"Yellowtail": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Yeon Sung": {
				"category": "display",
				"variants": "400",
				"subsets": "korean,latin"
			},
			"Yeseva One": {
				"category": "display",
				"variants": "400",
				"subsets": "cyrillic,cyrillic-ext,latin,latin-ext,vietnamese"
			},
			"Yesteryear": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Yomogi": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "cyrillic,japanese,latin,latin-ext,vietnamese"
			},
			"Young Serif": {
				"category": "serif",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Yrsa": {
				"category": "serif",
				"variants": "300,400,500,600,700,300i,400i,500i,600i,700i",
				"subsets": "latin,latin-ext,vietnamese"
			},
			"Ysabeau": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "cyrillic,cyrillic-ext,greek,latin,latin-ext,math,symbols,vietnamese"
			},
			"Ysabeau Infant": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "cyrillic,cyrillic-ext,greek,latin,latin-ext,math,symbols,vietnamese"
			},
			"Ysabeau Office": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i",
				"subsets": "cyrillic,cyrillic-ext,greek,latin,latin-ext,math,symbols,vietnamese"
			},
			"Ysabeau SC": {
				"category": "sans-serif",
				"variants": "100,200,300,400,500,600,700,800,900",
				"subsets": "cyrillic,cyrillic-ext,greek,latin,latin-ext,math,symbols,vietnamese"
			},
			"Yuji Boku": {
				"category": "serif",
				"variants": "400",
				"subsets": "cyrillic,japanese,latin,latin-ext"
			},
			"Yuji Hentaigana Akari": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "japanese,latin,latin-ext"
			},
			"Yuji Hentaigana Akebono": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "japanese,latin,latin-ext"
			},
			"Yuji Mai": {
				"category": "serif",
				"variants": "400",
				"subsets": "cyrillic,japanese,latin,latin-ext"
			},
			"Yuji Syuku": {
				"category": "serif",
				"variants": "400",
				"subsets": "cyrillic,japanese,latin,latin-ext"
			},
			"Yusei Magic": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "japanese,latin,latin-ext"
			},
			"ZCOOL KuaiLe": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "chinese-simplified,latin"
			},
			"ZCOOL QingKe HuangYou": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "chinese-simplified,latin"
			},
			"ZCOOL XiaoWei": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "chinese-simplified,latin"
			},
			"Zain": {
				"category": "sans-serif",
				"variants": "200,300,400,700,800,900",
				"subsets": "arabic,latin"
			},
			"Zen Antique": {
				"category": "serif",
				"variants": "400",
				"subsets": "cyrillic,greek,japanese,latin,latin-ext"
			},
			"Zen Antique Soft": {
				"category": "serif",
				"variants": "400",
				"subsets": "cyrillic,greek,japanese,latin,latin-ext"
			},
			"Zen Dots": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Zen Kaku Gothic Antique": {
				"category": "sans-serif",
				"variants": "300,400,500,700,900",
				"subsets": "cyrillic,japanese,latin,latin-ext"
			},
			"Zen Kaku Gothic New": {
				"category": "sans-serif",
				"variants": "300,400,500,700,900",
				"subsets": "cyrillic,japanese,latin,latin-ext"
			},
			"Zen Kurenaido": {
				"category": "sans-serif",
				"variants": "400",
				"subsets": "cyrillic,greek,japanese,latin,latin-ext"
			},
			"Zen Loop": {
				"category": "display",
				"variants": "400,400i",
				"subsets": "latin,latin-ext"
			},
			"Zen Maru Gothic": {
				"category": "sans-serif",
				"variants": "300,400,500,700,900",
				"subsets": "cyrillic,greek,japanese,latin,latin-ext"
			},
			"Zen Old Mincho": {
				"category": "serif",
				"variants": "400,500,600,700,900",
				"subsets": "cyrillic,greek,japanese,latin,latin-ext"
			},
			"Zen Tokyo Zoo": {
				"category": "display",
				"variants": "400",
				"subsets": "latin,latin-ext"
			},
			"Zeyada": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "latin"
			},
			"Zhi Mang Xing": {
				"category": "handwriting",
				"variants": "400",
				"subsets": "chinese-simplified,latin"
			},
			"Zilla Slab": {
				"category": "serif",
				"variants": "300,300i,400,400i,500,500i,600,600i,700,700i",
				"subsets": "latin,latin-ext"
			},
			"Zilla Slab Highlight": {
				"category": "serif",
				"variants": "400,700",
				"subsets": "latin,latin-ext"
			}
		}

		var dictionaries = {
			'en': {
				'selectFont': 'Select a font',
				'search': 'Search',
				'allLangs': 'All languages',
				'favFonts': 'Favorite fonts',
				'localFonts': 'Local fonts',
				'googleFonts': 'Google fonts',
				'select': 'Select',
				'styles': 'styles',
				'sampleText': 'The quick brown fox jumps over the lazy dog.',
				'sampleTextEditable': 'Sample text, editable'
			},
			'nl': {
				'selectFont': 'Kies een lettertype',
				'search': 'Zoek',
				'allLangs': 'Alle talen',
				'favFonts': 'Favoriete lettertypen',
				'localFonts': 'Lokale lettertypen',
				'googleFonts': 'Google lettertypen',
				'select': 'Kies',
				'styles': 'stijlen',
				'sampleText': 'Wazig tv-filmpje rond chique skybox.',
				'sampleTextEditable': 'Voorbeeldtekst, bewerkbaar'
			},
			'de': {
				'selectFont': 'Schriftart wählen',
				'search': 'Suchen',
				'allLangs': 'Alle Sprachen',
				'favFonts': 'Favorisierte Schriftarten',
				'localFonts': 'Lokale Schriftarten',
				'googleFonts': 'Google Schriftarten',
				'select': 'Wählen',
				'styles': 'stile',
				'sampleText': 'Vogel Quax zwickt Johnys Pferd Bim.',
				'sampleTextEditable': 'Beispieltext, editierbar'
			},
			'es': {
				'selectFont': 'Seleccionar fuente',
				'search': 'Buscar',
				'allLangs': 'Todos los idiomas',
				'favFonts': 'Fuentes favoritas',
				'localFonts': 'Fuentes locales',
				'googleFonts': 'Fuentes de Google',
				'select': 'Seleccionar',
				'styles': 'estilos',
				'sampleText': 'La cigüeña tocaba cada vez mejor el saxofón y el búho pedía kiwi y queso',
				'sampleTextEditable': 'Texto de ejemplo, editable'
			},
			'fr': {
				'selectFont': 'Selectionner une police',
				'search': 'Rechercher',
				'allLangs': 'Toutes les langues',
				'favFonts': 'Polices favorites',
				'localFonts': 'Polices locales',
				'googleFonts': 'Polices Google',
				'select': 'Selectionner',
				'styles': 'Styles',
				'sampleText': 'Le vif renard brun saute par-dessus le chien paresseux.',
				'sampleTextEditable': 'Texte d\'exemple, éditable'
			}
		};

		var settings = {
			lang: 'en', // Interface language
			variants: true, // Whether or not to show font variants
			nrRecents: 3, // How many recently picked fonts to remember (shown in 'Favorite fonts' section)
			lazyLoad: true, // Whether or not to lazy load fonts
			debug: false, // Debugging shows some useful info in console
			localFontsUrl: '/fonts/', // Where .woff/.ttf files (for local fonts) reside
			localFontsType: 'woff', // Either 'ttf', 'woff', 'woff2' or 'otf'
			parentElement: 'body', // What element to attach the Fontpicker to

			localFonts: {// Default: web safe fonts available on all platforms
				"Arial": {
					"category": "sans-serif",
					"variants": "400,400i,700,700i"
				},
				"Courier New": {
					"category": "monospace",
					"variants": "400,400i,700,700i"
				},
				"Georgia": {
					"category": "serif",
					"variants": "400,400i,700,700i"
				},
				"Tahoma": {
					"category": "sans-serif",
					"variants": "400,400i,700,700i"
				},
				"Times New Roman": {
					"category": "serif",
					"variants": "400,400i,700,700i"
				},
				"Trebuchet MS": {
					"category": "sans-serif",
					"variants": "400,400i,700,700i"
				},
				"Verdana": {
					"category": "sans-serif",
					"variants": "400,400i,700,700i",
				}
			}
		}; // End settings

		var Fontpicker = (function() {

			function Fontpicker(original, options) {
				if (options.googleFonts && Array.isArray(options.googleFonts)) {
					// User supplied an array of Google fonts.
					var googleFonts = {}, fontFamily;
					for (var f = 0; f < options.googleFonts.length; f++) {
						fontFamily = options.googleFonts[f];
						googleFonts[fontFamily] = __googleFonts[fontFamily];
					}
					options.googleFonts = googleFonts;
				}
				else if (false !== options.googleFonts) {
					// If user did not supply a subset of Google Fonts, list them all
					options.googleFonts = __googleFonts;
				}

				if (!options.localFonts) {
					options.localFonts = [];
				}

				if (!dictionaries[options.lang]) {
					options.lang = 'en';
				}

				this.dictionary = dictionaries[options.lang];

				this.allFonts = {'google':options.googleFonts, 'local':options.localFonts};
				this.options = options;
				this.$original = $(original);
				this.setupHtml();
				this.bindEvents();
			}

			Fontpicker.prototype = {

				/**
				 * Load font, either from Google or from local url.
				 *
				 * @param {string} type Font type, either 'google' or 'local'.
				 * @param {string} font Font family name. F.e: 'Chakra', 'Zilla Slab'.
				 */
				loadFont: function(type, font) {
					if (fontsLoaded[font]) { return; }
					fontsLoaded[font] = true;

					switch(type) {
						case 'google':
							this.options.debug && console.log('Loading Google font ' + font + ' from ' + url);
							var url = 'https://fonts.googleapis.com/css?family=' + font.replace(/ /g,'+') + ':' + this.options.googleFonts[font].variants + '&display=swap';
							$('head').append($('<link>', {href:url, rel:'stylesheet', type:'text/css'}));
							break;

						case 'local':
							if (/^(Arial|Courier New|Georgia|Tahoma|Times New Roman|Trebuchet MS|Verdana)$/i.test(font)) { break }
							
							this.options.debug && console.log('Loading local font ' + font);
							if ('FontFace' in window) {
								new FontFace(font, "url('" + this.options.localFontsUrl + font + "." + this.options.localFontsType +"')").load().then(function(font) {
									document.fonts.add(font);
								});
							}
							else {
								var map = {ttf:'truetype', woff:'woff', woff2:'woff2', otf:'opentype'};
								$('head').append("<style> @font-face { font-family:'" + font + "'; src:local('" + font + "'), url('" + this.options.localFontsUrl + font + "." + this.options.localFontType + "') format('" + map[this.options.localFontType] + "'); } </style>");
							}
							break;
					}
				},

				/**
				 * Show an (editable) font sample.
				 *
				 * @param {object} $li jQuery list object to extract font spec from (stored in data attributes).
				 */
				showSample: function($li) {
					$('.fp-sample', this.$element).css({
						fontFamily: "'" + $li.data('font-family') + "'",
						fontStyle: $li.data('font-italic') ? 'italic' : 'normal',
						fontWeight: $li.data('font-weight') || 400
					});
				},

				/**
				 * Handle key presses.
				 *
				 * @param {object} e Event.
				 * @param {object} el Element that received the event.
				 */
				keyDown: function(e, el) {
					function stop(e) {
						e.preventDefault();
						e.stopPropagation();
					}

					var $activeLi = $('li.fp-active:visible', this.$results);

					if ((e.keyCode >= 49 && e.keyCode <= 57) || (e.keyCode >= 97 && e.keyCode <= 105)) {
						// Numbers 1-9
						stop(e);
						var fw = 100 * (e.keyCode - (e.keyCode >= 97 ? 96 : 48));
						$('.fp-pill[data-font-weight='+fw+']', $activeLi).trigger('click');
						return;
					}

					switch(e.keyCode) {
						case 73: // i, italic
							stop(e);
							$('.fp-pill.italic:visible', $activeLi).trigger('click');
							break;

						case 38: // Cursor up
							stop(e);
							$prevLi = $activeLi.prevAll(':not(.fp-divider):visible:first');
							if ($prevLi.length == 0) {
								$prevLi = $('li:not(.fp-divider):visible:last', this.$results);
							}
							$prevLi.trigger('mouseenter').trigger('click');

							__scrollIntoViewIfNeeded($prevLi[0]);
							break;

						case 40: // Cursor down
							stop(e);
							$nextLi = $activeLi.nextAll(':not(.fp-divider):visible:first');
							if ($nextLi.length == 0) {
								$nextLi = $('li:not(.fp-divider):visible:first', this.$results);
							}
							$nextLi.trigger('mouseenter').trigger('click');

							__scrollIntoViewIfNeeded($nextLi[0]);
							break;

						case 13: // Enter
							stop(e);
							$('li.fp-active', this.$results).find('button.apply').trigger('click');
							break;

						case 27: // Esc
							stop(e);
							$('.fp-close', this.$modal).trigger('click');
							break;
					}
				},

				/**
				 * Handle mouse enter events on items in the font list.
				 *
				 * @param {object} e Event.
				 * @param {object} el Element that received the event.
				 */
				mouseEnter: function(e, el) {
					var $li = $(el);
					$('li.fp-hover', this.$results).removeClass('fp-hover');
					$li.addClass('fp-hover');

					this.loadFont($li.data('font-type'), $li.data('font-family'));
					this.showSample($li);
				},

				/**
				 * Handle clicks on items in the font list.
				 * @param {object} e Event.
				 * @param {object} el Element that received the event.
				 */
				click: function(e, el) {
					var $li = $(el), self = this,
						fontType = $li.data('font-type'),
						fontFamily = $li.data('font-family'),
						italic = $li.data('font-italic') || false,
						weight = $li.data('font-weight') || 400,
						$lis = $("li[data-font-family='" + fontFamily + "']", this.$results),
						favorites = __cookie('favs'),
						favoriteFonts = favorites ? favorites.split(',') : [];

					$('li.fp-active', this.$results).removeClass('fp-active').find('.fp-variants,.fp-btns').remove();

					$li.addClass('fp-active');

					var $btns = $('<div class="fp-btns">'),
						isFav = favoriteFonts.indexOf(fontType + ':' + fontFamily) != -1;

					$btns.append(
						$('<span class="fp-favorite' + (isFav ? ' checked' : '') + '"></span>')
						.on('click', function(e) {
							e.stopPropagation();

							var idx = favoriteFonts.indexOf(fontType + ':' + fontFamily);
							if ($(this).is('.checked')) {
								// Remove from favorites
								if (idx != -1) {
									favoriteFonts.splice(idx, 1);
								}
							}
							else {
								// Add to favorites
								if (-1 == idx) {
									favoriteFonts.push(fontType + ':' + fontFamily);
								}
							}
							$(this).toggleClass('checked');
							__cookie('favs', favoriteFonts.join(','));
						}),

						$('<button type="button" class="fp-btn apply">')
						.html(this.dictionary['select'])
						.on('click', function(e) {
							e.stopPropagation();

							italic = $li.data('font-italic');
							weight = $li.data('font-weight') || 400;

							var value = fontFamily;
							if (self.options.variants) {
								value += ':' + weight + (italic ? 'i':'');
							}

							self.$select.css({
								fontFamily: "'" + fontFamily  + "'",
								fontStyle: italic ? 'italic' : 'normal',
								fontWeight: weight
							}).find('.fp-fontspec').html(value);

							self.$original.val(value).change(); // Update original <input> element

							// Call onSelect callback, if specified
							if (!!self.options.onSelect) {
								self.options.onSelect({
									fontType: fontType,
									fontFamily: fontFamily,
									fontStyle: italic ? 'italic' : 'normal',
									fontWeight: weight,
									fontSpec: value
								});
							}

							self.toggleModal('hide');

							// Save recent
							if (!!self.options.nrRecents) {
								var recentFonts = __cookie('recents'),
									cookieVal = $li.data('font-type') + ':' + fontFamily;

								recentFonts = recentFonts ? recentFonts.split(',') : [];
								if (recentFonts.indexOf(cookieVal) == -1) {
									recentFonts.unshift(cookieVal);
								}

								recentFonts = recentFonts.slice(0,self.options.nrRecents); // Remember last X
								__cookie('recents', recentFonts.join(','));
							}
						})
					)
					$btns.appendTo($li);

					var font = this.allFonts[fontType][fontFamily],
						variants = font.variants ? font.variants.split(',') : [];

					if (this.options.variants && variants.length > 1) {
						var $variants = $('<div class="fp-variants">'),
							hasItalic = false;

						for (var v = 0; v < variants.length; v++) {
							if (/i$/.test(variants[v])) {
								if (!hasItalic) { hasItalic = true; }
								continue;
							}

							let variant = variants[v],
								fontWeight = +variant.replace(/i$/,'');

							v > 0 && $variants.append(' '); // Separate by space

							$('<span data-font-weight="' + fontWeight + '" class="fp-pill weight' + (weight == fontWeight ? ' checked' : '') + '">')
							.text(variant)
							.on('click', function(e) {
								e.stopPropagation();

								if (variants.indexOf(fontWeight+'i') == -1) {
									// This font weight does not have an italic variant
									$('.fp-pill.italic', $li).removeClass('checked').css('display', 'none');
									italic = false;
									$li.data('font-italic', italic);
								}
								else {
									// This font weight does have an italic variant
									$('.fp-pill.italic', $li).css('display', '');
								}

								$('span.fp-pill.weight', $li).removeClass('checked');
								$(this).addClass('checked');

								$lis.data('font-weight', fontWeight); // Set for favorite and normal

								self.showSample($li);
							})
							.appendTo($variants);
						}

						if (hasItalic) {
							$variants.append(' ');
							$('<span class="fp-pill italic ' + (italic ? ' checked' : '') + '">')
							.css('display', variants.indexOf(weight+'i') == -1 ? 'none' : '')
							.html('italic')
							.on('click', function(e) {
								e.stopPropagation();
								italic = !italic;
								$(this).toggleClass('checked');

								$lis.data('font-italic', italic); // Set for favorite and normal

								self.showSample($li);
							}).appendTo($variants);
						}

						$li.append($variants);
					}

					else if (variants.length == 1 && /i$/.test(variants[0])) {
						$lis.data('font-italic', true);
					}
				},

				/**
				 * Turn a font spec (Arial:700i, Canga:400) into its components: family, weight and italic.
				 *
				 * @param {string} fontSpec The font specification to split into components.
				 * @return {object} An object containing 3 items: family (string), weight (int) and italic (bool).
				 */
				fontSpecToComponents: function(fontSpec) {
					var tmp = fontSpec.split(':'),
						family = tmp[0],
						variant = tmp[1] || '400',
						italic = false, weight = 400;

					if (/(\d+)i$/.test(variant)) {
						italic = true;
						weight = +RegExp.$1;
					}
					else {
						weight = +variant;
					}

					return {
						family: family,
						weight: weight,
						italic: italic
					}
				},

				/**
				 * Style the original input element with a font.
				 *
				 * @param {string} fontSpec The font specification, f.e: 'Changa:400i' or 'Arial'.
				 */
				applyFontToOriginalInput: function(fontSpec) {
					if ('' === fontSpec) {
						this.$select
						.removeAttr('style')
						.find('.fp-fontspec')
						.html(this.dictionary['selectFont']);

						this.$original.val('');
						return;
					}

					var font = this.fontSpecToComponents(fontSpec);
					this.loadFont(this.options.googleFonts !== false && __googleFonts[font.family] ? 'google' : 'local', font.family);

					this.$select.css({
						fontFamily: "'" + font.family + "'",
						fontStyle: font.italic ? 'italic' : 'normal',
						fontWeight: font.weight
					})
					.find('.fp-fontspec').html(fontSpec);
				},

				/**
				 * Bind all events.
				 */
				bindEvents: function() {
					var self = this;

					this.$results
					.on('keydown', function(e) {
						self.keyDown(e, this);
					})
					.on('mouseenter', 'li:not(.fp-divider):visible', function(e) {
						self.mouseEnter(e, this);
					})
					.on('click', 'li:not(.fp-divider):visible', function(e) {
						self.click(e, this);
					})
					.on('dblclick', 'li:not(.fp-divider):visible', function(e) {
						$('li.fp-active', this.$results).find('button.apply').trigger('click');
					});

					this.$original.on('change', function(e) {
						self.applyFontToOriginalInput(this.value);
					});
				},

				/**
				 * Automatically load fonts as they come in to view.
				 */
				lazyLoad: function() {
					if (!window.IntersectionObserver) { return; }

					var self = this, $li;

					var observer = new IntersectionObserver(function(lis) {
						[].forEach.call(lis, function(li) {
							if (li.intersectionRatio > 0) {
								observer.unobserve(li.target); // Load only once per li
								$li = $(li.target);
								self.loadFont($li.data('font-type'), $li.data('font-family'));
								$li.css('fontFamily', "'" + $li.data('font-family') + "'");
							}
						});
					});

					$('li:not(.fp-divider)', this.$results).each(function() {
						observer.observe(this);
					});
				},

				/**
				 * Show or hide the fontpicker modal window.
				 *
				 * @param {string} state Either 'hide' or 'show'. When omitted visibility of the modal is toggled.
				 */
				toggleModal: function(state) {
					if (!state) {
						state = this.$modal.is(':visible') ? 'hide' : 'show';
					}

					if ('hide' == state) {
						// Hide modal
						$('.fp-fav,.fp-variants,.fp-btns').remove();

						this.$modal.css('display','none');
						$('.fp-modal-backdrop', this.$element).remove();
						$(this.options.parentElement).removeClass('fp-modal-open');
						$('span', this.$select).focus();
					}
					else {
						// Show modal
						$(this.options.parentElement).addClass('fp-modal-open');

						this.$element.append(
							$('<div class="fp-modal-backdrop">')
							.on('click', function() {
								// Click outside modal window closes the modal
								$('.fp-close', this.$modal).trigger('click');
							})
						);

						this.$modal.css('display','flex');

						this.getFavorites(); // List favorites & recents

						var fontSpec = this.$original.val();
						if (fontSpec) {
							var font = this.fontSpecToComponents(fontSpec),
								$li = $("li[data-font-family='" + font.family + "']", this.$results); // Either 0, 1 or 2 elements

							if ($li.length > 0) {
								$li.data({
									'font-italic': font.italic,
									'font-weight': font.weight
								}).eq(0).trigger('click');

								__scrollIntoViewIfNeeded($li[0]);
							}
						}
						else {
							this.$results.scrollTop(0);
						}

						this.options.lazyLoad && this.lazyLoad();
						this.$results.focus(); // Make keyboard work
					}
				},

				/**
				 * Apply user filters to font list: language, categories and search term.
				 */
				applyFilter: function() {
					var lang = this.$lang.val(),
						searchTerm = this.$search.val().trim(),
						cats = [];

					$('.fp-category', this.$filter).each(function() {
						if ($(this).hasClass('checked')) {
							cats.push($(this).data('category'));
						}
					});

					// Remember lang and cats
					__cookie('lang', '' === lang ? false : lang);
					__cookie('cats', cats.join(','));

					for (var c in this.allFonts) {
						for (var f in this.allFonts[c]) {
							var item = this.allFonts[c][f],
								langs = (item.subsets && item.subsets != '*') ? item.subsets.split(',') : [],
								$li = $("li[data-font-family='" + f + "']", this.$results),
								cat = item.category || 'other';

							if ( ('' == lang || langs.indexOf(lang) != -1) &&
								 ('*' == cat || cats.indexOf(cat) != -1) &&
								 ('' == searchTerm || f.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1) ) {
								$li.show();
							}
							else {
								$li.hide();
							}
						}
					}
				},

				/**
				 * Construct filter UI.
				 */
				getFilterUI: function() {
					var self = this,
						$searchWrap = $('<div class="fp-search-wrap">');

					this.$filter = $('<div class="fp-filter">');

					// Search input
					this.$search = $('<input>', {'class':'fp-search', type:'text', placeholder:this.dictionary['search'], spellcheck:false})
					.on('keyup', function() {
						self.applyFilter();
					})
					.appendTo($searchWrap);

					// Clear button
					$('<div class="fp-clear">')
					.on('click', function() {
						self.$search.val('').focus();
						self.applyFilter();
					})
					.appendTo($searchWrap);

					// Language pulldown
					var opts = ['<option value="">' + this.dictionary['allLangs'] + '</option>'];
					for (var l in googleFontLangs) {
						opts.push('<option value="' + l + '">' + googleFontLangs[l] + '</option>');
					}
					this.$lang = $('<select class="fp-lang">').on('change', function() {
						self.applyFilter();
					}).html(opts.join(''));

					this.$filter.append(
						$('<div class="fp-row">').append(
							$searchWrap,
							this.$lang
						)
					);

					$('<div class="hr">').appendTo(this.$filter);

					var gFontCats = googleFontCats.slice(0); // Clone
					gFontCats.push('other');
					for (var g = 0; g < gFontCats.length; g++) {
						$('<span class="fp-category fp-pill checked">')
						.data('category', gFontCats[g])
						.text(gFontCats[g])
						.on('click', function() {
							$(this).toggleClass('checked');
							self.applyFilter();
						})
						.appendTo(this.$filter);
					}
				},

				/**
				 * Construct font list.
				 */
				getFontsList: function() {
					var self = this,
						$frag = $(document.createDocumentFragment()), // Use a document fragment to increase performance
						$li,
						fontFamily;

					function append(fontType, fontFamily) {
						var font = self.allFonts[fontType][fontFamily], small = '';
						if (!font) { return; } // Continue if font does not exist

						if ((font.category && font.category != '*') || font.variants) {
							var items = [];
							if (font.category) { items.push(font.category); }
							if (self.options.variants && font.variants) {
								var nr = font.variants.split(',').length;
								if (nr > 1) {
									items.push(nr + ' ' + self.dictionary['styles']);
								}
							}
							small = ' <small>' + items.join(', ') + '</small>';
						}

						$li = $('<li>', {'data-font-type':fontType, 'data-font-family':fontFamily})
						.html(fontFamily + small);

						$frag.append($li[0]);
					}

					// Local fonts
					if (objLength(this.options.localFonts) > 0) {
						$li = $('<li class="fp-divider">' + this.dictionary['localFonts'] + '</li>');
						$frag.append($li[0]);
						for (fontFamily in this.options.localFonts) {
							append('local', fontFamily);
						}
					}

					// Google fonts
					if (objLength(this.options.googleFonts) > 0) {
						$li = $('<li class="fp-divider">' + this.dictionary['googleFonts'] + '</li>');
						$frag.append($li[0]);
						for (fontFamily in this.options.googleFonts) {
							append('google', fontFamily);
						}
					}

					this.$results = $('<ul>', {'class':'fp-results', tabindex:0}).append($frag);
				},

				/**
				 * Construct list of favorited and recently picked fonts
				 */
				getFavorites: function() {
					var favoriteFonts = __cookie('favs'),
						recentFonts = __cookie('recents');

					favoriteFonts = favoriteFonts ? favoriteFonts.split(',') : [];
					recentFonts = (!!this.options.nrRecents && recentFonts) ? recentFonts.split(',') : [];

					// Dedupe:
					var fonts = recentFonts.slice(0);
					for (var f = 0; f < favoriteFonts.length; f++) {
						if (fonts.indexOf(favoriteFonts[f]) == -1) {
							fonts.push(favoriteFonts[f]);
						}
					}

					var $frag = $(document.createDocumentFragment()), $li = null, $orgLi, tmp, fontType, fontFamily, font;

					for (var f = 0; f < fonts.length; f++) {
						tmp = fonts[f].split(':'), fontType = tmp[0], fontFamily = tmp[1], font = this.allFonts[fontType][fontFamily];
						if (!font) { continue; }

						$orgLi = $("[data-font-family='" + fontFamily + "']", this.$results);
						if ($orgLi.length > 0) {
							$li = $orgLi.clone().addClass('fp-fav');
							$frag.append($li[0]);
						}
					}

					if (null !== $li) {
						$frag.prepend($('<li class="fp-fav fp-divider">' + this.dictionary['favFonts'] + '</li>')[0]);
						this.$results.prepend($frag);
					}
				},

				/**
				 * Setup HTML structure for the font picker.
				 */
				setupHtml: function() {
					var self = this,
						fontSpec = this.$original.val();

					this.$original.hide();

					this.$select =
						$('<div class="font-picker fp-select">')
						.on('click', function() {
							self.toggleModal('show');
						})
						.on('keydown', function(e) {
							// Open the modal with spacebar
							if (e.keyCode == 32) {
								e.stopPropagation();
								e.preventDefault();
								self.toggleModal('show');
							}
						})
						.append('<span class="fp-fontspec" tabindex="0">' + (fontSpec ? fontSpec : this.dictionary['selectFont']) + '</span>');


					if (!!self.options.showClear) {
						// Add a clear button
						self.$select
						.append($('<span class="fp-clear"></span>')
						.on('click', function(e) {
							e.stopPropagation();

							self.$select
							.removeAttr('style')
							.find('.fp-fontspec')
							.html(self.dictionary['selectFont']);;

							self.$original.val('').change(); // Update original <input> element
						}));
					}

					this.$original.after(this.$select);

					this.$element = $('<div>', {'class': 'font-picker'});

					this.$modal = $('<div class="fp-modal">').appendTo(this.$element);

					this.$modal.append(
						$('<div class="fp-header">').append(
							$('<div class="fp-icons">').append(
								$('<span class="fp-close">&times</span>').on('click', function() {
									self.toggleModal('hide');
								})
							),
							$('<h5>').text(this.dictionary['selectFont'])
						)
					);

					this.getFilterUI();
					this.$modal.append(this.$filter);

					this.$sample = $('<div>', {'class':'fp-sample', contenteditable:true, spellcheck:false, title:this.dictionary['sampleTextEditable']})
						.html(this.dictionary['sampleText'])
						.appendTo(this.$modal);

					this.getFontsList();
					this.$modal.append(this.$results);

					var lang = __cookie('lang'), cats = __cookie('cats');

					if (lang) {
						this.$lang.val(lang);
					}

					if (cats) {
						cats = cats.split(',');
						$('.fp-category', this.$filter).each(function() {
							if (-1 == cats.indexOf($(this).data('category'))) {
								$(this).removeClass('checked');
							}
							else {
								$(this).addClass('checked');
							}
						});
					}

					if (lang || cats) {
						self.applyFilter();
					}

					fontSpec && self.applyFontToOriginalInput(fontSpec);

					$(this.options.parentElement).append(this.$element);
				},

				//
				// Public Methods, via $element.fontpicker(method)
				//

				/**
				 * Show the fontpicker.
				 */
				show: function() {
					var el = $(this).data('plugin_' + pluginName);
					if (!el.$select) {
						throw new Error('jquery.'+pluginName+': Cannot show, as I\'ve been destroyed.');
					}
					el.toggleModal('show');
				},

				/**
				 * Hide the fontpicker.
				 */
				hide: function() {
					var el = $(this).data('plugin_' + pluginName);
					if (!el.$select) {
						throw new Error('jquery.'+pluginName+': Cannot hide, as I\'ve been destroyed.');
					}
					el.toggleModal('hide');
				},

				/**
				 * Destroy the fontpicker plugin, revert element back to original.
				 */
				destroy: function() {
					var el = $(this).data('plugin_' + pluginName);
					if (!el.$select) {
						throw new Error('jquery.'+pluginName+': Cannot destroy, as I\'ve been destroyed already.');
					}
					el.toggleModal('hide');
					el.$select.remove();
					el.$element.remove();
					el.$original.off('setFont');
					el.$original.show();
					el.$select = el.$element = el.$original = el.$modal = null;
					$(el).removeData('plugin_' + pluginName);
				}
			}; // End prototype

			return Fontpicker;
		})();

		if (typeof arguments[0] === 'string') {
			var methodName = arguments[0],
				args = Array.prototype.slice.call(arguments, 1),
				returnVal;

			this.each(function() {
				if ($.data(this, 'plugin_' + pluginName) && typeof $.data(this, 'plugin_' + pluginName)[methodName] === 'function') {
					returnVal = $.data(this, 'plugin_' + pluginName)[methodName].apply(this, args);
				}
				else {
					throw new Error('jquery.'+pluginName+': Method ' +  methodName + ' does not exist.');
				}
			});

			return returnVal !== undefined ? returnVal : this; // Preserve chainablility
		}

		return this.each(function() {
			if (!$.data(this, 'plugin_'+pluginName)) {
				// If options exist, merge them
				options && $.extend(settings, options);
				$.data(this, 'plugin_'+pluginName, new Fontpicker(this, settings));
			}
		});
	};
})(jQuery);
