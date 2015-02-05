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
 */
!function(e){function t(e,t,n){return t>e&&(e=t),e>n&&(e=n),e}function n(t){return"boolean"==typeof t&&(t={open:t}),"object"!=typeof t&&(t={}),t=e.extend(!0,{},e[a].defaults[i],t)}function o(e){return e}function s(){c=!0,r=e[a]._c,p=e[a]._d,f=e[a]._e,r.add("dragging"),d=e[a].glbl}var a="mmenu",i="dragOpen";e[a].prototype["_init_"+i]=function(){if("function"==typeof Hammer&&this.opts.offCanvas&&!this.vars[i+"_added"]){this.vars[i+"_added"]=!0,c||s(),this.opts[i]=n(this.opts[i]),this.conf[i]=o(this.conf[i]);var a=this,p=this.opts[i],h=this.conf[i];if(p.open){if(Hammer.VERSION<2)return;var m,u,g,l,v={},_=0,w=!1,b=!1,y=0,$=0;switch(this.opts.offCanvas.position){case"left":case"right":v.events="panleft panright",v.typeLower="x",v.typeUpper="X",b="width";break;case"top":case"bottom":v.events="panup pandown",v.typeLower="y",v.typeUpper="Y",b="height"}switch(this.opts.offCanvas.position){case"left":case"top":v.negative=!1;break;case"right":case"bottom":v.negative=!0}switch(this.opts.offCanvas.position){case"left":v.open_dir="right",v.close_dir="left";break;case"right":v.open_dir="left",v.close_dir="right";break;case"top":v.open_dir="down",v.close_dir="up";break;case"bottom":v.open_dir="up",v.close_dir="down"}var x=this.__valueOrFn(p.pageNode,this.$menu,d.$page);"string"==typeof x&&(x=e(x));var C=d.$page;switch(this.opts.offCanvas.zposition){case"front":C=this.$menu;break;case"next":C=C.add(this.$menu)}var k=new Hammer(x[0],p.vendors.hammer);k.on("panstart",function(e){switch(l=e.center[v.typeLower],a.opts.offCanvas.position){case"right":case"bottom":l>=d.$wndw[b]()-p.maxStartPos&&(_=1);break;default:l<=p.maxStartPos&&(_=1)}w=v.open_dir}).on(v.events+" panend",function(e){_>0&&e.preventDefault()}).on(v.events,function(e){if(m=e["delta"+v.typeUpper],v.negative&&(m=-m),m!=y&&(w=m>=y?v.open_dir:v.close_dir),y=m,y>p.threshold&&1==_){if(d.$html.hasClass(r.opened))return;_=2,a._openSetup(),a.$menu.trigger(f.opening),d.$html.addClass(r.dragging),$=t(d.$wndw[b]()*h[b].perc,h[b].min,h[b].max)}2==_&&(u=t(y,10,$)-("front"==a.opts.offCanvas.zposition?$:0),v.negative&&(u=-u),g="translate"+v.typeUpper+"("+u+"px )",C.css({"-webkit-transform":"-webkit-"+g,transform:g}))}).on("panend",function(){2==_&&(d.$html.removeClass(r.dragging),C.css("transform",""),a[w==v.open_dir?"_openFinish":"close"]()),_=0})}}},e[a].addons.push(i),e[a].defaults[i]={open:!1,maxStartPos:100,threshold:50,vendors:{hammer:{}}},e[a].configuration[i]={width:{perc:.8,min:140,max:440},height:{perc:.8,min:140,max:880}};var r,p,f,d,c=!1}(jQuery);
}));