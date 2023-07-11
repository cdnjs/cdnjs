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
        this.savedCursorWidth = 1;
        this.savedInteractive = true;
    }
    static create(options) {
        return new RecordPlugin(options || {});
    }
    preventInteraction() {
        if (this.wavesurfer) {
            this.savedCursorWidth = this.wavesurfer.options.cursorWidth || 1;
            this.savedInteractive = this.wavesurfer.options.interact || true;
            this.wavesurfer.options.cursorWidth = 0;
            this.wavesurfer.options.interact = false;
        }
    }
    restoreInteraction() {
        if (this.wavesurfer) {
            this.wavesurfer.options.cursorWidth = this.savedCursorWidth;
            this.wavesurfer.options.interact = this.savedInteractive;
        }
    }
    onInit() {
        this.preventInteraction();
    }
    loadBlob(data, type) {
        var _a;
        const blob = new Blob(data, { type });
        this.recordedUrl = URL.createObjectURL(blob);
        this.restoreInteraction();
        (_a = this.wavesurfer) === null || _a === void 0 ? void 0 : _a.load(this.recordedUrl);
    }
    render(stream) {
        const audioContext = new AudioContext({ sampleRate: 8000 });
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        source.connect(analyser);
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Float32Array(bufferLength);
        const sampleDuration = bufferLength / audioContext.sampleRate;
        let animationId;
        const drawWaveform = () => {
            var _a;
            analyser.getFloatTimeDomainData(dataArray);
            (_a = this.wavesurfer) === null || _a === void 0 ? void 0 : _a.load('', [dataArray], sampleDuration);
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
            this.preventInteraction();
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
