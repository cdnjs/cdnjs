import { PresenceChannel } from './presence-channel';
import { SocketIoPrivateChannel } from './socketio-private-channel';
/**
 * This class represents a Socket.io presence channel.
 */
export declare class SocketIoPresenceChannel extends SocketIoPrivateChannel implements PresenceChannel {
    /**
     * Register a callback to be called anytime the member list changes.
     */
    here(callback: Function): this;
    /**
     * Listen for someone joining the channel.
     */
    joining(callback: Function): this;
    /**
     * Send a whisper event to other clients in the channel.
     */
    whisper(eventName: string, data: any): this;
    /**
     * Listen for someone leaving the channel.
     */
    leaving(callback: Function): this;
}
