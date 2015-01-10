/**
 * Common Lisp syntax highlighter
 *
 * @version 0.1.1
 * @author Andrew "Danger" Lyon
 * @copyright Lyon Bros. Enterprises, LLC
 * @licence MIT
 */
var highlight_lisp = function() {
	// all of the following functions were pulled straight from my syntax/lisp.vim
	// file in my vim directory.
	var funcs =
		'\\* find-method pprint-indent find-package pprint-linear find-restart ' +
		'pprint-logical-block \\+ find-symbol pprint-newline finish-output ' +
		'pprint-pop first pprint-tab - fixnum pprint-tabular / flet prin1 // float ' +
		'prin1-to-string /// float-digits princ /= float-precision princ-to-string 1\\+ ' +
		'float-radix print 1- float-sign print-not-readable < floating-point-inexact ' +
		'print-not-readable-object <= floating-point-invalid-operation print-object = ' +
		'floating-point-overflow print-unreadable-object > floating-point-underflow ' +
		'probe-file >= floatp proclaim abort floor prog abs fmakunbound prog\\* access ' +
		'force-output prog1 acons format prog2 acos formatter progn acosh fourth ' +
		'program-error add-method fresh-line progv adjoin fround provide adjust-array ' +
		'ftruncate psetf adjustable-array-p ftype psetq allocate-instance funcall push ' +
		'alpha-char-p function pushnew alphanumericp function-keywords putprop and ' +
		'function-lambda-expression quote append functionp random apply gbitp ' +
		'random-state applyhook gcd random-state-p apropos generic-function rassoc ' +
		'apropos-list gensym rassoc-if aref gentemp rassoc-if-not arithmetic-error get ' +
		'ratio arithmetic-error-operands get-decoded-time rational ' +
		'arithmetic-error-operation get-dispatch-macro-character rationalize array ' +
		'get-internal-real-time rationalp array-dimension get-internal-run-time read ' +
		'array-dimension-limit get-macro-character read-byte array-dimensions ' +
		'get-output-stream-string read-char array-displacement get-properties ' +
		'read-char-no-hang array-element-type get-setf-expansion read-delimited-list ' +
		'array-has-fill-pointer-p get-setf-method read-eval-print array-in-bounds-p ' +
		'get-universal-time read-from-string array-rank getf read-line array-rank-limit ' +
		'gethash read-preserving-whitespace array-row-major-index go read-sequence ' +
		'array-total-size graphic-char-p reader-error array-total-size-limit handler-bind ' +
		'readtable arrayp handler-case readtable-case ash hash-table readtablep asin ' +
		'hash-table-count real asinh hash-table-p realp assert hash-table-rehash-size ' +
		'realpart assoc hash-table-rehash-threshold reduce assoc-if hash-table-size ' +
		'reinitialize-instance assoc-if-not hash-table-test rem atan host-namestring ' +
		'remf atanh identity remhash atom if remove base-char if-exists ' +
		'remove-duplicates base-string ignorable remove-if bignum ignore remove-if-not ' +
		'bit ignore-errors remove-method bit-and imagpart remprop bit-andc1 import ' +
		'rename-file bit-andc2 in-package rename-package bit-eqv in-package replace ' +
		'bit-ior incf require bit-nand initialize-instance rest bit-nor inline restart ' +
		'bit-not input-stream-p restart-bind bit-orc1 inspect restart-case bit-orc2 ' +
		'int-char restart-name bit-vector integer return bit-vector-p ' +
		'integer-decode-float return-from bit-xor integer-length revappend block ' +
		'integerp reverse boole interactive-stream-p room boole-1 intern rotatef ' +
		'boole-2 round boole-and intersection ' +
		'row-major-aref boole-andc1 invalid-method-error rplaca boole-andc2 ' +
		'invoke-debugger rplacd boole-c1 invoke-restart safety boole-c2 ' +
		'invoke-restart-interactively satisfies boole-clr isqrt sbit boole-eqv keyword ' +
		'scale-float boole-ior keywordp schar boole-nand labels search boole-nor ' +
		'second boole-orc1 lambda-list-keywords sequence boole-orc2 ' +
		'lambda-parameters-limit serious-condition boole-set last set boole-xor lcm ' +
		'set-char-bit boolean ldb set-difference both-case-p ldb-test ' +
		'set-dispatch-macro-character boundp ldiff set-exclusive-or break ' +
		'least-negative-double-float set-macro-character broadcast-stream ' +
		'least-negative-long-float set-pprint-dispatch broadcast-stream-streams ' +
		'least-negative-normalized-double-float set-syntax-from-char built-in-class ' +
		'least-negative-normalized-long-float setf butlast ' +
		'least-negative-normalized-short-float setq byte ' +
		'least-negative-normalized-single-float seventh byte-position ' +
		'least-negative-short-float shadow byte-size least-negative-single-float ' +
		'shadowing-import call-arguments-limit least-positive-double-float ' +
		'shared-initialize call-method least-positive-long-float shiftf ' +
		'call-next-method least-positive-normalized-double-float short-float capitalize ' +
		'least-positive-normalized-long-float short-float-epsilon car ' +
		'least-positive-normalized-short-float short-float-negative-epsilon case ' +
		'least-positive-normalized-single-float short-site-name catch ' +
		'least-positive-short-float signal ccase least-positive-single-float ' +
		'signed-byte cdr length signum ceiling simple-condition cell-error ' +
		'simple-array cell-error-name lisp simple-base-string cerror ' +
		'lisp-implementation-type simple-bit-vector change-class ' +
		'lisp-implementation-version simple-bit-vector-p char list ' +
		'simple-condition-format-arguments char-bit list\\* ' +
		'simple-condition-format-control char-bits list-all-packages simple-error ' +
		'char-bits-limit list-length simple-string char-code listen simple-string-p ' +
		'char-code-limit listp simple-type-error char-control-bit load simple-vector ' +
		'char-downcase load-logical-pathname-translations simple-vector-p char-equal ' +
		'load-time-value simple-warning char-font locally sin char-font-limit log ' +
		'single-flaot-epsilon char-greaterp logand single-float char-hyper-bit logandc1 ' +
		'single-float-epsilon char-int logandc2 single-float-negative-epsilon ' +
		'char-lessp logbitp sinh char-meta-bit logcount sixth char-name logeqv sleep ' +
		'char-not-equal logical-pathname slot-boundp char-not-greaterp ' +
		'logical-pathname-translations slot-exists-p char-not-lessp logior ' +
		'slot-makunbound char-super-bit lognand slot-missing char-upcase lognor ' +
		'slot-unbound char/= lognot slot-value char< logorc1 software-type char<= ' +
		'logorc2 software-version char= logtest some char> logxor sort char>= ' +
		'long-float space character long-float-epsilon special characterp ' +
		'long-float-negative-epsilon special-form-p check-type long-site-name ' +
		'special-operator-p cis loop speed class loop-finish sqrt class-name ' +
		'lower-case-p stable-sort class-of machine-instance standard clear-input ' +
		'machine-type standard-char clear-output machine-version standard-char-p close ' +
		'macro-function standard-class clrhash macroexpand standard-generic-function ' +
		'code-char macroexpand-1 standard-method coerce macroexpand-l standard-object ' +
		'commonp macrolet step compilation-speed make-array storage-condition compile ' +
		'make-array store-value compile-file make-broadcast-stream stream ' +
		'compile-file-pathname make-char stream-element-type compiled-function ' +
		'make-concatenated-stream stream-error compiled-function-p make-condition ' +
		'stream-error-stream compiler-let make-dispatch-macro-character ' +
		'stream-external-format compiler-macro make-echo-stream streamp ' +
		'compiler-macro-function make-hash-table streamup complement make-instance ' +
		'string complex make-instances-obsolete string-capitalize complexp make-list ' +
		'string-char compute-applicable-methods make-load-form string-char-p ' +
		'compute-restarts make-load-form-saving-slots string-downcase concatenate ' +
		'make-method string-equal concatenated-stream make-package string-greaterp ' +
		'concatenated-stream-streams make-pathname string-left-trim cond ' +
		'make-random-state string-lessp condition make-sequence string-not-equal ' +
		'conjugate make-string string-not-greaterp cons make-string-input-stream ' +
		'string-not-lessp consp make-string-output-stream string-right-strim constantly ' +
		'make-symbol string-right-trim constantp make-synonym-stream string-stream ' +
		'continue make-two-way-stream string-trim control-error makunbound ' +
		'string-upcase copy-alist map string/= copy-list map-into string< ' +
		'copy-pprint-dispatch mapc string<= copy-readtable mapcan string= copy-seq ' +
		'mapcar string> copy-structure mapcon string>= copy-symbol maphash stringp ' +
		'copy-tree mapl structure cos maplist structure-class cosh mask-field ' +
		'structure-object count max style-warning count-if member sublim count-if-not ' +
		'member-if sublis ctypecase member-if-not subseq debug merge subsetp decf ' +
		'merge-pathname subst declaim merge-pathnames subst-if declaration method ' +
		'subst-if-not declare method-combination substitute decode-float ' +
		'method-combination-error substitute-if decode-universal-time method-qualifiers ' +
		'substitute-if-not defclass min subtypep defconstant minusp svref defgeneric ' +
		'mismatch sxhash define-compiler-macro mod symbol define-condition ' +
		'most-negative-double-float symbol-function define-method-combination ' +
		'most-negative-fixnum symbol-macrolet define-modify-macro ' +
		'most-negative-long-float symbol-name define-setf-expander ' +
		'most-negative-short-float symbol-package define-setf-method ' +
		'most-negative-single-float symbol-plist define-symbol-macro ' +
		'most-positive-double-float symbol-value defmacro most-positive-fixnum symbolp ' +
		'defmethod most-positive-long-float synonym-stream defpackage ' +
		'most-positive-short-float synonym-stream-symbol defparameter ' +
		'most-positive-single-float sys defsetf muffle-warning system defstruct ' +
		'multiple-value-bind deftype multiple-value-call tagbody defun ' +
		'multiple-value-list tailp defvar multiple-value-prog1 tan delete ' +
		'multiple-value-seteq tanh delete-duplicates multiple-value-setq tenth ' +
		'delete-file multiple-values-limit terpri delete-if name-char the delete-if-not ' +
		'namestring third delete-package nbutlast throw denominator nconc time ' +
		'deposit-field next-method-p trace describe translate-logical-pathname ' +
		'describe-object nintersection translate-pathname destructuring-bind ninth ' +
		'tree-equal digit-char no-applicable-method truename digit-char-p ' +
		'no-next-method truncase directory not truncate directory-namestring notany ' +
		'two-way-stream disassemble notevery two-way-stream-input-stream ' +
		'division-by-zero notinline two-way-stream-output-stream do nreconc type do\\* ' +
		'nreverse type-error do-all-symbols nset-difference type-error-datum ' +
		'do-exeternal-symbols nset-exclusive-or type-error-expected-type ' +
		'do-external-symbols nstring type-of do-symbols nstring-capitalize typecase ' +
		'documentation nstring-downcase typep dolist nstring-upcase unbound-slot ' +
		'dotimes nsublis unbound-slot-instance double-float nsubst unbound-variable ' +
		'double-float-epsilon nsubst-if undefined-function ' +
		'double-float-negative-epsilon nsubst-if-not unexport dpb nsubstitute unintern ' +
		'dribble nsubstitute-if union dynamic-extent nsubstitute-if-not unless ecase ' +
		'nth unread echo-stream nth-value unread-char echo-stream-input-stream nthcdr ' +
		'unsigned-byte echo-stream-output-stream null untrace ed number unuse-package ' +
		'eighth numberp unwind-protect elt numerator ' +
		'update-instance-for-different-class encode-universal-time nunion ' +
		'update-instance-for-redefined-class end-of-file oddp ' +
		'upgraded-array-element-type endp open upgraded-complex-part-type ' +
		'enough-namestring open-stream-p upper-case-p ensure-directories-exist optimize ' +
		'use-package ensure-generic-function or use-value eq otherwise user eql ' +
		'output-stream-p user-homedir-pathname equal package values equalp ' +
		'package-error values-list error package-error-package vector etypecase ' +
		'package-name vector-pop eval package-nicknames vector-push eval-when ' +
		'package-shadowing-symbols vector-push-extend evalhook package-use-list vectorp ' +
		'evenp package-used-by-list warn every packagep warning exp pairlis when export ' +
		'parse-error wild-pathname-p expt parse-integer with-accessors extended-char ' +
		'parse-namestring with-compilation-unit fboundp pathname ' +
		'with-condition-restarts fceiling pathname-device with-hash-table-iterator ' +
		'fdefinition pathname-directory with-input-from-string ffloor pathname-host ' +
		'with-open-file fifth pathname-match-p with-open-stream file-author ' +
		'pathname-name with-output-to-string file-error pathname-type ' +
		'with-package-iterator file-error-pathname pathname-version with-simple-restart ' +
		'file-length pathnamep with-slots file-namestring peek-char ' +
		'with-standard-io-syntax file-position phase write file-stream write-byte ' +
		'file-string-length plusp write-char file-write-date pop write-line fill ' +
		'position write-sequence fill-pointer position-if write-string find ' +
		'position-if-not write-to-string find-all-symbols pprint y-or-n-p find-class ' +
		'pprint-dispatch yes-or-no-p find-if pprint-exit-if-list-exhausted zerop ' +
		'find-if-not pprint-fill';

	// common lisp global variables. also from lisp.vim
	var standard_vars =
		'\\*applyhook\\* \\*load-pathname\\* \\*print-pprint-dispatch\\* \\*break-on-signals\\* ' +
		'\\*load-print\\* \\*print-pprint-dispatch\\* \\*break-on-signals\\* \\*load-truename\\* ' +
		'\\*print-pretty\\* \\*break-on-warnings\\* \\*load-verbose\\* \\*print-radix\\* ' +
		'\\*compile-file-pathname\\* \\*macroexpand-hook\\* \\*print-readably\\* ' +
		'\\*compile-file-pathname\\* \\*modules\\* \\*print-right-margin\\* \\*compile-file-truename\\* ' +
		'\\*package\\* \\*print-right-margin\\* \\*compile-file-truename\\* \\*print-array\\* ' +
		'\\*query-io\\* \\*compile-print\\* \\*print-base\\* \\*random-state\\* \\*compile-verbose\\* ' +
		'\\*print-case\\* \\*read-base\\* \\*compile-verbose\\* \\*print-circle\\* ' +
		'\\*read-default-float-format\\* \\*debug-io\\* \\*print-escape\\* \\*read-eval\\* ' +
		'\\*debugger-hook\\* \\*print-gensym\\* \\*read-suppress\\* \\*default-pathname-defaults\\* ' +
		'\\*print-length\\* \\*readtable\\* \\*error-output\\* \\*print-level\\* \\*standard-input\\* ' +
		'\\*evalhook\\* \\*print-lines\\* \\*standard-output\\* \\*features\\* \\*print-miser-width\\* ' +
		'\\*terminal-io\\* \\*gensym-counter\\* \\*print-miser-width\\* \\*trace-output\\* ' +
		'pi internal-time-units-per-second';

	// common lisp known keywords
	var keywords =
		':abort :from-end :overwrite :adjustable :gensym :predicate :append :host ' +
		':preserve-whitespace :array :if-does-not-exist :pretty :base :if-exists :print ' +
		':case :include :print-function :circle :index :probe :conc-name :inherited ' +
		':radix :constructor :initial-contents :read-only :copier :initial-element ' +
		':rehash-size :count :initial-offset :rehash-threshold :create :initial-value ' +
		':rename :default :input :rename-and-delete :defaults :internal :size :device ' +
		':io :start :direction :junk-allowed :start1 :directory :key :start2 ' +
		':displaced-index-offset :length :stream :displaced-to :level :supersede ' +
		':element-type :name :test :end :named :test-not :end1 :new-version :type :end2 ' +
		':nicknames :use :error :output :verbose :escape :output-file :version ' +
		':external :documentation :shadowing-import-from :modern :export ' +
		':case-sensitive :case-inverted :shadow :import-from :intern :fill-pointer ' +
		':upcase :downcase :preserve :invert :load-toplevel :compile-toplevel :execute ' +
		':while :until :for :do :if :then :else :when :unless :in :across :finally ' +
		':collect :nconc :maximize :minimize :sum :and :with :initially :append :into ' +
		':count :end :repeat :always :never :thereis :from :to :upto :downto :below ' +
		':above :by :on :being :each :the :hash-key :hash-keys :hash-value :hash-values ' +
		':using :of-type :upfrom :downfrom :arguments :return-type :library :full ' +
		':malloc-free :none :alloca :in :out :in-out :stdc-stdcall :stdc :c :language ' +
		':built-in :typedef :external :fini :init-once :init-always';

	var lambda = '&allow-other-keys &aux &body &environment &key &optional &rest &whole';

	var special = 'let let\\* lambda';

	/**
	 * Given a list of items in a string: 'item1 item2 item2 ...'
	 *
	 * return a regex *string*: '(item1|item2|item2|...)'
	 */
	var list_to_regex = function(list)
	{
		var items = list.replace(/(^ | $)/gm, '').split(/ /g);
		return '('+items.join('|')+')';
	};

	var is_in_list = function(item, list)
	{
		var items = list.replace(/(^ | $)/gm, '').split(/ /g);
		for(var i = 0, n = items.length; i < n; i++)
		{
			if(items[i] == item) return true;
		}
		return false;
	};

	/**
	 * Collections of search and replaces to make.
	 */
	var replace = [
		// ---------------------------------------------------------------------
		// strings (should !!ALWAYS!! be first, lest our <span> tags be destroyed...)
		// ---------------------------------------------------------------------
		{regex: /"([\s\S]*?)"/gm, replace: '<span class="string">"$1"</span>'},

		// ---------------------------------------------------------------------
		// comments
		// ---------------------------------------------------------------------
		{regex: /(;.*)(\n|$)/gm, replace: '<span class="comment">$1</span>$2'},

		// ---------------------------------------------------------------------
		// "special" (let/lambda)
		// ---------------------------------------------------------------------
		{
			regex: new RegExp('.'+list_to_regex(special)+'(?=[\\s()])', 'g'),
			replace: function(fullmatch, fnname) {
				if(fullmatch[0] == '(')
				{
					return '(<span class="function special known">' + fnname + '</span>';
				}
				else
				{
					return fullmatch;
				}
			}
		},


		// ---------------------------------------------------------------------
		// function matches
		// ---------------------------------------------------------------------
		// known functions
		{
			regex: new RegExp('.'+list_to_regex(funcs)+'(?=[\\s()])', 'g'),
			replace: function(fullmatch, fnname) {
				if(fullmatch[0] == '(')
				{
					return '(<span class="function known">' + fnname + '</span>';
				}
				else
				{
					return fullmatch;
				}
			}
		},
		// symbol functions (#'my-fn)
		{
			regex: /([\s()])(#'(\w[\w_-]*))(?=[\s()])/g,
			replace: function(fullmatch, delim1, symfun, sym)
			{
				var known = false;
				if(is_in_list(sym, funcs))
				{
					known = true;
				}
				return delim1 +'<span class="function symbol'+ (known ? ' known' : '') +'">'+ symfun +'</span>';
			}
		},

		// ---------------------------------------------------------------------
		// lambda keywords
		// ---------------------------------------------------------------------
		{regex: new RegExp('([\\s()])'+list_to_regex(lambda)+'(?=[\\s()])', 'g'), replace: '$1<span class="lambda-list">$2</span>'},

		// ---------------------------------------------------------------------
		// symbols/keywords/variables
		// ---------------------------------------------------------------------
		// generic symbols
		{regex: /([\s()])('\w[\w_-]*)(?=[\s()])/g, replace: '$1<span class="symbol">$2</span>'},
		// known keywords
		{
			regex: new RegExp('([\\s()])'+list_to_regex(keywords)+'([\\s()])', 'g'),
			replace: function(fullmatch, whitespace, keyword, whitespace2) {
				return whitespace + '<span class="keyword known">'+ keyword +'</span>'+ whitespace2;
			}
		},
		// generic keywords
		{
			regex: /([\s()])(:\w[\w_-]*)/g,
			replace: function(fullmatch, delim, keyword) {
				if(fullmatch[0].match(/[\s()]/gm))
				{
					return delim + '<span class="keyword">'+ keyword +'</span>';
				}
				return fullmatch;
			}
		},
		// known variables
		{
			regex: new RegExp('([\\s()])'+list_to_regex(standard_vars)+'([\\s()])', 'g'),
			replace: function(fullmatch, whitespace, varname, whitespace2) {
				return whitespace + '<span class="variable known">'+ varname +'</span>'+ whitespace2;
			}
		},
		// globals/constants
		{regex: /([\s()])(\*\w[\w_-]*\*)(?=[\s()])/g, replace: '$1<span class="variable global">$2</span>'},
		{regex: /([\s()])(\+\w[\w_-]*\+)(?=[\s()])/g, replace: '$1<span class="variable constant">$2</span>'},

		// ---------------------------------------------------------------------
		// numbers
		// ---------------------------------------------------------------------
		// binary
		{regex: /([\s()])(#b[01]+)(?=[\s()])/ig, replace: '$1<span class="number binary">$2</span>'},
		// hex
		{regex: /([\s()])(#x[\da-f]+)(?=[\s()])/ig, replace: '$1<span class="number hex">$2</span>'},
		// float
		{regex: /([\s()])([+-]?(?:\d+\.\d+|\d+\.|\.\d+))(?=[\s()])/g, replace: '$1<span class="number float">$2</span>'},
		// ratio
		{regex: /([\s()])([+-]?\d+(?:\/\d+)?)(?=[\s()])/g, replace: '$1<span class="number ratio">$2</span>'},
		// integers
		{regex: /([\s()])([+-]?\d+)(?=[\s()])/g, replace: '$1<span class="number integer">$2</span>'},

		// ---------------------------------------------------------------------
		// misc parsers
		// ---------------------------------------------------------------------
		// t/nil
		{regex: /([\s()])(nil|t)(?=[\s()])/g, replace: '$1<span class="nil">$2</span>'},

		// generic "maybe a function" forms. best second to last
		{regex: /\((\w[\w_:-]*)(?=[\s()])/g, replace: '(<span class="function">$1</span>'},

		// ()'s (should most probably be last, unless there's a good reason)
		{regex: /([()])/g, replace: '<span class="list">$1</span>'}
	];

	/**
	 * Main highlight function.
	 */
	this.highlight_element = function(code_el)
	{
		code_el.className += ' hl-highlighted';
		var html = code_el.innerHTML;
		// can't have &...;'s running wild like a pack of animals...
		html = html.replace(/&amp;/g, '&');
		html = html.replace(/&lt;/g, '<');
		html = html.replace(/&gt;/g, '>');
		// pad the HTML string (makes regexs much simpler)
		html = "\n" + html + "\n";
		for(var i = 0, n = replace.length; i < n; i++)
		{
			var rep = replace[i];
			html = html.replace(rep.regex, rep.replace);
		}
		// unpad HTML string
		html = html.replace(/(^\n|\n$)/g, '');
		html = html.replace(/<(?!\/?span)/g, '&lt;');
		// Re-encode stray &s to conform with XHTML
		//html = html.replace(/&/g, '&amp;');
		
		code_el.innerHTML = html;
	},

	/**
	 * Automatically highlight all <code class="lisp"> blocks
	 *
	 * Takes an options arg, which can be used to specify the classname of the
	 * <code> tags you wish to highlight.
	 */
	this.highlight_auto = function(options)
	{
		options || (options = {});
		var classname = options.className ? options.className : 'lisp';
		var codes = document.getElementsByTagName('code');
		for(var i = 0, n = codes.length; i < n; i++)
		{
			var code = codes[i];
			if(code.className.match(classname))
			{
				this.highlight_element(code);
			}
		}
	}
};

var HighlightLisp = new highlight_lisp();
