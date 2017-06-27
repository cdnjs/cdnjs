var slimScroll = function(C, payload){


    var i = {},
        _this = this,
        w = "wrapper",s = "scrollBar",S = "scrollBarContainer",a = "",m = "",l="data-slimscroll",
        // properties
        oT = "offsetTop",sT = "scrollTop",pE = "parentElement",pes= "previousElementSibling",
        iH = "innerHTML",cT = "currentTarget",sK = "scroll-k",U = "%",d = ".",
        // IE8 properties
        // (Dev note: remove below variables from all over the code to exclude IE8 compatibility)
        pN = "parentNode",pS = "previousSibling",sE = "srcElement",
        assignValues = function(k){
            if(!_this.initInProcess){
                if(!_this.initDone){           // If I object is empty
                    _this.init();    // Initialize again
                }

                if(!scrollBarVisible(i[w])){
                    removeSlimScroll();
                    return;
                }
            }

            // hide the scrollbar temporarily to take the calculations correctly
            i[w].setAttribute("style", "overflow: hidden !important");
            var q = i.E;
            i.h = i[S].offsetHeight;
            i.sH = i[w].scrollHeight;
            i.sP = (i.h/i.sH) * 100;
            // i.sbh is scroll bar height in pixels without pixel unit.
            i.sbh = i.sP * i.h/100;
            // Manually set the height of the scrollbar (in percentage)
            // if user hasn't provided the fixed scroll height value
            if(!q.sH) i.sP1 = i.sbh < q.mH? (q.mH/i.h * 100): i.sP;
            else i.sP1 = q.sH/i.h * 100;

            i.rP1 = 100 - i.sP1;
            i.x = (i.sH - i.h) * ((i.sP1 - i.sP)/(100 - i.sP));
            i.sH1 = Math.abs((i.x / (i.rP1)) + (i.sH/100));
            i[s].style.height = i.sP1 + U;

            i.reposition = getReposition(i[s], i.h);
        },
        // Start of private functions
        setAttr = function(e, p, v){
            e.setAttribute(p,v);
        },
        getAttr = function(e, p){
            if(!e) return;
            return e.getAttribute(p);
        },
        addClass = function(e, c){
            if(c.length) e.className = c;
        },
        cE = function(c, h, p){
            var d = document.createElement('div');
            addClass(d, c);
            d[iH] = h;
            p.appendChild(d);
            return d;
        },
        setScroll = function(e){
            var e = e || event,el = e.target || event[sE],
                p = el[pE] || el[pN];
            var q = i.E;

            if(!i || p === i[S]) return;
            var eY = e.pageY || event.clientY,
                top = ((eY - getTop(i[w][pE] || i[w][pN]))/i.h * 100) - i.sP1/2;
            if(top > i.rP1) top = i.rP1;
            else if(top < 0) top = 0;
            i[s].style.top = top + U;
            i[w][sT] = top * i.sH1;
            addClass(i[S], q.S + q.a);
        },
        beginScroll = function(e){
            // removing selected text
            // Link: http://stackoverflow.com/a/3171348
            var sel = window.getSelection ? window.getSelection() : document.selection;
            if (sel) {
                if (sel.removeAllRanges) sel.removeAllRanges();
                else if (sel.empty) sel.empty();
            }
            var e = e || event,
                el = e[cT] || e[sE];

            addEvent('mousemove', document, moveScroll);
            addEvent('mouseup', document, endScroll);

            i[oT] = getTop(i[w]);
            i.firstY = e.pageY || event.clientY;
            if(!i.reposition) i.reposition = getReposition(i[s], i.h);
            // Disable text selection while dragging the scrollbar
            return false;
        },
        getReposition = function(i, h){
            var x = parseInt(i.style.top.replace(U,""),10) * h/100;
            return x?x:0;
        },
        moveScroll = function(e){
            var e = e || event,
                q = i.E,
                eY = e.pageY || e.clientY,
                top = (i.reposition + eY - i.firstY)/i.h * 100;

            if(i.rP1 < top) top = i.rP1;
            if(!i.previousTop) i.previousTop = top + 1;
            var blnThreshold = top >= 0 && i.firstY > i[oT];
            if((i.previousTop > top && blnThreshold) || (blnThreshold && (i[w][sT] + i.h !== i.sH))){
                i[s].style.top = top + U;
                i.previousTop = top;
                i[w][sT] = top * i.sH1;
            }
            addClass(i[S], q.S);
        },
        endScroll = function(e){
            var e = e || event,q = i.E;

            removeEvent('mousemove', document);
            removeEvent('mouseup', document);

            i.reposition = 0;
            addClass(i[S], q.S + q.a);
        },
        doScroll = function(e){
            var e = e || event;
            if(!i) return;
            var q = i.E;
            addClass(i[S], q.S);
            i[s].style.top = i[w][sT]/i.sH1 + U;
            addClass(i[S], q.S + q.a);
        },
        addEvent = function(e, el, func){
            el['on' + e] = func;
            // el.addEventListener(e, func, false);
        },
        removeEvent = function(e, el){
            el['on' + e] = null;
            // el.removeEventListener(e, func, false);
        },
        addCSSRule = function(S, s, r, i) {
            if(S.insertRule) S.insertRule(s + "{" + r + "}", i);
            else if(S.addRule) S.addRule(s, r, i);
        },
        getTop = function(el){
            var t = document.documentElement[sT];
            return el.getBoundingClientRect().top + (t?t:document.body[sT]);
        },
        insertCss = function(){
            if(!window.slimScrollStylesApplied){
                if(_this.isSlimScrollInserted){
                    _this.initInProcess = false;
                    return;
                }
                // Inserting css rules
                // Link: http://davidwalsh.name/add-rules-stylesheets
                var slim = "["+l+"]",
                    imp = " !important",
                    pA = "position:absolute"+imp,
                    // classes
                    w = pA+";overflow:auto"+imp+";left:0px;top:0px"+imp+";right:0px;bottom:0px"+imp+";padding-right:8px"+imp+";",
                    S = pA+";top:0px"+imp+";bottom:0px"+imp+";right:0px;left:auto;width:5px;cursor:pointer"+imp+";padding-right:0px"+imp+";",
                    s = pA+";background-color:#999;top:0px;left:0px;right:0px;",
                    //creating a sheet
                    style = document.createElement('style'),
                    scrollBar = "[data-scrollbar]";
                try{
                    // WebKit hack :(
                    style.appendChild(document.createTextNode(""));
                }catch(ex){}

                var head =  document.head || document.getElementsByTagName('head')[0];

                // adding above css to the sheet
                head.insertBefore(style, (head.hasChildNodes())
                                    ? head.childNodes[0]
                                    : null);
                var sheet = style.sheet;
                if(sheet){
                    addCSSRule(sheet, slim+">div", w, 0);
                    addCSSRule(sheet, slim+">div+div", S, 0);
                    addCSSRule(sheet, scrollBar, s, 0);
                }
                else{
                    style.styleSheet.cssText = slim+">div{"+w+"}"+slim+">div+div"+"{"+S+"}"+slim+">div+div>div{"+s+"}";
                }
                _this.isSlimScrollInserted = true;
                window.slimScrollStylesApplied = true;
            }
        },
        removeSlimScroll = function(){
            C.removeAttribute(l);  //reset
            if(_this.isSlimScrollInserted){
                C.innerHTML = C.firstChild.innerHTML;
            }
            _this.isSlimScrollInserted = false;
            _this.initDone = false;

        },
        scrollBarVisible = function(x){
            if(!x) x = C;
            return x.offsetHeight < x.scrollHeight;
        },
        // Initial function
        init = function(){
            removeSlimScroll();
            if(scrollBarVisible()){
                _this.initDone = true;
                _this.initInProcess = true;
                setAttr(C, l, '1');
                insertCss();
                var h = C[iH], q = i.E = {};
                // setting user defined classes
                payload = payload || {};
                q.w = payload.wrapperClass || "";
                q.s = payload.scrollBarClass || "";
                q.S = payload.scrollBarContainerClass || "";
                q.a = payload.scrollBarContainerSpecialClass ? " " + payload.scrollBarContainerSpecialClass : "";
                q.mH = payload.scrollBarMinHeight || 25;
                q.sH = payload.scrollBarFixedHeight;  // could be undefined

                C[iH] = "";
                i[w] = cE(q.w, h, C);
                i[S] = cE(q.S + q.a, "", C);
                i[s] = cE(q.s, "", i[S]);
                setAttr(i[s], 'data-scrollbar', '1');
                assignValues();

                // Show the default scrollbar to get the scrollbar width
                i[w].style.overflow = "";
                var scrollBarWidth = i[w].offsetWidth - i[w].clientWidth;
                // Stretching the inner container so that the default scrollbar is completely invisible
                if(Math.abs(scrollBarWidth) < 5){
                    // Seems scrollbar isn't taking width.
                    // So we can safely assume that the scrollbar looks beautiful
                    // Hence, lets not modify the default scrollbar
                    // Mostly, the scrollbar looks beautiful on Mac OSX

                    // Removing our custom scroll component
                    C.removeChild(i[S]);
                    // returning to avoid further process
                    _this.initInProcess = false;
                    _this.isSlimScrollInserted = false;
                    return false;
                }
                else{
                    i[w].style.right = -scrollBarWidth + "px";
                    _this.isSlimScrollInserted = true;
                }
                if(payload.keepFocus){
                    setAttr(i[w], 'tabindex', '-1');
                    i[w].focus();
                }
                // Attaching mouse events
                addEvent('mousedown', i[s], beginScroll);
                addEvent('click', i[S], setScroll);
                // For scroll
                addEvent('scroll', i[w], doScroll);
                // addEvent('selectstart', i[S], function(){return;});
                _this.initInProcess = false;
            }
            else{
                removeSlimScroll();
                return;     // don't do any further operations
            }
        };

        _this.resetValues = assignValues;
        _this.init = init;
        init();
    return _this;
};
