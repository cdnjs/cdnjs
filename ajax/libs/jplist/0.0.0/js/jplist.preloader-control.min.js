/**
* jPList - jQuery Data Grid Controls 5.2.0.6 - http://jplist.com 
* Copyright 2016 Miriam Zusin
*/
(function(){var b=function(a){a.observer.on(a.observer.events.statusesAppliedToList,function(d){a.$control.addClass("jplist-hide-preloader")});a.observer.on(a.observer.events.unknownStatusesChanged,function(d,b,c){a.$control.removeClass("jplist-hide-preloader")});a.observer.on(a.observer.events.knownStatusesChanged,function(b,c,e){a.$control.removeClass("jplist-hide-preloader")})},c=function(a){b(a);return jQuery.extend(this,a)};jQuery.fn.jplist.controls.Preloader=function(a){return new c(a)};jQuery.fn.jplist.controlTypes.preloader=
{className:"Preloader",options:{}}})();
