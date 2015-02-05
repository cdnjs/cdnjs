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
 * jQuery mmenu labels addon
 * mmenu.frebsite.nl
 *	
 * Copyright (c) Fred Heusschen
 * www.frebsite.nl
 */
!function(l){function s(s){return"boolean"==typeof s&&(s={collapse:s}),"object"!=typeof s&&(s={}),s=l.extend(!0,{},l[p].defaults[d],s)}function e(l){return l}function a(){i=!0,o=l[p]._c,n=l[p]._d,t=l[p]._e,o.add("collapsed"),c=l[p].glbl}var o,n,t,c,p="mmenu",d="labels",i=!1;l[p].prototype["_addon_"+d]=function(){i||a(),this.opts[d]=s(this.opts[d]),this.conf[d]=e(this.conf[d]);var n=this.opts[d];this.conf[d],n.collapse&&(this.__refactorClass(l("li",this.$menu),this.conf.classNames[d].collapsed,"collapsed"),l("."+o.label,this.$menu).each(function(){var s=l(this),e=s.nextUntil("."+o.label,"all"==n.collapse?null:"."+o.collapsed);"all"==n.collapse&&(s.addClass(o.opened),e.removeClass(o.collapsed)),e.length&&(s.wrapInner("<span />"),l('<a href="#" class="'+o.subopen+" "+o.fullsubopen+'" />').prependTo(s).on(t.click,function(l){l.preventDefault(),s.toggleClass(o.opened),e[s.hasClass(o.opened)?"removeClass":"addClass"](o.collapsed)}))}))},l[p].addons=l[p].addons||[],l[p].addons.push(d),l[p].defaults[d]={collapse:!1},l[p].configuration.classNames[d]={collapsed:"Collapsed"}}(jQuery);
}));