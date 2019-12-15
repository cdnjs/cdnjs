// @flow

import type { DatePickerStore, DatePickerState } from './types'

import * as calendarUtil from './utils/calendarUtil'
import * as jsUtil from './utils/jsUtil'
import createStore from './createStore'
import setSelectedActor from './actors/setSelectedActor'
import setHighlightedActor from './actors/setHighlightedActor'
import setMinimumActor from './actors/setMinimumActor'
import setMaximumActor from './actors/setMaximumActor'
import setTimeActor from './actors/setTimeActor'
import setFirstDayOfWeekActor from './actors/setFirstDayOfWeekActor'
import clearActor from './actors/clearActor'
import viewPreviousActor from './actors/viewPreviousActor'
import viewNextActor from './actors/viewNextActor'
import viewTodayActor from './actors/viewTodayActor'
import cycleHourUpActor from './actors/cycleHourUpActor'
import cycleHourDownActor from './actors/cycleHourDownActor'
import cycleMinuteUpActor from './actors/cycleMinuteUpActor'
import cycleMinuteDownActor from './actors/cycleMinuteDownActor'
import cycleMeridiemActor from './actors/cycleMeridiemActor'

export default function createDateStore(
  partialInitialState: $Shape<DatePickerState> = {}
): DatePickerStore {
  const view = calendarUtil.getStartDateOfMonth(new Date())
  const initialState: DatePickerState = {
    firstDayOfWeek: 0,
    selected: null,
    highlighted: view,
    view,
    minimum: null,
    maximum: null,
    disabled: [],
    ...jsUtil.copyDefinedValues(partialInitialState),
  }

  const store = createStore(initialState)
  return {
    ...store,
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
