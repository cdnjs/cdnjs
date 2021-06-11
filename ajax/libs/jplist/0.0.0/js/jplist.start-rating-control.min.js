/**
* jPList - jQuery Data Grid Controls 5.2.0.6 - http://jplist.com 
* Copyright 2016 Miriam Zusin
*/
(function(){var c=function(a){a.params={total:Number(a.$control.attr("data-total"))||0,rating:Number(a.$control.attr("data-rating"))||0};if(0>=a.params.total)a.$control.addClass("jplist-hidden");else{var b="";a.controlOptions&&jQuery.isFunction(a.controlOptions.render)&&(b=a.controlOptions.render({total:a.params.total,rating:a.params.rating,one:1===a.params.total,percent:100*a.params.rating/5}),a.$control.html(b))}return jQuery.extend(this,a)};jQuery.fn.jplist.itemControls.StarRating=function(a){return new c(a)};
jQuery.fn.jplist.itemControlTypes["star-rating"]={className:"StarRating",options:{render:function(a){var b;b="";window.Handlebars&&(b=window.Handlebars.compile(jQuery("#star-rating-template").html()),b=b(a));return b}}}})();
