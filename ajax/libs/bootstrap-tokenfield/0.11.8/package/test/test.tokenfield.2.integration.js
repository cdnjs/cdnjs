describe('2. Integration tests:', function() {

  before(function() {
    require('../node_modules/jquery-simulate-ext/libs/bililiteRange');
    require('../node_modules/jquery-simulate-ext/libs/jquery.simulate');
    
    // https://github.com/j-ulrich/jquery-simulate-ext/issues/9
    // For us, it just saves a littlebit time
    global.$.simulate.ext_disableQuirkDetection = true;
    
    require('../node_modules/jquery-simulate-ext/src/jquery.simulate.ext');
    require('../node_modules/jquery-simulate-ext/src/jquery.simulate.key-combo');
    require('../node_modules/jquery-simulate-ext/src/jquery.simulate.key-sequence');
  });

  describe('Using an alternative delimiter', function() {
    before(function() {
      TFT.template = '<input type="text" class="tokenize" value="red;green;blue;yellow" />'
      TFT.options = {
        delimiter: ';'
      }
    });

    after(function() {
      delete TFT.template;
      delete TFT.options;
    });

    it('must create tokens by splitting the original value with delimiters', function() {
      this.$field.data('bs.tokenfield').$wrapper.find('.token').length.must.equal(4);
    });

    it('must create a token when the delimiting key is pressed and use the first delimiter for setting original input value', function() {
      this.$input.focus().simulate("key-sequence", { sequence: "purple;olive;" })
      this.$field.data('bs.tokenfield').$wrapper.find('.token').length.must.equal(6);
      this.$field.val().must.equal('red; green; blue; yellow; purple; olive');
    });    
  })

  describe('with multiple alternative delimiters', function() {
    describe("Delimiters: [' ', '.']", function() {
      before(function() {
        TFT.template = '<input type="text" class="tokenize" value="red green blue.yellow" />'
        TFT.options = {
          delimiter: [' ', '.']
        }
      });

      after(function() {
        delete TFT.template;
        delete TFT.options;
      });

      it('must create tokens by splitting the original value with delimiters', function() {
        this.$field.data('bs.tokenfield').$wrapper.find('.token').length.must.equal(4);
      });

      it('must create a token when the delimiting key is pressed and use the first delimiter for setting original input value', function() {
        this.$input.focus().simulate("key-sequence", { sequence: "purple olive." });
        this.$field.data('bs.tokenfield').$wrapper.find('.token').length.must.equal(6);
        this.$field.val().must.equal('red green blue yellow purple olive');
      });
    });

    describe("Delimiters: [',', ' ', '-', '_'] (Regression test for #79)", function() {
      before(function() {
        TFT.template = '<input type="text" class="tokenize" value="red,green blue-yellow_123" />'
        TFT.options = {
          delimiter: [',', ' ', '-', '_']
        }
      });

      after(function() {
        delete TFT.template;
        delete TFT.options;
      });

      it('must create tokens by splitting the original value with delimiters', function() {
        this.$field.data('bs.tokenfield').$wrapper.find('.token').length.must.equal(5);
      });
    });

    describe("Using regexp special characters as delimiters", function() {
      before(function() {
        TFT.template = '<input type="text" class="tokenize" value="red\\green$blue[yellow{orange^violet.purple|black?white*gray+silver(lime)navy" />'
        TFT.options = {
          delimiter: ['\\', '$', '[', '{', '^', '.', '|', '?', '*', '+', '(', ')']
        }
      });

      after(function() {
        delete TFT.template;
        delete TFT.options;
      });

      it('must create tokens by splitting the original value with delimiters', function() {
        this.$field.data('bs.tokenfield').$wrapper.find('.token').length.must.equal(13);
      });
    });
  });

  describe('Keyboard interaction', function() {

    describe("Pressing Ctrl+A", function() {
      before(function() {
        TFT.template = '<input type="text" class="tokenize" value="red,green,blue" />'
      });

      after(function() {
        delete TFT.template;
      });

      it("must select all tokens", function() {
        this.$input.focus().simulate("key-combo", { combo: "ctrl+a" });
        this.$field.tokenfield('getTokens', true).length.must.equal(3);
      });
    });

    describe("pressing Cmd+A", function() {
      before(function() {
        TFT.template = '<input type="text" class="tokenize" value="red,green,blue" />'
      });

      after(function() {
        delete TFT.template;
      });

      it("must select all tokens", function() {
        this.$input.focus().simulate("key-combo", { combo: "meta+a" });
        this.$field.tokenfield('getTokens', true).length.must.equal(3);
      });
    });

    describe("Pressing delete", function() {
      describe("when a token is selected", function() {
        before(function() {
          TFT.template = '<input type="text" class="tokenize" value="red,green,blue,yellow" />'
        });

        after(function() {
          delete TFT.template;
        });

        describe('and there are more tokens to the right of selected token', function() {
          it("must delete the selected token and move focus to the next token", function() {
            // Mark green as active
            this.$wrapper.find('.token')
                .filter(':has(.token-label:contains(green))').addClass('active');

            this.$copyHelper.simulate("key-sequence", { sequence: "{del}" });
            this.$field.tokenfield('getTokens').length.must.equal(3);
            this.$field.tokenfield('getTokensList', null, null, true).must.equal('blue');
          });
        })

        describe('and there are no more tokens to the right of the selected token', function() {
          it("must delete the selected token and move focus to input", function() {
            // Mark green as active
            this.$wrapper.find('.token')
                .filter(':has(.token-label:contains(yellow))').addClass('active');

            this.$copyHelper.simulate("key-sequence", { sequence: "{del}" });
            this.$field.tokenfield('getTokens').length.must.equal(3);
            this.$field.tokenfield('getTokensList', null, null, true).must.equal('');
            this.$input.is(document.activeElement).must.be.true();
          });
        })
      });

      describe("when multiple tokens are selected", function() {
        before(function() {
          TFT.template = '<input type="text" class="tokenize" value="red,green,blue,yellow,purple" />'
        });

        after(function() {
          delete TFT.template;
        });

        describe('and there are more tokens to the right of selected tokens', function() {
          it("must delete the selected tokens and move focus to the next token of the rightmost selected token", function() {
            // Mark green and yellow as active
            this.$wrapper.find('.token')
                .filter(':has(.token-label:contains(green))').addClass('active');
            this.$wrapper.find('.token')
                .filter(':has(.token-label:contains(yellow))').addClass('active');

            this.$copyHelper.simulate("key-sequence", { sequence: "{del}" });
            this.$field.tokenfield('getTokens').length.must.equal(3);
            this.$field.tokenfield('getTokensList', null, null, true).must.equal('purple');
          });
        });

        describe('and there are no more tokens to the right of selected tokens', function() {
          it("must delete the selected tokens and move focus input", function() {
            // Mark green and yellow as active
            this.$wrapper.find('.token')
                .filter(':has(.token-label:contains(green))').addClass('active');
            this.$wrapper.find('.token')
                .filter(':has(.token-label:contains(purple))').addClass('active');

            this.$copyHelper.simulate("key-sequence", { sequence: "{del}" });
            this.$field.tokenfield('getTokens').length.must.equal(3);
            this.$field.tokenfield('getTokensList').must.equal('red, blue, yellow');
            this.$input.is(document.activeElement).must.be.true();

          });
        });
      });
    });

    describe("Pressing backspace", function() {
      describe("when a token is selected", function() {
        before(function() {
          TFT.template = '<input type="text" class="tokenize" value="red,green,blue,yellow" />'
        });

        after(function() {
          delete TFT.template;
        });

        describe('and there are more tokens to the left of selected token', function() {
          it("must delete the selected token and move focus to the previous token", function() {
            // Mark green as active
            this.$wrapper.find('.token')
                .filter(':has(.token-label:contains(blue))').addClass('active');

            this.$copyHelper.simulate("key-sequence", { sequence: "{backspace}" });
            this.$field.tokenfield('getTokens').length.must.equal(3);
            this.$field.tokenfield('getTokensList', null, null, true).must.equal('green');
          });
        })

        describe('and there are no more tokens to the left of the selected token', function() {
          it("must delete the selected token and move focus to input", function() {
            // Mark green as active
            this.$wrapper.find('.token')
                .filter(':has(.token-label:contains(red))').addClass('active');

            this.$copyHelper.simulate("key-sequence", { sequence: "{backspace}" });
            this.$field.tokenfield('getTokens').length.must.equal(3);
            this.$field.tokenfield('getTokensList', null, null, true).must.equal('');
            this.$input.is(document.activeElement).must.be.true();
          });
        })
      });

      describe("when multiple tokens are selected", function() {
        before(function() {
          TFT.template = '<input type="text" class="tokenize" value="red,green,blue,yellow,purple" />'
        });

        after(function() {
          delete TFT.template;
        });

        describe('and there are more tokens to the left of selected tokens', function() {
          it("must delete the selected tokens and move focus to the previous token of the leftmost selected token", function() {
            // Mark green and yellow as active
            this.$wrapper.find('.token')
                .filter(':has(.token-label:contains(green))').addClass('active');
            this.$wrapper.find('.token')
                .filter(':has(.token-label:contains(yellow))').addClass('active');

            this.$copyHelper.simulate("key-sequence", { sequence: "{backspace}" });
            this.$field.tokenfield('getTokens').length.must.equal(3);
            this.$field.tokenfield('getTokensList', null, null, true).must.equal('red');
          });
        });

        describe('and there are no more tokens to the left of selected tokens', function() {
          it("must delete the selected tokens and move focus input", function() {
            // Mark green and yellow as active
            this.$wrapper.find('.token')
                .filter(':has(.token-label:contains(red))').addClass('active');
            this.$wrapper.find('.token')
                .filter(':has(.token-label:contains(purple))').addClass('active');

            this.$copyHelper.simulate("key-sequence", { sequence: "{backspace}" });
            this.$field.tokenfield('getTokens').length.must.equal(3);
            this.$field.tokenfield('getTokensList').must.equal('green, blue, yellow');
            this.$input.is(document.activeElement).must.be.true();
          });
        });
      });

      describe("when focus is on input", function() {
        before(function() {
          TFT.template = '<input type="text" class="tokenize" value="red,green,blue" />'
        });

        after(function() {
          delete TFT.template;
        });

        it("must move focus to the last token", function() {
          this.$input.simulate("key-sequence", { sequence: "{backspace}" });
          this.$field.tokenfield('getTokensList', null, null, true ).must.equal('blue');
        });
      });
    });

    describe("Pressing left arrow key", function() {
      describe("when no tokens are selected", function() {
        before(function() {
          TFT.template = '<input type="text" class="tokenize" value="red,green,blue" />'
        });

        after(function() {
          delete TFT.template;
        });

        it("must move focus to the last token", function() {
          this.$input.simulate("key-sequence", { sequence: "{leftarrow}" });
          this.$field.tokenfield('getTokensList', null, null, true ).must.equal('blue');
        });
      });

      describe("when a token is selected", function() {
        before(function() {
          TFT.template = '<input type="text" class="tokenize" value="red,green,blue" />'
        });

        after(function() {
          delete TFT.template;
        });

        it("must move focus to the previous token", function() {
          this.$wrapper.find('.token')
              .filter(':has(.token-label:contains(blue))').addClass('active');

          this.$copyHelper.simulate("key-sequence", { sequence: "{leftarrow}" });
          this.$field.tokenfield('getTokensList', null, null, true ).must.equal('green');
        });
      });

      describe("when multiple tokens are selected", function() {
        before(function() {
          TFT.template = '<input type="text" class="tokenize" value="red,green,blue,yellow" />'
        });

        after(function() {
          delete TFT.template;
        });

        it("must move focus to the previous token of the leftmost selected token", function() {
          this.$wrapper.find('.token')
              .filter(':has(.token-label:contains(green))').addClass('active');
          this.$wrapper.find('.token')
              .filter(':has(.token-label:contains(yellow))').addClass('active');
                  
          this.$copyHelper.simulate("key-sequence", { sequence: "{leftarrow}" });
          this.$field.tokenfield('getTokensList', null, null, true ).must.equal('red');
        });
      });

      describe("when the first token is selected", function() {
        before(function() {
          TFT.template = '<input type="text" class="tokenize" value="red,green,blue" />'
        });

        after(function() {
          delete TFT.template;
        });

        it("must keep the focus on the first token", function() {
          this.$wrapper.find('.token')
              .filter(':has(.token-label:contains(red))').addClass('active');

          this.$copyHelper.simulate("key-sequence", { sequence: "{leftarrow}" });
          this.$field.tokenfield('getTokensList', null, null, true ).must.equal('red');
        });
      });

      describe("when no tokens are selected and direction is RTL", function() {
        before(function() {
          TFT.template = '<input type="text" class="tokenize" value="red,green,blue" style="direction:rtl" />'
        });

        after(function() {
          delete TFT.template;
        });

        it("must keep the focus on the input", function() {
          this.$input.simulate("key-sequence", { sequence: "{leftarrow}" });
          this.$field.tokenfield('getTokensList', null, null, true ).must.equal('');          
          this.$input.is(document.activeElement).must.be.true();
        });
      });
    });

    describe("Pressing right arrow key", function() {
      describe("when no tokens are selected", function() {
        before(function() {
          TFT.template = '<input type="text" class="tokenize" value="red,green,blue" />'
        });

        after(function() {
          delete TFT.template;
        });

        it("must keep the focus on the input", function() {
          this.$input.simulate("key-sequence", { sequence: "{rightarrow}" });
          this.$field.tokenfield('getTokensList', null, null, true ).must.equal('');          
          this.$input.is(document.activeElement).must.be.true();
        });
      });

      describe("when a token is selected", function() {
        before(function() {
          TFT.template = '<input type="text" class="tokenize" value="red,green,blue" />'
        });

        after(function() {
          delete TFT.template;
        });

        it("must move focus to the next token", function() {
          this.$wrapper.find('.token')
              .filter(':has(.token-label:contains(red))').addClass('active');
                  
          this.$copyHelper.simulate("key-sequence", { sequence: "{rightarrow}" });
          this.$field.tokenfield('getTokensList', null, null, true ).must.equal('green');
        });
      });

      describe("when multiple tokens are selected", function() {
        before(function() {
          TFT.template = '<input type="text" class="tokenize" value="red,green,blue,yellow" />'
        });

        after(function() {
          delete TFT.template;
        });

        it("must move focus to the next token of the rightmost selected token", function() {
          this.$wrapper.find('.token')
              .filter(':has(.token-label:contains(red))').addClass('active');
          this.$wrapper.find('.token')
              .filter(':has(.token-label:contains(blue))').addClass('active');
                  
          this.$copyHelper.simulate("key-sequence", { sequence: "{rightarrow}" });
          this.$field.tokenfield('getTokensList', null, null, true ).must.equal('yellow');
        });
      });

      describe("when the last token is selected", function() {
        before(function() {
          TFT.template = '<input type="text" class="tokenize" value="red,green,blue" />'
        });

        after(function() {
          delete TFT.template;
        });

        it("must move the focus to the input", function() {
          this.$wrapper.find('.token')
              .filter(':has(.token-label:contains(blue))').addClass('active');
                  
          this.$copyHelper.simulate("key-sequence", { sequence: "{rightarrow}" });
          this.$field.tokenfield('getTokensList', null, null, true ).must.equal('');
          this.$input.is(document.activeElement).must.be.true();
        });
      });

      describe("when no tokens are selected and direction is RTL", function() {
        before(function() {
          TFT.template = '<input type="text" class="tokenize" value="red,green,blue" style="direction:rtl" />'
        });

        after(function() {
          delete TFT.template;
        });

        it("must move focus to the last token", function() {
          this.$input.simulate("key-sequence", { sequence: "{rightarrow}" });
          this.$field.tokenfield('getTokensList', null, null, true ).must.equal('blue');
        });
      });      
    });

    describe("Pressing Shift + left arrow key", function() {
      describe("when no tokens are selected", function() {
        before(function() {
          TFT.template = '<input type="text" class="tokenize" value="red,green,blue" />'
        });

        after(function() {
          delete TFT.template;
        });

        it("must move focus to the last token", function() {
          this.$input.focus().simulate("keydown", { keyCode: 37, charCode: 37, shiftKey: true });
          this.$field.tokenfield('getTokensList', null, null, true ).must.equal('blue');
        });
      });

      describe("when a token is selected", function() {
        before(function() {
          TFT.template = '<input type="text" class="tokenize" value="red,green,blue" />'
        });

        after(function() {
          delete TFT.template;
        });

        it("must activate the previous token in addition to the already active token", function() {
          this.$wrapper.find('.token')
              .filter(':has(.token-label:contains(blue))').addClass('active');

          this.$copyHelper.focus()
                          .simulate("keydown", { keyCode: 37, shiftKey: true })
                          .simulate("keydown", { keyCode: 37, shiftKey: true });
          this.$field.tokenfield('getTokensList', null, null, true ).must.equal('red, green, blue');
        });
      });

      describe("when multiple, non-adjacent tokens are selected", function() {
        before(function() {
          TFT.template = '<input type="text" class="tokenize" value="red,green,blue,yellow,purple" />'
        });

        after(function() {
          delete TFT.template;
        });

        it("must move select the previous token of the leftmost selected token in addition to the already selected tokens", function() {
          this.$wrapper.find('.token')
              .filter(':has(.token-label:contains(green))').addClass('active');
          this.$wrapper.find('.token')
              .filter(':has(.token-label:contains(yellow))').addClass('active');

          this.$copyHelper.focus().simulate("keydown", { keyCode: 37, shiftKey: true });
          this.$field.tokenfield('getTokensList', null, null, true ).must.equal('red, green, yellow');
        });
      });     
    });

    describe("Pressing Shift + right arrow key", function() {
      describe("when a token is selected", function() {
        before(function() {
          TFT.template = '<input type="text" class="tokenize" value="red,green,blue" />'
        });

        after(function() {
          delete TFT.template;
        });

        it("must activate the next token in addition to the already active token", function() {
          this.$wrapper.find('.token')
              .filter(':has(.token-label:contains(red))').addClass('active');

          this.$copyHelper.focus()
                          .simulate("keydown", { keyCode: 39, shiftKey: true })
                          .simulate("keydown", { keyCode: 39, shiftKey: true });
          this.$field.tokenfield('getTokensList', null, null, true ).must.equal('red, green, blue');
        });
      });

      describe("when multiple, non-adjacent tokens are selected", function() {
        before(function() {
          TFT.template = '<input type="text" class="tokenize" value="red,green,blue,yellow,purple" />'
        });

        after(function() {
          delete TFT.template;
        });

        it("must move select the next token of the rightmost selected token in addition to the already selected tokens", function() {
          this.$wrapper.find('.token')
              .filter(':has(.token-label:contains(green))').addClass('active');
          this.$wrapper.find('.token')
              .filter(':has(.token-label:contains(yellow))').addClass('active');

          this.$copyHelper.focus().simulate("keydown", { keyCode: 39, shiftKey: true });
          this.$field.tokenfield('getTokensList', null, null, true ).must.equal('green, yellow, purple');
        });
      });
    });

    describe("Pressing Enter key", function() {
      describe("when a token is selected", function() {
        before(function() {
          TFT.template = '<input type="text" class="tokenize" value="red,green,blue" />'
        });

        after(function() {
          delete TFT.template;
        });

        it("must enter edit mode for the active token", function() {
          this.$wrapper.find('.token')
              .filter(':has(.token-label:contains(green))').addClass('active');

          this.$copyHelper.simulate("key-sequence", { sequence: "{enter}" });
          this.$input.data('edit').must.be.true();
          this.$input.prev(':contains(red)').must.have.length(1);
          this.$input.next(':contains(blue)').must.have.length(1);
        });
      });

      describe("when a token is selected and allowEditing is false", function() {
        before(function() {
          TFT.template = '<input type="text" class="tokenize" value="red,green,blue" />';
          TFT.options = { allowEditing: false }
        });

        after(function() {
          delete TFT.template;
          delete TFT.options;
        });

        it("must not enter edit mode for the active token [no data('edit') property]", function() {
          this.$wrapper.find('.token')
              .filter(':has(.token-label:contains(green))').addClass('active');

          this.$copyHelper.simulate("key-sequence", { sequence: "{enter}" });
          this.$input.data().must.not.have.property('edit');
        });
      });

      describe("when input has text", function() {
        before(function() {
          TFT.template = '<input type="text" class="tokenize" value="red,green,blue" />'
        });

        after(function() {
          delete TFT.template;
        });

        it("must create a new token from the input", function() {

          this.$input.simulate("key-sequence", { sequence: "purple{enter}" });
          this.$field.tokenfield('getTokens').must.have.length(4);
        });
      });
    });

    describe("Pressing Tab key", function() {
      describe("when input has text", function() {
        before(function() {
          TFT.template = '<input type="text" class="tokenize" value="red,green,blue" />'
        });

        after(function() {
          delete TFT.template;
        });

        it("must create a new token from the input", function() {

          this.$input.focus().simulate("key-sequence", { sequence: "purple" });
          this.$input.simulate("keydown", { keyCode: 9 });
          this.$field.tokenfield('getTokens').must.have.length(4);
        });
      });
    });
  });

  describe("Mouse interaction", function() {

    describe("Clicking on a token", function() {
      before(function() {
        TFT.template = '<input type="text" class="tokenize" value="red,green,blue" />'
      });

      after(function() {
        delete TFT.template;
      });

      it("must select the token and deactivate any other active tokens", function() {
        this.$wrapper.find('.token')
            .filter(':has(.token-label:contains(green))').addClass('active');

        this.$wrapper.find('.token:contains(red)').click();
        this.$field.tokenfield('getTokensList', null, null, true ).must.equal('red');
      });
    });

    describe("Clicking on a token's remove icon", function() {
      before(function() {
        TFT.template = '<input type="text" class="tokenize" value="red,green,blue" />'
      });

      after(function() {
        delete TFT.template;
      });

      it("must remove the token", function() {                
        this.$wrapper.find('.token:contains(red)').find('.close').click();
        this.$field.tokenfield('getTokensList' ).must.equal('green, blue');
      });
    });

    describe("Double-clicking on a token", function() {
      before(function() {
        TFT.template = '<input type="text" class="tokenize" value="red,green,blue" />'
      });

      after(function() {
        delete TFT.template;
      });

      it("must enter the edit mode of the token", function() {
        this.$wrapper.find('.token')
            .filter(':has(.token-label:contains(green))').addClass('active');
                
        this.$wrapper.find('.token:contains(red)').dblclick();
        this.$input.data('edit').must.be.true();
        this.$input.next(':contains(green)').must.have.length(1);        
      });
    });

    describe("must not enter the edit mode of the token when allowEditing false", function() {
      before(function() {
        TFT.template = '<input type="text" class="tokenize" value="red,green,blue" />';
        TFT.options = { allowEditing: false }
      });

      after(function() {
        delete TFT.template;
        delete TFT.options;
     });

      it("must not enter the edit mode of the token", function() {
        this.$wrapper.find('.token:contains(red)').dblclick();
        this.$input.data().must.not.have.property('edit');
      });
    });

    describe("Ctrl-clicking on a token when another token is selected", function() {
      before(function() {
        TFT.template = '<input type="text" class="tokenize" value="red,green,blue" />'
      });

      after(function() {
        delete TFT.template;
      });

      it("must activate the token in addition to the already active token", function() {
        this.$wrapper.find('.token')
            .filter(':has(.token-label:contains(green))').addClass('active');
                
        this.$wrapper.find('.token:contains(red)').simulate('click', { ctrlKey: true });
        this.$field.tokenfield('getTokensList', null, null, true ).must.equal('red, green');
      });
    }); 

    describe("Shift-clicking on a token when another token is selected", function() {
      before(function() {
        TFT.template = '<input type="text" class="tokenize" value="red,green,blue" />'
      });

      after(function() {
        delete TFT.template;
      });

      it("must activate the token and all the tokens between the already active token", function() {
        this.$wrapper.find('.token:contains(blue)').simulate('click');
        this.$wrapper.find('.token:contains(red)').simulate('click', { shiftKey: true });
        this.$field.tokenfield('getTokensList', null, null, true ).must.equal('red, green, blue');
      });
    });

    describe("Pressing enter when there is no input", function() {
      var submitted = false;

      before(function() {
        TFT.template = '<form method="post" action=""><input type="text" class="tokenize" value="red,green,blue" /><input type="submit"></form>';
      });

      after(function() {
        delete TFT.template;
      });      

      beforeEach(function() {
        this.$sandbox.find('form').on('submit', function(e) {
          submitted = true;
          e.preventDefault();
          return false;
        });
        // key-sequence does not trigger submit event on the form when pressing enter
        // so we need to trigger it manually. Not really a solid test-case, but oh well
        // https://github.com/j-ulrich/jquery-simulate-ext/pull/14
        this.$input.focus().simulate("key-sequence", { sequence: "{enter}" }).trigger('submit');
      });

      it("must submit the underlying form", function() {
        submitted.must.equal(true);
      });
    });
  });

  describe("Duplicates", function() {
    
    describe("Setting allowDuplicates to false", function() {
      var submitted = false;

      before(function() {
        TFT.template = '<form method="post" action=""><input type="text" class="tokenize" value="red,green,blue" /><input type="submit"></form>';
        TFT.options = { allowDuplicates: false }
      });

      after(function() {
        delete TFT.template;
        delete TFT.options;
      });

      beforeEach(function() {
        this.$sandbox.find('form').on('submit', function(e) {
          submitted = true;
          event.preventDefault()
          return false;
        });      
        this.$input.focus().simulate("key-sequence", { sequence: "red{enter}" });
      });

      it("must not create a duplicate token", function() {
        this.$field.tokenfield('getTokensList').must.equal('red, green, blue');
      });

      it("must add duplicate class to the existing token", function() {
        this.$sandbox.find( '.token[data-value="red"]' ).hasClass('duplicate').must.equal(true);
      });

      it("must keep the duplicate value in the input", function() {
        // key-sequnce acts a bit weird on node by adding a newline
        // at the beginning when pressing enter. So we need to
        // remove it by hand before comparing values
        this.$input.val().replace(/\n/g, '').must.equal('red');
      });

      it("must not submit the form when pressing enter", function(done) {
        setTimeout(function() {
          submitted.must.equal(false);
          done();
        }, 1);
      });
    });
    
    describe("Setting allowDuplicates to true", function() {
      var submitted = false;

      before(function() {
        TFT.template = '<form method="post" action=""><input type="text" class="tokenize" value="red,green,blue" /><input type="submit"></form>';
        TFT.options = { allowDuplicates: true }
      });

      after(function() {
        delete TFT.template;
        delete TFT.options;
      });

      beforeEach(function() {
        this.$sandbox.find('form').on('submit', function (event) {
          submitted = true;
          event.preventDefault()
          return false;
        });
        this.$input.focus().simulate("key-sequence", { sequence: "red{enter}" });
      });

      it("must create a duplicate token", function() {
        this.$field.tokenfield('getTokensList').must.equal('red, green, blue, red');
      });

      it("must not keep the duplicate value in the input", function() {
        this.$input.val().must.equal('');
      });

      it("must not submit the form when pressing enter", function(done) {
        setTimeout(function() {
          submitted.must.equal(false);
          done();
        }, 1);
      });
    });
  });

  describe("Events", function() {
    
    describe("tokenfield:initialize", function() {
      it("must must be triggered when tokenfield is created", function (done) {
        $('<input type="text" />')
          .on('tokenfield:initialize', function() {
            done();
          })
          .tokenfield();
      });
    });

    describe("tokenfield:preparetoken", function() {
      it("must allow changing token field and value", function() {
        this.$field.on('tokenfield:preparetoken', function (e) {
          e.token.value = 'one';
          e.token.label = 'two';
        });
        this.$field.tokenfield('createToken', 'zero');

        var results = this.$field.tokenfield('getTokens');
        results[0].label.must.equal('two');
        results[0].value.must.equal('one');
      });

      it("must allow setting token value to an empty string", function() {
        this.$field.on('tokenfield:preparetoken', function (e) {
          e.token.value = '';
        });
        this.$field.tokenfield('createToken', 'zero');

        var results = this.$field.tokenfield('getTokens');
        results[0].label.must.equal('zero');
        results[0].value.must.equal('');        
      });
    });

    describe("tokenfield:preventduplicate", function() {
      before(function() {
        TFT.template = '<input type="text" class="tokenize" value="red,green,blue" />';
        TFT.options = { allowDuplicates: false }
      });

      after(function() {
        delete TFT.template;
        delete TFT.options;
      });

      it("must be triggered when a duplicate token is being prevented from created", function (done) {
        this.$field.on('tokenfield:preventduplicate', function (e) {
          e.token.must.be.an.object();
          e.token.label.must.eql('red')
          e.token.value.must.eql('red')
          done();
        });
        
        this.$field.tokenfield('createToken', 'red');
      });
    });

    describe("tokenfield:createtoken", function() {
      it("must be triggered when a token is created", function (done) {
        this.$field.on('tokenfield:createtoken', function (e) {
          e.token.must.be.an.object();
          e.token.label.must.eql('red');
          e.token.value.must.eql('red');
          e.relatedTarget.must.be.an.object();
          done();
        });
        
        this.$field.tokenfield('createToken', 'red');
      });
    });

    describe("tokenfield:edittoken", function() {
      before(function() {
        TFT.template = '<input type="text" class="tokenize" value="red,green,blue" />'
      });

      after(function() {
        delete TFT.template;
      });

      it("must be triggered when a token is edited", function (done) {
        this.$field.on('tokenfield:edittoken', function (e) {
          e.token.must.be.an.object();
          e.token.label.must.eql('red');
          e.token.value.must.eql('red');
          e.relatedTarget.must.be.an.object();
          done();
        });

        this.$wrapper.find('.token')
            .filter(':has(.token-label:contains(red))').addClass('active');

        this.$copyHelper.simulate("key-sequence", { sequence: "{enter}" });
      });
    });

    describe("tokenfield:removetoken", function() {
      before(function() {
        TFT.template = '<input type="text" class="tokenize" value="red,green,blue" />'
      });

      after(function() {
        delete TFT.template;
      });

      it("must be triggered when a token is removed", function (done) {
        this.$field.on('tokenfield:removetoken', function (e) {
          e.token.must.be.an.object();
          e.token.label.must.eql('red');
          e.token.value.must.eql('red');
          done();
        });

        this.$wrapper.find('.token:first').find('.close').click();
      });
    });

  });

});
