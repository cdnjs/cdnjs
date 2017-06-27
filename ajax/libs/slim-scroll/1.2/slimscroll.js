var scroll = (function(){
    var v = [],
        w = "wrapper",s = "scrollBar",S = "scrollBarContainer",a = "",m = "",
        // properties
        oT = "offsetTop",pE = "parentElement",pes= "previousElementSibling", 
        iH = "innerHTML",cT = "currentTarget",sK = "scroll-k",U = "%",d = ".",
        // IE8 properties 
        // (Dev note: remove below variables from all over the code to exclude IE8 compatibility)
        pN = "parentNode",pS = "previousSibling",sE = "srcElement",
        // Initial function
        useSlimScroll = function(C, p){
            if(C.offsetHeight < C.scrollHeight){
                var h = C[iH],k = v.length, i = v[k] = {}, q = i.E = {};
                // setting user defined classes
                p = p || {};
                q.w = p.wrapperClass || "";
                q.s = p.scrollBarClass || "";
                q.S = p.scrollBarContainerClass || "";
                q.a = p.scrollBarContainerSpecialClass ? " " + p.scrollBarContainerSpecialClass : "";
                q.mH = p.scrollBarMinHeight || 25;
                q.sH = p.scrollBarFixedHeight;  // could be undefined

                C[iH] = "";
                i[w] = cE(q.w, h, C);
                i[S] = cE(q.S + q.a, "", C);
                i[s] = cE(q.s, "", i[S]);
                setValues(k);
                //store the key 'k' in the container
                i[w].setAttribute(sK, k);

                if(p.keepFocus){
                    i[w].setAttribute('tabindex', '-1');
                    i[w].focus();
                }
                // Attaching mouse events
                addEvent('mousedown', i[s], beginScroll);
                addEvent('click', i[S], setScroll);
                // For scroll
                addEvent('scroll', i[w], doScroll);
            }
        },
        setValues = function(k){
            if(typeof k === "number"){
                assignValues(k);
            }
            else{
                for(var j=0;j<v.length;j++){
                    assignValues(j);
                }
            }
        },
        assignValues = function(k){
            var i = v[k], q = i.E;
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
            
            i.reposition = i[s][oT]
        },
        // Start of private functions
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
                p = el[pE] || el[pN],
                k = getAttr(el[pS] || el[pes], sK);

            if(!k) return;
            var i = v[k],q = i.E;

            if(!i || p === i[S]) return;
            var eY = e.pageY || event.clientY,
                top = ((eY - (i[w][pE] || i[w][pN])[oT])/i.h * 100) - i.sP1/2;
            if(top > i.rP1) top = i.rP1;
            else if(top < 0) top = 0;
            i[s].style.top = top + U;
            i[w].scrollTop = top * i.sH1;
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
                el = e[cT] || e[sE],
                k = getAttr((el[pE] || el[pN])[pS], sK),i = v[k];

            addEvent('mousemove', document, moveScroll);
            addEvent('mouseup', document, endScroll);

            i[oT] = i[w][oT];
            i.firstY = e.pageY || event.clientY;
            if(!i.reposition) i.reposition = i[s][oT];
            currentkey = k;
        },
        moveScroll = function(e){
            var e = e || event,
                k = currentkey,i = v[k],q = i.E,
                eY = e.pageY || e.clientY,
                top = (i.reposition + eY - i.firstY)/i.h * 100;

            if(i.rP1 < top) top = i.rP1;
            if(!i.previousTop) i.previousTop = top + 1;
            var blnThreshold = top >= 0 && i.firstY > i.offsetTop;
            if((i.previousTop > top && blnThreshold) || (blnThreshold && (i[w].scrollTop + i.h !== i.sH))){
                i[s].style.top = top + U;
                i.previousTop = top;   
                i[w].scrollTop = top * i.sH1;
            }
            addClass(i[S], q.S);
        },
        endScroll = function(e){
            var e = e || event,k = currentkey,i = v[k], q = i.E; 

            removeEvent('mousemove', document);
            removeEvent('mouseup', document);

            i.reposition = 0;
            addClass(i[S], q.S + q.a);
        },
        doScroll = function(e){
            var e = e || event,
                k = getAttr((e[cT] || e[sE]), sK),i = v[k];
            if(!i) return;
            var q = i.E;
            addClass(i[S], q.S);
            i[s].style.top = i[w].scrollTop/i.sH1 + U;
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
        insertCss = function(){
            // Inserting css rules
            // Link: http://davidwalsh.name/add-rules-stylesheets
            var slim = ".slimScroll",
                imp = " !important",
                pA = "position:absolute"+imp,
                // classes
                w = pA+";overflow:auto"+imp+";left:0px;top:0px"+imp+";right:-18px;bottom:0px"+imp+";padding-right:8px"+imp+";",
                S = pA+";top:0px"+imp+";bottom:0px"+imp+";right:0px;left:auto;width:5px;cursor:pointer"+imp+";padding-right:0px"+imp+";",
                s = pA+";background-color:#999;top:0px;left:0px;right:0px;",
                //creating a sheet
                style = document.createElement('style');
            try{
                // WebKit hack :(
                style.appendChild(document.createTextNode(""));
                document.head.appendChild(style);
                var sheet = style.sheet;
                // adding above css to the sheet
                addCSSRule(sheet, slim + ">div", w, 0);
                addCSSRule(sheet, slim + ">div+div", S, 0);
                addCSSRule(sheet, slim + ">div+div>div", s, 0);
            }
            catch(ex){
                var head = document.getElementsByTagName('head')[0];
                head.appendChild(style);
                style.styleSheet.cssText = slim + ">div{"+w+"}"+slim+">div+div{"+S+"}"+slim+">div+div>div{"+s+"}";
            }
        }();
    return {
        useSlimScroll : useSlimScroll,
        setValues : setValues
    }
})();
