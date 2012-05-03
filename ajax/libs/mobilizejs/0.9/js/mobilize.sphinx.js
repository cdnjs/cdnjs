/**
 * Sphinx mobilization using mobilization.js.
 * <p>
 * This functionality is retrofitted to core <i>mobilize</i> class.
 * <p>
 * @namespace Sphinx mobilization
 * <p>
 * @extends mobilize
 */
var mobilizeSphinx= {
    
    /**
     * Sphinx specific default options setter.
     * <p>
     * This sets default download locations for files using
     * minified bundles and CDN URI layout. Override
     * this in init() call if you want to do something else.
     * <p>
     * @see mobilize.init
     * 
     */
    initPlugins : function() {             
    
	   mobilize.log("Setting up Sphinx extender");
       mobilize.extend(mobilize.cdnOptions, {
           bundleName : "mobilize.sphinx",
           cssBundles : ["css/mobilize.sphinx.mobile.min.css"],
           javascriptBundles : ["js/mobilize.sphinx.mobile.min.js"],
           template : "templates/sphinx.html"
       });
       
    },
    
    constructBody : function() {
        
        mobilize.log("Sphinx constructBody()");

        // Cache the content area selector
        this.content = $("#mobile-body div[data-role=content]");
        if (this.content.size() === 0) {
            throw "No template content section to fill in";
        }

        this.cleanBacklinks();                				

        this.constructHeader();
        this.constructText();
		this.constructContents();

        this.constructPrevNextNavigation();

        this.constructFooter();
		
		// Just remove this for now
		$("#indices-and-tables").remove();
		
		this.makePreScrollable();
        
    },
	
	/**
	 * Create jQuery Mobile version of table of contents.
	 * 
	 * Get the first level of TOC.. nested TOC not supported in mobile nav.
	 * 
	 */
	constructContents : function() {
		// <li class="toctree-l1"><a href="installation.html" class="reference internal ui-link">Installation</a></li>
		
		// TOC can be generated using Sphinx .. toctree ::
		// or reST .. contents :: :local: resulting to different output
		var toc = this.createNavigationBox($(".toctree-l1 > a, #contents > ul > li > a"), "Contents");
		
		// Get the handle to Sphinx standard TOC
		var oldTOC = $(".toctree-wrapper, #contents");
		
		// Delete <p>Contents:</p> before .. toctree ::
		var lead = oldTOC.prev();
		if(lead.size() > 0) {
			if (lead.get(0).tagName.toLowerCase() == "p") {
				lead.remove();
			}
		}

        // Replace the existing TOC with pimped version		
		//var parent = oldTOC.parent();		
		//parent.after(oldTOC, toc);
		oldTOC.after(toc);
		
		oldTOC.remove();
	},
    
    constructHeader : function() {
        // Set page heading from <title> tag
        
        var header;
        header = $("#mobile-body div[data-role=header]");
         
        var title = $("h2.heading").find("span").text();
        header.append("<h1>" + title + "</h1>");
        
        mobilize.constructBackButton(header);
    },
    
    constructFooter : function() {
        // Put site slogan to footer 
        $("#mobile-body div[data-role=footer]").append($(".footer"));         
    },

    /**
     * Create back button
     * 
     * Point to Home if not already there
     */ 
    constructBackButton : function(header) {
        
        /*if(window.location.href.indexOf("/index.html") < 0) {
            header.prepend("<a data-icon=back href='/'>Back</a>");
        }*/
		
		var uplink = $("a.uplink:first");
		
		// <a href="index.html" class="uplink">Contents</a>
		if(uplink.size() > 0) {
			// Sphinx template has inserted uplink
			if (uplink.attr("href") != "#") {
			    // Not a front page
				uplink.attr("data-icon", "back");
				header.prepend(uplink);
			// header.prepend("<a data-icon=back href='/'>Back</a>");
			}
		}
    },
     
    /**
     * Move Sphinx main text to the mobile template.
     */
    constructText : function() {
    
	    var origContent = $(".content");
	
        // Move box on the left hand to body first
        this.content.append(origContent);
		         
	    // Defloat images, install clickers
        mobilize.processContentImages(origContent);
		
		// XXX: Put this to right place or add search support
		$("#documentation-search").remove();
    },
    
    /**
     * This is called when jQuery Mobile internal transform is done.
     * 
     * We can start binding jQuery Mobile UI elements
     * @param {Object} event
     * @param {Object} data
     */
     bindEventHandlers : function(event, data) {
         // TODO: Add Search button handling here
     },
	 
	 /**
	  * Remove Sphinx permalinks and bacl to TOC links 
	  * 
	  * a title="Permalink to this headline" href="#welcome-to-mobilize-js-s-documentation" class="headerlink"
	  */
	 cleanBacklinks : function() {
	 	$("a.headerlink").remove();
	 },
     
	 /** 
	  * Create next and previous chapter quick links
	  */
	 constructPrevNextNavigation : function() {
//	   	<div data-role="controlgroup" data-type="horizontal" >
//            <a href="index.html" data-role="button" data-icon="arrow-u" data-iconpos="notext">Up</a>
//            <a href="index.html" data-role="button" data-icon="arrow-d" data-iconpos="notext">Down</a>
//            <a href="index.html" data-role="button" data-icon="delete" data-iconpos="notext">Delete</a>
//        </div>
        
		if($(".bottomnav a").size() != 3) {
			// should prev, up, next
			return;
		}


        var prev = $(".bottomnav a:first");
		var next = $(".bottomnav a:last");

        var group = $("<div class=mobile-next-prev data-role=controlgroup data-type=vertical>");
		prev.attr("data-icon", "arrow-l");
		prev.attr("data-role", "button");
        next.attr("data-icon", "arrow-r");
		next.attr("data-role", "button");
		next.attr("data-iconpos", "right");

		group.append(prev);
		group.append(next);
		
		this.content.append(group);	
		
		// remove old bottomnav
		
		$(".bottomnav").remove();
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
    
    	mobilize.makeHorizontalScroll($(".content pre"))
    }
         	 
};

mobilize.extend(mobilize, mobilizeSphinx);

// Execute mobilization automatically.
// To prevent autoloading, set window.mobilizeAutoload = false;
mobilize.autoload();
