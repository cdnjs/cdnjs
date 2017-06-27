/**
 * @license Angulartics v0.17.0
 * (c) 2013 Luis Farzati http://luisfarzati.github.io/angulartics
 * Universal Analytics update contributed by http://github.com/willmcclellan
 * License: MIT
 */
!function(a){"use strict";a.module("angulartics.google.analytics",["angulartics"]).config(["$analyticsProvider",function(a){a.settings.trackRelativePath=!0,a.registerPageTrack(function(a){window._gaq&&_gaq.push(["_trackPageview",a]),window.ga&&ga("send","pageview",a)}),a.registerEventTrack(function(a,b){if(b&&b.category){if(b.value){var c=parseInt(b.value,10);b.value=isNaN(c)?0:c}if(window._gaq)_gaq.push(["_trackEvent",b.category,a,b.label,b.value,b.noninteraction]);else if(window.ga){for(var d={eventCategory:b.category||null,eventAction:a||null,eventLabel:b.label||null,eventValue:b.value||null,nonInteraction:b.noninteraction||null},e=1;20>=e;e++)b["dimension"+e.toString()]&&(d["dimension"+e.toString()]=b["dimension"+e.toString()]),b["metric"+e.toString()]&&(d["metric"+e.toString()]=b["metric"+e.toString()]);ga("send","event",d)}}})}])}(angular);