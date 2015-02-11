/*!
 * jQuery domPath Plugin v1.0.0
 * https://github.com/asatour/jquery-domPath
 *
 * Copyright 2015 asatour(Abdelahad SATOUR]
 * Released under the MIT license
 */
(function ($) {

    jQuery.fn.extend({
        domPath: function (options) {
            var opDefault, fullPaths, $this;

            // ton push all elements short path as string
            fullPaths = [];

            // default options
            opDefault = {
                tag             :   true,   // get dom tag
                lowerCase       :   true,   // get tag in lower or upper case
                class           :   true,   // get element class
                id              :   true,   // get element id
                body            :   false,  // show body in dom full path
                idBeforeClass   :   true,   // display id before class
                oneResult       :   false,  // get only the first result(as string)
                scaleType       :   false   // if the result contains only one element get it as string and not array
            };

            var ops = $.extend(opDefault, options);

            // get dom path depending on options
            var getDomPath = function (el) {

                var elString, elId, elClass, elIdClass;
                elString = elId = elClass = '';

                // if the tag option is enabled
                if(ops.tag){
                    // get the tag name in lower or upper case
                    elString = ops.lowerCase ? el.tagName.toLowerCase() : el.tagName.toUpperCase();
                }

                if (ops.id && el.id) {
                    elId = '#' + el.id;
                }

                // concat class names
                if (ops.class && el.className) {
                    elClass = '.' + el.className.trim().replace(/ /g, '.');
                }

                // to display id before or after class name
                elIdClass = ops.idBeforeClass ? elId.concat(elClass) : elClass.concat(elId);
                elString += elIdClass;

                return elString;

            };

            // if the oneResult option is enabled work only in the first element
            $this = ops.oneResult ?  $(this[0]) : this;

            // do it for all elements
            $this.each(function () {

                var current, domPathItem, pathArray;
                // to don't confuse the this scopes
                current = $(this);
                pathArray = [];

                //pathify also the first element and not only parents
                domPathItem = getDomPath(current.get(0));
                if(domPathItem === ''){
                    return [];
                }

                pathArray.push(domPathItem);
                // for every parent inside body
                $this.parents(':not(html)').each(function () {
                    if(this.tagName) {
                        domPathItem = getDomPath(this);
                        // if the tag option is disabled, it might return empty
                        if(domPathItem !== ''){
                            pathArray.push(domPathItem);
                        }
                    }

                });

                // reverse array ton contact it to string
                pathArray.reverse();

                // if the body option is disabled, check first if the
                // pathArray is not empty and shift its first element
                if (!ops.body  && pathArray.length > 0 && pathArray[0].toLowerCase().search('body') === 0) {
                    pathArray.shift();
                }

                // concat with > only if the pathArray has two elements or more
                fullPaths.push(pathArray.length > 1 ? pathArray.join(' > ') : pathArray[0]);

            });

            // if the option oneResult or scaleType is enabled return only one/first result as string
            if(ops.oneResult || (fullPaths.length === 1 && ops.scaleType)){
                fullPaths = fullPaths[0];
            }

            return fullPaths;
        }
    });


    jQuery.fn.extend({
        domPath: jQuery.fn.domPath
    });

})(jQuery);
