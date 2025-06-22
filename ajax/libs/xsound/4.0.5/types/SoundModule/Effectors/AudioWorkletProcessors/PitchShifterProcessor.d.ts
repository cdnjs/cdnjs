import type { Inputs, Outputs } from '../../../worklet';
import { OverlapAddProcessor } from '../../../worklet';
/**
 * This class extends `OverlapAddProcessor`.
 * Override `processOverlapAdd` method for pitch shifter and Update parameters on message event.
 */
export declare class PitchShifterProcessor extends OverlapAddProcessor {
    private hanningWindow;
    private inverse;
    private csize;
    private width;
    private table;
    private bitReverser;
    private out;
    private data;
    private spectrumComplexBuffer;
    private spectrumComplexBufferShifted;
    private timeComplexBuffer;
    private magnitudes;
    private peakIndexes;
    private numberOfPeaks;
    private timeCursor;
    private isActive;
    private pitch;
    private static generateHanningWindow;
    constructor(options: AudioWorkletNodeOptions);
    /** @override */
    protected processOverlapAdd(inputs: Inputs, outputs: Outputs): void;
    private applyHanningWindow;
    private computeMagnitudes;
    private findPeaks;
    private shiftPeaks;
    private fromComplexArray;
    private completeSpectrum;
    private realTransform;
    inverseTransform(out: Float32Array, data: Float32Array): void;
    private transform4;
    private realTransform4;
    private singleTransform2;
    private singleTransform4;
    private singleRealTransform2;
    private singleRealTransform4;
}
//# sourceMappingURL=PitchShifterProcessor.d.ts.map