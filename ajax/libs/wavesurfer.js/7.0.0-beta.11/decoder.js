/** Decode an array buffer into an audio buffer */
async function decode(audioData, sampleRate) {
    const audioCtx = new AudioContext({ sampleRate });
    const decode = audioCtx.decodeAudioData(audioData);
    decode.finally(() => audioCtx.close());
    return decode;
}
/** Normalize peaks to -1..1 */
function normalize(channelData) {
    const firstChannel = channelData[0];
    if (firstChannel.some((n) => n > 1 || n < -1)) {
        const length = firstChannel.length;
        let max = 0;
        for (let i = 0; i < length; i++) {
            const absN = Math.abs(firstChannel[i]);
            if (absN > max)
                max = absN;
        }
        for (const channel of channelData) {
            for (let i = 0; i < length; i++) {
                channel[i] /= max;
            }
        }
    }
    return channelData;
}
/** Create an audio buffer from pre-decoded audio data */
function createBuffer(channelData, duration) {
    // If a single array of numbers is passed, make it an array of arrays
    if (typeof channelData[0] === 'number')
        channelData = [channelData];
    // Normalize to -1..1
    normalize(channelData);
    return {
        duration,
        length: channelData[0].length,
        sampleRate: channelData[0].length / duration,
        numberOfChannels: channelData.length,
        getChannelData: (i) => channelData?.[i],
        copyFromChannel: AudioBuffer.prototype.copyFromChannel,
        copyToChannel: AudioBuffer.prototype.copyToChannel,
    };
}
const Decoder = {
    decode,
    createBuffer,
};
export default Decoder;
