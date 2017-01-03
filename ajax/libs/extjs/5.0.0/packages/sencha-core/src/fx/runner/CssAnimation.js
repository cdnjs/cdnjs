/**
 * @author Jacky Nguyen <jacky@sencha.com>
 * @private
 */
Ext.define('Ext.fx.runner.CssAnimation', {
    extend: 'Ext.fx.runner.Css',

    constructor: function() {
        this.runningAnimationsMap = {};

        this.elementEndStates = {};

        this.animationElementMap = {};

        this.keyframesRulesCache = {};

        this.uniqueId = 0;

        return this.callParent(arguments);
    },

    attachListeners: function() {
        var eventDispatcher = this.getEventDispatcher();

        this.listenersAttached = true;

        eventDispatcher.addListener('element', '*', 'animationstart', 'onAnimationStart', this);
        eventDispatcher.addListener('element', '*', 'animationend', 'onAnimationEnd', this);
    },

    onAnimationStart: function(e) {
        var name = e.browserEvent.animationName,
            elementId = this.animationElementMap[name],
            animation = this.runningAnimationsMap[elementId][name],
            elementEndStates = this.elementEndStates,
            elementEndState = elementEndStates[elementId],
            data = {};

        console.log("START============= " + name);
        if (elementEndState) {
            delete elementEndStates[elementId];

            data[elementId] = elementEndState;

            this.applyStyles(data);
        }

        if (animation.before) {
            data[elementId] = animation.before;

            this.applyStyles(data);
        }
    },

    onAnimationEnd: function(e) {
        var element = e.target,
            name = e.browserEvent.animationName,
            animationElementMap = this.animationElementMap,
            elementId = animationElementMap[name],
            runningAnimationsMap = this.runningAnimationsMap,
            runningAnimations = runningAnimationsMap[elementId],
            animation = runningAnimations[name];

        console.log("END============= " + name);

        if (animation.onBeforeEnd) {
            animation.onBeforeEnd.call(animation.scope || this, element);
        }

        if (animation.onEnd) {
            animation.onEnd.call(animation.scope || this, element);
        }

        delete animationElementMap[name];
        delete runningAnimations[name];

        this.removeKeyframesRule(name);
    },

    generateAnimationId: function() {
        return 'animation-' + (++this.uniqueId);
    },

    run: function(animations) {
        var data = {},
            elementEndStates = this.elementEndStates,
            animationElementMap = this.animationElementMap,
            runningAnimationsMap = this.runningAnimationsMap,
            runningAnimations, states,
            elementId, animationId, i, ln, animation,
            name, runningAnimation,
            names, durations, easings, delays, directions, iterations;

        if (!this.listenersAttached) {
            this.attachListeners();
        }

        animations = Ext.Array.from(animations);

        for (i = 0,ln = animations.length; i < ln; i++) {
            animation = animations[i];

            animation = Ext.factory(animation, Ext.fx.Animation);
            elementId = animation.getElement().getId();
            animationId = animation.getName() || this.generateAnimationId();

            animationElementMap[animationId] = elementId;

            animation = animation.getData();
            states = animation.states;

            this.addKeyframesRule(animationId, states);

            runningAnimations = runningAnimationsMap[elementId];

            if (!runningAnimations) {
                runningAnimations = runningAnimationsMap[elementId] = {};
            }

            runningAnimations[animationId] = animation;

            names = [];
            durations = [];
            easings = [];
            delays = [];
            directions = [];
            iterations = [];

            for (name in runningAnimations) {
                if (runningAnimations.hasOwnProperty(name)) {
                    runningAnimation = runningAnimations[name];

                    names.push(name);
                    durations.push(runningAnimation.duration);
                    easings.push(runningAnimation.easing);
                    delays.push(runningAnimation.delay);
                    directions.push(runningAnimation.direction);
                    iterations.push(runningAnimation.iteration);
                }
            }

            data[elementId] = {
                'animation-name'            : names,
                'animation-duration'        : durations,
                'animation-timing-function' : easings,
                'animation-delay'           : delays,
                'animation-direction'       : directions,
                'animation-iteration-count' : iterations
            };

//            Ext.apply(data[elementId], animation.origin);

            if (animation.preserveEndState) {
                elementEndStates[elementId] = states['100%'];
            }
        }

        this.applyStyles(data);
    },

    addKeyframesRule: function(name, keyframes) {
        var percentage, properties,
            keyframesRule,
            styleSheet, rules, styles, rulesLength, key, value;

        styleSheet = this.getStyleSheet();
        rules = styleSheet.cssRules;
        rulesLength = rules.length;
        styleSheet.insertRule('@' + this.vendorPrefix + 'keyframes ' + name + '{}', rulesLength);

        keyframesRule = rules[rulesLength];

        for (percentage in keyframes) {
            properties = keyframes[percentage];

            rules = keyframesRule.cssRules;
            rulesLength = rules.length;

            styles = [];

            for (key in properties) {
                value = this.formatValue(properties[key], key);
                key = this.formatName(key);

                styles.push(key + ':' + value);
            }

            keyframesRule.insertRule(percentage + '{' + styles.join(';') + '}', rulesLength);
        }

        return this;
    },

    removeKeyframesRule: function(name) {
        var styleSheet = this.getStyleSheet(),
            rules = styleSheet.cssRules,
            i, ln, rule;

        for (i = 0,ln = rules.length; i < ln; i++) {
            rule = rules[i];

            if (rule.name === name) {
                styleSheet.removeRule(i);
                break;
            }
        }

        return this;
    }
});
