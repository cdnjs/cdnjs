/**
 * Wordpress CMS mobilization using mobilization.js.
 * <p>
 * This functionality is retrofitted to core <i>mobilize</i> class.
 * <p>
 * @namespace Wordpress mobilization
 * <p>
 * @extends mobilize
 */
var mobilizeWordpress = {

    /**
     * Wordpress specific default options setter.
     * <p>
     * This sets default download locations for files using
     * minified bundles and CDN URI layout. Override
     * this in init() call if you want to do something else.
     * <p>
     * @see mobilize.init
     * 
     */
    initPlugins: function () {
		
		mobilize.extend(mobilize.options, {
			 reloadOnMobile : true // Assume we have some sort of server-side support running on Wordpress
		});

        mobilize.extend(mobilize.cdnOptions, {
            bundleName: "mobilize.wordpress",
            cssBundles: ["css/mobilize.wordpress.mobile.min.css"],
            javascriptBundles: ["js/mobilize.wordpress.mobile.min.js"],
            template: "templates/wordpress.html"
        });
		
    },

    /**
     * Construct mobile page body according different Wordpress template formats.
     */
    constructBody: function () {

        mobilize.log("Wordpress constructBody()");
						
        var body = $(document.body);

        // Get the content element
		// If we don't get it here it means that template injection is not done yet
        var content = $("#mobile-body div[data-role=content]");
        if (content.size() === 0) {
            throw "No template content section to fill in";
        }
		
        if (body.hasClass("single-post")) {
            // Post type page
            this.constructPost(content);
        } else if(body.hasClass('home')){
            // Assume front page
            this.constructFrontPage(content);
        } else if(body.hasClass('page')) {
            this.constructPage(content);            			
        } else if(body.hasClass('blog')){
            // Blog roll
            this.constructBlogRoll(content);
		} else if(body.hasClass("archive")) {
			this.constructArchive(content);
        } else {
			throw "Unknown Wordpress page class:" + body.attr("class");
		}
		
		// These elements are shared between different page types
        this.constructHeader();
        this.constructFooter();
				
		// Add archive navigation
		this.constructNextPrevNavigation(content);

        // Install horizontal scroll for code examples        
        this.makePreScrollable();
		
		var preparedContent = $("#mobile-body div[data-role=content]");

        // The order here is important,
		// because we don't want to install image click handler
		// on video thumbnails
        this.processContentVideos(preparedContent);
		this.processContentImages(preparedContent);

    },

    /**
     * Create jQuery Mobile header with buttons
     */
    constructHeader: function () {
        // Set page heading from <title> tag
        var header;
        header = $("#mobile-body div[data-role=header]");

        var title = $("head title").text();
        header.append("<h1>" + title + "</h1>");

        mobilize.constructBackButton(header);
    },

    /**
     * Create jQuery Mobile footer
     */
    constructFooter: function () {
        //$("#mobile-body div[data-role=footer]").append($("#site-info"));         
        // Put site slogan to footer 
        $("#mobile-body div[data-role=footer]").append($("#site-description"));
    },

    /**
     * Create back button
     * 
     * Point to Home if not already there
     */
    constructBackButton: function (header) {

        if (!$("body").hasClass("home")) {
            header.prepend("<a data-icon=home href='/'>Home</a>");
        }
    },
	

    /**
     * Transform Wordpress info page to a mobiel format.
     * <p>
     * Simply copy over all content HTML.
     * <p>
     * @param content: Target content element
     * 
     */
    constructPage : function (content) {
        var entry_content = $(".entry-content");
        content.append(entry_content);		
	},

    /**
     * Transform wordpress blog post page
     * <p>
     * @param content: Target content element
     */
    constructPost: function (content) {

        // Copy post content
        var postBody = $(".post");
		
		if(postBody.size() == 0) {
			throw new "Did not understand post page mark-up";
		}
		
		content.append(postBody);
		
        
        this.constructComments(content);
        
    },
	
	/**
	 * Create a title + description link list for posts.
	 * <p>
	 * Do not show post bodies as they might take little too much
	 * space on mobile devices.
	 * <p>
	 * We are not using inset lists here, as we want to maximize
	 * available horizontal space for headlines.
	 * <p>
	 * @param content  jQuery element which will receive the navigation
	 * 
	 * @param title: Blog roll box title
	 */
	constructBlogRollNavigation : function(title) {
       
		var list = $("<ul class='blogroll' data-role='listview'>");
        
		list.prepend("<li data-role='list-divider'>" + title + "</li>");
		
		// Iterate through every visible post on the page 
		// and add its title + link to the navigation box
		$(".post").each(function() {
			
			var input = $(this);
			
            var output = $("<li role='option'>");
			
			var heading = input.find(".entry-title");
			var link = heading.find("a");
			var href = link.attr("href");
			// XXX: call mobilize.rewriteLink for link here
            
            var text = heading.text();
			
            var newHeading = $("<h3 class='ui-li-heading'>");
            newHeading.text(text);

            button = $("<div>");
						
            var date = input.find(".entry-date").text();
            var info = $('<p class="ui-li-desc">');
            info.text(date);
            button.append(newHeading);
            button.append(info);
			
			
			link = $("<a href='" + href + "'></a>");
            link.append(button);
            output.append(link);
			

            // XXX: Include excerpt here? 		
            //var entry_content = input.find(".entry-content");
            //output.append(entry_content);

            output.appendTo(list);
        
		});
        
	   return list;	
	},
	
	/**
	 * Transform the top horizontal navigation (pages links) to a mobile navigation box.
	 * <p>
	 * @return jQuery model for the navigation box 
	 */
	consructPageNavigation : function(title) {
		
        // Pages
        var menu = $(".menu");
        var items = menu.find("li");
        list = $("<ul class='page-list' data-role='listview'>");
        list.prepend("<li data-role='list-divider'>" + title + "</li>"); // TODO: Localization
        items.each(function () {
            var output = $("<li role='option'>");
            output.append($(this).find("a"));
            output.appendTo(list);
        });
        return list;
	},

    /**
     * Mobilize Wordpress front page.
     * <p>
     * Create recent blog post navigation and pages navigation.
     * <p>
     * 
     */
    constructFrontPage: function (content) {
		
		mobilize.log("Creating front page");
		
		// First Recent headlines		
		var headlines = this.constructBlogRollNavigation("Recent headlines");
        content.append(headlines);
		
        // Then pages navigation
        var pages = this.consructPageNavigation("Pages");
		content.append(pages);
    },

    /**
     * Wordpress blog roll page (does not need to be front page).
     * <p>
     * Create recent blog post navigation and pages navigation.
     * <p>
     * 
     */
    constructBlogRoll: function (content) {
        // First Recent headlines       
		
		mobilize.log("Creating blog roll");
		
        var headlines = this.constructBlogRollNavigation("Recent headlines");
        content.append(headlines);
        
        // Then pages navigation
        var pages = this.consructPageNavigation("Pages");
        content.append(pages);
    },

	
	
	/**
	 * Mobile version of tags, archive, search, etc. listing pages.
	 * 
	 */
	constructArchive : function(content) {		
		var title = $(".page-title").text();
        // First Recent headlines       
        var headlines = this.constructBlogRollNavigation(title);
        content.append(headlines);	
    },
    
	/**
	 * Older posts, newer posts buttons.
	 * 
	 * @param {Object} content
	 */
    constructNextPrevNavigation : function(content) {
		
		// Remove WP theme arrows - they are as HTML text
		$(".meta-nav").remove();
		
		var buttonGroup = this.makeNextPrevNavigation($(".nav-next a:first"), $(".nav-previous a:first"));
		content.append(buttonGroup);
	},
    
    /**
     * Create mobilized version for comments
     */
    constructComments : function(content) {    	    	
    	this.constructCommentCollapsible(content);    	
    	this.styleComments(content);     	    	
    },
    
    /**
     * Make comments appear as touchable list.
     */
    styleComments : function(content) {
    	
    	var comments = $(".commentlist");
  
    	// Use touch list for comments
    	comments.attr("data-role", "listview");
        //comments.attr("data-theme", "b");
    	
		var comment = $(".comment");
    	//comment.attr("role", "option");
    	    	    	
    	// Format comment content more suitable for touch devices
    	comment.each(function() {
    		    	    		        		
    		var self = $(this);
    		
    		self.children("div")
    		
    		// Move images to be the first element
    		var thumb = self.find("img.avatar");
    		self.prepend(thumb);    		
    		//thumb.remove();
    		
    		    		
    		// Convert <cite> to touch friendly <h3>
    		// XXX: Also remove <a> so that this list item doesn't
    		// appear as a page opener. Later figure out what to do for 
    		// author links.
    		var author = self.find(".comment-author cite");
    		
    		var h3 = $("<h3>" + author.text() + "</h3>");
    		thumb.after(h3);
    		author.remove();    		
    		
    		// Make dates and times not clickable
    		// Time on right hand, float
    		var meta = self.find(".comment-meta");    		
    		var side = $("<p>");
    		
    		// XXX: does not fit to screen side-by-side, cuts the author name
    		side.addClass("timestamp");
    		side.text(meta.text());    		
    		meta.remove();        		
    		h3.after(side);    		


    	});
    	
    	// XXX: Currently cannot have embedded links in list content formatting (jQuery Mobile limitation)
    	// Convert <a> to <span>
    	$(".comment-body a").each(function() {
    			var self = $(this);
    			var text = self.text();
    			self.after("<span>" + text + "</span>");
    			self.remove();
    	});
    	
    	
        // This is not needed on mobile
    	var title = $("#comments-title");
    	comments.prepend("<li data-role='list-divider'>" + title.text() + "</li>");
        title.remove();
    	
        // This is not needed on mobile
        $(".says").remove();
    	
    },
    
    /**
     * Put comments behind a collapsile element.
     */
    constructCommentCollapsible: function(content) {
        // Add comment area which can be hidden.
        // jQuery element which controls the collapsiple section
        var collapsible = $('<div id="comment-collapsible" data-role="collapsible" data-collapsed="true">');
        collapsible.appendTo(content);

        // TODO: Get from page for localization
        
        // XXX: Does WP handle comments pagination? 
        var count = $("li.comment").size();
                      
        // The header is defined in to template.html(core.html)
        var header;
        header = $('<h3>');              
        header.text("Comments (" + count + ")");
        header.appendTo(collapsible);

        var comments = $("<p>");
        comments.append($("#comments"));
        comments.appendTo(collapsible);

    },    

    /**
     * This is called by mobilize.js when jQuery Mobile internal transform is done.
     * <p>
     * We can start binding jQuery Mobile UI elements
     * <p>
     * @param {Object} event
     * @param {Object} data
     */
    bindEventHandlers: function (event, data) {

        // XXX: Something is wrong with $ shortcut in this point
        // jQuery() event bindings work, but not when using $
        mobilize.log("Installing Wordpress event handlers");
        var collapsible = jQuery("#comment-collapsible");

        mobilize.log("Found collapsible:" + collapsible.size());
        collapsible.bind("expand", mobilize.onCommentsOpen);
    },

    /**
     * Special handler which will move focus to comments when comment button is pressed
     */
    onCommentsOpen: function (event, data) {
        mobilize.log("comments open");
        var x = 0;
        var y = event.target.offsetTop;
        window.scrollTo(x, y);
        mobilize.log(event);
    },
    
    
    /**
     * Make pre elements to have horizontal scroll.
     * <p>
     * Do this only if we have mobile.scrollview widget installed.
     */
    makePreScrollable : function() {
    	if(!$.mobile.scrollview) {
    		mobilize.log("No scrollview widget loaded - no horizontal support installed");
    	}
    	
    	mobilize.log("Creating horizontal elements");
    
    	mobilize.makeHorizontalScroll($(".entry-content pre"))
    }
           
};

mobilize.extend(mobilize, mobilizeWordpress);

