var store = require("./singletonStore");

var myStore = store.getStore(function() {});
console.log(myStore.getState());
