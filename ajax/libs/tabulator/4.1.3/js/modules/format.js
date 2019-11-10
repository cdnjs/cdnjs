var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* Tabulator v4.1.3 (c) Oliver Folkerd */

var Format = function Format(table) {
	this.table = table; //hold Tabulator object
};

//initialize column formatter
Format.prototype.initializeColumn = function (column) {
	var self = this,
	    config = { params: column.definition.formatterParams || {} };

	//set column formatter
	switch (_typeof(column.definition.formatter)) {
		case "string":

			if (column.definition.formatter === "tick") {
				column.definition.formatter = "tickCross";

				if (typeof config.params.crossElement == "undefined") {
					config.params.crossElement = false;
				}

				console.warn("DEPRECATION WANRING - the tick formatter has been depricated, please use the tickCross formatter with the crossElement param set to false");
			}

			if (self.formatters[column.definition.formatter]) {
				config.formatter = self.formatters[column.definition.formatter];
			} else {
				console.warn("Formatter Error - No such formatter found: ", column.definition.formatter);
				config.formatter = self.formatters.plaintext;
			}
			break;

		case "function":
			config.formatter = column.definition.formatter;
			break;

		default:
			config.formatter = self.formatters.plaintext;
			break;
	}

	column.modules.format = config;
};

Format.prototype.cellRendered = function (cell) {
	if (cell.column.modules.format.renderedCallback) {
		cell.column.modules.format.renderedCallback();
	}
};

//return a formatted value for a cell
Format.prototype.formatValue = function (cell) {
	var component = cell.getComponent(),
	    params = typeof cell.column.modules.format.params === "function" ? cell.column.modules.format.params(component) : cell.column.modules.format.params;

	function onRendered(callback) {
		cell.column.modules.format.renderedCallback = callback;
	}

	return cell.column.modules.format.formatter.call(this, component, params, onRendered);
};

Format.prototype.sanitizeHTML = function (value) {
	if (value) {
		var entityMap = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#39;',
			'/': '&#x2F;',
			'`': '&#x60;',
			'=': '&#x3D;'
		};

		return String(value).replace(/[&<>"'`=\/]/g, function (s) {
			return entityMap[s];
		});
	} else {
		return value;
	}
};

Format.prototype.emptyToSpace = function (value) {
	return value === null || typeof value === "undefined" ? "&nbsp" : value;
};

//get formatter for cell
Format.prototype.getFormatter = function (formatter) {
	var formatter;

	switch (typeof formatter === "undefined" ? "undefined" : _typeof(formatter)) {
		case "string":
			if (this.formatters[formatter]) {
				formatter = this.formatters[formatter];
			} else {
				console.warn("Formatter Error - No such formatter found: ", formatter);
				formatter = this.formatters.plaintext;
			}
			break;

		case "function":
			formatter = formatter;
			break;

		default:
			formatter = this.formatters.plaintext;
			break;
	}

	return formatter;
};

//default data formatters
Format.prototype.formatters = {
	//plain text value
	plaintext: function plaintext(cell, formatterParams, onRendered) {
		return this.emptyToSpace(this.sanitizeHTML(cell.getValue()));
	},

	//html text value
	html: function html(cell, formatterParams, onRendered) {
		return cell.getValue();
	},

	//multiline text area
	textarea: function textarea(cell, formatterParams, onRendered) {
		cell.getElement().style.whiteSpace = "pre-wrap";
		return this.emptyToSpace(this.sanitizeHTML(cell.getValue()));
	},

	//currency formatting
	money: function money(cell, formatterParams, onRendered) {
		var floatVal = parseFloat(cell.getValue()),
		    number,
		    integer,
		    decimal,
		    rgx;

		var decimalSym = formatterParams.decimal || ".";
		var thousandSym = formatterParams.thousand || ",";
		var symbol = formatterParams.symbol || "";
		var after = !!formatterParams.symbolAfter;
		var precision = typeof formatterParams.precision !== "undefined" ? formatterParams.precision : 2;

		if (isNaN(floatVal)) {
			return this.emptyToSpace(this.sanitizeHTML(cell.getValue()));
		}

		number = precision !== false ? floatVal.toFixed(precision) : floatVal;
		number = String(number).split(".");

		integer = number[0];
		decimal = number.length > 1 ? decimalSym + number[1] : "";

		rgx = /(\d+)(\d{3})/;

		while (rgx.test(integer)) {
			integer = integer.replace(rgx, "$1" + thousandSym + "$2");
		}

		return after ? integer + decimal + symbol : symbol + integer + decimal;
	},

	//clickable anchor tag
	link: function link(cell, formatterParams, onRendered) {
		var value = this.sanitizeHTML(cell.getValue()),
		    urlPrefix = formatterParams.urlPrefix || "",
		    label = this.emptyToSpace(value),
		    el = document.createElement("a"),
		    data;

		if (formatterParams.labelField) {
			data = cell.getData();
			label = data[formatterParams.labelField];
		}

		if (formatterParams.label) {
			switch (_typeof(formatterParams.label)) {
				case "string":
					label = formatterParams.label;
					break;

				case "function":
					label = formatterParams.label(cell);
					break;
			}
		}

		if (formatterParams.urlField) {
			data = cell.getData();
			value = data[formatterParams.urlField];
		}

		if (formatterParams.url) {
			switch (_typeof(formatterParams.url)) {
				case "string":
					value = formatterParams.url;
					break;

				case "function":
					value = formatterParams.url(cell);
					break;
			}
		}

		el.setAttribute("href", urlPrefix + value);

		if (formatterParams.target) {
			el.setAttribute("target", formatterParams.target);
		}

		el.innerHTML = this.emptyToSpace(label);

		return el;
	},

	//image element
	image: function image(cell, formatterParams, onRendered) {
		var el = document.createElement("img");
		el.setAttribute("src", cell.getValue());

		switch (_typeof(formatterParams.height)) {
			case "number":
				element.style.height = formatterParams.height + "px";
				break;

			case "string":
				element.style.height = formatterParams.height;
				break;
		}

		switch (_typeof(formatterParams.width)) {
			case "number":
				element.style.width = formatterParams.width + "px";
				break;

			case "string":
				element.style.width = formatterParams.width;
				break;
		}

		el.addEventListener("load", function () {
			cell.getRow().normalizeHeight();
		});

		return el;
	},

	//tick or cross
	tickCross: function tickCross(cell, formatterParams, onRendered) {
		var value = cell.getValue(),
		    element = cell.getElement(),
		    empty = formatterParams.allowEmpty,
		    truthy = formatterParams.allowTruthy,
		    tick = typeof formatterParams.tickElement !== "undefined" ? formatterParams.tickElement : '<svg enable-background="new 0 0 24 24" height="14" width="14" viewBox="0 0 24 24" xml:space="preserve" ><path fill="#2DC214" clip-rule="evenodd" d="M21.652,3.211c-0.293-0.295-0.77-0.295-1.061,0L9.41,14.34  c-0.293,0.297-0.771,0.297-1.062,0L3.449,9.351C3.304,9.203,3.114,9.13,2.923,9.129C2.73,9.128,2.534,9.201,2.387,9.351  l-2.165,1.946C0.078,11.445,0,11.63,0,11.823c0,0.194,0.078,0.397,0.223,0.544l4.94,5.184c0.292,0.296,0.771,0.776,1.062,1.07  l2.124,2.141c0.292,0.293,0.769,0.293,1.062,0l14.366-14.34c0.293-0.294,0.293-0.777,0-1.071L21.652,3.211z" fill-rule="evenodd"/></svg>',
		    cross = typeof formatterParams.crossElement !== "undefined" ? formatterParams.crossElement : '<svg enable-background="new 0 0 24 24" height="14" width="14"  viewBox="0 0 24 24" xml:space="preserve" ><path fill="#CE1515" d="M22.245,4.015c0.313,0.313,0.313,0.826,0,1.139l-6.276,6.27c-0.313,0.312-0.313,0.826,0,1.14l6.273,6.272  c0.313,0.313,0.313,0.826,0,1.14l-2.285,2.277c-0.314,0.312-0.828,0.312-1.142,0l-6.271-6.271c-0.313-0.313-0.828-0.313-1.141,0  l-6.276,6.267c-0.313,0.313-0.828,0.313-1.141,0l-2.282-2.28c-0.313-0.313-0.313-0.826,0-1.14l6.278-6.269  c0.313-0.312,0.313-0.826,0-1.14L1.709,5.147c-0.314-0.313-0.314-0.827,0-1.14l2.284-2.278C4.308,1.417,4.821,1.417,5.135,1.73  L11.405,8c0.314,0.314,0.828,0.314,1.141,0.001l6.276-6.267c0.312-0.312,0.826-0.312,1.141,0L22.245,4.015z"/></svg>';

		if (truthy && value || value === true || value === "true" || value === "True" || value === 1 || value === "1") {
			element.setAttribute("aria-checked", true);
			return tick || "";
		} else {
			if (empty && (value === "null" || value === "" || value === null || typeof value === "undefined")) {
				element.setAttribute("aria-checked", "mixed");
				return "";
			} else {
				element.setAttribute("aria-checked", false);
				return cross || "";
			}
		}
	},

	datetime: function datetime(cell, formatterParams, onRendered) {
		var inputFormat = formatterParams.inputFormat || "YYYY-MM-DD hh:mm:ss";
		var outputFormat = formatterParams.outputFormat || "DD/MM/YYYY hh:mm:ss";
		var invalid = typeof formatterParams.invalidPlaceholder !== "undefined" ? formatterParams.invalidPlaceholder : "";
		var value = cell.getValue();

		var newDatetime = moment(value, inputFormat);

		if (newDatetime.isValid()) {
			return newDatetime.format(outputFormat);
		} else {

			if (invalid === true) {
				return value;
			} else if (typeof invalid === "function") {
				return invalid(value);
			} else {
				return invalid;
			}
		}
	},

	datetimediff: function datetime(cell, formatterParams, onRendered) {
		var inputFormat = formatterParams.inputFormat || "YYYY-MM-DD hh:mm:ss";
		var invalid = typeof formatterParams.invalidPlaceholder !== "undefined" ? formatterParams.invalidPlaceholder : "";
		var suffix = typeof formatterParams.suffix !== "undefined" ? formatterParams.suffix : false;
		var unit = typeof formatterParams.unit !== "undefined" ? formatterParams.unit : undefined;
		var humanize = typeof formatterParams.humanize !== "undefined" ? formatterParams.humanize : false;
		var date = typeof formatterParams.date !== "undefined" ? formatterParams.date : moment();
		var value = cell.getValue();

		var newDatetime = moment(value, inputFormat);

		if (newDatetime.isValid()) {
			if (humanize) {
				return moment.duration(newDatetime.diff(date)).humanize(suffix);
			} else {
				return newDatetime.diff(date, unit) + (suffix ? " " + suffix : "");
			}
		} else {

			if (invalid === true) {
				return value;
			} else if (typeof invalid === "function") {
				return invalid(value);
			} else {
				return invalid;
			}
		}
	},

	//select
	lookup: function lookup(cell, formatterParams, onRendered) {
		var value = cell.getValue();

		if (typeof formatterParams[value] === "undefined") {
			console.warn('Missing display value for ' + value);
			return value;
		}

		return formatterParams[value];
	},

	//star rating
	star: function star(cell, formatterParams, onRendered) {
		var value = cell.getValue(),
		    element = cell.getElement(),
		    maxStars = formatterParams && formatterParams.stars ? formatterParams.stars : 5,
		    stars = document.createElement("span"),
		    star = document.createElementNS('http://www.w3.org/2000/svg', "svg"),
		    starActive = '<polygon fill="#FFEA00" stroke="#C1AB60" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/>',
		    starInactive = '<polygon fill="#D2D2D2" stroke="#686868" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/>';

		//style stars holder
		stars.style.verticalAlign = "middle";

		//style star
		star.setAttribute("width", "14");
		star.setAttribute("height", "14");
		star.setAttribute("viewBox", "0 0 512 512");
		star.setAttribute("xml:space", "preserve");
		star.style.padding = "0 1px";

		value = parseInt(value) < maxStars ? parseInt(value) : maxStars;

		for (var i = 1; i <= maxStars; i++) {
			var nextStar = star.cloneNode(true);
			nextStar.innerHTML = i <= value ? starActive : starInactive;

			stars.appendChild(nextStar);
		}

		element.style.whiteSpace = "nowrap";
		element.style.overflow = "hidden";
		element.style.textOverflow = "ellipsis";

		element.setAttribute("aria-label", value);

		return stars;
	},

	//progress bar
	progress: function progress(cell, formatterParams, onRendered) {
		//progress bar
		var value = this.sanitizeHTML(cell.getValue()) || 0,
		    element = cell.getElement(),
		    max = formatterParams && formatterParams.max ? formatterParams.max : 100,
		    min = formatterParams && formatterParams.min ? formatterParams.min : 0,
		    legendAlign = formatterParams && formatterParams.legendAlign ? formatterParams.legendAlign : "center",
		    percent,
		    percentValue,
		    color,
		    legend,
		    legendColor,
		    top,
		    left,
		    right,
		    bottom;

		//make sure value is in range
		percentValue = parseFloat(value) <= max ? parseFloat(value) : max;
		percentValue = parseFloat(percentValue) >= min ? parseFloat(percentValue) : min;

		//workout percentage
		percent = (max - min) / 100;
		percentValue = Math.round((percentValue - min) / percent);

		//set bar color
		switch (_typeof(formatterParams.color)) {
			case "string":
				color = formatterParams.color;
				break;
			case "function":
				color = formatterParams.color(value);
				break;
			case "object":
				if (Array.isArray(formatterParams.color)) {
					var unit = 100 / formatterParams.color.length;
					var index = Math.floor(percentValue / unit);

					index = Math.min(index, formatterParams.color.length - 1);
					index = Math.max(index, 0);
					color = formatterParams.color[index];
					break;
				}
			default:
				color = "#2DC214";
		}

		//generate legend
		switch (_typeof(formatterParams.legend)) {
			case "string":
				legend = formatterParams.legend;
				break;
			case "function":
				legend = formatterParams.legend(value);
				break;
			case "boolean":
				legend = value;
				break;
			default:
				legend = false;
		}

		//set legend color
		switch (_typeof(formatterParams.legendColor)) {
			case "string":
				legendColor = formatterParams.legendColor;
				break;
			case "function":
				legendColor = formatterParams.legendColor(value);
				break;
			case "object":
				if (Array.isArray(formatterParams.legendColor)) {
					var unit = 100 / formatterParams.legendColor.length;
					var index = Math.floor(percentValue / unit);

					index = Math.min(index, formatterParams.legendColor.length - 1);
					index = Math.max(index, 0);
					legendColor = formatterParams.legendColor[index];
				}
				break;
			default:
				legendColor = "#000";
		}

		element.style.minWidth = "30px";
		element.style.position = "relative";

		element.setAttribute("aria-label", percentValue);

		return "<div style='position:absolute; top:8px; bottom:8px; left:4px; right:4px;'  data-max='" + max + "' data-min='" + min + "'><div style='position:relative; height:100%; width:calc(" + percentValue + "%); background-color:" + color + "; display:inline-block;'></div></div>" + (legend ? "<div style='position:absolute; top:4px; left:0; text-align:" + legendAlign + "; width:100%; color:" + legendColor + ";'>" + legend + "</div>" : "");
	},

	//background color
	color: function color(cell, formatterParams, onRendered) {
		cell.getElement().style.backgroundColor = this.sanitizeHTML(cell.getValue());
		return "";
	},

	//tick icon
	buttonTick: function buttonTick(cell, formatterParams, onRendered) {
		return '<svg enable-background="new 0 0 24 24" height="14" width="14" viewBox="0 0 24 24" xml:space="preserve" ><path fill="#2DC214" clip-rule="evenodd" d="M21.652,3.211c-0.293-0.295-0.77-0.295-1.061,0L9.41,14.34  c-0.293,0.297-0.771,0.297-1.062,0L3.449,9.351C3.304,9.203,3.114,9.13,2.923,9.129C2.73,9.128,2.534,9.201,2.387,9.351  l-2.165,1.946C0.078,11.445,0,11.63,0,11.823c0,0.194,0.078,0.397,0.223,0.544l4.94,5.184c0.292,0.296,0.771,0.776,1.062,1.07  l2.124,2.141c0.292,0.293,0.769,0.293,1.062,0l14.366-14.34c0.293-0.294,0.293-0.777,0-1.071L21.652,3.211z" fill-rule="evenodd"/></svg>';
	},

	//cross icon
	buttonCross: function buttonCross(cell, formatterParams, onRendered) {
		return '<svg enable-background="new 0 0 24 24" height="14" width="14" viewBox="0 0 24 24" xml:space="preserve" ><path fill="#CE1515" d="M22.245,4.015c0.313,0.313,0.313,0.826,0,1.139l-6.276,6.27c-0.313,0.312-0.313,0.826,0,1.14l6.273,6.272  c0.313,0.313,0.313,0.826,0,1.14l-2.285,2.277c-0.314,0.312-0.828,0.312-1.142,0l-6.271-6.271c-0.313-0.313-0.828-0.313-1.141,0  l-6.276,6.267c-0.313,0.313-0.828,0.313-1.141,0l-2.282-2.28c-0.313-0.313-0.313-0.826,0-1.14l6.278-6.269  c0.313-0.312,0.313-0.826,0-1.14L1.709,5.147c-0.314-0.313-0.314-0.827,0-1.14l2.284-2.278C4.308,1.417,4.821,1.417,5.135,1.73  L11.405,8c0.314,0.314,0.828,0.314,1.141,0.001l6.276-6.267c0.312-0.312,0.826-0.312,1.141,0L22.245,4.015z"/></svg>';
	},

	//current row number
	rownum: function rownum(cell, formatterParams, onRendered) {
		return this.table.rowManager.activeRows.indexOf(cell.getRow()._getSelf()) + 1;
	},

	//row handle
	handle: function handle(cell, formatterParams, onRendered) {
		cell.getElement().classList.add("tabulator-row-handle");
		return "<div class='tabulator-row-handle-box'><div class='tabulator-row-handle-bar'></div><div class='tabulator-row-handle-bar'></div><div class='tabulator-row-handle-bar'></div></div>";
	},

	responsiveCollapse: function responsiveCollapse(cell, formatterParams, onRendered) {
		var self = this,
		    open = false,
		    el = document.createElement("div");

		function toggleList(isOpen) {
			var collapse = cell.getRow().getElement().getElementsByClassName("tabulator-responsive-collapse")[0];

			open = isOpen;

			if (open) {
				el.classList.add("open");
				if (collapse) {
					collapse.style.display = '';
				}
			} else {
				el.classList.remove("open");
				if (collapse) {
					collapse.style.display = 'none';
				}
			}
		}

		el.classList.add("tabulator-responsive-collapse-toggle");
		el.innerHTML = "<span class='tabulator-responsive-collapse-toggle-open'>+</span><span class='tabulator-responsive-collapse-toggle-close'>-</span>";

		cell.getElement().classList.add("tabulator-row-handle");

		if (self.table.options.responsiveLayoutCollapseStartOpen) {
			open = true;
		}

		el.addEventListener("click", function () {
			toggleList(!open);
		});

		toggleList(open);

		return el;
	}
};

Tabulator.prototype.registerModule("format", Format);