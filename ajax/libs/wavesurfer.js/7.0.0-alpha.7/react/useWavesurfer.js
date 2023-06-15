/// <reference types="react" />
import WaveSurfer from '../index.js';
const { useEffect, useState } = React;
// A React hook to use WaveSurfer
export const useWavesurfer = (containerRef, options) => {
    const [wavesurfer, setWavesurfer] = useState(null);
    // Initialize wavesurfer when the container mounts
    // or any of the props change
    useEffect(() => {
        if (!containerRef.current)
            return;
        const ws = WaveSurfer.create(Object.assign(Object.assign({}, options), { container: containerRef.current }));
        setWavesurfer(ws);
        return () => {
            ws.destroy();
        };
    }, [options, containerRef]);
    return wavesurfer;
};
export default useWavesurfer;
