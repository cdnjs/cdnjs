/*
 * @license Multi Input Mask plugin for jquery
 * https://github.com/andr-04/inputmask-multi
 * Copyright (c) 2012-2016 Andrey Egorov
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 * Version: 1.1.1
 *
 * Requriements:
 * https://github.com/RobinHerbots/jquery.inputmask
 * https://github.com/private-face/jquery.bind-first
 */
(function ($) {
    $.masksLoad = function(url) {
        var maskList;
        $.ajax({
            url: url,
            async: false,
            dataType: 'json',
            success: function (response) {
                maskList = response;
            }
        });
        return maskList;
    }

    $.masksSort = function(maskList, defs, match, key) {
        maskList.sort(function (a, b) {
            var ia = 0, ib = 0;
            for (; (ia<a[key].length && ib<b[key].length);) {
                var cha = a[key].charAt(ia);
                var chb = b[key].charAt(ib);
                if (!match.test(cha)) {
                    ia++;
                    continue;
                }
                if (!match.test(chb)) {
                    ib++;
                    continue;
                }
                if ($.inArray(cha, defs) != -1 && $.inArray(chb, defs) == -1) {
                    return 1;
                }
                if ($.inArray(cha, defs) == -1 && $.inArray(chb, defs) != -1) {
                    return -1;
                }
                if ($.inArray(cha, defs) == -1 && $.inArray(chb, defs) == -1) {
                    if (cha != chb) {
                        return cha < chb ? -1 : 1;
                    }
                }
                ia++;
                ib++;
            }
            for (; (ia<a[key].length || ib<b[key].length);) {
                if (ia<a[key].length && !match.test(a[key].charAt(ia))) {
                    ia++;
                    continue;
                }
                if (ib<b[key].length && !match.test(b[key].charAt(ib))) {
                    ib++;
                    continue;
                }
                if (ia<a[key].length) {
                    return 1;
                }
                if (ib<b[key].length) {
                    return -1;
                }
            }
            return 0;
        });
        return maskList;
    }

    //Helper Functions
    var caret = function(begin, end) {
        if (typeof begin == 'number') {
            end = (typeof end == 'number') ? end : begin;
            if (this.setSelectionRange) {
                this.setSelectionRange(begin, end);
            } else if (this.createTextRange) {
                var range = this.createTextRange();
                range.collapse(true);
                range.moveEnd('character', end);
                range.moveStart('character', begin);
                range.select();
            }
        } else {
            if (this.setSelectionRange) {
                begin = this.selectionStart;
                end = this.selectionEnd;
            } else if (document.selection && document.selection.createRange) {
                var range = document.selection.createRange();
                begin = 0 - range.duplicate().moveStart('character', -100000);
                end = begin + range.text.length;
            }
            return {
                begin: begin,
                end: end
            };
        }
    };

    var keys = Object.keys || function(obj) {
        if (obj !== Object(obj)) {
            throw new TypeError('Invalid object');
        }
        var keys = [];
        for (var key in obj) {
            keys[keys.length] = key;
        }
        return keys;
    };

    var maskMatch = function(text) {
        var maskOpts = this.inputmasks.options;
        var mtxt = "";
        for (var i=0; i<text.length; i++) {
            var ch = text.charAt(i);
            if (ch == this.inputmasks.placeholder) {
                break;
            }
            if (maskOpts.match.test(ch)) {
                mtxt += ch;
            }
        }
        for (var mid in maskOpts.list) {
            var mask = maskOpts.list[mid][maskOpts.listKey];
            var pass = true;
            for (var it=0, im=0; (it<mtxt.length && im<mask.length);) {
                var chm = mask.charAt(im);
                var cht = mtxt.charAt(it);
                if (!maskOpts.match.test(chm) && !(chm in this.inputmasks.defs)) {
                    im++;
                    continue;
                }
                if (((chm in this.inputmasks.defs) && this.inputmasks.defs[chm].test(cht)) || (cht == chm)) {
                    it++;
                    im++;
                } else {
                    pass = false;
                    break;
                }
            }
            if (pass && it==mtxt.length) {
                var determined = mask.substr(im).search(maskOpts.match) == -1;
                mask = mask.replace(new RegExp([maskOpts.match.source].concat(keys(this.inputmasks.defs)).join('|'), 'g'), maskOpts.replace);
                var completed = mask.substr(im).search(maskOpts.replace) == -1;
                return {
                    mask: mask,
                    obj: maskOpts.list[mid],
                    determined: determined,
                    completed: completed
                };
            }
        }
        return false;
    }

    var caretApply = function(oldMask, newMask, oldPos) {
        var maskOpts = this.inputmasks.options;
        if (!oldMask) {
            return 0;
        }
        var pos = 0, startPos = 0;
        for (; pos < oldPos.begin; pos++) {
            if (oldMask.charAt(pos) == maskOpts.replace) {
                startPos++;
            }
        }
        var endPos = 0;
        for (; pos < oldPos.end; pos++) {
            if (oldMask.charAt(pos) == maskOpts.replace) {
                endPos++;
            }
        }
        for (pos = 0; (pos < newMask.length && (startPos > 0 || newMask.charAt(pos) != maskOpts.replace)); pos++) {
            if (newMask.charAt(pos) == maskOpts.replace) {
                startPos--;
            }
        }
        startPos = pos;
        for (; (pos < newMask.length && endPos > 0); pos++) {
            if (newMask.charAt(pos) == maskOpts.replace) {
                endPos--;
            }
        }
        endPos = pos;
        return {
            begin: startPos,
            end: endPos
        };
    }

    var maskUnbind = function() {
        $(this).unbind(".inputmasks");
    }

    var maskRebind = function() {
        maskUnbind.call(this);
        $(this)
        .bindFirst("keypress.inputmasks", masksKeyPress)
        .bindFirst("input.inputmasks", masksPaste)
        .bindFirst("paste.inputmasks", masksPaste)
        .bindFirst("dragdrop.inputmasks", masksPaste)
        .bindFirst("drop.inputmasks", masksPaste)
        .bindFirst("keydown.inputmasks", masksKeyDown)
        .bindFirst("setvalue.inputmasks", masksSetValue)
        .bind("blur.inputmasks", masksChange);
    }

    var maskApply = function(match, newtext) {
        var maskOpts = this.inputmasks.options;
        if (match && (newtext !== undefined || match.mask != this.inputmasks.oldmatch.mask)) {
            var caretPos;
            if (newtext === undefined) {
                caretPos = caretApply.call(this, this.inputmasks.oldmatch.mask, match.mask, caret.call(this));
            }
            if (newtext !== undefined) {
                if (this.inputmask) {
                    this.inputmask.remove();
                }
                this.value = newtext;
            }
            $(this).inputmask(match.mask, $.extend(true, maskOpts.inputmask, {
                insertMode: this.inputmasks.insertMode
            }));
            if (newtext === undefined) {
                caret.call(this, caretPos.begin, caretPos.end);
            }
        }
        this.inputmasks.oldmatch = match;
        maskOpts.onMaskChange.call(this, match.obj, match.determined);
        return true;
    }

    var keyboardApply = function(e, text, insert) {
        var match = maskMatch.call(this, text);
        if (!match || match.obj != this.inputmasks.oldmatch.obj || match.determined != this.inputmasks.oldmatch.determined) {
            if (match) {
                maskUnbind.call(this);
                if (insert) {
                    maskApply.call(this, match);
                    $(this).trigger(e);
                } else {
                    $(this).trigger(e);
                    maskApply.call(this, match);
                }
                maskRebind.call(this);
            }
            e.stopImmediatePropagation();
            return false;
        }
        return true;
    }

    var masksKeyDown = function(e) {
        var maskOpts = this.inputmasks.options;
        e = e || window.event;
        var k = e.which || e.charCode || e.keyCode;
        if (k == 8 || k == 46 || (this.inputmasks.iphone && k == 127)) { // delete or backspace
            var text = this.inputmask._valueGet();
            var caretPos = caret.call(this);
            if (caretPos.begin == caretPos.end || (!this.inputmasks.insertMode && caretPos.begin == caretPos.end-1)) {
                var pos = caretPos.begin;
                do {
                    if (k != 46) { // backspace
                        pos--;
                    }
                    var chr = text.charAt(pos);
                    text = text.substring(0, pos) + text.substring(pos+1);
                } while (pos>0 && pos<text.length && chr != this.inputmasks.placeholder && !maskOpts.match.test(chr));
            } else {
                var test = text.substring(0, caretPos.begin) + text.substring(caretPos.end);
                if (test.search(maskOpts.match) == -1) {
                    text = test;
                }
            }
            return keyboardApply.call(this, e, text, false);
        }
        if (k == 45) { // insert
            this.inputmasks.insertMode = !this.inputmasks.insertMode;
        }
        return true;
    }

    var masksKeyPress = function(e) {
        var text = this.inputmask._valueGet();
        e = e || window.event;
        var k = e.which || e.charCode || e.keyCode, c = String.fromCharCode(k);
        caretPos = caret.call(this);
        text = text.substring(0, caretPos.begin) + c + text.substring(caretPos.end);
        return keyboardApply.call(this, e, text, true);
    }

    var masksChange = function(e) {
        var match = maskMatch.call(this, this.inputmask._valueGet());
        maskApply.call(this, match);
        maskRebind.call(this);
        return true;
    }

    var masksSetValue = function(e) {
        maskInit.call(this);
        e.stopImmediatePropagation();
        return true;
    }

    var maskInit = function() {
        var text;
        if (this.inputmask && this.inputmask._valueGet) {
            text = this.inputmask._valueGet();
        } else {
            text = this.value;
        }
        var match = maskMatch.call(this, text);
        while (!match && text.length>0) {
            text = text.substr(0, text.length-1);
            match = maskMatch.call(this, text);
        }
        maskApply.call(this, match, text);
        maskRebind.call(this);
    }

    var masksPaste = function(e) {
        var input = this;
        setTimeout(function() {
            maskInit.call(input);
        }, 0);
        e.stopImmediatePropagation();
        return true;
    }

    var maskStart = function(maskOpts) {
        maskOpts = $.extend(true, {
            onMaskChange: $.noop
        }, maskOpts);
        var defs = {};
        for (var def in maskOpts.inputmask.definitions) {
            var validator = maskOpts.inputmask.definitions[def].validator;
            switch (typeof validator) {
                case "string":
                    defs[def] = new RegExp(validator);
                    break;
                case "object":
                    if ("test" in maskOpts.definitions[def].validator) {
                        defs[def] = validator;
                    }
                    break;
                case "function":
                    defs[def] = {
                        test: validator
                    };
                    break;
            }
        }
        maskOpts.inputmask.definitions[maskOpts.replace] = {
            validator: maskOpts.match.source,
            cardinality: 1
        };

        if (this.inputmasks) {
            $(this).inputmasks("remove");
        }

        this.inputmasks = {}
        this.inputmasks.options = maskOpts;
        this.inputmasks.defs = defs;
        this.inputmasks.iphone = navigator.userAgent.match(/iphone/i) != null;
        this.inputmasks.oldmatch = false;
        this.inputmasks.placeholder = maskOpts.inputmask.placeholder || Inputmask.prototype.defaults.placeholder;
        this.inputmasks.insertMode =  maskOpts.inputmask.insertMode || Inputmask.prototype.defaults.insertMode;

        maskInit.call(this);
    }

    $.fn.inputmasks = function(fn) {
        switch (fn) {
            case "remove":
                maskUnbind.call(this);
                this.inputmasks = undefined;
                $(this).inputmask("remove");
                break;
            case "isCompleted":
                var res = maskMatch.call(this[0], (this[0].inputmask && this[0].inputmask._valueGet()) || this[0].value);
                return (res && res.completed);
            default:
                this.each(function () {
                    maskStart.call(this, fn);
                });
                return this;
        }
    }

})(jQuery);
