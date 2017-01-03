describe("Ext.chart.theme.Base", function() {

    describe("generate from a base color of black", function() {
        var theme;

        beforeEach(function() {
            Ext.chart.theme.myTheme = Ext.extend(Ext.chart.theme.Base, {
                constructor: function(config) {
                    Ext.chart.theme.myTheme.superclass.constructor.call(this, {
                        baseColor: '#000'
                    });
                }
            });
            theme = new Ext.chart.theme.myTheme();
        });

        afterEach(function() {
            delete Ext.chart.theme.myTheme;
        });

        it("should return the generated colors", function() {
            expect(theme.colors).toEqual(['#000000','#262626','#4d4d4d','#737373','#999999']);
        });
    });

    describe("generate from a base color of white", function() {
        var theme;

        beforeEach(function() {
            Ext.chart.theme.myTheme = Ext.extend(Ext.chart.theme.Base, {
                constructor: function(config) {
                    Ext.chart.theme.myTheme.superclass.constructor.call(this, {
                        baseColor: '#fff'
                    });
                }
            });
            theme = new Ext.chart.theme.myTheme();
        });

        afterEach(function() {
            delete Ext.chart.theme.myTheme;
        });

        it("should return the generated colors", function() {
            expect(theme.colors).toEqual(['#666666','#8c8c8c','#b3b3b3','#d9d9d9','#ffffff']);
        });
    });

    describe("generate from a base color of #ff0000", function() {
        var theme;

        beforeEach(function() {
            Ext.chart.theme.myTheme = Ext.extend(Ext.chart.theme.Base, {
                constructor: function(config) {
                    Ext.chart.theme.myTheme.superclass.constructor.call(this, {
                        baseColor: '#ff0000'
                    });
                }
            });
            theme = new Ext.chart.theme.myTheme();
        });

        afterEach(function() {
            delete Ext.chart.theme.myTheme;
        });

        it("should return the generated colors", function() {
            expect(theme.colors).toEqual(['#660000','#b30000','#ff0000','#ff4d4d','#ff9999']);
        });

    });

    describe("generate from a base color of #00ff00", function() {
        var theme;

        beforeEach(function() {
            Ext.chart.theme.myTheme = Ext.extend(Ext.chart.theme.Base, {
                constructor: function(config) {
                    Ext.chart.theme.myTheme.superclass.constructor.call(this, {
                        baseColor: '#00ff00'
                    });
                }
            });
            theme = new Ext.chart.theme.myTheme();
        });

        afterEach(function() {
            delete Ext.chart.theme.myTheme;
        });

        it("should return the generated colors", function() {
            expect(theme.colors).toEqual(['#006600','#00b300','#00ff00','#4dff4d','#99ff99']);
        });

    });

    describe("generate from a base color of #0000ff", function() {
        var theme;

        beforeEach(function() {
            Ext.chart.theme.myTheme = Ext.extend(Ext.chart.theme.Base, {
                constructor: function(config) {
                    Ext.chart.theme.myTheme.superclass.constructor.call(this, {
                        baseColor: '#0000ff'
                    });
                }
            });
            theme = new Ext.chart.theme.myTheme();
        });

        afterEach(function() {
            delete Ext.chart.theme.myTheme;
        });

        it("should return the generated colors", function() {
            expect(theme.colors).toEqual(['#000066','#0000b3','#0000ff','#4d4dff','#9999ff']);
        });

    });


    describe("generate gradients from a base color of #800000", function() {
        var theme;

        beforeEach(function() {
            Ext.chart.theme.myTheme = Ext.extend(Ext.chart.theme.Base, {
                constructor: function(config) {
                    Ext.chart.theme.myTheme.superclass.constructor.call(this, {
                        baseColor: '#800000',
                        useGradients: true
                    });
                }
            });
            theme = new Ext.chart.theme.myTheme();
        });

        afterEach(function() {
            delete Ext.chart.theme.myTheme;
        });

        it("should create 5 gradients", function() {
            expect(theme.gradients.length).toEqual(5);
        });

        it("should return the generated first gradient from #340000 to #010000", function() {
            var gradient = theme.gradients[0].id.split('-');
            gradient.pop();
            gradient = gradient.join('-');
            expect(gradient).toEqual('theme-340000-010000');
        });

        it("should return the generated second gradient from #800000 to #4d0000", function() {
            var gradient = theme.gradients[1].id.split('-');
            gradient.pop();
            gradient = gradient.join('-');
            expect(gradient).toEqual('theme-800000-4d0000');
        });

        it("should return the generated third gradient from #cd0000 to #9a0000", function() {
            var gradient = theme.gradients[2].id.split('-');
            gradient.pop();
            gradient = gradient.join('-');
            expect(gradient).toEqual('theme-cd0000-9a0000');
        });

        it("should return the generated fourth gradient from #ff1a1a to #e60000", function() {
            var gradient = theme.gradients[3].id.split('-');
            gradient.pop();
            gradient = gradient.join('-');
            expect(gradient).toEqual('theme-ff1a1a-e60000');
        });

        it("should return the generated fifth gradient from #ff6666 to #ff3333", function() {
            var gradient = theme.gradients[4].id.split('-');
            gradient.pop();
            gradient = gradient.join('-');
            expect(gradient).toEqual('theme-ff6666-ff3333');
        });

    });

});
