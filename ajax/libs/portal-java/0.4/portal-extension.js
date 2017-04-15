/*
 * Portal extension
 * http://github.com/flowersinthesand/portal-java
 * 
 * Copyright 2012-2013, Donghwan Kim 
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
(function(portal) {
	portal.defaults.heartbeat = 20000;
	portal.defaults._xdrURL = portal.defaults.xdrURL;
	portal.defaults.xdrURL = function(url) {
		return portal.defaults._xdrURL.call(this, url) || url;
	};
})(window.portal);