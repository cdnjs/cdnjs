/**
 * Recorder manager.
 * Used as a bookmarklet:
 *
 *    javascript:void(window.open("../ux/event/RecorderManager.html","recmgr"))
 */
Ext.define('Ext.ux.event.RecorderManager', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.eventrecordermanager',

    uses: [
        'Ext.ux.event.Recorder',
        'Ext.ux.event.Player'
    ],

    layout: 'fit',
    buttonAlign: 'left',

    eventsToIgnore: {
        mousemove: 1,
        mouseover: 1,
        mouseout: 1
    },

    bodyBorder: false,
    playSpeed: 1,

    initComponent: function () {
        var me = this;

        me.recorder = new Ext.ux.event.Recorder({
            attachTo: me.attachTo,
            listeners: {
                add: me.updateEvents,
                coalesce: me.updateEvents,
                buffer: 200,
                scope: me
            }
        });
        me.recorder.eventsToRecord = Ext.apply({}, me.recorder.eventsToRecord);

        function speed (text, value) {
            return {
                text: text,
                speed: value,
                group: 'speed',
                checked: value == me.playSpeed,
                handler: me.onPlaySpeed,
                scope: me
            };
        }

        me.tbar = [
            {
                text: 'Record',
                xtype: 'splitbutton',
                whenIdle: true,
                handler: me.onRecord,
                scope: me,
                menu: me.makeRecordButtonMenu()
            },
            {
                text: 'Play',
                xtype: 'splitbutton',
                whenIdle: true,
                handler: me.onPlay,
                scope: me,
                menu: [
                    speed('Recorded Speed (1x)', 1),
                    speed('Double Speed (2x)', 2),
                    speed('Quad Speed (4x)', 4),
                    '-',
                    speed('Full Speed', 1000)
                ]
            },
            {
                text: 'Clear',
                whenIdle: true,
                handler: me.onClear,
                scope: me
            },
            '->',
            {
                text: 'Stop',
                whenActive: true,
                disabled: true,
                handler: me.onStop,
                scope: me
            }
        ];

        var events = me.attachTo && me.attachTo.testEvents;
        me.items = [
            {
                xtype: 'textarea',
                itemId: 'eventView',
                fieldStyle: 'font-family: monospace',
                selectOnFocus: true,
                emptyText: 'Events go here!',
                value: events ? me.stringifyEvents(events) : '',
                scrollToBottom: function () {
                    var inputEl = this.inputEl.dom;
                    inputEl.scrollTop = inputEl.scrollHeight;
                }
            }
        ];
        me.fbar = [
            {
                xtype: 'tbtext',
                text: 'Attached To: ' + (me.attachTo && me.attachTo.location.href)
            }
        ];

        me.callParent();
    },

    makeRecordButtonMenu: function () {
        var ret = [],
            subs = {},
            eventsToRec = this.recorder.eventsToRecord,
            ignoredEvents = this.eventsToIgnore;

        Ext.Object.each(eventsToRec, function (name, value) {
            var sub = subs[value.kind];
            if (!sub) {
                subs[value.kind] = sub = [];
                ret.push({
                    text: value.kind,
                    menu: sub
                });
            }

            sub.push({
                text: name,
                checked: true,
                handler: function (menuItem) {
                    if (menuItem.checked) {
                        eventsToRec[name] = value;
                    } else {
                        delete eventsToRec[name];
                    }
                }
            });

            if (ignoredEvents[name]) {
                sub[sub.length - 1].checked = false;
                Ext.Function.defer(function () {
                    delete eventsToRec[name];
                }, 1);
            }
        });

        function less (lhs, rhs) {
            return (lhs.text < rhs.text) ? -1
                        : ((rhs.text < lhs.text) ? 1 : 0);
        }

        ret.sort(less);
        Ext.Array.each(ret, function (sub) {
            sub.menu.sort(less);
        });

        return ret;
    },

    getEventView: function () {
        return this.down('#eventView');
    },

    onClear: function () {
        var view = this.getEventView();
        view.setValue('');
    },

    onPlay: function () {
        var me = this,
            view = me.getEventView(),
            events = view.getValue();

        if (events) {
            events = Ext.decode(events);
            if (events.length) {
                me.player = Ext.create('Ext.ux.event.Player', {
                    attachTo: window.opener,
                    eventQueue: events,
                    listeners: {
                        stop: me.onPlayStop,
                        scope: me
                    }
                });

                me.player.start();
                me.syncBtnUI();
            }
        }
    },

    onPlayStop: function () {
        this.player = null;
        this.syncBtnUI();
    },

    onPlaySpeed: function (menuitem) {
        this.playSpeed = menuitem.speed;
    },

    onRecord: function () {
        this.recorder.start();
        this.syncBtnUI();
    },

    onStop: function () {
        var me = this;

        if (me.player) {
            me.player.stop();
            me.player = null;
        } else {
            me.recorder.stop();
        }
        me.syncBtnUI();
        me.updateEvents();
    },

    syncBtnUI: function () {
        var me = this,
            idle = !me.player && !me.recorder.active;

        Ext.each(me.query('[whenIdle]'), function (btn) {
            btn.setDisabled(!idle);
        });
        Ext.each(me.query('[whenActive]'), function (btn) {
            btn.setDisabled(idle);
        });

        var view = me.getEventView();
        view.setReadOnly(!idle);
    },

    stringifyEvents: function (events) {
        var line,
            lines = [];

        Ext.each(events, function (ev) {
            line = [];

            Ext.Object.each(ev, function (name, value) {
                if (line.length) {
                    line.push(', ');
                } else {
                    line.push('  { ');
                }
                line.push(name, ': ');
                line.push(Ext.encode(value));
            });

            line.push(' }');
            lines.push(line.join(''));
        });

        return '[\n' + lines.join(',\n') + '\n]';
    },

    updateEvents: function () {
        var me = this,
            text = me.stringifyEvents(me.recorder.getRecordedEvents()),
            view = me.getEventView();

        view.setValue(text);
        view.scrollToBottom();
    }
});
