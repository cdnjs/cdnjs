(function($) {

    $.noty.layouts.bottom = {
        name     : 'bottom',
        options  : {},
        container: {
            object  : '<ul id="noty_bottom_layout_container" />',
            selector: 'ul#noty_bottom_layout_container',
            style   : function() {
                $(this).css({
                    bottom       : 0,
                    left         : '5%',
                    position     : 'fixed',
                    width        : '90%',
                    height       : 'auto',
                    margin       : 0,
                    padding      : 0,
                    listStyleType: 'none',
                    zIndex       : 9999999
                });
            }
        },
        parent   : {
            object  : '<li />',
            selector: 'li',
            css     : {}
        },
        css      : {
            display: 'none'
        },
        addClass : ''
    };

})(jQuery);