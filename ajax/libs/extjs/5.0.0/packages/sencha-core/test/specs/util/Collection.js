describe("Ext.util.Collection", function() {
    var collection, fakeScope = {};

    function logEvents (col, log, property) {
        property = property || 'id';

        col.on({
            beginupdate: function (sender) {
                expect(sender === col).toBe(true);
                log.push('beginupdate');
            },
            add: function (sender, details) {
                expect(sender === col).toBe(true);
                log.push('add ' + Ext.encode(Ext.Array.pluck(details.items, property)) +
                        ' at ' + details.at);
                if (details.keys) {
                    log[log.length - 1] += ' w/keys ' + Ext.encode(details.keys);
                }
            },
            remove: function (sender, details) {
                expect(sender === col).toBe(true);
                log.push('remove ' + Ext.encode(Ext.Array.pluck(details.items, property)) +
                         ' at ' + details.at);
                if (details.keys) {
                    log[log.length - 1] += ' w/keys ' + Ext.encode(details.keys);
                }
            },
            endupdate: function (sender) {
                expect(sender === col).toBe(true);
                log.push('endupdate');
            }
        });
    }

    describe("constructor", function() {
        it("should provide a default getKey implementation", function() {
            collection = new Ext.util.Collection();

            var item1 = {id: 1, data: 'first item'},
                item2 = {id: 2, data: 'second item'};

            collection.add(item1);
            collection.add(item2);

            expect(collection.get(1)).toBe(item1);
            expect(collection.get(2)).toBe(item2);
        });

        it("should allow a custom getKey implementation", function() {
            collection = new Ext.util.Collection({
                keyFn: function(item) {
                    return item.myKey;
                }
            });

            var item1 = {myKey: 'a', data: 'first item'},
                item2 = {myKey: 'b', data: 'second item'};

            collection.add(item1, item2);

            expect(collection.get('a')).toBe(item1);
            expect(collection.get('b')).toBe(item2);
        });
        
        it("should contain the source items when configured with a source", function() {
            var source = new Ext.util.Collection();
            source.add({id: 1}, {id: 2}, {id: 3});
            
            collection = new Ext.util.Collection({
                source: source
            });
            expect(collection.getCount()).toBe(3);
        })
    });

    describe("iterators", function() {
        var fn, callScope, item1, item2, item3;

        beforeEach(function() {
            collection = new Ext.util.Collection();

            fn = jasmine.createSpy('fn');

            item1 = {id: 1, name: 'first'};
            item2 = {id: 2, name: 'second'};
            item3 = {id: 3, name: 'third'};

            collection.add([item1, item2, item3]);
        });

        describe("each", function() {
            it("should call with the correct scope", function() {
                collection.each(function() {
                    callScope = this;
                }, fakeScope);

                expect(callScope).toBe(fakeScope);
            });

            it("should call the correct number of times", function() {
                collection.each(fn);

                expect(fn.callCount).toBe(3);
            });

            it("should be called with each item", function() {
                collection.each(fn);

                expect(fn).toHaveBeenCalledWith(item1, 0, 3);
                expect(fn).toHaveBeenCalledWith(item2, 1, 3);
                expect(fn).toHaveBeenCalledWith(item3, 2, 3);
            });
        });

        describe("eachKey", function() {
            it("should be called with the correct scope", function() {
                collection.eachKey(function() {
                    callScope = this;
                }, fakeScope);

                expect(callScope).toBe(fakeScope);
            });

            it("should call the correct number of times", function() {
                collection.eachKey(fn);

                expect(fn.callCount).toBe(3);
            });

            it("should be called with each key", function() {
                collection.eachKey(fn);

                expect(fn).toHaveBeenCalledWith(1, item1, 0, 3);
                expect(fn).toHaveBeenCalledWith(2, item2, 1, 3);
                expect(fn).toHaveBeenCalledWith(3, item3, 2, 3);
            });
        });
    });

    describe("adding items", function() {
        beforeEach(function() {
            collection = new Ext.util.Collection();
        });

        it("should get the correct count when adding an array", function() {
            collection.add([ { id: 1 }, { id: 2 } ]);

            expect(collection.getCount()).toBe(2);
            expect(collection.length).toBe(2);
        });

        it("should get the correct count when adding varargs", function() {
            collection.add({ id: 1 }, { id: 2 });

            expect(collection.getCount()).toBe(2);
            expect(collection.length).toBe(2);
        });

        it("should get the correct count when adding sequentially", function() {
            collection.add({ id: 1 });
            collection.add({ id: 2 });

            expect(collection.getCount()).toBe(2);
            expect(collection.length).toBe(2);
        });

        it("should fire the add event", function() {
            var executed = false;

            collection.on('add', function() {
                executed = true;
            });

            collection.add({id: 1});

            expect(executed).toBe(true);
        });
        
        describe("with replaceAll", function() {
            it("should add when the collection is empty", function() {
                collection.replaceAll({id: 1});
                expect(collection.getCount()).toBe(1);
            });
            
            it("should remove all existing items", function() {
                var o = {id: 4};
                collection.add({id: 1}, {id: 2}, {id: 3});
                collection.replaceAll(o);
                expect(collection.getCount()).toBe(1);
                expect(collection.first()).toBe(o);
            });
            
            it("should remove even when no items are added", function() {
                collection.add({id: 1}, {id: 2}, {id: 3});
                collection.setDecoder(function() {
                    return false;
                });
                collection.replaceAll({id: 4});
                expect(collection.getCount()).toBe(0);
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
            item8 = {id: 8, name: 'eight'},
            item9 = {id: 9, name: 'nine'};

        beforeEach(function() {
            collection = new Ext.util.Collection();

            collection.add([
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
                collection.remove(item1);

                expect(collection.getCount()).toBe(8);
            });
            
            it("should return the removed item count", function(){
                expect(collection.remove(item1)).toBe(1);
            });

            it("should the passed items array", function(){
                collection.remove([item2, item3]);
                expect(collection.getCount()).toBe(7);
            });

            it("should fire the remove event when passing items array", function () {
                var source = [],
                    details = [];

                collection.on('remove', function (sender, remove) {
                    source.push(sender);
                    details.push(remove);
                });

                collection.remove([item2, item3, item6]);

                expect(source.length).toBe(2);
                expect(source[0] === collection).toBe(true);
                expect(source[1] === collection).toBe(true);

                expect(details[0].at).toBe(5);
                expect(details[0].items.length).toBe(1);
                expect(details[0].items[0]).toBe(item6);
                expect(details[0].keys.length).toBe(1);
                expect(details[0].keys[0]).toBe(6);

                expect(details[1].at).toBe(1);
                expect(details[1].items.length).toBe(2);
                expect(details[1].items[0]).toBe(item2);
                expect(details[1].items[1]).toBe(item3);
                expect(details[1].keys.length).toBe(2);
                expect(details[1].keys[0]).toBe(2);
                expect(details[1].keys[1]).toBe(3);
            });

            it("should return 0 if no item was found", function(){
                expect(collection.remove({ id: 0 })).toBe(0);
            });

            it("should fire the remove event", function() {
                var source, details;

                collection.on('remove', function (sender, remove) {
                    source = sender;
                    details = remove;
                });

                collection.remove(item1);

                expect(source).toBe(collection);
                expect(details.at).toBe(0);
                expect(details.items.length).toBe(1);
                expect(details.items[0]).toBe(item1);
            });
            
            it("should only fire a single event if the items are in a large contiguous range", function() {
                var spy = jasmine.createSpy(),
                    items = [],
                    i;
                    
                for (i = 0; i < 1000; ++i) {
                    items.push({
                        id: i + 1
                    });
                }
                collection.add(items);
                collection.on('remove', spy);
                collection.remove(collection.getRange());
                expect(spy.callCount).toBe(1);
            });
        });
        
        describe("removeAt", function() {
            it("should remove a single item", function() {
                collection.removeAt(1);

                expect(collection.getCount()).toBe(8);
            });
            
            it("should return the removed item", function(){
                expect(collection.removeAt(1)).toBe(item2);
            });
            
            it("should return false if no item was found", function(){
                expect(collection.removeAt(9)).toBeFalsy();
            });

            describe("event", function() {
                it("should fire the remove event", function() {
                    var source, details;

                    collection.on('remove', function (sender, remove) {
                        source = sender;
                        details = remove;
                    });

                    collection.removeAt(1);

                    expect(source).toBe(collection);
                    expect(details.at).toBe(1);
                    expect(details.items.length).toBe(1);
                    expect(details.items[0]).toBe(item2);
                    expect(details.keys.length).toBe(1);
                    expect(details.keys[0]).toBe(2);
                });
                
                it("should update the collection during a remove", function(){
                    var count, item;
                    collection.on('remove', function(){
                        count = collection.getCount();
                        item = collection.getByKey(1);
                    });
                    collection.removeAt(0);
                    expect(count).toBe(8);
                    expect(item).toBeUndefined();
                });
            });

            describe("when filtered", function() {
                it("should remove the correct item with an all inclusive filter", function() {
                    collection.getFilters().add(function() {
                        return true;
                    });
                    collection.removeAt(1);
                    expect(collection.getAt(0)).toBe(item1);
                    expect(collection.getAt(1)).toBe(item3);
                    expect(collection.getCount()).toBe(8);
                });
            });
        });
        
        describe("bulkRemove", function(){
            it("should limit the length to that of the collection", function () {
                collection.removeAt(4, 100);
                expect(collection.getCount()).toBe(4);
            });
                
            it("should remove the correct items", function(){
                collection.removeAt(3, 2);
                expect(collection.getCount()).toBe(7);
                expect(collection.getAt(2)).toBe(item3);
                expect(collection.getAt(3)).toBe(item6);
            });    
        });
        
        describe("removeByKey", function() {
            it("should remove a single item", function() {
                collection.removeByKey(1);

                expect(collection.getCount()).toBe(8);
            });
            
            it("should return the removed item", function(){
                expect(collection.removeByKey(1)).toBe(item1);
            });
            
            it("should return false if no item was found", function(){
                expect(collection.removeByKey(10)).toBeFalsy();
            });

            it("should fire the remove event", function() {
                var source, details;

                collection.on('remove', function (sender, remove) {
                    source = sender;
                    details = remove;
                });

                collection.removeByKey(2);

                expect(source).toBe(collection);
                expect(details.at).toBe(1);
                expect(details.items.length).toBe(1);
                expect(details.items[0]).toBe(item2);
                expect(details.keys.length).toBe(1);
                expect(details.keys[0]).toBe(2);
            });
        });
        
        describe("removeAll", function(){
            it("should remove all items", function(){
                collection.removeAll();  
                expect(collection.getCount()).toBe(0);  
            });
            
            it("should fire the remove event with no passed items", function(){
                var called = 0,
                    source, details;

                collection.on('remove', function (sender, remove) {
                    source = sender;
                    details = remove;
                    ++called;
                });

                collection.removeAll();

                expect(called).toBe(1);
                expect(source).toBe(collection);
                expect(details.at).toBe(0);
                expect(details.items.length).toBe(9);
                expect(details.items).toEqual([item1, item2, item3, item4, item5, item6,
                    item7, item8, item9]);
                expect(details.keys.length).toBe(9);
                expect(details.keys).toEqual([1,2,3,4,5,6,7,8,9]);
            });
        });
    });

    describe("clearing items", function() {
        beforeEach(function() {
            collection = new Ext.util.Collection();

            collection.add([{id: 1}, {id: 2}]);
        });

        it("should remove all items", function() {
            expect(collection.length).toBe(2);

            collection.clear();

            expect(collection.length).toBe(0);
        });

        it("should not fire the remove event", function() {
            var called = 0;

            collection.on('remove', function() {
                ++called;
            });

            collection.clear();

            expect(called).toBe(0);
        });
    });

    describe("determining insertion index in a sorted Collection", function() {

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
            collection = new Ext.util.Collection();
            collection.add([item1, item2, item3]);
        });

        function getInsertIndex (item) {
            collection.add(item);
            var ret = collection.indexOf(item);
            collection.remove(item);
            return ret;
        }

        describe("Sorted ascending", function() {
            it("should find correct insertion indices", function() {
                collection.sort('name');

                expect(getInsertIndex(item4)).toBe(0);
                expect(getInsertIndex(item5)).toBe(1);
                expect(getInsertIndex(item6)).toBe(2);
                expect(getInsertIndex(item7)).toBe(3);
            });
        });

        describe("Sorted descending", function() {
            it("should find correct insertion indices", function() {
                collection.sort('name', 'DESC');

                expect(getInsertIndex(item4)).toBe(3);
                expect(getInsertIndex(item5)).toBe(2);
                expect(getInsertIndex(item6)).toBe(1);
                expect(getInsertIndex(item7)).toBe(0);
            });
        });
    });

    describe("an existing Collection", function() {
        var item1 = {id: 1, name: 'first'},
            item2 = {id: 2, name: 'second'},
            item3 = {id: 3, name: 'third'},
            item4 = {id: 4, name: 'fourth'},
            item5 = {id: 5, name: 'fifth'},
            item6 = {id: 6, name: 'sixth'},
            item7 = {id: 7, name: 'seventh'},
            item8 = {id: 8, name: 'eighth'},
            item9 = {id: 9, name: 'ninth'};
            
        var fill = function(){
            collection.clear();
            collection.add([
                item1,  // 0    -9
                item2,  // 1    -8
                item3,  // 2    -7
                item4,  // 3    -6
                item5,  // 4    -5
                item6,  // 5    -4
                item7,  // 6    -3
                item8,  // 7    -2
                item9   // 8    -1
            ]);
        };

        beforeEach(function() {
            collection = new Ext.util.Collection();

            collection.add([item1, item2, item3]);
        });
        
        describe("updateKey", function(){
            it("should do nothing if the old key doesn't exist", function() {
                collection.updateKey(item1, 'bar');
                expect(collection.getByKey('bar')).toBeUndefined();
            });

            it("should update the key for the item", function () {
                var newItem1 = Ext.apply({}, item1);

                collection.clear();
                collection.add(newItem1, item2, item3);

                newItem1.id = 20;

                collection.updateKey(newItem1, 1);

                expect(collection.getByKey(1)).toBeUndefined();
                expect(collection.getByKey(20)).toBe(newItem1);

                // The index must no longer contain the old key
                expect(collection.indexOfKey(1)).toBe(-1);
                expect(collection.indexOfKey(20)).toBe(0);
            });
        });

        describe("inserting items", function() {
            it("should insert a new item", function() {
                var count = collection.getCount();

                collection.insert(0, item4);

                expect(collection.getCount()).toBe(count + 1);
            });

            it("should fire the add event", function() {
                var called = 0,
                    source, details;

                collection.on('add', function (sender, add) {
                    ++called;
                    source = sender;
                    details = add;
                });

                collection.insert(0, item4);

                expect(called).toBe(1);
                expect(source).toBe(collection);
                expect(details.at).toBe(0);
                expect(details.items.length).toBe(1);
                expect(details.items[0]).toBe(item4);
                expect(details.keys.length).toBe(1);
                expect(details.keys[0]).toBe(4);
            });

            it("should insert the item at the correct location", function() {
                expect(collection.items[0]).toBe(item1);

                collection.insert(0, item4);

                expect(collection.items[0]).toBe(item4);
            });
        });

        describe("replacing items", function() {
            it("should replace the correct item", function() {
                collection.splice(1, 1, [item4]);

                expect(collection.getAt(1)).toBe(item4);
            });

            it("should not change the count", function() {
                var count = collection.getCount();

                collection.splice(1, 1, [item4]);

                expect(collection.getCount()).toBe(count);
            });

            it("should fire the proper events", function() {
                var log = [];

                logEvents(collection, log, 'name');

                collection.splice(1, 1, [item4]);

                expect(log).toEqual([
                    'beginupdate',
                    'remove ["second"] at 1 w/keys [2]',
                    'add ["fourth"] at 1 w/keys [4]',
                    'endupdate'
                ]);
            });
        });

        describe("cloning", function() {
            it("should copy all items into the new Collection", function() {
                var mc2 = collection.clone();

                expect(mc2.getCount()).toBe(3);
                expect(mc2.items[0]).toBe(item1);
                expect(mc2.items[1]).toBe(item2);
                expect(mc2.items[2]).toBe(item3);
            });
            
            it("should keep the getKey fn", function(){
                var fn = function(o){
                    return o.id;    
                }, mc1 = new Ext.util.Collection({
                    keyFn: fn
                });
                
                var mc2 = mc1.clone();
                expect(mc2.getKey).toBe(fn);
                mc1 = mc2 = null;
            });
        });

        describe("getting items", function() {
            
            it("should get an item's key", function() {
                expect(collection.getKey(item1)).toBe(1);
            });
            
            describe("first", function() {
                it("should get the first item", function() {
                    expect(collection.first()).toBe(item1);
                });
                
                it("should return undefined if the collection is empty", function() {
                    collection = new Ext.util.Collection();
                    expect(collection.first()).toBeUndefined();
                });
            });
            
            describe("last", function() {
                it("should get the last item", function() {
                    expect(collection.last()).toBe(item3);
                });
                
                it("should return undefined if the collection is empty", function() {
                    collection = new Ext.util.Collection();
                    expect(collection.last()).toBeUndefined();
                });
            });
            
            describe("get", function() {
                it("should get by key", function() {
                    expect(collection.get(2)).toBe(item2);
                });
                
                it("should return undefined if the key doesn't exist", function() {
                    expect(collection.get(100)).toBeUndefined();
                });
                
                it("should get an newly added item", function() {
                    var item5 = {id: 'a', name: 'fifth item'};
                    collection.add(item5);
                    expect(collection.get('a')).toBe(item5);
                });
            });

            describe("indexOf", function() {
                it("should return the correct indexOf an item", function() {
                    expect(collection.indexOf(item1)).toBe(0);
                });
                
                it("should return -1 if the item does not exist in the collection", function() {
                    expect(collection.indexOf({id: 73})).toBe(-1);
                });
                
                it("should handle null", function() {
                    expect(collection.indexOf(null)).toBe(-1);
                });
            });
            
            describe("indexOfKey", function() {
                it("should return the correct indexOfKey", function() {
                    expect(collection.indexOfKey(2)).toBe(1);
                });
                
                it("should return -1 if the key does not exist", function() {
                    expect(collection.indexOfKey(42)).toBe(-1);
                });
            });
            
            describe("get by key", function() {
                it("should return the correct key", function() {
                    expect(collection.getByKey(3)).toBe(item3);
                });
                
                it("should return undefined if the key does not exist", function() {
                    expect(collection.getByKey(1200)).toBeUndefined();
                });
            });
            
            describe("getAt", function() {
                it("should get an item by index", function() {
                    expect(collection.getAt(2)).toBe(item3);
                });
                
                it("should return undefined if the index is out of bounds", function() {
                    expect(collection.getAt(33)).toBeUndefined();
                });
            });

            describe("when getting a range", function() {
                it("should honor the start and limit params", function() {
                    fill();
                    var items = collection.getRange(1, 3);

                    expect(items.length).toBe(2);
                    expect(items[0]).toBe(item2);
                    expect(items[1]).toBe(item3);
                });

                it("should return all items if no params are given", function() {
                    fill();
                    var items = collection.getRange();

                    expect(items.length).toBe(9);
                    expect(items[0]).toBe(item1);
                    expect(items[1]).toBe(item2);
                    expect(items[2]).toBe(item3);
                    expect(items[8]).toBe(item9);
                });

                it("should return all items to the end if only the start param is given", function() {
                    fill();
                    var items = collection.getRange(1);

                    expect(items.length).toBe(8);
                    expect(items[0]).toBe(item2);
                    expect(items[1]).toBe(item3);
                    expect(items[7]).toBe(item9);
                });
                
                it("should wrap the start value if negative", function(){
                    fill();
                    var items = collection.getRange(-6, 6);
                    expect(items.length).toBe(3);
                    expect(items[0]).toBe(item4);
                    expect(items[1]).toBe(item5);
                    expect(items[2]).toBe(item6);
                });
                
                it("should normalize the end value the collection max", function(){
                    fill();
                    var items = collection.getRange(6, 200);
                    expect(items.length).toBe(3);
                    expect(items[0]).toBe(item7);
                });
                
                it("should return empty if start > length", function(){
                    fill();
                    var items = collection.getRange(10, 15);
                    expect(items.length).toBe(0);
                });
            });
        });

        describe("finding items", function() {
            describe("findBy", function() {
                beforeEach(function() {
                    fill();
                });
                
                it("should find an item using a passed function", function() {
                    var matched = collection.findBy(function(item) {
                        return item.name === 'third';
                    });

                    expect(matched).toBe(item3);
                });
                
                it("should stop iterating once a match is found", function() {
                    var count = 0;
                    collection.findBy(function(item) {
                        ++count;
                        return item.name === 'third';
                    });

                    expect(count).toBe(3);
                });
                
                it("should return null if the item is not matched", function() {
                    var matched = collection.findBy(function(item) {
                        return false;
                    });
                    expect(matched).toBeNull();
                });
                
                it("should pass the item and the key", function() {
                    var spy = jasmine.createSpy().andReturn(true);
                    collection.findBy(spy);
                    expect(spy).toHaveBeenCalledWith(item1, 1);
                });
                
                describe("scope", function() {
                    it("should default the scope to the collection", function() {
                        var scope;
                        collection.findBy(function() {
                            scope = this;
                            return true;
                        });
                        expect(scope).toBe(collection);
                    });
                    
                    it("should use the passed scope", function() {
                        var scope;
                        collection.findBy(function() {
                            scope = this;
                            return true;
                        }, fakeScope);
                        expect(scope).toBe(fakeScope);
                    });
                });
                
                describe("start", function() {
                    it("should not iterate at all if start > length", function() {
                        var count = 0;
                        collection.findBy(function() {
                            ++count;
                        }, null, 1000);
                        expect(count).toBe(0);
                    });
                    
                    it("should start from the passed index", function() {
                        var keys = [];
                        collection.findBy(function(item, key) {
                            keys.push(key);
                        }, null, 4);
                        expect(keys.join(',')).toBe('5,6,7,8,9');
                    });
                    
                    it("should not wrap around", function() {
                        var matched = collection.findBy(function(item) {
                            return item.name === 'second';
                        }, null, 6);
                        expect(matched).toBeNull();
                    });
                    
                    it("should find an item after the start", function() {
                        var matched = collection.findBy(function(item) {
                            return item.name === 'third' || item.name === 'ninth';
                        }, null, 5);
                        expect(matched).toBe(item9);
                    });
                });
            });
            
            describe("findIndexBy", function() {
                beforeEach(function() {
                    fill();
                });
                
                it("should find an item using a passed function", function() {
                    var index = collection.findIndexBy(function(item) {
                        return item.name === 'third';
                    });

                    expect(index).toBe(2);
                });
                
                it("should stop iterating once a match is found", function() {
                    var count = 0;
                    collection.findIndexBy(function(item) {
                        ++count;
                        return item.name === 'third';
                    });

                    expect(count).toBe(3);
                });
                
                it("should return -1 if the item is not matched", function() {
                    var index = collection.findIndexBy(function(item) {
                        return false;
                    });
                    expect(index).toBe(-1);
                });
                
                it("should pass the item and the key", function() {
                    var spy = jasmine.createSpy().andReturn(true);
                    collection.findIndexBy(spy);
                    expect(spy).toHaveBeenCalledWith(item1, 1);
                });
                
                describe("scope", function() {
                    it("should default the scope to the collection", function() {
                        var scope;
                        collection.findIndexBy(function() {
                            scope = this;
                            return true;
                        });
                        expect(scope).toBe(collection);
                    });
                    
                    it("should use the passed scope", function() {
                        var scope;
                        collection.findIndexBy(function() {
                            scope = this;
                            return true;
                        }, fakeScope);
                        expect(scope).toBe(fakeScope);
                    });
                });
                
                describe("start", function() {
                    it("should not iterate at all if start > length", function() {
                        var count = 0;
                        collection.findIndexBy(function() {
                            ++count;
                        }, null, 1000);
                        expect(count).toBe(0);
                    });
                    
                    it("should start from the passed index", function() {
                        var keys = [];
                        collection.findIndexBy(function(item, key) {
                            keys.push(key);
                        }, null, 4);
                        expect(keys.join(',')).toBe('5,6,7,8,9');
                    });
                    
                    it("should not wrap around", function() {
                        var index = collection.findIndexBy(function(item) {
                            return item.name === 'second';
                        }, null, 6);
                        expect(index).toBe(-1);
                    });
                    
                    it("should find an item after the start", function() {
                        var index = collection.findIndexBy(function(item) {
                            return item.name === 'third' || item.name === 'ninth';
                        }, null, 5);
                        expect(index).toBe(8);
                    });
                });
            });

            describe("findIndex", function() {
                beforeEach(function() {
                    fill();
                });
                
                it("should find an item's index", function() {
                    var index = collection.findIndex('name', 'third');
                    expect(index).toBe(2);
                });
                
                it("should return -1 if there is no match", function() {
                    var index = collection.findIndex('name', 'foo');
                    expect(index).toBe(-1);
                });
                
                it("should respect the root property", function() {
                    collection = new Ext.util.Collection({
                        rootProperty: 'root'
                    });
                    collection.add({
                        id: 1,
                        root: {
                            name: 'A'
                        }
                    }, {
                        id: 2,
                        root: {
                            name: 'B'
                        }
                    }, {
                        id: 3,
                        root: {
                            name: 'C'
                        }
                    });
                    var index = collection.findIndex('name', 'B');
                    expect(index).toBe(1);
                });
                
                describe("options", function() {
                    describe("startIndex", function() {
                        it("should match from the startIndex, including the start", function() {
                            var index = collection.findIndex('name', 's', 6, null, false);
                            expect(index).toBe(6);
                        });
                    
                        it("should find items after the startIndex", function() {
                            var index = collection.findIndex('name', 's', 4, null, false);
                            expect(index).toBe(5);
                        });
                    
                        it("should return -1 if the startIndex is larger than the length", function() {
                            var index = collection.findIndex('name', 's', 100);
                            expect(index).toBe(-1);
                        });
                    
                        it("should not 'wrap' over the collection", function() {
                            var index = collection.findIndex('name', 'one', 2);
                            expect(index).toBe(-1);
                        });
                    });
                    
                    describe("regex options", function() {
                        describe("startsWith/endsWith", function() {
                            it("should default startsWith & endsWith to true", function() {
                                var index = collection.findIndex('name', 'second');
                                expect(index).toBe(1);
                                index = collection.findIndex('name', 'secon');
                                expect(index).toBe(-1);
                                index = collection.findIndex('name', 'econd');
                                expect(index).toBe(-1);
                            });
                            
                            it("should match the start of the string when passing endsWith: false", function() {
                                var index = collection.findIndex('name', 'second', null, null, false);
                                expect(index).toBe(1);
                                index = collection.findIndex('name', 'secon', null, null, false);
                                expect(index).toBe(1);
                                index = collection.findIndex('name', 'econd', null, null, false);
                                expect(index).toBe(-1);
                            });
                        
                            it("should match the end of the string when passing startsWith: false", function() {
                                var index = collection.findIndex('name', 'second', null, false);
                                expect(index).toBe(1);
                                index = collection.findIndex('name', 'econd', null, false);
                                expect(index).toBe(1);
                                index = collection.findIndex('name', 'secon', null, false);
                                expect(index).toBe(-1);
                            });
                            
                            it("should match anywhere in the string when using startsWith/endsWith false", function() {
                                var index = collection.findIndex('name', 'con', null, false, false);
                                expect(index).toBe(1);
                            });
                        });
                        
                        describe("case", function() {
                            it("should be case insensitive by default", function() {
                                var index = collection.findIndex('name', 'SEVENTH');
                                expect(index).toBe(6);
                            });
                            
                            it("should respect case when passing the ignoreCase flag", function() {
                                var index = collection.findIndex('name', 'SEVENTH', null, null, null, false);
                                expect(index).toBe(-1);
                            });
                        });
                    });
                });
            });
        });

        describe("contains", function() {
            it("should contain items that have been added", function() {
                expect(collection.contains(item1)).toBe(true);
            });

            it("should not contain items that have not been added", function() {
                expect(collection.contains({ id: 0 })).toBe(false);
            });

            it("should contain an item by key", function() {
                expect(collection.containsKey(1)).toBe(true);
            });

            it("should not contain a non-contained item by key", function() {
                expect(collection.containsKey(100)).toBe(false);
            });
        });
    });

    describe("createFiltered", function() {
        var filter, filtered;

        beforeEach(function() {
            collection = new Ext.util.Collection({
                keyFn: function(item) {
                    return item.name;
                }
            });

            collection.add([
                {id: 1, name: 'Ed',     code: 'C', modifier: 10},
                {id: 2, name: 'Abe',    code: 'A', modifier: 100},
                {id: 3, name: 'Edward', code: 'B', modifier: 5}
            ]);

            filter = new Ext.util.Filter({
                filterFn: function(item) {
                    return item.name.charAt(0) === 'E';
                }
            });
        });
        
        describe("copying", function() {
            it("should return a new Collection", function() {
                filtered = collection.createFiltered('name', 'Ed');

                expect(filtered instanceof Ext.util.Collection).toBe(true);
                expect(filtered).not.toBe(collection);
            });
            
            it("should keep the getKey function when using filter", function(){
                var fn = function(o){
                    return o.id;    
                }, mc1 = new Ext.util.Collection({
                    keyFn: fn
                });

                var mc2 = mc1.createFiltered('name', 'Ed');
                expect(mc2.getKey).toBe(fn);
                mc1 = mc2 = null;
            });
            
            it("should keep the getKey function when using filterBy", function(){
                var fn = function(o){
                    return o.id;    
                }, mc1 = new Ext.util.Collection({
                    keyFn: fn
                });

                var mc2 = mc1.createFiltered(function(){
                    return true;
                });
                expect(mc2.getKey).toBe(fn);
                mc1 = mc2 = null;
            });
        });

        describe("when filtering on a key and value pair", function() {
            it("should filter correctly", function() {
                filtered = collection.createFiltered('name', 'Edward');

                expect(filtered.items[0].name).toBe('Edward');
                expect(filtered.length).toBe(1);                
            });

            it("should use anyMatch by default", function () {
                filtered = collection.createFiltered('name', 'Ed');

                expect(filtered.length).toBe(2);
            });
            
            it("should respect the root property", function() {
                collection = new Ext.util.Collection({
                    rootProperty: 'root'
                });
                collection.add({
                    id: 1,
                    root: {
                        name: 'A'
                    }
                }, {
                    id: 2,
                    root: {
                        name: 'B'
                    }
                });
                filtered = collection.createFiltered('name', 'A');
                expect(filtered.getCount()).toBe(1);
            });
        });

        describe("when filtering using Filter object", function() {
            it("should accept a single Filter", function() {
                filtered = collection.createFiltered(filter);

                expect(filtered.length).toBe(2);
            });
            
            it("should respect the root property", function() {
                collection = new Ext.util.Collection({
                    rootProperty: 'root'
                });
                collection.add({
                    id: 1,
                    root: {
                        name: 'A'
                    }
                }, {
                    id: 2,
                    root: {
                        name: 'B'
                    }
                });
                filtered = collection.createFiltered(new Ext.util.Filter({
                    property: 'name',
                    value: 'A'
                }));
                expect(filtered.getCount()).toBe(1);
            });
            
            describe("array of filters", function() {
                it("should accept an array of Filters", function() {
                    filtered = collection.createFiltered([filter]);
                    expect(filtered.length).toBe(2);
                });
                
                it("should respect the root property", function() {
                    collection = new Ext.util.Collection({
                        rootProperty: 'root'
                    });
                    collection.add({
                        id: 1,
                        root: {
                            name: 'A'
                        }
                    }, {
                        id: 2,
                        root: {
                            name: 'B'
                        }
                    });
                    filtered = collection.createFiltered([new Ext.util.Filter({
                        property: 'name',
                        value: 'A'
                    })]);
                    expect(filtered.getCount()).toBe(1);
                });
            });
        });
    }); // createFiltered

    describe("filters collection management", function() {
        var item0  = { id: 0,  name: 'abba' },
            item1  = { id: 1,  name: 'aaa' },
            item2  = { id: 2,  name: 'bad' },
            item3  = { id: 3,  name: 'ccc' },
            item4  = { id: 4,  name: 'abc' },
            item5  = { id: 5,  name: 'bcd' },
            item6  = { id: 6,  name: 'cde' },
            item7  = { id: 7,  name: 'xyz' },
            item8  = { id: 8,  name: 'ddd' },
            item9  = { id: 9,  name: 'dad' },
            item10 = { id: 10, name: 'dood'};

        beforeEach(function() {
            collection = new Ext.util.Collection();
            collection.add(item1, item2, item3, item4, item5, item6, item7, item8, item9);
        });

        describe('single filter', function () {
            it('should save original items on filter and restore on clear', function () {
                var refreshes = 0,
                    filters = collection.getFilters();

                collection.on('refresh', function () {
                    ++refreshes;
                });

                expect(collection.length).toBe(9);
                expect(filters.length).toBe(0);
                expect(collection.filtered).toBe(false);

                filters.add({ property: 'name', value: 'a' });

                expect(refreshes).toBe(1);
                expect(filters.length).toBe(1);
                expect(collection.filtered).toBe(true);
                expect(collection.length).toBe(2);
                expect(collection.items[0]).toBe(item1);
                expect(collection.items[1]).toBe(item4);

                filters.removeAll();

                expect(refreshes).toBe(2);
                expect(filters.length).toBe(0);
                expect(collection.filtered).toBe(false);
                expect(collection.length).toBe(9);
                expect(collection.items[0]).toBe(item1);
                expect(collection.items[1]).toBe(item2);
                expect(collection.items[2]).toBe(item3);
                expect(collection.items[3]).toBe(item4);
                expect(collection.items[4]).toBe(item5);
                expect(collection.items[5]).toBe(item6);
                expect(collection.items[6]).toBe(item7);
                expect(collection.items[7]).toBe(item8);
                expect(collection.items[8]).toBe(item9);
            });

            it('should add items even when filtered', function () {
                var refreshes = 0,
                    filters = collection.getFilters();

                collection.on('refresh', function () {
                    ++refreshes;
                });

                expect(collection.length).toBe(9);
                expect(filters.length).toBe(0);
                expect(collection.filtered).toBe(false);

                filters.add({ property: 'name', value: 'a' });

                expect(refreshes).toBe(1);
                expect(filters.length).toBe(1);
                expect(collection.filtered).toBe(true);
                expect(collection.length).toBe(2);
                expect(collection.items[0]).toBe(item1);
                expect(collection.items[1]).toBe(item4);

                // item0 matches the filter so should appear in the collection now but
                // item10 does not match and should be added to the unfiltered collection
                // instead.
                collection.add(item0, item10);

                expect(collection.length).toBe(3);
                expect(collection.items[0]).toBe(item1);
                expect(collection.items[1]).toBe(item4);
                expect(collection.items[2]).toBe(item0);

                filters.removeAll();

                expect(refreshes).toBe(2);
                expect(filters.length).toBe(0);
                expect(collection.filtered).toBe(false);
                expect(collection.length).toBe(11);
                expect(collection.items[0]).toBe(item1);
                expect(collection.items[1]).toBe(item2);
                expect(collection.items[2]).toBe(item3);
                expect(collection.items[3]).toBe(item4);
                expect(collection.items[4]).toBe(item5);
                expect(collection.items[5]).toBe(item6);
                expect(collection.items[6]).toBe(item7);
                expect(collection.items[7]).toBe(item8);
                expect(collection.items[8]).toBe(item9);
                expect(collection.items[9]).toBe(item0);
                expect(collection.items[10]).toBe(item10);
            });

            it('should sort the filtered items', function () {
                var refreshes = 0,
                    filters = collection.getFilters();

                collection.on('refresh', function () {
                    ++refreshes;
                });

                expect(collection.length).toBe(9);
                expect(filters.length).toBe(0);
                expect(collection.filtered).toBe(false);

                filters.add({ property: 'name', value: 'a' });

                expect(refreshes).toBe(1);
                expect(filters.length).toBe(1);
                expect(collection.filtered).toBe(true);
                expect(collection.length).toBe(2);
                expect(collection.items[0]).toBe(item1);
                expect(collection.items[1]).toBe(item4);

                // item0 matches the filter so should appear in the collection now but
                // item10 does not match and should be added to the unfiltered collection
                // instead.
                collection.add(item0, item10);

                expect(collection.length).toBe(3);
                expect(collection.items[0]).toBe(item1);
                expect(collection.items[1]).toBe(item4);
                expect(collection.items[2]).toBe(item0);

                collection.sort('name');

                expect(collection.length).toBe(3);
                expect(collection.items[0]).toBe(item1); // aaa
                expect(collection.items[1]).toBe(item0); // abba
                expect(collection.items[2]).toBe(item4); // abc

                filters.removeAll();

                expect(refreshes).toBe(2);
                expect(filters.length).toBe(0);
                expect(collection.filtered).toBe(false);
                expect(collection.length).toBe(11);
                expect(collection.items[0]).toBe(item1);
                expect(collection.items[1]).toBe(item0);
                expect(collection.items[2]).toBe(item4);
                expect(collection.items[3]).toBe(item2);
                expect(collection.items[4]).toBe(item5);
                expect(collection.items[5]).toBe(item3);
                expect(collection.items[6]).toBe(item6);
                expect(collection.items[7]).toBe(item9);
                expect(collection.items[8]).toBe(item8);
                expect(collection.items[9]).toBe(item10);
                expect(collection.items[10]).toBe(item7);
            });
        }); // single filter

        describe('configurable and detachable', function () {
            it('should allow filters to be configured', function () {
                var refreshes = 0;

                collection = new Ext.util.Collection({
                    filters: { property: 'name', value: 'a' },
                    listeners: {
                        refresh: function () {
                            ++refreshes;
                        }
                    }
                });

                expect(collection.filtered).toBe(true);
                expect(collection.length).toBe(0);

                var filters = collection.getFilters();
                expect(filters.length).toBe(1);

                collection.add(item1, item2, item3, item4, item5, item6, item7, item8, item9);

                expect(refreshes).toBe(0);
                expect(filters.length).toBe(1);
                expect(collection.filtered).toBe(true);
                expect(collection.length).toBe(2);
                expect(collection.items[0]).toBe(item1);
                expect(collection.items[1]).toBe(item4);

                // item0 matches the filter so should appear in the collection now but
                // item10 does not match and should be added to the unfiltered collection
                // instead.
                collection.add(item0, item10);

                expect(collection.length).toBe(3);
                expect(collection.items[0]).toBe(item1);
                expect(collection.items[1]).toBe(item4);
                expect(collection.items[2]).toBe(item0);
            });

            it('should allow filters to be detached', function () {
                var refreshes = 0;

                collection = new Ext.util.Collection({
                    filters: { property: 'name', value: 'a' },
                    listeners: {
                        refresh: function () {
                            ++refreshes;
                        }
                    }
                });

                expect(collection.filtered).toBe(true);
                expect(collection.length).toBe(0);

                var filters = collection.getFilters();
                expect(filters.length).toBe(1);

                collection.add(item1, item2, item3, item4, item5, item6, item7, item8, item9);
                collection.add(item0, item10);

                //filters.removeAll();
                collection.setFilters(null);

                expect(refreshes).toBe(1);
                expect(filters.length).toBe(1);
                expect(collection.filtered).toBe(false);
                expect(collection.length).toBe(11);
                expect(collection.items[0]).toBe(item1);
                expect(collection.items[1]).toBe(item2);
                expect(collection.items[2]).toBe(item3);
                expect(collection.items[3]).toBe(item4);
                expect(collection.items[4]).toBe(item5);
                expect(collection.items[5]).toBe(item6);
                expect(collection.items[6]).toBe(item7);
                expect(collection.items[7]).toBe(item8);
                expect(collection.items[8]).toBe(item9);
                expect(collection.items[9]).toBe(item0);
                expect(collection.items[10]).toBe(item10);

                collection.setFilters(filters);

                expect(refreshes).toBe(2);
                expect(filters.length).toBe(1);
                expect(collection.filtered).toBe(true);

                expect(collection.length).toBe(3);
                expect(collection.items[0]).toBe(item1);
                expect(collection.items[1]).toBe(item4);
                expect(collection.items[2]).toBe(item0);
            });

            it('should allow detached filters to be manipulated', function () {
                var refreshes = 0;

                collection = new Ext.util.Collection({
                    filters: { property: 'name', value: 'a' },
                    listeners: {
                        refresh: function () {
                            ++refreshes;
                        }
                    }
                });

                expect(collection.filtered).toBe(true);
                expect(collection.length).toBe(0);

                var filters = collection.getFilters();
                expect(filters.length).toBe(1);

                collection.add(item1, item2, item3, item4, item5, item6, item7, item8, item9);
                collection.add(item0, item10);

                //filters.removeAll();
                collection.setFilters(null);

                expect(refreshes).toBe(1);
                expect(filters.length).toBe(1);
                expect(collection.filtered).toBe(false);
                expect(collection.length).toBe(11);
                expect(collection.items[0]).toBe(item1);
                expect(collection.items[1]).toBe(item2);
                expect(collection.items[2]).toBe(item3);
                expect(collection.items[3]).toBe(item4);
                expect(collection.items[4]).toBe(item5);
                expect(collection.items[5]).toBe(item6);
                expect(collection.items[6]).toBe(item7);
                expect(collection.items[7]).toBe(item8);
                expect(collection.items[8]).toBe(item9);
                expect(collection.items[9]).toBe(item0);
                expect(collection.items[10]).toBe(item10);

                filters.removeAll();
                expect(refreshes).toBe(1);
                expect(filters.length).toBe(0);
                expect(collection.filtered).toBe(false);
                expect(collection.length).toBe(11);

                filters.add({ property: 'name', value: 'd' });
                expect(refreshes).toBe(1);
                expect(filters.length).toBe(1);
                expect(collection.filtered).toBe(false);
                expect(collection.length).toBe(11);

                collection.setFilters(filters);

                expect(refreshes).toBe(2);
                expect(filters.length).toBe(1);
                expect(collection.filtered).toBe(true);

                expect(collection.length).toBe(3);
                expect(collection.items[0]).toBe(item8);
                expect(collection.items[1]).toBe(item9);
                expect(collection.items[2]).toBe(item10);
            });
        });
        
        describe("events", function() {
            it("should fire the filter event after filtering has taken place", function() {
                var count;
                collection.on('filter', function() {
                    count = collection.getCount();
                });
                collection.getFilters().add({
                    filterFn: function(item) {
                        return Ext.String.startsWith(item.name, 'a');
                    }
                });
                expect(count).toBe(2);
            });
        });
    });
    
    describe("grouping", function() {
        var item0, item1, item2, item3, item4, item5, item6, item7, item8, item9,
            groups;
            
        function groupBy(property, direction) {
            collection.setGrouper({
                property: property || 'group',
                direction: direction
            });
        }
        
        function clearGroup() {
            collection.setGrouper(null);
        }
        
        function sortBy(property, direction) {
            collection.getSorters().add({
                property: property || 'sortKey',
                direction: direction
            });
        }
        
        function filterBy(property, value) {
            collection.getFilters().add({
                property: property || 'isFilter',
                value: Ext.isDefined(value) ? value : true
            });
        }
        
        beforeEach(function() {
            collection = new Ext.util.Collection();
            collection.add(
                (item0 = {id: 0, name: 'Item0', group: 'A', sortKey: 3, isFilter: false, age: 10}),
                (item1 = {id: 1, name: 'Item1', group: 'A', sortKey: 1, isFilter: true,  age: 30}),
                (item2 = {id: 2, name: 'Item2', group: 'A', sortKey: 2, isFilter: false, age: 20}),
                (item3 = {id: 3, name: 'Item3', group: 'B', sortKey: 2, isFilter: true,  age: 60}),
                (item4 = {id: 4, name: 'Item4', group: 'B', sortKey: 3, isFilter: false, age: 50}),
                (item5 = {id: 5, name: 'Item5', group: 'B', sortKey: 1, isFilter: true,  age: 40}),
                (item6 = {id: 6, name: 'Item6', group: 'C', sortKey: 1, isFilter: false, age: 80}),
                (item7 = {id: 7, name: 'Item7', group: 'C', sortKey: 2, isFilter: true,  age: 70}),
                (item8 = {id: 8, name: 'Item8', group: 'C', sortKey: 3, isFilter: false, age: 90}),
                (item9 = {id: 9, name: 'Item9', group: 'D', sortKey: 1, isFilter: true,  age: 100})
            );
        });
        
        afterEach(function() {
            groups = item0 = item2 = item3 = item4 = item5 = item6 = item7 = item8 = item9 = null;
        });
        
        it("should return an Ext.util.GroupCollection", function() {
            groupBy();
            groups = collection.getGroups();
            expect(groups instanceof Ext.util.GroupCollection).toBe(true);
        });
        
        it("should group by the specified key", function() {
            groupBy();
            groups = collection.getGroups();
            expect(groups.length).toBe(4);
        });
        
        it("should have the appropriate item in each group", function() {
            groupBy();
            groups = collection.getGroups();
            groups.each(function(group) {
                var key = group.getGroupKey();
                group.each(function(item) {
                    expect(item.group).toBe(key);
                });
            });
        });
        
        describe("clearing groups", function() {
            it("should return no groups by default", function() {
                collection = new Ext.util.Collection();
                expect(collection.getGroups()).toBeNull();
            }); 
            
            it("should return no groups once the grouper has cleared", function() {
                groupBy();
                collection.getGroups();
                clearGroup();
                expect(collection.getGroups()).toBeNull();
            });
        });
        
        describe("dynamic manipulation", function() {
            describe("adding", function() {
                it("should add to an existing group", function() {
                    groupBy();
                    var o = {
                        id: 'new',
                        group: 'D'
                    }, d;
                    
                    collection.add(o);
                    d = collection.getGroups().get('D');
                    expect(d.length).toBe(2);
                    expect(d.contains(o)).toBe(true);
                });
                
                it("should create a new group", function() {
                    groupBy();
                    expect(collection.getGroups().get('E')).toBeUndefined();
                    var o = {
                        id: 'new',
                        group: 'E'
                    }, e;
                    
                    collection.add(o);
                    e = collection.getGroups().get('E');
                    expect(e.length).toBe(1);
                    expect(e.contains(o)).toBe(true);
                });
            });
            
            describe("removing", function() {
                it("should remove from an existing group", function() {
                    groupBy();
                    collection.remove(item0);
                    var a = collection.getGroups().get('A');
                    expect(a.length).toBe(2);
                    expect(a.contains(item0)).toBe(false);
                });
                
                it("should remove a group", function() {
                    groupBy();
                    collection.remove(item9);
                    expect(collection.getGroups().get('D')).toBeUndefined();
                });
            });
            
            describe("updating", function() {
                it("should move the item if the group changes", function() {
                    groupBy();
                    item0.group = 'D';
                    collection.itemChanged(item0);
                    
                    var a = collection.getGroups().get('A'),
                        d = collection.getGroups().get('D');
                        
                    expect(d.length).toBe(2);
                    expect(d.contains(item0)).toBe(true);
                    expect(a.length).toBe(2);
                    expect(a.contains(item0)).toBe(false);
                });
            });
        });
        
        describe("sorting", function() {
            function expectOrder(items, c) {
                var len = items.length,
                    i;
                
                c = c || collection;
                for (i = 0; i < len; ++i) {
                    expect(c.getAt(i)).toBe(items[i]);
                }
            }
            
            describe("the groups", function() {
                function expectGroupOrder(keys) {
                    var groups = collection.getGroups(),
                        len = keys.length,
                        i;
                    
                    for (i = 0; i < len; ++i) {
                        expect(groups.getAt(i).getGroupKey()).toBe(keys[i]);
                    }
                }
                
                it("should sort the groups", function() {
                    collection = new Ext.util.Collection();
                    collection.add(item6, item4, item2, item1, item3, item9, item8, item0, item5, item7);
                    groupBy('group');
                    expectGroupOrder('A', 'B', 'C', 'D');
                });
                
                it("should sort the groups according to the group direction", function() {
                    collection = new Ext.util.Collection();
                    collection.add(item6, item4, item2, item1, item3, item9, item8, item0, item5, item7);
                    groupBy('group', 'DESC');
                    expectGroupOrder('D', 'C', 'B', 'A');
                });
                
                it("should update the group order when the grouper changes", function() {
                    collection = new Ext.util.Collection();
                    collection.add(item6, item4, item2, item1, item3, item9, item8, item0, item5, item7);
                    groupBy('group');
                    groupBy('group', 'DESC');
                    expectGroupOrder('D', 'C', 'B', 'A');
                });
                
                it("should add new groups in the correct position", function() {
                    collection = new Ext.util.Collection();
                    groupBy('group');
                    collection.add(item3);
                    expectGroupOrder(['B']);
                    collection.add(item9);
                    expectGroupOrder(['B', 'D']);
                    collection.add(item6);
                    expectGroupOrder(['B', 'C', 'D']);
                    collection.add(item2);
                    expectGroupOrder(['A', 'B', 'C', 'D']);
                });
            });
            
            describe("inside the groups", function() {
                it("should sort the items in the collection by group", function() {
                    collection = new Ext.util.Collection();
                    collection.add(item9, item6, item3, item0);
                    groupBy('group', 'ASC');
                    expectOrder([item0, item3, item6, item9]);
                });
        
                it("should sort the groups according to the group direction", function() {
                    collection = new Ext.util.Collection();
                    collection.add(item0, item3, item6, item9);
                    groupBy('group', 'DESC');
                    expectOrder([item9, item6, item3, item0]);
                });
            
                it("should use the natural order inside the groups", function() {
                    collection = new Ext.util.Collection();
                    collection.add(item5, item4, item3, item2, item1, item0);
                    groupBy();
                    expectOrder([item2, item1, item0, item5, item4, item3]);
                    var groups = collection.getGroups();
                    expectOrder([item2, item1, item0], groups.get('A'));
                    expectOrder([item5, item4, item3], groups.get('B'));
                });
            
                it("should insert the record into the correct collection position", function() {
                    collection = new Ext.util.Collection();
                    collection.add({
                        id: 1,
                        name: 'Abe'
                    }, {
                        id: 2,
                        name: 'Tommy'
                    });
                    var nige = {
                        id: 3,
                        name: 'Nige'
                    };  
                    groupBy('name');
                    collection.add(nige);
                    expect(collection.indexOf(nige)).toBe(1);
                });
            });
            
            describe("with sorters", function() {
                it("should sort the collection by grouper first", function() {
                    sortBy();
                    groupBy();
                    expectOrder([item1, item2, item0, item5, item3, item4, item6, item7, item8, item9]);
                });
                
                it("should sort the new groups by the sorter", function() {
                    sortBy();
                    groupBy();
                    var groups = collection.getGroups();
                    expectOrder([item1, item2, item0], groups.get('A'));
                    expectOrder([item5, item3, item4], groups.get('B'));
                    expectOrder([item6, item7, item8], groups.get('C'));
                    expectOrder([item9], groups.get('D'));
                });
                
                it("should sort existing groups by the sorter", function() {
                    groupBy();
                    sortBy();
                    var groups = collection.getGroups();
                    expectOrder([item1, item2, item0], groups.get('A'));
                    expectOrder([item5, item3, item4], groups.get('B'));
                    expectOrder([item6, item7, item8], groups.get('C'));
                    expectOrder([item9], groups.get('D'));
                });
                
                it("should sort by the sorter after the groups have been cleared", function() {
                    sortBy();
                    groupBy();
                    clearGroup();
                    expectOrder([item1, item5, item6, item9, item2, item3, item7, item0, item4, item8]);
                });
            });
        });
        
        describe("filters", function() {
            it("should respect existing filters while grouping", function() {
                filterBy();
                groupBy();
                
                var groups = collection.getGroups(),
                    a = groups.get('A'),
                    b = groups.get('B'),
                    c = groups.get('C'),
                    d = groups.get('D');
                    
                expect(a.length).toBe(1);
                expect(a.first()).toBe(item1);
                
                expect(b.length).toBe(2);
                expect(b.first()).toBe(item3);
                expect(b.last()).toBe(item5);
                
                expect(c.length).toBe(1);
                expect(c.first()).toBe(item7);
                
                expect(d.length).toBe(1);
                expect(d.first()).toBe(item9);
            });
            
            it("should filter existing groups", function() {
                groupBy();
                filterBy();
                
                var groups = collection.getGroups(),
                    a = groups.get('A'),
                    b = groups.get('B'),
                    c = groups.get('C'),
                    d = groups.get('D');
                    
                expect(a.length).toBe(1);
                expect(a.first()).toBe(item1);
                
                expect(b.length).toBe(2);
                expect(b.first()).toBe(item3);
                expect(b.last()).toBe(item5);
                
                expect(c.length).toBe(1);
                expect(c.first()).toBe(item7);
                
                expect(d.length).toBe(1);
                expect(d.first()).toBe(item9);
            });
            
            it("should update groups when filters are cleared", function() {
                filterBy();
                groupBy();
                
                collection.getFilters().removeAll();
                
                var groups = collection.getGroups();
                    
                expect(groups.get('A').length).toBe(3);
                expect(groups.get('B').length).toBe(3);
                expect(groups.get('C').length).toBe(3);
                expect(groups.get('D').length).toBe(1);
            });
            
            it("should remove groups when required", function() {
                groupBy();
                collection.getFilters().add({
                    filterFn: function(o) {
                        return o.name === 'Item0';
                    }
                });
                
                var groups = collection.getGroups();
                
                expect(groups.get('A').length).toBe(1);
                expect(groups.get('B')).toBeUndefined();
                expect(groups.get('C')).toBeUndefined();
                expect(groups.get('D')).toBeUndefined();
            });
            
            it("should add groups when required", function() {
                groupBy();
                var filters = collection.getFilters();
                filters.add({
                    filterFn: function(o) {
                        return Ext.Array.indexOf(['Item0', 'Item9'], o.name) > -1;
                    }
                }, {
                    filterFn: function(o) {
                        return o.name === 'Item0';
                    }
                });
                
                var groups = collection.getGroups();
                
                expect(groups.get('A').length).toBe(1);
                expect(groups.get('D')).toBeUndefined();
                
                filters.remove(filters.last());
                
                groups = collection.getGroups();
                expect(groups.get('A').length).toBe(1);
                expect(groups.get('D').length).toBe(1);
            });
        });
        
        describe("aggregation", function() {
            describe("first", function() {
                it("should return the first item in each group", function() {
                    groupBy();
                    expect(collection.first(true)).toEqual({
                        A: item0,
                        B: item3,
                        C: item6,
                        D: item9
                    });
                });
                
                it("should ignore the group paramter if not grouped", function() {
                    expect(collection.first(true)).toBe(item0);
                });
            });
            
            describe("last", function() {
                it("should return the last item in each group", function() {
                    groupBy();
                    expect(collection.last(true)).toEqual({
                        A: item2,
                        B: item5,
                        C: item8,
                        D: item9
                    });
                });
                
                it("should ignore the group paramter if not grouped", function() {
                    expect(collection.last(true)).toBe(item9);
                });
            });
            
            describe("average", function() {
                it("should get the average for each group", function() {
                    groupBy();
                    expect(collection.averageByGroup('age')).toEqual({
                        A: 20,
                        B: 50,
                        C: 80,
                        D: 100
                    });
                });
            });
            
            describe("bounds", function() {
                it("should return the bounds for each group", function() {
                    groupBy();
                    expect(collection.boundsByGroup('age')).toEqual({
                        A: [10, 30],
                        B: [40, 60],
                        C: [70, 90],
                        D: [100, 100]
                    });
                });
            });
            
            describe("count", function() {
                it("should return the number of items in each group", function() {
                    groupBy();
                    expect(collection.countByGroup()).toEqual({
                        A: 3,
                        B: 3,
                        C: 3,
                        D: 1
                    });
                });
            });
            
            describe("extremes", function() {
                it("should return the extremes for each group", function() {
                    groupBy();
                    expect(collection.extremesByGroup('age')).toEqual({
                        A: [item0, item1],
                        B: [item5, item3],
                        C: [item7, item8],
                        D: [item9, item9]
                    });
                });
            });
            
            describe("max", function() {
                it("should return the max for each group", function() {
                    groupBy();
                    expect(collection.maxByGroup('age')).toEqual({
                        A: 30,
                        B: 60,
                        C: 90,
                        D: 100
                    });
                });
            });
            
            describe("maxItem", function() {
                it("should return the maxItem for each group", function() {
                    groupBy();
                    expect(collection.maxItemByGroup('age')).toEqual({
                        A: item1,
                        B: item3,
                        C: item8,
                        D: item9
                    });
                });
            });
            
            describe("min", function() {
                it("should return the min for each group", function() {
                    groupBy();
                    expect(collection.minByGroup('age')).toEqual({
                        A: 10,
                        B: 40,
                        C: 70,
                        D: 100
                    });
                });
            });
            
            describe("minItem", function() {
                it("should return the minItem for each group", function() {
                    groupBy();
                    expect(collection.minItemByGroup('age')).toEqual({
                        A: item0,
                        B: item5,
                        C: item7,
                        D: item9
                    });
                });
            });
            
            describe("sum", function() {
                it("should return the sum for each group", function() {
                    groupBy();
                    expect(collection.sumByGroup('age')).toEqual({
                        A: 60,
                        B: 150,
                        C: 240,
                        D: 100
                    });
                });
            });
            
            describe("with a custom aggregator", function() {
                var fn = function(records, items) {
                    var total = 0,
                        len = items.length,
                        i;
                    
                    for (i = 0; i < len; ++i) {
                        total += (items[i] * 2);
                    }
                    scope = this;
                    return total;
                }, scope;
                
                it("should call the custom aggregator", function() {
                    groupBy();
                    expect(collection.aggregateByGroup('age', fn)).toEqual({
                        A: 120,
                        B: 300,
                        C: 480,
                        D: 200
                    });
                });
                
                it("should use the passed scope", function() {
                    groupBy();
                    collection.aggregateByGroup('age', fn, fakeScope);
                    expect(scope).toBe(fakeScope);
                });
            });
        });
    });

    describe("sorting", function() {
        var Ed     = { id: 1, name: 'Ed',     code: 'C', modifier: 10, firstInitial: 'E' },
            Abe    = { id: 2, name: 'Abe',    code: 'A', modifier: 100, firstInitial: 'A' },
            Edward = { id: 3, name: 'Edward', code: 'B', modifier: 5, firstInitial: 'E' };

        function addItems (c) {
            c.add(Ed, Abe, Edward);
        }

        beforeEach(function() {
            collection = new Ext.util.Collection({
                keyFn: function(item) {
                    return item.name;
                }
            });

            addItems(collection);
        });

        it("should sort ASC by default", function() {
            collection.sort('code');

            expect(collection.items[0].code).toBe('A');
            expect(collection.items[1].code).toBe('B');
            expect(collection.items[2].code).toBe('C');
        });

        it("should accept a DESC sort", function() {
            collection.sort('code', "DESC");

            expect(collection.items[2].code).toBe('A');
            expect(collection.items[1].code).toBe('B');
            expect(collection.items[0].code).toBe('C');
        });

        it("should sort with an Ext.util.Sorter", function() {
            collection.sort(new Ext.util.Sorter({
                sorterFn: function(a, b) {
                    return (a.id * a.modifier) - (b.id * b.modifier);
                }
            }));

            expect(collection.items[0].code).toBe('C');
            expect(collection.items[1].code).toBe('B');
            expect(collection.items[2].code).toBe('A');
        });

        it("should perform a directional sort with an Ext.util.Sorter", function() {
            collection.sort(new Ext.util.Sorter({
                direction: 'DESC',
                sorterFn: function(a, b) {
                    return (a.id * a.modifier) - (b.id * b.modifier);
                }
            }));

            expect(collection.items[2].code).toBe('C');
            expect(collection.items[1].code).toBe('B');
            expect(collection.items[0].code).toBe('A');
        });

        it('should respect configured sorters', function () {
            var calls = 0;

            collection = new Ext.util.Collection({
                sorters: 'name'
            });

            expect(collection.sorted).toBe(true);

            collection.on('sort', function() {
                ++calls;
            });

            addItems(collection);

            expect(calls).toBe(0); // should add items in proper order not do full sort
            expect(collection.length).toBe(3);

            expect(collection.items[0].name).toBe('Abe');
            expect(collection.items[1].name).toBe('Ed');
            expect(collection.items[2].name).toBe('Edward');

            // Because we add items to an empty, sorted container a "clever" optimization
            // is in play and it is easy to end up with the keys out of sync with the
            // items.
            expect(collection.getByKey(Abe.id)).toBe(Abe);
            expect(collection.getByKey(Ed.id)).toBe(Ed);
            expect(collection.getByKey(Edward.id)).toBe(Edward);
        });

        it('should merge new items not resort', function () {
            var adds = [],
                sorts = 0;

            collection = new Ext.util.Collection({
                sorters: 'name'
            });

            expect(collection.sorted).toBe(true);

            collection.on({
                add: function (sender, details) {
                    adds.push(details.items.length + ' at ' + details.at);
                },
                sort: function () {
                    ++sorts;
                }
            });

            addItems(collection);

            expect(adds.length).toBe(1);
            expect(adds.join(' / ')).toBe('3 at 0');

            collection.add([
                { id: 10, name: 'Nige' },
                { id: 20, name: 'Evan' },
                { id: 30, name: 'Don' }
            ]);

            expect(adds.length).toBe(3);
            expect(adds.join(' / ')).toBe('3 at 0 / 1 at 1 / 2 at 4');

            expect(sorts).toBe(0); // should add items in proper order not do full sort
            expect(collection.length).toBe(6);
            expect(collection.items[0].name).toBe('Abe');
            expect(collection.items[1].name).toBe('Don');
            expect(collection.items[2].name).toBe('Ed');
            expect(collection.items[3].name).toBe('Edward');
            expect(collection.items[4].name).toBe('Evan');
            expect(collection.items[5].name).toBe('Nige');
        });

        it("should fire a sort event", function() {
            var calls = 0;

            collection.on('sort', function() {
                ++calls;
            });

            collection.sort('name');

            expect(calls).toBe(1);
        });

        it("should sort when sorters is manipulated", function() {
            expect(collection.sorted).toBe(false);
            expect(collection.items[0].name).toBe('Ed');
            expect(collection.items[1].name).toBe('Abe');
            expect(collection.items[2].name).toBe('Edward');

            collection.getSorters().add('name');

            expect(collection.sorted).toBe(true);
            expect(collection.items[0].name).toBe('Abe');
            expect(collection.items[1].name).toBe('Ed');
            expect(collection.items[2].name).toBe('Edward');

            collection.getSorters().remove('name');

            expect(collection.getSorters().length).toBe(0);
            expect(collection.sorted).toBe(false);
            expect(collection.items[0].name).toBe('Abe');
            expect(collection.items[1].name).toBe('Ed');
            expect(collection.items[2].name).toBe('Edward');
        });
        
        it("should not fire the sort event when removing all the sorters", function() {
            var spy = jasmine.createSpy();
            
            collection.getSorters().add('name');
            collection.on('sort', spy);
            collection.getSorters().remove('name');
            expect(spy).not.toHaveBeenCalled();
        });

        it("should sort once per sorter manipulation", function() {
            var calls = 0,
                sorters = collection.getSorters();

            collection.on('sort', function() {
                ++calls;
            });

            expect(collection.sorted).toBe(false);
            expect(collection.items[0].name).toBe('Ed');
            expect(collection.items[1].name).toBe('Abe');
            expect(collection.items[2].name).toBe('Edward');

            sorters.add(
                { property: 'firstInitial', direction: 'DESC' },
                'name');

            expect(calls).toBe(1);
            expect(sorters.length).toBe(2);
            expect(collection.sorted).toBe(true);
            expect(collection.items[0].name).toBe('Ed');
            expect(collection.items[1].name).toBe('Edward');
            expect(collection.items[2].name).toBe('Abe');

            sorters.remove('firstInitial');

            expect(calls).toBe(2);
            expect(sorters.length).toBe(1);
            expect(collection.sorted).toBe(true);
            expect(collection.items[0].name).toBe('Abe');
            expect(collection.items[1].name).toBe('Ed');
            expect(collection.items[2].name).toBe('Edward');

            sorters.insert(0, { property: 'firstInitial', direction: 'DESC' });

            expect(calls).toBe(3);
            expect(sorters.length).toBe(2);
            expect(collection.sorted).toBe(true);
            expect(collection.items[0].name).toBe('Ed');
            expect(collection.items[1].name).toBe('Edward');
            expect(collection.items[2].name).toBe('Abe');
        });

        it("should enforce multiSortLimit", function() {
            var calls = 0,
                sorters = collection.getSorters();

            collection.on('sort', function() {
                ++calls;
            });

            collection.setMultiSortLimit(2);

            collection.sort('name', null, 'multi');
            expect(calls).toBe(1);
            expect(sorters.length).toBe(1);
            expect(collection.sorted).toBe(true);
            expect(sorters.items[0].getProperty()).toBe('name');
            expect(sorters.items[0].getDirection()).toBe('ASC');

            expect(collection.items[0].name).toBe('Abe');
            expect(collection.items[1].name).toBe('Ed');
            expect(collection.items[2].name).toBe('Edward');

            collection.sort('firstInitial', 'DESC', 'multi');
            expect(calls).toBe(2);
            expect(sorters.length).toBe(2);
            expect(collection.sorted).toBe(true);
            expect(sorters.items[0].getProperty()).toBe('firstInitial');
            expect(sorters.items[0].getDirection()).toBe('DESC');
            expect(sorters.items[1].getProperty()).toBe('name');
            expect(sorters.items[1].getDirection()).toBe('ASC');

            expect(collection.items[0].name).toBe('Ed');
            expect(collection.items[1].name).toBe('Edward');
            expect(collection.items[2].name).toBe('Abe');

            // Should toggle direction
            collection.sort('firstInitial', null, 'multi');
            expect(calls).toBe(3);
            expect(sorters.length).toBe(2);
            expect(collection.sorted).toBe(true);
            expect(sorters.items[0].getProperty()).toBe('firstInitial');
            expect(sorters.items[0].getDirection()).toBe('ASC');
            expect(sorters.items[1].getProperty()).toBe('name');
            expect(sorters.items[1].getDirection()).toBe('ASC');

            expect(collection.items[0].name).toBe('Abe');
            expect(collection.items[1].name).toBe('Ed');
            expect(collection.items[2].name).toBe('Edward');

            // Should respect ASC and not toggle
            collection.sort('firstInitial', 'ASC', 'multi');
            expect(calls).toBe(4);
            expect(sorters.length).toBe(2);
            expect(collection.sorted).toBe(true);
            expect(sorters.items[0].getProperty()).toBe('firstInitial');
            expect(sorters.items[0].getDirection()).toBe('ASC');
            expect(sorters.items[1].getProperty()).toBe('name');
            expect(sorters.items[1].getDirection()).toBe('ASC');

            expect(collection.items[0].name).toBe('Abe');
            expect(collection.items[1].name).toBe('Ed');
            expect(collection.items[2].name).toBe('Edward');

            // Should bump name to the front and not toggle
            collection.sort('name', null, 'multi');
            expect(calls).toBe(5);
            expect(sorters.length).toBe(2);
            expect(collection.sorted).toBe(true);
            expect(sorters.items[0].getProperty()).toBe('name');
            expect(sorters.items[0].getDirection()).toBe('ASC');
            expect(sorters.items[1].getProperty()).toBe('firstInitial');
            expect(sorters.items[1].getDirection()).toBe('ASC');

            expect(collection.items[0].name).toBe('Abe');
            expect(collection.items[1].name).toBe('Ed');
            expect(collection.items[2].name).toBe('Edward');

            // Should now toggle name since it is already at the front
            collection.sort('name', null, 'multi');
            expect(calls).toBe(6);
            expect(sorters.length).toBe(2);
            expect(collection.sorted).toBe(true);
            expect(sorters.items[0].getProperty()).toBe('name');
            expect(sorters.items[0].getDirection()).toBe('DESC');
            expect(sorters.items[1].getProperty()).toBe('firstInitial');
            expect(sorters.items[1].getDirection()).toBe('ASC');

            expect(collection.items[0].name).toBe('Edward');
            expect(collection.items[1].name).toBe('Ed');
            expect(collection.items[2].name).toBe('Abe');

            // Should insert code at the front and clip off firstInitial
            collection.sort('code', null, 'multi');
            expect(calls).toBe(7);
            expect(sorters.length).toBe(2);
            expect(collection.sorted).toBe(true);
            expect(sorters.items[0].getProperty()).toBe('code');
            expect(sorters.items[0].getDirection()).toBe('ASC');
            expect(sorters.items[1].getProperty()).toBe('name');
            expect(sorters.items[1].getDirection()).toBe('DESC');

            expect(collection.items[0].name).toBe('Abe');
            expect(collection.items[1].name).toBe('Edward');
            expect(collection.items[2].name).toBe('Ed');
        }); // multiSortLimit

        it('should allow sorter collection removal', function () {
            var spy = jasmine.createSpy(),
                sorters = collection.getSorters();

            collection.on('sort', spy);

            collection.sort('name');
            expect(collection._sorters === sorters).toBe(true);
            expect(spy.callCount).toBe(1);
            expect(collection.sorted).toBe(true);
            expect(collection.items[0].name).toBe('Abe');
            expect(collection.items[1].name).toBe('Ed');
            expect(collection.items[2].name).toBe('Edward');

            collection.setSorters(null);
            expect(collection._sorters === null).toBe(true);
            expect(collection.sorted).toBe(false);
            // Should not fire an event, no changes were made to the data
            expect(spy.callCount).toBe(1);
            expect(collection.items[0].name).toBe('Abe');
            expect(collection.items[1].name).toBe('Ed');
            expect(collection.items[2].name).toBe('Edward');

            collection.sort('code');
            expect(collection._sorters !== sorters).toBe(true);
            expect(collection._sorters !== null).toBe(true);
            expect(spy.callCount).toBe(2);
            expect(collection.sorted).toBe(true);
            expect(collection.items[0].name).toBe('Abe');
            expect(collection.items[1].name).toBe('Edward');
            expect(collection.items[2].name).toBe('Ed');

            sorters.addSort('name'); // should toggle direction
            // but disconnected so should not cause the collection to sort
            expect(spy.callCount).toBe(2);
            expect(collection.sorted).toBe(true);
            expect(collection.items[0].name).toBe('Abe');
            expect(collection.items[1].name).toBe('Edward');
            expect(collection.items[2].name).toBe('Ed');

            collection.setSorters(sorters);
            expect(collection._sorters === sorters).toBe(true);
            expect(collection.sorted).toBe(true);
            expect(spy.callCount).toBe(3);
            expect(collection.items[0].name).toBe('Edward');
            expect(collection.items[1].name).toBe('Ed');
            expect(collection.items[2].name).toBe('Abe');

            collection.sort('name'); // toggle direction
            expect(collection._sorters === sorters).toBe(true);
            expect(spy.callCount).toBe(4);
            expect(collection.sorted).toBe(true);
            expect(collection.items[0].name).toBe('Abe');
            expect(collection.items[1].name).toBe('Ed');
            expect(collection.items[2].name).toBe('Edward');
        });

        it("should add items in sorted order when the new items need cloning", function() {
            collection.removeAll();
            collection.sort('name', 'DESC');
            collection.add([Abe, Ed, Edward]);
            expect(collection.getAt(0)).toBe(Edward);
            expect(collection.getByKey('Edward')).toBe(Edward);
            expect(collection.getAt(1)).toBe(Ed);
            expect(collection.getByKey('Ed')).toBe(Ed);
            expect(collection.getAt(2)).toBe(Abe);
            expect(collection.getByKey('Abe')).toBe(Abe);
        });
    });

    describe('rootProperty', function () {
        var Ed     = { id: 1, data: { name: 'Ed',     code: 'C', modifier: 10, firstInitial: 'E' } },
            Abe    = { id: 2, data: { name: 'Abe',    code: 'A', modifier: 100, firstInitial: 'A' } },
            Edward = { id: 3, data: { name: 'Edward', code: 'B', modifier: 5, firstInitial: 'E' } };

        function addItems (c) {
            c.add(Edward, Abe, Ed);
        }

        describe('with extraKeys', function () {
            it('should properly extract keys', function () {
                collection = new Ext.util.Collection({
                    rootProperty: 'data',
                    extraKeys: {
                        byName: {
                            property: 'name'
                        }
                    }
                });

                addItems(collection);

                expect(collection.length).toBe(3);
                expect(collection.byName.get(Abe.data.name)).toBe(Abe);
                expect(collection.byName.get(Ed.data.name)).toBe(Ed);
                expect(collection.byName.get(Edward.data.name)).toBe(Edward);
            });
        });

        describe('with configured sorters', function () {
            it('should use the rootProperty', function () {
                collection = new Ext.util.Collection({
                    rootProperty: 'data',
                    sorters: 'name'
                });

                addItems(collection);

                expect(collection.length).toBe(3);
                expect(collection.items[0]).toBe(Abe);
                expect(collection.items[1]).toBe(Ed);
                expect(collection.items[2]).toBe(Edward);
            });
        });

        describe('with dynamic sorters', function () {
            it('should use the rootProperty', function () {
                collection = new Ext.util.Collection({
                    rootProperty: 'data'
                });

                addItems(collection);

                collection.sort('name');

                expect(collection.length).toBe(3);
                expect(collection.items[0]).toBe(Abe);
                expect(collection.items[1]).toBe(Ed);
                expect(collection.items[2]).toBe(Edward);
            });
        });

        describe('with configured filters', function () {
            it('should use the rootProperty', function () {
                collection = new Ext.util.Collection({
                    rootProperty: 'data',
                    filters: { property: 'name', value: 'E' }
                });

                addItems(collection);

                expect(collection.length).toBe(2);
                //expect(collection.items[0]).toBe(Abe);
                expect(collection.items[0]).toBe(Edward);
                expect(collection.items[1]).toBe(Ed);
            });
        });

        describe('with dynamic filters', function () {
            it('should use the rootProperty', function () {
                collection = new Ext.util.Collection({
                    rootProperty: 'data'
                });

                addItems(collection);

                collection.setFilters({ property: 'name', value: 'E' });

                expect(collection.length).toBe(2);
                //expect(collection.items[0]).toBe(Abe);
                expect(collection.items[0]).toBe(Edward);
                expect(collection.items[1]).toBe(Ed);
            });
        });

        describe('with configured filters and sorters', function () {
            it('should use the rootProperty', function () {
                collection = new Ext.util.Collection({
                    rootProperty: 'data',
                    filters: { property: 'name', value: 'E' },
                    sorters: 'name'
                });

                addItems(collection);

                expect(collection.length).toBe(2);
                //expect(collection.items[0]).toBe(Abe);
                expect(collection.items[0]).toBe(Ed);
                expect(collection.items[1]).toBe(Edward);
            });
        });

        describe('with dynamic filters and sorters', function () {
            it('should use the rootProperty', function () {
                collection = new Ext.util.Collection({
                    rootProperty: 'data'
                });

                addItems(collection);

                collection.setFilters({ property: 'name', value: 'E' });
                collection.sort('name');

                expect(collection.length).toBe(2);
                //expect(collection.items[0]).toBe(Abe);
                expect(collection.items[0]).toBe(Ed);
                expect(collection.items[1]).toBe(Edward);
            });
        });
    });

    describe("extraKeys", function() {
        var item0, item1, item2, item3, item4, item5, item6, item7, item8, item9, item10;

        beforeEach(function() {
            item0  = { id: 0,  name: 'abba', uid: '123', foo: 12 };
            item1  = { id: 1,  name: 'aaa',  uid: '234', foo: 12 };
            item2  = { id: 2,  name: 'bad',  uid: '345', foo: 34 };
            item3  = { id: 3,  name: 'ccc',  uid: '456', foo: 34 };
            item4  = { id: 4,  name: 'abc',  uid: '678', foo: 24 };
            item5  = { id: 5,  name: 'bcd',  uid: '789', foo: 67 };
            item6  = { id: 6,  name: 'cde',  uid: '890', foo: 78 };
            item7  = { id: 7,  name: 'xyz',  uid: '012', foo: 34 };
            item8  = { id: 8,  name: 'ddd',  uid: '246', foo: 34 };
            item9  = { id: 9,  name: 'dad',  uid: '468', foo: 24 };
            item10 = { id: 10, name: 'dood', uid: '680', foo: 24 };

            collection = new Ext.util.Collection({
                extraKeys: {
                    byUid: 'uid',
                    byFoo: {
                        property: 'foo',
                        unique: false
                    }
                }
            });

            collection.add(item0, item1, item2, item3, item4, item5, item6, item7, item8,
                           item9, item10);
        });

        it('should add items and track unique extraKeys', function () {
            expect(collection.length).toBe(11);

            expect(collection.byUid.get(item0.uid)).toBe(item0);
            expect(collection.byUid.get(item1.uid)).toBe(item1);
            expect(collection.byUid.get(item2.uid)).toBe(item2);
            expect(collection.byUid.get(item3.uid)).toBe(item3);
            expect(collection.byUid.get(item4.uid)).toBe(item4);
            expect(collection.byUid.get(item5.uid)).toBe(item5);
            expect(collection.byUid.get(item6.uid)).toBe(item6);
            expect(collection.byUid.get(item7.uid)).toBe(item7);
            expect(collection.byUid.get(item8.uid)).toBe(item8);
            expect(collection.byUid.get(item9.uid)).toBe(item9);
            expect(collection.byUid.get(item10.uid)).toBe(item10);
        });

        it('should upgade items on itemChanged', function () {
            expect(collection.length).toBe(11);

            expect(collection.byUid.get(item0.uid)).toBe(item0);
            expect(collection.byUid.get(item1.uid)).toBe(item1);
            expect(collection.byUid.get(item2.uid)).toBe(item2);
            expect(collection.byUid.get(item3.uid)).toBe(item3);
            expect(collection.byUid.get(item4.uid)).toBe(item4);
            expect(collection.byUid.get(item5.uid)).toBe(item5);
            expect(collection.byUid.get(item6.uid)).toBe(item6);
            expect(collection.byUid.get(item7.uid)).toBe(item7);
            expect(collection.byUid.get(item8.uid)).toBe(item8);
            expect(collection.byUid.get(item9.uid)).toBe(item9);
            expect(collection.byUid.get(item10.uid)).toBe(item10);

            item0.uid += 'a';
            collection.itemChanged(item0);
            
            expect(collection.byUid.get(item0.uid)).toBe(item0);
        });

        it('should add items and track non-unique extraKeys', function () {
            var array12 = collection.byFoo.get(12),
                array24 = collection.byFoo.get(24),
                array34 = collection.byFoo.get(34);

            expect(array12.length).toBe(2);
            expect(array12[0]).toBe(item0);
            expect(array12[1]).toBe(item1);

            expect(array24.length).toBe(3);
            expect(array24[0]).toBe(item4);
            expect(array24[1]).toBe(item9);
            expect(array24[2]).toBe(item10);

            expect(array34.length).toBe(4);
            expect(array34[0]).toBe(item2);
            expect(array34[1]).toBe(item3);
            expect(array34[2]).toBe(item7);
            expect(array34[3]).toBe(item8);

            expect(collection.byFoo.get(item5.foo)).toBe(item5);
            expect(collection.byFoo.get(item6.foo)).toBe(item6);
        });

        it('should iterate all indices of non-unique extraKeys', function () {
            var index;

            index = collection.byFoo.indexOf(34);
            expect(index).toBe(2);

            index = collection.byFoo.indexOf(34, index);
            expect(index).toBe(3);

            index = collection.byFoo.indexOf(34, index);
            expect(index).toBe(7);

            index = collection.byFoo.indexOf(34, index);
            expect(index).toBe(8);

            index = collection.byFoo.indexOf(34, index);
            expect(index).toBe(-1);
        });

        it('should iterate one index of unique extraKeys', function () {
            var index;

            index = collection.byFoo.indexOf(item5.foo);
            expect(index).toBe(5);

            index = collection.byFoo.indexOf(item5.foo, index);
            expect(index).toBe(-1);
        });

        it('should return -1 from indexOf if not found', function () {
            var index;

            index = collection.byFoo.indexOf(1234);
            expect(index).toBe(-1);
        });

        it('should reflect filter state in unique extraKeys', function () {
            var filters = collection.getFilters();

            expect(collection.length).toBe(11);
            expect(filters.length).toBe(0);
            expect(collection.filtered).toBe(false);

            // Check unfiltered first to ensure we don't luck out and create the map on
            // first call after we apply the filter.
            expect(collection.byUid.get(item0.uid)).toBe(item0);
            expect(collection.byUid.get(item1.uid)).toBe(item1);
            expect(collection.byUid.get(item2.uid)).toBe(item2);
            expect(collection.byUid.get(item3.uid)).toBe(item3);
            expect(collection.byUid.get(item4.uid)).toBe(item4);
            expect(collection.byUid.get(item5.uid)).toBe(item5);
            expect(collection.byUid.get(item6.uid)).toBe(item6);
            expect(collection.byUid.get(item7.uid)).toBe(item7);
            expect(collection.byUid.get(item8.uid)).toBe(item8);
            expect(collection.byUid.get(item9.uid)).toBe(item9);
            expect(collection.byUid.get(item10.uid)).toBe(item10);

            function evens (item) {
                return item.id % 2 === 0;
            }

            filters.add(evens);

            expect(filters.length).toBe(1);
            expect(collection.filtered).toBe(true);
            expect(collection.length).toBe(6);
            expect(collection.items[0]).toBe(item0);
            expect(collection.items[1]).toBe(item2);
            expect(collection.items[2]).toBe(item4);
            expect(collection.items[3]).toBe(item6);
            expect(collection.items[4]).toBe(item8);
            expect(collection.items[5]).toBe(item10);

            // Check that all items are present and those that are filtered out are not.
            expect(collection.byUid.get(item0.uid)).toBe(item0);
            expect(collection.byUid.get(item1.uid)).toBe(null);
            expect(collection.byUid.get(item2.uid)).toBe(item2);
            expect(collection.byUid.get(item3.uid)).toBe(null);
            expect(collection.byUid.get(item4.uid)).toBe(item4);
            expect(collection.byUid.get(item5.uid)).toBe(null);
            expect(collection.byUid.get(item6.uid)).toBe(item6);
            expect(collection.byUid.get(item7.uid)).toBe(null);
            expect(collection.byUid.get(item8.uid)).toBe(item8);
            expect(collection.byUid.get(item9.uid)).toBe(null);
            expect(collection.byUid.get(item10.uid)).toBe(item10);

            filters.remove(evens);

            expect(filters.length).toBe(0);
            expect(collection.filtered).toBe(false);
            expect(collection.length).toBe(11);

            // Check that all the items are back.
            expect(collection.byUid.get(item0.uid)).toBe(item0);
            expect(collection.byUid.get(item1.uid)).toBe(item1);
            expect(collection.byUid.get(item2.uid)).toBe(item2);
            expect(collection.byUid.get(item3.uid)).toBe(item3);
            expect(collection.byUid.get(item4.uid)).toBe(item4);
            expect(collection.byUid.get(item5.uid)).toBe(item5);
            expect(collection.byUid.get(item6.uid)).toBe(item6);
            expect(collection.byUid.get(item7.uid)).toBe(item7);
            expect(collection.byUid.get(item8.uid)).toBe(item8);
            expect(collection.byUid.get(item9.uid)).toBe(item9);
            expect(collection.byUid.get(item10.uid)).toBe(item10);
        });

        it('should reflect filter state in non-unique extraKeys', function () {
            var filters = collection.getFilters();

            expect(collection.length).toBe(11);
            expect(filters.length).toBe(0);
            expect(collection.filtered).toBe(false);

            // Check unfiltered first to ensure we don't luck out and create the map on
            // first call after we apply the filter.
            var array12 = collection.byFoo.get(12),
                array24 = collection.byFoo.get(24),
                array34 = collection.byFoo.get(34);

            expect(array12.length).toBe(2);
            expect(array12[0]).toBe(item0);
            expect(array12[1]).toBe(item1);

            expect(array24.length).toBe(3);
            expect(array24[0]).toBe(item4);
            expect(array24[1]).toBe(item9);
            expect(array24[2]).toBe(item10);

            expect(array34.length).toBe(4);
            expect(array34[0]).toBe(item2);
            expect(array34[1]).toBe(item3);
            expect(array34[2]).toBe(item7);
            expect(array34[3]).toBe(item8);

            expect(collection.byFoo.get(item5.foo)).toBe(item5);
            expect(collection.byFoo.get(item6.foo)).toBe(item6);

            function evens (item) {
                return item.id % 2 === 0;
            }

            filters.add(evens);

            expect(filters.length).toBe(1);
            expect(collection.filtered).toBe(true);
            expect(collection.length).toBe(6);
            expect(collection.items[0]).toBe(item0);
            expect(collection.items[1]).toBe(item2);
            expect(collection.items[2]).toBe(item4);
            expect(collection.items[3]).toBe(item6);
            expect(collection.items[4]).toBe(item8);
            expect(collection.items[5]).toBe(item10);

            // Check that all items are present and those that are filtered out are not.
            array12 = collection.byFoo.get(12);
            array24 = collection.byFoo.get(24);
            array34 = collection.byFoo.get(34);

            expect(array12).toBe(item0); // not an array any more - just one match

            expect(array24.length).toBe(2);
            expect(array24[0]).toBe(item4);
            //expect(array24[1]).toBe(item9);
            expect(array24[1]).toBe(item10);

            expect(array34.length).toBe(2);
            expect(array34[0]).toBe(item2);
            //expect(array34[1]).toBe(item3);
            //expect(array34[2]).toBe(item7);
            expect(array34[1]).toBe(item8);

            expect(collection.byFoo.get(item5.foo)).toBe(null);
            expect(collection.byFoo.get(item6.foo)).toBe(item6);

            filters.remove(evens);

            expect(filters.length).toBe(0);
            expect(collection.filtered).toBe(false);
            expect(collection.length).toBe(11);

            // Check that all the items are back.
            array12 = collection.byFoo.get(12);
            array24 = collection.byFoo.get(24);
            array34 = collection.byFoo.get(34);

            expect(array12.length).toBe(2);
            expect(array12[0]).toBe(item0);
            expect(array12[1]).toBe(item1);

            expect(array24.length).toBe(3);
            expect(array24[0]).toBe(item4);
            expect(array24[1]).toBe(item9);
            expect(array24[2]).toBe(item10);

            expect(array34.length).toBe(4);
            expect(array34[0]).toBe(item2);
            expect(array34[1]).toBe(item3);
            expect(array34[2]).toBe(item7);
            expect(array34[3]).toBe(item8);

            expect(collection.byFoo.get(item5.foo)).toBe(item5);
            expect(collection.byFoo.get(item6.foo)).toBe(item6);
        });
    });

    describe("aggregation", function() {
        describe("simple objects", function() {
            var item0 = { id: 0, amount: 40 },
                item1 = { id: 1, amount: 20 },
                item2 = { id: 2, amount: 10 },
                item3 = { id: 3, amount: 30 };

            beforeEach(function() {
                collection = new Ext.util.Collection();
                collection.add(item0, item1, item2, item3);
            });

            describe("bounds", function() {
                it("should operate on all items", function() {
                    expect(collection.bounds('amount')).toEqual([10,40]);
                });

                it("should support a start index", function() {
                    expect(collection.bounds('amount', 2)).toEqual([10,30]);
                });

                it("should support a range", function() {
                    expect(collection.bounds('amount', 0, 2)).toEqual([20,40]);
                });
            });
            
            describe("count", function() {
                it("should return the count", function() {
                    expect(collection.count()).toBe(4);
                });
            });

            describe("extremes", function() {
                it("should operate on all items", function() {
                    var extremes = collection.extremes('amount');
                    expect(extremes[0]).toBe(item2);
                    expect(extremes[1]).toBe(item0);
                });

                it("should support a start index", function() {
                    var extremes = collection.extremes('amount', 2);
                    expect(extremes[0]).toBe(item2);
                    expect(extremes[1]).toBe(item3);
                });

                it("should support a range", function() {
                    var extremes = collection.extremes('amount', 0, 2);
                    expect(extremes[0]).toBe(item1);
                    expect(extremes[1]).toBe(item0);
                });
            });

            describe("max", function() {
                it("should operate on all items", function() {
                    expect(collection.max('amount')).toBe(40);
                });

                it("should support a start index", function() {
                    expect(collection.max('amount', 2)).toBe(30);
                });

                it("should support a range", function() {
                    expect(collection.max('amount', 1, 3)).toBe(20);
                });
            });

            describe("maxItem", function() {
                it("should operate on all items", function() {
                    expect(collection.maxItem('amount')).toBe(item0);
                });

                it("should support a start index", function() {
                    expect(collection.maxItem('amount', 2)).toBe(item3);
                });

                it("should support a range", function() {
                    expect(collection.maxItem('amount', 1, 3)).toBe(item1);
                });
            });

            describe("min", function() {
                it("should operate on all items", function() {
                    expect(collection.min('amount')).toBe(10);
                });

                it("should support a start index", function() {
                    expect(collection.min('amount', 2)).toBe(10);
                });

                it("should support a range", function() {
                    expect(collection.min('amount', 0, 2)).toBe(20);
                });
            });

            describe("minItem", function() {
                it("should operate on all items", function() {
                    expect(collection.minItem('amount')).toBe(item2);
                });

                it("should support a start index", function() {
                    expect(collection.minItem('amount', 2)).toBe(item2);
                });

                it("should support a range", function() {
                    expect(collection.minItem('amount', 0, 2)).toBe(item1);
                });
            });

            describe("sum", function() {
                it("should operate on all items", function() {
                    expect(collection.sum('amount')).toBe(100);
                });

                it("should support a start index", function() {
                    expect(collection.sum('amount', 2)).toBe(40);
                });

                it("should support a range", function() {
                    expect(collection.sum('amount', 1, 3)).toBe(30);
                });
            });
        });

        describe("complex objects", function() {
            var item0 = { id: 0, data: { amount: 40 } },
                item1 = { id: 1, data: { amount: 20 } },
                item2 = { id: 2, data: { amount: 10 } },
                item3 = { id: 3, data: { amount: 30 } };

            beforeEach(function() {
                collection = new Ext.util.Collection({
                    rootProperty: 'data'
                });
                collection.add(item0, item1, item2, item3);
            });

            describe("bounds", function() {
                it("should operate on all items", function() {
                    expect(collection.bounds('amount')).toEqual([10,40]);
                });

                it("should support a start index", function() {
                    expect(collection.bounds('amount', 2)).toEqual([10,30]);
                });

                it("should support a range", function() {
                    expect(collection.bounds('amount', 0, 2)).toEqual([20,40]);
                });
            });

            describe("extremes", function() {
                it("should operate on all items", function() {
                    var extremes = collection.extremes('amount');
                    expect(extremes[0]).toBe(item2);
                    expect(extremes[1]).toBe(item0);
                });

                it("should support a start index", function() {
                    var extremes = collection.extremes('amount', 2);
                    expect(extremes[0]).toBe(item2);
                    expect(extremes[1]).toBe(item3);
                });

                it("should support a range", function() {
                    var extremes = collection.extremes('amount', 0, 2);
                    expect(extremes[0]).toBe(item1);
                    expect(extremes[1]).toBe(item0);
                });
            });

            describe("max", function() {
                it("should operate on all items", function() {
                    expect(collection.max('amount')).toBe(40);
                });

                it("should support a start index", function() {
                    expect(collection.max('amount', 2)).toBe(30);
                });

                it("should support a range", function() {
                    expect(collection.max('amount', 1, 3)).toBe(20);
                });
            });

            describe("maxItem", function() {
                it("should operate on all items", function() {
                    expect(collection.maxItem('amount')).toBe(item0);
                });

                it("should support a start index", function() {
                    expect(collection.maxItem('amount', 2)).toBe(item3);
                });

                it("should support a range", function() {
                    expect(collection.maxItem('amount', 1, 3)).toBe(item1);
                });
            });

            describe("min", function() {
                it("should operate on all items", function() {
                    expect(collection.min('amount')).toBe(10);
                });

                it("should support a start index", function() {
                    expect(collection.min('amount', 2)).toBe(10);
                });

                it("should support a range", function() {
                    expect(collection.min('amount', 0, 2)).toBe(20);
                });
            });

            describe("minItem", function() {
                it("should operate on all items", function() {
                    expect(collection.minItem('amount')).toBe(item2);
                });

                it("should support a start index", function() {
                    expect(collection.minItem('amount', 2)).toBe(item2);
                });

                it("should support a range", function() {
                    expect(collection.minItem('amount', 0, 2)).toBe(item1);
                });
            });

            describe("sum", function() {
                it("should operate on all items", function() {
                    expect(collection.sum('amount')).toBe(100);
                });

                it("should support a start index", function() {
                    expect(collection.sum('amount', 2)).toBe(40);
                });

                it("should support a range", function() {
                    expect(collection.sum('amount', 1, 3)).toBe(30);
                });
            });
        });
    }); // aggregation

    describe('itemChanged', function () {
        var events = {
                add: 0,
                beforeitemchange: 0,
                beginupdate: 0,
                endupdate: 0,
                itemchange: 0,
                refresh: 0,
                remove: 0,
                sort: 0,
                updatekey: 0
            };
        var eventArgs, eventNames, argList;
        var Don, Evan, Nige, Phil, Kevin;

        function resetEvents () {
            var listeners = {};

            eventArgs = [];
            eventNames = [];

            Ext.Object.each(events, function (name) {
                events[name] = 0;
                listeners[name] = function () {
                    ++events[name];
                    
                    argList = Ext.Array.slice(arguments, 0);

                    // Copy the event info object because two events might use the same object
                    // But mutate a value between the first and second.
                    // eg: Collection#itemChanged fires beforeitemchange and passes a "details" object,
                    // but mutates the "oldIndex" or "newIndex" properties of that object before passing it to the itemchange event.
                    argList[1] = Ext.apply({}, argList[1]);

                    eventArgs.push(argList);
                    eventNames.push(name);
                };
            });

            return listeners;
        }

        beforeEach(function () {
            // Reset these before each test
            Don = { id: 1, name: 'Don', foo: 10 };
            Evan = { id: 2, name: 'Evan', foo: 100 };
            Nige = { id: 3, name: 'Nige', foo: 50 };
            Phil = { id: 4, name: 'Phil', foo: 30 };
            Kevin = { id: 5, name: 'Kevin', foo: 30 };
        });

        describe('unsorted and unfiltered', function () {
            beforeEach(function () {
                collection = new Ext.util.Collection({
                    listeners: resetEvents()
                });

                collection.add(Don, Evan, Nige);
                resetEvents();
            });

            it('should not fire add, remove or updatekey when not changed', function () {
                Don.name = 'Donald';

                collection.itemChanged(Don);

                expect(eventNames.join(',')).
                    toBe('beginupdate,beforeitemchange,itemchange,endupdate');

                var beforeitemchange = eventArgs[1][1],
                    itemchange = eventArgs[2][1];

                // No movement, therefore no adjustment of old/new index in itemchange event
                expect(beforeitemchange).toEqual(itemchange);

                expect(beforeitemchange.item).toBe(Don);
                expect(beforeitemchange.filterChanged).toBe(false);
                expect(beforeitemchange.keyChanged).toBe(false);
                expect(beforeitemchange.indexChanged).toBe(false);
                expect(beforeitemchange.modified).toBe(undefined);
                expect(beforeitemchange.filtered).toBe(false);
                expect(beforeitemchange.newIndex).toBe(undefined);
                expect(beforeitemchange.oldIndex).toBe(undefined);
                expect(beforeitemchange.oldKey).toBe(undefined);
                expect(beforeitemchange.wasFiltered).toBe(false);
            });

            it('should fire updatekey and not fire add or remove', function () {
                var oldKey = Don.id;

                Don.name = 'Donald';
                Don.id = 10;

                collection.itemChanged(Don, null, oldKey);

                expect(eventNames.join(',')).
                    toBe('beginupdate,beforeitemchange,updatekey,itemchange,endupdate');

                var beforeitemchange = eventArgs[1][1],
                    itemchange = eventArgs[3][1];

                // No movement, therefore no adjustment of old/new index in itemchange event
                expect(beforeitemchange).toEqual(itemchange);

                expect(beforeitemchange.item).toBe(Don);
                expect(beforeitemchange.filterChanged).toBe(false);
                expect(beforeitemchange.keyChanged).toBe(true);
                expect(beforeitemchange.indexChanged).toBe(false);
                expect(beforeitemchange.modified).toBe(undefined);
                expect(beforeitemchange.filtered).toBe(false);
                expect(beforeitemchange.newIndex).toBe(undefined);
                expect(beforeitemchange.oldIndex).toBe(undefined);
                expect(beforeitemchange.oldKey).toBe(oldKey);
                expect(beforeitemchange.wasFiltered).toBe(false);
            });
        }); // unsorted / unfiltered

        describe('sorted and unfiltered', function () {
            beforeEach(function () {
                collection = new Ext.util.Collection({
                    listeners: resetEvents(),
                    sorters: 'name'
                });

                collection.add(Don, Nige, Evan, Phil, Kevin);
                // Will be
                // Don, Evan, Kevin, Nige, Phil
                resetEvents();
            });

            it('should fire add and remove not updatekey', function () {
                Don.name = 'Wayne';

                collection.itemChanged(Don);

                expect(eventNames.join(',')).
                        toBe('beginupdate,beforeitemchange,remove,add,itemchange,endupdate');

                var beforeitemchange = eventArgs[1][1];

                expect(beforeitemchange.item).toBe(Don);
                expect(beforeitemchange.filterChanged).toBe(false);
                expect(beforeitemchange.keyChanged).toBe(false);
                expect(beforeitemchange.indexChanged).toBe(true);
                expect(beforeitemchange.modified).toBe(undefined);
                expect(beforeitemchange.filtered).toBe(false);
                expect(beforeitemchange.newIndex).toBe(5);
                expect(beforeitemchange.oldIndex).toBe(0);
                expect(beforeitemchange.oldKey).toBe(undefined);
                expect(beforeitemchange.wasFiltered).toBe(false);

                // Don's name change to Wayne should have moved him to the end
                expect(collection.items).toEqual([Evan, Kevin, Nige, Phil, Don]);
            });

            it('should fire updatekey and not fire add or remove', function () {
                var oldKey = Don.id;

                Don.name = 'Donald';
                Don.id = 10;

                collection.itemChanged(Don, null, oldKey);

                expect(eventNames.join(',')).
                    toBe('beginupdate,beforeitemchange,updatekey,itemchange,endupdate');

                var beforeitemchange = eventArgs[1][1],
                    itemchange = eventArgs[3][1];

                expect(beforeitemchange).toEqual(itemchange);

                expect(beforeitemchange.item).toBe(Don);
                expect(beforeitemchange.filterChanged).toBe(false);
                expect(beforeitemchange.keyChanged).toBe(true);
                expect(beforeitemchange.indexChanged).toBe(false);
                expect(beforeitemchange.modified).toBe(undefined);
                expect(beforeitemchange.filtered).toBe(false);
                expect(beforeitemchange.newIndex).toBe(undefined);
                expect(beforeitemchange.oldIndex).toBe(undefined);
                expect(beforeitemchange.oldKey).toBe(oldKey);
                expect(beforeitemchange.wasFiltered).toBe(false);
            });

            it('should order correctly after a sort field change moving to last position', function () {
                var insertionPoint;

                // Don should move to end
                Don.name = 'Zaphod';

                collection.on({
                    add: function(coll, adds) {
                        insertionPoint = adds.at;
                    },
                    single: true
                });
                collection.itemChanged(Don);

                expect(eventNames.join(',')).
                        toBe('beginupdate,beforeitemchange,remove,add,itemchange,endupdate');

                var beforeitemchange = eventArgs[1][1],
                    itemchange = eventArgs[4][1];

                expect(beforeitemchange.item).toBe(Don);
                expect(beforeitemchange.filterChanged).toBe(false);
                expect(beforeitemchange.keyChanged).toBe(false);
                expect(beforeitemchange.indexChanged).toBe(true);
                expect(beforeitemchange.modified).toBe(undefined);
                expect(beforeitemchange.filtered).toBe(false);
                expect(beforeitemchange.newIndex).toBe(5);
                expect(insertionPoint).toBe(4);
                expect(beforeitemchange.oldIndex).toBe(0);
                expect(beforeitemchange.oldKey).toBe(undefined);
                expect(beforeitemchange.wasFiltered).toBe(false);
                
                expect(itemchange.newIndex).toBe(4);

                // Don's name change to Zaphod should have moved him to the end
                expect(collection.items).toEqual([Evan, Kevin, Nige, Phil, Don]);
            });

            it('should order correctly after a sort field change moving to penultimate position', function () {
                var insertionPoint;

                // Don should move to second from end, before Phil
                Don.name = 'Owen';

                collection.on({
                    add: function(coll, adds) {
                        insertionPoint = adds.at;
                    },
                    single: true
                });
                collection.itemChanged(Don);

                expect(eventNames.join(',')).
                        toBe('beginupdate,beforeitemchange,remove,add,itemchange,endupdate');

                var beforeitemchange = eventArgs[1][1],
                    itemchange = eventArgs[4][1];

                expect(beforeitemchange.item).toBe(Don);
                expect(beforeitemchange.filterChanged).toBe(false);
                expect(beforeitemchange.keyChanged).toBe(false);
                expect(beforeitemchange.indexChanged).toBe(true);
                expect(beforeitemchange.modified).toBe(undefined);
                expect(beforeitemchange.filtered).toBe(false);
                expect(beforeitemchange.newIndex).toBe(4);
                expect(insertionPoint).toBe(3);
                expect(beforeitemchange.oldIndex).toBe(0);
                expect(beforeitemchange.oldKey).toBe(undefined);
                expect(beforeitemchange.wasFiltered).toBe(false);

                expect(itemchange.newIndex).toBe(3);

                // Don's name change to Owen should have moved him second from the end
                expect(collection.items).toEqual([Evan, Kevin, Nige, Don, Phil]);
            });

            it('should order correctly after a sort field change moving to first position', function () {
                var insertionPoint;

                // Evan should move from second to first, before Don
                Evan.name = 'Aaron';

                collection.on({
                    add: function(coll, adds) {
                        insertionPoint = adds.at;
                    },
                    single: true
                });
                collection.itemChanged(Evan);

                expect(eventNames.join(',')).
                        toBe('beginupdate,beforeitemchange,remove,add,itemchange,endupdate');

                var beforeitemchange = eventArgs[1][1],
                    itemchange = eventArgs[4][1];

                expect(beforeitemchange.item).toBe(Evan);
                expect(beforeitemchange.filterChanged).toBe(false);
                expect(beforeitemchange.keyChanged).toBe(false);
                expect(beforeitemchange.indexChanged).toBe(true);
                expect(beforeitemchange.modified).toBe(undefined);
                expect(beforeitemchange.filtered).toBe(false);
                expect(beforeitemchange.newIndex).toBe(0);
                expect(insertionPoint).toBe(0);
                expect(beforeitemchange.oldIndex).toBe(1);
                expect(beforeitemchange.oldKey).toBe(undefined);
                expect(beforeitemchange.wasFiltered).toBe(false);

                expect(itemchange.oldIndex).toBe(2);

                // Evan's name change to Aaron should have moved him to first place
                expect(collection.items).toEqual([Evan, Don, Kevin, Nige, Phil]);
            });

            it('should order correctly after a sort field change moving to second position', function () {
                var insertionPoint;

                // Phil should move to 2nd before Evan
                Phil.name = 'Edgar';

                collection.on({
                    add: function(coll, adds) {
                        insertionPoint = adds.at;
                    },
                    single: true
                });
                collection.itemChanged(Phil);

                expect(eventNames.join(',')).
                        toBe('beginupdate,beforeitemchange,remove,add,itemchange,endupdate');

                var beforeitemchange = eventArgs[1][1],
                    itemchange = eventArgs[4][1];

                expect(beforeitemchange.item).toBe(Phil);
                expect(beforeitemchange.filterChanged).toBe(false);
                expect(beforeitemchange.keyChanged).toBe(false);
                expect(beforeitemchange.indexChanged).toBe(true);
                expect(beforeitemchange.modified).toBe(undefined);
                expect(beforeitemchange.filtered).toBe(false);
                expect(beforeitemchange.newIndex).toBe(1);
                expect(insertionPoint).toBe(1);
                expect(beforeitemchange.oldIndex).toBe(4);
                expect(beforeitemchange.oldKey).toBe(undefined);
                expect(beforeitemchange.wasFiltered).toBe(false);

                expect(itemchange.oldIndex).toBe(5);

                // Phil's name change to Edgar should have moved him to second place
                expect(collection.items).toEqual([Don, Phil, Evan, Kevin, Nige]);
            });

        }); // sorted / unfiltered

        describe('unsorted and filtered', function () {
            beforeEach(function () {
                collection = new Ext.util.Collection({
                    listeners: resetEvents(),
                    filters: { property: 'foo', value: 50, operator: '<=' }
                });

                collection.add(Don, Nige, Evan);
                resetEvents();
            });

            it('should remove item once filter applies', function () {
                expect(collection.length).toBe(2);
                expect(collection.items[0]).toBe(Don);
                expect(collection.items[1]).toBe(Nige);

                Don.foo = 75;

                collection.itemChanged(Don);

                expect(collection.length).toBe(1);
                //expect(collection.items[0]).toBe(Don);
                expect(collection.items[0]).toBe(Nige);

                expect(eventNames.join(',')).
                    toBe('beginupdate,beforeitemchange,remove,itemchange,endupdate');

                var beforeitemchange = eventArgs[1][1],
                    itemchange = eventArgs[3][1];

                expect(beforeitemchange).toEqual(itemchange);

                expect(beforeitemchange.item).toBe(Don);
                expect(beforeitemchange.filterChanged).toBe(true);
                expect(beforeitemchange.keyChanged).toBe(false);
                expect(beforeitemchange.indexChanged).toBe(false);
                expect(beforeitemchange.modified).toBe(undefined);
                expect(beforeitemchange.filtered).toBe(true);
                expect(beforeitemchange.newIndex).toBe(-1);
                expect(beforeitemchange.oldIndex).toBe(0);
                expect(beforeitemchange.oldKey).toBe(undefined);
                expect(beforeitemchange.wasFiltered).toBe(false);
            });

            it('should restore item once filter no longer applies', function () {
                Evan.foo = 5;

                collection.itemChanged(Evan);

                expect(collection.length).toBe(3);
                expect(collection.items[0]).toBe(Don);
                expect(collection.items[1]).toBe(Nige);
                expect(collection.items[2]).toBe(Evan);

                expect(eventNames.join(',')).
                    toBe('beginupdate,beforeitemchange,add,itemchange,endupdate');

                var beforeitemchange = eventArgs[1][1],
                    itemchange = eventArgs[3][1];

                expect(beforeitemchange).toEqual(itemchange);

                expect(beforeitemchange.item).toBe(Evan);
                expect(beforeitemchange.filterChanged).toBe(true);
                expect(beforeitemchange.keyChanged).toBe(false);
                expect(beforeitemchange.indexChanged).toBe(false);
                expect(beforeitemchange.modified).toBe(undefined);
                expect(beforeitemchange.filtered).toBe(false);
                expect(beforeitemchange.newIndex).toBe(2);
                expect(beforeitemchange.oldIndex).toBe(-1);
                expect(beforeitemchange.oldKey).toBe(undefined);
                expect(beforeitemchange.wasFiltered).toBe(true);
            });
        }); // unsorted / filtered

        describe('sorted and filtered', function () {
            beforeEach(function () {
                collection = new Ext.util.Collection({
                    listeners: resetEvents(),
                    filters: { property: 'foo', value: 50, operator: '<=' },
                    sorters: { property: 'name', direction: 'DESC' }
                });

                collection.add(Don, Nige, Evan);
                resetEvents();
            });

            it('should remove item once filter applies', function () {
                expect(collection.length).toBe(2);
                expect(collection.items[0]).toBe(Nige);
                expect(collection.items[1]).toBe(Don);

                Don.foo = 75;

                collection.itemChanged(Don);

                expect(collection.length).toBe(1);
                expect(collection.items[0]).toBe(Nige);
                //expect(collection.items[1]).toBe(Don);

                expect(eventNames.join(',')).
                    toBe('beginupdate,beforeitemchange,remove,itemchange,endupdate');

                var beforeitemchange = eventArgs[1][1],
                    itemchange = eventArgs[3][1];

                expect(beforeitemchange).toEqual(itemchange);

                expect(beforeitemchange.item).toBe(Don);
                expect(beforeitemchange.filterChanged).toBe(true);
                expect(beforeitemchange.keyChanged).toBe(false);
                expect(beforeitemchange.indexChanged).toBe(false);
                expect(beforeitemchange.modified).toBe(undefined);
                expect(beforeitemchange.filtered).toBe(true);
                expect(beforeitemchange.newIndex).toBe(-1);
                expect(beforeitemchange.oldIndex).toBe(1);
                expect(beforeitemchange.oldKey).toBe(undefined);
                expect(beforeitemchange.wasFiltered).toBe(false);
            });

            it('should restore item once filter no longer applies', function () {
                Evan.foo = 5;

                collection.itemChanged(Evan);

                expect(collection.length).toBe(3);
                expect(collection.items[0]).toBe(Nige);
                expect(collection.items[1]).toBe(Evan);
                expect(collection.items[2]).toBe(Don);

                expect(eventNames.join(',')).
                    toBe('beginupdate,beforeitemchange,add,itemchange,endupdate');

                var beforeitemchange = eventArgs[1][1],
                    itemchange = eventArgs[3][1];

                expect(beforeitemchange).toEqual(itemchange);

                expect(beforeitemchange.item).toBe(Evan);
                expect(beforeitemchange.filterChanged).toBe(true);
                expect(beforeitemchange.keyChanged).toBe(false);
                expect(beforeitemchange.indexChanged).toBe(false);
                expect(beforeitemchange.modified).toBe(undefined);
                expect(beforeitemchange.filtered).toBe(false);
                expect(beforeitemchange.newIndex).toBe(2);
                expect(beforeitemchange.oldIndex).toBe(-1);
                expect(beforeitemchange.oldKey).toBe(undefined);
                expect(beforeitemchange.wasFiltered).toBe(true);
            });

            it('should restore item and position once filter no longer applies', function () {
                Evan.foo = 5;
                Evan.name = 'ZEvan';

                collection.itemChanged(Evan);

                expect(collection.length).toBe(3);
                expect(collection.items[0]).toBe(Evan);
                expect(collection.items[1]).toBe(Nige);
                expect(collection.items[2]).toBe(Don);

                expect(eventNames.join(',')).
                    toBe('beginupdate,beforeitemchange,add,itemchange,endupdate');

                var beforeitemchange = eventArgs[1][1],
                    itemchange = eventArgs[3][1];

                expect(beforeitemchange).toEqual(itemchange);

                expect(beforeitemchange.item).toBe(Evan);
                expect(beforeitemchange.filterChanged).toBe(true);
                expect(beforeitemchange.keyChanged).toBe(false);
                expect(beforeitemchange.indexChanged).toBe(false);
                expect(beforeitemchange.modified).toBe(undefined);
                expect(beforeitemchange.filtered).toBe(false);
                expect(beforeitemchange.newIndex).toBe(2);
                expect(beforeitemchange.oldIndex).toBe(-1);
                expect(beforeitemchange.oldKey).toBe(undefined);
                expect(beforeitemchange.wasFiltered).toBe(true);
            });
        }); // sorted / filtered
        
        describe("with a source", function() {
            it("should pass along the onCollectionItemChanged to the child", function() {
                var source = new Ext.util.Collection(),
                    spy = jasmine.createSpy(),
                    args;
                    
                source.add(Don);
                collection = new Ext.util.Collection({
                    source: source
                });
                collection.onCollectionItemChange = spy;
                
                source.itemChanged(Don, ['name']);
                args = spy.mostRecentCall.args;
                expect(args[0]).toBe(source);
                expect(args[1].modified).toEqual(['name']);
            });
        });
    }); // itemChanged

    describe("collecting", function() {
        describe("simple objects", function() {
            beforeEach(function() {
                collection = new Ext.util.Collection();

                collection.add([
                    { id: 1, amount: 10, name: 'Ed' },
                    { id: 2, amount: 20, name: 'Abe' },
                    { id: 3, amount: 20, name: 'Ed' }
                ]);
            });

            it("should collect the unique properties from each item", function() {
                var items = collection.collect('name');

                expect(items.length).toBe(2);
            });
        });

        describe("complex objects", function() {
            beforeEach(function() {
                collection = new Ext.util.Collection();

                collection.add([
                    { id: 1, data: { amount: 10, name: 'Ed' } },
                    { id: 2, data: { amount: 20, name: 'Abe' } },
                    { id: 3, data: { amount: 20, name: 'Ed' } }
                ]);
            });

            it("should collect the unique properties from each item", function() {
                var items = collection.collect('name', 'data');

                expect(items.length).toBe(2);
            });
        });
    });

    describe('adding a Collection to a Collection', function() {
        it('Should add a Collection as a single new item', function() {
            var mc1 = new Ext.util.Collection({
                    keyFn: function(object) {
                        return object;
                    }
                }),
                mc2 = new Ext.util.Collection();

            mc1.add('b', 'c');
            mc2.add(mc1); // bug - failed because "length" prop tricked array detection
            expect(mc2.get(mc1.getId()).indexOf('c')).toBe(1);
        });
    });

    describe('adding duplicate items', function() {
        it('should overwrite duplicates', function() {
            var mc1 = new Ext.util.Collection();
            var log = [];

            logEvents(mc1, log, 'text');

            mc1.add({ id: 1, text: 'foo' },
                    { id: 2, text: 'bar' },
                    { id: 1, text: 'bletch' },
                    { id: 2, text: 'zarg' });

            expect(log).toEqual([
                'beginupdate',
                'add ["bletch","zarg"] at 0 w/keys [1,2]',
                'endupdate'
            ]);

            expect(mc1.getCount()).toBe(2);
            expect(mc1.getAt(0).text).toBe('bletch');
            expect(mc1.getAt(1).text).toBe('zarg');
        });
    });

    describe('item decoder', function() {
        it('Should decode new items', function() {
            var Item = Ext.define(null, {
                isItem: true,
                config: {
                    id: null
                },

                constructor: function (config) {
                    this.initConfig(config);
                }
            });
            var calls = 0;
            var decoded = 0;

            var mc = new Ext.util.Collection({
                    decoder: function (item) {
                        ++calls;
                        if (!item.isItem) {
                            ++decoded;
                            item = new Item(item);
                        }
                        return item;
                    }
                });

            mc.add({ id: 42 }, new Item({ id: 'abc' }));

            expect(calls).toBe(2);
            expect(decoded).toBe(1);
            expect(mc.items[0].isItem).toBe(true);
            expect(mc.items[0].getId()).toBe(42);
            expect(mc.items[1].isItem).toBe(true);
            expect(mc.items[1].getId()).toBe('abc');
        });
    });
});
