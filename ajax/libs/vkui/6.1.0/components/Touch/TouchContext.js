import * as React from 'react';
/**
 * Контекст для компонентов, использующих Touch в качестве корневой обёртки,
 * и для которых важно не предотвращать всплытие тач-событий от дочерних компонентов
 */ const TouchRootContext = React.createContext(false);
// eslint-disable-next-line import/no-default-export
export default TouchRootContext;

//# sourceMappingURL=TouchContext.js.map