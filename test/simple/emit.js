
var simpleEvents = require('nodeunit').testCase;
var file = '../../lib/ChainedEventEmitter';
var EventEmitter;

if(typeof require !== 'undefined') {
  EventEmitter = require(file).EventEmitter;
}
else {
  EventEmitter = window.EventEmitter;
}

module.exports = simpleEvents({

  '1. Add two listeners on a single event and emit the event.': function (test) {

    var emitter = new EventEmitter({ verbose: true });

    function functionA() { test.ok(true, 'The event was raised'); }
    function functionB() { test.ok(true, 'The event was raised'); }

    emitter.on('test2', functionA);
    emitter.on('test2', functionB);

    emitter.emit('test2').then(function() {
      test.expect(2);
      test.done();
    });
  },
  '2. Add two listeners on a single event and emit the event twice.': function (test) {

    var emitter = new EventEmitter({ verbose: true });

    function functionA() { test.ok(true, 'The event was raised'); }
    function functionB() { test.ok(true, 'The event was raised'); }

    emitter.on('test2', functionA);
    emitter.on('test2', functionB);


    emitter.emit('test2').then(function() {
      emitter.emit('test2').then(function() {
        test.expect(4);
        test.done();
      });
    });
  },
  '3. Add two listeners on a single event and emit the event with a parameter.': function (test) {

    var emitter = new EventEmitter({ verbose: true });

    function functionA(value1) {
      test.ok(true, 'The event was raised');
      test.equal(typeof value1, 'string', 'The event was raised');
    }

    function functionB(value1) {
      test.ok(true, 'The event was raised');
      test.equal(typeof value1, 'string', 'The event was raised');
    }

    emitter.on('test2', functionA);
    emitter.on('test2', functionB);

    emitter.emit('test2', 'Hello, Node').then(function() {
      test.expect(4);
      test.done();
    });
  },
  '4. Add two listeners on an single event and emit the event twice with a parameter.': function (test) {

    var emitter = new EventEmitter({ verbose: true });

    function functionA(value1) {
      test.ok(true, 'The event was raised');
      test.equal(typeof value1, 'string', 'The event was raised');
    }

    function functionB(value1) {
      test.ok(true, 'The event was raised');
      test.equal(typeof value1, 'string', 'The event was raised');
    }

    emitter.on('test2', functionA);
    emitter.on('test2', functionB);

    emitter.emit('test2', 'Hello, Node1').then(function() {
      emitter.emit('test2', 'Hello, Node2').then(function() {
        test.expect(8);
        test.done();
      });
    });
  },
  '5. Add two listeners on an single event and emit the event twice with multiple parameters.': function (test) {

    var emitter = new EventEmitter({ verbose: true });

    function functionA(value1, value2, value3) {
      test.ok(true, 'The event was raised');
      test.equal(typeof value1, 'string', 'The value named "value1" is OK');
      test.equal(typeof value2, 'string', 'The value named "value2" is OK');
      test.equal(typeof value3, 'string', 'The value named "value3" is OK');
    }

    function functionB(value1, value2, value3) {
      test.ok(true, 'The event was raised');
      test.equal(typeof value1, 'string', 'The value named "value1" is OK');
      test.equal(typeof value2, 'string', 'The value named "value2" is OK');
      test.equal(typeof value3, 'string', 'The value named "value3" is OK');
    }

    emitter.on('test2', functionA);
    emitter.on('test2', functionB);

    emitter.emit('test2', 'Hello, Node1', 'Hello, Node2', 'Hello, Node3').then(function() {
      emitter.emit('test2', 'Hello, Node1', 'Hello, Node2', 'Hello, Node3').then(function() {
        test.expect(16);
        test.done();
      });
    });
  },
  '6. Check return values of emit.': function (test) {

    var emitter = new EventEmitter({ verbose: true });

    function functionA() { test.ok(true, 'The event was raised'); }

    emitter.on('test6', functionA);
    emitter.emit('test6').then(function(fired) {
      test.ok(fired, 'emit should return true after calling a listener');
      emitter.emit('other').then(function(fired) {
        test.ok(!fired, 'emit should return false when no listener was called');
        emitter.onAny(functionA);
        emitter.emit('other').then(function(fired) {
          test.ok(fired, 'emit should return true after calling an onAny() listener');
          test.expect(5);
          test.done();
        });
      });
    });
  }
});

