// @flow

export const KEY_CODE = {
  BACKSPACE: 8,
  ENTER: 13,
  SPACE: 32,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
}

export const ARROW_KEY_CODES = Object.values(KEY_CODE)

export const EVENT_NAME = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  CHANGE: 'change',

  GRID: {
    REMOTE_ACTIVE: 'grid.remote-active',
    REMOTE_INACTIVE: 'grid.remote-inactive',
  },
}

export type EventName =
  | 'active'
  | 'inactive'
  | 'change'
  | 'grid.remote-active'
  | 'grid.remote-inactive'
