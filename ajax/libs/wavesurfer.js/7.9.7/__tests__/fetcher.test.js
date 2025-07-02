var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Fetcher from '../fetcher.js';
import { TextEncoder } from 'util';
import { Blob as NodeBlob } from 'buffer';
describe('Fetcher', () => {
    test('fetchBlob returns blob and reports progress', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = 'hello';
        const reader = {
            read: jest
                .fn()
                .mockResolvedValueOnce({ done: false, value: new TextEncoder().encode(data) })
                .mockResolvedValueOnce({ done: true, value: undefined }),
        };
        const response = {
            status: 200,
            statusText: 'OK',
            headers: new Headers({ 'Content-Length': data.length.toString() }),
            body: { getReader: () => reader },
            clone() {
                return this;
            },
            blob: () => __awaiter(void 0, void 0, void 0, function* () { return new NodeBlob([data]); }),
        };
        global.fetch = jest.fn().mockResolvedValue(response);
        const progress = jest.fn();
        const blob = yield Fetcher.fetchBlob('url', progress);
        expect(yield blob.text()).toBe(data);
        // wait for watchProgress to process
        yield new Promise(process.nextTick);
        expect(progress).toHaveBeenCalledWith(100);
    }));
});
