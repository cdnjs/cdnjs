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
 * @class Ext.fx.target.Sprite

 This class represents an animation target for a {@link Ext.draw.Sprite}. In general this class will not be
 created directly, the {@link Ext.draw.Sprite} will be passed to the animation and
 and the appropriate target will be created.

 * @markdown
 */

Ext.define('Ext.fx.target.Sprite', {

    /* Begin Definitions */

    extend: 'Ext.fx.target.Target',

    /* End Definitions */

    type: 'draw',

    getFromPrim: function (sprite, attr) {
        var obj;
        switch (attr) {
            case 'rotate':
            case 'rotation':
                obj = sprite.attr.rotation;
                return {
                    x: obj.x || 0,
                    y: obj.y || 0,
                    degrees: obj.degrees || 0
                };
            case 'scale':
            case 'scaling':
                obj = sprite.attr.scaling;
                return {
                    x: obj.x || 1,
                    y: obj.y || 1,
                    cx: obj.cx || 0,
                    cy: obj.cy || 0
                };
            case 'translate':
            case 'translation':
                obj = sprite.attr.translation;
                return {
                    x: obj.x || 0,
                    y: obj.y || 0
                };
            default:
                return sprite.attr[attr];
        }
    },

    getAttr: function (attr, val) {
        return [
            [this.target, val != undefined ? val : this.getFromPrim(this.target, attr)]
        ];
    },

    setAttr: function (targetData) {
        var ln = targetData.length,
            spriteArr = [],
            attrsConf, attr, attrArr, attrs, sprite, idx, value, i, j, x, y, ln2;
        for (i = 0; i < ln; i++) {
            attrsConf = targetData[i].attrs;
            for (attr in attrsConf) {
                attrArr = attrsConf[attr];
                ln2 = attrArr.length;
                for (j = 0; j < ln2; j++) {
                    sprite = attrArr[j][0];
                    attrs = attrArr[j][1];
                    if (attr === 'translate' || attr === 'translation') {
                        value = {
                            x: attrs.x,
                            y: attrs.y
                        };
                    }
                    else if (attr === 'rotate' || attr === 'rotation') {
                        x = attrs.x;
                        if (isNaN(x)) {
                            x = null;
                        }
                        y = attrs.y;
                        if (isNaN(y)) {
                            y = null;
                        }
                        value = {
                            degrees: attrs.degrees,
                            x: x,
                            y: y
                        };
                    } else if (attr === 'scale' || attr === 'scaling') {
                        x = attrs.x;
                        if (isNaN(x)) {
                            x = null;
                        }
                        y = attrs.y;
                        if (isNaN(y)) {
                            y = null;
                        }
                        value = {
                            x: x,
                            y: y,
                            cx: attrs.cx,
                            cy: attrs.cy
                        };
                    }
                    else if (attr === 'width' || attr === 'height' || attr === 'x' || attr === 'y') {
                        value = parseFloat(attrs);
                    }
                    else {
                        value = attrs;
                    }
                    idx = Ext.Array.indexOf(spriteArr, sprite);
                    if (idx == -1) {
                        spriteArr.push([sprite, {}]);
                        idx = spriteArr.length - 1;
                    }
                    spriteArr[idx][1][attr] = value;
                }
            }
        }
        ln = spriteArr.length;
        for (i = 0; i < ln; i++) {
            spriteArr[i][0].setAttributes(spriteArr[i][1]);
        }
        this.target.redraw();
    }
});
