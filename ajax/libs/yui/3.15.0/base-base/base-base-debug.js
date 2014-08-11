/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('base-base', function (Y, NAME) {

    /**
     * The base module provides the Base class, which objects requiring attribute and custom event support can extend.
     * The module also provides two ways to reuse code - It augments Base with the Plugin.Host interface which provides
     * plugin support and also provides the BaseCore.build method which provides a way to build custom classes using extensions.
     *
     * @module base
     */

    /**
     * The base-base submodule provides the Base class without the Plugin support, provided by Plugin.Host,
     * and without the extension support provided by BaseCore.build.
     *
     * @module base
     * @submodule base-base
     */

    var AttributeCore   = Y.AttributeCore,
        AttributeExtras = Y.AttributeExtras,
        BaseCore        = Y.BaseCore,
        BaseObservable  = Y.BaseObservable;

    /**
     * <p>
     * A base class which objects requiring attributes and custom event support can
     * extend. Base also handles the chaining of initializer and destructor methods across
     * the hierarchy as part of object construction and destruction. Additionally, attributes configured
     * through the static <a href="#property_ATTRS">ATTRS</a> property for each class
     * in the hierarchy will be initialized by Base.
     * </p>
     *
     * <p>
     * **NOTE:** Prior to version 3.11.0, ATTRS would get added a class at a time. That is,
     * Base would loop through each class in the hierarchy, and add the class' ATTRS, and
     * then call it's initializer, and move on to the subclass' ATTRS and initializer. As of
     * 3.11.0, ATTRS from all classes in the hierarchy are added in one `addAttrs` call before
     * any initializers are called. This fixes subtle edge-case issues with subclass ATTRS overriding
     * superclass `setter`, `getter` or `valueFn` definitions and being unable to get/set attributes
     * defined by the subclass. This order of operation change may impact `setter`, `getter` or `valueFn`
     * code which expects a superclass' initializer to have run. This is expected to be rare, but to support
     * it, Base supports a `_preAddAttrs()`, method hook (same signature as `addAttrs`). Components can
     * implement this method on their prototype for edge cases which do require finer control over
     * the order in which attributes are added (see widget-htmlparser).
     * </p>
     *
     * <p>
     * The static <a href="#property_NAME">NAME</a> property of each class extending
     * from Base will be used as the identifier for the class, and is used by Base to prefix
     * all events fired by instances of that class.
     * </p>
     *
     * @class Base
     * @constructor
     * @uses BaseCore
     * @uses BaseObservable
     * @uses AttributeCore
     * @uses AttributeObservable
     * @uses AttributeExtras
     * @uses EventTarget
     *
     * @param {Object} config Object with configuration property name/value pairs. The object can be
     * used to provide default values for the objects published attributes.
     *
     * <p>
     * The config object can also contain the following non-attribute properties, providing a convenient
     * way to configure events listeners and plugins for the instance, as part of the constructor call:
     * </p>
     *
     * <dl>
     *   <dt>on</dt>
     *   <dd>An event name to listener function map, to register event listeners for the "on" moment of the event.
     *       A constructor convenience property for the <a href="Base.html#method_on">on</a> method.</dd>
     *   <dt>after</dt>
     *   <dd>An event name to listener function map, to register event listeners for the "after" moment of the event.
     *       A constructor convenience property for the <a href="Base.html#method_after">after</a> method.</dd>
     *   <dt>bubbleTargets</dt>
     *   <dd>An object, or array of objects, to register as bubble targets for bubbled events fired by this instance.
     *       A constructor convenience property for the <a href="EventTarget.html#method_addTarget">addTarget</a> method.</dd>
     *   <dt>plugins</dt>
     *   <dd>A plugin, or array of plugins to be plugged into the instance (see PluginHost's plug method for signature details).
     *       A constructor convenience property for the <a href="Plugin.Host.html#method_plug">plug</a> method.</dd>
     * </dl>
     */
    function Base() {
        BaseCore.apply(this, arguments);
        BaseObservable.apply(this, arguments);
        AttributeExtras.apply(this, arguments);
    }

    /**
     * The list of properties which can be configured for
     * each attribute (e.g. setter, getter, writeOnce, readOnly etc.)
     *
     * @property _ATTR_CFG
     * @type Array
     * @static
     * @private
     */
    Base._ATTR_CFG = BaseCore._ATTR_CFG.concat(BaseObservable._ATTR_CFG);

    /**
     * The array of non-attribute configuration properties supported by this class.
     *
     * `Base` supports "on", "after", "plugins" and "bubbleTargets" properties,
     * which are not set up as attributes.
     *
     * This property is primarily required so that when
     * <a href="#property__allowAdHocAttrs">`_allowAdHocAttrs`</a> is enabled by
     * a class, non-attribute configurations don't get added as ad-hoc attributes.
     *
     * @property _NON_ATTRS_CFG
     * @type Array
     * @static
     * @private
     */
    Base._NON_ATTRS_CFG = BaseCore._NON_ATTRS_CFG.concat(BaseObservable._NON_ATTRS_CFG);

    /**
     * <p>
     * The string to be used to identify instances of
     * this class, for example in prefixing events.
     * </p>
     * <p>
     * Classes extending Base, should define their own
     * static NAME property, which should be camelCase by
     * convention (e.g. MyClass.NAME = "myClass";).
     * </p>
     * @property NAME
     * @type String
     * @static
     */
    Base.NAME = 'base';

    /**
     * The default set of attributes which will be available for instances of this class, and
     * their configuration. In addition to the configuration properties listed by
     * Attribute's <a href="Attribute.html#method_addAttr">addAttr</a> method, the attribute
     * can also be configured with a "cloneDefaultValue" property, which defines how the statically
     * defined value field should be protected ("shallow", "deep" and false are supported values).
     *
     * By default if the value is an object literal or an array it will be "shallow" cloned, to
     * protect the default value.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    Base.ATTRS = AttributeCore.protectAttrs(BaseCore.ATTRS);

    /**
    Provides a way to safely modify a `Y.Base` subclass' static `ATTRS` after
    the class has been defined or created.

    Base-based classes cache information about the class hierarchy in order to
    efficiently create instances. This cache includes includes the aggregated
    `ATTRS` configs. If the static `ATTRS` configs need to be modified after the
    class has been defined or create, then use this method which will make sure
    to clear any cached data before making any modifications.

    @method modifyAttrs
    @param {Function} [ctor] The constructor function whose `ATTRS` should be
        modified. If a `ctor` function is not specified, then `this` is assumed
        to be the constructor which hosts the `ATTRS`.
    @param {Object} configs The collection of `ATTRS` configs to mix with the
        existing attribute configurations.
    @static
    @since 3.10.0
    **/
    Base.modifyAttrs = BaseCore.modifyAttrs;

    Y.mix(Base, BaseCore, false, null, 1);
    Y.mix(Base, AttributeExtras, false, null, 1);

    // Needs to be `true`, to overwrite methods from `BaseCore`.
    Y.mix(Base, BaseObservable, true, null, 1);

    // Fix constructor
    Base.prototype.constructor = Base;

    Y.Base = Base;


}, '3.15.0', {"requires": ["attribute-base", "base-core", "base-observable"]});
