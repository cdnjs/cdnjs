describe("Ext.data.amf.Packet", function() {

    describe("AMF0", function() {
        describe("data types", function() {
            // this function creates an AMF0 packet with 0 headers and 1 message
            // and appends "bytes" as the message body, then decodes and returns
            // the value of the packet's message body
            function decodeValue(bytes) {
                return (new Ext.data.amf.Packet()).decode(
                    [0,0,0,0,0,1,0,1,97,0,1,98,0,0,0,0].concat(bytes)
                ).getMessages()[0].body;
            }

            describe("number", function() {
                it("should decode 0", function() {
                    expect(decodeValue([0,0,0,0,0,0,0,0,0])).toBe(0);
                });

                it("should decode 10.333", function() {
                    expect(decodeValue([0,64,36,170,126,249,219,34,209])).toBe(10.333);
                });

                it("should decode 1.7976931348623157e+308 (largest positive number)", function() {
                    expect(decodeValue([0,127,239,255,255,255,255,255,255])).toBe(Number.MAX_VALUE);
                });

                it("should decode -1.7976931348623157e+308 (largest negative number)", function() {
                    expect(decodeValue([0,255,239,255,255,255,255,255,255])).toBe(-Number.MAX_VALUE);
                });

                it("should decode 5e-324 (smallest positive number)", function() {
                    expect(decodeValue([0,0,0,0,0,0,0,0,1])).toBe(Number.MIN_VALUE);
                });

                it("should decode -5e-324 (smallest negative number)", function() {
                    expect(decodeValue([0,128,0,0,0,0,0,0,1])).toBe(-Number.MIN_VALUE);
                });

                it("should decode NaN", function() {
                    expect(isNaN(decodeValue([0,127,248,0,0,0,0,0,0]))).toBe(true);
                });

                it("should decode positive infinity", function() {
                    expect(decodeValue([0,127,240,0,0,0,0,0,0])).toBe(Infinity);
                });

                it("should decode negative infinity", function() {
                    expect(decodeValue([0,255,240,0,0,0,0,0,0])).toBe(-Infinity);
                });
            });

            describe("boolean", function() {
                it("should decode true", function() {
                    expect(decodeValue([1,1])).toBe(true);
                });

                it("should decode true when the value is a non-zero value other than 1", function() {
                    expect(decodeValue([1,42])).toBe(true);
                });

                it("should decode false", function() {
                    expect(decodeValue([1,0])).toBe(false);
                });
            });

            describe("string (utf-8)", function() {
                it("should decode an empty string", function() {
                    expect(decodeValue([2,0,0])).toBe('');
                });

                // Special thanks to Markus Kuhn's "quickbrown.txt" for the
                // following awesome pangrams.
                // http://www.cl.cam.ac.uk/~mgk25/ucs/examples/quickbrown.txt
                it("should decode Danish", function() {
                    expect(decodeValue([
                        2,0,90,81,117,105,122,100,101,108,116,97,103,101,114,110,
                        101,32,115,112,105,115,116,101,32,106,111,114,100,98,195,
                        166,114,32,109,101,100,32,102,108,195,184,100,101,44,32,
                        109,101,110,115,32,99,105,114,107,117,115,107,108,111,118,
                        110,101,110,32,87,111,108,116,104,101,114,32,115,112,105,
                        108,108,101,100,101,32,112,195,165,32,120,121,108,111,102,
                        111,110
                    ])).toBe(
                        "Quizdeltagerne spiste jordb\u00E6r med fl\u00F8de, mens " +
                            "cirkusklovnen Wolther spillede p\u00E5 xylofon"
                    );
                });

                it("should decode German", function() {
                    expect(decodeValue([
                        2,0,62,70,97,108,115,99,104,101,115,32,195,156,98,101,110,
                        32,118,111,110,32,88,121,108,111,112,104,111,110,109,117,
                        115,105,107,32,113,117,195,164,108,116,32,106,101,100,101,
                        110,32,103,114,195,182,195,159,101,114,101,110,32,90,119,
                        101,114,103
                    ])).toBe(
                        "Falsches \u00DCben von Xylophonmusik qu\u00E4lt jeden gr\u00F6\u00DFeren Zwerg"
                    );
                });

                it("should decode Greek", function() {
                    expect(decodeValue([
                        2,0,103,206,147,206,177,206,182,206,173,206,181,207,130,
                        32,206,186,206,177,225,189,182,32,206,188,207,133,207,129,
                        207,132,206,185,225,189,178,207,130,32,206,180,225,189,
                        178,206,189,32,206,184,225,189,176,32,206,178,207,129,225,
                        191,182,32,207,128,206,185,225,189,176,32,207,131,207,132,
                        225,189,184,32,207,135,207,129,207,133,207,131,206,177,
                        207,134,225,189,182,32,206,190,206,173,207,134,207,137,
                        207,132,206,191
                    ])).toBe(
                        "\u0393\u03B1\u03B6\u03AD\u03B5\u03C2 \u03BA\u03B1\u1F76 " +
                        "\u03BC\u03C5\u03C1\u03C4\u03B9\u1F72\u03C2 \u03B4\u1F72\u03BD " +
                        "\u03B8\u1F70 \u03B2\u03C1\u1FF6 \u03C0\u03B9\u1F70 \u03C3\u03C4\u1F78 " +
                        "\u03C7\u03C1\u03C5\u03C3\u03B1\u03C6\u1F76 \u03BE\u03AD\u03C6\u03C9\u03C4\u03BF"
                    );
                });

                it("should decode English", function() {
                    expect(decodeValue([
                        2,0,43,84,104,101,32,113,117,105,99,107,32,98,114,111,119,
                        110,32,102,111,120,32,106,117,109,112,115,32,111,118,101,
                        114,32,116,104,101,32,108,97,122,121,32,100,111,103
                    ])).toBe(
                        "The quick brown fox jumps over the lazy dog"
                    );
                });

                it("should decode Spanish", function() {
                    expect(decodeValue([
                        2,0,64,69,108,32,112,105,110,103,195,188,105,110,111,32,
                        87,101,110,99,101,115,108,97,111,32,104,105,122,111,32,
                        107,105,108,195,179,109,101,116,114,111,115,32,98,97,106,
                        111,32,101,120,104,97,117,115,116,105,118,97,32,108,108,
                        117,118,105,97,32,121
                    ])).toBe(
                        "El ping\u00FCino Wenceslao hizo kil\u00F3metros bajo exhaustiva " +
                            "lluvia y"
                    );
                });

                it("should decode French", function() {
                    expect(decodeValue([
                        2,0,106,108,39,195,174,108,101,32,101,120,105,103,117,195,
                        171,32,79,195,185,32,108,39,111,98,195,168,115,101,32,106,
                        117,114,121,32,109,195,187,114,32,70,195,170,116,101,32,
                        108,39,104,97,195,175,32,118,111,108,97,112,195,188,107,
                        44,32,195,130,110,101,32,101,120,32,97,195,169,113,117,
                        111,32,97,117,32,119,104,105,115,116,44,32,195,148,116,
                        101,122,32,99,101,32,118,197,147,117,32,100,195,169,195,
                        167,117
                    ])).toBe(
                        "l'\u00EEle exigu\u00EB O\u00F9 l'ob\u00E8se jury m\u00FBr F\u00EAte l'ha\u00EF volap\u00FCk, " +
                            "\u00C2ne ex a\u00E9quo au whist, \u00D4tez ce v\u0153u d\u00E9\u00E7u"
                    );
                });

                it("should decode Irish Gaelic", function() {
                    expect(decodeValue([
                        2,0,74,68,39,102,104,117,97,115,99,97,105,108,32,195,141,
                        111,115,97,44,32,195,154,114,109,104,97,99,32,110,97,32,
                        104,195,147,105,103,104,101,32,66,101,97,110,110,97,105,
                        116,104,101,44,32,112,195,179,114,32,195,137,97,118,97,32,
                        97,103,117,115,32,195,129,100,104,97,105,109,104
                    ])).toBe(
                        "D'fhuascail \u00CDosa, \u00DArmhac na h\u00D3ighe Beannaithe, p\u00F3r " +
                            "\u00C9ava agus \u00C1dhaimh"
                    );
                });

                it("should decode Hungarian", function() {
                    expect(decodeValue([
                        2,0,31,195,129,114,118,195,173,122,116,197,177,114,197,
                        145,32,116,195,188,107,195,182,114,102,195,186,114,195,
                        179,103,195,169,112
                    ])).toBe(
                        "\u00C1rv\u00EDzt\u0171r\u0151 t\u00FCk\u00F6rf\u00FAr\u00F3g\u00E9p"
                    );
                });

                it("should decode Icelandic", function() {
                    expect(decodeValue([
                        2,0,61,75,195,166,109,105,32,110,195,189,32,195,182,120,
                        105,32,104,195,169,114,32,121,107,105,115,116,32,195,190,
                        106,195,179,102,117,109,32,110,195,186,32,98,195,166,195,
                        176,105,32,118,195,173,108,32,111,103,32,195,161,100,114,
                        101,112,97
                    ])).toBe(
                        "K\u00E6mi n\u00FD \u00F6xi h\u00E9r ykist \u00FEj\u00F3fum n\u00FA b\u00E6\u00F0i v\u00EDl og " +
                            "\u00E1drepa"
                    );
                });

                it("should decode Japanese (Hiragana)", function() {
                    expect(decodeValue([
                        2,0,141,227,129,132,227,130,141,227,129,175,227,129,171,
                        227,129,187,227,129,184,227,129,168,227,129,161,227,130,
                        138,227,129,172,227,130,139,227,130,146,227,130,143,227,
                        129,139,227,130,136,227,129,159,227,130,140,227,129,157,
                        227,129,164,227,129,173,227,129,170,227,130,137,227,130,
                        128,227,129,134,227,130,144,227,129,174,227,129,138,227,
                        129,143,227,130,132,227,129,190,227,129,145,227,129,181,
                        227,129,147,227,129,136,227,129,166,227,129,130,227,129,
                        149,227,129,141,227,130,134,227,130,129,227,129,191,227,
                        129,151,227,130,145,227,129,178,227,130,130,227,129,155,
                        227,129,153
                    ])).toBe(
                        "\u3044\u308D\u306F\u306B\u307B\u3078\u3068\u3061\u308A\u306C\u308B\u3092\u308F\u304B\u3088" +
                            "\u305F\u308C\u305D\u3064\u306D\u306A\u3089\u3080\u3046\u3090\u306E\u304A\u304F\u3084" +
                            "\u307E\u3051\u3075" +
                            "\u3053\u3048\u3066\u3042\u3055\u304D\u3086\u3081\u307F\u3057\u3091\u3072\u3082\u305B\u3059"
                    );
                });

                it("should decode Japanese (Katakana)", function() {
                    expect(decodeValue([
                        2,0,151,227,130,164,227,131,173,227,131,143,227,131,139,
                        227,131,155,227,131,152,227,131,136,32,227,131,129,227,
                        131,170,227,131,140,227,131,171,227,131,178,32,227,131,
                        175,227,130,171,227,131,168,227,130,191,227,131,172,227,
                        130,189,32,227,131,132,227,131,141,227,131,138,227,131,
                        169,227,131,160,32,227,130,166,227,131,176,227,131,142,
                        227,130,170,227,130,175,227,131,164,227,131,158,32,227,
                        130,177,227,131,149,227,130,179,227,130,168,227,131,134,
                        32,227,130,162,227,130,181,227,130,173,227,131,166,227,
                        131,161,227,131,159,227,130,183,32,227,131,177,227,131,
                        146,227,131,162,227,130,187,227,130,185,227,131,179
                    ])).toBe(
                        "\u30A4\u30ED\u30CF\u30CB\u30DB\u30D8\u30C8 \u30C1\u30EA\u30CC\u30EB\u30F2 " +
                            "\u30EF\u30AB\u30E8\u30BF\u30EC\u30BD \u30C4\u30CD\u30CA\u30E9\u30E0 " +
                            "\u30A6\u30F0\u30CE\u30AA\u30AF\u30E4\u30DE " +
                            "\u30B1\u30D5\u30B3\u30A8\u30C6 \u30A2\u30B5\u30AD\u30E6\u30E1\u30DF\u30B7 " +
                            "\u30F1\u30D2\u30E2\u30BB\u30B9\u30F3"
                    );
                });

                it("should decode Hebrew", function() {
                    expect(decodeValue([
                        2,0,90,215,147,215,146,32,215,161,215,167,215,168,215,159,
                        32,215,169,215,152,32,215,145,215,153,215,157,32,215,158,
                        215,144,215,149,215,155,215,150,215,145,32,215,149,215,
                        156,215,164,215,170,215,162,32,215,158,215,166,215,144,32,
                        215,156,215,149,32,215,151,215,145,215,168,215,148,32,215,
                        144,215,153,215,154,32,215,148,215,167,215,156,215,153,
                        215,152,215,148
                    ])).toBe(
                        "\u05D3\u05D2 \u05E1\u05E7\u05E8\u05DF \u05E9\u05D8 \u05D1\u05D9\u05DD " +
                            "\u05DE\u05D0\u05D5\u05DB\u05D6\u05D1 \u05D5\u05DC\u05E4\u05EA\u05E2 \u05DE\u05E6\u05D0 " +
                            "\u05DC\u05D5 \u05D7\u05D1\u05E8\u05D4 \u05D0\u05D9\u05DA \u05D4\u05E7\u05DC\u05D9\u05D8\u05D4");
                });

                it("should decode Polish", function() {
                    expect(decodeValue([
                        2,0,49,80,99,104,110,196,133,196,135,32,119,32,116,196,
                        153,32,197,130,195,179,100,197,186,32,106,101,197,188,97,
                        32,108,117,98,32,111,197,155,109,32,115,107,114,122,121,
                        197,132,32,102,105,103
                    ])).toBe(
                        "Pchn\u0105\u0107 w t\u0119 \u0142\u00F3d\u017A je\u017Ca lub o\u015Bm skrzy\u0144 fig"
                    );
                });

                it("should decode Russian", function() {
                    expect(decodeValue([
                        2,0,96,208,146,32,209,135,208,176,209,137,208,176,209,133,
                        32,209,142,208,179,208,176,32,208,182,208,184,208,187,32,
                        208,177,209,139,32,209,134,208,184,209,130,209,128,209,
                        131,209,129,63,32,208,148,208,176,44,32,208,189,208,190,
                        32,209,132,208,176,208,187,209,140,209,136,208,184,208,
                        178,209,139,208,185,32,209,141,208,186,208,183,208,181,
                        208,188,208,191,208,187,209,143,209,128,33
                    ])).toBe(
                        "\u0412 \u0447\u0430\u0449\u0430\u0445 \u044E\u0433\u0430 \u0436\u0438\u043B" +
                            " \u0431\u044B \u0446\u0438\u0442\u0440\u0443\u0441? \u0414\u0430, \u043D\u043E" +
                            " \u0444\u0430\u043B\u044C\u0448\u0438\u0432\u044B\u0439" +
                            " \u044D\u043A\u0437\u0435\u043C\u043F\u043B\u044F\u0440!"
                    );
                });
            });

            describe("object", function() {
                it("should decode an object", function() {
                    expect(decodeValue([
                        3,0,3,102,111,111,2,0,3,98,97,114,0,3,98,97,122,2,0,3,98,
                        117,122,0,0,9
                    ])).toEqual({
                        foo: 'bar',
                        baz: 'buz'
                    });
                });

                it("should decode nested objects", function() {
                    expect(decodeValue([
                        3,0,4,122,111,114,107,2,0,4,103,111,114,107,0,3,102,111,
                        111,2,0,3,98,97,114,0,3,98,97,122,3,0,4,116,104,117,100,
                        2,0,5,103,114,117,110,116,0,5,111,111,103,108,101,2,0,6,
                        102,111,111,103,108,101,0,0,9,0,0,9
                    ])).toEqual({
                        foo: 'bar',
                        baz: {
                            thud: 'grunt',
                            oogle: 'foogle'
                        },
                        zork: 'gork'
                    });
                });
            });

            describe("null", function() {
                it("should decode null", function() {
                    expect(decodeValue([5])).toBe(null);
                });
            });

            describe("undefined", function() {
                it("should decode undefined", function() {
                    expect(decodeValue([6])).toBe(undefined);
                });
            });

            describe("reference", function() {
                it("should decode anonymous object references", function() {
                    var obj = decodeValue([
                        // this byte array represents an object that looks like
                        // obj3 below:
                        //
                        // obj1 = {foo: 'bar'};
                        // obj2 = {baz: 'buz'};
                        // obj3 = {
                        //     homer: obj1,
                        //     marge: obj2,
                        //     bart: obj1,
                        //     lisa: obj2
                        // };
                        3,0,5,104,111,109,101,114,3,0,3,102,111,111,2,0,3,98,97,
                        114,0,0,9,0,4,108,105,115,97,3,0,3,98,97,122,2,0,3,98,
                        117,122,0,0,9,0,5,109,97,114,103,101,7,0,2,0,4,98,97,114,
                        116,7,0,1,0,0,9
                    ]);

                    expect(obj.homer).toEqual({foo: 'bar'});
                    expect(obj.marge).toEqual({baz: 'buz'});
                    // homer and bart should refer to the same object
                    expect(obj.homer).toBe(obj.bart);
                    // marge and lisa should refer to the same object
                    expect(obj.marge).toBe(obj.lisa);
                });

                it("should decode ecma array references", function() {
                    // TODO
                });

                it("should decode strict array references", function() {
                    // TODO
                });

                it("should decode typed object references", function() {
                    // TODO

                });
            });

            describe("ecma array", function() {
                it("should decode an ecma array", function() {
                    expect(decodeValue([
                        8,0,0,0,3,0,1,97,2,0,1,49,0,1,99,2,0,1,51,0,1,98,2,0,1,50,
                        0,0,9
                    ])).toEqual({
                        a: '1',
                        b: '2',
                        c: '3'
                    });
                });
            });

            describe("strict array", function() {
                it("should decode a strict array", function() {
                    expect(decodeValue([
                        10,0,0,0,3,2,0,1,120,2,0,1,121,2,0,1,122
                    ])).toEqual(['x','y','z']);
                });
            });

            describe("date", function() {
                it("should decode 7/24/2012 (the day this test was written)", function() {
                    expect(decodeValue([
                        11,66,115,139,173,239,119,80,0,0,0
                    ]).getTime()).toBe(1343164970869);
                });

                it("should decode 7/24/1912 (100 years before the day this test was written)", function() {
                    expect(decodeValue([
                        11,194,122,96,113,83,72,176,0,0,0
                    ]).getTime()).toBe(-1812595029131);
                });

                it("should decode 7/24/2112 (100 years after the day this test was written)", function() {
                    expect(decodeValue([
                        11,66,144,93,222,179,29,212,0,0,0
                    ]).getTime()).toBe(4498838570869);
                });

                it("should decode the UNIX epoch", function() {
                    expect(decodeValue([
                        11,0,0,0,0,0,0,0,0,0,0
                    ]).getTime()).toBe(0);
                });

                it("should decode 9/12/275760 (the largest future javascript date)", function() {
                    expect(decodeValue([
                        11,67,62,178,8,194,220,0,0,0,0
                    ]).getTime()).toBe(8640000000000000);
                });

                it("should decode 4/19/-271821 (the largest past javascript date)", function() {
                    expect(decodeValue([
                        11,195,62,178,8,194,220,0,0,0,0
                    ]).getTime()).toBe(-8640000000000000);
                });
            });

            describe("long string", function() {
                it("should decode a long string", function() {
                    // since the max length of a regular string is 65,535, lets
                    // make sure we can decode a long string at least 3 times
                    // that size.  Testing the maximum long string would require
                    // us to construct a string that is Math.pow(256,4)
                    // characters in length, which would crash most browsers.
                    var len = 65535 * 3,
                        i = 0,
                        byteArray = [
                            12, // long string type marker
                            0,2,255,253 // 32 bit byte-length header (the binary
                            // representation of 65,535 * 3, or 196,605
                            // tells the decoder how many bytes to read
                        ],
                        stringArray = [],
                        charCode;

                    for(; i < len; i++) {
                        charCode = 97 + (i % 7); // repeat characters a-g
                        byteArray.push(charCode);
                        stringArray.push(String.fromCharCode(charCode));
                    }

                    expect(decodeValue(byteArray)).toBe(stringArray.join(''));
                });
            });

            describe("unsupported", function() {
                it("should decode an unsupported marker", function() {
                    expect(decodeValue([13])).toBe(undefined);
                });
            });

            describe("xml document", function() {
                it("should decode an xml document", function() {
                    var doc = decodeValue([
                        15,0,0,0,82,60,114,111,111,116,62,60,112,97,114,101,110,
                        116,62,60,99,104,105,108,100,32,105,100,61,34,99,49,34,
                        62,102,111,111,60,47,99,104,105,108,100,62,60,99,104,105,
                        108,100,32,105,100,61,34,99,50,34,62,98,97,114,60,47,99,
                        104,105,108,100,62,60,47,112,97,114,101,110,116,62,60,47,
                        114,111,111,116,62
                    ]);

                    expect(Ext.DomQuery.isXml(doc)).toBe(true);

                    expect(doc.firstChild.tagName).toBe('root');
                    expect(doc.firstChild.firstChild.tagName).toBe('parent');
                    expect(doc.firstChild.firstChild.firstChild.tagName).toBe('child');
                    expect(doc.firstChild.firstChild.firstChild.firstChild.nodeValue).toBe('foo');
                    expect(doc.firstChild.firstChild.firstChild.getAttribute('id')).toBe('c1');
                    expect(doc.firstChild.firstChild.childNodes[1].tagName).toBe('child');
                    expect(doc.firstChild.firstChild.childNodes[1].firstChild.nodeValue).toBe('bar');
                    expect(doc.firstChild.firstChild.childNodes[1].getAttribute('id')).toBe('c2');
                });
            });

            describe("typed object", function() {
                it("should decode a typed object by alias", function() {
                    Ext.define('Ext.Foo', {
                        alias: 'amf.Foo'
                    });
                    var obj = decodeValue([
                        16,0,3,70,111,111,0,3,98,97,114,2,0,3,98,97,122,0,0,9
                    ]),
                        foo = new Ext.Foo();

                    foo.bar = 'baz';

                    expect(obj).toEqual(foo);
                    //Ext.undefine('Ext.Foo');
                    //Ext.Foo = nil;
                    delete Ext.Foo;
                });

                it("should decode a typed object as an anonymous object with a $className field if no class is found by alias", function() {
                    var obj = decodeValue([
                        16,0,3,70,111,117,0,3,98,97,114,2,0,3,98,97,122,0,0,9
                    ]);

                    expect(obj).toEqual({
                        $className: 'Fou', // use Fou instead of Foo since that's already defined in a different test and lingers around
                        bar: 'baz'
                    });
                });

            });
        });
    });

    describe("AMF3", function() {
        describe("data types", function() {
            // this function creates an AMF3 packet with 0 headers and 1 message
            // and appends "bytes" as the message body, then decodes and returns
            // the value of the packet's message body
            function decodeValue(bytes) {
                return (new Ext.data.amf.Packet()).decode(
                    [0,3,0,0,0,1,0,1,97,0,1,98,0,0,0,0].concat(bytes)
                ).getMessages()[0].body;
            }

            describe("undefined", function() {
                it("should decode undefined", function() {
                    expect(decodeValue([0])).toBeUndefined();
                });
            });

            describe("null", function() {
                it("should decode null", function() {
                    expect(decodeValue([1])).toBe(null);
                });
            });

            describe("false", function() {
                it("should decode false", function() {
                    expect(decodeValue([2])).toBe(false);
                });
            });

            describe("true", function() {
                it("should decode true", function() {
                    expect(decodeValue([3])).toBe(true);
                });
            });

            describe("integer", function() {
                it("should decode 0", function() {
                    expect(decodeValue([4,0])).toBe(0);
                });

                it("should decode a 127", function() {
                    expect(decodeValue([4,127])).toBe(127);
                });

                it("should decode 128", function() {
                    expect(decodeValue([4,129,0])).toBe(128);
                });

                it("should decode 137", function() {
                    expect(decodeValue([4,129,9])).toBe(137);
                });

                it("should decode 8256", function() {
                    expect(decodeValue([4,192,64])).toBe(8256);
                });

                it("should decode 16320", function() {
                    expect(decodeValue([4,255,64])).toBe(16320);
                });

                it("should decode 16512", function() {
                    expect(decodeValue([4,129,129,0])).toBe(16512);
                });

                it("should decode 16576", function() {
                    expect(decodeValue([4,129,129,64])).toBe(16576);
                });

                it("should decode 32704", function() {
                    expect(decodeValue([4,129,255,64])).toBe(32704);
                });

                it("should decode 2097088", function() {
                    expect(decodeValue([4,255,255,64])).toBe(2097088);
                });

                it("should decode 4227328", function() {
                    expect(decodeValue([4,129,129,129,0])).toBe(4227328);
                });

                it("should decode 270532928", function() {
                    expect(decodeValue([4,192,192,129,64])).toBe(270532928);
                });

                it("should decode 2^29-1 (the largest possible unsigned 29-bit int)", function() {
                    expect(decodeValue([4,255,255,255,255])).toBe(Math.pow(2,29) - 1);
                });
            });

            describe("double", function() {
                it("should decode 0", function() {
                    expect(decodeValue([5,0,0,0,0,0,0,0,0])).toBe(0);
                });

                it("should decode 10.333", function() {
                    expect(decodeValue([5,64,36,170,126,249,219,34,209])).toBe(10.333);
                });

                it("should decode 1.7976931348623157e+308 (largest positive number)", function() {
                    expect(decodeValue([5,127,239,255,255,255,255,255,255])).toBe(Number.MAX_VALUE);
                });

                it("should decode -1.7976931348623157e+308 (largest negative number)", function() {
                    expect(decodeValue([5,255,239,255,255,255,255,255,255])).toBe(-Number.MAX_VALUE);
                });

                it("should decode 5e-324 (smallest positive number)", function() {
                    expect(decodeValue([5,0,0,0,0,0,0,0,1])).toBe(Number.MIN_VALUE);
                });

                it("should decode -5e-324 (smallest negative number)", function() {
                    expect(decodeValue([5,128,0,0,0,0,0,0,1])).toBe(-Number.MIN_VALUE);
                });

                it("should decode NaN", function() {
                    expect(isNaN(decodeValue([5,127,248,0,0,0,0,0,0]))).toBe(true);
                });

                it("should decode positive infinity", function() {
                    expect(decodeValue([5,127,240,0,0,0,0,0,0])).toBe(Infinity);
                });

                it("should decode negative infinity", function() {
                    expect(decodeValue([5,255,240,0,0,0,0,0,0])).toBe(-Infinity);
                });
            });

            describe("string", function() {
                it("should decode an empty string", function() {
                    expect(decodeValue([6,1])).toBe('');
                });

                // Special thanks to Markus Kuhn's "quickbrown.txt" for the
                // following awesome pangrams.
                // http://www.cl.cam.ac.uk/~mgk25/ucs/examples/quickbrown.txt
                it("should decode Danish", function() {
                    expect(decodeValue([
                        6,129,53,81,117,105,122,100,101,108,116,97,103,101,114,110,
                        101,32,115,112,105,115,116,101,32,106,111,114,100,98,195,
                        166,114,32,109,101,100,32,102,108,195,184,100,101,44,32,
                        109,101,110,115,32,99,105,114,107,117,115,107,108,111,118,
                        110,101,110,32,87,111,108,116,104,101,114,32,115,112,105,
                        108,108,101,100,101,32,112,195,165,32,120,121,108,111,102,
                        111,110
                    ])).toBe(
                        "Quizdeltagerne spiste jordb\u00E6r med fl\u00F8de, mens " +
                            "cirkusklovnen Wolther spillede p\u00E5 xylofon"
                    );
                });

                it("should decode German", function() {
                    expect(decodeValue([
                        6,125,70,97,108,115,99,104,101,115,32,195,156,98,101,110,
                        32,118,111,110,32,88,121,108,111,112,104,111,110,109,117,
                        115,105,107,32,113,117,195,164,108,116,32,106,101,100,101,
                        110,32,103,114,195,182,195,159,101,114,101,110,32,90,119,
                        101,114,103
                    ])).toBe(
                        "Falsches \u00DCben von Xylophonmusik qu\u00E4lt jeden gr\u00F6\u00DFeren Zwerg"
                    );
                });

                it("should decode Greek", function() {
                    expect(decodeValue([
                        6,129,79,206,147,206,177,206,182,206,173,206,181,207,130,
                        32,206,186,206,177,225,189,182,32,206,188,207,133,207,129,
                        207,132,206,185,225,189,178,207,130,32,206,180,225,189,
                        178,206,189,32,206,184,225,189,176,32,206,178,207,129,225,
                        191,182,32,207,128,206,185,225,189,176,32,207,131,207,132,
                        225,189,184,32,207,135,207,129,207,133,207,131,206,177,
                        207,134,225,189,182,32,206,190,206,173,207,134,207,137,
                        207,132,206,191
                    ])).toBe(
                        "\u0393\u03B1\u03B6\u03AD\u03B5\u03C2 \u03BA\u03B1\u1F76 " +
                            "\u03BC\u03C5\u03C1\u03C4\u03B9\u1F72\u03C2 \u03B4\u1F72\u03BD \u03B8\u1F70 " +
                            "\u03B2\u03C1\u1FF6 \u03C0\u03B9\u1F70 \u03C3\u03C4\u1F78 " +
                            "\u03C7\u03C1\u03C5\u03C3\u03B1\u03C6\u1F76 \u03BE\u03AD\u03C6\u03C9\u03C4\u03BF"
                    );
                });

                it("should decode English", function() {
                    expect(decodeValue([
                        6,87,84,104,101,32,113,117,105,99,107,32,98,114,111,119,
                        110,32,102,111,120,32,106,117,109,112,115,32,111,118,101,
                        114,32,116,104,101,32,108,97,122,121,32,100,111,103
                    ])).toBe(
                        "The quick brown fox jumps over the lazy dog"
                    );
                });

                it("should decode Spanish", function() {
                    expect(decodeValue([
                        6,129,1,69,108,32,112,105,110,103,195,188,105,110,111,32,
                        87,101,110,99,101,115,108,97,111,32,104,105,122,111,32,
                        107,105,108,195,179,109,101,116,114,111,115,32,98,97,106,
                        111,32,101,120,104,97,117,115,116,105,118,97,32,108,108,
                        117,118,105,97,32,121
                    ])).toBe(
                        "El ping\u00FCino Wenceslao hizo kil\u00F3metros bajo exhaustiva " +
                            "lluvia y"
                    );
                });

                it("should decode French", function() {
                    expect(decodeValue([
                        6,129,85,108,39,195,174,108,101,32,101,120,105,103,117,195,
                        171,32,79,195,185,32,108,39,111,98,195,168,115,101,32,106,
                        117,114,121,32,109,195,187,114,32,70,195,170,116,101,32,
                        108,39,104,97,195,175,32,118,111,108,97,112,195,188,107,
                        44,32,195,130,110,101,32,101,120,32,97,195,169,113,117,
                        111,32,97,117,32,119,104,105,115,116,44,32,195,148,116,
                        101,122,32,99,101,32,118,197,147,117,32,100,195,169,195,
                        167,117
                    ])).toBe(
                        "l'\u00EEle exigu\u00EB O\u00F9 l'ob\u00E8se jury m\u00FBr F\u00EAte l'ha\u00EF volap\u00FCk, " +
                            "\u00C2ne ex a\u00E9quo au whist, \u00D4tez ce v\u0153u d\u00E9\u00E7u"
                    );
                });

                it("should decode Irish Gaelic", function() {
                    expect(decodeValue([
                        6,129,21,68,39,102,104,117,97,115,99,97,105,108,32,195,141,
                        111,115,97,44,32,195,154,114,109,104,97,99,32,110,97,32,
                        104,195,147,105,103,104,101,32,66,101,97,110,110,97,105,
                        116,104,101,44,32,112,195,179,114,32,195,137,97,118,97,32,
                        97,103,117,115,32,195,129,100,104,97,105,109,104
                    ])).toBe(
                        "D'fhuascail \u00CDosa, \u00DArmhac na h\u00D3ighe Beannaithe, p\u00F3r " +
                            "\u00C9ava agus \u00C1dhaimh"
                    );
                });

                it("should decode Hungarian", function() {
                    expect(decodeValue([
                        6,63,195,129,114,118,195,173,122,116,197,177,114,197,
                        145,32,116,195,188,107,195,182,114,102,195,186,114,195,
                        179,103,195,169,112
                    ])).toBe(
                        "\u00C1rv\u00EDzt\u0171r\u0151 t\u00FCk\u00F6rf\u00FAr\u00F3g\u00E9p"
                    );
                });

                it("should decode Icelandic", function() {
                    expect(decodeValue([
                        6,123,75,195,166,109,105,32,110,195,189,32,195,182,120,
                        105,32,104,195,169,114,32,121,107,105,115,116,32,195,190,
                        106,195,179,102,117,109,32,110,195,186,32,98,195,166,195,
                        176,105,32,118,195,173,108,32,111,103,32,195,161,100,114,
                        101,112,97
                    ])).toBe(
                        "K\u00E6mi n\u00FD \u00F6xi h\u00E9r ykist \u00FEj\u00F3fum n\u00FA b\u00E6\u00F0i " +
                            "v\u00EDl og \u00E1drepa"
                    );
                });

                it("should decode Japanese (Hiragana)", function() {
                    expect(decodeValue([
                        6,130,27,227,129,132,227,130,141,227,129,175,227,129,171,
                        227,129,187,227,129,184,227,129,168,227,129,161,227,130,
                        138,227,129,172,227,130,139,227,130,146,227,130,143,227,
                        129,139,227,130,136,227,129,159,227,130,140,227,129,157,
                        227,129,164,227,129,173,227,129,170,227,130,137,227,130,
                        128,227,129,134,227,130,144,227,129,174,227,129,138,227,
                        129,143,227,130,132,227,129,190,227,129,145,227,129,181,
                        227,129,147,227,129,136,227,129,166,227,129,130,227,129,
                        149,227,129,141,227,130,134,227,130,129,227,129,191,227,
                        129,151,227,130,145,227,129,178,227,130,130,227,129,155,
                        227,129,153
                    ])).toBe(
                        "\u3044\u308D\u306F\u306B\u307B\u3078\u3068\u3061\u308A\u306C\u308B\u3092\u308F\u304B\u3088" +
                            "\u305F\u308C\u305D\u3064\u306D\u306A\u3089\u3080\u3046\u3090\u306E\u304A\u304F\u3084" +
                            "\u307E\u3051\u3075" +
                            "\u3053\u3048\u3066\u3042\u3055\u304D\u3086\u3081\u307F\u3057\u3091\u3072\u3082\u305B\u3059"
                    );
                });

                it("should decode Japanese (Katakana)", function() {
                    expect(decodeValue([
                        6,130,47,227,130,164,227,131,173,227,131,143,227,131,139,
                        227,131,155,227,131,152,227,131,136,32,227,131,129,227,
                        131,170,227,131,140,227,131,171,227,131,178,32,227,131,
                        175,227,130,171,227,131,168,227,130,191,227,131,172,227,
                        130,189,32,227,131,132,227,131,141,227,131,138,227,131,
                        169,227,131,160,32,227,130,166,227,131,176,227,131,142,
                        227,130,170,227,130,175,227,131,164,227,131,158,32,227,
                        130,177,227,131,149,227,130,179,227,130,168,227,131,134,
                        32,227,130,162,227,130,181,227,130,173,227,131,166,227,
                        131,161,227,131,159,227,130,183,32,227,131,177,227,131,
                        146,227,131,162,227,130,187,227,130,185,227,131,179
                    ])).toBe(
                        "\u30A4\u30ED\u30CF\u30CB\u30DB\u30D8\u30C8 \u30C1\u30EA\u30CC\u30EB\u30F2 " +
                            "\u30EF\u30AB\u30E8\u30BF\u30EC\u30BD \u30C4\u30CD\u30CA\u30E9\u30E0 " +
                            "\u30A6\u30F0\u30CE\u30AA\u30AF\u30E4\u30DE " +
                            "\u30B1\u30D5\u30B3\u30A8\u30C6 \u30A2\u30B5\u30AD\u30E6\u30E1\u30DF\u30B7 " +
                            "\u30F1\u30D2\u30E2\u30BB\u30B9\u30F3"
                    );
                });

                it("should decode Hebrew", function() {
                    expect(decodeValue([
                        6,129,53,215,147,215,146,32,215,161,215,167,215,168,215,159,
                        32,215,169,215,152,32,215,145,215,153,215,157,32,215,158,
                        215,144,215,149,215,155,215,150,215,145,32,215,149,215,
                        156,215,164,215,170,215,162,32,215,158,215,166,215,144,32,
                        215,156,215,149,32,215,151,215,145,215,168,215,148,32,215,
                        144,215,153,215,154,32,215,148,215,167,215,156,215,153,
                        215,152,215,148
                    ])).toBe("\u05D3\u05D2 \u05E1\u05E7\u05E8\u05DF \u05E9\u05D8 \u05D1\u05D9\u05DD " +
                        "\u05DE\u05D0\u05D5\u05DB\u05D6\u05D1 \u05D5\u05DC\u05E4\u05EA\u05E2 \u05DE\u05E6\u05D0 " +
                        "\u05DC\u05D5 \u05D7\u05D1\u05E8\u05D4 \u05D0\u05D9\u05DA \u05D4\u05E7\u05DC\u05D9\u05D8\u05D4");
                });

                it("should decode Polish", function() {
                    expect(decodeValue([
                        6,99,80,99,104,110,196,133,196,135,32,119,32,116,196,
                        153,32,197,130,195,179,100,197,186,32,106,101,197,188,97,
                        32,108,117,98,32,111,197,155,109,32,115,107,114,122,121,
                        197,132,32,102,105,103
                    ])).toBe(
                        "Pchn\u0105\u0107 w t\u0119 \u0142\u00F3d\u017A je\u017Ca lub o\u015Bm skrzy\u0144 fig"
                    );
                });

                it("should decode Russian", function() {
                    expect(decodeValue([
                        6,129,65,208,146,32,209,135,208,176,209,137,208,176,209,133,
                        32,209,142,208,179,208,176,32,208,182,208,184,208,187,32,
                        208,177,209,139,32,209,134,208,184,209,130,209,128,209,
                        131,209,129,63,32,208,148,208,176,44,32,208,189,208,190,
                        32,209,132,208,176,208,187,209,140,209,136,208,184,208,
                        178,209,139,208,185,32,209,141,208,186,208,183,208,181,
                        208,188,208,191,208,187,209,143,209,128,33
                    ])).toBe(
                        "\u0412 \u0447\u0430\u0449\u0430\u0445 \u044E\u0433\u0430 \u0436\u0438\u043B \u0431\u044B " +
                            "\u0446\u0438\u0442\u0440\u0443\u0441? \u0414\u0430, \u043D\u043E " +
                            "\u0444\u0430\u043B\u044C\u0448\u0438\u0432\u044B\u0439 " +
                            "\u044D\u043A\u0437\u0435\u043C\u043F\u043B\u044F\u0440!"
                    );
                });

                it("should decode string references", function() {
                    expect(decodeValue([
                        10,11,1,9,102,111,117,114,6,7,98,97,114,11,116,104,114,
                        101,101,6,7,102,111,111,7,116,119,111,6,2,7,111,110,101,
                        6,6,1
                    ])).toEqual({
                        one: 'foo',
                        two: 'bar',
                        three: 'foo',
                        four: 'bar'
                    });
                });
            });

            describe("xml-doc", function() {
                it("should decode an XMLDocument", function() {
                    var doc = decodeValue([
                        7,129,37,60,114,111,111,116,62,60,112,97,114,101,110,
                        116,62,60,99,104,105,108,100,32,105,100,61,34,99,49,34,
                        62,102,111,111,60,47,99,104,105,108,100,62,60,99,104,
                        105,108,100,32,105,100,61,34,99,50,34,62,98,97,114,60,
                        47,99,104,105,108,100,62,60,47,112,97,114,101,110,116,
                        62,60,47,114,111,111,116,62
                    ]);

                    expect(Ext.DomQuery.isXml(doc)).toBe(true);

                    expect(doc.firstChild.tagName).toBe('root');
                    expect(doc.firstChild.firstChild.tagName).toBe('parent');
                    expect(doc.firstChild.firstChild.firstChild.tagName).toBe('child');
                    expect(doc.firstChild.firstChild.firstChild.firstChild.nodeValue).toBe('foo');
                    expect(doc.firstChild.firstChild.firstChild.getAttribute('id')).toBe('c1');
                    expect(doc.firstChild.firstChild.childNodes[1].tagName).toBe('child');
                    expect(doc.firstChild.firstChild.childNodes[1].firstChild.nodeValue).toBe('bar');
                    expect(doc.firstChild.firstChild.childNodes[1].getAttribute('id')).toBe('c2');
                });

                it("should decode XMLDocuments by reference", function() {
                    var xmlDocuments = decodeValue([
                        10,11,1,9,102,111,117,114,7,11,60,98,32,47,62,11,116,
                        104,114,101,101,7,11,60,97,32,47,62,7,116,119,111,7,2,
                        7,111,110,101,7,4,1
                    ]),
                        doc1 = xmlDocuments.one,
                        doc2 = xmlDocuments.two,
                        doc3 = xmlDocuments.three,
                        doc4 = xmlDocuments.four;

                    expect(Ext.DomQuery.isXml(doc1)).toBe(true);
                    expect(Ext.DomQuery.isXml(doc2)).toBe(true);
                    expect(Ext.DomQuery.isXml(doc3)).toBe(true);
                    expect(Ext.DomQuery.isXml(doc4)).toBe(true);
                    // doc1 and doc3 should be the same instance
                    expect(doc1).toBe(doc3);
                    // doc2 and doc4 should be the same instance
                    expect(doc2).toBe(doc4);
                    expect(doc1).not.toBe(doc2);
                    expect(doc3).not.toBe(doc4);
                });
            });

            describe("date", function() {
                it("should decode 7/24/2012 (the day this test was written)", function() {
                    expect(decodeValue([
                        8,1,66,115,139,173,239,119,80,0
                    ]).getTime()).toBe(1343164970869);
                });

                it("should decode 7/24/1912 (100 years before the day this test was written)", function() {
                    expect(decodeValue([
                        8,1,194,122,96,113,83,72,176,0
                    ]).getTime()).toBe(-1812595029131);
                });

                it("should decode 7/24/2112 (100 years after the day this test was written)", function() {
                    expect(decodeValue([
                        8,1,66,144,93,222,179,29,212,0
                    ]).getTime()).toBe(4498838570869);
                });

                it("should decode the UNIX epoch", function() {
                    expect(decodeValue([
                        8,1,0,0,0,0,0,0,0,0
                    ]).getTime()).toBe(0);
                });

                it("should decode 9/12/275760 (the largest future javascript date)", function() {
                    expect(decodeValue([
                        8,1,67,62,178,8,194,220,0,0
                    ]).getTime()).toBe(8640000000000000);
                });

                it("should decode 4/19/-271821 (the largest past javascript date)", function() {
                    expect(decodeValue([
                        8,1,195,62,178,8,194,220,0,0
                    ]).getTime()).toBe(-8640000000000000);
                });

                it("should decode dates by reference", function() {
                    var dates = decodeValue([
                        9,9,1,8,1,66,115,140,29,236,176,0,0,8,1,66,115,140,112,
                        82,112,0,0,8,2,8,4
                    ]);

                    expect(dates.length).toBe(4);
                    expect(dates[0].getTime()).toEqual(1343282400000);
                    expect(dates[1].getTime()).toEqual(1343368800000);

                    // dates 0 and 2 should be the same instance
                    expect(dates[0]).toBe(dates[2]);
                    // dates 1 and 3 should be the same instance
                    expect(dates[1]).toBe(dates[3]);
                });
            });

            describe("array", function() {
                it("should decode an array", function() {
                    expect(decodeValue([
                        9,7,1,6,3,97,6,3,98,6,3,99
                    ])).toEqual(['a','b','c']);
                });

                it("should decode an ECMA (associative) array", function() {
                    expect(decodeValue([
                        9,1,3,97,6,3,98,3,99,6,3,100,1
                    ])).toEqual({
                        a: 'b',
                        c: 'd'
                    });
                });

                it("should decode an array containing both string and ordinal indices", function() {
                    expect(decodeValue([
                        9,7,3,97,6,3,98,3,99,6,3,100,1,6,3,120,6,3,121,6,3,122
                    ])).toEqual({
                        a: 'b',
                        c: 'd',
                        0: 'x',
                        1: 'y',
                        2: 'z'
                    });
                });

                it("should decode arrays by reference", function() {
                    var result = decodeValue([
                        9,9,1,9,7,1,6,3,97,6,3,98,6,3,99,9,7,1,6,3,120,6,3,121,
                        6,3,122,9,2,9,4
                    ]);

                    expect(result.length).toBe(4);
                    expect(result[0]).toEqual(['a','b','c']);
                    expect(result[1]).toEqual(['x','y','z']);
                    // 0 and 1 should be the same instance
                    expect(result[0]).toBe(result[2]);
                    // 1 and 3 should be the same instance
                    expect(result[1]).toBe(result[3]);
                });
            });

            describe("object", function() {
                beforeEach(function() {
                    Ext.define('Ext.Foo', {
                        alias: 'amf.Foo'
                    });
                });

                afterEach(function() {
                    //Ext.undefine('Ext.Foo');
                    //Ext.Foo = nil;
                    delete Ext.Foo;
                });

                it("should decode an anonymous object", function() {
                    expect(decodeValue([
                        10,11,1,7,102,111,111,6,7,98,97,114,7,98,97,122,6,7,98,117,122,1
                    ])).toEqual({
                        foo: 'bar',
                        baz: 'buz'
                    });
                });

                it("should decode a typed object with sealed members", function() {
                    var foo = new Ext.Foo();

                    foo.foo = 'bar';
                    foo.baz = 'qux';

                    expect(decodeValue([
                        10,35,7,70,111,111,7,102,111,111,7,98,97,122,6,7,98,97,
                        114,6,7,113,117,120
                    ])).toEqual(foo);
                });

                it("should decode a typed object with the dynamic trait and only sealed members", function() {
                    var foo = new Ext.Foo();

                    foo.foo = 'bar';
                    foo.baz = 'qux';

                    expect(decodeValue([
                        10,43,7,70,111,111,7,102,111,111,7,98,97,122,6,7,98,97,
                        114,6,7,113,117,120,1
                    ])).toEqual(foo);
                });

                it("should decode a typed object with the dynamic trait and only dynamic members", function() {
                    var foo = new Ext.Foo();

                    foo.fred = 'flob';
                    foo.plugh = 'xyzzy';

                    expect(decodeValue([
                        10,11,7,70,111,111,11,112,108,117,103,104,6,11,120,121,
                        122,122,121,9,102,114,101,100,6,9,102,108,111,98,1
                    ])).toEqual(foo);
                });

                it("should decode a typed object with the dynamic trait and both sealed and dynamic members", function() {
                    var foo = new Ext.Foo();

                    foo.foo = 'bar';
                    foo.baz = 'qux';
                    foo.fred = 'flob';
                    foo.plugh = 'xyzzy';

                    expect(decodeValue([
                        10,43,7,70,111,111,7,102,111,111,7,98,97,122,6,7,98,97,
                        114,6,7,113,117,120,11,112,108,117,103,104,6,11,120,121,
                        122,122,121,9,102,114,101,100,6,9,102,108,111,98,1
                    ])).toEqual(foo);
                });

                it("should decode an anonymous object with no memebers", function() {
                    expect(decodeValue([10,11,1,1])).toEqual({});
                });

                it("should decode a typed object with no members", function() {
                    var foo = new Ext.Foo();
                    expect(decodeValue([10,3,7,70,111,111])).toEqual(foo);
                });

                it("should decode a typed object with the dynamic trait and no members", function() {
                    var foo = new Ext.Foo();
                    expect(decodeValue([10,11,7,70,111,111,1])).toEqual(foo);
                });

                it("should decode multiple objects of the same class using trait references", function() {
                    var foo1 = new Ext.Foo(),
                        foo2 = new Ext.Foo(),
                        foo3 = new Ext.Foo();

                    foo1.foo = 'bar';
                    foo1.baz =  'qux';
                    foo2.foo = 'fubar';
                    foo2.baz =  'snafu';
                    foo3.foo = 'tarfu';
                    foo3.baz =  'susfu';
                    expect(decodeValue([
                        10,11,1,11,116,104,114,101,101,10,35,7,70,111,111,7,102,
                        111,111,7,98,97,122,6,11,116,97,114,102,117,6,11,115,117,
                        115,102,117,7,116,119,111,10,5,6,11,102,117,98,97,114,6,
                        11,115,110,97,102,117,7,111,110,101,10,5,6,7,98,97,114,
                        6,7,113,117,120,1
                    ])).toEqual({
                        one: foo1,
                        two: foo2,
                        three: foo3
                    });
                });

                it("should decode multiple objects of two different classes using trait references", function() {
                    Ext.define('Ext.Baz', {
                        alias: 'amf.Baz'
                    });

                    var foo1 = new Ext.Foo(),
                        baz1 = new Ext.Baz(),
                        foo2 = new Ext.Foo(),
                        baz2 = new Ext.Baz();

                    foo1.bar = 'baz';
                    foo2.bar = 'qux';
                    baz1.qux = 'foo';
                    baz2.qux = 'bar';

                    expect(decodeValue([
                        10,11,1,9,102,111,117,114,10,19,7,66,97,122,7,113,117,
                        120,6,7,98,97,114,11,116,104,114,101,101,10,19,7,70,111,
                        111,6,6,4,7,116,119,111,10,5,6,7,102,111,111,7,111,110,
                        101,10,9,6,7,98,97,122,1
                    ])).toEqual({
                        one: foo1,
                        two: baz1,
                        three: foo2,
                        four: baz2
                    });

                    //Ext.undefine('Ext.Baz');
                    //Ext.Baz = nil;
                    delete Ext.Baz;
                });

                it("should decode objects by reference", function() {
                    var obj = decodeValue([
                        // this byte array represents an object that looks like
                        // obj3 below:
                        //
                        // obj1 = {foo: 'bar'};
                        // obj2 = {baz: 'buz'};
                        // obj3 = {
                        //     homer: obj1,
                        //     marge: obj2,
                        //     bart: obj1,
                        //     lisa: obj2
                        // };
                        10,11,1,11,104,111,109,101,114,10,1,7,102,111,111,6,7,98,
                        97,114,1,9,108,105,115,97,10,1,7,98,97,122,6,7,98,117,
                        122,1,11,109,97,114,103,101,10,4,9,98,97,114,116,10,2,1
                    ]);

                    expect(obj.homer).toEqual({foo: 'bar'});
                    expect(obj.marge).toEqual({baz: 'buz'});
                    // homer and bart should refer to the same object
                    expect(obj.homer).toBe(obj.bart);
                    // marge and lisa should refer to the same object
                    expect(obj.marge).toBe(obj.lisa);
                });
            });

            describe("xml", function() {
                it("should decode XML", function() {
                    var doc = decodeValue([
                        11,129,37,60,114,111,111,116,62,60,112,97,114,101,110,
                        116,62,60,99,104,105,108,100,32,105,100,61,34,99,49,34,
                        62,102,111,111,60,47,99,104,105,108,100,62,60,99,104,
                        105,108,100,32,105,100,61,34,99,50,34,62,98,97,114,60,
                        47,99,104,105,108,100,62,60,47,112,97,114,101,110,116,
                        62,60,47,114,111,111,116,62
                    ]);

                    expect(Ext.DomQuery.isXml(doc)).toBe(true);

                    expect(doc.firstChild.tagName).toBe('root');
                    expect(doc.firstChild.firstChild.tagName).toBe('parent');
                    expect(doc.firstChild.firstChild.firstChild.tagName).toBe('child');
                    expect(doc.firstChild.firstChild.firstChild.firstChild.nodeValue).toBe('foo');
                    expect(doc.firstChild.firstChild.firstChild.getAttribute('id')).toBe('c1');
                    expect(doc.firstChild.firstChild.childNodes[1].tagName).toBe('child');
                    expect(doc.firstChild.firstChild.childNodes[1].firstChild.nodeValue).toBe('bar');
                    expect(doc.firstChild.firstChild.childNodes[1].getAttribute('id')).toBe('c2');
                });

                it("should decode XML by reference", function() {
                    var xmlDocuments = decodeValue([
                        10,11,1,9,102,111,117,114,11,11,60,98,32,47,62,11,116,
                        104,114,101,101,11,11,60,97,32,47,62,7,116,119,111,11,2,
                        7,111,110,101,11,4,1
                    ]),
                        doc1 = xmlDocuments.one,
                        doc2 = xmlDocuments.two,
                        doc3 = xmlDocuments.three,
                        doc4 = xmlDocuments.four;

                    expect(Ext.DomQuery.isXml(doc1)).toBe(true);
                    expect(Ext.DomQuery.isXml(doc2)).toBe(true);
                    expect(Ext.DomQuery.isXml(doc3)).toBe(true);
                    expect(Ext.DomQuery.isXml(doc4)).toBe(true);
                    // doc1 and doc3 should be the same instance
                    expect(doc1).toBe(doc3);
                    // doc2 and doc4 should be the same instance
                    expect(doc2).toBe(doc4);
                    expect(doc1).not.toBe(doc2);
                    expect(doc3).not.toBe(doc4);
                });
            });

            describe("byte-array", function() {
                it("should decode a byte array", function() {
                    expect(decodeValue([
                        12,7,1,2,3
                    ])).toEqual([1,2,3])
                });

                it("should decode byte arrays by reference", function() {
                    var arrays = decodeValue([
                        9,9,1,12,7,1,2,3,12,7,4,5,6,12,2,12,4
                    ]);

                    expect(arrays[0]).toEqual([1,2,3]);
                    expect(arrays[1]).toEqual([4,5,6]);
                    expect(arrays[0]).toBe(arrays[2]);
                    expect(arrays[1]).toBe(arrays[3]);
                });
            });
        });
    });

    it("should decode an AMF0 packet", function() {
        var packet = new Ext.data.amf.Packet(),
            foo, message0, body0, message1;

        Ext.define('Ext.Foo', {
            alias: 'amf.Foo'
        });

        foo = new Ext.Foo();
        foo.bar = 'baz';

        packet.decode([
            0,0,0,3,0,1,97,0,0,0,0,0,2,0,1,98,0,1,99,0,0,0,0,0,2,0,1,100,0,1,
            101,0,0,0,0,0,2,0,1,102,0,2,0,13,109,115,103,49,47,111,110,82,101,
            115,117,108,116,0,4,110,117,108,108,0,0,0,0,3,0,3,100,98,108,0,64,
            86,128,163,215,10,61,113,0,11,116,121,112,101,100,79,98,106,101,99,
            116,16,0,3,70,111,111,0,3,98,97,114,2,0,3,98,97,122,0,0,9,0,9,101,
            99,109,97,65,114,114,97,121,8,0,0,0,0,0,1,97,2,0,1,49,0,1,99,2,0,1,
            51,0,1,98,2,0,1,50,0,0,9,0,4,100,97,116,101,11,66,115,190,228,31,
            192,0,0,0,0,0,7,105,110,116,101,103,101,114,0,64,69,0,0,0,0,0,0,0,4,
            110,111,110,101,5,0,5,117,110,100,101,102,6,0,3,111,98,106,3,0,1,97,
            0,63,240,0,0,0,0,0,0,0,1,98,0,64,0,0,0,0,0,0,0,0,0,9,0,3,102,108,
            115,1,0,0,11,120,109,108,68,111,99,117,109,101,110,116,15,0,0,0,82,
            60,114,111,111,116,62,60,112,97,114,101,110,116,62,60,99,104,105,
            108,100,32,105,100,61,34,99,49,34,62,102,111,111,60,47,99,104,105,
            108,100,62,60,99,104,105,108,100,32,105,100,61,34,99,50,34,62,98,97,
            114,60,47,99,104,105,108,100,62,60,47,112,97,114,101,110,116,62,60,
            47,114,111,111,116,62,0,3,115,116,114,2,0,6,115,101,110,99,104,97,0,
            11,115,116,114,105,99,116,65,114,114,97,121,10,0,0,0,3,0,63,240,0,0,
            0,0,0,0,0,64,0,0,0,0,0,0,0,0,64,8,0,0,0,0,0,0,0,3,116,114,117,1,1,0,
            0,9,0,13,109,115,103,50,47,111,110,82,101,115,117,108,116,0,4,110,
            117,108,108,0,0,0,0,3,0,4,116,101,120,116,2,0,5,104,101,108,108,111,
            0,0,9
        ]);

        message0 = packet.getMessages()[0];
        body0 = message0.body;
        message1 = packet.getMessages()[1];

        expect(packet.getVersion()).toBe(0);


        expect(packet.getHeaders().length).toBe(3);
        expect(packet.getHeaders()[0].name).toBe('a');
        expect(packet.getHeaders()[0].value).toBe('b');
        expect(packet.getHeaders()[1].name).toBe('c');
        expect(packet.getHeaders()[1].value).toBe('d');
        expect(packet.getHeaders()[2].name).toBe('e');
        expect(packet.getHeaders()[2].value).toBe('f');

        expect(packet.getMessages().length).toBe(2);
        expect(body0.integer).toBe(42);
        expect(body0.dbl).toBe(90.01);
        expect(body0.tru).toBe(true);
        expect(body0.fls).toBe(false);
        expect(body0.str).toBe('sencha');
        expect(body0.obj).toEqual({a: 1, b: 2});
        expect(body0.none).toBe(null);
        expect('undef' in message0.body).toBe(true);
        expect(body0.undef).toBeUndefined();
        expect(body0.ecmaArray).toEqual({ a: '1', b: '2', c: '3' });
        expect(body0.strictArray).toEqual([1, 2, 3]);
        expect(body0.date.getTime()).toEqual(1356912000000);
        expect(Ext.DomQuery.isXml(body0.xmlDocument)).toBe(true);
        expect(body0.xmlDocument.firstChild.tagName).toBe('root');
        expect(body0.typedObject).toEqual(foo);

        expect(message1.body).toEqual({
            text: 'hello'
        });

        //Ext.undefine('Ext.Foo');
        //Ext.Foo = nil;
        delete Ext.Foo;
    });

    it("should decode an AMF3 packet", function() {
        var packet = new Ext.data.amf.Packet(),
            foo, message0, body0, message1;

        Ext.define('Ext.Foo', {
            alias: 'amf.Foo'
        });

        foo = new Ext.Foo();
        foo.bar = 'baz';

        packet.decode([
            0,3,0,3,0,1,97,0,0,0,0,0,17,6,3,98,0,1,99,0,0,0,0,0,17,6,3,100,0,1,
            101,0,0,0,0,0,17,6,3,102,0,2,0,17,109,101,115,115,97,103,101,48,47,
            111,110,82,101,115,117,108,116,0,4,110,117,108,108,0,0,0,0,17,10,11,
            1,7,100,98,108,5,64,86,128,163,215,10,61,113,9,100,97,116,101,8,1,
            66,115,190,228,31,192,0,0,15,105,110,116,101,103,101,114,4,42,11,97,
            114,114,97,121,9,7,1,4,1,4,2,4,3,7,120,109,108,11,129,37,60,114,111,
            111,116,62,60,112,97,114,101,110,116,62,60,99,104,105,108,100,32,
            105,100,61,34,99,49,34,62,102,111,111,60,47,99,104,105,108,100,62,
            60,99,104,105,108,100,32,105,100,61,34,99,50,34,62,98,97,114,60,47,
            99,104,105,108,100,62,60,47,112,97,114,101,110,116,62,60,47,114,111,
            111,116,62,9,110,111,110,101,1,11,117,110,100,101,102,0,7,111,98,
            106,10,1,3,97,4,1,3,98,4,2,1,7,102,108,115,2,23,120,109,108,68,111,
            99,117,109,101,110,116,11,6,7,115,116,114,6,13,115,101,110,99,104,
            97,7,116,114,117,3,1,0,17,109,101,115,115,97,103,101,49,47,111,110,
            82,101,115,117,108,116,0,4,110,117,108,108,0,0,0,0,17,10,11,1,9,116,
            101,120,116,6,11,104,101,108,108,111,1
        ]);

        message0 = packet.getMessages()[0];
        body0 = message0.body;
        message1 = packet.getMessages()[1];

        expect(packet.getVersion()).toBe(3);

        expect(packet.getHeaders().length).toBe(3);
        expect(packet.getHeaders()[0].name).toBe('a');
        expect(packet.getHeaders()[0].value).toBe('b');
        expect(packet.getHeaders()[1].name).toBe('c');
        expect(packet.getHeaders()[1].value).toBe('d');
        expect(packet.getHeaders()[2].name).toBe('e');
        expect(packet.getHeaders()[2].value).toBe('f');

        expect(packet.getMessages().length).toBe(2);
        expect('undef' in message0.body).toBe(true);
        expect(body0.undef).toBeUndefined();
        expect(body0.none).toBe(null);
        expect(body0.fls).toBe(false);
        expect(body0.tru).toBe(true);
        expect(body0.integer).toBe(42);
        expect(body0.dbl).toBe(90.01);
        expect(body0.str).toBe('sencha');
        expect(Ext.DomQuery.isXml(body0.xmlDocument)).toBe(true);
        expect(body0.xmlDocument.firstChild.tagName).toBe('root');
        expect(body0.date.getTime()).toEqual(1356912000000);
        expect(body0.array).toEqual([1, 2, 3]);
        expect(body0.obj).toEqual({a: 1, b: 2});
        expect(Ext.DomQuery.isXml(body0.xml)).toBe(true);
        expect(body0.xml.firstChild.tagName).toBe('root');

        expect(message1.body).toEqual({
            text: 'hello'
        });

        //Ext.undefine('Ext.Foo');
        //Ext.Foo = nil;
        delete Ext.Foo;
    });

});