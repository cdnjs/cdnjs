/**
 * A collection of keyboard-related utilities accessible via `keyboard`
 * instance.
 */
/**
 * Represents named (usually frequently used) keyboard keys for easy referece.
 */
export declare type KeyboardKeys = "up" | "down" | "left" | "right" | "enter" | "esc" | "home" | "tab" | "end" | "ctrl" | "alt" | "shift" | "space" | "home" | "end" | "pgup" | "pgdn" | "ins" | "del" | "plus" | "minus" | "other";
/**
 * A class that represents collection of keyboard-related utilities.
 *
 * Do not instantiate this class directly, but rather use `keyboard` variable.
 */
export declare class Keyboard {
    /**
     * Returns a named key based on information contained in the event or
     * "other".
     *
     * @param ev  A keyboard event
     * @return Keyboard named key
     */
    getEventKey(ev: KeyboardEvent): KeyboardKeys;
    /**
     * Checks if event key is one or more of the selected named keys.
     *
     * @param ev   Keyboard event
     * @param key  Named key or array of keys
     * @return Is event key one of the list?
     */
    isKey(ev: KeyboardEvent, key: string | string[]): boolean;
    /**
     * Returns `true` if shift key was presset at the moment of the event.
     *
     * @param ev  Event object
     * @return Was shift pressed?
     */
    shiftKey(ev: KeyboardEvent | MouseEvent): boolean;
    /**
     * Returns `true` if ctrl key was presset at the moment of the event.
     *
     * @param ev  Event object
     * @return Was ctrl pressed?
     */
    ctrlKey(ev: KeyboardEvent | MouseEvent): boolean;
    /**
     * Returns `true` if alt key was presset at the moment of the event
     * @param ev  Event object
     * @return Was alt pressed?
     */
    altKey(ev: KeyboardEvent | MouseEvent): boolean;
    /**
     * Returns `true` if meta key was presset at the moment of the event
     * @param ev  Event object
     * @return Was meta pressed?
     */
    metaKey(ev: KeyboardEvent | MouseEvent): boolean;
}
/**
 * A single [[Keyboard]] instance to be reused across all elements so that
 * they don't need to instantiate their own.
 *
 * @ignore Exclude from docs
 */
export declare let keyboard: Keyboard;
