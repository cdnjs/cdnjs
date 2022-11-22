// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { allComponents } from './custom-elements';
import { provideVSCodeDesignSystem } from './vscode-design-system';
export * from './index';
/**
 * The global VSCode Design System.
 * @remarks
 * Only available if the components are added through a script tag
 * rather than a module/build system.
 */
export const VSCodeDesignSystem = provideVSCodeDesignSystem().register(allComponents);
