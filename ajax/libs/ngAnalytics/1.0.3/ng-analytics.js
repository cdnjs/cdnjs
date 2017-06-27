/*global gapi*/
(function () {

    var app;
    // declare ngAnalytics module
    app = angular.module("ngAnalytics", []);

    // service to hold viewSelectors, getter, setters, helper
    app.service('ngAnalyticsService', [
        '$timeout',
        function ($timeout) {
            var clientId;

            this.ga = null;

            this.setClientId = function (id) {
                clientId = id;
                return id;
            };

            this.getClientId = function () {
                return clientId;
            };

            this.authorize = function (container) {
                var self = this;

                $timeout(function () {
                    self.ga.auth.authorize({
                        container: container,
                        clientid: clientId,
                        userInfoLabel: self.authLabel
                    });
                }, 0);
            };
            this.viewSelectors = {};
            this.isReady = false;
            this.authLabel = undefined;
            this.authorized = false;
        }
    ]);

    app.directive("ngAnalyticsAuth", [
        'ngAnalyticsService',
        function (ngAnalyticsService) {
            return {
                scope: {
                    label: '@',
                    authContainer: '@',
                    hideOnAuth: '@'
                },
                restrict: 'E',
                templateUrl: 'ngAnalytics-auth/template.html',
                link: function ($scope) {
                    ngAnalyticsService.authLabel = $scope.label;
                    $scope.authContainer = $scope.authContainer || 'embed-api-auth-container';
                    var watcher = $scope.$watch(function () {
                        return ngAnalyticsService.isReady;
                    }, function (isReady) {
                        if (isReady) {
                            if ($scope.hideOnAuth && $scope.hideOnAuth === 'true') {
                                ngAnalyticsService.ga.auth.on('success', function () {
                                    // Render the view selector to the page.
                                    $scope.hide = true;
                                });

                                $scope.$watch(function () {
                                    return ngAnalyticsService.ga.auth.isAuthorized();
                                }, function (isAuthorized, old) {
                                    if (isAuthorized && old !== isAuthorized) {
                                        $scope.hide = true;
                                    } else if (!isAuthorized && old !== isAuthorized) {
                                        $scope.hide = false;
                                    }
                                });
                            }
                            // remove watcher
                            watcher();
                        }
                    });
                }
            };
        }
    ]);

    app.directive("ngAnalyticsChart", [
        'ngAnalyticsService',
        function (ngAnalyticsService) {
            return {
                scope: {
                    viewSelectorContainer: '@',
                    authContainer: '@',
                    chart: '='
                },
                restrict: 'E',
                templateUrl: 'ngAnalytics-chart/template.html',
                link: function ($scope) {
                    var first = !ngAnalyticsService.authorized ? true : false,
                        viewWatcher;
                    ngAnalyticsService.authorized = true;
                    // add functionality only if gapi is ready
                    var watcher = $scope.$watch(function () {
                        return ngAnalyticsService.isReady;
                    }, function (isReady) {
                        if (isReady) {
                            var chart;
                            /**
                            * Authorize the user immediately if the user has already granted access.
                            * If no access has been created, render an authorize button inside the
                            * element with the ID "embed-api-auth-container".
                            */
                            if (!ngAnalyticsService.ga.auth.isAuthorized() && first) {
                                ngAnalyticsService.authorize($scope.authContainer || 'embed-api-auth-container');
                            }

                            /**
                            * Create chart
                            */
                            chart = new ngAnalyticsService.ga.googleCharts.DataChart($scope.chart);

                            // If viewSelector container -> watch if viewselector is created -> if so -> add change listener and update chart
                            if ($scope.viewSelectorContainer) {
                                viewWatcher = $scope.$watch(function () {
                                    return ngAnalyticsService.viewSelectors[$scope.viewSelectorContainer];
                                }, function (viewSelector) {
                                    if (viewSelector) {
                                        ngAnalyticsService.viewSelectors[$scope.viewSelectorContainer].on('change', function (ids) {
                                            var newIds = {
                                                query: {
                                                    ids: ids
                                                }
                                            };

                                            chart.set(newIds).execute();
                                        });
                                        // clear watcher
                                        viewWatcher();
                                    }
                                });
                            } else {
                                var callback = function () {
                                    // Render the view selector to the page.
                                    chart.execute();
                                };

                                ngAnalyticsService.ga.auth.once('success', callback);
                                if (ngAnalyticsService.ga.auth.isAuthorized()) {
                                    callback();
                                }
                            }

                            // clear watcher;
                            watcher();
                        }
                    });
                }
            };
        }
    ]);

    app.directive("ngAnalyticsReport", [
        '$rootScope',
        '$q',
        'ngAnalyticsService',
        function ($rootScope, $q, ngAnalyticsService) {
            return {
                scope: {
                    queries: '=',
                    authContainer: '@',
                    viewSelectorContainer: '@'
                },
                restrict: 'E',
                link: function ($scope, element) {
                    var first = !ngAnalyticsService.authorized ? true : false;
                    ngAnalyticsService.authorized = true;

                    // return promise
                    function getReport(query) {
                        var promise = $q.defer();

                        var report = new ngAnalyticsService.ga.report.Data(query);
                        report.once('success', function (response) {
                            promise.resolve(response);
                        });

                        report.once('error', function (response) {
                            promise.reject(response);
                        });

                        report.execute();

                        return promise.promise;
                    }

                    // add functionality only if gapi is ready
                    var watcher = $scope.$watch(function () {
                        return ngAnalyticsService.isReady;
                    }, function (isReady) {
                        if (isReady) {
                            /**
                            * Authorize the user immediately if the user has already granted access.
                            * If no access has been created, render an authorize button inside the
                            * element with the ID "embed-api-auth-container".
                            */
                            if (!ngAnalyticsService.ga.auth.isAuthorized() && first) {
                                ngAnalyticsService.authorize($scope.authContainer || 'embed-api-auth-container');
                            }
                            // without viewSelector connection
                            if (!$scope.viewSelectorContainer) {
                                var callback = function () {
                                    // Send report request.
                                    /**
                                    * Create report
                                    */
                                    var tasks = [];
                                    angular.forEach($scope.queries, function (query) {
                                        tasks.push(getReport(query));
                                    });
                                    $q.all(tasks).then(function (response) {
                                        $scope.report = response;
                                        $rootScope.$broadcast('$gaReportSuccess', response, element);
                                    }, function (response) {
                                        $scope.error = response;
                                        $rootScope.$broadcast('$gaReportError', response, element);
                                    });
                                };

                                ngAnalyticsService.ga.auth.once('success', callback);
                                if (ngAnalyticsService.ga.auth.isAuthorized()) {
                                    callback();
                                }
                            } else { // with viewSelector connection
                                var viewWatcher = $scope.$watch(function () {
                                    return ngAnalyticsService.viewSelectors[$scope.viewSelectorContainer];
                                }, function (viewSelector) {
                                    if (viewSelector) {
                                        ngAnalyticsService.viewSelectors[$scope.viewSelectorContainer].on('change', function (ids) {
                                            var tasks = [];
                                            angular.forEach($scope.queries, function (query) {
                                                query.query.ids = ids;
                                                tasks.push(getReport(query));
                                            });
                                            $q.all(tasks).then(function (response) {
                                                $scope.report = response;
                                                $rootScope.$broadcast('$gaReportSuccess', response, element);
                                            }, function (response) {
                                                $scope.error = response;
                                                $rootScope.$broadcast('$gaReportError', response, element);
                                            });
                                        });
                                        // clear watcher
                                        viewWatcher();
                                    }
                                });
                            }

                            // clear watcher;
                            watcher();
                        }
                    });
                }
            };
        }
    ]);

    app.directive("ngAnalyticsView", [
        'ngAnalyticsService',
        function (ngAnalyticsService) {
            return {
                scope: {
                    viewSelectorContainer: '@',
                    authContainer: '@',
                    charts: '='
                },
                restrict: 'E',
                templateUrl: 'ngAnalytics-view/template.html',
                link: function ($scope) {
                    var first = !ngAnalyticsService.authorized ? true : false;
                    ngAnalyticsService.authorized = true;
                    // add functionality only if gapi is ready
                    $scope.$watch(function () {
                        return ngAnalyticsService.isReady;
                    }, function (isReady) {
                        if (isReady) {
                            /**
                            * Authorize the user immediately if the user has already granted access.
                            * If no access has been created, render an authorize button inside the
                            * element with the ID "embed-api-auth-container".
                            */
                            if (!ngAnalyticsService.ga.auth.isAuthorized() && first) {
                                ngAnalyticsService.authorize($scope.authContainer || 'embed-api-auth-container');
                            }
                            /**
                            * Create a new ViewSelector instance to be rendered inside of an
                            * element with the id "view-selector-container".
                            */
                            $scope.viewSelectorContainer = $scope.viewSelectorContainer || 'view-selector-container';

                            var viewSelector = new ngAnalyticsService.ga.ViewSelector({
                                container: $scope.viewSelectorContainer
                            });

                            /* store created view in service */
                            ngAnalyticsService.viewSelectors[$scope.viewSelectorContainer] = viewSelector;

                            var callback = function () {
                                // Render the view selector to the page.
                                viewSelector.execute();
                            };

                            ngAnalyticsService.ga.auth.once('success', callback);
                            if (ngAnalyticsService.ga.auth.isAuthorized()) {
                                callback();
                            }
                        }
                    });
                }
            };
        }
    ]);

    app.run([
        '$templateCache',
        '$timeout',
        'ngAnalyticsService',
        function ($templateCache, $timeout, ngAnalyticsService) {

            // add Google Analytics Script at the end of the page
            var gaCode = document.createTextNode("(function(w,d,s,g,js,fs){ g=w.gapi||(w.gapi={});g.analytics={q:[],ready:function(f){this.q.push(f);}}; js=d.createElement(s);fs=d.getElementsByTagName(s)[0]; js.src='https://apis.google.com/js/platform.js'; fs.parentNode.insertBefore(js,fs);js.onload=function(){g.load('analytics');}; }(window,document,'script'));");
            var scriptTag = document.createElement('script');
            scriptTag.type = 'text/javascript';
            scriptTag.appendChild(gaCode);
            document.body.appendChild(scriptTag);

            // if ga is ready -> inform service
            gapi.analytics.ready(function () {
                $timeout(function () {
                    ngAnalyticsService.ga = gapi.analytics;
                    ngAnalyticsService.isReady = true;
                }, 0);
            });

            // put template in template cache
            $templateCache.put('ngAnalytics-auth/template.html', '<div id="{{authContainer}}" ng-hide="hide"></div>');
            $templateCache.put('ngAnalytics-chart/template.html', '<div id="{{chart.chart.container}}"></div>');
            $templateCache.put('ngAnalytics-view/template.html', '<div id="{{viewSelectorContainer}}"></div>');
        }
    ]);
}).call(this);
