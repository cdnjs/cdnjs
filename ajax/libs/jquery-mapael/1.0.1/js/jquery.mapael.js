/**
*
* Jquery Mapael - Dynamic maps jQuery plugin (based on raphael.js)
* Requires jQuery and raphael.js
*
* Version: 1.0.1
*
* Copyright (c) 2015 Vincent Brouté (http://www.vincentbroute.fr/mapael)
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
*
*/
(function($) {

	"use strict";
	
	$.fn.mapael = function(options) {
	
		// Extend legend default options with user options
		options = $.extend(true, {}, $.fn.mapael.defaultOptions, options);
		
		for (var type in options.legend) {
			if ($.isArray(options.legend[type])) {
				for (var i = 0; i < options.legend[type].length; ++i)
					options.legend[type][i] = $.extend(true, {}, $.fn.mapael.legendDefaultOptions[type], options.legend[type][i]);
			} else {
				options.legend[type] = $.extend(true, {}, $.fn.mapael.legendDefaultOptions[type], options.legend[type]);
			}
		}
		
		return this.each(function() {
		
			var $self = $(this)
				, $tooltip = $("<div>").addClass(options.map.tooltip.cssClass).css("display", "none")
				, $container = $("." + options.map.cssClass, this).empty().append($tooltip)
				, mapConf = $.fn.mapael.maps[options.map.name]
				, paper = new Raphael($container[0], mapConf.width, mapConf.height)
				, elemOptions = {}
				, resizeTO = 0
				, areas = {}
				, plots = {}
				, legends = []
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
				areas[id] = {"mapElem" : paper.path(mapConf.elems[id]).attr(elemOptions.attrs)};
			}
			
			// Init map areas in a second loop (prevent texts to be hidden by map elements)
			for (id in mapConf.elems) {
				elemOptions = $.fn.mapael.getElemOptions(
					options.map.defaultArea
					, (options.areas[id] ? options.areas[id] : {})
					, options.legend.area
				);
				$.fn.mapael.initElem(paper, areas[id], elemOptions, $tooltip, id);
			}
			
			// Draw links
			$.fn.mapael.drawLinksCollection(paper, options, mapConf.getCoords, $tooltip);
			
			// Draw plots
			for (id in options.plots) {
				plots[id] = $.fn.mapael.drawPlot(id, options, mapConf, paper, $tooltip);
			}
			
			/**
			* Zoom on the map at a specific level focused on specific coordinates
			* If no coordinates are specified, the zoom will be focused on the center of the map
			* options :
			*	"level" : level of the zoom between 0 and maxLevel
			*	"x" or "latitude" : x coordinate or latitude of the point to focus on
			*	"y" or "longitude" : y coordinate or longitude of the point to focus on
			*	"fixedCenter" : set to true in order to preserve the position of x,y in the canvas when zoomed
			*/
			$self.on("zoom", function(e, zoomOptions) {
				var newLevel = Math.min(Math.max(zoomOptions.level, 0), options.map.zoom.maxLevel)
					, panX = 0
					, panY = 0
					, previousZoomLevel = (1 + $self.data("zoomLevel") * options.map.zoom.step)
					, zoomLevel = (1 + newLevel * options.map.zoom.step)
					, offsetX = 0
					, offsetY = 0
					, coords = {};
				
				if (typeof zoomOptions.latitude != "undefined" && typeof zoomOptions.longitude != "undefined") {
					coords = mapConf.getCoords(zoomOptions.latitude, zoomOptions.longitude);
					zoomOptions.x = coords.x;
					zoomOptions.y = coords.y;
				}
				
				if (typeof zoomOptions.x == "undefined")
					zoomOptions.x = paper._viewBox[0] + paper._viewBox[2] / 2;

				if (typeof zoomOptions.y == "undefined")
					zoomOptions.y = (paper._viewBox[1] + paper._viewBox[3] / 2);
				
				// Update zoom level of the map
				if (newLevel == 0) {
					paper.setViewBox(panX, panY, mapConf.width, mapConf.height);
				} else {
					if (typeof zoomOptions.fixedCenter != 'undefined' && zoomOptions.fixedCenter == true) {
						if (zoomLevel == previousZoomLevel) return;
						
						offsetX = $self.data("panX") + ((zoomOptions.x - $self.data("panX")) * (zoomLevel - previousZoomLevel)) / zoomLevel;
						offsetY = $self.data("panY") + ((zoomOptions.y - $self.data("panY")) * (zoomLevel - previousZoomLevel)) / zoomLevel;
					
						panX = Math.min(Math.max(0, offsetX), (mapConf.width - (mapConf.width / zoomLevel)));
						panY = Math.min(Math.max(0, offsetY), (mapConf.height - (mapConf.height / zoomLevel)));
					} else {
						panX = Math.min(Math.max(0, zoomOptions.x - (mapConf.width / zoomLevel)/2), (mapConf.width - (mapConf.width / zoomLevel)));
						panY = Math.min(Math.max(0, zoomOptions.y - (mapConf.height / zoomLevel)/2), (mapConf.height - (mapConf.height / zoomLevel)));
					}
					
					paper.setViewBox(panX, panY, mapConf.width / zoomLevel, mapConf.height / zoomLevel);
				}
				$self.data({"zoomLevel" : newLevel, "panX" : panX, "panY" : panY, "zoomX" : zoomOptions.x, "zoomY" : zoomOptions.y});
			});
			
			/**
			* Update the zoom level of the map on mousewheel
			*/
			options.map.zoom.enabled && options.map.zoom.mousewheel && $self.on("mousewheel", function(e) {
				var offset = $container.offset(),
					initFactor = (options.map.width) ? ($.fn.mapael.maps[options.map.name].width / options.map.width) : ($.fn.mapael.maps[options.map.name].width / $container.width())
					, zoomLevel = (e.deltaY > 0) ? 1 : -1
					, zoomFactor = 1 / (1 + ($self.data("zoomLevel")) * options.map.zoom.step)
					, x = zoomFactor * initFactor * (e.clientX + $(window).scrollLeft() - offset.left) + $self.data("panX")
					, y = zoomFactor * initFactor * (e.clientY + $(window).scrollTop() - offset.top) + $self.data("panY");
					
				$self.trigger("zoom", {fixedCenter : true, "level" : $self.data("zoomLevel") + zoomLevel, "x" : x, "y" : y});
					
				return false;
			});
			
			// Enable zoom
			if (options.map.zoom.enabled)
				$.fn.mapael.initZoom($container, paper, mapConf.width, mapConf.height, options.map.zoom);
			
			// Set initial zoom
			if (typeof options.map.zoom.init != "undefined") {
				$self.trigger("zoom", options.map.zoom.init);
			}
			
			// Create the legends for areas
			$.merge(legends, $.fn.mapael.createLegends($self, options, "area", areas, 1));
				
			/**
			*
			* Update the current map
			* Refresh attributes and tooltips for areas and plots
			* @param updatedOptions options to update for plots and areas
			* @param newPlots new plots to add to the map
			* @param deletedPlotsplots to delete from the map
			* @param opt option for the refresh :
			*  opt.animDuration animation duration in ms (default = 0)
			*  opt.resetAreas true to reset previous areas options
			*  opt.resetPlots true to reset previous plots options
			*  opt.afterUpdate Hook that allows to add custom processing on the map
			*/
			$self.on("update", function(e, updatedOptions, newPlots, deletedPlots, opt) {
				var i = 0
					, id = 0
					, animDuration = 0
					, elemOptions = {};
				
				// Reset hidden map elements (when user click on legend elements)
				legends.forEach(function(el) {
					el.forEach && el.forEach(function(el) {
						if(typeof el.hidden != "undefined" && el.hidden == true) {
							$(el.node).trigger("click");
						}
					})
				});
				
				if (typeof opt != "undefined") {
					(opt.resetAreas) && (options.areas = {});
					(opt.resetPlots) && (options.plots = {});
					(opt.animDuration) && (animDuration = opt.animDuration);
				}
				
				$.extend(true, options, updatedOptions);
				
				// Delete plots
				if (typeof deletedPlots == "object") {
					for (;i < deletedPlots.length; i++) {
						if (typeof plots[deletedPlots[i]] != "undefined") {
							if (animDuration > 0) {
								(function(plot) {
									plot.mapElem.animate({"opacity":0}, animDuration, "linear", function() {plot.mapElem.remove();});
									if (plot.textElem) {
										plot.textElem.animate({"opacity":0}, animDuration, "linear", function() {plot.textElem.remove();});
									}
								})(plots[deletedPlots[i]]);
							} else {
								plots[deletedPlots[i]].mapElem.remove();
								if (plots[deletedPlots[i]].textElem) {
									plots[deletedPlots[i]].textElem.remove();
								}
							}
							delete plots[deletedPlots[i]];
						}
					}
				}
				
				// New plots
				if (typeof newPlots == "object") {
					for (id in newPlots) {
						if (typeof plots[id] == "undefined") {
							options.plots[id] = newPlots[id];
							plots[id] = $.fn.mapael.drawPlot(id, options, mapConf, paper, $tooltip);
							if (animDuration > 0) {
								plots[id].mapElem.attr({opacity : 0});
								plots[id].textElem.attr({opacity : 0});
								plots[id].mapElem.animate({"opacity": (typeof plots[id].mapElem.originalAttrs.opacity != "undefined") ? plots[id].mapElem.originalAttrs.opacity : 1}, animDuration);
								plots[id].textElem.animate({"opacity": (typeof plots[id].textElem.originalAttrs.opacity != "undefined") ? plots[id].textElem.originalAttrs.opacity : 1}, animDuration);
							}
						}
					}
				}
				
				// Update areas attributes and tooltips
				for (id in areas) {
					elemOptions = $.fn.mapael.getElemOptions(
						options.map.defaultArea
						, (options.areas[id] ? options.areas[id] : {})
						, options.legend.area
					);
					
					$.fn.mapael.updateElem(elemOptions, areas[id], $tooltip, animDuration);
				}
				
				// Update plots attributes and tooltips
				for (id in plots) {
					elemOptions = $.fn.mapael.getElemOptions(
						options.map.defaultPlot
						, (options.plots[id] ? options.plots[id] : {})
						, options.legend.plot
					);
					if (elemOptions.type == "square") {
						elemOptions.attrs.width = elemOptions.size;
						elemOptions.attrs.height = elemOptions.size;
						elemOptions.attrs.x = plots[id].mapElem.attrs.x - (elemOptions.size - plots[id].mapElem.attrs.width) / 2;
						elemOptions.attrs.y = plots[id].mapElem.attrs.y - (elemOptions.size - plots[id].mapElem.attrs.height) / 2;
					} else if (elemOptions.type == "image") {
						elemOptions.attrs.x = plots[id].mapElem.attrs.x - (elemOptions.width - plots[id].mapElem.attrs.width) / 2;
						elemOptions.attrs.y = plots[id].mapElem.attrs.y - (elemOptions.height - plots[id].mapElem.attrs.height) / 2;
					} else { // Default : circle
						elemOptions.attrs.r = elemOptions.size / 2;
					}
					
					$.fn.mapael.updateElem(elemOptions, plots[id], $tooltip, animDuration);
				}
				
				if(typeof opt != "undefined")
					opt.afterUpdate && opt.afterUpdate($self, paper, areas, plots, options);
			});
			
			// Handle resizing of the map
			if (options.map.width) {
				paper.setSize(options.map.width, mapConf.height * (options.map.width / mapConf.width));
				
				// Create the legends for plots taking into account the scale of the map
				$.merge(legends, $.fn.mapael.createLegends($self, options, "plot", plots, (options.map.width / mapConf.width)));
			} else {
				$(window).on("resize", function() {
					clearTimeout(resizeTO);
					resizeTO = setTimeout(function(){$container.trigger("resizeEnd");}, 150);
				});
				
				// Create the legends for plots taking into account the scale of the map
				var createPlotLegend = function() {
					$.merge(legends, $.fn.mapael.createLegends($self, options, "plot", plots, ($container.width() / mapConf.width)));
					
					$container.unbind("resizeEnd", createPlotLegend);
				};
				
				$container.on("resizeEnd", function() {
					var containerWidth = $container.width();
					if (paper.width != containerWidth) {
						paper.setSize(containerWidth, mapConf.height * (containerWidth / mapConf.width));
					}
				}).on("resizeEnd", createPlotLegend).trigger("resizeEnd");
			}
			
			// Hook that allows to add custom processing on the map
			options.map.afterInit && options.map.afterInit($self, paper, areas, plots, options);
			
			$(paper.desc).append(" and Mapael (http://www.vincentbroute.fr/mapael/)");
		});
	};
	
	/**
	* Init the element "elem" on the map (drawing, setting attributes, events, tooltip, ...)
	*/
	$.fn.mapael.initElem = function(paper, elem, options, $tooltip, id) {
		var bbox = {}, textPosition = {};
		if (typeof options.value != "undefined")
			elem.value = options.value;
		
		// Init attrsHover
		$.fn.mapael.setHoverOptions(elem.mapElem, options.attrs, options.attrsHover);
		
		// Init the label related to the element
		if (options.text && typeof options.text.content != "undefined") {
			// Set a text label in the area
			bbox = elem.mapElem.getBBox();
			textPosition = $.fn.mapael.getTextPosition(bbox, options.text.position, options.text.margin);
			options.text.attrs["text-anchor"] = textPosition.textAnchor;
			elem.textElem = paper.text(textPosition.x, textPosition.y, options.text.content).attr(options.text.attrs);
			$.fn.mapael.setHoverOptions(elem.textElem, options.text.attrs, options.text.attrsHover);
			$.fn.mapael.setHover(paper, elem.mapElem, elem.textElem);
			options.eventHandlers && $.fn.mapael.setEventHandlers(id, options, elem.mapElem, elem.textElem);
			$(elem.textElem.node).attr("data-id", id);
		} else {
			$.fn.mapael.setHover(paper, elem.mapElem);
			options.eventHandlers && $.fn.mapael.setEventHandlers(id, options, elem.mapElem);
		}
		
		// Init the tooltip
		if (options.tooltip && options.tooltip.content) {
			elem.mapElem.tooltipContent = options.tooltip.content;
			$.fn.mapael.setTooltip(elem.mapElem, $tooltip);
			
			if (options.text && typeof options.text.content != "undefined") {
				elem.textElem.tooltipContent = options.tooltip.content;
				$.fn.mapael.setTooltip(elem.textElem, $tooltip);
			}
		}
		
		// Init the link
		if (options.href) {
			elem.mapElem.href = options.href;
			elem.mapElem.target = options.target;
			$.fn.mapael.setHref(elem.mapElem);
			
			if (options.text && typeof options.text.content != "undefined") {
				elem.textElem.href = options.href;
				elem.textElem.target = options.target;
				$.fn.mapael.setHref(elem.textElem);
			}
		}
		
		$(elem.mapElem.node).attr("data-id", id);
	};
	
	/**
	* Draw all links between plots on the paper
	*/
	$.fn.mapael.drawLinksCollection = function(paper, options, getCoords, $tooltip) {
		var p1 = {}
			, p2 = {}
			, elemOptions = {}
			, coordsP1 = {}
			, coordsP2 ={};
		
		for (var id in options.links) {
			elemOptions = $.fn.mapael.getElemOptions(options.map.defaultLink, options.links[id], {});
			
			if (typeof options.links[id].between[0] == 'string') {
				p1 = options.plots[options.links[id].between[0]];
			} else {
				p1 = options.links[id].between[0];
			}
			
			if (typeof options.links[id].between[1] == 'string') {
				p2 = options.plots[options.links[id].between[1]];
			} else {
				p2 = options.links[id].between[1];
			}
			
			if (typeof p1.latitude != "undefined" && typeof p1.longitude != "undefined") {
				coordsP1 = getCoords(p1.latitude, p1.longitude);
			} else {
				coordsP1.x = p1.x;
				coordsP1.y = p1.y;
			}
		
			if (typeof p2.latitude != "undefined" && typeof p2.longitude != "undefined") {
				coordsP2 = getCoords(p2.latitude, p2.longitude);
			} else {
				coordsP2.x = p2.x;
				coordsP2.y = p2.y;
			}
			$.fn.mapael.drawLink(id, paper, coordsP1.x, coordsP1.y, coordsP2.x, coordsP2.y, elemOptions, $tooltip);
		}
	};
	
	/**
	* Draw a curved link between two couples of coordinates a(xa,ya) and b(xb, yb) on the paper
	*/
	$.fn.mapael.drawLink = function(id, paper, xa, ya, xb, yb, elemOptions, $tooltip) {
		var elem = {}
		
			// Compute the "curveto" SVG point, d(x,y)
			// c(xc, yc) is the center of (xa,ya) and (xb, yb)
			, xc = (xa + xb) / 2
			 , yc = (ya + yb) / 2
				
			 // Equation for (cd) : y = acd * x + bcd (d is the cure point)
			 , acd = - 1 / ((yb - ya) / (xb - xa))
			 , bcd = yc - acd * xc
		
			 // dist(c,d) = dist(a,b) (=abDist)
			 , abDist = Math.sqrt((xb-xa)*(xb-xa) + (yb-ya)*(yb-ya))

			 // Solution for equation dist(cd) = sqrt((xd - xc)² + (yd - yc)²)
			 // dist(c,d)² = (xd - xc)² + (yd - yc)²
			 // We assume that dist(c,d) = dist(a,b)
			 // so : (xd - xc)² + (yd - yc)² - dist(a,b)² = 0
			 // With the factor : (xd - xc)² + (yd - yc)² - (factor*dist(a,b))² = 0
			 // (xd - xc)² + (acd*xd + bcd - yc)² - (factor*dist(a,b))² = 0
			 , a = 1 + acd*acd
			 , b = -2 * xc + 2*acd*bcd - 2 * acd*yc
			 , c = xc*xc + bcd*bcd - bcd*yc - yc*bcd + yc*yc - ((elemOptions.factor*abDist) * (elemOptions.factor*abDist))
			 , delta = b*b - 4*a*c
			 , x = 0
			 , y = 0;
		
		// There are two solutions, we choose one or the other depending on the sign of the factor
		if (elemOptions.factor > 0) {
			 x = (-b + Math.sqrt(delta)) / (2*a);
			 y = acd * x + bcd;
		} else {
			 x = (-b - Math.sqrt(delta)) / (2*a);
			 y = acd * x + bcd;
		}

		elem.mapElem = paper.path("m "+xa+","+ya+" C "+x+","+y+" "+xb+","+yb+" "+xb+","+yb+"").attr(elemOptions.attrs);
		$.fn.mapael.initElem(paper, elem, elemOptions, $tooltip, id);
		
		return elem;
	};

	/**
	* Update the element "elem" on the map with the new elemOptions options
	*/
	$.fn.mapael.updateElem = function(elemOptions, elem, $tooltip, animDuration) {
		var bbox, textPosition, plotOffset;
		if (typeof elemOptions.value != "undefined")
			elem.value = elemOptions.value;
		
		// Update the label
		if (elem.textElem) {
			if (typeof elemOptions.text != "undefined" && typeof elemOptions.text.content != "undefined" && elemOptions.text.content != elem.textElem.attrs.text)
				elem.textElem.attr({text : elemOptions.text.content});

			bbox = elem.mapElem.getBBox();
			if (elemOptions.size) {
				plotOffset = (elemOptions.size - bbox.height) / 2;
				bbox.x -= plotOffset;
				bbox.x2 += plotOffset;
				bbox.y -= plotOffset;
				bbox.y2 += plotOffset;
			}
			textPosition = $.fn.mapael.getTextPosition(bbox, elemOptions.text.position, elemOptions.text.margin);
			if (textPosition.x != elem.textElem.attrs.x || textPosition.y != elem.textElem.attrs.y) {
				if (animDuration > 0) {
					elem.textElem.attr({"text-anchor" : textPosition.textAnchor});
					elem.textElem.animate({x : textPosition.x, y : textPosition.y}, animDuration);
				} else
					elem.textElem.attr({x : textPosition.x, y : textPosition.y, "text-anchor" : textPosition.textAnchor});
			}
			
			$.fn.mapael.setHoverOptions(elem.textElem, elemOptions.text.attrs, elemOptions.text.attrsHover);
			if (animDuration > 0)
				elem.textElem.animate(elemOptions.text.attrs, animDuration);
			else
				elem.textElem.attr(elemOptions.text.attrs);
		}
		
		// Update elements attrs and attrsHover
		$.fn.mapael.setHoverOptions(elem.mapElem, elemOptions.attrs, elemOptions.attrsHover);
		if (animDuration > 0)
			elem.mapElem.animate(elemOptions.attrs, animDuration);
		else
			elem.mapElem.attr(elemOptions.attrs);
		
		// Update the tooltip
		if (elemOptions.tooltip && typeof elemOptions.tooltip.content != "undefined") {
			if (typeof elem.mapElem.tooltipContent == "undefined") {
				$.fn.mapael.setTooltip(elem.mapElem, $tooltip);
				(elem.textElem) && $.fn.mapael.setTooltip(elem.textElem, $tooltip);
			}
			elem.mapElem.tooltipContent = elemOptions.tooltip.content;
			(elem.textElem) && (elem.textElem.tooltipContent = elemOptions.tooltip.content);
		}
		
		// Update the link
		if (typeof elemOptions.href != "undefined") {
			if (typeof elem.mapElem.href == "undefined") {
				$.fn.mapael.setHref(elem.mapElem);
				(elem.textElem) && $.fn.mapael.setHref(elem.textElem);
			}
			elem.mapElem.href = elemOptions.href;
			elem.mapElem.target = elemOptions.target;
			if (elem.textElem) {
				elem.textElem.href = elemOptions.href;
				elem.textElem.target = elemOptions.target;
			}
		}
	};
	
	/**
	* Draw the plot
	*/
	$.fn.mapael.drawPlot = function(id, options, mapConf, paper, $tooltip) {
		var plot = {}
			, coords = {}
			, elemOptions = $.fn.mapael.getElemOptions(
				options.map.defaultPlot
				, (options.plots[id] ? options.plots[id] : {})
				, options.legend.plot
			);
		
		if (typeof elemOptions.x != "undefined" && typeof elemOptions.y != "undefined")
			coords = {x : elemOptions.x, y : elemOptions.y};
		else
			coords = mapConf.getCoords(elemOptions.latitude, elemOptions.longitude);
		
		if (elemOptions.type == "square") {
			plot = {"mapElem" : paper.rect(
				coords.x - (elemOptions.size / 2)
				, coords.y - (elemOptions.size / 2)
				, elemOptions.size
				, elemOptions.size
			).attr(elemOptions.attrs)};
		} else if (elemOptions.type == "image") {
			plot = {
				"mapElem" : paper.image(
					elemOptions.url
					, coords.x - elemOptions.width / 2
					, coords.y - elemOptions.height / 2
					, elemOptions.width
					, elemOptions.height
				).attr(elemOptions.attrs)
			};
		} else { // Default = circle
			plot = {"mapElem" : paper.circle(coords.x, coords.y, elemOptions.size / 2).attr(elemOptions.attrs)};
		}
		
		$.fn.mapael.initElem(paper, plot, elemOptions, $tooltip, id);
		
		return plot;
	};
	
	/**
	* Set target link on elem
	*/
	$.fn.mapael.setHref = function(elem) {
		elem.attr({cursor : "pointer"});
		$(elem.node).bind("click", function() {
			if (!$.fn.mapael.panning && elem.href)
				window.open(elem.href, elem.target);
		});
	};
	
	/**
	* Set a tooltip for the areas and plots
	* @param elem area or plot element
	* @param $tooltip the tooltip container
	* @param content the content to set in the tooltip
	*/
	$.fn.mapael.setTooltip = function(elem, $tooltip) {
		var tooltipTO = 0
			, $container = $tooltip.parent()
			, containerY2 = $container.offset().left + $container.width();
	
		$(elem.node).on("mouseover", function(e) {
			tooltipTO = setTimeout(
				function() {
					elem.tooltipContent && $tooltip.html(elem.tooltipContent).css("display", "block");
					$tooltip.css({"left" : Math.min(containerY2 - $tooltip.outerWidth() - 5, e.pageX + 10 - $(window).scrollLeft()), "top" : e.pageY + 20 - $(window).scrollTop()});
				}
				, 120
			);
		}).on("mouseout", function(e) {
			clearTimeout(tooltipTO);
			$tooltip.css("display", "none");
		}).on("mousemove", function(e) {
			$tooltip.css({"left" : Math.min(containerY2 - $tooltip.outerWidth() - 5, e.pageX + 10 - $(window).scrollLeft()), "top" : e.pageY + 20 - $(window).scrollTop()});
		});
	};
	
	/**
	* Set user defined handlers for events on areas and plots
	* @param id the id of the element
	* @param elemOptions the element parameters
	* @param mapElem the map element to set callback on
	* @param textElem the optional text within the map element
	*/
	$.fn.mapael.setEventHandlers = function(id, elemOptions, mapElem, textElem) {
		for(var event in elemOptions.eventHandlers) {
			(function(event) {
				$(mapElem.node).on(event, function(e) {!$.fn.mapael.panning && elemOptions.eventHandlers[event](e, id, mapElem, textElem, elemOptions)});
				textElem && $(textElem.node).on(event, function(e) {!$.fn.mapael.panning && elemOptions.eventHandlers[event](e, id, mapElem, textElem, elemOptions)});
			})(event);
		}
	};
	
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
		var $parentContainer = $container.parent()
			, $zoomIn = $("<div>").addClass(options.zoomInCssClass).html("+")
			, $zoomOut = $("<div>").addClass(options.zoomOutCssClass).html("&#x2212;")
			, mousedown = false
			, previousX = 0
			, previousY = 0;
		
		// Zoom
		$parentContainer.data("zoomLevel", 0).data({"panX" : 0, "panY" : 0});
		$container.append($zoomIn).append($zoomOut);
		
		$zoomIn.on("click", function() {$parentContainer.trigger("zoom", {"level" : $parentContainer.data("zoomLevel") + 1});});
		$zoomOut.on("click", function() {$parentContainer.trigger("zoom", {"level" : $parentContainer.data("zoomLevel") - 1});});
		
		// Panning
		$("body").on("mouseup", function(e) {
			mousedown = false;
			setTimeout(function () {$.fn.mapael.panning = false;}, 50);
		});
		
		$container.on("mousedown", function(e) {
			mousedown = true;
			previousX = e.pageX;
			previousY = e.pageY;
			return false;
		}).on("mousemove", function(e) {
			var currentLevel = $parentContainer.data("zoomLevel");
			if (mousedown && currentLevel != 0) {
				var offsetX = (previousX - e.pageX) / (1 + (currentLevel * options.step)) * (mapWidth / paper.width)
					, offsetY = (previousY - e.pageY) / (1 + (currentLevel * options.step)) * (mapHeight / paper.height)
					, panX = Math.min(Math.max(0, paper._viewBox[0] + offsetX), (mapWidth - paper._viewBox[2]))
					, panY = Math.min(Math.max(0, paper._viewBox[1] + offsetY), (mapHeight - paper._viewBox[3]));					
				
				if (Math.abs(offsetX) > 5 || Math.abs(offsetY) > 5) {
					$parentContainer.data({"panX" : panX, "panY" : panY});
					
					paper.setViewBox(panX, panY, paper._viewBox[2], paper._viewBox[3]);
					
					previousX = e.pageX;
					previousY = e.pageY;
					$.fn.mapael.panning = true;
				}
			}
			return false;
		});
	};
	
	/**
	* Draw a legend for areas and / or plots
	* @param legendOptions options for the legend to draw
	* @param $container the map container
	* @param options map options object
	* @param legendType the type of the legend : "area" or "plot"
	* @param elems collection of plots or areas on the maps
	* @param legendIndex index of the legend in the conf array
	*/
	$.fn.mapael.drawLegend = function (legendOptions, $container, options, legendType, elems, scale, legendIndex) {
		var $legend = {}
			, paper = {}
			, width = 0
			, height = 0
			, title = {}
			, elem = {}
			, elemBBox = {}
			, label = {}
			, i = 0
			, x = 0
			, y = 0
			, yCenter = 0
			, sliceAttrs = []
			, length = 0;
		
			if (!legendOptions.slices || !legendOptions.display)
				return;
				
			$legend = $("." + legendOptions.cssClass, $container).empty();
			paper = new Raphael($legend.get(0));
			height = width = 0;
			
			// Set the title of the legend
			if(legendOptions.title) {
				title = paper.text(legendOptions.marginLeftTitle, 0, legendOptions.title).attr(legendOptions.titleAttrs);
				title.attr({y : 0.5 * title.getBBox().height});
					
				width = legendOptions.marginLeftTitle + title.getBBox().width;
				height += legendOptions.marginBottomTitle + title.getBBox().height;
			}
			
			// Calculate attrs (and width, height and r (radius)) for legend elements, and yCenter for horizontal legends
			for(i = 0, length = legendOptions.slices.length; i < length; ++i) {
				if (typeof legendOptions.slices[i].legendSpecificAttrs == "undefined")
					legendOptions.slices[i].legendSpecificAttrs = {};
					
				sliceAttrs[i] = $.extend(
					{}
					, (legendType == "plot") ? options.map["defaultPlot"].attrs : options.map["defaultArea"].attrs
					, legendOptions.slices[i].attrs
					, legendOptions.slices[i].legendSpecificAttrs
				);
			
				if (legendType == "area") {
					if (typeof sliceAttrs[i].width == "undefined")
						sliceAttrs[i].width = 30;
					if (typeof sliceAttrs[i].height == "undefined")
						sliceAttrs[i].height = 20;
				} else if (legendOptions.slices[i].type == "square") {
					if (typeof sliceAttrs[i].width == "undefined")
						sliceAttrs[i].width = legendOptions.slices[i].size;
					if (typeof sliceAttrs[i].height == "undefined")
						sliceAttrs[i].height = legendOptions.slices[i].size;
				} else if (legendOptions.slices[i].type == "image") {
					if (typeof sliceAttrs[i].width == "undefined")
						sliceAttrs[i].width = legendOptions.slices[i].width;
					if (typeof sliceAttrs[i].height == "undefined")
						sliceAttrs[i].height = legendOptions.slices[i].height;
				} else {
					if (typeof sliceAttrs[i].r == "undefined")
						sliceAttrs[i].r = legendOptions.slices[i].size / 2;
				}
				
				if(legendOptions.slices[i].type == "image" || legendType == "area") {
					yCenter = Math.max(yCenter, legendOptions.marginBottomTitle + title.getBBox().height + scale * sliceAttrs[i].height/2);
				} else {
					yCenter = Math.max(yCenter, legendOptions.marginBottomTitle + title.getBBox().height + scale * sliceAttrs[i].r);
				}
			}
				
			if (legendOptions.mode == "horizontal") {
				width = legendOptions.marginLeft;
			}
			
			// Draw legend elements (circle, square or image in vertical or horizontal mode)
			for(i = 0, length = legendOptions.slices.length; i < length; ++i) {
				if (typeof legendOptions.slices[i].display == "undefined" || legendOptions.slices[i].display == true) {
					if(legendType == "area") {
						if (legendOptions.mode == "horizontal") {
							x = width + legendOptions.marginLeft;
							y = yCenter - (0.5 * scale * sliceAttrs[i].height);
						} else {
							x = legendOptions.marginLeft;
							y = height;
						}
						
						elem = paper.rect(x, y, scale * (sliceAttrs[i].width), scale * (sliceAttrs[i].height));
					} else if(legendOptions.slices[i].type == "square") {					
						if (legendOptions.mode == "horizontal") {
							x = width + legendOptions.marginLeft;
							y = yCenter - (0.5 * scale * sliceAttrs[i].height);
						} else {
							x = legendOptions.marginLeft;
							y = height;
						}
						
						elem = paper.rect(x, y, scale * (sliceAttrs[i].width), scale * (sliceAttrs[i].height));
							
					} else if(legendOptions.slices[i].type == "image") {					
						if (legendOptions.mode == "horizontal") {
							x = width + legendOptions.marginLeft;
							y = yCenter - (0.5 * scale * sliceAttrs[i].height);
						} else {
							x = legendOptions.marginLeft;
							y = height;
						}

						elem = paper.image(
							legendOptions.slices[i].url, x, y, scale * sliceAttrs[i].width, scale * sliceAttrs[i].height);
					} else {
						if (legendOptions.mode == "horizontal") {
							x = width + legendOptions.marginLeft + scale * (sliceAttrs[i].r);
							y = yCenter;
						} else {
							x = legendOptions.marginLeft + scale * (sliceAttrs[i].r);
							y = height + scale * (sliceAttrs[i].r);
						}
						elem = paper.circle(x, y, scale * (sliceAttrs[i].r));
					}
					
					// Set attrs to the element drawn above
					delete sliceAttrs[i].width;
					delete sliceAttrs[i].height;
					delete sliceAttrs[i].r;
					elem.attr(sliceAttrs[i]);
					elemBBox = elem.getBBox();
					
					// Draw the label associated with the element
					if (legendOptions.mode == "horizontal") {
						x = width + legendOptions.marginLeft + elemBBox.width + legendOptions.marginLeftLabel;
						y = yCenter;
					} else {
						x = legendOptions.marginLeft + elemBBox.width + legendOptions.marginLeftLabel;
						y = height + (elemBBox.height / 2);
					}
					
					label = paper.text(x, y, legendOptions.slices[i].label).attr(legendOptions.labelAttrs);
					
					// Update the width and height for the paper
					if (legendOptions.mode == "horizontal") {
						width += legendOptions.marginLeft + elemBBox.width + legendOptions.marginLeftLabel + label.getBBox().width;
						if(legendOptions.slices[i].type == "image" || legendType == "area") {
							height = Math.max(height, legendOptions.marginBottom + title.getBBox().height + elemBBox.height);
						} else {
							height = Math.max(height, legendOptions.marginBottomTitle + legendOptions.marginBottom + title.getBBox().height + elemBBox.height);
						}
					} else {
						width = Math.max(width, legendOptions.marginLeft + elemBBox.width + legendOptions.marginLeftLabel + label.getBBox().width);
						height += legendOptions.marginBottom + elemBBox.height;
					}
					
					$(elem.node).attr({"data-type": "elem", "data-index": i});
					$(label.node).attr({"data-type": "label", "data-index": i});
					
					// Hide map elements when the user clicks on a legend item
					if (legendOptions.hideElemsOnClick.enabled) {
						// Hide/show elements when user clicks on a legend element
						label.attr({cursor:"pointer"});
						elem.attr({cursor:"pointer"});
						
						$.fn.mapael.setHoverOptions(elem, sliceAttrs[i], sliceAttrs[i]);
						$.fn.mapael.setHoverOptions(label, legendOptions.labelAttrs, legendOptions.labelAttrsHover);
						$.fn.mapael.setHover(paper, elem, label);
						
						label.hidden = false;
						$.fn.mapael.handleClickOnLegendElem(legendOptions, legendOptions.slices[i], label, elem, elems, legendIndex);
					}
				}
			}
		
			// VMLWidth option allows you to set static width for the legend
			// only for VML render because text.getBBox() returns wrong values on IE6/7
			if (Raphael.type != "SVG" && legendOptions.VMLWidth)
				width = legendOptions.VMLWidth;
			
			paper.setSize(width, height);
			return paper;
	};
	
	/**
	* Allow to hide elements of the map when the user clicks on a related legend item
	* @param legendOptions options for the legend to draw
	* @param sliceOptions options of the slice
	* @param label label of the legend item
	* @param elem element of the legend item
	* @param elems collection of plots or areas displayed on the map
	* @param legendIndex index of the legend in the conf array
	*/
	$.fn.mapael.handleClickOnLegendElem = function(legendOptions, sliceOptions, label, elem, elems, legendIndex) {
		var hideMapElems = function() {
			var elemValue = 0;
			
			if (!label.hidden) {
				label.animate({"opacity":0.5}, 300);
			} else {
				label.animate({"opacity":1}, 300);
			}
			
			for (var id in elems) {
				if ($.isArray(elems[id].value)) {
					elemValue = elems[id].value[legendIndex];
				} else {
					elemValue = elems[id].value;
				}
				
				if ((typeof sliceOptions.sliceValue != "undefined" && elemValue == sliceOptions.sliceValue)
					|| ((typeof sliceOptions.sliceValue == "undefined")
						&& (typeof sliceOptions.min == "undefined" || elemValue >= sliceOptions.min)
						&& (typeof sliceOptions.max == "undefined" || elemValue < sliceOptions.max))
				) {
					(function(id) {
						if (!label.hidden) {
							elems[id].mapElem.animate({"opacity":legendOptions.hideElemsOnClick.opacity}, 300, "linear", function() {(legendOptions.hideElemsOnClick.opacity == 0) && elems[id].mapElem.hide();});
							elems[id].textElem && elems[id].textElem.animate({"opacity":legendOptions.hideElemsOnClick.opacity}, 300, "linear", function() {(legendOptions.hideElemsOnClick.opacity == 0) && elems[id].textElem.hide();});
						} else {
							if (legendOptions.hideElemsOnClick.opacity == 0) {
								elems[id].mapElem.show();
								elems[id].textElem && elems[id].textElem.show();
							}
							elems[id].mapElem.animate({"opacity":typeof elems[id].mapElem.originalAttrs.opacity != "undefined" ? elems[id].mapElem.originalAttrs.opacity : 1}, 300);
							elems[id].textElem && elems[id].textElem.animate({"opacity":typeof elems[id].textElem.originalAttrs.opacity != "undefined" ? elems[id].textElem.originalAttrs.opacity : 1}, 300);
						}
					})(id);
				}
			}
			label.hidden = !label.hidden;
		};
		$(label.node).on("click", hideMapElems);
		$(elem.node).on("click", hideMapElems);
	};
	
	/**
	* Create all legends for a specified type (area or plot)
	* @param $container the map container
	* @param options map options
	* @param legendType the type of the legend : "area" or "plot"
	* @param elems collection of plots or areas displayed on the map
	* @param scale scale ratio of the map
	*/
	$.fn.mapael.createLegends = function ($container, options, legendType, elems, scale) {
		var legends = [];
		
		if ($.isArray(options.legend[legendType])) {
			for (var j = 0; j < options.legend[legendType].length; ++j) {
				legends.push($.fn.mapael.drawLegend(options.legend[legendType][j], $container, options, legendType, elems, scale, j));
			}
		} else {
			legends.push($.fn.mapael.drawLegend(options.legend[legendType], $container, options, legendType, elems, scale));
		}
		return legends;
	};
	
	/**
	* Set the attributes on hover and the attributes to restore for a map element
	* @param elem the map element
	* @param originalAttrs the original attributes to restore on mouseout event
	* @param attrsHover the attributes to set on mouseover event
	*/
	$.fn.mapael.setHoverOptions = function (elem, originalAttrs, attrsHover) {
		// Disable transform option on hover for VML (IE<9) because of several bugs
		if (Raphael.type != "SVG") delete attrsHover.transform;
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
	* Set he behaviour for "mouseover" event
	* @param paper paper Raphael paper object
	* @param mapElem mapElem the map element
	* @param textElem the optional text element (within the map element)
	*/
	$.fn.mapael.elemHover = function (paper, mapElem, textElem) {
		mapElem.animate(mapElem.attrsHover, mapElem.attrsHover.animDuration);
		textElem && textElem.animate(textElem.attrsHover, textElem.attrsHover.animDuration);
		paper.safari();
	};
	
	/**
	* Set he behaviour for "mouseout" event
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
			if ($.isArray(legendOptions)) {
				for (var i = 0, length = legendOptions.length;i<length;++i) {
					options = $.extend(true, {}, options, $.fn.mapael.getLegendSlice(options.value[i], legendOptions[i]));
				}
			} else {
				options = $.extend(true, {}, options, $.fn.mapael.getLegendSlice(options.value, legendOptions));
			}
		}
		return options;
	};
	
	/**
	* Get the coordinates of the text relative to a bbox and a position
	* @param bbox the boundary box of the element
	* @param textPosition the wanted text position (inner, right, left, top or bottom)
	*/
	$.fn.mapael.getTextPosition = function(bbox, textPosition, margin) {
		var textX = 0
			, textY = 0
			, textAnchor = "";
			
		switch (textPosition) {
			case "bottom" :
				textX = (bbox.x + bbox.x2) / 2;
				textY = bbox.y2 + margin;
				textAnchor = "middle";
				break;
			case "top" :
				textX = (bbox.x + bbox.x2) / 2;
				textY = bbox.y - margin;
				textAnchor = "middle";
				break;
			case "left" :
				textX = bbox.x - margin;
				textY = (bbox.y + bbox.y2) / 2;
				textAnchor = "end";
				break;
			case "right" :
				textX = bbox.x2 + margin;
				textY = (bbox.y + bbox.y2) / 2;
				textAnchor = "start";
				break;
			default : // "inner" position
				textX = (bbox.x + bbox.x2) / 2;
				textY = (bbox.y + bbox.y2) / 2;
				textAnchor = "middle";
		}
		return {"x" : textX, "y" : textY, "textAnchor" : textAnchor};
	};
	
	/**
	* Get the legend conf matching with the value
	* @param value the value to match with a slice in the legend
	* @param legend the legend params object
	* @return the legend slice matching with the value
	*/
	$.fn.mapael.getLegendSlice = function (value, legend) {
		for(var i = 0, length = legend.slices.length; i < length; ++i) {
			if ((typeof legend.slices[i].sliceValue != "undefined" && value == legend.slices[i].sliceValue)
				|| ((typeof legend.slices[i].sliceValue == "undefined")
					&& (typeof legend.slices[i].min == "undefined" || value >= legend.slices[i].min)
					&& (typeof legend.slices[i].max == "undefined" || value < legend.slices[i].max))
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
				, text : {
					position : "inner"
					, margin : 10
					, attrs : {
						"font-size" : 15
						, fill : "#c7c7c7"
					}
					, attrsHover : {
						fill : "#eaeaea"
						, "animDuration" : 300
					}
				}
				, target : "_self"
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
				, text : {
					position : "right"
					, margin : 10
					, attrs : {
						"font-size" : 15
						, fill : "#c7c7c7"
					}
					, attrsHover : {
						fill : "#eaeaea"
						, animDuration : 300
					}
				}
				, target : "_self"
			}
			, defaultLink : {
				factor : 0.5
				, attrs : {
					stroke : "#0088db"
					, "stroke-width" : 2
				}
				, attrsHover : {
					animDuration : 300
				}
				, text : {
					position : "inner"
					, margin : 10
					, attrs : {
						"font-size" : 15
						, fill : "#c7c7c7"
					}
					, attrsHover : {
						fill : "#eaeaea"
						, animDuration : 300
					}
				}
				, target : "_self"
			}
			, zoom : {
				enabled : false
				, maxLevel : 5
				, step : 0.25
				, zoomInCssClass : "zoomIn"
				, zoomOutCssClass : "zoomOut"
				, mousewheel : true
			}
		}
		, legend : {
			area : []
			, plot : []
		}
		, areas : {}
		, plots : {}
		, links : {}
	};
	
	$.fn.mapael.legendDefaultOptions = {
		area : {
			cssClass : "areaLegend"
			, display : true
			, marginLeft : 10
			, marginLeftTitle : 5
			, marginBottomTitle: 10
			, marginLeftLabel : 10
			, marginBottom : 10
			, titleAttrs : {
				"font-size" : 16
				, fill : "#343434"
				, "text-anchor" : "start"
			}
			, labelAttrs : {
				"font-size" : 12
				, fill : "#343434"
				, "text-anchor" : "start"
			}
			, labelAttrsHover : {
				fill : "#787878"
				, animDuration : 300
			}
			, hideElemsOnClick : {
				enabled : true
				, opacity : 0.2
			}
			, slices : []
			, mode : "vertical"
		}
		, plot : {
			cssClass : "plotLegend"
			, display : true
			, marginLeft : 10
			, marginLeftTitle : 5
			, marginBottomTitle: 10
			, marginLeftLabel : 10
			, marginBottom : 10
			, titleAttrs : {
				"font-size" : 16
				, fill : "#343434"
				, "text-anchor" : "start"
			}
			, labelAttrs : {
				"font-size" : 12
				, fill : "#343434"
				, "text-anchor" : "start"
			}
			, labelAttrsHover : {
				fill : "#787878"
				, animDuration : 300
			}
			, hideElemsOnClick : {
				enabled : true
				, opacity : 0.2
			}
			, slices : []
			, mode : "vertical"
		}
	};
})(jQuery);
