    // o---------------------------------------------------------------------------------o
    // | This file is part of the RGraph package - you can learn more at:                |
    // |                                                                                 |
    // |                       https://www.rgraph.net/license.html                       |
    // |                                                                                 |
    // | RGraph is dual-licensed under the Open Source GPL license. That means that it's |
    // | free to use and there are no restrictions on what you can use RGraph for!       |
    // | If the GPL license does not suit you however, then there's an inexpensive       |
    // | commercial license option available. See the URL above for more details.        |
    // o---------------------------------------------------------------------------------o

    window.RGraph = window.RGraph || {isrgraph:true,isRGraph: true,rgraph:true};

// Module pattern
(function (win, doc, undefined)
{
    // A short name variable
    var ua  = navigator.userAgent;

    //
    // Initialise the various objects
    //
    RGraph.Highlight      = {};
    RGraph.Registry       = {};
    RGraph.Registry.store = [];
    RGraph.Registry.store['event.handlers']       = [];
    RGraph.Registry.store['__rgraph_event_listeners__'] = []; // Used in the new system for tooltips
    RGraph.Registry.store['rgraph-runonce-functions']   = []; // Used in the runonce system
    RGraph.Background     = {};
    RGraph.background     = {};
    RGraph.objects        = [];
    RGraph.Resizing       = {};
    RGraph.events         = [];
    RGraph.cursor         = [];
    RGraph.Effects        = RGraph.Effects || {};
    RGraph.cache          = [];
    RGraph.GET            = {};
    RGraph.GET.__parts__  = null;

    RGraph.ObjectRegistry                    = {};
    RGraph.ObjectRegistry.objects            = {};
    RGraph.ObjectRegistry.objects.byUID      = [];
    RGraph.ObjectRegistry.objects.byCanvasID = [];
    RGraph.OR                                = RGraph.ObjectRegistry;




    //
    // Some "constants". The ua variable is navigator.userAgent (definedabove)
    //
    RGraph.PI       = Math.PI;
    RGraph.HALFPI   = RGraph.PI / 2;
    RGraph.TWOPI    = RGraph.PI * 2;

    RGraph.ISFF     = ua.indexOf('Firefox') != -1;
    RGraph.ISOPERA  = ua.indexOf('Opera') != -1;
    RGraph.ISCHROME = ua.indexOf('Chrome') != -1;
    RGraph.ISSAFARI = ua.indexOf('Safari') != -1 && !RGraph.ISCHROME;
    RGraph.ISWEBKIT = ua.indexOf('WebKit') != -1;

    RGraph.ISIE   = ua.indexOf('Trident') > 0 || navigator.userAgent.indexOf('MSIE') > 0;
    RGraph.ISIE6  = ua.indexOf('MSIE 6') > 0;
    RGraph.ISIE7  = ua.indexOf('MSIE 7') > 0;
    RGraph.ISIE8  = ua.indexOf('MSIE 8') > 0;
    RGraph.ISIE9  = ua.indexOf('MSIE 9') > 0;
    RGraph.ISIE10 = ua.indexOf('MSIE 10') > 0;
    RGraph.ISOLD  = RGraph.ISIE6 || RGraph.ISIE7 || RGraph.ISIE8; // MUST be here
    
    RGraph.ISIE11UP = ua.indexOf('MSIE') == -1 && ua.indexOf('Trident') > 0;
    RGraph.ISIE10UP = RGraph.ISIE10 || RGraph.ISIE11UP;
    RGraph.ISIE9UP  = RGraph.ISIE9 || RGraph.ISIE10UP;

    // Some commonly used bits of info
    RGraph.MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    RGraph.MONTHS_LONG  = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    RGraph.DAYS_SHORT   = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    RGraph.DAYS_LONG    = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    RGraph.HOURS24      = ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'];
    RGraph.HOURS12      = ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00'];



    //
    // Returns five values which are used as a nice scale
    // 
    // 11/12/2018
    // ==========
    // This funtction doesn't appear to be being used
    // any more - could remove it.
    // 
    // @param  max int    The maximum value of the graph
    // @param  obj object The graph object
    // @return     array   An appropriate scale
    //
//    RGraph.getScale = function (max, obj)
//    {
//        var prefix = obj.type === 'hbar' ? 'xaxis' : 'yaxis';
//
//        //
//        // Special case for 0
//        //
//        if (max == 0) {
//            return ['0.2', '0.4', '0.6', '0.8', '1.0'];
//        }
//
//        var original_max = max;
//
//        //
//        // Manually do decimals
//        //
//        if (max <= 1) {
//            if (max > 0.5) {
//                return [0.2,0.4,0.6,0.8, Number(1).toFixed(1)];
//
//            } else if (max >= 0.1) {
//                return obj.get(prefix + 'ScaleRound') ? [0.2,0.4,0.6,0.8,1] : [0.1,0.2,0.3,0.4,0.5];
//
//            } else {
//
//                var tmp = max;
//                var exp = 0;
//
//                while (tmp < 1.01) {
//                    exp += 1;
//                    tmp *= 10;
//                }
//
//                var ret = ['2e-' + exp, '4e-' + exp, '6e-' + exp, '8e-' + exp, '10e-' + exp];
//
//
//                if (max <= ('5e-' + exp)) {
//                    ret = ['1e-' + exp, '2e-' + exp, '3e-' + exp, '4e-' + exp, '5e-' + exp];
//                }
//
//                return ret;
//            }
//        }
//
//        // Take off any decimals
//        if (String(max).indexOf('.') > 0) {
//            max = String(max).replace(/\.\d+$/, '');
//        }
//
//        var interval = Math.pow(10, Number(String(Number(max)).length - 1));
//        var topValue = interval;
//
//        while (topValue < max) {
//            topValue += (interval / 2);
//        }
//
//        // Handles cases where the max is (for example) 50.5
//        if (Number(original_max) > Number(topValue)) {
//            topValue += (interval / 2);
//        }
//
//        // Custom if the max is greater than 5 and less than 10
//        if (max < 10) {
//            topValue = (Number(original_max) <= 5 ? 5 : 10);
//        }
//        
//        //
//        // Added 02/11/2010 to create "nicer" scales
//        //
//        if (obj && typeof obj.get(prefix + 'ScaleRound') == 'boolean' && obj.get(prefix + 'ScaleRound')) {
//            topValue = 10 * interval;
//        }
//
//        return [topValue * 0.2, topValue * 0.4, topValue * 0.6, topValue * 0.8, topValue];
//    };








    //
    // This function allows both object based arguments to functions
    // and also regular arguments as well.
    //
    // You can call it from inside a function like this:
    //
    // args = RGraph.getArgs(arguments, 'object,id,foo,bar');
    //
    // So you're passing it the arguments object and a comma seperated list of names
    // for the arguments.
    //
    // @param array args   The arguments object that you get when inside a function
    // @param string names A comma seperated list of desired names for the arguments
    //                     eg: 'object,color,size'
    //
    RGraph.getArgs = function (args, names)
    {
        var ret   = {};
        var count = 0;
        names     = names.trim().split(/ *, */);

        if (   args
            && args[0]
            && args.length === 1
            && typeof args[0][names[0]] !== 'undefined') {
            
            for (var i=0; i<names.length; ++i) {
                if (typeof args[0][names[i]] === 'undefined') {
                    args[0][names[i]] = null;
                }
            }

            return args[0];
        } else {
            for (var i in names) {
                if (RGraph.isString(i)) {
                    ret[names[i]] = typeof args[count] === 'undefined' ? null : args[count];
                    
                    count += 1;
                }
            }
        }

        return ret;
    };








    //
    // Returns an appropriate scale. The return value is actualy an object consisting of:
    //  scale.max
    //  scale.min
    //  scale.scale
    //
    // @param  args object An object consisting of:
    //                     object  - The chart object
    //                     options - Options for the function
    //
    // @return     object  An object containing scale information
    //
    RGraph.getScale  = function (args)
    {
        var properties   = args.object.properties,
            numlabels    = typeof args.options['scale.labels.count'] == 'number' ? args.options['scale.labels.count'] : 5,
            units_pre    = typeof args.options['scale.units.pre'] == 'string' ? args.options['scale.units.pre'] : '',
            units_post   = typeof args.options['scale.units.post'] == 'string' ? args.options['scale.units.post'] : '',
            max          = Number(args.options['scale.max']),
            min          = typeof args.options['scale.min'] == 'number' ? args.options['scale.min'] : 0,
            strict       = args.options['scale.strict'],
            decimals     = Number(args.options['scale.decimals']), // Sometimes the default is null
            point        = args.options['scale.point'], // Default is a string in all chart libraries so no need to cast it
            thousand     = args.options['scale.thousand'], // Default is a string in all chart libraries so no need to cast it
            original_max = max,
            round        = args.options['scale.round'],
            scale        = {max:1,labels:[],values:[]},
            formatter    = args.options['scale.formatter'];

            // Determine any prefix to use
            prefix = args.object.type === 'hbar' ? 'xaxis' : 'yaxis';
            prefix = args.object.type === 'odo' ? '' : prefix;





        //
        // Special case for 0
        // 
        // ** Must be first **
        //
        if (!max) {

            var max   = 1;

            for (var i=0; i<numlabels; ++i) {

                var label = ((((max - min) / numlabels) + min) * (i + 1)).toFixed(decimals);

                scale.labels.push(units_pre + label + units_post);
                scale.values.push(parseFloat(label))
            }

        //
        // Manually do decimals
        //
        } else if (max <= 1 && !strict) {

            var arr = [
                1,0.5,
                0.10,0.05,
                0.010,0.005,
                0.0010,0.0005,
                0.00010,0.00005,
                0.000010,0.000005,
                0.0000010,0.0000005,
                0.00000010,0.00000005,
                0.000000010,0.000000005,
                0.0000000010,0.0000000005,
                0.00000000010,0.00000000005,
                0.000000000010,0.000000000005,
                0.0000000000010,0.0000000000005
            ], vals = [];



            for (var i=0; i<arr.length; ++i) {
                if (max > arr[i]) {
                    i--;
                    break;
                }
            }


            scale.max    = arr[i];
            scale.labels = [];
            scale.values = [];
        
            for (var j=0; j<numlabels; ++j) {

                var value = ((((arr[i] - min) / numlabels) * (j + 1)) + min).toFixed(decimals);

                scale.values.push(value);
                scale.labels.push(RGraph.numberFormat({
                    object:    args.object,
                    number:    value,
                    unitspre:  units_pre,
                    unitspost: units_post,
                    thousand:  thousand,
                    point:     point,
                    formatter: formatter,
                    decimals:  decimals
                }));
            }




        } else if (!strict) {

            //
            // Now comes the scale handling for integer values
            //

            // This accommodates decimals by rounding the max up to the next integer
            max = Math.ceil(max);

            var interval = Math.pow(10, Math.max(1, Number(String(Number(max) - Number(min)).length - 1)) );

            var topValue = interval;

            while (topValue < max) {
                topValue += (interval / 2);
            }

            // Handles cases where the max is (for example) 50.5
            if (Number(original_max) > Number(topValue)) {
                topValue += (interval / 2);
            }

            // Custom if the max is greater than 5 and less than 10
            if (max <= 10) {
                topValue = (Number(original_max) <= 5 ? 5 : 10);
            }
    
    
            // Added 02/11/2010 to create "nicer" scales
            if (args.object && typeof round == 'boolean' && round) {
                topValue = 10 * interval;
            }

            scale.max = topValue;

            // Now generate the scale. Temporarily set the objects scaleDecimal and scalePoint to those
            // that we've been given as the number_format functuion looks at those instead of using
            // arguments.
            var tmp_point    = properties[prefix + 'ScalePoint'];
            var tmp_thousand = properties[prefix + 'ScaleThousand'];

            args.object.set(prefix + 'scaleThousand', thousand);
            args.object.set(prefix + 'scalePoint', point);


            for (var i=0; i<numlabels; ++i) {
                scale.labels.push(RGraph.numberFormat({
                    object:    args.object,
                    number:    ((((i+1) / numlabels) * (topValue - min)) + min).toFixed(decimals),
                    unitspre:  units_pre,
                    unitspost: units_post,
                    point:     point,
                    thousand:  thousand,
                    formatter: formatter
                }) );
                scale.values.push(((((i+1) / numlabels) * (topValue - min)) + min).toFixed(decimals));
            }

            args.object.set(prefix + 'scaleThousand', tmp_thousand);
            args.object.set(prefix + 'scalePoint', tmp_point);

        } else if (typeof max == 'number' && strict) {

            //
            // ymax is set and also strict
            //
            for (var i=0; i<numlabels; ++i) {
                scale.labels.push(RGraph.numberFormat({
                    object:    args.object,
                    number:    ((((i+1) / numlabels) * (max - min)) + min).toFixed(decimals),
                    unitspre:  units_pre,
                    unitspost: units_post,
                    thousand:  thousand,
                    point:     point,
                    formatter: formatter
                }));

                scale.values.push(
                    ((((i+1) / numlabels) * (max - min)) + min).toFixed(decimals)
                );
            }

            // ???
            scale.max = max;
        }


        scale.units_pre  = units_pre;
        scale.units_post = units_post;
        scale.point      = point;
        scale.decimals   = decimals;
        scale.thousand   = thousand;
        scale.numlabels  = numlabels;
        scale.round      = Boolean(round);
        scale.min        = min;
        scale.formatter  = formatter;

        //
        // Convert all of the scale values to numbers
        //
        for (var i=0; i<scale.values.length; ++i) {
            scale.values[i] = parseFloat(scale.values[i]);
        }

        return scale;
    };








    //
    // Parse a gradient thats in JSON format like this:
    //
    // Gradient({colors: ["red","white"],x1:0,y1:25,x2:0,y2:275})
    //
    // @param  args object An object consisting of:
    //                      o object
    //                      o Th gradient definition
    //
    RGraph.parseJSONGradient = function (args)
    {
        var obj      = args.object,
            def      = args.def, // The gradient definition
            context  = args.object.context;

        // Evaluate the JSON
        def = eval("(" + def + ")");





        // Create a radial gradient
        if (typeof def.r1 === 'number' && typeof def.r2 === 'number') {
            // Create the gradient
            var grad = context.createRadialGradient(
                def.x1, def.y1, def.r1,
                def.x2, def.y2, def.r2
            );
        // Create a linear gradient
        } else {
            var grad = context.createLinearGradient(
                def.x1, def.y1,
                def.x2, def.y2
            );
        }




        // Add the parts to the gradient
        var diff = 1 / (def.colors.length - 1);
        
        grad.addColorStop(0, RGraph.trim(def.colors[0]));
        
        for (var j=1,len=def.colors.length; j<len; ++j) {
            grad.addColorStop(j * diff, RGraph.trim(def.colors[j]));
        }

        return grad;
    };







    //
    // A convenient way to get the last element in the array:
    //
    // foo = [8,6,6,7,4,2,3,8];
    // RGraph.arrayLast(foo); // 8
    //
    // @param array array The array to get the last element from
    //
    RGraph.arrayLast = function (array)
    {
        return array[array.length - 1];
    };








    //
    // Converts an the truthy values to falsey values and vice-versa
    //
    // @param  args object An object consisting of:
    //                      o array
    //
    RGraph.arrayInvert = function ()
    {
        var args = RGraph.getArgs(arguments, 'array');

        for (var i=0,len=args.array.length; i<len; ++i) {
            args.array[i] = !args.array[i];
        }

        return args.array;
    };








    //
    // An arrayTrim function that removes the empty elements off
    // both ends
    //
    // @param  args object An object consisting of:
    //                      o array
    // OR
    //
    //@param        array The array to trim
    //
    RGraph.arrayTrim = function ()
    {
        var args = RGraph.getArgs(arguments, 'array');
        var out = [], content = false;

        // Trim the start
        for (var i=0; i<args.array.length; i++) {
        
            if (args.array[i]) {
                content = true;
            }
        
            if (content) {
                out.push(args.array[i]);
            }
        }
        
        // Reverse the array and trim the start again
        out = RGraph.arrayReverse(out);

        var out2 = [], content = false ;
        for (var i=0; i<out.length; i++) {
        
            if (out[i]) {
                content = true;
            }
        
            if (content) {
                out2.push(out[i]);
            }
        }
        
        // Now reverse the array and return it
        out2 = RGraph.arrayReverse(out2);

        return out2;
    };








    //
    //
    // *** OLD VERSION OF THE CLONE FUNCTION ***
    //
    // Makes a clone of an ARRAY
    //
    // @param args object An object containg the array to clone
    // 
    // OR
    //
    // @param args mixed The object to clone
    //
    //RGraph.arrayClone = function ()
    //{
    //    var args = RGraph.getArgs(arguments, 'array,options');
    //    var c;
    //    var structuredClone = args.options && args.options.structuredClone;
    //
    //    if (window.structuredClone && structuredClone) {
    //        c = window.structuredClone(args.array);
    //    } else {
    //        if(args.array === null || typeof args.array !== 'object') {
    //            return args.array;
    //        }
    //
    //        c = JSON.parse(JSON.stringify(args.array));
    //     }
    //
    //    return c;
    //};









    //
    // An updated clone function that works better
    //
    // @param array mixed The variable to clone and
    //                    return a copy of. Doesn't
    //                    clone objects.
    // @param objects boolean Whether to clone objects or not,
    //                        default is no to
    //
    RGraph.arrayClone = function (array, objects = false, maxdepth = 5)
    {
        // This is here to limit recurusion
        if (maxdepth < 0) {
            return;
        }

        var ret = null;

        // Account for undefined values
        if (typeof array === 'undefined') {
            return undefined;
        }

        // Account for null values
        if (typeof array === 'object' && !array) {
            return null;
        }


        switch(typeof array)
        {
            case 'string':
                ret = (function (str){return String(str)})(array);
                break;
            
            case 'number':
                ret = (function (num){return Number(num)})(array);
                break;

            case 'boolean':
                ret = array;
                break;

            case 'object':
                if (array.constructor.toString().indexOf('Array') >= 0) {
                    ret = new Array();  
                    for (var i=0; i<array.length; ++i) {
                        ret[i] = RGraph.arrayClone(array[i], objects, maxdepth - 1);
                    }
                } else if (array.constructor.toString().indexOf('Object') > 0 && objects) {
                    ret = new Object();
                    for (var i in array) {
                        ret[i] = RGraph.arrayClone(array[i], true, maxdepth - 1);
                    }
                }
                break;
            
            case 'function':
                ret = array;
                break;
        }

        return ret;
    };








    //
    // Returns the maximum numeric value which is in an array. This function IS NOT
    // recursive
    // 
    // @param object args An object consisting of an array property which is the array to get
    //                    the max value of.
    //
    // OR
    //
    // @param  array arr The array (can also be a number, in which case it's returned as-is)
    // @param  int       Whether to ignore signs (ie negative/positive)
    // @return int       The maximum value in the array
    //
    RGraph.arrayMax = function ()
    {
        var args = RGraph.getArgs(arguments, 'array,ignore');
        var max = null;
        
        if (typeof args.array === 'number') {
            return args.array;
        }
        
        if (RGraph.isNullish(args.array)) {
            return 0;
        }

        for (var i=0,len=args.array.length; i<len; ++i) {
            if (typeof args.array[i] === 'number' && !isNaN(args.array[i])) {

                var val = args.ignore ? Math.abs(args.array[i]) : args.array[i];
                
                if (typeof max === 'number') {
                    max = Math.max(max, val);
                } else {
                    max = val;
                }
            }
        }

        return max;
    };








    //
    // Returns the minimum numeric value which is in an array
    // 
    // @param  object args An object consisting of the array to find the min of
    //
    // OR
    //
    // @param  array arr The array (can also be a number, in which case it's returned as-is)
    // @param  int       Whether to ignore signs (ie negative/positive)
    // @return int       The minimum value in the array
    //
    RGraph.arrayMin = function (args)
    {
        var args = RGraph.getArgs(arguments, 'array,ignore');

        var max = null,
            min = null,
            ma  = Math;
        
        if (typeof args.array === 'number') {
            return args.array;
        }
        
        if (RGraph.isNullish(args.array)) {
            return 0;
        }

        for (var i=0,len=args.array.length; i<len; ++i) {
            if (typeof args.array[i] === 'number') {

                var val = args.ignore ? Math.abs(args.array[i]) : args.array[i];
                
                if (typeof min === 'number') {
                    min = Math.min(min, val);
                } else {
                    min = val;
                }
            }
        }

        return min;
    };








    //
    // Returns the maximum value which is in an array
    // 
    // @param object args An object which consists of the arguments
    //                    to the function. Keys should be: array, length
    //
    // OR
    //
    // @param  array arr The array
    // @param  int   len The length to pad the array to
    // @param  mixed     The value to use to pad the array (optional)
    //
    RGraph.arrayFill =
    RGraph.arrayPad  = function ()
    {
        var args = RGraph.getArgs(arguments, 'array,length,value');

        if (args.array.length < args.length) {            
            for (var i=args.array.length; i<args.length; i+=1) {
                args.array[i] = args.value;
            }
        }
        
        return args.array;
    };








    //
    // An array sum function
    // 
    // @param object args An object consisting of the argumments to the
    //                    function
    //
    // OR
    //
    // @param  array arr The  array to calculate the total of
    // @return int       The summed total of the arrays elements
    //
    RGraph.arraySum = function ()
    {
        var args = RGraph.getArgs(arguments, 'array');

        // Allow integers
        if (typeof args.array === 'number') {
            return args.array;
        }
        
        // Account for null
        if (RGraph.isNullish(args.array)) {
            return 0;
        }

        var i, sum, len = args.array.length;

        for(i=0,sum=0;i<len;sum+=(args.array[i++]||0));

        return sum;
    };








    //
    // Use this method to remove null vlues from your objects
    // or arrays
    //
    // @param mixed  src An array or an object
    // @param object opt An options object. There's only two
    //                   options currently: By default only arrays
    //                   are handled - ie objects are left untouched.
    //                   Set the options parameter to true if you
    //                   want objects and their properties to be
    //                   checked. For example:
    //
    //                   newobj = RGraph.arrayRemoveNull(
    //                       myArray,
    //                       {objects: true}
    //                   );
    //
    //                   And you can also set a 'value' option to
    //                   the value to replace null values with
    //                   instead of removing them.
    //
    //
    RGraph.arrayRemoveNull = function ()
    {
        var args = RGraph.getArgs(arguments, 'source,options');

        if (!args.options) {
            args.options = {};
        }

        //
        // Remove null values from arrays
        //
        if (RGraph.isArray(args.source)) {
            
            var arr = [];

            for (let i in args.source) {

                if (RGraph.isNullish(args.source[i])) {
                    if (!RGraph.isUndefined(args.options.value)) {
                        arr.push(args.options.value);
                    }
                    continue;
                
                } else if (RGraph.isArray(args.source[i])) {
                    arr.push(RGraph.arrayRemoveNull(args.source[i], args.options));

                } else if (RGraph.isObject(args.source[i]) && args.options.objects) {
                    arr.push(RGraph.arrayRemoveNull(args.source[i], args.options));
                
                } else {                
                    arr.push(args.source[i]);
                }
            }
            
        //
        // Remove null values from objects
        //
        } else if (RGraph.isObject(args.source) && args.options.objects) {

            var arr = {};

            for (let i in args.source) {
                
                if (RGraph.isArray(args.source[i]) || RGraph.isObject(args.source[i])) {
                    arr[i] = RGraph.arrayRemoveNull(args.source[i], args.options);

                } else if (!RGraph.isNullish(args.source[i])) {
                    Object.defineProperty(arr, i, {
                        value: args.source[i]
                    });
                
                } else if (RGraph.isNullish(args.source[i])) {
                    if (!RGraph.isUndefined(args.options.value)) {
                        arr[i] = args.options.value;
                    }
                }
            }
        
        // 
        // Don't remove nulls from objects
        //
        } else if (RGraph.isObject(args.source) && !args.options.objects) {

            var arr = args.source;
        
        // Other types - just return them
        } else {
            var arr = args.source;
        }

        return arr;
    };








    //
    // Takes any number of arguments and adds them to one big linear array
    // which is then returned
    // 
    // @param ... mixed The data to linearise. You can strings, booleans, numbers or arrays
    //
    RGraph.arrayLinearize = function ()
    {
        var arr  = [],
            args = arguments

        for (var i=0,len=args.length; i<len; ++i) {

            if (typeof args[i] === 'object' && args[i]) {
                for (var j=0,len2=args[i].length; j<len2; ++j) {
                    var sub = RGraph.arrayLinearize(args[i][j]);
                    
                    for (var k=0,len3=sub.length; k<len3; ++k) {
                        arr.push(sub[k]);
                    }
                }
            } else {
                arr.push(args[i]);
            }
        }

        return arr;
    };








    //
    // Takes one off the front of the given array and returns the new array.
    //
    // @param object args An object consisting of the array to linearise. 
    //
    // OR
    //
    // @param  array arr The array from which to take one off the front of array
    // @return array     The new array
    //
    RGraph.arrayShift = function()
    {
        var args = RGraph.getArgs(arguments, 'array');
        var ret  = [];
        
        for(var i=1,len=args.array.length; i<len; ++i) {
            ret.push(args.array[i]);
        }
        
        return ret;
    };








    //
    // Reverses the order of an array
    //
    // @param  args object An object consisting of:
    //                      o array
    //
    // OR
    //
    // @param array  arr The array to reverse
    //
    RGraph.arrayReverse = function ()
    {
        var args = RGraph.getArgs(arguments, 'array');

        if (!args.array) {
            return;
        }

        var newarr=[];

        for(var i=args.array.length - 1; i>=0; i-=1) {
            newarr.push(args.array[i]);
        }
        
        return newarr;
    };








    //
    // Returns the absolute value of a number. You can also pass in an
    // array and it will run the abs() function on each element. It
    // operates recursively so sub-arrays are also traversed.
    // 
    // @param  args object An object consisting of:
    //                      o value
    // OR
    //
    // @param array arr The number or array to work on
    //
    RGraph.abs = function ()
    {
        var args = RGraph.getArgs(arguments, 'value');

        if (typeof args.value === 'string') {
            args.value = parseFloat(args.value) || 0;
        }

        if (typeof args.value === 'number') {
            return Math.abs(args.value);
        }

        if (typeof args.value === 'object') {
            for (i in args.value) {
                if (   typeof args.value[i] === 'string'
                    || typeof args.value[i] === 'number'
                    || typeof args.value[i] === 'object') {

                    args.value[i] = RGraph.abs(args.value[i]);
                }
            }
            
            return args.value;
        }
        
        return 0;
    };








    //
    // Clears the canvas by setting the width. You can specify a colour if you wish.
    //
    // @param  args object An object consisting of:
    //                      o canvas
    //                      o color
    // OR
    //
    //
    // @param object canvas The canvas to clear
    // @param mixed         Usually a color string to use to clear the canvas
    //                      with - could also be a gradient object
    //
    RGraph.clear =
    RGraph.Clear = function (args)
    {
        var args    = RGraph.getArgs(arguments, 'canvas,color');
        var obj     = args.canvas.__object__;
        var context = args.canvas.getContext('2d');
        var color   = args.color || (obj && obj.get('clearto'));

        if (!args.canvas) {
            return;
        }
        
        RGraph.fireCustomEvent(obj, 'onbeforeclear');

        //
        // Set the CSS display: to none for DOM text
        //
        if (RGraph.text.domNodeCache && RGraph.text.domNodeCache[args.canvas.id]) {
            for (var i in RGraph.text.domNodeCache[args.canvas.id]) {
                
                var el = RGraph.text.domNodeCache[args.canvas.id][i];
    
                if (el && el.style) {
                    el.style.display = 'none';
                }
            }
        }

        //
        // Can now clear the canvas back to fully transparent
        //
        if (   !color
            || (color && color === 'rgba(0,0,0,0)' || color === 'transparent')
            ) {

            context.clearRect(
                -100,
                -100,
                args.canvas.width + 200,
                args.canvas.height + 200
            );

            // Reset the globalCompositeOperation
            context.globalCompositeOperation = 'source-over';

        } else if (color) {

            obj.path(
                'fs % fr -100 -100 % %',
                color,
                args.canvas.width + 200,
                args.canvas.height + 200
            );
        
        } else {
            obj.path(
                'fs % fr -100 -100 % %',
                obj.get('clearto'),
                args.canvas.width + 200,
                args.canvas.height + 200
            );
        }
        
        //if (RGraph.clearAnnotations) {
            //RGraph.clearAnnotations(canvas.id);
        //}
        
        //
        // This removes any background image that may be present
        //
        if (RGraph.Registry.get('background.image.' + args.canvas.id)) {
            var img            = RGraph.Registry.get('background.image.' + args.canvas.id);
            img.style.position = 'absolute';
            img.style.left     = '-10000px';
            img.style.top      = '-10000px';
        }
        
        //
        // This hides the tooltip that is showing IF it has the same canvas ID as
        // that which is being cleared
        //
        if (RGraph.Registry.get('tooltip') && obj && !obj.get('tooltipsNohideonclear')) {
            RGraph.hideTooltip(args.canvas);
        }

        //
        // Set the cursor to default
        //
        args.canvas.style.cursor = 'default';

        RGraph.fireCustomEvent(obj, 'onclear');
    };








    //
    // Draws the title of the graph
    // 
    // @param object  args   An object consisting of the arguments to the function
    //                        o object
    //
    // OR
    //
    // @param object  canvas The canvas object
    //
    RGraph.drawTitle = function ()
    {
        var args     = RGraph.getArgs(arguments, 'object'),
            obj      = args.object,
            halign   = 'center',
            valign   = 'center',
            x        = ((obj.canvas.width - obj.properties.marginLeft - obj.properties.marginRight) / 2) + obj.properties.marginLeft,
            y        = null,
            textConf = RGraph.getTextConf({
                object: args.object,
                prefix: 'title'
            });


        obj.context.beginPath();
        obj.context.fillStyle = textConf.color;
        
        //
        // If not set then set the size of the text 4 pt higher than
        // the textSize setting. Also set the title to be bold if the
        //bold property isn't set
        //
        if (!RGraph.isNumber(obj.properties.titleSize)) {
            textConf.size += 4;
        }
        if (!RGraph.isBoolean(obj.properties.titleBold)) {
            textConf.bold = true;
        }






        // Determine the Y coordinate
        y = obj.properties.marginTop - textConf.size - 5;

        if (obj.properties.xaxisPosition === 'top') {
            y = obj.canvas.height  - obj.properties.marginBottom + textConf.size + 5;
        }



        //
        // Vertically center the text if the key is not present
        // or if it's not positioned in the margin
        //
        if (obj.properties.key && obj.properties.key.length && obj.properties.keyPosition && obj.properties.keyPosition !== 'margin') {
            var valign = 'center';

        } else if (obj.properties.key && obj.properties.key.length && obj.properties.keyPosition && obj.properties.keyPosition === 'margin') {
            var valign = 'bottom';
            
            // Measure the size of the key text
            var keyTextDim = RGraph.measureText({
                bold:   obj.properties.keyLabelsBold,
                italic: obj.properties.keyLabelsItalic,
                size:   obj.properties.keyLabelsSize,
                font:   obj.properties.keyLabelsFont,
                text:   'Mg'
            });
            
            y -= keyTextDim[1];

        } else {
            var valign = 'center';
        }


        //
        // Now, the titleX and titleY settings override (if set) the above
        if (RGraph.isNumber(obj.properties.titleX)) x = obj.properties.titleX;
        if (RGraph.isNumber(obj.properties.titleY)) y = obj.properties.titleY;

        // the titleX and titleY properties can be strings - in
        // which case the added to the calculated coordinate
        if (RGraph.isString(obj.properties.titleX)) x += parseFloat(obj.properties.titleX);
        if (RGraph.isString(obj.properties.titleY)) y += parseFloat(obj.properties.titleY);

        // Similar to the above - the titleOffsetx and titleOffsety
        // are more explicit properties for moving the title
        if (RGraph.isNumber(obj.properties.titleOffsetx)) x += obj.properties.titleOffsetx;
        if (RGraph.isNumber(obj.properties.titleOffsety)) y += obj.properties.titleOffsety;


        // Set the default vertical alignment for the title
        if (RGraph.isString(obj.properties.titleSubtitle) && obj.properties.titleSubtitle.length > 0) {
            valign = 'bottom';
        } else {
            valign = 'center';
        }



        //
        // Allow the user to override the horizontal alignment
        //
        if (RGraph.isString(obj.properties.titleHalign)) {
            halign = obj.properties.titleHalign;
        }
        
        //
        // Allow the user to override the vertical alignment
        //
        if (RGraph.isString(obj.properties.titleValign)) {
            valign = obj.properties.titleValign;
        }




        
        // Set the color            
        var oldColor = obj.context.fillStyle;
        obj.context.fillStyle = textConf.color ? textConf.color : 'black';





        // Draw the title
        var ret = RGraph.text({
            object:       obj,
            font:         textConf.font,
            size:         textConf.size,
            color:        textConf.color,
            bold:         textConf.bold,
            italic:       textConf.italic,
            x:            x,
            y:            y,
            text:         obj.properties.title,
            valign:       valign,
            halign:       halign,
            tag:          'title',
            marker:       false
        });












        // Draw the subtitle        
        if (typeof obj.properties.titleSubtitle === 'string' && obj.properties.titleSubtitle.length) {

            // Get the size of the title
            // Necessary any more ? var titleSize = textConf.size;
            
            // Set the default subtitle size if it's null
            if (RGraph.isNullish(obj.properties.titleSubtitleSize)) {
                obj.properties.titleSubtitleSize = textConf.size - 4;
            }
        
            var textConf = RGraph.getTextConf({
                object: obj,
                prefix: 'titleSubtitle'
            });

            // Draw the subtitle
            var ret = RGraph.text({
                object:  obj,
                font:    textConf.font,
                size:    textConf.size,
                color:   textConf.color,
                bold:    textConf.bold,
                italic:  textConf.italic,
                x:       x + obj.properties.titleSubtitleOffsetx,
                y:       y + obj.properties.titleSubtitleOffsety,
                text:    obj.properties.titleSubtitle,
                valign:  'top',
                halign:  halign,
                tag:     'subtitle',
                marker:  false
            });
        }






        // Reset the fill colour
        obj.context.fillStyle = oldColor;
    };








    //
    // Gets the mouse X/Y coordinates relative to the canvas
    // 
    // @param  args object An object consisting of:
    //                      o event
    // OR
    //
    // @param object e The event object. As such this method should be used in an event listener.
    //
    RGraph.getMouseXY = function ()
    {
        var args = RGraph.getArgs(arguments, 'event');

        // This is necessary for IE9
        if (!args.event.target) {
            return;
        }

        var el      = args.event.target,
            canvas  = el,
            caStyle = canvas.style,
            offsetX = 0,
            offsetY = 0,
            x,
            y,
            borderLeft  = parseInt(caStyle.borderLeftWidth) || 0,
            borderTop   = parseInt(caStyle.borderTopWidth) || 0,
            paddingLeft = parseInt(caStyle.paddingLeft) || 0,
            paddingTop  = parseInt(caStyle.paddingTop) || 0,
            additionalX = borderLeft + paddingLeft,
            additionalY = borderTop + paddingTop;

        if (typeof args.event.offsetX === 'number' && typeof args.event.offsetY === 'number') {

            if (!RGraph.ISIE && !RGraph.ISOPERA) {
                x = args.event.offsetX - borderLeft - paddingLeft;
                y = args.event.offsetY - borderTop - paddingTop;
            
            } else if (RGraph.ISIE) {
                x = args.event.offsetX - paddingLeft;
                y = args.event.offsetY - paddingTop;
            
            } else {
                x = args.event.offsetX;
                y = args.event.offsetY;
            }   

        } else {

            if (typeof el.offsetParent !== 'undefined') {
                do {
                    offsetX += el.offsetLeft;
                    offsetY += el.offsetTop;
                } while ((el = el.offsetParent));
            }

            x = args.event.pageX - offsetX - additionalX;
            y = args.event.pageY - offsetY - additionalY;

            x -= (2 * (parseInt(document.body.style.borderLeftWidth) || 0));
            y -= (2 * (parseInt(document.body.style.borderTopWidth) || 0));

            //x += (parseInt(caStyle.borderLeftWidth) || 0);
            //y += (parseInt(caStyle.borderTopWidth) || 0);
        }

        // We return a javascript array with x and y defined
        return [x, y];
    };








    //
    // This function returns a two element array of the canvas x/y position in
    // relation to the page
    // 
    // @param  args object An object consisting of:
    //                      o canvas
    // OR
    //
    // @param object canvas
    //
    RGraph.getCanvasXY = function ()
    {
        var args = RGraph.getArgs(arguments, 'canvas');




        // If the getBoundingClientRect function is available - use that
        //
        if (args.canvas.getBoundingClientRect) {
            
            var rect = args.canvas.getBoundingClientRect();

            // Add the the current scrollTop and scrollLeft becuase the getBoundingClientRect()
            // method is relative to the viewport - not the document
            var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                scrollTop  = window.pageYOffset || document.documentElement.scrollTop;
            
            return [rect.x + scrollLeft, rect.y + scrollTop];
        }


















        var x  = 0;
        var y  = 0;
        var el = args.canvas; // !!!

        do {

            x += el.offsetLeft;
            y += el.offsetTop;
            
            // ACCOUNT FOR TABLES IN wEBkIT
            if (el.tagName.toLowerCase() == 'table' && (RGraph.ISCHROME || RGraph.ISSAFARI)) {
                x += parseInt(el.border) || 0;
                y += parseInt(el.border) || 0;
            }

            el = el.offsetParent;

        } while (el && el.tagName.toLowerCase() != 'body');


        var paddingLeft = args.canvas.style.paddingLeft ? parseInt(args.canvas.style.paddingLeft) : 0;
        var paddingTop  = args.canvas.style.paddingTop ? parseInt(args.canvas.style.paddingTop) : 0;
        var borderLeft  = args.canvas.style.borderLeftWidth ? parseInt(args.canvas.style.borderLeftWidth) : 0;
        var borderTop   = args.canvas.style.borderTopWidth  ? parseInt(args.canvas.style.borderTopWidth) : 0;

        if (navigator.userAgent.indexOf('Firefox') > 0) {
            x += parseInt(document.body.style.borderLeftWidth) || 0;
            y += parseInt(document.body.style.borderTopWidth) || 0;
        }

        return [x + paddingLeft + borderLeft, y + paddingTop + borderTop];
    };








    //
    // This function determines whther a canvas is fixed (CSS positioning) or not. If not it returns
    // false. If it is then the element that is fixed is returned (it may be a parent of the canvas).
    // 
    // @param  args object An object consisting of:
    //                      o canvas
    // OR
    //
    // @return Either false or the fixed positioned element
    //
    RGraph.isFixed = function ()
    {
        var args = RGraph.getArgs(arguments, 'canvas');
        var i    = 0;

        while (args.canvas && args.canvas.tagName.toLowerCase() != 'body' && i < 99) {

            if (args.canvas.style.position == 'fixed') {
                return args.canvas;
            }
            
            args.canvas = args.canvas.offsetParent;
        }

        return false;
    };








    //
    // Registers a graph object (used when the canvas is redrawn)
    // 
    // @param  args object An object consisting of:
    //                      o object
    // OR
    //
    // @param object obj The object to be registered
    //
    RGraph.register = function ()
    {
        var args = RGraph.getArgs(arguments, 'object');

        // Allow the registration of functions
        if (typeof args.object === 'function') {
            
            var func = args.object;
            
            // Register a shell object
            var temp = function ()
            {
                this.id            = null;
                this.isFunction    = true;
                this.canvas        = {id: null};
                this.getObjectByXY = function (){return false;};
                this.get           = function (){};
                this.set           = function (){};
                this.draw          = function (){func();};
            };
            
            args.object = new temp();
        }




        // Checking this property ensures the object is only
        // registered once
        if (!args.object.get('noregister') && args.object.get('register') !== false) {
            RGraph.ObjectRegistry.add(args.object);
            args.object.set('register', false);
        }
    };








    //
    // Causes all registered objects to be redrawn
    // 
    // @param  args object An object consisting of:
    //                      o color
    // OR
    //
    // @param string An optional color to use to clear the canvas
    //
    RGraph.redraw = function ()
    {
        var args = RGraph.getArgs(arguments, 'color');
        var objectRegistry = RGraph.ObjectRegistry.objects.byCanvasID;





        // if the argument is a canvas object (ie not a color string) then
        // call .redrawCanvas instead
        if (    typeof args.color === 'object'
            && args.color
            && typeof args.color.toString === 'function'
            && typeof args.color.toString().indexOf === 'function'
            && args.color.toString().indexOf('HTMLCanvasElement') > -1) {
            
            var opt = {canvas: args.color};
            
            // Has a color been given as well?
            if (arguments[1]) {
                opt.color = arguments[1];
            }
            
            return RGraph.redrawCanvas(opt);
        }





        // Get all of the canvas tags on the page
        var tags = document.getElementsByTagName('canvas');

        for (var i=0,len=tags.length; i<len; ++i) {
            if (tags[i] && tags[i].__object__ && tags[i].__object__.isrgraph) {
                
                // Only clear the canvas if it's not Trace'ing - this applies to the Line/Scatter Trace effects
                if (!tags[i].noclear) {
                    RGraph.clear(tags[i], args.color ? args.color : null);
                }
            }
        }

        // Go through the object registry and redraw *all* of the canvas'es that have been registered
        for (var i=0,len=objectRegistry.length; i<len; ++i) {
            if (objectRegistry[i]) {
                var id = objectRegistry[i][0];
                objectRegistry[i][1].draw();
            }
        }
    };








    //
    // Causes all registered objects ON THE GIVEN CANVAS to be redrawn
    // 
    // @param  args object An object consisting of:
    //                      o canvas
    //                      o clear
    //                      o color
    // OR
    //
    // @param canvas object The canvas object to redraw
    // @param        bool   Optional boolean which defaults to true and determines whether to clear the canvas
    //
    RGraph.redrawCanvas = function ()
    {
        var args = RGraph.getArgs(arguments, 'canvas,clear,color');
        var objects = RGraph.ObjectRegistry.getObjectsByCanvasID(args.canvas.id);

        //
        // First clear the canvas
        //
        if (RGraph.isNullish(args.clear) || (typeof args.clear === 'boolean' && args.clear !== false) ) {
            var color = args.color || args.canvas.__object__.get('clearto') || 'transparent';
            RGraph.clear(args.canvas, args.color);
        }
 
        //
        // Now redraw all the charts associated with that canvas
        //
        for (var i=0,len=objects.length; i<len; ++i) {
            if (objects[i]) {
                if (objects[i] && objects[i].isrgraph) { // Is it an RGraph object ??
                    objects[i].draw();
                }
            }
        }
    };








    //
    // This function draws the background for the bar chart, line chart and scatter chart.
    // 
    // @param  args object An object consisting of:
    //                      o object
    // OR
    //
    // @param  object obj The graph object
    //
    RGraph.Background.draw = function ()
    {
        var args         = RGraph.getArgs(arguments, 'object');
        var properties   = args.object.properties,
            height       = 0,
            marginLeft   = args.object.marginLeft,
            marginRight  = args.object.marginRight,
            marginTop    = args.object.marginTop,
            marginBottom = args.object.marginBottom,
            variant      = properties.variant

            RGraph.fireCustomEvent(args.object, 'beforebackground');

            args.object.context.fillStyle = properties.textColor;

            // If it's a bar and 3D variant, translate
            if (variant == '3d') {
                args.object.context.save();
                args.object.context.translate(properties.variantThreedOffsetx, -1 * properties.variantThreedOffsety);
            }
    
            // X axis title (not for the Bar or waterfall charts now - that's done
            // in the newer drawXAxis() function)
            if (
                   args.object.type !== 'bar'
                && args.object.type !== 'waterfall'
                && args.object.type !== 'hbar'
                && args.object.type !== 'line'
                && args.object.type !== 'gantt'
                && args.object.type !== 'scatter'
                && typeof properties.xaxisTitle === 'string'
                && properties.xaxisTitle.length
               ) {
            
                var size   = properties.textSize + 2;
                //var font   = properties.textFont;
                //var bold   = properties.xaxisTitleBold;
                //var italic = properties.xaxisTitleItalic;

                //if (typeof properties.xaxisTitleSize === 'number') {
                //    size = properties.xaxisTitleSize;
                //}
    
                //if (typeof properties.xaxisTitleFont === 'string') {
                //    font = properties.xaxisTitleFont;
                //}
                
                var hpos = ((args.object.canvas.width - marginLeft - marginRight) / 2) + marginLeft;
                var vpos = args.object.canvas.height - marginBottom + 25;
                
                if (typeof properties.xaxisTitlePos === 'number') {
                    vpos = args.object.canvas.height - (marginBottom * properties.xaxisTitlePos);
                }
    
    
    
    
                // Specifically specified X/Y positions
                if (typeof properties.xaxisTitleX === 'number') {
                    hpos = properties.xaxisTitleX;
                }
    
                if (typeof properties.xaxisTitleY === 'number') {
                    vpos = properties.xaxisTitleY;
                }
                
                // Get the text configuration
                var textConf = RGraph.getTextConf({
                    object: args.object,
                    prefix: 'xaxisTitle'
                });
    

                RGraph.text({
                
                  object: args.object,

                    font:   textConf.font,
                    size:   textConf.size,
                    color:  textConf.color,
                    bold:   textConf.bold,
                    italic: textConf.italic,

                    x:      hpos,
                    y:      vpos,
                    text:   properties.xaxisTitle,
                    halign: 'center',
                    valign: 'top',
                    tag:    'xaxis.title'
                });
            }

            // Y axis title
            if (
                   args.object.type !== 'bar'
                && args.object.type !== 'waterfall'
                && args.object.type !== 'hbar'
                && args.object.type !== 'line'
                && args.object.type !== 'gantt'
                && args.object.type !== 'scatter'
                && typeof properties.yaxisTitle === 'string'
                && properties.yaxisTitle.length) {

                var size   = properties.textSize + 2;
                var font   = properties.textFont;
                var italic = properties.textItalic;
                var angle  = 270;
                var bold   = properties.yaxisTitleBold;
                var color  = properties.yaxisTitleColor;

                if (typeof properties.yaxisTitlePos == 'number') {
                    var yaxis_title_pos = properties.yaxisTitlePos * marginLeft;
                } else if (args.object.type === 'hbar' && RGraph.isNullish(properties.yaxisTitlePos) ) {
                    var yaxis_title_pos = properties.marginLeft - args.object.yaxisLabelsSize;
                } else {

                    if (args.object && args.object.scale2) {

                        var yaxisTitleDimensions = RGraph.measureText({
                            text: args.object.scale2.labels[args.object.scale2.labels.length - 1],
                            bold: typeof properties.yaxisScaleBold === 'boolean' ? properties.yaxisScaleBold : properties.textBold,
                            font: properties.yaxisScaleFont || properties.textFont,
                            size: typeof properties.yaxisScaleSize === 'number' ? properties.yaxisScaleSize : properties.textSize
                        });

                    } else {
                        // This is here to allow for the drawing API background
                        // object
                        yaxisTitleDimensions = [0,0];
                    }

                    var yaxis_title_pos = properties.marginLeft - yaxisTitleDimensions[0] - 7;
                }
                if (typeof properties.yaxisTitleSize === 'number') {
                    size = properties.yaxisTitleSize;
                }
    
                if (typeof properties.yaxisTitleItalic === 'boolean') {
                    italic = properties.yaxisTitleItalic;
                }
    
                if (typeof properties.yaxisTitleFont === 'string') {
                    font = properties.yaxisTitleFont;
                }
                
                

                if (   properties.yaxisTitleAlign == 'right'
                    || properties.yaxisTitlePosition == 'right'
                    || (args.object.type === 'hbar' && properties.yaxisPosition === 'right' && typeof properties.yaxisTitleAlign === 'undefined' && typeof properties.yaxisTitlePosition === 'undefined')
                   ) {

                    angle = 90;
                    yaxis_title_pos = typeof properties.yaxisTitlePos === 'number'
                                          ? (args.object.canvas.width - marginRight) + (properties.yaxisTitlePos * marginRight)
                                          : args.object.canvas.width - marginRight + (properties.yaxisLabelsSize || properties.textSize) + 10;

                }

                var y = ((args.object.canvas.height - marginTop - marginBottom) / 2) + marginTop;

                // Specifically specified X/Y positions
                if (typeof properties.yaxisTitleX === 'number') {
                    yaxis_title_pos = properties.yaxisTitleX;
                }
    
                if (typeof properties.yaxisTitleY === 'number') {
                    y = properties.yaxisTitleY;
                }

                args.object.context.fillStyle = color;

                // Get the text configuration
                var textConf = RGraph.getTextConf({
                    object: args.object,
                    prefix: 'yaxisTitle'
                });


                RGraph.text({
                
                  object: args.object,
                
                    font:   textConf.font,
                    size:   textConf.size,
                    color:  textConf.color,
                    bold:   textConf.bold,
                    italic: textConf.italic,

                    x:          yaxis_title_pos,
                    y:          y,
                    valign:     'bottom',
                    halign:     'center',
                    angle:      angle,
                    text:       properties.yaxisTitle,
                    tag:        'yaxis.title',
                    accessible: false
                });
            }
    
            //
            // If the background color is spec ified - draw that. It's a rectangle that fills the
            // entire area within the margins
            //
            var bgcolor = properties.backgroundColor;

            if (bgcolor) {
                args.object.context.fillStyle = bgcolor;
                args.object.context.fillRect(marginLeft + 0.5, marginTop + 0.5, args.object.canvas.width - marginLeft - marginRight, args.object.canvas.height - marginTop - marginBottom);
            }







            //
            // Draw horizontal background bars
            //
            var numbars   = (properties.yaxisLabelsCount || 5);

            // If the backbgroundBarcount property is set use that
            if (typeof properties.backgroundBarsCount === 'number') {
                numbars = properties.backgroundBarsCount;
            }

            // Calculate the height of the bars
            var barHeight = (args.object.canvas.height - marginBottom - marginTop) / numbars;

            args.object.context.beginPath();
                args.object.context.fillStyle   = properties.backgroundBarsColor1;
                args.object.context.strokeStyle = args.object.context.fillStyle;
                height = (args.object.canvas.height - marginBottom);

                for (var i=0; i<numbars; i+=2) {
                    args.object.context.rect(marginLeft,
                        (i * barHeight) + marginTop,
                        args.object.canvas.width - marginLeft - marginRight,
                        barHeight
                    );
                }
            args.object.context.fill();



            args.object.context.beginPath();
                args.object.context.fillStyle   = properties.backgroundBarsColor2;
                args.object.context.strokeStyle = args.object.context.fillStyle;
        
                for (var i=1; i<numbars; i+=2) {
                    args.object.context.rect(
                        marginLeft,
                        (i * barHeight) + marginTop,
                        args.object.canvas.width - marginLeft - marginRight,
                        barHeight
                    );
                }
            
            args.object.context.fill();
            
            // Close any errantly open path
            args.object.context.beginPath();













            //
            // The background grid is cached
            //
            var func = function (obj, cacheCanvas, cacheContext)
            {
                // Draw the background grid
                if (properties.backgroundGrid) {
                
                    properties.backgroundGridHlinesCount += 0.0001;

                    // If autofit is specified, use the .numhlines and .numvlines along with the width to work
                    // out the hsize and vsize
                    if (properties.backgroundGridAutofit) {

                        //
                        // Align the grid to the tickmarks
                        //
                        if (properties.backgroundGridAutofitAlign) {

                            // Align the horizontal lines
                            if (obj.type === 'hbar') {
                                obj.set('backgroundGridHlinesCount', obj.data.length);
                            }

                            // Align the vertical lines for the line
                            if (obj.type === 'line') {

                                if (typeof properties.backgroundGridVlinesCount === 'number') {
                                    // Nada
                                } else if (properties.xaxisLabels && properties.xaxisLabels.length) {
                                    obj.set('backgroundGridVlinesCount', properties.xaxisLabels.length - 1);
                                } else {
                                
                                    obj.set(
                                        'backgroundGridVlinesCount',
                                        obj.data[0].length > 0 ? obj.data[0].length - 1 : 0
                                    );
                                }
                            } else if (obj.type === 'waterfall') {
                                obj.set(
                                    'backgroundGridVlinesCount',
                                    obj.data.length + (properties.total ? 1 : 0)
                                );

                            // Align the vertical lines for the bar
                            } else if (obj.type === 'bar') {
                                
                                // 13/12/2018
                                //
                                // Updated to be the same as the number of data points
                                //
                                obj.set('backgroundGridVlinesCount', obj.data.length);
                            
                            // Align the vertical lines for the Scatter
                            } else if (obj.type === 'scatter') {
                                if (typeof properties.backgroundGridVlinesCount !== 'number') {
                                    
                                    // Set the number of grid lines to the same
                                    // as the number of labels
                                    if (RGraph.isArray(properties.xaxisLabels) && properties.xaxisLabels.length) {
                                        obj.set('backgroundGridVlinesCount', properties.xaxisLabels.length);
                                    
                                    // No labels - set the number of grid lines
                                    // to 10
                                    } else {
                                        obj.set('backgroundGridVlinesCount', 10);
                                    }
                                }

    
                            // Gantt
                            } else if (obj.type === 'gantt') {

                                if (typeof obj.get('backgroundGridVlinesCount') === 'number') {
                                    // Nothing to do here
                                } else {
                                    obj.set('backgroundGridVlinesCount', properties.xaxisScaleMax);
                                }
    
                                obj.set('backgroundGridHlinesCount', obj.data.length);
                            
                            // HBar
                            } else if (obj.type === 'hbar' && RGraph.isNullish(properties.backgroundGridHlinesCount) ) {
                                obj.set('backgroundGridHlinesCount', obj.data.length);
                            }
                        }
    
                        var vsize = ((cacheCanvas.width - marginLeft - marginRight)) / properties.backgroundGridVlinesCount;
                        var hsize = (cacheCanvas.height - marginTop - marginBottom) / properties.backgroundGridHlinesCount;

                        obj.set('backgroundGridVsize', vsize);
                        obj.set('backgroundGridHsize', hsize);
                    }

                    obj.context.beginPath();
                    cacheContext.lineWidth   = properties.backgroundGridLinewidth ? properties.backgroundGridLinewidth : 1;
                    cacheContext.strokeStyle = properties.backgroundGridColor;

                    // Dashed background grid
                    if (properties.backgroundGridDashed && typeof cacheContext.setLineDash == 'function') {
                        cacheContext.setLineDash([3,5]);
                    }
                    
                    // Dotted background grid
                    if (properties.backgroundGridDotted && typeof cacheContext.setLineDash == 'function') {
                        cacheContext.setLineDash([1,3]);
                    }
                    
                    // Custom linedash
                    if (RGraph.isArray(properties.backgroundGridDashArray)) {
                        cacheContext.setLineDash(properties.backgroundGridDashArray);
                    }
                    
                    obj.context.beginPath();
        

                    // Draw the horizontal lines
                    if (properties.backgroundGridHlines) {
                        height = (cacheCanvas.height - marginBottom)
                        var hsize = properties.backgroundGridHsize;
                        
                        for (y=marginTop; y<=(height+1); y+=hsize) {

                            cacheContext.moveTo(marginLeft, Math.round(y));
                            cacheContext.lineTo(args.object.canvas.width - marginRight, Math.round(y));

                            if (   args.object.properties.variant === '3d'
                                && args.object.type === 'bar'
                                && args.object.properties.backgroundGridThreedYaxis) {

                                cacheContext.moveTo(marginLeft, Math.round(y));
                                cacheContext.lineTo(
                                    marginLeft - args.object.properties.variantThreedOffsetx,
                                    Math.round(y) + args.object.properties.variantThreedOffsety
                                );
                            }
                        }
                    }
        
                    // Draw the vertical lines

                    if (properties.backgroundGridVlines) {

                        var width = (cacheCanvas.width - marginRight);
                        var vsize = properties.backgroundGridVsize;

                        for (var x=marginLeft; Math.round(x)<=width; x+=vsize) {
                            cacheContext.moveTo(Math.round(x), marginTop);
                            cacheContext.lineTo(Math.round(x), obj.canvas.height - marginBottom);
                        }
                    }
        
                    if (properties.backgroundGridBorder) {
                        // Make sure a rectangle, the same colour as the grid goes around the graph
                        cacheContext.strokeStyle = properties.backgroundGridColor;    
                        cacheContext.strokeRect(Math.round(marginLeft), Math.round(marginTop), obj.canvas.width - marginLeft - marginRight, obj.canvas.height - marginTop - marginBottom);
                    }
                }
    
                cacheContext.stroke();
    
    
    
                // Ensure the grid is drawn before continuing
                cacheContext.beginPath();
                cacheContext.closePath();
            }

            // Now a cached draw in newer browsers
            RGraph.cachedDraw(
                args.object,
                args.object.uid + '_background',
                func
            );







            // If it's a bar and 3D variant, translate
            if (variant == '3d') {
                args.object.context.restore();
            }

            // Reset the line dash
            if (typeof args.object.context.setLineDash == 'function') {
                //args.object.context.setLineDash([1, 0]); // Old
                args.object.context.setLineDash([]); // New - should be faster
            }
    
            args.object.context.stroke();
            
            
            //
            // Draw the backgroundBorder if requested
            //
            if (properties.backgroundBorder) {
                
                var color     = RGraph.isString(properties.backgroundBorderColor) ? properties.backgroundBorderColor : '#aaa';
                var linewidth = RGraph.isNumber(properties.backgroundBorderLinewidth) ? properties.backgroundBorderLinewidth : 1;
                
                // Dashed background border
                if (properties.backgroundBorderDashed && typeof args.object.context.setLineDash == 'function') {
                    args.object.context.setLineDash([3,5]);
                }
                
                // Dotted background grid
                if (properties.backgroundBorderDotted && typeof args.object.context.setLineDash == 'function') {
                    args.object.context.setLineDash([1,3]);
                }
                
                // Custom linedash
                if (RGraph.isArray(properties.backgroundBorderDashArray)) {
                    args.object.context.setLineDash(properties.backgroundBorderDashArray);
                }

                args.object.path(
                    'b lc square lw % r % % % % s %',
                    linewidth,
                    args.object.properties.marginLeft,
                    args.object.properties.marginTop,
                    args.object.canvas.width  - args.object.properties.marginLeft - args.object.properties.marginRight,
                    args.object.canvas.height - args.object.properties.marginTop  - args.object.properties.marginBottom,
                    color
                );
                
                // Reset the linedash
                //args.object.context.setLineDash([1,0]);  // Old
                args.object.context.setLineDash([]);// New - should be faster
            }



        // Draw the title if one is set
        if ( typeof args.object.properties.title === 'string') {
            RGraph.drawTitle(args.object);
        }
        
        // Fire the background event
        RGraph.fireCustomEvent(args.object, 'background');
    };








    //
    // Formats a number with thousand separators so it's easier to read
    // 
    // @param  args object An object consisting of:
    //                      o object
    //                      o number
    //                      o unitspre
    //                      o unitspost
    //                      o point
    //                      o thousand
    //                      o formatter
    // OR
    //
    // THESE ARE OLDER ARGS:
    // 
    // @param  object obj The chart object
    // @param  integer num The number to format
    // @param  string      The (optional) string to prepend to the string
    // @param  string      The (optional) string to append to the string
    // @return string      The formatted number
    //
    RGraph.numberFormat = function (args)
    {
        var i;
        var prepend = args.unitspre ? String(args.unitspre) : '';
        var append  = args.unitspost ? String(args.unitspost) : '';
        var output  = '';
        var decimal = '';
        var decimal_seperator  = typeof args.point    === 'string' ? args.point    : '.';
        var thousand_seperator = typeof args.thousand === 'string' ? args.thousand : ',';
        RegExp.$1   = '';
        var i,j;

        if (typeof args.formatter === 'function') {
            return (args.formatter)(args);
        }

        // Ignore the preformatted version of "1e-2"
        if (String(args.number).indexOf('e') > 0) {
            return String(prepend + String(args.number) + append);
        }

        // We need then number as a string
        args.number = String(args.number);

        // Take off the decimal part - we re-append it later
        if (args.number.indexOf('.') > 0) {
            var tmp    = args.number;
            args.number = args.number.replace(/\.(.*)/, ''); // The front part of the number
            decimal    = tmp.replace(/(.*)\.(.*)/, '$2'); // The decimal part of the number
        }

        // Thousand separator
        //var separator = arguments[1] ? String(arguments[1]) : ',';
        var seperator = thousand_seperator;

        // Work backwards adding the thousand separators
        //
        // ** i is a local variable at this poin **
        var foundPoint;
        for (i=(args.number.length - 1),j=0; i>=0; j++,i--) {
            var character = args.number.charAt(i);
            
            if ( j % 3 == 0 && j != 0) {
                output += seperator;
            }
            
            //
            // Build the output
            //
            output += character;
        }

        //
        // Now need to reverse the string
        //
        var rev = output;
        output = '';
        for (i=(rev.length - 1); i>=0; i--) {
            output += rev.charAt(i);
        }

        // Tidy up
        //output = output.replace(/^-,/, '-');
        if (output.indexOf('-' + args.thousand) == 0) {
            output = '-' + output.substr(('-' + args.thousand).length);
        }

        // Reappend the decimal
        if (decimal.length) {
            output =  output + decimal_seperator + decimal;
            decimal = '';
            RegExp.$1 = '';
        }

        // Minor bugette
        if (output.charAt(0) == '-') {
            output = output.replace(/-/, '');
            prepend = '-' + prepend;
        }
        
        // Get rid of leading commas
        output = output.replace(/^,+/,'');

        return prepend + output + append;
    };








    //
    // Draws horizontal coloured bars on something like the bar, line or scatter
    // 
    // @param  args object An object consisting of:
    //                      o object
    //
    RGraph.drawBars = function ()
    {
        var args       = RGraph.getArgs(arguments, 'object'),
            properties = args.object.properties,
            hbars      = properties.backgroundHbars;

        if (hbars === null) {
            return;
        }

        //
        // Draws a horizontal bar
        //
        args.object.context.beginPath();

        for (var i=0,len=hbars.length; i<len; ++i) {
        
            var start  = hbars[i][0];
            var length = hbars[i][1];
            var color  = hbars[i][2];
            

            // Perform some bounds checking
            if(RGraph.isNullish(start))start = args.object.scale2.max
            if (start > args.object.scale2.max) start = args.object.scale2.max;
            if (RGraph.isNullish(length)) length = args.object.scale2.max - start;
            if (start + length > args.object.scale2.max) length = args.object.scale2.max - start;
            if (start + length < (-1 * args.object.scale2.max) ) length = (-1 * args.object.scale2.max) - start;

            if (properties.xaxisPosition == 'center' && start == args.object.scale2.max && length < (args.object.scale2.max * -2)) {
                length = args.object.scale2.max * -2;
            }


            //
            // Draw the bar
            //
            var x = properties.marginLeft;
            var y = args.object.getYCoord(start);
            var w = args.object.canvas.width - properties.marginLeft - properties.marginRight;
            var h = args.object.getYCoord(start + length) - y;

            // Accommodate Opera :-/
            if (RGraph.ISOPERA != -1 && properties.xaxisPosition == 'center' && h < 0) {
                h *= -1;
                y = y - h;
            }

            //
            // Account for X axis at the top
            //
            if (properties.xaxisPosition == 'top') {
                y  = args.object.canvas.height - y;
                h *= -1;
            }

            args.object.context.fillStyle = color;
            args.object.context.fillRect(x, y, w, h);
        }




//
//            // If the X axis is at the bottom, and a negative max is given, warn the user
//            if (args.object.get('xaxisPosition') == 'bottom' && (hbars[i][0] < 0 || (hbars[i][1] + hbars[i][1] < 0)) ) {
//                alert('[' + args.object.type.toUpperCase() + ' (ID: ' + args.object.id + ') BACKGROUND HBARS] You have a negative value in one of your background hbars values, whilst the X axis is in the center');
//            }
//
//            var ystart = (args.object.grapharea - (((hbars[i][0] - args.object.scale2.min) / (args.object.scale2.max - args.object.scale2.min)) * args.object.grapharea));
//            //var height = (Math.min(hbars[i][1], args.object.max - hbars[i][0]) / (args.object.scale2.max - args.object.scale2.min)) * args.object.grapharea;
//            var height = args.object.getYCoord(hbars[i][0]) - args.object.getYCoord(hbars[i][1]);
//
//           // Account for the X axis being in the center
//            if (args.object.get('xaxisPosition') == 'center') {
//                ystart /= 2;
//                //height /= 2;
//            }
//            
//            ystart += args.object.get('marginTop')
//
//            var x = args.object.get('marginLeft');
//            var y = ystart - height;
//            var w = args.object.canvas.width - args.object.get('marginLeft') - args.object.get('marginRight');
//            var h = height;
//
//            // Accommodate Opera :-/
//            if (navigator.userAgent.indexOf('Opera') != -1 && args.object.get('xaxisPosition') == 'center' && h < 0) {
//                h *= -1;
//                y = y - h;
//            }
//            
//            //
//            // Account for X axis at the top
//            //
//            //if (args.object.get('xaxisPosition') == 'top') {
//            //    y  = args.object.canvas.height - y;
//            //    h *= -1;
//            //}
//
//            //args.object.context.fillStyle = hbars[i][2];
//            //args.object.context.fillRect(x, y, w, h);
//        //}
    };








    //
    // Draws in-graph labels.
    // 
    // @param  args object An object consisting of:
    //                      o object
    // OR
    //
    // @param object obj The graph object
    //
    RGraph.drawInGraphLabels = function ()
    {
        var args             = RGraph.getArgs(arguments, 'object');
        var properties       = args.object.properties,
            labels           = properties.labelsIngraph,
            labels_processed = [];

        // Defaults
        var fgcolor   = 'black',
            bgcolor   = 'white',
            direction = 1;

        if (!labels) {
            return;
        }

        // Get the text configuration
        var textConf = RGraph.getTextConf({
            object: args.object,
            prefix: 'labelsIngraph'
        });

        //
        // Preprocess the labels array. Numbers are expanded
        //
        for (var i=0,len=labels.length; i<len; i+=1) {
            if (typeof labels[i] === 'number') {
                for (var j=0; j<labels[i]; ++j) {
                    labels_processed.push(null);
                }
            } else if (typeof labels[i] === 'string' || typeof labels[i] === 'object') {
                labels_processed.push(labels[i]);

            } else {
                labels_processed.push('');
            }
        }








        // Turn off any shadow
        RGraph.noShadow(args.object);








        if (labels_processed && labels_processed.length > 0) {

            for (var i=0,len=labels_processed.length; i<len; i+=1) {
                if (labels_processed[i]) {
                    var coords = args.object.coords[i];
                    
                    if (coords && coords.length > 0) {
                        var x      = ((args.object.type == 'bar' ? coords[0] + (coords[2] / 2) : coords[0])) + (properties.labelsIngraphOffsetx || 0);
                        var y      = (args.object.type == 'bar' ? coords[1] + (coords[3] / 2) : coords[1]) + (properties.labelsIngraphOffsety || 0);
                        var length = typeof labels_processed[i][4] === 'number' ? labels_processed[i][4] : 25;
    
                        args.object.context.beginPath();
                        args.object.context.fillStyle   = 'black';
                        args.object.context.strokeStyle = 'black';
                        

                        if (args.object.type === 'bar') {
                        
                            //
                            // X axis at the top
                            //
                            if (args.object.get('xaxisPosition') == 'top') {
                                length *= -1;
                            }
    
                            if (properties.variant == 'dot') {
                                args.object.context.moveTo(Math.round(x), args.object.coords[i][1] - 5);
                                args.object.context.lineTo(Math.round(x), args.object.coords[i][1] - 5 - length);
                                
                                var text_x = Math.round(x);
                                var text_y = args.object.coords[i][1] - 5 - length;
                            
                            } else if (properties.variant == 'arrow') {
                                args.object.context.moveTo(Math.round(x), args.object.coords[i][1] - 5);
                                args.object.context.lineTo(Math.round(x), args.object.coords[i][1] - 5 - length);
                                
                                var text_x = Math.round(x);
                                var text_y = args.object.coords[i][1] - 5 - length;
                            
                            } else {
    
                                args.object.context.arc(Math.round(x), y, 2.5, 0, 6.28, 0);
                                args.object.context.moveTo(Math.round(x), y);
                                args.object.context.lineTo(Math.round(x), y - length);

                                var text_x = Math.round(x);
                                var text_y = y - length;
                            }

                            args.object.context.stroke();
                            args.object.context.fill();
                            
    
                        } else {

                            if (
                                typeof labels_processed[i] == 'object' &&
                                typeof labels_processed[i][3] == 'number' &&
                                labels_processed[i][3] == -1
                               ) {

                                // Draw an up arrow
                                drawUpArrow(x, y)
                                var valign = 'top';
                                
                                var text_x = x;
                                var text_y = y + 5 + length;
                            
                            } else {

                                var text_x = x;
                                var text_y = y - 5 - length;

                                if (text_y < 5 && (typeof labels_processed[i] === 'string' || typeof labels_processed[i][3] === 'undefined')) {
                                    text_y = y + 5 + length;
                                    var valign = 'top';
                                }

                                if (valign === 'top') {
                                    /// Draw an down arrow
                                    drawUpArrow(x, y);
                                } else {
                                    /// Draw an up arrow
                                    drawDownArrow(x, y);
                                }
                            }
                        
                            args.object.context.fill();
                        }

                        args.object.context.beginPath();

                            // Foreground color
                            if ((typeof labels_processed[i] === 'object' && typeof labels_processed[i][1] === 'string')) {
                                args.object.context.fillStyle = labels_processed[i][1];
                            } else {
                                args.object.context.fillStyle = properties.labelsIngraphColor;
                            }

                            RGraph.text({
                            
                              object:            args.object,

                                font:            textConf.font,
                                size:            textConf.size,
                                color:           args.object.context.fillStyle || textConf.color,
                                bold:            textConf.bold,
                                italic:          textConf.italic,

                                x:               text_x,
                                y:               text_y + (args.object.properties.textAccessible ? 2 : 0),

                                text:            (typeof labels_processed[i] === 'object' && typeof labels_processed[i][0] === 'string') ? labels_processed[i][0] : labels_processed[i],
                                valign:          valign || 'bottom',
                                halign:          'center',
                                bounding:        true,
                                'bounding.fill': (typeof labels_processed[i] === 'object' && typeof labels_processed[i][2] === 'string') ? labels_processed[i][2] : 'white',
                                tag:             'labels ingraph'
                            });
                        args.object.context.fill();
                    }




                    // Draws a down arrow
                    function drawUpArrow (x, y)
                    {
                        args.object.context.moveTo(Math.round(x), y + 5);
                        args.object.context.lineTo(Math.round(x), y + 5 + length);
                        
                        args.object.context.stroke();
                        args.object.context.beginPath();                                
                        
                        // This draws the arrow
                        args.object.context.moveTo(Math.round(x), y + 5);
                        args.object.context.lineTo(Math.round(x) - 3, y + 10);
                        args.object.context.lineTo(Math.round(x) + 3, y + 10);
                        args.object.context.closePath();
                    }




                    // Draw an up arrow
                    function drawDownArrow (x, y)
                    {
                        args.object.context.moveTo(Math.round(x), y - 5);
                        args.object.context.lineTo(Math.round(x), y - 5 - length);
                        
                        args.object.context.stroke();
                        args.object.context.beginPath();
                        
                        // This draws the arrow
                        args.object.context.moveTo(Math.round(x), y - 5);
                        args.object.context.lineTo(Math.round(x) - 3, y - 10);
                        args.object.context.lineTo(Math.round(x) + 3, y - 10);
                        args.object.context.closePath();
                    }
                    
                    valign = undefined;
                }
            }
        }
    };








    //
    // This function hides the crosshairs coordinates. This function
    // has no arguments
    //
    RGraph.hideCrosshairCoords = function ()
    {
        var div = RGraph.Registry.get('coordinates.coords.div');

        if (   div
            && div.style.opacity == 1
            && div.__object__.get('crosshairsCoordsFadeout')
           ) {
            
            var style = RGraph.Registry.get('coordinates.coords.div').style;

            setTimeout(function() {style.opacity = 0.9;}, 25);
            setTimeout(function() {style.opacity = 0.8;}, 50);
            setTimeout(function() {style.opacity = 0.7;}, 75);
            setTimeout(function() {style.opacity = 0.6;}, 100);
            setTimeout(function() {style.opacity = 0.5;}, 125);
            setTimeout(function() {style.opacity = 0.4;}, 150);
            setTimeout(function() {style.opacity = 0.3;}, 175);
            setTimeout(function() {style.opacity = 0.2;}, 200);
            setTimeout(function() {style.opacity = 0.1;}, 225);
            setTimeout(function() {style.opacity = 0;}, 250);
            setTimeout(function() {style.display = 'none';}, 275);
        }
    };









    //
    // Draws the3D axes/background
    // 
    // @param  args object An object consisting of:
    //                      o object
    // OR
    //
    // @param object obj The chart object
    //
    RGraph.draw3DAxes = function ()
    {
        var args       = RGraph.getArgs(arguments, 'object');
        var properties = args.object.properties;

        var marginLeft    = args.object.marginLeft,
            marginRight   = args.object.marginRight,
            marginTop     = args.object.marginTop,
            marginBottom  = args.object.marginBottom,
            xaxispos      = properties.xaxisPosition,
            graphArea     = args.object.canvas.height - marginTop - marginBottom,
            halfGraphArea = graphArea / 2,
            offsetx       = properties.variantThreedOffsetx,
            offsety       = properties.variantThreedOffsety,
            xaxis         = properties.variantThreedXaxis,
            yaxis         = properties.variantThreedYaxis


        //
        // Draw the 3D Y axis
        //
        if (yaxis) {
            RGraph.draw3DYAxis(args.object);
        }
        
        
        
        // X axis
        if (xaxis) {
            if (xaxispos === 'center') {
                args.object.path(
                    'b m % % l % % l % % l % % c s #aaa f %',
                    marginLeft,marginTop + halfGraphArea,
                    marginLeft + offsetx,marginTop + halfGraphArea - offsety,
                    args.object.canvas.width - marginRight + offsetx,marginTop + halfGraphArea - offsety,
                    args.object.canvas.width - marginRight,marginTop + halfGraphArea,
                    properties.variantThreedXaxisColor
                );

            } else {

                if (args.object.type === 'hbar') {
                    var xaxisYCoord = args.object.canvas.height - args.object.properties.marginBottom;
                } else {
                    var xaxisYCoord = args.object.getYCoord(0);
                }

                args.object.path(
                    'm % % l % % l % % l % % c s #aaa f %',
                    marginLeft,xaxisYCoord,
                    marginLeft + offsetx,xaxisYCoord - offsety,
                    args.object.canvas.width - marginRight + offsetx,xaxisYCoord - offsety,
                    args.object.canvas.width - marginRight,xaxisYCoord,
                    properties.variantThreedXaxisColor
                );
            }
        }
    };








    //
    // Draws the3D Y axis/background
    // 
    // @param  args object An object consisting of:
    //                      o object
    // OR
    //
    // @param object obj The chart object
    //
    RGraph.draw3DYAxis = function (args)
    {
        var args       = RGraph.getArgs(arguments, 'object');
        var properties = args.object.properties;

        var marginLeft    = args.object.marginLeft,
            marginRight   = args.object.marginRight,
            marginTop     = args.object.marginTop,
            marginBottom  = args.object.marginBottom,
            xaxispos      = properties.xaxisPosition,
            graphArea     = args.object.canvas.height - marginTop - marginBottom,
            halfGraphArea = graphArea / 2,
            offsetx       = properties.variantThreedOffsetx,
            offsety       = properties.variantThreedOffsety,
            yaxisFill     = properties.variantThreedYaxisColor || '#ddd';

        
        
        // Y axis
        // Commented out the if condition because of drawing oddities
        //if (!properties.noaxes && !properties.noyaxis) {

            if ( (args.object.type === 'hbar' || args.object.type === 'bar') && properties.yaxisPosition === 'center') {
                var x = ((args.object.canvas.width - marginLeft - marginRight) / 2) + marginLeft;
            } else if ((args.object.type === 'hbar' || args.object.type === 'bar') && properties.yaxisPosition === 'right') {
                var x = args.object.canvas.width - marginRight;
            } else {
                var x = marginLeft;
            }

            args.object.path(
                'b m % % l % % l % % l % % s #aaa f % b', // Don't know the b at the end is needed
                x,marginTop,
                x + offsetx, marginTop - offsety,
                x + offsetx, args.object.canvas.height - marginBottom - offsety,
                x,args.object.canvas.height - marginBottom,
                properties.variantThreedYaxisColor
            );
        //}
    };








    //
    // Draws a filled rectangle with curvy corners
    // 
    // @param  args object An object consisting of:
    //                      o context
    //                      o x
    //                      o y
    //                      o w
    //                      o h
    //                      o roundtl
    //                      o roundtr
    //                      o roundbl
    //                      o roundbr
    // OR
    //
    // @param context object The context
    // @param x       number The X coordinate (top left of the square)
    // @param y       number The Y coordinate (top left of the square)
    // @param w       number The width of the rectangle
    // @param h       number The height of the rectangle
    // @param         number The radius of the curved corners
    // @param         boolean Whether the top left corner is curvy
    // @param         boolean Whether the top right corner is curvy
    // @param         boolean Whether the bottom right corner is curvy
    // @param         boolean Whether the bottom left corner is curvy
    //
    RGraph.roundedRect = function ()
    {
        var args = RGraph.getArgs(arguments, 'context,x,y,width,height,radius,roundtl,roundtr,roundbl,roundbr');

        // The corner radius
        var r = args.radius ? args.radius : 3;

        // Change the radius based on the smallest width or height
        r = Math.min(
            Math.min(args.width, args.height) / 2,
            args.radius
        );

        // The corners
        var corner_tl = (args.roundtl === false) ? false : true,
            corner_tr = (args.roundtr === false) ? false : true,
            corner_bl = (args.roundbl === false) ? false : true,
            corner_br = (args.roundbr === false) ? false : true;

        args.context.beginPath();
            
            args.context.moveTo(args.x, args.y + r);

            // Top left corner
            if (corner_tl) {
                args.context.arc(args.x + r, args.y + r, r, RGraph.PI, RGraph.PI + RGraph.HALFPI, false);
            } else {
                args.context.lineTo(args.x, args.y);
                args.context.lineTo(args.x + r, args.y);
            }

            // Top right corner
            if (corner_tr) {
                args.context.arc(args.x + args.width - r, args.y + r, r, RGraph.PI + RGraph.HALFPI, 0, false);
            } else {
                args.context.lineTo(args.x + args.width, args.y);
                args.context.lineTo(args.x + args.width, args.y + r);
            }



            // Bottom right corner
            if (corner_br) {
                args.context.arc(args.x + args.width - r, args.y + args.height - r, r, 0, RGraph.HALFPI, false);
            } else {
                args.context.lineTo(args.x + args.width, args.y + args.height);
                args.context.lineTo(args.x + args.width - r, args.y + args.height);
            }

            // Bottom left corner
            if (corner_bl) {
                args.context.arc(args.x + r, args.y - r + args.height, r, RGraph.HALFPI, RGraph.PI, false);
            } else {
                args.context.lineTo(args.x, args.y + args.height);
                args.context.lineTo(args.x, args.y + args.height - r);
            }
            
            args.context.closePath();
    };








    //
    // Hides the zoomed canvas.
    //
    // UPDATE 14th Oct 2019
    // Zoom has been removed for some time now so this is now commented out
    //
    //RGraph.hideZoomedCanvas =
    //RGraph.HideZoomedCanvas = function ()
    //{
    //    var interval = 10;
    //    var frames   = 15;
    //
    //    if (typeof RGraph.zoom_image === 'object') {
    //        var obj        = RGraph.zoom_image.obj;
    //        var properties = obj.properties;
    //    } else {
    //        return;
    //    }
    //
    //    if (properties.zoomFadeOut) {
    //        for (var i=frames,j=1; i>=0; --i, ++j) {
    //            if (typeof RGraph.zoom_image === 'object') {
    //                setTimeout("RGraph.zoom_image.style.opacity = " + String(i / 10), j * interval);
    //            }
    //        }
    //
    //        if (typeof RGraph.zoom_background === 'object') {
    //            setTimeout("RGraph.zoom_background.style.opacity = " + String(i / frames), j * interval);
    //        }
    //    }
    //
    //    if (typeof RGraph.zoom_image === 'object') {
    //        setTimeout("RGraph.zoom_image.style.display = 'none'", properties.zoomFadeOut ? (frames * interval) + 10 : 0);
    //    }
    //
    //    if (typeof RGraph.zoom_background === 'object') {
    //        setTimeout("RGraph.zoom_background.style.display = 'none'", properties.zoomFadeOut ? (frames * interval) + 10 : 0);
    //    }
    //};








    //
    // Adds an event handler
    // 
    // @param  args object An object consisting of:
    //                      o object
    //                      o name
    //                      o func
    // OR
    //
    // @param object obj   The graph object
    // @param string event The name of the event, eg ontooltip
    // @param object func  The callback function
    //
    RGraph.addCustomEventListener = function ()
    {
        var args = RGraph.getArgs(arguments, 'object,name,func');

        // Initialise the events array if necessary
        if (typeof RGraph.events[args.object.uid] === 'undefined') {
            RGraph.events[args.object.uid] = [];
        }

        // Prepend "on" if necessary
        if (args.name.substr(0, 2) !== 'on') {
            args.name = 'on' + args.name;
        }

        RGraph.events[args.object.uid].push([
            args.object,
            args.name,
            args.func
        ]);

        return RGraph.events[args.object.uid].length - 1;
    };








    //
    // Used to fire one of the RGraph custom events
    // 
    // @param  args object An object consisting of:
    //                      o object
    //                      o name
    // OR
    //
    // @param object obj   The graph object that fires the event
    // @param string event The name of the event to fire
    //
    RGraph.fireCustomEvent = function ()
    {
        var args = RGraph.getArgs(arguments, 'object,name');

        // Prepend the name with "on" if necessary
        if (args.name.substr(0,2) !== 'on') {
            args.name = 'on' + args.name;
        }

        if (args.object && args.object.isrgraph) {

            // This allows the eventsMouseout property to work
            // (for some reason...)
            //
            // 25/10/19 - Taken out
            //
            //if (args.name.match(/(on)?mouseout/) && typeof args.object.properties.eventsMouseout === 'function') {
            //    (args.object.properties.eventsMouseout)(args.object);
            //}
            // DOM1 style of adding custom events
            if (args.object[args.name]) {
                (args.object[args.name])(args.object);
            }

            var uid = args.object.uid;

            if (   typeof uid === 'string'
                && typeof RGraph.events === 'object'
                && typeof RGraph.events[uid] === 'object'
                && RGraph.events[uid].length > 0) {

                for(var j=0; j<RGraph.events[uid].length; ++j) {
                    if (RGraph.events[uid][j] && RGraph.events[uid][j][1] === args.name) {
                        RGraph.events[uid][j][2](args.object);
                    }
                }
            }
        }
    };








    //
    // Clears all the custom event listeners that have been registered
    // 
    // @param  args object An object consisting of:
    //                      o uid
    // OR
    //
    // @param    string Limits the clearing to this object UID
    //
    RGraph.removeAllCustomEventListeners = function ()
    {
        var args = RGraph.getArgs(arguments, 'uid');

        if (args.uid && RGraph.events[args.uid]) {
            RGraph.events[args.uid] = [];
        } else {
            RGraph.events = [];
            
            // Use the ObjectRegistry to iterate through all registered objects
            // and remove the DOM1 listeners
            RGraph.ObjectRegistry.iterate(function (obj)
            {
                if (obj.onclick)     obj.onclick     = null;
                if (obj.onmousemove) obj.onmousemove = null;
                if (obj.onmouseover) obj.onmouseover = null;
                if (obj.onmouseout)  obj.onmouseout  = null;
            });
        }
    };








    //
    // Clears a particular custom event listener
    // 
    // @param object obj The graph object
    // @param number i   This is the index that is return by .addCustomEventListener()
    //
    RGraph.removeCustomEventListener = function ()
    {
        var args = RGraph.getArgs(arguments, 'object,index');

        if (   typeof RGraph.events === 'object'
            && typeof RGraph.events[args.object.uid] === 'object'
            && typeof RGraph.events[args.object.uid][args.index] === 'object') {

            RGraph.events[args.object.uid][args.index] = null;
        }
    };








    //
    // This draws the background
    // @param  args object An object consisting of:
    //                      o object
    // OR
    // 
    // @param object obj The graph object
    //
    RGraph.drawBackgroundImage = function (args)
    {
        var args       = RGraph.getArgs(arguments, 'object');
        var properties = args.object.properties;

        if (typeof properties.backgroundImage === 'string') {
            if (typeof args.object.canvas.__rgraph_background_image__ === 'undefined') {
                var img = new Image();
                img.__object__  = args.object;
                img.__canvas__  = args.object.canvas;
                img.__context__ = args.object.context;
                img.src         = args.object.get('backgroundImage');
                
                args.object.canvas.__rgraph_background_image__ = img;
            } else {
                img = args.object.canvas.__rgraph_background_image__;
            }

            // When the image has loaded - redraw the canvas
            img.onload = function ()
            {
                args.object.__rgraph_background_image_loaded__ = true;
                RGraph.clear(args.object.canvas);
                RGraph.redrawCanvas(args.object.canvas);
            }
                
            var marginLeft   = args.object.marginLeft;
            var marginRight  = args.object.marginRight;
            var marginTop    = args.object.marginTop;
            var marginBottom = args.object.marginBottom;
            var stretch      = properties.backgroundImageStretch;
            var align        = properties.backgroundImageAlign;
    
            // Handle backgroundImage.align
            if (typeof align === 'string') {
                if (align.indexOf('right') != -1) {
                    var x = args.object.canvas.width - (properties.backgroundImageW || img.width) - marginRight;
                } else {
                    var x = marginLeft;
                }
    
                if (align.indexOf('bottom') != -1) {
                    var y = args.object.canvas.height - (properties.backgroundImageH || img.height) - marginBottom;
                } else {
                    var y = marginTop;
                }
            } else {
                var x = marginLeft || 25;
                var y = marginTop || 25;
            }

            // X/Y coords take precedence over the align
            var x = typeof properties.backgroundImageX === 'number' ? properties.backgroundImageX : x;
            var y = typeof properties.backgroundImageY === 'number' ? properties.backgroundImageY : y;
            var w = stretch ? args.object.canvas.width - marginLeft - marginRight : img.width;
            var h = stretch ? args.object.canvas.height - marginTop - marginBottom : img.height;
            
            //
            // You can now specify the width and height of the image
            //
            if (typeof properties.backgroundImageW === 'number') w  = properties.backgroundImageW;
            if (typeof properties.backgroundImageH === 'number') h = properties.backgroundImageH;

            var oldAlpha = args.object.context.globalAlpha;
                args.object.context.globalAlpha = properties.backgroundImageAlpha;
                args.object.context.drawImage(img,x,y,w, h);
            args.object.context.globalAlpha = oldAlpha;
        }
    };








    //
    // This function determines wshether an object has tooltips or not
    // 
    // @param  args object An object consisting of:
    //                      o object
    // OR
    //
    // @param object obj The chart object
    //
    RGraph.hasTooltips = function ()
    {
        var args       = RGraph.getArgs(arguments, 'object');
        var properties = args.object.properties;

        if (typeof properties.tooltips == 'object' && properties.tooltips) {
            for (var i=0,len=properties.tooltips.length; i<len; ++i) {
                if (!RGraph.isNullish(args.object.get('tooltips')[i])) {
                    return true;
                }
            }

        } else if (typeof properties.tooltips === 'string') {
            return true;

        } else if (typeof properties.tooltips === 'function') {
            return true;
        }
        
        return false;
    };








    //
    // This function creates a (G)UID which can be used to identify objects.
    // 
    // @return string The (G)UID
    //
    RGraph.createUID = function ()
    {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c)
        {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    };








    //
    // This is the object registry, used to facilitate multiple objects per canvas.
    // 
    // @param  args object An object consisting of:
    //                      o object
    // OR
    //
    // @param object obj The object to register
    //
    RGraph.ObjectRegistry.add = function ()
    {
        var args = RGraph.getArgs(arguments, 'object');
        var uid  = args.object.uid;
        var id   = args.object.canvas.id;

        //
        // Index the objects by UID
        //
        //RGraph.ObjectRegistry.objects.byUID.push([uid, obj]);
        RGraph.ObjectRegistry.objects.byUID[RGraph.ObjectRegistry.objects.byUID.length] = [uid, args.object];
        
        //
        // Index the objects by the canvas that they're drawn on
        //
        RGraph.ObjectRegistry.objects.byCanvasID.push([
            id,
            args.object
        ]);
    };








    //
    // Remove an object from the object registry
    // 
    // @param  args object An object consisting of:
    //                      o object
    // OR
    //
    // @param object obj The object to remove.
    //
    RGraph.ObjectRegistry.remove = function ()
    {
        var args = RGraph.getArgs(arguments, 'object');
        var id  = args.object.id;
        var uid = args.object.uid;

        for (var i=0; i<RGraph.ObjectRegistry.objects.byUID.length; ++i) {
            if (RGraph.ObjectRegistry.objects.byUID[i] && RGraph.ObjectRegistry.objects.byUID[i][1].uid == uid) {
                RGraph.ObjectRegistry.objects.byUID[i] = null;
            }
        }


        for (var i=0; i<RGraph.ObjectRegistry.objects.byCanvasID.length; ++i) {
            if (   RGraph.ObjectRegistry.objects.byCanvasID[i]
                && RGraph.ObjectRegistry.objects.byCanvasID[i][1]
                && RGraph.ObjectRegistry.objects.byCanvasID[i][1].uid == uid) {
                
                RGraph.ObjectRegistry.objects.byCanvasID[i] = null;
            }
        }
    };








    //
    // Removes all objects from the ObjectRegistry. If either the ID of a canvas is supplied,
    // or the canvas itself, then only objects pertaining to that canvas are cleared.
    // 
    // @param  args object An object consisting of:
    //                      o object or ID or canvas
    // OR
    //
    // @param mixed   Either a canvas object (as returned by document.getElementById()
    //                or the ID of a canvas (ie a string)
    //
    RGraph.ObjectRegistry.clear = function ()
    {
        if (   typeof arguments[0] === 'object'
            && !RGraph.isNullish(arguments)
            && (typeof arguments[0].canvas === 'object' || typeof arguments[0].id === 'string')
           ) {

            var args = arguments[0];

        } else {
        
            // A string has been given
            if (typeof arguments[0] === 'string') {
                var args = {
                    id: arguments[0]
                };
            
            // A canvas has been given
            } else if (typeof arguments[0] === 'object' && arguments[0].getContext) {
                var args = {
                    canvas: arguments[0]
                };

            // No args given - so cear the entire registry
            } else {

                RGraph.ObjectRegistry.objects            = {};
                RGraph.ObjectRegistry.objects.byUID      = [];
                RGraph.ObjectRegistry.objects.byCanvasID = [];
                
                return;
            }
        }

        // If an ID is supplied restrict the learing to that
        if (args.id || args.canvas) { // A string

            // Get the ID of the canvas if a canvas tag has been given
            if (args.canvas) {
                args.id = args.canvas.id;
            }

            var objects = RGraph.ObjectRegistry.getObjectsByCanvasID(args.id);

            for (var i=0,len=objects.length; i<len; ++i) {
                RGraph.ObjectRegistry.remove(objects[i]);
            }

        // Clear the entire ObjectRegistry by resetting
        // the object stores.
        } else {

            RGraph.ObjectRegistry.objects            = {};
            RGraph.ObjectRegistry.objects.byUID      = [];
            RGraph.ObjectRegistry.objects.byCanvasID = [];
        }
    };








    //
    // Lists all objects in the ObjectRegistry
    // 
    // @param  args object An object consisting of:
    //                      o alert
    // OR
    //
    // @param boolean alert Whether to return the list or alert() it
    //
    RGraph.ObjectRegistry.list = function ()
    {
        var args = RGraph.getArgs(arguments, 'alert');
        var list = [];

        for (var i=0,len=RGraph.ObjectRegistry.objects.byUID.length; i<len; ++i) {
            if (RGraph.ObjectRegistry.objects.byUID[i]) {
                list.push(RGraph.ObjectRegistry.objects.byUID[i][1].type);
            }
        }

        if (args.alert) {
            $p(list);
        } else {
            return list;
        }
    };








    //
    // Clears the ObjectRegistry of objects that are of a certain given type
    // 
    // @param  args object An object consisting of:
    //                      o type
    // OR
    //
    // @param type string The type to clear
    //
    RGraph.ObjectRegistry.clearByType = function ()
    {
        var args = RGraph.getArgs(arguments, 'type');
        var objects = RGraph.ObjectRegistry.objects.byUID;

        for (var i=0,len=objects.length; i<len; ++i) {
            if (objects[i]) {
                
                var uid = objects[i][0],
                    obj = objects[i][1];
                
                if (obj && obj.type === args.type) {
                    RGraph.ObjectRegistry.remove(obj);
                }
            }
        }
    };








    //
    // This function provides an easy way to go through all of the objects that are held in the
    // Registry
    // 
    // @param  args object An object consisting of:
    //                      o type
    // OR
    //
    // @param func function This function is run for every object. Its passed the object as an argument
    // @param string type Optionally, you can pass a type of object to look for
    //
    RGraph.ObjectRegistry.iterate = function ()
    {
        var args    = RGraph.getArgs(arguments, 'func,type');
        var objects = RGraph.ObjectRegistry.objects.byUID;

        for (var i=0,len=objects.length; i<len; ++i) {
        
            if (typeof args.type === 'string') {
                
                var types = args.type.split(/,/);

                for (var j=0,len2=types.length; j<len2; ++j) {
                    if (types[j] == objects[i][1].type) {
                        args.func(objects[i][1]);
                    }
                }
            } else {
                args.func(objects[i][1]);
            }
        }
    };








    //
    // Retrieves all objects for a given canvas id
    // 
    // @param  args object An object consisting of:
    //                      o id
    // OR
    //
    // @patarm id string The canvas ID to get objects for.
    //
    RGraph.ObjectRegistry.getObjectsByCanvasID = function ()
    {
        var args  = RGraph.getArgs(arguments, 'id');
        var store = RGraph.ObjectRegistry.objects.byCanvasID;
        var ret   = [];

        // Loop through all of the objects and return the appropriate ones
        for (var i=0,len=store.length; i<len; ++i) {
            if (store[i] && store[i][0] == args.id) {
                ret.push(store[i][1]);
            }
        }

        return ret;
    };








    //
    // Retrieves the relevant object based on the X/Y position.
    // 
    // @param  args object An object consisting of:
    //                      o event
    // OR
    //
    // @param  object e The event object
    // @return object   The applicable (if any) object
    //
    RGraph.ObjectRegistry.firstbyxy =
    RGraph.ObjectRegistry.getObjectByXY =
    RGraph.ObjectRegistry.getFirstObjectByXY = function ()
    {
        var args    = RGraph.getArgs(arguments, 'event');
        var canvas  = args.event.target;
        var ret     = null;
        var objects = RGraph.ObjectRegistry.getObjectsByCanvasID(canvas.id);

        for (var i=(objects.length - 1); i>=0; --i) {

            var obj = objects[i].getObjectByXY(args.event);

            if (obj) {
                return obj;
            }
        }
    };








    //
    // Retrieves the relevant objects based on the X/Y position.
    // NOTE This function returns an array of objects
    // 
    // @param  args object An object consisting of:
    //                      o event
    // OR
    //
    // @param  object e The event object
    // @return          An array of pertinent objects. Note the there may be only one object
    //
    RGraph.ObjectRegistry.getObjectsByXY = function ()
    {
        var args    = RGraph.getArgs(arguments, 'event');
        var canvas  = args.event.target,
            ret     = [],
            objects = RGraph.ObjectRegistry.getObjectsByCanvasID(canvas.id);

        // Retrieve objects "front to back"
        for (var i=(objects.length - 1); i>=0; --i) {

            var obj = objects[i].getObjectByXY(args.event);

            if (obj) {
                ret.push(obj);
            }
        }
        
        return ret;
    };








    //
    // Retrieves the object with the corresponding UID
    // 
    // @param  args object An object consisting of:
    //                      o uid
    // OR
    //
    // @param string uid The UID to get the relevant object for
    //
    RGraph.ObjectRegistry.get =
    RGraph.ObjectRegistry.getObjectByUID = function ()
    {
        var args    = RGraph.getArgs(arguments, 'uid');
        var objects = RGraph.ObjectRegistry.objects.byUID;

        for (var i=0,len=objects.length; i<len; ++i) {
            if (objects[i] && objects[i][1].uid == args.uid) {
                return objects[i][1];
            }
        }
    };








    //
    // Brings a chart to the front of the ObjectRegistry by
    // removing it and then readding it at the end and then
    // redrawing the canvas
    // 
    // @param  args object An object consisting of:
    //                      o object
    //                      o redraw
    // OR
    //
    // @param object  obj    The object to bring to the front
    // @param boolean redraw Whether to redraw the canvas after the 
    //                       object has been moved
    //
    RGraph.ObjectRegistry.bringToFront = function ()
    {
        var args = RGraph.getArgs(arguments, 'object,redraw');
        var redraw = args.redraw ? true : args.redraw;

        RGraph.ObjectRegistry.remove(args.object);
        RGraph.ObjectRegistry.add(args.object);
        
        if (redraw) {
            RGraph.redrawCanvas(args.object.canvas);
        }
    };








    //
    // Retrieves the objects that are the given type
    // 
    // @param  args object An object consisting of:
    //                      o type
    // OR
    //
    // @param  mixed canvas  The canvas to check. It can either be the canvas object itself or just the ID
    // @param  string type   The type to look for
    // @return array         An array of one or more objects
    //
    RGraph.ObjectRegistry.type =
    RGraph.ObjectRegistry.getObjectsByType = function ()
    {
        var args = RGraph.getArgs(arguments, 'type');

        var objects = RGraph.ObjectRegistry.objects.byUID;
        var ret     = [];

        for (i in objects) {
            if (objects[i] && objects[i][1] && objects[i][1].type && objects[i][1].type && objects[i][1].type == args.type) {
                ret.push(objects[i][1]);
            }
        }

        return ret;
    };








    //
    // Retrieves the FIRST object that matches the given type
    //
    // @param  args object An object consisting of:
    //                      o type
    // OR
    //
    // @param  string type   The type of object to look for
    // @return object        The FIRST object that matches the given type
    //
    RGraph.ObjectRegistry.first =
    RGraph.ObjectRegistry.getFirstObjectByType = function ()
    {
        var args    = RGraph.getArgs(arguments, 'type');
        var objects = RGraph.ObjectRegistry.objects.byUID;

        for (var i in objects) {
            if (objects[i] && objects[i][1] && objects[i][1].type == args.type) {
                return objects[i][1];
            }
        }
        
        return null;
    };








    //
    // This takes centerx, centery, x and y coordinates and returns the
    // appropriate angle relative to the canvas angle system. Remember
    // that the canvas angle system starts at the EAST axis
    // 
    // @param  args object An object consisting of:
    //                      o cx
    //                      o cy
    //                      o x
    //                      o y
    // OR
    //
    // @param  number cx  The centerx coordinate
    // @param  number cy  The centery coordinate
    // @param  number x   The X coordinate (eg the mouseX if coming from a click)
    // @param  number y   The Y coordinate (eg the mouseY if coming from a click)
    // @return number     The relevant angle (measured in in RADIANS)
    //
    RGraph.getAngleByXY = function ()
    {
        var args = RGraph.getArgs(arguments, 'cx,cy,x,y');

        var angle = Math.atan((args.y - args.cy) / (args.x - args.cx));
            angle = Math.abs(angle)

        if (args.x >= args.cx && args.y >= args.cy) {
            angle += RGraph.TWOPI;

        } else if (args.x >= args.cx && args.y < args.cy) {
            angle = (RGraph.HALFPI - angle) + (RGraph.PI + RGraph.HALFPI);

        } else if (args.x < args.cx && args.y < args.cy) {
            angle += RGraph.PI;

        } else {
            angle = RGraph.PI - angle;
        }

        //
        // Upper and lower limit checking
        //
        if (angle > RGraph.TWOPI) {
            angle -= RGraph.TWOPI;
        }

        return angle;
    };








    //
    // This function returns the distance between two points. In effect the
    // radius of an imaginary circle that is centered on x1 and y1. The name
    // of this function is derived from the word "Hypoteneuse", which in
    // trigonmetry is the longest side of a triangle
    // 
    // @param  args object An object consisting of:
    //                      o x1
    //                      o y1
    //                      o x2
    //                      o y2
    // OR
    //
    // @param number x1 The original X coordinate
    // @param number y1 The original Y coordinate
    // @param number x2 The target X coordinate
    // @param number y2 The target Y  coordinate
    //
    RGraph.getHypLength = function ()
    {
        var args = RGraph.getArgs(arguments, 'x1,y1,x2,y2');

        return Math.sqrt(((args.x2 - args.x1) * (args.x2 - args.x1)) + ((args.y2 - args.y1) * (args.y2 - args.y1)));
    };








    //
    // This function gets the end point (X/Y coordinates) of a given radius.
    // You pass it the center X/Y, the angle and the radius and this function
    // will return the endpoint X/Y coordinates.
    // 
    // @param  args object An object consisting of:
    //                      o cx
    //                      o cy
    //                      o angle
    //                      o radius
    // OR
    //
    // @param number cx     The center X coord
    // @param number cy     The center Y coord
    // @param number angle  The angle that the "line" is at from the cx/cy coords
    // @param number radius The length of the radius
    //
    //
    RGraph.getRadiusEndPoint = function ()
    {
        var args = RGraph.getArgs(arguments, 'cx,cy,angle,radius');

        var x    = args.cx + (Math.cos(args.angle) * args.radius);
        var y    = args.cy + (Math.sin(args.angle) * args.radius);

        return [x, y];
    };








    //
    // This installs all of the event listeners
    // 
    // @param  args object An object consisting of:
    //                      o object
    // OR
    //
    // @param object object The chart object
    //
    RGraph.installEventListeners = function ()
    {
        var args       = RGraph.getArgs(arguments, 'object');
        var properties = args.object.properties;

        //
        // If this function exists, then the dynamic file has been included.
        //
        if (RGraph.installCanvasClickListener) {

            RGraph.installWindowMousedownListener(args.object);
            RGraph.installWindowMouseupListener(args.object);
            RGraph.installCanvasMousemoveListener(args.object);
            RGraph.installCanvasMouseupListener(args.object);
            RGraph.installCanvasMousedownListener(args.object);
            RGraph.installCanvasClickListener(args.object);
        
        } else if (   RGraph.hasTooltips(args.object)
                   || properties.adjustable
                   || properties.annotatable
                   || properties.contextmenu
                   || properties.keyInteractive
                   || typeof args.object.onclick     === 'function'
                   || typeof args.object.onmousemove === 'function'
                   || typeof args.object.onmouseout  === 'function'
                   || typeof args.object.onmouseover === 'function'
                  ) {

            alert('[RGRAPH] You appear to have used dynamic features but not included the file: RGraph.common.dynamic.js');
        }
    };








    //
    // Loosly mimicks the PHP function print_r();
    //
    // @param  args object An object consisting of:
    //                      o object - You only really need to give this argument
    //                      o alert
    //                      o indent
    //                      o count
    //
    RGraph.pr = function (obj)
    {
        var args = RGraph.getArgs(arguments, 'object,alert,indent,counter');

        var indent = (args.indent ? args.indent : '    ');
        var str    = '';

        var counter = typeof args.counter == 'number' ? args.counter : 0;
        
        if (counter >= 3) {
            return '';
        }

        switch (typeof obj) {
            
            case 'string':    str += args.object + ' (' + (typeof args.object) + ', ' + args.object.length + ')'; break;
            case 'number':    str += args.object + ' (' + (typeof args.object) + ')'; break;
            case 'boolean':   str += args.object + ' (' + (typeof args.object) + ')'; break;
            case 'function':  str += 'function () {}'; break;
            case 'undefined': str += 'undefined'; break;
            case 'null':      str += 'null'; break;
            
            case 'object':
                // In case of null
                if (RGraph.isNullish(args.object)) {
                    str += 'null';
                } else {
                    str += 'Object {' + '\n'
                    for (var j in obj) {
                        str += indent + '    ' + j + ' => ' + RGraph.pr(args.object[j], true, indent + '    ', counter + 1) + '\n';
                    }
                    str += indent + '}';
                }
                break;
            
            
            default:
                str += 'Unknown type: ' + typeof args.object + '';
                break;
        }


        //
        // Finished, now either return if we're in a recursed call, or alert()
        // if we're not.
        //
        if (!args.alert) {
            alert(str);
        }
        
        return str;
    };








    //
    // Produces a dashed line
    // 
    // @param  args object An object consisting of:
    //                      o context
    //                      o x1
    //                      o y1
    //                      o x2
    //                      o y2
    //                      o size
    // OR
    //
    // @param object context The 2D context
    // @param number x1 The start X coordinate
    // @param number y1 The start Y coordinate
    // @param number x2 The end X coordinate
    // @param number y2 The end Y coordinate
    // @param number    The size of the dashes
    //
    RGraph.dashedLine = function()
    {
        var args  = RGraph.getArgs(arguments, 'context,x1,y1,x2,y2,size'),
            dx    = args.x2 - args.x1,
            dy    = args.y2 - args.y1,
            num   = Math.floor(Math.sqrt((dx * dx) + (dy * dy)) / (args.size || 3)),
            xLen  = dx / num,
            yLen  = dy / num,
            count = 0;

        do {
            if (count % 2 == 0 && count > 0) {
                args.context.lineTo(args.x1, args.y1);
            } else {
                args.context.moveTo(args.x1, args.y1);
            }

            args.x1 += xLen;
            args.y1 += yLen;
            
            count++;
            
        } while(count <= num);
    };








    //
    // Makes an AJAX call. It calls the given callback (a function) when ready
    // 
    // @param  args object An object consisting of:
    //                      o url
    //                      o callback
    // OR
    //
    // @param string   url      The URL to retrieve
    // @param function callback A function that is called when the response is ready,
    //                          there's an example below called "myCallback".
    //
    RGraph.AJAX = function ()
    {
        var args = RGraph.getArgs(arguments, 'url,callback');

        // Mozilla, Safari, ...
        if (window.XMLHttpRequest) {
            var httpRequest = new XMLHttpRequest();
            

        // MSIE
        } else if (window.ActiveXObject) {
            var httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }

        httpRequest.onreadystatechange = function ()
        {
            if (this.readyState == 4 && this.status == 200) {
                this.__user_callback__ = args.callback;
                this.__user_callback__(this.responseText);
            }
        }

        httpRequest.open('GET', args.url, true);
        
        // Set a Cache-Control header
        if (httpRequest && httpRequest.setRequestHeader) {
            httpRequest.setRequestHeader('Cache-Control', 'no-cache');
        }
        
        httpRequest.send();
    };








    //
    // Makes an AJAX POST request. It calls the given callback (a function) when ready
    // 
    // @param  args object An object consisting of:
    //                      o url
    //                      o data
    //                      o callback
    // OR
    //
    // @param string   url      The URL to retrieve
    // @param object   data     The POST data
    // @param function callback A function that is called when the response is ready, there's an example below
    //                          called "myCallback".
    //
    // DO NOT REMOVE THIS ALIAS!
    RGraph.AJAX.post =
    RGraph.AJAX.POST = function ()
    {
        var args = RGraph.getArgs(arguments, 'url,data,callback');

        // Used when building the POST string
        var crumbs = [];

        // Mozilla, Safari, ...
        if (window.XMLHttpRequest) {
            var httpRequest = new XMLHttpRequest();

        // MSIE
        } else if (window.ActiveXObject) {
            var httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }

        httpRequest.onreadystatechange = function ()
        {
            if (this.readyState == 4 && this.status == 200) {
                this.__user_callback__ = args.callback;
                this.__user_callback__(this.responseText);
            }
        }

        httpRequest.open('POST', args.url, true);
        httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        
        for (i in args.data) {
            if (typeof i == 'string') {
                crumbs.push(i + '=' + encodeURIComponent(args.data[i]));
            }
        }

        httpRequest.send(crumbs.join('&'));
    };








    //
    // Uses the above function but calls the call back passing a number as its argument
    // 
    // @param  args object An object consisting of:
    //                      o url
    //                      o callback
    // OR
    //
    // @param url string The URL to fetch
    // @param callback function Your callback function (which is passed the number as an argument)
    //
    RGraph.AJAX.getNumber = function ()
    {
        var args = RGraph.getArgs(arguments, 'url,callback');

        RGraph.AJAX(args.url, function ()
        {
            var num = parseFloat(this.responseText);

            args.callback(num);
        });
    };








    //
    // Uses the above function but calls the call back passing a string as its argument
    // 
    // @param  args object An object consisting of:
    //                      o url
    //                      o callback
    // OR
    //
    // @param url string The URL to fetch
    // @param callback function Your callback function (which is passed the string as an argument)
    //
    RGraph.AJAX.getString = function ()
    {
        var args = RGraph.getArgs(arguments, 'url,callback');

        RGraph.AJAX(args.url, function ()
        {
            var str = String(this.responseText);

            args.callback(str);
        });
    };








    //
    // Uses the above function but calls the call back passing JSON (ie a JavaScript object ) as its argument
    // 
    // @param  args object An object consisting of:
    //                      o url
    //                      o callback
    // OR
    //
    // @param url string The URL to fetch
    // @param callback function Your callback function (which is passed the JSON object as an argument)
    //
    RGraph.AJAX.getJSON = function ()
    {
        var args = RGraph.getArgs(arguments, 'url,callback');

        RGraph.AJAX(args.url, function ()
        {
            var json = eval('(' + this.responseText + ')');

            args.callback(json);
        });
    };








    //
    // Uses the above RGraph.AJAX function but calls the call back passing an array as its argument.
    // Useful if you're retrieving CSV data
    // 
    // @param  args object An object consisting of:
    //                      o url
    //                      o callback
    //                      o sparator (optional)
    // OR
    //
    // @param url      string   The URL to fetch
    // @param callback function Your callback function (which is passed the CSV/array as an argument)
    // @param          string   An OPTIONAL separator character
    //
    RGraph.AJAX.getCSV = function ()
    {
        var args      = RGraph.getArgs(arguments, 'url,callback,separator');
        var separator = args.separator ? args.separator : ',';

        RGraph.AJAX(args.url, function ()
        {
            var regexp = new RegExp(separator);
            var arr = this.responseText.split(regexp);
            
            // Convert the strings to numbers
            for (var i=0,len=arr.length;i<len;++i) {
                arr[i] = parseFloat(arr[i]);
            }

            args.callback(arr);
        });
    };








    //
    // Rotates the canvas
    // 
    // @param  args object An object consisting of:
    //                      o canvas
    //                      o x
    //                      o y
    //                      o angle (measured in radians)
    // OR
    //
    // @param object canvas The canvas to rotate
    // @param  int   x      The X coordinate about which to rotate the canvas
    // @param  int   y      The Y coordinate about which to rotate the canvas
    // @param  int   angle  The angle(in RADIANS) to rotate the canvas by
    //
    RGraph.rotateCanvas = function ()
    {
        var args    = RGraph.getArgs(arguments, 'canvas,x,y,angle');
        var context = args.canvas.getContext('2d');

        context.translate(args.x,args.y);
        context.rotate(args.angle);
        context.translate(0 - args.x, 0 - args.y);    
    };








    //
    // Measures text by creating a DIV in the document and adding the relevant text to it.
    // Then checking the .offsetWidth and .offsetHeight.
    // 
    // @param  args object An object consisting of:
    //                      o text
    //                      o bold
    //                      o font
    //                      o size
    // OR
    //
    // @param  string text   The text to measure
    // @param  bool   bold   Whether the text is bold or not
    // @param  string font   The font to use
    // @param  size   number The size of the text (in pts)
    // @return array         A two element array of the width and height of the text
    //
    RGraph.measureText = function ()
    {
        var args = RGraph.getArgs(arguments, 'text,bold,font,size');

        // Add the sizes to the cache as adding DOM elements is costly and causes slow downs
        if (typeof RGraph.measuretext_cache === 'undefined') {
            RGraph.measuretext_cache = [];
        }

        var str = args.text + ':' + args.bold + ':' + args.font + ':' + args.size;

        if (typeof RGraph.measuretext_cache == 'object' && RGraph.measuretext_cache[str]) {
            return RGraph.measuretext_cache[str];
        }
        
        if (!RGraph.measuretext_cache['text-div']) {
            var div = document.createElement('DIV');
                div.style.position = 'absolute';
                div.style.top = '-100px';
                div.style.left = '-100px';
                div.style.lineHeight = (args.size || 12) * 1.5 + 'px';
            document.body.appendChild(div);

            // Now store the newly created DIV
            RGraph.measuretext_cache['text-div'] = div;

        } else if (RGraph.measuretext_cache['text-div']) {
            var div = RGraph.measuretext_cache['text-div'];
        
            // Clear the contents of the DIV tag
            while(div.firstChild){
                div.removeChild(div.firstChild);
            }
        }

        div.insertAdjacentHTML('afterbegin', String(args.text).replace(/\r?\n/g, '<br />'));
        div.style.fontFamily = args.font;
        div.style.fontWeight = args.bold ? 'bold' : 'normal';
        div.style.fontSize   = (args.size || 12) + 'pt';

        //document.body.removeChild(div);
        RGraph.measuretext_cache[str] = [div.offsetWidth, div.offsetHeight];
        
        return [div.offsetWidth, div.offsetHeight];
    };








    //
    // New text function. Accepts two arguments:
    //  o opt - An object/hash/map of properties. This can consist of:
    //          object           The RGraph chart object (THIS OR BELOW OPTION IS REQUIRED)
    //          context          The canvases context. This can be given in
    //                           place of the above      (THIS OR ABOVE OPTION IS REQUIRED)
    //          x                The X coordinate        (REQUIRED)
    //          y                The Y coordinate        (REQUIRED)
    //          text             The text to show        (REQUIRED)
    //          font             The font to use
    //          size             The size of the text (in pt)
    //          italic           Whether the text should be italic or not
    //          bold             Whether the text should be bold or not
    //          marker           Whether to show a marker that indicates the X/Y coordinates
    //          valign           The vertical alignment
    //          halign           The horizontal alignment
    //          bounding         Whether to draw a bounding box for the text
    //          boundingStroke   The strokeStyle of the bounding box
    //          boundingFill     The fillStyle of the bounding box
    //          accessible       If false this will cause the text to be
    //                           rendered as native canvas text. DOM text otherwise
    //
    RGraph.text = function (args)
    {
        // Allow for the use of a single argument or two
        // 1. First handle two arguments
        if (arguments[0] && arguments[1] && (typeof arguments[1].text === 'string' || typeof arguments[1].text === 'number' ) ) {
            var obj  = arguments[0],
                args = arguments[1];

        // 2. The alternative is a single option
       } else {

            var obj = args.object;

            //
            // The text arg must be a string or a number
            //
            if (typeof args.text === 'number') {
                args.text = String(args.text);
            }
        }
        
        // Get the defaults for the text function from RGraph.text.defaults object
        for (var i in RGraph.text.defaults) {
            if (typeof i === 'string' && typeof args[i] === 'undefined') {
                args[i] = RGraph.text.defaults[i];
            }
        }

        // Use DOM nodes to get better quality text. This option is BETA quality
        // code and most likely and will not work if you use 3D or if you use
        // your own transformations.
        function domtext ()
        {
            //
            // Check the font property to see if it contains the italic keyword,
            // and if it does then take it out and set the italic property
            //
            if (String(args.size).toLowerCase().indexOf('italic') !== -1) {
                args.size = args.size.replace(/ *italic +/, '');
                args.italic = true;
            }



            // Used for caching the DOM node
            var cacheKey = Math.abs(parseInt(args.x)) + '_' + Math.abs(parseInt(args.y)) + '_' + String(args.text).replace(/[^a-zA-Z0-9]+/g, '_') + '_' + obj.canvas.id;



            // Wrap the canvas in a DIV
            if (!obj.canvas.rgraph_domtext_wrapper) {

                var wrapper = document.createElement('div');
                    wrapper.id        = obj.canvas.id + '_rgraph_domtext_wrapper';
                    wrapper.className = 'rgraph_domtext_wrapper';

                    // The wrapper can be configured to hide or show the
                    // overflow with the textAccessibleOverflow option
                    wrapper.style.overflow = obj.properties.textAccessibleOverflow != false && obj.properties.textAccessibleOverflow != 'hidden' ? 'visible' : 'hidden';
                    
                    wrapper.style.width    = obj.canvas.offsetWidth + 'px';
                    wrapper.style.height   = obj.canvas.offsetHeight + 'px';

                    wrapper.style.cssFloat   = obj.canvas.style.cssFloat;
                    wrapper.style.display    = obj.canvas.style.display || 'inline-block';
                    wrapper.style.position   = obj.canvas.style.position || 'relative';
                    wrapper.style.left       = obj.canvas.style.left;
                    wrapper.style.right      = obj.canvas.style.right;
                    wrapper.style.top        = obj.canvas.style.top;
                    wrapper.style.bottom     = obj.canvas.style.bottom;
                    wrapper.style.width      = obj.canvas.width + 'px';
                    wrapper.style.height     = obj.canvas.height + 'px';
                    wrapper.style.lineHeight = 'initial';

                    obj.canvas.style.position      = 'absolute';
                    obj.canvas.style.left          = 0;
                    obj.canvas.style.top           = 0;
                    obj.canvas.style.display       = 'inline';
                    obj.canvas.style.cssFloat      = 'none';

                    // This now (10/12/2022) skews ro the same
                    // angle as the variantThreedAngle property
                    if ((obj.type === 'bar' || obj.type === 'bipolar' || obj.type === 'hbar') && obj.properties.variant === '3d') {
                        wrapper.style.transform = 'skewY(' + obj.properties.variantThreedAngle + 'rad)';
                    }

                obj.canvas.parentNode.insertBefore(wrapper, obj.canvas);
                
                // Remove the canvas from the DOM and put it in the wrapper
                obj.canvas.parentNode.removeChild(obj.canvas);
                wrapper.appendChild(obj.canvas);
                
                obj.canvas.rgraph_domtext_wrapper = wrapper;
                
                // TODO Add a subwrapper here

            } else {
                wrapper = obj.canvas.rgraph_domtext_wrapper;
            }



            var defaults = {
                size:   12,
                font:   'Arial',
                italic: 'normal',
                bold:   'normal',
                valign: 'bottom',
                halign: 'left',
                marker: true,
                color:  context.fillStyle,
                bounding: {
                    enabled:   false,
                    fill:      'rgba(255,255,255,0.7)',
                    stroke:    '#666',
                    linewidth: 1
                }
            }

            
            // Transform \n to the string [[RETURN]] which is then replaced
            // further down
            args.text = String(args.text).replace(/\r?\n/g, '[[RETURN]]');


            // Create the node cache array that nodes
            // already created are stored in
            if (typeof RGraph.text.domNodeCache === 'undefined') {
                RGraph.text.domNodeCache = new Array();
            }
            
            if (typeof RGraph.text.domNodeCache[obj.id] === 'undefined') {
                RGraph.text.domNodeCache[obj.id] = new Array();
            }

            // Create the dimension cache array that node
            // dimensions are stored in
            if (typeof RGraph.text.domNodeDimensionCache === 'undefined') {
                RGraph.text.domNodeDimensionCache = new Array();
            }
            
            if (typeof RGraph.text.domNodeDimensionCache[obj.id] === 'undefined') {
                RGraph.text.domNodeDimensionCache[obj.id] = new Array();
            }



            // Create the DOM node
            if (!RGraph.text.domNodeCache[obj.id] || !RGraph.text.domNodeCache[obj.id][cacheKey]) {

                var span = document.createElement('span');
                    span.style.position      = 'absolute';
                    span.style.display       = 'inline';
                    
                    span.className        =   ' rgraph_accessible_text'
                                            + ' rgraph_accessible_text_' + obj.id
                                            + ' rgraph_accessible_text_' + (args.tag || '').replace(/\./, '_')
                                            + ' rgraph_accessible_text_' + obj.type
                                            + ' ' + (args.cssClass || '');

                    // This is here to accommodate 3D charts
                    //
                    span.style.left       = (args.x * (parseInt(obj.canvas.offsetWidth) / parseInt(obj.canvas.width))) + 'px';
                    span.style.top        = (args.y * (parseInt(obj.canvas.offsetHeight) / parseInt(obj.canvas.height)))  + 'px';
                    
                    // This could be used for none-3d charts
                    //
                    //span.style.left       = args.x + 'px';
                    //span.style.top        = args.y  + 'px';
                    
                    span.style.color      = args.color || defaults.color;
                    span.style.fontFamily = args.font || defaults.font;
                    span.style.fontWeight = args.bold ? 'bold' : defaults.bold;
                    span.style.fontStyle  = args.italic ? 'italic' : defaults.italic;
                    span.style.fontSize   = (args.size || defaults.size) + 'pt'; // Also see line-height setting a few lines down
                    span.style.whiteSpace = 'nowrap';
                    span.style.lineHeight = RGraph.ISIE ? 'normal' : 'initial'; // Also see font-size setting a few lines up
                    span.tag              = args.tag;
                    span.setAttribute('data-tag', args.tag);


                    // CSS angled text. This should be conasidered BETA quality code at the moment,
                    // but it seems to be OK. You may need to use the labelsOffsety when using this
                    // option.
                    if (typeof args.angle === 'number' && args.angle !== 0) {
                    
                        var coords = RGraph.measureText(
                            args.text,
                            args.bold,
                            args.font,
                            args.size
                        );
                    
                        //span.style.left = parseFloat(span.style.left) - coords[0] + 'px';
                        var hOrigin, vOrigin;
                        
                        if (args.halign === 'center') {hOrigin = '50%';}
                        else if (args.halign === 'right') {hOrigin = '100%';}
                        else {hOrigin = '0%';}
                        
                        if (args.valign === 'center') {vOrigin = '50%';}
                        else if (args.valign === 'top') {vOrigin = '0%';}
                        else {vOrigin = '100%';}
                        
                        span.style.transformOrigin = '{1} {2}'.format(
                            hOrigin,
                            vOrigin
                        );
                        
                        span.style.transform       = 'rotate(' + args.angle + 'deg)';
                    }




                    // Shadow
                    span.style.textShadow = '{1}px {2}px {3}px {4}'.format(
                        context.shadowOffsetX,
                        context.shadowOffsetY,
                        context.shadowBlur,
                        context.shadowColor
                    );


                    if (args.bounding) {
                        span.style.border          = '1px solid ' + (args['bounding.stroke'] || defaults.bounding.stroke);
                        span.style.backgroundColor = args['bounding.fill'] || defaults.bounding.fill;
                        span.style.borderWidth     = typeof args['bounding.linewidth'] === 'number' ? args['bounding.linewidth'] : defaults.bounding.linewidth;
                    }
                    // Pointer events
                    if (
                           (typeof obj.properties.textAccessiblePointerevents === 'undefined' || obj.properties.textAccessiblePointerevents)
                        && obj.properties.textAccessiblePointerevents !== 'none'
                       ) {
                        
                        span.style.pointerEvents =  'auto';
                    } else {
                        span.style.pointerEvents =  'none';
                    }

                    span.style.padding = args.bounding ? '2px' : null; // Changed to 2px on 16th January 2019
                    span.__text__      = args.text
                    
                span.insertAdjacentHTML(
                    'afterbegin',
                    args.text.replace('&', '&amp;')
                             .replace('<', '&lt;')
                             .replace('>', '&gt;')
                             .replace(/\[\[RETURN\]\]/g, '<br />')
                );
                //span.innerHTML     = args.text.replace('&', '&amp;')
                //                             .replace('<', '&lt;')
                //                             .replace('>', '&gt;');
                
                // Now replace the string [[RETURN]] with a <br />
                //span.innerHTML = span.innerHTML.replace(/\[\[RETURN\]\]/g, '<br />');

                wrapper.appendChild(span);

                // Alignment defaults
                args.halign = args.halign || 'left';
                args.valign = args.valign || 'bottom';
                
                // Horizontal alignment
                if (args.halign === 'right') {
                    span.style.left      = parseFloat(span.style.left) - span.offsetWidth + 'px';
                    span.style.textAlign = 'right';
                } else if (args.halign === 'center') {
                    span.style.left      = parseFloat(span.style.left) - (span.offsetWidth  / 2) + 'px';
                    span.style.textAlign = 'center';
                }
                
                // Vertical alignment
                if (args.valign === 'top') {
                    // Nothing to do here
                } else if (args.valign === 'center') {
                    span.style.top = parseFloat(span.style.top) - (span.offsetHeight / 2) + 'px';
                } else {
                    span.style.top = parseFloat(span.style.top) - span.offsetHeight + 'px';
                }
                        
                
                var offsetWidth  = parseFloat(span.offsetWidth),
                    offsetHeight = parseFloat(span.offsetHeight),
                    top          = parseFloat(span.style.top),
                    left         = parseFloat(span.style.left);

                RGraph.text.domNodeCache[obj.id][cacheKey] = span;
                RGraph.text.domNodeDimensionCache[obj.id][cacheKey] = {
                      left: left,
                       top: top,
                     width: offsetWidth,
                    height: offsetHeight
                };
                span.id = cacheKey;


            
            } else {
                span = RGraph.text.domNodeCache[obj.id][cacheKey];
                span.style.display = 'inline';
                
                var offsetWidth  = RGraph.text.domNodeDimensionCache[obj.id][cacheKey].width,
                    offsetHeight = RGraph.text.domNodeDimensionCache[obj.id][cacheKey].height,
                    top          = RGraph.text.domNodeDimensionCache[obj.id][cacheKey].top,
                    left         = RGraph.text.domNodeDimensionCache[obj.id][cacheKey].left;
            }


            

            
            
            // If requested, draw a marker to indicate the coords
            if (args.marker) {
                obj.path(
                    'b m % % l % % m % % l % % s',
                    args.x - 5, args.y,
                    args.x + 5, args.y,
                    args.x, args.y - 5,
                    args.x, args.y + 5
                );
            }
            
            //
            // If its a drawing API text object then allow
            // for events and tooltips
            //
            if (obj.type === 'drawing.text') {

                // Mousemove
                //if (obj.properties.eventsMousemove) {
                //    span.addEventListener('mousemove', function (e) {(obj.properties.eventsMousemove)(e, obj);}, false);
                //}
                
                // Click
                //if (obj.properties.eventsClick) {
                //    span.addEventListener('click', function (e) {(obj.properties.eventsClick)(e, obj);}, false);
                //}
                
                // Tooltips
                if (obj.properties.tooltips) {
                    span.addEventListener(
                        obj.properties.tooltipsEvent.indexOf('mousemove') !== -1 ? 'mousemove' : 'click',
                        function (e)
                        {
                            if (   !RGraph.Registry.get('tooltip')
                                || RGraph.Registry.get('tooltip').__index__ !== 0
                                || RGraph.Registry.get('tooltip').__object__.uid != obj.uid
                               ) {
                               
                                RGraph.hideTooltip();
                                RGraph.redraw();
                                RGraph.tooltip(obj, obj.properties.tooltips[0], args.x, args.y, 0, e);
                            }
                        },
                        false
                    );
                }
            }

            // Build the return value
            var ret        = {};
                ret.x      = left;
                ret.y      = top;
                ret.width  = offsetWidth;
                ret.height = offsetHeight;
                ret.object = obj;
                ret.text   = args.text;
                ret.tag    = args.tag;

            
            // The reset() function clears the domNodeCache
            ////
            // @param object OPTIONAL You can pass in the canvas to limit the
            //                        clearing to that canvas.
            RGraph.text.domNodeCache.reset = function ()
            {
                // Limit the clearing to a single canvas tag
                if (arguments[0]) {
                    
                    if (typeof arguments[0] === 'string') {
                        var canvas = document.getElementById(arguments[0])
                    } else {
                        var canvas = arguments[0];
                    }

                    var nodes = RGraph.text.domNodeCache[canvas.id];

                    for (j in nodes) {
                        
                        var node = RGraph.text.domNodeCache[canvas.id][j];
                        
                        if (node && node.parentNode) {
                            node.parentNode.removeChild(node);
                        }
                    }
                    
                    RGraph.text.domNodeCache[canvas.id]          = [];
                    RGraph.text.domNodeDimensionCache[canvas.id] = [];

                // Clear all DOM text from all tags
                } else {
                    for (i in RGraph.text.domNodeCache) {
                        for (j in RGraph.text.domNodeCache[i]) {
                            if (RGraph.text.domNodeCache[i][j] && RGraph.text.domNodeCache[i][j].parentNode) {
                                RGraph.text.domNodeCache[i][j].parentNode.removeChild(RGraph.text.domNodeCache[i][j]);
                            }
                        }
                    }

                    RGraph.text.domNodeCache          = [];
                    RGraph.text.domNodeDimensionCache = [];
                }
            };




            //
            // Helps you get hold of the SPAN tag nodes that hold the text on the chart
            //
            RGraph.text.find = function (args)
            {
                var span, nodes = [];
                
                if (args.object && args.object.isrgraph) {
                    var id = args.object.id;
                } else if (args.id) {
                    var id     = typeof args.id === 'string' ? args.id : args.object.id;
                    args.object = document.getElementById(id).__object__;
                } else {
                    alert('[RGRAPH] You Must give either an object or an ID to the RGraph.text.find() function');
                    return false;
                }

                for (i in RGraph.text.domNodeCache[id]) {
                
                    span = RGraph.text.domNodeCache[id][i];

                    // A full tag is given
                    if (typeof args.tag === 'string' && args.tag === span.tag) {
                        nodes.push(span);
                        continue;
                    }



                    // A regex is given as the tag
                    if (typeof args.tag === 'object' && args.tag.constructor.toString().indexOf('RegExp')) {

                        var regexp = new RegExp(args.tag);

                        if (regexp.test(span.tag)) {
                            nodes.push(span);
                            continue;
                        }
                    }



                    // A full text is given
                    if (typeof args.text === 'string' && args.text === span.__text__) {
                        nodes.push(span);
                        continue;
                    }



                    // Regex for the text is given
                    // A regex is given as the tag
                    if (typeof args.text === 'object' && args.text.constructor.toString().indexOf('RegExp')) {

                        var regexp = new RegExp(args.text);

                        if (regexp.test(span.__text__)) {
                            nodes.push(span);
                            
                        continue;
                        }
                    }
                }
                
                // If a callback has been specified then call it whilst
                // passing it the text
                if (typeof args.callback === 'function') {
                    (args.callback)({nodes: nodes, object:args.object});
                }

                return nodes;
            };




            //
            // Add the SPAN tag to the return value
            //
            ret.node = span;


            //
            // Save and then return the details of the text (but oly
            // if it's an RGraph object that was given)
            //
            if (obj && obj.isrgraph && obj.coordsText) {
                obj.coordsText.push(ret);
            }


            return ret;
        }




        //
        // An RGraph object can be given, or a string or the 2D rendering context
        // The coords are placed on the obj.coordsText variable ONLY if it's an RGraph object. The function
        // still returns the cooords though in all cases.
        //
        if (obj && obj.isrgraph) {
            var obj     = obj;
            var canvas  = obj.canvas;
            var context = obj.context;
        
        } else if (typeof obj == 'string') {
            var canvas  = document.getElementById(obj);
            var context = canvas.getContext('2d');
            var obj     = canvas.__object__;
        
        } else if (typeof obj.getContext === 'function') {
            var canvas  = obj;
            var context = canvas.getContext('2d');
            var obj     = canvas.__object__;
        
        } else if (obj.toString().indexOf('CanvasRenderingContext2D') != -1 || RGraph.ISIE8 && obj.moveTo) {
            var context  = obj;
            var canvas   = obj.canvas;
            var obj      = canvas.__object__;

        // IE7/8
        } else if (RGraph.ISOLD && obj.fillText) {
            var context  = obj;
            var canvas   = obj.canvas;
            var obj      = canvas.__object__;
        }


        //
        // Changed the name of boundingFill/boundingStroke - this allows you to still use those names
        //

        if (typeof args.boundingFill      === 'string') args['bounding.fill']   = args.boundingFill;
        if (typeof args.boundingStroke    === 'string') args['bounding.stroke'] = args.boundingStroke;
        if (typeof args.boundingLinewidth === 'number') args['bounding.linewidth'] = args.boundingLinewidth;



        //
        // If textConfPrefix is set then get the style configuration
        //
        if (typeof args.textConfPrefix === 'string' && args.textConfPrefix.length) {
            var textConf = RGraph.getTextConf({
                object: obj,
                prefix: args.textConfPrefix
            });
            
            args.font   = textConf.font;
            args.size   = textConf.size;
            args.color  = textConf.color;
            args.bold   = textConf.bold;
            args.italic = textConf.italic;
        }


        if (typeof args.accessible === 'undefined') {
            if (obj && obj.properties.textAccessible) {
                return domtext();
            }
        } else if (typeof args.accessible === 'boolean' && args.accessible) {
            return domtext();
        }




        var x              = args.x,
            y              = args.y,
            originalX      = x,
            originalY      = y,
            text           = args.text,
            text_multiline = typeof text === 'string' ? text.split(/\r?\n/g) : '',
            numlines       = text_multiline.length,
            font           = args.font ? args.font : 'Arial',
            size           = args.size ? args.size : 10,
            size_pixels    = size * 1.5,
            bold           = args.bold,
            italic         = args.italic,
            halign         = args.halign ? args.halign : 'left',
            valign         = args.valign ? args.valign : 'bottom',
            tag            = typeof args.tag == 'string' && args.tag.length > 0 ? args.tag : '',
            marker         = args.marker,
            angle          = args.angle || 0;


        //
        // The text arg must be a string or a number
        //
        if (typeof text == 'number') {
            text = String(text);
        }



        var bounding                = args.bounding,
            bounding_stroke         = args['bounding.stroke'] ? args['bounding.stroke'] : 'black',
            bounding_fill           = args['bounding.fill'] ? args['bounding.fill'] : 'rgba(255,255,255,0.7)',
            bounding_shadow         = args['bounding.shadow'],
            bounding_shadow_color   = args['bounding.shadow.color'] || '#ccc',
            bounding_shadow_blur    = args['bounding.shadow.blur'] || 3,
            bounding_shadow_offsetx = args['bounding.shadow.offsetx'] || 3,
            bounding_shadow_offsety = args['bounding.shadow.offsety'] || 3,
            bounding_linewidth      = typeof args['bounding.linewidth'] === 'number' ? args['bounding.linewidth'] : 1;



        //
        // Initialize the return value to an empty object
        //
        var ret = {};
        
        //
        // Color
        //
        if (typeof args.color === 'string') {
            var orig_fillstyle = context.fillStyle;
            context.fillStyle = args.color;
        }




        if (typeof text !== 'string') {
            return;
        }
        
        
        
        //
        // This facilitates vertical text
        //
        if (angle != 0) {
            context.save();
            context.translate(x, y);
            context.rotate((Math.PI / 180) * angle)
            x = 0;
            y = 0;
        }


        
        //
        // Set the font
        //
        context.font = (args.italic ? 'italic ' : '') + (args.bold ? 'bold ' : '') + size + 'pt ' + font;



        //
        // Measure the width/height. This must be done AFTER the font has been set
        //
        var width=0;
        for (var i=0; i<numlines; ++i) {
            width = Math.max(width, context.measureText(text_multiline[i]).width);
        }
        var height = size_pixels * numlines;




        //
        // Accommodate old MSIE 7/8
        //
        //if (document.all && RGraph.ISOLD) {
            //y += 2;
        //}



        //
        // If marker is specified draw a marker at the X/Y coordinates
        //
        if (args.marker) {
            
            var marker_size = 5;
            var strokestyle = context.strokeStyle;
            
            context.beginPath();
                context.strokeStyle = 'red';
                context.lineWidth = 1;
                context.moveTo(x, y - marker_size);
                context.lineTo(x, y + marker_size);
                context.moveTo(x - marker_size, y);
                context.lineTo(x + marker_size, y);
            context.stroke();
            context.strokeStyle = strokestyle;
        }



        //
        // Set the horizontal alignment
        //
        if (halign == 'center') {
            context.textAlign = 'center';
            var boundingX = x - 2 - (width / 2);
        } else if (halign == 'right') {
            context.textAlign = 'right';
            var boundingX = x - 2 - width;
        } else {
            context.textAlign = 'left';
            var boundingX = x - 2;
        }


        //
        // Set the vertical alignment
        //
        if (valign == 'center') {

            context.textBaseline = 'middle';
            // Move the text slightly
            y -= 1;
            
            y -= ((numlines - 1) / 2) * size_pixels;
            var boundingY = y - (size_pixels / 2) - 2;
        
        } else if (valign == 'top') {
            context.textBaseline = 'top';

            var boundingY = y - 2;
        
        } else if (valign == 'alphabetic') {
            context.textBaseline = 'alphabetic';

            var boundingY = y - size_pixels + 5;

        } else {

            context.textBaseline = 'bottom';

            // Move the Y coord if multiline text
            if (numlines > 1) {
                y -= ((numlines - 1) * size_pixels);
            }

            var boundingY = y - size_pixels - 2;
        }
        
        var boundingW = width + 4;
        var boundingH = height + 2;



        //
        // Draw a bounding box if required
        //
        if (bounding) {

            var pre_bounding_linewidth     = context.lineWidth,
                pre_bounding_strokestyle   = context.strokeStyle,
                pre_bounding_fillstyle     = context.fillStyle,
                pre_bounding_shadowcolor   = context.shadowColor,
                pre_bounding_shadowblur    = context.shadowBlur,
                pre_bounding_shadowoffsetx = context.shadowOffsetX,
                pre_bounding_shadowoffsety = context.shadowOffsetY;

            context.lineWidth   = bounding_linewidth ? bounding_linewidth : 0.001;
            context.strokeStyle = bounding_stroke;
            context.fillStyle   = bounding_fill;

            if (bounding_shadow) {
                context.shadowColor   = bounding_shadow_color;
                context.shadowBlur    = bounding_shadow_blur;
                context.shadowOffsetX = bounding_shadow_offsetx;
                context.shadowOffsetY = bounding_shadow_offsety;
            }

            //obj.context.strokeRect(boundingX, boundingY, width + 6, (size_pixels * numlines) + 4);
            //obj.context.fillRect(boundingX, boundingY, width + 6, (size_pixels * numlines) + 4);
            context.fillRect(
                boundingX,
                boundingY,
                boundingW,
                boundingH
            );
            
            context.strokeRect(
                boundingX,
                boundingY,
                boundingW,
                boundingH
            );

            // Reset the linewidth,colors and shadow to it's original setting
            context.lineWidth     = pre_bounding_linewidth;
            context.strokeStyle   = pre_bounding_strokestyle;
            context.fillStyle     = pre_bounding_fillstyle;
            context.shadowColor   = pre_bounding_shadowcolor
            context.shadowBlur    = pre_bounding_shadowblur
            context.shadowOffsetX = pre_bounding_shadowoffsetx
            context.shadowOffsetY = pre_bounding_shadowoffsety
        }

        
        
        //
        // Draw the text
        //
        if (numlines > 1) {
            for (var i=0; i<numlines; ++i) {
                context.fillText(text_multiline[i], x, y + (size_pixels * i));
            }
        } else {
            context.fillText(text, x + 0.5, y + 0.5);
        }
        
        
        
        //
        // If the text is at 90 degrees restore() the canvas - getting rid of the rotation
        // and the translate that we did
        //
        if (angle != 0) {
            if (angle == 90) {
                if (halign == 'left') {
                    if (valign == 'bottom') {boundingX = originalX - 2; boundingY = originalY - 2; boundingW = height + 4; boundingH = width + 4;}
                    if (valign == 'center') {boundingX = originalX - (height / 2) - 2; boundingY = originalY - 2; boundingW = height + 4; boundingH = width + 4;}
                    if (valign == 'top')    {boundingX = originalX - height - 2; boundingY = originalY - 2; boundingW = height + 4; boundingH = width + 4;}
                
                } else if (halign == 'center') {
                    if (valign == 'bottom') {boundingX = originalX - 2; boundingY = originalY - (width / 2) - 2; boundingW = height + 4; boundingH = width + 4;}
                    if (valign == 'center') {boundingX = originalX - (height / 2) -  2; boundingY = originalY - (width / 2) - 2; boundingW = height + 4; boundingH = width + 4;}
                    if (valign == 'top')    {boundingX = originalX - height -  2; boundingY = originalY - (width / 2) - 2; boundingW = height + 4; boundingH = width + 4;}
                
                } else if (halign == 'right') {
                    if (valign == 'bottom') {boundingX = originalX - 2; boundingY = originalY - width - 2; boundingW = height + 4; boundingH = width + 4;}
                    if (valign == 'center') {boundingX = originalX - (height / 2) - 2; boundingY = originalY - width - 2; boundingW = height + 4; boundingH = width + 4;}
                    if (valign == 'top')    {boundingX = originalX - height - 2; boundingY = originalY - width - 2; boundingW = height + 4; boundingH = width + 4;}
                }

            } else if (angle == 180) {

                if (halign == 'left') {
                    if (valign == 'bottom') {boundingX = originalX - width - 2; boundingY = originalY - 2; boundingW = width + 4; boundingH = height + 4;}
                    if (valign == 'center') {boundingX = originalX - width - 2; boundingY = originalY - (height / 2) - 2; boundingW = width + 4; boundingH = height + 4;}
                    if (valign == 'top')    {boundingX = originalX - width - 2; boundingY = originalY - height - 2; boundingW = width + 4; boundingH = height + 4;}
                
                } else if (halign == 'center') {
                    if (valign == 'bottom') {boundingX = originalX - (width / 2) - 2; boundingY = originalY - 2; boundingW = width + 4; boundingH = height + 4;}
                    if (valign == 'center') {boundingX = originalX - (width / 2) - 2; boundingY = originalY - (height / 2) - 2; boundingW = width + 4; boundingH = height + 4;}
                    if (valign == 'top')    {boundingX = originalX - (width / 2) - 2; boundingY = originalY - height - 2; boundingW = width + 4; boundingH = height + 4;}
                
                } else if (halign == 'right') {
                    if (valign == 'bottom') {boundingX = originalX - 2; boundingY = originalY - 2; boundingW = width + 4; boundingH = height + 4;}
                    if (valign == 'center') {boundingX = originalX - 2; boundingY = originalY - (height / 2) - 2; boundingW = width + 4; boundingH = height + 4;}
                    if (valign == 'top')    {boundingX = originalX - 2; boundingY = originalY - height - 2; boundingW = width + 4; boundingH = height + 4;}
                }
            
            } else if (angle == 270) {

                if (halign == 'left') {
                    if (valign == 'bottom') {boundingX = originalX - height - 2; boundingY = originalY - width - 2; boundingW = height + 4; boundingH = width + 4;}
                    if (valign == 'center') {boundingX = originalX - (height / 2) - 4; boundingY = originalY - width - 2; boundingW = height + 4; boundingH = width + 4;}
                    if (valign == 'top')    {boundingX = originalX - 2; boundingY = originalY - width - 2; boundingW = height + 4; boundingH = width + 4;}
                
                } else if (halign == 'center') {
                    if (valign == 'bottom') {boundingX = originalX - height - 2; boundingY = originalY - (width/2) - 2; boundingW = height + 4; boundingH = width + 4;}
                    if (valign == 'center') {boundingX = originalX - (height/2) - 4; boundingY = originalY - (width/2) - 2; boundingW = height + 4; boundingH = width + 4;}
                    if (valign == 'top')    {boundingX = originalX - 2; boundingY = originalY - (width/2) - 2; boundingW = height + 4; boundingH = width + 4;}
                
                } else if (halign == 'right') {
                    if (valign == 'bottom') {boundingX = originalX - height - 2; boundingY = originalY - 2; boundingW = height + 4; boundingH = width + 4;}
                    if (valign == 'center') {boundingX = originalX - (height/2) - 2; boundingY = originalY - 2; boundingW = height + 4; boundingH = width + 4;}
                    if (valign == 'top')    {boundingX = originalX - 2; boundingY = originalY - 2; boundingW = height + 4; boundingH = width + 4;}
                }
            }

            context.restore();
        }




        //
        // Reset the text alignment so that text rendered after this text function is not affected
        //
        context.textBaseline = 'alphabetic';
        context.textAlign    = 'left';





        //
        // Fill the ret variable with details of the text
        //
        ret.x      = boundingX;
        ret.y      = boundingY;
        ret.width  = boundingW;
        ret.height = boundingH
        ret.object = obj;
        ret.text   = text;
        ret.tag    = tag;



        //
        // Save and then return the details of the text (but oly
        // if it's an RGraph object that was given)
        //
        if (obj && obj.isrgraph && obj.coordsText) {
            obj.coordsText.push(ret);
        }
        
        //
        // Restore the original fillstyle
        //
        if (typeof orig_fillstyle === 'string') {
            context.fillStyle = orig_fillstyle;
        }

        return ret;
    };
    
    // Create the DEFAULTS object
    RGraph.text.defaults = {};








    //
    //
    // Adds custom text to the chart based on whats
    // in the objects text: property.
    //
    //@param object obj The chart object
    //
    RGraph.addCustomText = function (obj)
    {
        if (RGraph.isArray(obj.properties.text) && obj.properties.text.length) {
            for (var i=0; i<obj.properties.text.length; ++i) {
                var conf = obj.properties.text[i];
                
                // Add the object to the config
                conf.object = obj;
                
                // Set the color to black if it's not set
                if (typeof conf.color !== 'string' || !conf.color.length) {
                    conf.color = 'black';
                }
                
                RGraph.text(conf);
            }
        }
    };








    //
    // Takes a sequential index abd returns the group/index variation of it. Eg if you have a
    // sequential index from a grouped bar chart this function can be used to convert that into
    // an appropriate group/index combination
    // 
    // @param  args object An object consisting of:
    //                      o index
    //                      o data
    // OR
    //
    // @param index number The sequential index
    // @param data  array  The original data (which is grouped)
    // @return             The group/index information
    //
    RGraph.sequentialIndexToGrouped = function ()
    {
        var args          = RGraph.getArgs(arguments, 'index,data');
        var group         = 0;
        var grouped_index = 0;

        while (--args.index >= 0) {

            if (RGraph.isNullish(args.data[group])) {
                group++;
                grouped_index = 0;
                continue;
            }

            // Allow for numbers as well as arrays in the dataset
            if (typeof args.data[group] == 'number') {
                group++
                grouped_index = 0;
                continue;
            }
            

            grouped_index++;
            
            if (grouped_index >= args.data[group].length) {
                group++;
                grouped_index = 0;
            }
        }
        
        return [group, grouped_index];
    };








    //
    // This is the reverse of the above function - converting
    // group/index to a sequential index
    //
    // @return number The sequential index
    //
    RGraph.groupedIndexToSequential = function ()
    {
        var args = RGraph.getArgs(arguments, 'object,dataset,index');

        for (var i=0,seq=0; i<=args.dataset; ++i) {
            for (var j=0; j<args.object.data[args.dataset].length; ++j) {
                
                if (i === args.dataset && j === args.index) {
                    return seq;
                }
                seq++;
            }
        }
        
        return seq;
    };








    //
    // This function highlights a rectangle
    // 
    // @param  args object An object consisting of:
    //                      o object
    //                      o shape
    // OR
    //
    // @param object obj    The chart object
    // @param number shape  The coordinates of the rect to highlight
    //
    RGraph.Highlight.rect = function ()
    {
        var args       = RGraph.getArgs(arguments, 'object,shape'),
            properties = args.object.properties;

        if (properties.tooltipsHighlight) {
            
        
            // Safari seems to need this
            args.object.context.lineWidth = 1;


            //
            // Draw a rectangle on the canvas to highlight the appropriate area
            //
            args.object.context.beginPath();

                args.object.context.strokeStyle = properties.highlightStroke;
                args.object.context.fillStyle   = properties.highlightFill;

                args.object.context.rect(
                    args.shape.x - 0.5,
                    args.shape.y - 0.5,
                    args.shape.width + 1,
                    args.shape.height + 1
                );
                //obj.context.fillRect(shape.x,shape.y,shape.width,shape.height);
            args.object.context.stroke();
            args.object.context.fill();
        }
    };








    //
    // This function highlights a point
    // 
    // @param  args object An object consisting of:
    //                      o object
    //                      o shape
    // OR
    //
    // @param object obj    The chart object
    // @param number shape  The coordinates of the rect to highlight
    //
    RGraph.Highlight.point = function ()
    {
        var args        = RGraph.getArgs(arguments, 'object,shape');
        var properties  = args.object.properties;

        if (properties.tooltipsHighlight) {
    
            //
            // Draw a rectangle on the canvas to highlight the
            // appropriate area
            //
            args.object.context.beginPath();
                args.object.context.strokeStyle = properties.highlightStroke;
                args.object.context.fillStyle   = properties.highlightFill;

                var radius = properties.highlightPointRadius || 2;

                args.object.context.arc(
                    args.shape.x,
                    args.shape.y,
                    radius,
                    0,
                    RGraph.TWOPI,
                    0
                );
            args.object.context.stroke();
            args.object.context.fill();
        }
    };








    //
    // A better, more flexible, date parsing function that
    // was taken from the SVG libraries.
    //
    // @param  args object An object consisting of:
    //                      o str
    // OR
    //
    // @param  string str The string to parse
    // @return number     A number, as returned by Date.parse()
    //
    RGraph.parseDate = function ()
    {
        var args = RGraph.getArgs(arguments, 'str');

        // First off - remove the T from the format: YYYY-MM-DDTHH:MM:SS
        if (args.str.match(/^\d\d\d\d-\d\d-\d\d(t|T)\d\d:\d\d(:\d\d)?$/)) {
            args.str = args.str.toUpperCase().replace(/T/, ' ');
        }


        var d = new Date();

        // Initialise the default values
        var defaults = {
            seconds: '00',
            minutes: '00',
              hours: '00',
               date: d.getDate(),
              month: d.getMonth() + 1,
               year: d.getFullYear()
        };

        // Create the months array for turning textual months back to numbers
        var months       = ['january','february','march','april','may','june','july','august','september','october','november','december'],
            months_regex = months.join('|');

        for (var i=0; i<months.length; ++i) {
            months[months[i]] = i;
            months[months[i].substring(0,3)] = i;
            months_regex = months_regex + '|' + months[i].substring(0,3);
        }

        // These are the separators allowable for d/m/y and y/m/d dates
        // (Its part of a regexp so the position of the square brackets
        //  is crucial)
        var sep = '[-./_=+~#:;,]+';


        // Tokenise the string
        var tokens = args.str.split(/ +/);

        // Loop through each token checking what it is
        for (var i=0,len=tokens.length; i<len; ++i) {
            if (tokens[i]) {
                
                // Year
                if (tokens[i].match(/^\d\d\d\d$/)) {
                    defaults.year = tokens[i];
                }

                // Month
                var res = isMonth(tokens[i]);
                if (typeof res === 'number') {
                    defaults.month = res + 1; // Months are zero indexed
                }

                // Date
                if (tokens[i].match(/^\d?\d(?:st|nd|rd|th)?$/)) {
                    defaults.date = parseInt(tokens[i]);
                }

                // Time
                if (tokens[i].match(/^(\d\d):(\d\d):?(?:(\d\d))?$/)) {
                    defaults.hours   = parseInt(RegExp.$1);
                    defaults.minutes = parseInt(RegExp.$2);
                    
                    if (RegExp.$3) {
                        defaults.seconds = parseInt(RegExp.$3);
                    }
                }

                // Dateformat: XXXX-XX-XX
                if (tokens[i].match(new RegExp('^(\\d\\d\\d\\d)' + sep + '(\\d\\d)' + sep + '(\\d\\d)$', 'i'))) {
                    defaults.date  = parseInt(RegExp.$3);
                    defaults.month = parseInt(RegExp.$2);
                    defaults.year  = parseInt(RegExp.$1);

                }

                // Dateformat: XX-XX-XXXX
                if (tokens[i].match(new RegExp('^(\\d\\d)' + sep + '(\\d\\d)' + sep + '(\\d\\d\\d\\d)$','i') )) {
                    defaults.date  = parseInt(RegExp.$1);
                    defaults.month = parseInt(RegExp.$2);
                    defaults.year  = parseInt(RegExp.$3);
                }
            }
        }

        // Now put the defaults into a format thats recognised by Date.parse()
        args.str = '{1}/{2}/{3} {4}:{5}:{6}'.format(
            defaults.year,
            String(defaults.month).length     === 1 ? '0' + (defaults.month) : defaults.month,
            String(defaults.date).length      === 1 ? '0' + (defaults.date)      : defaults.date,
            String(defaults.hours).length     === 1 ? '0' + (defaults.hours)     : defaults.hours,
            String(defaults.minutes).length   === 1 ? '0' + (defaults.minutes)   : defaults.minutes,
            String(defaults.seconds).length   === 1 ? '0' + (defaults.seconds)   : defaults.seconds
        );

        return Date.parse(args.str);

        //
        // Support functions
        //
        function isMonth(str)
        {
            var res = str.toLowerCase().match(months_regex);

            return res ? months[res[0]] : false;
        }
    };








    //
    // This is the same as Date.parse - though a little more flexible.
    // 
    // @param  args object An object consisting of:
    //                      o str
    // OR
    //
    // @param string str The date string to parse
    // @return Returns the same thing as Date.parse
    //
    RGraph.parseDateOld = function ()
    {
        var args = RGraph.getArgs(arguments, 'str');

        args.str = RGraph.trim(args.str);

        // Allow for: now (just the word "now")
        if (args.str === 'now') {
            args.str = (new Date()).toString();
        }


        // Allow for: 22-11-2013
        // Allow for: 22/11/2013
        // Allow for: 22-11-2013 12:09:09
        // Allow for: 22/11/2013 12:09:09
        if (args.str.match(/^(\d\d)(?:-|\/)(\d\d)(?:-|\/)(\d\d\d\d)(.*)$/)) {
            args.str = '{1}/{2}/{3}{4}'.format(
                RegExp.$3,
                RegExp.$2,
                RegExp.$1,
                RegExp.$4
            );
        }

        // Allow for: 2013-11-22 12:12:12 or  2013/11/22 12:12:12
        if (args.str.match(/^(\d\d\d\d)(-|\/)(\d\d)(-|\/)(\d\d)( |T)(\d\d):(\d\d):(\d\d)$/)) {
            args.str = RegExp.$1 + '-' + RegExp.$3 + '-' + RegExp.$5 + 'T' + RegExp.$7 + ':' + RegExp.$8 + ':' + RegExp.$9;
        }

        // Allow for: 2013-11-22
        if (args.str.match(/^\d\d\d\d-\d\d-\d\d$/)) {
            args.str = args.str.replace(/-/g, '/');
        }


        // Allow for: 12:09:44 (time only using todays date)
        if (args.str.match(/^\d\d:\d\d:\d\d$/)) {
        
            var dateObj  = new Date();
            var date     = dateObj.getDate();
            var month    = dateObj.getMonth() + 1;
            var year     = dateObj.getFullYear();
            
            // Pad the date/month with a zero if it's not two characters
            if (String(month).length === 1) month = '0' + month;
            if (String(date).length === 1) date = '0' + date;

            args.str = (year + '/' + month + '/' + date) + ' ' + args.str;
        }

        return Date.parse(args.str);
    };








    //
    // Reset all of the color values to their original values
    // 
    // @param  args object An object consisting of:
    //                      o object
    // OR
    //
    // @param object The chart object
    //
    RGraph.resetColorsToOriginalValues = function ()
    {
        var args = RGraph.getArgs(arguments, 'object');

        if (args.object.original_colors) {
            // Reset the colors to their original values
            for (var j in args.object.original_colors) {
                if (typeof j === 'string') {// TAKEN OUT 1st AUGUST && j.substr(0,6) === 'chart.'
                    args.object.properties[j] = RGraph.arrayClone(args.object.original_colors[j]);
                }
            }
        }



        //
        // If the function is present on the object to reset
        // specific colors - use that
        //
        if (typeof args.object.resetColorsToOriginalValues === 'function') {
            args.object.resetColorsToOriginalValues();
        }

        // Reset the colorsParsed flag so that they're parsed for gradients again
        args.object.colorsParsed = false;
    };








    //
    // Creates a Linear gradient
    // 
    // @param object object An object that can contain these properties
    //                       o object  The RGraph object
    //                       o x1      The starting X coordinate
    //                       o y1      The starting Y coordinate
    //                       o x2      The ending X coordinate
    //                       o y2      The ending Y coordinate
    //                       o colors  An array of colors for the gradient
    RGraph.linearGradient = function ()
    {
        var args = RGraph.getArgs(arguments,'object,x1,y1,x2,y2,colors');

        var gradient = args.object.context.createLinearGradient(
            args.x1,
            args.y1,
            args.x2,
            args.y2
        );
        var numColors = args.colors.length;

        for (var i=0; i<args.colors.length; ++i) {
            
            var color = args.colors[i];
            var stop = i / (numColors - 1);

            gradient.addColorStop(stop, color);
        }

        return gradient;
    };








    //
    // Creates a Radial gradient
    // 
    // @param object object An object that can contain these properties
    //                       o object  The RGraph object
    //                       o x1      The start X coordinate
    //                       o y1      The start Y coordinate
    //                       o r1      The start radius
    //                       o x2      The end X coordinate
    //                       o y2      The end Y coordinate
    //                       o r2      The end radius
    //                       o colors  An array of colors for the gradient
    RGraph.radialGradient = function()
    {
        var args = arguments[0];

        var gradient  = args.object.context.createRadialGradient(
            args.x1,
            args.y1,
            args.r1,
            args.x2,
            args.y2,
            args.r2
        );

        var numColors = args.colors.length;
        
        for(var i=0; i<args.colors.length; ++i) {
            gradient.addColorStop(
                i / (numColors-1),
                args.colors[i]
            );
        }
        
        return gradient;
    };








    //
    // Adds an event listener to RGraphs internal array so that RGraph can track them.
    // This DOESN'T add the event listener to the canvas/window.
    // 
    // 05/01/2014 TODO Used in the tooltips file, but is it necessary any more?
    // 15/10/2019 Commented out
    //
    //RGraph.addEventListener =
    //RGraph.AddEventListener = function (id, e, func)
    //{
    //    var type = arguments[3] ? arguments[3] : 'unknown';
    //    
    //    RGraph.Registry.get('event.handlers').push([id,e,func,type]);
    //};








    //
    // Clears event listeners that have been installed by RGraph
    // 
    // @param  args object An object consisting of:
    //                      o id
    // OR
    //
    // @param string id The ID of the canvas to clear event listeners for - or 'window' to clear
    //                  the event listeners attached to the window
    //
    RGraph.clearEventListeners = function ()
    {
        var args = RGraph.getArgs(arguments, 'id');

        if (args.id && args.id === 'window') {

            window.removeEventListener('mousedown', RGraph.window_mousedown_event_listener, false);
            window.removeEventListener('mouseup', RGraph.window_mouseup_event_listener, false);

        } else {
            
            var canvas = document.getElementById(args.id);

            canvas.removeEventListener('mouseup', canvas.rgraph_mouseup_event_listener, false);
            canvas.removeEventListener('mousemove', canvas.rgraph_mousemove_event_listener, false);
            canvas.removeEventListener('mousedown', canvas.rgraph_mousedown_event_listener, false);
            canvas.removeEventListener('click', canvas.rgraph_click_event_listener, false);
        }
    };







    //
    // Hides the annotating palette. It's here because it can be called
    // from code other than the annotating code.
    //
    // No arguments
    //
    RGraph.hidePalette = function ()
    {
        var div = RGraph.Registry.get('palette');
        
        if(typeof div == 'object' && div) {
            
            div.style.visibility = 'hidden';
            div.style.display = 'none';
            
            RGraph.Registry.set('palette', null);
        }
    };








    //
    // Generates a random number between the minimum and maximum
    // 
    // @param  args object An object consisting of:
    //                      o min
    //                      o max
    //                      o decimals
    // OR
    //
    // @param number min The minimum value
    // @param number max The maximum value
    // @param number     OPTIONAL Number of decimal places
    //
    RGraph.random = function ()
    {
        var args = RGraph.getArgs(arguments, 'min,max,decimals');

        var dp = args.decimals ? args.decimals : 0;
        var r  = Math.random();
        
        return Number((((args.max - args.min) * r) + args.min).toFixed(dp));
    };








    //
    // Returns an array of random values
    //
    // @param  args object An object consisting of:
    //                      o count
    //                      o min
    //                      o max
    //                      o decimals
    // OR
    //
    //
    RGraph.arrayRandom = function ()
    {
        var args = RGraph.getArgs(arguments, 'count,min,max,decimals');

        for(var i=0,arr=[]; i<args.count; i+=1) {
            arr.push(
                RGraph.random(
                    args.min,
                    args.max,
                    args.decimals
                )
            );
        }
        
        return arr;
    };








    //
    // Turns off shadow by setting blur to zero, the offsets to zero and the color to transparent black.
    // 
    // @param  args object An object consisting of:
    //                      o object
    // OR
    //
    // @param object obj The chart object
    //
    RGraph.noShadow = function ()
    {
        var args = RGraph.getArgs(arguments, 'object');

        args.object.context.shadowColor   = 'rgba(0,0,0,0)';
        args.object.context.shadowBlur    = 0;
        args.object.context.shadowOffsetx = 0;
        args.object.context.shadowOffsety = 0;
    };








    //
    // Sets the various shadow properties
    // 
    // @param  args object An object consisting of:
    //                      o object
    //                      o prefix
    // OR
    // 
    // @param object obj     The chart object (only supplying the RGraph chart
    //                       object turns the shadow off)
    // OR
    //
    // @param object obj     The chart object
    // @param string color   The color of the shadow
    // @param number offsetx The offsetX value for the shadow
    // @param number offsety The offsetY value for the shadow
    // @param number blur    The blurring value for the shadow
    //
    RGraph.setShadow = function ()
    {
        // 1 Argument
        if (   typeof arguments[0] === 'object'
            && typeof arguments[0].object === 'object'
            && typeof arguments[0].object.isrgraph
            && typeof arguments[0].prefix === 'string'
           ) {
           
           var args = arguments[0];

            args.object.context.shadowColor   = args.object.properties[args.prefix + 'Color'];
            args.object.context.shadowOffsetX = args.object.properties[args.prefix + 'Offsetx'];
            args.object.context.shadowOffsetY = args.object.properties[args.prefix + 'Offsety'];
            args.object.context.shadowBlur    = args.object.properties[args.prefix + 'Blur'];

        // Turn Off the shadow
        } else if (   arguments.length === 1
                   && typeof arguments[0] === 'object'
                   && typeof arguments[0].isrgraph) {
            
            var obj = arguments[0];

            obj.context.shadowColor   = 'rgba(0,0,0,0)';
            obj.context.shadowOffsetX = 0;
            obj.context.shadowOffsetY = 0;
            obj.context.shadowBlur    = 0;

        // Separate arguments
        } else {

            var obj = arguments[0];
    
            obj.context.shadowColor   = arguments[1];
            obj.context.shadowOffsetX = arguments[2];
            obj.context.shadowOffsetY = arguments[3];
            obj.context.shadowBlur    = arguments[4];
        }
    };








    //
    // Sets an object in the RGraph registry
    // 
    // @param  args object An object consisting of:
    //                      o name
    //                      o value
    // OR
    //
    // @param string name The name of the value to set
    //
    RGraph.Registry.set = function ()
    {
        var args = RGraph.getArgs(arguments, 'name,value');

        // Convert uppercase letters to dot+lower case letter
        args.name = args.name.replace(/([A-Z])/g, function (str)
        {
            return '.' + String(RegExp.$1).toLowerCase();
        });

        RGraph.Registry.store[args.name] = args.value;
        
        return args.value;
    };








    //
    // Gets an object from the RGraph registry
    // 
    // @param  args object An object consisting of:
    //                      o name
    // OR
    //
    // @param string name The name of the value to fetch
    //
    RGraph.Registry.get = function ()
    {
        var args = RGraph.getArgs(arguments, 'name');

        // Convert uppercase letters to dot+lower case letter
        args.name = args.name.replace(/([A-Z])/g, function (str)
        {
            return '.' + String(RegExp.$1).toLowerCase();
        });


        return RGraph.Registry.store[args.name];
    };








    //
    // Converts the given number of degrees to radians. Angles in canvas are
    // measured in radians. There are a .toDegrees() function and a toRadians()
    // function too.
    // 
    // @param  args object An object consisting of:
    //                      o degrees
    // OR
    //
    // @param number degrees The value to convert
    //
    RGraph.toRadians = function ()
    {
        var args = RGraph.getArgs(arguments, 'degrees');

        return args.degrees * (RGraph.PI / 180);
    };

    // Usage: RGraph.toDegrees(3.14) // 180ish
    //
    // @param  args object An object consisting of:
    //                      o radians
    // OR
    //
    // @param number radians The angle in radians to convert to degrees
    //
    RGraph.toDegrees = function ()
    {
        var args = RGraph.getArgs(arguments, 'radians');

        return args.radians * (180 / Math.PI);
    };








    //
    // Generates logs for... log charts
    // 
    // @param  args object An object consisting of:
    //                      o number
    //                      o base
    // OR
    //
    // @param number n    The number to generate the log for
    // @param number base The base to use
    //
    RGraph.log = function ()
    {
        var args = RGraph.getArgs(arguments, 'number,base');

        return Math.log(args.number) / (args.base ? Math.log(args.base) : 1);
    };








    //
    // Determines if the given object is an array or not
    // 
    // @param  args object An object consisting of:
    //                      o object
    // OR
    //
    // @param mixed obj The variable to test
    //
    RGraph.isArray = function ()
    {
        var args = RGraph.getArgs(arguments, 'object');

        if (args.object && args.object.constructor) {
            var pos = args.object.constructor.toString().indexOf('Array');
        } else {
            return false;
        }

        return args.object != null &&
               typeof pos === 'number' &&
               pos > 0 &&
               pos < 20;
    };








    //
    // Removes white-space from the start aqnd end of a string
    // 
    // @param  args object An object consisting of:
    //                      o str
    // OR
    //
    // @param string str The string to trim
    //
    RGraph.trim = function ()
    {
        var args = RGraph.getArgs(arguments, 'str');

        return RGraph.ltrim(RGraph.rtrim(args.str));
    };








    //
    // Trims the white-space from the start of a string
    // 
    // @param  args object An object consisting of:
    //                      o str
    // OR
    //
    // @param string str The string to trim
    //
    RGraph.ltrim = function ()
    {
        var args = RGraph.getArgs(arguments, 'str');

        return args.str.replace(/^(\s|\0)+/, '');
    };








    //
    // Trims the white-space off of the end of a string
    // 
    // @param  args object An object consisting of:
    //                      o str
    // OR
    //
    // @param string str The string to trim
    //
    RGraph.rtrim = function ()
    {
        var args = RGraph.getArgs(arguments, 'str');

        return args.str.replace(/(\s|\0)+$/, '');
    };








    //
    // Returns true/false as to whether the given variable is
    // null or not.
    // 
    // @param mixed obj The argument to check
    //
    RGraph.isNull = function (obj)
    {
        if (typeof obj === 'object' && !obj) {
            return true;
        }
    
        return false;
    };








    //
    // Returns true/false as to whether the given variable is
    // null or not. This function also returns true if the
    // variable is undefined
    // 
    // @param mixed obj The argument to check
    //
    RGraph.isNullish = function (obj)
    {
        // Check for undefined
        if (RGraph.isUndefined(obj)) {
            return true;
        }

        // Check for null
        if (RGraph.isNull(obj)) {
            return true;
        }
    
        return false;
    };








    //
    // This function facilitates a very limited way of making your charts
    // whilst letting the rest of page continue - using  the setTimeout function
    // 
    // @param  args object An object consisting of:
    //                      o func
    //                      o delay
    // OR
    //
    // @param function func The function to run that creates the chart
    //
    RGraph.async = function ()
    {
        var args = RGraph.getArgs(arguments, 'func,delay');

        return setTimeout(args.func, args.delay ? args.delay : 1);
    };








    //
    // Resets (more than just clears) the canvas and clears any
    // pertinent objects from the ObjectRegistry.
    // 
    // @param  args object An object consisting of:
    //                      o canvas
    // OR
    //
    // @param object canvas The canvas object (as returned by document.getElementById() ).
    //
    RGraph.reset = function ()
    {
        var args = RGraph.getArgs(arguments, 'canvas');

        // If a string has been given then treat it as the ID
        // of the canvas
        if (typeof args.canvas === 'string') {
            args.canvas = document.getElementById(args.canvas);
        }

        args.canvas.width = args.canvas.width;
        
        // Clear the ObjectRegistry
        RGraph.ObjectRegistry.clear(args.canvas);
         
        
        // Get rid of references from the canvas that are added by
        // various RGraph dynamic features
        //
        // Do the back image first
        if (args.canvas.__rgraph_background_image__) {
            delete args.canvas.__rgraph_background_image__.__object__;
            delete args.canvas.__rgraph_background_image__.__canvas__;
            delete args.canvas.__rgraph_background_image__.__context__;
        }

        for (v of ['__object__', '__rgraph_background_image__']) {
            delete args.canvas[v];
        }






        if (RGraph.text.domNodeCache && RGraph.text.domNodeCache.reset) {
            RGraph.text.domNodeCache.reset(args.canvas);
        }

        // Create the node and dimension caches if they don't
        // already exist
        if (!RGraph.text.domNodeCache)          { RGraph.text.domNodeCache          = []; }
        if (!RGraph.text.domNodeDimensionCache) { RGraph.text.domNodeDimensionCache = []; }

        // Create/reset the specific canvas arrays in the caches
        RGraph.text.domNodeCache[args.canvas.id]          = [];
        RGraph.text.domNodeDimensionCache[args.canvas.id] = [];
    };








    //
    // This function is due to be removed.
    //
    // 19/10/2019 Commented out
    // 
    // @param string id The ID of what can be either the canvas tag or a DIV tag
    //
    //RGraph.getCanvasTag = function ()
    //{
    //    var args = RGraph.getArgs(arguments, 'id');
    //
    //    var id = typeof args.id === 'object' ? args.id.id : args.id;
    //    
    //    var canvas = document.getElementById(id);
    //
    //    return [id, canvas];
    //};








    //
    // A wrapper function that encapsulate requestAnimationFrame
    // 
    // @param  args object An object consisting of:
    //                      o func
    // OR
    //
    // @param function func The animation function
    //
    RGraph.Effects.updateCanvas = function ()
    {
        var args = RGraph.getArgs(arguments, 'func');

        window.requestAnimationFrame =    
                window.requestAnimationFrame
            || window.webkitRequestAnimationFrame
            || window.msRequestAnimationFrame
            || window.mozRequestAnimationFrame
            || (function (func){setTimeout(func, 16.666);});
        
        window.requestAnimationFrame(args.func);
    };








    //
    // Checks to see if the user has requested to stop the
    // animation
    //
    // @param obj object The chart object
    //
    RGraph.Effects.userRequestedStop = function (obj)
    {
        var ret = false;

        if (obj.stopAnimationRequested) {

            ret = true;

            // Reset the flag now that its been checked
            obj.stopAnimationRequested = false;
        }

        return ret;
    };








    //
    // This function returns an easing multiplier for effects so they eas out towards the
    // end of the effect.
    // 
    // @param  args object An object consisting of:
    //                      o frames
    //                      o frame
    // OR
    //
    // @param number frames The total number of frames
    // @param number frame  The frame number
    //
    RGraph.Effects.getEasingMultiplier = function ()
    {
        var args = RGraph.getArgs(arguments, 'frames,frame');

        return Math.pow(Math.sin((args.frame / args.frames) * RGraph.HALFPI), 3);
    };








    //
    // This function converts an array of strings to an array of numbers. Its used by the meter/gauge
    // style charts so that if you want you can pass in a string. It supports various formats:
    // 
    // '45.2'
    // '-45.2'
    // ['45.2']
    // ['-45.2']
    // '45.2,45.2,45.2' // A CSV style string
    // 
    // @param  args object An object consisting of:
    //                      o string
    //                      o separator (optional)
    // OR
    //
    // @param number frames    The string or array to parse
    // @param string separator Optional Use this instead of the default comma
    //
    RGraph.stringsToNumbers = function ()
    {
        var args = RGraph.getArgs(arguments, 'string,separator');

        // An optional separator to use intead of a comma
        var sep = args.separator || ',';



        // Remove preceding square brackets
        if (typeof args.string === 'string' && args.string.trim().match(/^\[ *\d+$/)) {
            args.string = args.string.replace('[', '');
        }


        // If it's already a number just return it
        if (typeof args.string === 'number') {
            return args.string;
        }





        if (typeof args.string === 'string') {
            if (args.string.indexOf(sep) != -1) {
                args.string = args.string.split(sep);
            } else {
                args.string = parseFloat(args.string);

                if (isNaN(args.string)) {
                    args.string = null;
                }

            }
        }





        if (typeof args.string === 'object' && !RGraph.isNullish(args.string)) {
            for (var i=0,len=args.string.length; i<len; i+=1) {
                args.string[i] = RGraph.stringsToNumbers(
                    args.string[i],
                    args.separator
                );
            }
        }

        return args.string;
    };








    //
    // Drawing cache function. This function creates an off-screen canvas and draws [wwhatever] to it
    // and then subsequent calls use that  instead of repeatedly drawing the same thing.
    // 
    // @param  args object An object consisting of:
    //                      o object
    //                      o id
    //                      o function
    // OR
    //
    // @param object   obj  The graph object
    // @param string   id   An ID string used to identify the relevant entry in the cache
    // @param function func The drawing function. This will be called to do the draw.
    //
    RGraph.cachedDraw = function ()
    {
        var args = RGraph.getArgs(arguments, 'object,id,function');




        /////////////////////////////////////////
        //
        // This bypasses caching entirely:
        //
        // func(obj, obj.canvas, obj.context);
        // return;
        //
        /////////////////////////////////////////





        //If the cache entry exists - just copy it across to the main canvas
        if (!RGraph.cache[args.id]) {

            RGraph.cache[args.id] = {};

            RGraph.cache[args.id].object = args.object;
            RGraph.cache[args.id].canvas = document.createElement('canvas');

            RGraph.cache[args.id].canvas.setAttribute('width', args.object.canvas.width);
            RGraph.cache[args.id].canvas.setAttribute('height', args.object.canvas.height);
            RGraph.cache[args.id].canvas.setAttribute('id', 'background_cached_canvas' + args.object.canvas.id);

            RGraph.cache[args.id].canvas.__object__ = args.object;
            RGraph.cache[args.id].context = RGraph.cache[args.id].canvas.getContext('2d');
            
            // Antialiasing on the cache canvas
            RGraph.cache[args.id].context.translate(0.5,0.5);

            // Call the function
            args.function(
                args.object,
                RGraph.cache[args.id].canvas,
                RGraph.cache[args.id].context
            );
        }

        // Now copy the contents of the cached canvas over to the main one.
        // The coordinates are -0.5 because of the anti-aliasing effect in
        // use on the main canvas
        args.object.context.drawImage(RGraph.cache[args.id].canvas,-0.5,-0.5);
    };








    //
    // The function that runs through the supplied configuration and
    // converts it to the RGraph style.
    // 
    // @param  args object An object consisting of:
    //                      o object
    //                      o config
    // OR
    //
    // @param object conf The config
    // @param object      The settings for the object
    //
    RGraph.parseObjectStyleConfig = function ()
    {
        var args = RGraph.getArgs(arguments, 'object,config');

        for (var i in args.config) {
            if (typeof i === 'string') {
                args.object.set(i, args.config[i]);
            }
        }
    };








    //
    // This function is a short-cut for the canvas path syntax (which can be rather
    // verbose). You can read a description of it (which details all of the
    // various options) on the RGraph blog (www.rgraph.net/blog). The function is
    // added to the CanvasRenderingContext2D object so it becomes a context function.
    // 
    // So you can use it like these examples show:
    // 
    // 1. RGraph.path(context, 'b r 0 0 50 50 f red');
    // 2. RGraph.path(context, 'b a 50 50 50 0 3.14 false f red');
    // 3. RGraph.path(context, 'b m 5 100 bc 5 0 100 0 100 100 s red');
    // 4. RGraph.path(context, 'b m 5 100 at 50 0 95 100 50 s red');
    // 5. RGraph.path(context, 'sa b r 0 0 50 50 c b r 5 5 590 240 f red rs');
    // 6. RGraph.path(context, 'ld [2,6] ldo 4 b r 5 5 590 240 f red');
    // 7. RGraph.path(context, 'ga 0.25 b r 5 5 590 240 f red');
    //
    // You can also call it like this - as a member function of an RGraph object:
    //
    // 8 obj.path('b r % % % % f red s black', x, y, width, height);
    // 
    // 
    // @param  args object An object consisting of:
    //                      o object
    //                      o path
    //                      o args
    // OR
    // 
    // @param  args object An object consisting of:
    //                      o context
    //                      o path
    //                      o args
    // OR
    //
    // @param  args object The chart object
    // @param  args string The path to draw
    // @param  args array  An array of arguments for the path
    //
    // OR
    //
    // @param args context The canvas tags context
    // @param args string  The path to draw
    // @param args array   An array of arguments to the path
    //
    RGraph.path = function (args)
    {
        var arguments = Array.prototype.slice.call(arguments);

        // Allow a single arg to be passed as well as multiple

        // Object is passed
        if (arguments.length === 1 && args.object && args.path) {
            var context = args.object.context;
            var p       = args.path;
            var args    = args.args;
        
        // Context is passed
        } else if (arguments.length === 1 && args.context && args.path) {
            var context  = args.context;
            var p        = args.path;
            var args     = args.args;
        
        // Multiple args, object given
        } else if (arguments.length >= 2 && arguments[0].isrgraph && arguments[0].context) {
            var context = arguments[0].context;
            var p       = arguments[1];
            var args    = arguments.length > 2 ? arguments.slice(2) : [];
        
        // Multiple args, context given
        } else if (arguments.length >= 2 && arguments[0].toString().indexOf('Context')) {
            var context   = arguments[0];
            var p         = arguments[1];
            var args      = arguments.length > 2 ? arguments.slice(2) : [];
        }

        
        // If the path was a string - split it then collapse quoted bits together
        if (typeof p === 'string') {
            p = splitstring(p);
        }

        // Store the last path on the RGraph object
        RGraph.path.last = RGraph.arrayClone(p);

        // Go through the path information.
        for (var i=0,len=p.length; i<len; i+=1) {

            switch (p[i]) {
                case 'b':context.beginPath();break;
                case 'c':context.closePath();break;
                case 'm':context.moveTo(parseFloat(p[i+1]),parseFloat(p[i+2]));i+=2;break;
                case 'l':context.lineTo(parseFloat(p[i+1]),parseFloat(p[i+2]));i+=2;break;
                case 's':if(p[i+1]&&p[i+1]!=='null')context.strokeStyle=p[i+1];context.stroke();i++;break;
                case 'f':if(p[i+1]&&p[i+1]!=='null'){context.fillStyle=p[i+1];}context.fill();i++;break;
                case 'qc':context.quadraticCurveTo(parseFloat(p[i+1]),parseFloat(p[i+2]),parseFloat(p[i+3]),parseFloat(p[i+4]));i+=4;break;
                case 'bc':context.bezierCurveTo(parseFloat(p[i+1]),parseFloat(p[i+2]),parseFloat(p[i+3]),parseFloat(p[i+4]),parseFloat(p[i+5]),parseFloat(p[i+6]));i+=6;break;
                case 'r':context.rect(parseFloat(p[i+1]),parseFloat(p[i+2]),parseFloat(p[i+3]),parseFloat(p[i+4]));i+=4;break;
                case 'rr':RGraph.roundedRect(context,parseFloat(p[i+1]),parseFloat(p[i+2]),parseFloat(p[i+3]),parseFloat(p[i+4]),parseFloat(p[i+5]));i+=5;break;
                case 'a':context.arc(parseFloat(p[i+1]),parseFloat(p[i+2]),parseFloat(p[i+3]),parseFloat(p[i+4]),parseFloat(p[i+5]),p[i+6]==='true'||p[i+6]===true||p[i+6]===1||p[i+6]==='1'?true:false);i+=6;break;
                case 'at':context.arcTo(parseFloat(p[i+1]),parseFloat(p[i+2]),parseFloat(p[i+3]),parseFloat(p[i+4]),parseFloat(p[i+5]));i+=5;break;
                case 'lw':context.lineWidth=parseFloat(p[i+1]);i++;break;
                case 'e':context.ellipse(parseFloat(p[i+1]),parseFloat(p[i+2]),parseFloat(p[i+3]),parseFloat(p[i+4]),parseFloat(p[i+5]),parseFloat(p[i+6]),parseFloat(p[i+7]),p[i+8] === 'true' ? true : false);i+=8;break;
                case 'lj':context.lineJoin=p[i+1];i++;break;
                case 'lc':context.lineCap=p[i+1];i++;break;
                case 'sc':context.shadowColor=p[i+1];i++;break;
                case 'sb':context.shadowBlur=parseFloat(p[i+1]);i++;break;
                case 'sx':context.shadowOffsetX=parseFloat(p[i+1]);i++;break;
                case 'sy':context.shadowOffsetY=parseFloat(p[i+1]);i++;break;
                case 'fs':context.fillStyle=p[i+1];i++;break;
                case 'ss':context.strokeStyle=p[i+1];i++;break;
                case 'fr':context.fillRect(parseFloat(p[i+1]),parseFloat(p[i+2]),parseFloat(p[i+3]),parseFloat(p[i+4]));i+=4;break;
                case 'sr':context.strokeRect(parseFloat(p[i+1]),parseFloat(p[i+2]),parseFloat(p[i+3]),parseFloat(p[i+4]));i+=4;break;
                case 'cl':context.clip();break;
                case 'sa':context.save();break;
                case 'rs':context.restore();break;
                case 'tr':context.translate(parseFloat(p[i+1]),parseFloat(p[i+2]));i+=2;break;
                case 'sl':context.scale(parseFloat(p[i+1]), parseFloat(p[i+2]));i+=2;break;
                case 'ro':context.rotate(parseFloat(p[i+1]));i++;break;
                case 'tf':context.transform(parseFloat(p[i+1]),parseFloat(p[i+2]),parseFloat(p[i+3]),parseFloat(p[i+4]),parseFloat(p[i+5]),parseFloat(p[i+6]));i+=6;break;
                case 'stf':context.setTransform(parseFloat(p[i+1]),parseFloat(p[i+2]),parseFloat(p[i+3]),parseFloat(p[i+4]),parseFloat(p[i+5]),parseFloat(p[i+6]));i+=6;break;
                case 'cr':context.clearRect(parseFloat(p[i+1]),parseFloat(p[i+2]),parseFloat(p[i+3]),parseFloat(p[i+4]));i+=4;break;
                case 'ld':var parts = eval(p[i+1]);context.setLineDash(parts);i+=1;break;
                case 'ldo':context.lineDashOffset=p[i+1];i++;break;
                case 'fo':context.font=p[i+1];i++;break;
                case 'ft':context.fillText(p[i+1], parseFloat(p[i+2]), parseFloat(p[i+3]));i+=3;break;
                case 'st':context.strokeText(p[i+1], parseFloat(p[i+2]), parseFloat(p[i+3]));i+=3;break;
                case 'ta':context.textAlign=p[i+1];i++;break;
                case 'tbl':context.textBaseline=p[i+1];i++;break;
                case 'ga':context.globalAlpha=parseFloat(p[i+1]);i++;break;
                case 'gco':context.globalCompositeOperation=p[i+1];i++;break;
                case 'fu':(p[i+1])(context.canvas.__object__);i++;break;
                case 'ci':context.arc(parseFloat(p[i+1]),parseFloat(p[i+2]),parseFloat(p[i+3]),0,6.29,false);i+=3;break;
                case 'do':context.arc(parseFloat(p[i+1]),parseFloat(p[i+2]),parseFloat(p[i+3]),0,6.29,false);context.arc(parseFloat(p[i+1]),parseFloat(p[i+2]),parseFloat(p[i+4]),6.29,0,true);i+=4;break;
                
                // Empty option - ignore it
                case '':break;
                
                // Unknown option
                default: alert('[ERROR] Unknown option: ' + p[i]);
            }
        }
        
        function splitstring (p)
        {
            var ret = [], buffer = '', inquote = false, quote = '', substitutionIndex = 0;

            // p is a string - not an array
            for (var i=0; i<p.length; i+=1) {
                
                var chr = p[i],
                    isWS = chr.match(/ /);

                if (isWS) {
                    if (!inquote) {

                        // Get rid of any enclosing quotes
                        if (buffer[0] === '"' || buffer[0] === "'") {
                            buffer = buffer.substr(1, buffer.length - 2);
                        }


                        // String substitution
                        if (buffer.trim() === '%' && typeof args[substitutionIndex] !== 'undefined') {
                            buffer = args[substitutionIndex++];
                        }

                        ret.push(buffer);
                        buffer = '';
                    } else {
                        buffer += chr;
                    }
                } else {
                    if (chr === "'" || chr === '"') {
                        inquote = !inquote;
                    }

                    buffer += chr;
                }
            }

            // Do the last bit (including substitution)
            if (buffer.trim() === '%' && args[substitutionIndex]) {
                buffer = args[substitutionIndex++];
            }

            ret.push(buffer);

            return ret;
        }
    };








    //
    // This function gets the text properties when given a relevant prefix.
    // So if you give it 'text' as the prefix you'll get the:
    //
    //  o textFont
    //  o textSize
    //  o textColor
    //  o textBold
    //  o textItalic
    //
    // ...properties. On the other hand if you give it 'yaxisScaleLabels'
    // as the prefix you'll get:
    //
    //  o yaxisScaleLabelsFont
    //  o yaxisScaleLabelsSize
    //  o yaxisScaleLabelsColor
    //  o yaxisScaleLabelsBold
    //  o yaxisScaleLabelsItalic
    // 
    // @param  args object An object consisting of:
    //                      o object
    //                      o prefix
    //
    RGraph.getTextConf = function (args)
    {
        var obj        = args.object,
            properties = obj.properties,
            prefix     = args.prefix;

        // Has to be a seperate var statement
        var font   = typeof properties[prefix + 'Font']   === 'string'  ? properties[prefix + 'Font']   : properties.textFont,
            size   = typeof properties[prefix + 'Size']   === 'number'  ? properties[prefix + 'Size']   : properties.textSize,
            color  = typeof properties[prefix + 'Color']  === 'string'  ? properties[prefix + 'Color']  : properties.textColor,
            bold   = !RGraph.isNullish(properties[prefix + 'Bold'])        ? properties[prefix + 'Bold']   : properties.textBold,
            italic = !RGraph.isNullish(properties[prefix + 'Italic'])      ? properties[prefix + 'Italic'] : properties.textItalic;

        return {
            font:   font,
            size:   size,
            color:  color,
            bold:   bold,
            italic: italic
        };
    };








    //
    // The responsive function. This installs the rules as stipulated
    // in the rules array.
    //
    // @param object conf An object map of properties/arguments for the function.
    //                    This should consist of:
    //                     o maxWidth
    //                     o width
    //                     o height
    //                     o options
    //                     o css
    //                     o parentCss
    //                     o callback
    //
    RGraph.responsive = function (conf)
    {
        var obj = this;
        
        //
        // Sort the configuration so that it descends in order of biggest screen
        // to smallest
        //
        conf.sort(function (a, b)
        {
            var aNull = RGraph.isNullish(a.maxWidth);
            var bNull = RGraph.isNullish(b.maxWidth);
            
            if (aNull && bNull) return 0;
            if (aNull && !bNull) return -1;
            if (!aNull && bNull) return 1;

            return b.maxWidth - a.maxWidth;
        });

        //
        // Preparse the configuration adding any missing minWidth values to the configuration
        //
        for (var i=0; i<conf.length; ++i) {
            if (conf[i+1] && typeof conf[i+1].maxWidth === 'number') {
                conf[i].minWidth = conf[i+1].maxWidth;
            } else if (!conf[i+1]) {
                conf[i].minWidth = 0;
            }
        }


        //
        // Loop through the configurations
        //
        for (var i=0; i<conf.length; ++i) {
        
            // Set the minimum and maximum
            conf[i].minWidth = RGraph.isNullish(conf[i].minWidth) ?      0 : conf[i].minWidth;
            conf[i].maxWidth = RGraph.isNullish(conf[i].maxWidth) ? 100000 : conf[i].maxWidth;
            
            // Create the media query string
            var str = 'screen and (min-width: %1px) and (max-width: %2px)'.format(
                conf[i].minWidth,
                conf[i].maxWidth
            );
        
            var mediaQuery = window.matchMedia(str);
            (function (index)
            {
                mediaQuery.addListener(function (e)
                {
                    if (e.matches) {
                        matchFunction(conf[index]);
                    }
                });
            })(i);
            
            // An Initial test
            if (   document.documentElement.clientWidth >= conf[i].minWidth
                && document.documentElement.clientWidth < conf[i].maxWidth) {
                matchFunction(conf[i]);
            }
        }
        
        //
        // If a rule matches - this is the function that runs
        //
        function matchFunction (rule)
        {
            // If a width is defined for this rule set it
            if (typeof rule.width === 'number') {
                if (obj.get('textAccessible')) {
                    obj.canvas.parentNode.style.width  = rule.width + 'px';
                }
                
                obj.canvas.width = rule.width;
                obj.canvas.__rgraph_aa_translated__ = false;
            }

            //
            // If a height is defined for this rule set it
            //
            if (typeof rule.height === 'number') {
                if (obj.get('textAccessible')) {
                    obj.canvas.parentNode.style.height = rule.height + 'px';
                }

                obj.canvas.height = rule.height;
                obj.canvas.__rgraph_aa_translated__ = false;
            }

            //
            // Are there any options to be set?
            //
            if (typeof rule.options === 'object') {
                for (var j in rule.options) {
                    if (typeof j === 'string') {
                        obj.set(j, rule.options[j]);
                        
                        // Set the original colors to the new colors
                        // if necessary
                        if (j === 'colors' && obj.original_colors) {
                            obj.original_colors = RGraph.arrayClone(rule.options[j]);
                        }
                    }
                }
            }





            //
            // This function simply sets a CSS property on the object.
            // It accommodates certain name changes
            //
            var setCSS = function (el, name, value)
            {
                var replacements = [
                    ['float', 'cssFloat']
                ];
                
                // Replace the name if necessary
                for (var i=0; i<replacements.length; ++i) {
                    if (name === replacements[i][0]) {
                        name = replacements[i][1];
                    }
                }

                el.style[name] = value;
            };




            //
            // Are there any CSS properties to set on the canvas tag?
            //
            if (typeof rule.css === 'object') {
                for (var j in rule.css) {
                    if (typeof j === 'string') {
                        if (obj.get('textAccessible')) {
                            setCSS(obj.canvas.parentNode, j, rule.css[j]);
                        } else {
                            setCSS(obj.canvas, j, rule.css[j]);
                        }
                    }
                }
            }

            //
            // Are there any CSS properties to set on the canvas tahs PARENT?
            //
            if (typeof rule.parentCss === 'object') {
                for (var j in rule.parentCss) {
                    if (typeof j === 'string') {
                        if (obj.get('textAccessible')) {
                            setCSS(obj.canvas.parentNode.parentNode, j, rule.parentCss[j]);
                        } else {
                            setCSS(obj.canvas.parentNode, j, rule.parentCss[j])
                        }
                    }
                }
            }





            RGraph.cache = [];
            RGraph.resetColorsToOriginalValues(obj);
            if (obj.get('textAccessible') && RGraph.text.domNodeCache && RGraph.text.domNodeCache.reset) {
                RGraph.text.domNodeCache.reset(obj.canvas);
            }

            RGraph.redraw(obj.canvas);

            // Run the callback function if it's defined
            if (typeof rule.callback === 'function') {
                (rule.callback)(obj);
            }
        }
        
        // Returning the object facilitates chaining
        return obj;
    };








    //
    // You can now specify your reponsive configuration inline,
    // with the rest of your charts configuration.
    //
    // @param object obj The chart object
    //
    RGraph.installInlineResponsive = function (obj)
    {
        if (RGraph.isArray(obj.properties.responsive)) {
            RGraph.runOnce('install-responsive-configuration-' + obj.uid, function ()
            {
                    obj.responsive(obj.properties.responsive);
            });
        }
    };








    //
    // This function can be used to resize the canvas when the screen size changes. You
    // specify various rules and they're then checked.
    //
    // @param object conf An object map of properties/arguments for the function.
    //                    This should consist of:
    //                     o maxWidth
    //                     o width
    //                     o height
    //                     o options
    //                     o css
    //                     o parentCss
    //                     o callback
    // @param object       Optionally you can give a second object map to the function
    //                     of options. There's only on option at the moment:
    //                      o delay
    //
    // RGraph.responsiveOld
    RGraph.responsive_old = function (conf)
    {
        var args = arguments[1] || {},
            
            // This function is added to each object in their constructors so the this
            // variable is the chart object.
            obj   = this,
            
            // The func variable becomes the function that is fired by the resize event
            func  = null,
            
            // This is the timer reference
            timer = null;
        
        // The resizie function will run This many milliseconds after the
        // resize has "finished"
        args.delay = typeof args.delay === 'number' ? args.delay : 200;

        // [TODO] Store defaults that are used if there's no match
        var func = function ()
        {
            // This is set to true if a rule matches
            var matched = false;

            // Loop through all of the rules
            for (var i=0; i<conf.length; ++i) {

                //
                // If a maxWidth is stipulated test that
                //
                if (!matched && (document.documentElement.clientWidth <= conf[i].maxWidth || RGraph.isNullish(conf[i].maxWidth))) {

                    matched = true;

                    // If a width is defined for this rule set it
                    if (typeof conf[i].width === 'number') {
                        if (obj.get('textAccessible')) {
                            obj.canvas.parentNode.style.width  = conf[i].width + 'px';
                        }
                        
                        obj.canvas.width = conf[i].width;
                        obj.canvas.__rgraph_aa_translated__ = false;
                    }




                    //
                    // If a height is defined for this rule set it
                    //
                    if (typeof conf[i].height === 'number') {
                        if (obj.get('textAccessible')) {
                            obj.canvas.parentNode.style.height = conf[i].height + 'px';
                        }

                        obj.canvas.height = conf[i].height;
                        obj.canvas.__rgraph_aa_translated__ = false;
                    }




                    //
                    // Are there any options to be set?
                    //
                    if (typeof conf[i].options === 'object' && typeof conf[i].options === 'object') {
                        for (var j in conf[i].options) {
                            if (typeof j === 'string') {
                                obj.set(j, conf[i].options[j]);
                            }
                        }
                    }


                    //
                    // This function simply sets a CSS property on the object.
                    // It accommodates certain name changes
                    //
                    var setCSS = function (el, name, value)
                    {
                        var replacements = [
                            ['float', 'cssFloat']
                        ];
                        
                        // Replace the name if necessary
                        for (var i=0; i<replacements.length; ++i) {
                            if (name === replacements[i][0]) {
                                name = replacements[i][1];
                            }
                        }

                        el.style[name] = value;
                    };




                    //
                    // Are there any CSS properties to set on the canvas tag?
                    //
                    if (typeof conf[i].css === 'object') {
                        for (var j in conf[i].css) {
                            if (typeof j === 'string') {
                                if (obj.get('textAccessible')) {
                                    setCSS(obj.canvas.parentNode, j, conf[i].css[j]);
                                } else {
                                    setCSS(obj.canvas, j, conf[i].css[j]);
                                }
                            }
                        }
                    }

                    //
                    // Are there any CSS properties to set on the canvas tahs PARENT?
                    //
                    if (typeof conf[i].parentCss === 'object') {
                        for (var j in conf[i].parentCss) {
                            if (typeof j === 'string') {
                                if (obj.get('textAccessible')) {
                                    setCSS(obj.canvas.parentNode.parentNode, j, conf[i].parentCss[j]);
                                } else {
                                    setCSS(obj.canvas.parentNode, j, conf[i].parentCss[j])
                                }
                            }
                        }
                    }


                    // Redraw the chart
                    RGraph.cache = [];
                    RGraph.resetColorsToOriginalValues(obj);
                    if (obj.get('textAccessible')) {
                        RGraph.text.domNodeCache.reset(obj.canvas);
                    }

                    RGraph.redraw();


                    // Run the callback function if it's defined
                    if (typeof conf[i].callback === 'function') {
                        (conf[i].callback)(obj);
                    }
                }
            }
        }






        // Install the resize event listener
        RGraph.responsive.window_resize_event_listener = function ()
        {
            // Set a new timer in order to fire the func() function
            if (args.delay > 0) {
                // Clear the timeout
                clearTimeout(timer);
                
                // Start a new timer going
                timer = setTimeout(func, args.delay);
            
            // If you don't want a delay before the resizing occurs
            // then set the delay to zero and it will be fired immediately
            } else {
                func();
            }
        };
        window.addEventListener(
            'resize',
            RGraph.responsive.window_resize_event_listener,
            false
        );

        
        // Call the function initially otherwise it may never run
        func();
        
        // This facilitates chaining
        return obj;
    };








    //
    // A shortcut function for the RGraph.path() function. Saves
    // approximately 40 characters, In each objects constructor
    // it is added to the object so you can call it like this:
    //
    // myBar.path({
    //     path: 'lw 10 b r % % % % s black f red'
    //     args: [5,5,50,50]
    // });
    //
    // Or like this (whichever you prefer):
    //
    // myBar.path(
    //     'lw 10 b r % % % % s black f red',
    //     5, 5, 50, 50
    // );
    //
    RGraph.pathObjectFunction = function ()
    {
        // Siongle object argument
        if (arguments.length === 1 && typeof arguments[0] === 'object') {
            
            var args = RGraph.getArgs(arguments, 'path,args');

            RGraph.path({
                object: this,
                  path: args.path,
                  args: args.args
            });
        
        // First arg is a string                
        } else {
        
            var args = Array.prototype.slice.call(arguments, 1);

            RGraph.path({
                object: this,
                  path: arguments[0],
                  args: args
            });
        }
    };








    //
    // A common X axis drawing function that can be used by  the
    // Bar, HBar, Line, Scatter functions. A long time coming - but
    // this will eventually be joined by a common Y axis drawing
    // function.
    //
    //@param object obj The chart object. All the properties are
    //                  retrieved from this.
    //
    RGraph.drawXAxis = function (obj)
    {
        var properties      = obj.properties,
            context         = obj.context,
            tickmarksLength = (typeof properties.xaxisTickmarksLength === 'number' ? properties.xaxisTickmarksLength : 3),
            isSketch        = (obj.type === 'bar' && properties.variant === 'sketch');






        









        //
        // If the xaxisLabels property is defined then go through it converting
        // null and undefined values to empty strings.
        //
        if (   typeof properties.xaxisLabels === 'object'
            && !RGraph.isNullish(properties.xaxisLabels)
            && properties.xaxisLabels.length) {
            
            for (var i=0; i<properties.xaxisLabels.length; ++i) {
                if (typeof properties.xaxisLabels[i] === 'undefined' || properties.xaxisLabels[i] === null) {
                    properties.xaxisLabels[i] = '';
                }
            }
        }

        //
        // Calculate the Y coordinate for the X axis
        if ( (obj.type === 'hbar' || obj.type === 'gantt') && properties.xaxisPosition === 'bottom') {
            var y = obj.canvas.height - properties.marginBottom;
        } else if ( (obj.type === 'hbar' || obj.type === 'gantt') && properties.xaxisPosition === 'top') {
            var y = properties.marginTop;
        //} else if (obj.type === 'scatter' && properties.yaxisScaleInvert) {
        //    var y = obj.getYCoord(properties.yaxisScaleMin > 0 ? properties.yaxisScaleMin : 0);
        } else {
            var y = obj.getYCoord(properties.yaxisScaleMin > 0 ? properties.yaxisScaleMin : 0);
        }

        // Special case for a Line chart with an inverted scale
        if (obj.type === 'line' && properties.yaxisScaleInvert && properties.yaxisScaleMin === 0) {
            y = obj.getYCoord(obj.scale2.max);
        }

        // Special case for a Scatter chart with an inverted scale
        if (obj.type === 'scatter' && properties.yaxisScaleInvert) {
            if (properties.yaxisScaleMin >= 0) {
                y = obj.getYCoord(obj.scale2.max);
            }
        }

        // Special case for positioning an X axis Drawing API object
        if (obj.type === 'drawing.xaxis') {
            if (properties.xaxisPosition === 'center') {
                y = ((obj.canvas.height - properties.marginTop - properties.marginBottom) / 2) + properties.marginTop;
            } else {
                y = obj.y;
            }
        }

        //
        // Draw the axis
        //
        if (properties.xaxis) {

            // Draw the axis
            obj.path(
                'lc square lw % b m % % l % % s %',
                properties.xaxisLinewidth,
                properties.marginLeft - (isSketch ? 5 : 0),
                
                y - (isSketch ? 2 : 0),
                
                obj.canvas.width - properties.marginRight + (isSketch ? 7 : 0), y + (isSketch ? 2 : 0),
                properties.xaxisColor
            );

                // Draw the tickmarks if necessary
                if (!isSketch) {

                    if (properties.xaxisTickmarks) {

                        if (typeof properties.xaxisTickmarksCount === 'number') {
                            var xaxisTickmarksCount = properties.xaxisTickmarksCount;

                        // Bar - get number of tickmarks from the number of data points
                        } else if (obj.type === 'bar') {
                            var xaxisTickmarksCount = obj.data.length || 10;
                            
                        // HBar - get number of tickmarks from the xaxisLabelsCount property and default to 5
                        } else if (obj.type === 'hbar') {
                            var xaxisTickmarksCount = (properties.xaxisLabelsCount || 5);
                        
                        // Line - get the number of tickmarks from the number of datapoints
                        } else if (obj.type === 'line') {
                            var xaxisTickmarksCount = obj.data[0].length > 0 ? obj.data[0].length - 1 : 10;
                        
                        // Scatter - with a scale - get the number of tickmarks from the number of scale labels
                        } else if (obj.type === 'scatter' && properties.scale) {
                            var xaxisTickmarksCount = 5;

                            
                        // Scatter - with labels - get the number of tickmarks from the number of labels
                        } else if (obj.type === 'scatter' && properties.xaxisLabels) {
                            var xaxisTickmarksCount = properties.xaxisLabels.length;

                        // Scatter - with no labels and no scale
                        } else if (obj.type === 'scatter') {
                            var xaxisTickmarksCount = 5;

                        // Waterfall - get the number of tickmarks from the number of datapoints
                        } else if (obj.type === 'waterfall') {
                            var xaxisTickmarksCount = obj.data.length + (properties.total ? 1 : 0);
                            
                        // Drawing API X axis
                        } else if (obj.type === 'drawing.xaxis') {

                            if (properties.scale) {
                                var xaxisTickmarksCount = properties.xaxisScaleLabelsCount;
                            } else if (properties.xaxisLabels && properties.xaxisLabels.length) {
                                var xaxisTickmarksCount = properties.xaxisLabels.length;
                            } else {
                                var xaxisTickmarksCount = 5;
                            }

                        //  Default to 5 tickmarks
                        } else {
                            xaxisTickmarksCount = 5;
                        }
                    } else {
                        properties.xaxisTickmarksCount = 0;
                    }









                // Determine the Y start coordinate for the tickmarks
                if (properties.xaxisPosition === 'center' && properties.yaxisScaleMin >= 0) {
                    if (properties.yaxisScaleInvert) {
                        var tickmarksYStart = obj.getYCoord(properties.yaxisScaleMax) - tickmarksLength;
                        var tickmarksYEnd   = obj.getYCoord(properties.yaxisScaleMax) + tickmarksLength;
                    } else {
                        var tickmarksYStart = obj.getYCoord(properties.yaxisScaleMin) - tickmarksLength;
                        var tickmarksYEnd   = obj.getYCoord(properties.yaxisScaleMin) + tickmarksLength;
                    }

                } else if (properties.xaxisPosition === 'center' || properties.yaxisScaleMin < 0) {
                    if (properties.yaxisScaleInvert) {
                        var tickmarksYStart = obj.getYCoord(obj.scale2.max) - tickmarksLength;
                        var tickmarksYEnd   = obj.getYCoord(obj.scale2.max) + tickmarksLength;
                    } else {
                        var tickmarksYStart = obj.getYCoord(0) - tickmarksLength;
                        var tickmarksYEnd   = obj.getYCoord(0) + tickmarksLength;
                    }

                    // Account for offset axes
                    if (properties.yaxisScaleMin < 0 && properties.yaxisScaleMax > 0) {
                        var tickmarksYStart = obj.getYCoord(0) - tickmarksLength;
                        var tickmarksYEnd   = obj.getYCoord(0) + tickmarksLength;
                    }

                } else if (properties.xaxisPosition === 'top') {
                    if (obj.getYCoord) {
                        var tickmarksYStart = obj.getYCoord(0) - tickmarksLength;
                        var tickmarksYEnd   = obj.getYCoord(0);
                    } else {
                        var tickmarksYStart = properties.marginTop - tickmarksLength;
                        var tickmarksYEnd   = properties.marginTop;
                    }

                } else {

                    if (obj.getYCoord) {
                        if (obj.type === 'line' && properties.yaxisScaleInvert) {
                            var tickmarksYStart = obj.getYCoord(obj.scale2.max);
                            var tickmarksYEnd   = obj.getYCoord(obj.scale2.max) + tickmarksLength;
                        
                        } else if (obj.type === 'scatter' && properties.yaxisScaleInvert) {
                            var tickmarksYStart = obj.getYCoord(obj.scale2.max);
                            var tickmarksYEnd   = obj.getYCoord(obj.scale2.max) + tickmarksLength;

                        } else if (obj.type === 'drawing.xaxis') {
                            tickmarksYStart = obj.y;
                            tickmarksYEnd   = obj.y + tickmarksLength;

                        } else {
                            var tickmarksYStart = obj.getYCoord(properties.yaxisScaleMin);
                            var tickmarksYEnd   = obj.getYCoord(properties.yaxisScaleMin) + tickmarksLength;
                        }

                    } else {

                        var tickmarksYStart = obj.canvas.height - properties.marginBottom;
                        var tickmarksYEnd   = obj.canvas.height - properties.marginBottom + tickmarksLength;
                    }
                }







                //if (!xaxisTickmarksCount) {
                    //xaxisTickmarksCount = 10;
                //}
    
                for (var i=0; i<=xaxisTickmarksCount; ++i) {

                    // Don't draw the LEFT tickmark if there's a Y axis on the left or if specifically
                    // told not to
                    if (RGraph.isNullish(properties.xaxisTickmarksLastLeft)) {

                        if ( i === 0 && properties.yaxis && properties.yaxisPosition === 'left' && !(properties.xaxisScaleMax > 0 && properties.xaxisScaleMin < 0) ) {
                            continue;
                        }

                    } else if (i === 0 && !properties.xaxisTickmarksLastLeft) {
                        continue;
                    }
                    
                    // Don't draw the RIGHT tickmark if there's a Y axis on the right or if specifically
                    // told not to
                    if (RGraph.isNullish(properties.xaxisTickmarksLastRight)) {
                        if (   i === xaxisTickmarksCount && properties.yaxis && properties.yaxisPosition === 'right') {
                            continue;
                        }
                    } else if ( i === xaxisTickmarksCount && !properties.xaxisTickmarksLastRight ) {
                        continue;
                    }
    
                    var x = (((obj.canvas.width - properties.marginLeft - properties.marginRight) / xaxisTickmarksCount) * i) + properties.marginLeft;

                    // If the chart is an HBar and the Y axis is in the center
                    // then don't draw a tickmark at the same position as the
                    // Y axis.
                    if (obj.type === 'hbar' ) {
                        if (properties.yaxisPosition === 'center' && x > obj.getXCoord(0) - 2 && x < obj.getXCoord(0) + 2) {
                            continue;
                        } else if (properties.yaxisPosition === 'left' && properties.xaxisScaleMin < 0 && properties.xaxisScaleMax > 0 && x > obj.getXCoord(0) - 2 && x < obj.getXCoord(0) + 2) {
                            continue;
                        }
                    }
    
                    obj.path(
                        'b m % % l % % s %',
                        x, tickmarksYStart,
                        x, tickmarksYEnd,
                        properties.xaxisColor
                    );
                } // END loop thru xaxisTickmarksCount
            } // END if (isSketch)
        }
        








        //
        // Draw the X axis labels if they're specified
        //

        //
        // Text angle
        //
        if (properties.xaxisLabelsAngle != 0) {
            
            var valign =  'center';
            var halign =  'right';
            var angle  = 0 - properties.xaxisLabelsAngle;
            
            if (properties.xaxisPosition === 'top') {
                var angle  = properties.xaxisLabelsAngle;
            }
            
        } else {
            var valign =  'top';
            var halign =  'center';
            var angle  = 0;
        }

        //
        // Draw an X axis scale if requested. The HBar uses an X axis scale and the
        // Scatter chart can (optionally) too
        //
        if (properties.xaxisScale) {

            var scale = obj.scale2;

            //
            // Get the scale for a Scatter chart X axis
            //
            if (obj.type === 'scatter') {
                scale = obj.xscale2;

            // Get the scale for a drawing API X axis
            } else if (obj.type === 'drawing.xaxis') {
                if (properties.xaxisScale) {

                    scale = RGraph.getScale({object: this, options: {
                        'scale.max':          properties.xaxisScaleMax,
                        'scale.min':          properties.xaxisScaleMin,
                        'scale.decimals':     Number(properties.xaxisScaleDecimals),
                        'scale.point':        properties.xaxisScalePoint,
                        'scale.thousand':     properties.xaxisScaleThousand,
                        'scale.round':        properties.xaxisScaleRound,
                        'scale.units.pre':    properties.xaxisScaleUnitsPre,
                        'scale.units.post':   properties.xaxisScaleUnitsPost,
                        'scale.labels.count': properties.xaxisScaleLabelsCount,
                        'scale.strict':       true
                     }});

                    for (var i=0; i<=properties.xaxisScaleLabelsCount; ++i) {
                    
                        var original = (((properties.xaxisScaleMax - properties.xaxisScaleMin) / properties.xaxisScaleLabelsCount) * i) + properties.xaxisScaleMin;
                        var hmargin  = properties.marginInner;
                    
                        if (typeof properties.xaxisScaleFormatter === 'function') {
                            var text =  (properties.xaxisScaleFormatter)(this, original)
                        } else {
                    
                            text = RGraph.numberFormat({
                                object:    obj,
                                number:    original.toFixed(original === 0 ? 0 : properties.xaxisScaleDecimals),
                                unitspre:  properties.xaxisScaleUnitsPre,
                                unitspost: properties.xaxisScaleUnitsPost,
                                point:     properties.xaxisScalePoint,
                                thousand:  properties.xaxisScaleThousand
                            });
                        }
                    }
                }
            }

            for (var i=0; i<scale.labels.length; ++i) {

                var section = (obj.canvas.width - properties.marginLeft - properties.marginRight) / scale.labels.length;
                
                if (properties.yaxisPosition === 'right') {
                    var x = properties.marginLeft + (section * i);
                } else if (properties.yaxisPosition === 'center') {
                    section /= 2;
                    var x = obj.getXCoord(0) + section + (section * i);
                } else {
                    var x = properties.marginLeft + (section * i) + section;
                }
                
                var y = properties.xaxisPosition === 'top' ? obj.marginTop - (properties.xaxisTickmarksLength || 0) + properties.xaxisLabelsOffsety - 5 : (obj.canvas.height - properties.marginBottom) + (properties.xaxisTickmarksLength || 0) + properties.xaxisLabelsOffsety + 5;
                
                if (obj.type === 'drawing.xaxis') {
                    if (properties.xaxisPosition === 'top') {
                        y = obj.y - (properties.xaxisTickmarksLength || 0) + properties.xaxisLabelsOffsety;
                    } else {
                        y = obj.y + (properties.xaxisTickmarksLength || 0) + properties.xaxisLabelsOffsety + 5;
                    }
                }

                RGraph.text({
                  object: obj,
          textConfPrefix: 'xaxisLabels',
                    x:      x + properties.xaxisLabelsOffsetx,
                    y:      y,
                    text:   typeof properties.xaxisScaleFormatter === 'function' ? (properties.xaxisScaleFormatter)({object: obj, number: scale.values[i]}) : (properties.yaxisPosition === 'right' ? String(scale.labels[scale.labels.length - 1 - i]) : String(scale.labels[i])),
                    valign: typeof properties.xaxisLabelsValign === 'string' ? properties.xaxisLabelsValign : (properties.xaxisPosition === 'top' ? 'bottom' : valign),
                    halign: typeof properties.xaxisLabelsHalign === 'string' ? properties.xaxisLabelsHalign : halign,
                    marker: false,
                    angle:  angle,
                    tag:    'xaxis.labels'
                });

                //
                // If the chart is a HBar and the X axis is in the center then
                // draw the negative side of the labels
                //
                if (obj.type === 'hbar' && properties.yaxisPosition === 'center') {

                        x = obj.getXCoord(0) - section - (section * i);
                
                        RGraph.text({
                          object: obj,
                  textConfPrefix: 'xaxisLabels',
                            x:      x + properties.xaxisLabelsOffsetx,
                            y:      properties.xaxisPosition === 'top' ? obj.marginTop - (properties.xaxisTickmarksLength || 0) + properties.xaxisLabelsOffsety - 5 : (obj.canvas.height - properties.marginBottom) + (properties.xaxisTickmarksLength || 0) + properties.xaxisLabelsOffsety + 5,
                            text:   typeof properties.xaxisScaleFormatter === 'function' ? (properties.xaxisScaleFormatter)({object: obj, number: scale.values[i]}) : '-' + String(scale.labels[i]),
                            valign: typeof properties.xaxisLabelsValign === 'string' ? properties.xaxisLabelsValign : (properties.xaxisPosition === 'top' ? 'bottom' : valign),
                            halign: typeof properties.xaxisLabelsHalign === 'string' ? properties.xaxisLabelsHalign : halign,
                            marker: false,
                            angle:  angle,
                            tag:    'xaxis.labels'
                        });
                }
            }




            //
            // Draw the minimum label
            //
            var str = ((properties.xaxisScaleUnitsPre || '') + (properties.xaxisScaleMin || 0).toFixed(properties.xaxisScaleDecimals).replace(/\./, properties.xaxisScalePoint) + (properties.xaxisScaleUnitsPost || ''));
            str     = str.replace(/^(.+)-(\d)/, '-$1$2');

            RGraph.text({
              object:   obj,
      textConfPrefix:   'xaxisLabels',
                x:      properties.yaxisPosition === 'right' ? obj.canvas.width - properties.marginRight + properties.xaxisLabelsOffsetx : (properties.yaxisPosition === 'center' ? obj.getXCoord(0) + properties.xaxisLabelsOffsetx : properties.marginLeft + properties.xaxisLabelsOffsetx),
                y:      y,
                text:   typeof properties.xaxisScaleFormatter === 'function' ? (properties.xaxisScaleFormatter)({object: obj, number: 0}) : str,
                valign: typeof properties.xaxisLabelsValign === 'string' ? properties.xaxisLabelsValign : (typeof properties.xaxisLabelsValign === 'string' ? properties.xaxisLabelsValign : (properties.xaxisPosition === 'top' ? 'bottom' : valign)),
                halign: typeof properties.xaxisLabelsHalign === 'string' ? properties.xaxisLabelsHalign : halign,
                marker: false,
                angle:  angle,
                tag:    'xaxis.labels'
            });

        } else if (properties.xaxisLabels && properties.xaxisLabels.length && (properties.xaxisLabelsPosition === 'section' || properties.xaxisLabelsPosition === 'edge') ) {

            if (properties.xaxisLabelsPosition === 'edge') {
                var section = (obj.canvas.width - properties.marginLeft - properties.marginRight - (properties.marginInner || 0) - (properties.marginInner || 0) ) / (properties.xaxisLabels.length - 1);
            } else {
                var section = (obj.canvas.width - properties.marginLeft - properties.marginRight) / properties.xaxisLabels.length;
            }


            for (var i=0; i<properties.xaxisLabels.length; ++i) {


                if (properties.xaxisLabelsPosition === 'edge') {
                    var x = properties.marginLeft + (properties.marginInner || 0) + (section * i);
                } else {
                    var x = properties.marginLeft + (section * i) + (section / 2) ;
                }











                // Allow for the Scatter chart labels to be at specific points
                // along the X scale
                if (typeof properties.xaxisLabels[i] === 'object' && obj.type === 'scatter') {

                    var rightEdge = 0;
                    var align     = properties.xaxisLabelsSpecificAlign === 'left' ? 'left' : 'center';
                    var halign    = 'center'
                    

                    if (properties.xaxisLabels[i+1] && typeof properties.xaxisLabels[i+1][1] === 'number') {
                        rightEdge = properties.xaxisLabels[i+1][1];

                    } else {
                        rightEdge = properties.xaxisScaleMax;
                    }

                    var leftEdge = properties.xaxisLabels[i][1];
                    var x        = ((obj.getXCoord(rightEdge) - obj.getXCoord(leftEdge)) / 2) + obj.getXCoord(leftEdge);
                    
                    if (align === 'left') {
                        x      = obj.getXCoord(leftEdge);
                        halign = 'left';
                    }

                    if (RGraph.isNullish(x)) {
                        continue;
                    }

                    if (obj.type === 'drawing.xaxis') {
                        if (properties.xaxisPosition === 'top') {
                            y = obj.y - (properties.xaxisTickmarksLength || 0) + properties.xaxisLabelsOffsety;
                        } else {
                            y = obj.y + (properties.xaxisTickmarksLength || 0) + properties.xaxisLabelsOffsety + 5;
                        }
                    }

                    var ret = RGraph.text({
                   object:      obj,
           textConfPrefix:      'xaxisLabels',
                        x:      x + 5 + properties.xaxisLabelsOffsetx,
                        y:      y + 5 + properties.xaxisLabelsOffsety,
                        valign: valign,
                        halign: angle != 0 ? 'right' : halign,
                        text:   String(RGraph.isNullish(properties.xaxisLabels[i][0]) ? '' : properties.xaxisLabels[i][0]),
                        angle:  angle,
                        marker: false,
                        tag:    'labels.specific',
                   cssClass:    RGraph.getLabelsCSSClassName({
                                    object: obj,
                                      name: 'xaxisLabelsClass',
                                     index: i
                                })
                    });














                    //
                    // Draw the gray indicator line
                    //
                    obj.path('b m % % l % % s #bbb',
                        Math.round(properties.marginLeft + (((properties.xaxisLabels[i][1] - properties.xaxisScaleMin) / (properties.xaxisScaleMax - properties.xaxisScaleMin )) * (obj.canvas.width - properties.marginLeft - properties.marginRight) )), obj.canvas.height - properties.marginBottom,
                        Math.round(properties.marginLeft + (((properties.xaxisLabels[i][1] - properties.xaxisScaleMin) / (properties.xaxisScaleMax - properties.xaxisScaleMin))) * (obj.canvas.width - properties.marginLeft - properties.marginRight) ), obj.canvas.height - properties.marginBottom + 20
                    );
                    
                    // Draw the final indicator line if we're on the final label
                    if (i === properties.xaxisLabels.length - 1) {
                        obj.path('b m % % l % % s #bbb',
                            obj.canvas.width - properties.marginRight, obj.canvas.height - properties.marginBottom,
                            obj.canvas.width - properties.marginRight, obj.canvas.height - properties.marginBottom + 20
                        );
                    }

                // A regular label
                } else {

                    var y = properties.xaxisPosition === 'top' ? properties.marginTop + properties.xaxisLabelsOffsety - 5 : (obj.canvas.height - properties.marginBottom) + properties.xaxisLabelsOffsety + 5;

                    if (obj.type === 'drawing.xaxis') {
                        //y = obj.y + (properties.xaxisTickmarksLength || 0) + properties.xaxisLabelsOffsety + 5;
                        if (obj.type === 'drawing.xaxis') {
                            if (properties.xaxisPosition === 'top') {
                                y = obj.y - (properties.xaxisTickmarksLength || 0) + properties.xaxisLabelsOffsety;
                            } else {
                                y = obj.y + (properties.xaxisTickmarksLength || 0) + properties.xaxisLabelsOffsety + 5;
                            }
                        }
                    }

                    var ret = RGraph.text({
                      object:   obj,
              
              textConfPrefix:   'xaxisLabels',

                        x:      x + properties.xaxisLabelsOffsetx,
                        y:      y + properties.xaxisLabelsOffsety,
                        
                        text:   String(RGraph.isNullish(properties.xaxisLabels[i]) ? '' : properties.xaxisLabels[i]),
                        
                        valign: typeof properties.xaxisLabelsValign === 'string' ? properties.xaxisLabelsValign : (properties.xaxisPosition === 'top' ? 'bottom' : valign),
                        halign: typeof properties.xaxisLabelsHalign === 'string' ? properties.xaxisLabelsHalign : halign,
                        
                        marker: false,
                        angle:  angle,
                        tag:    'xaxis.labels',
                        
                   cssClass:    RGraph.getLabelsCSSClassName({
                                    object: obj,
                                      name: 'xaxisLabelsClass',
                                     index: i
                                })
                    });
                }
            }
        }
        
        
        
        
        
        
        
        
        
        












        //
        // Draw the title
        //
        if (properties.xaxisTitle) {

            var x = properties.marginLeft + ((obj.canvas.width - properties.marginLeft - properties.marginRight) / 2) + properties.xaxisTitleOffsetx;
            var y = properties.xaxisPosition === 'top' ? properties.marginTop  - 7 + properties.xaxisTitleOffsety - properties.xaxisTickmarksLength : obj.canvas.height - properties.marginBottom + 7 + properties.xaxisTitleOffsety + properties.xaxisTickmarksLength;

            if (obj.type === 'drawing.xaxis') {
                y = obj.y  + 7 + properties.xaxisTitleOffsety + properties.xaxisTickmarksLength;
            }

            
            // Get the size of the X axis labels
            if (properties.xaxisScale || (properties.xaxisLabels && properties.xaxisLabels.length) ) {
                var textConf = RGraph.getTextConf({
                    object: obj,
                    prefix: 'xaxisLabels'
                });

                if (properties.xaxisPosition === 'top') {
                    y -= textConf.size * 1.5;
                } else {
                    y += textConf.size * 1.5;
                }
            }

            // The xaxisTitlePos property
            if (typeof properties.xaxisTitlePos === 'number') {
                if (properties.xaxisPosition === 'top') {
                    y = properties.marginTop * properties.xaxisTitlePos;
                } else {
                    y = obj.canvas.height - properties.marginBottom + (properties.marginBottom * properties.xaxisTitlePos);
                }
            }

            // Specific X and Y coordinates for the title
            if (typeof properties.xaxisTitleX === 'number') x = properties.xaxisTitleX;
            if (typeof properties.xaxisTitleY === 'number') y = properties.xaxisTitleY;


            RGraph.text({
              object: obj,
              textConfPrefix: 'xaxisTitle',
                x:      x,
                y:      y,
                text:   properties.xaxisTitle.toString(),
                valign: properties.xaxisPosition === 'top' ? (properties.xaxisTitleValign || 'bottom') : (properties.xaxisTitleValign || 'top'),
                halign: properties.xaxisTitleHalign || 'center',
                marker: false,
                tag:    'xaxis.title'
            });
        }
    };








    //
    // A common X axis drawing function that can be used by  the
    // Bar, HBar, Line, Scatter functions. A long time coming - but
    // this will eventually be joined by a common Y axis drawing
    // function.
    //
    //@param object obj The chart object. All the properties are
    //                  retrieved from this.
    //
    RGraph.drawYAxis = function (obj)
    {
        var properties      = obj.properties,
            context         = obj.context,
            isSketch        = obj.type === 'bar' && properties.variant === 'sketch';
            tickmarksLength = typeof properties.yaxisTickmarksLength === 'number' ? properties.yaxisTickmarksLength : 3;








        









        // If drawing a HBar or a Gantt chart then set the yaxisLabelsSpecific option
        if (obj.type === 'hbar') {
            properties.yaxisLabelsSpecific = properties.yaxisLabels;
        }
    
        // Calculate the X coordinate for the Y axis
        if ( (obj.type === 'hbar' || obj.type === 'gantt') && properties.yaxisPosition === 'left') {
            var x = obj.getXCoord(0);
            
            if (obj.type === 'hbar' && properties.xaxisScaleMin > 0 && properties.xaxisScaleMax > properties.xaxisScaleMin) {
                var x = obj.getXCoord(properties.xaxisScaleMin);
            }
            

        } else if ( (obj.type === 'hbar' || obj.type === 'gantt') && properties.yaxisPosition === 'right') {
            var x = obj.canvas.width - properties.marginRight;
        
        } else if (obj.type === 'drawing.yaxis') {
            var x = obj.x;
        
        } else {
            var x = properties.yaxisPosition === 'right' ? obj.canvas.width - properties.marginRight : (obj.type === 'hbar' ? obj.getXCoord(0) : properties.marginLeft);
        }

        //
        // Draw the Y axis
        //
        if (properties.yaxis) {

            // Draw the axis
            obj.path(
                'lc square lw % b m % % l % % s %',
                properties.yaxisLinewidth,
                x - (isSketch ? 5 : 0),     properties.marginTop - (isSketch ? 2 : 0),                
                x + (isSketch ? 7 : 0),     obj.canvas.height - properties.marginBottom  + (isSketch ? 2 : 0),
                properties.yaxisColor
            );




            // Draw the tickmarks for the Y axis if necessary
            if (!isSketch) {
                if (properties.yaxisTickmarks) {
    
                    if (typeof properties.yaxisTickmarksCount === 'number') {
                        var yaxisTickmarksCount = properties.yaxisTickmarksCount;

                    // Bar - get number of tickmarks from the number of data points
                    } else if (obj.type === 'bar') {
                        var yaxisTickmarksCount = properties.yaxisLabelsSpecific ? properties.yaxisLabelsSpecific.length - 1 : properties.yaxisLabelsCount;

                    // HBar - get number of tickmarks from the xaxisLabelsCount property and default to 5
                    } else if (obj.type === 'hbar') {
                        var yaxisTickmarksCount = obj.data.length || 5;
                    
                    // Line - get the number of tickmarks from the number of datapoints
                    } else if (obj.type === 'line') {
                        var yaxisTickmarksCount = properties.yaxisLabelsSpecific ? properties.yaxisLabelsSpecific.length - 1  : properties.yaxisLabelsCount;
                    
                    // Scatter - with a scale - get the number of tickmarks from the number of scale labels
                    } else if (obj.type === 'scatter') {
                        var yaxisTickmarksCount = properties.yaxisLabelsCount;
                    
                    // Waterfall - get the number of tickmarks from the number of datapoints
                    } else if (obj.type === 'waterfall') {
                        var yaxisTickmarksCount = properties.yaxisLabelsCount;
                        
                    //  Default to 5 tickmarks
                    } else {
                        yaxisTickmarksCount = 5;
                    }
                } else {
                    properties.yaxisTickmarksCount = 0;
                }

    
    
    

    
    
                // Determine the X start/end coordinates for the tickmarks
                if (properties.yaxisPosition === 'right') {
                    var tickmarksXStart = x;
                    var tickmarksXEnd   = x + tickmarksLength;
    
                //} else if (properties.yaxisPosition === 'center') {
                //    var tickmarksXStart = x - tickmarksLength;
                //    var tickmarksXEnd   = x + tickmarksLength;

                } else {
                    var tickmarksXStart = x;
                    var tickmarksXEnd   = x - tickmarksLength;
                }
    
                // Account for HBar offset axes
                if (obj.type === 'hbar' && properties.xaxisScaleMin < 0 && properties.xaxisScaleMax > 0) {
                    var tickmarksXStart = obj.getXCoord(0) - tickmarksLength;
                    var tickmarksXEnd   = obj.getXCoord(0) + tickmarksLength;
                }
    
    
                //
                // Now draw the tickmarks
                //
                for (var i=0; i<=yaxisTickmarksCount; ++i) {

                    // Don't draw the TOP tickmark if there's an X axis at the top or if specifically
                    // told not to
                    if (RGraph.isNullish(properties.yaxisTickmarksLastTop)) {
                        if (i === 0 && properties.xaxis && properties.xaxisPosition === 'top') {
                            continue;
                        }
                    } else if (i === 0 && !properties.yaxisTickmarksLastTop) {
                        continue;
                    }
                    
                    // Don't draw the BOTTOM tickmark if there's an X axis at the bottom or if specifically
                    // told not to
                    if (RGraph.isNullish(properties.yaxisTickmarksLastBottom)) {

                        if (i === yaxisTickmarksCount && properties.xaxis && properties.xaxisPosition === 'bottom') {
                            continue;
                        }
                    } else if (i === yaxisTickmarksCount && !properties.yaxisTickmarksLastBottom) {
                        continue;
                    }

                    var y           = (((obj.canvas.height - properties.marginTop - properties.marginBottom) / yaxisTickmarksCount) * i) + properties.marginTop;
                    
                    if (obj.getYCoord) {
                        var xaxisYCoord = obj.getYCoord(0);
                    } else if (obj.getXCoord) {
                        var xaxisYCoord = obj.getXCoord(0);
                    } else {
                        var xaxisYCoord = obj.marginTop;
                    }

                    if (    properties.xaxis
                        && (properties.xaxisPosition === 'center' || (properties.xaxisPosition === 'bottom' && properties.yaxisScaleMin < 0 && properties.yaxisScaleMax > 0))
                        && y > (xaxisYCoord - 1)
                        && y < (xaxisYCoord + 1)) {
                        continue;
                    }

                    obj.path(
                        'b m % % l % % s %',
                        tickmarksXStart, y,
                        tickmarksXEnd,   y,
                        properties.yaxisColor
                    );
                    
                    // if the X axis is offset (eg -10,0,10,20,30,40) draw an extra
                    // tickmark at the bottom of the axes
                    if (properties.yaxisScaleMin < 0 && properties.yaxisScaleMax > 0) {
                        obj.path(
                            'b m % % l % % s %',
                            tickmarksXStart, obj.canvas.height - properties.marginBottom,
                            tickmarksXEnd,   obj.canvas.height - properties.marginBottom,
                            properties.yaxisColor
                        );
                    }

                    // if the chart is:
                    // o A Scatter chart
                    // o X axis is in the center
                    // o The scale is inverted
                    if (obj.type === 'scatter' && properties.xaxisPosition === 'center' && properties.yaxisScaleInvert) {
                        obj.path(
                            'b m % % l % % s %',
                            tickmarksXStart,   properties.marginTop,
                            tickmarksXEnd,     properties.marginTop,
                            properties.yaxisColor
                        );
                    }
                } // END for loop thru yaxisTickmarksCount
            } // END if (!isSketch)
        }








        //
        // The text angle - this does not apply to the Y axis so these
        // are just the alignments
        //
        var valign =  'center',
            halign =  'right',
            angle  = 0;
        
        
        


        //
        // Draw a Y axis scale.
        //
        if (properties.yaxisScale && !properties.yaxisLabelsSpecific) {
            if (obj.type === 'drawing.yaxis') {
                if (properties.yaxisScale) {

                    obj.scale2 = RGraph.getScale({object: obj, options: {
                        'scale.max':          properties.yaxisScaleMax,
                        'scale.min':          properties.yaxisScaleMin,
                        'scale.decimals':     Number(properties.yaxisScaleDecimals),
                        'scale.point':        properties.yaxisScalePoint,
                        'scale.thousand':     properties.yaxisScaleThousand,
                        'scale.round':        properties.yaxisScaleRound,
                        'scale.units.pre':    properties.yaxisScaleUnitsPre,
                        'scale.units.post':   properties.yaxisScaleUnitsPost,
                        'scale.labels.count': properties.yaxisScaleLabelsCount,
                        'scale.strict':       true
                     }});

                    for (var i=0; i<=properties.yaxisScaleLabelsCount; ++i) {
                    
                        var original = (((properties.yaxisScaleMax - properties.yaxisScaleMin) / properties.yaxisScaleLabelsCount) * i) + properties.yaxisScaleMin;
                        var hmargin  = properties.marginInner;
                    
                        if (typeof properties.yaxisScaleFormatter === 'function') {
                            var text =  (properties.yaxisScaleFormatter)(this, original)
                        } else {
                    
                            text = RGraph.numberFormat({
                                object:    obj,
                                number:    original.toFixed(original === 0 ? 0 : properties.yaxisScaleDecimals),
                                unitspre:  properties.yaxisScaleUnitsPre,
                                unitspost: properties.yaxisScaleUnitsPost,
                                point:     properties.yaxisScalePoint,
                                thousand:  properties.yaxisScaleThousand
                            });
                        }
                    }
                }
            }

            var scale           = obj.scale2;
            obj.maxLabelLength = Math.max(
                obj.maxLabelLength,
                obj.context.measureText(obj.scale2.labels[4]).width// * 2 // Don't know why this was doubled...?
            );


            //
            // X axis position in the center
            //
            if (properties.xaxisPosition === 'center') {
            
                var halfHeight = ((obj.canvas.height - properties.marginTop - properties.marginBottom) / 2);
                
                // Draw the top halves labels
                for (var i=0; i<scale.labels.length; ++i) {

                    var section = (obj.canvas.height - properties.marginTop - properties.marginBottom) / (scale.labels.length * 2);
                    var y       = properties.marginTop + (section * i);

                    RGraph.text({
                      object:   obj,
              textConfPrefix:   'yaxisLabels',
                        x:      properties.yaxisPosition === 'right' ? x + (properties.yaxisTickmarksLength || 0) + properties.yaxisLabelsOffsetx + 5 : x - (properties.yaxisTickmarksLength || 0) + properties.yaxisLabelsOffsetx - 5,
                        y:      properties.yaxisScaleInvert ? halfHeight + properties.marginTop - (section * i) + properties.yaxisLabelsOffsety : properties.marginTop + (section * i) + properties.yaxisLabelsOffsety,
                        text:   String(scale.labels[scale.labels.length - 1 - i]),
                        valign: typeof properties.yaxisLabelsValign === 'string' ? properties.yaxisLabelsValign : valign,
                        halign: typeof properties.yaxisLabelsHalign === 'string' ? properties.yaxisLabelsHalign : (properties.yaxisPosition === 'right' ? 'left' : halign),
                        marker: false,
                        angle:  angle,
                        tag:    'yaxis.labels'
                    });
                }

                // Draw the bottom half
                for (var i=0; i<scale.labels.length; ++i) {
                
                    if (i === 0 && properties.yaxisScaleInvert) continue;

                    var section = (obj.canvas.height - properties.marginTop - properties.marginBottom) / (scale.labels.length * 2);
                    var y       = properties.marginTop + ((obj.canvas.height - properties.marginTop - properties.marginBottom) / 2) + (section * i) + section;
    
                    RGraph.text({
                      object:   obj,
              textConfPrefix:   'yaxisLabels',
                        x:      properties.yaxisPosition === 'right' ? x + (properties.yaxisTickmarksLength || 0) + properties.yaxisLabelsOffsetx + 5 : x - (properties.yaxisTickmarksLength || 0) + properties.yaxisLabelsOffsetx - 5,
                        y:      properties.yaxisScaleInvert ? halfHeight + properties.marginTop + (section * i) : y + properties.yaxisLabelsOffsety,
                        text:   '-' + (properties.yaxisScaleInvert ? String(scale.labels[scale.labels.length - i - 1]) : String(scale.labels[i])),
                        valign: typeof properties.yaxisLabelsValign === 'string' ? properties.yaxisLabelsValign : valign,
                        halign: typeof properties.yaxisLabelsHalign === 'string' ? properties.yaxisLabelsHalign : (properties.yaxisPosition === 'right' ? 'left' : halign),
                        marker: false,
                        angle:  angle,
                        tag:    'yaxis.labels'
                    });
                }


                //
                // Draw the zero label
                //
                RGraph.text({
                  object:   obj,
          textConfPrefix:   'yaxisLabels',
                    x:      properties.yaxisPosition === 'right' ? x + 5 + (properties.yaxisTickmarksLength || 0) + properties.yaxisLabelsOffsetx : x - 5 - (properties.yaxisTickmarksLength || 0) + properties.yaxisLabelsOffsetx,
                    y:      properties.yaxisScaleInvert ? properties.marginTop + properties.yaxisLabelsOffsety : properties.marginTop + ((obj.canvas.height - properties.marginBottom - properties.marginTop) / 2) + properties.yaxisLabelsOffsety,
                    text:   typeof properties.yaxisScaleFormatter === 'function' ? (properties.yaxisScaleFormatter)({object: this,number: 0,unitspre: properties.yaxisScaleUnitsPre,unitspost: properties.yaxisScaleUnitsPost,point: properties.yaxisScalePoint,thousand: properties.yaxisScaleThousand,formatter: properties.yaxisScaleFormatter}) : (properties.yaxisScaleUnitsPre || '') + properties.yaxisScaleMin.toFixed(properties.yaxisScaleDecimals).replace(/\./, properties.yaxisScalePoint) + (properties.yaxisScaleUnitsPost || ''),
                    valign: typeof properties.yaxisLabelsValign === 'string' ? properties.yaxisLabelsValign : valign,
                    halign: typeof properties.yaxisLabelsHalign === 'string' ? properties.yaxisLabelsHalign : (properties.yaxisPosition === 'right' ? 'left' : halign),
                    marker: false,
                    angle:  angle,
                    tag:    'yaxis.labels'
                });
                

                //
                // Draw the zero label for the bottom half if the scale is inverted
                //
                if (properties.yaxisScaleInvert) {
                    RGraph.text({
                      object:   obj,
              textConfPrefix:   'yaxisLabels',
                        x:      properties.yaxisPosition === 'right' ? x + 5 + (properties.yaxisTickmarksLength || 0) + properties.yaxisLabelsOffsetx : x - 5 - (properties.yaxisTickmarksLength || 0) + properties.yaxisLabelsOffsetx,
                        y:      obj.canvas.height - properties.marginBottom + properties.yaxisLabelsOffsety,
                        text:   typeof properties.yaxisScaleFormatter === 'function' ? (properties.yaxisScaleFormatter)({object: this,number: 0,unitspre: properties.yaxisScaleUnitsPre,unitspost: properties.yaxisScaleUnitsPost,point: properties.yaxisScalePoint,thousand: properties.yaxisScaleThousand,formatter: properties.yaxisScaleFormatter}) : (properties.yaxisScaleUnitsPre || '') + properties.yaxisScaleMin.toFixed(properties.yaxisScaleDecimals).replace(/\./, properties.yaxisScalePoint) + (properties.yaxisScaleUnitsPost || ''),
                        valign: typeof properties.yaxisLabelsValign === 'string' ? properties.yaxisLabelsValign : valign,
                        halign: typeof properties.yaxisLabelsHalign === 'string' ? properties.yaxisLabelsHalign : (properties.yaxisPosition === 'right' ? 'left' : halign),
                        marker: false,
                        angle:  angle,
                        tag:    'yaxis.labels'
                    });
                }

            //
            // X axis at the top
            //
            } else if (properties.xaxisPosition === 'top') {
                for (var i=0; i<scale.labels.length; ++i) {
            
                    var section = (obj.canvas.height - properties.marginTop - properties.marginBottom) / scale.labels.length;
                    
                    // Account for inverting the scale
                    if (properties.yaxisScaleInvert) {
                        var y = obj.canvas.height - properties.marginBottom - (section * i) - section - section;
                    } else {
                        var y = properties.marginTop + (section * i);
                    }
            
                    RGraph.text({
                      object:   obj,
              textConfPrefix:   'yaxisLabels',
                        x:      properties.yaxisPosition === 'right' ? x + (properties.yaxisTickmarksLength || 0) + properties.yaxisLabelsOffsetx + 5 : x - (properties.yaxisTickmarksLength || 0) + properties.yaxisLabelsOffsetx - 5,
                        y:      y + section + properties.yaxisLabelsOffsety,
                        text:   '-' + String(scale.labels[i]),
                        valign: typeof properties.yaxisLabelsValign === 'string' ? properties.yaxisLabelsValign : valign,
                        halign: typeof properties.yaxisLabelsHalign === 'string' ? properties.yaxisLabelsHalign : (properties.yaxisPosition === 'right' ? 'left' : halign),
                        marker: false,
                        angle:  angle,
                        tag:    'yaxis.labels'
                    });
                }
                    
                    
            
                //
                // Draw the zero label
                //

                RGraph.text({
                  object:   obj,
            textConfPrefix:   'yaxisLabels',
                    x:      properties.yaxisPosition === 'right' ? x + 5 + (properties.yaxisTickmarksLength || 0) + properties.yaxisLabelsOffsetx : x - 5 - (properties.yaxisTickmarksLength || 0) + properties.yaxisLabelsOffsetx,
                    y:      properties.yaxisScaleInvert ? obj.canvas.height - properties.marginBottom + properties.yaxisLabelsOffsety : properties.marginTop + properties.yaxisLabelsOffsety,
                    text:   typeof properties.yaxisScaleFormatter === 'function' ? (properties.yaxisScaleFormatter)({object: this,number: 0,unitspre: properties.yaxisScaleUnitsPre,unitspost: properties.yaxisScaleUnitsPost,point: properties.yaxisScalePoint,thousand: properties.yaxisScaleThousand,formatter: properties.yaxisScaleFormatter}) : (properties.yaxisScaleUnitsPre || '') + properties.yaxisScaleMin.toFixed(properties.yaxisScaleDecimals).replace(/\./, properties.yaxisScalePoint) + (properties.yaxisScaleUnitsPost || ''),
                    valign: typeof properties.yaxisLabelsValign === 'string' ? properties.yaxisLabelsValign : valign,
                    halign: typeof properties.yaxisLabelsHalign === 'string' ? properties.yaxisLabelsHalign : (properties.yaxisPosition === 'right' ? 'left' : halign),
                    marker: false,
                    angle:  angle,
                    tag:    'yaxis.labels'
                });
            //
            // X axis position at the bottom
            //
            } else {
                for (var i=0; i<scale.labels.length; ++i) {

                    var section = (obj.canvas.height - properties.marginTop - properties.marginBottom) / scale.labels.length;
                    var y       = properties.marginTop + (section * (i + (properties.yaxisScaleInvert ? 1 : 0)) );
    
                    RGraph.text({
                      object:   obj,
              textConfPrefix:   'yaxisLabels',
                        x:      properties.yaxisPosition === 'right' ? x + (properties.yaxisTickmarksLength || 0) + properties.yaxisLabelsOffsetx + 5 : x - (properties.yaxisTickmarksLength || 0) + properties.yaxisLabelsOffsetx - 5,
                        y:      y + properties.yaxisLabelsOffsety,
                        text:   String(properties.yaxisScaleInvert ? scale.labels[i] : scale.labels[scale.labels.length - 1 - i]),
                        valign: typeof properties.yaxisLabelsValign === 'string' ? properties.yaxisLabelsValign : valign,
                        halign: typeof properties.yaxisLabelsHalign === 'string' ? properties.yaxisLabelsHalign : (properties.yaxisPosition === 'right' ? 'left' : halign),
                        marker: false,
                        angle:  angle,
                        tag:    'yaxis.labels'
                    });
                }
                    
                    

                var zerolabel = RGraph.numberFormat({
                    object:    obj,
                    number:    properties.yaxisScaleMin.toFixed(properties.yaxisScaleDecimals),
                    unitspre:  properties.yaxisScaleUnitsPre,
                    unitspost: properties.yaxisScaleUnitsPost,
                    point:     properties.yaxisScalePoint,
                    thousand:  properties.yaxisScaleThousand
                });

                //
                // Draw the zero label
                //
                RGraph.text({
                  object:   obj,
          textConfPrefix:   'yaxisLabels',
                    x:      properties.yaxisPosition === 'right' ? x + 5 + (properties.yaxisTickmarksLength || 0) + properties.yaxisLabelsOffsetx : x - 5 - (properties.yaxisTickmarksLength || 0) + properties.yaxisLabelsOffsetx,
                    y:      properties.yaxisScaleInvert ? properties.marginTop : obj.canvas.height - properties.marginBottom + properties.yaxisLabelsOffsety,
                    text:   typeof properties.yaxisScaleFormatter === 'function'
                                ? (properties.yaxisScaleFormatter)({object: this,number: 0,unitspre: properties.yaxisScaleUnitsPre,unitspost: properties.yaxisScaleUnitsPost,point: properties.yaxisScalePoint,thousand: properties.yaxisScaleThousand,formatter: properties.yaxisScaleFormatter})
                                : zerolabel,
                    valign: typeof properties.yaxisLabelsValign === 'string' ? properties.yaxisLabelsValign : valign,
                    halign: typeof properties.yaxisLabelsHalign === 'string' ? properties.yaxisLabelsHalign : (properties.yaxisPosition === 'right' ? 'left' : halign),
                    marker: false,
                    angle:  angle,
                    tag:    'yaxis.labels'
                });
            }
        
        //
        // Draw labels instead of a scale
        //
        } else if (properties.yaxisLabelsSpecific && properties.yaxisLabelsSpecific.length && (properties.yaxisLabelsPosition === 'section' || properties.yaxisLabelsPosition === 'edge') ) {

            var section        = (obj.canvas.height - properties.marginTop - properties.marginBottom) / (properties.yaxisLabelsSpecific.length - (properties.yaxisLabelsPosition === 'section' ? 0 : 1));
            obj.maxLabelLength = 0;

            for (var i=0; i<properties.yaxisLabelsSpecific.length; ++i) {

                var y = properties.marginTop  + (section * i) + (properties.yaxisLabelsPosition === 'section' ? section / 2 : 0);

                var ret = RGraph.text({
                  object:   obj,
          textConfPrefix:   'yaxisLabels',
                    x:      obj.type === 'drawing.yaxis'
                                ? (properties.yaxisPosition === 'right' ? obj.x + 7 + properties.yaxisLabelsOffsetx : obj.x - 5 + properties.yaxisLabelsOffsetx)
                                : (properties.yaxisPosition === 'right' ? x + properties.yaxisLabelsOffsetx + 5 : properties.marginLeft - 5 + properties.yaxisLabelsOffsetx),
                    y:      y + properties.yaxisLabelsOffsety,
                    text:   String(properties.yaxisLabelsSpecific[i] || ''),
                    valign: typeof properties.yaxisLabelsValign === 'string' ? properties.yaxisLabelsValign : 'center',
                    halign: typeof properties.yaxisLabelsHalign === 'string' ? properties.yaxisLabelsHalign : (properties.yaxisPosition === 'right' ? 'left' : 'right'),
                    marker: false,
                    tag:    'yaxis.labels',
               cssClass:    RGraph.getLabelsCSSClassName({
                                object: obj,
                                  name: 'yaxisLabelsClass',
                                 index: i
                              })
                });

                obj.maxLabelLength = Math.max(
                    obj.maxLabelLength,
                    obj.context.measureText(String(properties.yaxisLabelsSpecific[i])).width * 2
                );
            }
        }













        //
        // Draw the title
        //
        if (properties.yaxisTitle) {

            //
            // Get the text width of the labels so that the position of the title
            // can be adjusted
            //
            if (obj.type === 'gantt') {
                for (var i=0, maxLabelLength=0; i<properties.yaxisLabels.length;++i) {
                
                    var textConf = RGraph.getTextConf({
                        object: obj,
                        prefix: 'yaxisLabels'
                    });

                    maxLabelLength = Math.max(maxLabelLength, RGraph.measureText(
                        properties.yaxisLabels[i],
                        textConf.bold,
                        textConf.font,
                        textConf.size
                    )[0]);
                }
            } else if (obj.scale2 && obj.scale2.labels) {

                var textConf = RGraph.getTextConf({
                    object: obj,
                    prefix: 'yaxisLabels'
                });

                var maxLabelLength = RGraph.measureText(
                    obj.scale2.labels[obj.scale2.labels.length - 1],
                    textConf.bold,
                    textConf.font,
                    textConf.size
                )[0];
            }


            // If the chart is an HBar chart then the maximum length of the labels
            // needs to be calculated so that the title doesn't overlap them
            if (
                    (obj.type === 'hbar' && properties.yaxisLabels && properties.yaxisLabels.length)
                 || (obj.type === 'drawing.yaxis' && properties.yaxisLabelsSpecific && properties.yaxisLabelsSpecific.length)
               ) {
                maxLabelLength = (function (labels)
                {
                    var textConf = RGraph.getTextConf({
                        object: obj,
                        prefix: 'yaxisLabels'
                    });

                    for (var i=0,max=0; i<labels.length; ++i) {
                        var dim = RGraph.measureText(
                            labels[i],
                            textConf.bold,
                            textConf.font,
                            textConf.size
                        );
                        max = Math.max(max, dim[0]);
                    }

                    return max;
                })(obj.type === 'drawing.yaxis' ? properties.yaxisLabelsSpecific : properties.yaxisLabels);
            }

            var x = properties.yaxisPosition === 'right' ? (obj.canvas.width - properties.marginRight) + 5 + maxLabelLength + 10 : properties.marginLeft - 5 - maxLabelLength - 10;
            var y = ((obj.canvas.height - properties.marginTop - properties.marginBottom) / 2) + properties.marginTop;
            
            if (obj.type === 'drawing.yaxis') {
                var x = properties.yaxisPosition === 'right'
                            ? obj.x + 5 + maxLabelLength + 10
                            : obj.x - 5 - maxLabelLength - 10;
            }


            // The yaxisTitlePos property
            if (typeof properties.yaxisTitlePos === 'number') {
                if (properties.yaxisPosition === 'right') {
                    x = obj.canvas.width - (properties.marginRight * properties.yaxisTitlePos);
                } else {
                    x = properties.marginLeft * properties.yaxisTitlePos;
                }
            }

            // Specific X and Y coordinates for the title
            if (typeof properties.yaxisTitleOffsetx === 'number') x += properties.yaxisTitleOffsetx;
            if (typeof properties.yaxisTitleOffsety === 'number') y += properties.yaxisTitleOffsety;

            // Specific X and Y coordinates for the title
            if (typeof properties.yaxisTitleX === 'number') x = properties.yaxisTitleX;
            if (typeof properties.yaxisTitleY === 'number') y = properties.yaxisTitleY;



            RGraph.text({
              object:       obj,
            textConfPrefix: 'yaxisTitle',
                x:          x,
                y:          y,
                text:       properties.yaxisTitle.toString(),
                valign:     properties.yaxisTitleValign || 'bottom',
                halign:     properties.yaxisTitleHalign || 'center',
                marker:     false,
                accessible: typeof properties.yaxisTitleAccessible === 'boolean' ? properties.yaxisTitleAccessible : undefined,
                angle:      -45,
                angle:      properties.yaxisPosition === 'right' ? 90 : -90,
                tag:        'yaxis.title'
            });
        }
    };








    //
    // Returns the CSS className for labels
    //
    // @param object object The RGraph object
    // @param string name   The name of the property you wish to set
    //
    RGraph.getLabelsCSSClassName = function ()
    {
        var args       = RGraph.getArgs(arguments, 'object,name,index');
        var properties = args.object.properties;
        var value      = '';

        if (typeof properties[args.name] === 'string') {
            value = properties[args.name];
        } else {
            if (typeof properties[args.name] === 'object' && typeof properties[args.name][args.index] === 'string') {
                value = properties[args.name][args.index];
            }
        }

        return value;
    };








    //
    // This function sets CSS styles on a DOM element
    //
    // @param element    mixed  This can either be a string or a DOM
    //                          object
    // @param properties object This should be an object map of
    //                          the CSS properties to set.
    //                          JavaScript property names should
    //                          be used.
    //
    RGraph.setCSS = function (element, properties)
    {
        if (typeof element === 'string') {
            element = document.getElementById(element);
        }

        for (i in properties) {
            if (typeof i === 'string') {
                element.style[i] = properties[i];
            }
        }
    };








    //
    // Label substitution. This allows you to use dynamic
    // labels if you want like this:
    //
    // ...
    // names: ['Richard','Jerry','Lucy'],
    // xaxisLabels: '%{names:[%{index}]}: %{value_formatted}'
    // ...
    //
    //@param object args This can be an object which contains the
    //                   following things:
    //                           args.text      The text on which to perform the substitution on
    //                                          (ie the original label)
    //                           args.object    The chart object
    //                           args.index     The index of the label
    //                           args.value     The value of the data point
    //                           args.decimals  The number of decimals
    //                           args.point     The decimal character
    //                           args.thousand  The thousand separator
    //                           args.unitsPre  The units that are prepended to the number
    //                           args.unitsPost The units that are appended to the number
    //                          
    //
    RGraph.labelSubstitution = function (args)
    {
        //////////////////////
        // Must be a string //
        //////////////////////
        if (RGraph.isNullish(args.text)) {
            return args.text;
        }
        var text = String(args.text);

          /////////////////////////////////////////////////////////////////
         // If there's no template tokens in the string simply reurn it //
        /////////////////////////////////////////////////////////////////
        if (!text.match(/%{.*?}/)) {
            return text;
        }

          //////////////////////////////////////////
         // This allows for escaping the percent //
        //////////////////////////////////////////
        var text = text.replace(/%%/g, '___--PERCENT--___');





          ////////////////////////////////////
         // Replace the index of the label //
        ////////////////////////////////////
        text = text.replace(/%{index}/g, args.index);



        ///////////////////////////////////////////////////////
        // Do property substitution when there's an index to //
        // the property                                      //
        ///////////////////////////////////////////////////////
        var reg = /%{prop(?:erty)?:([_a-z0-9]+)\[([0-9]+)\]}/i;

        while (text.match(reg)) {

            var property = RegExp.$1,
                index    = parseInt(RegExp.$2);

            if (args.object.properties[property]) {
                text = text.replace(
                    reg,
                    args.object.properties[property][index] || ''
                );

            // Get rid of the text if there was nothing to replace the template bit with
            } else {
                text = text.replace(reg,'');
            }
                
            RegExp.lastIndex = null;
        }


          ////////////////////////////////////
         // Replace this: %{property:xxx}% //
        ////////////////////////////////////
        while (text.match(/%{property:([_a-z0-9]+)}/i)) {
            var str = '%{property:' + RegExp.$1 + '}';
            text    = text.replace(str, args.object.properties[RegExp.$1]);
        }



         ////////////////////////////////
        // Replace this: %{prop:xxx}% //
        ///////////////////////////////
        while (text.match(/%{prop:([_a-z0-9]+)}/i)) {
            var str = '%{prop:' + RegExp.$1 + '}';
            text    = text.replace(str, args.object.properties[RegExp.$1]);
        }



          /////////////////////////////////////////////////////////
         // Replace this: %{value} and this: %{value_formatted} //
        ////////////////////////////////////////////////////////
        while (text.match(/%{value(?:_formatted)?}/i)) {
            
            var value = args.value;

            if (text.match(/%{value_formatted}/i)) {
                text = text.replace(
                    '%{value_formatted}',
                    typeof value === 'number' ? RGraph.numberFormat({
                        object:    args.object,
                        number:    value.toFixed(args.decimals),
                        thousand:  args.thousand  || ',',
                        point:     args.point     || '.',
                        unitspre:  args.unitsPre  || '',
                        unitspost: args.unitsPost || ''
                    }) : null
                );
            } else {
                text = text.replace('%{value}', value);
            }
        }
















          ////////////////////////////////////////////////////////////////
         // Do global substitution when there's an index to the global //
        ////////////////////////////////////////////////////////////////
        var reg = /%{global:([_a-z0-9.]+)\[([0-9]+)\]}/i;

        while (text.match(reg)) {

            var name  = RegExp.$1,
                index = parseInt(RegExp.$2);

            if (eval(name)[index]) {
                text = text.replace(
                    reg,
                    eval(name)[index] || ''
                );

            // Get rid of the text if there was nothing to replace the template bit with
            } else {
                text = text.replace(reg,'');
            }
                
            RegExp.lastIndex = null;
        }
















          //////////////////////////////////////////////////
         // Do global substitution when there's no index //
        //////////////////////////////////////////////////
        var reg = /%{global:([_a-z0-9.]+)}/i;

        while (text.match(reg)) {

            var name = RegExp.$1;

            if (eval(name)) {
                text = text.replace(
                    reg,
                    eval(name) || ''
                );

            // Get rid of the text if there was nothing to replace the template bit with
            } else {
                text = text.replace(reg,'');
            }
                
            RegExp.lastIndex = null;
        }
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        



        ///////////////////////////////////
        // And lastly - call any functions
        // MUST be last
        //////////////////////////////////
        var regexp = /%{function:([_A-Za-z0-9]+)\((.*?)\)}/;
        
        // Temporarily replace carriage returns and line feeds with CR and LF
        // so the the s option is not needed
        text = text.replace(/\r/,'|CR|');
        text = text.replace(/\n/,'|LF|');

        while (text.match(regexp)) {

            var str  = RegExp.$1 + '(' + RegExp.$2 + ')';
            
            for (var i=0,len=str.length; i<len; ++i) {
                str  = str.replace(/\r?\n/, "\\n");
            }
            
            RGraph.Registry.set('label-templates-function-object', args.object);
            RGraph.Registry.set('key-label-templates-function-object', args.object);

            var func = new Function ('return ' + str);
            var ret  = func();

            text = text.replace(regexp, ret)
        }







        // Replace line returns with br tags
        text = text.replace(/\r?\n/g, '<br />');
        text = text.replace(/___--PERCENT--___/g, '%')

        // Replace CR and LF with the relevant character
        text = text.replace(/\|CR\|/, '\r');
        text = text.replace(/\|LF\|/, '\n');


        return text.toString();
    };








    //
    // This splits a basic comma separated value string
    // into JSON.
    //
    // @param  string str The string to split
    // @return object     The resulting JSON object
    //
    RGraph.splitString = function (str)
    {
        var re = new RegExp('(["\'a-z0-9]+) *= *', 'ig');
        str = str.replace(re, '"$1":');

        str = str.replace(/""/g, '"');
        str = str.replace(/''/g, '"');
        str = str.replace(/:'/g, ':"');
        str = str.replace(/' *,/g, '",');
        str = str.trim().replace(/,$/, '');

        var ret = JSON.parse('{' + str + '}');

        return ret;
    };








    //
    // A set of functions which help you get data from the GET
    // string (the query string).
    //
    RGraph.GET.raw = function ()
    {
        return location.search;
    };








    RGraph.GET.parse = function ()
    {
        if (!RGraph.isNullish(RGraph.GET.__parts__)) {
            return RGraph.GET.__parts__;
        }

        var raw   = RGraph.GET.raw().replace(/^\?/, '');
        var parts = raw.split(/\&/);
        
        // Loop thru each part splitting it
        for (var i=0; i<parts.length; ++i) {
            var tmp = parts[i].split('=');

            parts[tmp[0]] = decodeURI(tmp[1]);
        }
        
        // Store the parsed query-string
        RGraph.GET.__parts__ = parts;
        
        return parts;
    };








    //
    // Get a string of text from the query string. No special
    // processing is done here.
    //
    // @param string key The part to get
    //
    RGraph.GET.text =
    RGraph.GET.string = function (key)
    {
        var parts = RGraph.GET.parse();
        
        if (!parts[key]) {
            return null;
        }

        return String(parts[key]);
    };








    //
    //  This fetches a number from the query string. It
    // trims leading zeros and reurns a number (not a
    // string).
    //
    // @param string key The part to get 
    //
    RGraph.GET.number = function (key)
    {
        var parts = RGraph.GET.parse();
        
        if (!parts[key]) {
            return null;
        }

        return Number(parts[key]);
    };








    //
    // Fetches a JSON object from the query string. It must be
    // valid JSON and is an easy way to pass multiple values
    //using the query string. For example:
    //
    // /foo.html?json={"data":[4,8,6],"labels":["John","Luis","Bob"]}
    // 
    // @param string key The part to get
    //
    RGraph.GET.json =
    RGraph.GET.object = function (key)
    {
        var parts = RGraph.GET.parse();
        
        if (!parts[key]) {
            return null;
        }

        return JSON.parse(parts[key]);
    };








    //
    // This allows you to easily pass a  list of numbers over the
    // query string. For example:
    //
    // /test.html?data=5,8,6,3,5,4,6
    //
    // @param string key      The part to get
    // @param string OPTIONAL The seperator to use (defaults to a
    //                        comma)
    //
    RGraph.GET.list  =
    RGraph.GET.array = function (key)
    {
        var parts = RGraph.GET.parse();
        
        if (!parts[key]) {
            return null;
        }
        
        
        if (!arguments[1]) {
            var sep = ',';
        } else {
            var sep = arguments[1];
        }
        
        var arr = parts[key].split(sep);
        
        // Remove any starting or trailing square brackets
        arr[0] = arr[0].replace(/^\[/, '');
        arr[arr.length - 1] = arr[arr.length - 1].replace(/\]$/, '');

        // Convert strings to numbers
        for (var i=0; i<arr.length; ++i) {
            
            // Get rid of surrounding quotes
            arr[i] = arr[i].replace(/^('|")/,'');
            arr[i] = arr[i].replace(/('|")$/,'');

            if (Number(arr[i])) {
                arr[i] = Number(arr[i]);
            }
        }

        return arr;
    };








    //
    // Start clipping the canvas. You can give various
    // different arguments to the function in order to
    // clip the canvas to suit your needs See the API
    // documentation for examples of all possibilities:
    //
    //      https://www.rgraph.net/canvas/api.html
    //
    // @param object obj        The chart object
    // @param mixed  dimensions The dimensions to clip to
    //
    RGraph.clipTo = {};
    RGraph.clipTo.start = function ()
    {
        var args = RGraph.getArgs(arguments, 'object,dimensions');
        RGraph.clipTo.object = args.object;

        // Record the state of the antialiasing flag so that it can
        // be reset to this when the RGraph.clipTo.end() function
        // is called.
        RGraph.clipTo.__rgraph_aa_translated__ = args.object.canvas.__rgraph_aa_translated__ ;

        if (RGraph.isString(args.dimensions)) {

            if (args.dimensions === 'lefthalf') {

                var graphWidth = (args.object.canvas.width - args.object.properties.marginLeft - args.object.properties.marginRight);

                args.object.path(
                    'sa b r % % % % cl',
                    0,
                    0,
                    args.object.properties.marginLeft + (graphWidth / 2),
                    args.object.canvas.height
                );
            
            } else if (args.dimensions === 'righthalf') {

                var graphWidth = (args.object.canvas.width - args.object.properties.marginLeft - args.object.properties.marginRight);

                args.object.path(
                    'sa b r % % % % cl',
                    (graphWidth / 2) + args.object.properties.marginLeft,
                    0,
                    (graphWidth / 2) + args.object.properties.marginRight,
                    args.object.canvas.height
                );



            //
            // Clip to the top part of the chart whilst taking
            // into account the margins. So you can have different
            // margin sizes and still clip to the top part of
            // the chart
            //
            } else if (args.dimensions === 'tophalf') {

                var graphHeight = args.object.canvas.height - args.object.properties.marginTop - args.object.properties.marginBottom;

                args.object.path(
                    'sa b r % % % % cl',
                    0,
                    0,
                    args.object.canvas.width,
                    args.object.properties.marginTop + (graphHeight / 2)
                );





            //
            // Clip to the bottom part of the chart whilst taking
            // into account the margins. So you have different
            // margin sizes and still clip to the bottom part of
            // the chart
            //
            } else if (args.dimensions === 'bottomhalf') {

                var graphHeight = args.object.canvas.height - args.object.properties.marginTop - args.object.properties.marginBottom;

                args.object.path(
                    'sa b r % % % % cl',
                    0,
                    (graphHeight / 2) + args.object.properties.marginTop,
                    args.object.canvas.width,
                    (graphHeight / 2) + args.object.properties.marginBottom
                );



            // Clip to horizontal percentages
            } else if (args.dimensions.match(/^x:([-.0-9minax]+)%?-([.0-9minax]+)%?$/i)) {


                // Accommodate the min/max keywords
                var from = RegExp.$1,
                    to   = RegExp.$2;

                from = from.replace(/min/, '-200');
                from = from.replace(/max/, '200');
                to   = to.replace(/min/, '-200');
                to   = to.replace(/max/, '200');

                from   = Number(from);
                to     = Number(to);

                var width = ((to - from)  / 100) * (args.object.canvas.width - args.object.properties.marginLeft - args.object.properties.marginRight),
                    height = args.object.canvas.height,
                    x      = (from  / 100) * (args.object.canvas.width - args.object.properties.marginLeft - args.object.properties.marginRight) + args.object.properties.marginLeft,
                    y      = 0;

                    args.object.path(
                        'sa b r % % % % cl',
                        x,y,width,height
                    );
            
            
            // Clip to vertical percentages
            } else if (args.dimensions.match(/^y:([-.0-9minax]+)%?-([.0-9minax]+)%?/i)) {
    
                // Accommodate the min/max keywords
                var from = RegExp.$1,
                    to   = RegExp.$2;

                from = from.replace(/min/, '-200');
                from = from.replace(/max/, '200');
                to   = to.replace(/min/, '-200');
                to   = to.replace(/max/, '200');

                from   = Number(from);
                to     = Number(to);

                var height = args.object.canvas.height - args.object.properties.marginTop - args.object.properties.marginBottom,
                    x      = 0,
                    y      = (from / 100) * height + args.object.properties.marginTop,
                    width  = args.object.canvas.width,
                    //y1     = ((to - from) / 100) * (args.object.canvas.height - args.object.properties.marginTop - args.object.properties.marginBottom),
                    y2     = (to / 100) * (args.object.canvas.height - args.object.properties.marginTop - args.object.properties.marginBottom),
                    y      = args.object.canvas.height - args.object.properties.marginBottom - y2,
                    height = (args.object.canvas.height - args.object.properties.marginTop - args.object.properties.marginBottom) * ( (to - from) / 100);
                
                args.object.path(
                    'sa ' + 'b r % % % %' + ' cl',
                    x,y,width,height
                );




            // Clip to radial percentages. This only works with
            // charts that have the centerx and centery properties
            } else if (args.dimensions.match(/^r:([-.0-9minax]+)%?-([.0-9minax]+)%?/i)) {

                // Accommodate the min/max keywords
                var from = RegExp.$1,
                    to   = RegExp.$2;

                from = from.replace(/min/, '0');
                from = from.replace(/max/, '2000');
                to   = to.replace(/min/, '0');
                to   = to.replace(/max/, '2000');

                from   = Number(from);
                to     = Number(to);

                // Get the radius, centerx and centery from the
                // object
                if (!RGraph.isNumber(args.object.centerx) || !RGraph.isNumber(args.object.centery) || !RGraph.isNumber(args.object.radius)) {
                    alert('[RGRAPH CLIPPING] To use the r: syntax the object (Type: {1}, ID: {2}, UID: {3}) must support the centerx, centery and radius properties.'.format(
                        args.object.type,
                        args.object.id,
                        args.object.uid
                    ));
                }

                var centerx = args.object.centerx,
                    centery = args.object.centery,
                    r1      = (from / 100) * args.object.radius,
                    r2      = (to / 100) * args.object.radius;

                args.object.path(
                    'sa ' + 'b    a % % % 0 6.29 false    a % % % 6.29 0 true    cl',
                    centerx, centery, r1,
                    centerx, centery, r2
                );
















            // Clip to a SEGMENT
            } else if (args.dimensions.match(/^(?:segment|arc): *([-.0-9degrad]+) *, *([-.0-9degrad]+) *, *([-.0-9degrad]+) *, *([-.0-9degrad]+) *, *([-.0-9degrad]+)$/i)) {
                
                var centerx = RegExp.$1,
                    centery = RegExp.$2,
                    radius  = RegExp.$3,
                    start   = RegExp.$4,
                    end     = RegExp.$5;

                // If radians has been stipulated then get rid of it
                start = start.replace(/rad$/, '');
                end   = end.replace(/rad$/, '');
                
                // Convert degrees to radians for the start angle
                if (start.match(/deg$/)) {
                    start = parseFloat(start);
                    start = start * (RGraph.PI / 180);
                }
                
                // Convert degrees to radians for the end angle
                if (end.match(/deg$/)) {
                    end = parseFloat(end);
                    end = end * (RGraph.PI / 180);
                }

                args.object.path(
                    'sa b    m % %    a % % % % % false  c  cl',
                    centerx, centery,
                    centerx, centery, radius, start - RGraph.HALFPI, end - RGraph.HALFPI
                );

















            // Clip to a CIRCLE
            } else if (args.dimensions.match(/^circle: *([-.0-9]+) *, *([-.0-9]+) *, *([-.0-9]+)$/i)) {
                
                var centerx = RegExp.$1,
                    centery = RegExp.$2,
                    radius  = RegExp.$3;

                args.object.path(
                    `sa b    a % % % 0 ${RGraph.TWOPI} false  s #ddd    cl`,
                    centerx, centery, radius,
                );















            //
            // Clip to scale values - since all of the
            // charts handle scales differently this is
            // handled by worker functions on each object
            //
            // IF YOU UPDATE THIS REGEXP THEN IT NEEDS TO BE
            // UPDATED FURTHER DOWN IN THE CODE TOO
            //
            } else if (args.dimensions.match(/^(?:scale:) *([-.0-9min]+) *- *([-.0-9max]+) *$/)) {

                if (args.object.clipToScaleWorker) {
                    args.object.clipToScaleWorker(args.object.properties.clip);
                } else {
                    console.log('The scale: clipping option isn\'t implemented for this chart type (' + args.object.type + ')');
                }


            // Clip to an RGraph path
            } else {
                args.object.path('sa');
                args.object.path(args.dimensions);
                args.object.path('cl');
            }
        
        // Clip to an array of coordinates eg:
        // [[0,0],[0,250],[600,250],[600,0]]
        } else if (RGraph.isArray(args.dimensions) && RGraph.isArray(args.dimensions[0])) {

            for (var i=0,path=[]; i<args.dimensions.length; ++i) {
                path.push('%1 %2 %3'.format(
                        i === 0 ? 'm' : 'l',
                        args.dimensions[i][0],
                        args.dimensions[i][1]
                    )
                );
            }

            // Save the path so it doesn't have to be rebuilt 
            // if/when it comes to testing it
            RGraph.clipTo.path = 'b ' + path.join(' ');

            // Build the string path
            path = 'sa ' + RGraph.clipTo.path + ' cl';

            // Run the path
            args.object.path(path);

        // Clip to a single-dimension array of x/y/width/height
        // (x/y/w/h) A rectangle in other words.
        } else if (RGraph.isArray(args.dimensions)) {
            args.object.path(
                'sa b r % % % % cl',
                args.dimensions[0],
                args.dimensions[1],
                args.dimensions[2],
                args.dimensions[3]
            );
        }
    };








    //
    // Ends clipping that has been started by the
    // RGraph.clipTo.start() function
    //
    RGraph.clipTo.end = function ()
    {
        if (RGraph.clipTo.object){
            // Reset the antialiasing flag to what it was when
            // we started
            RGraph.clipTo.object.canvas.__rgraph_aa_translated__ = RGraph.clipTo.__rgraph_aa_translated__;
    
            RGraph.path(RGraph.clipTo.object, 'rs');
        }
    };








    //
    // Test whether a point is within the clipped area or not
    //
    // @param  object  obj The chart object
    // @param  integer x   The X coordinate to test
    // @param  integer y   The Y coordinate to test
    // @return boolean     true/false whether the point is
    //                     within the path
    //
    RGraph.clipTo.test = function ()
    {
        var args = RGraph.getArgs(arguments, 'object,x,y');




        if (args.object.properties.clip) {
        
            var clip = args.object.properties.clip;

            // Test that the cursor is over the left half
            if (clip === 'lefthalf') {
                if (   args.x > 0
                    && args.x < (args.object.canvas.width / 2)
                    && args.y > 0
                    && args.y < args.object.canvas.height
                   ) {
                    return true;
                }




            // Test that the cursor is over the right half
            } else if (clip === 'righthalf') {
                if (   args.x > (args.object.canvas.width / 2)
                    && args.x < args.object.canvas.width
                    && args.y > 0
                    && args.y < args.object.canvas.height
                   ) {
                    return true;
                }




            // Test that the cursor is over the top half
            } else if (clip === 'tophalf') {
                if (   args.x > 0
                    && args.x < args.object.canvas.width
                    && args.y > 0
                    && args.y < (args.object.canvas.height / 2)
                   ) {
                    return true;
                }




            // Test that the cursor is over the bottom half
            } else if (clip === 'bottomhalf') {
                if (   args.x > 0
                    && args.x < args.object.canvas.width
                    && args.y > (args.object.canvas.height / 2)
                    && args.y < args.object.canvas.height
                   ) {
                    return true;
                }




            // Test that the cursor is within the clipped rect
            } else if (
                          RGraph.isArray(clip)
                       && RGraph.isNumber(clip[0])
                       && RGraph.isNumber(clip[1])
                       && RGraph.isNumber(clip[2])
                       && RGraph.isNumber(clip[3])
                      ) {

                if (   args.x > clip[0]
                    && args.x < (clip[0] + clip[2])
                    && args.y > clip[1]
                    && args.y < (clip[1] + clip[3])
                   ) {
                    return true;
                }









            // Test that the cursor is within the clipped path
            } else if (RGraph.isArray(clip) && RGraph.isArray(clip[0])) {

                args.object.path(RGraph.clipTo.path);
                return args.object.context.isPointInPath(args.x, args.y);




            // Test that the cursor is within the given X percentages range
            } else if (clip.match(/^x:([-.0-9minax]+)%?-([.0-9minax]+)%?$/i)) {
            
                // Accommodate the min/max keywords
                var from = RegExp.$1,
                    to   = RegExp.$2;
            
                from = from.replace(/min/, '-200');
                from = from.replace(/max/, '200');
                to   = to.replace(/min/, '-200');
                to   = to.replace(/max/, '200');
            
                from   = Number(from);
                to     = Number(to);
                
                var width  = ((to - from)  / 100) * (args.object.canvas.width - args.object.properties.marginLeft - args.object.properties.marginRight),
                    height = args.object.canvas.height,
                    x      = (from  / 100) * (args.object.canvas.width - args.object.properties.marginLeft - args.object.properties.marginRight) + args.object.properties.marginLeft,
                    y      = 0;
            
                args.object.path(
                    'b r % % % %',
                    x,y,width,height
                );
            
                return args.object.context.isPointInPath(args.x, args.y);


            // Test that the cursor is within the given Y percentages range
            } else if (clip.match(/^y:([-.0-9minax]+)%?-([.0-9minax]+)%?/i)) {

                // Accommodate the min/max keywords
                var from = RegExp.$1,
                    to   = RegExp.$2;
            
                from = from.replace(/min/, '-200');
                from = from.replace(/max/, '200');
                to   = to.replace(/min/, '-200');
                to   = to.replace(/max/, '200');
            
                from   = Number(from);
                to     = Number(to);
            
                var height = args.object.canvas.height - args.object.properties.marginTop - args.object.properties.marginBottom,
                    x      = 0,
                    y      = (from / 100) * height + args.object.properties.marginTop,
                    width  = args.object.canvas.width,
                    //y1     = ((to - from) / 100) * (args.object.canvas.height - args.object.properties.marginTop - args.object.properties.marginBottom),
                    y2     = (to / 100) * (args.object.canvas.height - args.object.properties.marginTop - args.object.properties.marginBottom),
                    y      = args.object.canvas.height - args.object.properties.marginBottom - y2,
                    height = (args.object.canvas.height - args.object.properties.marginTop - args.object.properties.marginBottom) * ( (to - from) / 100);
                
                    args.object.path(
                        'b r % % % %',
                        x,y,width,height
                    );

                return args.object.context.isPointInPath(args.x, args.y);



















            // Test that the cursor is within the given radius
            // percentages range
            } else if (clip.match(/^r:([-.0-9minax]+)%?-([.0-9minax]+)%?$/i)) {
            
                // Accommodate the min/max keywords
                var from = RegExp.$1,
                    to   = RegExp.$2;
            
                from = from.replace(/min/, '0');
                from = from.replace(/max/, '2000');
                to   = to.replace(/min/, '0');
                to   = to.replace(/max/, '2000');

                from = Number(from);
                to   = Number(to);

                // Get the radius, centerx and centery from the
                // object
                if (!RGraph.isNumber(args.object.centerx) || !RGraph.isNumber(args.object.centery) || !RGraph.isNumber(args.object.radius)) {
                    alert('[RGRAPH CLIPPING] To use the r: syntax the object (Type: {1}, ID: {2}, UID: {3}) must support the centerx, centery and radius properties.'.format(
                        args.object.type,
                        args.object.id,
                        args.object.uid
                    ));
                }
                
                var centerx = args.object.centerx,
                    centery = args.object.centery,
                    r1      = (from / 100) * args.object.radius,
                    r2      = (to / 100) * args.object.radius;

                args.object.path(
                    'sa ' + 'b    a % % % 0 6.29 false    a % % % 6.29 0 true    cl',
                    centerx, centery, r1,
                    centerx, centery, r2
                );

                return args.object.context.isPointInPath(args.x, args.y);












            // Test that the cursor is within the clipped scale
            //
            // IF YOU UPDATE THIS REGEXP THEN IT NEEDS TO BE
            // UPDATED FURTHER UP IN THE CODE TOO
            //
            } else if (clip.match(/^(?:scale:) *([-.0-9min]+) *- *([-.0-9max]+) *$/)) {
                if (args.object.clipToScaleTestWorker) {
                    args.object.clipToScaleTestWorker(clip);
                    
                    return args.object.context.isPointInPath(args.x, args.y);
                } else {
                    console.log('The scale: clipping option isn\'t implemented for this chart type (' + args.object.type + ')');
                }
            }
        }
    };







    //
    // Parses a string such as this:
    //
    // foo=bar,foo2=bar2,foo3="bar 3"
    //
    // @paramstr string The string to parse
    // @return          An object of the results
    //
    RGraph.parseConfigString = function ()
    {
        var args = RGraph.getArgs(arguments, 'string,separator');

        // Default to a comma
        args.separator ??= ',';

        var insideQuote = false,
            entries     = [],
            entry       = [],
            parts       = {};
        
        args.string.split('').forEach(function (character)
        {
            if(character === '"' || character === "'") {
                insideQuote = !insideQuote;
            } else {

                if(character === args.separator && !insideQuote) {
                    entries.push(entry.join(''));
                    entry = [];
                } else {
                    entry.push(character);
                }
            }
        });

        entries.push(entry.join(''));                                        

        for (let i=0; i<entries.length; ++i) {
            var index = entries[i].indexOf('=');
            var name  = entries[i].substr(0, index);
            var value = entries[i].substr(index + 1);

            // Convert the value to a number type if it looks
            // like a number
            if (RGraph.isNumeric(value)) {                
                value = Number(value);
            }
            

            parts[name] = value;
        }
        
        return parts;
    };







    //
    // This function allows the drawing of custom lines
    //
    RGraph.drawHorizontalLines = function (obj)
    {
        var lines = obj.properties.horizontalLines,
            avg,x,y,label,halign,valign,hmargin = 10,vmargin = 5,
            position,textFont,textSize,textColor,textBold,textItalic,
            data,linewidth;

        if (lines) {

            //
            // Set some defaults for the configuration of
            // each line
            //
            var defaults = {
                dotted:        false,
                dashed:        true,
                color:         '#666', // Same as labelColor property below
                linewidth:     1,
                label:         'Average (%{value})',
                labelPosition: 'top right',
                labelColor:    '#666', // Same as color property above
                labelValueDecimals: 2,
                labelOffsetx:       0,
                labelOffsety:       0
            };
        
        
            // Loop through each line to be drawn
            for (let i=0; i<obj.properties.horizontalLines.length; ++i) {

                var conf       = lines[i],
                    textFont   = conf.labelFont  || obj.properties.textFont,
                    textColor  = conf.labelColor || defaults.labelColor,
                    textSize   = conf.labelSize  || obj.properties.textSize - 4,
                    textBold   = typeof conf.labelBold   === 'boolean' ? conf.labelBold   : obj.properties.textBold,
                    textItalic = typeof conf.labelItalic === 'boolean' ? conf.labelItalic : obj.properties.textItalic;








                switch (obj.type) {
                    case 'line':
                        // Calculate the Y coord if we've been
                        // given a numeric value
                        if (typeof conf.value === 'number') {
                            y = obj.getYCoord(conf.value);
                        
                        } else if(conf.value === 'average') {
                            avg        = RGraph.arraySum(obj.original_data[0]) /  obj.original_data[0].length;
                            y          = obj.getYCoord(avg);
                        }
                        break;
                        
                    
                    
                    case 'bar':
                        // Calculate the Y coord if we've been
                        // given a numeric value
                        if (typeof conf.value === 'number') {
                            y = obj.getYCoord(conf.value);

                        } else if (conf.value === 'average') {

                            // Calculate the average value of all
                            // of the
                            // values. Grouped charts are treated
                            // slightly differently to stacked
                            // charts.
                            var total = 0;
                            obj.data.map(v => {

                                if (RGraph.isNumber(v)) {
                                    total += v;
                                } else if (RGraph.isArray(v)) {
                                    total += RGraph.arraySum(v);
                                }
                            });


                            var num = 0;
                            for (let i=0; i<obj.data.length; ++i) {
                                if (obj.properties.grouping === 'grouped') {
                                    num += RGraph.isArray(obj.data[i]) ? obj.data[i].length : 1 ;
                                } else if (obj.properties.grouping === 'stacked') {
                                    ++num;
                                }
                            }

                            avg        = total / num;
                            y          = obj.getYCoord(avg);


                        }
                        break;






                    case 'scatter':
                        // Calculate the Y coord if we've been
                        // given a numeric value
                        if (typeof conf.value === 'number') {
                            y = obj.getYCoord(conf.value);
                        } else if (conf.value === 'average') {
                            // Use the map() function to get an
                            // average value from the first dataset
                            var sum = 0;
                            obj.data[0].map(v => sum += parseFloat(v[1]));

                            avg = sum / obj.data[0].length;
                            y   = obj.getYCoord(avg);
                        }
                        break;
                }










                //
                // Dotted or dashed lines
                //
                linedash = '[1,1]';

                if (conf.dotted === true) {
                    linedash = '[1,3]';
                }
                
                if (conf.dashed === true || (typeof conf.dashed === 'undefined' && typeof conf.dotted === 'undefined') ) {
                    linedash = '[6,6]';
                }










                //
                // Draw the line
                //
                obj.path(
                    'lw % ld % b m % % l % % s %',
                    typeof conf.linewidth === 'number' ? conf.linewidth : defaults.linewidth,
                    linedash,
                    obj.properties.marginLeft,y,
                    obj.canvas.width - obj.properties.marginRight,y,
                    conf.color || defaults.color
                );





                //
                // Draw the label
                //




                // These chart types only
                if (['bar','line','scatter'].includes(obj.type)) {
                    
                    
                    // Default pos for the label
                    if (!conf.labelPosition) {
                        conf.labelPosition = defaults.labelPosition;
                    }



                    if (typeof conf.labelPosition === 'string' && conf.labelPosition.indexOf('left') >= 0) {
                        textX  = obj.marginLeft + hmargin;
                        halign = 'left';
                    } else if (typeof conf.labelPosition === 'string' && conf.labelPosition.indexOf('center') >= 0) {
                        textX  = ((obj.canvas.width - obj.properties.marginLeft - obj.properties.marginRight) / 2) + obj.properties.marginLeft;
                        halign = 'center';
                    } else if (typeof conf.labelPosition === 'string' && conf.labelPosition === 'right-margin') {
                        textX  = obj.canvas.width - obj.properties.marginRight + hmargin;
                        halign = 'left';
                    } else if (typeof conf.labelPosition === 'string' && conf.labelPosition ==='left-margin') {
                        textX  = obj.properties.marginLeft - hmargin;
                        halign = 'right';
                    } else {
                        textX  = obj.canvas.width - obj.marginRight - hmargin;
                        halign = 'right';
                    }


                    if (typeof conf.labelPosition === 'string' && conf.labelPosition.indexOf('bottom') >= 0) {
                        textY  = y + vmargin;
                        valign = 'top';
                    } else if (typeof conf.labelPosition === 'string' && conf.labelPosition === 'right-margin') {
                        textY  = y;
                        valign = 'center';
                    } else if (typeof conf.labelPosition === 'string' && conf.labelPosition === 'left-margin') {
                        textY  = y;
                        valign = 'center';
                    } else {
                        textY  = y - vmargin;
                        valign = 'bottom';
                    }
                }
                
                // Account for linewidth
                linewidth = typeof conf.linewidth === 'number' ? conf.linewidth : defaults.linewidth;

                var num = RGraph.numberFormat({
                    object:    obj,
                    number:    (typeof conf.value === 'number' ? conf.value : avg).toFixed(typeof conf.labelValueDecimals === 'number' ? conf.labelValueDecimals : defaults.labelValueDecimals),
                    unitspre:  conf.labelValueUnitsPre,
                    unitspost: conf.labelValueUnitsPost,
                    thousand:  conf.labelValueThousand,
                    point:     conf.labelValuePoint,
                    formatter: conf.labelValueFormatter,
                    decimals:  conf.labelValueDecimals
                });




                //
                // Draw the label
                //

                RGraph.text({
                    object:     obj,
                    text:       (typeof conf.label === 'string' ? conf.label : defaults.label).replace('%{value}', num),
                    x:          textX + parseFloat(conf.labelOffsetx || defaults.labelOffsetx),
                    y:          textY - (linewidth / 2) + parseFloat((conf.labelPosition.indexOf('top') !== -1 ? (-1 * conf.labelOffsety) : conf.labelOffsety) || defaults.labelOffsety),
                    valign:     valign,
                    halign:     halign,
                    size:       textSize,
                    font:       textFont,
                    color:      textColor,
                    italic:     textItalic,
                    bold:       textBold,
                    bounding:   true,
                    boundingFill: 'rgba(255,255,255,0.75)',
                    boundingStroke: 'transparent'
                });
            }
        }
    };








    //
    // This function allows you to run a function once (immediately)
    // Future calls using the same identifier are not run.
    //
    // @param obj  object   The chart object
    // @param id   string   A unique identifier used to identifier
    //                      this function
    // @param func function The function to call
    // @return              The return value of the function
    //
    RGraph.runOnce = function (id, func)
    {
        if (RGraph.Registry.get('rgraph-runonce-functions')[id]) {
            return;
        }

        RGraph.Registry.get('rgraph-runonce-functions')[id] = func;
        
        return func();
    };








    //
    // This function implements the logic for whether to ignore
    // a particular hotspot or not
    //
    // @param object obj   The chart object
    // @param number index The Index of the hotspot to check for
    //
    RGraph.tooltipsHotspotIgnore = function (obj, index)
    {
        if (   (RGraph.isBoolean(obj.properties.tooltipsHotspotIgnore) && obj.properties.tooltipsHotspotIgnore)
            || (RGraph.isNumber(obj.properties.tooltipsHotspotIgnore)  && obj.properties.tooltipsHotspotIgnore === index)
            || (RGraph.isArray(obj.properties.tooltipsHotspotIgnore)   && obj.properties.tooltipsHotspotIgnore.includes(index))
            || (RGraph.isArray(obj.properties.tooltipsHotspotIgnore)   && obj.properties.tooltipsHotspotIgnore[index] === true)) {
            
            return true;
        }

        return false;
    };








    // Formatted version of a popular md5 implementation
    // Thanks to Paul Johnston & Greg Holt.
    //
    // @param string str The string to hash
    //
    RGraph.md5 = function (str)
    {
        var hc="0123456789abcdef";
        function rh(n) {var j,s="";for(j=0;j<=3;j++) s+=hc.charAt((n>>(j*8+4))&0x0F)+hc.charAt((n>>(j*8))&0x0F);return s;}
        function ad(x,y) {var l=(x&0xFFFF)+(y&0xFFFF);var m=(x>>16)+(y>>16)+(l>>16);return (m<<16)|(l&0xFFFF);}
        function rl(n,c)            {return (n<<c)|(n>>>(32-c));}
        function cm(q,a,b,x,s,t)    {return ad(rl(ad(ad(a,q),ad(x,t)),s),b);}
        function ff(a,b,c,d,x,s,t)  {return cm((b&c)|((~b)&d),a,b,x,s,t);}
        function gg(a,b,c,d,x,s,t)  {return cm((b&d)|(c&(~d)),a,b,x,s,t);}
        function hh(a,b,c,d,x,s,t)  {return cm(b^c^d,a,b,x,s,t);}
        function ii(a,b,c,d,x,s,t)  {return cm(c^(b|(~d)),a,b,x,s,t);}
        function sb(x) {
            var i;var nblk=((x.length+8)>>6)+1;var blks=new Array(nblk*16);for(i=0;i<nblk*16;i++) blks[i]=0;
            for(i=0;i<x.length;i++) blks[i>>2]|=x.charCodeAt(i)<<((i%4)*8);
            blks[i>>2]|=0x80<<((i%4)*8);blks[nblk*16-2]=x.length*8;return blks;
        }
        var i,x=sb(""+str),a=1732584193,b=-271733879,c=-1732584194,d=271733878,olda,oldb,oldc,oldd;
        for(i=0;i<x.length;i+=16) {olda=a;oldb=b;oldc=c;oldd=d;
            a=ff(a,b,c,d,x[i+ 0], 7, -680876936);d=ff(d,a,b,c,x[i+ 1],12, -389564586);c=ff(c,d,a,b,x[i+ 2],17,  606105819);
            b=ff(b,c,d,a,x[i+ 3],22,-1044525330);a=ff(a,b,c,d,x[i+ 4], 7, -176418897);d=ff(d,a,b,c,x[i+ 5],12, 1200080426);
            c=ff(c,d,a,b,x[i+ 6],17,-1473231341);b=ff(b,c,d,a,x[i+ 7],22,  -45705983);a=ff(a,b,c,d,x[i+ 8], 7, 1770035416);
            d=ff(d,a,b,c,x[i+ 9],12,-1958414417);c=ff(c,d,a,b,x[i+10],17,     -42063);b=ff(b,c,d,a,x[i+11],22,-1990404162);
            a=ff(a,b,c,d,x[i+12], 7, 1804603682);d=ff(d,a,b,c,x[i+13],12,  -40341101);c=ff(c,d,a,b,x[i+14],17,-1502002290);
            b=ff(b,c,d,a,x[i+15],22, 1236535329);a=gg(a,b,c,d,x[i+ 1], 5, -165796510);d=gg(d,a,b,c,x[i+ 6], 9,-1069501632);
            c=gg(c,d,a,b,x[i+11],14,  643717713);b=gg(b,c,d,a,x[i+ 0],20, -373897302);a=gg(a,b,c,d,x[i+ 5], 5, -701558691);
            d=gg(d,a,b,c,x[i+10], 9,   38016083);c=gg(c,d,a,b,x[i+15],14, -660478335);b=gg(b,c,d,a,x[i+ 4],20, -405537848);
            a=gg(a,b,c,d,x[i+ 9], 5,  568446438);d=gg(d,a,b,c,x[i+14], 9,-1019803690);c=gg(c,d,a,b,x[i+ 3],14, -187363961);
            b=gg(b,c,d,a,x[i+ 8],20, 1163531501);a=gg(a,b,c,d,x[i+13], 5,-1444681467);d=gg(d,a,b,c,x[i+ 2], 9,  -51403784);
            c=gg(c,d,a,b,x[i+ 7],14, 1735328473);b=gg(b,c,d,a,x[i+12],20,-1926607734);a=hh(a,b,c,d,x[i+ 5], 4,    -378558);
            d=hh(d,a,b,c,x[i+ 8],11,-2022574463);c=hh(c,d,a,b,x[i+11],16, 1839030562);b=hh(b,c,d,a,x[i+14],23,  -35309556);
            a=hh(a,b,c,d,x[i+ 1], 4,-1530992060);d=hh(d,a,b,c,x[i+ 4],11, 1272893353);c=hh(c,d,a,b,x[i+ 7],16, -155497632);
            b=hh(b,c,d,a,x[i+10],23,-1094730640);a=hh(a,b,c,d,x[i+13], 4,  681279174);d=hh(d,a,b,c,x[i+ 0],11, -358537222);
            c=hh(c,d,a,b,x[i+ 3],16, -722521979);b=hh(b,c,d,a,x[i+ 6],23,   76029189);a=hh(a,b,c,d,x[i+ 9], 4, -640364487);
            d=hh(d,a,b,c,x[i+12],11, -421815835);c=hh(c,d,a,b,x[i+15],16,  530742520);b=hh(b,c,d,a,x[i+ 2],23, -995338651);
            a=ii(a,b,c,d,x[i+ 0], 6, -198630844);d=ii(d,a,b,c,x[i+ 7],10, 1126891415);c=ii(c,d,a,b,x[i+14],15,-1416354905);
            b=ii(b,c,d,a,x[i+ 5],21,  -57434055);a=ii(a,b,c,d,x[i+12], 6, 1700485571);d=ii(d,a,b,c,x[i+ 3],10,-1894986606);
            c=ii(c,d,a,b,x[i+10],15,   -1051523);b=ii(b,c,d,a,x[i+ 1],21,-2054922799);a=ii(a,b,c,d,x[i+ 8], 6, 1873313359);
            d=ii(d,a,b,c,x[i+15],10,  -30611744);c=ii(c,d,a,b,x[i+ 6],15,-1560198380);b=ii(b,c,d,a,x[i+13],21, 1309151649);
            a=ii(a,b,c,d,x[i+ 4], 6, -145523070);d=ii(d,a,b,c,x[i+11],10,-1120210379);c=ii(c,d,a,b,x[i+ 2],15,  718787259);
            b=ii(b,c,d,a,x[i+ 9],21, -343485551);a=ad(a,olda);b=ad(b,oldb);c=ad(c,oldc);d=ad(d,oldd);
        }
        return rh(a)+rh(b)+rh(c)+rh(d);
    };








    //
    // This is an easy shortcut function that paths a line in
    // the form of an array of coordinate pairs. The first
    // coordinate is moved to and then the rest are lined to.
    // No beginpath or stroking/filling is done.
    //
    // @param object  context The context
    // @param array   coords  An array of coordinate pairs
    // @param boolean moveto  Whether to moveTo the first
    //                        point or lineTo
    //
    RGraph.pathLine = function ()
    {
        var args = RGraph.getArgs(arguments, 'context,coords,moveto,reverse');

        if (args.reverse) {
            args.coords = RGraph.arrayReverse(args.coords);
        }

        // Path the line

        for (var i=0; i<args.coords.length; ++i) {
            if (i === 0 && args.moveto !== false) {
                args.context.moveTo(args.coords[i][0], args.coords[i][1]);
            } else {
                args.context.lineTo(args.coords[i][0], args.coords[i][1]);
            }
        }
    };








    //
    // This is an easy shortcut function that draws a line in
    // on to the canvas - not just pathing a line like the
    // above function.
    //
    // @param object  context The context
    // @param array   coords  An array of coordinate pairs
    // @param boolean moveto  Whether to moveTo the first
    //                        point or lineTo
    //
    RGraph.drawLine = function ()
    {
        var args = RGraph.getArgs(arguments, 'context,coords,moveto,stroke');

        // Start
        args.context.beginPath();
        
            // Path the line on to the canvas
            RGraph.pathLine({
                context: args.context,
                coords:  args.coords,
                moveto:  args.moveto
            });
            
            // Linewidth
            if (args.linewidth) {
                args.context.lineWidth = args.linewidth;
            }
            
            // Fill the line
            if (args.fill) {
                args.context.fillStyle = args.fill;
                args.context.fill();
            }
            
            // Stroke the line
            if (args.stroke) {
                args.context.strokeStyle = args.stroke;
                args.context.stroke();
            }
            
    };







    // Some utility functions that help identify the type of an object
    //
    // Note that isUndefined() should be used like this or you'll get an
    // error (with the window. prefix):
    //
    //        RGraph.isUndefined(window.foo)
    //
    RGraph.isString    = function(obj){return typeof obj === 'string';};
    RGraph.isNumber    = function(obj){return typeof obj === 'number';};
    RGraph.isTextual   = function(obj){return (typeof obj === 'string' || typeof obj === 'number');};
    RGraph.isNumeric   = function(value){value=String(value);return Boolean(value.match(/^[-.0-9]+$/))||Boolean(value.match(/^[-.0-9]+e[-0-9]+$/))||(value==='Infinity')||(value==='-Infinity')||Boolean(value.match(/^[-.0-9]+x[0-9a-f]+$/i));};
    RGraph.isBool      =
    RGraph.isBoolean   = function(obj){return typeof obj === 'boolean';};
    //RGraph.isArray Defined above
    RGraph.isObject    = function(obj){return (obj && typeof obj === 'object' && obj.constructor.toString().toLowerCase().indexOf('object') > 0) ? true : false;};
    //RGraph.isNull  Defined above
    RGraph.isFunction  = function (obj){return typeof obj === 'function';};
    RGraph.isUndefined = function (obj){return typeof obj === 'undefined';};








// End module pattern
})(window, document);








    //
    // Uses the alert() function to show the structure of the given variable
    // 
    // @param mixed v The variable to print/alert the structure of
    //
    window.$p = function (v)
    {
        RGraph.pr(arguments[0], arguments[1], arguments[3]);
    };








    //
    // A shorthand for the default alert() function
    //
    // @param mixed v The variable to alert
    //
    window.$a = function (v)
    {
        if (arguments.length > 1) {
            var args = [];
            
            for (let i=0; i<arguments.length; ++i) {
                args.push(arguments[i]);
                args.push('    ');
            }
            
            // Get rid of the last element - which is spaces
            args.pop();
            
            alert(args);
        } else {
            alert(v);
        }
    };








    //
    // Short-hand for console.log
    // 
    // @param mixed v The variable to log to the console
    //
    window.$c  =
    window.$cl = function (v)
    {
        return console.log(v);
    };








    //
    // A debug function that takes the message that you give and if a textarea output
    // window doesn't yet exists creates one and prepends the msg to it.
    // 
    // @param mixed v The variable to log to the window
    //
    window.$d = function (m)
    {
        var width  = 600;
        var height = 600;

        // Create the debug window if necessary
        if (!this.rgraph_debug_textarea) {
                this.rgraph_debug_textarea = document.createElement('textarea');
                this.rgraph_debug_textarea.style.position = 'fixed';
                this.rgraph_debug_textarea.style.left     = '10px';
                this.rgraph_debug_textarea.style.top      = '10px';
                this.rgraph_debug_textarea.style.width    = width + 'px';
                this.rgraph_debug_textarea.style.height   = height + 'px';
                this.rgraph_debug_textarea.style.opacity  = '0.25';
                this.rgraph_debug_textarea.style.zIndex   = '99999';
                this.rgraph_debug_textarea.style.border   = '2px solid black';
                this.rgraph_debug_textarea.style.backgroundColor = 'yellow'
                this.rgraph_debug_textarea.style.color = 'black';
                this.rgraph_debug_textarea.style.fontSize = '16pt';
                this.rgraph_debug_textarea.style.fontWeight = 'bold';
                this.rgraph_debug_textarea.wrap = 'off';
            document.body.appendChild(this.rgraph_debug_textarea);
            
            // Restore the W/H coords from localstorage
            if  (window.localStorage.rgraph_debug_textarea_w) this.rgraph_debug_textarea.style.width   = window.localStorage.rgraph_debug_textarea_w;
            if  (window.localStorage.rgraph_debug_textarea_h) this.rgraph_debug_textarea.style.height  = window.localStorage.rgraph_debug_textarea_h;

            this.rgraph_debug_textarea.onmouseover   = function (e) {e.target.style.opacity = 1;};
            this.rgraph_debug_textarea.onmousedown   = function (e) {if (e.ctrlKey) {e.preventDefault();e.stopPropagation();this.mousedown = true;this.pickupX = e.offsetX;this.pickupY = e.offsetY; return false;}};
            this.rgraph_debug_textarea.onmouseout    = function (e) {this.style.opacity = 0.25;};
            this.rgraph_debug_textarea.ondblclick = function (e)
            {
                if (confirm('Clear the log?')) {
                    this.value = '';
                }
            };
            
            window.onmouseup = function (e) {this.rgraph_debug_textarea.mousedown = false;};
            window.addEventListener('mousemove', function (e)
            {
                if (this.rgraph_debug_textarea.mousedown) {
                    window.localStorage.rgraph_debug_textarea_w = this.rgraph_debug_textarea.offsetWidth + 'px';
                    window.localStorage.rgraph_debug_textarea_h = this.rgraph_debug_textarea.offsetHeight + 'px';
                }
            }, false);
        }
        
        
        // Create a timestamp and log it to the textarea
        var date = new Date();
        var hour = date.getHours();
        var min  = date.getMinutes();
            min  = String(min).length === 1 ? '0' + min : min;
        var sec  = date.getSeconds();
            sec  = String(sec).length === 1 ? '0' + sec : sec;


        //
        // Handles circular references
        //
        function  getCircularReplacer()
        {
            var seen = [];
            
            return function (key, value)
            {
                if (typeof value === 'object' && value !== null) {
                    
                    // Loop thru the seen array and check that the object is not in there already
                    for (var i=0; i<seen.length; ++i) {
                        if (seen[i] === value) {
                            return;
                        }
                    }

                    seen.push(value);
                }

                return value;
            };
        };

        // Add the message to the debug window
        this.rgraph_debug_textarea.value = "[%1:%2:%3] %4\r\n%5".format(
            hour,
            min,
            sec,
            JSON.stringify(m, getCircularReplacer()),
            this.rgraph_debug_textarea.value
        );
    };







    //
    // Polyfill for the String.protfotype.substr() method which
    // may not be included on some devices
    //
    // @param  number start  The start index. Zero-indexed and can also be negtive - in which case
    //                       the counting starts from the end of the string
    // @param  number length The length of the string to extract
    // @return string        The new string
    //
    if (typeof ''.substr !== 'function') {
        String.prototype.substr = function (start, length)
        {
            start = start >=0 ? start : this.length + start;
            return this.substring(start, start + length);
 
        };
    }








    //
    // A basic string formatting function. Use it like this:
    // 
    // var str = '{0} {1} {2}'.format('a', 'b', 'c');
    // 
    // Outputs: a b c
    //
    // @param ... Replacements to use in the string
    //
    String.prototype.format = function()
    {
        //
        // Allow for this type of formatting: {myVar}
        //
        if (arguments.length === 0) {
        
            var s = this;
        
            // Allow for {myVar} style
            if (s.match(/{[a-z0-9]+?}/i)) {
                var s = this.replace(/{[a-z0-9]+?}/gi, function(str, idx)
                {
                    str = str.substr(1)
                    str = str.substr(0, str.length - 1)
    
                    return window[str];
                });
            }

            return s;
        }
        
        
        //
        // If called with just a single array, then handle that
        //
        //eg '%1 %2 %3'.format(['A','B','C']);
        //
        if (arguments.length === 1 && RGraph.isArray(arguments[0])) {
            return this.format.apply(this, arguments[0]);
        }




        var args = arguments;
        
        for (var i in args) {
            if (RGraph.isNullish(args[i])) {
                args[i] = 'null';
            }
        }

        var s = this.replace(/{(\d+)}/g, function(str, idx)
        {
          return typeof args[idx - 1] !== 'undefined' ? args[idx - 1] : str;
        });

        
        // Save percentage signs that are escaped with either
        // another percent or a backslash
        s = s.replace(/(?:%|\\)%(\d)/g,'__PPEERRCCEENNTT__$1');

        s = s.replace(/%(\d+)/g, function(str, idx)
        {
          return typeof args[idx - 1] !== 'undefined' ? args[idx - 1] : str;
        });

        // Now replace those saved percentage signs with a percentage sign
        return s.replace('__PPEERRCCEENNTT__', '%');
    };