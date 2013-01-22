
var chainedEvents = require('nodeunit').testCase;
var file = '../../lib/ChainedEventEmitter';
var q = require('q');
var EventEmitter;

if(typeof require !== 'undefined') {
  EventEmitter = require(file).EventEmitter;
}
else {
  EventEmitter = window.EventEmitter;
}

module.exports = chainedEvents({
  '1. Add two listeners on a single event and emit the event.': function (test) {

    var emitter = new EventEmitter({ verbose: true });

    var deferA = q.defer();
    var deferB = q.defer();

    function functionA() {
        test.ok(true, 'The event was raised');
        return deferA.promise;
    }
    function functionB() {
        test.ok(true, 'The event was raised');
        return deferB.promise;
    }

    emitter.on('test2', functionA);
    emitter.on('test2', functionB);

    emitter.emit('test2').then(function() {
      test.expect(2);
      test.done();
    });
    deferA.resolve();
    deferB.resolve();
  },
  '2. Emit the event in parallel.': function (test) {

    var emitter = new EventEmitter({ verbose: true, parallel: true });

    var deferA = q.defer();
    var deferB = q.defer();

    function functionA() {
        test.ok(true, 'The event was raised');
        return deferA.promise;
    }
    function functionB() {
        test.ok(true, 'The event was raised');
        return deferB.promise;
    }

    emitter.on('test2', functionA);
    emitter.on('test2', functionB);

    emitter.emit('test2').then(function() {
      test.expect(2);
      test.done();
    });
    deferB.resolve();
    deferA.resolve();
  },});
