/**
* noti.js
* https://github.com/j-l-n/noti.js/
*
* @author: j-l-n (https://github.com/j-l-n)
* @version: 0.9-beta.5
* @lastModified: 17/10/2014 (DD/MM/YYYY)
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
		checkSupport: function(){
			var notificationsSupported;
			if(window.Notification){
				notificationsSupported = true;
			}
			else {
				notificationsSupported = false;
			}
			return notificationsSupported;
		},
		askForPermission: function(){
			if(noti.checkSupport() === true){
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
			}
		},
		create: function(notificationArguments){
			if(typeof notificationArguments !== "object"){
				throw new Error("No arguments were passed to function.");
			}
			else if(typeof notificationArguments.title !== "string" || typeof notificationArguments.message !== "string"){
				throw new Error("Title or content of notification is undefined.");
			}
			var debugMode;
			debugMode = false;
			if(notificationArguments.debug_alwaysFallback === true){
				debugMode = true;
			}
			var changeTitle, createAudio, callback, fallbackNotification, showNotification;
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
			createAudio = function(ogg, mp3){
				var audio, audioSource;
				audio = document.createElement("audio");
				audio.preload = "auto";
				audioSource = document.createElement("source"); //browser with support for ogg
				audioSource.type = "audio/ogg";
				audioSource.src = ogg;
				audio.appendChild(audioSource);
				audioSource = document.createElement("source"); //browser with support for mp3
				audioSource.type = "audio/mpeg";
				audioSource.src = mp3;
				audio.appendChild(audioSource);
				return audio;
			};
			callback = function(id){ //this function is called when user closes notification
				console.log("Closed notification " + id);
				if(typeof notificationArguments.callback === "function"){ //if user defined callback, call that function
					notificationArguments.callback();
				}
			};
			fallbackNotification = function(notificationTitle, notificationMessage, notificationId){
				changeTitle();
				if(playAudio){
					var sound;
					sound = createAudio(notificationArguments.oggSoundFile, notificationArguments.mp3SoundFile);
					sound.onloadeddata = function(){
						sound.play();
					};
				}
				if(notificationArguments.dontShowAlert){
					var showAlertActive;
					showAlertActive = false;
					if(notificationArguments.dontShowAlert !== true){
						var showAlertAfter;
						if(notificationArguments.showAlertAfter){
							showAlertAfter = notificationArguments.showAlertAfter * 1000;
						}
						else {
							showAlertAfter = 60000; //default: 60 seconds
						}
						showAlertActive = setTimeout(function(){ //show alert after specified time in order to get focus and thus users attention
							window.focus(); //opens minimized window in IE
							alert(notificationTitle + "\n\n" + notificationMessage);
						}, showAlertAfter);
					}
					var checkFocus;
					checkFocus = setInterval(function(){
						if(isFocused()){
							if(showAlertActive !== false){
								clearTimeout(showAlertActive);
							}
							clearInterval(checkFocus);
							callback(notificationId);
						}
					}, 100);
				}
			};
			showNotification = function(title, options){
				changeTitle();
				var notification, checkFocus;
				notification = new window.Notification(title, options);
				checkFocus = setInterval(function(){ //auto close notification if tab gets focus back
					if(isFocused()){
						notification.close();
						clearInterval(checkFocus);
					}
				}, 100);
				if(typeof window.mozInnerScreenX !== "undefined"){ //if browser is Firefox
					//workaround for bug 875114 ("Web notifications should optionally be permanent, not automatically close after 4 seconds"
					//more information: https://bugzilla.mozilla.org/show_bug.cgi?id=875114
					notification.onshow = function(){
						console.log("Showing notification " + notification.tag);
						var showAgain = setTimeout(function(){
							notification.onclose = function(){}; //remove event listener so that close event is not fired if notification closed by script
							notification.close(); //close notification and...
							showNotification(title, options); //...create new
						}, 3700);
						notification.onclose = function(){ //close event is fired (closed by user)
							clearTimeout(showAgain); //stop continually sending the notification again
							clearInterval(checkFocus);
							callback(notification.tag);
						};
					};
				}
				else { //other browser with support for web notification
					notification.onshow = function(){
						console.log("Showing notification " + notification.tag);
					};
					notification.onclose = function(){
						clearInterval(checkFocus);
						callback(notification.tag);
					};
				}
			};
			//play sound during notification?
			var playAudio, canPlayAudio;
			playAudio = false;
			canPlayAudio = typeof document.createElement("audio").play;
			if(canPlayAudio === "function"){ //browser can play HTML5 audio
				if(notificationArguments.playSound === true){
					if(notificationArguments.oggSoundFile && notificationArguments.mp3SoundFile){
						var oggSoundFile, mp3SoundFile;
						oggSoundFile = notificationArguments.oggSoundFile;
						mp3SoundFile = notificationArguments.mp3SoundFile;
						playAudio = true;
					}
					else if(notificationArguments.oggSoundFile || notificationArguments.mp3SoundFile){
						throw new Error("If sound file should be played during notification, it must be present both in ogg format and in mp3.");
					}
					else {
						throw new Error("No sound file defined.");
					}
				}
			}
			else {
				console.warn("Browser does not support HTML5 audio.");
			}
			//set up notification
			var notificationTitle, notificationMessage, notificationId;
			notificationTitle = notificationArguments.title;
			notificationMessage = notificationArguments.message;
			notificationId = new Date().getTime();
			if(noti.checkSupport() === true && debugMode === false){
				if(window.Notification.permission === "granted"){
					var notificationOptions;
					notificationOptions = {
						dir: "auto",
						lang: "de",
						body: notificationMessage,
						tag: notificationId
					};
					if(notificationArguments.icon){
						NotificationOptions.icon = notificationArguments.icon;
					}
					if(playAudio){
						var sound;
						sound = createAudio(notificationArguments.oggSoundFile, notificationArguments.mp3SoundFile);
						sound.onloadeddata = function(){
							showNotification(notificationTitle, notificationOptions);
							sound.play();
						};
					}
					else{
						showNotification(notificationTitle, notificationOptions);
					}
				}
				else{ //if permission for web notifications denied
					console.info("Permission for web notification denied. Falling back to alert.");
					fallbackNotification(notificationTitle, notificationMessage, notificationId);
				}
			}
			else{ //if web notifications are not supported
				console.info("Your browser does not support web notifications! Falling back to alert.");
				fallbackNotification(notificationTitle, notificationMessage, notificationId);
			}
			return notificationId;
		}
	};


	if(noti.checkSupport() === true){
		noti.askForPermission();
	}


	window.noti = noti; //make accessible in global namespace


})(window);
