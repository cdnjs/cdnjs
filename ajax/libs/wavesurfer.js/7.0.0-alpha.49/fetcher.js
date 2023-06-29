async function load(url) {
    return fetch(url).then((response) => response.arrayBuffer());
}
const Fetcher = {
    load,
};
export default Fetcher;
