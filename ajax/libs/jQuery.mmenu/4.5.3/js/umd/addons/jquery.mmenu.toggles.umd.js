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
!function(t){function e(t){return t}function s(t){return t}function c(){r=!0,n=t[i]._c,o=t[i]._d,l=t[i]._e,n.add("toggle check"),h=t[i].glbl}var i="mmenu",a="toggles";t[i].prototype["_init_"+a]=function(i){r||c();var o=this.vars[a+"_added"];this.vars[a+"_added"]=!0,o||(this.opts[a]=e(this.opts[a]),this.conf[a]=s(this.conf[a]));var l=this;this.opts[a],this.conf[a],this.__refactorClass(t("input",i),this.conf.classNames[a].toggle,"toggle"),this.__refactorClass(t("input",i),this.conf.classNames[a].check,"check"),t("input."+n.toggle,i).add("input."+n.check,i).each(function(){var e=t(this),s=e.closest("li"),c=e.hasClass(n.toggle)?"toggle":"check",i=e.attr("id")||l.__getUniqueId();s.children('label[for="'+i+'"]').length||(e.attr("id",i),s.prepend(e),t('<label for="'+i+'" class="'+n[c]+'"></label>').insertBefore(s.children().last()))})},t[i].addons.push(a),t[i].defaults[a]={},t[i].configuration.classNames[a]={toggle:"Toggle",check:"Check"};var n,o,l,h,r=!1}(jQuery);
}));