// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { DesignSystem } from '@microsoft/fast-foundation';
/**
 * Provides a design system for the specified element either by returning one that was
 * already created for that element or creating one.
 * @param element - The element to root the design system at. By default, this is the body.
 * @returns A VSCode Design System
 * @public
 */
export function provideVSCodeDesignSystem(element) {
    return DesignSystem.getOrCreate(element).withPrefix('vscode');
}
