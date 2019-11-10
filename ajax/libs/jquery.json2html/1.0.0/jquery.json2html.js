//Copyright (c) 2016 Crystalline Technologies
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

(function($){	

    //Alias for json2html.transform
	// _options 
	//   output : json2html | html | jquery
    $.json2html = function(json, transform, _options) {
        
        //Make sure we have the json2html base loaded
        if(typeof json2html === 'undefined') return(undefined);

		//Default Options
        var options = {
            'output':'json2html'
        };

		//Extend the options (with defaults)
        if( _options !== undefined ) $.extend(options, _options);

		switch(options.output){

			//Process the transform with events
			// for consumption within a json2html html attribute function call 
			// returns an object {'html':html,'events'[]}
			case 'json2html':

				//make sure we have the events set as true
				options.events = true;

				return(json2html.transform(json, transform, options));
			break;

			//Return raw html (same as calling json2html.transform
			case 'html':

				//make sure we have the events set as false (to get html)
				options.events = false;
				
				return(json2html.transform(json, transform, options));
			break;
		
			//Return a jquery object
			case 'jquery':

				//make sure we have the events set as true
				options.events = false;

				//let json2html core do it's magic
				// and then process any jquery events
				var $result = json2html_events(json2html.transform(json, transform, options));

				//return the jquery object
				return($result);
			break;
		}
    };

	//Chaining method
	$.fn.json2html = function(json, transform, _options) {
    
        //Make sure we have the json2html base loaded
        if(typeof json2html === 'undefined') return(undefined);
    
        //Default Options
        var options = {
            'append':true,
            'replace':false,
            'prepend':false,
            'eventData':{}
        };
    
        //Extend the options (with defaults)
        if( _options !== undefined ) $.extend(options, _options);
        
        //Insure that we have the events turned (Required)
        options.events = true;
        
        //Otherwise we're running $().json2html
        return this.each(function(){ 
            
            //let json2html core do it's magic
            // and then process any jquery events
            var $result = json2html_events(json2html.transform(json, transform, options));

            //Append it to the appropriate element
            if (options.replace) $.fn.replaceWith.call($(this),$result);
            else if (options.prepend) $.fn.prepend.call($(this),$result);
            else $.fn.append.call($(this),$result);
        });
    };
})(jQuery);


function json2html_events(result) {

	//Attach the html(string) result to the DOM
	var dom = $(document.createElement('i')).html(result.html);
	
	//Determine if we have events
	for(var i = 0; i < result.events.length; i++) {
		
		var event = result.events[i];
		
		//find the associated DOM object with this event
		var obj = $(dom).find("[json2html-event-id-"+event.type+"='" + event.id + "']");
		
		//Check to see if we found this element or not
		if(obj.length === 0) throw 'jquery.json2html was unable to attach event ' + event.id + ' to DOM';
		
		//remove the attribute
		$(obj).removeAttr('json2html-event-id-'+event.type);
		
		//attach the event
		$(obj).on(event.type,event.data,function(e){
			//attach the jquery event
			e.data.event = e;
			
			//call the appropriate method
			e.data.action.call($(this),e.data);
		});
	}
	
	//Get the children to this result
	return($(dom).children());
}