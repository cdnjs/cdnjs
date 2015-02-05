/*!
 * plugin for jmpress.js v0.4.1 dev
 *
 * Copyright 2012 Kyle Robinson Young @shama & Tobias Koppers @sokra
 * Licensed MIT
 * http://www.opensource.org/licenses/mit-license.php
 */

/*!
 * jmpress.presentation-mode plugin
 * Display a window for the presenter with notes and a control and view of the
 * presentation
 */
(function( $, document, window, undefined ) {

	'use strict';
	var $jmpress = $.jmpress;

	/* FUNCTIONS */
	function randomString() {
		return "" + Math.round(Math.random() * 100000, 0);
	}

	/* DEFAULTS */
	$jmpress("defaults").presentationMode = {
		use: true,
		url: "presentation-screen.html",
		notesUrl: false,
		transferredValues: ["userZoom", "userTranslateX", "userTranslateY"]
	};
	$jmpress("defaults").keyboard.keys[80] = "presentationPopup"; // p key

	/* HOOKS */
	$jmpress("afterInit", function( nil, eventData) {
		var current = eventData.current;

		current.selectMessageListeners = [];

		if(eventData.settings.presentationMode.use) {

			window.addEventListener("message", function(event) {
				// We do not test orgin, because we want to accept messages
				// from all orgins
				try {
					var json = JSON.parse(event.data);
					switch(json.type) {
					case "select":
						// TODO SECURITY filter targetId
						$.each(eventData.settings.presentationMode.transferredValues, function(idx, name) {
							eventData.current[name] = json[name];
						});
						$(eventData.jmpress).jmpress("select", {step: "#"+json.targetId, substep: json.substep}, json.reason);
						break;
					case "listen":
						current.selectMessageListeners.push(event.source);
						break;
					case "ok":
						clearTimeout(current.presentationPopupTimeout);
						break;
					case "read":
						try {
							event.source.postMessage(JSON.stringify({type: "url", url: window.location.href, notesUrl: eventData.settings.presentationMode.notesUrl}), "*");
						} catch(e) {
							$.error("Cannot post message to source: " + e);
						}
						break;
					default:
						throw "Unknown message type: " + json.type;
					}
				} catch(e) {
					$.error("Recieved message is malformed: " + e);
				}
			});
			try {
				if(window.parent && window.parent !== window) {
					window.parent.postMessage(JSON.stringify({
						"type": "afterInit"
					}), "*");
				}
			} catch(e) {
				$.error("Cannot post message to parent: " + e);
			}
		}
	});
	$jmpress("afterDeinit", function( nil, eventData) {
		if(eventData.settings.presentationMode.use) {
			try {
				if(window.parent && window.parent !== window) {
					window.parent.postMessage(JSON.stringify({
						"type": "afterDeinit"
					}), "*");
				}
			} catch(e) {
				$.error("Cannot post message to parent: " + e);
			}
		}
	});
	$jmpress("setActive", function( step, eventData) {
		var stepId = $(eventData.delegatedFrom).attr("id"),
			substep = eventData.substep,
			reason = eventData.reason;
		$.each(eventData.current.selectMessageListeners, function(idx, listener) {
			try {
				var msg = {
					"type": "select",
					"targetId": stepId,
					"substep": substep,
					"reason": reason
				};
				$.each(eventData.settings.presentationMode.transferredValues, function(idx, name) {
					msg[name] = eventData.current[name];
				});
				listener.postMessage(JSON.stringify(msg), "*");
			} catch(e) {
				$.error("Cannot post message to listener: " + e);
			}
		});
	});
	$jmpress("register", "presentationPopup", function() {
		function trySend() {
			jmpress.jmpress("current").presentationPopupTimeout = setTimeout(trySend, 100);
			try {
				popup.postMessage(JSON.stringify({type: "url", url: window.location.href, notesUrl: jmpress.jmpress("settings").presentationMode.notesUrl}), "*");
			} catch(e) {
			}
		}
		var jmpress = $(this),
			popup;
		if(jmpress.jmpress("settings").presentationMode.use) {
			popup = window.open($(this).jmpress("settings").presentationMode.url);
			jmpress.jmpress("current").presentationPopupTimeout = setTimeout(trySend, 100);
		}
	});
}(jQuery, document, window));
