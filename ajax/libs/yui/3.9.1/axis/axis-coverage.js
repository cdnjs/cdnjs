if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/axis/axis.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/axis/axis.js",
    code: []
};
_yuitest_coverage["build/axis/axis.js"].code=["YUI.add('axis', function (Y, NAME) {","","/**"," * Provides base functionality for drawing chart axes."," *"," * @module charts"," * @submodule axis"," */","var CONFIG = Y.config,","    DOCUMENT = CONFIG.doc,","    Y_Lang = Y.Lang,","    IS_STRING = Y_Lang.isString,","    Y_DOM = Y.DOM,","    LeftAxisLayout,","    RightAxisLayout,","    BottomAxisLayout,","    TopAxisLayout;","/**"," * Algorithmic strategy for rendering a left axis."," *"," * @class LeftAxisLayout"," * @constructor"," * @submodule axis"," */","LeftAxisLayout = function() {};","","LeftAxisLayout.prototype = {","    /**","     *  Default margins for text fields.","     *","     *  @private","     *  @method _getDefaultMargins","     *  @return Object","     */","    _getDefaultMargins: function()","    {","        return {","            top: 0,","            left: 0,","            right: 4,","            bottom: 0","        };","    },","","    /**","     * Sets the length of the tick on either side of the axis line.","     *","     * @method setTickOffset","     * @protected","     */","    setTickOffsets: function()","    {","        var host = this,","            majorTicks = host.get(\"styles\").majorTicks,","            tickLength = majorTicks.length,","            halfTick = tickLength * 0.5,","            display = majorTicks.display;","        host.set(\"topTickOffset\",  0);","        host.set(\"bottomTickOffset\",  0);","","        switch(display)","        {","            case \"inside\" :","                host.set(\"rightTickOffset\",  tickLength);","                host.set(\"leftTickOffset\", 0);","            break;","            case \"outside\" :","                host.set(\"rightTickOffset\", 0);","                host.set(\"leftTickOffset\",  tickLength);","            break;","            case \"cross\":","                host.set(\"rightTickOffset\", halfTick);","                host.set(\"leftTickOffset\",  halfTick);","            break;","            default:","                host.set(\"rightTickOffset\", 0);","                host.set(\"leftTickOffset\", 0);","            break;","        }","    },","","    /**","     * Draws a tick","     *","     * @method drawTick","     * @param {Path} path reference to the path `Path` element in which to draw the tick.","     * @param {Object} pt Point on the axis in which the tick will intersect.","     * @param {Object} tickStyle Hash of properties to apply to the tick.","     * @protected","     */","    drawTick: function(path, pt, tickStyles)","    {","        var host = this,","            style = host.get(\"styles\"),","            padding = style.padding,","            tickLength = tickStyles.length,","            start = {x:padding.left, y:pt.y},","            end = {x:tickLength + padding.left, y:pt.y};","        host.drawLine(path, start, end);","    },","","    /**","     * Calculates the coordinates for the first point on an axis.","     *","     * @method getLineStart","     * @return {Object}","     * @protected","     */","    getLineStart: function()","    {","        var style = this.get(\"styles\"),","            padding = style.padding,","            majorTicks = style.majorTicks,","            tickLength = majorTicks.length,","            display = majorTicks.display,","            pt = {x:padding.left, y:0};","        if(display === \"outside\")","        {","            pt.x += tickLength;","        }","        else if(display === \"cross\")","        {","            pt.x += tickLength/2;","        }","        return pt;","    },","","    /**","     * Calculates the point for a label.","     *","     * @method getLabelPoint","     * @param {Object} point Point on the axis in which the tick will intersect.","     * @return {Object}","     * @protected","     */","    getLabelPoint: function(point)","    {","        return {x:point.x - this.get(\"leftTickOffset\"), y:point.y};","    },","","    /**","     * Updates the value for the `maxLabelSize` for use in calculating total size.","     *","     * @method updateMaxLabelSize","     * @param {HTMLElement} label to measure","     * @protected","     */","    updateMaxLabelSize: function(labelWidth, labelHeight)","    {","        var host = this,","            props = this._labelRotationProps,","            rot = props.rot,","            absRot = props.absRot,","            sinRadians = props.sinRadians,","            cosRadians = props.cosRadians,","            max;","        if(rot === 0)","        {","            max = labelWidth;","        }","        else if(absRot === 90)","        {","            max = labelHeight;","        }","        else","        {","            max = (cosRadians * labelWidth) + (sinRadians * labelHeight);","        }","        host._maxLabelSize = Math.max(host._maxLabelSize, max);","    },","","    /**","     * Determines the available label width when the axis width has been explicitly set.","     *","     * @method getExplicitlySized","     * @return Boolean","     * @protected","     */","    getExplicitlySized: function(styles)","    {","        if(this._explicitWidth)","        {","            var host = this,","                w = host._explicitWidth,","                totalTitleSize = host._totalTitleSize,","                leftTickOffset = host.get(\"leftTickOffset\"),","                margin = styles.label.margin.right;","            host._maxLabelSize =  w - (leftTickOffset + margin + totalTitleSize);","            return true;","        }","        return false;","    },","","    /**","     * Rotate and position title.","     *","     * @method positionTitle","     * @param {HTMLElement} label to rotate position","     * @protected","     */","    positionTitle: function(label)","    {","        var host = this,","            bounds = host._titleBounds,","            margin = host.get(\"styles\").title.margin,","            props = host._titleRotationProps,","            w = bounds.right - bounds.left,","            labelWidth = label.offsetWidth,","            labelHeight = label.offsetHeight,","            x = (labelWidth * -0.5) + (w * 0.5),","            y = (host.get(\"height\") * 0.5) - (labelHeight * 0.5);","        props.labelWidth = labelWidth;","        props.labelHeight = labelHeight;","        if(margin && margin.left)","        {","            x += margin.left;","        }","        props.x = x;","        props.y = y;","        props.transformOrigin = [0.5, 0.5];","        host._rotate(label, props);","    },","","    /**","     * Rotate and position labels.","     *","     * @method positionLabel","     * @param {HTMLElement} label to rotate position","     * @param {Object} pt hash containing the x and y coordinates in which the label will be positioned","     * against.","     * @protected","     */","    positionLabel: function(label, pt, styles, i)","    {","        var host = this,","            tickOffset = host.get(\"leftTickOffset\"),","            totalTitleSize = this._totalTitleSize,","            leftOffset = pt.x + totalTitleSize - tickOffset,","            topOffset = pt.y,","            props = this._labelRotationProps,","            rot = props.rot,","            absRot = props.absRot,","            maxLabelSize = host._maxLabelSize,","            labelWidth = this._labelWidths[i],","            labelHeight = this._labelHeights[i];","        if(rot === 0)","        {","            leftOffset -= labelWidth;","            topOffset -= labelHeight * 0.5;","        }","        else if(rot === 90)","        {","            leftOffset -= labelWidth * 0.5;","        }","        else if(rot === -90)","        {","            leftOffset -= labelWidth * 0.5;","            topOffset -= labelHeight;","        }","        else","        {","            leftOffset -= labelWidth + (labelHeight * absRot/360);","            topOffset -= labelHeight * 0.5;","        }","        props.labelWidth = labelWidth;","        props.labelHeight = labelHeight;","        props.x = Math.round(maxLabelSize + leftOffset);","        props.y = Math.round(topOffset);","        this._rotate(label, props);","    },","","    /**","     * Adjusts the coordinates of an axis label based on the rotation.","     *","     * @method _setRotationCoords","     * @param {Object} props Coordinates, dimension and rotation properties of the label.","     * @protected","     */","    _setRotationCoords: function(props)","    {","        var rot = props.rot,","            absRot = props.absRot,","            leftOffset,","            topOffset,","            labelWidth = props.labelWidth,","            labelHeight = props.labelHeight;","        if(rot === 0)","        {","            leftOffset = labelWidth;","            topOffset = labelHeight * 0.5;","        }","        else if(rot === 90)","        {","            topOffset = 0;","            leftOffset = labelWidth * 0.5;","        }","        else if(rot === -90)","        {","            leftOffset = labelWidth * 0.5;","            topOffset = labelHeight;","        }","        else","        {","            leftOffset = labelWidth + (labelHeight * absRot/360);","            topOffset = labelHeight * 0.5;","        }","        props.x -= leftOffset;","        props.y -= topOffset;","    },","","    /**","     * Returns the transformOrigin to use for an axis label based on the position of the axis","     * and the rotation of the label.","     *","     * @method _getTransformOrigin","     * @param {Number} rot The rotation (in degrees) of the label.","     * @return Array","     * @protected","     */","    _getTransformOrigin: function(rot)","    {","        var transformOrigin;","        if(rot === 0)","        {","            transformOrigin = [0, 0];","        }","        else if(rot === 90)","        {","            transformOrigin = [0.5, 0];","        }","        else if(rot === -90)","        {","            transformOrigin = [0.5, 1];","        }","        else","        {","            transformOrigin = [1, 0.5];","        }","        return transformOrigin;","    },","","    /**","     * Adjust the position of the Axis widget's content box for internal axes.","     *","     * @method offsetNodeForTick","     * @param {Node} cb contentBox of the axis","     * @protected","     */","    offsetNodeForTick: function()","    {","    },","","    /**","     * Sets the width of the axis based on its contents.","     *","     * @method setCalculatedSize","     * @protected","     */","    setCalculatedSize: function()","    {","        var host = this,","            graphic = this.get(\"graphic\"),","            style = host.get(\"styles\"),","            label = style.label,","            tickOffset = host.get(\"leftTickOffset\"),","            max = host._maxLabelSize,","            totalTitleSize = this._totalTitleSize,","            ttl = Math.round(totalTitleSize + tickOffset + max + label.margin.right);","        if(this._explicitWidth)","        {","            ttl = this._explicitWidth;","        }","        this.set(\"calculatedWidth\", ttl);","        graphic.set(\"x\", ttl - tickOffset);","    }","};","","Y.LeftAxisLayout = LeftAxisLayout;","/**"," * RightAxisLayout contains algorithms for rendering a right axis."," *"," * @class RightAxisLayout"," * @constructor"," * @submodule axis"," */","RightAxisLayout = function(){};","","RightAxisLayout.prototype = {","    /**","     *  Default margins for text fields.","     *","     *  @private","     *  @method _getDefaultMargins","     *  @return Object","     */","    _getDefaultMargins: function()","    {","        return {","            top: 0,","            left: 4,","            right: 0,","            bottom: 0","        };","    },","","    /**","     * Sets the length of the tick on either side of the axis line.","     *","     * @method setTickOffset","     * @protected","     */","    setTickOffsets: function()","    {","        var host = this,","            majorTicks = host.get(\"styles\").majorTicks,","            tickLength = majorTicks.length,","            halfTick = tickLength * 0.5,","            display = majorTicks.display;","        host.set(\"topTickOffset\",  0);","        host.set(\"bottomTickOffset\",  0);","","        switch(display)","        {","            case \"inside\" :","                host.set(\"leftTickOffset\", tickLength);","                host.set(\"rightTickOffset\", 0);","            break;","            case \"outside\" :","                host.set(\"leftTickOffset\", 0);","                host.set(\"rightTickOffset\", tickLength);","            break;","            case \"cross\" :","                host.set(\"rightTickOffset\", halfTick);","                host.set(\"leftTickOffset\", halfTick);","            break;","            default:","                host.set(\"leftTickOffset\", 0);","                host.set(\"rightTickOffset\", 0);","            break;","        }","    },","","    /**","     * Draws a tick","     *","     * @method drawTick","     * @param {Path} path reference to the path `Path` element in which to draw the tick.","     * @param {Object} pt Point on the axis in which the tick will intersect.","     * @param {Object) tickStyle Hash of properties to apply to the tick.","     * @protected","     */","    drawTick: function(path, pt, tickStyles)","    {","        var host = this,","            style = host.get(\"styles\"),","            padding = style.padding,","            tickLength = tickStyles.length,","            start = {x:padding.left, y:pt.y},","            end = {x:padding.left + tickLength, y:pt.y};","        host.drawLine(path, start, end);","    },","","    /**","     * Calculates the coordinates for the first point on an axis.","     *","     * @method getLineStart","     * @return {Object}","     * @protected","     */","    getLineStart: function()","    {","        var host = this,","            style = host.get(\"styles\"),","            padding = style.padding,","            majorTicks = style.majorTicks,","            tickLength = majorTicks.length,","            display = majorTicks.display,","            pt = {x:padding.left, y:padding.top};","        if(display === \"inside\")","        {","            pt.x += tickLength;","        }","        else if(display === \"cross\")","        {","            pt.x += tickLength/2;","        }","        return pt;","    },","","    /**","     * Calculates the point for a label.","     *","     * @method getLabelPoint","     * @param {Object} point Point on the axis in which the tick will intersect.","     * @return {Object}","     * @protected","     */","    getLabelPoint: function(point)","    {","        return {x:point.x + this.get(\"rightTickOffset\"), y:point.y};","    },","","    /**","     * Updates the value for the `maxLabelSize` for use in calculating total size.","     *","     * @method updateMaxLabelSize","     * @param {HTMLElement} label to measure","     * @protected","     */","    updateMaxLabelSize: function(labelWidth, labelHeight)","    {","        var host = this,","            props = this._labelRotationProps,","            rot = props.rot,","            absRot = props.absRot,","            sinRadians = props.sinRadians,","            cosRadians = props.cosRadians,","            max;","        if(rot === 0)","        {","            max = labelWidth;","        }","        else if(absRot === 90)","        {","            max = labelHeight;","        }","        else","        {","            max = (cosRadians * labelWidth) + (sinRadians * labelHeight);","        }","        host._maxLabelSize = Math.max(host._maxLabelSize, max);","    },","","    /**","     * Determines the available label width when the axis width has been explicitly set.","     *","     * @method getExplicitlySized","     * @return Boolean","     * @protected","     */","    getExplicitlySized: function(styles)","    {","        if(this._explicitWidth)","        {","            var host = this,","                w = host._explicitWidth,","                totalTitleSize = this._totalTitleSize,","                rightTickOffset = host.get(\"rightTickOffset\"),","                margin = styles.label.margin.right;","            host._maxLabelSize =  w - (rightTickOffset + margin + totalTitleSize);","            return true;","        }","        return false;","    },","","    /**","     * Rotate and position title.","     *","     * @method positionTitle","     * @param {HTMLElement} label to rotate position","     * @protected","     */","    positionTitle: function(label)","    {","        var host = this,","            bounds = host._titleBounds,","            margin = host.get(\"styles\").title.margin,","            props = host._titleRotationProps,","            labelWidth = label.offsetWidth,","            labelHeight = label.offsetHeight,","            w = bounds.right - bounds.left,","            x = this.get(\"width\") - (labelWidth * 0.5) - (w * 0.5),","            y = (host.get(\"height\") * 0.5) - (labelHeight * 0.5);","        props.labelWidth = labelWidth;","        props.labelHeight = labelHeight;","        if(margin && margin.right)","        {","            x -= margin.left;","        }","        props.x = x;","        props.y = y;","        props.transformOrigin = [0.5, 0.5];","        host._rotate(label, props);","    },","","    /**","     * Rotate and position labels.","     *","     * @method positionLabel","     * @param {HTMLElement} label to rotate position","     * @param {Object} pt hash containing the x and y coordinates in which the label will be positioned","     * against.","     * @protected","     */","    positionLabel: function(label, pt, styles, i)","    {","        var host = this,","            tickOffset = host.get(\"rightTickOffset\"),","            labelStyles = styles.label,","            margin = 0,","            leftOffset = pt.x,","            topOffset = pt.y,","            props = this._labelRotationProps,","            rot = props.rot,","            absRot = props.absRot,","            labelWidth = this._labelWidths[i],","            labelHeight = this._labelHeights[i];","        if(labelStyles.margin && labelStyles.margin.left)","        {","            margin = labelStyles.margin.left;","        }","        if(rot === 0)","        {","            topOffset -= labelHeight * 0.5;","        }","        else if(rot === 90)","        {","            leftOffset -= labelWidth * 0.5;","            topOffset -= labelHeight;","        }","        else if(rot === -90)","        {","            leftOffset -= labelWidth * 0.5;","        }","        else","        {","            topOffset -= labelHeight * 0.5;","            leftOffset += labelHeight/2 * absRot/90;","        }","        leftOffset += margin;","        leftOffset += tickOffset;","        props.labelWidth = labelWidth;","        props.labelHeight = labelHeight;","        props.x = Math.round(leftOffset);","        props.y = Math.round(topOffset);","        this._rotate(label, props);","    },","","    /**","     * Adjusts the coordinates of an axis label based on the rotation.","     *","     * @method _setRotationCoords","     * @param {Object} props Coordinates, dimension and rotation properties of the label.","     * @protected","     */","    _setRotationCoords: function(props)","    {","        var rot = props.rot,","            absRot = props.absRot,","            leftOffset = 0,","            topOffset = 0,","            labelWidth = props.labelWidth,","            labelHeight = props.labelHeight;","        if(rot === 0)","        {","            topOffset = labelHeight * 0.5;","        }","        else if(rot === 90)","        {","            leftOffset = labelWidth * 0.5;","            topOffset = labelHeight;","        }","        else if(rot === -90)","        {","            leftOffset = labelWidth * 0.5;","        }","        else","        {","            topOffset = labelHeight * 0.5;","            leftOffset = labelHeight/2 * absRot/90;","        }","        props.x -= leftOffset;","        props.y -= topOffset;","    },","","    /**","     * Returns the transformOrigin to use for an axis label based on the position of the axis","     * and the rotation of the label.","     *","     * @method _getTransformOrigin","     * @param {Number} rot The rotation (in degrees) of the label.","     * @return Array","     * @protected","     */","    _getTransformOrigin: function(rot)","    {","        var transformOrigin;","        if(rot === 0)","        {","            transformOrigin = [0, 0];","        }","        else if(rot === 90)","        {","            transformOrigin = [0.5, 1];","        }","        else if(rot === -90)","        {","            transformOrigin = [0.5, 0];","        }","        else","        {","            transformOrigin = [0, 0.5];","        }","        return transformOrigin;","    },","","    /**","     * Adjusts position for inner ticks.","     *","     * @method offsetNodeForTick","     * @param {Node} cb contentBox of the axis","     * @protected","     */","    offsetNodeForTick: function(cb)","    {","        var host = this,","            tickOffset = host.get(\"leftTickOffset\"),","            offset = 0 - tickOffset;","        cb.setStyle(\"left\", offset);","    },","","    /**","     * Assigns a height based on the size of the contents.","     *","     * @method setCalculatedSize","     * @protected","     */","    setCalculatedSize: function()","    {","        var host = this,","            styles = host.get(\"styles\"),","            labelStyle = styles.label,","            totalTitleSize = this._totalTitleSize,","            ttl = Math.round(host.get(\"rightTickOffset\") + host._maxLabelSize + totalTitleSize + labelStyle.margin.left);","        if(this._explicitWidth)","        {","            ttl = this._explicitWidth;","        }","        host.set(\"calculatedWidth\", ttl);","        host.get(\"contentBox\").setStyle(\"width\", ttl);","    }","};","","Y.RightAxisLayout = RightAxisLayout;","/**"," * Contains algorithms for rendering a bottom axis."," *"," * @class BottomAxisLayout"," * @Constructor"," * @submodule axis"," */","BottomAxisLayout = function(){};","","BottomAxisLayout.prototype = {","    /**","     *  Default margins for text fields.","     *","     *  @private","     *  @method _getDefaultMargins","     *  @return Object","     */","    _getDefaultMargins: function()","    {","        return {","            top: 4,","            left: 0,","            right: 0,","            bottom: 0","        };","    },","","    /**","     * Sets the length of the tick on either side of the axis line.","     *","     * @method setTickOffsets","     * @protected","     */","    setTickOffsets: function()","    {","        var host = this,","            majorTicks = host.get(\"styles\").majorTicks,","            tickLength = majorTicks.length,","            halfTick = tickLength * 0.5,","            display = majorTicks.display;","        host.set(\"leftTickOffset\",  0);","        host.set(\"rightTickOffset\",  0);","","        switch(display)","        {","            case \"inside\" :","                host.set(\"topTickOffset\", tickLength);","                host.set(\"bottomTickOffset\", 0);","            break;","            case \"outside\" :","                host.set(\"topTickOffset\", 0);","                host.set(\"bottomTickOffset\", tickLength);","            break;","            case \"cross\":","                host.set(\"topTickOffset\",  halfTick);","                host.set(\"bottomTickOffset\",  halfTick);","            break;","            default:","                host.set(\"topTickOffset\", 0);","                host.set(\"bottomTickOffset\", 0);","            break;","        }","    },","","    /**","     * Calculates the coordinates for the first point on an axis.","     *","     * @method getLineStart","     * @protected","     */","    getLineStart: function()","    {","        var style = this.get(\"styles\"),","            padding = style.padding,","            majorTicks = style.majorTicks,","            tickLength = majorTicks.length,","            display = majorTicks.display,","            pt = {x:0, y:padding.top};","        if(display === \"inside\")","        {","            pt.y += tickLength;","        }","        else if(display === \"cross\")","        {","            pt.y += tickLength/2;","        }","        return pt;","    },","","    /**","     * Draws a tick","     *","     * @method drawTick","     * @param {Path} path reference to the path `Path` element in which to draw the tick.","     * @param {Object} pt hash containing x and y coordinates","     * @param {Object} tickStyles hash of properties used to draw the tick","     * @protected","     */","    drawTick: function(path, pt, tickStyles)","    {","        var host = this,","            style = host.get(\"styles\"),","            padding = style.padding,","            tickLength = tickStyles.length,","            start = {x:pt.x, y:padding.top},","            end = {x:pt.x, y:tickLength + padding.top};","        host.drawLine(path, start, end);","    },","","    /**","     * Calculates the point for a label.","     *","     * @method getLabelPoint","     * @param {Object} pt Object containing x and y coordinates","     * @return Object","     * @protected","     */","    getLabelPoint: function(point)","    {","        return {x:point.x, y:point.y + this.get(\"bottomTickOffset\")};","    },","","    /**","     * Updates the value for the `maxLabelSize` for use in calculating total size.","     *","     * @method updateMaxLabelSize","     * @param {HTMLElement} label to measure","     * @protected","     */","    updateMaxLabelSize: function(labelWidth, labelHeight)","    {","        var host = this,","            props = this._labelRotationProps,","            rot = props.rot,","            absRot = props.absRot,","            sinRadians = props.sinRadians,","            cosRadians = props.cosRadians,","            max;","        if(rot === 0)","        {","            max = labelHeight;","        }","        else if(absRot === 90)","        {","            max = labelWidth;","        }","        else","        {","            max = (sinRadians * labelWidth) + (cosRadians * labelHeight);","        }","        host._maxLabelSize = Math.max(host._maxLabelSize, max);","    },","","    /**","     * Determines the available label height when the axis width has been explicitly set.","     *","     * @method getExplicitlySized","     * @return Boolean","     * @protected","     */","    getExplicitlySized: function(styles)","    {","        if(this._explicitHeight)","        {","            var host = this,","                h = host._explicitHeight,","                totalTitleSize = host._totalTitleSize,","                bottomTickOffset = host.get(\"bottomTickOffset\"),","                margin = styles.label.margin.right;","            host._maxLabelSize =  h - (bottomTickOffset + margin + totalTitleSize);","            return true;","        }","        return false;","    },","","    /**","     * Rotate and position title.","     *","     * @method positionTitle","     * @param {HTMLElement} label to rotate position","     * @protected","     */","    positionTitle: function(label)","    {","        var host = this,","            bounds = host._titleBounds,","            margin = host.get(\"styles\").title.margin,","            props = host._titleRotationProps,","            h = bounds.bottom - bounds.top,","            labelWidth = label.offsetWidth,","            labelHeight = label.offsetHeight,","            x = (host.get(\"width\") * 0.5) - (labelWidth * 0.5),","            y = host.get(\"height\") - labelHeight/2 - h/2;","        props.labelWidth = labelWidth;","        props.labelHeight = labelHeight;","        if(margin && margin.bottom)","        {","            y -= margin.bottom;","        }","        props.x = x;","        props.y = y;","        props.transformOrigin = [0.5, 0.5];","        host._rotate(label, props);","    },","","    /**","     * Rotate and position labels.","     *","     * @method positionLabel","     * @param {HTMLElement} label to rotate position","     * @param {Object} pt hash containing the x and y coordinates in which the label will be positioned","     * against.","     * @protected","     */","    positionLabel: function(label, pt, styles, i)","    {","        var host = this,","            tickOffset = host.get(\"bottomTickOffset\"),","            labelStyles = styles.label,","            margin = 0,","            props = host._labelRotationProps,","            rot = props.rot,","            absRot = props.absRot,","            leftOffset = Math.round(pt.x),","            topOffset = Math.round(pt.y),","            labelWidth = host._labelWidths[i],","            labelHeight = host._labelHeights[i];","        if(labelStyles.margin && labelStyles.margin.top)","        {","            margin = labelStyles.margin.top;","        }","        if(rot > 0)","        {","            topOffset -= labelHeight/2 * rot/90;","        }","        else if(rot < 0)","        {","            leftOffset -= labelWidth;","            topOffset -= labelHeight/2 * absRot/90;","        }","        else","        {","            leftOffset -= labelWidth * 0.5;","        }","        topOffset += margin;","        topOffset += tickOffset;","        props.labelWidth = labelWidth;","        props.labelHeight = labelHeight;","        props.x = leftOffset;","        props.y = topOffset;","        host._rotate(label, props);","    },","","    /**","     * Adjusts the coordinates of an axis label based on the rotation.","     *","     * @method _setRotationCoords","     * @param {Object} props Coordinates, dimension and rotation properties of the label.","     * @protected","     */","    _setRotationCoords: function(props)","    {","        var rot = props.rot,","            absRot = props.absRot,","            labelWidth = props.labelWidth,","            labelHeight = props.labelHeight,","            leftOffset,","            topOffset;","","        if(rot > 0)","        {","            leftOffset = 0;","            topOffset = labelHeight/2 * rot/90;","        }","        else if(rot < 0)","        {","            leftOffset = labelWidth;","            topOffset = labelHeight/2 * absRot/90;","        }","        else","        {","            leftOffset = labelWidth * 0.5;","            topOffset = 0;","        }","        props.x -= leftOffset;","        props.y -= topOffset;","    },","","    /**","     * Returns the transformOrigin to use for an axis label based on the position of the axis","     * and the rotation of the label.","     *","     * @method _getTransformOrigin","     * @param {Number} rot The rotation (in degrees) of the label.","     * @return Array","     * @protected","     */","    _getTransformOrigin: function(rot)","    {","        var transformOrigin;","        if(rot > 0)","        {","            transformOrigin = [0, 0.5];","        }","        else if(rot < 0)","        {","            transformOrigin = [1, 0.5];","        }","        else","        {","            transformOrigin = [0, 0];","        }","        return transformOrigin;","    },","","    /**","     * Adjusts position for inner ticks.","     *","     * @method offsetNodeForTick","     * @param {Node} cb contentBox of the axis","     * @protected","     */","    offsetNodeForTick: function(cb)","    {","        var host = this;","        cb.setStyle(\"top\", 0 - host.get(\"topTickOffset\"));","    },","","    /**","     * Assigns a height based on the size of the contents.","     *","     * @method setCalculatedSize","     * @protected","     */","    setCalculatedSize: function()","    {","        var host = this,","            styles = host.get(\"styles\"),","            labelStyle = styles.label,","            totalTitleSize = host._totalTitleSize,","            ttl = Math.round(host.get(\"bottomTickOffset\") + host._maxLabelSize + labelStyle.margin.top + totalTitleSize);","        if(host._explicitHeight)","        {","            ttl = host._explicitHeight;","        }","        host.set(\"calculatedHeight\", ttl);","    }","};","Y.BottomAxisLayout = BottomAxisLayout;","/**"," * Contains algorithms for rendering a top axis."," *"," * @class TopAxisLayout"," * @constructor"," * @submodule axis"," */","TopAxisLayout = function(){};","","TopAxisLayout.prototype = {","    /**","     *  Default margins for text fields.","     *","     *  @private","     *  @method _getDefaultMargins","     *  @return Object","     */","    _getDefaultMargins: function()","    {","        return {","            top: 0,","            left: 0,","            right: 0,","            bottom: 4","        };","    },","","    /**","     * Sets the length of the tick on either side of the axis line.","     *","     * @method setTickOffsets","     * @protected","     */","    setTickOffsets: function()","    {","        var host = this,","            majorTicks = host.get(\"styles\").majorTicks,","            tickLength = majorTicks.length,","            halfTick = tickLength * 0.5,","            display = majorTicks.display;","        host.set(\"leftTickOffset\",  0);","        host.set(\"rightTickOffset\",  0);","        switch(display)","        {","            case \"inside\" :","                host.set(\"bottomTickOffset\", tickLength);","                host.set(\"topTickOffset\", 0);","            break;","            case \"outside\" :","                host.set(\"bottomTickOffset\", 0);","                host.set(\"topTickOffset\",  tickLength);","            break;","            case \"cross\" :","                host.set(\"topTickOffset\", halfTick);","                host.set(\"bottomTickOffset\", halfTick);","            break;","            default:","                host.set(\"topTickOffset\", 0);","                host.set(\"bottomTickOffset\", 0);","            break;","        }","    },","","    /**","     * Calculates the coordinates for the first point on an axis.","     *","     * @method getLineStart","     * @protected","     */","    getLineStart: function()","    {","        var host = this,","            style = host.get(\"styles\"),","            padding = style.padding,","            majorTicks = style.majorTicks,","            tickLength = majorTicks.length,","            display = majorTicks.display,","            pt = {x:0, y:padding.top};","        if(display === \"outside\")","        {","            pt.y += tickLength;","        }","        else if(display === \"cross\")","        {","            pt.y += tickLength/2;","        }","        return pt;","    },","","    /**","     * Draws a tick","     *","     * @method drawTick","     * @param {Path} path reference to the path `Path` element in which to draw the tick.","     * @param {Object} pt hash containing x and y coordinates","     * @param {Object} tickStyles hash of properties used to draw the tick","     * @protected","     */","    drawTick: function(path, pt, tickStyles)","    {","        var host = this,","            style = host.get(\"styles\"),","            padding = style.padding,","            tickLength = tickStyles.length,","            start = {x:pt.x, y:padding.top},","            end = {x:pt.x, y:tickLength + padding.top};","        host.drawLine(path, start, end);","    },","","    /**","     * Calculates the point for a label.","     *","     * @method getLabelPoint","     * @param {Object} pt hash containing x and y coordinates","     * @return Object","     * @protected","     */","    getLabelPoint: function(pt)","    {","        return {x:pt.x, y:pt.y - this.get(\"topTickOffset\")};","    },","","    /**","     * Updates the value for the `maxLabelSize` for use in calculating total size.","     *","     * @method updateMaxLabelSize","     * @param {HTMLElement} label to measure","     * @protected","     */","    updateMaxLabelSize: function(labelWidth, labelHeight)","    {","        var host = this,","            props = this._labelRotationProps,","            rot = props.rot,","            absRot = props.absRot,","            sinRadians = props.sinRadians,","            cosRadians = props.cosRadians,","            max;","        if(rot === 0)","        {","            max = labelHeight;","        }","        else if(absRot === 90)","        {","            max = labelWidth;","        }","        else","        {","            max = (sinRadians * labelWidth) + (cosRadians * labelHeight);","        }","        host._maxLabelSize = Math.max(host._maxLabelSize, max);","    },","","    /**","     * Determines the available label height when the axis width has been explicitly set.","     *","     * @method getExplicitlySized","     * @return Boolean","     * @protected","     */","    getExplicitlySized: function(styles)","    {","        if(this._explicitHeight)","        {","            var host = this,","                h = host._explicitHeight,","                totalTitleSize = host._totalTitleSize,","                topTickOffset = host.get(\"topTickOffset\"),","                margin = styles.label.margin.right;","            host._maxLabelSize =  h - (topTickOffset + margin + totalTitleSize);","            return true;","        }","        return false;","    },","","    /**","     * Rotate and position title.","     *","     * @method positionTitle","     * @param {HTMLElement} label to rotate position","     * @protected","     */","    positionTitle: function(label)","    {","        var host = this,","            bounds = host._titleBounds,","            margin = host.get(\"styles\").title.margin,","            props = host._titleRotationProps,","            labelWidth = label.offsetWidth,","            labelHeight = label.offsetHeight,","            h = bounds.bottom - bounds.top,","            x = (host.get(\"width\") * 0.5) - (labelWidth * 0.5),","            y = h/2 - labelHeight/2;","        props.labelWidth = labelWidth;","        props.labelHeight = labelHeight;","        if(margin && margin.top)","        {","            y += margin.top;","        }","        props.x = x;","        props.y = y;","        props.transformOrigin = [0.5, 0.5];","        host._rotate(label, props);","    },","","    /**","     * Rotate and position labels.","     *","     * @method positionLabel","     * @param {HTMLElement} label to rotate position","     * @param {Object} pt hash containing the x and y coordinates in which the label will be positioned","     * against.","     * @protected","     */","    positionLabel: function(label, pt, styles, i)","    {","        var host = this,","            totalTitleSize = this._totalTitleSize,","            maxLabelSize = host._maxLabelSize,","            leftOffset = pt.x,","            topOffset = pt.y + totalTitleSize + maxLabelSize,","            props = this._labelRotationProps,","            rot = props.rot,","            absRot = props.absRot,","            labelWidth = this._labelWidths[i],","            labelHeight = this._labelHeights[i];","        if(rot === 0)","        {","            leftOffset -= labelWidth * 0.5;","            topOffset -= labelHeight;","        }","        else","        {","            if(rot === 90)","            {","                leftOffset -= labelWidth;","                topOffset -= (labelHeight * 0.5);","            }","            else if (rot === -90)","            {","                topOffset -= (labelHeight * 0.5);","            }","            else if(rot > 0)","            {","                leftOffset -= labelWidth;","                topOffset -= labelHeight - (labelHeight * rot/180);","            }","            else","            {","                topOffset -= labelHeight - (labelHeight * absRot/180);","            }","        }","        props.x = Math.round(leftOffset);","        props.y = Math.round(topOffset);","        props.labelWidth = labelWidth;","        props.labelHeight = labelHeight;","        this._rotate(label, props);","    },","","    /**","     * Adjusts the coordinates of an axis label based on the rotation.","     *","     * @method _setRotationCoords","     * @param {Object} props Coordinates, dimension and rotation properties of the label.","     * @protected","     */","    _setRotationCoords: function(props)","    {","        var rot = props.rot,","            absRot = props.absRot,","            labelWidth = props.labelWidth,","            labelHeight = props.labelHeight,","            leftOffset,","            topOffset;","        if(rot === 0)","        {","            leftOffset = labelWidth * 0.5;","            topOffset = labelHeight;","        }","        else","        {","            if(rot === 90)","            {","                leftOffset = labelWidth;","                topOffset = (labelHeight * 0.5);","            }","            else if (rot === -90)","            {","                topOffset = (labelHeight * 0.5);","            }","            else if(rot > 0)","            {","                leftOffset = labelWidth;","                topOffset = labelHeight - (labelHeight * rot/180);","            }","            else","            {","                topOffset = labelHeight - (labelHeight * absRot/180);","            }","        }","        props.x -= leftOffset;","        props.y -= topOffset;","    },","","    /**","     * Returns the transformOrigin to use for an axis label based on the position of the axis","     * and the rotation of the label.","     *","     * @method _getTransformOrigin","     * @param {Number} rot The rotation (in degrees) of the label.","     * @return Array","     * @protected","     */","    _getTransformOrigin: function(rot)","    {","        var transformOrigin;","        if(rot === 0)","        {","            transformOrigin = [0, 0];","        }","        else","        {","            if(rot === 90)","            {","                transformOrigin = [1, 0.5];","            }","            else if (rot === -90)","            {","                transformOrigin = [0, 0.5];","            }","            else if(rot > 0)","            {","                transformOrigin = [1, 0.5];","            }","            else","            {","                transformOrigin = [0, 0.5];","            }","        }","        return transformOrigin;","    },","","    /**","     * Adjusts position for inner ticks.","     *","     * @method offsetNodeForTick","     * @param {Node} cb contentBox of the axis","     * @protected","     */","    offsetNodeForTick: function()","    {","    },","","    /**","     * Assigns a height based on the size of the contents.","     *","     * @method setCalculatedSize","     * @protected","     */","    setCalculatedSize: function()","    {","        var host = this,","            graphic = host.get(\"graphic\"),","            styles = host.get(\"styles\"),","            labelMargin = styles.label.margin,","            totalLabelSize = labelMargin.bottom + host._maxLabelSize,","            totalTitleSize = host._totalTitleSize,","            topTickOffset = this.get(\"topTickOffset\"),","            ttl = Math.round(topTickOffset + totalLabelSize + totalTitleSize);","        if(this._explicitHeight)","        {","           ttl = this._explicitHeight;","        }","        host.set(\"calculatedHeight\", ttl);","        graphic.set(\"y\", ttl - topTickOffset);","    }","};","Y.TopAxisLayout = TopAxisLayout;","","/**"," * An abstract class that provides the core functionality for draw a chart axis. Axis is used by the following classes:"," * <ul>"," *      <li>{{#crossLink \"CategoryAxis\"}}{{/crossLink}}</li>"," *      <li>{{#crossLink \"NumericAxis\"}}{{/crossLink}}</li>"," *      <li>{{#crossLink \"StackedAxis\"}}{{/crossLink}}</li>"," *      <li>{{#crossLink \"TimeAxis\"}}{{/crossLink}}</li>"," *  </ul>"," *"," * @class Axis"," * @extends Widget"," * @uses AxisBase"," * @uses TopAxisLayout"," * @uses RightAxisLayout"," * @uses BottomAxisLayout"," * @uses LeftAxisLayout"," * @constructor"," * @param {Object} config (optional) Configuration parameters."," * @submodule axis"," */","Y.Axis = Y.Base.create(\"axis\", Y.Widget, [Y.AxisBase], {","    /**","     * Calculates and returns a value based on the number of labels and the index of","     * the current label.","     *","     * @method getLabelByIndex","     * @param {Number} i Index of the label.","     * @param {Number} l Total number of labels.","     * @return String","     */","    getLabelByIndex: function(i, l)","    {","        var position = this.get(\"position\"),","            direction = position === \"left\" || position === \"right\" ? \"vertical\" : \"horizontal\";","        return this._getLabelByIndex(i, l, direction);","    },","","    /**","     * @method bindUI","     * @private","     */","    bindUI: function()","    {","        this.after(\"dataReady\", Y.bind(this._dataChangeHandler, this));","        this.after(\"dataUpdate\", Y.bind(this._dataChangeHandler, this));","        this.after(\"stylesChange\", this._updateHandler);","        this.after(\"overlapGraphChange\", this._updateHandler);","        this.after(\"positionChange\", this._positionChangeHandler);","        this.after(\"widthChange\", this._handleSizeChange);","        this.after(\"heightChange\", this._handleSizeChange);","        this.after(\"calculatedWidthChange\", this._handleSizeChange);","        this.after(\"calculatedHeightChange\", this._handleSizeChange);","    },","    /**","     * Storage for calculatedWidth value.","     *","     * @property _calculatedWidth","     * @type Number","     * @private","     */","    _calculatedWidth: 0,","","    /**","     * Storage for calculatedHeight value.","     *","     * @property _calculatedHeight","     * @type Number","     * @private","     */","    _calculatedHeight: 0,","","    /**","     * Handles change to the dataProvider","     *","     * @method _dataChangeHandler","     * @param {Object} e Event object","     * @private","     */","    _dataChangeHandler: function()","    {","        if(this.get(\"rendered\"))","        {","            this._drawAxis();","        }","    },","","    /**","     * Handles change to the position attribute","     *","     * @method _positionChangeHandler","     * @param {Object} e Event object","     * @private","     */","    _positionChangeHandler: function(e)","    {","        this._updateGraphic(e.newVal);","        this._updateHandler();","    },","","    /**","     * Updates the the Graphic instance","     *","     * @method _updateGraphic","     * @param {String} position Position of axis","     * @private","     */","    _updateGraphic: function(position)","    {","        var graphic = this.get(\"graphic\");","        if(position === \"none\")","        {","            if(graphic)","            {","                graphic.destroy();","            }","        }","        else","        {","            if(!graphic)","            {","                this._setCanvas();","            }","        }","    },","","    /**","     * Handles changes to axis.","     *","     * @method _updateHandler","     * @param {Object} e Event object","     * @private","     */","    _updateHandler: function()","    {","        if(this.get(\"rendered\"))","        {","            this._drawAxis();","        }","    },","","    /**","     * @method renderUI","     * @private","     */","    renderUI: function()","    {","        this._updateGraphic(this.get(\"position\"));","    },","","    /**","     * @method syncUI","     * @private","     */","    syncUI: function()","    {","        var layout = this._layout,","            defaultMargins,","            styles,","            label,","            title,","            i;","        if(layout)","        {","            defaultMargins = layout._getDefaultMargins();","            styles = this.get(\"styles\");","            label = styles.label.margin;","            title =styles.title.margin;","            //need to defaultMargins method to the layout classes.","            for(i in defaultMargins)","            {","                if(defaultMargins.hasOwnProperty(i))","                {","                    label[i] = label[i] === undefined ? defaultMargins[i] : label[i];","                    title[i] = title[i] === undefined ? defaultMargins[i] : title[i];","                }","            }","        }","        this._drawAxis();","    },","","    /**","     * Creates a graphic instance to be used for the axis line and ticks.","     *","     * @method _setCanvas","     * @private","     */","    _setCanvas: function()","    {","        var cb = this.get(\"contentBox\"),","            bb = this.get(\"boundingBox\"),","            p = this.get(\"position\"),","            pn = this._parentNode,","            w = this.get(\"width\"),","            h = this.get(\"height\");","        bb.setStyle(\"position\", \"absolute\");","        bb.setStyle(\"zIndex\", 2);","        w = w ? w + \"px\" : pn.getStyle(\"width\");","        h = h ? h + \"px\" : pn.getStyle(\"height\");","        if(p === \"top\" || p === \"bottom\")","        {","            cb.setStyle(\"width\", w);","        }","        else","        {","            cb.setStyle(\"height\", h);","        }","        cb.setStyle(\"position\", \"relative\");","        cb.setStyle(\"left\", \"0px\");","        cb.setStyle(\"top\", \"0px\");","        this.set(\"graphic\", new Y.Graphic());","        this.get(\"graphic\").render(cb);","    },","","    /**","     * Gets the default value for the `styles` attribute. Overrides","     * base implementation.","     *","     * @method _getDefaultStyles","     * @return Object","     * @protected","     */","    _getDefaultStyles: function()","    {","        var axisstyles = {","            majorTicks: {","                display:\"inside\",","                length:4,","                color:\"#dad8c9\",","                weight:1,","                alpha:1","            },","            minorTicks: {","                display:\"none\",","                length:2,","                color:\"#dad8c9\",","                weight:1","            },","            line: {","                weight:1,","                color:\"#dad8c9\",","                alpha:1","            },","            majorUnit: {","                determinant:\"count\",","                count:11,","                distance:75","            },","            top: \"0px\",","            left: \"0px\",","            width: \"100px\",","            height: \"100px\",","            label: {","                color:\"#808080\",","                alpha: 1,","                fontSize:\"85%\",","                rotation: 0,","                margin: {","                    top: undefined,","                    right: undefined,","                    bottom: undefined,","                    left: undefined","                }","            },","            title: {","                color:\"#808080\",","                alpha: 1,","                fontSize:\"85%\",","                rotation: undefined,","                margin: {","                    top: undefined,","                    right: undefined,","                    bottom: undefined,","                    left: undefined","                }","            },","            hideOverlappingLabelTicks: false","        };","","        return Y.merge(Y.Renderer.prototype._getDefaultStyles(), axisstyles);","    },","","    /**","     * Updates the axis when the size changes.","     *","     * @method _handleSizeChange","     * @param {Object} e Event object.","     * @private","     */","    _handleSizeChange: function(e)","    {","        var attrName = e.attrName,","            pos = this.get(\"position\"),","            vert = pos === \"left\" || pos === \"right\",","            cb = this.get(\"contentBox\"),","            hor = pos === \"bottom\" || pos === \"top\";","        cb.setStyle(\"width\", this.get(\"width\"));","        cb.setStyle(\"height\", this.get(\"height\"));","        if((hor && attrName === \"width\") || (vert && attrName === \"height\"))","        {","            this._drawAxis();","        }","    },","","    /**","     * Maps key values to classes containing layout algorithms","     *","     * @property _layoutClasses","     * @type Object","     * @private","     */","    _layoutClasses:","    {","        top : TopAxisLayout,","        bottom: BottomAxisLayout,","        left: LeftAxisLayout,","        right : RightAxisLayout","    },","","    /**","     * Draws a line segment between 2 points","     *","     * @method drawLine","     * @param {Object} startPoint x and y coordinates for the start point of the line segment","     * @param {Object} endPoint x and y coordinates for the for the end point of the line segment","     * @param {Object} line styles (weight, color and alpha to be applied to the line segment)","     * @private","     */","    drawLine: function(path, startPoint, endPoint)","    {","        path.moveTo(startPoint.x, startPoint.y);","        path.lineTo(endPoint.x, endPoint.y);","    },","","    /**","     * Generates the properties necessary for rotating and positioning a text field.","     *","     * @method _getTextRotationProps","     * @param {Object} styles properties for the text field","     * @return Object","     * @private","     */","    _getTextRotationProps: function(styles)","    {","        if(styles.rotation === undefined)","        {","            switch(this.get(\"position\"))","            {","                case \"left\" :","                    styles.rotation = -90;","                break;","                case \"right\" :","                    styles.rotation = 90;","                break;","                default :","                    styles.rotation = 0;","                break;","            }","        }","        var rot =  Math.min(90, Math.max(-90, styles.rotation)),","            absRot = Math.abs(rot),","            radCon = Math.PI/180,","            sinRadians = parseFloat(parseFloat(Math.sin(absRot * radCon)).toFixed(8)),","            cosRadians = parseFloat(parseFloat(Math.cos(absRot * radCon)).toFixed(8));","        return {","            rot: rot,","            absRot: absRot,","            radCon: radCon,","            sinRadians: sinRadians,","            cosRadians: cosRadians,","            textAlpha: styles.alpha","        };","    },","","    /**","     * Draws an axis.","     *","     * @method _drawAxis","     * @private","     */","    _drawAxis: function ()","    {","        if(this._drawing)","        {","            this._callLater = true;","            return;","        }","        this._drawing = true;","        this._callLater = false;","        if(this._layout)","        {","            var styles = this.get(\"styles\"),","                line = styles.line,","                labelStyles = styles.label,","                majorTickStyles = styles.majorTicks,","                drawTicks = majorTickStyles.display !== \"none\",","                tickPoint,","                majorUnit = styles.majorUnit,","                len,","                majorUnitDistance,","                i = 0,","                layout = this._layout,","                layoutLength,","                lineStart,","                label,","                labelWidth,","                labelHeight,","                labelFunction = this.get(\"labelFunction\"),","                labelFunctionScope = this.get(\"labelFunctionScope\"),","                labelFormat = this.get(\"labelFormat\"),","                graphic = this.get(\"graphic\"),","                path = this.get(\"path\"),","                tickPath,","                explicitlySized,","                position = this.get(\"position\"),","                direction = (position === \"left\" || position === \"right\") ? \"vertical\" : \"horizontal\";","            this._labelWidths = [];","            this._labelHeights = [];","            graphic.set(\"autoDraw\", false);","            path.clear();","            path.set(\"stroke\", {","                weight: line.weight,","                color: line.color,","                opacity: line.alpha","            });","            this._labelRotationProps = this._getTextRotationProps(labelStyles);","            this._labelRotationProps.transformOrigin = layout._getTransformOrigin(this._labelRotationProps.rot);","            layout.setTickOffsets.apply(this);","            layoutLength = this.getLength();","            lineStart = layout.getLineStart.apply(this);","            len = this.getTotalMajorUnits(majorUnit);","            majorUnitDistance = this.getMajorUnitDistance(len, layoutLength, majorUnit);","            this.set(\"edgeOffset\", this.getEdgeOffset(len, layoutLength) * 0.5);","            if(len < 1)","            {","                this._clearLabelCache();","            }","            else","            {","                tickPoint = this.getFirstPoint(lineStart);","                this.drawLine(path, lineStart, this.getLineEnd(tickPoint));","                if(drawTicks)","                {","                    tickPath = this.get(\"tickPath\");","                    tickPath.clear();","                    tickPath.set(\"stroke\", {","                        weight: majorTickStyles.weight,","                        color: majorTickStyles.color,","                        opacity: majorTickStyles.alpha","                    });","                   layout.drawTick.apply(this, [tickPath, tickPoint, majorTickStyles]);","                }","                this._createLabelCache();","                this._tickPoints = [];","                this._maxLabelSize = 0;","                this._totalTitleSize = 0;","                this._titleSize = 0;","                this._setTitle();","                explicitlySized = layout.getExplicitlySized.apply(this, [styles]);","                for(; i < len; ++i)","                {","                    if(drawTicks)","                    {","                        layout.drawTick.apply(this, [tickPath, tickPoint, majorTickStyles]);","                    }","                    position = this.getPosition(tickPoint);","                    label = this.getLabel(tickPoint, labelStyles);","                    this._labels.push(label);","                    this._tickPoints.push({x:tickPoint.x, y:tickPoint.y});","                    this.get(\"appendLabelFunction\")(","                        label,","                        labelFunction.apply(","                            labelFunctionScope,","                            [this._getLabelByIndex(i, len, direction), labelFormat]","                        )","                    );","                    labelWidth = Math.round(label.offsetWidth);","                    labelHeight = Math.round(label.offsetHeight);","                    if(!explicitlySized)","                    {","                        this._layout.updateMaxLabelSize.apply(this, [labelWidth, labelHeight]);","                    }","                    this._labelWidths.push(labelWidth);","                    this._labelHeights.push(labelHeight);","                    tickPoint = this.getNextPoint(tickPoint, majorUnitDistance);","                }","                this._clearLabelCache();","                if(this.get(\"overlapGraph\"))","                {","                   layout.offsetNodeForTick.apply(this, [this.get(\"contentBox\")]);","                }","                layout.setCalculatedSize.apply(this);","                if(this._titleTextField)","                {","                    this._layout.positionTitle.apply(this, [this._titleTextField]);","                }","                for(i = 0; i < len; ++i)","                {","                    layout.positionLabel.apply(this, [this.get(\"labels\")[i], this._tickPoints[i], styles, i]);","                }","            }","        }","        this._drawing = false;","        if(this._callLater)","        {","            this._drawAxis();","        }","        else","        {","            this._updatePathElement();","            this.fire(\"axisRendered\");","        }","    },","","    /**","     * Calculates and sets the total size of a title.","     *","     * @method _setTotalTitleSize","     * @param {Object} styles Properties for the title field.","     * @private","     */","    _setTotalTitleSize: function(styles)","    {","        var title = this._titleTextField,","            w = title.offsetWidth,","            h = title.offsetHeight,","            rot = this._titleRotationProps.rot,","            bounds,","            size,","            margin = styles.margin,","            position = this.get(\"position\"),","            matrix = new Y.Matrix();","        matrix.rotate(rot);","        bounds = matrix.getContentRect(w, h);","        if(position === \"left\" || position === \"right\")","        {","            size = bounds.right - bounds.left;","            if(margin)","            {","                size += margin.left + margin.right;","            }","        }","        else","        {","            size = bounds.bottom - bounds.top;","            if(margin)","            {","                size += margin.top + margin.bottom;","            }","        }","        this._titleBounds = bounds;","        this._totalTitleSize = size;","    },","","    /**","     *  Updates path.","     *","     *  @method _updatePathElement","     *  @private","     */","    _updatePathElement: function()","    {","        var path = this._path,","            tickPath = this._tickPath,","            redrawGraphic = false,","            graphic = this.get(\"graphic\");","        if(path)","        {","            redrawGraphic = true;","            path.end();","        }","        if(tickPath)","        {","            redrawGraphic = true;","            tickPath.end();","        }","        if(redrawGraphic)","        {","            graphic._redraw();","        }","    },","","    /**","     * Updates the content and style properties for a title field.","     *","     * @method _updateTitle","     * @private","     */","    _setTitle: function()","    {","        var i,","            styles,","            customStyles,","            title = this.get(\"title\"),","            titleTextField = this._titleTextField,","            parentNode;","        if(title !== null && title !== undefined)","        {","            customStyles = {","                    rotation: \"rotation\",","                    margin: \"margin\",","                    alpha: \"alpha\"","            };","            styles = this.get(\"styles\").title;","            if(!titleTextField)","            {","                titleTextField = DOCUMENT.createElement('span');","                titleTextField.style.display = \"block\";","                titleTextField.style.whiteSpace = \"nowrap\";","                titleTextField.setAttribute(\"class\", \"axisTitle\");","                this.get(\"contentBox\").append(titleTextField);","            }","            else if(!DOCUMENT.createElementNS)","            {","                if(titleTextField.style.filter)","                {","                    titleTextField.style.filter = null;","                }","            }","            titleTextField.style.position = \"absolute\";","            for(i in styles)","            {","                if(styles.hasOwnProperty(i) && !customStyles.hasOwnProperty(i))","                {","                    titleTextField.style[i] = styles[i];","                }","            }","            this.get(\"appendTitleFunction\")(titleTextField, title);","            this._titleTextField = titleTextField;","            this._titleRotationProps = this._getTextRotationProps(styles);","            this._setTotalTitleSize(styles);","        }","        else if(titleTextField)","        {","            parentNode = titleTextField.parentNode;","            if(parentNode)","            {","                parentNode.removeChild(titleTextField);","            }","            this._titleTextField = null;","            this._totalTitleSize = 0;","        }","    },","","    /**","     * Creates or updates an axis label.","     *","     * @method getLabel","     * @param {Object} pt x and y coordinates for the label","     * @param {Object} styles styles applied to label","     * @return HTMLElement","     * @private","     */","    getLabel: function(pt, styles)","    {","        var i,","            label,","            labelCache = this._labelCache,","            customStyles = {","                rotation: \"rotation\",","                margin: \"margin\",","                alpha: \"alpha\"","            };","        if(labelCache && labelCache.length > 0)","        {","            label = labelCache.shift();","        }","        else","        {","            label = DOCUMENT.createElement(\"span\");","            label.className = Y.Lang.trim([label.className, \"axisLabel\"].join(' '));","            this.get(\"contentBox\").append(label);","        }","        if(!DOCUMENT.createElementNS)","        {","            if(label.style.filter)","            {","                label.style.filter = null;","            }","        }","        label.style.display = \"block\";","        label.style.whiteSpace = \"nowrap\";","        label.style.position = \"absolute\";","        for(i in styles)","        {","            if(styles.hasOwnProperty(i) && !customStyles.hasOwnProperty(i))","            {","                label.style[i] = styles[i];","            }","        }","        return label;","    },","","    /**","     * Creates a cache of labels that can be re-used when the axis redraws.","     *","     * @method _createLabelCache","     * @private","     */","    _createLabelCache: function()","    {","        if(this._labels)","        {","            while(this._labels.length > 0)","            {","                this._labelCache.push(this._labels.shift());","            }","        }","        else","        {","            this._clearLabelCache();","        }","        this._labels = [];","    },","","    /**","     * Removes axis labels from the dom and clears the label cache.","     *","     * @method _clearLabelCache","     * @private","     */","    _clearLabelCache: function()","    {","        if(this._labelCache)","        {","            var len = this._labelCache.length,","                i = 0,","                label;","            for(; i < len; ++i)","            {","                label = this._labelCache[i];","                this._removeChildren(label);","                Y.Event.purgeElement(label, true);","                label.parentNode.removeChild(label);","            }","        }","        this._labelCache = [];","    },","","    /**","     * Gets the end point of an axis.","     *","     * @method getLineEnd","     * @return Object","     * @private","     */","    getLineEnd: function(pt)","    {","        var w = this.get(\"width\"),","            h = this.get(\"height\"),","            pos = this.get(\"position\");","        if(pos === \"top\" || pos === \"bottom\")","        {","            return {x:w, y:pt.y};","        }","        else","        {","            return {x:pt.x, y:h};","        }","    },","","    /**","     * Calcuates the width or height of an axis depending on its direction.","     *","     * @method getLength","     * @return Number","     * @private","     */","    getLength: function()","    {","        var l,","            style = this.get(\"styles\"),","            padding = style.padding,","            w = this.get(\"width\"),","            h = this.get(\"height\"),","            pos = this.get(\"position\");","        if(pos === \"top\" || pos === \"bottom\")","        {","            l = w - (padding.left + padding.right);","        }","        else","        {","            l = h - (padding.top + padding.bottom);","        }","        return l;","    },","","    /**","     * Gets the position of the first point on an axis.","     *","     * @method getFirstPoint","     * @param {Object} pt Object containing x and y coordinates.","     * @return Object","     * @private","     */","    getFirstPoint:function(pt)","    {","        var style = this.get(\"styles\"),","            pos = this.get(\"position\"),","            padding = style.padding,","            np = {x:pt.x, y:pt.y};","        if(pos === \"top\" || pos === \"bottom\")","        {","            np.x += padding.left + this.get(\"edgeOffset\");","        }","        else","        {","            np.y += this.get(\"height\") - (padding.top + this.get(\"edgeOffset\"));","        }","        return np;","    },","","    /**","     * Gets the position of the next point on an axis.","     *","     * @method getNextPoint","     * @param {Object} point Object containing x and y coordinates.","     * @param {Number} majorUnitDistance Distance in pixels between ticks.","     * @return Object","     * @private","     */","    getNextPoint: function(point, majorUnitDistance)","    {","        var pos = this.get(\"position\");","        if(pos === \"top\" || pos === \"bottom\")","        {","            point.x = point.x + majorUnitDistance;","        }","        else","        {","            point.y = point.y - majorUnitDistance;","        }","        return point;","    },","","    /**","     * Calculates the placement of last tick on an axis.","     *","     * @method getLastPoint","     * @return Object","     * @private","     */","    getLastPoint: function()","    {","        var style = this.get(\"styles\"),","            padding = style.padding,","            w = this.get(\"width\"),","            pos = this.get(\"position\");","        if(pos === \"top\" || pos === \"bottom\")","        {","            return {x:w - padding.right, y:padding.top};","        }","        else","        {","            return {x:padding.left, y:padding.top};","        }","    },","","    /**","     * Calculates position on the axis.","     *","     * @method getPosition","     * @param {Object} point contains x and y values","     * @private","     */","    getPosition: function(point)","    {","        var p,","            h = this.get(\"height\"),","            style = this.get(\"styles\"),","            padding = style.padding,","            pos = this.get(\"position\"),","            dataType = this.get(\"dataType\");","        if(pos === \"left\" || pos === \"right\")","        {","            //Numeric data on a vertical axis is displayed from bottom to top.","            //Categorical and Timeline data is displayed from top to bottom.","            if(dataType === \"numeric\")","            {","                p = (h - (padding.top + padding.bottom)) - (point.y - padding.top);","            }","            else","            {","                p = point.y - padding.top;","            }","        }","        else","        {","            p = point.x - padding.left;","        }","        return p;","    },","","    /**","     * Rotates and positions a text field.","     *","     * @method _rotate","     * @param {HTMLElement} label text field to rotate and position","     * @param {Object} props properties to be applied to the text field.","     * @private","     */","    _rotate: function(label, props)","    {","        var rot = props.rot,","            x = props.x,","            y = props.y,","            filterString,","            textAlpha,","            matrix = new Y.Matrix(),","            transformOrigin = props.transformOrigin || [0, 0],","            offsetRect;","        if(DOCUMENT.createElementNS)","        {","            matrix.translate(x, y);","            matrix.rotate(rot);","            Y_DOM.setStyle(label, \"transformOrigin\", (transformOrigin[0] * 100) + \"% \" + (transformOrigin[1] * 100) + \"%\");","            Y_DOM.setStyle(label, \"transform\", matrix.toCSSText());","        }","        else","        {","            textAlpha = props.textAlpha;","            if(Y_Lang.isNumber(textAlpha) && textAlpha < 1 && textAlpha > -1 && !isNaN(textAlpha))","            {","                filterString = \"progid:DXImageTransform.Microsoft.Alpha(Opacity=\" + Math.round(textAlpha * 100) + \")\";","            }","            if(rot !== 0)","            {","                //ms filters kind of, sort of uses a transformOrigin of 0, 0.","                //we'll translate the difference to create a true 0, 0 origin.","                matrix.rotate(rot);","                offsetRect = matrix.getContentRect(props.labelWidth, props.labelHeight);","                matrix.init();","                matrix.translate(offsetRect.left, offsetRect.top);","                matrix.translate(x, y);","                this._simulateRotateWithTransformOrigin(matrix, rot, transformOrigin, props.labelWidth, props.labelHeight);","                if(filterString)","                {","                    filterString += \" \";","                }","                else","                {","                    filterString = \"\";","                }","                filterString += matrix.toFilterText();","                label.style.left = matrix.dx + \"px\";","                label.style.top = matrix.dy + \"px\";","            }","            else","            {","                label.style.left = x + \"px\";","                label.style.top = y + \"px\";","            }","            if(filterString)","            {","                label.style.filter = filterString;","            }","        }","    },","","    /**","     * Simulates a rotation with a specified transformOrigin.","     *","     * @method _simulateTransformOrigin","     * @param {Matrix} matrix Reference to a `Matrix` instance.","     * @param {Number} rot The rotation (in degrees) that will be performed on a matrix.","     * @param {Array} transformOrigin An array represeniting the origin in which to perform the transform. The first","     * index represents the x origin and the second index represents the y origin.","     * @param {Number} w The width of the object that will be transformed.","     * @param {Number} h The height of the object that will be transformed.","     * @private","     */","    _simulateRotateWithTransformOrigin: function(matrix, rot, transformOrigin, w, h)","    {","        var transformX = transformOrigin[0] * w,","            transformY = transformOrigin[1] * h;","        transformX = !isNaN(transformX) ? transformX : 0;","        transformY = !isNaN(transformY) ? transformY : 0;","        matrix.translate(transformX, transformY);","        matrix.rotate(rot);","        matrix.translate(-transformX, -transformY);","    },","","    /**","     * Returns the coordinates (top, right, bottom, left) for the bounding box of the last label.","     *","     * @method getMaxLabelBounds","     * @return Object","     */","    getMaxLabelBounds: function()","    {","        return this._getLabelBounds(this.getMaximumValue());","    },","","    /**","     * Returns the coordinates (top, right, bottom, left) for the bounding box of the first label.","     *","     * @method getMinLabelBounds","     * @return Object","     */","    getMinLabelBounds: function()","    {","        return this._getLabelBounds(this.getMinimumValue());","    },","","    /**","     * Returns the coordinates (top, right, bottom, left) for the bounding box of a label.","     *","     * @method _getLabelBounds","     * @param {String} Value of the label","     * @return Object","     * @private","     */","    _getLabelBounds: function(val)","    {","        var layout = this._layout,","            labelStyles = this.get(\"styles\").label,","            matrix = new Y.Matrix(),","            label,","            props = this._getTextRotationProps(labelStyles);","            props.transformOrigin = layout._getTransformOrigin(props.rot);","        label = this.getLabel({x: 0, y: 0}, labelStyles);","        this.get(\"appendLabelFunction\")(label, this.get(\"labelFunction\").apply(this, [val, this.get(\"labelFormat\")]));","        props.labelWidth = label.offsetWidth;","        props.labelHeight = label.offsetHeight;","        this._removeChildren(label);","        Y.Event.purgeElement(label, true);","        label.parentNode.removeChild(label);","        props.x = 0;","        props.y = 0;","        layout._setRotationCoords(props);","        matrix.translate(props.x, props.y);","        this._simulateRotateWithTransformOrigin(matrix, props.rot, props.transformOrigin, props.labelWidth, props.labelHeight);","        return matrix.getContentRect(props.labelWidth, props.labelHeight);","    },","","    /**","     * Removes all DOM elements from an HTML element. Used to clear out labels during detruction","     * phase.","     *","     * @method _removeChildren","     * @private","     */","    _removeChildren: function(node)","    {","        if(node.hasChildNodes())","        {","            var child;","            while(node.firstChild)","            {","                child = node.firstChild;","                this._removeChildren(child);","                node.removeChild(child);","            }","        }","    },","","    /**","     * Destructor implementation Axis class. Removes all labels and the Graphic instance from the widget.","     *","     * @method destructor","     * @protected","     */","    destructor: function()","    {","        var cb = this.get(\"contentBox\").getDOMNode(),","            labels = this.get(\"labels\"),","            graphic = this.get(\"graphic\"),","            label,","            len = labels ? labels.length : 0;","        if(len > 0)","        {","            while(labels.length > 0)","            {","                label = labels.shift();","                this._removeChildren(label);","                cb.removeChild(label);","                label = null;","            }","        }","        if(graphic)","        {","            graphic.destroy();","        }","    },","","    /**","     * Length in pixels of largest text bounding box. Used to calculate the height of the axis.","     *","     * @property maxLabelSize","     * @type Number","     * @protected","     */","    _maxLabelSize: 0,","","    /**","     * Updates the content of text field. This method writes a value into a text field using","     * `appendChild`. If the value is a `String`, it is converted to a `TextNode` first.","     *","     * @method _setText","     * @param label {HTMLElement} label to be updated","     * @param val {String} value with which to update the label","     * @private","     */","    _setText: function(textField, val)","    {","        textField.innerHTML = \"\";","        if(Y_Lang.isNumber(val))","        {","            val = val + \"\";","        }","        else if(!val)","        {","            val = \"\";","        }","        if(IS_STRING(val))","        {","            val = DOCUMENT.createTextNode(val);","        }","        textField.appendChild(val);","    },","","    /**","     * Returns the total number of majorUnits that will appear on an axis.","     *","     * @method getTotalMajorUnits","     * @return Number","     */","    getTotalMajorUnits: function()","    {","        var units,","            majorUnit = this.get(\"styles\").majorUnit,","            len = this.getLength();","        if(majorUnit.determinant === \"count\")","        {","            units = majorUnit.count;","        }","        else if(majorUnit.determinant === \"distance\")","        {","            units = (len/majorUnit.distance) + 1;","        }","        return units;","    },","","    /**","     * Returns the distance between major units on an axis.","     *","     * @method getMajorUnitDistance","     * @param {Number} len Number of ticks","     * @param {Number} uiLen Size of the axis.","     * @param {Object} majorUnit Hash of properties used to determine the majorUnit","     * @return Number","     */","    getMajorUnitDistance: function(len, uiLen, majorUnit)","    {","        var dist;","        if(majorUnit.determinant === \"count\")","        {","            if(!this.get(\"calculateEdgeOffset\"))","            {","                len = len - 1;","            }","            dist = uiLen/len;","        }","        else if(majorUnit.determinant === \"distance\")","        {","            dist = majorUnit.distance;","        }","        return dist;","    },","","    /**","     * Checks to see if data extends beyond the range of the axis. If so,","     * that data will need to be hidden. This method is internal, temporary and subject","     * to removal in the future.","     *","     * @method _hasDataOverflow","     * @protected","     * @return Boolean","     */","    _hasDataOverflow: function()","    {","        if(this.get(\"setMin\") || this.get(\"setMax\"))","        {","            return true;","        }","        return false;","    },","","    /**","     * Returns a string corresponding to the first label on an","     * axis.","     *","     * @method getMinimumValue","     * @return String","     */","    getMinimumValue: function()","    {","        return this.get(\"minimum\");","    },","","    /**","     * Returns a string corresponding to the last label on an","     * axis.","     *","     * @method getMaximumValue","     * @return String","     */","    getMaximumValue: function()","    {","        return this.get(\"maximum\");","    }","}, {","    ATTRS:","    {","        /**","         * When set, defines the width of a vertical axis instance. By default, vertical axes automatically size based","         * on their contents. When the width attribute is set, the axis will not calculate its width. When the width","         * attribute is explicitly set, axis labels will postion themselves off of the the inner edge of the axis and the","         * title, if present, will position itself off of the outer edge. If a specified width is less than the sum of","         * the axis' contents, excess content will overflow.","         *","         * @attribute width","         * @type Number","         */","        width: {","            lazyAdd: false,","","            getter: function()","            {","                if(this._explicitWidth)","                {","                    return this._explicitWidth;","                }","                return this._calculatedWidth;","            },","","            setter: function(val)","            {","                this._explicitWidth = val;","                return val;","            }","        },","","        /**","         * When set, defines the height of a horizontal axis instance. By default, horizontal axes automatically size based","         * on their contents. When the height attribute is set, the axis will not calculate its height. When the height","         * attribute is explicitly set, axis labels will postion themselves off of the the inner edge of the axis and the","         * title, if present, will position itself off of the outer edge. If a specified height is less than the sum of","         * the axis' contents, excess content will overflow.","         *","         * @attribute height","         * @type Number","         */","        height: {","            lazyAdd: false,","","            getter: function()","            {","                if(this._explicitHeight)","                {","                    return this._explicitHeight;","                }","                return this._calculatedHeight;","            },","","            setter: function(val)","            {","                this._explicitHeight = val;","                return val;","            }","        },","","        /**","         * Calculated value of an axis' width. By default, the value is used internally for vertical axes. If the `width`","         * attribute is explicitly set, this value will be ignored.","         *","         * @attribute calculatedWidth","         * @type Number","         * @private","         */","        calculatedWidth: {","            getter: function()","            {","                return this._calculatedWidth;","            },","","            setter: function(val)","            {","                this._calculatedWidth = val;","                return val;","            }","        },","","        /**","         * Calculated value of an axis' height. By default, the value is used internally for horizontal axes. If the `height`","         * attribute is explicitly set, this value will be ignored.","         *","         * @attribute calculatedHeight","         * @type Number","         * @private","         */","        calculatedHeight: {","            getter: function()","            {","                return this._calculatedHeight;","            },","","            setter: function(val)","            {","                this._calculatedHeight = val;","                return val;","            }","        },","","        /**","         * Difference betweend the first/last tick and edge of axis.","         *","         * @attribute edgeOffset","         * @type Number","         * @protected","         */","        edgeOffset:","        {","            value: 0","        },","","        /**","         * The graphic in which the axis line and ticks will be rendered.","         *","         * @attribute graphic","         * @type Graphic","         */","        graphic: {},","","        /**","         *  @attribute path","         *  @type Shape","         *  @readOnly","         *  @private","         */","        path: {","            readOnly: true,","","            getter: function()","            {","                if(!this._path)","                {","                    var graphic = this.get(\"graphic\");","                    if(graphic)","                    {","                        this._path = graphic.addShape({type:\"path\"});","                    }","                }","                return this._path;","            }","        },","","        /**","         *  @attribute tickPath","         *  @type Shape","         *  @readOnly","         *  @private","         */","        tickPath: {","            readOnly: true,","","            getter: function()","            {","                if(!this._tickPath)","                {","                    var graphic = this.get(\"graphic\");","                    if(graphic)","                    {","                        this._tickPath = graphic.addShape({type:\"path\"});","                    }","                }","                return this._tickPath;","            }","        },","","        /**","         * Contains the contents of the axis.","         *","         * @attribute node","         * @type HTMLElement","         */","        node: {},","","        /**","         * Direction of the axis.","         *","         * @attribute position","         * @type String","         */","        position: {","            lazyAdd: false,","","            setter: function(val)","            {","                var LayoutClass = this._layoutClasses[val];","                if(val && val !== \"none\")","                {","                    this._layout = new LayoutClass();","                }","                return val;","            }","        },","","        /**","         * Distance determined by the tick styles used to calculate the distance between the axis","         * line in relation to the top of the axis.","         *","         * @attribute topTickOffset","         * @type Number","         */","        topTickOffset: {","            value: 0","        },","","        /**","         * Distance determined by the tick styles used to calculate the distance between the axis","         * line in relation to the bottom of the axis.","         *","         * @attribute bottomTickOffset","         * @type Number","         */","        bottomTickOffset: {","            value: 0","        },","","        /**","         * Distance determined by the tick styles used to calculate the distance between the axis","         * line in relation to the left of the axis.","         *","         * @attribute leftTickOffset","         * @type Number","         */","        leftTickOffset: {","            value: 0","        },","","        /**","         * Distance determined by the tick styles used to calculate the distance between the axis","         * line in relation to the right side of the axis.","         *","         * @attribute rightTickOffset","         * @type Number","         */","        rightTickOffset: {","            value: 0","        },","","        /**","         * Collection of labels used to render the axis.","         *","         * @attribute labels","         * @type Array","         */","        labels: {","            readOnly: true,","            getter: function()","            {","                return this._labels;","            }","        },","","        /**","         * Collection of points used for placement of labels and ticks along the axis.","         *","         * @attribute tickPoints","         * @type Array","         */","        tickPoints: {","            readOnly: true,","","            getter: function()","            {","                if(this.get(\"position\") === \"none\")","                {","                    return this.get(\"styles\").majorUnit.count;","                }","                return this._tickPoints;","            }","        },","","        /**","         * Indicates whether the axis overlaps the graph. If an axis is the inner most axis on a given","         * position and the tick position is inside or cross, the axis will need to overlap the graph.","         *","         * @attribute overlapGraph","         * @type Boolean","         */","        overlapGraph: {","            value:true,","","            validator: function(val)","            {","                return Y_Lang.isBoolean(val);","            }","        },","","        /**","         * Length in pixels of largest text bounding box. Used to calculate the height of the axis.","         *","         * @attribute maxLabelSize","         * @type Number","         * @protected","         */","        maxLabelSize: {","            getter: function()","            {","                return this._maxLabelSize;","            },","","            setter: function(val)","            {","                this._maxLabelSize = val;","                return val;","            }","        },","","        /**","         *  Title for the axis. When specified, the title will display. The position of the title is determined by the axis position.","         *  <dl>","         *      <dt>top</dt><dd>Appears above the axis and it labels. The default rotation is 0.</dd>","         *      <dt>right</dt><dd>Appears to the right of the axis and its labels. The default rotation is 90.</dd>","         *      <dt>bottom</dt><dd>Appears below the axis and its labels. The default rotation is 0.</dd>","         *      <dt>left</dt><dd>Appears to the left of the axis and its labels. The default rotation is -90.</dd>","         *  </dl>","         *","         *  @attribute title","         *  @type String","         */","        title: {","            value: null","        },","","        /**","         * Function used to append an axis value to an axis label. This function has the following signature:","         *  <dl>","         *      <dt>textField</dt><dd>The axis label to be appended. (`HTMLElement`)</dd>","         *      <dt>val</dt><dd>The value to attach to the text field. This method will accept an `HTMLELement`","         *      or a `String`. This method does not use (`HTMLElement` | `String`)</dd>","         *  </dl>","         * The default method appends a value to the `HTMLElement` using the `appendChild` method. If the given","         * value is a `String`, the method will convert the the value to a `textNode` before appending to the","         * `HTMLElement`. This method will not convert an `HTMLString` to an `HTMLElement`.","         *","         * @attribute appendLabelFunction","         * @type Function","         */","        appendLabelFunction: {","            valueFn: function()","            {","                return this._setText;","            }","        },","","        /**","         * Function used to append a title value to the title object. This function has the following signature:","         *  <dl>","         *      <dt>textField</dt><dd>The title text field to be appended. (`HTMLElement`)</dd>","         *      <dt>val</dt><dd>The value to attach to the text field. This method will accept an `HTMLELement`","         *      or a `String`. This method does not use (`HTMLElement` | `String`)</dd>","         *  </dl>","         * The default method appends a value to the `HTMLElement` using the `appendChild` method. If the given","         * value is a `String`, the method will convert the the value to a `textNode` before appending to the","         * `HTMLElement` element. This method will not convert an `HTMLString` to an `HTMLElement`.","         *","         * @attribute appendTitleFunction","         * @type Function","         */","        appendTitleFunction: {","            valueFn: function()","            {","                return this._setText;","            }","        }","","        /**","         * Style properties used for drawing an axis. This attribute is inherited from `Renderer`. Below are the default values:","         *  <dl>","         *      <dt>majorTicks</dt><dd>Properties used for drawing ticks.","         *          <dl>","         *              <dt>display</dt><dd>Position of the tick. Possible values are `inside`, `outside`, `cross` and `none`.","         *              The default value is `inside`.</dd>","         *              <dt>length</dt><dd>The length (in pixels) of the tick. The default value is 4.</dd>","         *              <dt>color</dt><dd>The color of the tick. The default value is `#dad8c9`</dd>","         *              <dt>weight</dt><dd>Number indicating the width of the tick. The default value is 1.</dd>","         *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the tick. The default value is 1.</dd>","         *          </dl>","         *      </dd>","         *      <dt>line</dt><dd>Properties used for drawing the axis line.","         *          <dl>","         *              <dt>weight</dt><dd>Number indicating the width of the axis line. The default value is 1.</dd>","         *              <dt>color</dt><dd>The color of the axis line. The default value is `#dad8c9`.</dd>","         *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the tick. The default value is 1.</dd>","         *          </dl>","         *      </dd>","         *      <dt>majorUnit</dt><dd>Properties used to calculate the `majorUnit` for the axis.","         *          <dl>","         *              <dt>determinant</dt><dd>The algorithm used for calculating distance between ticks. The possible options are","         *              `count` and `distance`. If the `determinant` is `count`, the axis ticks will spaced so that a specified number","         *              of ticks appear on the axis. If the `determinant` is `distance`, the axis ticks will spaced out according to","         *              the specified distance. The default value is `count`.</dd>","         *              <dt>count</dt><dd>Number of ticks to appear on the axis when the `determinant` is `count`. The default value is 11.</dd>","         *              <dt>distance</dt><dd>The distance (in pixels) between ticks when the `determinant` is `distance`. The default","         *              value is 75.</dd>","         *          </dl>","         *      </dd>","         *      <dt>label</dt><dd>Properties and styles applied to the axis labels.","         *          <dl>","         *              <dt>color</dt><dd>The color of the labels. The default value is `#808080`.</dd>","         *              <dt>alpha</dt><dd>Number between 0 and 1 indicating the opacity of the labels. The default value is 1.</dd>","         *              <dt>fontSize</dt><dd>The font-size of the labels. The default value is 85%</dd>","         *              <dt>rotation</dt><dd>The rotation, in degrees (between -90 and 90) of the labels. The default value is 0.</dd>","         *              <dt>margin</dt><dd>The distance between the label and the axis/tick. Depending on the position of the `Axis`,","         *              only one of the properties used.","         *                  <dl>","         *                      <dt>top</dt><dd>Pixel value used for an axis with a `position` of `bottom`. The default value is 4.</dd>","         *                      <dt>right</dt><dd>Pixel value used for an axis with a `position` of `left`. The default value is 4.</dd>","         *                      <dt>bottom</dt><dd>Pixel value used for an axis with a `position` of `top`. The default value is 4.</dd>","         *                      <dt>left</dt><dd>Pixel value used for an axis with a `position` of `right`. The default value is 4.</dd>","         *                  </dl>","         *              </dd>","         *          </dl>","         *      </dd>","         *  </dl>","         *","         * @attribute styles","         * @type Object","         */","    }","});","Y.AxisType = Y.Base.create(\"baseAxis\", Y.Axis, [], {});","","","}, '@VERSION@', {\"requires\": [\"dom\", \"widget\", \"widget-position\", \"widget-stack\", \"graphics\", \"axis-base\"]});"];
_yuitest_coverage["build/axis/axis.js"].lines = {"1":0,"9":0,"25":0,"27":0,"37":0,"53":0,"58":0,"59":0,"61":0,"64":0,"65":0,"66":0,"68":0,"69":0,"70":0,"72":0,"73":0,"74":0,"76":0,"77":0,"78":0,"93":0,"99":0,"111":0,"117":0,"119":0,"121":0,"123":0,"125":0,"138":0,"150":0,"157":0,"159":0,"161":0,"163":0,"167":0,"169":0,"181":0,"183":0,"188":0,"189":0,"191":0,"203":0,"212":0,"213":0,"214":0,"216":0,"218":0,"219":0,"220":0,"221":0,"235":0,"246":0,"248":0,"249":0,"251":0,"253":0,"255":0,"257":0,"258":0,"262":0,"263":0,"265":0,"266":0,"267":0,"268":0,"269":0,"281":0,"287":0,"289":0,"290":0,"292":0,"294":0,"295":0,"297":0,"299":0,"300":0,"304":0,"305":0,"307":0,"308":0,"322":0,"323":0,"325":0,"327":0,"329":0,"331":0,"333":0,"337":0,"339":0,"361":0,"369":0,"371":0,"373":0,"374":0,"378":0,"386":0,"388":0,"398":0,"414":0,"419":0,"420":0,"422":0,"425":0,"426":0,"427":0,"429":0,"430":0,"431":0,"433":0,"434":0,"435":0,"437":0,"438":0,"439":0,"454":0,"460":0,"472":0,"479":0,"481":0,"483":0,"485":0,"487":0,"500":0,"512":0,"519":0,"521":0,"523":0,"525":0,"529":0,"531":0,"543":0,"545":0,"550":0,"551":0,"553":0,"565":0,"574":0,"575":0,"576":0,"578":0,"580":0,"581":0,"582":0,"583":0,"597":0,"608":0,"610":0,"612":0,"614":0,"616":0,"618":0,"619":0,"621":0,"623":0,"627":0,"628":0,"630":0,"631":0,"632":0,"633":0,"634":0,"635":0,"636":0,"648":0,"654":0,"656":0,"658":0,"660":0,"661":0,"663":0,"665":0,"669":0,"670":0,"672":0,"673":0,"687":0,"688":0,"690":0,"692":0,"694":0,"696":0,"698":0,"702":0,"704":0,"716":0,"719":0,"730":0,"735":0,"737":0,"739":0,"740":0,"744":0,"752":0,"754":0,"764":0,"780":0,"785":0,"786":0,"788":0,"791":0,"792":0,"793":0,"795":0,"796":0,"797":0,"799":0,"800":0,"801":0,"803":0,"804":0,"805":0,"817":0,"823":0,"825":0,"827":0,"829":0,"831":0,"845":0,"851":0,"864":0,"876":0,"883":0,"885":0,"887":0,"889":0,"893":0,"895":0,"907":0,"909":0,"914":0,"915":0,"917":0,"929":0,"938":0,"939":0,"940":0,"942":0,"944":0,"945":0,"946":0,"947":0,"961":0,"972":0,"974":0,"976":0,"978":0,"980":0,"982":0,"983":0,"987":0,"989":0,"990":0,"991":0,"992":0,"993":0,"994":0,"995":0,"1007":0,"1014":0,"1016":0,"1017":0,"1019":0,"1021":0,"1022":0,"1026":0,"1027":0,"1029":0,"1030":0,"1044":0,"1045":0,"1047":0,"1049":0,"1051":0,"1055":0,"1057":0,"1069":0,"1070":0,"1081":0,"1086":0,"1088":0,"1090":0,"1093":0,"1101":0,"1103":0,"1113":0,"1129":0,"1134":0,"1135":0,"1136":0,"1139":0,"1140":0,"1141":0,"1143":0,"1144":0,"1145":0,"1147":0,"1148":0,"1149":0,"1151":0,"1152":0,"1153":0,"1165":0,"1172":0,"1174":0,"1176":0,"1178":0,"1180":0,"1194":0,"1200":0,"1213":0,"1225":0,"1232":0,"1234":0,"1236":0,"1238":0,"1242":0,"1244":0,"1256":0,"1258":0,"1263":0,"1264":0,"1266":0,"1278":0,"1287":0,"1288":0,"1289":0,"1291":0,"1293":0,"1294":0,"1295":0,"1296":0,"1310":0,"1320":0,"1322":0,"1323":0,"1327":0,"1329":0,"1330":0,"1332":0,"1334":0,"1336":0,"1338":0,"1339":0,"1343":0,"1346":0,"1347":0,"1348":0,"1349":0,"1350":0,"1362":0,"1368":0,"1370":0,"1371":0,"1375":0,"1377":0,"1378":0,"1380":0,"1382":0,"1384":0,"1386":0,"1387":0,"1391":0,"1394":0,"1395":0,"1409":0,"1410":0,"1412":0,"1416":0,"1418":0,"1420":0,"1422":0,"1424":0,"1426":0,"1430":0,"1433":0,"1455":0,"1463":0,"1465":0,"1467":0,"1468":0,"1471":0,"1493":0,"1505":0,"1507":0,"1516":0,"1517":0,"1518":0,"1519":0,"1520":0,"1521":0,"1522":0,"1523":0,"1524":0,"1553":0,"1555":0,"1568":0,"1569":0,"1581":0,"1582":0,"1584":0,"1586":0,"1591":0,"1593":0,"1607":0,"1609":0,"1619":0,"1628":0,"1634":0,"1636":0,"1637":0,"1638":0,"1639":0,"1641":0,"1643":0,"1645":0,"1646":0,"1650":0,"1661":0,"1667":0,"1668":0,"1669":0,"1670":0,"1671":0,"1673":0,"1677":0,"1679":0,"1680":0,"1681":0,"1682":0,"1683":0,"1696":0,"1751":0,"1763":0,"1768":0,"1769":0,"1770":0,"1772":0,"1802":0,"1803":0,"1816":0,"1818":0,"1821":0,"1822":0,"1824":0,"1825":0,"1827":0,"1828":0,"1831":0,"1836":0,"1854":0,"1856":0,"1857":0,"1859":0,"1860":0,"1861":0,"1863":0,"1888":0,"1889":0,"1890":0,"1891":0,"1892":0,"1897":0,"1898":0,"1899":0,"1900":0,"1901":0,"1902":0,"1903":0,"1904":0,"1905":0,"1907":0,"1911":0,"1912":0,"1913":0,"1915":0,"1916":0,"1917":0,"1922":0,"1924":0,"1925":0,"1926":0,"1927":0,"1928":0,"1929":0,"1930":0,"1931":0,"1933":0,"1935":0,"1937":0,"1938":0,"1939":0,"1940":0,"1941":0,"1948":0,"1949":0,"1950":0,"1952":0,"1954":0,"1955":0,"1956":0,"1958":0,"1959":0,"1961":0,"1963":0,"1964":0,"1966":0,"1968":0,"1970":0,"1974":0,"1975":0,"1977":0,"1981":0,"1982":0,"1995":0,"2004":0,"2005":0,"2006":0,"2008":0,"2009":0,"2011":0,"2016":0,"2017":0,"2019":0,"2022":0,"2023":0,"2034":0,"2038":0,"2040":0,"2041":0,"2043":0,"2045":0,"2046":0,"2048":0,"2050":0,"2062":0,"2068":0,"2070":0,"2075":0,"2076":0,"2078":0,"2079":0,"2080":0,"2081":0,"2082":0,"2084":0,"2086":0,"2088":0,"2091":0,"2092":0,"2094":0,"2096":0,"2099":0,"2100":0,"2101":0,"2102":0,"2104":0,"2106":0,"2107":0,"2109":0,"2111":0,"2112":0,"2127":0,"2135":0,"2137":0,"2141":0,"2142":0,"2143":0,"2145":0,"2147":0,"2149":0,"2152":0,"2153":0,"2154":0,"2155":0,"2157":0,"2159":0,"2162":0,"2173":0,"2175":0,"2177":0,"2182":0,"2184":0,"2195":0,"2197":0,"2200":0,"2202":0,"2203":0,"2204":0,"2205":0,"2208":0,"2220":0,"2223":0,"2225":0,"2229":0,"2242":0,"2248":0,"2250":0,"2254":0,"2256":0,"2269":0,"2273":0,"2275":0,"2279":0,"2281":0,"2295":0,"2296":0,"2298":0,"2302":0,"2304":0,"2316":0,"2320":0,"2322":0,"2326":0,"2339":0,"2345":0,"2349":0,"2351":0,"2355":0,"2360":0,"2362":0,"2375":0,"2383":0,"2385":0,"2386":0,"2387":0,"2388":0,"2392":0,"2393":0,"2395":0,"2397":0,"2401":0,"2402":0,"2403":0,"2404":0,"2405":0,"2406":0,"2407":0,"2409":0,"2413":0,"2415":0,"2416":0,"2417":0,"2421":0,"2422":0,"2424":0,"2426":0,"2445":0,"2447":0,"2448":0,"2449":0,"2450":0,"2451":0,"2462":0,"2473":0,"2486":0,"2491":0,"2492":0,"2493":0,"2494":0,"2495":0,"2496":0,"2497":0,"2498":0,"2499":0,"2500":0,"2501":0,"2502":0,"2503":0,"2504":0,"2516":0,"2518":0,"2519":0,"2521":0,"2522":0,"2523":0,"2536":0,"2541":0,"2543":0,"2545":0,"2546":0,"2547":0,"2548":0,"2551":0,"2553":0,"2577":0,"2578":0,"2580":0,"2582":0,"2584":0,"2586":0,"2588":0,"2590":0,"2601":0,"2604":0,"2606":0,"2608":0,"2610":0,"2612":0,"2626":0,"2627":0,"2629":0,"2631":0,"2633":0,"2635":0,"2637":0,"2639":0,"2653":0,"2655":0,"2657":0,"2669":0,"2681":0,"2701":0,"2703":0,"2705":0,"2710":0,"2711":0,"2730":0,"2732":0,"2734":0,"2739":0,"2740":0,"2755":0,"2760":0,"2761":0,"2776":0,"2781":0,"2782":0,"2817":0,"2819":0,"2820":0,"2822":0,"2825":0,"2840":0,"2842":0,"2843":0,"2845":0,"2848":0,"2871":0,"2872":0,"2874":0,"2876":0,"2934":0,"2949":0,"2951":0,"2953":0,"2969":0,"2983":0,"2988":0,"2989":0,"3026":0,"3047":0,"3106":0};
_yuitest_coverage["build/axis/axis.js"].functions = {"_getDefaultMargins:35":0,"setTickOffsets:51":0,"drawTick:91":0,"getLineStart:109":0,"getLabelPoint:136":0,"updateMaxLabelSize:148":0,"getExplicitlySized:179":0,"positionTitle:201":0,"positionLabel:233":0,"_setRotationCoords:279":0,"_getTransformOrigin:320":0,"setCalculatedSize:359":0,"_getDefaultMargins:396":0,"setTickOffsets:412":0,"drawTick:452":0,"getLineStart:470":0,"getLabelPoint:498":0,"updateMaxLabelSize:510":0,"getExplicitlySized:541":0,"positionTitle:563":0,"positionLabel:595":0,"_setRotationCoords:646":0,"_getTransformOrigin:685":0,"offsetNodeForTick:714":0,"setCalculatedSize:728":0,"_getDefaultMargins:762":0,"setTickOffsets:778":0,"getLineStart:815":0,"drawTick:843":0,"getLabelPoint:862":0,"updateMaxLabelSize:874":0,"getExplicitlySized:905":0,"positionTitle:927":0,"positionLabel:959":0,"_setRotationCoords:1005":0,"_getTransformOrigin:1042":0,"offsetNodeForTick:1067":0,"setCalculatedSize:1079":0,"_getDefaultMargins:1111":0,"setTickOffsets:1127":0,"getLineStart:1163":0,"drawTick:1192":0,"getLabelPoint:1211":0,"updateMaxLabelSize:1223":0,"getExplicitlySized:1254":0,"positionTitle:1276":0,"positionLabel:1308":0,"_setRotationCoords:1360":0,"_getTransformOrigin:1407":0,"setCalculatedSize:1453":0,"getLabelByIndex:1503":0,"bindUI:1514":0,"_dataChangeHandler:1551":0,"_positionChangeHandler:1566":0,"_updateGraphic:1579":0,"_updateHandler:1605":0,"renderUI:1617":0,"syncUI:1626":0,"_setCanvas:1659":0,"_getDefaultStyles:1694":0,"_handleSizeChange:1761":0,"drawLine:1800":0,"_getTextRotationProps:1814":0,"_drawAxis:1852":0,"_setTotalTitleSize:1993":0,"_updatePathElement:2032":0,"_setTitle:2060":0,"getLabel:2125":0,"_createLabelCache:2171":0,"_clearLabelCache:2193":0,"getLineEnd:2218":0,"getLength:2240":0,"getFirstPoint:2267":0,"getNextPoint:2293":0,"getLastPoint:2314":0,"getPosition:2337":0,"_rotate:2373":0,"_simulateRotateWithTransformOrigin:2443":0,"getMaxLabelBounds:2460":0,"getMinLabelBounds:2471":0,"_getLabelBounds:2484":0,"_removeChildren:2514":0,"destructor:2534":0,"_setText:2575":0,"getTotalMajorUnits:2599":0,"getMajorUnitDistance:2624":0,"_hasDataOverflow:2651":0,"getMinimumValue:2667":0,"getMaximumValue:2679":0,"getter:2699":0,"setter:2708":0,"getter:2728":0,"setter:2737":0,"getter:2753":0,"setter:2758":0,"getter:2774":0,"setter:2779":0,"getter:2815":0,"getter:2838":0,"setter:2869":0,"getter:2932":0,"getter:2947":0,"validator:2967":0,"getter:2981":0,"setter:2986":0,"valueFn:3024":0,"valueFn:3045":0,"(anonymous 1):1":0};
_yuitest_coverage["build/axis/axis.js"].coveredLines = 753;
_yuitest_coverage["build/axis/axis.js"].coveredFunctions = 108;
_yuitest_coverline("build/axis/axis.js", 1);
YUI.add('axis', function (Y, NAME) {

/**
 * Provides base functionality for drawing chart axes.
 *
 * @module charts
 * @submodule axis
 */
_yuitest_coverfunc("build/axis/axis.js", "(anonymous 1)", 1);
_yuitest_coverline("build/axis/axis.js", 9);
var CONFIG = Y.config,
    DOCUMENT = CONFIG.doc,
    Y_Lang = Y.Lang,
    IS_STRING = Y_Lang.isString,
    Y_DOM = Y.DOM,
    LeftAxisLayout,
    RightAxisLayout,
    BottomAxisLayout,
    TopAxisLayout;
/**
 * Algorithmic strategy for rendering a left axis.
 *
 * @class LeftAxisLayout
 * @constructor
 * @submodule axis
 */
_yuitest_coverline("build/axis/axis.js", 25);
LeftAxisLayout = function() {};

_yuitest_coverline("build/axis/axis.js", 27);
LeftAxisLayout.prototype = {
    /**
     *  Default margins for text fields.
     *
     *  @private
     *  @method _getDefaultMargins
     *  @return Object
     */
    _getDefaultMargins: function()
    {
        _yuitest_coverfunc("build/axis/axis.js", "_getDefaultMargins", 35);
_yuitest_coverline("build/axis/axis.js", 37);
return {
            top: 0,
            left: 0,
            right: 4,
            bottom: 0
        };
    },

    /**
     * Sets the length of the tick on either side of the axis line.
     *
     * @method setTickOffset
     * @protected
     */
    setTickOffsets: function()
    {
        _yuitest_coverfunc("build/axis/axis.js", "setTickOffsets", 51);
_yuitest_coverline("build/axis/axis.js", 53);
var host = this,
            majorTicks = host.get("styles").majorTicks,
            tickLength = majorTicks.length,
            halfTick = tickLength * 0.5,
            display = majorTicks.display;
        _yuitest_coverline("build/axis/axis.js", 58);
host.set("topTickOffset",  0);
        _yuitest_coverline("build/axis/axis.js", 59);
host.set("bottomTickOffset",  0);

        _yuitest_coverline("build/axis/axis.js", 61);
switch(display)
        {
            case "inside" :
                _yuitest_coverline("build/axis/axis.js", 64);
host.set("rightTickOffset",  tickLength);
                _yuitest_coverline("build/axis/axis.js", 65);
host.set("leftTickOffset", 0);
            _yuitest_coverline("build/axis/axis.js", 66);
break;
            case "outside" :
                _yuitest_coverline("build/axis/axis.js", 68);
host.set("rightTickOffset", 0);
                _yuitest_coverline("build/axis/axis.js", 69);
host.set("leftTickOffset",  tickLength);
            _yuitest_coverline("build/axis/axis.js", 70);
break;
            case "cross":
                _yuitest_coverline("build/axis/axis.js", 72);
host.set("rightTickOffset", halfTick);
                _yuitest_coverline("build/axis/axis.js", 73);
host.set("leftTickOffset",  halfTick);
            _yuitest_coverline("build/axis/axis.js", 74);
break;
            default:
                _yuitest_coverline("build/axis/axis.js", 76);
host.set("rightTickOffset", 0);
                _yuitest_coverline("build/axis/axis.js", 77);
host.set("leftTickOffset", 0);
            _yuitest_coverline("build/axis/axis.js", 78);
break;
        }
    },

    /**
     * Draws a tick
     *
     * @method drawTick
     * @param {Path} path reference to the path `Path` element in which to draw the tick.
     * @param {Object} pt Point on the axis in which the tick will intersect.
     * @param {Object} tickStyle Hash of properties to apply to the tick.
     * @protected
     */
    drawTick: function(path, pt, tickStyles)
    {
        _yuitest_coverfunc("build/axis/axis.js", "drawTick", 91);
_yuitest_coverline("build/axis/axis.js", 93);
var host = this,
            style = host.get("styles"),
            padding = style.padding,
            tickLength = tickStyles.length,
            start = {x:padding.left, y:pt.y},
            end = {x:tickLength + padding.left, y:pt.y};
        _yuitest_coverline("build/axis/axis.js", 99);
host.drawLine(path, start, end);
    },

    /**
     * Calculates the coordinates for the first point on an axis.
     *
     * @method getLineStart
     * @return {Object}
     * @protected
     */
    getLineStart: function()
    {
        _yuitest_coverfunc("build/axis/axis.js", "getLineStart", 109);
_yuitest_coverline("build/axis/axis.js", 111);
var style = this.get("styles"),
            padding = style.padding,
            majorTicks = style.majorTicks,
            tickLength = majorTicks.length,
            display = majorTicks.display,
            pt = {x:padding.left, y:0};
        _yuitest_coverline("build/axis/axis.js", 117);
if(display === "outside")
        {
            _yuitest_coverline("build/axis/axis.js", 119);
pt.x += tickLength;
        }
        else {_yuitest_coverline("build/axis/axis.js", 121);
if(display === "cross")
        {
            _yuitest_coverline("build/axis/axis.js", 123);
pt.x += tickLength/2;
        }}
        _yuitest_coverline("build/axis/axis.js", 125);
return pt;
    },

    /**
     * Calculates the point for a label.
     *
     * @method getLabelPoint
     * @param {Object} point Point on the axis in which the tick will intersect.
     * @return {Object}
     * @protected
     */
    getLabelPoint: function(point)
    {
        _yuitest_coverfunc("build/axis/axis.js", "getLabelPoint", 136);
_yuitest_coverline("build/axis/axis.js", 138);
return {x:point.x - this.get("leftTickOffset"), y:point.y};
    },

    /**
     * Updates the value for the `maxLabelSize` for use in calculating total size.
     *
     * @method updateMaxLabelSize
     * @param {HTMLElement} label to measure
     * @protected
     */
    updateMaxLabelSize: function(labelWidth, labelHeight)
    {
        _yuitest_coverfunc("build/axis/axis.js", "updateMaxLabelSize", 148);
_yuitest_coverline("build/axis/axis.js", 150);
var host = this,
            props = this._labelRotationProps,
            rot = props.rot,
            absRot = props.absRot,
            sinRadians = props.sinRadians,
            cosRadians = props.cosRadians,
            max;
        _yuitest_coverline("build/axis/axis.js", 157);
if(rot === 0)
        {
            _yuitest_coverline("build/axis/axis.js", 159);
max = labelWidth;
        }
        else {_yuitest_coverline("build/axis/axis.js", 161);
if(absRot === 90)
        {
            _yuitest_coverline("build/axis/axis.js", 163);
max = labelHeight;
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 167);
max = (cosRadians * labelWidth) + (sinRadians * labelHeight);
        }}
        _yuitest_coverline("build/axis/axis.js", 169);
host._maxLabelSize = Math.max(host._maxLabelSize, max);
    },

    /**
     * Determines the available label width when the axis width has been explicitly set.
     *
     * @method getExplicitlySized
     * @return Boolean
     * @protected
     */
    getExplicitlySized: function(styles)
    {
        _yuitest_coverfunc("build/axis/axis.js", "getExplicitlySized", 179);
_yuitest_coverline("build/axis/axis.js", 181);
if(this._explicitWidth)
        {
            _yuitest_coverline("build/axis/axis.js", 183);
var host = this,
                w = host._explicitWidth,
                totalTitleSize = host._totalTitleSize,
                leftTickOffset = host.get("leftTickOffset"),
                margin = styles.label.margin.right;
            _yuitest_coverline("build/axis/axis.js", 188);
host._maxLabelSize =  w - (leftTickOffset + margin + totalTitleSize);
            _yuitest_coverline("build/axis/axis.js", 189);
return true;
        }
        _yuitest_coverline("build/axis/axis.js", 191);
return false;
    },

    /**
     * Rotate and position title.
     *
     * @method positionTitle
     * @param {HTMLElement} label to rotate position
     * @protected
     */
    positionTitle: function(label)
    {
        _yuitest_coverfunc("build/axis/axis.js", "positionTitle", 201);
_yuitest_coverline("build/axis/axis.js", 203);
var host = this,
            bounds = host._titleBounds,
            margin = host.get("styles").title.margin,
            props = host._titleRotationProps,
            w = bounds.right - bounds.left,
            labelWidth = label.offsetWidth,
            labelHeight = label.offsetHeight,
            x = (labelWidth * -0.5) + (w * 0.5),
            y = (host.get("height") * 0.5) - (labelHeight * 0.5);
        _yuitest_coverline("build/axis/axis.js", 212);
props.labelWidth = labelWidth;
        _yuitest_coverline("build/axis/axis.js", 213);
props.labelHeight = labelHeight;
        _yuitest_coverline("build/axis/axis.js", 214);
if(margin && margin.left)
        {
            _yuitest_coverline("build/axis/axis.js", 216);
x += margin.left;
        }
        _yuitest_coverline("build/axis/axis.js", 218);
props.x = x;
        _yuitest_coverline("build/axis/axis.js", 219);
props.y = y;
        _yuitest_coverline("build/axis/axis.js", 220);
props.transformOrigin = [0.5, 0.5];
        _yuitest_coverline("build/axis/axis.js", 221);
host._rotate(label, props);
    },

    /**
     * Rotate and position labels.
     *
     * @method positionLabel
     * @param {HTMLElement} label to rotate position
     * @param {Object} pt hash containing the x and y coordinates in which the label will be positioned
     * against.
     * @protected
     */
    positionLabel: function(label, pt, styles, i)
    {
        _yuitest_coverfunc("build/axis/axis.js", "positionLabel", 233);
_yuitest_coverline("build/axis/axis.js", 235);
var host = this,
            tickOffset = host.get("leftTickOffset"),
            totalTitleSize = this._totalTitleSize,
            leftOffset = pt.x + totalTitleSize - tickOffset,
            topOffset = pt.y,
            props = this._labelRotationProps,
            rot = props.rot,
            absRot = props.absRot,
            maxLabelSize = host._maxLabelSize,
            labelWidth = this._labelWidths[i],
            labelHeight = this._labelHeights[i];
        _yuitest_coverline("build/axis/axis.js", 246);
if(rot === 0)
        {
            _yuitest_coverline("build/axis/axis.js", 248);
leftOffset -= labelWidth;
            _yuitest_coverline("build/axis/axis.js", 249);
topOffset -= labelHeight * 0.5;
        }
        else {_yuitest_coverline("build/axis/axis.js", 251);
if(rot === 90)
        {
            _yuitest_coverline("build/axis/axis.js", 253);
leftOffset -= labelWidth * 0.5;
        }
        else {_yuitest_coverline("build/axis/axis.js", 255);
if(rot === -90)
        {
            _yuitest_coverline("build/axis/axis.js", 257);
leftOffset -= labelWidth * 0.5;
            _yuitest_coverline("build/axis/axis.js", 258);
topOffset -= labelHeight;
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 262);
leftOffset -= labelWidth + (labelHeight * absRot/360);
            _yuitest_coverline("build/axis/axis.js", 263);
topOffset -= labelHeight * 0.5;
        }}}
        _yuitest_coverline("build/axis/axis.js", 265);
props.labelWidth = labelWidth;
        _yuitest_coverline("build/axis/axis.js", 266);
props.labelHeight = labelHeight;
        _yuitest_coverline("build/axis/axis.js", 267);
props.x = Math.round(maxLabelSize + leftOffset);
        _yuitest_coverline("build/axis/axis.js", 268);
props.y = Math.round(topOffset);
        _yuitest_coverline("build/axis/axis.js", 269);
this._rotate(label, props);
    },

    /**
     * Adjusts the coordinates of an axis label based on the rotation.
     *
     * @method _setRotationCoords
     * @param {Object} props Coordinates, dimension and rotation properties of the label.
     * @protected
     */
    _setRotationCoords: function(props)
    {
        _yuitest_coverfunc("build/axis/axis.js", "_setRotationCoords", 279);
_yuitest_coverline("build/axis/axis.js", 281);
var rot = props.rot,
            absRot = props.absRot,
            leftOffset,
            topOffset,
            labelWidth = props.labelWidth,
            labelHeight = props.labelHeight;
        _yuitest_coverline("build/axis/axis.js", 287);
if(rot === 0)
        {
            _yuitest_coverline("build/axis/axis.js", 289);
leftOffset = labelWidth;
            _yuitest_coverline("build/axis/axis.js", 290);
topOffset = labelHeight * 0.5;
        }
        else {_yuitest_coverline("build/axis/axis.js", 292);
if(rot === 90)
        {
            _yuitest_coverline("build/axis/axis.js", 294);
topOffset = 0;
            _yuitest_coverline("build/axis/axis.js", 295);
leftOffset = labelWidth * 0.5;
        }
        else {_yuitest_coverline("build/axis/axis.js", 297);
if(rot === -90)
        {
            _yuitest_coverline("build/axis/axis.js", 299);
leftOffset = labelWidth * 0.5;
            _yuitest_coverline("build/axis/axis.js", 300);
topOffset = labelHeight;
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 304);
leftOffset = labelWidth + (labelHeight * absRot/360);
            _yuitest_coverline("build/axis/axis.js", 305);
topOffset = labelHeight * 0.5;
        }}}
        _yuitest_coverline("build/axis/axis.js", 307);
props.x -= leftOffset;
        _yuitest_coverline("build/axis/axis.js", 308);
props.y -= topOffset;
    },

    /**
     * Returns the transformOrigin to use for an axis label based on the position of the axis
     * and the rotation of the label.
     *
     * @method _getTransformOrigin
     * @param {Number} rot The rotation (in degrees) of the label.
     * @return Array
     * @protected
     */
    _getTransformOrigin: function(rot)
    {
        _yuitest_coverfunc("build/axis/axis.js", "_getTransformOrigin", 320);
_yuitest_coverline("build/axis/axis.js", 322);
var transformOrigin;
        _yuitest_coverline("build/axis/axis.js", 323);
if(rot === 0)
        {
            _yuitest_coverline("build/axis/axis.js", 325);
transformOrigin = [0, 0];
        }
        else {_yuitest_coverline("build/axis/axis.js", 327);
if(rot === 90)
        {
            _yuitest_coverline("build/axis/axis.js", 329);
transformOrigin = [0.5, 0];
        }
        else {_yuitest_coverline("build/axis/axis.js", 331);
if(rot === -90)
        {
            _yuitest_coverline("build/axis/axis.js", 333);
transformOrigin = [0.5, 1];
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 337);
transformOrigin = [1, 0.5];
        }}}
        _yuitest_coverline("build/axis/axis.js", 339);
return transformOrigin;
    },

    /**
     * Adjust the position of the Axis widget's content box for internal axes.
     *
     * @method offsetNodeForTick
     * @param {Node} cb contentBox of the axis
     * @protected
     */
    offsetNodeForTick: function()
    {
    },

    /**
     * Sets the width of the axis based on its contents.
     *
     * @method setCalculatedSize
     * @protected
     */
    setCalculatedSize: function()
    {
        _yuitest_coverfunc("build/axis/axis.js", "setCalculatedSize", 359);
_yuitest_coverline("build/axis/axis.js", 361);
var host = this,
            graphic = this.get("graphic"),
            style = host.get("styles"),
            label = style.label,
            tickOffset = host.get("leftTickOffset"),
            max = host._maxLabelSize,
            totalTitleSize = this._totalTitleSize,
            ttl = Math.round(totalTitleSize + tickOffset + max + label.margin.right);
        _yuitest_coverline("build/axis/axis.js", 369);
if(this._explicitWidth)
        {
            _yuitest_coverline("build/axis/axis.js", 371);
ttl = this._explicitWidth;
        }
        _yuitest_coverline("build/axis/axis.js", 373);
this.set("calculatedWidth", ttl);
        _yuitest_coverline("build/axis/axis.js", 374);
graphic.set("x", ttl - tickOffset);
    }
};

_yuitest_coverline("build/axis/axis.js", 378);
Y.LeftAxisLayout = LeftAxisLayout;
/**
 * RightAxisLayout contains algorithms for rendering a right axis.
 *
 * @class RightAxisLayout
 * @constructor
 * @submodule axis
 */
_yuitest_coverline("build/axis/axis.js", 386);
RightAxisLayout = function(){};

_yuitest_coverline("build/axis/axis.js", 388);
RightAxisLayout.prototype = {
    /**
     *  Default margins for text fields.
     *
     *  @private
     *  @method _getDefaultMargins
     *  @return Object
     */
    _getDefaultMargins: function()
    {
        _yuitest_coverfunc("build/axis/axis.js", "_getDefaultMargins", 396);
_yuitest_coverline("build/axis/axis.js", 398);
return {
            top: 0,
            left: 4,
            right: 0,
            bottom: 0
        };
    },

    /**
     * Sets the length of the tick on either side of the axis line.
     *
     * @method setTickOffset
     * @protected
     */
    setTickOffsets: function()
    {
        _yuitest_coverfunc("build/axis/axis.js", "setTickOffsets", 412);
_yuitest_coverline("build/axis/axis.js", 414);
var host = this,
            majorTicks = host.get("styles").majorTicks,
            tickLength = majorTicks.length,
            halfTick = tickLength * 0.5,
            display = majorTicks.display;
        _yuitest_coverline("build/axis/axis.js", 419);
host.set("topTickOffset",  0);
        _yuitest_coverline("build/axis/axis.js", 420);
host.set("bottomTickOffset",  0);

        _yuitest_coverline("build/axis/axis.js", 422);
switch(display)
        {
            case "inside" :
                _yuitest_coverline("build/axis/axis.js", 425);
host.set("leftTickOffset", tickLength);
                _yuitest_coverline("build/axis/axis.js", 426);
host.set("rightTickOffset", 0);
            _yuitest_coverline("build/axis/axis.js", 427);
break;
            case "outside" :
                _yuitest_coverline("build/axis/axis.js", 429);
host.set("leftTickOffset", 0);
                _yuitest_coverline("build/axis/axis.js", 430);
host.set("rightTickOffset", tickLength);
            _yuitest_coverline("build/axis/axis.js", 431);
break;
            case "cross" :
                _yuitest_coverline("build/axis/axis.js", 433);
host.set("rightTickOffset", halfTick);
                _yuitest_coverline("build/axis/axis.js", 434);
host.set("leftTickOffset", halfTick);
            _yuitest_coverline("build/axis/axis.js", 435);
break;
            default:
                _yuitest_coverline("build/axis/axis.js", 437);
host.set("leftTickOffset", 0);
                _yuitest_coverline("build/axis/axis.js", 438);
host.set("rightTickOffset", 0);
            _yuitest_coverline("build/axis/axis.js", 439);
break;
        }
    },

    /**
     * Draws a tick
     *
     * @method drawTick
     * @param {Path} path reference to the path `Path` element in which to draw the tick.
     * @param {Object} pt Point on the axis in which the tick will intersect.
     * @param {Object) tickStyle Hash of properties to apply to the tick.
     * @protected
     */
    drawTick: function(path, pt, tickStyles)
    {
        _yuitest_coverfunc("build/axis/axis.js", "drawTick", 452);
_yuitest_coverline("build/axis/axis.js", 454);
var host = this,
            style = host.get("styles"),
            padding = style.padding,
            tickLength = tickStyles.length,
            start = {x:padding.left, y:pt.y},
            end = {x:padding.left + tickLength, y:pt.y};
        _yuitest_coverline("build/axis/axis.js", 460);
host.drawLine(path, start, end);
    },

    /**
     * Calculates the coordinates for the first point on an axis.
     *
     * @method getLineStart
     * @return {Object}
     * @protected
     */
    getLineStart: function()
    {
        _yuitest_coverfunc("build/axis/axis.js", "getLineStart", 470);
_yuitest_coverline("build/axis/axis.js", 472);
var host = this,
            style = host.get("styles"),
            padding = style.padding,
            majorTicks = style.majorTicks,
            tickLength = majorTicks.length,
            display = majorTicks.display,
            pt = {x:padding.left, y:padding.top};
        _yuitest_coverline("build/axis/axis.js", 479);
if(display === "inside")
        {
            _yuitest_coverline("build/axis/axis.js", 481);
pt.x += tickLength;
        }
        else {_yuitest_coverline("build/axis/axis.js", 483);
if(display === "cross")
        {
            _yuitest_coverline("build/axis/axis.js", 485);
pt.x += tickLength/2;
        }}
        _yuitest_coverline("build/axis/axis.js", 487);
return pt;
    },

    /**
     * Calculates the point for a label.
     *
     * @method getLabelPoint
     * @param {Object} point Point on the axis in which the tick will intersect.
     * @return {Object}
     * @protected
     */
    getLabelPoint: function(point)
    {
        _yuitest_coverfunc("build/axis/axis.js", "getLabelPoint", 498);
_yuitest_coverline("build/axis/axis.js", 500);
return {x:point.x + this.get("rightTickOffset"), y:point.y};
    },

    /**
     * Updates the value for the `maxLabelSize` for use in calculating total size.
     *
     * @method updateMaxLabelSize
     * @param {HTMLElement} label to measure
     * @protected
     */
    updateMaxLabelSize: function(labelWidth, labelHeight)
    {
        _yuitest_coverfunc("build/axis/axis.js", "updateMaxLabelSize", 510);
_yuitest_coverline("build/axis/axis.js", 512);
var host = this,
            props = this._labelRotationProps,
            rot = props.rot,
            absRot = props.absRot,
            sinRadians = props.sinRadians,
            cosRadians = props.cosRadians,
            max;
        _yuitest_coverline("build/axis/axis.js", 519);
if(rot === 0)
        {
            _yuitest_coverline("build/axis/axis.js", 521);
max = labelWidth;
        }
        else {_yuitest_coverline("build/axis/axis.js", 523);
if(absRot === 90)
        {
            _yuitest_coverline("build/axis/axis.js", 525);
max = labelHeight;
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 529);
max = (cosRadians * labelWidth) + (sinRadians * labelHeight);
        }}
        _yuitest_coverline("build/axis/axis.js", 531);
host._maxLabelSize = Math.max(host._maxLabelSize, max);
    },

    /**
     * Determines the available label width when the axis width has been explicitly set.
     *
     * @method getExplicitlySized
     * @return Boolean
     * @protected
     */
    getExplicitlySized: function(styles)
    {
        _yuitest_coverfunc("build/axis/axis.js", "getExplicitlySized", 541);
_yuitest_coverline("build/axis/axis.js", 543);
if(this._explicitWidth)
        {
            _yuitest_coverline("build/axis/axis.js", 545);
var host = this,
                w = host._explicitWidth,
                totalTitleSize = this._totalTitleSize,
                rightTickOffset = host.get("rightTickOffset"),
                margin = styles.label.margin.right;
            _yuitest_coverline("build/axis/axis.js", 550);
host._maxLabelSize =  w - (rightTickOffset + margin + totalTitleSize);
            _yuitest_coverline("build/axis/axis.js", 551);
return true;
        }
        _yuitest_coverline("build/axis/axis.js", 553);
return false;
    },

    /**
     * Rotate and position title.
     *
     * @method positionTitle
     * @param {HTMLElement} label to rotate position
     * @protected
     */
    positionTitle: function(label)
    {
        _yuitest_coverfunc("build/axis/axis.js", "positionTitle", 563);
_yuitest_coverline("build/axis/axis.js", 565);
var host = this,
            bounds = host._titleBounds,
            margin = host.get("styles").title.margin,
            props = host._titleRotationProps,
            labelWidth = label.offsetWidth,
            labelHeight = label.offsetHeight,
            w = bounds.right - bounds.left,
            x = this.get("width") - (labelWidth * 0.5) - (w * 0.5),
            y = (host.get("height") * 0.5) - (labelHeight * 0.5);
        _yuitest_coverline("build/axis/axis.js", 574);
props.labelWidth = labelWidth;
        _yuitest_coverline("build/axis/axis.js", 575);
props.labelHeight = labelHeight;
        _yuitest_coverline("build/axis/axis.js", 576);
if(margin && margin.right)
        {
            _yuitest_coverline("build/axis/axis.js", 578);
x -= margin.left;
        }
        _yuitest_coverline("build/axis/axis.js", 580);
props.x = x;
        _yuitest_coverline("build/axis/axis.js", 581);
props.y = y;
        _yuitest_coverline("build/axis/axis.js", 582);
props.transformOrigin = [0.5, 0.5];
        _yuitest_coverline("build/axis/axis.js", 583);
host._rotate(label, props);
    },

    /**
     * Rotate and position labels.
     *
     * @method positionLabel
     * @param {HTMLElement} label to rotate position
     * @param {Object} pt hash containing the x and y coordinates in which the label will be positioned
     * against.
     * @protected
     */
    positionLabel: function(label, pt, styles, i)
    {
        _yuitest_coverfunc("build/axis/axis.js", "positionLabel", 595);
_yuitest_coverline("build/axis/axis.js", 597);
var host = this,
            tickOffset = host.get("rightTickOffset"),
            labelStyles = styles.label,
            margin = 0,
            leftOffset = pt.x,
            topOffset = pt.y,
            props = this._labelRotationProps,
            rot = props.rot,
            absRot = props.absRot,
            labelWidth = this._labelWidths[i],
            labelHeight = this._labelHeights[i];
        _yuitest_coverline("build/axis/axis.js", 608);
if(labelStyles.margin && labelStyles.margin.left)
        {
            _yuitest_coverline("build/axis/axis.js", 610);
margin = labelStyles.margin.left;
        }
        _yuitest_coverline("build/axis/axis.js", 612);
if(rot === 0)
        {
            _yuitest_coverline("build/axis/axis.js", 614);
topOffset -= labelHeight * 0.5;
        }
        else {_yuitest_coverline("build/axis/axis.js", 616);
if(rot === 90)
        {
            _yuitest_coverline("build/axis/axis.js", 618);
leftOffset -= labelWidth * 0.5;
            _yuitest_coverline("build/axis/axis.js", 619);
topOffset -= labelHeight;
        }
        else {_yuitest_coverline("build/axis/axis.js", 621);
if(rot === -90)
        {
            _yuitest_coverline("build/axis/axis.js", 623);
leftOffset -= labelWidth * 0.5;
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 627);
topOffset -= labelHeight * 0.5;
            _yuitest_coverline("build/axis/axis.js", 628);
leftOffset += labelHeight/2 * absRot/90;
        }}}
        _yuitest_coverline("build/axis/axis.js", 630);
leftOffset += margin;
        _yuitest_coverline("build/axis/axis.js", 631);
leftOffset += tickOffset;
        _yuitest_coverline("build/axis/axis.js", 632);
props.labelWidth = labelWidth;
        _yuitest_coverline("build/axis/axis.js", 633);
props.labelHeight = labelHeight;
        _yuitest_coverline("build/axis/axis.js", 634);
props.x = Math.round(leftOffset);
        _yuitest_coverline("build/axis/axis.js", 635);
props.y = Math.round(topOffset);
        _yuitest_coverline("build/axis/axis.js", 636);
this._rotate(label, props);
    },

    /**
     * Adjusts the coordinates of an axis label based on the rotation.
     *
     * @method _setRotationCoords
     * @param {Object} props Coordinates, dimension and rotation properties of the label.
     * @protected
     */
    _setRotationCoords: function(props)
    {
        _yuitest_coverfunc("build/axis/axis.js", "_setRotationCoords", 646);
_yuitest_coverline("build/axis/axis.js", 648);
var rot = props.rot,
            absRot = props.absRot,
            leftOffset = 0,
            topOffset = 0,
            labelWidth = props.labelWidth,
            labelHeight = props.labelHeight;
        _yuitest_coverline("build/axis/axis.js", 654);
if(rot === 0)
        {
            _yuitest_coverline("build/axis/axis.js", 656);
topOffset = labelHeight * 0.5;
        }
        else {_yuitest_coverline("build/axis/axis.js", 658);
if(rot === 90)
        {
            _yuitest_coverline("build/axis/axis.js", 660);
leftOffset = labelWidth * 0.5;
            _yuitest_coverline("build/axis/axis.js", 661);
topOffset = labelHeight;
        }
        else {_yuitest_coverline("build/axis/axis.js", 663);
if(rot === -90)
        {
            _yuitest_coverline("build/axis/axis.js", 665);
leftOffset = labelWidth * 0.5;
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 669);
topOffset = labelHeight * 0.5;
            _yuitest_coverline("build/axis/axis.js", 670);
leftOffset = labelHeight/2 * absRot/90;
        }}}
        _yuitest_coverline("build/axis/axis.js", 672);
props.x -= leftOffset;
        _yuitest_coverline("build/axis/axis.js", 673);
props.y -= topOffset;
    },

    /**
     * Returns the transformOrigin to use for an axis label based on the position of the axis
     * and the rotation of the label.
     *
     * @method _getTransformOrigin
     * @param {Number} rot The rotation (in degrees) of the label.
     * @return Array
     * @protected
     */
    _getTransformOrigin: function(rot)
    {
        _yuitest_coverfunc("build/axis/axis.js", "_getTransformOrigin", 685);
_yuitest_coverline("build/axis/axis.js", 687);
var transformOrigin;
        _yuitest_coverline("build/axis/axis.js", 688);
if(rot === 0)
        {
            _yuitest_coverline("build/axis/axis.js", 690);
transformOrigin = [0, 0];
        }
        else {_yuitest_coverline("build/axis/axis.js", 692);
if(rot === 90)
        {
            _yuitest_coverline("build/axis/axis.js", 694);
transformOrigin = [0.5, 1];
        }
        else {_yuitest_coverline("build/axis/axis.js", 696);
if(rot === -90)
        {
            _yuitest_coverline("build/axis/axis.js", 698);
transformOrigin = [0.5, 0];
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 702);
transformOrigin = [0, 0.5];
        }}}
        _yuitest_coverline("build/axis/axis.js", 704);
return transformOrigin;
    },

    /**
     * Adjusts position for inner ticks.
     *
     * @method offsetNodeForTick
     * @param {Node} cb contentBox of the axis
     * @protected
     */
    offsetNodeForTick: function(cb)
    {
        _yuitest_coverfunc("build/axis/axis.js", "offsetNodeForTick", 714);
_yuitest_coverline("build/axis/axis.js", 716);
var host = this,
            tickOffset = host.get("leftTickOffset"),
            offset = 0 - tickOffset;
        _yuitest_coverline("build/axis/axis.js", 719);
cb.setStyle("left", offset);
    },

    /**
     * Assigns a height based on the size of the contents.
     *
     * @method setCalculatedSize
     * @protected
     */
    setCalculatedSize: function()
    {
        _yuitest_coverfunc("build/axis/axis.js", "setCalculatedSize", 728);
_yuitest_coverline("build/axis/axis.js", 730);
var host = this,
            styles = host.get("styles"),
            labelStyle = styles.label,
            totalTitleSize = this._totalTitleSize,
            ttl = Math.round(host.get("rightTickOffset") + host._maxLabelSize + totalTitleSize + labelStyle.margin.left);
        _yuitest_coverline("build/axis/axis.js", 735);
if(this._explicitWidth)
        {
            _yuitest_coverline("build/axis/axis.js", 737);
ttl = this._explicitWidth;
        }
        _yuitest_coverline("build/axis/axis.js", 739);
host.set("calculatedWidth", ttl);
        _yuitest_coverline("build/axis/axis.js", 740);
host.get("contentBox").setStyle("width", ttl);
    }
};

_yuitest_coverline("build/axis/axis.js", 744);
Y.RightAxisLayout = RightAxisLayout;
/**
 * Contains algorithms for rendering a bottom axis.
 *
 * @class BottomAxisLayout
 * @Constructor
 * @submodule axis
 */
_yuitest_coverline("build/axis/axis.js", 752);
BottomAxisLayout = function(){};

_yuitest_coverline("build/axis/axis.js", 754);
BottomAxisLayout.prototype = {
    /**
     *  Default margins for text fields.
     *
     *  @private
     *  @method _getDefaultMargins
     *  @return Object
     */
    _getDefaultMargins: function()
    {
        _yuitest_coverfunc("build/axis/axis.js", "_getDefaultMargins", 762);
_yuitest_coverline("build/axis/axis.js", 764);
return {
            top: 4,
            left: 0,
            right: 0,
            bottom: 0
        };
    },

    /**
     * Sets the length of the tick on either side of the axis line.
     *
     * @method setTickOffsets
     * @protected
     */
    setTickOffsets: function()
    {
        _yuitest_coverfunc("build/axis/axis.js", "setTickOffsets", 778);
_yuitest_coverline("build/axis/axis.js", 780);
var host = this,
            majorTicks = host.get("styles").majorTicks,
            tickLength = majorTicks.length,
            halfTick = tickLength * 0.5,
            display = majorTicks.display;
        _yuitest_coverline("build/axis/axis.js", 785);
host.set("leftTickOffset",  0);
        _yuitest_coverline("build/axis/axis.js", 786);
host.set("rightTickOffset",  0);

        _yuitest_coverline("build/axis/axis.js", 788);
switch(display)
        {
            case "inside" :
                _yuitest_coverline("build/axis/axis.js", 791);
host.set("topTickOffset", tickLength);
                _yuitest_coverline("build/axis/axis.js", 792);
host.set("bottomTickOffset", 0);
            _yuitest_coverline("build/axis/axis.js", 793);
break;
            case "outside" :
                _yuitest_coverline("build/axis/axis.js", 795);
host.set("topTickOffset", 0);
                _yuitest_coverline("build/axis/axis.js", 796);
host.set("bottomTickOffset", tickLength);
            _yuitest_coverline("build/axis/axis.js", 797);
break;
            case "cross":
                _yuitest_coverline("build/axis/axis.js", 799);
host.set("topTickOffset",  halfTick);
                _yuitest_coverline("build/axis/axis.js", 800);
host.set("bottomTickOffset",  halfTick);
            _yuitest_coverline("build/axis/axis.js", 801);
break;
            default:
                _yuitest_coverline("build/axis/axis.js", 803);
host.set("topTickOffset", 0);
                _yuitest_coverline("build/axis/axis.js", 804);
host.set("bottomTickOffset", 0);
            _yuitest_coverline("build/axis/axis.js", 805);
break;
        }
    },

    /**
     * Calculates the coordinates for the first point on an axis.
     *
     * @method getLineStart
     * @protected
     */
    getLineStart: function()
    {
        _yuitest_coverfunc("build/axis/axis.js", "getLineStart", 815);
_yuitest_coverline("build/axis/axis.js", 817);
var style = this.get("styles"),
            padding = style.padding,
            majorTicks = style.majorTicks,
            tickLength = majorTicks.length,
            display = majorTicks.display,
            pt = {x:0, y:padding.top};
        _yuitest_coverline("build/axis/axis.js", 823);
if(display === "inside")
        {
            _yuitest_coverline("build/axis/axis.js", 825);
pt.y += tickLength;
        }
        else {_yuitest_coverline("build/axis/axis.js", 827);
if(display === "cross")
        {
            _yuitest_coverline("build/axis/axis.js", 829);
pt.y += tickLength/2;
        }}
        _yuitest_coverline("build/axis/axis.js", 831);
return pt;
    },

    /**
     * Draws a tick
     *
     * @method drawTick
     * @param {Path} path reference to the path `Path` element in which to draw the tick.
     * @param {Object} pt hash containing x and y coordinates
     * @param {Object} tickStyles hash of properties used to draw the tick
     * @protected
     */
    drawTick: function(path, pt, tickStyles)
    {
        _yuitest_coverfunc("build/axis/axis.js", "drawTick", 843);
_yuitest_coverline("build/axis/axis.js", 845);
var host = this,
            style = host.get("styles"),
            padding = style.padding,
            tickLength = tickStyles.length,
            start = {x:pt.x, y:padding.top},
            end = {x:pt.x, y:tickLength + padding.top};
        _yuitest_coverline("build/axis/axis.js", 851);
host.drawLine(path, start, end);
    },

    /**
     * Calculates the point for a label.
     *
     * @method getLabelPoint
     * @param {Object} pt Object containing x and y coordinates
     * @return Object
     * @protected
     */
    getLabelPoint: function(point)
    {
        _yuitest_coverfunc("build/axis/axis.js", "getLabelPoint", 862);
_yuitest_coverline("build/axis/axis.js", 864);
return {x:point.x, y:point.y + this.get("bottomTickOffset")};
    },

    /**
     * Updates the value for the `maxLabelSize` for use in calculating total size.
     *
     * @method updateMaxLabelSize
     * @param {HTMLElement} label to measure
     * @protected
     */
    updateMaxLabelSize: function(labelWidth, labelHeight)
    {
        _yuitest_coverfunc("build/axis/axis.js", "updateMaxLabelSize", 874);
_yuitest_coverline("build/axis/axis.js", 876);
var host = this,
            props = this._labelRotationProps,
            rot = props.rot,
            absRot = props.absRot,
            sinRadians = props.sinRadians,
            cosRadians = props.cosRadians,
            max;
        _yuitest_coverline("build/axis/axis.js", 883);
if(rot === 0)
        {
            _yuitest_coverline("build/axis/axis.js", 885);
max = labelHeight;
        }
        else {_yuitest_coverline("build/axis/axis.js", 887);
if(absRot === 90)
        {
            _yuitest_coverline("build/axis/axis.js", 889);
max = labelWidth;
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 893);
max = (sinRadians * labelWidth) + (cosRadians * labelHeight);
        }}
        _yuitest_coverline("build/axis/axis.js", 895);
host._maxLabelSize = Math.max(host._maxLabelSize, max);
    },

    /**
     * Determines the available label height when the axis width has been explicitly set.
     *
     * @method getExplicitlySized
     * @return Boolean
     * @protected
     */
    getExplicitlySized: function(styles)
    {
        _yuitest_coverfunc("build/axis/axis.js", "getExplicitlySized", 905);
_yuitest_coverline("build/axis/axis.js", 907);
if(this._explicitHeight)
        {
            _yuitest_coverline("build/axis/axis.js", 909);
var host = this,
                h = host._explicitHeight,
                totalTitleSize = host._totalTitleSize,
                bottomTickOffset = host.get("bottomTickOffset"),
                margin = styles.label.margin.right;
            _yuitest_coverline("build/axis/axis.js", 914);
host._maxLabelSize =  h - (bottomTickOffset + margin + totalTitleSize);
            _yuitest_coverline("build/axis/axis.js", 915);
return true;
        }
        _yuitest_coverline("build/axis/axis.js", 917);
return false;
    },

    /**
     * Rotate and position title.
     *
     * @method positionTitle
     * @param {HTMLElement} label to rotate position
     * @protected
     */
    positionTitle: function(label)
    {
        _yuitest_coverfunc("build/axis/axis.js", "positionTitle", 927);
_yuitest_coverline("build/axis/axis.js", 929);
var host = this,
            bounds = host._titleBounds,
            margin = host.get("styles").title.margin,
            props = host._titleRotationProps,
            h = bounds.bottom - bounds.top,
            labelWidth = label.offsetWidth,
            labelHeight = label.offsetHeight,
            x = (host.get("width") * 0.5) - (labelWidth * 0.5),
            y = host.get("height") - labelHeight/2 - h/2;
        _yuitest_coverline("build/axis/axis.js", 938);
props.labelWidth = labelWidth;
        _yuitest_coverline("build/axis/axis.js", 939);
props.labelHeight = labelHeight;
        _yuitest_coverline("build/axis/axis.js", 940);
if(margin && margin.bottom)
        {
            _yuitest_coverline("build/axis/axis.js", 942);
y -= margin.bottom;
        }
        _yuitest_coverline("build/axis/axis.js", 944);
props.x = x;
        _yuitest_coverline("build/axis/axis.js", 945);
props.y = y;
        _yuitest_coverline("build/axis/axis.js", 946);
props.transformOrigin = [0.5, 0.5];
        _yuitest_coverline("build/axis/axis.js", 947);
host._rotate(label, props);
    },

    /**
     * Rotate and position labels.
     *
     * @method positionLabel
     * @param {HTMLElement} label to rotate position
     * @param {Object} pt hash containing the x and y coordinates in which the label will be positioned
     * against.
     * @protected
     */
    positionLabel: function(label, pt, styles, i)
    {
        _yuitest_coverfunc("build/axis/axis.js", "positionLabel", 959);
_yuitest_coverline("build/axis/axis.js", 961);
var host = this,
            tickOffset = host.get("bottomTickOffset"),
            labelStyles = styles.label,
            margin = 0,
            props = host._labelRotationProps,
            rot = props.rot,
            absRot = props.absRot,
            leftOffset = Math.round(pt.x),
            topOffset = Math.round(pt.y),
            labelWidth = host._labelWidths[i],
            labelHeight = host._labelHeights[i];
        _yuitest_coverline("build/axis/axis.js", 972);
if(labelStyles.margin && labelStyles.margin.top)
        {
            _yuitest_coverline("build/axis/axis.js", 974);
margin = labelStyles.margin.top;
        }
        _yuitest_coverline("build/axis/axis.js", 976);
if(rot > 0)
        {
            _yuitest_coverline("build/axis/axis.js", 978);
topOffset -= labelHeight/2 * rot/90;
        }
        else {_yuitest_coverline("build/axis/axis.js", 980);
if(rot < 0)
        {
            _yuitest_coverline("build/axis/axis.js", 982);
leftOffset -= labelWidth;
            _yuitest_coverline("build/axis/axis.js", 983);
topOffset -= labelHeight/2 * absRot/90;
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 987);
leftOffset -= labelWidth * 0.5;
        }}
        _yuitest_coverline("build/axis/axis.js", 989);
topOffset += margin;
        _yuitest_coverline("build/axis/axis.js", 990);
topOffset += tickOffset;
        _yuitest_coverline("build/axis/axis.js", 991);
props.labelWidth = labelWidth;
        _yuitest_coverline("build/axis/axis.js", 992);
props.labelHeight = labelHeight;
        _yuitest_coverline("build/axis/axis.js", 993);
props.x = leftOffset;
        _yuitest_coverline("build/axis/axis.js", 994);
props.y = topOffset;
        _yuitest_coverline("build/axis/axis.js", 995);
host._rotate(label, props);
    },

    /**
     * Adjusts the coordinates of an axis label based on the rotation.
     *
     * @method _setRotationCoords
     * @param {Object} props Coordinates, dimension and rotation properties of the label.
     * @protected
     */
    _setRotationCoords: function(props)
    {
        _yuitest_coverfunc("build/axis/axis.js", "_setRotationCoords", 1005);
_yuitest_coverline("build/axis/axis.js", 1007);
var rot = props.rot,
            absRot = props.absRot,
            labelWidth = props.labelWidth,
            labelHeight = props.labelHeight,
            leftOffset,
            topOffset;

        _yuitest_coverline("build/axis/axis.js", 1014);
if(rot > 0)
        {
            _yuitest_coverline("build/axis/axis.js", 1016);
leftOffset = 0;
            _yuitest_coverline("build/axis/axis.js", 1017);
topOffset = labelHeight/2 * rot/90;
        }
        else {_yuitest_coverline("build/axis/axis.js", 1019);
if(rot < 0)
        {
            _yuitest_coverline("build/axis/axis.js", 1021);
leftOffset = labelWidth;
            _yuitest_coverline("build/axis/axis.js", 1022);
topOffset = labelHeight/2 * absRot/90;
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 1026);
leftOffset = labelWidth * 0.5;
            _yuitest_coverline("build/axis/axis.js", 1027);
topOffset = 0;
        }}
        _yuitest_coverline("build/axis/axis.js", 1029);
props.x -= leftOffset;
        _yuitest_coverline("build/axis/axis.js", 1030);
props.y -= topOffset;
    },

    /**
     * Returns the transformOrigin to use for an axis label based on the position of the axis
     * and the rotation of the label.
     *
     * @method _getTransformOrigin
     * @param {Number} rot The rotation (in degrees) of the label.
     * @return Array
     * @protected
     */
    _getTransformOrigin: function(rot)
    {
        _yuitest_coverfunc("build/axis/axis.js", "_getTransformOrigin", 1042);
_yuitest_coverline("build/axis/axis.js", 1044);
var transformOrigin;
        _yuitest_coverline("build/axis/axis.js", 1045);
if(rot > 0)
        {
            _yuitest_coverline("build/axis/axis.js", 1047);
transformOrigin = [0, 0.5];
        }
        else {_yuitest_coverline("build/axis/axis.js", 1049);
if(rot < 0)
        {
            _yuitest_coverline("build/axis/axis.js", 1051);
transformOrigin = [1, 0.5];
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 1055);
transformOrigin = [0, 0];
        }}
        _yuitest_coverline("build/axis/axis.js", 1057);
return transformOrigin;
    },

    /**
     * Adjusts position for inner ticks.
     *
     * @method offsetNodeForTick
     * @param {Node} cb contentBox of the axis
     * @protected
     */
    offsetNodeForTick: function(cb)
    {
        _yuitest_coverfunc("build/axis/axis.js", "offsetNodeForTick", 1067);
_yuitest_coverline("build/axis/axis.js", 1069);
var host = this;
        _yuitest_coverline("build/axis/axis.js", 1070);
cb.setStyle("top", 0 - host.get("topTickOffset"));
    },

    /**
     * Assigns a height based on the size of the contents.
     *
     * @method setCalculatedSize
     * @protected
     */
    setCalculatedSize: function()
    {
        _yuitest_coverfunc("build/axis/axis.js", "setCalculatedSize", 1079);
_yuitest_coverline("build/axis/axis.js", 1081);
var host = this,
            styles = host.get("styles"),
            labelStyle = styles.label,
            totalTitleSize = host._totalTitleSize,
            ttl = Math.round(host.get("bottomTickOffset") + host._maxLabelSize + labelStyle.margin.top + totalTitleSize);
        _yuitest_coverline("build/axis/axis.js", 1086);
if(host._explicitHeight)
        {
            _yuitest_coverline("build/axis/axis.js", 1088);
ttl = host._explicitHeight;
        }
        _yuitest_coverline("build/axis/axis.js", 1090);
host.set("calculatedHeight", ttl);
    }
};
_yuitest_coverline("build/axis/axis.js", 1093);
Y.BottomAxisLayout = BottomAxisLayout;
/**
 * Contains algorithms for rendering a top axis.
 *
 * @class TopAxisLayout
 * @constructor
 * @submodule axis
 */
_yuitest_coverline("build/axis/axis.js", 1101);
TopAxisLayout = function(){};

_yuitest_coverline("build/axis/axis.js", 1103);
TopAxisLayout.prototype = {
    /**
     *  Default margins for text fields.
     *
     *  @private
     *  @method _getDefaultMargins
     *  @return Object
     */
    _getDefaultMargins: function()
    {
        _yuitest_coverfunc("build/axis/axis.js", "_getDefaultMargins", 1111);
_yuitest_coverline("build/axis/axis.js", 1113);
return {
            top: 0,
            left: 0,
            right: 0,
            bottom: 4
        };
    },

    /**
     * Sets the length of the tick on either side of the axis line.
     *
     * @method setTickOffsets
     * @protected
     */
    setTickOffsets: function()
    {
        _yuitest_coverfunc("build/axis/axis.js", "setTickOffsets", 1127);
_yuitest_coverline("build/axis/axis.js", 1129);
var host = this,
            majorTicks = host.get("styles").majorTicks,
            tickLength = majorTicks.length,
            halfTick = tickLength * 0.5,
            display = majorTicks.display;
        _yuitest_coverline("build/axis/axis.js", 1134);
host.set("leftTickOffset",  0);
        _yuitest_coverline("build/axis/axis.js", 1135);
host.set("rightTickOffset",  0);
        _yuitest_coverline("build/axis/axis.js", 1136);
switch(display)
        {
            case "inside" :
                _yuitest_coverline("build/axis/axis.js", 1139);
host.set("bottomTickOffset", tickLength);
                _yuitest_coverline("build/axis/axis.js", 1140);
host.set("topTickOffset", 0);
            _yuitest_coverline("build/axis/axis.js", 1141);
break;
            case "outside" :
                _yuitest_coverline("build/axis/axis.js", 1143);
host.set("bottomTickOffset", 0);
                _yuitest_coverline("build/axis/axis.js", 1144);
host.set("topTickOffset",  tickLength);
            _yuitest_coverline("build/axis/axis.js", 1145);
break;
            case "cross" :
                _yuitest_coverline("build/axis/axis.js", 1147);
host.set("topTickOffset", halfTick);
                _yuitest_coverline("build/axis/axis.js", 1148);
host.set("bottomTickOffset", halfTick);
            _yuitest_coverline("build/axis/axis.js", 1149);
break;
            default:
                _yuitest_coverline("build/axis/axis.js", 1151);
host.set("topTickOffset", 0);
                _yuitest_coverline("build/axis/axis.js", 1152);
host.set("bottomTickOffset", 0);
            _yuitest_coverline("build/axis/axis.js", 1153);
break;
        }
    },

    /**
     * Calculates the coordinates for the first point on an axis.
     *
     * @method getLineStart
     * @protected
     */
    getLineStart: function()
    {
        _yuitest_coverfunc("build/axis/axis.js", "getLineStart", 1163);
_yuitest_coverline("build/axis/axis.js", 1165);
var host = this,
            style = host.get("styles"),
            padding = style.padding,
            majorTicks = style.majorTicks,
            tickLength = majorTicks.length,
            display = majorTicks.display,
            pt = {x:0, y:padding.top};
        _yuitest_coverline("build/axis/axis.js", 1172);
if(display === "outside")
        {
            _yuitest_coverline("build/axis/axis.js", 1174);
pt.y += tickLength;
        }
        else {_yuitest_coverline("build/axis/axis.js", 1176);
if(display === "cross")
        {
            _yuitest_coverline("build/axis/axis.js", 1178);
pt.y += tickLength/2;
        }}
        _yuitest_coverline("build/axis/axis.js", 1180);
return pt;
    },

    /**
     * Draws a tick
     *
     * @method drawTick
     * @param {Path} path reference to the path `Path` element in which to draw the tick.
     * @param {Object} pt hash containing x and y coordinates
     * @param {Object} tickStyles hash of properties used to draw the tick
     * @protected
     */
    drawTick: function(path, pt, tickStyles)
    {
        _yuitest_coverfunc("build/axis/axis.js", "drawTick", 1192);
_yuitest_coverline("build/axis/axis.js", 1194);
var host = this,
            style = host.get("styles"),
            padding = style.padding,
            tickLength = tickStyles.length,
            start = {x:pt.x, y:padding.top},
            end = {x:pt.x, y:tickLength + padding.top};
        _yuitest_coverline("build/axis/axis.js", 1200);
host.drawLine(path, start, end);
    },

    /**
     * Calculates the point for a label.
     *
     * @method getLabelPoint
     * @param {Object} pt hash containing x and y coordinates
     * @return Object
     * @protected
     */
    getLabelPoint: function(pt)
    {
        _yuitest_coverfunc("build/axis/axis.js", "getLabelPoint", 1211);
_yuitest_coverline("build/axis/axis.js", 1213);
return {x:pt.x, y:pt.y - this.get("topTickOffset")};
    },

    /**
     * Updates the value for the `maxLabelSize` for use in calculating total size.
     *
     * @method updateMaxLabelSize
     * @param {HTMLElement} label to measure
     * @protected
     */
    updateMaxLabelSize: function(labelWidth, labelHeight)
    {
        _yuitest_coverfunc("build/axis/axis.js", "updateMaxLabelSize", 1223);
_yuitest_coverline("build/axis/axis.js", 1225);
var host = this,
            props = this._labelRotationProps,
            rot = props.rot,
            absRot = props.absRot,
            sinRadians = props.sinRadians,
            cosRadians = props.cosRadians,
            max;
        _yuitest_coverline("build/axis/axis.js", 1232);
if(rot === 0)
        {
            _yuitest_coverline("build/axis/axis.js", 1234);
max = labelHeight;
        }
        else {_yuitest_coverline("build/axis/axis.js", 1236);
if(absRot === 90)
        {
            _yuitest_coverline("build/axis/axis.js", 1238);
max = labelWidth;
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 1242);
max = (sinRadians * labelWidth) + (cosRadians * labelHeight);
        }}
        _yuitest_coverline("build/axis/axis.js", 1244);
host._maxLabelSize = Math.max(host._maxLabelSize, max);
    },

    /**
     * Determines the available label height when the axis width has been explicitly set.
     *
     * @method getExplicitlySized
     * @return Boolean
     * @protected
     */
    getExplicitlySized: function(styles)
    {
        _yuitest_coverfunc("build/axis/axis.js", "getExplicitlySized", 1254);
_yuitest_coverline("build/axis/axis.js", 1256);
if(this._explicitHeight)
        {
            _yuitest_coverline("build/axis/axis.js", 1258);
var host = this,
                h = host._explicitHeight,
                totalTitleSize = host._totalTitleSize,
                topTickOffset = host.get("topTickOffset"),
                margin = styles.label.margin.right;
            _yuitest_coverline("build/axis/axis.js", 1263);
host._maxLabelSize =  h - (topTickOffset + margin + totalTitleSize);
            _yuitest_coverline("build/axis/axis.js", 1264);
return true;
        }
        _yuitest_coverline("build/axis/axis.js", 1266);
return false;
    },

    /**
     * Rotate and position title.
     *
     * @method positionTitle
     * @param {HTMLElement} label to rotate position
     * @protected
     */
    positionTitle: function(label)
    {
        _yuitest_coverfunc("build/axis/axis.js", "positionTitle", 1276);
_yuitest_coverline("build/axis/axis.js", 1278);
var host = this,
            bounds = host._titleBounds,
            margin = host.get("styles").title.margin,
            props = host._titleRotationProps,
            labelWidth = label.offsetWidth,
            labelHeight = label.offsetHeight,
            h = bounds.bottom - bounds.top,
            x = (host.get("width") * 0.5) - (labelWidth * 0.5),
            y = h/2 - labelHeight/2;
        _yuitest_coverline("build/axis/axis.js", 1287);
props.labelWidth = labelWidth;
        _yuitest_coverline("build/axis/axis.js", 1288);
props.labelHeight = labelHeight;
        _yuitest_coverline("build/axis/axis.js", 1289);
if(margin && margin.top)
        {
            _yuitest_coverline("build/axis/axis.js", 1291);
y += margin.top;
        }
        _yuitest_coverline("build/axis/axis.js", 1293);
props.x = x;
        _yuitest_coverline("build/axis/axis.js", 1294);
props.y = y;
        _yuitest_coverline("build/axis/axis.js", 1295);
props.transformOrigin = [0.5, 0.5];
        _yuitest_coverline("build/axis/axis.js", 1296);
host._rotate(label, props);
    },

    /**
     * Rotate and position labels.
     *
     * @method positionLabel
     * @param {HTMLElement} label to rotate position
     * @param {Object} pt hash containing the x and y coordinates in which the label will be positioned
     * against.
     * @protected
     */
    positionLabel: function(label, pt, styles, i)
    {
        _yuitest_coverfunc("build/axis/axis.js", "positionLabel", 1308);
_yuitest_coverline("build/axis/axis.js", 1310);
var host = this,
            totalTitleSize = this._totalTitleSize,
            maxLabelSize = host._maxLabelSize,
            leftOffset = pt.x,
            topOffset = pt.y + totalTitleSize + maxLabelSize,
            props = this._labelRotationProps,
            rot = props.rot,
            absRot = props.absRot,
            labelWidth = this._labelWidths[i],
            labelHeight = this._labelHeights[i];
        _yuitest_coverline("build/axis/axis.js", 1320);
if(rot === 0)
        {
            _yuitest_coverline("build/axis/axis.js", 1322);
leftOffset -= labelWidth * 0.5;
            _yuitest_coverline("build/axis/axis.js", 1323);
topOffset -= labelHeight;
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 1327);
if(rot === 90)
            {
                _yuitest_coverline("build/axis/axis.js", 1329);
leftOffset -= labelWidth;
                _yuitest_coverline("build/axis/axis.js", 1330);
topOffset -= (labelHeight * 0.5);
            }
            else {_yuitest_coverline("build/axis/axis.js", 1332);
if (rot === -90)
            {
                _yuitest_coverline("build/axis/axis.js", 1334);
topOffset -= (labelHeight * 0.5);
            }
            else {_yuitest_coverline("build/axis/axis.js", 1336);
if(rot > 0)
            {
                _yuitest_coverline("build/axis/axis.js", 1338);
leftOffset -= labelWidth;
                _yuitest_coverline("build/axis/axis.js", 1339);
topOffset -= labelHeight - (labelHeight * rot/180);
            }
            else
            {
                _yuitest_coverline("build/axis/axis.js", 1343);
topOffset -= labelHeight - (labelHeight * absRot/180);
            }}}
        }
        _yuitest_coverline("build/axis/axis.js", 1346);
props.x = Math.round(leftOffset);
        _yuitest_coverline("build/axis/axis.js", 1347);
props.y = Math.round(topOffset);
        _yuitest_coverline("build/axis/axis.js", 1348);
props.labelWidth = labelWidth;
        _yuitest_coverline("build/axis/axis.js", 1349);
props.labelHeight = labelHeight;
        _yuitest_coverline("build/axis/axis.js", 1350);
this._rotate(label, props);
    },

    /**
     * Adjusts the coordinates of an axis label based on the rotation.
     *
     * @method _setRotationCoords
     * @param {Object} props Coordinates, dimension and rotation properties of the label.
     * @protected
     */
    _setRotationCoords: function(props)
    {
        _yuitest_coverfunc("build/axis/axis.js", "_setRotationCoords", 1360);
_yuitest_coverline("build/axis/axis.js", 1362);
var rot = props.rot,
            absRot = props.absRot,
            labelWidth = props.labelWidth,
            labelHeight = props.labelHeight,
            leftOffset,
            topOffset;
        _yuitest_coverline("build/axis/axis.js", 1368);
if(rot === 0)
        {
            _yuitest_coverline("build/axis/axis.js", 1370);
leftOffset = labelWidth * 0.5;
            _yuitest_coverline("build/axis/axis.js", 1371);
topOffset = labelHeight;
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 1375);
if(rot === 90)
            {
                _yuitest_coverline("build/axis/axis.js", 1377);
leftOffset = labelWidth;
                _yuitest_coverline("build/axis/axis.js", 1378);
topOffset = (labelHeight * 0.5);
            }
            else {_yuitest_coverline("build/axis/axis.js", 1380);
if (rot === -90)
            {
                _yuitest_coverline("build/axis/axis.js", 1382);
topOffset = (labelHeight * 0.5);
            }
            else {_yuitest_coverline("build/axis/axis.js", 1384);
if(rot > 0)
            {
                _yuitest_coverline("build/axis/axis.js", 1386);
leftOffset = labelWidth;
                _yuitest_coverline("build/axis/axis.js", 1387);
topOffset = labelHeight - (labelHeight * rot/180);
            }
            else
            {
                _yuitest_coverline("build/axis/axis.js", 1391);
topOffset = labelHeight - (labelHeight * absRot/180);
            }}}
        }
        _yuitest_coverline("build/axis/axis.js", 1394);
props.x -= leftOffset;
        _yuitest_coverline("build/axis/axis.js", 1395);
props.y -= topOffset;
    },

    /**
     * Returns the transformOrigin to use for an axis label based on the position of the axis
     * and the rotation of the label.
     *
     * @method _getTransformOrigin
     * @param {Number} rot The rotation (in degrees) of the label.
     * @return Array
     * @protected
     */
    _getTransformOrigin: function(rot)
    {
        _yuitest_coverfunc("build/axis/axis.js", "_getTransformOrigin", 1407);
_yuitest_coverline("build/axis/axis.js", 1409);
var transformOrigin;
        _yuitest_coverline("build/axis/axis.js", 1410);
if(rot === 0)
        {
            _yuitest_coverline("build/axis/axis.js", 1412);
transformOrigin = [0, 0];
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 1416);
if(rot === 90)
            {
                _yuitest_coverline("build/axis/axis.js", 1418);
transformOrigin = [1, 0.5];
            }
            else {_yuitest_coverline("build/axis/axis.js", 1420);
if (rot === -90)
            {
                _yuitest_coverline("build/axis/axis.js", 1422);
transformOrigin = [0, 0.5];
            }
            else {_yuitest_coverline("build/axis/axis.js", 1424);
if(rot > 0)
            {
                _yuitest_coverline("build/axis/axis.js", 1426);
transformOrigin = [1, 0.5];
            }
            else
            {
                _yuitest_coverline("build/axis/axis.js", 1430);
transformOrigin = [0, 0.5];
            }}}
        }
        _yuitest_coverline("build/axis/axis.js", 1433);
return transformOrigin;
    },

    /**
     * Adjusts position for inner ticks.
     *
     * @method offsetNodeForTick
     * @param {Node} cb contentBox of the axis
     * @protected
     */
    offsetNodeForTick: function()
    {
    },

    /**
     * Assigns a height based on the size of the contents.
     *
     * @method setCalculatedSize
     * @protected
     */
    setCalculatedSize: function()
    {
        _yuitest_coverfunc("build/axis/axis.js", "setCalculatedSize", 1453);
_yuitest_coverline("build/axis/axis.js", 1455);
var host = this,
            graphic = host.get("graphic"),
            styles = host.get("styles"),
            labelMargin = styles.label.margin,
            totalLabelSize = labelMargin.bottom + host._maxLabelSize,
            totalTitleSize = host._totalTitleSize,
            topTickOffset = this.get("topTickOffset"),
            ttl = Math.round(topTickOffset + totalLabelSize + totalTitleSize);
        _yuitest_coverline("build/axis/axis.js", 1463);
if(this._explicitHeight)
        {
           _yuitest_coverline("build/axis/axis.js", 1465);
ttl = this._explicitHeight;
        }
        _yuitest_coverline("build/axis/axis.js", 1467);
host.set("calculatedHeight", ttl);
        _yuitest_coverline("build/axis/axis.js", 1468);
graphic.set("y", ttl - topTickOffset);
    }
};
_yuitest_coverline("build/axis/axis.js", 1471);
Y.TopAxisLayout = TopAxisLayout;

/**
 * An abstract class that provides the core functionality for draw a chart axis. Axis is used by the following classes:
 * <ul>
 *      <li>{{#crossLink "CategoryAxis"}}{{/crossLink}}</li>
 *      <li>{{#crossLink "NumericAxis"}}{{/crossLink}}</li>
 *      <li>{{#crossLink "StackedAxis"}}{{/crossLink}}</li>
 *      <li>{{#crossLink "TimeAxis"}}{{/crossLink}}</li>
 *  </ul>
 *
 * @class Axis
 * @extends Widget
 * @uses AxisBase
 * @uses TopAxisLayout
 * @uses RightAxisLayout
 * @uses BottomAxisLayout
 * @uses LeftAxisLayout
 * @constructor
 * @param {Object} config (optional) Configuration parameters.
 * @submodule axis
 */
_yuitest_coverline("build/axis/axis.js", 1493);
Y.Axis = Y.Base.create("axis", Y.Widget, [Y.AxisBase], {
    /**
     * Calculates and returns a value based on the number of labels and the index of
     * the current label.
     *
     * @method getLabelByIndex
     * @param {Number} i Index of the label.
     * @param {Number} l Total number of labels.
     * @return String
     */
    getLabelByIndex: function(i, l)
    {
        _yuitest_coverfunc("build/axis/axis.js", "getLabelByIndex", 1503);
_yuitest_coverline("build/axis/axis.js", 1505);
var position = this.get("position"),
            direction = position === "left" || position === "right" ? "vertical" : "horizontal";
        _yuitest_coverline("build/axis/axis.js", 1507);
return this._getLabelByIndex(i, l, direction);
    },

    /**
     * @method bindUI
     * @private
     */
    bindUI: function()
    {
        _yuitest_coverfunc("build/axis/axis.js", "bindUI", 1514);
_yuitest_coverline("build/axis/axis.js", 1516);
this.after("dataReady", Y.bind(this._dataChangeHandler, this));
        _yuitest_coverline("build/axis/axis.js", 1517);
this.after("dataUpdate", Y.bind(this._dataChangeHandler, this));
        _yuitest_coverline("build/axis/axis.js", 1518);
this.after("stylesChange", this._updateHandler);
        _yuitest_coverline("build/axis/axis.js", 1519);
this.after("overlapGraphChange", this._updateHandler);
        _yuitest_coverline("build/axis/axis.js", 1520);
this.after("positionChange", this._positionChangeHandler);
        _yuitest_coverline("build/axis/axis.js", 1521);
this.after("widthChange", this._handleSizeChange);
        _yuitest_coverline("build/axis/axis.js", 1522);
this.after("heightChange", this._handleSizeChange);
        _yuitest_coverline("build/axis/axis.js", 1523);
this.after("calculatedWidthChange", this._handleSizeChange);
        _yuitest_coverline("build/axis/axis.js", 1524);
this.after("calculatedHeightChange", this._handleSizeChange);
    },
    /**
     * Storage for calculatedWidth value.
     *
     * @property _calculatedWidth
     * @type Number
     * @private
     */
    _calculatedWidth: 0,

    /**
     * Storage for calculatedHeight value.
     *
     * @property _calculatedHeight
     * @type Number
     * @private
     */
    _calculatedHeight: 0,

    /**
     * Handles change to the dataProvider
     *
     * @method _dataChangeHandler
     * @param {Object} e Event object
     * @private
     */
    _dataChangeHandler: function()
    {
        _yuitest_coverfunc("build/axis/axis.js", "_dataChangeHandler", 1551);
_yuitest_coverline("build/axis/axis.js", 1553);
if(this.get("rendered"))
        {
            _yuitest_coverline("build/axis/axis.js", 1555);
this._drawAxis();
        }
    },

    /**
     * Handles change to the position attribute
     *
     * @method _positionChangeHandler
     * @param {Object} e Event object
     * @private
     */
    _positionChangeHandler: function(e)
    {
        _yuitest_coverfunc("build/axis/axis.js", "_positionChangeHandler", 1566);
_yuitest_coverline("build/axis/axis.js", 1568);
this._updateGraphic(e.newVal);
        _yuitest_coverline("build/axis/axis.js", 1569);
this._updateHandler();
    },

    /**
     * Updates the the Graphic instance
     *
     * @method _updateGraphic
     * @param {String} position Position of axis
     * @private
     */
    _updateGraphic: function(position)
    {
        _yuitest_coverfunc("build/axis/axis.js", "_updateGraphic", 1579);
_yuitest_coverline("build/axis/axis.js", 1581);
var graphic = this.get("graphic");
        _yuitest_coverline("build/axis/axis.js", 1582);
if(position === "none")
        {
            _yuitest_coverline("build/axis/axis.js", 1584);
if(graphic)
            {
                _yuitest_coverline("build/axis/axis.js", 1586);
graphic.destroy();
            }
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 1591);
if(!graphic)
            {
                _yuitest_coverline("build/axis/axis.js", 1593);
this._setCanvas();
            }
        }
    },

    /**
     * Handles changes to axis.
     *
     * @method _updateHandler
     * @param {Object} e Event object
     * @private
     */
    _updateHandler: function()
    {
        _yuitest_coverfunc("build/axis/axis.js", "_updateHandler", 1605);
_yuitest_coverline("build/axis/axis.js", 1607);
if(this.get("rendered"))
        {
            _yuitest_coverline("build/axis/axis.js", 1609);
this._drawAxis();
        }
    },

    /**
     * @method renderUI
     * @private
     */
    renderUI: function()
    {
        _yuitest_coverfunc("build/axis/axis.js", "renderUI", 1617);
_yuitest_coverline("build/axis/axis.js", 1619);
this._updateGraphic(this.get("position"));
    },

    /**
     * @method syncUI
     * @private
     */
    syncUI: function()
    {
        _yuitest_coverfunc("build/axis/axis.js", "syncUI", 1626);
_yuitest_coverline("build/axis/axis.js", 1628);
var layout = this._layout,
            defaultMargins,
            styles,
            label,
            title,
            i;
        _yuitest_coverline("build/axis/axis.js", 1634);
if(layout)
        {
            _yuitest_coverline("build/axis/axis.js", 1636);
defaultMargins = layout._getDefaultMargins();
            _yuitest_coverline("build/axis/axis.js", 1637);
styles = this.get("styles");
            _yuitest_coverline("build/axis/axis.js", 1638);
label = styles.label.margin;
            _yuitest_coverline("build/axis/axis.js", 1639);
title =styles.title.margin;
            //need to defaultMargins method to the layout classes.
            _yuitest_coverline("build/axis/axis.js", 1641);
for(i in defaultMargins)
            {
                _yuitest_coverline("build/axis/axis.js", 1643);
if(defaultMargins.hasOwnProperty(i))
                {
                    _yuitest_coverline("build/axis/axis.js", 1645);
label[i] = label[i] === undefined ? defaultMargins[i] : label[i];
                    _yuitest_coverline("build/axis/axis.js", 1646);
title[i] = title[i] === undefined ? defaultMargins[i] : title[i];
                }
            }
        }
        _yuitest_coverline("build/axis/axis.js", 1650);
this._drawAxis();
    },

    /**
     * Creates a graphic instance to be used for the axis line and ticks.
     *
     * @method _setCanvas
     * @private
     */
    _setCanvas: function()
    {
        _yuitest_coverfunc("build/axis/axis.js", "_setCanvas", 1659);
_yuitest_coverline("build/axis/axis.js", 1661);
var cb = this.get("contentBox"),
            bb = this.get("boundingBox"),
            p = this.get("position"),
            pn = this._parentNode,
            w = this.get("width"),
            h = this.get("height");
        _yuitest_coverline("build/axis/axis.js", 1667);
bb.setStyle("position", "absolute");
        _yuitest_coverline("build/axis/axis.js", 1668);
bb.setStyle("zIndex", 2);
        _yuitest_coverline("build/axis/axis.js", 1669);
w = w ? w + "px" : pn.getStyle("width");
        _yuitest_coverline("build/axis/axis.js", 1670);
h = h ? h + "px" : pn.getStyle("height");
        _yuitest_coverline("build/axis/axis.js", 1671);
if(p === "top" || p === "bottom")
        {
            _yuitest_coverline("build/axis/axis.js", 1673);
cb.setStyle("width", w);
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 1677);
cb.setStyle("height", h);
        }
        _yuitest_coverline("build/axis/axis.js", 1679);
cb.setStyle("position", "relative");
        _yuitest_coverline("build/axis/axis.js", 1680);
cb.setStyle("left", "0px");
        _yuitest_coverline("build/axis/axis.js", 1681);
cb.setStyle("top", "0px");
        _yuitest_coverline("build/axis/axis.js", 1682);
this.set("graphic", new Y.Graphic());
        _yuitest_coverline("build/axis/axis.js", 1683);
this.get("graphic").render(cb);
    },

    /**
     * Gets the default value for the `styles` attribute. Overrides
     * base implementation.
     *
     * @method _getDefaultStyles
     * @return Object
     * @protected
     */
    _getDefaultStyles: function()
    {
        _yuitest_coverfunc("build/axis/axis.js", "_getDefaultStyles", 1694);
_yuitest_coverline("build/axis/axis.js", 1696);
var axisstyles = {
            majorTicks: {
                display:"inside",
                length:4,
                color:"#dad8c9",
                weight:1,
                alpha:1
            },
            minorTicks: {
                display:"none",
                length:2,
                color:"#dad8c9",
                weight:1
            },
            line: {
                weight:1,
                color:"#dad8c9",
                alpha:1
            },
            majorUnit: {
                determinant:"count",
                count:11,
                distance:75
            },
            top: "0px",
            left: "0px",
            width: "100px",
            height: "100px",
            label: {
                color:"#808080",
                alpha: 1,
                fontSize:"85%",
                rotation: 0,
                margin: {
                    top: undefined,
                    right: undefined,
                    bottom: undefined,
                    left: undefined
                }
            },
            title: {
                color:"#808080",
                alpha: 1,
                fontSize:"85%",
                rotation: undefined,
                margin: {
                    top: undefined,
                    right: undefined,
                    bottom: undefined,
                    left: undefined
                }
            },
            hideOverlappingLabelTicks: false
        };

        _yuitest_coverline("build/axis/axis.js", 1751);
return Y.merge(Y.Renderer.prototype._getDefaultStyles(), axisstyles);
    },

    /**
     * Updates the axis when the size changes.
     *
     * @method _handleSizeChange
     * @param {Object} e Event object.
     * @private
     */
    _handleSizeChange: function(e)
    {
        _yuitest_coverfunc("build/axis/axis.js", "_handleSizeChange", 1761);
_yuitest_coverline("build/axis/axis.js", 1763);
var attrName = e.attrName,
            pos = this.get("position"),
            vert = pos === "left" || pos === "right",
            cb = this.get("contentBox"),
            hor = pos === "bottom" || pos === "top";
        _yuitest_coverline("build/axis/axis.js", 1768);
cb.setStyle("width", this.get("width"));
        _yuitest_coverline("build/axis/axis.js", 1769);
cb.setStyle("height", this.get("height"));
        _yuitest_coverline("build/axis/axis.js", 1770);
if((hor && attrName === "width") || (vert && attrName === "height"))
        {
            _yuitest_coverline("build/axis/axis.js", 1772);
this._drawAxis();
        }
    },

    /**
     * Maps key values to classes containing layout algorithms
     *
     * @property _layoutClasses
     * @type Object
     * @private
     */
    _layoutClasses:
    {
        top : TopAxisLayout,
        bottom: BottomAxisLayout,
        left: LeftAxisLayout,
        right : RightAxisLayout
    },

    /**
     * Draws a line segment between 2 points
     *
     * @method drawLine
     * @param {Object} startPoint x and y coordinates for the start point of the line segment
     * @param {Object} endPoint x and y coordinates for the for the end point of the line segment
     * @param {Object} line styles (weight, color and alpha to be applied to the line segment)
     * @private
     */
    drawLine: function(path, startPoint, endPoint)
    {
        _yuitest_coverfunc("build/axis/axis.js", "drawLine", 1800);
_yuitest_coverline("build/axis/axis.js", 1802);
path.moveTo(startPoint.x, startPoint.y);
        _yuitest_coverline("build/axis/axis.js", 1803);
path.lineTo(endPoint.x, endPoint.y);
    },

    /**
     * Generates the properties necessary for rotating and positioning a text field.
     *
     * @method _getTextRotationProps
     * @param {Object} styles properties for the text field
     * @return Object
     * @private
     */
    _getTextRotationProps: function(styles)
    {
        _yuitest_coverfunc("build/axis/axis.js", "_getTextRotationProps", 1814);
_yuitest_coverline("build/axis/axis.js", 1816);
if(styles.rotation === undefined)
        {
            _yuitest_coverline("build/axis/axis.js", 1818);
switch(this.get("position"))
            {
                case "left" :
                    _yuitest_coverline("build/axis/axis.js", 1821);
styles.rotation = -90;
                _yuitest_coverline("build/axis/axis.js", 1822);
break;
                case "right" :
                    _yuitest_coverline("build/axis/axis.js", 1824);
styles.rotation = 90;
                _yuitest_coverline("build/axis/axis.js", 1825);
break;
                default :
                    _yuitest_coverline("build/axis/axis.js", 1827);
styles.rotation = 0;
                _yuitest_coverline("build/axis/axis.js", 1828);
break;
            }
        }
        _yuitest_coverline("build/axis/axis.js", 1831);
var rot =  Math.min(90, Math.max(-90, styles.rotation)),
            absRot = Math.abs(rot),
            radCon = Math.PI/180,
            sinRadians = parseFloat(parseFloat(Math.sin(absRot * radCon)).toFixed(8)),
            cosRadians = parseFloat(parseFloat(Math.cos(absRot * radCon)).toFixed(8));
        _yuitest_coverline("build/axis/axis.js", 1836);
return {
            rot: rot,
            absRot: absRot,
            radCon: radCon,
            sinRadians: sinRadians,
            cosRadians: cosRadians,
            textAlpha: styles.alpha
        };
    },

    /**
     * Draws an axis.
     *
     * @method _drawAxis
     * @private
     */
    _drawAxis: function ()
    {
        _yuitest_coverfunc("build/axis/axis.js", "_drawAxis", 1852);
_yuitest_coverline("build/axis/axis.js", 1854);
if(this._drawing)
        {
            _yuitest_coverline("build/axis/axis.js", 1856);
this._callLater = true;
            _yuitest_coverline("build/axis/axis.js", 1857);
return;
        }
        _yuitest_coverline("build/axis/axis.js", 1859);
this._drawing = true;
        _yuitest_coverline("build/axis/axis.js", 1860);
this._callLater = false;
        _yuitest_coverline("build/axis/axis.js", 1861);
if(this._layout)
        {
            _yuitest_coverline("build/axis/axis.js", 1863);
var styles = this.get("styles"),
                line = styles.line,
                labelStyles = styles.label,
                majorTickStyles = styles.majorTicks,
                drawTicks = majorTickStyles.display !== "none",
                tickPoint,
                majorUnit = styles.majorUnit,
                len,
                majorUnitDistance,
                i = 0,
                layout = this._layout,
                layoutLength,
                lineStart,
                label,
                labelWidth,
                labelHeight,
                labelFunction = this.get("labelFunction"),
                labelFunctionScope = this.get("labelFunctionScope"),
                labelFormat = this.get("labelFormat"),
                graphic = this.get("graphic"),
                path = this.get("path"),
                tickPath,
                explicitlySized,
                position = this.get("position"),
                direction = (position === "left" || position === "right") ? "vertical" : "horizontal";
            _yuitest_coverline("build/axis/axis.js", 1888);
this._labelWidths = [];
            _yuitest_coverline("build/axis/axis.js", 1889);
this._labelHeights = [];
            _yuitest_coverline("build/axis/axis.js", 1890);
graphic.set("autoDraw", false);
            _yuitest_coverline("build/axis/axis.js", 1891);
path.clear();
            _yuitest_coverline("build/axis/axis.js", 1892);
path.set("stroke", {
                weight: line.weight,
                color: line.color,
                opacity: line.alpha
            });
            _yuitest_coverline("build/axis/axis.js", 1897);
this._labelRotationProps = this._getTextRotationProps(labelStyles);
            _yuitest_coverline("build/axis/axis.js", 1898);
this._labelRotationProps.transformOrigin = layout._getTransformOrigin(this._labelRotationProps.rot);
            _yuitest_coverline("build/axis/axis.js", 1899);
layout.setTickOffsets.apply(this);
            _yuitest_coverline("build/axis/axis.js", 1900);
layoutLength = this.getLength();
            _yuitest_coverline("build/axis/axis.js", 1901);
lineStart = layout.getLineStart.apply(this);
            _yuitest_coverline("build/axis/axis.js", 1902);
len = this.getTotalMajorUnits(majorUnit);
            _yuitest_coverline("build/axis/axis.js", 1903);
majorUnitDistance = this.getMajorUnitDistance(len, layoutLength, majorUnit);
            _yuitest_coverline("build/axis/axis.js", 1904);
this.set("edgeOffset", this.getEdgeOffset(len, layoutLength) * 0.5);
            _yuitest_coverline("build/axis/axis.js", 1905);
if(len < 1)
            {
                _yuitest_coverline("build/axis/axis.js", 1907);
this._clearLabelCache();
            }
            else
            {
                _yuitest_coverline("build/axis/axis.js", 1911);
tickPoint = this.getFirstPoint(lineStart);
                _yuitest_coverline("build/axis/axis.js", 1912);
this.drawLine(path, lineStart, this.getLineEnd(tickPoint));
                _yuitest_coverline("build/axis/axis.js", 1913);
if(drawTicks)
                {
                    _yuitest_coverline("build/axis/axis.js", 1915);
tickPath = this.get("tickPath");
                    _yuitest_coverline("build/axis/axis.js", 1916);
tickPath.clear();
                    _yuitest_coverline("build/axis/axis.js", 1917);
tickPath.set("stroke", {
                        weight: majorTickStyles.weight,
                        color: majorTickStyles.color,
                        opacity: majorTickStyles.alpha
                    });
                   _yuitest_coverline("build/axis/axis.js", 1922);
layout.drawTick.apply(this, [tickPath, tickPoint, majorTickStyles]);
                }
                _yuitest_coverline("build/axis/axis.js", 1924);
this._createLabelCache();
                _yuitest_coverline("build/axis/axis.js", 1925);
this._tickPoints = [];
                _yuitest_coverline("build/axis/axis.js", 1926);
this._maxLabelSize = 0;
                _yuitest_coverline("build/axis/axis.js", 1927);
this._totalTitleSize = 0;
                _yuitest_coverline("build/axis/axis.js", 1928);
this._titleSize = 0;
                _yuitest_coverline("build/axis/axis.js", 1929);
this._setTitle();
                _yuitest_coverline("build/axis/axis.js", 1930);
explicitlySized = layout.getExplicitlySized.apply(this, [styles]);
                _yuitest_coverline("build/axis/axis.js", 1931);
for(; i < len; ++i)
                {
                    _yuitest_coverline("build/axis/axis.js", 1933);
if(drawTicks)
                    {
                        _yuitest_coverline("build/axis/axis.js", 1935);
layout.drawTick.apply(this, [tickPath, tickPoint, majorTickStyles]);
                    }
                    _yuitest_coverline("build/axis/axis.js", 1937);
position = this.getPosition(tickPoint);
                    _yuitest_coverline("build/axis/axis.js", 1938);
label = this.getLabel(tickPoint, labelStyles);
                    _yuitest_coverline("build/axis/axis.js", 1939);
this._labels.push(label);
                    _yuitest_coverline("build/axis/axis.js", 1940);
this._tickPoints.push({x:tickPoint.x, y:tickPoint.y});
                    _yuitest_coverline("build/axis/axis.js", 1941);
this.get("appendLabelFunction")(
                        label,
                        labelFunction.apply(
                            labelFunctionScope,
                            [this._getLabelByIndex(i, len, direction), labelFormat]
                        )
                    );
                    _yuitest_coverline("build/axis/axis.js", 1948);
labelWidth = Math.round(label.offsetWidth);
                    _yuitest_coverline("build/axis/axis.js", 1949);
labelHeight = Math.round(label.offsetHeight);
                    _yuitest_coverline("build/axis/axis.js", 1950);
if(!explicitlySized)
                    {
                        _yuitest_coverline("build/axis/axis.js", 1952);
this._layout.updateMaxLabelSize.apply(this, [labelWidth, labelHeight]);
                    }
                    _yuitest_coverline("build/axis/axis.js", 1954);
this._labelWidths.push(labelWidth);
                    _yuitest_coverline("build/axis/axis.js", 1955);
this._labelHeights.push(labelHeight);
                    _yuitest_coverline("build/axis/axis.js", 1956);
tickPoint = this.getNextPoint(tickPoint, majorUnitDistance);
                }
                _yuitest_coverline("build/axis/axis.js", 1958);
this._clearLabelCache();
                _yuitest_coverline("build/axis/axis.js", 1959);
if(this.get("overlapGraph"))
                {
                   _yuitest_coverline("build/axis/axis.js", 1961);
layout.offsetNodeForTick.apply(this, [this.get("contentBox")]);
                }
                _yuitest_coverline("build/axis/axis.js", 1963);
layout.setCalculatedSize.apply(this);
                _yuitest_coverline("build/axis/axis.js", 1964);
if(this._titleTextField)
                {
                    _yuitest_coverline("build/axis/axis.js", 1966);
this._layout.positionTitle.apply(this, [this._titleTextField]);
                }
                _yuitest_coverline("build/axis/axis.js", 1968);
for(i = 0; i < len; ++i)
                {
                    _yuitest_coverline("build/axis/axis.js", 1970);
layout.positionLabel.apply(this, [this.get("labels")[i], this._tickPoints[i], styles, i]);
                }
            }
        }
        _yuitest_coverline("build/axis/axis.js", 1974);
this._drawing = false;
        _yuitest_coverline("build/axis/axis.js", 1975);
if(this._callLater)
        {
            _yuitest_coverline("build/axis/axis.js", 1977);
this._drawAxis();
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 1981);
this._updatePathElement();
            _yuitest_coverline("build/axis/axis.js", 1982);
this.fire("axisRendered");
        }
    },

    /**
     * Calculates and sets the total size of a title.
     *
     * @method _setTotalTitleSize
     * @param {Object} styles Properties for the title field.
     * @private
     */
    _setTotalTitleSize: function(styles)
    {
        _yuitest_coverfunc("build/axis/axis.js", "_setTotalTitleSize", 1993);
_yuitest_coverline("build/axis/axis.js", 1995);
var title = this._titleTextField,
            w = title.offsetWidth,
            h = title.offsetHeight,
            rot = this._titleRotationProps.rot,
            bounds,
            size,
            margin = styles.margin,
            position = this.get("position"),
            matrix = new Y.Matrix();
        _yuitest_coverline("build/axis/axis.js", 2004);
matrix.rotate(rot);
        _yuitest_coverline("build/axis/axis.js", 2005);
bounds = matrix.getContentRect(w, h);
        _yuitest_coverline("build/axis/axis.js", 2006);
if(position === "left" || position === "right")
        {
            _yuitest_coverline("build/axis/axis.js", 2008);
size = bounds.right - bounds.left;
            _yuitest_coverline("build/axis/axis.js", 2009);
if(margin)
            {
                _yuitest_coverline("build/axis/axis.js", 2011);
size += margin.left + margin.right;
            }
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 2016);
size = bounds.bottom - bounds.top;
            _yuitest_coverline("build/axis/axis.js", 2017);
if(margin)
            {
                _yuitest_coverline("build/axis/axis.js", 2019);
size += margin.top + margin.bottom;
            }
        }
        _yuitest_coverline("build/axis/axis.js", 2022);
this._titleBounds = bounds;
        _yuitest_coverline("build/axis/axis.js", 2023);
this._totalTitleSize = size;
    },

    /**
     *  Updates path.
     *
     *  @method _updatePathElement
     *  @private
     */
    _updatePathElement: function()
    {
        _yuitest_coverfunc("build/axis/axis.js", "_updatePathElement", 2032);
_yuitest_coverline("build/axis/axis.js", 2034);
var path = this._path,
            tickPath = this._tickPath,
            redrawGraphic = false,
            graphic = this.get("graphic");
        _yuitest_coverline("build/axis/axis.js", 2038);
if(path)
        {
            _yuitest_coverline("build/axis/axis.js", 2040);
redrawGraphic = true;
            _yuitest_coverline("build/axis/axis.js", 2041);
path.end();
        }
        _yuitest_coverline("build/axis/axis.js", 2043);
if(tickPath)
        {
            _yuitest_coverline("build/axis/axis.js", 2045);
redrawGraphic = true;
            _yuitest_coverline("build/axis/axis.js", 2046);
tickPath.end();
        }
        _yuitest_coverline("build/axis/axis.js", 2048);
if(redrawGraphic)
        {
            _yuitest_coverline("build/axis/axis.js", 2050);
graphic._redraw();
        }
    },

    /**
     * Updates the content and style properties for a title field.
     *
     * @method _updateTitle
     * @private
     */
    _setTitle: function()
    {
        _yuitest_coverfunc("build/axis/axis.js", "_setTitle", 2060);
_yuitest_coverline("build/axis/axis.js", 2062);
var i,
            styles,
            customStyles,
            title = this.get("title"),
            titleTextField = this._titleTextField,
            parentNode;
        _yuitest_coverline("build/axis/axis.js", 2068);
if(title !== null && title !== undefined)
        {
            _yuitest_coverline("build/axis/axis.js", 2070);
customStyles = {
                    rotation: "rotation",
                    margin: "margin",
                    alpha: "alpha"
            };
            _yuitest_coverline("build/axis/axis.js", 2075);
styles = this.get("styles").title;
            _yuitest_coverline("build/axis/axis.js", 2076);
if(!titleTextField)
            {
                _yuitest_coverline("build/axis/axis.js", 2078);
titleTextField = DOCUMENT.createElement('span');
                _yuitest_coverline("build/axis/axis.js", 2079);
titleTextField.style.display = "block";
                _yuitest_coverline("build/axis/axis.js", 2080);
titleTextField.style.whiteSpace = "nowrap";
                _yuitest_coverline("build/axis/axis.js", 2081);
titleTextField.setAttribute("class", "axisTitle");
                _yuitest_coverline("build/axis/axis.js", 2082);
this.get("contentBox").append(titleTextField);
            }
            else {_yuitest_coverline("build/axis/axis.js", 2084);
if(!DOCUMENT.createElementNS)
            {
                _yuitest_coverline("build/axis/axis.js", 2086);
if(titleTextField.style.filter)
                {
                    _yuitest_coverline("build/axis/axis.js", 2088);
titleTextField.style.filter = null;
                }
            }}
            _yuitest_coverline("build/axis/axis.js", 2091);
titleTextField.style.position = "absolute";
            _yuitest_coverline("build/axis/axis.js", 2092);
for(i in styles)
            {
                _yuitest_coverline("build/axis/axis.js", 2094);
if(styles.hasOwnProperty(i) && !customStyles.hasOwnProperty(i))
                {
                    _yuitest_coverline("build/axis/axis.js", 2096);
titleTextField.style[i] = styles[i];
                }
            }
            _yuitest_coverline("build/axis/axis.js", 2099);
this.get("appendTitleFunction")(titleTextField, title);
            _yuitest_coverline("build/axis/axis.js", 2100);
this._titleTextField = titleTextField;
            _yuitest_coverline("build/axis/axis.js", 2101);
this._titleRotationProps = this._getTextRotationProps(styles);
            _yuitest_coverline("build/axis/axis.js", 2102);
this._setTotalTitleSize(styles);
        }
        else {_yuitest_coverline("build/axis/axis.js", 2104);
if(titleTextField)
        {
            _yuitest_coverline("build/axis/axis.js", 2106);
parentNode = titleTextField.parentNode;
            _yuitest_coverline("build/axis/axis.js", 2107);
if(parentNode)
            {
                _yuitest_coverline("build/axis/axis.js", 2109);
parentNode.removeChild(titleTextField);
            }
            _yuitest_coverline("build/axis/axis.js", 2111);
this._titleTextField = null;
            _yuitest_coverline("build/axis/axis.js", 2112);
this._totalTitleSize = 0;
        }}
    },

    /**
     * Creates or updates an axis label.
     *
     * @method getLabel
     * @param {Object} pt x and y coordinates for the label
     * @param {Object} styles styles applied to label
     * @return HTMLElement
     * @private
     */
    getLabel: function(pt, styles)
    {
        _yuitest_coverfunc("build/axis/axis.js", "getLabel", 2125);
_yuitest_coverline("build/axis/axis.js", 2127);
var i,
            label,
            labelCache = this._labelCache,
            customStyles = {
                rotation: "rotation",
                margin: "margin",
                alpha: "alpha"
            };
        _yuitest_coverline("build/axis/axis.js", 2135);
if(labelCache && labelCache.length > 0)
        {
            _yuitest_coverline("build/axis/axis.js", 2137);
label = labelCache.shift();
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 2141);
label = DOCUMENT.createElement("span");
            _yuitest_coverline("build/axis/axis.js", 2142);
label.className = Y.Lang.trim([label.className, "axisLabel"].join(' '));
            _yuitest_coverline("build/axis/axis.js", 2143);
this.get("contentBox").append(label);
        }
        _yuitest_coverline("build/axis/axis.js", 2145);
if(!DOCUMENT.createElementNS)
        {
            _yuitest_coverline("build/axis/axis.js", 2147);
if(label.style.filter)
            {
                _yuitest_coverline("build/axis/axis.js", 2149);
label.style.filter = null;
            }
        }
        _yuitest_coverline("build/axis/axis.js", 2152);
label.style.display = "block";
        _yuitest_coverline("build/axis/axis.js", 2153);
label.style.whiteSpace = "nowrap";
        _yuitest_coverline("build/axis/axis.js", 2154);
label.style.position = "absolute";
        _yuitest_coverline("build/axis/axis.js", 2155);
for(i in styles)
        {
            _yuitest_coverline("build/axis/axis.js", 2157);
if(styles.hasOwnProperty(i) && !customStyles.hasOwnProperty(i))
            {
                _yuitest_coverline("build/axis/axis.js", 2159);
label.style[i] = styles[i];
            }
        }
        _yuitest_coverline("build/axis/axis.js", 2162);
return label;
    },

    /**
     * Creates a cache of labels that can be re-used when the axis redraws.
     *
     * @method _createLabelCache
     * @private
     */
    _createLabelCache: function()
    {
        _yuitest_coverfunc("build/axis/axis.js", "_createLabelCache", 2171);
_yuitest_coverline("build/axis/axis.js", 2173);
if(this._labels)
        {
            _yuitest_coverline("build/axis/axis.js", 2175);
while(this._labels.length > 0)
            {
                _yuitest_coverline("build/axis/axis.js", 2177);
this._labelCache.push(this._labels.shift());
            }
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 2182);
this._clearLabelCache();
        }
        _yuitest_coverline("build/axis/axis.js", 2184);
this._labels = [];
    },

    /**
     * Removes axis labels from the dom and clears the label cache.
     *
     * @method _clearLabelCache
     * @private
     */
    _clearLabelCache: function()
    {
        _yuitest_coverfunc("build/axis/axis.js", "_clearLabelCache", 2193);
_yuitest_coverline("build/axis/axis.js", 2195);
if(this._labelCache)
        {
            _yuitest_coverline("build/axis/axis.js", 2197);
var len = this._labelCache.length,
                i = 0,
                label;
            _yuitest_coverline("build/axis/axis.js", 2200);
for(; i < len; ++i)
            {
                _yuitest_coverline("build/axis/axis.js", 2202);
label = this._labelCache[i];
                _yuitest_coverline("build/axis/axis.js", 2203);
this._removeChildren(label);
                _yuitest_coverline("build/axis/axis.js", 2204);
Y.Event.purgeElement(label, true);
                _yuitest_coverline("build/axis/axis.js", 2205);
label.parentNode.removeChild(label);
            }
        }
        _yuitest_coverline("build/axis/axis.js", 2208);
this._labelCache = [];
    },

    /**
     * Gets the end point of an axis.
     *
     * @method getLineEnd
     * @return Object
     * @private
     */
    getLineEnd: function(pt)
    {
        _yuitest_coverfunc("build/axis/axis.js", "getLineEnd", 2218);
_yuitest_coverline("build/axis/axis.js", 2220);
var w = this.get("width"),
            h = this.get("height"),
            pos = this.get("position");
        _yuitest_coverline("build/axis/axis.js", 2223);
if(pos === "top" || pos === "bottom")
        {
            _yuitest_coverline("build/axis/axis.js", 2225);
return {x:w, y:pt.y};
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 2229);
return {x:pt.x, y:h};
        }
    },

    /**
     * Calcuates the width or height of an axis depending on its direction.
     *
     * @method getLength
     * @return Number
     * @private
     */
    getLength: function()
    {
        _yuitest_coverfunc("build/axis/axis.js", "getLength", 2240);
_yuitest_coverline("build/axis/axis.js", 2242);
var l,
            style = this.get("styles"),
            padding = style.padding,
            w = this.get("width"),
            h = this.get("height"),
            pos = this.get("position");
        _yuitest_coverline("build/axis/axis.js", 2248);
if(pos === "top" || pos === "bottom")
        {
            _yuitest_coverline("build/axis/axis.js", 2250);
l = w - (padding.left + padding.right);
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 2254);
l = h - (padding.top + padding.bottom);
        }
        _yuitest_coverline("build/axis/axis.js", 2256);
return l;
    },

    /**
     * Gets the position of the first point on an axis.
     *
     * @method getFirstPoint
     * @param {Object} pt Object containing x and y coordinates.
     * @return Object
     * @private
     */
    getFirstPoint:function(pt)
    {
        _yuitest_coverfunc("build/axis/axis.js", "getFirstPoint", 2267);
_yuitest_coverline("build/axis/axis.js", 2269);
var style = this.get("styles"),
            pos = this.get("position"),
            padding = style.padding,
            np = {x:pt.x, y:pt.y};
        _yuitest_coverline("build/axis/axis.js", 2273);
if(pos === "top" || pos === "bottom")
        {
            _yuitest_coverline("build/axis/axis.js", 2275);
np.x += padding.left + this.get("edgeOffset");
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 2279);
np.y += this.get("height") - (padding.top + this.get("edgeOffset"));
        }
        _yuitest_coverline("build/axis/axis.js", 2281);
return np;
    },

    /**
     * Gets the position of the next point on an axis.
     *
     * @method getNextPoint
     * @param {Object} point Object containing x and y coordinates.
     * @param {Number} majorUnitDistance Distance in pixels between ticks.
     * @return Object
     * @private
     */
    getNextPoint: function(point, majorUnitDistance)
    {
        _yuitest_coverfunc("build/axis/axis.js", "getNextPoint", 2293);
_yuitest_coverline("build/axis/axis.js", 2295);
var pos = this.get("position");
        _yuitest_coverline("build/axis/axis.js", 2296);
if(pos === "top" || pos === "bottom")
        {
            _yuitest_coverline("build/axis/axis.js", 2298);
point.x = point.x + majorUnitDistance;
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 2302);
point.y = point.y - majorUnitDistance;
        }
        _yuitest_coverline("build/axis/axis.js", 2304);
return point;
    },

    /**
     * Calculates the placement of last tick on an axis.
     *
     * @method getLastPoint
     * @return Object
     * @private
     */
    getLastPoint: function()
    {
        _yuitest_coverfunc("build/axis/axis.js", "getLastPoint", 2314);
_yuitest_coverline("build/axis/axis.js", 2316);
var style = this.get("styles"),
            padding = style.padding,
            w = this.get("width"),
            pos = this.get("position");
        _yuitest_coverline("build/axis/axis.js", 2320);
if(pos === "top" || pos === "bottom")
        {
            _yuitest_coverline("build/axis/axis.js", 2322);
return {x:w - padding.right, y:padding.top};
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 2326);
return {x:padding.left, y:padding.top};
        }
    },

    /**
     * Calculates position on the axis.
     *
     * @method getPosition
     * @param {Object} point contains x and y values
     * @private
     */
    getPosition: function(point)
    {
        _yuitest_coverfunc("build/axis/axis.js", "getPosition", 2337);
_yuitest_coverline("build/axis/axis.js", 2339);
var p,
            h = this.get("height"),
            style = this.get("styles"),
            padding = style.padding,
            pos = this.get("position"),
            dataType = this.get("dataType");
        _yuitest_coverline("build/axis/axis.js", 2345);
if(pos === "left" || pos === "right")
        {
            //Numeric data on a vertical axis is displayed from bottom to top.
            //Categorical and Timeline data is displayed from top to bottom.
            _yuitest_coverline("build/axis/axis.js", 2349);
if(dataType === "numeric")
            {
                _yuitest_coverline("build/axis/axis.js", 2351);
p = (h - (padding.top + padding.bottom)) - (point.y - padding.top);
            }
            else
            {
                _yuitest_coverline("build/axis/axis.js", 2355);
p = point.y - padding.top;
            }
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 2360);
p = point.x - padding.left;
        }
        _yuitest_coverline("build/axis/axis.js", 2362);
return p;
    },

    /**
     * Rotates and positions a text field.
     *
     * @method _rotate
     * @param {HTMLElement} label text field to rotate and position
     * @param {Object} props properties to be applied to the text field.
     * @private
     */
    _rotate: function(label, props)
    {
        _yuitest_coverfunc("build/axis/axis.js", "_rotate", 2373);
_yuitest_coverline("build/axis/axis.js", 2375);
var rot = props.rot,
            x = props.x,
            y = props.y,
            filterString,
            textAlpha,
            matrix = new Y.Matrix(),
            transformOrigin = props.transformOrigin || [0, 0],
            offsetRect;
        _yuitest_coverline("build/axis/axis.js", 2383);
if(DOCUMENT.createElementNS)
        {
            _yuitest_coverline("build/axis/axis.js", 2385);
matrix.translate(x, y);
            _yuitest_coverline("build/axis/axis.js", 2386);
matrix.rotate(rot);
            _yuitest_coverline("build/axis/axis.js", 2387);
Y_DOM.setStyle(label, "transformOrigin", (transformOrigin[0] * 100) + "% " + (transformOrigin[1] * 100) + "%");
            _yuitest_coverline("build/axis/axis.js", 2388);
Y_DOM.setStyle(label, "transform", matrix.toCSSText());
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 2392);
textAlpha = props.textAlpha;
            _yuitest_coverline("build/axis/axis.js", 2393);
if(Y_Lang.isNumber(textAlpha) && textAlpha < 1 && textAlpha > -1 && !isNaN(textAlpha))
            {
                _yuitest_coverline("build/axis/axis.js", 2395);
filterString = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + Math.round(textAlpha * 100) + ")";
            }
            _yuitest_coverline("build/axis/axis.js", 2397);
if(rot !== 0)
            {
                //ms filters kind of, sort of uses a transformOrigin of 0, 0.
                //we'll translate the difference to create a true 0, 0 origin.
                _yuitest_coverline("build/axis/axis.js", 2401);
matrix.rotate(rot);
                _yuitest_coverline("build/axis/axis.js", 2402);
offsetRect = matrix.getContentRect(props.labelWidth, props.labelHeight);
                _yuitest_coverline("build/axis/axis.js", 2403);
matrix.init();
                _yuitest_coverline("build/axis/axis.js", 2404);
matrix.translate(offsetRect.left, offsetRect.top);
                _yuitest_coverline("build/axis/axis.js", 2405);
matrix.translate(x, y);
                _yuitest_coverline("build/axis/axis.js", 2406);
this._simulateRotateWithTransformOrigin(matrix, rot, transformOrigin, props.labelWidth, props.labelHeight);
                _yuitest_coverline("build/axis/axis.js", 2407);
if(filterString)
                {
                    _yuitest_coverline("build/axis/axis.js", 2409);
filterString += " ";
                }
                else
                {
                    _yuitest_coverline("build/axis/axis.js", 2413);
filterString = "";
                }
                _yuitest_coverline("build/axis/axis.js", 2415);
filterString += matrix.toFilterText();
                _yuitest_coverline("build/axis/axis.js", 2416);
label.style.left = matrix.dx + "px";
                _yuitest_coverline("build/axis/axis.js", 2417);
label.style.top = matrix.dy + "px";
            }
            else
            {
                _yuitest_coverline("build/axis/axis.js", 2421);
label.style.left = x + "px";
                _yuitest_coverline("build/axis/axis.js", 2422);
label.style.top = y + "px";
            }
            _yuitest_coverline("build/axis/axis.js", 2424);
if(filterString)
            {
                _yuitest_coverline("build/axis/axis.js", 2426);
label.style.filter = filterString;
            }
        }
    },

    /**
     * Simulates a rotation with a specified transformOrigin.
     *
     * @method _simulateTransformOrigin
     * @param {Matrix} matrix Reference to a `Matrix` instance.
     * @param {Number} rot The rotation (in degrees) that will be performed on a matrix.
     * @param {Array} transformOrigin An array represeniting the origin in which to perform the transform. The first
     * index represents the x origin and the second index represents the y origin.
     * @param {Number} w The width of the object that will be transformed.
     * @param {Number} h The height of the object that will be transformed.
     * @private
     */
    _simulateRotateWithTransformOrigin: function(matrix, rot, transformOrigin, w, h)
    {
        _yuitest_coverfunc("build/axis/axis.js", "_simulateRotateWithTransformOrigin", 2443);
_yuitest_coverline("build/axis/axis.js", 2445);
var transformX = transformOrigin[0] * w,
            transformY = transformOrigin[1] * h;
        _yuitest_coverline("build/axis/axis.js", 2447);
transformX = !isNaN(transformX) ? transformX : 0;
        _yuitest_coverline("build/axis/axis.js", 2448);
transformY = !isNaN(transformY) ? transformY : 0;
        _yuitest_coverline("build/axis/axis.js", 2449);
matrix.translate(transformX, transformY);
        _yuitest_coverline("build/axis/axis.js", 2450);
matrix.rotate(rot);
        _yuitest_coverline("build/axis/axis.js", 2451);
matrix.translate(-transformX, -transformY);
    },

    /**
     * Returns the coordinates (top, right, bottom, left) for the bounding box of the last label.
     *
     * @method getMaxLabelBounds
     * @return Object
     */
    getMaxLabelBounds: function()
    {
        _yuitest_coverfunc("build/axis/axis.js", "getMaxLabelBounds", 2460);
_yuitest_coverline("build/axis/axis.js", 2462);
return this._getLabelBounds(this.getMaximumValue());
    },

    /**
     * Returns the coordinates (top, right, bottom, left) for the bounding box of the first label.
     *
     * @method getMinLabelBounds
     * @return Object
     */
    getMinLabelBounds: function()
    {
        _yuitest_coverfunc("build/axis/axis.js", "getMinLabelBounds", 2471);
_yuitest_coverline("build/axis/axis.js", 2473);
return this._getLabelBounds(this.getMinimumValue());
    },

    /**
     * Returns the coordinates (top, right, bottom, left) for the bounding box of a label.
     *
     * @method _getLabelBounds
     * @param {String} Value of the label
     * @return Object
     * @private
     */
    _getLabelBounds: function(val)
    {
        _yuitest_coverfunc("build/axis/axis.js", "_getLabelBounds", 2484);
_yuitest_coverline("build/axis/axis.js", 2486);
var layout = this._layout,
            labelStyles = this.get("styles").label,
            matrix = new Y.Matrix(),
            label,
            props = this._getTextRotationProps(labelStyles);
            _yuitest_coverline("build/axis/axis.js", 2491);
props.transformOrigin = layout._getTransformOrigin(props.rot);
        _yuitest_coverline("build/axis/axis.js", 2492);
label = this.getLabel({x: 0, y: 0}, labelStyles);
        _yuitest_coverline("build/axis/axis.js", 2493);
this.get("appendLabelFunction")(label, this.get("labelFunction").apply(this, [val, this.get("labelFormat")]));
        _yuitest_coverline("build/axis/axis.js", 2494);
props.labelWidth = label.offsetWidth;
        _yuitest_coverline("build/axis/axis.js", 2495);
props.labelHeight = label.offsetHeight;
        _yuitest_coverline("build/axis/axis.js", 2496);
this._removeChildren(label);
        _yuitest_coverline("build/axis/axis.js", 2497);
Y.Event.purgeElement(label, true);
        _yuitest_coverline("build/axis/axis.js", 2498);
label.parentNode.removeChild(label);
        _yuitest_coverline("build/axis/axis.js", 2499);
props.x = 0;
        _yuitest_coverline("build/axis/axis.js", 2500);
props.y = 0;
        _yuitest_coverline("build/axis/axis.js", 2501);
layout._setRotationCoords(props);
        _yuitest_coverline("build/axis/axis.js", 2502);
matrix.translate(props.x, props.y);
        _yuitest_coverline("build/axis/axis.js", 2503);
this._simulateRotateWithTransformOrigin(matrix, props.rot, props.transformOrigin, props.labelWidth, props.labelHeight);
        _yuitest_coverline("build/axis/axis.js", 2504);
return matrix.getContentRect(props.labelWidth, props.labelHeight);
    },

    /**
     * Removes all DOM elements from an HTML element. Used to clear out labels during detruction
     * phase.
     *
     * @method _removeChildren
     * @private
     */
    _removeChildren: function(node)
    {
        _yuitest_coverfunc("build/axis/axis.js", "_removeChildren", 2514);
_yuitest_coverline("build/axis/axis.js", 2516);
if(node.hasChildNodes())
        {
            _yuitest_coverline("build/axis/axis.js", 2518);
var child;
            _yuitest_coverline("build/axis/axis.js", 2519);
while(node.firstChild)
            {
                _yuitest_coverline("build/axis/axis.js", 2521);
child = node.firstChild;
                _yuitest_coverline("build/axis/axis.js", 2522);
this._removeChildren(child);
                _yuitest_coverline("build/axis/axis.js", 2523);
node.removeChild(child);
            }
        }
    },

    /**
     * Destructor implementation Axis class. Removes all labels and the Graphic instance from the widget.
     *
     * @method destructor
     * @protected
     */
    destructor: function()
    {
        _yuitest_coverfunc("build/axis/axis.js", "destructor", 2534);
_yuitest_coverline("build/axis/axis.js", 2536);
var cb = this.get("contentBox").getDOMNode(),
            labels = this.get("labels"),
            graphic = this.get("graphic"),
            label,
            len = labels ? labels.length : 0;
        _yuitest_coverline("build/axis/axis.js", 2541);
if(len > 0)
        {
            _yuitest_coverline("build/axis/axis.js", 2543);
while(labels.length > 0)
            {
                _yuitest_coverline("build/axis/axis.js", 2545);
label = labels.shift();
                _yuitest_coverline("build/axis/axis.js", 2546);
this._removeChildren(label);
                _yuitest_coverline("build/axis/axis.js", 2547);
cb.removeChild(label);
                _yuitest_coverline("build/axis/axis.js", 2548);
label = null;
            }
        }
        _yuitest_coverline("build/axis/axis.js", 2551);
if(graphic)
        {
            _yuitest_coverline("build/axis/axis.js", 2553);
graphic.destroy();
        }
    },

    /**
     * Length in pixels of largest text bounding box. Used to calculate the height of the axis.
     *
     * @property maxLabelSize
     * @type Number
     * @protected
     */
    _maxLabelSize: 0,

    /**
     * Updates the content of text field. This method writes a value into a text field using
     * `appendChild`. If the value is a `String`, it is converted to a `TextNode` first.
     *
     * @method _setText
     * @param label {HTMLElement} label to be updated
     * @param val {String} value with which to update the label
     * @private
     */
    _setText: function(textField, val)
    {
        _yuitest_coverfunc("build/axis/axis.js", "_setText", 2575);
_yuitest_coverline("build/axis/axis.js", 2577);
textField.innerHTML = "";
        _yuitest_coverline("build/axis/axis.js", 2578);
if(Y_Lang.isNumber(val))
        {
            _yuitest_coverline("build/axis/axis.js", 2580);
val = val + "";
        }
        else {_yuitest_coverline("build/axis/axis.js", 2582);
if(!val)
        {
            _yuitest_coverline("build/axis/axis.js", 2584);
val = "";
        }}
        _yuitest_coverline("build/axis/axis.js", 2586);
if(IS_STRING(val))
        {
            _yuitest_coverline("build/axis/axis.js", 2588);
val = DOCUMENT.createTextNode(val);
        }
        _yuitest_coverline("build/axis/axis.js", 2590);
textField.appendChild(val);
    },

    /**
     * Returns the total number of majorUnits that will appear on an axis.
     *
     * @method getTotalMajorUnits
     * @return Number
     */
    getTotalMajorUnits: function()
    {
        _yuitest_coverfunc("build/axis/axis.js", "getTotalMajorUnits", 2599);
_yuitest_coverline("build/axis/axis.js", 2601);
var units,
            majorUnit = this.get("styles").majorUnit,
            len = this.getLength();
        _yuitest_coverline("build/axis/axis.js", 2604);
if(majorUnit.determinant === "count")
        {
            _yuitest_coverline("build/axis/axis.js", 2606);
units = majorUnit.count;
        }
        else {_yuitest_coverline("build/axis/axis.js", 2608);
if(majorUnit.determinant === "distance")
        {
            _yuitest_coverline("build/axis/axis.js", 2610);
units = (len/majorUnit.distance) + 1;
        }}
        _yuitest_coverline("build/axis/axis.js", 2612);
return units;
    },

    /**
     * Returns the distance between major units on an axis.
     *
     * @method getMajorUnitDistance
     * @param {Number} len Number of ticks
     * @param {Number} uiLen Size of the axis.
     * @param {Object} majorUnit Hash of properties used to determine the majorUnit
     * @return Number
     */
    getMajorUnitDistance: function(len, uiLen, majorUnit)
    {
        _yuitest_coverfunc("build/axis/axis.js", "getMajorUnitDistance", 2624);
_yuitest_coverline("build/axis/axis.js", 2626);
var dist;
        _yuitest_coverline("build/axis/axis.js", 2627);
if(majorUnit.determinant === "count")
        {
            _yuitest_coverline("build/axis/axis.js", 2629);
if(!this.get("calculateEdgeOffset"))
            {
                _yuitest_coverline("build/axis/axis.js", 2631);
len = len - 1;
            }
            _yuitest_coverline("build/axis/axis.js", 2633);
dist = uiLen/len;
        }
        else {_yuitest_coverline("build/axis/axis.js", 2635);
if(majorUnit.determinant === "distance")
        {
            _yuitest_coverline("build/axis/axis.js", 2637);
dist = majorUnit.distance;
        }}
        _yuitest_coverline("build/axis/axis.js", 2639);
return dist;
    },

    /**
     * Checks to see if data extends beyond the range of the axis. If so,
     * that data will need to be hidden. This method is internal, temporary and subject
     * to removal in the future.
     *
     * @method _hasDataOverflow
     * @protected
     * @return Boolean
     */
    _hasDataOverflow: function()
    {
        _yuitest_coverfunc("build/axis/axis.js", "_hasDataOverflow", 2651);
_yuitest_coverline("build/axis/axis.js", 2653);
if(this.get("setMin") || this.get("setMax"))
        {
            _yuitest_coverline("build/axis/axis.js", 2655);
return true;
        }
        _yuitest_coverline("build/axis/axis.js", 2657);
return false;
    },

    /**
     * Returns a string corresponding to the first label on an
     * axis.
     *
     * @method getMinimumValue
     * @return String
     */
    getMinimumValue: function()
    {
        _yuitest_coverfunc("build/axis/axis.js", "getMinimumValue", 2667);
_yuitest_coverline("build/axis/axis.js", 2669);
return this.get("minimum");
    },

    /**
     * Returns a string corresponding to the last label on an
     * axis.
     *
     * @method getMaximumValue
     * @return String
     */
    getMaximumValue: function()
    {
        _yuitest_coverfunc("build/axis/axis.js", "getMaximumValue", 2679);
_yuitest_coverline("build/axis/axis.js", 2681);
return this.get("maximum");
    }
}, {
    ATTRS:
    {
        /**
         * When set, defines the width of a vertical axis instance. By default, vertical axes automatically size based
         * on their contents. When the width attribute is set, the axis will not calculate its width. When the width
         * attribute is explicitly set, axis labels will postion themselves off of the the inner edge of the axis and the
         * title, if present, will position itself off of the outer edge. If a specified width is less than the sum of
         * the axis' contents, excess content will overflow.
         *
         * @attribute width
         * @type Number
         */
        width: {
            lazyAdd: false,

            getter: function()
            {
                _yuitest_coverfunc("build/axis/axis.js", "getter", 2699);
_yuitest_coverline("build/axis/axis.js", 2701);
if(this._explicitWidth)
                {
                    _yuitest_coverline("build/axis/axis.js", 2703);
return this._explicitWidth;
                }
                _yuitest_coverline("build/axis/axis.js", 2705);
return this._calculatedWidth;
            },

            setter: function(val)
            {
                _yuitest_coverfunc("build/axis/axis.js", "setter", 2708);
_yuitest_coverline("build/axis/axis.js", 2710);
this._explicitWidth = val;
                _yuitest_coverline("build/axis/axis.js", 2711);
return val;
            }
        },

        /**
         * When set, defines the height of a horizontal axis instance. By default, horizontal axes automatically size based
         * on their contents. When the height attribute is set, the axis will not calculate its height. When the height
         * attribute is explicitly set, axis labels will postion themselves off of the the inner edge of the axis and the
         * title, if present, will position itself off of the outer edge. If a specified height is less than the sum of
         * the axis' contents, excess content will overflow.
         *
         * @attribute height
         * @type Number
         */
        height: {
            lazyAdd: false,

            getter: function()
            {
                _yuitest_coverfunc("build/axis/axis.js", "getter", 2728);
_yuitest_coverline("build/axis/axis.js", 2730);
if(this._explicitHeight)
                {
                    _yuitest_coverline("build/axis/axis.js", 2732);
return this._explicitHeight;
                }
                _yuitest_coverline("build/axis/axis.js", 2734);
return this._calculatedHeight;
            },

            setter: function(val)
            {
                _yuitest_coverfunc("build/axis/axis.js", "setter", 2737);
_yuitest_coverline("build/axis/axis.js", 2739);
this._explicitHeight = val;
                _yuitest_coverline("build/axis/axis.js", 2740);
return val;
            }
        },

        /**
         * Calculated value of an axis' width. By default, the value is used internally for vertical axes. If the `width`
         * attribute is explicitly set, this value will be ignored.
         *
         * @attribute calculatedWidth
         * @type Number
         * @private
         */
        calculatedWidth: {
            getter: function()
            {
                _yuitest_coverfunc("build/axis/axis.js", "getter", 2753);
_yuitest_coverline("build/axis/axis.js", 2755);
return this._calculatedWidth;
            },

            setter: function(val)
            {
                _yuitest_coverfunc("build/axis/axis.js", "setter", 2758);
_yuitest_coverline("build/axis/axis.js", 2760);
this._calculatedWidth = val;
                _yuitest_coverline("build/axis/axis.js", 2761);
return val;
            }
        },

        /**
         * Calculated value of an axis' height. By default, the value is used internally for horizontal axes. If the `height`
         * attribute is explicitly set, this value will be ignored.
         *
         * @attribute calculatedHeight
         * @type Number
         * @private
         */
        calculatedHeight: {
            getter: function()
            {
                _yuitest_coverfunc("build/axis/axis.js", "getter", 2774);
_yuitest_coverline("build/axis/axis.js", 2776);
return this._calculatedHeight;
            },

            setter: function(val)
            {
                _yuitest_coverfunc("build/axis/axis.js", "setter", 2779);
_yuitest_coverline("build/axis/axis.js", 2781);
this._calculatedHeight = val;
                _yuitest_coverline("build/axis/axis.js", 2782);
return val;
            }
        },

        /**
         * Difference betweend the first/last tick and edge of axis.
         *
         * @attribute edgeOffset
         * @type Number
         * @protected
         */
        edgeOffset:
        {
            value: 0
        },

        /**
         * The graphic in which the axis line and ticks will be rendered.
         *
         * @attribute graphic
         * @type Graphic
         */
        graphic: {},

        /**
         *  @attribute path
         *  @type Shape
         *  @readOnly
         *  @private
         */
        path: {
            readOnly: true,

            getter: function()
            {
                _yuitest_coverfunc("build/axis/axis.js", "getter", 2815);
_yuitest_coverline("build/axis/axis.js", 2817);
if(!this._path)
                {
                    _yuitest_coverline("build/axis/axis.js", 2819);
var graphic = this.get("graphic");
                    _yuitest_coverline("build/axis/axis.js", 2820);
if(graphic)
                    {
                        _yuitest_coverline("build/axis/axis.js", 2822);
this._path = graphic.addShape({type:"path"});
                    }
                }
                _yuitest_coverline("build/axis/axis.js", 2825);
return this._path;
            }
        },

        /**
         *  @attribute tickPath
         *  @type Shape
         *  @readOnly
         *  @private
         */
        tickPath: {
            readOnly: true,

            getter: function()
            {
                _yuitest_coverfunc("build/axis/axis.js", "getter", 2838);
_yuitest_coverline("build/axis/axis.js", 2840);
if(!this._tickPath)
                {
                    _yuitest_coverline("build/axis/axis.js", 2842);
var graphic = this.get("graphic");
                    _yuitest_coverline("build/axis/axis.js", 2843);
if(graphic)
                    {
                        _yuitest_coverline("build/axis/axis.js", 2845);
this._tickPath = graphic.addShape({type:"path"});
                    }
                }
                _yuitest_coverline("build/axis/axis.js", 2848);
return this._tickPath;
            }
        },

        /**
         * Contains the contents of the axis.
         *
         * @attribute node
         * @type HTMLElement
         */
        node: {},

        /**
         * Direction of the axis.
         *
         * @attribute position
         * @type String
         */
        position: {
            lazyAdd: false,

            setter: function(val)
            {
                _yuitest_coverfunc("build/axis/axis.js", "setter", 2869);
_yuitest_coverline("build/axis/axis.js", 2871);
var LayoutClass = this._layoutClasses[val];
                _yuitest_coverline("build/axis/axis.js", 2872);
if(val && val !== "none")
                {
                    _yuitest_coverline("build/axis/axis.js", 2874);
this._layout = new LayoutClass();
                }
                _yuitest_coverline("build/axis/axis.js", 2876);
return val;
            }
        },

        /**
         * Distance determined by the tick styles used to calculate the distance between the axis
         * line in relation to the top of the axis.
         *
         * @attribute topTickOffset
         * @type Number
         */
        topTickOffset: {
            value: 0
        },

        /**
         * Distance determined by the tick styles used to calculate the distance between the axis
         * line in relation to the bottom of the axis.
         *
         * @attribute bottomTickOffset
         * @type Number
         */
        bottomTickOffset: {
            value: 0
        },

        /**
         * Distance determined by the tick styles used to calculate the distance between the axis
         * line in relation to the left of the axis.
         *
         * @attribute leftTickOffset
         * @type Number
         */
        leftTickOffset: {
            value: 0
        },

        /**
         * Distance determined by the tick styles used to calculate the distance between the axis
         * line in relation to the right side of the axis.
         *
         * @attribute rightTickOffset
         * @type Number
         */
        rightTickOffset: {
            value: 0
        },

        /**
         * Collection of labels used to render the axis.
         *
         * @attribute labels
         * @type Array
         */
        labels: {
            readOnly: true,
            getter: function()
            {
                _yuitest_coverfunc("build/axis/axis.js", "getter", 2932);
_yuitest_coverline("build/axis/axis.js", 2934);
return this._labels;
            }
        },

        /**
         * Collection of points used for placement of labels and ticks along the axis.
         *
         * @attribute tickPoints
         * @type Array
         */
        tickPoints: {
            readOnly: true,

            getter: function()
            {
                _yuitest_coverfunc("build/axis/axis.js", "getter", 2947);
_yuitest_coverline("build/axis/axis.js", 2949);
if(this.get("position") === "none")
                {
                    _yuitest_coverline("build/axis/axis.js", 2951);
return this.get("styles").majorUnit.count;
                }
                _yuitest_coverline("build/axis/axis.js", 2953);
return this._tickPoints;
            }
        },

        /**
         * Indicates whether the axis overlaps the graph. If an axis is the inner most axis on a given
         * position and the tick position is inside or cross, the axis will need to overlap the graph.
         *
         * @attribute overlapGraph
         * @type Boolean
         */
        overlapGraph: {
            value:true,

            validator: function(val)
            {
                _yuitest_coverfunc("build/axis/axis.js", "validator", 2967);
_yuitest_coverline("build/axis/axis.js", 2969);
return Y_Lang.isBoolean(val);
            }
        },

        /**
         * Length in pixels of largest text bounding box. Used to calculate the height of the axis.
         *
         * @attribute maxLabelSize
         * @type Number
         * @protected
         */
        maxLabelSize: {
            getter: function()
            {
                _yuitest_coverfunc("build/axis/axis.js", "getter", 2981);
_yuitest_coverline("build/axis/axis.js", 2983);
return this._maxLabelSize;
            },

            setter: function(val)
            {
                _yuitest_coverfunc("build/axis/axis.js", "setter", 2986);
_yuitest_coverline("build/axis/axis.js", 2988);
this._maxLabelSize = val;
                _yuitest_coverline("build/axis/axis.js", 2989);
return val;
            }
        },

        /**
         *  Title for the axis. When specified, the title will display. The position of the title is determined by the axis position.
         *  <dl>
         *      <dt>top</dt><dd>Appears above the axis and it labels. The default rotation is 0.</dd>
         *      <dt>right</dt><dd>Appears to the right of the axis and its labels. The default rotation is 90.</dd>
         *      <dt>bottom</dt><dd>Appears below the axis and its labels. The default rotation is 0.</dd>
         *      <dt>left</dt><dd>Appears to the left of the axis and its labels. The default rotation is -90.</dd>
         *  </dl>
         *
         *  @attribute title
         *  @type String
         */
        title: {
            value: null
        },

        /**
         * Function used to append an axis value to an axis label. This function has the following signature:
         *  <dl>
         *      <dt>textField</dt><dd>The axis label to be appended. (`HTMLElement`)</dd>
         *      <dt>val</dt><dd>The value to attach to the text field. This method will accept an `HTMLELement`
         *      or a `String`. This method does not use (`HTMLElement` | `String`)</dd>
         *  </dl>
         * The default method appends a value to the `HTMLElement` using the `appendChild` method. If the given
         * value is a `String`, the method will convert the the value to a `textNode` before appending to the
         * `HTMLElement`. This method will not convert an `HTMLString` to an `HTMLElement`.
         *
         * @attribute appendLabelFunction
         * @type Function
         */
        appendLabelFunction: {
            valueFn: function()
            {
                _yuitest_coverfunc("build/axis/axis.js", "valueFn", 3024);
_yuitest_coverline("build/axis/axis.js", 3026);
return this._setText;
            }
        },

        /**
         * Function used to append a title value to the title object. This function has the following signature:
         *  <dl>
         *      <dt>textField</dt><dd>The title text field to be appended. (`HTMLElement`)</dd>
         *      <dt>val</dt><dd>The value to attach to the text field. This method will accept an `HTMLELement`
         *      or a `String`. This method does not use (`HTMLElement` | `String`)</dd>
         *  </dl>
         * The default method appends a value to the `HTMLElement` using the `appendChild` method. If the given
         * value is a `String`, the method will convert the the value to a `textNode` before appending to the
         * `HTMLElement` element. This method will not convert an `HTMLString` to an `HTMLElement`.
         *
         * @attribute appendTitleFunction
         * @type Function
         */
        appendTitleFunction: {
            valueFn: function()
            {
                _yuitest_coverfunc("build/axis/axis.js", "valueFn", 3045);
_yuitest_coverline("build/axis/axis.js", 3047);
return this._setText;
            }
        }

        /**
         * Style properties used for drawing an axis. This attribute is inherited from `Renderer`. Below are the default values:
         *  <dl>
         *      <dt>majorTicks</dt><dd>Properties used for drawing ticks.
         *          <dl>
         *              <dt>display</dt><dd>Position of the tick. Possible values are `inside`, `outside`, `cross` and `none`.
         *              The default value is `inside`.</dd>
         *              <dt>length</dt><dd>The length (in pixels) of the tick. The default value is 4.</dd>
         *              <dt>color</dt><dd>The color of the tick. The default value is `#dad8c9`</dd>
         *              <dt>weight</dt><dd>Number indicating the width of the tick. The default value is 1.</dd>
         *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the tick. The default value is 1.</dd>
         *          </dl>
         *      </dd>
         *      <dt>line</dt><dd>Properties used for drawing the axis line.
         *          <dl>
         *              <dt>weight</dt><dd>Number indicating the width of the axis line. The default value is 1.</dd>
         *              <dt>color</dt><dd>The color of the axis line. The default value is `#dad8c9`.</dd>
         *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the tick. The default value is 1.</dd>
         *          </dl>
         *      </dd>
         *      <dt>majorUnit</dt><dd>Properties used to calculate the `majorUnit` for the axis.
         *          <dl>
         *              <dt>determinant</dt><dd>The algorithm used for calculating distance between ticks. The possible options are
         *              `count` and `distance`. If the `determinant` is `count`, the axis ticks will spaced so that a specified number
         *              of ticks appear on the axis. If the `determinant` is `distance`, the axis ticks will spaced out according to
         *              the specified distance. The default value is `count`.</dd>
         *              <dt>count</dt><dd>Number of ticks to appear on the axis when the `determinant` is `count`. The default value is 11.</dd>
         *              <dt>distance</dt><dd>The distance (in pixels) between ticks when the `determinant` is `distance`. The default
         *              value is 75.</dd>
         *          </dl>
         *      </dd>
         *      <dt>label</dt><dd>Properties and styles applied to the axis labels.
         *          <dl>
         *              <dt>color</dt><dd>The color of the labels. The default value is `#808080`.</dd>
         *              <dt>alpha</dt><dd>Number between 0 and 1 indicating the opacity of the labels. The default value is 1.</dd>
         *              <dt>fontSize</dt><dd>The font-size of the labels. The default value is 85%</dd>
         *              <dt>rotation</dt><dd>The rotation, in degrees (between -90 and 90) of the labels. The default value is 0.</dd>
         *              <dt>margin</dt><dd>The distance between the label and the axis/tick. Depending on the position of the `Axis`,
         *              only one of the properties used.
         *                  <dl>
         *                      <dt>top</dt><dd>Pixel value used for an axis with a `position` of `bottom`. The default value is 4.</dd>
         *                      <dt>right</dt><dd>Pixel value used for an axis with a `position` of `left`. The default value is 4.</dd>
         *                      <dt>bottom</dt><dd>Pixel value used for an axis with a `position` of `top`. The default value is 4.</dd>
         *                      <dt>left</dt><dd>Pixel value used for an axis with a `position` of `right`. The default value is 4.</dd>
         *                  </dl>
         *              </dd>
         *          </dl>
         *      </dd>
         *  </dl>
         *
         * @attribute styles
         * @type Object
         */
    }
});
_yuitest_coverline("build/axis/axis.js", 3106);
Y.AxisType = Y.Base.create("baseAxis", Y.Axis, [], {});


}, '@VERSION@', {"requires": ["dom", "widget", "widget-position", "widget-stack", "graphics", "axis-base"]});
