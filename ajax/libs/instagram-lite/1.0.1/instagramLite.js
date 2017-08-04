/*!

Name: Instagram Lite
Dependencies: jQuery
Author: Michael Lynch
Author URL: http://michaelynch.com
Date Created: January 14, 2014
Licensed under the MIT license

*/

;(function($) {

    $.fn.instagramLite = function(options) {
    
    	//return if no element was bound
		//so chained events can continue
		if(!this.length) { 
			return this; 
		}

		//define default parameters
        var defaults = {
            username: null,
            clientID: null,
            limit: 10,
            list: true,
            urls: false,
            error: function() {},
            success: function() {}
        }
        
        //define plugin
        var plugin = this;

        //define settings
        plugin.settings = {}
 
        //merge defaults and options
        plugin.settings = $.extend({}, defaults, options);

        //define element
        var el = $(this);
        
        //if client ID and username were provided
        if(plugin.settings.clientID && plugin.settings.username) {
        
	        //for each element
	        el.each(function() {
	        
	        	//search the user
	        	//to get user ID
	        	$.ajax({
		        	type: 'GET',
		        	url: 'https://api.instagram.com/v1/users/search?q='+plugin.settings.username+'&client_id='+plugin.settings.clientID+'&callback=?',
		        	dataType: 'jsonp',
		        	success: function(data) {
		        	
		        		//for each user returned
		        		for(var i = 0; i < data.data.length; i++) {
		        		
		        			//define user namespace
			        		var thisUser = data.data[i];
			        		
			        		//if returned username matches supplied username
			        		if(thisUser.username === plugin.settings.username) {
			        		
			        			//get user's media using their ID
			        			$.ajax({
						        	type: 'GET',
						        	url: 'https://api.instagram.com/v1/users/'+thisUser.id+'/media/recent/?client_id='+plugin.settings.clientID+'&count='+plugin.settings.limit+'&callback=?',
						        	dataType: 'jsonp',
						        	success: function(data) {
						        		
						        		if(data.meta.code === 200) {
		
							        		//for each piece of media returned
							        		for(var i = 0; i < data.data.length; i++) {
							        		
							        			//define media namespace
							        			var thisMedia = data.data[i];
							        			
							        			//if media type is image
							        			if(thisMedia.type === 'image') {
							        			
								        			//construct image
								        			var img = '<img src="'+thisMedia.images.standard_resolution.url+'" alt="Instagram Image" data-filter="'+thisMedia.filter+'" />';
								        			
								        			//if url setting is true
								        			if(plugin.settings.urls) {
								        			
								        				var img = '<a href="'+thisMedia.link+'" target="_blank">'+img+'</a>';
									        			
								        			}
								        			
								        			//if list setting is true
								        			if(plugin.settings.list) {
									        			
									        			var img = '<li>'+img+'</li>';
								        			}
								        		
								        			//append image
								        			el.append(img);
							        			
							        			}
							        			
							        		}
							        		
							        		//execute error callback
							        		plugin.settings.success.call(this);
						        		
						        		} else {
							        		
							        		//execute error callback
							        		plugin.settings.error.call(this, data.meta.code, data.meta.error_message);
							        		
						        		}
						        	
						        	},
						        	error: function() {
						        	
						        		//execute error callback
						        		plugin.settings.error.call(this);
							        	
						        	}
						        });
			        		
				        		break;
				        		
			        		}
			        		
		        		}
			        	
		        	},
		        	error: function() {
		        	
		        		//execute error callback
						plugin.settings.error.call(this);
			        	
		        	}
	        	});
	        
	        });
        
        } else {
        
        	console.log('Both a client ID and username are required to use this plugin.');
	        
        }

    }

})(jQuery);