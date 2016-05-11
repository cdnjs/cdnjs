'use strict';

describe("angular-inview", function() {

	var $rootScope, $compile, $q;

	beforeEach(function () {
		module('angular-inview');

		inject(function (_$rootScope_, _$compile_, _$q_) {
			$rootScope = _$rootScope_;
			$compile = _$compile_;
			$q = _$q_;
		});
	});

	describe("in-view directive", function() {

		it("should trigger in-view expression with `$inview` local", function(done) {
			makeTestForHtml(
				'<div in-view="spy($inview)"></div>'
			)
			.then(function (test) {
				expect(test.spy.calls.count()).toBe(1);
				expect(test.spy).toHaveBeenCalledWith(true);
			})
			.then(done);
		});

		it("should not trigger in-view expression if out of viewport", function(done) {
			makeTestForHtml(
				'<div in-view="spy($inview)" style="margin-top:-100px"></div>'
			)
			.then(function (test) {
				expect(test.spy.calls.count()).toBe(0);
			})
			.then(done);
		});

		it("should change inview status when scrolling out of view", function(done) {
			makeTestForHtml(
				'<div in-view="spy($inview)"></div>' +
				'<div style="height:200%"></div>'
			)
			.then(lazyScrollTo(100))
			.then(function (test) {
				expect(test.spy.calls.count()).toBe(2);
				expect(test.spy).toHaveBeenCalledWith(true);
				expect(test.spy).toHaveBeenCalledWith(false);
			})
			.then(done);
		});

		describe("informations object", function() {

			it("should return an info object with relative informations", function(done) {
				makeTestForHtml(
					'<div in-view="spy($inviewInfo)" in-view-options="{ generateParts: true }"></div>'
				)
				.then(function (test) {
					expect(test.spy.calls.count()).toBe(1);
					var info = test.spy.calls.mostRecent().args[0];
					expect(info.inView).toEqual(true);
					expect(info.parts).toEqual({
						top: true,
						left: true,
						bottom: true,
						right: true
					});
				})
				.then(done);
			});

			it("should return proper `parts` informations", function(done) {
				makeTestForHtml(
					'<div in-view="spy($inviewInfo)"  in-view-options="{ generateParts: true }" style="width: 200px; height: 200px;"></div>' +
					'<div style="width:200%; height:200%"></div>'
				)
				.then(function (test) {
					expect(test.spy.calls.count()).toBe(1);
					var info = test.spy.calls.argsFor(0)[0];
					expect(info.parts).toEqual({
						top: true,
						left: true,
						bottom: true,
						right: true
					});
					return test;
				})
				.then(lazyScrollTo([400, 400]))
				.then(function (test) {
					var info = test.spy.calls.argsFor(1)[0];
					expect(test.spy.calls.count()).toBe(2);
					expect(info.parts).toEqual(undefined);
					return test;
				})
				.then(lazyScrollTo([100, 100]))
				.then(function (test) {
					var info = test.spy.calls.argsFor(2)[0];
					expect(test.spy.calls.count()).toBe(3);
					expect(info.parts).toEqual({
						top: false,
						left: false,
						bottom: true,
						right: true
					});
					return test;
				})
				.then(lazyScrollTo([0, 0]))
				.then(function (test) {
					var info = test.spy.calls.argsFor(3)[0];
					expect(test.spy.calls.count()).toBe(4);
					expect(info.parts).toEqual({
						top: true,
						left: true,
						bottom: true,
						right: true
					});
				})
				.then(done);
			});

			it("should return proper `direction` informations", function(done) {
				makeTestForHtml(
					'<div in-view="spy($inviewInfo)"  in-view-options="{ generateDirection: true }" style="width: 200px; height: 200px;"></div>' +
					'<div style="width:200%; height:200%"></div>'
				)
				.then(function (test) {
					var info = test.spy.calls.argsFor(0)[0];
					expect(info.direction).toEqual(undefined);
					return test;
				})
				.then(lazyScrollTo([100, 100]))
				.then(function (test) {
					var info = test.spy.calls.argsFor(1)[0];
					expect(info.direction).toEqual({
						horizontal: -100,
						vertical: -100
					});
					return test;
				})
				.then(lazyScrollTo([50, 50]))
				.then(function (test) {
					var info = test.spy.calls.argsFor(2)[0];
					expect(info.direction).toEqual({
						horizontal: 50,
						vertical: 50
					});
				})
				.then(done);
			});

		});

		describe("offset options", function() {

			it("should consider element offset option", function(done) {
				makeTestForHtml(
					'<div in-view="spy($inviewInfo)" in-view-options="{ offset:[100, 0], generateParts: true }"></div>' +
					'<div style="height:200%"></div>'
				)
				.then(function (test) {
					var info = test.spy.calls.argsFor(0)[0];
					expect(info.inView).toEqual(true);
					expect(info.parts).toEqual({
						top: false,
						left: true,
						bottom: true,
						right: true
					});
					return test;
				})
				.then(done);
			});

			it("should consider negative offsets", function(done) {
				makeTestForHtml(
					'<div in-view="spy($inviewInfo)" style="height:200px" in-view-options="{ offset:[-50, 0], generateParts: true }"></div>' +
					'<div style="height:200%"></div>'
				)
				.then(function (test) {
					var info = test.spy.calls.argsFor(0)[0];
					expect(info.parts).toEqual({
						top: true,
						left: true,
						bottom: true,
						right: true
					});
					return test;
				})
				.then(lazyScrollTo(100))
				.then(function (test) {
					var info = test.spy.calls.argsFor(1)[0];
					expect(info.parts).toEqual({
						top: false,
						left: true,
						bottom: true,
						right: true
					});
					return test;
				})
				.then(lazyScrollTo(50))
				.then(function (test) {
					var info = test.spy.calls.argsFor(2)[0];
					expect(info.parts).toEqual({
						top: true,
						left: true,
						bottom: true,
						right: true
					});
					return test;
				})
				.then(done);
			});

			it("should consider viewport offset options", function(done) {
				makeTestForHtml(
					'<div in-view="spy($inviewInfo)" style="height:200px" in-view-options="{ viewportOffset:[100, 0], generateParts: true }"></div>' +
					'<div style="height:200%"></div>'
				)
				.then(function (test) {
					var info = test.spy.calls.argsFor(0)[0];
					expect(info.parts).toEqual({
						top: true,
						left: true,
						bottom: true,
						right: true
					});
					return test;
				})
				.then(lazyScrollTo(200))
				.then(function (test) {
					var info = test.spy.calls.argsFor(1)[0];
					expect(info.parts).toEqual({
						top: false,
						left: true,
						bottom: true,
						right: true
					});
					return test;
				})
				.then(done);
			});

		});

		it("should accept a `throttle` option", function(done) {
			makeTestForHtml(
				'<div in-view="spy($inview)"  in-view-options="{ throttle: 200 }"></div>' +
				'<div style="height:200%"></div>'
			)
			.then(function (test) {
				expect(test.spy.calls.count()).toBe(0);
				return test;
			})
			.then(lazyWait(200))
			.then(function (test) {
				expect(test.spy.calls.count()).toBe(1);
				expect(test.spy).toHaveBeenCalledWith(true);
				return test;
			})
			.then(done);
		});

	});

	describe("in-view-container directive", function() {

		it("should trigger in-view when scrolling a container", function(done) {
			makeTestForHtml(
				'<div in-view-container style="height:100px; overflow:scroll">' +
				'  <div in-view="spy($inview)"></div>' +
				'  <div style="height:200%"></div>' +
				'</div>'
			)
			.then(function (test) {
				expect(test.spy.calls.count()).toBe(1);
				expect(test.spy).toHaveBeenCalledWith(true);
				return test;
			})
			.then(lazyScrollTestElementTo(100))
			.then(function (test) {
				expect(test.spy.calls.count()).toBe(2);
				expect(test.spy).toHaveBeenCalledWith(false);
			})
			.then(done);
		});

	});

	// A test object has the properties:
	//
	//  - `element`: An angular element inserted in the test page
	//  - `scope`: a new isolated scope that can be referenced in the element
	//  - `spy`: a conveninence jasmine spy attached to the scope as `spy`
	function makeTestForHtml(html) {
		var test = {};
		// Prepare test elements
		window.document.body.style.height = '100%';
		window.document.body.parentElement.style.height = '100%';
		test.element = angular.element(html);
		angular.element(window.document.body).empty().append(test.element);
		// Prepare test scope
		test.scope = $rootScope.$new(true);
		test.spy = test.scope.spy = jasmine.createSpy('spy');
		// Compile the element
		$compile(test.element)(test.scope);
		test.scope.$digest();
		return scrollTo(window, [0, 0], true).then(function () {
			return test;
		});
	}

	// Scrolls the element to the given x, y position and waits a bit before
	// resolving the returned promise.
	function scrollTo(element, position, useTimeout) {
		if (!angular.isDefined(position)) {
			position = element;
			element = window;
		}
		if (!angular.isArray(position)) {
			position = [0, position];
		}
		// Prepare promise resolution
		var deferred = $q.defer(), timeout;
		var scrollOnceHandler = function () {
			var check = (element === window) ?
				[element.scrollX, element.scrollY] :
				[element.scrollLeft, element.scrollTop];
			if (check[0] != position[0] || check[1] != position[1]) {
				return;
			}
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
			angular.element(element).off('scroll', scrollOnceHandler);
			deferred.resolve();
			$rootScope.$digest();
		};
		angular.element(element).on('scroll', scrollOnceHandler);
		// Actual scrolling
		if (element === window) {
			element.scrollTo.apply(element, position);
		}
		else {
			element.scrollLeft = position[0];
			element.scrollTop = position[1];
		}
		// Backup resolver
		if (useTimeout) timeout = setTimeout(function () {
			angular.element(element).off('scroll', scrollOnceHandler);
			var check = (element === window) ?
				[element.scrollX, element.scrollY] :
				[element.scrollLeft, element.scrollTop];
			if (check[0] != position[0] || check[1] != position[1]) {
				deferred.reject();
			}
			else {
				deferred.resolve();
			}
			$rootScope.$digest();
		}, 100);
		return deferred.promise;
	}

	function lazyScrollTo () {
		var args = arguments;
		return function (x) {
			return scrollTo.apply(null, args).then(function () {
				return x;
			});
		}
	}

	function lazyScrollTestElementTo (pos) {
		return function (test) {
			return scrollTo(test.element[0], pos, true).then(function () {
				return test;
			});
		}
	}

	function lazyWait (millisec) {
		return function (x) {
			return $q(function (resolve) {
				setTimeout(function () {
					resolve(x);
					$rootScope.$digest();
				}, millisec);
			});
		}
	}

});
