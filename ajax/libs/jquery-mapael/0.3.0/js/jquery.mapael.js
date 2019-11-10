/**
*
* Jquery Mapael - Dynamic maps jQuery plugin (based on raphael.js)
* Requires jQuery and raphael.js
*
* Version: 0.3.0 (15-07-2013)
*
* Copyright (c) 2013 Vincent Brouté (http://www.neveldo.fr/mapael)
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
*
*/
(function($) {

	"use strict";
	
	$.fn.mapael = function(options) {
		options = $.extend(true, {}, $.fn.mapael.defaultOptions, options);
		
		return this.each(function() {
		
			var $tooltip = $("<div>").addClass(options.map.tooltip.cssClass).css("display", "none")
				, $container = $('.' + options.map.cssClass, this).empty().append($tooltip)
				, mapConf = $.fn.mapael.maps[options.map.name]
				, paper = new Raphael($container[0], mapConf.width, mapConf.height)
				, elemParams = {}
				, coords = {}
				, resizeTO = 0
				, areas = {}
				, plots = {}
				, id = 0;
			
			options.map.tooltip.css && $tooltip.css(options.map.tooltip.css);
			paper.setViewBox(0, 0, mapConf.width, mapConf.height, false);
			
			// Draw map areas
			for (id in mapConf.elems) {
				elemParams = $.fn.mapael.getElemParams(
					options.map.defaultArea
					, (options.areas[id] ? options.areas[id] : {})
					, options.legend.area
				);
				areas[id] = {'mapElem' : paper.path(mapConf.elems[id]).attr(elemParams.attrs)};
				$.fn.mapael.initElem(paper, areas[id], elemParams, $tooltip);
			}
			
			// Draw plots
			for (id in options.plots) {
				elemParams = $.fn.mapael.getElemParams(
					options.map.defaultPlot
					, (options.plots[id] ? options.plots[id] : {})
					, options.legend.plot
				);
				
				if (elemParams.x && elemParams.y) 
					coords = {x : elemParams.x, y : elemParams.y};
				else
					coords = mapConf.getCoords(elemParams.latitude, elemParams.longitude);
				
				if ("square" == elemParams.type) {
					plots[id] = {'mapElem' : paper.rect(
						coords.x - (elemParams.size / 2)
						, coords.y - (elemParams.size / 2)
						, elemParams.size
						, elemParams.size
					).attr(elemParams.attrs)};
				} else { // Default = circle
					plots[id] = {'mapElem' : paper.circle(coords.x, coords.y, elemParams.size / 2).attr(elemParams.attrs)};
				}
				
				$.fn.mapael.initElem(paper, plots[id], elemParams, $tooltip);
			}
			
			/**
			* 
			* Update the current map
			* Refresh attributes and tooltips for areas and plots
			* @params options options to refresh
			* @params reset true to reset previous areas and plots individual options
			*/
			$(this).bind('update', function(e, updateOptions, resetAreas, resetPlots, animDuration, easing) {
				var elemParams = {}
					, legend = {}
					, id = 0
					, bbox = {}
					, textPosition = {}
					, plotOffset = 0;
				
				if (!animDuration) animDuration = 300;
				if (!easing) easing = 'linear';
				if (resetAreas) options.areas = {};
				if (resetPlots) options.plots = {};
				
				$.extend(true, options, updateOptions);
				
				// Update areas attributes and tooltips
				for (id in areas) {
					elemParams = $.fn.mapael.getElemParams(
						options.map.defaultArea
						, (options.areas[id] ? options.areas[id] : {})
						, options.legend.area
					);
					
					$.fn.mapael.paramHover(areas[id].mapElem, elemParams.attrs, areas[id].mapElem.attrsHover);
					areas[id].mapElem.animate(elemParams.attrs, animDuration, easing);
					
					if (elemParams.tooltip && elemParams.tooltip.content) {
						areas[id].mapElem.tooltipContent = elemParams.tooltip.content;
						if (areas[id].textElem) {
							areas[id].textElem.tooltipContent = elemParams.tooltip.content;
						}
					}
				}
				
				// Update plots attributes and tooltips
				for (id in plots) {
					elemParams = $.fn.mapael.getElemParams(
						options.map.defaultPlot
						, (options.plots[id] ? options.plots[id] : {})
						, options.legend.plot
					);
					
					// Update text position
					if (plots[id].textElem) {
						bbox = plots[id].mapElem.getBBox();
						plotOffset = (elemParams.size - bbox.height) / 2;
						bbox.x -= plotOffset;
						bbox.x2 += plotOffset;
						bbox.y -= plotOffset;
						bbox.y2 += plotOffset;
						textPosition = $.fn.mapael.getTextPosition(bbox, elemParams.textPosition);
						plots[id].textElem.animate({x : textPosition.x, y : textPosition.y}, animDuration, easing);
					}
					
					// Update plot size
					if ("square" == elemParams.type) {
						elemParams.attrs.width = elemParams.size;
						elemParams.attrs.height = elemParams.size;
					} else { // Default : circle
						elemParams.attrs.r = elemParams.size / 2;
					}
					
					$.fn.mapael.paramHover(plots[id].mapElem, elemParams.attrs, plots[id].mapElem.attrsHover);
					plots[id].mapElem.animate(elemParams.attrs, animDuration, easing);
					
					if (elemParams.tooltip && elemParams.tooltip.content) {
						plots[id].mapElem.tooltipContent = elemParams.tooltip.content;
						if (plots[id].textElem) {
							plots[id].textElem.tooltipContent = elemParams.tooltip.content;
						}
					}
				}
			});
			
			// Create the legends for areas and plots
			if (options.legend.area.slices && options.legend.area.display)
				$.fn.mapael.createLegend($(this), options, 'area');
			
			if (options.legend.plot.slices && options.legend.plot.display)
				$.fn.mapael.createLegend($(this), options, 'plot');
			
			// Handle size of the map
			if (options.map.width) {
				paper.setSize(options.map.width, mapConf.height * (options.map.width / mapConf.width));
			} else {
				$(window).bind('resize', function(){
					clearTimeout(resizeTO);
					resizeTO = setTimeout(function(){$container.trigger('resizeEnd');}, 150);
				});
				$(document).bind('ready', function(){$container.trigger('resizeEnd');});
				$container.bind('resizeEnd', function(e) {
					var containerWidth = $container.width();
					if (paper.width != containerWidth) {
						paper.setSize(containerWidth, mapConf.height * (containerWidth / mapConf.width));
					}
				});
				$container.trigger('resizeEnd');
			}
			
			$(paper.desc).append(" and Mapael (http://neveldo.fr/mapael)");
		});
	};
	
	/**
	* Get element parameters by merging default params, element params and legend params
	*/
	$.fn.mapael.getElemParams = function(defaultParams, elemParams, legendOptions) {
		var elemParams = $.extend(true, {}, defaultParams, elemParams);
		if (elemParams.value) {
			$.extend(true, elemParams, $.fn.mapael.getLegendEl(elemParams.value, legendOptions));
			}
		return elemParams;
	}
	
	/**
	* Init the element of the map (draw it, set attributes, events, tooltip, ...)
	*/
	$.fn.mapael.initElem = function(paper, elem, params, $tooltip) {
		var bbox = {}, textPosition = {};
		$.fn.mapael.paramHover(elem.mapElem, params.attrs, params.attrsHover);
		
		// Set a text label in the area
		if (params.text) {
			bbox = elem.mapElem.getBBox();
			textPosition = $.fn.mapael.getTextPosition(bbox, params.textPosition);
			params.textAttrs['text-anchor'] = textPosition.textAnchor;
			elem.textElem = paper.text(textPosition.x, textPosition.y, params.text).attr(params.textAttrs);
			
			params.attrs.href && (elem.textElem.attr({href: params.attrs.href}));
			$.fn.mapael.paramHover(elem.textElem, params.textAttrs, params.textAttrsHover);
			$.fn.mapael.setHover(paper, elem.mapElem, elem.textElem);
			$.fn.mapael.setCallbacks(params, elem.mapElem, elem.textElem);
		} else {
			$.fn.mapael.setHover(paper, elem.mapElem);
			$.fn.mapael.setCallbacks(params, elem.mapElem);
		}
		
		if (params.tooltip && params.tooltip.content) {
			elem.mapElem.tooltipContent = params.tooltip.content;
			$.fn.mapael.setTooltip(elem.mapElem, $tooltip);
			
			if (params.text) {
				elem.textElem.tooltipContent = params.tooltip.content;
				$.fn.mapael.setTooltip(elem.textElem, $tooltip);
			}
		}
	}
	
	/**
	* Get the text position (x, y and text-anchor)
	* @param bbox the boundary box of the element
	* @param textPosition the wanted text position (inner, right, left, top or bottom)
	*/
	$.fn.mapael.getTextPosition = function(bbox, textPosition) {
		var textX = 0
			, textY = 0
			, textAnchor = '';
			
		switch (textPosition) {
			case 'bottom' :
				textX = (bbox.x + bbox.x2) / 2;
				textY = bbox.y2 + 15;
				textAnchor = "middle";
				break;
			case 'top' :
				textX = (bbox.x + bbox.x2) / 2;
				textY = bbox.y - 15;
				textAnchor = "middle";
				break;
			case 'left' :
				textX = bbox.x - 10;
				textY = (bbox.y + bbox.y2) / 2;
				textAnchor = "end";
				break;
			case 'right' :
				textX = bbox.x2 + 10;
				textY = (bbox.y + bbox.y2) / 2;
				textAnchor = "start";
				break;
			default : // 'inner' position
				textX = (bbox.x + bbox.x2) / 2;
				textY = (bbox.y + bbox.y2) / 2;
				textAnchor = "middle";
		}
		return {'x' : textX, 'y' : textY, 'textAnchor' : textAnchor};
	}
	
	/**
	* Set user defined callbacks on areas and plots
	* @param elemParams the element parameters
	* @param mapElem the map element to set callback on
	* @param textElem the optional text within the map element
	*/
	$.fn.mapael.setCallbacks = function(elemParams, mapElem, textElem) {
		var availableCallbacks = ['click', 'mouseover', 'mouseout']
			, callbackFct = {};
			
		for(var i = 0, length = availableCallbacks.length; i < length; ++i) {
			if (elemParams["on" + availableCallbacks[i]]) {
				callbackFct = elemParams["on" + availableCallbacks[i]];
				$(mapElem.node).bind(availableCallbacks[i], function() {callbackFct(elemParams, mapElem, textElem)});
				textElem && $(textElem.node).bind(availableCallbacks[i], function() {callbackFct(elemParams, mapElem, textElem)});
			}
		}
	}
	
	/**
	* Get the legend conf matching with the value
	* @param value the value to match with a slice in the legend
	* @param legend the legend params object
	* @return the legend slice matching with the value
	*/
	$.fn.mapael.getLegendEl = function (value, legend) {
		for(var i = 0, length = legend.slices.length; i < length; ++i) {
			if ((!legend.slices[i].min || value >= legend.slices[i].min) 
				&& (!legend.slices[i].max || value < legend.slices[i].max)
			) {
				return legend.slices[i];
			}
		}
		return {};
	};
	
	/**
	* Join a tooltip to areas and plots
	* @param elem area or plot element
	* @param $tooltip the tooltip container
	* @param content the content to set in the tooltip
	*/
	$.fn.mapael.setTooltip = function(elem, $tooltip) {
		var tooltipTO = 0;
	
		$(elem.node).bind("mouseover", function() {
			tooltipTO = setTimeout(function() {$tooltip.html(elem.tooltipContent).css("display", "block");}, 120);
		}).bind("mouseout", function() {
			clearTimeout(tooltipTO);
			$tooltip.css("display", "none");
		}).bind("mousemove", function(e) {
			$tooltip.css("left", e.pageX + 15).css("top", e.pageY + 15 - $(window).scrollTop());
		});
	};
	
	/**
	* Draw a legend for areas and / or plots
	* @param $container the legend container
	* @param options map options
	* @param legendType the type of the legend : 'area' or 'plot'
	*/
	$.fn.mapael.createLegend = function ($container, options, legendType) {
		var legendParams = options.legend[legendType]
			, $legend = (legendType == 'plot') ? $('.' + options.legend.plot.cssClass, $container).empty() : $('.' + options.legend.area.cssClass, $container).empty()
			, paper = new Raphael($legend.get(0))
			, width = 5
			, height = 5
			, title = {}
			, defaultElemParams = {}
			, elem = {}
			, label = {};
		
		if(legendParams.title) {
			title = paper.text(legendParams.marginLeftTitle, legendParams.marginBottom, legendParams.title)
				.attr(legendParams.titleAttrs);
				
			width = legendParams.marginLeftTitle + title.getBBox().width;
			height += legendParams.marginBottom + title.getBBox().height;
		}
		
		for(var i = 0, length = legendParams.slices.length; i < length; ++i) {
			defaultElemParams = (legendType == 'plot') ? options.map['defaultPlot'] : options.map['defaultArea'];
			legendParams.slices[i].attrs = $.extend(
				{}
				, defaultElemParams.attrs
				, legendParams.slices[i].attrs
			);
			legendParams.slices[i].attrsHover = $.extend(
				{}
				, defaultElemParams.attrsHover
				, legendParams.slices[i].attrsHover
			);
			
			if(legendType == 'area' || legendParams.slices[i].type == "square") {
				// Draw a square for squared plots AND areas
				!legendParams.slices[i].size && (legendParams.slices[i].size = 20);
				
				elem = paper.rect(
					legendParams.marginLeft
					, height
					, legendParams.slices[i].size
					, legendParams.slices[i].size
				).attr(legendParams.slices[i].attrs);
			} else {
				elem = paper.circle(
					legendParams.marginLeft + legendParams.slices[i].size / 2
					, height + legendParams.slices[i].size / 2
					, legendParams.slices[i].size / 2
				).attr(legendParams.slices[i].attrs);
			} 
			
			label = paper.text(
				legendParams.marginLeft + legendParams.slices[i].size + legendParams.marginLeftLabel
				, height + legendParams.slices[i].size / 2
				, legendParams.slices[i].label
			).attr(legendParams.labelAttrs);
			
			height += legendParams.marginBottom + legendParams.slices[i].size;
			width = Math.max(width, legendParams.marginLeft + legendParams.slices[i].size + legendParams.marginLeftLabel + label.getBBox().width);
			
			$.fn.mapael.paramHover(elem, legendParams.slices[i].attrs, legendParams.slices[i].attrsHover);
			$.fn.mapael.paramHover(label, legendParams.labelAttrs, legendParams.labelAttrs);
			$.fn.mapael.setHover(paper, elem, label);
		}
		
		// VMLWidth option allows you to set static width for the legend
		// only for VML render because text.getBBox() returns wrong values on IE6/7
		if (Raphael.type != 'SVG' && legendParams.VMLWidth) 
			width = legendParams.VMLWidth;
		
		paper.setSize(width, height);
	}

	/**
	* Set he behaviour for 'mouseover' event
	* @param paper paper Raphael paper object
	* @param mapElem mapElem the map element
	* @param textElem the optional text element (within the map element)
	*/
	$.fn.mapael.hoverIn = function (paper, mapElem, textElem) {
		mapElem.animate(mapElem.attrsHover, mapElem.attrsHover.animDuration);
		textElem && textElem.animate(textElem.attrsHover, textElem.attrsHover.animDuration);
		paper.safari();
	}
	
	/**
	* Set he behaviour for 'mouseout' event
	* @param paper Raphael paper object
	* @param mapElem the map element
	* @param textElem the optional text element (within the map element)
	*/
	$.fn.mapael.hoverOut = function (paper, mapElem, textElem) {
		mapElem.animate(mapElem.originalAttrs, mapElem.attrsHover.animDuration);
		textElem && textElem.animate(textElem.originalAttrs, textElem.attrsHover.animDuration);
		paper.safari();
	};
	
	/**
	* Set the hover behavior (mouseover & mouseout) for plots and areas
	* @param paper Raphael paper object
	* @param mapElem the map element
	* @param textElem the optional text element (within the map element)
	*/
	$.fn.mapael.setHover = function (paper, mapElem, textElem) {
		var $mapElem = {}
			, $textElem = {}
			, hoverTO = 0
			, overBehaviour = function() {hoverTO = setTimeout(function () {$.fn.mapael.hoverIn(paper, mapElem, textElem);}, 120);}
			, outBehaviour = function () {clearTimeout(hoverTO);$.fn.mapael.hoverOut(paper, mapElem, textElem);};
			
		$mapElem = $(mapElem.node);
		$mapElem.bind("mouseover", overBehaviour);
		$mapElem.bind("mouseout", outBehaviour);
		
		if (textElem) {
			$textElem = $(textElem.node);
			$textElem.bind("mouseover", overBehaviour);
			$(textElem.node).bind("mouseout", outBehaviour);
		}
	};
	
	/**
	* Set the attributes on hover and the attributes to restore for a map element
	* @param elem the map element
	* @param originalAttrs the original attributes to restore on mouseout event
	* @param attrsHover the attributes to set on mouseover event
	*/
	$.fn.mapael.paramHover = function (elem, originalAttrs, attrsHover) {
		// Disable transform option on hover for VML (IE<9) because of several bugs
		if (Raphael.type != 'SVG') delete attrsHover.transform;
		elem.attrsHover = attrsHover;
		
		if (elem.attrsHover.transform) elem.originalAttrs = $.extend({transform : "s1"}, originalAttrs);
		else elem.originalAttrs = originalAttrs;
	};
	
	// Default map options
	$.fn.mapael.defaultOptions = {
		map: {
			cssClass: "map"
			, tooltip: {
				cssClass: "mapTooltip"
			}
			, defaultArea: {
				attrs: {
					fill: "#343434"
					, stroke: "#5d5d5d"
					, "stroke-width": 1
					, "stroke-linejoin": "round"
				}
				, attrsHover: {
					fill: "#f38a03"
					, animDuration : 300
				}
				, textPosition: 'inner'
				, textAttrs: {
					"font-size": 15
					, fill:"#c7c7c7"
				}
				, textAttrsHover: {
					fill:"#eaeaea"
					, "animDuration" : 300
				}
			}
			, defaultPlot: {
				type: "circle"
				, size: 15
				, attrs: {
					fill: "#0088db" 
					, stroke: "#fff"
					, "stroke-width": 0
					, "stroke-linejoin": "round"
				}
				, attrsHover: {
					"stroke-width": 3
					, animDuration : 300
				}
				, textPosition: 'right'
				, textAttrs: {
					"font-size": 15
					, fill:"#c7c7c7"
				},
				textAttrsHover: {
					fill:"#eaeaea"
					, animDuration : 300
				}
			}
		}
		, legend: {
			area: {
				cssClass: "areaLegend"
				, display: false
				, marginLeft: 15
				, marginLeftTitle: 5
				, marginLeftLabel: 10
				, marginBottom: 15
				, titleAttrs: {
					"font-size" : 18
					, fill : "#343434"
					, "text-anchor" : "start"
				}
				, labelAttrs: {
					"font-size" : 15
					, fill : "#343434"
					, "text-anchor" : "start"
				}
				, slices : []
			}
			, plot: {
				cssClass: "plotLegend"
				, display: false
				, marginLeft: 15
				, marginLeftTitle: 5
				, marginLeftLabel: 10
				, marginBottom: 15
				, titleAttrs: {
					"font-size" : 18
					, fill : "#343434"
					, "text-anchor" : "start"
				}
				, labelAttrs: {
					"font-size" : 15
					, fill : "#343434"
					, "text-anchor" : "start"
				}
				, slices : []
			}
		}
		, areas: {}
		, plots: {}
	};
})(jQuery);