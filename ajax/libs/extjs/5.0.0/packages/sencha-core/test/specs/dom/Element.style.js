describe("Ext.Element.style", function() {
    var testEl;
    
    beforeEach(function() {
        testEl = Ext.getBody().createChild({
            id      : 'ExtElementHelper',
            style   : 'position:absolute;'
        });
    });
    
    afterEach(function() {
        testEl.destroy();
    });
    
    describe('addCls', function () {
        xit('should add one class', function () {
            testEl.addCls('foo');
            expect(testEl.dom.className).toEqual('foo');
        });

        it('should add two class', function () {
            testEl.addCls('foo').addCls('bar');
            expect(testEl.dom.className).toEqual('foo bar');
        });

        xit('should add one class when given duplicates', function () {
            testEl.addCls('foo').addCls('foo');
            expect(testEl.dom.className).toEqual('foo');
        });

        xit('should add two class at once', function () {
            testEl.addCls('foo bar').addCls('bar');
            expect(testEl.dom.className).toEqual('foo bar');
        });

        xit('should add two class at once and handle duplicates', function () {
            testEl.addCls('foo bar').addCls('bar foo');
            expect(testEl.dom.className).toEqual('foo bar');
        });
    });

    describe('removeCls', function () {
        it('should remove nothing if no classes', function () {
            testEl.removeCls('bar');
            expect(testEl.dom.className).toEqual('');
        });

        it('should remove nothing if class is not present', function () {
            testEl.dom.className = 'foo bar';
            testEl.removeCls('fbar');
            expect(testEl.dom.className).toEqual('foo bar');
        });

        it('should remove only class', function () {
            testEl.dom.className = 'foo';
            testEl.removeCls('foo');
            expect(testEl.dom.className).toEqual('');
        });

        it('should remove last class', function () {
            testEl.dom.className = 'foo bar';
            testEl.removeCls('bar');
            expect(testEl.dom.className).toEqual('foo');
        });

        it('should remove first class', function () {
            testEl.dom.className = 'foo bar';
            testEl.removeCls('bar');
            expect(testEl.dom.className).toEqual('foo');
        });

        it('should remove middle class', function () {
            testEl.dom.className = 'foo bar jazz';
            testEl.removeCls('bar');
            expect(testEl.dom.className).toEqual('foo jazz');
        });

        it('should remove multiple classes', function () {
            testEl.dom.className = 'foo bar jazz spud';
            testEl.removeCls('jazz bar fff');
            expect(testEl.dom.className).toEqual('foo spud');
        });

        it('should remove multiple classes sequentially', function () {
            testEl.dom.className = 'foo bar jazz spud';
            testEl.removeCls('jazz').removeCls('bar').removeCls('fff');
            expect(testEl.dom.className).toEqual('foo spud');
        });
    });

    describe('getStyle', function(){
        var el, dom;
        beforeEach(function(){
            dom = document.createElement('div');
            testEl.appendChild(dom);
            el = Ext.get(dom);
        });
        afterEach(function(){
            el.destroy();
        });

        describe('border-*-width', function(){
            Ext.Array.forEach('top right bottom left'.split(' '), function(side){
                it('must report the correct border-'+ side +'-width when the border-'+ side +'-style is "solid"', function(){
                    dom.style.cssText = 'border:5px solid';
                    expect(el.getStyle('border-'+ side +'-width')).toBe('5px');
                });
                it('must report 0px for border-'+ side +'-width when the border-'+ side +'-style is "none"', function(){
                    dom.style.cssText = 'border:5px solid; border-' + side + '-style:none';
                    expect(el.getStyle('border-'+ side +'-width')).toBe('0px');
                });
            });
        });

    });
    
    describe('setStyle', function() {
        var el, dom;
        beforeEach(function(){
            dom = document.createElement('div');
            testEl.appendChild(dom);
            el = Ext.get(dom);
        });
        afterEach(function(){
            el.destroy();
        });

        describe('font-size', function() {
            it('should set the font size', function() {
                el.setStyle('font-size', '50px');
                expect(el.getStyle('font-size')).toEqual('50px');
            });
        });

        describe('font-sstyle', function() {
            it('should set the font style', function() {
                el.setStyle('font-style', 'italic');
                expect(el.getStyle('font-style')).toEqual('italic');
            });
        });

        describe('font-family', function() {
            it('should set the font family', function() {
                el.setStyle('font-family', 'Courier');
                expect(el.getStyle('font-family').toLowerCase().indexOf('courier')).toBeGreaterThan(-1);
            });
        });
    });

}, "/src/dom/Element.style.js");
