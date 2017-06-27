(function($) {
	
	var has_VML = document.namespaces;
	var has_canvas = document.createElement('canvas');
	var has_canvas = has_canvas && has_canvas.getContext;
	
	if(!(has_canvas || has_VML)) {
		$.fn.maphilight = function() {};
		return;
	}
	
	var create_canvas_for, add_shape_to, clear_canvas;
	if(has_canvas) {
		var fader = function(element, opacity, interval) {
			if(opacity <= 100) {
				element.style.opacity = opacity/100;
				window.setTimeout(fader, 10, element, opacity + 10, 10);
			}
		}
		
		var hex_to_decimal = function(hex) {
			return Math.max(0, Math.min(parseInt(hex, 16), 255));
		}
		var css3color = function(color, opacity) {
			return 'rgba('+hex_to_decimal(color.substr(0,2))+','+hex_to_decimal(color.substr(2,2))+','+hex_to_decimal(color.substr(4,2))+','+opacity+')';
		}
		create_canvas_for = function(img) {
			var c = $('<canvas style="width:'+img.width+'px;height:'+img.height+'px;"></canvas>').get(0);
			c.getContext("2d").clearRect(0, 0, c.width, c.height);
			return c;
		}
		add_shape_to = function(canvas, shape, coords, options) {
			var context = canvas.getContext('2d');
			context.beginPath();
			if(shape == 'rect') {
				context.rect(coords[0], coords[1], coords[2] - coords[0], coords[3] - coords[1]);
			} else if(shape == 'poly') {
				context.moveTo(coords[0], coords[1]);
				for(i=2; i < coords.length; i+=2) {
					context.lineTo(coords[i], coords[i+1]);
				}
			} else if(shape == 'circ') {
				context.arc(coords[0], coords[1], coords[2], 0, Math.PI * 2, false);
			}
			context.closePath();
			if(options.fill) {
				context.fillStyle = css3color(options.fillColor, options.fillOpacity);
				context.fill();
			}
			if(options.stroke) {
				context.strokeStyle = css3color(options.strokeColor, options.strokeOpacity);
				context.lineWidth = options.strokeWidth;
				context.stroke();
			}
			if(options.fade) {
				fader(canvas, 0);
			}
		}
		var clear_canvas = function(canvas, area) {
			canvas.getContext('2d').clearRect(0, 0, canvas.width,canvas.height);
		}
	} else {
		var stylesheet = document.createStyleSheet();
		stylesheet.addRule("v\\:*", "behavior: url(#default#VML); antialias: true;"); 
		document.namespaces.add("v", "urn:schemas-microsoft-com:vml"); 
		
		create_canvas_for = function(img) {
			return $('<var style="zoom:1;overflow:hidden;display:block;width:'+img.width+'px;height:'+img.height+'px;"></var>').get(0);
		};
		add_shape_to = function(canvas, shape, coords, options) {
			var fill = '<v:fill color="#'+options.fillColor+'" opacity="'+(options.fill ? options.fillOpacity : 0)+'" />';
			var stroke = (options.stroke ? 'strokeweight="'+options.strokeWidth+'" stroked="t" strokecolor="#'+options.strokeColor+'"' : 'stroked="f"');
			var opacity = '<v:stroke opacity="'+options.strokeOpacity+'"/>';
			if(shape == 'rect') {
				canvas.innerHTML = '<v:rect filled="t" '+stroke+' style="zoom:1;margin:0;padding:0;display:block;position:absolute;left:'+coords[0]+'px;top:'+coords[1]+'px;width:'+(coords[2] - coords[0])+'px;height:'+(coords[3] - coords[1])+'px;">'+fill+opacity+'</v:rect>';
			} else if(shape == 'poly') {
				var path = coords.join(',');
				canvas.innerHTML = '<v:shape filled="t" '+stroke+' coordorigin="0,0" coordsize="'+canvas.width+','+canvas.height+'" path="m '+coords[0]+','+coords[1]+' l '+path+' x e" style="zoom:1;margin:0;padding:0;display:block;position:absolute;top:0px;left:0px;width:'+canvas.width+'px;height:'+canvas.height+'px;">'+fill+opacity+'</v:shape>'; 
			} else if(shape == 'circ') {
				canvas.innerHTML = '<v:oval filled="t" '+stroke+' style="zoom:1;margin:0;padding:0;display:block;position:absolute;left:'+(coords[0] - coords[2])+'px;top:'+(coords[1] - coords[2])+'px;width:'+(coords[2]*2)+'px;height:'+(coords[2]*2)+'px;">'+fill+opacity+'</v:oval>';
			}
		}
		clear_canvas = function(canvas) {
			canvas.innerHTML = '';
		}
	}
	var shape_from_area = function(area) {
		var coords = area.getAttribute('coords').split(',');
		for (i=0; i < coords.length; i++) { coords[i] = parseFloat(coords[i]); }
		return [area.getAttribute('shape').toLowerCase().substr(0,4), coords];
	}
	
	var canvas_attributes = {
		position: 'absolute',
		left: 0,
		top: 0,
		padding: 0
	}
	
	$.fn.maphilight = function(opts) {
		opts = $.extend({}, $.fn.maphilight.defaults, opts);
		return this.each(function() {
			var img = $(this);
			var options = $.metadata ? $.extend({}, opts, img.metadata()) : opts;
			var map = $('map[name="'+img.attr('usemap').substr(1)+'"]');
			if(!(img.is('img') && img.attr('usemap') && map.size() > 0 && !img.hasClass('maphilighted'))) { return; }
			img.wrap($('<div style="background:url('+this.src+');position: relative; padding: 0; width: '+this.width+'px; height: '+this.height+'px"></div>'));
			img.css('opacity', 0).css('border', 0)
			
			var canvas = create_canvas_for(this);
			$(canvas).css(canvas_attributes);
			canvas.height = this.height;
			canvas.width = this.width;
			
			if($.browser.msie) {
				// Moving the canvas "down" so the mouseover functions will reach the <area>s in IE.  (IE-only because this does the exact opposite in Firefox.)
				img.css('filter', 'Alpha(opacity=0)');
				$(canvas).css('z-index', '-1');
			}
			
			$(map).find('area[coords]')
				.mouseover(function(e) {
					var shape = shape_from_area(this);
					add_shape_to(canvas, shape[0], shape[1], ($.metadata ? $.extend({}, options, $(this).metadata()) : options));
				}).mouseout(function(e) {
					clear_canvas(canvas);
				});
			
			img.before(canvas); // if we put this after, the mouseover events wouldn't fire.
			img.addClass('maphilighted');
		});
	}
	$.fn.maphilight.defaults = {
		fill: true,
		fillColor: '000000',
		fillOpacity: 0.2,
		stroke: true,
		strokeColor: 'ff0000',
		strokeOpacity: 1,
		strokeWidth: 1,
		fade: true
	}
})(jQuery);
