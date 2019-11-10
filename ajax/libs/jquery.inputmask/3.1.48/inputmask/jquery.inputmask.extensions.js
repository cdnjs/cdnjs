/*!
* jquery.inputmask.extensions.js
* http://github.com/RobinHerbots/jquery.inputmask
* Copyright (c) 2010 - 2014 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.1.48
*/
!function(factory) {
    "function" == typeof define && define.amd ? define([ "jquery", "./jquery.inputmask" ], factory) : factory(jQuery);
}(function($) {
    return $.extend($.inputmask.defaults.definitions, {
        A: {
            validator: "[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
            cardinality: 1,
            casing: "upper"
        },
        "#": {
            validator: "[0-9A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
            cardinality: 1,
            casing: "upper"
        }
    }), $.extend($.inputmask.defaults.aliases, {
        url: {
            mask: "ir",
            placeholder: "",
            separator: "",
            defaultPrefix: "http://",
            regex: {
                urlpre1: new RegExp("[fh]"),
                urlpre2: new RegExp("(ft|ht)"),
                urlpre3: new RegExp("(ftp|htt)"),
                urlpre4: new RegExp("(ftp:|http|ftps)"),
                urlpre5: new RegExp("(ftp:/|ftps:|http:|https)"),
                urlpre6: new RegExp("(ftp://|ftps:/|http:/|https:)"),
                urlpre7: new RegExp("(ftp://|ftps://|http://|https:/)"),
                urlpre8: new RegExp("(ftp://|ftps://|http://|https://)")
            },
            definitions: {
                i: {
                    validator: function() {
                        return !0;
                    },
                    cardinality: 8,
                    prevalidator: function() {
                        for (var result = [], prefixLimit = 8, i = 0; prefixLimit > i; i++) result[i] = function() {
                            var j = i;
                            return {
                                validator: function(chrs, maskset, pos, strict, opts) {
                                    if (opts.regex["urlpre" + (j + 1)]) {
                                        var k, tmp = chrs;
                                        j + 1 - chrs.length > 0 && (tmp = maskset.buffer.join("").substring(0, j + 1 - chrs.length) + "" + tmp);
                                        var isValid = opts.regex["urlpre" + (j + 1)].test(tmp);
                                        if (!strict && !isValid) {
                                            for (pos -= j, k = 0; k < opts.defaultPrefix.length; k++) maskset.buffer[pos] = opts.defaultPrefix[k], 
                                            pos++;
                                            for (k = 0; k < tmp.length - 1; k++) maskset.buffer[pos] = tmp[k], pos++;
                                            return {
                                                pos: pos
                                            };
                                        }
                                        return isValid;
                                    }
                                    return !1;
                                },
                                cardinality: j
                            };
                        }();
                        return result;
                    }()
                },
                r: {
                    validator: ".",
                    cardinality: 50
                }
            },
            insertMode: !1,
            autoUnmask: !1
        },
        ip: {
            mask: "i[i[i]].i[i[i]].i[i[i]].i[i[i]]",
            definitions: {
                i: {
                    validator: function(chrs, maskset, pos) {
                        return pos - 1 > -1 && "." != maskset.buffer[pos - 1] ? (chrs = maskset.buffer[pos - 1] + chrs, 
                        chrs = pos - 2 > -1 && "." != maskset.buffer[pos - 2] ? maskset.buffer[pos - 2] + chrs : "0" + chrs) : chrs = "00" + chrs, 
                        new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]").test(chrs);
                    },
                    cardinality: 1
                }
            }
        },
        email: {
            mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,64}]@*{1,64}[.*{2,64}][.*{2,6}][.*{1,2}]",
            greedy: !1,
            onBeforePaste: function(pastedValue) {
                return pastedValue = pastedValue.toLowerCase(), pastedValue.replace("mailto:", "");
            },
            definitions: {
                "*": {
                    validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~-]",
                    cardinality: 1,
                    casing: "lower"
                }
            }
        }
    }), $.fn.inputmask;
});