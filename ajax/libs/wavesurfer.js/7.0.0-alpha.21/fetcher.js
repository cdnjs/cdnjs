class Fetcher {
    async load(url) {
        return fetch(url).then((response) => response.arrayBuffer());
    }
}
export default Fetcher;
