async function fetchArrayBuffer(url) {
    return fetch(url).then((response) => response.arrayBuffer());
}
async function fetchBlob(url) {
    return fetch(url).then((response) => response.blob());
}
const Fetcher = {
    fetchArrayBuffer,
    fetchBlob,
};
export default Fetcher;
