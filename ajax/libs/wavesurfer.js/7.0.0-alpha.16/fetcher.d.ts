declare class Fetcher {
    load(url: string): Promise<ArrayBuffer>;
}
export default Fetcher;
