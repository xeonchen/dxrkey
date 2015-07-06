'use strict';

document.addEventListener('keyup', function(event) {
  if (event.keyCode == KeyEvent.DOM_VK_SLASH && event.ctrlKey) {
    let query = document.getElementById('query');
    query.focus();
    query.select();
  }
});
