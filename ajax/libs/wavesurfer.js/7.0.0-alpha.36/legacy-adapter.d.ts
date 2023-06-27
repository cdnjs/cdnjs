import type WaveSurfer from "./wavesurfer";
type LegacyWavesurferMethodsType = Partial<WaveSurfer> & {
    skip(offset: number): void;
    stop(): void;
};
declare const LegacyWavesurferMethods: LegacyWavesurferMethodsType;
export default LegacyWavesurferMethods;
