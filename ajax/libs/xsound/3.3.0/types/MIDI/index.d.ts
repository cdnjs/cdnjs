/**
 * This class is for using Web MIDI API.
 * @constructor
 */
export declare class MIDI {
    private midiAccess;
    private inputs;
    private outputs;
    constructor();
    /**
     * This method invokes `requestMIDIAccess` and gets instance of `MIDIAccess`.
     * @property {MIDIOptions} options This argument is object based on `MIDIOptions` dictionary.
     * @property {function} successCallback This argument is invoked on `requestMIDIAccess` success.
     * @property {function} errorCallback This argument is invoked on `requestMIDIAccess` failure.
     * @return {Promise<MIDIAccess|void>} Return value is `Promise` that `requestMIDIAccess` method returns.
     */
    setup(params: {
        options?: MIDIOptions;
        successCallback?(midiAccess: MIDIAccess, midiInputs: MIDIInput[], midiOutputs: MIDIOutput[]): void;
        errorCallback?(error: Error): void;
    }): Promise<MIDIAccess | void>;
    /**
     * This method gets instance of `MIDIAccess`.
     * @return {MIDIAccess|null}
     */
    get(): MIDIAccess | null;
}
//# sourceMappingURL=index.d.ts.map