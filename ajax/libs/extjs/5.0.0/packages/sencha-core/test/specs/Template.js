describe("Ext.Template", function() {

    describe("instantiation", function() {
        var tpl;

        it("it should extend Ext.Base", function() {
            tpl = new Ext.Template("");
            expect(tpl.superclass).toEqual(Ext.Base.prototype);
        });

        describe("configuration options", function() {
            it("should disableFormats by default", function() {
                tpl = new Ext.Template("");
                expect(tpl.disableFormats).toBe(false);
            });
        });

        it("should alias apply with applyTemplate", function() {
            tpl = new Ext.Template("");

            spyOn(tpl, 'apply');

            tpl.applyTemplate();

            expect(tpl.apply).toHaveBeenCalled();
        });

        it("should be able to compile immediately", function() {
            spyOn(Ext.Template.prototype, "compile").andCallThrough();

            tpl = new Ext.Template('Hello {foo}', {
                compiled: true
            });
            // must call the new tpl for it bother compiling it
            var s = tpl.apply({ foo: 42 });

            expect(s).toBe('Hello 42');
            expect(Ext.Template.prototype.compile).toHaveBeenCalled();
        });

        describe("constructor arguments", function() {
            describe("objects", function() {
                it("should apply all object passed after first arguments to configuration", function() {
                    var o1 = {a: 1},
                        o2 = {a: 2},
                        o3 = {a: 3};

                    spyOn(Ext, "apply");

                    tpl = new Ext.Template("", o1, o2, o3);

                    expect(Ext.apply.calls[1].args).toEqual([tpl, o1]);
                    expect(Ext.apply.calls[3].args).toEqual([tpl, o2]);
                    expect(Ext.apply.calls[5].args).toEqual([tpl, o3]);
                });
            });

            describe("strings", function() {
                it("should concat all strings passed as arguments", function() {
                    var s1 = 'a',
                        s2 = 'b',
                        s3 = 'c';

                    tpl = new Ext.Template(s1, s2, s3);

                    expect(tpl.html).toEqual(s1 + s2 + s3);
                });
            });
            
            describe("array", function(){
                it("should concat all array strings", function(){
                    var tpl = new Ext.Template(['foo', 'bar', 'baz']);
                    expect(tpl.html).toBe('foobarbaz');    
                });
                
                it("should apply an objects after the first argument to the template", function(){
                    var o1 = {
                        a: function(){}
                    }, o2 = {
                        b: function(){}
                    };
                    
                    var tpl = new Ext.Template(['foo', 'bar', o1, o2]);
                    expect(tpl.html).toBe('foobar');
                    expect(tpl.a).toBe(o1.a);
                    expect(tpl.b).toBe(o2.b);
                });
            });
        });
    });

    describe("methods", function() {
        var appliedArr,
            appliedObject,
            simpleTpl,
            complexTpl,
            rootEl,
            childEl,
            simpleTplEl,
            complexTplEl;

        beforeEach(function() {
            rootEl = Ext.fly(document.body).createChild({cls: "foo", children: [{cls: "bar"}]});
            childEl = rootEl.first();

            simpleTpl = new Ext.Template('<div class="template">Hello {0}.</div>');
            appliedArr = ["world"];

            complexTpl = new Ext.Template([
                    '<div name="{id}">',
                        '<span class="{cls}">{name} {value:ellipsis(10)}</span>',
                    '</div>'
            ]);
            appliedObject = {id: "myid", cls: "myclass", name: "foo", value: "bar"};
            spyOn(Ext, "getDom").andCallThrough();
        });

        afterEach(function() {
           rootEl.remove();
        });

        describe("append", function() {
            describe("with a simple template", function() {
                beforeEach(function() {
                    simpleTplEl = simpleTpl.append(rootEl, ["world"], true);
                });

                it("should append the new node the end of the specified element", function() {
                    expect(simpleTplEl).toEqual(rootEl.last());
                });

                it("should apply the supplied value to the template", function() {
                    expect(simpleTplEl.dom).hasHTML('Hello world.');
                });

                it("should call Ext.getDom", function() {
                    expect(Ext.getDom).toHaveBeenCalledWith(rootEl);
                });
            });

            describe("with a complex template", function() {
                beforeEach(function() {
                    complexTplEl = complexTpl.append(rootEl, appliedObject, true);
                });

                it("should append the new node the end of the specified element", function() {
                    expect(complexTplEl).toEqual(rootEl.last());
                });

                it("should apply the supplied value to the template", function() {
                    expect(complexTplEl.dom).hasHTML('<span class="myclass">foo bar</span>');
                });

                it("should call Ext.getDom", function() {
                    expect(Ext.getDom).toHaveBeenCalledWith(rootEl);
                });
            });
        });

        describe("apply", function() {
            describe("with a simple template", function() {
                it("should applies the supplied value an return an HTML fragments", function() {
                    expect(simpleTpl.apply(appliedArr)).toEqual('<div class="template">Hello world.</div>');
                 });
            });

            describe("with a complex template", function() {
                it("should applies the supplied value an return an HTML fragments", function() {
                    expect(complexTpl.apply(appliedObject)).toEqual('<div name="myid"><span class="myclass">foo bar</span></div>');
                 });
            });

        });

        describe("insertAfter", function() {
            describe("with a simple template", function() {
                beforeEach(function() {
                    simpleTplEl = simpleTpl.insertAfter(childEl, ["world"], true);
                });

                it("should insert the new node after the specified element", function() {
                    expect(simpleTplEl).toEqual(childEl.next());
                });

                it("should apply the supplied value to the template", function() {
                    expect(simpleTplEl.dom).hasHTML('Hello world.');
                });

                it("should call Ext.getDom", function() {
                    expect(Ext.getDom).toHaveBeenCalledWith(childEl);
                });
            });

            describe("with a complex template", function() {
                beforeEach(function() {
                    complexTplEl = complexTpl.insertAfter(childEl, appliedObject, true);
                });

                it("should insert the new node after the specified element", function() {
                    expect(complexTplEl).toEqual(childEl.next());
                });

                it("should apply the supplied value to the template", function() {
                    expect(complexTplEl.dom).hasHTML('<span class="myclass">foo bar</span>');
                });

                it("should call Ext.getDom", function() {
                    expect(Ext.getDom).toHaveBeenCalledWith(childEl);
                });
            });
        });

        describe("insertBefore", function() {
            describe("with a simple template", function() {
                beforeEach(function() {
                    simpleTplEl = simpleTpl.insertBefore(childEl, ["world"], true);
                });

                it("should insert the new node before the specified element", function() {
                    expect(simpleTplEl).toEqual(childEl.prev());
                });

                it("should apply the supplied value to the template", function() {
                    expect(simpleTplEl.dom).hasHTML('Hello world.');
                });

                it("should call Ext.getDom", function() {
                    expect(Ext.getDom).toHaveBeenCalledWith(childEl);
                });
            });

            describe("with a complex template", function() {
                beforeEach(function() {
                    complexTplEl = complexTpl.insertBefore(childEl, appliedObject, true);
                });

                it("should insert the new node before the specified element", function() {
                    expect(complexTplEl).toEqual(childEl.prev());
                });

                it("should apply the supplied value to the template", function() {
                    expect(complexTplEl.dom).hasHTML('<span class="myclass">foo bar</span>');
                });

                it("should call Ext.getDom", function() {
                    expect(Ext.getDom).toHaveBeenCalledWith(childEl);
                });
            });
        });

        describe("insertFirst", function() {
            describe("with a simple template", function() {
                beforeEach(function() {
                    simpleTplEl = simpleTpl.insertFirst(rootEl, ["world"], true);
                });

                it("should insert the new node as first child of the specified element", function() {
                    expect(simpleTplEl).toEqual(rootEl.first());
                });

                it("should apply the supplied value to the template", function() {
                    expect(simpleTplEl.dom).hasHTML('Hello world.');
                });

                it("should call Ext.getDom", function() {
                    expect(Ext.getDom).toHaveBeenCalledWith(rootEl);
                });
            });

            describe("with a complex template", function() {
                beforeEach(function() {
                    complexTplEl = complexTpl.insertFirst(rootEl, appliedObject, true);
                });

                it("should insert the new node as first child of the specified element", function() {
                    expect(complexTplEl).toEqual(rootEl.first());
                });

                it("should apply the supplied value to the template", function() {
                    expect(complexTplEl.dom).hasHTML('<span class="myclass">foo bar</span>');
                });

                it("should call Ext.getDom", function() {
                    expect(Ext.getDom).toHaveBeenCalledWith(rootEl);
                });
            });
        });

        describe("overwrite", function() {
            describe("with a simple template", function() {
                beforeEach(function() {
                    simpleTplEl = simpleTpl.overwrite(rootEl, ["world"], true);
                });

                it("should overrride the content of the specified element", function() {
                    expect(simpleTplEl).toEqual(rootEl.first());
                    expect(simpleTplEl).toEqual(rootEl.last());
                });

                it("should apply the supplied value to the template", function() {
                    expect(simpleTplEl.dom).hasHTML('Hello world.');
                });

                it("should call Ext.getDom", function() {
                    expect(Ext.getDom).toHaveBeenCalledWith(rootEl);
                });
            });

            describe("with a complex template", function() {
                beforeEach(function() {
                    complexTplEl = complexTpl.overwrite(rootEl, appliedObject, true);
                });

                it("should overrride the content of the specified element", function() {
                    expect(complexTplEl).toEqual(rootEl.first());
                    expect(complexTplEl).toEqual(rootEl.last());
                });

                it("should apply the supplied value to the template", function() {
                    expect(complexTplEl.dom).hasHTML('<span class="myclass">foo bar</span>');
                });

                it("should call Ext.getDom", function() {
                    expect(Ext.getDom).toHaveBeenCalledWith(rootEl);
                });
            });
        });

        describe("overwrite a table element", function() {
            var table;

            beforeEach(function() {
                table = Ext.fly(document.body).createChild({tag:'table'});
            });

            afterEach(function() {
                table.remove();
            });

            it("should insert table structure into a table", function() {
                new Ext.Template('<tr><td>text</td></tr>').overwrite(table);

                var innerHTML = table.dom.innerHTML;

                if (Ext.isSafari4) {
                    // Old Safari doesn't inject the tbody but the table row is created successfully
                    expect(innerHTML).toEqual("<tr><td>text</td></tr>");
                }
                else {
                    expect(innerHTML.toLowerCase().replace(/\s/g, '')).toEqual("<tbody><tr><td>text</td></tr></tbody>");
                }
            });
        });

        describe("set", function() {
            var tplString = '<div class="template">Good bye {0}.</div>';

            it("should set the HTML used as the template", function() {
                 simpleTpl.set(tplString);

                 expect(simpleTpl.apply(["world"])).toEqual('<div class="template">Good bye world.</div>');
            });

            it("should be able to compile the template", function() {
                simpleTpl.set(tplString, true);
                var s = simpleTpl.apply([42]);

                // must call the new tpl for it bother compiling it
                expect(s).toBe('<div class="template">Good bye 42.</div>');
                expect(typeof simpleTpl.fn === "function").toBe(true);
            });
        });

        describe("compile", function() {
            it("should call compiled function", function() {
                complexTpl.compile();

                spyOn(complexTpl, "fn").andCallThrough();

                complexTpl.apply(appliedObject);

                expect(complexTpl.fn).toHaveBeenCalledWith(appliedObject);
            });

            it("should return the same value as if it wasn't compiled with a complex template", function() {
                var htmlWithNotCompiledTemplate,
                    htmlWithCompiledTemplate;
                htmlWithNotCompiledTemplate = complexTpl.apply(appliedObject);
                complexTpl.compile();
                htmlWithCompiledTemplate = complexTpl.apply(appliedObject);

                expect(htmlWithCompiledTemplate).toEqual(htmlWithNotCompiledTemplate);
            });

            it("should return the same value as if it wasn't compiled with a simple template", function() {
                var htmlWithNotCompiledTemplate,
                    htmlWithCompiledTemplate;

                htmlWithNotCompiledTemplate = simpleTpl.apply(appliedArr);
                simpleTpl.compile();
                htmlWithCompiledTemplate = simpleTpl.apply(appliedArr);

                expect(htmlWithCompiledTemplate).toEqual(htmlWithNotCompiledTemplate);
            });

            it("should return the template itself", function() {
                expect(simpleTpl.compile()).toEqual(simpleTpl);
            });

        });
    });

    describe("formats", function() {
        var tpl,
            ellipsisSpy,
            htmlEncodeSpy,
            appliedObject;

        beforeEach(function() {
            appliedObject = {a: "123", b: "456789"};

            ellipsisSpy = spyOn(Ext.util.Format, "ellipsis");
            htmlEncodeSpy = spyOn(Ext.util.Format, "htmlEncode");
        });

        describe("enabled", function() {
            beforeEach(function() {
                tpl = new Ext.Template(
                    '{a:ellipsis(2)}',
                    '{b:htmlEncode}'
                );
            });

            it("should call Ext.util.Format.ellipsis with a non compiled template", function() {
                tpl.apply(appliedObject);

                expect(ellipsisSpy).toHaveBeenCalledWith(appliedObject.a, 2);
                expect(htmlEncodeSpy).toHaveBeenCalledWith(appliedObject.b);
            });

            it("should call Ext.util.Format.ellipsis with compiled template", function() {
                tpl.compile();
                tpl.apply(appliedObject);

                expect(ellipsisSpy).toHaveBeenCalledWith(appliedObject.a, 2);
                expect(htmlEncodeSpy).toHaveBeenCalledWith(appliedObject.b);
            });
        });

        describe("disabled", function() {
            beforeEach(function() {
                tpl = new Ext.Template(
                    '{a:ellipsis(2)}',
                    {disableFormats: true}
                );
            });

            it("should not call Ext.util.Format.ellipsis with a non compiled template", function() {
                tpl.apply(appliedObject);

                expect(ellipsisSpy).not.toHaveBeenCalled();
            });

            it("should not call Ext.util.Format.ellipsis with compiled template", function() {
                tpl.compile();
                tpl.apply(appliedObject);

                expect(ellipsisSpy).not.toHaveBeenCalled();
            });
        });
    });

    describe("members functions", function() {
        var tpl,
            memberFn,
            appliedObject;

        beforeEach(function() {
            memberFn = jasmine.createSpy().andCallFake(function(a, inc) {
                return a + inc;
            });

            var obj = {
                referenceHolder: true,
                controller: 'foo',

                fmt: function () {
                    
                },
                promote: function () {
                //
                },

                items: [{
                    items: [{
                        xtype: 'button',
                        reference: 'btn',
                        listeners: {
                            click: 'promote'
                        },
                        bind: {
                            text: 'Promote {user.name:this.fmt}'
                        }
                    }]
                }]
            }

            tpl = new Ext.Template(
                '{a:this.increment(7)}',
                {increment: memberFn}
            );

            appliedObject = {a: 1};
        });

        it("should call members functions with a non compiled template", function() {
            tpl.apply(appliedObject);
            expect(memberFn).toHaveBeenCalledWith(1, 7);
        });

        it("should call members functions with a compiled template", function() {
            tpl.compile();
            tpl.apply(appliedObject);
            expect(memberFn).toHaveBeenCalledWith(1, 7);
        });

        it("should add member function in initialConfig", function() {
            expect(tpl.initialConfig).toEqual({increment: memberFn});
        });
    });

    describe("Ext.Template.from", function() {
        var elWithHtml, elWithValue;

        beforeEach(function() {
            elWithHtml =  Ext.fly(document.body).createChild({tag: "div", html:"FOO {0}."});
            elWithValue =  Ext.fly(document.body).createChild({tag: "input"});
            elWithValue.dom.value = "BAR {0}.";

        });

        afterEach(function() {
            elWithHtml.remove();
            elWithValue.remove();
        });

        it("should create a template with dom element innerHTML", function() {
            var tpl = Ext.Template.from(elWithHtml);

            expect(tpl.apply(['BAR'])).toEqual('FOO BAR.');
        });

        it("should create a template with dom element value", function() {
            var tpl = Ext.Template.from(elWithValue);

            expect(tpl.apply(['FOO'])).toEqual('BAR FOO.');
        });
    });

    function testTemplate(compiled) {
        describe('Using numeric tokens and a values array', function() {
            it('should use Ext.util.Format formatting functions by default', function() {
                expect(new Ext.Template('Value: {0:number("0.00")}', {compiled: compiled}).apply([3.257])).toBe("Value: 3.26");
            });
            it('should use member formatting functions when prepended with "this."', function() {
                var tpl = [
                    'Warning: {0:this.bold}',
                    {
                        bold: function(v){
                            return '<b>' + v + '</b>';
                        },
                        compiled: compiled
                    }
                ];
                expect(new Ext.Template(tpl).apply(['Warning message'])).toBe("Warning: <b>Warning message</b>");
            });
            it('should not see "{margin:0} as a token', function() {
                expect(new Ext.Template('p{margin:0}body{direction:{0}}', {compiled: compiled}).apply(['rtl'])).toBe('p{margin:0}body{direction:rtl}');
            });
            it('should not see "{1:someText} as a token', function() {
                expect(new Ext.Template('{0}{1:sometext}{1}', {compiled: compiled}).apply(['foo', 'bar'])).toBe('foo{1:sometext}bar');
            });
        });

        describe('Using alphanumeric tokens and a values object', function() {
            it('should use Ext.util.Format formatting functions by default', function() {
                expect(new Ext.Template('Value: {prop0:number("0.00")}', {compiled: compiled}).apply({prop0:3.257})).toBe("Value: 3.26");
            });
            it('should use member formatting functions when prepended with "this."', function() {
                var tpl = [
                    'Warning: {prop0:this.bold}',
                    {
                        bold: function(v){
                            return '<b>' + v + '</b>';
                        },
                        compiled: compiled
                    }
                ]
                expect(new Ext.Template(tpl).apply({prop0:'Warning message'})).toBe("Warning: <b>Warning message</b>");
            });
            it('should not see "{margin:0} as a token', function() {
                expect(new Ext.Template('p{margin:0}body{direction:{prop0}}', {compiled: compiled}).apply({prop0:'rtl'})).toBe('p{margin:0}body{direction:rtl}');
            });
            it('should not see "{1:someText} as a token', function() {
                expect(new Ext.Template('{prop0}{1:sometext}{prop1}', {compiled: compiled}).apply({prop0:'foo', prop1:'bar'})).toBe('foo{1:sometext}bar');
            });
        });
    }

    describe('Non-compiled', function() {
        testTemplate(false);
    });

    describe('Compiled', function() {
        testTemplate(true);
    });
});
