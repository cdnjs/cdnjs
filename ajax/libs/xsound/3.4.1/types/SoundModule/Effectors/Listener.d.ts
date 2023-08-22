import { Effector } from '/src/SoundModule/Effectors/Effector';
export type ListenerParams = {
    x?: number;
    y?: number;
    z?: number;
    fx?: number;
    fy?: number;
    fz?: number;
    ux?: number;
    uy?: number;
    uz?: number;
};
/**
 * Effector's subclass for Listener.
 * @constructor
 * @extends {Effector}
 */
export declare class Listener extends Effector {
    private listener;
    private positions;
    private forwards;
    private ups;
    /**
     * @param {AudioContext} context This argument is in order to use Web Audio API.
     */
    constructor(context: AudioContext);
    /** @override */
    connect(): GainNode;
    /**
     * This method gets or sets parameters for audio listener.
     * This method is overloaded for type interface and type check.
     * @param {keyof ListenerParams|ListenerParams} params This argument is string if getter. Otherwise, setter.
     * @return {ListenerParams[keyof ListenerParams]|Listener} Return value is parameter for audio listener if getter.
     *     Otherwise, return value is for method chain.
     */
    param(params: 'x'): number;
    param(params: 'y'): number;
    param(params: 'z'): number;
    param(params: 'fx'): number;
    param(params: 'fy'): number;
    param(params: 'fz'): number;
    param(params: 'ux'): number;
    param(params: 'uy'): number;
    param(params: 'uz'): number;
    param(params: ListenerParams): Listener;
    /** @override */
    params(): Required<ListenerParams>;
}
//# sourceMappingURL=Listener.d.ts.map