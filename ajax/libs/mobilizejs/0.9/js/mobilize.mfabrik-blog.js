/**
 * This is an example how to override bits of of Wordpress mobile UI using mobilize.js.
 * <p>
 * This example is in real-world usage in http://blog.mfabrik.com
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
    
    /**
     * Override page header to use a shorter heading in mobile view instead of
     * SEO optimized web heading.
     */
    constructHeader: function () {
        // Set page heading from <title> tag
        var header;
        header = $("#mobile-body div[data-role=header]");
        header.append("<h1>mFabrik blog</h1>");
        mobilize.constructBackButton(header);
    },

    /**
     * Include Go to web site and Contact us buttons in the footer.
     */	
    constructFooter: function () {
        
		var footer = $("#mobile-body div[data-role=footer]");
		
		// Put site slogan to footer 		 
        footer.append($("#site-description"));

        footer.append('<p><a href="http://mfabrik.com/" data-role="button">Corporate site</a></p>');        

        footer.append('<p><a href="http://mfabrik.com/@@zoho-contact-form" data-role="button">Contact us</a></p>');        
    },
	
	
	/**
	 * <p>
	 * Create about splash box at the top of the front page
	 * </p>
	 * XXX: Use jQuery to pick content instead of hardcoded here
	 */
	constructAboutBox : function(content) {
		content.append("<img class='mobilize-no-resize' src='http://mfabrik.com/++resource++plonetheme.mfabrik/logo.png' />");
		content.append("<p>mFabrik Blog is about mobile and web software development, open source and Linux. We tell exciting tales where business, technology, web and mobile convergence.</p>");
	},

    /**
     * Mobilize Wordpress front page.
     * <p>
     * Create recent blog post navigation and pages navigation.
     * <p>
     * 
     */
    constructFrontPage: function (content) {

        // Create About splash
		this.constructAboutBox(content);
		
        // Recent headlines       
        var headlines = this.constructBlogRollNavigation("Recent headlines");
        // Add some space between about and headlines
		headlines.css("margin-top", "15px");
		content.append(headlines);        
		
		// We don't want pages, so pages navigation has been removed
        // Then pages navigation
        // var pages = this.consructPageNavigation("Pages");
        // content.append(pages);
		
    }
	
});                 

 