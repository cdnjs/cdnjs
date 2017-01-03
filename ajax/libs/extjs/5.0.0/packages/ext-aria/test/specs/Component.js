describe("Ext.aria.Component", function() {
    var c;
    
    function makeComponent(cfg) {
        c = new Ext.Component(cfg || {});
    }

    afterEach(function() {
        if (c) {
            c.destroy();
        }
        
        c = null;
    });

    describe("component lookup by element", function() {
        var cmpIdAttr = Ext.AbstractComponent.componentIdAttribute;
        
        describe("focusable components", function() {
            beforeEach(function(){
                makeComponent({
                    renderTo: Ext.getBody(),
                    autoEl: 'button',
                    childEls: [ 'divEl', 'spanEl' ],
                    renderTpl: [
                        '<div id="{id}-divEl" data-ref="divEl">',
                            '<span id="{id}-spanEl" data-ref="spanEl">foo bar</span>',
                        '</div>'
                    ],
                    getFocusEl: function() {
                        return this.el;
                    }
                });
            });
        
            it("should add " + cmpIdAttr + " attribute to the focusable element", function() {
                var cmpId = c.getFocusEl().getAttribute(cmpIdAttr);
            
                expect(cmpId).toBe(c.id);
            });

            it("should be able to look Component up by " + cmpIdAttr + " attribute", function() {
                spyOn(Ext.AbstractComponent, 'findComponentByElement');
            
                var cmp = Ext.Component.getComponentByElement(c.getFocusEl());
            
                expect(cmp).toEqual(c);
                expect(Ext.AbstractComponent.findComponentByElement).not.toHaveBeenCalled();
            });
        
            it("should be able to look Component up by inner element", function() {
                var cmp = Ext.Component.getComponentByElement(c.spanEl);
            
                expect(cmp).toEqual(c);
            });
        
            // We don't have Viewport here, so lookup on body should fail
            it("should return null if no Component is found", function() {
                var cmp = Ext.Component.getComponentByElement(Ext.getBody());
            
                expect(cmp).toBe(null);
            });
        });
    });
    
    describe("blur/focus", function(){
        beforeEach(function(){
            makeComponent({
                renderTo: Ext.getBody(),
                autoEl: 'button',
                getFocusEl: function() {
                    return this.el;
                }
            });
        });
        
        it("should look up focused Component", function() {
            runs(function() {
                c.focus();
            });
            
            waitsFor(function() {
                return c.el.hasCls(focusCls);
            }, 'CSS class to be added', 100);
            
            runs(function() {
                var cmp = Ext.Component.getActiveComponent();
                
                expect(cmp).toEqual(c);
            });
        });
    });
});
