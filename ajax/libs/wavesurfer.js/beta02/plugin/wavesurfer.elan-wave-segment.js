(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define(["wavesurfer"], function (a0) {
      return (factory(a0));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("wavesurfer.js"));
  } else {
    factory(WaveSurfer);
  }
}(this, function (WaveSurfer) {

'use strict';

/**
 * The Elan Wave Segment Plugin for Wavesurfer is based upon the Elan Plugin
 * It uses the timings of the rendered annotations from the ELAN plugin
 * to render a separate wave for each separate line in the annotation table.
 *
 * This plugin should only be initialized once the
 *
 *
 * parameters that can be used at initialization are the following
 *
 * - ELAN:                       required - The ELAN instance used to parse the elan data
 * - wafesurver:                 required - The wavesurfer instance used to draw the original waveform
 * - waveSegmentWidth:           optional - The width of each wave segment (defaults to 200)
 * - waveSegmentPeaksPerSegment: optional - The number of peaks that should be drawn (defaults to 400)
 * - waveSegmentHeight:          optional - The height of each wave segment (defaults to 30)
 * - waveSegmentRenderer:        optional - The renderer (drawer) to be used for the wave segments
 * - waveSegmentNormalizeTo:     optional - What to normalize each wave segment to [whole, segment,none]
 * - waveSegmentBorderWidth:     optional - The width of the border of the container element
 * - waveSegmentBarHeight:       optional - the height of the peaks/bars (defaults to 1)
 */
WaveSurfer.ELANWaveSegment = {

    defaultParams: {
        waveSegmentWidth: 200,
        waveSegmentPeaksPerSegment: 200,
        waveSegmentHeight: 30,
        waveSegmentRenderer: 'Canvas',
        waveSegmentNormalizeTo: 'whole',
        waveSegmentBarHeight: 1,
        waveSegmentBorderWidth: 1,
        pixelRatio:  window.devicePixelRatio || screen.deviceXDPI / screen.logicalXDPI
    },

    //object attributes necessary for maintaining state
    ELAN:          null,  //handle to the ELAN plugin
    wavesurfer:    null,  //handle to the wavesurfer instance
    waveSegments: [],     //array of wavesurfer instances for each line
    maxPeak:        0,    //the maximum wave peak


    /**
     * Initialize the parameters and insert column and wave forms
     * @param params
     */
    init: function (params) {
        // Extract relevant parameters (or defaults)
        this.params = WaveSurfer.util.extend(this.defaultParams, params);
        this.ELAN = params.ELAN;
        this.wavesurfer = params.wavesurfer;
        this.waveSegments = [];
        this.maxPeak = 0;

        //determine what we will be normalizing to
        switch (this.params.waveSegmentNormalizeTo) {
            case 'segment':
                this.params.normalize = true;
                break;
            case 'whole':
                this.calculateMaxPeak();
                this.params.noramlize = false;
                break;
            default:
                this.params.normalize = false;
        }
        this.addSegmentColumn();
    },

    /**
     * Function to calculate the maximum peak in our whole audio clip
     */
    calculateMaxPeak: function() {
        var totalPeaks = this.ELAN.renderedAlignable.length * this.params.waveSegmentWidth;

        var peaks = this.wavesurfer.backend.getPeaks(totalPeaks, 0, totalPeaks);
        var max = WaveSurfer.util.max(peaks);
        var min = WaveSurfer.util.min(peaks);
        this.maxPeak = -min > max ? -min : max;
    },

    /**
     * uses the table created by Elan and adds a column header for the wave
     * and then loops through each annotation row and creates a wave in each
     */
    addSegmentColumn: function() {

        //grab all the rows in the ELAN table
        var tableRows = this.ELAN.container.getElementsByTagName('tr');

        //create the header column for the wave forms
        var th = document.createElement('th');
        th.textContent = 'Wave';
        th.className = 'wavesurfer-wave';
        th.setAttribute('style', 'width: ' + this.params.waveSegmentWidth + 'px');

        //insert wave form column as the second column
        tableRows[0].insertBefore(th, tableRows[0].firstChild.nextSibling);

        //loop through each row and add the table cell for the wave form
        for(var i = 0; i < this.ELAN.renderedAlignable.length; i++) {
            var annotationRow = this.ELAN.getAnnotationNode(this.ELAN.renderedAlignable[i]);

            //create the td for the wave
            var td = document.createElement('td');
            td.className = 'wavesurfer-wave';

            //create the wave segment
            this.appendWaveSegmentToElement(td, i);

            annotationRow.insertBefore(td, annotationRow.firstChild.nextSibling);
        }
    },


    /**
     * Gets the peaks for the specified start and end times of the segment
     * @param startTime   the start time to begin generating peaks
     * @param endTime     the end time to stop generating peaks
     * @returns {Array}   array of interleaved positive and negative peaks
     */
    getPeaksForTimeSegment: function(startTime, endTime) {
        var totalDuration = this.wavesurfer.backend.getDuration();
        var segmentDuration  = endTime - startTime;

        //calculate the total number of peak by splitting our segment
        var totalPeaks = totalDuration * this.params.waveSegmentPeaksPerSegment / segmentDuration;

        var peakDuration = totalDuration / totalPeaks;

        var startPeak = ~~(startTime / peakDuration);
        var endPeak = ~~(endTime / peakDuration);

        var peaks = this.wavesurfer.backend.getPeaks(totalPeaks, startPeak, endPeak);
        var shiftedPeaks = [];
        //shift the peak indexes back to 0
        for(var i in peaks) {
            if(this.params.waveSegmentNormalizeTo == 'whole') {
                shiftedPeaks.push(peaks[i]/this.maxPeak);
            }
            else {
                shiftedPeaks.push(peaks[i]);
            }
        }
        return shiftedPeaks;
    },


    //append the wave segment defined by the elanIndex to the element
    appendWaveSegmentToElement: function(el, elanIndex) {
        var line = this.ELAN.renderedAlignable[elanIndex];
        var container = document.createElement('div');
        var width = this.params.waveSegmentWidth;

        container.style.width = (width + (this.params.waveSegmentBorderWidth*2)).toString() + 'px';
        container.style.height = this.params.waveSegmentHeight.toString() + 'px';
        container.className = 'elan-wavesegment-container';

        el.appendChild(container);

        var peaks = this.getPeaksForTimeSegment(line.start, line.end);


        var drawerParams = this.params;
        drawerParams.fillParent = true;
        drawerParams.height = this.params.waveSegmentHeight;
        drawerParams.barHeight = this.params.waveSegmentBarHeight;
        drawerParams.plotTimeStart = line.start;
        drawerParams.plotTimeEnd = line.end;
        drawerParams.fillParent = true;
        drawerParams.scrollParent = false;

        //create the wave segmenet drawer and initialize in the container
        this.waveSegments[elanIndex] = Object.create(WaveSurfer.Drawer[this.params.waveSegmentRenderer]);
        this.waveSegments[elanIndex].init(container, drawerParams);
        this.waveSegments[elanIndex].drawPeaks(peaks, this.params.waveSegmentWidth * this.params.pixelRatio, 0, this.params.waveSegmentPeaksPerSegment);

        this.waveSegments[elanIndex].updateProgress(0);

    },

    /**
     * Function to update the progress of the wave segments when time of the audio player is updated
     * @param time - the current time of the audio
     */
    onProgress:  function(time) {
        for(var i = 0; i < this.waveSegments.length; i++) {
            var start = this.ELAN.renderedAlignable[i].start;
            var end = this.ELAN.renderedAlignable[i].end;
            var progress;

            //player has not reached this segment yet - set not started
            if(start > time) {
                progress = 0;
            }
            //player has already passed this segment - set complete
            else if(end < time) {
                progress = this.params.waveSegmentWidth;
            }
            //find what percentage has been complete and set
            else {
                var completion = (time - start) / (end - start);
                progress = completion * this.params.waveSegmentWidth;
            }

            this.waveSegments[i].updateProgress(progress);
        }

    }


};

WaveSurfer.util.extend(WaveSurfer.ELANWaveSegment, WaveSurfer.Observer);


}));
