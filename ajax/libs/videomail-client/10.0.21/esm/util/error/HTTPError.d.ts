declare class HTTPError extends Error {
    code?: string | undefined;
    status?: number | undefined;
}
export default HTTPError;
