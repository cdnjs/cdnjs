// @flow

import type { DatePickerStore, DatePickerState } from 'pickadate/types'

import { TEMPLATE_HOOK_WORDS } from 'pickadate/defaults'
import * as calendarUtil from 'pickadate/utils/calendarUtil'
import * as jsUtil from 'pickadate/utils/jsUtil'
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
    template: 'DDD, MMMM DD, YYYY @ h:mm a',
    templateHookWords: TEMPLATE_HOOK_WORDS,
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
