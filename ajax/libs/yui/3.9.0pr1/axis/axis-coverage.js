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
_yuitest_coverage["build/axis/axis.js"].code=["YUI.add('axis', function (Y, NAME) {","","/**"," * Provides base functionality for drawing chart axes."," *"," * @module charts"," * @submodule axis"," */","var CONFIG = Y.config,","    WINDOW = CONFIG.win,","    DOCUMENT = CONFIG.doc,","    Y_Lang = Y.Lang,","    IS_STRING = Y_Lang.isString,","    Y_DOM = Y.DOM,","    LeftAxisLayout,","    RightAxisLayout,","    BottomAxisLayout,","    TopAxisLayout,","    _getClassName = Y.ClassNameManager.getClassName,","    SERIES_MARKER = _getClassName(\"seriesmarker\");","/**"," * Algorithmic strategy for rendering a left axis."," *"," * @class LeftAxisLayout"," * @constructor"," * @submodule axis"," */","LeftAxisLayout = function() {};","","LeftAxisLayout.prototype = {","    /**","     *  Default margins for text fields.","     *","     *  @private","     *  @method _getDefaultMargins","     *  @return Object","     */","    _getDefaultMargins: function()","    {","        return {","            top: 0,","            left: 0,","            right: 4,","            bottom: 0","        };","    },","","    /**","     * Sets the length of the tick on either side of the axis line.","     *","     * @method setTickOffset","     * @protected","     */","    setTickOffsets: function()","    {","        var host = this,","            majorTicks = host.get(\"styles\").majorTicks,","            tickLength = majorTicks.length,","            halfTick = tickLength * 0.5,","            display = majorTicks.display;","        host.set(\"topTickOffset\",  0);","        host.set(\"bottomTickOffset\",  0);","","        switch(display)","        {","            case \"inside\" :","                host.set(\"rightTickOffset\",  tickLength);","                host.set(\"leftTickOffset\", 0);","            break;","            case \"outside\" :","                host.set(\"rightTickOffset\", 0);","                host.set(\"leftTickOffset\",  tickLength);","            break;","            case \"cross\":","                host.set(\"rightTickOffset\", halfTick);","                host.set(\"leftTickOffset\",  halfTick);","            break;","            default:","                host.set(\"rightTickOffset\", 0);","                host.set(\"leftTickOffset\", 0);","            break;","        }","    },","","    /**","     * Draws a tick","     *","     * @method drawTick","     * @param {Path} path reference to the path `Path` element in which to draw the tick.","     * @param {Object} pt Point on the axis in which the tick will intersect.","     * @param {Object} tickStyle Hash of properties to apply to the tick.","     * @protected","     */","    drawTick: function(path, pt, tickStyles)","    {","        var host = this,","            style = host.get(\"styles\"),","            padding = style.padding,","            tickLength = tickStyles.length,","            start = {x:padding.left, y:pt.y},","            end = {x:tickLength + padding.left, y:pt.y};","        host.drawLine(path, start, end);","    },","","    /**","     * Calculates the coordinates for the first point on an axis.","     *","     * @method getLineStart","     * @return {Object}","     * @protected","     */","    getLineStart: function()","    {","        var style = this.get(\"styles\"),","            padding = style.padding,","            majorTicks = style.majorTicks,","            tickLength = majorTicks.length,","            display = majorTicks.display,","            pt = {x:padding.left, y:0};","        if(display === \"outside\")","        {","            pt.x += tickLength;","        }","        else if(display === \"cross\")","        {","            pt.x += tickLength/2;","        }","        return pt;","    },","","    /**","     * Calculates the point for a label.","     *","     * @method getLabelPoint","     * @param {Object} point Point on the axis in which the tick will intersect.","     * @return {Object}","     * @protected","     */","    getLabelPoint: function(point)","    {","        return {x:point.x - this.get(\"leftTickOffset\"), y:point.y};","    },","","    /**","     * Updates the value for the `maxLabelSize` for use in calculating total size.","     *","     * @method updateMaxLabelSize","     * @param {HTMLElement} label to measure","     * @protected","     */","    updateMaxLabelSize: function(labelWidth, labelHeight)","    {","        var host = this,","            props = this._labelRotationProps,","            rot = props.rot,","            absRot = props.absRot,","            sinRadians = props.sinRadians,","            cosRadians = props.cosRadians,","            max;","        if(rot === 0)","        {","            max = labelWidth;","        }","        else if(absRot === 90)","        {","            max = labelHeight;","        }","        else","        {","            max = (cosRadians * labelWidth) + (sinRadians * labelHeight);","        }","        host._maxLabelSize = Math.max(host._maxLabelSize, max);","    },","","    /**","     * Determines the available label width when the axis width has been explicitly set.","     *","     * @method getExplicitlySized","     * @return Boolean","     * @protected","     */","    getExplicitlySized: function(styles)","    {","        if(this._explicitWidth)","        {","            var host = this,","                w = host._explicitWidth,","                totalTitleSize = host._totalTitleSize,","                leftTickOffset = host.get(\"leftTickOffset\"),","                margin = styles.label.margin.right;","            host._maxLabelSize =  w - (leftTickOffset + margin + totalTitleSize);","            return true;","        }","        return false;","    },","","    /**","     * Rotate and position title.","     *","     * @method positionTitle","     * @param {HTMLElement} label to rotate position","     * @protected","     */","    positionTitle: function(label)","    {","        var host = this,","            bounds = host._titleBounds,","            margin = host.get(\"styles\").title.margin,","            props = host._titleRotationProps,","            w = bounds.right - bounds.left,","            labelWidth = label.offsetWidth,","            labelHeight = label.offsetHeight,","            x = (labelWidth * -0.5) + (w * 0.5),","            y = (host.get(\"height\") * 0.5) - (labelHeight * 0.5);","        props.labelWidth = labelWidth;","        props.labelHeight = labelHeight;","        if(margin && margin.left)","        {","            x += margin.left;","        }","        props.x = x;","        props.y = y;","        props.transformOrigin = [0.5, 0.5];","        host._rotate(label, props);","    },","","    /**","     * Rotate and position labels.","     *","     * @method positionLabel","     * @param {HTMLElement} label to rotate position","     * @param {Object} pt hash containing the x and y coordinates in which the label will be positioned","     * against.","     * @protected","     */","    positionLabel: function(label, pt, styles, i)","    {","        var host = this,","            tickOffset = host.get(\"leftTickOffset\"),","            totalTitleSize = this._totalTitleSize,","            leftOffset = pt.x + totalTitleSize - tickOffset,","            topOffset = pt.y,","            props = this._labelRotationProps,","            rot = props.rot,","            absRot = props.absRot,","            maxLabelSize = host._maxLabelSize,","            labelWidth = this._labelWidths[i],","            labelHeight = this._labelHeights[i];","        if(rot === 0)","        {","            leftOffset -= labelWidth;","            topOffset -= labelHeight * 0.5;","        }","        else if(rot === 90)","        {","            leftOffset -= labelWidth * 0.5;","        }","        else if(rot === -90)","        {","            leftOffset -= labelWidth * 0.5;","            topOffset -= labelHeight;","        }","        else","        {","            leftOffset -= labelWidth + (labelHeight * absRot/360);","            topOffset -= labelHeight * 0.5;","        }","        props.labelWidth = labelWidth;","        props.labelHeight = labelHeight;","        props.x = Math.round(maxLabelSize + leftOffset);","        props.y = Math.round(topOffset);","        this._rotate(label, props);","    },","","    /**","     * Adjusts the coordinates of an axis label based on the rotation.","     *","     * @method _setRotationCoords","     * @param {Object} props Coordinates, dimension and rotation properties of the label.","     * @protected","     */","    _setRotationCoords: function(props)","    {","        var rot = props.rot,","            absRot = props.absRot,","            leftOffset,","            topOffset,","            labelWidth = props.labelWidth,","            labelHeight = props.labelHeight;","        if(rot === 0)","        {","            leftOffset = labelWidth;","            topOffset = labelHeight * 0.5;","        }","        else if(rot === 90)","        {","            topOffset = 0;","            leftOffset = labelWidth * 0.5;","        }","        else if(rot === -90)","        {","            leftOffset = labelWidth * 0.5;","            topOffset = labelHeight;","        }","        else","        {","            leftOffset = labelWidth + (labelHeight * absRot/360);","            topOffset = labelHeight * 0.5;","        }","        props.x -= leftOffset;","        props.y -= topOffset;","    },","","    /**","     * Returns the transformOrigin to use for an axis label based on the position of the axis","     * and the rotation of the label.","     *","     * @method _getTransformOrigin","     * @param {Number} rot The rotation (in degrees) of the label.","     * @return Array","     * @protected","     */","    _getTransformOrigin: function(rot)","    {","        var transformOrigin;","        if(rot === 0)","        {","            transformOrigin = [0, 0];","        }","        else if(rot === 90)","        {","            transformOrigin = [0.5, 0];","        }","        else if(rot === -90)","        {","            transformOrigin = [0.5, 1];","        }","        else","        {","            transformOrigin = [1, 0.5];","        }","        return transformOrigin;","    },","","    /**","     * Adjust the position of the Axis widget's content box for internal axes.","     *","     * @method offsetNodeForTick","     * @param {Node} cb Content box of the Axis.","     * @protected","     */","    offsetNodeForTick: function(cb)","    {","    },","","    /**","     * Sets the width of the axis based on its contents.","     *","     * @method setCalculatedSize","     * @protected","     */","    setCalculatedSize: function()","    {","        var host = this,","            graphic = this.get(\"graphic\"),","            style = host.get(\"styles\"),","            label = style.label,","            tickOffset = host.get(\"leftTickOffset\"),","            max = host._maxLabelSize,","            totalTitleSize = this._totalTitleSize,","            ttl = Math.round(totalTitleSize + tickOffset + max + label.margin.right);","        if(this._explicitWidth)","        {","            ttl = this._explicitWidth;","        }","        this.set(\"calculatedWidth\", ttl);","        graphic.set(\"x\", ttl - tickOffset);","    }","};","","Y.LeftAxisLayout = LeftAxisLayout;","/**"," * RightAxisLayout contains algorithms for rendering a right axis."," *"," * @class RightAxisLayout"," * @constructor"," * @submodule axis"," */","RightAxisLayout = function(){};","","RightAxisLayout.prototype = {","    /**","     *  Default margins for text fields.","     *","     *  @private","     *  @method _getDefaultMargins","     *  @return Object","     */","    _getDefaultMargins: function()","    {","        return {","            top: 0,","            left: 4,","            right: 0,","            bottom: 0","        };","    },","","    /**","     * Sets the length of the tick on either side of the axis line.","     *","     * @method setTickOffset","     * @protected","     */","    setTickOffsets: function()","    {","        var host = this,","            majorTicks = host.get(\"styles\").majorTicks,","            tickLength = majorTicks.length,","            halfTick = tickLength * 0.5,","            display = majorTicks.display;","        host.set(\"topTickOffset\",  0);","        host.set(\"bottomTickOffset\",  0);","","        switch(display)","        {","            case \"inside\" :","                host.set(\"leftTickOffset\", tickLength);","                host.set(\"rightTickOffset\", 0);","            break;","            case \"outside\" :","                host.set(\"leftTickOffset\", 0);","                host.set(\"rightTickOffset\", tickLength);","            break;","            case \"cross\" :","                host.set(\"rightTickOffset\", halfTick);","                host.set(\"leftTickOffset\", halfTick);","            break;","            default:","                host.set(\"leftTickOffset\", 0);","                host.set(\"rightTickOffset\", 0);","            break;","        }","    },","","    /**","     * Draws a tick","     *","     * @method drawTick","     * @param {Path} path reference to the path `Path` element in which to draw the tick.","     * @param {Object} pt Point on the axis in which the tick will intersect.","     * @param {Object) tickStyle Hash of properties to apply to the tick.","     * @protected","     */","    drawTick: function(path, pt, tickStyles)","    {","        var host = this,","            style = host.get(\"styles\"),","            padding = style.padding,","            tickLength = tickStyles.length,","            start = {x:padding.left, y:pt.y},","            end = {x:padding.left + tickLength, y:pt.y};","        host.drawLine(path, start, end);","    },","","    /**","     * Calculates the coordinates for the first point on an axis.","     *","     * @method getLineStart","     * @return {Object}","     * @protected","     */","    getLineStart: function()","    {","        var host = this,","            style = host.get(\"styles\"),","            padding = style.padding,","            majorTicks = style.majorTicks,","            tickLength = majorTicks.length,","            display = majorTicks.display,","            pt = {x:padding.left, y:padding.top};","        if(display === \"inside\")","        {","            pt.x += tickLength;","        }","        else if(display === \"cross\")","        {","            pt.x += tickLength/2;","        }","        return pt;","    },","","    /**","     * Calculates the point for a label.","     *","     * @method getLabelPoint","     * @param {Object} point Point on the axis in which the tick will intersect.","     * @return {Object}","     * @protected","     */","    getLabelPoint: function(point)","    {","        return {x:point.x + this.get(\"rightTickOffset\"), y:point.y};","    },","","    /**","     * Updates the value for the `maxLabelSize` for use in calculating total size.","     *","     * @method updateMaxLabelSize","     * @param {HTMLElement} label to measure","     * @protected","     */","    updateMaxLabelSize: function(labelWidth, labelHeight)","    {","        var host = this,","            props = this._labelRotationProps,","            rot = props.rot,","            absRot = props.absRot,","            sinRadians = props.sinRadians,","            cosRadians = props.cosRadians,","            max;","        if(rot === 0)","        {","            max = labelWidth;","        }","        else if(absRot === 90)","        {","            max = labelHeight;","        }","        else","        {","            max = (cosRadians * labelWidth) + (sinRadians * labelHeight);","        }","        host._maxLabelSize = Math.max(host._maxLabelSize, max);","    },","","    /**","     * Determines the available label width when the axis width has been explicitly set.","     *","     * @method getExplicitlySized","     * @return Boolean","     * @protected","     */","    getExplicitlySized: function(styles)","    {","        if(this._explicitWidth)","        {","            var host = this,","                w = host._explicitWidth,","                totalTitleSize = this._totalTitleSize,","                rightTickOffset = host.get(\"rightTickOffset\"),","                margin = styles.label.margin.right;","            host._maxLabelSize =  w - (rightTickOffset + margin + totalTitleSize);","            return true;","        }","        return false;","    },","","    /**","     * Rotate and position title.","     *","     * @method positionTitle","     * @param {HTMLElement} label to rotate position","     * @protected","     */","    positionTitle: function(label)","    {","        var host = this,","            bounds = host._titleBounds,","            margin = host.get(\"styles\").title.margin,","            props = host._titleRotationProps,","            labelWidth = label.offsetWidth,","            labelHeight = label.offsetHeight,","            w = bounds.right - bounds.left,","            x = this.get(\"width\") - (labelWidth * 0.5) - (w * 0.5),","            y = (host.get(\"height\") * 0.5) - (labelHeight * 0.5);","        props.labelWidth = labelWidth;","        props.labelHeight = labelHeight;","        if(margin && margin.right)","        {","            x -= margin.left;","        }","        props.x = x;","        props.y = y;","        props.transformOrigin = [0.5, 0.5];","        host._rotate(label, props);","    },","","    /**","     * Rotate and position labels.","     *","     * @method positionLabel","     * @param {HTMLElement} label to rotate position","     * @param {Object} pt hash containing the x and y coordinates in which the label will be positioned","     * against.","     * @protected","     */","    positionLabel: function(label, pt, styles, i)","    {","        var host = this,","            tickOffset = host.get(\"rightTickOffset\"),","            labelStyles = styles.label,","            margin = 0,","            leftOffset = pt.x,","            topOffset = pt.y,","            props = this._labelRotationProps,","            rot = props.rot,","            absRot = props.absRot,","            labelWidth = this._labelWidths[i],","            labelHeight = this._labelHeights[i];","        if(labelStyles.margin && labelStyles.margin.left)","        {","            margin = labelStyles.margin.left;","        }","        if(rot === 0)","        {","            topOffset -= labelHeight * 0.5;","        }","        else if(rot === 90)","        {","            leftOffset -= labelWidth * 0.5;","            topOffset -= labelHeight;","        }","        else if(rot === -90)","        {","            leftOffset -= labelWidth * 0.5;","        }","        else","        {","            topOffset -= labelHeight * 0.5;","            leftOffset += labelHeight/2 * absRot/90;","        }","        leftOffset += margin;","        leftOffset += tickOffset;","        props.labelWidth = labelWidth;","        props.labelHeight = labelHeight;","        props.x = Math.round(leftOffset);","        props.y = Math.round(topOffset);","        this._rotate(label, props);","    },","","    /**","     * Adjusts the coordinates of an axis label based on the rotation.","     *","     * @method _setRotationCoords","     * @param {Object} props Coordinates, dimension and rotation properties of the label.","     * @protected","     */","    _setRotationCoords: function(props)","    {","        var rot = props.rot,","            absRot = props.absRot,","            leftOffset = 0,","            topOffset = 0,","            labelWidth = props.labelWidth,","            labelHeight = props.labelHeight;","        if(rot === 0)","        {","            topOffset = labelHeight * 0.5;","        }","        else if(rot === 90)","        {","            leftOffset = labelWidth * 0.5;","            topOffset = labelHeight;","        }","        else if(rot === -90)","        {","            leftOffset = labelWidth * 0.5;","        }","        else","        {","            topOffset = labelHeight * 0.5;","            leftOffset = labelHeight/2 * absRot/90;","        }","        props.x -= leftOffset;","        props.y -= topOffset;","    },","","    /**","     * Returns the transformOrigin to use for an axis label based on the position of the axis","     * and the rotation of the label.","     *","     * @method _getTransformOrigin","     * @param {Number} rot The rotation (in degrees) of the label.","     * @return Array","     * @protected","     */","    _getTransformOrigin: function(rot)","    {","        var transformOrigin;","        if(rot === 0)","        {","            transformOrigin = [0, 0];","        }","        else if(rot === 90)","        {","            transformOrigin = [0.5, 1];","        }","        else if(rot === -90)","        {","            transformOrigin = [0.5, 0];","        }","        else","        {","            transformOrigin = [0, 0.5];","        }","        return transformOrigin;","    },","","    /**","     * Adjusts position for inner ticks.","     *","     * @method offsetNodeForTick","     * @param {Node} cb contentBox of the axis","     * @protected","     */","    offsetNodeForTick: function(cb)","    {","        var host = this,","            tickOffset = host.get(\"leftTickOffset\"),","            offset = 0 - tickOffset;","        cb.setStyle(\"left\", offset);","    },","","    /**","     * Assigns a height based on the size of the contents.","     *","     * @method setCalculatedSize","     * @protected","     */","    setCalculatedSize: function()","    {","        var host = this,","            styles = host.get(\"styles\"),","            labelStyle = styles.label,","            totalTitleSize = this._totalTitleSize,","            ttl = Math.round(host.get(\"rightTickOffset\") + host._maxLabelSize + totalTitleSize + labelStyle.margin.left);","        if(this._explicitWidth)","        {","            ttl = this._explicitWidth;","        }","        host.set(\"calculatedWidth\", ttl);","        host.get(\"contentBox\").setStyle(\"width\", ttl);","    }","};","","Y.RightAxisLayout = RightAxisLayout;","/**"," * Contains algorithms for rendering a bottom axis."," *"," * @class BottomAxisLayout"," * @Constructor"," * @submodule axis"," */","BottomAxisLayout = function(){};","","BottomAxisLayout.prototype = {","    /**","     *  Default margins for text fields.","     *","     *  @private","     *  @method _getDefaultMargins","     *  @return Object","     */","    _getDefaultMargins: function()","    {","        return {","            top: 4,","            left: 0,","            right: 0,","            bottom: 0","        };","    },","","    /**","     * Sets the length of the tick on either side of the axis line.","     *","     * @method setTickOffsets","     * @protected","     */","    setTickOffsets: function()","    {","        var host = this,","            majorTicks = host.get(\"styles\").majorTicks,","            tickLength = majorTicks.length,","            halfTick = tickLength * 0.5,","            display = majorTicks.display;","        host.set(\"leftTickOffset\",  0);","        host.set(\"rightTickOffset\",  0);","","        switch(display)","        {","            case \"inside\" :","                host.set(\"topTickOffset\", tickLength);","                host.set(\"bottomTickOffset\", 0);","            break;","            case \"outside\" :","                host.set(\"topTickOffset\", 0);","                host.set(\"bottomTickOffset\", tickLength);","            break;","            case \"cross\":","                host.set(\"topTickOffset\",  halfTick);","                host.set(\"bottomTickOffset\",  halfTick);","            break;","            default:","                host.set(\"topTickOffset\", 0);","                host.set(\"bottomTickOffset\", 0);","            break;","        }","    },","","    /**","     * Calculates the coordinates for the first point on an axis.","     *","     * @method getLineStart","     * @protected","     */","    getLineStart: function()","    {","        var style = this.get(\"styles\"),","            padding = style.padding,","            majorTicks = style.majorTicks,","            tickLength = majorTicks.length,","            display = majorTicks.display,","            pt = {x:0, y:padding.top};","        if(display === \"inside\")","        {","            pt.y += tickLength;","        }","        else if(display === \"cross\")","        {","            pt.y += tickLength/2;","        }","        return pt;","    },","","    /**","     * Draws a tick","     *","     * @method drawTick","     * @param {Path} path reference to the path `Path` element in which to draw the tick.","     * @param {Object} pt hash containing x and y coordinates","     * @param {Object} tickStyles hash of properties used to draw the tick","     * @protected","     */","    drawTick: function(path, pt, tickStyles)","    {","        var host = this,","            style = host.get(\"styles\"),","            padding = style.padding,","            tickLength = tickStyles.length,","            start = {x:pt.x, y:padding.top},","            end = {x:pt.x, y:tickLength + padding.top};","        host.drawLine(path, start, end);","    },","","    /**","     * Calculates the point for a label.","     *","     * @method getLabelPoint","     * @param {Object} pt Object containing x and y coordinates","     * @return Object","     * @protected","     */","    getLabelPoint: function(point)","    {","        return {x:point.x, y:point.y + this.get(\"bottomTickOffset\")};","    },","","    /**","     * Updates the value for the `maxLabelSize` for use in calculating total size.","     *","     * @method updateMaxLabelSize","     * @param {HTMLElement} label to measure","     * @protected","     */","    updateMaxLabelSize: function(labelWidth, labelHeight)","    {","        var host = this,","            props = this._labelRotationProps,","            rot = props.rot,","            absRot = props.absRot,","            sinRadians = props.sinRadians,","            cosRadians = props.cosRadians,","            max;","        if(rot === 0)","        {","            max = labelHeight;","        }","        else if(absRot === 90)","        {","            max = labelWidth;","        }","        else","        {","            max = (sinRadians * labelWidth) + (cosRadians * labelHeight);","        }","        host._maxLabelSize = Math.max(host._maxLabelSize, max);","    },","","    /**","     * Determines the available label height when the axis width has been explicitly set.","     *","     * @method getExplicitlySized","     * @return Boolean","     * @protected","     */","    getExplicitlySized: function(styles)","    {","        if(this._explicitHeight)","        {","            var host = this,","                h = host._explicitHeight,","                totalTitleSize = host._totalTitleSize,","                bottomTickOffset = host.get(\"bottomTickOffset\"),","                margin = styles.label.margin.right;","            host._maxLabelSize =  h - (bottomTickOffset + margin + totalTitleSize);","            return true;","        }","        return false;","    },","","    /**","     * Rotate and position title.","     *","     * @method positionTitle","     * @param {HTMLElement} label to rotate position","     * @protected","     */","    positionTitle: function(label)","    {","        var host = this,","            bounds = host._titleBounds,","            margin = host.get(\"styles\").title.margin,","            props = host._titleRotationProps,","            h = bounds.bottom - bounds.top,","            labelWidth = label.offsetWidth,","            labelHeight = label.offsetHeight,","            x = (host.get(\"width\") * 0.5) - (labelWidth * 0.5),","            y = host.get(\"height\") - labelHeight/2 - h/2;","        props.labelWidth = labelWidth;","        props.labelHeight = labelHeight;","        if(margin && margin.bottom)","        {","            y -= margin.bottom;","        }","        props.x = x;","        props.y = y;","        props.transformOrigin = [0.5, 0.5];","        host._rotate(label, props);","    },","","    /**","     * Rotate and position labels.","     *","     * @method positionLabel","     * @param {HTMLElement} label to rotate position","     * @param {Object} pt hash containing the x and y coordinates in which the label will be positioned","     * against.","     * @protected","     */","    positionLabel: function(label, pt, styles, i)","    {","        var host = this,","            tickOffset = host.get(\"bottomTickOffset\"),","            labelStyles = styles.label,","            margin = 0,","            props = host._labelRotationProps,","            rot = props.rot,","            absRot = props.absRot,","            leftOffset = Math.round(pt.x),","            topOffset = Math.round(pt.y),","            labelWidth = host._labelWidths[i],","            labelHeight = host._labelHeights[i];","        if(labelStyles.margin && labelStyles.margin.top)","        {","            margin = labelStyles.margin.top;","        }","        if(rot > 0)","        {","            topOffset -= labelHeight/2 * rot/90;","        }","        else if(rot < 0)","        {","            leftOffset -= labelWidth;","            topOffset -= labelHeight/2 * absRot/90;","        }","        else","        {","            leftOffset -= labelWidth * 0.5;","        }","        topOffset += margin;","        topOffset += tickOffset;","        props.labelWidth = labelWidth;","        props.labelHeight = labelHeight;","        props.x = leftOffset;","        props.y = topOffset;","        host._rotate(label, props);","    },","","    /**","     * Adjusts the coordinates of an axis label based on the rotation.","     *","     * @method _setRotationCoords","     * @param {Object} props Coordinates, dimension and rotation properties of the label.","     * @protected","     */","    _setRotationCoords: function(props)","    {","        var rot = props.rot,","            absRot = props.absRot,","            labelWidth = props.labelWidth,","            labelHeight = props.labelHeight,","            leftOffset,","            topOffset;","","        if(rot > 0)","        {","            leftOffset = 0;","            topOffset = labelHeight/2 * rot/90;","        }","        else if(rot < 0)","        {","            leftOffset = labelWidth;","            topOffset = labelHeight/2 * absRot/90;","        }","        else","        {","            leftOffset = labelWidth * 0.5;","            topOffset = 0;","        }","        props.x -= leftOffset;","        props.y -= topOffset;","    },","","    /**","     * Returns the transformOrigin to use for an axis label based on the position of the axis","     * and the rotation of the label.","     *","     * @method _getTransformOrigin","     * @param {Number} rot The rotation (in degrees) of the label.","     * @return Array","     * @protected","     */","    _getTransformOrigin: function(rot)","    {","        var transformOrigin;","        if(rot > 0)","        {","            transformOrigin = [0, 0.5];","        }","        else if(rot < 0)","        {","            transformOrigin = [1, 0.5];","        }","        else","        {","            transformOrigin = [0, 0];","        }","        return transformOrigin;","    },","","    /**","     * Adjusts position for inner ticks.","     *","     * @method offsetNodeForTick","     * @param {Node} cb contentBox of the axis","     * @protected","     */","    offsetNodeForTick: function(cb)","    {","        var host = this;","        host.get(\"contentBox\").setStyle(\"top\", 0 - host.get(\"topTickOffset\"));","    },","","    /**","     * Assigns a height based on the size of the contents.","     *","     * @method setCalculatedSize","     * @protected","     */","    setCalculatedSize: function()","    {","        var host = this,","            styles = host.get(\"styles\"),","            labelStyle = styles.label,","            totalTitleSize = host._totalTitleSize,","            ttl = Math.round(host.get(\"bottomTickOffset\") + host._maxLabelSize + labelStyle.margin.top + totalTitleSize);","        if(host._explicitHeight)","        {","            ttl = host._explicitHeight;","        }","        host.set(\"calculatedHeight\", ttl);","    }","};","Y.BottomAxisLayout = BottomAxisLayout;","/**"," * Contains algorithms for rendering a top axis."," *"," * @class TopAxisLayout"," * @constructor"," * @submodule axis"," */","TopAxisLayout = function(){};","","TopAxisLayout.prototype = {","    /**","     *  Default margins for text fields.","     *","     *  @private","     *  @method _getDefaultMargins","     *  @return Object","     */","    _getDefaultMargins: function()","    {","        return {","            top: 0,","            left: 0,","            right: 0,","            bottom: 4","        };","    },","","    /**","     * Sets the length of the tick on either side of the axis line.","     *","     * @method setTickOffsets","     * @protected","     */","    setTickOffsets: function()","    {","        var host = this,","            majorTicks = host.get(\"styles\").majorTicks,","            tickLength = majorTicks.length,","            halfTick = tickLength * 0.5,","            display = majorTicks.display;","        host.set(\"leftTickOffset\",  0);","        host.set(\"rightTickOffset\",  0);","        switch(display)","        {","            case \"inside\" :","                host.set(\"bottomTickOffset\", tickLength);","                host.set(\"topTickOffset\", 0);","            break;","            case \"outside\" :","                host.set(\"bottomTickOffset\", 0);","                host.set(\"topTickOffset\",  tickLength);","            break;","            case \"cross\" :","                host.set(\"topTickOffset\", halfTick);","                host.set(\"bottomTickOffset\", halfTick);","            break;","            default:","                host.set(\"topTickOffset\", 0);","                host.set(\"bottomTickOffset\", 0);","            break;","        }","    },","","    /**","     * Calculates the coordinates for the first point on an axis.","     *","     * @method getLineStart","     * @protected","     */","    getLineStart: function()","    {","        var host = this,","            style = host.get(\"styles\"),","            padding = style.padding,","            majorTicks = style.majorTicks,","            tickLength = majorTicks.length,","            display = majorTicks.display,","            pt = {x:0, y:padding.top};","        if(display === \"outside\")","        {","            pt.y += tickLength;","        }","        else if(display === \"cross\")","        {","            pt.y += tickLength/2;","        }","        return pt;","    },","","    /**","     * Draws a tick","     *","     * @method drawTick","     * @param {Path} path reference to the path `Path` element in which to draw the tick.","     * @param {Object} pt hash containing x and y coordinates","     * @param {Object} tickStyles hash of properties used to draw the tick","     * @protected","     */","    drawTick: function(path, pt, tickStyles)","    {","        var host = this,","            style = host.get(\"styles\"),","            padding = style.padding,","            tickLength = tickStyles.length,","            start = {x:pt.x, y:padding.top},","            end = {x:pt.x, y:tickLength + padding.top};","        host.drawLine(path, start, end);","    },","","    /**","     * Calculates the point for a label.","     *","     * @method getLabelPoint","     * @param {Object} pt hash containing x and y coordinates","     * @return Object","     * @protected","     */","    getLabelPoint: function(pt)","    {","        return {x:pt.x, y:pt.y - this.get(\"topTickOffset\")};","    },","","    /**","     * Updates the value for the `maxLabelSize` for use in calculating total size.","     *","     * @method updateMaxLabelSize","     * @param {HTMLElement} label to measure","     * @protected","     */","    updateMaxLabelSize: function(labelWidth, labelHeight)","    {","        var host = this,","            props = this._labelRotationProps,","            rot = props.rot,","            absRot = props.absRot,","            sinRadians = props.sinRadians,","            cosRadians = props.cosRadians,","            max;","        if(rot === 0)","        {","            max = labelHeight;","        }","        else if(absRot === 90)","        {","            max = labelWidth;","        }","        else","        {","            max = (sinRadians * labelWidth) + (cosRadians * labelHeight);","        }","        host._maxLabelSize = Math.max(host._maxLabelSize, max);","    },","","    /**","     * Determines the available label height when the axis width has been explicitly set.","     *","     * @method getExplicitlySized","     * @return Boolean","     * @protected","     */","    getExplicitlySized: function(styles)","    {","        if(this._explicitHeight)","        {","            var host = this,","                h = host._explicitHeight,","                totalTitleSize = host._totalTitleSize,","                topTickOffset = host.get(\"topTickOffset\"),","                margin = styles.label.margin.right;","            host._maxLabelSize =  h - (topTickOffset + margin + totalTitleSize);","            return true;","        }","        return false;","    },","","    /**","     * Rotate and position title.","     *","     * @method positionTitle","     * @param {HTMLElement} label to rotate position","     * @protected","     */","    positionTitle: function(label)","    {","        var host = this,","            bounds = host._titleBounds,","            margin = host.get(\"styles\").title.margin,","            props = host._titleRotationProps,","            labelWidth = label.offsetWidth,","            labelHeight = label.offsetHeight,","            h = bounds.bottom - bounds.top,","            x = (host.get(\"width\") * 0.5) - (labelWidth * 0.5),","            y = h/2 - labelHeight/2;","        props.labelWidth = labelWidth;","        props.labelHeight = labelHeight;","        if(margin && margin.top)","        {","            y += margin.top;","        }","        props.x = x;","        props.y = y;","        props.transformOrigin = [0.5, 0.5];","        host._rotate(label, props);","    },","","    /**","     * Rotate and position labels.","     *","     * @method positionLabel","     * @param {HTMLElement} label to rotate position","     * @param {Object} pt hash containing the x and y coordinates in which the label will be positioned","     * against.","     * @protected","     */","    positionLabel: function(label, pt, styles, i)","    {","        var host = this,","            totalTitleSize = this._totalTitleSize,","            maxLabelSize = host._maxLabelSize,","            leftOffset = pt.x,","            topOffset = pt.y + totalTitleSize + maxLabelSize,","            props = this._labelRotationProps,","            rot = props.rot,","            absRot = props.absRot,","            labelWidth = this._labelWidths[i],","            labelHeight = this._labelHeights[i];","        if(rot === 0)","        {","            leftOffset -= labelWidth * 0.5;","            topOffset -= labelHeight;","        }","        else","        {","            if(rot === 90)","            {","                leftOffset -= labelWidth;","                topOffset -= (labelHeight * 0.5);","            }","            else if (rot === -90)","            {","                topOffset -= (labelHeight * 0.5);","            }","            else if(rot > 0)","            {","                leftOffset -= labelWidth;","                topOffset -= labelHeight - (labelHeight * rot/180);","            }","            else","            {","                topOffset -= labelHeight - (labelHeight * absRot/180);","            }","        }","        props.x = Math.round(leftOffset);","        props.y = Math.round(topOffset);","        props.labelWidth = labelWidth;","        props.labelHeight = labelHeight;","        this._rotate(label, props);","    },","","    /**","     * Adjusts the coordinates of an axis label based on the rotation.","     *","     * @method _setRotationCoords","     * @param {Object} props Coordinates, dimension and rotation properties of the label.","     * @protected","     */","    _setRotationCoords: function(props)","    {","        var rot = props.rot,","            absRot = props.absRot,","            labelWidth = props.labelWidth,","            labelHeight = props.labelHeight,","            leftOffset,","            topOffset;","        if(rot === 0)","        {","            leftOffset = labelWidth * 0.5;","            topOffset = labelHeight;","        }","        else","        {","            if(rot === 90)","            {","                leftOffset = labelWidth;","                topOffset = (labelHeight * 0.5);","            }","            else if (rot === -90)","            {","                topOffset = (labelHeight * 0.5);","            }","            else if(rot > 0)","            {","                leftOffset = labelWidth;","                topOffset = labelHeight - (labelHeight * rot/180);","            }","            else","            {","                topOffset = labelHeight - (labelHeight * absRot/180);","            }","        }","        props.x -= leftOffset;","        props.y -= topOffset;","    },","","    /**","     * Returns the transformOrigin to use for an axis label based on the position of the axis","     * and the rotation of the label.","     *","     * @method _getTransformOrigin","     * @param {Number} rot The rotation (in degrees) of the label.","     * @return Array","     * @protected","     */","    _getTransformOrigin: function(rot)","    {","        var transformOrigin;","        if(rot === 0)","        {","            transformOrigin = [0, 0];","        }","        else","        {","            if(rot === 90)","            {","                transformOrigin = [1, 0.5];","            }","            else if (rot === -90)","            {","                transformOrigin = [0, 0.5];","            }","            else if(rot > 0)","            {","                transformOrigin = [1, 0.5];","            }","            else","            {","                transformOrigin = [0, 0.5];","            }","        }","        return transformOrigin;","    },","","    /**","     * Adjusts position for inner ticks.","     *","     * @method offsetNodeForTick","     * @param {Node} cb contentBox of the axis","     * @protected","     */","    offsetNodeForTick: function(cb)","    {","    },","","    /**","     * Assigns a height based on the size of the contents.","     *","     * @method setCalculatedSize","     * @protected","     */","    setCalculatedSize: function()","    {","        var host = this,","            graphic = host.get(\"graphic\"),","            styles = host.get(\"styles\"),","            labelMargin = styles.label.margin,","            totalLabelSize = labelMargin.bottom + host._maxLabelSize,","            totalTitleSize = host._totalTitleSize,","            topTickOffset = this.get(\"topTickOffset\"),","            ttl = Math.round(topTickOffset + totalLabelSize + totalTitleSize);","        if(this._explicitHeight)","        {","           ttl = this._explicitHeight;","        }","        host.set(\"calculatedHeight\", ttl);","        graphic.set(\"y\", ttl - topTickOffset);","    }","};","Y.TopAxisLayout = TopAxisLayout;","","/**"," * An abstract class that is used to generates axes for a chart."," *"," * @class Axis"," * @extends Widget"," * @uses AxisBase"," * @uses TopAxisLayout"," * @uses RightAxisLayout"," * @uses BottomAxisLayout"," * @uses LeftAxisLayout"," * @constructor"," * @param {Object} config (optional) Configuration parameters."," * @submodule axis"," */","Y.Axis = Y.Base.create(\"axis\", Y.Widget, [Y.AxisBase], {","    /**","     * Calculates and returns a value based on the number of labels and the index of","     * the current label.","     *","     * @method getLabelByIndex","     * @param {Number} i Index of the label.","     * @param {Number} l Total number of labels.","     * @return String","     */","    getLabelByIndex: function(i, l)","    {","        var position = this.get(\"position\"),","            direction = position == \"left\" || position == \"right\" ? \"vertical\" : \"horizontal\";","        return this._getLabelByIndex(i, l, direction);","    },","","    /**","     * @method bindUI","     * @private","     */","    bindUI: function()","    {","        this.after(\"dataReady\", Y.bind(this._dataChangeHandler, this));","        this.after(\"dataUpdate\", Y.bind(this._dataChangeHandler, this));","        this.after(\"stylesChange\", this._updateHandler);","        this.after(\"overlapGraphChange\", this._updateHandler);","        this.after(\"positionChange\", this._positionChangeHandler);","        this.after(\"widthChange\", this._handleSizeChange);","        this.after(\"heightChange\", this._handleSizeChange);","        this.after(\"calculatedWidthChange\", this._handleSizeChange);","        this.after(\"calculatedHeightChange\", this._handleSizeChange);","    },","    /**","     * Storage for calculatedWidth value.","     *","     * @property _calculatedWidth","     * @type Number","     * @private","     */","    _calculatedWidth: 0,","","    /**","     * Storage for calculatedHeight value.","     *","     * @property _calculatedHeight","     * @type Number","     * @private","     */","    _calculatedHeight: 0,","","    /**","     * Handles change to the dataProvider","     *","     * @method _dataChangeHandler","     * @param {Object} e Event object","     * @private","     */","    _dataChangeHandler: function(e)","    {","        if(this.get(\"rendered\"))","        {","            this._drawAxis();","        }","    },","","    /**","     * Handles change to the position attribute","     *","     * @method _positionChangeHandler","     * @param {Object} e Event object","     * @private","     */","    _positionChangeHandler: function(e)","    {","        this._updateGraphic(e.newVal);","        this._updateHandler();","    },","","    /**","     * Updates the the Graphic instance","     *","     * @method _updateGraphic","     * @param {String} position Position of axis","     * @private","     */","    _updateGraphic: function(position)","    {","        var graphic = this.get(\"graphic\");","        if(position == \"none\")","        {","            if(graphic)","            {","                graphic.destroy();","            }","        }","        else","        {","            if(!graphic)","            {","                this._setCanvas();","            }","        }","    },","","    /**","     * Handles changes to axis.","     *","     * @method _updateHandler","     * @param {Object} e Event object","     * @private","     */","    _updateHandler: function(e)","    {","        if(this.get(\"rendered\"))","        {","            this._drawAxis();","        }","    },","","    /**","     * @method renderUI","     * @private","     */","    renderUI: function()","    {","        this._updateGraphic(this.get(\"position\"));","    },","","    /**","     * @method syncUI","     * @private","     */","    syncUI: function()","    {","        var layout = this._layout,","            defaultMargins,","            styles,","            label,","            title,","            i;","        if(layout)","        {","            defaultMargins = layout._getDefaultMargins();","            styles = this.get(\"styles\");","            label = styles.label.margin;","            title =styles.title.margin;","            //need to defaultMargins method to the layout classes.","            for(i in defaultMargins)","            {","                if(defaultMargins.hasOwnProperty(i))","                {","                    label[i] = label[i] === undefined ? defaultMargins[i] : label[i];","                    title[i] = title[i] === undefined ? defaultMargins[i] : title[i];","                }","            }","        }","        this._drawAxis();","    },","","    /**","     * Creates a graphic instance to be used for the axis line and ticks.","     *","     * @method _setCanvas","     * @private","     */","    _setCanvas: function()","    {","        var cb = this.get(\"contentBox\"),","            bb = this.get(\"boundingBox\"),","            p = this.get(\"position\"),","            pn = this._parentNode,","            w = this.get(\"width\"),","            h = this.get(\"height\");","        bb.setStyle(\"position\", \"absolute\");","        bb.setStyle(\"zIndex\", 2);","        w = w ? w + \"px\" : pn.getStyle(\"width\");","        h = h ? h + \"px\" : pn.getStyle(\"height\");","        if(p === \"top\" || p === \"bottom\")","        {","            cb.setStyle(\"width\", w);","        }","        else","        {","            cb.setStyle(\"height\", h);","        }","        cb.setStyle(\"position\", \"relative\");","        cb.setStyle(\"left\", \"0px\");","        cb.setStyle(\"top\", \"0px\");","        this.set(\"graphic\", new Y.Graphic());","        this.get(\"graphic\").render(cb);","    },","","    /**","     * Gets the default value for the `styles` attribute. Overrides","     * base implementation.","     *","     * @method _getDefaultStyles","     * @return Object","     * @protected","     */","    _getDefaultStyles: function()","    {","        var axisstyles = {","            majorTicks: {","                display:\"inside\",","                length:4,","                color:\"#dad8c9\",","                weight:1,","                alpha:1","            },","            minorTicks: {","                display:\"none\",","                length:2,","                color:\"#dad8c9\",","                weight:1","            },","            line: {","                weight:1,","                color:\"#dad8c9\",","                alpha:1","            },","            majorUnit: {","                determinant:\"count\",","                count:11,","                distance:75","            },","            top: \"0px\",","            left: \"0px\",","            width: \"100px\",","            height: \"100px\",","            label: {","                color:\"#808080\",","                alpha: 1,","                fontSize:\"85%\",","                rotation: 0,","                margin: {","                    top: undefined,","                    right: undefined,","                    bottom: undefined,","                    left: undefined","                }","            },","            title: {","                color:\"#808080\",","                alpha: 1,","                fontSize:\"85%\",","                rotation: undefined,","                margin: {","                    top: undefined,","                    right: undefined,","                    bottom: undefined,","                    left: undefined","                }","            },","            hideOverlappingLabelTicks: false","        };","","        return Y.merge(Y.Renderer.prototype._getDefaultStyles(), axisstyles);","    },","","    /**","     * Updates the axis when the size changes.","     *","     * @method _handleSizeChange","     * @param {Object} e Event object.","     * @private","     */","    _handleSizeChange: function(e)","    {","        var attrName = e.attrName,","            pos = this.get(\"position\"),","            vert = pos == \"left\" || pos == \"right\",","            cb = this.get(\"contentBox\"),","            hor = pos == \"bottom\" || pos == \"top\";","        cb.setStyle(\"width\", this.get(\"width\"));","        cb.setStyle(\"height\", this.get(\"height\"));","        if((hor && attrName == \"width\") || (vert && attrName == \"height\"))","        {","            this._drawAxis();","        }","    },","","    /**","     * Maps key values to classes containing layout algorithms","     *","     * @property _layoutClasses","     * @type Object","     * @private","     */","    _layoutClasses:","    {","        top : TopAxisLayout,","        bottom: BottomAxisLayout,","        left: LeftAxisLayout,","        right : RightAxisLayout","    },","","    /**","     * Draws a line segment between 2 points","     *","     * @method drawLine","     * @param {Object} startPoint x and y coordinates for the start point of the line segment","     * @param {Object} endPoint x and y coordinates for the for the end point of the line segment","     * @param {Object} line styles (weight, color and alpha to be applied to the line segment)","     * @private","     */","    drawLine: function(path, startPoint, endPoint)","    {","        path.moveTo(startPoint.x, startPoint.y);","        path.lineTo(endPoint.x, endPoint.y);","    },","","    /**","     * Generates the properties necessary for rotating and positioning a text field.","     *","     * @method _getTextRotationProps","     * @param {Object} styles properties for the text field","     * @return Object","     * @private","     */","    _getTextRotationProps: function(styles)","    {","        if(styles.rotation === undefined)","        {","            switch(this.get(\"position\"))","            {","                case \"left\" :","                    styles.rotation = -90;","                break;","                case \"right\" :","                    styles.rotation = 90;","                break;","                default :","                    styles.rotation = 0;","                break;","            }","        }","        var rot =  Math.min(90, Math.max(-90, styles.rotation)),","            absRot = Math.abs(rot),","            radCon = Math.PI/180,","            sinRadians = parseFloat(parseFloat(Math.sin(absRot * radCon)).toFixed(8)),","            cosRadians = parseFloat(parseFloat(Math.cos(absRot * radCon)).toFixed(8));","        return {","            rot: rot,","            absRot: absRot,","            radCon: radCon,","            sinRadians: sinRadians,","            cosRadians: cosRadians,","            textAlpha: styles.alpha","        };","    },","","    /**","     * Draws an axis.","     *","     * @method _drawAxis","     * @private","     */","    _drawAxis: function ()","    {","        if(this._drawing)","        {","            this._callLater = true;","            return;","        }","        this._drawing = true;","        this._callLater = false;","        if(this._layout)","        {","            var styles = this.get(\"styles\"),","                line = styles.line,","                labelStyles = styles.label,","                majorTickStyles = styles.majorTicks,","                drawTicks = majorTickStyles.display != \"none\",","                tickPoint,","                majorUnit = styles.majorUnit,","                len,","                majorUnitDistance,","                i = 0,","                layout = this._layout,","                layoutLength,","                position,","                lineStart,","                label,","                labelWidth,","                labelHeight,","                labelFunction = this.get(\"labelFunction\"),","                labelFunctionScope = this.get(\"labelFunctionScope\"),","                labelFormat = this.get(\"labelFormat\"),","                graphic = this.get(\"graphic\"),","                path = this.get(\"path\"),","                tickPath,","                explicitlySized,","                position = this.get(\"position\"),","                direction = (position == \"left\" || position == \"right\") ? \"vertical\" : \"horizontal\";","            this._labelWidths = [];","            this._labelHeights = [];","            graphic.set(\"autoDraw\", false);","            path.clear();","            path.set(\"stroke\", {","                weight: line.weight,","                color: line.color,","                opacity: line.alpha","            });","            this._labelRotationProps = this._getTextRotationProps(labelStyles);","            this._labelRotationProps.transformOrigin = layout._getTransformOrigin(this._labelRotationProps.rot);","            layout.setTickOffsets.apply(this);","            layoutLength = this.getLength();","            lineStart = layout.getLineStart.apply(this);","            len = this.getTotalMajorUnits(majorUnit);","            majorUnitDistance = this.getMajorUnitDistance(len, layoutLength, majorUnit);","            this.set(\"edgeOffset\", this.getEdgeOffset(len, layoutLength) * 0.5);","            if(len < 1)","            {","                this._clearLabelCache();","            }","            else","            {","                tickPoint = this.getFirstPoint(lineStart);","                this.drawLine(path, lineStart, this.getLineEnd(tickPoint));","                if(drawTicks)","                {","                    tickPath = this.get(\"tickPath\");","                    tickPath.clear();","                    tickPath.set(\"stroke\", {","                        weight: majorTickStyles.weight,","                        color: majorTickStyles.color,","                        opacity: majorTickStyles.alpha","                    });","                   layout.drawTick.apply(this, [tickPath, tickPoint, majorTickStyles]);","                }","                this._createLabelCache();","                this._tickPoints = [];","                this._maxLabelSize = 0;","                this._totalTitleSize = 0;","                this._titleSize = 0;","                this._setTitle();","                explicitlySized = layout.getExplicitlySized.apply(this, [styles]);","                for(; i < len; ++i)","                {","                    if(drawTicks)","                    {","                        layout.drawTick.apply(this, [tickPath, tickPoint, majorTickStyles]);","                    }","                    position = this.getPosition(tickPoint);","                    label = this.getLabel(tickPoint, labelStyles);","                    this._labels.push(label);","                    this._tickPoints.push({x:tickPoint.x, y:tickPoint.y});","                    this.get(\"appendLabelFunction\")(label, labelFunction.apply(labelFunctionScope, [this._getLabelByIndex(i, len, direction), labelFormat]));","                    labelWidth = Math.round(label.offsetWidth);","                    labelHeight = Math.round(label.offsetHeight);","                    if(!explicitlySized)","                    {","                        this._layout.updateMaxLabelSize.apply(this, [labelWidth, labelHeight]);","                    }","                    this._labelWidths.push(labelWidth);","                    this._labelHeights.push(labelHeight);","                    tickPoint = this.getNextPoint(tickPoint, majorUnitDistance);","                }","                this._clearLabelCache();","                if(this.get(\"overlapGraph\"))","                {","                   layout.offsetNodeForTick.apply(this, [this.get(\"contentBox\")]);","                }","                layout.setCalculatedSize.apply(this);","                if(this._titleTextField)","                {","                    this._layout.positionTitle.apply(this, [this._titleTextField]);","                }","                for(i = 0; i < len; ++i)","                {","                    layout.positionLabel.apply(this, [this.get(\"labels\")[i], this._tickPoints[i], styles, i]);","                }","            }","        }","        this._drawing = false;","        if(this._callLater)","        {","            this._drawAxis();","        }","        else","        {","            this._updatePathElement();","            this.fire(\"axisRendered\");","        }","    },","","    /**","     * Calculates and sets the total size of a title.","     *","     * @method _setTotalTitleSize","     * @param {Object} styles Properties for the title field.","     * @private","     */","    _setTotalTitleSize: function(styles)","    {","        var title = this._titleTextField,","            w = title.offsetWidth,","            h = title.offsetHeight,","            rot = this._titleRotationProps.rot,","            bounds,","            size,","            margin = styles.margin,","            position = this.get(\"position\"),","            matrix = new Y.Matrix();","        matrix.rotate(rot);","        bounds = matrix.getContentRect(w, h);","        if(position == \"left\" || position == \"right\")","        {","            size = bounds.right - bounds.left;","            if(margin)","            {","                size += margin.left + margin.right;","            }","        }","        else","        {","            size = bounds.bottom - bounds.top;","            if(margin)","            {","                size += margin.top + margin.bottom;","            }","        }","        this._titleBounds = bounds;","        this._totalTitleSize = size;","    },","","    /**","     *  Updates path.","     *","     *  @method _updatePathElement","     *  @private","     */","    _updatePathElement: function()","    {","        var path = this._path,","            tickPath = this._tickPath,","            redrawGraphic = false,","            graphic = this.get(\"graphic\");","        if(path)","        {","            redrawGraphic = true;","            path.end();","        }","        if(tickPath)","        {","            redrawGraphic = true;","            tickPath.end();","        }","        if(redrawGraphic)","        {","            graphic._redraw();","        }","    },","","    /**","     * Updates the content and style properties for a title field.","     *","     * @method _updateTitle","     * @private","     */","    _setTitle: function()","    {","        var i,","            styles,","            customStyles,","            title = this.get(\"title\"),","            titleTextField = this._titleTextField,","            parentNode;","        if(title !== null && title !== undefined)","        {","            customStyles = {","                    rotation: \"rotation\",","                    margin: \"margin\",","                    alpha: \"alpha\"","            };","            styles = this.get(\"styles\").title;","            if(!titleTextField)","            {","                titleTextField = DOCUMENT.createElement('span');","                titleTextField.style.display = \"block\";","                titleTextField.style.whiteSpace = \"nowrap\";","                titleTextField.setAttribute(\"class\", \"axisTitle\");","                this.get(\"contentBox\").append(titleTextField);","            }","            else if(!DOCUMENT.createElementNS)","            {","                if(titleTextField.style.filter)","                {","                    titleTextField.style.filter = null;","                }","            }","            titleTextField.style.position = \"absolute\";","            for(i in styles)","            {","                if(styles.hasOwnProperty(i) && !customStyles.hasOwnProperty(i))","                {","                    titleTextField.style[i] = styles[i];","                }","            }","            this.get(\"appendTitleFunction\")(titleTextField, title);","            this._titleTextField = titleTextField;","            this._titleRotationProps = this._getTextRotationProps(styles);","            this._setTotalTitleSize(styles);","        }","        else if(titleTextField)","        {","            parentNode = titleTextField.parentNode;","            if(parentNode)","            {","                parentNode.removeChild(titleTextField);","            }","            this._titleTextField = null;","            this._totalTitleSize = 0;","        }","    },","","    /**","     * Creates or updates an axis label.","     *","     * @method getLabel","     * @param {Object} pt x and y coordinates for the label","     * @param {Object} styles styles applied to label","     * @return HTMLElement","     * @private","     */","    getLabel: function(pt, styles)","    {","        var i,","            label,","            labelCache = this._labelCache,","            customStyles = {","                rotation: \"rotation\",","                margin: \"margin\",","                alpha: \"alpha\"","            };","        if(labelCache && labelCache.length > 0)","        {","            label = labelCache.shift();","        }","        else","        {","            label = DOCUMENT.createElement(\"span\");","            label.className = Y.Lang.trim([label.className, \"axisLabel\"].join(' '));","            this.get(\"contentBox\").append(label);","        }","        if(!DOCUMENT.createElementNS)","        {","            if(label.style.filter)","            {","                label.style.filter = null;","            }","        }","        label.style.display = \"block\";","        label.style.whiteSpace = \"nowrap\";","        label.style.position = \"absolute\";","        for(i in styles)","        {","            if(styles.hasOwnProperty(i) && !customStyles.hasOwnProperty(i))","            {","                label.style[i] = styles[i];","            }","        }","        return label;","    },","","    /**","     * Creates a cache of labels that can be re-used when the axis redraws.","     *","     * @method _createLabelCache","     * @private","     */","    _createLabelCache: function()","    {","        if(this._labels)","        {","            while(this._labels.length > 0)","            {","                this._labelCache.push(this._labels.shift());","            }","        }","        else","        {","            this._clearLabelCache();","        }","        this._labels = [];","    },","","    /**","     * Removes axis labels from the dom and clears the label cache.","     *","     * @method _clearLabelCache","     * @private","     */","    _clearLabelCache: function()","    {","        if(this._labelCache)","        {","            var len = this._labelCache.length,","                i = 0,","                label;","            for(; i < len; ++i)","            {","                label = this._labelCache[i];","                this._removeChildren(label);","                Y.Event.purgeElement(label, true);","                label.parentNode.removeChild(label);","            }","        }","        this._labelCache = [];","    },","","    /**","     * Gets the end point of an axis.","     *","     * @method getLineEnd","     * @return Object","     * @private","     */","    getLineEnd: function(pt)","    {","        var w = this.get(\"width\"),","            h = this.get(\"height\"),","            pos = this.get(\"position\");","        if(pos === \"top\" || pos === \"bottom\")","        {","            return {x:w, y:pt.y};","        }","        else","        {","            return {x:pt.x, y:h};","        }","    },","","    /**","     * Calcuates the width or height of an axis depending on its direction.","     *","     * @method getLength","     * @return Number","     * @private","     */","    getLength: function()","    {","        var l,","            style = this.get(\"styles\"),","            padding = style.padding,","            w = this.get(\"width\"),","            h = this.get(\"height\"),","            pos = this.get(\"position\");","        if(pos === \"top\" || pos === \"bottom\")","        {","            l = w - (padding.left + padding.right);","        }","        else","        {","            l = h - (padding.top + padding.bottom);","        }","        return l;","    },","","    /**","     * Gets the position of the first point on an axis.","     *","     * @method getFirstPoint","     * @param {Object} pt Object containing x and y coordinates.","     * @return Object","     * @private","     */","    getFirstPoint:function(pt)","    {","        var style = this.get(\"styles\"),","            pos = this.get(\"position\"),","            padding = style.padding,","            np = {x:pt.x, y:pt.y};","        if(pos === \"top\" || pos === \"bottom\")","        {","            np.x += padding.left + this.get(\"edgeOffset\");","        }","        else","        {","            np.y += this.get(\"height\") - (padding.top + this.get(\"edgeOffset\"));","        }","        return np;","    },","","    /**","     * Gets the position of the next point on an axis.","     *","     * @method getNextPoint","     * @param {Object} point Object containing x and y coordinates.","     * @param {Number} majorUnitDistance Distance in pixels between ticks.","     * @return Object","     * @private","     */","    getNextPoint: function(point, majorUnitDistance)","    {","        var pos = this.get(\"position\");","        if(pos === \"top\" || pos === \"bottom\")","        {","            point.x = point.x + majorUnitDistance;","        }","        else","        {","            point.y = point.y - majorUnitDistance;","        }","        return point;","    },","","    /**","     * Calculates the placement of last tick on an axis.","     *","     * @method getLastPoint","     * @return Object","     * @private","     */","    getLastPoint: function()","    {","        var style = this.get(\"styles\"),","            padding = style.padding,","            w = this.get(\"width\"),","            pos = this.get(\"position\");","        if(pos === \"top\" || pos === \"bottom\")","        {","            return {x:w - padding.right, y:padding.top};","        }","        else","        {","            return {x:padding.left, y:padding.top};","        }","    },","","    /**","     * Calculates position on the axis.","     *","     * @method getPosition","     * @param {Object} point contains x and y values","     * @private","     */","    getPosition: function(point)","    {","        var p,","            h = this.get(\"height\"),","            style = this.get(\"styles\"),","            padding = style.padding,","            pos = this.get(\"position\"),","            dataType = this.get(\"dataType\");","        if(pos === \"left\" || pos === \"right\")","        {","            //Numeric data on a vertical axis is displayed from bottom to top.","            //Categorical and Timeline data is displayed from top to bottom.","            if(dataType === \"numeric\")","            {","                p = (h - (padding.top + padding.bottom)) - (point.y - padding.top);","            }","            else","            {","                p = point.y - padding.top;","            }","        }","        else","        {","            p = point.x - padding.left;","        }","        return p;","    },","","    /**","     * Rotates and positions a text field.","     *","     * @method _rotate","     * @param {HTMLElement} label text field to rotate and position","     * @param {Object} props properties to be applied to the text field.","     * @private","     */","    _rotate: function(label, props)","    {","        var rot = props.rot,","            x = props.x,","            y = props.y,","            filterString,","            textAlpha,","            matrix = new Y.Matrix(),","            transformOrigin = props.transformOrigin || [0, 0],","            offsetRect;","        if(DOCUMENT.createElementNS)","        {","            matrix.translate(x, y);","            matrix.rotate(rot);","            Y_DOM.setStyle(label, \"transformOrigin\", (transformOrigin[0] * 100) + \"% \" + (transformOrigin[1] * 100) + \"%\");","            Y_DOM.setStyle(label, \"transform\", matrix.toCSSText());","        }","        else","        {","            textAlpha = props.textAlpha;","            if(Y_Lang.isNumber(textAlpha) && textAlpha < 1 && textAlpha > -1 && !isNaN(textAlpha))","            {","                filterString = \"progid:DXImageTransform.Microsoft.Alpha(Opacity=\" + Math.round(textAlpha * 100) + \")\";","            }","            if(rot !== 0)","            {","                //ms filters kind of, sort of uses a transformOrigin of 0, 0.","                //we'll translate the difference to create a true 0, 0 origin.","                matrix.rotate(rot);","                offsetRect = matrix.getContentRect(props.labelWidth, props.labelHeight);","                matrix.init();","                matrix.translate(offsetRect.left, offsetRect.top);","                matrix.translate(x, y);","                this._simulateRotateWithTransformOrigin(matrix, rot, transformOrigin, props.labelWidth, props.labelHeight);","                if(filterString)","                {","                    filterString += \" \";","                }","                else","                {","                    filterString = \"\";","                }","                filterString += matrix.toFilterText();","                label.style.left = matrix.dx + \"px\";","                label.style.top = matrix.dy + \"px\";","            }","            else","            {","                label.style.left = x + \"px\";","                label.style.top = y + \"px\";","            }","            if(filterString)","            {","                label.style.filter = filterString;","            }","        }","    },","","    /**","     * Simulates a rotation with a specified transformOrigin.","     *","     * @method _simulateTransformOrigin","     * @param {Matrix} matrix Reference to a `Matrix` instance.","     * @param {Number} rot The rotation (in degrees) that will be performed on a matrix.","     * @param {Array} transformOrigin An array represeniting the origin in which to perform the transform. The first","     * index represents the x origin and the second index represents the y origin.","     * @param {Number} w The width of the object that will be transformed.","     * @param {Number} h The height of the object that will be transformed.","     * @private","     */","    _simulateRotateWithTransformOrigin: function(matrix, rot, transformOrigin, w, h)","    {","        var transformX = transformOrigin[0] * w,","            transformY = transformOrigin[1] * h;","        transformX = !isNaN(transformX) ? transformX : 0;","        transformY = !isNaN(transformY) ? transformY : 0;","        matrix.translate(transformX, transformY);","        matrix.rotate(rot);","        matrix.translate(-transformX, -transformY);","    },","","    /**","     * Returns the coordinates (top, right, bottom, left) for the bounding box of the last label.","     *","     * @method getMaxLabelBounds","     * @return Object","     */","    getMaxLabelBounds: function()","    {","        return this._getLabelBounds(this.getMaximumValue());","    },","","    /**","     * Returns the coordinates (top, right, bottom, left) for the bounding box of the first label.","     *","     * @method getMinLabelBounds","     * @return Object","     */","    getMinLabelBounds: function()","    {","        return this._getLabelBounds(this.getMinimumValue());","    },","","    /**","     * Returns the coordinates (top, right, bottom, left) for the bounding box of a label.","     *","     * @method _getLabelBounds","     * @param {String} Value of the label","     * @return Object","     * @private","     */","    _getLabelBounds: function(val)","    {","        var layout = this._layout,","            labelStyles = this.get(\"styles\").label,","            matrix = new Y.Matrix(),","            label,","            props = this._getTextRotationProps(labelStyles);","            props.transformOrigin = layout._getTransformOrigin(props.rot);","        label = this.getLabel({x: 0, y: 0}, labelStyles);","        this.get(\"appendLabelFunction\")(label, this.get(\"labelFunction\").apply(this, [val, this.get(\"labelFormat\")]));","        props.labelWidth = label.offsetWidth;","        props.labelHeight = label.offsetHeight;","        this._removeChildren(label);","        Y.Event.purgeElement(label, true);","        label.parentNode.removeChild(label);","        props.x = 0;","        props.y = 0;","        layout._setRotationCoords(props);","        matrix.translate(props.x, props.y);","        this._simulateRotateWithTransformOrigin(matrix, props.rot, props.transformOrigin, props.labelWidth, props.labelHeight);","        return matrix.getContentRect(props.labelWidth, props.labelHeight);","    },","","    /**","     * Removes all DOM elements from an HTML element. Used to clear out labels during detruction","     * phase.","     *","     * @method _removeChildren","     * @private","     */","    _removeChildren: function(node)","    {","        if(node.hasChildNodes())","        {","            var child;","            while(node.firstChild)","            {","                child = node.firstChild;","                this._removeChildren(child);","                node.removeChild(child);","            }","        }","    },","","    /**","     * Destructor implementation Axis class. Removes all labels and the Graphic instance from the widget.","     *","     * @method destructor","     * @protected","     */","    destructor: function()","    {","        var cb = this.get(\"contentBox\").getDOMNode(),","            labels = this.get(\"labels\"),","            graphic = this.get(\"graphic\"),","            label,","            len = labels ? labels.length : 0;","        if(len > 0)","        {","            while(labels.length > 0)","            {","                label = labels.shift();","                this._removeChildren(label);","                cb.removeChild(label);","                label = null;","            }","        }","        if(graphic)","        {","            graphic.destroy();","        }","    },","","    /**","     * Length in pixels of largest text bounding box. Used to calculate the height of the axis.","     *","     * @property maxLabelSize","     * @type Number","     * @protected","     */","    _maxLabelSize: 0,","","    /**","     * Updates the content of text field. This method writes a value into a text field using","     * `appendChild`. If the value is a `String`, it is converted to a `TextNode` first.","     *","     * @method _setText","     * @param label {HTMLElement} label to be updated","     * @param val {String} value with which to update the label","     * @private","     */","    _setText: function(textField, val)","    {","        textField.innerHTML = \"\";","        if(Y_Lang.isNumber(val))","        {","            val = val + \"\";","        }","        else if(!val)","        {","            val = \"\";","        }","        if(IS_STRING(val))","        {","            val = DOCUMENT.createTextNode(val);","        }","        textField.appendChild(val);","    },","","    /**","     * Returns the total number of majorUnits that will appear on an axis.","     *","     * @method getTotalMajorUnits","     * @return Number","     */","    getTotalMajorUnits: function()","    {","        var units,","            majorUnit = this.get(\"styles\").majorUnit,","            len = this.getLength();","        if(majorUnit.determinant === \"count\")","        {","            units = majorUnit.count;","        }","        else if(majorUnit.determinant === \"distance\")","        {","            units = (len/majorUnit.distance) + 1;","        }","        return units;","    },","","    /**","     * Returns the distance between major units on an axis.","     *","     * @method getMajorUnitDistance","     * @param {Number} len Number of ticks","     * @param {Number} uiLen Size of the axis.","     * @param {Object} majorUnit Hash of properties used to determine the majorUnit","     * @return Number","     */","    getMajorUnitDistance: function(len, uiLen, majorUnit)","    {","        var dist;","        if(majorUnit.determinant === \"count\")","        {","            dist = uiLen/(len - 1);","        }","        else if(majorUnit.determinant === \"distance\")","        {","            dist = majorUnit.distance;","        }","        return dist;","    },","","    /**","     * Checks to see if data extends beyond the range of the axis. If so,","     * that data will need to be hidden. This method is internal, temporary and subject","     * to removal in the future.","     *","     * @method _hasDataOverflow","     * @protected","     * @return Boolean","     */","    _hasDataOverflow: function()","    {","        if(this.get(\"setMin\") || this.get(\"setMax\"))","        {","            return true;","        }","        return false;","    },","","    /**","     * Returns a string corresponding to the first label on an","     * axis.","     *","     * @method getMinimumValue","     * @return String","     */","    getMinimumValue: function()","    {","        return this.get(\"minimum\");","    },","","    /**","     * Returns a string corresponding to the last label on an","     * axis.","     *","     * @method getMaximumValue","     * @return String","     */","    getMaximumValue: function()","    {","        return this.get(\"maximum\");","    }","}, {","    ATTRS:","    {","        /**","         * When set, defines the width of a vertical axis instance. By default, vertical axes automatically size based","         * on their contents. When the width attribute is set, the axis will not calculate its width. When the width","         * attribute is explicitly set, axis labels will postion themselves off of the the inner edge of the axis and the","         * title, if present, will position itself off of the outer edge. If a specified width is less than the sum of","         * the axis' contents, excess content will overflow.","         *","         * @attribute width","         * @type Number","         */","        width: {","            lazyAdd: false,","","            getter: function()","            {","                if(this._explicitWidth)","                {","                    return this._explicitWidth;","                }","                return this._calculatedWidth;","            },","","            setter: function(val)","            {","                this._explicitWidth = val;","                return val;","            }","        },","","        /**","         * When set, defines the height of a horizontal axis instance. By default, horizontal axes automatically size based","         * on their contents. When the height attribute is set, the axis will not calculate its height. When the height","         * attribute is explicitly set, axis labels will postion themselves off of the the inner edge of the axis and the","         * title, if present, will position itself off of the outer edge. If a specified height is less than the sum of","         * the axis' contents, excess content will overflow.","         *","         * @attribute height","         * @type Number","         */","        height: {","            lazyAdd: false,","","            getter: function()","            {","                if(this._explicitHeight)","                {","                    return this._explicitHeight;","                }","                return this._calculatedHeight;","            },","","            setter: function(val)","            {","                this._explicitHeight = val;","                return val;","            }","        },","","        /**","         * Calculated value of an axis' width. By default, the value is used internally for vertical axes. If the `width`","         * attribute is explicitly set, this value will be ignored.","         *","         * @attribute calculatedWidth","         * @type Number","         * @private","         */","        calculatedWidth: {","            getter: function()","            {","                return this._calculatedWidth;","            },","","            setter: function(val)","            {","                this._calculatedWidth = val;","                return val;","            }","        },","","        /**","         * Calculated value of an axis' height. By default, the value is used internally for horizontal axes. If the `height`","         * attribute is explicitly set, this value will be ignored.","         *","         * @attribute calculatedHeight","         * @type Number","         * @private","         */","        calculatedHeight: {","            getter: function()","            {","                return this._calculatedHeight;","            },","","            setter: function(val)","            {","                this._calculatedHeight = val;","                return val;","            }","        },","","        /**","         * Difference betweend the first/last tick and edge of axis.","         *","         * @attribute edgeOffset","         * @type Number","         * @protected","         */","        edgeOffset:","        {","            value: 0","        },","","        /**","         * The graphic in which the axis line and ticks will be rendered.","         *","         * @attribute graphic","         * @type Graphic","         */","        graphic: {},","","        /**","         *  @attribute path","         *  @type Shape","         *  @readOnly","         *  @private","         */","        path: {","            readOnly: true,","","            getter: function()","            {","                if(!this._path)","                {","                    var graphic = this.get(\"graphic\");","                    if(graphic)","                    {","                        this._path = graphic.addShape({type:\"path\"});","                    }","                }","                return this._path;","            }","        },","","        /**","         *  @attribute tickPath","         *  @type Shape","         *  @readOnly","         *  @private","         */","        tickPath: {","            readOnly: true,","","            getter: function()","            {","                if(!this._tickPath)","                {","                    var graphic = this.get(\"graphic\");","                    if(graphic)","                    {","                        this._tickPath = graphic.addShape({type:\"path\"});","                    }","                }","                return this._tickPath;","            }","        },","","        /**","         * Contains the contents of the axis.","         *","         * @attribute node","         * @type HTMLElement","         */","        node: {},","","        /**","         * Direction of the axis.","         *","         * @attribute position","         * @type String","         */","        position: {","            setter: function(val)","            {","                var layoutClass = this._layoutClasses[val];","                if(val && val != \"none\")","                {","                    this._layout = new layoutClass();","                }","                return val;","            }","        },","","        /**","         * Distance determined by the tick styles used to calculate the distance between the axis","         * line in relation to the top of the axis.","         *","         * @attribute topTickOffset","         * @type Number","         */","        topTickOffset: {","            value: 0","        },","","        /**","         * Distance determined by the tick styles used to calculate the distance between the axis","         * line in relation to the bottom of the axis.","         *","         * @attribute bottomTickOffset","         * @type Number","         */","        bottomTickOffset: {","            value: 0","        },","","        /**","         * Distance determined by the tick styles used to calculate the distance between the axis","         * line in relation to the left of the axis.","         *","         * @attribute leftTickOffset","         * @type Number","         */","        leftTickOffset: {","            value: 0","        },","","        /**","         * Distance determined by the tick styles used to calculate the distance between the axis","         * line in relation to the right side of the axis.","         *","         * @attribute rightTickOffset","         * @type Number","         */","        rightTickOffset: {","            value: 0","        },","","        /**","         * Collection of labels used to render the axis.","         *","         * @attribute labels","         * @type Array","         */","        labels: {","            readOnly: true,","            getter: function()","            {","                return this._labels;","            }","        },","","        /**","         * Collection of points used for placement of labels and ticks along the axis.","         *","         * @attribute tickPoints","         * @type Array","         */","        tickPoints: {","            readOnly: true,","","            getter: function()","            {","                if(this.get(\"position\") == \"none\")","                {","                    return this.get(\"styles\").majorUnit.count;","                }","                return this._tickPoints;","            }","        },","","        /**","         * Indicates whether the axis overlaps the graph. If an axis is the inner most axis on a given","         * position and the tick position is inside or cross, the axis will need to overlap the graph.","         *","         * @attribute overlapGraph","         * @type Boolean","         */","        overlapGraph: {","            value:true,","","            validator: function(val)","            {","                return Y_Lang.isBoolean(val);","            }","        },","","        /**","         * Length in pixels of largest text bounding box. Used to calculate the height of the axis.","         *","         * @attribute maxLabelSize","         * @type Number","         * @protected","         */","        maxLabelSize: {","            getter: function()","            {","                return this._maxLabelSize;","            },","","            setter: function(val)","            {","                this._maxLabelSize = val;","                return val;","            }","        },","","        /**","         *  Title for the axis. When specified, the title will display. The position of the title is determined by the axis position.","         *  <dl>","         *      <dt>top</dt><dd>Appears above the axis and it labels. The default rotation is 0.</dd>","         *      <dt>right</dt><dd>Appears to the right of the axis and its labels. The default rotation is 90.</dd>","         *      <dt>bottom</dt><dd>Appears below the axis and its labels. The default rotation is 0.</dd>","         *      <dt>left</dt><dd>Appears to the left of the axis and its labels. The default rotation is -90.</dd>","         *  </dl>","         *","         *  @attribute title","         *  @type String","         */","        title: {","            value: null","        },","","        /**","         * Function used to append an axis value to an axis label. This function has the following signature:","         *  <dl>","         *      <dt>textField</dt><dd>The axis label to be appended. (`HTMLElement`)</dd>","         *      <dt>val</dt><dd>The value to attach to the text field. This method will accept an `HTMLELement`","         *      or a `String`. This method does not use (`HTMLElement` | `String`)</dd>","         *  </dl>","         * The default method appends a value to the `HTMLElement` using the `appendChild` method. If the given","         * value is a `String`, the method will convert the the value to a `textNode` before appending to the","         * `HTMLElement`. This method will not convert an `HTMLString` to an `HTMLElement`.","         *","         * @attribute appendLabelFunction","         * @type Function","         */","        appendLabelFunction: {","            valueFn: function()","            {","                return this._setText;","            }","        },","","        /**","         * Function used to append a title value to the title object. This function has the following signature:","         *  <dl>","         *      <dt>textField</dt><dd>The title text field to be appended. (`HTMLElement`)</dd>","         *      <dt>val</dt><dd>The value to attach to the text field. This method will accept an `HTMLELement`","         *      or a `String`. This method does not use (`HTMLElement` | `String`)</dd>","         *  </dl>","         * The default method appends a value to the `HTMLElement` using the `appendChild` method. If the given","         * value is a `String`, the method will convert the the value to a `textNode` before appending to the","         * `HTMLElement` element. This method will not convert an `HTMLString` to an `HTMLElement`.","         *","         * @attribute appendTitleFunction","         * @type Function","         */","        appendTitleFunction: {","            valueFn: function()","            {","                return this._setText;","            }","        }","","        /**","         * Style properties used for drawing an axis. This attribute is inherited from `Renderer`. Below are the default values:","         *  <dl>","         *      <dt>majorTicks</dt><dd>Properties used for drawing ticks.","         *          <dl>","         *              <dt>display</dt><dd>Position of the tick. Possible values are `inside`, `outside`, `cross` and `none`.","         *              The default value is `inside`.</dd>","         *              <dt>length</dt><dd>The length (in pixels) of the tick. The default value is 4.</dd>","         *              <dt>color</dt><dd>The color of the tick. The default value is `#dad8c9`</dd>","         *              <dt>weight</dt><dd>Number indicating the width of the tick. The default value is 1.</dd>","         *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the tick. The default value is 1.</dd>","         *          </dl>","         *      </dd>","         *      <dt>line</dt><dd>Properties used for drawing the axis line.","         *          <dl>","         *              <dt>weight</dt><dd>Number indicating the width of the axis line. The default value is 1.</dd>","         *              <dt>color</dt><dd>The color of the axis line. The default value is `#dad8c9`.</dd>","         *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the tick. The default value is 1.</dd>","         *          </dl>","         *      </dd>","         *      <dt>majorUnit</dt><dd>Properties used to calculate the `majorUnit` for the axis.","         *          <dl>","         *              <dt>determinant</dt><dd>The algorithm used for calculating distance between ticks. The possible options are","         *              `count` and `distance`. If the `determinant` is `count`, the axis ticks will spaced so that a specified number","         *              of ticks appear on the axis. If the `determinant` is `distance`, the axis ticks will spaced out according to","         *              the specified distance. The default value is `count`.</dd>","         *              <dt>count</dt><dd>Number of ticks to appear on the axis when the `determinant` is `count`. The default value is 11.</dd>","         *              <dt>distance</dt><dd>The distance (in pixels) between ticks when the `determinant` is `distance`. The default","         *              value is 75.</dd>","         *          </dl>","         *      </dd>","         *      <dt>label</dt><dd>Properties and styles applied to the axis labels.","         *          <dl>","         *              <dt>color</dt><dd>The color of the labels. The default value is `#808080`.</dd>","         *              <dt>alpha</dt><dd>Number between 0 and 1 indicating the opacity of the labels. The default value is 1.</dd>","         *              <dt>fontSize</dt><dd>The font-size of the labels. The default value is 85%</dd>","         *              <dt>rotation</dt><dd>The rotation, in degrees (between -90 and 90) of the labels. The default value is 0.</dd>","         *              <dt>margin</dt><dd>The distance between the label and the axis/tick. Depending on the position of the `Axis`,","         *              only one of the properties used.","         *                  <dl>","         *                      <dt>top</dt><dd>Pixel value used for an axis with a `position` of `bottom`. The default value is 4.</dd>","         *                      <dt>right</dt><dd>Pixel value used for an axis with a `position` of `left`. The default value is 4.</dd>","         *                      <dt>bottom</dt><dd>Pixel value used for an axis with a `position` of `top`. The default value is 4.</dd>","         *                      <dt>left</dt><dd>Pixel value used for an axis with a `position` of `right`. The default value is 4.</dd>","         *                  </dl>","         *              </dd>","         *          </dl>","         *      </dd>","         *  </dl>","         *","         * @attribute styles","         * @type Object","         */","    }","});","Y.AxisType = Y.Base.create(\"baseAxis\", Y.Axis, [], {});","","","}, '@VERSION@', {\"requires\": [\"dom\", \"widget\", \"widget-position\", \"widget-stack\", \"graphics\", \"axis-base\"]});"];
_yuitest_coverage["build/axis/axis.js"].lines = {"1":0,"9":0,"28":0,"30":0,"40":0,"56":0,"61":0,"62":0,"64":0,"67":0,"68":0,"69":0,"71":0,"72":0,"73":0,"75":0,"76":0,"77":0,"79":0,"80":0,"81":0,"96":0,"102":0,"114":0,"120":0,"122":0,"124":0,"126":0,"128":0,"141":0,"153":0,"160":0,"162":0,"164":0,"166":0,"170":0,"172":0,"184":0,"186":0,"191":0,"192":0,"194":0,"206":0,"215":0,"216":0,"217":0,"219":0,"221":0,"222":0,"223":0,"224":0,"238":0,"249":0,"251":0,"252":0,"254":0,"256":0,"258":0,"260":0,"261":0,"265":0,"266":0,"268":0,"269":0,"270":0,"271":0,"272":0,"284":0,"290":0,"292":0,"293":0,"295":0,"297":0,"298":0,"300":0,"302":0,"303":0,"307":0,"308":0,"310":0,"311":0,"325":0,"326":0,"328":0,"330":0,"332":0,"334":0,"336":0,"340":0,"342":0,"364":0,"372":0,"374":0,"376":0,"377":0,"381":0,"389":0,"391":0,"401":0,"417":0,"422":0,"423":0,"425":0,"428":0,"429":0,"430":0,"432":0,"433":0,"434":0,"436":0,"437":0,"438":0,"440":0,"441":0,"442":0,"457":0,"463":0,"475":0,"482":0,"484":0,"486":0,"488":0,"490":0,"503":0,"515":0,"522":0,"524":0,"526":0,"528":0,"532":0,"534":0,"546":0,"548":0,"553":0,"554":0,"556":0,"568":0,"577":0,"578":0,"579":0,"581":0,"583":0,"584":0,"585":0,"586":0,"600":0,"611":0,"613":0,"615":0,"617":0,"619":0,"621":0,"622":0,"624":0,"626":0,"630":0,"631":0,"633":0,"634":0,"635":0,"636":0,"637":0,"638":0,"639":0,"651":0,"657":0,"659":0,"661":0,"663":0,"664":0,"666":0,"668":0,"672":0,"673":0,"675":0,"676":0,"690":0,"691":0,"693":0,"695":0,"697":0,"699":0,"701":0,"705":0,"707":0,"719":0,"722":0,"733":0,"738":0,"740":0,"742":0,"743":0,"747":0,"755":0,"757":0,"767":0,"783":0,"788":0,"789":0,"791":0,"794":0,"795":0,"796":0,"798":0,"799":0,"800":0,"802":0,"803":0,"804":0,"806":0,"807":0,"808":0,"820":0,"826":0,"828":0,"830":0,"832":0,"834":0,"848":0,"854":0,"867":0,"879":0,"886":0,"888":0,"890":0,"892":0,"896":0,"898":0,"910":0,"912":0,"917":0,"918":0,"920":0,"932":0,"941":0,"942":0,"943":0,"945":0,"947":0,"948":0,"949":0,"950":0,"964":0,"975":0,"977":0,"979":0,"981":0,"983":0,"985":0,"986":0,"990":0,"992":0,"993":0,"994":0,"995":0,"996":0,"997":0,"998":0,"1010":0,"1017":0,"1019":0,"1020":0,"1022":0,"1024":0,"1025":0,"1029":0,"1030":0,"1032":0,"1033":0,"1047":0,"1048":0,"1050":0,"1052":0,"1054":0,"1058":0,"1060":0,"1072":0,"1073":0,"1084":0,"1089":0,"1091":0,"1093":0,"1096":0,"1104":0,"1106":0,"1116":0,"1132":0,"1137":0,"1138":0,"1139":0,"1142":0,"1143":0,"1144":0,"1146":0,"1147":0,"1148":0,"1150":0,"1151":0,"1152":0,"1154":0,"1155":0,"1156":0,"1168":0,"1175":0,"1177":0,"1179":0,"1181":0,"1183":0,"1197":0,"1203":0,"1216":0,"1228":0,"1235":0,"1237":0,"1239":0,"1241":0,"1245":0,"1247":0,"1259":0,"1261":0,"1266":0,"1267":0,"1269":0,"1281":0,"1290":0,"1291":0,"1292":0,"1294":0,"1296":0,"1297":0,"1298":0,"1299":0,"1313":0,"1323":0,"1325":0,"1326":0,"1330":0,"1332":0,"1333":0,"1335":0,"1337":0,"1339":0,"1341":0,"1342":0,"1346":0,"1349":0,"1350":0,"1351":0,"1352":0,"1353":0,"1365":0,"1371":0,"1373":0,"1374":0,"1378":0,"1380":0,"1381":0,"1383":0,"1385":0,"1387":0,"1389":0,"1390":0,"1394":0,"1397":0,"1398":0,"1412":0,"1413":0,"1415":0,"1419":0,"1421":0,"1423":0,"1425":0,"1427":0,"1429":0,"1433":0,"1436":0,"1458":0,"1466":0,"1468":0,"1470":0,"1471":0,"1474":0,"1490":0,"1502":0,"1504":0,"1513":0,"1514":0,"1515":0,"1516":0,"1517":0,"1518":0,"1519":0,"1520":0,"1521":0,"1550":0,"1552":0,"1565":0,"1566":0,"1578":0,"1579":0,"1581":0,"1583":0,"1588":0,"1590":0,"1604":0,"1606":0,"1616":0,"1625":0,"1631":0,"1633":0,"1634":0,"1635":0,"1636":0,"1638":0,"1640":0,"1642":0,"1643":0,"1647":0,"1658":0,"1664":0,"1665":0,"1666":0,"1667":0,"1668":0,"1670":0,"1674":0,"1676":0,"1677":0,"1678":0,"1679":0,"1680":0,"1693":0,"1748":0,"1760":0,"1765":0,"1766":0,"1767":0,"1769":0,"1799":0,"1800":0,"1813":0,"1815":0,"1818":0,"1819":0,"1821":0,"1822":0,"1824":0,"1825":0,"1828":0,"1833":0,"1851":0,"1853":0,"1854":0,"1856":0,"1857":0,"1858":0,"1860":0,"1886":0,"1887":0,"1888":0,"1889":0,"1890":0,"1895":0,"1896":0,"1897":0,"1898":0,"1899":0,"1900":0,"1901":0,"1902":0,"1903":0,"1905":0,"1909":0,"1910":0,"1911":0,"1913":0,"1914":0,"1915":0,"1920":0,"1922":0,"1923":0,"1924":0,"1925":0,"1926":0,"1927":0,"1928":0,"1929":0,"1931":0,"1933":0,"1935":0,"1936":0,"1937":0,"1938":0,"1939":0,"1940":0,"1941":0,"1942":0,"1944":0,"1946":0,"1947":0,"1948":0,"1950":0,"1951":0,"1953":0,"1955":0,"1956":0,"1958":0,"1960":0,"1962":0,"1966":0,"1967":0,"1969":0,"1973":0,"1974":0,"1987":0,"1996":0,"1997":0,"1998":0,"2000":0,"2001":0,"2003":0,"2008":0,"2009":0,"2011":0,"2014":0,"2015":0,"2026":0,"2030":0,"2032":0,"2033":0,"2035":0,"2037":0,"2038":0,"2040":0,"2042":0,"2054":0,"2060":0,"2062":0,"2067":0,"2068":0,"2070":0,"2071":0,"2072":0,"2073":0,"2074":0,"2076":0,"2078":0,"2080":0,"2083":0,"2084":0,"2086":0,"2088":0,"2091":0,"2092":0,"2093":0,"2094":0,"2096":0,"2098":0,"2099":0,"2101":0,"2103":0,"2104":0,"2119":0,"2127":0,"2129":0,"2133":0,"2134":0,"2135":0,"2137":0,"2139":0,"2141":0,"2144":0,"2145":0,"2146":0,"2147":0,"2149":0,"2151":0,"2154":0,"2165":0,"2167":0,"2169":0,"2174":0,"2176":0,"2187":0,"2189":0,"2192":0,"2194":0,"2195":0,"2196":0,"2197":0,"2200":0,"2212":0,"2215":0,"2217":0,"2221":0,"2234":0,"2240":0,"2242":0,"2246":0,"2248":0,"2261":0,"2265":0,"2267":0,"2271":0,"2273":0,"2287":0,"2288":0,"2290":0,"2294":0,"2296":0,"2308":0,"2312":0,"2314":0,"2318":0,"2331":0,"2337":0,"2341":0,"2343":0,"2347":0,"2352":0,"2354":0,"2367":0,"2375":0,"2377":0,"2378":0,"2379":0,"2380":0,"2384":0,"2385":0,"2387":0,"2389":0,"2393":0,"2394":0,"2395":0,"2396":0,"2397":0,"2398":0,"2399":0,"2401":0,"2405":0,"2407":0,"2408":0,"2409":0,"2413":0,"2414":0,"2416":0,"2418":0,"2437":0,"2439":0,"2440":0,"2441":0,"2442":0,"2443":0,"2454":0,"2465":0,"2478":0,"2483":0,"2484":0,"2485":0,"2486":0,"2487":0,"2488":0,"2489":0,"2490":0,"2491":0,"2492":0,"2493":0,"2494":0,"2495":0,"2496":0,"2508":0,"2510":0,"2511":0,"2513":0,"2514":0,"2515":0,"2528":0,"2533":0,"2535":0,"2537":0,"2538":0,"2539":0,"2540":0,"2543":0,"2545":0,"2569":0,"2570":0,"2572":0,"2574":0,"2576":0,"2578":0,"2580":0,"2582":0,"2593":0,"2596":0,"2598":0,"2600":0,"2602":0,"2604":0,"2618":0,"2619":0,"2621":0,"2623":0,"2625":0,"2627":0,"2641":0,"2643":0,"2645":0,"2657":0,"2669":0,"2689":0,"2691":0,"2693":0,"2698":0,"2699":0,"2718":0,"2720":0,"2722":0,"2727":0,"2728":0,"2743":0,"2748":0,"2749":0,"2764":0,"2769":0,"2770":0,"2805":0,"2807":0,"2808":0,"2810":0,"2813":0,"2828":0,"2830":0,"2831":0,"2833":0,"2836":0,"2857":0,"2858":0,"2860":0,"2862":0,"2920":0,"2935":0,"2937":0,"2939":0,"2955":0,"2969":0,"2974":0,"2975":0,"3012":0,"3033":0,"3092":0};
_yuitest_coverage["build/axis/axis.js"].functions = {"_getDefaultMargins:38":0,"setTickOffsets:54":0,"drawTick:94":0,"getLineStart:112":0,"getLabelPoint:139":0,"updateMaxLabelSize:151":0,"getExplicitlySized:182":0,"positionTitle:204":0,"positionLabel:236":0,"_setRotationCoords:282":0,"_getTransformOrigin:323":0,"setCalculatedSize:362":0,"_getDefaultMargins:399":0,"setTickOffsets:415":0,"drawTick:455":0,"getLineStart:473":0,"getLabelPoint:501":0,"updateMaxLabelSize:513":0,"getExplicitlySized:544":0,"positionTitle:566":0,"positionLabel:598":0,"_setRotationCoords:649":0,"_getTransformOrigin:688":0,"offsetNodeForTick:717":0,"setCalculatedSize:731":0,"_getDefaultMargins:765":0,"setTickOffsets:781":0,"getLineStart:818":0,"drawTick:846":0,"getLabelPoint:865":0,"updateMaxLabelSize:877":0,"getExplicitlySized:908":0,"positionTitle:930":0,"positionLabel:962":0,"_setRotationCoords:1008":0,"_getTransformOrigin:1045":0,"offsetNodeForTick:1070":0,"setCalculatedSize:1082":0,"_getDefaultMargins:1114":0,"setTickOffsets:1130":0,"getLineStart:1166":0,"drawTick:1195":0,"getLabelPoint:1214":0,"updateMaxLabelSize:1226":0,"getExplicitlySized:1257":0,"positionTitle:1279":0,"positionLabel:1311":0,"_setRotationCoords:1363":0,"_getTransformOrigin:1410":0,"setCalculatedSize:1456":0,"getLabelByIndex:1500":0,"bindUI:1511":0,"_dataChangeHandler:1548":0,"_positionChangeHandler:1563":0,"_updateGraphic:1576":0,"_updateHandler:1602":0,"renderUI:1614":0,"syncUI:1623":0,"_setCanvas:1656":0,"_getDefaultStyles:1691":0,"_handleSizeChange:1758":0,"drawLine:1797":0,"_getTextRotationProps:1811":0,"_drawAxis:1849":0,"_setTotalTitleSize:1985":0,"_updatePathElement:2024":0,"_setTitle:2052":0,"getLabel:2117":0,"_createLabelCache:2163":0,"_clearLabelCache:2185":0,"getLineEnd:2210":0,"getLength:2232":0,"getFirstPoint:2259":0,"getNextPoint:2285":0,"getLastPoint:2306":0,"getPosition:2329":0,"_rotate:2365":0,"_simulateRotateWithTransformOrigin:2435":0,"getMaxLabelBounds:2452":0,"getMinLabelBounds:2463":0,"_getLabelBounds:2476":0,"_removeChildren:2506":0,"destructor:2526":0,"_setText:2567":0,"getTotalMajorUnits:2591":0,"getMajorUnitDistance:2616":0,"_hasDataOverflow:2639":0,"getMinimumValue:2655":0,"getMaximumValue:2667":0,"getter:2687":0,"setter:2696":0,"getter:2716":0,"setter:2725":0,"getter:2741":0,"setter:2746":0,"getter:2762":0,"setter:2767":0,"getter:2803":0,"getter:2826":0,"setter:2855":0,"getter:2918":0,"getter:2933":0,"validator:2953":0,"getter:2967":0,"setter:2972":0,"valueFn:3010":0,"valueFn:3031":0,"(anonymous 1):1":0};
_yuitest_coverage["build/axis/axis.js"].coveredLines = 751;
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
    WINDOW = CONFIG.win,
    DOCUMENT = CONFIG.doc,
    Y_Lang = Y.Lang,
    IS_STRING = Y_Lang.isString,
    Y_DOM = Y.DOM,
    LeftAxisLayout,
    RightAxisLayout,
    BottomAxisLayout,
    TopAxisLayout,
    _getClassName = Y.ClassNameManager.getClassName,
    SERIES_MARKER = _getClassName("seriesmarker");
/**
 * Algorithmic strategy for rendering a left axis.
 *
 * @class LeftAxisLayout
 * @constructor
 * @submodule axis
 */
_yuitest_coverline("build/axis/axis.js", 28);
LeftAxisLayout = function() {};

_yuitest_coverline("build/axis/axis.js", 30);
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
        _yuitest_coverfunc("build/axis/axis.js", "_getDefaultMargins", 38);
_yuitest_coverline("build/axis/axis.js", 40);
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
        _yuitest_coverfunc("build/axis/axis.js", "setTickOffsets", 54);
_yuitest_coverline("build/axis/axis.js", 56);
var host = this,
            majorTicks = host.get("styles").majorTicks,
            tickLength = majorTicks.length,
            halfTick = tickLength * 0.5,
            display = majorTicks.display;
        _yuitest_coverline("build/axis/axis.js", 61);
host.set("topTickOffset",  0);
        _yuitest_coverline("build/axis/axis.js", 62);
host.set("bottomTickOffset",  0);

        _yuitest_coverline("build/axis/axis.js", 64);
switch(display)
        {
            case "inside" :
                _yuitest_coverline("build/axis/axis.js", 67);
host.set("rightTickOffset",  tickLength);
                _yuitest_coverline("build/axis/axis.js", 68);
host.set("leftTickOffset", 0);
            _yuitest_coverline("build/axis/axis.js", 69);
break;
            case "outside" :
                _yuitest_coverline("build/axis/axis.js", 71);
host.set("rightTickOffset", 0);
                _yuitest_coverline("build/axis/axis.js", 72);
host.set("leftTickOffset",  tickLength);
            _yuitest_coverline("build/axis/axis.js", 73);
break;
            case "cross":
                _yuitest_coverline("build/axis/axis.js", 75);
host.set("rightTickOffset", halfTick);
                _yuitest_coverline("build/axis/axis.js", 76);
host.set("leftTickOffset",  halfTick);
            _yuitest_coverline("build/axis/axis.js", 77);
break;
            default:
                _yuitest_coverline("build/axis/axis.js", 79);
host.set("rightTickOffset", 0);
                _yuitest_coverline("build/axis/axis.js", 80);
host.set("leftTickOffset", 0);
            _yuitest_coverline("build/axis/axis.js", 81);
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
        _yuitest_coverfunc("build/axis/axis.js", "drawTick", 94);
_yuitest_coverline("build/axis/axis.js", 96);
var host = this,
            style = host.get("styles"),
            padding = style.padding,
            tickLength = tickStyles.length,
            start = {x:padding.left, y:pt.y},
            end = {x:tickLength + padding.left, y:pt.y};
        _yuitest_coverline("build/axis/axis.js", 102);
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
        _yuitest_coverfunc("build/axis/axis.js", "getLineStart", 112);
_yuitest_coverline("build/axis/axis.js", 114);
var style = this.get("styles"),
            padding = style.padding,
            majorTicks = style.majorTicks,
            tickLength = majorTicks.length,
            display = majorTicks.display,
            pt = {x:padding.left, y:0};
        _yuitest_coverline("build/axis/axis.js", 120);
if(display === "outside")
        {
            _yuitest_coverline("build/axis/axis.js", 122);
pt.x += tickLength;
        }
        else {_yuitest_coverline("build/axis/axis.js", 124);
if(display === "cross")
        {
            _yuitest_coverline("build/axis/axis.js", 126);
pt.x += tickLength/2;
        }}
        _yuitest_coverline("build/axis/axis.js", 128);
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
        _yuitest_coverfunc("build/axis/axis.js", "getLabelPoint", 139);
_yuitest_coverline("build/axis/axis.js", 141);
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
        _yuitest_coverfunc("build/axis/axis.js", "updateMaxLabelSize", 151);
_yuitest_coverline("build/axis/axis.js", 153);
var host = this,
            props = this._labelRotationProps,
            rot = props.rot,
            absRot = props.absRot,
            sinRadians = props.sinRadians,
            cosRadians = props.cosRadians,
            max;
        _yuitest_coverline("build/axis/axis.js", 160);
if(rot === 0)
        {
            _yuitest_coverline("build/axis/axis.js", 162);
max = labelWidth;
        }
        else {_yuitest_coverline("build/axis/axis.js", 164);
if(absRot === 90)
        {
            _yuitest_coverline("build/axis/axis.js", 166);
max = labelHeight;
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 170);
max = (cosRadians * labelWidth) + (sinRadians * labelHeight);
        }}
        _yuitest_coverline("build/axis/axis.js", 172);
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
        _yuitest_coverfunc("build/axis/axis.js", "getExplicitlySized", 182);
_yuitest_coverline("build/axis/axis.js", 184);
if(this._explicitWidth)
        {
            _yuitest_coverline("build/axis/axis.js", 186);
var host = this,
                w = host._explicitWidth,
                totalTitleSize = host._totalTitleSize,
                leftTickOffset = host.get("leftTickOffset"),
                margin = styles.label.margin.right;
            _yuitest_coverline("build/axis/axis.js", 191);
host._maxLabelSize =  w - (leftTickOffset + margin + totalTitleSize);
            _yuitest_coverline("build/axis/axis.js", 192);
return true;
        }
        _yuitest_coverline("build/axis/axis.js", 194);
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
        _yuitest_coverfunc("build/axis/axis.js", "positionTitle", 204);
_yuitest_coverline("build/axis/axis.js", 206);
var host = this,
            bounds = host._titleBounds,
            margin = host.get("styles").title.margin,
            props = host._titleRotationProps,
            w = bounds.right - bounds.left,
            labelWidth = label.offsetWidth,
            labelHeight = label.offsetHeight,
            x = (labelWidth * -0.5) + (w * 0.5),
            y = (host.get("height") * 0.5) - (labelHeight * 0.5);
        _yuitest_coverline("build/axis/axis.js", 215);
props.labelWidth = labelWidth;
        _yuitest_coverline("build/axis/axis.js", 216);
props.labelHeight = labelHeight;
        _yuitest_coverline("build/axis/axis.js", 217);
if(margin && margin.left)
        {
            _yuitest_coverline("build/axis/axis.js", 219);
x += margin.left;
        }
        _yuitest_coverline("build/axis/axis.js", 221);
props.x = x;
        _yuitest_coverline("build/axis/axis.js", 222);
props.y = y;
        _yuitest_coverline("build/axis/axis.js", 223);
props.transformOrigin = [0.5, 0.5];
        _yuitest_coverline("build/axis/axis.js", 224);
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
        _yuitest_coverfunc("build/axis/axis.js", "positionLabel", 236);
_yuitest_coverline("build/axis/axis.js", 238);
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
        _yuitest_coverline("build/axis/axis.js", 249);
if(rot === 0)
        {
            _yuitest_coverline("build/axis/axis.js", 251);
leftOffset -= labelWidth;
            _yuitest_coverline("build/axis/axis.js", 252);
topOffset -= labelHeight * 0.5;
        }
        else {_yuitest_coverline("build/axis/axis.js", 254);
if(rot === 90)
        {
            _yuitest_coverline("build/axis/axis.js", 256);
leftOffset -= labelWidth * 0.5;
        }
        else {_yuitest_coverline("build/axis/axis.js", 258);
if(rot === -90)
        {
            _yuitest_coverline("build/axis/axis.js", 260);
leftOffset -= labelWidth * 0.5;
            _yuitest_coverline("build/axis/axis.js", 261);
topOffset -= labelHeight;
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 265);
leftOffset -= labelWidth + (labelHeight * absRot/360);
            _yuitest_coverline("build/axis/axis.js", 266);
topOffset -= labelHeight * 0.5;
        }}}
        _yuitest_coverline("build/axis/axis.js", 268);
props.labelWidth = labelWidth;
        _yuitest_coverline("build/axis/axis.js", 269);
props.labelHeight = labelHeight;
        _yuitest_coverline("build/axis/axis.js", 270);
props.x = Math.round(maxLabelSize + leftOffset);
        _yuitest_coverline("build/axis/axis.js", 271);
props.y = Math.round(topOffset);
        _yuitest_coverline("build/axis/axis.js", 272);
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
        _yuitest_coverfunc("build/axis/axis.js", "_setRotationCoords", 282);
_yuitest_coverline("build/axis/axis.js", 284);
var rot = props.rot,
            absRot = props.absRot,
            leftOffset,
            topOffset,
            labelWidth = props.labelWidth,
            labelHeight = props.labelHeight;
        _yuitest_coverline("build/axis/axis.js", 290);
if(rot === 0)
        {
            _yuitest_coverline("build/axis/axis.js", 292);
leftOffset = labelWidth;
            _yuitest_coverline("build/axis/axis.js", 293);
topOffset = labelHeight * 0.5;
        }
        else {_yuitest_coverline("build/axis/axis.js", 295);
if(rot === 90)
        {
            _yuitest_coverline("build/axis/axis.js", 297);
topOffset = 0;
            _yuitest_coverline("build/axis/axis.js", 298);
leftOffset = labelWidth * 0.5;
        }
        else {_yuitest_coverline("build/axis/axis.js", 300);
if(rot === -90)
        {
            _yuitest_coverline("build/axis/axis.js", 302);
leftOffset = labelWidth * 0.5;
            _yuitest_coverline("build/axis/axis.js", 303);
topOffset = labelHeight;
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 307);
leftOffset = labelWidth + (labelHeight * absRot/360);
            _yuitest_coverline("build/axis/axis.js", 308);
topOffset = labelHeight * 0.5;
        }}}
        _yuitest_coverline("build/axis/axis.js", 310);
props.x -= leftOffset;
        _yuitest_coverline("build/axis/axis.js", 311);
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
        _yuitest_coverfunc("build/axis/axis.js", "_getTransformOrigin", 323);
_yuitest_coverline("build/axis/axis.js", 325);
var transformOrigin;
        _yuitest_coverline("build/axis/axis.js", 326);
if(rot === 0)
        {
            _yuitest_coverline("build/axis/axis.js", 328);
transformOrigin = [0, 0];
        }
        else {_yuitest_coverline("build/axis/axis.js", 330);
if(rot === 90)
        {
            _yuitest_coverline("build/axis/axis.js", 332);
transformOrigin = [0.5, 0];
        }
        else {_yuitest_coverline("build/axis/axis.js", 334);
if(rot === -90)
        {
            _yuitest_coverline("build/axis/axis.js", 336);
transformOrigin = [0.5, 1];
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 340);
transformOrigin = [1, 0.5];
        }}}
        _yuitest_coverline("build/axis/axis.js", 342);
return transformOrigin;
    },

    /**
     * Adjust the position of the Axis widget's content box for internal axes.
     *
     * @method offsetNodeForTick
     * @param {Node} cb Content box of the Axis.
     * @protected
     */
    offsetNodeForTick: function(cb)
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
        _yuitest_coverfunc("build/axis/axis.js", "setCalculatedSize", 362);
_yuitest_coverline("build/axis/axis.js", 364);
var host = this,
            graphic = this.get("graphic"),
            style = host.get("styles"),
            label = style.label,
            tickOffset = host.get("leftTickOffset"),
            max = host._maxLabelSize,
            totalTitleSize = this._totalTitleSize,
            ttl = Math.round(totalTitleSize + tickOffset + max + label.margin.right);
        _yuitest_coverline("build/axis/axis.js", 372);
if(this._explicitWidth)
        {
            _yuitest_coverline("build/axis/axis.js", 374);
ttl = this._explicitWidth;
        }
        _yuitest_coverline("build/axis/axis.js", 376);
this.set("calculatedWidth", ttl);
        _yuitest_coverline("build/axis/axis.js", 377);
graphic.set("x", ttl - tickOffset);
    }
};

_yuitest_coverline("build/axis/axis.js", 381);
Y.LeftAxisLayout = LeftAxisLayout;
/**
 * RightAxisLayout contains algorithms for rendering a right axis.
 *
 * @class RightAxisLayout
 * @constructor
 * @submodule axis
 */
_yuitest_coverline("build/axis/axis.js", 389);
RightAxisLayout = function(){};

_yuitest_coverline("build/axis/axis.js", 391);
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
        _yuitest_coverfunc("build/axis/axis.js", "_getDefaultMargins", 399);
_yuitest_coverline("build/axis/axis.js", 401);
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
        _yuitest_coverfunc("build/axis/axis.js", "setTickOffsets", 415);
_yuitest_coverline("build/axis/axis.js", 417);
var host = this,
            majorTicks = host.get("styles").majorTicks,
            tickLength = majorTicks.length,
            halfTick = tickLength * 0.5,
            display = majorTicks.display;
        _yuitest_coverline("build/axis/axis.js", 422);
host.set("topTickOffset",  0);
        _yuitest_coverline("build/axis/axis.js", 423);
host.set("bottomTickOffset",  0);

        _yuitest_coverline("build/axis/axis.js", 425);
switch(display)
        {
            case "inside" :
                _yuitest_coverline("build/axis/axis.js", 428);
host.set("leftTickOffset", tickLength);
                _yuitest_coverline("build/axis/axis.js", 429);
host.set("rightTickOffset", 0);
            _yuitest_coverline("build/axis/axis.js", 430);
break;
            case "outside" :
                _yuitest_coverline("build/axis/axis.js", 432);
host.set("leftTickOffset", 0);
                _yuitest_coverline("build/axis/axis.js", 433);
host.set("rightTickOffset", tickLength);
            _yuitest_coverline("build/axis/axis.js", 434);
break;
            case "cross" :
                _yuitest_coverline("build/axis/axis.js", 436);
host.set("rightTickOffset", halfTick);
                _yuitest_coverline("build/axis/axis.js", 437);
host.set("leftTickOffset", halfTick);
            _yuitest_coverline("build/axis/axis.js", 438);
break;
            default:
                _yuitest_coverline("build/axis/axis.js", 440);
host.set("leftTickOffset", 0);
                _yuitest_coverline("build/axis/axis.js", 441);
host.set("rightTickOffset", 0);
            _yuitest_coverline("build/axis/axis.js", 442);
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
        _yuitest_coverfunc("build/axis/axis.js", "drawTick", 455);
_yuitest_coverline("build/axis/axis.js", 457);
var host = this,
            style = host.get("styles"),
            padding = style.padding,
            tickLength = tickStyles.length,
            start = {x:padding.left, y:pt.y},
            end = {x:padding.left + tickLength, y:pt.y};
        _yuitest_coverline("build/axis/axis.js", 463);
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
        _yuitest_coverfunc("build/axis/axis.js", "getLineStart", 473);
_yuitest_coverline("build/axis/axis.js", 475);
var host = this,
            style = host.get("styles"),
            padding = style.padding,
            majorTicks = style.majorTicks,
            tickLength = majorTicks.length,
            display = majorTicks.display,
            pt = {x:padding.left, y:padding.top};
        _yuitest_coverline("build/axis/axis.js", 482);
if(display === "inside")
        {
            _yuitest_coverline("build/axis/axis.js", 484);
pt.x += tickLength;
        }
        else {_yuitest_coverline("build/axis/axis.js", 486);
if(display === "cross")
        {
            _yuitest_coverline("build/axis/axis.js", 488);
pt.x += tickLength/2;
        }}
        _yuitest_coverline("build/axis/axis.js", 490);
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
        _yuitest_coverfunc("build/axis/axis.js", "getLabelPoint", 501);
_yuitest_coverline("build/axis/axis.js", 503);
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
        _yuitest_coverfunc("build/axis/axis.js", "updateMaxLabelSize", 513);
_yuitest_coverline("build/axis/axis.js", 515);
var host = this,
            props = this._labelRotationProps,
            rot = props.rot,
            absRot = props.absRot,
            sinRadians = props.sinRadians,
            cosRadians = props.cosRadians,
            max;
        _yuitest_coverline("build/axis/axis.js", 522);
if(rot === 0)
        {
            _yuitest_coverline("build/axis/axis.js", 524);
max = labelWidth;
        }
        else {_yuitest_coverline("build/axis/axis.js", 526);
if(absRot === 90)
        {
            _yuitest_coverline("build/axis/axis.js", 528);
max = labelHeight;
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 532);
max = (cosRadians * labelWidth) + (sinRadians * labelHeight);
        }}
        _yuitest_coverline("build/axis/axis.js", 534);
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
        _yuitest_coverfunc("build/axis/axis.js", "getExplicitlySized", 544);
_yuitest_coverline("build/axis/axis.js", 546);
if(this._explicitWidth)
        {
            _yuitest_coverline("build/axis/axis.js", 548);
var host = this,
                w = host._explicitWidth,
                totalTitleSize = this._totalTitleSize,
                rightTickOffset = host.get("rightTickOffset"),
                margin = styles.label.margin.right;
            _yuitest_coverline("build/axis/axis.js", 553);
host._maxLabelSize =  w - (rightTickOffset + margin + totalTitleSize);
            _yuitest_coverline("build/axis/axis.js", 554);
return true;
        }
        _yuitest_coverline("build/axis/axis.js", 556);
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
        _yuitest_coverfunc("build/axis/axis.js", "positionTitle", 566);
_yuitest_coverline("build/axis/axis.js", 568);
var host = this,
            bounds = host._titleBounds,
            margin = host.get("styles").title.margin,
            props = host._titleRotationProps,
            labelWidth = label.offsetWidth,
            labelHeight = label.offsetHeight,
            w = bounds.right - bounds.left,
            x = this.get("width") - (labelWidth * 0.5) - (w * 0.5),
            y = (host.get("height") * 0.5) - (labelHeight * 0.5);
        _yuitest_coverline("build/axis/axis.js", 577);
props.labelWidth = labelWidth;
        _yuitest_coverline("build/axis/axis.js", 578);
props.labelHeight = labelHeight;
        _yuitest_coverline("build/axis/axis.js", 579);
if(margin && margin.right)
        {
            _yuitest_coverline("build/axis/axis.js", 581);
x -= margin.left;
        }
        _yuitest_coverline("build/axis/axis.js", 583);
props.x = x;
        _yuitest_coverline("build/axis/axis.js", 584);
props.y = y;
        _yuitest_coverline("build/axis/axis.js", 585);
props.transformOrigin = [0.5, 0.5];
        _yuitest_coverline("build/axis/axis.js", 586);
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
        _yuitest_coverfunc("build/axis/axis.js", "positionLabel", 598);
_yuitest_coverline("build/axis/axis.js", 600);
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
        _yuitest_coverline("build/axis/axis.js", 611);
if(labelStyles.margin && labelStyles.margin.left)
        {
            _yuitest_coverline("build/axis/axis.js", 613);
margin = labelStyles.margin.left;
        }
        _yuitest_coverline("build/axis/axis.js", 615);
if(rot === 0)
        {
            _yuitest_coverline("build/axis/axis.js", 617);
topOffset -= labelHeight * 0.5;
        }
        else {_yuitest_coverline("build/axis/axis.js", 619);
if(rot === 90)
        {
            _yuitest_coverline("build/axis/axis.js", 621);
leftOffset -= labelWidth * 0.5;
            _yuitest_coverline("build/axis/axis.js", 622);
topOffset -= labelHeight;
        }
        else {_yuitest_coverline("build/axis/axis.js", 624);
if(rot === -90)
        {
            _yuitest_coverline("build/axis/axis.js", 626);
leftOffset -= labelWidth * 0.5;
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 630);
topOffset -= labelHeight * 0.5;
            _yuitest_coverline("build/axis/axis.js", 631);
leftOffset += labelHeight/2 * absRot/90;
        }}}
        _yuitest_coverline("build/axis/axis.js", 633);
leftOffset += margin;
        _yuitest_coverline("build/axis/axis.js", 634);
leftOffset += tickOffset;
        _yuitest_coverline("build/axis/axis.js", 635);
props.labelWidth = labelWidth;
        _yuitest_coverline("build/axis/axis.js", 636);
props.labelHeight = labelHeight;
        _yuitest_coverline("build/axis/axis.js", 637);
props.x = Math.round(leftOffset);
        _yuitest_coverline("build/axis/axis.js", 638);
props.y = Math.round(topOffset);
        _yuitest_coverline("build/axis/axis.js", 639);
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
        _yuitest_coverfunc("build/axis/axis.js", "_setRotationCoords", 649);
_yuitest_coverline("build/axis/axis.js", 651);
var rot = props.rot,
            absRot = props.absRot,
            leftOffset = 0,
            topOffset = 0,
            labelWidth = props.labelWidth,
            labelHeight = props.labelHeight;
        _yuitest_coverline("build/axis/axis.js", 657);
if(rot === 0)
        {
            _yuitest_coverline("build/axis/axis.js", 659);
topOffset = labelHeight * 0.5;
        }
        else {_yuitest_coverline("build/axis/axis.js", 661);
if(rot === 90)
        {
            _yuitest_coverline("build/axis/axis.js", 663);
leftOffset = labelWidth * 0.5;
            _yuitest_coverline("build/axis/axis.js", 664);
topOffset = labelHeight;
        }
        else {_yuitest_coverline("build/axis/axis.js", 666);
if(rot === -90)
        {
            _yuitest_coverline("build/axis/axis.js", 668);
leftOffset = labelWidth * 0.5;
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 672);
topOffset = labelHeight * 0.5;
            _yuitest_coverline("build/axis/axis.js", 673);
leftOffset = labelHeight/2 * absRot/90;
        }}}
        _yuitest_coverline("build/axis/axis.js", 675);
props.x -= leftOffset;
        _yuitest_coverline("build/axis/axis.js", 676);
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
        _yuitest_coverfunc("build/axis/axis.js", "_getTransformOrigin", 688);
_yuitest_coverline("build/axis/axis.js", 690);
var transformOrigin;
        _yuitest_coverline("build/axis/axis.js", 691);
if(rot === 0)
        {
            _yuitest_coverline("build/axis/axis.js", 693);
transformOrigin = [0, 0];
        }
        else {_yuitest_coverline("build/axis/axis.js", 695);
if(rot === 90)
        {
            _yuitest_coverline("build/axis/axis.js", 697);
transformOrigin = [0.5, 1];
        }
        else {_yuitest_coverline("build/axis/axis.js", 699);
if(rot === -90)
        {
            _yuitest_coverline("build/axis/axis.js", 701);
transformOrigin = [0.5, 0];
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 705);
transformOrigin = [0, 0.5];
        }}}
        _yuitest_coverline("build/axis/axis.js", 707);
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
        _yuitest_coverfunc("build/axis/axis.js", "offsetNodeForTick", 717);
_yuitest_coverline("build/axis/axis.js", 719);
var host = this,
            tickOffset = host.get("leftTickOffset"),
            offset = 0 - tickOffset;
        _yuitest_coverline("build/axis/axis.js", 722);
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
        _yuitest_coverfunc("build/axis/axis.js", "setCalculatedSize", 731);
_yuitest_coverline("build/axis/axis.js", 733);
var host = this,
            styles = host.get("styles"),
            labelStyle = styles.label,
            totalTitleSize = this._totalTitleSize,
            ttl = Math.round(host.get("rightTickOffset") + host._maxLabelSize + totalTitleSize + labelStyle.margin.left);
        _yuitest_coverline("build/axis/axis.js", 738);
if(this._explicitWidth)
        {
            _yuitest_coverline("build/axis/axis.js", 740);
ttl = this._explicitWidth;
        }
        _yuitest_coverline("build/axis/axis.js", 742);
host.set("calculatedWidth", ttl);
        _yuitest_coverline("build/axis/axis.js", 743);
host.get("contentBox").setStyle("width", ttl);
    }
};

_yuitest_coverline("build/axis/axis.js", 747);
Y.RightAxisLayout = RightAxisLayout;
/**
 * Contains algorithms for rendering a bottom axis.
 *
 * @class BottomAxisLayout
 * @Constructor
 * @submodule axis
 */
_yuitest_coverline("build/axis/axis.js", 755);
BottomAxisLayout = function(){};

_yuitest_coverline("build/axis/axis.js", 757);
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
        _yuitest_coverfunc("build/axis/axis.js", "_getDefaultMargins", 765);
_yuitest_coverline("build/axis/axis.js", 767);
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
        _yuitest_coverfunc("build/axis/axis.js", "setTickOffsets", 781);
_yuitest_coverline("build/axis/axis.js", 783);
var host = this,
            majorTicks = host.get("styles").majorTicks,
            tickLength = majorTicks.length,
            halfTick = tickLength * 0.5,
            display = majorTicks.display;
        _yuitest_coverline("build/axis/axis.js", 788);
host.set("leftTickOffset",  0);
        _yuitest_coverline("build/axis/axis.js", 789);
host.set("rightTickOffset",  0);

        _yuitest_coverline("build/axis/axis.js", 791);
switch(display)
        {
            case "inside" :
                _yuitest_coverline("build/axis/axis.js", 794);
host.set("topTickOffset", tickLength);
                _yuitest_coverline("build/axis/axis.js", 795);
host.set("bottomTickOffset", 0);
            _yuitest_coverline("build/axis/axis.js", 796);
break;
            case "outside" :
                _yuitest_coverline("build/axis/axis.js", 798);
host.set("topTickOffset", 0);
                _yuitest_coverline("build/axis/axis.js", 799);
host.set("bottomTickOffset", tickLength);
            _yuitest_coverline("build/axis/axis.js", 800);
break;
            case "cross":
                _yuitest_coverline("build/axis/axis.js", 802);
host.set("topTickOffset",  halfTick);
                _yuitest_coverline("build/axis/axis.js", 803);
host.set("bottomTickOffset",  halfTick);
            _yuitest_coverline("build/axis/axis.js", 804);
break;
            default:
                _yuitest_coverline("build/axis/axis.js", 806);
host.set("topTickOffset", 0);
                _yuitest_coverline("build/axis/axis.js", 807);
host.set("bottomTickOffset", 0);
            _yuitest_coverline("build/axis/axis.js", 808);
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
        _yuitest_coverfunc("build/axis/axis.js", "getLineStart", 818);
_yuitest_coverline("build/axis/axis.js", 820);
var style = this.get("styles"),
            padding = style.padding,
            majorTicks = style.majorTicks,
            tickLength = majorTicks.length,
            display = majorTicks.display,
            pt = {x:0, y:padding.top};
        _yuitest_coverline("build/axis/axis.js", 826);
if(display === "inside")
        {
            _yuitest_coverline("build/axis/axis.js", 828);
pt.y += tickLength;
        }
        else {_yuitest_coverline("build/axis/axis.js", 830);
if(display === "cross")
        {
            _yuitest_coverline("build/axis/axis.js", 832);
pt.y += tickLength/2;
        }}
        _yuitest_coverline("build/axis/axis.js", 834);
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
        _yuitest_coverfunc("build/axis/axis.js", "drawTick", 846);
_yuitest_coverline("build/axis/axis.js", 848);
var host = this,
            style = host.get("styles"),
            padding = style.padding,
            tickLength = tickStyles.length,
            start = {x:pt.x, y:padding.top},
            end = {x:pt.x, y:tickLength + padding.top};
        _yuitest_coverline("build/axis/axis.js", 854);
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
        _yuitest_coverfunc("build/axis/axis.js", "getLabelPoint", 865);
_yuitest_coverline("build/axis/axis.js", 867);
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
        _yuitest_coverfunc("build/axis/axis.js", "updateMaxLabelSize", 877);
_yuitest_coverline("build/axis/axis.js", 879);
var host = this,
            props = this._labelRotationProps,
            rot = props.rot,
            absRot = props.absRot,
            sinRadians = props.sinRadians,
            cosRadians = props.cosRadians,
            max;
        _yuitest_coverline("build/axis/axis.js", 886);
if(rot === 0)
        {
            _yuitest_coverline("build/axis/axis.js", 888);
max = labelHeight;
        }
        else {_yuitest_coverline("build/axis/axis.js", 890);
if(absRot === 90)
        {
            _yuitest_coverline("build/axis/axis.js", 892);
max = labelWidth;
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 896);
max = (sinRadians * labelWidth) + (cosRadians * labelHeight);
        }}
        _yuitest_coverline("build/axis/axis.js", 898);
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
        _yuitest_coverfunc("build/axis/axis.js", "getExplicitlySized", 908);
_yuitest_coverline("build/axis/axis.js", 910);
if(this._explicitHeight)
        {
            _yuitest_coverline("build/axis/axis.js", 912);
var host = this,
                h = host._explicitHeight,
                totalTitleSize = host._totalTitleSize,
                bottomTickOffset = host.get("bottomTickOffset"),
                margin = styles.label.margin.right;
            _yuitest_coverline("build/axis/axis.js", 917);
host._maxLabelSize =  h - (bottomTickOffset + margin + totalTitleSize);
            _yuitest_coverline("build/axis/axis.js", 918);
return true;
        }
        _yuitest_coverline("build/axis/axis.js", 920);
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
        _yuitest_coverfunc("build/axis/axis.js", "positionTitle", 930);
_yuitest_coverline("build/axis/axis.js", 932);
var host = this,
            bounds = host._titleBounds,
            margin = host.get("styles").title.margin,
            props = host._titleRotationProps,
            h = bounds.bottom - bounds.top,
            labelWidth = label.offsetWidth,
            labelHeight = label.offsetHeight,
            x = (host.get("width") * 0.5) - (labelWidth * 0.5),
            y = host.get("height") - labelHeight/2 - h/2;
        _yuitest_coverline("build/axis/axis.js", 941);
props.labelWidth = labelWidth;
        _yuitest_coverline("build/axis/axis.js", 942);
props.labelHeight = labelHeight;
        _yuitest_coverline("build/axis/axis.js", 943);
if(margin && margin.bottom)
        {
            _yuitest_coverline("build/axis/axis.js", 945);
y -= margin.bottom;
        }
        _yuitest_coverline("build/axis/axis.js", 947);
props.x = x;
        _yuitest_coverline("build/axis/axis.js", 948);
props.y = y;
        _yuitest_coverline("build/axis/axis.js", 949);
props.transformOrigin = [0.5, 0.5];
        _yuitest_coverline("build/axis/axis.js", 950);
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
        _yuitest_coverfunc("build/axis/axis.js", "positionLabel", 962);
_yuitest_coverline("build/axis/axis.js", 964);
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
        _yuitest_coverline("build/axis/axis.js", 975);
if(labelStyles.margin && labelStyles.margin.top)
        {
            _yuitest_coverline("build/axis/axis.js", 977);
margin = labelStyles.margin.top;
        }
        _yuitest_coverline("build/axis/axis.js", 979);
if(rot > 0)
        {
            _yuitest_coverline("build/axis/axis.js", 981);
topOffset -= labelHeight/2 * rot/90;
        }
        else {_yuitest_coverline("build/axis/axis.js", 983);
if(rot < 0)
        {
            _yuitest_coverline("build/axis/axis.js", 985);
leftOffset -= labelWidth;
            _yuitest_coverline("build/axis/axis.js", 986);
topOffset -= labelHeight/2 * absRot/90;
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 990);
leftOffset -= labelWidth * 0.5;
        }}
        _yuitest_coverline("build/axis/axis.js", 992);
topOffset += margin;
        _yuitest_coverline("build/axis/axis.js", 993);
topOffset += tickOffset;
        _yuitest_coverline("build/axis/axis.js", 994);
props.labelWidth = labelWidth;
        _yuitest_coverline("build/axis/axis.js", 995);
props.labelHeight = labelHeight;
        _yuitest_coverline("build/axis/axis.js", 996);
props.x = leftOffset;
        _yuitest_coverline("build/axis/axis.js", 997);
props.y = topOffset;
        _yuitest_coverline("build/axis/axis.js", 998);
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
        _yuitest_coverfunc("build/axis/axis.js", "_setRotationCoords", 1008);
_yuitest_coverline("build/axis/axis.js", 1010);
var rot = props.rot,
            absRot = props.absRot,
            labelWidth = props.labelWidth,
            labelHeight = props.labelHeight,
            leftOffset,
            topOffset;

        _yuitest_coverline("build/axis/axis.js", 1017);
if(rot > 0)
        {
            _yuitest_coverline("build/axis/axis.js", 1019);
leftOffset = 0;
            _yuitest_coverline("build/axis/axis.js", 1020);
topOffset = labelHeight/2 * rot/90;
        }
        else {_yuitest_coverline("build/axis/axis.js", 1022);
if(rot < 0)
        {
            _yuitest_coverline("build/axis/axis.js", 1024);
leftOffset = labelWidth;
            _yuitest_coverline("build/axis/axis.js", 1025);
topOffset = labelHeight/2 * absRot/90;
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 1029);
leftOffset = labelWidth * 0.5;
            _yuitest_coverline("build/axis/axis.js", 1030);
topOffset = 0;
        }}
        _yuitest_coverline("build/axis/axis.js", 1032);
props.x -= leftOffset;
        _yuitest_coverline("build/axis/axis.js", 1033);
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
        _yuitest_coverfunc("build/axis/axis.js", "_getTransformOrigin", 1045);
_yuitest_coverline("build/axis/axis.js", 1047);
var transformOrigin;
        _yuitest_coverline("build/axis/axis.js", 1048);
if(rot > 0)
        {
            _yuitest_coverline("build/axis/axis.js", 1050);
transformOrigin = [0, 0.5];
        }
        else {_yuitest_coverline("build/axis/axis.js", 1052);
if(rot < 0)
        {
            _yuitest_coverline("build/axis/axis.js", 1054);
transformOrigin = [1, 0.5];
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 1058);
transformOrigin = [0, 0];
        }}
        _yuitest_coverline("build/axis/axis.js", 1060);
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
        _yuitest_coverfunc("build/axis/axis.js", "offsetNodeForTick", 1070);
_yuitest_coverline("build/axis/axis.js", 1072);
var host = this;
        _yuitest_coverline("build/axis/axis.js", 1073);
host.get("contentBox").setStyle("top", 0 - host.get("topTickOffset"));
    },

    /**
     * Assigns a height based on the size of the contents.
     *
     * @method setCalculatedSize
     * @protected
     */
    setCalculatedSize: function()
    {
        _yuitest_coverfunc("build/axis/axis.js", "setCalculatedSize", 1082);
_yuitest_coverline("build/axis/axis.js", 1084);
var host = this,
            styles = host.get("styles"),
            labelStyle = styles.label,
            totalTitleSize = host._totalTitleSize,
            ttl = Math.round(host.get("bottomTickOffset") + host._maxLabelSize + labelStyle.margin.top + totalTitleSize);
        _yuitest_coverline("build/axis/axis.js", 1089);
if(host._explicitHeight)
        {
            _yuitest_coverline("build/axis/axis.js", 1091);
ttl = host._explicitHeight;
        }
        _yuitest_coverline("build/axis/axis.js", 1093);
host.set("calculatedHeight", ttl);
    }
};
_yuitest_coverline("build/axis/axis.js", 1096);
Y.BottomAxisLayout = BottomAxisLayout;
/**
 * Contains algorithms for rendering a top axis.
 *
 * @class TopAxisLayout
 * @constructor
 * @submodule axis
 */
_yuitest_coverline("build/axis/axis.js", 1104);
TopAxisLayout = function(){};

_yuitest_coverline("build/axis/axis.js", 1106);
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
        _yuitest_coverfunc("build/axis/axis.js", "_getDefaultMargins", 1114);
_yuitest_coverline("build/axis/axis.js", 1116);
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
        _yuitest_coverfunc("build/axis/axis.js", "setTickOffsets", 1130);
_yuitest_coverline("build/axis/axis.js", 1132);
var host = this,
            majorTicks = host.get("styles").majorTicks,
            tickLength = majorTicks.length,
            halfTick = tickLength * 0.5,
            display = majorTicks.display;
        _yuitest_coverline("build/axis/axis.js", 1137);
host.set("leftTickOffset",  0);
        _yuitest_coverline("build/axis/axis.js", 1138);
host.set("rightTickOffset",  0);
        _yuitest_coverline("build/axis/axis.js", 1139);
switch(display)
        {
            case "inside" :
                _yuitest_coverline("build/axis/axis.js", 1142);
host.set("bottomTickOffset", tickLength);
                _yuitest_coverline("build/axis/axis.js", 1143);
host.set("topTickOffset", 0);
            _yuitest_coverline("build/axis/axis.js", 1144);
break;
            case "outside" :
                _yuitest_coverline("build/axis/axis.js", 1146);
host.set("bottomTickOffset", 0);
                _yuitest_coverline("build/axis/axis.js", 1147);
host.set("topTickOffset",  tickLength);
            _yuitest_coverline("build/axis/axis.js", 1148);
break;
            case "cross" :
                _yuitest_coverline("build/axis/axis.js", 1150);
host.set("topTickOffset", halfTick);
                _yuitest_coverline("build/axis/axis.js", 1151);
host.set("bottomTickOffset", halfTick);
            _yuitest_coverline("build/axis/axis.js", 1152);
break;
            default:
                _yuitest_coverline("build/axis/axis.js", 1154);
host.set("topTickOffset", 0);
                _yuitest_coverline("build/axis/axis.js", 1155);
host.set("bottomTickOffset", 0);
            _yuitest_coverline("build/axis/axis.js", 1156);
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
        _yuitest_coverfunc("build/axis/axis.js", "getLineStart", 1166);
_yuitest_coverline("build/axis/axis.js", 1168);
var host = this,
            style = host.get("styles"),
            padding = style.padding,
            majorTicks = style.majorTicks,
            tickLength = majorTicks.length,
            display = majorTicks.display,
            pt = {x:0, y:padding.top};
        _yuitest_coverline("build/axis/axis.js", 1175);
if(display === "outside")
        {
            _yuitest_coverline("build/axis/axis.js", 1177);
pt.y += tickLength;
        }
        else {_yuitest_coverline("build/axis/axis.js", 1179);
if(display === "cross")
        {
            _yuitest_coverline("build/axis/axis.js", 1181);
pt.y += tickLength/2;
        }}
        _yuitest_coverline("build/axis/axis.js", 1183);
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
        _yuitest_coverfunc("build/axis/axis.js", "drawTick", 1195);
_yuitest_coverline("build/axis/axis.js", 1197);
var host = this,
            style = host.get("styles"),
            padding = style.padding,
            tickLength = tickStyles.length,
            start = {x:pt.x, y:padding.top},
            end = {x:pt.x, y:tickLength + padding.top};
        _yuitest_coverline("build/axis/axis.js", 1203);
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
        _yuitest_coverfunc("build/axis/axis.js", "getLabelPoint", 1214);
_yuitest_coverline("build/axis/axis.js", 1216);
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
        _yuitest_coverfunc("build/axis/axis.js", "updateMaxLabelSize", 1226);
_yuitest_coverline("build/axis/axis.js", 1228);
var host = this,
            props = this._labelRotationProps,
            rot = props.rot,
            absRot = props.absRot,
            sinRadians = props.sinRadians,
            cosRadians = props.cosRadians,
            max;
        _yuitest_coverline("build/axis/axis.js", 1235);
if(rot === 0)
        {
            _yuitest_coverline("build/axis/axis.js", 1237);
max = labelHeight;
        }
        else {_yuitest_coverline("build/axis/axis.js", 1239);
if(absRot === 90)
        {
            _yuitest_coverline("build/axis/axis.js", 1241);
max = labelWidth;
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 1245);
max = (sinRadians * labelWidth) + (cosRadians * labelHeight);
        }}
        _yuitest_coverline("build/axis/axis.js", 1247);
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
        _yuitest_coverfunc("build/axis/axis.js", "getExplicitlySized", 1257);
_yuitest_coverline("build/axis/axis.js", 1259);
if(this._explicitHeight)
        {
            _yuitest_coverline("build/axis/axis.js", 1261);
var host = this,
                h = host._explicitHeight,
                totalTitleSize = host._totalTitleSize,
                topTickOffset = host.get("topTickOffset"),
                margin = styles.label.margin.right;
            _yuitest_coverline("build/axis/axis.js", 1266);
host._maxLabelSize =  h - (topTickOffset + margin + totalTitleSize);
            _yuitest_coverline("build/axis/axis.js", 1267);
return true;
        }
        _yuitest_coverline("build/axis/axis.js", 1269);
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
        _yuitest_coverfunc("build/axis/axis.js", "positionTitle", 1279);
_yuitest_coverline("build/axis/axis.js", 1281);
var host = this,
            bounds = host._titleBounds,
            margin = host.get("styles").title.margin,
            props = host._titleRotationProps,
            labelWidth = label.offsetWidth,
            labelHeight = label.offsetHeight,
            h = bounds.bottom - bounds.top,
            x = (host.get("width") * 0.5) - (labelWidth * 0.5),
            y = h/2 - labelHeight/2;
        _yuitest_coverline("build/axis/axis.js", 1290);
props.labelWidth = labelWidth;
        _yuitest_coverline("build/axis/axis.js", 1291);
props.labelHeight = labelHeight;
        _yuitest_coverline("build/axis/axis.js", 1292);
if(margin && margin.top)
        {
            _yuitest_coverline("build/axis/axis.js", 1294);
y += margin.top;
        }
        _yuitest_coverline("build/axis/axis.js", 1296);
props.x = x;
        _yuitest_coverline("build/axis/axis.js", 1297);
props.y = y;
        _yuitest_coverline("build/axis/axis.js", 1298);
props.transformOrigin = [0.5, 0.5];
        _yuitest_coverline("build/axis/axis.js", 1299);
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
        _yuitest_coverfunc("build/axis/axis.js", "positionLabel", 1311);
_yuitest_coverline("build/axis/axis.js", 1313);
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
        _yuitest_coverline("build/axis/axis.js", 1323);
if(rot === 0)
        {
            _yuitest_coverline("build/axis/axis.js", 1325);
leftOffset -= labelWidth * 0.5;
            _yuitest_coverline("build/axis/axis.js", 1326);
topOffset -= labelHeight;
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 1330);
if(rot === 90)
            {
                _yuitest_coverline("build/axis/axis.js", 1332);
leftOffset -= labelWidth;
                _yuitest_coverline("build/axis/axis.js", 1333);
topOffset -= (labelHeight * 0.5);
            }
            else {_yuitest_coverline("build/axis/axis.js", 1335);
if (rot === -90)
            {
                _yuitest_coverline("build/axis/axis.js", 1337);
topOffset -= (labelHeight * 0.5);
            }
            else {_yuitest_coverline("build/axis/axis.js", 1339);
if(rot > 0)
            {
                _yuitest_coverline("build/axis/axis.js", 1341);
leftOffset -= labelWidth;
                _yuitest_coverline("build/axis/axis.js", 1342);
topOffset -= labelHeight - (labelHeight * rot/180);
            }
            else
            {
                _yuitest_coverline("build/axis/axis.js", 1346);
topOffset -= labelHeight - (labelHeight * absRot/180);
            }}}
        }
        _yuitest_coverline("build/axis/axis.js", 1349);
props.x = Math.round(leftOffset);
        _yuitest_coverline("build/axis/axis.js", 1350);
props.y = Math.round(topOffset);
        _yuitest_coverline("build/axis/axis.js", 1351);
props.labelWidth = labelWidth;
        _yuitest_coverline("build/axis/axis.js", 1352);
props.labelHeight = labelHeight;
        _yuitest_coverline("build/axis/axis.js", 1353);
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
        _yuitest_coverfunc("build/axis/axis.js", "_setRotationCoords", 1363);
_yuitest_coverline("build/axis/axis.js", 1365);
var rot = props.rot,
            absRot = props.absRot,
            labelWidth = props.labelWidth,
            labelHeight = props.labelHeight,
            leftOffset,
            topOffset;
        _yuitest_coverline("build/axis/axis.js", 1371);
if(rot === 0)
        {
            _yuitest_coverline("build/axis/axis.js", 1373);
leftOffset = labelWidth * 0.5;
            _yuitest_coverline("build/axis/axis.js", 1374);
topOffset = labelHeight;
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 1378);
if(rot === 90)
            {
                _yuitest_coverline("build/axis/axis.js", 1380);
leftOffset = labelWidth;
                _yuitest_coverline("build/axis/axis.js", 1381);
topOffset = (labelHeight * 0.5);
            }
            else {_yuitest_coverline("build/axis/axis.js", 1383);
if (rot === -90)
            {
                _yuitest_coverline("build/axis/axis.js", 1385);
topOffset = (labelHeight * 0.5);
            }
            else {_yuitest_coverline("build/axis/axis.js", 1387);
if(rot > 0)
            {
                _yuitest_coverline("build/axis/axis.js", 1389);
leftOffset = labelWidth;
                _yuitest_coverline("build/axis/axis.js", 1390);
topOffset = labelHeight - (labelHeight * rot/180);
            }
            else
            {
                _yuitest_coverline("build/axis/axis.js", 1394);
topOffset = labelHeight - (labelHeight * absRot/180);
            }}}
        }
        _yuitest_coverline("build/axis/axis.js", 1397);
props.x -= leftOffset;
        _yuitest_coverline("build/axis/axis.js", 1398);
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
        _yuitest_coverfunc("build/axis/axis.js", "_getTransformOrigin", 1410);
_yuitest_coverline("build/axis/axis.js", 1412);
var transformOrigin;
        _yuitest_coverline("build/axis/axis.js", 1413);
if(rot === 0)
        {
            _yuitest_coverline("build/axis/axis.js", 1415);
transformOrigin = [0, 0];
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 1419);
if(rot === 90)
            {
                _yuitest_coverline("build/axis/axis.js", 1421);
transformOrigin = [1, 0.5];
            }
            else {_yuitest_coverline("build/axis/axis.js", 1423);
if (rot === -90)
            {
                _yuitest_coverline("build/axis/axis.js", 1425);
transformOrigin = [0, 0.5];
            }
            else {_yuitest_coverline("build/axis/axis.js", 1427);
if(rot > 0)
            {
                _yuitest_coverline("build/axis/axis.js", 1429);
transformOrigin = [1, 0.5];
            }
            else
            {
                _yuitest_coverline("build/axis/axis.js", 1433);
transformOrigin = [0, 0.5];
            }}}
        }
        _yuitest_coverline("build/axis/axis.js", 1436);
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
    },

    /**
     * Assigns a height based on the size of the contents.
     *
     * @method setCalculatedSize
     * @protected
     */
    setCalculatedSize: function()
    {
        _yuitest_coverfunc("build/axis/axis.js", "setCalculatedSize", 1456);
_yuitest_coverline("build/axis/axis.js", 1458);
var host = this,
            graphic = host.get("graphic"),
            styles = host.get("styles"),
            labelMargin = styles.label.margin,
            totalLabelSize = labelMargin.bottom + host._maxLabelSize,
            totalTitleSize = host._totalTitleSize,
            topTickOffset = this.get("topTickOffset"),
            ttl = Math.round(topTickOffset + totalLabelSize + totalTitleSize);
        _yuitest_coverline("build/axis/axis.js", 1466);
if(this._explicitHeight)
        {
           _yuitest_coverline("build/axis/axis.js", 1468);
ttl = this._explicitHeight;
        }
        _yuitest_coverline("build/axis/axis.js", 1470);
host.set("calculatedHeight", ttl);
        _yuitest_coverline("build/axis/axis.js", 1471);
graphic.set("y", ttl - topTickOffset);
    }
};
_yuitest_coverline("build/axis/axis.js", 1474);
Y.TopAxisLayout = TopAxisLayout;

/**
 * An abstract class that is used to generates axes for a chart.
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
_yuitest_coverline("build/axis/axis.js", 1490);
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
        _yuitest_coverfunc("build/axis/axis.js", "getLabelByIndex", 1500);
_yuitest_coverline("build/axis/axis.js", 1502);
var position = this.get("position"),
            direction = position == "left" || position == "right" ? "vertical" : "horizontal";
        _yuitest_coverline("build/axis/axis.js", 1504);
return this._getLabelByIndex(i, l, direction);
    },

    /**
     * @method bindUI
     * @private
     */
    bindUI: function()
    {
        _yuitest_coverfunc("build/axis/axis.js", "bindUI", 1511);
_yuitest_coverline("build/axis/axis.js", 1513);
this.after("dataReady", Y.bind(this._dataChangeHandler, this));
        _yuitest_coverline("build/axis/axis.js", 1514);
this.after("dataUpdate", Y.bind(this._dataChangeHandler, this));
        _yuitest_coverline("build/axis/axis.js", 1515);
this.after("stylesChange", this._updateHandler);
        _yuitest_coverline("build/axis/axis.js", 1516);
this.after("overlapGraphChange", this._updateHandler);
        _yuitest_coverline("build/axis/axis.js", 1517);
this.after("positionChange", this._positionChangeHandler);
        _yuitest_coverline("build/axis/axis.js", 1518);
this.after("widthChange", this._handleSizeChange);
        _yuitest_coverline("build/axis/axis.js", 1519);
this.after("heightChange", this._handleSizeChange);
        _yuitest_coverline("build/axis/axis.js", 1520);
this.after("calculatedWidthChange", this._handleSizeChange);
        _yuitest_coverline("build/axis/axis.js", 1521);
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
    _dataChangeHandler: function(e)
    {
        _yuitest_coverfunc("build/axis/axis.js", "_dataChangeHandler", 1548);
_yuitest_coverline("build/axis/axis.js", 1550);
if(this.get("rendered"))
        {
            _yuitest_coverline("build/axis/axis.js", 1552);
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
        _yuitest_coverfunc("build/axis/axis.js", "_positionChangeHandler", 1563);
_yuitest_coverline("build/axis/axis.js", 1565);
this._updateGraphic(e.newVal);
        _yuitest_coverline("build/axis/axis.js", 1566);
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
        _yuitest_coverfunc("build/axis/axis.js", "_updateGraphic", 1576);
_yuitest_coverline("build/axis/axis.js", 1578);
var graphic = this.get("graphic");
        _yuitest_coverline("build/axis/axis.js", 1579);
if(position == "none")
        {
            _yuitest_coverline("build/axis/axis.js", 1581);
if(graphic)
            {
                _yuitest_coverline("build/axis/axis.js", 1583);
graphic.destroy();
            }
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 1588);
if(!graphic)
            {
                _yuitest_coverline("build/axis/axis.js", 1590);
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
    _updateHandler: function(e)
    {
        _yuitest_coverfunc("build/axis/axis.js", "_updateHandler", 1602);
_yuitest_coverline("build/axis/axis.js", 1604);
if(this.get("rendered"))
        {
            _yuitest_coverline("build/axis/axis.js", 1606);
this._drawAxis();
        }
    },

    /**
     * @method renderUI
     * @private
     */
    renderUI: function()
    {
        _yuitest_coverfunc("build/axis/axis.js", "renderUI", 1614);
_yuitest_coverline("build/axis/axis.js", 1616);
this._updateGraphic(this.get("position"));
    },

    /**
     * @method syncUI
     * @private
     */
    syncUI: function()
    {
        _yuitest_coverfunc("build/axis/axis.js", "syncUI", 1623);
_yuitest_coverline("build/axis/axis.js", 1625);
var layout = this._layout,
            defaultMargins,
            styles,
            label,
            title,
            i;
        _yuitest_coverline("build/axis/axis.js", 1631);
if(layout)
        {
            _yuitest_coverline("build/axis/axis.js", 1633);
defaultMargins = layout._getDefaultMargins();
            _yuitest_coverline("build/axis/axis.js", 1634);
styles = this.get("styles");
            _yuitest_coverline("build/axis/axis.js", 1635);
label = styles.label.margin;
            _yuitest_coverline("build/axis/axis.js", 1636);
title =styles.title.margin;
            //need to defaultMargins method to the layout classes.
            _yuitest_coverline("build/axis/axis.js", 1638);
for(i in defaultMargins)
            {
                _yuitest_coverline("build/axis/axis.js", 1640);
if(defaultMargins.hasOwnProperty(i))
                {
                    _yuitest_coverline("build/axis/axis.js", 1642);
label[i] = label[i] === undefined ? defaultMargins[i] : label[i];
                    _yuitest_coverline("build/axis/axis.js", 1643);
title[i] = title[i] === undefined ? defaultMargins[i] : title[i];
                }
            }
        }
        _yuitest_coverline("build/axis/axis.js", 1647);
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
        _yuitest_coverfunc("build/axis/axis.js", "_setCanvas", 1656);
_yuitest_coverline("build/axis/axis.js", 1658);
var cb = this.get("contentBox"),
            bb = this.get("boundingBox"),
            p = this.get("position"),
            pn = this._parentNode,
            w = this.get("width"),
            h = this.get("height");
        _yuitest_coverline("build/axis/axis.js", 1664);
bb.setStyle("position", "absolute");
        _yuitest_coverline("build/axis/axis.js", 1665);
bb.setStyle("zIndex", 2);
        _yuitest_coverline("build/axis/axis.js", 1666);
w = w ? w + "px" : pn.getStyle("width");
        _yuitest_coverline("build/axis/axis.js", 1667);
h = h ? h + "px" : pn.getStyle("height");
        _yuitest_coverline("build/axis/axis.js", 1668);
if(p === "top" || p === "bottom")
        {
            _yuitest_coverline("build/axis/axis.js", 1670);
cb.setStyle("width", w);
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 1674);
cb.setStyle("height", h);
        }
        _yuitest_coverline("build/axis/axis.js", 1676);
cb.setStyle("position", "relative");
        _yuitest_coverline("build/axis/axis.js", 1677);
cb.setStyle("left", "0px");
        _yuitest_coverline("build/axis/axis.js", 1678);
cb.setStyle("top", "0px");
        _yuitest_coverline("build/axis/axis.js", 1679);
this.set("graphic", new Y.Graphic());
        _yuitest_coverline("build/axis/axis.js", 1680);
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
        _yuitest_coverfunc("build/axis/axis.js", "_getDefaultStyles", 1691);
_yuitest_coverline("build/axis/axis.js", 1693);
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

        _yuitest_coverline("build/axis/axis.js", 1748);
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
        _yuitest_coverfunc("build/axis/axis.js", "_handleSizeChange", 1758);
_yuitest_coverline("build/axis/axis.js", 1760);
var attrName = e.attrName,
            pos = this.get("position"),
            vert = pos == "left" || pos == "right",
            cb = this.get("contentBox"),
            hor = pos == "bottom" || pos == "top";
        _yuitest_coverline("build/axis/axis.js", 1765);
cb.setStyle("width", this.get("width"));
        _yuitest_coverline("build/axis/axis.js", 1766);
cb.setStyle("height", this.get("height"));
        _yuitest_coverline("build/axis/axis.js", 1767);
if((hor && attrName == "width") || (vert && attrName == "height"))
        {
            _yuitest_coverline("build/axis/axis.js", 1769);
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
        _yuitest_coverfunc("build/axis/axis.js", "drawLine", 1797);
_yuitest_coverline("build/axis/axis.js", 1799);
path.moveTo(startPoint.x, startPoint.y);
        _yuitest_coverline("build/axis/axis.js", 1800);
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
        _yuitest_coverfunc("build/axis/axis.js", "_getTextRotationProps", 1811);
_yuitest_coverline("build/axis/axis.js", 1813);
if(styles.rotation === undefined)
        {
            _yuitest_coverline("build/axis/axis.js", 1815);
switch(this.get("position"))
            {
                case "left" :
                    _yuitest_coverline("build/axis/axis.js", 1818);
styles.rotation = -90;
                _yuitest_coverline("build/axis/axis.js", 1819);
break;
                case "right" :
                    _yuitest_coverline("build/axis/axis.js", 1821);
styles.rotation = 90;
                _yuitest_coverline("build/axis/axis.js", 1822);
break;
                default :
                    _yuitest_coverline("build/axis/axis.js", 1824);
styles.rotation = 0;
                _yuitest_coverline("build/axis/axis.js", 1825);
break;
            }
        }
        _yuitest_coverline("build/axis/axis.js", 1828);
var rot =  Math.min(90, Math.max(-90, styles.rotation)),
            absRot = Math.abs(rot),
            radCon = Math.PI/180,
            sinRadians = parseFloat(parseFloat(Math.sin(absRot * radCon)).toFixed(8)),
            cosRadians = parseFloat(parseFloat(Math.cos(absRot * radCon)).toFixed(8));
        _yuitest_coverline("build/axis/axis.js", 1833);
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
        _yuitest_coverfunc("build/axis/axis.js", "_drawAxis", 1849);
_yuitest_coverline("build/axis/axis.js", 1851);
if(this._drawing)
        {
            _yuitest_coverline("build/axis/axis.js", 1853);
this._callLater = true;
            _yuitest_coverline("build/axis/axis.js", 1854);
return;
        }
        _yuitest_coverline("build/axis/axis.js", 1856);
this._drawing = true;
        _yuitest_coverline("build/axis/axis.js", 1857);
this._callLater = false;
        _yuitest_coverline("build/axis/axis.js", 1858);
if(this._layout)
        {
            _yuitest_coverline("build/axis/axis.js", 1860);
var styles = this.get("styles"),
                line = styles.line,
                labelStyles = styles.label,
                majorTickStyles = styles.majorTicks,
                drawTicks = majorTickStyles.display != "none",
                tickPoint,
                majorUnit = styles.majorUnit,
                len,
                majorUnitDistance,
                i = 0,
                layout = this._layout,
                layoutLength,
                position,
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
                direction = (position == "left" || position == "right") ? "vertical" : "horizontal";
            _yuitest_coverline("build/axis/axis.js", 1886);
this._labelWidths = [];
            _yuitest_coverline("build/axis/axis.js", 1887);
this._labelHeights = [];
            _yuitest_coverline("build/axis/axis.js", 1888);
graphic.set("autoDraw", false);
            _yuitest_coverline("build/axis/axis.js", 1889);
path.clear();
            _yuitest_coverline("build/axis/axis.js", 1890);
path.set("stroke", {
                weight: line.weight,
                color: line.color,
                opacity: line.alpha
            });
            _yuitest_coverline("build/axis/axis.js", 1895);
this._labelRotationProps = this._getTextRotationProps(labelStyles);
            _yuitest_coverline("build/axis/axis.js", 1896);
this._labelRotationProps.transformOrigin = layout._getTransformOrigin(this._labelRotationProps.rot);
            _yuitest_coverline("build/axis/axis.js", 1897);
layout.setTickOffsets.apply(this);
            _yuitest_coverline("build/axis/axis.js", 1898);
layoutLength = this.getLength();
            _yuitest_coverline("build/axis/axis.js", 1899);
lineStart = layout.getLineStart.apply(this);
            _yuitest_coverline("build/axis/axis.js", 1900);
len = this.getTotalMajorUnits(majorUnit);
            _yuitest_coverline("build/axis/axis.js", 1901);
majorUnitDistance = this.getMajorUnitDistance(len, layoutLength, majorUnit);
            _yuitest_coverline("build/axis/axis.js", 1902);
this.set("edgeOffset", this.getEdgeOffset(len, layoutLength) * 0.5);
            _yuitest_coverline("build/axis/axis.js", 1903);
if(len < 1)
            {
                _yuitest_coverline("build/axis/axis.js", 1905);
this._clearLabelCache();
            }
            else
            {
                _yuitest_coverline("build/axis/axis.js", 1909);
tickPoint = this.getFirstPoint(lineStart);
                _yuitest_coverline("build/axis/axis.js", 1910);
this.drawLine(path, lineStart, this.getLineEnd(tickPoint));
                _yuitest_coverline("build/axis/axis.js", 1911);
if(drawTicks)
                {
                    _yuitest_coverline("build/axis/axis.js", 1913);
tickPath = this.get("tickPath");
                    _yuitest_coverline("build/axis/axis.js", 1914);
tickPath.clear();
                    _yuitest_coverline("build/axis/axis.js", 1915);
tickPath.set("stroke", {
                        weight: majorTickStyles.weight,
                        color: majorTickStyles.color,
                        opacity: majorTickStyles.alpha
                    });
                   _yuitest_coverline("build/axis/axis.js", 1920);
layout.drawTick.apply(this, [tickPath, tickPoint, majorTickStyles]);
                }
                _yuitest_coverline("build/axis/axis.js", 1922);
this._createLabelCache();
                _yuitest_coverline("build/axis/axis.js", 1923);
this._tickPoints = [];
                _yuitest_coverline("build/axis/axis.js", 1924);
this._maxLabelSize = 0;
                _yuitest_coverline("build/axis/axis.js", 1925);
this._totalTitleSize = 0;
                _yuitest_coverline("build/axis/axis.js", 1926);
this._titleSize = 0;
                _yuitest_coverline("build/axis/axis.js", 1927);
this._setTitle();
                _yuitest_coverline("build/axis/axis.js", 1928);
explicitlySized = layout.getExplicitlySized.apply(this, [styles]);
                _yuitest_coverline("build/axis/axis.js", 1929);
for(; i < len; ++i)
                {
                    _yuitest_coverline("build/axis/axis.js", 1931);
if(drawTicks)
                    {
                        _yuitest_coverline("build/axis/axis.js", 1933);
layout.drawTick.apply(this, [tickPath, tickPoint, majorTickStyles]);
                    }
                    _yuitest_coverline("build/axis/axis.js", 1935);
position = this.getPosition(tickPoint);
                    _yuitest_coverline("build/axis/axis.js", 1936);
label = this.getLabel(tickPoint, labelStyles);
                    _yuitest_coverline("build/axis/axis.js", 1937);
this._labels.push(label);
                    _yuitest_coverline("build/axis/axis.js", 1938);
this._tickPoints.push({x:tickPoint.x, y:tickPoint.y});
                    _yuitest_coverline("build/axis/axis.js", 1939);
this.get("appendLabelFunction")(label, labelFunction.apply(labelFunctionScope, [this._getLabelByIndex(i, len, direction), labelFormat]));
                    _yuitest_coverline("build/axis/axis.js", 1940);
labelWidth = Math.round(label.offsetWidth);
                    _yuitest_coverline("build/axis/axis.js", 1941);
labelHeight = Math.round(label.offsetHeight);
                    _yuitest_coverline("build/axis/axis.js", 1942);
if(!explicitlySized)
                    {
                        _yuitest_coverline("build/axis/axis.js", 1944);
this._layout.updateMaxLabelSize.apply(this, [labelWidth, labelHeight]);
                    }
                    _yuitest_coverline("build/axis/axis.js", 1946);
this._labelWidths.push(labelWidth);
                    _yuitest_coverline("build/axis/axis.js", 1947);
this._labelHeights.push(labelHeight);
                    _yuitest_coverline("build/axis/axis.js", 1948);
tickPoint = this.getNextPoint(tickPoint, majorUnitDistance);
                }
                _yuitest_coverline("build/axis/axis.js", 1950);
this._clearLabelCache();
                _yuitest_coverline("build/axis/axis.js", 1951);
if(this.get("overlapGraph"))
                {
                   _yuitest_coverline("build/axis/axis.js", 1953);
layout.offsetNodeForTick.apply(this, [this.get("contentBox")]);
                }
                _yuitest_coverline("build/axis/axis.js", 1955);
layout.setCalculatedSize.apply(this);
                _yuitest_coverline("build/axis/axis.js", 1956);
if(this._titleTextField)
                {
                    _yuitest_coverline("build/axis/axis.js", 1958);
this._layout.positionTitle.apply(this, [this._titleTextField]);
                }
                _yuitest_coverline("build/axis/axis.js", 1960);
for(i = 0; i < len; ++i)
                {
                    _yuitest_coverline("build/axis/axis.js", 1962);
layout.positionLabel.apply(this, [this.get("labels")[i], this._tickPoints[i], styles, i]);
                }
            }
        }
        _yuitest_coverline("build/axis/axis.js", 1966);
this._drawing = false;
        _yuitest_coverline("build/axis/axis.js", 1967);
if(this._callLater)
        {
            _yuitest_coverline("build/axis/axis.js", 1969);
this._drawAxis();
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 1973);
this._updatePathElement();
            _yuitest_coverline("build/axis/axis.js", 1974);
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
        _yuitest_coverfunc("build/axis/axis.js", "_setTotalTitleSize", 1985);
_yuitest_coverline("build/axis/axis.js", 1987);
var title = this._titleTextField,
            w = title.offsetWidth,
            h = title.offsetHeight,
            rot = this._titleRotationProps.rot,
            bounds,
            size,
            margin = styles.margin,
            position = this.get("position"),
            matrix = new Y.Matrix();
        _yuitest_coverline("build/axis/axis.js", 1996);
matrix.rotate(rot);
        _yuitest_coverline("build/axis/axis.js", 1997);
bounds = matrix.getContentRect(w, h);
        _yuitest_coverline("build/axis/axis.js", 1998);
if(position == "left" || position == "right")
        {
            _yuitest_coverline("build/axis/axis.js", 2000);
size = bounds.right - bounds.left;
            _yuitest_coverline("build/axis/axis.js", 2001);
if(margin)
            {
                _yuitest_coverline("build/axis/axis.js", 2003);
size += margin.left + margin.right;
            }
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 2008);
size = bounds.bottom - bounds.top;
            _yuitest_coverline("build/axis/axis.js", 2009);
if(margin)
            {
                _yuitest_coverline("build/axis/axis.js", 2011);
size += margin.top + margin.bottom;
            }
        }
        _yuitest_coverline("build/axis/axis.js", 2014);
this._titleBounds = bounds;
        _yuitest_coverline("build/axis/axis.js", 2015);
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
        _yuitest_coverfunc("build/axis/axis.js", "_updatePathElement", 2024);
_yuitest_coverline("build/axis/axis.js", 2026);
var path = this._path,
            tickPath = this._tickPath,
            redrawGraphic = false,
            graphic = this.get("graphic");
        _yuitest_coverline("build/axis/axis.js", 2030);
if(path)
        {
            _yuitest_coverline("build/axis/axis.js", 2032);
redrawGraphic = true;
            _yuitest_coverline("build/axis/axis.js", 2033);
path.end();
        }
        _yuitest_coverline("build/axis/axis.js", 2035);
if(tickPath)
        {
            _yuitest_coverline("build/axis/axis.js", 2037);
redrawGraphic = true;
            _yuitest_coverline("build/axis/axis.js", 2038);
tickPath.end();
        }
        _yuitest_coverline("build/axis/axis.js", 2040);
if(redrawGraphic)
        {
            _yuitest_coverline("build/axis/axis.js", 2042);
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
        _yuitest_coverfunc("build/axis/axis.js", "_setTitle", 2052);
_yuitest_coverline("build/axis/axis.js", 2054);
var i,
            styles,
            customStyles,
            title = this.get("title"),
            titleTextField = this._titleTextField,
            parentNode;
        _yuitest_coverline("build/axis/axis.js", 2060);
if(title !== null && title !== undefined)
        {
            _yuitest_coverline("build/axis/axis.js", 2062);
customStyles = {
                    rotation: "rotation",
                    margin: "margin",
                    alpha: "alpha"
            };
            _yuitest_coverline("build/axis/axis.js", 2067);
styles = this.get("styles").title;
            _yuitest_coverline("build/axis/axis.js", 2068);
if(!titleTextField)
            {
                _yuitest_coverline("build/axis/axis.js", 2070);
titleTextField = DOCUMENT.createElement('span');
                _yuitest_coverline("build/axis/axis.js", 2071);
titleTextField.style.display = "block";
                _yuitest_coverline("build/axis/axis.js", 2072);
titleTextField.style.whiteSpace = "nowrap";
                _yuitest_coverline("build/axis/axis.js", 2073);
titleTextField.setAttribute("class", "axisTitle");
                _yuitest_coverline("build/axis/axis.js", 2074);
this.get("contentBox").append(titleTextField);
            }
            else {_yuitest_coverline("build/axis/axis.js", 2076);
if(!DOCUMENT.createElementNS)
            {
                _yuitest_coverline("build/axis/axis.js", 2078);
if(titleTextField.style.filter)
                {
                    _yuitest_coverline("build/axis/axis.js", 2080);
titleTextField.style.filter = null;
                }
            }}
            _yuitest_coverline("build/axis/axis.js", 2083);
titleTextField.style.position = "absolute";
            _yuitest_coverline("build/axis/axis.js", 2084);
for(i in styles)
            {
                _yuitest_coverline("build/axis/axis.js", 2086);
if(styles.hasOwnProperty(i) && !customStyles.hasOwnProperty(i))
                {
                    _yuitest_coverline("build/axis/axis.js", 2088);
titleTextField.style[i] = styles[i];
                }
            }
            _yuitest_coverline("build/axis/axis.js", 2091);
this.get("appendTitleFunction")(titleTextField, title);
            _yuitest_coverline("build/axis/axis.js", 2092);
this._titleTextField = titleTextField;
            _yuitest_coverline("build/axis/axis.js", 2093);
this._titleRotationProps = this._getTextRotationProps(styles);
            _yuitest_coverline("build/axis/axis.js", 2094);
this._setTotalTitleSize(styles);
        }
        else {_yuitest_coverline("build/axis/axis.js", 2096);
if(titleTextField)
        {
            _yuitest_coverline("build/axis/axis.js", 2098);
parentNode = titleTextField.parentNode;
            _yuitest_coverline("build/axis/axis.js", 2099);
if(parentNode)
            {
                _yuitest_coverline("build/axis/axis.js", 2101);
parentNode.removeChild(titleTextField);
            }
            _yuitest_coverline("build/axis/axis.js", 2103);
this._titleTextField = null;
            _yuitest_coverline("build/axis/axis.js", 2104);
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
        _yuitest_coverfunc("build/axis/axis.js", "getLabel", 2117);
_yuitest_coverline("build/axis/axis.js", 2119);
var i,
            label,
            labelCache = this._labelCache,
            customStyles = {
                rotation: "rotation",
                margin: "margin",
                alpha: "alpha"
            };
        _yuitest_coverline("build/axis/axis.js", 2127);
if(labelCache && labelCache.length > 0)
        {
            _yuitest_coverline("build/axis/axis.js", 2129);
label = labelCache.shift();
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 2133);
label = DOCUMENT.createElement("span");
            _yuitest_coverline("build/axis/axis.js", 2134);
label.className = Y.Lang.trim([label.className, "axisLabel"].join(' '));
            _yuitest_coverline("build/axis/axis.js", 2135);
this.get("contentBox").append(label);
        }
        _yuitest_coverline("build/axis/axis.js", 2137);
if(!DOCUMENT.createElementNS)
        {
            _yuitest_coverline("build/axis/axis.js", 2139);
if(label.style.filter)
            {
                _yuitest_coverline("build/axis/axis.js", 2141);
label.style.filter = null;
            }
        }
        _yuitest_coverline("build/axis/axis.js", 2144);
label.style.display = "block";
        _yuitest_coverline("build/axis/axis.js", 2145);
label.style.whiteSpace = "nowrap";
        _yuitest_coverline("build/axis/axis.js", 2146);
label.style.position = "absolute";
        _yuitest_coverline("build/axis/axis.js", 2147);
for(i in styles)
        {
            _yuitest_coverline("build/axis/axis.js", 2149);
if(styles.hasOwnProperty(i) && !customStyles.hasOwnProperty(i))
            {
                _yuitest_coverline("build/axis/axis.js", 2151);
label.style[i] = styles[i];
            }
        }
        _yuitest_coverline("build/axis/axis.js", 2154);
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
        _yuitest_coverfunc("build/axis/axis.js", "_createLabelCache", 2163);
_yuitest_coverline("build/axis/axis.js", 2165);
if(this._labels)
        {
            _yuitest_coverline("build/axis/axis.js", 2167);
while(this._labels.length > 0)
            {
                _yuitest_coverline("build/axis/axis.js", 2169);
this._labelCache.push(this._labels.shift());
            }
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 2174);
this._clearLabelCache();
        }
        _yuitest_coverline("build/axis/axis.js", 2176);
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
        _yuitest_coverfunc("build/axis/axis.js", "_clearLabelCache", 2185);
_yuitest_coverline("build/axis/axis.js", 2187);
if(this._labelCache)
        {
            _yuitest_coverline("build/axis/axis.js", 2189);
var len = this._labelCache.length,
                i = 0,
                label;
            _yuitest_coverline("build/axis/axis.js", 2192);
for(; i < len; ++i)
            {
                _yuitest_coverline("build/axis/axis.js", 2194);
label = this._labelCache[i];
                _yuitest_coverline("build/axis/axis.js", 2195);
this._removeChildren(label);
                _yuitest_coverline("build/axis/axis.js", 2196);
Y.Event.purgeElement(label, true);
                _yuitest_coverline("build/axis/axis.js", 2197);
label.parentNode.removeChild(label);
            }
        }
        _yuitest_coverline("build/axis/axis.js", 2200);
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
        _yuitest_coverfunc("build/axis/axis.js", "getLineEnd", 2210);
_yuitest_coverline("build/axis/axis.js", 2212);
var w = this.get("width"),
            h = this.get("height"),
            pos = this.get("position");
        _yuitest_coverline("build/axis/axis.js", 2215);
if(pos === "top" || pos === "bottom")
        {
            _yuitest_coverline("build/axis/axis.js", 2217);
return {x:w, y:pt.y};
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 2221);
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
        _yuitest_coverfunc("build/axis/axis.js", "getLength", 2232);
_yuitest_coverline("build/axis/axis.js", 2234);
var l,
            style = this.get("styles"),
            padding = style.padding,
            w = this.get("width"),
            h = this.get("height"),
            pos = this.get("position");
        _yuitest_coverline("build/axis/axis.js", 2240);
if(pos === "top" || pos === "bottom")
        {
            _yuitest_coverline("build/axis/axis.js", 2242);
l = w - (padding.left + padding.right);
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 2246);
l = h - (padding.top + padding.bottom);
        }
        _yuitest_coverline("build/axis/axis.js", 2248);
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
        _yuitest_coverfunc("build/axis/axis.js", "getFirstPoint", 2259);
_yuitest_coverline("build/axis/axis.js", 2261);
var style = this.get("styles"),
            pos = this.get("position"),
            padding = style.padding,
            np = {x:pt.x, y:pt.y};
        _yuitest_coverline("build/axis/axis.js", 2265);
if(pos === "top" || pos === "bottom")
        {
            _yuitest_coverline("build/axis/axis.js", 2267);
np.x += padding.left + this.get("edgeOffset");
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 2271);
np.y += this.get("height") - (padding.top + this.get("edgeOffset"));
        }
        _yuitest_coverline("build/axis/axis.js", 2273);
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
        _yuitest_coverfunc("build/axis/axis.js", "getNextPoint", 2285);
_yuitest_coverline("build/axis/axis.js", 2287);
var pos = this.get("position");
        _yuitest_coverline("build/axis/axis.js", 2288);
if(pos === "top" || pos === "bottom")
        {
            _yuitest_coverline("build/axis/axis.js", 2290);
point.x = point.x + majorUnitDistance;
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 2294);
point.y = point.y - majorUnitDistance;
        }
        _yuitest_coverline("build/axis/axis.js", 2296);
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
        _yuitest_coverfunc("build/axis/axis.js", "getLastPoint", 2306);
_yuitest_coverline("build/axis/axis.js", 2308);
var style = this.get("styles"),
            padding = style.padding,
            w = this.get("width"),
            pos = this.get("position");
        _yuitest_coverline("build/axis/axis.js", 2312);
if(pos === "top" || pos === "bottom")
        {
            _yuitest_coverline("build/axis/axis.js", 2314);
return {x:w - padding.right, y:padding.top};
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 2318);
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
        _yuitest_coverfunc("build/axis/axis.js", "getPosition", 2329);
_yuitest_coverline("build/axis/axis.js", 2331);
var p,
            h = this.get("height"),
            style = this.get("styles"),
            padding = style.padding,
            pos = this.get("position"),
            dataType = this.get("dataType");
        _yuitest_coverline("build/axis/axis.js", 2337);
if(pos === "left" || pos === "right")
        {
            //Numeric data on a vertical axis is displayed from bottom to top.
            //Categorical and Timeline data is displayed from top to bottom.
            _yuitest_coverline("build/axis/axis.js", 2341);
if(dataType === "numeric")
            {
                _yuitest_coverline("build/axis/axis.js", 2343);
p = (h - (padding.top + padding.bottom)) - (point.y - padding.top);
            }
            else
            {
                _yuitest_coverline("build/axis/axis.js", 2347);
p = point.y - padding.top;
            }
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 2352);
p = point.x - padding.left;
        }
        _yuitest_coverline("build/axis/axis.js", 2354);
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
        _yuitest_coverfunc("build/axis/axis.js", "_rotate", 2365);
_yuitest_coverline("build/axis/axis.js", 2367);
var rot = props.rot,
            x = props.x,
            y = props.y,
            filterString,
            textAlpha,
            matrix = new Y.Matrix(),
            transformOrigin = props.transformOrigin || [0, 0],
            offsetRect;
        _yuitest_coverline("build/axis/axis.js", 2375);
if(DOCUMENT.createElementNS)
        {
            _yuitest_coverline("build/axis/axis.js", 2377);
matrix.translate(x, y);
            _yuitest_coverline("build/axis/axis.js", 2378);
matrix.rotate(rot);
            _yuitest_coverline("build/axis/axis.js", 2379);
Y_DOM.setStyle(label, "transformOrigin", (transformOrigin[0] * 100) + "% " + (transformOrigin[1] * 100) + "%");
            _yuitest_coverline("build/axis/axis.js", 2380);
Y_DOM.setStyle(label, "transform", matrix.toCSSText());
        }
        else
        {
            _yuitest_coverline("build/axis/axis.js", 2384);
textAlpha = props.textAlpha;
            _yuitest_coverline("build/axis/axis.js", 2385);
if(Y_Lang.isNumber(textAlpha) && textAlpha < 1 && textAlpha > -1 && !isNaN(textAlpha))
            {
                _yuitest_coverline("build/axis/axis.js", 2387);
filterString = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + Math.round(textAlpha * 100) + ")";
            }
            _yuitest_coverline("build/axis/axis.js", 2389);
if(rot !== 0)
            {
                //ms filters kind of, sort of uses a transformOrigin of 0, 0.
                //we'll translate the difference to create a true 0, 0 origin.
                _yuitest_coverline("build/axis/axis.js", 2393);
matrix.rotate(rot);
                _yuitest_coverline("build/axis/axis.js", 2394);
offsetRect = matrix.getContentRect(props.labelWidth, props.labelHeight);
                _yuitest_coverline("build/axis/axis.js", 2395);
matrix.init();
                _yuitest_coverline("build/axis/axis.js", 2396);
matrix.translate(offsetRect.left, offsetRect.top);
                _yuitest_coverline("build/axis/axis.js", 2397);
matrix.translate(x, y);
                _yuitest_coverline("build/axis/axis.js", 2398);
this._simulateRotateWithTransformOrigin(matrix, rot, transformOrigin, props.labelWidth, props.labelHeight);
                _yuitest_coverline("build/axis/axis.js", 2399);
if(filterString)
                {
                    _yuitest_coverline("build/axis/axis.js", 2401);
filterString += " ";
                }
                else
                {
                    _yuitest_coverline("build/axis/axis.js", 2405);
filterString = "";
                }
                _yuitest_coverline("build/axis/axis.js", 2407);
filterString += matrix.toFilterText();
                _yuitest_coverline("build/axis/axis.js", 2408);
label.style.left = matrix.dx + "px";
                _yuitest_coverline("build/axis/axis.js", 2409);
label.style.top = matrix.dy + "px";
            }
            else
            {
                _yuitest_coverline("build/axis/axis.js", 2413);
label.style.left = x + "px";
                _yuitest_coverline("build/axis/axis.js", 2414);
label.style.top = y + "px";
            }
            _yuitest_coverline("build/axis/axis.js", 2416);
if(filterString)
            {
                _yuitest_coverline("build/axis/axis.js", 2418);
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
        _yuitest_coverfunc("build/axis/axis.js", "_simulateRotateWithTransformOrigin", 2435);
_yuitest_coverline("build/axis/axis.js", 2437);
var transformX = transformOrigin[0] * w,
            transformY = transformOrigin[1] * h;
        _yuitest_coverline("build/axis/axis.js", 2439);
transformX = !isNaN(transformX) ? transformX : 0;
        _yuitest_coverline("build/axis/axis.js", 2440);
transformY = !isNaN(transformY) ? transformY : 0;
        _yuitest_coverline("build/axis/axis.js", 2441);
matrix.translate(transformX, transformY);
        _yuitest_coverline("build/axis/axis.js", 2442);
matrix.rotate(rot);
        _yuitest_coverline("build/axis/axis.js", 2443);
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
        _yuitest_coverfunc("build/axis/axis.js", "getMaxLabelBounds", 2452);
_yuitest_coverline("build/axis/axis.js", 2454);
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
        _yuitest_coverfunc("build/axis/axis.js", "getMinLabelBounds", 2463);
_yuitest_coverline("build/axis/axis.js", 2465);
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
        _yuitest_coverfunc("build/axis/axis.js", "_getLabelBounds", 2476);
_yuitest_coverline("build/axis/axis.js", 2478);
var layout = this._layout,
            labelStyles = this.get("styles").label,
            matrix = new Y.Matrix(),
            label,
            props = this._getTextRotationProps(labelStyles);
            _yuitest_coverline("build/axis/axis.js", 2483);
props.transformOrigin = layout._getTransformOrigin(props.rot);
        _yuitest_coverline("build/axis/axis.js", 2484);
label = this.getLabel({x: 0, y: 0}, labelStyles);
        _yuitest_coverline("build/axis/axis.js", 2485);
this.get("appendLabelFunction")(label, this.get("labelFunction").apply(this, [val, this.get("labelFormat")]));
        _yuitest_coverline("build/axis/axis.js", 2486);
props.labelWidth = label.offsetWidth;
        _yuitest_coverline("build/axis/axis.js", 2487);
props.labelHeight = label.offsetHeight;
        _yuitest_coverline("build/axis/axis.js", 2488);
this._removeChildren(label);
        _yuitest_coverline("build/axis/axis.js", 2489);
Y.Event.purgeElement(label, true);
        _yuitest_coverline("build/axis/axis.js", 2490);
label.parentNode.removeChild(label);
        _yuitest_coverline("build/axis/axis.js", 2491);
props.x = 0;
        _yuitest_coverline("build/axis/axis.js", 2492);
props.y = 0;
        _yuitest_coverline("build/axis/axis.js", 2493);
layout._setRotationCoords(props);
        _yuitest_coverline("build/axis/axis.js", 2494);
matrix.translate(props.x, props.y);
        _yuitest_coverline("build/axis/axis.js", 2495);
this._simulateRotateWithTransformOrigin(matrix, props.rot, props.transformOrigin, props.labelWidth, props.labelHeight);
        _yuitest_coverline("build/axis/axis.js", 2496);
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
        _yuitest_coverfunc("build/axis/axis.js", "_removeChildren", 2506);
_yuitest_coverline("build/axis/axis.js", 2508);
if(node.hasChildNodes())
        {
            _yuitest_coverline("build/axis/axis.js", 2510);
var child;
            _yuitest_coverline("build/axis/axis.js", 2511);
while(node.firstChild)
            {
                _yuitest_coverline("build/axis/axis.js", 2513);
child = node.firstChild;
                _yuitest_coverline("build/axis/axis.js", 2514);
this._removeChildren(child);
                _yuitest_coverline("build/axis/axis.js", 2515);
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
        _yuitest_coverfunc("build/axis/axis.js", "destructor", 2526);
_yuitest_coverline("build/axis/axis.js", 2528);
var cb = this.get("contentBox").getDOMNode(),
            labels = this.get("labels"),
            graphic = this.get("graphic"),
            label,
            len = labels ? labels.length : 0;
        _yuitest_coverline("build/axis/axis.js", 2533);
if(len > 0)
        {
            _yuitest_coverline("build/axis/axis.js", 2535);
while(labels.length > 0)
            {
                _yuitest_coverline("build/axis/axis.js", 2537);
label = labels.shift();
                _yuitest_coverline("build/axis/axis.js", 2538);
this._removeChildren(label);
                _yuitest_coverline("build/axis/axis.js", 2539);
cb.removeChild(label);
                _yuitest_coverline("build/axis/axis.js", 2540);
label = null;
            }
        }
        _yuitest_coverline("build/axis/axis.js", 2543);
if(graphic)
        {
            _yuitest_coverline("build/axis/axis.js", 2545);
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
        _yuitest_coverfunc("build/axis/axis.js", "_setText", 2567);
_yuitest_coverline("build/axis/axis.js", 2569);
textField.innerHTML = "";
        _yuitest_coverline("build/axis/axis.js", 2570);
if(Y_Lang.isNumber(val))
        {
            _yuitest_coverline("build/axis/axis.js", 2572);
val = val + "";
        }
        else {_yuitest_coverline("build/axis/axis.js", 2574);
if(!val)
        {
            _yuitest_coverline("build/axis/axis.js", 2576);
val = "";
        }}
        _yuitest_coverline("build/axis/axis.js", 2578);
if(IS_STRING(val))
        {
            _yuitest_coverline("build/axis/axis.js", 2580);
val = DOCUMENT.createTextNode(val);
        }
        _yuitest_coverline("build/axis/axis.js", 2582);
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
        _yuitest_coverfunc("build/axis/axis.js", "getTotalMajorUnits", 2591);
_yuitest_coverline("build/axis/axis.js", 2593);
var units,
            majorUnit = this.get("styles").majorUnit,
            len = this.getLength();
        _yuitest_coverline("build/axis/axis.js", 2596);
if(majorUnit.determinant === "count")
        {
            _yuitest_coverline("build/axis/axis.js", 2598);
units = majorUnit.count;
        }
        else {_yuitest_coverline("build/axis/axis.js", 2600);
if(majorUnit.determinant === "distance")
        {
            _yuitest_coverline("build/axis/axis.js", 2602);
units = (len/majorUnit.distance) + 1;
        }}
        _yuitest_coverline("build/axis/axis.js", 2604);
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
        _yuitest_coverfunc("build/axis/axis.js", "getMajorUnitDistance", 2616);
_yuitest_coverline("build/axis/axis.js", 2618);
var dist;
        _yuitest_coverline("build/axis/axis.js", 2619);
if(majorUnit.determinant === "count")
        {
            _yuitest_coverline("build/axis/axis.js", 2621);
dist = uiLen/(len - 1);
        }
        else {_yuitest_coverline("build/axis/axis.js", 2623);
if(majorUnit.determinant === "distance")
        {
            _yuitest_coverline("build/axis/axis.js", 2625);
dist = majorUnit.distance;
        }}
        _yuitest_coverline("build/axis/axis.js", 2627);
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
        _yuitest_coverfunc("build/axis/axis.js", "_hasDataOverflow", 2639);
_yuitest_coverline("build/axis/axis.js", 2641);
if(this.get("setMin") || this.get("setMax"))
        {
            _yuitest_coverline("build/axis/axis.js", 2643);
return true;
        }
        _yuitest_coverline("build/axis/axis.js", 2645);
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
        _yuitest_coverfunc("build/axis/axis.js", "getMinimumValue", 2655);
_yuitest_coverline("build/axis/axis.js", 2657);
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
        _yuitest_coverfunc("build/axis/axis.js", "getMaximumValue", 2667);
_yuitest_coverline("build/axis/axis.js", 2669);
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
                _yuitest_coverfunc("build/axis/axis.js", "getter", 2687);
_yuitest_coverline("build/axis/axis.js", 2689);
if(this._explicitWidth)
                {
                    _yuitest_coverline("build/axis/axis.js", 2691);
return this._explicitWidth;
                }
                _yuitest_coverline("build/axis/axis.js", 2693);
return this._calculatedWidth;
            },

            setter: function(val)
            {
                _yuitest_coverfunc("build/axis/axis.js", "setter", 2696);
_yuitest_coverline("build/axis/axis.js", 2698);
this._explicitWidth = val;
                _yuitest_coverline("build/axis/axis.js", 2699);
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
                _yuitest_coverfunc("build/axis/axis.js", "getter", 2716);
_yuitest_coverline("build/axis/axis.js", 2718);
if(this._explicitHeight)
                {
                    _yuitest_coverline("build/axis/axis.js", 2720);
return this._explicitHeight;
                }
                _yuitest_coverline("build/axis/axis.js", 2722);
return this._calculatedHeight;
            },

            setter: function(val)
            {
                _yuitest_coverfunc("build/axis/axis.js", "setter", 2725);
_yuitest_coverline("build/axis/axis.js", 2727);
this._explicitHeight = val;
                _yuitest_coverline("build/axis/axis.js", 2728);
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
                _yuitest_coverfunc("build/axis/axis.js", "getter", 2741);
_yuitest_coverline("build/axis/axis.js", 2743);
return this._calculatedWidth;
            },

            setter: function(val)
            {
                _yuitest_coverfunc("build/axis/axis.js", "setter", 2746);
_yuitest_coverline("build/axis/axis.js", 2748);
this._calculatedWidth = val;
                _yuitest_coverline("build/axis/axis.js", 2749);
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
                _yuitest_coverfunc("build/axis/axis.js", "getter", 2762);
_yuitest_coverline("build/axis/axis.js", 2764);
return this._calculatedHeight;
            },

            setter: function(val)
            {
                _yuitest_coverfunc("build/axis/axis.js", "setter", 2767);
_yuitest_coverline("build/axis/axis.js", 2769);
this._calculatedHeight = val;
                _yuitest_coverline("build/axis/axis.js", 2770);
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
                _yuitest_coverfunc("build/axis/axis.js", "getter", 2803);
_yuitest_coverline("build/axis/axis.js", 2805);
if(!this._path)
                {
                    _yuitest_coverline("build/axis/axis.js", 2807);
var graphic = this.get("graphic");
                    _yuitest_coverline("build/axis/axis.js", 2808);
if(graphic)
                    {
                        _yuitest_coverline("build/axis/axis.js", 2810);
this._path = graphic.addShape({type:"path"});
                    }
                }
                _yuitest_coverline("build/axis/axis.js", 2813);
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
                _yuitest_coverfunc("build/axis/axis.js", "getter", 2826);
_yuitest_coverline("build/axis/axis.js", 2828);
if(!this._tickPath)
                {
                    _yuitest_coverline("build/axis/axis.js", 2830);
var graphic = this.get("graphic");
                    _yuitest_coverline("build/axis/axis.js", 2831);
if(graphic)
                    {
                        _yuitest_coverline("build/axis/axis.js", 2833);
this._tickPath = graphic.addShape({type:"path"});
                    }
                }
                _yuitest_coverline("build/axis/axis.js", 2836);
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
            setter: function(val)
            {
                _yuitest_coverfunc("build/axis/axis.js", "setter", 2855);
_yuitest_coverline("build/axis/axis.js", 2857);
var layoutClass = this._layoutClasses[val];
                _yuitest_coverline("build/axis/axis.js", 2858);
if(val && val != "none")
                {
                    _yuitest_coverline("build/axis/axis.js", 2860);
this._layout = new layoutClass();
                }
                _yuitest_coverline("build/axis/axis.js", 2862);
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
                _yuitest_coverfunc("build/axis/axis.js", "getter", 2918);
_yuitest_coverline("build/axis/axis.js", 2920);
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
                _yuitest_coverfunc("build/axis/axis.js", "getter", 2933);
_yuitest_coverline("build/axis/axis.js", 2935);
if(this.get("position") == "none")
                {
                    _yuitest_coverline("build/axis/axis.js", 2937);
return this.get("styles").majorUnit.count;
                }
                _yuitest_coverline("build/axis/axis.js", 2939);
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
                _yuitest_coverfunc("build/axis/axis.js", "validator", 2953);
_yuitest_coverline("build/axis/axis.js", 2955);
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
                _yuitest_coverfunc("build/axis/axis.js", "getter", 2967);
_yuitest_coverline("build/axis/axis.js", 2969);
return this._maxLabelSize;
            },

            setter: function(val)
            {
                _yuitest_coverfunc("build/axis/axis.js", "setter", 2972);
_yuitest_coverline("build/axis/axis.js", 2974);
this._maxLabelSize = val;
                _yuitest_coverline("build/axis/axis.js", 2975);
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
                _yuitest_coverfunc("build/axis/axis.js", "valueFn", 3010);
_yuitest_coverline("build/axis/axis.js", 3012);
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
                _yuitest_coverfunc("build/axis/axis.js", "valueFn", 3031);
_yuitest_coverline("build/axis/axis.js", 3033);
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
_yuitest_coverline("build/axis/axis.js", 3092);
Y.AxisType = Y.Base.create("baseAxis", Y.Axis, [], {});


}, '@VERSION@', {"requires": ["dom", "widget", "widget-position", "widget-stack", "graphics", "axis-base"]});
