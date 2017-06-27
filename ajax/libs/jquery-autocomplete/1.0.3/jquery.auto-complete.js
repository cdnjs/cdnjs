/*
	jQuery autoComplete v1.0.3
    Copyright (c) 2014 Simon Steinberger / Pixabay
    GitHub: https://github.com/Pixabay/jQuery-autoComplete
	License: http://www.opensource.org/licenses/mit-license.php
*/

(function($){
    $.fn.autoComplete = function(options){
        var o = $.extend({ source: '', minChars: 3, delay: 100, cache: true, menuClass: '', onSelect: function(term){} }, options);

        // public methods
        if (typeof options == 'string') {
            this.each(function(){
                var that = $(this);
                if (options == 'destroy') {
                    $(window).off('resize.autocomplete', that.fixPosition);
                    that.off('keydown.autocomplete keyup.autocomplete');
                    if (that.data('autocomplete'))
                        that.attr('autocomplete', that.data('autocomplete'));
                    else
                        that.removeAttr('autocomplete');
                    $(that.data('el')).remove();
                    that.removeData('el').removeData('autocomplete');
                }
            });
            return;
        }

        return this.each(function(){
            var that = $(this);
            that.sb = $('<div class="autocomplete-suggestions"></div>').addClass(o.menuClass);
            that.data('el', that.sb).data('autocomplete', that.attr('autocomplete'));
            that.attr('autocomplete', 'off');
            that.cache = {};
            that.last_val = '';

            that.fixPosition = function(){
                that.sb.css({
                    top: that.offset().top + that.outerHeight(),
                    left: that.offset().left,
                    width: that.outerWidth()
                });
            }
            setTimeout(that.fixPosition, 100);
            $(window).on('resize.autocomplete', that.fixPosition);

            that.fixScroll = function(next){
                that.sb.show();
                if (!that.sb.maxHeight) that.sb.maxHeight = parseInt(that.sb.css('max-height'));
                if (!that.sb.suggestionHeight) that.sb.suggestionHeight = $('.autocomplete-suggestion', that.sb).first().outerHeight();
                if (that.sb.suggestionHeight)
                    if (!next) that.sb.scrollTop(0);
                    else {
                        var scrTop = that.sb.scrollTop(), selTop = next.offset().top - that.sb.offset().top;
                        if ((selTop + that.sb.suggestionHeight) - that.sb.maxHeight > 0)
                            that.sb.scrollTop((selTop + that.sb.suggestionHeight + scrTop) - that.sb.maxHeight);
                        else if (selTop < 0)
                            that.sb.scrollTop(selTop + scrTop);
                    }
            }

            that.sb.appendTo('body');

            that.sb.on('mouseleave.autocomplete', '.autocomplete-suggestion', function (){
                $('.autocomplete-suggestion.selected').removeClass('selected');
            });

            that.sb.on('mouseenter.autocomplete', '.autocomplete-suggestion', function (){
                $('.autocomplete-suggestion.selected').removeClass('selected');
                $(this).addClass('selected');
            });

            that.sb.on('mousedown.autocomplete', '.autocomplete-suggestion', function (){
                var v = $(this).data('val');
                that.val(v);
                o.onSelect(v);
                setTimeout(function(){ that.focus(); }, 10);
            });

            that.blur(function(e){
                that.last_val = that.val();
                that.sb.hide();
            });

            function suggest(data){
                var val = that.val();
                that.cache[val] = data;
                if (data.length && val.length >= o.minChars) {
                    var s = '', re = new RegExp("(" + val.split(' ').join('|') + ")", "gi");
                    for (i=0;i<data.length;i++)
                        s += '<div class="autocomplete-suggestion" data-val="'+data[i]+'">'+data[i].replace(re, "<b>$1</b>")+'</div>';
                    that.sb.html(s).show();
                }
                else
                    that.sb.hide();
            }

            that.on('keydown.autocomplete', function(e){
                // down
                if (e.which == 40) {
                    var next, sel = $('.autocomplete-suggestion.selected', that.sb);
                    if (!sel.length) {
                        next = $('.autocomplete-suggestion', that.sb).first();
                        that.val(next.addClass('selected').data('val'));
                    } else {
                        next = sel.next('.autocomplete-suggestion');
                        if (next.length) {
                            sel.removeClass('selected');
                            that.val(next.addClass('selected').data('val'));
                        }
                        else { sel.removeClass('selected'); that.val(that.last_val); next = 0; }
                    }
                    that.fixScroll(next);
                    return false;
                }
                // up
                else if (e.which == 38) {
                    var next, sel = $('.autocomplete-suggestion.selected', that.sb);
                    if (!sel.length) {
                        next = $('.autocomplete-suggestion', that.sb).last();
                        that.val(next.addClass('selected').data('val'));
                    } else {
                        var next = sel.prev('.autocomplete-suggestion');
                        if (next.length) {
                            sel.removeClass('selected');
                            that.val(next.addClass('selected').data('val'));
                        }
                        else { sel.removeClass('selected'); that.val(that.last_val); next = 0; }
                    }
                    that.fixScroll(next);
                    return false;
                }
                // up
                else if (e.which == 27) that.val(that.last_val).sb.hide();
            });

            that.on('keyup.autocomplete', function(e){
                if (!~$.inArray(e.which, [27, 38, 40, 37, 39])) {
                    var val = that.val();
                    if (val.length >= o.minChars) {
                        if (val != that.last_val) {
                            that.last_val = val;
                            clearTimeout(that.timer);
                            if (o.cache) {
                                if (val in that.cache) { suggest(that.cache[val]); return; }
                                // no requests if previous suggestions were empty
                                for (i=1; i<val.length-o.minChars; i++) {
                                    var part = val.slice(0, val.length-i);
                                    if (part in that.cache && !that.cache[part].length) { suggest([]); return; }
                                }
                            }
                            that.timer = setTimeout(function(){ o.source(val, suggest) }, o.delay);
                        }
                    } else {
                        that.last_val = val;
                        that.sb.hide();
                    }
                }
            });
        });
    }
}(jQuery));
