/**
 * This class we summarize the data and returns it when required.
 */
Ext.define("Ext.draw.SegmentTree", {

    config: {
        strategy: "double"
    },

    /**
     * @private
     * @param {Object} result
     * @param {Number} last
     * @param {Number} dataX
     * @param {Number} dataOpen
     * @param {Number} dataHigh
     * @param {Number} dataLow
     * @param {Number} dataClose
     */
    time: function (result, last, dataX, dataOpen, dataHigh, dataLow, dataClose) {
        var start = 0, lastOffset, lastOffsetEnd,
            minimum = new Date(dataX[result.startIdx[0]]),
            maximum = new Date(dataX[result.endIdx[last - 1]]),
            extDate = Ext.Date,
            units = [
                [extDate.MILLI, 1, 'ms1', null],
                [extDate.MILLI, 2, 'ms2', 'ms1'],
                [extDate.MILLI, 5, 'ms5', 'ms1'],
                [extDate.MILLI, 10, 'ms10', 'ms5'],
                [extDate.MILLI, 50, 'ms50', 'ms10'],
                [extDate.MILLI, 100, 'ms100', 'ms50'],
                [extDate.MILLI, 500, 'ms500', 'ms100'],
                [extDate.SECOND, 1, 's1', 'ms500'],
                [extDate.SECOND, 10, 's10', 's1'],
                [extDate.SECOND, 30, 's30', 's10'],
                [extDate.MINUTE, 1, 'mi1', 's10'],
                [extDate.MINUTE, 5, 'mi5', 'mi1'],
                [extDate.MINUTE, 10, 'mi10', 'mi5'],
                [extDate.MINUTE, 30, 'mi30', 'mi10'],
                [extDate.HOUR, 1, 'h1', 'mi30'],
                [extDate.HOUR, 6, 'h6', 'h1'],
                [extDate.HOUR, 12, 'h12', 'h6'],
                [extDate.DAY, 1, 'd1', 'h12'],
                [extDate.DAY, 7, 'd7', 'd1'],
                [extDate.MONTH, 1, 'mo1', 'd1'],
                [extDate.MONTH, 3, 'mo3', 'mo1'],
                [extDate.MONTH, 6, 'mo6', 'mo3'],
                [extDate.YEAR, 1, 'y1', 'mo3'],
                [extDate.YEAR, 5, 'y5', 'y1'],
                [extDate.YEAR, 10, 'y10', 'y5'],
                [extDate.YEAR, 100, 'y100', 'y10']
            ], unitIdx, currentUnit,
            plainStart = start,
            plainEnd = last,
            first = false,
            startIdxs = result.startIdx,
            endIdxs = result.endIdx,
            minIdxs = result.minIdx,
            maxIdxs = result.maxIdx,
            opens = result.open,
            closes = result.close,
            minXs = result.minX,
            minYs = result.minY,
            maxXs = result.maxX,
            maxYs = result.maxY,
            i, current;

        for (unitIdx = 0; last > start + 1 && unitIdx < units.length; unitIdx++) {
            minimum = new Date(dataX[startIdxs[0]]);
            currentUnit = units[unitIdx];
            minimum = extDate.align(minimum, currentUnit[0], currentUnit[1]);
            if (extDate.diff(minimum, maximum, currentUnit[0]) > dataX.length * 2 * currentUnit[1]) {
                continue;
            }
            if (currentUnit[3] && result.map['time_' + currentUnit[3]]) {
                lastOffset = result.map['time_' + currentUnit[3]][0];
                lastOffsetEnd = result.map['time_' + currentUnit[3]][1];
            } else {
                lastOffset = plainStart;
                lastOffsetEnd = plainEnd;
            }

            start = last;
            current = minimum;
            first = true;

            startIdxs[last] = startIdxs[lastOffset];
            endIdxs[last] = endIdxs[lastOffset];
            minIdxs[last] = minIdxs[lastOffset];
            maxIdxs[last] = maxIdxs[lastOffset];
            opens[last] = opens[lastOffset];
            closes[last] = closes[lastOffset];
            minXs[last] = minXs[lastOffset];
            minYs[last] = minYs[lastOffset];
            maxXs[last] = maxXs[lastOffset];
            maxYs[last] = maxYs[lastOffset];
            current = Ext.Date.add(current, currentUnit[0], currentUnit[1]);

            for (i = lastOffset + 1; i < lastOffsetEnd; i++) {
                if (dataX[endIdxs[i]] < +current) {
                    endIdxs[last] = endIdxs[i];
                    closes[last] = closes[i];
                    if (maxYs[i] > maxYs[last]) {
                        maxYs[last] = maxYs[i];
                        maxXs[last] = maxXs[i];
                        maxIdxs[last] = maxIdxs[i];
                    }
                    if (minYs[i] < minYs[last]) {
                        minYs[last] = minYs[i];
                        minXs[last] = minXs[i];
                        minIdxs[last] = minIdxs[i];
                    }
                } else {
                    last++;
                    startIdxs[last] = startIdxs[i];
                    endIdxs[last] = endIdxs[i];
                    minIdxs[last] = minIdxs[i];
                    maxIdxs[last] = maxIdxs[i];
                    opens[last] = opens[i];
                    closes[last] = closes[i];
                    minXs[last] = minXs[i];
                    minYs[last] = minYs[i];
                    maxXs[last] = maxXs[i];
                    maxYs[last] = maxYs[i];
                    current = Ext.Date.add(current, currentUnit[0], currentUnit[1]);
                }
            }
            if (last > start) {
                result.map['time_' + currentUnit[2]] = [start, last];
            }
        }
    },

    /**
     * @private
     * @param {Object} result
     * @param {Number} position
     * @param {Number} dataX
     * @param {Number} dataOpen
     * @param {Number} dataHigh
     * @param {Number} dataLow
     * @param {Number} dataClose
     */
    "double": function (result, position, dataX, dataOpen, dataHigh, dataLow, dataClose) {
        var offset = 0, lastOffset, step = 1,
            i,
            startIdx,
            endIdx,
            minIdx,
            maxIdx,
            open,
            close,
            minX,
            minY,
            maxX,
            maxY;
        while (position > offset + 1) {
            lastOffset = offset;
            offset = position;
            step += step;
            for (i = lastOffset; i < offset; i += 2) {
                if (i === offset - 1) {
                    startIdx = result.startIdx[i];
                    endIdx = result.endIdx[i];
                    minIdx = result.minIdx[i];
                    maxIdx = result.maxIdx[i];
                    open = result.open[i];
                    close = result.close[i];
                    minX = result.minX[i];
                    minY = result.minY[i];
                    maxX = result.maxX[i];
                    maxY = result.maxY[i];
                } else {

                    startIdx = result.startIdx[i];
                    endIdx = result.endIdx[i + 1];
                    open = result.open[i];
                    close = result.close[i];
                    if (result.minY[i] <= result.minY[i + 1]) {
                        minIdx = result.minIdx[i];
                        minX = result.minX[i];
                        minY = result.minY[i];
                    } else {
                        minIdx = result.minIdx[i + 1];
                        minX = result.minX[i + 1];
                        minY = result.minY[i + 1];
                    }
                    if (result.maxY[i] >= result.maxY[i + 1]) {
                        maxIdx = result.maxIdx[i];
                        maxX = result.maxX[i];
                        maxY = result.maxY[i];
                    } else {
                        maxIdx = result.maxIdx[i + 1];
                        maxX = result.maxX[i + 1];
                        maxY = result.maxY[i + 1];
                    }
                }
                result.startIdx[position] = startIdx;
                result.endIdx[position] = endIdx;
                result.minIdx[position] = minIdx;
                result.maxIdx[position] = maxIdx;
                result.open[position] = open;
                result.close[position] = close;
                result.minX[position] = minX;
                result.minY[position] = minY;
                result.maxX[position] = maxX;
                result.maxY[position] = maxY;
                position++;
            }
            result.map['double_' + step] = [offset, position];
        }
    },

    /**
     * @private
     */
    none: Ext.emptyFn,

    /**
     * @private
     *
     * @param {Number} dataX
     * @param {Number} dataOpen
     * @param {Number} dataHigh
     * @param {Number} dataLow
     * @param {Number} dataClose
     * @return {Object}
     */
    aggregateData: function (dataX, dataOpen, dataHigh, dataLow, dataClose) {
        var length = dataX.length,
            startIdx = [],
            endIdx = [],
            minIdx = [],
            maxIdx = [],
            open = [],
            minX = [],
            minY = [],
            maxX = [],
            maxY = [],
            close = [],
            result = {
                startIdx: startIdx,
                endIdx: endIdx,
                minIdx: minIdx,
                maxIdx: maxIdx,
                open: open,
                minX: minX,
                minY: minY,
                maxX: maxX,
                maxY: maxY,
                close: close
            },
            i;

        for (i = 0; i < length; i++) {
            startIdx[i] = i;
            endIdx[i] = i;
            minIdx[i] = i;
            maxIdx[i] = i;
            open[i] = dataOpen[i];
            minX[i] = dataX[i];
            minY[i] = dataLow[i];
            maxX[i] = dataX[i];
            maxY[i] = dataHigh[i];
            close[i] = dataClose[i];
        }

        result.map = {
            original: [0, length]
        };
        if (length) {
            this[this.getStrategy()](result, length, dataX, dataOpen, dataHigh, dataLow, dataClose);
        }
        return result;
    },

    /**
     * @private
     * @param {Object} items
     * @param {Number} start
     * @param {Number} end
     * @param {Number} key
     * @return {*}
     */
    binarySearchMin: function (items, start, end, key) {
        var dx = this.dataX;
        if (key <= dx[items.startIdx[0]]) {
            return start;
        }
        if (key >= dx[items.startIdx[end - 1]]) {
            return end - 1;
        }
        while (start + 1 < end) {
            var mid = (start + end) >> 1,
                val = dx[items.startIdx[mid]];
            if (val === key) {
                return mid;
            } else if (val < key) {
                start = mid;
            } else {
                end = mid;
            }
        }
        return start;
    },

    /**
     * @private
     * @param {Object} items
     * @param {Number} start
     * @param {Number} end
     * @param {Number} key
     * @return {*}
     */
    binarySearchMax: function (items, start, end, key) {
        var dx = this.dataX;
        if (key <= dx[items.endIdx[0]]) {
            return start;
        }
        if (key >= dx[items.endIdx[end - 1]]) {
            return end - 1;
        }
        while (start + 1 < end) {
            var mid = (start + end) >> 1,
                val = dx[items.endIdx[mid]];
            if (val === key) {
                return mid;
            } else if (val < key) {
                start = mid;
            } else {
                end = mid;
            }
        }
        return end;
    },

    constructor: function (config) {
        this.initConfig(config);
    },

    /**
     * Sets the data of the segment tree.
     * @param {Number} dataX
     * @param {Number} dataOpen
     * @param {Number} dataHigh
     * @param {Number} dataLow
     * @param {Number} dataClose
     */
    setData: function (dataX, dataOpen, dataHigh, dataLow, dataClose) {
        if (!dataHigh) {
            dataClose = dataLow = dataHigh = dataOpen;
        }
        this.dataX = dataX;
        this.dataOpen = dataOpen;
        this.dataHigh = dataHigh;
        this.dataLow = dataLow;
        this.dataClose = dataClose;
        if (dataX.length === dataHigh.length &&
            dataX.length === dataLow.length) {
            this.cache = this.aggregateData(dataX, dataOpen, dataHigh, dataLow, dataClose);
        }
    },

    /**
     * Returns the minimum range of data that fits the given range and step size.
     *
     * @param {Number} min
     * @param {Number} max
     * @param {Number} estStep
     * @return {Object} The aggregation information.
     * @return {Number} return.start
     * @return {Number} return.end
     * @return {Object} return.data The aggregated data
     */
    getAggregation: function (min, max, estStep) {
        if (!this.cache) {
            return null;
        }
        var minStep = Infinity,
            range = this.dataX[this.dataX.length - 1] - this.dataX[0],
            cacheMap = this.cache.map,
            result = cacheMap.original,
            name, positions, ln, step, minIdx, maxIdx;

        for (name in cacheMap) {
            positions = cacheMap[name];
            ln = positions[1] - positions[0] - 1;
            step = range / ln;
            if (estStep <= step && step < minStep) {
                result = positions;
                minStep = step;
            }
        }
        minIdx = Math.max(this.binarySearchMin(this.cache, result[0], result[1], min), result[0]);
        maxIdx = Math.min(this.binarySearchMax(this.cache, result[0], result[1], max) + 1, result[1]);
        return {
            data: this.cache,
            start: minIdx,
            end: maxIdx
        };
    }
});
