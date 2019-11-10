/// <reference path="jquery.js" />
/*
jquery-watcher 
Version 1.21 - 1/19/2016
© 2014-2016 Rick Strahl, West Wind Technologies 
www.west-wind.com
Licensed under MIT License
http://en.wikipedia.org/wiki/MIT_License
*/
(function($, undefined) {
        $.fn.watch = function(options) {
            /// <summary>
            /// Allows you to monitor changes in a specific
            /// CSS property of an element by polling the value.
            /// You can also monitor attributes (using attr_ prefix)
            /// or property changes (using prop_ prefix).
            /// when the value changes a function is called.
            /// The callback is fired in the context
            /// of the selected element (ie. this)
            ///
            /// Uses the MutationObserver API of the DOM and
            /// falls back to setInterval to poll for changes
            /// for non-compliant browsers (pre IE 11)
            /// </summary>            
            /// <param name="options" type="Object">
            /// Option to set - see comments in code below.
            /// </param>        
            /// <returns type="jQuery" /> 
            var opt = $.extend({
                // CSS styles or Attributes to monitor as comma delimited list
                // For attributes use a attr_ prefix
                // Example: "top,left,opacity,attr_class"
                properties: null,

                // interval for 'manual polling' (IE 10 and older)            
                interval: 100,

                // a unique id for this watcher instance
                id: "_watcher_" + new Date().getTime(),

                // flag to determine whether child elements are watched            
                watchChildren: false,

                // Callback function if not passed in callback parameter   
                callback: null
            }, options);

            return this.each(function() {
                var el = this;
                var el$ = $(this);
                var fnc = function(mRec, mObs) {
                    __watcher.call(el, opt.id, mRec, mObs);
                };

                var data = {
                    id: opt.id,
                    props: opt.properties.split(','),
                    vals: [opt.properties.split(',').length],
                    func: opt.callback, // user function
                    fnc: fnc, // __watcher internal
                    origProps: opt.properties,
                    interval: opt.interval,
                    intervalId: null
                };
                // store initial props and values
                $.each(data.props, function(i) {
                    var propName = data.props[i];
                    if (data.props[i].startsWith('attr_'))
                        data.vals[i] = el$.attr(propName.replace('attr_', ''));
                    else if (propName.startsWith('prop_'))
                        data.vals[i] = el$.prop(propName.replace('props_', ''));
                    else
                        data.vals[i] = el$.css(propName);
                });

                el$.data(opt.id, data);

                hookChange(el$, opt.id, data);
            });

            function hookChange(element$, id, data) {
                element$.each(function() {
                    var el$ = $(this);

                    if (window.MutationObserver) {
                        var observer = el$.data('__watcherObserver' + opt.id);
                        if (observer == null) {
                            observer = new MutationObserver(data.fnc);
                            el$.data('__watcherObserver' + opt.id, observer);
                        }
                        observer.observe(this, {
                            attributes: true,
                            subtree: opt.watchChildren,
                            childList: opt.watchChildren,
                            characterData: true
                        });
                    } else
                        data.intervalId = setInterval(data.fnc, opt.interval);
                });
            }

            function __watcher(id, mRec, mObs) {
                var el$ = $(this);
                var w = el$.data(id);
                if (!w) return;
                var el = this;

                if (!w.func)
                    return;

                var changed = false;
                var i = 0;
                for (i; i < w.props.length; i++) {
                    var key = w.props[i];

                    var newVal = "";
                    if (key.startsWith('attr_'))
                        newVal = el$.attr(key.replace('attr_', ''));
                    else if (key.startsWith('prop_'))
                        newVal = el$.prop(key.replace('prop_', ''));
                    else
                        newVal = el$.css(key);

                    if (newVal == undefined)
                        continue;

                    if (w.vals[i] != newVal) {
                        w.vals[i] = newVal;
                        changed = true;
                        break;
                    }
                }
                if (changed) {
                    // unbind to avoid recursive events
                    el$.unwatch(id);

                    // call the user handler
                    w.func.call(el, w, i, mRec, mObs);

                    // rebind the events
                    hookChange(el$, id, w);
                }
            }
        }
        $.fn.unwatch = function(id) {
            this.each(function() {
                var el = $(this);
                var data = el.data(id);
                try {
                    if (window.MutationObserver) {
                        var observer = el.data("__watcherObserver" + id);
                        if (observer) {
                            observer.disconnect();
                            el.removeData("__watcherObserver" + id);
                        }
                    } else
                        clearInterval(data.intervalId);
                }
                // ignore if element was already unbound
                catch (e) {
                }
            });
            return this;
        }
        String.prototype.startsWith = function(sub) {
            if (sub === null || sub === undefined) return false;
            return sub == this.substr(0, sub.length);
        }
    }
)(jQuery, undefined);