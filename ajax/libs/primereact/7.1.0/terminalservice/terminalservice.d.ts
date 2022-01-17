type TerminalServiceActionType = 'command' | 'response' | 'clear';

export interface TerminalServiceOptions {
    on(action: TerminalServiceActionType, fn: any): void;
    emit(action: TerminalServiceActionType, params?: any): void;
    off(action: TerminalServiceActionType, fn: any): void;
}

export declare const TerminalService: TerminalServiceOptions;
