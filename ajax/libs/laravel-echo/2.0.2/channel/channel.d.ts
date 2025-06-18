import type { EchoOptionsWithDefaults } from '../connector';
import type { BroadcastDriver } from '../echo';
/**
 * This class represents a basic channel.
 */
export declare abstract class Channel {
    /**
     * The Echo options.
     */
    options: EchoOptionsWithDefaults<BroadcastDriver>;
    /**
     * Listen for an event on the channel instance.
     */
    abstract listen(event: string, callback: CallableFunction): this;
    /**
     * Listen for a whisper event on the channel instance.
     */
    listenForWhisper(event: string, callback: CallableFunction): this;
    /**
     * Listen for an event on the channel instance.
     */
    notification(callback: CallableFunction): this;
    /**
     * Stop listening to an event on the channel instance.
     */
    abstract stopListening(event: string, callback?: CallableFunction): this;
    /**
     * Stop listening for a whisper event on the channel instance.
     */
    stopListeningForWhisper(event: string, callback?: CallableFunction): this;
    /**
     * Register a callback to be called anytime a subscription succeeds.
     */
    abstract subscribed(callback: CallableFunction): this;
    /**
     * Register a callback to be called anytime an error occurs.
     */
    abstract error(callback: CallableFunction): this;
}
