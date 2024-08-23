import type { Actor, AddMessageParams, Box, Message } from './types.js';
export declare const addBox: (data: {
    text: string;
    color: string;
    wrap: boolean;
}) => void;
export declare const addActor: (id: string, name: string, description: {
    text: string;
    wrap?: boolean | null;
    type: string;
}, type: string) => void;
export declare const addMessage: (idFrom: Message['from'], idTo: Message['to'], message: {
    text: string;
    wrap?: boolean;
}, answer: Message['answer']) => void;
export declare const addSignal: (idFrom?: Message['from'], idTo?: Message['to'], message?: {
    text: string;
    wrap: boolean;
}, messageType?: number, activate?: boolean) => boolean;
export declare const hasAtLeastOneBox: () => boolean;
export declare const hasAtLeastOneBoxWithTitle: () => boolean;
export declare const getMessages: () => Message[];
export declare const getBoxes: () => Box[];
export declare const getActors: () => Map<string, Actor>;
export declare const getCreatedActors: () => Map<string, number>;
export declare const getDestroyedActors: () => Map<string, number>;
export declare const getActor: (id: string) => Actor;
export declare const getActorKeys: () => string[];
export declare const enableSequenceNumbers: () => void;
export declare const disableSequenceNumbers: () => void;
export declare const showSequenceNumbers: () => boolean;
export declare const setWrap: (wrapSetting?: boolean) => void;
export declare const autoWrap: () => boolean;
export declare const clear: () => void;
export declare const parseMessage: (str: string) => {
    text: string | undefined;
    wrap: boolean | undefined;
};
export declare const parseBoxData: (str: string) => {
    text: string | undefined;
    color: string;
    wrap: boolean | undefined;
};
export declare const LINETYPE: {
    SOLID: number;
    DOTTED: number;
    NOTE: number;
    SOLID_CROSS: number;
    DOTTED_CROSS: number;
    SOLID_OPEN: number;
    DOTTED_OPEN: number;
    LOOP_START: number;
    LOOP_END: number;
    ALT_START: number;
    ALT_ELSE: number;
    ALT_END: number;
    OPT_START: number;
    OPT_END: number;
    ACTIVE_START: number;
    ACTIVE_END: number;
    PAR_START: number;
    PAR_AND: number;
    PAR_END: number;
    RECT_START: number;
    RECT_END: number;
    SOLID_POINT: number;
    DOTTED_POINT: number;
    AUTONUMBER: number;
    CRITICAL_START: number;
    CRITICAL_OPTION: number;
    CRITICAL_END: number;
    BREAK_START: number;
    BREAK_END: number;
    PAR_OVER_START: number;
    BIDIRECTIONAL_SOLID: number;
    BIDIRECTIONAL_DOTTED: number;
};
export declare const ARROWTYPE: {
    FILLED: number;
    OPEN: number;
};
export declare const PLACEMENT: {
    LEFTOF: number;
    RIGHTOF: number;
    OVER: number;
};
export declare const addNote: (actor: {
    actor: string;
}, placement: Message['placement'], message: {
    text: string;
    wrap?: boolean;
}) => void;
export declare const addLinks: (actorId: string, text: {
    text: string;
}) => void;
export declare const addALink: (actorId: string, text: {
    text: string;
}) => void;
export declare const addProperties: (actorId: string, text: {
    text: string;
}) => void;
export declare const addDetails: (actorId: string, text: {
    text: string;
}) => void;
export declare const getActorProperty: (actor: Actor, key: string) => unknown;
export declare const apply: (param: any | AddMessageParams | AddMessageParams[]) => void;
declare const _default: {
    addActor: (id: string, name: string, description: {
        text: string;
        wrap?: boolean | null | undefined;
        type: string;
    }, type: string) => void;
    addMessage: (idFrom: string | undefined, idTo: string | undefined, message: {
        text: string;
        wrap?: boolean | undefined;
    }, answer: unknown) => void;
    addSignal: (idFrom?: string | undefined, idTo?: string | undefined, message?: {
        text: string;
        wrap: boolean;
    } | undefined, messageType?: number | undefined, activate?: boolean) => boolean;
    addLinks: (actorId: string, text: {
        text: string;
    }) => void;
    addDetails: (actorId: string, text: {
        text: string;
    }) => void;
    addProperties: (actorId: string, text: {
        text: string;
    }) => void;
    autoWrap: () => boolean;
    setWrap: (wrapSetting?: boolean | undefined) => void;
    enableSequenceNumbers: () => void;
    disableSequenceNumbers: () => void;
    showSequenceNumbers: () => boolean;
    getMessages: () => Message[];
    getActors: () => Map<string, Actor>;
    getCreatedActors: () => Map<string, number>;
    getDestroyedActors: () => Map<string, number>;
    getActor: (id: string) => Actor;
    getActorKeys: () => string[];
    getActorProperty: (actor: Actor, key: string) => unknown;
    getAccTitle: () => string;
    getBoxes: () => Box[];
    getDiagramTitle: () => string;
    setDiagramTitle: (txt: string) => void;
    getConfig: () => import("../../config.type.js").SequenceDiagramConfig | undefined;
    clear: () => void;
    parseMessage: (str: string) => {
        text: string | undefined;
        wrap: boolean | undefined;
    };
    parseBoxData: (str: string) => {
        text: string | undefined;
        color: string;
        wrap: boolean | undefined;
    };
    LINETYPE: {
        SOLID: number;
        DOTTED: number;
        NOTE: number;
        SOLID_CROSS: number;
        DOTTED_CROSS: number;
        SOLID_OPEN: number;
        DOTTED_OPEN: number;
        LOOP_START: number;
        LOOP_END: number;
        ALT_START: number;
        ALT_ELSE: number;
        ALT_END: number;
        OPT_START: number;
        OPT_END: number;
        ACTIVE_START: number;
        ACTIVE_END: number;
        PAR_START: number;
        PAR_AND: number;
        PAR_END: number;
        RECT_START: number;
        RECT_END: number;
        SOLID_POINT: number;
        DOTTED_POINT: number;
        AUTONUMBER: number;
        CRITICAL_START: number;
        CRITICAL_OPTION: number;
        CRITICAL_END: number;
        BREAK_START: number;
        BREAK_END: number;
        PAR_OVER_START: number;
        BIDIRECTIONAL_SOLID: number;
        BIDIRECTIONAL_DOTTED: number;
    };
    ARROWTYPE: {
        FILLED: number;
        OPEN: number;
    };
    PLACEMENT: {
        LEFTOF: number;
        RIGHTOF: number;
        OVER: number;
    };
    addNote: (actor: {
        actor: string;
    }, placement: string | undefined, message: {
        text: string;
        wrap?: boolean | undefined;
    }) => void;
    setAccTitle: (txt: string) => void;
    apply: (param: any) => void;
    setAccDescription: (txt: string) => void;
    getAccDescription: () => string;
    hasAtLeastOneBox: () => boolean;
    hasAtLeastOneBoxWithTitle: () => boolean;
};
export default _default;
