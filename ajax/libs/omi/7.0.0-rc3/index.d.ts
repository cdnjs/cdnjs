import { cloneElement, createElement, createElement as h } from './vdom';
import { Component } from './component';
import { render } from './render';
import { define, tag } from './define';
import { classNames, extractClass } from './class';
import { createRef } from './utils';
declare const WeElement: typeof Component;
declare const defineElement: typeof define;
declare global {
    interface Window {
        Omi: any;
        omi: any;
    }
}
export { tag, Component, WeElement, render, h, createElement, define, cloneElement, defineElement, classNames, extractClass, createRef };
