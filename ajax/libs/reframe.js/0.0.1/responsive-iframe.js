(function( window, factory ) {

  ResponsiveIframe = window.ResponsiveIframe || {};
  if ( 'undefined' === typeof ResponsiveIframe ) return console.log('Unmet Dependencies');
  factory( ResponsiveIframe );

})( this, function( utils ) {

  window.ResponsiveIframe = function( 
    responsiveIframe, 
    excludedIframe
  ) {
      
    responsiveIframe = document.querySelectorAll(responsiveIframe);
    for (i = 0; i < responsiveIframe.length; ++i) {

      if ( typeof(excludedIframe) !== 'undefined') {
        if (responsiveIframe[i] === document.querySelector(excludedIframe) ) return;
      }

      var wrapper = document.createElement("div"),
          divAdded = false;
      wrapper.className += 'js-responsive-iframe';
      responsiveIframe[i].removeAttribute('height');
      responsiveIframe[i].removeAttribute('width');
      responsiveIframe[i].removeAttribute('style');
      if ( ! divAdded ) {
        responsiveIframe[i].parentNode.insertBefore(wrapper, responsiveIframe[i]);
        divAdded = true;
      }
      responsiveIframe[i].parentNode.removeChild(responsiveIframe[i]);
      wrapper.appendChild(responsiveIframe[i]); 
    }

    return this;
  }; 

});