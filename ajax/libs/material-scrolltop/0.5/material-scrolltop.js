/**
* Material-scrollTop
* 
* Author: Bartholomej
* Website: https://github.com/bartholomej/material-scrollTop
* Docs: https://github.com/bartholomej/material-scrollTop
* Repo: https://github.com/bartholomej/material-scrollTop
* Issues: https://github.com/bartholomej/material-scrollTop/issues
*/
(function($) {
    function mScrollTop(element, settings) {

        var _ = this,
            breakpoint;
        var scrollTo = 0;

        _.btnClass = '.material-scrolltop';
        _.revealClass = 'reveal';
        _.btnElement = $(_.btnClass);

        _.initial = {
            revealElement: 'body',
            revealPosition: 'top',
            padding: 0,
            duration: 600,
            easing: 'swing',
            onScrollEnd: false
        }

        _.options = $.extend({}, _.initial, settings);

        _.revealElement = $(_.options.revealElement);
        breakpoint = _.options.revealPosition !== 'bottom' ? _.revealElement.offset().top : _.revealElement.offset().top + _.revealElement.height();
        scrollTo = element.offsetTop + _.options.padding;

        $(document).scroll(function() {
            if (breakpoint < $(document).scrollTop()) {
                _.btnElement.addClass(_.revealClass);
            } else {
                _.btnElement.removeClass(_.revealClass);
            }
        });

        _.btnElement.click(function() {
            $('body').animate({scrollTop: scrollTo}, _.options.duration, _.options.easing, _.options.onScrollEnd);
            return false;
        });
    }

    $.fn.materialScrollTop = function() {
        var _ = this,
            opt = arguments[0],
            l = _.length,
            i = 0;
            if (typeof opt == 'object' || typeof opt == 'undefined') {
                _[i].materialScrollTop = new mScrollTop(_[i], opt);
            }
        return _;
    };
}(jQuery));