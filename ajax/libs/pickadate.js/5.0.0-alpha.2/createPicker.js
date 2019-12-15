// @flow

import type {
  DatePickerState,
  DatePickerCoreApi,
  TranslationShape,
} from 'pickadate/types'
import * as dateUtil from 'pickadate/utils/dateUtil'
import * as jsUtil from 'pickadate/utils/jsUtil'
import * as calendarUtil from 'pickadate/utils/calendarUtil'
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

const getTranslatedPartialState = (
  partialState,
  partialTranslation
): $Shape<DatePickerState> => {
  if (!partialTranslation) {
    return partialState
  }
  return {
    ...partialState,

    firstDayOfWeek:
      partialTranslation.firstDayOfWeek != null
        ? partialTranslation.firstDayOfWeek
        : partialState.firstDayOfWeek,

    template:
      partialTranslation.template != null
        ? partialTranslation.template
        : partialState.template,

    templateHookWords: {
      ...partialTranslation.templateHookWords,
      ...partialState.templateHookWords,
    },
  }
}

const getInitialState = partialState => {
  const view = calendarUtil.getStartDateOfMonth(new Date())
  return jsUtil.mergeUpdates<DatePickerState>(
    {
      firstDayOfWeek: 0,
      selected: null,
      highlighted: view,
      view,
      minimum: null,
      maximum: null,
      disabled: [],
      template: 'D MMMM, YYYY @ h:mm a',
      templateHookWords: TEMPLATE_HOOK_WORDS,
    },
    jsUtil.copyDefinedValues(partialState)
  )
}

const createGetValue = store => () => {
  const { selected, template, templateHookWords } = store.getState()
  return selected ? dateUtil.format(selected, template, templateHookWords) : ''
}

export default function createPicker(
  partialState: $Shape<DatePickerState> = {},
  partialTranslation: ?TranslationShape
): DatePickerCoreApi {
  const initialState: DatePickerState = getInitialState(
    getTranslatedPartialState(partialState, partialTranslation)
  )
  const store = createStore(initialState)

  const getValue = createGetValue(store)

  let currentValue = getValue()
  const subscribeToValue = listener =>
    store.subscribe(() => {
      const formattedValue = getValue()
      if (formattedValue !== currentValue) {
        listener(formattedValue)
        currentValue = formattedValue
      }
    })

  return {
    store,
    getValue,
    subscribeToValue,
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
