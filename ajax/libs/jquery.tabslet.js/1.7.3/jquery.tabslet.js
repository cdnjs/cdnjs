/**
 * Tabslet | tabs jQuery plugin
 *
 * @copyright Copyright 2015, Dimitris Krestos
 * @license   Apache License, Version 2.0 (http://www.opensource.org/licenses/apache2.0.php)
 * @link      http://vdw.staytuned.gr
 * @version   v1.7.3
 */

  /* Sample html structure

  <div class='tabs'>
    <ul class='horizontal'>
      <li><a href="#tab-1">Tab 1</a></li>
      <li><a href="#tab-2">Tab 2</a></li>
      <li><a href="#tab-3">Tab 3</a></li>
    </ul>
    <div id='tab-1'></div>
    <div id='tab-2'></div>
    <div id='tab-3'></div>
  </div>

  OR

  <div class='tabs'>
    <ul class='horizontal'>
      <li><a href="#tab-1">Tab 1</a></li>
      <li><a href="#tab-2">Tab 2</a></li>
      <li><a href="#tab-3">Tab 3</a></li>
    </ul>
  </div>
  <div id='tabs_container'>
    <div id='tab-1'></div>
    <div id='tab-2'></div>
    <div id='tab-3'></div>
  </div>

  */

;(function($, window, undefined) {
  "use strict";

  $.fn.tabslet = function(options) {

    var defaults = {
      mouseevent:   'click',
      activeclass:  'active',
      attribute:    'href',
      animation:    false,
      autorotate:   false,
      deeplinking:  false,
      pauseonhover: true,
      delay:        2000,
      active:       1,
      container:    false,
      controls:     {
        prev: '.prev',
        next: '.next'
      }
    };

    var options = $.extend(defaults, options);

    return this.each(function() {

      var $this      = $(this), _cache_li = [], _cache_div = [];
      var _container = options.container ? $(options.container) : $this;
      var _tabs      = _container.find('> div');

      // Caching
      _tabs.each(function() { _cache_div.push($(this).css('display')); });

      // Autorotate
      var elements = $this.find('> ul > li'), i = options.active - 1; // ungly

      if ( !$this.data( 'tabslet-init' ) ) {

        $this.data( 'tabslet-init', true );

        $this.opts = [];

        $.map( ['mouseevent', 'activeclass', 'attribute', 'animation', 'autorotate', 'deeplinking', 'pauseonhover', 'delay', 'container'], function( val, i ) {
          $this.opts[val] = $this.data(val) || options[val];
        });

        $this.opts['active'] = $this.opts.deeplinking ? deep_link() : ( $this.data('active') || options.active )

        _tabs.hide();

        if ( $this.opts.active ) {
          _tabs.eq($this.opts.active - 1).show();
          elements.eq($this.opts.active - 1).addClass(options.activeclass);
        }

        var fn = eval(

          function(e, tab) {
            var _this = tab ? elements.find('a[' + $this.opts.attribute + '="' + tab +'"]').parent() : $(this);

            _this.trigger('_before');

            elements.removeClass(options.activeclass);
            _this.addClass(options.activeclass);
            _tabs.hide();

            i = elements.index(_this);

            var currentTab = tab || _this.find('a').attr($this.opts.attribute);

            if ($this.opts.deeplinking) location.hash = currentTab;

            if ($this.opts.animation) {

              _container.find(currentTab).animate( { opacity: 'show' }, 'slow', function() {
                _this.trigger('_after');
              });

            } else {

              _container.find(currentTab).show();
              _this.trigger('_after');

            }

            return false;

          }

        );

        var init = eval("elements." + $this.opts.mouseevent + "(fn)");

        init;

        var t;

        var forward = function() {

          i = ++i % elements.length; // wrap around

          $this.opts.mouseevent == 'hover' ? elements.eq(i).trigger('mouseover') : elements.eq(i).click();

          if ($this.opts.autorotate) {

            clearTimeout(t);

            t = setTimeout(forward, $this.opts.delay);

            $this.mouseover(function () {

              if ($this.opts.pauseonhover) clearTimeout(t);

            });

          }

        }

        if ($this.opts.autorotate) {

          t = setTimeout(forward, $this.opts.delay);

          $this.hover(function() {

            if ($this.opts.pauseonhover) clearTimeout(t);

          }, function() {

            t = setTimeout(forward, $this.opts.delay);

          });

          if ($this.opts.pauseonhover) $this.on( "mouseleave", function() { clearTimeout(t); t = setTimeout(forward, $this.opts.delay); });

        }

        function deep_link() {

          var ids = [];

          elements.find('a').each(function() { ids.push($(this).attr($this.opts.attribute)); });

          var index = $.inArray(location.hash, ids)

          if (index > -1) {

            return index + 1

          } else {

            return ($this.data('active') || options.active)

          }

        }

        var move = function(direction) {

          if (direction == 'forward') i = ++i % elements.length; // wrap around

          if (direction == 'backward') i = --i % elements.length; // wrap around

          elements.eq(i).click();

        }

        $this.find(options.controls.next).click(function() {
          move('forward');
        });

        $this.find(options.controls.prev).click(function() {
          move('backward');
        });

        $this.on ('show', function(e, tab) {
          fn(e, tab);
        });

        $this.on ('next', function() {
          move('forward');
        });

        $this.on ('prev', function() {
          move('backward');
        });

        $this.on ('destroy', function() {
          $(this)
            .removeData()
            .find('> ul li').each( function(i) {
              $(this).removeClass(options.activeclass);
            });
          _tabs.each( function(i) {
            $(this).removeAttr('style').css( 'display', _cache_div[i] );
          });
        });

      }

    });

  };

  $(document).ready(function () { $('[data-toggle="tabslet"]').tabslet(); });

})(jQuery);
