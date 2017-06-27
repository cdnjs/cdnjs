/*

notie - a clean and simple notification suite for javascript, with no dependencies

Copyright (c) 2016 Jared Reich

Licensed under the MIT license:
http://www.opensource.org/licenses/mit-license.php

Project demo:
https://jaredreich.com/projects/notie

*/

var notie = function () {
	// Default options
  var options = {
    colorSuccess: '',
    colorWarning: '',
    colorError: '',
    colorInfo: '',
    colorNeutral: '',
    colorText: '',
    dateMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    animationDelay: 300,
    backgroundClickDismiss: true
  }
  function setOptions (customOptions) {
    // Custom options
    for (var key in customOptions) {
      options[key] = customOptions[key]
    }
  }

	// alert
  // **************

	// create alert container
  var alertOuter = document.createElement('div')
  alertOuter.id = 'notie-alert-outer'

	// Hide alert on click
  alertOuter.onclick = function () {
    alertHide()
  }

  // add alert to body
  document.body.appendChild(alertOuter)

	// create alert inner container
  var alertInner = document.createElement('div')
  alertInner.id = 'notie-alert-inner'
  alertOuter.appendChild(alertInner)

	// create alert content container
  var alertContent = document.createElement('div')
  alertContent.id = 'notie-alert-content'
  alertInner.appendChild(alertContent)

  // Initialize alert text
  var alertText = document.createElement('span')
  alertText.id = 'notie-alert-text'
  alertContent.appendChild(alertText)

  // alert helper variables
  var alertIsShowing = false
  var alertTimeout1
  var alertTimeout2
  var wasClickedCounter = 0

  function alert (type, message, seconds) {
    if (options.colorText.length > 0) alertText.style.color = options.colorText

    blur()

    wasClickedCounter++

    setTimeout(function () {
      wasClickedCounter--
    }, (options.animationDelay + 10))

    if (wasClickedCounter === 1) {
      if (alertIsShowing) {
        alertHide(function () {
          alertShow(type, message, seconds)
        })
      } else {
        alertShow(type, message, seconds)
      }
    }
  }

  function alertShow (type, message, seconds) {
    alertIsShowing = true

    var duration = 0
    if (typeof seconds === 'undefined' || seconds === 0) {
      duration = 86400000
    } else if (seconds > 0 && seconds < 1) {
      duration = 1000
    } else {
      duration = seconds * 1000
    }

    // Remove all color classes first
    removeClass(alertOuter, 'notie-background-success')
    removeClass(alertOuter, 'notie-background-warning')
    removeClass(alertOuter, 'notie-background-error')
    removeClass(alertOuter, 'notie-background-info')

    // Set notie type (background color)
    switch (type) {
      case 1:
      case 'success':
        if (options.colorSuccess.length > 0) alertOuter.style.backgroundColor = options.colorSuccess
        else addClass(alertOuter, 'notie-background-success')
        break
      case 2:
      case 'warning':
        if (options.colorWarning.length > 0) alertOuter.style.backgroundColor = options.colorWarning
        else addClass(alertOuter, 'notie-background-warning')
        break
      case 3:
      case 'error':
        if (options.colorError.length > 0) alertOuter.style.backgroundColor = options.colorError
        else addClass(alertOuter, 'notie-background-error')
        break
      case 4:
      case 'info':
        if (options.colorInfo.length > 0) alertOuter.style.backgroundColor = options.colorInfo
        else addClass(alertOuter, 'notie-background-info')
        break
    }

    // Set notie text
    alertText.innerHTML = message

    alertOuter.style.top = '-10000px'
    alertOuter.style.display = 'table'
    alertOuter.style.top = '-' + alertOuter.offsetHeight - 5 + 'px'

    alertTimeout1 = setTimeout(function () {
      addClass(alertOuter, 'notie-transition')

      alertOuter.style.top = 0

      alertTimeout2 = setTimeout(function () {
        alertHide(function () {
          // Nothing
        })
      }, duration)
    }, 20)
  }

  function alertHide (callback) {
    clearTimeout(alertTimeout1)
    clearTimeout(alertTimeout2)

    alertOuter.style.top = '-' + alertOuter.offsetHeight - 5 + 'px'

    setTimeout(function () {
      removeClass(alertOuter, 'notie-transition')

      alertOuter.style.top = '-10000px'

      alertIsShowing = false

      if (callback) callback()
    }, (options.animationDelay + 10))
  }

  // force
  // **************

  var forceOuter = document.createElement('div')
  forceOuter.id = 'notie-force-outer'

  var forceInner = document.createElement('div')
  forceInner.id = 'notie-force-inner'
  forceOuter.appendChild(forceInner)

  var forceText = document.createElement('span')
  forceText.id = 'notie-force-text'
  forceInner.appendChild(forceText)

  var forceButton = document.createElement('div')
  forceButton.id = 'notie-force-button'
  forceOuter.appendChild(forceButton)

  var forceBackground = document.createElement('div')
  forceBackground.id = 'notie-force-background'
  addClass(forceBackground, 'notie-transition')

  // Attach force elements to the body element
  document.body.appendChild(forceOuter)
  document.body.appendChild(forceBackground)

	// force helper variables
  var forceIsShowing = false

  function force (type, message, buttonText, callback) {
    if (options.colorText.length > 0) {
      forceText.style.color = options.colorText
      forceButton.style.color = options.colorText
    }

    blur()

    if (alertIsShowing) {
    // Hide notie.alert
      alertHide(function () {
        forceShow(type, message, buttonText, callback)
      })
    } else {
      forceShow(type, message, buttonText, callback)
    }
  }

  function forceShow (type, message, buttonText, callback) {
    scrollDisable()

    // Callback function
    forceButton.onclick = function () {
      forceHide()
      if (callback) {
        setTimeout(function () {
          callback()
        }, (options.animationDelay + 10))
      }
    }

    // Remove all color classes first
    removeClass(forceOuter, 'notie-background-success')
    removeClass(forceOuter, 'notie-background-warning')
    removeClass(forceOuter, 'notie-background-error')
    removeClass(forceOuter, 'notie-background-info')

    // Set notie type (background color)
    switch (type) {
      case 1:
      case 'success':
        if (options.colorSuccess.length > 0) forceOuter.style.backgroundColor = options.colorSuccess
        else addClass(forceOuter, 'notie-background-success')
        break
      case 2:
      case 'warning':
        if (options.colorWarning.length > 0) forceOuter.style.backgroundColor = options.colorWarning
        else addClass(forceOuter, 'notie-background-warning')
        break
      case 3:
      case 'error':
        if (options.colorError.length > 0) forceOuter.style.backgroundColor = options.colorError
        else addClass(forceOuter, 'notie-background-error')
        break
      case 4:
      case 'info':
        if (options.colorInfo.length > 0) forceOuter.style.backgroundColor = options.colorInfo
        else addClass(forceOuter, 'notie-background-info')
        break
    }

    function forceShowInner () {
      // Set force text
      forceText.innerHTML = message
      forceButton.innerHTML = buttonText

      // Get force's height
      forceOuter.style.top = '-10000px'
      forceOuter.style.display = 'table'
      forceOuter.style.top = '-' + forceOuter.offsetHeight - 5 + 'px'
      forceBackground.style.display = 'block'

      setTimeout(function () {
        addClass(forceOuter, 'notie-transition')

        forceOuter.style.top = 0
        forceBackground.style.opacity = '0.75'

        setTimeout(function () {
          forceIsShowing = true
        }, (options.animationDelay + 10))
      }, 20)
    }

    if (forceIsShowing) {
      forceHide()
      setTimeout(function () {
        forceShowInner()
      }, (options.animationDelay + 10))
    } else {
      forceShowInner()
    }
  }

  function forceHide () {
    forceOuter.style.top = '-' + forceOuter.offsetHeight - 5 + 'px'
    forceBackground.style.opacity = '0'

    setTimeout(function () {
      removeClass(forceOuter, 'notie-transition')
      forceOuter.style.top = '-10000px'
      forceBackground.style.display = 'none'

      scrollEnable()

      forceIsShowing = false
    }, (options.animationDelay + 10))
  }

  // confirm
  // **************

  var confirmOuter = document.createElement('div')
  confirmOuter.id = 'notie-confirm-outer'

  var confirmInner = document.createElement('div')
  confirmInner.id = 'notie-confirm-inner'
  confirmOuter.appendChild(confirmInner)

  var confirmText = document.createElement('span')
  confirmText.id = 'notie-confirm-text'
  confirmInner.appendChild(confirmText)

  var confirmYes = document.createElement('div')
  confirmYes.id = 'notie-confirm-yes'
  confirmOuter.appendChild(confirmYes)

  var confirmNo = document.createElement('div')
  confirmNo.id = 'notie-confirm-no'
  confirmOuter.appendChild(confirmNo)

  var confirmTextYes = document.createElement('span')
  confirmTextYes.id = 'notie-confirm-text-yes'
  confirmYes.appendChild(confirmTextYes)

  var confirmTextNo = document.createElement('span')
  confirmTextNo.id = 'notie-confirm-text-no'
  confirmNo.appendChild(confirmTextNo)

  var confirmBackground = document.createElement('div')
  confirmBackground.id = 'notie-confirm-background'
  addClass(confirmBackground, 'notie-transition')

  // Hide notie.confirm on no click and background click
  confirmBackground.onclick = function () {
    if (options.backgroundClickDismiss) {
      confirmHide()
    }
  }

  // Attach confirm elements to the body element
  document.body.appendChild(confirmOuter)
  document.body.appendChild(confirmBackground)

	// confirm helper variables
  var confirmIsShowing = false

  function confirm (title, yesText, noText, yesCallback, noCallback) {
    if (options.colorInfo.length > 0) confirmInner.style.backgroundColor = options.colorInfo
    if (options.colorSuccess.length > 0) confirmYes.style.backgroundColor = options.colorSuccess
    if (options.colorError.length > 0) confirmNo.style.backgroundColor = options.colorError
    if (options.colorText.length > 0) {
      confirmText.style.color = options.colorText
      confirmTextYes.style.color = options.colorText
      confirmTextNo.style.color = options.colorText
    }

    blur()

    if (alertIsShowing) {
    // Hide notie.alert
      alertHide(function () {
        confirmShow(title, yesText, noText, yesCallback, noCallback)
      })
    } else {
      confirmShow(title, yesText, noText, yesCallback, noCallback)
    }
  }

  function confirmShow (title, yesText, noText, yesCallback, noCallback) {
    scrollDisable()

    // Yes callback function
    confirmYes.onclick = function () {
      confirmHide()
      if (yesCallback) {
        setTimeout(function () {
          yesCallback()
        }, (options.animationDelay + 10))
      }
    }

    // No callback function
    confirmNo.onclick = function () {
      confirmHide()
      if (noCallback) {
        setTimeout(function () {
          noCallback()
        }, (options.animationDelay + 10))
      }
    }

    function confirmShowInner () {
      // Set confirm text
      confirmText.innerHTML = title
      confirmTextYes.innerHTML = yesText
      confirmTextNo.innerHTML = noText

      // Get confirm's height
      confirmOuter.style.top = '-10000px'
      confirmOuter.style.display = 'table'
      confirmOuter.style.top = '-' + confirmOuter.offsetHeight - 5 + 'px'
      confirmBackground.style.display = 'block'

      setTimeout(function () {
        addClass(confirmOuter, 'notie-transition')

        confirmOuter.style.top = 0
        confirmBackground.style.opacity = '0.75'

        setTimeout(function () {
          confirmIsShowing = true
        }, (options.animationDelay + 10))
      }, 20)
    }

    if (confirmIsShowing) {
      confirmHide()
      setTimeout(function () {
        confirmShowInner()
      }, (options.animationDelay + 10))
    } else {
      confirmShowInner()
    }
  }

  function confirmHide () {
    confirmOuter.style.top = '-' + confirmOuter.offsetHeight - 5 + 'px'
    confirmBackground.style.opacity = '0'

    setTimeout(function () {
      removeClass(confirmOuter, 'notie-transition')
      confirmOuter.style.top = '-10000px'
      confirmBackground.style.display = 'none'

      scrollEnable()

      confirmIsShowing = false
    }, (options.animationDelay + 10))
  }

  // input
  // **********

  var inputOuter = document.createElement('div')
  inputOuter.id = 'notie-input-outer'

  var inputBackground = document.createElement('div')
  inputBackground.id = 'notie-input-background'
  addClass(inputBackground, 'notie-transition')

  var inputInner = document.createElement('div')
  inputInner.id = 'notie-input-inner'
  inputOuter.appendChild(inputInner)

  var inputField = document.createElement('input')
  inputField.id = 'notie-input-field'
  inputOuter.appendChild(inputField)

  var inputYes = document.createElement('div')
  inputYes.id = 'notie-input-yes'
  inputOuter.appendChild(inputYes)

  var inputNo = document.createElement('div')
  inputNo.id = 'notie-input-no'
  inputOuter.appendChild(inputNo)

  var inputText = document.createElement('span')
  inputText.id = 'notie-input-text'
  inputInner.appendChild(inputText)

  var inputTextYes = document.createElement('span')
  inputTextYes.id = 'notie-input-text-yes'
  inputYes.appendChild(inputTextYes)

  var inputTextNo = document.createElement('span')
  inputTextNo.id = 'notie-input-text-no'
  inputNo.appendChild(inputTextNo)

  // Attach input elements to the body element
  document.body.appendChild(inputOuter)
  document.body.appendChild(inputBackground)

  // Hide input on no click and background click
  inputBackground.onclick = function () {
    if (options.backgroundClickDismiss) {
      inputHide()
    }
  }

  // input helper variables
  var inputIsShowing = false

  function input (settings, title, submitText, cancelText, submitCallback, cancelCallback) {
    if (options.colorInfo.length > 0) inputInner.style.backgroundColor = options.colorInfo
    if (options.colorSuccess.length > 0) inputYes.style.backgroundColor = options.colorSuccess
    if (options.colorError.length > 0) inputNo.style.backgroundColor = options.colorError
    if (options.colorText.length > 0) {
      inputText.style.color = options.colorText
      inputTextYes.style.color = options.colorText
      inputTextNo.style.color = options.colorText
    }

    blur()

    inputField.setAttribute('autocapitalize', settings.autocapitalize || 'none')
    inputField.setAttribute('autocomplete', settings.autocomplete || 'off')
    inputField.setAttribute('autocorrect', settings.autocorrect || 'off')
    inputField.setAttribute('autofocus', settings.autofocus || 'true')
    inputField.setAttribute('inputmode', settings.inputmode || 'verbatim')
    inputField.setAttribute('max', settings.max || '')
    inputField.setAttribute('maxlength', settings.maxlength || '')
    inputField.setAttribute('min', settings.min || '')
    inputField.setAttribute('minlength', settings.minlength || '')
    inputField.setAttribute('placeholder', settings.placeholder || '')
    inputField.setAttribute('spellcheck', settings.spellcheck || 'default')
    inputField.setAttribute('step', settings.step || 'any')
    inputField.setAttribute('type', settings.type || 'text')

    inputField.value = settings.prefilledValue || ''

    // As-you-type input restrictions
    if (settings.allowed) {
      inputField.oninput = function () {
        if (Array.isArray(settings.allowed)) {
          var regexString = ''
          var allowed = settings.allowed
          for (var i = 0; i < allowed.length; i++) {
            if (allowed[i] === 'an') {
              regexString += '0-9a-zA-Z'
            } else if (allowed[i] === 'a') {
              regexString += 'a-zA-Z'
            } else if (allowed[i] === 'n') {
              regexString += '0-9'
            }
            if (allowed[i] === 'sp') {
              regexString += ' '
            }
          }
          var regex = new RegExp('[^' + regexString + ']', 'g')
        } else if (typeof settings.allowed === 'object') {
          regex = settings.allowed
        }
        inputField.value = inputField.value.replace(regex, '')
      }
    } else {
      inputField.oninput = function () {
        return true
      }
    }

    if (alertIsShowing) {
      // Hide alert
      alertHide(function () {
        inputShow(title, submitText, cancelText, submitCallback, cancelCallback)
      })
    } else {
      inputShow(title, submitText, cancelText, submitCallback, cancelCallback)
    }
  }

  function inputShow (title, submitText, cancelText, submitCallback, cancelCallback) {
    scrollDisable()

    // Yes callback function
    inputYes.onclick = function () {
      inputHide()
      if (submitCallback) {
        setTimeout(function () {
          submitCallback(inputField.value)
        }, (options.animationDelay + 10))
      }
    }

    // No callback function
    inputNo.onclick = function () {
      inputHide()
      if (cancelCallback) {
        setTimeout(function () {
          cancelCallback(inputField.value)
        }, (options.animationDelay + 10))
      }
    }

    function inputShowInner () {
      // Set input text
      inputText.innerHTML = title
      inputTextYes.innerHTML = submitText
      inputTextNo.innerHTML = cancelText

      // Get input's height
      inputOuter.style.top = '-10000px'
      inputOuter.style.display = 'table'
      inputOuter.style.top = '-' + inputOuter.offsetHeight - 5 + 'px'
      inputBackground.style.display = 'block'

      setTimeout(function () {
        addClass(inputOuter, 'notie-transition')

        inputOuter.style.top = 0
        inputBackground.style.opacity = '0.75'

        setTimeout(function () {
          inputIsShowing = true

          // put focus on input field
          inputField.focus()
        }, (options.animationDelay + 10))
      }, 20)
    }

    if (inputIsShowing) {
      inputHide()
      setTimeout(function () {
        inputShowInner()
      }, (options.animationDelay + 10))
    } else {
      inputShowInner()
    }
  }

  function inputHide () {
    inputOuter.style.top = '-' + inputOuter.offsetHeight - 5 + 'px'
    inputBackground.style.opacity = '0'

    setTimeout(function () {
      removeClass(inputOuter, 'notie-transition')
      inputBackground.style.display = 'none'

      inputOuter.style.top = '-10000px'

      scrollEnable()

      inputIsShowing = false
    }, (options.animationDelay + 10))
  }

  // select
  // **************

  var selectOuter = document.createElement('div')
  selectOuter.id = 'notie-select-outer'

  var selectInner = document.createElement('div')
  selectInner.id = 'notie-select-inner'
  selectOuter.appendChild(selectInner)

  var selectText = document.createElement('span')
  selectText.id = 'notie-select-text'
  selectInner.appendChild(selectText)

  var selectBackground = document.createElement('div')
  selectBackground.id = 'notie-select-background'
  addClass(selectBackground, 'notie-transition')

  var selectChoices = document.createElement('div')
  selectChoices.id = 'notie-select-choices'
  selectOuter.appendChild(selectChoices)

  var selectCancel = document.createElement('div')
  selectCancel.id = 'notie-select-cancel'
  selectOuter.appendChild(selectCancel)

  // Attach select elements to the body element
  document.body.appendChild(selectOuter)
  document.body.appendChild(selectBackground)

  // Hide input on no click and background click
  selectBackground.onclick = function () {
    if (options.backgroundClickDismiss) {
      selectHide()
    }
  }

  selectCancel.onclick = function () {
    selectHide()
  }

  // select helper variables
  var selectIsShowing = false

  function select (title, cancelText, choices) {
    if (options.colorInfo.length > 0) selectInner.style.backgroundColor = options.colorInfo
    if (options.colorNeutral.length > 0) selectCancel.style.backgroundColor = options.colorNeutral
    if (options.colorText.length > 0) {
      selectText.style.color = options.colorText
      selectCancel.style.color = options.colorText
    }

    blur()

    if (alertIsShowing) {
      // Hide notie.alert
      alertHide(function () {
        selectShow(title, cancelText, choices)
      })
    } else {
      selectShow(title, cancelText, choices)
    }
  }

  function selectShow (title, cancelText, choices) {
    scrollDisable()

    document.getElementById('notie-select-choices').innerHTML = ''
    selectCancel.innerHTML = cancelText

    var selectChoicePrevious

    for (var i = 0; i < choices.length; i++) {
      var selectChoice = document.createElement('div')
      selectChoice.innerHTML = choices[i].title
      addClass(selectChoice, 'notie-select-choice')
      selectChoices.appendChild(selectChoice)
      if (options.colorText.length > 0) selectChoice.style.color = options.colorText

      if (choices[i].type) {
        switch (choices[i].type) {
          case 1:
            if (options.colorSuccess.length > 0) selectChoice.style.backgroundColor = options.colorSuccess
            else addClass(selectChoice, 'notie-background-success')
            break
          case 2:
            if (options.colorWarning.length > 0) selectChoice.style.backgroundColor = options.colorWarning
            else addClass(selectChoice, 'notie-background-warning')
            break
          case 3:
            if (options.colorError.length > 0) selectChoice.style.backgroundColor = options.colorError
            else addClass(selectChoice, 'notie-background-error')
            break
          case 4:
            if (options.colorInfo.length > 0) selectChoice.style.backgroundColor = options.colorInfo
            else addClass(selectChoice, 'notie-background-info')
            break
        }
      } else if (choices[i].color) {
        selectChoice.style.backgroundColor = choices[i].color
      }

      selectChoice.style.backgroundColor = window.getComputedStyle(selectChoice).backgroundColor
      if (i > 0 && selectChoice.style.backgroundColor === selectChoicePrevious.style.backgroundColor) {
        addClass(selectChoicePrevious, 'notie-select-choice-bottom-border')
      }

      // onclick for this choice
      if (choices[i].handler) {
        selectChoice.onclick = (function (i) {
          return function () {
            selectHide()
            setTimeout(function () {
              choices[i].handler()
            }, (options.animationDelay + 10))
          }
        })(i)
      } else {
        throw new Error('notie.select choice "' + selectChoice.title + '" must have a handler')
      }

      selectChoicePrevious = selectChoice
    }

    function selectShowInner (title) {
      // Set select text
      selectText.innerHTML = title

      // Get select's height
      selectOuter.style.bottom = '-10000px'
      selectOuter.style.display = 'table'
      selectOuter.style.bottom = '-' + selectOuter.offsetHeight - 5 + 'px'
      selectBackground.style.display = 'block'

      setTimeout(function () {
        addClass(selectOuter, 'notie-transition')

        selectOuter.style.bottom = 0
        selectBackground.style.opacity = '0.75'

        setTimeout(function () {
          selectIsShowing = true
        }, (options.animationDelay + 10))
      }, 20)
    }

    if (selectIsShowing) {
      selectHide()
      setTimeout(function () {
        selectShowInner(title)
      }, (options.animationDelay + 10))
    } else {
      selectShowInner(title)
    }
  }

  function selectHide () {
    selectOuter.style.bottom = '-' + selectOuter.offsetHeight - 5 + 'px'
    selectBackground.style.opacity = '0'

    setTimeout(function () {
      removeClass(selectOuter, 'notie-transition')
      selectOuter.style.bottom = '-10000px'
      selectBackground.style.display = 'none'

      scrollEnable()

      selectIsShowing = false
    }, (options.animationDelay + 10))
  }

  function isShowing () {
    return alertIsShowing || confirmIsShowing || inputIsShowing || selectIsShowing || dateIsShowing
  }

  // date
  // **************
  var dateOuter = document.createElement('div')
  dateOuter.id = 'notie-date-outer'

  var dateSelector = document.createElement('div')
  dateSelector.id = 'notie-date-selector'
  dateOuter.appendChild(dateSelector)

  var dateInner = document.createElement('div')
  dateInner.id = 'notie-date-inner'
  dateOuter.appendChild(dateInner)

  var dateUpArrow = '<div class="notie-date-arrow-up"></div>'
  var dateDownArrow = '<div class="notie-date-arrow-down"></div>'

  var dateUpMonth = document.createElement('div')
  dateUpMonth.className = 'notie-date-up'
  dateUpMonth.innerHTML = dateUpArrow
  dateSelector.appendChild(dateUpMonth)
  dateUpMonth.onclick = dateUpMonthClick

  var dateUpDay = document.createElement('div')
  dateUpDay.className = 'notie-date-up'
  dateUpDay.innerHTML = dateUpArrow
  dateSelector.appendChild(dateUpDay)
  dateUpDay.onclick = dateUpDayClick

  var dateUpYear = document.createElement('div')
  dateUpYear.className = 'notie-date-up'
  dateUpYear.innerHTML = dateUpArrow
  dateSelector.appendChild(dateUpYear)
  dateUpYear.onclick = dateUpYearClick

  var dateMonth = document.createElement('div')
  dateMonth.className = 'notie-date-text'
  dateSelector.appendChild(dateMonth)

  var dateDay = document.createElement('div')
  dateDay.className = 'notie-date-text'
  dateSelector.appendChild(dateDay)

  var dateYear = document.createElement('div')
  dateYear.className = 'notie-date-text'
  dateSelector.appendChild(dateYear)

  var dateDownMonth = document.createElement('div')
  dateDownMonth.className = 'notie-date-down'
  dateDownMonth.innerHTML = dateDownArrow
  dateSelector.appendChild(dateDownMonth)
  dateDownMonth.onclick = dateDownMonthClick

  var dateDownDay = document.createElement('div')
  dateDownDay.className = 'notie-date-down'
  dateDownDay.innerHTML = dateDownArrow
  dateSelector.appendChild(dateDownDay)
  dateDownDay.onclick = dateDownDayClick

  var dateDownYear = document.createElement('div')
  dateDownYear.className = 'notie-date-down'
  dateDownYear.innerHTML = dateDownArrow
  dateSelector.appendChild(dateDownYear)
  dateDownYear.onclick = dateDownYearClick

  var dateYes = document.createElement('div')
  dateYes.id = 'notie-date-yes'
  dateInner.appendChild(dateYes)

  var dateNo = document.createElement('div')
  dateNo.id = 'notie-date-no'
  dateInner.appendChild(dateNo)

  var dateBackground = document.createElement('div')
  dateBackground.id = 'notie-date-background'
  addClass(dateBackground, 'notie-transition')

  // Hide notie.date on no click and background click
  dateBackground.onclick = function () {
    if (options.backgroundClickDismiss) {
      dateHide()
    }
  }

  // Attach date elements to the body element
  document.body.appendChild(dateOuter)
  document.body.appendChild(dateBackground)

	// date helper variables
  var dateIsShowing = false
  var dateSelected

  function date (dateOptions) {
    if (options.colorInfo.length > 0) {
      dateInner.style.backgroundColor = options.colorInfo
    }
    if (options.colorSuccess.length > 0) dateYes.style.backgroundColor = options.colorSuccess
    if (options.colorError.length > 0) dateNo.style.backgroundColor = options.colorError
    if (options.colorText.length > 0) dateInner.style.color = options.colorText

    blur()

    if (alertIsShowing) {
    // Hide notie.alert
      alertHide(function () {
        dateShow(dateOptions)
      })
    } else {
      dateShow(dateOptions)
    }
  }

  function dateShow (dateOptions) {
    scrollDisable()

    // Yes callback function
    dateYes.onclick = function () {
      dateHide()
      if (dateOptions.yesCallback) {
        setTimeout(function () {
          dateOptions.yesCallback(dateSelected)
        }, (options.animationDelay + 10))
      }
    }

    // No callback function
    dateNo.onclick = function () {
      dateHide()
      if (dateOptions.noCallback) {
        setTimeout(function () {
          dateOptions.noCallback(dateSelected)
        }, (options.animationDelay + 10))
      }
    }

    function dateShowInner () {
      dateSelected = dateOptions.initial || new Date()
      dateSet(dateSelected)
      dateYes.innerHTML = dateOptions.yesText || 'OK'
      dateNo.innerHTML = dateOptions.noText || 'Cancel'

      // Get dates's height
      dateOuter.style.top = '-10000px'
      dateOuter.style.display = 'table'
      dateOuter.style.top = '-' + dateOuter.offsetHeight - 5 + 'px'
      dateBackground.style.display = 'block'

      setTimeout(function () {
        addClass(dateOuter, 'notie-transition')

        dateOuter.style.top = 0
        dateBackground.style.opacity = '0.75'

        setTimeout(function () {
          dateIsShowing = true
        }, (options.animationDelay + 10))
      }, 20)
    }

    if (dateIsShowing) {
      dateHide()
      setTimeout(function () {
        dateShowInner()
      }, (options.animationDelay + 10))
    } else {
      dateShowInner()
    }
  }

  function dateSet (date) {
    dateMonth.innerHTML = options.dateMonths[date.getMonth()]
    dateDay.innerHTML = date.getDate()
    dateYear.innerHTML = date.getFullYear()
  }

  function dateUpMonthClick () {
    dateSelected.setMonth(dateSelected.getMonth() - 1)
    dateSet(dateSelected)
  }
  function dateDownMonthClick () {
    dateSelected.setMonth(dateSelected.getMonth() + 1)
    dateSet(dateSelected)
  }
  function dateUpDayClick () {
    dateSelected.setDate(dateSelected.getDate() - 1)
    dateSet(dateSelected)
  }
  function dateDownDayClick () {
    dateSelected.setDate(dateSelected.getDate() + 1)
    dateSet(dateSelected)
  }
  function dateUpYearClick () {
    dateSelected.setFullYear(dateSelected.getFullYear() - 1)
    dateSet(dateSelected)
  }
  function dateDownYearClick () {
    dateSelected.setFullYear(dateSelected.getFullYear() + 1)
    dateSet(dateSelected)
  }

  function dateHide () {
    dateOuter.style.top = '-' + dateOuter.offsetHeight - 5 + 'px'
    dateBackground.style.opacity = '0'

    setTimeout(function () {
      removeClass(dateOuter, 'notie-transition')
      dateOuter.style.top = '-10000px'
      dateBackground.style.display = 'none'

      scrollEnable()

      dateIsShowing = false
    }, (options.animationDelay + 10))
  }

  // Internal helper functions
  // #################

  function addClass (element, className) {
    if (element.classList) {
      element.classList.add(className)
    } else {
      element.className += ' ' + className
    }
  }
  function removeClass (element, className) {
    if (element.classList) {
      element.classList.remove(className)
    } else {
      element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
    }
  }

  function blur () {
    document.activeElement && document.activeElement.blur()
  }

  var originalBodyHeight, originalBodyOverflow
  function scrollDisable () {
    originalBodyHeight = document.body.style.height
    originalBodyOverflow = document.body.style.overflow
    document.body.style.height = '100%'
    document.body.style.overflow = 'hidden'
  }
  function scrollEnable () {
    document.body.style.height = originalBodyHeight
    document.body.style.overflow = originalBodyOverflow
  }

  // Event listener for keydown enter and escape keys
  window.addEventListener('keydown', function (event) {
    var enterClicked = (event.which === 13 || event.keyCode === 13)
    var escapeClicked = (event.which === 27 || event.keyCode === 27)
    if (alertIsShowing) {
      if (enterClicked || escapeClicked) {
        alertHide()
      }
    } else if (confirmIsShowing) {
      if (enterClicked) {
        confirmYes.click()
      } else if (escapeClicked) {
        confirmHide()
      }
    } else if (inputIsShowing) {
      if (enterClicked) {
        inputYes.click()
      } else if (escapeClicked) {
        inputHide()
      }
    } else if (selectIsShowing) {
      if (escapeClicked) {
        selectHide()
      }
    } else if (dateIsShowing) {
      if (enterClicked) {
        dateYes.click()
      } else if (escapeClicked) {
        dateHide()
      }
    }
  })

  return {
    setOptions: setOptions,
    alert: alert,
    alertHide: alertHide,
    force: force,
    confirm: confirm,
    input: input,
    select: select,
    date: date,
    isShowing: isShowing
  }
}

// Export
if (typeof window !== 'undefined' && window) {
  if (typeof module === 'object' && module.exports) {
    // Node.js
    module.exports = notie()
  } else {
    // Browser
    window.notie = notie()
  }
}
