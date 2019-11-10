/**
*
* Jquery Mapael - Dynamic maps jQuery plugin (based on raphael.js)
* Requires jQuery and raphael.js
*
* Version: 0.7.1 (23-01-2014)
*
* Copyright (c) 2014 Vincent Brouté (http://www.neveldo.fr/mapael)
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
*
*/
(function($) {

	"use strict";
	
	$.fn.mapael = function(options) {
		options = $.extend(true, {}, $.fn.mapael.defaultOptions, options);
		
		return this.each(function() {
		
			var $self = $(this)
				, $tooltip = $("<div>").addClass(options.map.tooltip.cssClass).css("display", "none")
				, $container = $('.' + options.map.cssClass, this).empty().append($tooltip)
				, mapConf = $.fn.mapael.maps[options.map.name]
				, paper = new Raphael($container[0], mapConf.width, mapConf.height)
				, elemOptions = {}
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
			
			// Draw plots
			for (id in options.plots) {
				plots[id] = $.fn.mapael.drawPlot(id, options, mapConf, paper, $tooltip);
			}
			
			// Enable zoom
			if (options.map.zoom.enabled)
				$.fn.mapael.initZoom($container, paper, mapConf.width, mapConf.height, options.map.zoom);
				
			// Create the legends for areas
			if (options.legend.area.slices && options.legend.area.display)
				areaLegend = $.fn.mapael.createLegend($self, options, 'area', areas, 1);
                
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
			$self.on('update', function(e, updatedOptions, newPlots, deletedPlots, opt) {
				var i = 0
					, id = 0
					, animDuration = 0
					, elemOptions = {}
					, resetHiddenElem = function(el) {
						if(typeof el.hidden != "undefined" && el.hidden == true) {
							$(el.node).trigger('click');
						}
					};
				
				areaLegend.forEach && areaLegend.forEach(resetHiddenElem);
				plotLegend.forEach && plotLegend.forEach(resetHiddenElem);
				
				if (typeof opt != 'undefined') {
					(opt.resetAreas) && (options.areas = {});
					(opt.resetPlots) && (options.plots = {});
					(opt.animDuration) && (animDuration = opt.animDuration);
				}
				
				$.extend(true, options, updatedOptions);
				
				// Delete plots
				if (typeof deletedPlots == 'object') {
					for (;i < deletedPlots.length; i++) {
						if (typeof plots[deletedPlots[i]] != 'undefined') {
							if (animDuration > 0) {
								(function(plot) {
									plot.mapElem.animate({'opacity':0}, animDuration, 'linear', function() {plot.mapElem.remove();});
									if (plot.textElem) {
										plot.textElem.animate({'opacity':0}, animDuration, 'linear', function() {plot.textElem.remove();});
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
				if (typeof newPlots == 'object') {
					for (id in newPlots) {
						if (typeof plots[id] == 'undefined') {
							options.plots[id] = newPlots[id];
							plots[id] = $.fn.mapael.drawPlot(id, options, mapConf, paper, $tooltip);
							if (animDuration > 0) {
								plots[id].mapElem.attr({opacity : 0});
								plots[id].textElem.attr({opacity : 0});
								plots[id].mapElem.animate({'opacity': (typeof plots[id].mapElem.originalAttrs.opacity != 'undefined') ? plots[id].mapElem.originalAttrs.opacity : 1}, animDuration);
								plots[id].textElem.animate({'opacity': (typeof plots[id].textElem.originalAttrs.opacity != 'undefined') ? plots[id].textElem.originalAttrs.opacity : 1}, animDuration);
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
					
					// Update plot size
					if ("square" == elemOptions.type) {
						elemOptions.attrs.width = elemOptions.size;
						elemOptions.attrs.height = elemOptions.size;
						elemOptions.attrs.x = plots[id].mapElem.attrs.x - (elemOptions.size - plots[id].mapElem.attrs.width) / 2;
						elemOptions.attrs.y = plots[id].mapElem.attrs.y - (elemOptions.size - plots[id].mapElem.attrs.height) / 2;
					} else { // Default : circle
						elemOptions.attrs.r = elemOptions.size / 2;
					}
					
					$.fn.mapael.updateElem(elemOptions, plots[id], $tooltip, animDuration);
				}
				
				if( typeof opt != 'undefined' )
					opt.afterUpdate && opt.afterUpdate($self, paper, areas, plots, options);
			});
			
			// Handle resizing of the map
			if (options.map.width) {
				paper.setSize(options.map.width, mapConf.height * (options.map.width / mapConf.width));
				
				// Create the legends for plots taking into account the scale of the map
				if (options.legend.plot.slices && options.legend.plot.display)
					plotLegend = $.fn.mapael.createLegend($self, options, 'plot', plots, (options.map.width / mapConf.width));
			} else {
				$(window).on('resize', function() {
					clearTimeout(resizeTO);
					resizeTO = setTimeout(function(){$container.trigger('resizeEnd');}, 150);
				});
				
				// Create the legends for plots taking into account the scale of the map
				var createPlotLegend = function() {
					if (options.legend.plot.slices && options.legend.plot.display)
						plotLegend = $.fn.mapael.createLegend($self, options, 'plot', plots, ($container.width() / mapConf.width));
					
					$container.unbind('resizeEnd', createPlotLegend);
				};
				
				$container.on('resizeEnd', function() {
					var containerWidth = $container.width();
					if (paper.width != containerWidth) {
						paper.setSize(containerWidth, mapConf.height * (containerWidth / mapConf.width));
					}
				}).on('resizeEnd', createPlotLegend).trigger('resizeEnd');
			}
			
			// Hook that allows to add custom processing on the map
			options.map.afterInit && options.map.afterInit($self, paper, areas, plots, options);
			
			$(paper.desc).append(" and Mapael (http://neveldo.fr/mapael)");
		});
	};
	
	/**
	* Init the element 'elem' on the map (drawing, setting attributes, events, tooltip, ...)
	*/
	$.fn.mapael.initElem = function(paper, elem, options, $tooltip, id) {
		var bbox = {}, textPosition = {};
		$.fn.mapael.setHoverOptions(elem.mapElem, options.attrs, options.attrsHover);
		
		if (options.text && typeof options.text.content != 'undefined') {
			// Set a text label in the area
			bbox = elem.mapElem.getBBox();
			textPosition = $.fn.mapael.getTextPosition(bbox, options.text.position, options.text.margin);
			options.text.attrs['text-anchor'] = textPosition.textAnchor;
			elem.textElem = paper.text(textPosition.x, textPosition.y, options.text.content).attr(options.text.attrs);
			$.fn.mapael.setHoverOptions(elem.textElem, options.text.attrs, options.text.attrsHover);
			$.fn.mapael.setHover(paper, elem.mapElem, elem.textElem);
			options.eventHandlers && $.fn.mapael.setEventHandlers(id, options, elem.mapElem, elem.textElem);
			$(elem.textElem.node).attr('data-id', id);
		} else {
			$.fn.mapael.setHover(paper, elem.mapElem);
			options.eventHandlers && $.fn.mapael.setEventHandlers(id, options, elem.mapElem);
		}
		
		if (options.tooltip && options.tooltip.content) {
			elem.mapElem.tooltipContent = options.tooltip.content;
			$.fn.mapael.setTooltip(elem.mapElem, $tooltip);
			
			if (options.text && typeof options.text.content !='undefined') {
				elem.textElem.tooltipContent = options.tooltip.content;
				$.fn.mapael.setTooltip(elem.textElem, $tooltip);
			}
		}
		
		if (options.href) {
			elem.mapElem.href = options.href;
			$.fn.mapael.setHref(elem.mapElem);
			
			if (options.text && typeof options.text.content !='undefined') {
				elem.textElem.href = options.href;
				$.fn.mapael.setHref(elem.textElem);
			}
		}
		
		if (typeof options.value != "undefined")
			elem.value = options.value;
			
		$(elem.mapElem.node).attr('data-id', id);
	}

	/**
	* Update the element 'elem' on the map with the new elemOptions options
	*/
	$.fn.mapael.updateElem = function(elemOptions, elem, $tooltip, animDuration) {
		var bbox, textPosition, plotOffset;
		if (typeof elemOptions.value != "undefined")
			elem.value = elemOptions.value;
		
		// Update text
		if (elem.textElem) {
			if (typeof elemOptions.text != 'undefined' && typeof elemOptions.text.content != 'undefined' && elemOptions.text.content != elem.textElem.attrs.text)
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
					elem.textElem.attr({'text-anchor' : textPosition.textAnchor});
					elem.textElem.animate({x : textPosition.x, y : textPosition.y}, animDuration);
				} else
					elem.textElem.attr({x : textPosition.x, y : textPosition.y, 'text-anchor' : textPosition.textAnchor});
			}
			
			$.fn.mapael.setHoverOptions(elem.textElem, elemOptions.text.attrs, elemOptions.text.attrsHover);
			if (animDuration > 0)
				elem.textElem.animate(elemOptions.text.attrs, animDuration);
			else
				elem.textElem.attr(elemOptions.text.attrs);
		}
		
		$.fn.mapael.setHoverOptions(elem.mapElem, elemOptions.attrs, elemOptions.attrsHover);
		if (animDuration > 0)
			elem.mapElem.animate(elemOptions.attrs, animDuration);
		else
			elem.mapElem.attr(elemOptions.attrs);
		
		if (elemOptions.tooltip && typeof elemOptions.tooltip.content != 'undefined') {
			if (typeof elem.mapElem.tooltipContent == "undefined") {
				$.fn.mapael.setTooltip(elem.mapElem, $tooltip);
				(elem.textElem) && $.fn.mapael.setTooltip(elem.textElem, $tooltip);
			}
			elem.mapElem.tooltipContent = elemOptions.tooltip.content;
			(elem.textElem) && (elem.textElem.tooltipContent = elemOptions.tooltip.content);
		}
		
		if (typeof elemOptions.href != 'undefined') {
			if (typeof elem.mapElem.href == "undefined") {
				$.fn.mapael.setHref(elem.mapElem);
				(elem.textElem) && $.fn.mapael.setHref(elem.textElem);
			}
			elem.mapElem.href = elemOptions.href;
			(elem.textElem) && (elem.textElem.href = elemOptions.href);
		}
	}
	
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
		
		if (elemOptions.x && elemOptions.y) 
			coords = {x : elemOptions.x, y : elemOptions.y};
		else
			coords = mapConf.getCoords(elemOptions.latitude, elemOptions.longitude);
		
		if ("square" == elemOptions.type) {
			plot = {'mapElem' : paper.rect(
				coords.x - (elemOptions.size / 2)
				, coords.y - (elemOptions.size / 2)
				, elemOptions.size
				, elemOptions.size
			).attr(elemOptions.attrs)};
		} else { // Default = circle
			plot = {'mapElem' : paper.circle(coords.x, coords.y, elemOptions.size / 2).attr(elemOptions.attrs)};
		}
		
		$.fn.mapael.initElem(paper, plot, elemOptions, $tooltip, id);
		
		return plot;
	};
	
	/**
	* Set target link on elem
	*/
	$.fn.mapael.setHref = function(elem) {
		elem.attr({cursor : 'pointer'});
		$(elem.node).bind('click', function() {
			if (!$.fn.mapael.panning && elem.href)
				window.location = elem.href;
		});
	}
	
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
					$tooltip.css({"left" : Math.min(containerY2 - $tooltip.outerWidth() - 5, e.pageX + 12), "top" : e.pageY + 23 - $(window).scrollTop()});
				}
				, 120
			);
		}).on("mouseout", function(e) {
			clearTimeout(tooltipTO);
			$tooltip.css("display", "none");
		}).on("mousemove", function(e) {
			$tooltip.css({"left" : Math.min(containerY2 - $tooltip.outerWidth() - 5, e.pageX + 12), "top" : e.pageY + 23 - $(window).scrollTop()});
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
				$(mapElem.node).on(event, function(e) {!$.fn.mapael.panning && elemOptions.eventHandlers[event](e, id, mapElem, textElem)});
				textElem && $(textElem.node).on(event, function(e) {!$.fn.mapael.panning && elemOptions.eventHandlers[event](e, id, mapElem, textElem)});
			})(event);
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
		var $parentContainer = $container.parent()
			, $zoomIn = $("<div>").addClass(options.zoomInCssClass).html("+")
			, $zoomOut = $("<div>").addClass(options.zoomOutCssClass).html("&#x2212;")
			, mousedown  = false
			, previousX = 0
			, previousY = 0;
		
		// Zoom
		$parentContainer.data("zoomLevel", 0);
		$container.append($zoomIn).append($zoomOut);
		
		$parentContainer.on("zoom", function(e, level, x, y) {
			var currentLevel = Math.min(Math.max(level, 0), options.maxLevel);
			$parentContainer.data("zoomLevel", currentLevel);
			
			(typeof x == "undefined") && (x = (paper._viewBox[0] + paper._viewBox[2] / 2));
			(typeof y == "undefined") && (y = (paper._viewBox[1] + paper._viewBox[3] / 2));
			
			// Update zoom level of the map
			if (currentLevel == 0) {
				paper.setViewBox(0, 0, mapWidth, mapHeight);
			} else {
				paper.setViewBox(
					Math.min(Math.max(0, x - (mapWidth / (1 + currentLevel * options.step))/2), (mapWidth - (mapWidth / (1 + currentLevel * options.step)))), 
					Math.min(Math.max(0, y - (mapHeight / (1 + currentLevel * options.step))/2), (mapHeight - (mapHeight / (1 + currentLevel * options.step)))), 
					mapWidth / (1 + currentLevel * options.step), 
					mapHeight / (1 + currentLevel * options.step)
				);
			}
		});
		
		$zoomIn.on("click", function() {$parentContainer.trigger("zoom", $parentContainer.data("zoomLevel") + 1);});
		$zoomOut.on("click", function() {$parentContainer.trigger("zoom", $parentContainer.data("zoomLevel") - 1);});
		
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
			var currentLevel = $parentContainer.data("zoomLevel");
			if (mousedown  && currentLevel != 0) {
				var offsetX = (previousX - e.pageX) / (1 + (currentLevel * options.step)) * (mapWidth / paper.width)
					, offsetY = (previousY - e.pageY) / (1 + (currentLevel * options.step)) * (mapHeight / paper.height);					
				
				if (Math.abs(offsetX) > 5 || Math.abs(offsetY) > 5) {
					paper.setViewBox(
						Math.min(Math.max(0, paper._viewBox[0] + offsetX), (mapWidth - paper._viewBox[2])), 
						Math.min(Math.max(0, paper._viewBox[1] + offsetY), (mapHeight - paper._viewBox[3])),
						paper._viewBox[2],
						paper._viewBox[3]
					);
					
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
	$.fn.mapael.createLegend = function ($container, options, legendType, elems, scale) {
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
			if (typeof legendOptions.slices[i].display == 'undefined' || legendOptions.slices[i].display == true) {
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
						, scale * (legendOptions.slices[i].size)
						, scale * (legendOptions.slices[i].size)
					).attr(legendOptions.slices[i].attrs);
				} else {
					elem = paper.circle(
						legendOptions.marginLeft + scale * (legendOptions.slices[i].size / 2)
						, height + scale * (legendOptions.slices[i].size / 2)
						, scale * (legendOptions.slices[i].size / 2)
					).attr(legendOptions.slices[i].attrs);
				} 
				
				label = paper.text(
					legendOptions.marginLeft + scale * legendOptions.slices[i].size + legendOptions.marginLeftLabel
					, height + scale * (legendOptions.slices[i].size / 2)
					, legendOptions.slices[i].label
				).attr(legendOptions.labelAttrs);
				
				height += legendOptions.marginBottom + scale * legendOptions.slices[i].size;
				width = Math.max(width, legendOptions.marginLeft + scale * legendOptions.slices[i].size + legendOptions.marginLeftLabel + label.getBBox().width);
				
				if (legendOptions.hideElemsOnClick.enabled) {
					// Hide/show elements when user clicks on a legend element
					label.attr({cursor:'pointer'});
					
					$.fn.mapael.setHoverOptions(elem, legendOptions.slices[i].attrs, legendOptions.slices[i].attrs);
					$.fn.mapael.setHoverOptions(label, legendOptions.labelAttrs, legendOptions.labelAttrsHover);
					$.fn.mapael.setHover(paper, elem, label);
					
					label.hidden = false;
					(function(i, elem, label) {
						$(label.node).on('click', function() {
							if (!label.hidden) {
								label.animate({'opacity':0.5}, 300);
							} else {
								label.animate({'opacity':1}, 300);
							}
							
							for (var id in elems) {
								if ((typeof legendOptions.slices[i].min == 'undefined' || elems[id].value >= legendOptions.slices[i].min) 
									&& (typeof legendOptions.slices[i].max == 'undefined' || elems[id].value < legendOptions.slices[i].max)
								) {
									(function(id) {
										if (!label.hidden) {
											elems[id].mapElem.animate({'opacity':legendOptions.hideElemsOnClick.opacity}, 300, 'linear', function() {(legendOptions.hideElemsOnClick.opacity == 0) && elems[id].mapElem.hide();});
											elems[id].textElem && elems[id].textElem.animate({'opacity':legendOptions.hideElemsOnClick.opacity}, 300, 'linear', function() {(legendOptions.hideElemsOnClick.opacity == 0) && elems[id].textElem.hide();});
										} else {
											if (legendOptions.hideElemsOnClick.opacity == 0) {
												elems[id].mapElem.show();
												elems[id].textElem && elems[id].textElem.show();
											}
											elems[id].mapElem.animate({'opacity':typeof elems[id].mapElem.originalAttrs.opacity != "undefined" ? elems[id].mapElem.originalAttrs.opacity : 1}, 300);
											elems[id].textElem && elems[id].textElem.animate({'opacity':typeof elems[id].textElem.originalAttrs.opacity != "undefined" ? elems[id].textElem.originalAttrs.opacity : 1}, 300);
										}
									})(id);
								}
							}
							label.hidden = !label.hidden;
						});
					})(i, elem, label);
				}
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
	$.fn.mapael.getTextPosition = function(bbox, textPosition, margin) {
		var textX = 0
			, textY = 0
			, textAnchor = '';
			
		switch (textPosition) {
			case 'bottom' :
				textX = (bbox.x + bbox.x2) / 2;
				textY = bbox.y2 + margin;
				textAnchor = "middle";
				break;
			case 'top' :
				textX = (bbox.x + bbox.x2) / 2;
				textY = bbox.y - margin;
				textAnchor = "middle";
				break;
			case 'left' :
				textX = bbox.x - margin;
				textY = (bbox.y + bbox.y2) / 2;
				textAnchor = "end";
				break;
			case 'right' :
				textX = bbox.x2 + margin;
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
			if ((typeof legend.slices[i].min == 'undefined' || value >= legend.slices[i].min) 
				&& (typeof legend.slices[i].max == 'undefined' || value < legend.slices[i].max)
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
					position : 'inner'
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
					position : 'right'
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
				, labelAttrsHover : {
					fill : "#787878"
					, animDuration : 300
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
				, labelAttrsHover : {
					fill : "#787878"
					, animDuration : 300
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
