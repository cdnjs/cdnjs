// Pagex
// A minimal engine for loading only page-specific code with regex
var pagex = function(path, negate, callback){
  
  
  // Allow it to have different signatures
  if (!callback) {
    callback = negate;
    negate = false;
  }
  
  // The actual function
  var fn = function(){
    
    // Url without leading slash
    var url = window.location.pathname.replace(/^\//, '');
    
    
    // Check whether we are in the correct page or not
    if (path.test(url) != negate) {
      
      callback.apply(null, url.match(path) ? url.match(path).slice(1) : []);
    }
  };
  
  
  // We want to execute it when the DOM is ready, but not before. So we need to
  // add the listener, but we also need to check if it was already triggered
  document.addEventListener('DOMContentLoaded', fn);
  
  // The DOM was lodaded already
  if (["interactive", "complete", "loaded"].indexOf(document.readyState) != -1) {
    fn();
  }
};