import { DeepPartial } from "./DeepPartial";
import { PartialVideomail } from "./Videomail";
export interface VideomailClientOptions {
    logger: {
        debug: (message: unknown) => void;
        info: (message: unknown) => void;
        warn: (message: unknown) => void;
        error: (message: unknown) => void;
        getLines?: () => string[];
    };
    logStackSize: number;
    verbose: boolean;
    baseUrl: string;
    socketUrl: string;
    siteName: string;
    enablePause: boolean;
    enableAutoPause: boolean;
    enableSpace: boolean;
    submitWithVideomail: boolean;
    disableSubmit: boolean;
    enableAutoValidation: boolean;
    enableAutoUnload: boolean;
    enableAutoSubmission: boolean;
    enctype: string;
    selectors: {
        containerId?: string | undefined;
        containerClass: string;
        replayClass: string;
        userMediaClass: string;
        visualsClass: string;
        buttonClass?: string | undefined;
        buttonsClass: string;
        recordButtonClass: string;
        pauseButtonClass: string;
        resumeButtonClass: string;
        previewButtonClass: string;
        recordAgainButtonClass: string;
        submitButtonClass: string;
        subjectInputName: string;
        fromInputName: string;
        toInputName: string;
        ccInputName: string;
        bccInputName: string;
        bodyInputName: string;
        sendCopyInputName: string;
        keyInputName: string;
        parentKeyInputName: string;
        formId?: string | undefined;
        submitButtonId?: string | undefined;
        submitButtonSelector?: string | undefined;
    };
    audio: {
        enabled: boolean;
        switch: boolean;
        volume: number;
        bufferSize: number | "auto";
    };
    video: {
        fps: number;
        limitSeconds: number;
        countdown?: number | boolean;
        width?: number | undefined;
        height?: number | undefined;
        facingMode: ConstrainDOMString;
        facingModeButton: boolean;
        stretch: boolean;
    };
    image: {
        quality: number;
        types: string[];
    };
    text: {
        pausedHeader: string;
        pausedHint?: string | undefined;
        sending: string;
        encoding: string;
        limitReached: string;
        audioOff: string;
        audioOn: string;
        buttons: {
            record: string;
            recordAgain: string;
            resume: string;
            pause: string;
            preview: string;
        };
    };
    notifier: {
        entertain: boolean;
        entertainClass: string;
        entertainLimit: number;
        entertainInterval: number;
    };
    timeouts: {
        userMedia: number;
        connection: number;
        pingInterval: number;
    };
    loadUserMediaOnRecord: boolean;
    callbacks: {
        adjustFormDataBeforePosting?: undefined | ((videomail: PartialVideomail) => PartialVideomail);
    };
    defaults: {
        from?: string | undefined;
        to?: string | undefined;
        cc?: string | undefined;
        bcc?: string | undefined;
        subject?: string | undefined;
        body?: string | undefined;
    };
    displayErrors: boolean;
    adjustFormOnBrowserError: boolean;
    reportErrors: boolean;
    fakeUaString?: string | undefined;
    version: string;
}
export type PartialVideomailClientOptions = DeepPartial<VideomailClientOptions>;
