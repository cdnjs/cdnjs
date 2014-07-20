/**
 * @author Jacky Nguyen <jacky@sencha.com>
 * @private
 */
Ext.define('Ext.fx.runner.CssTransition', {
    extend: 'Ext.fx.runner.Css',
    requires: ['Ext.AnimationQueue'],

    listenersAttached: false,

    constructor: function() {
        this.runningAnimationsData = {};

        return this.callParent(arguments);
    },

    attachListeners: function() {
        this.listenersAttached = true;
        this.getEventDispatcher().addListener('element', '*', 'transitionend', 'onTransitionEnd', this);
    },

    onTransitionEnd: function(e) {
        var target = e.target,
            id = target.id;

        if (id && this.runningAnimationsData.hasOwnProperty(id)) {
            this.refreshRunningAnimationsData(Ext.get(target), [e.browserEvent.propertyName]);
        }
    },

    onAnimationEnd: function(element, data, animation, isInterrupted, isReplaced) {
        var id = element.getId(),
            runningData = this.runningAnimationsData[id],
            endRules = {},
            endData = {},
            runningNameMap, toPropertyNames, i, ln, name;

        animation.un('stop', 'onAnimationStop', this);

        if (runningData) {
            runningNameMap = runningData.nameMap;
        }

        endRules[id] = endData;

        if (data.onBeforeEnd) {
            data.onBeforeEnd.call(data.scope || this, element, isInterrupted);
        }

        animation.fireEvent('animationbeforeend', animation, element, isInterrupted);
        this.fireEvent('animationbeforeend', this, animation, element, isInterrupted);

        if (isReplaced || (!isInterrupted && !data.preserveEndState)) {
            toPropertyNames = data.toPropertyNames;

            for (i = 0,ln = toPropertyNames.length; i < ln; i++) {
                name = toPropertyNames[i];

                if (runningNameMap && !runningNameMap.hasOwnProperty(name)) {
                    endData[name] = null;
                }
            }
        }

        if (data.after) {
            Ext.merge(endData, data.after);
        }

        this.applyStyles(endRules);

        if (data.onEnd) {
            data.onEnd.call(data.scope || this, element, isInterrupted);
        }

        animation.fireEvent('animationend', animation, element, isInterrupted);
        this.fireEvent('animationend', this, animation, element, isInterrupted);
        Ext.AnimationQueue.stop(Ext.emptyFn, animation);
    },

    onAllAnimationsEnd: function(element) {
        var id = element.getId(),
            endRules = {};

        delete this.runningAnimationsData[id];

        endRules[id] = {
            'transition-property': null,
            'transition-duration': null,
            'transition-timing-function': null,
            'transition-delay': null
        };

        this.applyStyles(endRules);
        this.fireEvent('animationallend', this, element);
    },

    hasRunningAnimations: function(element) {
        var id = element.getId(),
            runningAnimationsData = this.runningAnimationsData;

        return runningAnimationsData.hasOwnProperty(id) && runningAnimationsData[id].sessions.length > 0;
    },

    refreshRunningAnimationsData: function(element, propertyNames, interrupt, replace) {
        var id = element.getId(),
            runningAnimationsData = this.runningAnimationsData,
            runningData = runningAnimationsData[id];

        if (!runningData) {
            return;
        }

        var nameMap = runningData.nameMap,
            nameList = runningData.nameList,
            sessions = runningData.sessions,
            ln, j, subLn, name,
            i, session, map, list,
            hasCompletedSession = false;

        interrupt = Boolean(interrupt);
        replace = Boolean(replace);

        if (!sessions) {
            return this;
        }

        ln = sessions.length;

        if (ln === 0) {
            return this;
        }

        if (replace) {
            runningData.nameMap = {};
            nameList.length = 0;

            for (i = 0; i < ln; i++) {
                session = sessions[i];
                this.onAnimationEnd(element, session.data, session.animation, interrupt, replace);
            }

            sessions.length = 0;
        }
        else {
            for (i = 0; i < ln; i++) {
                session = sessions[i];
                map = session.map;
                list = session.list;

                for (j = 0,subLn = propertyNames.length; j < subLn; j++) {
                    name = propertyNames[j];

                    if (map[name]) {
                        delete map[name];
                        Ext.Array.remove(list, name);
                        session.length--;
                        if (--nameMap[name] == 0) {
                            delete nameMap[name];
                            Ext.Array.remove(nameList, name);
                        }
                    }
                }

                if (session.length == 0) {
                    sessions.splice(i, 1);
                    i--;
                    ln--;

                    hasCompletedSession = true;
                    this.onAnimationEnd(element, session.data, session.animation, interrupt);
                }
            }
        }

        if (!replace && !interrupt && sessions.length == 0 && hasCompletedSession) {
            this.onAllAnimationsEnd(element);
        }
    },

    getRunningData: function(id) {
        var runningAnimationsData = this.runningAnimationsData;

        if (!runningAnimationsData.hasOwnProperty(id)) {
            runningAnimationsData[id] = {
                nameMap: {},
                nameList: [],
                sessions: []
            };
        }

        return runningAnimationsData[id];
    },

    getTestElement: function() {
        var testElement = this.testElement,
            iframe, iframeDocument, iframeStyle;

        if (!testElement) {
            iframe = document.createElement('iframe');
            iframeStyle = iframe.style;
            iframeStyle.setProperty('visibility', 'hidden', 'important');
            iframeStyle.setProperty('width', '0px', 'important');
            iframeStyle.setProperty('height', '0px', 'important');
            iframeStyle.setProperty('position', 'absolute', 'important');
            iframeStyle.setProperty('border', '0px', 'important');
            iframeStyle.setProperty('zIndex', '-1000', 'important');

            document.body.appendChild(iframe);
            iframeDocument = iframe.contentDocument;

            iframeDocument.open();
            iframeDocument.writeln('</body>');
            iframeDocument.close();

            this.testElement = testElement = iframeDocument.createElement('div');
            testElement.style.setProperty('position', 'absolute', 'important');
            iframeDocument.body.appendChild(testElement);
            this.testElementComputedStyle = window.getComputedStyle(testElement);
        }

        return testElement;
    },

    getCssStyleValue: function(name, value) {
        var testElement = this.getTestElement(),
            computedStyle = this.testElementComputedStyle,
            style = testElement.style;

        style.setProperty(name, value);

        if (Ext.browser.is.Firefox) {
            // We force a repaint of the element in Firefox to make sure the computedStyle to be updated
            testElement.offsetHeight;
        }

        value = computedStyle.getPropertyValue(name);
        style.removeProperty(name);

        return value;
    },

    run: function(animations) {
        var me = this,
            isLengthPropertyMap = this.lengthProperties,
            fromData = {},
            toData = {},
            data = {},
            element, elementId, from, to, before,
            fromPropertyNames, toPropertyNames,
            doApplyTo, message,
            runningData, elementData,
            i, j, ln, animation, propertiesLength, sessionNameMap,
            computedStyle, formattedName, name, toFormattedValue,
            computedValue, fromFormattedValue, isLengthProperty,
            runningNameMap, runningNameList, runningSessions, runningSession;

        if (!this.listenersAttached) {
            this.attachListeners();
        }

        animations = Ext.Array.from(animations);

        for (i = 0,ln = animations.length; i < ln; i++) {
            animation = animations[i];
            animation = Ext.factory(animation, Ext.fx.Animation);
            element = animation.getElement();

            // Empty function to prevent idleTasks from running while we animate.
            Ext.AnimationQueue.start(Ext.emptyFn, animation);

            computedStyle = window.getComputedStyle(element.dom);

            elementId = element.getId();

            data = Ext.merge({}, animation.getData());

            if (animation.onBeforeStart) {
                animation.onBeforeStart.call(animation.scope || this, element);
            }
            animation.fireEvent('animationstart', animation);
            this.fireEvent('animationstart', this, animation);

            data[elementId] = data;

            before = data.before;
            from = data.from;
            to = data.to;

            data.fromPropertyNames = fromPropertyNames = [];
            data.toPropertyNames = toPropertyNames = [];

            for (name in to) {
                if (to.hasOwnProperty(name)) {
                    to[name] = toFormattedValue = this.formatValue(to[name], name);
                    formattedName = this.formatName(name);
                    isLengthProperty = isLengthPropertyMap.hasOwnProperty(name);

                    if (!isLengthProperty) {
                        toFormattedValue = this.getCssStyleValue(formattedName, toFormattedValue);
                    }

                    if (from.hasOwnProperty(name)) {
                        from[name] = fromFormattedValue = this.formatValue(from[name], name);

                        if (!isLengthProperty) {
                            fromFormattedValue = this.getCssStyleValue(formattedName, fromFormattedValue);
                        }

                        if (toFormattedValue !== fromFormattedValue) {
                            fromPropertyNames.push(formattedName);
                            toPropertyNames.push(formattedName);
                        }
                    }
                    else {
                        computedValue = computedStyle.getPropertyValue(formattedName);

                        if (toFormattedValue !== computedValue) {
                            toPropertyNames.push(formattedName);
                        }
                    }
                }
            }

            propertiesLength = toPropertyNames.length;

            if (propertiesLength === 0) {
                this.onAnimationEnd(element, data, animation);
                continue;
            }

            runningData = this.getRunningData(elementId);
            runningSessions = runningData.sessions;

            if (runningSessions.length > 0) {
                this.refreshRunningAnimationsData(
                    element, Ext.Array.merge(fromPropertyNames, toPropertyNames), true, data.replacePrevious
                );
            }

            runningNameMap = runningData.nameMap;
            runningNameList = runningData.nameList;

            sessionNameMap = {};
            for (j = 0; j < propertiesLength; j++) {
                name = toPropertyNames[j];
                sessionNameMap[name] = true;

                if (!runningNameMap.hasOwnProperty(name)) {
                    runningNameMap[name] = 1;
                    runningNameList.push(name);
                }
                else {
                    runningNameMap[name]++;
                }
            }

            runningSession = {
                element: element,
                map: sessionNameMap,
                list: toPropertyNames.slice(),
                length: propertiesLength,
                data: data,
                animation: animation
            };
            runningSessions.push(runningSession);

            animation.on('stop', 'onAnimationStop', this);

            elementData = Ext.apply({}, before);
            Ext.apply(elementData, from);

            if (runningNameList.length > 0) {
                fromPropertyNames = Ext.Array.difference(runningNameList, fromPropertyNames);
                toPropertyNames = Ext.Array.merge(fromPropertyNames, toPropertyNames);
                elementData['transition-property'] = fromPropertyNames;
            }

            fromData[elementId] = elementData;
            toData[elementId] = Ext.apply({}, to);

            toData[elementId]['transition-property'] = toPropertyNames;
            toData[elementId]['transition-duration'] = data.duration;
            toData[elementId]['transition-timing-function'] = data.easing;
            toData[elementId]['transition-delay'] = data.delay;

            animation.startTime = Date.now();
        }

        message = this.$className;

        this.applyStyles(fromData);

        doApplyTo = function(e) {
            if (e.data === message && e.source === window) {
                window.removeEventListener('message', doApplyTo, false);
                me.applyStyles(toData);
            }
        };

        if(Ext.browser.is.IE) {
            Ext.Function.requestAnimationFrame(function() {
                window.addEventListener('message', doApplyTo, false);
                window.postMessage(message, '*');
            });
        }else{
            window.addEventListener('message', doApplyTo, false);
            window.postMessage(message, '*');
        }
    },

    onAnimationStop: function(animation) {
        var runningAnimationsData = this.runningAnimationsData,
            id, runningData, sessions, i, ln, session;

        for (id in runningAnimationsData) {
            if (runningAnimationsData.hasOwnProperty(id)) {
                runningData = runningAnimationsData[id];
                sessions = runningData.sessions;

                for (i = 0,ln = sessions.length; i < ln; i++) {
                    session = sessions[i];
                    if (session.animation === animation) {
                        this.refreshRunningAnimationsData(session.element, session.list.slice(), false);
                    }
                }
            }
        }
    }
});
