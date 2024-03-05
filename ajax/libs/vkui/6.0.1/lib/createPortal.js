import * as ReactDOM from 'react-dom';
import { getDocumentBody } from './dom';
export const createPortal = (children, container, key)=>{
    const resolvedContainer = container ? container : getDocumentBody();
    return resolvedContainer && ReactDOM.createPortal(children, resolvedContainer, key);
};

//# sourceMappingURL=createPortal.js.map