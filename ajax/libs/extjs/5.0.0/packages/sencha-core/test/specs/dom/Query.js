describe("Ext.dom.Query", function(){

    var body = Ext.getBody().dom,
        useQuerySelectorAll = false,
        defs = [
            '<div id="a:b" class="myclass">abc</div>',

            // test for conflict with pseudo class
            '<div id="c:last-child" class="myotherclass and-another-class">def</div>',

            // another conflict test
            '<div id="abc:" specialAttr="jkl\\\\tasdf">ghi</div>',

            '<div id="nn" class="cls:hover">jkl\\tasdf</div>',
            '<div id="12345">mno:pqr</div>',
            '<div id="--abc" customAttr="12345678">pqr</div>',
            '<div id="\\nn" customAttr="myval:ue\t">stu</div>',
            '<div id="n\\nn" customAttr="my\\tvalue">vwx</div>',
            '<div id="oddClass" class="#odd-class-name"></div>',
            '<div id="\nn">yz</div>',
            ('<div id=":id">' +
                '<span id=":only-child-span">some more text</span>' +
                '<div id="n6e">asdf</div>' +
                '<div id="n6g">asdf</div>' +
            '</div>'),
            ('<span id="myspan" class="myclass isSpan">' +
                '<span id="AAA" class="beginning">some</span>' +
                '<span id="BBB" class="ending">text</span>' +
            '</span>')
        ],
        content = defs.join(''),
        elem, targetSpan;

    function doQuery(query, element) {
        return useQuerySelectorAll
            ? elem.querySelectorAll(query)
            : Ext.dom.Query.jsSelect(query, element);
    }

    beforeEach(function(){
        elem = document.createElement('div');
        elem.innerHTML = content;
        elem.id = 'elemNode';
        body.appendChild(elem);
        targetSpan = doQuery("#myspan", elem)[0];
    });

    afterEach(function(){
        if(elem) {
            body.removeChild(elem);
            elem = targetSpan = null;
        }
    });

    describe("jsSelect", function(){

        it("should throw error for an invalid query", function(){
            try {
                var found = Ext.dom.Query("$#@$%", elem);
                expect(false).toBe(true);
            } catch (ex) {

            }
        });

        describe("Standard CSS Selectors", function(){

            it("should locate elements by id", function(){
                var found = doQuery("#nn", elem),
                    len = found.length;

                expect(len).toBe(1);
                expect(found[0]).toBe(elem.childNodes[3]);

                found = doQuery("span > span#BBB", elem);
                len = found.length;

                expect(len).toBe(1);
                expect(found[0]).toBe(targetSpan.childNodes[1]);

                found = doQuery("span + span#BBB", elem);
                len = found.length;

                expect(len).toBe(1);
                expect(found[0]).toBe(targetSpan.childNodes[1]);

                if(useQuerySelectorAll) {
                    found = doQuery("#\\31 2345 + div", elem);
                    len = found.length;

                    expect(len).toBe(1);
                    expect(found[0]).toBe(elem.childNodes[5]);
                } else {
                    // technically, our regexes will match this
                    // but shouldn't, as the first character isn't
                    // supposed to be a number
                    found = doQuery("#12345 + div", elem);
                    len = found.length;

                    expect(len).toBe(1);
                    expect(found[0]).toBe(elem.childNodes[5]);
                }

            });

            it("should locate elements by class", function(){
                var found = doQuery(".myclass", elem),
                    len = found.length;

                expect(len).toBe(2);
                expect(found[0]).toBe(elem.childNodes[0]);
                expect(found[1]).toBe(targetSpan);

                found = doQuery(" .isSpan", elem);
                len = found.length;
                expect(len).toBe(1);
                expect(found[0]).toBe(targetSpan);

                found = doQuery(".isSpan .ending", elem);
                len = found.length;
                expect(len).toBe(1);
                expect(found[0]).toBe(targetSpan.childNodes[1]);

                found = doQuery(".isSpan span.ending", elem);
                len = found.length;
                expect(len).toBe(1);
                expect(found[0]).toBe(targetSpan.childNodes[1]);
            });

            it("should find elements by pseudo class", function(){
                var found = doQuery(":last-child", elem),
                    len = found.length;

                expect(len).toBe(3);
                expect(found[1]).toBe(targetSpan);
                expect(found[2]).toBe(targetSpan.childNodes[1]);

                found = doQuery(":first-child", elem);
                len = found.length;
                expect(len).toBe(3);
                expect(found[0]).toBe(elem.childNodes[0]);

                found = doQuery("#myspan :first-child", elem);
                len = found.length;
                expect(len).toBe(1);
                expect(found[0]).toBe(targetSpan.childNodes[0]);

                found = doQuery("span:last-child", elem);
                len = found.length;
                expect(len).toBe(2);
                expect(found[0]).toBe(targetSpan);

                found = doQuery("span :last-child", elem);
                len = found.length;
                expect(len).toBe(1);
                expect(found[0]).toBe(targetSpan.childNodes[1]);

                // :contains unsupported by some implementations of
                // querySelectorAll
                if (!useQuerySelectorAll) {
                    found = doQuery('div:contains(abc)', elem);
                    len = found.length;
                    expect(len).toBe(1);
                    expect(found[0]).toBe(elem.childNodes[0]);
                }

            });

            it("should find elements by attribute value", function(){
                var found = doQuery('div[customAttr="12345678"]', elem),
                    len = found.length;

                expect(len).toBe(1);
                expect(found[0]).toBe(elem.childNodes[5]);

                found = doQuery('div[customAttr]', elem),
                    len = found.length;

                expect(len).toBe(3);
                expect(found[0]).toBe(elem.childNodes[5]);
                expect(found[1]).toBe(elem.childNodes[6]);
                expect(found[2]).toBe(elem.childNodes[7]);
            });
        });

        describe("CSS Escape Sequences", function(){

            it("should handle escapes sequences for IDs", function(){
                var found = doQuery("#\\00006en", elem),
                    len = found.length;

                expect(len).toBe(1);
                expect(found[0]).toBe(elem.childNodes[3]);

                found = doQuery("#\\006e\\00036g", elem);
                len = found.length;

                expect(len).toBe(1);
                expect(found[0]).toBe(elem.childNodes[10].childNodes[2]);

                found = doQuery("#\\006e\\00036 e", elem);
                len = found.length;

                expect(len).toBe(1);
                expect(found[0]).toBe(elem.childNodes[10].childNodes[1]);

                found = doQuery("#\\6e \\6e ", elem);
                len = found.length;

                expect(len).toBe(1);
                expect(found[0]).toBe(elem.childNodes[3]);

                found = doQuery("#\\6e\\6e ", elem);
                len = found.length;

                expect(len).toBe(1);
                expect(found[0]).toBe(elem.childNodes[3]);

                // two spaces
                found = doQuery("#\\6e  \\6e ", elem);
                len = found.length;

                expect(len).toBe(0);

                found = doQuery("#\\6e \\6e", elem);
                len = found.length;

                expect(len).toBe(1);
                expect(found[0]).toBe(elem.childNodes[3]);

                found = doQuery("#\\--abc ", elem);
                len = found.length;

                expect(len).toBe(1);
                expect(found[0]).toBe(elem.childNodes[5]);


                found = doQuery("#\\\\nn", elem);
                len = found.length;
                expect(len).toBe(1);
                expect(found[0]).toBe(elem.childNodes[6]);

                found = doQuery("#n\\\\nn", elem);
                len = found.length;
                expect(len).toBe(1);
                expect(found[0]).toBe(elem.childNodes[7]);

                found = doQuery("#a\\00003ab", elem);
                len = found.length;
                expect(len).toBe(1);
                expect(found[0]).toBe(elem.childNodes[0]);

                found = doQuery("#a\\:b", elem);
                len = found.length;
                expect(len).toBe(1);
                expect(found[0]).toBe(elem.childNodes[0]);

                found = doQuery("#a\\3a b", elem);
                len = found.length;
                expect(len).toBe(1);
                expect(found[0]).toBe(elem.childNodes[0]);

                found = doQuery("#c\\:last-child", elem);
                len = found.length;
                expect(len).toBe(1);
                expect(found[0]).toBe(elem.childNodes[1]);

                found = doQuery("#\\nn", elem);
                len = found.length;
                expect(len).toBe(1);
                expect(found[0]).toEqual(elem.childNodes[3]);

                found = doQuery("div#a\\:b + div", elem);
                len = found.length;

                expect(len).toBe(1);
                expect(found[0]).toBe(elem.childNodes[1]);

                found = doQuery("div#abc\\3a  + div", elem);
                len = found.length;

                expect(len).toBe(1);
                expect(found[0]).toBe(elem.childNodes[3]);

                // test another standard expression to make sure we can switch
                // back to non-escaped mode cleanly
                found = doQuery("#nn", elem);
                len = found.length;
                expect(len).toBe(1);
                expect(found[0]).toEqual(elem.childNodes[3]);

                found = doQuery("div + div#\\--abc", elem);
                len = found.length;

                expect(len).toBe(1);
                expect(found[0]).toBe(elem.childNodes[5]);
            });
            
            it("should handle escape sequences for class names", function(){
                var found = doQuery("div.\\#odd-class-name", elem),
                    len = found.length;

                expect(len).toBe(1);
                expect(found[0]).toBe(elem.childNodes[8]);

                found = doQuery(".\\#odd-class-name", elem);
                len = found.length;

                expect(len).toBe(1);
                expect(found[0]).toBe(elem.childNodes[8]);

                found = doQuery(".cls\\3a hover", elem);
                len = found.length;

                expect(len).toBe(1);
                expect(found[0]).toBe(elem.childNodes[3]);
            });

            it("should handle escape sequences for psuedos", function(){
                var found = doQuery('#\\:id :first-child', elem),
                    len = found.length;

                expect(len).toBe(1);
                expect(found[0]).toBe(elem.childNodes[10].childNodes[0]);

                // :contains unsupported by some implementations of
                // querySelectorAll
                if (!useQuerySelectorAll) {
                    found = doQuery('div:contains(mno\\:pqr)', elem);
                    len = found.length;

                    expect(len).toBe(1);
                    expect(found[0]).toBe(elem.childNodes[4]);

                    found = doQuery('div:contains(jkl\\\\\\tasdf)', elem);
                    len = found.length;

                    expect(len).toBe(1);
                    expect(found[0]).toBe(elem.childNodes[3]);
                }
            });

            it("should handle escape sequences for attributes", function(){
                var found, len;

                if (Ext.isFF3_6) {
                    // ff 3.6 doesn allow \t in attribute values
                    found = doQuery('div[customAttr="myval\\3a ue"]', elem);
                    len = found.length;

                    expect(len).toBe(1);
                    expect(found[0]).toBe(elem.childNodes[6]);

                    found = doQuery('div[customAttr="myval:ue"]', elem);
                    len = found.length;

                    expect(len).toBe(1);
                    expect(found[0]).toBe(elem.childNodes[6]);

                    found = doQuery('div[customAttr="myval\\:ue"]', elem);
                    len = found.length;

                    expect(len).toBe(1);
                    expect(found[0]).toBe(elem.childNodes[6]);

                } else {

                    found = doQuery('div[customAttr="myval\\3a ue\t"]', elem);
                    len = found.length;

                    expect(len).toBe(1);
                    expect(found[0]).toBe(elem.childNodes[6]);

                    found = doQuery('div[customAttr="myval:ue\t"]', elem);
                    len = found.length;

                    expect(len).toBe(1);
                    expect(found[0]).toBe(elem.childNodes[6]);

                    found = doQuery('div[customAttr="myval\\:ue\t"]', elem);
                    len = found.length;

                    expect(len).toBe(1);
                    expect(found[0]).toBe(elem.childNodes[6]);
                }


                found = doQuery('div[customAttr="my\\\\tvalue"]', elem);
                len = found.length;

                expect(len).toBe(1);
                expect(found[0]).toBe(elem.childNodes[7]);

                found = doQuery('div[specialAttr="jkl\\\\\\\\tasdf"]', elem);
                len = found.length;

                expect(len).toBe(1);
                expect(found[0]).toBe(elem.childNodes[2]);
            });
        });

        describe("XML", function() {
            describe("selecting elements with namespace prefixes", function() {
                var doc;

                beforeEach(function() {
                    var xml = [
                        '<a>',
                            '<x:b xmlns:x="xns">x1</x:b>',
                            '<y:b xmlns:y="yns">y1</y:b>',
                            '<x:b xmlns:x="xns">x2</x:b>',
                            '<y:b xmlns:y="yns">y2</y:b>',
                        '</a>'
                    ].join('');

                    if (typeof DOMParser != 'undefined') {
                        doc = (new DOMParser()).parseFromString(xml, "application/xml");
                    } else {
                        // IE doesn't have DOMParser, but fortunately, there is an ActiveX for XML
                        doc = new ActiveXObject("Microsoft.XMLDOM");
                        doc.async = false;
                        doc.loadXML(xml);
                    }
                });

                it("should select elements with namespace prefixes using the '|' namespace selector", function() {
                    var xResult = doQuery('x|b', doc),
                        yResult = doQuery('y|b', doc);

                    expect(xResult.length).toBe(2);
                    expect(yResult.length).toBe(2);
                    expect(xResult[0].firstChild.nodeValue).toBe('x1');
                    expect(xResult[1].firstChild.nodeValue).toBe('x2');
                    expect(yResult[0].firstChild.nodeValue).toBe('y1');
                    expect(yResult[1].firstChild.nodeValue).toBe('y2');
                });

                it("should select elements with namespace prefixes using the undocumented escaped colon method", function() {
                    var xResult = doQuery('x\\:b', doc),
                        yResult = doQuery('y\\:b', doc);

                    expect(xResult.length).toBe(2);
                    expect(yResult.length).toBe(2);
                    expect(xResult[0].firstChild.nodeValue).toBe('x1');
                    expect(xResult[1].firstChild.nodeValue).toBe('x2');
                    expect(yResult[0].firstChild.nodeValue).toBe('y1');
                    expect(yResult[1].firstChild.nodeValue).toBe('y2');
                });
            });
            describe("selecting attributes with non-word characters", function() {
                var doc;

                beforeEach(function() {
                    var xml = [
                        '<a>',
                            '<b att.name-part="x1">x1</b>',
                        '</a>'
                    ].join('');

                    if (typeof DOMParser != 'undefined') {
                        doc = (new DOMParser()).parseFromString(xml, "application/xml");
                    } else {
                        // IE doesn't have DOMParser, but fortunately, there is an ActiveX for XML
                        doc = new ActiveXObject("Microsoft.XMLDOM");
                        doc.async = false;
                        doc.loadXML(xml);
                    }
                });

                it("should select attributes non-word characters '.' and '-'", function() {
                    var result = doQuery('b @att.name-part', doc);

                    expect(result.length).toBe(1);
                    expect(result[0].firstChild.nodeValue).toBe('x1');
                });
            });
        });
        
    });

});
