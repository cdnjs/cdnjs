/**
 * Calculates how close `str1` matches `str2` using fuzzy match.
 * How matching works:
 * – first characters of both `str1` and `str2` *must* match
 * – `str1` length larger than `str2` length is allowed only when `unmatched` is true
 * – ideal match is when `str1` equals to `str2` (score: 1)
 * – next best match is `str2` starts with `str1` (score: 1 × percent of matched characters)
 * – other scores depend on how close characters of `str1` to the beginning of `str2`
 * @param partialMatch Allow length `str1` to be greater than `str2` length
 */
export default function scoreMatch(str1: string, str2: string, partialMatch?: boolean): number;
