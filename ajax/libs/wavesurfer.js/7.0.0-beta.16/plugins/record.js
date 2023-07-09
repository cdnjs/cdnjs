/**
 * Record audio from the microphone, render a waveform and download the audio.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import BasePlugin from '../base-plugin.js';
const MIME_TYPES = ['audio/webm', 'audio/wav', 'audio/mpeg', 'audio/mp4', 'audio/mp3'];
const findSupportedMimeType = () => MIME_TYPES.find((mimeType) => MediaRecorder.isTypeSupported(mimeType));
class RecordPlugin extends BasePlugin {
    constructor() {
        super(...arguments);
        this.mediaRecorder = null;
        this.recordedUrl = '';
    }
    static create(options) {
        return new RecordPlugin(options || {});
    }
    loadBlob(data, type) {
        var _a;
        const blob = new Blob(data, { type });
        this.recordedUrl = URL.createObjectURL(blob);
        (_a = this.wavesurfer) === null || _a === void 0 ? void 0 : _a.load(this.recordedUrl);
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
            var _a;
            if (!canvasCtx)
                return;
            canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            analyser.getByteTimeDomainData(dataArray);
            canvasCtx.lineWidth = this.options.lineWidth || 2;
            const color = this.options.realtimeWaveColor || ((_a = this.wavesurfer) === null || _a === void 0 ? void 0 : _a.options.waveColor) || '';
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
            canvas === null || canvas === void 0 ? void 0 : canvas.remove();
        };
    }
    cleanUp() {
        var _a;
        this.stopRecording();
        (_a = this.wavesurfer) === null || _a === void 0 ? void 0 : _a.empty();
        if (this.recordedUrl) {
            URL.revokeObjectURL(this.recordedUrl);
            this.recordedUrl = '';
        }
    }
    startRecording() {
        return __awaiter(this, void 0, void 0, function* () {
            this.cleanUp();
            let stream;
            try {
                stream = yield navigator.mediaDevices.getUserMedia({ audio: true });
            }
            catch (err) {
                throw new Error('Error accessing the microphone: ' + err.message);
            }
            const onStop = this.render(stream);
            const mediaRecorder = new MediaRecorder(stream, {
                mimeType: this.options.mimeType || findSupportedMimeType(),
                audioBitsPerSecond: this.options.audioBitsPerSecond,
            });
            const recordedChunks = [];
            mediaRecorder.addEventListener('dataavailable', (event) => {
                if (event.data.size > 0) {
                    recordedChunks.push(event.data);
                }
            });
            mediaRecorder.addEventListener('stop', () => {
                onStop();
                this.loadBlob(recordedChunks, mediaRecorder.mimeType);
                this.emit('stopRecording');
            });
            mediaRecorder.start();
            this.emit('startRecording');
            this.mediaRecorder = mediaRecorder;
        });
    }
    isRecording() {
        var _a;
        return ((_a = this.mediaRecorder) === null || _a === void 0 ? void 0 : _a.state) === 'recording';
    }
    stopRecording() {
        var _a;
        if (this.isRecording()) {
            (_a = this.mediaRecorder) === null || _a === void 0 ? void 0 : _a.stop();
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
