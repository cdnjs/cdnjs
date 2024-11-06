
//     json2html.js 3.2.0
//     https://www.json2html.com
//     (c) 2006-2024 Crystalline Technologies
//     json2html may be freely distributed under the MIT license.

(function() {

	"use strict";

	// Baseline setup
	// --------------

	// Establish the root object, `window` (`self`) in the browser, `global`
	// on the server, or `this` in some virtual machines. We use `self`
	// instead of `window` for `WebWorker` support.
	let root = typeof self == 'object' && self.self === self && self ||
			typeof global == 'object' && global.global === global && global ||
			this ||
			{};
	
	//Components {name:template}
	let COMPONENTS = {};
	
	//Triggers {name:[{obj,template,ele}]} for updates
	let TRIGGERS = {};
	
    /* ---------------------------------------- Interactive HTML Object (iHTML) ------------------------------------------------ */
    
    function iHTML(html){
        
        //Object type
        this.type = "iHTML";
        
        //html
        this.html = html || "";
        
        //associated events
        this.events = {};
        
        //associated update triggers
        this.triggers = {};
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
                
                //Append the update triggers
                Object.assign(this.triggers, obj.triggers);
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
	        "events":this.events,
	        "triggers":this.triggers
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
    	let self = this,
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
    	let self = this, i=0, tkn, idx;
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
	root.json2html.version = "3.2.0";
	
	//Render a json2html template to html string
	//  obj (requried) : json object to render, or json string
	//  template (required): json2html template (array / json object / json string)
	//  options (optional) : {
	//      components : {name:template,...}
	//      data : passed to event.data
	//      output : ihtml / html (default)
	//  }
    root.json2html.render = function(obj,template,options) {
        
        //Allow for a json string of json object
		let parsed = obj;
		
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
		
		//Check to make sure we have a template and object
		if(_typeof(template) !== "object" || _typeof(obj) !== "object") return(ihtml);
        
        if(!options) options = {};
        
        //Set the default to html output
        if(!options.output) options.output = "html";
		
	    //Check what type of output we're looking for
	    switch(options.output) {
	        
	        case "ihtml":
	            return(_render(obj, template, options));
	        break;
	        
	        default:
	            return(_render(obj, template, options).html);
	        break;
	    }
	};
	
    //json2html component methods
    root.json2html.component = {
            
        //Add a component (name = string, template = json2html template)
        //OR function(components) where component is obj with name:template property eg {"name":template,...}
        "add":function(name,template){
            
            //Determine what we're adding
            switch(_typeof(name,true)) {
            
                //Multiple components
                case "object":
                    
                    //Components
                    COMPONENTS = Object.assign(COMPONENTS,name);
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
	
	//Trigger a component to be updated
	//  DEPRECATED, use refresh instead
	//  id (required) : id of the component that needs to be updated
	//  obj  (optional) : object we want to use, will overwrite the original object used for this rendering
	root.json2html.trigger = function(id,obj) {
	    
        //Make sure we have a id
        if(!id) return;
        
        //Get the triggers (always an array)
        let arry = TRIGGERS[id];
        if(!arry) return;
        
        //Create a list of all triggers that we need to render
        let all = [];
        
        //Itterate over all elements to trigger an update for
        for(let i=0; i < arry.length; i++) {
            
            //Get the trigger
            let trigger = arry[i];
            
	        //Get the object
	        // default to the original trigger object
	        let _obj = trigger.obj;
	        if(obj) _obj = obj;
	        
	        //Add the trigger object
	        all.push({
	            "index":i,
	            "obj":_obj,
	            "trigger":trigger
	        });
        }
        
        //Perform all the updates 
        // this needs to be done AFTER triggers are read otherwise we'll have an infinite loop
        // render() is called which adds triggers 
        for(let a=0; a < all.length; a++) {
            
            //Get the trigger object
            let o = all[a];
            
            //Render the update if we can find the element in the dom
            if( document.contains(o.trigger.ele) ) o.trigger.ele.json2html(o.obj,o.trigger.template,{"method":"replace"});
	        else {
	            //Otherwise remove the trigger as it's stale
	            arry.splice(o.trigger.index,1);
	        }
        }
        
        //Finally save the trigger
        // as we might have removed some
        TRIGGERS[id] = arry;
    };
	
	//Refresh a component with id
	//  id (required) : id of the component that needs to be updated
	//  obj  (optional) : object we want to use, will overwrite the original object used for this rendering
	root.json2html.refresh = root.json2html.trigger;
	
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
	
	//Set object value
	root.json2html.set = _set;
	
	//Hydrate elements with their events & update triggers
	root.json2html.hydrate = function(parent,events,triggers) {
	    
        let arry = parent;
        
        //Convert the parent to an array of elements
        if(!Array.isArray(parent)) arry = [parent];
        
        //For each parent complete the following
        for(let i=0; i < arry.length; i++) {
            
            let element = arry[i];
            
            //Attach events and get the elements that need ready to be triggered
            let ready = _attachEvents(element,events);
            
            //Trigger all the json2html.ready events
            for(let i=0; i < ready.length; i++) 
            	_triggerEvent(ready[i],"j2h-ready");
            	
            //Set the upgrade triggers
            if(triggers) _setTriggers(element,triggers);
        }
        
        return(this);
	};
	
	/* ---------------------------------------- JS DOM Methods --------------------------------------------------- */
	
	//ONLY for the browser
	// and we have Element defined
	if(typeof(window) === "object" && typeof(Element) === "function") {
        
        //Render a json2html template & append to dom element
        //  obj : json object to render, or json string
        //  template: json2html template (array / object / json string)
        //  options : {}
        //      components : {name:template,...}
        //      data : passed to event.data
        //      method : prepend, replace, append (default)
        Element.prototype.json2html = function(obj,template,options) {
            
            //Create the optional options if required
            if(!options) options = {};
            
            //Default to ihtml output
            options.output = "ihtml";
            
            //Render using the master render function
            let ihtml = json2html.render(obj,template,options);
            
            //Convert the html into a dom object using innerHTML
            // return the childNodes (Node List)
            let dom = document.createElement("tbody");
            dom.innerHTML = ihtml.html;
            
            //Set the element that we want to hydrate with
            let ele = this;
            
            //Determine how we should add the new content
            switch(options.method) {
            
                //Replace
                case "replace":
                    
                    //Convert to an array 
                    // we'll use this for hydration
                    ele = Array.from(dom.childNodes);
                    
                    //Replace
                    this.replaceWith(...dom.childNodes);
                break;
                
                //Prepend
                case "prepend":
                    this.prepend(...dom.childNodes);
                break;
                
                //Default to append
                default:
                    this.append(...dom.childNodes);
                break;
            }
            
            //Rehydrate the object 
            // this will add the events, trigger ready events and setup trigger updates
            json2html.hydrate(ele, ihtml.events, ihtml.triggers);
            
            //Return this for chaining
            return(this);
    	};
	}
	
    /* ---------------------------------------- jQuery Methods (if jquery is present) --------------------------------------------------- */

	//ONLY for the browser
	// and we have jQuery defined
    if(typeof(window) === "object")
        if(window.jQuery) {
            (function($){	
                
                //jQuery render template via chaining
                //  obj : json object to render or json string
                //  template: json2html template (array / object / json string)
                //  options : {}
                //      components : {name:template,...}
                //      data : passed to event.data
                //      method : prepend, replace, append (default)
                $.fn.json2html = function(obj, template, options) {
                
                    //Set the options
                    if(!options) options = {};
                    
                    //Make sure we set the output to ihtml
                    options.output = "ihtml";
                    
                    //Render each object
                    return($(this).each(function(){ 
                    
                        //Render the template
                        // use the render function with iHTML output
                        // then we'll hydrate with events after it's added to the dom
                        let ihtml = json2html.render(obj,template,options);
                        
                        //Set the element that we want to hydrate with
                        let $ele = $(this);
        			    
                        //Determine how we should add the new content
                        switch(options.method) {
                        
                            //Replace
                            case "replace":
                                
                                //Convert the html into a dom object using innerHTML
                                // return the childNodes (Node List)
                                let $dom = $("div");
                                $dom.innerHTML = ihtml.html;
                                
                                //Get the elements we want to replace with
                                $ele = $dom.children();
                                
                                //Repace with these dom children
                                $.fn.replaceWith.call($(this),$ele);
                            break;
                            
                            //Prepend
                            case "prepend":
                                $.fn.prepend.call($(this),ihtml.html);
                            break;
                            
                            //Default to append
                            default:
                                $.fn.append.call($(this),ihtml.html);
                            break;
                        }
                            
                        //Hydrate with events
                        $ele.j2hHydrate(ihtml.events,ihtml.triggers);
                    }));
                };
            	
                //Hydrate the json2html elements with these events
                $.fn.j2hHydrate = function(events,triggers) {
                
                    //Attach the events for each element
                    return($(this).each(function(){ 
                        
                        //Hydrate this element with these events
                        json2html.hydrate(this,events,triggers);
                    }));
                };
            	
            })(window.jQuery);
        }
	
	/* ---------------------------------------- Prviate Methods ------------------------------------------------ */
	
	//Trigger the event type for this element
	function _triggerEvent(element,type) {
	    
	    let event; // The custom event that will be created
	    
	    //Check to see if we have the createEvent function
        if(document.createEvent){
            event = document.createEvent("HTMLEvents");
            event.initEvent(type, true, true);
            event.eventName = type;
            element.dispatchEvent(event);
        } else {
            event = document.createEventObject();
            event.eventName = type;
            event.eventType = type;
            element.fireEvent("on" + event.eventType, event);
        }
	}
	
	//Attach the events to the parent & children of this element
	// we need to check the parent as well to ensure that events get added after a trigger event
	function _attachEvents(parent,events) {
		
		//Record json2html specific ready events
		let ready = [];
		
		//Get the elements that need to be triggered
		let elements = Array.from( parent.querySelectorAll("[-j2h-e]") );
		
		//Also check to see if the parent element has any triggers
		if(parent.getAttribute("-j2h-e")) elements.push(parent);
		
		//Itterate over the elements with events
		for(let e=0; e < elements.length; e++) {
		    
		    let element = elements[e];
            
            //Get the events we should attach to this element
            let attach = element.getAttribute("-j2h-e");
            
            //remove the event attribute
			element.removeAttribute("-j2h-e");
            
            //Make sure we have some events to attach
            if(attach) {
            
                //split by " " (can contain multiple events per element)
                let _events = attach.split(" ");
                
                //Add each event
                for(let i = 0; i < _events.length; i++) {
                    
                    //Process each event and keep the context for the event listener
                    ((event)=>{
                        
                        //Don't have this event then just skip
                        if(!event) return;
                        
                        //Add the ready event 
                        //  json2html specific event
                        if(event.type === "ready") {
                            
                            //Sepcify that we'll need to trigger these later
                            ready.push(element);
                            
                            //rename the event to j2h-ready
                            event.type = "j2h-ready";
                        }
                        
                        //Attach the events to the element
                        element.addEventListener(event.type,function(e){
                            
                            //Disable j2h-ready events from being propagated
                            if(event.type === "j2h-ready") e.stopPropagation();
                            
                        	//attach the javascript event
                        	event.data.event = e;
                        	
                        	//call the appropriate method
                        	if(_typeof(event.action) === "function") event.action.call(this,event.data);
                        });
                    })(events[_events[i]]);
                    
                }
            }
		}
		
		//Return the ready events
		return(ready);
	}
	
	//Set the update triggers
	function _setTriggers(parent,triggers) {
		
		//Get the elements that need to be triggered
		let elements = Array.from( parent.querySelectorAll("[-j2h-t]") );
		
		//Also check to see if the parent element has any triggers
		if(parent.getAttribute("-j2h-t")) elements.push(parent);
		
		//Itterate over the elements with triggers
		for(let e=0; e < elements.length; e++) {
		    
		    let element = elements[e];
            
            //Get the triggers that we need to listen to
            let id = element.getAttribute("-j2h-t");
            
            //Make sure we have some triggers
            if(!id) return;
            
            //split by " " (can contain multiple triggers per element)
            let _triggers = id.split(" ");
            
            //Add each trigger
            for(let i = 0; i < _triggers.length; i++) {
                
                let trigger = triggers[_triggers[i]];
                
                //Don't have a trigger then just skip
                if(!trigger) continue;
                
                //Add the element to the trigger
                // we need this later to make sure we update the right element
                trigger.ele = element;
                
                //Create a new array of triggers for this trigger name
                if(!TRIGGERS[trigger.name]) TRIGGERS[trigger.name] = [];
                
                //Add the trigger
                TRIGGERS[trigger.name].push(trigger);
            }
            
            //remove the event attribute
			element.removeAttribute("-j2h-t");
		}
	}

    //Render the object using the template to ihtml (html + events)
    //  obj : json object 
	//  template: json2html template (array / object / json string)
    //  options : {}
    //      components : {name:template,...}
    //      data : passed to event.data
    //      method : prepend, replace, append (default)
    //      output : html / ihtml (although we always output iHTML needed to determine if we bother with events)
	function _render(obj, template, options, index, pobj) {
        
        //Create a new ihtml object
		let ihtml = new iHTML();
		
		//Check to see what type of object we're rending
		switch(_typeof(obj,true)) {
            
            case "array":
                
                //Itterrate through the array and render each object
                let len=obj.length;
                for(let j=0;j<len;++j) {	
                
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
	
	//Render an object using this template to ithml
	function _renderObj(obj, template, options, index, pobj) {
		
		let ihtml = new iHTML();
		
		//Check the type of template we want to apply
		switch(_typeof(template,true)) {
		    
            //Array of templates
            case "array":
            
                //Itterate through each template
                let t_len = template.length;
                for(let t=0; t < t_len; ++t) {
                	
                	//Render the template and append
                	ihtml.append( _renderObj(obj, template[t], options, index) );
                }
                
            break;
            
            //single template & single object
            case "object":
                
                let fobj = template["{}"];
                
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
	
	//Get the html value of the object
	function _getValue(obj, template, key, options, index) {
		
		let out = "";
		
		//Get the template property
		let prop = template[key];
		
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
        				let _obj = {"value":obj,"index":index,"data":options.data};
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
	
	/* ---------------------------------------- Safe Object Methods -------------------------------------------- */
	
	//Get the property from the object
	function _get(obj,path){
	    
	    //Split the path into it's seperate components
		let _path = path.split(".");
		
		//Set the object we use to query for this name to be the original object
		let subObj = obj;
	    
		//Parse the object properties
		let c_len = _path.length;
		for(let i=0;i<c_len;++i) {
            
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
	
	//Set object value 
	function _set(obj, path, val) {
    	path.split && (path=path.split('.'));
    	var i=0, l=path.length, t=obj, x, k;
    	while (i < l) {
    		k = path[i++];
    		if (k === '__proto__' || k === 'constructor' || k === 'prototype') break;
    		t = t[k] = (i === l) ? val : (typeof(x=t[k])===typeof(path)) ? x : (path[i]*0 !== 0 || !!~(''+path[i]).indexOf('.')) ? {} : [];
    	}
    }
	
	/* ---------------------------------------- Interpolate (Template Literals) -------------------------------------------- */
	
	//Typeof helper
	function _typeof(obj,checkArray) {
	    
	    const type = typeof obj;
	    
	    //Check what kind of object this is
	    if(type === "object") {
	        
	        //Check for null
	        if(obj === null) return("null");
	        
	        //Check for array
	        if(checkArray)
	            if(Array.isArray(obj)) return("array");
	    }
	    
	    return(type);
	}

	//Get a new random id 
	function _id() {
		return (_random()+_random());
	}
	
	//Random string (4 characters)
	function _random() {
	   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
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
    	
    	const tokenizer = new Tokenizer([
    		/\${([\w\-\.\,\$\s]+)}/  
    	 ],function( src, real, re ){
    		return real ? src.replace(re,method) : src;
    	  }
    	);
    	
    	return(tokenizer.parse(str).join(""));		
    }
    
	/* ---------------------------------------- Template Types ------------------------------------------------ */
	
	//default html type
	// supports <> 
	// returns iHTML
	function _html(pobj, obj, template, options, index){
    
        //Create a new ihtml object for the parent and it's children
        let parent = new iHTML(),
            children = new iHTML();
        
        //Set the default html element key
        // and initialize the events arrau
		let ele = "<>",
		    events = [],
		    triggers = [];
		
		//Look into the properties of this template
		for(let prop in template) {
		    
			switch(prop) {
				
				//HTML element
				case "<>":
					
					//Get the element name (this can be tokenized)
            		parent.name = _getValue(pobj || obj, template, ele, options, index);
            		
            		//Create a new element
		            parent.appendHTML("<" + parent.name);
				break;
				
				//Object
				case "{}":
				break;
				
				//Assign
				case ">>":
                    
                    //Add in onchange event
                    //if so then setup the event data
					let aData = {
						"obj":obj,
						"data":options.data,
						"index":index,
						
						//Unique for assign
						"var":template[prop]
					};
					
					//create a new id for this event
					let aId = _id();
					
					//Check for the type of element this is
					switch(template["<>"]) {
					    
                        //Partial Support
                        case "input":
                        
                            //Check the type of input
                            switch(template["type"]) {
                                
                                //These types of inputs aren't supported
                                case "button":
                                case "submit":
                                case "reset":
                                case "image":
                                    continue;
                                break;
                                
                                //All others are supported
                                default:
                                break;
    		                }
                        break;
                        
                        //Supported
                        case "select":
                        case "textarea":
                        break;
                        
                        //All others not supported
                        default:
                            continue;
                        break;
                        
					}
					
					//Add to the events for this element
					// we'll add these later into the DOM
					parent.events[aId] = {"type":"change","data":aData,"action":function(e){
					    
					    //Set the value
					    json2html.set( e.obj, e.var, e.event.target.value);
					}};
					
					//Add the event to the list of events for this element
					events.push(aId);
				break;
				
				//Refresh Id
				case "#":
				    
				    //create a new refresh id for this event
					let tid = _id();
					
					//Add to the triggers for this element
					// we'll add these later in the DOM
					parent.triggers[tid] = {"name":_getValue(obj,template,prop,options,index),"obj":obj,"template":template};
					
					//Add the trigger to the list of triggers for this element
					triggers.push(tid);
				break;
				
				//Encode text
				case "text":
					
					//Determine what kind of object this is
					// array => NOT SUPPORTED
					// other => text
					// Encode the value as text and add it to the children
					if(!Array.isArray(template[prop])) children.appendHTML( json2html.toText( _getValue(obj,template,prop,options,index) ) );
					 
				break;
				
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
                            // HTML is the inner html of the component (if it had any)
                            let temp = template[prop].call(obj, obj, index, options.data, options.html);
                            
                            //Determine what type of result we have
                            switch(_typeof(temp,true)) {
                                
                                //Only returned by json2html.render ()
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
					let isEvent = false;
					
					//Check if the first two characters are 'on' then this is an event
					if( prop.length > 2 )
						if( prop.substring(0,2).toLowerCase() === "on" ) {
						    
							//Determine if we should add events
							if(options.output === "ihtml") {
							    
								//if so then setup the event data
								let data = {
									"obj":obj,
									"data":options.data,
									"index":index
								};
								
								//create a new id for this event
								let id = _id();
								
								//Add to the events for this element
								// we'll add these later into the DOM
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
						let val = _getValue(obj, template, prop, options, index);
						
						//Make sure we have a value
						if(val !== undefined) {
							let out;
							
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

        //Insert temporary event property -j2h-t
        // with events seperated by a space
        // if needed
		if(triggers.length) parent.appendHTML(" -j2h-t='" + triggers.join(" ") + "'");
		
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
        let ihtml = new iHTML();
        
        let component = {
            "template":undefined,
            "name":undefined
        };
        
        for(let prop in template) {
            
            //Check the property
            switch(prop) {
                
                //REQUIRED
                case "[]":
                    
                    //Get the component name (from the parent if we have one)
                    let name = _getValue(pobj || obj, template, prop, options, index);
                    
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
                            options.html = _render(obj, template.html, options, index);
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

   