/**
 * @license Angulartics v0.15.17
 * (c) 2013 Luis Farzati http://luisfarzati.github.io/angulartics
 * Universal Analytics update contributed by http://github.com/willmcclellan
 * License: MIT
 */
!function(a){"use strict";a.module("angulartics.google.analytics",["angulartics"]).config(["$analyticsProvider",function(a){a.settings.trackRelativePath=!0,a.registerPageTrack(function(a){window._gaq&&_gaq.push(["_trackPageview",a]),window.ga&&ga("send","pageview",a)}),a.registerEventTrack(function(a,b){if(b.value){var c=parseInt(b.value,10);b.value=isNaN(c)?0:c}window._gaq?_gaq.push(["_trackEvent",b.category,a,b.label,b.value,b.noninteraction]):window.ga&&(b.noninteraction?ga("send","event",b.category,a,b.label,b.value,{nonInteraction:1}):ga("send","event",b.category,a,b.label,b.value))})}])}(angular);