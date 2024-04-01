// https://github.com/d3/d3-plugins/blob/master/box/box.js
// * Original source March 22, 2013
// * Enhancements integrated on May 13, 2018 for dc.js library only
// https://github.com/d3/d3-plugins/blob/master/LICENSE
// Copyright (c) 2012-2015, Michael Bostock
// All rights reserved.
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
// * Redistributions of source code must retain the above copyright notice, this
//   list of conditions and the following disclaimer.
//
// * Redistributions in binary form must reproduce the above copyright notice,
//   this list of conditions and the following disclaimer in the documentation
//   and/or other materials provided with the distribution.
//
// * The name Michael Bostock may not be used to endorse or promote products
//   derived from this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL MICHAEL BOSTOCK BE LIABLE FOR ANY DIRECT,
// INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
// BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
// OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
// NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
// EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
/*eslint complexity: 0*/
// Inspired by http://informationandvisualization.de/blog/box-plot
import { ascending, quantile, range } from 'd3-array';
import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { timerFlush } from 'd3-timer';
/**
 * Used by BoxPlot
 *
 * @hidden
 */
export const d3Box = function () {
    let width = 1;
    let height = 1;
    let duration = 0;
    const delay = 0;
    let domain = null;
    let value = Number;
    let whiskers = boxWhiskers;
    let quartiles = boxQuartiles;
    let tickFormat = null;
    // Enhanced attributes
    let renderDataPoints = false;
    const dataRadius = 3;
    let dataOpacity = 0.3;
    let dataWidthPortion = 0.8;
    let renderTitle = false;
    let showOutliers = true;
    let boldOutlier = false;
    // For each small multiple…
    function box(g) {
        g.each(function (data, index) {
            data = data.map(value).sort(ascending);
            const _g = select(this);
            const n = data.length;
            let min;
            let max;
            // Leave if there are no items.
            if (n === 0) {
                return;
            }
            // Compute quartiles. Must return exactly 3 elements.
            const quartileData = (data.quartiles = quartiles(data));
            // Compute whiskers. Must return exactly 2 elements, or null.
            const whiskerIndices = whiskers && whiskers.call(this, data, index);
            const whiskerData = whiskerIndices && whiskerIndices.map(_i => data[_i]);
            // Compute outliers. If no whiskers are specified, all data are 'outliers'.
            // We compute the outliers as indices, so that we can join across transitions!
            const outlierIndices = whiskerIndices
                ? range(0, whiskerIndices[0]).concat(range(whiskerIndices[1] + 1, n))
                : range(n);
            // Determine the maximum value based on if outliers are shown
            if (showOutliers) {
                min = data[0];
                max = data[n - 1];
            }
            else {
                min = data[whiskerIndices[0]];
                max = data[whiskerIndices[1]];
            }
            const pointIndices = range(whiskerIndices[0], whiskerIndices[1] + 1);
            // Compute the new x-scale.
            const x1 = scaleLinear()
                .domain((domain && domain.call(this, data, index)) || [min, max])
                .range([height, 0]);
            // Retrieve the old x-scale, if this is an update.
            const x0 = this.__chart__ || scaleLinear().domain([0, Infinity]).range(x1.range());
            // Stash the new scale.
            this.__chart__ = x1;
            // Note: the box, median, and box tick elements are fixed in number,
            // so we only have to handle enter and update. In contrast, the outliers
            // and other elements are variable, so we need to exit them! Variable
            // elements also fade in and out.
            // Update center line: the vertical line spanning the whiskers.
            const center = _g.selectAll('line.center').data(whiskerData ? [whiskerData] : []);
            center
                .enter()
                .insert('line', 'rect')
                .attr('class', 'center')
                .attr('x1', width / 2)
                .attr('y1', d => x0(d[0]))
                .attr('x2', width / 2)
                .attr('y2', d => x0(d[1]))
                .style('opacity', 1e-6)
                .transition()
                .duration(duration)
                .delay(delay)
                .style('opacity', 1)
                .attr('y1', d => x1(d[0]))
                .attr('y2', d => x1(d[1]));
            center
                .transition()
                .duration(duration)
                .delay(delay)
                .style('opacity', 1)
                .attr('x1', width / 2)
                .attr('x2', width / 2)
                .attr('y1', d => x1(d[0]))
                .attr('y2', d => x1(d[1]));
            center
                .exit()
                .transition()
                .duration(duration)
                .delay(delay)
                .style('opacity', 1e-6)
                .attr('y1', d => x1(d[0]))
                .attr('y2', d => x1(d[1]))
                .remove();
            // Update innerquartile box.
            const _box = _g.selectAll('rect.box').data([quartileData]);
            _box.enter()
                .append('rect')
                .attr('class', 'box')
                .attr('x', 0)
                .attr('y', d => x0(d[2]))
                .attr('width', width)
                .attr('height', d => x0(d[0]) - x0(d[2]))
                .style('fill-opacity', renderDataPoints ? 0.1 : 1)
                .transition()
                .duration(duration)
                .delay(delay)
                .attr('y', d => x1(d[2]))
                .attr('height', d => x1(d[0]) - x1(d[2]));
            _box.transition()
                .duration(duration)
                .delay(delay)
                .attr('width', width)
                .attr('y', d => x1(d[2]))
                .attr('height', d => x1(d[0]) - x1(d[2]));
            // Update median line.
            const medianLine = _g.selectAll('line.median').data([quartileData[1]]);
            medianLine
                .enter()
                .append('line')
                .attr('class', 'median')
                .attr('x1', 0)
                .attr('y1', x0)
                .attr('x2', width)
                .attr('y2', x0)
                .transition()
                .duration(duration)
                .delay(delay)
                .attr('y1', x1)
                .attr('y2', x1);
            medianLine
                .transition()
                .duration(duration)
                .delay(delay)
                .attr('x1', 0)
                .attr('x2', width)
                .attr('y1', x1)
                .attr('y2', x1);
            // Update whiskers.
            const whisker = _g.selectAll('line.whisker').data(whiskerData || []);
            whisker
                .enter()
                .insert('line', 'circle, text')
                .attr('class', 'whisker')
                .attr('x1', 0)
                .attr('y1', x0)
                .attr('x2', width)
                .attr('y2', x0)
                .style('opacity', 1e-6)
                .transition()
                .duration(duration)
                .delay(delay)
                .attr('y1', x1)
                .attr('y2', x1)
                .style('opacity', 1);
            whisker
                .transition()
                .duration(duration)
                .delay(delay)
                .attr('x1', 0)
                .attr('x2', width)
                .attr('y1', x1)
                .attr('y2', x1)
                .style('opacity', 1);
            whisker
                .exit()
                .transition()
                .duration(duration)
                .delay(delay)
                .attr('y1', x1)
                .attr('y2', x1)
                .style('opacity', 1e-6)
                .remove();
            // Update outliers.
            if (showOutliers) {
                const outlierClass = boldOutlier ? 'outlierBold' : 'outlier';
                const outlierSize = boldOutlier ? 3 : 5;
                const outlierX = boldOutlier
                    ? function () {
                        return Math.floor(Math.random() * (width * dataWidthPortion) +
                            1 +
                            (width - width * dataWidthPortion) / 2);
                    }
                    : function () {
                        return width / 2;
                    };
                const outlier = _g.selectAll(`circle.${outlierClass}`).data(outlierIndices, Number);
                outlier
                    .enter()
                    .insert('circle', 'text')
                    .attr('class', outlierClass)
                    .attr('r', outlierSize)
                    .attr('cx', outlierX)
                    .attr('cy', i => x0(data[i]))
                    .style('opacity', 1e-6)
                    .transition()
                    .duration(duration)
                    .delay(delay)
                    .attr('cy', i => x1(data[i]))
                    .style('opacity', 0.6);
                if (renderTitle) {
                    outlier.selectAll('title').remove();
                    outlier.append('title').text(i => data[i]);
                }
                outlier
                    .transition()
                    .duration(duration)
                    .delay(delay)
                    .attr('cx', outlierX)
                    .attr('cy', i => x1(data[i]))
                    .style('opacity', 0.6);
                outlier
                    .exit()
                    .transition()
                    .duration(duration)
                    .delay(delay)
                    .attr('cy', 0) // function (i) { return x1(d[i]); })
                    .style('opacity', 1e-6)
                    .remove();
            }
            // Update Values
            if (renderDataPoints) {
                const point = _g.selectAll('circle.data').data(pointIndices);
                point
                    .enter()
                    .insert('circle', 'text')
                    .attr('class', 'data')
                    .attr('r', dataRadius)
                    .attr('cx', () => Math.floor(Math.random() * (width * dataWidthPortion) +
                    1 +
                    (width - width * dataWidthPortion) / 2))
                    .attr('cy', i => x0(data[i]))
                    .style('opacity', 1e-6)
                    .transition()
                    .duration(duration)
                    .delay(delay)
                    .attr('cy', i => x1(data[i]))
                    .style('opacity', dataOpacity);
                if (renderTitle) {
                    point.selectAll('title').remove();
                    point.append('title').text(i => data[i]);
                }
                point
                    .transition()
                    .duration(duration)
                    .delay(delay)
                    .attr('cx', () => Math.floor(Math.random() * (width * dataWidthPortion) +
                    1 +
                    (width - width * dataWidthPortion) / 2))
                    .attr('cy', i => x1(data[i]))
                    .style('opacity', dataOpacity);
                point
                    .exit()
                    .transition()
                    .duration(duration)
                    .delay(delay)
                    .attr('cy', 0)
                    .style('opacity', 1e-6)
                    .remove();
            }
            // Compute the tick format.
            const format = tickFormat || x1.tickFormat(8);
            // Update box ticks.
            const boxTick = _g.selectAll('text.box').data(quartileData);
            // tslint:disable:no-bitwise
            boxTick
                .enter()
                .append('text')
                .attr('class', 'box')
                .attr('dy', '.3em')
                .attr('dx', (d, i) => (i & 1 ? 6 : -6))
                .attr('x', (d, i) => (i & 1 ? width : 0))
                .attr('y', x0)
                .attr('text-anchor', (d, i) => (i & 1 ? 'start' : 'end'))
                .text(format)
                .transition()
                .duration(duration)
                .delay(delay)
                .attr('y', x1);
            boxTick
                .transition()
                .duration(duration)
                .delay(delay)
                .text(format)
                .attr('x', (d, i) => (i & 1 ? width : 0))
                .attr('y', x1);
            // tslint:enable:no-bitwise
            // Update whisker ticks. These are handled separately from the box
            // ticks because they may or may not exist, and we want don't want
            // to join box ticks pre-transition with whisker ticks post-.
            const whiskerTick = _g.selectAll('text.whisker').data(whiskerData || []);
            whiskerTick
                .enter()
                .append('text')
                .attr('class', 'whisker')
                .attr('dy', '.3em')
                .attr('dx', 6)
                .attr('x', width)
                .attr('y', x0)
                .text(format)
                .style('opacity', 1e-6)
                .transition()
                .duration(duration)
                .delay(delay)
                .attr('y', x1)
                .style('opacity', 1);
            whiskerTick
                .transition()
                .duration(duration)
                .delay(delay)
                .text(format)
                .attr('x', width)
                .attr('y', x1)
                .style('opacity', 1);
            whiskerTick
                .exit()
                .transition()
                .duration(duration)
                .delay(delay)
                .attr('y', x1)
                .style('opacity', 1e-6)
                .remove();
            // Remove temporary quartiles element from within data array.
            delete data.quartiles;
        });
        timerFlush();
    }
    box.width = function (x) {
        if (!arguments.length) {
            return width;
        }
        width = x;
        return box;
    };
    box.height = function (x) {
        if (!arguments.length) {
            return height;
        }
        height = x;
        return box;
    };
    box.tickFormat = function (x) {
        if (!arguments.length) {
            return tickFormat;
        }
        tickFormat = x;
        return box;
    };
    box.showOutliers = function (x) {
        if (!arguments.length) {
            return showOutliers;
        }
        showOutliers = x;
        return box;
    };
    box.boldOutlier = function (x) {
        if (!arguments.length) {
            return boldOutlier;
        }
        boldOutlier = x;
        return box;
    };
    box.renderDataPoints = function (x) {
        if (!arguments.length) {
            return renderDataPoints;
        }
        renderDataPoints = x;
        return box;
    };
    box.renderTitle = function (x) {
        if (!arguments.length) {
            return renderTitle;
        }
        renderTitle = x;
        return box;
    };
    box.dataOpacity = function (x) {
        if (!arguments.length) {
            return dataOpacity;
        }
        dataOpacity = x;
        return box;
    };
    box.dataWidthPortion = function (x) {
        if (!arguments.length) {
            return dataWidthPortion;
        }
        dataWidthPortion = x;
        return box;
    };
    box.duration = function (x) {
        if (!arguments.length) {
            return duration;
        }
        duration = x;
        return box;
    };
    box.domain = function (x) {
        if (!arguments.length) {
            return domain;
        }
        domain = x === null ? x : typeof x === 'function' ? x : () => x;
        return box;
    };
    box.value = function (x) {
        if (!arguments.length) {
            return value;
        }
        value = x;
        return box;
    };
    box.whiskers = function (x) {
        if (!arguments.length) {
            return whiskers;
        }
        whiskers = x;
        return box;
    };
    box.quartiles = function (x) {
        if (!arguments.length) {
            return quartiles;
        }
        quartiles = x;
        return box;
    };
    return box;
};
/**
 * Used by BoxPlot
 *
 * @hidden
 */
function boxWhiskers(d) {
    return [0, d.length - 1];
}
/**
 * Used by BoxPlot
 *
 * @hidden
 */
function boxQuartiles(d) {
    return [quantile(d, 0.25), quantile(d, 0.5), quantile(d, 0.75)];
}
//# sourceMappingURL=d3.box.js.map