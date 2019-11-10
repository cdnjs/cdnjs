/**
* ngModelOptions v1.0.1: ngModelOptions for AngularJS 1.2
*
* @author Fergal Doyle
* @url https://github.com/fergaldoyle/modelOptions
* @license MIT
*/

(function (root, factory) {
	if (typeof module !== 'undefined' && module.exports) {
		// CommonJS
		module.exports = factory(require('angular'));
	} else if (typeof define === 'function' && define.amd) {
		// AMD
		define(['angular'], factory);
	} else {
		// Global Variables
		factory(root.angular);
	}
}(window, function (angular) {

	angular.module("modelOptions", []).directive("ngModelOptions", function () {
		return {
			priority: 1,
			restrict: "A",
			//require: "ngModel",
			require: ['ngModel'/*, '^?select'*/],
			link: function (scope, elm, attr, ctrls) {

				function apply() {

					var value;

					switch (tagType) {
						case "inputradio":
							if (attr.ngValue) {
								value = scope.$eval(attr.ngValue);
							} else {
								value = elm.val();
							}
							break;
						case "inputcheckbox":
							value = elm.prop("checked");
							break;
						case "select":
							value = getSelectOption();
							break;
						default:
							value = elm.val();

							if (!attr.ngTrim || attr.ngTrim.toLowerCase() !== "false") {
								value = value.replace(/^\s+|\s+$/g, "");
							}

					}

					scope.$apply(function () {
						ctrls[0].$setViewValue(value);
					});
				}

				function getSelectOption() {

					if (!attr.ngOptions) {
						throw "Must have ng-options";
					}

					var match = attr.ngOptions.match(NG_OPTIONS_REGEXP),
						track = match[8],
						valuesName = match[7],
						values = scope.$eval(valuesName),
						index,
						val = elm.val();

					// if track by is specified
					// use the track by value as
					// a key to find the index
					if (track) {
						angular.forEach(values, function (item, i) {
							if (item[track.replace(/^.*?\./, "")] == val) {
								index = i;
							}
						});
					} else {
						index = val;
					}

					// value is a property of an object
					if (/.*\..*/.test(match[1])) {
						return scope.$eval(match[1].replace(/^.*?\./, valuesName + "[" + index + "]."));
					} else { // value is an object
						return values[index];
					}
				}

				var timer,
					NG_OPTIONS_REGEXP = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,
					tagType = elm[0].nodeName.toLowerCase() + (attr.type || ""),
					defaultEvents = [],
					defaults = {
						debounce: 0,
						updateOn: "default"
					},
					options = angular.extend(defaults, scope.$eval(attr.ngModelOptions)),
					multiDebounce = typeof options.debounce === "object",
					updateOnSplit = options.updateOn.split(" ");

				if (tagType === "inputtext" || tagType === "textarea") {
					defaultEvents = ["keydown", "input", "change"];
				} else if (tagType === "inputradio" || tagType === "inputcheckbox") {
					defaultEvents = ["click"];
				} else if (tagType === "select") {
					defaultEvents = ["change"];
				} else {
					defaultEvents = ["keydown", "input", "change"];
				}

				// unbind default events to prevent automatic model updates
				angular.forEach(defaultEvents, function (event) {
					// ie8 does not support some events
					// use try catch to mask this
					try { elm.off(event); } catch (e) { }
				});

				// default events
				if (options.updateOn.match(/default/i)) {
					elm.on(defaultEvents.join(" "), function (e) {
						var delay = options.debounce["default"] || options.debounce || 0;
						clearTimeout(timer);
						timer = setTimeout(function () {
							apply();
						}, delay);
					});
				}

				// the other events if specified
				angular.forEach(updateOnSplit, function (event) {
					if (event === "default") {
						return;
					}

					// debounce option can be number or object
					var deb;
					if (multiDebounce) {
						deb = options.debounce[event];
					} else {
						deb = options.debounce;
					}

					var delay = deb;
					if (typeof delay === "undefined") {
						delay = options.debounce["default"] || 0;
					}

					elm.on(event, function (e) {
						clearTimeout(timer);
						timer = setTimeout(function () {
							apply();
						}, delay);
					});
				});

			}
		};
	});

}));