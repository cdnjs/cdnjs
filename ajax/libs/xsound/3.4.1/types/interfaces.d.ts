import { Visualizer } from '/src/SoundModule/Analyser/Visualizer';
import { Effector } from '/src/SoundModule/Effectors/Effector';
import { EnvelopeGenerator } from '/src/SoundModule/Effectors/EnvelopeGenerator';
import { Oscillator } from '/src/OscillatorModule/Oscillator';
import { Glide } from '/src/OscillatorModule/Glide';
/**
 * This interface is implemented by class that abstracts `AudioNode` connections (such as `Effector` class).
 * @interface
 */
export interface Connectable {
    get INPUT(): AudioNode | null;
    get OUTPUT(): AudioNode | null;
}
/**
 * This interface is implemented by class that has state.
 * @interface
 */
export interface Statable {
    state(): boolean;
    activate(): Visualizer | Effector | EnvelopeGenerator | Oscillator | Glide;
    deactivate(): Visualizer | Effector | EnvelopeGenerator | Oscillator | Glide;
}
//# sourceMappingURL=interfaces.d.ts.map