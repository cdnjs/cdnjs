if (window.jQuery) {
    console.log("Is jquery");
    if ($ == jQuery) {
        document.write("<script>(function ($) { $(document).ready(function() { $.getScript('//cdnjs.cloudflare.com/ajax/libs/probtn/1.0.1/javascripts/jquery.pep.min.js', function() {$.getScript('//cdnjs.cloudflare.com/ajax/libs/probtn/1.0.1/javascripts/jquery.fancybox.js', function () {$.getScript('https://pizzabtn.herokuapp.com/javascripts/probtn.js', function () {jQuery(document).ready(function($){$(document).StartButton({'mainStyleCss':'https://pizzabtn.herokuapp.com/stylesheets/probtn.css'});});})});});});})(window.jQuery);<\/script>");
    } else {
        document.write("<script>(function ($) {jQuery.noConflict();jQuery(document).ready(function() {jQuery.getScript('//cdnjs.cloudflare.com/ajax/libs/probtn/1.0.1/javascripts/jquery.pep.min.js', function() {jQuery.getScript('//cdnjs.cloudflare.com/ajax/libs/probtn/1.0.1/javascripts/jquery.fancybox.js', function () {jQuery.getScript('https://pizzabtn.herokuapp.com/javascripts/probtn.js', function () {jQuery(document).ready(function($){$(document).StartButton({'mainStyleCss':'https://pizzabtn.herokuapp.com/stylesheets/probtn.css'});});})});});});})(window.jQuery);<\/script>");
    }
} else {
    console.log("No jquery");
    document.write('<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js"><\/script>');
    document.write("<script>(function ($) {jQuery.noConflict();jQuery(document).ready(function() {jQuery.getScript('//cdnjs.cloudflare.com/ajax/libs/probtn/1.0.1/javascripts/jquery.pep.min.js', function() {jQuery.getScript('//cdnjs.cloudflare.com/ajax/libs/probtn/1.0.1/javascripts/jquery.fancybox.js', function () {jQuery.getScript('https://pizzabtn.herokuapp.com/javascripts/probtn.js', function () {jQuery(document).ready(function($){$(document).StartButton({'mainStyleCss':'https://pizzabtn.herokuapp.com/stylesheets/probtn.css'});});})});});});})(window.jQuery);<\/script>");
}
