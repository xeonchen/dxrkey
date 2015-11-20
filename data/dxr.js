/* global self */
'use strict';

(function(){
  var useAlt, useCtrl, useMeta, useShift, keyCode, caseSensitive;

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
    console.log(prefs);

    useAlt = prefs.useAlt;
    useCtrl = prefs.useCtrl;
    useMeta = prefs.useMeta;
    useShift = prefs.useShift;
    keyCode = prefs.keyCode;
    caseSensitive = prefs.caseSensitive;

    setCaseSensitive();
  });

  document.addEventListener('keyup', function(event) {
    console.log('keyCode = ' + event.keyCode);
    console.log('altKey = ' + event.altKey);
    console.log('ctrlKey = ' + event.ctrlKey);
    console.log('metaKey = ' + event.metaKey);
    console.log('shiftKey = ' + event.shiftKey);

    if (event.keyCode == keyCode &&
        event.altKey == useAlt &&
        event.ctrlKey == useCtrl &&
        event.metaKey == useMeta &&
        event.shiftKey == useShift) {
      setFocus();
    }
  });
})();
