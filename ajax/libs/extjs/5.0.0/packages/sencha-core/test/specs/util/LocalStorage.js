describe("Ext.util.LocalStorage", function() {
    var store;

    function createStore () {
        return new Ext.util.LocalStorage({ id: 'one', flushDelay: 0 });
    }

    beforeEach(function () {
        store = createStore();
    });
    afterEach(function() {
        store.clear();
        store.destroy();
        store = null;
    });

    describe("initialization", function() {
        it("should start empty", function() {
            var keys = store.getKeys();
            expect(keys.length).toBe(0);
        });

        it("should start with last state", function() {
            store.setItem('foo', 'bar');
            store.destroy();

            // Using a new instance, check the state of the store:
            store = createStore();

            var keys = store.getKeys();
            expect(keys.length).toBe(1);
            expect(keys[0]).toBe('foo');
        });
    });

    describe("isolation", function() {
        var store2;

        function createStore2 () {
            return new Ext.util.LocalStorage({ id: 'two', flushDelay: 0 });
        }

        beforeEach(function () {
            store2 = createStore2();
        });
        afterEach(function() {
            store2.clear();
            store2.destroy();
            store2 = null;
        });

        it("should isolate getKeys", function() {
            store.setItem('foo', 'bar');
            store2.setItem('foo', '42');

            var keys = store.getKeys();
            expect(keys.length).toBe(1);
            expect(keys[0]).toBe('foo');

            var keys2 = store2.getKeys();
            expect(keys2.length).toBe(1);
            expect(keys2[0]).toBe('foo');

            // Arrays should not be same instances:
            expect(keys).not.toBe(keys2);

            var value = store.getItem('foo');
            var value2 = store2.getItem('foo');

            expect(value).toBe('bar');
            expect(value2).toBe('42');
        });

        it("should isolate keys", function() {
            store.setItem('foo', 'bar');
            store.setItem('bar', 'foobar');

            // One common key (foo) but some distinct keys and different number of keys
            store2.setItem('foo', '42');
            store2.setItem('zip', 'abc');
            store2.setItem('zap', 'xyz');

            var keys = [ store.key(0), store.key(1) ];
            keys.sort();
            expect(keys[1]).toBe('foo');
            expect(keys[0]).toBe('bar');
            expect(store.key(2)).toBe(null);

            var keys2 = [ store2.key(0), store2.key(1), store2.key(2) ];
            keys2.sort();
            expect(keys2[0]).toBe('foo');
            expect(keys2[1]).toBe('zap');
            expect(keys2[2]).toBe('zip');
            expect(store2.key(3)).toBe(null);

            var value0 = store.getItem('foo');
            expect(value0).toBe('bar');
            var value1 = store.getItem('bar');
            expect(value1).toBe('foobar');

            var value2_0 = store2.getItem('foo');
            expect(value2_0).toBe('42');
            var value2_1 = store2.getItem('zip');
            expect(value2_1).toBe('abc');
            var value2_2 = store2.getItem('zap');
            expect(value2_2).toBe('xyz');
        });

        it("should isolate clear", function() {
            store.setItem('foo', 'bar');
            store2.setItem('foo', '42');

            store.clear();

            var keys = store.getKeys();
            expect(keys.length).toBe(0);

            var value2 = store2.getItem('foo');
            var keys2 = store2.getKeys();
            expect(keys2.length).toBe(1);
            expect(value2).toBe('42');
        });

        it("should isolate removeItem", function() {
            store.setItem('foo', 'bar');
            store2.setItem('foo', '42');

            store.removeItem('foo');

            var keys = store.getKeys();
            expect(keys.length).toBe(0);

            var value2 = store2.getItem('foo');
            var keys2 = store2.getKeys();
            expect(keys2.length).toBe(1);
            expect(value2).toBe('42');
        });
    });

    describe("cache", function () {
        it ("should not share instances with the different id", function () {
            var store1 = Ext.util.LocalStorage.get('foo');
            var store2 = Ext.util.LocalStorage.get('bar');

            expect(store1).not.toBe(store2);
            store1.release();
            store2.release();
        });

        it ("should share instances with the same id", function () {
            var store1 = Ext.util.LocalStorage.get('foo');
            var store2 = Ext.util.LocalStorage.get('foo');

            expect(store1).toBe(store2);
            store1.release();
            store2.release();
        });

        it ("should destroy the instance on final release", function () {
            var store = Ext.util.LocalStorage.get('foo');

            expect(store._users).toBe(1);

            expect(store).toBe(Ext.util.LocalStorage.get('foo')); // count = 2
            expect(store._users).toBe(2);

            store.release();
            expect(store._users).toBe(1);
            expect(store.destroyed).toBe(false);

            store.release();
            expect(store._users).toBe(0);
            expect(store.destroyed).toBe(true);
        });
    });

    /*
     * Legacy IE support delays writes by default for performance. We've disabled that
     * above for sanity, but we need to test it as well. So here we go.
     */
    describe("delayed operation", function() {
        var store2;

        function createStore2 () {
            return new Ext.util.LocalStorage({ id: 'three', flushDelay: 1 });
        }

        beforeEach(function () {
            store2 = createStore2();
        });
        afterEach(function() {
            store2.clear();
            store2.destroy();
            store2 = null;
        });

        it("should delay writes", function() {
            if (store2.el) { // if (legacy IE)
                runs(function () {
                    store2.setItem('foo', '42');

                    // if we've *ever* cleared the data it will be '{}' otherwise null:
                    var s = store2.el.getAttribute('xdata') || '{}';
                    expect(s).toBe('{}');
                });

                waitsFor(function () {
                    return !store2._timer;
                });

                runs(function () {
                    var s = store2.el.getAttribute('xdata');
                    expect(s).toBe('{\"foo\":\"42\"}');
                });
            }
        });

        it("should flush writes when requested", function() {
            if (store2.el) { // if (legacy IE)
                store2.setItem('foo', '42');

                // if we've *ever* cleared the data it will be '{}' otherwise null:
                var s = store2.el.getAttribute('xdata') || '{}';
                expect(s).toBe('{}');

                expect(store2._timer).not.toBe(null);
                store2.save();
                expect(store2._timer).toBe(null);

                var s2 = store2.el.getAttribute('xdata');
                expect(s2).toBe('{\"foo\":\"42\"}');
            }
        });
    });
});
