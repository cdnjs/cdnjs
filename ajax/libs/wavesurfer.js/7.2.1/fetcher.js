var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function fetchBlob(url, progressCallback, requestInit) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        // Fetch the resource
        const response = yield fetch(url, requestInit);
        // Read the data to track progress
        {
            const reader = (_a = response.clone().body) === null || _a === void 0 ? void 0 : _a.getReader();
            const contentLength = Number((_b = response.headers) === null || _b === void 0 ? void 0 : _b.get('Content-Length'));
            let receivedLength = 0;
            // Process the data
            const processChunk = (done, value) => __awaiter(this, void 0, void 0, function* () {
                if (done)
                    return;
                // Add to the received length
                receivedLength += (value === null || value === void 0 ? void 0 : value.length) || 0;
                const percentage = Math.round((receivedLength / contentLength) * 100);
                progressCallback(percentage);
                // Continue reading data
                return reader === null || reader === void 0 ? void 0 : reader.read().then(({ done, value }) => processChunk(done, value));
            });
            reader === null || reader === void 0 ? void 0 : reader.read().then(({ done, value }) => processChunk(done, value));
        }
        return response.blob();
    });
}
const Fetcher = {
    fetchBlob,
};
export default Fetcher;
