describe("Ext.ComponentQuery", function() {
    var cq,
        cm,
        EA,
        result,
        root,
        child1,
        child2,
        child3,
        child4,
        child5,
        child6,
        child7,
        child8,
        child9,
        child10,
        child11,
        child12,
        setup = function(o, parent) {
            if (o.items) {
                for (var i = 0; i < o.items.length; i++) {
                    setup(o.items[i], o);
                }
            }
            
            Ext.apply(o, {
                getItemId: function() {
                    return this.itemId !== undefined ? this.itemId : this.id;
                },

                getId: function() {
                    return this.id;
                },

                getRefItems: function(deep) {
                    var items = this.items || [],
                        len = items.length,
                        i = 0,
                        item;
            
                    if (deep) {
                        for (; i < len; i++) {
                            item = items[i];
                            if (item.getRefItems) {
                                items = items.concat(item.getRefItems(true));
                            }
                        }
                    }
                    
                    return items;
                },
                
                getRefOwner: function() {
                    return this.ownerCt;
                },
                
                hasCls: function(cls) {
                    return this.cls == cls;
                },
                
                isHidden: function() {
                    return this.hidden;
                },
                
                isXType: function(type) {
                    return EA.contains(this.type.split('/'), type);
                },
                
                ownerCt: parent
            });
            
            cm.register(o);
        };
        
    function expectChildren() {
        var args = Array.prototype.slice.apply(arguments),
            result = args.shift(),
            len = args.length,
            i, expected, actual;
        
        expect(result.length).toBe(len);
        
        for (i = 0, len = args.length; i < len; i++) {
            expected = args[i];
            actual   = result[i];
            
            expect(actual.id).toBe(expected.id);
        }
    };

    beforeEach(function() {
        cq = Ext.ComponentQuery;
        cm = Ext.ComponentManager;
        EA = Ext.Array;

        root = {
            id: 'root',
            cls: 'root-cls',
            type: 'A',
            items: [child1 = {
                $className: 'Foo',
                id: 'child1',
                cls: 'child1-cls',
                type: 'B/G/Z',
                foo: 'bar,baz'
            }, child2 = {
                $className: 'Bar.Baz.Qux',
                id: 'child2',
                cls: 'child2-cls',
                type: 'B/G/Z',
                bar: 'foo,bar,baz'
            }, child3 = {
                $className: 'Foo',
                id: 'child3',
                cls: 'child3-cls',
                type: 'B/C/D',
                layout: 'card',
                items: [child4 = {
                    id: 'child4',
                    cls: 'child4-cls',
                    type: 'B/C/E',
                    layout: 'hbox',
                    items: [child5 = {
                        id: 'child5',
                        cls: 'child5-cls',
                        type: 'B/C/F',
                        items: [child7 = {
                            id: 'child7',
                            cls: 'child7-cls',
                            type: 'B/G/H'
                        }, child8 = {
                            id: 'child8',
                            cls: 'child8-cls',
                            type: 'B/G/I'
                        }, child9 = {
                            id: 'child9',
                            cls: 'child9-cls',
                            type: 'B/G/J'
                        }]
                    }, child6 = {
                        id: 'child6',
                        cls: 'child6-cls',
                        type: 'B/G/Z',
                        hidden: true
                    }, child10 = {
                        id   : 'child10',
                        cls  : 'child10-cls my-foo-cls',
                        type : 'B'
                    }, child11 = {
                        id   : 'child.11',
                        cls  : 'child11-cls my-foo-cls-test',
                        type : 'B'
                    }, child12 = {
                        id: 'child.12',
                        itemId: 'bobby.brown.goes.down',
                        type: 'E.2-E.4',
                        foo: '[foo(bar)!baz#qux\\fred*]',
                        sq: "'single' 'quotes'",
                        dq: '"double" "quotes"'
                    }]
                }]
            }]
        };
        setup(root);
    });
    
    afterEach(function() {
        cm.all = {};
    });
    
    describe("parser", function() {
        it("should blow up if the intra-selector comma is escaped", function() {
            expect(function() {
                cq.query('#child3\\,F', root);
            }).toThrow('Invalid ComponentQuery selector: ",F"');
        });
        
        it("should blow up if a selector ends with unescaped comma", function() {
            expect(function() {
                cq.query('#child3,', root);
            }).toThrow('Invalid ComponentQuery selector: ""');
        });
        
        it("should blow up if a selector ends with an escaped comma", function() {
            expect(function() {
                cq.query('#child3\\,', root);
            }).toThrow('Invalid ComponentQuery selector: ","');
        });
        
        describe("missing quotes", function() {
            var warning;
            
            beforeEach(function() {
                spyOn(Ext.log, 'warn').andCallFake(function(msg) {
                    warning = msg;
                });
                
                warning = null;
            });
            
            it("should warn on missing opening double quote", function() {
                cq.query('[foo=bar"]');
                expect(warning).toMatch(/^ComponentQuery selector.*?unescaped \("\).*?end/);
            });
            
            it("should warn on missing closing double quote", function() {
                cq.query('[foo="bar]');
                expect(warning).toMatch(/^ComponentQuery selector.*?unescaped \("\).*?beginning/);
            });
            
            it("should warn on missing opening single quote", function() {
                cq.query("[foo=bar']");
                expect(warning).toMatch(/^ComponentQuery selector.*?unescaped \('\).*end/);
            });
            
            it("should warn on missing closing single quote", function() {
                cq.query("[foo='bar]");
                expect(warning).toMatch(/^ComponentQuery selector.*?unescaped \('\).*beginning/);
            });
        });
    });
    
    describe("Query object", function() {
        describe("is", function() {
            it("should return true if the selector is empty", function() {
                var q = cq.parse('');
                
                expect(q.is(root)).toBe(true);
            });
        });
    });
    
    describe("is", function(){
        var item;
        beforeEach(function() {
           item = Ext.getCmp('root');
        });
        
        afterEach(function(){
            item = null;
        });
        
        it("should return true if there is no selector", function(){
            expect(cq.is(root)).toBe(true);
        });
        
        it("should return true if component matches the selector", function(){
            expect(cq.is(root, '[type=A]')).toBe(true);
        });  
        
        it("should return true if component matches any selector", function(){
            expect(cq.is(root, 'button, #foo, #root, [type=A]')).toBe(true);
        });  
        
        it("should return false if the component doesn't match the selector", function(){
            expect(cq.is(root, '#foo')).toBe(false);
        });
        
        it("should work with the :not pseudo", function() {
            var comp = new Ext.Component({
                foo: 1
            });
            
            expect(comp.is('[foo]:not([bar])')).toBe(true);
        });
        
        it("should be able to run on destroyed components", function(){
            var comp = new Ext.Component({
                foo: 1
            });
            
            comp.destroy();
            expect(comp.is('[foo]:not([bar])')).toBe(true);
        });
        
        describe("hierarchy selectors", function() {
            it("should match a direct child", function(){
                expect(cq.is(child6, '#child4 > #child6')).toBe(true);    
            });  
            
            it("should return false if it's not a direct child", function() {
                expect(cq.is(child6, '#child3 > #child6')).toBe(false);    
            });
            
            it("should match deep children", function() {
                expect(cq.is(child6, '#child3 #child6')).toBe(true);    
            });
            
            it("should match an upward selector", function() {
                expect(cq.is(child3, '#child6 ^ #child3')).toBe(true);  
            });
        });
    });
    
    describe("simple query by xtype", function() {
        it("should select all six items of type G", function() {
            result = cq.query('G', root);
            expect(result.length).toEqual(6);
            expect(result[2].id).toEqual(child6.id);
        });
        
        it("should allow escaped dots in xtype selector", function() {
            result = cq.query('E\\.2-E\\.4', root);
            expect(result.length).toBe(1);
            expect(result[0].id).toBe(child12.id);
        });
    });
    
    describe("simple query by xtype prefixed with dot", function() {
        it("should select all six items of type G", function() {
            result = cq.query('.G', root);
            expect(result.length).toEqual(6);
            expect(result[2].id).toEqual(child6.id);
        });

        it("should allow escaped dots in xtype selector", function() {
            result = cq.query('.E\\.2-E\\.4', root);
            expect(result.length).toBe(1);
            expect(result[0].id).toBe(child12.id);
        });
    });
    
    describe("attributes starting with $", function(){
        it("should match $className variable", function(){
            result = cq.query('[$className=Foo]');    
            expect(result.length).toBe(2);
            expect(result[0].id).toBe('child1');
            expect(result[1].id).toBe('child3');
        });  

        it("should allow dots in attribute values", function() {
            result = cq.query('[$className=Bar.Baz.Qux]', root);
            expectChildren(result, child2);
        });
    });
    
    describe("query by id", function() {
        it("should select the second child", function() {
            result = cq.query('G#child2', root);
            expect(result.length).toEqual(1);
            expect(result[0].id).toEqual(child2.id);
        });
        
        it("should select the fifth child", function() {
            result = cq.query('#child5', root);
            expect(result.length).toEqual(1);
            expect(result[0].id).toEqual(child5.id);
        });
        
        it("should allow escaped dots in query-by-id selectors", function() {
            result = cq.query('#child\\.11', root);
            expectChildren(result, child11);
        });
        
        it("should allow multiple escaped commas in #itemId selectors", function() {
            result = cq.query('#bobby\\.brown\\.goes\\.down', root);
            expectChildren(result, child12);
        });
    });
    
    describe("query by property", function() {
        it("should select the second child", function() {
            result = cq.query('G[cls=child2-cls]', root);
            expect(result.length).toEqual(1);
            expect(result[0].id).toEqual(child2.id);
        });

        it("should select the sixth child", function () {
            result = cq.query('[hidden]', root);
            expect(result.length).toEqual(1);
            expect(result[0].id).toEqual(child6.id);
        });
        
        describe("property value quotes", function() {
            it("should allow single quoted value", function() {
                result = cq.query("[id='child.12']", root);
                expectChildren(result, child12);
            });
            
            it("should allow double quoted value", function() {
                result = cq.query('[id="child.12"]', root);
                expectChildren(result, child12);
            });
            
            it("should allow double quotes in single quoted value", function() {
                result = cq.query('[dq=\'"double" "quotes"\']', root);
                expectChildren(result, child12);
            });
            
            it("should allow single quotes in double quoted value", function() {
                result = cq.query("[sq=\"'single' 'quotes'\"]", root);
                expectChildren(result, child12);
            });
        });
        
        describe("matchers", function(){
            it("should select the tenth child", function () {
                result = cq.query('[cls~=my-foo-cls]', root);
                expect(result.length).toEqual(1);
                expect(result[0].id).toEqual(child10.id);
            }); 
            
            it("should select items where id starts with child1", function(){
                result = cq.query('[id^=child1]', root);
                expectChildren(result, child1, child10);
            });
            
            it("should select items where cls ends with 9-cls", function(){
                result = cq.query('[cls$=9-cls]', root);
                expect(result.length).toBe(1);
                expect(result[0].cls).toBe('child9-cls');                
            });

            it("should select items with commas in properties", function() {
                result = cq.query('[foo=bar\\,baz]');
                expect(result.length).toEqual(1);
                expect(result[0].id).toEqual(child1.id);
            });
        
            it("should allow multiple escaped commas", function() {
                result = cq.query('[bar=foo\\,bar\\,baz]', root);
                expectChildren(result, child2);
            });
        
            it("should allow escaped metacharacters", function() {
                result = cq.query('[foo=\\[foo\\(bar\\)\\!baz\\#qux\\\\fred\\*\\]]', root);
                expectChildren(result, child12);
            });
            
            describe("regexen", function() {
                it("should match everything with an empty regex", function() {
                    result = cq.query('[cls/=]');
                    expect(result.length).toBe(12);
                });
                
                describe("simple regexen", function() {
                    it("should match regexen with text as pattern", function() {
                         result = cq.query('[cls/=my-foo]');
                         expectChildren(result, child10, child11);
                    });
                    
                    it("should match regexen with simple alternation", function() {
                        result = cq.query('[cls/=child3-cls|child4-cls|child5-cls]');
                        expectChildren(result, child5, child4, child3);
                    });
                });
                
                describe("complex regexen", function() {
                    it("should match regexen with pattern quantifiers", function() {
                        result = cq.query('[cls/="child.{2}-cls"]');
                        expectChildren(result, child10, child11);
                    });
                
                    it("should match regexen with grouping and alternating", function() {
                        result = cq.query('[cls/="child(?:7|8)-cls"]');
                        expectChildren(result, child7, child8);
                    });
                
                    it("should match regexen with character classes", function() {
                        result = cq.query('[cls/="child\\[5-7\\]-cls"]');
                        expectChildren(result, child7, child5, child6);
                    });
                });
            });
        });
    });
    
    describe("query using mode ^", function() {
        it("should select the fourth child", function() {
            result = cq.query('G[cls=child8-cls]^#child4', root);
            expect(result.length).toEqual(1);
            expect(result[0].id).toEqual(child4.id);
        });
    });

    describe("query using mode ^ and >", function() {
        it("should select the sixth child", function() {
            result = cq.query('G[cls=child8-cls]^#child4>G', root);
            expect(result.length).toEqual(1);
            expect(result[0].id).toEqual(child6.id);
        });
    });

    describe("query using multiple selectors", function() {
        it("should select the third and fifth child", function() {
            result = cq.query('#child3,F', root);
            expect(result.length).toEqual(2);
            expect(result[0].id).toEqual(child3.id);
            expect(result[1].id).toEqual(child5.id);
        });
    });

    describe("query using member function", function() {
        it("should select the sixth child that is hidden", function() {
            result = cq.query('{isHidden()}', root);
            expect(result.length).toEqual(1);
            expect(result[0].id).toEqual(child6.id);
        });
    });

    describe("query using pseudo-class", function() {
        beforeEach(function() {
            cq.pseudos.cardLayout = function(items) {
                var result = [], c, i = 0, l = items.length;
                for (; i < l; i++) {
                    if ((c = items[i]).layout === 'card') {
                        result.push(c);
                    }
                }
                return result;
            };
        });

        it("should select the third child with layout == 'card'", function() {
            result = cq.query('C:cardLayout', root);
            delete cq.pseudos.cardLayout;
            expect(result.length).toEqual(1);
            expect(result[0].id).toEqual(child3.id);
        });
        
        it("should not select the sixth child which is filtered by :not()", function(){
            result = cq.query(':not([hidden])', root);
            var all = root.getRefItems(true),
                getId = function(o){ return o.id; },
                allIds = EA.map(all, getId),
                resultIds = EA.map(result, getId),
                diffIds = EA.difference(allIds, resultIds);
            expect(result.length).toEqual(all.length - 1);
            expect(diffIds.length).toEqual(1);
            expect(diffIds[0]).toEqual(child6.id);
        });
        
        it("should accept back-to-back pseudo-class selectors with cumulative results", function(){
            result = cq.query(':not(G):not(F)', root);
            expect(result.length).toEqual(5);
            expect(result[0].id).toEqual(child3.id);
            expect(result[1].id).toEqual(child4.id);
            expect(result[2].id).toEqual(child10.id);
            expect(result[3].id).toEqual(child11.id);
            expect(result[4].id).toEqual(child12.id);
        });
        
        it("should accept member expression selectors", function() {
            result = cq.query(':not({isHidden()})', root);
            var all = root.getRefItems(true),
                getId = function(o){ return o.id; },
                allIds = EA.map(all, getId),
                resultIds = EA.map(result, getId),
                diffIds = EA.difference(allIds, resultIds);
            expect(result.length).toEqual(all.length - 1);
            expect(diffIds.length).toEqual(1);
            expect(diffIds[0]).toEqual(child6.id);
        });
        
        describe("first/last", function() {
            var items;
            beforeEach(function(){
                items = [
                    new Ext.Component({
                        action: 'type1',
                        id: 'id1'
                    }),
                    new Ext.container.Container({
                        action: 'type1',
                        id: 'id2'
                    }),
                    new Ext.container.Container({
                        action: 'type2',
                        id: 'id3'
                    }),
                    new Ext.Component({
                        action: 'type2',
                        id: 'id4'
                    }),
                    new Ext.container.Container({
                        action: 'type2',
                        id: 'id5'
                    })
                ];
            });
            
            afterEach(function(){
                Ext.Array.forEach(items, function(item){
                    item.destroy();
                });
                items = null;
            });
            
            describe("first", function(){
                it("should return an empty array if no items match", function(){
                    var result = cq.query('button:first', items);
                    expect(result).toEqual([]);  
                });
                
                it("should return the first matching component by type", function(){
                    var result = cq.query('container:first', items);
                    expect(result).toEqual([items[1]]);  
                });
                
                it("should return the last matching component by attribute", function(){
                    var result = cq.query('[action=type2]:first', items);
                    expect(result).toEqual([items[2]]);  
                });
                
                it("should return the first component", function(){
                    var result = cq.query('*:first', items);
                    expect(result).toEqual([items[0]]);  
                });
                
                describe("no items/single item", function(){
                    it("should return an empty array if there are no items", function(){
                        var result = cq.query('*:first', []);
                        expect(result).toEqual([]);    
                    });
                    
                    it("should return an a single item if it matches", function(){
                        var c = new Ext.Component();
                        var result = cq.query('component:first', [c]);
                        expect(result).toEqual([c]); 
                        c.destroy();   
                    });    
                });
            });
        
            describe("last", function(){
                it("should return an empty array if no items match", function(){
                    var result = cq.query('button:last', items);
                    expect(result).toEqual([]);  
                });
                
                it("should return the last matching component by type", function(){
                    var result = cq.query('component:last', items);
                    expect(result).toEqual([items[4]]);  
                });
                
                it("should return the first matching component by attribute", function(){
                    var result = cq.query('[action=type1]:last', items);
                    expect(result).toEqual([items[1]]);  
                });
                
                it("should return the first component", function(){
                    var result = cq.query('*:last', items);
                    expect(result).toEqual([items[4]]);  
                });
                
                describe("no items/single item", function(){
                    it("should return an empty array if there are no items", function(){
                        var result = cq.query('*:last', []);
                        expect(result).toEqual([]);    
                    });
                    
                    it("should return an a single item if it matches", function(){
                        var c = new Ext.Component();
                        var result = cq.query('component:last', [c]);
                        expect(result).toEqual([c]); 
                        c.destroy();   
                    });    
                });
            });
        });
    });
    
    describe('attribute value coercion', function() {
        var candidates = [{
            att1: 0,
            att2: 0,
            att3: 0,
            att4: 0
        }, {
            att1: null,
            att2: false,
            att3: true,
            att4: undefined
        }, {
            att1: 0,
            att2: 0,
            att3: 0,
            att4: 0
        }];

        if('should coerce "null" to match a null property value', function() {
            expect(cq.query('[att1=null]', candidates)).toBe(candidates[1]);
        });

        if('should coerce "false" to match a Boolean property value', function() {
            expect(cq.query('[att2=false]', candidates)).toBe(candidates[1]);
        });

        if('should coerce "true" to match a Boolean property value', function() {
            expect(cq.query('[att3=true]', candidates)).toBe(candidates[1]);
        });

        if('should coerce "undefined" to match an undefined property value', function() {
            expect(cq.query('[att4=undefined]', candidates)).toBe(candidates[1]);
        });
    });
    
    describe('ownProperty tests', function() {
        var TestClass = function(){},
            candidates;

        TestClass.prototype = { foo: 'bar', bletch: 0 };

         // Only candidates[1] has *ownProperties* foo and bletch
         // And the value of bletch is zero, so by [bletch] will never match.
         // Test that [?bletch] tests for just *presence* of property in object.
        candidates = [new TestClass(), {
            foo: 'bar',
            bletch: 0
        }];

        it('should only match candidates [@foo=bar] with ownProperty "foo" equal to "bar"', function() {
            expect(Ext.ComponentQuery.query('[@foo=bar]', candidates).length).toBe(1);
            expect(Ext.ComponentQuery.query('[@foo=bar]', candidates)[0]).toBe(candidates[1])
            expect(Ext.ComponentQuery.is(candidates[0], '[@foo=bar]')).toBe(false);
            expect(Ext.ComponentQuery.is(candidates[1], '[@foo=bar]')).toBe(true);
        });

        it('should not match candidates [bletch] where bletch is a falsy property', function() {
            expect(Ext.ComponentQuery.query('[bletch]', candidates).length).toBe(0);
            expect(Ext.ComponentQuery.is(candidates[0], '[bletch]')).toBe(false);
            expect(Ext.ComponentQuery.is(candidates[1], '[bletch]')).toBe(false);
        });

        it('should match candidates [?bletch] where bletch is a falsy property', function() {
            expect(Ext.ComponentQuery.query('[?bletch]', candidates).length).toBe(1);
            expect(Ext.ComponentQuery.query('[?bletch]', candidates)[0]).toBe(candidates[1]);
            expect(Ext.ComponentQuery.is(candidates[0], '[?bletch]')).toBe(false);
            expect(Ext.ComponentQuery.is(candidates[1], '[?bletch]')).toBe(true);
        });
    });
    
    describe('Querying floating descendants', function() {
        var c;
            
        beforeEach(function() {
            c = new Ext.container.Container({
                items: {
                    xtype: 'container',
                    floating: true,
                    id: 'floating-cq-child',
                    items: {
                        xtype: 'container',
                        floating: true,
                        id: 'floating-cq-grandchild',
                        items: {
                            floating: true,
                            id: 'floating-cq-great-grandchild'
                        }
                    }
                },
                renderTo: document.body
            });
        });
        afterEach(function() {
            c.destroy();
        });

        it('should find all descendants', function() {
            var d = c.query();
            expect(d.length).toEqual(3);
            expect(d[0]).toBe(Ext.getCmp('floating-cq-child'));
            expect(d[1]).toBe(Ext.getCmp('floating-cq-grandchild'));
            expect(d[2]).toBe(Ext.getCmp('floating-cq-great-grandchild'));
        });
        it('should find individual descendants', function() {
            var d = c.query('>*');
            expect(d.length).toEqual(1);
            expect(d[0]).toBe(Ext.getCmp('floating-cq-child'));

            d = c.query('>>*');
            expect(d.length).toEqual(1);
            expect(d[0]).toBe(Ext.getCmp('floating-cq-grandchild'));

            d = c.query('>>>*');
            expect(d.length).toEqual(1);
            expect(d[0]).toBe(Ext.getCmp('floating-cq-great-grandchild'));
        });
    });

    describe('trimming spaces', function () {
        var c;

        beforeEach(function () {
            c = new Ext.container.Container({
                items: {
                    xtype: 'button',
                    text: 'Test',
                    action: 'selectVendors'
                },
                renderTo: document.body
            });
        });

        afterEach(function () {
            c.destroy();
            c = null;
        });

        describe('single space', function () {
            describe("attribute matching expressions", function() {
                it('should trim leading space', function () {
                    result = cq.query('[action =selectVendors]', c);
                    expect(result.length).toBe(1);
                    expect(result[0].action).toBe('selectVendors');

                    result = cq.query('[action ^=selectVendors]', c);
                    expect(result.length).toBe(1);
                    expect(result[0].action).toBe('selectVendors');

                    result = cq.query('[action $=selectVendors]', c);
                    expect(result.length).toBe(1);
                    expect(result[0].action).toBe('selectVendors');
                });

                it('should trim trailing space', function () {
                    result = cq.query('[action= selectVendors]', c);
                    expect(result.length).toBe(1);
                    expect(result[0].action).toBe('selectVendors');

                    result = cq.query('[action*= selectVendors]', c);
                    expect(result.length).toBe(1);
                    expect(result[0].action).toBe('selectVendors');

                    result = cq.query('[action~= selectVendors]', c);
                    expect(result.length).toBe(1);
                    expect(result[0].action).toBe('selectVendors');
                });

                it('should trim both spaces', function () {
                    result = cq.query('[action = selectVendors]', c);
                    expect(result.length).toBe(1);
                    expect(result[0].action).toBe('selectVendors');

                    result = cq.query('[action *= selectVendors]', c);
                    expect(result.length).toBe(1);
                    expect(result[0].action).toBe('selectVendors');

                    result = cq.query('[action ~= selectVendors]', c);
                    expect(result.length).toBe(1);
                    expect(result[0].action).toBe('selectVendors');
                });
            });
        });

        describe('multiple spaces', function () {
            describe("attribute matching expressions", function() {
                it('should trim multiple leading spaces', function () {
                    result = cq.query('[action     =selectVendors]', c);
                    expect(result.length).toBe(1);
                    expect(result[0].action).toBe('selectVendors');

                    result = cq.query('[action     ^=selectVendors]', c);
                    expect(result.length).toBe(1);
                    expect(result[0].action).toBe('selectVendors');

                    result = cq.query('[action     $=selectVendors]', c);
                    expect(result.length).toBe(1);
                    expect(result[0].action).toBe('selectVendors');
                });

                it('should trim multiple trailing spaces', function () {
                    result = cq.query('[action=      selectVendors]', c);
                    expect(result.length).toBe(1);
                    expect(result[0].action).toBe('selectVendors');

                    result = cq.query('[action*=      selectVendors]', c);
                    expect(result.length).toBe(1);
                    expect(result[0].action).toBe('selectVendors');

                    result = cq.query('[action~=      selectVendors]', c);
                    expect(result.length).toBe(1);
                    expect(result[0].action).toBe('selectVendors');
                });

                it('should trim multiple spaces on both sides', function () {
                    result = cq.query('[action      =      selectVendors]', c);
                    expect(result.length).toBe(1);
                    expect(result[0].action).toBe('selectVendors');

                    result = cq.query('[action      *=      selectVendors]', c);
                    expect(result.length).toBe(1);
                    expect(result[0].action).toBe('selectVendors');

                    result = cq.query('[action      ~=      selectVendors]', c);
                    expect(result.length).toBe(1);
                    expect(result[0].action).toBe('selectVendors');
                });
            });
            
            describe("id matching expressions", function() {
                it("should trim leading spaces", function() {
                    result = cq.query(' #child9', root);
                
                    expect(result.length).toBe(1);
                    expect(result[0].id).toBe(child9.id);
                });
                
                it("should trim trailing spaces", function() {
                    result = cq.query('#child9 ', root);
                    
                    expect(result.length).toBe(1);
                    expect(result[0].id).toBe(child9.id);
                });
                
                it("should trim spaces on both sides", function() {
                    result = cq.query('   #child9       ', root);
                    
                    expect(result.length).toBe(1);
                    expect(result[0].id).toBe(child9.id);
                });
            });
            
            describe("descendancy expressions", function() {
                it("should trim leading spaces", function() {
                    result = cq.query(' [layout=card]    [type=B/G/H]', root);
                    
                    expect(result.length).toBe(1);
                    expect(result[0].id).toBe(child7.id);
                });
                
                it("should trim trailing spaces", function() {
                    result = cq.query('[type=B/G/J]   ^ [layout=hbox]   ', root);
                    
                    expect(result.length).toBe(1);
                    expect(result[0].id).toBe(child4.id);
                });
                
                it("should trim spaces on both sides", function() {
                    result = cq.query('     #child4      >       [type=B/C/F]        ', root);
                    
                    expect(result.length).toBe(1);
                    expect(result[0].id).toBe(child5.id);
                });
            });
        });
    });

    describe('pre- and postOrder', function () {
        var foo = false;

        afterEach(function () {
            foo = false;
            cq.cache.clear();
        });

        describe('preOrder', function () {
            it('should call the fn regardless of whether the selector has been cached', function () {
                expect(cq.cache.get('')).toBeUndefined();

                cq.visitPreOrder('', this, function () {
                    foo = true;
                });

                expect(foo).toBe(true);
            });
        });

        describe('postOrder', function () {
            it('should call the fn regardless of whether the selector has been cached', function () {
                expect(cq.cache.get('')).toBeUndefined();

                cq.visitPostOrder('', this, function () {
                    foo = true;
                });

                expect(foo).toBe(true);
            });
        });
    });
});
