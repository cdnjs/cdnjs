'use strict';

!function(){
    if(!console){
        console = {
            log: function(){},
            error: function(){}
        }
    }

    ////////// IE8 /////////////
    if (!Object.create) {
        Object.create = (function(){
            function F(){}

            return function(o){
                if (arguments.length != 1) {
                    throw new Error('Object.create implementation only accepts one parameter.');
                }
                F.prototype = o;
                return new F();
            }
        })()
    }
    if (!Function.prototype.bind) {
        Function.prototype.bind = function (oThis) {
            if (typeof this !== "function") {
                // closest thing possible to the ECMAScript 5 internal IsCallable function
                throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
            }

            var aArgs = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                fNOP = function () {},
                fBound = function () {
                    return fToBind.apply(this instanceof fNOP && oThis
                        ? this
                        : oThis,
                        aArgs.concat(Array.prototype.slice.call(arguments)));
                };

            fNOP.prototype = this.prototype;
            fBound.prototype = new fNOP();

            return fBound;
        };
    }
    ////////// END IE8 /////////////

    var Rimg = function() {
        var hidden = {
            status : 'init',
            observer : null,
            breakpoints : [],
            images: [],
            offset:{x:100,y:100},
            resizeInfo:{wait:null,time:null},
            resizeDimensions: {width:0,height:0},
            disableIntrospection: false,
            disableLazyLoading: false,
            isIE8: false
        };

        if(window.addEventListener === undefined){
            hidden.isIE8 = true;
        }

        function parseBreakpoints(value){
            //custom: (once) -small 640w 1x, -retina-small 640w 2x, -medium 1280w 1x, -retina-medium 1280w 2x
            //custom: (per image) data-src="image.jpg"
            if(typeof value === 'string'){
                var breakpoints = value.split(',');
                if(breakpoints.length === 0){
                    //invalid
                    hidden.status = 'error';
                    console.error('Rimg: your breakpoint-definition '+ value +' is invalid, check the documentation.');
                    return null;
                }
                var definition = [];
                var i = 0;
                var il = breakpoints.length;
                while(i<il){
                    var bp = breakpoints[i];
                    var bpDefinition = {
                        src: [],
                        width: -1,
                        height: -1,
                        pixelRatio: [],
                        getSrc: function(value){
                            var ratios = this.pixelRatio.length;
                            if(ratios === 0){
                                hidden.status = 'error';
                                console.error('Rimg: missing a pixelRatio definition, check the documentation.');
                                return '';
                            }else if(ratios === 1){
                                return this.src[0];
                            }else if(ratios === 2){
                                if(value <= 1){
                                    return this.src[0];
                                }else{
                                    return this.src[1];
                                }
                            }else{
                                //determine which pixelRatio matches most closely with current device pixel ratio.
                                var s = 0;
                                var sl = this.pixelRatio.length;
                                while(s<sl){
                                    //possible that pixelRatio is 1.5 or 2.25
                                    if(value === this.pixelRatio[s] || Math.round(value) === this.pixelRatio[s]){
                                        return this.src[s];
                                    }
                                    s++;
                                }
                                //use last reference
                                return this.src[ratios-1];
                            }
                        }
                    };
                    var parts = bp.split(' ');
                    var p = 0;
                    var pl = parts.length;
                    while(p<pl){
                        var part = parts[p];
                        if(part.replace(' ','') === ''){
                            //ignore, empty = typo
                        }else{
                            if(part.match(/^[0-9]{0,4}w/gi) !== null){
                                bpDefinition.width = Number(part.substr(0,part.length-1));
                            }else if(part.match(/^[0-9]{0,4}h/gi) !== null){
                                bpDefinition.height = Number(part.substr(0,part.length-1));
                            }else if(part.match(/[0-9]{1}x/gi) !== null){
                                bpDefinition.pixelRatio.push(Number(part.substr(0,part.length-1)));
                            }else{
                                bpDefinition.src.push(part);
                            }
                        }
                        p++;
                    }

                    //check if already defined (pixelRatio)
                    var d = 0;
                    var dl = definition.length;
                    var found = false;
                    while(d<dl){
                        var def = definition[d];
                        if((def.width === bpDefinition.width  && def.width !== -1) || (def.height === bpDefinition.height && def.height !== -1)){
                            //a match
                            def.pixelRatio.push(bpDefinition.pixelRatio[0]);
                            def.src.push(bpDefinition.src[0]);
                            found = true;
                            break;
                        }
                        d++;
                    }
                    if(!found){
                        //new breakpoint definition
                        definition.push(bpDefinition);
                    }

                    i++;
                }
                if(definition.length > 0){
                    return definition;
                }else{
                    hidden.status = 'error';
                    console.error('Rimg: your breakpoint-definition misses valid breakpoints, check the documentation.');
                    return null;
                }
            }else{
                //invalid
                hidden.status = 'error';
                console.error('Rimg: your breakpoint-definition is not a String, check the documentation.');
                return null;
            }
        }

        //discover initial settings
        if(typeof window.RimgOptions !== 'undefined'){
            //validate
            var bpts = parseBreakpoints(window.RimgOptions.breakpoint);
            if(bpts !== null){
                hidden.breakpoints = bpts;
            }
            if(window.RimgOptions.disableIntrospection === true){
                hidden.disableIntrospection = true;
            }
            if(window.RimgOptions.disableLazyLoading === true){
                hidden.disableLazyLoading = true;
            }
            if(window.RimgOptions.offset != null && typeof window.RimgOptions.offset.x === 'number' && typeof window.RimgOptions.offset.y === 'number'){
                hidden.offset.x = window.RimgOptions.offset.x;
                hidden.offset.y = window.RimgOptions.offset.y;
            }
            //clean reference
            window.RimgOptions = undefined;
        }else{
            console.log('(remark) Rimg: no breakpoints defined (yet), check the documentation or manually adjust it.');
        }

        function event(type,evt,func,target){
            //add/remote event listeners
            if(target === undefined){
                target = document;
            }
            if(evt === 'resize'){
                target = window;
            }
            if(hidden.isIE8){
                //switch events to add correct responsive support
                if(evt === 'DOMContentLoaded'){
                    evt = 'onreadystatechange';
                }
                if(evt === 'resize'){
                    evt = 'onresize';
                }
                if(type === 'add'){
                    target.attachEvent(evt,func);
                }else{
                    target.detachEvent(evt,func);
                }
            }else{
                if(type === 'add'){
                    target.addEventListener(evt,func,false);
                }else{
                    target.removeEventListener(evt,func,false);
                }
            }
        }

        function addImage(value){
            //add an image but check if it already is saved
            var i = 0;
            var il = hidden.images.length;
            var found = false;
            while(i<il){
                if(hidden.images[i] === value){
                    found = true;
                    break;
                }
                i++;
            }
            if(!found){
                hidden.images.push(value);
            }
        }

        function adjust(value){
            var visible = true;
            if(!hidden.disableLazyLoading){
                //TODO readme-request : min-height (CSS) is needed + CSS is rule with RIMG! = don't know size when not yet loaded!
                //calculate bounding rect & check if in browser window range
                var rect = value.getBoundingClientRect();
                visible = !(
                    ((rect.top + rect.height) < (-hidden.offset.y)) ||
                    (rect.top > (-hidden.offset.y + hidden.resizeDimensions.height + hidden.offset.y)) ||
                    ((rect.left + rect.width) < -hidden.offset.x) ||
                    (rect.left > (-hidden.offset.x + hidden.resizeDimensions.width + hidden.offset.x))
                );
            }
            //change src property when appropriate
            var ratio = window.devicePixelRatio || 1;
            var data = value.getAttribute('data-src');
            if(data !== null && visible){
                //only adjust images with data-src property
                var file = data.substr(0,data.lastIndexOf('.'));
                var extension = data.substr(data.lastIndexOf('.'));
                var size = {x:value.width,y:value.height};
                //firefox presents width/height with 0, so check getComputedStyle if necessary:
                if(value.width === 0){
                    size.x = window.getComputedStyle(value,null).maxWidth;
                    size.x = size.x.replace('px','');
                    size.x = Number(size.x);
                }
                if(value.height === 0){
                    size.y = window.getComputedStyle(value,null).maxHeight;
                    size.y = size.y.replace('px','');
                    size.y = Number(size.y);
                }
                var i = 0;
                var il = hidden.breakpoints.length;
                var breakpoint;
                while(i<il){
                    var bp = hidden.breakpoints[i];
                    var wd = size.x;
                    //TODO needed or height not important? = not needed when window (due to debugging) is smaller ....or clientWidth bug? (orientation?)
                    if(size.x < size.y){
//                        wd = size.y;
                    }
                    if(wd <= bp.width){
                        breakpoint = bp;
                        break;
                    }
                    i++;
                }
                if(breakpoint === undefined){
                    //use latest
                    breakpoint = hidden.breakpoints[hidden.breakpoints.length-1];
                }

                if(value.getAttribute('src') !== file+breakpoint.getSrc(ratio)+extension){
                    //set the appropriate version of the image
                    value.setAttribute('src',file+breakpoint.getSrc(ratio)+extension);
                }
            }
        }

        function inspect(value){
            //check node itself if it is an image or has children
            if(value.nodeName.toLowerCase() === 'img'){
                addImage(value);
                adjust(value);
            }else{
                //walk through all node children until you find img files
                var i = 0;
                var il = value.children.length;
                while(i<il){
                    var item = value.children[i];
                    inspect(item);
                    i++;
                }
            }
        }

        function adjustImages(){
            var i = 0;
            var il = hidden.images.length;
            while(i<il){
                adjust(hidden.images[i]);
                i++;
            }
        }

        function checkDimensions(){
            //execute only with different window dimensions (on mobile executed twice!)
            var wd,hg;
            if(hidden.isIE8){
                wd = document.body.clientWidth;
                hg = document.body.clientHeight;
            }else{
                wd = window.innerWidth;
                hg = window.innerHeight;
            }
            var changed = false;
            if(hidden.resizeDimensions.width !== wd || hidden.resizeDimensions.height !== hg){
                hidden.resizeDimensions.width = wd;
                hidden.resizeDimensions.height = hg;
                changed = true;
            }
            return changed;
        }

        function resize(){
            //window is resized, execute checkup, if necessary
            clearTimeout(hidden.resizeInfo.wait);

            if(checkDimensions()){
                //adjust image sources, if necessary
                adjustImages();
            }

            //outside to ensure correct timing difference
            hidden.resizeInfo.time = new Date().getTime();
        }

        function nodeInserted(e){
            //walk through DOM to inspect itself & its children
            this.execute(e.target);
        }

        return {
            version: '1.5.0',
            execute: function(target){
                //only possible when DOM is loaded and no errors appeared
                if(hidden.status === 'error'){
                    console.error('Rimg.execute(): error-status so no actions can be executed, check your code.');
                    return;
                }else if(target === undefined){
                    console.error('Rimg.execute(): undefined value, check your code to add a valid DOM element to this function.');
                    return;
                }else if(hidden.breakpoints.length === 0){
                    console.log('(remark) Rimg.execute(): no breakpoints defined (yet), probably because of manual control.');
                    return;
                }
                if(target.nodeName === '#document'){
                    //clean images array, due to reset
                    hidden.images.splice(0,hidden.images.length);

                    if(target.childNodes.length > 1){
                        //find html node
                        var html;
                        if(target.childNodes[1].nodeName !== 'HTML'){
                            //needed to skip HTML comments which are detected as nodes
                            var i = 0;
                            var il = target.childNodes.length;
                            while(i<il){
                                if(target.childNodes[i].nodeName === 'HTML'){
                                    html = target.childNodes[i];
                                    break;
                                }
                                i++;
                            }
                        }else{
                            //second option is <html>
                            html = target.childNodes[1];
                        }
                        //find body node
                        if(html.childNodes[1].nodeName !== 'BODY'){
                            var i = 0;
                            var il = html.childNodes.length;
                            while(i<il){
                                if(html.childNodes[i].nodeName === 'BODY'){
                                    inspect(html.childNodes[i]);
                                    break;
                                }
                                i++;
                            }
                        }else{
                            //second option is <body>
                            inspect(html.childNodes[1]);
                        }
                    }else{
                        console.error('Rimg.execute(): not a valid DOM representation, check your code.');
                    }
                }else{
                    if(target !== undefined && target.nodeName !== undefined && target.nodeName.toLowerCase() === 'img'){
                        //direct reference
                        inspect(target);
                    }else if(target[0] !== undefined && target[0].nodeName.toLowerCase() === 'img'){
                        //child reference (after add)
                        inspect(target[0]);
                    }else{
                        //no <img> element found
                    }
                }
            },
            configure: function(value){
                if(!(value instanceof Object)){
                    console.error('Rimg: your definition is not an object, check the documentation.');
                    return;
                }
                if(value.breakpoint){
                    var breakpoints = parseBreakpoints(value.breakpoint);
                    if(breakpoints !== null){
                        hidden.breakpoints = breakpoints;
                    }
                }
                if(value.disableIntrospection === true){
                    hidden.disableIntrospection = true;
                }
                if(value.disableLazyLoading === true){
                    hidden.disableLazyLoading = true;
                }
                if(value.offset != null && typeof value.offset.x === 'number' && typeof value.offset.y === 'number'){
                    hidden.offset.x = value.offset.x;
                    hidden.offset.y = value.offset.y;
                }

                if(hidden.status === 'ready' && !hidden.disableIntrospection){
                    //save dimensions
                    checkDimensions();

                    //if DOM loaded, execute right away
                    this.execute(document);
                }
            },
            resized: function(e){
                if(hidden.status !== 'ready'){
                    //not available anymore
                    return;
                }

                //cleanup
                if(hidden.resizeInfo.wait !== null){
                    clearTimeout(hidden.resizeInfo.wait);
                }

                //TODO (clear)timeout more useful?
                if(hidden.resizeInfo.time === null || new Date().getTime() - hidden.resizeInfo.time > 1000){
                    //first time || long ago
                    resize.bind(this)();
                }else{
                    //wait 100ms to ensure performant and not a blocking script execution
                    hidden.resizeInfo.wait = setTimeout(resize.bind(this),100);
                }
            },
            scrolled: function(e){
                if(!hidden.disableLazyLoading){
                    //execute directly for best performance / feel = "skip" will be done at adjustment check
                    adjustImages();
                }
            },
            loaded: function(e){
                if(hidden.status !== 'progress'){
                    //not available anymore
                    return;
                }
                if(hidden.isIE8 && document.readyState != 'complete'){
                    return;
                }

                //cleanup listener
                event('remove','DOMContentLoaded',this.loaded);

                //save dimensions
                checkDimensions();

                //initial DOM checkup
                if(!hidden.disableIntrospection){
                    // DOM content loaded
                    if (hidden.observer === null) {
                        //check the whole page before any changes happen
                        this.execute(document);
                    }else{
                        hidden.observer.observe(document.body, {
                            attributes: true,
                            childList: true,
                            characterData: false,
                            subtree: true,
                            attributeFilter: ['data-src']
                        });
                        //check full DOM
                        this.execute(document);
                    }

                    //listen for browser resize
                    event('add','resize',this.resized.bind(this));
                }

                //initial scrolling listener
                if(!hidden.disableLazyLoading){
                    event('add','scroll',this.scrolled.bind(this));
                }
                hidden.status = 'ready';
            },
            disableLazyLoading: function(){
                hidden.disableLazyLoading = true;
            },
            disableIntrospection: function(){
                hidden.disableIntrospection = true;

                //remove mutation listeners
                if(hidden.observer){
                    hidden.observer.disconnect();
                }else{
                    event('remove','DOMNodeInserted',nodeInserted);
                }
            },
            initialize: function(){
                if(hidden.status !== 'init'){
                    if(hidden.status !== 'error'){
                        console.error('Rimg.initialize(): Already initialized. No forced initialization supported, check your code.');
                    }
                    return;
                }

                //listen for DOM & change events
                var base = this;
                var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
                if (MutationObserver === undefined || hidden.isIE8) {
                    event('add','DOMAttrModified',function(e){
                        //DOM attribute modified, not supported in webkit (will use MutationObserver there)
                        base.execute(e.target);
                    });
                    //TODO issues with IE9 - http://help.dottoro.com/ljmcxjla.php
                    event('add','DOMNodeInserted',nodeInserted.bind(base));
                    //ignore DOMSubtreeModified while DOMAttrModified is used, while performance does not allow 2 listeners
                }else{
                    hidden.observer = new MutationObserver(function(mutations) {
                        mutations.forEach(function(mutation) {
                            if(mutation.addedNodes.length > 0){
                                base.execute(mutation.addedNodes);
                            }else if(mutation.attributeName === 'data-src'){
                                base.execute(mutation.target);
                            }
                        });
                    });
                }
                hidden.status = 'progress';

                //check current DOM status (already loaded?) = async support
                if((document.readyState === 'interactive' || document.readyState === 'complete') && document.body){
                    this.loaded.bind(this)();
                }else{
                    // wait until DOM is loaded
                    event('add','DOMContentLoaded',this.loaded.bind(this));
                }
            }
        };
    };

    // browser
    window.Rimg = Object.create(Rimg());

    // start listening
    window.Rimg.initialize();
}();