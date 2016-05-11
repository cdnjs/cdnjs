;(function( $ ) {
    
    $.fn.removeWhitespace = function() 
    {
        this.contents().filter(
            function() {
                return (this.nodeType == 3 && !/\S/.test(this.nodeValue));
            }
        ).remove();
        return this;
    }
    
})( jQuery );