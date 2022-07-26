import { SocketIoChannel } from './socketio-channel';
/**
 * This class represents a Socket.io private channel.
 */
export declare class SocketIoPrivateChannel extends SocketIoChannel {
    /**
     * Trigger client event on the channel.
     */
    whisper(eventName: string, data: any): SocketIoChannel;
}
