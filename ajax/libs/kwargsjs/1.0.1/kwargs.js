// Copyright (c) Serkan Yersen

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

(function(){
    'use strict';

    function kwargs(defaults) {
        var func = this;
        var removeComments = new RegExp('(\\/\\*[\\w\\\'\\,\\(\\)\\s\\r\\n\\*]*\\*\\/)|(\\/\\/[\\w\\s\\\'][^\\n\\r]*$)|(<![\\-\\-\\s\\w\\>\\/]*>)', 'gim');
        var removeWhitespc = new RegExp('\\s+', 'gim');
        var matchSignature = new RegExp('function.*?\\((.*?)\\)', 'i');
        // get the argument names from function source
        var names = func.toString()
                        .replace(removeComments, '')
                        .replace(removeWhitespc, '')
                        .match(matchSignature)[1]
                        .split(',');

        // Check the existance of default, if not create an object
        if(defaults !== Object(defaults)){
            defaults = {};
        }

        return function() {
            var args = Array.prototype.slice.call(arguments),
                kwargs = args[args.length - 1],
                name;

            // Check the existance of the kwargs
            if (kwargs === Object(kwargs)) {
                args.pop();
            }else{
                kwargs = {};
            }

            // Fill the arguments and apply them
            for (var i = 0; i < names.length; i++) {
                name = names[i];
                if (name in kwargs) {
                    args[i] = kwargs[name];
                }else if(name in defaults && args[i] === undefined){
                    args[i] = defaults[name];
                }
            }

            return func.apply(this, args);
        };
    }
    // As function prototype
    Function.prototype.kwargs = kwargs;
    
    // as a seperate function for module loaders
    var out = function(){
        var args = Array.prototype.slice.call(arguments, 0);
        var org = args.shift();
        return kwargs.apply(org, args);
    };
    
    // CommonJS module is defined
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports){
            module.exports = out;
        }
        exports.kwargs = out;
    }else
        // Register as a named module with AMD.
        if (typeof define === 'function' && define.amd){
            define('kwargs', [], function(){ return out; });
        }else{
            this.kwargs = out;
        }
}).call(this);
