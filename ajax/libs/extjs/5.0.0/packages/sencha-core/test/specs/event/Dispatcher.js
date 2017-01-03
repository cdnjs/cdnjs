describe("Ext.event.Dispatcher", function() {
    var dispatcher, foo, anotherFoo, bar,
        targetType, target, eventName,
        fn, scope, options, args, finishFn, order;

    var FooPublisher = new Ext.Class({
        extend: Ext.event.publisher.Publisher,

        targetType: 'foo',

        handledEvents: ['foo', 'oof']
    });

    var AnotherFooPublisher = new Ext.Class({
        extend: Ext.event.publisher.Publisher,

        targetType: 'foo',

        handledEvents: ['anotherfoo']
    });

    var BarPublisher = new Ext.Class({
        extend: Ext.event.publisher.Publisher,

        targetType: 'bar',

        handledEvents: ['bar']
    });

    beforeEach(function() {
        dispatcher = new Ext.event.Dispatcher;
        foo = new FooPublisher;
        anotherFoo = new AnotherFooPublisher;
        bar = new BarPublisher;
        targetType = 'test';
        target = '#test';
        eventName = 'testevent';
        fn = function(){};
        scope = {};
        options = {};
        order = 'current';
        args = ['foo', 'bar', {}, [], true, 1, 2];
        finishFn = function() {};
    });

    xdescribe("getPublisher()", function(){
        it("should return null if the publisher is not known", function(){
            expect(dispatcher.getPublisher('foo', 'bar')).toBe(null);
        });
    });

    xdescribe("registerPublisher()", function(){
        it("should map the publisher to the targetType and all handled events", function(){
            dispatcher.registerPublisher(foo);

            expect(dispatcher.getPublisher('foo', 'foo')).toBe(foo);
            expect(dispatcher.getPublisher('foo', 'oof')).toBe(foo);
        });

        it("should invoke setDispatcher() of the publisher", function(){
            var publisher = new FooPublisher;

            spyOn(publisher, 'setDispatcher');

            dispatcher.registerPublisher(publisher);

            expect(publisher.setDispatcher).toHaveBeenCalledWith(dispatcher);
        });
    });

    describe("getListenerStack()", function() {
        it("should create a new instance of Ext.event.ListenerStack if not exist", function(){
            var stack = dispatcher.getListenerStack('test', '#id', 'name', true);

            expect(stack instanceof Ext.event.ListenerStack).toBe(true);
        });

        it("should NOT create a new instance of Ext.event.ListenerStack if createIfNotExists argument is not set to true", function(){
            var foo = dispatcher.getListenerStack('test', '#id', 'name');

            expect(foo).toBe(null);
        });

        it("should NOT create a new instance of Ext.event.ListenerStack if it already exists", function(){
            var foo = dispatcher.getListenerStack('test', '#id', 'name', true),
                bar = dispatcher.getListenerStack('test', '#id', 'name', true);

            expect(foo).toBe(bar);
        });

        it("should create a new instance of Ext.event.ListenerStack if targetType is different", function(){
            var foo = dispatcher.getListenerStack('foo', '#id', 'name', true),
                bar = dispatcher.getListenerStack('bar', '#id', 'name', true);

            expect(foo).not.toBe(bar);
        });

        it("should create a new instance of Ext.event.ListenerStack if target is different", function(){
            var foo = dispatcher.getListenerStack('test', '#foo', 'name', true),
                bar = dispatcher.getListenerStack('test', '.bar', 'name', true);

            expect(foo).not.toBe(bar);
        });

        it("should create a new instance of Ext.event.ListenerStack if eventName is different", function(){
            var foo = dispatcher.getListenerStack('test', '#id', 'foo', true),
                bar = dispatcher.getListenerStack('test', '#id', 'bar', true);

            expect(foo).not.toBe(bar);
        });
    });

    describe("getController()", function() {
        it("should return an instance of Ext.event.Controller", function() {
            var controller = dispatcher.getController();
            expect(controller instanceof Ext.event.Controller).toBe(true);
        });

        it("should reuse the same controller instance if it's not currently firing", function() {
            var controller = dispatcher.getController();
            expect(dispatcher.getController()).toBe(controller);
        });

        it("should NOT reuse the same controller instance if it's currently firing", function() {
            var controller = dispatcher.getController();
            controller.isFiring = true;

            expect(dispatcher.getController()).not.toBe(controller);
        });
    });

    describe("addListener()", function(){
        it("should invoke addListener() of the corresponding stack with proper arguments", function(){
            var stack = dispatcher.getListenerStack(targetType, target, eventName, true),
                observable = {};

            spyOn(stack, 'add');

            dispatcher.addListener(targetType, target, eventName, fn, scope, options, order, observable);

            expect(stack.add).toHaveBeenCalledWith(fn, scope, options, order, observable);
        });

        xit("should invoke all the publisher's subscribe() method corresponding to that targetType and eventName", function(){
            var observable = {};
            dispatcher.registerPublisher(foo);
            dispatcher.registerPublisher(bar);

            spyOn(foo, 'subscribe').andCallFake();
            spyOn(bar, 'subscribe').andCallFake();

            dispatcher.addListener('foo', target, 'foo', fn, scope, options, observable);

            expect(bar.subscribe).not.toHaveBeenCalled();

            expect(foo.subscribe).toHaveBeenCalledWith(target, 'foo', options, observable);
        });
    });

    describe("removeListener()", function(){
        it("should NOT create a new stack if not exist", function(){
            spyOn(dispatcher, 'getListenerStack').andReturn(null);

            dispatcher.removeListener(targetType, target, eventName, fn, scope);

            expect(dispatcher.getListenerStack).toHaveBeenCalledWith(targetType, target, eventName);
        });

        it("should invoke removeListener() of the corresponding stack with proper arguments", function(){
            var stack = dispatcher.getListenerStack(targetType, target, eventName, true);

            spyOn(stack, 'remove').andReturn(true);

            dispatcher.removeListener(targetType, target, eventName, fn, scope, {}, order);

            expect(stack.remove).toHaveBeenCalledWith(fn, scope, order);
        });

        it("should invoke the publisher's unsubscribe() method corresponding to that targetType and eventName", function(){
            var observable = {},
                options = {};

            spyOn(dispatcher, 'getListenerStack').andReturn({
                remove: function(){ return true; }
            });

            dispatcher.registerPublisher(foo);
            dispatcher.registerPublisher(bar);

            spyOn(foo, 'unsubscribe').andCallThrough();
            spyOn(bar, 'unsubscribe').andCallThrough();

            dispatcher.removeListener('foo', target, 'foo', fn, scope, options, null, observable);

            expect(bar.unsubscribe).not.toHaveBeenCalled();

            expect(foo.unsubscribe).toHaveBeenCalledWith(target, 'foo', null, options, observable);
        });
    });

    describe("doDispatchEvent()", function(){
        it("should invoke the controller's fire() method", function(){
            var stack = dispatcher.getListenerStack(targetType, target, eventName, true),
                controller = dispatcher.getController(),
                action = {};

            spyOn(controller, 'fire');

            dispatcher.doDispatchEvent(targetType, target, eventName, args, action);

            expect(controller.fire).toHaveBeenCalledWith(args, action);
        });
    });

    describe("dispatchEvent()", function(){
        it("should invoke doDispatchEvent() with the same arguments", function(){
            var action = {};

            spyOn(dispatcher, 'doDispatchEvent');

            dispatcher.dispatchEvent(targetType, target, eventName, args, action);

            expect(dispatcher.doDispatchEvent).toHaveBeenCalledWith(targetType, target, eventName, args, action);
        });

        it("should invoke the publisher's notify() method corresponding to that targetType and eventName", function(){
            dispatcher.registerPublisher(foo);
            dispatcher.registerPublisher(bar);

            spyOn(foo, 'notify').andCallThrough();
            spyOn(bar, 'notify').andCallThrough();

            dispatcher.dispatchEvent('foo', target, 'foo', args);

            expect(bar.notify).not.toHaveBeenCalled();

            expect(foo.notify).toHaveBeenCalledWith(target, 'foo');
        });
    });

});
