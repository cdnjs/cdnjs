/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/
/**
 * This class describes a size determination strategy or algorithm used by the layout
 * system. There are special instances of this class stored as static properties to
 * avoid needless object instantiation. These instances should be treated as readonly.
 * 
 *  * `calculated`
 *  * `configured`
 *  * `constrainedMax`
 *  * `constrainedMin`
 *  * `natural`
 *  * `shrinkWrap`
 *  * `calculatedFromConfigured`
 *  * `calculatedFromNatural`
 *  * `calculatedFromShrinkWrap`
 *
 * Using one of these instances is simply:
 *
 *       var calculated = Ext.layout.SizeModel.calculated;
 *
 * @private
 */
Ext.define('Ext.layout.SizeModel', {
    constructor: function (config) {
        var me = this,
            SizeModel = me.self,
            sizeModelsArray = SizeModel.sizeModelsArray,
            name;

        Ext.apply(me, config);

        me[name = me.name] = true; // set the one special flag that matches our name

        me.fixed = !(me.auto = me.natural || me.shrinkWrap);

        /**
         * @property {Number} ordinal
         * The 0-based ordinal for this `SizeModel` instance.
         * @readonly
         */
        sizeModelsArray[me.ordinal = sizeModelsArray.length] =
            SizeModel[name] =
            SizeModel.sizeModels[name] = me;
    },

    statics: {
        /**
         * An array of all SizeModel instances.
         * @private
         */
        sizeModelsArray: [],

        /**
         * An object containing all SizeModel instances keyed by `name`.
         * @private
         */
        sizeModels: {}
    },

    /**
     * @property {String} name
     * The name of this size model (e.g., "calculated").
     * @readonly
     */

    /**
     * @property {Boolean} auto
     * True if the size is either `natural` or `shrinkWrap`, otherwise false.
     * @readonly
     */

    /**
     * @property {Boolean} calculated
     * True if the size is calculated by the `ownerLayout`.
     * @readonly
     */
    calculated: false,

    /**
     * @property {Boolean} configured
     * True if the size is configured (e.g., by a `width` or `minWidth`). The names of
     * configuration properties can be found in the {@link #names} property.
     * @readonly
     */
    configured: false,

    /**
     * @property {Boolean} constrainedMax
     * True if the size is constrained by a `maxWidth` or `maxHeight` configuration. This
     * is a flavor of `configured` (since `maxWidth` and `maxHeight` are config options).
     * If true, the {@link #names} property will be defined as well.
     * @readonly
     */
    constrainedMax: false,

    /**
     * @property {Boolean} constrainedMin
     * True if the size is constrained by a `minWidth` or `minHeight` configuration. This
     * is a flavor of `configured` (since `minWidth` and `minHeight` are config options).
     * If true, the {@link #names} property will be defined as well.
     * @readonly
     */
    constrainedMin: false,

    /**
     * @property {Boolean} fixed
     * True if the size is either `calculated` or `configured`, otherwise false.
     * @readonly
     */

    /**
     * @property {Boolean} natural
     * True if the size is determined by CSS and not by content. Such sizes are assumed to
     * be dependent on the container box and measurement occurs on the outer-most element.
     * @readonly
     */
    natural: false,

    /**
     * @property {Boolean} shrinkWrap
     * True if the size is determined by content irrespective of the container box.
     * @readonly
     */
    shrinkWrap: false,

    /**
     * @property {Boolean} calculatedFromConfigured
     * True if the size is calculated by the `ownerLayout` based on a configured size.
     * @readonly
     */
    calculatedFromConfigured: false,

    /**
     * @property {Boolean} calculatedFromNatural
     * True if the size is calculated by the `ownerLayout` based on `natural` size model
     * results.
     * @readonly
     */
    calculatedFromNatural: false,

    /**
     * @property {Boolean} calculatedFromShrinkWrap
     * True if the size is calculated by the `ownerLayout` based on `shrinkWrap` size model
     * results.
     * @readonly
     */
    calculatedFromShrinkWrap: false,

    /**
     * @property {Object} names An object with the config property names that determine the
     * size.
     * @property {String} names.width The width property name (e.g., 'width').
     * @property {String} names.height The height property name (e.g., 'minHeight').
     * @readonly
     */
    names: null
},
function () {
    var SizeModel = this,
        sizeModelsArray = SizeModel.sizeModelsArray,
        i, j, n, pairs, sizeModel;

    //-------------------------------------------------------------------------------
    // These are the 4 fundamental size models.

    new SizeModel({
        name: 'calculated'
    });

    new SizeModel({
        name: 'configured',
        names: { width: 'width', height: 'height' }
    });

    new SizeModel({
        name: 'natural'
    });

    new SizeModel({
        name: 'shrinkWrap'
    });

    //-------------------------------------------------------------------------------
    // These are the size models are flavors of the above but with some extra detail
    // about their dynamic use.

    new SizeModel({
        name: 'calculatedFromConfigured',
        configured: true,
        names: { width: 'width', height: 'height' }
    });

    new SizeModel({
        name: 'calculatedFromNatural',
        natural: true
    });

    new SizeModel({
        name: 'calculatedFromShrinkWrap',
        shrinkWrap: true
    });

    new SizeModel({
        name: 'constrainedMax',
        configured: true,
        constrained: true,
        names: { width: 'maxWidth', height: 'maxHeight' }
    });

    new SizeModel({
        name: 'constrainedMin',
        configured: true,
        constrained: true,
        names: { width: 'minWidth', height: 'minHeight' }
    });

    new SizeModel({
        name: 'constrainedDock',
        configured: true,
        constrained: true,
        constrainedByMin: true,
        names: { width: 'dockConstrainedWidth', height: 'dockConstrainedHeight' }
    });

    for (i = 0, n = sizeModelsArray.length; i < n; ++i) {
        sizeModel = sizeModelsArray[i];

        /**
         * An array of objects indexed by the {@link #ordinal} of a height `SizeModel` on
         * a width `SizeModel` to yield an object describing both height and width size
         * models.
         * 
         * Used like this:
         *
         *      widthModel.pairsByHeightOrdinal[heightModel.ordinal]
         *
         * This provides a reusable object equivalent to the following:
         * 
         *      {
         *          width: widthModel,
         *          height: heightModel
         *      }
         *
         * @property {Object[]} pairsByHeightOrdinal
         * @property {Ext.layout.SizeModel} pairsByHeightOrdinal.width The `SizeModel` for
         * the width.
         * @property {Ext.layout.SizeModel} pairsByHeightOrdinal.height The `SizeModel` for
         * the height.
         */
        sizeModel.pairsByHeightOrdinal = pairs = [];

        for (j = 0; j < n; ++j) {
            pairs.push({
                width: sizeModel,
                height: sizeModelsArray[j]
            });
        }
    }
});
