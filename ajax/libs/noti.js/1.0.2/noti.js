/**
* noti.js
* https://github.com/j-l-n/noti.js
*
* @author: j-l-n (https://github.com/j-l-n)
* @version: 1.0.2
* @lastModified: 29/10/2014 (DD/MM/YYYY)
*/




(function(window){
	"use strict";


	//helper function to check if document has focus
	var isFocused;
	isFocused = function isFocused(){
		var hasFocus;
		if(typeof window.opera !== "undefined"){ //Opera does not support document.hasFocus() (more information: http://caniuse.com/#feat=pagevisibility)
			if(typeof document.hidden !== "undefined"){ //Opera 12.1 and ≥ 20 support the standard Page Visibility API
				hasFocus = !document.hidden;
			}
			else if(typeof document.webkitHidden !== "undefined"){ //Opera 15-19: Page Visibility API supported with prefix "webkit"
				hasFocus = !document.webkitHidden;
			}
		}
		else{
			hasFocus = document.hasFocus();
		}
		return hasFocus;
	};


	var noti;
	noti = {
		embedStyleSheet: function embedStyleSheet(){
			var embed, isEmbedded, stylesheets;
			embed = true;
			isEmbedded = /noti_fallbackNotification(|.min)\.css/i;
			stylesheets = document.getElementsByTagName("link");
			for(var i = 0; i < stylesheets.length; i++){
				if(stylesheets[i].href.search(isEmbedded) !== -1){
					embed = false;
					break;
				}
			}
			if(embed === true){
				var fallbackNotificationStyles = document.createElement("link");
				fallbackNotificationStyles.href="//raw.githubusercontent.com/j-l-n/noti.js/master/assets/noti_fallbackNotification.css";
				fallbackNotificationStyles.type="text/css";
				fallbackNotificationStyles.rel="stylesheet";
				document.getElementsByTagName("head")[0].appendChild(fallbackNotificationStyles);
			}
		},
		
		checkSupport: function checkSupport(){
			var notificationsSupported;
			if("Notification" in window){
				notificationsSupported = true;
			}
			else {
				notificationsSupported = false;
			}
			return notificationsSupported;
		},
		
		requestPermission: function requestPermission(){
			var askForPermission;
			askForPermission = function askForPermission(){
				document.removeEventListener("mousemove", askForPermission, false);
				document.removeEventListener("keypress", askForPermission, false);
				if(window.Notification.permission === "default"){
					console.log("Asking for notification permission...");
					window.Notification.requestPermission(function(){
						if(window.Notification.permission === "granted"){
							console.info("Permission for web notifications granted.");
						}
						else if(window.Notification.permission === "denied"){
							console.warn("Permission for web notifications denied.");
						}
					});
				}
				else if(window.Notification.permission === "granted"){
					console.info("Permission for web notifications granted.");
				}
				else {
					console.warn("Permission for web notifications denied.");
				}
			};
			document.addEventListener("mouseover", askForPermission, false);
			document.addEventListener("keypress", askForPermission, false); //just to be sure: if user navigates via keyboard
		},
		
		create: function create(notificationArguments){
			//set up notification
			if(typeof notificationArguments !== "object"){
				throw new Error("No arguments were passed to function.");
			}
			else if(typeof notificationArguments.title !== "string" || typeof notificationArguments.message !== "string"){
				throw new Error("Title or content of notification is undefined.");
			}
			var debugMode;
			debugMode = false;
			if("alwaysFallback" in notificationArguments){
				if(notificationArguments.alwaysFallback === true){
					debugMode = true;
					console.warn("noti.js is running in „allways fallback“ mode.");
				}
			}
			var changeTitle;
			changeTitle = function(){
				var interval;
				if(notificationArguments.changeTitle_interval){
					interval = notificationArguments.changeTitle_interval * 1000;
				}
				else {
					interval = 1500; //default interval: change title all 1.5s
				}
				var originalTitle;
				originalTitle = document.title;
				var titleChangingInterval;
				titleChangingInterval = setInterval(function(){
					if(isFocused()){
						clearInterval(titleChangingInterval);
						document.title = originalTitle;
					}
					else {
						var newTitle;
						if(document.title === originalTitle){
							if(notificationArguments.changeTitle_prefix){
								newTitle = notificationArguments.changeTitle_prefix + " " + originalTitle;
							}
							else {
								newTitle = notificationArguments.title + " - " + originalTitle;
							}
						}
						else {
							newTitle = originalTitle;
						}
						document.title = newTitle;
					}
				}, interval);
			};
			var notificationId;
			notificationId = new Date().getTime();
			changeTitle();
			if(noti.checkSupport() === true && debugMode === false){
				if(window.Notification.permission === "granted"){
					var notificationOptions, notificationSound;
					notificationOptions = {
						dir: "auto",
						lang: "de",
						body: notificationArguments.message,
						tag: notificationId
					};
					if(notificationArguments.icon){
						notificationOptions.icon = notificationArguments.icon;
					}
					if(typeof notificationArguments.callback !== "function"){
						notificationArguments.callback = false;
					}
					notificationSound = noti.playSound(notificationArguments);
					if(notificationSound !== false){
						notificationSound.onloadeddata = function(){
							notificationSound.play();
						};
					}
					noti.showWebNotification(notificationArguments.title, notificationOptions, notificationArguments.callback);
				}
				else{ //if permission for web notifications denied
					console.info("Permission for web notification denied. Falling back to alert.");
					noti.createFallbackNotification(notificationId, notificationArguments);
				}
			}
			else{ //if web notifications are not supported
				console.info("Your browser does not support web notifications! Falling back to alert.");
				noti.createFallbackNotification(notificationId, notificationArguments);
			}
			return notificationId;
		},
		
		callback: function callback(id, callbackFunction){ //this function is called when user closes notification
			console.log("Closed notification " + id);
			if(callbackFunction !== false){ //if user defined callback, call that function
				callbackFunction();
			}
		},
		
		showWebNotification: function showWebNotification(title, options, callback){
			var notification;
			notification = new window.Notification(title, options);
			if(typeof window.mozInnerScreenX !== "undefined"){ //if browser is Firefox
				//workaround for bug 875114 ("Web notifications should optionally be permanent, not automatically close after 4 seconds"
				//more information: https://bugzilla.mozilla.org/show_bug.cgi?id=875114
				notification.onshow = function(){
					console.log("Showing notification " + notification.tag);
					var showAgain = setTimeout(function(){
						notification.onclose = function(){}; //remove event listener so that close event is not fired if notification closed by script
						notification.close(); //close notification and...
						noti.showWebNotification(title, options, callback); //...create new
					}, 3700);
					notification.onclose = function(){ //close event is fired (closed by user)
						clearTimeout(showAgain); //stop continually sending the notification again
						noti.callback(notification.tag, callback);
					};
				};
			}
			else { //other browser with support for web notification
				notification.onshow = function(){
					console.log("Showing notification " + notification.tag);
				};
				notification.onclose = function(){
					noti.callback(notification.tag, callback);
				};
			}	
		},
		
		createFallbackNotification: function createFallbackNotification(notificationId, notificationArguments){
			var notificationTitle, notificationMessage, notificationContainer, notification, icon, contentTitle, contentMessage, closeButton, notificationSound;
			notificationTitle = notificationArguments.title;
			notificationMessage = notificationArguments.message;
			if(!notificationArguments.icon){
				notificationArguments.icon = "data:image/png;base64,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";
			}
			if(typeof notificationArguments.callback !== "function"){
				notificationArguments.callback = false;
			}
			notificationContainer = document.getElementById("notification-container");
			if(notificationContainer === null){
				notificationContainer = document.createElement("div");
				notificationContainer.id = "notification-container";
				document.body.appendChild(notificationContainer);
			}
			notification = document.createElement("div");
			notification.className = "notification";
			notification.id = notificationId;
			notification.innerHTML = '<div class="notification-icon"></div><div class="notification-content"><div class="notification-content-title"></div><div class="notification-content-message">/div></div></div><div class="notification-close"><div class="closeButton" title="close notification"></div></div>';
			if(notificationContainer.firstChild === null){
				notificationContainer.appendChild(notification);
			}
			else{
				notificationContainer.insertBefore(notification, notificationContainer.firstChild);
			}
			icon = document.createElement("img");
			icon.src = notificationArguments.icon;
			notification.querySelector(".notification-icon").appendChild(icon);
			contentTitle = notification.querySelector(".notification-content-title");
			contentMessage = notification.querySelector(".notification-content-message");
			if("textContent" in notification === true){
				contentTitle.textContent = notificationTitle;
				contentMessage.textContent = notificationMessage;
			}
			else{
				contentTitle.innerText = notificationTitle;
				contentMessage.innerText = notificationMessage;
			}
			if(contentTitle.offsetWidth > 280){ //show full title of message on hover
				contentTitle.title = notificationTitle;
			}
			contentTitle.style.display = "block"; //display:inline was needed to calculate correct offsetWidth
			if(contentMessage.offsetHeight === 80){
				contentMessage.style.cursor = "url(data:image/x-icon;base64,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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAsLCw/7CwsP+wsLD/sLCw/7CwsP+wsLD/sLCw/7CwsP8AAABVAAAAOQAAABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwsLD/sLCw/7CwsP+wsLD/sLCw/7CwsP+wsLD/sLCw/wAAAFUAAAA5AAAAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALCwsP+wsLD/sLCw/7CwsP+wsLD/sLCw/7CwsP+wsLD/AAAAVQAAADkAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAsLCw/7CwsP+wsLD/sLCw/7CwsP+wsLD/sLCw/7CwsP8AAABVAAAAOQAAABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwsLD/sLCw/7CwsP+wsLD/sLCw/7CwsP+wsLD/sLCw/wAAAFUAAAA5AAAAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALCwsP+wsLD/sLCw/7CwsP+wsLD/sLCw/7CwsP+wsLD/AAAAVQAAADkAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAsLCw/7CwsP+wsLD/sLCw/7CwsP+wsLD/sLCw/7CwsP8AAABVAAAAOQAAABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwsLD/sLCw/7CwsP+wsLD/sLCw/7CwsP+wsLD/sLCw/wAAAFUAAAA5AAAAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPz8/P/8/Pz//Pz8//z8/P/8/Pz//Pz8//z8/P/8/Pz/AAAAVQAAADkAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/Pz8/7a2tv+Xl5f/l5eX/5eXl/+Xl5f/srKy//z8/P8AAABVAAAAOQAAABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8/Pz/vr6+/5mZmf+Xl5f/l5eX/5iYmP+3t7f/7Ozs/wAAAFMAAAA3AAAAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPj4+P/d3d3/wcHB/5eXl/+Xl5f/vr6+/9nZ2f/19fX/AAAATAAAADMAAAAZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/f39//f39//l5eX/u7u7/7u7u//g4OD/9vb2//z8/P8AAAA4AAAAJQAAABMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+/v7//Pz8//T09P/j4+P/4eHh//Ly8v/7+/v//v7+/wAAABwAAAATAAAACQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////////////+zs7P/s7Oz/////////////////AAAACAAAAAUAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////////////4B///+Af///gH///4B///+Af///gH///4B///+Af///gH///4B///+Af///gH///4B///+Af///gH///4B///+Af///gH///4B///+Af///gH///4B///+Af///gH///4B///+Af//////////////////8=), all-scroll";
			}
			closeButton = notification.querySelector(".notification-close");
			closeButton.onclick = function(){
				if(supportsCSSAnimation === false){
					notificationContainer.removeChild(notification);
					noti.callback(notificationId, notificationArguments.callback);
				}
				else{
					//show close animation before removing from DOM
					notification.className = "notification close";
					closeButton.style.display = "none";
					setTimeout(function(){
						notificationContainer.removeChild(notification);
						noti.callback(notificationId, notificationArguments.callback);
					}, 1000);
				}
			};
			notificationSound = noti.playSound(notificationArguments);
			if(notificationSound !== false){
				notificationSound.onloadeddata = function(){
					notificationSound.play();
				};
			}
			window.focus(); //make tab flashing in some browsers - IE opens the window if minimized but not if another tab has the focus
			if(!notificationArguments.dontShowAlert){  //show alert after specified time in order to get focus and thus users attention if he had not noticed the notification before
				if(!notificationArguments.showAlertAfter){
					notificationArguments.showAlertAfter = 10; //default: 10min
				}
				var showAlertAfter, alertTimer;
				showAlertAfter = notificationArguments.showAlertAfter * 60000;
				alertTimer = setTimeout(function(){
					alert("New Notification!");
				}, showAlertAfter);
				var checkFocus;
				checkFocus = setInterval(function(){
					if(isFocused()){
						clearTimeout(alertTimer);
						clearInterval(checkFocus);
					}
				}, 100);
			}
		},
		
		playSound: function playSound(notificationArguments){
			//play sound during notification?
			var notificationSound, canPlayAudio, soundObject;
			notificationSound = {
				play: false,
			};
			canPlayAudio = typeof document.createElement("audio").play;
			if(canPlayAudio === "function"){ //browser can play HTML5 audio
				if("playSound" in notificationArguments){
					if(notificationArguments.playSound === true){
						if(notificationArguments.oggSoundFile && notificationArguments.mp3SoundFile){
							notificationSound.play = true;
							notificationSound.ogg = notificationArguments.oggSoundFile;
							notificationSound.mp3 = notificationArguments.mp3SoundFile;
						}
						else if(notificationArguments.oggSoundFile || notificationArguments.mp3SoundFile){
							throw new Error("If sound file should be played during notification, it must be present both in ogg format and in mp3.");
						}
						else {
							throw new Error("No sound file defined.");
						}
					}
				}
			}
			else {
				console.warn("Browser does not support HTML5 audio.");
			}
			if(notificationSound.play === true){
				var audioSource;
				soundObject = document.createElement("audio");
				soundObject.preload = "auto";
				audioSource = document.createElement("source"); //browser with support for ogg
				audioSource.type = "audio/ogg";
				audioSource.src = notificationSound.ogg;
				soundObject.appendChild(audioSource);
				audioSource = document.createElement("source"); //browser with support for mp3
				audioSource.type = "audio/mpeg";
				audioSource.src = notificationSound.mp3;
				soundObject.appendChild(audioSource);
			}
			else{
				soundObject = false;
			}
			return soundObject;
		}
	};


	var supportsCSSAnimation;
	supportsCSSAnimation = true;
	if(noti.checkSupport() === true){
		noti.requestPermission();
	}
	else{
		if(document.all && !document.addEventListener){ //IE 8: does only support the CSS :before single colon syntax and has no support for CSS transform()
			document.body.className += " IE";
			supportsCSSAnimation = false;
		}
		if(document.all && !window.atob){ //IE9 does not support CSS animations, close notification immediately after click without waiting for fading out
			supportsCSSAnimation = false;
		}
		noti.embedStyleSheet(); //embed styles for fallback notification
	}


	window.noti = noti; //make accessible in global namespace


})(window);
