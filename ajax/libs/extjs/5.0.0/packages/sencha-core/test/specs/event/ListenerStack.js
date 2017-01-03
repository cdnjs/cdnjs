describe("Ext.event.ListenerStack", function() {
    describe("members", function() {
        var listenerStack, fn, scope, options;

        beforeEach(function() {
            listenerStack = new Ext.event.ListenerStack();
            fn = function() {},
            scope = null,
            options = {};
        });

        describe("count()", function() {
            it("should always be 0 initially", function() {
                expect(listenerStack.count()).toBe(0);
            });
        });

        describe("add()", function() {
            it("adding listener should increase listeners count", function() {
                listenerStack.add(fn, scope, options);

                expect(listenerStack.count()).toBe(1);
            });

            it("listener at index 0 should be added properly", function() {
                listenerStack.add(fn, scope, options);
                var listener = listenerStack.getAt(0);

                expect(listener).toBeDefined();
                expect(listener.fn).toBe(fn);
                expect(listener.scope).toBe(scope);
                expect(listener.options).toBe(options);
            });

            it("should NOT add listener again if one already exists with the same fn and scope, replace options instead", function() {
                var newOptions = {
                    somethingNew: true
                };

                listenerStack.add(fn, scope, options);

                expect(listenerStack.count()).toBe(1);

                listenerStack.add(fn, scope, newOptions);

                expect(listenerStack.count()).toBe(1);
                expect(listenerStack.getAt(0).options).toEqual(newOptions);
            });

            it("should prepend listeners if options.prepend is true", function() {
                var fn2 = function(){};

                listenerStack.add(fn2, scope, {});
                listenerStack.add(fn, scope, { prepend: true });

                expect(listenerStack.getAt(0).fn).toBe(fn);
                expect(listenerStack.getAt(1).fn).toBe(fn2);
            });
        });

        describe("remove()", function() {
            it("should remove listener if exists", function() {
                listenerStack.add(fn, scope, options);
                listenerStack.remove(fn, scope);

                expect(listenerStack.count()).toBe(0);
            });

            it("should NOT remove listener if not exists", function() {
                listenerStack.add(fn, scope, options);
                listenerStack.remove(function(){}, scope);
                listenerStack.remove(fn, {});

                expect(listenerStack.count()).toBe(1);
            });
        });
    });
});
