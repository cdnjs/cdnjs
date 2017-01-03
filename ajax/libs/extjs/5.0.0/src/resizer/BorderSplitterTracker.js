/**
 * Private utility class for Ext.BorderSplitter.
 * @private
 */
Ext.define('Ext.resizer.BorderSplitterTracker', {
    extend: 'Ext.resizer.SplitterTracker',
    requires: ['Ext.util.Region'],

    getPrevCmp: null,
    getNextCmp: null,

    // calculate the constrain Region in which the splitter el may be moved.
    calculateConstrainRegion: function() {
        var me = this,
            splitter = me.splitter,
            collapseTarget = splitter.collapseTarget,
            defaultSplitMin = splitter.defaultSplitMin,
            sizePropCap = splitter.vertical ? 'Width' : 'Height',
            minSizeProp = 'min' + sizePropCap,
            maxSizeProp = 'max' + sizePropCap,
            getSizeMethod = 'get' + sizePropCap,
            neighbors = splitter.neighbors,
            length = neighbors.length,
            box = collapseTarget.el.getBox(),
            left = box.x,
            top = box.y,
            right = box.right,
            bottom = box.bottom,
            size = splitter.vertical ? (right - left) : (bottom - top),
            //neighborSizes = [],
            i, neighbor, minRange, maxRange, maxGrowth, maxShrink, targetSize;

        // if size=100 and minSize=80, we can reduce by 20 so minRange = minSize-size = -20
        minRange = (collapseTarget[minSizeProp] || Math.min(size,defaultSplitMin)) - size;

        // if maxSize=150, maxRange = maxSize - size = 50
        maxRange = collapseTarget[maxSizeProp];
        if (!maxRange) {
            maxRange = 1e9;
        } else {
            maxRange -= size;
        }
        targetSize = size;

        for (i = 0; i < length; ++i) {
            neighbor = neighbors[i];
            size = neighbor[getSizeMethod]();
            //neighborSizes.push(size);

            maxGrowth = size - neighbor[maxSizeProp]; // NaN if no maxSize or negative
            maxShrink = size - (neighbor[minSizeProp] || Math.min(size,defaultSplitMin));

            if (!isNaN(maxGrowth)) {
                // if neighbor can only grow by 10 (maxGrowth = -10), minRange cannot be
                // -20 anymore, but now only -10:
                if (minRange < maxGrowth) {
                    minRange = maxGrowth;
                }
            }

            // if neighbor can shrink by 20 (maxShrink=20), maxRange cannot be 50 anymore,
            // but now only 20:
            if (maxRange > maxShrink) {
                maxRange = maxShrink;
            }
        }

        if (maxRange - minRange < 2) {
            return null;
        }

        box = new Ext.util.Region(top, right, bottom, left);

        me.constraintAdjusters[me.getCollapseDirection()](box, minRange, maxRange, splitter);

        me.dragInfo = {
            minRange: minRange,
            maxRange: maxRange,
            //neighborSizes: neighborSizes,
            targetSize: targetSize
        };

        return box;
    },

    constraintAdjusters: {
        // splitter is to the right of the box
        left: function (box, minRange, maxRange, splitter) {
            box[0] = box.x = box.left = box.right + minRange;
            box.right += maxRange + splitter.getWidth();
        },

        // splitter is below the box
        top: function (box, minRange, maxRange, splitter) {
            box[1] = box.y = box.top = box.bottom + minRange;
            box.bottom += maxRange + splitter.getHeight();
        },

        // splitter is above the box
        bottom: function (box, minRange, maxRange, splitter) {
            box.bottom = box.top - minRange;
            box.top -= maxRange + splitter.getHeight();
        },

        // splitter is to the left of the box
        right: function (box, minRange, maxRange, splitter) {
            box.right = box.left - minRange;
            box[0] = box.x = box.left = box.x - maxRange + splitter.getWidth();
        }
    },

    onBeforeStart: function(e) {
        var me = this,
            splitter = me.splitter,
            collapseTarget = splitter.collapseTarget,
            neighbors = splitter.neighbors,
            length = neighbors.length,
            i, neighbor;

        if (collapseTarget.collapsed) {
            return false;
        }

        // disabled if any neighbors are collapsed in parallel direction.
        for (i = 0; i < length; ++i) {
            neighbor = neighbors[i];

            if (neighbor.collapsed && neighbor.isHorz === collapseTarget.isHorz) {
                return false;
            }
        }

        if (!(me.constrainTo = me.calculateConstrainRegion())) {
            return false;
        }

        return true;
    },

    performResize: function(e, offset) {
        var me = this,
            splitter = me.splitter,
            collapseDirection = splitter.getCollapseDirection(),
            collapseTarget = splitter.collapseTarget,
            // a vertical splitter adjusts horizontal dimensions
            adjusters = me.splitAdjusters[splitter.vertical ? 'horz' : 'vert'],
            delta = offset[adjusters.index],
            dragInfo = me.dragInfo,
            //neighbors = splitter.neighbors,
            //length = neighbors.length,
            //neighborSizes = dragInfo.neighborSizes,
            //isVert = collapseTarget.isVert,
            //i, neighbor,
            owner;

        if (collapseDirection == 'right' || collapseDirection == 'bottom') {
            // these splitters grow by moving left/up, so flip the sign of delta...
            delta = -delta;
        }

        // now constrain delta to our computed range:
        delta = Math.min(Math.max(dragInfo.minRange, delta), dragInfo.maxRange);

        if (delta) {
            (owner = splitter.ownerCt).suspendLayouts();

            adjusters.adjustTarget(collapseTarget, dragInfo.targetSize, delta);

            //for (i = 0; i < length; ++i) {
            //    neighbor = neighbors[i];
            //    if (!neighbor.isCenter && !neighbor.maintainFlex && neighbor.isVert == isVert) {
            //        delete neighbor.flex;
            //        adjusters.adjustNeighbor(neighbor, neighborSizes[i], delta);
            //    }
            //}

            owner.resumeLayouts(true);
        }
    },

    splitAdjusters: {
        horz: {
            index: 0,
            //adjustNeighbor: function (neighbor, size, delta) {
            //    neighbor.setSize(size - delta);
            //},
            adjustTarget: function (target, size, delta) {
                target.flex = null;
                target.setSize(size + delta);
            }
        },
        vert: {
            index: 1,
            //adjustNeighbor: function (neighbor, size, delta) {
            //    neighbor.setSize(undefined, size - delta);
            //},
            adjustTarget: function (target, targetSize, delta) {
                target.flex = null;
                target.setSize(undefined, targetSize + delta);
            }
        }
    },

    getCollapseDirection: function() {
        return this.splitter.getCollapseDirection();
    }
});
