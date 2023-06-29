declare function load(url: string): Promise<ArrayBuffer>;
declare const Fetcher: {
    load: typeof load;
};
export default Fetcher;
