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
!function(e){function t(t){return"boolean"==typeof t&&(t={add:t,update:t}),"object"!=typeof t&&(t={}),t.add instanceof Array||(t.add=["prev","title","next"]),t=e.extend(!0,{},e[s].defaults[r],t)}function a(e){return e}function n(){l=!0,d=e[s]._c,i=e[s]._d,o=e[s]._e,d.add("header hasheader prev next close title"),h=e[s].glbl}var s="mmenu",r="header";e[s].prototype["_init_"+r]=function(s){l||n();var i=this.vars[r+"_added"];this.vars[r+"_added"]=!0,i||(this.opts[r]=t(this.opts[r]),this.conf[r]=a(this.conf[r]));var c=this,f=this.opts[r];if(this.conf[r],!i&&f.add){if(f.content)var p=f.content;else for(var p="",u=0,v=f.add.length;v>u;u++)switch(f.add[u]){case"prev":case"next":case"close":p+='<a class="'+d[f.add[u]]+'" href="#"></a>';break;case"title":p+='<span class="'+d.title+'"></span>';break;default:p+=f.add[u]}e('<div class="'+d.header+'" />').prependTo(this.$menu).append(p)}var m=e("div."+d.header,this.$menu);if(m.length){if(this.$menu.addClass(d.hasheader),f.update){var b=m.find("."+d.title),g=m.find("."+d.prev),_=m.find("."+d.next),x=m.find("."+d.close),N=!1;h.$page&&(N="#"+h.$page.attr("id"),x.attr("href",N)),i||g.add(_).add(x).off(o.click).on(o.click,function(t){t.preventDefault(),t.stopPropagation();var a=e(this).attr("href");"#"!==a&&(N&&a==N?c.$menu.trigger(o.close):e(a,c.$menu).trigger(o.open))}),s.each(function(){var t=e(this),a=e("."+c.conf.classNames[r].panelHeader,t),n=e("."+c.conf.classNames[r].panelPrev,t),s=e("."+c.conf.classNames[r].panelNext,t),i=a.html(),h=n.attr("href"),l=s.attr("href");i||(i=e("."+d.subclose,t).html()),i||(i=f.title),h||(h=e("."+d.subclose,t).attr("href"));var p=n.html(),u=s.html(),v=function(){b[i?"show":"hide"](),b.html(i),g[h?"attr":"removeAttr"]("href",h),g[h||p?"show":"hide"](),g.html(p),_[l?"attr":"removeAttr"]("href",l),_[l||u?"show":"hide"](),_.html(u)};t.on(o.open,v),t.hasClass(d.current)&&v()})}"function"==typeof this._init_buttonbars&&this._init_buttonbars(m)}},e[s].addons.push(r),e[s].defaults[r]={add:!1,content:!1,title:"Menu",update:!1},e[s].configuration.classNames[r]={panelHeader:"Header",panelNext:"Next",panelPrev:"Prev"};var d,i,o,h,l=!1}(jQuery);
}));