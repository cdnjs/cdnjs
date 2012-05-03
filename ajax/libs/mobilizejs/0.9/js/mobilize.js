/**
 * @fileoverview Pure Javascript mobilization solution
 * 
 */

/**
 * @namespace mobilize.js core
 * <p>
 * <i>mobilize</i> is a core class of mobilize.js. 
 * <p>
 * You only want to use this class directly if you are developing mobilization
 * for your own framework. Otherwise use one of the stock CMS classes supplied with
 * mobilize.js. 
 * <p>
 * mobilize does not need to be instiated and it's a static singleton. Instead,
 * the functionality is extended by an <i>extender</i>. 
 * Extender is a Javascript which directly overrides mobilize member functions
 * in mobilize namespace.
 * <p> 
 * @author Mikko Ohtamaa, Jussi Toivola
 *
 */
var mobilize = {
    
    /**
     * @class 
     * 
     * <p>
     * Options and their default values.
     * <p>
     * These default values can be overriden by extender getExtendedOptions()
     * or user supplied parameters to init().
     * <p>
     * 
     * 
     * @see mobilize.init
     * 
     * @see mobilize.getExtendedOptions
     */
    options : {
                        
        /**
         * 
         * &lt;script src=""&gt; whitelist for filtering web specific 
         * elements from &lt;head&gt;
         * <p>
         * If src attribute has substring match of any list element,
         * the tag is left to mobile version also. 
         * <p>
         * @default allow scripts which have mobilize in their name.
         */
        whitelistScriptSrc : ["mobilize"],
        
        /** 
         * &lt;style type="text/css&gt; @import whitelist for filtering web specific 
         * elements from &lt;head&gt;
         * <p>
         * If CSS @import content has substring match of any list element,
         * the tag is left to mobile version also. 
         * <p>         
         * 
         * @see mobilize.options.inlineStyleMaxCheckLength
         * 
         * @default empty list
         */
        whitelistStyleImport : [],
        
        // <link rel="stylesheet"> href whitelist 
        whitelistCSSLinks : [],
                
        /** How many characters &lt;style&gt; inner text may contain it to be run through inline CSS importer check */
        inlineStyleMaxCheckLength : 256,
        
        /** true to force mobile rendering, false to force normal rendering,
         * undefined tries to guess.
         * */
        forceMobilize : undefined,
        
        // Force user agent
        forceUserAgent : null,
                 
         // Which HTTP GET parameter we can use to forc mobilization
        mobilizeQueryParameter : "mobilize",
        
        /** Send mobilize.log messages to url [remoteDebugLogBaseUrl]log?msg=[msg] */
        haveRemoteDebugLogging : false,
        
        remoteDebugLogBaseUrl : "/",
        
        /** Expects server to add mobilize code to the page 
         * If mobilize cookie is not set:
         * 1. Sets cookie
         * 2. Reloads page
         */
        reloadOnMobile : false,
		
		/**
		 * Min. width in pixels before content image processing algos are appliad.
		 */
		minImageProcessingWidth : 100,
        
		
    },
    
    /**
     * Content delivery options for mobilize.js resource loading,
     * error reporting and user agent sampling.
     * 
     * @class
     */
    cdnOptions : {

        
        /**
         * You need to set this value in order to 
         * cache mobile page template in localStorage.
         * <p>
         * Every time template is upgraded this values must
         * be changed within your construction script tag.    
         * <p>
         * 
         * localStorage keys:
         *  mobilizejs-localCacheVersion - Previous mobilize localCacheVersion
         * 
         * Resources are stored by their bundle id as key
         * 
         * If value is null caching is not used.
         * <p>
         * @default null         
         */
        localCacheVersion : null,
        
       /**
        * URL used for CDN download, error reporting and user agent sampling services.
        * 
        * @default Extract from <script class="mobilize-js-source"> 
        */
        baseURL: null,
        
        /**
         * Javascript and resources bundle which download from the cloud service. 
         * <p>
         * Set to null to not try to do bundled script downloading
         * 
         * @example moblize.wordpress
         * 
         * @default null
         */
        bundleName : null,
        
        /**
         * Filenames of Javascript files to load after bootstrap.
         * <p>
         * Template variable <code>$bundleName</code> can be used in the strings.
         * <p>
         *
         * <p>
         * Can be absolute URL, relative to CDN or relative to HTML file.
         * </p>
         * @see mobilize.toFullCDNURL
         * 
         * @default ["mobilize.core.mobile.min.js"]
         */
        javascriptBundles : ["js/mobilize.core.mobile.min.js"],
        
        /** Url to send critical internal errors */
        //errorReportingURL : "http://cdn.mobilizejs.com/logerror/",
		errorReportingURL : null, // $$ERROR_REPORTING_LINE
        
        /**
         * Filenames of CSS files to load after bootstrap.
         * <p>
         * This is usually a bundle file from mobilize.js CDN.
         * </p>
         * 
         * <p>
         * Can be absolute URL, relative to CDN or relative to HTML file.
         * </p>
         * 
         * @see mobilize.toFullCDNURL
         * 
         * @default ["mobilize.core.mobile.min.css"]
         */
        cssBundles : ["css/mobilize.core.mobile.min.css"],
        
        /** 
         * Which HTML template to use for the mobile page 
         * <p>
         * Extenders may override this.
         */
        template : "templates/core.html",
        
        
        /**
         * In-line template used for jQuery Mobile page skeleton.
         */
        templateSource : '<div id="mobile-body"><div data-role="page"><div data-role="header"></div><div id="mobile-content" data-role="content"></div><div data-role="footer"></div></div></div>',
        
        /**
         * mobilize.js version. 
         * <p>
         * Used in cloud error reporting and user agent sampling.
         * <p>
         * Note that this variable will be updated by release scripts 
         * for bundle creation.
         * 
         * @private
         */
        version : "XXX" // $$VERSION_LINE
        
		
    },

    /** Async flag indicating that jQuery Mobile has been loaded */
    jQueryMobileLoaded : false,

    /** Async flag indicating that mobile page transform is complete */
    transformComplete : false,
    
    /** An event handler, called once transformComplete and jQueryMobileLoaded are complete */ 
    onCompleted : null,
	
	/** Have we tried to hide body temporary yet */
	suspendRenderingAttempted : false,
	
	/** How the page is currently being displayed. Can be "web", "suspended", "mobile" */
	renderingState : "web",
    
    /**
     * Initialize mobilize class.
     * 
     * <h2>Options<h2>
     * 
     * <table><tbody>
     * 
     * <tr><th>resourceWhitelist</th>
     * <td>String tags which mark head tag JS and CSS resources not to be purged</td></tr>
     * 
     * 
     * @static
     * 
     * @param options Javsacript object to override mobilize.options
     * 
     * @param cdnOptions Javascript object to override mobilize.cdnOptions
     */
    init : function(options, cdnOptions) {
        
        if(mobilize._init_called) {
            mobilize.log_w("init called more than once. Is mobilize.js initialized both manually and via autoload?");
            return;
        }
        mobilize._init_called = true;
        
        // Override default parameters with user supplied versions        
        if(!options) {
            options = {};
        }
        
        if(!cdnOptions) {
            cdnOptions = {};
        }
		        
        // Extend global options with subclass supplied ones
        mobilize.initPlugins();
    
        // Extend global options with user supplied ones
        mobilize.extend(mobilize.options, options);

        mobilize.extend(mobilize.cdnOptions, cdnOptions);
        
		mobilize.log(mobilize.cdnOptions);
		
        if(!mobilize.isBrowserSupported() && !mobilize.options.forceMobilize) {
            mobilize.log("mobilizejs: browser is not supported");
            return;
        }
        
        // Check if localStorage is supported and force disable if not
        if(typeof(localStorage) === undefined && mobilize.options.localCacheVersion) 
        {
            mobilize.log("localStorage not supported for caching.");
            mobilize.options.localCacheVersion = null;
        }
        
        mobilize.initCloud();

        // Check if we have site specific custom init hook available and call it
        if(!window.mobilizeCustomInit) {
			mobilize.log("No custom init hook available");
			// XXX: should we report something here
		} else {
			mobilize.log("Calling custom init hook");
			mobilizeCustomInit();
		}
    },
    
    /**
     * Entry point to mobilize.js machinery.
     * <p>
     * Stop loading current HTML resources, start async processes
     * to get the page mobilized.
     * 
     */
    bootstrap : function() {

        mobilize.log("bootstrap()");

        // Needed to avoid trouble with autoload
        if(mobilize._bootstrap_called) {
            throw "bootstrap called more than once. Is mobilize.js initialized both manually and via autoload?";
        }
        
		mobilize._bootstrap_called = true;
		
		var existingCookie = mobilize.readCookie("mobilize-mobile"); 
                      
        if(!mobilize.isBrowserSupported() && !mobilize.options.forceMobilize) {
            mobilize.log("mobilize.js: browser is not supported");
            return;
        }			

        // XXX: Clear this code
        // checkMobileBrowser() will set the cookie
        
        if(mobilize.checkReloadPage(existingCookie)) {
        	// Page refresh toggled
        	return;
        }
	
        function startProcess() {
			mobilize.log("startProcess");
			
			try {
	            if(mobilize.checkMobileBrowser(mobilize.options)) {
	                mobilize.renderAsMobile();
	            } else {
	                mobilize.log("Web mode wanted");
	            }
			} catch(e) {
				// We fail
				mobilize.sendExceptionToCloudService("bootsrap", e);
                throw e;
			}
        }
		        
        // TODO: Execute events which we can do before DOM model must be ready	
		document.addEventListener("DOMContentLoaded", startProcess, false);
			
    },
    
    /**
     * Initialize URL location from where to load Javascript files.
     * <p>
     * Deliver download URLs for various scripts and resources based
     * on script tag with class="mobilize-js-source".
     * <p>
     * @see mobilize.cdnOptions
     * 
     * @private 
     */
    initCloud : function() {
		
		mobilize.log("Initializing URL base for media resources");
        
        var opts = mobilize.cdnOptions;
                       
        if(!opts.cloudBaseURL) {
            // Try to extract cloud URL from our <script> tag
            var script = document.getElementsByClassName("mobilize-js-source");
            var src = 0;
            
            if(!script.length) {
                
				mobilize.log("No <script> hints found, do it hard way");
                // Try to determine from src attribute if class not set. 
                // This is needed for convenient autoload.
                // It's tedious to set the mobilize-js-source class for Sphinx template,
                // but now we can just add it to the template's script_files field.
                var scripts = document.getElementsByTagName("script");
                for(var i=0; i<scripts.length; i++) {
                    script = scripts[i];
                    
                    // Found our script tag
                    src = script.getAttribute("src");
                    if(!src) {
                        // Inline script tag
                        continue;
                    }
                    
                    if(src.indexOf("mobilize.") >= 0) {
                        // Current 'script' ok
                        break;
                    }
                }
            }
            else {
                script = script[0];
                src = script.src;
            }
            
            if(!src) {
                var msg;
                msg = "Could not found <script> with class='mobilize-js-source' or src with 'mobilize.' text in HTML to resolve mobilize.js hosting location";
                mobilize.logError(msg);
                throw msg;
            }
			
			var base = mobilize.baseurl(src);

            // Remove /js/ from the end of the URL
            base = base.substring(0, base.length-4);
            opts.baseURL = base; 
            
            mobilize.log_d("Found script source URL " + opts.baseURL);
        }
        
    },
    
    /**
     * Check if this client has not a mobile cookie set before.
     * <p>
     * Trigger page refresh if needed, now with cookie set.
     * <p>
     * @returns true if page refresh was triggered
     */
    checkReloadPage : function(existingCookie) {

    	var isMobile = mobilize.checkMobileBrowser(mobilize.options);

    	// true, false or null if not set
	    var cookie = mobilize.readCookie("mobilize-mobile");

		mobilize.log("reload on mobile check, got new cookie value:" + cookie + "  got old cookiea value:" + existingCookie);
    	
		if(!isMobile && cookie == null) {
			// Desktop browser, first time arrival to the site
			// Do not hit refresh unneededly
			return false;
		}
				
        // If reloadOnMobile set, set cookie and reload to allow server do its magic
        if(mobilize.options.reloadOnMobile) {
							
        	// XXX: Make function to return cookie value for us directly from the check
        	
            if (existingCookie != cookie) {						
				mobilize.log("Mobile cookie has changed. Server has asked us to reload in this situation (reloadOnMobile).");
				mobilize.log("Refreshing page");                
                window.location.reload();
                return true;
            } 
			
			mobilize.log("Cookie already exists - continue with normal mobile flow");
        }		    	
        
        return false;    	    	
    },
    
    /** Parse domain url */
    domainurl : function (src) {
        var i = src.indexOf("://");
        if(i >= 0)
        {
            i += 3;
        }
        else 
        {
            i = 0;
        }
        
        var ie = src.substring(i, src.length).indexOf("/") + i;
        var base = src.substring(0,ie);
        return base;
    },
    
    
    
    /** Execute mobilization automatically.
     * <p>
     * To prevent this, set window.mobilizeAutoload = false; in script tag before
     * including any mobilize.js files.
     * <p> 
     * And initialize mobilize manually:
     *  mobilize.init();
     *  mobilize.bootstrap();
     * <p>
     * Try autoload as early as possible to trigger forceReloadOnMobile action as early as possible
     * (don't load web page content for too long if we can abort early). This
     * function must be called from the last shared desktop + extender bundle JS file.
     * So if you have mobilize.js + mobilize.wordpress.js, mobilize.autoload() call
     * must be placed at the end of mobilize.wordpress.js.
     * 
     */
    autoload : function()
    {		
        if(window.mobilizeAutoload === false) {
            // Autload has been disabled
            return;
        }
		
        function doAutoload()
        {
            // Don't do twice.
            if(mobilize._autoload_called) {
                return;
            }
            mobilize._autoload_called = true;
            
            mobilize.log_d("Autoloading mobilize.js");
            
            mobilize.init();
            mobilize.bootstrap();
        }
        				
		doAutoload();
    },
    
    /**
     * Simple shallow copy from an object to another.
     * <p>
     * 
     *  
     * @param {Object} target Javascript object to receive new members
     * 
     * @param {Object} source Javascript object to source new members
     */
    extend : function(target, source) {
        var name;
        // jslint: The body of a for in should be wrapped in an if statement to filter unwanted properties from the prototype.
        // Not true here, we want to copy them all.
        for(name in source) { // jslint:ignore
            var val = source[name];
            target[name] = val;
        }           
    },
    
    /**
     * Run plug-in specific options overrides.    
     * <p>
     * The plug-in overriding mobilize.js default options
     * by overriding this method and manipulating
     * options and cdnOptions. 
     * <p>
     * At least mobilize.cdnOptions.bundleName must be set.
     * <p>
     * 
     * @see mobilize.options
     */
    initPlugins : function() {
        
    },
     
     
    /** 
     * Utility for internal debug logging.
     * 
     * Support kinky devices, e.g. Nokia, which do not have console of any sort 
     * by sending log output to remote server via AJAX.
     * 
     * @param tag: Debugging tag, e.g. log level (optional)
     * 
     * @param msg: message to log
     * */
    log : function(aMsg) {
    	    
		// Pass messages to console as is
		// (as it may be an object, not string)
		if(window.console) {
            if(console.log) {
                console.log(aMsg);
				return;
            }
        }
	
	   /*            
        if(mobilize.options.haveRemoteDebugLogging) {
            var req = new XMLHttpRequest();
            req.open('GET', mobilize.options.remoteDebugLogBaseUrl + 'log?msg=' + msg, false);
            req.send(null);
        }*/		
    },
	
    /** Log debug message */
    log_d : function(msg){
        mobilize.log(msg);
    },
    /** Log warning message */
    log_w : function(msg){
        mobilize.log(msg);
    },
    /** Log error message */
    logError : function(msg){
        if(console.error) {
			console.error(msg);
		}
    },

    /**
     * Report client errors to the cloud error service.
     * <p>
     * Allow monitoring the global status of mobilize.js deployments
     * for possible problems with new devices.
     * <p>
     * @param {Object} task Task name which failed
     * @param {Object} exception Exception object
     */
	sendExceptionToCloudService : function(task, exception) {

        mobilize.log("Cloud error reporting activated");

        // Don't proceed if error reporting is not on
        if(mobilize.cdnOptions.errorReportingURL) {
            
			mobilize.log("Reporting to home");
			
			var req = new XMLHttpRequest();
						
			// Convert exception to string
			var msg = "" + exception;
			
            var url;			
            url = mobilize.cdnOptions.errorReportingURL;
            url += "?version=" + encodeURIComponent(mobilize.cdnOptions.version);
            url += "&msg="+ encodeURIComponent(msg);
            url += "&task="+ encodeURIComponent(task);
            url += "&bundle="+ encodeURIComponent(mobilize.cdnOptions.bundleName);
            url += "&random="+ Math.random();
    	      
            req.open('GET', url, false);
            req.send(null);
        }
		
	},
    
    /** 
     * <p>Get baseurl from url by ignoring file and url parameters</p> 
     * 
     * <b>Example</b>
     * <pre>
     * mobilize.baseurl(window.location.href)
     * </pre>
     * @param url : Url to parse
     * 
     * */
    baseurl : function (aUrl) {
        
        var end;
        var url;
        
        end = aUrl.indexOf('?');
        
        if(end <= 0) {
            end = aUrl.length-1;
        }
        
        url = aUrl.slice(0, end);
        // Ignore slash at the end of url
        if(url[url.length-1] == "/" ) {
            url = url.slice(0,url.length-2);
        }
        
        // But add the slash to result for convenient concat
        end = url.lastIndexOf("/") + 1;
        url = url.slice(0,end);
        
        return url;
    },
    
    /** Make a function call and report possible exceptions back to a centralized server.
     * 
     * We use this to track problems with possible not-so-well-implemented mobile browsers.
     */
    callWithErrorReporting : function(func) {
        try {
            func();
        } catch(e) {
            // 
        }
    },
    
    /** Add new URL variables safely with or without existing '?' character */
    addUrlVar : function(aURL, aNewVar){
        var args = mobilize.getUrlVars(aURL);
        var newurl = aURL.split("?",1)[0];
        newurl += "?";
        
        var items = [];
        for(var i = 0; i < args.length; i++) {
            var a = args[i];
            var value = args[a];
            items.push(a + "=" + value);
        }
        
        items.push(aNewVar);
        
        newurl += items.join("&");
        return newurl;
    },
    /** 
     * Read URL parameters to dict.
     * 
     * See: http://jquery-howto.blogspot.com/2009/09/get-url-parameters-values-with-jquery.html
     */
    getUrlVars : function (aURL)
    {
        if(!this._urlvars) {
            this._urlvars = {};
        }
        if(!aURL) {
            aURL = window.location.href;
        }
        
        // Cache window.location.href call results
        if(this._urlvars[aURL]) {
            return this._urlvars[aURL];
        }
        
        var vars = [], hash;

        if(aURL.indexOf("#") >= 0 ){
            aURL = aURL.slice(0,aURL.indexOf("#"));
        }
        var hashes = aURL.slice(aURL.indexOf('?') + 1).split('&');
        
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        
        this._urlvars[aURL] = vars;
        return vars;
    },

    /**
     * Create a new cookie 
     * 
     * @see http://www.quirksmode.org/js/cookies.html     
     */
    createCookie : function(name,value,days) {
        var expires = "";
        
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            expires = "; expires="+date.toGMTString();
        }
        document.cookie = name+"="+value+expires+"; path=/";
    },
    
    /**
     * Get a cookie value by name 
     * 
     * @see http://www.quirksmode.org/js/cookies.html     
     */
    readCookie : function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)===' ') {
                c = c.substring(1,c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length,c.length);
            }
        }
        return null;
    },
    /** 
     * See: http://www.quirksmode.org/js/cookies.html     
     */
    eraseCookie : function(name) {
        mobilize.createCookie(name,"",-1);
    },
    
    /**
     * Check if browser is running on mobile platform
     * 
     * @param name: Optional userAgent string
     *  
     * @return true if browser is mobile browser 
     * @see: http://detectmobilebrowser.com/ for the detection code.
     * */
    isMobile : function(name){
        if(!name) {
            name = (navigator.userAgent || navigator.vendor || window.opera);
        }
        
        function f(a,b){
            if(/android|avantgo|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))
            {
                return true;
            }
            else {
                return false;
            }
        }        
        
        return f(name);
    },
    /** Check if browser is running on mobile platform or is forced mobile and update cookie.
     * <p>
     * @param userAgent   = userAgent name. Uses browser's userAgent by default
     * <p>
     * @param forceMobilize = Force detection to mobile to true or false regardless of real type
     * <p>
     * URL parameter mobilize=<true,1> can also be used to force mobile.
     * <p>
     * The state is also stored to 'mobilize-mobile' cookie this
     * information is passed to server for the following requests. 
     * URL and options.force paremeters 
     * override cookie and detection.
     * <p>
     * @return: true if browser is considered as mobile browser.
     */ 
    checkMobileBrowser : function (opts)
    {
        var forced;
        var name;
        if(!opts) {
            opts = {};
        }
        
        // Using cookie by default
        // forced = mobilize.readCookie("mobilize-mobile");

        // For user agent testing
        name = opts.forceUserAgent;
        
        // Note: URL parameter and option overrides cookie        
        // Get URL var to mobilize page
        forced = mobilize.getUrlVars()[mobilize.options.mobilizeQueryParameter];
        
        // Javascript option to always render in mobile mode
        if(opts.forceMobilize !== undefined) {
            forced = opts.forceMobilize;
        }
        
        if(forced !== undefined && forced !== null ) {
            result = (forced == "true" || forced == "1" || forced === true || forced === 1);
        }
        else {
            result = mobilize.isMobile(name);
        }
		
		
		mobilize.createCookie("mobilize-mobile", result ? "1" : "0");
                
        return result;
    },
	
	
    
    /**
     * Clear conflicting jQuery objects
     * <p>
     * jQuery might ill behave if we overlay it with a different version
     * 
     * @private 
     */
    clearConflictingJQuery : function() {
        
        // - if two jQuery instances are loaded then event handlers do not function 
        // properly
        
        if(window.jQuery !== undefined) {
            delete window.jQuery;            
        }
        
        if(window.$ !== undefined) {
            delete window.$;        
        }    
    },
            
    /**
     * Reconstruct page HTML code for mobile presentation.
     * <p>
     * Stop loading all web page resources until mobile template is properly placed
     * and template transformation has taken place.
     * 
     */
    renderAsMobile : function() {
        
        mobilize.log("Enabling mobile rendering");
        
        mobilize.suspendRendering();
        
        mobilize.cleanHead();
        
        // XXX: Makes page flicked. Need to come up something smarter
        // mobilize.restoreRendering();
        
        mobilize.loadMobileResources();

    },
    
    /**
     * Convert relative paths to full CDN URLs if they are relative
     * <p>
     * URIs can be
     * </p>
     * <ul>
     * <li>Absolute: must start with http
     * <li>Relative to HTML file. Must start with dot and be like ./myserver/file.js
     * <li>Relative to CDN base URL (default).
     * </ul>
     * 
     * @param uri Relative URI or full URL.
     * 
     * @returns Full URL to the resolved file.
     * 
     */
    toFullCDNURL : function(uri) {
      
	    if(uri.length < 2) {
			throw "Empty URI";
		}

         // Absolute URL	  
	    if(uri.indexOf("http") >= 0) {
            return uri;
        } 
		
	    // Relative to HTML file
	    if(uri[0] == "." && uri[1] == "/") { // Ghetto startsWith()
	        var base = mobilize.baseurl(window.location.href);
		    var url = base + uri.substring(2, uri.length);
	        return url;
		}
		
		// Relative to CDN root
		if(mobilize.cdnOptions.baseURL === null) {
			throw "mobilize.cdnOptions.baseURL must be defined or auto-detected";
		}
        return mobilize.cdnOptions.baseURL + "/" + uri;

    },
    
    /**
     * Load JS and CSS files needed on the mobile page.
     * <p>
     * This function provides some logic for caching 
     * the result, so that the files are not reloaded again.
     * <p>
     * Note that Javascript is loaded synchronously
     * and transform() won't proceed until Javascript
     * (jQuery) is completely loaded.
     * <p>
     * CSS are loaded asyncrhonously.
     */
    loadMobileResources : function() {        
        var i;
        var self = this;
        var cdn = mobilize.cdnOptions;
        var jsCompleteCount = 0;
        var cacheVer = mobilize.cdnOptions.localCacheVersion;
        
        if(cacheVer) {
            mobilize.log("localStorage enabled for caching. Version:" + cacheVer);
        }
        
        mobilize.log("Constructing mobile <head>");
        
		var scriptsToLoad = [];		
                
        var bundle, scriptURL;
        for(i=0; i<cdn.javascriptBundles.length; i++) {
            bundle = cdn.javascriptBundles[i];
			scriptURL = mobilize.toFullCDNURL(bundle);
            scriptsToLoad.push([bundle, scriptURL]);
        }
		
		// Prepare for pop() loading, zero index first
		scriptsToLoad.reverse();

        // Force synchronous loading of scripts
		// in first to last order		
		function loadNextScript() {
			if(scriptsToLoad.length == 0) {
				mobilize.log("All scripts loaded");
				// All done -> Start processing the page
				// when we have all Javascript code we want to have
                self.prepareMobileTemplate();				
			} else {
				
				var entry = scriptsToLoad.pop();
				var bundle = entry[0];
				var url = entry[1];
				mobilize.log("Loading next script " + url);				
				mobilize.loadScript(bundle, url, loadNextScript);				
			}
		}

        // Bootstrap script loading
		loadNextScript();

        for(i=0; i<cdn.cssBundles.length; i++) {
            bundle = cdn.cssBundles[i];
			var url = mobilize.toFullCDNURL(bundle);
            mobilize.log("Starting CSS load:" + url);
            mobilize.loadCSS(bundle, url);
        }
         
        if(cacheVer !== null) {
            localStorage.setItem("mobilizejs-localCacheVersion", cacheVer);
        }
        
        mobilize.log("Syncronous boostrap done");
    },
            

    /**
     * Helper function to do AJAXy requests before jQuery has been loaded.
     * 
     * @param {String} url
     * 
     * @param callback(payload)
     */
    getAJAX : function(url, callback) {
        		
		mobilize.log("AJAX loading:" + url);
		
		var req = new XMLHttpRequest();
        req.open('GET', url, true);
        req.onreadystatechange = function (aEvt) {
           if(req.readyState == 4) {
               if (req.status == 200) {
                   callback(req.responseText, req.status, req);
               }  else {
                   mobilize.log("Could not AJAX url:" + url + " got status:" + req.status);
                   mobilize.log("Status text:" + req.statusText);
				   mobilize.log("Payload:");
				   mobilize.log(req.responseText);
				   //callback(req.responseText, req.status, req);           
		       }
           }
        };
        req.send(null);
    },
    
    /** Javascript type enum for bundle */
    BUNDLE_TYPE_JS : 0x1,
    
    /** CSS type enum for bundle */
    BUNDLE_TYPE_CSS : 0x2,
    
    /** Load resource from localstorage if possible, 
     * otherwise use AJAX to get the resource and store it.
     * 
     * @param bundletype: Type of the bundle BUNDLE_TYPE_JS or BUNDLE_TYPE_CSS
     * @param bundle: Name of the bundle resource
     * @param aURL: URL to the bundle
     * @param aCallback: Callback to signal completion
     */
    loadBundleFromLocalStorage : function(aBundleType, aBundle, aUrl, aCallback){
        
		// XXX: Remove or fix this method
		
		throw "Currently unsupported";
		
        if( !(aBundleType & (mobilize.BUNDLE_TYPE_CSS | mobilize.BUNDLE_TYPE_JS) ) )
        {
            mobilize.log("ERROR: Invalid bundle type " + aBundleType);
            return;
        }
        
        function applySource(aSource) {
            if(aBundleType == mobilize.BUNDLE_TYPE_JS) 
            {
                eval.call(null, aSource);
            }
            else if(aBundleType == mobilize.BUNDLE_TYPE_CSS) 
            {
                var s = document.createElement("style");            
                s.innerText = aSource;
                document.getElementsByTagName("head")[0].appendChild(s);
            }
            
            localStorage.setItem(aBundle, aSource);
            
            if(aCallback) {
                aCallback();
            }
        }
        applySource = mobilize.trappedInternal(applySource);
        
        // Check version
        // If localstorage has different version, the mobilize.js has been updated
        var source = localStorage.getItem(aBundle);
        var oldVer = localStorage.getItem("mobilizejs-localCacheVersion");
        var newVer = mobilize.cdnOptions.localCacheVersion;
        if( oldVer != newVer) {
            mobilize.log("localStorage versions are different. old:" + oldVer + " new:" + newVer);
            source = null; // Force reload
        }

        if(!source) 
        {
			// XXX: Fix to support error callback
            mobilize.getAJAX(aUrl, applySource);
        }
        else {
            applySource(source);
        }
    },
    
    /**
     * Magical dynamic Javascript file loader.
     * <p>
     * Load a JS script from 
     * <p>
     * <ul>
     * <li>Local cache if available
     * <li>Using <script> inject if supported by platform
     * <li>Using AJAX and eval()
     * </ul>
     * <p>
     * @param {String} bundle: Name of the bundle, used to store to localStorage.
     * @param {String} url
     * @param {Object} callbacl
     */
    loadScript : function(bundle, url, callback) {
        
		// Check if we can use a cached version
        if(mobilize.cdnOptions.localCacheVersion !== null) {
            mobilize.loadBundleFromLocalStorage(mobilize.BUNDLE_TYPE_JS, bundle,url,callback);
            return;
        }
		
        // Injecting script tag doesn't work with android webkit
        //if(navigator.userAgent.toLowerCase().indexOf("android") >= 0 )
		if(false) {
            mobilize.loadScriptWithAjax(url, callback);            
        } else {
			mobilize.loadScriptWithTag(bundle, url, callback);
		}
	},

    /**
     * Load JS script using AJAX + eval().
     * <p>
     * http://blog.client9.com/2008/11/javascript-eval-in-global-scope.html
     * <p>
     * @param {Object} aUrl
     * @param {Object} aCallback
     */
    loadScriptWithAjax : function(aUrl, aCallback){
        mobilize.log("Loading script using AJAX for evaluation:" + aUrl);
        function loaded(aJavascript) 
        {
			try {
	            mobilize.log("Loaded payload for " + aUrl + ", now evaling() it ");
	            eval.call(null, aJavascript);
	            aCallback();				
			} catch(e) {
				mobilize.sendExceptionToCloudService("AJAX script load for:" + aURL, e);
			}
        }
		// XXX: Fix to support error responses
        mobilize.getAJAX(aUrl, loaded);
        return;
    },

		
    /**
     * Load a script file by injecting new <script> in <head> 
     * 
     * @param {Object} bundle
     * @param {Object} url
     * @param {Object} callback
     */
	loadScriptWithTag : function(bundle, url, callback) {
        
        // Using script tag injection to have JS debugger show the source
        mobilize.log("Injecting <script> tag to load:" + url);
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.setAttribute("src", url);
        script.src = url;
        
        script.onerror = function(e, a, b, c) {
        	mobilize.log("Script contained errors:" + url);
        	mobilize.logError(e);		
			
			try {
				mobilize.sendExceptionToCloudService("Load script for " + url, "");
			} catch(e) {				
			}
			
		    // Make sure we have something to display even though the 
			// scripts contain errors
			mobilize.restoreRendering();

        };
        
        // From jQuery
        //var done = false;
        script.onload = script.onreadystatechange = function() {
            
            mobilize.log("Script onload handler for " + url);
            
            if ( !this.done && (!this.readyState ||
                    this.readyState === "loaded" || this.readyState === "complete") ) {
                this.done = true;
                callback();
                
				// XXX: Mikko: Disabled as this made debugging little bit tricky
				// We don't support IE in any case, or care if it leaks
                // Handle memory leak in IE
                /*script.onload = script.onreadystatechange = null;
                if ( document.head && script.parentNode ) {
                    document.head.removeChild( script );
                }*/
            } else {
            	mobilize.log("Interesting script state:" + this.readyState);
            }
            
        };
        
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(script);
        
    },
    
    /**
     * Load a CSS file for the mobile page.
     * <p>
     * The file is loaded asynchronously 
     * and inserted as <link> tag to the head.
     * <p>
     * TODO: Check from the cache from the existing version
     * 
     * @param {String} bundle: Name of the bundle, used to store to localStorage.
     * @param url CSS url.
     */
    loadCSS : function(bundle, url) {        
        //mobilize.log("document.head:" + String(document.head));
        if(mobilize.cdnOptions.localCacheVersion !== null) {
            mobilize.loadBundleFromLocalStorage(mobilize.BUNDLE_TYPE_CSS, bundle, url, null);
            return;
        }
        
        var link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", url);        
        document.getElementsByTagName("head")[0].appendChild(link);
    },
        
    /**
     * Check if a given link is on resource whitelist.
     * 
     * @param src URL
     * 
     * @param list List of substring matches. If matches do not remove the element.
     * 
     * @returns true if the src string has substring match of any list element
     */
    checkResourceWhitelist : function(src, list) {
        for(var i=0; i<list.length; i++) {
            var matcher = list[i];
            if(src.indexOf(matcher) >= 0) {
                return true;
            }
        }    
        return false;
    },
    
    /**
     * Remove unnecessary script tags if not needed for mobile.
     * 
     * Use options.resourceWhitelist matching.
     */
    cleanJavascript : function() {
        
        mobilize.log_d("Cleaning <script>s");
        
        var tags = document.getElementsByTagName("script");

        for(var i=0; i<tags.length; i++) {
            var script = tags[i];
            var src = script.getAttribute("src");
            
            if(!src) {
                // TODO: Inline script
                continue;
            }
            
            if(!mobilize.checkResourceWhitelist(src, mobilize.options.whitelistScriptSrc)) {
                mobilize.log("Cleaning script tag:" + src);
                var parent = script.parentNode;
                parent.removeChild(script);
            }
        }
    },

    /**
     * Remove web only <link rel="stylesheet"> tags
     * 
     */
    cleanCSSLink : function() {
        
        mobilize.log("Cleaning <link rel='stylesheet'>s");
        
        var tags = document.getElementsByTagName("link");

        for(var i=0; i<tags.length; i++) {
            script = tags[i];
            
            var rel = script.getAttribute("rel");
            if(rel != "stylesheet") {
                continue;
            }          
            
            var src = script.getAttribute("href");
            if(!mobilize.checkResourceWhitelist(src, mobilize.options.whitelistCSSLinks)) {
                var parent = script.parentNode;
                parent.removeChild(script);
				mobilize.log("Removing stylesheet:" + src);
            }
        }
    },

    /**
     * Remove unnecessary CSS links from <head> if not needed for mobile.
     * 
     * Supports syntaxes
     * 
     * <style type="text/css">
     *  @import url(http://plone.org/portal_css/Sunburst%20Theme/newplone-cachekey7531.css);
     * </style>
     * 
     * Use options.resourceWhitelist matching.
     */    
    cleanCSSStyle : function() {
        
        mobilize.log("Cleaning <style>s");
        
        var tags = document.getElementsByTagName("style");
        
        // http://bytes.com/topic/javascript/answers/600139-get-file-name-style-tag
        function remove(style) {
            var parent = style.parentNode;
            parent.removeChild(style);
        }
        
        for(var i=0; i<tags.length; i++) {
            var style = tags[i];
          
            var text = style.textContent;
          
            if(!text) {
                mobilize.log("Interesting style node:");
                mobilize.log(style);
                continue;
            }
			
			if(style.hasAttribute("class")) {
				// <style> block has been marked to be preseverd beforehand
				// by theme author or mobilize.js itself
				if(style.getAttribute("class").indexOf("mobilize-preserve")) {
					continue;
				}
			}
          
            // Make sure we don't start searching through very long
            // inline CSS
            if(text.length < mobilize.options.inlineStyleMaxCheckLength) {
              
                // This is inline CSS import
                var matches = text.match(/@import url\(.*\);?/mg);
            
                if(matches !== null) {
                    for(var j=0; j<matches.length; j++) 
                    {
                        if(!mobilize.checkResourceWhitelist(matches[j], mobilize.options.whitelistStyleImport)) {
                            remove(style);
                            break;
                        }
                    } 
                }
            } else 
            {
                //  too long CSS snippet, drop unconditionally
                remove(style);
            }
        }
    },

    /**
     * Stop loading Javascripts and CSS we do not need in mobile mode.
     */
    cleanHead : function() {
        mobilize.cleanJavascript();    
        mobilize.cleanCSSLink();    
        mobilize.cleanCSSStyle();    
    },


    /**
     * Make sure the browser does not load anything extra before mobile transform has taken place.
     * <p>
     * We try
     * <p> 
     * 1) supress body rendering instantly, even if <body> is still loading, but <head> is available.
     * <p>
     * 2) supress image loading when <body> is ready
     * <p> 
     */
    suspendRendering : function() {
        
        mobilize.log("Suspending page rendering");

        mobilize.renderingState = "suspended";

        /** 
         * Add a stylesheet snippt which hides all body children except our special 
         */
        function supressBody() {
		  mobilize.log("Hiding body, showing the page is being mobilized logo");
		  
		  // Hide all <body> child elements expect our laoding banner
		  // Also work together with jQuery Mobile so that our loading supressors don't conflict
          var css = "body > * { visibility: hidden !important;} \n body > #mobilize-supress { visibility: visible !important; color: #dc3c01; text-align: center; font-family: Helvetica, Arial, sans-serif; font-weight: bold; margin: 5px auto; width: 200px; } \n .ui-mobile-rendering > body { visibility: visible !important }";
          var elem = document.createElement("style");
          elem.setAttribute("type", "text/css");
          elem.setAttribute("class", "mobilize-supressor mobilize-preserve");
		  elem.innerHTML = css;
          document.head.appendChild(elem);
		  
		  // Add our loading banner
		  var html = '<p>Please wait while loading mobile optimized version</p>'	
          html += "<img src=" + mobilize.cdnOptions.baseURL + "/css/images/ajax-loader.gif" + " />"; 
          html += "<br>"
          html += "<img src=" + mobilize.cdnOptions.baseURL + "/css/images/logo_with_text_128.png" + " />"; 

          // Loading banner might be already created on the server side
          if (document.getElementById("mobilize-supress") != null) {
				elem = document.createElement("div");
				elem.setAttribute("id", "mobilize-supress");
				elem.setAttribute("class", "mobilize-supressor"); // Elem be removed later    
				elem.innerHTML = html;
				document.body.insertBefore(elem, document.body.firstChild);
		  }

          // Show our logo without zooming
          elem = document.createElement("meta");
          elem.setAttribute("name", "viewport");    
          elem.setAttribute("class", "mobilize-supressor"); // Elem be removed later    
          elem.setAttribute("content", "width=device-width, minimum-scale=1, maximum-scale=1");
          document.head.appendChild(elem);


        }
        
        /**
         * Remove src from all images and temporarily story it as a data attibure orignal-src.
         * 
         * Must be run when <body> is ready.
         */
        function supressImages() {
			mobilize.log("Supressing image rendering");
            var images = document.getElementsByTagName("img");
			var i, count=0;
			for(i=0; i<images.length; i++) {
				var img = images[i];
				if(img.hasAttribute("src")) {
					var src = img["src"];
					img.setAttribute("data-orignal-src", src);
					img.removeAttribute("src");
					count++;
				}
			}
			mobilize.log("Supressed " + count + " <img>s");
        }
        		
		document.addEventListener("DOMContentLoaded", supressImages, false);                 
		
		// supressImages();
		
		function onLoaded() {
			mobilize.log("Second body rendering suspect added, called from DOMContentLoaded");
			mobilize.suspendRendering();
		}
		
		// This happens when we have been invoked from <head>,
		// we cannot suspect body until it is created
		if(!document.body) {
			
			if (!mobilize.suspendRenderingAttempted) {
			    mobilize.suspendRenderingAttempted = true;
				
				mobilize.log("No <body> available, trying to suspend rendering later");
				if (document.addEventListener) {
				}
				return;
			}
		}
        
        if(!document.body) {
            // DOM tree loading, couldn't get hang off it
            throw "Could not find body while loading?";
        }
		
		supressBody();        
		

    },
    
    
    /**
     * Make body visible again after unnecessary styles have been cleared up.
     * <p>
     * This in the case the loading fails we don't show a blank white page.
     * <p>
     * Also make images to continue loading.
     */
    restoreRendering : function() {
		
		if (mobilize.renderingState == "mobile") {
		  // May happen e.g. when several loaded scripts fire errors
		  mobilize.log("Attemped to restore rendering twice");
		  return;
		}
		
		mobilize.log("Restoring rendering");
		mobilize.renderingState = "mobile";
		
		// Restore body
		function restoreBody() {
			mobilize.log("Restoring body rendering");
			var supressors = document.getElementsByClassName("mobilize-supressor");
        
		    mobilize.log("Found " + supressors.length + " supressors");
			var i;
			for(i=0; i<supressors.length; i++) {
				var s = supressors[i];
				s.parentNode.removeChild(s);
			}
		}
		
		// Restore images
		function restoreImages() {
            var images = document.getElementsByTagName("img");
		    var i,count = 0;
			for(i=0; i<images.length; i++) {
				var img = images[i];
				if(img.hasAttribute("data-orignal-src")) {
					img.setAttribute("src", img.getAttribute("data-orignal-src"));
					count++;
				}
			}			
			mobilize.log("Restored " + count +  " images of all " + images.length + " images");
		}
		
		restoreBody();
		restoreImages();
    },
    
    
    /**
     * Construct UI framework specific 
     * <p>
     * This can be achieved by
     * <p>
     * <ul>
     * <li>Dynamically loading a new template from the server using AJAX
     * <li>Using mobile template embedded in mark-up
     * <li>Construct template in-fly using jQuery
     * </ul>
     * XXX: Hard-coded for the last option for now after having issues with Android and template loading (see blow).
     */
    prepareMobileTemplate : function() {
    
    	mobilize.loadInternalTemplate();
    	
    	// Now we have template in ready, follow to page transform
    	mobilize.transform();
    },
    
    /**
     * Use a template supplied with Javascript source.
     */
    loadInternalTemplate : function() {
    	 $("body").append("<div id='mobile-template-holder'>" + mobilize.cdnOptions.templateSource + "</div>");     	
    },
   
    /**
     * Start loading mobile template to DOM tree.
     * <p>
     * Check possible mobile template cache places.
     * <p>
     * XXX: Currently unused. See above.
     */
    loadMobileTemplate : function() {
        
        var self = this;
        
        // Create the element which will hold the mobile template
        // + transformation result
        $("body").append("<div id='mobile-template-holder'>");
		
		var target = $("#mobile-template-holder");
        if(target.size() == 0) {
            throw "Mobile template loader container missing";
        } 
		              
        var url = mobilize.toFullCDNURL(mobilize.cdnOptions.template);
		
		if(navigator.userAgent.toLowerCase().indexOf("android") >= 0) {
			mobilize.log("Avoiding Android cache control problem for AJAX");
			// Android AJAX + cache is busted
			// http://mobilizejs.com/2011/03/20/android-webkit-xhr-status-code-0-and-expires-headers/
			url += "?android-buster=" + Math.random();
		}
		
        mobilize.log("Loading mobile template from URL:" + url);
		
		function onTemplateLoaded(text, status, req) {
			mobilize.log("Text status:" + status);
	        mobilize.log("Template load AJAX complete, status:" + req.status);   
			
			if(req.status == 0) {
				mobilize.log("Oh crap. Not this again.");
				mobilize.log(text);				
			} 
			
			if(req.status != 200) {
				return;
			}

            // Place template to its container
            target.html(text);

			mobilize.transform();
		}
		
		// XXX: We had some serious problems here to make jQuery.get
		// AJAX requests to complete on Android properly.
		// Now we use plain-javascript to get more low
		// level control on different devices.	
		
		function startAJAX() {
			mobilize.log("Trapped AJAX call");
					
            mobilize.getAJAX(url, onTemplateLoaded);
			mobilize.log("done");
		}
		        
        // Don't report this as internal error as it's most likely user error
        var startAJAX = mobilize.trapped(startAJAX, { scope : mobilize } );
		startAJAX();
    },
    
    
    /**
     * Get rid of mobile template
     */
    closeMobileTemplate : function() {
    },
    
    
    prepareTransform : function() {

        if(!jQuery) {
            throw "jQuery needed in order to run content transform";
        }
        
    },
    
    /**
     * Transform the web page content to mobile frame.
     * 
     * Subclasses must override this.
     * 
     * After the function has been finished mobilize.completeTransform() must
     * be called to allow async handlers to proceed. 
     */
    transform : function() {
		mobilize.log("Begin mobile transform");
		try {
	        mobilize.constructHead();            
	        mobilize.constructBody();
	        mobilize.completeTransform();
		} catch(e) {
			mobilize.log("Exception during transform");
			
			// Try recover hard.
			// Salvage whatever we have on the page.
			try {
                if($("#mobile-template-holder div[data-role=content] > *").size() == 0) {
					// We did not yet get any content on the page, do 
					// it roughly.
					// Put everything on the page to the mobile content area
					$("#mobile-content").append($("body > div[id != mobile-template-holder]"));
				}
				
				mobilize.completeTransform();   
			
			} catch(e2) {			
			     mobilize.log("Not good");
				 mobilize.log(e2);	
			}

            // In the case of our perfect transformation code fails, make sure that body should
            // be visible
            mobilize.restoreRendering(); 
    
	        mobilize.sendExceptionToCloudService("transform", e);

			throw e;
		}
    },
    
    /**
     * We can proceed with the page visual enhancements
     */
    completeTransform : function() {
        mobilize.transformComplete = true;
        mobilize.prepareFinish();
    },
    
    /**
     * @param href Link as a string
     * 
     * @returns New link target as string or null if the link should be removed 
     */
    rewriteLinkTarget : function(href) {
       return href;
    },

    /**
     * Based on mobilize options, rewrite link targets with mobile ones 
     * or hide links.
     * 
     * @param callback to be called if the link is to be removed
     */
    remapLinks : function(selection, removeCallback) {
        selection.each(function() {
             var input = $(this);
             output = mobilize.rewriteLink(input);
             if(!output) {
                 if(removeCallback) {
                    removeCallback(input);
                }
             }
        });
    },
    
    /**
     * 
     * @param {Object} a DOM node or jQuery object of <a>
     * 
     * @returns null if the link is to be discarded
     */
    rewriteLink : function(a) {
        a = $(a);
        
        var href = a.attr("href");
    
        if(!href) {
            // Not a link
            return null;  
        } 
          
        href = mobilize.rewriteLinkTarget(href);
        a.attr("href", href);
        
        return a;
    },
   
    /**
     * Create <head> section of a mobile rendered version.
     * 
     * The default transform is just to copy everything
     * in #mobile-head from template to <head> of the page.
     */
    constructHead : function() {    
        mobilize.log("constructHead");
        $("head").append($("#mobile-head").children());
        // Make events to be fired when each CSS/Javascript has been loadeds
    },
    
    
    /**
     * Create a simple jQuery Mobile navigation links out of arbitary link list.
     * <p>
     * Creates navigation or news box from existing jQuery content selection.
     * The selection can be list or arbitary elements or list of a a hrefs.
     * <p>
     * @param {Object} selection jQuery selection which to transform
     * 
     * @param title If present add a link box with a title using ui-list
     * 
     * @returns Constructed jQuery tree, ready to place to the document
     */
    createNavigationBox : function(selection, title, outputter) {
        
        var list;

        list = $("<ul data-inset='true' data-role='listview'>");
        selection.each(function() {
             
             var input = $(this);
             var a;
             var contentish;
             var content;
             
             mobilize.log("Creating navigation box link " + this);
             
             // We can be iterating through <a> or <li> element
             if(this.tagName.toLowerCase() == 'a') {
                a = input;         
                contentish = false;                           
             } else {
                 content = input;
                
                // Assume we have 0 or 1 links in the content HTML
                 a = content.find("a");
                if(a.size() === 0) {
                    a = null;
                }
                contentish = true;
             }
             
             if (a) {
                 a = mobilize.rewriteLink(a);
             }
             
             if (outputter) {
                 outputter(list, input, a);     
             } else {
                 
                 // Create normal bulleted lists
                 var output = $("<li role='option'>");
                
                 if (a) {
                     output.append(a).appendTo(list);
                 }
                 
                 if (contentish) {
                     // Format link content
                    output.appendTo(content.children());
                 }
            }
        });
        
        if(title) {
            list.prepend("<li data-role='list-divider'>" + title + "</li>");
        }
        
        return list;
    },
    
    /**
     * Create <body> section of a mobile rendered version.
     * 
     * This transformation is always CMS specific 
     * and your subclass must override this function.
     */
    constructBody : function() {        
    },
    
    /**
     * Make the transformed mobile template body visible and remove the other body data.
     */
    swapBody : function() { 
        var mobileBody = $("#mobile-body").detach();
        $("body").empty();
        $("body").append(mobileBody.children());
    },
    
    /**
     * Check that all async conditions have been completed allowing us to finish the page.
     */
    prepareFinish : function() {
        
        mobilize.log("prepareFinish()");
        if(!mobilize.jQueryMobileLoaded) {
            mobilize.log("Waiting for jQuery Mobile to load");            
        }
        
        if(!mobilize.transformComplete) {
            mobilize.log("Waiting transform() to complete");
        }
        
        mobilize.log("mobilize.jQueryMobileLoaded:"+mobilize.jQueryMobileLoaded);
        mobilize.log("mobilize.transformComplete:"+mobilize.transformComplete);
        if(mobilize.jQueryMobileLoaded && mobilize.transformComplete) {    
            mobilize.finish();
        }
    },

    /**
     * Mobile transformation is done. Show mobile site to the user.
     */
    finish : function() {
       
        this.swapBody();
      	
		this.restoreRendering();
				   
        // Draw jQuery Mobile widgets
        try {
            $.mobile.initializePage();
        } catch(e) {
            mobilize.logError("mobilize::finish initializePage failed:" + e);
			throw e;
        }
        
        // Execute handlers which can be run
        // after jQuery Mobile has completed its internal transforms
        mobilize.log("Finalizing page mobilization");

        mobilize.bindEventHandlers();
        
		// Call event handlers
				
	    // XXX: Convert these to events
        if(mobilize.onCompleted) 
        {
            mobilize.onCompleted();
        }
        
		mobilize.log("Calling mobilizefinish event handlers");
        $(window).trigger("mobilizefinish");
        
    },
    
    /**
     * Subclass may override.
     * 
     * This is called after jQuery Mobile has been set up.
     * You can now attach event handlers to jQuery UI elements.
     * 
     */
    bindEventHandlers : function() {
        
    },
    
    /**
     * Check if the browser is supported. If not, no mobilization is done
     * unless explicitly forced with forceMobilize option.
     * 
     * Code from jQuery mobile, converted to use regular DOM API. 
     * Need to do this because we don't have jquery.mobile until 
     * we know the page will be mobilized.
     */
    isBrowserSupported : function(){
        // TODO: use window.matchMedia once at least one UA implements it
        var cache = {};
        var testDiv = document.createElement("div");
        testDiv.setAttribute("id", "mobilize-mediatest");
        
        var fakeBody = document.createElement("body");
        fakeBody.appendChild(testDiv);
        
        var $html = document.getElementsByTagName("html")[0];
        //testDiv = $( "<div id='jquery-mediatest'>" ),
        //fakeBody = $( "<body>" ).append( testDiv );

        function check( query ) {
            if ( !( query in cache ) ) {
                var styleBlock = document.createElement('style'),
                    cssrule = "@media " + query + " { #mobilize-mediatest { position:absolute; } }";
                //must set type for IE! 
                styleBlock.type = "text/css";
                if (styleBlock.styleSheet){ 
                  styleBlock.styleSheet.cssText = cssrule;
                } 
                else {
                  styleBlock.appendChild(document.createTextNode(cssrule));
                } 

                
                $html.insertBefore( styleBlock, $html.firstChild );
                $html.insertBefore( fakeBody, $html.firstChild );
                
                //$html.prepend( fakeBody ).prepend( styleBlock );
                testDiv = document.getElementById("mobilize-mediatest");
                var position = document.defaultView.getComputedStyle(testDiv, null).position;                
                cache[ query ] = position === "absolute";
                // Remove temp tags
                fakeBody.appendChild(styleBlock);
                $html.removeChild(fakeBody);
                //fakeBody.add( styleBlock ).remove();
            }
            return cache[ query ];
        }
        
        return check("only all");
    },
    
    /** Utility for defloating images.
     * <p>
     * Also adds default onclick handler to show the image.
     * <p>
     * usage:
     *     mobilize.defloat(document.getElementById("img-id"))
     *     mobilize.defloat($("#img-id")[0])
     * <p>
     * @param image: Image element
     */
    defloat : function(image) {
				
		if(!image.width) {
			width = null;;
		} else {
			width = image.width;
		}
		mobilize.log("Processing content <img>:" + image + " width:" + image.width);
		
		// Available only images with width and height data
		function defloatCore(image) {
			
            // Looks like an icon
            if(image.width < mobilize.options.minImageProcessingWidth) {
				return;
			}
		
			if (!image.tagName) {
				throw "Was not a DOM element:" + image;
			};
			
			if (image.tagName.toLowerCase() != "img") {
				throw "Was not a <img> element:" + image;
			};
			
			var $image = $(image);

            if($image.hasClass("mobilize-no-resize")) {
				// Specially marked not to go through resize
				return;
			}
					
		    $image.addClass("mobilize-resized");
			
			// Do not scale image beyond its orignal size
			var maxWidth;
			if(image.width && image.width < 512) {
				maxWidth = image.width;
			} else {
				maxWidth = 512; 
			}
			
			// TODO: Use stylesheet?
			$image.css({"width" : "100%", "max-width" : maxWidth + "px"});

            // jslint complains: ['float'] is better written in dot notation, but required for YUI Compressor to work
            image.style["float"] = "none"; // jslint:ignore						

			$image.click(function(){
			     var a = $image.parents("a");
                // Set image click handler if 
                // image is not inside a link           
			     if (a.size() == 0) {
				 	window.open(image.src);
				 }
			});
			
		}
		
		// Image is loaded
		if (image.width) {
			defloatCore(image);
		} else {
			image.onload = function(){
				defloatCore(image);
			}
		}
		
    },
	
	/**
	 * Make content images mobile friendly.
	 * <p>
	 * @param selection: jQuery selection of content images
	 */
	processContentImages : function(selection) {
		$(selection).find("img").each(function() {
			mobilize.defloat(this);
		});
	},
	
	/**
	 * Convert videos to mobile format.
	 * <p> 
	 * @param {Object} selection jQuery selection
	 */
	processContentVideos : function(selection) {
		var tuber = mobitube(jQuery);		
		tuber.process(selection);
	},
    
    /**
     * Make selected jQuery elements to have horizontal scroll.
     * <p>
     * Good for code examples e.g. nowrap elements which do not 
     * fit to mobile screen. jQuery Mobile does not allow 
     * hscroll by default.
     */
    makeHorizontalScroll : function(selection) {
    	
		var opts = {
    			direction : "x",
    			showScrollBars: true
    	};
    	
    	var widgets = [];
    			
    	var timeoutHandle = null;
    			
		// Place arrow images on the top of their respective scrollable elements 
		function calculateArrorPositions() {

            widgets.forEach(function(w) {
            
			    // mobilize.log("Calculating hint arrow positions for scroll widget:" + w);
			    
                // Calculate arrow positions
                var attrs = {
                    "z-index" : 100,
                    position : "absolute",
                    opacity : 0.8,
                };

                var elem = w._$clip;
                
                var arrowHeight = 20;
                var midY = elem.height()/2 - arrowHeight/2;
                
                var arrow = elem.find(".left-arrow");   
				
			    if(arrow.size() == 0) {
                    mobilize.log("Scroll-area hint left arrow gone missing :(");
                }                           
				             
                arrow.offset({top:midY, left:16}); // XXX: Something inserts -16 here
                arrow.css(attrs);
				
				w.leftArrow = arrow;

                var arrow = elem.find(".right-arrow");

                if(arrow.size() == 0) {
                    mobilize.log("Scroll-area hint right arrow gone missing :(");
                }                           

				var rightMargin = 40;                    
                var offset = {top:midY, left:elem.offset().left + elem.width() - rightMargin };
                arrow.offset(offset);
                arrow.css(attrs);
                w.rightArrow = arrow;
                
                //console.log(w._hTracker.pos + " " + clipWidth + " " + maxPos);
			});	
		}

        function hideScrollArrows() {
            timeoutHandle = null;
            $(".scroll-arrow").fadeOut(1000);
        }
    	    	
    	
    	/**
    	 * Make scroll hints visible for all touch-scroll areas
    	 * <p>
    	 * Manually calculate if the area can be scrolled left or right.
    	 * Make arrow image visible accordingly.
    	 */
    	function showScrollArrows() {
    		
			var arrows = $(".scroll-arrow");						
    		arrows.stop(true, true); // Clear pending fade out anims
    					
			widgets.forEach(function(w) {
								
                var elem = w._$clip;
                var pos = w.getScrollPosition();
				
				//console.log("Checking visibility for scroll elem in:" + elem.offset().top);
				//console.log("Scroll pos" + pos.x);
							
 	            // Set left handle position
                if(pos.x > 0) {
                    var arrow = w.leftArrow;   					                 					
					arrow.show()
                }
				
				// How many pixels of grey area we have at the right end before displaying the errors
                var tolerance = 10;
                // XXX: patch jquery.mobile.scrollview to expose this info
                var maxPos = w._$view.get(0).scrollWidth;

                var clipWidth = w._$clip.width();

                //console.log("pos:" + w._hTracker.pos);
				//console.log("clipWidth:" + clipWidth);   
                //console.log("x:" + (w._hTracker.pos + tolerance + clipWidth));   
                //console.log("Maxpos:" + maxPos);
				
                if(w._hTracker.pos + tolerance + clipWidth < maxPos) {
                    var arrow = w.rightArrow;  
                    //console.log("Right visible");
                    arrow.show();
                }

            });
						
    		if(timeoutHandle != null) {
    			clearTimeout(timeoutHandle);
    		}
    		    		
    		// Make sure we have something removing the arrows 
    		timeoutHandle = setTimeout(hideScrollArrows, 1500);
    	}

	    var lastShowRefresh = new Date().getTime();
	    
		// Scroll functions have very high frequence call rate
		// JS functions should not spend too much time there
		// or UI becomes unresponsive. Limit the rate
		// of our calculation calls so that UI remains
		// responsive.
	    function rateLimit() {
	        // Limit rate of calls
	        var now = new Date().getTime();
	        if(now - lastShowRefresh > 250) {
	            showScrollArrows();
				lastShowRefresh = now;
	        }               
	    }
    	
    	
    	// Install wrapper divs and arrow elements
    	selection.each(function() {
    		var inner = $(this).wrap("<div class='pre-scroll-wrapper' />");
    		var wrapper = inner.parent();
    		wrapper.scrollview(opts);

            // Add jQuery Mobile widget to our global page list of managed scroll widgets
    		var widget = wrapper.data("scrollview"); 
    		widgets.push(widget);
    		
    		// We need to override styles set by scrollview() here, because 
    		// <pre> width is handled little bit specially
    		inner.css({"overflow-x" : "visible", "overflow-y" : "visible" });    		
    	    		
    		var leftArrow = $("<div class='scroll-arrow left-arrow'>&#x25C0;</div>");
    		
    		// YES, I KNOW THESE TRIANGLES ARE DIFFERENT SIZE FOR SOME FSCKING REASON
    		// var leftArrow = $("<div class='scroll-arrow left-arrow'> &#x25C0;&#x25B6;</div>");
    		leftArrow.hide();
    		wrapper.append(leftArrow);

    		var rightArrow = $("<div class='scroll-arrow right-arrow'>&#x25B6;</div>");
    		//var rightArrow = $("<div class='scroll-arrow right-arrow'>cccccccc</div>");
    		
    		rightArrow.hide();
    		wrapper.append(rightArrow);
    		
    		
        	// When user uses the touch scroll bars
        	wrapper.bind("scrollstart", rateLimit);        	
			wrapper.bind("scrollmove", rateLimit);
    	});
		
    	    	
    	// Handle page scrolling specially 
    	$(window).scroll(function() {
    		rateLimit();    		
    	});
		
		// Do not calculate positions until jQuery Mobile magic is done
		// and we have final element positions
		$(window).bind("mobilizefinish", function() {
			mobilize.log("Setting up scrollview hint arrow positions");
			// Need to defer this call to have layout
			setTimeout(calculateArrorPositions, 5);
		});
    
    },
	
	
     /** 
      * Create next and previous chapter quick links
      * <p>
      * 
      * @param next: jQuery selection for the link being next button
      * 
      * @param prev: jQuery selection for the link being prev button
      * 
      * @returns jQuery element for the button group
      * 
      */
     makeNextPrevNavigation : function(prev, next) {
//      <div data-role="controlgroup" data-type="horizontal" >
//            <a href="index.html" data-role="button" data-icon="arrow-u" data-iconpos="notext">Up</a>
//            <a href="index.html" data-role="button" data-icon="arrow-d" data-iconpos="notext">Down</a>
//            <a href="index.html" data-role="button" data-icon="delete" data-iconpos="notext">Delete</a>
//        </div>
        
        var group = $("<div class=mobile-next-prev data-role=controlgroup data-type=vertical>");
        
		prev.attr("data-icon", "arrow-l");
        prev.attr("data-role", "button");
		
        next.attr("data-icon", "arrow-r");
        next.attr("data-role", "button");
        next.attr("data-iconpos", "right");

        group.append(prev);
        group.append(next);
		        
        return group;        
     }    
};

// ================== Hand picked utilies from Ion project
// ================== https://bitbucket.org/jtoivola/ion/
// ======================================================

/** Get attribute from object. Return def if the attribute or obj does not exist.*/
mobilize.getattr = function(obj, a, def){
    if (obj === undefined || obj[a] === undefined) {
        return def;
    }
    else {
        return obj[a];
    }
};

/** Utility function to set default value to object if attribute is not defined */
mobilize.setdefault = function(aObject,aAttr,aDefault){
    if (aObject[aAttr] === undefined) {
        aObject[aAttr] = aDefault;
    }
};

/** Returns a function, which calls the original function after given delay
 * with parameters given to the returned function.
 * 
 * @param {Function} func
 * @param {Object} after
 * @param {Array}  opts     List of parameters
 * Example:
 
mobilize.delayedFunction( function(arg1,arg2){
        alert("1000="+(arg1 + arg2));
    }, 
    1000
)(400,600);
 */

mobilize.delayedFunction = function callAfter(func, after, opts){
    return function(){        
        // Call in the same scope as the original
        var scope = mobilize.getattr(opts, "scope", func);        
        var args  = arguments;
        setTimeout(function(){ func.apply(scope, args);}, after);
    };
};

/**
 * Returns a new function with changed scope( this=scope).
 * @param {Function} func
 * @param {Object} scope
 * 
 * Example: 
mobilize.scope( function(a){ alert( this.a + a ); }, { a : 10 } )( 90 );
 */
mobilize.scope = function (func, scope){
    return function(){
        func.apply(scope, arguments);  
    };
};

/** Utility for calling functions. 
 * Supports callbacks, timeouts, scope change and repeating.
 * 
 * @param {Function} func Function to call
 * @param {Object}   opts  Options:
 *                    args  - arguments for the function. Use list for multiple.
 *                    scope - Object which is referred to by 'this' in function.
 *                    after - Call asynchronously after time in ms
 *                    callback - Called after asynchonous operation completes.
 *                    repeat   - How many times to repeat the function
 */
mobilize.call = function call(func, opts ){
    
    var scope = mobilize.getattr( opts, "scope", func );
    var args  = mobilize.getattr( opts, "args", undefined );
    var after = mobilize.getattr( opts, "after", undefined);
    var repeat   = mobilize.getattr( opts, "repeat", 1);
    var callback = mobilize.getattr( opts, "callback", undefined);
    
    // Convert single argument to list
    if( args ){
        if( typeof args != "object" || args.length === undefined ){
            args = [args];
        }
    }

    var i;
    if( after !== undefined ){
        func = mobilize.scope( func, scope );
        
        // Call asynchronously
        var called = mobilize.scope( function(){
                var result = mobilize.trap(this.func, { args : this.args });
                if( this.callback ){ 
                    mobilize.trap(this.callback, {args : result});
                }
            },  
            {func:func, callback : callback, args : args }
        );
        
        for( i = 1; i <= repeat; i++){
            mobilize.delayedFunction(called, after * i )();
        }
        
    }
    else {
        for( i = 0; i < repeat; i++){
            func.apply( scope, args);
        }
    }
};
/** Call function and catch exceptions. Logs trace (if supported)
 * @param func: Function to call
 * @param ots: Options passed to mobilize.call
 *             onerror : callback to call instead of logging trace
 *             onfinally : Always called with or without exception after 
 *                         the function completes.
 * */
mobilize.trap = function trap(func, opts){
    
    var result = undefined;
    try{
        result = mobilize.call( func, opts );
    }catch(e){        
        if( opts && opts.onerror ){
            opts.onerror(e);
        }else{
            mobilize.log( "mobilize.call options:" + String(opts) );
            mobilize.log( "Called function:"  + func );
            if( !e.stack){                                
                mobilize.log( e.sourceURL + ":"+e.line + "\n" + e.name + ":" + e.message );
            }
            else{           
                mobilize.log( e.stack);
            }
            // Pass the error on
            throw e;
        }
    }
    finally{
        if( opts && opts.onfinally ){
            opts.onfinally();
        }
    }
    return result;
};
 
/** Like mobilize.trap, but does not call the function. 
 * Returns a decorated function instead.
 * 
 * Useful for callbacks, which might otherwise fail silently.
 * @param func: Function to decorate
 * @param options: See options of mobilize.trap and mobilize.call
 *                 options.args are overridden with arguments given to decorator
 *                 if any given.
 */
mobilize.trapped = function trapped(func, options ){
    
    return function(){
        if( !options ){
            options = {};
        }
        
        if( arguments.length > 0 ){
            options.args = arguments;
        }
        
        if( !options.scope ){
            options.scope = func;
        }
        return mobilize.trap( func, options );
    };
};


if(typeof(exports) !== "undefined") {
    exports.mobilize = mobilize;
}

