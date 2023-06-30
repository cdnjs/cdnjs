async function fetchArrayBuffer(url) {
    return fetch(url).then((response) => response.arrayBuffer());
}
const Fetcher = {
    fetchArrayBuffer,
};
export default Fetcher;
