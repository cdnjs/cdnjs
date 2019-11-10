// @flow

import type { Store } from 'pickadate/types'
import raf from 'raf'
import * as jsUtil from 'pickadate/utils/jsUtil'

export default function createStore(initialState: Object): Store<*> {
  let state = initialState

  const addActor = (actor: Function) => {
    return payload => {
      /* istanbul ignore next */
      if (process.env.NODE_ENV === 'development') {
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
    if (state === nextState) {
      return
    }
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
