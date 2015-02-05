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
 * jQuery mmenu toggles addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function(t){function e(t){return t}function s(t){return t}function i(){d=!0,a=t[n]._c,l=t[n]._d,r=t[n]._e,a.add("toggle"),c=t[n].glbl}var n="mmenu",o="toggles";t[n].prototype["_init_"+o]=function(n){d||i();var l=this.vars[o+"_added"];this.vars[o+"_added"]=!0,l||(this.opts[o]=e(this.opts[o]),this.conf[o]=s(this.conf[o]));var r=this;this.opts[o],this.conf[o],this.__refactorClass(t("input",n),this.conf.classNames[o].toggle,"toggle"),t("input."+a.toggle,n).each(function(){var e=t(this),s=e.closest("li"),i=e.attr("id")||r.__getUniqueId();s.children('label[for="'+i+'"]').length||(e.attr("id",i),s.prepend(e),t('<label for="'+i+'" class="'+a.toggle+'"><div></div></label>').insertBefore(s.children().last()))})},t[n].addons.push(o),t[n].defaults[o]={},t[n].configuration.classNames[o]={toggle:"Toggle"};var a,l,r,c,d=!1}(jQuery);
}));