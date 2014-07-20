Ext.define('Ext.sparkline.CanvasBase', {
    requires: [
        'Ext.sparkline.Shape'
    ],

    shapeCount: 0,

    _pxregex: /(\d+)(px)?\s*$/i,

    setWidth: function(width) {
        this.pixelWidth = width;
    },

    setHeight: function(height) {
        this.pixelHeight = height;
    },

    drawLine: function (x1, y1, x2, y2, lineColor, lineWidth) {
        return this.drawShape([[x1, y1], [x2, y2]], lineColor, lineWidth);
    },

    drawShape: function (path, lineColor, fillColor, lineWidth) {
        return this._genShape('Shape', [path, lineColor, fillColor, lineWidth]);
    },

    drawCircle: function (x, y, radius, lineColor, fillColor, lineWidth) {
        return this._genShape('Circle', [x, y, radius, lineColor, fillColor, lineWidth]);
    },

    drawPieSlice: function (x, y, radius, startAngle, endAngle, lineColor, fillColor) {
        return this._genShape('PieSlice', [x, y, radius, startAngle, endAngle, lineColor, fillColor]);
    },

    drawRect: function (x, y, width, height, lineColor, fillColor) {
        return this._genShape('Rect', [x, y, width, height, lineColor, fillColor]);
    },

    getElement: function () {
        return this.el;
    },

    /*
     * Return the most recently inserted shape id
     */
    getLastShapeId: function () {
        return this.lastShapeId;
    },

    /*
     * Clear and reset the canvas
     */
    reset: function () {
        alert('reset not implemented');
    },

    /*
     * Generate a shape object and id for later rendering
     */
    _genShape: function (shapetype, shapeargs) {
        var id = this.shapeCount++;
        shapeargs.unshift(id);
        return new Ext.sparkline.Shape(this, id, shapetype, shapeargs);
    },

    /*
        * Add a shape to the end of the render queue
        */
    appendShape: function (shape) {
        alert('appendShape not implemented');
    },

    /*
        * Replace one shape with another
        */
    replaceWithShape: function (shapeid, shape) {
        alert('replaceWithShape not implemented');
    },

    /*
        * Insert one shape after another in the render queue
        */
    insertAfterShape: function (shapeid, shape) {
        alert('insertAfterShape not implemented');
    },

    /*
        * Remove a shape from the queue
        */
    removeShapeId: function (shapeid) {
        alert('removeShapeId not implemented');
    },

    /*
        * Find a shape at the specified x/y co-ordinates
        */
    getShapeAt: function (x, y) {
        alert('getShapeAt not implemented');
    },

    /*
        * Render all queued shapes onto the canvas
        */
    render: function () {
        alert('render not implemented');
    }
});
