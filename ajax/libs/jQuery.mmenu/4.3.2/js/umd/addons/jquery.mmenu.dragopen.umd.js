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
 * jQuery mmenu dragOpen addon
 * mmenu.frebsite.nl
 *	
 * Copyright (c) Fred Heusschen
 * www.frebsite.nl
 */
!function(e){function t(t){return"boolean"==typeof t&&(t={open:t}),"object"!=typeof t&&(t={}),t=e.extend(!0,{},e[p].defaults[g],t)}function a(e){return e}function o(){f=!0,s=e[p]._c,i=e[p]._d,r=e[p]._e,s.add("dragging"),r.add("dragleft dragright dragup dragdown dragend"),d=e[p].glbl}function n(e,t,a){return t>e&&(e=t),e>a&&(e=a),e}var s,i,r,d,p="mmenu",g="dragOpen",f=!1;e[p].prototype["_addon_"+g]=function(){if(e.fn.hammer){f||o(),this.opts[g]=t(this.opts[g]),this.conf[g]=a(this.conf[g]);var i=this,p=this.opts[g],h=this.conf[g];if(p.open){var c=0,l=!1,u=0,v=0,m="width";switch(this.opts.offCanvas.position){case"left":case"right":m="width";break;default:m="height"}switch(this.opts.offCanvas.position){case"left":var _={events:r.dragleft+" "+r.dragright,open_dir:"right",close_dir:"left",delta:"deltaX",page:"pageX",negative:!1};break;case"right":var _={events:r.dragleft+" "+r.dragright,open_dir:"left",close_dir:"right",delta:"deltaX",page:"pageX",negative:!0};break;case"top":var _={events:r.dragup+" "+r.dragdown,open_dir:"down",close_dir:"up",delta:"deltaY",page:"pageY",negative:!1};break;case"bottom":var _={events:r.dragup+" "+r.dragdown,open_dir:"up",close_dir:"down",delta:"deltaY",page:"pageY",negative:!0}}var w=this.__valueOrFn(p.pageNode,this.$menu,d.$page);"string"==typeof w&&(w=e(w));var b=d.$page.find("."+s.mm("fixed-top")+", ."+s.mm("fixed-bottom")),$=d.$page;switch(this.opts.offCanvas.zposition){case"back":$=$.add(b);break;case"front":$=this.$menu;break;case"next":$=$.add(this.$menu).add(b)}w.hammer().on(r.touchstart+" "+r.mousedown,function(e){if("touchstart"==e.type)var t=e.originalEvent.touches[0]||e.originalEvent.changedTouches[0],a=t[_.page];else if("mousedown"==e.type)var a=e[_.page];switch(i.opts.offCanvas.position){case"right":case"bottom":a>=d.$wndw[m]()-p.maxStartPos&&(c=1);break;default:a<=p.maxStartPos&&(c=1)}}).on(_.events+" "+r.dragend,function(e){c>0&&(e.gesture.preventDefault(),e.stopPropagation())}).on(_.events,function(e){var t=_.negative?-e.gesture[_.delta]:e.gesture[_.delta];if(l=t>u?_.open_dir:_.close_dir,u=t,u>p.threshold&&1==c){if(d.$html.hasClass(s.opened))return;c=2,i._openSetup(),i.vars.opened=!0,d.$html.addClass(s.dragging),v=n(d.$wndw[m]()*h[m].perc,h[m].min,h[m].max)}2==c&&$.css(i.opts.offCanvas.position,n(u,10,v)-("front"==i.opts.offCanvas.zposition?v:0))}).on(r.dragend,function(){2==c&&(d.$html.removeClass(s.dragging),$.css(i.opts.offCanvas.position,""),l==_.open_dir?i._openFinish():i.close()),c=0})}}},e[p].addons=e[p].addons||[],e[p].addons.push(g),e[p].defaults[g]={open:!1,maxStartPos:100,threshold:50},e[p].configuration[g]={width:{perc:.8,min:140,max:440},height:{perc:.8,min:140,max:880}}}(jQuery);
}));