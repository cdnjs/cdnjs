declare function isConstructor(obj: unknown): obj is new (...args: any[]) => any;
export { isConstructor };
export * from './event-formatter';
