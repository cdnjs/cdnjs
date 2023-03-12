var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Web Audio decodeAudioData with a minimum allowed sample rate
const SAMPLE_RATE = 3000;
class Decoder {
    constructor() {
        this.audioCtx = null;
        this.audioCtx = new (window.AudioContext ||
            window.webkitAudioContext)({
            latencyHint: 'playback',
            sampleRate: SAMPLE_RATE,
        });
    }
    decode(audioData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.audioCtx) {
                throw new Error('AudioContext is not initialized');
            }
            const buffer = yield this.audioCtx.decodeAudioData(audioData);
            const channelData = [buffer.getChannelData(0)];
            if (buffer.numberOfChannels > 1) {
                channelData.push(buffer.getChannelData(1));
            }
            return {
                duration: buffer.duration,
                channelData,
            };
        });
    }
    destroy() {
        var _a;
        (_a = this.audioCtx) === null || _a === void 0 ? void 0 : _a.close();
        this.audioCtx = null;
    }
}
export default Decoder;
