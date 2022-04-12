import { Connector } from './connector';
import { PusherChannel, PresenceChannel } from './../channel';
/**
 * This class creates a connector to Pusher.
 */
export declare class PusherConnector extends Connector {
    /**
     * The Pusher instance.
     */
    pusher: any;
    /**
     * All of the subscribed channel names.
     */
    channels: any;
    /**
     * Create a fresh Pusher connection.
     */
    connect(): void;
    /**
     * Listen for an event on a channel instance.
     */
    listen(name: string, event: string, callback: Function): PusherChannel;
    /**
     * Get a channel instance by name.
     */
    channel(name: string): PusherChannel;
    /**
     * Get a private channel instance by name.
     */
    privateChannel(name: string): PusherChannel;
    /**
     * Get a private encrypted channel instance by name.
     */
    encryptedPrivateChannel(name: string): PusherChannel;
    /**
     * Get a presence channel instance by name.
     */
    presenceChannel(name: string): PresenceChannel;
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
