describe('1. Unit tests:', function() {

  describe('initializing tokenfield', function() {
    describe('with an empty input', function() {

      it('must wrap the original input with the wrapper element', function() {
        this.$field.parents('.tokenfield').hasClass('form-control').must.be.true();
      });

      it('must create a new input element for token input', function() {
        this.$field.parents('.tokenfield').find('.token-input').length.must.equal(1);
      });

      it('must move the original input out of the way', function() {
        this.$field.css('position').must.equal('absolute');
        this.$field.css('left').must.equal('-10000px');
      });

      it('must not create any tokens', function() {
        this.$wrapper.find('.token').length.must.equal(0);
      });

    });

    describe('with an input with comma-separated values', function() {

      before(function() {
        TFT.template = '<input type="text" class="tokenize" value="red,green, blue" />';
      });

      after(function() {
        TFT.template = null;
      });

      it('must create tokens for each comma-separated value', function() {
        this.$wrapper.find('.token').length.must.equal(3);
      });

    });

    describe('with an input with data-tokens values', function() {

      before(function() {
        TFT.template = '<input type="text" class="tokenize" data-tokens="red, green, blue" />';
      });

      after(function() {
        TFT.template = null;
      });

      it('must create tokens for each comma-separated token', function() {
        this.$wrapper.find('.token').length.must.equal(3);
      });

    });

    describe('with RTL', function() {
      before(function() {
        TFT.template = '<input type="text" class="tokenize" style="direction:rtl" value="red,green, blue" />';
      });

      after(function() {
        TFT.template = null;
      });

      it('must set rtl class on tokenfield', function() {
        this.$wrapper.hasClass('rtl').must.equal(true);
      });
    })

  });

  describe('destroying tokenfield', function() {
    before(function() {
      TFT.template = '<div id="destroy-test-container"><label for="destroy-test"></label><input type="text" id="destroy-test" class="tokenize" value="red,green, blue" /></div>';
    });

    after(function() {
      TFT.template = null;
    });

    it('must reset the original input to previous state', function() {
      var $field = this.$field.tokenfield('destroy');
      $field.must.be.an.object();
      $field.data().must.not.have.property('bs.tokenfield');
      $field.parent().prop('id').must.equal('destroy-test-container');
      $field.val().must.equal('red, green, blue');
    });
  });

  describe('Tokenfield public methods', function() {

    describe('.createToken()', function() {

      describe('using an empty input', function() {

        beforeEach(function() {
          this.$field.tokenfield('createToken', 'awesome');
        });

        it('must create a new token', function() {
          this.$wrapper.find('.token').must.have.length(1);
        });

        it('add the new token value to original input', function() {
          this.$field.val().must.equal('awesome');
        });

      });

      describe('using a non-empty input', function() {

        before(function() {
          TFT.template = '<input type="text" class="tokenize" value="red,green, blue" />';
        });

        beforeEach(function() {
          this.$field.tokenfield('createToken', 'awesome');
        });

        after(function() {
          TFT.template = null;
        });      

        it('must append a new token to the end of existing tokens', function() {
          this.$field.val().must.equal('red, green, blue, awesome');
        });

      });

      describe('given an object', function() {

        beforeEach(function() {
          this.$field.tokenfield('createToken', { value: 'purple', label: 'Violet' });
        });

        it('must create a new token', function() {
          this.$wrapper.find('.token').must.have.length(1);
        });

        it('add the new token value to original input', function() {
          this.$field.val().must.equal('purple');
        });

      });

    });  

    describe('.getTokens()', function() {

      describe('given no arguments', function() {
        before(function() {
          TFT.template = '<input type="text" class="tokenize" value="red,green, blue" />';
        });

        after(function() {
          TFT.template = null;
        });

        it('must return an array of token key-value pairs', function() {
          var tokens = this.$field.tokenfield('getTokens');
          tokens.must.be.an.array();
          tokens.must.have.length(3);
          tokens[0].must.have.keys(['label', 'value']);
          tokens[0].label.must.equal('red');
          tokens[0].value.must.equal('red');
        });
      });

      describe('given arguments active = true', function() {
        before(function() {
          TFT.template = '<input type="text" class="tokenize" value="red,green,blue" />';
        });

        after(function() {
          TFT.template = null;
        });

        it('must return an array of only active token key-value pairs', function() {
          // Mark green as active
          this.$wrapper.find('.token')
              .filter(':has(.token-label:contains(green))').addClass('active');

          var tokens = this.$field.tokenfield('getTokens', true);
          tokens.must.be.an.array();
          tokens.must.have.length(1);
          tokens[0].must.have.keys(['label', 'value']);
          tokens[0].label.must.equal('green');
          tokens[0].value.must.equal('green');
        });
      });


    });

    describe('getTokensList()', function() {

      describe('given no arguments', function() {
        before(function() {
          TFT.template = '<input type="text" class="tokenize" value="red,green, blue" />';
        });

        after(function() {
          TFT.template = null;
        });   

        it('must return a string with comma-separated token values', function() {
          var tokens = this.$field.tokenfield('getTokensList');
          tokens.must.be.a.string();
          tokens.must.equal('red, green, blue');
        });
      });

      describe('given an alternative delimiter', function() {
        before(function() {
          TFT.template = '<input type="text" class="tokenize" value="red,green,blue" />';
        });

        after(function() {
          TFT.template = null;
        });   

        it('must return a string with semicolon-separated token values', function() {
          var tokens = this.$field.tokenfield('getTokensList', ';', false);
          tokens.must.be.a.string();
          tokens.must.equal('red;green;blue');
        });
      });

      describe('given an alternative delimiter and active = true', function() {
        before(function() {
          TFT.template = '<input type="text" class="tokenize" value="red,green,blue,yellow" />';
        });

        after(function() {
          TFT.template = null;
        });   

        it('must return a string with semicolon-separated token values', function() {
          // Mark green and yellow as active
          this.$wrapper.find('.token')
              .filter(':has(.token-label:contains(green))').addClass('active');
          this.$wrapper.find('.token')
              .filter(':has(.token-label:contains(yellow))').addClass('active');

          var tokens = this.$field.tokenfield('getTokensList', ';', false, true);
          tokens.must.be.a.string();
          tokens.must.equal('green;yellow');
        });
      });


    });

    describe('setTokens()', function() {

      describe('using comma-separated string', function() {

        before(function() {
          TFT.template = '<input type="text" class="tokenize" value="red,green, blue" />';
        });

        beforeEach(function(){
          this.$field.tokenfield('setTokens', 'black,yellow,white');
        });

        after(function() {
          TFT.template = null;
        });

        it('must replace any existing tokens with new ones', function() {
          var tokens = this.$field.tokenfield('getTokens')
            , tokensList = this.$field.tokenfield('getTokensList');

          tokens.must.have.length(3);
          tokens[0].must.have.keys(['label', 'value']);
          tokens[0].label.must.equal('black');
          tokens[0].value.must.equal('black');

          tokensList.must.not.contain('red');

        });

        it('must set the original input value to comma-separated list of token values', function() {
          this.$field.val().must.equal('black, yellow, white');
        });
        
      });

      describe('using an array of string values', function() {

        before(function() {
          TFT.template = '<input type="text" class="tokenize" value="red,green, blue" />';
        });

        beforeEach(function(){
          this.$field.tokenfield('setTokens', 'black,yellow,white');
        });      

        after(function() {
          TFT.template = null;
        });

        it('must replace any existing tokens with new ones', function() {
          var tokens = this.$field.tokenfield('getTokens')
            , tokensList = this.$field.tokenfield('getTokensList');

          tokens.must.have.length(3);
          tokens[0].must.have.keys(['label', 'value']);
          tokens[0].label.must.equal('black');
          tokens[0].value.must.equal('black');

          tokensList.must.not.contain('red');

        });

        it('must set the original input value to comma-separated list of token values', function() {
          this.$field.val().must.equal('black, yellow, white');
        });

      });

      describe('using an array of token objects', function() {

        before(function() {
          TFT.template = '<input type="text" class="tokenize" value="red,green, blue" />';
        });

        beforeEach(function(){
          this.$field.tokenfield('setTokens', [{ value: "black", label: "Schwarz" }, { value: "yellow", label: "Gelb" }]);
        });      

        after(function() {
          TFT.template = null;
        });

        it('must replace any existing tokens with new ones', function() {
          this.$field.tokenfield('setTokens', [{ value: "black", label: "Schwarz" }, { value: "yellow", label: "Gelb" }]);

          var tokens = this.$field.tokenfield('getTokens')
            , tokensList = this.$field.tokenfield('getTokensList');

          tokens.must.have.length(2);
          tokens[0].must.have.keys(['label', 'value']);
          tokens[0].label.must.equal('Schwarz');
          tokens[0].value.must.equal('black');

          tokensList.must.not.contain('red');

        });

        it('must set the original input value to comma-separated list of token values', function() {
          this.$field.val().must.equal('black, yellow');
        });      

      });

    });

    describe('disable()', function() {

      beforeEach(function() {
        this.$field.tokenfield('disable');
      });

      it('must disable both original and token input', function() {
        this.$field.prop('disabled').must.be.true();
        this.$input.prop('disabled').must.be.true();
      });

      it('must add "disabled" class to tokenfield', function() {
        this.$wrapper.hasClass('disabled').must.be.true();
      });

    });  

    describe('enable()', function() {

      beforeEach(function() {
        this.$field.tokenfield('disable');
        this.$field.tokenfield('enable');
      });

      it('must enable both original and token input', function() {
        this.$field.prop('disabled').must.be.false();
        this.$input.prop('disabled').must.be.false();
      });

      it('must remove "disabled" class from tokenfield', function() {
        this.$wrapper.hasClass('disabled').must.be.false();
      });

    });  
  });

});