import { Connector } from './connector';
import { PusherChannel, PusherPrivateChannel, PusherEncryptedPrivateChannel, PusherPresenceChannel } from './../channel';
declare type AnyPusherChannel = PusherChannel | PusherPrivateChannel | PusherEncryptedPrivateChannel | PusherPresenceChannel;
/**
 * This class creates a connector to Pusher.
 */
export declare class PusherConnector extends Connector<PusherChannel, PusherPrivateChannel, PusherPresenceChannel> {
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
     * Sign in the user via Pusher user authentication (https://pusher.com/docs/channels/using_channels/user-authentication/).
     */
    signin(): void;
    /**
     * Listen for an event on a channel instance.
     */
    listen(name: string, event: string, callback: Function): AnyPusherChannel;
    /**
     * Get a channel instance by name.
     */
    channel(name: string): AnyPusherChannel;
    /**
     * Get a private channel instance by name.
     */
    privateChannel(name: string): PusherPrivateChannel;
    /**
     * Get a private encrypted channel instance by name.
     */
    encryptedPrivateChannel(name: string): PusherEncryptedPrivateChannel;
    /**
     * Get a presence channel instance by name.
     */
    presenceChannel(name: string): PusherPresenceChannel;
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
