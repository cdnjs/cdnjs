/**
 * @private
 * Flyweight object to process the attribute of a sprite.
 */
Ext.define('Ext.draw.sprite.AttributeDefinition', {
    requires: [
        'Ext.draw.sprite.AttributeParser',
        'Ext.draw.sprite.AnimationParser'
    ],

    config: {
        /**
         * @cfg {Object} defaults Defines the default values of attributes.
         */
        defaults: {

        },

        /**
         * @cfg {Object} aliases Defines the aletrnative names for attributes.
         */
        aliases: {

        },

        /**
         * @cfg {Object} animationProcessors Defines the process used to animate between attributes.
         */
        animationProcessors: {

        },

        /**
         * @cfg {Object} processors Defines the preprocessing used on the attribute.
         */
        processors: {

        },

        /**
         * @cfg {Object} dirty Defines what other attributes need to be updated when an attribute is changed.
         */
        dirtyTriggers: {

        },

        /**
         * @cfg {Object} updaters Defines the postprocessing used by the attribute.
         */
        updaters: {

        }
    },

    inheritableStatics: {
        processorRe: /^(\w+)\(([\w\-,]*)\)$/
    },

    constructor: function (config) {
        var me = this;
        me.initConfig(config);
    },

    applyDefaults: function (defaults, oldDefaults) {
        oldDefaults = Ext.apply(oldDefaults || {}, this.normalize(defaults));
        return oldDefaults;
    },

    applyAliases: function (aliases, oldAliases) {
        return Ext.apply(oldAliases || {}, aliases);
    },

    applyProcessors: function (processors, oldProcessors) {
        this.getAnimationProcessors();
        var name,
            result = oldProcessors || {},
            defaultProcessor = Ext.draw.sprite.AttributeParser,
            processorRe = this.self.processorRe,
            animationProcessors = {}, anyAnimationProcessors,
            match, fn;

        for (name in processors) {
            fn = processors[name];
            if (!Ext.isFunction(fn)) {
                if (Ext.isString(fn)) {
                    match = fn.match(processorRe);
                    if (match) {
                        fn = defaultProcessor[match[1]].apply(defaultProcessor, match[2].split(','));
                    } else {
                        animationProcessors[name] = fn;
                        anyAnimationProcessors = true;
                        fn = defaultProcessor[fn];
                    }
                } else {
                    continue;
                }
            }
            result[name] = fn;
        }

        if (anyAnimationProcessors) {
            this.setAnimationProcessors(animationProcessors);
        }

        return result;
    },

    applyAnimationProcessors: function (animationProcessors, oldAnimationProcessors) {
        var parser = Ext.draw.sprite.AnimationParser,
            item;

        if (!oldAnimationProcessors) {
            oldAnimationProcessors = {};
        }

        for (var name in animationProcessors) {
            item = animationProcessors[name];
            if (item === 'none') {
                oldAnimationProcessors[name] = null;
            } else if (Ext.isString(item) && !(name in oldAnimationProcessors)) {
                if (item in parser) {
                    while (Ext.isString(parser[item])) {
                        item = parser[item];
                    }
                    oldAnimationProcessors[name] = parser[item];
                }
            } else if (Ext.isObject(item)) {
                oldAnimationProcessors[name] = item;
            }
        }
        return oldAnimationProcessors;
    },

    applyDirtyTriggers: function (dirtyTriggers, oldDirtyTrigger) {
        if (!oldDirtyTrigger) {
            oldDirtyTrigger = {};
        }
        for (var name in dirtyTriggers) {
            oldDirtyTrigger[name] = dirtyTriggers[name].split(',');
        }
        return oldDirtyTrigger;
    },

    applyUpdaters: function (updaters, oldUpdaters) {
        return Ext.apply(oldUpdaters || {}, updaters);
    },

    batchedNormalize: function (batchedChanges, keepUnrecognized) {
        if (!batchedChanges) {
            return {};
        }
        var definition = this,
            processors = definition.getProcessors(),
            aliases = definition.getAliases(),
            translation = batchedChanges.translation || batchedChanges.translate,
            normalized = {},
            i, ln, name, val,
            rotation, scaling,
            matrix, subVal, split;

        if ('rotation' in batchedChanges) {
            rotation = batchedChanges.rotation;
        } else {
            rotation = ('rotate' in batchedChanges) ? batchedChanges.rotate : undefined;
        }

        if ('scaling' in batchedChanges) {
            scaling = batchedChanges.scaling;
        } else {
            scaling = ('scale' in batchedChanges) ? batchedChanges.scale : undefined;
        }

        if (typeof scaling !== 'undefined') {
            if (Ext.isNumber(scaling)) {
                normalized.scalingX = scaling;
                normalized.scalingY = scaling;
            } else {
                if ('x' in scaling) {
                    normalized.scalingX = scaling.x;
                }
                if ('y' in scaling) {
                    normalized.scalingY = scaling.y;
                }
                if ('centerX' in scaling) {
                    normalized.scalingCenterX = scaling.centerX;
                }
                if ('centerY' in scaling) {
                    normalized.scalingCenterY = scaling.centerY;
                }
            }
        }

        if (typeof rotation !== 'undefined') {
            if (Ext.isNumber(rotation)) {
                rotation = Ext.draw.Draw.rad(rotation);
                normalized.rotationRads = rotation;
            } else {
                if ('rads' in rotation) {
                    normalized.rotationRads = rotation.rads;
                } else if ('degrees' in rotation) {
                    if (Ext.isArray(rotation.degrees)) {
                        normalized.rotationRads = Ext.Array.map(rotation.degrees, function (deg) {
                            return Ext.draw.Draw.rad(deg);
                        });
                    } else {
                        normalized.rotationRads = Ext.draw.Draw.rad(rotation.degrees);
                    }
                }
                if ('centerX' in rotation) {
                    normalized.rotationCenterX = rotation.centerX;
                }
                if ('centerY' in rotation) {
                    normalized.rotationCenterY = rotation.centerY;
                }
            }
        }
        if (typeof translation !== 'undefined') {
            if ('x' in translation) {
                normalized.translationX = translation.x;
            }
            if ('y' in translation) {
                normalized.translationY = translation.y;
            }
        }

        if ('matrix' in batchedChanges) {
            matrix = Ext.draw.Matrix.create(batchedChanges.matrix);
            split = matrix.split();

            normalized.matrix = matrix;
            normalized.rotationRads = split.rotation;
            normalized.rotationCenterX = 0;
            normalized.rotationCenterY = 0;
            normalized.scalingX = split.scaleX;
            normalized.scalingY = split.scaleY;
            normalized.scalingCenterX = 0;
            normalized.scalingCenterY = 0;
            normalized.translationX = split.translateX;
            normalized.translationY = split.translateY;
        }

        for (name in batchedChanges) {
            val = batchedChanges[name];
            if (typeof val === 'undefined') {
                continue;
            } else if (Ext.isArray(val)) {
                if (name in aliases) {
                    name = aliases[name];
                }
                if (name in processors) {
                    normalized[name] = [];
                    for (i = 0, ln = val.length; i < ln; i++) {
                        subVal = processors[name].call(this, val[i]);
                        if (typeof subVal !== 'undefined') {
                            normalized[name][i] = subVal;
                        }
                    }
                } else if (keepUnrecognized){
                    normalized[name] = val;
                }
            } else {
                if (name in aliases) {
                    name = aliases[name];
                }
                if (name in processors) {
                    val = processors[name].call(this, val);
                    if (typeof val !== 'undefined') {
                        normalized[name] = val;
                    }
                } else if (keepUnrecognized){
                    normalized[name] = val;
                }
            }
        }
        return normalized;
    },

    /**
     * Normalizes the changes given via their processors before they are applied as attributes.
     *
     * @param {Object} changes The changes given.
     * @param {Boolean} keepUnrecognized If 'true', unknown attributes will be passed through as normalized values.
     * @return {Object} The normalized values.
     */
    normalize: function (changes, keepUnrecognized) {
        if (!changes) {
            return {};
        }
        var definition = this,
            processors = definition.getProcessors(),
            aliases = definition.getAliases(),
            translation = changes.translation || changes.translate,
            normalized = {},
            name, val, rotation, scaling, matrix, split;

        if ('rotation' in changes) {
            rotation = changes.rotation;
        } else {
            rotation = ('rotate' in changes) ? changes.rotate : undefined;
        }

        if ('scaling' in changes) {
            scaling = changes.scaling;
        } else {
            scaling = ('scale' in changes) ? changes.scale : undefined;
        }

        if (translation) {
            if ('x' in translation) {
                normalized.translationX = translation.x;
            }
            if ('y' in translation) {
                normalized.translationY = translation.y;
            }
        }

        if (typeof scaling !== 'undefined') {
            if (Ext.isNumber(scaling)) {
                normalized.scalingX = scaling;
                normalized.scalingY = scaling;
            } else {
                if ('x' in scaling) {
                    normalized.scalingX = scaling.x;
                }
                if ('y' in scaling) {
                    normalized.scalingY = scaling.y;
                }
                if ('centerX' in scaling) {
                    normalized.scalingCenterX = scaling.centerX;
                }
                if ('centerY' in scaling) {
                    normalized.scalingCenterY = scaling.centerY;
                }
            }
        }

        if (typeof rotation !== 'undefined') {
            if (Ext.isNumber(rotation)) {
                rotation = Ext.draw.Draw.rad(rotation);
                normalized.rotationRads = rotation;
            } else {
                if ('rads' in rotation) {
                    normalized.rotationRads = rotation.rads;
                } else if ('degrees' in rotation) {
                    normalized.rotationRads = Ext.draw.Draw.rad(rotation.degrees);
                }
                if ('centerX' in rotation) {
                    normalized.rotationCenterX = rotation.centerX;
                }
                if ('centerY' in rotation) {
                    normalized.rotationCenterY = rotation.centerY;
                }
            }
        }

        if ('matrix' in changes) {
            matrix = Ext.draw.Matrix.create(changes.matrix);
            split = matrix.split();

            normalized.matrix = matrix;
            normalized.rotationRads = split.rotation;
            normalized.rotationCenterX = 0;
            normalized.rotationCenterY = 0;
            normalized.scalingX = split.scaleX;
            normalized.scalingY = split.scaleY;
            normalized.scalingCenterX = 0;
            normalized.scalingCenterY = 0;
            normalized.translationX = split.translateX;
            normalized.translationY = split.translateY;
        }

        for (name in changes) {
            val = changes[name];
            if (typeof val === 'undefined') {
                continue;
            }
            if (name in aliases) {
                name = aliases[name];
            }
            if (name in processors) {
                val = processors[name].call(this, val);
                if (typeof val !== 'undefined') {
                    normalized[name] = val;
                }
            } else if (keepUnrecognized){
                normalized[name] = val;
            }
        }
        return normalized;
    },

    setBypassingNormalization: function (attr, modifierStack, changes) {
        return modifierStack.pushDown(attr, changes);
    },

    set: function (attr, modifierStack, changes) {
        changes = this.normalize(changes);
        return this.setBypassingNormalization(attr, modifierStack, changes);
    }
});