const LegacyWavesurferMethods = {
    /** Skip a number of seconds from the current position (use a negative value to go backwards) */
    skip(seconds) {
        console.warn('Deprecated, please use `wavesurfer.setTime(wavesurfer.getCurrentTime() + seconds)` instead');
        const time = this.getCurrentTime() + seconds;
        this.setTime(time);
    },
    /** Stop the audio and go to the beginning */
    stop() {
        console.warn('Deprecated, please use `wavesurfer.pause(); wavesurfer.setTime(0)` instead');
        this.pause();
        this.setTime(0);
    }
};
export default LegacyWavesurferMethods;
