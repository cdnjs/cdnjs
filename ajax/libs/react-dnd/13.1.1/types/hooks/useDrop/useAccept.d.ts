import { DragObjectWithType, DropTargetHookSpec } from '../types';
export declare function useAccept<O extends DragObjectWithType, R, P>(spec: DropTargetHookSpec<O, R, P>): (string | symbol)[];
