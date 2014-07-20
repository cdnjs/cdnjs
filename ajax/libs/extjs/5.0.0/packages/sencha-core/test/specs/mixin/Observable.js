describe("Ext.mixin.Observable", function() {
    describe("unit tests", function() {
        var dispatcher, foo, bar, baz, fooId, barId, fn, scope, options, order;

        var Foo = Ext.define(null, {
            extend: 'Ext.mixin.Observable',

            observableType: 'foo',

            getEventDispatcher: function() {
                return dispatcher;
            }
        });

        var Bar = Ext.define(null, {
            extend: 'Ext.mixin.Observable',

            observableType: 'bar',

            getEventDispatcher: function() {
                return dispatcher;
            }
        });

        var Baz = Ext.define(null, {
            extend: 'Ext.mixin.Observable',

            observableType: 'bar',

            getEventDispatcher: function() {
                return dispatcher;
            }
        });

        beforeEach(function() {
            dispatcher = new Ext.event.Dispatcher();
            foo = new Foo();
            bar = new Bar();
            baz = new Baz();
            fooId = foo.getObservableId();
            barId = bar.getObservableId();
            fn = function(){};
            scope = {};
            options = {};
            order = undefined;
        });

        afterEach(function() {
            foo.destroy();
            bar.destroy();
            baz.destroy();
        });

        describe("getObservableId()", function() {
            it("should return the correct value", function() {
                expect(foo.getObservableId()).toEqual('#' + foo.getId());
            });
        });

        describe("doAddListener()", function() {
            it("should invoke dispatcher's addListener", function() {
                spyOn(dispatcher, 'addListener');

                foo.doAddListener('bar', fn, scope, options, order);

                expect(dispatcher.addListener).toHaveBeenCalledWith('foo', fooId, 'bar', fn, scope, options, order, foo);
            });

            it("should invoke dispatcher's addListener with scope 'this' if not given", function() {
                spyOn(dispatcher, 'addListener');

                foo.doAddListener('bar', fn, null, options, order);

                expect(dispatcher.addListener).toHaveBeenCalledWith('foo', fooId, 'bar', fn, foo, options, order, foo);
            });
        });

        describe("doRemoveListener()", function() {
            it("should invoke dispatcher's removeListener", function() {
                spyOn(dispatcher, 'removeListener');

                foo.doRemoveListener('bar', fn, scope, options, order);

                expect(dispatcher.removeListener).toHaveBeenCalledWith('foo', fooId, 'bar', fn, scope, options, order, foo);
            });

            it("should invoke dispatcher's removeListener with scope 'this' if not specified", function() {
                spyOn(dispatcher, 'removeListener');

                foo.doRemoveListener('bar', fn, null, options, order);

                expect(dispatcher.removeListener).toHaveBeenCalledWith('foo', fooId, 'bar', fn, foo, options, order, foo);
            });
        });

        describe("addListener()", function() {
            it("should invoke doAddListener", function() {
                spyOn(foo, 'doAddListener');

                foo.addListener('bar', fn, scope, options, order);

                expect(foo.doAddListener).toHaveBeenCalledWith('bar', fn, scope, options, order);
            });

            it("should invoke doAddListener() multiple times for multiple listeners", function() {
                var one = jasmine.createSpy(),
                    two = jasmine.createSpy(),
                    scope = {};

                spyOn(foo, 'doAddListener');

                foo.addListener({
                    one: one,
                    two: two,
                    scope: scope,
                    single: true
                });

                var expectedOptions = {
                    single: true
                };

                expect(foo.doAddListener.callCount).toBe(2);
                expect(foo.doAddListener.argsForCall[0]).toEqual(['one', one, scope, expectedOptions, order]);
                expect(foo.doAddListener.argsForCall[1]).toEqual(['two', two, scope, expectedOptions, order]);
            });

            it("should allow different scopes for different listeners", function() {
                var one = jasmine.createSpy(),
                    two = jasmine.createSpy(),
                    scope1 = {},
                    scope2 = {},
                    listener1 = {
                        fn: one,
                        scope: scope1,
                        single: true
                    },
                    listener2 = {
                        fn: two,
                        scope: scope2,
                        delay: 100
                    };

                spyOn(foo, 'doAddListener');

                foo.addListener({
                    one: listener1,
                    two: listener2
                });

                expect(foo.doAddListener.callCount).toBe(2);
                expect(foo.doAddListener.argsForCall[0]).toEqual(['one', one, scope1, listener1, order]);
                expect(foo.doAddListener.argsForCall[1]).toEqual(['two', two, scope2, listener2, order]);
            });

        });

        describe("removeListener()", function() {
            it("should invoke doRemoveListener", function() {
                spyOn(foo, 'doRemoveListener');

                foo.removeListener('bar', fn, scope, options, order);

                expect(foo.doRemoveListener).toHaveBeenCalledWith('bar', fn, scope, options, order);
            });

            it("should invoke doRemoveListener() multiple times for multiple listeners", function() {
                var one = jasmine.createSpy(),
                    two = jasmine.createSpy(),
                    scope = {};

                spyOn(foo, 'doRemoveListener');

                foo.removeListener({
                    one: one,
                    two: two,
                    scope: scope
                });

                expect(foo.doRemoveListener.callCount).toBe(2);
                expect(foo.doRemoveListener.argsForCall[0]).toEqual(['one', one, scope, options, order]);
                expect(foo.doRemoveListener.argsForCall[1]).toEqual(['two', two, scope, options, order]);
            });
        });

        describe("fireEvent()", function() {
            it("should invoke dispatcher's dispatchEvent", function() {
                var args = ['testeventname', 'foo', 'bar'];

                spyOn(dispatcher, 'dispatchEvent');

                foo.fireEvent.apply(foo, args);

                expect(dispatcher.dispatchEvent).toHaveBeenCalledWith('foo', fooId, 'testeventname', ['foo', 'bar'], undefined, undefined);
            });
        });

        describe("clearListeners()", function() {
            it("should invoke dispatcher's clearListeners()", function() {
                spyOn(dispatcher, 'clearListeners');

                foo.on('foo', fn);
                foo.clearListeners();

                expect(dispatcher.clearListeners).toHaveBeenCalledWith('foo', fooId, foo);
            });
        });

        describe("relayEvents", function() {
            it("should support string format", function() {
                var spy = spyOn(foo, 'doFireEvent');

                foo.relayEvents(bar, 'bar', 'foo');

                bar.fireEvent('bar');

                expect(spy).toHaveBeenCalled();
                expect(spy.callCount).toBe(1);
                expect(spy.calls[0].args[0]).toEqual('foobar');
                expect(spy.calls[0].object).toBe(foo);
            });

            it("should support array format", function() {
                var spy = spyOn(foo, 'doFireEvent');

                foo.relayEvents(bar, ['bar', 'baz'], 'foo');

                bar.fireEvent('bar');
                bar.fireEvent('baz');

                expect(spy).toHaveBeenCalled();
                expect(spy.callCount).toBe(2);
                expect(spy.calls[0].args[0]).toEqual('foobar');
                expect(spy.calls[0].object).toBe(foo);
                expect(spy.calls[1].args[0]).toEqual('foobaz');
                expect(spy.calls[1].object).toBe(foo);
            });

            it("should support object format", function() {
                var spy = spyOn(foo, 'doFireEvent');

                foo.relayEvents(bar, {
                    bar: 'newbar',
                    baz: 'newbaz'
                }, 'foo');

                bar.fireEvent('bar');

                bar.fireEvent('baz');

                expect(spy).toHaveBeenCalled();
                expect(spy.callCount).toBe(2);
                expect(spy.calls[0].args[0]).toEqual('foonewbar');
                expect(spy.calls[0].object).toBe(foo);
                expect(spy.calls[1].args[0]).toEqual('foonewbaz');
                expect(spy.calls[1].object).toBe(foo);
            });
        });

        describe("suspend/resume events", function () {
            var employee,
                employeeFiredFn,
                employeeQuitFn,
                employeeAskFn,
                employeeFiredListener,
                employeeQuitListener,
                employeeAskListener,
                employeeListeners;

            function generateFireEventTraffic() {
                employee.fireEvent("fired", "I'm fired :s (1)");
                employee.fireEvent("fired", "I'm fired :s (2)");
                employee.fireEvent("quit", "I'm quitting my job :) (1)");
                employee.fireEvent("quit", "I'm quitting my job :) (2)");
            };

            beforeEach(function() {
                employeeFiredFn = jasmine.createSpy("employeeFiredFn");
                employeeQuitFn = jasmine.createSpy("employeeQuitFn");
                employeeAskFn = jasmine.createSpy("employeeAskFn");

                employeeFiredListener = {
                    fn    : employeeFiredFn,
                    scope : fakeScope
                };
                employeeQuitListener = {
                    fn    : employeeQuitFn,
                    scope : fakeScope
                };
                employeeAskListener = {
                    fn    : employeeAskFn,
                    scope : fakeScope
                };
                employeeListeners = {
                    ask_salary_augmentation : employeeAskListener,
                    fired                   : employeeFiredListener,
                    quit                    : employeeQuitListener
                };

                employee = new Ext.mixin.Observable({
                    listeners : employeeListeners
                });
            });

            afterEach(function() {
                employee.destroy();
                employee = null;
            });

            describe("suspended events to be fired after resumeEvents", function() {
                beforeEach(function () {
                    employee.suspendEvents(true);
                    generateFireEventTraffic();
                });

                describe("when suspended", function () {
                    it("should not call fired event handler", function () {
                        expect(employeeFiredFn).not.toHaveBeenCalled();
                    });

                    it("should not call quit event handler", function () {
                        expect(employeeQuitFn).not.toHaveBeenCalled();
                    });
                });

                describe("on resume", function () {
                    describe("without discarding", function() {
                        beforeEach(function() {
                            employee.resumeEvents();
                        });

                        it("should call fired event handler two times", function() {
                            expect(employeeFiredFn.callCount).toEqual(2);
                        });

                        it("should call quit event handler two times", function() {
                            expect(employeeQuitFn.callCount).toEqual(2);
                        });
                    });

                    describe("with discarding", function() {
                        beforeEach(function() {
                            employee.resumeEvents(true);
                        });

                        it("should not call fired event handler", function() {
                            expect(employeeFiredFn).not.toHaveBeenCalled();
                        });

                        it("should call quit event handler two times", function() {
                            expect(employeeQuitFn).not.toHaveBeenCalled();
                        });
                    });
                });
            });

            describe("discard suspended events", function () {
                beforeEach(function () {
                    employee.suspendEvents();
                    generateFireEventTraffic();
                });

                describe("when suspended", function () {
                    it("should not call fired event handler", function () {
                        expect(employeeFiredFn).not.toHaveBeenCalled();
                    });

                    it("should not call quit event handler", function () {
                        expect(employeeQuitFn).not.toHaveBeenCalled();
                    });
                });

                describe("on resume", function () {
                    beforeEach(function () {
                        //will discard the event queue
                        employee.resumeEvents(true);
                    });

                    it("should not call fired event handler", function () {
                        expect(employeeFiredFn).not.toHaveBeenCalled();
                    });

                    it("should not call quit event handler", function () {
                        expect(employeeQuitFn).not.toHaveBeenCalled();
                    });
                });
            });

            describe("multiple suspend/resume", function(){
                it("should not fire events if there are more suspend than resume calls", function(){
                    employee.suspendEvents();
                    employee.suspendEvents();
                    employee.resumeEvents();
                    generateFireEventTraffic();
                    expect(employeeFiredFn).not.toHaveBeenCalled();
                    expect(employeeQuitFn).not.toHaveBeenCalled();
                });

                it("should fire events if the suspend/resume calls match", function(){
                    employee.suspendEvents();
                    employee.suspendEvents();
                    employee.suspendEvents();
                    employee.resumeEvents();
                    employee.resumeEvents();
                    employee.resumeEvents();
                    generateFireEventTraffic();
                    expect(employeeFiredFn).toHaveBeenCalled();
                    expect(employeeQuitFn).toHaveBeenCalled();
                });

                it("should ignore extra resumeEvents calls", function(){
                    employee.suspendEvents();
                    employee.resumeEvents();
                    employee.resumeEvents();
                    employee.resumeEvents();
                    generateFireEventTraffic();
                    expect(employeeFiredFn).toHaveBeenCalled();
                    expect(employeeQuitFn).toHaveBeenCalled();
                });
            });

            describe("specific events", function() {
                it("should be able to suspend a specific event", function() {
                    employee.suspendEvent('fired');
                    generateFireEventTraffic();
                    expect(employeeFiredFn).not.toHaveBeenCalled();
                });

                it("should be able to suspend a specific event before anything is bound", function() {
                    var o = new Ext.util.Observable(),
                        called = false;

                    o.suspendEvent('foo');
                    o.on('foo', function() {
                        called = true;
                    });
                    o.fireEvent('foo', o);
                    expect(called).toBe(false);
                });

                it("should begin firing events after resuming a specific event", function() {
                    employee.suspendEvent('fired');
                    generateFireEventTraffic();
                    employee.resumeEvent('fired');
                    generateFireEventTraffic();
                    expect(employeeFiredFn.callCount).toBe(2);
                });

                it("should not resume firing if suspend is called more than resume", function() {
                    employee.suspendEvent('fired');
                    employee.suspendEvent('fired');
                    employee.resumeEvent('fired');
                    generateFireEventTraffic();
                    expect(employeeFiredFn).not.toHaveBeenCalled();
                });
            });

            describe("isSuspended", function() {
                describe("all events", function() {
                    it("should return false if all events aren't suspended", function() {
                        expect(employee.isSuspended()).toBe(false);
                    });

                    it("should return false after suspending and then resuming all events", function() {
                        employee.suspendEvents();
                        employee.resumeEvents();
                        expect(employee.isSuspended()).toBe(false);
                    });

                    it("should return true when events are globally suspended", function() {
                        employee.suspendEvents();
                        expect(employee.isSuspended()).toBe(true);
                    });
                });

                describe("specific event", function() {
                    it("should return false if the specific event is not suspended", function() {
                        expect(employee.isSuspended('fired')).toBe(false);
                    });

                    it("should return false if the specific event is suspended then resumed", function() {
                        employee.suspendEvent('fired');
                        employee.resumeEvent('fired');
                        expect(employee.isSuspended('fired')).toBe(false);
                    });

                    it("should return true if a specific event is suspended", function() {
                        employee.suspendEvent('fired');
                        expect(employee.isSuspended('fired')).toBe(true);
                    });

                    it("should return true if all events are suspended and the specific event is not", function() {
                        employee.suspendEvents();
                        expect(employee.isSuspended('fired')).toBe(true);
                    });
                });
            });
        });

        describe("enableBubble()", function() {
            it("should bubble the event from foo -> bar -> baz", function() {
                var barSpy = jasmine.createSpy(),
                    bazSpy = jasmine.createSpy();

                spyOn(foo, 'getBubbleTarget').andReturn(bar);
                spyOn(bar, 'getBubbleTarget').andReturn(baz);

                foo.enableBubble('foo');
                bar.addListener('foo', barSpy);
                baz.addListener('foo', bazSpy);

                foo.fireEvent('foo', 'test');

                expect(barSpy).toHaveBeenCalled();
                expect(barSpy.callCount).toBe(1);
                expect(barSpy.mostRecentCall.args[0]).toBe('test');

                expect(bazSpy).toHaveBeenCalled();
                expect(bazSpy.callCount).toBe(1);
                expect(bazSpy.mostRecentCall.args[0]).toBe('test');
            });

            it("should make it possible to pause / resume / stop event bubbling", function() {
                runs(function(){
                    var me = this;

                    this.one = jasmine.createSpy().andCallFake(function() {
                        var controller = arguments[arguments.length - 1];
                        controller.pause();

                        setTimeout(function() {
                            controller.resume();
                        }, 50);
                    });

                    this.resumed = false;

                    this.two = jasmine.createSpy().andCallFake(function() {
                        me.resumed = true;

                        var controller = arguments[arguments.length - 1];
                        controller.stop();
                    });

                    this.three = jasmine.createSpy();

                    spyOn(foo, 'getBubbleTarget').andReturn(bar);
                    spyOn(bar, 'getBubbleTarget').andReturn(baz);

                    foo.enableBubble('foo');
                    bar.addListener('foo', this.one);
                    bar.addListener('foo', this.two);
                    baz.addListener('foo', this.three);

                    foo.fireEvent('foo', 'test');

                    expect(this.one).toHaveBeenCalled();
                    expect(this.two).not.toHaveBeenCalled();
                    expect(this.three).not.toHaveBeenCalled();
                });

                runs(function() {
                    var me = this;

                    waitsFor(function(){
                        return me.resumed;
                    }, "resume bubbling events", 100);
                });

                runs(function() {
                    expect(this.two).toHaveBeenCalled();
                    expect(this.three).not.toHaveBeenCalled();
                });
            });
        });

        describe("listeners config", function() {
            it("should be initialized before any fireEvent()", function() {
                var listenerFn = jasmine.createSpy();
                var Boo = Ext.define(null, {
                    mixins: [Ext.mixin.Observable],

                    observableType: 'boo',

                    config: {
                        test: true,
                        listeners: {
                            boo: listenerFn
                        }
                    },

                    constructor: function(config) {
                        this.mixins.observable.constructor.call(this, config);
                    },

                    getEventDispatcher: function() {
                        this.getListeners();

                        return dispatcher;
                    },

                    updateTest: function() {
                        this.fireEvent('boo');
                    }
                });
                var boo = new Boo;

                expect(listenerFn).toHaveBeenCalled();
            });
        });

        describe("destroy()", function() {
            it("should fire a 'destroy' event", function() {
                spyOn(foo, 'fireEvent');

                foo.destroy();

                expect(foo.fireEvent).toHaveBeenCalledWith('destroy', foo);
            });

            it("should invoke both clearListeners() and clearManagedListeners()", function() {
                spyOn(foo, 'clearListeners');
                spyOn(foo, 'clearManagedListeners');

                foo.destroy();

                expect(foo.clearListeners).toHaveBeenCalled();
                expect(foo.clearManagedListeners).toHaveBeenCalled();
            });

            it("should remove all managed listeners from the other object", function() {
                var fn2 = function(){};

                spyOn(foo, 'doRemoveListener');

                foo.on('foo', fn, bar, options, order);
                foo.on('bar', fn2, bar, options, order);

                bar.destroy();

                expect(foo.doRemoveListener).toHaveBeenCalled();
                expect(foo.doRemoveListener.callCount).toBe(3);
                expect(foo.doRemoveListener.calls[0].args[0]).toEqual('destroy');
                expect(foo.doRemoveListener.calls[1].args).toEqual(['foo', fn, bar, options, order]);
                expect(foo.doRemoveListener.calls[2].args).toEqual(['bar', fn2, bar, options, order]);
            });
        });
    });

    // This suite contains functional tests for Ext.mixin.Observable.  The true "unit"
    // tests are located above.  The purpose of the following functional tests is to verify
    // that end-to-end functionality works as expected.  For example, when I listen for
    // event "x" with "y" options, I expect my handler to be called with certain parameters
    // and scope when I trigger a dom event that should cause event "x" to fire.
    describe("add/remove listener functional specs", function() {
        function makeSuite(delegated) {

            describe("element " + (delegated ? "(with delegated listeners)" : "(with direct listeners)"), function() {
                var element, handler, handler2, scope, args, child, grandchild;

                function getOptions(opt) {
                    return Ext.apply({
                        // we'll use "click" as the default event type for element observability
                        click: handler,
                        delegated: delegated
                    }, opt)
                }

                function addListener(opt) {
                    element.addListener(getOptions(opt));
                }

                function removeListener(opt) {
                    var opt = getOptions(opt);
                    element.removeListener(opt);
                }

                function fire(el, eventName) {
                    jasmine.fireMouseEvent(el || element, eventName || 'click');
                }

                beforeEach(function() {
                    handler = jasmine.createSpy();
                    handler.andCallFake(function() {
                        scope = this;
                        args = arguments;
                    });
                    handler2 = jasmine.createSpy();

                    element = Ext.getBody().createChild({
                        id: 'parent',
                        cn: [
                            {
                                id: 'child',
                                cls: 'child',
                                cn: { id: 'grandchild', cls: 'grandchild' }
                            }
                        ]
                    });

                    child = document.getElementById('child');
                    grandchild = document.getElementById('grandchild');
                });

                afterEach(function() {
                    element.destroy();
                });

                describe("addListener", function() {
                    it("should handle an event", function() {
                        addListener();
                        fire();
                        expect(handler.callCount).toBe(1);
                        expect(args[0] instanceof Ext.event.Event).toBe(true);
                        expect(args[1]).toBe(element.dom);
                        expect(args[2]).toEqual({ delegated: delegated });
                        expect(scope).toBe(element);
                    });

                    it("should handle an event that bubbled from a descendant element", function() {
                        addListener();
                        fire(grandchild);
                        expect(handler.callCount).toBe(1);
                        expect(args[0] instanceof Ext.event.Event).toBe(true);
                        expect(args[1]).toBe(grandchild);
                        expect(args[2]).toEqual({ delegated: delegated });
                        expect(scope).toBe(element);
                    });

                    it("should attach multiple handlers to the same event", function() {
                        addListener();
                        addListener({ click: handler2 });
                        fire();
                        expect(handler.callCount).toBe(1);
                        expect(handler2.callCount).toBe(1);
                    });

                    it("should call the event handler with the correct scope when the scope option is used", function() {
                        var obj = {};

                        addListener({ scope: obj });
                        fire();
                        expect(scope).toBe(obj);
                    });

                    it("should call the handler multiple times if the event fires more than once", function() {
                        addListener();
                        fire();
                        fire();
                        fire();
                        expect(handler.callCount).toBe(3);
                    });

                    it("should remove a single listener after the first fire", function() {
                        addListener({ single: true });
                        fire();
                        expect(handler.callCount).toBe(1);
                        // fire again
                        fire();
                        // still 1
                        expect(handler.callCount).toBe(1);
                    });

                    it("should delay the listener", function() {
                        addListener({ delay: 150 });
                        fire();
                        waits(100);
                        runs(function() {
                            expect(handler).not.toHaveBeenCalled();
                        });
                        waits(100);
                        runs(function() {
                            expect(handler).toHaveBeenCalled();
                        });
                    });

                    it("should buffer the listener", function() {
                        addListener({ buffer: 150 });
                        fire();
                        waits(100);
                        runs(function() {
                            expect(handler).not.toHaveBeenCalled();
                            fire();
                        });
                        waits(100);
                        runs(function() {
                            expect(handler).not.toHaveBeenCalled();
                        });
                        waits(100);
                        runs(function() {
                            expect(handler).toHaveBeenCalled();
                        });
                    });

                    it("should attach listeners with a delegate selector", function() {
                        addListener({ delegate: '.grandchild' });
                        fire(child);
                        expect(handler).not.toHaveBeenCalled();
                        fire(grandchild);
                        expect(handler).toHaveBeenCalled();
                    });

                    describe("propagation", function() {
                        var results;

                        beforeEach(function() {
                            results = [];
                            grandchild = Ext.get('grandchild');
                            child = Ext.get('child');
                        });

                        afterEach(function() {
                            grandchild.destroy();
                            child.destroy();
                        });

                        it("should fire bubble listeners in bottom-up order", function() {
                            element.on({
                                click: function() {
                                    results.push(1);
                                }
                            });

                            child.on({
                                click: function() {
                                    results.push(2);
                                }
                            });

                            grandchild.on({
                                click: function() {
                                    results.push(3);
                                }
                            });

                            fire(grandchild);

                            expect(results).toEqual([3, 2, 1]);
                        });

                        it("should fire capture listeners in top-down order", function() {
                            element.on({
                                click: function() {
                                    results.push(1);
                                },
                                capture: true
                            });

                            child.on({
                                click: function() {
                                    results.push(2);
                                },
                                capture: true
                            });

                            grandchild.on({
                                click: function() {
                                    results.push(3);
                                },
                                capture: true
                            });

                            fire(grandchild);

                            expect(results).toEqual([1, 2, 3]);
                        });

                        it("should stop bubbling when stopPropagation is called", function() {
                            element.on({
                                click: handler
                            });

                            grandchild.on({
                                click: function(e) {
                                    e.stopPropagation();
                                }
                            });

                            fire(grandchild);

                            expect(handler).not.toHaveBeenCalled();
                        });

                        it("should stop propagating when stopPropagation is called during the capture phase", function() {
                            element.on({
                                click: function(e) {
                                    e.stopPropagation();
                                },
                                capture: true
                            });

                            grandchild.on({
                                click: handler,
                                capture: true
                            });

                            fire(grandchild);

                            expect(handler).not.toHaveBeenCalled();
                        });

                        it("should skip the entire bubble phase if stopPropagation is called during the capture phase", function() {
                            element.on({
                                click: function(e) {
                                    e.stopPropagation();
                                },
                                capture: true
                            });

                            element.on({
                                click: handler
                            });

                            grandchild.on({
                                click: handler2
                            });

                            fire(grandchild);

                            expect(handler).not.toHaveBeenCalled();
                            expect(handler2).not.toHaveBeenCalled();
                        });
                    });
                });

                describe("removeListener", function() {
                    it("should remove the event listener", function() {
                        addListener();
                        removeListener();
                        fire();
                        expect(handler).not.toHaveBeenCalled();
                    });

                    it("should remove the event listener with scope", function() {
                        var scope = {};
                        addListener({ scope: scope });
                        removeListener({ scope: scope });
                        fire();
                        expect(handler).not.toHaveBeenCalled();
                    });

                    it("should remove multiple handlers from the same event", function() {
                        addListener();
                        addListener({ click: handler2 });
                        removeListener();
                        fire();
                        expect(handler).not.toHaveBeenCalled();
                        expect(handler2.callCount).toBe(1);
                        removeListener({ click: handler2 });
                        fire();
                        expect(handler2.callCount).toBe(1);
                    });


                    it("should remove a single event listener", function() {
                        addListener({ single: true });
                        removeListener();
                        fire();
                        expect(handler).not.toHaveBeenCalled();
                    });

                    it("should remove a delayed event listener", function() {
                        addListener({ delay: 50 });
                        removeListener();
                        fire();
                        waits(100);
                        runs(function() {
                            expect(handler).not.toHaveBeenCalled();
                        });
                    });

                    it("should remove a buffered event listener", function() {
                        addListener({ buffer: 50 });
                        removeListener();
                        fire();
                        waits(100);
                        runs(function() {
                            expect(handler).not.toHaveBeenCalled();
                        });
                    });

                    it("should remove listeners with a delegate selector", function() {
                        addListener({ delegate: '.grandchild' });
                        removeListener({ delegate: '.grandchild' });
                        fire(grandchild);
                        expect(handler).not.toHaveBeenCalled();
                    });
                });

                describe("clearListeners", function() {
                    it("should remove all the listeners", function() {
                        var handler3 = jasmine.createSpy(),
                            handler4 = jasmine.createSpy();

                        element.on({
                            click: handler
                        });

                        element.on({
                            click: handler2,
                            delegate: '.grandchild'
                        });

                        element.on({
                            click: handler3,
                            capture: true
                        });

                        element.on({
                            click: handler4
                        });

                        element.clearListeners();

                        fire(grandchild);

                        expect(handler).not.toHaveBeenCalled();
                        expect(handler2).not.toHaveBeenCalled();
                        expect(handler3).not.toHaveBeenCalled();
                        expect(handler4).not.toHaveBeenCalled();
                    });
                });
            });
        }

        makeSuite(true);
        makeSuite(false);
    });

    describe("event name normalization", function() {
        var spy, o;

        beforeEach(function() {
            spy = jasmine.createSpy();
            o = new Ext.mixin.Observable();
        });

        describe("firing", function() {
            it("should match when firing with lower case", function() {
                o.on('FOO', spy);
                o.fireEvent('foo');
                expect(spy).toHaveBeenCalled();
            });

            it("should match when firing with mixed case", function() {
                o.on('foo', spy);
                o.fireEvent('FOO');
                expect(spy).toHaveBeenCalled();
            });
        });

        describe("removing", function() {
            it("should match when removing with lower case", function() {
                o.on('FOO', spy);
                o.un('foo', spy);
                o.fireEvent('foo');
                expect(spy).not.toHaveBeenCalled();
            });

            it("should match when removing with mixed case", function() {
                o.on('foo', spy);
                o.un('FOO', spy);
                o.fireEvent('FOO');
                expect(spy).not.toHaveBeenCalled();
            });
        });

        describe("hasListener(s)", function() {
            it("should use lower case for hasListeners", function() {
                o.on('FOO', spy);
                expect(o.hasListeners.foo).toBe(1);
            });

            it("should use lower case for hasListener", function() {
                o.on('FOO', spy);
                expect(o.hasListener('foo')).toBe(true);
            });
        });

        describe("suspend/resume", function() {
            it("should ignore case when asking if an event is suspended", function() {
                o.suspendEvent('FOO');
                expect(o.isSuspended('foo')).toBe(true);
            });

            it("should ignore case when resuming events", function() {
                o.on('foo', spy);
                o.suspendEvent('FOO');
                o.fireEvent('foo');
                expect(spy).not.toHaveBeenCalled();
                o.resumeEvent('foo');
                o.fireEvent('foo');
                expect(spy).toHaveBeenCalled();
            });
        });

        describe("bubbling", function() {
            it("should ignore case when bubbling events", function() {
                var other = new Ext.mixin.Observable();
                other.on('foo', spy);
                o.enableBubble('FOO');
                o.getBubbleTarget = function() {
                    return other;
                }
                o.fireEvent('foo');
                expect(spy).toHaveBeenCalled();
            });
        });
    });

    describe("hasListeners", function() {
        var dispatcher;

        beforeEach(function() {
            Ext.define('spec.Foo', {
                extend: 'Ext.mixin.Observable',
                observableType: 'foo'
            });

            Ext.define('spec.Bar', {
                extend: 'Ext.mixin.Observable',
                observableType: 'foo'
            });

            dispatcher = Ext.event.Dispatcher.getInstance();

            delete dispatcher.hasListeners.foo;
            delete dispatcher.hasListeners.bar;
        });

        afterEach(function() {
            Ext.undefine('spec.Foo');
            Ext.undefine('spec.Bar');
            Ext.undefine('spec.Baz');

            delete dispatcher.hasListeners.foo;
            delete dispatcher.hasListeners.bar;
        });

        it("should add the observableType to the dispatcher's hasListeners object when the first instance of a given observableType is created", function() {
            var hasListeners = dispatcher.hasListeners;

            expect('foo' in hasListeners).toBe(false);
            new spec.Foo();
            expect(typeof hasListeners.foo).toBe('object');
        });

        it("should chain the prototype of the observable instance's hasListeners object to the dispatchers hasListeners object for the given observableType", function() {
            var hasListeners = dispatcher.hasListeners,
                foo = new spec.Foo();

            hasListeners.foo.someEvent = 5;

            expect(foo.hasListeners.someEvent).toBe(5);
        });

        it("should not add the observableType to the dispatcher's hasListeners if it already exists", function() {
            var hasListeners = dispatcher.hasListeners,
                fooListeners;

            new spec.Foo();
            fooListeners = hasListeners.foo;
            new spec.Bar();  // another observable with observableType == 'foo'
            expect(hasListeners.foo).toBe(fooListeners);
        });

        it("should increment or decrement the dispatcher's hasListeners when the dispatcher's addListener/removeListener is called with no observable refrence", function() {
            // MVC controllers do this.  unfortunately there's no way to increment the
            // observable's hasListeners, since all we have is a selector, so the best we
            // can do is increment the global hasListeners for the given observableType
            // i.e. we know there is someone of the given type listening, we just don't
            // know who.
            function handler() {}
            function handler2() {}
            dispatcher.addListener('foo', '#bar', 'click', handler);
            expect(dispatcher.hasListeners.foo.click).toBe(1);
            dispatcher.addListener('foo', '#bar', 'click', handler2);
            expect(dispatcher.hasListeners.foo.click).toBe(2);
            dispatcher.removeListener('foo', '#bar', 'click', handler);
            expect(dispatcher.hasListeners.foo.click).toBe(1);
            dispatcher.removeListener('foo', '#bar', 'click', handler2);
            expect('click' in dispatcher.hasListeners.foo).toBe(false);
        });

        it("should increment or decrement the observable's hasListeners when the observable's addListener/removeListener is called", function() {
            // MVC controllers do this.  unfortunately there's no way to increment the
            // observable's hasListeners, since all we have is a selector, so the best we
            // can do is increment the global hasListeners for the given observableType
            // i.e. we know there is someone of the given type listening, we just don't
            // know who.
            var foo = new spec.Foo();
            function handler() {}
            function handler2() {}
            expect(foo.hasListeners.hasOwnProperty('click')).toBe(false);
            foo.addListener('click', handler);
            expect(foo.hasListeners.hasOwnProperty('click')).toBe(true);
            expect(foo.hasListeners.click).toBe(1);
            foo.addListener('click', handler2);
            expect(foo.hasListeners.click).toBe(2);
            foo.removeListener('click', handler);
            expect(foo.hasListeners.click).toBe(1);
            foo.removeListener('click', handler2);
            expect(foo.hasListeners.hasOwnProperty('click')).toBe(false);
        });

        it("should delete all properties from the observable's hasListeners object when clearListeners is called", function() {
            var foo = new spec.Foo();

            foo.addListener('refresh', function() {});
            foo.addListener('refresh', function() {});
            foo.addListener('update', function() {});

            foo.clearListeners();

            expect(foo.hasListeners.hasOwnProperty('refresh')).toBe(false);
            expect(foo.hasListeners.hasOwnProperty('update')).toBe(false);
        });

        it("should remove properties from the dispatcher's hasListeners object for the given observableType when the dispatcher's clearListeners() is called without an observable reference", function() {
            dispatcher.addListener('foo', '#bar', 'refresh', function() {});
            dispatcher.addListener('foo', '#bar', 'update', function() {});
            dispatcher.addListener('foo', '#baz', 'refresh', function() {});

            dispatcher.clearListeners('foo', '#bar');

            expect('update' in dispatcher.hasListeners.foo).toBe(false);
            expect(dispatcher.hasListeners.foo.refresh).toBe(1);
        });
        
        it('should only decrement hasListeners when a listener is actually removed', function() {
            var foo = new spec.Foo(),
                event1Counter = 0;
            
            foo.addListener('event1', function() {
                event1Counter++;
            });
            foo.fireEvent('event1');
            expect(event1Counter).toBe(1);

            // Attempt to remove a nonexistent listener. Sohuld not disturb the listener stack or the hasListeners counter
            foo.removeListener('event1', Ext.emptyFn);

            foo.fireEvent('event1');

            // Second firing of the event should work, and hasListeners should still be 1
            expect(event1Counter).toBe(2);
            expect(foo.hasListeners.event1).toBe(1);
        });

    });

    describe("scope: this", function() {
        var Cls;

        beforeEach(function() {
            Cls = Ext.define(null, {
                mixins: ['Ext.mixin.Observable'],

                constructor: function() {
                    this.mixins.observable.constructor.call(this);
                },

                method1: function() {},
                method2: function() {}
            });
        });

        it("should fire on the observable", function() {
            var o = new Cls();
            spyOn(o, 'method1');
            o.on('custom', 'method1', 'this');
            o.fireEvent('custom');
            expect(o.method1).toHaveBeenCalled();
            expect(o.method1.mostRecentCall.object).toBe(o);
        });

        it("should remove the listener", function() {
            var o = new Cls();
            spyOn(o, 'method1');
            o.on('custom', 'method1', 'this');
            o.un('custom', 'method1', 'this');
            o.fireEvent('custom');
            expect(o.method1).not.toHaveBeenCalled();
        });
    });

    describe("scope: controller", function() {
        var Cls;

        beforeEach(function() {
            Cls = Ext.define(null, {
                mixins: ['Ext.mixin.Observable'],

                constructor: function() {
                    this.mixins.observable.constructor.call(this);
                },

                method1: function() {},
                method2: function() {}
            });
        });

        it("should not resolve the scope", function() {
            // Observables can't have controllers
            var o = new Cls();
            spyOn(o, 'method1');
            o.on('custom', 'method1', 'controller');
            expect(function() {
                o.fireEvent('custom');
            }).toThrow();
        });
    });

    describe("Event Normalization", function() {
        var target, fire, events, secondaryEvents, listeners;

        beforeEach(function() {
            target = Ext.getBody().createChild();

            listeners = {
                mousedown: jasmine.createSpy(),
                mousemove: jasmine.createSpy(),
                mouseup: jasmine.createSpy(),
                touchstart: jasmine.createSpy(),
                touchmove: jasmine.createSpy(),
                touchend: jasmine.createSpy(),
                pointerdown: jasmine.createSpy(),
                pointermove: jasmine.createSpy(),
                pointerup: jasmine.createSpy()
            };

            target.on(listeners);
        });

        afterEach(function() {
            target.destroy();
        });

        if (Ext.supports.PointerEvents) {
            events = {
                start: 'pointerdown',
                move: 'pointermove',
                end: 'pointerup'
            };

            fire = function(type) {
                jasmine.firePointerEvent(target, events[type]);
            };
        } else if (Ext.supports.MSPointerEvents) {
            events = {
                start: 'MSPointerDown',
                move: 'MSPointerMove',
                end: 'MSPointerUp'
            };

            fire = function(type) {
                jasmine.firePointerEvent(target, events[type]);
            };
        } else if (Ext.supports.TouchEvents) {
            events = {
                start: 'touchstart',
                move: 'touchmove',
                end: 'touchend'
            };

            secondaryEvents = {
                start: 'mousedown',
                move: 'mousemove',
                end: 'mouseup'
            };

            fire = function(type, secondary) {
                if (secondary) {
                    jasmine.fireMouseEvent(target, secondaryEvents[type], 100, 100);
                } else {
                    jasmine.fireTouchEvent(target, events[type], [{ pageX: 1, pageY: 1 }]);
                }
            };
        } else {
            events = {
                start: 'mousedown',
                move: 'mousemove',
                end: 'mouseup'
            };

            fire = function(type) {
                jasmine.fireMouseEvent(target, events[type]);
            };
        }

        it("should fire start events", function() {
            fire('start');
            expect(listeners.pointerdown.callCount).toBe(1);
            expect(listeners.touchstart.callCount).toBe(1);
            expect(listeners.mousedown.callCount).toBe(1);
            expect(listeners.pointerdown.mostRecentCall.args[0].type).toBe('pointerdown');
            expect(listeners.touchstart.mostRecentCall.args[0].type).toBe('touchstart');
            expect(listeners.mousedown.mostRecentCall.args[0].type).toBe('mousedown');
        });

        it("should fire move events", function() {
            fire('move');
            expect(listeners.pointermove.callCount).toBe(1);
            expect(listeners.touchmove.callCount).toBe(1);
            expect(listeners.mousemove.callCount).toBe(1);
            expect(listeners.pointermove.mostRecentCall.args[0].type).toBe('pointermove');
            expect(listeners.touchmove.mostRecentCall.args[0].type).toBe('touchmove');
            expect(listeners.mousemove.mostRecentCall.args[0].type).toBe('mousemove');
        });

        it("should fire end events", function() {
            fire('end');
            expect(listeners.pointerup.callCount).toBe(1);
            expect(listeners.touchend.callCount).toBe(1);
            expect(listeners.mouseup.callCount).toBe(1);
            expect(listeners.pointerup.mostRecentCall.args[0].type).toBe('pointerup');
            expect(listeners.touchend.mostRecentCall.args[0].type).toBe('touchend');
            expect(listeners.mouseup.mostRecentCall.args[0].type).toBe('mouseup');
        });

        if (Ext.supports.TouchEvents && Ext.isWebKit && Ext.os.is.Desktop) {
            // Touch Enabled webkit on windows 8 fires both mouse and touch events We already
            // tested the touch events above, so make sure mouse events/ work as well.

            it("should fire secondary start events", function() {
                fire('start', true);
                expect(listeners.pointerdown.callCount).toBe(1);
                expect(listeners.touchstart.callCount).toBe(1);
                expect(listeners.mousedown.callCount).toBe(1);
                expect(listeners.pointerdown.mostRecentCall.args[0].type).toBe('pointerdown');
                expect(listeners.touchstart.mostRecentCall.args[0].type).toBe('touchstart');
                expect(listeners.mousedown.mostRecentCall.args[0].type).toBe('mousedown');
            });

            it("should fire secondary move events", function() {
                fire('move', true);
                expect(listeners.pointermove.callCount).toBe(1);
                expect(listeners.touchmove.callCount).toBe(1);
                expect(listeners.mousemove.callCount).toBe(1);
                expect(listeners.pointermove.mostRecentCall.args[0].type).toBe('pointermove');
                expect(listeners.touchmove.mostRecentCall.args[0].type).toBe('touchmove');
                expect(listeners.mousemove.mostRecentCall.args[0].type).toBe('mousemove');
            });

            it("should fire secondary end events", function() {
                fire('end', true);
                expect(listeners.pointerup.callCount).toBe(1);
                expect(listeners.touchend.callCount).toBe(1);
                expect(listeners.mouseup.callCount).toBe(1);
                expect(listeners.pointerup.mostRecentCall.args[0].type).toBe('pointerup');
                expect(listeners.touchend.mostRecentCall.args[0].type).toBe('touchend');
                expect(listeners.mouseup.mostRecentCall.args[0].type).toBe('mouseup');
            });
        }
    });

    describe("declarative listeners", function() {
        var ParentMixin, ChildMixin, ParentClass, ChildClass,
            result = [];

        beforeEach(function() {
            ParentMixin = Ext.define(null, {
                mixins: [ Ext.mixin.Observable ],
                type: 'ParentMixin',
                listeners: {
                    foo: 'parentMixinHandler',
                    scope: 'this'
                },
                constructor: function(config) {
                    this.mixins.observable.constructor.call(this, config);
                },

                parentMixinHandler: function() {
                    result.push('parentMixin:' + this.id);
                }
            });

            ChildMixin = Ext.define(null, {
                extend: ParentMixin,
                mixinId: 'childMixin',
                type: 'ChildMixin',
                listeners: {
                    foo: 'childMixinHandler',
                    scope: 'this'
                },

                childMixinHandler: function() {
                    result.push('childMixin:' + this.id);
                }
            });

            ParentClass = Ext.define(null, {
                mixins: [ ChildMixin ],
                type: 'ParentClass',
                listeners: {
                    foo: 'parentClassHandler',
                    scope: 'this'
                },

                constructor: function(config) {
                    this.mixins.childMixin.constructor.call(this, config);
                },

                parentClassHandler: function() {
                    result.push('parentClass:' + this.id);
                }
            });

            ChildClass = Ext.define(null, {
                extend: ParentClass,
                type: 'ChildClass',
                listeners: {
                    foo: 'childClassHandler',
                    scope: 'this'
                },

                childClassHandler: function() {
                    result.push('childClass:' + this.id);
                }
            });

        });

        it("should call all the listeners", function() {
            var instance = new ChildClass({
                listeners: {
                    foo: function() {
                        result.push('childInstance:' + this.id);
                    }
                }
            });

            instance.id = 'theId';
            instance.fireEvent('foo');

            expect(result).toEqual([
                'parentMixin:theId',
                'childMixin:theId',
                'parentClass:theId',
                'childClass:theId',
                'childInstance:theId'
            ]);
        });
    });
});
