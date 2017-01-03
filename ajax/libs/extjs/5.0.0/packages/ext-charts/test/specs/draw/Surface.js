describe("Ext.draw.Surface", function() {

    describe("Ext.draw.Surface prototype", function() {

        it("should have 'container' property", function() {
            expect(typeof Ext.draw.Surface.prototype.container).toEqual("undefined");
        });

        it("should have 'x' property", function() {
            expect(typeof Ext.draw.Surface.prototype.x).toEqual("number");
        });

        it("should have 'y' property", function() {
            expect(typeof Ext.draw.Surface.prototype.y).toEqual("number");
        });

        it("should have 'width' property", function() {
            expect(typeof Ext.draw.Surface.prototype.width).toEqual("number");
        });

        it("should have 'height' property", function() {
            expect(typeof Ext.draw.Surface.prototype.height).toEqual("number");
        });

        it("should have a constructor", function() {
            expect(typeof Ext.draw.Surface.prototype.constructor).toEqual("function");
        });

        it("should have 'initSurface' function", function() {
            expect(typeof Ext.draw.Surface.prototype.initSurface).toEqual("function");
        });

        it("should have 'renderItem' function", function() {
            expect(typeof Ext.draw.Surface.prototype.renderItem).toEqual("function");
        });

        it("should have 'renderItems' function", function() {
            expect(typeof Ext.draw.Surface.prototype.renderItems).toEqual("function");
        });

        it("should have 'setViewBox' function", function() {
            expect(typeof Ext.draw.Surface.prototype.setViewBox).toEqual("function");
        });

        it("should have 'initGradients' function", function() {
            expect(typeof Ext.draw.Surface.prototype.initGradients).toEqual("function");
        });

        it("should have 'initItems' function", function() {
            expect(typeof Ext.draw.Surface.prototype.initItems).toEqual("function");
        });

        it("should have 'initBackground' function", function() {
            expect(typeof Ext.draw.Surface.prototype.initBackground).toEqual("function");
        });

        it("should have 'setSize' function", function() {
            expect(typeof Ext.draw.Surface.prototype.setSize).toEqual("function");
        });

        it("should have 'scrubAttrs' function", function() {
            expect(typeof Ext.draw.Surface.prototype.scrubAttrs).toEqual("function");
        });

    });

});
