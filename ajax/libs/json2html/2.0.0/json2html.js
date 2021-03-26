
//     json2html.js 2.0.0
//     https://www.json2html.com
//     (c) 2006-2021 Crystalline Technologies
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
			
	//Rendering types
	// function(obj, template, index, options)
	// returns iHTML object
	var TYPES = {
	    
        //HTML Element
        "<>":function(obj, template, index, options){
            return(_html("<>",obj, template, index, options));
        },
        
        //HTML Element (LEGACY Support)
        "tag":function(obj, template, index, options){
            return(_html("tag",obj, template, index, options));
        },
        
        //Component
        "[]":_component
	};
	
	//Components {name:template}
	var COMPONENTS = {};
	
    /* ---------------------------------------- Interactive HTML Object (iHTML) ------------------------------------------------ */
    
    function iHTML(html){
        
        //Object type
        this.type = "iHTML";
        
        //html
        this.html = html || "";
        
        //associated events
        this.events = [];
	}
	
	//Append an ihtml object
	// obj = ihtml OR html string
	iHTML.prototype.append = function(obj){
    	
    	if(obj)
            if(obj.type === "iHTML") {
                
                //Append the html
                this.html += obj.html;
                
                //Append the events
                this.events = this.events.concat(obj.events);
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
	root.json2html = {

		//Current version
		"version":"2.0.0",
		
        //Render a json2html template
		//  obj : json object to render, or json string
		//  template: json2html template (array or json object)
		//  options : {}
		//      components : {name:template,...}
		//      output : ihtml | html
		"render": function(obj,template,options) {
		    
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
			obj = typeof obj === "string" ? JSON.parse(obj) : obj;
			
			//Render if we have a correct template & data object
			if(typeof(template) === "object" && template !== null && typeof(obj) === "object" && obj !== null) out = _render(obj, template, _options);
			
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
		},
		
		//Extend json2html with custom template types
		// eg <> = html element, or [] = component
		// method = function(obj, template, index, options)
		//  MUST return an iHTML object
		"extend":function(type,method){
		    
		    //Add the custom template type
		    TYPES[type] = method;
		},
		
		//json2html component methods
        "component":{
            
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
		},
		
		//Allow access to the iHTML object
		"iHTML":iHTML,
		
		//Encode the html string to text
		"toText":function(html) {
			
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
		}
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
					    "output":"ihtml"
					};
					
					//Parse the user defined options
					if(options) {
					    
                        // LEGACY support for eventData, now data
                        if(options.eventData) _options.data = _options.eventData;
                        
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
						events[i].trigger("j2h.ready");
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
					
					//Determine if we have events
					for(var i = 0; i < events.length; i++) {
						
						var event = events[i];
						
						//find the associated DOM object with this event
						var obj = $parent.find("[-j2h-e='" + event.id + "']");
						
						//Check to see if we found this element or not
						if(obj.length === 0) throw "jquery.json2html was unable to attach event " + event.id + " to DOM";
						
						//remove the attribute
						$(obj).removeAttr("-j2h-e");
						
						//Check for the ready event
						// jquery ready event only works for document
						// we extend that to work for any dom element
						// replace with json2html.ready
						if(event.type === "ready") event.type = "j2h.ready";
						
						//Add the action to the data object
						event.data.action = event.action;
						
						//attach the events to the dom
						$(obj).on(event.type,event.data,function(e){
							
							//attach the jquery event
							e.data.event = e;
							
							//call the appropriate method
							if(_typeof(e.data.action) === "function") e.data.action.call($(this),e.data);
						});

						//Add to ready event list (if needed)
						if(event.type === "j2h.ready") ready.push($(obj));
					}
					
					//Return the ready events
					return(ready);
				}
			})(window.jQuery);
		}
		
	/* ---------------------------------------- Private Methods ------------------------------------------------ */
	
    //Render object
    // returns interactive html object (ihtml)
	function _render(obj, template, options) {
		
		var ihtml = new iHTML();
		
		//Check to see what type of object we're rending
		switch(_typeof(obj,true)) {
            
            case "array":
                
                //Itterrate through the array and add it to the ihtml object
                var len=obj.length;
                for(var j=0;j<len;++j) {	
                    //_apply the template to this object and append it to the results
                    ihtml.append( _apply(obj[j], template, j, options) );
                }
            break;
            
            case "object":
                //_apply the template to this object and append it to the results
				ihtml.append( _apply(obj, template, undefined, options) );
            break;
            
            //IGNORE all other object types
		}
        
		//Return the resulting ihtml object
		return(ihtml);		
	}

	//Apply the template to this object
	// returns interactive html object (ihtml)
	function _apply(obj, template, index, options) {

		var ihtml = new iHTML();
		
		//Check the object type of this template
		switch(_typeof(template,true)) {
		    
		    //Array of templates
		    case "array":
		        
                //Then itterate through each object
                var t_len = template.length;
                for(var t=0; t < t_len; ++t) {
                	//template the object and append it to the output
                	ihtml.append( _apply(obj, template[t], index, options) );
                }
            break;
            
            //Single template
            case "object":
                
                //Check what type of template this is
                for(var type in TYPES) {
                    
                    //If this type is present as an attribute of the template
                    // then process it and return the element
                    if(template[type] !== undefined) ihtml.append(TYPES[type](obj, template, index, options));
                }
            break;
            
            default:
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
	function _getValue(obj, template, key, index, options) {
		
		var out = "";
		
		//Get the template property
		var prop = template[key];
		
		//Check the type of this template property
		switch(_typeof(prop)) {
			
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
			case "string":
				
				//Parse the property string and fill in any tokens
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
						
						//BOOLEAN, NUMBER, BIGINT, STRING, SYMBOL
						default:
							
							//Check the path of the shorthand
							switch(path) {

								//RESERVED word for static array value
								case "value":
									return(obj);
								break;
								
								//RESERVED word for static array value index
								case "index":
									return(index);
								break;
							}
						break;
					}
				});
			break;
			
			//Spit out blank for undefined or null
		    case "null":
			case "undefined":
			    out = "";
			break;
			
			default:
			    
			    //Get the string representation for this property
			    out = prop.toString();
			break;
		}
		
		return(out);
	}
	
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
    		/\${([a-zA-Z0-9\.\,]+)}/ 
    	 ],function( src, real, re ){
    		return real ? src.replace(re,method) : src;
    	  }
    	);
    	
    	return(tokenizer.parse(str).join(""));		
    }
    
	/* ---------------------------------------- Template Types ------------------------------------------------ */
	
	//default html type
	// supports <> and legacy tag type
	// returns iHTML
	function _html(type, obj, template, index, options){
    
        //Create a new ihtml object for the parent
        var parent = new iHTML();
        
        //Get the element name (this can be tokenized)
		var name = _getValue(obj,template,type,index,options);
		
		//Determine if this is a void element
		// shouldn't have any contents, if it does then ignore
		var isVoid = _isVoidElement(name);
		
		//Create a new element
		parent.appendHTML("<" + name);
		
		//Create a new ihtml object for the children
		var children = new iHTML();
		
		//innerHTML
		var html;
		
		//Look into the properties of this template
		for (var prop in template) {
		    
			switch(prop) {
				
				//DEPRECATED (use <> instead)
				case "tag":
				    
				//HTML element to render
				case "<>":
					//Do nothing as we have already created the element
				break;
				
				//Encode as text
				case "text":
					
					//Ignore for void elements
					if(isVoid) continue;
					
					//Determine what kind of object this is
					// array => NOT SUPPORTED
					// other => text
					if(!_isArray(template[prop])) {	
						//Get the encoded text associated with this element
						html = json2html.toText( _getValue(obj,template,prop,index,options) );
					}
					 
				break;
				
				//DEPRECATED (use HTML instead)
				case "children":
				    
				//Encode as HTML
				// accepts array of children, functions, string, number, boolean
				case "html":
				    
					//Ignore for void elements
					if(isVoid) continue;
					
					//Determine what kind of object this is
					// array & function => children
					// other => html
					switch(_typeof(template[prop],true)) {
                        
                        case "array":
                            
                            //_apply the template to the children
				            children.append( _apply(obj, template[prop], index, options) );
                        break;
                        
                        case "function":
                            
                            //Get the result from the function
                            var temp = template[prop].call(obj, obj, index, options.data, options.$html);
                            
                            //Determine what type of object this is
                            switch(_typeof(temp,true)) {
                                
                                //This is a template and we need to template it
                                case "array":
                                    //Add this object to the children
                                    children.append( _apply(obj, temp, index, options) );
                                break;
                                
                                //Only returned by json2html.render or $.json2html calls
                                case "object":
                                    //Add this object to the children
                                    if(temp.type === "iHTML") children.append(temp);
                                break;
                                
                                //Not supported
                                case "function":
                                case "undefined":
                                case "null":
                                break; 
                                
                                //Append to html
                                // string, number, boolean
                                default:
                                	children.appendHTML(temp);
                                break;
                            }
                        break;
                        
                        default:
                            //Get the HTML associated with this element
                            html = _getValue(obj,template,prop,index,options);
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

								//append the new event
								parent.events.push( {"id":id,"type":prop.substring(2),"data":data,"action":template[prop]} );

								//Insert temporary event property -j2h-e
								parent.appendHTML(" -j2h-e='" + id + "'");
							}
							
							//this is an event
							isEvent = true;
						}

					//If this wasn't an event AND we actually have a value then add it as a property
					if(!isEvent){
						//Get the value
						var val = _getValue(obj, template, prop, index, options);
						
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
		
		//For non void elements
		if(!isVoid) {
			
			//Close the opening tag
			parent.appendHTML(">");
			
			//add the innerHTML (if we have some)
			if(html) parent.appendHTML(html);
			
			//add the children (if we have any)
			parent.append(children);
			
			//add the closing tag
			parent.appendHTML("</" + name + ">");
		} else {
			
			//For void elements just close the opening tag
			parent.appendHTML("/>");
		}
		
		return(parent);
    }
    
    //component type
    // supports []
    // returns iHTML
    function _component(obj, template, index, options) {
        
        //Create a new ihtml object for the parent
        var ihtml = new iHTML();
        
        var component = {
            "template":undefined,
            "name":undefined
        };
        
        //Use the source object by default
        var data = obj;
        
        for(var prop in template) {
            
            //Check the property
            switch(prop) {
                
                //REQUIRED
                case "[]":
                    
                    //Get the component name
                    var name = _getValue(obj, template, prop, index, options);
                    
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
                    switch(_typeof(template.html,true)) {
                        
                        //Set the html embed
                        case "array":
                            options.$html = template.html;
                        break;
                        
                        //Make sure this is a template
                        // AND it's always in an array form
                        case "object":
                            options.$html = [template.html];
                        break;
                        
                        default:
                        break;
                    }
                    
                break;
                
                //OPTIONAL
                //Custom data object
                // MUST be a function
                case "data":
                    
                    //Get the data (if required)
                    switch(_typeof(template.data)) {
                        
                        case "function":
                            
                            //Call the data function to get the data for this template
                            data = template.data.call(obj, obj, index, options.data); 
                        break;
                        
                        //OTHERWISE NOT IMPLEMENTED
                    }
                    
                break;
            }
        }
        
        //If we don't have the component then exit
        // template can be an object or array
        if(_typeof(component.template) !== "object") return(ihtml);
        
        //template and assign to the output
        ihtml.append(_render(data, component.template, options));
        
        return(ihtml);
    }
}()); 


