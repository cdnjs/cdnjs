###
Copyrights 2011, the repl.it project.
Licensed under the MIT license
###

# Shorthand for jQuery.
$ = jQuery

# The states in which the console can be.
STATE_INPUT = 0
STATE_OUTPUT = 1
STATE_PROMPT = 2

# Key code values.
KEY_ENTER = 13
KEY_TAB = 9
KEY_DELETE = 46
KEY_BACKSPACE = 8
KEY_LEFT = 37
KEY_RIGHT = 39
KEY_UP = 38
KEY_DOWN = 40
KEY_HOME = 36
KEY_END = 35
KEY_PAGE_UP = 33
KEY_PAGE_DOWN = 34

# CSS classes
CLASS_PREFIX = 'jqconsole-'
CLASS_CURSOR = "#{CLASS_PREFIX}cursor"
CLASS_HEADER = "#{CLASS_PREFIX}header"
CLASS_PROMPT = "#{CLASS_PREFIX}prompt"
CLASS_OLD_PROMPT = "#{CLASS_PREFIX}old-prompt"
CLASS_INPUT = "#{CLASS_PREFIX}input"
CLASS_BLURRED = "#{CLASS_PREFIX}blurred"

# Frequently used string literals
E_KEYPRESS = 'keypress'
EMPTY_SPAN = '<span/>'
EMPTY_DIV = '<div/>'
EMPTY_SELECTOR = ':empty'
NEWLINE = '\n'

# Default prompt text for main and continuation prompts.
DEFAULT_PROMPT_LABEL = '>>> '
DEFAULT_PROMPT_CONINUE_LABEL = '... '

# The default number of spaces inserted when indenting.
DEFAULT_INDENT_WIDTH = 2

CLASS_ANSI = "#{CLASS_PREFIX}ansi-" 
ESCAPE_CHAR = '\x1B'
ESCAPE_SYNTAX = /\[(\d*)(?:;(\d*))*m/

class Ansi
  COLORS: ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white']
  
  constructor: ->
    @klasses = [];
  
  _append: (klass) =>
    klass = "#{CLASS_ANSI}#{klass}"
    if @klasses.indexOf(klass) is -1
      @klasses.push klass
  
  _remove: (klasses...) =>
    for klass in klasses
      if klass in ['fonts', 'color', 'background-color']
        @klasses = (cls for cls in @klasses when cls.indexOf(klass) isnt CLASS_ANSI.length)
      else
        klass = "#{CLASS_ANSI}#{klass}"
        @klasses = (cls for cls in @klasses when cls isnt klass)
  
  _color: (i) => @COLORS[i]
  
  _style: (code) =>
    code = 0 if code == ''
    code = parseInt code
    
    return if isNaN code
    
    switch code
      when 0  then @klasses = []
      when 1  then @_append 'bold'
      when 2  then @_append 'lighter'
      when 3  then @_append 'italic'
      when 4  then @_append 'underline'
      when 5  then @_append 'blink'
      when 6  then @_append 'blink-rapid'
      when 8  then @_append 'hidden'
      when 9  then @_append 'line-through'
      when 10 then @_remove 'fonts'
      when 11,12,13,14,15,16,17,18,19
        @_remove 'fonts'
        @_append "fonts-#{code - 10}"
      when 20 then @_append 'fraktur'
      when 21 then @_remove 'bold', 'lighter'
      when 22 then @_remove 'bold', 'lighter'
      when 23 then @_remove 'italic', 'fraktur'
      when 24 then @_remove 'underline'
      when 25 then @_remove 'blink', 'blink-rapid'
      when 28 then @_remove 'hidden'
      when 29 then @_remove 'line-through'
      when 30,31,32,33,34,35,36,37
        @_remove 'color'
        @_append 'color-' + @_color code - 30
      when 39 then @_remove 'color'
      when 40,41,42,43,44,45,46,47
        @_remove 'background-color'
        @_append 'background-color-' + @_color code - 40
      when 49 then @_remove 'background-color'
      when 51 then @_append 'framed'
      when 53 then @_append 'overline'
      when 54 then @_remove 'framed'
      when 55 then @_remove 'overline'
  
  getClasses: => @klasses.join ' '
  
  _openSpan: (text) => "<span class=\"#{@getClasses()}\">#{text}"
  _closeSpan: (text) => "#{text}</span>"
  
  stylize: (text) =>
    text = @_openSpan text
    
    i = 0
    while (i = text.indexOf(ESCAPE_CHAR ,i)) and i isnt -1
      if d = text[i...].match ESCAPE_SYNTAX
        @_style code for code in d[1...]
        text = @_closeSpan(text[0...i]) + @_openSpan text[i + 1 + d[0].length...]
      else i++
    
    return @_closeSpan text 
        
# Helper functions
spanHtml = (klass, content) -> "<span class=\"#{klass}\">#{content or ''}</span>"
  
class JQConsole
  # Creates a console.
  #   @arg container: The DOM element into which the console is inserted.
  #   @arg header: Text to print at the top of the console on reset. Optional.
  #     Defaults to an empty string.
  #   @arg prompt_label: The label to show before the command prompt. Optional.
  #     Defaults to DEFAULT_PROMPT_LABEL.
  #   @arg prompt_continue: The label to show before continuation lines of the
  #     command prompt. Optional. Defaults to DEFAULT_PROMPT_CONINUE_LABEL.
  constructor: (@container, header, prompt_label, prompt_continue_label) ->
    # Mobile devices supported sniff.
    @isMobile = !!navigator.userAgent.match /iPhone|iPad|iPod|Android/i
    @isIos = !!navigator.userAgent.match /iPhone|iPad|iPod/i
    @isAndroid = !!navigator.userAgent.match /Android/i
    
    @$window = $(window)
    
    # The header written when the console is reset.
    @header = header or ''

    # The prompt label used by Prompt().
    @prompt_label_main = if typeof prompt_label == 'string'
      prompt_label 
    else 
      DEFAULT_PROMPT_LABEL
    @prompt_label_continue = (prompt_continue_label or
                              DEFAULT_PROMPT_CONINUE_LABEL)

    # How many spaces are inserted when a tab character is pressed.
    @indent_width = DEFAULT_INDENT_WIDTH

    # By default, the console is in the output state.
    @state = STATE_OUTPUT

    # A queue of input/prompt operations waiting to be called. The items are
    # bound functions ready to be called.
    @input_queue = []

    # The function to call when input is accepted. Valid only in
    # input/prompt mode.
    @input_callback = null
    # The function to call to determine whether the input should continue to the
    # next line.
    @multiline_callback = null

    # A table of all "recorded" inputs given so far.
    @history = []
    # The index of the currently selected history item. If this is past the end
    # of @history, then the user has not selected a history item.
    @history_index = 0
    # The command which the user was typing before browsing history. Keeping
    # track of this allows us to restore the user's command if they browse the
    # history then decide to go back to what they were typing.
    @history_new = ''
    # Whether the current input operation is using history.
    @history_active = false

    # A table of custom shortcuts, mapping character codes to callbacks.
    @shortcuts = {}
    
    # The main console area. Everything else happens inside this.
    @$console = $('<pre class="jqconsole"/>').appendTo @container
    @$console.css 
      position: 'absolute'
      top: 0
      bottom: 0
      right: 0
      left: 0
      margin: 0
      overflow: 'auto'

    # Whether the console currently has focus.
    @$console_focused = true
    
    # On screen somehow invisible textbox for input.
    # Copied from codemirror2, this works for both mobile and desktop browsers.
    @$input_container = $(EMPTY_DIV).appendTo @container
    @$input_container.css
      position: 'relative'
      width: 1
      height: 0
      overflow: 'hidden'
    @$input_source = $('<textarea/>')
    @$input_source.attr('wrap', 'off').css
      position: 'absolute'
      width: 2
    @$input_source.appendTo @$input_container
    
    @$composition = $(EMPTY_DIV)
    @$composition.addClass "#{CLASS_PREFIX}composition"
    @$composition.css
      display: 'inline'
      position: 'relative'
      
    # Hash containing all matching settings
    # openings/closings[char] = matching_config 
    # where char is the opening/closing character.
    # clss is an array of classes for fast unhighlighting
    # for matching_config see Match method
    @matchings = 
      openings: {}
      closings: {}
      clss: []
    
    @ansi = new Ansi()
    
    # Prepare console for interaction.
    @_InitPrompt()
    @_SetupEvents()
    @Write @header, CLASS_HEADER
    
    # Save this instance to be accessed if lost.
    $(@container).data 'jqconsole', this

  #### Reset methods

  # Resets the history into intitial state.
  ResetHistory: ->
    @SetHistory []

  # Resets the shortcut configuration.
  ResetShortcuts: ->
    @shortcuts = {}

  # Resets the matching configuration.
  ResetMatchings: ->
    @matchings = 
      openings: {}
      closings: {}
      clss: []

  # Resets the console to its initial state.
  Reset: ->
    if @state != STATE_OUTPUT then @ClearPromptText true
    @state = STATE_OUTPUT
    @input_queue = []
    @input_callback = null
    @multiline_callback = null
    @ResetHistory()
    @ResetShortcuts()
    @ResetMatchings()
    @$prompt.detach()
    @$input_container.detach()
    @$console.html ''
    @$prompt.appendTo @$console
    @$input_container.appendTo @container
    @Write @header, CLASS_HEADER
    return undefined
  
  #### History Methods
  
  # Get the current history
  GetHistory: ->
  	@history
  
  # Set the history
  SetHistory: (history) ->
  	@history = history.slice()
  	@history_index = @history.length
    
  ###------------------------ Shortcut Methods -----------------------------###
  
  # Checks the type/value of key codes passed in for registering/unregistering
  #   shortcuts and handles accordingly.
  _CheckKeyCode: (key_code) ->
    if isNaN key_code
      key_code = key_code.charCodeAt 0
    else
      key_code = parseInt key_code, 10

    if not (0 < key_code < 256) or isNaN key_code
      throw new Error 'Key code must be a number between 0 and 256 exclusive.'
    
    return key_code
  
  # A helper function responsible for calling the register/unregister callback
  #   twice passing in both the upper and lower case letters.
  _LetterCaseHelper: (key_code, callback)->
    callback key_code
    if 65 <= key_code <= 90 then callback key_code + 32
    if 97 <= key_code <= 122 then callback key_code - 32
    
  # Registers a Ctrl+Key shortcut.
  #   @arg key_code: The code of the key pressing which (when Ctrl is held) will
  #     trigger this shortcut. If a string is provided, the character code of
  #     the first character is taken.
  #   @arg callback: A function called when the shortcut is pressed; "this" will
  #     point to the JQConsole object.
  RegisterShortcut: (key_code, callback) ->
    key_code = @_CheckKeyCode key_code
    if not callback instanceof Function
      throw new Error 'Callback must be a function, not ' + callback + '.'

    addShortcut = (key) =>
      if key not of @shortcuts then @shortcuts[key] = []
      @shortcuts[key].push callback
    
    @_LetterCaseHelper key_code, addShortcut
    return undefined
  
  # Removes a Ctrl+Key shortcut from shortcut registry.
  #   @arg key_code: The code of the key pressing which (when Ctrl is held) will
  #     trigger this shortcut. If a string is provided, the character code of
  #     the first character is taken.
  #   @arg handler: The handler that was used when registering the shortcut,
  #     if not supplied then all shortcut handlers corrosponding to the key
  #     would be removed.
  UnRegisterShortcut: (key_code, handler) ->
    key_code = @_CheckKeyCode key_code
    
    removeShortcut = (key)=>
      if key of @shortcuts
        if handler
          @shortcuts[key].splice @shortcuts[key].indexOf(handler), 1
        else
          delete @shortcuts[key]
    
    @_LetterCaseHelper key_code, removeShortcut
    return undefined
  
  ###---------------------- END Shortcut Methods ---------------------------###
  
  # Returns the 0-based number of the column on which the cursor currently is.
  GetColumn: ->
    @$prompt_cursor.text ''
    lines = @$console.text().split NEWLINE
    @$prompt_cursor.html '&nbsp;'
    return lines[lines.length - 1].length

  # Returns the 0-based number of the line on which the cursor currently is.
  GetLine: ->
    return @$console.text().split(NEWLINE).length - 1

  # Clears the contents of the prompt.
  #   @arg clear_label: If true, also clears the main prompt label (e.g. ">>>").
  ClearPromptText: (clear_label) ->
    if @state == STATE_OUTPUT
      throw new Error 'ClearPromptText() is not allowed in output state.'
    @$prompt_before.html ''
    @$prompt_after.html ''
    @$prompt_label.text if clear_label then '' else @_SelectPromptLabel false
    @$prompt_left.text ''
    @$prompt_right.text ''
    return undefined

  # Returns the contents of the prompt.
  #   @arg full: If true, also includes the prompt labels (e.g. ">>>").
  GetPromptText: (full) ->
    if @state == STATE_OUTPUT
      throw new Error 'GetPromptText() is not allowed in output state.'

    if full
      @$prompt_cursor.text ''
      text = @$prompt.text()
      @$prompt_cursor.html '&nbsp;'
      return text
    else
      getPromptLines = (node) ->
        buffer = []
        node.children().each -> buffer.push $(@).children().last().text()
        return buffer.join NEWLINE

      before = getPromptLines @$prompt_before
      if before then before += NEWLINE

      current = @$prompt_left.text() + @$prompt_right.text()

      after = getPromptLines @$prompt_after
      if after then after = NEWLINE + after

      return before + current + after

  # Sets the contents of the prompt.
  #   @arg text: The text to put in the prompt. May contain multiple lines.
  SetPromptText: (text) ->
    if @state == STATE_OUTPUT
      throw new Error 'SetPromptText() is not allowed in output state.'
    @ClearPromptText false
    @_AppendPromptText text
    @_ScrollToEnd()
    return undefined
  
  # Replaces the main prompt label.
  #   @arg main_label: The new main label for the next prompt.
  #   @arg continue_label: The new continuation label for the next prompt. Optional.
  SetPromptLabel: (main_label, continue_label) ->
    @prompt_label_main = main_label
    if continue_label?
      @prompt_label_continue = continue_label
    return undefined

  # Writes the given text to the console in a <span>, with an optional class.
  #   @arg text: The text to write.
  #   @arg cls: The class to give the span containing the text. Optional.
  Write: (text, cls, escape=true) ->
    if escape
      text = @ansi.stylize $(EMPTY_SPAN).text(text).html()
      
    span = $(EMPTY_SPAN).html text
    if cls? then span.addClass cls
    @Append span
    
  # Adds a dom node, where any text would have been inserted 
  #   @arg node: The node to insert.
  Append: (node) ->
  	$node = $(node).insertBefore @$prompt
  	@_ScrollToEnd()
  	# Force reclaculation of the cursor's position.
  	@$prompt_cursor.detach().insertAfter @$prompt_left
  	return $node
  
  # Starts an input operation. If another input or prompt operation is currently
  # underway, the new input operation is enqueued and will be called when the
  # current operation and all previously enqueued operations finish.
  #   @arg input_callback: A function called with the user's input when the
  #     user presses Enter and the input operation is complete.
  Input: (input_callback) ->
    if @state == STATE_PROMPT
      # Input operation has a higher priority, Abort and defer current prompt
      # by putting it on top of the queue.
      current_input_callback = @input_callback
      current_multiline_callback = @multiline_callback
      current_history_active = @history_active
      current_async_multiline = @async_multiline
      @AbortPrompt()
      @input_queue.unshift => @Prompt current_history_active,
                                      current_input_callback,
                                      current_multiline_callback,
                                      current_async_multiline
    else if @state != STATE_OUTPUT
      @input_queue.push => @Input input_callback
      return
    @history_active = false
    @input_callback = input_callback
    @multiline_callback = null
    @state = STATE_INPUT
    @$prompt.attr 'class', CLASS_INPUT
    @$prompt_label.text @_SelectPromptLabel false
    @Focus()
    @_ScrollToEnd()
    return undefined

  # Starts a command prompt operation. If another input or prompt operation is
  # currently underway, the new prompt operation is enqueued and will be called
  # when the current operation and all previously enqueued operations finish.
  #   @arg history_enabled: Whether this input should use history. If true, the
  #     user can select the input from history, and their input will also be
  #     added as a new history item.
  #   @arg result_callback: A function called with the user's input when the
  #     user presses Enter and the prompt operation is complete.
  #   @arg multiline_callback: If specified, this function is called when the
  #     user presses Enter to check whether the input should continue to the
  #     next line. The function must return one of the following values:
  #       false: the input operation is completed.
  #       0: the input continues to the next line with the current indent.
  #       N (int): the input continues to the next line, and the current indent
  #         is adjusted by N, e.g. -2 to unindent two levels.
  Prompt: (history_enabled, result_callback, multiline_callback, async_multiline) ->
    if @state != STATE_OUTPUT
      @input_queue.push =>
        @Prompt history_enabled, result_callback, multiline_callback, async_multiline
      return
    @history_active = history_enabled
    @input_callback = result_callback
    @multiline_callback = multiline_callback
    @async_multiline = async_multiline
    @state = STATE_PROMPT
    @$prompt.attr 'class', CLASS_PROMPT + ' ' + @ansi.getClasses()
    @$prompt_label.text @_SelectPromptLabel false
    @Focus()
    @_ScrollToEnd()
    return undefined

  # Aborts the current prompt operation and returns to output mode or the next
  # queued input/prompt operation.
  AbortPrompt: ->
    if @state != STATE_PROMPT
      throw new Error 'Cannot abort prompt when not in prompt state.'
    @Write @GetPromptText(true) + NEWLINE, CLASS_OLD_PROMPT
    @ClearPromptText true
    @state = STATE_OUTPUT
    @input_callback = @multiline_callback = null
    @_CheckInputQueue()
    return undefined

  # Sets focus on the console's hidden input box so input can be read.
  Focus: ->
    @$input_source.focus() if not @IsDisabled()
    return undefined

  # Sets the number of spaces inserted when indenting.
  SetIndentWidth: (width) ->
    @indent_width = width

  # Returns the number of spaces inserted when indenting.
  GetIndentWidth: ->
    return @indent_width

  # Registers character matching settings for a single matching
  #   @arg open: the openning character
  #   @arg close: the closing character
  #   @arg cls: the html class to add to the matched characters
  RegisterMatching: (open, close, cls) ->  
      match_config = 
        opening_char: open
        closing_char: close
        cls: cls
        
      @matchings.clss.push(cls)
      @matchings.openings[open] = match_config
      @matchings.closings[close] = match_config
  
  # Unregisters a character matching. cls is optional.
  UnRegisterMatching: (open, close) ->
    cls = @matchings.openings[open].cls
    delete @matchings.openings[open]
    delete @matchings.closings[close]
    @matchings.clss.splice @matchings.clss.indexOf(cls), 1
  
  # Dumps the content of the console before the current prompt.
  Dump: ->
    $elems = @$console.find(".#{CLASS_HEADER}").nextUntil(".#{CLASS_PROMPT}")

    return (
      for elem in $elems
        if $(elem).is ".#{CLASS_OLD_PROMPT}"
          $(elem).text().replace /^\s+/, '>>> '
        else
          $(elem).text()
    ).join ' '

  # Gets the current prompt state.
  GetState: ->
    return if @state is STATE_INPUT
      'input'
     else if @state is STATE_OUTPUT
      'output'
    else
      'prompt'
  
  # Disables focus and input on the console.
  Disable: ->
    @$input_source.attr 'disabled', on
    @$input_source.blur();
    
  # Enables focus and input on the console.
  Enable: ->
    @$input_source.attr 'disabled', off

  # Returns true if the console is disabled.
  IsDisabled: ->
    return Boolean @$input_source.attr 'disabled'

  # Moves the cursor to the start of the current prompt line.
  #   @arg all_lines: If true, moves to the beginning of the first prompt line,
  #     instead of the beginning of the current.
  MoveToStart: (all_lines) ->
    @_MoveTo all_lines, true
    return undefined

  # Moves the cursor to the end of the current prompt line.
  MoveToEnd: (all_lines) ->
    @_MoveTo all_lines, false
    return undefined

  ###------------------------ Private Methods -------------------------------###

  _CheckInputQueue: ->
    if @input_queue.length
      @input_queue.shift()()

  # Creates the movable prompt span. When the console is in input mode, this is
  # shown and allows user input. The structure of the spans are as follows:
  # $prompt
  #   $prompt_before
  #     line1
  #       prompt_label
  #       prompt_content
  #     ...
  #     lineN
  #       prompt_label
  #       prompt_content
  #   $prompt_current
  #     $prompt_label
  #     $prompt_left
  #     $prompt_cursor
  #     $prompt_right
  #   $prompt_after
  #     line1
  #       prompt_label
  #       prompt_content
  #     ...
  #     lineN
  #       prompt_label
  #       prompt_content
  _InitPrompt: ->
    # The main prompt container.
    @$prompt = $(spanHtml(CLASS_INPUT)).appendTo @$console
    # The main divisions of the prompt - the lines before the current line, the
    # current line, and the lines after it.
    @$prompt_before = $(EMPTY_SPAN).appendTo @$prompt
    @$prompt_current = $(EMPTY_SPAN).appendTo @$prompt
    @$prompt_after = $(EMPTY_SPAN).appendTo @$prompt

    # The subdivisions of the current prompt line - the static prompt label
    # (e.g. ">>> "), and the editable text to the left and right of the cursor.
    @$prompt_label = $(EMPTY_SPAN).appendTo @$prompt_current
    @$prompt_left = $(EMPTY_SPAN).appendTo @$prompt_current
    @$prompt_right = $(EMPTY_SPAN).appendTo @$prompt_current

    # Needed for the CSS z-index on the cursor to work.
    @$prompt_right.css position: 'relative'

    # The cursor. A span containing a space that shades its following character.
    # If the font of the prompt is not monospace, the content should be set to
    # the first character of @$prompt_right to get the appropriate width.
    @$prompt_cursor = $(spanHtml(CLASS_CURSOR, '&nbsp;'))
    @$prompt_cursor.insertBefore @$prompt_right
    @$prompt_cursor.css
      color: 'transparent'
      display: 'inline'
      zIndex: 0
    @$prompt_cursor.css('position', 'absolute') if not @isMobile

  # Binds all the required input and focus events.
  _SetupEvents: ->
    
    # Click to focus.
    if @isMobile
      @$console.click (e) =>
        e.preventDefault()
        @Focus()
    else
      @$console.mouseup (e) =>
        # Focus immediatly when it's the middle click to support
        # paste on linux desktop.
        if e.which == 2
          @Focus()
        else 
          fn = =>
            if not window.getSelection().toString()
              e.preventDefault()
              @Focus()
          # Force selection update.
          setTimeout fn, 0
        
    # Mark the console with a style when it loses focus.
    @$input_source.focus =>
      @_ScrollToEnd()
      @$console_focused = true
      @$console.removeClass CLASS_BLURRED
      removeClass = =>
        if @$console_focused then @$console.removeClass CLASS_BLURRED
      setTimeout removeClass, 100
      hideTextInput = =>
        if @isIos and @$console_focused then @$input_source.hide()
      setTimeout hideTextInput, 500
      
    @$input_source.blur =>
      @$console_focused = false
      if @isIos then @$input_source.show()
      addClass = =>
        if not @$console_focused then @$console.addClass CLASS_BLURRED
      setTimeout addClass, 100
    
    # Intercept pasting.
    paste_event = if $.browser.opera then 'input' else 'paste'
    @$input_source.bind paste_event, =>
      handlePaste = =>
        # Opera fires input on composition end.
        return if @in_composition
        @_AppendPromptText @$input_source.val()
        @$input_source.val ''
        @Focus()
      # Wait until the browser has handled the paste event before scraping.
      setTimeout handlePaste, 0

    # Actual key-by-key handling.
    @$input_source.keypress @_HandleChar
    @$input_source.keydown @_HandleKey
    @$input_source.keydown @_CheckComposition
    
    # Firefox don't fire any key event for composition characters, so we listen
    # for the unstandard composition-events.
    if $.browser.mozilla?
      @$input_source.bind 'compositionstart', @_StartComposition
      @$input_source.bind 'compositionend', @_EndCommposition
      @$input_source.bind 'text', @_UpdateComposition
    
    # There is no way to detect compositionstart in opera so we poll for it.
    if $.browser.opera?
      cb = =>
        return if @in_composition
        # if there was characters that actually escaped to the input source
        # then its most probably a multibyte char.
        if @$input_source.val().length
          @_StartComposition()
      setInterval cb, 200
  
  # Handles a character key press.
  #   @arg event: The jQuery keyboard Event object to handle.
  _HandleChar: (event) =>
    # We let the browser take over during output mode.
    # Skip everything when a modifier key other than shift is held.
    # Allow alt key to pass through for unicode & multibyte characters.
    if @state == STATE_OUTPUT or event.metaKey or event.ctrlKey
      return true
    
    # IE & Chrome capture non-control characters and Enter.
    # Mozilla and Opera capture everything.

    # This is the most reliable cross-browser; charCode/keyCode break on Opera.
    char_code = event.which

    # Skip Enter on IE and Chrome and Tab & backspace on Opera. 
    # These are handled in _HandleKey().
    if char_code in [8, 9, 13] then return false
    
    # Pass control characters which are captured on Mozilla/Safari.
    if $.browser.mozilla
       if event.keyCode or event.altKey
         return true
    # Pass control characters which are captured on Opera.
    if $.browser.opera
       if event.altKey
         return true
    
    @$prompt_left.text @$prompt_left.text() + String.fromCharCode char_code
    @_ScrollToEnd()
    return false

  # Handles a key up event and dispatches specific handlers.
  #   @arg event: The jQuery keyboard Event object to handle.
  _HandleKey: (event) =>
    # We let the browser take over during output mode.
    if @state == STATE_OUTPUT then return true
    
    key = event.keyCode or event.which
    
    # Check for char matching next time the callstack unwinds.
    setTimeout $.proxy(@_CheckMatchings, this), 0
    
    # Don't care about alt-modifier.
    if event.altKey
      return true
    # Handle shortcuts.
    else if event.ctrlKey or event.metaKey
      return @_HandleCtrlShortcut key
    else if event.shiftKey
      # Shift-modifier shortcut.
      switch key
        when KEY_ENTER then @_HandleEnter true
        when KEY_TAB then @_Unindent()
        when KEY_UP then  @_MoveUp()
        when KEY_DOWN then @_MoveDown()
        when KEY_PAGE_UP then @_ScrollUp()
        when KEY_PAGE_DOWN then @_ScrollDown()
        # Allow other Shift shortcuts to pass through to the browser.
        else return true
      return false
    else
      # Not a modifier shortcut.
      switch key
        when KEY_ENTER then @_HandleEnter false
        when KEY_TAB then @_Indent()
        when KEY_DELETE then @_Delete false
        when KEY_BACKSPACE then @_Backspace false
        when KEY_LEFT then @_MoveLeft false
        when KEY_RIGHT then @_MoveRight false
        when KEY_UP then @_HistoryPrevious()
        when KEY_DOWN then @_HistoryNext()
        when KEY_HOME then @MoveToStart false
        when KEY_END then @MoveToEnd false
        when KEY_PAGE_UP then @_ScrollUp()
        when KEY_PAGE_DOWN then @_ScrollDown()
        # Let any other key continue its way to keypress.
        else return true
      return false

  # Handles a Ctrl+Key shortcut.
  #   @arg key: The keyCode of the pressed key.
  _HandleCtrlShortcut: (key) ->
    switch key
      when KEY_DELETE then @_Delete true
      when KEY_BACKSPACE then @_Backspace true
      when KEY_LEFT then @_MoveLeft true
      when KEY_RIGHT then @_MoveRight true
      when KEY_UP then  @_MoveUp()
      when KEY_DOWN then @_MoveDown()
      when KEY_END then @MoveToEnd true
      when KEY_HOME then @MoveToStart true
      else
        if key of @shortcuts
          # Execute custom shortcuts.
          handler.call(this) for handler in @shortcuts[key]
          return false
        else
          # Allow unhandled Ctrl shortcuts.
          return true
    # Block handled shortcuts.
    return false

  # Handles the user pressing the Enter key.
  #   @arg shift: Whether the shift key is held.
  _HandleEnter: (shift) ->
    if shift
      @_InsertNewLine true
    else
      text = @GetPromptText()
      continuation = (indent) =>
        if indent isnt false
          @MoveToEnd true
          @_InsertNewLine true
          for _ in [0...Math.abs indent]
            if indent > 0 then @_Indent() else @_Unindent()
        else
          # Done with input.
          cls_suffix = if @state == STATE_INPUT then 'input' else 'prompt'
          @Write @GetPromptText(true) + NEWLINE, "#{CLASS_PREFIX}old-" + cls_suffix
          @ClearPromptText true
          if @history_active
            if not @history.length or @history[@history.length - 1] != text
              @history.push text
            @history_index = @history.length
          @state = STATE_OUTPUT
          callback = @input_callback
          @input_callback = null
          if callback then callback text
          @_CheckInputQueue()
      
      if @multiline_callback
        if @async_multiline
          @multiline_callback text, continuation
        else
          continuation @multiline_callback text
      else
        continuation false
          
  
  # Returns the appropriate variables for usage in methods that depends on the
  #   direction of the interaction with the console.
  _GetDirectionals: (back) ->
    $prompt_which = if back then @$prompt_left else @$prompt_right
    $prompt_opposite = if back then @$prompt_right else @$prompt_left
    $prompt_relative = if back then @$prompt_before else @$prompt_after
    $prompt_rel_opposite = if back then @$prompt_after else @$prompt_before
    MoveToLimit = if back
      $.proxy @MoveToStart, @
    else 
      $.proxy @MoveToEnd, @
    MoveDirection = if back
      $.proxy @_MoveLeft, @ 
    else 
      $.proxy @_MoveRight, @
    which_end = if back then 'last' else 'first'
    where_append = if back then 'prependTo' else 'appendTo'
    return {
      $prompt_which
      $prompt_opposite
      $prompt_relative
      $prompt_rel_opposite
      MoveToLimit
      MoveDirection
      which_end
      where_append
    }
    
  # Moves the cursor vertically in the current prompt,
  #   in the same column. (Used by _MoveUp, _MoveDown)
  _VerticalMove: (up) ->
    {
      $prompt_which
      $prompt_opposite
      $prompt_relative
      MoveToLimit
      MoveDirection
    } = @_GetDirectionals(up)
            
    if $prompt_relative.is EMPTY_SELECTOR then return
    pos = @$prompt_left.text().length
    MoveToLimit()
    MoveDirection()
    text = $prompt_which.text()
    $prompt_opposite.text if up then text[pos..] else text[...pos]
    $prompt_which.text if up then text[...pos] else text[pos..]
    
    
  # Moves the cursor to the line above the current one, in the same column.
  _MoveUp: ->
    @_VerticalMove true

  # Moves the cursor to the line below the current one, in the same column.
  _MoveDown: ->
    @_VerticalMove()
  
  # Moves the cursor horizontally in the current prompt.
  #   Used by _MoveLeft, _MoveRight
  _HorizontalMove: (whole_word, back) ->
    {
      $prompt_which
      $prompt_opposite
      $prompt_relative
      $prompt_rel_opposite
      which_end
      where_append
    } = @_GetDirectionals(back)
    regexp = if back then /\w*\W*$/ else /^\w*\W*/
    
    text = $prompt_which.text()
    if text
      if whole_word
        word = text.match regexp
        if not word then return
        word = word[0]
        tmp = $prompt_opposite.text()
        $prompt_opposite.text if back then word + tmp else tmp + word
        len = word.length
        $prompt_which.text if back then text[...-len] else text[len..]
      else
        tmp = $prompt_opposite.text()
        $prompt_opposite.text if back then text[-1...] + tmp else tmp + text[0]
        $prompt_which.text if back then text[...-1] else text[1...]
    else if not $prompt_relative.is EMPTY_SELECTOR
      $which_line = $(EMPTY_SPAN)[where_append] $prompt_rel_opposite
      $which_line.append $(EMPTY_SPAN).text @$prompt_label.text()
      $which_line.append $(EMPTY_SPAN).text $prompt_opposite.text()
      
      $opposite_line = $prompt_relative.children()[which_end]().detach()
      @$prompt_label.text $opposite_line.children().first().text()
      $prompt_which.text $opposite_line.children().last().text()
      $prompt_opposite.text ''
      
  # Moves the cursor to the left.
  #   @arg whole_word: Whether to move by a whole word rather than a character.
  _MoveLeft: (whole_word) ->
    @_HorizontalMove whole_word, true

  # Moves the cursor to the right.
  #   @arg whole_word: Whether to move by a whole word rather than a character.
  _MoveRight: (whole_word) ->
    @_HorizontalMove whole_word
  
  # Moves the cursor either to the start or end of the current prompt line(s).
  _MoveTo: (all_lines, back) ->
    {
      $prompt_which
      $prompt_opposite
      $prompt_relative
      MoveToLimit
      MoveDirection
    } = @_GetDirectionals(back)
    
    if all_lines
      # Warning! FF 3.6 hangs on is(EMPTY_SELECTOR)
      until $prompt_relative.is(EMPTY_SELECTOR) and $prompt_which.text() == ''
        MoveToLimit false
        MoveDirection false
    else
      $prompt_opposite.text @$prompt_left.text() + @$prompt_right.text()
      $prompt_which.text ''

  # Deletes the character or word following the cursor.
  #   @arg whole_word: Whether to delete a whole word rather than a character.
  _Delete: (whole_word) ->
    text = @$prompt_right.text()
    if text
      if whole_word
        word = text.match /^\w*\W*/
        if not word then return
        word = word[0]
        @$prompt_right.text text[word.length...]
      else
        @$prompt_right.text text[1...]
    else if not @$prompt_after.is EMPTY_SELECTOR
      $lower_line = @$prompt_after.children().first().detach()
      @$prompt_right.text $lower_line.children().last().text()

  # Deletes the character or word preceding the cursor.
  #   @arg whole_word: Whether to delete a whole word rather than a character.
  _Backspace: (whole_word) ->
    setTimeout $.proxy(@_ScrollToEnd, @), 0
    text = @$prompt_left.text()
    if text
      if whole_word
        word = text.match /\w*\W*$/
        if not word then return
        word = word[0]
        @$prompt_left.text text[...-word.length]
      else
        @$prompt_left.text text[...-1]
    else if not @$prompt_before.is EMPTY_SELECTOR
      $upper_line = @$prompt_before.children().last().detach()
      @$prompt_label.text $upper_line.children().first().text()
      @$prompt_left.text $upper_line.children().last().text()

  # Indents the current line.
  _Indent: ->
    @$prompt_left.prepend (' ' for _ in [1..@indent_width]).join ''

  # Unindents the current line.
  _Unindent: ->
    line_text = @$prompt_left.text() + @$prompt_right.text()
    for _ in [1..@indent_width]
      if not /^ /.test(line_text) then break
      if @$prompt_left.text()
        @$prompt_left.text @$prompt_left.text()[1..]
      else
        @$prompt_right.text @$prompt_right.text()[1..]
      line_text = line_text[1..]

  # Inserts a new line at the cursor position.
  #   @arg indent: If specified and true, the inserted line is indented to the
  #     same column as the last line.
  _InsertNewLine: (indent = false) ->
    old_prompt = @_SelectPromptLabel not @$prompt_before.is EMPTY_SELECTOR
    $old_line = $(EMPTY_SPAN).appendTo @$prompt_before
    $old_line.append $(EMPTY_SPAN).text old_prompt
    $old_line.append $(EMPTY_SPAN).text @$prompt_left.text()

    @$prompt_label.text @_SelectPromptLabel true
    if indent and match = @$prompt_left.text().match /^\s+/
      @$prompt_left.text match[0]
    else
      @$prompt_left.text ''
    @_ScrollToEnd()

  # Appends the given text to the prompt.
  #   @arg text: The text to append. Can contain multiple lines.
  _AppendPromptText: (text) ->
    lines = text.split NEWLINE
    @$prompt_left.text @$prompt_left.text() + lines[0]
    for line in lines[1..]
      @_InsertNewLine()
      @$prompt_left.text line

  # Scrolls the console area up one page (with animation).
  _ScrollUp: ->
    target = @$console[0].scrollTop - @$console.height()
    @$console.stop().animate {scrollTop: target}, 'fast'

  # Scrolls the console area down one page (with animation).
  _ScrollDown: ->
    target = @$console[0].scrollTop + @$console.height()
    @$console.stop().animate {scrollTop: target}, 'fast'

  # Scrolls the console area to its bottom;
  # Scrolls the window to the cursor vertical position.
  # Called with every input/output to the console.
  _ScrollToEnd: ->
    # Scroll console to the bottom.
    @$console.scrollTop @$console[0].scrollHeight
    
    # The cursor's top position is effected by the scroll-top of the console 
    # so we need to this asynchronously to give the browser a chance to 
    # reflow and recaluclate the cursor's possition.
    cont = =>
      line_height = @$prompt_cursor.height()
      screen_top = @$window.scrollTop()
      screen_left = @$window.scrollLeft()
      doc_height = document.documentElement.clientHeight
      pos = @$prompt_cursor.offset()
      rel_pos = @$prompt_cursor.position()
      
      # Move the input element to the cursor position.
      @$input_container.css
        left: rel_pos.left 
        top: rel_pos.top 
  
      optimal_pos = pos.top - (2 * line_height)
      # Follow the cursor vertically on mobile and desktop.
      if @isMobile and orientation?
        # Since the keyboard takes up most of the screen, we don't care about how
        # far the the cursor position from the screen top is. We just follow it.
        if screen_top < pos.top or screen_top > pos.top
          @$window.scrollTop optimal_pos
      else
        if screen_top + doc_height < pos.top
          # Scroll just to a place where the cursor is in the view port.
          @$window.scrollTop pos.top - doc_height + line_height
        else if screen_top > optimal_pos
          # If the window is scrolled beyond the cursor, scroll to the cursor's
          # position and give two line to the top.
          @$window.scrollTop pos.top
    
    setTimeout cont, 0
      
  # Selects the prompt label appropriate to the current mode.
  #   @arg continuation: If true, returns the continuation prompt rather than
  #     the main one.
  _SelectPromptLabel: (continuation) ->
    if @state == STATE_PROMPT
      return if continuation then (' \n' + @prompt_label_continue) else @prompt_label_main
    else
      return if continuation then '\n ' else ' '
  
  # Cross-browser outerHTML
  _outerHTML: ($elem) ->
    if document.body.outerHTML 
      return $elem.get(0).outerHTML
    else
      return $(EMPTY_DIV).append($elem.eq(0).clone()).html()
    
  # Wraps a single character in an element with a <span> having a class
  #   @arg $elem: The JqDom element in question
  #   @arg index: the index of the character to be wrapped
  #   @arg cls: the html class to be given to the wrapping <span>
  _Wrap: ($elem, index, cls) ->
    text = $elem.html()
    html = text[0...index]+
           spanHtml(cls, text[index])+
           text[index + 1...]
    $elem.html html
  
  # Walks a string of characters incrementing current_count each time a char is found
  # and decrementing each time an opposing char is found.
  #   @arg text: the text in question
  #   @arg char: the char that would increment the counter
  #   @arg opposing_char: the char that would decrement the counter
  #   @arg back: specifies whether the walking should be done backwards.
  _WalkCharacters: (text, char, opposing_char, current_count, back) ->
    index = if back then text.length else 0
    text = text.split ''
    read_char = () ->
      if back
        [text..., ret] = text
      else
        [ret, text...] = text
      if ret
        index = index + if back then -1 else +1
      ret

    while ch = read_char()
      if ch is char
        current_count++
      else if ch is opposing_char
        current_count--
      if current_count is 0 
        return {index: index, current_count: current_count}

    return {index: -1, current_count: current_count}
  
  _ProcessMatch: (config, back, before_char) =>
      [char, opposing_char] = if back
        [
          config['closing_char']
          config['opening_char']
        ]
      else
        [
          config['opening_char']
          config['closing_char']
        ]
      {$prompt_which, $prompt_relative} = @_GetDirectionals(back)
      
      current_count = 1
      found = false
      # check current line first
      text = $prompt_which.html()
      # When on the same line discard checking the first character, going backwards
      # is not an issue since the cursor's current character is found in $prompt_right.
      if !back then text = text[1...]
      if before_char and back then text = text[...-1]
      {index, current_count} = @_WalkCharacters text, char, opposing_char, current_count, back
      if index > -1
        @_Wrap $prompt_which, index, config.cls
        found = true
      else
        $collection = $prompt_relative.children()
        # When going backwards we have to the reverse our jQuery collection
        # for fair matchings
        $collection = if back then Array.prototype.reverse.call($collection) else $collection
        $collection.each (i, elem) =>
          $elem = $(elem).children().last()
          text = $elem.html()
          {index, current_count} = @_WalkCharacters text, char, opposing_char, current_count, back
          if index > -1
            # When checking for matchings ona different line going forward we must decrement 
            # the index since the current char is not included
            if !back then index--
            @_Wrap $elem, index, config.cls
            found = true
            return false
            
      return found
  
  # Unrwaps all prevoisly matched characters.
  # Checks if the cursor's current character is one to be matched, then walks
  # the following/preceeding characters to look for the opposing character that
  # would satisfy the match. If found both characters would be wrapped with a 
  # span and applied the html class that was found in the match_config.
  _CheckMatchings: (before_char) ->
    current_char = if before_char then @$prompt_left.text()[@$prompt_left.text().length - 1...] else @$prompt_right.text()[0]
    # on every move unwrap all matched elements
    # TODO(amasad): cache previous matched elements since this must be costly
    $('.' + cls, @$console).contents().unwrap() for cls in @matchings.clss
                
    if config = @matchings.closings[current_char]
      found = @_ProcessMatch config, true, before_char
    else if config = @matchings.openings[current_char]
      found = @_ProcessMatch config, false, before_char
    else if not before_char
      @_CheckMatchings true
      
    if before_char
      @_Wrap @$prompt_left, @$prompt_left.html().length - 1, config.cls if found
    else
    # Wrap current element when a matching was found
      @_Wrap @$prompt_right, 0, config.cls if found
    
  
  # Sets the prompt to the previous history item.
  _HistoryPrevious: ->
    if not @history_active then return
    if @history_index <= 0 then return
    if @history_index == @history.length
      @history_new = @GetPromptText()
    @SetPromptText @history[--@history_index]

  # Sets the prompt to the next history item.
  _HistoryNext: ->
    if not @history_active then return
    if @history_index >= @history.length then return
    if @history_index == @history.length - 1
      @history_index++
      @SetPromptText @history_new
    else
      @SetPromptText @history[++@history_index]
  
  # Check if this could be the start of a composition or an update to it.
  _CheckComposition: (e) =>
    key = e.keyCode or e.which
    if $.browser.opera? and @in_composition
      @_UpdateComposition()
    if key == 229
      if @in_composition then @_UpdateComposition() else @_StartComposition()
  
  # Starts a multibyte character composition.
  _StartComposition: =>
    @$input_source.bind E_KEYPRESS, @_EndComposition
    @in_composition = true
    @_ShowComposition()
    setTimeout @_UpdateComposition, 0
  
  # Ends a multibyte character composition.
  _EndComposition: =>
    @$input_source.unbind E_KEYPRESS, @_EndComposition 
    @in_composition = false
    @_HideComposition()
    @$input_source.val ''
  
  # Updates a multibyte character composition.
  _UpdateComposition: (e) =>
    cb =  =>
      return if not @in_composition
      @$composition.text @$input_source.val()
    setTimeout cb, 0
  
  # Shows a multibyte character composition.
  _ShowComposition: =>
    @$composition.css 'height', @$prompt_cursor.height()
    @$composition.empty()
    @$composition.appendTo @$prompt_left
  
  # Hides a multibyte character composition.
  _HideComposition: =>
    # We just detach the element because by now the text value of this element
    # is already extracted and has been put on the left of the prompt.
    @$composition.detach()
  
$.fn.jqconsole = (header, prompt_main, prompt_continue) ->
  new JQConsole this, header, prompt_main, prompt_continue
