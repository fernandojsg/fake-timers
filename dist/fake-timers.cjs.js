'use strict';

const RealDate = Date;

class MockDate {
  constructor(t) {
    this.t = t;
  }

  static now() {
    return RealDate.now();
  }

  static realNow() {
    return RealDate.now();
  }

  getTimezoneOffset() {
    return 0;
  }

  toTimeString() {
    return '';
  }

  getDate() { return 0; }
  getDay() { return 0; }
  getFullYear() { return 0; }
  getHours() { return 0; }
  getMilliseconds() { return 0; }
  getMonth() { return 0; }
  getMinutes() { return 0; }
  getSeconds() { return 0; }
  getTime() { return 0; }
  getYear() { return 0; }

  static UTC() { return 0; }

  getUTCDate() { return 0; }
  getUTCDay() { return 0; }
  getUTCFullYear() { return 0; }
  getUTCHours() { return 0; }
  getUTCMilliseconds() { return 0; }
  getUTCMonth() { return 0; }
  getUTCMinutes() { return 0; }
  getUTCSeconds() { return 0; }

  setDate() {}
  setFullYear() {}
  setHours() {}
  setMilliseconds() {}
  setMinutes() {}
  setMonth() {}
  setSeconds() {}
  setTime() {}

  setUTCDate() {}
  setUTCFullYear() {}
  setUTCHours() {}
  setUTCMilliseconds() {}
  setUTCMinutes() {}
  setUTCMonth() {}

  setYear() {}
}

var realPerformance;

if (!performance.realNow) {
  var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  if (isSafari) {
    realPerformance = performance;
    performance = {
      realNow: function() { return realPerformance.now(); },
      now: function() { return realPerformance.now(); }
    };
  } else {
    performance.realNow = performance.now;
  }
}

var index = {
  timeScale: 1.0,
  fakedTime: 0,
  enabled: false,
  needsFakeMonotonouslyIncreasingTimer: false,
  setFakedTime: function( newFakedTime ) {
    this.fakedTime = newFakedTime;
  },
  enable: function () {
    Date = MockDate;
    
    var self = this;
    if (this.needsFakeMonotonouslyIncreasingTimer) {
      Date.now = function() { self.fakedTime += self.timeScale; return self.fakedTime; };
      performance.now = function() { self.fakedTime += self.timeScale; return self.fakedTime; };
    } else {
      Date.now = function() { return self.fakedTime * 1000.0 * self.timeScale / 60.0; };
      performance.now = function() { return self.fakedTime * 1000.0 * self.timeScale / 60.0; };
    }
  
    this.enabled = true;
  },
  disable: function () {
    if (!this.enabled) { return; }    
    Date = RealDate;    
    performance.now = realPerformance.now;
    
    this.enabled = false;    
  }
};

module.exports = index;
