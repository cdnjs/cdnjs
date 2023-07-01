/**
 * Record audio from the microphone, render a waveform and download the audio.
 */
import BasePlugin from '../base-plugin.js';
class RecordPlugin extends BasePlugin {
    constructor() {
        super(...arguments);
        this.mediaRecorder = null;
        this.recordedUrl = '';
    }
    static create(options) {
        return new RecordPlugin(options || {});
    }
    loadBlob(data) {
        const blob = new Blob(data, { type: 'audio/webm' });
        this.recordedUrl = URL.createObjectURL(blob);
        this.wavesurfer?.load(this.recordedUrl);
    }
    render(stream) {
        if (!this.wavesurfer)
            return () => undefined;
        const container = this.wavesurfer.getWrapper();
        const canvas = document.createElement('canvas');
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        canvas.style.zIndex = '10';
        container.appendChild(canvas);
        const canvasCtx = canvas.getContext('2d');
        const audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        source.connect(analyser);
        let animationId;
        const drawWaveform = () => {
            if (!canvasCtx)
                return;
            canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            analyser.getByteTimeDomainData(dataArray);
            canvasCtx.lineWidth = this.options.lineWidth || 2;
            const color = this.options.realtimeWaveColor || this.wavesurfer?.options.waveColor || '';
            canvasCtx.strokeStyle = Array.isArray(color) ? color[0] : color;
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
        this.stopRecording();
        this.wavesurfer?.empty();
        if (this.recordedUrl) {
            URL.revokeObjectURL(this.recordedUrl);
            this.recordedUrl = '';
        }
    }
    async startRecording() {
        this.cleanUp();
        let stream;
        try {
            stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        }
        catch (err) {
            throw new Error('Error accessing the microphone: ' + err.message);
        }
        const onStop = this.render(stream);
        const mediaRecorder = new MediaRecorder(stream);
        const recordedChunks = [];
        mediaRecorder.addEventListener('dataavailable', (event) => {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        });
        mediaRecorder.addEventListener('stop', () => {
            onStop();
            this.loadBlob(recordedChunks);
            this.emit('stopRecording');
        });
        mediaRecorder.start();
        this.emit('startRecording');
        this.mediaRecorder = mediaRecorder;
    }
    isRecording() {
        return this.mediaRecorder?.state === 'recording';
    }
    stopRecording() {
        if (this.isRecording()) {
            this.mediaRecorder?.stop();
        }
    }
    getRecordedUrl() {
        return this.recordedUrl;
    }
    destroy() {
        super.destroy();
        this.cleanUp();
    }
}
export default RecordPlugin;
