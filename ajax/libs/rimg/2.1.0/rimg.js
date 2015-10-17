'use strict';

!function(){
    if(!console){
        console = {
            log: function(){},
            error: function(){}
        };
    }

    ////////// IE8 SUPPORT /////////////
    if (!Object.create) {
        Object.create = (function(){
            function F(){}

            return function(o){
                if (arguments.length != 1) {
                    throw new Error('Object.create implementation only accepts one parameter.');
                }
                F.prototype = o;
                return new F();
            };
        })();
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
                    return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
                };

            fNOP.prototype = this.prototype;
            fBound.prototype = new fNOP();

            return fBound;
        };
    }
    ////////// END IE8 SUPPORT /////////////

    var Rimg = function() {
        var hidden = {
            status : 'init',
            observer : null,
            breakpoints : [],
            images: [],
            imageEvents:{changed:0,errors:0},
            imagesLoaded:null,
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

        function getSrc(value){
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
                        pixelRatio: [],
                        getSrc: getSrc
                    };

                    //find border definitions
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
                            }else if(part.match(/[0-9]{1}x$/gi) !== null){
                                //only match 1x, 2x at the end, so paths can also have 320x in their name
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
                        if((def.width === bpDefinition.width  && def.width !== -1)){
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

        function getType(data,type,value){
            //check the asset to determine what kind of metadata needs to be set
            var src;
            var property = '';
            if(type === 'img') {
                //default <img>
                property = 'data-src';
            }else {
                property = 'data-background-image';
            }
            src = value.getAttribute(property);
            if(src === null){
                //no data-src / data-background-image set, so ignore
                data.ignore = true;
            }else{
                if((data.path !== undefined && data.path !== src) ||
                    data.path === undefined
                ){
                    //not yet set or different
                    data.path = src;
                    if(property === 'data-background-image') {
                        data.background = true;
                    }else{
                       data.background = false;
                    }
                    data.extension = getExtension(src);
                }
            }

            //ignore incompatible formats like SVG and GIF
            if(data.extension === 'gif' ||
               data.extension === 'svg'
            ){
                //you do not need to alter this node, so add meta-information to skip alteration of the DOM
                data.ignore = true;
            }else if(data.ignore === undefined){
                data.ignore = false;
            }
        }

        function exists(item){
            //check if entry exists already
            var l = 0;
            var ll = hidden.images.length;
            var found = false;
            while(l<ll){
                if(hidden.images[l].target === item){
                    found = true;
                    break;
                }
                l++;
            }
            if(found){
                return hidden.images[l];
            }else{
                return null;
            }
        }

        function find(target){
            //find all images in the DOM
            var items = document.querySelectorAll('img');
            var i = 0;
            var il = items.length;
            var item,obj,reference;
            while(i<il){
                item = items[i];
                //check if entry exists already
                reference = exists(item);
                if(reference === null){
                    //new item, so add with meta-information to speed up switching
                    obj = {
                        target: item,
                        enabled: !hidden.disableIntrospection //ensure a property exists to check during update()
                    };
                    getType(obj,'img',item);
                    hidden.images.push(obj);
                    reference = obj;
                }else{
                    if(hidden.disableIntrospection) {
                        reference.enabled = !hidden.disableIntrospection;
                    }

                    //found, but check if properties are up-to-date
                    getType(reference,'img',item);
                }
                //if disableIntrospection=true, only update/show the one that is enabled
                if(target && reference.target === target && hidden.disableIntrospection){
                    reference.enabled = true;
                }
                i++;
            }

            //find all background images
            items = document.querySelectorAll('[data-background-image]');
            i = 0;
            il = items.length;
            while(i<il){
                item = items[i];
                //check if entry exists already
                reference = exists(item);
                if(reference === null){
                    //new item, so add with meta-information to speed up switching
                    obj = {
                        target: item,
                        enabled: !hidden.disableIntrospection //ensure a property exists to check during update()
                    };
                    getType(obj,'background',item);
                    hidden.images.push(obj);
                    reference = obj;
                }else{
                    //found, but check if properties are up-to-date
                    getType(reference,'background',item);
                }

                //if disableIntrospection=true, only update/show the one that is enabled
                if(target && reference.target === target && hidden.disableIntrospection){
                    reference.enabled = true;
                }
                i++;
            }

            update();
        }

        function update(){
            //update the DOM-entries with their corresponding src-property
            var i = 0;
            var il = hidden.images.length;
            var visible;
            var ratio = window.devicePixelRatio || 1;
            while(i<il){
                var item = hidden.images[i];
                if(!item.ignore && item.enabled){
                    //check if image / container needs to be updated
                    visible = true;
                    if(!hidden.disableLazyLoading){
                        //calculate bounding rect & check if in browser window range
                        var rect = item.target.getBoundingClientRect();
                        visible = !(
                        ((rect.top + rect.height) < (-hidden.offset.y)) ||
                        (rect.top > (-hidden.offset.y + hidden.resizeDimensions.height + hidden.offset.y)) ||
                        ((rect.left + rect.width) < -hidden.offset.x) ||
                        (rect.left > (-hidden.offset.x + hidden.resizeDimensions.width + hidden.offset.x))
                        );
                    }

                    //change src property when appropriate
                    var currentPath;
                    if(item.background){
                        currentPath = item.target.getAttribute('data-background-image');
                    }else{
                        currentPath = item.target.getAttribute('data-src');
                    }
                    if(currentPath !== null && currentPath !== '' && visible){
                        //only adjust images / containers with data-xxx properties
                        var file = currentPath.substr(0,currentPath.lastIndexOf('.'));
                        var extension = item.extension;
                        var size = {x:item.target.width};
                        var property;
                        //backgroundImage has no maxWidth, but just width/height so use it for backgroundImage +
                        //firefox presents width/height with 0, so check getComputedStyle if necessary:
                        if(item.target.width === 0 || item.target.width === undefined){
                            if(item.background){
                                property = 'width';
                            }else{
                                property = 'maxWidth';
                            }
                            size.x = window.getComputedStyle(item.target,null)[property];
                            size.x = size.x.replace('px','');
                            size.x = Number(size.x);
                        }
                        var b = 0;
                        var bl = hidden.breakpoints.length;
                        var breakpoint = undefined;
                        while(b<bl){
                            var bp = hidden.breakpoints[b];
                            var wd = size.x;
                            if(wd > bp.width) {
                                breakpoint = bp;
                            }else if(wd == bp.width){
                                breakpoint = bp;
                                break;
                            }else if(wd < bp.width){
                                //border found
                                breakpoint = bp;
                                break;
                            }
                            b++;
                        }
                        if(breakpoint === undefined){
                            //use first
                            breakpoint = hidden.breakpoints[0];
                        }

                        // empty when manual setup
                        if (breakpoint) {
                            //all information gathered, set new src-property
                            var changed = false;
                            var newURL = file+breakpoint.getSrc(ratio)+'.'+extension;
                            if(!item.background && item.target.getAttribute('src') !== newURL){
                                //set the appropriate version of the image
                                item.target.setAttribute('src',newURL);
                                changed = true;
                            }else if(item.background && item.target.style.backgroundImage.indexOf(newURL) === -1){
                                item.target.style.backgroundImage = 'url('+newURL+')';
                                changed = true;
                            }
                            if(changed){
                                //the source image has changed, so check the load to execute final complete function
                                hidden.imageEvents.changed++;

                                event('add','load',imageEvent,item.target);
                                event('add','error',imageEvent,item.target);
                            }
                        }
                    }
                    //not visible so ignore further actions
                }else if(item.ignore && (item.extension === 'svg' || item.extension === 'gif')){
                    if(item.background){
                        var style = item.target.getAttribute('style');
                        if(style){
                            var pos = style.indexOf('background-image');
                            //check if path is different
                            if(style.indexOf(item.path) === -1){
                                if(style && pos === -1){
                                    //some style exist but not background-image
                                    style = 'background-image: url('+item.path+');'+style;
                                }else if(style && pos !== -1) {
                                    //some style definitions already exist
                                    var backgroundStartPosition = style.substr(pos);
                                    var backgroundEndPosition = backgroundStartPosition.indexOf(';');
                                    if (backgroundEndPosition === undefined) {
                                        backgroundEndPosition = backgroundStartPosition.length;
                                    }
                                    style = style.substr(0, pos) + 'background-image: url(' + item.path + ');' + style.substr(backgroundEndPosition+1);
                                }
                                item.target.setAttribute('style',style);
                            }
                        }else{
                            //no styling added as a node-style-attribute
                            style = 'background-image: url('+item.path+');';
                            item.target.setAttribute('style',style);
                        }
                    }else{
                        //just copy assets due to SVG/GIF
                        if(item.target.getAttribute('src') !== item.path){
                            item.target.setAttribute('src',item.path);
                        }
                    }
                }
                i++;
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
            //do not set !== null while it halts execution!
            if(window.RimgOptions.offset != null && typeof window.RimgOptions.offset.x === 'number' && typeof window.RimgOptions.offset.y === 'number'){
                hidden.offset.x = window.RimgOptions.offset.x;
                hidden.offset.y = window.RimgOptions.offset.y;
            }
            if(window.RimgOptions.complete !== null && typeof window.RimgOptions.complete === 'function'){
                hidden.imagesLoaded = window.RimgOptions.complete;
            }
            //clean reference
            window.RimgOptions = undefined;
        }else{
            console.error('(remark) Rimg: no breakpoints defined (yet), check the documentation or manually adjust it.');
        }

        function imageEvent(e){
            //listen for all images to be loaded, to execute "complete"-log
            hidden.imageEvents.changed--;
            if(e.type === 'error'){
                hidden.imageEvents.errors++;
            }

            if(hidden.imageEvents.changed === 0){
                //all images loaded
                if(hidden.imagesLoaded){
                    hidden.imagesLoaded(hidden.imageEvents.errors > 0 ? true : false);
                }
            }
            //remove listeners to minimize memory footprint / leakages
            if(e.path && e.path.length > 0){
                event('remove','load',imageEvent, e.path[0]);
                event('remove','error',imageEvent, e.path[0]);
            }
        }

        function event(type,evt,func,target){
            //add/remote event listeners due to IE8 support
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

        function getExtension(value){
            //find the extension of the value (URL)
            if(value){
                return value.substr(value.lastIndexOf('.') + 1).toLowerCase();
            }
            return null;
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
                update();
            }

            //outside to ensure correct timing difference
            hidden.resizeInfo.time = new Date().getTime();
        }

        function nodeInserted(e){
            //walk through DOM to inspect itself & its children
            this.execute(e.target);
        }

        return {
            version: '2.1.0',
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
                //only need
                find(target);
            },
            configure: function(value){
                //provide new configuration to adapt to
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
                if(value.offset !== undefined && typeof value.offset.x === 'number' && typeof value.offset.y === 'number'){
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
                //resize-event captured, determine if resize-action needs to be called
                if(hidden.status !== 'ready'){
                    //not available anymore
                    return;
                }

                //cleanup
                if(hidden.resizeInfo.wait !== null){
                    clearTimeout(hidden.resizeInfo.wait);
                }

                if(hidden.resizeInfo.time === null || new Date().getTime() - hidden.resizeInfo.time > 1000){
                    //first time || long ago
                    resize.bind(this)();
                }else{
                    //wait 100ms to ensure performant and not a "blocking" script execution
                    hidden.resizeInfo.wait = setTimeout(resize.bind(this),100);
                }
            },
            scrolled: function(e){
                //scroll-event captured, update if possible
                if(!hidden.disableLazyLoading){
                    //execute directly for best performance / feel = "skip" will be done at adjustment check
                    update();
                }
            },
            loaded: function(e){
                //DOM is loaded, find metadata
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
                    if (hidden.observer !== null) {
                        hidden.observer.observe(document.body, {
                            attributes: true,
                            childList: true,
                            characterData: false,
                            subtree: true,
                            attributeFilter: ['data-src']
                        });
                    }
                    //check full DOM
                    this.execute(document);

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
                //first action to determine how to proceed
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
                        find();
                    });
                    event('add','DOMNodeInserted',nodeInserted.bind(base));
                    //ignore DOMSubtreeModified while DOMAttrModified is used, while performance does not allow 2 listeners
                }else{
                    //create action
                    hidden.observer = new MutationObserver(function(mutations) {
                        find();
                    });

                    //listen
                    hidden.observer.observe(document, {
                        attributes: true,
                        childList: true,
                        characterData: true,
                        subtree:true
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
