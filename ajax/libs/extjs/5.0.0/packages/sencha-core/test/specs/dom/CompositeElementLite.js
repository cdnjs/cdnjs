describe("Ext.CompositeElementLite", function(){
    
    var mainRoot, ce, makeCE,
        fooTotal = 6,
        barTotal = 5,
        bazTotal = 4,
        child1Total = 5,
        child2Total = 4,
        child1RootedTotal = 2,
        child2RootedTotal = 2,
        child1MainTotal = 3,
        child2MainTotal = 2,
        byId = function(id) {
            return document.getElementById(id);    
        };
    
    beforeEach(function(){
        mainRoot = Ext.getBody().createChild({
            id: 'mainRoot'
        });
        
        mainRoot.dom.innerHTML = [
            '<div class="foo toFilter" id="a">',
                '<div class="child1">c1</div>',
                '<div class="child2">c2</div>',
                '<div class="child1">c3</div>',
                '<div class="child2">c4</div>',
            '</div>',
            '<div class="bar" id="b"></div>',
            '<div class="baz" id="c"></div>',
            '<div class="foo" id="d"></div>',
            '<div class="bar" id="e"></div>',
            '<div class="baz" id="f"></div>',
            '<div class="foo toFilter" id="g"></div>',
            '<div class="bar" id="h"></div>',
            '<div class="baz" id="i"></div>',
            '<div class="foo" id="j"></div>',
            '<div class="bar" id="k"></div>',
            '<div class="baz" id="l"></div>',
            '<div class="foo" id="m"></div>',
            '<div class="bar" id="n"></div>',
            '<div class="foo" id="o"></div>',
            '<div class="child1" id="p"></div>',
            '<div class="child2" id="q"></div>',
            '<div class="child1" id="r"></div>',
            '<div class="child2" id="s"></div>',
            '<div class="child1" id="t"></div>'
        ].join('');
        
        makeCE = function(els) {
            ce = new Ext.CompositeElementLite(els);
        };
    });
    
    afterEach(function(){
        mainRoot.destroy();
        makeCE = mainRoot = ce = null;
    });

    describe("constructor", function() {
        // TODO
    });
    
    describe("add", function(){
        it("should accept a selector", function(){
            makeCE();
            ce.add('.foo');
            expect(ce.getCount()).toBe(fooTotal);
        });  
        
        it("should accept a selector with a root", function(){
            makeCE();
            ce.add('.child1', 'a');
            expect(ce.getCount()).toBe(child1RootedTotal);    
        });
        
        it("should accept another CompositeElement", function(){
            var other = new Ext.CompositeElementLite();
            other.add(byId('a'));
            other.add(byId('b'));
            other.add(byId('c'));
            makeCE();
            ce.add(other);
            expect(ce.getCount()).toBe(3);
        });
        
        it("should accept an array of elements", function(){
            makeCE();
            ce.add([byId('a'), byId('b')]);
            expect(ce.getCount()).toBe(2);    
        });
        
        it("should accept a NodeList", function(){
            makeCE();
            ce.add(byId('a').getElementsByTagName('div'));
            expect(ce.getCount()).toBe(4);  
        });
        
        it("should accept a single element", function(){
            makeCE();
            ce.add(byId('a'));
            expect(ce.getCount()).toBe(1);    
        });
        
        it("should accept a null argument", function(){
            makeCE();
            expect(ce.add(null)).toBe(ce);
        });
        
        it("should return the CompositeElement", function(){
            makeCE();
            expect(ce.add('.foo')).toBe(ce);
        })
    });
    
    describe("item", function(){
        it("should return null if there are no items", function(){
            makeCE();
            expect(ce.item(0)).toBeNull();
        });
        
        it("should return null if an item at that index does not exist", function(){
            makeCE('.foo');    
            expect(ce.item(fooTotal)).toBeNull();
        });
        
        it("should return the item at the specified index", function(){
            makeCE('.foo');
            expect(ce.item(2).dom.id).toBe('g');    
        });
        
        describe("first", function(){
            it("should return null when there are no items", function(){
                makeCE();
                expect(ce.first()).toBeNull();
            });
            
            it("should return the first item", function(){
                makeCE('.foo');
                expect(ce.first().dom.id).toBe('a');    
            });
        });
        
        describe("last", function(){
            it("should return null when there are no items", function(){
                makeCE();
                expect(ce.last()).toBeNull();
            });
            
            it("should return the last item", function(){
                makeCE('.foo');
                expect(ce.last().dom.id).toBe('o');
            })
        });
    });
    
    describe("each", function(){
        it("should never iterate if there are no items", function(){
            var cnt = 0;
            makeCE();
            ce.each(function(){
                ++cnt;
            });    
            expect(cnt).toBe(0);
        });  
        
        it("should iterate over each item", function(){
            var cnt = 0;
            makeCE('.baz');
            ce.each(function(){
                ++cnt;
            });
            expect(cnt).toBe(bazTotal);
        });
        
        it("should default the scope to the element", function(){
            var isEl;
            makeCE(byId('a'));
            ce.each(function(e){
                isEl = (e == this);
            });
            expect(isEl).toBe(true);
        });
        
        it("should use a specified scope", function(){
            var o = {},
                scope;
                
            makeCE('.foo');  
            ce.each(function(){
                scope = this;
            }, o);  
            expect(scope).toBe(o);
        });
        
        it("should pass the element, the ce & the index", function(){
            var info;
            makeCE(byId('a'));
            ce.each(function(el, theCE, index){
                info = [el.dom.id, theCE, index];
            });    
            expect(info).toEqual(['a', ce, 0]);
        });
        
        it("should exit upon returning false", function(){
            var cnt = 0;
            makeCE('.foo');
            ce.each(function(el){
                if (el.dom.id == 'd') {
                    return false;
                }
                ++cnt;
            });
            expect(cnt).toBe(1);
        });
        
        it("should return the CompositeElement", function(){
            makeCE();
            expect(ce.each(function(){})).toBe(ce);    
        });
    });
    
    describe("fill", function(){
        it("should clear any existing elements", function(){
            makeCE('.foo');
            ce.fill(null);
            expect(ce.getCount()).toBe(0);    
        });
        
        it("should accept a selector", function(){
            makeCE('.foo');
            expect(ce.getCount()).toBe(fooTotal);
            ce.fill('.bar');
            expect(ce.getCount()).toBe(barTotal);    
        });
        
        it("should accept an array of elements", function(){
            makeCE();
            ce.fill([byId('a'), byId('b')]);
            expect(ce.getCount()).toBe(2);    
        });
        
        it("should accept a NodeList", function(){
            makeCE();
            ce.fill(byId('a').getElementsByTagName('div'));
            expect(ce.getCount()).toBe(4);  
        });
        
        it("should accept another CompositeElement", function(){
            var other = new Ext.CompositeElementLite();
            other.add(byId('a'));
            other.add(byId('b'));
            other.add(byId('c'));
            makeCE();
            ce.fill(other);
            expect(ce.getCount()).toBe(3);
        });
        
        it("should return the CompositeElement", function(){
            makeCE();
            expect(ce.fill(null)).toBe(ce);
        });
    });
    
    describe("filter", function(){
        
        it("should accept a selector", function(){
            makeCE('.foo');
            expect(ce.getCount()).toBe(fooTotal);
            expect(ce.filter('.toFilter').getCount()).toBe(2);
        });
        
        it("should return the CompositeElement", function(){
            makeCE();
            expect(ce.filter(function(){})).toBe(ce);    
        });  
        
        it("should accept a function", function(){
            makeCE('.foo');
            ce.filter(function(el){
                var id = el.dom.id;
                return id == 'a' || id == 'd' || id == 'g';    
            });
            expect(ce.getCount()).toBe(3);
        });
        
        it("should set the scope to the element", function(){
            var id;
            makeCE(byId('a'));
            ce.filter(function(){
                id = this.dom.id;
            }); 
            expect(id).toBe('a');
        });
        
        it("should pass the element, the CompositeElement & the index", function(){
            var info;
            makeCE(byId('a'));
            ce.filter(function(el, otherCE, index){
                info = [el.dom.id, otherCE, index];
            }); 
            expect(info).toEqual(['a', ce, 0]);
        });
    });
    
    describe("indexOf", function(){
        it("should return -1 when there are no items", function(){
            makeCE();
            expect(ce.indexOf('a')).toBe(-1);    
        });
        
        it("should return -1 when the item doesn't exist in the collection", function(){
            makeCE('.bar');
            expect(ce.indexOf('a')).toBe(-1);   
        });
        
        it("should accept an id", function(){
            makeCE('.foo');
            expect(ce.indexOf('a')).toBe(0);    
        });
        
        it("should accept an HTMLElement", function(){
            makeCE('.foo');
            expect(ce.indexOf(byId('d'))).toBe(1);    
        });
        
        it("should accept an Ext.dom.Element", function(){
            makeCE('.foo');
            expect(ce.indexOf(Ext.fly('g'))).toBe(2);
        });
    });
    
    describe("contains", function(){
        it("should return false when there are no items", function(){
            makeCE();
            expect(ce.contains('a')).toBe(false);    
        });
        
        it("should return false when the item doesn't exist in the collection", function(){
            makeCE('.bar');
            expect(ce.contains('a')).toBe(false);   
        });
        
        it("should accept an id", function(){
            makeCE('.foo');
            expect(ce.contains('a')).toBe(true);    
        });
        
        it("should accept an HTMLElement", function(){
            makeCE('.foo');
            expect(ce.contains(byId('d'))).toBe(true);    
        });
        
        it("should accept an Ext.dom.Element", function(){
            makeCE('.foo');
            expect(ce.contains(Ext.fly('g'))).toBe(true);
        });
    });
    
    describe("removeElement", function(){
        it("should accept a string id", function(){
            makeCE('.foo');
            ce.removeElement('a');
            expect(ce.contains('a')).toBe(false);
        });
        
        it("should accept an HTMLElement", function(){
            makeCE('.foo');
            ce.removeElement(byId('a'));
            expect(ce.contains('a')).toBe(false);
        });
        
        it("should accept an Ext.dom.Element", function(){
            makeCE('.foo');
            ce.removeElement(Ext.fly('a'));
            expect(ce.contains('a')).toBe(false);
        });
        
        it("should accept an index", function(){
            makeCE('.foo');
            ce.removeElement(0);
            expect(ce.contains('a')).toBe(false);
        });
        
        it("should remove the element if removeDom is specified", function(){
            makeCE('.foo');
            ce.removeElement('a', true);
            // refill from DOM
            ce.fill('.foo');
            expect(ce.contains('a')).toBe(false);    
        });
        
        it("should return the CompositeElement", function(){
            makeCE();
            expect(ce.removeElement(null)).toBe(ce);    
        });
    });
    
    describe("clear", function(){
        it("should do nothing when the collection is empty", function(){
            makeCE();
            ce.clear();
            expect(ce.getCount()).toBe(0);    
        });
        
        it("should remove all elements", function(){
            makeCE('.foo');
            ce.clear();
            expect(ce.getCount()).toBe(0);    
        });
    });
    
});
