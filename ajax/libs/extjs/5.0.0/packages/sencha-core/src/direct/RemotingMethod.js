/**
 * @private
 * Small utility class used internally to represent a Direct method.
 */
Ext.define('Ext.direct.RemotingMethod', {

    constructor: function(config) {
        var me = this,
            params = Ext.isDefined(config.params) ? config.params : config.len,
            name, pLen, p, param;

        me.name = config.name;
        me.formHandler = config.formHandler;

        if (Ext.isNumeric(params)) {
            // given only the number of parameters
            me.len = params;
            me.ordered = true;
        }
        else {
            /*
             * Given an array of either
             * a) String
             * b) Objects with a name property. We may want to encode extra info in here later
             */
            me.strict = config.strict !== undefined ? config.strict : true;
            me.params = {};
            pLen = params.length;

            for (p = 0; p < pLen; p++) {
                param = params[p];
                name  = Ext.isObject(param) ? param.name : param;
                me.params[name] = true;
            }
        }
    },
    
    getArgs: function(params, paramOrder, paramsAsHash) {
        var me = this,
            args = [],
            i, len;
        
        if (me.ordered) {
            if (me.len > 0) {
                // If a paramOrder was specified, add the params into the argument list in that order.
                if (paramOrder) {
                    for (i = 0, len = paramOrder.length; i < len; i++) {
                        args.push(params[paramOrder[i]]);
                    }
                }
                else if (paramsAsHash) {
                    // If paramsAsHash was specified, add all the params as a single object argument.
                    args.push(params);
                }
            }
        }
        else {
            args.push(params);
        } 
        
        return args;
    },

    /**
     * Takes the arguments for the Direct function and splits the arguments
     * from the scope and the callback.
     *
     * @param {Array} args The arguments passed to the direct call
     *
     * @return {Object} An object with 3 properties: args, callback & scope.
     */
    getCallData: function(args) {
        var me = this,
            data = null,
            len  = me.len,
            params = me.params,
            strict = me.strict,
            callback, scope, name, options;

        if (me.ordered) {
            callback = args[len];
            scope    = args[len + 1];
            options  = args[len + 2];
            
            if (len !== 0) {
                data = args.slice(0, len);
            }
        }
        else {
            data     = Ext.apply({}, args[0]);
            callback = args[1];
            scope    = args[2];
            options  = args[3];

            // filter out any non-existent properties unless !strict
            if (strict) {
                for (name in data) {
                    if (data.hasOwnProperty(name) && !params[name]) {
                        delete data[name];
                    }
                }
            }
        }

        return {
            data: data,
            callback: callback,
            scope: scope,
            options: options
        };
    }
});
