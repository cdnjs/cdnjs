/*!
Always dirty helper module (for jQuery Dirty Forms) | v2.0.0-beta00008 | github.com/snikch/jquery.dirtyforms
(c) 2015 Mal Curtis
License MIT
*/

// Example helper, the form is always considered dirty

(function($, window, document, undefined) {
    // Can't use ECMAScript 5's strict mode because several apps 
    // including ASP.NET trace the stack via arguments.caller.callee 
    // and Firefox dies if you try to trace through "use strict" call chains. 
    // See jQuery issue (#13335)
    // Support: Firefox 18+
    //"use strict";

    // Create a new object, with an isDirty method
    var alwaysDirty = {
        isDirty: function (node) {
            // Perform dirty check on a given node (usually a form element)	
            return true;
        }
    };
    // Push the new object onto the helpers array
    $.DirtyForms.helpers.push(alwaysDirty);

})(jQuery, window, document);
