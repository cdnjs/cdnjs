describe("Ext.Function", function() {
    
    var _setTimeout,
        _clearTimeout,
        timeouts,
        timeoutIds,
        clearedTimeoutIds,
        runAfterInvocation = function(spyedFunction, callback, invocationCount) {
            invocationCount = invocationCount || 1;
            waitsFor(function() { return spyedFunction.calls.length >= invocationCount; });
            runs(callback);
        },
        mockTimeout = function() {
            timeouts = [];
            timeoutIds = [];
            clearedTimeoutIds = [];
            
            _setTimeout = window.setTimeout;
            window.setTimeout = function(fn, timeout) {
                timeouts.push(timeout);
                var timeoutId = _setTimeout.apply(this, arguments);
                timeoutIds.push(timeoutId);
                return timeoutId;
            };
            
            _clearTimeout = window.clearTimeout;
            window.clearTimeout = function(timeoutId) {
                clearedTimeoutIds.push(timeoutId);
                _clearTimeout.apply(this, arguments);
            };
        },
        unmockTimeout = function() {
            timeouts = undefined;
            timeoutIds = undefined;
            clearedTimeoutIds = undefined;
            window.setTimeout = _setTimeout;
            window.clearTimeout = _clearTimeout;
        };

    
    describe("bind", function() {
        var fn,
            bind;

        beforeEach(function() {
            fn = jasmine.createSpy("bindSpy");
        });

        it("should return a function if a function is passed as first argument", function() {
            bind = Ext.Function.bind(fn, this);

            expect(typeof bind === "function").toBe(true);
        });

        it("should use the correct scope", function() {
            bind = Ext.Function.bind(fn, fakeScope);

            bind();

            expect(fn.calls[0].object).toBe(fakeScope);
        });

        it("should call the first function when it is executed", function() {
            bind = Ext.Function.bind(fn, this);

            bind();

            expect(fn).toHaveBeenCalled();
        });

        describe("argument passing", function() {

            it("should use default args if none are passed", function() {
                bind = Ext.Function.bind(fn, this, ['a', 'b']);

                bind();

                expect(fn).toHaveBeenCalledWith('a', 'b');
            });

            it("should use passed args if they are present", function() {
                bind = Ext.Function.bind(fn, this);

                bind('c', 'd');

                expect(fn).toHaveBeenCalledWith('c', 'd');
            });

            it("should append args", function() {
                bind = Ext.Function.bind(fn, this, ['a', 'b'], true);

                bind('c', 'd');

                expect(fn).toHaveBeenCalledWith('c', 'd', 'a', 'b');
            });

            it("should append args at the given index", function() {
                bind = Ext.Function.bind(fn, this, ['a', 'b'], 0);

                bind('c', 'd');

                expect(fn).toHaveBeenCalledWith('a', 'b', 'c', 'd');
            });
        });
    });
    
    describe("pass", function() {
        it("should pass the specified array of arguments as the first arguments to the given function", function() {
            var fn = jasmine.createSpy(),
                args = [0, 1, 2],
                callback = Ext.Function.pass(fn, args);
            callback(3, 4, 5);
            expect(fn).toHaveBeenCalledWith(0, 1, 2, 3, 4, 5);
        });
        it("should pass the specified string argument as the first argument to the given function", function() {
            var fn = jasmine.createSpy(),
                args = 'a',
                callback = Ext.Function.pass(fn, args);
            callback('b', 'c');
            expect(fn).toHaveBeenCalledWith('a', 'b', 'c');
        });
        it("should pass the specified numeric argument as the first argument to the given function", function() {
            var fn = jasmine.createSpy(),
                args = 0,
                callback = Ext.Function.pass(fn, args);
            callback(1);
            expect(fn).toHaveBeenCalledWith(0, 1);
        });
        it("should pass the specified 'arguments' argument as the first argument to the given funciton", function() {
            var testFunction = function () {
                    var fn = jasmine.createSpy(),
                        args = arguments,
                        callback = Ext.Function.pass(fn, args);
                    callback(3, 4, 5);
                    expect(fn).toHaveBeenCalledWith(0, 1, 2, 3, 4, 5);
                };
            testFunction(0, 1, 2);
        });
        it("should discard the argument if it's undefined", function() {
            var fn = jasmine.createSpy(),
                args = undefined,
                callback = Ext.Function.pass(fn, args);
                callback(1);
            expect(fn).toHaveBeenCalledWith(1);
        });
        it("should use 'this' as default scope", function() {
           var foo = 'a',
               fn = jasmine.createSpy().andCallFake(function() {
                   foo = this.foo;
               }),
               callback = Ext.Function.pass(fn, 'c');
           callback('d');
           expect(fn).toHaveBeenCalledWith('c', 'd');
           expect(foo).toBeUndefined();
        });
        it("should override 'this' with the specified scope", function() {
            var foo = 'a',
                scope = { foo: 'b' },
                fn = jasmine.createSpy().andCallFake(function() {
                    foo = this.foo;
                }),
                callback = Ext.Function.pass(fn, 'c', scope);
            callback('d');
            expect(fn).toHaveBeenCalledWith('c', 'd');
            expect(foo).toBe('b');
        });
    });
    
    describe("clone", function() {
        it("should clone the given function", function() {
            var fn = jasmine.createSpy().andCallFake(function(arg) { return 'bar'; }),
                clonedFn = Ext.Function.clone(fn),
                result = clonedFn('foo');
            expect(result).toBe('bar');
            expect(fn).toHaveBeenCalledWith('foo');
        });
    });

    describe("createInterceptor", function() {
        var interceptor,
            interceptorFn,
            interceptedFn,
            interceptorIsRunFirst,
            interceptedIsRunAfter;

        beforeEach(function() {
            interceptorIsRunFirst = false;
            interceptedIsRunAfter = false;

            interceptorFn = jasmine.createSpy("interceptorSpy").andCallFake(function() {
                interceptorIsRunFirst = true;
            });
            interceptedFn = jasmine.createSpy("interceptedSpy").andCallFake(function() {
                interceptedIsRunAfter = interceptorIsRunFirst;
            });
        });

        describe("if no function is passed", function() {
            it("should return the same function", function() {
                expect(Ext.Function.createInterceptor(interceptedFn)).toEqual(interceptedFn);
            });
        });

        describe("if a function is passed", function() {
            beforeEach(function() {
                interceptor = Ext.Function.createInterceptor(interceptedFn, interceptorFn, fakeScope);
                interceptor();
            });

            it("should return a new function", function() {
                expect(typeof interceptor === "function").toBe(true);
                expect(interceptor).not.toEqual(interceptedFn);
            });

            it("should set the correct scope for the interceptor function", function() {
                expect(interceptorFn.calls[0].object).toBe(fakeScope);
            });

            it("should call the interceptor function first", function() {
                expect(interceptedIsRunAfter).toBe(true);
            });

        });

        describe("if the interceptor function returns false", function() {
            it("should not execute the original function", function() {
                interceptor = Ext.Function.createInterceptor(interceptedFn, function() {
                    return false;
                });

                interceptor();
                expect(interceptedFn).not.toHaveBeenCalled();
            });
        });
        
        describe("returnValue", function(){
            beforeEach(function(){
                interceptedFn = function(){
                    return 'Original';
                };
                
                interceptorFn = function(){
                    return false;
                };
            });
            
            describe("when interceptorFn returns false", function() {
                it("should return null as a default", function(){
                    interceptor = Ext.Function.createInterceptor(interceptedFn, interceptorFn);
                    expect(interceptor()).toBeNull();
                });
            
                it("should accept a custom returnValue", function(){
                    interceptor = Ext.Function.createInterceptor(interceptedFn, interceptorFn, null, 'Custom');
                    expect(interceptor()).toBe('Custom');
                });
            
                it("should accept a falsy returnValue", function(){
                    interceptor = Ext.Function.createInterceptor(interceptedFn, interceptorFn, null, false);
                    expect(interceptor()).toBe(false);
                });
            });
            
            it("should return the value of the original function if false is not returned", function(){
                interceptorFn = function(){
                    return;
                };
                 interceptor = Ext.Function.createInterceptor(interceptedFn, interceptorFn);
                expect(interceptor()).toBe('Original');
            })
        });
    });
    
    describe("createDelayed", function() {
       (Ext.isIE8 ? xit : it)("should create bind to the given function to be called after x milliseconds", function() {
           mockTimeout();
           var fn = jasmine.createSpy(),
               delayedFn = Ext.Function.createDelayed(fn, 2);
           
           delayedFn('foo');
           expect(timeouts.shift()).toBe(2);
           
           expect(fn).not.toHaveBeenCalled();
           
           runAfterInvocation(fn, function() {
               expect(fn).toHaveBeenCalledWith('foo');
           });
           unmockTimeout();
       });
       it("should use the specified scope as 'this'", function() {
           var scope = { x: 'foo' },
               fn = jasmine.createSpy().andCallFake(function() { this.x = 'bar' }),
               delayedFn = Ext.Function.createDelayed(fn, 2, scope);
           delayedFn();
           expect(fn).not.toHaveBeenCalled();
           expect(scope.x).toBe('foo');
           
           runAfterInvocation(fn, function() {
               expect(scope.x).toBe('bar');
           });
       });
       it("should override the call arguments with the specified arguments", function() {
           var scope = {},
               args = [0, 1, 2],
               fn = jasmine.createSpy(),
               delayedFn = Ext.Function.createDelayed(fn, 2, scope, args);
           delayedFn(3, 4, 5);
           expect(fn).not.toHaveBeenCalled();
           runAfterInvocation(fn, function() {
               expect(fn).toHaveBeenCalledWith(0, 1, 2); 
           });
       });
       it("should append the specified arguments to the call arguments when appendArgs is true", function() {
           var scope = {},
               args = [0, 1, 2],
               fn = jasmine.createSpy(),
               delayedFn = Ext.Function.createDelayed(fn, 2, scope, args, true);
           delayedFn(3, 4, 5);
           expect(fn).not.toHaveBeenCalled();
           runAfterInvocation(fn, function() {
               expect(fn).toHaveBeenCalledWith(3, 4, 5, 0, 1, 2); 
           });
       });
       it("should insert the specified arguments into the call arguments at the position specified by appendArgs", function() {
           var scope = {},
           args = [0, 1, 2],
           fn = jasmine.createSpy(),
           delayedFn = Ext.Function.createDelayed(fn, 2, scope, args, 2);
           delayedFn(3, 4, 5);
           expect(fn).not.toHaveBeenCalled();
           runAfterInvocation(fn, function() {
               expect(fn).toHaveBeenCalledWith(3, 4, 0, 1, 2, 5); 
           });
       });
    });

    describe("defer", function() {
        var fn;

        beforeEach(function(){
            fn = jasmine.createSpy("deferSpy");
        });

        it("should execute the function after the specified number of milliseconds", function() {
            Ext.defer(fn, 10);

            waitsFor(function(){
                return fn.calls.length === 1;
            }, "fn was never called");

            runs(function() {
                expect(fn).toHaveBeenCalled();
            });
        });

        it("should execute the function directly if the specified number of milliseconds is <= 0", function() {
            Ext.defer(fn, 0);

            expect(fn).toHaveBeenCalled();
        });

        it("should set the correct scope", function() {
            Ext.defer(fn, 10, fakeScope);

            waitsFor(function(){
                return fn.calls.length === 1;
            }, "fn was never called");

            runs(function() {
                expect(fn.calls[0].object).toBe(fakeScope);
            });
        });

        it("should pass the correct arguments", function() {
            Ext.defer(fn, 10, this, [1, 2, 3]);

            waitsFor(function(){
                return fn.calls.length === 1;
            }, "fn was never called");

            runs(function() {
                expect(fn).toHaveBeenCalledWith(1,2,3);
            });
        });

        it("should return a timeout number", function() {
            expect(typeof Ext.defer(function() {}, 10) === 'number').toBe(true);
        });
    });

    describe("createSequence", function() {
        var sequence,
            newFn,
            origFn,
            origFnIsRunFirst,
            newFnIsRunAfter;

        beforeEach(function() {
            origFnIsRunFirst = false;
            newFnIsRunAfter = false;

            origFn = jasmine.createSpy("interceptedSpy").andCallFake(function() {
                origFnIsRunFirst = true;
            });

            newFn = jasmine.createSpy("sequenceSpy").andCallFake(function() {
                newFnIsRunAfter = origFnIsRunFirst;
            });
        });

        describe("if no function is passed", function() {
            it("should return the same function", function() {
                expect(Ext.Function.createSequence(origFn)).toEqual(origFn);
            });
        });

        describe("if a function is passed", function() {
            beforeEach(function() {
                sequence = Ext.Function.createSequence(origFn, newFn, fakeScope);
                sequence();
            });

            it("should return a new function", function() {
                expect(typeof sequence === "function").toBe(true);
                expect(sequence).not.toEqual(origFn);
            });

            it("should set the correct scope for the sequence function", function() {
                expect(newFn.calls[0].object).toBe(fakeScope);
            });

            it("should call the sequence function first", function() {
                expect(newFnIsRunAfter).toBe(true);
            });

        });
    });
    
    describe("createBuffered", function() {
        (Ext.isIE8 ? xit : it)("should prevent the execution of multiple calls of the buffered function within the timeout period", function() {
            mockTimeout();
            var fn = jasmine.createSpy(),
                bufferedFn = Ext.Function.createBuffered(fn, 2);
           
            bufferedFn();
            expect(timeouts.shift()).toBe(2);
           
            bufferedFn();
            expect(clearedTimeoutIds.shift()).toBe(timeoutIds.shift());
            expect(timeouts.shift()).toBe(2);
           
            expect(fn).not.toHaveBeenCalled();
            runAfterInvocation(fn, function() {
                expect(fn.calls.length).toBe(1);
            });
            
            unmockTimeout();
        });
        it("should use the specified scope as 'this'", function() {
            var scope = { x: 1 },
                fn = jasmine.createSpy().andCallFake(function() { this.x++; }),
                bufferedFn = Ext.Function.createBuffered(fn, 20, scope);
            bufferedFn();
            expect(scope.x).toBe(1);
            bufferedFn();
            runAfterInvocation(fn, function() {
                expect(scope.x).toBe(2);
            });
        });
        it("should override the call arguments with the specified ones", function() {
            var scope = {},
                args = ['bar1', 'bar2'],
                fn = jasmine.createSpy(),
                bufferedFn = Ext.Function.createBuffered(fn, 20, scope, args);
            bufferedFn('foo1', 'foo2');
            expect(fn).not.toHaveBeenCalled();
            runAfterInvocation(fn, function() {
                expect(fn).toHaveBeenCalledWith('bar1', 'bar2');
            });
        });
    });
    
    (Ext.isIE8 ? xdescribe : xdescribe)("createThrottled", function() {
        it("should execute only once per each specified time interval", function() {
            mockTimeout();
            var fn = jasmine.createSpy(),
                throttledFn = Ext.Function.createThrottled(fn, 10);
           
            expect(fn).not.toHaveBeenCalled();
            throttledFn();
            expect(clearedTimeoutIds.shift()).toBeUndefined();
            expect(fn.calls.length).toBe(1);
            
            throttledFn();
            expect(timeouts.shift()).not.toBeGreaterThan(10);
            expect(clearedTimeoutIds.shift()).toBeUndefined();
            throttledFn();
            expect(timeouts.shift()).not.toBeGreaterThan(10);
            expect(clearedTimeoutIds.shift()).toBe(timeoutIds.shift());
            throttledFn();
            expect(timeouts.shift()).not.toBeGreaterThan(10);
            expect(clearedTimeoutIds.shift()).toBe(timeoutIds.shift());
            
            expect(fn.calls.length).toBe(1);
            runAfterInvocation(fn, function() {
                expect(fn.calls.length).toEqual(2);
                throttledFn(); // elapsed may have been exceeded here, so this call may execute immediately
                expect(fn.calls.length).not.toBeLessThan(2);
                expect(fn.calls.length).not.toBeGreaterThan(3);
            }, 2);
            unmockTimeout();
        });
        
        it("should use the specified scope as 'this'", function() {
            var scope = {},
                fn = jasmine.createSpy().andCallFake(function(value) { this.x = value; }),
                throttledFn = Ext.Function.createThrottled(fn, 10, scope);
            
            throttledFn('foo');
            throttledFn('bar');
            throttledFn('baz');
            throttledFn('qux');
            
            expect(fn).toHaveBeenCalledWith('foo');
            expect(scope.x).toBe('foo');
            expect(fn.calls.length).toBe(1);
        });
    });
    
    describe("interceptAfter", function() {
        it("should execute interceptor after each method call", function() {
            var monologue = {
                    phrases: [],
                    addPhrase: function(phrase) {
                        this.phrases.push(phrase)
                    }
                },
                addMeToo = jasmine.createSpy().andCallFake(function(phrase) {
                    this.phrases.push(phrase + ' too');
                });
                
            Ext.Function.interceptAfter(monologue, 'addPhrase', addMeToo);
            monologue.addPhrase('I like you');
            monologue.addPhrase('I love you');
            expect(monologue.phrases).toEqual(['I like you', 'I like you too', 'I love you', 'I love you too']);
            expect(addMeToo).toHaveBeenCalledWith('I like you');
            expect(addMeToo).toHaveBeenCalledWith('I love you');
        });
        
        it("should execute interceptor after each method call with the specified scope as 'this'", function() {
            var monologue = {
                    phrases: [],
                    addPhrase: function(phrase) {
                        this.phrases.push(phrase)
                    }
                },
                transcription = {
                    phrases: []
                },
                transcriptPhrase = jasmine.createSpy().andCallFake(function(phrase) {
                    this.phrases.push("He said: " + phrase);
                });
            
            Ext.Function.interceptAfter(monologue, 'addPhrase', transcriptPhrase, transcription);
            monologue.addPhrase('I like you');
            monologue.addPhrase('I love you');
            expect(monologue.phrases).toEqual(['I like you', 'I love you']);
            expect(transcription.phrases).toEqual(['He said: I like you', 'He said: I love you']);
            expect(transcriptPhrase).toHaveBeenCalledWith('I like you');
            expect(transcriptPhrase).toHaveBeenCalledWith('I love you');
        });
    });
});
