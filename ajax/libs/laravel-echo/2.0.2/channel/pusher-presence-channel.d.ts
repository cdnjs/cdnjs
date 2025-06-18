import type { PresenceChannel } from './presence-channel';
import { PusherPrivateChannel } from './pusher-private-channel';
import type { BroadcastDriver } from '../echo';
/**
 * This class represents a Pusher presence channel.
 */
export declare class PusherPresenceChannel<TBroadcastDriver extends BroadcastDriver> extends PusherPrivateChannel<TBroadcastDriver> implements PresenceChannel {
    /**
     * Register a callback to be called anytime the member list changes.
     */
    here(callback: CallableFunction): this;
    /**
     * Listen for someone joining the channel.
     */
    joining(callback: CallableFunction): this;
    /**
     * Send a whisper event to other clients in the channel.
     */
    whisper(eventName: string, data: Record<any, any>): this;
    /**
     * Listen for someone leaving the channel.
     */
    leaving(callback: CallableFunction): this;
}
