import { EventFormatter } from '../util';
import { Channel } from './channel';
import type { Socket } from 'socket.io-client';
import type { EchoOptionsWithDefaults } from '../connector';
import type { BroadcastDriver } from '../echo';
/**
 * This class represents a Socket.io channel.
 */
export declare class SocketIoChannel extends Channel {
    /**
     * The Socket.io client instance.
     */
    socket: Socket;
    /**
     * The name of the channel.
     */
    name: string;
    /**
     * The event formatter.
     */
    eventFormatter: EventFormatter;
    /**
     * The event callbacks applied to the socket.
     */
    events: Record<string, any>;
    /**
     * User supplied callbacks for events on this channel.
     */
    private listeners;
    /**
     * Create a new class instance.
     */
    constructor(socket: Socket, name: string, options: EchoOptionsWithDefaults<BroadcastDriver>);
    /**
     * Subscribe to a Socket.io channel.
     */
    subscribe(): void;
    /**
     * Unsubscribe from channel and ubind event callbacks.
     */
    unsubscribe(): void;
    /**
     * Listen for an event on the channel instance.
     */
    listen(event: string, callback: CallableFunction): this;
    /**
     * Stop listening for an event on the channel instance.
     */
    stopListening(event: string, callback?: CallableFunction): this;
    /**
     * Register a callback to be called anytime a subscription succeeds.
     */
    subscribed(callback: CallableFunction): this;
    /**
     * Register a callback to be called anytime an error occurs.
     */
    error(_callback: CallableFunction): this;
    /**
     * Bind the channel's socket to an event and store the callback.
     */
    on(event: string, callback: CallableFunction): this;
    /**
     * Unbind the channel's socket from all stored event callbacks.
     */
    unbind(): void;
    /**
     * Unbind the listeners for the given event.
     */
    protected unbindEvent(event: string, callback?: CallableFunction): void;
}
