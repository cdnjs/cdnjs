describe('Ext.app.bind.Template', function () {
    var BindTemplate;

    function getNumFragments (tpl) {
        var count = 0;
        for (var i = tpl.buffer.length; i-- > 0; ) {
            if (tpl.buffer[i]) {
                ++count;
            }
        }
        return count;
    }

    function getNumSlots (tpl) {
        var count = 0;
        for (var i = tpl.slots.length; i-- > 0; ) {
            if (tpl.slots[i]) {
                ++count;
            }
        }
        return count;
    }

    beforeEach(function () {
        BindTemplate = Ext.app.bind.Template;
    });

    describe('tokens', function () {
        it('should parse on first use', function () {
            var tpl = new BindTemplate('Hello {foo}');
            expect(tpl.tokens).toBe(null);

            var tokens = tpl.getTokens();
            expect(tokens).toEqual(['foo']);

            expect(getNumFragments(tpl)).toBe(1);
            expect(getNumSlots(tpl)).toBe(1);
        });

        it('should parse simple names', function () {
            var tpl = new BindTemplate('Hello {foo} {bar}');
            var tokens = tpl.getTokens();

            expect(tokens).toEqual(['foo', 'bar']);

            expect(getNumFragments(tpl)).toBe(2);
            expect(getNumSlots(tpl)).toBe(2);
        });

        it('should parse dotted names', function () {
            var tpl = new BindTemplate('Hello {foo.bar} {bar.foo}');
            var tokens = tpl.getTokens();

            expect(tokens).toEqual(['foo.bar', 'bar.foo']);

            expect(getNumFragments(tpl)).toBe(2);
            expect(getNumSlots(tpl)).toBe(2);
        });

        it('should parse indexes', function () {
            var tpl = new BindTemplate('Hello {1} {0}');
            var tokens = tpl.getTokens();

            expect(tokens).toEqual(['1', '0']);

            expect(getNumFragments(tpl)).toBe(2);
            expect(getNumSlots(tpl)).toBe(2);
        });

        it('should consolidate tokens', function () {
            var tpl = new BindTemplate('Hello {foo.bar} {bar} {foo.bar} {bar}');
            var tokens = tpl.getTokens();

            expect(tokens).toEqual(['foo.bar', 'bar']);

            expect(getNumFragments(tpl)).toBe(4);
            expect(getNumSlots(tpl)).toBe(4);
        });

        it('should match slots to consolidated tokens', function () {
            //                          1      2       3    4  5        6
            var tpl = new BindTemplate('Hello {foo.bar}{bar} - {foo.bar}{bar}');
            tpl.parse();

            expect(getNumFragments(tpl)).toBe(2);

            expect(tpl.slots[1].pos).toBe(0);
            expect(tpl.slots[2].pos).toBe(1);
            // slots[3] is null due to " - " in buffer[3]
            expect(tpl.slots[4].pos).toBe(0);
            expect(tpl.slots[5].pos).toBe(1);
        });
    });

    describe('default formatters', function () {
        it('should parse', function () {
            var tpl = new BindTemplate('Hello {foo:number} {bar.foo:date}');
            var tokens = tpl.getTokens();

            expect(tokens).toEqual(['foo', 'bar.foo']);

            expect(getNumSlots(tpl)).toBe(2);

            var i = 0,
                slot;

            expect(tpl.buffer[i++]).toBe('Hello ');

            slot = tpl.slots[i++];
            expect(slot.fmt).toBe('number');
            expect(slot.scope).toBe(Ext.util.Format);

            expect(tpl.buffer[i++]).toBe(' ');

            slot = tpl.slots[i++];
            expect(slot.fmt).toBe('date');
            expect(slot.scope).toBe(Ext.util.Format);
        });

        it('should parse arguments', function () {
            var tpl = new BindTemplate('Hello {foo:number(4)} {bar.foo:date(2,"true")}');
            var tokens = tpl.getTokens();

            expect(tokens).toEqual(['foo', 'bar.foo']);

            expect(getNumSlots(tpl)).toBe(2);

            var i = 0,
                slot;

            expect(tpl.buffer[i++]).toBe('Hello ');

            slot = tpl.slots[i++];
            expect(slot.fmt).toBe('number');
            expect(slot.scope).toBe(Ext.util.Format);
            // Remove [0] which is the placeholder for the value and make sure we have
            // recognized the argument values.
            expect(slot.args.slice(1)).toEqual([4]);

            expect(tpl.buffer[i++]).toBe(' ');

            slot = tpl.slots[i++];
            expect(slot.fmt).toBe('date');
            expect(slot.scope).toBe(Ext.util.Format);
            // Remove [0] which is the placeholder for the value and make sure we have
            // recognized the argument values.
            expect(slot.args.slice(1)).toEqual([2, 'true']);
        });

        it('should parse boolean arguments', function () {
            var tpl = new BindTemplate('Hello {foo:number(false)} {bar.foo:date(null,true)}');
            var tokens = tpl.getTokens();

            expect(tokens).toEqual(['foo', 'bar.foo']);

            expect(getNumSlots(tpl)).toBe(2);

            var i = 0,
                slot;

            expect(tpl.buffer[i++]).toBe('Hello ');

            slot = tpl.slots[i++];
            expect(slot.fmt).toBe('number');
            expect(slot.scope).toBe(Ext.util.Format);
            // Remove [0] which is the placeholder for the value and make sure we have
            // recognized the argument values.
            expect(slot.args.slice(1)).toEqual([false]);

            expect(tpl.buffer[i++]).toBe(' ');

            slot = tpl.slots[i++];
            expect(slot.fmt).toBe('date');
            expect(slot.scope).toBe(Ext.util.Format);
            // Remove [0] which is the placeholder for the value and make sure we have
            // recognized the argument values.
            expect(slot.args.slice(1)).toEqual([null, true]);
        });

        it('should apply simple formatting', function () {
            var tpl = new BindTemplate('Hello {foo:number} {bar.foo:date("Y-m-d")} '+
                                       '-- {foo:number("0.00")}');

            var s = tpl.apply([123.456, new Date(2013, 2, 2)]);
            expect(s).toBe('Hello 123.456 2013-03-02 -- 123.46');
        });

        it('should apply complex formatting', function () {
            // The "," inside a string argument makes splitting on commas and producing an
            // args array early impossible (if we are to respect global references in them
            // as well)... but still needs to work.
            var tpl = new BindTemplate('Hello {foo:number} {bar.foo:date("Y-m-d")} '+
                '-- {foo:number("0,000.00")}');

            var s = tpl.apply([123456.789, new Date(2013, 2, 2)]);
            expect(s).toBe('Hello 123456.789 2013-03-02 -- 123,456.79');
        });
    });

    describe('scoped formatters', function () {
        it('should parse', function () {
            var tpl = new BindTemplate('Hello {foo:this.number} {bar.foo:this.date}');
            var tokens = tpl.getTokens();

            expect(tokens).toEqual(['foo', 'bar.foo']);

            expect(getNumSlots(tpl)).toBe(2);

            var i = 0,
                slot;

            expect(tpl.buffer[i++]).toBe('Hello ');

            slot = tpl.slots[i++];
            expect(slot.fmt).toBe('number');
            expect(slot.scope).toBe(undefined);

            expect(tpl.buffer[i++]).toBe(' ');

            slot = tpl.slots[i++];
            expect(slot.fmt).toBe('date');
            expect(slot.scope).toBe(undefined);
        });

        it('should parse arguments', function () {
            var tpl = new BindTemplate('Hello {foo:this.number(4)} {bar.foo:this.date(2,"true")}');
            var tokens = tpl.getTokens();

            expect(tokens).toEqual(['foo', 'bar.foo']);

            expect(getNumSlots(tpl)).toBe(2);

            var i = 0,
                slot;

            expect(tpl.buffer[i++]).toBe('Hello ');

            slot = tpl.slots[i++];
            expect(slot.fmt).toBe('number');
            expect(slot.scope).toBe(undefined);
            // Remove [0] which is the placeholder for the value and make sure we have
            // recognized the argument values.
            expect(slot.args.slice(1)).toEqual([4]);

            expect(tpl.buffer[i++]).toBe(' ');

            slot = tpl.slots[i++];
            expect(slot.fmt).toBe('date');
            expect(slot.scope).toBe(undefined);
            // Remove [0] which is the placeholder for the value and make sure we have
            // recognized the argument values.
            expect(slot.args.slice(1)).toEqual([2, 'true']);
        });

        it('should apply simple formatting', function () {
            var tpl = new BindTemplate('Hello {foo:number} {bar.foo:date("Y-m-d")} '+
                '-- {foo:this.number("0.00")}');

            var s = tpl.apply([123.456, new Date(2013, 2, 2)], {
                scale: 2,
                number: function (v, str) {
                    return '[[' + Ext.util.Format.number(v * this.scale, str) + ']]';
                }
            });

            expect(s).toBe('Hello 123.456 2013-03-02 -- [[246.91]]');
        });

        it('should apply complex formatting', function () {
            // This template uses a global reference as an argument. Odd but it works in
            // other templates.
            var tpl = new BindTemplate('Hello {foo:number} {bar.foo:date("Y-m-d")} '+
                '-- {foo:this.thing(Ext.versions.core)}');

            var s = tpl.apply([123.456, new Date(2013, 2, 2)], {
                text: '::',
                thing: function (v, str) {
                    return this.text + v + '=' + str + this.text;
                }
            });

            expect(s).toBe('Hello 123.456 2013-03-02 -- ::123.456=' +
                    Ext.getVersion('core') + '::');
        });
    });

    describe('parseFormat', function () {
        it('should parse basic formats', function () {
            var fmt = BindTemplate.prototype.parseFormat('round');

            var s = fmt.format(3.14);

            expect(s).toBe(3);
        });

        it('should parse formats with basic arguments', function () {
            var fmt = BindTemplate.prototype.parseFormat('round(2)');

            var s = fmt.format(3.139);

            expect(s).toBe(3.14);
        });

        it('should parse formats with string arguments', function () {
            var fmt = BindTemplate.prototype.parseFormat('date("Y-m-d")');

            var s = fmt.format(new Date(2013, 2, 2));

            expect(s).toBe('2013-03-02');
        });
    });
});
