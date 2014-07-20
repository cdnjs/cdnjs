describe("Ext.Element.traversal", function() {
    var el, input, child1, child2, child3, child4, child4_1, child4_1_1;
    
    beforeEach(function() {
        el = Ext.getBody().createChild({
            id      : 'ExtElementHelper',
            cls     : 'wrapper',
            style   : 'position:absolute;',
            children: [
                {id: 'child1', style: 'position:absolute;'},
                {id: 'child2', style: 'position:absolute;'},
                {id: 'child3', style: 'position:absolute;'},
                {
                    id: 'child4',
                    children: [
                        {
                            id : 'child4_1',
                            cls: 'findIt',
                            children: [
                                {
                                    id : 'child4_1_1'
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        
        input = Ext.getBody().createChild({
            id  : 'ExtElementInputHelper',
            tag : 'input',
            type: 'text'
        });
        
        child1 = Ext.get('child1');
        child2 = Ext.get('child2');
        child3 = Ext.get('child3');
        child4 = Ext.get('child4');
        child4_1 = Ext.get('child4_1');
        child4_1_1 = Ext.get('child4_1_1');
    });

    afterEach(function() {
        Ext.each(
            [el, input, child1, child2, child3, child4, child4_1, child4_1_1],
            function(el) {
                el.destroy();
            }
        );
    });
    
    describe("findParentNode", function() {
        it("should return document.body", function() {
            expect(el.findParentNode('body')).toEqual(document.body);
        });
        
        it("should return a dom", function() {
            expect(child1.findParentNode('.wrapper')).toEqual(Ext.getDom(el));
        });
        
        it("should return an el", function() {
            expect(child1.findParentNode('.wrapper', null, true)).toEqual(el);
        });
        
        describe("when maxDepth", function() {
            describe("1", function() {
                it("should not return the el", function() {
                    expect(child4_1.findParentNode('.wrapper', 1)).toBeNull();
                });
            });
            
            describe("2", function() {
                it("should not return the el", function() {
                    expect(child4_1.findParentNode('.wrapper', 2)).toEqual(Ext.getDom(el));
                });
            });
        });
    });
    
    describe("up", function() {
        it("should return Ext.getBody()", function() {
            expect(el.up('body')).toEqual(Ext.getBody());
        });
        
        it("should return a el", function() {
            expect(child1.up('.wrapper')).toEqual(el);
        });
        
        describe("when maxDepth", function() {
            describe("1", function() {
                it("should not return the el", function() {
                    expect(child4_1.up('.wrapper', 1)).toBeNull();
                });
            });
            
            describe("2", function() {
                it("should not return the el", function() {
                    expect(child4_1.up('.wrapper', 2)).toEqual(el);
                });
            });
        });
    });
    
    describe("select", function() {
        it("should return an Ext.CompositeELementLite", function() {
            var result = el.select('div');
            expect(result).toBeDefined();
            expect(result.elements.length).toEqual(6);
            expect(result instanceof Ext.CompositeElementLite).toBe(true);
        });
    });
    
    describe("query", function() {
        it("should return elements", function() {
            var result = el.query('div');
            
            expect(result).toBeDefined();
            expect(result.length).toEqual(6);
            expect(result.isComposite).toBeFalsy();
            expect(Ext.isArray(result)).toBeTruthy();
        });
    });
    
    describe("down", function() {
        it("should return an el", function() {
            var result = el.down('.findIt');
            
            expect(result).toBeDefined();
            expect(Ext.isElement(result)).toBeFalsy();
        });
        
        it("should return a dom", function() {
            var result = el.down('.findIt', true);
            
            expect(result).toBeDefined();
            expect(Ext.isElement(result)).toBeTruthy();
        });
    });

    describe("child", function() {
        it("should return null", function() {
            var result = el.child('.findIt');
            
            expect(result).toBeNull();
        });
        
        it("should return an el", function() {
            var result = child4.child('.findIt');
            
            expect(result).toBeDefined();
            expect(Ext.isElement(result)).toBeFalsy();
        });
        
        it("should return a dom", function() {
            var result = child4.child('.findIt', true);
            
            expect(result).toBeDefined();
            expect(Ext.isElement(result)).toBeTruthy();
        });
    });
    
    describe("parent", function() {
        it("should return an el", function() {
            var result = child1.parent();
            
            expect(result).toBeDefined();
            expect(result).toEqual(el);
            expect(Ext.isElement(result)).toBeFalsy();
        });
        
        it("should return a dom", function() {
            var result = child1.parent(null, true);
            
            expect(result).toBeDefined();
            expect(result).toEqual(Ext.getDom(el));
            expect(Ext.isElement(result)).toBeTruthy();
        });
    });
    
    describe("next", function() {
        it("should return an el", function() {
            var result = child1.next();
            
            expect(result).toBeDefined();
            expect(result).toEqual(child2);
            expect(Ext.isElement(result)).toBeFalsy();
        });
        
        it("should return a dom", function() {
            var result = child1.next(null, true);
            
            expect(result).toBeDefined();
            expect(result).toEqual(Ext.getDom(child2));
            expect(Ext.isElement(result)).toBeTruthy();
        });
    });
    
    describe("prev", function() {
        it("should return an el", function() {
            var result = child2.prev();
            
            expect(result).toBeDefined();
            expect(result).toEqual(child1);
            expect(Ext.isElement(result)).toBeFalsy();
        });
        
        it("should return a dom", function() {
            var result = child2.prev(null, true);
            
            expect(result).toBeDefined();
            expect(result).toEqual(Ext.getDom(child1));
            expect(Ext.isElement(result)).toBeTruthy();
        });
    });
    
    describe("first", function() {
        it("should return an el", function() {
            var result = el.first();
            
            expect(result).toBeDefined();
            expect(result).toEqual(child1);
            expect(Ext.isElement(result)).toBeFalsy();
        });
        
        it("should return a dom", function() {
            var result = el.first(null, true);
            
            expect(result).toBeDefined();
            expect(result).toEqual(Ext.getDom(child1));
            expect(Ext.isElement(result)).toBeTruthy();
        });
    });
    
    describe("last", function() {
        it("should return an el", function() {
            var result = el.last();
            
            expect(result).toBeDefined();
            expect(result).toEqual(child4);
            expect(Ext.isElement(result)).toBeFalsy();
        });
        
        it("should return a dom", function() {
            var result = el.last(null, true);
            
            expect(result).toBeDefined();
            expect(result).toEqual(Ext.getDom(child4));
            expect(Ext.isElement(result)).toBeTruthy();
        });
    });
    
    describe("findParent", function() {
        it("should return document.body", function() {
            expect(el.findParent('body')).toEqual(document.body);
        });
        
        it("should return a dom", function() {
            expect(child1.findParent('.wrapper')).toEqual(Ext.getDom(el));
        });
        
        it("should return an el", function() {
            expect(child1.findParent('.wrapper', null, true)).toEqual(el);
        });
        
        describe("when maxDepth", function() {
            describe("1", function() {
                it("should not return the el", function() {
                    expect(child4_1.findParent('.wrapper', 1)).toBeNull();
                });
            });
            
            describe("2", function() {
                it("should not return the el", function() {
                    expect(child4_1.findParent('.wrapper', 2)).toBeNull();
                });
            });
            
            describe("3", function() {
                it("should return the el", function() {
                    expect(child4_1.findParent('.wrapper', 3)).toEqual(Ext.getDom(el));
                });
            });
            
            describe("NaN", function() {
                it("should use Number.MAX_VALUE", function() {
                    expect(child4_1.findParent('.wrapper', Ext.getBody())).toEqual(Ext.getDom(el));
                });
            });
        });
    });
    
    describe("contains", function(){
        it('should return false for siblings', function(){
            expect(Ext.fly(child1).contains(child4_1_1)).toBe(false);
            expect(Ext.fly(child2).contains(child4_1_1)).toBe(false);
        });
        it('should return true for parents', function(){
            expect(Ext.fly(child4_1).contains(child4_1_1)).toBe(true);
        });
        it('should return true for grandparents', function(){
            expect(Ext.fly(child4).contains(child4_1_1)).toBe(true);
        });
        it('should return true for self', function(){
            expect(Ext.fly(child4_1_1).contains(child4_1_1)).toBe(true);
        });
    });
}, "/src/dom/Element.traversal.js");
