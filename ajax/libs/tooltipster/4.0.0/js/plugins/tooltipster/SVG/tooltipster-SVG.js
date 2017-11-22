(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define(["tooltipster"], function (a0) {
      return (factory(a0));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("tooltipster"));
  } else {
    factory(jQuery);
  }
}(this, function ($) {

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define(["jQuery"], function (a0) {
      return (factory(a0));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("jQuery"));
  } else {
    factory(jQuery);
  }
}(this, function ($) {

var pluginName = 'tooltipster.SVG';

$.tooltipster._plugin({
	name: pluginName,
	core: {
		__init: function() {
			
			$.tooltipster._on('init', function(event) {
				
				var win = $.tooltipster._env.window;
				
				if (	win.SVGElement
					&&	event.origin instanceof win.SVGElement
				) {
					
					// auto-activation of the plugin on the instance
					event.instance._plug(pluginName);
				}
			});
		}
	},
	instance: {
		__init: function(instance) {
			
			var self = this;
			
			//list of instance variables
			self.__instance = instance;
			
			// jQuery < v3.0's addClass and hasClass do not work on SVG elements.
			// However, $('.tooltipstered') does find elements having the class.
			if (!self.__instance._$origin.hasClass('tooltipstered')) {
				
				var c = self.__instance._$origin.attr('class') || '';
				
				if (c.indexOf('tooltipstered') == -1) {
					self.__instance._$origin.attr('class', c + ' tooltipstered');
				}
			}
			
			// if there is no content yet, let's look for a <title> child element
			if (self.__instance.content() === null) {
				
				// TODO: when there are several <title> tags (not supported in
				// today's browsers yet though, still an RFC draft), pick the right
				// one based on its "lang" attribute 
				var $title = self.__instance._$origin.find('title');
				
				if ($title[0]) {
					self.__instance.content($title.text());
				}
			}
			
			// rectify the geometry if SVG.js and its screenBBox plugin have been included
			self.__instance
				._on('geometry.'+ self.namespace, function(event) {
					
					var win = $.tooltipster._env.window;
					
					// SVG coordinates may need fixing but we need svg.screenbox.js
					// to provide it. SVGElement is IE8+
					if (win.SVG.svgjs) {
						
						if (!win.SVG.parser) {
							win.SVG.prepare();
						}
						
						var svgEl = win.SVG.adopt(event.origin);
						
						// not all figures need (and have) screenBBox
						if (svgEl && svgEl.screenBBox) {
							
							var bbox = svgEl.screenBBox();
							
							event.edit({
								height: bbox.height,
								left: bbox.x,
								top: bbox.y,
								width: bbox.width
							});
						}
					}
				})
				// if jQuery < v3.0, we have to remove the class ourselves
				._on('destroyed.'+ self.namespace, function() {
					self.destroy();
				});
		},
		
		__destroy: function() {
			
			if (!self.__instance._$origin.hasClass('tooltipstered')) {
				var c = self.__instance._$origin.attr('class').replace('tooltipstered', '');
				self.__instance._$origin.attr('class', c);
			}
			
			self.__instance._off('.'+ self.namespace);
		}
	}
});

/* a build task will add "return $;" here */
return $;

}));


}));
