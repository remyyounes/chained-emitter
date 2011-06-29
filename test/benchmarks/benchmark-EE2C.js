var testCase = require('nodeunit').testCase;

module.exports = testCase({

  'Add 10000 listener, emit 300 times' : function (test) {

    var EventEmitter = require('events').EventEmitter;

    var EventsManager = new EventEmitter;

    var iterations = 10000;
    var len = 10;

    console.time('EE2_1');
    for (var i = 0; i < len; i++) {
      for (var j = 0; j < len; j++){
        for (var k = 0; k < len; k++){
          for (var l = 0; l < len; l++){
            EventsManager.on([i,j,k,l].join('.'), function () { test.ok(true,'emit') });
            EventsManager.on([i,j,k,l].join('.'), function () { test.ok(true,'emit') });
            EventsManager.on([i,j,k,l].join('.'), function () { test.ok(true,'emit') });
            EventsManager.on([i,j,k,l].join('.'), function () { test.ok(true,'emit') });
            EventsManager.on([i,j,k,l].join('.'), function () { test.ok(true,'emit') });
          }
        }
      }
    }

    while (iterations--) {
      EventsManager.emit('1.8.6.3');
      EventsManager.emit('5.2.9.1');
      EventsManager.emit('9.5.3.8');
    }

    console.timeEnd('EE2_1');
    test.expect(150000);
    test.done();
  }

});