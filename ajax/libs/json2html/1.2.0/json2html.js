//Copyright (c) 2018 Crystalline Technologies
//
//  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'),
//  to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
//  and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
//  WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var json2html = {
	
	/* ---------------------------------------- Public Methods ------------------------------------------------ */
	'transform': function(json,transform,_options) {
		
		//create the default output
		var out = {'events':[],'html':''};
		
		//default options (by default we don't allow events)
		var options = {
			'events':false
		};
		
		//extend the options
		options = json2html._extend(options,_options);

		//Make sure we have a transform & json object
		if( transform !== undefined || json !== undefined ) {

			//Normalize strings to JSON objects if necessary
			var obj = typeof json === 'string' ? JSON.parse(json) : json;
			
			//Transform the object (using the options)
			out = json2html._transform(obj, transform, options);
		}
		
		//determine if we need the events
		// otherwise return just the html string
		if(options.events) return(out);
			else return( out.html );
	},
	
	/* ---------------------------------------- Private Methods ------------------------------------------------ */
	
	//Extend options
	'_extend':function(obj1,obj2){
		var obj3 = {};
		for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
		for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
		return obj3;
	},
	
	//Append results
	'_append':function(obj1,obj2) {
		var out = {'html':'','event':[]};
		if(typeof obj1 !== 'undefined' && typeof obj2 !== 'undefined') {
			out.html = obj1.html + obj2.html;

			out.events = obj1.events.concat(obj2.events);
		}

		return(out);
	},

	//isArray (fix for IE prior to 9)
	'_isArray':function(obj) {
		return Object.prototype.toString.call(obj) === '[object Array]';
	},
	
	//Transform object
	'_transform':function(json, transform, options) {
		
		var elements = {'events':[],'html':''};
		
		//Determine the type of this object
		if(json2html._isArray(json)) {
			
			//Itterrate through the array and add it to the elements array
			var len=json.length;
			for(var j=0;j<len;++j) {	
				//Apply the transform to this object and append it to the results
				elements = json2html._append(elements,json2html._apply(json[j], transform, j, options));
			}

		} else if(typeof json === 'object') {

			//Apply the transform to this object and append it to the results
			elements = json2html._append(elements,json2html._apply(json, transform, undefined, options));
		}

		//Return the resulting elements
		return(elements);		
	},

	//Apply the transform at the second level
	'_apply':function(obj, transform, index, options) {

		var element = {'events':[],'html':''};
		
		//Itterate through the transform and create html as needed
		if(json2html._isArray(transform)) {
			
			var t_len = transform.length;
			for(var t=0; t < t_len; ++t) {
				//transform the object and append it to the output
				element = json2html._append(element,json2html._apply(obj, transform[t], index, options));
			}

		} else if(typeof transform === 'object') {
            
            var _element = '<>';
            
            //Add legacy support for tag
            if(transform[_element] === undefined) _element = 'tag';
            
			//Check to see if we have a valid element name
			if( transform[_element] !== undefined ) {

                //Get the element name (this can be tokenized)
				var name = json2html._getValue(obj,transform,_element,index);
                
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
							//Get the transform value associated with this key
							var _transform = transform[key];
							
							//Determine what kind of object this is
							// array => NOT SUPPORTED
							// other => text
							if(json2html._isArray(_transform)) {
                                //NOT Supported
							} else if(typeof _transform === 'function') {
								
								//Get the result from the function
								var temp = _transform.call(obj, obj, index);
								
								//Don't allow arrays as return objects from functions
    							if(!json2html._isArray(temp)) {

    								//Determine what type of object was returned
    								switch(typeof temp){
                                    
    									//Not supported for text
    									case 'function':
    									case 'undefined':
    									case 'object':
    									break; 
    									
    									//Append as text
    									// string, number, boolean
    									default:
    										//Insure we encode as text first
    										children.html += json2html.toText(temp);
    									break;
    								}
    							}
							} else {
								
								//Get the encoded text associated with this element
								html = json2html.toText( json2html._getValue(obj,transform,key,index) );
							}
						break;

						//DEPRECATED (use HTML instead)
						case 'children':

						//Encode as HTML
						// accepts Array of children, functions, string, number, boolean
						case 'html':

							//Get the transform value associated with this key
							// added as key could be children or html
							var _transform = transform[key];

							//Determine what kind of object this is
							// array & function => children
							// other => html
							if(json2html._isArray(_transform)) {
                                
								//Apply the transform to the children
								children = json2html._append(children,json2html._apply(obj, _transform, index, options));
							} else if(typeof _transform === 'function') {
								
								//Get the result from the function
								var temp = _transform.call(obj, obj, index);
                                
                                //Don't allow arrays as return objects from functions
                                if(!json2html._isArray(temp)) {
                                    
    								//Determine what type of object was returned
    								switch(typeof temp){
    
    									//Only returned by json2html.transform or $.json2html calls
    									case 'object':
    										//make sure this object is a valid json2html response object
    										// we ignore all other objects (since we don't know how to represent them in html)
    										if(temp.html !== undefined && temp.events !== undefined) children = json2html._append(children,temp);
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
								html = json2html._getValue(obj,transform,key,index);
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
											'data':options.eventData,
											'index':index
										};
										
										//create a new id for this event
										var id = json2html._guid();

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
								var val = json2html._getValue(obj, transform, key, index);
								
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
			
				//close the opening element
				element.html += '>';
				
				//add the innerHTML (if we have any)
				if(html) element.html += html;

				//add the children (if we have any)
				element = json2html._append(element,children);

				//add the closing element
				element.html += '</' + name + '>';
			}
		}
		
		//Return the output object
		return(element);
	},

	//Get a new GUID (used by events)
	'_guid':function() {
		var S4 = function() {
		   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
		};
		return (S4()+S4()+"-"+S4()+S4()+"-"+S4()+S4());
	},

	//Get the html value of the object
	'_getValue':function(obj, transform, key,index) {
		
		var out = '';
		
		var val = transform[key];
		var type = typeof val;
		
		if (type === 'function') {
			return(val.call(obj,obj,index));
		} else if (type === 'string') {
			var _tokenizer = new json2html._tokenizer([
				/\$\{([^\}\{]+)\}/
			],function( src, real, re ){
				return real ? src.replace(re,function(all,name){
					
					//Split the string into it's seperate components
					var components = name.split('.');

					//Set the object we use to query for this name to be the original object
					var useObj = obj;

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
				}) : src;
			});
			
			out = _tokenizer.parse(val).join('');
		} else {
			out = val;
		}

		return(out);
	},

	//Encode the html to text
	'toText':function(html) {
		return html
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/\"/g, '&quot;')
			.replace(/\'/g, '&#39;')
			.replace(/\//g, '&#x2F;');
	},
	
	//Tokenizer
	'_tokenizer':function( tokenizers, doBuild ){

		if( !(this instanceof json2html._tokenizer ) )
			return new json2html._tokenizer( tokenizers, doBuild );
			
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
};
