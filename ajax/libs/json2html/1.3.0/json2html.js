//     json2html.js 1.3.0
//     https://www.json2html.com
//     (c) 2006-2019 Crystalline Technologies
//     Json2html may be freely distributed under the MIT license.

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

	/* ---------------------------------------- Public Methods ------------------------------------------------ */
	root.json2html = {

		//Current version
		'version':'1.3.0',
		
		//Transform json to html
		'transform': function(json,transform,_options) {
			
			//create the default output
			var out = {'events':[],'html':''};
			
			//default options (by default we don't allow events)
			var options = {
				'events':false
			};
			
			//extend the options
			options = _extend(options,_options);

			//Make sure we have a transform & json object
			if( transform !== undefined || json !== undefined ) {

				//Normalize strings to JSON objects if necessary
				var obj = typeof json === 'string' ? JSON.parse(json) : json;
				
				//Transform the object (using the options)
				out = _transform(obj, transform, options);
			}
			
			//determine if we need the events
			// otherwise return just the html string
			if(options.events) return(out);
				else return( out.html );
		},

		//Encode the html string to text
		'toText':function(html) {
			
			//Check for undefined or null
			if(html === undefined || html === null) return("");
			
			//Otherwise convert to a string and encode HTML components
			return html.toString()
				.replace(/&/g, '&amp;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;')
				.replace(/\"/g, '&quot;')
				.replace(/\'/g, '&#39;')
				.replace(/\//g, '&#x2F;');
		}
	};

	/* ---------------------------------------- Private Methods ------------------------------------------------ */

	//Extend options
	function _extend(obj1,obj2){
		var obj3 = {};
		for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
		for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
		return obj3;
	}

	//Append results
	function _append(obj1,obj2) {
		var out = {'html':'','event':[]};
		if(typeof obj1 !== 'undefined' && typeof obj2 !== 'undefined') {
			out.html = obj1.html + obj2.html;

			out.events = obj1.events.concat(obj2.events);
		}

		return(out);
	}

	//isArray (fix for IE prior to 9)
	function _isArray(obj) {
		return Object.prototype.toString.call(obj) === '[object Array]';
	}
	
	//Transform object
	function _transform(json, transform, options) {
		
		var elements = {'events':[],'html':''};
		
		//Determine the type of this object
		if(_isArray(json)) {

			//Itterrate through the array and add it to the elements array
			var len=json.length;
			for(var j=0;j<len;++j) {	
				//_apply the transform to this object and append it to the results
				elements = _append(elements,_apply(json[j], transform, j, options));
			}
			
		} else {

			switch(typeof json) {
				
				case 'undefined':
				case 'function':
				
				//OBJECT, 
				default:
					//_apply the transform to this object and append it to the results
					elements = _append(elements,_apply(json, transform, undefined, options));
				break;
			}

			
		}

		//Return the resulting elements
		return(elements);		
	}

	//Apply the transform at the second level
	function _apply(obj, transform, index, options) {

		var element = {'events':[],'html':''};
		
		//Itterate through the transform and create html as needed
		if(_isArray(transform)) {
			
			var t_len = transform.length;
			for(var t=0; t < t_len; ++t) {
				//transform the object and append it to the output
				element = _append(element,_apply(obj, transform[t], index, options));
			}

		} else if(typeof transform === 'object') {
			
			var _element = '<>';
			
			//Add legacy support for tag
			if(transform[_element] === undefined) _element = 'tag';
			
			//Check to see if we have a valid element name
			if( transform[_element] !== undefined ) {

				//Get the element name (this can be tokenized)
				var name = _getValue(obj,transform,_element,index,options);
				
				//Determine if this is a void element
				// shouldn't have any contents, if it does then ignore
				var isVoid = _isVoidElement(name);

				//Create a new element
				element.html += '<' + name;

				//Create a new object for the children
				var children = {'events':[],'html':''};
				
				//innerHTML
				var html;

				//Look into the properties of this transform
				for (var key in transform) {

					switch(key) {
						
						//DEPRECATED (use <> instead)
						case 'tag':

						//HTML element to render
						case '<>':
							//Do nothing as we have already created the element
						break;
						
						//Encode as text
						case 'text':
							
							//Ignore for void elements
							if(isVoid) continue;

							//Get the transform value associated with this key
							var _transform = transform[key];
							
							//Determine what kind of object this is
							// array => NOT SUPPORTED
							// other => text
							if(!_isArray(_transform)) {	
								//Get the encoded text associated with this element
								html = json2html.toText( _getValue(obj,transform,key,index,options) );
							}
							 
						break;

						//DEPRECATED (use HTML instead)
						case 'children':

						//Encode as HTML
						// accepts Array of children, functions, string, number, boolean
						case 'html':

							//Ignore for void elements
							if(isVoid) continue;

							//Get the transform value associated with this key
							// added as key could be children or html
							var _transform = transform[key];

							//Determine what kind of object this is
							// array & function => children
							// other => html
							if(_isArray(_transform)) {
								
								//_apply the transform to the children
								children = _append(children,_apply(obj, _transform, index, options));
							} else if(typeof _transform === 'function') {
								
								//Get the result from the function
								var temp = _transform.call(obj, obj, index, options.data);
								
								//Don't allow arrays as return objects from functions
								if(!_isArray(temp)) {
									
									//Determine what type of object was returned
									switch(typeof temp){
	
										//Only returned by json2html.transform or $.json2html calls
										case 'object':
											//make sure this object is a valid json2html response object
											// we ignore all other objects (since we don't know how to represent them in html)
											if(temp.html !== undefined && temp.events !== undefined) children = _append(children,temp);
										break;
										
										//Not supported
										case 'function':
										case 'undefined':
										break; 
	
										//Append to html
										// string, number, boolean
										default:
											children.html += temp;
										break;
									}
								}
							} else {
								
								//Get the HTML associated with this element
								html = _getValue(obj,transform,key,index,options);
							}
						break;

						default:
							//Add the property as a attribute if it's not a key one
							var isEvent = false;
							
							//Check if the first two characters are 'on' then this is an event
							if( key.length > 2 )
								if(key.substring(0,2).toLowerCase() == 'on') {
									
									//Determine if we should add events
									if(options.events) {

										//if so then setup the event data
										var data = {
											'action':transform[key],
											'obj':obj,
											'data':options.data,
											'index':index
										};
										
										//create a new id for this event
										var id = _guid();

										//append the new event to this elements events
										element.events[element.events.length] = {'id':id,'type':key.substring(2),'data':data};

										//Insert temporary event property (json2html-event-id) into the element
										element.html += " json2html-event-id-"+key.substring(2)+"='" + id + "'";
									}
									//this is an event
									isEvent = true;
								}

							//If this wasn't an event AND we actually have a value then add it as a property
							if( !isEvent){
								//Get the value
								var val = _getValue(obj, transform, key, index, options);
								
								//Make sure we have a value
								if(val !== undefined) {
									var out;
									
									//Determine the output type of this value (wrap with quotes)
									if(typeof val === 'string') out = '"' + val.replace(/"/g, '&quot;') + '"';
									else out = val;
									
									//create the name value pair
									element.html += ' ' + key + '=' + out;
								}
							}
						break;
					}
				}
			
				//For non void elements
				if(!isVoid) {
					
					//Close the opening tag
					element.html += '>';

					//add the innerHTML (if we have some)
					if(html) element.html += html;

					//add the children (if we have any)
					element = _append(element,children);

					//add the closing tag
					element.html += '</' + name + '>';
				} else {
					
					//For void elements just close the opening tag
					element.html += '/>';
				}
			}
		}
		
		//Return the output object
		return(element);
	}

	//Get a new GUID (used by events)
	function _guid() {
		var S4 = function() {
		   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
		};
		return (S4()+S4()+"-"+S4()+S4()+"-"+S4()+S4());
	}

	//Get the html value of the object
	function _getValue(obj, transform, key, index, options) {
		
		var out = '';
		
		var val = transform[key];

		//Check the type of this transform value
		switch(typeof val) {
			
			//Get the value from the function
			case "function":

				//Check what the value is of the object we're trying to transform
				switch(typeof obj) {
					
					//If this is an object (JSON) then get the component that we want
					case 'object':
						return( val.call(obj,obj,index,options.data) );
					break;
					
					case 'function':
					case 'undefined':
						//NOT SUPPORTED
						return('');
					break;
							
					//BOOLEAN, NUMBER, BIGINT, STRING, SYMBOL
					default:

						//Create a new object with the properties (value & index)
						var _obj = {"value":obj,"index":index,"data":options.data};
						return(val.call(_obj,_obj,index,options.data));
					break;
				}
			break;
			
			//Check for short hand ${..}
			case "string":
				
				var tokenizer = new _tokenizer([/\$\{([^\}\{]+)\}/],function( src, real, re ){
					return real ? src.replace(re,function(all,name){
						
						//Split the string into it's seperate components
						var components = name.split('.');

						//Set the object we use to query for this name to be the original object
						var useObj = obj;

						//Check what the value is of the object we're trying to transform
						switch(typeof obj) {
							
							//If this is an object (JSON) then get the component that we want
							case 'object':
							
								//Output value
								var outVal = '';
								
								//Parse the object components
								var c_len = components.length;
								for (var i=0;i<c_len;++i) {

									if( components[i].length > 0 ) {

										var newObj = useObj[components[i]];
										useObj = newObj;
										if(useObj === null || useObj === undefined) break;
									}
								}
								
								//As long as we have an object to use then set the out
								if(useObj !== null && useObj !== undefined) outVal = useObj;

								return(outVal);
							break;
							
							case 'function':
							case 'undefined':
								//NOT SUPPORTED
								return('');
							break;
							
							//BOOLEAN, NUMBER, BIGINT, STRING, SYMBOL
							default:
								
								//Check the name of the shorthand
								switch(name) {

									//RESERVED word for static array value
									case 'value':
										return(obj);
									break;
									
									//RESERVED word for static array value index
									case 'index':
										return(index);
									break;
								}
							break;
						}

						
					}) : src;
				});
			
				//Get the full value by joining all the tokens
				out = tokenizer.parse(val).join('');
			break;
			
			//Otherwise just use the value
			default:
				out = val;
			break;
			
		}
		
		return(out);
	}
	
	//Tokenizer
	function _tokenizer( tokenizers, doBuild ){

		if( !(this instanceof _tokenizer ) )
			return new _tokenizer( tokenizers, doBuild );
			
		this.tokenizers = tokenizers.splice ? tokenizers : [tokenizers];
		if( doBuild )
			this.doBuild = doBuild;

		this.parse = function( src ){
			this.src = src;
			this.ended = false;
			this.tokens = [ ];
			do {
				this.next();
			} while( !this.ended );
			return this.tokens;
		};
		
		this.build = function( src, real ){
			if( src )
				this.tokens.push(
					!this.doBuild ? src :
					this.doBuild(src,real,this.tkn)
				);	
		};

		this.next = function(){
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

		this.findMin = function(){
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
	}

	//Determines if we have a void element
	// (No end tag, and must not contain any contents)
	function _isVoidElement(element){
	
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
		
}());