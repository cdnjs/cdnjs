/*  Snowfall pure js
    ====================================================================
    LICENSE
    ====================================================================
    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing, software
       distributed under the License is distributed on an "AS IS" BASIS,
       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       See the License for the specific language governing permissions and
       limitations under the License.
    ====================================================================
    
    1.0
    Wanted to rewrite my snow plugin to use pure JS so you werent necessarily tied to using a framework.
    Does not include a selector engine or anything, just pass elements to it using standard JS selectors.
    
    Does not clear snow currently. Collection portion removed just for ease of testing will add back in next version
    
    Theres a few ways to call the snow you could do it the following way by directly passing the selector,
    
        snowFall.snow(document.getElementsByTagName("body"), {options});
    
    or you could save the selector results to a variable, and then call it
        
        var elements = document.getElementsByClassName('yourclass');
        snowFall.snow(elements, {options});
        
    Options are all the same as the plugin except clear, and collection
    
    values for snow options are
    
    flakeCount,
    flakeColor,
    flakeIndex,
    flakePosition,
    minSize,
    maxSize,
    minSpeed,
    maxSpeed,
    round,      true or false, makes the snowflakes rounded if the browser supports it.
    shadow      true or false, gives the snowflakes a shadow if the browser supports it.
        
*/

// requestAnimationFrame polyfill from https://github.com/darius/requestAnimationFrame
if (!Date.now)
    Date.now = function() { return new Date().getTime(); };

(function() {
    'use strict';
    
    var vendors = ['webkit', 'moz'];
    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
        var vp = vendors[i];
        window.requestAnimationFrame = window[vp+'RequestAnimationFrame'];
        window.cancelAnimationFrame = (window[vp+'CancelAnimationFrame']
                                   || window[vp+'CancelRequestAnimationFrame']);
    }
    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) // iOS6 is buggy
        || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
        var lastTime = 0;
        window.requestAnimationFrame = function(callback) {
            var now = Date.now();
            var nextTime = Math.max(lastTime + 16, now);
            return setTimeout(function() { callback(lastTime = nextTime); },
                              nextTime - now);
        };
        window.cancelAnimationFrame = clearTimeout;
    }
}());

var snowFall = (function(){
    function jSnow(){
        // local methods
        var defaults = {
                flakeCount : 35,
                flakeColor : '#ffffff',
                flakeIndex: 999999,
                flakePosition: 'absolute',
                minSize : 1,
                maxSize : 2,
                minSpeed : 1,
                maxSpeed : 5,
                round : false,
                shadow : false,
                collection : false,
                image : false,
                collectionHeight : 40
            },
            flakes = [],
            element = {},
            elHeight = 0,
            elWidth = 0,
            widthOffset = 0,
            snowTimeout = 0,
            // For extending the default object with properties
            extend = function(obj, extObj){
                for(var i in extObj){
                    if(obj.hasOwnProperty(i)){
                        obj[i] = extObj[i];
                    }
                }
            },
            // random between range
            random = function random(min, max){
                return Math.round(min + Math.random()*(max-min)); 
            },
            // Set multiple styles at once.
            setStyle = function(element, props)
            {
                for (var property in props){
                    element.style[property] = props[property] + ((property == 'width' || property == 'height') ? 'px' : '');
                }
            },
            // snowflake
            flake = function(_el, _size, _speed)
            {
                // Flake properties
                this.x  = random(widthOffset, elWidth - widthOffset);
                this.y  = random(0, elHeight);
                this.size = _size;
                this.speed = _speed;
                this.step = 0;
                this.stepSize = random(1,10) / 100;

                if(defaults.collection){
                    this.target = canvasCollection[random(0,canvasCollection.length-1)];
                }
                
                var flakeObj = null;
                
                if(defaults.image){
                    flakeObj = new Image();
                    flakeObj.src = defaults.image;
                }else{
                    flakeObj = document.createElement('div');
                    setStyle(flakeObj, {'background' : defaults.flakeColor});
                }
                
                flakeObj.className = 'snowfall-flakes';
                setStyle(flakeObj, {'width' : this.size, 'height' : this.size, 'position' : defaults.flakePosition, 'top' : this.y, 'left' : this.x, 'fontSize' : 0, 'zIndex' : defaults.flakeIndex});
        
                // This adds the style to make the snowflakes round via border radius property 
                if(defaults.round){
                    setStyle(flakeObj,{'-moz-border-radius' : ~~(defaults.maxSize) + 'px', '-webkit-border-radius' : ~~(defaults.maxSize) + 'px', 'borderRadius' : ~~(defaults.maxSize) + 'px'});
                }
            
                // This adds shadows just below the snowflake so they pop a bit on lighter colored web pages
                if(defaults.shadow){
                    setStyle(flakeObj,{'-moz-box-shadow' : '1px 1px 1px #555', '-webkit-box-shadow' : '1px 1px 1px #555', 'boxShadow' : '1px 1px 1px #555'});
                }

                if(_el.tagName === document.body.tagName){
                    document.body.appendChild(flakeObj);
                }else{
                    _el.appendChild(flakeObj);
                }

                
                this.element = flakeObj;
                
                // Update function, used to update the snow flakes, and checks current snowflake against bounds
                this.update = function(){
                    this.y += this.speed;

                    if(this.y > elHeight - (this.size  + 6)){
                        this.reset();
                    }
                    
                    this.element.style.top = this.y + 'px';
                    this.element.style.left = this.x + 'px';

                    this.step += this.stepSize;
                    this.x += Math.cos(this.step);
                    
                    if(this.x + this.size > elWidth - widthOffset || this.x < widthOffset){
                        this.reset();
                    }
                }
                
                // Resets the snowflake once it reaches one of the bounds set
                this.reset = function(){
                    this.y = 0;
                    this.x = random(widthOffset, elWidth - widthOffset);
                    this.stepSize = random(1,10) / 100;
                    this.size = random((defaults.minSize * 100), (defaults.maxSize * 100)) / 100;
                    this.element.style.width = this.size + 'px';
                    this.element.style.height = this.size + 'px';
                    this.speed = random(defaults.minSpeed, defaults.maxSpeed);
                }
            },
            // this controls flow of the updating snow
            animateSnow = function(){
                for(var i = 0; i < flakes.length; i += 1){
                    flakes[i].update();
                }
                snowTimeout = requestAnimationFrame(function(){animateSnow()});
            }
        return{
            snow : function(_element, _options){
                extend(defaults, _options);
                
                //init the element vars
                element = _element;
                elHeight = element.offsetHeight;
                elWidth = element.offsetWidth;

                element.snow = this;
                
                // if this is the body the offset is a little different
                if(element.tagName.toLowerCase() === 'body'){
                    widthOffset = 25;
                }
                
                // Bind the window resize event so we can get the innerHeight again
                window.addEventListener('resize', function(){
                    elHeight = element.clientHeight;
                    elWidth = element.offsetWidth;
                }, true);
                
                // initialize the flakes
                for(i = 0; i < defaults.flakeCount; i+=1){
                    flakes.push(new flake(element, random((defaults.minSize * 100), (defaults.maxSize * 100)) / 100, random(defaults.minSpeed, defaults.maxSpeed)));
                }
                // start the snow
                animateSnow();
            },
            clear : function(){
                var flakeChildren = null;

                if(!element.getElementsByClassName){
                    flakeChildren = element.querySelectorAll('.snowfall-flakes');
                }else{
                    flakeChildren = element.getElementsByClassName('snowfall-flakes');
                }

                var flakeChilLen = flakeChildren.length;
                while(flakeChilLen--){
                    if(flakeChildren[flakeChilLen].parentNode === element){
                        element.removeChild(flakeChildren[flakeChilLen]);
                    }
                }

                cancelAnimationFrame(snowTimeout);
            }
        }
    };
    return{
        snow : function(elements, options){
            if(typeof(options) == 'string'){
                if(elements.length > 0){
                    for(var i = 0; i < elements.length; i++){
                        if(elements[i].snow){
                            elements[i].snow.clear();
                        }
                    }
                }else{
                    elements.snow.clear();
                }
            }else{
                if(elements.length > 0){
                    for(var i = 0; i < elements.length; i++){
                        new jSnow().snow(elements[i], options);
                    }
                }else{
                    new jSnow().snow(elements, options);
                }
            }
        }
    }
})();
