(function ( factory ) {
    if ( typeof define === 'function' && define.amd )
    {
        // AMD. Register as an anonymous module.
        define( [ 'jquery' ], factory );
    }
    else if ( typeof exports === 'object' )
    {
        // Node/CommonJS
        factory( require( 'jquery' ) );
    }
    else
    {
        // Browser globals
        factory( jQuery );
    }
}( function ( jQuery ) {


/*	
 * jQuery mmenu header addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function(e){function t(t){return"boolean"==typeof t&&(t={add:t,update:t}),"object"!=typeof t&&(t={}),t=e.extend(!0,{},e[r].defaults[s],t)}function a(e){return e}function n(){l=!0,o=e[r]._c,d=e[r]._d,h=e[r]._e,o.add("header hasheader prev next title arrow"),i=e[r].glbl}var r="mmenu",s="header";e[r].prototype["_init_"+s]=function(r){l||n();var d=this.vars[s+"_added"];this.vars[s+"_added"]=!0,d||(this.opts[s]=t(this.opts[s]),this.conf[s]=a(this.conf[s]));var c=this,f=this.opts[s];if(this.conf[s],!d&&f.add){var p=f.content?f.content:'<a class="'+o.prev+'" href="#"></a><span class="'+o.title+'"></span><a class="'+o.next+'" href="#"></a>';e('<div class="'+o.header+'" />').prependTo(this.$menu).append(p)}var u=e("div."+o.header,this.$menu);if(u.length&&(this.$menu.addClass(o.hasheader),f.update)){var v=u.find("."+o.title),m=u.find("."+o.prev),g=u.find("."+o.next),x=!1;i.$page&&(x="#"+i.$page.attr("id")),d||m.add(g).off(h.click).on(h.click,function(t){t.preventDefault(),t.stopPropagation();var a=e(this).attr("href");"#"!==a&&(x&&a==x?c.$menu.trigger(h.close):e(a,c.$menu).trigger(h.open))}),r.each(function(){var t=e(this),a=e("."+c.conf.classNames[s].panelHeader,t),n=e("."+c.conf.classNames[s].panelPrev,t),r=e("."+c.conf.classNames[s].panelNext,t),d=a.html(),i=n.attr("href"),l=r.attr("href");d||(d=e("."+o.subclose,t).html()),d||(d=f.title),i||(i=e("."+o.subclose,t).attr("href"));var p=n.html(),u=r.html(),x=function(){v[d?"show":"hide"](),v.html(d),m[i?"attr":"removeAttr"]("href",i),m[i||p?"show":"hide"](),m.html(p),g[l?"attr":"removeAttr"]("href",l),g[l||u?"show":"hide"](),g.html(u)};t.on(h.open,x),t.hasClass(o.current)&&x()})}},e[r].addons.push(s),e[r].defaults[s]={add:!1,content:!1,update:!1,title:"Menu"},e[r].configuration.classNames[s]={panelHeader:"Header",panelNext:"Next",panelPrev:"Prev"};var o,d,h,i,l=!1}(jQuery);
}));