
//     json2html.js 2.2.2
//     https://www.json2html.com
//     (c) 2006-2022 Crystalline Technologies
//     json2html may be freely distributed under the MIT license.

(function() {

	"use strict";

	// Baseline setup
	// --------------

	// Establish the root object, `window` (`self`) in the browser, `global`
	// on the server, or `this` in some virtual machines. We use `self`
	// instead of `window` for `WebWorker` support.
	var root = typeof self == 'object' && self.self === self && self ||
			typeof global == 'object' && global.global === global && global ||
			this ||
			{};
	
	//Components {name:template}
	var COMPONENTS = {};
	
    /* ---------------------------------------- Interactive HTML Object (iHTML) ------------------------------------------------ */
    
    function iHTML(html){
        
        //Object type
        this.type = "iHTML";
        
        //html
        this.html = html || "";
        
        //associated events
        this.events = {};
	}
	
	//Append an ihtml object
	// obj = ihtml OR html string
	iHTML.prototype.append = function(obj){
    	
    	if(obj)
            if(obj.type === "iHTML") {
                
                //Append the html
                this.html += obj.html;
                
                //Append the events
                Object.assign(this.events, obj.events);
            } 
        
        //Added for chaining
        return(this);
	};
	
	//Append HTML to this object
	iHTML.prototype.appendHTML = function(html){
	    this.html += html;
	};
	
	//Spit out the object as json
	iHTML.prototype.toJSON = function(){
	    return({
	        "html":this.html,
	        "events":this.events
	    });
	};
	
	/* ---------------------------------------- Tokenizer ------------------------------------------------ */
	
	function Tokenizer( tokenizers, doBuild ){
    
    	if( !(this instanceof Tokenizer ) )
    		return new Tokenizer( tokenizers, onEnd, onFound );
    		
    	this.tokenizers = tokenizers.splice ? tokenizers : [tokenizers];
    	if( doBuild )
    		this.doBuild = doBuild;
    }
    
    Tokenizer.prototype.parse = function( src ){
    	this.src = src;
    	this.ended = false;
    	this.tokens = [ ];
    	do this.next(); while( !this.ended );
    	return this.tokens;
    };
    
    Tokenizer.prototype.build = function( src, real ){
    	if( src )
    		this.tokens.push(
    			!this.doBuild ? src :
    			this.doBuild(src,real,this.tkn)
    		);	
    };
    
    Tokenizer.prototype.next = function(){
    	var self = this,
    		plain;
    		
    	self.findMin();
    	plain = self.src.slice(0, self.min);
    	
    	self.build( plain, false );
    		
    	self.src = self.src.slice(self.min).replace(self.tkn,function( all ){
    		self.build(all, true);
    		return '';
    	});
    	
    	if( !self.src )
    		self.ended = true;
    };
    
    Tokenizer.prototype.findMin = function(){
    	var self = this, i=0, tkn, idx;
    	self.min = -1;
    	self.tkn = '';
    	
    	while(( tkn = self.tokenizers[i++]) !== undefined ){
    		idx = self.src[tkn.test?'search':'indexOf'](tkn);
    		if( idx != -1 && (self.min == -1 || idx < self.min )){
    			self.tkn = tkn;
    			self.min = idx;
    		}
    	}
    	if( self.min == -1 )
    		self.min = self.src.length;
    };

	/* ---------------------------------------- Public Methods ------------------------------------------------ */
	
	if(!root.json2html) root.json2html = {};
	
	//Current Version
	root.json2html.version = "2.2.2";
	
	//Render a json2html template
	//  obj : json object to render, or json string
	//  template: json2html template (array or json object)
	//  options : {}
	//      components : {name:template,...}
	//      output : ihtml | html
    root.json2html.render = function(obj,template,options) {
		    
		//create the default object
		var out = new iHTML();
		
		//Default options
		var _options = {
		    "output":"html"
		};
		
		//Parse the user defined options
		if(options) {
		    
            // LEGACY support for events, now output
            if(options.events) _options.output = "ihtml";
            
            //Add the other allowed options
            _options.components = options.components;
            _options.data = options.data;
            
            //Make sure we don't overwrite the default value
            if(options.output) _options.output = options.output;
		}
		
		//Allow for a json string of json object
		var parsed = obj;
		
		//Check for a string (JSON string or literal)
		if(typeof(obj) === "string") {
		    try {
		        parsed = JSON.parse(obj);
		    } catch(e) {
		        //Assume that this is a literal string
		        parsed = obj;
		    }
		}
		
		//Set the object to the parsed value 
		// allows for JSON object or a string value of a JSON object or literal
		obj = parsed;
		
		//Render if we have a value template (object or array)
		// and a data object that's not null or undefined
		if(_typeof(template) === "object" && _typeof(obj) === "object") out = _render(obj, template, _options);
		
		//Determine what output we need
		switch(_options.output) {
		    
		    case "ihtml":
		        return(out);
		    break;
		    
		    //Default to html
		    default:
		    
		        return(out.html);
		    break;
		}
	};
	
    //json2html component methods
    root.json2html.component = {
            
        //Add a component (name = string, template = json2html template)
        //OR function(components) where component is obj with name:template property eg {"name":template,...}
        "add":function(name,template){
            
            //Determine what we're adding
            switch(typeof(name)) {
            
                //Multiple components
                case "object":
                    
                    //Components
                    COMPONENTS = _extend(COMPONENTS,name);
                break;
                
                //One component
                case "string":
                    COMPONENTS[name] = template;
                break;
                
                //Not supported
                default:
                break;
            }
        },
        
        //Get a component
        "get":function(name) {
            return(COMPONENTS[name]);   
        }
	};
	
	//Allow access to the iHTML object
	root.json2html.iHTML = iHTML;
		
	//Encode the html string to text
	root.json2html.toText = function(html) {
		
		//Check for undefined or null
		if(html === undefined || html === null) return("");
		
		//Otherwise convert to a string and encode HTML components
		return html.toString()
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/\"/g, "&quot;")
			.replace(/\'/g, "&#39;")
			.replace(/\//g, "&#x2F;");
	};
	
	//DEPRECATED (use json2html.render instead)
	root.json2html.transform = root.json2html.render;

	/* ---------------------------------------- jQuery Plugin ------------------------------------------------ */

	//If jQuery is defined add plugin
	if(typeof(window) === "object")
		if(window.jQuery) {
			(function($){	
			    
				/* ---------------------------------------- Public Methods ------------------------------------------------ */
				
				//jQuery render template
                //  obj : json object to render or json string
                //  template: json2html template (array or json object)
                //  options : {}
                //      components : {name:template,...}
                //      data: object passed to jquery events
                //      output : ihtml | html
				$.json2html = function(obj, template, options) {
					
					//Make sure we have the json2html base loaded
					if(typeof json2html === "undefined") return(undefined);
					
					//Default options
					var _options = {
					    "output":"ihtml"
					};
					
					//Parse the user defined options
					if(options) {
					    
                        // LEGACY support for eventData, now data
                        if(options.eventData) _options.data = _options.eventData;
                        
                        //Add the other allowed options
                        _options.components = options.components;
                        _options.data = options.data;
                        
                        //Make sure we don't overwrite the default value
                        if(options.output) _options.output = options.output;
					}
					
					//Determine what type of object we want as the output
					switch(_options.output){
						
						//LEGACY
						case "json2html":
						
						//iHTML object
						case "ihtml":
						    
							//set the output as ihtml
							_options.output = "ihtml";
						break;
						
						//Return raw html (same as calling json2html.render)
						default:
					    break;
					}
					
					return(json2html.render(obj, template, _options));
				};
				
				//jQuery render template via chaining
                //  obj : json object to render or json string
                //  template: json2html template (array or json object)
				//  options : {}
				//      components : {name:template,...}
				//      method: "append" | "replace" | "prepend"
				//      data: object passed to jquery events
				$.fn.json2html = function(obj, template, options) {
				    
					//Make sure we have the json2html base loaded
					if(typeof json2html === "undefined") return(undefined);
					
					var _options = {
					    
					    //Always set the output to ihtml
					    "output":"ihtml",
					    
					    //Set the default method
					    "method":"append"
					};
					
					//Parse the user defined options
					if(options) {
					    
                        // LEGACY support for eventData, now data
                        if(options.eventData) _options.data = _options.eventData;
                        
                        //Set the method
                        if(options.method) _options.method = options.method;
                        
                        // LEGACY support for append,prepend,replace, now method
                        if(options.prepend) _options.method = "prepend";
                        if(options.replace) _options.method = "replace";
                        if(options.append) _options.method = "append";
                        
                        //Add the other allowed options
                        _options.components = options.components;
                        _options.data = options.data;
					}
					
					//Render each object
					return this.each(function(){ 
					    
					    //Render the template and attach to the dom
						var dom = _dom(json2html.render(obj, template, _options));
						
						//Determine how we should add the new content
						switch(_options.method) {
						    
						    //Replace
						    case "replace":
						        $.fn.replaceWith.call($(this),dom.parent);
						    break;
						    
						    //Prepend
						    case "prepend":
						        $.fn.prepend.call($(this),dom.parent);
						    break;
						    
						    //Default to append
						    default:
						        $.fn.append.call($(this),dom.parent);
						    break;
						}
						
						//Throw the json2html.ready events (if any)
						_onready(dom.ready);
					});
				};
				
				//Hydrate the json2html elements with these events
				$.fn.j2hHydrate = function(events) {
					
					//Attach the events for each element
					return this.each(function(){ 
					    
					    //Attach the events and trigger the onready for this element
                        _onready( _attachEvents($(this),events) );
					});
				};
				
				/* ---------------------------------------- Prviate Methods ------------------------------------------------ */
				
				//Trigger the on ready events
				function _onready(events){
				    
					//Trigger all the json2html.ready events
					for(var i=0; i < events.length; i++) 
						events[i].trigger("j2h-ready");
				}
				
				//Add the ihtml object to the dom
				// returns the parent and ready event object
				function _dom(ihtml) {
				    
					//Attach the html(string)
					var parent = $(document.createElement("i")).html(ihtml.html);
					
					//Attach the events to the parent object in the dom
					var ready = _attachEvents($(parent),ihtml.events);
					
					//Get the children to this result
					return({"parent":$(parent).children(),"ready":ready});
				}
				
				//Attach the events to the children of this element
				function _attachEvents($parent,events) {
					
					//Record json2html specific ready events
					var ready = [];
					
					//Check the $parent for all j2h events
					$parent.find("[-j2h-e]").each(function(){
                        
                        //Get the events we should attach to this element
                        var attach = $(this).attr("-j2h-e");
                        
                        //Make sure we have some events to attach
                        if(attach) {
                            
                            //split by " " (can contain multiple events per element)
                            var _events = attach.split(" ");
                            
                            //Add each event
                            for(var i = 0; i < _events.length; i++) {
                                
                                var event = events[_events[i]];
                                
                                //Don't have this event then just skip
                                if(!event) continue;
                                
                                //Add the action to the data object
                                event.data.action = event.action;
                                
                                //Add to ready 
                                switch(event.type) {
                                    
                                    //json2html specific event
                                    case "ready":
                                        
                                        //Sepcify that we'll need to trigger these later
                                        ready.push($(this));
                                        
                                        //rename the event to j2h-ready
                                        event.type = "j2h-ready";
                                    break;
                                    
                                    //All other jquery events
                                    default:
                                    break;
                                }
                                
                                //Attach the events to the element
                                $(this).on(event.type,event.data,function(e){
                                    
                                    //Disable j2h-ready events from being propagated
                                    if(e.type === "j2h-ready") e.stopPropagation();
                                    
                                	//attach the jquery event
                                	e.data.event = e;
                                	
                                	//call the appropriate method
                                	if(_typeof(e.data.action) === "function") e.data.action.call($(this),e.data);
                                });
                            }
                        }
                        
                        //remove the event attribute
						//$(this).removeAttr("-j2h-e");
					});
					
					//Return the ready events
					return(ready);
				}
			})(window.jQuery);
		}
		
	/* ---------------------------------------- Private Methods ------------------------------------------------ */
	
    //Render these object(s) using these temlpate(s)
	function _render(obj, template, options, index, pobj) {

		var ihtml = new iHTML();
		
		//Check to see what type of object we're rending
		switch(_typeof(obj,true)) {
            
            case "array":
                
                //Itterrate through the array and render each object
                var len=obj.length;
                for(var j=0;j<len;++j) {	
                
                    //Render the object using this template depending on the type of object
                    ihtml.append( _renderObj(obj[j], template, options, j, pobj) );
                }
            break;
            
            //Don't render for undefined or null objects
            case "undefined":
            case "null":
            break;
            
            //Make sure to allow for literals as well
            default:
                
                //Render the object using this template depending on the type of object
                ihtml.append( _renderObj(obj, template, options, index, pobj) );
            break;
		}
		
		return(ihtml);
	}
	
	//Render an object using this template(s)
	function _renderObj(obj, template, options, index, pobj) {
		
		var ihtml = new iHTML();
		
		//Check the type of template we want to apply
		switch(_typeof(template,true)) {
		    
            //Array of templates
            case "array":
            
                //Itterate through each template
                var t_len = template.length;
                for(var t=0; t < t_len; ++t) {
                	
                	//Render the template and append
                	ihtml.append( _renderObj(obj, template[t], options, index) );
                }
                
            break;
            
            //single template & single object
            case "object":
                
                //Support for DEPRECATED obj
                var fobj = template["{}"] || template.obj;
                
                //Check to see if this template uses it's own data object
                // allows us to run the template under a different data object
                // AND we haven't already got the parent before (in the case of an array)
                if( _typeof(fobj) === "function" && !pobj) {
                    
                    //Set the parent object
                    pobj = obj;
                    
                    //Get the new object
                    obj = fobj.call(obj,obj,index);
                    
                    //Render the object (might be an array)
                    ihtml.append( _render(obj, template, options, index, pobj) );
                } else {
                    
                    //Render the component
                    // or html
                    if(template["[]"]) ihtml.append( _component(pobj, obj, template, options, index) );
                    else ihtml.append( _html(pobj, obj, template, options, index) );
                }
            break;
		}
		
		return(ihtml);
	}
	
	//Get the property from the object
	function _get(obj,path){
	    
	    //Split the path into it's seperate components
		var _path = path.split(".");
		
		//Set the object we use to query for this name to be the original object
		var subObj = obj;
	    
		//Parse the object properties
		var c_len = _path.length;
		for (var i=0;i<c_len;++i) {
            
            //Skip if we don't have this part of the path
			if( _path[i].length > 0 ) {
			    
			    //Get the sub object using the path
				subObj = subObj[_path[i]];
				
				//Break if we don't have this sub object
				if(subObj === null || subObj === undefined) break;
			}
		}
		
		//Return an empty string if we don't have a value
		if(subObj === null || subObj === undefined) return("");
		
		return(subObj);
	}
	
	//Get the html value of the object
	function _getValue(obj, template, key, options, index) {
		
		var out = "";
		
		//Get the template property
		var prop = template[key];
		
        //Check the type of this template property
        switch(_typeof(prop,true)) {
        	
        	//Get the value from the function
        	case "function":
        	    
        		//Check what typeof value is for the object we're rendering
        		switch(_typeof(obj)) {
        			
        			//If this is a json object or array then get the component that we want
        			case "object":
        			    
        			    //Otherwise get the value
        				return( prop.call(obj,obj,index,options.data) );
        			break;
        			
        			//NOT SUPPORTED
        			case "function":
        			case "undefined":
        			case "null":
        				return("");
        			break;
        					
        			//BOOLEAN, NUMBER, BIGINT, STRING, SYMBOL
        			default:
        
        				//Create a new object with the properties (value & index)
        				var _obj = {"value":obj,"index":index,"data":options.data};
        				return(prop.call(_obj,_obj,index,options.data));
        			break;
        		}
        	break;
        	
        	//Check for short hand ${..}
        	// NOTE that with es6 support short hand is parsed as a template literal
        	//  otherwise parsed internally with simple variable replacement
        	case "string":
        	    
        	    //Check to see if we have es6 support with this browser
        	    if(json2html.es6) {
        	        
                    //Use template literals to parse strings
                    
                    //Check what typeof value is for the object we're rendering
                    switch(_typeof(obj)) {
                        //If this is an json object then get the value we're looking for
                        case "object":
                        	out = json2html.es6.interpolate.call(prop,obj);
                        break;
                        
                        //NOT SUPPORTED
                        case "function":
                        case "undefined":
                        case "null":
                        	return("");
                        break;
                        
                        //For literal arrays (and single objects) of type
                        //BOOLEAN, NUMBER, BIGINT, STRING, SYMBOL
                        default:
                        
                            out = json2html.es6.interpolate.call(prop,{
                            	    "value":obj,
                            	    "index":index
                            	});
                        
                        break;
                    }
                } else {
                
                    //Parse the property string and fill in any tokens using simple variable replacement
                    out = _parse(prop,function(all,path){
                        
                        //Check what typeof value is for the object we're rendering
                        switch(_typeof(obj)) {
                        	
                        	//If this is an json object then get the value we're looking for
                        	case "object":
                        		return(_get(obj,path));
                        	break;
                        	
                        	//NOT SUPPORTED
                        	case "function":
                        	case "undefined":
                        	case "null":
                        		return("");
                        	break;
                        	
                        	//For literal arrays (and single objects) of type
                        	//BOOLEAN, NUMBER, BIGINT, STRING, SYMBOL
                        	default:
                        		
                                //Check the path of the shorthand
                                switch(path) {
                                
                                    //RESERVED word for literal array value
                                    case "value":
                                    	return(obj);
                                    break;
                                    
                                    //RESERVED word for literal array value index
                                    case "index":
                                	    
                                        //Return empty string if we don't have an index
                                        // for objects
                                        if(index === undefined || index === null) return("");
                                        else return(index);
                                	break;
                                }
                        	break;
                        }
                    });
        	    }
        	break;
        	
        	//Spit out blank
            case "null":
        	case "undefined":
        	case "object":
        	    out = "";
        	break;
        	
        	//Arrays, and other literals
        	default:
        	    
        	    //Get the string representation for this property
        	    out = prop.toString();
        	break;
        }
		
		
		return(out);
	}
	
	/* ---------------------------------------- Interpolate (Template Literals) -------------------------------------------- */
	
    //Extend object
    // (obj1,obj2,...)
    // creates a new object with properties of all objects
    // shallow copy only
	function _extend(){
	    
		var out = {};
		
		//Itterate over all objects and copy each property
		// shallow copy only 
		var len = arguments.length;
		for(var i=0; i < len;i++)
		    for (var prop in arguments[i]) { out[prop] = arguments[i][prop]; }
		    
		return(out);
	}
    
	//isArray (fix for IE prior to 9)
	function _isArray(obj) {
		return Object.prototype.toString.call(obj) === "[object Array]";
	}
	
	//Typeof helper
	function _typeof(obj,checkArray) {
	    
	    var type = typeof obj;
	    
	    //Check what kind of object this is
	    if(type === "object") {
	        
	        //Check for null
	        if(obj === null) return("null");
	        
	        //Check for array
	        if(checkArray)
	            if(_isArray(obj)) return("array");
	    }
	    
	    return(type);
	}

	//Get a new random id 
	function _id() {
		var S4 = function() {
		   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
		};
		return (S4()+S4());
	}
	
	//Determines if we have a void element
	// (No end tag, and must not contain any contents)
	function _isVoidElement(element) {
	
		//Determine if we match any of the void elements
		// as specified by https://www.w3.org/TR/html5/syntax.html#void-elements
		switch(element) {
			
			//Allow these void elements
			case "area":
			case "base":
			case "br":
			case "col":
			case "command":
			case "embed":
			case "hr":
			case "img":
			case "input":
			case "keygen":
			case "link":
			case "meta":
			case "param":
			case "source":
			case "track":
			case "wbr":
				return(true);
			break;
			
			//Otherwise we're not void
			default:
				return(false);
			break;
		}
	}
	
    //Use the tokenizer to parse the str
    function _parse(str, method) {	
    	
    	let tokenizer = new Tokenizer([
    		/\${([\w\.\,\$\s]+)}/  
    	 ],function( src, real, re ){
    		return real ? src.replace(re,method) : src;
    	  }
    	);
    	
    	return(tokenizer.parse(str).join(""));		
    }
    
	/* ---------------------------------------- Template Types ------------------------------------------------ */
	
	//default html type
	// supports <> and legacy tag
	// returns iHTML
	function _html(pobj, obj, template, options, index){
    
        //Create a new ihtml object for the parent and it's children
        var parent = new iHTML(),
            children = new iHTML();
        
        //Set the default html element key
        // and initialize the events arrau
		var ele = "<>",
		    events = [];
		
		//Look into the properties of this template
		for (var prop in template) {
		    
			switch(prop) {
				
				//DEPRECATED (use <> instead)
				case "tag":
				    
				    //Signal we're using a deprecated property
				    //TODO output warning??
				    ele = "tag";
				    
				//HTML element
				case "<>":
					
					//Get the element name (this can be tokenized)
            		parent.name = _getValue(pobj || obj, template, ele, options, index);
            		
            		//Create a new element
		            parent.appendHTML("<" + parent.name);
				break;
				
				//DEPRECATED (use {} instead)
		        case "obj":
				
				case "{}":
				break;
				
				//Encode text
				case "text":
					
					//Determine what kind of object this is
					// array => NOT SUPPORTED
					// other => text
					// Encode the value as text and add it to the children
					if(!_isArray(template[prop])) children.appendHTML( json2html.toText( _getValue(obj,template,prop,options,index) ) );
					 
				break;
				
				//DEPRECATED (use HTML instead)
				case "children":
				    
				//Encode as HTML
				// accepts array of children, functions, string, number, boolean
				case "html":
				    
					//Determine if we have more than one template
					// array & function => children
					// other => html
					switch(_typeof(template[prop],true)) {
                        
                        case "array":
                            
                            //render the children
				            children.append( _render(obj, template[prop], options, index) );
                        break;
                        
                        case "function":
                            
                            //Get the result from the function
                            var temp = template[prop].call(obj, obj, index, options.data, options.$ihtml);
                            
                            //Determine what type of result we have
                            switch(_typeof(temp,true)) {
                                
                                //Only returned by json2html.render or $.json2html calls
                                case "object":
                                    
                                    //Check the type of object
                                    switch(temp.type) {
                                        
                                        //Add the object as a template
                                        case "iHTML":
                                            children.append(temp);
                                        break;
                                        
                                        //Otherwise don't render
                                        default:
                                            
                                        break;
                                    }
                                    
                                break;
                                
                                //Not supported
                                case "function":
                                case "undefined":
                                case "null":
                                break; 
                                
                                //Render the array as a string
                                // append to html
                                case "array":
                                    children.appendHTML(temp.toString());
                                break;
                                
                                //string, number, boolean, etc..
                                // append to html
                                default:
                                	children.appendHTML(temp);
                                break;
                            }
                        break;
                        
                        default:
                            //Get the HTML associated with this element
                            children.appendHTML( _getValue(obj,template,prop,options,index) );
                        break;
					}
				break;

				default:
					//Add the property as a attribute if it's not a key one
					var isEvent = false;
					
					//Check if the first two characters are 'on' then this is an event
					if( prop.length > 2 )
						if( prop.substring(0,2).toLowerCase() === "on" ) {
							
							//Determine if we should add events
							if(options.output === "ihtml") {
							    
								//if so then setup the event data
								var data = {
									"obj":obj,
									"data":options.data,
									"index":index
								};
								
								//create a new id for this event
								var id = _id();
								
								//Add to the events for this element
								// we'll add these later using jquery
								parent.events[id] = {"type":prop.substring(2),"data":data,"action":template[prop]};
								
								//Add the event to the list of events for this element
								events.push(id);
							}
							
							//this is an event
							isEvent = true;
						}
						
					//If this wasn't an event AND we actually have a value then add it as a property
					if(!isEvent){
						//Get the value
						var val = _getValue(obj, template, prop, options, index);
						
						//Make sure we have a value
						if(val !== undefined) {
							var out;
							
							//Determine the output type of this value (wrap with quotes)
							if(typeof val === "string") out = '"' + val.replace(/"/g, '&quot;') + '"';
							else out = val;
							
							//create the name value pair
							parent.appendHTML(" " + prop + "=" + out);
						}
					}
				break;
			}
		}
		
        //Insert temporary event property -j2h-e
        // with events seperated by a space
        // if needed
		if(events.length) parent.appendHTML(" -j2h-e='" + events.join(" ") + "'");
		
		//Check to see if the parent is an html element
		// or just a container
		if(parent.name) {
		    
		    //Determine if this is a void element
            // shouldn't have any contents
            if(_isVoidElement(parent.name)) parent.appendHTML("/>");
            else {
                
            	//Close the opening tag
            	parent.appendHTML(">");
            	
            	//add the children
            	parent.append(children);
            	
            	//add the closing tag
            	parent.appendHTML("</" + parent.name + ">");
            }
		} else {
		    
		    //Otherwise we don't have a parent html element
		    // so just add the children to the empty parent
        	parent.append(children);
		}
		
		return(parent);
    }
    
    //component type
    // supports []
    // returns iHTML
    function _component(pobj, obj, template, options, index) {
        
        //Create a new ihtml object for the parent
        var ihtml = new iHTML();
        
        var component = {
            "template":undefined,
            "name":undefined
        };
        
        for(var prop in template) {
            
            //Check the property
            switch(prop) {
                
                //REQUIRED
                case "[]":
                    
                    //Get the component name (from the parent if we have one)
                    var name = _getValue(pobj || obj, template, prop, options, index);
                    
                    //Check for a local component first
                    if(options.components) component.template = options.components[name];
                    
                    //Otherwise check the global components (if we didn't have a local template)
                    if(!component.template) component.template = COMPONENTS[name];
                    
                    //Otherwise ignore
                break;
                
                //Embed this template within the component
                // if needed
                case "html":
                    
                    //Check what object type of template we allow
                    switch(_typeof(template.html)) {
                        
                        //Make sure we have an object or array
                        case "object":
                            
                            //Render the children
                            // make sure to clear the parent
                            // children don't have access to the parent
                            options.$ihtml = _render(obj, template.html, options, index);
                        break;
                    }
                    
                break;
            }
        }
        
        //If we don't have the component then exit
        // template can be an object or array
        if(_typeof(component.template) !== "object") return(ihtml);
        
        //render the template and assign to the output
        // this template is considered a child to it won't have access to the parent
        ihtml.append(_render(obj, component.template, options));
        
        return(ihtml);
    }
}()); 

