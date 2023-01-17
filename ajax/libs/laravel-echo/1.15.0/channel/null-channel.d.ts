import { Channel } from './channel';
/**
 * This class represents a null channel.
 */
export declare class NullChannel extends Channel {
    /**
     * Subscribe to a channel.
     */
    subscribe(): any;
    /**
     * Unsubscribe from a channel.
     */
    unsubscribe(): void;
    /**
     * Listen for an event on the channel instance.
     */
    listen(event: string, callback: Function): NullChannel;
    /**
     * Listen for all events on the channel instance.
     */
    listenToAll(callback: Function): NullChannel;
    /**
     * Stop listening for an event on the channel instance.
     */
    stopListening(event: string, callback?: Function): NullChannel;
    /**
     * Register a callback to be called anytime a subscription succeeds.
     */
    subscribed(callback: Function): NullChannel;
    /**
     * Register a callback to be called anytime an error occurs.
     */
    error(callback: Function): NullChannel;
    /**
     * Bind a channel to an event.
     */
    on(event: string, callback: Function): NullChannel;
}
