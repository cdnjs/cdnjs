describe("Ext.event.Controller", function() {
    describe("members", function() {
        var controller, stack, fn, scope, options;

        beforeEach(function() {
            controller = new Ext.event.Controller(Ext.event.Dispatcher.getInstance());
            stack = new Ext.event.ListenerStack();
            controller.setListenerStacks([stack]);
            fn = function() {},
            scope = null,
            options = {};
        });

        describe("fire()", function() {
            it("should execute all listeners in the correct order", function() {
                var fn1Called, fn2Called,
                    i = 0,
                    fn1 = function() {
                        fn1Called = ++i;
                    },
                    fn2 = function() {
                        fn2Called = ++i;
                    };

                stack.add(fn1);
                stack.add(fn2);
                controller.fire();

                expect(fn1Called).toBe(1);
                expect(fn2Called).toBe(2);
            });

            it("should create a buffered callback if buffer option is provided", function() {
                var newFn = jasmine.createSpy();

                spyOn(Ext.Function, 'createBuffered').andReturn(newFn);

                stack.add(fn, scope, {
                    buffer: 500
                });
                controller.fire();

                expect(Ext.Function.createBuffered).toHaveBeenCalledWith(fn, 500, scope);

                expect(newFn).toHaveBeenCalled();
            });

            it("should create a delayed callback if delay option is provided", function() {
                var newFn = jasmine.createSpy();

                spyOn(Ext.Function, 'createDelayed').andReturn(newFn);

                stack.add(fn, scope, {
                    delay: 500
                });
                controller.fire();

                expect(Ext.Function.createDelayed).toHaveBeenCalledWith(fn, 500, scope);

                expect(newFn).toHaveBeenCalled();
            });

            it("should pass arguments to the listeners, last argument must always be the reference to the controller object", function() {
                var args1, args2,
                    lastArg1, lastArg2,
                    args = ['just', 'testing', 123, [], {}],
                    fn1 = function() {
                        args1 = Ext.Array.toArray(arguments);
                        lastArg1 = args1.pop();
                    },
                    fn2 = function() {
                        args2 = Ext.Array.toArray(arguments);
                        lastArg2 = args2.pop();
                    };

                stack.add(fn1, scope, options);
                stack.add(fn2, scope, options);
                controller.fire(args);

//                    args.push(controller);

                expect(args1).toEqual(args.concat([options]));
                expect(args2).toEqual(args.concat([options]));
                expect(lastArg1).toBe(controller);
                expect(lastArg2).toBe(controller);
            });

            describe("options.args", function() {
                it("should prepend the args option to the firing arguments", function() {
                    var fn = jasmine.createSpy(),
                        options =  {
                            args: [1,2,3]
                        };

                    stack.add(fn, {}, options);

                    controller.fire();

                    expect(fn).toHaveBeenCalledWith(1, 2, 3, options, controller);
                });
            });

            describe("pause(), resume() and stop()", function() {
                 it("should pause listeners invocation", function() {
                    runs(function() {
                        this.totalCalled = 0;

                        var me = this,
                            one = function() {
                                me.oneCalled = true;
                                me.totalCalled++;
                            },
                            two = function(options, e) {
                                me.twoCalled = true;
                                me.totalCalled++;
                                e.pause();
                                setTimeout(function() {
                                    e.resume();
                                }, 100);
                            },
                            three = function() {
                                me.totalCalled++;
                                me.threeCalled = true;
                            };

                        stack.add(one);
                        stack.add(two);
                        stack.add(three);

                        controller.fire();

                        expect(this.oneCalled).toBe(true);
                        expect(this.twoCalled).toBe(true);
                        expect(this.threeCalled).toBeFalsy();
                        expect(this.totalCalled).toBe(2);
                    });
                });

                it("should pause listeners invocation, then resume asynchronously", function() {
                    runs(function() {
                        this.totalCalled = 0;

                        var me = this,
                            one = function() {
                                me.oneCalled = true;
                                me.totalCalled++;
                            },
                            two = function(options, e) {
                                me.twoCalled = true;
                                me.totalCalled++;
                                e.pause();
                                setTimeout(function() {
                                    e.resume();
                                }, 100);
                            },
                            three = function() {
                                me.totalCalled++;
                                me.threeCalled = true;
                            };

                        stack.add(one);
                        stack.add(two);
                        stack.add(three);

                        controller.fire();

                        expect(this.oneCalled).toBe(true);
                        expect(this.twoCalled).toBe(true);
                        expect(this.threeCalled).toBeFalsy();
                        expect(this.totalCalled).toBe(2);
                    });

                    waitsFor(function() {
                        return this.threeCalled;
                    }, "Third function is never called", 300);

                    runs(function() {
                        expect(this.totalCalled).toBe(3)
                    });
                });

                it("should stop listeners invocation", function() {
                    this.totalCalled = 0;

                    var me = this,
                        one = function() {
                            me.oneCalled = true;
                            me.totalCalled++;
                        },
                        two = function(options, e) {
                            me.twoCalled = true;
                            me.totalCalled++;
                            e.stop();
                        },
                        three = function() {
                            me.totalCalled++;
                            me.threeCalled = true;
                        };

                    stack.add(one);
                    stack.add(two);
                    stack.add(three);

                    controller.fire();

                    expect(this.oneCalled).toBe(true);
                    expect(this.twoCalled).toBe(true);
                    expect(this.threeCalled).toBeFalsy();
                    expect(this.totalCalled).toBe(2);

                    controller.resume();

                    expect(this.totalCalled).toBe(2);
                });
            });
        });
    });
});
