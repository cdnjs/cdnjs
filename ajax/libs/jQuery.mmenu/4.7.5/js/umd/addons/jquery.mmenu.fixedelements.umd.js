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
 * jQuery mmenu fixedElements addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function(o){var t="mmenu",d="fixedElements";o[t].addons[d]={_init:function(){if(this.opts.offCanvas){var o=this.conf.classNames[d].fixedTop,t=this.conf.classNames[d].fixedBottom,e=this.__refactorClass(a.$page.find("."+o),o,"fixed-top"),s=this.__refactorClass(a.$page.find("."+t),t,"fixed-bottom");e.add(s).appendTo(a.$body).addClass(i.slideout)}},_setup:function(){},_add:function(){i=o[t]._c,e=o[t]._d,s=o[t]._e,i.add("fixed-top fixed-bottom"),a=o[t].glbl}},o[t].defaults[d]={},o[t].configuration.classNames[d]={fixedTop:"FixedTop",fixedBottom:"FixedBottom"};var i,e,s,a}(jQuery);
}));