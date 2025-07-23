/**
 * Web Worker for Windowed Spectrogram Plugin
 * Handles FFT calculations for frequency analysis
 */
// Import centralized FFT functionality
import FFT, { createFilterBankForScale, applyFilterBank } from '../fft.js';
// Global FFT instance (reused for performance)
let fft = null;
// Worker message handler
self.onmessage = function (e) {
    const { type, id, audioData, options } = e.data;
    if (type === 'calculateFrequencies') {
        try {
            const result = calculateFrequencies(audioData, options);
            const response = {
                type: 'frequenciesResult',
                id: id,
                result: result,
            };
            self.postMessage(response);
        }
        catch (error) {
            const response = {
                type: 'frequenciesResult',
                id: id,
                error: error instanceof Error ? error.message : String(error),
            };
            self.postMessage(response);
        }
    }
};
/**
 * Calculate frequency data for audio channels
 */
function calculateFrequencies(audioChannels, options) {
    const { startTime, endTime, sampleRate, fftSamples, windowFunc, alpha, noverlap, scale, gainDB, rangeDB, splitChannels, } = options;
    const startSample = Math.floor(startTime * sampleRate);
    const endSample = Math.floor(endTime * sampleRate);
    const channels = splitChannels ? audioChannels.length : 1;
    // Initialize FFT (reuse if possible for performance)
    if (!fft || fft.bufferSize !== fftSamples) {
        fft = new FFT(fftSamples, sampleRate, windowFunc, alpha || 0.16);
    }
    // Create filter bank based on scale using centralized function
    const numFilters = fftSamples / 2; // Same as main thread
    const filterBank = createFilterBankForScale(scale, numFilters, fftSamples, sampleRate);
    // Calculate hop size
    let actualNoverlap = noverlap || Math.max(0, Math.round(fftSamples * 0.5));
    const maxOverlap = fftSamples * 0.5;
    actualNoverlap = Math.min(actualNoverlap, maxOverlap);
    const minHopSize = Math.max(64, fftSamples * 0.25);
    const hopSize = Math.max(minHopSize, fftSamples - actualNoverlap);
    const frequencies = [];
    for (let c = 0; c < channels; c++) {
        const channelData = audioChannels[c];
        const channelFreq = [];
        for (let sample = startSample; sample + fftSamples < endSample; sample += hopSize) {
            const segment = channelData.slice(sample, sample + fftSamples);
            let spectrum = fft.calculateSpectrum(segment);
            // Apply filter bank if specified (same as main thread)
            if (filterBank) {
                spectrum = applyFilterBank(spectrum, filterBank);
            }
            // Convert to uint8 color indices
            const freqBins = new Uint8Array(spectrum.length);
            const gainPlusRange = gainDB + rangeDB;
            for (let j = 0; j < spectrum.length; j++) {
                const magnitude = spectrum[j] > 1e-12 ? spectrum[j] : 1e-12;
                const valueDB = 20 * Math.log10(magnitude);
                if (valueDB < -gainPlusRange) {
                    freqBins[j] = 0;
                }
                else if (valueDB > -gainDB) {
                    freqBins[j] = 255;
                }
                else {
                    freqBins[j] = Math.round(((valueDB + gainDB) / rangeDB) * 255);
                }
            }
            channelFreq.push(freqBins);
        }
        frequencies.push(channelFreq);
    }
    return frequencies;
}
