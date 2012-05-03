/**
 * This is an example how to override bits of of Wordpress mobile UI using mobilize.js.
 * <p>
 * This example is in real-world usage in http://mobilizejs.com
 * 
 */



/**
 * Add our own overlay layer for Wordpress mobile UI constructions by
 * overriding some functions in mobilize namespace.
 * <p>
 * These functions are originally defined in mobilize.wordpress.js
 * 
 */
mobilize.extend(mobilize, {
    
    constructHeader: function () {
        // Override header title with a custom shorter title,
		// don't use <title> tag from website
        var header;
        header = $("#mobile-body div[data-role=header]");
        header.append("<h1>mobilize.js</h1>");
        mobilize.constructBackButton(header);
    },

    /**
     * Include Go to web site and Contact us buttons in the footer.
     */	
    constructFooter: function () {
        
        var footer = $("#mobile-body div[data-role=footer]");
		
	    // Put site slogan to footer 		 
        footer.append($("#site-description"));

    },
	

    /**
     * Mobilize Wordpress front page.
     * <p>
     * Create recent blog post navigation and pages navigation.
     * <p>
     * 
     */
    constructFrontPage: function (content) {
        
		content.append("<b>Mobilize.js:</b>");
		content.append($("#header .title"));
		
        mobilize.log("Creating front page");
		
        var entry_content = $("#splash");
        content.append(entry_content);   
		
		// Set image size manually in CSS
		$("#social img, .install img").addClass("mobilize-no-resize");
		
		// Then pages navigation
        var pages = this.consructPageNavigation("Pages");
        //pages.after();
		
		$(".about").after(pages);
		
   
    },
    
	
});                 

 