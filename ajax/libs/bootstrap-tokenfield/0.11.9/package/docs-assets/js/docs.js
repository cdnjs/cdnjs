jQuery(function(){
  // Track downloads
  $('#download-master').click(function(){
    _trackEvent('Downloads', 'master');
  });
});

jQuery(document).ready(function($) {

  /* Docs scrollspy */
  $('body').scrollspy({
    target: '.bs-sidebar',
    offset: 0
  })

  $(window).on('load', function () {
    $('body').scrollspy('refresh')
  })

  // back to top
  setTimeout(function () {
    var $sideBar = $('.bs-sidebar')

    $sideBar.affix({
      offset: {
        top: function () {
          var offsetTop      = $sideBar.offset().top
          var sideBarMargin  = parseInt($sideBar.children(0).css('margin-top'), 10)

          return (this.top = offsetTop - sideBarMargin)
        }
      , bottom: function () {
          return (this.bottom = $('.bs-footer').outerHeight(true))
        }
      }
    })
  }, 100)  

  /* Run examples */
  $('.token-example-field').tokenfield();

  $('#tokenfield-1').tokenfield({
    autocomplete: {
      source: ['red','blue','green','yellow','violet','brown','purple','black','white'],
      delay: 100
    },
    showAutocompleteOnFocus: true,
    delimiter: [',',' ', '-', '_']
  });

  var engine = new Bloodhound({
    local: [{value: 'red'}, {value: 'blue'}, {value: 'green'} , {value: 'yellow'}, {value: 'violet'}, {value: 'brown'}, {value: 'purple'}, {value: 'black'}, {value: 'white'}],
    datumTokenizer: function(d) {
      return Bloodhound.tokenizers.whitespace(d.value); 
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace    
  });
  engine.initialize();

  $('#tokenfield-typeahead').tokenfield({
    typeahead: {
      source: engine.ttAdapter()
    }
  });

  $('#tokenfield-2')
    .on('tokenfield:preparetoken', function (e) {
      var token = e.token.value.split('|')
      e.token.value = token[1] || token[0]
      e.token.label = token[1] ? token[0] + ' (' + token[1] + ')' : token[0]
    })
    .on('tokenfield:createtoken', function (e) {
      // Über-simplistic e-mail validation
      var re = /\S+@\S+\.\S+/
      var valid = re.test(e.token.value)
      if (!valid) {
        $(e.relatedTarget).addClass('invalid')
      }
    })
    .on('tokenfield:edittoken', function (e) {
      if (e.token.label !== e.token.value) {
        var label = e.token.label.split(' (')
        e.token.value = label[0] + '|' + e.token.value
      }
    })
    .on('tokenfield:removetoken', function (e) {
      if (e.token.length > 1) {
        var values = $.map(e.token, function (token) { return token.value });
        alert(e.token.length + ' tokens removed! Token values were: ' + values.join(', '))
      } else {
        alert('Token removed! Token value was: ' + e.token.value)
      } 
    })
    .on('tokenfield:preventduplicate', function (e) {
      alert('Duplicate detected! Token value is: ' + e.token.value)
    })
    .tokenfield()
  
});