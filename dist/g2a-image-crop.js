var ImageCrop = (function () {
'use strict';

/**
 * Validates Node
 *
 * @param {String|Object} node - query selector or node object
 * @return {Object} node - valid node object
 */
function validateNode(node) {
    if (!node) {
        throw Error("Node is not passed or invalid selector.");
    }

    var element = node;

    if (typeof element === "string") {
        element = document.querySelector(node);
        if (!element) {
            throw Error("Invalid selector.");
        }
    }

    if (!(element instanceof window.HTMLElement)) {
        throw Error("Node should be instance of window.HTMLElement or valid selector string.");
    }

    return element;
}

/**
 * Validates provided Image Crop config
 *
 * @param {Object} config - config object
 */
function validateConfig(config) {
    if (!config) {
        throw Error("Config is not passed or invalid.");
    }

    if (Object.prototype.toString.call(config) !== "[object Object]") {
        throw Error("Invalid config.");
    }
}

/**
 * Validates provided dimension (width or height)
 *
 * @param {Number} value - config object
 * @return {Number} value - valid dimension
 */
function validateDimension(value) {
    if (!value && value !== 0) {
        throw Error("Dimension is not passed or invalid.");
    }

    if (typeof value !== "number") {
        throw Error("Invalid dimension.");
    }

    if (!isFinite(value)) {
        throw Error("Invalid dimension.");
    }

    if (value < 0) {
        throw Error("Invalid dimension.");
    }

    return value;
}

/**
 * Validates provided callback
 *
 * @param {Function} callback - Callback function.
 */
function validateCallback(callback) {
    if (typeof callback === "undefined") {
        return function () {};
    }
    if (!callback || typeof callback !== "function") {
        throw Error("Invalid callback.");
    }
    return callback;
}

/**
 * Default Canvas dimensions
 */
var defaultDimensions = {
    width: 560,
    height: 340
};

/**
 * Default styles
 */
var styles = {
    cutout: {
        fill: "rgba(0, 0, 0, 0.3)"
    },
    pattern: {
        size: 16,
        fill1: "rgb(215, 215, 215)",
        fill2: "rgb(250, 250, 250)"
    }
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

/**
 * Class representing a Size
 */
var Size =
/**
 * Create a Size
 */
function Size() {
  var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  classCallCheck(this, Size);

  this.width = width;
  this.height = height;
};

/**
 * Class representing a base element
 */

var Element = function () {
    /**
     * Create an element
     *
     * @param {String|Object} node - The element.
     */
    function Element(node) {
        classCallCheck(this, Element);

        this._node = node;
        if (!node || typeof node === "string") {
            if (node === "svg" || node === "use") {
                this._node = document.createElementNS("http://www.w3.org/2000/svg", node);
                return;
            }
            this._node = document.createElement(node || "div");
        }
    }

    /**
     * Add an Element's node to the end of the list of children of a specified parent node
     *
     * @param {Object} parent - The DOM Element object, parent node
     * @return {Element} An Element object.
     */


    createClass(Element, [{
        key: "render",
        value: function render(parent) {
            if (!parent) {
                throw Error("Parent node are not passed.");
            }

            parent.appendChild(this._node);
            return this;
        }

        /**
         * Change width of Element
         *
         * @param {Number} width - The number of pixels.
         * @return {Canvas} A Canvas object.
         */

    }, {
        key: "setWidth",
        value: function setWidth(width) {
            this._node.width = width;
            return this;
        }

        /**
         * Change height of Element
         *
         * @param {Number} height - The number of pixels.
         * @return {Canvas} A Canvas object.
         */

    }, {
        key: "setHeight",
        value: function setHeight(height) {
            this._node.height = height;
            return this;
        }

        /**
         * Get a drawing 2d context on the canvas
         *
         * @return {Object} - RenderingContext
         */

    }, {
        key: "getSize",
        value: function getSize() {
            return new Size(this._node.width, this._node.height);
        }

        /**
         * Get a drawing 2d context on the canvas
         *
         * @return {Object} - A node.
         */

    }, {
        key: "getNode",
        value: function getNode() {
            return this._node;
        }

        /**
         * Get a drawing 2d context on the canvas
         *
         * @return {Object} - RenderingContext
         */

    }, {
        key: "getContext2d",
        value: function getContext2d() {
            return this._node.getContext("2d");
        }

        /**
         * Change the type of HTML element (type attribute)
         *
         * @return {Element} - An Element object.
         */

    }, {
        key: "setType",
        value: function setType(type) {
            this._node.type = type;
            return this;
        }

        /**
         * Add class to HTML element (attribute `class`)
         *
         * @return {Element} - An Element object.
         */

    }, {
        key: "addClass",
        value: function addClass(newClass) {
            this._node.className += this._node.className.length > 1 ? " " + newClass : newClass;
            return this;
        }

        /**
         * Adds a new attribute or changes the value of an existing attribute on the HTML element.
         *
         * @return {Element} - An Element object.
         */

    }, {
        key: "setAttribute",
        value: function setAttribute(attributeName, attributeValue) {
            this._node.setAttribute(attributeName, attributeValue);
            return this;
        }
    }]);
    return Element;
}();

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}



function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var es6Promise = createCommonjsModule(function (module, exports) {
  /*!
   * @overview es6-promise - a tiny implementation of Promises/A+.
   * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
   * @license   Licensed under MIT license
   *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
   * @version   4.0.5
   */

  (function (global, factory) {
    module.exports = factory();
  })(commonjsGlobal, function () {
    'use strict';

    function objectOrFunction(x) {
      return typeof x === 'function' || (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' && x !== null;
    }

    function isFunction(x) {
      return typeof x === 'function';
    }

    var _isArray = undefined;
    if (!Array.isArray) {
      _isArray = function _isArray(x) {
        return Object.prototype.toString.call(x) === '[object Array]';
      };
    } else {
      _isArray = Array.isArray;
    }

    var isArray = _isArray;

    var len = 0;
    var vertxNext = undefined;
    var customSchedulerFn = undefined;

    var asap = function asap(callback, arg) {
      queue[len] = callback;
      queue[len + 1] = arg;
      len += 2;
      if (len === 2) {
        // If len is 2, that means that we need to schedule an async flush.
        // If additional callbacks are queued before the queue is flushed, they
        // will be processed by this flush that we are scheduling.
        if (customSchedulerFn) {
          customSchedulerFn(flush);
        } else {
          scheduleFlush();
        }
      }
    };

    function setScheduler(scheduleFn) {
      customSchedulerFn = scheduleFn;
    }

    function setAsap(asapFn) {
      asap = asapFn;
    }

    var browserWindow = typeof window !== 'undefined' ? window : undefined;
    var browserGlobal = browserWindow || {};
    var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
    var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

    // test for web worker but not in IE10
    var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

    // node
    function useNextTick() {
      // node version 0.10.x displays a deprecation warning when nextTick is used recursively
      // see https://github.com/cujojs/when/issues/410 for details
      return function () {
        return process.nextTick(flush);
      };
    }

    // vertx
    function useVertxTimer() {
      if (typeof vertxNext !== 'undefined') {
        return function () {
          vertxNext(flush);
        };
      }

      return useSetTimeout();
    }

    function useMutationObserver() {
      var iterations = 0;
      var observer = new BrowserMutationObserver(flush);
      var node = document.createTextNode('');
      observer.observe(node, { characterData: true });

      return function () {
        node.data = iterations = ++iterations % 2;
      };
    }

    // web worker
    function useMessageChannel() {
      var channel = new MessageChannel();
      channel.port1.onmessage = flush;
      return function () {
        return channel.port2.postMessage(0);
      };
    }

    function useSetTimeout() {
      // Store setTimeout reference so es6-promise will be unaffected by
      // other code modifying setTimeout (like sinon.useFakeTimers())
      var globalSetTimeout = setTimeout;
      return function () {
        return globalSetTimeout(flush, 1);
      };
    }

    var queue = new Array(1000);
    function flush() {
      for (var i = 0; i < len; i += 2) {
        var callback = queue[i];
        var arg = queue[i + 1];

        callback(arg);

        queue[i] = undefined;
        queue[i + 1] = undefined;
      }

      len = 0;
    }

    function attemptVertx() {
      try {
        var r = commonjsRequire;
        var vertx = r('vertx');
        vertxNext = vertx.runOnLoop || vertx.runOnContext;
        return useVertxTimer();
      } catch (e) {
        return useSetTimeout();
      }
    }

    var scheduleFlush = undefined;
    // Decide what async method to use to triggering processing of queued callbacks:
    if (isNode) {
      scheduleFlush = useNextTick();
    } else if (BrowserMutationObserver) {
      scheduleFlush = useMutationObserver();
    } else if (isWorker) {
      scheduleFlush = useMessageChannel();
    } else if (browserWindow === undefined && typeof commonjsRequire === 'function') {
      scheduleFlush = attemptVertx();
    } else {
      scheduleFlush = useSetTimeout();
    }

    function then(onFulfillment, onRejection) {
      var _arguments = arguments;

      var parent = this;

      var child = new this.constructor(noop);

      if (child[PROMISE_ID] === undefined) {
        makePromise(child);
      }

      var _state = parent._state;

      if (_state) {
        (function () {
          var callback = _arguments[_state - 1];
          asap(function () {
            return invokeCallback(_state, child, callback, parent._result);
          });
        })();
      } else {
        subscribe(parent, child, onFulfillment, onRejection);
      }

      return child;
    }

    /**
      `Promise.resolve` returns a promise that will become resolved with the
      passed `value`. It is shorthand for the following:
    
      ```javascript
      let promise = new Promise(function(resolve, reject){
        resolve(1);
      });
    
      promise.then(function(value){
        // value === 1
      });
      ```
    
      Instead of writing the above, your code now simply becomes the following:
    
      ```javascript
      let promise = Promise.resolve(1);
    
      promise.then(function(value){
        // value === 1
      });
      ```
    
      @method resolve
      @static
      @param {Any} value value that the returned promise will be resolved with
      Useful for tooling.
      @return {Promise} a promise that will become fulfilled with the given
      `value`
    */
    function resolve(object) {
      /*jshint validthis:true */
      var Constructor = this;

      if (object && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object.constructor === Constructor) {
        return object;
      }

      var promise = new Constructor(noop);
      _resolve(promise, object);
      return promise;
    }

    var PROMISE_ID = Math.random().toString(36).substring(16);

    function noop() {}

    var PENDING = void 0;
    var FULFILLED = 1;
    var REJECTED = 2;

    var GET_THEN_ERROR = new ErrorObject();

    function selfFulfillment() {
      return new TypeError("You cannot resolve a promise with itself");
    }

    function cannotReturnOwn() {
      return new TypeError('A promises callback cannot return that same promise.');
    }

    function getThen(promise) {
      try {
        return promise.then;
      } catch (error) {
        GET_THEN_ERROR.error = error;
        return GET_THEN_ERROR;
      }
    }

    function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
      try {
        then.call(value, fulfillmentHandler, rejectionHandler);
      } catch (e) {
        return e;
      }
    }

    function handleForeignThenable(promise, thenable, then) {
      asap(function (promise) {
        var sealed = false;
        var error = tryThen(then, thenable, function (value) {
          if (sealed) {
            return;
          }
          sealed = true;
          if (thenable !== value) {
            _resolve(promise, value);
          } else {
            fulfill(promise, value);
          }
        }, function (reason) {
          if (sealed) {
            return;
          }
          sealed = true;

          _reject(promise, reason);
        }, 'Settle: ' + (promise._label || ' unknown promise'));

        if (!sealed && error) {
          sealed = true;
          _reject(promise, error);
        }
      }, promise);
    }

    function handleOwnThenable(promise, thenable) {
      if (thenable._state === FULFILLED) {
        fulfill(promise, thenable._result);
      } else if (thenable._state === REJECTED) {
        _reject(promise, thenable._result);
      } else {
        subscribe(thenable, undefined, function (value) {
          return _resolve(promise, value);
        }, function (reason) {
          return _reject(promise, reason);
        });
      }
    }

    function handleMaybeThenable(promise, maybeThenable, then$$) {
      if (maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve) {
        handleOwnThenable(promise, maybeThenable);
      } else {
        if (then$$ === GET_THEN_ERROR) {
          _reject(promise, GET_THEN_ERROR.error);
        } else if (then$$ === undefined) {
          fulfill(promise, maybeThenable);
        } else if (isFunction(then$$)) {
          handleForeignThenable(promise, maybeThenable, then$$);
        } else {
          fulfill(promise, maybeThenable);
        }
      }
    }

    function _resolve(promise, value) {
      if (promise === value) {
        _reject(promise, selfFulfillment());
      } else if (objectOrFunction(value)) {
        handleMaybeThenable(promise, value, getThen(value));
      } else {
        fulfill(promise, value);
      }
    }

    function publishRejection(promise) {
      if (promise._onerror) {
        promise._onerror(promise._result);
      }

      publish(promise);
    }

    function fulfill(promise, value) {
      if (promise._state !== PENDING) {
        return;
      }

      promise._result = value;
      promise._state = FULFILLED;

      if (promise._subscribers.length !== 0) {
        asap(publish, promise);
      }
    }

    function _reject(promise, reason) {
      if (promise._state !== PENDING) {
        return;
      }
      promise._state = REJECTED;
      promise._result = reason;

      asap(publishRejection, promise);
    }

    function subscribe(parent, child, onFulfillment, onRejection) {
      var _subscribers = parent._subscribers;
      var length = _subscribers.length;

      parent._onerror = null;

      _subscribers[length] = child;
      _subscribers[length + FULFILLED] = onFulfillment;
      _subscribers[length + REJECTED] = onRejection;

      if (length === 0 && parent._state) {
        asap(publish, parent);
      }
    }

    function publish(promise) {
      var subscribers = promise._subscribers;
      var settled = promise._state;

      if (subscribers.length === 0) {
        return;
      }

      var child = undefined,
          callback = undefined,
          detail = promise._result;

      for (var i = 0; i < subscribers.length; i += 3) {
        child = subscribers[i];
        callback = subscribers[i + settled];

        if (child) {
          invokeCallback(settled, child, callback, detail);
        } else {
          callback(detail);
        }
      }

      promise._subscribers.length = 0;
    }

    function ErrorObject() {
      this.error = null;
    }

    var TRY_CATCH_ERROR = new ErrorObject();

    function tryCatch(callback, detail) {
      try {
        return callback(detail);
      } catch (e) {
        TRY_CATCH_ERROR.error = e;
        return TRY_CATCH_ERROR;
      }
    }

    function invokeCallback(settled, promise, callback, detail) {
      var hasCallback = isFunction(callback),
          value = undefined,
          error = undefined,
          succeeded = undefined,
          failed = undefined;

      if (hasCallback) {
        value = tryCatch(callback, detail);

        if (value === TRY_CATCH_ERROR) {
          failed = true;
          error = value.error;
          value = null;
        } else {
          succeeded = true;
        }

        if (promise === value) {
          _reject(promise, cannotReturnOwn());
          return;
        }
      } else {
        value = detail;
        succeeded = true;
      }

      if (promise._state !== PENDING) {
        // noop
      } else if (hasCallback && succeeded) {
        _resolve(promise, value);
      } else if (failed) {
        _reject(promise, error);
      } else if (settled === FULFILLED) {
        fulfill(promise, value);
      } else if (settled === REJECTED) {
        _reject(promise, value);
      }
    }

    function initializePromise(promise, resolver) {
      try {
        resolver(function resolvePromise(value) {
          _resolve(promise, value);
        }, function rejectPromise(reason) {
          _reject(promise, reason);
        });
      } catch (e) {
        _reject(promise, e);
      }
    }

    var id = 0;
    function nextId() {
      return id++;
    }

    function makePromise(promise) {
      promise[PROMISE_ID] = id++;
      promise._state = undefined;
      promise._result = undefined;
      promise._subscribers = [];
    }

    function Enumerator(Constructor, input) {
      this._instanceConstructor = Constructor;
      this.promise = new Constructor(noop);

      if (!this.promise[PROMISE_ID]) {
        makePromise(this.promise);
      }

      if (isArray(input)) {
        this._input = input;
        this.length = input.length;
        this._remaining = input.length;

        this._result = new Array(this.length);

        if (this.length === 0) {
          fulfill(this.promise, this._result);
        } else {
          this.length = this.length || 0;
          this._enumerate();
          if (this._remaining === 0) {
            fulfill(this.promise, this._result);
          }
        }
      } else {
        _reject(this.promise, validationError());
      }
    }

    function validationError() {
      return new Error('Array Methods must be provided an Array');
    }

    Enumerator.prototype._enumerate = function () {
      var length = this.length;
      var _input = this._input;

      for (var i = 0; this._state === PENDING && i < length; i++) {
        this._eachEntry(_input[i], i);
      }
    };

    Enumerator.prototype._eachEntry = function (entry, i) {
      var c = this._instanceConstructor;
      var resolve$$ = c.resolve;

      if (resolve$$ === resolve) {
        var _then = getThen(entry);

        if (_then === then && entry._state !== PENDING) {
          this._settledAt(entry._state, i, entry._result);
        } else if (typeof _then !== 'function') {
          this._remaining--;
          this._result[i] = entry;
        } else if (c === Promise) {
          var promise = new c(noop);
          handleMaybeThenable(promise, entry, _then);
          this._willSettleAt(promise, i);
        } else {
          this._willSettleAt(new c(function (resolve$$) {
            return resolve$$(entry);
          }), i);
        }
      } else {
        this._willSettleAt(resolve$$(entry), i);
      }
    };

    Enumerator.prototype._settledAt = function (state, i, value) {
      var promise = this.promise;

      if (promise._state === PENDING) {
        this._remaining--;

        if (state === REJECTED) {
          _reject(promise, value);
        } else {
          this._result[i] = value;
        }
      }

      if (this._remaining === 0) {
        fulfill(promise, this._result);
      }
    };

    Enumerator.prototype._willSettleAt = function (promise, i) {
      var enumerator = this;

      subscribe(promise, undefined, function (value) {
        return enumerator._settledAt(FULFILLED, i, value);
      }, function (reason) {
        return enumerator._settledAt(REJECTED, i, reason);
      });
    };

    /**
      `Promise.all` accepts an array of promises, and returns a new promise which
      is fulfilled with an array of fulfillment values for the passed promises, or
      rejected with the reason of the first passed promise to be rejected. It casts all
      elements of the passed iterable to promises as it runs this algorithm.
    
      Example:
    
      ```javascript
      let promise1 = resolve(1);
      let promise2 = resolve(2);
      let promise3 = resolve(3);
      let promises = [ promise1, promise2, promise3 ];
    
      Promise.all(promises).then(function(array){
        // The array here would be [ 1, 2, 3 ];
      });
      ```
    
      If any of the `promises` given to `all` are rejected, the first promise
      that is rejected will be given as an argument to the returned promises's
      rejection handler. For example:
    
      Example:
    
      ```javascript
      let promise1 = resolve(1);
      let promise2 = reject(new Error("2"));
      let promise3 = reject(new Error("3"));
      let promises = [ promise1, promise2, promise3 ];
    
      Promise.all(promises).then(function(array){
        // Code here never runs because there are rejected promises!
      }, function(error) {
        // error.message === "2"
      });
      ```
    
      @method all
      @static
      @param {Array} entries array of promises
      @param {String} label optional string for labeling the promise.
      Useful for tooling.
      @return {Promise} promise that is fulfilled when all `promises` have been
      fulfilled, or rejected if any of them become rejected.
      @static
    */
    function all(entries) {
      return new Enumerator(this, entries).promise;
    }

    /**
      `Promise.race` returns a new promise which is settled in the same way as the
      first passed promise to settle.
    
      Example:
    
      ```javascript
      let promise1 = new Promise(function(resolve, reject){
        setTimeout(function(){
          resolve('promise 1');
        }, 200);
      });
    
      let promise2 = new Promise(function(resolve, reject){
        setTimeout(function(){
          resolve('promise 2');
        }, 100);
      });
    
      Promise.race([promise1, promise2]).then(function(result){
        // result === 'promise 2' because it was resolved before promise1
        // was resolved.
      });
      ```
    
      `Promise.race` is deterministic in that only the state of the first
      settled promise matters. For example, even if other promises given to the
      `promises` array argument are resolved, but the first settled promise has
      become rejected before the other promises became fulfilled, the returned
      promise will become rejected:
    
      ```javascript
      let promise1 = new Promise(function(resolve, reject){
        setTimeout(function(){
          resolve('promise 1');
        }, 200);
      });
    
      let promise2 = new Promise(function(resolve, reject){
        setTimeout(function(){
          reject(new Error('promise 2'));
        }, 100);
      });
    
      Promise.race([promise1, promise2]).then(function(result){
        // Code here never runs
      }, function(reason){
        // reason.message === 'promise 2' because promise 2 became rejected before
        // promise 1 became fulfilled
      });
      ```
    
      An example real-world use case is implementing timeouts:
    
      ```javascript
      Promise.race([ajax('foo.json'), timeout(5000)])
      ```
    
      @method race
      @static
      @param {Array} promises array of promises to observe
      Useful for tooling.
      @return {Promise} a promise which settles in the same way as the first passed
      promise to settle.
    */
    function race(entries) {
      /*jshint validthis:true */
      var Constructor = this;

      if (!isArray(entries)) {
        return new Constructor(function (_, reject) {
          return reject(new TypeError('You must pass an array to race.'));
        });
      } else {
        return new Constructor(function (resolve, reject) {
          var length = entries.length;
          for (var i = 0; i < length; i++) {
            Constructor.resolve(entries[i]).then(resolve, reject);
          }
        });
      }
    }

    /**
      `Promise.reject` returns a promise rejected with the passed `reason`.
      It is shorthand for the following:
    
      ```javascript
      let promise = new Promise(function(resolve, reject){
        reject(new Error('WHOOPS'));
      });
    
      promise.then(function(value){
        // Code here doesn't run because the promise is rejected!
      }, function(reason){
        // reason.message === 'WHOOPS'
      });
      ```
    
      Instead of writing the above, your code now simply becomes the following:
    
      ```javascript
      let promise = Promise.reject(new Error('WHOOPS'));
    
      promise.then(function(value){
        // Code here doesn't run because the promise is rejected!
      }, function(reason){
        // reason.message === 'WHOOPS'
      });
      ```
    
      @method reject
      @static
      @param {Any} reason value that the returned promise will be rejected with.
      Useful for tooling.
      @return {Promise} a promise rejected with the given `reason`.
    */
    function reject(reason) {
      /*jshint validthis:true */
      var Constructor = this;
      var promise = new Constructor(noop);
      _reject(promise, reason);
      return promise;
    }

    function needsResolver() {
      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
    }

    function needsNew() {
      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
    }

    /**
      Promise objects represent the eventual result of an asynchronous operation. The
      primary way of interacting with a promise is through its `then` method, which
      registers callbacks to receive either a promise's eventual value or the reason
      why the promise cannot be fulfilled.
    
      Terminology
      -----------
    
      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
      - `thenable` is an object or function that defines a `then` method.
      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
      - `exception` is a value that is thrown using the throw statement.
      - `reason` is a value that indicates why a promise was rejected.
      - `settled` the final resting state of a promise, fulfilled or rejected.
    
      A promise can be in one of three states: pending, fulfilled, or rejected.
    
      Promises that are fulfilled have a fulfillment value and are in the fulfilled
      state.  Promises that are rejected have a rejection reason and are in the
      rejected state.  A fulfillment value is never a thenable.
    
      Promises can also be said to *resolve* a value.  If this value is also a
      promise, then the original promise's settled state will match the value's
      settled state.  So a promise that *resolves* a promise that rejects will
      itself reject, and a promise that *resolves* a promise that fulfills will
      itself fulfill.
    
    
      Basic Usage:
      ------------
    
      ```js
      let promise = new Promise(function(resolve, reject) {
        // on success
        resolve(value);
    
        // on failure
        reject(reason);
      });
    
      promise.then(function(value) {
        // on fulfillment
      }, function(reason) {
        // on rejection
      });
      ```
    
      Advanced Usage:
      ---------------
    
      Promises shine when abstracting away asynchronous interactions such as
      `XMLHttpRequest`s.
    
      ```js
      function getJSON(url) {
        return new Promise(function(resolve, reject){
          let xhr = new XMLHttpRequest();
    
          xhr.open('GET', url);
          xhr.onreadystatechange = handler;
          xhr.responseType = 'json';
          xhr.setRequestHeader('Accept', 'application/json');
          xhr.send();
    
          function handler() {
            if (this.readyState === this.DONE) {
              if (this.status === 200) {
                resolve(this.response);
              } else {
                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
              }
            }
          };
        });
      }
    
      getJSON('/posts.json').then(function(json) {
        // on fulfillment
      }, function(reason) {
        // on rejection
      });
      ```
    
      Unlike callbacks, promises are great composable primitives.
    
      ```js
      Promise.all([
        getJSON('/posts'),
        getJSON('/comments')
      ]).then(function(values){
        values[0] // => postsJSON
        values[1] // => commentsJSON
    
        return values;
      });
      ```
    
      @class Promise
      @param {function} resolver
      Useful for tooling.
      @constructor
    */
    function Promise(resolver) {
      this[PROMISE_ID] = nextId();
      this._result = this._state = undefined;
      this._subscribers = [];

      if (noop !== resolver) {
        typeof resolver !== 'function' && needsResolver();
        this instanceof Promise ? initializePromise(this, resolver) : needsNew();
      }
    }

    Promise.all = all;
    Promise.race = race;
    Promise.resolve = resolve;
    Promise.reject = reject;
    Promise._setScheduler = setScheduler;
    Promise._setAsap = setAsap;
    Promise._asap = asap;

    Promise.prototype = {
      constructor: Promise,

      /**
        The primary way of interacting with a promise is through its `then` method,
        which registers callbacks to receive either a promise's eventual value or the
        reason why the promise cannot be fulfilled.
      
        ```js
        findUser().then(function(user){
          // user is available
        }, function(reason){
          // user is unavailable, and you are given the reason why
        });
        ```
      
        Chaining
        --------
      
        The return value of `then` is itself a promise.  This second, 'downstream'
        promise is resolved with the return value of the first promise's fulfillment
        or rejection handler, or rejected if the handler throws an exception.
      
        ```js
        findUser().then(function (user) {
          return user.name;
        }, function (reason) {
          return 'default name';
        }).then(function (userName) {
          // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
          // will be `'default name'`
        });
      
        findUser().then(function (user) {
          throw new Error('Found user, but still unhappy');
        }, function (reason) {
          throw new Error('`findUser` rejected and we're unhappy');
        }).then(function (value) {
          // never reached
        }, function (reason) {
          // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
          // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
        });
        ```
        If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
      
        ```js
        findUser().then(function (user) {
          throw new PedagogicalException('Upstream error');
        }).then(function (value) {
          // never reached
        }).then(function (value) {
          // never reached
        }, function (reason) {
          // The `PedgagocialException` is propagated all the way down to here
        });
        ```
      
        Assimilation
        ------------
      
        Sometimes the value you want to propagate to a downstream promise can only be
        retrieved asynchronously. This can be achieved by returning a promise in the
        fulfillment or rejection handler. The downstream promise will then be pending
        until the returned promise is settled. This is called *assimilation*.
      
        ```js
        findUser().then(function (user) {
          return findCommentsByAuthor(user);
        }).then(function (comments) {
          // The user's comments are now available
        });
        ```
      
        If the assimliated promise rejects, then the downstream promise will also reject.
      
        ```js
        findUser().then(function (user) {
          return findCommentsByAuthor(user);
        }).then(function (comments) {
          // If `findCommentsByAuthor` fulfills, we'll have the value here
        }, function (reason) {
          // If `findCommentsByAuthor` rejects, we'll have the reason here
        });
        ```
      
        Simple Example
        --------------
      
        Synchronous Example
      
        ```javascript
        let result;
      
        try {
          result = findResult();
          // success
        } catch(reason) {
          // failure
        }
        ```
      
        Errback Example
      
        ```js
        findResult(function(result, err){
          if (err) {
            // failure
          } else {
            // success
          }
        });
        ```
      
        Promise Example;
      
        ```javascript
        findResult().then(function(result){
          // success
        }, function(reason){
          // failure
        });
        ```
      
        Advanced Example
        --------------
      
        Synchronous Example
      
        ```javascript
        let author, books;
      
        try {
          author = findAuthor();
          books  = findBooksByAuthor(author);
          // success
        } catch(reason) {
          // failure
        }
        ```
      
        Errback Example
      
        ```js
      
        function foundBooks(books) {
      
        }
      
        function failure(reason) {
      
        }
      
        findAuthor(function(author, err){
          if (err) {
            failure(err);
            // failure
          } else {
            try {
              findBoooksByAuthor(author, function(books, err) {
                if (err) {
                  failure(err);
                } else {
                  try {
                    foundBooks(books);
                  } catch(reason) {
                    failure(reason);
                  }
                }
              });
            } catch(error) {
              failure(err);
            }
            // success
          }
        });
        ```
      
        Promise Example;
      
        ```javascript
        findAuthor().
          then(findBooksByAuthor).
          then(function(books){
            // found books
        }).catch(function(reason){
          // something went wrong
        });
        ```
      
        @method then
        @param {Function} onFulfilled
        @param {Function} onRejected
        Useful for tooling.
        @return {Promise}
      */
      then: then,

      /**
        `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
        as the catch block of a try/catch statement.
      
        ```js
        function findAuthor(){
          throw new Error('couldn't find that author');
        }
      
        // synchronous
        try {
          findAuthor();
        } catch(reason) {
          // something went wrong
        }
      
        // async with promises
        findAuthor().catch(function(reason){
          // something went wrong
        });
        ```
      
        @method catch
        @param {Function} onRejection
        Useful for tooling.
        @return {Promise}
      */
      'catch': function _catch(onRejection) {
        return this.then(null, onRejection);
      }
    };

    function polyfill() {
      var local = undefined;

      if (typeof commonjsGlobal !== 'undefined') {
        local = commonjsGlobal;
      } else if (typeof self !== 'undefined') {
        local = self;
      } else {
        try {
          local = Function('return this')();
        } catch (e) {
          throw new Error('polyfill failed because global object is unavailable in this environment');
        }
      }

      var P = local.Promise;

      if (P) {
        var promiseToString = null;
        try {
          promiseToString = Object.prototype.toString.call(P.resolve());
        } catch (e) {
          // silently ignored
        }

        if (promiseToString === '[object Promise]' && !P.cast) {
          return;
        }
      }

      local.Promise = Promise;
    }

    // Strange compat..
    Promise.polyfill = polyfill;
    Promise.Promise = Promise;

    return Promise;
  });
  
});

/**
 * Class representing an Image element
 */

var Image = function (_Element) {
    inherits(Image, _Element);

    /**
     * Create an element
     *
     */
    function Image() {
        classCallCheck(this, Image);

        var _this = possibleConstructorReturn(this, (Image.__proto__ || Object.getPrototypeOf(Image)).call(this, "img"));

        _this._scale = _this._originScale = 1;
        _this._zoom = 0;
        return _this;
    }

    /**
     * Load an image by URL and set 'src' attribute.
     *
     * @param {String} url - The url or path to image
     * @return {Promise} A promise that returns {@link load~resolve} if resolved and {@link load~reject} if rejected.
     */


    createClass(Image, [{
        key: "load",
        value: function load(url) {
            var _this2 = this;

            return new es6Promise(function (resolve, reject) {
                _this2.getNode().onload = function () {
                    _this2._checkFormat();
                    resolve(_this2);
                };
                _this2.getNode().onerror = function () {
                    reject(Error("Can't load an image."));
                };
                _this2.getNode().src = url;
                _this2.getNode().crossOrigin = "Anonymous";
            });
        }

        /**
         * Method, which check image format is portrait.
         *
         * @return {Boolean} Returns true if portrait.
         */

    }, {
        key: "isPortrait",
        value: function isPortrait() {
            return this._checkFormat() === "portrait";
        }

        /**
         * Method, which check image format is landscape.
         *
         * @return {Boolean} Returns true if landscape.
         */

    }, {
        key: "isLandscape",
        value: function isLandscape() {
            return this._checkFormat() === "landscape";
        }

        /**
         * Method, which check image format is square.
         *
         * @return {Boolean} Returns true if square.
         */

    }, {
        key: "isSquare",
        value: function isSquare() {
            return this._checkFormat() === "square";
        }

        /**
         * Scale image to fit Frame.
         *
         * @param {Frame} frame - A Frame object.
         * @return {Number} - Scale value.
         */

    }, {
        key: "scaleToFit",
        value: function scaleToFit(frame) {
            var widthScale = frame.getRect().size.width / this.getNode().width;
            var heightScale = frame.getRect().size.height / this.getNode().height;
            var largestScale = widthScale > heightScale ? widthScale : heightScale;
            this._scale = this._originScale = largestScale;
            return this._scale;
        }

        /**
         * Get actual size of image
         *
         * @return {Size} - Returns Size object, which contain weight and height
         */

    }, {
        key: "getSize",
        value: function getSize() {
            var w = this.getNode().width * this._scale;
            var h = this.getNode().height * this._scale;
            return new Size(w, h);
        }

        /**
         * Zoom an image
         *
         * @param {Number} zoom - Zoom value, from 0 to 1.0
         * @return {Image} - An Image object.
         */

    }, {
        key: "setZoom",
        value: function setZoom(zoom) {
            this._zoom = zoom;
            this._scale = this._originScale + this._originScale * zoom;
            return this;
        }

        /**
         * Get actual zoom value
         *
         * @return {Number} - Zoom value.
         */

    }, {
        key: "getZoom",
        value: function getZoom() {
            return this._zoom;
        }

        /**
         * Get actual scale value
         *
         * @returns {Number} - An actual scale value.
         */

    }, {
        key: "getScale",
        value: function getScale() {
            return this._scale;
        }

        /**
         * Get origin scale value (without zoom)
         *
         * @returns {Number} - An origin scale value.
         */

    }, {
        key: "getOriginScale",
        value: function getOriginScale() {
            return this._originScale;
        }

        /**
         * Method, which check an image format (landscape or portrait) and save it.
         *
         * @return {String} Format.
         */

    }, {
        key: "_checkFormat",
        value: function _checkFormat() {
            if (this.getNode().width > this.getNode().height) {
                return "landscape";
            }
            if (this.getNode().width < this.getNode().height) {
                return "portrait";
            }
            return "square";
        }
    }]);
    return Image;
}(Element);

/**
 * Class representing a drawing context on the canvas
 */
var Context = function () {
    /**
     * Create a context
     */
    function Context(context) {
        classCallCheck(this, Context);

        this._context = context;
    }

    /**
     * Draws a filled rectangle at (x, y) position whose size is determined by width and height and whose style
     * is determined by the fillStyle attribute.
     *
     * @param {Number} x - The x axis of the coordinate for the rectangle starting point.
     * @param {Number} y - The y axis of the coordinate for the rectangle starting point.
     * @param {Number} width - The rectangle's width.
     * @param {Number} height - The rectangle's height.
     */


    createClass(Context, [{
        key: "fillRect",
        value: function fillRect(x, y, width, height) {
            return this._context.fillRect(x, y, width, height);
        }

        /**
         * Sets a property of the Canvas 2D API, which specifies the color or style to use inside shapes.
         *
         * @param {String|Object} style - A CSS <color> value, Canvas gradient or Canvas pattern
         */

    }, {
        key: "fillStyle",
        value: function fillStyle(style) {
            return this._context.fillStyle = style;
        }

        /**
         * Creates a pattern using the specified image (a CanvasImageSource).
         * It repeats the source in the directions specified by the repetition argument.
         *
         * @param {CanvasImageSource} image - A CanvasImageSource to be used as image to repeat.
         * @param {String} repetition - A DOMString indicating how to repeat the image.
         */

    }, {
        key: "createPattern",
        value: function createPattern(image, repetition) {
            return this._context.createPattern(image, repetition);
        }

        /**
         * Creates a path for a rectangle at position (x, y) with a size that is determined by width and height.
         * Those four points are connected by straight lines and the sub-path is marked as closed,
         * so that you can fill or stroke this rectangle.
         *
         * @param {Number} x - The x axis of the coordinate for the rectangle starting point.
         * @param {Number} y - The y axis of the coordinate for the rectangle starting point.
         * @param {Number} width - The rectangle's width.
         * @param {Number} height - The rectangle's height.
         */

    }, {
        key: "rect",
        value: function rect(x, y, width, height) {
            return this._context.rect(x, y, width, height);
        }

        /**
         * Fills the current or given path with the current fill style using the non-zero or even-odd winding rule.
         */

    }, {
        key: "fill",
        value: function fill() {
            return this._context.fill();
        }

        /**
         * Starts a new path by emptying the list of sub-paths. Call this method when you want to create a new path.
         */

    }, {
        key: "beginPath",
        value: function beginPath() {
            return this._context.beginPath();
        }

        /**
         * Moves the starting point of a new sub-path to the (x, y) coordinates.
         *
         * @param {Number} x -The x axis of the point.
         * @param {Number} y -The y axis of the point.
         */

    }, {
        key: "moveTo",
        value: function moveTo(x, y) {
            return this._context.moveTo(x, y);
        }

        /**
         * Connects the last point in the sub-path to the x, y coordinates with a straight line
         * (but does not actually draw it).
         *
         * @param {Number} x - The x axis of the coordinate for the end of the line.
         * @param {Number} y - The y axis of the coordinate for the end of the line.
         */

    }, {
        key: "lineTo",
        value: function lineTo(x, y) {
            return this._context.lineTo(x, y);
        }

        /**
         * Causes the point of the pen to move back to the start of the current sub-path.
         * It tries to add a straight line (but does not actually draw it) from the current point to the start.
         * If the shape has already been closed or has only one point, this function does nothing.
         */

    }, {
        key: "closePath",
        value: function closePath() {
            return this._context.closePath();
        }

        /**
         * Sets all pixels in the rectangle defined by starting point (x, y) and size (width, height) to transparent black,
         * erasing any previously drawn content.
         *
         * @param {Number} x - The x axis of the coordinate for the rectangle starting point.
         * @param {Number} y - The y axis of the coordinate for the rectangle starting point.
         * @param {Number} width - The rectangle's width.
         * @param {Number} height - The rectangle's height.
         */

    }, {
        key: "clearRect",
        value: function clearRect(x, y, width, height) {
            return this._context.clearRect(x, y, width, height);
        }

        /**
         * Provides different ways to draw an image onto the canvas.
         *
         * @param {Number} image - An element to draw into the context.
         * @param {Number} sx - The X coordinate of the top left corner of the sub-rectangle of the source image to draw
         * into the destination context.
         * @param {Number} sy - The Y coordinate of the top left corner of the sub-rectangle of the source image to draw
         * into the destination context.
         * @param {Number} sWidth - The width of the sub-rectangle of the source image to draw into the destination context.
         * @param {Number} sHeight - The height of the sub-rectangle of the source image to draw into the destination context.
         * @param {Number} dx - The X coordinate in the destination canvas at which to place the top-left corner
         * of the source image.
         * @param {Number} dy - The Y coordinate in the destination canvas at which to place the top-left corner
         * of the source image.
         * @param {Number} dWidth - The width to draw the image in the destination canvas.
         * @param {Number} dHeight - The height to draw the image in the destination canvas.
         */

    }, {
        key: "drawImage",
        value: function drawImage() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return this._context.drawImage.apply(this._context, args);
        }
    }]);
    return Context;
}();

/**
 * Class representing a Pattern element
 */

var Pattern = function (_Element) {
    inherits(Pattern, _Element);

    /**
     * Create a pattern, set size
     */
    function Pattern() {
        classCallCheck(this, Pattern);

        var _this = possibleConstructorReturn(this, (Pattern.__proto__ || Object.getPrototypeOf(Pattern)).call(this, "canvas"));

        _this._context = new Context(_this._node.getContext("2d"));

        _this.setWidth(styles.pattern.size);
        _this.setHeight(styles.pattern.size);

        _this._draw();
        return _this;
    }

    /**
     * Draw pattern on canvas
     *
     * @return {Pattern} A Pattern object.
     */


    createClass(Pattern, [{
        key: "_draw",
        value: function _draw() {
            this._context.fillStyle(styles.pattern.fill1);
            this._context.fillRect(0, 0, 8, 8);
            this._context.fillStyle(styles.pattern.fill2);
            this._context.fillRect(8, 0, 8, 8);
            this._context.fillRect(0, 8, 8, 8);
            this._context.fillStyle(styles.pattern.fill1);
            this._context.fillRect(8, 8, 8, 8);
            return this;
        }
    }]);
    return Pattern;
}(Element);

/**
 * Class representing a Point
 */
var Point =
/**
 * Create a point
 */
function Point() {
  var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  classCallCheck(this, Point);

  this.x = x;
  this.y = y;
};

var frameProportion = 0.85;

/**
 * Class representing a Frame element
 */

var Frame = function () {
    /**
     * Create a frame
     */
    function Frame() {
        classCallCheck(this, Frame);

        this._size = 0;
        this._origin = {
            x: 0,
            y: 0
        };
    }

    /**
     * Update size and coordinates of rectangle (frame)
     *
     * @param {Object} parent - A parent node.
     * @return {Pattern} A Pattern object.
     */


    createClass(Frame, [{
        key: "update",
        value: function update(parent) {
            this._size = parent.width > parent.height ? parent.height * frameProportion : parent.width * frameProportion;
            this._origin = {
                x: (parent.width - this._size) / 2,
                y: (parent.height - this._size) / 2
            };
            return this;
        }

        /**
         * Get rectangle properties.
         *
         * @return {Object} - Object.point is an origin Point,
         * which in the upper-left corner and the rectangle extends towards the lower-right corner.
         * Object.size is a size that specifies the height and width of the rectangle.
         */

    }, {
        key: "getRect",
        value: function getRect() {
            return {
                origin: new Point(this._origin.x, this._origin.y),
                size: new Size(this._size, this._size)
            };
        }

        /**
         * Get the smallest value of the x-coordinate for the rectangle.
         *
         * @return {Number} - The smallest value of the x-coordinate for the rectangle.
         */

    }, {
        key: "getMinX",
        value: function getMinX() {
            return this._origin.x;
        }

        /**
         * Get the largest value of the x-coordinate for the rectangle.
         *
         * @return {Number} - The largest value of the x-coordinate for the rectangle.
         */

    }, {
        key: "getMaxX",
        value: function getMaxX() {
            return this._origin.x + this._size;
        }

        /**
         * Get the x- coordinate that establishes the center of a rectangle.
         *
         * @returns {Number} - The x-coordinate that establishes the center of a rectangle.
         */

    }, {
        key: "getMidX",
        value: function getMidX() {
            return this._origin.x + this._size / 2;
        }

        /**
         * Get the smallest value of the x-coordinate for the rectangle.
         *
         * @return {Number} - The smallest value of the x-coordinate for the rectangle.
         */

    }, {
        key: "getMinY",
        value: function getMinY() {
            return this._origin.y;
        }

        /**
         * Get the largest value of the x-coordinate for the rectangle.
         *
         * @return {Number} - The largest value of the x-coordinate for the rectangle.
         */

    }, {
        key: "getMaxY",
        value: function getMaxY() {
            return this._origin.y + this._size;
        }

        /**
         * Get the y-coordinate that establishes the center of the rectangle.
         *
         * @returns {Number} - The y-coordinate that establishes the center of a rectangle.
         */

    }, {
        key: "getMidY",
        value: function getMidY() {
            return this._origin.y + this._size / 2;
        }
    }]);
    return Frame;
}();

/**
 * Class representing a cutout over canvas
 */

var Cutout = function () {
    /**
     * Create a canvas element.
     *
     * @param {Frame} frame - A Frame object
     * @param {Object} canvas - A Canvas element
     */
    function Cutout(frame, canvas) {
        classCallCheck(this, Cutout);

        this._frame = frame;
        this._canvas = canvas;
        this._context = new Context(this._canvas.getNode().getContext("2d"));
    }

    /**
     * Draw the cutout over canvas, clockwise rectangle and anti-clock wise rectangle
     *
     * @return {Cutout} A Cutout object.
     */


    createClass(Cutout, [{
        key: "draw",
        value: function draw() {
            this._context.fillStyle(styles.cutout.fill);
            this._context.beginPath();
            this._context.rect(0, 0, this._canvas.getNode().width, this._canvas.getNode().height);
            this._context.moveTo(this._frame.getMinX(), this._frame.getMinY());
            this._context.lineTo(this._frame.getMinX(), this._frame.getMaxY());
            this._context.lineTo(this._frame.getMaxX(), this._frame.getMaxY());
            this._context.lineTo(this._frame.getMaxX(), this._frame.getMinY());
            this._context.closePath();
            this._context.fill();
            return this;
        }
    }]);
    return Cutout;
}();

/**
 * Class representing a Generator
 */

var Generator = function (_Element) {
    inherits(Generator, _Element);

    /**
     * Create a generator.
     */
    function Generator(frame, canvas) {
        classCallCheck(this, Generator);

        var _this = possibleConstructorReturn(this, (Generator.__proto__ || Object.getPrototypeOf(Generator)).call(this, "canvas"));

        _this._frame = frame;
        _this._canvas = canvas;
        _this._context = new Context(_this._node.getContext("2d"));
        return _this;
    }

    /**
     * Generates and returns a data URI containing a representation of the image in the format specified by the type parameter (defaults to PNG).
     * The returned image is in a resolution of 96 dpi.
     *
     * @return {String} - A data URI.
     */


    createClass(Generator, [{
        key: "toDataURL",
        value: function toDataURL() {
            this.setWidth(this._frame.getRect().size.width);
            this.setHeight(this._frame.getRect().size.height);
            this._context.drawImage(this._canvas.getNode(), this._frame.getMinX(), this._frame.getMinY(), this._frame.getRect().size.width, this._frame.getRect().size.height, 0, 0, this._frame.getRect().size.width, this._frame.getRect().size.height);
            return this.getNode().toDataURL();
        }
    }]);
    return Generator;
}(Element);

/**
 * Class representing a MoveEventListener
 */

var MoveEventListener = function () {
    /**
     * Create a MoveEventListener.
     *
     * @param {Element} element - A main container.
     * @param {Element} parent - A parent element (window)
     */
    function MoveEventListener(element) {
        var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Element(document.body);
        classCallCheck(this, MoveEventListener);

        this._element = element;
        this._parent = parent;

        this._onMoveCallback = function () {};
        this._onPressCallback = function () {};
        this._onReleaseCallback = function () {};

        this._onReleaseHandler = this.onReleaseHandler.bind(this);
        this._onPressHandler = this.onPressHandler.bind(this);
        this._onMoveHandler = this.onMoveHandler.bind(this);
    }

    /**
     * Callback function which fires after (touch/mouse) moving (dragging)
     *
     * @param {Function} callback - Callback.
     */


    createClass(MoveEventListener, [{
        key: "onMove",
        value: function onMove(callback) {
            this._onMoveCallback = callback;
        }

        /**
         * Callback function which fires after touch press / mouse click
         *
         * @param {Function} callback - Callback.
         */

    }, {
        key: "onPress",
        value: function onPress(callback) {
            this._onPressCallback = callback;
        }

        /**
         * Callback function which fires after mouse/finger releasing
         *
         * @param {Function} callback - Callback.
         */

    }, {
        key: "onRelease",
        value: function onRelease(callback) {
            this._onReleaseCallback = callback;
        }

        /**
         * Initialize event listeners
         */

    }, {
        key: "init",
        value: function init() {
            this._element.getNode().addEventListener("mousedown", this._onPressHandler, false);
            this._element.getNode().addEventListener("touchstart", this._onPressHandler, false);
            this._parent.getNode().addEventListener("mouseup", this._onReleaseHandler, false);
            this._parent.getNode().addEventListener("touchend", this._onReleaseHandler, false);
        }

        /**
         * Handler for (touch/mouse) move action.
         *
         * @param {Object} event - Event object.
         */

    }, {
        key: "onMoveHandler",
        value: function onMoveHandler(event) {
            this._onMoveCallback(this._getEventPoint(event));
        }

        /**
         * Handler for (touch/mouse) press action.
         *
         * @param {Object} event - Event object.
         */

    }, {
        key: "onPressHandler",
        value: function onPressHandler(event) {
            this._parent.getNode().addEventListener("mousemove", this._onMoveHandler, false);
            this._parent.getNode().addEventListener("touchmove", this._onMoveHandler, false);
            this._onPressCallback(this._getEventPoint(event));
        }

        /**
         * Handler for (touch/mouse) release action.
         */

    }, {
        key: "onReleaseHandler",
        value: function onReleaseHandler(event) {
            this._parent.getNode().removeEventListener("mousemove", this._onMoveHandler, false);
            this._parent.getNode().removeEventListener("touchmove", this._onMoveHandler, false);
            this._onReleaseCallback(this._getEventPoint(event));
        }

        /**
         * Translate viewport coordinates to coordinates relative to the element.
         *
         * @param {Point} point - Viewport coordinates
         * @return {Object} - Coordinates relative to the element.
         */

    }, {
        key: "_convertCoordinates",
        value: function _convertCoordinates(point) {
            var box = this._element.getNode().getBoundingClientRect();
            var x = point.x - box.left * (this._element.getNode().width / box.width);
            var y = point.y - box.top * (this._element.getNode().height / box.height);
            return new Point(x, y);
        }
    }, {
        key: "_getEventPoint",
        value: function _getEventPoint(event) {
            var x = event.clientX || event.touches[0].clientX;
            var y = event.clientY || event.touches[0].clientY;
            return this._convertCoordinates(new Point(x, y));
        }
    }]);
    return MoveEventListener;
}();

/**
 * Class representing a canvas element
 */

var Canvas = function (_Element) {
    inherits(Canvas, _Element);

    /**
     * Create a canvas element.
     */
    function Canvas() {
        classCallCheck(this, Canvas);

        var _this = possibleConstructorReturn(this, (Canvas.__proto__ || Object.getPrototypeOf(Canvas)).call(this, "canvas"));

        _this._context = new Context(_this._node.getContext("2d"));
        _this._image = new Image();
        _this._pattern = new Pattern();
        _this._frame = new Frame();
        _this._cutout = new Cutout(_this._frame, _this);
        _this._generator = new Generator(_this._frame, _this);
        _this._moveEventListener = new MoveEventListener(_this);

        _this._lastPoint = new Point(0, 0);
        _this._basePoint = new Point(0, 0);

        _this._onChangeCallback = function () {};
        return _this;
    }

    /**
     * Render a canvas
     *
     * @param {Object} parent - The DOM Element object, parent node
     * @return {Canvas} An Canvas object.
     */


    createClass(Canvas, [{
        key: "render",
        value: function render(parent) {
            var _this2 = this;

            get(Canvas.prototype.__proto__ || Object.getPrototypeOf(Canvas.prototype), "render", this).call(this, parent);
            this._drawBackground();
            this._moveEventListener.init();
            this._moveEventListener.onPress(function (point) {
                _this2._lastPoint = point;
            });
            this._moveEventListener.onMove(function (point) {
                _this2._drawImage(point);
            });
            return this;
        }

        /**
         * Change width of Canvas, recalculate frame dimensions
         *
         * @param {Number} width - The number of pixels.
         * @return {Canvas} A Canvas object.
         */

    }, {
        key: "setWidth",
        value: function setWidth(width) {
            get(Canvas.prototype.__proto__ || Object.getPrototypeOf(Canvas.prototype), "setWidth", this).call(this, width);
            this._frame.update(this.getNode());
            return this;
        }

        /**
         * Change height of Canvas
         *
         * @param {Number} height - The number of pixels.
         * @return {Canvas} A Canvas object.
         */

    }, {
        key: "setHeight",
        value: function setHeight(height) {
            get(Canvas.prototype.__proto__ || Object.getPrototypeOf(Canvas.prototype), "setHeight", this).call(this, height);
            this._frame.update(this.getNode());
            return this;
        }

        /**
         * Pass the Image object into Canvas, reset saved points,
         * calculate scale value (image should fit in the frame)
         *
         * @param {Image} image - An Image object
         * @return {Canvas} A Canvas object.
         */

    }, {
        key: "setImage",
        value: function setImage(image) {
            this._resetPoints();
            this._image = image;
            this._image.scaleToFit(this._frame);
            return this;
        }

        /**
         * Draw an Image at initial position
         *
         * @return {Canvas} A Canvas object.
         */

    }, {
        key: "draw",
        value: function draw() {
            this._drawImage(this._centerImagePoint());
            return this;
        }

        /**
         * Redraw an Image
         *
         * @return {Canvas} A Canvas object.
         */

    }, {
        key: "redraw",
        value: function redraw() {
            this._resetPoints();
            this._image.scaleToFit(this._frame);
            this.draw();
            return this;
        }

        /**
         * Clear canvas context
         *
         * @return {Canvas} A Canvas object.
         */

    }, {
        key: "clear",
        value: function clear() {
            this._context.clearRect(0, 0, this.getNode().width, this.getNode().height);
            return this;
        }

        /**
         * Generates and returns a data URI containing a representation
         * of the image in the format specified by the type parameter (defaults to PNG).
         * The returned image is in a resolution of 96 dpi.
         *
         * @return {String} - A data URI.
         */

    }, {
        key: "toDataURL",
        value: function toDataURL() {
            return this._generator.toDataURL();
        }

        /**
         * Sets zoom.
         *
         * @param {Number} zoom - Zoom value, from `0` = 0%, `1.0` = 100% of image size
         * @return {Canvas} - A Canvas object.
         */

    }, {
        key: "setZoom",
        value: function setZoom(zoom) {
            var lastImageSize = this._image.getSize();
            this._image.setZoom(zoom);
            var imageSize = this._image.getSize();
            var x = this._lastPoint.x - (imageSize.width - lastImageSize.width) / 2;
            var y = this._lastPoint.y - (imageSize.height - lastImageSize.height) / 2;
            this._drawImage(new Point(x, y));
            return this;
        }

        /**
         * Callback function which fires after canvas drawing
         *
         * @param {Function} callback - Callback.
         */

    }, {
        key: "onChange",
        value: function onChange(callback) {
            this._onChangeCallback = callback;
        }

        /**
         *  Get Frame origin and size relative to an Image.
         *
         * @returns {{origin: {x: Number, y: Number}, size: {width: Number, height: Number}}}
         */

    }, {
        key: "getData",
        value: function getData() {
            var originX = (this._frame.getMinX() - this._basePoint.x) / this._image.getScale();
            var originY = (this._frame.getMinY() - this._basePoint.y) / this._image.getScale();
            var frameWidth = this._frame.getRect().size.width / this._image.getScale();
            var frameHeight = this._frame.getRect().size.width / this._image.getScale();
            return {
                origin: {
                    x: originX,
                    y: originY
                },
                size: {
                    width: frameWidth,
                    height: frameHeight
                }
            };
        }

        /**
         * Set a Frame origin and size relative to an Image.
         *
         * @param {Object} data - A frame origin (top, left) point and frame size.
         * @returns {Object} - A frame origin point and zoom value.
         */

    }, {
        key: "setData",
        value: function setData(data) {
            var expectedScale = this._frame.getRect().size.width / data.size.width;
            var zoom = (expectedScale - this._image.getOriginScale()) / this._image.getOriginScale();
            this.setZoom(zoom);

            var x = this._frame.getMinX() - data.origin.x * this._image.getScale();
            var y = this._frame.getMinY() - data.origin.y * this._image.getScale();
            var point = new Point(x, y);
            this._resetPoints();
            this._drawImage(point);

            return {
                origin: point,
                zoom: zoom
            };
        }

        /**
         * Set points to zero
         *
         * @return {Canvas} A Canvas object.
         */

    }, {
        key: "_resetPoints",
        value: function _resetPoints() {
            this._lastPoint = new Point(0, 0);
            this._basePoint = new Point(0, 0);
            return this;
        }

        /**
         * Calculate and get origin Point for centered image (x-axis, y-axis)
         *
         * @return {Point} A Point.
         */

    }, {
        key: "_centerImagePoint",
        value: function _centerImagePoint() {
            var x = this._frame.getMidX() - this._image.getSize().width / 2;
            var y = this._frame.getMidY() - this._image.getSize().height / 2;
            return new Point(x, y);
        }

        /**
         * Calculate and get origin Point for centered image (x-axis, y-axis)
         *
         * @param {Point} point - Point to validate
         * @return {Point} A Point.
         */

    }, {
        key: "_validatePoint",
        value: function _validatePoint(point) {
            var validPoint = point;

            if (this._image.getSize().width < this._frame.getRect().size.width) {
                validPoint.x = this._centerImagePoint().x;
            } else if (point.x > this._frame.getMinX()) {
                validPoint.x = this._frame.getMinX();
            } else if (point.x + this._image.getSize().width < this._frame.getMaxX()) {
                validPoint.x = this._frame.getMaxX() - this._image.getSize().width;
            } else {
                validPoint.x = point.x;
            }

            if (this._image.getSize().height < this._frame.getRect().size.height) {
                validPoint.y = this._centerImagePoint().y;
            } else if (point.y > this._frame.getMinY()) {
                validPoint.y = this._frame.getMinY();
            } else if (point.y + this._image.getSize().height < this._frame.getMaxY()) {
                validPoint.y = this._frame.getMaxY() - this._image.getSize().height;
            } else {
                validPoint.y = point.y;
            }

            return validPoint;
        }

        /**
         * Draw an Image on canvas, clear canvas context before, draw a background pattern and frame
         *
         * @param {Point} point - An origin point
         * @return {Canvas} A Canvas object. 
         */

    }, {
        key: "_drawImage",
        value: function _drawImage() {
            var point = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Point(0, 0);

            this.clear();
            this._drawBackground();

            var baseX = this._basePoint.x + (point.x - this._lastPoint.x);
            var baseY = this._basePoint.y + (point.y - this._lastPoint.y);

            this._basePoint = this._validatePoint(new Point(baseX, baseY));
            this._lastPoint = point;

            this._context.drawImage(this._image.getNode(), this._basePoint.x, this._basePoint.y, this._image.getSize().width, this._image.getSize().height);
            this._cutout.draw();
            this._onChangeCallback(this);
            return this;
        }

        /**
         * Draw pattern canvas on the Main canvas as background
         *
         * @return {Canvas} A Canvas object.
         */

    }, {
        key: "_drawBackground",
        value: function _drawBackground() {
            var pattern = this._context.createPattern(this._pattern.getNode(), "repeat");
            this._context.rect(0, 0, this.getNode().width, this.getNode().height);
            this._context.fillStyle(pattern);
            this._context.fill();
            return this;
        }
    }]);
    return Canvas;
}(Element);

/**
 * Class representing a Slider
 */

var Slider = function (_Element) {
    inherits(Slider, _Element);

    /**
     * Create a slider.
     */
    function Slider() {
        classCallCheck(this, Slider);

        var _this = possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, "input"));

        _this.setType("range");
        _this.addClass("slider");
        _this.setAttribute("min", 0);
        _this.setAttribute("max", 100);
        _this.setAttribute("value", 0);

        _this._onChangeCallback = function () {};
        _this._onChangeHandler = _this._onChange.bind(_this);
        return _this;
    }

    /**
     * Callback function, which be fired after changing the value
     *
     * @param {Function} callback - Callback.
     * @returns {Slider} - A Slider object.
     */


    createClass(Slider, [{
        key: "onChange",
        value: function onChange(callback) {
            this._onChangeCallback = callback;
            this.getNode().addEventListener("change", this._onChangeHandler, false);
            this.getNode().addEventListener("input", this._onChangeHandler, false);
            return this;
        }

        /**
         * Sets a value
         *
         * @param {Number} value - A value from 0 to 100
         * @returns {Slider} - A Slider object.
         */

    }, {
        key: "setValue",
        value: function setValue(value) {
            this.getNode().value = value;
            return this;
        }

        /**
         * Fires custom callback.
         */

    }, {
        key: "_onChange",
        value: function _onChange() {
            this._onChangeCallback(Number(this.getNode().value));
        }
    }]);
    return Slider;
}(Element);

/**
 * Class representing an Icon element
 */

var Icon = function (_Element) {
  inherits(Icon, _Element);

  /**
   * Create an Icon element.
   *
   * @param {String} name - An Icon name.
   */
  function Icon(name) {
    classCallCheck(this, Icon);

    var _this = possibleConstructorReturn(this, (Icon.__proto__ || Object.getPrototypeOf(Icon)).call(this, "svg"));

    _this.setAttribute("class", "icon icon-" + name);
    _this._use = new Element("use");
    _this._use.getNode().setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#icon-" + name);
    _this._use.render(_this.getNode());
    return _this;
  }

  return Icon;
}(Element);

/**
 * Class representing Image Crop
 */

var ImageCrop = function () {
    /**
     * Create an ImageCrop.
     * 
     * @param {Object} config - The config for Image Crop
     */
    function ImageCrop() {
        var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        classCallCheck(this, ImageCrop);

        validateConfig(config);

        this._canvas = new Canvas();
        this._image = new Image();
        this._slider = new Slider();

        this.setWidth(config.width || defaultDimensions.width);
        this.setHeight(config.height || defaultDimensions.height);

        this._onInitCallback = validateCallback(config.onInit);
        this._onChangeCallback = validateCallback(config.onChange);
    }

    /**
     * Create Image Crop container at the end of the list of children of a specified parent node
     *
     * @param {Object} node - The DOM Element object, parent node
     * @return {ImageCrop} An ImageCrop object.
     */


    createClass(ImageCrop, [{
        key: "render",
        value: function render(node) {
            var _this = this;

            this._node = validateNode(node);

            var wrapper = new Element();
            wrapper.addClass("image-crop");
            wrapper.render(this._node);
            this._canvas.render(wrapper.getNode());

            var tools = new Element();
            tools.addClass("image-crop-tools");
            tools.render(wrapper.getNode());

            var zoomSlider = new Element();
            zoomSlider.addClass("image-crop-zoom");
            zoomSlider.render(tools.getNode());

            var leftIcon = new Icon("frame-landscape");
            var rightIcon = new Icon("frame-landscape");

            leftIcon.render(zoomSlider.getNode());

            this._slider.render(zoomSlider.getNode());
            this._slider.onChange(function (value) {
                _this._canvas.setZoom(value / 100);
            });

            rightIcon.render(zoomSlider.getNode());

            this._onInitCallback(this);

            this._canvas.onChange(function () {
                _this._onChangeCallback(_this);
            });

            return this;
        }

        /**
         * Change width of ImageCrop container
         *
         * @param {Number} width - The number of pixels.
         * @return {ImageCrop} An ImageCrop object.
         */

    }, {
        key: "setWidth",
        value: function setWidth(width) {
            try {
                validateDimension(width);
            } catch (error) {
                throw Error("Width property: " + error.message);
            }
            this._canvas.setWidth(width);
            this._canvas.redraw();
            return this;
        }

        /**
         * Change height of ImageCrop container
         *
         * @param {Number} height - The number of pixels.
         * @return {ImageCrop} An ImageCrop object.
         */

    }, {
        key: "setHeight",
        value: function setHeight(height) {
            try {
                validateDimension(height);
            } catch (error) {
                throw Error("Height property: " + error.message);
            }
            this._canvas.setHeight(height);
            this._canvas.redraw();
            return this;
        }

        /**
         * Load an image and draw canvas
         *
         * @param {String} url - Url or path to image
         * @return {Promise} A promise that returns {@link loadImage~resolve} if resolved and {@link loadImage~reject} if rejected.
         */

    }, {
        key: "loadImage",
        value: function loadImage(url) {
            var _this2 = this;

            if (!url) {
                throw Error("Image url or path is not passed.");
            }

            if (typeof url !== "string") {
                throw Error("Invalid url or path.");
            }

            return this._image.load(url).then(function (image) {
                _this2._canvas.setImage(image);
                _this2._canvas.draw();
                return _this2;
            });
        }

        /**
         * Generates and returns a data URI containing a representation of the image in the format specified by the type parameter (defaults to PNG).
         * The returned image is in a resolution of 96 dpi.
         *
         * @return {String} - A data URI.
         */

    }, {
        key: "getCroppedImage",
        value: function getCroppedImage() {
            return this._canvas.toDataURL();
        }

        /**
         * Sets zoom.
         *
         * @param {Number} zoom - Zoom value, from `0` = 0%, `1.0` = 100% of image size
         * @return {ImageCrop} An ImageCrop object.
         */

    }, {
        key: "setZoom",
        value: function setZoom(zoom) {
            try {
                validateDimension(zoom);
            } catch (error) {
                throw Error("Zoom property: " + error.message);
            }
            this._canvas.setZoom(zoom);
            this._slider.setValue(zoom * 100);
            return this;
        }
    }, {
        key: "reset",
        value: function reset() {
            this.setZoom(0);
            this._canvas.redraw();
            return this;
        }

        /**
         * Get Frame origin and size relative to an Image.
         *
         * @returns {{origin: {x: Number, y: Number}, size: {width: Number, height: Number}}}
         */

    }, {
        key: "getData",
        value: function getData() {
            return this._canvas.getData();
        }

        /**
         * Set a Frame origin and size relative to an Image.
         *
         * @param {Object} data - A frame origin (top, left) point and frame size.
         * @returns {ImageCrop} - An ImageCrop instance.
         */

    }, {
        key: "setData",
        value: function setData(data) {
            var _canvas$setData = this._canvas.setData(data),
                zoom = _canvas$setData.zoom;

            this._slider.setValue(zoom * 100);
            return this;
        }
    }]);
    return ImageCrop;
}();

return ImageCrop;

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZzJhLWltYWdlLWNyb3AuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy92YWxpZGF0b3JzL25vZGUuanMiLCIuLi9zcmMvdmFsaWRhdG9ycy9jb25maWcuanMiLCIuLi9zcmMvdmFsaWRhdG9ycy9kaW1lbnNpb24uanMiLCIuLi9zcmMvdmFsaWRhdG9ycy9jYWxsYmFjay5qcyIsIi4uL3NyYy9jb25maWcvZGVmYXVsdC5qcyIsIi4uL3NyYy9vYmplY3RzL3NpemUuanMiLCIuLi9zcmMvY29tcG9uZW50cy9lbGVtZW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2VzNi1wcm9taXNlL2Rpc3QvZXM2LXByb21pc2UuanMiLCIuLi9zcmMvY29tcG9uZW50cy9pbWFnZS5qcyIsIi4uL3NyYy9vYmplY3RzL2NvbnRleHQuanMiLCIuLi9zcmMvY29tcG9uZW50cy9wYXR0ZXJuLmpzIiwiLi4vc3JjL29iamVjdHMvcG9pbnQuanMiLCIuLi9zcmMvb2JqZWN0cy9mcmFtZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2N1dG91dC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2dlbmVyYXRvci5qcyIsIi4uL3NyYy9ldmVudHMvbW92ZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2NhbnZhcy5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3NsaWRlci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2ljb24uanMiLCIuLi9zcmMvbWFpbi9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogVmFsaWRhdGVzIE5vZGVcclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBub2RlIC0gcXVlcnkgc2VsZWN0b3Igb3Igbm9kZSBvYmplY3RcclxuICogQHJldHVybiB7T2JqZWN0fSBub2RlIC0gdmFsaWQgbm9kZSBvYmplY3RcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHZhbGlkYXRlTm9kZShub2RlKSB7XHJcbiAgICBpZiAoIW5vZGUpIHtcclxuICAgICAgICB0aHJvdyBFcnJvcihcIk5vZGUgaXMgbm90IHBhc3NlZCBvciBpbnZhbGlkIHNlbGVjdG9yLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgZWxlbWVudCA9IG5vZGU7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBlbGVtZW50ID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iobm9kZSk7XHJcbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKFwiSW52YWxpZCBzZWxlY3Rvci5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICghKGVsZW1lbnQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTEVsZW1lbnQpKSB7XHJcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJOb2RlIHNob3VsZCBiZSBpbnN0YW5jZSBvZiB3aW5kb3cuSFRNTEVsZW1lbnQgb3IgdmFsaWQgc2VsZWN0b3Igc3RyaW5nLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZWxlbWVudDtcclxufSIsIi8qKlxyXG4gKiBWYWxpZGF0ZXMgcHJvdmlkZWQgSW1hZ2UgQ3JvcCBjb25maWdcclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyAtIGNvbmZpZyBvYmplY3RcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHZhbGlkYXRlQ29uZmlnKGNvbmZpZykge1xyXG4gICAgaWYgKCFjb25maWcpIHtcclxuICAgICAgICB0aHJvdyBFcnJvcihcIkNvbmZpZyBpcyBub3QgcGFzc2VkIG9yIGludmFsaWQuXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoY29uZmlnKSAhPT0gXCJbb2JqZWN0IE9iamVjdF1cIikge1xyXG4gICAgICAgIHRocm93IEVycm9yKFwiSW52YWxpZCBjb25maWcuXCIpO1xyXG4gICAgfVxyXG59IiwiLyoqXHJcbiAqIFZhbGlkYXRlcyBwcm92aWRlZCBkaW1lbnNpb24gKHdpZHRoIG9yIGhlaWdodClcclxuICpcclxuICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlIC0gY29uZmlnIG9iamVjdFxyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IHZhbHVlIC0gdmFsaWQgZGltZW5zaW9uXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB2YWxpZGF0ZURpbWVuc2lvbih2YWx1ZSkge1xyXG4gICAgaWYgKCF2YWx1ZSAmJiB2YWx1ZSAhPT0gMCkge1xyXG4gICAgICAgIHRocm93IEVycm9yKFwiRGltZW5zaW9uIGlzIG5vdCBwYXNzZWQgb3IgaW52YWxpZC5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgIHRocm93IEVycm9yKFwiSW52YWxpZCBkaW1lbnNpb24uXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghaXNGaW5pdGUodmFsdWUpKSB7XHJcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJJbnZhbGlkIGRpbWVuc2lvbi5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHZhbHVlIDwgMCkge1xyXG4gICAgICAgIHRocm93IEVycm9yKFwiSW52YWxpZCBkaW1lbnNpb24uXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB2YWx1ZTtcclxufSIsIi8qKlxyXG4gKiBWYWxpZGF0ZXMgcHJvdmlkZWQgY2FsbGJhY2tcclxuICpcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBDYWxsYmFjayBmdW5jdGlvbi5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHZhbGlkYXRlQ2FsbGJhY2soY2FsbGJhY2spIHtcclxuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICByZXR1cm4gKCkgPT4ge307XHJcbiAgICB9XHJcbiAgICBpZiAoIWNhbGxiYWNrIHx8IHR5cGVvZiBjYWxsYmFjayAhPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJJbnZhbGlkIGNhbGxiYWNrLlwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjYWxsYmFjaztcclxufSIsIi8qKlxyXG4gKiBEZWZhdWx0IENhbnZhcyBkaW1lbnNpb25zXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZGVmYXVsdERpbWVuc2lvbnMgPSB7XHJcbiAgICB3aWR0aDogNTYwLFxyXG4gICAgaGVpZ2h0OiAzNDAsXHJcbn07XHJcblxyXG4vKipcclxuICogRGVmYXVsdCBzdHlsZXNcclxuICovXHJcbmV4cG9ydCBjb25zdCBzdHlsZXMgPSB7XHJcbiAgICBjdXRvdXQ6IHtcclxuICAgICAgICBmaWxsOiBcInJnYmEoMCwgMCwgMCwgMC4zKVwiLFxyXG4gICAgfSxcclxuICAgIHBhdHRlcm46IHtcclxuICAgICAgICBzaXplOiAgMTYsXHJcbiAgICAgICAgZmlsbDE6IFwicmdiKDIxNSwgMjE1LCAyMTUpXCIsXHJcbiAgICAgICAgZmlsbDI6IFwicmdiKDI1MCwgMjUwLCAyNTApXCIsXHJcbiAgICB9LFxyXG59OyIsIi8qKlxyXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBTaXplXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaXplIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgU2l6ZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih3aWR0aCA9IDAsIGhlaWdodCA9IDApIHtcclxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICB9XHJcbn07IiwiaW1wb3J0IFNpemUgZnJvbSBcIi4vLi4vb2JqZWN0cy9zaXplXCI7XHJcblxyXG4vKipcclxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGEgYmFzZSBlbGVtZW50XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbGVtZW50IHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGFuIGVsZW1lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IG5vZGUgLSBUaGUgZWxlbWVudC5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Iobm9kZSkge1xyXG4gICAgICAgIHRoaXMuX25vZGUgPSBub2RlO1xyXG4gICAgICAgIGlmICghbm9kZSB8fCB0eXBlb2Ygbm9kZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICBpZiAobm9kZSA9PT0gXCJzdmdcIiB8fCBub2RlID09PSBcInVzZVwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9ub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgbm9kZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobm9kZSB8fCBcImRpdlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgYW4gRWxlbWVudCdzIG5vZGUgdG8gdGhlIGVuZCBvZiB0aGUgbGlzdCBvZiBjaGlsZHJlbiBvZiBhIHNwZWNpZmllZCBwYXJlbnQgbm9kZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJlbnQgLSBUaGUgRE9NIEVsZW1lbnQgb2JqZWN0LCBwYXJlbnQgbm9kZVxyXG4gICAgICogQHJldHVybiB7RWxlbWVudH0gQW4gRWxlbWVudCBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIHJlbmRlcihwYXJlbnQpIHtcclxuICAgICAgICBpZiAoIXBhcmVudCkge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcIlBhcmVudCBub2RlIGFyZSBub3QgcGFzc2VkLlwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZCh0aGlzLl9ub2RlKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoYW5nZSB3aWR0aCBvZiBFbGVtZW50XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoIC0gVGhlIG51bWJlciBvZiBwaXhlbHMuXHJcbiAgICAgKiBAcmV0dXJuIHtDYW52YXN9IEEgQ2FudmFzIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgc2V0V2lkdGgod2lkdGgpIHtcclxuICAgICAgICB0aGlzLl9ub2RlLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGFuZ2UgaGVpZ2h0IG9mIEVsZW1lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaGVpZ2h0IC0gVGhlIG51bWJlciBvZiBwaXhlbHMuXHJcbiAgICAgKiBAcmV0dXJuIHtDYW52YXN9IEEgQ2FudmFzIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgc2V0SGVpZ2h0KGhlaWdodCkge1xyXG4gICAgICAgIHRoaXMuX25vZGUuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGEgZHJhd2luZyAyZCBjb250ZXh0IG9uIHRoZSBjYW52YXNcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IC0gUmVuZGVyaW5nQ29udGV4dFxyXG4gICAgICovXHJcbiAgICBnZXRTaXplKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgU2l6ZSh0aGlzLl9ub2RlLndpZHRoLCB0aGlzLl9ub2RlLmhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgYSBkcmF3aW5nIDJkIGNvbnRleHQgb24gdGhlIGNhbnZhc1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge09iamVjdH0gLSBBIG5vZGUuXHJcbiAgICAgKi9cclxuICAgIGdldE5vZGUoKSAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9ub2RlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGEgZHJhd2luZyAyZCBjb250ZXh0IG9uIHRoZSBjYW52YXNcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IC0gUmVuZGVyaW5nQ29udGV4dFxyXG4gICAgICovXHJcbiAgICBnZXRDb250ZXh0MmQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25vZGUuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hhbmdlIHRoZSB0eXBlIG9mIEhUTUwgZWxlbWVudCAodHlwZSBhdHRyaWJ1dGUpXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7RWxlbWVudH0gLSBBbiBFbGVtZW50IG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgc2V0VHlwZSh0eXBlKSB7XHJcbiAgICAgICAgdGhpcy5fbm9kZS50eXBlID0gdHlwZTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBjbGFzcyB0byBIVE1MIGVsZW1lbnQgKGF0dHJpYnV0ZSBgY2xhc3NgKVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge0VsZW1lbnR9IC0gQW4gRWxlbWVudCBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIGFkZENsYXNzKG5ld0NsYXNzKSB7XHJcbiAgICAgICAgdGhpcy5fbm9kZS5jbGFzc05hbWUgKz0gdGhpcy5fbm9kZS5jbGFzc05hbWUubGVuZ3RoID4gMSA/IGAgJHtuZXdDbGFzc31gIDogbmV3Q2xhc3M7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgbmV3IGF0dHJpYnV0ZSBvciBjaGFuZ2VzIHRoZSB2YWx1ZSBvZiBhbiBleGlzdGluZyBhdHRyaWJ1dGUgb24gdGhlIEhUTUwgZWxlbWVudC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtFbGVtZW50fSAtIEFuIEVsZW1lbnQgb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBzZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlVmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9ub2RlLnNldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVWYWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn0iLCIvKiFcbiAqIEBvdmVydmlldyBlczYtcHJvbWlzZSAtIGEgdGlueSBpbXBsZW1lbnRhdGlvbiBvZiBQcm9taXNlcy9BKy5cbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IChjKSAyMDE0IFllaHVkYSBLYXR6LCBUb20gRGFsZSwgU3RlZmFuIFBlbm5lciBhbmQgY29udHJpYnV0b3JzIChDb252ZXJzaW9uIHRvIEVTNiBBUEkgYnkgSmFrZSBBcmNoaWJhbGQpXG4gKiBAbGljZW5zZSAgIExpY2Vuc2VkIHVuZGVyIE1JVCBsaWNlbnNlXG4gKiAgICAgICAgICAgIFNlZSBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vc3RlZmFucGVubmVyL2VzNi1wcm9taXNlL21hc3Rlci9MSUNFTlNFXG4gKiBAdmVyc2lvbiAgIDQuMC41XG4gKi9cblxuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XG4gICAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcbiAgICAoZ2xvYmFsLkVTNlByb21pc2UgPSBmYWN0b3J5KCkpO1xufSh0aGlzLCAoZnVuY3Rpb24gKCkgeyAndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIG9iamVjdE9yRnVuY3Rpb24oeCkge1xuICByZXR1cm4gdHlwZW9mIHggPT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIHggPT09ICdvYmplY3QnICYmIHggIT09IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oeCkge1xuICByZXR1cm4gdHlwZW9mIHggPT09ICdmdW5jdGlvbic7XG59XG5cbnZhciBfaXNBcnJheSA9IHVuZGVmaW5lZDtcbmlmICghQXJyYXkuaXNBcnJheSkge1xuICBfaXNBcnJheSA9IGZ1bmN0aW9uICh4KSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgfTtcbn0gZWxzZSB7XG4gIF9pc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcbn1cblxudmFyIGlzQXJyYXkgPSBfaXNBcnJheTtcblxudmFyIGxlbiA9IDA7XG52YXIgdmVydHhOZXh0ID0gdW5kZWZpbmVkO1xudmFyIGN1c3RvbVNjaGVkdWxlckZuID0gdW5kZWZpbmVkO1xuXG52YXIgYXNhcCA9IGZ1bmN0aW9uIGFzYXAoY2FsbGJhY2ssIGFyZykge1xuICBxdWV1ZVtsZW5dID0gY2FsbGJhY2s7XG4gIHF1ZXVlW2xlbiArIDFdID0gYXJnO1xuICBsZW4gKz0gMjtcbiAgaWYgKGxlbiA9PT0gMikge1xuICAgIC8vIElmIGxlbiBpcyAyLCB0aGF0IG1lYW5zIHRoYXQgd2UgbmVlZCB0byBzY2hlZHVsZSBhbiBhc3luYyBmbHVzaC5cbiAgICAvLyBJZiBhZGRpdGlvbmFsIGNhbGxiYWNrcyBhcmUgcXVldWVkIGJlZm9yZSB0aGUgcXVldWUgaXMgZmx1c2hlZCwgdGhleVxuICAgIC8vIHdpbGwgYmUgcHJvY2Vzc2VkIGJ5IHRoaXMgZmx1c2ggdGhhdCB3ZSBhcmUgc2NoZWR1bGluZy5cbiAgICBpZiAoY3VzdG9tU2NoZWR1bGVyRm4pIHtcbiAgICAgIGN1c3RvbVNjaGVkdWxlckZuKGZsdXNoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2NoZWR1bGVGbHVzaCgpO1xuICAgIH1cbiAgfVxufTtcblxuZnVuY3Rpb24gc2V0U2NoZWR1bGVyKHNjaGVkdWxlRm4pIHtcbiAgY3VzdG9tU2NoZWR1bGVyRm4gPSBzY2hlZHVsZUZuO1xufVxuXG5mdW5jdGlvbiBzZXRBc2FwKGFzYXBGbikge1xuICBhc2FwID0gYXNhcEZuO1xufVxuXG52YXIgYnJvd3NlcldpbmRvdyA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogdW5kZWZpbmVkO1xudmFyIGJyb3dzZXJHbG9iYWwgPSBicm93c2VyV2luZG93IHx8IHt9O1xudmFyIEJyb3dzZXJNdXRhdGlvbk9ic2VydmVyID0gYnJvd3Nlckdsb2JhbC5NdXRhdGlvbk9ic2VydmVyIHx8IGJyb3dzZXJHbG9iYWwuV2ViS2l0TXV0YXRpb25PYnNlcnZlcjtcbnZhciBpc05vZGUgPSB0eXBlb2Ygc2VsZiA9PT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmICh7fSkudG9TdHJpbmcuY2FsbChwcm9jZXNzKSA9PT0gJ1tvYmplY3QgcHJvY2Vzc10nO1xuXG4vLyB0ZXN0IGZvciB3ZWIgd29ya2VyIGJ1dCBub3QgaW4gSUUxMFxudmFyIGlzV29ya2VyID0gdHlwZW9mIFVpbnQ4Q2xhbXBlZEFycmF5ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgaW1wb3J0U2NyaXB0cyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIE1lc3NhZ2VDaGFubmVsICE9PSAndW5kZWZpbmVkJztcblxuLy8gbm9kZVxuZnVuY3Rpb24gdXNlTmV4dFRpY2soKSB7XG4gIC8vIG5vZGUgdmVyc2lvbiAwLjEwLnggZGlzcGxheXMgYSBkZXByZWNhdGlvbiB3YXJuaW5nIHdoZW4gbmV4dFRpY2sgaXMgdXNlZCByZWN1cnNpdmVseVxuICAvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2N1am9qcy93aGVuL2lzc3Vlcy80MTAgZm9yIGRldGFpbHNcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gcHJvY2Vzcy5uZXh0VGljayhmbHVzaCk7XG4gIH07XG59XG5cbi8vIHZlcnR4XG5mdW5jdGlvbiB1c2VWZXJ0eFRpbWVyKCkge1xuICBpZiAodHlwZW9mIHZlcnR4TmV4dCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgdmVydHhOZXh0KGZsdXNoKTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHVzZVNldFRpbWVvdXQoKTtcbn1cblxuZnVuY3Rpb24gdXNlTXV0YXRpb25PYnNlcnZlcigpIHtcbiAgdmFyIGl0ZXJhdGlvbnMgPSAwO1xuICB2YXIgb2JzZXJ2ZXIgPSBuZXcgQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIoZmx1c2gpO1xuICB2YXIgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShub2RlLCB7IGNoYXJhY3RlckRhdGE6IHRydWUgfSk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBub2RlLmRhdGEgPSBpdGVyYXRpb25zID0gKytpdGVyYXRpb25zICUgMjtcbiAgfTtcbn1cblxuLy8gd2ViIHdvcmtlclxuZnVuY3Rpb24gdXNlTWVzc2FnZUNoYW5uZWwoKSB7XG4gIHZhciBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gZmx1c2g7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGNoYW5uZWwucG9ydDIucG9zdE1lc3NhZ2UoMCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHVzZVNldFRpbWVvdXQoKSB7XG4gIC8vIFN0b3JlIHNldFRpbWVvdXQgcmVmZXJlbmNlIHNvIGVzNi1wcm9taXNlIHdpbGwgYmUgdW5hZmZlY3RlZCBieVxuICAvLyBvdGhlciBjb2RlIG1vZGlmeWluZyBzZXRUaW1lb3V0IChsaWtlIHNpbm9uLnVzZUZha2VUaW1lcnMoKSlcbiAgdmFyIGdsb2JhbFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBnbG9iYWxTZXRUaW1lb3V0KGZsdXNoLCAxKTtcbiAgfTtcbn1cblxudmFyIHF1ZXVlID0gbmV3IEFycmF5KDEwMDApO1xuZnVuY3Rpb24gZmx1c2goKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDIpIHtcbiAgICB2YXIgY2FsbGJhY2sgPSBxdWV1ZVtpXTtcbiAgICB2YXIgYXJnID0gcXVldWVbaSArIDFdO1xuXG4gICAgY2FsbGJhY2soYXJnKTtcblxuICAgIHF1ZXVlW2ldID0gdW5kZWZpbmVkO1xuICAgIHF1ZXVlW2kgKyAxXSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGxlbiA9IDA7XG59XG5cbmZ1bmN0aW9uIGF0dGVtcHRWZXJ0eCgpIHtcbiAgdHJ5IHtcbiAgICB2YXIgciA9IHJlcXVpcmU7XG4gICAgdmFyIHZlcnR4ID0gcigndmVydHgnKTtcbiAgICB2ZXJ0eE5leHQgPSB2ZXJ0eC5ydW5Pbkxvb3AgfHwgdmVydHgucnVuT25Db250ZXh0O1xuICAgIHJldHVybiB1c2VWZXJ0eFRpbWVyKCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gdXNlU2V0VGltZW91dCgpO1xuICB9XG59XG5cbnZhciBzY2hlZHVsZUZsdXNoID0gdW5kZWZpbmVkO1xuLy8gRGVjaWRlIHdoYXQgYXN5bmMgbWV0aG9kIHRvIHVzZSB0byB0cmlnZ2VyaW5nIHByb2Nlc3Npbmcgb2YgcXVldWVkIGNhbGxiYWNrczpcbmlmIChpc05vZGUpIHtcbiAgc2NoZWR1bGVGbHVzaCA9IHVzZU5leHRUaWNrKCk7XG59IGVsc2UgaWYgKEJyb3dzZXJNdXRhdGlvbk9ic2VydmVyKSB7XG4gIHNjaGVkdWxlRmx1c2ggPSB1c2VNdXRhdGlvbk9ic2VydmVyKCk7XG59IGVsc2UgaWYgKGlzV29ya2VyKSB7XG4gIHNjaGVkdWxlRmx1c2ggPSB1c2VNZXNzYWdlQ2hhbm5lbCgpO1xufSBlbHNlIGlmIChicm93c2VyV2luZG93ID09PSB1bmRlZmluZWQgJiYgdHlwZW9mIHJlcXVpcmUgPT09ICdmdW5jdGlvbicpIHtcbiAgc2NoZWR1bGVGbHVzaCA9IGF0dGVtcHRWZXJ0eCgpO1xufSBlbHNlIHtcbiAgc2NoZWR1bGVGbHVzaCA9IHVzZVNldFRpbWVvdXQoKTtcbn1cblxuZnVuY3Rpb24gdGhlbihvbkZ1bGZpbGxtZW50LCBvblJlamVjdGlvbikge1xuICB2YXIgX2FyZ3VtZW50cyA9IGFyZ3VtZW50cztcblxuICB2YXIgcGFyZW50ID0gdGhpcztcblxuICB2YXIgY2hpbGQgPSBuZXcgdGhpcy5jb25zdHJ1Y3Rvcihub29wKTtcblxuICBpZiAoY2hpbGRbUFJPTUlTRV9JRF0gPT09IHVuZGVmaW5lZCkge1xuICAgIG1ha2VQcm9taXNlKGNoaWxkKTtcbiAgfVxuXG4gIHZhciBfc3RhdGUgPSBwYXJlbnQuX3N0YXRlO1xuXG4gIGlmIChfc3RhdGUpIHtcbiAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGNhbGxiYWNrID0gX2FyZ3VtZW50c1tfc3RhdGUgLSAxXTtcbiAgICAgIGFzYXAoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gaW52b2tlQ2FsbGJhY2soX3N0YXRlLCBjaGlsZCwgY2FsbGJhY2ssIHBhcmVudC5fcmVzdWx0KTtcbiAgICAgIH0pO1xuICAgIH0pKCk7XG4gIH0gZWxzZSB7XG4gICAgc3Vic2NyaWJlKHBhcmVudCwgY2hpbGQsIG9uRnVsZmlsbG1lbnQsIG9uUmVqZWN0aW9uKTtcbiAgfVxuXG4gIHJldHVybiBjaGlsZDtcbn1cblxuLyoqXG4gIGBQcm9taXNlLnJlc29sdmVgIHJldHVybnMgYSBwcm9taXNlIHRoYXQgd2lsbCBiZWNvbWUgcmVzb2x2ZWQgd2l0aCB0aGVcbiAgcGFzc2VkIGB2YWx1ZWAuIEl0IGlzIHNob3J0aGFuZCBmb3IgdGhlIGZvbGxvd2luZzpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICByZXNvbHZlKDEpO1xuICB9KTtcblxuICBwcm9taXNlLnRoZW4oZnVuY3Rpb24odmFsdWUpe1xuICAgIC8vIHZhbHVlID09PSAxXG4gIH0pO1xuICBgYGBcblxuICBJbnN0ZWFkIG9mIHdyaXRpbmcgdGhlIGFib3ZlLCB5b3VyIGNvZGUgbm93IHNpbXBseSBiZWNvbWVzIHRoZSBmb2xsb3dpbmc6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBsZXQgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgxKTtcblxuICBwcm9taXNlLnRoZW4oZnVuY3Rpb24odmFsdWUpe1xuICAgIC8vIHZhbHVlID09PSAxXG4gIH0pO1xuICBgYGBcblxuICBAbWV0aG9kIHJlc29sdmVcbiAgQHN0YXRpY1xuICBAcGFyYW0ge0FueX0gdmFsdWUgdmFsdWUgdGhhdCB0aGUgcmV0dXJuZWQgcHJvbWlzZSB3aWxsIGJlIHJlc29sdmVkIHdpdGhcbiAgVXNlZnVsIGZvciB0b29saW5nLlxuICBAcmV0dXJuIHtQcm9taXNlfSBhIHByb21pc2UgdGhhdCB3aWxsIGJlY29tZSBmdWxmaWxsZWQgd2l0aCB0aGUgZ2l2ZW5cbiAgYHZhbHVlYFxuKi9cbmZ1bmN0aW9uIHJlc29sdmUob2JqZWN0KSB7XG4gIC8qanNoaW50IHZhbGlkdGhpczp0cnVlICovXG4gIHZhciBDb25zdHJ1Y3RvciA9IHRoaXM7XG5cbiAgaWYgKG9iamVjdCAmJiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QuY29uc3RydWN0b3IgPT09IENvbnN0cnVjdG9yKSB7XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfVxuXG4gIHZhciBwcm9taXNlID0gbmV3IENvbnN0cnVjdG9yKG5vb3ApO1xuICBfcmVzb2x2ZShwcm9taXNlLCBvYmplY3QpO1xuICByZXR1cm4gcHJvbWlzZTtcbn1cblxudmFyIFBST01JU0VfSUQgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoMTYpO1xuXG5mdW5jdGlvbiBub29wKCkge31cblxudmFyIFBFTkRJTkcgPSB2b2lkIDA7XG52YXIgRlVMRklMTEVEID0gMTtcbnZhciBSRUpFQ1RFRCA9IDI7XG5cbnZhciBHRVRfVEhFTl9FUlJPUiA9IG5ldyBFcnJvck9iamVjdCgpO1xuXG5mdW5jdGlvbiBzZWxmRnVsZmlsbG1lbnQoKSB7XG4gIHJldHVybiBuZXcgVHlwZUVycm9yKFwiWW91IGNhbm5vdCByZXNvbHZlIGEgcHJvbWlzZSB3aXRoIGl0c2VsZlwiKTtcbn1cblxuZnVuY3Rpb24gY2Fubm90UmV0dXJuT3duKCkge1xuICByZXR1cm4gbmV3IFR5cGVFcnJvcignQSBwcm9taXNlcyBjYWxsYmFjayBjYW5ub3QgcmV0dXJuIHRoYXQgc2FtZSBwcm9taXNlLicpO1xufVxuXG5mdW5jdGlvbiBnZXRUaGVuKHByb21pc2UpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gcHJvbWlzZS50aGVuO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIEdFVF9USEVOX0VSUk9SLmVycm9yID0gZXJyb3I7XG4gICAgcmV0dXJuIEdFVF9USEVOX0VSUk9SO1xuICB9XG59XG5cbmZ1bmN0aW9uIHRyeVRoZW4odGhlbiwgdmFsdWUsIGZ1bGZpbGxtZW50SGFuZGxlciwgcmVqZWN0aW9uSGFuZGxlcikge1xuICB0cnkge1xuICAgIHRoZW4uY2FsbCh2YWx1ZSwgZnVsZmlsbG1lbnRIYW5kbGVyLCByZWplY3Rpb25IYW5kbGVyKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUZvcmVpZ25UaGVuYWJsZShwcm9taXNlLCB0aGVuYWJsZSwgdGhlbikge1xuICBhc2FwKGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgdmFyIHNlYWxlZCA9IGZhbHNlO1xuICAgIHZhciBlcnJvciA9IHRyeVRoZW4odGhlbiwgdGhlbmFibGUsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgaWYgKHNlYWxlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBzZWFsZWQgPSB0cnVlO1xuICAgICAgaWYgKHRoZW5hYmxlICE9PSB2YWx1ZSkge1xuICAgICAgICBfcmVzb2x2ZShwcm9taXNlLCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmdWxmaWxsKHByb21pc2UsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICBpZiAoc2VhbGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHNlYWxlZCA9IHRydWU7XG5cbiAgICAgIF9yZWplY3QocHJvbWlzZSwgcmVhc29uKTtcbiAgICB9LCAnU2V0dGxlOiAnICsgKHByb21pc2UuX2xhYmVsIHx8ICcgdW5rbm93biBwcm9taXNlJykpO1xuXG4gICAgaWYgKCFzZWFsZWQgJiYgZXJyb3IpIHtcbiAgICAgIHNlYWxlZCA9IHRydWU7XG4gICAgICBfcmVqZWN0KHByb21pc2UsIGVycm9yKTtcbiAgICB9XG4gIH0sIHByb21pc2UpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVPd25UaGVuYWJsZShwcm9taXNlLCB0aGVuYWJsZSkge1xuICBpZiAodGhlbmFibGUuX3N0YXRlID09PSBGVUxGSUxMRUQpIHtcbiAgICBmdWxmaWxsKHByb21pc2UsIHRoZW5hYmxlLl9yZXN1bHQpO1xuICB9IGVsc2UgaWYgKHRoZW5hYmxlLl9zdGF0ZSA9PT0gUkVKRUNURUQpIHtcbiAgICBfcmVqZWN0KHByb21pc2UsIHRoZW5hYmxlLl9yZXN1bHQpO1xuICB9IGVsc2Uge1xuICAgIHN1YnNjcmliZSh0aGVuYWJsZSwgdW5kZWZpbmVkLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiBfcmVzb2x2ZShwcm9taXNlLCB2YWx1ZSk7XG4gICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgcmV0dXJuIF9yZWplY3QocHJvbWlzZSwgcmVhc29uKTtcbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVNYXliZVRoZW5hYmxlKHByb21pc2UsIG1heWJlVGhlbmFibGUsIHRoZW4kJCkge1xuICBpZiAobWF5YmVUaGVuYWJsZS5jb25zdHJ1Y3RvciA9PT0gcHJvbWlzZS5jb25zdHJ1Y3RvciAmJiB0aGVuJCQgPT09IHRoZW4gJiYgbWF5YmVUaGVuYWJsZS5jb25zdHJ1Y3Rvci5yZXNvbHZlID09PSByZXNvbHZlKSB7XG4gICAgaGFuZGxlT3duVGhlbmFibGUocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHRoZW4kJCA9PT0gR0VUX1RIRU5fRVJST1IpIHtcbiAgICAgIF9yZWplY3QocHJvbWlzZSwgR0VUX1RIRU5fRVJST1IuZXJyb3IpO1xuICAgIH0gZWxzZSBpZiAodGhlbiQkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGZ1bGZpbGwocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSk7XG4gICAgfSBlbHNlIGlmIChpc0Z1bmN0aW9uKHRoZW4kJCkpIHtcbiAgICAgIGhhbmRsZUZvcmVpZ25UaGVuYWJsZShwcm9taXNlLCBtYXliZVRoZW5hYmxlLCB0aGVuJCQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmdWxmaWxsKHByb21pc2UsIG1heWJlVGhlbmFibGUpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBfcmVzb2x2ZShwcm9taXNlLCB2YWx1ZSkge1xuICBpZiAocHJvbWlzZSA9PT0gdmFsdWUpIHtcbiAgICBfcmVqZWN0KHByb21pc2UsIHNlbGZGdWxmaWxsbWVudCgpKTtcbiAgfSBlbHNlIGlmIChvYmplY3RPckZ1bmN0aW9uKHZhbHVlKSkge1xuICAgIGhhbmRsZU1heWJlVGhlbmFibGUocHJvbWlzZSwgdmFsdWUsIGdldFRoZW4odmFsdWUpKTtcbiAgfSBlbHNlIHtcbiAgICBmdWxmaWxsKHByb21pc2UsIHZhbHVlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwdWJsaXNoUmVqZWN0aW9uKHByb21pc2UpIHtcbiAgaWYgKHByb21pc2UuX29uZXJyb3IpIHtcbiAgICBwcm9taXNlLl9vbmVycm9yKHByb21pc2UuX3Jlc3VsdCk7XG4gIH1cblxuICBwdWJsaXNoKHByb21pc2UpO1xufVxuXG5mdW5jdGlvbiBmdWxmaWxsKHByb21pc2UsIHZhbHVlKSB7XG4gIGlmIChwcm9taXNlLl9zdGF0ZSAhPT0gUEVORElORykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHByb21pc2UuX3Jlc3VsdCA9IHZhbHVlO1xuICBwcm9taXNlLl9zdGF0ZSA9IEZVTEZJTExFRDtcblxuICBpZiAocHJvbWlzZS5fc3Vic2NyaWJlcnMubGVuZ3RoICE9PSAwKSB7XG4gICAgYXNhcChwdWJsaXNoLCBwcm9taXNlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfcmVqZWN0KHByb21pc2UsIHJlYXNvbikge1xuICBpZiAocHJvbWlzZS5fc3RhdGUgIT09IFBFTkRJTkcpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgcHJvbWlzZS5fc3RhdGUgPSBSRUpFQ1RFRDtcbiAgcHJvbWlzZS5fcmVzdWx0ID0gcmVhc29uO1xuXG4gIGFzYXAocHVibGlzaFJlamVjdGlvbiwgcHJvbWlzZSk7XG59XG5cbmZ1bmN0aW9uIHN1YnNjcmliZShwYXJlbnQsIGNoaWxkLCBvbkZ1bGZpbGxtZW50LCBvblJlamVjdGlvbikge1xuICB2YXIgX3N1YnNjcmliZXJzID0gcGFyZW50Ll9zdWJzY3JpYmVycztcbiAgdmFyIGxlbmd0aCA9IF9zdWJzY3JpYmVycy5sZW5ndGg7XG5cbiAgcGFyZW50Ll9vbmVycm9yID0gbnVsbDtcblxuICBfc3Vic2NyaWJlcnNbbGVuZ3RoXSA9IGNoaWxkO1xuICBfc3Vic2NyaWJlcnNbbGVuZ3RoICsgRlVMRklMTEVEXSA9IG9uRnVsZmlsbG1lbnQ7XG4gIF9zdWJzY3JpYmVyc1tsZW5ndGggKyBSRUpFQ1RFRF0gPSBvblJlamVjdGlvbjtcblxuICBpZiAobGVuZ3RoID09PSAwICYmIHBhcmVudC5fc3RhdGUpIHtcbiAgICBhc2FwKHB1Ymxpc2gsIHBhcmVudCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcHVibGlzaChwcm9taXNlKSB7XG4gIHZhciBzdWJzY3JpYmVycyA9IHByb21pc2UuX3N1YnNjcmliZXJzO1xuICB2YXIgc2V0dGxlZCA9IHByb21pc2UuX3N0YXRlO1xuXG4gIGlmIChzdWJzY3JpYmVycy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgY2hpbGQgPSB1bmRlZmluZWQsXG4gICAgICBjYWxsYmFjayA9IHVuZGVmaW5lZCxcbiAgICAgIGRldGFpbCA9IHByb21pc2UuX3Jlc3VsdDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN1YnNjcmliZXJzLmxlbmd0aDsgaSArPSAzKSB7XG4gICAgY2hpbGQgPSBzdWJzY3JpYmVyc1tpXTtcbiAgICBjYWxsYmFjayA9IHN1YnNjcmliZXJzW2kgKyBzZXR0bGVkXTtcblxuICAgIGlmIChjaGlsZCkge1xuICAgICAgaW52b2tlQ2FsbGJhY2soc2V0dGxlZCwgY2hpbGQsIGNhbGxiYWNrLCBkZXRhaWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWxsYmFjayhkZXRhaWwpO1xuICAgIH1cbiAgfVxuXG4gIHByb21pc2UuX3N1YnNjcmliZXJzLmxlbmd0aCA9IDA7XG59XG5cbmZ1bmN0aW9uIEVycm9yT2JqZWN0KCkge1xuICB0aGlzLmVycm9yID0gbnVsbDtcbn1cblxudmFyIFRSWV9DQVRDSF9FUlJPUiA9IG5ldyBFcnJvck9iamVjdCgpO1xuXG5mdW5jdGlvbiB0cnlDYXRjaChjYWxsYmFjaywgZGV0YWlsKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrKGRldGFpbCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBUUllfQ0FUQ0hfRVJST1IuZXJyb3IgPSBlO1xuICAgIHJldHVybiBUUllfQ0FUQ0hfRVJST1I7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW52b2tlQ2FsbGJhY2soc2V0dGxlZCwgcHJvbWlzZSwgY2FsbGJhY2ssIGRldGFpbCkge1xuICB2YXIgaGFzQ2FsbGJhY2sgPSBpc0Z1bmN0aW9uKGNhbGxiYWNrKSxcbiAgICAgIHZhbHVlID0gdW5kZWZpbmVkLFxuICAgICAgZXJyb3IgPSB1bmRlZmluZWQsXG4gICAgICBzdWNjZWVkZWQgPSB1bmRlZmluZWQsXG4gICAgICBmYWlsZWQgPSB1bmRlZmluZWQ7XG5cbiAgaWYgKGhhc0NhbGxiYWNrKSB7XG4gICAgdmFsdWUgPSB0cnlDYXRjaChjYWxsYmFjaywgZGV0YWlsKTtcblxuICAgIGlmICh2YWx1ZSA9PT0gVFJZX0NBVENIX0VSUk9SKSB7XG4gICAgICBmYWlsZWQgPSB0cnVlO1xuICAgICAgZXJyb3IgPSB2YWx1ZS5lcnJvcjtcbiAgICAgIHZhbHVlID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VjY2VlZGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAocHJvbWlzZSA9PT0gdmFsdWUpIHtcbiAgICAgIF9yZWplY3QocHJvbWlzZSwgY2Fubm90UmV0dXJuT3duKCkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YWx1ZSA9IGRldGFpbDtcbiAgICBzdWNjZWVkZWQgPSB0cnVlO1xuICB9XG5cbiAgaWYgKHByb21pc2UuX3N0YXRlICE9PSBQRU5ESU5HKSB7XG4gICAgLy8gbm9vcFxuICB9IGVsc2UgaWYgKGhhc0NhbGxiYWNrICYmIHN1Y2NlZWRlZCkge1xuICAgICAgX3Jlc29sdmUocHJvbWlzZSwgdmFsdWUpO1xuICAgIH0gZWxzZSBpZiAoZmFpbGVkKSB7XG4gICAgICBfcmVqZWN0KHByb21pc2UsIGVycm9yKTtcbiAgICB9IGVsc2UgaWYgKHNldHRsZWQgPT09IEZVTEZJTExFRCkge1xuICAgICAgZnVsZmlsbChwcm9taXNlLCB2YWx1ZSk7XG4gICAgfSBlbHNlIGlmIChzZXR0bGVkID09PSBSRUpFQ1RFRCkge1xuICAgICAgX3JlamVjdChwcm9taXNlLCB2YWx1ZSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpbml0aWFsaXplUHJvbWlzZShwcm9taXNlLCByZXNvbHZlcikge1xuICB0cnkge1xuICAgIHJlc29sdmVyKGZ1bmN0aW9uIHJlc29sdmVQcm9taXNlKHZhbHVlKSB7XG4gICAgICBfcmVzb2x2ZShwcm9taXNlLCB2YWx1ZSk7XG4gICAgfSwgZnVuY3Rpb24gcmVqZWN0UHJvbWlzZShyZWFzb24pIHtcbiAgICAgIF9yZWplY3QocHJvbWlzZSwgcmVhc29uKTtcbiAgICB9KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIF9yZWplY3QocHJvbWlzZSwgZSk7XG4gIH1cbn1cblxudmFyIGlkID0gMDtcbmZ1bmN0aW9uIG5leHRJZCgpIHtcbiAgcmV0dXJuIGlkKys7XG59XG5cbmZ1bmN0aW9uIG1ha2VQcm9taXNlKHByb21pc2UpIHtcbiAgcHJvbWlzZVtQUk9NSVNFX0lEXSA9IGlkKys7XG4gIHByb21pc2UuX3N0YXRlID0gdW5kZWZpbmVkO1xuICBwcm9taXNlLl9yZXN1bHQgPSB1bmRlZmluZWQ7XG4gIHByb21pc2UuX3N1YnNjcmliZXJzID0gW107XG59XG5cbmZ1bmN0aW9uIEVudW1lcmF0b3IoQ29uc3RydWN0b3IsIGlucHV0KSB7XG4gIHRoaXMuX2luc3RhbmNlQ29uc3RydWN0b3IgPSBDb25zdHJ1Y3RvcjtcbiAgdGhpcy5wcm9taXNlID0gbmV3IENvbnN0cnVjdG9yKG5vb3ApO1xuXG4gIGlmICghdGhpcy5wcm9taXNlW1BST01JU0VfSURdKSB7XG4gICAgbWFrZVByb21pc2UodGhpcy5wcm9taXNlKTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KGlucHV0KSkge1xuICAgIHRoaXMuX2lucHV0ID0gaW5wdXQ7XG4gICAgdGhpcy5sZW5ndGggPSBpbnB1dC5sZW5ndGg7XG4gICAgdGhpcy5fcmVtYWluaW5nID0gaW5wdXQubGVuZ3RoO1xuXG4gICAgdGhpcy5fcmVzdWx0ID0gbmV3IEFycmF5KHRoaXMubGVuZ3RoKTtcblxuICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgZnVsZmlsbCh0aGlzLnByb21pc2UsIHRoaXMuX3Jlc3VsdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGVuZ3RoID0gdGhpcy5sZW5ndGggfHwgMDtcbiAgICAgIHRoaXMuX2VudW1lcmF0ZSgpO1xuICAgICAgaWYgKHRoaXMuX3JlbWFpbmluZyA9PT0gMCkge1xuICAgICAgICBmdWxmaWxsKHRoaXMucHJvbWlzZSwgdGhpcy5fcmVzdWx0KTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgX3JlamVjdCh0aGlzLnByb21pc2UsIHZhbGlkYXRpb25FcnJvcigpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB2YWxpZGF0aW9uRXJyb3IoKSB7XG4gIHJldHVybiBuZXcgRXJyb3IoJ0FycmF5IE1ldGhvZHMgbXVzdCBiZSBwcm92aWRlZCBhbiBBcnJheScpO1xufTtcblxuRW51bWVyYXRvci5wcm90b3R5cGUuX2VudW1lcmF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGxlbmd0aCA9IHRoaXMubGVuZ3RoO1xuICB2YXIgX2lucHV0ID0gdGhpcy5faW5wdXQ7XG5cbiAgZm9yICh2YXIgaSA9IDA7IHRoaXMuX3N0YXRlID09PSBQRU5ESU5HICYmIGkgPCBsZW5ndGg7IGkrKykge1xuICAgIHRoaXMuX2VhY2hFbnRyeShfaW5wdXRbaV0sIGkpO1xuICB9XG59O1xuXG5FbnVtZXJhdG9yLnByb3RvdHlwZS5fZWFjaEVudHJ5ID0gZnVuY3Rpb24gKGVudHJ5LCBpKSB7XG4gIHZhciBjID0gdGhpcy5faW5zdGFuY2VDb25zdHJ1Y3RvcjtcbiAgdmFyIHJlc29sdmUkJCA9IGMucmVzb2x2ZTtcblxuICBpZiAocmVzb2x2ZSQkID09PSByZXNvbHZlKSB7XG4gICAgdmFyIF90aGVuID0gZ2V0VGhlbihlbnRyeSk7XG5cbiAgICBpZiAoX3RoZW4gPT09IHRoZW4gJiYgZW50cnkuX3N0YXRlICE9PSBQRU5ESU5HKSB7XG4gICAgICB0aGlzLl9zZXR0bGVkQXQoZW50cnkuX3N0YXRlLCBpLCBlbnRyeS5fcmVzdWx0KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBfdGhlbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5fcmVtYWluaW5nLS07XG4gICAgICB0aGlzLl9yZXN1bHRbaV0gPSBlbnRyeTtcbiAgICB9IGVsc2UgaWYgKGMgPT09IFByb21pc2UpIHtcbiAgICAgIHZhciBwcm9taXNlID0gbmV3IGMobm9vcCk7XG4gICAgICBoYW5kbGVNYXliZVRoZW5hYmxlKHByb21pc2UsIGVudHJ5LCBfdGhlbik7XG4gICAgICB0aGlzLl93aWxsU2V0dGxlQXQocHJvbWlzZSwgaSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3dpbGxTZXR0bGVBdChuZXcgYyhmdW5jdGlvbiAocmVzb2x2ZSQkKSB7XG4gICAgICAgIHJldHVybiByZXNvbHZlJCQoZW50cnkpO1xuICAgICAgfSksIGkpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aGlzLl93aWxsU2V0dGxlQXQocmVzb2x2ZSQkKGVudHJ5KSwgaSk7XG4gIH1cbn07XG5cbkVudW1lcmF0b3IucHJvdG90eXBlLl9zZXR0bGVkQXQgPSBmdW5jdGlvbiAoc3RhdGUsIGksIHZhbHVlKSB7XG4gIHZhciBwcm9taXNlID0gdGhpcy5wcm9taXNlO1xuXG4gIGlmIChwcm9taXNlLl9zdGF0ZSA9PT0gUEVORElORykge1xuICAgIHRoaXMuX3JlbWFpbmluZy0tO1xuXG4gICAgaWYgKHN0YXRlID09PSBSRUpFQ1RFRCkge1xuICAgICAgX3JlamVjdChwcm9taXNlLCB2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3Jlc3VsdFtpXSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGlmICh0aGlzLl9yZW1haW5pbmcgPT09IDApIHtcbiAgICBmdWxmaWxsKHByb21pc2UsIHRoaXMuX3Jlc3VsdCk7XG4gIH1cbn07XG5cbkVudW1lcmF0b3IucHJvdG90eXBlLl93aWxsU2V0dGxlQXQgPSBmdW5jdGlvbiAocHJvbWlzZSwgaSkge1xuICB2YXIgZW51bWVyYXRvciA9IHRoaXM7XG5cbiAgc3Vic2NyaWJlKHByb21pc2UsIHVuZGVmaW5lZCwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgcmV0dXJuIGVudW1lcmF0b3IuX3NldHRsZWRBdChGVUxGSUxMRUQsIGksIHZhbHVlKTtcbiAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgIHJldHVybiBlbnVtZXJhdG9yLl9zZXR0bGVkQXQoUkVKRUNURUQsIGksIHJlYXNvbik7XG4gIH0pO1xufTtcblxuLyoqXG4gIGBQcm9taXNlLmFsbGAgYWNjZXB0cyBhbiBhcnJheSBvZiBwcm9taXNlcywgYW5kIHJldHVybnMgYSBuZXcgcHJvbWlzZSB3aGljaFxuICBpcyBmdWxmaWxsZWQgd2l0aCBhbiBhcnJheSBvZiBmdWxmaWxsbWVudCB2YWx1ZXMgZm9yIHRoZSBwYXNzZWQgcHJvbWlzZXMsIG9yXG4gIHJlamVjdGVkIHdpdGggdGhlIHJlYXNvbiBvZiB0aGUgZmlyc3QgcGFzc2VkIHByb21pc2UgdG8gYmUgcmVqZWN0ZWQuIEl0IGNhc3RzIGFsbFxuICBlbGVtZW50cyBvZiB0aGUgcGFzc2VkIGl0ZXJhYmxlIHRvIHByb21pc2VzIGFzIGl0IHJ1bnMgdGhpcyBhbGdvcml0aG0uXG5cbiAgRXhhbXBsZTpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGxldCBwcm9taXNlMSA9IHJlc29sdmUoMSk7XG4gIGxldCBwcm9taXNlMiA9IHJlc29sdmUoMik7XG4gIGxldCBwcm9taXNlMyA9IHJlc29sdmUoMyk7XG4gIGxldCBwcm9taXNlcyA9IFsgcHJvbWlzZTEsIHByb21pc2UyLCBwcm9taXNlMyBdO1xuXG4gIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKGZ1bmN0aW9uKGFycmF5KXtcbiAgICAvLyBUaGUgYXJyYXkgaGVyZSB3b3VsZCBiZSBbIDEsIDIsIDMgXTtcbiAgfSk7XG4gIGBgYFxuXG4gIElmIGFueSBvZiB0aGUgYHByb21pc2VzYCBnaXZlbiB0byBgYWxsYCBhcmUgcmVqZWN0ZWQsIHRoZSBmaXJzdCBwcm9taXNlXG4gIHRoYXQgaXMgcmVqZWN0ZWQgd2lsbCBiZSBnaXZlbiBhcyBhbiBhcmd1bWVudCB0byB0aGUgcmV0dXJuZWQgcHJvbWlzZXMnc1xuICByZWplY3Rpb24gaGFuZGxlci4gRm9yIGV4YW1wbGU6XG5cbiAgRXhhbXBsZTpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGxldCBwcm9taXNlMSA9IHJlc29sdmUoMSk7XG4gIGxldCBwcm9taXNlMiA9IHJlamVjdChuZXcgRXJyb3IoXCIyXCIpKTtcbiAgbGV0IHByb21pc2UzID0gcmVqZWN0KG5ldyBFcnJvcihcIjNcIikpO1xuICBsZXQgcHJvbWlzZXMgPSBbIHByb21pc2UxLCBwcm9taXNlMiwgcHJvbWlzZTMgXTtcblxuICBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihmdW5jdGlvbihhcnJheSl7XG4gICAgLy8gQ29kZSBoZXJlIG5ldmVyIHJ1bnMgYmVjYXVzZSB0aGVyZSBhcmUgcmVqZWN0ZWQgcHJvbWlzZXMhXG4gIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgLy8gZXJyb3IubWVzc2FnZSA9PT0gXCIyXCJcbiAgfSk7XG4gIGBgYFxuXG4gIEBtZXRob2QgYWxsXG4gIEBzdGF0aWNcbiAgQHBhcmFtIHtBcnJheX0gZW50cmllcyBhcnJheSBvZiBwcm9taXNlc1xuICBAcGFyYW0ge1N0cmluZ30gbGFiZWwgb3B0aW9uYWwgc3RyaW5nIGZvciBsYWJlbGluZyB0aGUgcHJvbWlzZS5cbiAgVXNlZnVsIGZvciB0b29saW5nLlxuICBAcmV0dXJuIHtQcm9taXNlfSBwcm9taXNlIHRoYXQgaXMgZnVsZmlsbGVkIHdoZW4gYWxsIGBwcm9taXNlc2AgaGF2ZSBiZWVuXG4gIGZ1bGZpbGxlZCwgb3IgcmVqZWN0ZWQgaWYgYW55IG9mIHRoZW0gYmVjb21lIHJlamVjdGVkLlxuICBAc3RhdGljXG4qL1xuZnVuY3Rpb24gYWxsKGVudHJpZXMpIHtcbiAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yKHRoaXMsIGVudHJpZXMpLnByb21pc2U7XG59XG5cbi8qKlxuICBgUHJvbWlzZS5yYWNlYCByZXR1cm5zIGEgbmV3IHByb21pc2Ugd2hpY2ggaXMgc2V0dGxlZCBpbiB0aGUgc2FtZSB3YXkgYXMgdGhlXG4gIGZpcnN0IHBhc3NlZCBwcm9taXNlIHRvIHNldHRsZS5cblxuICBFeGFtcGxlOlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgbGV0IHByb21pc2UxID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICByZXNvbHZlKCdwcm9taXNlIDEnKTtcbiAgICB9LCAyMDApO1xuICB9KTtcblxuICBsZXQgcHJvbWlzZTIgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIHJlc29sdmUoJ3Byb21pc2UgMicpO1xuICAgIH0sIDEwMCk7XG4gIH0pO1xuXG4gIFByb21pc2UucmFjZShbcHJvbWlzZTEsIHByb21pc2UyXSkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgIC8vIHJlc3VsdCA9PT0gJ3Byb21pc2UgMicgYmVjYXVzZSBpdCB3YXMgcmVzb2x2ZWQgYmVmb3JlIHByb21pc2UxXG4gICAgLy8gd2FzIHJlc29sdmVkLlxuICB9KTtcbiAgYGBgXG5cbiAgYFByb21pc2UucmFjZWAgaXMgZGV0ZXJtaW5pc3RpYyBpbiB0aGF0IG9ubHkgdGhlIHN0YXRlIG9mIHRoZSBmaXJzdFxuICBzZXR0bGVkIHByb21pc2UgbWF0dGVycy4gRm9yIGV4YW1wbGUsIGV2ZW4gaWYgb3RoZXIgcHJvbWlzZXMgZ2l2ZW4gdG8gdGhlXG4gIGBwcm9taXNlc2AgYXJyYXkgYXJndW1lbnQgYXJlIHJlc29sdmVkLCBidXQgdGhlIGZpcnN0IHNldHRsZWQgcHJvbWlzZSBoYXNcbiAgYmVjb21lIHJlamVjdGVkIGJlZm9yZSB0aGUgb3RoZXIgcHJvbWlzZXMgYmVjYW1lIGZ1bGZpbGxlZCwgdGhlIHJldHVybmVkXG4gIHByb21pc2Ugd2lsbCBiZWNvbWUgcmVqZWN0ZWQ6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBsZXQgcHJvbWlzZTEgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIHJlc29sdmUoJ3Byb21pc2UgMScpO1xuICAgIH0sIDIwMCk7XG4gIH0pO1xuXG4gIGxldCBwcm9taXNlMiA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgcmVqZWN0KG5ldyBFcnJvcigncHJvbWlzZSAyJykpO1xuICAgIH0sIDEwMCk7XG4gIH0pO1xuXG4gIFByb21pc2UucmFjZShbcHJvbWlzZTEsIHByb21pc2UyXSkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgIC8vIENvZGUgaGVyZSBuZXZlciBydW5zXG4gIH0sIGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgLy8gcmVhc29uLm1lc3NhZ2UgPT09ICdwcm9taXNlIDInIGJlY2F1c2UgcHJvbWlzZSAyIGJlY2FtZSByZWplY3RlZCBiZWZvcmVcbiAgICAvLyBwcm9taXNlIDEgYmVjYW1lIGZ1bGZpbGxlZFxuICB9KTtcbiAgYGBgXG5cbiAgQW4gZXhhbXBsZSByZWFsLXdvcmxkIHVzZSBjYXNlIGlzIGltcGxlbWVudGluZyB0aW1lb3V0czpcblxuICBgYGBqYXZhc2NyaXB0XG4gIFByb21pc2UucmFjZShbYWpheCgnZm9vLmpzb24nKSwgdGltZW91dCg1MDAwKV0pXG4gIGBgYFxuXG4gIEBtZXRob2QgcmFjZVxuICBAc3RhdGljXG4gIEBwYXJhbSB7QXJyYXl9IHByb21pc2VzIGFycmF5IG9mIHByb21pc2VzIHRvIG9ic2VydmVcbiAgVXNlZnVsIGZvciB0b29saW5nLlxuICBAcmV0dXJuIHtQcm9taXNlfSBhIHByb21pc2Ugd2hpY2ggc2V0dGxlcyBpbiB0aGUgc2FtZSB3YXkgYXMgdGhlIGZpcnN0IHBhc3NlZFxuICBwcm9taXNlIHRvIHNldHRsZS5cbiovXG5mdW5jdGlvbiByYWNlKGVudHJpZXMpIHtcbiAgLypqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi9cbiAgdmFyIENvbnN0cnVjdG9yID0gdGhpcztcblxuICBpZiAoIWlzQXJyYXkoZW50cmllcykpIHtcbiAgICByZXR1cm4gbmV3IENvbnN0cnVjdG9yKGZ1bmN0aW9uIChfLCByZWplY3QpIHtcbiAgICAgIHJldHVybiByZWplY3QobmV3IFR5cGVFcnJvcignWW91IG11c3QgcGFzcyBhbiBhcnJheSB0byByYWNlLicpKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IENvbnN0cnVjdG9yKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciBsZW5ndGggPSBlbnRyaWVzLmxlbmd0aDtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgQ29uc3RydWN0b3IucmVzb2x2ZShlbnRyaWVzW2ldKS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4gIGBQcm9taXNlLnJlamVjdGAgcmV0dXJucyBhIHByb21pc2UgcmVqZWN0ZWQgd2l0aCB0aGUgcGFzc2VkIGByZWFzb25gLlxuICBJdCBpcyBzaG9ydGhhbmQgZm9yIHRoZSBmb2xsb3dpbmc6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XG4gICAgcmVqZWN0KG5ldyBFcnJvcignV0hPT1BTJykpO1xuICB9KTtcblxuICBwcm9taXNlLnRoZW4oZnVuY3Rpb24odmFsdWUpe1xuICAgIC8vIENvZGUgaGVyZSBkb2Vzbid0IHJ1biBiZWNhdXNlIHRoZSBwcm9taXNlIGlzIHJlamVjdGVkIVxuICB9LCBmdW5jdGlvbihyZWFzb24pe1xuICAgIC8vIHJlYXNvbi5tZXNzYWdlID09PSAnV0hPT1BTJ1xuICB9KTtcbiAgYGBgXG5cbiAgSW5zdGVhZCBvZiB3cml0aW5nIHRoZSBhYm92ZSwgeW91ciBjb2RlIG5vdyBzaW1wbHkgYmVjb21lcyB0aGUgZm9sbG93aW5nOlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgbGV0IHByb21pc2UgPSBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ1dIT09QUycpKTtcblxuICBwcm9taXNlLnRoZW4oZnVuY3Rpb24odmFsdWUpe1xuICAgIC8vIENvZGUgaGVyZSBkb2Vzbid0IHJ1biBiZWNhdXNlIHRoZSBwcm9taXNlIGlzIHJlamVjdGVkIVxuICB9LCBmdW5jdGlvbihyZWFzb24pe1xuICAgIC8vIHJlYXNvbi5tZXNzYWdlID09PSAnV0hPT1BTJ1xuICB9KTtcbiAgYGBgXG5cbiAgQG1ldGhvZCByZWplY3RcbiAgQHN0YXRpY1xuICBAcGFyYW0ge0FueX0gcmVhc29uIHZhbHVlIHRoYXQgdGhlIHJldHVybmVkIHByb21pc2Ugd2lsbCBiZSByZWplY3RlZCB3aXRoLlxuICBVc2VmdWwgZm9yIHRvb2xpbmcuXG4gIEByZXR1cm4ge1Byb21pc2V9IGEgcHJvbWlzZSByZWplY3RlZCB3aXRoIHRoZSBnaXZlbiBgcmVhc29uYC5cbiovXG5mdW5jdGlvbiByZWplY3QocmVhc29uKSB7XG4gIC8qanNoaW50IHZhbGlkdGhpczp0cnVlICovXG4gIHZhciBDb25zdHJ1Y3RvciA9IHRoaXM7XG4gIHZhciBwcm9taXNlID0gbmV3IENvbnN0cnVjdG9yKG5vb3ApO1xuICBfcmVqZWN0KHByb21pc2UsIHJlYXNvbik7XG4gIHJldHVybiBwcm9taXNlO1xufVxuXG5mdW5jdGlvbiBuZWVkc1Jlc29sdmVyKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKCdZb3UgbXVzdCBwYXNzIGEgcmVzb2x2ZXIgZnVuY3Rpb24gYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIHRoZSBwcm9taXNlIGNvbnN0cnVjdG9yJyk7XG59XG5cbmZ1bmN0aW9uIG5lZWRzTmV3KCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRmFpbGVkIHRvIGNvbnN0cnVjdCAnUHJvbWlzZSc6IFBsZWFzZSB1c2UgdGhlICduZXcnIG9wZXJhdG9yLCB0aGlzIG9iamVjdCBjb25zdHJ1Y3RvciBjYW5ub3QgYmUgY2FsbGVkIGFzIGEgZnVuY3Rpb24uXCIpO1xufVxuXG4vKipcbiAgUHJvbWlzZSBvYmplY3RzIHJlcHJlc2VudCB0aGUgZXZlbnR1YWwgcmVzdWx0IG9mIGFuIGFzeW5jaHJvbm91cyBvcGVyYXRpb24uIFRoZVxuICBwcmltYXJ5IHdheSBvZiBpbnRlcmFjdGluZyB3aXRoIGEgcHJvbWlzZSBpcyB0aHJvdWdoIGl0cyBgdGhlbmAgbWV0aG9kLCB3aGljaFxuICByZWdpc3RlcnMgY2FsbGJhY2tzIHRvIHJlY2VpdmUgZWl0aGVyIGEgcHJvbWlzZSdzIGV2ZW50dWFsIHZhbHVlIG9yIHRoZSByZWFzb25cbiAgd2h5IHRoZSBwcm9taXNlIGNhbm5vdCBiZSBmdWxmaWxsZWQuXG5cbiAgVGVybWlub2xvZ3lcbiAgLS0tLS0tLS0tLS1cblxuICAtIGBwcm9taXNlYCBpcyBhbiBvYmplY3Qgb3IgZnVuY3Rpb24gd2l0aCBhIGB0aGVuYCBtZXRob2Qgd2hvc2UgYmVoYXZpb3IgY29uZm9ybXMgdG8gdGhpcyBzcGVjaWZpY2F0aW9uLlxuICAtIGB0aGVuYWJsZWAgaXMgYW4gb2JqZWN0IG9yIGZ1bmN0aW9uIHRoYXQgZGVmaW5lcyBhIGB0aGVuYCBtZXRob2QuXG4gIC0gYHZhbHVlYCBpcyBhbnkgbGVnYWwgSmF2YVNjcmlwdCB2YWx1ZSAoaW5jbHVkaW5nIHVuZGVmaW5lZCwgYSB0aGVuYWJsZSwgb3IgYSBwcm9taXNlKS5cbiAgLSBgZXhjZXB0aW9uYCBpcyBhIHZhbHVlIHRoYXQgaXMgdGhyb3duIHVzaW5nIHRoZSB0aHJvdyBzdGF0ZW1lbnQuXG4gIC0gYHJlYXNvbmAgaXMgYSB2YWx1ZSB0aGF0IGluZGljYXRlcyB3aHkgYSBwcm9taXNlIHdhcyByZWplY3RlZC5cbiAgLSBgc2V0dGxlZGAgdGhlIGZpbmFsIHJlc3Rpbmcgc3RhdGUgb2YgYSBwcm9taXNlLCBmdWxmaWxsZWQgb3IgcmVqZWN0ZWQuXG5cbiAgQSBwcm9taXNlIGNhbiBiZSBpbiBvbmUgb2YgdGhyZWUgc3RhdGVzOiBwZW5kaW5nLCBmdWxmaWxsZWQsIG9yIHJlamVjdGVkLlxuXG4gIFByb21pc2VzIHRoYXQgYXJlIGZ1bGZpbGxlZCBoYXZlIGEgZnVsZmlsbG1lbnQgdmFsdWUgYW5kIGFyZSBpbiB0aGUgZnVsZmlsbGVkXG4gIHN0YXRlLiAgUHJvbWlzZXMgdGhhdCBhcmUgcmVqZWN0ZWQgaGF2ZSBhIHJlamVjdGlvbiByZWFzb24gYW5kIGFyZSBpbiB0aGVcbiAgcmVqZWN0ZWQgc3RhdGUuICBBIGZ1bGZpbGxtZW50IHZhbHVlIGlzIG5ldmVyIGEgdGhlbmFibGUuXG5cbiAgUHJvbWlzZXMgY2FuIGFsc28gYmUgc2FpZCB0byAqcmVzb2x2ZSogYSB2YWx1ZS4gIElmIHRoaXMgdmFsdWUgaXMgYWxzbyBhXG4gIHByb21pc2UsIHRoZW4gdGhlIG9yaWdpbmFsIHByb21pc2UncyBzZXR0bGVkIHN0YXRlIHdpbGwgbWF0Y2ggdGhlIHZhbHVlJ3NcbiAgc2V0dGxlZCBzdGF0ZS4gIFNvIGEgcHJvbWlzZSB0aGF0ICpyZXNvbHZlcyogYSBwcm9taXNlIHRoYXQgcmVqZWN0cyB3aWxsXG4gIGl0c2VsZiByZWplY3QsIGFuZCBhIHByb21pc2UgdGhhdCAqcmVzb2x2ZXMqIGEgcHJvbWlzZSB0aGF0IGZ1bGZpbGxzIHdpbGxcbiAgaXRzZWxmIGZ1bGZpbGwuXG5cblxuICBCYXNpYyBVc2FnZTpcbiAgLS0tLS0tLS0tLS0tXG5cbiAgYGBganNcbiAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAvLyBvbiBzdWNjZXNzXG4gICAgcmVzb2x2ZSh2YWx1ZSk7XG5cbiAgICAvLyBvbiBmYWlsdXJlXG4gICAgcmVqZWN0KHJlYXNvbik7XG4gIH0pO1xuXG4gIHByb21pc2UudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgIC8vIG9uIGZ1bGZpbGxtZW50XG4gIH0sIGZ1bmN0aW9uKHJlYXNvbikge1xuICAgIC8vIG9uIHJlamVjdGlvblxuICB9KTtcbiAgYGBgXG5cbiAgQWR2YW5jZWQgVXNhZ2U6XG4gIC0tLS0tLS0tLS0tLS0tLVxuXG4gIFByb21pc2VzIHNoaW5lIHdoZW4gYWJzdHJhY3RpbmcgYXdheSBhc3luY2hyb25vdXMgaW50ZXJhY3Rpb25zIHN1Y2ggYXNcbiAgYFhNTEh0dHBSZXF1ZXN0YHMuXG5cbiAgYGBganNcbiAgZnVuY3Rpb24gZ2V0SlNPTih1cmwpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgeGhyLm9wZW4oJ0dFVCcsIHVybCk7XG4gICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gaGFuZGxlcjtcbiAgICAgIHhoci5yZXNwb25zZVR5cGUgPSAnanNvbic7XG4gICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICAgIHhoci5zZW5kKCk7XG5cbiAgICAgIGZ1bmN0aW9uIGhhbmRsZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IHRoaXMuRE9ORSkge1xuICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICByZXNvbHZlKHRoaXMucmVzcG9uc2UpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdnZXRKU09OOiBgJyArIHVybCArICdgIGZhaWxlZCB3aXRoIHN0YXR1czogWycgKyB0aGlzLnN0YXR1cyArICddJykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldEpTT04oJy9wb3N0cy5qc29uJykudGhlbihmdW5jdGlvbihqc29uKSB7XG4gICAgLy8gb24gZnVsZmlsbG1lbnRcbiAgfSwgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgLy8gb24gcmVqZWN0aW9uXG4gIH0pO1xuICBgYGBcblxuICBVbmxpa2UgY2FsbGJhY2tzLCBwcm9taXNlcyBhcmUgZ3JlYXQgY29tcG9zYWJsZSBwcmltaXRpdmVzLlxuXG4gIGBgYGpzXG4gIFByb21pc2UuYWxsKFtcbiAgICBnZXRKU09OKCcvcG9zdHMnKSxcbiAgICBnZXRKU09OKCcvY29tbWVudHMnKVxuICBdKS50aGVuKGZ1bmN0aW9uKHZhbHVlcyl7XG4gICAgdmFsdWVzWzBdIC8vID0+IHBvc3RzSlNPTlxuICAgIHZhbHVlc1sxXSAvLyA9PiBjb21tZW50c0pTT05cblxuICAgIHJldHVybiB2YWx1ZXM7XG4gIH0pO1xuICBgYGBcblxuICBAY2xhc3MgUHJvbWlzZVxuICBAcGFyYW0ge2Z1bmN0aW9ufSByZXNvbHZlclxuICBVc2VmdWwgZm9yIHRvb2xpbmcuXG4gIEBjb25zdHJ1Y3RvclxuKi9cbmZ1bmN0aW9uIFByb21pc2UocmVzb2x2ZXIpIHtcbiAgdGhpc1tQUk9NSVNFX0lEXSA9IG5leHRJZCgpO1xuICB0aGlzLl9yZXN1bHQgPSB0aGlzLl9zdGF0ZSA9IHVuZGVmaW5lZDtcbiAgdGhpcy5fc3Vic2NyaWJlcnMgPSBbXTtcblxuICBpZiAobm9vcCAhPT0gcmVzb2x2ZXIpIHtcbiAgICB0eXBlb2YgcmVzb2x2ZXIgIT09ICdmdW5jdGlvbicgJiYgbmVlZHNSZXNvbHZlcigpO1xuICAgIHRoaXMgaW5zdGFuY2VvZiBQcm9taXNlID8gaW5pdGlhbGl6ZVByb21pc2UodGhpcywgcmVzb2x2ZXIpIDogbmVlZHNOZXcoKTtcbiAgfVxufVxuXG5Qcm9taXNlLmFsbCA9IGFsbDtcblByb21pc2UucmFjZSA9IHJhY2U7XG5Qcm9taXNlLnJlc29sdmUgPSByZXNvbHZlO1xuUHJvbWlzZS5yZWplY3QgPSByZWplY3Q7XG5Qcm9taXNlLl9zZXRTY2hlZHVsZXIgPSBzZXRTY2hlZHVsZXI7XG5Qcm9taXNlLl9zZXRBc2FwID0gc2V0QXNhcDtcblByb21pc2UuX2FzYXAgPSBhc2FwO1xuXG5Qcm9taXNlLnByb3RvdHlwZSA9IHtcbiAgY29uc3RydWN0b3I6IFByb21pc2UsXG5cbiAgLyoqXG4gICAgVGhlIHByaW1hcnkgd2F5IG9mIGludGVyYWN0aW5nIHdpdGggYSBwcm9taXNlIGlzIHRocm91Z2ggaXRzIGB0aGVuYCBtZXRob2QsXG4gICAgd2hpY2ggcmVnaXN0ZXJzIGNhbGxiYWNrcyB0byByZWNlaXZlIGVpdGhlciBhIHByb21pc2UncyBldmVudHVhbCB2YWx1ZSBvciB0aGVcbiAgICByZWFzb24gd2h5IHRoZSBwcm9taXNlIGNhbm5vdCBiZSBmdWxmaWxsZWQuXG4gIFxuICAgIGBgYGpzXG4gICAgZmluZFVzZXIoKS50aGVuKGZ1bmN0aW9uKHVzZXIpe1xuICAgICAgLy8gdXNlciBpcyBhdmFpbGFibGVcbiAgICB9LCBmdW5jdGlvbihyZWFzb24pe1xuICAgICAgLy8gdXNlciBpcyB1bmF2YWlsYWJsZSwgYW5kIHlvdSBhcmUgZ2l2ZW4gdGhlIHJlYXNvbiB3aHlcbiAgICB9KTtcbiAgICBgYGBcbiAgXG4gICAgQ2hhaW5pbmdcbiAgICAtLS0tLS0tLVxuICBcbiAgICBUaGUgcmV0dXJuIHZhbHVlIG9mIGB0aGVuYCBpcyBpdHNlbGYgYSBwcm9taXNlLiAgVGhpcyBzZWNvbmQsICdkb3duc3RyZWFtJ1xuICAgIHByb21pc2UgaXMgcmVzb2x2ZWQgd2l0aCB0aGUgcmV0dXJuIHZhbHVlIG9mIHRoZSBmaXJzdCBwcm9taXNlJ3MgZnVsZmlsbG1lbnRcbiAgICBvciByZWplY3Rpb24gaGFuZGxlciwgb3IgcmVqZWN0ZWQgaWYgdGhlIGhhbmRsZXIgdGhyb3dzIGFuIGV4Y2VwdGlvbi5cbiAgXG4gICAgYGBganNcbiAgICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgIHJldHVybiB1c2VyLm5hbWU7XG4gICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgcmV0dXJuICdkZWZhdWx0IG5hbWUnO1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHVzZXJOYW1lKSB7XG4gICAgICAvLyBJZiBgZmluZFVzZXJgIGZ1bGZpbGxlZCwgYHVzZXJOYW1lYCB3aWxsIGJlIHRoZSB1c2VyJ3MgbmFtZSwgb3RoZXJ3aXNlIGl0XG4gICAgICAvLyB3aWxsIGJlIGAnZGVmYXVsdCBuYW1lJ2BcbiAgICB9KTtcbiAgXG4gICAgZmluZFVzZXIoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZvdW5kIHVzZXIsIGJ1dCBzdGlsbCB1bmhhcHB5Jyk7XG4gICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdgZmluZFVzZXJgIHJlamVjdGVkIGFuZCB3ZSdyZSB1bmhhcHB5Jyk7XG4gICAgfSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIC8vIG5ldmVyIHJlYWNoZWRcbiAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICAvLyBpZiBgZmluZFVzZXJgIGZ1bGZpbGxlZCwgYHJlYXNvbmAgd2lsbCBiZSAnRm91bmQgdXNlciwgYnV0IHN0aWxsIHVuaGFwcHknLlxuICAgICAgLy8gSWYgYGZpbmRVc2VyYCByZWplY3RlZCwgYHJlYXNvbmAgd2lsbCBiZSAnYGZpbmRVc2VyYCByZWplY3RlZCBhbmQgd2UncmUgdW5oYXBweScuXG4gICAgfSk7XG4gICAgYGBgXG4gICAgSWYgdGhlIGRvd25zdHJlYW0gcHJvbWlzZSBkb2VzIG5vdCBzcGVjaWZ5IGEgcmVqZWN0aW9uIGhhbmRsZXIsIHJlamVjdGlvbiByZWFzb25zIHdpbGwgYmUgcHJvcGFnYXRlZCBmdXJ0aGVyIGRvd25zdHJlYW0uXG4gIFxuICAgIGBgYGpzXG4gICAgZmluZFVzZXIoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICB0aHJvdyBuZXcgUGVkYWdvZ2ljYWxFeGNlcHRpb24oJ1Vwc3RyZWFtIGVycm9yJyk7XG4gICAgfSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIC8vIG5ldmVyIHJlYWNoZWRcbiAgICB9KS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgLy8gbmV2ZXIgcmVhY2hlZFxuICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgIC8vIFRoZSBgUGVkZ2Fnb2NpYWxFeGNlcHRpb25gIGlzIHByb3BhZ2F0ZWQgYWxsIHRoZSB3YXkgZG93biB0byBoZXJlXG4gICAgfSk7XG4gICAgYGBgXG4gIFxuICAgIEFzc2ltaWxhdGlvblxuICAgIC0tLS0tLS0tLS0tLVxuICBcbiAgICBTb21ldGltZXMgdGhlIHZhbHVlIHlvdSB3YW50IHRvIHByb3BhZ2F0ZSB0byBhIGRvd25zdHJlYW0gcHJvbWlzZSBjYW4gb25seSBiZVxuICAgIHJldHJpZXZlZCBhc3luY2hyb25vdXNseS4gVGhpcyBjYW4gYmUgYWNoaWV2ZWQgYnkgcmV0dXJuaW5nIGEgcHJvbWlzZSBpbiB0aGVcbiAgICBmdWxmaWxsbWVudCBvciByZWplY3Rpb24gaGFuZGxlci4gVGhlIGRvd25zdHJlYW0gcHJvbWlzZSB3aWxsIHRoZW4gYmUgcGVuZGluZ1xuICAgIHVudGlsIHRoZSByZXR1cm5lZCBwcm9taXNlIGlzIHNldHRsZWQuIFRoaXMgaXMgY2FsbGVkICphc3NpbWlsYXRpb24qLlxuICBcbiAgICBgYGBqc1xuICAgIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgcmV0dXJuIGZpbmRDb21tZW50c0J5QXV0aG9yKHVzZXIpO1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKGNvbW1lbnRzKSB7XG4gICAgICAvLyBUaGUgdXNlcidzIGNvbW1lbnRzIGFyZSBub3cgYXZhaWxhYmxlXG4gICAgfSk7XG4gICAgYGBgXG4gIFxuICAgIElmIHRoZSBhc3NpbWxpYXRlZCBwcm9taXNlIHJlamVjdHMsIHRoZW4gdGhlIGRvd25zdHJlYW0gcHJvbWlzZSB3aWxsIGFsc28gcmVqZWN0LlxuICBcbiAgICBgYGBqc1xuICAgIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgcmV0dXJuIGZpbmRDb21tZW50c0J5QXV0aG9yKHVzZXIpO1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKGNvbW1lbnRzKSB7XG4gICAgICAvLyBJZiBgZmluZENvbW1lbnRzQnlBdXRob3JgIGZ1bGZpbGxzLCB3ZSdsbCBoYXZlIHRoZSB2YWx1ZSBoZXJlXG4gICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgLy8gSWYgYGZpbmRDb21tZW50c0J5QXV0aG9yYCByZWplY3RzLCB3ZSdsbCBoYXZlIHRoZSByZWFzb24gaGVyZVxuICAgIH0pO1xuICAgIGBgYFxuICBcbiAgICBTaW1wbGUgRXhhbXBsZVxuICAgIC0tLS0tLS0tLS0tLS0tXG4gIFxuICAgIFN5bmNocm9ub3VzIEV4YW1wbGVcbiAgXG4gICAgYGBgamF2YXNjcmlwdFxuICAgIGxldCByZXN1bHQ7XG4gIFxuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSBmaW5kUmVzdWx0KCk7XG4gICAgICAvLyBzdWNjZXNzXG4gICAgfSBjYXRjaChyZWFzb24pIHtcbiAgICAgIC8vIGZhaWx1cmVcbiAgICB9XG4gICAgYGBgXG4gIFxuICAgIEVycmJhY2sgRXhhbXBsZVxuICBcbiAgICBgYGBqc1xuICAgIGZpbmRSZXN1bHQoZnVuY3Rpb24ocmVzdWx0LCBlcnIpe1xuICAgICAgaWYgKGVycikge1xuICAgICAgICAvLyBmYWlsdXJlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBzdWNjZXNzXG4gICAgICB9XG4gICAgfSk7XG4gICAgYGBgXG4gIFxuICAgIFByb21pc2UgRXhhbXBsZTtcbiAgXG4gICAgYGBgamF2YXNjcmlwdFxuICAgIGZpbmRSZXN1bHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAvLyBzdWNjZXNzXG4gICAgfSwgZnVuY3Rpb24ocmVhc29uKXtcbiAgICAgIC8vIGZhaWx1cmVcbiAgICB9KTtcbiAgICBgYGBcbiAgXG4gICAgQWR2YW5jZWQgRXhhbXBsZVxuICAgIC0tLS0tLS0tLS0tLS0tXG4gIFxuICAgIFN5bmNocm9ub3VzIEV4YW1wbGVcbiAgXG4gICAgYGBgamF2YXNjcmlwdFxuICAgIGxldCBhdXRob3IsIGJvb2tzO1xuICBcbiAgICB0cnkge1xuICAgICAgYXV0aG9yID0gZmluZEF1dGhvcigpO1xuICAgICAgYm9va3MgID0gZmluZEJvb2tzQnlBdXRob3IoYXV0aG9yKTtcbiAgICAgIC8vIHN1Y2Nlc3NcbiAgICB9IGNhdGNoKHJlYXNvbikge1xuICAgICAgLy8gZmFpbHVyZVxuICAgIH1cbiAgICBgYGBcbiAgXG4gICAgRXJyYmFjayBFeGFtcGxlXG4gIFxuICAgIGBgYGpzXG4gIFxuICAgIGZ1bmN0aW9uIGZvdW5kQm9va3MoYm9va3MpIHtcbiAgXG4gICAgfVxuICBcbiAgICBmdW5jdGlvbiBmYWlsdXJlKHJlYXNvbikge1xuICBcbiAgICB9XG4gIFxuICAgIGZpbmRBdXRob3IoZnVuY3Rpb24oYXV0aG9yLCBlcnIpe1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBmYWlsdXJlKGVycik7XG4gICAgICAgIC8vIGZhaWx1cmVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZmluZEJvb29rc0J5QXV0aG9yKGF1dGhvciwgZnVuY3Rpb24oYm9va3MsIGVycikge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICBmYWlsdXJlKGVycik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGZvdW5kQm9va3MoYm9va3MpO1xuICAgICAgICAgICAgICB9IGNhdGNoKHJlYXNvbikge1xuICAgICAgICAgICAgICAgIGZhaWx1cmUocmVhc29uKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoKGVycm9yKSB7XG4gICAgICAgICAgZmFpbHVyZShlcnIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHN1Y2Nlc3NcbiAgICAgIH1cbiAgICB9KTtcbiAgICBgYGBcbiAgXG4gICAgUHJvbWlzZSBFeGFtcGxlO1xuICBcbiAgICBgYGBqYXZhc2NyaXB0XG4gICAgZmluZEF1dGhvcigpLlxuICAgICAgdGhlbihmaW5kQm9va3NCeUF1dGhvcikuXG4gICAgICB0aGVuKGZ1bmN0aW9uKGJvb2tzKXtcbiAgICAgICAgLy8gZm91bmQgYm9va3NcbiAgICB9KS5jYXRjaChmdW5jdGlvbihyZWFzb24pe1xuICAgICAgLy8gc29tZXRoaW5nIHdlbnQgd3JvbmdcbiAgICB9KTtcbiAgICBgYGBcbiAgXG4gICAgQG1ldGhvZCB0aGVuXG4gICAgQHBhcmFtIHtGdW5jdGlvbn0gb25GdWxmaWxsZWRcbiAgICBAcGFyYW0ge0Z1bmN0aW9ufSBvblJlamVjdGVkXG4gICAgVXNlZnVsIGZvciB0b29saW5nLlxuICAgIEByZXR1cm4ge1Byb21pc2V9XG4gICovXG4gIHRoZW46IHRoZW4sXG5cbiAgLyoqXG4gICAgYGNhdGNoYCBpcyBzaW1wbHkgc3VnYXIgZm9yIGB0aGVuKHVuZGVmaW5lZCwgb25SZWplY3Rpb24pYCB3aGljaCBtYWtlcyBpdCB0aGUgc2FtZVxuICAgIGFzIHRoZSBjYXRjaCBibG9jayBvZiBhIHRyeS9jYXRjaCBzdGF0ZW1lbnQuXG4gIFxuICAgIGBgYGpzXG4gICAgZnVuY3Rpb24gZmluZEF1dGhvcigpe1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZG4ndCBmaW5kIHRoYXQgYXV0aG9yJyk7XG4gICAgfVxuICBcbiAgICAvLyBzeW5jaHJvbm91c1xuICAgIHRyeSB7XG4gICAgICBmaW5kQXV0aG9yKCk7XG4gICAgfSBjYXRjaChyZWFzb24pIHtcbiAgICAgIC8vIHNvbWV0aGluZyB3ZW50IHdyb25nXG4gICAgfVxuICBcbiAgICAvLyBhc3luYyB3aXRoIHByb21pc2VzXG4gICAgZmluZEF1dGhvcigpLmNhdGNoKGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgICAvLyBzb21ldGhpbmcgd2VudCB3cm9uZ1xuICAgIH0pO1xuICAgIGBgYFxuICBcbiAgICBAbWV0aG9kIGNhdGNoXG4gICAgQHBhcmFtIHtGdW5jdGlvbn0gb25SZWplY3Rpb25cbiAgICBVc2VmdWwgZm9yIHRvb2xpbmcuXG4gICAgQHJldHVybiB7UHJvbWlzZX1cbiAgKi9cbiAgJ2NhdGNoJzogZnVuY3Rpb24gX2NhdGNoKG9uUmVqZWN0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMudGhlbihudWxsLCBvblJlamVjdGlvbik7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIHBvbHlmaWxsKCkge1xuICAgIHZhciBsb2NhbCA9IHVuZGVmaW5lZDtcblxuICAgIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBsb2NhbCA9IGdsb2JhbDtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBsb2NhbCA9IHNlbGY7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxvY2FsID0gRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdwb2x5ZmlsbCBmYWlsZWQgYmVjYXVzZSBnbG9iYWwgb2JqZWN0IGlzIHVuYXZhaWxhYmxlIGluIHRoaXMgZW52aXJvbm1lbnQnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBQID0gbG9jYWwuUHJvbWlzZTtcblxuICAgIGlmIChQKSB7XG4gICAgICAgIHZhciBwcm9taXNlVG9TdHJpbmcgPSBudWxsO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcHJvbWlzZVRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKFAucmVzb2x2ZSgpKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgLy8gc2lsZW50bHkgaWdub3JlZFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb21pc2VUb1N0cmluZyA9PT0gJ1tvYmplY3QgUHJvbWlzZV0nICYmICFQLmNhc3QpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxvY2FsLlByb21pc2UgPSBQcm9taXNlO1xufVxuXG4vLyBTdHJhbmdlIGNvbXBhdC4uXG5Qcm9taXNlLnBvbHlmaWxsID0gcG9seWZpbGw7XG5Qcm9taXNlLlByb21pc2UgPSBQcm9taXNlO1xuXG5yZXR1cm4gUHJvbWlzZTtcblxufSkpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWVzNi1wcm9taXNlLm1hcCIsImltcG9ydCBFbGVtZW50IGZyb20gXCIuL2VsZW1lbnRcIjtcclxuaW1wb3J0IFNpemUgZnJvbSBcIi4vLi4vb2JqZWN0cy9zaXplXCI7XHJcbmltcG9ydCBQcm9taXNlIGZyb20gXCJlczYtcHJvbWlzZVwiO1xyXG5cclxuLyoqXHJcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhbiBJbWFnZSBlbGVtZW50XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbWFnZSBleHRlbmRzIEVsZW1lbnQge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYW4gZWxlbWVudFxyXG4gICAgICpcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoXCJpbWdcIik7XHJcbiAgICAgICAgdGhpcy5fc2NhbGUgPSB0aGlzLl9vcmlnaW5TY2FsZSA9IDE7XHJcbiAgICAgICAgdGhpcy5fem9vbSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkIGFuIGltYWdlIGJ5IFVSTCBhbmQgc2V0ICdzcmMnIGF0dHJpYnV0ZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIC0gVGhlIHVybCBvciBwYXRoIHRvIGltYWdlXHJcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSBBIHByb21pc2UgdGhhdCByZXR1cm5zIHtAbGluayBsb2FkfnJlc29sdmV9IGlmIHJlc29sdmVkIGFuZCB7QGxpbmsgbG9hZH5yZWplY3R9IGlmIHJlamVjdGVkLlxyXG4gICAgICovXHJcbiAgICBsb2FkKHVybCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Tm9kZSgpLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NoZWNrRm9ybWF0KCk7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLmdldE5vZGUoKS5vbmVycm9yID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KEVycm9yKFwiQ2FuJ3QgbG9hZCBhbiBpbWFnZS5cIikpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLmdldE5vZGUoKS5zcmMgPSB1cmw7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Tm9kZSgpLmNyb3NzT3JpZ2luID0gXCJBbm9ueW1vdXNcIjtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1ldGhvZCwgd2hpY2ggY2hlY2sgaW1hZ2UgZm9ybWF0IGlzIHBvcnRyYWl0LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBwb3J0cmFpdC5cclxuICAgICAqL1xyXG4gICAgaXNQb3J0cmFpdCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2hlY2tGb3JtYXQoKSA9PT0gXCJwb3J0cmFpdFwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWV0aG9kLCB3aGljaCBjaGVjayBpbWFnZSBmb3JtYXQgaXMgbGFuZHNjYXBlLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBsYW5kc2NhcGUuXHJcbiAgICAgKi9cclxuICAgIGlzTGFuZHNjYXBlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jaGVja0Zvcm1hdCgpID09PSBcImxhbmRzY2FwZVwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWV0aG9kLCB3aGljaCBjaGVjayBpbWFnZSBmb3JtYXQgaXMgc3F1YXJlLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBzcXVhcmUuXHJcbiAgICAgKi9cclxuICAgIGlzU3F1YXJlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jaGVja0Zvcm1hdCgpID09PSBcInNxdWFyZVwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2NhbGUgaW1hZ2UgdG8gZml0IEZyYW1lLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7RnJhbWV9IGZyYW1lIC0gQSBGcmFtZSBvYmplY3QuXHJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IC0gU2NhbGUgdmFsdWUuXHJcbiAgICAgKi9cclxuICAgIHNjYWxlVG9GaXQoZnJhbWUpIHtcclxuICAgICAgICBjb25zdCB3aWR0aFNjYWxlID0gZnJhbWUuZ2V0UmVjdCgpLnNpemUud2lkdGggLyB0aGlzLmdldE5vZGUoKS53aWR0aDtcclxuICAgICAgICBjb25zdCBoZWlnaHRTY2FsZSA9IGZyYW1lLmdldFJlY3QoKS5zaXplLmhlaWdodCAvIHRoaXMuZ2V0Tm9kZSgpLmhlaWdodDtcclxuICAgICAgICBjb25zdCBsYXJnZXN0U2NhbGUgPSAod2lkdGhTY2FsZSA+IGhlaWdodFNjYWxlKSA/IHdpZHRoU2NhbGUgOiBoZWlnaHRTY2FsZTtcclxuICAgICAgICB0aGlzLl9zY2FsZSA9IHRoaXMuX29yaWdpblNjYWxlID0gbGFyZ2VzdFNjYWxlO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zY2FsZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBhY3R1YWwgc2l6ZSBvZiBpbWFnZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge1NpemV9IC0gUmV0dXJucyBTaXplIG9iamVjdCwgd2hpY2ggY29udGFpbiB3ZWlnaHQgYW5kIGhlaWdodFxyXG4gICAgICovXHJcbiAgICBnZXRTaXplKCkge1xyXG4gICAgICAgIGNvbnN0IHcgPSB0aGlzLmdldE5vZGUoKS53aWR0aCAqIHRoaXMuX3NjYWxlO1xyXG4gICAgICAgIGNvbnN0IGggPSB0aGlzLmdldE5vZGUoKS5oZWlnaHQgKiB0aGlzLl9zY2FsZTtcclxuICAgICAgICByZXR1cm4gbmV3IFNpemUodywgaCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBab29tIGFuIGltYWdlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHpvb20gLSBab29tIHZhbHVlLCBmcm9tIDAgdG8gMS4wXHJcbiAgICAgKiBAcmV0dXJuIHtJbWFnZX0gLSBBbiBJbWFnZSBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIHNldFpvb20oem9vbSkge1xyXG4gICAgICAgIHRoaXMuX3pvb20gPSB6b29tO1xyXG4gICAgICAgIHRoaXMuX3NjYWxlID0gdGhpcy5fb3JpZ2luU2NhbGUgKyAodGhpcy5fb3JpZ2luU2NhbGUgKiB6b29tKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBhY3R1YWwgem9vbSB2YWx1ZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge051bWJlcn0gLSBab29tIHZhbHVlLlxyXG4gICAgICovXHJcbiAgICBnZXRab29tKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl96b29tO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGFjdHVhbCBzY2FsZSB2YWx1ZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9IC0gQW4gYWN0dWFsIHNjYWxlIHZhbHVlLlxyXG4gICAgICovXHJcbiAgICBnZXRTY2FsZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2NhbGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgb3JpZ2luIHNjYWxlIHZhbHVlICh3aXRob3V0IHpvb20pXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge051bWJlcn0gLSBBbiBvcmlnaW4gc2NhbGUgdmFsdWUuXHJcbiAgICAgKi9cclxuICAgIGdldE9yaWdpblNjYWxlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9vcmlnaW5TY2FsZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1ldGhvZCwgd2hpY2ggY2hlY2sgYW4gaW1hZ2UgZm9ybWF0IChsYW5kc2NhcGUgb3IgcG9ydHJhaXQpIGFuZCBzYXZlIGl0LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge1N0cmluZ30gRm9ybWF0LlxyXG4gICAgICovXHJcbiAgICBfY2hlY2tGb3JtYXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0Tm9kZSgpLndpZHRoID4gdGhpcy5nZXROb2RlKCkuaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcImxhbmRzY2FwZVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5nZXROb2RlKCkud2lkdGggPCB0aGlzLmdldE5vZGUoKS5oZWlnaHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwicG9ydHJhaXRcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwic3F1YXJlXCI7XHJcbiAgICB9XHJcbn0iLCIvKipcclxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGEgZHJhd2luZyBjb250ZXh0IG9uIHRoZSBjYW52YXNcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRleHQge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYSBjb250ZXh0XHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcclxuICAgICAgICB0aGlzLl9jb250ZXh0ID0gY29udGV4dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXdzIGEgZmlsbGVkIHJlY3RhbmdsZSBhdCAoeCwgeSkgcG9zaXRpb24gd2hvc2Ugc2l6ZSBpcyBkZXRlcm1pbmVkIGJ5IHdpZHRoIGFuZCBoZWlnaHQgYW5kIHdob3NlIHN0eWxlXHJcbiAgICAgKiBpcyBkZXRlcm1pbmVkIGJ5IHRoZSBmaWxsU3R5bGUgYXR0cmlidXRlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB4IC0gVGhlIHggYXhpcyBvZiB0aGUgY29vcmRpbmF0ZSBmb3IgdGhlIHJlY3RhbmdsZSBzdGFydGluZyBwb2ludC5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB5IC0gVGhlIHkgYXhpcyBvZiB0aGUgY29vcmRpbmF0ZSBmb3IgdGhlIHJlY3RhbmdsZSBzdGFydGluZyBwb2ludC5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB3aWR0aCAtIFRoZSByZWN0YW5nbGUncyB3aWR0aC5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBoZWlnaHQgLSBUaGUgcmVjdGFuZ2xlJ3MgaGVpZ2h0LlxyXG4gICAgICovXHJcbiAgICBmaWxsUmVjdCh4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuZmlsbFJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIGEgcHJvcGVydHkgb2YgdGhlIENhbnZhcyAyRCBBUEksIHdoaWNoIHNwZWNpZmllcyB0aGUgY29sb3Igb3Igc3R5bGUgdG8gdXNlIGluc2lkZSBzaGFwZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBzdHlsZSAtIEEgQ1NTIDxjb2xvcj4gdmFsdWUsIENhbnZhcyBncmFkaWVudCBvciBDYW52YXMgcGF0dGVyblxyXG4gICAgICovXHJcbiAgICBmaWxsU3R5bGUoc3R5bGUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dC5maWxsU3R5bGUgPSBzdHlsZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBwYXR0ZXJuIHVzaW5nIHRoZSBzcGVjaWZpZWQgaW1hZ2UgKGEgQ2FudmFzSW1hZ2VTb3VyY2UpLlxyXG4gICAgICogSXQgcmVwZWF0cyB0aGUgc291cmNlIGluIHRoZSBkaXJlY3Rpb25zIHNwZWNpZmllZCBieSB0aGUgcmVwZXRpdGlvbiBhcmd1bWVudC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0NhbnZhc0ltYWdlU291cmNlfSBpbWFnZSAtIEEgQ2FudmFzSW1hZ2VTb3VyY2UgdG8gYmUgdXNlZCBhcyBpbWFnZSB0byByZXBlYXQuXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcmVwZXRpdGlvbiAtIEEgRE9NU3RyaW5nIGluZGljYXRpbmcgaG93IHRvIHJlcGVhdCB0aGUgaW1hZ2UuXHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZVBhdHRlcm4oaW1hZ2UsIHJlcGV0aXRpb24pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dC5jcmVhdGVQYXR0ZXJuKGltYWdlLCByZXBldGl0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBwYXRoIGZvciBhIHJlY3RhbmdsZSBhdCBwb3NpdGlvbiAoeCwgeSkgd2l0aCBhIHNpemUgdGhhdCBpcyBkZXRlcm1pbmVkIGJ5IHdpZHRoIGFuZCBoZWlnaHQuXHJcbiAgICAgKiBUaG9zZSBmb3VyIHBvaW50cyBhcmUgY29ubmVjdGVkIGJ5IHN0cmFpZ2h0IGxpbmVzIGFuZCB0aGUgc3ViLXBhdGggaXMgbWFya2VkIGFzIGNsb3NlZCxcclxuICAgICAqIHNvIHRoYXQgeW91IGNhbiBmaWxsIG9yIHN0cm9rZSB0aGlzIHJlY3RhbmdsZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0geCAtIFRoZSB4IGF4aXMgb2YgdGhlIGNvb3JkaW5hdGUgZm9yIHRoZSByZWN0YW5nbGUgc3RhcnRpbmcgcG9pbnQuXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0geSAtIFRoZSB5IGF4aXMgb2YgdGhlIGNvb3JkaW5hdGUgZm9yIHRoZSByZWN0YW5nbGUgc3RhcnRpbmcgcG9pbnQuXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gd2lkdGggLSBUaGUgcmVjdGFuZ2xlJ3Mgd2lkdGguXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaGVpZ2h0IC0gVGhlIHJlY3RhbmdsZSdzIGhlaWdodC5cclxuICAgICAqL1xyXG4gICAgcmVjdCh4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHQucmVjdCh4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpbGxzIHRoZSBjdXJyZW50IG9yIGdpdmVuIHBhdGggd2l0aCB0aGUgY3VycmVudCBmaWxsIHN0eWxlIHVzaW5nIHRoZSBub24temVybyBvciBldmVuLW9kZCB3aW5kaW5nIHJ1bGUuXHJcbiAgICAgKi9cclxuICAgIGZpbGwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuZmlsbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RhcnRzIGEgbmV3IHBhdGggYnkgZW1wdHlpbmcgdGhlIGxpc3Qgb2Ygc3ViLXBhdGhzLiBDYWxsIHRoaXMgbWV0aG9kIHdoZW4geW91IHdhbnQgdG8gY3JlYXRlIGEgbmV3IHBhdGguXHJcbiAgICAgKi9cclxuICAgIGJlZ2luUGF0aCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dC5iZWdpblBhdGgoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1vdmVzIHRoZSBzdGFydGluZyBwb2ludCBvZiBhIG5ldyBzdWItcGF0aCB0byB0aGUgKHgsIHkpIGNvb3JkaW5hdGVzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB4IC1UaGUgeCBheGlzIG9mIHRoZSBwb2ludC5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB5IC1UaGUgeSBheGlzIG9mIHRoZSBwb2ludC5cclxuICAgICAqL1xyXG4gICAgbW92ZVRvKHgsIHkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dC5tb3ZlVG8oeCwgeSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25uZWN0cyB0aGUgbGFzdCBwb2ludCBpbiB0aGUgc3ViLXBhdGggdG8gdGhlIHgsIHkgY29vcmRpbmF0ZXMgd2l0aCBhIHN0cmFpZ2h0IGxpbmVcclxuICAgICAqIChidXQgZG9lcyBub3QgYWN0dWFsbHkgZHJhdyBpdCkuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHggLSBUaGUgeCBheGlzIG9mIHRoZSBjb29yZGluYXRlIGZvciB0aGUgZW5kIG9mIHRoZSBsaW5lLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHkgLSBUaGUgeSBheGlzIG9mIHRoZSBjb29yZGluYXRlIGZvciB0aGUgZW5kIG9mIHRoZSBsaW5lLlxyXG4gICAgICovXHJcbiAgICBsaW5lVG8oeCwgeSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmxpbmVUbyh4LCB5KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhdXNlcyB0aGUgcG9pbnQgb2YgdGhlIHBlbiB0byBtb3ZlIGJhY2sgdG8gdGhlIHN0YXJ0IG9mIHRoZSBjdXJyZW50IHN1Yi1wYXRoLlxyXG4gICAgICogSXQgdHJpZXMgdG8gYWRkIGEgc3RyYWlnaHQgbGluZSAoYnV0IGRvZXMgbm90IGFjdHVhbGx5IGRyYXcgaXQpIGZyb20gdGhlIGN1cnJlbnQgcG9pbnQgdG8gdGhlIHN0YXJ0LlxyXG4gICAgICogSWYgdGhlIHNoYXBlIGhhcyBhbHJlYWR5IGJlZW4gY2xvc2VkIG9yIGhhcyBvbmx5IG9uZSBwb2ludCwgdGhpcyBmdW5jdGlvbiBkb2VzIG5vdGhpbmcuXHJcbiAgICAgKi9cclxuICAgIGNsb3NlUGF0aCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dC5jbG9zZVBhdGgoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgYWxsIHBpeGVscyBpbiB0aGUgcmVjdGFuZ2xlIGRlZmluZWQgYnkgc3RhcnRpbmcgcG9pbnQgKHgsIHkpIGFuZCBzaXplICh3aWR0aCwgaGVpZ2h0KSB0byB0cmFuc3BhcmVudCBibGFjayxcclxuICAgICAqIGVyYXNpbmcgYW55IHByZXZpb3VzbHkgZHJhd24gY29udGVudC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0geCAtIFRoZSB4IGF4aXMgb2YgdGhlIGNvb3JkaW5hdGUgZm9yIHRoZSByZWN0YW5nbGUgc3RhcnRpbmcgcG9pbnQuXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0geSAtIFRoZSB5IGF4aXMgb2YgdGhlIGNvb3JkaW5hdGUgZm9yIHRoZSByZWN0YW5nbGUgc3RhcnRpbmcgcG9pbnQuXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gd2lkdGggLSBUaGUgcmVjdGFuZ2xlJ3Mgd2lkdGguXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaGVpZ2h0IC0gVGhlIHJlY3RhbmdsZSdzIGhlaWdodC5cclxuICAgICAqL1xyXG4gICAgY2xlYXJSZWN0KHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dC5jbGVhclJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcm92aWRlcyBkaWZmZXJlbnQgd2F5cyB0byBkcmF3IGFuIGltYWdlIG9udG8gdGhlIGNhbnZhcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW1hZ2UgLSBBbiBlbGVtZW50IHRvIGRyYXcgaW50byB0aGUgY29udGV4dC5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzeCAtIFRoZSBYIGNvb3JkaW5hdGUgb2YgdGhlIHRvcCBsZWZ0IGNvcm5lciBvZiB0aGUgc3ViLXJlY3RhbmdsZSBvZiB0aGUgc291cmNlIGltYWdlIHRvIGRyYXdcclxuICAgICAqIGludG8gdGhlIGRlc3RpbmF0aW9uIGNvbnRleHQuXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc3kgLSBUaGUgWSBjb29yZGluYXRlIG9mIHRoZSB0b3AgbGVmdCBjb3JuZXIgb2YgdGhlIHN1Yi1yZWN0YW5nbGUgb2YgdGhlIHNvdXJjZSBpbWFnZSB0byBkcmF3XHJcbiAgICAgKiBpbnRvIHRoZSBkZXN0aW5hdGlvbiBjb250ZXh0LlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHNXaWR0aCAtIFRoZSB3aWR0aCBvZiB0aGUgc3ViLXJlY3RhbmdsZSBvZiB0aGUgc291cmNlIGltYWdlIHRvIGRyYXcgaW50byB0aGUgZGVzdGluYXRpb24gY29udGV4dC5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzSGVpZ2h0IC0gVGhlIGhlaWdodCBvZiB0aGUgc3ViLXJlY3RhbmdsZSBvZiB0aGUgc291cmNlIGltYWdlIHRvIGRyYXcgaW50byB0aGUgZGVzdGluYXRpb24gY29udGV4dC5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkeCAtIFRoZSBYIGNvb3JkaW5hdGUgaW4gdGhlIGRlc3RpbmF0aW9uIGNhbnZhcyBhdCB3aGljaCB0byBwbGFjZSB0aGUgdG9wLWxlZnQgY29ybmVyXHJcbiAgICAgKiBvZiB0aGUgc291cmNlIGltYWdlLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGR5IC0gVGhlIFkgY29vcmRpbmF0ZSBpbiB0aGUgZGVzdGluYXRpb24gY2FudmFzIGF0IHdoaWNoIHRvIHBsYWNlIHRoZSB0b3AtbGVmdCBjb3JuZXJcclxuICAgICAqIG9mIHRoZSBzb3VyY2UgaW1hZ2UuXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZFdpZHRoIC0gVGhlIHdpZHRoIHRvIGRyYXcgdGhlIGltYWdlIGluIHRoZSBkZXN0aW5hdGlvbiBjYW52YXMuXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZEhlaWdodCAtIFRoZSBoZWlnaHQgdG8gZHJhdyB0aGUgaW1hZ2UgaW4gdGhlIGRlc3RpbmF0aW9uIGNhbnZhcy5cclxuICAgICAqL1xyXG4gICAgZHJhd0ltYWdlKC4uLmFyZ3MpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dC5kcmF3SW1hZ2UuYXBwbHkodGhpcy5fY29udGV4dCwgYXJncyk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEVsZW1lbnQgZnJvbSBcIi4vZWxlbWVudFwiO1xyXG5pbXBvcnQge3N0eWxlc30gZnJvbSBcIi4vLi4vY29uZmlnL2RlZmF1bHRcIjtcclxuaW1wb3J0IENvbnRleHQgZnJvbSBcIi4vLi4vb2JqZWN0cy9jb250ZXh0XCI7XHJcblxyXG4vKipcclxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGEgUGF0dGVybiBlbGVtZW50XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXR0ZXJuIGV4dGVuZHMgRWxlbWVudCB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIHBhdHRlcm4sIHNldCBzaXplXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFwiY2FudmFzXCIpO1xyXG4gICAgICAgIHRoaXMuX2NvbnRleHQgPSBuZXcgQ29udGV4dCh0aGlzLl9ub2RlLmdldENvbnRleHQoXCIyZFwiKSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0V2lkdGgoc3R5bGVzLnBhdHRlcm4uc2l6ZSk7XHJcbiAgICAgICAgdGhpcy5zZXRIZWlnaHQoc3R5bGVzLnBhdHRlcm4uc2l6ZSk7XHJcblxyXG4gICAgICAgIHRoaXMuX2RyYXcoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXcgcGF0dGVybiBvbiBjYW52YXNcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtQYXR0ZXJufSBBIFBhdHRlcm4gb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBfZHJhdygpIHtcclxuICAgICAgICB0aGlzLl9jb250ZXh0LmZpbGxTdHlsZShzdHlsZXMucGF0dGVybi5maWxsMSk7XHJcbiAgICAgICAgdGhpcy5fY29udGV4dC5maWxsUmVjdCgwLCAwLCA4LCA4KTtcclxuICAgICAgICB0aGlzLl9jb250ZXh0LmZpbGxTdHlsZShzdHlsZXMucGF0dGVybi5maWxsMik7XHJcbiAgICAgICAgdGhpcy5fY29udGV4dC5maWxsUmVjdCg4LCAwLCA4LCA4KTtcclxuICAgICAgICB0aGlzLl9jb250ZXh0LmZpbGxSZWN0KDAsIDgsIDgsIDgpO1xyXG4gICAgICAgIHRoaXMuX2NvbnRleHQuZmlsbFN0eWxlKHN0eWxlcy5wYXR0ZXJuLmZpbGwxKTtcclxuICAgICAgICB0aGlzLl9jb250ZXh0LmZpbGxSZWN0KDgsIDgsIDgsIDgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG59IiwiLyoqXHJcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhIFBvaW50XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb2ludCB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIHBvaW50XHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHggPSAwLCB5ID0gMCkge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgIH1cclxufTsiLCJpbXBvcnQgUG9pbnQgZnJvbSBcIi4vcG9pbnRcIjtcclxuaW1wb3J0IFNpemUgZnJvbSBcIi4vc2l6ZVwiO1xyXG5cclxuY29uc3QgZnJhbWVQcm9wb3J0aW9uID0gMC44NTtcclxuXHJcbi8qKlxyXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBGcmFtZSBlbGVtZW50XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGcmFtZSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIGZyYW1lXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX3NpemUgPSAwO1xyXG4gICAgICAgIHRoaXMuX29yaWdpbiA9IHtcclxuICAgICAgICAgICAgeDogMCxcclxuICAgICAgICAgICAgeTogMCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlIHNpemUgYW5kIGNvb3JkaW5hdGVzIG9mIHJlY3RhbmdsZSAoZnJhbWUpXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHBhcmVudCAtIEEgcGFyZW50IG5vZGUuXHJcbiAgICAgKiBAcmV0dXJuIHtQYXR0ZXJufSBBIFBhdHRlcm4gb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICB1cGRhdGUocGFyZW50KSB7XHJcbiAgICAgICAgdGhpcy5fc2l6ZSA9IChwYXJlbnQud2lkdGggPiBwYXJlbnQuaGVpZ2h0KSA/IHBhcmVudC5oZWlnaHQgKiBmcmFtZVByb3BvcnRpb24gOiBwYXJlbnQud2lkdGggKiBmcmFtZVByb3BvcnRpb247XHJcbiAgICAgICAgdGhpcy5fb3JpZ2luID0ge1xyXG4gICAgICAgICAgICB4OiAocGFyZW50LndpZHRoIC0gdGhpcy5fc2l6ZSkgLyAyLFxyXG4gICAgICAgICAgICB5OiAocGFyZW50LmhlaWdodCAtIHRoaXMuX3NpemUpIC8gMixcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHJlY3RhbmdsZSBwcm9wZXJ0aWVzLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge09iamVjdH0gLSBPYmplY3QucG9pbnQgaXMgYW4gb3JpZ2luIFBvaW50LFxyXG4gICAgICogd2hpY2ggaW4gdGhlIHVwcGVyLWxlZnQgY29ybmVyIGFuZCB0aGUgcmVjdGFuZ2xlIGV4dGVuZHMgdG93YXJkcyB0aGUgbG93ZXItcmlnaHQgY29ybmVyLlxyXG4gICAgICogT2JqZWN0LnNpemUgaXMgYSBzaXplIHRoYXQgc3BlY2lmaWVzIHRoZSBoZWlnaHQgYW5kIHdpZHRoIG9mIHRoZSByZWN0YW5nbGUuXHJcbiAgICAgKi9cclxuICAgIGdldFJlY3QoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgb3JpZ2luOiBuZXcgUG9pbnQodGhpcy5fb3JpZ2luLngsIHRoaXMuX29yaWdpbi55KSxcclxuICAgICAgICAgICAgc2l6ZTogbmV3IFNpemUodGhpcy5fc2l6ZSwgdGhpcy5fc2l6ZSksXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBzbWFsbGVzdCB2YWx1ZSBvZiB0aGUgeC1jb29yZGluYXRlIGZvciB0aGUgcmVjdGFuZ2xlLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge051bWJlcn0gLSBUaGUgc21hbGxlc3QgdmFsdWUgb2YgdGhlIHgtY29vcmRpbmF0ZSBmb3IgdGhlIHJlY3RhbmdsZS5cclxuICAgICAqL1xyXG4gICAgZ2V0TWluWCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb3JpZ2luLng7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBsYXJnZXN0IHZhbHVlIG9mIHRoZSB4LWNvb3JkaW5hdGUgZm9yIHRoZSByZWN0YW5nbGUuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7TnVtYmVyfSAtIFRoZSBsYXJnZXN0IHZhbHVlIG9mIHRoZSB4LWNvb3JkaW5hdGUgZm9yIHRoZSByZWN0YW5nbGUuXHJcbiAgICAgKi9cclxuICAgIGdldE1heFgoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX29yaWdpbi54ICsgdGhpcy5fc2l6ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgeC0gY29vcmRpbmF0ZSB0aGF0IGVzdGFibGlzaGVzIHRoZSBjZW50ZXIgb2YgYSByZWN0YW5nbGUuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge051bWJlcn0gLSBUaGUgeC1jb29yZGluYXRlIHRoYXQgZXN0YWJsaXNoZXMgdGhlIGNlbnRlciBvZiBhIHJlY3RhbmdsZS5cclxuICAgICAqL1xyXG4gICAgZ2V0TWlkWCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb3JpZ2luLnggKyAodGhpcy5fc2l6ZSAvIDIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBzbWFsbGVzdCB2YWx1ZSBvZiB0aGUgeC1jb29yZGluYXRlIGZvciB0aGUgcmVjdGFuZ2xlLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge051bWJlcn0gLSBUaGUgc21hbGxlc3QgdmFsdWUgb2YgdGhlIHgtY29vcmRpbmF0ZSBmb3IgdGhlIHJlY3RhbmdsZS5cclxuICAgICAqL1xyXG4gICAgZ2V0TWluWSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb3JpZ2luLnk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIGxhcmdlc3QgdmFsdWUgb2YgdGhlIHgtY29vcmRpbmF0ZSBmb3IgdGhlIHJlY3RhbmdsZS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IC0gVGhlIGxhcmdlc3QgdmFsdWUgb2YgdGhlIHgtY29vcmRpbmF0ZSBmb3IgdGhlIHJlY3RhbmdsZS5cclxuICAgICAqL1xyXG4gICAgZ2V0TWF4WSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb3JpZ2luLnkgKyB0aGlzLl9zaXplO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSB5LWNvb3JkaW5hdGUgdGhhdCBlc3RhYmxpc2hlcyB0aGUgY2VudGVyIG9mIHRoZSByZWN0YW5nbGUuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge051bWJlcn0gLSBUaGUgeS1jb29yZGluYXRlIHRoYXQgZXN0YWJsaXNoZXMgdGhlIGNlbnRlciBvZiBhIHJlY3RhbmdsZS5cclxuICAgICAqL1xyXG4gICAgZ2V0TWlkWSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb3JpZ2luLnkgKyAodGhpcy5fc2l6ZSAvIDIpO1xyXG4gICAgfVxyXG59OyIsImltcG9ydCB7c3R5bGVzfSBmcm9tIFwiLi8uLi9jb25maWcvZGVmYXVsdFwiO1xyXG5pbXBvcnQgQ29udGV4dCBmcm9tIFwiLi8uLi9vYmplY3RzL2NvbnRleHRcIjtcclxuXHJcbi8qKlxyXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBjdXRvdXQgb3ZlciBjYW52YXNcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1dG91dCB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIGNhbnZhcyBlbGVtZW50LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7RnJhbWV9IGZyYW1lIC0gQSBGcmFtZSBvYmplY3RcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjYW52YXMgLSBBIENhbnZhcyBlbGVtZW50XHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGZyYW1lLCBjYW52YXMpIHtcclxuICAgICAgICB0aGlzLl9mcmFtZSA9IGZyYW1lO1xyXG4gICAgICAgIHRoaXMuX2NhbnZhcyA9IGNhbnZhcztcclxuICAgICAgICB0aGlzLl9jb250ZXh0ID0gbmV3IENvbnRleHQodGhpcy5fY2FudmFzLmdldE5vZGUoKS5nZXRDb250ZXh0KFwiMmRcIikpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHJhdyB0aGUgY3V0b3V0IG92ZXIgY2FudmFzLCBjbG9ja3dpc2UgcmVjdGFuZ2xlIGFuZCBhbnRpLWNsb2NrIHdpc2UgcmVjdGFuZ2xlXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7Q3V0b3V0fSBBIEN1dG91dCBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIGRyYXcoKSB7XHJcbiAgICAgICAgdGhpcy5fY29udGV4dC5maWxsU3R5bGUoc3R5bGVzLmN1dG91dC5maWxsKTtcclxuICAgICAgICB0aGlzLl9jb250ZXh0LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIHRoaXMuX2NvbnRleHQucmVjdCgwLCAwLCB0aGlzLl9jYW52YXMuZ2V0Tm9kZSgpLndpZHRoLCB0aGlzLl9jYW52YXMuZ2V0Tm9kZSgpLmhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5fY29udGV4dC5tb3ZlVG8odGhpcy5fZnJhbWUuZ2V0TWluWCgpLCB0aGlzLl9mcmFtZS5nZXRNaW5ZKCkpO1xyXG4gICAgICAgIHRoaXMuX2NvbnRleHQubGluZVRvKHRoaXMuX2ZyYW1lLmdldE1pblgoKSwgdGhpcy5fZnJhbWUuZ2V0TWF4WSgpKTtcclxuICAgICAgICB0aGlzLl9jb250ZXh0LmxpbmVUbyh0aGlzLl9mcmFtZS5nZXRNYXhYKCksIHRoaXMuX2ZyYW1lLmdldE1heFkoKSk7XHJcbiAgICAgICAgdGhpcy5fY29udGV4dC5saW5lVG8odGhpcy5fZnJhbWUuZ2V0TWF4WCgpLCB0aGlzLl9mcmFtZS5nZXRNaW5ZKCkpO1xyXG4gICAgICAgIHRoaXMuX2NvbnRleHQuY2xvc2VQYXRoKCk7XHJcbiAgICAgICAgdGhpcy5fY29udGV4dC5maWxsKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgRWxlbWVudCBmcm9tIFwiLi9lbGVtZW50XCI7XHJcbmltcG9ydCBDb250ZXh0IGZyb20gXCIuLy4uL29iamVjdHMvY29udGV4dFwiO1xyXG5cclxuLyoqXHJcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhIEdlbmVyYXRvclxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2VuZXJhdG9yIGV4dGVuZHMgRWxlbWVudCB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIGdlbmVyYXRvci5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZnJhbWUsIGNhbnZhcykge1xyXG4gICAgICAgIHN1cGVyKFwiY2FudmFzXCIpO1xyXG4gICAgICAgIHRoaXMuX2ZyYW1lID0gZnJhbWU7XHJcbiAgICAgICAgdGhpcy5fY2FudmFzID0gY2FudmFzO1xyXG4gICAgICAgIHRoaXMuX2NvbnRleHQgPSBuZXcgQ29udGV4dCh0aGlzLl9ub2RlLmdldENvbnRleHQoXCIyZFwiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZW5lcmF0ZXMgYW5kIHJldHVybnMgYSBkYXRhIFVSSSBjb250YWluaW5nIGEgcmVwcmVzZW50YXRpb24gb2YgdGhlIGltYWdlIGluIHRoZSBmb3JtYXQgc3BlY2lmaWVkIGJ5IHRoZSB0eXBlIHBhcmFtZXRlciAoZGVmYXVsdHMgdG8gUE5HKS5cclxuICAgICAqIFRoZSByZXR1cm5lZCBpbWFnZSBpcyBpbiBhIHJlc29sdXRpb24gb2YgOTYgZHBpLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge1N0cmluZ30gLSBBIGRhdGEgVVJJLlxyXG4gICAgICovXHJcbiAgICB0b0RhdGFVUkwoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRXaWR0aCh0aGlzLl9mcmFtZS5nZXRSZWN0KCkuc2l6ZS53aWR0aCk7XHJcbiAgICAgICAgdGhpcy5zZXRIZWlnaHQodGhpcy5fZnJhbWUuZ2V0UmVjdCgpLnNpemUuaGVpZ2h0KTtcclxuICAgICAgICB0aGlzLl9jb250ZXh0LmRyYXdJbWFnZShcclxuICAgICAgICAgICAgdGhpcy5fY2FudmFzLmdldE5vZGUoKSxcclxuICAgICAgICAgICAgdGhpcy5fZnJhbWUuZ2V0TWluWCgpLFxyXG4gICAgICAgICAgICB0aGlzLl9mcmFtZS5nZXRNaW5ZKCksXHJcbiAgICAgICAgICAgIHRoaXMuX2ZyYW1lLmdldFJlY3QoKS5zaXplLndpZHRoLFxyXG4gICAgICAgICAgICB0aGlzLl9mcmFtZS5nZXRSZWN0KCkuc2l6ZS5oZWlnaHQsXHJcbiAgICAgICAgICAgIDAsIDAsXHJcbiAgICAgICAgICAgIHRoaXMuX2ZyYW1lLmdldFJlY3QoKS5zaXplLndpZHRoLFxyXG4gICAgICAgICAgICB0aGlzLl9mcmFtZS5nZXRSZWN0KCkuc2l6ZS5oZWlnaHRcclxuICAgICAgICApO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE5vZGUoKS50b0RhdGFVUkwoKTtcclxuICAgIH1cclxufSIsImltcG9ydCBFbGVtZW50IGZyb20gXCIuLy4uL2NvbXBvbmVudHMvZWxlbWVudFwiO1xyXG5pbXBvcnQgUG9pbnQgZnJvbSBcIi4vLi4vb2JqZWN0cy9wb2ludFwiO1xyXG5cclxuLyoqXHJcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhIE1vdmVFdmVudExpc3RlbmVyXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb3ZlRXZlbnRMaXN0ZW5lciB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIE1vdmVFdmVudExpc3RlbmVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCAtIEEgbWFpbiBjb250YWluZXIuXHJcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IHBhcmVudCAtIEEgcGFyZW50IGVsZW1lbnQgKHdpbmRvdylcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgcGFyZW50ID0gbmV3IEVsZW1lbnQoZG9jdW1lbnQuYm9keSkpIHtcclxuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcclxuICAgICAgICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XHJcblxyXG4gICAgICAgIHRoaXMuX29uTW92ZUNhbGxiYWNrID0gKCkgPT4ge307XHJcbiAgICAgICAgdGhpcy5fb25QcmVzc0NhbGxiYWNrID0gKCkgPT4ge307XHJcbiAgICAgICAgdGhpcy5fb25SZWxlYXNlQ2FsbGJhY2sgPSAoKSA9PiB7fTtcclxuXHJcbiAgICAgICAgdGhpcy5fb25SZWxlYXNlSGFuZGxlciA9IHRoaXMub25SZWxlYXNlSGFuZGxlci5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX29uUHJlc3NIYW5kbGVyID0gdGhpcy5vblByZXNzSGFuZGxlci5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX29uTW92ZUhhbmRsZXIgPSB0aGlzLm9uTW92ZUhhbmRsZXIuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxiYWNrIGZ1bmN0aW9uIHdoaWNoIGZpcmVzIGFmdGVyICh0b3VjaC9tb3VzZSkgbW92aW5nIChkcmFnZ2luZylcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIENhbGxiYWNrLlxyXG4gICAgICovXHJcbiAgICBvbk1vdmUoY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLl9vbk1vdmVDYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGJhY2sgZnVuY3Rpb24gd2hpY2ggZmlyZXMgYWZ0ZXIgdG91Y2ggcHJlc3MgLyBtb3VzZSBjbGlja1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gQ2FsbGJhY2suXHJcbiAgICAgKi9cclxuICAgIG9uUHJlc3MoY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLl9vblByZXNzQ2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxiYWNrIGZ1bmN0aW9uIHdoaWNoIGZpcmVzIGFmdGVyIG1vdXNlL2ZpbmdlciByZWxlYXNpbmdcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIENhbGxiYWNrLlxyXG4gICAgICovXHJcbiAgICBvblJlbGVhc2UoY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLl9vblJlbGVhc2VDYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZSBldmVudCBsaXN0ZW5lcnNcclxuICAgICAqL1xyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICB0aGlzLl9lbGVtZW50LmdldE5vZGUoKS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMuX29uUHJlc3NIYW5kbGVyLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5fZWxlbWVudC5nZXROb2RlKCkuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdGhpcy5fb25QcmVzc0hhbmRsZXIsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLl9wYXJlbnQuZ2V0Tm9kZSgpLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuX29uUmVsZWFzZUhhbmRsZXIsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLl9wYXJlbnQuZ2V0Tm9kZSgpLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCB0aGlzLl9vblJlbGVhc2VIYW5kbGVyLCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVyIGZvciAodG91Y2gvbW91c2UpIG1vdmUgYWN0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIEV2ZW50IG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgb25Nb3ZlSGFuZGxlcihldmVudCkge1xyXG4gICAgICAgIHRoaXMuX29uTW92ZUNhbGxiYWNrKHRoaXMuX2dldEV2ZW50UG9pbnQoZXZlbnQpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXIgZm9yICh0b3VjaC9tb3VzZSkgcHJlc3MgYWN0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIEV2ZW50IG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgb25QcmVzc0hhbmRsZXIoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLl9wYXJlbnQuZ2V0Tm9kZSgpLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy5fb25Nb3ZlSGFuZGxlciwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuX3BhcmVudC5nZXROb2RlKCkuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCB0aGlzLl9vbk1vdmVIYW5kbGVyLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5fb25QcmVzc0NhbGxiYWNrKHRoaXMuX2dldEV2ZW50UG9pbnQoZXZlbnQpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXIgZm9yICh0b3VjaC9tb3VzZSkgcmVsZWFzZSBhY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIG9uUmVsZWFzZUhhbmRsZXIoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLl9wYXJlbnQuZ2V0Tm9kZSgpLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy5fb25Nb3ZlSGFuZGxlciwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuX3BhcmVudC5nZXROb2RlKCkucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCB0aGlzLl9vbk1vdmVIYW5kbGVyLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5fb25SZWxlYXNlQ2FsbGJhY2sodGhpcy5fZ2V0RXZlbnRQb2ludChldmVudCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJhbnNsYXRlIHZpZXdwb3J0IGNvb3JkaW5hdGVzIHRvIGNvb3JkaW5hdGVzIHJlbGF0aXZlIHRvIHRoZSBlbGVtZW50LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7UG9pbnR9IHBvaW50IC0gVmlld3BvcnQgY29vcmRpbmF0ZXNcclxuICAgICAqIEByZXR1cm4ge09iamVjdH0gLSBDb29yZGluYXRlcyByZWxhdGl2ZSB0byB0aGUgZWxlbWVudC5cclxuICAgICAqL1xyXG4gICAgX2NvbnZlcnRDb29yZGluYXRlcyhwb2ludCkge1xyXG4gICAgICAgIGNvbnN0IGJveCA9IHRoaXMuX2VsZW1lbnQuZ2V0Tm9kZSgpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIGNvbnN0IHggPSBwb2ludC54IC0gYm94LmxlZnQgKiAodGhpcy5fZWxlbWVudC5nZXROb2RlKCkud2lkdGggLyBib3gud2lkdGgpO1xyXG4gICAgICAgIGNvbnN0IHkgPSBwb2ludC55IC0gYm94LnRvcCAqICh0aGlzLl9lbGVtZW50LmdldE5vZGUoKS5oZWlnaHQgLyBib3guaGVpZ2h0KTtcclxuICAgICAgICByZXR1cm4gbmV3IFBvaW50KHgsIHkpO1xyXG4gICAgfVxyXG5cclxuICAgIF9nZXRFdmVudFBvaW50KGV2ZW50KSB7XHJcbiAgICAgICAgY29uc3QgeCA9IGV2ZW50LmNsaWVudFggfHwgZXZlbnQudG91Y2hlc1swXS5jbGllbnRYO1xyXG4gICAgICAgIGNvbnN0IHkgPSBldmVudC5jbGllbnRZIHx8IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29udmVydENvb3JkaW5hdGVzKG5ldyBQb2ludCh4LCB5KSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgRWxlbWVudCBmcm9tIFwiLi9lbGVtZW50XCI7XHJcbmltcG9ydCBJbWFnZSBmcm9tIFwiLi9pbWFnZVwiO1xyXG5pbXBvcnQgUGF0dGVybiBmcm9tIFwiLi9wYXR0ZXJuXCI7XHJcbmltcG9ydCBGcmFtZSBmcm9tIFwiLi8uLi9vYmplY3RzL2ZyYW1lXCI7XHJcbmltcG9ydCBQb2ludCBmcm9tIFwiLi8uLi9vYmplY3RzL3BvaW50XCI7XHJcbmltcG9ydCBDdXRvdXQgZnJvbSBcIi4vY3V0b3V0XCI7XHJcbmltcG9ydCBHZW5lcmF0b3IgZnJvbSBcIi4vZ2VuZXJhdG9yXCI7XHJcbmltcG9ydCBNb3ZlRXZlbnRMaXN0ZW5lciBmcm9tIFwiLi8uLi9ldmVudHMvbW92ZVwiO1xyXG5pbXBvcnQgQ29udGV4dCBmcm9tIFwiLi8uLi9vYmplY3RzL2NvbnRleHRcIjtcclxuXHJcbi8qKlxyXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBjYW52YXMgZWxlbWVudFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FudmFzIGV4dGVuZHMgRWxlbWVudCB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIGNhbnZhcyBlbGVtZW50LlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihcImNhbnZhc1wiKTtcclxuICAgICAgICB0aGlzLl9jb250ZXh0ID0gbmV3IENvbnRleHQodGhpcy5fbm9kZS5nZXRDb250ZXh0KFwiMmRcIikpO1xyXG4gICAgICAgIHRoaXMuX2ltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgdGhpcy5fcGF0dGVybiA9IG5ldyBQYXR0ZXJuKCk7XHJcbiAgICAgICAgdGhpcy5fZnJhbWUgPSBuZXcgRnJhbWUoKTtcclxuICAgICAgICB0aGlzLl9jdXRvdXQgPSBuZXcgQ3V0b3V0KHRoaXMuX2ZyYW1lLCB0aGlzKTtcclxuICAgICAgICB0aGlzLl9nZW5lcmF0b3IgPSBuZXcgR2VuZXJhdG9yKHRoaXMuX2ZyYW1lLCB0aGlzKTtcclxuICAgICAgICB0aGlzLl9tb3ZlRXZlbnRMaXN0ZW5lciA9IG5ldyBNb3ZlRXZlbnRMaXN0ZW5lcih0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5fbGFzdFBvaW50ID0gbmV3IFBvaW50KDAsIDApO1xyXG4gICAgICAgIHRoaXMuX2Jhc2VQb2ludCA9IG5ldyBQb2ludCgwLCAwKTtcclxuXHJcbiAgICAgICAgdGhpcy5fb25DaGFuZ2VDYWxsYmFjayA9ICgpID0+IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVyIGEgY2FudmFzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHBhcmVudCAtIFRoZSBET00gRWxlbWVudCBvYmplY3QsIHBhcmVudCBub2RlXHJcbiAgICAgKiBAcmV0dXJuIHtDYW52YXN9IEFuIENhbnZhcyBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIHJlbmRlcihwYXJlbnQpIHtcclxuICAgICAgICBzdXBlci5yZW5kZXIocGFyZW50KTtcclxuICAgICAgICB0aGlzLl9kcmF3QmFja2dyb3VuZCgpO1xyXG4gICAgICAgIHRoaXMuX21vdmVFdmVudExpc3RlbmVyLmluaXQoKTtcclxuICAgICAgICB0aGlzLl9tb3ZlRXZlbnRMaXN0ZW5lci5vblByZXNzKChwb2ludCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9sYXN0UG9pbnQgPSBwb2ludDtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9tb3ZlRXZlbnRMaXN0ZW5lci5vbk1vdmUoKHBvaW50KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RyYXdJbWFnZShwb2ludCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGFuZ2Ugd2lkdGggb2YgQ2FudmFzLCByZWNhbGN1bGF0ZSBmcmFtZSBkaW1lbnNpb25zXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoIC0gVGhlIG51bWJlciBvZiBwaXhlbHMuXHJcbiAgICAgKiBAcmV0dXJuIHtDYW52YXN9IEEgQ2FudmFzIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgc2V0V2lkdGgod2lkdGgpIHtcclxuICAgICAgICBzdXBlci5zZXRXaWR0aCh3aWR0aCk7XHJcbiAgICAgICAgdGhpcy5fZnJhbWUudXBkYXRlKHRoaXMuZ2V0Tm9kZSgpKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoYW5nZSBoZWlnaHQgb2YgQ2FudmFzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGhlaWdodCAtIFRoZSBudW1iZXIgb2YgcGl4ZWxzLlxyXG4gICAgICogQHJldHVybiB7Q2FudmFzfSBBIENhbnZhcyBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIHNldEhlaWdodChoZWlnaHQpIHtcclxuICAgICAgICBzdXBlci5zZXRIZWlnaHQoaGVpZ2h0KTtcclxuICAgICAgICB0aGlzLl9mcmFtZS51cGRhdGUodGhpcy5nZXROb2RlKCkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGFzcyB0aGUgSW1hZ2Ugb2JqZWN0IGludG8gQ2FudmFzLCByZXNldCBzYXZlZCBwb2ludHMsXHJcbiAgICAgKiBjYWxjdWxhdGUgc2NhbGUgdmFsdWUgKGltYWdlIHNob3VsZCBmaXQgaW4gdGhlIGZyYW1lKVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SW1hZ2V9IGltYWdlIC0gQW4gSW1hZ2Ugb2JqZWN0XHJcbiAgICAgKiBAcmV0dXJuIHtDYW52YXN9IEEgQ2FudmFzIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgc2V0SW1hZ2UoaW1hZ2UpIHtcclxuICAgICAgICB0aGlzLl9yZXNldFBvaW50cygpO1xyXG4gICAgICAgIHRoaXMuX2ltYWdlID0gaW1hZ2U7XHJcbiAgICAgICAgdGhpcy5faW1hZ2Uuc2NhbGVUb0ZpdCh0aGlzLl9mcmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEcmF3IGFuIEltYWdlIGF0IGluaXRpYWwgcG9zaXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtDYW52YXN9IEEgQ2FudmFzIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgZHJhdygpIHtcclxuICAgICAgICB0aGlzLl9kcmF3SW1hZ2UodGhpcy5fY2VudGVySW1hZ2VQb2ludCgpKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlZHJhdyBhbiBJbWFnZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge0NhbnZhc30gQSBDYW52YXMgb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICByZWRyYXcoKSB7XHJcbiAgICAgICAgdGhpcy5fcmVzZXRQb2ludHMoKTtcclxuICAgICAgICB0aGlzLl9pbWFnZS5zY2FsZVRvRml0KHRoaXMuX2ZyYW1lKTtcclxuICAgICAgICB0aGlzLmRyYXcoKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsZWFyIGNhbnZhcyBjb250ZXh0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7Q2FudmFzfSBBIENhbnZhcyBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIGNsZWFyKCkge1xyXG4gICAgICAgIHRoaXMuX2NvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMuZ2V0Tm9kZSgpLndpZHRoLCB0aGlzLmdldE5vZGUoKS5oZWlnaHQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2VuZXJhdGVzIGFuZCByZXR1cm5zIGEgZGF0YSBVUkkgY29udGFpbmluZyBhIHJlcHJlc2VudGF0aW9uXHJcbiAgICAgKiBvZiB0aGUgaW1hZ2UgaW4gdGhlIGZvcm1hdCBzcGVjaWZpZWQgYnkgdGhlIHR5cGUgcGFyYW1ldGVyIChkZWZhdWx0cyB0byBQTkcpLlxyXG4gICAgICogVGhlIHJldHVybmVkIGltYWdlIGlzIGluIGEgcmVzb2x1dGlvbiBvZiA5NiBkcGkuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7U3RyaW5nfSAtIEEgZGF0YSBVUkkuXHJcbiAgICAgKi9cclxuICAgIHRvRGF0YVVSTCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZ2VuZXJhdG9yLnRvRGF0YVVSTCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB6b29tLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB6b29tIC0gWm9vbSB2YWx1ZSwgZnJvbSBgMGAgPSAwJSwgYDEuMGAgPSAxMDAlIG9mIGltYWdlIHNpemVcclxuICAgICAqIEByZXR1cm4ge0NhbnZhc30gLSBBIENhbnZhcyBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIHNldFpvb20oem9vbSkge1xyXG4gICAgICAgIGNvbnN0IGxhc3RJbWFnZVNpemUgPSB0aGlzLl9pbWFnZS5nZXRTaXplKCk7XHJcbiAgICAgICAgdGhpcy5faW1hZ2Uuc2V0Wm9vbSh6b29tKTtcclxuICAgICAgICBjb25zdCBpbWFnZVNpemUgPSB0aGlzLl9pbWFnZS5nZXRTaXplKCk7XHJcbiAgICAgICAgY29uc3QgeCA9IHRoaXMuX2xhc3RQb2ludC54IC0gKChpbWFnZVNpemUud2lkdGggLSBsYXN0SW1hZ2VTaXplLndpZHRoKSAvIDIpO1xyXG4gICAgICAgIGNvbnN0IHkgPSB0aGlzLl9sYXN0UG9pbnQueSAtICgoaW1hZ2VTaXplLmhlaWdodCAtIGxhc3RJbWFnZVNpemUuaGVpZ2h0KSAvIDIpO1xyXG4gICAgICAgIHRoaXMuX2RyYXdJbWFnZShuZXcgUG9pbnQoeCwgeSkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGJhY2sgZnVuY3Rpb24gd2hpY2ggZmlyZXMgYWZ0ZXIgY2FudmFzIGRyYXdpbmdcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIENhbGxiYWNrLlxyXG4gICAgICovXHJcbiAgICBvbkNoYW5nZShjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICBHZXQgRnJhbWUgb3JpZ2luIGFuZCBzaXplIHJlbGF0aXZlIHRvIGFuIEltYWdlLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt7b3JpZ2luOiB7eDogTnVtYmVyLCB5OiBOdW1iZXJ9LCBzaXplOiB7d2lkdGg6IE51bWJlciwgaGVpZ2h0OiBOdW1iZXJ9fX1cclxuICAgICAqL1xyXG4gICAgZ2V0RGF0YSgpIHtcclxuICAgICAgICBjb25zdCBvcmlnaW5YID0gKHRoaXMuX2ZyYW1lLmdldE1pblgoKSAtIHRoaXMuX2Jhc2VQb2ludC54KSAvIHRoaXMuX2ltYWdlLmdldFNjYWxlKCk7XHJcbiAgICAgICAgY29uc3Qgb3JpZ2luWSA9ICh0aGlzLl9mcmFtZS5nZXRNaW5ZKCkgLSB0aGlzLl9iYXNlUG9pbnQueSkgLyB0aGlzLl9pbWFnZS5nZXRTY2FsZSgpO1xyXG4gICAgICAgIGNvbnN0IGZyYW1lV2lkdGggPSB0aGlzLl9mcmFtZS5nZXRSZWN0KCkuc2l6ZS53aWR0aCAvIHRoaXMuX2ltYWdlLmdldFNjYWxlKCk7XHJcbiAgICAgICAgY29uc3QgZnJhbWVIZWlnaHQgPSB0aGlzLl9mcmFtZS5nZXRSZWN0KCkuc2l6ZS53aWR0aCAvIHRoaXMuX2ltYWdlLmdldFNjYWxlKCk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgb3JpZ2luOiB7XHJcbiAgICAgICAgICAgICAgICB4OiBvcmlnaW5YLFxyXG4gICAgICAgICAgICAgICAgeTogb3JpZ2luWSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2l6ZToge1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IGZyYW1lV2lkdGgsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGZyYW1lSGVpZ2h0LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgYSBGcmFtZSBvcmlnaW4gYW5kIHNpemUgcmVsYXRpdmUgdG8gYW4gSW1hZ2UuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSBBIGZyYW1lIG9yaWdpbiAodG9wLCBsZWZ0KSBwb2ludCBhbmQgZnJhbWUgc2l6ZS5cclxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IC0gQSBmcmFtZSBvcmlnaW4gcG9pbnQgYW5kIHpvb20gdmFsdWUuXHJcbiAgICAgKi9cclxuICAgIHNldERhdGEoZGF0YSkge1xyXG4gICAgICAgIGNvbnN0IGV4cGVjdGVkU2NhbGUgPSB0aGlzLl9mcmFtZS5nZXRSZWN0KCkuc2l6ZS53aWR0aCAvIGRhdGEuc2l6ZS53aWR0aDtcclxuICAgICAgICBjb25zdCB6b29tID0gKGV4cGVjdGVkU2NhbGUgLSB0aGlzLl9pbWFnZS5nZXRPcmlnaW5TY2FsZSgpKSAvIHRoaXMuX2ltYWdlLmdldE9yaWdpblNjYWxlKCk7XHJcbiAgICAgICAgdGhpcy5zZXRab29tKHpvb20pO1xyXG5cclxuICAgICAgICBjb25zdCB4ID0gdGhpcy5fZnJhbWUuZ2V0TWluWCgpIC0gKGRhdGEub3JpZ2luLnggKiB0aGlzLl9pbWFnZS5nZXRTY2FsZSgpKTtcclxuICAgICAgICBjb25zdCB5ID0gdGhpcy5fZnJhbWUuZ2V0TWluWSgpIC0gKGRhdGEub3JpZ2luLnkgKiB0aGlzLl9pbWFnZS5nZXRTY2FsZSgpKTtcclxuICAgICAgICBjb25zdCBwb2ludCA9IG5ldyBQb2ludCh4LCB5KTtcclxuICAgICAgICB0aGlzLl9yZXNldFBvaW50cygpO1xyXG4gICAgICAgIHRoaXMuX2RyYXdJbWFnZShwb2ludCk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG9yaWdpbjogcG9pbnQsXHJcbiAgICAgICAgICAgIHpvb206IHpvb20sXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHBvaW50cyB0byB6ZXJvXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7Q2FudmFzfSBBIENhbnZhcyBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIF9yZXNldFBvaW50cygpIHtcclxuICAgICAgICB0aGlzLl9sYXN0UG9pbnQgPSBuZXcgUG9pbnQoMCwgMCk7XHJcbiAgICAgICAgdGhpcy5fYmFzZVBvaW50ID0gbmV3IFBvaW50KDAsIDApO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlIGFuZCBnZXQgb3JpZ2luIFBvaW50IGZvciBjZW50ZXJlZCBpbWFnZSAoeC1heGlzLCB5LWF4aXMpXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7UG9pbnR9IEEgUG9pbnQuXHJcbiAgICAgKi9cclxuICAgIF9jZW50ZXJJbWFnZVBvaW50KCkge1xyXG4gICAgICAgY29uc3QgeCA9IHRoaXMuX2ZyYW1lLmdldE1pZFgoKSAtICh0aGlzLl9pbWFnZS5nZXRTaXplKCkud2lkdGggLyAyKTtcclxuICAgICAgIGNvbnN0IHkgPSB0aGlzLl9mcmFtZS5nZXRNaWRZKCkgLSAodGhpcy5faW1hZ2UuZ2V0U2l6ZSgpLmhlaWdodCAvIDIpO1xyXG4gICAgICAgcmV0dXJuIG5ldyBQb2ludCh4LCB5KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZSBhbmQgZ2V0IG9yaWdpbiBQb2ludCBmb3IgY2VudGVyZWQgaW1hZ2UgKHgtYXhpcywgeS1heGlzKVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7UG9pbnR9IHBvaW50IC0gUG9pbnQgdG8gdmFsaWRhdGVcclxuICAgICAqIEByZXR1cm4ge1BvaW50fSBBIFBvaW50LlxyXG4gICAgICovXHJcbiAgICBfdmFsaWRhdGVQb2ludChwb2ludCkge1xyXG4gICAgICAgIGNvbnN0IHZhbGlkUG9pbnQgPSBwb2ludDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2ltYWdlLmdldFNpemUoKS53aWR0aCA8IHRoaXMuX2ZyYW1lLmdldFJlY3QoKS5zaXplLndpZHRoKSB7XHJcbiAgICAgICAgICAgIHZhbGlkUG9pbnQueCA9IHRoaXMuX2NlbnRlckltYWdlUG9pbnQoKS54O1xyXG4gICAgICAgIH0gZWxzZSBpZiAocG9pbnQueCA+IHRoaXMuX2ZyYW1lLmdldE1pblgoKSkge1xyXG4gICAgICAgICAgICB2YWxpZFBvaW50LnggPSB0aGlzLl9mcmFtZS5nZXRNaW5YKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwb2ludC54ICsgdGhpcy5faW1hZ2UuZ2V0U2l6ZSgpLndpZHRoIDwgdGhpcy5fZnJhbWUuZ2V0TWF4WCgpKSB7XHJcbiAgICAgICAgICAgIHZhbGlkUG9pbnQueCA9IHRoaXMuX2ZyYW1lLmdldE1heFgoKSAtIHRoaXMuX2ltYWdlLmdldFNpemUoKS53aWR0aDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YWxpZFBvaW50LnggPSBwb2ludC54O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2ltYWdlLmdldFNpemUoKS5oZWlnaHQgPCB0aGlzLl9mcmFtZS5nZXRSZWN0KCkuc2l6ZS5oZWlnaHQpIHtcclxuICAgICAgICAgICAgdmFsaWRQb2ludC55ID0gdGhpcy5fY2VudGVySW1hZ2VQb2ludCgpLnk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwb2ludC55ID4gdGhpcy5fZnJhbWUuZ2V0TWluWSgpKSB7XHJcbiAgICAgICAgICAgIHZhbGlkUG9pbnQueSA9IHRoaXMuX2ZyYW1lLmdldE1pblkoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHBvaW50LnkgKyB0aGlzLl9pbWFnZS5nZXRTaXplKCkuaGVpZ2h0IDwgdGhpcy5fZnJhbWUuZ2V0TWF4WSgpKSB7XHJcbiAgICAgICAgICAgIHZhbGlkUG9pbnQueSA9IHRoaXMuX2ZyYW1lLmdldE1heFkoKSAtIHRoaXMuX2ltYWdlLmdldFNpemUoKS5oZWlnaHQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFsaWRQb2ludC55ID0gcG9pbnQueTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB2YWxpZFBvaW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHJhdyBhbiBJbWFnZSBvbiBjYW52YXMsIGNsZWFyIGNhbnZhcyBjb250ZXh0IGJlZm9yZSwgZHJhdyBhIGJhY2tncm91bmQgcGF0dGVybiBhbmQgZnJhbWVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1BvaW50fSBwb2ludCAtIEFuIG9yaWdpbiBwb2ludFxyXG4gICAgICogQHJldHVybiB7Q2FudmFzfSBBIENhbnZhcyBvYmplY3QuIFxyXG4gICAgICovXHJcbiAgICBfZHJhd0ltYWdlKHBvaW50ID0gbmV3IFBvaW50KDAsIDApKSB7XHJcbiAgICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuX2RyYXdCYWNrZ3JvdW5kKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGJhc2VYID0gdGhpcy5fYmFzZVBvaW50LnggKyAocG9pbnQueCAtIHRoaXMuX2xhc3RQb2ludC54KTtcclxuICAgICAgICBjb25zdCBiYXNlWSA9IHRoaXMuX2Jhc2VQb2ludC55ICsgKHBvaW50LnkgLSB0aGlzLl9sYXN0UG9pbnQueSk7XHJcblxyXG4gICAgICAgIHRoaXMuX2Jhc2VQb2ludCA9IHRoaXMuX3ZhbGlkYXRlUG9pbnQobmV3IFBvaW50KGJhc2VYLCBiYXNlWSkpO1xyXG4gICAgICAgIHRoaXMuX2xhc3RQb2ludCA9IHBvaW50O1xyXG5cclxuICAgICAgICB0aGlzLl9jb250ZXh0LmRyYXdJbWFnZShcclxuICAgICAgICAgICAgdGhpcy5faW1hZ2UuZ2V0Tm9kZSgpLFxyXG4gICAgICAgICAgICB0aGlzLl9iYXNlUG9pbnQueCxcclxuICAgICAgICAgICAgdGhpcy5fYmFzZVBvaW50LnksXHJcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlLmdldFNpemUoKS53aWR0aCxcclxuICAgICAgICAgICAgdGhpcy5faW1hZ2UuZ2V0U2l6ZSgpLmhlaWdodCxcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuX2N1dG91dC5kcmF3KCk7XHJcbiAgICAgICAgdGhpcy5fb25DaGFuZ2VDYWxsYmFjayh0aGlzKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXcgcGF0dGVybiBjYW52YXMgb24gdGhlIE1haW4gY2FudmFzIGFzIGJhY2tncm91bmRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtDYW52YXN9IEEgQ2FudmFzIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgX2RyYXdCYWNrZ3JvdW5kKCkge1xyXG4gICAgICAgIGNvbnN0IHBhdHRlcm4gPSB0aGlzLl9jb250ZXh0LmNyZWF0ZVBhdHRlcm4odGhpcy5fcGF0dGVybi5nZXROb2RlKCksIFwicmVwZWF0XCIpO1xyXG4gICAgICAgIHRoaXMuX2NvbnRleHQucmVjdCgwLCAwLCB0aGlzLmdldE5vZGUoKS53aWR0aCwgdGhpcy5nZXROb2RlKCkuaGVpZ2h0KTtcclxuICAgICAgICB0aGlzLl9jb250ZXh0LmZpbGxTdHlsZShwYXR0ZXJuKTtcclxuICAgICAgICB0aGlzLl9jb250ZXh0LmZpbGwoKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufSIsImltcG9ydCBFbGVtZW50IGZyb20gXCIuL2VsZW1lbnRcIjtcclxuXHJcbi8qKlxyXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBTbGlkZXJcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsaWRlciBleHRlbmRzIEVsZW1lbnQge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYSBzbGlkZXIuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFwiaW5wdXRcIik7XHJcbiAgICAgICAgdGhpcy5zZXRUeXBlKFwicmFuZ2VcIik7XHJcbiAgICAgICAgdGhpcy5hZGRDbGFzcyhcInNsaWRlclwiKTtcclxuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShcIm1pblwiLCAwKTtcclxuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShcIm1heFwiLCAxMDApO1xyXG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgMCk7XHJcblxyXG4gICAgICAgIHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2sgPSAoKSA9PiB7fTtcclxuICAgICAgICB0aGlzLl9vbkNoYW5nZUhhbmRsZXIgPSB0aGlzLl9vbkNoYW5nZS5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGJhY2sgZnVuY3Rpb24sIHdoaWNoIGJlIGZpcmVkIGFmdGVyIGNoYW5naW5nIHRoZSB2YWx1ZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gQ2FsbGJhY2suXHJcbiAgICAgKiBAcmV0dXJucyB7U2xpZGVyfSAtIEEgU2xpZGVyIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgb25DaGFuZ2UoY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLl9vbkNoYW5nZUNhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICAgICAgdGhpcy5nZXROb2RlKCkuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCB0aGlzLl9vbkNoYW5nZUhhbmRsZXIsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLmdldE5vZGUoKS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgdGhpcy5fb25DaGFuZ2VIYW5kbGVyLCBmYWxzZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIGEgdmFsdWVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdmFsdWUgLSBBIHZhbHVlIGZyb20gMCB0byAxMDBcclxuICAgICAqIEByZXR1cm5zIHtTbGlkZXJ9IC0gQSBTbGlkZXIgb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBzZXRWYWx1ZSh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuZ2V0Tm9kZSgpLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaXJlcyBjdXN0b20gY2FsbGJhY2suXHJcbiAgICAgKi9cclxuICAgIF9vbkNoYW5nZSgpIHtcclxuICAgICAgICB0aGlzLl9vbkNoYW5nZUNhbGxiYWNrKE51bWJlcih0aGlzLmdldE5vZGUoKS52YWx1ZSkpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IEVsZW1lbnQgZnJvbSBcIi4vZWxlbWVudFwiO1xyXG5cclxuLyoqXHJcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhbiBJY29uIGVsZW1lbnRcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEljb24gZXh0ZW5kcyBFbGVtZW50IHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGFuIEljb24gZWxlbWVudC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIEFuIEljb24gbmFtZS5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobmFtZSkge1xyXG4gICAgICAgIHN1cGVyKFwic3ZnXCIpO1xyXG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgYGljb24gaWNvbi0ke25hbWV9YCk7XHJcbiAgICAgICAgdGhpcy5fdXNlID0gbmV3IEVsZW1lbnQoXCJ1c2VcIik7XHJcbiAgICAgICAgdGhpcy5fdXNlLmdldE5vZGUoKS5zZXRBdHRyaWJ1dGVOUyhcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiwgXCJ4bGluazpocmVmXCIsIGAjaWNvbi0ke25hbWV9YCk7XHJcbiAgICAgICAgdGhpcy5fdXNlLnJlbmRlcih0aGlzLmdldE5vZGUoKSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgdmFsaWRhdGVOb2RlIGZyb20gXCIuLy4uL3ZhbGlkYXRvcnMvbm9kZVwiO1xyXG5pbXBvcnQgdmFsaWRhdGVDb25maWcgZnJvbSBcIi4vLi4vdmFsaWRhdG9ycy9jb25maWdcIjtcclxuaW1wb3J0IHZhbGlkYXRlRGltZW5zaW9uIGZyb20gXCIuLy4uL3ZhbGlkYXRvcnMvZGltZW5zaW9uXCI7XHJcbmltcG9ydCB2YWxpZGF0ZUNhbGxiYWNrIGZyb20gXCIuLy4uL3ZhbGlkYXRvcnMvY2FsbGJhY2tcIjtcclxuaW1wb3J0IHsgZGVmYXVsdERpbWVuc2lvbnMgfSBmcm9tIFwiLi4vY29uZmlnL2RlZmF1bHRcIjtcclxuaW1wb3J0IENhbnZhcyBmcm9tIFwiLi8uLi9jb21wb25lbnRzL2NhbnZhc1wiO1xyXG5pbXBvcnQgSW1hZ2UgZnJvbSBcIi4vLi4vY29tcG9uZW50cy9pbWFnZVwiO1xyXG5pbXBvcnQgU2xpZGVyIGZyb20gXCIuLy4uL2NvbXBvbmVudHMvc2xpZGVyXCI7XHJcbmltcG9ydCBFbGVtZW50IGZyb20gXCIuLy4uL2NvbXBvbmVudHMvZWxlbWVudFwiO1xyXG5pbXBvcnQgSWNvbiBmcm9tIFwiLi8uLi9jb21wb25lbnRzL2ljb25cIjtcclxuXHJcbi8qKlxyXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgSW1hZ2UgQ3JvcFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW1hZ2VDcm9wIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGFuIEltYWdlQ3JvcC5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyAtIFRoZSBjb25maWcgZm9yIEltYWdlIENyb3BcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoY29uZmlnID0ge30pIHtcclxuICAgICAgICB2YWxpZGF0ZUNvbmZpZyhjb25maWcpO1xyXG5cclxuICAgICAgICB0aGlzLl9jYW52YXMgPSBuZXcgQ2FudmFzKCk7XHJcbiAgICAgICAgdGhpcy5faW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICB0aGlzLl9zbGlkZXIgPSBuZXcgU2xpZGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0V2lkdGgoY29uZmlnLndpZHRoIHx8IGRlZmF1bHREaW1lbnNpb25zLndpZHRoKTtcclxuICAgICAgICB0aGlzLnNldEhlaWdodChjb25maWcuaGVpZ2h0IHx8IGRlZmF1bHREaW1lbnNpb25zLmhlaWdodCk7XHJcblxyXG4gICAgICAgIHRoaXMuX29uSW5pdENhbGxiYWNrID0gdmFsaWRhdGVDYWxsYmFjayhjb25maWcub25Jbml0KTtcclxuICAgICAgICB0aGlzLl9vbkNoYW5nZUNhbGxiYWNrID0gdmFsaWRhdGVDYWxsYmFjayhjb25maWcub25DaGFuZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIEltYWdlIENyb3AgY29udGFpbmVyIGF0IHRoZSBlbmQgb2YgdGhlIGxpc3Qgb2YgY2hpbGRyZW4gb2YgYSBzcGVjaWZpZWQgcGFyZW50IG5vZGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gbm9kZSAtIFRoZSBET00gRWxlbWVudCBvYmplY3QsIHBhcmVudCBub2RlXHJcbiAgICAgKiBAcmV0dXJuIHtJbWFnZUNyb3B9IEFuIEltYWdlQ3JvcCBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIHJlbmRlcihub2RlKSB7XHJcbiAgICAgICAgdGhpcy5fbm9kZSA9IHZhbGlkYXRlTm9kZShub2RlKTtcclxuXHJcbiAgICAgICAgY29uc3Qgd3JhcHBlciA9IG5ldyBFbGVtZW50KCk7XHJcbiAgICAgICAgd3JhcHBlci5hZGRDbGFzcyhcImltYWdlLWNyb3BcIik7XHJcbiAgICAgICAgd3JhcHBlci5yZW5kZXIodGhpcy5fbm9kZSk7XHJcbiAgICAgICAgdGhpcy5fY2FudmFzLnJlbmRlcih3cmFwcGVyLmdldE5vZGUoKSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRvb2xzID0gbmV3IEVsZW1lbnQoKTtcclxuICAgICAgICB0b29scy5hZGRDbGFzcyhcImltYWdlLWNyb3AtdG9vbHNcIik7XHJcbiAgICAgICAgdG9vbHMucmVuZGVyKHdyYXBwZXIuZ2V0Tm9kZSgpKTtcclxuXHJcbiAgICAgICAgY29uc3Qgem9vbVNsaWRlciA9IG5ldyBFbGVtZW50KCk7XHJcbiAgICAgICAgem9vbVNsaWRlci5hZGRDbGFzcyhcImltYWdlLWNyb3Atem9vbVwiKTtcclxuICAgICAgICB6b29tU2xpZGVyLnJlbmRlcih0b29scy5nZXROb2RlKCkpO1xyXG5cclxuICAgICAgICBjb25zdCBsZWZ0SWNvbiA9IG5ldyBJY29uKFwiZnJhbWUtbGFuZHNjYXBlXCIpO1xyXG4gICAgICAgIGNvbnN0IHJpZ2h0SWNvbiA9IG5ldyBJY29uKFwiZnJhbWUtbGFuZHNjYXBlXCIpO1xyXG5cclxuICAgICAgICBsZWZ0SWNvbi5yZW5kZXIoem9vbVNsaWRlci5nZXROb2RlKCkpO1xyXG5cclxuICAgICAgICB0aGlzLl9zbGlkZXIucmVuZGVyKHpvb21TbGlkZXIuZ2V0Tm9kZSgpKTtcclxuICAgICAgICB0aGlzLl9zbGlkZXIub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5zZXRab29tKHZhbHVlIC8gMTAwKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmlnaHRJY29uLnJlbmRlcih6b29tU2xpZGVyLmdldE5vZGUoKSk7XHJcblxyXG4gICAgICAgIHRoaXMuX29uSW5pdENhbGxiYWNrKHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLl9jYW52YXMub25DaGFuZ2UoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9vbkNoYW5nZUNhbGxiYWNrKHRoaXMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoYW5nZSB3aWR0aCBvZiBJbWFnZUNyb3AgY29udGFpbmVyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoIC0gVGhlIG51bWJlciBvZiBwaXhlbHMuXHJcbiAgICAgKiBAcmV0dXJuIHtJbWFnZUNyb3B9IEFuIEltYWdlQ3JvcCBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIHNldFdpZHRoKHdpZHRoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFsaWRhdGVEaW1lbnNpb24od2lkdGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoYFdpZHRoIHByb3BlcnR5OiAke2Vycm9yLm1lc3NhZ2V9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2NhbnZhcy5zZXRXaWR0aCh3aWR0aCk7XHJcbiAgICAgICAgdGhpcy5fY2FudmFzLnJlZHJhdygpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hhbmdlIGhlaWdodCBvZiBJbWFnZUNyb3AgY29udGFpbmVyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGhlaWdodCAtIFRoZSBudW1iZXIgb2YgcGl4ZWxzLlxyXG4gICAgICogQHJldHVybiB7SW1hZ2VDcm9wfSBBbiBJbWFnZUNyb3Agb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBzZXRIZWlnaHQoaGVpZ2h0KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFsaWRhdGVEaW1lbnNpb24oaGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKGBIZWlnaHQgcHJvcGVydHk6ICR7ZXJyb3IubWVzc2FnZX1gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fY2FudmFzLnNldEhlaWdodChoZWlnaHQpO1xyXG4gICAgICAgIHRoaXMuX2NhbnZhcy5yZWRyYXcoKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWQgYW4gaW1hZ2UgYW5kIGRyYXcgY2FudmFzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHVybCAtIFVybCBvciBwYXRoIHRvIGltYWdlXHJcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSBBIHByb21pc2UgdGhhdCByZXR1cm5zIHtAbGluayBsb2FkSW1hZ2V+cmVzb2x2ZX0gaWYgcmVzb2x2ZWQgYW5kIHtAbGluayBsb2FkSW1hZ2V+cmVqZWN0fSBpZiByZWplY3RlZC5cclxuICAgICAqL1xyXG4gICAgbG9hZEltYWdlKHVybCkge1xyXG4gICAgICAgIGlmICghdXJsKSB7XHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKFwiSW1hZ2UgdXJsIG9yIHBhdGggaXMgbm90IHBhc3NlZC5cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHVybCAhPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcIkludmFsaWQgdXJsIG9yIHBhdGguXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ltYWdlLmxvYWQodXJsKS50aGVuKChpbWFnZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuc2V0SW1hZ2UoaW1hZ2UpO1xyXG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuZHJhdygpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdlbmVyYXRlcyBhbmQgcmV0dXJucyBhIGRhdGEgVVJJIGNvbnRhaW5pbmcgYSByZXByZXNlbnRhdGlvbiBvZiB0aGUgaW1hZ2UgaW4gdGhlIGZvcm1hdCBzcGVjaWZpZWQgYnkgdGhlIHR5cGUgcGFyYW1ldGVyIChkZWZhdWx0cyB0byBQTkcpLlxyXG4gICAgICogVGhlIHJldHVybmVkIGltYWdlIGlzIGluIGEgcmVzb2x1dGlvbiBvZiA5NiBkcGkuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7U3RyaW5nfSAtIEEgZGF0YSBVUkkuXHJcbiAgICAgKi9cclxuICAgIGdldENyb3BwZWRJbWFnZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2FudmFzLnRvRGF0YVVSTCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB6b29tLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB6b29tIC0gWm9vbSB2YWx1ZSwgZnJvbSBgMGAgPSAwJSwgYDEuMGAgPSAxMDAlIG9mIGltYWdlIHNpemVcclxuICAgICAqIEByZXR1cm4ge0ltYWdlQ3JvcH0gQW4gSW1hZ2VDcm9wIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgc2V0Wm9vbSh6b29tKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFsaWRhdGVEaW1lbnNpb24oem9vbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihgWm9vbSBwcm9wZXJ0eTogJHtlcnJvci5tZXNzYWdlfWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9jYW52YXMuc2V0Wm9vbSh6b29tKTtcclxuICAgICAgICB0aGlzLl9zbGlkZXIuc2V0VmFsdWUoem9vbSAqIDEwMCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXQoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRab29tKDApO1xyXG4gICAgICAgIHRoaXMuX2NhbnZhcy5yZWRyYXcoKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBGcmFtZSBvcmlnaW4gYW5kIHNpemUgcmVsYXRpdmUgdG8gYW4gSW1hZ2UuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3tvcmlnaW46IHt4OiBOdW1iZXIsIHk6IE51bWJlcn0sIHNpemU6IHt3aWR0aDogTnVtYmVyLCBoZWlnaHQ6IE51bWJlcn19fVxyXG4gICAgICovXHJcbiAgICBnZXREYXRhKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jYW52YXMuZ2V0RGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IGEgRnJhbWUgb3JpZ2luIGFuZCBzaXplIHJlbGF0aXZlIHRvIGFuIEltYWdlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC0gQSBmcmFtZSBvcmlnaW4gKHRvcCwgbGVmdCkgcG9pbnQgYW5kIGZyYW1lIHNpemUuXHJcbiAgICAgKiBAcmV0dXJucyB7SW1hZ2VDcm9wfSAtIEFuIEltYWdlQ3JvcCBpbnN0YW5jZS5cclxuICAgICAqL1xyXG4gICAgc2V0RGF0YShkYXRhKSB7XHJcbiAgICAgICAgY29uc3QgeyB6b29tIH0gPSB0aGlzLl9jYW52YXMuc2V0RGF0YShkYXRhKTtcclxuICAgICAgICB0aGlzLl9zbGlkZXIuc2V0VmFsdWUoem9vbSAqIDEwMCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn0iXSwibmFtZXMiOlsidmFsaWRhdGVOb2RlIiwibm9kZSIsIkVycm9yIiwiZWxlbWVudCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIndpbmRvdyIsIkhUTUxFbGVtZW50IiwidmFsaWRhdGVDb25maWciLCJjb25maWciLCJPYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImNhbGwiLCJ2YWxpZGF0ZURpbWVuc2lvbiIsInZhbHVlIiwiaXNGaW5pdGUiLCJ2YWxpZGF0ZUNhbGxiYWNrIiwiY2FsbGJhY2siLCJkZWZhdWx0RGltZW5zaW9ucyIsInN0eWxlcyIsIlNpemUiLCJ3aWR0aCIsImhlaWdodCIsIkVsZW1lbnQiLCJfbm9kZSIsImNyZWF0ZUVsZW1lbnROUyIsImNyZWF0ZUVsZW1lbnQiLCJwYXJlbnQiLCJhcHBlbmRDaGlsZCIsImdldENvbnRleHQiLCJ0eXBlIiwibmV3Q2xhc3MiLCJjbGFzc05hbWUiLCJsZW5ndGgiLCJhdHRyaWJ1dGVOYW1lIiwiYXR0cmlidXRlVmFsdWUiLCJzZXRBdHRyaWJ1dGUiLCJnbG9iYWwiLCJmYWN0b3J5IiwibW9kdWxlIiwidGhpcyIsIm9iamVjdE9yRnVuY3Rpb24iLCJ4IiwiaXNGdW5jdGlvbiIsIl9pc0FycmF5IiwidW5kZWZpbmVkIiwiQXJyYXkiLCJpc0FycmF5IiwibGVuIiwidmVydHhOZXh0IiwiY3VzdG9tU2NoZWR1bGVyRm4iLCJhc2FwIiwiYXJnIiwiZmx1c2giLCJzZXRTY2hlZHVsZXIiLCJzY2hlZHVsZUZuIiwic2V0QXNhcCIsImFzYXBGbiIsImJyb3dzZXJXaW5kb3ciLCJicm93c2VyR2xvYmFsIiwiQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwiV2ViS2l0TXV0YXRpb25PYnNlcnZlciIsImlzTm9kZSIsInNlbGYiLCJwcm9jZXNzIiwiaXNXb3JrZXIiLCJVaW50OENsYW1wZWRBcnJheSIsImltcG9ydFNjcmlwdHMiLCJNZXNzYWdlQ2hhbm5lbCIsInVzZU5leHRUaWNrIiwibmV4dFRpY2siLCJ1c2VWZXJ0eFRpbWVyIiwidXNlU2V0VGltZW91dCIsInVzZU11dGF0aW9uT2JzZXJ2ZXIiLCJpdGVyYXRpb25zIiwib2JzZXJ2ZXIiLCJjcmVhdGVUZXh0Tm9kZSIsIm9ic2VydmUiLCJjaGFyYWN0ZXJEYXRhIiwiZGF0YSIsInVzZU1lc3NhZ2VDaGFubmVsIiwiY2hhbm5lbCIsInBvcnQxIiwib25tZXNzYWdlIiwicG9ydDIiLCJwb3N0TWVzc2FnZSIsImdsb2JhbFNldFRpbWVvdXQiLCJzZXRUaW1lb3V0IiwicXVldWUiLCJpIiwiYXR0ZW1wdFZlcnR4IiwiciIsInJlcXVpcmUiLCJ2ZXJ0eCIsInJ1bk9uTG9vcCIsInJ1bk9uQ29udGV4dCIsImUiLCJzY2hlZHVsZUZsdXNoIiwidGhlbiIsIm9uRnVsZmlsbG1lbnQiLCJvblJlamVjdGlvbiIsIl9hcmd1bWVudHMiLCJhcmd1bWVudHMiLCJjaGlsZCIsImNvbnN0cnVjdG9yIiwibm9vcCIsIlBST01JU0VfSUQiLCJfc3RhdGUiLCJpbnZva2VDYWxsYmFjayIsIl9yZXN1bHQiLCJyZXNvbHZlIiwib2JqZWN0IiwiQ29uc3RydWN0b3IiLCJwcm9taXNlIiwiTWF0aCIsInJhbmRvbSIsInN1YnN0cmluZyIsIlBFTkRJTkciLCJGVUxGSUxMRUQiLCJSRUpFQ1RFRCIsIkdFVF9USEVOX0VSUk9SIiwiRXJyb3JPYmplY3QiLCJzZWxmRnVsZmlsbG1lbnQiLCJUeXBlRXJyb3IiLCJjYW5ub3RSZXR1cm5Pd24iLCJnZXRUaGVuIiwiZXJyb3IiLCJ0cnlUaGVuIiwiZnVsZmlsbG1lbnRIYW5kbGVyIiwicmVqZWN0aW9uSGFuZGxlciIsImhhbmRsZUZvcmVpZ25UaGVuYWJsZSIsInRoZW5hYmxlIiwic2VhbGVkIiwicmVhc29uIiwiX2xhYmVsIiwiaGFuZGxlT3duVGhlbmFibGUiLCJfcmVzb2x2ZSIsIl9yZWplY3QiLCJoYW5kbGVNYXliZVRoZW5hYmxlIiwibWF5YmVUaGVuYWJsZSIsInRoZW4kJCIsInB1Ymxpc2hSZWplY3Rpb24iLCJfb25lcnJvciIsImZ1bGZpbGwiLCJfc3Vic2NyaWJlcnMiLCJwdWJsaXNoIiwic3Vic2NyaWJlIiwic3Vic2NyaWJlcnMiLCJzZXR0bGVkIiwiZGV0YWlsIiwiVFJZX0NBVENIX0VSUk9SIiwidHJ5Q2F0Y2giLCJoYXNDYWxsYmFjayIsInN1Y2NlZWRlZCIsImZhaWxlZCIsImluaXRpYWxpemVQcm9taXNlIiwicmVzb2x2ZXIiLCJyZXNvbHZlUHJvbWlzZSIsInJlamVjdFByb21pc2UiLCJpZCIsIm5leHRJZCIsIm1ha2VQcm9taXNlIiwiRW51bWVyYXRvciIsImlucHV0IiwiX2luc3RhbmNlQ29uc3RydWN0b3IiLCJfaW5wdXQiLCJfcmVtYWluaW5nIiwiX2VudW1lcmF0ZSIsInZhbGlkYXRpb25FcnJvciIsIl9lYWNoRW50cnkiLCJlbnRyeSIsImMiLCJyZXNvbHZlJCQiLCJfdGhlbiIsIl9zZXR0bGVkQXQiLCJQcm9taXNlIiwiX3dpbGxTZXR0bGVBdCIsInN0YXRlIiwiZW51bWVyYXRvciIsImFsbCIsImVudHJpZXMiLCJyYWNlIiwiXyIsInJlamVjdCIsIm5lZWRzUmVzb2x2ZXIiLCJuZWVkc05ldyIsIl9zZXRTY2hlZHVsZXIiLCJfc2V0QXNhcCIsIl9hc2FwIiwiX2NhdGNoIiwicG9seWZpbGwiLCJsb2NhbCIsIkZ1bmN0aW9uIiwiUCIsInByb21pc2VUb1N0cmluZyIsImNhc3QiLCJJbWFnZSIsIl9zY2FsZSIsIl9vcmlnaW5TY2FsZSIsIl96b29tIiwidXJsIiwiZ2V0Tm9kZSIsIm9ubG9hZCIsIl9jaGVja0Zvcm1hdCIsIm9uZXJyb3IiLCJzcmMiLCJjcm9zc09yaWdpbiIsImZyYW1lIiwid2lkdGhTY2FsZSIsImdldFJlY3QiLCJzaXplIiwiaGVpZ2h0U2NhbGUiLCJsYXJnZXN0U2NhbGUiLCJ3IiwiaCIsInpvb20iLCJDb250ZXh0IiwiY29udGV4dCIsIl9jb250ZXh0IiwieSIsImZpbGxSZWN0Iiwic3R5bGUiLCJmaWxsU3R5bGUiLCJpbWFnZSIsInJlcGV0aXRpb24iLCJjcmVhdGVQYXR0ZXJuIiwicmVjdCIsImZpbGwiLCJiZWdpblBhdGgiLCJtb3ZlVG8iLCJsaW5lVG8iLCJjbG9zZVBhdGgiLCJjbGVhclJlY3QiLCJhcmdzIiwiZHJhd0ltYWdlIiwiYXBwbHkiLCJQYXR0ZXJuIiwic2V0V2lkdGgiLCJwYXR0ZXJuIiwic2V0SGVpZ2h0IiwiX2RyYXciLCJmaWxsMSIsImZpbGwyIiwiUG9pbnQiLCJmcmFtZVByb3BvcnRpb24iLCJGcmFtZSIsIl9zaXplIiwiX29yaWdpbiIsIkN1dG91dCIsImNhbnZhcyIsIl9mcmFtZSIsIl9jYW52YXMiLCJjdXRvdXQiLCJnZXRNaW5YIiwiZ2V0TWluWSIsImdldE1heFkiLCJnZXRNYXhYIiwiR2VuZXJhdG9yIiwidG9EYXRhVVJMIiwiTW92ZUV2ZW50TGlzdGVuZXIiLCJib2R5IiwiX2VsZW1lbnQiLCJfcGFyZW50IiwiX29uTW92ZUNhbGxiYWNrIiwiX29uUHJlc3NDYWxsYmFjayIsIl9vblJlbGVhc2VDYWxsYmFjayIsIl9vblJlbGVhc2VIYW5kbGVyIiwib25SZWxlYXNlSGFuZGxlciIsImJpbmQiLCJfb25QcmVzc0hhbmRsZXIiLCJvblByZXNzSGFuZGxlciIsIl9vbk1vdmVIYW5kbGVyIiwib25Nb3ZlSGFuZGxlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsIl9nZXRFdmVudFBvaW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInBvaW50IiwiYm94IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwibGVmdCIsInRvcCIsImNsaWVudFgiLCJ0b3VjaGVzIiwiY2xpZW50WSIsIl9jb252ZXJ0Q29vcmRpbmF0ZXMiLCJDYW52YXMiLCJfaW1hZ2UiLCJfcGF0dGVybiIsIl9jdXRvdXQiLCJfZ2VuZXJhdG9yIiwiX21vdmVFdmVudExpc3RlbmVyIiwiX2xhc3RQb2ludCIsIl9iYXNlUG9pbnQiLCJfb25DaGFuZ2VDYWxsYmFjayIsIl9kcmF3QmFja2dyb3VuZCIsImluaXQiLCJvblByZXNzIiwib25Nb3ZlIiwiX2RyYXdJbWFnZSIsInVwZGF0ZSIsIl9yZXNldFBvaW50cyIsInNjYWxlVG9GaXQiLCJfY2VudGVySW1hZ2VQb2ludCIsImRyYXciLCJsYXN0SW1hZ2VTaXplIiwiZ2V0U2l6ZSIsInNldFpvb20iLCJpbWFnZVNpemUiLCJvcmlnaW5YIiwiZ2V0U2NhbGUiLCJvcmlnaW5ZIiwiZnJhbWVXaWR0aCIsImZyYW1lSGVpZ2h0IiwiZXhwZWN0ZWRTY2FsZSIsImdldE9yaWdpblNjYWxlIiwib3JpZ2luIiwiZ2V0TWlkWCIsImdldE1pZFkiLCJ2YWxpZFBvaW50IiwiY2xlYXIiLCJiYXNlWCIsImJhc2VZIiwiX3ZhbGlkYXRlUG9pbnQiLCJTbGlkZXIiLCJzZXRUeXBlIiwiYWRkQ2xhc3MiLCJfb25DaGFuZ2VIYW5kbGVyIiwiX29uQ2hhbmdlIiwiTnVtYmVyIiwiSWNvbiIsIm5hbWUiLCJfdXNlIiwic2V0QXR0cmlidXRlTlMiLCJyZW5kZXIiLCJJbWFnZUNyb3AiLCJfc2xpZGVyIiwiX29uSW5pdENhbGxiYWNrIiwib25Jbml0Iiwib25DaGFuZ2UiLCJ3cmFwcGVyIiwidG9vbHMiLCJ6b29tU2xpZGVyIiwibGVmdEljb24iLCJyaWdodEljb24iLCJtZXNzYWdlIiwicmVkcmF3IiwibG9hZCIsInNldEltYWdlIiwic2V0VmFsdWUiLCJnZXREYXRhIiwic2V0RGF0YSJdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7Ozs7OztBQU1BLEFBQWUsU0FBU0EsWUFBVCxDQUFzQkMsSUFBdEIsRUFBNEI7UUFDbkMsQ0FBQ0EsSUFBTCxFQUFXO2NB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
