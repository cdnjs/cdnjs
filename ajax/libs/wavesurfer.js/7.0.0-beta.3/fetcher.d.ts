declare function fetchArrayBuffer(url: string): Promise<ArrayBuffer>;
declare const Fetcher: {
    fetchArrayBuffer: typeof fetchArrayBuffer;
};
export default Fetcher;
