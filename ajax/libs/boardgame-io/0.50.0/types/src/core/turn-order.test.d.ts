declare global {
    namespace jest {
        interface Matchers<R> {
            toHaveUndefinedProperties(): R;
        }
    }
}
export {};
