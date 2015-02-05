/**
* EditableForm utilites
*/
(function ($) {
    $.extend($.fn.editableform, {
        utils: {
            /**
            * classic JS inheritance function
            */
            inherit: function (Child, Parent) {
                var F = function() { };
                F.prototype = Parent.prototype;
                Child.prototype = new F();
                Child.prototype.constructor = Child;
                Child.superclass = Parent.prototype;
            },

            /**
            * set caret position in input
            * see http://stackoverflow.com/questions/499126/jquery-set-cursor-position-in-text-area
            */        
            setCursorPosition: function(elem, pos) {
                if (elem.setSelectionRange) {
                    elem.setSelectionRange(pos, pos);
                } else if (elem.createTextRange) {
                    var range = elem.createTextRange();
                    range.collapse(true);
                    range.moveEnd('character', pos);
                    range.moveStart('character', pos);
                    range.select();
                }
            },

            /**
            * function to parse JSON in *single* quotes. (jquery automatically parse only double quotes)
            * That allows such code as: <a data-source="{'a': 'b', 'c': 'd'}">
            * safe = true --> means no exception will be thrown
            * for details see http://stackoverflow.com/questions/7410348/how-to-set-json-format-to-html5-data-attributes-in-the-jquery
            */
            tryParseJson: function(s, safe) {
                if (typeof s === 'string' && s.length && s.match(/^\{.*\}$/)) {
                    if (safe) {
                        try {
                            /*jslint evil: true*/
                            s = (new Function('return ' + s))();
                            /*jslint evil: false*/
                        } catch (e) {} finally {
                            return s;
                        }
                    } else {
                        /*jslint evil: true*/
                        s = (new Function('return ' + s))();
                        /*jslint evil: false*/
                    }
                }
                return s;
            },

            /**
            * slice object by specified keys
            */
            sliceObj: function(obj, keys, caseSensitive /* default: false */) {
                var key, keyLower, newObj = {};

                if (!$.isArray(keys) || !keys.length) {
                    return newObj;
                }

                for (var i = 0; i < keys.length; i++) {
                    key = keys[i];
                    if (obj.hasOwnProperty(key)) {
                        newObj[key] = obj[key];
                    }

                    if(caseSensitive === true) {
                        continue;
                    }

                    //when getting data-* attributes via $.data() it's converted to lowercase.
                    //details: http://stackoverflow.com/questions/7602565/using-data-attributes-with-jquery
                    //workaround is code below.
                    keyLower = key.toLowerCase();
                    if (obj.hasOwnProperty(keyLower)) {
                        newObj[key] = obj[keyLower];
                    }
                }

                return newObj;
            },
            
            /**
            * exclude complex objects from $.data() before pass to config
            */
            getConfigData: function($element) {
                var data = {};
                $.each($element.data(), function(k, v) {
                   if(typeof v !== 'object' || (v && typeof v === 'object' && v.constructor === Object)) {
                      data[k] = v;
                   }
                });
                return data;
            }            
        }
    });      
}(window.jQuery));