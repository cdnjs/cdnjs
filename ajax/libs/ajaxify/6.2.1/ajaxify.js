/* 
 * ajaxify.js 
 * Ajaxify your site out of the box, instantly.
 * http://4nf.org/ 
 * 
 * Copyright Arvind Gupta; MIT Licensed 
 */ 
 
/* INTERFACE: See also http://4nf.org/interface/

Simplest plugin call:

jQuery('#content').ajaxify();
Ajaxifies the whole site, dynamically replacing the div with the ID '#content' across pages

If several divs should be swapped, just specify their IDs like this:
jQuery('#content, #nav').ajaxify();

The plugin can take an arbitrary amount of IDs, however the first one should specify the main content div


Options default values
{
// basic config parameters
    selector : "a:not(.no-ajaxy)",  //Selector for elements to ajaxify - without being swapped - e.g. a selection of links
    forms : "form:not(.no-ajaxy)", // jQuery selection for ajaxifying forms - set to "false" to disable
    canonical : true, // Fetch current URL from "canonical" link if given, updating the History API.  In case of a re-direct...
 
// visual effects settings
    requestDelay : 0, //in msec - Delay of Pronto request
    aniTime : 0, //in msec - must be set for animations to work
    aniParams : false, //Animation parameters - see below.  Default = off
    previewoff : true, // Plugin previews prefetched pages - set to "false" to enable or provide a jQuery selection to selectively disable
    scrolltop : false, // Always scroll to top of page
    idleTime: 0, //in msec - master switch for slideshow / carousel - default "off"
    slideTime: 0, //in msec - time between slides
    toggleSlide: false //For toggling sliding - see below.  Default = off
    menu: false, //Selector for links in the menu
    addclass: "jqhover", //Class that gets added dynamically to the highlighted element in the slideshow
 
// script and style handling settings, prefetch
    deltas : true, // true = deltas loaded, false = all scripts loaded
    inline : true, // true = all inline scripts loaded, false = only specific inline scripts are loaded
    inlinehints : false, // strings - separated by ", " - if matched in any inline scripts - only these are executed - set "inline" to false beforehand
    inlineskip : "adsbygoogle", // strings - separated by ", " - if matched in any inline scripts - these are NOT are executed - set "inline" to true beforehand 
    inlineappend : true, // append scripts to the main content div, instead of "eval"-ing them
    style : true, // true = all style tags in the head loaded, false = style tags on target page ignored
    prefetch : true, // Plugin pre-fetches pages on hoverIntent or touchstart
 
// debugging & advanced settings
    verbosity : 0,  //Debugging level to console: default off.  Can be set to 10 and higher (in case of logging enabled) 
    memoryoff : false, // strings - separated by ", " - if matched in any URLs - only these are NOT executed - set to "true" to disable memory completely
    cb : null, // callback handler on completion of each Ajax request - default null
    pluginon : true // Plugin set "on" or "off" (==false) manually
}

Animation parameters (aniParams):  Default is false (set off) - specify aniTime and override the following aniParams:
{
    opacity: 1, //no fade, set to 0 for maximum fade
    width: "100%", //in percent -  "100%" means no change
    height: "100%" //in percent -  "100%" means no change
}

More animation parameters:
You can specify any parameters that are understood by .animate() !

Toggling sliding parameters (toggleSlide): Default is false (set off) 
You can override the following toggleSlide parameters:
{ //defaults - if not turned off completely
    parentEl: '#content', //parent element, where the above image(s) will be prepended 
    imgOn: 'http://4nf.org/images/pinOn.gif', //graphic for indicating sliding is on
    imgOff: 'http://4nf.org/images/pinOff.gif', //graphic for indicating sliding is off
    titleOn: 'Turn slideshow off', //title tag when on
    titleOff: 'Turn slideshow on', //title tag when off
    imgProps: { marginLeft: '85%', marginTop: '20px' }
}

*/

 //Intuitively better understandable shorthand for String.indexOf() - String.iO()
String.prototype.iO = function(s) { return this.toString().indexOf(s) + 1; };

//Minified hoverIntent plugin
(function(a){a.fn.hoverIntent=function(w,e,b){var j={interval:100,sensitivity:7,timeout:0};if(typeof w==="object"){j=a.extend(j,w);}else{if(a.isFunction(e)){j=a.extend(j,{over:w,out:e,selector:b});}else{j=a.extend(j,{over:w,out:w,selector:e});}}var x,d,v,q;var m=function(c){x=c.pageX;d=c.pageY;};var g=function(c,f){f.hoverIntent_t=clearTimeout(f.hoverIntent_t);if(Math.abs(v-x)+Math.abs(q-d)<j.sensitivity){a(f).off("mousemove.hoverIntent",m);f.hoverIntent_s=1;return j.over.apply(f,[c]);}else{v=x;q=d;f.hoverIntent_t=setTimeout(function(){g(c,f);},j.interval);}};var p=function(f,c){c.hoverIntent_t=clearTimeout(c.hoverIntent_t);c.hoverIntent_s=0;return j.out.apply(c,[f]);};var k=function(c){var h=jQuery.extend({},c);var f=this;if(f.hoverIntent_t){f.hoverIntent_t=clearTimeout(f.hoverIntent_t);}if(c.type=="mouseenter"){v=h.pageX;q=h.pageY;a(f).on("mousemove.hoverIntent",m);if(f.hoverIntent_s!=1){f.hoverIntent_t=setTimeout(function(){g(h,f);},j.interval);}}else{a(f).off("mousemove.hoverIntent",m);if(f.hoverIntent_s==1){f.hoverIntent_t=setTimeout(function(){p(h,f);},j.timeout);}}};return this.on({"mouseenter.hoverIntent":k,"mouseleave.hoverIntent":k},j.selector);};})(jQuery);

//Minified idle plugin
!function(n){"use strict";n.fn.idle=function(e){var t,o,i={idle:6e4,events:"mousemove keydown mousedown touchstart",onIdle:function(){},onActive:function(){}},u=!1,c=n.extend({},i,e),l=null;return n(this).on("idle:kick",{},function(n){l=o(c)}),t=function(n,e){return u&&(e.onActive.call(),u=!1),clearTimeout(n),o(e)},o=function(n){var e,t=setTimeout;return e=t(function(){u=!0,n.onIdle.call()},n.idle)},this.each(function(){l=o(c),n(this).on(c.events,function(n){l=t(l,c)})})}}(jQuery);

//Module global variables
var lvl = 0, pass = 0, currentURL = '', rootUrl = getRootUrl(), api = window.history && window.history.pushState && window.history.replaceState,

//Regexes for escaping fetched HTML of a whole page - best of Baluptons Ajaxify
//Makes it possible to pre-fetch an entire page
docType = /<\!DOCTYPE[^>]*>/i,
tagso = /<(html|head|body|meta|script|link)([\s\>])/gi,
tagsc = /<\/(html|head|body|meta|script|link)\>/gi,

//Helper strings
div12 = '<div class="ajy-$1"$2',
linki = '<link rel="stylesheet" type="text/css" href="*" />',
scri = '<script type="text/javascript" src="*" />',
linkr = 'link[href*="!"]', 
scrr = 'script[src*="!"]';

//Minified pO() function
function getParamNames(){return funStr.slice(funStr.indexOf("(")+1,funStr.indexOf(")"))}function JSON2Str(n,r){var t="var ",e=0;for(var o in n)if(n.hasOwnProperty(o)){var i=n[o];t+=e?",\n":"",t+="function"==typeof i?"_"+o+" = "+iLog(i.toString(),o):o+" = "+(r?'settings["':"")+(r?o+'"]':JSON.stringify(i)),e++}return t+";"}function pO(n,r,t,e,o,i){var s="",a="",f="",l="",u="",g="",p=!1,c=!1,v=mbp;if(!n||!e)return void alert("Error in pO(): Missing parameter");if(funStr=e.toString(),funStr=iLog(funStr,n),s=n.substr(0,1).toUpperCase()+n.substr(1,n.length-1),u=getParamNames(e),p=u.iO("$this"),c=u.iO("options"),g=u.replace("$this, ",""),g="$this"==u?"":g,t&&!c&&(g+=""===g?"options":", options"),r&&(a=JSON2Str(r)),t&&(f="var settings = $.extend("+JSON.stringify(t)+", options);\n",f+=JSON2Str(t,1)),o&&(l=JSON2Str(o)),t||(v=v.replace(/\(options/g,"(")),p||(v=v.replace("var $this = $(this);","")),v=v.replace(/fnn/g,p?"fn."+n:n).replace(/Name/g,s).replace("funStr",funStr).replace("pVars",a).replace("pSettings",f).replace("pFns",l).replace("args",u).replace("arg0",g),codedump&&console.log(v),!i)try{jQuery.globalEval(v)}catch(S){alert("Error : "+S+" | "+v)}}function showArgs(n){s="";for(var r=0;r<n.length;r++)null==n[r]?s+="null | ":s+=(void 0!=n[r]&&"function"!=typeof n[r]&&"object"!=typeof n[r]&&("string"!=typeof n[r]||n[r].length<=100)?n[r]:"string"==typeof n[r]?n[r].substr(0,100):typeof n[r])+" | ";return s}function iLog(n,r){var t=n.indexOf("{");return logging&&"log"!==r?(n=n.substr(0,t)+'{ $.log(lvl++ + " | '+r+" | "+n.substr(n.indexOf("("),n.indexOf(")")-n.indexOf("(")+1)+' | " + showArgs(arguments));\n'+n.substr(t+1,n.length-t-2)+"\n lvl--;}",n.replace(/return /g,"return --lvl, ").replace(/return;/g,"return --lvl, undefined;")):n}var funStr,logging=!1,codedump=!1,mbp="(function ($) { var Name = function(options){ \npVars \npSettings \n this.a = funStr; \npFns }; \n$.fnn = function(arg0) {var $this = $(this); \nif(!$.fnn.o) $.fnn.o = new Name(options); \nreturn $.fnn.o.a(args);}; \n})(jQuery);";pO("log",0,{verbosity:0},function(n,r){r&&(verbosity=r),verbosity&&n&&lvl<verbosity&&console&&console.log(n)});

//getRootUrl() from Baluptons history.js
function getRootUrl(){var a=window.location.protocol+"//"+(window.location.hostname||window.location.host);if(window.location.port||!1)a+=":"+window.location.port;return a+="/",a;}

//Global helpers
function _trigger(t, e){ e = e ? e : jQuery.rq("e"); jQuery(window).trigger('pronto.' + t, e); }
function _internal(url) { 
    if (!url) return false;
    if(typeof(url) === 'object') url = url.href;
    if (url==='') return true;
    return url.substring(0,rootUrl.length) === rootUrl || !url.iO(':');
}

function _root(u) { return u.iO('?') ? u.split('?')[0] : u; }

// The stateful Cache plugin
// Usage: 
// 1) $.cache() - returns currently cached page
// 2) $.cache(<URL>) - returns page with specified URL
// 3) $.cache(<jQuery object>) - saves the page in cache
pO("cache", { d: false }, 0, function (o) {
    if (!o) return d;
	
    if (typeof o === "string") {
        if(o === "f") { 
            $.pages("f");
            $.log("Cache flushed");
        } else d = $.pages($.memory(o));
        
        return d;
    }

    if (typeof o === "object") {
        d = o;
        return d;
    }
});

// The stateful Memory plugin
// Usage: $.memory(<URL>) - returns the same URL if not turned off internally
pO("memory", { d: false }, { memoryoff: false }, function (h) {
    d = memoryoff;
    if (!h || d === true) return false;
    if (d === false) return h;
    if (d.iO(", ")) {
         d = d.split(", ");
         if (d.iO(h)) return false;
         else return h;
    }
     
    return h == d ? false : h;
});
		
// The stateful Pages plugin
// Usage: 
// 1) $.pages(<URL>) - returns page with specified URL from internal array
// 2) $.pages(<jQuery object>) - saves the passed page in internal array
// 3) $.pages(false) - returns false
pO("pages", { d: [], i: -1 }, 0, function (h) {
    if (typeof h === "string") {
        if(h === "f") d = [];
        else { 
            i = _iPage(h);
            if(i === -1) return;
            return d[i][1];
        }
    }
	
    if (typeof h === "object") {
        i = _iPage(h[0]);
        if(i === -1) d.push(h);
        else d[i] = h;
    }
	
    if (typeof h === "boolean") return false;
}, {
    iPage: function (h) { //get index of page, -1 if not found
        for (var i = 0; i < d.length; i++)
            if (d[i][0] == h) return i;
        return -1;
    }
}
);

// The GetPage plugin
// First parameter is a switch: 
// empty - returns cache
// <URL> - loads HTML via Ajax
// "+" - pre-fetches page
// "-" - loads page into DOM and handle scripts
// "x" - returns XHR
// otherwise - returns selection of current page to client

pO("getPage", { xhr: 0, cb: 0, plus: 0 }, 0, function (o, p, p2) { 
    if (!o) return $.cache();
    if (o.iO("/")) {
        cb = p;
        if(plus == o) return;
        return _lPage(o);
    }
    if (o === "+")  {
        plus = p;
        cb = p2;
        return _lPage(p, true);
    }
	
    if (o === "-") return _lSel(p);
    if (o === "x") return xhr;            
    if($.cache()) return $.cache().find(o === "title" ?  "title:first" : ".ajy-" + o);
}, {
    lSel: function ($t) { //load page into DOM and handle scripts
        pass++;
        _lDivs($t);
        $.scripts($.rq("s?"));
        $.scripts("s");
        $.scripts("a");
        return $.scripts("c");
    },
		
    lPage: function (h, pre) { //fire Ajax load, check for hash first
         if (h.iO("#")) h = h.split("#")[0];
         if ($.rq("is") || !$.cache(h)) return _lAjax(h, pre);
		 
         plus = 0;
         if(cb) return cb();
    },
		
    ld: function ($t, $h) { 
        $h.find(".ajy-script").each(function(){
            if(!($(this).attr("src"))) $(this).replaceWith('');
            else $(this).replaceWith(scri.replace('*', $(this).attr("src")));
        });      
        $t.html($h.html());
    },
		
    lDivs: function ($t) { //load target divs into DOM
        if ($.cache()) $t.each(function() { 
            _ld($(this), $.cache().find("#" + $(this).attr("id")));
        });
    },
		
    lAjax: function (hin, pre) { //execute Ajax load
        var ispost = $.rq("is");
                
        xhr = $.ajax({
        url: hin,
        type: ispost ? "POST" : "GET",
        data: ispost ? $.rq("d") : null,
        success: function(h) {
            if (!h || !_isHtml(xhr)) {
                if (!pre) location.href = hin;
            }
            
            $.cache($(_parseHTML(h)));
            $.pages([hin, $.cache()]);
            plus = 0;

            if(cb) return(cb());
        },
        error: function(jqXHR, status, error) {
        // Try to parse response text
            try { 
                $.log('Response text : ' + jqXHR.responseText);
                $.cache($(_parseHTML(jqXHR.responseText)));
                $.pages([hin, $.cache()]); 
                if(cb) cb(error);
            } catch (e) {}
        },
        async: true
        });
    },
		
    isHtml: function (x) { //restrict interesting MIME types - only HTML / XML
        var d;
        return (d = x.getResponseHeader("Content-Type")), d && (d.iO("text/html") || d.iO("text/xml"));
    },
		
    parseHTML: function (h) { //process fetched HTML
        return $.trim(_replD(h));
    },
		
    replD: function (h) { //pre-process HTML so it can be loaded by jQuery
        return String(h).replace(docType, "").replace(tagso, div12).replace(tagsc, "</div>");
    }
}
);

// The main plugin - Ajaxify
// Is passed the global options 
// Checks for necessary pre-conditions - otherwise gracefully degrades
// Initialises sub-plugins
// Calls Pronto
pO("ajaxify", 0, { pluginon: true, deltas: true, verbosity: 0 }, function ($this, options) {
    var o = options;
    if(!o || typeof(o) !== 'string') {
        $(function () { //on DOMReady
            if (_init(settings)) { //sub-plugins initialisation
                $this.pronto("i", settings); //Pronto initialisation
                if(deltas) $.scripts("1"); //delta-loading initialisation
            }
        });
    }
    else return $().pronto(o);
    }, {
        init: function (s) {
            if (!api || !pluginon) {
                $.log("Gracefully exiting...");
                return false;
            }
            $.log("Ajaxify loaded...", verbosity);
            $.scripts("i", s);
            $.cache(0, s);
            $.memory(0, s);
            return true;
       }
    }
);

// The stateful Scripts plugin
// First parameter is switch:
// "i" - initailise options
// "a" - handle inline scripts
// "c" - fetch canonical URL
// otherwise - delta loading
pO("scripts", { $s : false }, { canonical: true, inline: true, inlinehints: false, inlineskip: "adsbygoogle", inlineappend: true, style: true }, function (o) {
    if (o === "i") {
        if(!$s) $s = $();
        return true;
    }
    
    if (o === "s") return _allstyle($s.y);
            
    if (o === "1") { 
        $.detScripts($s);
        return _addScripts(false, $s, settings);
    }
            
    if (o === "a") return _alltxts($s.t);

    if (o === "c") {
        if (canonical && $s.can) return $s.can.attr("href");
        else return false;
    }
    
    $.detScripts($s); //fetch all scripts
    _addScripts(o, $s, settings); //delta-loading
}, {
    allstyle: function ($s) {
        if (!style || !$s) return;
        $("head").find("style").remove();
        $s.each(function() {
            var d = $(this).text();
            _addstyle(d);
        });
    },
    alltxts: function ($s) {
        $s.each(function() {
             var d = $(this).text(), t = $(this).prop('type');
             if (!d.iO(").ajaxify(") && ((inline && !_inlineskip(d)) || $(this).hasClass("ajaxy") || _inlinehints(d))) _addtext(d, t);
        });
    },
    addtext: function (t, type) {
        if(!t || !t.length) return;
        if(!type) type = 'text/javascript';
        if(inlineappend || !type.iO('text/javascript')) try { return _apptext(t, type); } catch (e) { $.log("Error in apptext: " + t + "\nType: " + type + "\nCode: " + console.debug(e)); }
        
        try { $.globalEval(t); } catch (e1) {
	        try { eval(t); } catch (e2) {
                 $.log("Error in inline script : " + t + "\nError code : " + e2);
            }
        }
    },
    apptext: function (t, type) { 
        var scriptNode = document.createElement('script'), $cd0 = $.cd("g").get(0);
        scriptNode.type = type;
        scriptNode.appendChild(document.createTextNode(t));
        $.log(t);
        $cd0.appendChild(scriptNode);
    },
    addstyle: function (t) {
        $("head").append('<style type="text/css">' + t + '</style>');
    },
    inlineskip: function (txt) {
        var d = inlineskip;
        if (d) {
            d = d.split(", ");
            for (var i = 0; i < d.length; i++)
                if (txt.iO(d[i])) return true;
        }
    },
    inlinehints: function (txt) {
         var d = inlinehints;
         if (d) {
             d = d.split(", ");
             for (var i = 0; i < d.length; i++)
                 if (txt.iO(d[i])) return true;
         }
    },
    addScripts: function (same, $s, st) {
        $s.c.addAll(same, "href", st);
        $s.s.addAll(same, "src", st);
    }
}
);
// The DetScripts plugin - stands for "detach scripts"
// Works on "$s" jQuery object that is passed in and fills it
// Fetches all stylesheets in the head
// Fetches the canonical URL
// Fetches all external scripts on the page
// Fetches all inline scripts on the page
pO("detScripts", { head: 0, lk: 0, j: 0 }, 0, function ($s) {
    head = pass ? $.getPage("head") : $("head");
    lk = head.find(pass ? ".ajy-link" : "link");
    j = pass ? $.getPage("script") : $("script");
    $s.c = _rel(lk, "stylesheet");
    $s.y = head.find("style");
    $s.can = _rel(lk, "canonical");
    $s.s = j.filter(function() {
         return($(this).attr("src"));
    });
    $s.t = j.filter(function() {return(!($(this).attr("src")));});
    }, {
    rel: function(lk, v) {
        return $(lk).filter(function(){return($(this).attr("rel").iO(v));});
    }
    }
);

pO("addAll", { $scriptsO: false, $scriptsN: false, $sCssO: [], $sCssN: [], $sO: [], $sN: [] }, { deltas: true }, function ($this, same, PK) {
    if(!$this.length) return;
    if (PK == "href") {
        $scriptsO = $sCssO;
        $scriptsN = $sCssN;
    } else {
        $scriptsO = $sO;
        $scriptsN = $sN;
    } 
    if (_allScripts($this, PK)) return true;
    if (same) { _classAlways($this, PK); return; }
    $scriptsN = [];
    _newArray($this, $scriptsN, $scriptsO, PK);
    if (pass) {
         _findCommon($scriptsO, $scriptsN);
         _freeOld($scriptsO, PK);
         _sameScripts($scriptsN, PK);
         $scriptsO = $scriptsN.slice();
    }
    if (PK == "href") {
         $sCssO = $scriptsO;
         $sCssN = $scriptsN;
    } else {
         $sO = $scriptsO;
         $sN = $scriptsN;
    }
    }, {
    allScripts: function ($t, PK) {
        if (deltas) return false;
        $t.each(function() {
             _iScript($(this)[0], PK);
        });
        
        return true;
    },
    classAlways: function ($t, PK) { 
        $t.each(function() {
            if ($(this).attr("data-class") == "always") {
                 _iScript($(this).attr(PK), PK);
            }
        });
    },
    sameScripts: function (s, PK) {
        for (var i = 0; i < s.length; i++)
             if (s[i][1] === 0) _iScript(s[i][0], PK);
    },
    iScript: function ($S, PK) {
        $("head").append((PK == "href" ? linki : scri).replace("*", $S));
    },
    newArray: function ($t, sN, sO, PK) {
        var d;
        $t.each(function() {
             d = [$(this).attr(PK), 0];
             sN.push(d);
             if (!pass) sO.push(d);
        });
    },
    findCommon: function (s, sN) {
        for (var i = 0; i < s.length; i++) {
             s[i][1] = 2;
             if (_findScript(s[i][0], sN)) s[i][1] = 1;
        }
    },
    findScript: function ($S, s) {
        if ($S)
            for (var i = 0; i < s.length; i++)
                if (s[i][0] == $S) {
                    s[i][1] = 1;
                    return true;
                }
    },
    freeOld: function (s, PK) {
        for (var i = 0; i < s.length; i++)
            if (s[i][1] == 2 && s[i][0]) _removeScript(s[i][0], PK);
    },
    removeScript: function ($S, PK) {
        $((PK == "href" ? linkr : scrr).replace("!", $S)).remove();
    }
    }
);

pO("cd", { cd: 0, aniTrue: 0, from: 0, cdwidth: 0 }, { aniParams: false, aniTime: 0 }, function (o, p) {
    if(!o) return;
    
    if(o === "g") return cd;

    if(o === "i") {
        cd = p.first();
        aniTrue = aniTime && aniParams;
        cdwidth = cd.width();
        if(!aniTrue) return;
		
        aniParams = $.extend({
            opacity: 1, // default - no fade
            width: "100%",
            height: "100%"
        }, aniParams);
		
        aniParams = $.extend({
            marginRight: cdwidth - aniParams.width
        }, aniParams);
		
        from = $.extend({}, aniParams);
		
        for(var key in from) {
            if (from.hasOwnProperty(key)) { 
                var keyval = cd.css(key), keyOval = from[key];

                if((key === "height") && keyOval.iO("%")) { 
                    keyval = 10000 / +keyOval.substr(0, keyOval.iO("%")-1) + "%";
                }

                from[key] = keyval;    
            }
        }     
    }
	
    if(!p) return;
	
    if(!aniTrue) { p(); return; }
	
    if (o === "1" || o === "2") {
        if(o === "1") cd.stop(true, true);
        cd.animate(o === "1" ? aniParams : from, aniTime, p);
    }
});

pO("slides", { pinned: 0, img: 0, timer: -1, currEl: 0, parentEl: 0}, { idleTime: 0, slideTime: 0, menu: false, addclass: "jqhover", toggleSlide: false }, function (o) {
    if(!o || !idleTime) return;
	
    if (o === "i") { 
        $(document).idle({ onIdle: _onIdle, onActive: _onActive, idle: idleTime });
        
        if(toggleSlide) toggleSlide = $.extend({ //defaults - if not turned off completely
            parentEl: '#content', //parent element, where the above image(s) will be prepended 
            imgOn: 'http://4nf.org/images/pinOn.gif', //graphic for indicating sliding is on
            imgOff: 'http://4nf.org/images/pinOff.gif', //graphic for indicating sliding is off
            titleOn: 'Turn slideshow off', //title tag when on
            titleOff: 'Turn slideshow on', //title tag when off
            imgProps: { marginLeft: '85%', marginTop: '20px' }
        }, toggleSlide);  

        parentEl = toggleSlide.parentEl;
    }
    
    if (o === "f") _insImg();
}, {
    onIdle: function(){ 
        _trigger("idle");
        if(timer + 1) return;                    
        _slide();
    },
    onActive: function(){ 
        _trigger("active");
        if(currEl) currEl.removeClass(addclass);
        if(timer + 1) clearInterval(timer);
        timer = -1;
    },
    slide: function() { 
        if(timer + 1) clearInterval(timer);
		timer = setInterval(_slide1, slideTime); 
    },
    slide1: function() { 
        if(pinned) return;
        $().pronto(_nextLink());
    }, 
    nextLink: function() { 
        var wasPrev = false, firstValue = false, firstLink = false, nextLink = false, link;
        $(menu).each(function(i, v){ 
            var el = $(this).parent();
            if(nextLink) return(true);
            link = v.href;
            if(!_internal(link)) return(undefined);
            el.removeClass(addclass);
            if(!firstValue) firstValue = $(this).parent();
            if(!firstLink) firstLink = link;
            if(wasPrev) { 
                nextLink = link;
                currEl = el;
                el.addClass(addclass);
            }
            else if(currentURL == link) wasPrev = true;
        });
			
        if(!nextLink) { 
             firstValue.addClass(addclass);
             nextLink = firstLink;
             currEl = firstValue;
        }
		
        return nextLink;
    },
    insImg: function() {
        if(!parentEl) return;
        img = $('<img src ="' + toggleSlide.imgOn + '" title="' + toggleSlide.titleOn + '" />').prependTo(parentEl).css(toggleSlide.imgProps);
        
        img.click(_toggleImg);
        pinned = 0;
    },
    toggleImg: function(e) {
        if(!parentEl || !img || !img.length) return;
        var src = toggleSlide.imgOn, titl = toggleSlide.titleOn;
        
        if(!pinned) { 
            pinned = 1;
            src = toggleSlide.imgOff;
            titl = toggleSlide.titleOff;
        } else pinned = 0;
                
        img.attr("src", src);
        img.attr("title", titl);
        
        if(!pinned) { //Kickstart in idle sub-plugin after user resumes 
            _slide1();
            _slide();
             $(document).trigger("idle:kick");
		}
    }
});

pO("rq", { ispost: 0, data: 0, same: 0, push: 0, can: 0, e: 0, l: 0, h: 0}, 0, function (o, p) {
    if(o === "=") {
        return h === currentURL; 
    }
    
    if(o === "v") {
        if(!p) return false;
        e = p;
        l = e.currentTarget;
        h = l.href;
        if(!_internal(h)) return false;
        o = "i";
    }
    
    if(o === "i") {
        ispost = false;
        data = null;
        same = false;
        push = false;
        return l;
    }
    
    if(o === "h") { // Access href hard
        if(p) {
            e = 0;  // Reset e
            h = p;  // Poke in href hard
        }
        
        return h;
    }
    
    if(o === "l") return l;
    if(o === "e") {
        if(p) e = p;
        return e ? e : h; // Return "e" or if not given "h"
    }

    if(o === "p") {
        if(p) push = p;
        return push;
    }
    
    if(o === "s") { 
        var t = p ? p : h;
        same = (_root(t) === _root(currentURL));
    }
    
    if(o === "s?") return same;
	
    if(o === "is") {
        if(p) ispost = p;
        return ispost;
    }
	
    if(o === "d") {
        if(p) data = p;
        return data;
    }
	
    if(o === "can") {
        if(p) can = p;
        return can;
    }
	
    if(o === "can?") return can && can !== p && !p.iO('#') && !p.iO('?') ? can : p;
});

pO("frms", { fm: 0, divs: 0}, { forms: "form:not(.no-ajaxy)" }, function (o, p) {
    if (!forms || !o) return;
    
    if(o === "d") divs = p;
    if(o === "a") divs.find(forms).filter(function() {
        return(_internal($(this).attr("action")));
    }).submit(function(q) {
        fm = $(q.target);
        if (!fm.is("form")) {
            fm = fm.filter("input[type=submit]").parents("form:first");
            if (fm.length === 0) {
                return(true);
            }
        }
        
        p = _k();
        var g = "get",
        m = fm.attr("method");
        if (m.length > 0 && m.toLowerCase() == "post") g = "post";
        
        var h, a = fm.attr("action");
        if (a && a.length > 0) h = a;
        else h = currentURL; 
                
        $.rq("i");
        $.rq("s", h);
               
        if (g == "get") h = _b(h, p);
        else {
            $.rq("is", true);
            $.rq("d", p);
        }
        
        _trigger("submit", h);
        $().pronto({ href: h });
		
        return(false);
    });
}, {
    k: function () {
        var o = fm.serialize();
        var n = $("input[name][type=submit]", fm);
        if (n.length === 0) return o;
        var p = n.attr("name") + "=" + n.val();
        if (o.length > 0) {
            o += "&" + p;
        } else {
            o = p;
        }
        
        return o;
    },
    b: function (m, n) {
        if (m.indexOf("?") > 0) {
            m = m.substring(0, m.indexOf("?"));
        }
        return m + "?" + n;
    }
});

pO("rqTimer", { requestTimer: 0 }, { requestDelay: 0 }, function (o) {
    if(!o) return;

    if(o === "-" && requestTimer) return clearTimeout(requestTimer);
    if(typeof(o) === 'function') requestTimer = setTimeout(o, requestDelay);
});

// The stateful Offsets plugin
// Usage: 
// 1) $.offsets(<URL>) - returns offset with specified URL from internal array
// 2) $.offsets() - saves the current URL + offset in internal array
pO("offsets", { d: [], i: -1 }, 0, function (h) {
    if (typeof h === "string") {
        i = _iOffset(h);
        if(i === -1) return;
        return d[i][1];
    }
	
    var os = [currentURL, $(window).scrollTop()];
    i = _iOffset(currentURL);
    if(i === -1) d.push(os);
    else d[i] = os;
}, {
  iOffset: function (h) { //get index of page, -1 if not found
        for (var i = 0; i < d.length; i++)
            if (d[i][0] == h) return i;
        return -1;
    }
}
);

pO("scroll", 0, { scrolltop: false }, function (o) {
    if(!o) return;
  
    if(scrolltop === "s") {
        if(o === "+") $.offsets();
        else $(window).scrollTop($.offsets(o));
        return;
    }

    if(scrolltop) $(window).scrollTop(0);
    else {  
        var url = o;
        if (url.iO('#') && (url.iO('#') < url.length - 1)) { //if hash in URL
            var $el = $('#' + url.split('#')[1]), offSet;
            if ($el.length) offSet = $el.offset().top;
            $.log("Offset: " + offSet);
            if (offSet !== false) $(window).scrollTop(offSet); // ...animate
        }
    }
});

pO("hApi", 0, 0, function (o, p) {
    if(!o) return;
    if(p) currentURL = p;

    if(o === "=") history.replaceState({ url: currentURL }, "state-" + currentURL, currentURL);
    else history.pushState({ url: currentURL }, "state-" + currentURL, currentURL);
});

pO("pronto", { $gthis: 0 }, { selector: "a:not(.no-ajaxy)", prefetch: true, previewoff: true, cb: 0 }, function ($this, h) {
     if(!h) return;
     
     if(h === "i") { 
         var s = settings;
         if(!$this.length) $.log("Warning - empty content selector passed!");
         $gthis = $this;
         $.cd(0, 0, s);
         $.frms(0, 0, s);
         $.slides(0, s);
         $.rqTimer(0, s);
         $.scroll(0, s);
		 $.cd("i", $gthis);
         _init_p();
         return $this;
     }
     
     if(typeof(h) === "object") { 
          $.rq("h", h.href);
          _request();
          return;
     }
     
     if(h.iO("/")) {
         $.rq("h", h);				 
         _request(true);
     }
}, { 
 init_p: function() {
    $.hApi("=", window.location.href); // Set initial state
    $(window).on("popstate", _onPop); // Set handler for popState
    if (prefetch) {
        $(selector).hoverIntent(_prefetch, function(){});
        $(selector).on("touchend", _prefetch); // for touchscreens
    }
    
    var $body = $("body");
    $body.on("click.pronto", selector, _click); // Real click handler -> _click()
    $.frms("d", $body); // Select forms in whole body
    $.frms("a"); // Ajaxify forms
    $.frms("d", $gthis); // Every further pass - select forms in content div(s) only
    $.slides("i"); // Init slideshow
  }, 
 prefetch: function(e) { //...target page on hoverIntent
       var link = $.rq("v", e); // validate internal URL
       if ($.rq("=") || !link) return;
       fn('+', link.href, function() {
            if (previewoff === true) return(false);
            if (!_isInDivs(link) && (previewoff === false || !$(link).closest(previewoff).length)) _click(e, true);
       });
  },
 isInDivs: function(link) {
      var is = false;
      $gthis.each(function() {
          if ($(link).parents("#" + $(this).attr("id")).length > 0) is = true;
      });      
         
      return is;
  },
 stopBubbling: function(e) { // Stop "bubbling-up"
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
 },
 click: function(e, mode) { //...handler for normal clicks
      var link = $.rq("v", e);  // validate internal URL
      if(!link || _exoticKey(e)) return; // Ignore everything but normal click
      if(_hashChange(link)) { // only hash has changed
          $.scroll(link.href);
          if(link.href.substr(-1) !=='#') currentURL = link.href;
          $.hApi("="); 
          return false;
      }
      
      _stopBubbling(e);
      if($.rq("=")) $.hApi("=");
      else _request(); // Continue with _request()
  }, 
 request: function(notPush) { // ... new url
      $.rq("p", !notPush); // mode for hApi - replaceState / pushState
      _trigger("request"); // Fire request event
      $.rq("s"); // Set "same" variable
      fn($.rq("h"), function(err) { // Call "fn" - handler of parent
          if (err) { 
              $.log('Error in _request : ' + err); 
              _trigger("error", err); 
          }
          
          _render(); // continue with _render()
      });
  },
 render: function() { // Clear and set timer
      $.rqTimer('-'); // Clear
      _trigger("beforeload");
      $.rqTimer(function() { $.cd("1", _doRender); }); // Set.  Animate to
  },
 onPop: function(e) { // Handle back/forward navigation
      $.rq("i"); //Initialise request in general
      $.rq("e", e); //Initialise request event
            
      var data = e.originalEvent.state, url = data ? data.url : 0;
           
      if (!url || url === currentURL) return;  // Check if data exists
      $.rq("s", url); // Set "same" variable
      _trigger("request"); // Fire request event
      fn(url, _render); // Call "fn" - handler of parent, continue with _render()
  },
 doRender: function() { // Render HTML
      _trigger("load");  // Fire load event
      $.rq("can", fn('-', $gthis)); // Update DOM and fetch canonical URL
      $('title').html(fn('title').html()); // Update title
      $.cd("2", _doRender2); // Animate back - continue with _doRender2()
      $.slides("f"); // Finalise slideshow
  },
 doRender2: function() { // Continue render
      var e = $.rq("e"), // Fetch event 
      url = typeof(e) !== "string" ? e.currentTarget.href || e.originalEvent.state.url : e; // Get URL from event
      url = $.rq("can?", url); // Fetch canonical if no hash or parameters in URL
      $.frms("a"); // Ajaxify forms - in content divs only
           
      $.hApi($.rq("p") ? "+" : "=", url); // Push new state to the stack on new url
      $.scroll(url);
      _gaCaptureView(url); // Trigger analytics page view
      _trigger("render"); // Fire render event
      if(cb) cb(); // Callback user's handler, if specified
  },
 gaCaptureView: function(url) { // Google Analytics support
      url = '/' + url.replace(rootUrl,'');
      if (typeof window.ga !== 'undefined') window.ga('send', 'pageview', url); // the new analytics API
      else if (typeof window._gaq !== 'undefined') window._gaq.push(['_trackPageview', url]);  // the old API					
  },
 exoticKey: function(e) {
      return (e.which > 1 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.currentTarget.target === "_blank");
  },
 hashChange: function(link) { // only hash has changed
      return (link.hash && link.href.replace(link.hash, '') === window.location.href.replace(location.hash, '') || link.href === window.location.href + '#');
  }
});

var fn = jQuery.getPage; //fn is passed to Pronto as a jQuery sub-plugin, that is a callback
