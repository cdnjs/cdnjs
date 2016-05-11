/**
 * Tabslet | tabs jQuery plugin
 *
 * @copyright Copyright 2015, Dimitris Krestos
 * @license   Apache License, Version 2.0 (http://www.opensource.org/licenses/apache2.0.php)
 * @link      http://vdw.staytuned.gr
 * @version   v1.5.0
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

!function($,window,undefined){"use strict";$.fn.tabslet=function(options){var defaults={mouseevent:"click",attribute:"href",animation:!1,autorotate:!1,pauseonhover:!0,delay:2e3,active:1,container:!1,controls:{prev:".prev",next:".next"}},options=$.extend(defaults,options);return this.each(function(){var $this=$(this),_cache_li=[],_cache_div=[],_container=options.container?$(options.container):$this,_tabs=_container.find("> div");_tabs.each(function(){_cache_div.push($(this).css("display"))});var elements=$this.find("> ul li"),i=options.active-1;if(!$this.data("tabslet-init")){$this.data("tabslet-init",!0),options.mouseevent=$this.data("mouseevent")||options.mouseevent,options.attribute=$this.data("attribute")||options.attribute,options.animation=$this.data("animation")||options.animation,options.autorotate=$this.data("autorotate")||options.autorotate,options.pauseonhover=$this.data("pauseonhover")||options.pauseonhover,options.delay=$this.data("delay")||options.delay,options.active=$this.data("active")||options.active,options.container=$this.data("container")||options.container,_tabs.hide(),options.active&&(_tabs.eq(options.active-1).show(),$this.find("> ul li").eq(options.active-1).addClass("active"));var fn=eval(function(){$(this).trigger("_before"),$this.find("> ul li").removeClass("active"),$(this).addClass("active"),_tabs.hide(),i=elements.index($(this));var t=$(this).find("a").attr(options.attribute);return options.animation?_container.find(t).animate({opacity:"show"},"slow",function(){$(this).trigger("_after")}):(_container.find(t).show(),$(this).trigger("_after")),!1}),init=eval("$this.find('> ul li')."+options.mouseevent+"(fn)"),t,forward=function(){i=++i%elements.length,"hover"==options.mouseevent?elements.eq(i).trigger("mouseover"):elements.eq(i).click(),options.autorotate&&(clearTimeout(t),t=setTimeout(forward,options.delay),$this.mouseover(function(){options.pauseonhover&&clearTimeout(t)}))};options.autorotate&&(t=setTimeout(forward,options.delay),$this.hover(function(){options.pauseonhover&&clearTimeout(t)},function(){t=setTimeout(forward,options.delay)}),options.pauseonhover&&$this.on("mouseleave",function(){clearTimeout(t),t=setTimeout(forward,options.delay)}));var move=function(t){"forward"==t&&(i=++i%elements.length),"backward"==t&&(i=--i%elements.length),elements.eq(i).click()};$this.find(options.controls.next).click(function(){move("forward")}),$this.find(options.controls.prev).click(function(){move("backward")}),$this.on("destroy",function(){$(this).removeData().find("> ul li").each(function(t){$(this).removeClass("active")}),_tabs.each(function(t){$(this).removeAttr("style").css("display",_cache_div[t])})})}})},$(document).ready(function(){$('[data-toggle="tabslet"]').tabslet()})}(jQuery);