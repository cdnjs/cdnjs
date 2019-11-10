/*
 * jQuery Mobile wrapper for jQuery mmenu
 * Include this file after including the jquery.mmenu plugin for default jQuery Mobile support.
 */
!function(n){var e="mmenu",o=[];n[e].defaults.onClick.close=!1,n[e].configuration.offCanvas.pageSelector="div.ui-page-active",n(window).load(function(){n(".mm-menu").each(function(){o.push(n(this).data("mmenu"))})}),n(window).load(function(){n("body").on("click",".mm-menu a",function(e){e.isDefaultPrevented()||(e.preventDefault(),n("body").pagecontainer("change",this.href))}),n("body").on("pagecontainerchange",function(n,e){for(var a=0;a<o.length;a++)o[a]&&"function"==typeof o[a].close&&(o[a].close(),o[a].setPage(e.toPage))})})}(jQuery);