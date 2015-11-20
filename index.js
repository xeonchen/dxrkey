'use strict';

let pageMod = require("sdk/page-mod");
let self = require("sdk/self");
let simplePrefs = require("sdk/simple-prefs");
let prefs = simplePrefs.prefs;

const DEBUG = false;

function log(s) {
  if (DEBUG) {
    console.log(s);
  }
}

function dumpSetting() {
  log(prefs.useAlt);
  log(prefs.useCtrl);
  log(prefs.useMeta);
  log(prefs.useShift);
  log(prefs.keyCode);
  log(prefs.caseSensitive);
}

pageMod.PageMod({
  include: "https://dxr.mozilla.org/*",
  contentScriptFile: self.data.url("dxr.js"),
  onAttach: function(worker) {
    function update() {
      dumpSetting();
      worker.port.emit('prefs', {
        'useAlt': prefs.useAlt,
        'useCtrl': prefs.useCtrl,
        'useMeta': prefs.useMeta,
        'useShift': prefs.useShift,
        'keyCode': prefs.keyCode,
        'caseSensitive': prefs.caseSensitive
      });
    }

    simplePrefs.on('useAlt', update);
    simplePrefs.on('useCtrl', update);
    simplePrefs.on('useMeta', update);
    simplePrefs.on('useShift', update);
    simplePrefs.on('keyCode', update);
    simplePrefs.on('caseSensitive', update);
    update();
  }
});
