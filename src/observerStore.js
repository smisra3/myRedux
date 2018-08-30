var Pubsub = (function() {
  var listenerObject = {};
  return {
    subscribe: function(name, listener) {
      if (!name || !listener)
        throw new Error("Expected a name to be dispatched");
      var index = listenerObject[name].push(listener);
      return {
        remove: function() {
          listenerObject[listener].splice(index, 1);
        }
      };
    },
    publish: function(name, data) {
      if (!name) throw new Error("Expected a name to be dispatched");
      if (listenerObject[name])
        listenerObject[name].forEach(function(listener) {
          listener(data !== undefined ? data : {});
        });
    }
  };
})();

module.exports = Pubsub;
