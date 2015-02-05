jQuery #($)
  $("a[href=#toc]").click #
    $("#try").hide()
    let $toc = $("#toc")
    let offset = $(this).offset()
    offset.top += $(this).height() * 2
    $toc.slide-toggle()
    $toc.offset offset
    false
  let handle-try = do
    let mutable compiling = false
    let mutable last-compile = void
    let handle()
      if compiling
        handle-try()
        return
      let text = $("#try-input").val()
      compiling := true
      GorillaScript.compile text, #(err, result)
        compiling := false
        if err
          $("#try-output").val("// Error: $(String err)\n\n$(last-compile or '')")
        else
          last-compile := result.code
          $("#try-output").val(result.code)
    let mutable interval = void
    #
      if interval?
        clear-timeout interval
      interval := set-timeout handle, 250
  set-interval (do
    let mutable last-text = ""
    #
      let text = $("#try-input").val()
      if text != last-text
        last-text := text
        handle-try()), 17
  $("a[href=#try]").click #
    $("#toc").hide()
    handle-try()
    let $try = $("#try")
    let offset = $(this).offset()
    offset.top += $(this).height() * 2
    $try.slide-toggle()
    $try.offset offset
    false
  $('.gs-code').each #
    let $this = $(this)
    if $this.has-class "no-convert"
      return
    let $div = $("<div>")
    $this.replace-with $div
    $div.append $("<ul class='tabs'><li class='gs-tab active'><a href='#'>GorillaScript</a><li class='js-tab'><a href='#'>JavaScript</a></ul>")
    $div.append $this
    $div.find(".tabs a").on "click", #
      $div.find(".tabs li").remove-class "active"
      $(this).parent().add-class "active"
      if $(this).parent().has-class "gs-tab"
        $div.find(".js-code").hide()
        $div.find(".gs-code").show()
      else
        $div.find(".gs-code").hide()
        let mutable $js-code = $div.find(".js-code")
        if $js-code.length == 0
          $js-code := $("<pre class='js-code'><code></code></pre>")
          $div.append $js-code
          let gs-code = $this.find("code").text()
          let js-code = GorillaScript.compile(gs-code, return: true, bare: true).code
          $js-code.find("code").text(js-code)
        $js-code.show()
      false