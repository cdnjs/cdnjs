/*!
AniJS - http://anijs.github.io
Licensed under the MIT license

Copyright (c) 2014 Dariel Noel <darielnoel@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

(function(root, factory) {
    "use strict";
    if (typeof module == "object" && typeof module.exports == "object") {
        module.exports = root.document ?
            factory(root, true) :
            function(w) {
                if (!w.document) {
                    throw new Error("AniJS-RWWD");
                }
                return factory(w);
        };
    } else {
        factory(root);
    }

})(typeof window !== "undefined" ? window : this, function(window, noGlobal) {


    /**
     * AniJS is library for write declarative animations in your static html documents
     * @class AniJSit
     * @constructor init
     * @author @dariel_noel
     */
    var AniJS = (function(AniJS) {

        //Shorthands
        var ANIJS_DATATAG_NAME = 'data-anijs',
            DEFAULT = 'default',
            BODY = 'body',
            PARAMS_SEPARATOR = '|',
            MULTIPLE_CLASS_SEPARATOR = '$',
            EVENT_RESERVED_WORD = 'if',
            EVENT_TARGET_RESERVED_WORD = 'on',
            BEHAVIOR_RESERVED_WORD = ['do', 'after', 'before', 'to'],
            BEHAVIOR_TARGET_RESERVED_WORD = 'to',
            REGEX_BEGIN = '(\\s+|^)',
            REGEX_END = '(\\s+|$)',
            ANIMATION_END = 'animationend',
            TRANSITION_END = 'transitionend',
            TARGET = 'target';

        /////////////////////////////////////////////////////////
        // Public API
        /////////////////////////////////////////////////////////

        AniJS = {

            rootDOMTravelScope: {},

            notifierCollection: {},

            /**
             * Initializer Function
             * @method init
             * @return
             */
            init: function() {

                //ATTRS inicialization
                selfish._helperCollection = {};

                var defaultHelper = selfish._createDefaultHelper();

                //Registering an empty helper
                AniJS.registerHelper(DEFAULT, defaultHelper);

                //Default Helper Index
                selfish._helperDefaultIndex = DEFAULT;

                AniJS.rootDOMTravelScope = document;

                //Initialize the Parser Object
                AniJS.Parser = selfish.Parser;

                //AnimationEnd Correct Prefix Setup
                selfish._animationEndEvent = selfish._animationEndPrefix();

                //Add this class names when anim
                selfish._classNamesWhenAnim = '';
            },

            /**
             * You can use these to change the scope to run AniJS
             * @method setDOMRootTravelScope
             * @param {} selector
             * @return
             */
            setDOMRootTravelScope: function(selector) {
                var rootDOMTravelScope,
                    domDocument = document;
                try {
                    if (selector === 'document') {
                        rootDOMTravelScope = domDocument;
                    } else {
                        rootDOMTravelScope = domDocument.querySelector(selector);
                        if (!rootDOMTravelScope) {
                            rootDOMTravelScope = domDocument;
                        }
                    }

                } catch (e) {
                    rootDOMTravelScope = domDocument;
                }
                AniJS.rootDOMTravelScope = rootDOMTravelScope;
            },

            /**
             * Parse Declarations and setup Anim in a founded elements
             * @method run
             * @return
             */
            run: function() {
                var aniJSNodeCollection = [],
                    aniJSParsedSentenceCollection = {};

                //Clear all node listener
                AniJS.purgeAll();

                AniJS.notifierCollection = {};

                aniJSNodeCollection = selfish._findAniJSNodeCollection(AniJS.rootDOMTravelScope);

                var size = aniJSNodeCollection.length,
                    i = 0,
                    item;

                for (i; i < size; i++) {
                    item = aniJSNodeCollection[i];

                    //IMPROVE: The datatag name migth come from configuration
                    aniJSParsedSentenceCollection = selfish._getParsedAniJSSentenceCollection(item.getAttribute(ANIJS_DATATAG_NAME));

                    //Le seteo su animacion
                    selfish._setupElementAnim(item, aniJSParsedSentenceCollection);
                }

                //We can use this for supply the window load and DomContentLoaded in some context
                var aniJSEventsNotifier = AniJS.getNotifier('AniJSNotifier');
                if(aniJSEventsNotifier){
                    aniJSEventsNotifier.dispatchEvent('onRunFinished');
                }
            },

            /**
             * Create an animation from a aniJSParsedSentenceCollection
             * @method createAnimation
             * @param {} aniJSParsedSentenceCollection
             * @param {} element
             * @return
             */
            createAnimation: function(aniJSParsedSentenceCollection, element) {
                var nodeElement = element || '';
                //BEAUTIFY: The params order migth be the same
                selfish._setupElementAnim(nodeElement, aniJSParsedSentenceCollection);
            },

            /**
             * Return a Helper by ID, you can use this to attach callback to the Helper
             * @method getHelper
             * @param {} helperID
             * @return LogicalExpression
             */
            getHelper: function(helperID) {
                var helperCollection = selfish._helperCollection;
                return helperCollection[helperID] || helperCollection[DEFAULT];
            },

            /**
             * A helper it's a callback function container
             * using this function you can register your custom Helper
             * @method registerHelper
             * @param {} helperName
             * @param {} helperInstance
             * @return
             */
            registerHelper: function(helperName, helperInstance) {
                selfish._helperCollection[helperName] = helperInstance;
            },

            /**
             * Purge a NodeList By Selector
             * @method purge
             * @param {} selector
             * @return
             */
            purge: function(selector) {
                //TODO: Search a regular expression for test a valid CSS selector
                if (selector && selector !== '' && selector !== ' ') {
                    var purgeNodeCollection = document.querySelectorAll(selector),
                        size = purgeNodeCollection.length,
                        i = 0;

                    for (i; i < size; i++) {
                        AniJS.EventSystem.purgeEventTarget(purgeNodeCollection[i]);
                    }
                }
            },

            /**
             * Purge all register elements handle
             * you can use this when you run AniJS again
             * @method purgeAll
             * @return
             */
            purgeAll: function() {
                AniJS.EventSystem.purgeAll();
            },

            /**
             * Remove all listener from an element
             * @method purgeEventTarget
             * @param {} element
             * @return
             */
            purgeEventTarget: function(element) {
                AniJS.EventSystem.purgeEventTarget(element);
            },

            /**
             * Add default class names while Anim
             * @method setClassNamesWhenAnim
             * @param {} defaultClasses
             * @return
             */
            setClassNamesWhenAnim: function(defaultClasses) {
                selfish._classNamesWhenAnim = ' ' + defaultClasses;
            },

            /**
             * Create an EventTarget
             * @method createNotifier
             * @return EventTarget
             */
            createNotifier: function() {
                return AniJS.EventSystem.createEventTarget();
            },

            /**
             * Put an event Notifier in the notifierCollection
             * @method registerNotifier
             * @param {} notifier
             * @return Literal
             */
            registerNotifier: function(notifier) {
                var notifierCollection = AniJS.notifierCollection;

                //TODO: Optimize lookups here
                if (notifier.id && notifier.value && AniJS.EventSystem.isEventTarget(notifier.value)) {
                    notifierCollection[notifier.id] = notifier.value;
                    return 1;
                }

                return '';
            },

            /**
             * Return an notifier instance
             * @method getNotifier
             * @param {} notifierID
             * @return notifier
             */
            getNotifier: function(notifierID) {
                return AniJS.notifierCollection[notifierID];
            }

        };

        /////////////////////////////////////////////////////////
        // Private Methods an Vars
        /////////////////////////////////////////////////////////

        var selfish = {

        };

        /**
         * Description
         * @method _createDefaultHelper
         * @return defaultHelper
         */
        selfish._createDefaultHelper = function() {
            //TODO: Why default helper here, migth be directly in the public API
            var defaultHelper = {
                /**
                 * Remove the animation class added when animation is created
                 * @method removeAnim
                 * @param {} e
                 * @param {} animationContext
                 * @return
                 */
                removeAnim: function(e, animationContext) {
                    if(e.target && e.type){
                      animationContext.nodeHelper.removeClass(e.target, animationContext.behavior);
                    }
                },
                /**
                 * Holds the animation class added when animation is created
                 * @method holdAnimClass
                 * @param {} e
                 * @param {} animationContext
                 * @return
                 */
                holdAnimClass: function(e, animationContext) {
                },

                fireOnce: function(e, animationContext) {
                    animationContext.eventSystem.removeEventListenerHelper(animationContext.eventTarget, animationContext.event.type, animationContext.listener);
                },

                /**
                 * Fire custom event
                 *
                 * Examples:
                 *
                 *  Fire dummyEvent event of customNotifier
                 *
                 *  if: click, do: $addClass fadeIn animated, to: #container, after: emit customNotifier.dummyEvent
                 *  if: dummyEvent, on: $customNotifier, do: $addClass hidden,  to: $children #container | div
                 *
                 *
                 * @author Yolier Galan Tasse <gallegogt@gmail.com>
                 * @since  2014-09-20
                 * @param  {object}   e          The event handler
                 * @param  {object}   ctx        AniJS Animation Context Object
                 * @param  {[string]} params     [description]
                 */
                emit: function(e, ctx, params) {
                    var cevent = params[0] || null,
                        notifier = "";
                    if(cevent !== null) {
                        cevent = cevent.split('.');
                        if(cevent.length > 1) {
                            notifier = cevent[0];
                            cevent = cevent[1];
                        } else {
                            notifier = "";
                            cevent = cevent[0];
                        }
                        var customNotifier = AniJS.getNotifier(notifier) || null;
                        if(customNotifier !== null)
                            customNotifier.dispatchEvent(cevent);
                    }
                    //Run the animation
                    if(!ctx.hasRunned){
                        ctx.run();
                    }
                }
            };

            return defaultHelper;
        };

        /**
         * Create a Parser Instance
         * @method _createParser
         * @return Parser
         */
        selfish._createParser = function() {
            //TODO: The Parser could be an static class
            return new Parser();
        };

        /**
         * Setup the animation of the some element
         * @method _setupElementAnim
         * @param {} element
         * @param {} aniJSParsedSentenceCollection
         * @return
         */
        selfish._setupElementAnim = function(element, aniJSParsedSentenceCollection) {
            var size = aniJSParsedSentenceCollection.length,
                i = 0,
                item;

            for (i; i < size; i++) {
                item = aniJSParsedSentenceCollection[i];
                selfish._setupElementSentenceAnim(element, item);
            }
        };

        /**
         * Setup the element animation from a AniJS Sentence
         * @method _setupElementSentenceAnim
         * @param {} element
         * @param {} aniJSParsedSentence
         * @return
         */
        selfish._setupElementSentenceAnim = function(element, aniJSParsedSentence) {
            //TODO: If the user use animationend or transitionend names to custom events the eventdispach will be not executed
            var event = selfish._eventHelper(aniJSParsedSentence),
                eventTargetList = selfish._eventTargetHelper(element, aniJSParsedSentence),
                afterFunctionName;

            if(aniJSParsedSentence.after && selfish.Util.beArray(aniJSParsedSentence.after)){
                afterFunctionName =  aniJSParsedSentence.after[0];
            }

            //Es obligatorio definir de eventTarget ATTR
            if (event !== '') {
                var size = eventTargetList.length,
                    i = 0,
                    eventTargetItem;
                for (i; i < size; i++) {
                    eventTargetItem = eventTargetList[i];
                    if (AniJS.EventSystem.isEventTarget(eventTargetItem)) {
                        var listener = function(event) {

                            //Si cambia algun parametro dinamicamente entonces hay que enterarse
                            var behaviorTargetList = selfish._behaviorTargetHelper(element, aniJSParsedSentence, event),
                                behavior = selfish._behaviorHelper(aniJSParsedSentence),
                                before = selfish._beforeHelper(element, aniJSParsedSentence),
                                after = selfish._afterHelper(element, aniJSParsedSentence);
                            if (selfish._classNamesWhenAnim !== '') {
                                if(!selfish.Util.beArray(behavior))
                                    behavior += selfish._classNamesWhenAnim;
                            }
                            //Creo un nuevo animation context
                            var animationContextConfig = {
                                behaviorTargetList: behaviorTargetList,
                                nodeHelper: selfish.NodeHelper,
                                animationEndEvent: selfish._animationEndEvent,
                                behavior: behavior,
                                after: after,
                                eventSystem: AniJS.EventSystem,
                                eventTarget: event.currentTarget,
                                afterFunctionName: afterFunctionName,
                                dataAniJSOwner: element,
                                listener: listener,
                                event: event
                                //TODO: eventSystem should be called directly
                            },

                            animationContextInstance = new AniJS.AnimationContext(animationContextConfig);

                            //Si before, le paso el animation context
                            //TODO: Util is a submodule
                            if (before) {
                                if(selfish.Util.isFunction(before)) {
                                    before(event, animationContextInstance);
                                } else if(selfish.Util.beArray(before)) {
                                    before[0](event, animationContextInstance, selfish._paramsHelper(before));
                                }
                            } else {
                                animationContextInstance.run();
                            }
                        };

                        //TODO: Improve lookup here AniJS.EventSystem
                        AniJS.EventSystem.addEventListenerHelper(eventTargetItem, event, listener, false);

                        //Register event to feature handle
                        AniJS.EventSystem.registerEventHandle(eventTargetItem, event, listener);
                    }
                }
            }
        };

        /**
         * Helper to setup the Event that trigger the animation from declaration
         * https://developer.mozilla.org/en-US/docs/Web/Reference/Events
         * http://www.w3schools.com/tags/ref_eventattributes.asp
         * @method _eventHelper
         * @param {} element
         * @param {} aniJSParsedSentence
         * @return event
         */
        selfish._eventHelper = function(aniJSParsedSentence) {
            var defaultValue = '',
                event = aniJSParsedSentence.event || defaultValue;

            //TODO: Improve to reduce this ugly logic here
            if (event === ANIMATION_END) {
                event = selfish._animationEndPrefix();
            } else if (event === TRANSITION_END) {
                event = selfish._transitionEndPrefix();
            }

            return event;
        };

        /**
         * Helper to setup the Place from listen the trigger event of the animation
         * If is not specified one place, se asume que es himself
         * Take in account that where it's just a selector
         * @method _eventTargetHelper
         * @param {} element
         * @param {} aniJSParsedSentence
         * @return eventTargetList
         */
        selfish._eventTargetHelper = function(element, aniJSParsedSentence) {
            var defaultValue = element,
                eventTargetList = [defaultValue],
                rootDOMTravelScope = AniJS.rootDOMTravelScope,
                notifierList;

            //TODO: We could add other non direct DOM Objects
            if (aniJSParsedSentence.eventTarget) {

                notifierList = selfish._notifierHelper(aniJSParsedSentence.eventTarget);

                if (notifierList.length > 0) {
                    eventTargetList = notifierList;
                } else if (aniJSParsedSentence.eventTarget === 'document') {
                    eventTargetList = [document];
                } else if (aniJSParsedSentence.eventTarget === 'window') {
                    eventTargetList = [window];
                } else if (aniJSParsedSentence.eventTarget.split) {
                    try {
                        eventTargetList = rootDOMTravelScope.querySelectorAll(aniJSParsedSentence.eventTarget);
                    } catch (e) {
                        console.log('Ugly Selector Here');
                        eventTargetList = [];
                    }
                }
            }
            //It's not a nodeList any more
            return eventTargetList;
        };

        /**
         * Helper to setup the Node can be animated
         * @method _behaviorTargetHelper
         * @param {} element
         * @param {} aniJSParsedSentence
         * @return behaviorTargetNodeList
         */
        selfish._behaviorTargetHelper = function(element, aniJSParsedSentence, event) {
            var defaultValue = element,
                behaviorTargetNodeList = [defaultValue],
                rootDOMTravelScope = AniJS.rootDOMTravelScope,
                behaviorTarget = aniJSParsedSentence.behaviorTarget;

            if (behaviorTarget) {
                if(!selfish.Util.beArray(behaviorTarget)){
                    if(behaviorTarget === TARGET && event.currentTarget){
                        behaviorTargetNodeList = [event.currentTarget];
                    } else{
                        //Expression regular remplazar caracteres $ por comas
                        //TODO: Estudiar si este caracter no esta agarrado
                        behaviorTarget = behaviorTarget.split(MULTIPLE_CLASS_SEPARATOR).join(',');
                        try {
                            behaviorTargetNodeList = rootDOMTravelScope.querySelectorAll(behaviorTarget);
                        } catch (e) {
                            behaviorTargetNodeList = [];
                        }
                    }
                } else{
                    var behaviorObject = this._actionHelper(element, aniJSParsedSentence, behaviorTarget);
                    if(behaviorObject && selfish.Util.isFunction(behaviorObject[0])){
                        behaviorTargetNodeList = behaviorObject[0]
                                                    (event,{dataAniJSOwner:element},
                                                    selfish._paramsHelper(behaviorObject));
                    }
                }
            }
            return behaviorTargetNodeList;
        };

        /**
         * Helper to setup the Animation type
         * @method _behaviorHelper
         * @param {} element
         * @param {} aniJSParsedSentence
         * @return defaultValue
         */
        selfish._behaviorHelper = function(aniJSParsedSentence) {
            return this._actionHelper({}, aniJSParsedSentence, aniJSParsedSentence.behavior);
        };

        /**
         * Helper to setup the after callback function
         * @method _afterHelper
         * @param {} element
         * @param {} aniJSParsedSentence
         * @return defaultValue
         */
        selfish._afterHelper = function(element, aniJSParsedSentence) {
            var defaultValue =  aniJSParsedSentence.after;
            // return defaultValue;
            if(!selfish.Util.beArray(defaultValue))
                return selfish._callbackHelper(element, aniJSParsedSentence, defaultValue);
            return this._actionHelper(element, aniJSParsedSentence, defaultValue);
        };

        /**
         * Helper to setup the after callback function
         * @method _afterHelper
         * @param {} element
         * @param {} aniJSParsedSentence
         * @return defaultValue
         */
        selfish._beforeHelper = function(element, aniJSParsedSentence) {
            var defaultValue =  aniJSParsedSentence.before;
            if(!selfish.Util.beArray(defaultValue))
                return selfish._callbackHelper(element, aniJSParsedSentence, defaultValue);
            return this._actionHelper(element, aniJSParsedSentence, defaultValue);
        };
        /**
         * The executed actions helper
         * @author Dariel Noel <darielnoel@gmail.com>
         * @since  2014-09-10
         * @param  {[type]}   element             [description]
         * @param  {[type]}   aniJSParsedSentence [description]
         * @param  {[type]}   action              [description]
         * @return {[type]}                       [description]
         */
        selfish._actionHelper = function(element, aniJSParsedSentence, action) {
            var defaultValue = action || '',
                executeFunction;
            if(selfish.Util.beArray(defaultValue)) {
                executeFunction = selfish._callbackHelper(element, aniJSParsedSentence, defaultValue[0]);
                if(executeFunction) {
                    defaultValue[0] = executeFunction;
                } else {
                    defaultValue = defaultValue.join(' ');
                }

            }
            return defaultValue;
        };

        /**
         * Helper for before and after helpers refactoring
         * @method _callbackHelper
         * @param {} element
         * @param {} aniJSParsedSentence
         * @param {} callbackFunction
         * @return defaultValue
         */
        selfish._callbackHelper = function(element, aniJSParsedSentence, callbackFunction) {
            var defaultValue = callbackFunction || '',
                helper = selfish._helperHelper(aniJSParsedSentence);

            if (defaultValue) {
                if (!selfish.Util.isFunction(defaultValue)) {
                    var helperCollection = selfish._helperCollection,
                        helperInstance = helperCollection[helper];

                    if (helperInstance && selfish.Util.isFunction(helperInstance[defaultValue])) {
                        defaultValue = helperInstance[defaultValue];
                    } else {
                        defaultValue = false;
                    }
                }
            }

            return defaultValue;
        };

        /**
         * Helper to setup the helper of the animation
         * @method _helperHelper
         * @param {} element
         * @param {} aniJSParsedSentence
         * @return defaultValue
         */
        selfish._helperHelper = function(aniJSParsedSentence) {
            var defaultValue = aniJSParsedSentence.helper || selfish._helperDefaultIndex;
            return defaultValue;
        };

        /**
         * Helper to setup the notifier
         * @method _notifierHelper
         * @param {} eventTargetDefinition
         * @return defaultValue
         */
        selfish._notifierHelper = function(eventTargetDefinition) {
            var defaultValue = [],
                notifierCollection = AniJS.notifierCollection;

            if (eventTargetDefinition) {
                //{id: notifierID, value:notifierObject}
                if (eventTargetDefinition.id && AniJS.EventSystem.isEventTarget(eventTargetDefinition.value)) {
                    //TODO: In the near future could be an object list
                    defaultValue.push(eventTargetDefinition.value);

                    AniJS.registerNotifier(eventTargetDefinition);
                } else if (eventTargetDefinition.split) {
                    //Picar por signo de peso y obtener la lista de id de events Notifiers
                    notifierIDList = eventTargetDefinition.split('$');
                    var size = notifierIDList.length,
                        i = 1,
                        notifierID;

                    for (i; i < size; i++) {
                        notifierID = notifierIDList[i];
                        if (notifierID && notifierID !== ' ') {
                            //limpiarle los espacios alante y atras (trim)
                            notifierID = notifierID.trim();

                            //TODO: Big Refactoring here
                            var value = AniJS.getNotifier(notifierID);
                            if (!value) {
                                value = AniJS.EventSystem.createEventTarget();
                                AniJS.registerNotifier({
                                    id: notifierID,
                                    value: value
                                });
                            }
                            defaultValue.push(value);
                        }
                    }
                }
            }

            return defaultValue;
        };

        selfish._paramsHelper = function(paramsArray){
            var arr = [],
                i = paramsArray.length;
            while(i-- > 1) arr[i - 1] = paramsArray[i];
            return arr;
        };

        /**
         * Parse an String Declaration
         * @method _getParsedAniJSSentenceCollection
         * @param {} stringDeclaration
         * @return CallExpression
         */
        selfish._getParsedAniJSSentenceCollection = function(stringDeclaration) {
            return selfish.Parser.parse(stringDeclaration);
        };

        /**
         * Select all DOM nodes that have a AniJS declaration
         * @method _findAniJSNodeCollection
         * @param {} rootDOMTravelScope
         * @return CallExpression
         */
        selfish._findAniJSNodeCollection = function(rootDOMTravelScope) {
            //IMPROVE: Might a configuration option
            var aniJSDataTagName = '[' + ANIJS_DATATAG_NAME + ']';
            return rootDOMTravelScope.querySelectorAll(aniJSDataTagName);
        };

        /**
         * Return the correct AnimationEnd Prefix according to the current browser
         * @method _animationEndPrefix
         * @return
         */
        selfish._animationEndPrefix = function() {
            var endPrefixBrowserDetectionIndex = selfish._endPrefixBrowserDetectionIndex(),
                animationEndBrowserPrefix = [ANIMATION_END, 'oAnimationEnd', ANIMATION_END, 'webkitAnimationEnd'];

            return animationEndBrowserPrefix[endPrefixBrowserDetectionIndex];
        };

        /**
         * Return the correct TransitionEnd Prefix according to the current browser
         * @method _transitionEndPrefix
         * @return
         */
        selfish._transitionEndPrefix = function() {
            var endPrefixBrowserDetectionIndex = selfish._endPrefixBrowserDetectionIndex(),
                transitionEndBrowserPrefix = [TRANSITION_END, 'oTransitionEnd', TRANSITION_END, 'webkitTransitionEnd'];

            return transitionEndBrowserPrefix[endPrefixBrowserDetectionIndex];
        };

        /**
         * Return the correct Transition and  Animation End Prefix helper according to the current browser
         * @method _transitionEndPrefix
         * @return index of the prefix acording to the browser
         */
        selfish._endPrefixBrowserDetectionIndex = function() {
            //TODO: Delete de element after create this
            var el = document.createElement('fe'),
                ANIM = 'Animation',
                animationBrowserDetection = ['animation', 'O'+ANIM, 'Moz'+ANIM, 'webkit'+ANIM];

            for (var i = 0; i < animationBrowserDetection.length; i++) {
                if (el.style[animationBrowserDetection[i]] !== undefined) {
                    return i;
                }
            }
        };

        /////////////////////////////////////////////////////////
        // Private SubModules
        /////////////////////////////////////////////////////////

        /**
         * Encapsulate the animation Context
         * @class animationContext
         * @author @dariel_noel
         */
        AniJS.AnimationContext = (function(config) {

            //TODO: Module aproach here
            var animationContextInstance = this;

            /**
             * Class constructor
             * @method init
             * @param {} config
             * @return
             */
            animationContextInstance.init = function(config) {

                //TODO: Valorar la idea de usar prototype por performance reasons
                //ATTRS
                animationContextInstance.behaviorTargetList = config.behaviorTargetList || [];

                animationContextInstance.nodeHelper = config.nodeHelper;

                animationContextInstance.animationEndEvent = config.animationEndEvent;

                animationContextInstance.behavior = config.behavior;

                animationContextInstance.after = config.after;

                animationContextInstance.eventSystem = config.eventSystem;

                animationContextInstance.eventTarget = config.eventTarget;

                animationContextInstance.afterFunctionName = config.afterFunctionName;

                animationContextInstance.dataAniJSOwner = config.dataAniJSOwner;

                animationContextInstance.listener = config.listener;

                animationContextInstance.event = config.event;
            };

            /**
             * Custom AniJS animation behavior
             * @author Dariel Noel <darielnoel@gmail.com>
             * @since  2014-09-03
             * @param  {[type]}   target   [description]
             * @param  {[type]}   behavior [description]
             * @return {[type]}            [description]
             */
            animationContextInstance.doDefaultAction = function(target, behavior){
                var instance = animationContextInstance,
                    nodeHelper = instance.nodeHelper,
                    animationEndEvent = instance.animationEndEvent,
                    after = instance.after,
                    afterFunctionName = instance.afterFunctionName,
                    lastBehavior;

                //create event
                instance.eventSystem.addEventListenerHelper(target, animationEndEvent, function(e) {
                    e.stopPropagation();
                    //remove event
                    instance.eventSystem.removeEventListenerHelper(e.target, e.type, arguments.callee);
                    if(after){
                        if(selfish.Util.isFunction(after)){
                            after(e, animationContextInstance);
                        } else if(selfish.Util.beArray(after)) {
                            after[0](e, animationContextInstance, selfish._paramsHelper(after));
                        }
                    }
                });
                // Backguard compatibility
                if (afterFunctionName !== "holdAnimClass" && afterFunctionName !== "$holdAnimClass") {
                    lastBehavior = target._ajLastBehavior; 
                    if(lastBehavior){
                        // removing the animation by default if there are not hold animClass
                        nodeHelper.removeClass(target, lastBehavior);
                    }
                    target._ajLastBehavior = behavior;
                }
                
                // Trigger a reflow in between removing and adding the class name.
                // http://css-tricks.com/restart-css-animation/ 
                target.offsetWidth = target.offsetWidth;
                nodeHelper.addClass(target, behavior);
            };

            /**
             * Allows to use a custom helpers function via do definitions
             * @author Dariel Noel <darielnoel@gmail.com>
             * @since  2014-09-03
             * @param  {[type]}   target   [description]
             * @param  {[type]}   behavior [description]
             * @return {[type]}            [description]
             */
            animationContextInstance.doFunctionAction = function(target, behavior){
                var instance = animationContextInstance,
                    after = instance.after,
                    e = {target:target};
                behavior[0](e, animationContextInstance, selfish._paramsHelper(behavior));
                if(selfish.Util.isFunction(after)){
                    after(e, animationContextInstance);
                } else {
                    if(selfish.Util.beArray(after)) {
                        after[0](e, animationContextInstance, selfish._paramsHelper(after));
                    }
                }
            };

            /**
             * Execute an animation context instance
             * @method run
             * @return
             */
            animationContextInstance.run = function() {
                var instance = animationContextInstance,
                    behaviorTargetList = instance.behaviorTargetList,
                    behaviorTargetListSize = behaviorTargetList.length,
                    behavior = instance.behavior,
                    j = 0,
                    behaviorTargetListItem;

                animationContextInstance.hasRunned = 1;
                for (j; j < behaviorTargetListSize; j++) {
                    if(selfish.Util.beArray(behavior)){
                        animationContextInstance
                            .doFunctionAction(behaviorTargetList[j], behavior);
                    } else{
                        animationContextInstance
                            .doDefaultAction(behaviorTargetList[j], behavior);
                    }
                }
            };
            animationContextInstance.init(config);
        });

        /**
         * Encapsulate the AnimJS sintax parser
         * @class Parser
         * @author @dariel_noel
         */
        selfish.Parser = {

            /**
             * Parse a aniJSDeclaration
             * @method parse
             * @param {} aniJSDeclaration
             * @return CallExpression
             */
            parse: function(aniJSDeclaration) {
                return this.parseDeclaration(aniJSDeclaration);
            },

            /**
             * Declaration parse
             *  Sintax: Declaration -> Sentence; | *
             *  Example: SentenceA; SentenceB
             * @method _parseDeclaration
             * @param {} declaration
             * @return parsedDeclaration
             */
            parseDeclaration: function(declaration) {
                var parsedDeclaration = [],
                    sentenceCollection,
                    parsedSentence;

                sentenceCollection = declaration.split(';');

                var size = sentenceCollection.length,
                    i = 0;

                for (i; i < size; i++) {
                    parsedSentence = this.parseSentence(sentenceCollection[i]);
                    parsedDeclaration.push(parsedSentence);
                }

                return parsedDeclaration;
            },

            /**
             * Sentence Parse
             *  Sintax: Sentence -> if, on, do, to, after, helper
             *  Example: "if: DOMContentLoaded, on: document, do:flip, to: .animatecss, after: testcallback"
             *  note: The order it's not important
             * @method _parseSentence
             * @param {} sentence
             * @return parsedSentence
             */
            parseSentence: function(sentence) {
                var parsedSentence = {},
                    definitionCollection,
                    parsedDefinition;

                definitionCollection = sentence.split(',');

                var size = definitionCollection.length,
                    i = 0;

                for (i; i < size; i++) {
                    parsedDefinition = this.parseDefinition(definitionCollection[i]);
                    parsedSentence[parsedDefinition.key] = parsedDefinition.value;
                }
                return parsedSentence;
            },

            /**
             * Parse definition
             *  Sintax: Definition -> if | on | do | to | after | helper
             *  Example: "if: DOMContentLoaded, on: document, do:flip, to: .animatecss,  after: testcallback"
             * @method _parseDefinition
             * @param {} definition
             * @return parsedDefinition
             */
            parseDefinition: function(definition) {
                var parsedDefinition = {},
                    definitionBody,
                    definitionKey,
                    definitionValue,
                    EVENT_KEY = 'event',
                    EVENT_TARGET_KEY = 'eventTarget',
                    BEHAVIOR_KEY = ['behavior', 'after', 'before', 'behaviorTarget'];

                //Performance reasons
                definitionBody = definition.split(':');
                if (definitionBody.length > 1) {
                    definitionKey = definitionBody[0].trim();
                    //CSS3 selectors support
                    if(definitionBody.length > 2){
                        definitionValue = definitionBody.slice(1);
                        definitionValue = definitionValue.join(':');
                        definitionValue = definitionValue.trim();
                    } else {
                        definitionValue = definitionBody[1].trim();
                    }
                    parsedDefinition.value = definitionValue;
                    //Change by reserved words
                    if (definitionKey === EVENT_RESERVED_WORD) {
                        definitionKey = EVENT_KEY;
                    } else if (definitionKey === EVENT_TARGET_RESERVED_WORD) {
                        definitionKey = EVENT_TARGET_KEY;
                    } else {
                        for (var i = BEHAVIOR_RESERVED_WORD.length - 1; i >= 0; i--) {
                              if(definitionKey === BEHAVIOR_RESERVED_WORD[i]) {
                                definitionKey = BEHAVIOR_KEY[i];
                                /**
                                 * TODO: This code is deprecated for next version
                                 */
                                if((definitionKey === 'after' || definitionKey === 'before') && definitionValue[0]!== '$') {
                                    definitionValue = '$' + definitionValue;
                                }
                                definitionValue = this.parseDoDefinition(definitionValue);
                              }
                        }
                    }
                    parsedDefinition.key = definitionKey;
                    parsedDefinition.value = definitionValue;
                }

                return parsedDefinition;
            },

            /**
             * Allow to parse do definitions
             * @author Dariel Noel <darielnoel@gmail.com>
             * @since  2014-09-03
             * @param  {[type]}   doDefinition [description]
             */
            parseDoDefinition: function(doDefinition) {
                var reg = /^\$(\w+)\s*/g,
                    regMatch = reg.exec(doDefinition),
                    functionName = "",
                    parametersArray = [], it = 1;

                if(regMatch !== null) {
                    functionName = regMatch[1];
                    doDefinitionArray = doDefinition.split(regMatch[0])[1];
                    doDefinitionArray = doDefinitionArray !== null ? doDefinitionArray.split(PARAMS_SEPARATOR) : [];
                    doDefinition = [];
                    doDefinition[0] = functionName;
                    for (var i = 0; i < doDefinitionArray.length; i++) {
                        if(doDefinitionArray[i] !== "")
                            doDefinition[it++] = doDefinitionArray[i].trim();
                    }
                    return doDefinition;
                }
                return doDefinition;
            }
        };

        /**
         * Helper to DOM manipulation
         * @class Parser
         * @author @dariel_noel
         */
        selfish.NodeHelper = {

            /**
             * Add some classes to a node
             * @method addClass
             * @param {} elem
             * @param {} string
             * @return
             */
            addClass: function(elem, string) {
                if (!(string instanceof Array)) {
                    string = string.split(' ');
                }
                for (var i = 0, len = string.length; i < len; ++i) {
                    if (string[i] && !new RegExp(REGEX_BEGIN + string[i] + REGEX_END).test(elem.className)) {
                        elem.className = (elem.className === "") ?  string[i] : elem.className.trim() + ' ' + string[i];
                    }
                }
            },

            /**
             * Remove class of some DOM element
             * @method removeClass
             * @param {} elem
             * @param {} string
             * @return
             */
            removeClass: function(elem, string) {
                if (!(string instanceof Array)) {
                    string = string.split(' ');
                }
                for (var i = 0, len = string.length; i < len; ++i) {
                    elem.className = elem.className.replace(new RegExp(REGEX_BEGIN + string[i] + REGEX_END), ' ').trim();
                }
            },

            /**
             * Test if the nested element has the supply class
             * @method hasClass
             * @param {} elem
             * @param {} string
             * @return LogicalExpression
             */
            hasClass: function(elem, string) {
                return string && new RegExp(REGEX_BEGIN + string + REGEX_END).test(elem.className);
            }
        };

        /**
         * A kind of util functions
         * @class Util
         * @author @dariel_noel
         */
        selfish.Util = {

            /**
             * Thanks a lot to underscore guys
             * @method isFunction
             * @param {} obj
             * @return UnaryExpression
             */
            isFunction: function(obj) {
                return !!(obj && obj.constructor && obj.call && obj.apply);
            },
            /**
             * Test if some object is an array
             * @author Dariel Noel <darielnoel@gmail.com>
             * @since  2014-09-09
             * @return {Boolean}  [description]
             */
            beArray:function(object){
                return Array.isArray(object);
            }
        };

        /////////////////////////////////////////////////////////
        // Public SubModules
        /////////////////////////////////////////////////////////

        /**
         * Event System Interface (AniJS Current Implementation)
         * @class EventSystem
         * @author @dariel_noel
         */
        AniJS.EventSystem = {

            //ATTRS
            eventCollection: {},

            eventIdCounter: 0,

            /**
             * Return true if the element it's an event target object
             * @method isEventTarget
             * @param {} element
             * @return true or false
             */
            isEventTarget: function(element) {
                return (element.addEventListener) ? 1 : 0;
            },

            /**
             * Create new EventTarget element
             * @method createEventTarget
             * @return AniJS.EventTarget
             */
            createEventTarget: function() {
                return new AniJS.EventTarget();
            },

            /**
             * Put a listener in the object
             * @method addEventListenerHelper
             * @param {} eventTargetItem
             * @param {} event
             * @param {} listener
             * @param {} other
             * @return
             */
            addEventListenerHelper: function(eventTargetItem, event, listener, other) {
                eventTargetItem.addEventListener(event, listener, false);
            },

            /**
             * Put a listener of the object
             * @method removeEventListenerHelper
             * @param {} e
             * @param {} arguments
             * @return
             */
            removeEventListenerHelper: function(element, type, listener) {
                if(element){
                    element.removeEventListener(type, listener);
                }
            },


            /**
             * Purge all register elements handle
             * @method purgeAll
             * @return
             */
            purgeAll: function() {
                var instance = this,
                    eventCollection = instance.eventCollection,
                    eventCollectionKeyList = Object.keys(eventCollection),
                    size = eventCollectionKeyList.length,
                    i = 0,
                    key,
                    eventObject;

                for (i; i < size; i++) {
                    key = eventCollectionKeyList[i];
                    eventObject = eventCollection[key];

                    if (eventObject && eventObject.handleCollection && eventObject.handleCollection.length > 0) {
                        instance.purgeEventTarget(eventObject.handleCollection[0].element);
                    }

                    delete eventCollection[key];
                }
            },

            /**
             * Detach all AniJS subscriptions to the all nodes bellow this
             * @method purgeAllNodes
             * @param {} element
             * @return
             */
            purgeAllNodes: function(element){
                //Dame todos los que tengan data-anijs
                //a cada uno purgue
                var nodes = element.querySelectorAll("*");
                    size = nodes.length;
                for (var i = size - 1; i >= 0; i--) {
                    this.purgeEventTarget(nodes[i]);
                }
            },

            /**
             * Detach all AniJS subscriptions to this element
             * @method purgeEventTarget
             * @param {} element
             * @return
             */
            purgeEventTarget: function(element) {
                var instance = this,
                    aniJSEventID = element._aniJSEventID,
                    elementHandleCollection;
                if (aniJSEventID) {

                    //Se le quitan todos los eventos a los que este suscrito
                    elementHandleCollection = instance.eventCollection[aniJSEventID].handleCollection;

                    var size = elementHandleCollection.length,
                        i = 0,
                        item;

                    for (i; i < size; i++) {
                        item = elementHandleCollection[i];

                        //Para cada handle
                        instance.removeEventListenerHelper(element, item.eventType, item.listener);

                    }
                    instance.eventCollection[aniJSEventID] = element._aniJSEventID = null;
                    delete instance.eventCollection[aniJSEventID];
                    delete element._aniJSEventID;
                }
            },

            /**
             * Create a handle to remove the listener when purge it
             * @method registerEventHandle
             * @param {} element
             * @param {} eventType
             * @param {} listener
             * @return
             */
            registerEventHandle: function(element, eventType, listener) {
                var instance = this,
                    aniJSEventID = element._aniJSEventID,
                    eventCollection = instance.eventCollection,
                    elementEventHandle = {
                        eventType: eventType,
                        listener: listener,
                        element: element
                    };

                if (aniJSEventID) {
                    eventCollection[aniJSEventID].handleCollection.push(elementEventHandle);
                } else {
                    var tempEventHandle = {
                        handleCollection: [elementEventHandle]
                    };

                    eventCollection[++instance.eventIdCounter] = tempEventHandle;
                    element._aniJSEventID = instance.eventIdCounter;
                }
            }

        };


        /**
         * Helper the custom EventTarget
         * Copyright (c) 2010 Nicholas C. Zakas. All rights reserved.
         * MIT License
         * http://www.nczonline.net/blog/2010/03/09/custom-events-in-javascript/
         * @class EventTarget
         */
        AniJS.EventTarget = function EventTarget() {
            this._listeners = {};
        };

        AniJS.EventTarget.prototype = {

            constructor: AniJS.EventTarget,

            /**
             * Registers the specified listener on the EventTarget it's called on
             * Similar to the native implementation
             * @method addEventListener
             * @param {} type
             * @param {} listener
             * @param {} other
             * @return
             */
            addEventListener: function(type, listener, other) {
                var instance = this;
                if (typeof instance._listeners[type] == "undefined") {
                    instance._listeners[type] = [];
                }

                instance._listeners[type].push(listener);
            },

            /**
             * Dispatches an Event at the specified EventTarget
             * Similar to the native implementation
             * @method dispatchEvent
             * @param {} event
             * @return
             */
            dispatchEvent: function(event) {
                var instance = this;
                if (typeof event == "string") {
                    event = {
                        type: event
                    };
                }
                if (!event.target) {
                    event.target = instance;
                }

                if (!event.type) { //falsy
                    throw new Error("Event object missing 'type' property.");
                }

                if (this._listeners[event.type] instanceof Array) {
                    var listeners = instance._listeners[event.type];

                    for (var i = 0, len = listeners.length; i < len; i++) {
                        listeners[i].call(instance, event);
                    }
                }
            },

            /**
             * Removes the event listener previously registered with EventTarget.addEventListener.
             * Similar to the native implementation
             * @method removeEventListener
             * @param {} type
             * @param {} listener
             * @return
             */
            removeEventListener: function(type, listener) {
                var instance = this;
                if (instance._listeners[type] instanceof Array) {
                    var listeners = instance._listeners[type];
                    for (var i = 0, len = listeners.length; i < len; i++) {
                        if (listeners[i] === listener) {
                            listeners.splice(i, 1);
                            break;
                        }
                    }
                }
            }
        };

        return AniJS;

    }(AniJS || {}));

    AniJS.init();
    AniJS.run();

    // https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon
    // AMD Support
    if (typeof define === "function" && define.amd) {
        define("anijs", [], function() {
            return AniJS;
        });
    }
    if (typeof noGlobal == typeof undefined) {
        window.AniJS = AniJS;
    }

    return AniJS;
});
