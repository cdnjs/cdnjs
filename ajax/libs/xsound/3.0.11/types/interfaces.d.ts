import { Visualizer } from './SoundModule/Analyser/Visualizer';
import { Effector } from './SoundModule/Effectors/Effector';
import { EnvelopeGenerator } from './SoundModule/Effectors/EnvelopeGenerator';
import { VocalCanceler } from './SoundModule/Effectors/VocalCanceler';
import { Oscillator } from './OscillatorModule/Oscillator';
import { Glide } from './OscillatorModule/Glide';
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
    activate(): Visualizer | Effector | EnvelopeGenerator | VocalCanceler | Oscillator | Glide;
    deactivate(): Visualizer | Effector | EnvelopeGenerator | VocalCanceler | Oscillator | Glide;
}
//# sourceMappingURL=interfaces.d.ts.map