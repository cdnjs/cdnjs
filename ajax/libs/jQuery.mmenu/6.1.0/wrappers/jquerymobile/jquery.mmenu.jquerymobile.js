/*
 * jQuery Mobile wrapper for jQuery mmenu
 * Include this file after including the jquery.mmenu plugin for default jQuery Mobile support.
 */
!function(n){var e="mmenu",o=!1;n[e].defaults.onClick.close=!1,n[e].configuration.offCanvas.pageSelector="div.ui-page-active",n(window).load(function(){o=n(".mm-menu").data("mmenu")}),n(window).load(function(){n("body").on("click",".mm-menu a",function(e){e.isDefaultPrevented()||(e.preventDefault(),n("body").pagecontainer("change",this.href))})}),n(window).load(function(){o&&n("body").on("pagecontainerchange",function(n,e){o.close(),o.setPage(e.toPage)})})}(jQuery);