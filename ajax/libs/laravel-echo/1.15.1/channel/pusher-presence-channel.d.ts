import { PusherChannel } from './pusher-channel';
import { PresenceChannel } from './presence-channel';
/**
 * This class represents a Pusher presence channel.
 */
export declare class PusherPresenceChannel extends PusherChannel implements PresenceChannel {
    /**
     * Register a callback to be called anytime the member list changes.
     */
    here(callback: Function): PusherPresenceChannel;
    /**
     * Listen for someone joining the channel.
     */
    joining(callback: Function): PusherPresenceChannel;
    /**
     * Send a whisper event to other clients in the channel.
     */
    whisper(eventName: string, data: any): PusherPresenceChannel;
    /**
     * Listen for someone leaving the channel.
     */
    leaving(callback: Function): PusherPresenceChannel;
}
