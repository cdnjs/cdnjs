/*!

Name: Reading Time
Dependencies: jQuery
Author: Michael Lynch
Author URL: http://michaelynch.com
Date Created: August 14, 2013
Licensed under the MIT license

*/

;(function($) {

    $.fn.readingTime = function(options) {
    
    	//return if no element was bound
		//so chained events can continue
		if(!this.length) { 
			return this; 
		}

		//define default parameters
        var defaults = {
	        readingTimeTarget: '.eta',
	        wordCountTarget: null,
	        wordsPerMinute: 270,
	        round: true,
	        lang: 'en',
	        remotePath: null,
	        remoteTarget: null
        }
        
        //define plugin
        var plugin = this;

        //define element
        var el = $(this);

        //merge defaults and options
        plugin.settings = $.extend({}, defaults, options);
        
        //define vars
        var readingTimeTarget = plugin.settings.readingTimeTarget;
        var wordCountTarget = plugin.settings.wordCountTarget;
        var wordsPerMinute = plugin.settings.wordsPerMinute;
        var round = plugin.settings.round;
        var lang = plugin.settings.lang;
        var remotePath = plugin.settings.remotePath;
        var remoteTarget = plugin.settings.remoteTarget;
        
        //if lang is set to french
        if(lang == 'fr') {
        
        	var lessThanAMinute = "Moins d'une minute";
        	
        	var minShortForm = 'min';
	     
	      //if lang is set to german  
        } else if(lang == 'de') {
	        
	        var lessThanAMinute = "Weniger als eine Minute";
	        
	        var minShortForm = 'min';

        //if lang is set to spanish
        } else if(lang == 'es') {
	        
	        var lessThanAMinute = "Menos de un minuto";
	        
	        var minShortForm = 'min';

	      //default lang is english
        } else {
	        
	        var lessThanAMinute = 'Less than a minute';
	        
	        var minShortForm = 'min';
	        
        }
        
        var setTime = function(text) {

	        //split text by spaces to define total words
			var totalWords = text.split(' ').length;
			
			//define words per second based on words per minute (wordsPerMinute)
			var wordsPerSecond = wordsPerMinute / 60;
			
			//define total reading time in seconds
			var totalReadingTimeSeconds = totalWords / wordsPerSecond;
			
			//define reading time in minutes
			var readingTimeMinutes = Math.round(totalReadingTimeSeconds / 60);
			
			//define remaining reading time seconds
			var readingTimeSeconds = Math.round(totalReadingTimeSeconds - readingTimeMinutes * 60);
			
			//if round is set to true
			if(round === true) {
				
				//if minutes are greater than 0
				if(readingTimeMinutes > 0) {
			
					//set reading time by the minute
					el.find(readingTimeTarget).text(readingTimeMinutes + ' ' + minShortForm);
				
				} else {
					
					//set reading time as less than a minute
					el.find(readingTimeTarget).text(lessThanAMinute);
					
				}
			
			//if round is set to false	
			} else {
			
				//format reading time
				var readingTime = readingTimeMinutes + ':' + readingTimeSeconds;
				
				//set reading time in minutes and seconds
				el.find(readingTimeTarget).text(readingTime);
				
			}
	
			//if word count container isn't blank or undefined
			if(wordCountTarget !== '' && wordCountTarget !== undefined) {
			
				//set word count
				el.find(wordCountTarget).text(totalWords);
			
			}
		
		};
		
		//for each element
		el.each(function() {
        
	        //if remotePath and remoteTarget aren't null
	        if(remotePath != null && remoteTarget != null) {
	        
	        	//get contents of remote file
	    		$.get(remotePath, function(data) {
					
					//set time using the remote target found in the remote file
					setTime($(data).children().text());
					
				});
		        
	        } else {
	
		        //set time using the targeted element
		        setTime(el.text());
	        
	        }
        
        });
        
    }

})(jQuery);
