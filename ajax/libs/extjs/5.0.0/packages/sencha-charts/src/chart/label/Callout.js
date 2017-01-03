/**
 * @class Ext.chart.label.Callout
 * @extends Ext.draw.modifier.Modifier
 *
 * This is a modifier to place labels and callouts by additional attributes.
 */
Ext.define('Ext.chart.label.Callout', {
    extend: 'Ext.draw.modifier.Modifier',

    prepareAttributes: function (attr) {
        if (!attr.hasOwnProperty('calloutOriginal')) {
            attr.calloutOriginal = Ext.Object.chain(attr);
            // No __proto__, nor getPrototypeOf in IE8,
            // so manually saving a reference to 'attr' after chaining.
            attr.calloutOriginal.$prototype = attr;
        }
        if (this._previous) {
            this._previous.prepareAttributes(attr.calloutOriginal);
        }
    },

    setAttrs: function (attr, changes) {
        var callout = attr.callout,
            origin = attr.calloutOriginal,
            bbox = attr.bbox.plain,
            width = (bbox.width || 0) + attr.labelOverflowPadding,
            height = (bbox.height || 0) + attr.labelOverflowPadding,
            dx, dy;

        if ('callout' in changes) {
            callout = changes.callout;
        }

        if ('callout' in changes || 'calloutPlaceX' in changes || 'calloutPlaceY' in changes || 'x' in changes || 'y' in changes) {
            var rotationRads = 'rotationRads' in changes ? origin.rotationRads = changes.rotationRads : origin.rotationRads,
                x = 'x' in changes ? (origin.x = changes.x) : origin.x,
                y = 'y' in changes ? (origin.y = changes.y) : origin.y,
                calloutPlaceX = 'calloutPlaceX' in changes ? changes.calloutPlaceX : attr.calloutPlaceX,
                calloutPlaceY = 'calloutPlaceY' in changes ? changes.calloutPlaceY : attr.calloutPlaceY,
                calloutVertical = 'calloutVertical' in changes ? changes.calloutVertical : attr.calloutVertical,
                temp;

            // Normalize Rotations
            rotationRads %= Math.PI * 2;
            if (Math.cos(rotationRads) < 0) {
                rotationRads = (rotationRads + Math.PI) % (Math.PI * 2);
            }

            if (rotationRads > Math.PI) {
                rotationRads -= Math.PI * 2;
            }

            if (calloutVertical) {
                rotationRads = rotationRads * (1 - callout) - Math.PI / 2 * callout;
                temp = width;
                width = height;
                height = temp;
            } else {
                rotationRads = rotationRads * (1 - callout);
            }
            changes.rotationRads = rotationRads;


            // Placing a label in the middle of a pie slice (x/y)
            // if callout doesn't exists (callout=0),
            // or outside the pie slice (calloutPlaceX/Y) if it does (callout=1).
            changes.x = x * (1 - callout) + calloutPlaceX * callout;
            changes.y = y * (1 - callout) + calloutPlaceY * callout;


            dx = calloutPlaceX - x;
            dy = calloutPlaceY - y;
            // Finding where the callout line intersects the bbox of the label
            // if it were to go to the center of the label,
            // and make that intersection point the end of the callout line.
            // Effectively, the end of the callout line traces label's bbox when chart is rotated.
            if (Math.abs(dy * width) > Math.abs(dx * height)) {
                // on top/bottom
                if (dy > 0) {
                    changes.calloutEndX = changes.x - (height / 2) * (dx / dy) * callout;
                    changes.calloutEndY = changes.y - (height / 2) * callout;
                } else {
                    changes.calloutEndX = changes.x + (height / 2) * (dx / dy) * callout;
                    changes.calloutEndY = changes.y + (height / 2) * callout;
                }
            } else {
                // on left/right
                if (dx > 0) {
                    changes.calloutEndX = changes.x - width / 2;
                    changes.calloutEndY = changes.y - (width / 2) * (dy / dx) * callout;
                } else {
                    changes.calloutEndX = changes.x + width / 2;
                    changes.calloutEndY = changes.y + (width / 2) * (dy / dx) * callout;
                }
            }
            // Since the length of the callout line is adjusted depending on the label's position
            // and dimensions, we hide the callout line if the length becomes negative.
            if (changes.calloutStartX && changes.calloutStartY) {
                changes.calloutHasLine =
                    (dx > 0 && changes.calloutStartX < changes.calloutEndX) ||
                    (dx <= 0 && changes.calloutStartX > changes.calloutEndX) ||
                    (dy > 0 && changes.calloutStartY < changes.calloutEndY) ||
                    (dy <= 0 && changes.calloutStartY > changes.calloutEndY);
            } else {
                changes.calloutHasLine = true;
            }
        }

        return changes;
    },

    pushDown: function (attr, changes) {
        changes = Ext.draw.modifier.Modifier.prototype.pushDown.call(this, attr.calloutOriginal, changes);
        return this.setAttrs(attr, changes);
    },

    popUp: function (attr, changes) {
        attr = attr.$prototype || {};
        changes = this.setAttrs(attr, changes);
        if (this._next) {
            return this._next.popUp(attr, changes);
        } else {
            return Ext.apply(attr, changes);
        }
    }
});