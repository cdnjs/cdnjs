describe("Ext.dom.Element", function() {
    describe("instantiation", function() {
        var element, domEl;

        beforeEach(function() {
            domEl = document.createElement('div');
            document.body.appendChild(domEl);
        });

        afterEach(function() {
            document.body.removeChild(domEl);
        });

        it("should set dom element id if it hasn't already one", function() {
            element = new Ext.dom.Element(domEl);

            expect(domEl.id).toBeDefined();
        });

        it("should not set dom element id if it has already one", function() {
            var id = Ext.id();

            domEl.id = id;
            element = new Ext.dom.Element(domEl);

            expect(domEl.id).toEqual(id);
        });

        it("should set dom property to dom element", function() {
            element = new Ext.dom.Element(domEl);

            expect(element.dom).toBe(domEl);
        });

        it("should set id property to dom id", function() {
            var id = Ext.id();

            domEl.id = id;
            element = new Ext.dom.Element(domEl);

            expect(element.id).toEqual(id);
        });

        it("should find a dom element if a string corresponding to it's id is passed as first argument", function() {
            var id = Ext.id();

            domEl.id = id;

            element = new Ext.dom.Element(id);

            expect(element.dom).toBe(domEl);
        });

        it("should throw error if the Element has an invalid id", function() {
            function expectError(id) {
                var dom = document.createElement('div');
                dom.id = id;
                document.body.appendChild(dom);
                expect(function() {
                    new Ext.Element(dom);
                }).toThrow('Invalid Element "id": "' + id + '"');
                document.body.removeChild(dom);
            }
            expectError('.abcdef');
            expectError('0a...');
            expectError('12345');
            expectError('.abc-def');
            expectError('<12345/>');
            expectError('1<>234.567');
        });
    });

    function describeMethods(fly) {
        describe('methods (using ' + (fly ? 'Ext.fly()' : 'new Ext.dom.Element()') + ')', function(){
            var domEl, element;

            function addElement(tag) {
                domEl = document.createElement(tag);
                document.body.appendChild(domEl);
                return fly ? Ext.fly(domEl) : Ext.get(domEl);
            }
            
            afterEach(function() {
                if (element) {
                    element.destroy();
                    element = null;
                }
            });

            describe("set", function() {
                beforeEach(function() {
                    element = addElement('div');
                });

                it("should call Ext.core.DomHelper.applyStyles if object passed as first argument has style property", function() {
                    var style = {width:'100px'};

                    spyOn(element, "applyStyles");

                    element.set({style: style});

                    expect(element.applyStyles).toHaveBeenCalledWith(style);
                });

                it("should set dom element className if object passed as first argument has cls property", function() {
                    var cls = "x-test-class";

                    element.set({cls: cls});

                    expect(element.dom.className).toEqual(cls);
                });

                it("should use setAttribute by default", function() {
                    spyOn(element.dom, "setAttribute");

                    element.set({align: "center"});

                    expect(element.dom.setAttribute).toHaveBeenCalledWith("align", "center");
                });

                it("should be able to use expandos", function() {
                    spyOn(element.dom, "setAttribute");

                    element.set({align: "center"}, false);


                    expect(element.dom.align).toEqual("center");
                });

            });

            describe("is", function() {
                beforeEach(function() {
                    element = addElement('div');
                });

                it("Returns true if this element matches the passed simple selector", function() {
                    element.set({cls: "x-test-class"});

                    expect(element.is("div.x-test-class")).toBe(true);
                });
            });

            describe("focus", function() {
                beforeEach(function() {
                    element = addElement('div');
                });

                it("should focus dom element", function() {
                    spyOn(element.dom, "focus");

                    element.focus();

                    expect(element.dom.focus).toHaveBeenCalled();
                });

                it("should be able to defer dom element focus", function() {
                    spyOn(element.dom, "focus");
                    element.focus(1);

                    waitsFor(function(){
                        return element.dom.focus.calls.length === 1;
                    }, "element.dom.focus was never called");

                    runs(function() {
                        expect(element.dom.focus).toHaveBeenCalled();
                    });
                });

                it("should ignore any exception", function() {
                    element.dom.focus = function() {
                        throw "error";
                    };

                    expect(element.focus.bind(element)).not.toThrow("error");
                });
            });

            describe("blur", function() {
                beforeEach(function() {
                    element = addElement('div');
                });

                it("should blur dom element", function() {
                    spyOn(element.dom, "blur");

                    element.blur();

                    expect(element.dom.blur).toHaveBeenCalled();
                });


                it("should ignore any exception", function() {
                    element.dom.blur = function() {
                        throw "error";
                    };

                    expect(element.blur.bind(element)).not.toThrow("error");
                });
            });

            describe("getValue", function() {
                beforeEach(function() {
                    element = addElement('div');
                    element.dom.value = "10";
                });

                it("should return the dom value", function() {
                    expect(element.getValue()).toEqual("10");
                });

                it("should return the dom value as Number", function() {
                    expect(element.getValue(true)).toEqual(10);
                });
            });

            describe("listeners", function() {
                var options;

                beforeEach(function() {
                    options = {delay: 10};
                });

                xdescribe('deprecated (EventManager)', function() {
                    describe("addListener", function() {
                        beforeEach(function() {
                            element = addElement('div');
                        });

                        it("should call Ext.EventManager.on", function() {
                            spyOn(Ext.EventManager, "on");

                            element.addListener("click", Ext.emptyFn, fakeScope, options);

                            expect(Ext.EventManager.on).toHaveBeenCalledWith(element, "click", Ext.emptyFn, fakeScope, options);
                        });
                    });

                    describe("removeListener", function() {
                        beforeEach(function() {
                            element = addElement('div');
                        });

                        it("should call Ext.EventManager.un", function() {
                            spyOn(Ext.EventManager, "un");

                            element.removeListener("click", Ext.emptyFn, fakeScope);

                            expect(Ext.EventManager.un).toHaveBeenCalledWith(element, "click", Ext.emptyFn, fakeScope);
                        });
                    });

                    describe("removeAllListener", function() {
                        beforeEach(function() {
                            element = addElement('div');
                        });

                        it("should call Ext.EventManager.removeAll", function() {
                            spyOn(Ext.EventManager, "removeAll");

                            element.removeAllListeners();

                            expect(Ext.EventManager.removeAll).toHaveBeenCalledWith(element.dom);
                        });
                    });

                    describe("purgeAllListener", function() {
                        it("should call Ext.EventManager.purgeElement", function() {
                            element = addElement('div');
                            spyOn(Ext.EventManager, "purgeElement");

                            element.purgeAllListeners();

                            expect(Ext.EventManager.purgeElement).toHaveBeenCalledWith(element);
                        });
                        
                        // https://sencha.jira.com/browse/EXTJSIV-6713
                        it("should work with images", function() {
                            element = addElement('img');
                            
                            expect(function() { element.purgeAllListeners(); }).not.toThrow();
                            element.destroy();
                        });
                    });
                });
            });

            describe("addUnits", function() {
                beforeEach(function() {
                    element = addElement('div');
                });

                it("should return an empty string if size passed is an empty string", function() {
                    expect(element.addUnits("")).toEqual("");
                });

                it("should return auto if size passed is 'auto' string", function() {
                    expect(element.addUnits("auto")).toEqual("auto");
                });

                it("should return an empty string if size passed is undefined", function() {
                    expect(element.addUnits(undefined)).toEqual("");
                });

                it("should return an empty string if size passed is null", function() {
                    expect(element.addUnits(null)).toEqual("");
                });
            });

            describe("destroy", function() {
                var id, dom;
                
                beforeEach(function() {
                    element = addElement('div');
                    id = element.id;
                    dom = element.dom;
                });

                beforeEach(function() {
                    element.destroy();
                });

                it("should remove dom property", function() {
                    expect(element.dom).toBe(null);
                });

                it("should should remove the cache entry", function() {
                    expect(id in Ext.cache).toBe(false);
                });

                it("should remove the element from the dom", function() {
                    expect(dom.parentNode).toBeNull();
                });
            });

            describe("hover", function() {
                var overFn, outFn, options;
                beforeEach(function() {
                    element = addElement('div');
                    overFn = function() {
                        return 1;
                    };

                    outFn = function() {
                        return 2;
                    };

                    options = {
                        foo: true
                    };

                    spyOn(element, "on");
                });

                describe("mouseenter event", function() {
                    it("should add a listener on mouseenter", function() {
                        element.hover(overFn, outFn, fakeScope, options);

                        expect(element.on).toHaveBeenCalledWith("mouseenter", overFn, fakeScope, options);
                    });

                    it("should set scope to element.dom if it is not passed in arguments", function() {
                        element.hover(overFn, outFn, null, options);

                        expect(element.on).toHaveBeenCalledWith("mouseenter", overFn, element.dom, options);
                    });
                });

                describe("mouseleave event", function() {
                    it("should add a listener on mouseleave", function() {
                        element.hover(overFn, outFn, fakeScope, options);

                        expect(element.on).toHaveBeenCalledWith("mouseleave", outFn, fakeScope, options);
                    });

                    it("should set scope to element.dom if it is not passed in arguments", function() {
                        element.hover(overFn, outFn, null, options);

                        expect(element.on).toHaveBeenCalledWith("mouseleave", outFn, element.dom, options);
                    });
                });
            });

            describe("contains", function() {
                /**
                 * TODO: Removed tests for now, need to reinstate once the refactoring is done.
                 */
            });

            describe("mask", function() {
                // Note the following specs have been disabled for IE 6 because of failures in the eye
                // run that could not be reproduced.  They always passed locally in the test runner.
                // The comments have been left to show the unique differences needed to get these to
                // run in IE 6.
                describe("masking the body el", function () {
                    var cmp, maskEl, dom, scrollHeight, scrollWidth;

                    function createCmp(height) {
                        cmp = new Ext.Component({
                            height: height || 200,
                            renderTo: Ext.getBody()
                        });

                        maskEl = Ext.getBody().mask({msg: "Tom Sawyer"});

                        dom = document.body;
                        scrollHeight = dom.scrollHeight;
                        scrollWidth = dom.scrollWidth;
                    }

                    afterEach(function () {
                        Ext.removeNode(maskEl.dom.nextSibling);
                        Ext.removeNode(maskEl.dom);
                        Ext.destroy(cmp, maskEl);

                        cmp = maskEl = dom = scrollHeight = scrollWidth = null;
                    });
                });

            });

            xdescribe("deprecated 5.0", function() {
                describe("getAttributeNS", function() {
                    beforeEach(function() {
                        element = addElement('div');
                    });

                    it("should call element getAttribute", function() {
                        spyOn(element, "getAttribute");

                        element.getAttributeNS("ns1", "align");

                        expect(element.getAttribute).toHaveBeenCalledWith("align", "ns1");
                    });
                });
            });

            describe("getAttribute", function() {
                var element2, element3;
                beforeEach(function() {
                    element = addElement('div');
                    element2 = Ext.getBody().createChild({tag: "div"});


                    if (element.dom.setAttribute) {
                        element.dom.setAttribute("qtip", "bar");
                        element2.dom.setAttribute("ext:qtip", "foo");
                    } else {
                        element.dom["qtip"] = "bar";
                        element2.dom["ext:qtip"] = "foo";
                    }

                    if (element.dom.setAttributeNS) {
                        element3 = Ext.getBody().createChild({tag: "div"});
                        element3.dom.setAttributeNS("ext", "qtip", "foobar");
                    }
                });

                afterEach(function() {
                    element2.destroy();
                    if (element3) {
                        element3.destroy();
                    }
                });

                describe("without namespace", function() {
                    it("should return the attribute value if it exists", function() {
                        expect(element.getAttribute("qtip")).toEqual("bar");
                    });

                    it("should return null if the attribute does not exist", function() {
                        expect(element.getAttribute("nothing")).toBeNull();
                    });
                });

                describe("with namespace", function() {
                    it("should return null on a non-namespaced attribute", function() {
                        expect(element.getAttribute("qtip", "ext")).toBeNull();
                    });

                    it("should return null if the attribute belong to another namespace", function() {
                        expect(element2.getAttribute("qtip", "nothing")).toBeNull();
                    });

                    it("should return the attribute value if it belongs to the namespace", function() {
                        if (element3) {
                            expect(element3.getAttribute("qtip", "ext")).toEqual("foobar");
                        }
                    });

                    it("should handle xml namespace", function() {
                        expect(element2.getAttribute("qtip", "ext")).toEqual("foo");
                    });
                });
            });

            describe("update", function() {
                beforeEach(function() {
                    element = addElement('div');
                    element.dom.innerHTML = "hello world";
                });

                it("should update dom element innerHTML", function() {
                    element.update("foobar");

                    expect(element.dom).hasHTML("foobar");
                });

                it("should return element", function() {
                    expect(element.update("foobar")).toBe(element);
                });
            });

            describe("prototype aliases", function() {
                beforeEach(function() {
                    element = addElement('div');
                });

                it("should aliases addListener with on", function() {
                    expect(typeof(element.on)).toEqual('function');
                });

                it("should aliases removeListener with un", function() {
                    expect(typeof(element.un)).toEqual('function');
                });

                it("should aliases removeAllListeners with clearListeners", function() {
                    expect(typeof(element.clearListeners)).toEqual('function');
                });
            });

            describe("visibilityMode", function(){
                beforeEach(function() {
                    element = addElement('div');
                });

                it('must be able to setVisibilityMode and getVisibilityMode', function(){
                    element.setVisibilityMode(Ext.dom.Element.DISPLAY);
                    expect(element.getVisibilityMode()).toBe(Ext.dom.Element.DISPLAY);
                    
                    element.setVisibilityMode(Ext.dom.Element.VISIBILITY);
                    expect(element.getVisibilityMode()).toBe(Ext.dom.Element.VISIBILITY);
                });
                
                it("should retain visibilityMode on flyweights", function(){
                    Ext.fly(element.dom).setVisibilityMode(Ext.dom.Element.DISPLAY);
                    expect(Ext.fly(element.dom).getVisibilityMode()).toBe(Ext.dom.Element.DISPLAY);    
                });
            });

            describe("visibility", function(){
                var child, grandChild,
                    modes = [Ext.dom.Element.DISPLAY, Ext.dom.Element.VISIBILITY];

                beforeEach(function() {
                    element = addElement('div');
                    child = element.createChild({tag: "div"});
                    if (child) {
                        child.setVisible(true);
                        grandChild = child.createChild({tag: "div"});
                        if (grandChild) {
                            grandChild.setVisible(true);
                        }
                    }
                });

                afterEach(function() {
                    if (grandChild) {
                        grandChild.destroy();
                    }
                    if (child) {
                        child.destroy();
                    }
                });

                it("should toggle the visibility of the element itself", function(){
                    for (var i in modes) {
                        element.setVisibilityMode(modes[i]);

                        element.setVisible(false);
                        expect(element.isVisible(false)).toBe(false);

                        element.setVisible(true);
                        expect(element.isVisible(false)).toBe(true);                    
                    }
                });

                it("should toggle the 'deep' visibility of the grand-child", function(){
                    for (var i in modes) {
                        element.setVisibilityMode(modes[i]);

                        element.setVisible(false);
                        expect(grandChild.isVisible(true)).toBe(false);

                        element.setVisible(true);
                        expect(grandChild.isVisible(true)).toBe(true);
                    }
                });
            });

            if (!fly) {
                describe("setVertical", function() {
                    beforeEach(function() {
                        var styleSheet = document.styleSheets[0],
                            selector = '.vert',
                            props = [
                                    '-webkit-transform: rotate(90deg);',
                                    '-moz-transform: rotate(90deg);',
                                    '-o-transform: rotate(90deg);',	
                                    'transform: rotate(90deg);',
                                    'filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=1);',
                            ].join('');
                        if (styleSheet.insertRule) {
                            styleSheet.insertRule(selector + '{' + props + '}', 1);
                        } else {
                            // IE8
                            styleSheet.addRule(selector, props);
                        }
                        element = addElement('div');
                        element.setWidth(100);
                        element.setHeight(30);
                        element.setVertical(90, 'vert');
                    });

                    afterEach(function() {
                        var styleSheet = document.styleSheets[0];
                        if (styleSheet.deleteRule) {
                  
                            styleSheet.deleteRule(1);
                        } else {
                            // IE8
                            styleSheet.removeRule(styleSheet.rules.length - 1); 
                        }
                    });

                    it("should add the css class", function() {
                        expect(element.hasCls('vert')).toBe(true);
                    });

                    it("should get the width using getWidth()", function() {
                        expect(element.getWidth()).toBe(30);
                    });

                    it("should get the width using getStyle('width')", function() {
                        expect(element.getStyle('width')).toBe('30px');
                    });

                    it("should get the height using getHeight", function() {
                        expect(element.getHeight()).toBe(100);
                    });

                    it("should get the height using getStyle('height')", function() {
                        expect(element.getStyle('height')).toBe('100px');
                    });

                    it("should set the width using setWidth()", function() {
                        element.setWidth(200);
                        expect(element.getWidth()).toBe(200);
                    });

                    it("should set the width using setStyle('width')", function() {
                        element.setStyle('width', '200px');
                        expect(element.getWidth()).toBe(200);
                    });

                    it("should set the height using setHeight()", function() {
                        element.setHeight(200);
                        expect(element.getHeight()).toBe(200);
                    });

                    it("should set the height using setStyle('height')", function() {
                        element.setStyle('height', '200px');
                        expect(element.getHeight()).toBe(200);
                    });

                    describe("setHorizontal", function() {
                        beforeEach(function() {
                            element.setHorizontal();
                        });

                        it("should remove the css class", function() {
                            expect(element.hasCls('vert')).toBe(false);
                        });

                        it("should get the width using getWidth()", function() {
                            expect(element.getWidth()).toBe(100);
                        });

                        it("should get the width using getStyle('width')", function() {
                            expect(element.getStyle('width')).toBe('100px');
                        });

                        it("should get the height using getHeight", function() {
                            expect(element.getHeight()).toBe(30);
                        });

                        it("should get the height using getStyle('height')", function() {
                            expect(element.getStyle('height')).toBe('30px');
                        });

                        it("should set the width using setWidth()", function() {
                            element.setWidth(200);
                            expect(element.getWidth()).toBe(200);
                        });

                        it("should set the width using setStyle('width')", function() {
                            element.setStyle('width', '200px');
                            expect(element.getWidth()).toBe(200);
                        });

                        it("should set the height using setHeight()", function() {
                            element.setHeight(200);
                            expect(element.getHeight()).toBe(200);
                        });

                        it("should set the height using setStyle('height')", function() {
                            element.setStyle('height', '200px');
                            expect(element.getHeight()).toBe(200);
                        });
                    });
                });
            }
        });
    }

    describeMethods();
    describeMethods(true);

    describe("class methods", function() {
        var element, element2, domEl, domEl2, id;

        beforeEach(function() {
            element = Ext.getBody().createChild({tag: "div"});
            domEl = element.dom;

            id = Ext.id();
            domEl2 = document.createElement("div");
            domEl2.id = id;
            document.body.appendChild(domEl2);
        });

        afterEach(function() {
            element.destroy();
            if (element2) {
                element2.destroy();
            }
            if (domEl2 && domEl2.parentNode === document.body) {
                document.body.removeChild(domEl2);
            }
        });

        describe("get", function() {
            describe("alias", function() {
                it("should alias Ext.dom.Element.get with Ext.get", function() {
                    spyOn(Ext.dom.Element, 'get');
                    Ext.get();
                    expect(Ext.dom.Element.get).toHaveBeenCalled();
                });
            });

            describe("passing string id as first argument", function() {
                describe("with a dom element which is not already encapsulated", function() {
                    it("should return a new Ext.dom.Element", function() {
                        element2 = Ext.get(id);

                        expect(element2 instanceof Ext.dom.Element).toBe(true);
                    });

                    it("should encapsulate the dom element in the Ext.dom.Element", function() {
                        element2 = Ext.get(id);

                        expect(element2.dom).toBe(domEl2);
                    });

                    it("should add element to Ext.cache", function() {
                        element2 = Ext.get(id);
                        expect(Ext.cache[id] === element2);
                    });
                });

                describe("with a dom element which is already encapsulated", function() {
                    it("should return the corresponding Ext.Element", function() {
                        expect(Ext.get(domEl)).toBe(element);
                    });
                });
            });

            describe("passing dom element as first argument", function() {
                describe("with a dom element which is not already encapsulated", function() {
                    it("should return a new Ext.dom.Element", function() {
                        element2 = Ext.get(domEl2);

                        expect(element2 instanceof Ext.dom.Element).toBe(true);
                    });

                    it("should encapsulate the dom element in the Ext.dom.Element", function() {
                        element2 = Ext.get(domEl2);

                        expect(element2.dom).toBe(domEl2);
                    });

                    it("should add element to Ext.cache", function() {
                        expect(Ext.cache[domEl2.id] === domEl2);
                    });
                });

                describe("with a dom element which is already encapsulated", function() {
                    it("should return the corresponding Ext.Element", function() {
                        expect(Ext.get(domEl.id)).toBe(element);
                    });
                });
            });

            describe("passing an Ext.dom.Element as first argument", function() {
                it("should return Ext.dom.Element", function() {
                    expect(Ext.get(element)).toBe(element);
                });
            });
            
            describe("passing a Ext.dom.FlyWeight as first argument", function() {
                it("should return Ext.dom.Element", function() {
                    var result = Ext.get(Ext.fly(domEl));
                    expect(result).toBe(element);
                    expect(result.isFly).toBeUndefined();
                    
                });
            });

            describe("passing a CompositeElement as first argument", function() {
                var compositeElement;

                beforeEach(function() {
                    compositeElement = Ext.select("div");
                });

                it("should return Ext.dom.Element", function() {
                    expect(Ext.get(compositeElement)).toBe(compositeElement);
                });
            });

            describe("passing an array as first argument", function() {
                it("should call Ext.dom.Element.select", function() {
                    var arr = [domEl, domEl2];
                    spyOn(Ext.dom.Element, "select");

                    Ext.get(arr);

                    expect(Ext.dom.Element.select).toHaveBeenCalledWith(arr);
                });
            });

            describe("passing document as first argument", function() {
                it("should return an Ext.dom.Element", function() {
                    expect(Ext.get(document) instanceof Ext.dom.Element).toBe(true);
                });

                xit("should return a bogus Ext.dom.Element", function() {
                    expect(Ext.get(document).id).not.toBeDefined();
                });

                it("should return an Ext.dom.Element that encapsulate document", function() {
                    expect(Ext.get(document).dom).toBe(document);
                });
            });

            it("should wrap a documentFragment", function() {
                var dom = document.createDocumentFragment(),
                    el = Ext.get(dom);

                expect(el instanceof Ext.dom.Element).toBe(true);
                expect(el.dom).toBe(dom);
            });

            it("should wrap the window object", function() {
                var dom = window,
                    el = Ext.get(dom);

                expect(el instanceof Ext.dom.Element).toBe(true);
                expect(el.dom).toBe(dom);
            });

            it("should wrap the document object", function() {
                var dom = document,
                    el = Ext.get(dom);

                expect(el instanceof Ext.dom.Element).toBe(true);
                expect(el.dom).toBe(dom);
            });

            describe("document and window within iframe", function() {
                var iframe;

                beforeEach(function() {
                    iframe = document.createElement('iframe');
                    document.body.appendChild(iframe);
                });

                afterEach(function() {
                    document.body.removeChild(iframe);
                });

                it("should wrap an iframe's window object", function() {
                    var dom = iframe.contentWindow,
                        el = Ext.get(dom);

                    expect(el instanceof Ext.dom.Element).toBe(true);
                    expect(el.dom).toBe(dom);
                });

                it("should wrap an iframe's document object", function() {
                    var dom = iframe.contentWindow.document,
                        el = Ext.get(dom);

                    expect(el instanceof Ext.dom.Element).toBe(true);
                    expect(el.dom).toBe(dom);

                });
            });

            it("should not wrap a text node", function() {
                expect(Ext.get(document.createTextNode(('foo')))).toBe(null);
            });
        });

        xdescribe("garbageCollector", function() {

        });

        describe("fly", function() {
            var flyWeight;

            beforeEach(function() {
                spyOn(Ext, "getDom").andCallThrough();

            });

            describe('use strict', function () {
                var backup;

                //TODO - See if there is a cheap enough way to avoid this replacement
                //TODO - Oddly enough even if we wrap Ext.fly it throws an error trying
                //TODO - to use Ext.fly.caller but the caller is the wrapper not the
                //TODO - strict mode function (perhaps the JIT has removed the "useless"
                //TODO - wrapper function).
                beforeEach(function () {
                    Ext.fly = (function (oldFly) {
                        backup = oldFly;
                        return function (dom, named) {
                            return oldFly(dom, named || '_global');
                        }
                    }(Ext.fly));
                });

                afterEach(function () {
                    Ext.fly = backup;
                });

                it('should work when called by strict mode function', function () {
                    'use strict';
                    var f = Ext.fly(domEl2);
                });
            });

            describe("global flyweight", function() {
                beforeEach(function() {
                    flyWeight = Ext.fly(domEl2);
                });

                it("should return an Ext.dom.Element.Fly", function() {
                    expect(flyWeight instanceof Ext.dom.Fly).toBe(true);
                });

                it("should not cache a dom element", function() {
                    expect(Ext.cache[domEl2.id]).toBeUndefined();
                });

                it("should call Ext.getDom", function() {
                    expect(Ext.getDom).toHaveBeenCalledWith(domEl2);
                });
            });

            describe("named reusable flyweight", function() {
                beforeEach(function() {
                    flyWeight = Ext.fly(domEl2, "myflyweight");
                });

                it("should return an Ext.dom.Element.Flyweight", function() {
                    expect(flyWeight instanceof Ext.dom.Fly).toBe(true);
                });

                it("should not cache a dom element", function() {
                    expect(Ext.cache[domEl2.id]).toBeUndefined();
                });

                it("should call Ext.getDom", function() {
                    expect(Ext.getDom).toHaveBeenCalledWith(domEl2);
                });
            });

            it("should wrap a documentFragment", function() {
                var dom = document.createDocumentFragment(),
                    el = Ext.fly(dom);

                expect(el instanceof Ext.dom.Fly).toBe(true);
                expect(el.dom).toBe(dom);
            });

            it("should wrap the window object", function() {
                var dom = window,
                    el = Ext.fly(dom);

                expect(el instanceof Ext.dom.Fly).toBe(true);
                expect(el.dom).toBe(dom);
            });

            it("should wrap the document object", function() {
                var dom = document,
                    el = Ext.fly(dom);

                expect(el instanceof Ext.dom.Fly).toBe(true);
                expect(el.dom).toBe(dom);
            });

            describe("document and window within iframe", function() {
                var iframe;

                beforeEach(function() {
                    iframe = document.createElement('iframe');
                    document.body.appendChild(iframe);
                });

                afterEach(function() {
                    document.body.removeChild(iframe);
                });

                it("should wrap an iframe's window object", function() {
                    var dom = iframe.contentWindow,
                        el = Ext.fly(dom);

                    expect(el instanceof Ext.dom.Fly).toBe(true);
                    expect(el.dom).toBe(dom);
                });

                it("should wrap an iframe's document object", function() {
                    var dom = iframe.contentWindow.document,
                        el = Ext.fly(dom);

                    expect(el instanceof Ext.dom.Fly).toBe(true);
                    expect(el.dom).toBe(dom);

                });
            });

            it("should not wrap a text node", function() {
                expect(Ext.fly(document.createTextNode(('foo')))).toBe(null);
            });
        });

        describe("aliases", function() {
            it("should aliases Ext.dom.Element.get with Ext.get", function() {
                spyOn(Ext.dom.Element, 'get');
                Ext.get();
                expect(Ext.dom.Element.get).toHaveBeenCalled();
            });

            it("should aliases Ext.fly with Ext.Element.fly", function() {
                spyOn(Ext, 'fly');
                Ext.Element.fly();
                expect(Ext.fly).toHaveBeenCalled();
            });
        });
    });
    
    describe("getXY", function(){
        var unAttached;
        beforeEach(function(){
            unAttached = document.createElement('div');
        });
        it("should not throw when reading unattached element", function(){
            Ext.fly(unAttached).getXY();
        });
    });

    describe("Ext", function() {
        // these specs have to live here instead of in sencha-core, because they test
        // the result of passing a Ext.Element instance to Ext.isElement() or Ext.isTextNode.
        it("should return false when an Ext.Element instance is passed to Ext.isElement", function() {
           expect(Ext.isElement(Ext.getBody())).toBe(false);
        });

        it("should return false when an Ext.Element instance is passed to Ext.isTextNode", function() {
           expect(Ext.isTextNode(Ext.getBody())).toBe(false);
        });
    });
}, "/src/dom/Element.js");
