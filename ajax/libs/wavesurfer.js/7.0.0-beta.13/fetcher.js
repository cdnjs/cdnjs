async function fetchBlob(url, init) {
    return fetch(url, init).then((response) => response.blob());
}
const Fetcher = {
    fetchBlob,
};
export default Fetcher;
