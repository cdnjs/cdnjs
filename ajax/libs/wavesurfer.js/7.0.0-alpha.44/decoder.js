/** Decode an array buffer into an audio buffer */
async function decode(audioData, sampleRate = 8000) {
    const audioCtx = new AudioContext({ sampleRate });
    const decode = audioCtx.decodeAudioData(audioData);
    decode.finally(() => audioCtx.close());
    return decode;
}
/** Create an audio buffer from pre-decoded audio data */
function createBuffer(channelData, duration) {
    // If a single array of numbers is passed, make it an array of arrays
    if (typeof channelData[0] === 'number')
        channelData = [channelData];
    // Normalize to -1..1
    if (channelData[0].some((n) => n > 1 || n < -1)) {
        const max = Math.max(...channelData[0]);
        channelData = channelData.map((channel) => channel.map((n) => n / max));
    }
    return {
        length: channelData[0].length,
        duration,
        numberOfChannels: channelData.length,
        sampleRate: channelData[0].length / duration,
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
