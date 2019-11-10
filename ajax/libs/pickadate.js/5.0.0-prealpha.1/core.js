// @flow

import type { DatePickerCoreApi } from 'pickadate/types'
import type { DatePickerState } from 'pickadate/types'
import type { EventName } from 'pickadate/constants'
import * as dateUtil from 'pickadate/utils/dateUtil'
import { EVENT_NAME } from 'pickadate/constants'
import createDateStore from 'pickadate/createDateStore'

type DatePickerOptions = $Shape<{
  initialState: $Shape<DatePickerState>,
}>

const create = ({
  initialState,
}: DatePickerOptions = {}): DatePickerCoreApi => {
  const dateStore = createDateStore(initialState)

  const getValue = () => {
    const { selected, template, templateHookWords } = dateStore.getState()
    return selected
      ? dateUtil.format(selected, template, templateHookWords)
      : ''
  }

  const subscribeToValue = listener =>
    dateStore.subscribe(() => {
      const formattedValue = getValue()
      listener(formattedValue)
    })

  const listenersMap = {}
  const addEventListener = (eventName, listener) => {
    listenersMap[eventName] = listenersMap[eventName] || []
    listenersMap[eventName].push(listener)
    return () => {
      const listeners = listenersMap[eventName] || []
      const indexOfListener = listeners.indexOf(listener)
      if (indexOfListener > -1) {
        listeners.splice(indexOfListener, 1)
      }
    }
  }
  const triggerEvent = (eventName: EventName) => {
    const listeners = listenersMap[eventName] || []
    listeners.forEach(listener => listener())
  }

  dateStore.subscribe(() => triggerEvent(EVENT_NAME.CHANGE))

  return {
    store: dateStore,
    getValue,
    subscribeToValue,
    addEventListener,
    triggerEvent,
  }
}

export default {
  create,
}
