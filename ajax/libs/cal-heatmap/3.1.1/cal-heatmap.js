/*! cal-heatmap v3.1.1 (Wed Sep 04 2013 15:37:25)
 *  ---------------------------------------------
 *  Cal-Heatmap is a javascript module to create calendar heatmap to visualize time series data, a la github contribution graph
 *  https://github.com/kamisama/cal-heatmap
 *  Licensed under the MIT license
 *  Copyright 2013 Wan Qi Chen
 */

var CalHeatMap = function() {

	"use strict";

	var self = this;

	var allowedDataType = ["json", "csv", "tsv", "txt"];

	// Default settings
	this.options = {
		// selector string of the container to append the graph to
		// Accept any string value accepted by document.querySelector or CSS3
		// or an Element object
		itemSelector : "#cal-heatmap",

		// Whether to paint the calendar on init()
		// Used by testsuite to reduce testing time
		paintOnLoad : true,

		// ================================================
		// DOMAIN
		// ================================================

		// Number of domain to display on the graph
		range : 12,

		// Size of each cell, in pixel
		cellSize : 10,

		// Padding between each cell, in pixel
		cellPadding : 2,

		// For rounded subdomain rectangles, in pixels
		cellRadius: 0,

		domainGutter : 2,

		domainMargin: [0,0,0,0],

		domain : "hour",

		subDomain : "min",

		// First day of the week is Monday
		// 0 to start the week on Sunday
		weekStartOnMonday : true,

		// Start date of the graph
		// @default now
		start : new Date(),

		minDate : null,

		maxDate: null,

		// URL, where to fetch the original datas
		data : "",

		dataType: allowedDataType[0],

		// Whether to consider missing date:value from the datasource
		// as equal to 0, or just leave them as missing
		considerMissingDataAsZero: false,

		// Load remote data on calendar creation
		// When false, the calendar will be left empty
		loadOnInit : true,

		// Calendar orientation
		// false : display domains side by side
		// true  : display domains one under the other
		verticalOrientation: false,

		// Domain dynamic width/height
		// The width on a domain depends on the number of
		domainDynamicDimension: true,

		// Domain Label properties
		label: {
			// valid : top, right, bottom, left
			position: "bottom",

			// Valid : left, center, right
			// Also valid are the direct svg values : start, middle, end
			align: "center",

			// By default, there is no margin/padding around the label
			offset: {
				x: 0,
				y: 0
			},

			rotate: null,

			// Used only on vertical orientation
			width: 100,

			// Used only on horizontal orientation
			height: null
		},

		// ================================================
		// LEGEND
		// ================================================

		// Threshold for the legend
		legend : [10,20,30,40],

		// Whether to display the legend
		displayLegend : true,

		legendCellSize: 10,

		legendCellPadding: 2,

		legendMargin: [10, 0, 0, 0],

		// Legend vertical position
		// top : place legend above calendar
		// bottom: place legend below the calendar
		legendVerticalPosition: "bottom",

		// Legend horizontal position
		// accepted values : left, center, right
		legendHorizontalPosition: "left",


		// ================================================
		// HIGHLIGHT
		// ================================================

		// List of dates to highlight
		// Valid values :
		// - [] : don't highlight anything
		// - "now" : highlight the current date
		// - an array of Date objects : highlight the specified dates
		highlight : [],

		// ================================================
		// TEXT FORMATTING / i18n
		// ================================================

		// Name of the items to represent in the calendar
		itemName : ["item", "items"],

		// Formatting of the domain label
		// @default: null, will use the formatting according to domain type
		// Accept a string used as specifier by d3.time.format()
		// or a function
		//
		// Refer to https://github.com/mbostock/d3/wiki/Time-Formatting
		// for accepted date formatting used by d3.time.format()
		domainLabelFormat: null,

		// Formatting of the title displayed when hovering a subDomain cell
		subDomainTitleFormat : {
			empty: "{date}",
			filled: "{count} {name} {connector} {date}"
		},

		// Formatting of the {date} used in subDomainTitleFormat
		// @default : null, will use the formatting according to subDomain type
		// Accept a string used as specifier by d3.time.format()
		// or a function
		//
		// Refer to https://github.com/mbostock/d3/wiki/Time-Formatting
		// for accepted date formatting used by d3.time.format()
		subDomainDateFormat: null,

		// Formatting of the text inside each subDomain cell
		// @default: null, no text
		// Accept a string used as specifier by d3.time.format()
		// or a function
		//
		// Refer to https://github.com/mbostock/d3/wiki/Time-Formatting
		// for accepted date formatting used by d3.time.format()
		subDomainTextFormat: null,

		// Formatting of the title displayed when hovering a legend cell
		legendTitleFormat : {
			lower: "less than {min} {name}",
			inner: "between {down} and {up} {name}",
			upper: "more than {max} {name}"
		},

		// Animation duration, in ms
		animationDuration : 500,

		nextSelector: false,

		previousSelector: false,

		itemNamespace: "cal-heatmap",


		// ================================================
		// EVENTS CALLBACK
		// ================================================

		// Callback when clicking on a time block
		onClick : null,

		// Callback after painting the empty calendar
		afterLoad : null,

		// Callback after loading the next domain in the calendar
		afterLoadNextDomain : null,

		// Callback after loading the previous domain in the calendar
		afterLoadPreviousDomain : null,

		// Callback after finishing all actions on the calendar
		onComplete : null,

		// Callback after fetching the datas, but before applying them to the calendar
		// Used mainly to convert the datas if they're not formatted like expected
		// Takes the fetched "data" object as argument, must return a json object
		// formatted like {timestamp:count, timestamp2:count2},
		afterLoadData : function(data) { return data; },

		// Callback triggered after calling next().
		// The `status` argument is equal to true if there is no
		// more next domain to load
		//
		// This callback is also executed once, after calling previous(),
		// only when the max domain is reached
		onMaxDomainReached: null,

		// Callback triggered after calling previous().
		// The `status` argument is equal to true if there is no
		// more previous domain to load
		//
		// This callback is also executed once, after calling next(),
		// only when the min domain is reached
		onMinDomainReached: null
	};


	this._domainType = {
		"min" : {
			name: "minute",
			level: 10,
			row: function() {return 10;},
			column: function() { return 6; },
			position: {
				x : function(d) { return Math.floor(d.getMinutes() / self._domainType.min.row(d)); },
				y : function(d) { return d.getMinutes() % self._domainType.min.row(d);}
			},
			format: {
				date: "%H:%M, %A %B %-e, %Y",
				legend: "",
				connector: "at"
			},
			extractUnit : function(d) {
				var dt = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes());
				return dt.getTime();
			}
		},
		"hour" : {
			name: "hour",
			level: 20,
			row: function() {return 6;},
			column: function(d) {
				switch(self.options.domain) {
					case "day" : return 4;
					case "week" : return 28;
					case "month" : return (self.options.domainDynamicDimension ? self.getEndOfMonth(d).getDate() : 31) * 4;
				}
			},
			position: {
				x : function(d) {
					if (self.options.domain === "month") {
						return Math.floor(d.getHours() / self._domainType.hour.row(d)) + (d.getDate()-1)*4;
					} else if (self.options.domain === "week") {
						return Math.floor(d.getHours() / self._domainType.hour.row(d)) + self.getWeekDay(d)*4;
					}
					return Math.floor(d.getHours() / self._domainType.hour.row(d));
				},
				y : function(d) { return d.getHours() % self._domainType.hour.row(d);}
			},
			format: {
				date: "%Hh, %A %B %-e, %Y",
				legend: "%H:00",
				connector: "at"
			},
			extractUnit : function(d) {
				var dt = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours());
				return dt.getTime();
			}
		},
		"day" : {
			name: "day",
			level: 30,
			row: function() {return 7;},
			column: function(d) {
				d = new Date(d);
				switch(self.options.domain) {
					case "year" : return (self.options.domainDynamicDimension ? (self.getWeekNumber(new Date(d.getFullYear(), 11, 31)) - self.getWeekNumber(new Date(d.getFullYear(), 0)) + 1) : 54);
					case "month" :
						if (self.options.verticalOrientation) {
							return 6;
						}
						return self.options.domainDynamicDimension ? (self.getWeekNumber(new Date(d.getFullYear(), d.getMonth()+1, 0)) - self.getWeekNumber(d) + 1) : 6;
					case "week" : return 1;
				}
			},
			position: {
				x : function(d) {
					switch(self.options.domain) {
						case "week" : return 0;
						case "month" :
							return self.getWeekNumber(d) - self.getWeekNumber(new Date(d.getFullYear(), d.getMonth()));
						case "year" : return self.getWeekNumber(d) ;
					}
				},
				y : function(d) { return self.getWeekDay(d);}
			},
			format: {
				date: "%A %B %-e, %Y",
				legend: "%e %b",
				connector: "on"
			},
			extractUnit : function(d) {
				var dt = new Date(d.getFullYear(), d.getMonth(), d.getDate());
				return dt.getTime();
			}
		},
		"week" : {
			name: "week",
			level: 40,
			row: function() {return 1;},
			column: function(d) {
				d = new Date(d);
				switch(self.options.domain) {
					case "year" : return 54;
					case "month" : return self.getWeekNumber(new Date(d.getFullYear(), d.getMonth()+1, 0)) - self.getWeekNumber(d);
					default: return 1;
				}
			},
			position: {
				x: function(d) {
					switch(self.options.domain) {
						case "year" : return self.getWeekNumber(d);
						case "month" : return self.getWeekNumber(d) - self.getWeekNumber(new Date(d.getFullYear(), d.getMonth())) - 1;
					}
				},
				y: function() {
					return 0;
				}
			},
			format: {
				date: "%B Week #%W",
				legend: "%B Week #%W",
				connector: "on"
			},
			extractUnit : function(d) {
				var dt = new Date(d.getFullYear(), d.getMonth(), d.getDate());
				// According to ISO-8601, week number computation are based on week starting on Monday
				var weekDay = dt.getDay()-1;
				if (weekDay < 0) {
					weekDay = 6;
				}
				dt.setDate(dt.getDate() - weekDay);
				return dt.getTime();
			}
		},
		"month" : {
			name: "month",
			level: 50,
			row: function() {return 1;},
			column: function() {return 12;},
			position: {
				x : function(d) { return Math.floor(d.getMonth() / self._domainType.month.row(d)); },
				y : function(d) { return d.getMonth() % self._domainType.month.row(d);}
			},
			format: {
				date: "%B %Y",
				legend: "%B",
				connector: "on"
			},
			extractUnit : function(d) {
				var dt = new Date(d.getFullYear(), d.getMonth());
				return dt.getTime();
			}
		},
		"year" : {
			name: "year",
			level: 60,
			row: function() {return 1;},
			column: function() {return 12;},
			position: {
				x : function(d) { return Math.floor(d.getFullYear() / this._domainType.year.row(d)); },
				y : function(d) { return d.getFullYear() % this._domainType.year.row(d);}
			},
			format: {
				date: "%Y",
				legend: "%Y",
				connector: "on"
			},
			extractUnit : function(d) {
				var dt = new Date(d.getFullYear());
				return dt.getTime();
			}
		}
	};

	for (var type in this._domainType) {
		this._domainType["x_" + type] = {};
		this._domainType["x_" + type].name = "x_" + type;
		this._domainType["x_" + type].level = this._domainType[type].level;
		this._domainType["x_" + type].row = this._domainType[type].column;
		this._domainType["x_" + type].column = this._domainType[type].row;
		this._domainType["x_" + type].position = {};
		this._domainType["x_" + type].position.x = this._domainType[type].position.y;
		this._domainType["x_" + type].position.y = this._domainType[type].position.x;
		this._domainType["x_" + type].format = this._domainType[type].format;
		this._domainType["x_" + type].extractUnit = this._domainType[type].extractUnit;
	}

	// Exception : always return the maximum number of weeks
	// to align the label vertically
	this._domainType.x_day.row = function(d) {
		d = new Date(d);
		switch(self.options.domain) {
			case "year" : return (self.options.domainDynamicDimension ? (self.getWeekNumber(new Date(d.getFullYear(), 11, 31)) - self.getWeekNumber(new Date(d.getFullYear(), 0)) + 1) : 54);
			case "month" :
				if (!self.options.verticalOrientation) {
					return 6;
				}
				return self.options.domainDynamicDimension ? (self.getWeekNumber(new Date(d.getFullYear(), d.getMonth()+1, 0)) - self.getWeekNumber(d) + 1) : 6;
			case "week" : return 1;
		}
	};


	this.svg = null;

	this._completed = false;

	// Record all the valid domains
	// Each domain value is a timestamp in milliseconds
	this._domains = d3.map();

	var graphDim = {
		width: 0,
		height: 0
	};

	this.NAVIGATE_LEFT = 1;
	this.NAVIGATE_RIGHT = 2;

	// Various update mode when using the update() API
	this.RESET_ALL_ON_UPDATE = 0;
	this.RESET_SINGLE_ON_UPDATE = 1;
	this.APPEND_ON_UPDATE = 2;

	this.root = null;

	this._maxDomainReached = false;
	this._minDomainReached = false;

	this.domainPosition = new DomainPosition();

	/**
	 * Display the graph for the first time
	 * @return bool True if the calendar is created
	 */
	function _init() {

		self.getDomain(self.options.start).map(function(d) { return d.getTime(); }).map(function(d) {
			self._domains.set(d, self.getSubDomain(d).map(function(d) { return {t: self._domainType[self.options.subDomain].extractUnit(d), v: null}; }));
		});

		self.root = d3.select(self.options.itemSelector);

		self.root.append("svg").attr("class", "graph");

		if (self.options.paintOnLoad) {

			self.verticalDomainLabel = (self.options.label.position === "top" || self.options.label.position === "bottom");

			self.domainVerticalLabelHeight = self.options.label.height === null ? Math.max(25, self.options.cellSize*2) : self.options.label.height;
			self.domainHorizontalLabelWidth = 0;

			if (self.options.domainLabelFormat === "" && self.options.label.height === null) {
				self.domainVerticalLabelHeight = 0;
			}

			if (!self.verticalDomainLabel) {
				self.domainVerticalLabelHeight = 0;
				self.domainHorizontalLabelWidth = self.options.label.width;
			}

			// @todo : check validity
			if (typeof self.options.domainMargin === "number") {
				self.options.domainMargin = [self.options.domainMargin, self.options.domainMargin, self.options.domainMargin, self.options.domainMargin];
			}

			self.paint();

			// =========================================================================//
			// ATTACHING DOMAIN NAVIGATION EVENT										//
			// =========================================================================//
			if (self.options.nextSelector !== false) {
				d3.select(self.options.nextSelector).on("click." + self.options.itemNamespace, function() {
					d3.event.preventDefault();
					return self.loadNextDomain();
				});
			}

			if (self.options.previousSelector !== false) {
				d3.select(self.options.previousSelector).on("click." + self.options.itemNamespace, function() {
					d3.event.preventDefault();
					return self.loadPreviousDomain();
				});
			}

			// Display legend if needed
			if (self.options.displayLegend) {
				self.displayLegend(graphDim.width - self.options.domainGutter - self.options.cellPadding);
			}

			if (self.options.afterLoad !== null) {
				self.afterLoad();
			}

			// Fill the graph with some datas
			if (self.options.loadOnInit) {
				var domains = self._domains.keys().sort();
				self.getDatas(
					self.options.data,
					new Date(parseInt(domains[0], 10)),
					self.getSubDomain(parseInt(domains[domains.length-1], 10)).pop(),
					function() {
						self.fill();
						self.onComplete();
					}
				);
			} else {
				self.onComplete();
			}
		}

		return true;
	}

	// Return the width of the domain block, without the domain gutter
	// @param int d Domain start timestamp
	function w(d, outer) {
		var width = self.options.cellSize*self._domainType[self.options.subDomain].column(d) + self.options.cellPadding*self._domainType[self.options.subDomain].column(d);
		if (typeof outer !== "undefined" && outer === true) {
			return width += self.domainHorizontalLabelWidth + self.options.domainGutter + self.options.domainMargin[1] + self.options.domainMargin[3];
		}
		return width;
	}

	// Return the height of the domain block, without the domain gutter
	function h(d, outer) {
		var height = self.options.cellSize*self._domainType[self.options.subDomain].row(d) + self.options.cellPadding*self._domainType[self.options.subDomain].row(d);
		if (typeof outer !== "undefined" && outer === true) {
			height += self.options.domainGutter + self.domainVerticalLabelHeight + self.options.domainMargin[0] + self.options.domainMargin[2];
		}
		return height;
	}


	/**
	 *
	 *
	 * @param int navigationDir
	 */
	this.paint = function(navigationDir) {

		if (typeof navigationDir === "undefined") {
			navigationDir = false;
		}

		// Painting all the domains
		var domainSvg = self.root.select(".graph")
			.selectAll(".graph-domain")
			.data(self._domains.keys().map(function(d) { return parseInt(d, 10); }), function(d) { return d;})
		;

		var enteringDomainDim = 0;
		var exitingDomainDim = 0;


		// =========================================================================//
		// PAINTING DOMAIN															//
		// =========================================================================//

		self.svg = domainSvg
			.enter()
			.append("svg")
			.attr("width", function(d) {
				return w(d, true);
			})
			.attr("height", function(d) {
				return h(d, true);
			})
			.attr("x", function(d) {
				if (self.options.verticalOrientation) {
					graphDim.width = w(d, true);
					return 0;
				} else {
					return getDomainPosition(d, graphDim, "width", w(d, true));
				}
			})
			.attr("y", function(d) {
				if (self.options.verticalOrientation) {
					return getDomainPosition(d, graphDim, "height", h(d, true));
				} else {
					graphDim.height = h(d, true);
					return 0;
				}
			})
			.attr("class", function(d) {
				var classname = "graph-domain";
				var date = new Date(d);
				switch(self.options.domain) {
					case "hour" : classname += " h_" + date.getHours();
					/* falls through */
					case "day" : classname += " d_" + date.getDate() + " dy_" + date.getDay();
					/* falls through */
					case "week" : classname += " w_" + self.getWeekNumber(date);
					/* falls through */
					case "month" : classname += " m_" + (date.getMonth() + 1);
					/* falls through */
					case "year" : classname += " y_" + date.getFullYear();
				}
				return classname;
			})
		;

		function getDomainPosition(domainIndex, graphDim, axis, domainDim) {
			var tmp = 0;
			switch(navigationDir) {
				case false :
					//if (domainIndex > 0) {
						tmp = graphDim[axis];
					//}

					graphDim[axis] += domainDim;
					self.domainPosition.setPosition(domainIndex, tmp);
					return tmp;

				case self.NAVIGATE_RIGHT :
					self.domainPosition.setPosition(domainIndex, graphDim[axis]);

					enteringDomainDim = domainDim;
					exitingDomainDim = self.domainPosition.getPositionFromIndex(1);

					self.domainPosition.shiftRightBy(exitingDomainDim);
					return graphDim[axis];

				case self.NAVIGATE_LEFT :
					tmp = -domainDim;

					enteringDomainDim = -tmp;
					exitingDomainDim = graphDim[axis] - self.domainPosition.getLast();

					self.domainPosition.setPosition(domainIndex, tmp);
					self.domainPosition.shiftLeftBy(enteringDomainDim);
					return tmp;
			}
		}

		self.svg.append("rect")
			.attr("width", function(d) { return w(d, true) - self.options.domainGutter - self.options.cellPadding; })
			.attr("height", function(d) { return h(d, true) - self.options.domainGutter - self.options.cellPadding; })
			.attr("class", "domain-background")
		;

		// =========================================================================//
		// PAINTING SUBDOMAINS														//
		// =========================================================================//
		var subDomainSvgGroup = self.svg.append("svg")
			.attr("x", function() {
				if (self.options.label.position === "left") {
					return self.domainHorizontalLabelWidth + self.options.domainMargin[3];
				} else {
					return self.options.domainMargin[3];
				}
			})
			.attr("y", function() {
				if (self.options.label.position === "top") {
					return self.domainVerticalLabelHeight + self.options.domainMargin[0];
				} else {
					return self.options.domainMargin[0];
				}
			})
			.attr("class", "graph-subdomain-group")
		;

		var rect = subDomainSvgGroup
			.selectAll("g")
			.data(function(d) { return self._domains.get(d); }, function(d) { return d.t; })
			.enter()
			.append("g")
		;

		rect
			.append("rect")
			.attr("class", function(d) {
				return "graph-rect" + self.getHighlightClassName(d.t) + (self.options.onClick !== null ? " hover_cursor" : "");
			})
			.attr("width", self.options.cellSize)
			.attr("height", self.options.cellSize)
			.attr("x", function(d) { return self.positionSubDomainX(d.t); })
			.attr("y", function(d) { return self.positionSubDomainY(d.t); })
			.on("click", function(d) {
				if (self.options.onClick !== null) {
					return self.onClick(new Date(d.t), d.v);
				}
			})
			.call(function(selection) {
				if (self.options.cellRadius > 0) {
					selection
						.attr("rx", self.options.cellRadius)
						.attr("ry", self.options.cellRadius)
					;
				}
			})
		;

		// Appending a title to each subdomain
		rect.append("title").text(function(d){ return self.formatDate(new Date(d.t), self.options.subDomainDateFormat); });


		// =========================================================================//
		// PAINTING LABEL															//
		// =========================================================================//
		if (self.options.domainLabelFormat !== "") {
			self.svg.append("text")
				.attr("class", "graph-label")
				.attr("y", function(d) {
					var y = self.options.domainMargin[0];
					switch(self.options.label.position) {
						case "top" : y += self.domainVerticalLabelHeight/2; break;
						case "bottom" : y += h(d) + self.domainVerticalLabelHeight/2;
					}

					return y + self.options.label.offset.y *
					(
						((self.options.label.rotate === "right" && self.options.label.position === "right") ||
						(self.options.label.rotate === "left" && self.options.label.position === "left")) ?
						-1 : 1
					);
				})
				.attr("x", function(d){
					var x = self.options.domainMargin[3];
					switch(self.options.label.position) {
						case "right" : x += w(d); break;
						case "bottom" :
						case "top" : x += w(d)/2;
					}

					if (self.options.label.align === "right") {
						return x + self.domainHorizontalLabelWidth - self.options.label.offset.x *
						(self.options.label.rotate === "right" ? -1 : 1);
					}
					return x + self.options.label.offset.x;

				})
				.attr("text-anchor", function() {
					switch(self.options.label.align) {
						case "start" :
						case "left" : return "start";
						case "end" :
						case "right" : return "end";
						default : return "middle";
					}
				})
				.attr("dominant-baseline", function() { return self.verticalDomainLabel ? "middle" : "top"; })
				.text(function(d) { return self.formatDate(new Date(d), self.options.domainLabelFormat); })
				.call(domainRotate)
			;
		}

		function domainRotate(selection) {
			switch (self.options.label.rotate) {
				case "right" :
					selection
					.attr("transform", function(d) {
						var s = "rotate(90), ";
						switch(self.options.label.position) {
							case "right" : s += "translate(-" + w(d) + " , -" + w(d) + ")"; break;
							case "left" : s += "translate(0, -" + self.domainHorizontalLabelWidth + ")"; break;
						}

						return s;
					});
					break;
				case "left" :
					selection
					.attr("transform", function(d) {
						var s = "rotate(270), ";
						switch(self.options.label.position) {
							case "right" : s += "translate(-" + (w(d) + self.domainHorizontalLabelWidth) + " , " + w(d) + ")"; break;
							case "left" : s += "translate(-" + (self.domainHorizontalLabelWidth) + " , " + self.domainHorizontalLabelWidth + ")"; break;
						}

						return s;
					});
					break;
			}
		}

		// =========================================================================//
		// PAINTING DOMAIN SUBDOMAIN CONTENT										//
		// =========================================================================//
		if (self.options.subDomainTextFormat !== null) {
			rect
				.append("text")
				.attr("class", function(d) { return "subdomain-text" + self.getHighlightClassName(d.t); })
				.attr("x", function(d) { return self.positionSubDomainX(d.t) + self.options.cellSize/2; })
				.attr("y", function(d) { return self.positionSubDomainY(d.t) + self.options.cellSize/2; })
				.attr("text-anchor", "middle")
				.attr("dominant-baseline", "central")
				.text(function(d){ return self.formatDate(new Date(d.t), self.options.subDomainTextFormat); })
			;
		}

		// =========================================================================//
		// ANIMATION																//
		// =========================================================================//

		if (navigationDir !== false) {
			domainSvg.transition().duration(self.options.animationDuration)
				.attr("x", function(d){
					return self.options.verticalOrientation ? 0 : self.domainPosition.getPosition(d);
				})
				.attr("y", function(d){
					return self.options.verticalOrientation? self.domainPosition.getPosition(d) : 0;
				})
			;
		}

		var tempWidth = graphDim.width;
		var tempHeight = graphDim.height;

		if (self.options.verticalOrientation) {
			graphDim.height += enteringDomainDim - exitingDomainDim;
		} else {
			graphDim.width += enteringDomainDim - exitingDomainDim;
		}

		// At the time of exit, domainsWidth and domainsHeight already automatically shifted
		domainSvg.exit().transition().duration(self.options.animationDuration)
			.attr("x", function(d){
				if (self.options.verticalOrientation) {
					return 0;
				} else {
					switch(navigationDir) {
						case self.NAVIGATE_LEFT : return Math.min(graphDim.width, tempWidth);
						case self.NAVIGATE_RIGHT : return -w(d, true);
					}
				}
			})
			.attr("y", function(d){
				if (self.options.verticalOrientation) {
					switch(navigationDir) {
						case self.NAVIGATE_LEFT : return Math.min(graphDim.height, tempHeight);
						case self.NAVIGATE_RIGHT : return -h(d, true);
					}
				} else {
					return 0;
				}
			})
			.remove()
		;

		// Resize the graph
		self.root.select(".graph").transition().duration(self.options.animationDuration)
			.attr("width", function() { return graphDim.width - self.options.domainGutter - self.options.cellPadding; })
			.attr("height", function() { return graphDim.height - self.options.domainGutter - self.options.cellPadding; })
		;
	};

	this.fill = function() {
		var rect = self.svg
			.selectAll("svg").selectAll("g")
			.data(function(d) { return self._domains.get(d); }, function(d) { return d.t; })
		;

		rect.transition().select("rect")
			.attr("class", function(d) {

				var htmlClass = "graph-rect" + self.getHighlightClassName(d.t);

				if (d.v !== null) {
					htmlClass += " " + self.legend(d.v);
				} else if (self.options.considerMissingDataAsZero) {
					htmlClass += " " + self.legend(0);
				}

				if (self.options.onClick !== null) {
					htmlClass += " hover_cursor";
				}

				return htmlClass;
			})
		;


		rect.transition().select("title")
			.text(function(d) {

				if (d.v === null && !self.options.considerMissingDataAsZero) {
					return (self.options.subDomainTitleFormat.empty).format({
						date: self.formatDate(new Date(d.t), self.options.subDomainDateFormat)
					});
				} else {
					var value = d.v;
					// Consider null as 0
					if (value === null && self.options.considerMissingDataAsZero) {
						value = 0;
					}

					return (self.options.subDomainTitleFormat.filled).format({
						count: self.formatNumber(value),
						name: self.options.itemName[(value !== 1 ? 1 : 0)],
						connector: self._domainType[self.options.subDomain].format.connector,
						date: self.formatDate(new Date(d.t), self.options.subDomainDateFormat)
					});
				}
			});
	};


	this.init = function(settings) {

		self.options = mergeRecursive(self.options, settings);

		if (!this._domainType.hasOwnProperty(self.options.domain) || self.options.domain === "min" || self.options.domain.substring(0, 2) === "x_") {
			console.log("The domain '" + self.options.domain + "' is not valid");
			return false;
		}

		if (!this._domainType.hasOwnProperty(self.options.subDomain) || self.options.subDomain === "year") {
			console.log("The subDomain '" + self.options.subDomain + "' is not valid");
			return false;
		}

		if (this._domainType[self.options.domain].level <= this._domainType[self.options.subDomain].level) {
			console.log("'" + self.options.subDomain + "' is not a valid subDomain to '" + self.options.domain +  "'");
			return false;
		}


		// Set the most suitable subdomain for the domain
		// if subDomain is not explicitly specified
		if (!settings.hasOwnProperty("subDomain")) {
			switch(self.options.domain) {
				case "year" :  self.options.subDomain = "month"; break;
				case "month" : self.options.subDomain = "day"; break;
				case "week" :  self.options.subDomain = "day"; break;
				case "day" :  self.options.subDomain = "hour"; break;
				default : self.options.subDomain = "min";
			}
		}

		if (allowedDataType.indexOf(self.options.dataType) < 0) {
			console.log("The data type '" + self.options.dataType + "' is not valid data type");
			return false;
		}

		if (self.options.subDomainDateFormat === null) {
			self.options.subDomainDateFormat = this._domainType[self.options.subDomain].format.date;
		}

		if (self.options.domainLabelFormat === null) {
			self.options.domainLabelFormat = this._domainType[self.options.domain].format.legend;
		}

		// Auto-align label, depending on it's position
		if (!settings.hasOwnProperty("label") || (settings.hasOwnProperty("label") && !settings.label.hasOwnProperty("align"))) {
			switch(self.options.label.position) {
				case "left" : self.options.label.align = "right"; break;
				case "right" : self.options.label.align = "left"; break;
				default : self.options.label.align = "center";
			}


			if (self.options.label.rotate === "left") {
				self.options.label.align = "right";
			} else if (self.options.label.rotate === "right") {
				self.options.label.align = "left";
			}

		}

		if (!settings.hasOwnProperty("label") || (settings.hasOwnProperty("label") && !settings.label.hasOwnProperty("offset"))) {
			if (self.options.label.position === "left" || self.options.label.position === "right") {
				self.options.label.offset = {
					x: 10,
					y: 15
				};
			}
		}

		if (validateSelector(self.options.itemSelector)) {
			console.log("The itemSelector is invalid");
			return false;
		}

		if (d3.select(self.options.itemSelector)[0][0] === null) {
			console.log("The node specified in itemSelector does not exists");
			return false;
		}

		if (self.options.nextSelector !== false && validateSelector(self.options.nextSelector)) {
			console.log("The nextSelector is invalid");
			return false;
		}

		if (self.options.previousSelector !== false && validateSelector(self.options.previousSelector)) {
			console.log("The previousSelector is invalid");
			return false;
		}

		if (typeof self.options.itemNamespace !== "string" || self.options.itemNamespace === "") {
			console.log("itemNamespace can not be empty, falling back to cal-heatmap");
			self.options.itemNamespace = "cal-heatmap";
		}

		if (typeof self.options.domainMargin === "number") {
			self.options.domainMargin = [self.options.domainMargin, self.options.domainMargin, self.options.domainMargin, self.options.domainMargin];
		}

		if (Array.isArray(self.options.domainMargin)) {
			switch(self.options.domainMargin.length) {
				case 0 : self.options.domainMargin = [0, 0, 0, 0]; break;
				case 1 : self.options.domainMargin = [self.options.domainMargin, self.options.domainMargin, self.options.domainMargin, self.options.domainMargin]; break;
				case 2 : self.options.domainMargin = [self.options.domainMargin[0], self.options.domainMargin[1], self.options.domainMargin[0], self.options.domainMargin[1]]; break;
				case 3 : self.options.domainMargin = [self.options.domainMargin[0], self.options.domainMargin[1], self.options.domainMargin[2], self.options.domainMargin[1]]; break;
				case 4 : self.options.domainMargin = self.options.domainMargin; break;
				default : self.options.domainMargin.splice(4);
			}
		}

		if (typeof self.options.itemName === "string") {
			self.options.itemName = [self.options.itemName, self.options.itemName + "s"];
		} else if (Array.isArray(self.options.itemName) && self.options.itemName.length === 1) {
			self.options.itemName = [self.options.itemName[0], self.options.itemName[0] + "s"];
		}

		// Don't touch these settings
		var s = ["data", "onComplete", "onClick", "afterLoad", "afterLoadData", "afterLoadPreviousDomain", "afterLoadNextDomain"];

		for (var k in s) {
			if (settings.hasOwnProperty(s[k])) {
				self.options[s[k]] = settings[s[k]];
			}
		}

		if (typeof self.options.highlight === "string") {
			if (self.options.highlight === "now") {
				self.options.highlight = [new Date()];
			} else {
				self.options.highlight = [];
			}
		} else if (Array.isArray(self.options.highlight)) {
			var i = self.options.highlight.indexOf("now");
			if (i !== -1) {
				self.options.highlight.splice(i, 1);
				self.options.highlight.push(new Date());
			}
		}


		function validateSelector(selector) {
			return ((!(selector instanceof Element) && typeof selector !== "string") || selector === "");
		}

		return _init();

	};

};

CalHeatMap.prototype = {

	// =========================================================================//
	// EVENTS CALLBACK															//
	// =========================================================================//

	/**
	 * Helper method for triggering event callback
	 *
	 * @param  string	eventName       Name of the event to trigger
	 * @param  array	successArgs     List of argument to pass to the callback
	 * @param  boolean  skip			Whether to skip the event triggering
	 * @return mixed	True when the triggering was skipped, false on error, else the callback function
	 */
	triggerEvent: function(eventName, successArgs, skip) {
		if ((arguments.length === 3 && skip) || this.options[eventName] === null) {
			return true;
		}

		if (typeof this.options[eventName] === "function") {
			if (typeof successArgs === "function") {
				successArgs = successArgs();
			}
			return this.options[eventName].apply(this, successArgs);
		} else {
			console.log("Provided callback for " + eventName + " is not a function.");
			return false;
		}
	},

	/**
	 * Event triggered on a mouse click on a subDomain cell
	 *
	 * @param  Date		d		Date of the subdomain block
	 * @param  int		itemNb	Number of items in that date
	 */
	onClick : function(d, itemNb) {
		return this.triggerEvent("onClick", [d, itemNb]);
	},

	/**
	 * Event triggered after drawing the calendar, byt before filling it with data
	 */
	afterLoad : function() {
		return this.triggerEvent("afterLoad");
	},

	/**
	 * Event triggered after completing drawing and filling the calendar
	 */
	onComplete : function() {
		var response = this.triggerEvent("onComplete", [], this._completed);
		this._completed = true;
		return response;
	},

	/**
	 * Event triggered after shifting the calendar one domain back
	 *
	 * @param  Date		start	Domain start date
	 * @param  Date		end		Domain end date
	 */
	afterLoadPreviousDomain: function(start) {
		var parent = this;
		return this.triggerEvent("afterLoadPreviousDomain", function() {
			var subDomain = parent.getSubDomain(start);
			return [subDomain.shift(), subDomain.pop()];
		});
	},

	/**
	 * Event triggered after shifting the calendar one domain above
	 *
	 * @param  Date		start	Domain start date
	 * @param  Date		end		Domain end date
	 */
	afterLoadNextDomain: function(start) {
		var parent = this;
		return this.triggerEvent("afterLoadNextDomain", function() {
			var subDomain = parent.getSubDomain(start);
			return [subDomain.shift(), subDomain.pop()];
		});
	},

	/**
	 * Event triggered after loading the leftmost domain allowed by minDate
	 *
	 * @param  boolean  reached True if the leftmost domain was reached
	 */
	onMinDomainReached: function(reached) {
		this._minDomainReached = reached;
		return this.triggerEvent("onMinDomainReached", [reached]);
	},

	/**
	 * Event triggered after loading the rightmost domain allowed by maxDate
	 *
	 * @param  boolean  reached True if the rightmost domain was reached
	 */
	onMaxDomainReached: function(reached) {
		this._maxDomainReached = reached;
		return this.triggerEvent("onMaxDomainReached", [reached]);
	},


	// =========================================================================//
	// FORMATTER																//
	// =========================================================================//

	formatNumber: d3.format(",g"),

	formatDate: function(d, format) {
		if (typeof format === "undefined") {
			format = "title";
		}

		if (typeof format === "function") {
			return format(d);
		} else {
			var f = d3.time.format(format);
			return f(d);
		}
	},


	// =========================================================================//
	// DOMAIN NAVIGATION														//
	// =========================================================================//

	/**
	 * Shift the calendar one domain forward
	 *
	 * The new domain is loaded only if it's not beyond the maxDate
	 *
	 * @return bool True if the next domain was loaded, else false
	 */
	loadNextDomain: function() {

		var nextDomainStartTimestamp = this.getNextDomain().getTime();

		if (this._maxDomainReached || this.maxDomainIsReached(nextDomainStartTimestamp)) {
			return false;
		}

		var parent = this;
		this._domains.set(
			nextDomainStartTimestamp,
			this.getSubDomain(nextDomainStartTimestamp).map(function(d) {
				return {t: parent._domainType[parent.options.subDomain].extractUnit(d), v: null};
			})
		);
		this._domains.remove(this._domains.keys().sort().shift());

		this.paint(this.NAVIGATE_RIGHT);

		var domains = this._domains.keys().sort();

		this.getDatas(
			this.options.data,
			new Date(parseInt(domains[domains.length-1], 10)),
			this.getSubDomain(parseInt(domains[domains.length-1], 10)).pop(),
			function() {
				parent.fill();
			}
		);

		this.afterLoadNextDomain(new Date(parseInt(domains[domains.length-1], 10)));

		if (this.maxDomainIsReached(this.getNextDomain().getTime())) {
			this.onMaxDomainReached(true);
		}

		// Try to "disengage" the min domain reached setting
		if (this._minDomainReached && !this.minDomainIsReached(domains[0])) {
			this.onMinDomainReached(false);
		}

		return true;
	},

	/**
	 * Shift the calendar one domain backward
	 *
	 * The previous domain is loaded only if it's not beyond the minDate
	 *
	 * @return bool True if the previous domain was loaded, else false
	 */
	loadPreviousDomain: function() {
		if (this._minDomainReached || this.minDomainIsReached(this._domains[0])) {
			return false;
		}

		var previousDomainStartTimestamp = this.getPreviousDomain().getTime();

		var parent = this;
		this._domains.set(
			previousDomainStartTimestamp,
			this.getSubDomain(previousDomainStartTimestamp).map(function(d) {
				return {t: parent._domainType[parent.options.subDomain].extractUnit(d), v: null};
			})
		);
		this._domains.remove(this._domains.keys().sort().pop());

		this.paint(this.NAVIGATE_LEFT);

		var domains = this._domains.keys().sort();

		this.getDatas(
			this.options.data,
			new Date(parseInt(domains[0], 10)),
			this.getSubDomain(parseInt(domains[0], 10)).pop(),
			function() {
				parent.fill();
			}
		);

		this.afterLoadPreviousDomain(new Date(parseInt(domains[0], 10)));

		if (this.minDomainIsReached(previousDomainStartTimestamp)) {
			this.onMinDomainReached(true);
		}

		// Try to "disengage" the max domain reached setting
		if (this._maxDomainReached && !this.maxDomainIsReached(domains[domains.length-1])) {
			this.onMaxDomainReached(false);
		}

		return true;
	},

	/**
	 * Return whether a date is inside the scope determined by maxDate
	 *
	 * @return bool
	 */
	maxDomainIsReached: function(datetimestamp) {
		return (this.options.maxDate !== null && (this.options.maxDate.getTime() < datetimestamp));
	},

	/**
	 * Return whether a date is inside the scope determined by minDate
	 *
	 * @return bool
	 */
	minDomainIsReached: function (datetimestamp) {
		return (this.options.minDate !== null && (this.options.minDate.getTime() >= datetimestamp));
	},


	// =========================================================================//
	// PAINTING : LEGEND														//
	// =========================================================================//

	displayLegend: function(width) {

		var parent = this;
		var legend = this.root;

		if (this.options.legendVerticalPosition === "top") {
			legend = legend.insert("svg", ".graph");
		} else {
			legend = legend.append("svg");
		}

		var legendWidth =
			this.options.legendCellSize * (this.options.legend.length+1) +
			this.options.legendCellPadding * (this.options.legend.length+1) +
			this.options.legendMargin[3] + this.options.legendMargin[1];

		legend = legend
			.attr("class", "graph-legend")
			.attr("height", this.options.legendCellSize + this.options.legendMargin[0] + this.options.legendMargin[2])
			.attr("width", width)
			.append("g")
			.attr("transform", function() {
				switch(parent.options.legendHorizontalPosition) {
					case "right" : return "translate(" + (width - legendWidth) + ")";
					case "middle" :
					case "center" : return "translate(" + (width/2 - legendWidth/2) + ")";
					default : return "translate(" + parent.options.legendMargin[3] + ")";
				}
			})
			.attr("y", this.options.legendMargin[0])
			.selectAll().data(d3.range(0, this.options.legend.length+1));

		var legendItem = legend
			.enter()
			.append("rect")
			.attr("width", this.options.legendCellSize)
			.attr("height", this.options.legendCellSize)
			.attr("class", function(d){ return "graph-rect q" + (d+1); })
			.attr("x", function(d) {
				return d * (parent.options.legendCellSize + parent.options.legendCellPadding);
			})
			.attr("y", this.options.legendMargin[0])
			.attr("fill-opacity", 0)
			;

		legendItem.transition().delay(function(d, i) { return parent.options.animationDuration * i/10;}).attr("fill-opacity", 1);

		legendItem
			.append("title")
			.text(function(d) {
				if (d === 0) {
					return (parent.options.legendTitleFormat.lower).format({
						min: parent.options.legend[d],
						name: parent.options.itemName[1]});
				} else if (d === parent.options.legend.length) {
					return (parent.options.legendTitleFormat.upper).format({
						max: parent.options.legend[d-1],
						name: parent.options.itemName[1]});
				} else {
					return (parent.options.legendTitleFormat.inner).format({
						down: parent.options.legend[d-1],
						up: parent.options.legend[d],
						name: parent.options.itemName[1]});
				}
			})
		;

	},

	// =========================================================================//
	// POSITIONNING																//
	// =========================================================================//

	positionSubDomainX: function(d) {
		var index = this._domainType[this.options.subDomain].position.x(new Date(d));
		return index * this.options.cellSize + index * this.options.cellPadding;
	},

	positionSubDomainY: function(d) {
		var index = this._domainType[this.options.subDomain].position.y(new Date(d));
		return index * this.options.cellSize + index * this.options.cellPadding;
	},

	/**
	 * Return a classname if the specified date should be highlighted
	 *
	 * @param  timestamp date Date of the current subDomain
	 * @return String the highlight class
	 */
	getHighlightClassName: function(d)
	{
		d = new Date(d);

		if (this.options.highlight.length > 0) {
			for (var i in this.options.highlight) {
				if (this.options.highlight[i] instanceof Date && this.dateIsEqual(this.options.highlight[i], d)) {
					return " highlight" + (this.isNow(this.options.highlight[i]) ? " now" : "");
				}
			}
		}
		return "";
	},

	/**
	 * Return whether the specified date is now,
	 * according to the type of subdomain
	 *
	 * @param  Date d The date to compare
	 * @return bool True if the date correspond to a subdomain cell
	 */
	isNow: function(d) {
		return this.dateIsEqual(d, new Date());
	},

	/**
	 * Return whether 2 dates are equals
	 * This function is subdomain-aware,
	 * and dates comparison are dependent of the subdomain
	 *
	 * @param  Date date_a First date to compare
	 * @param  Date date_b Secon date to compare
	 * @return bool true if the 2 dates are equals
	 */
	dateIsEqual: function(date_a, date_b) {
		switch(this.options.subDomain) {
			case "x_min" :
			case "min" :
				return date_a.getFullYear() === date_b.getFullYear() &&
					date_a.getMonth() === date_b.getMonth() &&
					date_a.getDate() === date_b.getDate() &&
					date_a.getHours() === date_b.getHours() &&
					date_a.getMinutes() === date_b.getMinutes();
			case "x_hour" :
			case "hour" :
				return date_a.getFullYear() === date_b.getFullYear() &&
					date_a.getMonth() === date_b.getMonth() &&
					date_a.getDate() === date_b.getDate() &&
					date_a.getHours() === date_b.getHours();
			case "x_day" :
			case "day" :
				return date_a.getFullYear() === date_b.getFullYear() &&
					date_a.getMonth() === date_b.getMonth() &&
					date_a.getDate() === date_b.getDate();
			case "x_week" :
			case "week" :
			case "x_month" :
			case "month" :
				return date_a.getFullYear() === date_b.getFullYear() &&
					date_a.getMonth() === date_b.getMonth();
			default : return false;
		}
	},


	// =========================================================================//
	// DOMAIN COMPUTATION														//
	// =========================================================================//

	/**
	 * Return the day of the year for the date
	 * @param	Date
	 * @return  int Day of the year [1,366]
	 */
	getDayOfYear : d3.time.format("%j"),

	/**
	 * Return the week number of the year
	 * Monday as the first day of the week
	 * @return int	Week number [0-53]
	 */
	getWeekNumber : function(d) {
		var f = this.options.weekStartOnMonday === true ? d3.time.format("%W") : d3.time.format("%U");
		return f(d);
	},


	getWeekDay : function(d) {
		if (this.options.weekStartOnMonday === false) {
			return d.getDay();
		}
		else if (d.getDay() === 0) {
			return 6;
		}
		return d.getDay()-1;
	},


	/**
	 * Get the last day of the month
	 * @param  Date|int	d	Date or timestamp in milliseconds
	 * @return Date			Last day of the month
	 */
	getEndOfMonth : function(d) {
		if (typeof d === "number") {
			d = new Date(d);
		}
		return new Date(d.getFullYear(), d.getMonth()+1, 0);
	},

	/**
	 * Return a range of week number
	 * @param  number|Date	d	A date, or timestamp in milliseconds
	 * @return Date				The start of the hour
	 */
	getWeekDomain: function (d, range) {
		var weekStart;

		if (this.options.weekStartOnMonday === false) {
			weekStart = new Date(d.getFullYear(), d.getMonth(), d.getDate() - d.getDay());
		} else {
			if (d.getDay() === 1) {
				weekStart = new Date(d.getFullYear(), d.getMonth(), d.getDate());
			} else if (d.getDay() === 0) {
				weekStart = new Date(d.getFullYear(), d.getMonth(), d.getDate());
				weekStart.setDate(weekStart.getDate() - 6);
			} else {
				weekStart = new Date(d.getFullYear(), d.getMonth(), d.getDate()-d.getDay()+1);
			}
		}

		var endDate = new Date(weekStart);

		var stop = new Date(endDate.setDate(endDate.getDate() + range * 7));

		return (this.options.weekStartOnMonday === true) ?
			d3.time.mondays(Math.min(weekStart, stop), Math.max(weekStart, stop)) :
			d3.time.sundays(Math.min(weekStart, stop), Math.max(weekStart, stop))
		;
	},

	getYearDomain: function(d, range){
		var start = new Date(d.getFullYear(), 0);
		var stop = new Date(d.getFullYear()+range, 0);

		return d3.time.years(Math.min(start, stop), Math.max(start, stop));
	},

	/**
	 * Return all the minutes between from the same hour
	 * @param  number|Date	d	A date, or timestamp in milliseconds
	 * @return Date				The start of the hour
	 */
	getMinuteDomain: function (d, range) {
		var start = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours());
		var stop = new Date(start.getTime() + 60 * 1000 * range);

		return d3.time.minutes(Math.min(start, stop), Math.max(start, stop));
	},

	/**
	 * Return the start of an hour
	 * @param  number|Date	d	A date, or timestamp in milliseconds
	 * @return Date				The start of the hour
	 */
	getHourDomain: function (d, range) {
		var start = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours());
		var stop = range;
		if (typeof range === "number") {
			stop = new Date(start.getTime() + 3600 * 1000 * range);
		}

		return d3.time.hours(Math.min(start, stop), Math.max(start, stop));
	},

	/**
	 * Return the start of an hour
	 * @param  number|Date	d		A date, or timestamp in milliseconds
	 * @param  int			range	Number of days in the range
	 * @return Date					The start of the hour
	 */
	getDayDomain: function (d, range) {
		var start = new Date(d.getFullYear(), d.getMonth(), d.getDate());
		var stop = new Date(start);
		stop = new Date(stop.setDate(stop.getDate() + parseInt(range, 10)));

		return d3.time.days(Math.min(start, stop), Math.max(start, stop));
	},

	/**
	 * Return the month domain for the current date
	 * @param  Date		d	A date
	 * @return Array
	 */
	getMonthDomain: function (d, range) {
		var start = new Date(d.getFullYear(), d.getMonth());
		var stop = new Date(start);
		stop = stop.setMonth(stop.getMonth()+range);

		return d3.time.months(Math.min(start, stop), Math.max(start, stop));
	},

	getDomain: function(date, range) {
		if (typeof date === "number") {
			date = new Date(date);
		}

		if (typeof range === "undefined") {
			range = this.options.range;
		}

		switch(this.options.domain) {
			case "hour"  : return this.getHourDomain(date, range);
			case "day"   : return this.getDayDomain(date, range);
			case "week"  : return this.getWeekDomain(date, range);
			case "month" : return this.getMonthDomain(date, range);
			case "year"  : return this.getYearDomain(date, range);
		}
	},

	getSubDomain: function(date) {
		if (typeof date === "number") {
			date = new Date(date);
		}

		var parent = this;

		var computeDaySubDomainSize = function(date, domain) {
			switch(domain) {
				case "year" : return parent.getDayOfYear(new Date(date.getFullYear()+1, 0, 0));
				case "month" :
					var lastDayOfMonth = new Date(date.getFullYear(), date.getMonth()+1, 0);
					return lastDayOfMonth.getDate();
				case "week" : return 7;
			}
		};

		var computeMinSubDomainSize = function(date, domain) {
			switch (domain) {
				case "hour" : return 60;
				case "day" : return 60 * 24;
				case "week" : return 60 * 24 * 7;
			}
		};

		var computeHourSubDomainSize = function(date, domain) {
			switch(domain) {
				case "day" : return 24;
				case "week" : return 168;
				case "month" :
					var endOfMonth = new Date(date.getFullYear(), date.getMonth()+1, 0);
					return endOfMonth.getDate() * 24;
			}
		};

		var computeWeekSubDomainSize = function(date, domain) {
			if (domain === "month") {
				var endOfMonth = new Date(date.getFullYear(), date.getMonth()+1, 0);
				var endWeekNb = parent.getWeekNumber(endOfMonth);
				var startWeekNb = parent.getWeekNumber(new Date(date.getFullYear(), date.getMonth()));

				if (startWeekNb > endWeekNb) {
					startWeekNb = 0;
					endWeekNb++;
				}

				return endWeekNb - startWeekNb + 1;
			} else if (domain === "year") {
				return parent.getWeekNumber(new Date(date.getFullYear(), 11, 31));
			}
		};


		switch(this.options.subDomain) {
			case "x_min" :
			case "min"   : return this.getMinuteDomain(date, computeMinSubDomainSize(date, this.options.domain));
			case "x_hour":
			case "hour"  : return this.getHourDomain(date, computeHourSubDomainSize(date, this.options.domain));
			case "x_day" :
			case "day"   : return this.getDayDomain(date, computeDaySubDomainSize(date, this.options.domain));
			case "x_week":
			case "week"  : return this.getWeekDomain(date, computeWeekSubDomainSize(date, this.options.domain));
			case "x_month":
			case "month" : return this.getMonthDomain(date, 12);
		}
	},

	getNextDomain: function() {
		return this.getDomain(parseInt(this._domains.keys().sort().pop(), 10), 2).pop();
	},

	getPreviousDomain: function() {
		return this.getDomain(parseInt(this._domains.keys().sort().shift(), 10), -1)[0];
	},

	/**
	 * Return the classname on the legend for the specified value
	 *
	 * @param  Item count n Number of items for that perdiod of time
	 * @return string		Classname according to the legend
	 */
	legend: function(n) {

		if (isNaN(n)) {
			return "qi";
		} else if (n === null) {
			return "";
		}

		for (var i = 0, total = this.options.legend.length-1; i <= total; i++) {

			if (n === 0 && this.options.legend[0] > 0) {
				return "";
			} else if (this.options.legend[0] > 0 && n < 0) {
				return "qi";
			}

			if (n <= this.options.legend[i]) {
				return "q" + (i+1);
			}
		}
		return "q" + (this.options.legend.length + 1);
	},

	// =========================================================================//
	// DATAS																	//
	// =========================================================================//

	/**
	 * Fetch and interpret data from the datasource
	 *
	 * @param string|object source
	 * @param Date startDate
	 * @param Date endDate
	 * @param function callback
	 * @param function|boolean afterLoad function used to convert the data into a json object. Use true to use the afterLoad callback
	 * @param updateMode
	 *
	 * @return mixed
	 * - True if there are no data to load
	 * - False if data are loaded asynchronously
	 */
	getDatas: function(source, startDate, endDate, callback, afterLoad, updateMode) {
		var self = this;
		if (arguments.length < 5) {
			afterLoad = true;
		}
		if (arguments.length < 6) {
			updateMode = this.APPEND_ON_UPDATE;
		}
		var _callback = function(data) {
			if (afterLoad !== false) {
				if (typeof afterLoad === "function") {
					data = afterLoad(data);
				} else if (typeof (self.options.afterLoadData) === "function") {
					data = self.options.afterLoadData(data);
				} else {
					console.log("Provided callback for afterLoadData is not a function.");
					return {};
				}
			}
			self.parseDatas(data, updateMode);
			callback();
		};

		switch(typeof source) {
			case "string" :
				if (source === "") {
					_callback({});
					return true;
				} else {
					switch(this.options.dataType) {
						case "json" :
							d3.json(this.parseURI(source, startDate, endDate), _callback);
							break;
						case "csv" :
							d3.csv(this.parseURI(source, startDate, endDate), _callback);
							break;
						case "tsv" :
							d3.tsv(this.parseURI(source, startDate, endDate), _callback);
							break;
						case "text" :
							d3.text(this.parseURI(source, startDate, endDate), "text/plain", _callback);
							break;
					}

					return false;
				}
				break;
			case "object" :
				// @todo Check that it's a valid JSON object
				_callback(source);
		}

		return true;
	},

	/**
	 * Populate the calendar internal data
	 *
	 * @param object data
	 * @param constant updateMode
	 *
	 * @return void
	 */
	parseDatas: function(data, updateMode) {

		if (updateMode === this.RESET_ALL_ON_UPDATE) {
			this._domains.forEach(function(key, value) {
				value.forEach(function(element, index, array) {
					array[index].v = null;
				});
			});
		}

		var domainKeys = this._domains.keys();
		var subDomainStep = this._domains.get(domainKeys[0])[1].t - this._domains.get(domainKeys[0])[0].t;

		for (var d in data) {
			var date = new Date(d*1000);
			var domainUnit = this.getDomain(date)[0].getTime();

			// Record only datas relevant to the current domain
			if (this._domains.has(domainUnit)) {
				var subDomainUnit = this._domainType[this.options.subDomain].extractUnit(date);
				var subDomainsData = this._domains.get(domainUnit);
				var index = Math.floor((subDomainUnit - domainUnit) / subDomainStep);

				if (updateMode === this.RESET_SINGLE_ON_UPDATE) {
					subDomainsData[index].v = data[d];
				} else {
					if (!isNaN(subDomainsData[index].v)) {
						subDomainsData[index].v += data[d];
					} else {
						subDomainsData[index].v = data[d];
					}
				}
			}
		}
	},

	parseURI: function(str, startDate, endDate) {
		// Use a timestamp in seconds
		str = str.replace(/\{\{t:start\}\}/g, startDate.getTime()/1000);
		str = str.replace(/\{\{t:end\}\}/g, endDate.getTime()/1000);

		// Use a string date, following the ISO-8601
		str = str.replace(/\{\{d:start\}\}/g, startDate.toISOString());
		str = str.replace(/\{\{d:end\}\}/g, endDate.toISOString());

		return str;
	},

	// =========================================================================//
	// PUBLIC API																//
	// =========================================================================//

	next: function() {
		return this.loadNextDomain();
	},

	previous: function() {
		return this.loadPreviousDomain();
	},

	/**
	 * Update the calendar with new data
	 *
	 * @param  object|string		dataSource		The calendar's datasource, same type as this.options.data
	 * @param  boolean|function		afterLoad		Whether to execute afterLoad() on the data. Pass directly a function
	 * if you don't want to use the afterLoad() callback
	 */
	update: function(dataSource, afterLoad, updateMode) {
		if (arguments.length < 2) {
			afterLoad = true;
		}
		if (arguments.length < 3) {
			updateMode = this.RESET_ALL_ON_UPDATE;
		}

		var domains = this._domains.keys().sort();
		var self = this;
		this.getDatas(
			dataSource,
			new Date(parseInt(domains[0], 10)),
			this.getSubDomain(parseInt(domains[domains.length-1], 10)).pop(),
			function() {
				self.fill();
			},
			afterLoad,
			updateMode
		);
	},

	getSVG: function() {
		var styles = {
			".graph": {},
			".graph-rect": {},
			"rect.highlight": {},
			"rect.now": {},
			"text.highlight": {},
			"text.now": {},
			".domain-background": {},
			".graph-label": {},
			".subdomain-text": {},
			".qi": {}
		};

		for (var j = 0, total = this.options.legend.length; j < total; j++) {
			styles[".q" + j] = {};
		}

		var root = this.root;

		var whitelistStyles = [
			// SVG specific properties
			"stroke", "stroke-width", "stroke-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-miterlimit",
			"fill", "fill-opacity", "fill-rule",
			"marker", "marker-start", "marker-mid", "marker-end",
			"alignement-baseline", "baseline-shift", "dominant-baseline", "glyph-orientation-horizontal", "glyph-orientation-vertical", "kerning", "text-anchor",
			"shape-rendering",

			// Text Specific properties
			"text-transform", "font-family", "font", "font-size", "font-weight"
		];

		var filterStyles = function(attribute, property, value) {
			if (whitelistStyles.indexOf(property) !== -1) {
				styles[attribute][property] = value;
			}
		};

		var getElement = function(e) {
			return root.select(e)[0][0];
		};

		for (var element in styles) {

			var dom = getElement(element);

			if (dom === null) {
				continue;
			}

			// The DOM Level 2 CSS way
			if ("getComputedStyle" in window) {
				var cs = getComputedStyle(dom, null);
				if (cs.length !== 0) {
					for (var i = 0; i < cs.length; i++) {
						filterStyles(element, cs.item(i), cs.getPropertyValue(cs.item(i)));
					}

				// Opera workaround. Opera doesn"t support `item`/`length`
				// on CSSStyleDeclaration.
				} else {
					for (var k in cs) {
						if (cs.hasOwnProperty(k)) {
							filterStyles(element, k, cs[k]);
						}
					}
				}

			// The IE way
			} else if ("currentStyle" in dom) {
				var css = dom.currentStyle;
				for (var p in css) {
					filterStyles(element, p, css[p]);
				}
			}
		}



		var string = "<svg xmlns=\"http://www.w3.org/2000/svg\" "+
		"xmlns:xlink=\"http://www.w3.org/1999/xlink\"><style type=\"text/css\"><![CDATA[ ";

		for (var style in styles) {
			string += style + " {\n";
			for (var l in styles[style]) {
				string += "\t" + l + ":" + styles[style][l] + ";\n";
			}
			string += "}\n";
		}

		string += "]]></style>";
		string += new XMLSerializer().serializeToString(this.root.selectAll("svg")[0][0]);
		string += new XMLSerializer().serializeToString(this.root.selectAll("svg")[0][1]);
		string += "</svg>";

		return string;
	}
};

var DomainPosition = function() {
	this.positions = d3.map();
};

DomainPosition.prototype.getPosition = function(d) {
	return this.positions.get(d);
};

DomainPosition.prototype.getPositionFromIndex = function(i) {
	var domains = this.positions.keys().sort();
	return this.positions.get(domains[i]);
};

DomainPosition.prototype.getLast = function() {
	var domains = this.positions.keys().sort();
	return this.positions.get(domains[domains.length-1]);
};

DomainPosition.prototype.setPosition = function(d, dim) {
	this.positions.set(d, dim);
};

DomainPosition.prototype.shiftRightBy = function(exitingDomainDim) {
	this.positions.forEach(function(key, value) {
		this.set(key, value - exitingDomainDim);
	});

	var domains = this.positions.keys().sort();
	this.positions.remove(domains[0]);
};

DomainPosition.prototype.shiftLeftBy = function(enteringDomainDim) {
	this.positions.forEach(function(key, value) {
		this.set(key, value + enteringDomainDim);
	});

	var domains = this.positions.keys().sort();
	this.positions.remove(domains[domains.length-1]);
};


/**
 * Sprintf like function
 * @source http://stackoverflow.com/a/4795914/805649
 * @return String
 */
String.prototype.format = function () {
	var formatted = this;
	for (var prop in arguments[0]) {
		var regexp = new RegExp("\\{" + prop + "\\}", "gi");
		formatted = formatted.replace(regexp, arguments[0][prop]);
	}
	return formatted;
};

/**
 * #source http://stackoverflow.com/a/383245/805649
 */
function mergeRecursive(obj1, obj2) {

	for (var p in obj2) {
		try {
			// Property in destination object set; update its value.
			if (obj2[p].constructor === Object) {
				obj1[p] = mergeRecursive(obj1[p], obj2[p]);
			} else {
				obj1[p] = obj2[p];
			}
		} catch(e) {
			// Property in destination object not set; create it and set its value.
			obj1[p] = obj2[p];
		}
	}

	return obj1;
}

/**
 * AMD Loader
 */
if (typeof define === "function" && define.amd) {
	define(["d3"], function() {
		return CalHeatMap;
	});
}
