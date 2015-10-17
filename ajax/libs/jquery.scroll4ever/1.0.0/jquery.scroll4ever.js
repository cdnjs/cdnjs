(function($){
    "use strict";
    $.fn.scroll4ever = function(options, asd)
    {
        var settings = $.extend({
            trigger : false,
            container: $(this),
            selector: false,
            distance : 0,
            start : function(){},
            complete : function(){},
            debug : false
        }, options);

        var scope = $(this);
        var loading = false;

        var log = function(obj) { if (settings.debug && console.log != undefined) { console.log(obj); } }
        log('initialized');
        log(scope);
        log(settings);       

        $(this).on('click', settings.trigger, function(){
            log('triggered');
            settings.start();
            loading = true;
            var url = scope.find(settings.trigger).attr('href');
            log('requesting: ' + url);
            $('<div></div>').load(url, function() {
                var newScope = $(this).find(scope.selector);
                scope.find(settings.trigger).replaceWith(newScope.find(settings.trigger));
                scope.find(settings.container).append(newScope.find(settings.selector));
                loading = false;
                log('done');
                settings.complete();
            });
            return false;
        });

        if (settings.distance)
        {
            $(window).on('scroll',function(){
                if ($(document).scrollTop() >= ($(document).height() - $(window).height() - settings.distance))
                {
                    if (!loading)
                    {
                        $(settings.trigger).trigger('click');
                    }
                }
            });
        }
    };

})(jQuery);