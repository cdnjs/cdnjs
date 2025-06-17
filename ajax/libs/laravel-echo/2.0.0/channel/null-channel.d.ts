import { Channel } from './channel';
/**
 * This class represents a null channel.
 */
export declare class NullChannel extends Channel {
    /**
     * Subscribe to a channel.
     */
    subscribe(): void;
    /**
     * Unsubscribe from a channel.
     */
    unsubscribe(): void;
    /**
     * Listen for an event on the channel instance.
     */
    listen(_event: string, _callback: CallableFunction): this;
    /**
     * Listen for all events on the channel instance.
     */
    listenToAll(_callback: CallableFunction): this;
    /**
     * Stop listening for an event on the channel instance.
     */
    stopListening(_event: string, _callback?: CallableFunction): this;
    /**
     * Register a callback to be called anytime a subscription succeeds.
     */
    subscribed(_callback: CallableFunction): this;
    /**
     * Register a callback to be called anytime an error occurs.
     */
    error(_callback: CallableFunction): this;
    /**
     * Bind a channel to an event.
     */
    on(_event: string, _callback: CallableFunction): this;
}
