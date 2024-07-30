import * as React from 'react';
/**
 * Вынесен в константу, чтобы можно было в тестах создавать свой контекст и сливать перед этим значения по-умолчанию
 *
 * > Note: не смог убрать из покрытия через 'istanbul ignore next'.
 */ export const DEFAULT_APP_ROOT_CONTEXT_VALUE = {
    appRoot: React.createRef(),
    mode: 'full',
    portalRoot: React.createRef(),
    embedded: false,
    keyboardInput: false,
    disablePortal: false
};
export const AppRootContext = React.createContext(DEFAULT_APP_ROOT_CONTEXT_VALUE);

//# sourceMappingURL=AppRootContext.js.map