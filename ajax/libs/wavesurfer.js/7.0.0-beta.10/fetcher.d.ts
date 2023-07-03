declare function fetchArrayBuffer(url: string): Promise<ArrayBuffer>;
declare function fetchBlob(url: string): Promise<Blob>;
declare const Fetcher: {
    fetchArrayBuffer: typeof fetchArrayBuffer;
    fetchBlob: typeof fetchBlob;
};
export default Fetcher;
