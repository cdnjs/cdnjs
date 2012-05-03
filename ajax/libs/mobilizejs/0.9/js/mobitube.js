/**
 * <h1>Mobitube.js</h1>
 * <p>
 * Mobilize YouTube and other videos found on HTML page.
 * <p>
 * This script is designed to scan HTML content for desktop video embeds (iframe, flash)
 * and convert them to mobile versions.
 * <p>
 * Target is to support all popular video services.
 * <p>
 * @author Mikko Ohtamaa 
 * 
 */

function mobitube($) {

	module = {
			
		options : {
		
		  youTubeTemplate : '<div class="mobile-youtube"> <a class="image-link" href="http://youtube.com/watch?v=VIDEOID"><img src="http://i.ytimg.com/vi/VIDEOID/0.jpg" > </a> <p><a href="http://m.youtube.com/watch?v=VIDEOID" class="text-link">LABEL</a></p></div>', 
	
    	  youTubeLabel : "Watch on YouTube",
		
		},
		
		/**
		 * Parse URL and return path path.
		 * 
		 * @param {Object} url
		 */
		getPathParts : function(url) {
			var parts = url.split("?");
			url = parts[0];
			
			parts = url.split("/");
			return parts;
		},
					
		/**
		 * Process selected HTML content and convert all video embeds there to mobile versions.
		 * <p>
		 * @param {Object} content: jQuery selection of th 
		 */
		process : function(content) {
		   	this.processYouTubeIFrames(content);
			this.processYouTubeEmbeds(content);			
			this.processYouTubeObjects(content);
			this.cleanSignatures(content);
		},
		
		/**
		 * Create Youtube mobile emded.
		 * 
		 * @param {Object} videoId
		 */
		createYouTubeMobileHTML : function(videoId) {
            var html = this.options.youTubeTemplate.replace(/VIDEOID/g, videoId);
            html = html.replace(/LABEL/g, this.options.youTubeLabel);			
			return html;
		},
		
		/**
		 * Replace DOM node with mobile YouTube link.
		 * 
		 * @param elem <embed> or <iframe>
		 */
		createYouTubeElement : function(elem, videoId) {
            console.log("Detected YouTube video id:"+ videoId);
                                        
            html = this.createYouTubeMobileHTML(videoId);
			console.log("Constructing YouTube emded:" + html);      
            var node = $(html);
                        
            elem.after(node);
            elem.remove();			
		},

        /**
         * Convert YouTube embeds to mobile links.
         * 
         * @param {Object} elem <object>, <embed> or <iframe>
         * 
         * @param url: Youtube source URL
         */
        processYouTubeElement : function(elem, url) {
			
			if (!url) {
				url = elem.attr("src");
			}
			if(!url || url.length == 0) return; 
			
			var parts = this.getPathParts(url);
			var videoId = parts[parts.length-1];
			
			this.createYouTubeElement(elem, videoId);
			
		},
			
		processYouTubeIFrames : function(selection) {
		   
		   var iframes = selection.find("iframe");
		   
		   var self = this;
		   
		   iframes.each(function() {
		       var frame = $(this);
			   var src = frame.attr("src");
			   if(src && src.indexOf("youtube.com") >= 0) {
			   	  self.processYouTubeElement(frame);
			   }
		   });
		},
		
		/**
		 * Firefox Mobile
		 * 
		 * @param {Object} selection
		 */
		processYouTubeEmbeds : function(selection) {
           
           var embeds = selection.find("embed");
           
           var self = this;
           
           embeds.each(function() {
               var embed = $(this);
               var src = embed.attr("src");
               if(src && src.indexOf("youtube.com") >= 0) {
                  self.processYouTubeElement(embed);
               }
           });
        },

        /**
         * Webkit
         * 
         * @param {Object} selection
         */
        processYouTubeObjects : function(selection) {
           
           var embeds = selection.find("object");
           
           var self = this;
           
           embeds.each(function() {
               var embed = $(this);
               
			   var movie = embed.find("param[name=movie]");
			   var src = movie.attr("value"); 
			   			  
               if(src && src.indexOf("youtube.com") >= 0) {
                  self.processYouTubeElement(embed, src);
               }
           });
        },
        
		
		/**
		 * Clean various plug-in advertisements from mobile pages.
		 * 
		 * @param {Object} selection
		 */
		cleanSignatures : function(selection) {
			
            // YouTube IFrame for Wordpress			
			var a = selection.find("a[href='http://www.clickonf5.org/']");
			a.parent().remove();
		}
		
	};

    return module;
}

