describe("Ext.util.LruCache", function(){
    var cache,
        obj1  = {objIdx:1},
        obj2  = {objIdx:2},
        obj3  = {objIdx:3},
        obj4  = {objIdx:4},
        obj5  = {objIdx:5},
        obj6  = {objIdx:6},
        obj7  = {objIdx:7},
        obj8  = {objIdx:8},
        obj9  = {objIdx:9},
        obj10 = {objIdx:10};

    function createCache(config) {
        cache = new Ext.util.LruCache(config);
    }

    describe("Adding", function(){
        it("should create an empty cache", function(){
            createCache();
            expect(cache.length).toBe(0);
            expect(cache.first).toBeNull;
            expect(cache.last).toBeNull();
            expect(cache.getValues()).toEqual([]);
            expect(cache.getKeys()).toEqual([]);
        });

        it("should contain 1 entry", function(){
            createCache();
            cache.add(1, obj1);
            expect(cache.length).toEqual(1);
            expect(cache.first.value).toBe(obj1);
            expect(cache.last.value).toBe(obj1);
            expect(cache.getValues()).toEqual([obj1]);
            expect(cache.getKeys()).toEqual([1]);
        });

        it("should contain 2 entries", function(){
            createCache();
            cache.add(1, obj1);
            cache.add(2, obj2);
            expect(cache.length).toEqual(2);
            expect(cache.first.value).toBe(obj1);
            expect(cache.last.value).toBe(obj2);
            expect(cache.getValues()).toEqual([obj1, obj2]);
            expect(cache.getKeys()).toEqual([1, 2]);
        });
    });

    describe("Sort on access", function() {
        it("should move accessed items to the end", function(){
            createCache();
            cache.add(1, obj1);
            cache.add(2, obj2);
            expect(cache.getValues()).toEqual([obj1, obj2]);
            expect(cache.getKeys()).toEqual([1, 2]);
            cache.get(1);
            expect(cache.getValues()).toEqual([obj2, obj1]);
            expect(cache.getKeys()).toEqual([2, 1]);
        });
    });

    describe("Inserting", function() {
        it("should insert at the requested point", function(){
            createCache();
            cache.add(1, obj1);
            cache.insertBefore(2, obj2, obj1);
            expect(cache.getValues()).toEqual([obj2, obj1]);
            expect(cache.getKeys()).toEqual([2, 1]);
        });
    });

    describe("Iterating", function() {
        it("should iterate in order", function(){
            var result = [];
            createCache();
            cache.add(1, obj1);
            cache.add(2, obj2);
            cache.each(function(key, value, length) {
                result.push(key, value);
            });
            expect(result).toEqual([1, obj1, 2, obj2]);
        });
        it("should iterate in reverse order", function(){
            var result = [];
            createCache();
            cache.add(1, obj1);
            cache.add(2, obj2);
            cache.each(function(key, value, length) {
                result.push(key, value);
            }, null, true);
            expect(result).toEqual([2, obj2, 1, obj1]);
        });
    });

    describe("Removing", function() {
        it("should remove by key and re-link", function(){
            createCache();
            cache.add(1, obj1);
            cache.add(2, obj2);
            cache.add(3, obj3);
            cache.removeAtKey(2)
            expect(cache.getValues()).toEqual([obj1, obj3]);
            expect(cache.getKeys()).toEqual([1, 3]);
        });
        it("should remove by value and re-link", function(){
            createCache();
            cache.add(1, obj1);
            cache.add(2, obj2);
            cache.add(3, obj3);
            cache.remove(obj2)
            expect(cache.getValues()).toEqual([obj1, obj3]);
            expect(cache.getKeys()).toEqual([1, 3]);
        });
    });

    describe("Clearing", function() {
        it("should remove all", function(){
            createCache();
            cache.add(1, obj1);
            cache.add(2, obj2);
            cache.clear();
            expect(cache.getValues()).toEqual([]);
            expect(cache.getKeys()).toEqual([]);
        });
    });

    describe("Purging", function() {
        it("should only contain the last 5 added", function(){
            createCache({
                maxSize: 5
            });
            cache.add(1, obj1);
            cache.add(2, obj2);
            cache.add(3, obj3);
            cache.add(4, obj4);
            cache.add(5, obj5);
            cache.add(6, obj6);
            cache.add(7, obj7);
            cache.add(8, obj8);
            cache.add(9, obj9);
            cache.add(10, obj10);
            expect(cache.getValues()).toEqual([obj6, obj7, obj8, obj9, obj10]);
            expect(cache.getKeys()).toEqual([6, 7, 8, 9, 10]);
        });
    });
});
