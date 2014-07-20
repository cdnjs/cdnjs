xdescribe("Ext.core.DomHelper", function(){
    // TODO this spec is just unmaintanable, because of subtleGradient magic...
    // no dynamic spec generation !
    var TestHelper = {
        dom:{
            cleanBody: function(){
                document.getElementsByTagName('body')[0].innerHTML = '';
            },

            parentNodeName: {
                '*'      : 'div',
                frame    : 'frameset',
                col      : 'colgroup',
                colgroup : 'table',
                option   : 'select',
                optgroup : 'select',
                tbody    : 'table',
                thead    : 'table',
                tfoot    : 'table',
                tr       : 'tbody',
                td       : 'tr'
            },

            voidNode: {
                area   : true,
                br     : true,
                col    : true,
                frame  : true,
                hr     : true,
                img    : true,
                input  : true,
                link   : true,
                meta   : true,
                param  : true,
                range  : true,
                spacer : true,
                wbr    : true
            }

        },
        String:{
            html: function(tagName, className){
                var HTML = '<'+tagName+' class='+className+'>';
                if (!TestHelper.dom.voidNode[tagName]) HTML += '</'+tagName+'>';
                // console.log(HTML);
                return HTML;
            }
        }
    };    
    
    xdescribe('useDom = false', function(){
        beforeEach(function(){
            Ext.core.DomHelper.useDom = false;
        });
        //Ext_core_DomHelper_Tests.apply(this, arguments);
    });
    
    xdescribe('useDom = true', function(){
        beforeEach(function(){
            Ext.core.DomHelper.useDom = false;
        });
        afterEach(function(){
            Ext.core.DomHelper.useDom = true;
        });
        //Ext_core_DomHelper_Tests.apply(this, arguments);
    });
   
   
function Ext_core_DomHelper_Tests() {
    var dh = Ext.core.DomHelper,
        el, els;
    beforeEach(function(){
        el = Ext.getBody().createChild({
            id      : 'DomHelperHelper',
            children: [
                {cls: 'child', id: 'firstChild'},
                {cls: 'child'},
                {cls: 'child'},
                {cls: 'child'},
                {cls: 'child'},
                {cls: 'child2'},
                {cls: 'child2'},
                {cls: 'child'},
                {cls: 'child'},
                {cls: 'child'}
            ]
        });
        
        els = Ext.select('#DomHelperHelper > div');
    });
    
    afterEach(TestHelper.dom.cleanBody);
    
    describe("markup", function() {
        it("should return the markup for a string", function() {
            var markup = '<div class="class">my div!</div>';
            
            expect(dh.markup(markup)).toEqual(markup);
        });
        
        it("should return the markup for an object", function() {
            var markup = '<div class="class"><span style="padding:10px;">test</span><br/></div>',
                html   = {
                    cls: 'class',
                    children: [
                        {
                            tag : 'span',
                            html: 'test',
                            style: {
                                padding: '10px'
                            }
                        },
                        {tag: 'br'}
                    ]
                };
            
            expect(dh.markup(html)).toEqual(markup);
        });
    });
    
    describe("applyStyles", function() {
        it("should apply styles from a string", function() {
            dh.applyStyles(el, 'padding:10px;');
            
            expect(el.dom.style.padding).toMatch(/^(?:10px|10px 10px 10px 10px)$/);
        });
        
        it("should apply styles from an object", function() {
            dh.applyStyles(el, {
                padding: '10px'
            });
            
            expect(el.dom.style.padding).toMatch(/^(?:10px|10px 10px 10px 10px)$/);
        });
        
        // TODO: Implement using raw numbers in DomHelper.applyStyles
        xit("should apply styles from an object using numbers", function() {
            dh.applyStyles(el, {
                padding: 10
            });
            
            expect(el.dom.style.padding).toMatch(/^(?:10px|10px 10px 10px 10px)$/);
        });
        
        it("should apply styles from a function", function() {
            dh.applyStyles(el, function() {
                return {
                    padding: '10px'
                };
            });
            
            expect(el.dom.style.padding).toMatch(/^(?:10px|10px 10px 10px 10px)$/);
        });
    });
    
    describe("generateStyles", function() {
        it("should un-camel case names", function() {
            expect(dh.generateStyles({
                backgroundColor: 'red'
            })).toEqual('background-color:red;');
        });
        
        it("should concat multiple values", function() {
            expect(dh.generateStyles({
                backgroundColor: 'red',
                color: 'green',
                'font-size': '12px'
            })).toEqual('background-color:red;color:green;font-size:12px;');
        });
        
        it("should use a passed buffer", function() {
            var buffer = [];
            dh.generateStyles({
                color: 'red'
            }, buffer);
            expect(buffer.join('')).toEqual('color:red;');
        });
        
        it("should not html encode by default", function() {
            expect(dh.generateStyles({
                fontFamily: '"Arial"'
            })).toEqual('font-family:"Arial";');
        });
        
        it("should encode html entity values", function() {
            expect(dh.generateStyles({
                fontFamily: '"Arial"'
            }, null, true)).toEqual('font-family:&quot;Arial&quot;;');
        });
    });
    
    describe("insertHtml", function() {
        
        var testEl, HTML = '<div id="newChild"></div>';
        
        describe("basic",function(){
            beforeEach(function(){
                testEl = Ext.getDom(els.first());
                expect(Ext.get('newChild')).toBeNull();
            });
            afterEach(function(){
                var el = document.getElementById('newChild');
                expect(el).toBeDefined();
                testEl.innerHTML = '';
            });

            it("should insert a new element beforeBegin", function() { dh.insertHtml('beforeBegin', testEl, HTML); });
            it("should insert a new element afterBegin", function() { dh.insertHtml('afterBegin', testEl, HTML); });
            it("should insert a new element beforeEnd", function() { dh.insertHtml('beforeEnd', testEl, HTML); });
            it("should insert a new element afterEnd", function() { dh.insertHtml('afterEnd', testEl, HTML); });
            
            describe("textNode", function(){
                var UID=0, text, textNode;
                beforeEach(function(){
                    textNode = document.createTextNode(text = "howdy" + (UID++));
                    testEl.appendChild(textNode);
                    expect(testEl.firstChild).toEqual(textNode);
                    expect(testEl.firstChild.nodeValue).toEqual(text);
                });
                afterEach(function(){
                    expect(testEl.childNodes.length).toEqual(2);
                    testEl.removeChild(textNode);
                    expect(testEl.childNodes.length).toEqual(1);
                    
                    textNode = null;
                    testEl.innerHTML = '';
                    expect(testEl.childNodes.length).toEqual(0);
                });
                
                it("should insert a new element beforeBegin", function() { dh.insertHtml('beforeBegin', textNode, HTML); });
                it("should insert a new element afterBegin", function() { dh.insertHtml('afterBegin', textNode, HTML); });
                it("should insert a new element beforeEnd", function() { dh.insertHtml('beforeEnd', textNode, HTML); });
                it("should insert a new element afterEnd", function() { dh.insertHtml('afterEnd', textNode, HTML); });
            });

        });
        
        describe("details", function(){
            var outside = {afterEnd:true, beforeBegin:true},
                inside = {afterBegin:true, beforeEnd:true},
                everywhere = {afterEnd:true, beforeBegin:true, afterBegin:true, beforeEnd:true};
            
            for (var tagName in TestHelper.dom.voidNode) {
                insertHtml_shouldSupport(outside, tagName, tagName);
            }
            
            insertHtml_shouldSupport(everywhere, 'div', 'div');
            insertHtml_shouldSupport(everywhere, 'a', 'p');
            insertHtml_shouldSupport(everywhere, 'a', 'a');
            
            insertHtml_shouldSupport(inside, 'tr', 'td');
            insertHtml_shouldSupport(outside, 'tr', 'tr');
            
            insertHtml_shouldSupport(inside, 'tbody', 'tr');
            insertHtml_shouldSupport(inside, 'tfoot', 'tr');
            insertHtml_shouldSupport(inside, 'thead', 'tr');
            
            insertHtml_shouldSupport(outside, 'tbody', 'tbody');
            insertHtml_shouldSupport(outside, 'tbody', 'thead');
            insertHtml_shouldSupport(outside, 'tbody', 'tfoot');
            insertHtml_shouldSupport(outside, 'tfoot', 'tbody');
            insertHtml_shouldSupport(outside, 'tfoot', 'thead');
            insertHtml_shouldSupport(outside, 'tfoot', 'tfoot');
            insertHtml_shouldSupport(outside, 'thead', 'tbody');
            insertHtml_shouldSupport(outside, 'thead', 'thead');
            insertHtml_shouldSupport(outside, 'thead', 'tfoot');
            
            
            function insertHtml_shouldSupport(where, tagName, tagNameToInsert){
                if (where.afterBegin) insertHtml_shouldSupport_inside('afterBegin', tagName, tagNameToInsert);
                if (where.beforeEnd) insertHtml_shouldSupport_inside('beforeEnd', tagName, tagNameToInsert);
                if (where.afterEnd) insertHtml_shouldSupport_outside('afterEnd', tagName, tagNameToInsert);
                if (where.beforeBegin) insertHtml_shouldSupport_outside('beforeBegin', tagName, tagNameToInsert);
                
                if (where.afterBegin || where.beforeEnd){
                    it(["should overwrite the HTML",
                        "of a", tagName.toUpperCase(), "Element"].join(' '), function(){
                        
                        var html = TestHelper.String.html(tagNameToInsert, 'overwrite');
                        
                        var target = document.createElement(tagName);
                        expect(target.parentNode).toBeNull();
                        expect(target.childNodes.length).toBe(0);
                        expect(target.firstChild).toBeNull();
                        
                        dh.overwrite(target, html);
                        expect(target.childNodes.length).toBe(1);
                        expect(target.firstChild).toBeDefined();
                        expect(target.firstChild.className).toBe('overwrite');
                    });
                    
                    
                    if (Ext.core.Element.prototype.setHTML) it(["should set the HTML",
                        "of a", tagName.toUpperCase(), "Element"].join(' '), function(){
                        
                        var html = TestHelper.String.html(tagNameToInsert, 'overwrite');
                        
                        var target = document.createElement(tagName);
                        expect(target.parentNode).toBeNull();
                        expect(target.childNodes.length).toBe(0);
                        expect(target.firstChild).toBeNull();
                        
                        Ext.fly(target).setHTML(html);
                        expect(target.childNodes.length).toBe(1);
                        expect(target.firstChild).toBeDefined();
                        expect(target.firstChild.className).toBe('overwrite');
                    });
                }
            }
            
            function insertHtml_shouldSupport_inside(where, tagName, tagNameToInsert){
                it(["should insertHtml", tagNameToInsert.toUpperCase(), where,
                    "of a " + tagName.toUpperCase() + " Element",
                    "when it has no parentNode"].join(' '), function(){
                    
                    var html = TestHelper.String.html(tagNameToInsert, where);
                    
                    var target = document.createElement(tagName);
                    expect(target.parentNode).toBeNull();
                    expect(target.childNodes.length).toBe(0);
                    expect(target.firstChild).toBeNull();
                    
                    dh.insertHtml(where, target, html);
                    expect(target.childNodes.length).toBe(1);
                    expect(target.firstChild).toBeDefined();
                    expect(target.firstChild.className).toBe(where);
                });
            }
            
            function insertHtml_shouldSupport_outside(where, tagName, tagNameToInsert){
                it(["should insertHtml", tagNameToInsert.toUpperCase(), where,
                    "of a " + tagName.toUpperCase() + " Element"].join(' '), function(){
                    
                    var html = TestHelper.String.html(tagNameToInsert, where);
                    
                    var target = document.createElement(tagName);
                    document.createElement(TestHelper.dom.parentNodeName[tagName] || TestHelper.dom.parentNodeName['*']).appendChild(target);
                    var parentNode = target.parentNode;
                    
                    expect(parentNode).toBeDefined();
                    expect(target.childNodes.length).toBe(0);
                    expect(target.firstChild).toBeNull();
                    expect(parentNode.childNodes.length).toBe(1);
                    
                    dh.insertHtml(where, target, html);
                    parentNode.removeChild(target);
                    
                    expect(parentNode.childNodes.length).toBe(1);
                    expect(parentNode.firstChild.tagName.toLowerCase()).toBe(tagNameToInsert);
                    expect(parentNode.firstChild.className).toBe(where);
                });
            }
        });
        
    });
    
    describe("overwrite", function() {
        it("should overwrite the el", function() {
            var node = Ext.getDom(els.first());
            
            expect(node.innerHTML).toEqual('');
            
            dh.overwrite(node, {
                tag : 'span',
                html: 'hello'
            });
            
            expect(node.innerHTML.toLowerCase()).toEqual('<span>hello</span>');
        });
        
        describe("table innerHTML bug", function(){
            it("should set the html of a tr Element, even when it has no parentNode", function(){
                var tr = document.createElement('tr');
                expect(tr.parentNode).toEqual(null);
                expect(tr.childNodes.length).toEqual(0);
                
                dh.overwrite(tr, '<td>cell1');
                expect(tr.childNodes.length).toEqual(1);
                expect(tr.lastChild.innerHTML).toEqual('cell1');
                
                dh.overwrite(tr, '<td>cell2');
                expect(tr.childNodes.length).toEqual(1);
                expect(tr.lastChild.innerHTML).toEqual('cell2');
                
            });
            
            it("should set the html of an Element", function(){
                var html = '<a href="http://mootools.net/">Link</a>';
                var parent = document.createElement('div');
                dh.overwrite(parent, html);
                expect(parent.innerHTML.toLowerCase()).toEqual(html.toLowerCase());
            });
            
            it("should set the html of an Element with multiple arguments", function(){
                var html = ['<p>Paragraph</p>', '<a href="http://mootools.net/">Link</a>'];
                var parent = document.createElement('div');
                dh.overwrite(parent, html);
                
                expect(parent.innerHTML.toLowerCase()).toEqual(html.join('').toLowerCase());
            });
            
            it("should set the html of a select Element", function(){
                var html = '<option>option 1</option><option selected="selected">option 2</option>';
                var select = document.createElement('select');
                dh.overwrite(select, html);
                
                expect(select.childNodes.length).toEqual(2);
                expect(select.options.length).toEqual(2);
                expect(select.selectedIndex).toEqual(1);
            });
            
            it("should set the html of a table Element", function(){
                var html = '<tbody><tr><td>cell 1</td><td>cell 2</td></tr><tr><td class="cell">cell 1</td><td>cell 2</td></tr></tbody>';
                var table = document.createElement('table');
                
                dh.overwrite(table, html);
                
                expect(table.childNodes.length).toEqual(1);
                expect(table.firstChild.firstChild.childNodes.length).toEqual(2);
                expect(table.firstChild.lastChild.firstChild.className).toEqual('cell');
            });
            
            it("should set the html of a tbody Element", function(){
                var html = '<tr><td>cell 1</td><td>cell 2</td></tr><tr><td class="cell">cell 1</td><td>cell 2</td></tr>';
                var tbody = document.createElement('tbody');
                document.createElement('table').appendChild(tbody);
                dh.overwrite(tbody, html);
                
                expect(tbody.childNodes.length).toEqual(2);
                expect(tbody.lastChild.firstChild.className).toEqual('cell');
            });
            
            it("should set the html of a thead Element", function(){
                var html = '<tr><td>cell 1</td><td>cell 2</td></tr><tr><td class="cell">cell 1</td><td>cell 2</td></tr>';
                var thead = document.createElement('thead');
                document.createElement('table').appendChild(thead);
                dh.overwrite(thead, html);
                
                expect(thead.childNodes.length).toEqual(2);
                expect(thead.lastChild.firstChild.className).toEqual('cell');
            });
            
            it("should set the html of a tfoot Element", function(){
                var html = '<tr><td>cell 1</td><td>cell 2</td></tr><tr><td class="cell">cell 1</td><td>cell 2</td></tr>';
                var tfoot = document.createElement('tfoot');
                document.createElement('table').appendChild(tfoot);
                dh.overwrite(tfoot, html);
                
                expect(tfoot.childNodes.length).toEqual(2);
                expect(tfoot.lastChild.firstChild.className).toEqual('cell');
            });
            
            it("should set the html of a tr Element", function(){
                var html = '<td class="cell">cell 1</td><td>cell 2</td>';
                var tr = document.createElement('tr');
                document.createElement('tbody').appendChild(tr);
                document.createElement('table').appendChild(tr.parentNode);
                dh.overwrite(tr, html);
                
                expect(tr.childNodes.length).toEqual(2);
                expect(tr.firstChild.className).toEqual('cell');
            });
            
            it("should set the html of a td Element", function(){
                var html = '<span class="span">Some Span</span><a href="#">Some Link</a>';
                var td = document.createElement('td');
                document.createElement('tr').appendChild(td);
                document.createElement('tbody').appendChild(td.parentNode);
                document.createElement('table').appendChild(td.parentNode.parentNode);
                dh.overwrite(td, html);
                
                expect(td.childNodes.length).toEqual(2);
                expect(td.firstChild.className).toEqual('span');
            });
            
        });
    });
}
});

