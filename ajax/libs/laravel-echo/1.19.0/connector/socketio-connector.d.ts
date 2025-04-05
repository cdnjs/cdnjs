import { Connector } from './connector';
import { SocketIoChannel, SocketIoPrivateChannel, SocketIoPresenceChannel } from './../channel';
declare type AnySocketIoChannel = SocketIoChannel | SocketIoPrivateChannel | SocketIoPresenceChannel;
/**
 * This class creates a connnector to a Socket.io server.
 */
export declare class SocketIoConnector extends Connector<SocketIoChannel, SocketIoPrivateChannel, SocketIoPresenceChannel> {
    /**
     * The Socket.io connection instance.
     */
    socket: any;
    /**
     * All of the subscribed channel names.
     */
    channels: {
        [name: string]: SocketIoChannel;
    };
    /**
     * Create a fresh Socket.io connection.
     */
    connect(): void;
    /**
     * Get socket.io module from global scope or options.
     */
    getSocketIO(): any;
    /**
     * Listen for an event on a channel instance.
     */
    listen(name: string, event: string, callback: Function): AnySocketIoChannel;
    /**
     * Get a channel instance by name.
     */
    channel(name: string): AnySocketIoChannel;
    /**
     * Get a private channel instance by name.
     */
    privateChannel(name: string): SocketIoPrivateChannel;
    /**
     * Get a presence channel instance by name.
     */
    presenceChannel(name: string): SocketIoPresenceChannel;
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
     * Disconnect Socketio connection.
     */
    disconnect(): void;
}
export {};
