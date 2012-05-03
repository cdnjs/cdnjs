/**
 * Test broken code and automatic error handling.
 * 
 * Used within mfabrik-blog-error-reporting.html
 */

mobilize.extend(mobilize, {
    
    constructFrontPage: function (content) {
        // Let's fail
        throw "Oh noes. bad thing happened.";
    }
	
});                 

 