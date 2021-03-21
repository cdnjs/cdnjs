define([
	'intern!object',
	'intern/chai!assert',
	'../../../Deferred'
], function (registerSuite, assert, Deferred) {
	// NOTE: At the time of this writing, Dojo promises can call resolve and reject handlers
	// on the same turn `then` is called, but these tests are written as if the handlers
	// are always called on the next turn so that they will not break if Dojo promises are made Promises/A+ compliant.
	// Any tests added to this suite should be written in this way.

	registerSuite({
		name: 'dojo/promise/Promise',

		'.always will be invoked for resolution and rejection': function () {
			var deferredToResolve = new Deferred();
			var expectedResolvedResult = {};
			var resolvedResult;
			var resolvedAlwaysResult;
			var deferredToReject = new Deferred();
			var expectedRejectedResult = {};
			var rejectedResult;
			var dfd = this.async();

			deferredToResolve.promise.then(function (result) {
				resolvedResult = result;
			});

			deferredToResolve.promise.always(function (result) {
				resolvedAlwaysResult = result;

				// Nest the rejected tests here to avoid chaining the promises under test
				deferredToReject.promise.then(null, function (result) {
					rejectedResult = result;
				});

				// Use this.async so we don't rely on the promise implementation under test
				deferredToReject.promise.always(dfd.callback(function (rejectedAlwaysResult) {
					assert.strictEqual(resolvedResult, expectedResolvedResult);
					assert.strictEqual(resolvedAlwaysResult, resolvedResult);
					assert.strictEqual(rejectedResult, expectedRejectedResult);
					assert.strictEqual(rejectedAlwaysResult, rejectedResult);
				}));

				deferredToReject.reject(expectedRejectedResult);
			});

			deferredToResolve.resolve(expectedResolvedResult);
		},

		'.otherwise() is equivalent to .then(null, ...)': function () {
			var deferred = new Deferred();
			var expectedResult = {};
			var rejectedResult;

			deferred.promise.then(null, function (result) {
				rejectedResult = result;
			});

			// Use this.async so we don't rely on the promise implementation under test
			deferred.promise.otherwise(this.async().callback(function (otherwiseResult) {
				assert.strictEqual(rejectedResult, expectedResult);
				assert.strictEqual(otherwiseResult, rejectedResult);
			}));

			deferred.reject(expectedResult);
		},

		'.trace() returns the same promise': function () {
			var deferred = new Deferred();
			var expectedPromise = deferred.promise;
			assert.strictEqual(expectedPromise.trace(), expectedPromise);
		},

		'.traceRejected() returns the same promise': function () {
			var deferred = new Deferred();
			var expectedPromise = deferred.promise;
			assert.strictEqual(expectedPromise.traceRejected(), expectedPromise);
		},

		'finally() called when deferred already resolved': function () {
			var deferred = new Deferred();
			var thenExpected = {};
			var finallyExpected = undefined;
			
			deferred.resolve(thenExpected);

			return deferred.promise["finally"](function (finallyResult) {
				assert.equal(finallyResult, finallyExpected);
				return "blah";
			}).then(function (thenResult) {
				assert.equal(thenResult, thenExpected);
			})["catch"](function () {
				assert.fail("Promise should not have rejected.");
			});
		},

		'finally() called when deferred is resolved later': function () {
			var deferred = new Deferred();
			var thenExpected = {};
			var finallyExpected = undefined;

			setTimeout(function () {
				deferred.resolve(thenExpected);
			},0);

			return deferred.promise["finally"](function (finallyResult) {
				assert.equal(finallyResult, finallyExpected);
				return "blahblah";
			}).then(function (thenResult) {
				assert.equal(thenResult, thenExpected);
			})["catch"](function () {
				assert.fail("Promise should not have rejected.");
			});
		},

		'finally() called when deferred already rejected': function () {
			var deferred = new Deferred();
			var expected = new Error();
			var finallyExpected = undefined;

			deferred.reject(expected);

			return deferred.promise["finally"](function (finallyResult) {
				assert.equal(finallyResult, finallyExpected);
			}).then(function () {
				assert.fail("Promise should not have resolved.");
			})["catch"](function (result) {
				assert.equal(result, expected);
			});
		},

		'finally() called when deferred is rejected later': function () {
			var deferred = new Deferred();
			var otherwiseExpected = new Error();
			var finallyExpected = undefined;

			setTimeout(function () {
				deferred.reject(otherwiseExpected);
			},0);

			return deferred.promise["finally"](function (finallyResult) {
				assert.equal(finallyResult, finallyExpected);
			}).then(function () {
				assert.fail("Promise should not have resolved.");
			})["catch"](function (otherwiseResult) {
				assert.equal(otherwiseResult, otherwiseExpected);
			});
		},

		'finally() holds up call chain when chaining from a resolved promise and returning a promise that will resolve': function () {
			var deferred = new Deferred();
			var testValue = 0;
			var expectedTestValue = 1;
			var thenExpected = {};
			
			deferred.resolve(thenExpected);

			var resultPromise = deferred.promise["finally"](function () {
				var dfd2 = new Deferred();

				setTimeout(function () {
					testValue = expectedTestValue;
					dfd2.resolve({});
				},0);

				return dfd2.promise;
			});

			//shouldn't be resolved until after the setTimeout fires.
			assert.equal(resultPromise.isResolved(), false);
			assert.equal(resultPromise.isFulfilled(), false);

			return resultPromise.then(function (thenResult) {
				assert.equal(testValue, expectedTestValue);
				assert.equal(thenResult, thenExpected);
			},function () {
				assert.fail("Promise should not have rejected");
			});
		},

		'finally() holds up call chain correctly when chaining from a rejected promise and returning a promise that will reject': function () {
			var deferred = new Deferred();
			var expectedError = new Error();

			deferred.reject();

			var resultPromise = deferred.promise["finally"](function () {
				var dfd2 = new Deferred();

				setTimeout(function () {
					dfd2.reject(expectedError);
				},0);

				return dfd2.promise;
			});

			assert.equal(resultPromise.isRejected(), false);
			assert.equal(resultPromise.isFulfilled(), false);

			return resultPromise.then(function () {
				assert.fail("Promise should not have resolved.");
			},function (resultError) {
				assert.equal(resultError, expectedError);
			});
		},

		'finally() returns rejected promise if callback throws exception': function () {
			var deferred = new Deferred();
			var expectedError = new Error();

			deferred.resolve();

			return deferred.promise["finally"](function () {
				throw expectedError;
			}).then(function () {
				assert.fail("Promise should not have resolved.");
			})["catch"](function (resultError) {
				assert.equal(resultError, expectedError);
			});
		},

		'finally() returns rejected promise if chained off resolved promise and callback returns rejected promise': function () {
			var deferred = new Deferred();
			var expectedError = new Error();

			deferred.resolve();

			return deferred.promise["finally"](function () {
				return new Deferred().reject(expectedError);
			}).then(function () {
				assert.fail("Promise should not have resolved");
			})["catch"](function (resultError) {
				assert.equal(resultError, expectedError);
			});
		},

		'finally() returns rejected promise if chained off rejected promise and callback returns rejected promise': function () {
			var deferred = new Deferred();
			var expectedError = new Error();

			deferred.reject(new Error() /* not the expected error */);

			return deferred.promise["finally"](function () {
				return new Deferred().reject(expectedError);
			}).then(function () {
				assert.fail("Promise should not have resolved");
			})["catch"](function (resultError) {
				assert.equal(resultError, expectedError);
			});
		}
	});
});
