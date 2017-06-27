var theme;
try {
	var m = /\bTHEME=(\w+?)\b/g.exec(document.cookie);
	theme = m[1];
} catch (e) {
}
if (theme && theme != 'default') {
	document.write('<link href="/bootstrap/css/theme-' + theme
			+ '.css" rel="stylesheet">');
}

function goAt(url) {
	window.location.href = url;
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

function _emit(ev, eventId) {

	_stop(ev);

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
				$(sel).html(data[sel]);
			}
		}
	}).fail(function(data) {
		alert("Error!");
		console.log(data);
	});
}

function _popup(popupUrl, onClosed) {
	var ww = 800;
	var hh = 600;

	var left = (screen.width / 2) - (ww / 2);
	var top = (screen.height / 2) - (hh / 2);

	var win = window.open(popupUrl, "windowname1", 'width=' + ww + ', height='
			+ hh + ', top=' + top + ', left=' + left);

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

var rapidoidApp = angular.module('rapidoid-app', [ 'infinite-scroll' ]);

rapidoidApp.filter('rangex', function() {
	return function(input, from, total) {

		var output = [];

		from = parseInt(from);
		total = parseInt(total);

		for (var i = from; i < from + total; i++) {
			output.push(i);
		}

		return output;
	}
});

rapidoidApp.filter('nth', function() {
	return function(input, n, per) {
		var out = [];

		for (var i = 0; i < input.length; i++) {
			if (i % per == n) {
				out.push(input[i]);
			}
		}

		return out;
	}
});

rapidoidApp.controller('Main', [ '$scope', '$http', '$window',
		function($scope, $http, $window) {

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
				var favs = JSON.parse(localStorage['favortites'] || '{}');
				item.fav = !item.fav;
				if (item.fav) {
					favs[item.id] = true;
				} else {
					delete favs[item.id];
				}
				localStorage['favortites'] = JSON.stringify(favs);
			}

		} ]);

rapidoidApp.controller('StreamController', [ '$scope', '$http', '$window',
		'$attrs', 'StreamData',
		function($scope, $http, $window, $attrs, StreamData) {
			var dataUrl = $attrs.url;
			$scope.stream = new StreamData(dataUrl);
			$scope.items = $scope.stream.items;
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
