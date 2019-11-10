var theme;
try {
    var m = /\bTHEME=(\w+?)\b/g.exec(document.cookie);
    theme = m[1];
} catch (e) {}
if (theme && theme != 'default') {
    document.write('<link href="/bootstrap/css/theme-' + theme + '.css" rel="stylesheet">');
}

function goAt(url) {
    window.location.href = url;
}
function _appendScript(url) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    var head = document.getElementsByTagName('head')[0];
    head.appendChild(script);
}

function _stop(ev) {
    if (typeof ev.stopPropagation != "undefined") {
        ev.stopPropagation();
    } else if (typeof ev.preventDefault != "undefined") {
        ev.preventDefault();
    } else {
        ev.cancelBubble = true;
    }
}

function _popup(popupUrl, onClosed) {
    var ww = 800;
    var hh = 600;

    var left = (screen.width / 2) - (ww / 2);
    var top = (screen.height / 2) - (hh / 2);

    var win = window
            .open(popupUrl, "windowname1", 'width=' + ww + ', height=' + hh + ', top=' + top + ', left=' + left);

    if (win.focus) {
        win.focus();
    }

    var winTimer = setInterval(function() {
        if (win.closed) {
            clearInterval(winTimer);
            if (onClosed) {
                onClosed(popupUrl);
            }
        }
    }, 100);
}

var rapidoidApp = angular.module('rapidoid-app', [ 'infinite-scroll', 'ngSanitize' ]);

function range(from, total) {
    var rangeArr = [];

    for (var i = from; i < from + total; i++) {
        rangeArr.push(i);
    }

    return rangeArr;
}

rapidoidApp.filter('rangex', function() {
    return function(input, from, total) {
        from = parseInt(from);
        total = parseInt(total);
        return range(from, total);
    }
});

rapidoidApp.filter('rowCount', function() {
    return function(input, cols) {
        return range(0, Math.ceil(input.length / cols));
    }
});

rapidoidApp.filter('modn', function() {
    return function(arr, n, remainder) {
        remainder = remainder || 0;
        return arr.filter(function(item, index) {
            return index % n == remainder;
        })
    };
});

// Based on:
// http://stackoverflow.com/questions/17417607/angular-ng-bind-html-unsafe-and-directive-within-it
rapidoidApp.directive('compile', [ '$compile', function($compile) {
    return function(scope, element, attrs) {
        scope.$watch(function(scope) {
            // watch the 'compile' expression for changes
            return scope.$eval(attrs.compile);
        }, function(value) {
            // when the 'compile' expression changes
            // assign it into the current DOM
            element.html(value);

            // compile the new DOM and link it to the current
            // scope.
            // NOTE: we only compile .childNodes so that
            // we don't get into infinite loop compiling ourselves
            $compile(element.contents())(scope);
        });
    };
} ]);

rapidoidApp.controller('Main', [ '$scope', '$http', '$window', function($scope, $http, $window) {

    $scope._emit = function(eventId) {

        // _stop(ev);

        var x = document.querySelectorAll("input,textarea");
        var inputs = {};
        for (var i = 0; i < x.length; i++) {
            var t = $(x[i]);
            var _h = t.attr('_h');

            if (_h) {
                var val;

                if (t.prop('type') == 'checkbox' || t.prop('type') == 'radio') {
                    val = t.prop('checked');
                } else {
                    val = t.val();
                }

                inputs[_h] = val;
            }
        }

        x = document.querySelectorAll("option");

        for (var i = 0; i < x.length; i++) {
            var t = $(x[i]);
            var _h = t.attr('_h');

            if (_h) {
                inputs[_h] = t.prop('selected');
            }
        }

        $.post(window.location.href, {
            event : eventId,
            inputs : JSON.stringify(inputs)
        }).done(function(data) {
            if (data._redirect_) {
                goAt(data._redirect_);
                return;
            }
            for ( var sel in data) {
                if (sel == "!errors") {
                    $('.field-error').html('');
                    errors = data[sel];
                    for ( var h in errors) {
                        var err = errors[h];

                        var x = document.querySelectorAll("input,textarea,option");
                        for (var i = 0; i < x.length; i++) {
                            var t = $(x[i]);
                            var _h = t.attr('_h');
                            if (_h == h) {
                                $(t).next('.field-error').html(err);
                            }
                        }
                    }
                } else {
                    if (sel == 'body') {
                        $scope.bodyContent = data[sel];
                        $scope.$apply();
                    } else {
                        alert('Selector not supported: ' + sel);
                    }
                }
            }
        }).fail(function(data) {
            alert("Error!");
            console.log(data);
        });
    }

    $scope.moreLess = function(item) {
        item.more = !item.more;
    }

    $scope.upvote = function(item) {
        item.vote = item.vote != 1 ? 1 : 0;
    }

    $scope.downvote = function(item) {
        item.vote = item.vote != -1 ? -1 : 0;
    }

    $scope.changeFavLocal = function(item) {
        var favs = JSON.parse(localStorage['favorites'] || '{}');
        item.fav = !item.fav;
        if (item.fav) {
            favs[item.id] = true;
        } else {
            delete favs[item.id];
        }
        localStorage['favorites'] = JSON.stringify(favs);
    }

} ]);

rapidoidApp.controller('StreamController', [ '$scope', '$http', '$window', '$attrs', 'StreamData',
        function($scope, $http, $window, $attrs, StreamData) {
            var dataUrl = $attrs.url;
            $scope.stream = new StreamData(dataUrl);
            $scope.items = $scope.stream.items;
            $scope.cols = 1;
        } ]);

rapidoidApp.factory('StreamData', function($http) {

    var StreamData = function(dataUrl) {
        this.items = [];
        this.busy = false;
        this.page = 1;
        this.dataUrl = dataUrl;
        this.cols = 3;
    };

    StreamData.prototype.nextPage = function() {
        if (this.busy)
            return;
        this.busy = true;

        var url = this.dataUrl.replace('{{page}}', '' + this.page);

        $http.get(url).success(function(data) {
            var items = data;
            for (var i = 0; i < items.length; i++) {
                this.items.push(items[i]);
            }
            this.page++;
            this.busy = false;
        }.bind(this));
    };

    StreamData.prototype.zoom = function(delta) {
        var cols = this.cols + delta;
        if (cols >= 1 && cols <= 4) {
            this.cols = cols;
        }
    }

    return StreamData;

});

rapidoidApp.controller('StreamItemController', [ '$scope', '$http', '$window', '$attrs',
        function($scope, $http, $window, $attrs) {
            var index = $scope.rowN * $scope.cols + $scope.colN;
            $scope.it = function() {
                return $scope.items[index];
            };
        } ]);
