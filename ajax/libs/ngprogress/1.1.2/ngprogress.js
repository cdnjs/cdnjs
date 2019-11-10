/*
ngprogress 1.1.2 - slim, site-wide progressbar for AngularJS 
(C) 2013 - Victor Bjelkholm 
License: MIT 
Source: https://github.com/VictorBjelkholm/ngProgress 
Date Compiled: 2015-07-27 
*/
angular.module('ngProgress.provider', ['ngProgress.directive'])
    .service('ngProgress', function () {
        'use strict';
				return ['$document', '$window', '$compile', '$rootScope', '$timeout', function($document, $window, $compile, $rootScope, $timeout) {
						this.autoStyle = true;
						this.count = 0;
            this.height = '2px';
						this.$scope = $rootScope.$new();
						this.color = 'firebrick';
						this.parent = $document.find('body')[0];
						this.count = 0;

            // Compile the directive
            this.progressbarEl = $compile('<ng-progress></ng-progress>')(this.$scope);
            // Add the element to body
            this.parent.appendChild(this.progressbarEl[0]);
            // Set the initial height
            this.$scope.count = this.count;
            // If height or color isn't undefined, set the height, background-color and color.
            if (this.height !== undefined) {
                this.progressbarEl.eq(0).children().css('height', this.height);
            }
            if (this.color !== undefined) {
                this.progressbarEl.eq(0).children().css('background-color', this.color);
                this.progressbarEl.eq(0).children().css('color', this.color);
            }
            // The ID for the interval controlling start()
            this.intervalCounterId = 0;

                // Starts the animation and adds between 0 - 5 percent to loading
                // each 400 milliseconds. Should always be finished with progressbar.complete()
                // to hide it
                this.start = function () {
                    // TODO Use requestAnimationFrame instead of setInterval
                    // https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame
                    this.show();
                    var self = this;
                    clearInterval(this.intervalCounterId);
                    this.intervalCounterId = setInterval(function () {
                        if (isNaN(self.count)) {
                            clearInterval(self.intervalCounterId);
                            self.count = 0;
                            self.hide();
                        } else {
                            self.remaining = 100 - self.count;
                            self.count = self.count + (0.15 * Math.pow(1 - Math.sqrt(self.remaining), 2));
                            self.updateCount(self.count);
                        }
                    }, 200);
                };
                this.updateCount = function (new_count) {
                    this.$scope.count = new_count;
                    if(!this.$scope.$$phase) {
                        this.$scope.$apply();
                    }
                };
                // Sets the height of the progressbar. Use any valid CSS value
                // Eg '10px', '1em' or '1%'
                this.setHeight = function (new_height) {
                    if (new_height !== undefined) {
                        this.height = new_height;
                        this.$scope.height = this.height;
                        if(!this.$scope.$$phase) {
                            this.$scope.$apply();
                        }
                    }
                    return this.height;
                };
                // Sets the color of the progressbar and it's shadow. Use any valid HTML
                // color
                this.setColor = function(new_color) {
                    if (new_color !== undefined) {
                        this.color = new_color;
                        this.$scope.color = this.color;
                        if(!this.$scope.$$phase) {
                            this.$scope.$apply();
                        }
                    }
                    return this.color;
                };
                this.hide = function() {
                    this.progressbarEl.children().css('opacity', '0');
                    var self = this;
                    self.animate(function () {
                        self.progressbarEl.children().css('width', '0%');
                        self.animate(function () {
                            self.show();
                        }, 500);
                    }, 500);
                };
                this.show = function () {
                    var self = this;
                    self.animate(function () {
                        self.progressbarEl.children().css('opacity', '1');
                    }, 100);
                };
                // Cancel any prior animations before running new ones.
                // Multiple simultaneous animations just look weird.
                this.animate = function(fn, time) {
                    if(this.animation !== undefined) { $timeout.cancel(this.animation); }
                    this.animation = $timeout(fn, time);
                };
                // Returns on how many percent the progressbar is at. Should'nt be needed
                this.status = function () {
                    return this.count;
                };
                // Stops the progressbar at it's current location
                this.stop = function () {
                    clearInterval(this.intervalCounterId);
                };
                // Set's the progressbar percentage. Use a number between 0 - 100.
                // If 100 is provided, complete will be called.
                this.set = function (new_count) {
                    this.show();
                    this.updateCount(new_count);
                    this.count = new_count;
                    clearInterval(this.intervalCounterId);
                    return this.count;
                };
                this.css = function (args) {
                    return this.progressbarEl.children().css(args);
                };
                // Resets the progressbar to percetage 0 and therefore will be hided after
                // it's rollbacked
                this.reset = function () {
                    clearInterval(this.intervalCounterId);
                    this.count = 0;
                    this.updateCount(this.count);
                    return 0;
                };
                // Jumps to 100% progress and fades away progressbar.
                this.complete = function () {
                    this.count = 100;
                    this.updateCount(this.count);
                    var self = this;
                    clearInterval(this.intervalCounterId);
                    $timeout(function () {
                        self.hide();
                        $timeout(function () {
                            self.count = 0;
                            self.updateCount(self.count);
                        }, 500);
                    }, 1000);
                    return this.count;
                };
                // Set the parent of the directive, sometimes body is not sufficient
                this.setParent = function(newParent) {
                    if(newParent === null || newParent === undefined) {
                        throw new Error('Provide a valid parent of type HTMLElement');
                    }

                    if(this.parent !== null && this.parent !== undefined) {
                        this.parent.removeChild(this.progressbarEl[0]);
                    }

                    this.parent = newParent;
                    this.parent.appendChild(this.progressbarEl[0]);
                };
                // Gets the current element the progressbar is attached to
                this.getDomElement = function () {
                    return this.progressbarEl;
                };
                this.setAbsolute = function() {
                    this.progressbarEl.css('position', 'absolute');
                };
            }];
    })
.factory('ngProgressFactory', ['$injector', 'ngProgress', function($injector, ngProgress) {
    var service = {
        createInstance: function () {
            return $injector.instantiate(ngProgress);
        }
    };
    return service;
}]);
angular.module('ngProgress.directive', [])
    .directive('ngProgress', ["$window", "$rootScope", function ($window, $rootScope) {
        var directiveObj = {
            // Replace the directive
            replace: true,
            // Only use as a element
            restrict: 'E',
            link: function ($scope, $element, $attrs, $controller) {
                // Watch the count on the $rootScope. As soon as count changes to something that
                // isn't undefined or null, change the counter on $scope and also the width of
                // the progressbar. The same goes for color and height on the $rootScope
                $scope.$watch('count', function (newVal) {
                    if (newVal !== undefined || newVal !== null) {
                        $scope.counter = newVal;
                        $element.eq(0).children().css('width', newVal + '%');
                    }
                });
                $scope.$watch('color', function (newVal) {
                    if (newVal !== undefined || newVal !== null) {
                        $scope.color = newVal;
                        $element.eq(0).children().css('background-color', newVal);
                        $element.eq(0).children().css('color', newVal);
                    }
                });
                $scope.$watch('height', function (newVal) {
                    if (newVal !== undefined || newVal !== null) {
                        $scope.height = newVal;
                        $element.eq(0).children().css('height', newVal);
                    }
                });
            },
            // The actual html that will be used
            template: '<div id="ngProgress-container"><div id="ngProgress"></div></div>'
        };
        return directiveObj;
    }]);

angular.module('ngProgress', ['ngProgress.directive', 'ngProgress.provider']);