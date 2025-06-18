import { PusherChannel } from './pusher-channel';
import type { BroadcastDriver } from '../echo';
/**
 * This class represents a Pusher private channel.
 */
export declare class PusherPrivateChannel<TBroadcastDriver extends BroadcastDriver> extends PusherChannel<TBroadcastDriver> {
    /**
     * Send a whisper event to other clients in the channel.
     */
    whisper(eventName: string, data: Record<any, any>): this;
}
