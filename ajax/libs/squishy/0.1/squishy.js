(function( $ ){
	
  $.fn.squishy = function(options) {

    // Setup options
    var settings = $.extend({
      'minSize': -10000,
      'maxSize': 10000,
      'maxWidth': 10000,
      'minWidth' : -10000},
      options);
	
    return this.each(function() {

      // Store the object
      var $this = $(this);
      
      // Does the resizing
      var resizer = function () {
        
        // Add the wrapper span
        var theText = $this.html();
        $this.html("<span id='checkSizeForSquishing'>" + theText + "</span>");

        // Figuring out the relevant widths
        var spanWidth = $("#checkSizeForSquishing").width();
        var blockWidth = Math.max(parseFloat(settings.minWidth), Math.min($this.width(), parseFloat(settings.maxWidth)));
        var fontSize = parseFloat($this.css("font-size"));

        // Set the target size (restricted by min/max sizes)
        var targetSize = fontSize*blockWidth/spanWidth;
        targetSize = Math.floor(Math.min(Math.max(targetSize, parseFloat(settings.minSize)), parseFloat(settings.maxSize)));

        $this.css('white-space', 'nowrap');
        $this.css('font-size', targetSize);

        // Remove the wrapper span
        $this.html(theText);
      };

      // Initial
      resizer();
			
      // Calls the resize on viewport width or orientation change
      $(window).on('resize orientationchange', resizer);
    	
    });

  };

})( jQuery );