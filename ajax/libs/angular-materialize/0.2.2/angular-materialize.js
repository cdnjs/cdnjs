(function (angular) {
    var undefined;
    angular.module("ui.materialize", ["ui.materialize.ngModel", "ui.materialize.collapsible", "ui.materialize.toast", "ui.materialize.sidenav", "ui.materialize.material_select", "ui.materialize.dropdown", "ui.materialize.inputfield", "ui.materialize.input_date", "ui.materialize.tabs", "ui.materialize.pagination", "ui.materialize.pushpin", "ui.materialize.scrollspy", "ui.materialize.parallax","ui.materialize.modal", "ui.materialize.tooltipped",  "ui.materialize.slider", "ui.materialize.materialboxed", "ui.materialize.scrollFire", "ui.materialize.nouislider", "ui.materialize.input_clock", "ui.materialize.carousel"]);

    /*     example usage:
     <div scroll-fire="func('Scrolled', 2000)" ></div>
     */
    angular.module("ui.materialize.scrollFire", [])
        .directive("scrollFire", ["$compile", "$timeout", function ($compile, $timeout) {
            return {
                restrict: "A",
                scope: {
                    offset: "@",
                    scrollFire: "&"
                },
                link: function (scope, element, attrs) {
                    var offset = scope.offset;
                    if (!angular.isDefined(scope.offset)) {
                        offset = 0;
                    }
                    offset = Number(offset) || 0;


                    var fired = false;
                    var handler = throttle(function () {
                        if (fired) {
                            return;
                        }
                        var windowScroll = window.pageYOffset + window.innerHeight;

                        var elementOffset = element[0].getBoundingClientRect().top + window.pageYOffset;

                        if (windowScroll > (elementOffset + offset)) {
                            fired = true;
                            scope.scrollFire({});
                            stop();
                        }
                    }, 100);

                    function stop() {
                        $(window).off("scroll resize blur focus", handler);
                    }

                    $(window).on("scroll resize blur focus", handler);
                    handler();

                    scope.$on('$destroy', stop);
                }
            };
        }]);

    // The throttle function from underscore: https://github.com/jashkenas/underscore/blob/master/underscore.js
    function throttle(func, wait) {
        var timeout, context, args, result;
        var previous = 0;

        var later = function() {
            previous = + new Date();
            timeout = null;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        };

        var throttled = function() {
            var now = + new Date();
            var remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            } else if (!timeout) {
                timeout = setTimeout(later, remaining);
            }
            return result;
        };

        throttled.cancel = function() {
            clearTimeout(timeout);
            previous = 0;
            timeout = context = args = null;
        };

        return throttled;
    };

    angular.module("ui.materialize.ngModel", [])
        .directive("ngModel",["$timeout", function($timeout){
            return {
                restrict: 'A',
                priority: -1, // lower priority than built-in ng-model so it runs first
                link: function(scope, element, attr) {
                    scope.$watch(attr.ngModel,function(value, oldValue){
                        $timeout(function () {
                            // To stop an infinite feedback-loop with material multiple-select.
                            if (value instanceof Array && oldValue instanceof Array) {
                                if (value.length == oldValue.length) {
                                    return;
                                }
                            }
                            if (element.is('select')) {
                                return;
                            }
                            // This fix is mainly to get placeholders to appear correctly, and it apparently screws things for the selects, so only doing this on something that isn't a select.
                            if (value){
                                element.trigger("change");
                            } else if(element.attr('placeholder') === undefined) {
                                if(!element.is(":focus"))
                                    element.trigger("blur");
                            }
                        });
                    });
                }
            };
        }]);


    /* example usage:
    <div slider height='500' transition='400'></div>
    */
    angular.module("ui.materialize.slider", [])
        .directive("slider", ["$timeout", function($timeout){
            return {
                restrict: 'A',
                scope: {
                    height: '=',
                    transition: '=',
                    interval: '=',
                    indicators: '='
                },
                link: function(scope, element, attrs) {
                    element.addClass("slider");
                    $timeout(function(){
                        element.slider({
                            height: (angular.isDefined(scope.height)) ? scope.height : 400,
                            transition: (angular.isDefined(scope.transition)) ? scope.transition : 500,
                            interval: (angular.isDefined(scope.interval)) ? scope.interval : 6000,
                            indicators: (angular.isDefined(scope.indicators)) ? scope.indicators : true
                        });
                    });
                }
            };
        }]);

    /* example usage:
     <div carousel height='500' transition='400'></div>
     */
    angular.module("ui.materialize.carousel", [])
        .directive("carousel", ["$timeout", function($timeout){
            return {
                restrict: 'A',
                scope: {
                    timeConstant: '@',
                    dist: '@',
                    shift: '@',
                    padding: '@',
                    fullWidth: '@',
                    indicators: '@',
                    noWrap: '@'
                },
                link: function(scope, element, attrs) {
                    element.addClass("carousel");

                    $timeout(function(){
                        element.carousel({
                            time_constant: (angular.isDefined(scope.timeConstant)) ? scope.timeConstant : 200,
                            dist: (angular.isDefined(scope.dist)) ? scope.dist : -100,
                            shift: (angular.isDefined(scope.shift)) ? scope.shift : 0,
                            padding: (angular.isDefined(scope.padding)) ? scope.padding : 0,
                            full_width: (angular.isDefined(scope.fullWidth)) ? scope.fullWidth : false,
                            indicators: (angular.isDefined(scope.indicators)) ? scope.indicators : false,
                            no_wrap: (angular.isDefined(scope.noWrap)) ? scope.noWrap : false
                        });
                    });
                }
            };
        }]);



    angular.module("ui.materialize.collapsible", [])
        .directive("collapsible", ["$timeout", function ($timeout) {
            return {
                link: function (scope, element, attrs) {
                    $timeout(function () {
                        element.collapsible();
                    });
                    if ("watch" in attrs) {
                        scope.$watch(function () {
                            return element[0].innerHTML;
                        }, function (oldVal, newVal) {
                            if (oldVal !== newVal) {
                                $timeout(function () {
                                    element.collapsible();
                                });
                            }
                        });
                    }
                }
            };
        }]);

    angular.module("ui.materialize.parallax", [])
        .directive("parallax", ["$timeout", function($timeout){
            return {
                link: function(scope, element, attrs) {
                    $timeout(function(){
                        element.parallax();
                    });
                }
            };
        }]);

    angular.module("ui.materialize.toast", [])
        .constant("toastConfig", {
            duration: 3000
        })
        .directive("toast", ["toastConfig", function (toastConfig) {
            return {
                scope: {
                    message: "@",
                    duration: "@",
                    callback: "&"
                },
                link: function (scope, element, attrs) {
                    element.bind(attrs.toast, function () {
                        var message = (angular.isDefined(scope.message)) ? scope.message : "";
                        var toastclass = (angular.isDefined(attrs.toastclass)) ? attrs.toastclass : "";
                        Materialize.toast(message, scope.duration ? scope.duration : toastConfig.duration, toastclass, scope.callback);
                    });
                }
            };
        }]);

    angular.module('ui.materialize.pushpin', [])
        .directive('pushpin', [function(){
            return {
                restrict: 'AE',
                require: [
                    '?pushpinTop',
                    '?pushpinOffset',
                    '?pushpinBottom'
                ],
                link: function (scope, element, attrs) {
                    var top    = attrs.pushpinTop || 0;
                    var offset = attrs.pushpinOffset || 0;
                    var bottom = attrs.pushpinBottom || Infinity;
                    setTimeout(function () {
                        element.pushpin({top: top, offset: offset, bottom: bottom});
                    }, 0);

                }
            };
        }]);

    // TODO: Add some documentation for this.
    angular.module("ui.materialize.scrollspy", [])
        .directive("scrollspy", ["$timeout", function($timeout){
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    element.addClass("scrollspy");
                    $timeout(function(){
                        element.scrollSpy();
                    });
                }
            };
        }]);

    angular.module("ui.materialize.tabs", [])
      .directive("tabs", ["$timeout", function($timeout){
          return {
              scope: {
                  reload: '='
              },
              link: function (scope, element, attrs) {
                  element.addClass("tabs");
                  $timeout(function() {
                      element.tabs();
                  });

                  scope.$watch('reload', function(newValue) {
                      if (newValue === true) {
                          element.tabs();
                          scope.reload = false;
                      }
                  });
              }
          };
      }]);

    // Example: <a href="#" data-activates="nav-mobile" class="button-collapse top-nav" data-sidenav="left" data-menuwidth="500"  data-closeonclick="true">
    // data-activates is handled by the jQuery plugin.
    angular.module("ui.materialize.sidenav", [])
        .directive("sidenav", [function () {
            return {
                scope: {
                    menuwidth: "@",
                    closeonclick: "@"
                },
                link: function (scope, element, attrs) {
                    element.sideNav({
                        menuWidth: (angular.isDefined(scope.menuwidth)) ? parseInt(scope.menuwidth, 10) : undefined,
                        edge: attrs.sidenav ? attrs.sidenav : "left",
                        closeOnClick: (angular.isDefined(scope.closeonclick)) ? scope.closeonclick == "true" : undefined
                    });
                }
            };
        }]);

    // This works, unless the content inside the select changes.
    angular.module("ui.materialize.material_select", [])
        .directive("materialSelect", ["$compile", "$timeout", function ($compile, $timeout) {
            return {
                link: function (scope, element, attrs) {
                    if (element.is("select")) {
						//BugFix 139: In case of multiple enabled. Avoid the circular looping.
                        function initSelect(newVal, oldVal) {
                            if (attrs.multiple) {
                                if (oldVal !== undefined && newVal !== undefined) {
                                    if (oldVal.length === newVal.length) {
                                        return;
                                    }
                                }
                                var activeUl = element.siblings("ul.active");
                                if (newVal !== undefined && activeUl.length) { // If select is open
                                    var selectedOptions = activeUl.children("li.active").length; // Number of selected elements
                                    if (selectedOptions == newVal.length) {
                                        return;
                                    }
                                }
                            }

                            element.siblings(".caret").remove();
                            function fixActive () {
                                if (!attrs.multiple) {
                                    var value = element.val();
                                    var ul = element.siblings("ul");
                                    ul.find("li").each(function () {
                                        var that = $(this);
                                        if (that.text() === value) {
                                            that.addClass("active");
                                        }
                                    });
                                }
                            }
                            scope.$evalAsync(function () {
                                //element.material_select();
                                //Lines 301-311 fix Dogfalo/materialize/issues/901 and should be removed and the above uncommented whenever 901 is fixed
                                element.material_select(function () {
                                    if (!attrs.multiple) {
                                        element.siblings('input.select-dropdown').trigger('close');
                                    }
                                    fixActive();
                                });
                                var onMouseDown = function (e) {
                                    // preventing the default still allows the scroll, but blocks the blur.
                                    // We're inside the scrollbar if the clientX is >= the clientWidth.
                                    if (e.clientX >= e.target.clientWidth || e.clientY >= e.target.clientHeight) {
                                        e.preventDefault();
                                    }
                                };
                                element.siblings('input.select-dropdown').off("mousedown.material_select_fix").on('mousedown.material_select_fix', onMouseDown);

                                fixActive();

                                element.siblings('input.select-dropdown').off("click.material_select_fix").on("click.material_select_fix", function () {
                                    $("input.select-dropdown").not(element.siblings("input.select-dropdown")).trigger("close");
                                });
                            });
                        }
                        $timeout(initSelect);
                        if (attrs.ngModel) {

                            if (attrs.ngModel && !angular.isDefined(scope.$eval(attrs.ngModel))) {
                                // This whole thing fixes that if initialized with undefined, then a ghost value option is inserted. If this thing wasn't done, then adding the 'watch' attribute could also fix it. #160
                                var hasChangedFromUndefined = false;
                                scope.$watch(attrs.ngModel, function (newVal, oldVal) {
                                    if (!hasChangedFromUndefined && angular.isDefined(scope.$eval(attrs.ngModel))) {
                                        hasChangedFromUndefined = true;
                                        initSelect(); // initSelect without arguments forces it to actually run.
                                    } else {
                                        initSelect(newVal, oldVal);
                                    }
                                });
                            } else {
                                scope.$watch(attrs.ngModel, initSelect);
                            }

                        }
                        if ("watch" in attrs) {
                            scope.$watch(function () {
                                return element[0].innerHTML;
                            }, function (newValue, oldValue) {
                                if (newValue !== oldValue) {
                                    $timeout(initSelect);
                                }
                            });
                        }

                        if(attrs.ngDisabled) {
                            scope.$watch(attrs.ngDisabled, initSelect)
                        }
                    }
                }
            };
        }]);

    /*
     Example usage, notice the empty dropdown tag in the dropdown trigger.
     <!-- Dropdown Trigger -->
     <a class='dropdown-button btn' href='javascript:void(0);' data-activates='demoDropdown'
        dropdown constrain-width="false">
        Select a demo
     </a>
     <!-- Dropdown Structure -->
     <ul id='demoDropdown' class='dropdown-content'>
     <li ng-repeat="demo in demoDefiniftions">
     <a href="javascript:void(0);" ng-click="selectDemo(demo)">{{demo.name}}</a>
     </li>
     </ul>*/
    angular.module("ui.materialize.dropdown", [])
        .directive("dropdown", ["$timeout", function ($timeout) {
            return {
                scope: {
                    inDuration: "@",
                    outDuration: "@",
                    constrainWidth: "@",
                    hover: "@",
                    alignment: "@",
                    gutter: "@",
                    belowOrigin: "@"
                },
                link: function (scope, element, attrs) {
                    $timeout(function () {
                        element.dropdown({
                            inDuration: (angular.isDefined(scope.inDuration)) ? scope.inDuration : undefined,
                            outDuration: (angular.isDefined(scope.outDuration)) ? scope.outDuration : undefined,
                            constrain_width: (angular.isDefined(scope.constrainWidth)) ? scope.constrainWidth : undefined,
                            hover: (angular.isDefined(scope.hover)) ? scope.hover : undefined,
                            alignment: (angular.isDefined(scope.alignment)) ? scope.alignment : undefined,
                            gutter: (angular.isDefined(scope.gutter)) ? scope.gutter : undefined,
                            belowOrigin: (angular.isDefined(scope.belowOrigin)) ? scope.belowOrigin : undefined
                        });
                    });
                }
            };
        }]);

    /**
     * Instead of adding the .input-field class to a div surrounding a label and input, add the attribute input-field.
     * That way it will also work when angular destroys/recreates the elements.
     *
     * Example:
     <inputfield style="margin-top:10px">
     <label>{{name}}:</label>
     <input type="text" name="{{name}}" ng-model="value">
     </inputfield>
     */
    angular.module("ui.materialize.inputfield", [])
        .directive('inputField', ["$timeout", function ($timeout) {
            var inputLabelIdCounter = 0;
            return {
                transclude: true,
                scope: {},
                link: function (scope, element) {
                    $timeout(function () {
                        var input = element.find("> > input, > > textarea");
                        var label = element.find("> > label");

                        if (input.length == 1 && label.length == 1 && !input.attr("id") && !label.attr("for")) {
                            var id = "angularMaterializeID" + inputLabelIdCounter++;
                            input.attr("id", id);
                            label.attr("for", id);
                        }

                        Materialize.updateTextFields();

                        // The "> > [selector]", is to restrict to only those tags that are direct children of the directive element. Otherwise we might hit to many elements with the selectors.

                        // Triggering autoresize of the textareas.
                        element.find("> > .materialize-textarea").each(function () {
                            var that = $(this);
                            that.addClass("materialize-textarea");
                            that.trigger("autoresize");
                            var model = that.attr("ng-model");
                            if (model) {
                                scope.$parent.$watch(model, function (a, b) {
                                    if (a !== b) {
                                        $timeout(function () {
                                            that.trigger("autoresize");
                                        });
                                    }
                                });
                            }
                        });

                        // Adding char-counters.
                        element.find('> > .materialize-textarea, > > input').each(function (index, countable) {
                            countable = angular.element(countable);
                            if (!countable.siblings('span[class="character-counter"]').length) {
                                countable.characterCounter();
                            }
                        });
                    });
                },
                template: '<div ng-transclude class="input-field"></div>'
            };
        }]);

    /**
     * Add pickadate directive
     * Type text is mandatory
     * Example:
     <input input-date
        type="text"
        name="created"
        id="inputCreated"
        ng-model="currentTime"
        format="dd/mm/yyyy"
        months-full="{{ monthFr }}"
        months-short="{{ monthShortFr }}"
        weekdays-full="{{ weekdaysFullFr }}"
        weekdays-short="{{ weekdaysShortFr }}"
        weekdays-letter="{{ weekdaysLetterFr }}"
        disable="disable"
        today="today"
        clear="clear"
        close="close"
        on-start="onStart()"
        on-render="onRender()"
        on-open="onOpen()"
        on-close="onClose()"
        on-set="onSet()"
        on-stop="onStop()" />
     */
    angular.module("ui.materialize.input_date", [])
        .directive('inputDate', ["$compile", "$timeout", function ($compile, $timeout) {
            // Fix for issue 46. This gotta be a bug in the materialize code, but this fixes it.
            var style = $('<style>#inputCreated_root {outline: none;}</style>');
            $('html > head').append(style);

            // Define Prototype Date format
            // Use like this
            // today = new Date();
            // var dateString = today.format("dd-m-yy");
            var dateFormat = function () {

                var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
                    timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
                    timezoneClip = /[^-+\dA-Z]/g,
                    pad = function (val, len) {
                        val = String(val);
                        len = len || 2;
                        while (val.length < len) {
                            val = "0" + val;
                        }
                        return val;
                    };

                // Regexes and supporting functions are cached through closure
                return function (date, mask, utc) {

                    var dF = dateFormat;

                    // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
                    if (arguments.length === 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
                        mask = date;
                        date = undefined;
                    }

                    // Passing date through Date applies Date.parse, if necessary
                    date = date ? new Date(date) : new Date();
                    if (isNaN(date)) throw SyntaxError("invalid date");

                    mask = String(dF.masks[mask] || mask || dF.masks["default"]);

                    // Allow setting the utc argument via the mask
                    if (mask.slice(0, 4) == "UTC:") {
                        mask = mask.slice(4);
                        utc = true;
                    }

                    var _ = utc ? "getUTC" : "get",
                        d = date[ _ + "Date" ](),
                        D = date[ _ + "Day" ](),
                        m = date[ _ + "Month" ](),
                        y = date[ _ + "FullYear" ](),
                        H = date[ _ + "Hours" ](),
                        M = date[ _ + "Minutes" ](),
                        s = date[ _ + "Seconds" ](),
                        L = date[ _ + "Milliseconds" ](),
                        o = utc ? 0 : date.getTimezoneOffset(),
                        flags = {
                            d:    d,
                            dd:   pad(d),
                            ddd:  dF.i18n.dayNames[D],
                            dddd: dF.i18n.dayNames[D + 7],
                            m:    m + 1,
                            mm:   pad(m + 1),
                            mmm:  dF.i18n.monthNames[m],
                            mmmm: dF.i18n.monthNames[m + 12],
                            yy:   String(y).slice(2),
                            yyyy: y,
                            h:    H % 12 || 12,
                            hh:   pad(H % 12 || 12),
                            H:    H,
                            HH:   pad(H),
                            M:    M,
                            MM:   pad(M),
                            s:    s,
                            ss:   pad(s),
                            l:    pad(L, 3),
                            L:    pad(L > 99 ? Math.round(L / 10) : L),
                            t:    H < 12 ? "a"  : "p",
                            tt:   H < 12 ? "am" : "pm",
                            T:    H < 12 ? "A"  : "P",
                            TT:   H < 12 ? "AM" : "PM",
                            Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                            o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                            S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
                        };

                    return mask.replace(token, function ($0) {
                        return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
                    });
                };
            }();

            // Some common format strings
            dateFormat.masks = {
               "default":      "ddd mmm dd yyyy HH:MM:ss",
                shortDate:      "m/d/yy",
                mediumDate:     "mmm d, yyyy",
                longDate:       "mmmm d, yyyy",
                fullDate:       "dddd, mmmm d, yyyy",
                shortTime:      "h:MM TT",
                mediumTime:     "h:MM:ss TT",
                longTime:       "h:MM:ss TT Z",
                isoDate:        "yyyy-mm-dd",
                isoTime:        "HH:MM:ss",
                isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
                isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
            };

            // Internationalization strings
            dateFormat.i18n = {
                dayNames: [
                    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
                    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
                ],
                monthNames: [
                    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
                    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
                ]
            };

            // For convenience...
            Date.prototype.format = function (mask, utc) {
                return dateFormat(this, mask, utc);
            };

            /**
             * Validate date object
             * @param  {Date}  date
             * @return {Boolean}
             */
            var isValidDate = function(date) {
                if( Object.prototype.toString.call(date) === '[object Date]' ) {
                    return !isNaN(date.getTime());
                }
                return false;
            };

            return {
                require: 'ngModel',
                scope: {
                    container: "@",
                    format: "@",
                    formatSubmit: "@",
                    monthsFull: "@",
                    monthsShort: "@",
                    weekdaysFull: "@",
                    weekdaysShort: "@",
                    weekdaysLetter: "@",
                    firstDay: "=",
                    disable: "=",
                    today: "=",
                    clear: "=",
                    close: "=",
                    selectYears: "=",
		    selectMonths: "=",
                    onStart: "&",
                    onRender: "&",
                    onOpen: "&",
                    onClose: "&",
                    onSet: "&",
                    onStop: "&",
                    ngReadonly: "=?",
                    max: "@",
                    min: "@"
                },
                link: function (scope, element, attrs, ngModelCtrl) {

                    ngModelCtrl.$formatters.unshift(function (modelValue) {
                        if (modelValue) {
                            var date = new Date(modelValue);
                            return (angular.isDefined(scope.format)) ? date.format(scope.format) : date.format('d mmmm, yyyy');
                        }
                        return null;
                    });

                    var monthsFull = (angular.isDefined(scope.monthsFull)) ? scope.$eval(scope.monthsFull) : undefined,
                        monthsShort = (angular.isDefined(scope.monthsShort)) ? scope.$eval(scope.monthsShort) : undefined,
                        weekdaysFull = (angular.isDefined(scope.weekdaysFull)) ? scope.$eval(scope.weekdaysFull) : undefined,
                        weekdaysShort = (angular.isDefined(scope.weekdaysShort)) ? scope.$eval(scope.weekdaysShort) : undefined,
                        weekdaysLetter = (angular.isDefined(scope.weekdaysLetter)) ? scope.$eval(scope.weekdaysLetter) : undefined;


                    $compile(element.contents())(scope);
                    if (!(scope.ngReadonly)) {
                        $timeout(function () {
                            var options = {
                                container : scope.container,
                                format: (angular.isDefined(scope.format)) ? scope.format : undefined,
                                formatSubmit: (angular.isDefined(scope.formatSubmit)) ? scope.formatSubmit : undefined,
                                monthsFull: (angular.isDefined(monthsFull)) ? monthsFull : undefined,
                                monthsShort: (angular.isDefined(monthsShort)) ? monthsShort : undefined,
                                weekdaysFull: (angular.isDefined(weekdaysFull)) ? weekdaysFull : undefined,
                                weekdaysShort: (angular.isDefined(weekdaysShort)) ? weekdaysShort : undefined,
                                weekdaysLetter: (angular.isDefined(weekdaysLetter)) ? weekdaysLetter : undefined,
                                firstDay: (angular.isDefined(scope.firstDay)) ? scope.firstDay : 0,
                                disable: (angular.isDefined(scope.disable)) ? scope.disable : undefined,
                                today: (angular.isDefined(scope.today)) ? scope.today : undefined,
                                clear: (angular.isDefined(scope.clear)) ? scope.clear : undefined,
                                close: (angular.isDefined(scope.close)) ? scope.close : undefined,
                                selectYears: (angular.isDefined(scope.selectYears)) ? scope.selectYears : undefined,
				selectMonths: (angular.isDefined(scope.selectMonths)) ? scope.selectMonths : undefined,
                                onStart: (angular.isDefined(scope.onStart)) ? function(){ scope.onStart(); } : undefined,
                                onRender: (angular.isDefined(scope.onRender)) ? function(){ scope.onRender(); } : undefined,
                                onOpen: (angular.isDefined(scope.onOpen)) ? function(){ scope.onOpen(); } : undefined,
                                onClose: (angular.isDefined(scope.onClose)) ? function(){ scope.onClose(); } : undefined,
                                onSet: (angular.isDefined(scope.onSet)) ? function(){ scope.onSet(); } : undefined,
                                onStop: (angular.isDefined(scope.onStop)) ? function(){ scope.onStop(); } : undefined
                            };
                            if (!scope.container) {
                                delete options.container;
                            }
                            var pickadateInput = element.pickadate(options);
                            //pickadate API
                            var picker = pickadateInput.pickadate('picker');

                            //watcher of min, max, and disabled dates
                            scope.$watch('max', function(newMax) {
                                if( picker ) {
                                    var maxDate = new Date(newMax);
                                    picker.set({max: isValidDate(maxDate) ? maxDate : false});
                                }
                            });
                            scope.$watch('min', function(newMin) {
                                if( picker ) {
                                    var minDate = new Date(newMin);
                                    picker.set({min: isValidDate(minDate) ? minDate : false});
                                }
                            });
                            scope.$watch('disable', function(newDisabled) {
                                if( picker ) {
                                    var disabledDates = angular.isDefined(newDisabled) && angular.isArray(newDisabled) ? newDisabled : false;
                                    picker.set({disable: disabledDates});
                                }
                            });
                        });
                    }
                }
            };
        }]);



    /**
     * time-picker directive
     * Example:
     <label for="input_starttime">Time</label>
     <input id="input_starttime" input-clock data-twelvehour="false" type="text">
     */
    angular.module("ui.materialize.input_clock", [])
        .directive('inputClock', [function () {
            return {
                restrict: 'A',
                scope: {
                    default: "@",
                    fromnow: "=?",
                    donetext: "@",
                    autoclose: "=?",
                    ampmclickable: "=?",
                    darktheme: "=?",
                    twelvehour: "=?",
                    vibrate: "=?"
                },
                link: function (scope, element) {
                    $(element).addClass("timepicker");
                    if (!(scope.ngReadonly)) {
                        element.pickatime({
                            default: (angular.isDefined(scope.default)) ? scope.default : '',
                            fromnow: (angular.isDefined(scope.fromnow)) ? scope.fromnow : 0,
                            donetext: (angular.isDefined(scope.donetext)) ? scope.donetext : 'Done',
                            autoclose: (angular.isDefined(scope.autoclose)) ? scope.autoclose : false,
                            ampmclickable: (angular.isDefined(scope.ampmclickable)) ? scope.ampmclickable : false,
                            darktheme: (angular.isDefined(scope.darktheme)) ? scope.darktheme : false,
                            twelvehour: (angular.isDefined(scope.twelvehour)) ? scope.twelvehour : true,
                            vibrate: (angular.isDefined(scope.vibrate)) ? scope.vibrate : true
                        });
                    }
                }
            };
        }]);



    /**
     * Example:
     <pagination
        page="1"
        page-size="10"
        total="100"
        pagination-action="changePage(page)"
        ul-class="customClass">
     * ul-class could be either an object or a string
     *
     * Based on https://github.com/brantwills/Angular-Paging
     */
    angular.module("ui.materialize.pagination", [])
        .directive('pagination', ["$sce", function ($sce) {

            // Assign null-able scope values from settings
            function setScopeValues(scope, attrs) {
                scope.List = [];
                scope.Hide = false;
                scope.page = parseInt(scope.page) || 1;
                scope.total = parseInt(scope.total) || 0;
                scope.dots = scope.dots || '...';
                scope.ulClass = scope.ulClass || attrs.ulClass || 'pagination';
                scope.adjacent = parseInt(scope.adjacent) || 2;
                scope.activeClass = 'active';
                scope.disabledClass = 'disabled';

                scope.scrollTop = scope.$eval(attrs.scrollTop);
                scope.hideIfEmpty = scope.$eval(attrs.hideIfEmpty);
                scope.showPrevNext = scope.$eval(attrs.showPrevNext);
                scope.useSimplePrevNext = scope.$eval(attrs.useSimplePrevNext);
            }

            // Validate and clean up any scope values
            // This happens after we have set the
            // scope values
            function validateScopeValues(scope, pageCount) {
                // Block where the page is larger than the pageCount
                if (scope.page > pageCount) {
                    scope.page = pageCount;
                }

                // Block where the page is less than 0
                if (scope.page <= 0) {
                    scope.page = 1;
                }

                // Block where adjacent value is 0 or below
                if (scope.adjacent <= 0) {
                    scope.adjacent = 2;
                }

                // Hide from page if we have 1 or less pages
                // if directed to hide empty
                if (pageCount <= 1) {
                    scope.Hide = scope.hideIfEmpty;
                }
            }

            // Internal Pagination Click Action
            function internalAction(scope, page) {
                page = page.valueOf();
                // Block clicks we try to load the active page
                if (scope.page == page) {
                    return;
                }

                // Update the page in scope and fire any paging actions
                scope.page = page;
                scope.paginationAction({
                    page: page
                });

                // If allowed scroll up to the top of the page
                if (scope.scrollTop) {
                    scrollTo(0, 0);
                }
            }

            // Add Range of Numbers
            function addRange(start, finish, scope) {
                var i = 0;
                for (i = start; i <= finish; i++) {
                    var item = {
                        value: $sce.trustAsHtml(i.toString()),
                        liClass: scope.page == i ? scope.activeClass : 'waves-effect',
                        action: function() {
                            internalAction(scope, this.value);
                        }
                    };

                    scope.List.push(item);
                }
            }

            // Add Dots ie: 1 2 [...] 10 11 12 [...] 56 57
            function addDots(scope) {
                scope.List.push({
                    value: $sce.trustAsHtml(scope.dots)
                });
            }

            // Add First Pages
            function addFirst(scope, next) {
                addRange(1, 2, scope);

                // We ignore dots if the next value is 3
                // ie: 1 2 [...] 3 4 5 becomes just 1 2 3 4 5
                if (next != 3) {
                    addDots(scope);
                }
            }

            /**
            * Add the first, previous, next, and last buttons if desired
            * The logic is defined by the mode of interest
            * This method will simply return if the scope.showPrevNext is false
            * This method will simply return if there are no pages to display
            *
            * @param {Object} scope - The local directive scope object
            * @param {int} pageCount - The last page number or total page count
            * @param {string} mode - The mode of interest either prev or last
            */
            function addPrevNext(scope, pageCount, mode){

                // Ignore if we are not showing
                // or there are no pages to display
                if (!scope.showPrevNext || pageCount < 1) { return; }

                // Local variables to help determine logic
                var disabled, alpha, beta;


                // Determine logic based on the mode of interest
                // Calculate the previous / next page and if the click actions are allowed
                if(mode === 'prev') {

                    disabled = scope.page - 1 <= 0;
                    var prevPage = scope.page - 1 <= 0 ? 1 : scope.page - 1;

                    if (scope.useSimplePrevNext) {
                        alpha = {value: "<<", title: 'First Page', page: 1};
                        beta = {value: "<", title: 'Previous Page', page: prevPage };
                    } else {
                        alpha = {value: "<i class=\"material-icons\">first_page</i>", title: 'First Page', page: 1};
                        beta = {value: "<i class=\"material-icons\">chevron_left</i>", title: 'Previous Page', page: prevPage };
                    }

                } else {

                    disabled = scope.page + 1 > pageCount;
                    var nextPage = scope.page + 1 >= pageCount ? pageCount : scope.page + 1;

                    if (scope.useSimplePrevNext) {
                        alpha = { value : ">", title: 'Next Page', page: nextPage };
                        beta = { value: ">>", title: 'Last Page', page: pageCount };
                    } else {
                        alpha = { value : "<i class=\"material-icons\">chevron_right</i>", title: 'Next Page', page: nextPage };
                        beta = { value: "<i class=\"material-icons\">last_page</i>", title: 'Last Page', page: pageCount };
                    }

                }

                // Create the Add Item Function
                var addItem = function(item, disabled){
                    scope.List.push({
                        value: $sce.trustAsHtml(item.value),
                        title: item.title,
                        liClass: disabled ? scope.disabledClass : '',
                        action: function(){
                            if(!disabled) {
                                internalAction(scope, item.page);
                            }
                        }
                    });
                };

                // Add our items
                addItem(alpha, disabled);
                addItem(beta, disabled);
            }

            function addLast(pageCount, scope, prev) {
                // We ignore dots if the previous value is one less that our start range
                // ie: 1 2 3 4 [...] 5 6  becomes just 1 2 3 4 5 6
                if (prev != pageCount -2) {
                    addDots(scope);
                }

                addRange(pageCount -1, pageCount, scope);
            }

            // Main build function
            function build(scope, attrs) {

                // Block divide by 0 and empty page size
                if (!scope.pageSize || scope.pageSize < 0)
                {
                    return;
                }

                // Assign scope values
                setScopeValues(scope, attrs);

                // local variables
                var start,
                    size = scope.adjacent * 2,
                    pageCount = Math.ceil(scope.total / scope.pageSize);

                // Validation Scope
                validateScopeValues(scope, pageCount);

                // Add the Next and Previous buttons to our list
                addPrevNext(scope, pageCount, 'prev');

                if (pageCount < (5 + size)) {

                    start = 1;
                    addRange(start, pageCount, scope);

                } else {

                    var finish;

                    if (scope.page <= (1 + size)) {

                        start = 1;
                        finish = 2 + size + (scope.adjacent - 1);

                        addRange(start, finish, scope);
                        addLast(pageCount, scope, finish);

                    } else if (pageCount - size > scope.page && scope.page > size) {

                        start = scope.page - scope.adjacent;
                        finish = scope.page + scope.adjacent;

                        addFirst(scope, start);
                        addRange(start, finish, scope);
                        addLast(pageCount, scope, finish);

                    } else {

                        start = pageCount - (1 + size + (scope.adjacent - 1));
                        finish = pageCount;

                        addFirst(scope, start);
                        addRange(start, finish, scope);

                    }
                }
                addPrevNext(scope, pageCount, 'next');
            }

            return {
                restrict: 'EA',
                scope: {
                    page: '=',
                    pageSize: '=',
                    total: '=',
                    dots: '@',
                    hideIfEmpty: '@',
                    adjacent: '@',
                    scrollTop: '@',
                    showPrevNext: '@',
                    useSimplePrevNext: '@',
                    paginationAction: '&',
                    ulClass: '=?'
                },
                template:
                    '<ul ng-hide="Hide" ng-class="ulClass"> ' +
                        '<li ' +
                        'ng-class="Item.liClass" ' +
                        'ng-click="Item.action()" ' +
                        'ng-repeat="Item in List"> ' +
                        '<a href> ' +
                        '<span ng-bind-html="Item.value"></span> ' +
                        '</a>' +
                    '</ul>',
                link: function (scope, element, attrs) {

                    // Hook in our watched items
                    scope.$watchCollection('[page, total, pageSize]', function () {
                        build(scope, attrs);
                    });
                }
            };
        }]);

    /*     example usage:
     <!-- Modal Trigger -->
     <a class='btn' data-target='demoModal' modal>show Modal</a>
     <!-- Modal Structure -->
     <div id="demoModal" class="modal">
     <div class="modal-content">
     <h4>Modal Header</h4>
     <p>A bunch of text</p>
     </div>
     <div class="modal-footer">
     <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
     </div>
     </div>
     */
    angular.module("ui.materialize.modal", [])
        .directive("modal", ["$compile", "$timeout", function ($compile, $timeout) {
            return {
                scope: {
                    dismissible: "=",
                    opacity: "@",
                    inDuration: "@",
                    outDuration: "@",
                    ready: '&?',
                    complete: '&?',
                    open: '=?',
                    enableTabs: '@?'
                },
                link: function (scope, element, attrs) {
                    $timeout(function () {
                        var modalEl = $(attrs.href ? attrs.href : '#' + attrs.target);
                        $compile(element.contents())(scope);

                        var complete = function () {
                            angular.isFunction(scope.complete) && scope.$apply(scope.complete);

                            scope.open = false;
                            scope.$apply();
                        };
                        var ready = function() {
                          angular.isFunction(scope.ready) && scope.$apply(scope.ready);
                          // Need to keep open boolean in sync.
                          scope.open = true;
                          scope.$apply();

                          // If tab support is enabled we need to re-init the tabs
                          // See https://github.com/Dogfalo/materialize/issues/1634
                          if (scope.enableTabs) {
                             modalEl.find('ul.tabs').tabs();
                          }
                        };
                        var options = {
                            dismissible: (angular.isDefined(scope.dismissible)) ? scope.dismissible : undefined,
                            opacity: (angular.isDefined(scope.opacity)) ? scope.opacity : undefined,
                            in_duration: (angular.isDefined(scope.inDuration)) ? scope.inDuration : undefined,
                            out_duration: (angular.isDefined(scope.outDuration)) ? scope.outDuration : undefined,
                            ready: ready,
                            complete: complete,
                        };
                        modalEl.modal(options);
                        element.modal(options);

                        // Setup watch for opening / closing modal programatically.
                        if (angular.isDefined(attrs.open) && modalEl.length > 0) {
                          scope.$watch('open', function(value, lastValue) {
                            if (!angular.isDefined(value)) { return; }
                            (value === true) ? modalEl.modal('open') : modalEl.modal('close');
                          });
                        }
                    });
                }
            };
        }]);


    /*     example usage:
    <!-- data-position can be : bottom, top, left, or right -->
    <!-- data-delay controls delay before tooltip shows (in milliseconds)-->
    <a class="btn" tooltipped data-position="bottom" data-delay="50" data-tooltip="I am tooltip">Hover me!</a>
     */
    angular.module("ui.materialize.tooltipped", [])
        .directive("tooltipped", ["$compile", "$timeout", function ($compile, $timeout) {
            return {
                restrict: "A",
                link: function (scope, element, attrs) {

                    var rmDestroyListener = Function.prototype; //assigning to noop

                    function init() {
                        element.addClass("tooltipped");
                        $compile(element.contents())(scope);

                        $timeout(function () {
                            // https://github.com/Dogfalo/materialize/issues/3546
                            // if element.addClass("tooltipped") would not be executed, then probably this would not be needed
                            if (element.attr('data-tooltip-id')){
                                element.tooltip('remove');
                            }
                            element.tooltip();
                        });
                        rmDestroyListener = scope.$on('$destroy', function () {
                            element.tooltip("remove");
                        });
                    }

                    attrs.$observe('tooltipped', function (value) {
                        if (value === 'false' && rmDestroyListener !== Function.prototype) {
                            element.tooltip("remove");
                            rmDestroyListener();
                            rmDestroyListener = Function.prototype;
                        } else if (value !== 'false' && rmDestroyListener === Function.prototype) {
                            init();
                        }
                    });

                    if (attrs.tooltipped !== 'false') {
                        init();
                    }

                    // just to be sure, that tooltip is removed when somehow element is destroyed, but the parent scope is not
                    element.on('$destroy', function() {
                        element.tooltip("remove");
                    });
                }
            };
        }]);

    /*     example usage:
    <!-- normal materialboxed -->
    <img materialboxed class="materialboxed responsive-img" width="650" src="images/sample-1.jpg">

    <!-- caption materialboxed -->
    <img materialboxed class="materialboxed" data-caption="A picture of some deer and tons of trees" width="250" src="iamges/nature_portrait_by_pw_fotografie-d63tx0n.jpg">

     */
    angular.module("ui.materialize.materialboxed", [])
        .directive("materialboxed", ["$timeout", function($timeout){
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {

                    $timeout(function(){
                        element.materialbox();
                    });

                }
            };
        }]);

    /* example usage:
        In controller:
            $scope.value = [30];
            $scope.value = 30;
            $scope.value = [30, 40];

        <div nouislider ng-model='value' min="0" max="100"></div>
        <div nouislider ng-model='value' connect="lower" min="0" max="100"></div> (green) bar beetwen one handle
        <div nouislider ng-model='value' connect="true" min="0" max="100"></div> (green) bar beetwen handles
    */
    angular.module("ui.materialize.nouislider", [])
        .directive("nouislider", ["$timeout", function($timeout){
            return {
                restrict: 'A',
                scope: {
                    ngModel: '=',
                    min: '@',
                    max: '@',
                    step: '@?',
                    connect: '@?',
                    tooltips: '@?',
                    behaviour: '@?'
                },
                link: function (scope, element, attrs) {
                    var modelIsArray = false;

                    var watchNgModel = scope.$watch('ngModel', function(newValue) {
                        if (newValue !== undefined) {
                            createNoUiSlider();
                            watchNgModel();
                        }
                    });

                    element[0].noUiSlider.on('update', function(values, input) {
                        $timeout(function() {
                            scope.ngModel = modelIsArray ? values : values[0];
                        });
                    });

                    function createNoUiSlider() {
                        if (angular.isArray(scope.ngModel)) {
                            modelIsArray = true;
                        }

                        noUiSlider.create(element[0], {
                            start: scope.ngModel || 0,
                            step: parseFloat(scope.step || 1),
                            tooltips: angular.isDefined(scope.tooltips) ? scope.tooltips : undefined,
                            connect: angular.isDefined(scope.connect) ? scope.connect : [false, false],
                            behaviour: angular.isDefined(scope.behaviour) ? scope.behaviour : undefined,
                            range: {
                                'min': parseFloat(scope.min || 0),
                                'max': parseFloat(scope.max || 100),
                            },
                            format: {
                                to: function (number) {
                                    return Math.round(number * 100) / 100;
                                },
                                from: function (number) {
                                    return Number(number);
                                }
                            }
                        });

                        function getConnection(value) {
                            value.toLowerCase();

                            if ('true' === value || 'false' === value) {
                                return JSON.parse(value);
                            }

                            return value;
                        }
                    };
                }
            };
        }]);

}(angular));
