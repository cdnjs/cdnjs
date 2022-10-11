import type { GenericPubSub } from './generic-pub-sub';
export declare class InMemoryPubSub<T> implements GenericPubSub<T> {
    callbacks: Map<string, ((payload: T) => void)[]>;
    publish(channelId: string, payload: T): void;
    subscribe(channelId: string, callback: (payload: T) => void): void;
    unsubscribeAll(channelId: string): void;
}
