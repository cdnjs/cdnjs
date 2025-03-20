import type { Visualizer } from './SoundModule/Analyser/Visualizer';
import type { Effector } from './SoundModule/Effectors/Effector';
import type { EnvelopeGenerator } from './SoundModule/Effectors/EnvelopeGenerator';
import type { Oscillator } from './OscillatorModule/Oscillator';
import type { Glide } from './OscillatorModule/Glide';
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