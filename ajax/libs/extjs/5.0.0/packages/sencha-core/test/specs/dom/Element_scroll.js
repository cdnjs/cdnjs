describe("Ext.dom.Element_scroll", function() {
    
    var el;
    
    afterEach(function(){
        Ext.destroy(el);
        el = null;    
    });
    
    function expectLeft(left) {
        expect(el.dom.scrollLeft).toBe(left);    
    }
    
    function expectTop(top) {
        expect(el.dom.scrollTop).toBe(top);    
    }
    
    function expectLeftTop(left, top) {
        expectLeft(left);
        expectTop(top);
    }
    
    describe("scroll", function() {
        var scrollSize = Ext.getScrollbarSize(),
            maxHorz = 600 + scrollSize.width,
            maxVert = 600 + scrollSize.height;
            
        beforeEach(function(){
            el = Ext.getBody().createChild({
                style: {
                    width: '400px',
                    height: '400px',
                    overflow: 'auto'
                },
                cn: [{
                    style: {
                        width: '1000px',
                        height: '1000px'
                    }
                }]
            });
        });
        
        describe("right", function(){
            it("should accept 'right' as a param", function(){
                el.scroll('right', 200);
                expectLeft(200);
            });  
            
            it("should accept 'r' as a param", function(){
                el.scroll('r', 175);
                expectLeft(175);
            }); 
            
            it("should append to the current position", function(){
                el.scroll('r', 200);
                el.scroll('r', 300);
                expectLeft(500);    
            });
            
            it("should constrain the max scroll", function(){
                el.scroll('r', 2000);
                expectLeft(maxHorz);    
            });
        });
        
        describe("left", function(){
            it("should accept 'left' as a param", function(){
                el.scroll('r', 200);
                el.scroll('left', 125);
                expectLeft(75);
            });  
            
            it("should accept 'l' as a param", function(){
                el.scroll('r', 300);
                el.scroll('l', 150);
                expectLeft(150);
            }); 
            
            it("should append to the current position", function(){
                el.scroll('r', 500);
                el.scroll('l', 300);
                el.scroll('l', 100);
                expectLeft(100);    
            });
            
            it("should constrain to 0", function(){
                el.scroll('r', 100);
                el.scroll('l', 350);
                expectLeft(0);    
            });
        });
        
        describe("bottom", function(){
            it("should accept 'bottom' as a param", function() {
                el.scroll('bottom', 30);
                expectTop(30);    
            });  
            
            it("should accept 'b' as a param", function() {
                el.scroll('b', 120);
                expectTop(120);    
            }); 
            
            it("should accept 'down' as a param", function() {
                el.scroll('down', 30);
                expectTop(30);    
            }); 
            
            it("should accept 'd' as a param", function() {
                el.scroll('d', 375);
                expectTop(375); 
            });
            
            it("should append to the current position", function() {
                el.scroll('b', 120);
                el.scroll('b', 130);
                expectTop(250);    
            });
            
            it("should constrain the max scroll", function(){
                el.scroll('b', 1500);
                expectTop(maxVert);    
            });
        });
        
        describe("up", function(){
            it("should accept 'up' as a param", function() {
                el.scroll('b', 30);
                el.scroll('u', 10);
                expectTop(20);    
            });  
            
            it("should accept 'u' as a param", function() {
                el.scroll('b', 120);
                el.scroll('u', 50);
                expectTop(70);    
            }); 
            
            it("should accept 'top' as a param", function() {
                el.scroll('b', 200);
                el.scroll('top', 130);
                expectTop(70);    
            }); 
            
            it("should accept 't' as a param", function() {
                el.scroll('b', 500);
                el.scroll('t', 375);
                expectTop(125); 
            });
            
            it("should append to the current position", function() {
                el.scroll('b', 300);
                el.scroll('t', 120);
                el.scroll('t', 130);
                expectTop(50);    
            });
            
            it("should constrain the max scroll", function() {
                el.scroll('b', 300);
                el.scroll('t', 3000);
                expectTop(0);    
            });
        });
        
    });
    
});
