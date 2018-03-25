/**
 * simpleParallax
 * ------------
 * Version : 2.0.0
 * Website : https://anakao-theme.com/simpleparallax/
 * Repo    : https://github.com/geosenna/simpleParallax
 * Author  : Geoffrey Signorato (@geosenna)
 */

;(function (factory) {
    
    if(typeof module === "object" && typeof module.exports === "object") {
        factory(require("jquery"), window, document);
    } else {
        factory(jQuery, window, document);
    }

}(function($, window, document, undefined) {

    'use strict';
    
    // Detect Vendor Prefix
    // via: https://davidwalsh.name/vendor-prefix
    // Detect css transform
    var cssTransform = (function(){
        var prefixes = 'transform webkitTransform mozTransform oTransform msTransform'.split(' ')
        , el = document.createElement('div')
        , cssTransform
        , i = 0
        while( cssTransform === undefined ){ 
            cssTransform = document.createElement('div').style[prefixes[i]] != undefined ? prefixes[i] : undefined
            i++
        }
        return cssTransform
    })();
    
    //requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
    //via: https://gist.github.com/paulirish/1579671
    (function() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                    || window[vendors[x]+'CancelRequestAnimationFrame'];
        }
    
        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
                timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
    
        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
    }());

    var animationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function(callback){ window.setTimeout(callback, 1000/60) }

    var pluginName = 'simpleParallax',
        edge = 20,
        lastPosition = -1,
        isInit = false;
    
    function SimpleParallax ( element, options ) {

        this.element = element;
        this.$element = $(this.element);
        this._name = pluginName;
        this._defaults = $.fn.simpleParallax.defaults;
        this.options = $.extend( {}, this._defaults, options );

        this.init();
    }

    $.extend(SimpleParallax, {

        getViewportOffset: function() {
            
            var win = $(window);

            this.viewportHeight = win.outerHeight(),
            this.viewportTop = win.scrollTop() - edge,
            this.viewportBottom = win.scrollTop() + SimpleParallax.viewportHeight  + edge;
    
        }

    });

    $.extend(SimpleParallax.prototype, {

        occurence: [],

        //initialization of elements
        init: function () {

            var plugin = this;

            plugin.wrapElement();

            this.occurence.push(plugin);

            if (!isInit) {
                plugin.proceedElement();
                isInit = true;
            }
            
        },

        //wrap the element with the .simpleParallax div and apply overflow hidden to hide the image excedant (cause of the scale)
        wrapElement: function() {

            var plugin = this;

            if ( plugin.$element.closest('picture').length ) {

                plugin.$elementToWrap = plugin.$element.parent('picture');

            } else {

                plugin.$elementToWrap = plugin.$element;

            } 

            plugin.$elementToWrap.wrap('<div class="simpleParallax" style="overflow:hidden"></div>');

            plugin.$elementContainer = plugin.$element.closest('.simpleParallax');
        },

        //unwrap the element from the .simpleParallax div
        unWrapElement: function(element) {

            var plugin = this;

            element.unwrap('simpleParallax');
        },

        //calculate the current element offset
        getElementOffset: function() {

            var plugin = this,
                elem = plugin.$elementContainer[0];

            plugin.elementHeight = elem.offsetHeight;
            plugin.elementTopX = elem.offsetTop;
            plugin.elementBottomX = plugin.elementTopX + plugin.elementHeight;

        },

        //check if the current element is visible in the Viewport
        isVisible: function() {

            var plugin = this;
            
            return plugin.elementBottomX > SimpleParallax.viewportTop && plugin.elementTopX  < SimpleParallax.viewportBottom;

        },

        calculateRange: function() {

            var plugin = this;

            //get the real height of the image with the scaling apply to it
            plugin.elementImageHeight = plugin.$element[0].getBoundingClientRect().height;

            //range is calculate with the extra space of the scaled image comparing to its container
            plugin.rangeMax = Math.abs(plugin.elementHeight - plugin.elementImageHeight);

            if ( plugin.options.orientation === 'down' || plugin.options.orientation === 'right' ) {
                plugin.rangeMax *= -1;
            }
        },

        //calculate the percentage and the translate value to apply on the element
        calculate: function() {

            var plugin = this,
                
            //get current percentage of the current alement
            percentageData = plugin.$element.data(pluginName+'_percentage'),

            //calculate the % position of the element comparing to the viewport
            percentage = ((SimpleParallax.viewportBottom - edge) - plugin.elementTopX) / ((SimpleParallax.viewportHeight + plugin.elementHeight) / 100);

            //sometime the percentage exceeds 100 or goes below 0
            if (percentage > 100) percentage = 100;
            else if (percentage < 0) percentage = 0;

            //sometime the same percentage if returned, to avoid this if the old percentage is equal to the new one, we don't do aything
            if (percentageData === percentage) return false;

            plugin.calculateRange();

            //transform this % into the max range of the element
            plugin.translateValue = ((percentage / 100) * plugin.rangeMax) - (plugin.rangeMax / 2);

            //apply the new percentage to the data of the current element
            plugin.$element.data(pluginName+'_percentage', percentage);
            
            return true;
        },

        animate: function() {

            var plugin = this,
                inlineCss,
                translateAxe;

            //check the orientation to know which of X or Y axe should we use
            if (plugin.options.orientation == 'up' || plugin.options.orientation == 'down' ) {

                translateAxe = 'translateY';

            } else if (plugin.options.orientation == 'left' || plugin.options.orientation == 'right' ) {

                translateAxe = 'translateX';

            }

            //prepare style to apply to the element
            inlineCss = 'scale('+plugin.options.scale+') '+translateAxe+'('+plugin.translateValue+'px)';

            //add style depending the current vendor CSS of the browser
            plugin.$element[0].style[cssTransform] = inlineCss;
        
        },

        proceedElement: function() {

            var plugin = this;

            if (lastPosition === window.pageYOffset) {

                animationFrame(plugin.proceedElement.bind(plugin));

                return;

            } else {

                lastPosition = window.pageYOffset;

                $.each( this.occurence, function(index) {

                    if (index === 0) SimpleParallax.getViewportOffset();
                    
                    this.getElementOffset();

                    if ( !this.isVisible() ) return;

                    var needAnimate = this.calculate();
    
                    if (!needAnimate) return;
    
                    this.animate();
        
                });

                animationFrame(plugin.proceedElement.bind(plugin));           
            
            }


        },

        destroy: function() {

            var plugin = this;

            $('.simpleParallax').each(function() {
                $(this).find('img')[0].style[cssTransform] = '';
                $(this).removeData();
                plugin.unWrapElement($(this));
            })

            plugin.unbindEvents();

        },

    });

    $.fn.simpleParallax = function ( options ) {
        this.each(function() {
            if ( !$.data( this, pluginName ) ) {
                $.data( this, pluginName, new SimpleParallax( this, options ) );
            }
        });

        return this;
    };

    $.fn.simpleParallax.defaults = {
        'orientation': 'up',
        'scale': '1.2'
    };

}));
