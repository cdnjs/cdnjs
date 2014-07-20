describe("Ext.data.amf.XmlDecoder", function() {

    var decoder = Ext.create('Ext.data.amf.XmlDecoder');
    var val;

    beforeEach(function() {
        decoder.clear(); // reset encoder
    });

    var toXml = function(str) {
        return Ext.data.amf.XmlDecoder.readXml(str).firstChild;
    };
    var decode = function(str) {
        return decoder.readValue(toXml(str));
    };

    describe("clear", function() {
        it("should reset all the reference tables when called", function() {
            var val = decode("<object><traits><string>a</string></traits><string>hello</string></object>");
            expect(decoder.objectReferences).not.toEqual([]);
            expect(decoder.traitsReferences).not.toEqual([]);
            expect(decoder.stringReferences).not.toEqual([]);
            decoder.clear();
            expect(decoder.objectReferences).toEqual([]);
            expect(decoder.traitsReferences).toEqual([]);
            expect(decoder.stringReferences).toEqual([]);
        });
    });

    describe("AMFX", function() {

        describe("data types", function() {

            describe("null", function() {
                it("should decode null", function() {
                    val =decode("<null />");
                    expect(val).toEqual(null);
                });
            });

            describe("false", function() {
                it("should decode false", function() {
                    val = decode("<false />");
                    expect(val).toEqual(false);
                });
            });

            describe("true", function() {
                it("should decode true", function() {
                    val = decode("<true />");
                    expect(val).toEqual(true);
                });
            });

            describe("integer", function() {
                it("should decode 0", function() {
                    val = decode("<int>0</int>");
                    expect(val).toEqual(0);
                });

                it("should decode 2^29-1 (the largest possible unsigned 29-bit int)", function() {
                    val = decode("<int>536870911</int>");
                    expect(val).toEqual(Math.pow(2, 29) - 1);
                });

            });

            describe("double", function() {
                it("should decode 10.333", function() {
                    val =decode("<double>10.333</double>");
                    expect(val).toEqual(10.333);
                });

                it("should decode 1.7976931348623157e+308 (largest positive number)", function() {
                    val =decode("<double>1.7976931348623157e+308</double>");
                    expect(val).toEqual(Number.MAX_VALUE);
                });

                it("should decode -1.7976931348623157e+308 (largest negative number)", function() {
                    val =decode("<double>-1.7976931348623157e+308</double>");
                    expect(val).toEqual(-Number.MAX_VALUE);
                });

                it("should decode 5e-324 (smallest positive number)", function() {
                    val =decode("<double>5e-324</double>");
                    expect(val).toEqual(Number.MIN_VALUE);
                });

                it("should decode -5e-324 (smallest negative number)", function() {
                    val =decode("<double>-5e-324</double>");
                    expect(val).toEqual(-Number.MIN_VALUE);
                });

                it("should decode subnormal 2.2250738585072014E-308", function() {
                    val =decode("<double>2.2250738585072014e-308</double>");
                    expect(val).toEqual(2.2250738585072014E-308);
                });

                it("should decode NaN", function() {
                    val =decode("<double>NaN</double>");
                    expect(isNaN(val)).toEqual(true);
                });

                it("should decode positive infinity", function() {
                    val =decode("<double>Infinity</double>");
                    expect(val).toEqual(Infinity);
                });

                it("should decode negative infinity", function() {
                    val =decode("<double>-Infinity</double>");
                    expect(val).toEqual(-Infinity);
                });
            });

            describe("string", function() {
                it("should decode an empty string", function() {
                    val =decode("<string />");
                    expect(val).toEqual("");
                });

                // Special thanks to Markus Kuhn's "quickbrown.txt" for the
                // following awesome pangrams.
                // http://www.cl.cam.ac.uk/~mgk25/ucs/examples/quickbrown.txt
                it("should decode Danish", function() {
                    var str = "Quizdeltagerne spiste jordbær med fløde, mens " +
                            "cirkusklovnen Wolther spillede på xylofon";
                    val =decode("<string>Quizdeltagerne spiste jordbær med fløde, mens cirkusklovnen Wolther spillede på xylofon</string>");
                    expect(val).toEqual(str);
                });

                it("should decode Hebrew", function() {
                    var str = "דג סקרן שט בים מאוכזב ולפתע מצא לו חברה איך הקליטה";
                    val =decode("<string>דג סקרן שט בים מאוכזב ולפתע מצא לו חברה איך הקליטה</string>");
                    expect(val).toEqual(str);
                });

            });

            describe("xml document", function() {
                it("should decode an XMLDocument", function() {
                    var xml = '<xml><![CDATA[<root><parent><child id="c1">foo</child><child id="c2"><bar/></child></parent></root>]]></xml>';
                    var data = [
                        // chrome version
                        '<root><parent><child id="c1">foo</child><child id="c2"><bar/></child></parent></root>',
                        // IE version
                        '<root><parent><child id="c1">foo</child><child id="c2"><bar/></child></parent></root>',
                        // IE 9 version
                        '<root><parent><child id="c1">foo</child><child id="c2"><bar /></child></parent></root>',
                        // Opera version
                        '<?xml version="1.0"?><root><parent><child id="c1">foo</child><child id="c2"><bar/></child></parent></root>'
                    ];

                    var encoder=Ext.create('Ext.data.amf.XmlEncoder');
                    val = encoder.convertXmlToString(decode(xml));
                    expect(data).toContain(Ext.String.trim(val)); // note reverseal of expect / contain data to use toContain
                });
            });

            describe("date", function() {
                it("should decode 7/24/2012", function() {
                    val =decode("<date>1343164970869</date>");
                    expect(val).toEqual(new Date(1343164970869));
                });

                it("should decode 7/24/1912 (100 years before previous test's date)", function() {
                    val =decode("<date>-1812595029131</date>");
                    expect(val).toEqual(new Date(-1812595029131));
                });

                it("should decode the UNIX epoch", function() {
                    val =decode("<date>0</date>");
                    expect(val).toEqual(new Date(0));
                });

            });


            describe("array", function() {
                it("should decode an empty array", function() {
                    val =decode('<array length="0"></array>');
                    expect(val).toEqual([]);
                });

                it("should decode an array", function() {
                    val =decode('<array length="3"><string>a</string><string>b</string><string>c</string></array>');
                    expect(val).toEqual(['a','b','c']);
                });

                it("should decode an array with associative data", function() {
                    var arr = ['a'];
                    arr.b = 1;
                    val =decode('<array length="1" ecma="true"><string>a</string><item name="b"><int>1</int></item></array>');
                    expect(val).toEqual(arr);
                    // And check associtave part manually since it's not checked by the matcher
                    expect(val.b).toEqual(arr.b);
                });
            });

            describe("object", function() {
                it("should decode an empty anonymous object", function() {
                    val =decode("<object><traits /></object>");
                    expect(val).toEqual({});
                });
                it("should decode an anonymous object with data items", function() {
                    val =decode('<object><traits><string>1</string><string>str</string></traits><int>1</int><string>string</string></object>');
                    expect(val).toEqual({1: 1, "str":"string"});
                });

            });

            describe("byte-array", function() {
                it("should decode a byte array", function() {
                    val = decode("<bytearray>090701060361060362060363</bytearray>");
                    expect(val).toEqual(['a','b','c']);
                });

            });

            describe("reference tables", function() {
                it("should correctly read reference-table objects, arrays and traits", function() {
                    val = decode('<array length="5">\
                                 <string>a</string>\
                                 <object>\
                                 <traits>\
                                 <string id="0" />\
                                 </traits>\
                                 <int>1</int>\
                                 </object>\
                                 <string id="0" />\
                                 <ref id="1" />\
                                 <object><traits id="0"/><int>2</int></object>\
                                 </array>\
                                 ');
                    expect(val).toEqual(["a", {a:1}, "a", {a:1}, {a:2}]);
                });
            });
        });

        describe("AMFX messages", function() {
            it("should read an AMFX message", function() {
                val = decoder.readAmfxMessage('<amfx ver="3"><body targetURI="/onResult" responseURI=""><object type="flex.messaging.messages.AcknowledgeMessage"><traits><string>timestamp</string><string>headers</string><string>body</string><string>correlationId</string><string>messageId</string><string>timeToLive</string><string>clientId</string><string>destination</string></traits><double>1.354577842341E12</double><object><traits/></object><int>12345</int><string>00000002-C28A-C38A-984B-6321901916D7</string><string>FD04F220-6409-515E-8D77-F198A071B85E</string><double>0.0</double><string>274FBBCE-2179-FC6D-393A-62A933E67F8B</string><null/></object></body></amfx>');
                expect(val.targetURI).toEqual('/onResult');
                expect(val.responseURI).toEqual("");
                expect(val.message.headers).toEqual({});
                expect(val.message.body).toEqual(12345);
                expect(val.message.correlationId).toEqual("00000002-C28A-C38A-984B-6321901916D7");
            });
        });

    });


});