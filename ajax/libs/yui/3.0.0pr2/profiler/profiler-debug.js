YUI.add("profiler", function(Y){

    var L = Y.Lang;

    /**
     * The YUI JavaScript profiler.
     * @module profiler
     * @namespace Y
     * @requires yahoo
     */
    
    /**
     * Profiles functions in JavaScript.
     * @namespace Y
     * @class Profiler
     * @static
     */
    Y.Profiler = {
    
        //-------------------------------------------------------------------------
        // Private Properties
        //-------------------------------------------------------------------------
    
        /**
         * Container object on which to put the original unprofiled methods.
         * @type Object
         * @private
         * @static
         * @property _container
         */
        _container : {},
    
        /**
         * Call information for functions.
         * @type Object
         * @private
         * @static
         * @property _report
         */
        _report : {},
        
        //-------------------------------------------------------------------------
        // Private Methods
        //-------------------------------------------------------------------------
        
        /**
         * Called when a method ends execution. Marks the start and end time of the 
         * method so it can calculate how long the function took to execute. Also 
         * updates min/max/avg calculations for the function.
         * @param {String} name The name of the function to mark as stopped.
         * @param {int} duration The number of milliseconds it took the function to
         *      execute.
         * @return {Void}
         * @private
         * @static
         */
        _saveData : function (name /*:String*/, duration /*:int*/){
            
            //get the function data
            var functionData /*:Object*/ = this._report[name];
        
            //increment the calls
            functionData.calls++;
            functionData.points.push(duration);
    
            //if it's already been called at least once, do more complex calculations
            if (functionData.calls > 1) {
                functionData.avg = ((functionData.avg*(functionData.calls-1))+duration)/functionData.calls;
                functionData.min = Math.min(functionData.min, duration);
                functionData.max = Math.max(functionData.max, duration);
            } else {
                functionData.avg = duration;
                functionData.min = duration;
                functionData.max = duration;
            }                             
        
        },
    
        //-------------------------------------------------------------------------
        // Reporting Methods
        //-------------------------------------------------------------------------    
        
        /**
         * Returns the average amount of time (in milliseconds) that the function
         * with the given name takes to execute.
         * @param {String} name The name of the function whose data should be returned.
         *      If an object type method, it should be 'constructor.prototype.methodName';
         *      a normal object method would just be 'object.methodName'.
         * @return {float} The average time it takes the function to execute.
         * @static
         */
        getAverage : function (name /*:String*/) /*:float*/ {
            return this._report[name].avg;
        },
    
        /**
         * Returns the number of times that the given function has been called.
         * @param {String} name The name of the function whose data should be returned.
         * @return {int} The number of times the function was called.
         * @static
         */
        getCallCount : function (name /*:String*/) /*:int*/ {
            return this._report[name].calls;    
        },
        
        /**
         * Returns the maximum amount of time (in milliseconds) that the function
         * with the given name takes to execute.
         * @param {String} name The name of the function whose data should be returned.
         *      If an object type method, it should be 'constructor.prototype.methodName';
         *      a normal object method would just be 'object.methodName'.
         * @return {float} The maximum time it takes the function to execute.
         */
        getMax : function (name /*:String*/) /*:int*/ {
            return this._report[name].max;
        },
        
        /**
         * Returns the minimum amount of time (in milliseconds) that the function
         * with the given name takes to execute.
         * @param {String} name The name of the function whose data should be returned.
         *      If an object type method, it should be 'constructor.prototype.methodName';
         *      a normal object method would just be 'object.methodName'.
         * @return {float} The minimum time it takes the function to execute.
         */
        getMin : function (name /*:String*/) /*:int*/ {
            return this._report[name].min;
        },
    
        /**
         * Returns an object containing profiling data for a single function.
         * The object has an entry for min, max, avg, calls, and points).
         * @return {Object} An object containing profile data for a given function.
         * @static
         */
        getFunctionReport : function (name /*:String*/) /*:Object*/ {
            return this._report[name];
        },
    
        /**
         * Returns an object containing profiling data for all of the functions 
         * that were profiled. The object has an entry for each function and 
         * returns all information (min, max, average, calls, etc.) for each
         * function.
         * @return {Object} An object containing all profile data.
         * @static
         */
        getFullReport : function (filter /*:Function*/) /*:Object*/ {
            filter = filter || function(){return true;};
        
            if (typeof filter == "function") {
                var report = {};
                
                for (var name in this._report){
                    if (filter(this._report[name])){
                        report[name] = this._report[name];    
                    }
                }
                
                return report;
            }
        },
    
        //-------------------------------------------------------------------------
        // Profiling Methods
        //-------------------------------------------------------------------------   
        
        /**
         * Sets up a constructor for profiling, including all properties and methods on the prototype.
         * @param {string} name The fully-qualified name of the function including namespace information.
         * @param {Object} owner (Optional) The object that owns the function (namespace or containing object).
         * @return {Void}
         * @static
         */
        registerConstructor : function (name /*:String*/, owner /*:Object*/) /*:Void*/ {    
            this.registerFunction(name, owner, true);
        },
    
        /**
         * Sets up a function for profiling. It essentially overwrites the function with one
         * that has instrumentation data. This method also creates an entry for the function
         * in the profile report. The original function is stored on the _container object.
         * @param {String} name The full name of the function including namespacing. This
         *      is the name of the function that is stored in the report.
         * @param {Object} owner (Optional) The object that owns the function. If the function
         *      isn't global then this argument is required. This could be the namespace that
         *      the function belongs to, such as YAHOO.util.Dom, or the object on which it's
         *      a method.
         * @return {Void}
         * @method registerFunction
         */     
        registerFunction : function(name /*:String*/, owner /*:Object*/, registerPrototype /*:Boolean*/) /*:Void*/{
        
            //figure out the function name without namespacing
            var funcName /*:String*/ = (name.indexOf(".") > -1 ? name.substring(name.lastIndexOf(".")+1) : name);
            if (!L.isObject(owner)){
                owner = eval(name.substring(0, name.lastIndexOf(".")));
            }
            
            //get the method and prototype
            var method /*:Function*/ = owner[funcName];
            var prototype /*:Object*/ = method.prototype;
            
            //see if the method has already been registered
            if (L.isFunction(method) && !method.__yuiProfiled){
                
                //create a new slot for the original method
                this._container[name] = method;
                
                //replace the function with the profiling one
                owner[funcName] = function () {
    
                    var start = new Date();     
                    var retval = method.apply(this, arguments);
                    var stop = new Date();
                    
                    Y.Profiler._saveData(name, stop-start);
                    
                    return retval;                
                
                };
                
                //copy the function properties over
                Y.mix(owner[funcName], method);
                owner[funcName].__yuiProfiled = true;
                owner[funcName].prototype = prototype;
                this._container[name].__yuiOwner = owner;
                this._container[name].__yuiFuncName = funcName;        
            
                //register prototype if necessary
                if (registerPrototype) {            
                    this.registerObject(name + ".prototype", prototype);          
                }
                
                //store function information
                this._report[name] = {
                    calls: 0,
                    max: 0,
                    min: 0,
                    avg: 0,
                    points: []
                };        
            }
                
            return method;
        
        },
            
        
        /**
         * Sets up an object for profiling. It takes the object and looks for functions.
         * When a function is found, registerMethod() is called on it. If set to recrusive
         * mode, it will also setup objects found inside of this object for profiling, 
         * using the same methodology.
         * @param {String} name The name of the object to profile (shows up in report).
         * @param {Object} owner (Optional) The object represented by the name.
         * @param {Boolean} recurse (Optional) Determines if subobject methods are also profiled.
         * @return {Void}
         * @static
         */
        registerObject : function (name /*:String*/, object /*:Object*/, recurse /*:Boolean*/) /*:Void*/{
        
            //get the object
            object = (L.isObject(object) ? object : eval(name));
        
            //save the object
            this._container[name] = object;
        
            for (var prop in object) {
                if (typeof object[prop] == "function"){
                    if (prop != "constructor" && prop != "superclass"){ //don't do constructor or superclass, it's recursive
                        this.registerFunction(name + "." + prop, object);
                    }
                } else if (typeof object[prop] == "object" && recurse){
                    this.registerObject(name + "." + prop, object[prop], recurse);
                }
            }
        
        },    
        
        /**
         * Removes a constructor function from profiling. Reverses the registerConstructor() method.
         * @param {String} name The full name of the function including namespacing. This
         *      is the name of the function that is stored in the report.
         * @return {Void}
         * @method unregisterFunction
         */     
        unregisterConstructor : function(name /*:String*/) /*:Void*/{
                
            //see if the method has been registered
            if (L.isFunction(this._container[name])){
            
                //get original data
                //var owner /*:Object*/ = this._container[name].__yuiOwner;
                //var funcName /*:String*/ = this._container[name].__yuiFuncName;
                //delete this._container[name].__yuiOwner;
                //delete this._container[name].__yuiFuncName;
                
                //replace instrumented function
                //owner[funcName] = this._container[name];
                //delete this._container[name];
                this.unregisterFunction(name, true);
           
            }
    
        
        },
        
        /**
         * Removes function from profiling. Reverses the registerFunction() method.
         * @param {String} name The full name of the function including namespacing. This
         *      is the name of the function that is stored in the report.
         * @return {Void}
         * @method unregisterFunction
         */     
        unregisterFunction : function(name /*:String*/, unregisterPrototype /*:Boolean*/) /*:Void*/{
                
            //see if the method has been registered
            if (L.isFunction(this._container[name])){
            
                //check to see if you should unregister the prototype
                if (unregisterPrototype){
                    this.unregisterObject(name + ".prototype", this._container[name].prototype);
                }
                    
                //get original data
                var owner /*:Object*/ = this._container[name].__yuiOwner;
                var funcName /*:String*/ = this._container[name].__yuiFuncName;
                delete this._container[name].__yuiOwner;
                delete this._container[name].__yuiFuncName;
                
                //replace instrumented function
                owner[funcName] = this._container[name];
                
                //delete supporting information
                delete this._container[name];
                delete this._report[name];
           
            }
                
        
        },
        
        /**
         * Unregisters an object for profiling. It takes the object and looks for functions.
         * When a function is found, unregisterMethod() is called on it. If set to recrusive
         * mode, it will also unregister objects found inside of this object, 
         * using the same methodology.
         * @param {String} name The name of the object to unregister.
         * @param {Boolean} recurse (Optional) Determines if subobject methods should also be
         *      unregistered.
         * @return {Void}
         * @static
         */
        unregisterObject : function (name /*:String*/, recurse /*:Boolean*/) /*:Void*/{
        
            //get the object
            if (L.isObject(this._container[name])){            
                var object = this._container[name];    
            
                for (var prop in object) {
                    if (typeof object[prop] == "function"){
                        this.unregisterFunction(name + "." + prop);
                    } else if (typeof object[prop] == "object" && recurse){
                        this.unregisterObject(name + "." + prop, recurse);
                    }
                }
                
                delete this._container[name];
            }
        
        }
             
    
    };
}, "@VERSION@");

