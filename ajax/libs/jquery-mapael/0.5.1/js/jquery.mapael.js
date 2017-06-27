/**
*
* Jquery Mapael - Dynamic maps jQuery plugin (based on raphael.js)
* Requires jQuery and raphael.js
*
* Version: 0.5.1 (24-08-2013)
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
				, elemOptions = {}
				, coords = {}
				, resizeTO = 0
				, areas = {}
				, plots = {}
				, areaLegend = {}
				, plotLegend = {}
				, id = 0;
			
			options.map.tooltip.css && $tooltip.css(options.map.tooltip.css);
			paper.setViewBox(0, 0, mapConf.width, mapConf.height, false);
			
			// Draw map areas
			for (id in mapConf.elems) {
				elemOptions = $.fn.mapael.getElemOptions(
					options.map.defaultArea
					, (options.areas[id] ? options.areas[id] : {})
					, options.legend.area
				);
				areas[id] = {'mapElem' : paper.path(mapConf.elems[id]).attr(elemOptions.attrs)};
				$.fn.mapael.initElem(paper, areas[id], elemOptions, $tooltip);
			}
			
			// Draw plots
			for (id in options.plots) {
				elemOptions = $.fn.mapael.getElemOptions(
					options.map.defaultPlot
					, (options.plots[id] ? options.plots[id] : {})
					, options.legend.plot
				);
				
				if (elemOptions.x && elemOptions.y) 
					coords = {x : elemOptions.x, y : elemOptions.y};
				else
					coords = mapConf.getCoords(elemOptions.latitude, elemOptions.longitude);
				
				if ("square" == elemOptions.type) {
					plots[id] = {'mapElem' : paper.rect(
						coords.x - (elemOptions.size / 2)
						, coords.y - (elemOptions.size / 2)
						, elemOptions.size
						, elemOptions.size
					).attr(elemOptions.attrs)};
				} else { // Default = circle
					plots[id] = {'mapElem' : paper.circle(coords.x, coords.y, elemOptions.size / 2).attr(elemOptions.attrs)};
				}
				
				$.fn.mapael.initElem(paper, plots[id], elemOptions, $tooltip);
			}
			
			// Create the legends for areas and plots
			if (options.legend.area.slices && options.legend.area.display)
				areaLegend = $.fn.mapael.createLegend($(this), options, 'area', areas);
			
			if (options.legend.plot.slices && options.legend.plot.display)
				plotLegend = $.fn.mapael.createLegend($(this), options, 'plot', plots);
			
			// Enable zoom
			if (options.map.zoom.enabled)
				$.fn.mapael.initZoom($container, paper, mapConf.width, mapConf.height, options.map.zoom);
				
			/**
			* 
			* Update the current map
			* Refresh attributes and tooltips for areas and plots
			* @param options options to refresh
			* @param resetAreas true to reset previous areas options
			* @param resetPlots true to reset previous plots options
			* @param animDuration animation duration in ms
			* @param easing easing type
			*/
			$(this).on('update', function(e, updateOptions, resetAreas, resetPlots, animDuration, easing) {
				var elemOptions = {}
					, legend = {}
					, id = 0
					, bbox = {}
					, textPosition = {}
					, plotOffset = 0
					, resetHiddenElem = function(el) {
						if(typeof el.hidden != "undefined" && el.hidden == true) {
							$(el.node).trigger('click');
						}
					};
				
				if (!animDuration) animDuration = 300;
				if (!easing) easing = 'linear';
				if (resetAreas) options.areas = {};
				if (resetPlots) options.plots = {};
				
				$.extend(true, options, updateOptions);
				
				areaLegend.forEach && areaLegend.forEach(resetHiddenElem);
				plotLegend.forEach && plotLegend.forEach(resetHiddenElem);
				
				// Update areas attributes and tooltips
				for (id in areas) {
					elemOptions = $.fn.mapael.getElemOptions(
						options.map.defaultArea
						, (options.areas[id] ? options.areas[id] : {})
						, options.legend.area
					);
					
					if (typeof elemOptions.value != "undefined")
						areas[id].value = elemOptions.value;
					
					$.fn.mapael.setHoverOptions(areas[id].mapElem, elemOptions.attrs, areas[id].mapElem.attrsHover);
					areas[id].mapElem.animate(elemOptions.attrs, animDuration, easing);
					
					if (elemOptions.tooltip && elemOptions.tooltip.content) {
						areas[id].mapElem.tooltipContent = elemOptions.tooltip.content;
						if (areas[id].textElem) {
							areas[id].textElem.tooltipContent = elemOptions.tooltip.content;
						}
					}
				}
				
				// Update plots attributes and tooltips
				for (id in plots) {
					elemOptions = $.fn.mapael.getElemOptions(
						options.map.defaultPlot
						, (options.plots[id] ? options.plots[id] : {})
						, options.legend.plot
					);
					
					if (typeof elemOptions.value != "undefined")
						plots[id].value = elemOptions.value;
					
					// Update text position
					if (plots[id].textElem) {
						bbox = plots[id].mapElem.getBBox();
						plotOffset = (elemOptions.size - bbox.height) / 2;
						bbox.x -= plotOffset;
						bbox.x2 += plotOffset;
						bbox.y -= plotOffset;
						bbox.y2 += plotOffset;
						textPosition = $.fn.mapael.getTextPosition(bbox, elemOptions.textPosition);
						plots[id].textElem.animate({x : textPosition.x, y : textPosition.y}, animDuration, easing);
					}
					
					// Update plot size
					if ("square" == elemOptions.type) {
						elemOptions.attrs.width = elemOptions.size;
						elemOptions.attrs.height = elemOptions.size;
					} else { // Default : circle
						elemOptions.attrs.r = elemOptions.size / 2;
					}
					
					$.fn.mapael.setHoverOptions(plots[id].mapElem, elemOptions.attrs, plots[id].mapElem.attrsHover);
					plots[id].mapElem.animate(elemOptions.attrs, animDuration, easing);
					
					if (elemOptions.tooltip && elemOptions.tooltip.content) {
						plots[id].mapElem.tooltipContent = elemOptions.tooltip.content;
						if (plots[id].textElem) {
							plots[id].textElem.tooltipContent = elemOptions.tooltip.content;
						}
					}
				}
			});
			
			// Handle resizing of the map
			if (options.map.width) {
				paper.setSize(options.map.width, mapConf.height * (options.map.width / mapConf.width));
			} else {
				$(window).on('resize', function(){
					clearTimeout(resizeTO);
					resizeTO = setTimeout(function(){$container.trigger('resizeEnd');}, 150);
				});
				$(document).on('ready', function(){$container.trigger('resizeEnd');});
				$container.on('resizeEnd', function(e) {
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
	* Init the element of the map (drawing, setting attributes, events, tooltip, ...)
	* @param paper
	* @param elem
	* @param params
	* @param $tooltip
	*/
	$.fn.mapael.initElem = function(paper, elem, options, $tooltip) {
		var bbox = {}, textPosition = {};
		$.fn.mapael.setHoverOptions(elem.mapElem, options.attrs, options.attrsHover);
		options.href && $.fn.mapael.setHref(elem.mapElem, options.href);
		
		if (options.text) {
			// Set a text label in the area
			bbox = elem.mapElem.getBBox();
			textPosition = $.fn.mapael.getTextPosition(bbox, options.textPosition);
			options.textAttrs['text-anchor'] = textPosition.textAnchor;
			elem.textElem = paper.text(textPosition.x, textPosition.y, options.text).attr(options.textAttrs);
			options.href && $.fn.mapael.setHref(elem.textElem, options.href);
			$.fn.mapael.setHoverOptions(elem.textElem, options.textAttrs, options.textAttrsHover);
			$.fn.mapael.setHover(paper, elem.mapElem, elem.textElem);
			$.fn.mapael.setCallbacks(options, elem.mapElem, elem.textElem);
		} else {
			$.fn.mapael.setHover(paper, elem.mapElem);
			$.fn.mapael.setCallbacks(options, elem.mapElem);
		}
		
		if (options.tooltip && options.tooltip.content) {
			elem.mapElem.tooltipContent = options.tooltip.content;
			$.fn.mapael.setTooltip(elem.mapElem, $tooltip);
			
			if (options.text) {
				elem.textElem.tooltipContent = options.tooltip.content;
				$.fn.mapael.setTooltip(elem.textElem, $tooltip);
			}
		}
		
		if (typeof options.value != "undefined")
			elem.value = options.value;
	}
	
	/**
	*
	*/
	$.fn.mapael.setHref = function(elem, href) {
		elem.attr({cursor : 'pointer'});
		$(elem.node).bind('click', function() {
			if (!$.fn.mapael.panning)
				window.location = href;
		});
	}
	
	/**
	* Set a tooltip for the areas and plots
	* @param elem area or plot element
	* @param $tooltip the tooltip container
	* @param content the content to set in the tooltip
	*/
	$.fn.mapael.setTooltip = function(elem, $tooltip) {
		var tooltipTO = 0;
	
		$(elem.node).on("mouseover", function() {
			tooltipTO = setTimeout(function() {$tooltip.html(elem.tooltipContent).css("display", "block");}, 120);
		}).on("mouseout", function() {
			clearTimeout(tooltipTO);
			$tooltip.css("display", "none");
		}).on("mousemove", function(e) {
			$tooltip.css("left", e.pageX + 15).css("top", e.pageY + 15 - $(window).scrollTop());
		});
	};
	
	/**
	* Set user defined callbacks on areas and plots
	* @param elemOptions the element parameters
	* @param mapElem the map element to set callback on
	* @param textElem the optional text within the map element
	*/
	$.fn.mapael.setCallbacks = function(elemOptions, mapElem, textElem) {
		var availableCallbacks = ['click', 'mouseover', 'mouseout']
			, callbackFct = {};
			
		for(var i = 0, length = availableCallbacks.length; i < length; ++i) {
			if (elemOptions["on" + availableCallbacks[i]]) {
				callbackFct = elemOptions["on" + availableCallbacks[i]];
				$(mapElem.node).on(availableCallbacks[i], function() {!$.fn.mapael.panning && callbackFct(elemOptions, mapElem, textElem)});
				textElem && $(textElem.node).on(availableCallbacks[i], function() {!$.fn.mapael.panning && callbackFct(elemOptions, mapElem, textElem)});
			}
		}
	}
	
	$.fn.mapael.panning = false;
	
	/**
	* Init zoom and panning for the map
	* @param $container
	* @param paper
	* @param mapWidth
	* @param mapHeight
	* @param options
	*/
	$.fn.mapael.initZoom = function($container, paper, mapWidth, mapHeight, options) {
		var $zoomIn = $("<div>").addClass(options.zoomInCssClass).html("+")
			, $zoomOut = $("<div>").addClass(options.zoomOutCssClass).html("&#x2212;")
			, currentLevel = 0
			, vbCenterX = mapWidth / 2
			, vbCenterY = mapHeight / 2
			, mousedown  = false
			, previousX = 0
			, previousY = 0
			, setZoom = function(e) {
				// Update zoom level
				currentLevel = Math.min(Math.max(currentLevel + e.data.offset, 0), options.maxLevel);
				if (currentLevel == 0) {
					vbCenterX = mapWidth / 2
					vbCenterY = mapHeight / 2
					paper.setViewBox(0, 0, mapWidth, mapHeight);
				} else {
					paper.setViewBox(
						Math.min(Math.max(0, vbCenterX - (mapWidth / (1 + currentLevel * options.step))/2), (mapWidth - (mapWidth / (1 + currentLevel * options.step)))), 
						Math.min(Math.max(0, vbCenterY - (mapHeight / (1 + currentLevel * options.step))/2), (mapHeight - (mapHeight / (1 + currentLevel * options.step)))), 
						mapWidth / (1 +currentLevel * options.step), 
						mapHeight / (1 +currentLevel * options.step)
					);
				}
			};
			
		$container.append($zoomIn).append($zoomOut);
		
		$zoomIn.on("click", null, {offset : 1} , setZoom);
		$zoomOut.on("click", null, {offset : -1}, setZoom);
		
		// Panning
		$('body').on("mouseup", function(e) {
			mousedown  = false;
			setTimeout(function () {$.fn.mapael.panning = false;}, 50);
		});
		
		$container.on("mousedown", function(e) {
			mousedown  = true;
			previousX = e.pageX;
			previousY = e.pageY;
			return false;
		}).on("mousemove", function(e) {
			if (mousedown  && currentLevel != 0) {
				var offsetX = (previousX - e.pageX) / (1 + (currentLevel * options.step)) * (mapWidth / paper.width)
					, offsetY = (previousY - e.pageY) / (1 + (currentLevel * options.step)) * (mapHeight / paper.height);					
				
				if (Math.abs(offsetX) > 5 || Math.abs(offsetY) > 5) {
					var viewBoxX = Math.min(Math.max(0, paper._viewBox[0] + offsetX), (mapWidth - paper._viewBox[2]))
						, viewBoxY = Math.min(Math.max(0, paper._viewBox[1] + offsetY), (mapHeight - paper._viewBox[3]));
					
					vbCenterX = viewBoxX + paper._viewBox[2] / 2;
					vbCenterY = viewBoxY + paper._viewBox[3] / 2;
					
					paper.setViewBox(viewBoxX, viewBoxY, paper._viewBox[2], paper._viewBox[3]);
					
					previousX = e.pageX;
					previousY = e.pageY;
					$.fn.mapael.panning = true;
				}
			}
			return false;
		});
	}
	
	/**
	* Draw a legend for areas and / or plots
	* @param $container the legend container
	* @param options map options
	* @param legendType the type of the legend : 'area' or 'plot'
	*/
	$.fn.mapael.createLegend = function ($container, options, legendType, elems) {
		var legendOptions = options.legend[legendType]
			, $legend = (legendType == 'plot') ? $('.' + options.legend.plot.cssClass, $container).empty() : $('.' + options.legend.area.cssClass, $container).empty()
			, paper = new Raphael($legend.get(0))
			, width = 5
			, height = 5
			, title = {}
			, defaultElemOptions = {}
			, elem = {}
			, label = {};
		
		if(legendOptions.title) {
			title = paper.text(legendOptions.marginLeftTitle, legendOptions.marginBottom, legendOptions.title)
				.attr(legendOptions.titleAttrs);
				
			width = legendOptions.marginLeftTitle + title.getBBox().width;
			height += legendOptions.marginBottom + title.getBBox().height;
		}
		
		for(var i = 0, length = legendOptions.slices.length; i < length; ++i) {
			defaultElemOptions = (legendType == 'plot') ? options.map['defaultPlot'] : options.map['defaultArea'];
			legendOptions.slices[i].attrs = $.extend(
				{}
				, defaultElemOptions.attrs
				, legendOptions.slices[i].attrs
			);
			legendOptions.slices[i].attrsHover = $.extend(
				{}
				, defaultElemOptions.attrsHover
				, legendOptions.slices[i].attrsHover
			);
			
			if(legendType == 'area' || legendOptions.slices[i].type == "square") {
				// Draw a square for squared plots AND areas
				!legendOptions.slices[i].size && (legendOptions.slices[i].size = 20);
				
				elem = paper.rect(
					legendOptions.marginLeft
					, height
					, legendOptions.slices[i].size
					, legendOptions.slices[i].size
				).attr(legendOptions.slices[i].attrs);
			} else {
				elem = paper.circle(
					legendOptions.marginLeft + legendOptions.slices[i].size / 2
					, height + legendOptions.slices[i].size / 2
					, legendOptions.slices[i].size / 2
				).attr(legendOptions.slices[i].attrs);
			} 
			
			label = paper.text(
				legendOptions.marginLeft + legendOptions.slices[i].size + legendOptions.marginLeftLabel
				, height + legendOptions.slices[i].size / 2
				, legendOptions.slices[i].label
			).attr(legendOptions.labelAttrs);
			
			height += legendOptions.marginBottom + legendOptions.slices[i].size;
			width = Math.max(width, legendOptions.marginLeft + legendOptions.slices[i].size + legendOptions.marginLeftLabel + label.getBBox().width);
			
			if (legendOptions.hideElemsOnClick.enabled) {
				// Hide/show elements when user clicks on a legend element
				label.attr({cursor:'pointer'});
				
				$.fn.mapael.setHoverOptions(elem, legendOptions.slices[i].attrs, legendOptions.slices[i].attrsHover);
				$.fn.mapael.setHoverOptions(label, legendOptions.labelAttrs, legendOptions.labelAttrs);
				$.fn.mapael.setHover(paper, elem, label);
				
				label.hidden = false;
				(function(i, elem, label) {
					$(label.node).on('click', function() {
						if (!label.hidden) {
							label.animate({'opacity':legendOptions.hideElemsOnClick.opacity}, 300);
							elem.animate({'opacity':legendOptions.hideElemsOnClick.opacity}, 300);
						} else {
							label.animate({'opacity':typeof label.originalAttrs.opacity != "undefined" ? label.originalAttrs.opacity : 1}, 300);
							elem.animate({'opacity':typeof elem.originalAttrs.opacity != "undefined" ? elem.originalAttrs.opacity : 1}, 300);
						}
						
						for (var id in elems) {
							if ((!legendOptions.slices[i].min || elems[id].value >= legendOptions.slices[i].min) 
								&& (!legendOptions.slices[i].max || elems[id].value < legendOptions.slices[i].max)
							) {
								if (!label.hidden) {
									elems[id].mapElem.animate({'opacity':legendOptions.hideElemsOnClick.opacity}, 300);
									elems[id].textElem && elems[id].textElem.animate({'opacity':legendOptions.hideElemsOnClick.opacity}, 300);
								} else {
									elems[id].mapElem.animate({'opacity':typeof elems[id].mapElem.originalAttrs.opacity != "undefined" ? elems[id].mapElem.originalAttrs.opacity : 1}, 300);
									elems[id].textElem && elems[id].textElem.animate({'opacity':typeof elems[id].textElem.originalAttrs.opacity != "undefined" ? elems[id].textElem.originalAttrs.opacity : 1}, 300);
								}
							}
						}
						label.hidden = !label.hidden;
					});
				})(i, elem, label);
			}
		}
		
		// VMLWidth option allows you to set static width for the legend
		// only for VML render because text.getBBox() returns wrong values on IE6/7
		if (Raphael.type != 'SVG' && legendOptions.VMLWidth) 
			width = legendOptions.VMLWidth;
		
		paper.setSize(width, height)
		return paper;
	}
	
	/**
	* Set the attributes on hover and the attributes to restore for a map element
	* @param elem the map element
	* @param originalAttrs the original attributes to restore on mouseout event
	* @param attrsHover the attributes to set on mouseover event
	*/
	$.fn.mapael.setHoverOptions = function (elem, originalAttrs, attrsHover) {
		// Disable transform option on hover for VML (IE<9) because of several bugs
		if (Raphael.type != 'SVG') delete attrsHover.transform;
		elem.attrsHover = attrsHover;
		
		if (elem.attrsHover.transform) elem.originalAttrs = $.extend({transform : "s1"}, originalAttrs);
		else elem.originalAttrs = originalAttrs;
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
			, overBehaviour = function() {hoverTO = setTimeout(function () {$.fn.mapael.elemHover(paper, mapElem, textElem);}, 120);}
			, outBehaviour = function () {clearTimeout(hoverTO);$.fn.mapael.elemOut(paper, mapElem, textElem);};
			
		$mapElem = $(mapElem.node);
		$mapElem.on("mouseover", overBehaviour);
		$mapElem.on("mouseout", outBehaviour);
		
		if (textElem) {
			$textElem = $(textElem.node);
			$textElem.on("mouseover", overBehaviour);
			$(textElem.node).on("mouseout", outBehaviour);
		}
	};
	
	/**
	* Set he behaviour for 'mouseover' event
	* @param paper paper Raphael paper object
	* @param mapElem mapElem the map element
	* @param textElem the optional text element (within the map element)
	*/
	$.fn.mapael.elemHover = function (paper, mapElem, textElem) {
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
	$.fn.mapael.elemOut = function (paper, mapElem, textElem) {
		mapElem.animate(mapElem.originalAttrs, mapElem.attrsHover.animDuration);
		textElem && textElem.animate(textElem.originalAttrs, textElem.attrsHover.animDuration);
		paper.safari();
	};
	
	/**
	* Get element options by merging default options, element options and legend options
	* @param defaultOptions
	* @param elemOptions
	* @param legendOptions
	*/
	$.fn.mapael.getElemOptions = function(defaultOptions, elemOptions, legendOptions) {
		var options = $.extend(true, {}, defaultOptions, elemOptions);
		if (typeof options.value != "undefined") {
			$.extend(true, options, $.fn.mapael.getLegendSlice(options.value, legendOptions));
		}
		
		return options;
	}
	
	/**
	* Get the coordinates of the text relative to a bbox and a position
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
	* Get the legend conf matching with the value
	* @param value the value to match with a slice in the legend
	* @param legend the legend params object
	* @return the legend slice matching with the value
	*/
	$.fn.mapael.getLegendSlice = function (value, legend) {
		for(var i = 0, length = legend.slices.length; i < length; ++i) {
			if ((!legend.slices[i].min || value >= legend.slices[i].min) 
				&& (!legend.slices[i].max || value < legend.slices[i].max)
			) {
				return legend.slices[i];
			}
		}
		return {};
	};
	
	// Default map options
	$.fn.mapael.defaultOptions = {
		map : {
			cssClass : "map"
			, tooltip : {
				cssClass : "mapTooltip"
			}
			, defaultArea : {
				attrs : {
					fill : "#343434"
					, stroke : "#5d5d5d"
					, "stroke-width" : 1
					, "stroke-linejoin" : "round"
				}
				, attrsHover : {
					fill : "#f38a03"
					, animDuration : 300
				}
				, textPosition : 'inner'
				, textAttrs : {
					"font-size" : 15
					, fill : "#c7c7c7"
				}
				, textAttrsHover : {
					fill : "#eaeaea"
					, "animDuration" : 300
				}
			}
			, defaultPlot : {
				type : "circle"
				, size : 15
				, attrs : {
					fill : "#0088db" 
					, stroke : "#fff"
					, "stroke-width" : 0
					, "stroke-linejoin" : "round"
				}
				, attrsHover : {
					"stroke-width" : 3
					, animDuration : 300
				}
				, textPosition : 'right'
				, textAttrs : {
					"font-size" : 15
					, fill : "#c7c7c7"
				},
				textAttrsHover : {
					fill : "#eaeaea"
					, animDuration : 300
				}
			}
			, zoom : {
				enabled : false
				, maxLevel : 5
				, step : 0.25
				, zoomInCssClass : "zoomIn"
				, zoomOutCssClass : "zoomOut"
			}
		}
		, legend : {
			area : {
				cssClass : "areaLegend"
				, display : false
				, marginLeft : 15
				, marginLeftTitle : 5
				, marginLeftLabel : 10
				, marginBottom : 15
				, titleAttrs : {
					"font-size" : 18
					, fill : "#343434"
					, "text-anchor" : "start"
				}
				, labelAttrs : {
					"font-size" : 15
					, fill : "#343434"
					, "text-anchor" : "start"
				}
				, hideElemsOnClick : {
					enabled : true
					, opacity : 0.2
				}
				, slices : []
			}
			, plot : {
				cssClass : "plotLegend"
				, display : false
				, marginLeft : 15
				, marginLeftTitle : 5
				, marginLeftLabel : 10
				, marginBottom : 15
				, titleAttrs : {
					"font-size" : 18
					, fill : "#343434"
					, "text-anchor" : "start"
				}
				, labelAttrs : {
					"font-size" : 15
					, fill : "#343434"
					, "text-anchor" : "start"
				}
				, hideElemsOnClick : {
					enabled : true
					, opacity : 0.2
				}
				, slices : []
			}
		}
		, areas : {}
		, plots : {}
	};
})(jQuery);