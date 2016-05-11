/*Copyright (c) 2015 Jason Zissman
Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/* 
	Notice!  This project requires ifvisible.js to run.  You can get a copy from
	the ifinvisible.js github (https://github.com/serkanyersen/ifvisible.js) or 
	an old copy from this github repo.
*/

(function() {
	TimeMe = {
		startStopTimes: {},
		
		currentPageName: "default-page-name",
		
		startTimer: function() {
			var pageName = TimeMe.currentPageName;
			if (TimeMe.startStopTimes[pageName] === undefined){
				TimeMe.startStopTimes[pageName] = [];
			} else {
				var arrayOfTimes = TimeMe.startStopTimes[pageName];
				var latestStartStopEntry = arrayOfTimes[arrayOfTimes.length -1];
				if (latestStartStopEntry !== undefined && latestStartStopEntry.stopTime === undefined) {
					// Can't start new timer until previous finishes.
					return;
				}
			}
			TimeMe.startStopTimes[pageName].push({
				"startTime": new Date(),
				"stopTime": undefined
			});
		},
		
		stopTimer: function() {
			var pageName = TimeMe.currentPageName;
			var arrayOfTimes = TimeMe.startStopTimes[pageName];
			if (arrayOfTimes === undefined || arrayOfTimes.length === 0){
				// Can't stop timer before you've started it.
				return;
			}
			if (arrayOfTimes[arrayOfTimes.length -1].stopTime === undefined) {
				arrayOfTimes[arrayOfTimes.length -1].stopTime = new Date();				
			}
		},
		
		getTimeOnCurrentPageInSeconds : function() {
			return TimeMe.getTimeOnPageInSeconds(TimeMe.currentPageName);
		},
		
		getTimeOnPageInSeconds: function(pageName) {

			var totalTimeOnPage = 0;

			var arrayOfTimes = TimeMe.startStopTimes[pageName];
			if (arrayOfTimes === undefined){
				// Can't get time on page before you've started the timer.
				return;
			}
			
			var timeSpentOnPageInSeconds = 0;
			for(var i=0; i < arrayOfTimes.length; i++) {
				var startTime = arrayOfTimes[i].startTime;
				var stopTime = arrayOfTimes[i].stopTime;
				if (stopTime === undefined){
					stopTime = new Date();
				}
				var difference = stopTime - startTime;
				timeSpentOnPageInSeconds += (difference / 1000);
			}

			totalTimeOnPage = Number(timeSpentOnPageInSeconds);
			return totalTimeOnPage;
		},
		
		getTimeOnAllPagesInSeconds: function() {
			var allTimes = [];
			var pageNames = Object.keys(TimeMe.startStopTimes);
			for (var i=0; i < pageNames.length; i++){
				var pageName = pageNames[i];
				var timeOnPage = TimeMe.getTimeOnPageInSeconds(pageName);
				allTimes.push({
					"pageName": pageName, 
					"timeOnPage": timeOnPage
				});
			}
			return allTimes;
		},
		
		setIdleDurationInSeconds: function(duration) {
			var durationFloat = parseFloat(duration);
			if (isNaN(durationFloat) === false){
				ifvisible.setIdleDuration(durationFloat);
			} else {
				throw {
					name: "InvalidDurationException",
					message: "An invalid duration time (" + duration + ") was provided."
				};
			}
		},
		
		setCurrentPageName: function(pageName) {
			TimeMe.currentPageName = pageName;
		},
				
		resetRecordedPageTime: function(pageName) {
			TimeMe.startStopTimes[pageName] = [];
		},
		
		resetAllRecordedPageTimes: function() {
			var pageNames = Object.keys(TimeMe.startStopTimes);
			for (var i=0; i < pageNames.length; i++){
				TimeMe.resetRecordedPageTime(pageNames[i]);
			}
		},
		
		initialize: function (){
			TimeMe.startTimer();
		}
	},
	
	ifvisible.on("blur", function(){
		TimeMe.stopTimer();
	});

	ifvisible.on("focus", function(){
		TimeMe.startTimer();
	});

	ifvisible.on("idle", function(){		
		TimeMe.stopTimer();
	});

	ifvisible.on("wakeup", function(){		
		TimeMe.startTimer();
	});		
	
	if (typeof define === "function" && define.amd) {
		define(function() {
			return TimeMe;
		});
	} else {
		window.TimeMe = TimeMe;
	}
})();
