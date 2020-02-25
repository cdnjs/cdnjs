import { setMode } from '@stencil/core';
setMode((el) => el.tagName === 'ION-ICON' ? el.mode || el.getAttribute('mode') : null);
