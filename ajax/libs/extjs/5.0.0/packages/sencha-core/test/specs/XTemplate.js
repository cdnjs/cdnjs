describe("Ext.XTemplate", function() {
    var tpl,
        data,
        arrayData,
        objectData;

        beforeEach(function() {
            data = {
                name: "Nicolas Ferrero",
                title: "Developer",
                company: "Sencha",
                email: "nico@sencha.com",
                address: "10 Rue St Ferreol",
                city: "Toulouse",
                country: "France",
                zip: "31000",
                drinks: ["Wine", "Coffee", "Corona"],
                something: {
                    name: "root",
                    child : {
                        name: "child"
                    }
                },
                kids: [{
                    name: "Joshua",
                    age:3
                },{
                    name: "Nina",
                    age:2
                },{
                    name: "Solomon",
                    age:0
                }],
                computers: [{
                    cpu: "2Ghz",
                    hdd: "1To"
                },{
                    cpu: "100Mhz",
                    hdd: "500Mo"
                }]
            };
            arrayData = {
                arrays: [
                    [ { name: 'Item A1' }, { name: 'Item A2' } ],
                    [ { name: 'Item B1' }, { name: 'Item B2' } ]
                ]
            };
            objectData = {
                a: 'aValue',
                b: {
                    x: 'xValue',
                    y: 'yValue'
                },
                c: 'cValue'
            };

        });

    describe("instantiation", function() {
        it("should extend Ext.Template", function() {
            tpl = new Ext.XTemplate("");

            expect(tpl.superclass).toEqual(Ext.Template.prototype);
        });

        it("should alias apply with applyTemplate", function() {
            tpl = new Ext.XTemplate("");

            spyOn(tpl, 'apply');

            tpl.applyTemplate();

            expect(tpl.apply).toHaveBeenCalled();
        });

        it("should compile on first use", function() {
            tpl = new Ext.XTemplate('Hello {foo}');
            expect(tpl.fn).toBe(null);

            var s = tpl.apply({ foo: 42 });
            expect(s).toBe('Hello 42');
            expect(typeof tpl.fn).toBe('function');
        });

        /*  begin this line with "//* to include this test or "/*" to remove it
        it('should perform better', function () {
            function run (name) {
                var T = Ext[name],
                    t0 = new Date().getTime(),
                    K = 2000,
                    t, s;

                for (var i = 0; i < K; ++i) {
                    t = new T(
                        '<p>Name: {name}</p>',
                        '<p>Kids: ',
                        '<tpl for="kids">',
                            '<tpl if="age &gt; 1">',
                                '<p>{name}</p>',
                                '<p>Dad: {parent.name}</p>',
                            '</tpl>',
                        '</tpl></p>'
                    );
                }

                var t1 = new Date().getTime();

                for (i = 0; i < K; ++i) {
                    s = t.apply(data);
                }

                var t2 = new Date().getTime();

                for (i = 0; i < K; ++i) {
                    t = new T(
                        '<p>Name: {name}</p>',
                        '<p>Kids: ',
                        '<tpl for="kids">',
                            '<tpl if="age &gt; 1">',
                                '<p>{name}</p>',
                                '<p>Dad: {parent.name}</p>',
                            '</tpl>',
                        '</tpl></p>'
                    );
                    s = t.apply(data);
                }

                var t3 = new Date().getTime();
                
                Ext.log(name + ': total=' + (t2 - t0)/K + ' ctor=' + (t1 - t0)/K +
                    ' apply=' + (t2 - t1)/K + ' ctorApply=' + (t3 - t2)/K);
            }

            run('XTemplate');
            run('XTemplate1');
            run('XTemplate2');
        });/**/
    });

    describe("tags", function() {
        describe("if", function() {
            it("should handle tpl tag with no attributes", function() {
                tpl = new Ext.XTemplate(
                    '<tpl>{name}</tpl>'
                );
                expect(tpl.apply({name: 'Phil'})).toEqual('Phil');
            });
            it('should handle <tpl if=""> like <tpl>', function() {
                tpl = new Ext.XTemplate(
                    '<p>Kids: ',
                    '<tpl if="">',
                    '<p>{name}</p>',
                    '</tpl></p>'
                );

                expect(tpl.apply(data.kids)).toEqual('<p>Kids: <p></p></p>');
            });

            it('should handle if, elif and else', function() {
                tpl = new Ext.XTemplate(
                    '<tpl for=\'kids\'>',
                        '<tpl if="age &gt; 2">',
                            '<p>{name}</p>',
                            '<p>Pops: {parent.name}</p>',
                        '<tpl elif="age &gt; 1">',
                            '<p>{name}</p>',
                            '<p>Dad: {parent.name}</p>',
                        '<tpl else>',
                            '<p>{name}</p>',
                            '<p>Daddy: {parent.name}</p>',
                        '</tpl>',
                    '</tpl><p>!</p>'
                );

                var s = tpl.apply(data);
                expect(s).toEqual('<p>Joshua</p><p>Pops: Nicolas Ferrero</p>' +
                    '<p>Nina</p><p>Dad: Nicolas Ferrero</p>' +
                    '<p>Solomon</p><p>Daddy: Nicolas Ferrero</p><p>!</p>');
            });
            
            it('should handle verbatim block', function() {
                tpl = new Ext.XTemplate(
                    '<tpl for=\'kids\'>',
                        '<tpl if="age &gt;= 3">',
                            '{% continue; %}',
                        '</tpl>',
                        '<tpl if="this.count">',
                            ' and ',
                        '</tpl>',
                        '{% ++this.count %}',
                        '{name} is less than 3',
                    '</tpl>!!!',
                    {
                        count: 0
                    }
                );

                var s = tpl.apply(data);
                expect(s).toEqual('Nina is less than 3 and Solomon is less than 3!!!');
            });

            it('should handle verbatim if/else', function() {
                tpl = new Ext.XTemplate(
                    '<tpl for=\'kids\'>',
                        '{% if (values.age >= 3) { %}',
                            '{% continue; %}',
                        '{% }',
                        'if (this.count) { %}',
                            ' and ',
                        '{% } %}',
                        '{% ++this.count %}',
                        '{name} is less than 3',
                    '</tpl>!!!',
                    {
                        count: 0
                    }
                );

                var s = tpl.apply(data);
                expect(s).toEqual('Nina is less than 3 and Solomon is less than 3!!!');
            });

            it('should handle double quotes', function() {
                tpl = new Ext.XTemplate(
                    "<tpl for='kids'>",
                        "<tpl if='name==\"Joshua\"'>",
                            "Josh",
                        "<tpl else>",
                            " {name}",
                        "</tpl>",
                    '</tpl>!!!'
                );

                var s = tpl.apply(data);
                expect(s).toEqual('Josh Nina Solomon!!!');
            });

            // From http://www.sencha.com/forum/showthread.php?142918
            it('should handle single quotes', function () {
                tpl = new Ext.XTemplate(
                        '<tpl for=".">',
                            '<div class="dv-grup-body">',
                            '<tpl for="menus">',
                                '<div class="dv-element small" id="{id}" test="{test}" sample="{sample}" cmpName="{cmpName}">',
                                    '<span>',
                                        '<img src="img/icons/{icon}.png" title="{name}" align="left">',
                                        '<tpl if="values.test * values.sample == 0">',
                                            '<img src="img/icons/warning.png" align="right" title="{[ values.sample == 0 ? \'Sample Text 1\' : \'Sample Text 2\' ]}">',
                                        '</tpl>',
                                        '<span class="boldText" style="float:left;">',
                                            '{name}',
                                        '</span>',
                                    '</span>',
                                '</div>',
                            '</tpl>',
                            '</div>',
                        '</tpl>');

                var s = tpl.apply({
                    menus: [
                        { id: 'foo', test: 0, sample: 3, cmpName: 'cname', name: 'Name', icon: 'ico' }
                    ]
                });
                expect(s).toEqual('<div class="dv-grup-body">'+
                        '<div class="dv-element small" id="foo" test="0" sample="3" cmpName="cname">'+
                        '<span>'+
                            '<img src="img/icons/ico.png" title="Name" align="left">'+
                            '<img src="img/icons/warning.png" align="right" title="Sample Text 2">'+
                            '<span class="boldText" style="float:left;">'+
                                'Name'+
                            '</span>'+
                        '</span>'+
                    '</div></div>'
                    );
            });
        });
        
        describe("switch", function() {
            it('should handle switch, case and default with numbers', function() {
                tpl = new Ext.XTemplate(
                    '<tpl for=\'kids\'>',
                        '<tpl switch="age">',
                            '<tpl case="3" case="4">',
                                '<p>{name} is 3...</p>',
                            '<tpl case="2">',
                                '<p>{name} is 2...</p>',
                            '<tpl default>',
                                '<p>{name} is {age}!</p>',
                        '</tpl>',
                    '</tpl><p>!</p>'
                );

                var s = tpl.apply(data);
                expect(s).toEqual('<p>Joshua is 3...</p><p>Nina is 2...</p><p>Solomon is 0!</p><p>!</p>');
            });

            it('should handle switch, case and default with strings', function() {
                tpl = new Ext.XTemplate(
                    '<tpl for=\'kids\'>',
                        '<tpl switch="name">',
                            '<tpl case="Joshua" case="Solomon">',
                                '<p>{name} is a boy</p>',
                            '<tpl default>',
                                '<p>{name} is a girl!</p>',
                        '</tpl>',
                    '</tpl><p>!</p>'
                );

                var s = tpl.apply(data);
                expect(s).toEqual('<p>Joshua is a boy</p><p>Nina is a girl!</p><p>Solomon is a boy</p><p>!</p>');
            });
            
            it("should be able to switch on xindex", function() {
                tpl = new Ext.XTemplate([
                    '<tpl for=".">',
                        '<tpl switch="#">',
                            '<tpl case="1">One',
                            '<tpl case="2">Two',
                            '<tpl case="3">Three',
                            '<tpl case="4">Four',
                            '<tpl default>Bigger',
                        '</tpl>',
                    '</tpl>']);
      
                expect(tpl.apply([1, 2, 3, 4, 5, 6])).toBe('OneTwoThreeFourBiggerBigger');
            });

            it("should allow spaces after the switch", function() {
                tpl = new Ext.XTemplate('<tpl switch="foo">         <tpl case="bar">bar</tpl>');
                expect(tpl.apply({
                    foo: 'bar'
                })).toBe('bar');
            });
        });

        describe("for", function () {
            it('should examine the data object provided if for="." is specified (include array index test)', function() {
                tpl = new Ext.XTemplate(
                    '<p>Kids: ',
                    '<tpl for=".">',
                    '<p>{#}. {name}</p>',
                    '</tpl></p>'
                );
                var s = tpl.apply(data.kids);
                expect(s).toEqual('<p>Kids: <p>1. Joshua</p><p>2. Nina</p><p>3. Solomon</p></p>');
            });
            
            it('should insert "between" values', function() {
                tpl = new Ext.XTemplate(
                    '<p>Kids: ',
                    '<tpl for="." between=",">',
                    '{#}. {name}',
                    '</tpl></p>'
                );
                var s = tpl.apply(data.kids);
                expect(s).toEqual('<p>Kids: 1. Joshua,2. Nina,3. Solomon</p>');
            });

            it('should handle "." and "parent" in loop', function () {
                var tpl = new Ext.XTemplate(
                    '<div id="{id}-body" class="{baseCls}-body',
                    '<tpl if="bodyCls"> {bodyCls}</tpl>',
                    '<tpl if="uiCls">',
                        '<tpl for="uiCls"> {parent.baseCls}-body-{parent.ui}-{.}</tpl>',
                    '</tpl>"',
                    '<tpl if="bodyStyle"> style="{bodyStyle}"</tpl>>',
                    '</div>'
                );
                var s = tpl.apply({
                    baseCls: 'x-panel-header',
                    componentCls: 'x-panel-header',
                    frame: false,
                    id: 'header-1026',
                    ui: 'default',
                    uiCls: ['horizontal', 'top']
                });
                expect(s).toEqual('<div id="header-1026-body" class="x-panel-header-body x-panel-header-body-default-horizontal x-panel-header-body-default-top"></div>');
            });

            it('should handle <tpl for=""> like <tpl>', function() {
                tpl = new Ext.XTemplate(
                    '<p>Kids: ',
                    '<tpl for="">',
                    '<p>{name}</p>',
                    '</tpl></p>'
                );
                expect(tpl.apply(data.kids)).toEqual('<p>Kids: <p></p></p>');
            });

            it('should examine the data of parent object if for=".." is specified', function() {
                tpl = new Ext.XTemplate(
                    '<p>Computer: ',
                    '<tpl for="computers">',
                        '<p>Cpu: {cpu} Hdd: {hdd}',
                            '<tpl for="..">',
                                ' User: {name}',
                            '</tpl>',
                        '</p>',
                    '</tpl></p>'
                );
                var s = tpl.apply(data);
                expect(s).toEqual('<p>Computer: <p>Cpu: 2Ghz Hdd: 1To User: Nicolas Ferrero</p><p>Cpu: 100Mhz Hdd: 500Mo User: Nicolas Ferrero</p></p>');
            });

            it("should be able to access specified members of the provided data object (include array index test)", function() {
                tpl = new Ext.XTemplate(
                    '<p>Name: {name}</p>',
                    '<p>Title: {title}</p>',
                    '<p>Company: {company}</p>',
                    '<p>Kids: ',
                    '<tpl for="kids">',
                        '<p>{#}. {name}</p>',
                    '</tpl></p>'
                );
                expect(tpl.apply(data)).toEqual('<p>Name: Nicolas Ferrero</p><p>Title: Developer</p><p>Company: Sencha</p><p>Kids: <p>1. Joshua</p><p>2. Nina</p><p>3. Solomon</p></p>');
            });

            describe("{.}", function(){
                it("should be able to auto-render flat array content with special variable {.} (include array index test)", function() {
                    tpl = new Ext.XTemplate(
                        '<p>{name}\'s favorite beverages:</p>',
                        '<tpl for="drinks">',
                            '<div>{#} - {.}</div>',
                        '</tpl>'
                    );
                    expect(tpl.apply(data)).toEqual("<p>Nicolas Ferrero's favorite beverages:</p><div>1 - Wine</div><div>2 - Coffee</div><div>3 - Corona</div>");
                });

                it("should render numbers, strings, booleans, and dates, but not objects or arrays", function(){
                    tpl = new Ext.XTemplate('<tpl for=".">{.}</tpl>');
                    var date = new Date();
                    expect(tpl.apply([1, true, 2.3, false, 'test', [1, 2, 3], {a:1, b:2}, 'ing', date, undefined, null])).toEqual('1true2.3falsetesting' + date);
                });
            });

             it("should not fail if for try to handle an undefined variable.", function() {
                tpl = new Ext.XTemplate(
                    '<p>{name}\'s:</p>',
                    '<tpl for="nothing">',
                        '<div>{nothing1}</div>',
                    '</tpl>{badness}<p>Foo</p>'
                );
                var s = tpl.apply(data);
                expect(s).toEqual("<p>Nicolas Ferrero's:</p><p>Foo</p>");
            });
            
            describe("parent", function() {

                it("should be able to access parent object member via the parent object", function() {
                    tpl = new Ext.XTemplate(
                        '<p>Name: {name}</p>',
                        '<p>Kids: ',
                        '<tpl for="kids">',
                            '<tpl if="age &gt; 1">',
                                '<p>{name}</p>',
                                '<p>Dad: {parent.name}</p>',
                            '</tpl>',
                        '</tpl></p>'
                    );
                    var s = tpl.apply(data);
                    expect(s).toEqual("<p>Name: Nicolas Ferrero</p><p>Kids: <p>Joshua</p><p>Dad: Nicolas Ferrero</p><p>Nina</p><p>Dad: Nicolas Ferrero</p></p>");
                });
            
                it("should set the parent to the parent array if the action is '.'", function(){
                    var tpl = new Ext.XTemplate(
                        '<tpl for=".">',
                            '{parent.specialProp}',
                            '<tpl for=".">',
                                '{parent.specialProp}{.}',
                            '</tpl>',
                        '</tpl>'
                    );
                
                    var data = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
                    data.specialProp = 'test';
                    data[0].specialProp = 'foo';
                    data[1].specialProp = 'bar';
                    data[2].specialProp = 'baz';
                
                    var s = tpl.apply(data);
                    expect(s).toBe('testfoo1foo2foo3testbar4bar5bar6testbaz7baz8baz9');
                });
            
                it("should work with nested parents", function(){
                    var tpl = new Ext.XTemplate(
                        '{name}',
                        '<tpl for="children">',
                                '{name}{parent.name}',
                                '<tpl for="children">',
                                    '{name}{parent.name}',
                                '</tpl>',
                        '</tpl>'
                    );
    
                    var s = tpl.apply({ 
                        name : 'A1', 
                        children : [{ 
                            name : 'B1', 
                            children : [{ 
                                name : 'C1' 
                            }, {
                                name: 'C2'
                            }] 
                        }, {
                            name: 'B2',
                            children : [{ 
                                name : 'C3' 
                            }, {
                                name: 'C4'
                            }]
                        }] 
                    });
                    expect(s).toBe('A1B1A1C1B1C2B1B2A1C3B2C4B2');
                });

                it("should reset the parent correctly during looping", function(){
                    var data = [{
                        id: 1,
                        level2: [{
                            id: 11,
                            level3: [{
                                id: 111
                            }, {
                                id: 112
                            }, {
                                id: 113
                            }]
                        }, {
                            id: 12,
                            level3: [{
                                id: 121
                            }, {
                                id: 122
                            }, {
                                id: 123
                            }]
                        }, {
                            id: 13,
                            level3: [{
                                id: 131
                            }, {
                                id: 132
                            }, {
                                id: 133
                            }]
                        }]
                    }, {
                        id: 2,
                        level2: [{
                            id: 21,
                            level3: []
                        }, {
                            id: 22,
                            level3: []
                        }]
                    }];

                    var tpl = new Ext.XTemplate(
                        '<tpl for=".">',
                            'level 1: id: {id}',
                            '<tpl for="level2">',
                                'level 2: id: {id}, parent.id: {parent.id}',
                                '<tpl for="level3">',
                                    'level 3: id: {id}, parent.id: {parent.id}',
                                '</tpl>',
                            '</tpl>',
                        '</tpl>'
                    );
                    
                    expect(tpl.apply(data)).toBe([
                        'level 1: id: 1',
                        'level 2: id: 11, parent.id: 1',
                        'level 3: id: 111, parent.id: 11',
                        'level 3: id: 112, parent.id: 11',
                        'level 3: id: 113, parent.id: 11',
                        'level 2: id: 12, parent.id: 1',
                        'level 3: id: 121, parent.id: 12',
                        'level 3: id: 122, parent.id: 12',
                        'level 3: id: 123, parent.id: 12',
                        'level 2: id: 13, parent.id: 1',
                        'level 3: id: 131, parent.id: 13',
                        'level 3: id: 132, parent.id: 13',
                        'level 3: id: 133, parent.id: 13',
                        'level 1: id: 2',
                        'level 2: id: 21, parent.id: 2',
                        'level 2: id: 22, parent.id: 2'
                    ].join(''));
                });
            });

            it("should be able to access child object like a tree", function() {
                tpl = new Ext.XTemplate("{something.child.name}");
                expect(tpl.apply(data)).toEqual("child");
            });

            it('should handle sequential for loops nested in for loop using arrays', function () {
                // this bug one was found by Brian's calendar templates
                tpl = new Ext.XTemplate(
                        '<tpl for="arrays">',
                            '<tpl for=".">',
                                '_{name}_',
                            '</tpl>',
                            '<tpl for=".">',
                                '-{name}-',
                            '</tpl>',
                            '/',
                        '</tpl>'
                    );

                var s = tpl.apply(arrayData);
                expect(s).toEqual('_Item A1__Item A2_-Item A1--Item A2-/'+
                                  '_Item B1__Item B2_-Item B1--Item B2-/');
            });

            it("should set the xindex variable correctly when looping over nested arrays", function() {
                var result = new Ext.XTemplate(
                    '<tpl for=".">',
                        '{% if (Ext.isArray(values)) { %}',
                        '<tpl for=".">',
                            '{#}',
                        '</tpl>',
                        '{% } %}',
                        '{#}',
                    '</tpl>'
                ).apply([1,1,1,[1,1],1]);
                expect(result).toBe('1231245');
            });
        }); // for
        
        describe("foreach", function () {

            it('should examine the data object provided if foreach="." is specified', function() {
                var tpl = new Ext.XTemplate(
                        '<tpl foreach=".">',
                            '{% if (Ext.isObject(values)) { %}',
                                '<tpl foreach=".">',
                                    '{[xkey]} {[values]}.',
                                '</tpl>',
                            '{% } %}',
                            '{$} {.}.',
                        '</tpl>'
                    ), 
                    result = Ext.Array.sort(tpl.apply(objectData).split('.'));

                expect(result[1]).toBe('a aValue');
                expect(result[2]).toBe('b ');
                expect(result[3]).toBe('c cValue');
                expect(result[4]).toBe('x xValue');
                expect(result[5]).toBe('y yValue');
            });

            it('should handle "." and "parent" in loop', function () {
                var tpl = new Ext.XTemplate(
                        '<div id="{id}-body" class="{baseCls}-body',
                        '<tpl if="bodyCls"> {bodyCls}</tpl>',
                        '<tpl if="uiCls">',
                            '<tpl foreach="uiCls"> {parent.baseCls}-body-{parent.ui}-{.}</tpl>',
                        '</tpl>"',
                        '<tpl if="bodyStyle"> style="{bodyStyle}"</tpl>>',
                        '</div>'
                    ),
                    result = tpl.apply({
                        baseCls: 'x-panel-header',
                        componentCls: 'x-panel-header',
                        frame: false,
                        id: 'header-1026',
                        ui: 'default',
                        uiCls: {
                            h: 'horizontal', 
                            t: 'top'
                        }
                    });
                expect(result).toEqual('<div id="header-1026-body" class="x-panel-header-body x-panel-header-body-default-horizontal x-panel-header-body-default-top"></div>');
            });

            it('should handle <tpl foreach=""> like <tpl>', function() {
                var tpl = new Ext.XTemplate(
                    '<p>Kids: ',
                    '<tpl foreach="">',
                    '<p>{name}</p>',
                    '</tpl></p>'
                );
                expect(tpl.apply(data.kids)).toEqual('<p>Kids: <p></p></p>');
            });

            it('should examine the data of parent object if for=".." is specified', function() {
                var tpl = new Ext.XTemplate(
                    '<tpl foreach="b">',
                        '<p>{$} {.}</p>',
                            '<tpl for="..">',
                                'a: {a}',
                            '</tpl>',
                        '</p>',
                    '</tpl></p>'
                );
                expect(tpl.apply(objectData)).toEqual('<p>x xValue</p>a: aValue</p><p>y yValue</p>a: aValue</p></p>');
            });
            
            it('should insert "between" values', function() {
                var tpl = new Ext.XTemplate(
                    '<tpl foreach="b" between=",">',
                        '{$}: {.}',
                    '</tpl>'
                );
                expect(tpl.apply(objectData)).toEqual('x: xValue,y: yValue');
            });

            it("should be able to access the xindex using {#}", function() {
                var tpl = new Ext.XTemplate(
                    '<tpl foreach="kids">',
                        '{#}',
                    '</tpl>'
                );
                expect(tpl.apply(data)).toEqual('123');
            });

            it("should not loop if foreach is passed an undefined variable.", function() {
                var tpl = new Ext.XTemplate(
                    '<p>{name}\'s:</p>',
                    '<tpl foreach="nothing">',
                        '<div>{#}{$}{.}{nothing1}</div>',
                    '</tpl>{badness}<p>Foo</p>'
                );
                expect(tpl.apply(data)).toEqual("<p>Nicolas Ferrero's:</p><p>Foo</p>");
            });
            
            describe("parent", function() {

                it("should be able to access parent object member via the parent object", function() {
                    var tpl = new Ext.XTemplate(
                        '<tpl foreach="b">',
                            '<p>{parent.c}</p>',
                        '</tpl>'
                    );
                    expect(tpl.apply(objectData)).toEqual("<p>cValue</p><p>cValue</p>");
                });
            
                it("should set the parent to the parent object if the action is '.'", function(){
                    var tpl = new Ext.XTemplate(
                            '<tpl foreach=".">',
                                '{parent.x}',
                            '</tpl>'
                        ), data = {
                            x: 1,
                            y: 2,
                            z: 3
                        };
                
                    expect(tpl.apply(data)).toBe('111'); 
                });
            });

            it("should set the xindex variable correctly when looping over nested objects", function() {
                var result = new Ext.XTemplate(
                    '<tpl foreach=".">',
                        '{% if (Ext.isObject(values)) { %}',
                        '<tpl foreach=".">',
                            '{#}',
                        '</tpl>',
                        '{% } %}',
                        '{#}',
                    '</tpl>'
                ).apply({a:1,b:1,c:1,d:{e:1,f:1},g:1});
                expect(result).toBe('1231245');
            });
        }); // foreach

        describe("insane overnesting of for and foreach loops", function () {
            it("should apply the template", function() {
                var id = 0,
                data = (function assignIds(data) {
                    if (data instanceof Object) {
                        data.id = id++;
                        if (data instanceof Array) {
                            Ext.Array.each(data, function(item) {
                                assignIds(item);
                            });
                        } else  {
                            Ext.Object.each(data, function(key, value) {
                                assignIds(value);
                            });
                        }
                    }
                    return data;
                })({
                    a: [{
                        b: [1, 2],
                        c: {d: 3, e: 4}
                    }, {
                        f: {g: 5, h: 6},
                        i: [7, 8]
                    }, [
                        {j: 9, k: 10},
                        [11, 12]
                    ]],
                    l: {
                        m: [{n: 13, o: 14}],
                        p: [[15, 16], [17, 18]]
                    }
                }),
                tpl = new Ext.XTemplate(
                    '<tpl foreach=".">',
                        '[key]{$}',
                        '{% if (Ext.isObject(values)) { %}',
                            '<tpl foreach=".">',
                                '[key]{$}',
                                '{% if (Ext.isObject(values)) { %}',
                                    '<tpl foreach=".">',
                                        '[key]{$}',
                                        '{% if (Ext.isObject(values)) { %}',
                                            '<tpl foreach=".">',
                                                '[key]{$}[value]{.}[parent]{parent.id}[index]{#}',
                                            '</tpl>',
                                        '{% } %}',
                                        '{% else if (Ext.isArray(values)) { %}',
                                            '<tpl for=".">',
                                                '[value]{.}[parent]{parent.id}[index]{#}',
                                            '</tpl>',
                                        '{% } %}',
                                        '[parent]{parent.id}[index]{#}',
                                    '</tpl>',
                                '{% } %}',
                                '{% else if (Ext.isArray(values)) { %}',
                                    '<tpl for=".">',
                                        '{% if (Ext.isObject(values)) { %}',
                                            '<tpl foreach=".">',
                                                '[key]{$}[value]{.}[parent]{parent.id}[index]{#}',
                                            '</tpl>',
                                        '{% } %}',
                                        '{% else if (Ext.isArray(values)) { %}',
                                            '<tpl for=".">',
                                                '[value]{.}[parent]{parent.id}[index]{#}',
                                            '</tpl>',
                                        '{% } %}',
                                        '[parent]{parent.id}[index]{#}',
                                    '</tpl>',
                                '{% } %}',
                                '[parent]{parent.id}[index]{#}',
                            '</tpl>',
                        '{% } %}',
                        '{% else if (Ext.isArray(values)) { %}',
                            '<tpl for=".">',
                                '{% if (Ext.isObject(values)) { %}',
                                    '<tpl foreach=".">',
                                        '[key]{$}',
                                        '{% if (Ext.isObject(values)) { %}',
                                            '<tpl foreach=".">',
                                                '[key]{$}[value]{.}[parent]{parent.id}[index]{#}',
                                            '</tpl>',
                                        '{% } %}',
                                        '{% else if (Ext.isArray(values)) { %}',
                                            '<tpl for=".">',
                                                '[value]{.}[parent]{parent.id}[index]{#}',
                                            '</tpl>',
                                        '{% } %}',
                                        '[parent]{parent.id}[index]{#}',
                                    '</tpl>',
                                '{% } %}',
                                '{% else if (Ext.isArray(values)) { %}',
                                    '<tpl for=".">',
                                        '{% if (Ext.isObject(values)) { %}',
                                            '<tpl foreach=".">',
                                                '[key]{$}[value]{.}[parent]{parent.id}[index]{#}',
                                            '</tpl>',
                                        '{% } %}',
                                        '{% else if (Ext.isArray(values)) { %}',
                                            '<tpl for=".">',
                                                '[value]{.}[parent]{parent.id}[index]{#}',
                                            '</tpl>',
                                        '{% } %}',
                                        '[parent]{parent.id}[index]{#}',
                                    '</tpl>',
                                '{% } %}',
                                '[parent]{parent.id}[index]{#}',
                            '</tpl>',
                        '{% } %}',
                        '[parent]{parent.id}[index]{#}',
                    '</tpl>'
                );

                // Although not required by the ecmascript spec, all modern browsers currently
                // loop object properties in the order they/ were defined, which is why the
                // following expectation passes. If this ever changes in the future, we may
                // have to revisit this spec.
                expect(tpl.apply(data)).toBe([
                    '[key]a[key]b[value]1[parent]3[index]1[value]2[parent]3[index]2',
                    '[parent]2[index]1[key]c[key]d[value]3[parent]4[index]1[key]e[value]4',
                    '[parent]4[index]2[key]id[value]4[parent]4[index]3[parent]2[index]2',
                    '[key]id[parent]2[index]3[parent]1[index]1[key]f[key]g[value]5[parent]6',
                    '[index]1[key]h[value]6[parent]6[index]2[key]id[value]6[parent]6[index]3',
                    '[parent]5[index]1[key]i[value]7[parent]7[index]1[value]8[parent]7',
                    '[index]2[parent]5[index]2[key]id[parent]5[index]3[parent]1[index]2',
                    '[key]j[value]9[parent]9[index]1[key]k[value]10[parent]9[index]2',
                    '[key]id[value]9[parent]9[index]3[parent]8[index]1[value]11[parent]10',
                    '[index]1[value]12[parent]10[index]2[parent]8[index]2[parent]1[index]3',
                    '[parent]0[index]1[key]l[key]m[key]n[value]13[parent]13[index]1[key]o',
                    '[value]14[parent]13[index]2[key]id[value]13[parent]13[index]3[parent]12',
                    '[index]1[parent]11[index]1[key]p[value]15[parent]15[index]1[value]16',
                    '[parent]15[index]2[parent]14[index]1[value]17[parent]16[index]1',
                    '[value]18[parent]16[index]2[parent]14[index]2[parent]11[index]2[key]id',
                    '[parent]11[index]3[parent]0[index]2[key]id[parent]0[index]3'
                ].join(''));
            });
        });

        describe("exec", function() {
            it("should considerer that anything between {[ ... ]} is code to be executed in the scope of the template", function() {
                tpl = new Ext.XTemplate(
                    '<p>Name: {name}</p>',
                    '<p>Company: {[values.company.toUpperCase() + ", " + values.title]}</p>',
                    '<p>Kids: ',
                    '<tpl for="kids">',
                       '<div class="{[xindex % 2 === 0 ? "even" : "odd"]}">',
                        '{[fm.ellipsis(values.name, 5)]}/{[xcount]}',
                        '</div>',
                    '</tpl></p>'
                );
                var s = tpl.apply(data);
                expect(s).toEqual('<p>Name: Nicolas Ferrero</p><p>Company: SENCHA, Developer</p><p>Kids: <div class="odd">Jo.../3</div><div class="even">Nina/3</div><div class="odd">So.../3</div></p>');
            });
        });

        it('should handle <tpl exec=""> like <tpl>', function() {
            tpl = new Ext.XTemplate(
                '<p>Kids: ',
                '<tpl exec="++this.foo">',
                '<p>{name}</p>',
                '</tpl></p>',
                {
                    foo: 1
                }
            );
            var s = tpl.apply(data.kids);
            expect(tpl.foo).toEqual(2);
            expect(s).toEqual('<p>Kids: <p></p></p>');
        });

        it('should handle nested tags', function() {
            tpl = new Ext.XTemplate(
                '{{id}-bar}'
            );
            var s = tpl.apply({
                id: 'foo'
            });

            expect(s).toEqual('{foo-bar}');
        });

        describe("execute code without producing any output with exec operator", function() {
            describe("simple exec operator", function() {
                beforeEach(function() {
                    tpl = new Ext.XTemplate(
                        '<tpl for="kids">',
                            '<tpl exec="++this.calls; return 1">',
                                '<p>{name}</p>',
                            '</tpl>',
                        '</tpl>',
                        {
                            calls: 0
                        });
                });

                it("should execute the code", function() {
                    tpl.apply(data);
                    expect(tpl.calls).toEqual(3);
                });

                it("should not interfere with output even if exec return a value", function() {
                    expect(tpl.apply(data)).toEqual('<p>Joshua</p><p>Nina</p><p>Solomon</p>');
                });
            });

            describe("for and exec declared in the same tpl tag", function() {
                beforeEach(function() {
                    tpl = new Ext.XTemplate(
                        '<tpl for="kids" exec="this.spy(values, xindex, parent); return 1">',
                            '<p>{[this.spy.calls.length]}. {name}</p>',
                        '</tpl>',
                        {
                            spy : jasmine.createSpy("tplMemberSpy")
                        });

                });

                it("should execute code for each item in the array", function() {
                    tpl.apply(data);
                    expect(tpl.spy.calls.length).toEqual(3);
                });


                it("should be run for each item in the array with index of the loop you are in, values of the current scope, and scope of ancestor template", function() {
                    tpl.apply(data);
                    expect(tpl.spy.calls[0].args).toEqual([data.kids[0], 1, data]);
                    expect(tpl.spy.calls[1].args).toEqual([data.kids[1], 2, data]);
                    expect(tpl.spy.calls[2].args).toEqual([data.kids[2], 3, data]);
                });

                it("should not interfere with output even if exec return a value", function() {
                    expect(tpl.apply(data)).toEqual('<p>0. Joshua</p><p>1. Nina</p><p>2. Solomon</p>');
                });
            });

            describe("if and exec declared in the same tpl tag", function() {
                beforeEach(function() {
                    tpl = new Ext.XTemplate(
                        '<tpl for="kids">',
                            '<tpl if="name == \'Joshua\'" exec="this.inc++; return 1">',
                                '<p>{[this.inc]} - {name}</p>',
                            '</tpl>',
                        '</tpl>',
                        {
                            inc : 0
                        });

                });

                it("should be run only if the if operator conditional checks is true", function() {
                    tpl.apply(data);
                    expect(tpl.inc).toEqual(1);
                });

                it("should not interfere with output", function() {
                    expect(tpl.apply(data)).toEqual('<p>1 - Joshua</p>');
                });
            });
        });
    });

    describe("template member functions", function() {
        var spy;
        beforeEach(function() {
            spy = jasmine.createSpy("membersArguments").andCallFake(function(value, suffix, limit) {
                return Ext.String.ellipsis(value + ' ' + suffix, 13);
            });
            tpl = new Ext.XTemplate(
                '<p>{[this.addMr(values.name)]}</p>',
                '<p>Company: {company:this.spy("Incorporated", 10)}</p>',
                '<p>Title: {title:this.addJs()}</p>',
                '<p>Kids: ',
                '<tpl for="kids">',
                    '<tpl if="this.isGirl(name)">',
                        '<p>Girl: {name} - {age}</p>',
                    '<tpl else>',
                        '<p>Boy: {name} - {age}</p>',
                    '</tpl>',
                    '<tpl if="this.isBaby(age)">',
                        '<p>{name} is a baby!</p>',
                    '</tpl>',
                '</tpl></p>',
                {
                    addMr: function(name) {
                        return "Mr. " + name;
                    },
                    addJs: function(title) {
                        return "Js " + title;
                    },
                    isGirl: function(name) {
                        return name == 'Nina';
                    },
                    isBaby: function(age) {
                        return age < 1;
                    },
                    spy: spy
                }
            );
        });

        it("should call members functions using various methods", function() {
            var s = tpl.apply(data);
            expect(s).toEqual("<p>Mr. Nicolas Ferrero</p><p>Company: Sencha Inc...</p><p>Title: Js Developer</p><p>Kids: <p>Boy: Joshua - 3</p><p>Girl: Nina - 2</p><p>Boy: Solomon - 0</p><p>Solomon is a baby!</p></p>");
        });

        it("should call members format functions with passed arguments", function() {
            tpl.apply(data);
            expect(spy).toHaveBeenCalledWith(data.company, "Incorporated", 10);
        });
    });

    describe("basic math support", function() {
        it("should be able to apply basic math operators + -  * / on numeric data values", function() {
            tpl = new Ext.XTemplate(
                '<tpl for="kids">',
                '<p>{age + 5} {age - 7} {age * 3} {age / 2}</p>',
                '<p>{age + (5*2)}</p>',
                '</tpl>'
            );
            expect(tpl.apply(data)).toEqual("<p>8 -4 9 1.5</p><p>13</p><p>7 -5 6 1</p><p>12</p><p>5 -7 0 0</p><p>10</p>");
        });
    });
    
    describe("special characters", function(){
        it("should handle newlines", function(){
            tpl = new Ext.XTemplate('<div>\n</div>');
            expect(tpl.apply()).toBe('<div>\n</div>');
        });
        
        it("should handle empty braces", function(){
            var s = 'cfg = cfg || {};';
            tpl = new Ext.XTemplate(s);
            expect(tpl.apply()).toBe(s);    
        });

        it("should handle curly braces literally if there is no tag match", function() {
            expect(new Ext.XTemplate(
                '{ foo} foobar {bar } barfoo { foo bar } { foo {bar}}{\nfoo}{foo\n} {foo\nbar}{{bar}}',
                ''
            ).apply({
                bar: 'baz'
            })).toBe('{ foo} foobar {bar } barfoo { foo bar } { foo baz}{\nfoo}{foo\n} {foo\nbar}{baz}');
        });
    });

    describe("Undefined and non-string properties", function(){
        it("should ignore undefined", function () {
            tpl = new Ext.XTemplate('-{foo}-');
            expect(tpl.apply({})).toBe('--');
        });
        it("should ignore null", function () {
            tpl = new Ext.XTemplate('-{foo}-');
            expect(tpl.apply({foo:null})).toBe('--');
        });
        it("should ignore an empty string", function(){
            tpl = new Ext.XTemplate('-{foo}-');
            expect(tpl.apply({foo:''})).toBe('--');
        });
        it("should stringify false", function(){
            tpl = new Ext.XTemplate('-{foo}-');
            expect(tpl.apply({foo:false})).toBe('-false-');
        });
        it("should stringify zero", function(){
            tpl = new Ext.XTemplate('-{foo}-');
            expect(tpl.apply({foo:0})).toBe('-0-');
        });
        it("should evaluate undefined as false", function(){
            tpl = new Ext.XTemplate('<tpl if="foo">foo<tpl else>not foo</tpl>');
            expect(tpl.apply({})).toBe('not foo');
        });
        it("should evaluate null as false", function(){
            tpl = new Ext.XTemplate('<tpl if="foo">foo<tpl else>not foo</tpl>');
            expect(tpl.apply({foo:null})).toBe('not foo');
        });
        it("should evaluate zero as false", function(){
            tpl = new Ext.XTemplate('<tpl if="foo">foo<tpl else>not foo</tpl>');
            expect(tpl.apply({foo:0})).toBe('not foo');
        });
    });

    describe("formats", function() {
        var appliedObject;

        beforeEach(function() {
            appliedObject = {a: "123", b: "456789"};
        });

        describe("enabled", function() {
            beforeEach(function() {
                tpl = new Ext.XTemplate(
                    '{a:ellipsis(2)}'
                );
            });

            it("should call ellipsis", function() {
                expect(tpl.apply(appliedObject)).toEqual('...');
            });

        });

        describe("disabled", function() {
            beforeEach(function() {
                tpl = new Ext.XTemplate(
                    '{a:ellipsis(2)}',
                    {disableFormats: true}
                );
            });

            it("should not call Ext.String.ellipsis", function() {
                expect(tpl.apply(appliedObject)).toEqual('123');
            });
        });

        describe('method', function () {
            it('should call a basic method', function () {
                tpl = new Ext.XTemplate(
                    'Linkify: {text:this.linkify}',
                    {
                        /**
                         * Simply wraps a link tag around each detected url
                         */
                        linkify: function(value) {
                            return value.replace(/(http:\/\/[^\s]*)/g, "<a target=\"_blank\" href=\"$1\">$1</a>");
                        }
                    }
                );
                var s = tpl.apply({ text: 'This page http://foo.bar.com/foobar.html is cool' });
                expect(s).toEqual('Linkify: This page <a target="_blank" href="http://foo.bar.com/foobar.html">http://foo.bar.com/foobar.html</a> is cool');
            });
        });
    });

    describe("Ext.XTemplate.from", function() {
        var elWithHtml, elWithValue;

        beforeEach(function() {
            elWithHtml =  Ext.getBody().createChild({tag: "div", html:"FOO {0}."});
            elWithValue =  Ext.getBody().createChild({tag: "input"});
            elWithValue.dom.value = "BAR {0}.";
        });

        afterEach(function() {
            elWithHtml.remove();
            elWithValue.remove();
        });

        it("should create a template with dom element innerHTML", function() {
            tpl = Ext.XTemplate.from(elWithHtml);

            expect(tpl.apply(['BAR'])).toEqual('FOO BAR.');
        });

        it("should create a template with dom element value", function() {
            tpl = Ext.XTemplate.from(elWithValue);

            expect(tpl.apply(['FOO'])).toEqual('BAR FOO.');
        });
    });

    describe('strict mode', function () {
        it('should throw when substitution token is invalid', function () {
            var tpl = new Ext.XTemplate('{foo.bar.baz}', {
                strict: true
            });

            expect(function () {
                tpl.apply({});
            }).toThrow();
        });

        it('should throw when for expression is invalid', function () {
            var tpl = new Ext.XTemplate('<tpl for="foo.bar.baz">{.}</tpl>', {
                strict: true
            });

            expect(function () {
                tpl.apply({});
            }).toThrow();
        });

        it('should throw when if expression is invalid', function () {
            var tpl = new Ext.XTemplate('<tpl if="foo.bar.baz">{.}</tpl>', {
                strict: true
            });

            expect(function () {
                tpl.apply({});
            }).toThrow();
        });
    });
});
