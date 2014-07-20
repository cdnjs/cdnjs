describe("Ext.util.MixedCollection", function() {
    var mc;

    it("should get the correct count", function() {
        mc = new Ext.util.MixedCollection();

        mc.addAll([{id: 1}, {id: 2}]);

        expect(mc.getCount()).toEqual(2);
    });
    
    describe("adding with separate key", function() {
        it("should find using a linear search if the key is not found", function() {
            mc = new Ext.util.MixedCollection();

            var item1 = {id: 1, data: 'first item'},
                item2 = {id: 2, data: 'second item'};

            mc.add("item1Key", item1);
            mc.add("item2Key", item2);

            expect(mc.indexOf(item1)).toBe(0);
            expect(mc.indexOf(item2)).toBe(1);
            mc.remove(item1);
            expect(mc.indexOf(item1)).toBe(-1);
            expect(mc.indexOf(item2)).toBe(0);
        });
    });

    describe("constructor", function() {
        it("should provide a default getKey implementation", function() {
            mc = new Ext.util.MixedCollection();

            var item1 = {id: 1, data: 'first item'},
                item2 = {id: 2, data: 'second item'};

            mc.add(item1);
            mc.add(item2);

            expect(mc.get(1)).toEqual(item1);
            expect(mc.get(2)).toEqual(item2);
        });

        it("should allow a custom getKey implementation", function() {
            mc = new Ext.util.MixedCollection(false, function(item) {
                return item.myKey;
            });

            var item1 = {myKey: 'a', data: 'first item'},
                item2 = {myKey: 'b', data: 'second item'};

            mc.add(item1);
            mc.add(item2);

            expect(mc.get('a')).toEqual(item1);
            expect(mc.get('b')).toEqual(item2);
        });
    });

    describe("iterators", function() {
        var fn, callScope, callCount, item1, item2, item3;

        beforeEach(function() {
            mc = new Ext.util.MixedCollection();

            fn = jasmine.createSpy('fn');
            callCount = 0;

            item1 = {id: 1, name: 'first'};
            item2 = {id: 2, name: 'second'};
            item3 = {id: 3, name: 'third'};

            mc.addAll([item1, item2, item3]);
        });

        describe("each", function() {
            it("should call with the correct scope", function() {
                mc.each(function() {
                    callScope = this;
                }, fakeScope);

                expect(callScope).toBe(fakeScope);
            });

            it("should call the correct number of times", function() {
                mc.each(function() {
                    callCount++;
                });

                expect(callCount).toEqual(3);
            });

            it("should be called with each item", function() {
                mc.each(fn);

                expect(fn).toHaveBeenCalledWith(item1, 0, 3);
                expect(fn).toHaveBeenCalledWith(item2, 1, 3);
                expect(fn).toHaveBeenCalledWith(item3, 2, 3);
            });
        });

        describe("eachKey", function() {
            it("should be called with the correct scope", function() {
                mc.eachKey(function() {
                    callScope = this;
                }, fakeScope);

                expect(callScope).toBe(fakeScope);
            });

            it("should call the correct number of times", function() {
                mc.eachKey(function() {
                    callCount++;
                });

                expect(callCount).toEqual(3);
            });

            it("should be called with each key", function() {
                mc.eachKey(fn);

                expect(fn).toHaveBeenCalledWith(1, item1, 0, 3);
                expect(fn).toHaveBeenCalledWith(2, item2, 1, 3);
                expect(fn).toHaveBeenCalledWith(3, item3, 2, 3);
            });
        });
    });

    describe("adding items", function() {
        beforeEach(function() {
            mc = new Ext.util.MixedCollection();
        });

        it("should add an array of items", function() {
            expect(mc.length).toEqual(0);

            mc.addAll([{id: 1}, {id: 2}]);

            expect(mc.length).toEqual(2);
        });

        it("should fire the add event", function() {
            var executed = false;

            mc.on('add', function() {
                executed = true;
            });

            mc.add({id: 1});

            expect(executed).toBe(true);
        });
        
        describe("falsy values", function(){
            it("should be able to add a 0", function(){
                mc.add('mykey', 0);
                expect(mc.containsKey('mykey')).toBe(true);
                expect(mc.get('mykey')).toBe(0);    
            });
            
            it("should be able to add an empty string", function(){
                mc.add('mykey', '');
                expect(mc.containsKey('mykey')).toBe(true);
                expect(mc.get('mykey')).toBe('');    
            });
            
            it("should be able to add null", function(){
                mc.add('mykey', null);
                expect(mc.containsKey('mykey')).toBe(true);
                expect(mc.get('mykey')).toBeNull();    
            });
            
            it("should be able to add undefined", function(){
                mc.add('mykey', undefined);
                expect(mc.containsKey('mykey')).toBe(true);
                expect(mc.get('mykey')).toBeUndefined();    
            });  
        });
    });

    describe("removing items", function() {
        var item1 = {id: 1, name: 'one'},
            item2 = {id: 2, name: 'two'},
            item3 = {id: 3, name: 'three'},
            item4 = {id: 4, name: 'four'},
            item5 = {id: 5, name: 'five'},
            item6 = {id: 6, name: 'six'},
            item7 = {id: 7, name: 'seven'},
            item8 = {id: 8, name: 'eeight'},
            item9 = {id: 9, name: 'nine'};

        beforeEach(function() {
            mc = new Ext.util.MixedCollection();

            mc.addAll([
                item1, 
                item2, 
                item3, 
                item4, 
                item5, 
                item6, 
                item7, 
                item8, 
                item9
            ]);
        });
        
        describe("remove", function() {
            it("should remove a single item", function() {
                mc.remove(item1);

                expect(mc.getCount()).toEqual(8);
            });
            
            it("should return the removed item", function(){
                expect(mc.remove(item1)).toBe(item1);
            });
            
            it("should return false if no item was found", function(){
                expect(mc.remove({})).toBe(false);    
            });

            it("should fire the remove event", function() {
                var eventO,
                    eventKey;

                mc.on('remove', function(o, key) {
                    eventO = o;
                    eventKey = key;
                });

                mc.remove(item1);

                expect(eventO).toBe(item1);
                expect(eventKey).toBe(1);
            });
        });
        
        describe("removeAt", function() {
            it("should remove a single item", function() {
                mc.removeAt(1);

                expect(mc.getCount()).toEqual(8);
            });
            
            it("should return the removed item", function(){
                expect(mc.removeAt(1)).toBe(item2);
            });
            
            it("should return false if no item was found", function(){
                expect(mc.removeAt(9)).toBe(false);    
            });

            describe("event", function() {
                it("should fire the remove event", function() {
                    var eventO,
                        eventKey;

                    mc.on('remove', function(o, key) {
                        eventO = o;
                        eventKey = key;
                    });

                    mc.removeAt(1);

                    expect(eventO).toBe(item2);
                    expect(eventKey).toBe(2);
                });
                
                it("should update the collection during a remove", function(){
                    var count, item;
                    mc.on('remove', function(){
                        count = mc.getCount();
                        item = mc.getByKey(1);
                    });
                    mc.removeAt(0);
                    expect(count).toBe(8);
                    expect(item).toBeUndefined();
                });
            });
        });
        
        describe("bulkRemove", function(){
            it("should limit the length to that of the collection", function(){
                mc.removeRange(4, 100);
                expect(mc.getCount()).toBe(4);
            });
                
            it("should remove the correct items", function(){
                mc.removeRange(3, 2);
                expect(mc.getCount()).toBe(7);
                expect(mc.getAt(2)).toBe(item3);
                expect(mc.getAt(3)).toBe(item6);
            });    
        });
        
        describe("removeAtKey", function() {
            it("should remove a single item", function() {
                mc.removeAtKey(1);

                expect(mc.getCount()).toEqual(8);
            });
            
            it("should return the removed item", function(){
                expect(mc.removeAtKey(1)).toBe(item1);
            });
            
            it("should return false if no item was found", function(){
                expect(mc.removeAtKey(10)).toBe(false);    
            });

            it("should fire the remove event", function() {
                var eventO,
                    eventKey;

                mc.on('remove', function(o, key) {
                    eventO = o;
                    eventKey = key;
                });

                mc.removeAtKey(2);

                expect(eventO).toBe(item2);
                expect(eventKey).toBe(2);
            });
        });
        
        describe("removeAll", function(){
            it("should remove all items", function(){
                mc.removeAll();  
                expect(mc.getCount()).toBe(0);  
            });
            
            it("should the passed items", function(){
                mc.removeAll([item2]);  
                expect(mc.getCount()).toBe(8);  
            });
            
            it("should fire the remove event with no passed items", function(){
                var called = 0;
                mc.on('remove', function(){
                    ++called;
                });
                mc.removeAll();  
                expect(called).toBe(9);  
            });
            
            it("should fire the remove event when passing items", function(){
                var called = 0;
                mc.on('remove', function(){
                    ++called;
                });
                mc.removeAll([item2]);  
                expect(called).toBe(1);  
            });
        });
    });

    describe("clearing items", function() {
        beforeEach(function() {
            mc = new Ext.util.MixedCollection();

            mc.addAll([{id: 1}, {id: 2}]);
        });

        it("should remove all items", function() {
            expect(mc.length).toEqual(2);

            mc.clear();

            expect(mc.length).toEqual(0);
        });

        it("should fire the clear event", function() {
            var executed = false;

            mc.on('clear', function() {
                executed = true;
            });

            mc.clear();

            expect(executed).toBe(true);
        });
    });

    describe("determining insertion index in a sorted MixedCollection", function() {

        // Items to sort into name order
        var item1 = {id: 2, name: 'Michael'},
            item2 = {id: 3, name: 'Yanto'},
            item3 = {id: 1, name: 'Bill'},

            // Items to find insertion indices for
            item4 = {id: 4, name: 'Albert'}, // Insert index 0 when ASC, 3 when DESC
            item5 = {id: 5, name: 'Fred'},   // Insert index 1 when ASC, 2 when DESC
            item6 = {id: 6, name: 'Robert'}, // Insert index 2 when ASC, 1 when DESC
            item7 = {id: 7, name: 'Zebedee'};// Insert index 3 when ASC, 0 when DESC

        beforeEach(function() {
            mc = new Ext.util.MixedCollection();
            mc.addAll([item1, item2, item3]);
        });

        describe("Sorted ascending", function() {
            it("should find correct insertion indices", function() {
                mc.sort('name');
                expect(mc.findInsertionIndex(item4)).toEqual(0);
                expect(mc.findInsertionIndex(item5)).toEqual(1);
                expect(mc.findInsertionIndex(item6)).toEqual(2);
                expect(mc.findInsertionIndex(item7)).toEqual(3);
            });
        });

        describe("Sorted descending", function() {
            it("should find correct insertion indices", function() {
                mc.sort('name', 'DESC');
                expect(mc.findInsertionIndex(item4)).toEqual(3);
                expect(mc.findInsertionIndex(item5)).toEqual(2);
                expect(mc.findInsertionIndex(item6)).toEqual(1);
                expect(mc.findInsertionIndex(item7)).toEqual(0);
            });
        });
    });

    describe("an existing MixedCollection", function() {
        var item1 = {id: 1, name: 'first'},
            item2 = {id: 2, name: 'second'},
            item3 = {id: 3, name: 'third'},
            item4 = {id: 4, name: 'fourth'},
            item5 = {id: 5, name: 'fifth'},
            item6 = {id: 6, name: 'sixth'},
            item7 = {id: 7, name: 'seventh'},
            item8 = {id: 8, name: 'eighth'},
            item9 = {id: 9, name: 'ninth'};

        beforeEach(function() {
            mc = new Ext.util.MixedCollection();

            mc.addAll([item1, item2, item3]);
        });
        
        describe("updateKey", function(){
            it("should do nothing if the old key doesn't exist", function() {
                mc.updateKey('foo', 'bar');
                expect(mc.getByKey('bar')).toBeUndefined();
            });

            it("should update the key for the item", function(){
                mc.updateKey(1, 20);
                expect(mc.getByKey(1)).toBeUndefined();
                expect(mc.getByKey(20)).toBe(item1);

                // The indexMap must no longer contain the old key
                expect(mc.indexMap[1]).toBe(undefined);
            });

            it("should update the key for the item when the indexMap needs rebuilding", function(){
                mc.insert(0, 'first', 'new');
                mc.updateKey(1, 20);
                expect(mc.getByKey(1)).toBeUndefined();
                expect(mc.getByKey(20)).toBe(item1);

                // The indexMap must no longer contain the old key
                expect(mc.indexMap[1]).toBe(undefined);
            });
        });

        describe("inserting items", function() {
            it("should insert a new item", function() {
                var count = mc.getCount();

                mc.insert(0, item4);

                expect(mc.getCount()).toEqual(count + 1);
            });

            it("should fire the add event", function() {
                var executed = false;

                mc.on('add', function() {
                    executed = true;
                });

                mc.insert(0, item4);

                expect(executed).toBe(true);
            });

            it("should insert the item at the correct location", function() {
                expect(mc.items[0]).toEqual(item1);

                mc.insert(0, item4);

                expect(mc.items[0]).toEqual(item4);
            });
            
            describe("falsy values", function(){
                it("should be able to insert a 0", function(){
                    mc.insert(0, 'mykey', 0);
                    expect(mc.containsKey('mykey')).toBe(true);
                    expect(mc.get('mykey')).toBe(0);    
                });
            
                it("should be able to insert an empty string", function(){
                    mc.insert(0, 'mykey', '');
                    expect(mc.containsKey('mykey')).toBe(true);
                    expect(mc.get('mykey')).toBe('');    
                });
            
                it("should be able to insert null", function(){
                    mc.insert(0, 'mykey', null);
                    expect(mc.containsKey('mykey')).toBe(true);
                    expect(mc.get('mykey')).toBeNull();    
                });
            
                it("should be able to insert undefined", function(){
                    mc.insert(0, 'mykey', undefined);
                    expect(mc.containsKey('mykey')).toBe(true);
                    expect(mc.get('mykey')).toBeUndefined();    
                });  
            });
        });

        describe("replacing items", function() {
            it("should replace the correct item", function() {
                mc.replace(2, item4);

                expect(mc.getAt(1).name).toEqual('fourth');
            });

            it("should not change the count", function() {
                var count = mc.getCount();

                mc.replace(2, item4);

                expect(mc.getCount()).toEqual(count);
            });

            it("should fire the replace event", function() {
                var executed = false;

                mc.on('replace', function() {
                    executed = true;
                }, this);

                mc.replace(2, item4);

                expect(executed).toBe(true);
            });
        });

        describe("cloning", function() {
            it("should copy all items into the new MixedCollection", function() {
                var mc2 = mc.clone();

                expect(mc2.getCount()).toEqual(3);
                expect(mc2.items[0]).toEqual(item1);
                expect(mc2.items[1]).toEqual(item2);
                expect(mc2.items[2]).toEqual(item3);
            });
            
            it("should keep the getKey fn", function(){
                var fn = function(o){
                    return o.id;    
                }, mc1 = new Ext.util.MixedCollection({
                    getKey: fn
                });
                
                var mc2 = mc1.clone();
                expect(mc2.getKey).toBe(fn);
                mc1 = mc2 = null;
            });
        });

        describe("getting items", function() {
            it("should get the first item", function() {
                expect(mc.first()).toEqual(item1);
            });

            it("should get the last item", function() {
                expect(mc.last()).toEqual(item3);
            });

            it("should get by index", function() {
                expect(mc.get(2)).toEqual(item2);
            });

            it("should get an item's key", function() {
                expect(mc.getKey(item1)).toEqual(1);
            });

            it("should return the correct indexOf an item", function() {
                expect(mc.indexOf(item1)).toEqual(0);
            });

            it("should return the correct indexOfKey", function() {
                expect(mc.indexOfKey(2)).toEqual(1);
            });

            it("should return the correct key", function() {
                expect(mc.getByKey(3)).toEqual(item3);
            });

            it("should get an item by index", function() {
                expect(mc.getAt(2)).toEqual(item3);
            });

            it("should get an item by key", function() {
                var item5 = {id: 'a', name: 'fifth item'};

                mc.add(item5);

                expect(mc.get('a')).toEqual(item5);
            });

            it("should return the correct getAt", function() {
                expect(mc.getAt(2)).toEqual(item3);
            });

            describe("when getting a range", function() {
                
                var fill = function(){
                    mc.clear();
                    mc.addAll([
                        item1,
                        item2,
                        item3,
                        item4,
                        item5,
                        item6,
                        item7,
                        item8,
                        item9
                    ]);    
                };
                
                it("should honor the start and limit params", function() {
                    fill();
                    var items = mc.getRange(1, 2);

                    expect(items.length).toEqual(2);
                    expect(items[0]).toEqual(item2);
                    expect(items[1]).toEqual(item3);
                });

                it("should return all items if no params are given", function() {
                    fill();
                    var items = mc.getRange();

                    expect(items.length).toEqual(9);
                    expect(items[0]).toEqual(item1);
                    expect(items[1]).toEqual(item2);
                    expect(items[2]).toEqual(item3);
                    expect(items[8]).toBe(item9);
                });

                it("should return all items to the end if only the start param is given", function() {
                    fill();
                    var items = mc.getRange(1);

                    expect(items.length).toEqual(8);
                    expect(items[0]).toEqual(item2);
                    expect(items[1]).toEqual(item3);
                    expect(items[7]).toEqual(item9);
                });
                
                it("should normalize the start value if < 0", function(){
                    fill();
                    var items = mc.getRange(-3, 2);
                    expect(items.length).toBe(3);
                    expect(items[0]).toEqual(item1);
                });
                
                it("should normalize the end value the collection max", function(){
                    fill();
                    var items = mc.getRange(6, 200);
                    expect(items.length).toBe(3);
                    expect(items[0]).toBe(item7);
                });
                
                it("should return empty if start > length", function(){
                    fill();
                    var items = mc.getRange(10, 15);
                    expect(items.length).toBe(0);
                });
                
                it("should return in reverse order when start > end", function(){
                    fill();
                    var items = mc.getRange(6, 3);
                    expect(items.length).toBe(4);
                    expect(items[0]).toBe(item7);    
                });
            });
        });

        describe("finding items", function() {
            it("should find an item using a passed function", function() {
                var matched = mc.findBy(function(item) {
                    return item.name == 'third';
                });

                expect(matched).toEqual(item3);
            });

            it("should find an item's index", function() {
                var matched = mc.findIndex('name', 'third');

                expect(matched).toEqual(2);
            });

            it("should find an item's index by a function", function() {
                var matched = mc.findIndexBy(function(item) {
                    return item.name == 'second';
                });

                expect(matched).toEqual(1);
            });
        });

        describe("contains", function() {
            it("should contain items that have been added", function() {
                expect(mc.contains(item1)).toBe(true);
            });

            it("should not contain items that have not been added", function() {
                expect(mc.contains({some: 'object'})).toBe(false);
            });

            it("should contain an item by key", function() {
                expect(mc.containsKey(1)).toBe(true);
            });

            it("should not contain a non-contained item by key", function() {
                expect(mc.containsKey(100)).toBe(false);
            });
        });
    });

    describe("filtering", function() {
        var filter, filtered;

        beforeEach(function() {
            mc = new Ext.util.MixedCollection(false, function(item) {
                return item.name;
            });

            mc.addAll([
                {id: 1, name: 'Ed',     code: 'C', modifier: 10},
                {id: 2, name: 'Abe',    code: 'A', modifier: 100},
                {id: 3, name: 'Edward', code: 'B', modifier: 5}
            ]);

            filter = new Ext.util.Filter({
                filterFn: function(item) {
                    return item.name.charAt(0) == 'E';
                }
            });
        });
        
        describe("copying", function() {
            it("should return a new MixedCollection", function() {
                filtered = mc.filter('name', 'Ed');

                expect(filtered instanceof Ext.util.MixedCollection).toBe(true);
                expect(filtered).not.toEqual(mc);
            });
            
            it("should keep the getKey function when using filter", function(){
                var fn = function(o){
                    return o.id;    
                }, mc1 = new Ext.util.MixedCollection({
                    getKey: fn
                });

                var mc2 = mc1.filter('name', 'Ed');
                expect(mc2.getKey).toBe(fn);
                mc1 = mc2 = null;
            });
            
            it("should keep the getKey function when using filterBy", function(){
                var fn = function(o){
                    return o.id;    
                }, mc1 = new Ext.util.MixedCollection({
                    getKey: fn
                });

                var mc2 = mc1.filterBy(function(){
                    return true;
                });
                expect(mc2.getKey).toBe(fn);
                mc1 = mc2 = null;
            });
        });

        describe("when filtering on a key and value pair", function() {
            it("should filter correctly", function() {
                filtered = mc.filter('name', 'Edward');

                expect(filtered.items[0].name).toEqual('Edward');
                expect(filtered.length).toEqual(1);                
            });

            it("should use anyMatch by default", function() {
                filtered = mc.filter('name', 'Ed');

                expect(filtered.length).toEqual(2);
            });
        });

        describe("when filtering using Filter object", function() {
            it("should accept a single Filter", function() {
                filtered = mc.filter(filter);

                expect(filtered.length).toEqual(2);
            });

            it("should accept an array of Filters", function() {
                filtered = mc.filter([filter]);

                expect(filtered.length).toEqual(2);
            });
        });
    });

    describe("sorting", function() {
        beforeEach(function() {
            mc = new Ext.util.MixedCollection(false, function(item) {
                return item.name;
            });

            mc.addAll([
                {id: 1, name: 'Ed',     code: 'C', modifier: 10},
                {id: 2, name: 'Abe',    code: 'A', modifier: 100},
                {id: 3, name: 'Edward', code: 'B', modifier: 5}
            ]);
        });

        it("should sort ASC by default", function() {
            mc.sort('code');

            expect(mc.items[0].code).toEqual('A');
            expect(mc.items[1].code).toEqual('B');
            expect(mc.items[2].code).toEqual('C');
        });

        it("should accept a DESC sort", function() {
            mc.sort('code', "DESC");

            expect(mc.items[2].code).toEqual('A');
            expect(mc.items[1].code).toEqual('B');
            expect(mc.items[0].code).toEqual('C');
        });

        it("should sort with an Ext.util.Sorter", function() {
            mc.sort(new Ext.util.Sorter({
                sorterFn: function(a, b) {
                    return (a.id * a.modifier) - (b.id * b.modifier);
                }
            }));

            expect(mc.items[0].code).toEqual('C');
            expect(mc.items[1].code).toEqual('B');
            expect(mc.items[2].code).toEqual('A');
        });

        it("should perform a directional sort with an Ext.util.Sorter", function() {
            mc.sort(new Ext.util.Sorter({
                direction: 'DESC',
                sorterFn: function(a, b) {
                    return (a.id * a.modifier) - (b.id * b.modifier);
                }
            }));

            expect(mc.items[2].code).toEqual('C');
            expect(mc.items[1].code).toEqual('B');
            expect(mc.items[0].code).toEqual('A');
        });

        it("should fire a sort event", function() {
            var executed = false;

            mc.on('sort', function() {
                executed = true;
            }, this);

            mc.sort('name');

            expect(executed).toBe(true);
        });
    });

    describe("summing", function() {
        describe("simple objects", function() {
            beforeEach(function() {
                mc = new Ext.util.MixedCollection();

                mc.addAll([
                    {amount: 10, name: 'Cool things'},
                    {amount: 20, name: 'Other cool things'},
                    {amount: 30, name: 'Other cool things'},
                    {amount: 40, name: 'Other cool things'}
                ]);
            });

            it("should sum the given property from each item", function() {
                expect(mc.sum('amount')).toEqual(100);
            });

            it("should support a start index", function() {
                expect(mc.sum('amount', undefined, 2)).toEqual(70);
            });

            it("should support an end index", function() {
                expect(mc.sum('amount', undefined, 0, 2)).toEqual(60);
            });
        });

        describe("complex objects", function() {
            beforeEach(function() {
                mc = new Ext.util.MixedCollection();

                mc.addAll([
                    {data: {amount: 10, name: 'Cool things'}},
                    {data: {amount: 20, name: 'Other cool things'}}
                ]);
            });

            it("should sum the given property from each item", function() {
                expect(mc.sum('amount', 'data')).toEqual(30);
            });
        });
    });

    describe("collecting", function() {
        describe("simple objects", function() {
            beforeEach(function() {
                mc = new Ext.util.MixedCollection();

                mc.addAll([
                    {amount: 10, name: 'Ed'},
                    {amount: 20, name: 'Abe'},
                    {amount: 20, name: 'Ed'}
                ]);
            });

            it("should collect the unique properties from each item", function() {
                var items = mc.collect('name');

                expect(items.length).toEqual(2);
            });
        });

        describe("complex objects", function() {
            beforeEach(function() {
                mc = new Ext.util.MixedCollection();

                mc.addAll([
                    {data: {amount: 10, name: 'Ed'}},
                    {data: {amount: 20, name: 'Abe'}},
                    {data: {amount: 20, name: 'Ed'}}
                ]);
            });

            it("should collect the unique properties from each item", function() {
                var items = mc.collect('name', 'data');

                expect(items.length).toEqual(2);
            });
        });
    });

    describe("reordering", function() {
        beforeEach(function() {
            mc = new Ext.util.MixedCollection(false, function(item) {
                return item.name;
            });

            mc.addAll([
                {id: 1, name: 'Ed',     code: 'C', modifier: 10},
                {id: 2, name: 'Abe',    code: 'A', modifier: 100},
                {id: 3, name: 'Edward', code: 'B', modifier: 5}
            ]);
        });

        it("should reorder correctly", function() {
            mc.reorder({
                1: 2,
                2: 0
            });

            expect(mc.items[0].code).toEqual('B');
            expect(mc.items[1].code).toEqual('C');
            expect(mc.items[2].code).toEqual('A');
        });

        it("should fire a sort event", function() {
            var executed = false;

            mc.on('sort', function() {
                executed = true;
            }, this);

            mc.reorder({
                1: 2,
                2: 0
            });

            expect(executed).toBe(true);
        });
    });
    
    describe('adding a MixedCollection to a MixedCollection', function() {
        it('Should add a MixedCollection as a single new item', function() {
            var mc1 = new Ext.util.MixedCollection(false, function(object) {
                    return object.specialName;
                }),
                mc2 = new Ext.util.MixedCollection();

            mc2.specialName = 'mc2Id';
            mc2.add('b', 'c');
            mc1.add(mc2);
            expect(mc1.get('mc2Id').get('b')).toEqual('c');
        });
    });

    describe('adding duplicate items', function() {
        it('should overwrite duplicates', function() {
            var mc1 = new Ext.util.MixedCollection(false, function(object) {
                return object.id;
            }),
            startItems = [{
                id: 1,
                text: 'foo'
            }, {
                id: 2,
                text: 'bar'
            }, {
                id: 1,
                text: 'bletch'
            }, {
                id: 2,
                text: 'zarg'
            }];

            mc1.add(startItems);
            expect(mc1.getCount()).toEqual(2);
            expect(mc1.getAt(0).text).toEqual('bletch');
            expect(mc1.getAt(1).text).toEqual('zarg');
        });
    });
});