/**
 * @preserve 
 * bootpag - jQuery plugin for dynamic pagination
 *
 * Copyright (c) 2013 botmonster@7items.com
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://botmonster.com/jquery-bootpag/
 *
 * Version:  1.0.5
 *
 */
(function($, window) {

    $.fn.bootpag = function(options){

        var $owner = this, 
            settings = $.extend({
                total: 0,
                page: 1,
                maxVisible: null,
                leaps: true,
                href: 'javascript:void(0);',
                hrefVariable: '{{number}}',
                next: '&raquo;',
                prev: '&laquo;'
            }, 
            $owner.data('settings') || {}, 
            options || {});

        if(settings.total <= 0)
            return this;

          if(!$.isNumeric(settings.maxVisible) && !settings.maxVisible){
            settings.maxVisible = settings.total;
        }

        $owner.data('settings', settings);

        function renderPage($bootpag, page){
        
            var lp, 
                maxV = settings.maxVisible == 0 ? 1 : settings.maxVisible,
                step = settings.maxVisible == 1 ? 0 : 1,
                vis = Math.floor((page - 1) / maxV) * maxV,
                $page = $bootpag.find('li');
            settings.page = page = page < 0 ? 0 : page > settings.total ? settings.total : page;
            $page.removeClass('disabled');
            lp = page - 1 < 1 ? 1 : 
                    settings.leaps && page - 1 >= settings.maxVisible ? 
                        Math.floor((page - 1) / maxV) * maxV : page - 1;
            $page
                .first()
                .toggleClass('disabled', page === 1)
                .attr('data-lp', lp)
                .find('a').attr('href', href(lp));
            
            var step = settings.maxVisible == 1 ? 0 : 1;
            
            lp = page + 1 > settings.total ? settings.total : 
                    settings.leaps && page + 1 < settings.total - settings.maxVisible ? 
                        vis + settings.maxVisible + step: page + 1;
       
            $page
                .last()
                .toggleClass('disabled', page === settings.total)
                .attr('data-lp', lp)
                .find('a').attr('href', href(lp));;

            var $currPage = $page.filter('[data-lp='+page+']');
            if(!$currPage.not('.next,.prev').length){
                var d = page <= vis ? -settings.maxVisible : 0;
                $page.not('.next,.prev').each(function(index){
                    lp = index + 1 + vis + d;
                    $(this)
                        .attr('data-lp', lp)
                        .toggle(lp <= settings.total)
                        .find('a').html(lp).attr('href', href(lp));
                });
                $currPage = $page.filter('[data-lp='+page+']');
            }
            $currPage.addClass('disabled');
            $owner.data('settings', settings);
        }

        function href(c){

            return settings.href.replace(settings.hrefVariable, c);
        }

        return this.each(function(){
            
            var $bootpag, lp, me = $(this),
                p = ['<ul class="pagination bootpag">'];

            if(settings.prev){
                p.push('<li data-lp="1" class="prev"><a href="'+href(1)+'">'+settings.prev+'</a></li>');
            }
            for(var c = 1; c <= Math.min(settings.total, settings.maxVisible); c++){
                p.push('<li data-lp="'+c+'"><a href="'+href(c)+'">'+c+'</a></li>');
            }
            if(settings.next){
                lp = settings.leaps && settings.total > settings.maxVisible
                    ? Math.min(settings.maxVisible + 1, settings.total) : 2;
                p.push('<li data-lp="'+lp+'" class="next"><a href="'+href(lp)+'">'+settings.next+'</a></li>');
            }
            p.push('</ul>');
            me.find('ul.bootpag').remove();
            me.append(p.join(''));
            $bootpag = me.find('ul.bootpag');
            me.find('li').click(function paginationClick(){
            
                var me = $(this);
                if(me.hasClass('disabled')){
                    return;
                }
                var page = parseInt(me.attr('data-lp'), 10);
                renderPage($bootpag, page);
                $owner.trigger('page', page);
            });
            renderPage($bootpag, settings.page);
        });
    }

})(jQuery, window);
