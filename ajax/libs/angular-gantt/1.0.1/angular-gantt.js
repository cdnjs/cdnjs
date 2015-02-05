/*
Project: angular-gantt v1.0.1 - Gantt chart component for AngularJS
Authors: Marco Schweighauser, Rémi Alvergnat
License: MIT
Homepage: http://www.angular-gantt.com
Github: https://github.com/angular-gantt/angular-gantt.git
*/
(function(){
    'use strict';
    angular.module('gantt', ['gantt.templates', 'angularMoment'])
        .directive('gantt', ['Gantt', 'ganttEnableNgAnimate', '$timeout', '$templateCache', function(Gantt, enableNgAnimate, $timeout, $templateCache) {
        return {
            restrict: 'A',
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
                sortMode: '=?',
                filterTask: '=?',
                filterTaskComparator: '=?',
                filterRow: '=?',
                filterRowComparator: '=?',
                viewScale: '=?',
                columnWidth: '=?',
                showSide: '=?',
                allowSideResizing: '=?',
                fromDate: '=?',
                toDate: '=?',
                currentDateValue: '=?',
                currentDate: '=?',
                autoExpand: '=?',
                taskOutOfRange: '=?',
                maxHeight: '=?',
                headers: '=?',
                headersFormats: '=?',
                timeFrames: '=?',
                dateFrames: '=?',
                timeFramesWorkingMode: '=?',
                timeFramesNonWorkingMode: '=?',
                timespans: '=?',
                columnMagnet: '=?',
                shiftColumnMagnet: '=?',
                timeFramesMagnet: '=?',
                data: '=?',
                api: '=?',
                options: '=?'
            },
            controller: ['$scope', '$element', function($scope, $element) {
                for (var option in $scope.options) {
                    $scope[option] = $scope.options[option];
                }

                // Disable animation if ngAnimate is present, as it drops down performance.
                enableNgAnimate(false, $element);

                $scope.gantt = new Gantt($scope, $element);
                this.gantt = $scope.gantt;
            }],
            link: function(scope, element) {
                scope.gantt.api.directives.raise.new('gantt', scope, element);
                scope.$on('$destroy', function() {
                    scope.gantt.api.directives.raise.destroy('gantt', scope, element);
                });

                $timeout(function() {
                    scope.gantt.initialized();
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

(function() {
    'use strict';
    angular.module('gantt').factory('GanttOptions', [function() {
        var GanttOptions = function(values, defaultValues) {
            this.defaultValues = defaultValues;
            this.values = values;

            this.defaultValue = function(optionName) {
                var defaultValue = this.defaultValues[optionName];
                if (angular.isFunction(defaultValue)) {
                    defaultValue = defaultValue();
                }

                return defaultValue;
            };

            this.sanitize = function(optionName, optionValue) {
                if (!optionValue) {
                    var defaultValue = this.defaultValue(optionName);
                    if (defaultValue !== undefined) {
                        if (optionValue !== undefined && typeof defaultValue === 'boolean') {
                            return optionValue;
                        }

                        return defaultValue;
                    }
                }

                return optionValue;
            };

            this.value = function(optionName) {
                return this.sanitize(optionName, this.values[optionName]);
            };

            this.set = function(optionName, optionValue) {
                this.values[optionName] = optionValue;
            };

            this.initialize = function() {
                for (var optionName in this.values) {
                    var optionValue = this.values[optionName];
                    if (this.values.hasOwnProperty(optionName)) {
                        this.values[optionName] = this.value(optionName, optionValue);
                    }
                }
                return this.values;
            };
        };

        return GanttOptions;
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
         * @param {boolean} magnet is this timeFrame will magnet.
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
            this.magnet = options.magnet !== undefined ? options.magnet : true;
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

            var solvedTimeFrames = [new TimeFrame({start: startDate, end: endDate, working: defaultWorking, magnet: false, color: color, classes: classes})];

            timeFrames = $filter('filter')(timeFrames, function(timeFrame) {
                return (timeFrame.start === undefined || timeFrame.start < endDate) && (timeFrame.end === undefined || timeFrame.end > startDate);
            });

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

                            var newSolvedTimeFrame = solvedTimeFrame.clone();

                            solvedTimeFrame.end = moment(timeFrame.start);
                            newSolvedTimeFrame.start = moment(timeFrame.end);

                            tmpSolvedTimeFrames.splice(i + 1, 0, timeFrame.clone(), newSolvedTimeFrame);
                            treated = true;
                            dispatched = false;
                        } else if (!dispatched && timeFrame.start < solvedTimeFrame.end) {
                            // timeFrame is dispatched on two solvedTimeFrame.
                            // First part
                            // solvedTimeFrame:|sssssssssssssssssssssssssssssssssss|s+1;s+1;s+1;s+1;s+1;s+1|
                            //       timeFrame:                                |tttttt|
                            //          result:|sssssssssssssssssssssssssssssss|tttttt|;s+1;s+1;s+1;s+1;s+1|

                            solvedTimeFrame.end = moment(timeFrame.start);
                            tmpSolvedTimeFrames.splice(i + 1, 0, timeFrame.clone());

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
    angular.module('gantt').factory('GanttCurrentDateManager', ['moment', function(moment) {
        var GanttCurrentDateManager = function(gantt) {
            var self = this;

            this.gantt = gantt;

            this.date = undefined;
            this.position = undefined;
            this.currentDateColumn = undefined;

            this.gantt.$scope.simplifyMoment = function(d) {
                return moment.isMoment(d) ? d.unix() : d;
            };

            this.gantt.$scope.$watchGroup(['currentDate', 'simplifyMoment(currentDateValue)'], function(newValues, oldValues) {
                if (newValues !== oldValues) {
                    self.setCurrentDate(self.gantt.options.value('currentDateValue'));
                }
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
                var column = this.gantt.columnsManager.getColumnByDate(this.date, true);
                if (column !== undefined) {
                    this.currentDateColumn = column;
                    if (this.gantt.options.value('currentDate') === 'column' && this.currentDateColumn.$element !== undefined) {
                        this.currentDateColumn.$element.addClass('gantt-foreground-col-current-date');
                    }
                }
            }

            this.position = this.gantt.getPositionByDate(this.date, true);
        };
        return GanttCurrentDateManager;
    }]);
}());

(function() {
    'use strict';
    angular.module('gantt').factory('GanttColumn', ['moment', function(moment) {
        // Used to display the Gantt grid and header.
        // The columns are generated by the column generator.
        var Column = function(date, endDate, left, width, calendar, timeFramesWorkingMode, timeFramesNonWorkingMode) {
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
            this.originalSize = {left: this.left, width: this.width};
            this.updateTimeFrames();
        };

        var getDateKey = function(date) {
            return date.year() + '-' + date.month() + '-' + date.date();
        };

        Column.prototype.updateView = function() {
            if (this.$element) {
                this.$element.css('left', this.left + 'px');
                this.$element.css('width', this.width + 'px');

                for (var i = 0, l = this.timeFrames.length; i < l; i++) {
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

        Column.prototype.roundTo = function(date, unit, offset, midpoint) {
            // Waiting merge of https://github.com/moment/moment/pull/1794
            if (unit === 'day') {
                // Inconsistency in units in momentJS.
                unit = 'date';
            }

            offset = offset || 1;
            var value = date.get(unit);

            switch (midpoint) {
                case 'up':
                    value = Math.ceil(value / offset);
                    break;
                case 'down':
                    value = Math.floor(value / offset);
                    break;
                default:
                    value = Math.round(value / offset);
                    break;
            }

            var units = ['millisecond', 'second', 'minute', 'hour', 'date', 'month', 'year'];
            date.set(unit, value * offset);

            var indexOf = units.indexOf(unit);
            for (var i = 0; i < indexOf; i++) {
                date.set(units[i], 0);
            }

            return date;
        };

        Column.prototype.getMagnetDate = function(date, magnetValue, magnetUnit, timeFramesMagnet) {
            if (magnetValue > 0 && magnetUnit !== undefined) {
                var initialDate = date;
                date = moment(date);

                if (magnetUnit === 'column') {
                    // Snap to column borders only.
                    var position = this.getPositionByDate(date);

                    if (position < this.width / 2) {
                        date = moment(this.date);
                    } else {
                        date = moment(this.endDate);
                    }
                } else {
                    // Round the value
                    date = this.roundTo(date, magnetUnit, magnetValue);

                    // Snap to column borders if date overflows.
                    if (date < this.date) {
                        date = moment(this.date);
                    } else if (date > this.endDate) {
                        date = moment(this.endDate);
                    }
                }

                if (timeFramesMagnet) {
                    var maxTimeFrameDiff = Math.abs(initialDate.diff(date, 'milliseconds'));
                    var currentTimeFrameDiff;

                    for (var i=0; i<this.timeFrames.length; i++) {
                        var timeFrame = this.timeFrames[i];
                        if (timeFrame.magnet) {
                            var previousTimeFrame = this.timeFrames[i-1];
                            var nextTimeFrame = this.timeFrames[i+1];
                            var timeFrameDiff;

                            if (previousTimeFrame === undefined || previousTimeFrame.working !== timeFrame.working) {
                                timeFrameDiff = Math.abs(initialDate.diff(timeFrame.start, 'milliseconds'));
                                if (timeFrameDiff < maxTimeFrameDiff && (currentTimeFrameDiff === undefined || timeFrameDiff < currentTimeFrameDiff)) {
                                    currentTimeFrameDiff = timeFrameDiff;
                                    date = timeFrame.start;
                                }
                            }

                            if (nextTimeFrame === undefined || nextTimeFrame.working !== timeFrame.working) {
                                timeFrameDiff = Math.abs(initialDate.diff(timeFrame.end, 'milliseconds'));
                                if (timeFrameDiff < maxTimeFrameDiff && (currentTimeFrameDiff === undefined || timeFrameDiff < currentTimeFrameDiff)) {
                                    currentTimeFrameDiff = timeFrameDiff;
                                    date = timeFrame.end;
                                }
                            }
                        }
                    }
                }
            }
            return date;
        };

        Column.prototype.getDateByPositionUsingTimeFrames = function(position) {
            for (var i = 0, l = this.timeFrames.length; i < l; i++) {
                // TODO: performance optimization could be done.
                var timeFrame = this.timeFrames[i];
                if (!timeFrame.cropped && position >= timeFrame.left && position <= timeFrame.left + timeFrame.width) {
                    var positionDuration = timeFrame.getDuration() / timeFrame.width * (position - timeFrame.left);
                    var date = moment(timeFrame.start).add(positionDuration, 'milliseconds');
                    return date;
                }
            }
        };

        Column.prototype.getDateByPosition = function(position, magnetValue, magnetUnit, timeFramesMagnet) {
            var positionDuration;
            var date;

            if (position < 0) {
                position = 0;
            }
            if (position > this.width) {
                position = this.width;
            }

            if (this.timeFramesNonWorkingMode === 'cropped' || this.timeFramesWorkingMode === 'cropped') {
                date = this.getDateByPositionUsingTimeFrames(position);
            }

            if (date === undefined) {
                positionDuration = this.duration / this.width * position;
                date = moment(this.date).add(positionDuration, 'milliseconds');
            }

            date = this.getMagnetDate(date, magnetValue, magnetUnit, timeFramesMagnet);

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
                for (var i = 0; i < timeFrames.length; i++) {
                    var timeFrame = timeFrames[i];
                    if (croppedDate >= timeFrame.start && croppedDate <= timeFrame.end) {
                        if (timeFrame.cropped) {
                            if (timeFrames.length > i + 1) {
                                croppedDate = timeFrames[i + 1].start;
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


(function() {
    'use strict';
    angular.module('gantt').factory('GanttColumnGenerator', ['GanttColumn', 'moment', function(Column, moment) {
        var ColumnGenerator = function(columnsManager) {
            var self = this;

            this.columnsManager = columnsManager;

            // Generates one column for each time unit between the given from and to date.
            self.generate = function(from, to, maximumWidth, leftOffset, reverse) {
                if (!to && !maximumWidth) {
                    throw 'to or maximumWidth must be defined';
                }

                var viewScale = self.columnsManager.gantt.options.value('viewScale');
                viewScale = viewScale.trim();
                if (viewScale.charAt(viewScale.length - 1) === 's') {
                    viewScale = viewScale.substring(0, viewScale.length - 1);
                }
                var viewScaleValue;
                var viewScaleUnit;
                var splittedViewScale;

                if (viewScale) {
                    splittedViewScale = viewScale.split(' ');
                }
                if (splittedViewScale && splittedViewScale.length > 1) {
                    viewScaleValue = parseFloat(splittedViewScale[0]);
                    viewScaleUnit = splittedViewScale[splittedViewScale.length - 1];
                } else {
                    viewScaleValue = 1;
                    viewScaleUnit = viewScale;
                }

                var calendar = self.columnsManager.gantt.calendar;
                var timeFramesWorkingMode = self.columnsManager.gantt.options.value('timeFramesWorkingMode');
                var timeFramesNonWorkingMode = self.columnsManager.gantt.options.value('timeFramesNonWorkingMode');
                var columnWidth = self.columnsManager.getColumnsWidth();

                var excludeTo = false;
                from = moment(from).startOf(viewScaleUnit);
                if (to) {
                    excludeTo = isToDateToExclude(to);
                    to = moment(to).startOf(viewScaleUnit);
                }

                var date = moment(from).startOf(viewScaleUnit);
                if (reverse) {
                    date.add(-viewScaleValue, viewScaleUnit);
                }
                var generatedCols = [];
                var left = 0;

                while (true) {
                    if (maximumWidth && Math.abs(left) > maximumWidth + columnWidth) {
                        break;
                    }

                    var startDate = moment(date);
                    var endDate = moment(startDate).add(viewScaleValue, viewScaleUnit);
                    ensureNoUnitOverflow(viewScaleUnit, startDate, endDate);

                    var column = new Column(startDate, endDate, leftOffset ? left + leftOffset : left, columnWidth, calendar, timeFramesWorkingMode, timeFramesNonWorkingMode);
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
                    if (reverse) {
                        date.add(-viewScaleValue, viewScaleUnit);
                        ensureNoUnitOverflow(viewScaleUnit, date, startDate);
                    } else {
                        date.add(viewScaleValue, viewScaleUnit);
                        ensureNoUnitOverflow(viewScaleUnit, startDate, date);
                    }
                }

                if (reverse) {
                    if (isToDateToExclude(from, viewScaleValue, viewScaleUnit)) {
                        generatedCols.shift();
                    }
                    generatedCols.reverse();
                }

                return generatedCols;
            };

            // Columns are generated including or excluding the to date.
            // If the To date is the first day of month and the time is 00:00 then no new column is generated for this month.

            var isToDateToExclude = function(to, value, unit) {
                return moment(to).add(value, unit).startOf(unit) === to;
            };

            var ensureNoUnitOverflow = function(unit, startDate, endDate) {
                var v1 = startDate.get(unit);
                var v2 = endDate.get(unit);
                var firstValue = getFirstValue(unit);
                if (firstValue !== undefined && v2 !== firstValue && v2 < v1) {
                    endDate.set(unit, firstValue);
                }
            };

            var getFirstValue = function(unit) {
                if (['hour', 'minute', 'second', 'millisecond'].indexOf(unit) >= 0) {
                    return 0;
                }
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

        var ColumnHeader = function(date, viewScaleValue, viewScaleUnit, left, width, labelFormat) {
            var startDate = moment(date);
            var endDate = moment(startDate).add(viewScaleValue, viewScaleUnit);

            var column = new Column(startDate, endDate, left, width);
            column.unit = viewScaleUnit;
            column.label = angular.isFunction(labelFormat) ? labelFormat(column): startDate.format(labelFormat);

            return column;
        };
        return ColumnHeader;
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').factory('GanttColumnsManager', ['GanttColumnGenerator', 'GanttHeaderGenerator', '$filter', '$timeout', 'ganttLayout', 'ganttBinarySearch', 'moment', function(ColumnGenerator, HeaderGenerator, $filter, $timeout, layout, bs, moment) {
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
            this.gantt.$scope.$watchGroup(['viewScale', 'columnWidth', 'timeFramesWorkingMode', 'timeFramesNonWorkingMode', 'fromDate', 'toDate', 'autoExpand', 'taskOutOfRange'], function(newValues, oldValues) {
                if (newValues !== oldValues && self.gantt.rendered) {
                    self.generateColumns();
                }
            });

            this.gantt.$scope.$watchCollection('headers', function(newValues, oldValues) {
                if (newValues !== oldValues && self.gantt.rendered) {
                    self.generateColumns();
                }
            });

            this.gantt.$scope.$watchCollection('headersFormats', function(newValues, oldValues) {
                if (newValues !== oldValues && self.gantt.rendered) {
                    self.generateColumns();
                }
            });

            this.gantt.$scope.$watchGroup(['ganttElementWidth', 'showSide', 'sideWidth', 'maxHeight'], function(newValues, oldValues) {
                if (newValues !== oldValues && self.gantt.rendered) {
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
                from = this.gantt.options.value('fromDate');
            }

            if (!to) {
                to = this.gantt.options.value('toDate');
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

            if (from !== undefined && !moment.isMoment(from)) {
                from = moment(from);
            }

            if (to !== undefined && !moment.isMoment(to)) {
                to = moment(to);
            }

            if (this.gantt.options.value('taskOutOfRange') === 'expand') {
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

            var columnsWidthChanged = this.updateColumnsWidths([this.previousColumns, this.columns, this.nextColumns, this.headers]);

            this.gantt.width = lastColumn !== undefined ? lastColumn.left + lastColumn.width : 0;

            var showSide = this.gantt.options.value('showSide');
            var sideShown = this.gantt.side.isShown();
            var sideVisibilityChanged = showSide !== sideShown;

            if (sideVisibilityChanged && !showSide) {
                // Prevent unnecessary v-scrollbar if side is hidden here
                this.gantt.side.show(false);
            }

            this.gantt.rowsManager.updateTasksPosAndSize();
            this.gantt.timespansManager.updateTimespansPosAndSize();

            this.updateVisibleColumns(columnsWidthChanged);

            var currentDateValue = this.gantt.options.value('currentDateValue');
            this.gantt.rowsManager.updateVisibleObjects();
            this.gantt.currentDateManager.setCurrentDate(currentDateValue);

            if (sideVisibilityChanged && showSide) {
                // Prevent unnecessary v-scrollbar if side is shown here
                this.gantt.side.show(true);
            }
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
        ColumnsManager.prototype.getColumnByDate = function(date, disableExpand) {
            if (!disableExpand) {
                this.expandExtendedColumnsForDate(date);
            }
            var extendedColumns = this.previousColumns.concat(this.columns, this.nextColumns);
            var columns = bs.get(extendedColumns, date, function(c) {
                return c.date;
            }, true);
            return columns[0] !== undefined ? columns[0] : columns[1];
        };

        // Returns the column at the given position x (in em)
        ColumnsManager.prototype.getColumnByPosition = function(x, disableExpand) {
            if (!disableExpand) {
                this.expandExtendedColumnsForPosition(x);
            }
            var extendedColumns = this.previousColumns.concat(this.columns, this.nextColumns);
            var columns = bs.get(extendedColumns, x, function(c) {
                return c.left;
            }, true);
            return columns[0] === undefined ? columns[1]: columns[0];
        };

        var updateColumnsWidthImpl = function(newWidth, originalWidth, columnsArray) {
            if (angular.isArray(columnsArray)) {
                if (columnsArray.length > 0 && angular.isArray(columnsArray[0])) {
                    angular.forEach(columnsArray, function(columns) {
                        updateColumnsWidthImpl(newWidth, originalWidth, columns);
                    });
                    return;
                }
            }
            layout.setColumnsWidth(newWidth, originalWidth, columnsArray);
        };

        ColumnsManager.prototype.updateColumnsWidths = function(columns) {
            var columnWidth = this.gantt.options.value('columnWidth');
            var autoFitWidthEnabled = columnWidth === undefined;
            if (autoFitWidthEnabled) {
                var scrollWidth = this.gantt.getWidth() - this.gantt.side.getWidth();
                var borderWidth = this.gantt.scroll.getBordersWidth();
                var newWidth = scrollWidth - (borderWidth !== undefined ? this.gantt.scroll.getBordersWidth() : 0);
                updateColumnsWidthImpl(newWidth, this.gantt.originalWidth, columns);
            }
            return autoFitWidthEnabled;
        };

        ColumnsManager.prototype.getColumnsWidth = function() {
            var columnWidth = this.gantt.options.value('columnWidth');
            if (columnWidth === undefined) {
                if (this.gantt.width <= 0) {
                    columnWidth = 20;
                } else {
                    columnWidth = this.gantt.width / this.columns.length;
                }
            }
            return columnWidth;
        };

        ColumnsManager.prototype.expandExtendedColumnsForPosition = function(x) {
            if (x < 0) {
                var firstColumn = this.getFirstColumn();
                var from = firstColumn.date;
                var firstExtendedColumn = this.getFirstColumn(true);
                if (!firstExtendedColumn || firstExtendedColumn.left > x) {
                    this.previousColumns = new ColumnGenerator(this).generate(from, undefined, -x, -this.getColumnsWidth(), true);
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
            } else if (endDate && date >= endDate) {
                var lastExtendedColumn = this.getLastColumn(true);
                if (!lastExtendedColumn || lastExtendedColumn.date < endDate) {
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

        ColumnsManager.prototype.updateVisibleColumns = function(includeViews) {
            this.visibleColumns = $filter('ganttColumnLimit')(this.columns, this.gantt);

            this.visibleHeaders = [];
            angular.forEach(this.headers, function(header) {
                this.visibleHeaders.push($filter('ganttColumnLimit')(header, this.gantt));
            }, this);

            if (includeViews) {
                angular.forEach(this.visibleColumns, function(c) {
                    c.updateView();
                });

                angular.forEach(this.visibleHeaders, function(headerRow) {
                    angular.forEach(headerRow, function(header) {
                        header.updateView();
                    });
                });
            }
        };

        var defaultHeadersFormats = {'year': 'YYYY', 'quarter': '[Q]Q YYYY', month: 'MMMM YYYY', week: 'w', day: 'D', hour: 'H', minute:'HH:mm'};
        var defaultDayHeadersFormats = {day: 'LL', hour: 'H', minute:'HH:mm'};
        var defaultYearHeadersFormats = {'year': 'YYYY', 'quarter': '[Q]Q', month: 'MMMM'};

        ColumnsManager.prototype.getHeaderFormat = function(unit) {
            var format;
            var headersFormats = this.gantt.options.value('headersFormats');
            if (headersFormats !== undefined) {
                format = headersFormats[unit];
            }
            if (format === undefined) {
                var viewScale = this.gantt.options.value('viewScale');
                viewScale = viewScale.trim();
                if (viewScale.charAt(viewScale.length - 1) === 's') {
                    viewScale = viewScale.substring(0, viewScale.length - 1);
                }

                var viewScaleUnit;
                var splittedViewScale;

                if (viewScale) {
                    splittedViewScale = viewScale.split(' ');
                }
                if (splittedViewScale && splittedViewScale.length > 1) {
                    viewScaleUnit = splittedViewScale[splittedViewScale.length - 1];
                } else {
                    viewScaleUnit = viewScale;
                }

                if (['millisecond', 'second', 'minute', 'hour'].indexOf(viewScaleUnit) > -1) {
                    format = defaultDayHeadersFormats[unit];
                } else if (['month', 'quarter', 'year'].indexOf(viewScaleUnit) > -1) {
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
        var generateHeader = function(columnsManager, columns, viewScale) {
            var generatedHeaders = [];
            var header;
            var prevColDateVal;

            var viewScaleValue;
            var viewScaleUnit;
            var splittedViewScale;

            if (viewScale) {
                splittedViewScale = viewScale.split(' ');
            }
            if (splittedViewScale && splittedViewScale.length > 1) {
                viewScaleValue = parseFloat(splittedViewScale[0]);
                viewScaleUnit = splittedViewScale[splittedViewScale.length - 1];
            } else {
                viewScaleValue = 1;
                viewScaleUnit = viewScale;
            }

            for (var i = 0, l = columns.length; i < l; i++) {
                var col = columns[i];
                var colDateVal = col.date.get(viewScaleUnit);
                if (i === 0 || prevColDateVal !== colDateVal) {
                    prevColDateVal = colDateVal;
                    var labelFormat = columnsManager.getHeaderFormat(viewScaleUnit);

                    header = new ColumnHeader(col.date, viewScaleValue, viewScaleUnit, col.originalSize.left, col.originalSize.width, labelFormat);
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
                if (columnsManager.gantt.options.value('headers') === undefined) {
                    var viewScale = columnsManager.gantt.options.value('viewScale');
                    viewScale = viewScale.trim();
                    if (viewScale.charAt(viewScale.length - 1) === 's') {
                        viewScale = viewScale.substring(0, viewScale.length - 1);
                    }

                    var viewScaleUnit;
                    var splittedViewScale;

                    if (viewScale) {
                        splittedViewScale = viewScale.split(' ');
                    }
                    if (splittedViewScale && splittedViewScale.length > 1) {
                        viewScaleUnit = splittedViewScale[splittedViewScale.length - 1];
                    } else {
                        viewScaleUnit = viewScale;
                    }

                    if (['quarter','month'].indexOf(viewScaleUnit) > -1) {
                        units.push('year');
                    }
                    if (['day', 'week'].indexOf(viewScaleUnit) > -1) {
                        units.push('month');
                    }
                    if (['day'].indexOf(viewScaleUnit) > -1) {
                        units.push('week');
                    }
                    if (['hour'].indexOf(viewScaleUnit) > -1) {
                        units.push('day');
                    }
                    if (['minute', 'second'].indexOf(viewScaleUnit) > -1) {
                        units.push('hour');
                    }
                    if (['second'].indexOf(viewScaleUnit) > -1) {
                        units.push('minute');
                    }
                    units.push(viewScale);
                } else {
                    units = columnsManager.gantt.options.value('headers');
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
        'GanttApi', 'GanttOptions', 'GanttCalendar', 'GanttScroll', 'GanttBody', 'GanttRowHeader', 'GanttHeader', 'GanttSide', 'GanttObjectModel', 'GanttRowsManager', 'GanttColumnsManager', 'GanttTimespansManager', 'GanttCurrentDateManager', 'ganttArrays', 'moment', '$document', '$timeout',
        function(GanttApi, Options, Calendar, Scroll, Body, RowHeader, Header, Side, ObjectModel, RowsManager, ColumnsManager, TimespansManager, CurrentDateManager, arrays, moment, $document, $timeout) {
            // Gantt logic. Manages the columns, rows and sorting functionality.
            var Gantt = function($scope, $element) {
                var self = this;

                this.$scope = $scope;
                this.$element = $element;

                this.options = new Options($scope, {
                    'api': angular.noop,
                    'data': [],
                    'timespans': [],
                    'viewScale': 'day',
                    'columnMagnet': '15 minutes',
                    'timeFramesMagnet': true,
                    'showSide': true,
                    'allowSideResizing': true,
                    'currentDate': 'line',
                    'currentDateValue': moment,
                    'autoExpand': 'none',
                    'taskOutOfRange': 'truncate',
                    'maxHeight': 0,
                    'timeFrames': [],
                    'dateFrames': [],
                    'timeFramesWorkingMode': 'hidden',
                    'timeFramesNonWorkingMode': 'visible'
                });

                this.api = new GanttApi(this);

                this.api.registerEvent('core', 'ready');
                this.api.registerEvent('core', 'rendered');

                this.api.registerEvent('directives', 'preLink');
                this.api.registerEvent('directives', 'postLink');
                this.api.registerEvent('directives', 'new');
                this.api.registerEvent('directives', 'destroy');

                this.api.registerEvent('data', 'change');
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
                this.calendar.registerTimeFrames(this.options.value('timeFrames'));
                this.calendar.registerDateFrames(this.options.value('dateFrames'));

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

                $scope.$watch('columnMagnet', function() {
                    var splittedColumnMagnet;
                    var columnMagnet = self.options.value('columnMagnet');
                    if (columnMagnet) {
                        splittedColumnMagnet = columnMagnet.trim().split(' ');
                    }
                    if (splittedColumnMagnet && splittedColumnMagnet.length > 1) {
                        self.columnMagnetValue = parseFloat(splittedColumnMagnet[0]);
                        self.columnMagnetUnit = moment.normalizeUnits(splittedColumnMagnet[splittedColumnMagnet.length - 1]);
                    } else {
                        self.columnMagnetValue = 1;
                        self.columnMagnetUnit = moment.normalizeUnits(columnMagnet);
                    }
                });

                $scope.$watchGroup(['shiftColumnMagnet', 'viewScale'], function() {
                    var splittedColumnMagnet;
                    var shiftColumnMagnet = self.options.value('shiftColumnMagnet');
                    if (shiftColumnMagnet) {
                        splittedColumnMagnet = shiftColumnMagnet.trim().split(' ');
                    }
                    if (splittedColumnMagnet !== undefined && splittedColumnMagnet.length > 1) {
                        self.shiftColumnMagnetValue = parseFloat(splittedColumnMagnet[0]);
                        self.shiftColumnMagnetUnit = moment.normalizeUnits(splittedColumnMagnet[splittedColumnMagnet.length - 1]);
                    } else {
                        self.shiftColumnMagnetValue = 1;
                        self.shiftColumnMagnetUnit = moment.normalizeUnits(shiftColumnMagnet);
                    }
                });

                $document.on('keyup keydown', function(e) {
                    self.shiftKey = e.shiftKey;
                    return true;
                });

                this.scroll = new Scroll(this);
                this.body = new Body(this);
                this.header = new Header(this);
                this.side = new Side(this);

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

                var hasRowModelOrderChanged = function(data1, data2) {
                    if (data2 === undefined || data1.length !== data2.length) {
                        return true;
                    }

                    for (var i = 0, l = data1.length; i < l; i++) {
                        if (data1[i].id !== data2[i].id) {
                            return true;
                        }
                    }

                    return false;
                };

                $scope.$watchCollection('data', function(newData, oldData) {
                    if (oldData !== undefined) {
                        var toRemoveIds = arrays.getRemovedIds(newData, oldData);
                        if (toRemoveIds.length === oldData.length) {
                            self.rowsManager.removeAll();

                            // DEPRECATED
                            self.api.data.raise.clear(self.$scope);
                        } else {
                            for (var i = 0, l = toRemoveIds.length; i < l; i++) {
                                var toRemoveId = toRemoveIds[i];
                                self.rowsManager.removeRow(toRemoveId);
                            }

                            // DEPRECATED
                            var removedRows = [];
                            angular.forEach(oldData, function(removedRow) {
                                if (toRemoveIds.indexOf(removedRow.id) > -1) {
                                    removedRows.push(removedRow);
                                }
                            });
                            self.api.data.raise.remove(self.$scope, removedRows);
                        }
                    }

                    if (newData !== undefined) {
                        var modelOrderChanged = hasRowModelOrderChanged(newData, oldData);

                        if (modelOrderChanged) {
                            self.rowsManager.resetNonModelLists();
                        }

                        for (var j = 0, k = newData.length; j < k; j++) {
                            var rowData = newData[j];
                            self.rowsManager.addRow(rowData, modelOrderChanged);
                        }

                        self.api.data.raise.change(self.$scope, newData, oldData);

                        // DEPRECATED
                        self.api.data.raise.load(self.$scope, newData);
                    }
                });
            };

            // Returns the exact column date at the given position x (in em)
            Gantt.prototype.getDateByPosition = function(x, magnet, disableExpand) {
                var column = this.columnsManager.getColumnByPosition(x, disableExpand);
                if (column !== undefined) {
                    var magnetValue;
                    var magnetUnit;
                    if (magnet) {
                        if (this.shiftKey) {
                            if (this.shiftColumnMagnetValue !== undefined && this.shiftColumnMagnetUnit !== undefined) {
                                magnetValue = this.shiftColumnMagnetValue;
                                magnetUnit = this.shiftColumnMagnetUnit;
                            } else {
                                var viewScale = this.options.value('viewScale');
                                viewScale = viewScale.trim();
                                var viewScaleValue;
                                var viewScaleUnit;
                                var splittedViewScale;

                                if (viewScale) {
                                    splittedViewScale = viewScale.split(' ');
                                }
                                if (splittedViewScale && splittedViewScale.length > 1) {
                                    viewScaleValue = parseFloat(splittedViewScale[0]);
                                    viewScaleUnit = moment.normalizeUnits(splittedViewScale[splittedViewScale.length - 1]);
                                } else {
                                    viewScaleValue = 1;
                                    viewScaleUnit = moment.normalizeUnits(viewScale);
                                }
                                magnetValue = viewScaleValue * 0.25;
                                magnetUnit = viewScaleUnit;
                            }
                        } else {
                            magnetValue = this.columnMagnetValue;
                            magnetUnit = this.columnMagnetUnit;
                        }
                    }

                    return column.getDateByPosition(x - column.left, magnetValue, magnetUnit, this.options.value('timeFramesMagnet'));
                } else {
                    return undefined;
                }
            };

            // Returns the position inside the Gantt calculated by the given date
            Gantt.prototype.getPositionByDate = function(date, disableExpand) {
                if (date === undefined) {
                    return undefined;
                }

                if (!moment.isMoment(moment)) {
                    date = moment(date);
                }

                var column = this.columnsManager.getColumnByDate(date, disableExpand);
                if (column !== undefined) {
                    return column.getPositionByDate(date);
                } else {
                    return undefined;
                }
            };

            // DEPRECATED - Use $data instead.
            Gantt.prototype.loadData = function(data) {
                if (!angular.isArray(data)) {
                    data = data !== undefined ? [data] : [];
                }

                if (this.$scope.data === undefined) {
                    this.$scope.data = data;
                } else {
                    for (var i = 0, l = data.length; i < l; i++) {
                        var row = data[i];

                        var j = arrays.indexOfId(this.$scope.data, row.id);
                        if (j > -1) {
                            this.$scope.data[j] = row;
                        } else {
                            this.$scope.data.push(row);
                        }
                    }
                }

                var w = this.side.getWidth();
                if (w > 0) {
                    this.options.set('sideWidth', w);
                }
            };

            Gantt.prototype.getData = function() {
                return this.$scope.data;
            };

            // DEPRECATED - Use $data instead.
            Gantt.prototype.removeData = function(data) {
                if (!angular.isArray(data)) {
                    data = data !== undefined ? [data] : [];
                }

                if (this.$scope.data !== undefined) {
                    for (var i = 0, l = data.length; i < l; i++) {
                        var rowToRemove = data[i];

                        var j = arrays.indexOfId(this.$scope.data, rowToRemove.id);
                        if (j > -1) {
                            if (rowToRemove.tasks === undefined || rowToRemove.tasks.length === 0) {
                                // Remove complete row
                                this.$scope.data.splice(j, 1);
                            } else {
                                // Remove single tasks
                                var row = this.$scope.data[j];
                                for (var ti = 0, tl = rowToRemove.tasks.length; ti < tl; ti++) {
                                    var taskToRemove = rowToRemove.tasks[ti];

                                    var tj = arrays.indexOfId(row.tasks, taskToRemove.id);
                                    if (tj > -1) {
                                        row.tasks.splice(tj, 1);
                                    }
                                }
                            }
                        }
                    }
                }
            };

            // DEPRECATED - Use $data instead.
            Gantt.prototype.clearData = function() {
                this.$scope.data = undefined;
            };

            Gantt.prototype.getWidth = function() {
                return this.$scope.ganttElementWidth;
            };

            Gantt.prototype.initialized = function() {
                // Gantt is initialized. Signal that the Gantt is ready.
                this.api.core.raise.ready(this.api);

                this.rendered = true;
                this.columnsManager.generateColumns();

                var gantt = this;
                var renderedFunction = function() {
                    var w = gantt.side.getWidth();
                    if (w > 0) {
                        gantt.options.set('sideWidth', w);
                    }
                    gantt.api.core.raise.rendered(gantt.api);
                };
                $timeout(renderedFunction);
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
            var filterTask = this.rowsManager.gantt.options.value('filterTask');
            if (filterTask) {
                if (typeof(filterTask) === 'object') {
                    filterTask = {model: filterTask};
                }

                var filterTaskComparator = this.rowsManager.gantt.options.value('filterTaskComparator');
                if (typeof(filterTaskComparator) === 'function') {
                    filterTaskComparator = function(actual, expected) {
                        return filterTaskComparator(actual.model, expected.model);
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
    angular.module('gantt').factory('GanttRowsManager', ['GanttRow', 'ganttArrays', '$filter', '$timeout', 'moment', function(Row, arrays, $filter, $timeout, moment) {
        var RowsManager = function(gantt) {
            var self = this;

            this.gantt = gantt;

            this.rowsMap = {};
            this.rows = [];
            this.sortedRows = [];
            this.filteredRows = [];
            this.visibleRows = [];
            this.rowsTaskWatchers = [];

            this.gantt.$scope.$watchGroup(['filterTask', 'filterTaskComparator'], function(newValues, oldValues) {
                if (newValues !== oldValues) {
                    self.updateVisibleTasks();
                }
            });

            this.gantt.$scope.$watchGroup(['filterRow', 'filterRowComparator'], function(newValues, oldValues) {
                if (newValues !== oldValues) {
                    self.updateVisibleRows();
                }
            });

            this.gantt.$scope.$watch('sortMode', function(newValue, oldValue) {
                if (newValue !== oldValue) {
                    self.sortRows();
                }
            });

            // Listen to vertical scrollbar visibility changes to update columns width
            var _oldVScrollbarVisible = this.gantt.scroll.isVScrollbarVisible();
            this.gantt.$scope.$watchGroup(['maxHeight', 'gantt.rowsManager.visibleRows.length'], function(newValue, oldValue) {
                if (newValue !== oldValue) {
                    $timeout(function() {
                        var newVScrollbarVisible = self.gantt.scroll.isVScrollbarVisible();
                        if (newVScrollbarVisible !== _oldVScrollbarVisible) {
                            _oldVScrollbarVisible = newVScrollbarVisible;
                            self.gantt.columnsManager.updateColumnsMeta();
                        }
                    });
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

        RowsManager.prototype.resetNonModelLists = function() {
            this.rows = [];
            this.sortedRows = [];
            this.filteredRows = [];
            this.visibleRows = [];
        };

        RowsManager.prototype.addRow = function(rowModel, modelOrderChanged) {
            // Copy to new row (add) or merge with existing (update)
            var row, i, l, isUpdate = false;

            this.gantt.objectModel.cleanRow(rowModel);

            if (rowModel.id in this.rowsMap) {
                row = this.rowsMap[rowModel.id];

                if (modelOrderChanged) {
                    this.rows.push(row);
                    this.sortedRows.push(row);
                    this.filteredRows.push(row);
                    this.visibleRows.push(row);
                }

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

                this.gantt.api.rows.raise.remove(removedRow);
                return row;
            }

            return undefined;
        };

        RowsManager.prototype.removeAll = function() {
            this.rowsMap = {};
            this.rows = [];
            this.sortedRows = [];
            this.filteredRows = [];
            this.visibleRows = [];

            for (var i= 0, l=this.rowsTaskWatchers.length; i<l; i++) {
                var deregisterFunction = this.rowsTaskWatchers[i];
                deregisterFunction();
            }
            this.rowsTaskWatchers = [];
        };

        RowsManager.prototype.sortRows = function() {
            var expression = this.gantt.options.value('sortMode');

            if (expression !== undefined) {
                var reverse = false;
                if (angular.isString(expression) && expression.charAt(0) === '-') {
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
            var sortMode = this.gantt.options.value('sortMode');
            if (sortMode !== undefined) {
                // Apply current sort to model
                this.applySort();
                this.gantt.options.set('sortMode', undefined);
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
            var filterRow = this.gantt.options.value('filterRow');
            if (filterRow) {
                if (typeof(filterRow) === 'object') {
                    filterRow = {model: filterRow};
                }

                var filterRowComparator = this.gantt.options.value('filterRowComparator');
                if (typeof(filterRowComparator) === 'function') {
                    filterRowComparator = function(actual, expected) {
                        return this.gantt.options.value('filterRowComparator')(actual.model, expected.model);
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

            angular.forEach(this.rows, function(row) {
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
            var toDate = this.gantt.options.value('toDate');
            if (maxRowTo && (!toDate || maxRowTo > toDate)) {
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

(function() {
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

            var lastColumn = this.rowsManager.gantt.columnsManager.getLastColumn();
            var maxModelLeft = lastColumn ? lastColumn.left + lastColumn.width : 0;

            if (this.modelLeft + this.modelWidth < 0 || this.modelLeft > maxModelLeft) {
                this.left = undefined;
                this.width = undefined;
            } else {
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
            }

            this.updateView();
        };

        Task.prototype.updateView = function() {
            if (this.$element) {
                if (this.left === undefined || this.width === undefined) {
                    this.$element.css('display', 'none');
                } else {
                    this.$element.css('display', '');

                    this.$element.css('left', this.left + 'px');
                    this.$element.css('width', this.width + 'px');

                    if (this.model.priority > 0) {
                        this.$element.css('z-index', this.model.priority);
                    }

                    this.$element.toggleClass('gantt-task-milestone', this.isMilestone());
                    this.$element.toggleClass('gantt-task', !this.isMilestone());
                }
            }
        };

        Task.prototype.getBackgroundElement = function() {
            if (this.$element !== undefined) {
                var backgroundElement = this.$element[0].querySelector('.gantt-task-background');
                backgroundElement = angular.element(backgroundElement);
                return backgroundElement;
            }
        };

        Task.prototype.getContentElement = function() {
            if (this.$element !== undefined) {
                var contentElement = this.$element[0].querySelector('.gantt-task-content-container');
                contentElement = angular.element(contentElement);
                return contentElement;
            }
        };

        Task.prototype.getForegroundElement = function() {
            if (this.$element !== undefined) {
                var foregroundElement = this.$element[0].querySelector('.gantt-task-foreground');
                foregroundElement = angular.element(foregroundElement);
                return foregroundElement;
            }
        };

        // Expands the start of the task to the specified position (in em)
        Task.prototype.setFrom = function(x, magnetEnabled) {
            this.model.from = this.rowsManager.gantt.getDateByPosition(x, magnetEnabled);
            this.row.setFromToByTask(this);
            this.updatePosAndSize();
        };

        // Expands the end of the task to the specified position (in em)
        Task.prototype.setTo = function(x, magnetEnabled) {
            this.model.to = this.rowsManager.gantt.getDateByPosition(x, magnetEnabled);
            this.row.setFromToByTask(this);
            this.updatePosAndSize();
        };

        // Moves the task to the specified position (in em)
        Task.prototype.moveTo = function(x, magnetEnabled) {
            var newTaskRight;
            var newTaskLeft;
            if (x > this.modelLeft) {
                // Driven by right/to side.
                this.model.to = this.rowsManager.gantt.getDateByPosition(x + this.modelWidth, magnetEnabled);
                newTaskRight = this.rowsManager.gantt.getPositionByDate(this.model.to);
                newTaskLeft = newTaskRight - this.modelWidth;
                this.model.from = this.rowsManager.gantt.getDateByPosition(newTaskLeft, false);
            } else {
                // Drive by left/from side.
                this.model.from = this.rowsManager.gantt.getDateByPosition(x, magnetEnabled);
                newTaskLeft = this.rowsManager.gantt.getPositionByDate(this.model.from);
                newTaskRight = newTaskLeft + this.modelWidth;
                this.model.to = this.rowsManager.gantt.getDateByPosition(newTaskRight, false);
            }

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
    angular.module('gantt').factory('GanttScroll', [function() {
        var Scroll = function(gantt) {
            this.gantt = gantt;

            this.gantt.api.registerEvent('scroll', 'scroll');

            this.gantt.api.registerMethod('scroll', 'to', Scroll.prototype.scrollTo, this);
            this.gantt.api.registerMethod('scroll', 'toDate', Scroll.prototype.scrollToDate, this);
            this.gantt.api.registerMethod('scroll', 'left', Scroll.prototype.scrollToLeft, this);
            this.gantt.api.registerMethod('scroll', 'right', Scroll.prototype.scrollToRight, this);

            this.gantt.api.registerMethod('scroll', 'setWidth', Scroll.prototype.setWidth, this);
        };

        Scroll.prototype.getScrollLeft = function() {
            return this.$element === undefined ? undefined : this.$element[0].scrollLeft;
        };

        Scroll.prototype.getScrollWidth = function() {
            return this.$element === undefined ? undefined : this.$element[0].scrollWidth;
        };

        Scroll.prototype.getWidth = function() {
            return this.$element === undefined ? undefined : this.$element[0].offsetWidth;
        };

        Scroll.prototype.setWidth = function(width) {
            if (this.$element[0]) {
                this.$element[0].offsetWidth = width;
            }
        };

        Scroll.prototype.getBordersWidth = function() {
            return this.$element === undefined ? undefined : (this.$element[0].offsetWidth - this.$element[0].clientWidth);
        };

        Scroll.prototype.getBordersHeight = function() {
            return this.$element === undefined ? undefined : (this.$element[0].offsetHeight - this.$element[0].clientHeight);
        };

        Scroll.prototype.isVScrollbarVisible = function () {
            if (this.$element !== undefined) {
                return this.$element[0].scrollHeight > this.$element[0].offsetHeight;
            }
        };

        Scroll.prototype.isHScrollbarVisible = function () {
            if (this.$element !== undefined) {
                return this.$element[0].scrollWidth > this.$element[0].offsetWidth;
            }
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

    angular.module('gantt').factory('GanttSide', [function() {
        var Side= function(gantt) {
            this.gantt = gantt;
        };
        Side.prototype.getWidth = function() {
            if (this.gantt.options.value('showSide')) {
                var width = this.gantt.options.value('sideWidth');
                if (width === undefined && this.$element !== undefined) {
                    width = this.$element[0].offsetWidth;
                }
                if (width !== undefined) {
                    return width;
                }
            }
            return 0;
        };
        Side.prototype.show = function(value) {
            if (this.$element !== undefined) {
                this.$element.toggleClass('ng-hide', !value);
            }
        };
        Side.prototype.isShown = function() {
            if (this.$element !== undefined) {
                return !this.$element.hasClass('ng-hide');
            }
        };

        return Side;
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
            this.modelLeft = this.gantt.getPositionByDate(this.model.from);
            this.modelWidth = this.gantt.getPositionByDate(this.model.to) - this.modelLeft;

            var lastColumn = this.gantt.columnsManager.getLastColumn();
            var maxModelLeft = lastColumn ? lastColumn.left + lastColumn.width : 0;

            if (this.modelLeft + this.modelWidth < 0 || this.modelLeft > maxModelLeft) {
                this.left = undefined;
                this.width = undefined;
            } else {
                this.left = Math.min(Math.max(this.modelLeft, 0), this.gantt.width);
                if (this.modelLeft < 0) {
                    this.truncatedLeft = true;
                    if (this.modelWidth + this.modelLeft > this.gantt.width) {
                        this.truncatedRight = true;
                        this.width = this.gantt.width;
                    } else {
                        this.truncatedRight = false;
                        this.width = this.modelWidth + this.modelLeft;
                    }
                } else if (this.modelWidth + this.modelLeft > this.gantt.width) {
                    this.truncatedRight = true;
                    this.truncatedLeft = false;
                    this.width = this.gantt.width - this.modelLeft;
                } else {
                    this.truncatedLeft = false;
                    this.truncatedRight = false;
                    this.width = this.modelWidth;
                }

                if (this.width < 0) {
                    this.left = this.left + this.width;
                    this.width = -this.width;
                }
            }


            this.updateView();
        };

        Timespan.prototype.updateView = function() {
            if (this.$element) {
                if (this.left === undefined || this.width === undefined) {
                    this.$element.css('display', 'none');
                } else {
                    this.$element.css('display', '');
                    this.$element.css('left', this.left + 'px');
                    this.$element.css('width', this.width + 'px');
                }
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
                        break;
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
            getIndicesOnly: function(input, value, comparer, strict) {
                var lo = -1, hi = input.length;
                while (hi - lo > 1) {
                    var mid = Math.floor((lo + hi) / 2);
                    if (strict ? comparer(input[mid]) < value : comparer(input[mid]) <= value) {
                        lo = mid;
                    } else {
                        hi = mid;
                    }
                }
                if (!strict && input[lo] !== undefined && comparer(input[lo]) === value) {
                    hi = lo;
                }
                return [lo, hi];
            },
            get: function(input, value, comparer, strict) {
                var res = this.getIndicesOnly(input, value, comparer, strict);
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
    angular.module('gantt').filter('ganttColumnLimit', [ 'ganttBinarySearch', function(bs) {
        // Returns only the columns which are visible on the screen
        var leftComparator = function(c) {
            return c.left;
        };

        return function(input, gantt) {
            var scrollLeft = gantt.scroll.getScrollLeft();
            var scrollContainerWidth = gantt.getWidth() - gantt.side.getWidth();

            if (scrollContainerWidth > 0) {
                var start = bs.getIndicesOnly(input, scrollLeft, leftComparator)[0];
                var end = bs.getIndicesOnly(input, scrollLeft + scrollContainerWidth, leftComparator)[1];
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

            var fromDate = gantt.options.value('fromDate');
            var toDate = gantt.options.value('toDate');

            if (firstColumn !== undefined && lastColumn !== undefined) {
                if (fromDate === undefined) {
                    fromDate = firstColumn.date;
                }

                if (toDate === undefined) {
                    toDate = lastColumn.endDate;
                }

                var res = [];

                var scrollLeft = gantt.scroll.getScrollLeft();
                var scrollContainerWidth = gantt.getWidth() - gantt.side.getWidth();

                for (var i = 0, l = input.length; i < l; i++) {
                    var task = input[i];

                    if (task.active) {
                        res.push(task);
                    } else {
                        // If the task can be drawn with gantt columns only.
                        if (task.model.to >= fromDate && task.model.from <= toDate) {

                            // If task has a visible part on the screen
                            if (!scrollContainerWidth ||
                                task.left >= scrollLeft && task.left <= scrollLeft + scrollContainerWidth ||
                                task.left + task.width >= scrollLeft && task.left + task.width <= scrollLeft + scrollContainerWidth ||
                                task.left < scrollLeft && task.left + task.width > scrollLeft + scrollContainerWidth) {

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


(function() {
    'use strict';

    angular.module('gantt').directive('ganttResizer', ['$document', '$parse', 'ganttMouseOffset', function($document, $parse, mouseOffset) {
        return {
            restrict: 'A',
            require: '^gantt',
            scope: {
                targetElement: '=ganttResizer',
                enabled: '@?ganttResizerEnabled'
            },
            link: function ($scope, $element, $attrs, ganttCtrl) {
                var api = ganttCtrl.gantt.api;
                var eventTopic = $attrs.ganttResizerEventTopic;

                if ($scope.enabled === undefined) {
                    $scope.enabled = true;
                }

                $attrs.$observe('ganttResizerEnabled', function(value) {
                    $scope.enabled = $parse(value)();
                });

                $scope.$watch('enabled', function (value) {
                    if (value === undefined) {
                        value = true;
                    }

                    $element.toggleClass('gantt-resizer-enabled', value);

                    if (value) {
                        $element.on('mousedown', mousedown);
                    } else {
                        $element.off('mousedown', mousedown);
                    }
                });

                function mousedown(event) {
                    event.preventDefault();

                    if (eventTopic !== undefined) {
                        api[eventTopic].raise.resizeBegin(getWidth());
                    }
                    $document.on('mousemove', mousemove);
                    $document.on('mouseup', mouseup);
                }

                function mousemove(event) {
                    $scope.$evalAsync(function (){
                        var offset = mouseOffset.getOffsetForElement($scope.targetElement[0], event);
                        var maxWidth = ganttCtrl.gantt.getWidth()-ganttCtrl.gantt.scroll.getBordersWidth();
                        var width = Math.min(Math.max(offset.x, 0), maxWidth);
                        setWidth(width);
                    });
                }

                function mouseup() {
                    if (eventTopic !== undefined) {
                        api[eventTopic].raise.resizeEnd(getWidth());
                    }
                    $document.unbind('mousemove', mousemove);
                    $document.unbind('mouseup', mouseup);
                }

                $scope.$watch(function() {
                    return getWidth();
                }, function(newValue) {
                    $scope.targetElement.css('width', newValue + 'px');
                });

                function setWidth(width) {
                    if (width !== getWidth()) {
                        ganttCtrl.gantt.options.set($attrs.resizerWidth, width);

                        if (eventTopic !== undefined) {
                            api[eventTopic].raise.resize(width);
                        }
                    }
                }

                function getWidth() {
                    return ganttCtrl.gantt.options.value($attrs.resizerWidth);
                }

                if (eventTopic) {
                    api.registerEvent(eventTopic, 'resize');
                    api.registerEvent(eventTopic, 'resizeBegin');
                    api.registerEvent(eventTopic, 'resizeEnd');
                    api.registerMethod(eventTopic, 'setWidth', setWidth, this);
                    api.registerMethod(eventTopic, 'getWidth', getWidth, this);
                }
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
            link: function(scope, element, attrs, ganttScrollManagerCtrl) {
                ganttScrollManagerCtrl.registerHorizontalReceiver(element);
            }
        };
    });
}());

(function(){
    'use strict';
    angular.module('gantt').directive('ganttScrollManager', function() {
        // The element with this attribute will scroll at the same time as the scrollSender element

        return {
            restrict: 'A',
            scope: {},
            controller: ['$scope', function($scope) {
                $scope.horizontal = [];
                $scope.vertical = [];

                this.registerVerticalReceiver = function (element) {
                    element.css('position', 'relative');
                    $scope.vertical.push(element[0]);
                };

                this.registerHorizontalReceiver = function (element) {
                    element.css('position', 'relative');
                    $scope.horizontal.push(element[0]);
                };

                this.getHorizontalRecievers = function() {
                    return $scope.horizontal;
                };

                this.getVerticalRecievers = function() {
                    return $scope.vertical;
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
            require: ['^gantt', '^ganttScrollManager'],
            link: function(scope, element, attrs, controllers) {
                var el = element[0];

                var updateListeners = function() {
                    var i, l;

                    var vertical = controllers[1].getVerticalRecievers();
                    for (i = 0, l = vertical.length; i < l; i++) {
                        var vElement = vertical[i];
                        if (vElement.parentNode.scrollTop !== el.scrollTop) {
                            vElement.parentNode.scrollTop = el.scrollTop;
                        }
                    }

                    var horizontal = controllers[1].getHorizontalRecievers();
                    for (i = 0, l = horizontal.length; i < l; i++) {
                        var hElement = horizontal[i];
                        if (hElement.parentNode.scrollLeft !== el.scrollLeft) {
                            hElement.parentNode.scrollLeft  = el.scrollLeft;
                        }
                    }
                };

                element.bind('scroll', updateListeners);

                scope.$watch(function() {
                    return controllers[0].gantt.width;
                }, function(newValue, oldValue) {
                    if (newValue !== oldValue) {
                        var horizontal = controllers[1].getHorizontalRecievers();
                        for (var i = 0, l = horizontal.length; i < l; i++) {
                            var hElement = horizontal[i];
                            hElement.style.width = newValue + 'px';
                        }
                    }
                });
            }
        };
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').directive('ganttScrollable', ['GanttDirectiveBuilder', '$timeout', 'ganttDebounce', 'moment', function(Builder, $timeout, debounce, moment) {
        var builder = new Builder('ganttScrollable');
        builder.controller = function($scope, $element) {
            $scope.gantt.scroll.$element = $element;
            var lastScrollLeft;

            var lastAutoExpand;
            var autoExpandCoolDownPeriod = 500;
            var autoExpandColumns = function(el, date, direction) {
                var autoExpand = $scope.gantt.options.value('autoExpand');
                if (autoExpand !== 'both' && autoExpand !== true && autoExpand !== direction) {
                    return;
                }

                var from, to;

                var viewScale = $scope.gantt.options.value('viewScale');
                viewScale = viewScale.trim();
                if (viewScale.charAt(viewScale.length - 1) === 's') {
                    viewScale = viewScale.substring(0, viewScale.length - 1);
                }
                var viewScaleValue;
                var viewScaleUnit;
                var splittedViewScale;

                if (viewScale) {
                    splittedViewScale = viewScale.split(' ');
                }
                if (splittedViewScale && splittedViewScale.length > 1) {
                    viewScaleValue = parseFloat(splittedViewScale[0]);
                    viewScaleUnit = splittedViewScale[splittedViewScale.length - 1];
                } else {
                    viewScaleValue = 1;
                    viewScaleUnit = viewScale;
                }

                if (direction === 'left') {
                    from = moment(date).add(-5 * viewScaleValue, viewScaleUnit);
                    $scope.fromDate = from;
                } else {
                    to = moment(date).add(5 * viewScaleValue, viewScaleUnit);
                    $scope.toDate = to;
                }

                lastAutoExpand = Date.now();
                $scope.gantt.api.scroll.raise.scroll(el.scrollLeft, date, direction);
                $timeout(function() {
                    var nDirection, nDate;

                    if (el.scrollLeft === 0) {
                        nDirection = 'left';
                        nDate = from;
                    } else if (el.offsetWidth + el.scrollLeft >= el.scrollWidth - 1) {
                        nDirection = 'right';
                        nDate = to;
                    }

                    if (nDirection === direction) {
                        autoExpandColumns(el, nDate, direction);
                    }
                }, autoExpandCoolDownPeriod);
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
                $scope.gantt.rowsManager.updateVisibleTasks();

                if (date !== undefined) {
                    autoExpandColumns(el, date, direction);
                } else {
                    $scope.gantt.api.scroll.raise.scroll(el.scrollLeft);
                }
            }, 5));

            $scope.getScrollableCss = function() {
                var css = {};

                var maxHeight = $scope.gantt.options.value('maxHeight');
                if (maxHeight > 0) {
                    css['max-height'] = maxHeight - $scope.gantt.header.getHeight() + 'px';
                    css['overflow-y'] = 'auto';

                    if ($scope.gantt.scroll.isVScrollbarVisible()) {
                        css['border-right'] = 'none';
                    }
                }

                var columnWidth = this.gantt.options.value('columnWidth');
                var bodySmallerThanGantt = $scope.gantt.width === 0 ? false: $scope.gantt.width < $scope.gantt.getWidth() - $scope.gantt.side.getWidth();
                if (columnWidth !== undefined && bodySmallerThanGantt) {
                    css.width = ($scope.gantt.width + this.gantt.scroll.getBordersWidth()) + 'px';
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
            link: function(scope, element, attrs, ganttScrollManagerCtrl) {
                ganttScrollManagerCtrl.registerVerticalReceiver(element);
            }
        };
    });
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
                    return $element[0].offsetWidth;
                }, function(newValue) {
                    if (newValue > 0) {
                        effectiveScope[scopeVariable] = newValue;
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
    angular.module('gantt').directive('ganttScrollableHeader', ['GanttDirectiveBuilder', 'ganttLayout', function(Builder, layout) {
        var builder = new Builder('ganttScrollableHeader');
        builder.controller = function($scope) {
            var scrollBarWidth = layout.getScrollBarWidth();
            //var oldMaxHeightActivated = false;
            $scope.getScrollableHeaderCss = function() {
                var css = {};

                var maxHeightActivated = $scope.gantt.scroll.isVScrollbarVisible();
                var vScrollbarWidth = maxHeightActivated ? scrollBarWidth: 0;
                var columnWidth = this.gantt.options.value('columnWidth');
                var bodySmallerThanGantt = $scope.gantt.width === 0 ? false: $scope.gantt.width < $scope.gantt.getWidth() - $scope.gantt.side.getWidth();

                if (columnWidth !== undefined && bodySmallerThanGantt) {
                    css.width = ($scope.gantt.width - vScrollbarWidth + this.gantt.scroll.getBordersWidth()) + 'px';
                } else if (maxHeightActivated) {
                    css.width = $scope.gantt.getWidth() - $scope.gantt.side.getWidth() - vScrollbarWidth + 'px';
                }

                /*
                if (oldMaxHeightActivated !== maxHeightActivated) {
                    oldMaxHeightActivated = maxHeightActivated;
                    $scope.gantt.columnsManager.updateColumnsMeta();
                }
                */

                return css;
            };
        };
        return builder.build();
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').directive('ganttSide', ['GanttDirectiveBuilder', function(Builder) {
        var builder = new Builder('ganttSide');
        builder.controller = function($scope, $element) {
            $scope.gantt.side.$element = $element;
            $scope.gantt.side.$scope = $scope;
        };
        return builder.build();
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').directive('ganttSideContent', ['GanttDirectiveBuilder', function(Builder) {
        var builder = new Builder('ganttSideContent');
        return builder.build();
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').directive('ganttTask', ['GanttDirectiveBuilder', 'moment', function(Builder, moment) {
        var builder = new Builder('ganttTask');
        builder.controller = function($scope, $element) {
            $scope.task.$element = $element;
            $scope.task.$scope = $scope;

            $scope.simplifyMoment = function(d) {
                return moment.isMoment(d) ? d.unix() : d;
            };

            $scope.$watchGroup(['simplifyMoment(task.model.from)', 'simplifyMoment(task.model.to)'], function() {
                $scope.task.updatePosAndSize();
            });
        };
        return builder.build();
    }]);
}());

(function(){
    'use strict';
    angular.module('gantt').directive('ganttTaskBackground', ['GanttDirectiveBuilder', function(Builder) {
        var builder = new Builder('ganttTaskBackground');
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
    angular.module('gantt').directive('ganttTaskForeground', ['GanttDirectiveBuilder', function(Builder) {
        var builder = new Builder('ganttTaskForeground');
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
            this.scope = false;
            this.transclude = true;
            this.replace = true;

            this.build = function() {
                var directiveName = self.directiveName;
                var templateUrl = self.templateUrl;
                var controllerFunction = self.controller;

                var directive = {
                    restrict: self.restrict,
                    require: self.require,
                    transclude: self.transclude,
                    replace: self.replace,
                    scope: self.scope,
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

                if (!templateUrl) {
                    delete directive.templateUrl;
                    delete directive.replace;
                    delete directive.transclude;
                }

                return directive;
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
            /**
             * Compute the height of scrollbar.
             *
             * @returns {number} height of the scrollbar, in px.
             */
            getScrollBarHeight: function() {
                var inner = $document[0].createElement('p');
                inner.style.width = '200px;';
                inner.style.height = '100%';

                var outer = $document[0].createElement('div');
                outer.style.position = 'absolute';
                outer.style.top = '0px';
                outer.style.left = '0px';
                outer.style.visibility = 'hidden';
                outer.style.width = '150px';
                outer.style.height = '200px';
                outer.style.overflow = 'hidden';
                outer.appendChild (inner);

                $document[0].body.appendChild (outer);

                var h1 = inner.offsetHeight;
                outer.style.overflow = 'scroll';

                var h2 = inner.offsetHeight;
                if (h1 === h2) {
                    h2 = outer.clientHeight;
                }

                $document[0].body.removeChild (outer);

                return (h1 - h2);
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
        '<div class="gantt unselectable" ng-cloak gantt-scroll-manager gantt-element-width-listener="ganttElementWidth">\n' +
        '    <gantt-side>\n' +
        '        <gantt-side-content>\n' +
        '        </gantt-side-content>\n' +
        '        <div gantt-resizer="gantt.side.$element" gantt-resizer-event-topic="side" gantt-resizer-enabled="{{$parent.gantt.options.value(\'allowSideResizing\')}}" resizer-width="sideWidth" class="gantt-resizer">\n' +
        '            <div ng-show="$parent.gantt.options.value(\'allowSideResizing\')" class="gantt-resizer-display"></div>\n' +
        '        </div>\n' +
        '    </gantt-side>\n' +
        '    <gantt-scrollable-header>\n' +
        '        <gantt-header>\n' +
        '            <gantt-header-columns>\n' +
        '                <div ng-repeat="header in gantt.columnsManager.visibleHeaders">\n' +
        '                    <div class="gantt-header-row" ng-class="{\'gantt-header-row-last\': $last, \'gantt-header-row-first\': $first}">\n' +
        '                        <div ng-repeat="column in header">\n' +
        '                            <gantt-column-header ></gantt-column-header>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </gantt-header-columns>\n' +
        '        </gantt-header>\n' +
        '    </gantt-scrollable-header>\n' +
        '    <gantt-scrollable>\n' +
        '        <gantt-body>\n' +
        '            <gantt-body-background>\n' +
        '                <div ng-repeat="row in gantt.rowsManager.visibleRows track by row.model.id">\n' +
        '                    <gantt-row-background></gantt-row-background>\n' +
        '                </div>\n' +
        '            </gantt-body-background>\n' +
        '            <gantt-body-foreground>\n' +
        '                <div class="gantt-current-date-line" ng-show="currentDate === \'line\' && gantt.currentDateManager.position >= 0 && gantt.currentDateManager.position <= gantt.width" ng-style="{\'left\': gantt.currentDateManager.position + \'px\' }"></div>\n' +
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
        '            <gantt-body-rows>\n' +
        '                <div ng-repeat="timespan in gantt.timespansManager.timespans track by timespan.model.id">\n' +
        '                    <gantt-timespan></gantt-timespan>\n' +
        '                </div>\n' +
        '                <div ng-repeat="row in gantt.rowsManager.visibleRows track by row.model.id">\n' +
        '                    <gantt-row>\n' +
        '                        <div ng-repeat="task in row.visibleTasks track by task.model.id">\n' +
        '                            <gantt-task></gantt-task>\n' +
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
        '        <div ng-transclude class="gantt-body" ng-style="{\'width\': gantt.width +\'px\'}"></div>\n' +
        '    </script>\n' +
        '\n' +
        '    <!-- Header template -->\n' +
        '    <script type="text/ng-template" id="template/ganttHeader.tmpl.html">\n' +
        '        <div ng-transclude class="gantt-header"\n' +
        '             ng-show="gantt.columnsManager.columns.length > 0 && gantt.columnsManager.headers.length > 0"></div>\n' +
        '    </script>\n' +
        '\n' +
        '    <!-- Side template -->\n' +
        '    <script type="text/ng-template" id="template/ganttSide.tmpl.html">\n' +
        '        <div ng-transclude class="gantt-side"></div>\n' +
        '    </script>\n' +
        '\n' +
        '    <!-- Side content template-->\n' +
        '    <script type="text/ng-template" id="template/ganttSideContent.tmpl.html">\n' +
        '        <div class="gantt-side-content">\n' +
        '        </div>\n' +
        '    </script>\n' +
        '\n' +
        '    <!-- Header columns template -->\n' +
        '    <script type="text/ng-template" id="template/ganttHeaderColumns.tmpl.html">\n' +
        '        <div ng-transclude class="gantt-header-columns"\n' +
        '              gantt-horizontal-scroll-receiver></div>\n' +
        '    </script>\n' +
        '\n' +
        '    <script type="text/ng-template" id="template/ganttColumnHeader.tmpl.html">\n' +
        '        <div class="gantt-column-header" ng-class="{\'gantt-column-header-last\': $last, \'gantt-column-header-first\': $first}">{{::column.label}}</div>\n' +
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
        '        <div ng-transclude class="gantt-column gantt-foreground-col" ng-class="{\'gantt-column-last\': $last, \'gantt-column-first\': $first}"></div>\n' +
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
        '    <script type="text/ng-template" id="template/ganttScrollableHeader.tmpl.html">\n' +
        '        <div ng-transclude class="gantt-scrollable-header" ng-style="getScrollableHeaderCss()"></div>\n' +
        '    </script>\n' +
        '\n' +
        '    <!-- Rows template -->\n' +
        '    <script type="text/ng-template" id="template/ganttBodyRows.tmpl.html">\n' +
        '        <div ng-transclude class="gantt-body-rows"></div>\n' +
        '    </script>\n' +
        '\n' +
        '    <!-- Timespan template -->\n' +
        '    <script type="text/ng-template" id="template/ganttTimespan.tmpl.html">\n' +
        '        <div class="gantt-timespan" ng-class="::timespan.classes">\n' +
        '        </div>\n' +
        '    </script>\n' +
        '\n' +
        '    <!-- Task template -->\n' +
        '    <script type="text/ng-template" id="template/ganttTask.tmpl.html">\n' +
        '        <div>\n' +
        '            <gantt-task-background></gantt-task-background>\n' +
        '            <gantt-task-content></gantt-task-content>\n' +
        '            <gantt-task-foreground></gantt-task-foreground>\n' +
        '        </div>\n' +
        '    </script>\n' +
        '\n' +
        '    <script type="text/ng-template" id="template/ganttTaskBackground.tmpl.html">\n' +
        '        <div class="gantt-task-background" ng-class="task.model.classes" ng-style="{\'background-color\': task.model.color}"></div>\n' +
        '    </script>\n' +
        '\n' +
        '    <script type="text/ng-template" id="template/ganttTaskForeground.tmpl.html">\n' +
        '        <div class="gantt-task-foreground">\n' +
        '            <div ng-if="task.truncatedRight" class="gantt-task-truncated-right"><span>&gt;</span></div>\n' +
        '            <div ng-if="task.truncatedLeft" class="gantt-task-truncated-left"><span>&lt;</span></div>\n' +
        '        </div>\n' +
        '    </script>\n' +
        '\n' +
        '    <!-- Task content template -->\n' +
        '    <script type="text/ng-template" id="template/ganttTaskContent.tmpl.html">\n' +
        '        <div class="gantt-task-content-container">\n' +
        '            <div class="gantt-task-content"><span>{{task.model.name}}</span><span class="middle-placeholder"></span></div>\n' +
        '        </div>\n' +
        '    </script>\n' +
        '\n' +
        '    <!-- Row template -->\n' +
        '    <script type="text/ng-template" id="template/ganttRow.tmpl.html">\n' +
        '        <div ng-transclude class="gantt-row gantt-row-height" ng-style="::{\'height\': row.model.height}"></div>\n' +
        '    </script>\n' +
        '\n' +
        '</div>\n' +
        '');
}]);

//# sourceMappingURL=angular-gantt.js.map