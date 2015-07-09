'use strict';

let pageMod = require("sdk/page-mod");
let self = require("sdk/self");
let simplePrefs = require("sdk/simple-prefs");
let prefs = simplePrefs.prefs;

console.log(prefs.useAlt);
console.log(prefs.useCtrl);
console.log(prefs.useMeta);
console.log(prefs.useShift);
console.log(prefs.keyCode);

pageMod.PageMod({
  include: "https://dxr.mozilla.org/*",
  contentScriptFile: self.data.url("dxr.js"),
  onAttach: function(worker) {
    function update() {
      console.log('update');
      worker.port.emit('prefs', {
        'useAlt': prefs.useAlt,
        'useCtrl': prefs.useCtrl,
        'useMeta': prefs.useMeta,
        'useShift': prefs.useShift,
        'keyCode': prefs.keyCode
      });
    }

    simplePrefs.on('useAlt', update);
    simplePrefs.on('useCtrl', update);
    simplePrefs.on('useMeta', update);
    simplePrefs.on('useShift', update);
    simplePrefs.on('keyCode', update);
    update();
  }
});
