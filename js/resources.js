(function(){
  var resourceCache = {};
  var loading = [];
  var readyCallbacks = [];


  function load(urlOrArray){
    if(urlOrArray instanceof Array) {
      urlOrArray.forEach(function(url) {
        _load(url);
      });
    } else {
      _load(urlOrArray);
    }
  }

  function _load(url) {
    if(resourceCache[url]) {
      return resourceCache[url];
    } else {
      var img = new Image();
      img.onload = function() {
        resourceCache[url] = img;

        if(isReady()) {
          readyCallbacks.forEach(function(func){
            func();
          });
        }
      };
    }
  }

  function get(url){
    return resourceCache[url];
  }

  function isReady() {
    var ready = true;
    for(var k in resourceCache) {
      if(resourceCache.hasOwnProperty(k) && !resourceCache[k]) {
        ready = false;
      }
    }
    return ready;
  }

  function onRady(func) {
    readyCallbacks.push(func);
  }

  window.Resources = {
    load: load,
    get: get,
    onReady: onReady,
    isReady: isReady
  };
})();
