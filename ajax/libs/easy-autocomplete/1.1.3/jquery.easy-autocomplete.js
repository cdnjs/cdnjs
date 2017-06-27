/*
 * easy-autocomplete
 * jQuery plugin for autocompletion
 * 
 * @author Łukasz Pawełczak (http://github.com/pawelczak)
 * @version 1.1.2
 * Copyright MIT License: https://github.com/pawelczak/easy-autocomplete/blob/master/LICENSE.txt
 */

/*
 * EasyAutocomplete - Configuration 
 */
var EasyAutocomplete = (function(scope){

	scope.Configuration = function Configuration(options) {
		var defaults = {
			data: "list-required",
			url: "list-required",
			dataType: "json",

			listLocation: function(data) {
				return data;
			},

			xmlElementName: "",

			getValue: function(element) {
				return element;
			},

			autocompleteOff: true,

			placeholder: false,

			ajaxCallback: function() {},

			matchResponseProperty: false,

			list: {
				sort: {
					enabled: false,
					method: function(a, b) {
						a = defaults.getValue(a);
						b = defaults.getValue(b);
						if (a < b) {
							return -1;
						}
						if (a > b) {
							return 1;
						}
						return 0;
					}
				},

				maxNumberOfElements: 6,

				match: {
					enabled: false,
					caseSensitive: false,
					method: function(a, b) {
						a = defaults.getValue(a);
						b = defaults.getValue(b);

						if (a === b){
							return true;
						}  
						return false;
					}
				},

				showAnimation: {
					type: "normal", //normal|slide|fade
					time: 400,
					callback: function() {}
				},

				hideAnimation: {
					type: "normal",
					time: 400,
					callback: function() {}
				}

			},

			highlightPhrase: true,

			theme: "",

			cssClasses: ""

		};

		prepareDefaults();

		mergeOptions();

		addAjaxSettings();

		processAfterMerge();
		

		this.get = function(propertyName) {
			return defaults[propertyName];
		};

		this.equals = function(name, value) {
			if (isAssigned(name)) {
				if (defaults[name] === value) {
					return true;
				}
			} 
			
			return false;
		};

		this.checkDataUrlProperties = function() {
			if (defaults.url === "list-required" && defaults.data === "list-required") {
				return false;
			}
			return true;
		};
		this.checkRequiredProperties = function() {
			for (var propertyName in defaults) {
				if (defaults[propertyName] === "required") {
					logger.error("Option " + propertyName + " must be defined");
					return false;
				}
			}
			return true;
		};
		function prepareDefaults() {

			if (options.dataType === "xml") {
				
				if (!options.getValue) {

					options.getValue = function(element) {
						return $(element).text();
					};
				}

				
				if (!options.list) {

					options.list = {};
				} 

				if (!options.list.sort) {
					options.list.sort = {};
				}


				options.list.sort.method = function(a, b) {
					a = options.getValue(a);
					b = options.getValue(b);
					if (a < b) {
						return -1;
					}
					if (a > b) {
						return 1;
					}
					return 0;
				};

				if (!options.list.match) {
					options.list.match = {};
				}

				options.list.match.method = function(a, b) {
					a = options.getValue(a);
					b = options.getValue(b);

					if (a === b){
						return true;
					}  
					return false;
				};

			}
		}

		function mergeOptions() {

			defaults = mergeObjects(defaults, options);

			function mergeObjects(source, target) {
				var mergedObject = source || {};

				for (var propertyName in source) {
					if (target[propertyName] !== undefined && target[propertyName] !== null) {

						if (typeof target[propertyName] !== "object" || 
								target[propertyName] instanceof Array) {
							mergedObject[propertyName] = target[propertyName];		
						} else {
							mergeObjects(source[propertyName], target[propertyName]);
						}
					}
				}
				
				return mergedObject;
			}
		}	


		function processAfterMerge() {

			if (defaults.url !== "list-required" && typeof defaults.url !== "function") {
				var defaultUrl = defaults.url;
				defaults.url = function() {
					return defaultUrl;
				};
			}

			if (defaults.ajaxSettings.url !== undefined && typeof defaults.ajaxSettings.url !== "function") {
				var defaultUrl = defaults.ajaxSettings.url;
				defaults.ajaxSettings.url = function() {
					return defaultUrl;
				};
			}

			if (typeof defaults.listLocation === "string") {
				var defaultlistLocation = defaults.listLocation;
				defaults.listLocation = function(data) {
					return data[defaultlistLocation];
				};
			}

			if (typeof defaults.getValue === "string") {
				var defaultsGetValue = defaults.getValue;
				defaults.getValue = function(element) {
					return element[defaultsGetValue];
				};
			}

		}

		function addAjaxSettings() {

			if (options.ajaxSettings !== undefined && typeof options.ajaxSettings === "object") {
				defaults.ajaxSettings = options.ajaxSettings;
			} else {
				defaults.ajaxSettings = {};	
			}
			
		}

		function isAssigned(name) {
			if (defaults[name] !== undefined && defaults[name] !== null) {
				return true;
			} else {
				return false;
			}
		}
	};

	return scope;

})(EasyAutocomplete || {});


/*
 * EasyAutocomplete - Logger 
 */
var EasyAutocomplete = (function(scope){
	
	scope.Logger = function Logger() {
		var logger = {};

		this.error = function(message) {
			console.log("ERROR: " + message);
		}

		this.warning = function(message) {
			console.log("WARNING: " + message);
		}
	};

	return scope;

})(EasyAutocomplete || {});
	

/*
 * EasyAutocomplete - Constans
 */
var EasyAutocomplete = (function(scope){	
	
	scope.Constans = function Constans() {
		var constants = {
			CONTAINER_CLASS: "easy-autocomplete-container",
			CONTAINER_ID: "eac-container-",

			WRAPPER_CSS_CLASS: "easy-autocomplete"
		};

		this.getValue = function(propertyName) {
			return constants[propertyName];
		};

	};

	return scope;

})(EasyAutocomplete || {});

/*
 * EasyAutocomplete - Data proccess module
 *
 * Process list to display:
 * - sort 
 * - decrease number to specific number
 * - show only matching list
 *
 */
var EasyAutocomplete = (function(scope) {

	scope.proccess = function proccessData(config, list, phrase) {

		var inputPhrase = phrase;//TODO REFACTOR

		list = findMatch(list, inputPhrase);
		list = reduceElementsInList(list);
		list = sort(list);

		return list;


		function findMatch(list, phrase) {
			var preparedList = [],
				value = "";

			if (config.get("list").match.enabled) {

				for(var i = 0, length = list.length; i < length; i += 1) {

					value = config.get("getValue")(list[i]);
					
					if (!config.get("list").match.caseSensitive) {

						if (typeof value === "string") {
							value = value.toLowerCase();	
						}
						
						phrase = phrase.toLowerCase();
					}
					if (value.search(phrase) > -1) {
						preparedList.push(list[i]);
					}
					
				}

			} else {
				preparedList = list;
			}

			return preparedList;
		}

		function reduceElementsInList(list) {
			if (list.length > config.get("list").maxNumberOfElements) {
				list = list.slice(0, config.get("list").maxNumberOfElements);
			}

			return list;
		}

		function sort(list) {
			if (config.get("list").sort.enabled) {
				list.sort(config.get("list").sort.method);
			}

			return list;
		}
		
	};

	return scope;



})(EasyAutocomplete || {});


/*
 * EasyAutocomplete - Template 
 *
 * 
 *
 */
var EasyAutocomplete = (function(scope){

	scope.Template = function Template(options) {


		var genericTemplates = {
			basic: {
				type: "basic",
				method: function(element) { return element; }
			},
			description: {
				type: "description",
				fields: {
					description: "description"
				},
				method: function(element) {	return element + " - description"; },
				cssClass: "eac-description"
			},
			iconLeft: {
				type: "iconLeft",
				fields: {
					icon: ""
				},
				method: function(element) {
					return element;
				},
				cssClass: "eac-icon-left"
			},
			iconRight: {
				type: "iconRight",
				fields: {
					iconSrc: ""
				},
				method: function(element) {
					return element;
				},
				cssClass: "eac-icon-right"
			},
			custom: {
				type: "custom",
				method: function() {}
			}
		},



		/*
		 * Converts method with {{text}} to function
		 */
		convertTemplateToMethod = function(template) {


			var _fields = template.fields;

			if (template.type === "description") {

				var buildMethod = function(elementValue, element) {
					return elementValue + " - <span>" + element[_fields.description] + "</span>";
				};


				return buildMethod;

			}

			if (template.type === "iconRight") {

				var buildMethod = "";

				if (typeof _fields.iconSrc === "string") {
					buildMethod = function(elementValue, element) {
						return elementValue + "<img class='eac-icon' src='" + element[_fields.iconSrc] + "' />" ;
					};					
				} else if (typeof _fields.iconSrc === "function") {
					buildMethod = function(elementValue, element) {
						return elementValue + "<img class='eac-icon' src='" + _fields.iconSrc(element) + "' />" ;
					};
				}

				return buildMethod;
			}


			if (template.type === "iconLeft") {

				var buildMethod = "";

				if (typeof _fields.iconSrc === "string") {
					buildMethod = function(elementValue, element) {
						return "<img class='eac-icon' src='" + element[_fields.iconSrc] + "' />" + elementValue ;
					};					
				} else if (typeof _fields.iconSrc === "function") {
					buildMethod = function(elementValue, element) {
						return "<img class='eac-icon' src='" + _fields.iconSrc(element) + "' />" + elementValue;
					};
				}

				return buildMethod;
			}


			if (template.type === "custom") {

				return template.method;
			}

			return genericTemplates.basic.method;

		}


		prepareBuildMethod = function(options) {
			if (!options || !options.type) {

				return genericTemplates.basic.method;
			}

			if (options.type && genericTemplates[options.type]) {

				return convertTemplateToMethod(options);
			} else {

				return genericTemplates.basic.method;
			}

		},

		templateClass = function(options) {
			var emptyStringFunction = function() {return "";};

			if (!options || !options.type) {

				return emptyStringFunction;
			}

			if (options.type && genericTemplates[options.type]) {
				return (function (){ 
					var _cssClass = genericTemplates[options.type].cssClass;
					return function() { return _cssClass;}
				})();
			} else {
				return emptyStringFunction;
			}
		};


		this.getTemplateClass = templateClass(options);

		this.build = prepareBuildMethod(options);


	}

	return scope;

})(EasyAutocomplete || {});


/*
 * EasyAutocomplete - jQuery plugin for autocompletion
 *
 */
var EasyAutocomplete = (function(scope) {

	
	scope.main = function Core($input, options) {
				
		var module = {
				name: "EasyAutocomplete"
			};

		var consts = new scope.Constans(),
			config = new scope.Configuration(options),
			logger = new scope.Logger(),
			template = new scope.Template(options.template),
			proccessResponseData = scope.proccess,
			checkParam = config.equals,

			$field = $input, 
			$container = "",
			elementsList = [],
			selectedElement = -1;

		this.getConstants = function() {
			return consts;
		};

		this.getConfiguration = function() {
			return config;
		};

		this.getContainer = function() {
			return $container;
		};

		this.build = function() {
			prepareField();
		};

		this.init = function() {
			init();
		};
		function init() {


			if (!config.checkDataUrlProperties()) {
				logger.error("One of options variables 'data' or 'url' must be defined.");
				return;
			}

			if (!config.checkRequiredProperties()) {
				logger.error("Will not work without mentioned properties.");
				return;
			}


			prepareField();
			bindEvents();	

		}
		function prepareField() {

				
			if ($field.parent().hasClass(consts.getValue("WRAPPER_CSS_CLASS"))) {
				removeContainer();
				removeWrapper();
			} 
			
			createWrapper();
			createContainer();	

			$container = $("#" + getContainerId());
			if (config.get("placeholder")) {
				$field.attr("placeholder", config.get("placeholder"));
			}


			function createWrapper() {
				var $wrapper = $("<div>"),
					classes = consts.getValue("WRAPPER_CSS_CLASS");

			
				if (config.get("theme")) {
					classes += " eac-" + config.get("theme");
				}

				if (config.get("cssClasses")) {
					classes += " " + config.get("cssClasses");
				}

				if (template.getTemplateClass() !== "") {
					classes += " " + template.getTemplateClass();
				}
				

				$wrapper
					.addClass(classes);
				$field.wrap($wrapper);


				adjustWrapperWidth();

			}

			function adjustWrapperWidth() {
				var fieldWidth = $field.outerWidth();

				$field.parent().css("width", fieldWidth);				
			}

			function removeWrapper() {
				$field.unwrap();
			}

			function createContainer() {
				var $elements_container = $("<div>").addClass(consts.getValue("CONTAINER_CLASS"));

				$elements_container
						.attr("id", getContainerId())
						.prepend($("<ul>"));


				(function() {

					$elements_container
						/* List show animation */
						.on("show", function() {

							switch(config.get("list").showAnimation.type) {

								case "slide":
									var animationTime = config.get("list").showAnimation.time,
										callback = config.get("list").showAnimation.callback;

									$elements_container.find("ul").slideDown(animationTime, callback);
								break;

								case "fade":
									var animationTime = config.get("list").showAnimation.time,
										callback = config.get("list").showAnimation.callback;

									$elements_container.find("ul").fadeIn(animationTime), callback;
								break;

								default:
									$elements_container.find("ul").show();
								break;
							}
							
						})
						/* List hide animation */
						.on("hide", function() {

							switch(config.get("list").hideAnimation.type) {

								case "slide":
									var animationTime = config.get("list").hideAnimation.time,
										callback = config.get("list").hideAnimation.callback;

									$elements_container.find("ul").slideUp(animationTime, callback);
								break;

								case "fade":
									var animationTime = config.get("list").hideAnimation.time,
										callback = config.get("list").hideAnimation.callback;

									$elements_container.find("ul").fadeOut(animationTime, callback);
								break;

								default:
									$elements_container.find("ul").hide();
								break;
							}
						})
						.on("selectElement", function(event, selected) {
							$elements_container.find("ul li").removeClass("selected");
							$elements_container.find("ul li:nth-child(" + (selectedElement + 1) + ")").addClass("selected");
						})
						.on("loadElements", function(event, list, phrase) {
			

							var $item = "",
								$list = $("<ul>"),
								$listContainer = $elements_container.find("ul");

							$listContainer
								.empty()
								.detach();


							for(var i = 0, length = list.length; i < length; i += 1) {
								$item = $("<li><div class='eac-item'></div></li>");
								

								(function() {
									var j = i,
										elementsValue = config.get("getValue")(list[j]);

									$item.find(" > div")
										.on("click", function() {

											$field.val(elementsValue);
											selectElement(j);
										})
										.mouseover(function() {

											selectedElement = j;
											selectElement(j);	
										})
										.html(template.build(highlight(elementsValue, phrase), list[j]));
								})();

								$listContainer.append($item);
								
							}

							$elements_container.append($listContainer);

						});

				})();

				$field.after($elements_container);
			}

			function removeContainer() {
				$field.next("." + consts.getValue("CONTAINER_CLASS")).remove();
			}

			function highlight(string, phrase) {

				if(config.get("highlightPhrase") && phrase !== "") {
					return highlightPhrase(string, phrase);	
				} else {
					return string;
				}
					
			}

			function highlightPhrase(string, phrase) {
				return (string + "").replace(new RegExp("(" + phrase + ")", "gi") , "<b>$1</b>");
			}



		}
		function getContainerId() {
			
			var elementId = $field.attr("id");

			if (elementId === undefined || elementId === null) {
				
				do {
					elementId = consts.getValue("CONTAINER_ID") + Math.rand(10000);	
				} while($("#" + elementId).length === 0);

			} else {
				elementId = consts.getValue("CONTAINER_ID") + elementId;
			}

			return elementId;
		}
		function bindEvents() {

			bindAllEvents();
			

			function bindAllEvents() {
				if (checkParam("autocompleteOff", true)) {
					removeAutocomplete();
				}

				bindKeyup();
				bindKeydown();
				bindKeypress();
				bindFocus();
				bindBlur();
			}

			function bindKeyup() {
				$field
				.off("keyup")
				.keyup(function(event) {

					switch(event.keyCode) {

						case 27:

							hideContainer();
							loseFieldFocus();
						break;

						case 38:

							event.preventDefault();

							if(elementsList.length > 0 && selectedElement > 0) {

								selectedElement -= 1;

								$field.val(config.get("getValue")(elementsList[selectedElement]));

								selectElement(selectedElement);

							}						
						break;

						case 40:

							event.preventDefault();

							if(elementsList.length > 0 && selectedElement < elementsList.length - 1) {

								selectedElement += 1;

								$field.val(config.get("getValue")(elementsList[selectedElement]));

								selectElement(selectedElement);
								
							}

						break;

						default:

							if (event.keyCode > 40 || event.keyCode === 8) {
								loadData();	
							}
							

						break;
					}
				

					function loadData() {

						var inputPhrase = $field.val();

						if (config.get("data") !== "list-required") {
							
							elementsList = proccessResponseData(config, config.get("data"), $field.val());

							loadElements(elementsList, inputPhrase);

							showContainer();

						}

						var settings = createAjaxSettings();

						if (settings.url === undefined || settings.url === "") {
							settings.url = config.get("url");
						}

						if (settings.dataType === undefined || settings.dataType === "") {
							settings.dataType = config.get("dataType");
						}


						if (settings.url !== undefined && settings.url !== "list-required") {

							settings.url = settings.url(inputPhrase);

							$.ajax(settings) 
								.done(function(data) {

									elementsList = config.get("listLocation")(data);

									
									if(config.get("dataType").toUpperCase() === "XML") {
										elementsList = convertXmlToList(elementsList);
									}

									var length = elementsList.length;

									if (length === 0) {
										return;
									}
									

									if (checkInputPhraseMatchResponse(inputPhrase, data)) {

										elementsList = proccessResponseData(config, elementsList, $field.val());

										loadElements(elementsList, inputPhrase);	
										
										showContainer();
									}


									config.get("ajaxCallback")();

								})
								.fail(function() {
									logger.warning("Fail to load response data");
								})
								.always(function() {

								});
						}

						function convertXmlToList(list) {
							var simpleList = [];

							$(list).find(config.get("xmlElementName")).each(function() {
								simpleList.push(this);
							});

							return simpleList;
						}

						function createAjaxSettings() {

							var settings = new Object(),
								ajaxSettings = config.get("ajaxSettings") || {};

							for (set in ajaxSettings) {
								settings[set] = ajaxSettings[set];
							}

							return settings;
						}

						function checkInputPhraseMatchResponse(inputPhrase, data) {

							if (config.get("matchResponseProperty") !== false || typeof config.get("matchResponseProperty") === "string") {

								if (data[config.get("matchResponseProperty")] == inputPhrase) {
									return true;
								} else {
									return false;
								}

							} else {
								return true;
							}

						}


					}


				});
			}

			function bindKeydown() {
				$field
					.on("keydown", function(evt) {
	        		    evt = evt || window.event;
	        		    var keyCode = evt.keyCode;
	        		    if (keyCode === 38) {
	        		        suppressKeypress = true; 
	        		        return false;
	        		    }
		        	})
					.keydown(function(event) {

					if (event.keyCode === 13 && selectedElement > -1) {

						$field.val(config.get("getValue")(elementsList[selectedElement]));
						selectedElement = -1;
						hideContainer();

						event.preventDefault();
					}
				});
			}

			function bindKeypress() {
				$field
				.off("keypress");
			}

			function bindFocus() {
				$field.focus(function() {

					if ($field.val() !== "" && elementsList.length > 0) {
						
						selectedElement = -1;
						showContainer();	
					}
									
				});
			}

			function bindBlur() {
				$field.blur(function() {
					setTimeout(function() { 
						
						selectedElement = -1;
						hideContainer();
					}, 250);
				});
			}

			function removeAutocomplete() {
				$field.attr("autocomplete","off");
			}

		}

		function showContainer() {
			$container.trigger("show");
			selectElement(selectedElement);
		}

		function hideContainer() {
			$container.trigger("hide");
		}

		function selectElement(index) {
			
			$container.trigger("selectElement", index);
		}

		function loadElements(list, phrase) {
			$container.trigger("loadElements", [list, phrase]);
		}

		function loseFieldFocus() {
			$field.trigger("blur");
		}


	};

	return scope;

})(EasyAutocomplete || {});


$.fn.easyAutocomplete = function(options) {
	new EasyAutocomplete.main(this, options).init();
};

