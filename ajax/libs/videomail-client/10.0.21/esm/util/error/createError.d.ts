import VideomailError from "./VideomailError";
import { VideomailClientOptions } from "../../types/options";
import HTTPError from "./HTTPError";
interface ErrorParams {
    err?: HTTPError;
    exc?: unknown;
    message?: string;
    explanation?: string;
    options: VideomailClientOptions;
    classList?: string[];
}
declare function createError(errorParams: ErrorParams): VideomailError;
export default createError;
