describe("Ext.Widget", function() {
    var widget;

    function defineWidget(first, config) {
        Ext.define('spec.Widget', Ext.apply({
            extend: 'Ext.Widget'
        }, config));

        if (!first) {
            // The spec wants to run in "not first" mode - this means we need to create
            // an instance and throw it away, so that the spec operates on the second
            // instance of the Widget ever created.
            new spec.Widget();
        }
    }

    afterEach(function() {
        if (widget) {
            widget.destroy();
        }
        Ext.undefine('spec.Widget');
    });

    function makeSuite(first) {
        // most specs defined here need to run twice - once as the first instance of a
        // Widget that gets created, and once as the second instance. This is needed because
        // the first and second instances of a Ext.Widget go down significantly different
        // code paths.  The first instance creates the Element and caches it as a template
        // element that is cloned by successive instances.
        describe(first ? "first instance" : "second instance", function() {
            it("should have an element when 'element' reference is defined on the main element", function() {
                defineWidget(first);
                widget = new spec.Widget();
                expect(widget.element instanceof Ext.dom.Element).toBe(true);
                expect(widget.el).toBe(widget.element);
            });

            if (first) {
                // error thrown on first instance - no need to run these spec for the second instance
                it("should throw an error when no 'element' reference is defined", function() {
                    defineWidget(first, {
                        element: {}
                    });

                    function makeWidget() {
                        new spec.Widget();
                    }

                    expect(makeWidget).toThrow("No 'element' reference found in 'spec.Widget' template.");
                });

                it("should throw an error if multiple 'element' references are defined", function() {
                    defineWidget(first, {
                        element: {
                            reference: 'element',
                            children: [{
                                reference: 'element'
                            }]
                        }
                    });

                    function makeWidget() {
                        new spec.Widget();
                    }

                    expect(makeWidget).toThrow("Duplicate 'element' reference detected in 'spec.Widget' template.");
                });
            }

            it("should allow the 'element' reference to be a descendant of the main template element", function() {
                defineWidget(first, {
                    element: {
                        children: [{
                            cls: 'foo',
                            reference: 'element'
                        }]
                    }
                });

                widget = new spec.Widget();

                expect(widget.element.dom.className).toBe('foo');
            });

            it("should resolve element references, and remove the 'reference' attributes from the dom", function() {
                defineWidget(first, {
                    element: {
                        reference: 'element',
                        children: [{
                            cls: 'foo',
                            reference: 'foo',
                            children: [{
                                cls: 'baz',
                                reference: 'baz'
                            }]
                        }, {
                            cls: 'bar',
                            reference: 'bar'
                        }]
                    }
                });

                widget = new spec.Widget();

                expect(widget.foo instanceof Ext.dom.Element).toBe(true);
                expect(widget.foo.dom.className).toBe('foo');
                expect(widget.foo.dom.getAttribute('reference')).toBeNull();

                expect(widget.bar instanceof Ext.dom.Element).toBe(true);
                expect(widget.bar.dom.className).toBe('bar');
                expect(widget.bar.dom.getAttribute('reference')).toBeNull();

                expect(widget.baz instanceof Ext.dom.Element).toBe(true);
                expect(widget.baz.dom.className).toBe('baz');
                expect(widget.baz.dom.getAttribute('reference')).toBeNull();

                expect(widget.element.dom.getAttribute('reference')).toBeNull();
            });

            it("should set skipGarbageCollection on element references", function() {
                 defineWidget(first, {
                    element: {
                        reference: 'element',
                        children: [{
                            reference: 'foo'
                        }]
                    }
                });

                widget = new spec.Widget();

                expect(widget.element.skipGarbageCollection).toBe(true);
                expect(widget.foo.skipGarbageCollection).toBe(true);
            });

            it("should generate an id if not configured", function() {
                defineWidget(first);
                widget = new spec.Widget();

                expect(widget.id).toBeDefined();
                expect(widget.element.id).toBe(widget.id);
            });

            it("should use configured id", function() {
                var id = 'my-widget';

                defineWidget(first);
                widget = new spec.Widget({
                    id: id
                });

                expect(widget.id).toBe(id);
                expect(widget.element.id).toBe(id);
            });

            it("should add a listener to the main element", function() {
                var scope;

                defineWidget(first, {
                    element: {
                        reference: 'element',
                        listeners: {
                            click: 'onClick'
                        }
                    },
                    onClick: function() {
                        scope = this;
                    }
                });

                widget = new spec.Widget();
                // must be in the document to receive events
                Ext.getBody().appendChild(widget.element);
                spyOn(widget, 'onClick').andCallThrough();

                jasmine.fireMouseEvent(widget.element, 'click');

                expect(widget.onClick).toHaveBeenCalled();
                expect(scope).toBe(widget);

                widget.destroy();
            });

            it("should add listeners to child elements", function() {
                var fooScope, barScope, bazScope, jazzScope;

                defineWidget(first, {
                    element: {
                        reference: 'element',
                        children: [{
                            reference: 'foo',
                            listeners: {
                                click: 'fooClick'
                            }
                        }, {
                            cls: 'bar',
                            reference: 'bar',
                            listeners: {
                                // Make sure scope is set correctly for object form
                                click: {
                                    fn: 'barClick'
                                }
                            },
                            children: [{
                                reference: 'baz',
                                listeners: {
                                    click: 'bazClick'
                                },
                                scope: {} // make sure this scope is ignored
                            }, {
                                reference: 'jazz',
                                listeners: {
                                    click: {
                                        fn: 'jazzClick',
                                        scope: {} // ignored - scope is always "this"
                                    }
                                }
                            }]
                        }]
                    },

                    fooClick: function() {
                        fooScope = this;
                    },

                    barClick: function() {
                        barScope = this;
                    },

                    bazClick: function() {
                        bazScope = this;
                    },

                    jazzClick: function() {
                        jazzScope = this;
                    }
                });

                widget = new spec.Widget();
                // must be in the document to receive events
                Ext.getBody().appendChild(widget.element);

                spyOn(widget, 'fooClick').andCallThrough();
                spyOn(widget, 'barClick').andCallThrough();
                spyOn(widget, 'bazClick').andCallThrough();
                spyOn(widget, 'jazzClick').andCallThrough();

                jasmine.fireMouseEvent(widget.foo, 'click');
                expect(widget.fooClick).toHaveBeenCalled();
                expect(fooScope).toBe(widget);

                jasmine.fireMouseEvent(widget.bar, 'click');
                expect(widget.barClick).toHaveBeenCalled();
                expect(barScope).toBe(widget);

                jasmine.fireMouseEvent(widget.baz, 'click');
                expect(widget.bazClick).toHaveBeenCalled();
                expect(bazScope).toBe(widget);

                jasmine.fireMouseEvent(widget.jazz, 'click');
                expect(widget.jazzClick).toHaveBeenCalled();
                expect(jazzScope).toBe(widget);

                widget.destroy();
            });
        });
    }

    makeSuite(true);
    makeSuite(false);

});
