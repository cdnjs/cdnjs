import { VideomailClientOptions } from "./types/options";
import Videomail, { PartialVideomail } from "./types/Videomail";
import Response from "superagent/lib/node/response";
import VideomailError from "./util/error/VideomailError";
import { FormInputs } from "./wrappers/form";
declare class Resource {
    private readonly options;
    private readonly timezoneId;
    constructor(options: VideomailClientOptions);
    private applyDefaultValue;
    private applyDefaultValues;
    private get;
    private write;
    getByAlias(alias: string): Promise<Videomail>;
    getByKey(key: string): Promise<Videomail>;
    reportError(err: VideomailError): Promise<void>;
    post(videomail: PartialVideomail): Promise<Response>;
    put(videomail: PartialVideomail): Promise<Response>;
    form(formData: FormInputs, url: string): Promise<Response>;
}
export default Resource;
