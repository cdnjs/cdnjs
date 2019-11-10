// @flow

import type { DatePickerState, DatePickerCoreApi } from 'pickadate/types'
import type { EventName } from 'pickadate/constants'
import * as dateUtil from 'pickadate/utils/dateUtil'
import * as jsUtil from 'pickadate/utils/jsUtil'
import * as calendarUtil from 'pickadate/utils/calendarUtil'
import { EVENT_NAME } from 'pickadate/constants'
import { TEMPLATE_HOOK_WORDS } from 'pickadate/defaults'
import createStore from 'pickadate/createStore'
import setSelectedActor from 'pickadate/actors/setSelectedActor'
import setHighlightedActor from 'pickadate/actors/setHighlightedActor'
import setMinimumActor from 'pickadate/actors/setMinimumActor'
import setMaximumActor from 'pickadate/actors/setMaximumActor'
import setTimeActor from 'pickadate/actors/setTimeActor'
import setFirstDayOfWeekActor from 'pickadate/actors/setFirstDayOfWeekActor'
import clearActor from 'pickadate/actors/clearActor'
import viewPreviousActor from 'pickadate/actors/viewPreviousActor'
import viewNextActor from 'pickadate/actors/viewNextActor'
import viewTodayActor from 'pickadate/actors/viewTodayActor'
import cycleHourUpActor from 'pickadate/actors/cycleHourUpActor'
import cycleHourDownActor from 'pickadate/actors/cycleHourDownActor'
import cycleMinuteUpActor from 'pickadate/actors/cycleMinuteUpActor'
import cycleMinuteDownActor from 'pickadate/actors/cycleMinuteDownActor'
import cycleMeridiemActor from 'pickadate/actors/cycleMeridiemActor'

const getInitialState = partialInitialState => {
  const view = calendarUtil.getStartDateOfMonth(new Date())
  return {
    firstDayOfWeek: 0,
    selected: null,
    highlighted: view,
    view,
    minimum: null,
    maximum: null,
    disabled: [],
    template: 'DDD, MMMM DD, YYYY @ h:mm a',
    templateHookWords: TEMPLATE_HOOK_WORDS,
    ...jsUtil.copyDefinedValues(partialInitialState),
  }
}

const createGetValue = store => () => {
  const { selected, template, templateHookWords } = store.getState()
  return selected ? dateUtil.format(selected, template, templateHookWords) : ''
}

const createEventNamespace = () => {
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

  return [addEventListener, triggerEvent]
}

type PartialInitialState = $Shape<DatePickerState>

export default function createPicker(
  partialInitialState: PartialInitialState = {}
): DatePickerCoreApi {
  const initialState: DatePickerState = getInitialState(partialInitialState)
  const store = createStore(initialState)

  const getValue = createGetValue(store)
  const subscribeToValue = listener =>
    store.subscribe(() => {
      const formattedValue = getValue()
      listener(formattedValue)
    })

  const [addEventListener, triggerEvent] = createEventNamespace()
  store.subscribe(() => triggerEvent(EVENT_NAME.CHANGE))

  return {
    store,
    getValue,
    subscribeToValue,
    addEventListener,
    triggerEvent,
    setFirstDayOfWeek: store.addActor(setFirstDayOfWeekActor),
    setSelected: store.addActor(setSelectedActor),
    setHighlighted: store.addActor(setHighlightedActor),
    setMinimum: store.addActor(setMinimumActor),
    setMaximum: store.addActor(setMaximumActor),
    setTime: store.addActor(setTimeActor),
    clear: store.addActor(clearActor),
    viewPrevious: store.addActor(viewPreviousActor),
    viewNext: store.addActor(viewNextActor),
    viewToday: store.addActor(viewTodayActor),
    cycleHourUp: store.addActor(cycleHourUpActor),
    cycleHourDown: store.addActor(cycleHourDownActor),
    cycleMinuteUp: store.addActor(cycleMinuteUpActor),
    cycleMinuteDown: store.addActor(cycleMinuteDownActor),
    cycleMeridiem: store.addActor(cycleMeridiemActor),
  }
}
