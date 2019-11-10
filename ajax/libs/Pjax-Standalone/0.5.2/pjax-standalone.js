/**
 * PJAX- Standalone
 *
 * A standalone implementation of Pushstate AJAX, for non-JQuery webpages.
 * JQuery users should use the original implimention at: https://github.com/defunkt/jquery-pjax
 * 
 * @version 0.5.2
 * @author Carl
 * @source https://github.com/thybag/PJAX-Standalone
 * @license MIT
 */
(function(){

	//Object to store private values/methods.
	var internal = {
		//Is this the first usage of pjax? (Ensure history entery has required values if so.)
		"firstrun": true,
		//Borrowed wholesale from https://github.com/defunkt/jquery-pjax
		//Attempt to check that a device supports pushstate before attempting to use it.
		"is_supported": window.history && window.history.pushState && window.history.replaceState && !navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]|WebApps\/.+CFNetwork)/)
	};
	
	/**
	 * AddEvent
	 * Cross browser compatable method to add event listeners
	 *
	 * @scope private
	 * @param obj Object to listen on
	 * @param event Event to listen for.
	 * @param callback Method to run when event is detected.
	 */
	internal.addEvent = function(obj, event, callback){
		if(window.addEventListener){
				//Browsers that don't suck
				obj.addEventListener(event, callback, false);
		}else{
				//IE8/7
				obj.attachEvent('on'+event, callback);
		}
	}

	/**
	 * Clone
	 * Util method to create copys of the options object (so they do not share references)
	 * This allows custom settings on differnt links.
	 *
	 * @scope private
	 * @param obj
	 * @return obj
	 */
	internal.clone = function(obj){
		object = {};
		//For every option in object, create it in the duplicate.
		for (var i in obj) {
			object[i] = obj[i];
		}
		return object;
	}

	/**
	 * triggerEvent
	 * Fire an event on a given object (used for callbacks)
	 *
	 * @scope private
	 * @param node. Objects to fire event on
	 * @return event_name. type of event
	 */
	internal.triggerEvent = function(node, event_name){
		if (document.createEvent) {
			//Good browsers
			evt = document.createEvent("HTMLEvents");
    		evt.initEvent(event_name, true, true);
    		node.dispatchEvent(evt);
		}else{
			//old IE versions
			evt = document.createEventObject();
    		evt.eventType = 'on'+ event_name;
    		node.fireEvent(evt.eventType, evt);
		}
	}
	/**
	 * popstate listener
	 * Listens for back/forward button events and updates page accordingly.
	 */
	internal.addEvent(window, 'popstate', function(st){
		if(st.state != null){

			var opt = {	
				'url': st.state.url, 
				'container': st.state.container, 
				'history': false
			}

			// Merge original in original connect options
			if(typeof internal.options !== 'undefined'){
				for(var a in internal.options){ 
					if(typeof opt[a] === 'undefined') opt[a] = internal.options[a];
				} 	
			}

			//Convert state data to pjax options
			var options = internal.parseOptions(opt);
			//If somthing went wrong, return.
			if(options == false) return;
			//If there is a state object, handle it as a page load.
			internal.handle(options);
		}
	});

	/**
	 * attach
	 * Attach pjax listeners to a link.
	 * @scope private
	 * @param link_node. link that will be clicked.
	 * @param content_node. 
	 */
	internal.attach = function(node, options){

		// if no pushstate support, dont attach and let stuff work as normal.
		if(!internal.is_supported) return;

		// Ignore external links.
		if ( node.protocol !== document.location.protocol ||
			 node.host !== document.location.host ){
			return;
		}

		// Ignore anchors on the same page
		if(node.pathname == location.pathname && node.hash.length > 0) {
	 		return true
	 	}

		// Add link href to object
		options.url = node.href;
		// If pjax data is specified, use as container
		if(node.getAttribute('data-pjax')){
			options.container = node.getAttribute('data-pjax');
		}
		// If data-title is specified, use as title.
		if(node.getAttribute('data-title')){
			options.title = node.getAttribute('data-title');
		}
		// Check options are valid.
		options = internal.parseOptions(options);
		if(options == false) return;

		// Attach event.
		internal.addEvent(node, 'click', function(event){
			//Allow middle click (pages in new windows)
			if ( event.which > 1 || event.metaKey ) return;
			//Dont fire normal event
			if(event.preventDefault){event.preventDefault();}else{event.returnValue = false;}
			//Take no action if we are already on said page?
			if(document.location.href == options.url) return false;
			//handle the load.
			internal.handle(options);
		});
	}
	/**
	 * parseLinks
	 * Parse all links within a dom node, using settings provided in options.
	 * @scope private
	 * @param dom_obj. Dom node to parse for links.
	 * @param options. Valid Options object.
	 */
	internal.parseLinks = function(dom_obj, options){
		if(typeof options.useClass != 'undefined'){
			//Get all nodes with the provided classname.
			nodes = dom_obj.getElementsByClassName(options.useClass);
		}else{
			//If no class was provided, just get all the links
			nodes = dom_obj.getElementsByTagName('a');
		}
		//For all returned nodes
		for(var i=0,tmp_opt; i < nodes.length; i++){
			node = nodes[i];
			//Override options history to true, else link parsing could be triggered by backbutton (which runs in no-history mode)
			tmp_opt = internal.clone(options);
			tmp_opt.history = true;
			internal.attach(node, tmp_opt);
		}
	}
	/**
	 * SmartLoad
	 * Smartload checks the returned HTML to ensure PJAX ready content has been provided rather than
     * a full HTML page. If a full HTML has been returned, it will attempt to scan the page and extract
     * the correct html to update our container with in order to ensure PJAX still functions as expected.
	 *
	 * @scope private
	 * @param html (HTML returned from AJAX)
	 * @param options (Options object used to request page)
	 * @return HTML to append to our page.
	 */
	internal.smartLoad = function(html, options){
		//Create tmp node (So we can interact with it via the DOM)
		var tmp = document.createElement('div');
		//Add html
		tmp.innerHTML = html; 

        // Grab the title if there is one (maintain IE7 compatability)
	    var title = tmp.getElementsByTagName('title')[0].innerHTML;
	    if(title)
           document.title = title;

		// Look through all returned divs.
		tmpNodes = tmp.getElementsByTagName('div');
		for(var i=0;i<tmpNodes.length;i++){
			if(tmpNodes[i].id == options.container.id){
				// If our container div is within the returned HTML, we both know the returned content is
				// not PJAX ready, but instead likely the full HTML content. in Addition we can also guess that
				// the content of this node is what we want to update our container with.
				// Thus use this content as the HTML to append in to our page via PJAX.
				return tmpNodes[i].innerHTML; 
				break;
			}
		}
		// If our container was not found, HTML will be returned as is.
		return html;
	}

	/**
	 * handle
	 * Handle requests to load content via pjax.
	 * @scope private
	 * @param url. Page to load.
	 * @param node. Dom node to add returned content in to.
	 * @param addtohistory. Does this load require a history event.
	 */
	internal.handle = function(options){
		
		//Fire beforeSend Event.
		internal.triggerEvent(options.container, 'beforeSend');

		//Do the request
		internal.request(options.url, function(html){

			//Ensure we have the correct HTML to apply to our container.
			if(options.smartLoad) html = internal.smartLoad(html, options);
			
			//Update the dom with the new content
			options.container.innerHTML = html;

			//Initalise any links found within document (if enabled).
			if(options.parseLinksOnload){
				internal.parseLinks(options.container, options);
			}
			
			//If no title was provided
			if(typeof options.title == 'undefined'){
				// Attempt to grab title from page contents.
				if(options.container.getElementsByTagName('title').length != 0){
					options.title = options.container.getElementsByTagName('title')[0].innerHTML;
				}else{
					options.title = document.title;
				}
			}
			
			//Do we need to add this to the history?
			if(options.history){
				//If this is the first time pjax has run, create a state object for the current page.
				if(internal.firstrun){
					window.history.replaceState({'url': document.location.href, 'container':  options.container.id}, document.title);
					internal.firstrun = false;
				}
				//Update browser history
				window.history.pushState({'url': options.url, 'container': options.container.id }, options.title , options.url);
			}

			//Fire Events
			internal.triggerEvent(options.container,'complete');
			if(html == false){//Somthing went wrong
				internal.triggerEvent(options.container,'error');
				return;
			}else{//got what we expected.
				internal.triggerEvent(options.container,'success');
			}

			//If Google analytics is detected push a trackPageView, so PJAX pages can 
			//be tracked successfully.
			if(window._gaq) _gaq.push(['_trackPageview']);

			//Set new title
			document.title = options.title;
		});
		
	}

	/**
	 * Request
	 * Performs AJAX request to page and returns the result..
	 *
	 * @scope private
	 * @param location. Page to request.
	 * @param callback. Method to call when a page is loaded.
	 */
	internal.request = function(location, callback){
		//Create xmlHttpRequest object.
		try {xmlhttp = window.XMLHttpRequest?new XMLHttpRequest(): new ActiveXObject("Microsoft.XMLHTTP");}  catch (e) { }
			//Add state listener.
			xmlhttp.onreadystatechange = function(){
				if ((xmlhttp.readyState == 4) && (xmlhttp.status == 200)) {
					//Success, Return html
					callback(xmlhttp.responseText);
				}else if((xmlhttp.readyState == 4) && (xmlhttp.status == 404 || xmlhttp.status == 500)){
					//error (return false)
					callback(false);
				}
			}
			//Secret pjax ?get param so browser doesnt return pjax content from cache when we dont want it to
			//Switch between ? and & so as not to break any URL params (Based on change by zmasek https://github.com/zmasek/)
			xmlhttp.open("GET", location + ((!/[?&]/.test(location)) ? '?_pjax' : '&_pjax'), true);
			//Add headers so things can tell the request is being performed via AJAX.
			xmlhttp.setRequestHeader('X-PJAX', 'true'); //PJAX header
			xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');//Standard AJAX header.

			xmlhttp.send(null);
	}

	/**
	 * parseOptions
	 * Validate and correct options object while connecting up any listeners.
	 *
	 * @scope private
	 * @param options
	 * @return false | valid options object
	 */
	internal.parseOptions = function(options){
		//Defaults. (if somthing isn't provided)
		opt = {};
		opt.history = true;
		opt.parseLinksOnload = true;
		opt.smartLoad = true;

		//Ensure a url and container have been provided.
		if(typeof options.url == 'undefined' || typeof options.container == 'undefined'){
			console.log("URL and Container must be provided.");
			return false;
		}

		//Find out if history has been provided
		if(typeof options.history === 'undefined'){
			//use default
			options.history = opt.history;
		}else{
			//Ensure its bool.
			options.history = (!(options.history == false));
		}

		//Parse Links on load? Enabled by default.
		//(Proccess pages loaded via PJAX and setup PJAX on any links found.)
		if(typeof options.parseLinksOnload == 'undefined'){
			options.parseLinksOnload = opt.parseLinksOnload;
		}

		//Smart load (enabled by default.) Trys to ensure the correct HTML is loaded.
		//If you are certain your backend will only return PJAX ready content this can be disabled
		//for a slight perfomance boost.
		if(typeof options.smartLoad == 'undefined'){
			options.smartLoad = opt.smartLoad;
		}

		//Get container (if its an id, convert it to a dom node.)
		if(typeof options.container == 'string' ) {
			container = document.getElementById(options.container);
			if(container == null){
				console.log("Could not find container with id:"+options.container);
				return false;
			}
			options.container = container;
		}

		//If everything went ok thus far, connect up listeners
		if(typeof options.beforeSend == 'function'){
			internal.addEvent(options.container, 'beforeSend', options.beforeSend);
		}
		if(typeof options.complete == 'function'){
			internal.addEvent(options.container, 'complete', options.complete);
		}
		if(typeof options.error == 'function'){
			internal.addEvent(options.container, 'error', options.error);
		}
		if(typeof options.success == 'function'){
			internal.addEvent(options.container, 'success', options.success);
		}
		//Return valid options
		return options;
	}

	/**
	 * connect
	 * Attach links to PJAX handlers.
	 * @scope public
	 *
	 * Can be called in 3 ways.
	 * Calling as connect(); 
	 * 		Will look for links with the data-pjax attribute.
	 *
	 * Calling as connect(container_id)
	 *		Will try to attach to all links, using the container_id as the target.
	 *
	 * Calling as connect(container_id, class_name)
	 * 		Will try to attach any links with the given classname, using container_id as the target.
	 *
	 * Calling as connect({	
	 *						'url':'somepage.php',
	 *						'container':'somecontainer',
	 * 						'beforeSend': function(){console.log("sending");}
	 *					})
	 * 		Will use the provided json to configure the script in full (including callbacks)
	 */
	this.connect = function(/* options */){
		//connect();
		var options = {};
		//connect(container, class_to_apply_to)
		if(arguments.length == 2){
			options.container = arguments[0];
			options.useClass = arguments[1];
		}
		//Either json or container id
		if(arguments.length == 1){
			if(typeof arguments[0] == 'string' ) {
				//connect(container_id)
				options.container = arguments[0];
			}else{
				//Else connect({url:'', container: ''});
				options = arguments[0];
			}
		}
		// Delete history and title if provided. These options should only be provided via invoke();
		delete options.title;
		delete options.history;
		
		internal.options = options;
		if(document.readyState == 'complete') {
			internal.parseLinks(document, options);
		} else {
			//Dont run until the window is ready.
			internal.addEvent(window, 'load', function(){	
				//Parse links using specified options
				internal.parseLinks(document, options);
			});
		}
	}
	
	/**
	 * invoke
	 * Directly invoke a pjax page load.
	 * invoke({url: 'file.php', 'container':'content'});
	 *
	 * @scope public
	 * @param options  
	 */
	this.invoke = function(/* options */){
		//url, container
		if(arguments.length == 2){
			options = {};
			options.url = arguments[0];
			options.container = arguments[1];
		}else{
			options = arguments[0];
		}
		//If PJAX isn't supported by the current browser, push user to specified page.
		if(!internal.is_supported){
			document.location = options.url;
			return;	
		} 
		//Proccess options
		options = internal.parseOptions(options);
		//If everything went ok, activate pjax.
		if(options !== false) internal.handle(options);
	}

	var pjax_obj = this;
	if (typeof define === 'function' && define['amd']) {
		// register pjax as AMD module
		define( function() {
            return pjax_obj;
        });
	}else{
		// Make PJAX object accessible in global namespace
		window.pjax = pjax_obj;
	}


}).call({});
