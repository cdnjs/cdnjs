/*
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
YAHOO.namespace("tool");

//-----------------------------------------------------------------------------
// TestCase object
//-----------------------------------------------------------------------------
(function(){
    
    //used for autogenerating test case names
    var tempId = 0;
    
    /**
     * Test case containing various tests to run.
     * @param template An object containing any number of test methods, other methods,
     *                 an optional name, and anything else the test case needs.
     * @class TestCase
     * @namespace YAHOO.tool
     * @constructor
     */
    YAHOO.tool.TestCase = function (template /*:Object*/) {
        
        /**
         * Special rules for the test case. Possible subobjects
         * are fail, for tests that should fail, and error, for
         * tests that should throw an error.
         */
        this._should /*:Object*/ = {};
        
        //copy over all properties from the template to this object
        for (var prop in template) {
            this[prop] = template[prop];
        }    
        
        //check for a valid name
        if (!YAHOO.lang.isString(this.name)){
            /**
             * Name for the test case.
             */
            this.name /*:String*/ = "testCase" + (tempId++);
        }
    
    };
    
    
    YAHOO.tool.TestCase.prototype = {  
    
        /**
         * Resumes a paused test and runs the given function.
         * @param {Function} segment (Optional) The function to run.
         *      If omitted, the test automatically passes.
         * @return {Void}
         * @method resume
         */
        resume : function (segment /*:Function*/) /*:Void*/ {
            YAHOO.tool.TestRunner.resume(segment);
        },
    
        /**
         * Causes the test case to wait a specified amount of time and then
         * continue executing the given code.
         * @param {Function} segment (Optional) The function to run after the delay.
         *      If omitted, the TestRunner will wait until resume() is called.
         * @param {int} delay (Optional) The number of milliseconds to wait before running
         *      the function. If omitted, defaults to zero.
         * @return {Void}
         * @method wait
         */
        wait : function (segment /*:Function*/, delay /*:int*/) /*:Void*/{
            var args = arguments;
            if (YAHOO.lang.isFunction(args[0])){
                throw new YAHOO.tool.TestCase.Wait(args[0], args[1]);
            } else {
                throw new YAHOO.tool.TestCase.Wait(function(){
                    YAHOO.util.Assert.fail("Timeout: wait() called but resume() never called.");
                }, (YAHOO.lang.isNumber(args[0]) ? args[0] : 10000));
            }            
        },
    
        //-------------------------------------------------------------------------
        // Stub Methods
        //-------------------------------------------------------------------------
    
        /**
         * Function to run before each test is executed.
         * @return {Void}
         * @method setUp
         */
        setUp : function () /*:Void*/ {
        },
        
        /**
         * Function to run after each test is executed.
         * @return {Void}
         * @method tearDown
         */
        tearDown: function () /*:Void*/ {    
        }
    };
    
    /**
     * Represents a stoppage in test execution to wait for an amount of time before
     * continuing.
     * @param {Function} segment A function to run when the wait is over.
     * @param {int} delay The number of milliseconds to wait before running the code.
     * @class Wait
     * @namespace YAHOO.tool.TestCase
     * @constructor
     *
     */
    YAHOO.tool.TestCase.Wait = function (segment /*:Function*/, delay /*:int*/) {
        
        /**
         * The segment of code to run when the wait is over.
         * @type Function
         * @property segment
         */
        this.segment /*:Function*/ = (YAHOO.lang.isFunction(segment) ? segment : null);
    
        /**
         * The delay before running the segment of code.
         * @type int
         * @property delay
         */
        this.delay /*:int*/ = (YAHOO.lang.isNumber(delay) ? delay : 0);
    
    };

})();
YAHOO.namespace("tool");


//-----------------------------------------------------------------------------
// TestSuite object
//-----------------------------------------------------------------------------

/**
 * A test suite that can contain a collection of TestCase and TestSuite objects.
 * @param {String||Object} data The name of the test suite or an object containing
 *      a name property as well as setUp and tearDown methods.
 * @namespace YAHOO.tool
 * @class TestSuite
 * @constructor
 */
YAHOO.tool.TestSuite = function (data /*:String||Object*/) {

    /**
     * The name of the test suite.
     * @type String
     * @property name
     */
    this.name /*:String*/ = "";

    /**
     * Array of test suites and
     * @private
     */
    this.items /*:Array*/ = [];

    //initialize the properties
    if (YAHOO.lang.isString(data)){
        this.name = data;
    } else if (YAHOO.lang.isObject(data)){
        YAHOO.lang.augmentObject(this, data, true);
    }

    //double-check name
    if (this.name === ""){
        this.name = YAHOO.util.Dom.generateId(null, "testSuite");
    }

};

YAHOO.tool.TestSuite.prototype = {
    
    /**
     * Adds a test suite or test case to the test suite.
     * @param {YAHOO.tool.TestSuite||YAHOO.tool.TestCase} testObject The test suite or test case to add.
     * @return {Void}
     * @method add
     */
    add : function (testObject /*:YAHOO.tool.TestSuite*/) /*:Void*/ {
        if (testObject instanceof YAHOO.tool.TestSuite || testObject instanceof YAHOO.tool.TestCase) {
            this.items.push(testObject);
        }
    },
    
    //-------------------------------------------------------------------------
    // Stub Methods
    //-------------------------------------------------------------------------

    /**
     * Function to run before each test is executed.
     * @return {Void}
     * @method setUp
     */
    setUp : function () /*:Void*/ {
    },
    
    /**
     * Function to run after each test is executed.
     * @return {Void}
     * @method tearDown
     */
    tearDown: function () /*:Void*/ {
    }
    
};
YAHOO.namespace("tool");

/**
 * The YUI test tool
 * @module yuitest
 * @namespace YAHOO.tool
 * @requires yahoo,dom,event,logger
 * @optional event-simulate
 */


//-----------------------------------------------------------------------------
// TestRunner object
//-----------------------------------------------------------------------------


YAHOO.tool.TestRunner = (function(){

    /**
     * A node in the test tree structure. May represent a TestSuite, TestCase, or
     * test function.
     * @param {Variant} testObject A TestSuite, TestCase, or the name of a test function.
     * @class TestNode
     * @constructor
     * @private
     */
    function TestNode(testObject /*:Variant*/){
    
        /**
         * The TestSuite, TestCase, or test function represented by this node.
         * @type Variant
         * @property testObject
         */
        this.testObject = testObject;
        
        /**
         * Pointer to this node's first child.
         * @type TestNode
         * @property firstChild
         */        
        this.firstChild /*:TestNode*/ = null;
        
        /**
         * Pointer to this node's last child.
         * @type TestNode
         * @property lastChild
         */        
        this.lastChild = null;
        
        /**
         * Pointer to this node's parent.
         * @type TestNode
         * @property parent
         */        
        this.parent = null; 
   
        /**
         * Pointer to this node's next sibling.
         * @type TestNode
         * @property next
         */        
        this.next = null;
        
        /**
         * Test results for this test object.
         * @type object
         * @property results
         */                
        this.results /*:Object*/ = {
            passed : 0,
            failed : 0,
            total : 0,
            ignored : 0,
            duration: 0
        };
        
        //initialize results
        if (testObject instanceof YAHOO.tool.TestSuite){
            this.results.type = "testsuite";
            this.results.name = testObject.name;
        } else if (testObject instanceof YAHOO.tool.TestCase){
            this.results.type = "testcase";
            this.results.name = testObject.name;
        }
       
    }
    
    TestNode.prototype = {
    
        /**
         * Appends a new test object (TestSuite, TestCase, or test function name) as a child
         * of this node.
         * @param {Variant} testObject A TestSuite, TestCase, or the name of a test function.
         * @return {Void}
         */
        appendChild : function (testObject /*:Variant*/) /*:Void*/{
            var node = new TestNode(testObject);
            if (this.firstChild === null){
                this.firstChild = this.lastChild = node;
            } else {
                this.lastChild.next = node;
                this.lastChild = node;
            }
            node.parent = this;
            return node;
        }       
    };

    /**
     * Runs test suites and test cases, providing events to allowing for the
     * interpretation of test results.
     * @namespace YAHOO.tool
     * @class TestRunner
     * @static
     */
    function TestRunner(){
    
        //inherit from EventProvider
        TestRunner.superclass.constructor.apply(this,arguments);
        
        /**
         * Suite on which to attach all TestSuites and TestCases to be run.
         * @type YAHOO.tool.TestSuite
         * @property masterSuite
         * @private
         * @static
         */
        this.masterSuite = new YAHOO.tool.TestSuite("yuitests" + (new Date()).getTime());        

        /**
         * Pointer to the current node in the test tree.
         * @type TestNode
         * @private
         * @property _cur
         * @static
         */
        this._cur = null;                
        
        /**
         * Pointer to the root node in the test tree.
         * @type TestNode
         * @private
         * @property _root
         * @static
         */
        this._root = null;
        
        /**
         * Indicates if the TestRunner is currently running tests.
         * @type Boolean
         * @private
         * @property _running
         * @static
         */
        this._running = false;
        
        /**
         * Holds copy of the results object generated when all tests are
         * complete.
         * @type Object
         * @private
         * @property _lastResults
         * @static
         */
        this._lastResults = null;
        
        //create events
        var events /*:Array*/ = [
            this.TEST_CASE_BEGIN_EVENT,
            this.TEST_CASE_COMPLETE_EVENT,
            this.TEST_SUITE_BEGIN_EVENT,
            this.TEST_SUITE_COMPLETE_EVENT,
            this.TEST_PASS_EVENT,
            this.TEST_FAIL_EVENT,
            this.TEST_IGNORE_EVENT,
            this.COMPLETE_EVENT,
            this.BEGIN_EVENT
        ];
        for (var i=0; i < events.length; i++){
            this.createEvent(events[i], { scope: this });
        }       
   
    }
    
    YAHOO.lang.extend(TestRunner, YAHOO.util.EventProvider, {
    
        //-------------------------------------------------------------------------
        // Constants
        //-------------------------------------------------------------------------
         
        /**
         * Fires when a test case is opened but before the first 
         * test is executed.
         * @event testcasebegin
         */         
        TEST_CASE_BEGIN_EVENT /*:String*/ : "testcasebegin",
        
        /**
         * Fires when all tests in a test case have been executed.
         * @event testcasecomplete
         */        
        TEST_CASE_COMPLETE_EVENT /*:String*/ : "testcasecomplete",
        
        /**
         * Fires when a test suite is opened but before the first 
         * test is executed.
         * @event testsuitebegin
         */        
        TEST_SUITE_BEGIN_EVENT /*:String*/ : "testsuitebegin",
        
        /**
         * Fires when all test cases in a test suite have been
         * completed.
         * @event testsuitecomplete
         */        
        TEST_SUITE_COMPLETE_EVENT /*:String*/ : "testsuitecomplete",
        
        /**
         * Fires when a test has passed.
         * @event pass
         */        
        TEST_PASS_EVENT /*:String*/ : "pass",
        
        /**
         * Fires when a test has failed.
         * @event fail
         */        
        TEST_FAIL_EVENT /*:String*/ : "fail",
        
        /**
         * Fires when a test has been ignored.
         * @event ignore
         */        
        TEST_IGNORE_EVENT /*:String*/ : "ignore",
        
        /**
         * Fires when all test suites and test cases have been completed.
         * @event complete
         */        
        COMPLETE_EVENT /*:String*/ : "complete",
        
        /**
         * Fires when the run() method is called.
         * @event begin
         */        
        BEGIN_EVENT /*:String*/ : "begin",                
        
        //-------------------------------------------------------------------------
        // Misc Methods
        //-------------------------------------------------------------------------   

        /**
         * Retrieves the name of the current result set.
         * @return {String} The name of the result set.
         * @method getName
         */
        getName: function(){
            return this.masterSuite.name;
        },         

        /**
         * The name assigned to the master suite of the TestRunner. This is the name
         * that is output as the root's name when results are retrieved.
         * @param {String} name The name of the result set.
         * @return {Void}
         * @method setName
         */
        setName: function(name){
            this.masterSuite.name = name;
        },        
        
        
        //-------------------------------------------------------------------------
        // State-Related Methods
        //-------------------------------------------------------------------------

        /**
         * Indicates that the TestRunner is busy running tests and therefore can't
         * be stopped and results cannot be gathered.
         * @return {Boolean} True if the TestRunner is running, false if not.
         * @method isRunning
         */
        isRunning: function(){
            return this._running;
        },
        
        /**
         * Returns the last complete results set from the TestRunner. Null is returned
         * if the TestRunner is running or no tests have been run.
         * @param {Function} format (Optional) A test format to return the results in.
         * @return {Object|String} Either the results object or, if a test format is 
         *      passed as the argument, a string representing the results in a specific
         *      format.
         * @method getResults
         */
        getResults: function(format){
            if (!this._running && this._lastResults){
                if (YAHOO.lang.isFunction(format)){
                    return format(this._lastResults);                    
                } else {
                    return this._lastResults;
                }
            } else {
                return null;
            }
        },

        /**
         * Returns the coverage report for the files that have been executed.
         * This returns only coverage information for files that have been
         * instrumented using YUI Test Coverage and only those that were run
         * in the same pass.
         * @param {Function} format (Optional) A coverage format to return results in.
         * @return {Object|String} Either the coverage object or, if a coverage
         *      format is specified, a string representing the results in that format.
         * @method getCoverage
         */
        getCoverage: function(format){
            if (!this._running && typeof _yuitest_coverage == "object"){
                if (YAHOO.lang.isFunction(format)){
                    return format(_yuitest_coverage);                    
                } else {
                    return _yuitest_coverage;
                }
            } else {
                return null;
            }            
        },
        
        //-------------------------------------------------------------------------
        // Misc Methods
        //-------------------------------------------------------------------------

        /**
         * Retrieves the name of the current result set.
         * @return {String} The name of the result set.
         * @method getName
         */
        getName: function(){
            return this.masterSuite.name;
        },         

        /**
         * The name assigned to the master suite of the TestRunner. This is the name
         * that is output as the root's name when results are retrieved.
         * @param {String} name The name of the result set.
         * @return {Void}
         * @method setName
         */
        setName: function(name){
            this.masterSuite.name = name;
        },

        //-------------------------------------------------------------------------
        // Test Tree-Related Methods
        //-------------------------------------------------------------------------

        /**
         * Adds a test case to the test tree as a child of the specified node.
         * @param {TestNode} parentNode The node to add the test case to as a child.
         * @param {YAHOO.tool.TestCase} testCase The test case to add.
         * @return {Void}
         * @static
         * @private
         * @method _addTestCaseToTestTree
         */
       _addTestCaseToTestTree : function (parentNode /*:TestNode*/, testCase /*:YAHOO.tool.TestCase*/) /*:Void*/{
            
            //add the test suite
            var node = parentNode.appendChild(testCase);
            
            //iterate over the items in the test case
            for (var prop in testCase){
                if (prop.indexOf("test") === 0 && YAHOO.lang.isFunction(testCase[prop])){
                    node.appendChild(prop);
                }
            }
         
        },
        
        /**
         * Adds a test suite to the test tree as a child of the specified node.
         * @param {TestNode} parentNode The node to add the test suite to as a child.
         * @param {YAHOO.tool.TestSuite} testSuite The test suite to add.
         * @return {Void}
         * @static
         * @private
         * @method _addTestSuiteToTestTree
         */
        _addTestSuiteToTestTree : function (parentNode /*:TestNode*/, testSuite /*:YAHOO.tool.TestSuite*/) /*:Void*/ {
            
            //add the test suite
            var node = parentNode.appendChild(testSuite);
            
            //iterate over the items in the master suite
            for (var i=0; i < testSuite.items.length; i++){
                if (testSuite.items[i] instanceof YAHOO.tool.TestSuite) {
                    this._addTestSuiteToTestTree(node, testSuite.items[i]);
                } else if (testSuite.items[i] instanceof YAHOO.tool.TestCase) {
                    this._addTestCaseToTestTree(node, testSuite.items[i]);
                }                   
            }            
        },
        
        /**
         * Builds the test tree based on items in the master suite. The tree is a hierarchical
         * representation of the test suites, test cases, and test functions. The resulting tree
         * is stored in _root and the pointer _cur is set to the root initially.
         * @return {Void}
         * @static
         * @private
         * @method _buildTestTree
         */
        _buildTestTree : function () /*:Void*/ {
        
            this._root = new TestNode(this.masterSuite);
            //this._cur = this._root;
            
            //iterate over the items in the master suite
            for (var i=0; i < this.masterSuite.items.length; i++){
                if (this.masterSuite.items[i] instanceof YAHOO.tool.TestSuite) {
                    this._addTestSuiteToTestTree(this._root, this.masterSuite.items[i]);
                } else if (this.masterSuite.items[i] instanceof YAHOO.tool.TestCase) {
                    this._addTestCaseToTestTree(this._root, this.masterSuite.items[i]);
                }                   
            }            
        
        }, 
    
        //-------------------------------------------------------------------------
        // Private Methods
        //-------------------------------------------------------------------------
        
        /**
         * Handles the completion of a test object's tests. Tallies test results 
         * from one level up to the next.
         * @param {TestNode} node The TestNode representing the test object.
         * @return {Void}
         * @method _handleTestObjectComplete
         * @private
         * @static
         */
        _handleTestObjectComplete : function (node /*:TestNode*/) /*:Void*/ {
            if (YAHOO.lang.isObject(node.testObject)){
                node.parent.results.passed += node.results.passed;
                node.parent.results.failed += node.results.failed;
                node.parent.results.total += node.results.total;                
                node.parent.results.ignored += node.results.ignored;                
                node.parent.results[node.testObject.name] = node.results;
            
                if (node.testObject instanceof YAHOO.tool.TestSuite){
                    node.testObject.tearDown();
                    node.results.duration = (new Date()) - node._start;
                    this.fireEvent(this.TEST_SUITE_COMPLETE_EVENT, { testSuite: node.testObject, results: node.results});
                } else if (node.testObject instanceof YAHOO.tool.TestCase){
                    node.results.duration = (new Date()) - node._start;
                    this.fireEvent(this.TEST_CASE_COMPLETE_EVENT, { testCase: node.testObject, results: node.results});
                }      
            } 
        },                
        
        //-------------------------------------------------------------------------
        // Navigation Methods
        //-------------------------------------------------------------------------
        
        /**
         * Retrieves the next node in the test tree.
         * @return {TestNode} The next node in the test tree or null if the end is reached.
         * @private
         * @static
         * @method _next
         */
        _next : function () /*:TestNode*/ {
                
            if (this._cur === null){
                this._cur = this._root;
            } else if (this._cur.firstChild) {
                this._cur = this._cur.firstChild;
            } else if (this._cur.next) {
                this._cur = this._cur.next;            
            } else {
                while (this._cur && !this._cur.next && this._cur !== this._root){
                    this._handleTestObjectComplete(this._cur);
                    this._cur = this._cur.parent;
                }
                
                if (this._cur == this._root){
                    this._cur.results.type = "report";
                    this._cur.results.timestamp = (new Date()).toLocaleString();
                    this._cur.results.duration = (new Date()) - this._cur._start;                       
                    this._lastResults = this._cur.results;
                    this._running = false;
                    this.fireEvent(this.COMPLETE_EVENT, { results: this._lastResults});
                    this._cur = null;
                } else {
                    this._handleTestObjectComplete(this._cur);               
                    this._cur = this._cur.next;                
                }
            }
        
            return this._cur;
        },
        
        /**
         * Runs a test case or test suite, returning the results.
         * @param {YAHOO.tool.TestCase|YAHOO.tool.TestSuite} testObject The test case or test suite to run.
         * @return {Object} Results of the execution with properties passed, failed, and total.
         * @private
         * @method _run
         * @static
         */
        _run : function () /*:Void*/ {
                                
            //flag to indicate if the TestRunner should wait before continuing
            var shouldWait = false;
            
            //get the next test node
            var node = this._next();

            
            if (node !== null) {
            
                //set flag to say the testrunner is running
                this._running = true;
                
                //eliminate last results
                this._lastResult = null;            
            
                var testObject = node.testObject;
                
                //figure out what to do
                if (YAHOO.lang.isObject(testObject)){
                    if (testObject instanceof YAHOO.tool.TestSuite){
                        this.fireEvent(this.TEST_SUITE_BEGIN_EVENT, { testSuite: testObject });
                        node._start = new Date();
                        testObject.setUp();
                    } else if (testObject instanceof YAHOO.tool.TestCase){
                        this.fireEvent(this.TEST_CASE_BEGIN_EVENT, { testCase: testObject });
                        node._start = new Date();
                    }
                    
                    //some environments don't support setTimeout
                    if (typeof setTimeout != "undefined"){                    
                        setTimeout(function(){
                            YAHOO.tool.TestRunner._run();
                        }, 0);
                    } else {
                        this._run();
                    }
                } else {
                    this._runTest(node);
                }

            }
        },
        
        _resumeTest : function (segment /*:Function*/) /*:Void*/ {
        
            //get relevant information
            var node /*:TestNode*/ = this._cur;
            var testName /*:String*/ = node.testObject;
            var testCase /*:YAHOO.tool.TestCase*/ = node.parent.testObject;
            
            //cancel other waits if available
            if (testCase.__yui_wait){
                clearTimeout(testCase.__yui_wait);
                delete testCase.__yui_wait;
            }            
            
            //get the "should" test cases
            var shouldFail /*:Object*/ = (testCase._should.fail || {})[testName];
            var shouldError /*:Object*/ = (testCase._should.error || {})[testName];
            
            //variable to hold whether or not the test failed
            var failed /*:Boolean*/ = false;
            var error /*:Error*/ = null;
                
            //try the test
            try {
            
                //run the test
                segment.apply(testCase);
                
                //if it should fail, and it got here, then it's a fail because it didn't
                if (shouldFail){
                    error = new YAHOO.util.ShouldFail();
                    failed = true;
                } else if (shouldError){
                    error = new YAHOO.util.ShouldError();
                    failed = true;
                }
                           
            } catch (thrown /*:Error*/){
                if (thrown instanceof YAHOO.util.AssertionError) {
                    if (!shouldFail){
                        error = thrown;
                        failed = true;
                    }
                } else if (thrown instanceof YAHOO.tool.TestCase.Wait){
                
                    if (YAHOO.lang.isFunction(thrown.segment)){
                        if (YAHOO.lang.isNumber(thrown.delay)){
                        
                            //some environments don't support setTimeout
                            if (typeof setTimeout != "undefined"){
                                testCase.__yui_wait = setTimeout(function(){
                                    YAHOO.tool.TestRunner._resumeTest(thrown.segment);
                                }, thrown.delay);                             
                            } else {
                                throw new Error("Asynchronous tests not supported in this environment.");
                            }
                        }
                    }
                    
                    return;
                
                } else {
                    //first check to see if it should error
                    if (!shouldError) {                        
                        error = new YAHOO.util.UnexpectedError(thrown);
                        failed = true;
                    } else {
                        //check to see what type of data we have
                        if (YAHOO.lang.isString(shouldError)){
                            
                            //if it's a string, check the error message
                            if (thrown.message != shouldError){
                                error = new YAHOO.util.UnexpectedError(thrown);
                                failed = true;                                    
                            }
                        } else if (YAHOO.lang.isFunction(shouldError)){
                        
                            //if it's a function, see if the error is an instance of it
                            if (!(thrown instanceof shouldError)){
                                error = new YAHOO.util.UnexpectedError(thrown);
                                failed = true;
                            }
                        
                        } else if (YAHOO.lang.isObject(shouldError)){
                        
                            //if it's an object, check the instance and message
                            if (!(thrown instanceof shouldError.constructor) || 
                                    thrown.message != shouldError.message){
                                error = new YAHOO.util.UnexpectedError(thrown);
                                failed = true;                                    
                            }
                        
                        }
                    
                    }
                }
                
            }
            
            //fireEvent appropriate event
            if (failed) {
                this.fireEvent(this.TEST_FAIL_EVENT, { testCase: testCase, testName: testName, error: error });
            } else {
                this.fireEvent(this.TEST_PASS_EVENT, { testCase: testCase, testName: testName });
            }
            
            //run the tear down
            testCase.tearDown();
        
            //calculate duration
            var duration = (new Date()) - node._start;            
            
            //update results
            node.parent.results[testName] = { 
                result: failed ? "fail" : "pass",
                message: error ? error.getMessage() : "Test passed",
                type: "test",
                name: testName,
                duration: duration
            };
            
            if (failed){
                node.parent.results.failed++;
            } else {
                node.parent.results.passed++;
            }
            node.parent.results.total++;

            //set timeout not supported in all environments
            if (typeof setTimeout != "undefined"){
                setTimeout(function(){
                    YAHOO.tool.TestRunner._run();
                }, 0);
            } else {
                this._run();
            }
        
        },
                
        /**
         * Runs a single test based on the data provided in the node.
         * @param {TestNode} node The TestNode representing the test to run.
         * @return {Void}
         * @static
         * @private
         * @name _runTest
         */
        _runTest : function (node /*:TestNode*/) /*:Void*/ {
        
            //get relevant information
            var testName /*:String*/ = node.testObject;
            var testCase /*:YAHOO.tool.TestCase*/ = node.parent.testObject;
            var test /*:Function*/ = testCase[testName];
            
            //get the "should" test cases
            var shouldIgnore /*:Object*/ = (testCase._should.ignore || {})[testName];
            
            //figure out if the test should be ignored or not
            if (shouldIgnore){
            
                //update results
                node.parent.results[testName] = { 
                    result: "ignore",
                    message: "Test ignored",
                    type: "test",
                    name: testName
                };
                
                node.parent.results.ignored++;
                node.parent.results.total++;
            
                this.fireEvent(this.TEST_IGNORE_EVENT, { testCase: testCase, testName: testName });
                
                //some environments don't support setTimeout
                if (typeof setTimeout != "undefined"){                    
                    setTimeout(function(){
                        YAHOO.tool.TestRunner._run();
                    }, 0);              
                } else {
                    this._run();
                }

            } else {
            
                //mark the start time
                node._start = new Date();
            
                //run the setup
                testCase.setUp();
                
                //now call the body of the test
                this._resumeTest(test);                
            }

        },        
        
        //-------------------------------------------------------------------------
        // Protected Methods
        //-------------------------------------------------------------------------   
    
        /**
         * Fires events for the TestRunner. This overrides the default fireEvent()
         * method from EventProvider to add the type property to the data that is
         * passed through on each event call.
         * @param {String} type The type of event to fire.
         * @param {Object} data (Optional) Data for the event.
         * @method fireEvent
         * @static
         * @protected
         */
        fireEvent : function (type /*:String*/, data /*:Object*/) /*:Void*/ {
            data = data || {};
            data.type = type;
            TestRunner.superclass.fireEvent.call(this, type, data);
        },

        //-------------------------------------------------------------------------
        // Public Methods
        //-------------------------------------------------------------------------   
    
        /**
         * Adds a test suite or test case to the list of test objects to run.
         * @param testObject Either a TestCase or a TestSuite that should be run.
         * @return {Void}
         * @method add
         * @static
         */
        add : function (testObject /*:Object*/) /*:Void*/ {
            this.masterSuite.add(testObject);
        },
        
        /**
         * Removes all test objects from the runner.
         * @return {Void}
         * @method clear
         * @static
         */
        clear : function () /*:Void*/ {
            this.masterSuite = new YAHOO.tool.TestSuite("yuitests" + (new Date()).getTime());
        },
        
        /**
         * Resumes the TestRunner after wait() was called.
         * @param {Function} segment The function to run as the rest
         *      of the haulted test.
         * @return {Void}
         * @method resume
         * @static
         */
        resume : function (segment /*:Function*/) /*:Void*/ {
            this._resumeTest(segment || function(){});
        },
    
        /**
         * Runs the test suite.
         * @param {Boolean} oldMode (Optional) Specifies that the <= 2.8 way of
         *      internally managing test suites should be used.
         * @return {Void}
         * @method run
         * @static
         */
        run : function (oldMode) {
            
            //pointer to runner to avoid scope issues 
            var runner = YAHOO.tool.TestRunner;
            
            //if there's only one suite on the masterSuite, move it up
            if (!oldMode && this.masterSuite.items.length == 1 && this.masterSuite.items[0] instanceof YAHOO.tool.TestSuite){
                this.masterSuite = this.masterSuite.items[0];
            }

            //build the test tree
            runner._buildTestTree();
            
            //set when the test started
            runner._root._start = new Date();
                            
            //fire the begin event
            runner.fireEvent(runner.BEGIN_EVENT);
       
            //begin the testing
            runner._run();
        }    
    });
    
    return new TestRunner();
    
})();
YAHOO.namespace("util");

//-----------------------------------------------------------------------------
// Assert object
//-----------------------------------------------------------------------------

/**
 * The Assert object provides functions to test JavaScript values against
 * known and expected results. Whenever a comparison (assertion) fails,
 * an error is thrown.
 *
 * @namespace YAHOO.util
 * @class Assert
 * @static
 */
YAHOO.util.Assert = {

    //-------------------------------------------------------------------------
    // Helper Methods
    //-------------------------------------------------------------------------
    
    /**
     * Formats a message so that it can contain the original assertion message
     * in addition to the custom message.
     * @param {String} customMessage The message passed in by the developer.
     * @param {String} defaultMessage The message created by the error by default.
     * @return {String} The final error message, containing either or both.
     * @protected
     * @static
     * @method _formatMessage
     */
    _formatMessage : function (customMessage /*:String*/, defaultMessage /*:String*/) /*:String*/ {
        var message = customMessage;
        if (YAHOO.lang.isString(customMessage) && customMessage.length > 0){
            return YAHOO.lang.substitute(customMessage, { message: defaultMessage });
        } else {
            return defaultMessage;
        }        
    },
    
    //-------------------------------------------------------------------------
    // Generic Assertion Methods
    //-------------------------------------------------------------------------
    
    /** 
     * Forces an assertion error to occur.
     * @param {String} message (Optional) The message to display with the failure.
     * @method fail
     * @static
     */
    fail : function (message /*:String*/) /*:Void*/ {
        throw new YAHOO.util.AssertionError(this._formatMessage(message, "Test force-failed."));
    },       
    
    //-------------------------------------------------------------------------
    // Equality Assertion Methods
    //-------------------------------------------------------------------------    
    
    /**
     * Asserts that a value is equal to another. This uses the double equals sign
     * so type coercion may occur.
     * @param {Object} expected The expected value.
     * @param {Object} actual The actual value to test.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method areEqual
     * @static
     */
    areEqual : function (expected /*:Object*/, actual /*:Object*/, message /*:String*/) /*:Void*/ {
        if (expected != actual) {
            throw new YAHOO.util.ComparisonFailure(this._formatMessage(message, "Values should be equal."), expected, actual);
        }
    },
    
    /**
     * Asserts that a value is not equal to another. This uses the double equals sign
     * so type coercion may occur.
     * @param {Object} unexpected The unexpected value.
     * @param {Object} actual The actual value to test.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method areNotEqual
     * @static
     */
    areNotEqual : function (unexpected /*:Object*/, actual /*:Object*/, 
                         message /*:String*/) /*:Void*/ {
        if (unexpected == actual) {
            throw new YAHOO.util.UnexpectedValue(this._formatMessage(message, "Values should not be equal."), unexpected);
        }
    },
    
    /**
     * Asserts that a value is not the same as another. This uses the triple equals sign
     * so no type coercion may occur.
     * @param {Object} unexpected The unexpected value.
     * @param {Object} actual The actual value to test.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method areNotSame
     * @static
     */
    areNotSame : function (unexpected /*:Object*/, actual /*:Object*/, message /*:String*/) /*:Void*/ {
        if (unexpected === actual) {
            throw new YAHOO.util.UnexpectedValue(this._formatMessage(message, "Values should not be the same."), unexpected);
        }
    },

    /**
     * Asserts that a value is the same as another. This uses the triple equals sign
     * so no type coercion may occur.
     * @param {Object} expected The expected value.
     * @param {Object} actual The actual value to test.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method areSame
     * @static
     */
    areSame : function (expected /*:Object*/, actual /*:Object*/, message /*:String*/) /*:Void*/ {
        if (expected !== actual) {
            throw new YAHOO.util.ComparisonFailure(this._formatMessage(message, "Values should be the same."), expected, actual);
        }
    },    
    
    //-------------------------------------------------------------------------
    // Boolean Assertion Methods
    //-------------------------------------------------------------------------    
    
    /**
     * Asserts that a value is false. This uses the triple equals sign
     * so no type coercion may occur.
     * @param {Object} actual The actual value to test.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method isFalse
     * @static
     */
    isFalse : function (actual /*:Boolean*/, message /*:String*/) {
        if (false !== actual) {
            throw new YAHOO.util.ComparisonFailure(this._formatMessage(message, "Value should be false."), false, actual);
        }
    },
    
    /**
     * Asserts that a value is true. This uses the triple equals sign
     * so no type coercion may occur.
     * @param {Object} actual The actual value to test.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method isTrue
     * @static
     */
    isTrue : function (actual /*:Boolean*/, message /*:String*/) /*:Void*/ {
        if (true !== actual) {
            throw new YAHOO.util.ComparisonFailure(this._formatMessage(message, "Value should be true."), true, actual);
        }

    },
    
    //-------------------------------------------------------------------------
    // Special Value Assertion Methods
    //-------------------------------------------------------------------------    
    
    /**
     * Asserts that a value is not a number.
     * @param {Object} actual The value to test.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method isNaN
     * @static
     */
    isNaN : function (actual /*:Object*/, message /*:String*/) /*:Void*/{
        if (!isNaN(actual)){
            throw new YAHOO.util.ComparisonFailure(this._formatMessage(message, "Value should be NaN."), NaN, actual);
        }    
    },
    
    /**
     * Asserts that a value is not the special NaN value.
     * @param {Object} actual The value to test.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method isNotNaN
     * @static
     */
    isNotNaN : function (actual /*:Object*/, message /*:String*/) /*:Void*/{
        if (isNaN(actual)){
            throw new YAHOO.util.UnexpectedValue(this._formatMessage(message, "Values should not be NaN."), NaN);
        }    
    },
    
    /**
     * Asserts that a value is not null. This uses the triple equals sign
     * so no type coercion may occur.
     * @param {Object} actual The actual value to test.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method isNotNull
     * @static
     */
    isNotNull : function (actual /*:Object*/, message /*:String*/) /*:Void*/ {
        if (YAHOO.lang.isNull(actual)) {
            throw new YAHOO.util.UnexpectedValue(this._formatMessage(message, "Values should not be null."), null);
        }
    },

    /**
     * Asserts that a value is not undefined. This uses the triple equals sign
     * so no type coercion may occur.
     * @param {Object} actual The actual value to test.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method isNotUndefined
     * @static
     */
    isNotUndefined : function (actual /*:Object*/, message /*:String*/) /*:Void*/ {
        if (YAHOO.lang.isUndefined(actual)) {
            throw new YAHOO.util.UnexpectedValue(this._formatMessage(message, "Value should not be undefined."), undefined);
        }
    },

    /**
     * Asserts that a value is null. This uses the triple equals sign
     * so no type coercion may occur.
     * @param {Object} actual The actual value to test.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method isNull
     * @static
     */
    isNull : function (actual /*:Object*/, message /*:String*/) /*:Void*/ {
        if (!YAHOO.lang.isNull(actual)) {
            throw new YAHOO.util.ComparisonFailure(this._formatMessage(message, "Value should be null."), null, actual);
        }
    },
        
    /**
     * Asserts that a value is undefined. This uses the triple equals sign
     * so no type coercion may occur.
     * @param {Object} actual The actual value to test.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method isUndefined
     * @static
     */
    isUndefined : function (actual /*:Object*/, message /*:String*/) /*:Void*/ {
        if (!YAHOO.lang.isUndefined(actual)) {
            throw new YAHOO.util.ComparisonFailure(this._formatMessage(message, "Value should be undefined."), undefined, actual);
        }
    },    
    
    //--------------------------------------------------------------------------
    // Instance Assertion Methods
    //--------------------------------------------------------------------------    
   
    /**
     * Asserts that a value is an array.
     * @param {Object} actual The value to test.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method isArray
     * @static
     */
    isArray : function (actual /*:Object*/, message /*:String*/) /*:Void*/ {
        if (!YAHOO.lang.isArray(actual)){
            throw new YAHOO.util.UnexpectedValue(this._formatMessage(message, "Value should be an array."), actual);
        }    
    },
   
    /**
     * Asserts that a value is a Boolean.
     * @param {Object} actual The value to test.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method isBoolean
     * @static
     */
    isBoolean : function (actual /*:Object*/, message /*:String*/) /*:Void*/ {
        if (!YAHOO.lang.isBoolean(actual)){
            throw new YAHOO.util.UnexpectedValue(this._formatMessage(message, "Value should be a Boolean."), actual);
        }    
    },
   
    /**
     * Asserts that a value is a function.
     * @param {Object} actual The value to test.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method isFunction
     * @static
     */
    isFunction : function (actual /*:Object*/, message /*:String*/) /*:Void*/ {
        if (!YAHOO.lang.isFunction(actual)){
            throw new YAHOO.util.UnexpectedValue(this._formatMessage(message, "Value should be a function."), actual);
        }    
    },
   
    /**
     * Asserts that a value is an instance of a particular object. This may return
     * incorrect results when comparing objects from one frame to constructors in
     * another frame. For best results, don't use in a cross-frame manner.
     * @param {Function} expected The function that the object should be an instance of.
     * @param {Object} actual The object to test.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method isInstanceOf
     * @static
     */
    isInstanceOf : function (expected /*:Function*/, actual /*:Object*/, message /*:String*/) /*:Void*/ {
        if (!(actual instanceof expected)){
            throw new YAHOO.util.ComparisonFailure(this._formatMessage(message, "Value isn't an instance of expected type."), expected, actual);
        }
    },
    
    /**
     * Asserts that a value is a number.
     * @param {Object} actual The value to test.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method isNumber
     * @static
     */
    isNumber : function (actual /*:Object*/, message /*:String*/) /*:Void*/ {
        if (!YAHOO.lang.isNumber(actual)){
            throw new YAHOO.util.UnexpectedValue(this._formatMessage(message, "Value should be a number."), actual);
        }    
    },    
    
    /**
     * Asserts that a value is an object.
     * @param {Object} actual The value to test.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method isObject
     * @static
     */
    isObject : function (actual /*:Object*/, message /*:String*/) /*:Void*/ {
        if (!YAHOO.lang.isObject(actual)){
            throw new YAHOO.util.UnexpectedValue(this._formatMessage(message, "Value should be an object."), actual);
        }
    },
    
    /**
     * Asserts that a value is a string.
     * @param {Object} actual The value to test.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method isString
     * @static
     */
    isString : function (actual /*:Object*/, message /*:String*/) /*:Void*/ {
        if (!YAHOO.lang.isString(actual)){
            throw new YAHOO.util.UnexpectedValue(this._formatMessage(message, "Value should be a string."), actual);
        }
    },
    
    /**
     * Asserts that a value is of a particular type. 
     * @param {String} expectedType The expected type of the variable.
     * @param {Object} actualValue The actual value to test.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method isTypeOf
     * @static
     */
    isTypeOf : function (expected /*:String*/, actual /*:Object*/, message /*:String*/) /*:Void*/{
        if (typeof actual != expected){
            throw new YAHOO.util.ComparisonFailure(this._formatMessage(message, "Value should be of type " + expected + "."), expected, typeof actual);
        }
    }
};

//-----------------------------------------------------------------------------
// Assertion errors
//-----------------------------------------------------------------------------

/**
 * AssertionError is thrown whenever an assertion fails. It provides methods
 * to more easily get at error information and also provides a base class
 * from which more specific assertion errors can be derived.
 *
 * @param {String} message The message to display when the error occurs.
 * @namespace YAHOO.util
 * @class AssertionError
 * @extends Error
 * @constructor
 */ 
YAHOO.util.AssertionError = function (message /*:String*/){

    //call superclass
    //arguments.callee.superclass.constructor.call(this, message);
    
    /*
     * Error message. Must be duplicated to ensure browser receives it.
     * @type String
     * @property message
     */
    this.message /*:String*/ = message;
    
    /**
     * The name of the error that occurred.
     * @type String
     * @property name
     */
    this.name /*:String*/ = "AssertionError";
};

//inherit methods
YAHOO.lang.extend(YAHOO.util.AssertionError, Object, {

    /**
     * Returns a fully formatted error for an assertion failure. This should
     * be overridden by all subclasses to provide specific information.
     * @method getMessage
     * @return {String} A string describing the error.
     */
    getMessage : function () /*:String*/ {
        return this.message;
    },
    
    /**
     * Returns a string representation of the error.
     * @method toString
     * @return {String} A string representation of the error.
     */
    toString : function () /*:String*/ {
        return this.name + ": " + this.getMessage();
    }
    
});

/**
 * ComparisonFailure is subclass of AssertionError that is thrown whenever
 * a comparison between two values fails. It provides mechanisms to retrieve
 * both the expected and actual value.
 *
 * @param {String} message The message to display when the error occurs.
 * @param {Object} expected The expected value.
 * @param {Object} actual The actual value that caused the assertion to fail.
 * @namespace YAHOO.util
 * @extends YAHOO.util.AssertionError
 * @class ComparisonFailure
 * @constructor
 */ 
YAHOO.util.ComparisonFailure = function (message /*:String*/, expected /*:Object*/, actual /*:Object*/){

    //call superclass
    YAHOO.util.AssertionError.call(this, message);
    
    /**
     * The expected value.
     * @type Object
     * @property expected
     */
    this.expected /*:Object*/ = expected;
    
    /**
     * The actual value.
     * @type Object
     * @property actual
     */
    this.actual /*:Object*/ = actual;
    
    /**
     * The name of the error that occurred.
     * @type String
     * @property name
     */
    this.name /*:String*/ = "ComparisonFailure";
    
};

//inherit methods
YAHOO.lang.extend(YAHOO.util.ComparisonFailure, YAHOO.util.AssertionError, {

    /**
     * Returns a fully formatted error for an assertion failure. This message
     * provides information about the expected and actual values.
     * @method toString
     * @return {String} A string describing the error.
     */
    getMessage : function () /*:String*/ {
        return this.message + "\nExpected: " + this.expected + " (" + (typeof this.expected) + ")"  +
            "\nActual:" + this.actual + " (" + (typeof this.actual) + ")";
    }

});

/**
 * UnexpectedValue is subclass of AssertionError that is thrown whenever
 * a value was unexpected in its scope. This typically means that a test
 * was performed to determine that a value was *not* equal to a certain
 * value.
 *
 * @param {String} message The message to display when the error occurs.
 * @param {Object} unexpected The unexpected value.
 * @namespace YAHOO.util
 * @extends YAHOO.util.AssertionError
 * @class UnexpectedValue
 * @constructor
 */ 
YAHOO.util.UnexpectedValue = function (message /*:String*/, unexpected /*:Object*/){

    //call superclass
    YAHOO.util.AssertionError.call(this, message);
    
    /**
     * The unexpected value.
     * @type Object
     * @property unexpected
     */
    this.unexpected /*:Object*/ = unexpected;
    
    /**
     * The name of the error that occurred.
     * @type String
     * @property name
     */
    this.name /*:String*/ = "UnexpectedValue";
    
};

//inherit methods
YAHOO.lang.extend(YAHOO.util.UnexpectedValue, YAHOO.util.AssertionError, {

    /**
     * Returns a fully formatted error for an assertion failure. The message
     * contains information about the unexpected value that was encountered.
     * @method getMessage
     * @return {String} A string describing the error.
     */
    getMessage : function () /*:String*/ {
        return this.message + "\nUnexpected: " + this.unexpected + " (" + (typeof this.unexpected) + ") ";
    }

});

/**
 * ShouldFail is subclass of AssertionError that is thrown whenever
 * a test was expected to fail but did not.
 *
 * @param {String} message The message to display when the error occurs.
 * @namespace YAHOO.util
 * @extends YAHOO.util.AssertionError
 * @class ShouldFail
 * @constructor
 */  
YAHOO.util.ShouldFail = function (message /*:String*/){

    //call superclass
    YAHOO.util.AssertionError.call(this, message || "This test should fail but didn't.");
    
    /**
     * The name of the error that occurred.
     * @type String
     * @property name
     */
    this.name /*:String*/ = "ShouldFail";
    
};

//inherit methods
YAHOO.lang.extend(YAHOO.util.ShouldFail, YAHOO.util.AssertionError);

/**
 * ShouldError is subclass of AssertionError that is thrown whenever
 * a test is expected to throw an error but doesn't.
 *
 * @param {String} message The message to display when the error occurs.
 * @namespace YAHOO.util
 * @extends YAHOO.util.AssertionError
 * @class ShouldError
 * @constructor
 */  
YAHOO.util.ShouldError = function (message /*:String*/){

    //call superclass
    YAHOO.util.AssertionError.call(this, message || "This test should have thrown an error but didn't.");
    
    /**
     * The name of the error that occurred.
     * @type String
     * @property name
     */
    this.name /*:String*/ = "ShouldError";
    
};

//inherit methods
YAHOO.lang.extend(YAHOO.util.ShouldError, YAHOO.util.AssertionError);

/**
 * UnexpectedError is subclass of AssertionError that is thrown whenever
 * an error occurs within the course of a test and the test was not expected
 * to throw an error.
 *
 * @param {Error} cause The unexpected error that caused this error to be 
 *                      thrown.
 * @namespace YAHOO.util
 * @extends YAHOO.util.AssertionError
 * @class UnexpectedError
 * @constructor
 */  
YAHOO.util.UnexpectedError = function (cause /*:Object*/){

    //call superclass
    YAHOO.util.AssertionError.call(this, "Unexpected error: " + cause.message);
    
    /**
     * The unexpected error that occurred.
     * @type Error
     * @property cause
     */
    this.cause /*:Error*/ = cause;
    
    /**
     * The name of the error that occurred.
     * @type String
     * @property name
     */
    this.name /*:String*/ = "UnexpectedError";
    
    /**
     * Stack information for the error (if provided).
     * @type String
     * @property stack
     */
    this.stack /*:String*/ = cause.stack;
    
};

//inherit methods
YAHOO.lang.extend(YAHOO.util.UnexpectedError, YAHOO.util.AssertionError);
//-----------------------------------------------------------------------------
// ArrayAssert object
//-----------------------------------------------------------------------------

/**
 * The ArrayAssert object provides functions to test JavaScript array objects
 * for a variety of cases.
 *
 * @namespace YAHOO.util
 * @class ArrayAssert
 * @static
 */
 
YAHOO.util.ArrayAssert = {

    /**
     * Asserts that a value is present in an array. This uses the triple equals 
     * sign so no type coercion may occur.
     * @param {Object} needle The value that is expected in the array.
     * @param {Array} haystack An array of values.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method contains
     * @static
     */
    contains : function (needle /*:Object*/, haystack /*:Array*/, 
                           message /*:String*/) /*:Void*/ {
        
        var found /*:Boolean*/ = false;
        var Assert = YAHOO.util.Assert;
        
        //begin checking values
        for (var i=0; i < haystack.length && !found; i++){
            if (haystack[i] === needle) {
                found = true;
            }
        }
        
        if (!found){
            Assert.fail(Assert._formatMessage(message, "Value " + needle + " (" + (typeof needle) + ") not found in array [" + haystack + "]."));
        }
    },

    /**
     * Asserts that a set of values are present in an array. This uses the triple equals 
     * sign so no type coercion may occur. For this assertion to pass, all values must
     * be found.
     * @param {Object[]} needles An array of values that are expected in the array.
     * @param {Array} haystack An array of values to check.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method containsItems
     * @static
     */
    containsItems : function (needles /*:Object[]*/, haystack /*:Array*/, 
                           message /*:String*/) /*:Void*/ {

        //begin checking values
        for (var i=0; i < needles.length; i++){
            this.contains(needles[i], haystack, message);
        }
    },

    /**
     * Asserts that a value matching some condition is present in an array. This uses
     * a function to determine a match.
     * @param {Function} matcher A function that returns true if the items matches or false if not.
     * @param {Array} haystack An array of values.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method containsMatch
     * @static
     */
    containsMatch : function (matcher /*:Function*/, haystack /*:Array*/, 
                           message /*:String*/) /*:Void*/ {
        
        //check for valid matcher
        if (typeof matcher != "function"){
            throw new TypeError("ArrayAssert.containsMatch(): First argument must be a function.");
        }
        
        var found /*:Boolean*/ = false;
        var Assert = YAHOO.util.Assert;
        
        //begin checking values
        for (var i=0; i < haystack.length && !found; i++){
            if (matcher(haystack[i])) {
                found = true;
            }
        }
        
        if (!found){
            Assert.fail(Assert._formatMessage(message, "No match found in array [" + haystack + "]."));
        }
    },

    /**
     * Asserts that a value is not present in an array. This uses the triple equals 
     * sign so no type coercion may occur.
     * @param {Object} needle The value that is expected in the array.
     * @param {Array} haystack An array of values.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method doesNotContain
     * @static
     */
    doesNotContain : function (needle /*:Object*/, haystack /*:Array*/, 
                           message /*:String*/) /*:Void*/ {
        
        var found /*:Boolean*/ = false;
        var Assert = YAHOO.util.Assert;
        
        //begin checking values
        for (var i=0; i < haystack.length && !found; i++){
            if (haystack[i] === needle) {
                found = true;
            }
        }
        
        if (found){
            Assert.fail(Assert._formatMessage(message, "Value found in array [" + haystack + "]."));
        }
    },

    /**
     * Asserts that a set of values are not present in an array. This uses the triple equals 
     * sign so no type coercion may occur. For this assertion to pass, all values must
     * not be found.
     * @param {Object[]} needles An array of values that are not expected in the array.
     * @param {Array} haystack An array of values to check.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method doesNotContainItems
     * @static
     */
    doesNotContainItems : function (needles /*:Object[]*/, haystack /*:Array*/, 
                           message /*:String*/) /*:Void*/ {

        for (var i=0; i < needles.length; i++){
            this.doesNotContain(needles[i], haystack, message);
        }

    },
        
    /**
     * Asserts that no values matching a condition are present in an array. This uses
     * a function to determine a match.
     * @param {Function} matcher A function that returns true if the items matches or false if not.
     * @param {Array} haystack An array of values.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method doesNotContainMatch
     * @static
     */
    doesNotContainMatch : function (matcher /*:Function*/, haystack /*:Array*/, 
                           message /*:String*/) /*:Void*/ {
        
        //check for valid matcher
        if (typeof matcher != "function"){
            throw new TypeError("ArrayAssert.doesNotContainMatch(): First argument must be a function.");
        }

        var found /*:Boolean*/ = false;
        var Assert = YAHOO.util.Assert;
        
        //begin checking values
        for (var i=0; i < haystack.length && !found; i++){
            if (matcher(haystack[i])) {
                found = true;
            }
        }
        
        if (found){
            Assert.fail(Assert._formatMessage(message, "Value found in array [" + haystack + "]."));
        }
    },
        
    /**
     * Asserts that the given value is contained in an array at the specified index.
     * This uses the triple equals sign so no type coercion will occur.
     * @param {Object} needle The value to look for.
     * @param {Array} haystack The array to search in.
     * @param {int} index The index at which the value should exist.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method indexOf
     * @static
     */
    indexOf : function (needle /*:Object*/, haystack /*:Array*/, index /*:int*/, message /*:String*/) /*:Void*/ {
    
        //try to find the value in the array
        for (var i=0; i < haystack.length; i++){
            if (haystack[i] === needle){
                YAHOO.util.Assert.areEqual(index, i, message || "Value exists at index " + i + " but should be at index " + index + ".");
                return;
            }
        }
        
        var Assert = YAHOO.util.Assert;
        
        //if it makes it here, it wasn't found at all
        Assert.fail(Assert._formatMessage(message, "Value doesn't exist in array [" + haystack + "]."));
    },
        
    /**
     * Asserts that the values in an array are equal, and in the same position,
     * as values in another array. This uses the double equals sign
     * so type coercion may occur. Note that the array objects themselves
     * need not be the same for this test to pass.
     * @param {Array} expected An array of the expected values.
     * @param {Array} actual Any array of the actual values.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method itemsAreEqual
     * @static
     */
    itemsAreEqual : function (expected /*:Array*/, actual /*:Array*/, 
                           message /*:String*/) /*:Void*/ {
        
        //one may be longer than the other, so get the maximum length
        var len /*:int*/ = Math.max(expected.length, actual.length || 0);
        var Assert = YAHOO.util.Assert;
       
        //begin checking values
        for (var i=0; i < len; i++){
            Assert.areEqual(expected[i], actual[i], 
                Assert._formatMessage(message, "Values in position " + i + " are not equal."));
        }
    },
    
    /**
     * Asserts that the values in an array are equivalent, and in the same position,
     * as values in another array. This uses a function to determine if the values
     * are equivalent. Note that the array objects themselves
     * need not be the same for this test to pass.
     * @param {Array} expected An array of the expected values.
     * @param {Array} actual Any array of the actual values.
     * @param {Function} comparator A function that returns true if the values are equivalent
     *      or false if not.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @return {Void}
     * @method itemsAreEquivalent
     * @static
     */
    itemsAreEquivalent : function (expected /*:Array*/, actual /*:Array*/, 
                           comparator /*:Function*/, message /*:String*/) /*:Void*/ {
        
        //make sure the comparator is valid
        if (typeof comparator != "function"){
            throw new TypeError("ArrayAssert.itemsAreEquivalent(): Third argument must be a function.");
        }
        
        //one may be longer than the other, so get the maximum length
        var len /*:int*/ = Math.max(expected.length, actual.length || 0);
        
        //begin checking values
        for (var i=0; i < len; i++){
            if (!comparator(expected[i], actual[i])){
                throw new YAHOO.util.ComparisonFailure(YAHOO.util.Assert._formatMessage(message, "Values in position " + i + " are not equivalent."), expected[i], actual[i]);
            }
        }
    },
    
    /**
     * Asserts that an array is empty.
     * @param {Array} actual The array to test.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method isEmpty
     * @static
     */
    isEmpty : function (actual /*:Array*/, message /*:String*/) /*:Void*/ {        
        if (actual.length > 0){
            var Assert = YAHOO.util.Assert;
            Assert.fail(Assert._formatMessage(message, "Array should be empty."));
        }
    },    
    
    /**
     * Asserts that an array is not empty.
     * @param {Array} actual The array to test.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method isNotEmpty
     * @static
     */
    isNotEmpty : function (actual /*:Array*/, message /*:String*/) /*:Void*/ {        
        if (actual.length === 0){
            var Assert = YAHOO.util.Assert;
            Assert.fail(Assert._formatMessage(message, "Array should not be empty."));
        }
    },    
    
    /**
     * Asserts that the values in an array are the same, and in the same position,
     * as values in another array. This uses the triple equals sign
     * so no type coercion will occur. Note that the array objects themselves
     * need not be the same for this test to pass.
     * @param {Array} expected An array of the expected values.
     * @param {Array} actual Any array of the actual values.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method itemsAreSame
     * @static
     */
    itemsAreSame : function (expected /*:Array*/, actual /*:Array*/, 
                          message /*:String*/) /*:Void*/ {
        
        //one may be longer than the other, so get the maximum length
        var len /*:int*/ = Math.max(expected.length, actual.length || 0);
        var Assert = YAHOO.util.Assert;
        
        //begin checking values
        for (var i=0; i < len; i++){
            Assert.areSame(expected[i], actual[i], 
                Assert._formatMessage(message, "Values in position " + i + " are not the same."));
        }
    },
    
    /**
     * Asserts that the given value is contained in an array at the specified index,
     * starting from the back of the array.
     * This uses the triple equals sign so no type coercion will occur.
     * @param {Object} needle The value to look for.
     * @param {Array} haystack The array to search in.
     * @param {int} index The index at which the value should exist.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method lastIndexOf
     * @static
     */
    lastIndexOf : function (needle /*:Object*/, haystack /*:Array*/, index /*:int*/, message /*:String*/) /*:Void*/ {
    
        var Assert = YAHOO.util.Assert;
    
        //try to find the value in the array
        for (var i=haystack.length; i >= 0; i--){
            if (haystack[i] === needle){
                Assert.areEqual(index, i, Assert._formatMessage(message, "Value exists at index " + i + " but should be at index " + index + "."));
                return;
            }
        }
        
        //if it makes it here, it wasn't found at all
        Assert.fail(Assert._formatMessage(message, "Value doesn't exist in array."));        
    }
    
};
YAHOO.namespace("util");


//-----------------------------------------------------------------------------
// ObjectAssert object
//-----------------------------------------------------------------------------

/**
 * The ObjectAssert object provides functions to test JavaScript objects
 * for a variety of cases.
 *
 * @namespace YAHOO.util
 * @class ObjectAssert
 * @static
 */
YAHOO.util.ObjectAssert = {
        
    /**
     * Asserts that all properties in the object exist in another object.
     * @param {Object} expected An object with the expected properties.
     * @param {Object} actual An object with the actual properties.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method propertiesAreEqual
     * @static
     */
    propertiesAreEqual : function (expected /*:Object*/, actual /*:Object*/, 
                           message /*:String*/) /*:Void*/ {
        
        var Assert = YAHOO.util.Assert;
        
        //get all properties in the object
        var properties /*:Array*/ = [];        
        for (var property in expected){
            properties.push(property);
        }
        
        //see if the properties are in the expected object
        for (var i=0; i < properties.length; i++){
            Assert.isNotUndefined(actual[properties[i]], 
                Assert._formatMessage(message, "Property '" + properties[i] + "' expected."));
        }

    },
    
    /**
     * Asserts that an object has a property with the given name.
     * @param {String} propertyName The name of the property to test.
     * @param {Object} object The object to search.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method hasProperty
     * @static
     */    
    hasProperty : function (propertyName /*:String*/, object /*:Object*/, message /*:String*/) /*:Void*/ {
        if (!(propertyName in object)){
            var Assert = YAHOO.util.Assert;
            Assert.fail(Assert._formatMessage(message, "Property '" + propertyName + "' not found on object."));
        }    
    },
    
    /**
     * Asserts that a property with the given name exists on an object instance (not on its prototype).
     * @param {String} propertyName The name of the property to test.
     * @param {Object} object The object to search.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method hasProperty
     * @static
     */    
    hasOwnProperty : function (propertyName /*:String*/, object /*:Object*/, message /*:String*/) /*:Void*/ {
        if (!YAHOO.lang.hasOwnProperty(object, propertyName)){
            var Assert = YAHOO.util.Assert;
            Assert.fail(Assert._formatMessage(message, "Property '" + propertyName + "' not found on object instance."));
        }     
    }
};
//-----------------------------------------------------------------------------
// DateAssert object
//-----------------------------------------------------------------------------

/**
 * The DateAssert object provides functions to test JavaScript Date objects
 * for a variety of cases.
 *
 * @namespace YAHOO.util
 * @class DateAssert
 * @static
 */
 
YAHOO.util.DateAssert = {

    /**
     * Asserts that a date's month, day, and year are equal to another date's.
     * @param {Date} expected The expected date.
     * @param {Date} actual The actual date to test.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method datesAreEqual
     * @static
     */
    datesAreEqual : function (expected /*:Date*/, actual /*:Date*/, message /*:String*/){
        if (expected instanceof Date && actual instanceof Date){
            var Assert = YAHOO.util.Assert;
            Assert.areEqual(expected.getFullYear(), actual.getFullYear(), Assert._formatMessage(message, "Years should be equal."));
            Assert.areEqual(expected.getMonth(), actual.getMonth(), Assert._formatMessage(message, "Months should be equal."));
            Assert.areEqual(expected.getDate(), actual.getDate(), Assert._formatMessage(message, "Day of month should be equal."));
        } else {
            throw new TypeError("DateAssert.datesAreEqual(): Expected and actual values must be Date objects.");
        }
    },

    /**
     * Asserts that a date's hour, minutes, and seconds are equal to another date's.
     * @param {Date} expected The expected date.
     * @param {Date} actual The actual date to test.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method timesAreEqual
     * @static
     */
    timesAreEqual : function (expected /*:Date*/, actual /*:Date*/, message /*:String*/){
        if (expected instanceof Date && actual instanceof Date){
            var Assert = YAHOO.util.Assert;
            Assert.areEqual(expected.getHours(), actual.getHours(), Assert._formatMessage(message, "Hours should be equal."));
            Assert.areEqual(expected.getMinutes(), actual.getMinutes(), Assert._formatMessage(message, "Minutes should be equal."));
            Assert.areEqual(expected.getSeconds(), actual.getSeconds(), Assert._formatMessage(message, "Seconds should be equal."));
        } else {
            throw new TypeError("DateAssert.timesAreEqual(): Expected and actual values must be Date objects.");
        }
    }
    
};
YAHOO.namespace("tool");

//-----------------------------------------------------------------------------
// TestManager object
//-----------------------------------------------------------------------------

/**
 * Runs pages containing test suite definitions.
 * @namespace YAHOO.tool
 * @class TestManager
 * @static
 */
YAHOO.tool.TestManager = {

    /**
     * Constant for the testpagebegin custom event
     * @property TEST_PAGE_BEGIN_EVENT
     * @static
     * @type string
     * @final
     */
    TEST_PAGE_BEGIN_EVENT /*:String*/ : "testpagebegin",

    /**
     * Constant for the testpagecomplete custom event
     * @property TEST_PAGE_COMPLETE_EVENT
     * @static
     * @type string
     * @final
     */
    TEST_PAGE_COMPLETE_EVENT /*:String*/ : "testpagecomplete",

    /**
     * Constant for the testmanagerbegin custom event
     * @property TEST_MANAGER_BEGIN_EVENT
     * @static
     * @type string
     * @final
     */
    TEST_MANAGER_BEGIN_EVENT /*:String*/ : "testmanagerbegin",

    /**
     * Constant for the testmanagercomplete custom event
     * @property TEST_MANAGER_COMPLETE_EVENT
     * @static
     * @type string
     * @final
     */
    TEST_MANAGER_COMPLETE_EVENT /*:String*/ : "testmanagercomplete",

    //-------------------------------------------------------------------------
    // Private Properties
    //-------------------------------------------------------------------------
    
    
    /**
     * The URL of the page currently being executed.
     * @type String
     * @private
     * @property _curPage
     * @static
     */
    _curPage /*:String*/ : null,
    
    /**
     * The frame used to load and run tests.
     * @type Window
     * @private
     * @property _frame
     * @static
     */
    _frame /*:Window*/ : null,
    
    /**
     * The logger used to output results from the various tests.
     * @type YAHOO.tool.TestLogger
     * @private
     * @property _logger
     * @static
     */
    _logger : null,
    
    /**
     * The timeout ID for the next iteration through the tests.
     * @type int
     * @private
     * @property _timeoutId
     * @static
     */
    _timeoutId /*:int*/ : 0,
    
    /**
     * Array of pages to load.
     * @type String[]
     * @private
     * @property _pages
     * @static
     */
    _pages /*:String[]*/ : [],
    
    /**
     * Aggregated results
     * @type Object
     * @private
     * @property _results
     * @static
     */
    _results: null,
    
    //-------------------------------------------------------------------------
    // Private Methods
    //-------------------------------------------------------------------------
    
    /**
     * Handles TestRunner.COMPLETE_EVENT, storing the results and beginning
     * the loop again.
     * @param {Object} data Data about the event.
     * @return {Void}
     * @private
     * @static
     */
    _handleTestRunnerComplete : function (data /*:Object*/) /*:Void*/ {

        this.fireEvent(this.TEST_PAGE_COMPLETE_EVENT, {
                page: this._curPage,
                results: data.results
            });
    
        //save results
        //this._results[this.curPage] = data.results;
        
        //process 'em
        this._processResults(this._curPage, data.results);
        
        this._logger.clearTestRunner();
    
        //if there's more to do, set a timeout to begin again
        if (this._pages.length){
            this._timeoutId = setTimeout(function(){
                YAHOO.tool.TestManager._run();
            }, 1000);
        } else {
            this.fireEvent(this.TEST_MANAGER_COMPLETE_EVENT, this._results);
        }
    },
    
    /**
     * Processes the results of a test page run, outputting log messages
     * for failed tests.
     * @return {Void}
     * @private
     * @static
     */
    _processResults : function (page /*:String*/, results /*:Object*/) /*:Void*/ {

        var r = this._results;
        
        r.passed += results.passed;
        r.failed += results.failed;
        r.ignored += results.ignored;
        r.total += results.total;
        r.duration += results.duration;
        
        if (results.failed){
            r.failedPages.push(page);
        } else {
            r.passedPages.push(page);
        }
        
        results.name = page;
        results.type = "page";
        
        r[page] = results;
    },
    
    /**
     * Loads the next test page into the iframe.
     * @return {Void}
     * @static
     * @private
     */
    _run : function () /*:Void*/ {
    
        //set the current page
        this._curPage = this._pages.shift();

        this.fireEvent(this.TEST_PAGE_BEGIN_EVENT, this._curPage);
        
        //load the frame - destroy history in case there are other iframes that
        //need testing
        this._frame.location.replace(this._curPage);
    
    },
        
    //-------------------------------------------------------------------------
    // Public Methods
    //-------------------------------------------------------------------------
    
    /**
     * Signals that a test page has been loaded. This should be called from
     * within the test page itself to notify the TestManager that it is ready.
     * @return {Void}
     * @static
     */
    load : function () /*:Void*/ {
        if (parent.YAHOO.tool.TestManager !== this){
            parent.YAHOO.tool.TestManager.load();
        } else {
            
            if (this._frame) {
                //assign event handling
                var TestRunner = this._frame.YAHOO.tool.TestRunner;

                this._logger.setTestRunner(TestRunner);
                TestRunner.subscribe(TestRunner.COMPLETE_EVENT, this._handleTestRunnerComplete, this, true);
                
                //run it
                TestRunner.run();
            }
        }
    },
    
    /**
     * Sets the pages to be loaded.
     * @param {String[]} pages An array of URLs to load.
     * @return {Void}
     * @static
     */
    setPages : function (pages /*:String[]*/) /*:Void*/ {
        this._pages = pages;
    },
    
    /**
     * Begins the process of running the tests.
     * @return {Void}
     * @static
     */
    start : function () /*:Void*/ {

        if (!this._initialized) {

            /**
             * Fires when loading a test page
             * @event testpagebegin
             * @param curPage {string} the page being loaded
             * @static
             */
            this.createEvent(this.TEST_PAGE_BEGIN_EVENT);

            /**
             * Fires when a test page is complete
             * @event testpagecomplete
             * @param obj {page: string, results: object} the name of the
             * page that was loaded, and the test suite results
             * @static
             */
            this.createEvent(this.TEST_PAGE_COMPLETE_EVENT);

            /**
             * Fires when the test manager starts running all test pages
             * @event testmanagerbegin
             * @static
             */
            this.createEvent(this.TEST_MANAGER_BEGIN_EVENT);

            /**
             * Fires when the test manager finishes running all test pages.  External
             * test runners should subscribe to this event in order to get the
             * aggregated test results.
             * @event testmanagercomplete
             * @param obj { pages_passed: int, pages_failed: int, tests_passed: int
             *              tests_failed: int, passed: string[], failed: string[],
             *              page_results: {} }
             * @static
             */
            this.createEvent(this.TEST_MANAGER_COMPLETE_EVENT);

            //create iframe if not already available
            if (!this._frame){
                var frame /*:HTMLElement*/ = document.createElement("iframe");
                frame.style.visibility = "hidden";
                frame.style.position = "absolute";
                document.body.appendChild(frame);
                this._frame = frame.contentWindow || frame.contentDocument.parentWindow;
            }
            
            //create test logger if not already available
            if (!this._logger){
                this._logger = new YAHOO.tool.TestLogger();
            }

            this._initialized = true;
        }


        // reset the results cache
        this._results = {
        
            passed: 0,
            failed: 0,
            ignored: 0,
            total: 0,
            type: "report",
            name: "YUI Test Results",
            duration: 0,
            failedPages:[],
            passedPages:[]
            /*
            // number of pages that pass
            pages_passed: 0,
            // number of pages that fail
            pages_failed: 0,
            // total number of tests passed
            tests_passed: 0,
            // total number of tests failed
            tests_failed: 0,
            // array of pages that passed
            passed: [],
            // array of pages that failed
            failed: [],
            // map of full results for each page
            page_results: {}*/
        };

        this.fireEvent(this.TEST_MANAGER_BEGIN_EVENT, null);
        this._run();
    
    },

    /**
     * Stops the execution of tests.
     * @return {Void}
     * @static
     */
    stop : function () /*:Void*/ {
        clearTimeout(this._timeoutId);
    }

};

YAHOO.lang.augmentObject(YAHOO.tool.TestManager, YAHOO.util.EventProvider.prototype);

YAHOO.namespace("tool");

//-----------------------------------------------------------------------------
// TestLogger object
//-----------------------------------------------------------------------------

/**
 * Displays test execution progress and results, providing filters based on
 * different key events.
 * @namespace YAHOO.tool
 * @class TestLogger
 * @constructor
 * @param {HTMLElement} element (Optional) The element to create the logger in.
 * @param {Object} config (Optional) Configuration options for the logger.
 */
YAHOO.tool.TestLogger = function (element, config) {
    YAHOO.tool.TestLogger.superclass.constructor.call(this, element, config);
    this.init();
};

YAHOO.lang.extend(YAHOO.tool.TestLogger, YAHOO.widget.LogReader, {

    footerEnabled : true,
    newestOnTop : false,

    /**
     * Formats message string to HTML for output to console.
     * @private
     * @method formatMsg
     * @param oLogMsg {Object} Log message object.
     * @return {String} HTML-formatted message for output to console.
     */
    formatMsg : function(message /*:Object*/) {
    
        var category /*:String*/ = message.category;        
        var text /*:String*/ = this.html2Text(message.msg);
        
        return "<pre><p><span class=\"" + category + "\">" + category.toUpperCase() + "</span> " + text + "</p></pre>";
    
    },
    
    //-------------------------------------------------------------------------
    // Private Methods
    //-------------------------------------------------------------------------
    
    /*
     * Initializes the logger.
     * @private
     */
    init : function () {
    
        //attach to any available TestRunner
        if (YAHOO.tool.TestRunner){
            this.setTestRunner(YAHOO.tool.TestRunner);
        }
        
        //hide useless sources
        this.hideSource("global");
        this.hideSource("LogReader");
        
        //hide useless message categories
        this.hideCategory("warn");
        this.hideCategory("window");
        this.hideCategory("time");
        
        //reset the logger
        this.clearConsole();
    },
    
    /**
     * Clears the reference to the TestRunner from previous operations. This 
     * unsubscribes all events and removes the object reference.
     * @return {Void}
     * @static
     */
    clearTestRunner : function () /*:Void*/ {
        if (this._runner){
            this._runner.unsubscribeAll();
            this._runner = null;
        }
    },
    
    /**
     * Sets the source test runner that the logger should monitor.
     * @param {YAHOO.tool.TestRunner} testRunner The TestRunner to observe.
     * @return {Void}
     * @static
     */
    setTestRunner : function (testRunner /*:YAHOO.tool.TestRunner*/) /*:Void*/ {
    
        if (this._runner){
            this.clearTestRunner();
        }
        
        this._runner = testRunner;
        
        //setup event _handlers
        testRunner.subscribe(testRunner.TEST_PASS_EVENT, this._handleTestRunnerEvent, this, true);
        testRunner.subscribe(testRunner.TEST_FAIL_EVENT, this._handleTestRunnerEvent, this, true);
        testRunner.subscribe(testRunner.TEST_IGNORE_EVENT, this._handleTestRunnerEvent, this, true);
        testRunner.subscribe(testRunner.BEGIN_EVENT, this._handleTestRunnerEvent, this, true);
        testRunner.subscribe(testRunner.COMPLETE_EVENT, this._handleTestRunnerEvent, this, true);
        testRunner.subscribe(testRunner.TEST_SUITE_BEGIN_EVENT, this._handleTestRunnerEvent, this, true);
        testRunner.subscribe(testRunner.TEST_SUITE_COMPLETE_EVENT, this._handleTestRunnerEvent, this, true);
        testRunner.subscribe(testRunner.TEST_CASE_BEGIN_EVENT, this._handleTestRunnerEvent, this, true);
        testRunner.subscribe(testRunner.TEST_CASE_COMPLETE_EVENT, this._handleTestRunnerEvent, this, true);    
    },
    
    //-------------------------------------------------------------------------
    // Event Handlers
    //-------------------------------------------------------------------------
    
    /**
     * Handles all TestRunner events, outputting appropriate data into the console.
     * @param {Object} data The event data object.
     * @return {Void}
     * @private
     */
    _handleTestRunnerEvent : function (data /*:Object*/) /*:Void*/ {
    
        //shortcut variables
        var TestRunner /*:Object*/ = YAHOO.tool.TestRunner;
    
        //data variables
        var message /*:String*/ = "";
        var messageType /*:String*/ = "";
        
        switch(data.type){
            case TestRunner.BEGIN_EVENT:
                message = "Testing began at " + (new Date()).toString() + ".";
                messageType = "info";
                break;
                
            case TestRunner.COMPLETE_EVENT:
                message = "Testing completed at " + (new Date()).toString() + ".\nPassed:" + 
                    data.results.passed + " Failed:" + data.results.failed + " Total:" + data.results.total;
                messageType = "info";
                break;
                
            case TestRunner.TEST_FAIL_EVENT:
                message = data.testName + ": " + data.error.getMessage();
                messageType = "fail";
                break;
                
            case TestRunner.TEST_IGNORE_EVENT:
                message = data.testName + ": ignored.";
                messageType = "ignore";
                break;
                
            case TestRunner.TEST_PASS_EVENT:
                message = data.testName + ": passed.";
                messageType = "pass";
                break;
                
            case TestRunner.TEST_SUITE_BEGIN_EVENT:
                message = "Test suite \"" + data.testSuite.name + "\" started.";
                messageType = "info";
                break;
                
            case TestRunner.TEST_SUITE_COMPLETE_EVENT:
                message = "Test suite \"" + data.testSuite.name + "\" completed.\nPassed:" + 
                    data.results.passed + " Failed:" + data.results.failed + " Total:" + data.results.total;
                messageType = "info";
                break;
                
            case TestRunner.TEST_CASE_BEGIN_EVENT:
                message = "Test case \"" + data.testCase.name + "\" started.";
                messageType = "info";
                break;
                
            case TestRunner.TEST_CASE_COMPLETE_EVENT:
                message = "Test case \"" + data.testCase.name + "\" completed.\nPassed:" + 
                    data.results.passed + " Failed:" + data.results.failed + " Total:" + data.results.total;
                messageType = "info";
                break;
            default:
                message = "Unexpected event " + data.type;
                message = "info";
        }
    
        YAHOO.log(message, messageType, "TestRunner");    
    }
    
});
YAHOO.namespace("tool.TestFormat");

(function(){

    /**
     * Returns test results formatted as a JSON string. Requires JSON utility.
     * @param {Object} result The results object created by TestRunner.
     * @return {String} An XML-formatted string of results.
     * @namespace YAHOO.tool.TestFormat
     * @method JSON
     * @static
     */
    YAHOO.tool.TestFormat.JSON = function(results) {
        return YAHOO.lang.JSON.stringify(results);
    };

    /* (intentionally not documented)
     * Simple escape function for XML attribute values.
     * @param {String} text The text to escape.
     * @return {String} The escaped text.
     */
    function xmlEscape(text){
        return text.replace(/["'<>&]/g, function(c){
            switch(c){
                case "<":   return "&lt;";
                case ">":   return "&gt;";
                case "\"":  return "&quot;";
                case "'":   return "&apos;";
                case "&":   return "&amp;";
            }
        });
    } 

    /**
     * Returns test results formatted as an XML string.
     * @param {Object} result The results object created by TestRunner.
     * @return {String} An XML-formatted string of results.
     * @namespace YAHOO.tool.TestFormat
     * @method XML
     * @static
     */
    YAHOO.tool.TestFormat.XML = function(results) {

        function serializeToXML(results){
            var l   = YAHOO.lang,
                xml = "<" + results.type + " name=\"" + xmlEscape(results.name) + "\"";
            
            if (l.isNumber(results.duration)){
                xml += " duration=\"" + results.duration + "\"";
            }
            
            if (results.type == "test"){
                xml += " result=\"" + results.result + "\" message=\"" + xmlEscape(results.message) + "\">";
            } else {
                xml += " passed=\"" + results.passed + "\" failed=\"" + results.failed + "\" ignored=\"" + results.ignored + "\" total=\"" + results.total + "\">";
                for (var prop in results) {
                    if (l.hasOwnProperty(results, prop) && l.isObject(results[prop]) && !l.isArray(results[prop])){
                        xml += serializeToXML(results[prop]);
                    }
                }        
            }

            xml += "</" + results.type + ">";
            
            return xml;    
        }

        return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" + serializeToXML(results);

    };


    /**
     * Returns test results formatted in JUnit XML format.
     * @param {Object} result The results object created by TestRunner.
     * @return {String} An XML-formatted string of results.
     * @namespace YAHOO.tool.TestFormat
     * @method JUnitXML
     * @static
     */
    YAHOO.tool.TestFormat.JUnitXML = function(results) {


        function serializeToJUnitXML(results){
            var l   = YAHOO.lang,
                xml = "",
                prop;
                
            switch (results.type){
                //equivalent to testcase in JUnit
                case "test":
                    if (results.result != "ignore"){
                        xml = "<testcase name=\"" + xmlEscape(results.name) + "\">";
                        if (results.result == "fail"){
                            xml += "<failure message=\"" + xmlEscape(results.message) + "\"><![CDATA[" + results.message + "]]></failure>";
                        }
                        xml+= "</testcase>";
                    }
                    break;
                    
                //equivalent to testsuite in JUnit
                case "testcase":
                
                    xml = "<testsuite name=\"" + xmlEscape(results.name) + "\" tests=\"" + results.total + "\" failures=\"" + results.failed + "\">";
                
                    for (prop in results) {
                        if (l.hasOwnProperty(results, prop) && l.isObject(results[prop]) && !l.isArray(results[prop])){
                            xml += serializeToJUnitXML(results[prop]);
                        }
                    }              
                    
                    xml += "</testsuite>";
                    break;
                
                case "testsuite":
                    for (prop in results) {
                        if (l.hasOwnProperty(results, prop) && l.isObject(results[prop]) && !l.isArray(results[prop])){
                            xml += serializeToJUnitXML(results[prop]);
                        }
                    } 

                    //skip output - no JUnit equivalent                    
                    break;
                    
                case "report":
                
                    xml = "<testsuites>";
                
                    for (prop in results) {
                        if (l.hasOwnProperty(results, prop) && l.isObject(results[prop]) && !l.isArray(results[prop])){
                            xml += serializeToJUnitXML(results[prop]);
                        }
                    }              
                    
                    xml += "</testsuites>";            
                
                //no default
            }
            
            return xml;
     
        }

        return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" + serializeToJUnitXML(results);
    };
    
    /**
     * Returns test results formatted in TAP format.
     * For more information, see <a href="http://testanything.org/">Test Anything Protocol</a>.
     * @param {Object} result The results object created by TestRunner.
     * @return {String} A TAP-formatted string of results.
     * @namespace YAHOO.tool.TestFormat
     * @method TAP
     * @static
     */
    YAHOO.tool.TestFormat.TAP = function(results) {
    
        var currentTestNum = 1;

        function serializeToTAP(results){
            var l   = YAHOO.lang,
                text = "";
                
            switch (results.type){

                case "test":
                    if (results.result != "ignore"){

                        text = "ok " + (currentTestNum++) + " - " + results.name;
                        
                        if (results.result == "fail"){
                            text = "not " + text + " - " + results.message;
                        }
                        
                        text += "\n";
                    } else {
                        text = "#Ignored test " + results.name + "\n";
                    }
                    break;
                    
                case "testcase":
                
                    text = "#Begin testcase " + results.name + "(" + results.failed + " failed of " + results.total + ")\n";
                                    
                                    
                    for (prop in results) {
                        if (l.hasOwnProperty(results, prop) && l.isObject(results[prop]) && !l.isArray(results[prop])){
                            text += serializeToTAP(results[prop]);
                        }
                    }              
                                                        
                    text += "#End testcase " + results.name + "\n";
                    
                    
                    break;
                
                case "testsuite":

                    text = "#Begin testsuite " + results.name + "(" + results.failed + " failed of " + results.total + ")\n";                
                
                    for (prop in results) {
                        if (l.hasOwnProperty(results, prop) && l.isObject(results[prop]) && !l.isArray(results[prop])){
                            text += serializeToTAP(results[prop]);
                        }
                    }   

                    text += "#End testsuite " + results.name + "\n";
                    break;

                case "report":
                
                    for (prop in results) {
                        if (l.hasOwnProperty(results, prop) && l.isObject(results[prop]) && !l.isArray(results[prop])){
                            text += serializeToTAP(results[prop]);
                        }
                    }             
                    
                //no default
            }
            
            return text;
     
        }

        return "1.." + results.total + "\n" + serializeToTAP(results);
    };   

})();
YAHOO.namespace("tool.CoverageFormat");

/**
 * Returns the coverage report in JSON format. This is the straight
 * JSON representation of the native coverage report.
 * @param {Object} coverage The coverage report object.
 * @return {String} A JSON-formatted string of coverage data.
 * @method JSON
 * @namespace YAHOO.tool.CoverageFormat
 */
YAHOO.tool.CoverageFormat.JSON = function(coverage){
    return YAHOO.lang.JSON.stringify(coverage);
};

/**
 * Returns the coverage report in a JSON format compatible with
 * Xdebug. See <a href="http://www.xdebug.com/docs/code_coverage">Xdebug Documentation</a>
 * for more information. Note: function coverage is not available
 * in this format.
 * @param {Object} coverage The coverage report object.
 * @return {String} A JSON-formatted string of coverage data.
 * @method XdebugJSON
 * @namespace YAHOO.tool.CoverageFormat
 */
YAHOO.tool.CoverageFormat.XdebugJSON = function(coverage){
    var report = {},
        prop;
    for (prop in coverage){
        if (coverage.hasOwnProperty(prop)){
            report[prop] = coverage[prop].lines;
        }
    }

    return YAHOO.lang.JSON.stringify(report);        
};

YAHOO.namespace("tool");

/**
 * An object capable of sending test results to a server.
 * @param {String} url The URL to submit the results to.
 * @param {Function} format (Optiona) A function that outputs the results in a specific format.
 *      Default is YAHOO.tool.TestFormat.XML.
 * @constructor
 * @namespace YAHOO.tool
 * @class TestReporter
 */
YAHOO.tool.TestReporter = function(url /*:String*/, format /*:Function*/) {

    /**
     * The URL to submit the data to.
     * @type String
     * @property url
     */
    this.url /*:String*/ = url;

    /**
     * The formatting function to call when submitting the data.
     * @type Function
     * @property format
     */
    this.format /*:Function*/ = format || YAHOO.tool.TestFormat.XML;

    /**
     * Extra fields to submit with the request.
     * @type Object
     * @property _fields
     * @private
     */
    this._fields /*:Object*/ = new Object();
    
    /**
     * The form element used to submit the results.
     * @type HTMLFormElement
     * @property _form
     * @private
     */
    this._form /*:HTMLElement*/ = null;

    /**
     * Iframe used as a target for form submission.
     * @type HTMLIFrameElement
     * @property _iframe
     * @private
     */
    this._iframe /*:HTMLElement*/ = null;
};

YAHOO.tool.TestReporter.prototype = {

    //restore missing constructor
    constructor: YAHOO.tool.TestReporter,
    
    /**
     * Convert a date into ISO format.
     * From Douglas Crockford's json2.js
     * @param {Date} date The date to convert.
     * @return {String} An ISO-formatted date string
     * @method _convertToISOString
     * @private
     */    
    _convertToISOString: function(date){
        function f(n) {
            // Format integers to have at least two digits.
            return n < 10 ? '0' + n : n;
        }

        return date.getUTCFullYear()   + '-' +
             f(date.getUTCMonth() + 1) + '-' +
             f(date.getUTCDate())      + 'T' +
             f(date.getUTCHours())     + ':' +
             f(date.getUTCMinutes())   + ':' +
             f(date.getUTCSeconds())   + 'Z';     
    
    },

    /**
     * Adds a field to the form that submits the results.
     * @param {String} name The name of the field.
     * @param {Variant} value The value of the field.
     * @return {Void}
     * @method addField
     */
    addField : function (name /*:String*/, value /*:Variant*/) /*:Void*/{
        this._fields[name] = value;    
    },
    
    /**
     * Removes all previous defined fields.
     * @return {Void}
     * @method addField
     */
    clearFields : function() /*:Void*/{
        this._fields = new Object();
    },

    /**
     * Cleans up the memory associated with the TestReporter, removing DOM elements
     * that were created.
     * @return {Void}
     * @method destroy
     */
    destroy : function() /*:Void*/ {
        if (this._form){
            this._form.parentNode.removeChild(this._form);
            this._form = null;
        }        
        if (this._iframe){
            this._iframe.parentNode.removeChild(this._iframe);
            this._iframe = null;
        }
        this._fields = null;
    },

    /**
     * Sends the report to the server.
     * @param {Object} results The results object created by TestRunner.
     * @return {Void}
     * @method report
     */
    report : function(results /*:Object*/) /*:Void*/{
    
        //if the form hasn't been created yet, create it
        if (!this._form){
            this._form = document.createElement("form");
            this._form.method = "post";
            this._form.style.visibility = "hidden";
            this._form.style.position = "absolute";
            this._form.style.top = 0;
            document.body.appendChild(this._form);
        
            //IE won't let you assign a name using the DOM, must do it the hacky way
            if (YAHOO.env.ua.ie){
                this._iframe = document.createElement("<iframe name=\"yuiTestTarget\" />");
            } else {
                this._iframe = document.createElement("iframe");
                this._iframe.name = "yuiTestTarget";
            }

            this._iframe.src = "javascript:false";
            this._iframe.style.visibility = "hidden";
            this._iframe.style.position = "absolute";
            this._iframe.style.top = 0;
            document.body.appendChild(this._iframe);

            this._form.target = "yuiTestTarget";
        }

        //set the form's action
        this._form.action = this.url;
    
        //remove any existing fields
        while(this._form.hasChildNodes()){
            this._form.removeChild(this._form.lastChild);
        }
        
        //create default fields
        this._fields.results = this.format(results);
        this._fields.useragent = navigator.userAgent;
        this._fields.timestamp = this._convertToISOString(new Date());

        //add fields to the form
        for (var prop in this._fields){
            if (YAHOO.lang.hasOwnProperty(this._fields, prop) && typeof this._fields[prop] != "function"){
                if (YAHOO.env.ua.ie){
                    input = document.createElement("<input name=\"" + prop + "\" >");
                } else {
                    input = document.createElement("input");
                    input.name = prop;
                }
                input.type = "hidden";
                input.value = this._fields[prop];
                this._form.appendChild(input);
            }
        }

        //remove default fields
        delete this._fields.results;
        delete this._fields.useragent;
        delete this._fields.timestamp;
        
        if (arguments[1] !== false){
            this._form.submit();
        }
    
    }

};
/*Stub for future compatibility*/
YUITest = {
    TestRunner:     YAHOO.tool.TestRunner,
    ResultsFormat:  YAHOO.tool.TestFormat,
    CoverageFormat: YAHOO.tool.CoverageFormat
};
YAHOO.register("yuitest", YAHOO.tool.TestRunner, {version: "2.9.0", build: "2800"});
