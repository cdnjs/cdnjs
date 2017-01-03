describe("Ext.util.TextMetrics", function(){
    
    var defaultText = 'The quick brown fox jumps over the lazy dog',
        el, tm, makeTm, staticTm, makeEl;
    
    beforeEach(function(){
        makeEl = function(style, value) {
            return Ext.getBody().createChild({
                style: style + ':' + value
            });    
        };
        
        makeTm = function(style, value, fixedWidth, text){
            Ext.destroy(tm);
            el = makeEl(style, value);
            tm = new Ext.util.TextMetrics(el, fixedWidth);
            el.destroy();
            return tm.getSize(text || defaultText);
        }; 
        
        staticTm = function(style, value, fixedWidth, text) {
            var measurement;

            el = makeEl(style, value);
            measurement = Ext.util.TextMetrics.measure(el, text || defaultText, fixedWidth);
            el.destroy();
            return measurement;
        }
    });
    
    afterEach(function(){
        Ext.destroy(tm);
        makeTm = staticTm = makeEl = tm = null;
    });
    
    describe("width", function() {
        describe("styles that should affect sizing", function(){
        
            describe("font size", function(){
                
                var baseLine;
                beforeEach(function(){
                    baseLine = staticTm('font-size', '16px').width;
                });
                
                it("should affect instance sizing", function(){
                    var w = makeTm('font-size', '8px').width;
                    expect(w).toBeLessThan(baseLine);
                    w = makeTm('font-size', '24px').width;
                    expect(w).toBeGreaterThan(baseLine);
                });
                
                it("should affect static sizing", function(){
                    var w = staticTm('font-size', '8px').width;
                    expect(w).toBeLessThan(baseLine);
                    w = staticTm('font-size', '24px').width;
                    expect(w).toBeGreaterThan(baseLine);
                });
            });
            
            describe("font weight", function(){
                var baseLine;
                beforeEach(function(){
                    baseLine = staticTm('font-weight', 'normal').width;
                });
                
                it("should affect instance sizing", function(){
                    var w = makeTm('font-weight', 'bold').width;
                    expect(w).toBeGreaterThan(baseLine);
                });
                
                it("should affect static sizing", function(){
                    var w = staticTm('font-weight', 'bold').width;
                    expect(w).toBeGreaterThan(baseLine);
                });
            });
            
            describe("font family", function(){
                var baseLine;
                beforeEach(function(){
                    baseLine = staticTm('font-family', 'Arial').width;
                });
                
                // Tahoma should be wider
                it("should affect instance sizing", function(){
                    var w = makeTm('font-family', 'Tahoma').width;
                    expect(w).toBeGreaterThan(baseLine);
                });
                
                it("should affect static sizing", function(){
                    var w = staticTm('font-family', 'Tahoma').width;
                    expect(w).toBeGreaterThan(baseLine);
                });
            });
            
            // The spec fails in safari 5.x for some reason, leave it out
            // for now until we can get something more definite in.
            xdescribe("text transform", function(){
                var baseLine;
                beforeEach(function(){
                    baseLine = staticTm('text-transform', 'lowercase').width;
                });
                
                // Tahoma should be wider
                it("should affect instance sizing", function(){
                    var w = makeTm('text-transform', 'uppercase').width;
                    expect(w).toBeGreaterThan(baseLine);
                });
                
                it("should affect static sizing", function(){
                    var w = staticTm('text-transform', 'uppercase').width;
                    expect(w).toBeGreaterThan(baseLine);
                });
            });
            
            describe("letter spacing", function(){
                
                var baseLine;
                beforeEach(function(){
                    baseLine = staticTm('letter-spacing', '16px').width;
                });
                
                it("should affect instance sizing", function(){
                    var w = makeTm('letter-spacing', '8px').width;
                    expect(w).toBeLessThan(baseLine);
                    w = makeTm('letter-spacing', '24px').width;
                    expect(w).toBeGreaterThan(baseLine);
                });
                
                it("should affect static sizing", function(){
                    var w = staticTm('letter-spacing', '8px').width;
                    expect(w).toBeLessThan(baseLine);
                    w = staticTm('letter-spacing', '24px').width;
                    expect(w).toBeGreaterThan(baseLine);
                });
            });
            
        });
        
    });
    
    describe("height", function(){
        describe("styles that should affect sizing", function(){
        
            describe("font size", function(){
                
                var baseLine;
                beforeEach(function(){
                    baseLine = staticTm('font-size', '16px', 300).height;
                });
                
                it("should affect instance sizing", function(){
                    var h = makeTm('font-size', '8px', 300).height;
                    expect(h).toBeLessThan(baseLine);
                    h = makeTm('font-size', '24px', 300).height;
                    expect(h).toBeGreaterThan(baseLine);
                });
                
                it("should affect static sizing", function(){
                    var h = staticTm('font-size', '8px', 300).height;
                    expect(h).toBeLessThan(baseLine);
                    h = staticTm('font-size', '24px', 300).height;
                    expect(h).toBeGreaterThan(baseLine);
                });
            });
            
            describe("line height", function(){
                
                var baseLine;
                beforeEach(function(){
                    baseLine = staticTm('line-height', '16px', 300).height;
                });
                
                it("should affect instance sizing", function(){
                    var h = makeTm('line-height', '8px', 300).height;
                    expect(h).toBeLessThan(baseLine);
                    h = makeTm('line-height', '24px', 300).height;
                    expect(h).toBeGreaterThan(baseLine);
                });
                
                it("should affect static sizing", function(){
                    var h = staticTm('line-height', '8px', 300).height;
                    expect(h).toBeLessThan(baseLine);
                    h = staticTm('line-height', '24px', 300).height;
                    expect(h).toBeGreaterThan(baseLine);
                });
            });
        });
    });
    
    describe("dynamic binding", function(){
        
        it("should be able to bind to different elements using an instance", function(){
            var w1, w2, w3, el, tm;
            
            tm = new Ext.util.TextMetrics();
            
            el = makeEl('font-size', '8px');
            tm.bind(el);
            w1 = tm.getWidth(defaultText);
            el.destroy();
            
            el = makeEl('font-size', '16px');
            tm.bind(el);
            w2 = tm.getWidth(defaultText);
            el.destroy();
            
            el = makeEl('font-size', '24px');
            tm.bind(el);
            w3 = tm.getWidth(defaultText);
            el.destroy();
            
            expect(w3).toBeGreaterThan(w2);
            expect(w2).toBeGreaterThan(w1);

            Ext.destroy(tm);
        });
        
        it("should measure different elements using the static method", function(){
            var w1, w2, w3, el;
            
            el = makeEl('font-size', '8px');
            w1 = Ext.util.TextMetrics.measure(el, defaultText).width;
            el.destroy();
            
            el = makeEl('font-size', '16px');
            w2 = Ext.util.TextMetrics.measure(el, defaultText).width;
            el.destroy();
            
            el = makeEl('font-size', '24px');
            w3 = Ext.util.TextMetrics.measure(el, defaultText).width;
            el.destroy();
            
            expect(w3).toBeGreaterThan(w2);
            expect(w2).toBeGreaterThan(w1);
        });
        
    });
    
    describe("property copying", function() {
        it("should copy font-size", function() {
            makeTm('font-size', '53px');
            expect(tm.measure.getStyle('font-size')).toBe('53px');    
        });
        
        it("should copy font-style", function() {
            makeTm('font-style', 'italic');
            expect(tm.measure.getStyle('font-style')).toBe('italic');    
        });
        
        it("should copy font-weight", function() {
            makeTm('font-weight', '900');
            expect(String(tm.measure.getStyle('font-weight'))).toBe('900');    
        });
        
        it("should copy font-family", function() {
            makeTm('font-family', 'Arial');
            expect(tm.measure.getStyle('font-family')).toBe('Arial');    
        });
        
        it("should copy line-height", function() {
            makeTm('line-height', '20px');
            expect(tm.measure.getStyle('line-height')).toBe('20px');    
        });
        
        it("should copy text-transform", function() {
            makeTm('text-transform', 'uppercase');
            expect(tm.measure.getStyle('text-transform')).toBe('uppercase');    
        });
        
        it("should copy letter-spacing", function() {
            makeTm('letter-spacing', '3px');
            expect(tm.measure.getStyle('letter-spacing')).toBe('3px');    
        });
        
        it("should copy word-break", function() {
            makeTm('word-break', 'break-all');
            expect(tm.measure.getStyle('word-break')).toBe('break-all');    
        });
    });
    
});
