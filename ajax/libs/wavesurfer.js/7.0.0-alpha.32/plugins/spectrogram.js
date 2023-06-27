import BasePlugin from '../base-plugin.js';
class SpectrogramPlugin extends BasePlugin {
    mediaSpectrogramer = null;
    recordedUrl = '';
    static create(options) {
        return new SpectrogramPlugin(options || {});
    }
    loadBlob(data) {
        const blob = new Blob(data, { type: 'audio/webm' });
        this.recordedUrl = URL.createObjectURL(blob);
        this.wavesurfer?.load(this.recordedUrl);
    }
    // Function to process frequency data
    processFrequencyData(dataArray, sampleRate) {
        // Smooth the dataArray using a moving average
        const windowSize = 5; // Adjust the window size as needed
        const smoothedDataArray = new Float32Array(dataArray.length);
        for (let i = 0; i < dataArray.length; i++) {
            let sum = 0;
            let count = 0;
            for (let j = i - Math.floor(windowSize / 2); j <= i + Math.floor(windowSize / 2); j++) {
                if (j >= 0 && j < dataArray.length) {
                    sum += dataArray[j];
                    count++;
                }
            }
            smoothedDataArray[i] = sum / count;
        }
        // Find the first two peaks (formants) above a certain threshold
        const threshold = -70; // Adjust the threshold as needed
        const formants = [];
        let prevValue = smoothedDataArray[0];
        let prevSlope = 0;
        for (let i = 1; i < smoothedDataArray.length - 1; i++) {
            const slope = smoothedDataArray[i] - prevValue;
            if (slope > 0 && prevSlope < 0 && smoothedDataArray[i] > threshold) {
                formants.push(i);
                if (formants.length >= 2) {
                    break;
                }
            }
            prevValue = smoothedDataArray[i];
            prevSlope = slope;
        }
        // Convert the formant indices to frequencies
        const nyquist = 0.5 * sampleRate;
        const freqStep = nyquist / dataArray.length;
        const formantFrequencies = formants.map(index => index * freqStep);
        // Print the formant frequencies
        if (formantFrequencies.length >= 2) {
            return formantFrequencies;
        }
    }
    render(stream) {
        if (!this.container || !this.wavesurfer)
            return () => undefined;
        const canvas = document.createElement('canvas');
        canvas.width = this.container.clientWidth;
        canvas.height = this.container.clientHeight;
        canvas.style.zIndex = '10';
        this.container.appendChild(canvas);
        const canvasCtx = canvas.getContext('2d');
        const audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        source.connect(analyser);
        // An array that will store real-time waveform data
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        // An array that will store FFT data
        const freqArray = new Float32Array(bufferLength);
        let animationId;
        const drawWaveform = () => {
            if (!canvasCtx)
                return;
            canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
            analyser.getByteTimeDomainData(dataArray);
            analyser.getFloatFrequencyData(freqArray);
            this.processFrequencyData(freqArray, audioContext.sampleRate);
            canvasCtx.lineWidth = this.options.lineWidth || 2;
            canvasCtx.strokeStyle = this.options.waveColor || this.wavesurfer?.options.waveColor || '';
            canvasCtx.beginPath();
            const sliceWidth = (canvas.width * 1.0) / bufferLength;
            let x = 0;
            for (let i = 0; i < bufferLength; i++) {
                const v = dataArray[i] / 128.0;
                const y = (v * canvas.height) / 2;
                if (i === 0) {
                    canvasCtx.moveTo(x, y);
                }
                else {
                    canvasCtx.lineTo(x, y);
                }
                x += sliceWidth;
            }
            canvasCtx.lineTo(canvas.width, canvas.height / 2);
            canvasCtx.stroke();
            animationId = requestAnimationFrame(drawWaveform);
        };
        drawWaveform();
        return () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            if (source) {
                source.disconnect();
                source.mediaStream.getTracks().forEach((track) => track.stop());
            }
            if (audioContext) {
                audioContext.close();
            }
            canvas?.remove();
        };
    }
    cleanUp() {
        this.stopSpectrograming();
        this.wavesurfer?.empty();
        if (this.recordedUrl) {
            URL.revokeObjectURL(this.recordedUrl);
            this.recordedUrl = '';
        }
    }
    async startSpectrograming() {
        this.cleanUp();
        let stream;
        try {
            stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        }
        catch (err) {
            throw new Error('Error accessing the microphone: ' + err.message);
        }
        const onStop = this.render(stream);
        const mediaSpectrogramer = new MediaSpectrogramer(stream);
        const recordedChunks = [];
        mediaSpectrogramer.addEventListener('dataavailable', (event) => {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        });
        mediaSpectrogramer.addEventListener('stop', () => {
            onStop();
            this.loadBlob(recordedChunks);
            this.emit('stopSpectrograming');
        });
        mediaSpectrogramer.start();
        this.emit('startSpectrograming');
        this.mediaSpectrogramer = mediaSpectrogramer;
    }
    isSpectrograming() {
        return this.mediaSpectrogramer?.state === 'recording';
    }
    stopSpectrograming() {
        if (this.isSpectrograming()) {
            this.mediaSpectrogramer?.stop();
        }
    }
    getSpectrogramedUrl() {
        return this.recordedUrl;
    }
    destroy() {
        super.destroy();
        this.cleanUp();
    }
}
export default SpectrogramPlugin;
