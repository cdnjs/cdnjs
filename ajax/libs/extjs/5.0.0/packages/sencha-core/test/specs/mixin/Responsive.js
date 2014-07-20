describe('Ext.mixin.Responsive', function () {
    var Cls, instance, Responsive,
        oldGetOrientation, oldGetViewWidth, oldGetViewHeight,
        environments = {
            ipad: {
                landscape: {
                    width: 1024,
                    height: 768,
                    orientation: 'landscape'
                },
                portrait: {
                    height: 1024,
                    width: 768,
                    orientation: 'portrait'
                }
            }
        },
        env;

    beforeEach(function () {
        Responsive = Ext.mixin.Responsive;

        oldGetOrientation = Ext.dom.Element.getOrientation;
        oldGetViewWidth = Ext.dom.Element.getViewportWidth;
        oldGetViewHeight = Ext.dom.Element.getViewportHeight;

        Ext.dom.Element.getOrientation = function () {
            return env.orientation;
        };

        Ext.dom.Element.getViewportWidth = function () {
            return env.width;
        };

        Ext.dom.Element.getViewportHeight = function () {
            return env.height;
        };

        Cls = Ext.define(null, {
            mixins: [
                'Ext.mixin.Responsive'
            ],

            config: {
                title: 'Hello',
                foo: null
            },

            responsiveConfig: {
                landscape: {
                    title: 'Landscape'
                },
                portrait: {
                    title: 'Portrait'
                }
            },

            constructor: function (config) {
                this.initConfig(config);
            }
        });
    });

    afterEach(function () {
        Ext.dom.Element.getOrientation = oldGetOrientation;
        Ext.dom.Element.getViewportWidth = oldGetViewWidth;
        Ext.dom.Element.getViewportHeight = oldGetViewHeight;

        Cls = null;
        instance = Ext.destroy(instance);

        expect(Responsive.active).toBe(false);
        expect(Responsive.count).toBe(0);
    });

    describe('initialization', function () {
        beforeEach(function () {
            env = environments.ipad.landscape;
            Responsive.state = {
                platform: {
                    tablet: true
                }
            }
        });

        it('should init with landscape from class', function () {
            instance = new Cls();

            var title = instance.getTitle();
            expect(title).toBe('Landscape');
        });

        it('should init with landscape from class over instanceConfig', function () {
            instance = new Cls({
                title: 'Foo' // the responsiveConfig will win
            });

            var title = instance.getTitle();
            expect(title).toBe('Landscape');
        });

        it('should init with portrait from class', function () {
            env = environments.ipad.portrait;
            instance = new Cls();

            var title = instance.getTitle();
            expect(title).toBe('Portrait');
        });

        it('should init with wide from instanceConfig', function () {
            instance = new Cls({
                responsiveConfig: {
                    wide: {
                        foo: 'Wide'
                    },
                    tall: {
                        foo: 'Tall'
                    }
                }
            });

            var foo = instance.getFoo();
            expect(foo).toBe('Wide');
        });

        it('should init with tall from instanceConfig', function () {
            env = environments.ipad.portrait;
            instance = new Cls({
                responsiveConfig: {
                    wide: {
                        foo: 'Wide'
                    },
                    tall: {
                        foo: 'Tall'
                    }
                }
            });

            var foo = instance.getFoo();
            expect(foo).toBe('Tall');
        });

        it('should init with landscape from instanceConfig', function () {
            instance = new Cls({
                responsiveConfig: {
                    landscape: {
                        title: 'Landscape 2'
                    }
                }
            });

            var title = instance.getTitle();
            expect(title).toBe('Landscape 2'); // instanceConfig wins
        });

        it('should init with portrait not hidden by instanceConfig', function () {
            env = environments.ipad.portrait;
            instance = new Cls({
                responsiveConfig: {
                    landscape: {
                        title: 'Landscape 2'
                    }
                }
            });

            var title = instance.getTitle();
            expect(title).toBe('Portrait'); // not replaced by instanceConfig
        });

        it('should init with platform.tablet from instanceConfig', function () {
            instance = new Cls({
                responsiveConfig: {
                    'platform.tablet': {
                        foo: 'Tablet'
                    }
                }
            });

            var foo = instance.getFoo();
            expect(foo).toBe('Tablet');
        });

        it('should preserve instanceConfig if responsiveConfig has no match', function () {
            instance = new Cls({
                foo: 'Foo',
                responsiveConfig: {
                    'platform.desktop': { // env is tablet so this is false
                        foo: 'Desktop'
                    }
                }
            });

            var foo = instance.getFoo();
            expect(foo).toBe('Foo');
        });

        it('should pick responsiveConfig over instanceConfig', function () {
            instance = new Cls({
                foo: 'Foo',
                responsiveConfig: {
                    'platform.tablet': {
                        foo: 'Tablet'
                    }
                }
            });

            var foo = instance.getFoo();
            expect(foo).toBe('Tablet');
        });
    }); // initializing

    describe('dynamic', function () {
        beforeEach(function () {
            env = environments.ipad.landscape;
            Responsive.state = {
                platform: {
                    tablet: true
                }
            }
        });

        it('should update when responsive state changes', function () {
            instance = new Cls({
                responsiveConfig: {
                    wide: {
                        foo: 'Wide'
                    },
                    tall: {
                        foo: 'Tall'
                    }
                }
            });

            var foo = instance.getFoo();
            expect(foo).toBe('Wide');

            env = environments.ipad.portrait;
            Responsive.notify();

            foo = instance.getFoo();
            expect(foo).toBe('Tall');
        });
    });
});
