/*
 * jQuery mmenu Turbolinks wrapper
 * mmenu.frebsite.nl
 */
!function(n){var t="mmenu",o="turbolinks";n[t].wrappers[o]=function(){var o,r;n(document).on("turbolinks:before-visit",function(){r=n("html"),o=r.attr("class"),o=n.grep(o.split(/\s+/),function(n){return!/mm-/.test(n)}).join(" ")}).on("turbolinks:load",function(){"undefined"!=typeof r&&(r.attr("class",o),n[t].glbl=!1)})}}(jQuery);