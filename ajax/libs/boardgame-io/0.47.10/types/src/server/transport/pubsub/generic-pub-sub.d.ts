/** Generic interface for pub-subs.  */
export interface GenericPubSub<T> {
    publish(channelId: string, payload: T): any;
    subscribe(channelId: string, callback: (payload: T) => void): void;
    unsubscribeAll(channelId: string): any;
}
