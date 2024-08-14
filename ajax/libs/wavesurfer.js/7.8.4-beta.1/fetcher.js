async function watchProgress(response, progressCallback) {
    if (!response.body || !response.headers)
        return;
    const reader = response.body.getReader();
    const contentLength = Number(response.headers.get('Content-Length')) || 0;
    let receivedLength = 0;
    // Process the data
    const processChunk = async (value) => {
        // Add to the received length
        receivedLength += value?.length || 0;
        const percentage = Math.round((receivedLength / contentLength) * 100);
        progressCallback(percentage);
    };
    const read = async () => {
        let data;
        try {
            data = await reader.read();
        }
        catch {
            // Ignore errors because we can only handle the main response
            return;
        }
        // Continue reading data until done
        if (!data.done) {
            processChunk(data.value);
            await read();
        }
    };
    read();
}
async function fetchBlob(url, progressCallback, requestInit) {
    // Fetch the resource
    const response = await fetch(url, requestInit);
    if (response.status >= 400) {
        throw new Error(`Failed to fetch ${url}: ${response.status} (${response.statusText})`);
    }
    // Read the data to track progress
    watchProgress(response.clone(), progressCallback);
    return response.blob();
}
const Fetcher = {
    fetchBlob,
};
export default Fetcher;
