/**
 * @private
 */
Ext.define('Ext.fx.animation.Abstract', {

    extend: 'Ext.Evented',

    isAnimation: true,

    requires: [
        'Ext.fx.State'
    ],

    config: {
        name: '',

        element: null,

        /**
         * @cfg
         * Before configuration.
         */
        before: null,

        from: {},

        to: {},

        after: null,

        states: {},

        duration:  300,

        /**
         * @cfg
         * Easing type.
         */
        easing: 'linear',

        iteration: 1,

        direction: 'normal',

        delay: 0,

        onBeforeStart: null,

        onEnd: null,

        onBeforeEnd: null,

        scope: null,

        reverse: null,

        preserveEndState: false,

        replacePrevious: true
    },

    STATE_FROM: '0%',

    STATE_TO: '100%',

    DIRECTION_UP: 'up',

    DIRECTION_DOWN: 'down',

    DIRECTION_LEFT: 'left',

    DIRECTION_RIGHT: 'right',

    stateNameRegex: /^(?:[\d\.]+)%$/,

    constructor: function() {
        this.states = {};

        this.callParent(arguments);

        return this;
    },

    applyElement: function(element) {
        return Ext.get(element);
    },

    applyBefore: function(before, current) {
        if (before) {
            return Ext.factory(before, Ext.fx.State, current);
        }
    },

    applyAfter: function(after, current) {
        if (after) {
            return Ext.factory(after, Ext.fx.State, current);
        }
    },

    setFrom: function(from) {
        return this.setState(this.STATE_FROM, from);
    },

    setTo: function(to) {
        return this.setState(this.STATE_TO, to);
    },

    getFrom: function() {
        return this.getState(this.STATE_FROM);
    },

    getTo: function() {
        return this.getState(this.STATE_TO);
    },

    setStates: function(states) {
        var validNameRegex = this.stateNameRegex,
            name;

        for (name in states) {
            if (validNameRegex.test(name)) {
                this.setState(name, states[name]);
            }
        }

        return this;
    },

    getStates: function() {
        return this.states;
    },

    stop: function() {
        this.fireEvent('stop', this);
    },

    destroy: function() {
        this.stop();
        this.callParent();
    },

    setState: function(name, state) {
        var states = this.getStates(),
            stateInstance;

        stateInstance = Ext.factory(state, Ext.fx.State, states[name]);

        if (stateInstance) {
            states[name] = stateInstance;
        }
        //<debug error>
        else if (name === this.STATE_TO) {
            Ext.Logger.error("Setting and invalid '100%' / 'to' state of: " + state);
        }
        //</debug>

        return this;
    },

    getState: function(name) {
        return this.getStates()[name];
    },

    getData: function() {
        var states = this.getStates(),
            statesData = {},
            before = this.getBefore(),
            after = this.getAfter(),
            from = states[this.STATE_FROM],
            to = states[this.STATE_TO],
            fromData = from.getData(),
            toData = to.getData(),
            data, name, state;

        for (name in states) {
            if (states.hasOwnProperty(name)) {
                state = states[name];
                data = state.getData();
                statesData[name] = data;
            }
        }

        if (Ext.browser.is.AndroidStock2) {
            statesData['0.0001%'] = fromData;
        }

        return {
            before: before ? before.getData() : {},
            after: after ? after.getData() : {},
            states: statesData,
            from: fromData,
            to: toData,
            duration: this.getDuration(),
            iteration: this.getIteration(),
            direction: this.getDirection(),
            easing: this.getEasing(),
            delay: this.getDelay(),
            onEnd: this.getOnEnd(),
            onBeforeEnd: this.getOnBeforeEnd(),
            onBeforeStart: this.getOnBeforeStart(),
            scope: this.getScope(),
            preserveEndState: this.getPreserveEndState(),
            replacePrevious: this.getReplacePrevious()
        };
    }
});
