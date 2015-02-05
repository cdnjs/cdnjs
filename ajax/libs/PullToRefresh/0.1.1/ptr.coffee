# * * * * * * * *
# * PullToRefresh *
# * Version 0.1.1 *
# * License:  MIT *
# * SimonWaldherr *
# * * * * * * * * 

#jslint browser: true, indent: 2 

#global ActiveXObject 
ptr = []
ptr_settings =
  mlang: "en"
  mode: "mail"

ptr_messages =
  en:
    pulltorefresh: "Pull to refresh"
    loading: "Loading ..."

  de:
    pulltorefresh: "ziehen zum aktualisieren"
    loading: "laden ..."

ptr_init = (language) ->
  "use strict"
  i = 0
  ptr_settings.mlang = language  if language isnt `undefined`
  ptr.scrollable_parent = false
  ptr.scrollables = document.getElementsByClassName("ptr_scrollable")
  if (window.hasOwnProperty("ontouchstart")) or (window.navigator.msPointerEnabled)
    document.getElementsByTagName("body")[0].className += " touch"
  else
    document.getElementsByTagName("body")[0].className += " notouch"
  i = 0
  while i < ptr.scrollables.length
    if ptr.scrollables[i].hasAttribute("data-url") isnt false
      ptr.box = document.createElement("div")
      ptr.container = document.createElement("div")
      ptr.image = document.createElement("div")
      ptr.text = document.createElement("div")
      ptr.box.appendChild ptr.container
      ptr.container.appendChild ptr.image
      ptr.container.appendChild ptr.text
      ptr.text.innerHTML = ptr_messages[ptr_settings.mlang].pulltorefresh
      ptr.box.className = "ptr_box"
      ptr.box.style.right = "99%"
      ptr.container.className = "ptr_container"
      ptr.image.className = "ptr_image"
      ptr.text.className = "ptr_text"
      ptr.scrollables[i].firstElementChild.insertBefore ptr.box, ptr.scrollables[i].firstElementChild.firstChild
    i += 1
  document.addEventListener "touchstart", (e) ->
    parent = e.target
    return false  if parent.className is `undefined`
    i = 0
    while i < 10
      if parent.className isnt `undefined`
        if parent.className.match("ptr_scrollable")
          ptr.scrollable_parent = i
          i = 10
          if parent.hasAttribute("data-url") isnt false
            if parent.getElementsByClassName("ptr_box")[0] is `undefined`
              ptr.box = document.createElement("div")
              ptr.container = document.createElement("div")
              ptr.image = document.createElement("div")
              ptr.text = document.createElement("div")
              ptr.box.appendChild ptr.container
              ptr.container.appendChild ptr.image
              ptr.container.appendChild ptr.text
              ptr.text.innerHTML = ptr_messages[ptr_settings.mlang].pulltorefresh
              ptr.box.className = "ptr_box"
              ptr.box.style.right = "99%"
              ptr.container.className = "ptr_container"
              ptr.image.className = "ptr_image"
              ptr.text.className = "ptr_text"
              parent.firstElementChild.insertBefore ptr.box, parent.firstElementChild.firstChild
            else
              parent.getElementsByClassName("ptr_box")[0].style.opacity = 1.0
              parent.getElementsByClassName("ptr_text")[0].innerHTML = ptr_messages[ptr_settings.mlang].pulltorefresh  if parent.getElementsByClassName("ptr_text")[0].innerHTML isnt ptr_messages[ptr_settings.mlang].loading
          else parent.removeChild parent.getElementsByClassName("ptr_box")[0]  if parent.getElementsByClassName("ptr_box")[0] isnt `undefined`
          if parent.scrollTop is 0
            parent.scrollTop = 1
            parent.getElementsByClassName("ptr_wrap")[0].style.top = "1px"
          else parent.scrollTop = parent.scrollTop - 1  if (parent.scrollTop + parent.offsetHeight) is parent.scrollHeight
      if parent.parentNode.tagName is `undefined`
        i = 10
        return false
      if (parent.parentNode.tagName is "BODY") or (parent.parentNode.tagName is "HTML")
        i = 10
        return false
      parent = parent.parentNode
      i += 1
    return

  document.addEventListener "touchmove", (e) ->
    parent = e.target
    scroll = false
    rotate = 90
    top = undefined
    time = undefined
    insert = undefined
    inserted = undefined
    ajax = undefined
    ajaxTimeout = undefined
    requrl = undefined
    if ptr.scrollable_parent is false
      e.preventDefault()
      return false
    i = 0
    while i < ptr.scrollable_parent
      parent = parent.parentNode
      i += 1
    if (ptr.scrollable_parent isnt false) and (parent.hasAttribute("data-url") isnt false)
      scroll = true
      ptr.element = parent
      ptr.wrapelement = ptr.element.getElementsByClassName("ptr_wrap")[0]
      top = ptr.element.scrollTop
      ptr.box = ptr.element.getElementsByClassName("ptr_box")[0]
      if (ptr.wrapelement.className.indexOf(" active") is -1) and (not ptr.wrapelement.getElementsByClassName("ptr_image")[0].className.match("ptr_loading")) and (ptr.element.scrollTop < 1)
        rotate = (if (top < -40) then -90 else 130 + parseInt(top * 12 + 270, 10))  if ptr.element.scrollTop < -25
        if ptr.element.scrollTop < 0
          ptr.box.style.right = "0px"
          ptr.wrapelement.getElementsByClassName("ptr_image")[0].style["-webkit-transform"] = "scale(1) rotate(" + rotate + "deg)"
        if ptr.element.scrollTop < -51
          if ptr.wrapelement.className.indexOf(" ptr_active") is -1
            ptr.box.style.right = "0px"
            ptr.wrapelement.className += " ptr_active"
            ptr.wrapelement.getElementsByClassName("ptr_text")[0].innerHTML = ptr_messages[ptr_settings.mlang].loading
            ptr.wrapelement.getElementsByClassName("ptr_image")[0].className += " ptr_loading"
            if parent.getAttribute("data-url") is "reload"
              window.location.reload true
              return false
            ptr.element = parent
            ptr.wrapelement = ptr.element.getElementsByClassName("ptr_wrap")[0]
            ptr.eleId = parent.id
            time = new Date()
            ajax = (if (window.ActiveXObject) then new ActiveXObject("Microsoft.XMLHTTP") else (XMLHttpRequest and new XMLHttpRequest()) or null)
            ajaxTimeout = window.setTimeout(->
              ajax.abort()
              ptr.wrapelement.getElementsByClassName("ptr_text")[0].innerHTML = ""
              ptr.wrapelement.className = ptr.wrapelement.className.replace(" ptr_active", "")
              ptr.wrapelement.style.top = "0px"
              ptr.box = document.getElementById(ptr.eleId).getElementsByClassName("ptr_box")[0]
              ptr.box.getElementsByClassName("ptr_image")[0].className = ptr.box.getElementsByClassName("ptr_image")[0].className.replace(" ptr_loading", "")
              return
            , 6000)
            ajax.onreadystatechange = ->
              if ajax.readyState is 4
                if ajax.status is 200
                  clearTimeout ajaxTimeout
                  if ajax.status isnt 200
                    ptr.wrapelement.style.top = "0px"
                    ptr.box.getElementsByClassName("ptr_image")[0].className = ptr.getElementsByClassName("ptr_image")[0].className.replace(" loading", "")
                    ptr.wrapelement.className = ptr.wrapelement.className.replace(" ptr_active", "")
                  else
                    ptr.box = document.getElementById(ptr.eleId).getElementsByClassName("ptr_box")[0]
                    insert = document.createElement("div")
                    insert.innerHTML = ajax.responseText
                    insert.className = "ptr_inserted"
                    ptr.wrapelement.insertBefore insert, ptr.box.nextSibling
                    ptr.wrapelement.style.top = "0px"
                    ptr.box.getElementsByClassName("ptr_image")[0].className = ptr.box.getElementsByClassName("ptr_image")[0].className.replace(" ptr_loading", "")
                    ptr.wrapelement.className = ptr.wrapelement.className.replace(" ptr_active", "")
                    inserted = document.getElementsByClassName("ptr_inserted")[0]
                    ptr.element.scrollTop = inserted.clientHeight - 51
                    ptr.wrapelement.getElementsByClassName("ptr_text")[0].innerHTML = ""
                    ptr.box.style.right = "99%"
                    ptr.wrapelement.getElementsByClassName("ptr_image")[0].className = ptr.wrapelement.getElementsByClassName("ptr_image")[0].className.replace(" ptr_loading", "")
                    ptr.scrollable_parent = false
              return

            requrl = parent.getAttribute("data-url") + "?rt=" + time.getTime()
            ajax.open "POST", requrl, true
            ajax.setRequestHeader "Content-type", "application/x-www-form-urlencoded"
            ajax.send()
        else if ptr.element.scrollTop isnt 0
          if ptr.wrapelement.className.indexOf(" active") isnt -1
            ptr.wrapelement.className = ptr.wrapelement.className.replace(" ptr_active", "")
            ptr.wrapelement.getElementsByClassName("ptr_text")[0].innerHTML = ptr_messages[ptr_settings.mlang].pulltorefresh
    else scroll = true  if ptr.scrollable_parent isnt false
    e.preventDefault()  if scroll is false
    return

  document.addEventListener "touchend", (e) ->
    parent = e.target
    i = 0
    while i < ptr.scrollable_parent
      parent = parent.parentNode
      i += 1
    if (parent.hasAttribute("data-url") isnt false) and (ptr.scrollable_parent isnt false)
      if parent.hasAttribute("data-url") isnt false
        ptr.element = parent
        ptr.wrapelement = ptr.element.getElementsByClassName("ptr_wrap")[0]
        ptr.eleId = parent.id
        ptr.box = ptr.element.getElementsByClassName("ptr_box")[0]
        if ptr.wrapelement.getElementsByClassName("ptr_image")[0].className.match("ptr_loading")
          ptr.wrapelement.className = ptr.wrapelement.className.replace(" ptr_active", "")
          ptr.wrapelement.style.top = "51px"
        else
          ptr.box.style.right = "99%"
    ptr.scrollable_parent = false
    return

  return