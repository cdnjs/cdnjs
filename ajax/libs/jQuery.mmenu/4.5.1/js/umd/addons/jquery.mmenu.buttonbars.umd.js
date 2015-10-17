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
 * jQuery mmenu buttonbars addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function(t){function n(t){return t}function a(t){return t}function i(){d=!0,o=t[r]._c,e=t[r]._d,u=t[r]._e,o.add("buttonbar"),c=t[r].glbl}var r="mmenu",s="buttonbars";t[r].prototype["_init_"+s]=function(r){d||i();var e=this.vars[s+"_added"];this.vars[s+"_added"]=!0,e||(this.opts[s]=n(this.opts[s]),this.conf[s]=a(this.conf[s])),this.opts[s],this.conf[s],this.__refactorClass(t("div",r),this.conf.classNames[s].buttonbar,"buttonbar"),t("div."+o.buttonbar,r).each(function(){var n=t(this),a=n.children().not("input"),i=n.children().filter("input");n.addClass(o.buttonbar+"-"+a.length),i.each(function(){var n=t(this),i=a.filter('label[for="'+n.attr("id")+'"]');i.length&&n.insertBefore(i)})})},t[r].addons.push(s),t[r].defaults[s]={},t[r].configuration.classNames[s]={buttonbar:"Buttonbar"};var o,e,u,c,d=!1}(jQuery);
}));