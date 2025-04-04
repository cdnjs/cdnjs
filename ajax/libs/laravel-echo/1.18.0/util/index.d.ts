declare function isConstructor(obj: any): obj is new (...args: any[]) => any;
export { isConstructor };
export * from './event-formatter';
