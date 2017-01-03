describe("AbstractManager", function(){
    
    var manager;
    
    beforeEach(function(){
        manager = new Ext.AbstractManager();
    });
    
    afterEach(function(){
        manager = null;
    });
    
    describe("get/register/unregister", function(){
        it("should return undefined for an item not in the collection", function(){
            expect(manager.get('notthere')).toBeUndefined();    
        });
        
        it("should return the object if it exists in the collection", function(){
            var o = {id: 'item'};
            manager.register(o);
            expect(manager.get('item')).toBe(o);
        });
        
        it("should register multiple items", function(){
            var o1 = {id: 'item1'},
                o2 = {id: 'item2'};
                
            manager.register(o1);
            manager.register(o2);
            
            expect(manager.get('item1')).toBe(o1);
            expect(manager.get('item2')).toBe(o2);
        });
        
        it("should remove items when unregistered", function(){
            var o1 = {id: 'item1'},
                o2 = {id: 'item2'};
                
            manager.register(o1);
            manager.register(o2);
            
            manager.unregister(o2);
            expect(manager.get('item1')).toBe(o1);
            expect(manager.get('item2')).toBeUndefined();
        });
    });
    
    describe("registerType/isRegistered/create", function(){
        
        afterEach(function(){
            delete Ext.util.Filter.type;
        });
        
        it("should copy the type name onto the prototype", function(){
            manager.registerType('filter', Ext.util.Filter);
            expect(Ext.util.Filter.type).toEqual('filter');
        });
        
        it("should return true when a type is registered", function(){
            manager.registerType('filter', Ext.util.Filter);
            expect(manager.isRegistered('filter')).toBe(true);
        }); 
        
        it("should return false when a type is not registered", function(){
            expect(manager.isRegistered('notRegged')).toBe(false);
        });
        
        it("should thrown an exception when trying to create a type that doesn't exist", function(){
            expect(function(){
                manager.create('filter');
            }).toRaiseExtError();    
        });
        
        it("should return an instance of the type", function(){
            manager.registerType('filter', Ext.util.Filter);
            expect(manager.create({
                type: 'filter',
                filterFn: Ext.emptyFn
            }) instanceof Ext.util.Filter).toBe(true);
        });
        
        it("should fallback to the default type", function(){
            manager.registerType('filter', Ext.util.Filter);
            expect(manager.create({
                filterFn: Ext.emptyFn
            }, 'filter') instanceof Ext.util.Filter).toBe(true);
        });
        
        it("should pass the config to the constructor", function(){
            manager.registerType('filter', Ext.util.Filter);
            var filter = manager.create({
                type: 'filter',
                property: 'name',
                value: 'x'
            });
            
            expect(filter.getProperty()).toBe('name');
        });
    });
    
    describe("onAvailable", function(){
        it("should never fire if no items are added", function(){
            var spy = jasmine.createSpy('spy');
            manager.onAvailable('item', spy);
            expect(spy.callCount).toBe(0);
        });
        
        it("should never fire if items with no matching id are added", function(){
            var spy = jasmine.createSpy('spy');
            manager.onAvailable('item', spy);
            manager.register({
                id: 'other'
            });
            expect(spy.callCount).toBe(0);
        });
        
        it("should fire the function if an item is added with a matching id", function(){
            var spy = jasmine.createSpy('spy');
            manager.onAvailable('item', spy);
            manager.register({
                id: 'item'
            });
            expect(spy.callCount).toBe(1);
        });
        
        it("should fire the function if the onAvailable is bound when the item already exists", function(){
            var spy = jasmine.createSpy('spy');
            manager.register({
                id: 'item'
            });
            manager.onAvailable('item', spy);
            expect(spy.callCount).toBe(1);
        });
        
        it("should pass the item as a parameter", function(){
            var o = {id: 'item'},
                actual,
                fn = function(item){
                    actual = item;
                };
                
            manager.onAvailable('item', fn);
            manager.register(o);
            expect(actual).toBe(o);
        });
        
        it("should default the scope to the item if not specified", function(){
            var o = {id: 'item'},
                actual,
                fn = function(){
                    actual = this;
                };
                
            manager.onAvailable('item', fn);
            manager.register(o);
            expect(actual).toBe(o);
        });
        
        it("should use the passed scope", function(){
            var o = {id: 'item'},
                actual,
                scope = {},
                fn = function(){
                    actual = this;
                };
                
            manager.onAvailable('item', fn, scope);
            manager.register(o);
            expect(actual).toBe(scope);
        });
        
        it("should remove the listener once the component is created", function(){
            var fn1 = function(){
                ++first;
            }, fn2 = function(){
                ++second;
            }, first = 0,
               second = 0,
               o = {
                   id: 'item'
               };
               
           manager.onAvailable('item', fn1);
           manager.register(o);
           manager.unregister(o);
           manager.onAvailable('item', fn2);
           manager.register(o);
           
           expect(first).toBe(1);
           expect(second).toBe(1);
        })
    });
    
    describe("each", function(){
        it("should not iterate if there are no items", function(){
            var spy = jasmine.createSpy('spy');
            manager.each(spy);
            expect(spy.callCount).toBe(0);
        });
        
        it("should loop over each item", function(){
            var spy = jasmine.createSpy('spy'),
                i = 0;
                
            for (; i < 5; ++i) {
                manager.register({
                    id: 'id' + i
                });
            }
            manager.each(spy);
            expect(spy.callCount).toBe(5);
        });
        
        it("should default the scope to the manager", function(){
            var o = {id: 'item'},
                scope,
                fn = function(){
                    scope = this;
                };
                
            manager.register(o);
            manager.each(fn);
            expect(scope).toBe(manager);
        });
        
        it("should use the passed scope", function(){
            var o = {id: 'item'},
                scope = {},
                actual,
                fn = function(){
                    actual = this;
                };
                
            manager.register(o);
            manager.each(fn, scope);
            expect(actual).toBe(scope);
        });
        
    });
    
    describe("getCount", function(){
        it("should return 0 by default", function(){
            expect(manager.getCount()).toBe(0);
        });
        
        it("should return the correct count after adding items", function(){
            manager.register({
                id: 'a'
            });
            expect(manager.getCount()).toBe(1);
            
            manager.register({
                id: 'b'
            });
            expect(manager.getCount()).toBe(2);
        });
        
        it("should return the correct count after removing items", function(){
            var o = {id: 'item'};
            manager.register(o);
            manager.unregister(o);
            expect(manager.getCount()).toBe(0);
        });
    })
});
