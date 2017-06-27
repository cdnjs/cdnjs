/* 
 * ajaxify.js 
 * Ajaxify your site out of the box, instantly.
 * http://4nf.org/ 
 * 
 * Copyright Arvind Gupta; MIT Licensed 
 */ 

 //Intuitively better understandable shorthand for String.indexOf() - String.iO()
String.prototype.iO = function(s) { return this.toString().indexOf(s) + 1; };

//Minified hoverIntent plugin that satisfies JSHint
(function(a){a.fn.hoverIntent=function(w,e,b){var j={interval:100,sensitivity:7,timeout:0};if(typeof w==="object"){j=a.extend(j,w);}else{if(a.isFunction(e)){j=a.extend(j,{over:w,out:e,selector:b});}else{j=a.extend(j,{over:w,out:w,selector:e});}}var x,d,v,q;var m=function(c){x=c.pageX;d=c.pageY;};var g=function(c,f){f.hoverIntent_t=clearTimeout(f.hoverIntent_t);if(Math.abs(v-x)+Math.abs(q-d)<j.sensitivity){a(f).off("mousemove.hoverIntent",m);f.hoverIntent_s=1;return j.over.apply(f,[c]);}else{v=x;q=d;f.hoverIntent_t=setTimeout(function(){g(c,f);},j.interval);}};var p=function(f,c){c.hoverIntent_t=clearTimeout(c.hoverIntent_t);c.hoverIntent_s=0;return j.out.apply(c,[f]);};var k=function(c){var h=jQuery.extend({},c);var f=this;if(f.hoverIntent_t){f.hoverIntent_t=clearTimeout(f.hoverIntent_t);}if(c.type=="mouseenter"){v=h.pageX;q=h.pageY;a(f).on("mousemove.hoverIntent",m);if(f.hoverIntent_s!=1){f.hoverIntent_t=setTimeout(function(){g(h,f);},j.interval);}}else{a(f).off("mousemove.hoverIntent",m);if(f.hoverIntent_s==1){f.hoverIntent_t=setTimeout(function(){p(h,f);},j.timeout);}}};return this.on({"mouseenter.hoverIntent":k,"mouseleave.hoverIntent":k},j.selector);};})(jQuery);

//Module global variables
var l=0, pass=0, api=window.history && window.history.pushState && window.history.replaceState,

//Regexes for escaping fetched HTML of a whole page - best of Baluptons Ajaxify
//Makes it possible to pre-fetch an entire page
docType = /<\!DOCTYPE[^>]*>/i,
tagso = /<(html|head|body|title|meta|script|link)([\s\>])/gi,
tagsc = /<\/(html|head|body|title|meta|script|link)\>/gi,

//Helper strings
div12 = '<div class="ajy-$1"$2',
linki = '<link rel="stylesheet" type="text/css" href="*" />',
scri = '<script type="text/javascript" src="*" />',
linkr = 'link[href*="!"]', 
scrr = 'script[src*="!"]';

//getRootUrl() from Baluptons history.js - satisfies JSHint
function getRootUrl(){var a=window.location.protocol+"//"+(window.location.hostname||window.location.host);if(window.location.port||!1)a+=":"+window.location.port;return a+="/",a;}

/*global jQuery*/ //Tell JSHint, not to moan about "jQuery" being undefined

// The stateful Log plugin - initialised in Ajaxify at the bottom of the file
// Usage: $.log(<string>); anywhere in Ajaxify where you would like to peek into
(function ($) { 
    var Log = function (options) {
        var con = window.console;
        var settings = $.extend({
            verbosity: 0
        }, options);
        var verbosity = settings.verbosity;
        this.a = function (m) {
            if(l < verbosity && con) con.log(m);
        };
    };
    $.log = function (m, options) {
        if (!$.log.o) $.log.o = new Log(options);
        return $.log.o.a(m);
    };
})(jQuery);

// The stateful Cache plugin
// Usage: 
// 1) $.cache() - returns currently cached page
// 2) $.cache(<URL>) - returns page with specified URL
// 3) $.cache(<jQuery object>) - saves the page in cache
(function ($) {
    var Cache = function () {
        var d = false;
        this.a = function (o) {
            if (!o) {
                return d;
            }
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
        };
    };
    $.cache = function (o) {
        if (!$.cache.o) $.cache.o = new Cache();
        return $.cache.o.a(o);
    };
})(jQuery);

// The stateful Memory plugin
// Usage: $.memory(<URL>) - returns the same URL if not turned off internally
(function ($) {
    var Memory = function (options) {
        var d = false;
        var settings = $.extend({
            memoryoff: false
        }, options);
        var memoryoff = settings.memoryoff;
        this.a = function (h) {
            d = memoryoff;
            if (!h || d === true) return false;
            if (d === false) return h;
            if (d.iO(", ")) {
                d = d.split(", ");
                if (d.iO(h)) return false;
                else return h;
            }
            return h == d ? false : h;
        };
    };
    $.memory = function (h, options) {
        if (!$.memory.o) $.memory.o = new Memory(options);
        return $.memory.o.a(h);
    };
})(jQuery);

// The stateful Pages plugin
// Usage: 
// 1) $.pages(<URL>) - returns page with specified URL from internal array
// 2) $.pages(<jQuery object>) - saves the passed page in internal array
// 3) $.pages(false) - returns false
(function ($) {
    var Pages = function () {
        var d = [];
        this.a = function (h) {
            if (typeof h === "string") {
                if(h === "f") d = [];
                else for (var i = 0; i < d.length; i++)
                    if (d[i][0] == h) return d[i][1];
            }
            if (typeof h === "object") {
                d.push(h);
            }
            if (typeof h === "boolean") {
                return false;
            }
        };
    };
    $.pages = function (h) {
        if (!$.pages.o) $.pages.o = new Pages();
        return $.pages.o.a(h);
    };
})(jQuery);

// The GetPage plugin
// First parameter is a switch: 
// empty - returns cache
// <URL> - loads HTML via Ajax
// "+" - pre-fetches page
// "-" - loads page into DOM and handle scripts
// "x" - returns XHR
// otherwise - returns selection of current page to client
(function ($) {
    var GetPage = function () { var xhr;
        this.a = function (o, p, p2) { 
            if (!o) {
                return $.cache();
            }
            if (o.iO("/")) {
                return _lPage(o, p, p2);
            }
            if (o === "+") {
                return _lPage(p, p2, false, true);
            }
            if (o === "-") {
                return _lSel(p, p2);
            }
            if (o === "x") {
                return xhr;
            }
            
            if($.cache()) return $.cache().find(".ajy-" + o);
        };

        function _lSel(p, $t) { //load page into DOM and handle scripts
            pass++;
            _lDivs($t);
            $.scripts(p && p.same);
            $.scripts("s");
            $.scripts("a");
            return $.scripts("c");
        }

        function _lPage(h, p, rq, pre) { //fire Ajax load, check for hash first
            var _post = rq ? rq.post : false;
            if (h.iO("#")) h = h.split("#")[0];
            if (_post || !$.cache(h)) return _lAjax(h, p, _post, pre);
            if(p) p();
        }

        function _ld($t, $h) {
            $h.find(".ajy-script").each(function(){
                 if(!($(this).attr("src"))) $(this).replaceWith('<script type="text/javascript">' + $(this).text() + '</script>');
                 else $(this).replaceWith(scri.replace('*', $(this).attr("src")));
            });
            
            $t.html($h.html());
        }

        function _lDivs($t) { //load target divs into DOM
            if ($.cache()) $t.each(function () { 
                _ld($(this), $.cache().find("#" + $(this).attr("id")));
            });
        }

        function _lAjax(hin, p, post, pre) { //execute Ajax load
                var ispost = post ? post.is : false;
                
                xhr = $.ajax({
				url: hin,
                type: ispost ? "POST" : "GET",
                data: ispost ? post.data : null,
                success: function (h) {
                    if (!h || !_isHtml(xhr)) {
                        if (!pre) location.href = hin;
                    }
                    $.cache($(_parseHTML(h)));
                    $.pages([hin, $.cache()]);

                    if(p) p();
                },
                error: function(jqXHR, status, error) {
                    // Try to parse response text
                    try { 
                        $.log('Response text : ' + jqXHR.responseText);
                        $.cache($(_parseHTML(jqXHR.responseText)));
                        $.pages([hin, $.cache()]); 
                        if(p) p(error);
                    } catch (e) {}
                }
            });
        }
        
        function _isHtml(x) { //restrict interesting MIME types - only HTML / XML
            var d;
            return (d = x.getResponseHeader("Content-Type")), d && (d.iO("text/html") || d.iO("text/xml"));
        }

        function _parseHTML(h) { //process fetched HTML
            return $.trim(_replD(h));
        }

        function _replD(h) { //pre-process HTML so it can be loaded by jQuery
            return String(h).replace(docType, "").replace(tagso, div12).replace(tagsc, "</div>");
        }
    };
    $.getPage = function (o, p, p2) {
        if (!$.getPage.o) $.getPage.o = new GetPage();
        return $.getPage.o.a(o, p, p2);
    };
})(jQuery);

// The main plugin - Ajaxify
// Is passed the global options 
// Checks for necessary pre-conditions - otherwise gracefully degrades
// Initialises sub-plugins
// Calls Pronto
(function ($) {
    var Ajaxify = function (options) {
        var settings = $.extend({
            pluginon: true,
            deltas: true,
            fn: $.getPage
        }, options);
        var pluginon = settings.pluginon,
        deltas = settings.deltas;
        
        this.a = function ($this, o) {
            if(!o) {
                $(function () { //on DOMReady
                    if (_init(settings)) { //sub-plugins initialisation
                        $this.pronto(0, settings); //Pronto initialisation
                        if(deltas) $.scripts("1"); //delta-loading initialisation
                    }
                });
            }
            else return $().pronto(o);
        };

        function _init(s) {
            if (!api || !pluginon) return false;
            $.scripts("i", s);
            $.cache(0, s);
            $.memory(0, s);
            return true;
        }
    };
    $.fn.ajaxify = function (options) {
        var $this = $(this);
        if (!$.fn.ajaxify.o) $.fn.ajaxify.o = new Ajaxify(options);
        return typeof(options) === 'string' ? $.fn.ajaxify.o.a($this, options) : $.fn.ajaxify.o.a($this);
    };
})(jQuery);

// The stateful Scripts plugin
// First parameter is switch:
// "i" - initailise options
// "a" - handle inline scripts
// "c" - fetch canonical URL
// otherwise - delta loading
(function ($) {
    var Scripts = function (options) {
        var $s = $();
        var settings = $.extend({
            canonical: true,
            inline: true,
            inlinehints: false,
            inlineskip: "adsbygoogle",
            style: true
        }, options);
        var canonical = settings.canonical,
            inline = settings.inline,
            inlinehints = settings.inlinehints,
            inlineskip = settings.inlineskip,
            style = settings.style;
        this.a = function (o) {
            if (o === "i") {
                return true;
            }
            if (o === "s") {
                return _allstyle($s.y);
            }
            
            if (o === "1") { 
                $.detScripts($s);
                return _addScripts(false, $s, settings);
            }
            
            if (o === "a") {
                return _alltxts($s.t);
            }
            if (o === "c") {
                if (canonical && $s.can) return $s.can.attr("href");
                else return false;
            }
            $.detScripts($s); //fetch all scripts
            _addScripts(o, $s, settings); //delta-loading
        };

        function _allstyle($s) {
            if (!style || !$s) return;
            $("head").find("style").remove();
            $s.each(function () {
                var d = $(this).text();
                _addstyle(d);
            });
        }
		
        function _alltxts($s) {
            $s.each(function () {
                var d = $(this).text();
                if (!d.iO(").ajaxify(") && ((inline && !_inlineskip(d)) || $(this).hasClass("ajaxy") || _inlinehints(d))) _addtext(d);
            });
        }

        function _addtext(t) {
            try {
                $.globalEval(t);
            } catch (e1) {
	            try { 
                    eval(t);
                } catch (e2) {
                    $.log("Error in inline script : " + t + "\nError code : " + e2);
                }
            }
        }
		
        function _addstyle(t) {
            $("head").append('<style type="text/css">' + t + '</style>');
        }

        function _inlineskip(txt) {
            var d = inlineskip;
            if (d) {
                d = d.split(", ");
                for (var i = 0; i < d.length; i++)
                    if (txt.iO(d[i])) return true;
            }
        }
        
        function _inlinehints(txt) {
            var d = inlinehints;
            if (d) {
                d = d.split(", ");
                for (var i = 0; i < d.length; i++)
                    if (txt.iO(d[i])) return true;
            }
        }

        function _addScripts(same, $s, st) {
            $s.c.addAll(same, "href", st);
            $s.s.addAll(same, "src", st);
        }
    };
    $.scripts = function (o, options) {
        if (!$.scripts.o) $.scripts.o = new Scripts(options);
        return $.scripts.o.a(o);
    };
})(jQuery);

// The DetScripts plugin - stands for "detach scripts"
// Works on "$s" jQuery object that is passed in and fills it
// Fetches all stylesheets in the head
// Fetches the canonical URL
// Fetches all external scripts on the page
// Fetches all inline scripts on the page
(function ($) {
    var DetScripts = function () {
        var head, lk, j;
        this.a = function ($s) {
            head = pass ? $.getPage("head") : $("head");
            lk = head.find(pass ? ".ajy-link" : "link");
            j = pass ? $.getPage("script") : $("script");
            $s.c = _rel(lk, "stylesheet");
            $s.y = head.find("style");
            $s.can = _rel(lk, "canonical");
            $s.s = j.filter(function () {
                return $(this).attr("src");
            });
            $s.t = j.filter(function () {
                return !($(this).attr("src"));
            });
        };

        function _rel(lk, v) {
            return $(lk).filter(function () {
                return $(this).attr("rel").iO(v);
            });
        }
    };
    $.detScripts = function ($s) {
        if (!$.detScripts.o) $.detScripts.o = new DetScripts();
        return $.detScripts.o.a($s);
    };
})(jQuery);

(function ($) {
    var AddAll = function (options) {
        var $scriptsO, $scriptsN, $sCssO = [],
            $sCssN = [],
            $sO = [],
            $sN = [];
        var settings = $.extend({
        }, options);
        var deltas = settings.deltas;
        this.a = function ($this, same, PK) {
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
            //if (pass>1 && same) return _sameScripts($scriptsN, PK);
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
        };

        function _allScripts($t, PK) {
            if (deltas) return false;
            $t.each(function () {
                _iScript($(this)[0], PK);
            });
            return true;
        }

        function _classAlways($t, PK) {
            $t.each(function () {
                if ($(this).attr("data-class") == "always") {
                    _iScript($(this).attr(PK), PK);
                    //$(this).remove();
                }
            });
        }

        function _sameScripts(s, PK) {
            for (var i = 0; i < s.length; i++)
                if (s[i][1] === 0) _iScript(s[i][0], PK);
        }

        function _iScript($S, PK) {
            $("head").append((PK == "href" ? linki : scri).replace("*", $S));
        }

        function _newArray($t, sN, sO, PK) {
            var d;
            $t.each(function () {
                d = [$(this).attr(PK), 0];
                sN.push(d);
                if (!pass) sO.push(d);
            });
        }

        function _findCommon(s, sN) {
            for (var i = 0; i < s.length; i++) {
                s[i][1] = 2;
                if (_findScript(s[i][0], sN)) s[i][1] = 1;
            }
        }

        function _findScript($S, s) {
            if ($S)
                for (var i = 0; i < s.length; i++)
                    if (s[i][0] == $S) {
                        s[i][1] = 1;
                        return true;
                    }
        }

        function _freeOld(s, PK) {
            for (var i = 0; i < s.length; i++)
                if (s[i][1] == 2 && s[i][0]) _removeScript(s[i][0], PK);
        }

        function _removeScript($S, PK) {
            $((PK == "href" ? linkr : scrr).replace("!", $S)).remove();
        }
    };
    $.fn.addAll = function (same, PK, options) {
        var $this = $(this);
        if (!$.fn.addAll.o) $.fn.addAll.o = new AddAll(options);
        return $.fn.addAll.o.a($this, same, PK);
    };
})(jQuery);

(function ($) {
    var Pronto = function (options) {
        var $window = $(window),
            currentURL = '',
            requestTimer = null,
            rq = null,
            $gthis, $cd, fm, cdwidth,
            rootUrl = getRootUrl();

        // Default Options
        var settings = $.extend({
            selector: "a:not(.no-ajaxy):not([target='_blank'])",
            fade: 0,
            pop: 0,
            squeeze: 0,
            requestDelay: 0,
            forms: "form:not(.no-ajaxy)",
            prefetch: true,
            previewoff: true,
            fn: false,
            cb: 0
        }, options);

        //Shorthands
        var selector = settings.selector,
            fade = settings.fade,
            pop = settings.pop,
            squeeze = settings.squeeze,
            requestDelay = settings.requestDelay,
            forms = settings.forms,
            prefetch = settings.prefetch,
            previewoff = settings.previewoff,
            cb = settings.cb,
            fn = settings.fn;
        
        // Main plugin function
        this.a = function ($this, h) {
            if(!h) {
                $gthis = $this;
                $cd = $this.first();
                cdwidth = $cd.width();
                _init_p();
                return $this;
            }
            else if(h.iO("/")) { 
                _request(h, true);
                 return 'OK';
            }
        };

        // Private Methods
        function _init_p() {
            settings.$body = $("body");
            currentURL = window.location.href; // Capture current url & state
            _saveState(); // Set initial state
            $window.on("popstate", _onPop); //Set handler for popState
            if (prefetch) {
                $(selector).hoverIntent(_prefetch, _drain); //If "prefetch" option defined then set handler to "_prefetch" on hoverIntent
                $(selector).on("touchstart", _prefetch); //for touchscreens
            }
            
            settings.$body.on("click.pronto", selector, _click); //For real clicks set handler to _click()
            _ajaxify_forms();
        }

        //Dummy function for hoverIntent
        function _drain() {}

        //Prefetch target page on hoverIntent
        function _prefetch(e) {
            _init_rq(); // Assume not a POST
            
            var link = e.currentTarget;
            
            //Validate link internal and not the same URL
            if (_diffHost(link)) return false;
            if (currentURL == link.href) return false;
			
            var req2 = function () {
                if (previewoff === true) return false;
                if (!_isInDivs(link) && (previewoff === false || !$(link).closest(previewoff).length)) _click(e, true);
            };
            fn('+', link.href, req2);
        }

        function _isInDivs(link) {
            var isInDivs = false;
            $gthis.each(function () {
                try {
                    if ($(link).parents("#" + $(this).attr("id")).length > 0) isInDivs = true;
                } catch (e) {
                    alert(e);
                }
            });
            return isInDivs;
        }

        function _b(m, n) {
            if (m.indexOf("?") > 0) {
                m = m.substring(0, m.indexOf("?"));
            }
            return m + "?" + n;
        }
		
        function _k() {
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
        }
        
        function _internal(url) { 
            if (url==='') return true;
            return url && (url.substring(0,rootUrl.length) === rootUrl || !url.iO(':'));
        }
        
        function _init_rq() {
            rq = {};
            rq.post = {};
            rq.post.is = false;
            rq.post.data = null;
            rq.same = false;
        }
        
        function _root(u) {
            u = u.iO('?') ? u.split('?')[0] : u;
        }
        
        function _sameRoot(u1, u2) {
            return _root(u1) === _root(u2);
        }
        
        function _ajaxify_forms(mode) { 
            if (!forms) return false;
            
            var divs;
            divs = mode ? $gthis : $("body");
            divs.find(forms).filter(function() {
                return _internal($(this).attr("action"));
            }).submit(function (q) {
                fm = $(q.target);
                if (!fm.is("form")) {
                    fm = fm.filter("input[type=submit]").parents("form:first");
                    if (fm.length === 0) {
                        return true;
                    }
                }
                var p = _k();
                var g = "get",
                    m = fm.attr("method");
                if (m.length > 0 && m.toLowerCase() == "post") g = "post";
                var h, s, a = fm.attr("action");
                if (a && a.length > 0) h = a;
                else h = currentURL; 
                s = _sameRoot(h, currentURL);
                
                _init_rq();
                rq.same = s;
                
                if (g == "get") h = _b(h, p);
                else {
                    rq.post.is = true;
                    rq.post.data = p;
                }
                $window.trigger("pronto.submit", h);
                _request(h);
                return false;
            });
        }
 
        // Handle link clicks
        function _click(e, mode) {
            var link = e.currentTarget;
            _init_rq();
            if (_exoticKey(e) || _diffHost(link)) return; // Ignore everything but normal click and internal URLs
            if (_hashChange(link)) { // Only the hash part has changed
                _saveState(); // Update state on hash change
                return true;
            }
            e.preventDefault();
            e.stopPropagation();
            if (currentURL == link.href) {
                _saveState();
            } else _request(e, mode);
        }

        // Request new url
        function _request(e, mode) {
            var href = typeof(e) !== "string" ? e.currentTarget.href : e;
            $window.trigger("pronto.request", e); // Fire request event
			var reqr = function (err) { //Callback - continue with _render()
                if (err) { 
                    $.log('Error : ' + err); 
                    $window.trigger("pronto.error", err); 
                }
                _render(e, true, mode);
            };
			
            fn(href, reqr, rq); //Call "fn" - handler of parent, informing whether POST or not
            }

        function _render(e, doPush, mode) {
            if (requestTimer !== null) {
                clearTimeout(requestTimer);
                requestTimer = null;
            }
            
            $window.trigger("pronto.beforeload", e);
            
            requestTimer = setTimeout(function () {
                _render2(e, doPush, mode);
            }, requestDelay);
        }
		
        function _render2(e, doPush, mode) {
            $cd.stop(true, true);
            
            var afterEffect = function () {
                _doRender(e, doPush, mode);
            };
			
            if(fade) $cd.fadeOut(fade, afterEffect);
            else if(squeeze) {
                $cd.animate({width: 0, opacity: 0, marginRight: cdwidth}, squeeze, afterEffect);
            }
			
            else afterEffect();
        }

        // Save current state
        function _saveState() {
            history.replaceState({ // Update state
                url: currentURL
            }, "state-" + currentURL, currentURL);
        }

        // Handle back/forward navigation
        function _onPop(e) {
            _init_rq();
            
            var data = e.originalEvent.state;
            
            // Check if data exists
            if (data !== null && data.url !== currentURL) {
                rq.same = _sameRoot(data.url, currentURL);
                $window.trigger("pronto.request", e); // Fire request event
                var req3 = function () { //Callback - continue with _render()
                    _render(e, false, false);
                };
                fn(data.url, req3); //Call "fn" - handler of parent, passing URL
            }
        }

        // Push new states to the stack on new url
        function _doPush(url, doPush) {
            currentURL = url;
            if (doPush) {
                history.pushState({
                    url: currentURL
                }, "state-" + currentURL, currentURL);
            } else {
                _saveState();
            }
        }

        // Render HTML
       function _doRender(e, doPush, mode) {
            var url, canURL; //Canonical URL
            url = typeof(e) !== "string" ? e.currentTarget.href || e.originalEvent.state.url : e;
            $window.trigger("pronto.load", e);  // Fire load event

            // Update DOM and fetch canonical URL - important for handling re-directs
            canURL = fn('-', rq, $gthis);
            _saveState(); // Update current state
            
            $('title').html(fn('title').html()); // Update title
            _gaCaptureView(url); // Trigger analytics page view
            
            if(fade) $cd.fadeIn(fade);
            else if(pop) { 
                $cd.css({'opacity': 1 }).effect("scale", {from:{width: cdwidth/2, height: $cd.height()/2}, percent: 100}, pop);
            } else if(squeeze) {
                $cd.animate({width: cdwidth, opacity: 1, marginRight: 0}, squeeze);
            }
			
            //Set current URL to canonical if no hash or parameters in current URl
            if (canURL && canURL != url && !url.iO('#') && !url.iO('?')) url = canURL;

            _ajaxify_forms(true);
            
            //If hash in URL and hash not standalone at the end, animate scroll to it
            if (url.iO('#') && (url.iO('#') < url.length - 1) && mode !== true) { 
                $('html, body').animate({ 
                    scrollTop: $('#' + url.split('#')[1]).offset().top
                }, 500);
            }

            _doPush(url, doPush); // Push new states to the stack on new url
            $window.trigger("pronto.render", e); // Fire render event
            if(cb) cb();
        }

        // Google Analytics support
        function _gaCaptureView(url) { 
            url = url.replace(rootUrl,''); 
            if (typeof window.ga !== 'undefined') window.ga('send', 'pageview', url);
        }

        function _diffHost(link) {
            return (window.location.protocol !== link.protocol || window.location.host !== link.host);
        }

        function _exoticKey(e) {
            return (e.which > 1 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey);
        }

        function _hashChange(link) {
            return (link.hash && link.href.replace(link.hash, '') === window.location.href.replace(location.hash, '') || link.href === window.location.href + '#');
        }
    };

    // Define Plugin
    $.fn.pronto = function (h, options) {
        var $this = $(this);
        if (!$.fn.pronto.o) $.fn.pronto.o = new Pronto(options);
        return $.fn.pronto.o.a($this, h);
    };
})(jQuery);

jQuery.log("Ajaxify loaded...", {verbosity: 2});
