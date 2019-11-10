/**
*
* Jquery Mapael - Dynamic maps jQuery plugin (based on raphael.js)
* Requires jQuery and raphael.js
*
* Version: 0.2.2 (07-02-2013)
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
				, $container = $(this).empty().append($tooltip)
				, mapConf = $.fn.mapael.maps[options.map.name]
				, containerWidth = $container.width()
				, paper = new Raphael(this, mapConf.width, mapConf.height)
				, areaParams = {}
				, legend = {}
				, mapElem = {}
				, bbox = {}
				, plotParams = {}
				, textElem = {}
				, coords = {}
				, resizeTO = 0;
			
			options.map.tooltip.css && $tooltip.css(options.map.tooltip.css);
			paper.setViewBox(0, 0, mapConf.width, mapConf.height, false);
			
			// Draw map areas
			for (var id in mapConf.elems) {
				areaParams = $.extend(
					true
					, {}
					, options.map.defaultArea
					, (options.areas[id] ? options.areas[id] : {})
				);
				
				if (options.legend.area && areaParams.value) {
					legend = $.fn.mapael.getLegendEl(areaParams.value, options.legend.area);
					legend && $.extend(true, areaParams, legend);
				}
				
				mapElem = paper.path(mapConf.elems[id]).attr(areaParams.attrs);
				mapElem.elemType = 'area';
				
				areaParams.tooltip && areaParams.tooltip.content && $.fn.mapael.setTooltip(mapElem, $tooltip, areaParams.tooltip.content);
				$.fn.mapael.paramHover(mapElem, areaParams.attrs, areaParams.attrsHover);
				
				// Set a text label in the area
				if (areaParams.text) {
					bbox = mapElem.getBBox();
					textElem = paper.text(
						(bbox.x + bbox.x2) / 2
						, (bbox.y + bbox.y2) / 2
						, areaParams.text
					).attr(areaParams.textAttrs);
					
					areaParams.tooltip && areaParams.tooltip.content && $.fn.mapael.setTooltip(textElem, $tooltip, areaParams.tooltip.content);
					areaParams.attrs.href && (textElem.attr({href: areaParams.attrs.href}));
					$.fn.mapael.paramHover(textElem, areaParams.textAttrs, areaParams.textAttrsHover);
					$.fn.mapael.setHover(paper, mapElem, textElem);
					$.fn.mapael.setCallbacks(areaParams, mapElem, textElem);
				} else {
					$.fn.mapael.setHover(paper, mapElem);
					$.fn.mapael.setCallbacks(areaParams, mapElem);
				}
			}
			
			// Draw plots
			for (var i = 0, length = options.plots.length; i < length; ++i) {
				plotParams = $.extend(
					true, {}
					, options.map.defaultPlot
					, (options.plots[i] ? options.plots[i] : {})
				);
				
				if (plotParams.x && plotParams.y) {
					coords = {x : plotParams.x, y : plotParams.y};
				} else {
					coords = mapConf.getCoords(plotParams.latitude, plotParams.longitude);
				}
					
				if (options.legend.plot && plotParams.value) {
					legend = $.fn.mapael.getLegendEl(plotParams.value, options.legend.plot);
					legend && $.extend(true, plotParams, legend);
				}
				
				if ("square" == plotParams.type) {
					mapElem = paper.rect(
						coords.x - (plotParams.size / 2)
						, coords.y - (plotParams.size / 2)
						, plotParams.size
						, plotParams.size
					);
				} else if ("circle" == plotParams.type) {
					mapElem = paper.circle(coords.x, coords.y, plotParams.size / 2);
				} else {
					throw "Unknown plot type '" + plotParams.type + "'";
				}
				
				mapElem.elemType = 'plot';
				mapElem.attr(plotParams.attrs);
				
				plotParams.tooltip && plotParams.tooltip.content && $.fn.mapael.setTooltip(mapElem, $tooltip, plotParams.tooltip.content);
				$.fn.mapael.paramHover(mapElem, plotParams.attrs, plotParams.attrsHover);
				
				// Set a text label next to the plot
				if (plotParams.text) {
					textElem = (mapElem.type == "circle") ?
						paper.text(coords.x + (plotParams.size / 2) + 10, coords.y, plotParams.text)
						: paper.text(coords.x + plotParams.size + 10, coords.y, plotParams.text);
					
					textElem.attr(plotParams.textAttrs);
					
					plotParams.tooltip && plotParams.tooltip.content && $.fn.mapael.setTooltip(textElem, $tooltip, plotParams.tooltip.content);
					plotParams.attrs.href && (textElem.attr({"href": plotParams.attrs.href}));
					$.fn.mapael.paramHover(textElem, plotParams.textAttrs, plotParams.textAttrsHover);
					$.fn.mapael.setHover(paper, mapElem, textElem);
					$.fn.mapael.setCallbacks(plotParams, mapElem, textElem);
				} else {
					$.fn.mapael.setHover(paper, mapElem);
					$.fn.mapael.setCallbacks(plotParams, mapElem);
				}
			}
			
			// Create the legends for areas and plots
			if (options.legend.area.slices && options.legend.area.display) {
				$.fn.mapael.createLegend($container, options, 'area');
			}
			
			if (options.legend.plot.slices && options.legend.plot.display) {
				$.fn.mapael.createLegend($container, options, 'plot');
			}
			
			if (options.map.width) {
				paper.setSize(options.map.width, mapConf.height * (options.map.width / mapConf.width));
			} else {
				// Handle resizing of the container
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
	* Set user defined callbacks on areas and plots
	* @param elemParams the element parameters
	* @param mapElem the map element to set callback on
	* @param textElem the optional text within the map element
	*/
	$.fn.mapael.setCallbacks = function(elemParams, mapElem, textElem) {
		var callbacks = [];
		if (elemParams.onclick) {
			callbacks.push({
				event : 'click'
				, callback : function() {elemParams.onclick(elemParams, mapElem, textElem)}
			});
		}
		if (elemParams.onmouseover) {
			callbacks.push({
				event : 'mouseover'
				, callback : function() {elemParams.onmouseover(elemParams, mapElem, textElem)}
			});
		}
		if (elemParams.onmouseout) {
			callbacks.push({
				event : 'mouseout'
				, callback : function() {elemParams.onmouseout(elemParams, mapElem, textElem)}
			});
		}
		
		for(var i = 0, length = callbacks.length; i < length; ++i) {
			$(mapElem.node).bind(
				callbacks[i].event
				, callbacks[i].callback
			);
			textElem && $(textElem.node).bind(
				callbacks[i].event
				, callbacks[i].callback
			);
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
	};
	
	/**
	* Join a tooltip to areas and plots
	* @param elem area or plot element
	* @param $tooltip the tooltip container
	* @param content the content to set in the tooltip
	*/
	$.fn.mapael.setTooltip = function(elem, $tooltip, content) {
		var tooltipTO = 0;
	
		$(elem.node).bind("mouseover", function() {
			tooltipTO = setTimeout(function() {$tooltip.html(content).css("display", "block");}, 120);
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
			, $legend = $('<div>').addClass(legendParams["cssClass"])
			, paper = new Raphael($legend.get(0))
			, width = 5
			, height = 5
			, marginLeft = legendParams.marginLeft
			, marginLeftTitle = legendParams.marginLeftTitle
			, marginLeftLabel = legendParams.marginLeftLabel
			, marginBottom = legendParams.marginBottom
			, title = {}
			, attrParamName = ''
			, elem = {}
			, label = {}
			, lineWidth = {};
			
		$container.append($legend);
		
		if(legendParams.title) {
			title = paper.text(marginLeftTitle, marginBottom, legendParams.title)
				.attr(legendParams.titleAttrs);
				
			width = marginLeftTitle + title.getBBox().width;
			height += marginBottom + title.getBBox().height;
		}
		
		for(var i = 0, length = legendParams.slices.length; i < length; ++i) {
			attrParamName = (legendType == 'plot') ? 'defaultPlot' : 'defaultArea';
			legendParams.slices[i].attrs = $.extend(
				{}
				, options.map[attrParamName].attrs
				, legendParams.slices[i].attrs
			);
			legendParams.slices[i].attrsHover = $.extend(
				{}
				, options.map[attrParamName].attrsHover
				, legendParams.slices[i].attrsHover
			);
			
			if (legendParams.slices[i].type == "circle") {
				elem = paper.circle(
					marginLeft + legendParams.slices[i].size / 2
					, height + legendParams.slices[i].size / 2
					, legendParams.slices[i].size / 2
				).attr(legendParams.slices[i].attrs);
			} else {
				// Draw a square for squared plots AND areas
				!legendParams.slices[i].size && (legendParams.slices[i].size = 20);
				
				elem = paper.rect(
					marginLeft
					, height
					, legendParams.slices[i].size
					, legendParams.slices[i].size
				).attr(legendParams.slices[i].attrs);
			} 
			
			elem.elemType = 'plot';
			
			label = paper.text(
				marginLeft + legendParams.slices[i].size + marginLeftLabel
				, height + legendParams.slices[i].size / 2
				, legendParams.slices[i].label
			).attr(legendParams.labelAttrs);
			
			height += marginBottom + legendParams.slices[i].size;
			lineWidth = marginLeft + legendParams.slices[i].size + marginLeftLabel + label.getBBox().width;
			width = (width < lineWidth) ? lineWidth : width;
			
			$.fn.mapael.paramHover(elem, legendParams.slices[i].attrs, legendParams.slices[i].attrsHover);
			$.fn.mapael.paramHover(label, legendParams.labelAttrs, legendParams.labelAttrs);
			$.fn.mapael.setHover(paper, elem, label);
		}
		
		// VMLWidth option allows you to set static width for the legend
		// only for VML render because text.getBBox() returns wrong values on IE6/7
		if (Raphael.type != 'SVG' && legendParams.VMLWidth) {
			width = legendParams.VMLWidth;
		}
		
		paper.setSize(width, height);
	}

	/**
	* Set he behaviour for 'mouseover' event
	* @param paper paper Raphael paper object
	* @param mapElem mapElem the map element
	* @param textElem the optional text element (within the map element)
	*/
	$.fn.mapael.hoverIn = function (paper, mapElem, textElem) {
		if (mapElem) {
			mapElem.animate(
				mapElem.attrsHover
				, mapElem.attrsHover.animDuration
			);
		}
		
		if (textElem) {
			textElem.animate(
				textElem.attrsHover
				, textElem.attrsHover.animDuration
			);
		}
		paper.safari();
	}
	
	/**
	* Set he behaviour for 'mouseout' event
	* @param paper Raphael paper object
	* @param mapElem the map element
	* @param textElem the optional text element (within the map element)
	*/
	$.fn.mapael.hoverOut = function (paper, mapElem, textElem) {
		textElem && textElem.animate(
			textElem.originalAttrs
			, textElem.attrsHover.animDuration
		);
		mapElem && mapElem.animate(
			mapElem.originalAttrs, 
			mapElem.attrsHover.animDuration
		);
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
			, hoverTO = 0;
		if (mapElem) {
			$mapElem = $(mapElem.node);
			$mapElem.bind("mouseover",
				function() {
					hoverTO = setTimeout(function () {$.fn.mapael.hoverIn(paper, mapElem, textElem);}, 120);
				}
			);
			$mapElem.bind("mouseout",
				function () {clearTimeout(hoverTO);$.fn.mapael.hoverOut(paper, mapElem, textElem);}
			);
		}
		
		if (textElem) {
			$textElem = $(textElem.node);
			$textElem.bind("mouseover",
				function () {$.fn.mapael.hoverIn(paper, mapElem, textElem);}
			);
			$textElem && $(textElem.node).bind("mouseout",
				function () {$.fn.mapael.hoverOut(paper, mapElem, textElem);}
			);
		}
	};
	
	/**
	* Set the attributes on hover and the attributes to restore for a map element
	* @param elem the map element
	* @param originalAttrs the original attributes to restore on mouseout event
	* @param attrsHover the attributes to set on mouseover event
	*/
	$.fn.mapael.paramHover = function (elem, originalAttrs, attrsHover) {
		// Don't use transform option on hover for VML (IE<9) because of several bugs
		if (Raphael.type != 'SVG') {
			delete attrsHover.transform;
		}
	
		elem.attrsHover = {};
		$.extend(elem.attrsHover, attrsHover);
		
		if (elem.attrsHover.transform) {
			elem.originalAttrs = {transform : "s1"};
		} else {
			elem.originalAttrs = {};
		}
		$.extend(elem.originalAttrs, originalAttrs);
	};
	
	// Default map options
	$.fn.mapael.defaultOptions = {
		map: {
			tooltip: {
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
				, textAttrs: {
					"font-size": 15
					, fill:"#c7c7c7"
					, "text-anchor": "center"
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
				, textAttrs: {
					"font-size": 15
					, fill:"#c7c7c7"
					, "text-anchor": "start"
				},
				textAttrsHover: {
					fill:"#eaeaea"
					, animDuration : 300
				}
			}
		}
		, legend: {
			area: {
				cssClass: "mapLegend"
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
			},
			plot: {
				cssClass: "mapLegend"
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