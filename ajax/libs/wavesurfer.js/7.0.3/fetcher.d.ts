declare function fetchBlob(url: string, init?: RequestInit): Promise<Blob>;
declare const Fetcher: {
    fetchBlob: typeof fetchBlob;
};
export default Fetcher;
