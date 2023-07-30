/**
 * Record audio from the microphone with a real-time waveform preview
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
        this.stream = null;
        this.mediaRecorder = null;
    }
    /** Create an instance of the Record plugin */
    static create(options) {
        return new RecordPlugin(options || {});
    }
    renderMicStream(stream) {
        const audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        source.connect(analyser);
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Float32Array(bufferLength);
        const sampleDuration = bufferLength / audioContext.sampleRate;
        let animationId;
        const drawWaveform = () => {
            analyser.getFloatTimeDomainData(dataArray);
            if (this.wavesurfer) {
                this.wavesurfer.options.cursorWidth = 0;
                this.wavesurfer.options.interact = false;
                this.wavesurfer.load('', [dataArray], sampleDuration);
            }
            animationId = requestAnimationFrame(drawWaveform);
        };
        drawWaveform();
        return () => {
            cancelAnimationFrame(animationId);
            source === null || source === void 0 ? void 0 : source.disconnect();
            audioContext === null || audioContext === void 0 ? void 0 : audioContext.close();
        };
    }
    /** Request access to the microphone and start monitoring incoming audio */
    startMic() {
        return __awaiter(this, void 0, void 0, function* () {
            let stream;
            try {
                stream = yield navigator.mediaDevices.getUserMedia({ audio: true });
            }
            catch (err) {
                throw new Error('Error accessing the microphone: ' + err.message);
            }
            const onDestroy = this.renderMicStream(stream);
            this.subscriptions.push(this.once('destroy', onDestroy));
            this.stream = stream;
            return stream;
        });
    }
    /** Stop monitoring incoming audio */
    stopMic() {
        if (!this.stream)
            return;
        this.stream.getTracks().forEach((track) => track.stop());
        this.stream = null;
    }
    /** Start recording audio from the microphone */
    startRecording() {
        return __awaiter(this, void 0, void 0, function* () {
            const stream = this.stream || (yield this.startMic());
            const mediaRecorder = this.mediaRecorder ||
                new MediaRecorder(stream, {
                    mimeType: this.options.mimeType || findSupportedMimeType(),
                    audioBitsPerSecond: this.options.audioBitsPerSecond,
                });
            this.mediaRecorder = mediaRecorder;
            this.stopRecording();
            const recordedChunks = [];
            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordedChunks.push(event.data);
                }
            };
            mediaRecorder.onstop = () => {
                var _a;
                const blob = new Blob(recordedChunks, { type: mediaRecorder.mimeType });
                this.emit('record-end', blob);
                if (this.options.renderRecordedAudio !== false) {
                    (_a = this.wavesurfer) === null || _a === void 0 ? void 0 : _a.load(URL.createObjectURL(blob));
                }
            };
            mediaRecorder.start();
            this.emit('record-start');
        });
    }
    /** Check if the audio is being recorded */
    isRecording() {
        var _a;
        return ((_a = this.mediaRecorder) === null || _a === void 0 ? void 0 : _a.state) === 'recording';
    }
    /** Stop the recording */
    stopRecording() {
        var _a;
        if (this.isRecording()) {
            (_a = this.mediaRecorder) === null || _a === void 0 ? void 0 : _a.stop();
        }
    }
    /** Destroy the plugin */
    destroy() {
        super.destroy();
        this.stopRecording();
        this.stopMic();
    }
}
export default RecordPlugin;
