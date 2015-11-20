/* global self */
'use strict';

(function(){
  const DEBUG = false;

  var useAlt, useCtrl, useMeta, useShift, keyCode, caseSensitive;

  function log(s) {
    if (DEBUG) {
      console.log(s);
    }
  }

  function setFocus() {
    let query = document.getElementById('query');
    query.focus();
    query.select();
  }

  function setCaseSensitive() {
    if (caseSensitive === -1) {
      return;
    }

    let e = document.getElementById('case');
    e.checked = caseSensitive;
  }

  self.port.on('prefs', function(prefs) {
    log(prefs);

    useAlt = prefs.useAlt;
    useCtrl = prefs.useCtrl;
    useMeta = prefs.useMeta;
    useShift = prefs.useShift;
    keyCode = prefs.keyCode;
    caseSensitive = prefs.caseSensitive;

    setCaseSensitive();
  });

  document.addEventListener('keyup', function(event) {
    log('keyCode = ' + event.keyCode);
    log('altKey = ' + event.altKey);
    log('ctrlKey = ' + event.ctrlKey);
    log('metaKey = ' + event.metaKey);
    log('shiftKey = ' + event.shiftKey);

    if (event.keyCode == keyCode &&
        event.altKey == useAlt &&
        event.ctrlKey == useCtrl &&
        event.metaKey == useMeta &&
        event.shiftKey == useShift) {
      setFocus();
    }
  });
})();
