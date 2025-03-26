/** @jsx jsx */
import { JSX, Ref } from 'react';
import { jsx } from '@emotion/react';
export default function DummyInput({ innerRef, ...props }: JSX.IntrinsicElements['input'] & {
    readonly innerRef: Ref<HTMLInputElement>;
}): jsx.JSX.Element;
