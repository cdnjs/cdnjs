/* eslint-disable no-restricted-globals */
import { interval } from './eval.mjs'
import { linspace } from '../utils.mjs'

self.onmessage = ({ data }) => {
  const d = data.d
  const nTask = data.nTask
  const out = new Float32Array(data.interval2d)
  const xCoords = linspace(data.lo, data.hi, data.n)
  let outIdx = 0
  for (let i = 0; i < xCoords.length - 1; i += 1, outIdx += 4) {
    const x = { lo: xCoords[i], hi: xCoords[i + 1] }
    const y = interval(d, 'fn', { x })
    if (y.lo > y.hi) {
      // is empty
      continue
    }
    out[outIdx + 0] = xCoords[i]
    out[outIdx + 1] = xCoords[i + 1]
    // might return [-Infinity, Infinity] if the interval is a whole interval
    out[outIdx + 2] = y.lo
    out[outIdx + 3] = y.hi
  }
  for (; outIdx < out.length; outIdx += 4) {
    out[outIdx + 0] = Infinity
    out[outIdx + 1] = -Infinity
    out[outIdx + 2] = Infinity
    out[outIdx + 3] = -Infinity
  }
  self.postMessage({ interval2d: out, nTask }, [out.buffer])
}
