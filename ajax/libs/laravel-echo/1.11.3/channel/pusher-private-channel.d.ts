import { PusherChannel } from './pusher-channel';
/**
 * This class represents a Pusher private channel.
 */
export declare class PusherPrivateChannel extends PusherChannel {
    /**
     * Trigger client event on the channel.
     */
    whisper(eventName: string, data: any): PusherPrivateChannel;
}
