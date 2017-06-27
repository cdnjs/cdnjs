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
 * jQuery mmenu counters addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function(t){function e(e){return"boolean"==typeof e&&(e={add:e,update:e}),"object"!=typeof e&&(e={}),e=t.extend(!0,{},t[u].defaults[c],e)}function n(t){return t}function a(){i=!0,o=t[u]._c,s=t[u]._d,d=t[u]._e,o.add("counter search noresultsmsg"),s.add("updatecounter"),r=t[u].glbl}var o,s,d,r,u="mmenu",c="counters",i=!1;t[u].prototype["_init_"+c]=function(d){i||a();var r=this.vars[c+"_added"];this.vars[c+"_added"]=!0,r||(this.opts[c]=e(this.opts[c]),this.conf[c]=n(this.conf[c]));var u=this,h=this.opts[c];this.conf[c],this.__refactorClass(t("em",d),this.conf.classNames[c].counter,"counter"),h.add&&d.each(function(){var e=t(this).data(s.parent);e&&(e.find("> em."+o.counter).length||e.prepend(t('<em class="'+o.counter+'" />')))}),h.update&&d.each(function(){var e=t(this),n=e.data(s.parent);if(n){var a=n.find("> em."+o.counter);a.length&&(e.is("."+o.list)||(e=e.find("> ."+o.list)),e.length&&!e.data(s.updatecounter)&&(e.data(s.updatecounter,!0),u._update(function(){var t=e.children().not("."+o.label).not("."+o.subtitle).not("."+o.hidden).not("."+o.search).not("."+o.noresultsmsg);a.html(t.length)})))}})},t[u].addons.push(c),t[u].defaults[c]={add:!1,update:!1},t[u].configuration.classNames[c]={counter:"Counter"}}(jQuery);
}));