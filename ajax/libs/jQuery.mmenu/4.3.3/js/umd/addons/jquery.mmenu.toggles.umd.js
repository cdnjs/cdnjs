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
 * www.frebsite.nl
 */
!function(t){function n(t){return t}function s(t){return t}function e(){g=!0,o=t[r]._c,i=t[r]._d,a=t[r]._e,o.add("toggle"),l=t[r].glbl}var o,i,a,l,r="mmenu",d="toggles",g=!1;t[r].prototype["_addon_"+d]=function(){g||e(),this.opts[d]=n(this.opts[d]),this.conf[d]=s(this.conf[d]);var i=this;this.opts[d],this.conf[d],this.__refactorClass(t("input",this.$menu),this.conf.classNames[d].toggle,"toggle"),t("."+o.toggle,this.$menu).each(function(){var n=t(this),s=n.parent(),e=n.attr("id")||i.__getUniqueId();n.attr("id",e),s.prepend(n),t('<label for="'+e+'" class="'+o.toggle+'"><div></div></label>').insertBefore(s.children().last())})},t[r].addons=t[r].addons||[],t[r].addons.push(d),t[r].defaults[d]={},t[r].configuration.classNames[d]={toggle:"Toggle"}}(jQuery);
}));