import { EventFormatter } from '../util';
import { Channel } from './channel';
/**
 * This class represents a Pusher channel.
 */
export declare class PusherChannel extends Channel {
    /**
     * The Pusher client instance.
     */
    pusher: any;
    /**
     * The name of the channel.
     */
    name: any;
    /**
     * Channel options.
     */
    options: any;
    /**
     * The event formatter.
     */
    eventFormatter: EventFormatter;
    /**
     * The subscription of the channel.
     */
    subscription: any;
    /**
     * Create a new class instance.
     */
    constructor(pusher: any, name: any, options: any);
    /**
     * Subscribe to a Pusher channel.
     */
    subscribe(): any;
    /**
     * Unsubscribe from a Pusher channel.
     */
    unsubscribe(): void;
    /**
     * Listen for an event on the channel instance.
     */
    listen(event: string, callback: Function): this;
    /**
     * Listen for all events on the channel instance.
     */
    listenToAll(callback: Function): this;
    /**
     * Stop listening for an event on the channel instance.
     */
    stopListening(event: string, callback?: Function): this;
    /**
     * Stop listening for all events on the channel instance.
     */
    stopListeningToAll(callback?: Function): this;
    /**
     * Register a callback to be called anytime a subscription succeeds.
     */
    subscribed(callback: Function): this;
    /**
     * Register a callback to be called anytime a subscription error occurs.
     */
    error(callback: Function): this;
    /**
     * Bind a channel to an event.
     */
    on(event: string, callback: Function): this;
}
