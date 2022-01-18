import * as React from 'react';
/**
 * Контекст для компонентов, использующих Touch в качестве корневой обёртки,
 * и для которых важно не предотвращать вспылие тач-событий от дочерних компонентов
 */

var TouchRootContext = /*#__PURE__*/React.createContext(false);
export default TouchRootContext;
//# sourceMappingURL=TouchContext.js.map