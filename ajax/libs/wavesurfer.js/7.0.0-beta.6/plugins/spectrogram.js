/**
 * Spectrogram plugin
 *
 * Render a spectrogram visualisation of the audio.
 *
 * @author Pavel Denisov (https://github.com/akreal)
 * @see https://github.com/wavesurfer-js/wavesurfer.js/pull/337
 *
 * @example
 * // ... initialising wavesurfer with the plugin
 * var wavesurfer = WaveSurfer.create({
 *   // wavesurfer options ...
 *   plugins: [
 *     SpectrogramPlugin.create({
 *       // plugin options ...
 *     })
 *   ]
 * });
 */
// @ts-nocheck
import BasePlugin from '../base-plugin.js';
import FFT from './spectrogram-fft.js';
export default class SpectrogramPlugin extends BasePlugin {
    static create(options) {
        return new SpectrogramPlugin(options || {});
    }
    constructor(options) {
        super(options);
        this.utils = {
            style: (el, styles) => Object.assign(el.style, styles),
        };
        this.drawSpectrogram = (frequenciesData) => {
            if (!isNaN(frequenciesData[0][0])) {
                // data is 1ch [sample, freq] format
                // to [channel, sample, freq] format
                frequenciesData = [frequenciesData];
            }
            const spectrCc = this.spectrCc;
            const height = this.height;
            const width = this.width;
            const freqFrom = this.buffer.sampleRate / 2;
            const freqMin = this.frequencyMin;
            const freqMax = this.frequencyMax;
            if (!spectrCc) {
                return;
            }
            for (let c = 0; c < frequenciesData.length; c++) {
                // for each channel
                const pixels = this.resample(frequenciesData[c]);
                const imageData = new ImageData(width, height);
                for (let i = 0; i < pixels.length; i++) {
                    for (let j = 0; j < pixels[i].length; j++) {
                        const colorMap = this.colorMap[pixels[i][j]];
                        const redIndex = ((height - j) * width + i) * 4;
                        imageData.data[redIndex] = colorMap[0] * 255;
                        imageData.data[redIndex + 1] = colorMap[1] * 255;
                        imageData.data[redIndex + 2] = colorMap[2] * 255;
                        imageData.data[redIndex + 3] = colorMap[3] * 255;
                    }
                }
                // scale and stack spectrograms
                createImageBitmap(imageData).then((renderer) => {
                    spectrCc.drawImage(renderer, 0, height * (1 - freqMax / freqFrom), // source x, y
                    width, (height * (freqMax - freqMin)) / freqFrom, // source width, height
                    0, height * c, // destination x, y
                    width, height);
                });
            }
            this.emit('ready');
        };
        this.frequenciesDataUrl = options.frequenciesDataUrl;
        this.container =
            'string' == typeof options.container ? document.querySelector(options.container) : options.container;
        if (options.colorMap) {
            if (options.colorMap.length < 256) {
                throw new Error('Colormap must contain 256 elements');
            }
            for (let i = 0; i < options.colorMap.length; i++) {
                const cmEntry = options.colorMap[i];
                if (cmEntry.length !== 4) {
                    throw new Error('ColorMap entries must contain 4 values');
                }
            }
            this.colorMap = options.colorMap;
        }
        else {
            this.colorMap = [];
            for (let i = 0; i < 256; i++) {
                const val = (255 - i) / 256;
                this.colorMap.push([val, val, val, 1]);
            }
        }
        this.fftSamples = options.fftSamples || 512;
        this.height = options.height || this.fftSamples / 2;
        this.noverlap = options.noverlap;
        this.windowFunc = options.windowFunc;
        this.alpha = options.alpha;
        this.channels = 1;
        // Getting file's original samplerate is difficult(#1248).
        // So set 12kHz default to render like wavesurfer.js 5.x.
        this.frequencyMin = options.frequencyMin || 0;
        this.frequencyMax = options.frequencyMax || 0;
        this.createWrapper();
        this.createCanvas();
    }
    onInit() {
        this.container = this.container || this.wavesurfer.getWrapper();
        this.container.appendChild(this.wrapper);
        if (this.wavesurfer.options.fillParent) {
            this.utils.style(this.wrapper, {
                width: '100%',
                overflowX: 'hidden',
                overflowY: 'hidden',
            });
        }
        this.width = this.wavesurfer.getWrapper().offsetWidth;
        this.subscriptions.push(this.wavesurfer.on('redraw', () => this.render()));
    }
    destroy() {
        this.unAll();
        this.wavesurfer.un('ready', this._onReady);
        this.wavesurfer.un('redraw', this._onRender);
        this.wavesurfer = null;
        this.util = null;
        this.options = null;
        if (this.wrapper) {
            this.wrapper.remove();
            this.wrapper = null;
        }
    }
    createWrapper() {
        this.wrapper = document.createElement('div');
        this.utils.style(this.wrapper, {
            display: 'block',
            position: 'relative',
            userSelect: 'none',
            webkitUserSelect: 'none',
            height: `${this.height * this.channels}px`,
        });
        // if labels are active
        if (this.options.labels) {
            const labelsEl = document.createElement('canvas');
            labelsEl.classList.add('spec-labels');
            this.utils.style(labelsEl, {
                position: 'absolute',
                zIndex: 9,
                width: '55px',
                height: '100%',
            });
            this.wrapper.appendChild(labelsEl);
            this.labelsEl = labelsEl;
        }
        this.wrapper.addEventListener('click', this._onWrapperClick);
    }
    _wrapperClickHandler(event) {
        event.preventDefault();
        const relX = 'offsetX' in event ? event.offsetX : event.layerX;
        this.emit('click', relX / this.width || 0);
    }
    createCanvas() {
        const canvas = document.createElement('canvas');
        this.wrapper.appendChild(canvas);
        this.spectrCc = canvas.getContext('2d');
        this.utils.style(canvas, {
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            zIndex: 4,
        });
        this.canvas = canvas;
    }
    render() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        if (this.frequenciesDataUrl) {
            this.loadFrequenciesData(this.frequenciesDataUrl);
        }
        else {
            this.getFrequencies(this.drawSpectrogram);
        }
        this.loadLabels('rgba(68,68,68,0.5)', '12px', '10px', '', '#fff', '#f7f7f7', 'center', '#specLabels');
    }
    getFrequencies(callback) {
        const fftSamples = this.fftSamples;
        const buffer = this.wavesurfer.getDecodedData();
        const channels = this.channels;
        this.frequencyMax = this.frequencyMax || buffer.sampleRate / 2;
        if (!buffer)
            return;
        this.buffer = buffer;
        // This may differ from file samplerate. Browser resamples audio.
        const sampleRate = buffer.sampleRate;
        const frequencies = [];
        let noverlap = this.noverlap;
        if (!noverlap) {
            const uniqueSamplesPerPx = buffer.length / this.canvas.width;
            noverlap = Math.max(0, Math.round(fftSamples - uniqueSamplesPerPx));
        }
        const fft = new FFT(fftSamples, sampleRate, this.windowFunc, this.alpha);
        for (let c = 0; c < channels; c++) {
            // for each channel
            const channelData = buffer.getChannelData(c);
            const channelFreq = [];
            let currentOffset = 0;
            while (currentOffset + fftSamples < channelData.length) {
                const segment = channelData.slice(currentOffset, currentOffset + fftSamples);
                const spectrum = fft.calculateSpectrum(segment);
                const array = new Uint8Array(fftSamples / 2);
                let j;
                for (j = 0; j < fftSamples / 2; j++) {
                    array[j] = Math.max(-255, Math.log10(spectrum[j]) * 45);
                }
                channelFreq.push(array);
                // channelFreq: [sample, freq]
                currentOffset += fftSamples - noverlap;
            }
            frequencies.push(channelFreq);
            // frequencies: [channel, sample, freq]
        }
        callback(frequencies, this);
    }
    loadFrequenciesData(url) {
        return fetch(url)
            .then((response) => response.json())
            .then(this.drawSpectrogram);
    }
    freqType(freq) {
        return freq >= 1000 ? (freq / 1000).toFixed(1) : Math.round(freq);
    }
    unitType(freq) {
        return freq >= 1000 ? 'KHz' : 'Hz';
    }
    loadLabels(bgFill, fontSizeFreq, fontSizeUnit, fontType, textColorFreq, textColorUnit, textAlign, container) {
        const frequenciesHeight = this.height;
        bgFill = bgFill || 'rgba(68,68,68,0)';
        fontSizeFreq = fontSizeFreq || '12px';
        fontSizeUnit = fontSizeUnit || '10px';
        fontType = fontType || 'Helvetica';
        textColorFreq = textColorFreq || '#fff';
        textColorUnit = textColorUnit || '#fff';
        textAlign = textAlign || 'center';
        container = container || '#specLabels';
        const bgWidth = 55;
        const getMaxY = frequenciesHeight || 512;
        const labelIndex = 5 * (getMaxY / 256);
        const freqStart = this.frequencyMin;
        const step = (this.frequencyMax - freqStart) / labelIndex;
        // prepare canvas element for labels
        const ctx = this.labelsEl.getContext('2d');
        const dispScale = window.devicePixelRatio;
        this.labelsEl.height = this.height * this.channels * dispScale;
        this.labelsEl.width = bgWidth * dispScale;
        ctx.scale(dispScale, dispScale);
        if (!ctx) {
            return;
        }
        for (let c = 0; c < this.channels; c++) {
            // for each channel
            // fill background
            ctx.fillStyle = bgFill;
            ctx.fillRect(0, c * getMaxY, bgWidth, (1 + c) * getMaxY);
            ctx.fill();
            let i;
            // render labels
            for (i = 0; i <= labelIndex; i++) {
                ctx.textAlign = textAlign;
                ctx.textBaseline = 'middle';
                const freq = freqStart + step * i;
                const label = this.freqType(freq);
                const units = this.unitType(freq);
                const yLabelOffset = 2;
                const x = 16;
                let y;
                if (i == 0) {
                    y = (1 + c) * getMaxY + i - 10;
                    // unit label
                    ctx.fillStyle = textColorUnit;
                    ctx.font = fontSizeUnit + ' ' + fontType;
                    ctx.fillText(units, x + 24, y);
                    // freq label
                    ctx.fillStyle = textColorFreq;
                    ctx.font = fontSizeFreq + ' ' + fontType;
                    ctx.fillText(label, x, y);
                }
                else {
                    y = (1 + c) * getMaxY - i * 50 + yLabelOffset;
                    // unit label
                    ctx.fillStyle = textColorUnit;
                    ctx.font = fontSizeUnit + ' ' + fontType;
                    ctx.fillText(units, x + 24, y);
                    // freq label
                    ctx.fillStyle = textColorFreq;
                    ctx.font = fontSizeFreq + ' ' + fontType;
                    ctx.fillText(label, x, y);
                }
            }
        }
    }
    resample(oldMatrix) {
        const columnsNumber = this.width;
        const newMatrix = [];
        const oldPiece = 1 / oldMatrix.length;
        const newPiece = 1 / columnsNumber;
        let i;
        for (i = 0; i < columnsNumber; i++) {
            const column = new Array(oldMatrix[0].length);
            let j;
            for (j = 0; j < oldMatrix.length; j++) {
                const oldStart = j * oldPiece;
                const oldEnd = oldStart + oldPiece;
                const newStart = i * newPiece;
                const newEnd = newStart + newPiece;
                const overlap = oldEnd <= newStart || newEnd <= oldStart
                    ? 0
                    : Math.min(Math.max(oldEnd, newStart), Math.max(newEnd, oldStart)) -
                        Math.max(Math.min(oldEnd, newStart), Math.min(newEnd, oldStart));
                let k;
                /* eslint-disable max-depth */
                if (overlap > 0) {
                    for (k = 0; k < oldMatrix[0].length; k++) {
                        if (column[k] == null) {
                            column[k] = 0;
                        }
                        column[k] += (overlap / newPiece) * oldMatrix[j][k];
                    }
                }
                /* eslint-enable max-depth */
            }
            const intColumn = new Uint8Array(oldMatrix[0].length);
            let m;
            for (m = 0; m < oldMatrix[0].length; m++) {
                intColumn[m] = column[m];
            }
            newMatrix.push(intColumn);
        }
        return newMatrix;
    }
}
