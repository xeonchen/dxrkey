'use strict';

let pageMod = require("sdk/page-mod");
let self = require("sdk/self");

pageMod.PageMod({
  include: "https://dxr.mozilla.org/*",
  contentScriptFile: self.data.url("dxr.js")
});
