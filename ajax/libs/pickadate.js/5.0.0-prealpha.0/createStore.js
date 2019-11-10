// @flow

import type { Store } from './types'
import raf from 'raf'
import * as jsUtil from './utils/jsUtil'

export default function createStore(initialState: Object): Store<*> {
  let state = initialState

  const addActor = (actor: Function) => {
    return payload => {
      if (process.env.NODE_ENV !== 'production') {
        console.log(
          'Updating state using %o and payload %o',
          actor.name,
          payload
        )
      }
      const nextPartialState = actor(state, payload)
      const nextState = nextPartialState
        ? { ...state, ...jsUtil.copyDefinedValues(nextPartialState) }
        : state
      notify(nextState)
    }
  }

  let animationFrameId = null
  const listeners = []

  const notify = nextState => {
    state = nextState
    if (animationFrameId) {
      raf.cancel(animationFrameId)
    }
    animationFrameId = raf(() => listeners.forEach(listener => listener()))
  }

  const subscribe = (listener: Function) => {
    listeners.push(listener)
    return () => {
      const indexOfListener = listeners.indexOf(listener)
      if (indexOfListener > -1) {
        listeners.splice(indexOfListener, 1)
      }
    }
  }

  return {
    addActor,
    subscribe,
    getState: () => state,
  }
}
