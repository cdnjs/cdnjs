/*!!
 * Crossroads - JavaScript Routes
 * Released under the MIT license <http://www.opensource.org/licenses/mit-license.php>
 * @author Miller Medeiros
 * @version 0.4
 * @build 31 (06/07/2011 12:15 AM)
 */
(function(global){
        
    var crossroads,
        Route,
        patternLexer,
        _toString = Object.prototype.toString,
        BOOL_REGEXP = /^(true|false)$/i;
    
    // Helpers -----------
    //====================
    
    function arrayIndexOf(arr, val){
        var n = arr.length;
        //Array.indexOf doesn't work on IE 6-7
        while(n--){
            if(arr[n] === val) return n;
        }
        return -1;
    }
    
    function isType(type, val){
        return '[object '+ type +']' === _toString.call(val);
    }
    
    function isRegExp(val){
        return isType('RegExp', val);
    }
    
    function isArray(val){
        return isType('Array', val);
    }
    
    function isFunction(val){
        return isType('Function', val);
    }

    function typecastValue(val){
        return (val === null)? val : (
                    BOOL_REGEXP.test(val)? (val.toLowerCase() === 'true') : (
                        (val === '' || isNaN(val))? val : parseFloat(val) //parseFloat(null || '') returns NaN, isNaN('') returns false
                    )
                );
    }

            
    // Crossroads --------
    //====================
    
    crossroads = (function(){
        
        var _routes = [],
            _bypassed = new signals.Signal(),
            _routed = new signals.Signal();
        
        function addRoute(pattern, callback, priority){
            var route = new Route(pattern, callback, priority);
            sortedInsert(route);
            return route;
        }
        
        function sortedInsert(route){
            //simplified insertion sort
            var n = getNumRoutes();
            do { --n; } while (_routes[n] && route._priority <= _routes[n]._priority);
            _routes.splice(n+1, 0, route);
        }
        
        function getNumRoutes(){
            return _routes.length;
        }
        
        function removeRoute(route){
            var i = getRouteIndex(route);
            if(i >= 0) _routes.splice(i, 1);
            route._destroy();
        }
        
        function getRouteIndex(route){
            return arrayIndexOf(_routes, route);
        }
        
        function removeAllRoutes(){
            var n = getNumRoutes();
            while(n--){
                _routes[n]._destroy();
            }
            _routes.length = 0;
        }
        
        function parse(request){
            request = request || '';
            var route = getMatchedRoute(request),
                params = route? getParamValues(request, route) : null;
            if(route){
                params? route.matched.dispatch.apply(route.matched, params) : route.matched.dispatch();
                _routed.dispatch(request, route, params);
            }else{
                _bypassed.dispatch(request);
            }
        }
        
        function getMatchedRoute(request){
            var i = getNumRoutes(), route;
            while(route = _routes[--i]){ //should be decrement loop since higher priorities are added at the end of array  
                if(route.match(request)) return route;
            }
            return null;
        }
        
        function getParamValues(request, route){
            return patternLexer.getParamValues(request, route._matchRegexp);
        }
        
        //API
        return {
            _routes : _routes,
            addRoute : addRoute,
            removeRoute : removeRoute,
            removeAllRoutes : removeAllRoutes,
            parse : parse,
            bypassed : _bypassed,
            routed : _routed,
            getNumRoutes : getNumRoutes,
            toString : function(){
                return '[crossroads numRoutes:'+ getNumRoutes() +']';
            }
        };
        
    }());
    

            
    // Route --------------
    //=====================
     
    Route = function (pattern, callback, priority){
        var isRegexPattern = isRegExp(pattern);
        this._pattern = pattern;
        this._paramsIds = isRegexPattern? null : patternLexer.getParamIds(this._pattern);
        this._matchRegexp = isRegexPattern? pattern : patternLexer.compilePattern(pattern);
        this.matched = new signals.Signal();
        if(callback) this.matched.add(callback);
        this._priority = priority || 0;
    };
    
    Route.prototype = {
        
        rules : void(0),
        
        match : function(request){
            return this._matchRegexp.test(request) && this._validateParams(request); //validate params even if regexp because of `request_` rule.
        },
        
        _validateParams : function(request){
            var rules = this.rules, 
                prop;
            for(prop in rules){
                if(rules.hasOwnProperty(prop) && ! this._isValidParam(request, prop)){ //filter prototype
                    return false;
                }
            }
            return true;
        },
        
        _isValidParam : function(request, prop){
            var validationRule = this.rules[prop],
                values = this._getParamValuesObject(request),
                val = values[prop],
                isValid;
            
            if (isRegExp(validationRule)) {
                isValid = validationRule.test(val);
            }
            else if (isArray(validationRule)) {
                isValid = arrayIndexOf(validationRule, val) !== -1;
            }
            else if (isFunction(validationRule)) {
                isValid = validationRule(val, request, values);
            }
            
            return isValid || false; //fail silently if validationRule is from an unsupported type
        },
        
        _getParamValuesObject : function(request){
            var ids = this._paramsIds,
                values = patternLexer.getParamValues(request, this._matchRegexp),
                o = {}, 
                n = ids? ids.length : 0;
            while(n--){
                o[ids[n]] = values[n];
            }
            o.request_ = typecastValue(request);
            return o;
        },
                
        dispose : function(){
            crossroads.removeRoute(this);
        },
        
        _destroy : function(){
            this.matched.dispose();
            this.matched = this._pattern = this._matchRegexp = null;
        },
        
        toString : function(){
            return '[Route pattern:"'+ this._pattern +'", numListeners:'+ this.matched.getNumListeners() +']';
        }
        
    };
    

    
    // Pattern Lexer ------
    //=====================
    
    patternLexer = crossroads.patternLexer = (function(){

        var ESCAPE_CHARS_REGEXP = /[\\\.\+\*\?\^\$\[\]\(\)\{\}\/\'\#]/g,
            SEGMENT_REGEXP = /([^\/]+)/,
            PARAMS_REGEXP = /\{([^\}]+)\}/g,
            SAVE_PARAMS = '___CR_PARAM___',
            SAVED_PARAM_REGEXP = new RegExp(SAVE_PARAMS, 'g');
        
        function getParamIds(pattern){
            var ids = [], match;
            while(match = PARAMS_REGEXP.exec(pattern)){
                ids.push(match[1]);
            }
            return ids;
        }
    
        function compilePattern(pattern){
            pattern = pattern? saveParams(pattern) : '';
            pattern = pattern.replace(/\/$/, ''); //remove trailing slash
            pattern = escapePattern(pattern); //make sure chars that need to be escaped are properly converted
            pattern = convertSavedParams(pattern);
            return new RegExp('^'+ pattern + '/?$'); //trailing slash is optional
        }
        
        function saveParams(pattern){
            return pattern.replace(PARAMS_REGEXP, SAVE_PARAMS);
        }
        
        function convertSavedParams(pattern){
            return pattern.replace(SAVED_PARAM_REGEXP, SEGMENT_REGEXP.source);
        }
        
        function escapePattern(pattern){
            return pattern.replace(ESCAPE_CHARS_REGEXP, '\\$&');
        }
        
        function getParamValues(request, regexp){
            var vals = regexp.exec(request);
            if(vals){
                vals.shift();
                vals = typecastValues(vals);
            }
            return vals;
        }
        
        function typecastValues(values){
            var n = values.length, 
                result = [];
            while(n--){
                result[n] = typecastValue(values[n]); 
            }
            return result;
        }
        
        //API
        return {
            getParamIds : getParamIds,
            getParamValues : getParamValues,
            compilePattern : compilePattern
        };
    
    }());
    

    global.crossroads = crossroads;
    
}(window || this));
