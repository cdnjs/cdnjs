/*jslint indent: 2*/
/*global sinon*/
/**
 * Helps IE run the fake timers. By defining global functions, IE allows
 * them to be overwritten at a later point. If these are not defined like
 * this, overwriting them will result in anything from an exception to browser
 * crash.
 *
 * If you don't require fake timers to work in IE, don't include this file.
 *
 * @author Christian Johansen (christian@cjohansen.no)
 * @license BSD
 *
 * Copyright (c) 2010 Christian Johansen
 */
function setTimeout() {}
function clearTimeout() {}
function setInterval() {}
function clearInterval() {}
function Date() {}
function XMLHttpRequest() {}

// Reassign the original functions. Now their writable attribute
// should be true. Hackish, I know, but it works.
setTimeout = sinon.timers.setTimeout;
clearTimeout = sinon.timers.clearTimeout;
setInterval = sinon.timers.setInterval;
clearInterval = sinon.timers.clearInterval;
Date = sinon.timers.Date;
XMLHttpRequest = sinon.xhr.XMLHttpRequest || undefined;
