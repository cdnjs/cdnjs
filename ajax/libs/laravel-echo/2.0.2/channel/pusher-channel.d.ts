import { EventFormatter } from '../util';
import { Channel } from './channel';
import type Pusher from 'pusher-js';
import type { Channel as BasePusherChannel } from 'pusher-js';
import type { EchoOptionsWithDefaults } from '../connector';
import type { BroadcastDriver } from '../echo';
/**
 * This class represents a Pusher channel.
 */
export declare class PusherChannel<TBroadcastDriver extends BroadcastDriver> extends Channel {
    /**
     * The Pusher client instance.
     */
    pusher: Pusher;
    /**
     * The name of the channel.
     */
    name: string;
    /**
     * The event formatter.
     */
    eventFormatter: EventFormatter;
    /**
     * The subscription of the channel.
     */
    subscription: BasePusherChannel;
    /**
     * Create a new class instance.
     */
    constructor(pusher: Pusher, name: string, options: EchoOptionsWithDefaults<TBroadcastDriver>);
    /**
     * Subscribe to a Pusher channel.
     */
    subscribe(): void;
    /**
     * Unsubscribe from a Pusher channel.
     */
    unsubscribe(): void;
    /**
     * Listen for an event on the channel instance.
     */
    listen(event: string, callback: CallableFunction): this;
    /**
     * Listen for all events on the channel instance.
     */
    listenToAll(callback: CallableFunction): this;
    /**
     * Stop listening for an event on the channel instance.
     */
    stopListening(event: string, callback?: CallableFunction): this;
    /**
     * Stop listening for all events on the channel instance.
     */
    stopListeningToAll(callback?: CallableFunction): this;
    /**
     * Register a callback to be called anytime a subscription succeeds.
     */
    subscribed(callback: CallableFunction): this;
    /**
     * Register a callback to be called anytime a subscription error occurs.
     */
    error(callback: CallableFunction): this;
    /**
     * Bind a channel to an event.
     */
    on(event: string, callback: CallableFunction): this;
}
