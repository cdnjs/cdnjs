import { Connector, type EchoOptionsWithDefaults } from './connector';
import { PusherChannel, PusherPrivateChannel, PusherEncryptedPrivateChannel, PusherPresenceChannel } from '../channel';
import type Pusher from 'pusher-js';
import type { Options as PusherOptions } from 'pusher-js';
import type { BroadcastDriver } from '../echo';
type AnyPusherChannel = PusherChannel<BroadcastDriver> | PusherPrivateChannel<BroadcastDriver> | PusherEncryptedPrivateChannel<BroadcastDriver> | PusherPresenceChannel<BroadcastDriver>;
/**
 * This class creates a connector to Pusher.
 */
export declare class PusherConnector<TBroadcastDriver extends BroadcastDriver> extends Connector<TBroadcastDriver, PusherChannel<TBroadcastDriver>, PusherPrivateChannel<TBroadcastDriver>, PusherPresenceChannel<TBroadcastDriver>> {
    /**
     * The Pusher instance.
     */
    pusher: Pusher;
    /**
     * All of the subscribed channel names.
     */
    channels: Record<string, AnyPusherChannel>;
    options: EchoOptionsWithDefaults<TBroadcastDriver> & {
        key: string;
        Pusher?: typeof Pusher;
    } & PusherOptions;
    /**
     * Create a fresh Pusher connection.
     */
    connect(): void;
    /**
     * Sign in the user via Pusher user authentication (https://pusher.com/docs/channels/using_channels/user-authentication/).
     */
    signin(): void;
    /**
     * Listen for an event on a channel instance.
     */
    listen(name: string, event: string, callback: CallableFunction): AnyPusherChannel;
    /**
     * Get a channel instance by name.
     */
    channel(name: string): AnyPusherChannel;
    /**
     * Get a private channel instance by name.
     */
    privateChannel(name: string): PusherPrivateChannel<TBroadcastDriver>;
    /**
     * Get a private encrypted channel instance by name.
     */
    encryptedPrivateChannel(name: string): PusherEncryptedPrivateChannel<TBroadcastDriver>;
    /**
     * Get a presence channel instance by name.
     */
    presenceChannel(name: string): PusherPresenceChannel<TBroadcastDriver>;
    /**
     * Leave the given channel, as well as its private and presence variants.
     */
    leave(name: string): void;
    /**
     * Leave the given channel.
     */
    leaveChannel(name: string): void;
    /**
     * Get the socket ID for the connection.
     */
    socketId(): string;
    /**
     * Disconnect Pusher connection.
     */
    disconnect(): void;
}
export {};
