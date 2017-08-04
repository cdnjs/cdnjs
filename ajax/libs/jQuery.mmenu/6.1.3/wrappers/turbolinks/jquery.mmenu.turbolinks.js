/*
 * Turbolinks (5 and up) wrapper for jQuery mmenu
 * Include this file after including the jquery.mmenu plugin for default Turbolinks support.
 */
!function(n){var t,o,e="mmenu";n(document).on("turbolinks:before-visit",function(){o=n("html"),t=o.attr("class"),t=n.grep(t.split(/\s+/),function(n){return!/mm-/.test(n)}).join(" ")}),n(document).on("turbolinks:load",function(){"undefined"!=typeof o&&(o.attr("class",t),n[e].glbl=!1)})}(jQuery);