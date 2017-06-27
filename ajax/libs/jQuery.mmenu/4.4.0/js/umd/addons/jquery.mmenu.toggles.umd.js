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
!function(t){function e(t){return t}function s(t){return t}function i(){d=!0,n=t[r]._c,o=t[r]._d,l=t[r]._e,n.add("toggle"),a=t[r].glbl}var n,o,l,a,r="mmenu",c="toggles",d=!1;t[r].prototype["_init_"+c]=function(o){d||i();var l=this.vars[c+"_added"];this.vars[c+"_added"]=!0,l||(this.opts[c]=e(this.opts[c]),this.conf[c]=s(this.conf[c]));var a=this;this.opts[c],this.conf[c],this.__refactorClass(t("input",o),this.conf.classNames[c].toggle,"toggle"),t("input."+n.toggle,o).each(function(){var e=t(this),s=e.closest("li"),i=e.attr("id")||a.__getUniqueId();s.children('label[for="'+i+'"]').length||(e.attr("id",i),s.prepend(e),t('<label for="'+i+'" class="'+n.toggle+'"><div></div></label>').insertBefore(s.children().last()))})},t[r].addons.push(c),t[r].defaults[c]={},t[r].configuration.classNames[c]={toggle:"Toggle"}}(jQuery);
}));