/**
 * This file is executed when the site is loaded in mobile mode.
 */

mobilize.extend(mobilize, {
    
    constructBody : function() {
        // Map different elements to jQuery Mobile theme 
		this.constructHeader();
        
		this.constructContent();
		this.constructNavigation();
		
		this.constructFooter();
	},

    /**
     * Create mobile site header name and buttons 
     */
    constructHeader : function() {
        // Map title and header buttons jQuery Mobile 
		
		// This is the mobile target element 
		// which will contain the title.
		var mobileHeader = $("#mobile-body div[data-role=header]");

        // Pick the current page title from <header> section
        var title = $("header h1").text();
		
		// Set mobile header title to the same text
        var h1 = $("h1").text(title);
        mobileHeader.append(h1);		

    },

    /**
     * Move content area from web site to mobile site
     */
    constructContent : function() {
		var content = $("#content");
		
		// Place content HTML to mobile content area container
        var mobileContent = $("#mobile-body div[data-role=content]");
        mobileContent.append(content);
	},

    /**
     * Create mobile footer
     */
    constructFooter : function() {
        var footer = $("footer").children();
        
        // Place content HTML to mobile content area container
        var mobileFooter = $("#mobile-body div[data-role=footer]");
        mobileFooter.append(footer);
		
    },
	
	
	/**
	 * Use jQuery Mobile nested list to create a navigation.
	 * 
	 */
	constructNavigation : function() {
        
        // Get list of items which contain links for the navigation building
        var items = $("nav li");
		 
		// Create navigation list
        var list = $("<ul class='page-list' data-role='listview' data-inset=true>");
		
		// Add list header
        list.prepend("<li data-role='list-divider'>Pages</li>"); 

        // Add list items
        items.each(function () {
            var output = $("<li role='option'>");
            output.append($(this).find("a"));
            output.appendTo(list);
        });
		
		// Put list below content
        var mobileContent = $("#mobile-body div[data-role=content]");
        mobileContent.append(list);        
		
	}


});
