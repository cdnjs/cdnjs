/*
Project: angular-gantt for AngularJS
Author: Marco Schweighauser
Contributors: Rémi Alvergnat
License: MIT.
Github: https://github.com/angular-gantt/angular-gantt
*/
(function(){
    'use strict';
    angular.module('gantt', ['gantt.templates', 'angularMoment'])
        .directive('gantt', ['Gantt', 'ganttOptions', 'GanttCalendar', 'moment', 'ganttMouseOffset', 'ganttDebounce', 'ganttEnableNgAnimate', '$timeout', '$templateCache', function(Gantt, Options, Calendar, moment, mouseOffset, debounce, enableNgAnimate, $timeout, $templateCache) {
        return {
            restrict: 'EA',
            transclude: true,
            templateUrl: function(tElement, tAttrs) {
                var templateUrl;
                if (tAttrs.templateUrl === undefined) {
                    templateUrl = 'template/gantt.tmpl.html';
                } else {
                    templateUrl = tAttrs.templateUrl;
                }
                if (tAttrs.template !== undefined) {
                    $templateCache.put(templateUrl, tAttrs.template);
                }
                return templateUrl;
            },
            scope: {
                sortMode: '=?', // Possible modes: 'name', 'date', 'custom'
                filterTask: '=?', // Task filter as a angularJS expression
                filterTaskComparator: '=?', // Comparator to use for the task filter
                filterRow: '=?', // Row filter as a angularJS expression
                filterRowComparator: '=?', // Comparator to use for the row filter
                viewScale: '=?', // Possible scales: 'hour', 'day', 'week', 'month'
                columnWidth: '=?', // Defines the size of a column, 1 being 1em per unit (hour or day, .. depending on scale),
                allowLabelsResizing: '=?', // Set to true if the user should be able to resize the label section.
                fromDate: '=?', // If not specified will use the earliest task date (note: as of now this can only expand not shrink)
                toDate: '=?', // If not specified will use the latest task date (note: as of now this can only expand not shrink)
                currentDateValue: '=?', // If specified, the current date will be displayed
                currentDate: '=?', // The display of currentDate ('none', 'line' or 'column').
                autoExpand: '=?', // Set this both, left or right if the date range shall expand if the user scroll to the left or right end. Otherwise set to false or none.
                taskOutOfRange: '=?', // Set this to expand or truncate to define the behavior of tasks going out of visible range.
                maxHeight: '=?', // Define the maximum height of the Gantt in PX. > 0 to activate max height behaviour.
                labelsWidth: '=?', // Define the width of the labels section. Changes when the user is resizing the labels width
                showLabelsColumn: '=?', // Whether to show column with labels or not. Default (true)
                showTooltips: '=?', // True when tooltips shall be enabled. Default (true)
                headers: '=?', // An array of units for headers.
                headersFormats: '=?', // An array of corresponding formats for headers.
                timeFrames: '=?',
                dateFrames: '=?',
                timeFramesWorkingMode: '=?',
                timeFramesNonWorkingMode: '=?',
                timespans: '=?',
                columnMagnet: '=?',
                data: '=?',
                api: '=?',
                options: '=?'
            },
            controller: ['$scope', '$element', function($scope, $element) {
                for (var option in $scope.options) {
                    $scope[option] = $scope.options[option];
                }

                Options.initialize($scope);

                // Disable animation if ngAnimate is present, as it drops down performance.
                enableNgAnimate(false, $element);

                $scope.gantt = new Gantt($scope, $element);
                this.gantt = $scope.gantt;
            }],
            link: function(scope, element) {
                // Gantt is initialized. Signal that the Gantt is ready.
                scope.gantt.api.core.raise.ready(scope.gantt.api);

                scope.gantt.api.directives.raise.new('gantt', scope, element);
                scope.$on('$destroy', function() {
                    scope.gantt.api.directives.raise.destroy('gantt', scope, element);
                });

                $timeout(function() {
                    scope.gantt.rendered = true;
                    scope.gantt.columnsManager.generateColumns();
                    scope.gantt.api.core.raise.rendered(scope.gantt.api);
                });
            }
        };
    }]);
}());


// This file is adapted from Angular UI ngGrid project
// MIT License
// https://github.com/angular-ui/ng-grid/blob/v3.0.0-rc.12/src/js/core/factories/GridApi.js
(function() {
    'use strict';
    angular.module('gantt')
        .factory('GanttApi', ['$q', '$rootScope', 'ganttUtils',
            function($q, $rootScope, utils) {
                /**
                 * @ngdoc function
                 * @name gantt.class:GanttApi
                 * @description GanttApi provides the ability to register public methods events inside the gantt and allow
                 * for other components to use the api via featureName.methodName and featureName.on.eventName(function(args){}
                 * @param {object} gantt gantt that owns api
                 */
                var GanttApi = function GanttApi(gantt) {
                    this.gantt = gantt;
                    this.listeners = [];
                    this.apiId = utils.newId();
                };

                /**
                 * @ngdoc function
                 * @name gantt.class:suppressEvents
                 * @methodOf gantt.class:GanttApi
                 * @description Used to execute a function while disabling the specified event listeners.
                 * Disables the listenerFunctions, executes the callbackFn, and then enables
                 * the listenerFunctions again
                 * @param {object} listenerFuncs listenerFunc or array of listenerFuncs to suppress. These must be the same
                 * functions that were used in the .on.eventName method
                 * @param {object} callBackFn function to execute
                 * @example
                 * <pre>
                 *    var navigate = function (newRowCol, oldRowCol){
                 *       //do something on navigate
                 *    }
                 *
                 *    ganttApi.cellNav.on.navigate(scope,navigate);
                 *
                 *
                 *    //call the scrollTo event and suppress our navigate listener
                 *    //scrollTo will still raise the event for other listeners
                 *    ganttApi.suppressEvents(navigate, function(){
                 *       ganttApi.cellNav.scrollTo(aRow, aCol);
                 *    });
                 *
                 * </pre>
                 */
                GanttApi.prototype.suppressEvents = function(listenerFuncs, callBackFn) {
                    var self = this;
                    var listeners = angular.isArray(listenerFuncs) ? listenerFuncs : [listenerFuncs];

                    //find all registered listeners
                    var foundListeners = [];
                    listeners.forEach(function(l) {
                        foundListeners = self.listeners.filter(function(lstnr) {
                            return l === lstnr.handler;
                        });
                    });

                    //deregister all the listeners
                    foundListeners.forEach(function(l) {
                        l.dereg();
                    });

                    callBackFn();

                    //reregister all the listeners
                    foundListeners.forEach(function(l) {
                        l.dereg = registerEventWithAngular(l.scope, l.eventId, l.handler, self.gantt);
                    });

                };

                /**
                 * @ngdoc function
                 * @name registerEvent
                 * @methodOf gantt.class:GanttApi
                 * @description Registers a new event for the given feature
                 * @param {string} featureName name of the feature that raises the event
                 * @param {string} eventName  name of the event
                 */
                GanttApi.prototype.registerEvent = function(featureName, eventName) {
                    var self = this;
                    if (!self[featureName]) {
                        self[featureName] = {};
                    }

                    var feature = self[featureName];
                    if (!feature.on) {
                        feature.on = {};
                        feature.raise = {};
                    }

                    var eventId = 'event:gantt:' + this.apiId + ':' + featureName + ':' + eventName;

                    feature.raise[eventName] = function() {
                        $rootScope.$broadcast.apply($rootScope, [eventId].concat(Array.prototype.slice.call(arguments)));
                    };

                    feature.on[eventName] = function(scope, handler) {
                        var dereg = registerEventWithAngular(scope, eventId, handler, self.gantt);

                        //track our listener so we can turn off and on
                        var listener = {handler: handler, dereg: dereg, eventId: eventId, scope: scope};
                        self.listeners.push(listener);

                        //destroy tracking when scope is destroyed
                        //wanted to remove the listener from the array but angular does
                        //strange things in scope.$destroy so I could not access the listener array
                        scope.$on('$destroy', function() {
                            listener.dereg = null;
                            listener.handler = null;
                            listener.eventId = null;
                            listener.scope = null;
                        });
                    };
                };

                function registerEventWithAngular(scope, eventId, handler, gantt) {
                    return scope.$on(eventId, function() {
                        var args = Array.prototype.slice.call(arguments);
                        args.splice(0, 1); //remove evt argument
                        handler.apply(gantt.api, args);
                    });
                }

                /**
                 * @ngdoc function
                 * @name registerEventsFromObject
                 * @methodOf gantt.class:GanttApi
                 * @description Registers features and events from a simple objectMap.
                 * eventObjectMap must be in this format (multiple features allowed)
                 * <pre>
                 * {featureName:
                 *        {
                 *          eventNameOne:function(args){},
                 *          eventNameTwo:function(args){}
                 *        }
                 *  }
                 * </pre>
                 * @param {object} eventObjectMap map of feature/event names
                 */
                GanttApi.prototype.registerEventsFromObject = function(eventObjectMap) {
                    var self = this;
                    var features = [];
                    angular.forEach(eventObjectMap, function(featProp, featPropName) {
                        var feature = {name: featPropName, events: []};
                        angular.forEach(featProp, function(prop, propName) {
                            feature.events.push(propName);
                        });
                        features.push(feature);
                    });

                    features.forEach(function(feature) {
                        feature.events.forEach(function(event) {
                            self.registerEvent(feature.name, event);
                        });
                    });

                };

                /**
                 * @ngdoc function
                 * @name registerMethod
                 * @methodOf gantt.class:GanttApi
                 * @description Registers a new event for the given feature
                 * @param {string} featureName name of the feature
                 * @param {string} methodName  name of the method
                 * @param {object} callBackFn function to execute
                 * @param {object} thisArg binds callBackFn 'this' to thisArg.  Defaults to ganttApi.gantt
                 */
                GanttApi.prototype.registerMethod = function(featureName, methodName, callBackFn, thisArg) {
                    if (!this[featureName]) {
                        this[featureName] = {};
                    }

                    var feature = this[featureName];

                    feature[methodName] = utils.createBoundedWrapper(thisArg || this.gantt, callBackFn);
                };

                /**
                 * @ngdoc function
                 * @name registerMethodsFromObject
                 * @methodOf gantt.class:GanttApi
                 * @description Registers features and methods from a simple objectMap.
                 * eventObjectMap must be in this format (multiple features allowed)
                 * <br>
                 * {featureName:
                 *        {
                 *          methodNameOne:function(args){},
                 *          methodNameTwo:function(args){}
                 *        }
                 * @param {object} eventObjectMap map of feature/event names
                 * @param {object} thisArg binds this to thisArg for all functions.  Defaults to GanttApi.gantt
                 */
                GanttApi.prototype.registerMethodsFromObject = function(methodMap, thisArg) {
                    var self = this;
                    var features = [];
                    angular.forEach(methodMap, function(featProp, featPropName) {
                        var feature = {name: featPropName, methods: []};
                        angular.forEach(featProp, function(prop, propName) {
                            feature.methods.push({name: propName, fn: prop});
                        });
                        features.push(feature);
                    });

                    features.forEach(function(feature) {
                        feature.methods.forEach(function(method) {
                            self.registerMethod(feature.name, method.name, method.fn, thisArg);
                        });
                    });

                };

                return GanttApi;

            }]);

})();

(function(){
    'use strict';
    angular.module('gantt').factory('ganttOptions', ['moment', function(moment) {
        return {initialize: function(options) {
            options.api = options.api || angular.noop();

            options.data = options.data || [];

            options.timespans = options.timespans || [];

            options.sortMode = options.sortMode || undefined;

            options.filterTask = options.filterTask || undefined;
            options.filterTaskComparator = options.filterTaskComparator || undefined;

            options.filterRow = options.filterRow || undefined;
            options.filterRowComparator = options.filterRowComparator || undefined;

            options.viewScale = options.viewScale || 'day';
            options.columnMagnet = options.columnMagnet || '15 minutes';
            options.columnWidth = options.columnWidth || undefined;

            options.fromDate = options.fromDate || undefined;
            options.toDate = options.toDate || undefined;

            options.allowLabelsResizing = options.allowLabelsResizing !== undefined ? !!options.allowLabelsResizing : true;

            options.currentDate = options.currentDate || 'line';
            options.currentDateValue = options.currentDateValue || moment();

            options.autoExpand = options.autoExpand || 'none';
            options.taskOutOfRange = options.taskOutOfRange || 'truncate';

            options.maxHeight = options.maxHeight || 0;

            options.labelsWidth = options.labelsWidth || undefined;

            options.showLabelsColumn = options.showLabelsColumn !== undefined ? !!options.showLabelsColumn : true;
            options.showTooltips = options.showTooltips !== undefined ? !!options.showTooltips : true;

            options.headers = options.headers || undefined;
            options.headersFormats = options.headersFormats || undefined;

            options.timeFrames = options.timeFrames || [];
            options.dateFrames = options.dateFrames || [];

            options.timeFramesWorkingMode = options.timeFramesWorkingMode || 'hidden';
            options.timeFramesNonWorkingMode = options.timeFramesNonWorkingMode || 'visible';

            return options;
        }
        };
    }]);
}());

(function(){
    'use strict';
    /**
     * Calendar factory is used to define working periods, non working periods, and other specific period of time,
     * and retrieve effective timeFrames for each day of the gantt.
     */
    angular.module('gantt').factory('GanttCalendar', ['$filter', 'moment', function($filter, moment) {
        /**
         * TimeFrame represents time frame in any day. parameters are given using options object.
         *
         * @param {moment|string} start start of timeFrame. If a string is given, it will be parsed as a moment.
         * @param {moment|string} end end of timeFrame. If a string is given, it will be parsed as a moment.
         * @param {boolean} working is this timeFrame flagged as working.
         * @param {boolean} default is this timeFrame will be used as default.
         * @param {color} css color attached to this timeFrame.
         * @param {string} classes css classes attached to this timeFrame.
         *
         * @constructor
         */
        var TimeFrame = function(options) {
            if (options === undefined) {
                options = {};
            }

            this.start = options.start;
            this.end = options.end;
            this.working = options.working;
            this.default = options.default;
            this.color = options.color;
            this.classes = options.classes;
        };

        TimeFrame.prototype.updateView = function() {
            if (this.$element) {
                if (this.left !== undefined) {
                    this.$element.css('left', this.left + 'px');
                } else {
                    this.$element.css('left', '');
                }
                if (this.width !== undefined) {
                    this.$element.css('width', this.width + 'px');
                } else {
                    this.$element.css('width', '');
                }

                if (this.color !== undefined) {
                    this.$element.css('background-color', this.color);
                } else {
                    this.$element.css('background-color', '');
                }

                var classes = ['gantt-timeframe' + (this.working ? '' : '-non') + '-working'];
                if (this.classes) {
                    classes = classes.concat(this.classes);
                }
                for (var i= 0, l=classes.length; i<l; i++) {
                    this.$element.toggleClass(classes[i], true);
                }
            }
        };

        TimeFrame.prototype.getDuration = function() {
            return this.end.diff(this.start, 'milliseconds');
        };

        TimeFrame.prototype.clone = function() {
            return new TimeFrame(this);
        };

        /**
         * TimeFrameMapping defines how timeFrames will be placed for each days. parameters are given using options object.
         *
         * @param {function} func a function with date parameter, that will be evaluated for each distinct day of the gantt.
         *                        this function must return an array of timeFrame names to apply.
         * @constructor
         */
        var TimeFrameMapping = function(func) {
            this.func = func;
        };

        TimeFrameMapping.prototype.getTimeFrames = function(date) {
            var ret = this.func(date);
            if (!(ret instanceof Array)) {
                ret = [ret];
            }
            return ret;
        };

        TimeFrameMapping.prototype.clone = function() {
            return new TimeFrameMapping(this.func);
        };

        /**
         * A DateFrame is date range that will use a specific TimeFrameMapping, configured using a function (evaluator),
         * a date (date) or a date range (start, end). parameters are given using options object.
         *
         * @param {function} evaluator a function with date parameter, that will be evaluated for each distinct day of the gantt.
         *                   this function must return a boolean representing matching of this dateFrame or not.
         * @param {moment} date date of dateFrame.
         * @param {moment} start start of date frame.
         * @param {moment} end end of date frame.
         * @param {array} targets array of TimeFrameMappings/TimeFrames names to use for this date frame.
         * @param {boolean} default is this dateFrame will be used as default.
         * @constructor
         */
        var DateFrame = function(options) {
            this.evaluator = options.evaluator;
            if (options.date) {
                this.start = moment(options.date).startOf('day');
                this.end = moment(options.date).endOf('day');
            } else {
                this.start = options.start;
                this.end = options.end;
            }
            if (options.targets instanceof Array) {
                this.targets = options.targets;
            } else {
                this.targets = [options.targets];
            }
            this.default = options.default;
        };

        DateFrame.prototype.dateMatch = function(date) {
            if (this.evaluator) {
                return this.evaluator(date);
            } else if (this.start && this.end) {
                return date >= this.start && date <= this.end;
            } else {
                return false;
            }
        };

        DateFrame.prototype.clone = function() {
            return new DateFrame(this);
        };



        /**
         * Register TimeFrame, TimeFrameMapping and DateMapping objects into Calendar object,
         * and use Calendar#getTimeFrames(date) function to retrieve effective timeFrames for a specific day.
         *
         * @constructor
         */
        var Calendar = function() {
            this.timeFrames = {};
            this.timeFrameMappings = {};
            this.dateFrames = {};
        };

        /**
         * Remove all objects.
         */
        Calendar.prototype.clear = function() {
            this.timeFrames = {};
            this.timeFrameMappings = {};
            this.dateFrames = {};
        };

        /**
         * Register TimeFrame objects.
         *
         * @param {object} timeFrames with names of timeFrames for keys and TimeFrame objects for values.
         */
        Calendar.prototype.registerTimeFrames = function(timeFrames) {
            angular.forEach(timeFrames, function(timeFrame, name) {
                this.timeFrames[name] = new TimeFrame(timeFrame);
            }, this);
        };

        /**
         * Removes TimeFrame objects.
         *
         * @param {array} timeFrames names of timeFrames to remove.
         */
        Calendar.prototype.removeTimeFrames = function(timeFrames) {
            angular.forEach(timeFrames, function(name) {
                delete this.timeFrames[name];
            }, this);
        };

        /**
         * Remove all TimeFrame objects.
         */
        Calendar.prototype.clearTimeFrames = function() {
            this.timeFrames = {};
        };

        /**
         * Register TimeFrameMapping objects.
         *
         * @param {object} mappings object with names of timeFrames mappings for keys and TimeFrameMapping objects for values.
         */
        Calendar.prototype.registerTimeFrameMappings = function(mappings) {
            angular.forEach(mappings, function(timeFrameMapping, name) {
                this.timeFrameMappings[name] = new TimeFrameMapping(timeFrameMapping);
            }, this);
        };

        /**
         * Removes TimeFrameMapping objects.
         *
         * @param {array} mappings names of timeFrame mappings to remove.
         */
        Calendar.prototype.removeTimeFrameMappings = function(mappings) {
            angular.forEach(mappings, function(name) {
                delete this.timeFrameMappings[name];
            }, this);
        };

        /**
         * Removes all TimeFrameMapping objects.
         */
        Calendar.prototype.clearTimeFrameMappings = function() {
            this.timeFrameMappings = {};
        };

        /**
         * Register DateFrame objects.
         *
         * @param {object} dateFrames object with names of dateFrames for keys and DateFrame objects for values.
         */
        Calendar.prototype.registerDateFrames = function(dateFrames) {
            angular.forEach(dateFrames, function(dateFrame, name) {
                this.dateFrames[name] = new DateFrame(dateFrame);
            }, this);
        };

        /**
         * Remove DateFrame objects.
         *
         * @param {array} mappings names of date frames to remove.
         */
        Calendar.prototype.removeDateFrames = function(dateFrames) {
            angular.forEach(dateFrames, function(name) {
                delete this.dateFrames[name];
            }, this);
        };

        /**
         * Removes all DateFrame objects.
         */
        Calendar.prototype.clearDateFrames = function() {
            this.dateFrames = {};
        };

        var filterDateFrames = function(inputDateFrames, date) {
            var dateFrames = [];
            angular.forEach(inputDateFrames, function(dateFrame) {
                if (dateFrame.dateMatch(date)) {
                    dateFrames.push(dateFrame);
                }
            });
            if (dateFrames.length === 0) {
                angular.forEach(inputDateFrames, function(dateFrame) {
                    if (dateFrame.default) {
                        dateFrames.push(dateFrame);
                    }
                });
            }
            return dateFrames;
        };

        /**
         * Retrieves TimeFrame objects for a given date, using whole configuration for this Calendar object.
         *
         * @param {moment} date
         *
         * @return {array} an array of TimeFrame objects.
         */
        Calendar.prototype.getTimeFrames = function(date) {
            var timeFrames = [];
            var dateFrames = filterDateFrames(this.dateFrames, date);

            angular.forEach(dateFrames, function(dateFrame) {
                if (dateFrame !== undefined) {
                    angular.forEach(dateFrame.targets, function(timeFrameMappingName) {
                        var timeFrameMapping = this.timeFrameMappings[timeFrameMappingName];
                        if (timeFrameMapping !== undefined) {
                            // If a timeFrame mapping is found
                            timeFrames.push(timeFrameMapping.getTimeFrames());
                        } else {
                            // If no timeFrame mapping is found, try using direct timeFrame
                            var timeFrame = this.timeFrames[timeFrameMappingName];
                            if (timeFrame !== undefined) {
                                timeFrames.push(timeFrame);
                            }
                        }
                    }, this);
                }
            }, this);

            var dateYear = date.year();
            var dateMonth = date.month();
            var dateDate = date.date();

            var validatedTimeFrames = [];
            if (timeFrames.length === 0) {
                angular.forEach(this.timeFrames, function(timeFrame) {
                    if (timeFrame.default) {
                        timeFrames.push(timeFrame);
                    }
                });
            }

            angular.forEach(timeFrames, function(timeFrame) {
                timeFrame = timeFrame.clone();

                if (timeFrame.start !== undefined) {
                    timeFrame.start.year(dateYear);
                    timeFrame.start.month(dateMonth);
                    timeFrame.start.date(dateDate);
                }

                if (timeFrame.end !== undefined) {
                    timeFrame.end.year(dateYear);
                    timeFrame.end.month(dateMonth);
                    timeFrame.end.date(dateDate);

                    if (moment(timeFrame.end).startOf('day') === timeFrame.end) {
                        timeFrame.end.add(1, 'day');
                    }
                }

                validatedTimeFrames.push(timeFrame);
            });

            return validatedTimeFrames;
        };

        /**
         * Solve timeFrames using two rules.
         *
         * 1) If at least one working timeFrame is defined, everything outside
         * defined timeFrames is considered as non-working. Else it's considered
         * as working.
         *
         * 2) Smaller timeFrames have priority over larger one.
         *
         * @param {array} timeFrames Array of timeFrames to solve
         * @param {moment} startDate
         * @param {moment} endDate
         */
        Calendar.prototype.solve = function(timeFrames, startDate, endDate) {
            var defaultWorking = timeFrames.length === 0;
            var color;
            var classes;
            var minDate;
            var maxDate;

            angular.forEach(timeFrames, function(timeFrame) {
                if (minDate === undefined || minDate > timeFrame.start) {
                    minDate = timeFrame.start;
                }
                if (maxDate === undefined || maxDate < timeFrame.end) {
                    maxDate = timeFrame.end;
                }
                if (color === undefined && timeFrame.color) {
                    color = timeFrame.color;
                }
                if (timeFrame.classes !== undefined) {
                    if (classes === undefined) {
                        classes = [];
                    }
                    classes = classes.concat(timeFrame.classes);
                }
            });

            if (startDate === undefined) {
                startDate = minDate;
            }

            if (endDate === undefined) {
                endDate = maxDate;
            }

            var solvedTimeFrames = [new TimeFrame({start: startDate, end: endDate, working: defaultWorking, color: color, classes: classes})];

            var orderedTimeFrames = $filter('orderBy')(timeFrames, function(timeFrame) {
                return -timeFrame.getDuration();
            });

            angular.forEach(orderedTimeFrames, function(timeFrame) {
                var tmpSolvedTimeFrames = solvedTimeFrames.slice();

                var i=0;
                var dispatched = false;
                var treated = false;
                angular.forEach(solvedTimeFrames, function(solvedTimeFrame) {
                    if (!treated) {
                        if (timeFrame.end > solvedTimeFrame.start && timeFrame.start < solvedTimeFrame.end) {
                            // timeFrame is included in this solvedTimeFrame.
                            // solvedTimeFrame:|ssssssssssssssssssssssssssssssssss|
                            //       timeFrame:          |tttttt|
                            //          result:|sssssssss|tttttt|sssssssssssssssss|

                            timeFrame = timeFrame.clone();
                            var newSolvedTimeFrame = solvedTimeFrame.clone();

                            solvedTimeFrame.end = moment(timeFrame.start);
                            newSolvedTimeFrame.start = moment(timeFrame.end);

                            tmpSolvedTimeFrames.splice(i + 1, 0, timeFrame.clone(), newSolvedTimeFrame);
                            treated = true;
                        } else if (!dispatched && timeFrame.start < solvedTimeFrame.end) {
                            // timeFrame is dispatched on two solvedTimeFrame.
                            // First part
                            // solvedTimeFrame:|sssssssssssssssssssssssssssssssssss|s+1;s+1;s+1;s+1;s+1;s+1|
                            //       timeFrame:                                |tttttt|
                            //          result:|sssssssssssssssssssssssssssssss|tttttt|;s+1;s+1;s+1;s+1;s+1|

                            timeFrame = timeFrame.clone();

                            solvedTimeFrame.end = moment(timeFrame.start);
                            tmpSolvedTimeFrames.splice(i + 1, 0, timeFrame);

                            dispatched = true;
                        } else if (dispatched && timeFrame.end > solvedTimeFrame.start) {
                            // timeFrame is dispatched on two solvedTimeFrame.
                            // Second part

                            solvedTimeFrame.start = moment(timeFrame.end);
                            dispatched = false;
                            treated = true;
                        }
                        i++;
                    }
                });

                solvedTimeFrames = tmpSolvedTimeFrames;
            });

            solvedTimeFrames = $filter('filter')(solvedTimeFrames, function(timeFrame) {
                return (timeFrame.start === undefined || timeFrame.start < endDate) && (timeFrame.end === undefined || timeFrame.end > startDate);
            });

            return solvedTimeFrames;

        };

        return Calendar;
    }]);
}());

(function(){
    'use strict';
    angular.module('gantt').factory('GanttCurrentDateManager', [function() {
        var GanttCurrentDateManager = function(gantt) {
            var self = this;

            this.gantt = gantt;

            this.date = undefined;
            this.position = undefined;
            this.currentDateColumn = undefined;

            this.gantt.$scope.$watchGroup(['currentDate', 'currentDateValue'], function() {
                self.setCurrentDate(self.gantt.$scope.currentDateValue);
            });
        };

        GanttCurrentDateManager.prototype.setCurrentDate = function(currentDate) {
            this.date = currentDate;
            if (this.currentDateColumn !== undefined) {
                if (this.currentDateColumn.$element !== undefined) {
                    this.currentDateColumn.$element.removeClass('gantt-foreground-col-current-date');
                }
                delete this.currentDateColumn;
            }

            if (this.date !== undefined) {
                var column = this.gantt.columnsManager.getColumnByDate(this.date);
                if (column !== undefined) {
                    this.currentDateColumn = column;
                    if (this.gantt.$scope.currentDate === 'column' && this.currentDateColumn.$element !== undefined) {
                        this.currentDateColumn.$element.addClass('gantt-foreground-col-current-date');
                    }
                }
            }

            this.position = this.gantt.getPositionByDate(this.date);
        };
        return GanttCurrentDateManager;
    }]);
    /* code */
}());

(function(){
    'use strict';
    angular.module('gantt').factory('GanttColumn', [ 'moment', function(moment) {
        // Used to display the Gantt grid and header.
        // The columns are generated by the column generator.
        var Column = function(date, endDate, left, width, calendar, timeFramesWorkingMode, timeFramesNonWorkingMode, columnMagnetValue, columnMagnetUnit) {
            this.date = date;
            this.endDate = endDate;
            this.left = left;
            this.width = width;
            this.calendar = calendar;
            this.duration = this.endDate.diff(this.date, 'milliseconds');
            this.timeFramesWorkingMode = timeFramesWorkingMode;
            this.timeFramesNonWorkingMode = timeFramesNonWorkingMode;
            this.timeFrames = [];
            this.visibleTimeFrames = [];
            this.daysTimeFrames = {};
            this.cropped = false;
            this.columnMagnetValue = columnMagnetValue;
            this.columnMagnetUnit = columnMagnetUnit;
            this.originalSize = {left: this.left, width: this.width};
            this.updateTimeFrames();
            this.updateView();
        };

        var getDateKey = function(date) {
            return date.year() + '-' + date.month() + '-' + date.date();
        };

        Column.prototype.updateView = function() {
            if (this.$element) {
                this.$element.css('left', this.left + 'px');
                this.$element.css('width', this.width + 'px');

                for (var i= 0, l = this.timeFrames.length; i<l;i++) {
                    this.timeFrames[i].updateView();
                }
            }
        };

        Column.prototype.updateTimeFrames = function() {
            var self = this;

            if (self.calendar !== undefined && (self.timeFramesNonWorkingMode !== 'hidden' || self.timeFramesWorkingMode !== 'hidden')) {
                var buildPushTimeFrames = function(timeFrames, startDate, endDate) {
                    return function(timeFrame) {
                        var start = timeFrame.start;
                        if (start === undefined) {
                            start = startDate;
                        }

                        var end = timeFrame.end;
                        if (end === undefined) {
                            end = endDate;
                        }

                        if (start < self.date) {
                            start = self.date;
                        }

                        if (end > self.endDate) {
                            end = self.endDate;
                        }

                        timeFrame = timeFrame.clone();

                        timeFrame.start = moment(start);
                        timeFrame.end = moment(end);

                        timeFrames.push(timeFrame);
                    };
                };

                var cDate = self.date;
                var cDateStartOfDay = moment(cDate).startOf('day');
                var cDateNextDay = cDateStartOfDay.add(1, 'day');
                while (cDate < self.endDate) {
                    var timeFrames = self.calendar.getTimeFrames(cDate);
                    var nextCDate = moment.min(cDateNextDay, self.endDate);
                    timeFrames = self.calendar.solve(timeFrames, cDate, nextCDate);
                    var cTimeFrames = [];
                    angular.forEach(timeFrames, buildPushTimeFrames(cTimeFrames, cDate, nextCDate));
                    self.timeFrames = self.timeFrames.concat(cTimeFrames);

                    var cDateKey = getDateKey(cDate);
                    self.daysTimeFrames[cDateKey] = cTimeFrames;

                    cDate = nextCDate;
                    cDateStartOfDay = moment(cDate).startOf('day');
                    cDateNextDay = cDateStartOfDay.add(1, 'day');
                }

                angular.forEach(self.timeFrames, function(timeFrame) {
                    var positionDuration = timeFrame.start.diff(self.date, 'milliseconds');
                    var position = positionDuration / self.duration * self.width;

                    var timeFrameDuration = timeFrame.end.diff(timeFrame.start, 'milliseconds');
                    var timeFramePosition = timeFrameDuration / self.duration * self.width;

                    var hidden = false;
                    if (timeFrame.working && self.timeFramesWorkingMode !== 'visible') {
                        hidden = true;
                    } else if (!timeFrame.working && self.timeFramesNonWorkingMode !== 'visible') {
                        hidden = true;
                    }

                    if (!hidden) {
                        self.visibleTimeFrames.push(timeFrame);
                    }

                    timeFrame.hidden = hidden;
                    timeFrame.left = position;
                    timeFrame.width = timeFramePosition;
                    timeFrame.originalSize = {left: timeFrame.left, width: timeFrame.width};
                    timeFrame.updateView();
                });

                if (self.timeFramesNonWorkingMode === 'cropped' || self.timeFramesWorkingMode === 'cropped') {
                    var timeFramesWidth = 0;
                    angular.forEach(self.timeFrames, function(timeFrame) {
                        if (!timeFrame.working && self.timeFramesNonWorkingMode !== 'cropped' ||
                            timeFrame.working && self.timeFramesWorkingMode !== 'cropped') {
                            timeFramesWidth += timeFrame.width;
                        }
                    });

                    if (timeFramesWidth !== self.width) {
                        var croppedRatio = self.width / timeFramesWidth;
                        var croppedWidth = 0;
                        var originalCroppedWidth = 0;

                        var allCropped = true;

                        angular.forEach(self.timeFrames, function(timeFrame) {
                            if (!timeFrame.working && self.timeFramesNonWorkingMode !== 'cropped' ||
                                timeFrame.working && self.timeFramesWorkingMode !== 'cropped') {
                                timeFrame.left = (timeFrame.left - croppedWidth) * croppedRatio;
                                timeFrame.width = timeFrame.width * croppedRatio;
                                timeFrame.originalSize.left = (timeFrame.originalSize.left - originalCroppedWidth) * croppedRatio;
                                timeFrame.originalSize.width = timeFrame.originalSize.width * croppedRatio;
                                timeFrame.cropped = false;
                                allCropped = false;
                            } else {
                                croppedWidth += timeFrame.width;
                                originalCroppedWidth += timeFrame.originalSize.width;
                                timeFrame.left = undefined;
                                timeFrame.width = 0;
                                timeFrame.originalSize = {left: undefined, width: 0};
                                timeFrame.cropped = true;
                            }
                            timeFrame.updateView();
                        });

                        self.cropped = allCropped;
                    } else {
                        self.cropped = false;
                    }
                }
            }
        };

        Column.prototype.clone = function() {
            return new Column(moment(this.date), moment(this.endDate), this.left, this.width, this.calendar);
        };

        Column.prototype.containsDate = function(date) {
            return date > this.date && date <= this.endDate;
        };

        Column.prototype.equals = function(other) {
            return this.date === other.date;
        };

        Column.prototype.getMagnetDate = function(date) {
            if (this.columnMagnetValue > 0 && this.columnMagnetUnit !== undefined) {
                date = moment(date);
                var value = date.get(this.columnMagnetUnit);
                var magnetValue = Math.round(value/this.columnMagnetValue) * this.columnMagnetValue;
                date.startOf(this.columnMagnetUnit);
                date.set(this.columnMagnetUnit, magnetValue);
                return date;
            }
            return date;
        };

        var getDateByPositionUsingTimeFrames = function(timeFrames, position) {
            for (var i=0; i < timeFrames.length; i++) {
                // TODO: performance optimization could be done.
                var timeFrame = timeFrames[i];
                if (!timeFrame.cropped && position >= timeFrame.left && position <= timeFrame.left + timeFrame.width) {
                    var positionDuration = timeFrame.getDuration() / timeFrame.width * (position - timeFrame.left);
                    var date = moment(timeFrame.start).add(positionDuration, 'milliseconds');
                    return date;
                }
            }
        };

        Column.prototype.getDateByPosition = function(position, magnet) {
            var positionDuration;
            var date;

            if (position < 0) {
                position = 0;
            }
            if (position > this.width) {
                position = this.width;
            }

            if (this.timeFramesNonWorkingMode === 'cropped' || this.timeFramesWorkingMode === 'cropped') {
                date = getDateByPositionUsingTimeFrames(this.timeFrames, position);
            }

            if (date === undefined) {
                positionDuration = this.duration / this.width * position;
                date = moment(this.date).add(positionDuration, 'milliseconds');
            }

            if (magnet) {
                return this.getMagnetDate(date);
            }

            return date;
        };

        Column.prototype.getDayTimeFrame = function(date) {
            var dtf = this.daysTimeFrames[getDateKey(date)];
            if (dtf === undefined) {
                return [];
            }
            return dtf;
        };

        Column.prototype.getPositionByDate = function(date) {
            var positionDuration;
            var position;

            if (this.timeFramesNonWorkingMode === 'cropped' || this.timeFramesWorkingMode === 'cropped') {
                var croppedDate = date;
                var timeFrames = this.getDayTimeFrame(croppedDate);
                for (var i=0; i < timeFrames.length; i++) {
                    var timeFrame = timeFrames[i];
                    if (croppedDate >= timeFrame.start && croppedDate <= timeFrame.end) {
                        if (timeFrame.cropped) {
                            if (timeFrames.length > i+1) {
                                croppedDate = timeFrames[i+1].start;
                            } else {
                                croppedDate = timeFrame.end;
                            }
                        } else {
                            positionDuration = croppedDate.diff(timeFrame.start, 'milliseconds');
                            position = positionDuration / timeFrame.getDuration() * timeFrame.width;
                            return this.left + timeFrame.left + position;
                        }
                    }
                }
            }

            positionDuration = date.diff(this.date, 'milliseconds');
            position = positionDuration / this.duration * this.width;

            if (position < 0) {
                position = 0;
            }

            if (position > this.width) {
                position = this.width;
            }

            return this.left + position;
        };

        return Column;
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').factory('GanttColumnGenerator', [ 'GanttColumn', 'moment', function(Column, moment) {
        var ColumnGenerator = function(columnsManager) {
            var self = this;

            var columnWidth = columnsManager.gantt.$scope.columnWidth;
            if (columnWidth === undefined) {
                columnWidth = 20;
            }
            var unit = columnsManager.gantt.$scope.viewScale;
            var calendar = columnsManager.gantt.calendar;
            var timeFramesWorkingMode = columnsManager.gantt.$scope.timeFramesWorkingMode;
            var timeFramesNonWorkingMode = columnsManager.gantt.$scope.timeFramesNonWorkingMode;

            var columnMagnetValue;
            var columnMagnetUnit;

            if (columnsManager.gantt.$scope.columnMagnet) {
                var splittedColumnMagnet = columnsManager.gantt.$scope.columnMagnet.trim().split(' ');
                if (splittedColumnMagnet.length > 1) {
                    columnMagnetValue = parseInt(splittedColumnMagnet[0]);
                    columnMagnetUnit = splittedColumnMagnet[splittedColumnMagnet.length-1];
                }
            }

            // Generates one column for each time unit between the given from and to date.
            self.generate = function(from, to, maximumWidth, leftOffset, reverse) {
                if (!to && !maximumWidth) {
                    throw 'to or maximumWidth must be defined';
                }

                var excludeTo = false;
                from = moment(from).startOf(unit);
                if (to) {
                    excludeTo = isToDateToExclude(to);
                    to = moment(to).startOf(unit);
                }

                var date = moment(from).startOf(unit);
                var generatedCols = [];
                var left = 0;

                while (true) {
                    if (maximumWidth && Math.abs(left) > maximumWidth + columnWidth) {
                        break;
                    }

                    var startDate = moment(date);
                    var endDate = moment(startDate).add(1, unit);

                    var column = new Column(startDate, endDate, leftOffset ? left + leftOffset : left, columnWidth, calendar, timeFramesWorkingMode, timeFramesNonWorkingMode, columnMagnetValue, columnMagnetUnit);
                    if (!column.cropped) {
                        generatedCols.push(column);
                        if (reverse) {
                            left -= columnWidth;
                        } else {
                            left += columnWidth;
                        }

                        if (to) {
                            if (reverse) {
                                if (excludeTo && date < to || !excludeTo && date <= to) {
                                    break;
                                }
                            } else {
                                if (excludeTo && date > to || !excludeTo && date >= to) {
                                    break;
                                }
                            }
                        }
                    }
                    date.add(reverse ? -1 : 1, unit);
                }

                if (reverse) {
                    if (isToDateToExclude(from)) {
                        generatedCols.shift();
                    }
                    generatedCols.reverse();
                }

                return generatedCols;
            };

            // Columns are generated including or excluding the to date.
            // If the To date is the first day of month and the time is 00:00 then no new column is generated for this month.

            var isToDateToExclude = function(to) {
                return moment(to).add(1, unit).startOf(unit) === to;
            };
        };
        return ColumnGenerator;
    }]);
}());

(function(){
    'use strict';
    angular.module('gantt').factory('GanttColumnHeader', [ 'moment', 'GanttColumn', function(moment, Column) {
        // Used to display the Gantt grid and header.
        // The columns are generated by the column generator.

        var ColumnHeader = function(date, unit, left, width, label) {
            var startDate = moment(date);
            var endDate = moment(startDate).add(1, unit);

            var column = new Column(startDate, endDate, left, width);
            column.unit = unit;
            column.label = label;

            return column;
        };
        return ColumnHeader;
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').factory('GanttColumnsManager', ['GanttColumnGenerator', 'GanttHeaderGenerator', '$filter', '$timeout', 'ganttLayout', 'ganttBinarySearch', function(ColumnGenerator, HeaderGenerator, $filter, $timeout, layout, bs) {
        var ColumnsManager = function(gantt) {
            var self = this;

            this.gantt = gantt;

            this.from = undefined;
            this.to = undefined;

            this.columns = [];
            this.visibleColumns = [];
            this.previousColumns = [];
            this.nextColumns = [];

            this.headers = [];
            this.visibleHeaders = [];

            this.scrollAnchor = undefined;

            // Add a watcher if a view related setting changed from outside of the Gantt. Update the gantt accordingly if so.
            // All those changes need a recalculation of the header columns
            this.gantt.$scope.$watchGroup(['viewScale', 'columnWidth', 'timeFramesWorkingMode', 'timeFramesNonWorkingMode', 'columnMagnet', 'fromDate', 'toDate', 'autoExpand', 'taskOutOfRange'], function(oldValues, newValues) {
                if (oldValues !== newValues && self.gantt.rendered) {
                    self.generateColumns();
                }
            });

            this.gantt.$scope.$watchCollection('headers', function(oldValues, newValues) {
                if (oldValues !== newValues && self.gantt.rendered) {
                    self.generateColumns();
                }
            });

            this.gantt.$scope.$watchCollection('headersFormats', function(oldValues, newValues) {
                if (oldValues !== newValues && self.gantt.rendered) {
                    self.generateColumns();
                }
            });

            this.gantt.$scope.$watchGroup(['bodyRowsWidth', 'labelsWidth', 'showLabelsColumn', 'maxHeight'], function(oldValues, newValues) {
                if (oldValues !== newValues && self.gantt.rendered) {
                    self.updateColumnsMeta();
                }
            });

            this.gantt.api.data.on.load(this.gantt.$scope, function() {
                if ((self.from === undefined || self.to === undefined ||
                    self.from > self.gantt.rowsManager.getDefaultFrom() ||
                    self.to < self.gantt.rowsManager.getDefaultTo()) && self.gantt.rendered) {
                    self.generateColumns();
                }

                self.gantt.rowsManager.sortRows();
            });

            this.gantt.api.data.on.remove(this.gantt.$scope, function() {
                self.gantt.rowsManager.sortRows();
            });

            this.gantt.api.registerMethod('columns', 'clear', this.clearColumns, this);
            this.gantt.api.registerMethod('columns', 'generate', this.generateColumns, this);
            this.gantt.api.registerMethod('columns', 'refresh', this.updateColumnsMeta, this);

            this.gantt.api.registerEvent('columns', 'generate');
        };

        ColumnsManager.prototype.setScrollAnchor = function() {
            if (this.gantt.scroll.$element && this.columns.length > 0) {
                var el = this.gantt.scroll.$element[0];
                var center = el.scrollLeft + el.offsetWidth / 2;

                this.scrollAnchor = this.gantt.getDateByPosition(center);
            }
        };

        ColumnsManager.prototype.scrollToScrollAnchor = function() {
            var self = this;

            if (this.columns.length > 0 && this.scrollAnchor !== undefined) {
                // Ugly but prevents screen flickering (unlike $timeout)
                this.gantt.$scope.$$postDigest(function() {
                    self.gantt.api.scroll.toDate(self.scrollAnchor);
                });
            }
        };

        ColumnsManager.prototype.clearColumns = function() {
            this.setScrollAnchor();

            this.from = undefined;
            this.to = undefined;

            this.columns = [];
            this.visibleColumns = [];
            this.previousColumns = [];
            this.nextColumns = [];

            this.headers = [];
            this.visibleHeaders = [];

            this.gantt.api.columns.raise.clear();
        };

        ColumnsManager.prototype.generateColumns = function(from, to) {
            if (!from) {
                from = this.gantt.$scope.fromDate;
            }

            if (!to) {
                to = this.gantt.$scope.toDate;
            }

            if (!from) {
                from = this.gantt.rowsManager.getDefaultFrom();
                if (!from) {
                    return false;
                }
            }

            if (!to) {
                to = this.gantt.rowsManager.getDefaultTo();
                if (!to) {
                    return false;
                }
            }

            if (this.gantt.$scope.taskOutOfRange === 'expand') {
                from = this.gantt.rowsManager.getExpandedFrom(from);
                to = this.gantt.rowsManager.getExpandedTo(to);
            }

            this.setScrollAnchor();

            this.from = from;
            this.to = to;

            var columnGenerator = new ColumnGenerator(this);
            var headerGenerator = new HeaderGenerator(this);

            this.columns = columnGenerator.generate(from, to);
            this.headers = headerGenerator.generate(this.columns);
            this.previousColumns = [];
            this.nextColumns = [];

            this.updateColumnsMeta();
            this.scrollToScrollAnchor();

            this.gantt.api.columns.raise.generate(this.columns, this.headers);
        };

        ColumnsManager.prototype.updateColumnsMeta = function() {
            var lastColumn = this.getLastColumn();
            this.gantt.originalWidth = lastColumn !== undefined ? lastColumn.originalSize.left + lastColumn.originalSize.width : 0;

            if (this.gantt.$scope.columnWidth === undefined) {
                var newWidth = this.gantt.$scope.ganttElementWidth - (this.gantt.$scope.showLabelsColumn ? this.gantt.$scope.labelsWidth : 0);

                if (this.gantt.$scope.maxHeight > 0) {
                    newWidth = newWidth - layout.getScrollBarWidth();
                }

                layout.setColumnsWidth(newWidth, this.gantt.originalWidth, this.previousColumns);
                layout.setColumnsWidth(newWidth, this.gantt.originalWidth, this.columns);
                layout.setColumnsWidth(newWidth, this.gantt.originalWidth, this.nextColumns);

                angular.forEach(this.headers, function(header) {
                    layout.setColumnsWidth(newWidth, this.gantt.originalWidth, header);
                }, this);
            }

            this.gantt.width = lastColumn !== undefined ? lastColumn.left + lastColumn.width : 0;

            this.gantt.rowsManager.updateTasksPosAndSize();
            this.gantt.timespansManager.updateTimespansPosAndSize();

            this.updateVisibleColumns();
            this.gantt.rowsManager.updateVisibleObjects();

            this.gantt.currentDateManager.setCurrentDate(this.gantt.$scope.currentDateValue);
        };

        // Returns the last Gantt column or undefined
        ColumnsManager.prototype.getLastColumn = function(extended) {
            var columns = this.columns;
            if (extended) {
                columns = this.nextColumns;
            }
            if (columns && columns.length > 0) {
                return columns[columns.length - 1];
            } else {
                return undefined;
            }
        };

        // Returns the first Gantt column or undefined
        ColumnsManager.prototype.getFirstColumn = function(extended) {
            var columns = this.columns;
            if (extended) {
                columns = this.previousColumns;
            }

            if (columns && columns.length > 0) {
                return columns[0];
            } else {
                return undefined;
            }
        };

        // Returns the column at the given or next possible date
        ColumnsManager.prototype.getColumnByDate = function(date) {
            this.expandExtendedColumnsForDate(date);
            var extendedColumns = this.previousColumns.concat(this.columns, this.nextColumns);
            var columns = bs.get(extendedColumns, date, function(c) {
                return c.date;
            });
            return columns[0] !== undefined ? columns[0] : columns[1];
        };

        // Returns the column at the given position x (in em)
        ColumnsManager.prototype.getColumnByPosition = function(x) {
            this.expandExtendedColumnsForPosition(x);
            var extendedColumns = this.previousColumns.concat(this.columns, this.nextColumns);
            return bs.get(extendedColumns, x, function(c) {
                return c.left;
            })[0];
        };

        ColumnsManager.prototype.expandExtendedColumnsForPosition = function(x) {
            if (x < 0) {
                var firstColumn = this.getFirstColumn();
                var from = firstColumn.date;
                var firstExtendedColumn = this.getFirstColumn(true);
                if (!firstExtendedColumn || firstExtendedColumn.left > x) {
                    this.previousColumns = new ColumnGenerator(this).generate(from, undefined, -x, 0, true);
                }
                return true;
            } else if (x > this.gantt.width) {
                var lastColumn = this.getLastColumn();
                var endDate = lastColumn.getDateByPosition(lastColumn.width);
                var lastExtendedColumn = this.getLastColumn(true);
                if (!lastExtendedColumn || lastExtendedColumn.left + lastExtendedColumn.width < x) {
                    this.nextColumns = new ColumnGenerator(this).generate(endDate, undefined, x - this.gantt.width, this.gantt.width, false);
                }
                return true;
            }
            return false;
        };

        ColumnsManager.prototype.expandExtendedColumnsForDate = function(date) {
            var firstColumn = this.getFirstColumn();
            var from;
            if (firstColumn) {
                from = firstColumn.date;
            }

            var lastColumn = this.getLastColumn();
            var endDate;
            if (lastColumn) {
                endDate = lastColumn.getDateByPosition(lastColumn.width);
            }

            if (from && date < from) {
                var firstExtendedColumn = this.getFirstColumn(true);
                if (!firstExtendedColumn || firstExtendedColumn.date > date) {
                    this.previousColumns = new ColumnGenerator(this).generate(from, date, undefined, 0, true);
                }
                return true;
            } else if (endDate && date > endDate) {
                var lastExtendedColumn = this.getLastColumn(true);
                if (!lastExtendedColumn || endDate < lastExtendedColumn) {
                    this.nextColumns = new ColumnGenerator(this).generate(endDate, date, undefined, this.gantt.width, false);
                }
                return true;
            }
            return false;
        };

        // Returns the number of active headers
        ColumnsManager.prototype.getActiveHeadersCount = function() {
            return this.headers.length;
        };

        ColumnsManager.prototype.updateVisibleColumns = function() {
            this.visibleColumns = $filter('ganttColumnLimit')(this.columns, this.gantt);

            this.visibleHeaders = [];
            angular.forEach(this.headers, function(header) {
                this.visibleHeaders.push($filter('ganttColumnLimit')(header, this.gantt));
            }, this);

            angular.forEach(this.visibleColumns, function(c) {
                c.updateView();
            });

            angular.forEach(this.visibleHeaders, function(headerRow) {
                angular.forEach(headerRow, function(header) {
                    header.updateView();
                });
            });
        };

        var defaultHeadersFormats = {'year': 'YYYY', 'quarter': '[Q]Q YYYY', month: 'MMMM YYYY', week: 'w', day: 'D', hour: 'H', minute:'HH:mm'};
        var defaultDayHeadersFormats = {day: 'LL', hour: 'H', minute:'HH:mm'};
        var defaultYearHeadersFormats = {'year': 'YYYY', 'quarter': '[Q]Q', month: 'MMMM'};

        ColumnsManager.prototype.getHeaderFormat = function(unit) {
            var format;
            if (this.gantt.$scope.headersFormats !== undefined) {
                format = this.gantt.$scope.headersFormats[unit];
            }
            if (format === undefined) {
                if (['millisecond', 'second', 'minute', 'hour'].indexOf(this.gantt.$scope.viewScale) > -1) {
                    format = defaultDayHeadersFormats[unit];
                } else if (['month', 'quarter', 'year'].indexOf(this.gantt.$scope.viewScale) > -1) {
                    format = defaultYearHeadersFormats[unit];
                }
                if (format === undefined) {
                    format = defaultHeadersFormats[unit];
                }
            }
            return format;
        };

        return ColumnsManager;
    }]);
}());

(function(){
    'use strict';
    angular.module('gantt').factory('GanttHeaderGenerator', ['GanttColumnHeader', function(ColumnHeader) {
        var generateHeader = function(columnsManager, columns, unit) {
            var generatedHeaders = [];
            var header;
            var prevColDateVal;

            for (var i = 0, l = columns.length; i < l; i++) {
                var col = columns[i];
                var colDateVal = col.date.get(unit);
                if (i === 0 || prevColDateVal !== colDateVal) {
                    prevColDateVal = colDateVal;
                    var label = col.date.format(columnsManager.getHeaderFormat(unit));

                    header = new ColumnHeader(col.date, unit, col.originalSize.left, col.originalSize.width, label);
                    header.left = col.left;
                    header.width = col.width;
                    generatedHeaders.push(header);
                } else {
                    header.originalSize.width += col.originalSize.width;
                    header.width += col.width;
                }
            }
            return generatedHeaders;

        };

        return function(columnsManager) {
            this.generate = function(columns) {
                var units = [];
                if (columnsManager.gantt.$scope.headers === undefined) {
                    units = [];
                    if (['year', 'quarter', 'month'].indexOf(columnsManager.gantt.$scope.viewScale) > -1) {
                        units.push('year');
                    }
                    if (['quarter'].indexOf(columnsManager.gantt.$scope.viewScale) > -1) {
                        units.push('quarter');
                    }
                    if (['day', 'week', 'month'].indexOf(columnsManager.gantt.$scope.viewScale) > -1) {
                        units.push('month');
                    }
                    if (['day', 'week'].indexOf(columnsManager.gantt.$scope.viewScale) > -1) {
                        units.push('week');
                    }
                    if (['hour', 'day'].indexOf(columnsManager.gantt.$scope.viewScale) > -1) {
                        units.push('day');
                    }
                    if (['hour', 'minute', 'second'].indexOf(columnsManager.gantt.$scope.viewScale) > -1) {
                        units.push('hour');
                    }
                    if (['minute', 'second'].indexOf(columnsManager.gantt.$scope.viewScale) > -1) {
                        units.push('minute');
                    }
                    if (['second'].indexOf(columnsManager.gantt.$scope.viewScale) > -1) {
                        units.push('second');
                    }
                    if (units.length === 0) {
                        units.push(columnsManager.gantt.$scope.viewScale);
                    }
                } else {
                    units = columnsManager.gantt.$scope.headers;
                }

                var headers = [];
                angular.forEach(units, function(unit) {
                    headers.push(generateHeader(columnsManager, columns, unit));
                });

                return headers;
            };
        };
    }]);
}());


(function() {
    'use strict';
    angular.module('gantt').factory('Gantt', [
        'GanttApi', 'GanttCalendar', 'GanttScroll', 'GanttBody', 'GanttRowHeader', 'GanttHeader', 'GanttLabels', 'GanttObjectModel', 'GanttRowsManager', 'GanttColumnsManager', 'GanttTimespansManager', 'GanttCurrentDateManager', 'ganttArrays', 'moment',
        function(GanttApi, Calendar, Scroll, Body, RowHeader, Header, Labels, ObjectModel, RowsManager, ColumnsManager, TimespansManager, CurrentDateManager, arrays, moment) {
            // Gantt logic. Manages the columns, rows and sorting functionality.
            var Gantt = function($scope, $element) {
                var self = this;

                this.$scope = $scope;
                this.$element = $element;

                this.api = new GanttApi(this);

                this.api.registerEvent('core', 'ready');
                this.api.registerEvent('core', 'rendered');

                this.api.registerEvent('directives', 'preLink');
                this.api.registerEvent('directives', 'postLink');
                this.api.registerEvent('directives', 'new');
                this.api.registerEvent('directives', 'destroy');

                this.api.registerEvent('data', 'load');
                this.api.registerEvent('data', 'remove');
                this.api.registerEvent('data', 'clear');

                this.api.registerMethod('core', 'getDateByPosition', this.getDateByPosition, this);
                this.api.registerMethod('core', 'getPositionByDate', this.getPositionByDate, this);

                this.api.registerMethod('data', 'load', this.loadData, this);
                this.api.registerMethod('data', 'remove', this.removeData, this);
                this.api.registerMethod('data', 'clear', this.clearData, this);
                this.api.registerMethod('data', 'get', this.getData, this);

                this.calendar = new Calendar(this);
                this.calendar.registerTimeFrames(this.$scope.timeFrames);
                this.calendar.registerDateFrames(this.$scope.dateFrames);

                this.api.registerMethod('timeframes', 'registerTimeFrames', this.calendar.registerTimeFrames, this.calendar);
                this.api.registerMethod('timeframes', 'clearTimeframes', this.calendar.clearTimeFrames, this.calendar);
                this.api.registerMethod('timeframes', 'registerDateFrames', this.calendar.registerDateFrames, this.calendar);
                this.api.registerMethod('timeframes', 'clearDateFrames', this.calendar.clearDateFrames, this.calendar);
                this.api.registerMethod('timeframes', 'registerTimeFrameMappings', this.calendar.registerTimeFrameMappings, this.calendar);
                this.api.registerMethod('timeframes', 'clearTimeFrameMappings', this.calendar.clearTimeFrameMappings, this.calendar);

                $scope.$watchGroup(['timeFrames', 'dateFrames'], function(newValues, oldValues) {
                    if (newValues !== oldValues) {
                        var timeFrames = newValues[0];
                        var dateFrames = newValues[1];

                        var oldTimeFrames = oldValues[0];
                        var oldDateFrames = oldValues[1];

                        if (!angular.equals(timeFrames, oldTimeFrames)) {
                            self.calendar.clearTimeFrames();
                            self.calendar.registerTimeFrames(timeFrames);
                        }

                        if (!angular.equals(dateFrames, oldDateFrames)) {
                            self.calendar.clearDateFrames();
                            self.calendar.registerDateFrames(dateFrames);
                        }

                        self.columnsManager.generateColumns();
                    }
                });

                this.scroll = new Scroll(this);
                this.body = new Body(this);
                this.rowHeader = new RowHeader(this);
                this.header = new Header(this);
                this.labels = new Labels(this);

                this.objectModel = new ObjectModel(this.api);

                this.rowsManager = new RowsManager(this);
                this.columnsManager = new ColumnsManager(this);
                this.timespansManager = new TimespansManager(this);
                this.currentDateManager = new CurrentDateManager(this);

                this.originalWidth = 0;
                this.width = 0;

                if (angular.isFunction(this.$scope.api)) {
                    this.$scope.api(this.api);
                }

                this.$scope.$watchCollection('data', function(newData, oldData) {
                    var toRemoveIds = arrays.getRemovedIds(newData, oldData);

                    for (var i = 0, l = toRemoveIds.length; i < l; i++) {
                        var toRemoveId = toRemoveIds[i];
                        self.rowsManager.removeRow(toRemoveId);
                    }

                    if (newData !== undefined) {
                        self.loadData(newData);
                    }
                });
            };

            // Returns the exact column date at the given position x (in em)
            Gantt.prototype.getDateByPosition = function(x, magnet) {
                var column = this.columnsManager.getColumnByPosition(x);
                if (column !== undefined) {
                    return column.getDateByPosition(x - column.left, magnet);
                } else {
                    return undefined;
                }
            };

            // Returns the position inside the Gantt calculated by the given date
            Gantt.prototype.getPositionByDate = function(date) {
                if (date === undefined) {
                    return undefined;
                }

                if (!moment.isMoment(moment)) {
                    date = moment(date);
                }

                var column = this.columnsManager.getColumnByDate(date);
                if (column !== undefined) {
                    return column.getPositionByDate(date);
                } else {
                    return undefined;
                }
            };

            // Adds or update rows and tasks.
            Gantt.prototype.loadData = function(data) {
                if (!angular.isArray(data)) {
                    data = data !== undefined ? [data] : [];
                }

                if (this.$scope.data === undefined || this.$scope.data !== data) {
                    this.$scope.data = [];
                }
                for (var i = 0, l = data.length; i < l; i++) {
                    var rowData = data[i];
                    this.rowsManager.addRow(rowData);
                }
                this.api.data.raise.load(this.$scope, data);
            };

            Gantt.prototype.getData = function() {
                return this.$scope.data;
            };

            // Removes specified rows or tasks.
            // If a row has no tasks inside the complete row will be deleted.
            Gantt.prototype.removeData = function(data) {
                if (!angular.isArray(data)) {
                    data = data !== undefined ? [data] : [];
                }

                this.rowsManager.removeData(data);
                this.api.data.raise.remove(this.$scope, data);
            };

            // Removes all rows and tasks
            Gantt.prototype.clearData = function() {
                this.rowsManager.removeAll();
                this.api.data.raise.clear(this.$scope);
            };

            return Gantt;
        }]);
}());

(function(){
    'use strict';
    angular.module('gantt').factory('GanttObjectModel', ['ganttUtils', 'moment', function(utils, moment) {
        var ObjectModel = function(api) {
            this.api = api;

            this.api.registerEvent('tasks', 'clean');
            this.api.registerEvent('rows', 'clean');
            this.api.registerEvent('timespans', 'clean');
        };

        ObjectModel.prototype.cleanTask = function(model) {
            if (model.id === undefined) {
                model.id = utils.randomUuid();
            }

            if (model.from !== undefined && !moment.isMoment(model.from)) {
                model.from = moment(model.from);
            }

            if (model.to !== undefined && !moment.isMoment(model.to)) {
                model.to = moment(model.to);
            }

            this.api.tasks.raise.clean(model);
        };

        ObjectModel.prototype.cleanRow = function(model) {
            if (model.id === undefined) {
                model.id = utils.randomUuid();
            }

            if (model.from !== undefined && !moment.isMoment(model.from)) {
                model.from = moment(model.from);
            }

            if (model.to !== undefined && !moment.isMoment(model.to)) {
                model.to = moment(model.to);
            }

            this.api.rows.raise.clean(model);
        };

        ObjectModel.prototype.cleanTimespan = function(model) {
            if (model.id === undefined) {
                model.id = utils.randomUuid();
            }

            if (model.from !== undefined && !moment.isMoment(model.from)) {
                model.from = moment(model.from);
            }

            if (model.to !== undefined && !moment.isMoment(model.to)) {
                model.to = moment(model.to);
            }

            this.api.timespans.raise.clean(model);
        };

        return ObjectModel;
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').factory('GanttRow', ['GanttTask', 'moment', '$filter', function(Task, moment, $filter) {
        var Row = function(rowsManager, model) {
            this.rowsManager = rowsManager;
            this.model = model;

            this.from = undefined;
            this.to = undefined;

            this.tasksMap = {};
            this.tasks = [];
            this.filteredTasks = [];
            this.visibleTasks = [];
        };

        Row.prototype.addTaskImpl = function(task, viewOnly) {
            this.tasksMap[task.model.id] = task;
            this.tasks.push(task);
            this.filteredTasks.push(task);
            this.visibleTasks.push(task);

            if (!viewOnly) {
                if (this.model.tasks === undefined) {
                    this.model.tasks = [];
                }
                if (this.model.tasks.indexOf(task.model) === -1) {
                    this.model.tasks.push(task.model);
                }
            }

        };

        // Adds a task to a specific row. Merges the task if there is already one with the same id
        Row.prototype.addTask = function(taskModel, viewOnly) {
            // Copy to new task (add) or merge with existing (update)
            var task, isUpdate = false;

            this.rowsManager.gantt.objectModel.cleanTask(taskModel);
            if (taskModel.id in this.tasksMap) {
                task = this.tasksMap[taskModel.id];
                if (task.model === taskModel) {
                    return task;
                }
                task.model = taskModel;
                isUpdate = true;
            } else {
                task = new Task(this, taskModel);
                this.addTaskImpl(task, viewOnly);
            }

            this.sortTasks();
            this.setFromToByTask(task);

            if (!viewOnly) {
                if (isUpdate) {
                    this.rowsManager.gantt.api.tasks.raise.change(task);
                } else {
                    this.rowsManager.gantt.api.tasks.raise.add(task);
                }
            }

            return task;
        };

        // Removes the task from the existing row and adds it to he current one
        Row.prototype.moveTaskToRow = function(task, viewOnly) {
            var oldRow = task.row;
            oldRow.removeTask(task.model.id, viewOnly, true);

            task.row = this;
            this.addTaskImpl(task, viewOnly);

            this.sortTasks();
            this.setFromToByTask(task);

            task.updatePosAndSize();

            if (!viewOnly) {
                this.rowsManager.gantt.api.tasks.raise.rowChange(task, oldRow);
            }
        };

        Row.prototype.updateVisibleTasks = function() {
            if (this.rowsManager.gantt.$scope.filterTask) {
                var filterTask = this.rowsManager.gantt.$scope.filterTask;
                if (typeof(filterTask) === 'object') {
                    filterTask = {model: filterTask};
                }

                var filterTaskComparator = this.rowsManager.gantt.$scope.filterTaskComparator;
                if (typeof(filterTaskComparator) === 'function') {
                    filterTaskComparator = function(actual, expected) {
                        return this.rowsManager.gantt.$scope.filterRowComparator(actual.model, expected.model);
                    };
                }

                this.filteredTasks = $filter('filter')(this.tasks, filterTask, filterTaskComparator);
            } else {
                this.filteredTasks = this.tasks.slice(0);
            }
            this.visibleTasks = $filter('ganttTaskLimit')(this.filteredTasks, this.rowsManager.gantt);
        };

        Row.prototype.updateTasksPosAndSize = function() {
            for (var j = 0, k = this.tasks.length; j < k; j++) {
                this.tasks[j].updatePosAndSize();
            }
        };

        // Remove the specified task from the row
        Row.prototype.removeTask = function(taskId, viewOnly, silent) {
            if (taskId in this.tasksMap) {
                var removedTask = this.tasksMap[taskId];
                var task;
                var i;

                for (i = this.tasks.length - 1; i >= 0; i--) {
                    task = this.tasks[i];
                    if (task.model.id === taskId) {
                        this.tasks.splice(i, 1); // Remove from array

                        // Update earliest or latest date info as this may change
                        if (this.from - task.model.from === 0 || this.to - task.model.to === 0) {
                            this.setFromTo();
                        }

                        break;
                    }
                }

                for (i = this.filteredTasks.length - 1; i >= 0; i--) {
                    task = this.filteredTasks[i];
                    if (task.model.id === taskId) {
                        this.filteredTasks.splice(i, 1); // Remove from filtered array
                        break;
                    }
                }

                for (i = this.visibleTasks.length - 1; i >= 0; i--) {
                    task = this.visibleTasks[i];
                    if (task.model.id === taskId) {
                        this.visibleTasks.splice(i, 1); // Remove from visible array
                        break;
                    }
                }

                if (!viewOnly) {
                    delete this.tasksMap[taskId]; // Remove from map

                    if (this.model.tasks !== undefined) {
                        var taskIndex = this.model.tasks.indexOf(removedTask.model);
                        if (taskIndex > -1) {
                            this.model.tasks.splice(taskIndex, 1);
                        }
                    }

                    if (!silent) {
                        this.rowsManager.gantt.api.tasks.raise.remove(removedTask);
                    }
                }

                return removedTask;
            }
        };

        Row.prototype.removeAllTasks = function() {
            this.from = undefined;
            this.to = undefined;

            this.tasksMap = {};
            this.tasks = [];
            this.filteredTasks = [];
            this.visibleTasks = [];
        };

        // Calculate the earliest from and latest to date of all tasks in a row
        Row.prototype.setFromTo = function() {
            this.from = undefined;
            this.to = undefined;
            for (var j = 0, k = this.tasks.length; j < k; j++) {
                this.setFromToByTask(this.tasks[j]);
            }
        };

        Row.prototype.setFromToByTask = function(task) {
            if (this.from === undefined) {
                this.from = moment(task.model.from);
            } else if (task.model.from < this.from) {
                this.from = moment(task.model.from);
            }

            if (this.to === undefined) {
                this.to = moment(task.model.to);
            } else if (task.model.to > this.to) {
                this.to = moment(task.model.to);
            }
        };

        Row.prototype.sortTasks = function() {
            this.tasks.sort(function(t1, t2) {
                return t1.left - t2.left;
            });
        };

        Row.prototype.clone = function() {
            var clone = new Row(this.rowsManager, angular.copy(this));
            for (var i = 0, l = this.tasks.length; i < l; i++) {
                clone.addTask(this.tasks[i].model);
            }
            return clone;
        };

        return Row;
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').factory('GanttRowHeader', [function() {
        var RowHeader = function(gantt) {
            this.gantt = gantt;
        };
        return RowHeader;
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').factory('GanttRowsManager', ['GanttRow', 'ganttArrays', '$filter', 'moment', function(Row, arrays, $filter, moment) {
        var RowsManager = function(gantt) {
            var self = this;

            this.gantt = gantt;

            this.rowsMap = {};
            this.rows = [];
            this.sortedRows = [];
            this.filteredRows = [];
            this.visibleRows = [];
            this.rowsTaskWatchers = [];

            this.gantt.$scope.$watchGroup(['scrollLeft', 'scrollWidth'], function(oldValues, newValues) {
                if (oldValues !== newValues) {
                    self.updateVisibleTasks();
                }
            });

            this.gantt.$scope.$watchGroup(['filterTask', 'filterTaskComparator'], function(oldValues, newValues) {
                if (oldValues !== newValues) {
                    self.updateVisibleTasks();
                }
            });

            this.gantt.$scope.$watchGroup(['filterRow', 'filterRowComparator'], function(oldValues, newValues) {
                if (oldValues !== newValues) {
                    self.updateVisibleRows();
                }
            });

            this.gantt.$scope.$watch('sortMode', function(oldValues, newValues) {
                if (oldValues !== newValues) {
                    self.sortRows();
                }
            });

            this.gantt.api.registerMethod('rows', 'sort', RowsManager.prototype.sortRows, this);
            this.gantt.api.registerMethod('rows', 'applySort', RowsManager.prototype.applySort, this);
            this.gantt.api.registerMethod('rows', 'refresh', RowsManager.prototype.updateVisibleObjects, this);

            this.gantt.api.registerEvent('tasks', 'add');
            this.gantt.api.registerEvent('tasks', 'change');
            this.gantt.api.registerEvent('tasks', 'rowChange');
            this.gantt.api.registerEvent('tasks', 'remove');
            this.gantt.api.registerEvent('tasks', 'filter');

            this.gantt.api.registerEvent('rows', 'add');
            this.gantt.api.registerEvent('rows', 'change');
            this.gantt.api.registerEvent('rows', 'remove');
            this.gantt.api.registerEvent('rows', 'move');

            this.gantt.api.registerEvent('rows', 'filter');

            this.updateVisibleObjects();
        };

        RowsManager.prototype.addRow = function(rowModel) {
            // Copy to new row (add) or merge with existing (update)
            var row, i, l, isUpdate = false;

            this.gantt.objectModel.cleanRow(rowModel);

            if (rowModel.id in this.rowsMap) {
                row = this.rowsMap[rowModel.id];
                if (row.model === rowModel) {
                    return;
                }

                var toRemoveIds = arrays.getRemovedIds(rowModel.tasks, row.model.tasks);
                for (i= 0, l=toRemoveIds.length; i<l; i++) {
                    var toRemoveId = toRemoveIds[i];
                    row.removeTask(toRemoveId);
                }

                row.model = rowModel;
                isUpdate = true;
            } else {
                row = new Row(this, rowModel);
                this.rowsMap[rowModel.id] = row;
                this.rows.push(row);
                this.sortedRows.push(row);
                this.filteredRows.push(row);
                this.visibleRows.push(row);

                if (this.gantt.$scope.data.indexOf(rowModel) === -1) {
                    this.gantt.$scope.data.push(rowModel);
                }

            }

            if (rowModel.tasks !== undefined && rowModel.tasks.length > 0) {
                for (i = 0, l = rowModel.tasks.length; i < l; i++) {
                    var taskModel = rowModel.tasks[i];
                    row.addTask(taskModel);
                }
            }

            if (isUpdate) {
                this.gantt.api.rows.raise.change(row);
            } else {
                this.gantt.api.rows.raise.add(row);
            }

            if (!isUpdate) {
                var watcher = this.gantt.$scope.$watchCollection(function() {return rowModel.tasks;}, function(newTasks, oldTasks) {
                    if (newTasks !== oldTasks) {
                        var i, l;

                        var toRemoveIds = arrays.getRemovedIds(newTasks, oldTasks);
                        for (i= 0, l = toRemoveIds.length; i<l; i++) {
                            var toRemove = toRemoveIds[i];
                            row.removeTask(toRemove);
                        }

                        if (newTasks !== undefined) {
                            for (i= 0, l = newTasks.length; i<l; i++) {
                                var toAdd = newTasks[i];
                                row.addTask(toAdd);
                            }
                        }
                    }
                });

                this.rowsTaskWatchers.push(watcher);
            }

            return isUpdate;
        };

        RowsManager.prototype.removeRow = function(rowId) {
            if (rowId in this.rowsMap) {
                delete this.rowsMap[rowId]; // Remove from map

                var removedRow;
                var row;

                var indexOf = arrays.indexOfId(this.rows, rowId, ['model', 'id']);
                if (indexOf > -1) {
                    removedRow = this.rows.splice(indexOf, 1)[0]; // Remove from array
                    var deregisterFunction = this.rowsTaskWatchers.splice(indexOf, 1)[0]; // Remove watcher
                    deregisterFunction();
                }

                arrays.removeId(this.sortedRows, rowId, ['model', 'id']);
                arrays.removeId(this.filteredRows, rowId, ['model', 'id']);
                arrays.removeId(this.visibleRows, rowId, ['model', 'id']);
                arrays.remove(this.gantt.$scope.data, removedRow.model);

                this.gantt.api.rows.raise.remove(removedRow);
                return row;
            }

            return undefined;
        };

        RowsManager.prototype.removeData = function(data) {
            for (var i = 0, l = data.length; i < l; i++) {
                var rowData = data[i];
                var row;

                if (rowData.tasks !== undefined && rowData.tasks.length > 0) {
                    // Only delete the specified tasks but not the row and the other tasks

                    if (rowData.id in this.rowsMap) {
                        row = this.rowsMap[rowData.id];

                        for (var j = 0, k = rowData.tasks.length; j < k; j++) {
                            row.removeTask(rowData.tasks[j].id);
                        }

                        this.gantt.api.rows.raise.change(row);
                    }
                } else {
                    // Delete the complete row
                    row = this.removeRow(rowData.id);
                }
            }
            this.updateVisibleObjects();
        };

        RowsManager.prototype.removeAll = function() {
            this.rowsMap = {};
            this.rows = [];
            this.sortedRows = [];
            this.filteredRows = [];
            this.visibleRows = [];
            var data = this.gantt.$scope.data;
            while(data > 0) {
                data.pop();
            }
            for (var i= 0, l=this.rowsTaskWatchers.length; i<l; i++) {
                var deregisterFunction = this.rowsTaskWatchers[i];
                deregisterFunction();
            }
            this.rowsTaskWatchers = [];
        };

        RowsManager.prototype.sortRows = function() {
            var expression = this.gantt.$scope.sortMode;

            if (expression !== undefined) {
                var reverse = false;
                if (expression.charAt(0) === '-') {
                    reverse = true;
                    expression = expression.substr(1);
                }

                var angularOrderBy = $filter('orderBy');
                this.sortedRows = angularOrderBy(this.rows, expression, reverse);
            } else {
                this.sortedRows = this.rows.slice();
            }

            this.updateVisibleRows();
        };

        /**
         * Applies current view sort to data model.
         */
        RowsManager.prototype.applySort = function() {
            var data = this.gantt.$scope.data;
            while(data > 0) {
                data.pop();
            }
            var rows = [];
            for (var i = 0, l = this.sortedRows.length; i < l; i++) {
                data.push(this.sortedRows[i].model);
                rows.push(this.sortedRows[i]);
            }

            this.rows = rows;
        };

        RowsManager.prototype.moveRow = function(row, targetRow) {
            if (this.gantt.$scope.sortMode !== undefined) {
                // Apply current sort to model
                this.applySort();

                this.gantt.$scope.sortMode = undefined;
            }

            var targetRowIndex = this.rows.indexOf(targetRow);
            var rowIndex = this.rows.indexOf(row);

            if (targetRowIndex > -1 && rowIndex > -1 && targetRowIndex !== rowIndex) {
                arrays.moveToIndex(this.rows, rowIndex, targetRowIndex);
                arrays.moveToIndex(this.rowsTaskWatchers, rowIndex, targetRowIndex);
                arrays.moveToIndex(this.gantt.$scope.data, rowIndex, targetRowIndex);

                this.gantt.api.rows.raise.change(row);
                this.gantt.api.rows.raise.move(row, rowIndex, targetRowIndex);

                this.updateVisibleObjects();
                this.sortRows();
            }
        };

        RowsManager.prototype.updateVisibleObjects = function() {
            this.updateVisibleRows();
            this.updateVisibleTasks();
        };

        RowsManager.prototype.updateVisibleRows = function() {
            var oldFilteredRows = this.filteredRows;
            if (this.gantt.$scope.filterRow) {
                var filterRow = this.gantt.$scope.filterRow;
                if (typeof(filterRow) === 'object') {
                    filterRow = {model: filterRow};
                }

                var filterRowComparator = this.gantt.$scope.filterRowComparator;
                if (typeof(filterRowComparator) === 'function') {
                    filterRowComparator = function(actual, expected) {
                        return this.gantt.$scope.filterRowComparator(actual.model, expected.model);
                    };
                }

                this.filteredRows = $filter('filter')(this.sortedRows, filterRow, filterRowComparator);
            } else {
                this.filteredRows = this.sortedRows.slice(0);
            }


            var raiseEvent = !angular.equals(oldFilteredRows, this.filteredRows);

            // TODO: Implement rowLimit like columnLimit to enhance performance for gantt with many rows
            this.visibleRows = this.filteredRows;
            if (raiseEvent) {
                this.gantt.api.rows.raise.filter(this.sortedRows, this.filteredRows);
            }
        };

        RowsManager.prototype.updateVisibleTasks = function() {
            var oldFilteredTasks = [];
            var filteredTasks = [];
            var tasks = [];

            angular.forEach(this.filteredRows, function(row) {
                oldFilteredTasks = oldFilteredTasks.concat(row.filteredTasks);
                row.updateVisibleTasks();
                filteredTasks = filteredTasks.concat(row.filteredTasks);
                tasks = tasks.concat(row.tasks);
            });

            var filterEvent = !angular.equals(oldFilteredTasks, filteredTasks);

            if (filterEvent) {
                this.gantt.api.tasks.raise.filter(tasks, filteredTasks);
            }
        };

        // Update the position/size of all tasks in the Gantt
        RowsManager.prototype.updateTasksPosAndSize = function() {
            for (var i = 0, l = this.rows.length; i < l; i++) {
                this.rows[i].updateTasksPosAndSize();
            }
        };

        RowsManager.prototype.getExpandedFrom = function(from) {
            from = from ? moment(from) : from;

            var minRowFrom = from;
            angular.forEach(this.rows, function(row) {
                if (minRowFrom === undefined || minRowFrom > row.from) {
                    minRowFrom = row.from;
                }
            });
            if (minRowFrom && (!from || minRowFrom < from)) {
                return minRowFrom;
            }
            return from;
        };

        RowsManager.prototype.getExpandedTo = function(to) {
            to = to ? moment(to) : to;

            var maxRowTo = to;
            angular.forEach(this.rows, function(row) {
                if (maxRowTo === undefined || maxRowTo < row.to) {
                    maxRowTo = row.to;
                }
            });
            if (maxRowTo && (!this.gantt.$scope.toDate || maxRowTo > this.gantt.$scope.toDate)) {
                return maxRowTo;
            }
            return to;
        };

        RowsManager.prototype.getDefaultFrom = function() {
            var defaultFrom;
            angular.forEach(this.rows, function(row) {
                if (defaultFrom === undefined || row.from < defaultFrom) {
                    defaultFrom = row.from;
                }
            });
            return defaultFrom;
        };

        RowsManager.prototype.getDefaultTo = function() {
            var defaultTo;
            angular.forEach(this.rows, function(row) {
                if (defaultTo === undefined || row.to > defaultTo) {
                    defaultTo = row.to;
                }
            });
            return defaultTo;
        };

        return RowsManager;
    }]);
}());

(function(){
    'use strict';
    angular.module('gantt').factory('GanttTask', [function() {
        var Task = function(row, model) {
            this.rowsManager = row.rowsManager;
            this.row = row;
            this.model = model;
            this.truncatedLeft = false;
            this.truncatedRight = false;
        };

        Task.prototype.isMilestone = function() {
            return !this.model.to || this.model.from - this.model.to === 0;
        };

        // Updates the pos and size of the task according to the from - to date
        Task.prototype.updatePosAndSize = function() {
            this.modelLeft = this.rowsManager.gantt.getPositionByDate(this.model.from);
            this.modelWidth = this.rowsManager.gantt.getPositionByDate(this.model.to) - this.modelLeft;

            this.left = Math.min(Math.max(this.modelLeft, 0), this.rowsManager.gantt.width);
            if (this.modelLeft < 0) {
                this.truncatedLeft = true;
                if (this.modelWidth + this.modelLeft > this.rowsManager.gantt.width) {
                    this.truncatedRight = true;
                    this.width = this.rowsManager.gantt.width;
                } else {
                    this.truncatedRight = false;
                    this.width = this.modelWidth + this.modelLeft;
                }
            } else if (this.modelWidth + this.modelLeft > this.rowsManager.gantt.width) {
                this.truncatedRight = true;
                this.truncatedLeft = false;
                this.width = this.rowsManager.gantt.width - this.modelLeft;
            } else {
                this.truncatedLeft = false;
                this.truncatedRight = false;
                this.width = this.modelWidth;
            }

            if (this.width < 0) {
                this.left = this.left + this.width;
                this.width = -this.width;
            }

            this.updateView();
        };

        Task.prototype.updateView = function() {
            if (this.$element) {
                this.$element.css('left', this.left + 'px');
                this.$element.css('width', this.width + 'px');
            }
        };

        // Expands the start of the task to the specified position (in em)
        Task.prototype.setFrom = function(x) {
            this.model.from = this.rowsManager.gantt.getDateByPosition(x, true);
            this.row.setFromToByTask(this);
            this.updatePosAndSize();
        };

        // Expands the end of the task to the specified position (in em)
        Task.prototype.setTo = function(x) {
            this.model.to = this.rowsManager.gantt.getDateByPosition(x, true);
            this.row.setFromToByTask(this);
            this.updatePosAndSize();
        };

        // Moves the task to the specified position (in em)
        Task.prototype.moveTo = function(x) {
            this.model.from = this.rowsManager.gantt.getDateByPosition(x, true);
            var newTaskLeft = this.rowsManager.gantt.getPositionByDate(this.model.from);
            this.model.to = this.rowsManager.gantt.getDateByPosition(newTaskLeft + this.modelWidth, true);
            this.row.setFromToByTask(this);
            this.updatePosAndSize();
        };

        Task.prototype.clone = function() {
            return new Task(this.row, angular.copy(this.model));
        };

        return Task;
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').factory('GanttBody', ['GanttBodyColumns', 'GanttBodyRows', 'GanttBodyBackground', 'GanttBodyForeground', function(BodyColumns, BodyRows, BodyBackground, BodyForeground) {
        var Body= function(gantt) {
            this.gantt = gantt;

            this.background = new BodyBackground(this);
            this.foreground = new BodyForeground(this);
            this.columns = new BodyColumns(this);
            this.rows = new BodyRows(this);
        };
        return Body;
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').factory('GanttBodyBackground', [function() {
        var GanttBodyBackground = function(body) {
            this.body = body;
        };
        return GanttBodyBackground;
    }]);
}());

(function(){
    'use strict';
    angular.module('gantt').factory('GanttBodyColumns', [function() {
        var BodyColumns = function(body) {
            this.body = body;
        };
        return BodyColumns;
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').factory('GanttBodyForeground', [function() {
        var GanttBodyForeground = function(body) {
            this.body = body;
        };
        return GanttBodyForeground;
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').factory('GanttBodyRows', [function() {
        var BodyRows = function(body) {
            this.body = body;
        };
        return BodyRows;
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').factory('GanttHeader', ['GanttHeaderColumns', function(HeaderColumns) {
        var Header = function(gantt) {
            this.gantt = gantt;
            this.columns = new HeaderColumns(this);

            this.getHeight = function() {
                return this.$element[0].offsetHeight;
            };
        };
        return Header;
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').factory('GanttHeaderColumns', [function() {
        var HeaderColumns = function($element) {
            this.$element = $element;
        };
        return HeaderColumns;
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').factory('GanttLabels', [function() {
        var Labels= function(gantt) {
            this.gantt = gantt;
            this.gantt.api.registerEvent('labels', 'resize');
            this.gantt.api.registerEvent('labels', 'resizeBegin');
            this.gantt.api.registerEvent('labels', 'resizeEnd');
        };
        return Labels;
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').factory('GanttScroll', [function() {
        var Scroll = function(gantt) {
            this.gantt = gantt;

            this.gantt.api.registerEvent('scroll', 'scroll');

            this.gantt.api.registerMethod('scroll', 'to', Scroll.prototype.scrollTo, this);
            this.gantt.api.registerMethod('scroll', 'toDate', Scroll.prototype.scrollToDate, this);
            this.gantt.api.registerMethod('scroll', 'left', Scroll.prototype.scrollToLeft, this);
            this.gantt.api.registerMethod('scroll', 'right', Scroll.prototype.scrollToRight, this);
        };

        Scroll.prototype.getScrollLeft = function() {
            return this.$element === undefined ? undefined : this.$element[0].scrollLeft;
        };

        Scroll.prototype.getScrollWidth = function() {
            return this.$element === undefined ? undefined : this.$element[0].scrollWidth;
        };

        /**
         * Scroll to a position
         *
         * @param {number} position Position to scroll to.
         */
        Scroll.prototype.scrollTo = function(position) {
            this.$element[0].scrollLeft = position;
            this.$element.triggerHandler('scroll');
        };

        /**
         * Scroll to the left side
         *
         * @param {number} offset Offset to scroll.
         */
        Scroll.prototype.scrollToLeft = function(offset) {
            this.$element[0].scrollLeft -= offset;
            this.$element.triggerHandler('scroll');
        };

        /**
         * Scroll to the right side
         *
         * @param {number} offset Offset to scroll.
         */
        Scroll.prototype.scrollToRight = function(offset) {
            this.$element[0].scrollLeft += offset;
            this.$element.triggerHandler('scroll');
        };

        /**
         * Scroll to a date
         *
         * @param {moment} date moment to scroll to.
         */
        Scroll.prototype.scrollToDate = function(date) {
            var position = this.gantt.getPositionByDate(date);

            if (position !== undefined) {
                this.$element[0].scrollLeft = position - this.$element[0].offsetWidth / 2;
            }
        };

        return Scroll;
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').factory('GanttTimespan', [function() {
        var Timespan = function(gantt, model) {
            this.gantt = gantt;
            this.model = model;
        };

        // Updates the pos and size of the timespan according to the from - to date
        Timespan.prototype.updatePosAndSize = function() {
            this.left = this.gantt.getPositionByDate(this.model.from);
            this.width = this.gantt.getPositionByDate(this.model.to) - this.left;
            this.updateView();
        };

        Timespan.prototype.updateView = function() {
            if (this.$element) {
                this.$element.css('left', this.left + 'px');
                this.$element.css('width', this.width + 'px');
            }
        };

        // Expands the start of the timespan to the specified position (in em)
        Timespan.prototype.setFrom = function(x) {
            this.from = this.gantt.getDateByPosition(x);
            this.updatePosAndSize();
        };

        // Expands the end of the timespan to the specified position (in em)
        Timespan.prototype.setTo = function(x) {
            this.to = this.gantt.getDateByPosition(x);
            this.updatePosAndSize();
        };

        // Moves the timespan to the specified position (in em)
        Timespan.prototype.moveTo = function(x) {
            this.from = this.gantt.getDateByPosition(x);
            this.to = this.gantt.getDateByPosition(x + this.width);
            this.updatePosAndSize();
        };

        Timespan.prototype.clone = function() {
            return new Timespan(this.gantt, angular.copy(this.model));
        };

        return Timespan;
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').factory('GanttTimespansManager', ['GanttTimespan', function(Timespan) {
        var GanttTimespansManager = function(gantt) {
            var self = this;

            this.gantt = gantt;

            this.timespansMap = {};
            this.timespans = [];

            this.gantt.$scope.$watchCollection('timespans', function(newValue) {
                self.clearTimespans();
                self.loadTimespans(newValue);
            });

            this.gantt.api.registerMethod('timespans', 'load', this.loadTimespans, this);
            this.gantt.api.registerMethod('timespans', 'remove', this.removeTimespans, this);
            this.gantt.api.registerMethod('timespans', 'clear', this.clearTimespans, this);

            this.gantt.api.registerEvent('timespans', 'add');
            this.gantt.api.registerEvent('timespans', 'remove');
            this.gantt.api.registerEvent('timespans', 'change');
        };

        // Adds or updates timespans
        GanttTimespansManager.prototype.loadTimespans = function(timespans) {
            if (!angular.isArray(timespans)) {
                timespans = timespans !== undefined ? [timespans] : [];
            }

            this.gantt.$scope.timespans = timespans;
            for (var i = 0, l = timespans.length; i < l; i++) {
                var timespanModel = timespans[i];
                this.gantt.objectModel.cleanTimespan(timespanModel);
                this.loadTimespan(timespanModel);
            }
        };

        // Adds a timespan or merges the timespan if there is already one with the same id
        GanttTimespansManager.prototype.loadTimespan = function(timespanModel) {
            // Copy to new timespan (add) or merge with existing (update)
            var timespan, isUpdate = false;

            if (timespanModel.id in this.timespansMap) {
                timespan = this.timespansMap[timespanModel.id];
                timespan.model = timespanModel;
                isUpdate = true;
                this.gantt.api.timespans.raise.change(timespan);
            } else {
                timespan = new Timespan(this.gantt, timespanModel);
                this.timespansMap[timespanModel.id] = timespan;
                this.timespans.push(timespan);
                this.gantt.api.timespans.raise.add(timespan);
            }

            timespan.updatePosAndSize();
            return isUpdate;
        };

        GanttTimespansManager.prototype.removeTimespans = function(timespans) {
            if (!angular.isArray(timespans)) {
                timespans = [timespans];
            }

            for (var i = 0, l = timespans.length; i < l; i++) {
                var timespanData = timespans[i];
                // Delete the timespan
                this.removeTimespan(timespanData.id);
            }
            this.updateVisibleObjects();
        };

        GanttTimespansManager.prototype.removeTimespan = function(timespanId) {
            if (timespanId in this.timespansMap) {
                delete this.timespansMap[timespanId]; // Remove from map

                var removedTimespan;
                var timespan;
                for (var i = this.timespans.length - 1; i >= 0; i--) {
                    timespan = this.timespans[i];
                    if (timespan.model.id === timespanId) {
                        removedTimespan = timespan;
                        this.timespans.splice(i, 1); // Remove from array
                    }
                }

                this.gantt.api.timespans.raise.remove(removedTimespan);
                return removedTimespan;
            }

            return undefined;
        };

        // Removes all timespans
        GanttTimespansManager.prototype.clearTimespans = function() {
            this.timespansMap = {};
            this.timespans = [];
        };

        GanttTimespansManager.prototype.updateTimespansPosAndSize = function() {
            for (var i = 0, l = this.timespans.length; i < l; i++) {
                this.timespans[i].updatePosAndSize();
            }
        };

        return GanttTimespansManager;
    }]);
}());

(function(){
    'use strict';
    angular.module('gantt').service('ganttArrays', [function() {
        return {
            moveToIndex: function(array, oldIndex, newIndex) {
                if (newIndex >= array.length) {
                    var k = newIndex - array.length;
                    while ((k--) + 1) {
                        array.push(undefined);
                    }
                }
                array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
                return array;
            },
            getRemovedIds: function(newArray, oldArray, idProperty) {
                if (idProperty === undefined) {
                    idProperty = 'id';
                }

                var i, l;
                var removedIds = [];

                if (oldArray !== undefined) {
                    for (i = 0, l = oldArray.length; i < l; i++) {
                        removedIds.push(oldArray[i][idProperty]);
                    }
                }

                if (newArray !== undefined) {
                    for (i = 0, l = newArray.length; i < l; i++) {
                        var newObject = newArray[i];

                        if (newObject[idProperty] !== undefined) {
                            var newObjectIndex = removedIds.indexOf(newObject[idProperty]);
                            if (newObjectIndex > -1) {
                                removedIds.splice(newObjectIndex, 1);
                            }
                        }
                    }
                }

                return removedIds;
            },
            indexOfId: function(array, value, idProperties) {
                var i;
                if (idProperties === undefined) {
                    idProperties = 'id';
                } else if (idProperties instanceof Array) {
                    for (i = array.length - 1; i >= 0; i--) {
                        var arrayValue = array[i];
                        for (var k = 0, l = idProperties.length; k < l; k++) {
                            arrayValue = arrayValue[idProperties[k]];
                        }
                        if (arrayValue === value) {
                            return i;
                        }
                    }
                    return -1;
                }
                for (i = array.length - 1; i >= 0; i--) {
                    if (array[i][idProperties] === value) {
                        return i;
                    }
                }
                return -1;
            },
            removeId: function(array, value, idProperties) {
                var indexOf = this.indexOfId(array, value, idProperties);
                if (indexOf > -1) {
                    return array.splice(indexOf, 1)[0];
                }
            },
            remove: function(array, value) {
                var index = array.indexOf(value);
                if (index > -1) {
                    array.splice(index, 1);
                    return true;
                }
                return false;
            }
        };
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').service('ganttBinarySearch', [ function() {
        // Returns the object on the left and right in an array using the given cmp function.
        // The compare function defined which property of the value to compare (e.g.: c => c.left)

        return {
            getIndicesOnly: function(input, value, comparer) {
                var lo = -1, hi = input.length;
                while (hi - lo > 1) {
                    var mid = Math.floor((lo + hi) / 2);
                    if (comparer(input[mid]) <= value) {
                        lo = mid;
                    } else {
                        hi = mid;
                    }
                }
                if (input[lo] !== undefined && comparer(input[lo]) === value) {
                    hi = lo;
                }
                return [lo, hi];
            },
            get: function(input, value, comparer) {
                var res = this.getIndicesOnly(input, value, comparer);
                return [input[res[0]], input[res[1]]];
            }
        };
    }]);
}());

(function() {
    'use strict';
    angular.module('gantt').service('ganttUtils', ['$document', function($document) {
        return {
            createBoundedWrapper: function(object, method) {
                return function() {
                    return method.apply(object, arguments);
                };
            },
            firstProperty: function(objects, propertyName, defaultValue) {
                for (var i = 0, l = objects.length; i < l; i++) {
                    var object = objects[i];
                    if (object !== undefined && propertyName in object) {
                        if (object[propertyName] !== undefined) {
                            return object[propertyName];
                        }
                    }
                }
                return defaultValue;
            },
            elementFromPoint: function(x, y) {
                return $document[0].elementFromPoint(x, y);
            },
            elementsFromPoint: function(x, y, depth) {
                var elements = [], previousPointerEvents = [], cDepth = 0, current, i, l, d;

                // get all elements via elementFromPoint, and remove them from hit-testing in order
                while ((current = this.elementFromPoint(x, y)) && elements.indexOf(current) === -1 && current !== null &&
                    (depth === undefined || cDepth < depth)) {

                    // push the element and its current style
                    elements.push(current);
                    previousPointerEvents.push({
                        value: current.style.getPropertyValue('pointer-events'),
                        priority: current.style.getPropertyPriority('pointer-events')
                    });

                    // add "pointer-events: none", to get to the underlying element
                    current.style.setProperty('pointer-events', 'none', 'important');

                    cDepth++;
                }

                // restore the previous pointer-events values
                for (i = 0, l = previousPointerEvents.length; i < l; i++) {
                    d = previousPointerEvents[i];
                    elements[i].style.setProperty('pointer-events', d.value ? d.value : '', d.priority);
                }

                return elements;
            },
            findElementFromPoint: function(x, y, checkFunction) {
                var elements = [], previousPointerEvents = [], cDepth = 0, current, found, i, l, d;

                // get all elements via elementFromPoint, and remove them from hit-testing in order
                while ((current = this.elementFromPoint(x, y)) && elements.indexOf(current) === -1 && current !== null) {

                    // push the element and its current style
                    elements.push(current);
                    previousPointerEvents.push({
                        value: current.style.getPropertyValue('pointer-events'),
                        priority: current.style.getPropertyPriority('pointer-events')
                    });

                    // add "pointer-events: none", to get to the underlying element
                    current.style.setProperty('pointer-events', 'none', 'important');

                    cDepth++;

                    if (checkFunction(current)) {
                        found = current;
                        break;
                    }
                }

                // restore the previous pointer-events values
                for (i = 0, l = previousPointerEvents.length; i < l; i++) {
                    d = previousPointerEvents[i];
                    elements[i].style.setProperty('pointer-events', d.value ? d.value : '', d.priority);
                }

                return found;
            },
            random4: function() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            },
            randomUuid: function() {
                return this.random4() + this.random4() + '-' + this.random4() + '-' + this.random4() + '-' +
                    this.random4() + '-' + this.random4() + this.random4() + this.random4();
            },
            newId: (function() {
                var seedId = new Date().getTime();
                return function() {
                    return seedId += 1;
                };
            })()
        };
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').directive('ganttLabelsResize', ['$document', 'ganttMouseOffset', function($document, mouseOffset) {

        return {
            restrict: 'A',
            require: '^gantt',
            scope: { enabled: '=ganttLabelsResize',
                width: '=ganttLabelsResizeWidth',
                minWidth: '=ganttLabelsResizeMinWidth'},
            link: function(scope, element, attrs, ganttCtrl) {
                var api = ganttCtrl.gantt.api;

                var resizeAreaWidth = 5;
                var cursor = 'ew-resize';
                var originalPos;

                element.bind('mousedown', function(e) {
                    if (scope.enabled && isInResizeArea(e)) {
                        enableResizeMode(e);
                        e.preventDefault();
                    }
                });

                element.bind('mousemove', function(e) {
                    if (scope.enabled) {
                        if (isInResizeArea(e)) {
                            element.css('cursor', cursor);
                        } else {
                            element.css('cursor', '');
                        }
                    }
                });

                var resize = function(x) {
                    if (scope.width === 0) {
                        scope.width = element[0].offsetWidth;
                    }

                    scope.width += x - originalPos;
                    if (scope.width < scope.minWidth) {
                        scope.width = scope.minWidth;
                    }

                    originalPos = x;
                };

                var isInResizeArea = function(e) {
                    var x = mouseOffset.getOffset(e).x;

                    return x > element[0].offsetWidth - resizeAreaWidth;
                };

                var enableResizeMode = function(e) {
                    originalPos = e.screenX;

                    angular.element($document[0].body).css({
                        '-moz-user-select': '-moz-none',
                        '-webkit-user-select': 'none',
                        '-ms-user-select': 'none',
                        'user-select': 'none',
                        'cursor': cursor
                    });

                    var moveHandler = function(e) {
                        scope.$evalAsync(function(){
                            resize(e.screenX);
                            api.labels.raise.resize(scope.width);
                        });

                    };

                    angular.element($document[0].body).bind('mousemove', moveHandler);

                    angular.element($document[0].body).one('mouseup', function() {
                        angular.element($document[0].body).unbind('mousemove', moveHandler);
                        disableResizeMode();
                    });

                    api.labels.raise.resizeBegin(scope.width);
                };

                var disableResizeMode = function() {
                    element.css('cursor', '');

                    angular.element($document[0].body).css({
                        '-moz-user-select': '',
                        '-webkit-user-select': '',
                        '-ms-user-select': '',
                        'user-select': '',
                        'cursor': ''
                    });

                    api.labels.raise.resizeEnd(scope.width);
                };
            }
        };
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').filter('ganttColumnLimit', [ 'ganttBinarySearch', function(bs) {
        // Returns only the columns which are visible on the screen
        var leftComparator = function(c) {
            return c.left;
        };

        return function(input, gantt) {
            var scrollLeft = gantt.scroll.getScrollLeft();
            var scrollWidth = gantt.scroll.getScrollWidth();

            if (scrollWidth > 0) {
                var start = bs.getIndicesOnly(input, scrollLeft, leftComparator)[0];
                var end = bs.getIndicesOnly(input, scrollLeft + scrollWidth, leftComparator)[1];
                return input.slice(start, end);
            } else {
                return input.slice();
            }


        };
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').filter('ganttTaskLimit', [function() {
        // Returns only the tasks which are visible on the screen
        // Use the task width and position to decide if a task is still visible

        return function(input, gantt) {
            var firstColumn = gantt.columnsManager.getFirstColumn();
            var lastColumn = gantt.columnsManager.getLastColumn();

            if (firstColumn !== undefined && lastColumn !== undefined) {
                var res = [];

                var scrollLeft = gantt.scroll.getScrollLeft();
                var scrollWidth = gantt.scroll.getScrollWidth();

                for (var i = 0, l = input.length; i < l; i++) {
                    var task = input[i];

                    if (task.active) {
                        res.push(task);
                    } else {
                        // If the task can be drawn with gantt columns only.
                        if (task.model.to > gantt.columnsManager.getFirstColumn().date && task.model.from < gantt.columnsManager.getLastColumn().endDate) {

                            // If task has a visible part on the screen
                            if (!scrollWidth ||
                                task.left >= scrollLeft && task.left <= scrollLeft + scrollWidth ||
                                task.left + task.width >= scrollLeft && task.left + task.width <= scrollLeft + scrollWidth ||
                                task.left < scrollLeft && task.left + task.width > scrollLeft + scrollWidth) {

                                res.push(task);
                            }
                        }
                    }
                }

                return res;
            } else {
                return input.splice();
            }
        };
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').directive('ganttHorizontalScrollReceiver', function() {
        // The element with this attribute will scroll at the same time as the scrollSender element

        return {
            restrict: 'A',
            require: '^ganttScrollManager',
            controller: ['$scope', '$element', function($scope, $element) {
                $scope.scrollManager.registerHorizontalReceiver($element);
            }]
        };
    });
}());

(function(){
    'use strict';
    angular.module('gantt').directive('ganttScrollManager', function() {
        // The element with this attribute will scroll at the same time as the scrollSender element

        return {
            restrict: 'A',
            controller: ['$scope', function($scope) {
                $scope.scrollManager = {
                    horizontal: [],
                    vertical: [],

                    registerVerticalReceiver: function (element) {
                        element.css('position', 'relative');
                        $scope.scrollManager.vertical.push(element[0]);
                    },

                    registerHorizontalReceiver: function (element) {
                        element.css('position', 'relative');
                        $scope.scrollManager.horizontal.push(element[0]);
                    }
                };
            }]
        };
    });
}());


(function(){
    'use strict';
    angular.module('gantt').directive('ganttScrollSender', [function() {
        // Updates the element which are registered for the horizontal or vertical scroll event

        return {
            restrict: 'A',
            require: '^ganttScrollManager',
            controller: ['$scope', '$element', function($scope, $element) {
                var el = $element[0];

                var updateListeners = function() {
                    var i, l;

                    for (i = 0, l = $scope.scrollManager.vertical.length; i < l; i++) {
                        var vElement = $scope.scrollManager.vertical[i];
                        if (vElement.parentNode.scrollTop !== el.scrollTop) {
                            vElement.parentNode.scrollTop = el.scrollTop;
                        }
                    }

                    for (i = 0, l = $scope.scrollManager.horizontal.length; i < l; i++) {
                        var hElement = $scope.scrollManager.horizontal[i];
                        if (hElement.parentNode.scrollLeft !== el.scrollLeft) {
                            hElement.parentNode.scrollLeft  = el.scrollLeft;
                        }
                    }
                };

                $element.bind('scroll', updateListeners);

                $scope.$watch('bodyRowsWidth', function(newValue, oldValue) {
                    if (oldValue !== newValue) {
                        for (var i = 0, l = $scope.scrollManager.horizontal.length; i < l; i++) {
                            var hElement = $scope.scrollManager.horizontal[i];
                            hElement.style.width = newValue + 'px';
                        }
                    }
                });
            }]
        };
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').directive('ganttScrollable', ['GanttDirectiveBuilder', 'ganttDebounce', 'ganttLayout', 'moment', function(Builder, debounce, layout, moment) {
        var builder = new Builder('ganttScrollable');
        builder.controller = function($scope, $element) {
            $scope.gantt.scroll.$element = $element;

            var scrollBarWidth = layout.getScrollBarWidth();
            var lastScrollLeft;

            var lastAutoExpand;
            var autoExpandCoolDownPeriod = 500;
            var autoExpandColumns = function(el, date, direction) {
                if ($scope.autoExpand !== 'both' && $scope.autoExpand !== true && $scope.autoExpand !== direction) {
                    return;
                }

                if (Date.now() - lastAutoExpand < autoExpandCoolDownPeriod) {
                    return;
                }

                var from, to;
                var expandHour = 1, expandDay = 31;

                if (direction === 'left') {
                    from = $scope.viewScale === 'hour' ? moment(date).add(-expandHour, 'day') : moment(date).add(-expandDay, 'day');
                    to = date;
                } else {
                    from = date;
                    to = $scope.viewScale === 'hour' ? moment(date).add(expandHour, 'day') : moment(date).add(expandDay, 'day');
                }

                $scope.fromDate = from;
                $scope.toDate = to;
                lastAutoExpand = Date.now();
            };

            $element.bind('scroll', debounce(function() {
                var el = $element[0];
                var direction;
                var date;

                if (el.scrollLeft < lastScrollLeft && el.scrollLeft === 0) {
                    direction = 'left';
                    date = $scope.gantt.columnsManager.from;
                } else if (el.scrollLeft > lastScrollLeft && el.offsetWidth + el.scrollLeft >= el.scrollWidth - 1) {
                    direction = 'right';
                    date = $scope.gantt.columnsManager.to;
                }

                lastScrollLeft = el.scrollLeft;
                $scope.gantt.columnsManager.updateVisibleColumns();

                if (date !== undefined) {
                    autoExpandColumns(el, date, direction);
                    $scope.gantt.api.scroll.raise.scroll(el.scrollLeft, date, direction);
                } else {
                    $scope.gantt.api.scroll.raise.scroll(el.scrollLeft);
                }
            }, 5));

            $scope.getScrollableCss = function() {
                var css = {};

                if ($scope.ganttElementWidth - ($scope.showLabelsColumn ? $scope.labelsWidth : 0) > $scope.gantt.width + scrollBarWidth) {
                    css.width = $scope.gantt.width + scrollBarWidth + 'px';
                }

                if ($scope.maxHeight > 0) {
                    css['max-height'] = $scope.maxHeight - $scope.gantt.header.getHeight() + 'px';
                    css['overflow-y'] = 'auto';
                } else {
                    css['overflow-y'] = 'hidden';
                }

                return css;
            };
        };
        return builder.build();
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').directive('ganttVerticalScrollReceiver', function() {
        // The element with this attribute will scroll at the same time as the scrollSender element

        return {
            restrict: 'A',
            require: '^ganttScrollManager',
            controller: ['$scope', '$element', function($scope, $element) {
                $scope.scrollManager.registerVerticalReceiver($element);
            }]
        };
    });
}());


(function(){
    'use strict';
    angular.module('gantt').directive('ganttElementHeightListener', [function() {
        return {
            restrict: 'A',
            controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
                var scopeVariable = $attrs.ganttElementHeightListener;
                if (scopeVariable === '') {
                    scopeVariable = 'ganttElementHeight';
                }

                var effectiveScope = $scope;

                while(scopeVariable.indexOf('$parent.') === 0) {
                    scopeVariable = scopeVariable.substring('$parent.'.length);
                    effectiveScope = effectiveScope.$parent;
                }

                effectiveScope.$watch(function() {
                    if ($element[0].offsetHeight > 0) {
                        effectiveScope[scopeVariable] = $element[0].offsetHeight;
                    }
                });
            }]
        };
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').directive('ganttElementWidthListener', [function() {
        return {
            restrict: 'A',
            controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
                var scopeVariable = $attrs.ganttElementWidthListener;
                if (scopeVariable === '') {
                    scopeVariable = 'ganttElementWidth';
                }

                var effectiveScope = $scope;

                while(scopeVariable.indexOf('$parent.') === 0) {
                    scopeVariable = scopeVariable.substring('$parent.'.length);
                    effectiveScope = effectiveScope.$parent;
                }

                effectiveScope.$watch(function() {
                    if ($element[0].offsetWidth > 0) {
                        effectiveScope[scopeVariable] = $element[0].offsetWidth;
                    }
                });
            }]
        };
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').directive('ganttBody', ['GanttDirectiveBuilder', function(Builder) {
        var builder = new Builder('ganttBody');
        builder.controller = function($scope, $element) {
            $scope.gantt.body.$element = $element;
            $scope.gantt.body.$scope = $scope;
        };
        return builder.build();
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').directive('ganttBodyBackground', ['GanttDirectiveBuilder', function(Builder) {
        var builder = new Builder('ganttBodyBackground');
        builder.controller = function($scope, $element) {
            $scope.gantt.body.background.$element = $element;
            $scope.gantt.body.background.$scope = $scope;
        };
        return builder.build();
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').directive('ganttBodyColumns', ['GanttDirectiveBuilder', function(Builder) {
        var builder = new Builder('ganttBodyColumns');
        builder.controller = function($scope, $element) {
            $scope.gantt.body.columns.$element = $element;
            $scope.gantt.body.background.$scope = $scope;
        };
        return builder.build();
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').directive('ganttBodyForeground', ['GanttDirectiveBuilder', function(Builder) {
        var builder = new Builder('ganttBodyForeground');
        builder.controller = function($scope, $element) {
            $scope.gantt.body.foreground.$element = $element;
            $scope.gantt.body.foreground.$scope = $scope;
        };
        return builder.build();
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').directive('ganttBodyRows', ['GanttDirectiveBuilder', function(Builder) {
        var builder = new Builder('ganttBodyRows');
        builder.controller = function($scope, $element) {
            $scope.gantt.body.rows.$element = $element;
            $scope.gantt.body.rows.$scope = $scope;
        };
        return builder.build();
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').directive('ganttColumn', ['GanttDirectiveBuilder', function(Builder) {
        var builder = new Builder('ganttColumn');
        builder.controller = function($scope, $element) {
            $scope.column.$element = $element;
            $scope.column.$scope = $scope;
            $scope.column.updateView();
        };
        return builder.build();
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').directive('ganttColumnHeader', ['GanttDirectiveBuilder', function(Builder) {
        var builder = new Builder('ganttColumnHeader');
        builder.controller = function($scope, $element) {
            $scope.column.$element = $element;
            $scope.column.$scope = $scope;
            $scope.column.updateView();
        };
        return builder.build();
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').directive('ganttHeader', ['GanttDirectiveBuilder', function(Builder) {
        var builder = new Builder('ganttHeader');
        builder.controller = function($scope, $element) {
            $scope.gantt.header.$element = $element;
            $scope.gantt.header.$scope = $scope;

            $scope.getHeaderCss = function() {
                var css = {};

                if ($scope.ganttElementWidth - ($scope.showLabelsColumn ? $scope.labelsWidth : 0) > $scope.gantt.width) {
                    css.width = $scope.gantt.width + 'px';
                }

                return css;
            };
        };
        return builder.build();
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').directive('ganttHeaderColumns', ['GanttDirectiveBuilder', function(Builder) {
        var builder = new Builder('ganttHeaderColumns');
        builder.controller = function($scope, $element) {
            $scope.gantt.header.columns.$element = $element;
            $scope.gantt.header.columns.$scope = $scope;
        };
        return builder.build();
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').directive('ganttLabels', ['GanttDirectiveBuilder', function(Builder) {
        var builder = new Builder('ganttLabels');
        builder.controller = function($scope, $element) {
            $scope.gantt.labels.$element = $element;
            $scope.gantt.labels.$scope = $scope;
        };
        return builder.build();
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').directive('ganttLabelsBody', ['GanttDirectiveBuilder', function(Builder) {
        var builder = new Builder('ganttLabelsBody');
        return builder.build();
    }]);
}());



(function(){
    'use strict';
    angular.module('gantt').directive('ganttLabelsHeader', ['GanttDirectiveBuilder', function(Builder) {
        var builder = new Builder('ganttLabelsHeader');
        return builder.build();
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').directive('ganttRow', ['GanttDirectiveBuilder', function(Builder) {
        var builder = new Builder('ganttRow');
        builder.controller = function($scope, $element) {
            $scope.row.$element = $element;
            $scope.row.$scope = $scope;
        };
        return builder.build();
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').directive('ganttRowBackground', ['GanttDirectiveBuilder', function(Builder) {
        var builder = new Builder('ganttRowBackground');
        return builder.build();
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').directive('ganttRowHeader', ['GanttDirectiveBuilder', function(Builder) {
        var builder = new Builder('ganttRowHeader');
        builder.controller = function($scope, $element) {
            $scope.gantt.rowHeader.$element = $element;
            $scope.gantt.rowHeader.$scope = $scope;
        };
        return builder.build();
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').directive('ganttRowLabel', ['GanttDirectiveBuilder', function(Builder) {
        var builder = new Builder('ganttRowLabel');
        return builder.build();
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').directive('ganttTask', ['GanttDirectiveBuilder', function(Builder) {
        var builder = new Builder('ganttTask');
        builder.controller = function($scope, $element) {
            $scope.task.$element = $element;
            $scope.task.$scope = $scope;

            $scope.$watchGroup(['task.model.from', 'task.model.to'], function() {
                $scope.task.updatePosAndSize();
            });
        };
        return builder.build();
    }]);
}());

(function(){
    'use strict';
    angular.module('gantt').directive('ganttTaskContent', ['GanttDirectiveBuilder', function(Builder) {
        var builder = new Builder('ganttTaskContent');
        return builder.build();
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').directive('ganttTimeFrame', ['GanttDirectiveBuilder', function(Builder) {
        var builder = new Builder('ganttTimeFrame');
        builder.controller = function($scope, $element) {
            $scope.timeFrame.$element = $element;
            $scope.timeFrame.$scope = $scope;
            $scope.timeFrame.updateView();
        };
        return builder.build();
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').directive('ganttTimespan', ['GanttDirectiveBuilder', function(Builder) {
        var builder = new Builder('ganttTimespan');
        builder.controller = function($scope, $element) {
            $scope.timespan.$element = $element;
            $scope.timespan.$scope = $scope;
            $scope.timespan.updateView();
        };
        return builder.build();
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').factory('ganttDebounce', ['$timeout', function($timeout) {
        function debounce(fn, timeout, invokeApply) {
            var nthCall = 0;
            return function() {
                var self = this;
                var argz = arguments;
                nthCall++;
                var later = (function(version) {
                    return function() {
                        if (version === nthCall) {
                            return fn.apply(self, argz);
                        }
                    };
                })(nthCall);
                return $timeout(later, timeout, invokeApply === undefined ? true: invokeApply);
            };
        }

        return debounce;
    }]);
}());

(function(){
    'use strict';
    angular.module('gantt').service('GanttDirectiveBuilder', [function() {
        var DirectiveBuilder = function DirectiveBuilder(directiveName, templateUrl, require, restrict) {
            var self = this;

            this.directiveName = directiveName;
            this.templateUrl = templateUrl === undefined ? 'template/' + directiveName + '.tmpl.html' : templateUrl;
            this.require = require === undefined ? '^gantt' : require;
            this.restrict = restrict === undefined ? 'E' : restrict;
            this.transclude = true;
            this.replace = true;

            this.build = function() {
                var directiveName = self.directiveName;
                var templateUrl = self.templateUrl;
                var controllerFunction = self.controller;

                return {
                    restrict: self.restrict,
                    require: self.require,
                    transclude: self.transclude,
                    replace: self.replace,
                    templateUrl: function(tElement, tAttrs) {
                        if (tAttrs.templateUrl === undefined) {
                            return templateUrl;
                        } else {
                            return tAttrs.templateUrl;
                        }
                    },
                    compile: function () {
                        return {
                            pre: function preLink(scope, iElement, iAttrs, controller) {
                                scope.gantt.api.directives.raise.preLink(directiveName, scope, iElement, iAttrs, controller);
                            },
                            post: function postLink(scope, iElement, iAttrs, controller) {
                                scope.gantt.api.directives.raise.postLink(directiveName, scope, iElement, iAttrs, controller);
                            }
                        };
                    },
                    controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
                        var controller = this;

                        if (controllerFunction !== undefined) {
                            controllerFunction($scope, $element, $attrs, controller);
                        }

                        $scope.gantt.api.directives.raise.new(directiveName, $scope, $element, $attrs, controller);
                        $scope.$on('$destroy', function() {
                            $scope.gantt.api.directives.raise.destroy(directiveName, $scope, $element, $attrs, controller);
                        });
                    }]
                };
            };
        };

        return DirectiveBuilder;
    }]);
}());

(function(){
    'use strict';
    angular.module('gantt').service('ganttEnableNgAnimate', ['$injector', function($injector) {
        var ngAnimate;
        try {
            ngAnimate = $injector.get('$animate');
        } catch (e) {
        }

        if (ngAnimate !== undefined) {
            return function(enabled, element) {
                ngAnimate.enabled(false, element);
            };
        } else {
            return function() {};
        }


    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').service('ganttLayout', ['$document', function($document) {
        return {
            /**
             * Compute the width of scrollbar.
             *
             * @returns {number} width of the scrollbar, in px.
             */
            getScrollBarWidth: function() {
                var inner = $document[0].createElement('p');
                inner.style.width = '100%';
                inner.style.height = '200px';

                var outer = $document[0].createElement('div');
                outer.style.position = 'absolute';
                outer.style.top = '0px';
                outer.style.left = '0px';
                outer.style.visibility = 'hidden';
                outer.style.width = '200px';
                outer.style.height = '150px';
                outer.style.overflow = 'hidden';
                outer.appendChild (inner);

                $document[0].body.appendChild (outer);
                var w1 = inner.offsetWidth;
                outer.style.overflow = 'scroll';
                var w2 = inner.offsetWidth;
                if (w1 === w2) {
                    w2 = outer.clientWidth;
                }
                $document[0].body.removeChild (outer);

                return (w1 - w2);
            },

            setColumnsWidth: function(width, originalWidth, columns) {
                if (width && originalWidth && columns) {

                    var widthFactor = Math.abs(width / originalWidth);

                    angular.forEach(columns, function(column) {
                        column.left = widthFactor * column.originalSize.left;
                        column.width = widthFactor * column.originalSize.width;

                        angular.forEach(column.timeFrames, function(timeFrame) {
                            timeFrame.left = widthFactor * timeFrame.originalSize.left;
                            timeFrame.width = widthFactor * timeFrame.originalSize.width;
                        });
                    });
                }
            }
        };
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').service('ganttMouseButton', [ function() {
        // Mouse button cross browser normalization

        return {
            getButton: function(e) {
                e = e || window.event;

                if (!e.which) {
                    if (e.button === undefined) {
                        return 1;
                    }
                    return e.button < 2 ? 1 : e.button === 4 ? 2 : 3;
                } else {
                    return e.which;
                }
            }
        };
    }]);
}());

(function(){
    'use strict';
    angular.module('gantt').service('ganttMouseOffset', [ function() {
        // Mouse offset support for lesser browsers (read IE 8)

        return {
            getTouch: function(evt) {
                if (evt.touches !== undefined) {
                    return evt.touches[0];
                }
                return evt;
            },
            getOffset: function(evt) {
                if (evt.offsetX && evt.offsetY) {
                    return { x: evt.offsetX, y: evt.offsetY };
                }
                if (evt.layerX && evt.layerY) {
                    return { x: evt.layerX, y: evt.layerY };
                }
                return this.getOffsetForElement(evt.target, evt);
            },
            getOffsetForElement: function(el, evt) {
                var bb = el.getBoundingClientRect();
                return { x: evt.clientX - bb.left, y: evt.clientY - bb.top };
            }
        };
    }]);
}());

(function(){
    'use strict';
    angular.module('gantt').factory('ganttSmartEvent', [function() {
        // Auto released the binding when the scope is destroyed. Use if an event is registered on another element than the scope.

        function smartEvent($scope, $element, event, fn) {
            $scope.$on('$destroy', function() {
                $element.unbind(event, fn);
            });

            return {
                bindOnce: function() {
                    $element.one(event, fn);
                },
                bind: function() {
                    $element.bind(event, fn);
                },
                unbind: function() {
                    $element.unbind(event, fn);
                }
            };
        }

        return smartEvent;
    }]);
}());

angular.module('gantt.templates', []).run(['$templateCache', function($templateCache) {
    $templateCache.put('template/gantt.tmpl.html',
        '<div class="gantt unselectable" ng-cloak gantt-scroll-manager gantt-element-width-listener>\n' +
        '    <gantt-labels>\n' +
        '        <gantt-labels-header>\n' +
        '            <gantt-row-header></gantt-row-header>\n' +
        '        </gantt-labels-header>\n' +
        '        <gantt-labels-body>\n' +
        '            <div ng-repeat="row in gantt.rowsManager.visibleRows track by row.model.id">\n' +
        '                <gantt-row-label></gantt-row-label>\n' +
        '            </div>\n' +
        '        </gantt-labels-body>\n' +
        '    </gantt-labels>\n' +
        '    <gantt-header>\n' +
        '        <gantt-header-columns>\n' +
        '            <div ng-repeat="header in gantt.columnsManager.visibleHeaders">\n' +
        '                <div class="gantt-header-row" ng-class="$last && \'gantt-header-row-last\' || \'\'">\n' +
        '                    <div ng-repeat="column in header">\n' +
        '                        <gantt-column-header ></gantt-column-header>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </gantt-header-columns>\n' +
        '    </gantt-header>\n' +
        '    <gantt-scrollable>\n' +
        '        <gantt-body>\n' +
        '            <gantt-body-background>\n' +
        '                <div ng-repeat="row in gantt.rowsManager.visibleRows track by row.model.id">\n' +
        '                    <gantt-row-background></gantt-row-background>\n' +
        '                </div>\n' +
        '            </gantt-body-background>\n' +
        '            <gantt-body-foreground>\n' +
        '                <div class="gantt-current-date-line" ng-if="currentDate === \'line\' && gantt.currentDateManager.position >= 0 && gantt.currentDateManager.position <= gantt.width" ng-style="{\'left\': gantt.currentDateManager.position + \'px\' }"></div>\n' +
        '            </gantt-body-foreground>\n' +
        '            <gantt-body-columns>\n' +
        '                <div ng-repeat="column in gantt.columnsManager.visibleColumns">\n' +
        '                    <gantt-column>\n' +
        '                        <div ng-repeat="timeFrame in column.visibleTimeFrames">\n' +
        '                            <gantt-time-frame></gantt-time-frame>\n' +
        '                        </div>\n' +
        '                    </gantt-column>\n' +
        '                </div>\n' +
        '            </gantt-body-columns>\n' +
        '            <gantt-body-rows gantt-element-height-listener="$parent.$parent.bodyRowsHeight" gantt-element-width-listener="$parent.$parent.bodyRowsWidth">\n' +
        '                <div ng-repeat="timespan in gantt.timespansManager.timespans">\n' +
        '                    <gantt-timespan></gantt-timespan>\n' +
        '                </div>\n' +
        '                <div ng-repeat="row in gantt.rowsManager.visibleRows track by row.model.id">\n' +
        '                    <gantt-row>\n' +
        '                        <div ng-repeat="task in row.visibleTasks track by task.model.id">\n' +
        '                            <gantt-task ></gantt-task>\n' +
        '                        </div>\n' +
        '                    </gantt-row>\n' +
        '                </div>\n' +
        '            </gantt-body-rows>\n' +
        '        </gantt-body>\n' +
        '    </gantt-scrollable>\n' +
        '\n' +
        '    <!-- Plugins -->\n' +
        '    <ng-transclude></ng-transclude>\n' +
        '\n' +
        '    <!--\n' +
        '    ******* Inline templates *******\n' +
        '    You can specify your own templates by either changing the default ones below or by\n' +
        '    adding an attribute template-url="<url to your template>" on the specific element.\n' +
        '    -->\n' +
        '\n' +
        '    <!-- Body template -->\n' +
        '    <script type="text/ng-template" id="template/ganttBody.tmpl.html">\n' +
        '        <div ng-transclude class="gantt-body"\n' +
        '             ng-style="{\'width\': gantt.width +\'px\'}"></div>\n' +
        '    </script>\n' +
        '\n' +
        '    <!-- Header template -->\n' +
        '    <script type="text/ng-template" id="template/ganttHeader.tmpl.html">\n' +
        '        <div ng-transclude class="gantt-header"\n' +
        '             ng-show="gantt.columnsManager.columns.length > 0 && gantt.columnsManager.headers.length > 0"\n' +
        '             ng-style="getHeaderCss()"></div>\n' +
        '    </script>\n' +
        '\n' +
        '    <!-- Row label template -->\n' +
        '    <script type="text/ng-template" id="template/ganttRowLabel.tmpl.html">\n' +
        '        <div class="gantt-labels-row gantt-row-height"\n' +
        '             ng-class-odd="\'gantt-background-row\'"\n' +
        '             ng-class-even="\'gantt-background-row-alt\'"\n' +
        '             ng-class="row.model.classes" ng-style="{\'background-color\': row.model.color, \'height\': row.model.height}">\n' +
        '                <span class="gantt-labels-text">{{ row.model.name }}</span>\n' +
        '        </div>\n' +
        '    </script>\n' +
        '\n' +
        '    <!-- Row header template -->\n' +
        '    <script type="text/ng-template" id="template/ganttRowHeader.tmpl.html">\n' +
        '        <div class="gantt-labels-header-row gantt-labels-header-row-last"\n' +
        '             ng-show="gantt.columnsManager.columns.length > 0 && gantt.columnsManager.headers.length > 0"\n' +
        '             ng-style="{\'margin-top\': ((gantt.columnsManager.headers.length-1)*2)+\'em\'}">\n' +
        '            <span>Name</span>\n' +
        '        </div>\n' +
        '    </script>\n' +
        '\n' +
        '    <!-- Labels header template-->\n' +
        '    <script type="text/ng-template" id="template/ganttLabelsHeader.tmpl.html">\n' +
        '        <div ng-transclude= class="gantt-labels-header">\n' +
        '        </div>\n' +
        '    </script>\n' +
        '\n' +
        '    <script type="text/ng-template" id="template/ganttLabelsBody.tmpl.html">\n' +
        '    <div class="gantt-labels-body"\n' +
        '         ng-style="(maxHeight > 0 && {\'max-height\': (maxHeight - gantt.header.getHeight())+\'px\'} || {})">\n' +
        '        <div ng-transclude gantt-vertical-scroll-receiver>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    </script>\n' +
        '\n' +
        '    <!-- Labels template -->\n' +
        '    <script type="text/ng-template" id="template/ganttLabels.tmpl.html">\n' +
        '        <div ng-transclude ng-if="showLabelsColumn" class="gantt-labels"\n' +
        '             ng-style="($parent.labelsWidth > 0 && {\'width\': $parent.labelsWidth+\'px\'} || {})"\n' +
        '             gantt-labels-resize="$parent.allowLabelsResizing"\n' +
        '             gantt-labels-resize-width="$parent.labelsWidth"\n' +
        '             gantt-labels-resize-min-width="50"\n' +
        '             gantt-element-width-listener="$parent.labelsWidth"></div>\n' +
        '    </script>\n' +
        '\n' +
        '    <!-- Header columns template -->\n' +
        '    <script type="text/ng-template" id="template/ganttHeaderColumns.tmpl.html">\n' +
        '        <div ng-transclude class="gantt-header-columns"\n' +
        '              gantt-horizontal-scroll-receiver></div>\n' +
        '    </script>\n' +
        '\n' +
        '    <script type="text/ng-template" id="template/ganttColumnHeader.tmpl.html">\n' +
        '        <div class="gantt-column-header">\n' +
        '            {{ ::column.label }}\n' +
        '        </div>\n' +
        '    </script>\n' +
        '\n' +
        '    <!-- Body background template -->\n' +
        '    <script type="text/ng-template" id="template/ganttBodyBackground.tmpl.html">\n' +
        '        <div ng-transclude class="gantt-body-background"></div>\n' +
        '    </script>\n' +
        '\n' +
        '    <!-- Row background template -->\n' +
        '    <script type="text/ng-template" id="template/ganttRowBackground.tmpl.html">\n' +
        '        <div class="gantt-row-height"\n' +
        '             ng-class-odd="\'gantt-background-row\'"\n' +
        '             ng-class-even="\'gantt-background-row-alt\'"\n' +
        '             ng-class="row.model.classes"\n' +
        '             ng-style="{\'background-color\': row.model.color, \'height\': row.model.height}">\n' +
        '        </div>\n' +
        '    </script>\n' +
        '\n' +
        '    <!-- Body foreground template -->\n' +
        '    <script type="text/ng-template" id="template/ganttBodyForeground.tmpl.html">\n' +
        '        <div ng-transclude class="gantt-body-foreground"></div>\n' +
        '    </script>\n' +
        '\n' +
        '    <!-- Body columns template -->\n' +
        '    <script type="text/ng-template" id="template/ganttBodyColumns.tmpl.html">\n' +
        '        <div ng-transclude class="gantt-body-columns"></div>\n' +
        '    </script>\n' +
        '\n' +
        '    <script type="text/ng-template" id="template/ganttColumn.tmpl.html">\n' +
        '        <div ng-transclude class="gantt-column gantt-foreground-col"></div>\n' +
        '    </script>\n' +
        '\n' +
        '    <script type="text/ng-template" id="template/ganttTimeFrame.tmpl.html">\n' +
        '        <div class="gantt-timeframe"></div>\n' +
        '    </script>\n' +
        '\n' +
        '    <!-- Scrollable template -->\n' +
        '    <script type="text/ng-template" id="template/ganttScrollable.tmpl.html">\n' +
        '        <div ng-transclude class="gantt-scrollable" gantt-scroll-sender ng-style="getScrollableCss()"></div>\n' +
        '    </script>\n' +
        '\n' +
        '    <!-- Rows template -->\n' +
        '    <script type="text/ng-template" id="template/ganttBodyRows.tmpl.html">\n' +
        '        <div ng-transclude class="gantt-body-rows"></div>\n' +
        '    </script>\n' +
        '\n' +
        '    <!-- Timespan template -->\n' +
        '    <script type="text/ng-template" id="template/ganttTimespan.tmpl.html">\n' +
        '        <div class="gantt-timespan"\n' +
        '             ng-style="{\'z-index\': (timespan.priority || 0)}"\n' +
        '             ng-class="timespan.classes">\n' +
        '        </div>\n' +
        '    </script>\n' +
        '\n' +
        '    <!-- Task template -->\n' +
        '    <script type="text/ng-template" id="template/ganttTask.tmpl.html">\n' +
        '        <div ng-class="(task.isMilestone() === true && [\'gantt-task-milestone\'] || [\'gantt-task\']).concat(task.model.classes)"\n' +
        '             ng-style="{\'z-index\': (task.active === true && 1  || task.model.priority || \'\'), \'background-color\': task.model.color}">\n' +
        '            <div ng-if="task.truncatedLeft" class="gantt-task-truncated-left"><span>&lt;</span></div>\n' +
        '            <gantt-task-content></gantt-task-content>\n' +
        '            <div ng-if="task.truncatedRight" class="gantt-task-truncated-right"><span>&gt;</span></div>\n' +
        '        </div>\n' +
        '    </script>\n' +
        '\n' +
        '    <!-- Task content template -->\n' +
        '    <script type="text/ng-template" id="template/ganttTaskContent.tmpl.html">\n' +
        '        <div class="gantt-task-content-container">\n' +
        '            <div class="gantt-task-content"><span>{{ (task.isMilestone() === true && \'&nbsp;\' || task.model.name) }}</span></div>\n' +
        '        </div>\n' +
        '    </script>\n' +
        '\n' +
        '    <!-- Row template -->\n' +
        '    <script type="text/ng-template" id="template/ganttRow.tmpl.html">\n' +
        '        <div ng-transclude class="gantt-row gantt-row-height" ng-style="{\'height\': row.model.height}"></div>\n' +
        '    </script>\n' +
        '\n' +
        '</div>\n' +
        '');
}]);

//# sourceMappingURL=angular-gantt.js.map