/** @license
 * Crossroads.js <http://millermedeiros.github.com/crossroads.js>
 * Released under the MIT license
 * Author: Miller Medeiros
 * Version: 0.6.0 - Build: 77 (2011/08/31 11:12 PM)
 */

(function(def){
def(['signals'], function(signals){

    var crossroads,
        patternLexer,
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
        return '[object '+ type +']' === Object.prototype.toString.call(val);
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

    function typecastArrayValues(values){
        var n = values.length, 
            result = [];
        while(n--){
            result[n] = typecastValue(values[n]); 
        }
        return result;
    }


    // Crossroads --------
    //====================

    /**
     * @constructor
     */
    function Crossroads(){
        this._routes = [];
        this.bypassed = new signals.Signal();
        this.routed = new signals.Signal();
    }

    Crossroads.prototype = {

        create : function(){
            return new Crossroads();
        },

        shouldTypecast : false,

        addRoute : function(pattern, callback, priority){
            var route = new Route(pattern, callback, priority, this);
            this._sortedInsert(route);
            return route;
        },

        removeRoute : function(route){
            var i = arrayIndexOf(this._routes, route);
            if(i >= 0) this._routes.splice(i, 1);
            route._destroy();
        },

        removeAllRoutes : function(){
            var n = this.getNumRoutes();
            while(n--){
                this._routes[n]._destroy();
            }
            this._routes.length = 0;
        },

        parse : function(request){
            request = request || '';
            var route = this._getMatchedRoute(request),
                params = route? route._getParamsArray(request) : null;
            if(route){
                params? route.matched.dispatch.apply(route.matched, params) : route.matched.dispatch();
                this.routed.dispatch(request, route, params);
            }else{
                this.bypassed.dispatch(request);
            }
        },

        getNumRoutes : function(){
            return this._routes.length;
        },

        _sortedInsert : function(route){
            //simplified insertion sort
            var routes = this._routes,
                n = routes.length;
            do { --n; } while (routes[n] && route._priority <= routes[n]._priority);
            routes.splice(n+1, 0, route);
        },

        _getMatchedRoute : function(request){
            var routes = this._routes,
                n = routes.length,
                route;
            while(route = routes[--n]){ //should be decrement loop since higher priorities are added at the end of array  
                if(route.match(request)) return route;
            }
            return null;
        },

        toString : function(){
            return '[crossroads numRoutes:'+ this.getNumRoutes() +']';
        }
    };

    //"static" instance
    crossroads = new Crossroads();
    crossroads.VERSION = '0.6.0';



    // Route --------------
    //=====================

    /**
     * @constructor
     */
    function Route(pattern, callback, priority, router){
        var isRegexPattern = isRegExp(pattern);
        this._router = router;
        this._pattern = pattern;
        this._paramsIds = isRegexPattern? null : patternLexer.getParamIds(this._pattern);
        this._optionalParamsIds = isRegexPattern? null : patternLexer.getOptionalParamsIds(this._pattern);
        this._matchRegexp = isRegexPattern? pattern : patternLexer.compilePattern(pattern);
        this.matched = new signals.Signal();
        if(callback) this.matched.add(callback);
        this._priority = priority || 0;
    }

    Route.prototype = {

        rules : void(0),

        match : function(request){
            return this._matchRegexp.test(request) && this._validateParams(request); //validate params even if regexp because of `request_` rule.
        },

        _validateParams : function(request){
            var rules = this.rules, 
                values = this._getParamValuesObject(request),
                prop;
            for(prop in rules){
                if(rules.hasOwnProperty(prop) && ! this._isValidParam(request, prop, values)){ //filter prototype
                    return false;
                }
            }
            return true;
        },

        _isValidParam : function(request, prop, values){
            var validationRule = this.rules[prop],
                val = values[prop],
                isValid;

            if ( val == null && this._optionalParamsIds && arrayIndexOf(this._optionalParamsIds, prop) !== -1) {
                isValid = true;
            }
            else if (isRegExp(validationRule)) {
                isValid = validationRule.test(val);
            }
            else if (isArray(validationRule)) {
                isValid = arrayIndexOf(validationRule, val || '') !== -1; //adding empty string since optional rule can be empty
            }
            else if (isFunction(validationRule)) {
                isValid = validationRule(val, request, values);
            }

            return isValid || false; //fail silently if validationRule is from an unsupported type
        },

        _getParamValuesObject : function(request){
            var shouldTypecast = this._router.shouldTypecast,
                values = patternLexer.getParamValues(request, this._matchRegexp, shouldTypecast),
                o = {}, 
                n = values.length;
            while(n--){
                o[n] = values[n]; //for RegExp pattern and also alias to normal paths
                if(this._paramsIds){
                    o[this._paramsIds[n]] = values[n];
                }
            }
            o.request_ = shouldTypecast? typecastValue(request) : request;
            return o;
        },

        _getParamsArray : function(request){
            var vals = this._getParamValuesObject(request),
                norm = this.rules? this.rules.normalize_ : null,
                params;
            if(isFunction(norm)){
                params = norm(request, vals);
            } else {
                params = patternLexer.getParamValues(request, this._matchRegexp, this._router.shouldTypecast);
            }
            return params;
        },

        dispose : function(){
            this._router.removeRoute(this);
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

        var ESCAPE_CHARS_REGEXP = /[\\.+*?\^$\[\](){}\/'#]/g, //match chars that should be escaped on string regexp
            UNNECESSARY_SLASHES_REGEXP = /\/$/g, //trailing slash
            OPTIONAL_SLASHES_REGEXP = /([:}]|\w(?=\/))\/?(:)/g, //slash between `::` or `}:` or `\w:`. $1 = before, $2 = after
            REQUIRED_SLASHES_REGEXP = /([:}])\/?(\{)/g,

            REQUIRED_PARAMS_REGEXP = /\{([^}]+)\}/g, //match everything between `{ }`
            OPTIONAL_PARAMS_REGEXP = /:([^:]+):/g, //match everything between `: :`
            PARAMS_REGEXP = /(?:\{|:)([^}:]+)(?:\}|:)/g, //capture everything between `{ }` or `: :`

            //used to save params during compile (avoid escaping things that shouldn't be escaped)
            SAVE_REQUIRED_PARAMS = '___CR_REQ___', 
            SAVE_OPTIONAL_PARAMS = '___CR_OPT___',
            SAVE_OPTIONAL_SLASHES = '___CR_OPT_SLASH___',
            SAVE_REQUIRED_SLASHES = '___CR_REQ_SLASH___',
            SAVED_REQUIRED_REGEXP = new RegExp(SAVE_REQUIRED_PARAMS, 'g'),
            SAVED_OPTIONAL_REGEXP = new RegExp(SAVE_OPTIONAL_PARAMS, 'g'),
            SAVED_OPTIONAL_SLASHES_REGEXP = new RegExp(SAVE_OPTIONAL_SLASHES, 'g'),
            SAVED_REQUIRED_SLASHES_REGEXP = new RegExp(SAVE_REQUIRED_SLASHES, 'g');


        function getParamIds(pattern){
            var ids = [], match;
            while(match = PARAMS_REGEXP.exec(pattern)){
                ids.push(match[1]);
            }
            return ids;
        }

        function getOptionalParamsIds(pattern){
            var ids = [], match;
            while(match = OPTIONAL_PARAMS_REGEXP.exec(pattern)){
                ids.push(match[1]);
            }
            return ids;
        }

        function compilePattern(pattern){
            pattern = pattern || '';
            if(pattern){
                pattern = pattern.replace(UNNECESSARY_SLASHES_REGEXP, '');
                pattern = tokenize(pattern);
                pattern = pattern.replace(ESCAPE_CHARS_REGEXP, '\\$&');
                pattern = untokenize(pattern);
            }
            return new RegExp('^'+ pattern + '/?$'); //trailing slash is optional
        }

        function tokenize(pattern){
            pattern = pattern.replace(OPTIONAL_SLASHES_REGEXP, '$1'+ SAVE_OPTIONAL_SLASHES +'$2');
            pattern = pattern.replace(REQUIRED_SLASHES_REGEXP, '$1'+ SAVE_REQUIRED_SLASHES +'$2');
            pattern = pattern.replace(OPTIONAL_PARAMS_REGEXP, SAVE_OPTIONAL_PARAMS);
            return pattern.replace(REQUIRED_PARAMS_REGEXP, SAVE_REQUIRED_PARAMS);
        }

        function untokenize(pattern){
            pattern = pattern.replace(SAVED_OPTIONAL_SLASHES_REGEXP, '\\/?');
            pattern = pattern.replace(SAVED_REQUIRED_SLASHES_REGEXP, '\\/');
            pattern = pattern.replace(SAVED_OPTIONAL_REGEXP, '([^\\/]+)?\/?');
            return pattern.replace(SAVED_REQUIRED_REGEXP, '([^\\/]+)');
        }

        function getParamValues(request, regexp, shouldTypecast){
            var vals = regexp.exec(request);
            if(vals){
                vals.shift();
                if(shouldTypecast){
                    vals = typecastArrayValues(vals);
                }
            }
            return vals;
        }

        //API
        return {
            getParamIds : getParamIds,
            getOptionalParamsIds : getOptionalParamsIds,
            getParamValues : getParamValues,
            compilePattern : compilePattern
        };

    }());


    return crossroads;
});
}(
    // wrapper to run code everywhere
    // based on http://bit.ly/c7U4h5
    typeof require === 'undefined'?
        //Browser (regular script tag)
        function(deps, factory){
            this.crossroads = factory(signals);
        } :
        ((typeof exports === 'undefined')?
            //AMD
            function(deps, factory){
                define('crossroads', deps, factory);
            } :
            //CommonJS
            function(deps, factory){
                module.exports = factory.apply(this, deps.map(require));
            }
        )
));
